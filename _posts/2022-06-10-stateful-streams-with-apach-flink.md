---
title: "Stateful Streams with Apache Flink"
date: 2022-06-10
header:
image: "/images/blog cover.jpg"
tags: [pulsar, flink, stateful stream processing]
excerpt: "We will discuss how you can use Apache Flink's State to combine huge amounts of streams for data validation or enrichment that reside in topics in some upstream streaming storage layer like Apache Pulsar"
---

_This article is a collaboration between me (Daniel) and [Giannis Polyzos](https://github.com/polyzos), one of the earliest students of Rock the JVM back in 2017. Giannis is now a senior engineer and a contributor to Apache Pulsar, a promising new toolkit for distributed messaging and streaming. In this piece we combine two of our favorite pieces of tech: Apache Pulsar and Apache Flink._

![Alt text](../images/pf1.png "Unified Batch & Streaming")


----
References to the Flink course and pulsar blog post
----

### Introduction
Typical Data Architectures include a streaming storage layer like Apache Pulsar which serves as the backbone of the infrastructure, combined with a stream computing engine 
like Apache Flink in order to perform advanced streaming computations. Data often resides inside multiple different topics in a streaming storage layer and it is required to
combine data from multiple topics in order to have the right context for more advanced analytics or processing. In this blog post we will walkthrough how you can use Apache Flink to
enrich real time data streams with data that resides into large changelog topics. We will use Apache Pulsar as our streaming storage layer.
Apache Pulsar and Apache Flink have a strong integration together and enable a Unified Batch and Streaming Architecture. If you are interested about this type of Architecture you can find more [here](https://www.youtube.com/watch?v=2MpiE238Pzw)

## Example Use Case
![Alt text](../images/pf2.png "Example Use Case")
As an example use case we will consider an online store. Users come online to our store and place orders. Every order is ingested into the `orders` topic and at the same time
every user registered as well as every item are ingested into the `users` and `items` topics respectively. 
They contain a unique id which is used as the key for the message written into the topic. 
One common use case in streaming systems is combining data from different topics, in order to perform some kind of data validation and data enrichment.
In this blog post we will take a hands-on approach on the following:
1. Connect Apache Pulsar with Flink and verify we can consume messages from these topics
2. How we can use the low-level Flink processor API in order to handle the `state` data from the `users` and `items` topic in order to enrich the `orders` with user and item information
3. How to use side-outputs to deal with cases when state is not present and we need to collect these records for further investigation
4. How we can use rocksdb for handling our state with Flink and not keep it in-memory
5. How we can recover from failure with checkpoints and restart strategies
6. How we can resume our Flink job using savepoints.

There is a lot to cover here, so we will build incrementally on the above bullet points and hopefully by the end of the post you will have a better understanding on handling similar use cases.
Let's jump right into it.

## Pre-Flight Check
Before we start discussing how we can actually implement our use case let's make sure we have our dependencies in place and our environment setup.
We will be using Java in the tutorial so make sure you add the following dependencies to your `pom.xml` file.
```shell
 <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>

    <flink.version>1.14.3</flink.version>
    <scala.version>2.12</scala.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.apache.flink</groupId>
      <artifactId>flink-clients_${scala.version}</artifactId>
      <version>${flink.version}</version>
    </dependency>

    <dependency>
      <groupId>org.apache.flink</groupId>
      <artifactId>flink-streaming-java_${scala.version}</artifactId>
      <version>${flink.version}</version>
    </dependency>

    <dependency>
      <groupId>org.apache.flink</groupId>
      <artifactId>flink-connector-pulsar_${scala.version}</artifactId>
      <version>${flink.version}</version>
    </dependency>

    <dependency>
      <groupId>org.apache.flink</groupId>
      <artifactId>flink-statebackend-rocksdb_${scala.version}</artifactId>
      <version>${flink.version}</version>
    </dependency>

    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.22</version>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.11</version>
    </dependency>
  </dependencies>
```

Then we will need a Pulsar and Flink cluster. We can quickly spin up our clusters using docker-compose.
Create a `docker-compose.yaml` file and add the following:
```shell
version: '3.7'
services:
  jobmanager:
    image: flink:1.14.4-scala_2.12-java11
    ports:
      - "8081:8081"
    command: jobmanager
    environment:
      - |
        FLINK_PROPERTIES=
        jobmanager.rpc.address: jobmanager

  taskmanager:
    image: flink:1.14.4-scala_2.12-java11
    depends_on:
      - jobmanager
    command: taskmanager
    scale: 1
    environment:
      - |
        FLINK_PROPERTIES=
        jobmanager.rpc.address: jobmanager
        taskmanager.numberOfTaskSlots: 2

  pulsar:
    image: apachepulsar/pulsar:2.9.1
    container_name: pulsar
    ports:
      - "8080:8080"
      - "6650:6650"
    environment:
      PULSAR_MEM: " -Xms512m -Xmx512m -XX:MaxDirectMemorySize=1g"
      systemTopicEnabled: "true"
      topicLevelPoliciesEnabled: "true"
      transactionCoordinatorEnabled: "true"
   command: >
      /bin/bash -c
      " bin/apply-config-from-env.py conf/standalone.conf
      && bin/pulsar standalone"
```
There are a few things to note here. First we create a Flink Cluster with one taskmanager that has 2 slots and a Pulsar cluster.
We expose ports `8080` that is the Pulsar http port as well as port `6650` which is the broker port. 
We also enable some configurations: the first two `systemTopicEnabled` and `topicLevelPoliciesEnabled` allow us to use topic level policies. 
We need those in order to use infinite retention at the topic level, i.e keep our data around infinitely. Since we treat `users` and `items` as "state" we need to be able 
to have this state around in case we need to replay it, right?
Then we have the `transactionCoordinatorEnabled` which enables the transaction coordinator which is used by the Pulsar-Flink connector.
So let's start our clusters by running `docker-compose up`.

At this point we have our clusters up and running and the last thing we want to do is create our topics and set infinite retention on our lookup data topics.
The reason we want to enable infinite retention is for disaster recovery scenarios, so we are able to replay the whole state from the topic and not lose it.
You can find a helper script that creates all the required topics and sets the policies on the github repo [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/setup.sh).
We create 3 partitioned topics (orders, users and items), with one partition each and set infinite retention for the users and items topics which will contain the lookup data
to enrich the orders data stream.
Note: We use partitioned topics in order to be able to increase the number of partition later, in case we need to scale. Otherwise if we had a not-partitioned topic we would have to create 
a new partitioned topic and transfer all the data to this new topic. 


## 1. Reading data from Pulsar
We our environment setup let's start addressing our use case.
As a first step let's run our producers to generate some data into our `users` and `items` topics.
You can find the producer code [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/src/main/java/io/ipolyzos/producers/LookupDataProducer.java)
The producer code should be pretty straightforward, but if you are not familiar with Pulsar producers you can take a look at the resources provided at the end of the blog post.
After running the producer you should see an output similar to the following 
```shell
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:26 - Total 2190
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:27 - Total 2191
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:28 - Total 2192
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:29 - Total 2193
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:30 - Total 2194
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:31 - Total 2195
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:32 - Total 2196
17:35:43.861 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.LookupDataProducer - ✅ Acked message 35:98:0:33 - Total 2197
```
At this point we have populated the `users` and `items` topic with a few records.
The next step is to create 3 Pulsar-Flink sources that will read data from the `users`, `items` and `orders` topics.
In order achieve this we will use the Pulsar Flink connector. You can find more information about the connectors [here](https://nightlies.apache.org/flink/flink-docs-release-1.14/docs/connectors/datastream/pulsar/)
The following code snippet show a basic Pulsar-Flink source:
```shell
PulsarSource<String> pulsarSource = PulsarSource.builder()
    .setServiceUrl("pulsar://localhost:6650")
    .setAdminUrl("http://localhost:8080")
    .setStartCursor(StartCursor.earliest())
    .setTopics("my-topic")
    .setDeserializationSchema(PulsarDeserializationSchema.flinkSchema(new SimpleStringSchema()))
    .setSubscriptionName("my-subscription")
    .setSubscriptionType(SubscriptionType.Exclusive)
    .build();
```
There are a few points to highlight here:
1. We need to provide the service and admin urls (the ones we exposed also on our docker compose file).
2. Start Cursor is the position we want to start consuming messages from. Earliest indicates we want to start consuming messages from the beginning of the topic.
3. The topic name, the name of the subscription and also the type of the subscription. You can find more information around Pulsar Subscription Types [here](https://pulsar.apache.org/docs/2.3.2/concepts-messaging/#subscription-types)
4. Finally, we need to provide what type of schema we wish to consume. In this example it's of type String, but we will use JsonSchema for our example use-case.

Now that we have a better understanding of how we can establish a connection to Pulsar topic using the connector let's create 3 connections to our 3 different topics.
We will also use the `orders` datasource and print the stream in the console so we can verify we can indeed consume messages.
The following code snippet shows the relevant code for doing that, but you can find the complete code [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/src/main/java/io/ipolyzos/compute/v1/EnrichmentStream.java)
```java
        // 2. Initialize Sources
        PulsarSource<User> userSource =
        EnvironmentUtils.initPulsarSource(
        AppConfig.USERS_TOPIC,
        "flink-user-consumer",
        SubscriptionType.Exclusive,
        StartCursor.earliest(),
        User.class);

        PulsarSource<Item> itemSource =
        EnvironmentUtils.initPulsarSource(
        AppConfig.ITEMS_TOPIC,
        "flink-items-consumer",
        SubscriptionType.Exclusive,
        StartCursor.earliest(),
        Item.class);

        PulsarSource<Order> orderSource =
        EnvironmentUtils.initPulsarSource(
        AppConfig.ORDERS_TOPIC,
        "flink-orders-consumer",
        SubscriptionType.Exclusive,
        StartCursor.earliest(),
        Order.class);

```
The final step as you can see in the complete source code file is to create a Watermark strategy for our orders input data stream, so we can handle late order events.
We will use the creation time of the order as our Event Time, so let's extract it from the payload.
```java
WatermarkStrategy<Order> watermarkStrategy =
                WatermarkStrategy.<Order>forBoundedOutOfOrderness(Duration.ofSeconds(5))
                        .withTimestampAssigner(
                                (SerializableTimestampAssigner<Order>) (order, l) -> order.getCreatedAt()
                        );
```
The last step here is to actually package and deploy our code on our cluster.
In order to achieve this, i have provided a simple helper script, which you can find [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/deploy.sh).
All you need to do is run `./deploy.sh` and navigate on your terminal where you have the output logs from the previous `docker-compose up` command we run.
After a little while the job should be deployed and after that start running the `OrdersDataSource` found [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/src/main/java/io/ipolyzos/producers/OrdersDataSource.java)
and you should start seeing some orders on your terminal logs similar to this:

```shell
taskmanager_1  | Order(invoiceId=44172, lineItemId=192933, userId=145493, itemId=602, itemName=prize-winning instrument, itemCategory=instrument, price=48.40000000000001, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=44172, lineItemId=385101, userId=145493, itemId=3362, itemName=matte instrument, itemCategory=instrument, price=55.0, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=44172, lineItemId=285219, userId=145493, itemId=2584, itemName=industrial-strength instrument, itemCategory=instrument, price=132.0, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=245615, lineItemId=229127, userId=112915, itemId=1982, itemName=extra-strength gadget wrapper, itemCategory=gadget, price=71.2, createdAt=1463179333000, paidAt=1463195221000)
taskmanager_1  | Order(invoiceId=245615, lineItemId=384894, userId=112915, itemId=564, itemName=gadget wrapper, itemCategory=gadget, price=35.6, createdAt=1463179333000, paidAt=1463195221000)
taskmanager_1  | Order(invoiceId=343211, lineItemId=258609, userId=34502, itemId=1257, itemName=tool warmer, itemCategory=tool, price=27.500000000000004, createdAt=1421975214000, paidAt=1422101333000)
```

Congrats! We have successfully consumed messages from Pulsar.

## 2. Performing Data Lookups with the Flink Process Function
Now that we verified we can read our events, the next step is to combine these multiple sources together, extract the user 
Combining two datastreams together should look similar to this:
```java
 DataStream<OrderWithUserData> orderWithUserDataStream = orderStream
        .keyBy(Order::getUserId)
        .connect(userStream.keyBy(User::getId))
        .process(new UserLookupHandler())
        .uid("usersLookup")
        .name("usersLookup");
```
Here we specify that we want our streams to be partitioned based on some key so Flink can make sure that the 
same keys will be processed by the same taskmanager.
The connect functions allows us to "connect" two streams together and the what we want to do with the inputs of these
two datastreams is some logic we implement ourselves and pass it to the process functions.
Our implementation should look similar to this:
```java
public class UserLookupHandler extends CoProcessFunction<Order, User, OrderWithUserData> {
    private static final Logger logger = LoggerFactory.getLogger(UserLookupHandler.class);
    private ValueState<User> userState;
    
    @Override
    public void open(Configuration parameters) throws Exception {
        logger.info("{}, initializing state ...", this.getClass().getSimpleName());

        userState = getRuntimeContext()
                .getState(
                        new ValueStateDescriptor<User>("userState", User.class)
                );
    }

    @Override
    public void processElement1(Order order, CoProcessFunction<Order, User, OrderWithUserData>.Context context,
                                Collector<OrderWithUserData> collector) throws Exception {
        User user = userState.value();
        if (user == null) {
            logger.warn("Failed to find state for id '{}'", order.getUserId());
        } else {
            collector.collect(order.withUserData(user));
        }
    }

    @Override
    public void processElement2(User user,
                                CoProcessFunction<Order, User, OrderWithUserData>.Context context,
                                Collector<OrderWithUserData> collector) throws Exception {
        userState.update(user);
    }
}
```
This is the implementation for the `users` and `orders` streams and the implementation for adding the `items` is similar.
We extend the `CoProcessFunction` which basically processes elements of two input streams (here users and orders) and produces a single output (here OrderWithUserData).
The function will be called for every element in the input streams and can produce zero or more output elements.
Note that for each `user` record we receive we use the Value<User> state in order to store it.
Then for every incoming order to try and "query" this state and if we find a matching key we enrich our order record (later we will see how we can handle scenarios were there is no user state present for a particular key).
As we mentioned the implementation for handling `Item` state should is similar:
```java
public class ItemLookupHandler extends CoProcessFunction<OrderWithUserData, Item, EnrichedOrder> {
    private static final Logger logger = LoggerFactory.getLogger(UserLookupHandler.class);
    private ValueState<Item> itemState;


    @Override
    public void open(Configuration parameters) throws Exception {
        logger.info("{}, initializing state ...", this.getClass().getSimpleName());

        itemState = getRuntimeContext()
                .getState(
                        new ValueStateDescriptor<Item>("itemState", Item.class)
                );
    }

    @Override
    public void processElement1(OrderWithUserData order,
                                CoProcessFunction<OrderWithUserData, Item, EnrichedOrder>.Context context,
                                Collector<EnrichedOrder> collector) throws Exception {
        Item item = itemState.value();
        if (item == null) {
            logger.warn("Failed to find state for id '{}'", order.getItemId());
        } else {
            collector.collect(
                    new EnrichedOrder(
                            order.getInvoiceId(),
                            order.getLineItemId(),
                            order.getUser(),
                            item,
                            order.getCreatedAt(),
                            order.getPaidAt()
                    )
            );
        }
    }

    @Override
    public void processElement2(Item item,
                                CoProcessFunction<OrderWithUserData, Item, EnrichedOrder>.Context context,
                                Collector<EnrichedOrder> collector) throws Exception {
        itemState.update(item);
    }
}
```
You can find a full implementation under the `v2` package [here](https://github.com/polyzos/pulsar-flink-stateful-streams/tree/main/src/main/java/io/ipolyzos/compute/v2).
Once more let's package and redeploy our application and verify it works.
[Note] make sure to modify the `deploy.sh` script to point to the updated `v2` version file.
Following the steps we did at step 1, by running the `deploy.sh` script, running the producer and checking the logs we should 
see an output similar to the following:
```shell
taskmanager_1  | EnrichedOrder(invoiceId=67052, lineItemId=326416, user=User(id=88300, firstName=Davis, lastName=MDavis1997@earthlink.edu, emailAddress=MDavis1997@earthlink.edu, createdAt=1441790913000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=930, createdAt=1388876010000, adjective=, category=module, modifier=, name=module, price=100.0), createdAt=1443643093000, paidAt=1443745976000)
taskmanager_1  | EnrichedOrder(invoiceId=67052, lineItemId=146888, user=User(id=88300, firstName=Davis, lastName=MDavis1997@earthlink.edu, emailAddress=MDavis1997@earthlink.edu, createdAt=1441790913000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=80, createdAt=1372810111000, adjective=rechargable, category=module, modifier=cleaner, name=rechargable module cleaner, price=78.0), createdAt=1443643093000, paidAt=1443745976000)
taskmanager_1  | EnrichedOrder(invoiceId=67052, lineItemId=204597, user=User(id=88300, firstName=Davis, lastName=MDavis1997@earthlink.edu, emailAddress=MDavis1997@earthlink.edu, createdAt=1441790913000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=336, createdAt=1385261877000, adjective=fuzzy, category=module, modifier=, name=fuzzy module, price=100.0), createdAt=1443643093000, paidAt=1443745976000)
taskmanager_1  | EnrichedOrder(invoiceId=220846, lineItemId=48384, user=User(id=182477, firstName=Powell, lastName=MarinaPowell@mail.com, emailAddress=MarinaPowell@mail.com, createdAt=1485101903000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=1514, createdAt=1387918171000, adjective=miniature, category=apparatus, modifier=cleaner, name=miniature apparatus cleaner, price=99.0), createdAt=1493699951000, paidAt=1493632923000)
taskmanager_1  | EnrichedOrder(invoiceId=220846, lineItemId=230208, user=User(id=182477, firstName=Powell, lastName=MarinaPowell@mail.com, emailAddress=MarinaPowell@mail.com, createdAt=1485101903000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=2425, createdAt=1372279813000, adjective=, category=apparatus, modifier=, name=apparatus, price=300.0), createdAt=1493699951000, paidAt=1493632923000)
taskmanager_1  | EnrichedOrder(invoiceId=278358, lineItemId=129026, user=User(id=97081, firstName=Adebayo, lastName=SunitaAdebayo@inbox.info, emailAddress=SunitaAdebayo@inbox.info, createdAt=1446040475000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=3435, createdAt=1373472723000, adjective=industrial-strength, category=widget, modifier=cleaner, name=industrial-strength widget cleaner, price=5.4), createdAt=1453951447000, paidAt=1454087954000)
```
Looks like we have successfully enriched our `Orders` records with `User` and `Items` data.
Since we have our logic implemented there are two questions we need to address to better enhance the behavior of our application:
1. How can investigate further a record that for some reason there is no matching user and/or item record id?
2. The state we build is kept in memory, so what happens if my state becomes so large it can't fit in memory and in case of failures like `OutOfMemoryExceptions`?

Next, let's see how can address these questions.

## 3. Using Side Outputs to collect missing state.
In order to address how we can handle records that have no matching state, we will use Flink's [Side Outputs](https://nightlies.apache.org/flink/flink-docs-master/docs/dev/datastream/side_output/).
You can think of Side Outputs like a branch of a stream where you can redirect records that don't comply with your processing logic
and need to be propagated to a different output downstream, like printing them to the console, another Pulsar topic or a database.
Using side outputs is pretty straight forward. First we need to modify our process function logic, like:
```java
public class UserLookupHandler extends CoProcessFunction<Order, User, OrderWithUserData> {
    private static final Logger logger = LoggerFactory.getLogger(UserLookupHandler.class);
    private final OutputTag<EnrichedOrder> missingStateTag;                                 (1)
    private ValueState<User> userState;

    public UserLookupHandler(OutputTag<EnrichedOrder> missingStateTag) {
        this.missingStateTag = missingStateTag;
    }

    @Override
    public void open(Configuration parameters) throws Exception {
        logger.info("{}, initializing state ...", this.getClass().getSimpleName());

        userState = getRuntimeContext()
                .getState(
                        new ValueStateDescriptor<User>("userState", User.class)
                );
    }

    @Override
    public void processElement1(Order order, CoProcessFunction<Order, User, OrderWithUserData>.Context context,
                                Collector<OrderWithUserData> collector) throws Exception {
        User user = userState.value();
        if (user == null) {
            logger.warn("Failed to find state for id '{}'", order.getUserId());
            EnrichedOrder enrichedOrder =
                    new EnrichedOrder(order.getInvoiceId(), order.getLineItemId(), null, null, order.getCreatedAt(),
                            order.getPaidAt());
            context.output(missingStateTag, enrichedOrder);                                  (2)
        } else {
            collector.collect(order.withUserData(user));
        }
    }

    @Override
    public void processElement2(User user,
                                CoProcessFunction<Order, User, OrderWithUserData>.Context context,
                                Collector<OrderWithUserData> collector) throws Exception {
        userState.update(user);
    }
}
```
**(1)** We create an OutputTag typed with our output
**(2)** If we find no state present for a particular id then we add the particular record to the side output
We also need to modify our main class to support Side Outputs:
```java
    final OutputTag<EnrichedOrder> missingStateTagUsers = new OutputTag<>("missingState#User"){};
    final OutputTag<EnrichedOrder> missingStateTagItems = new OutputTag<>("missingState#Item"){};

    enrichedOrderStream.getSideOutput(missingStateTagUsers)
        .printToErr()
        .name("MissingUserStateSink")
        .uid("MissingUserStateSink");
    
    enrichedOrderStream.getSideOutput(missingStateTagItems)
        .printToErr()
        .name("MissingItemStateSink")
        .uid("MissingItemStateSink"); 
```
Here we create two side outputs one for missing user state and one for the items state. Then from our output stream
we extract the side outputs and print them.

[Note:] At this point it's also worth highlighting the use of `name` and `uid` for each operator.
Specifying names for your operators can be considered as best practise for your Flink Job
This is useful to easier identify the operator on the Flink UI and also in cases you need to use savepoints to resume your job, after a code modification or scaling requirement (more on that later.)
You can find the full implementation as always under the `v3` package [here](https://github.com/polyzos/pulsar-flink-stateful-streams/tree/main/src/main/java/io/ipolyzos/compute/v3)

We have covered a lot so far. So take a moment to walkthrough our implementation and what we have achieved so far.
As a quick recap:
1. We have created 3 input sources that consume data from 3 different pulsar topics
2. The `orders` topic is a realtime stream and the `users` and `orders` topics are changelog streams (i.e maintain the last state per key)
3. We have used Flink's process function along with Flink's state to enrich the input `orders` stream with the further information from the `users
 and `items` topics
4. We have introduced Side Outputs to handle records for which state is not present and we don't have additional information. In a real life scenario you can sent an email to a user for their order without their email information, right?

After we have comprehend the above logic, we are left with one question - how we deal with fault-tolerance - to deal
with scenarios were our state grows quite big and/or our job crashes and we need to recover fast.

## 4. Working towards fault tolerance

Setup the following configurations
```shell
        // Checkpoints configurations
        env.enableCheckpointing(5000);
        env.getCheckpointConfig().setMinPauseBetweenCheckpoints(500);
        env.getCheckpointConfig().setCheckpointStorage(AppConfig.checkpointDir);
        env.setStateBackend(new EmbeddedRocksDBStateBackend());
        env.getCheckpointConfig().setExternalizedCheckpointCleanup(
                CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
        );

        // Configure Restart Strategy
        env.setRestartStrategy(
                RestartStrategies.fixedDelayRestart(5, Time.of(10, TimeUnit.SECONDS))
        );
```

Deploy again and navigate to the flink UI, if you go to the Job UI you should see the following and checkpoints being created.
![Alt text](../images/flink/ch_overview.png "Ch Overview")

![Alt text](../images/flink/ch_history.png "Ch History")

![Alt text](../images/flink/ch_config.png "Ch Config")

Now let's open a new terminal and run the following command to connect to our taskmanager container
```shell
docker exec -it pulsar-flink-stateful-streams_taskmanager_1 bash
```

![Alt text](../images/flink/fs.png "FS")

Under the /opt/flink directory you should see a directory named checkpoints
```shell
checkpoints/0c83cf0320b3fc6fdcdb3d8323c27503/
```
This is the directory flink uses to store all of the checkpoints.
This means that when we get a savepoint or our job crashes or we stop it and need to restore it from that state
we can do so by using this checkpoint directory.
So lets test this out - kill your current flink job running and then try to restart the job by running the following command:
```shell
./bin/flink run --class io.ipolyzos.compute.v4.EnrichmentStream \
  -s checkpoints/0c83cf0320b3fc6fdcdb3d8323c27503/chk-17/ \
  job.jar
```
With this command we basically start our job, but we instruct Flink to use the latest checkpoint and continue from there.
Navigate to the Flink UI and you should see something similar to the following screenshot

![Alt text](../images/flink/job.png "JOB")
You can see that while we consume new orders, our orders actually get enriched with the state, but our `user` and `items`
sources haven't read any new records. This means that the state was restored from the checkpoint and flink new how
to rebuild the state and doesn't need to read the topics again.

## 4. Conclusion

