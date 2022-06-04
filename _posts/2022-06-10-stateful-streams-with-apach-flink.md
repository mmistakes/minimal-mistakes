---
title: "Stateful Streams with Apache Flink"
date: 2022-06-10
header:
image: "/images/blog cover.jpg"
tags: [pulsar, flink, stateful stream processing]
excerpt: "We will discuss how you can use Apache Pulsar along with Apache Flink to perform Data Enrichment with state from different topics."
---

_This article is a collaboration between me (Daniel) and [Giannis Polyzos](https://www.linkedin.com/in/polyzos/), one of the earliest students of Rock the JVM back in 2017. 
Giannis is now a Senior Engineer and a contributor to Apache Pulsar, a promising new toolkit for distributed messaging and streaming. 
In this piece we combine two of our favorite pieces of tech: Apache Pulsar and Apache Flink._

![Alt text](../images/pf1.png "Unified Batch & Streaming")

### Prerequisites
Before we start, some basic familiarity with Apache Pulsar and Apache Flink is required. To better understand the implementation in this blog post 
we suggest getting familiar with the basic concepts of Apache Pulsar and Apache Flink. See the [Additional Resources](#additional-resources) section.

### Introduction
Typical Streaming data architectures include a streaming storage layer like Apache Pulsar that serves as the backbone of the infrastructure.
Stateful stream processing is also required to deliver advance analytics for you users and you want to use a stream computing engine 
like Apache Flink to handle time based computations especially when large state is required.
Data often resides inside multiple different topics in a streaming storage layer and its important to be able to combine data from multiple input sources.

In this blog post we will walkthrough how you can use Apache Flink to enrich real time data streams with data that resides into large changelog topics.
We will use Apache Pulsar as our streaming storage layer.
Apache Pulsar and Apache Flink have a strong integration together and enable a Unified Batch and Streaming Architecture.
If you are interested about this type of Architecture you can find more [here](https://www.youtube.com/watch?v=2MpiE238Pzw)

## Example Use Case
![Alt text](../images/pf2.png "Example Use Case")

Our example use case is an online store and users come online to place orders for different items.
Every new order is written into an **orders** topic and the same applies for each newly registered users or items - written into the **users** and **items** topics respectively. 
We treat **users** and **items** topics as **changelog** streams - this means that the events written in those topics will be 
a **<key, value>** pair and for each unique key we are only interested in the latest value.

For example if **user1** updates the phone number we are ony interested in the latest updated value. The same goes for a product.
We will consider these **changelog** topics as our **state**.

A common use case in streaming systems is combining data from different topics, in order to perform some kind of data validation or data enrichment.
In our example need to enrich the input **order** events with the **state** - i.e query the user and product information to be
able to take actions like - sending out an email thanking our user for their purchase, calculating some reward points to see if 
they are eligible for a discount coupon or even recommend purchasing something similar to the product they just bought.
they bought from a store nearby.

Our focus for this blog post though is enriching an input event stream with information from events in other topics.

We will take a hands-on approach and better understand how we can:
1. Connect Apache Pulsar with Flink and verify we can consume events from different topics
2. Use Flink's process functions to perform data enrichment.
3. Use Side-Outputs to account for scenarios that state is not present, and we want to further investigation the why.
4. Use RocksDB for large state we can not keep in-memory
5. Recover from failures with Checkpoints and Restart Strategies
6. How we can resume our Flink Job using Savepoints.

There is a lot to cover here, so we will build on them incrementally. Let's jump right into it.

## Pre-Flight Check
Before we start with the implementation let's make sure we have our dependencies in place and our environment setup.
The examples here will be in Java, so let's add the following dependencies to our `pom.xml` file.
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

We also require Pulsar and Flink, so we will use [docker-compose](https://docs.docker.com/compose/) to spin them up.
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
There are a few things to note here. 
First we create a Flink Cluster with one taskmanager that has 2 slots and a Pulsar cluster.
We expose ports **8080** that is the Pulsar http port as well as port **6650** which is the broker port. 
We also enable some configurations: the first two **systemTopicEnabled** and **topicLevelPoliciesEnabled** allow us to use topic level policies. 
We need those in order to use infinite retention at the topic level, i.e keep our data around infinitely. Since we treat **users** and **items** as "state" we need to be able 
to have this state around in case we need to replay it, right?
Then we have the **transactionCoordinatorEnabled** which enables the transaction coordinator which is used by the Pulsar-Flink connector.
So let's start our clusters by running **docker-compose up**.

With our clusters up and running we need to create our topics and apply some topic policies.
Retention topic policies will also allow us to reply our events in a case of failure if required.
We can run this [script](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/setup.sh) to perform this setup.
It will create 3 partitioned topics (orders, users and items) each with one partition and set an infinite retention policy for the **changelog** topics.

**Note:** We use partitioned topics in order to be able to increase the number of partition later, in case we need to scale. Otherwise if we had a not-partitioned topic we would have to create 
a new partitioned topic and transfer all the data to this new topic.

## 1. Reading data from Pulsar
With our setup in place, let's see the implementation now.
First we will run the producers to simulate some **users** and **items** created in our system.
You can find the producer code [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/src/main/java/io/ipolyzos/producers/LookupDataProducer.java)
The producer code should be pretty straightforward, but if you are not familiar with Pulsar producers you can take a look at the resources provided at the end of the blog post.
After running the producer you should see an output similar to the following:
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
The next step is to create 3 **Pulsar-Flink** sources that will listen and consume events in the topics.
We will use the Pulsar Flink connector, can find more information about the connectors [here](https://nightlies.apache.org/flink/flink-docs-release-1.14/docs/connectors/datastream/pulsar/)
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
There are a few things to highlight here:
1. We need to provide the service and admin urls (the ones we exposed also on our docker compose file).
2. Start Cursor is the position we want to start consuming messages from. Earliest indicates we want to start consuming messages from the beginning of the topic.
3. The topic name, the name of the subscription and also the type of the subscription. You can find more information around Pulsar Subscription Types [here](https://pulsar.apache.org/docs/2.3.2/concepts-messaging/#subscription-types)
4. Finally, we need to provide what type of schema we wish to consume. In this example it's of type String, but we will use **JsonSchema** for our implementation.

The following code snippet shows how to connect to our topics and print the, but you can find the complete code [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/src/main/java/io/ipolyzos/compute/v1/EnrichmentStream.java)
```java
        // 2. Initialize Sources
        PulsarSource<User> userSource =
            EnvironmentUtils.initPulsarSource(
                    AppConfig.USERS_TOPIC,
                    "flink-user-consumer",  
                    SubscriptionType.Exclusive,
                    StartCursor.earliest(),
                    User.class
            );

        PulsarSource<Item> itemSource =
            EnvironmentUtils.initPulsarSource(
                    AppConfig.ITEMS_TOPIC,
                    "flink-items-consumer",
                    SubscriptionType.Exclusive,
                    StartCursor.earliest(),
                    Item.class
        );

        PulsarSource<Order> orderSource =
            EnvironmentUtils.initPulsarSource(
                    AppConfig.ORDERS_TOPIC,
                    "flink-orders-consumer",
                    SubscriptionType.Exclusive,
                    StartCursor.earliest(),
                    Order.class
        );
```
We will also create a Watermark strategy for our orders input data stream to handle late order events.
Event Time with be tracked by the creation time within the **Order** event.
```java
WatermarkStrategy<Order> watermarkStrategy =
                WatermarkStrategy.<Order>forBoundedOutOfOrderness(Duration.ofSeconds(5))
                        .withTimestampAssigner(
                                (SerializableTimestampAssigner<Order>) (order, l) -> order.getCreatedAt()
                        );
```
The last step is to actually package and deploy our code on our cluster.
To make it easier we can use the helper script [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/deploy.sh).
Run `./deploy.sh` and navigate to the terminal we run the `docker-compose up` command.
Give it a few seconds and then the job should be deployed and now we can run the **OrdersDataSource** found [here](https://github.com/polyzos/pulsar-flink-stateful-streams/blob/main/src/main/java/io/ipolyzos/producers/OrdersDataSource.java)
to produce some events in our system.
Running the producer and checking the logs on your terminal logs, you should see something similar to this:
```shell
taskmanager_1  | Order(invoiceId=44172, lineItemId=192933, userId=145493, itemId=602, itemName=prize-winning instrument, itemCategory=instrument, price=48.40000000000001, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=44172, lineItemId=385101, userId=145493, itemId=3362, itemName=matte instrument, itemCategory=instrument, price=55.0, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=44172, lineItemId=285219, userId=145493, itemId=2584, itemName=industrial-strength instrument, itemCategory=instrument, price=132.0, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=245615, lineItemId=229127, userId=112915, itemId=1982, itemName=extra-strength gadget wrapper, itemCategory=gadget, price=71.2, createdAt=1463179333000, paidAt=1463195221000)
taskmanager_1  | Order(invoiceId=245615, lineItemId=384894, userId=112915, itemId=564, itemName=gadget wrapper, itemCategory=gadget, price=35.6, createdAt=1463179333000, paidAt=1463195221000)
taskmanager_1  | Order(invoiceId=343211, lineItemId=258609, userId=34502, itemId=1257, itemName=tool warmer, itemCategory=tool, price=27.500000000000004, createdAt=1421975214000, paidAt=1422101333000)
```
Congrats! We have successfully consumed messages from Pulsar.

## 2. Performing Data Enrichment
We verified we can read our events so the next step is data enrichment, i.e "query" user and item information from the **changelog** topics.
To achieve this with Flink it will look similar to this:
```java
 DataStream<OrderWithUserData> orderWithUserDataStream = orderStream
        .keyBy(Order::getUserId)
        .connect(userStream.keyBy(User::getId))
        .process(new UserLookupHandler())
        .uid("usersLookup")
        .name("usersLookup");
```
We partition the streams on the UserId and Flink will make sure that same keys will be processed by the same TaskManager.
The **connect** function allows us to "connect" two streams and specify some processing logic with the **process** function.
The process function implementation should look similar to this:
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

We extend the **CoProcessFunction** that processes elements of two input streams (here users and orders) and produces a single output (here OrderWithUserData).
The function will be called for every event coming from each input streams and can produce zero or more output elements.
Note that for each **user** record we receive we use the **Value<User>** state in order to store it.
Then for every incoming order to try and "query" this state and if there is a matching key we enrich the order event.
(Later we deal with missing state scenarios and how we can handle scenarios them).
The implementation for enriching with **Item** values is similar:

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

You can find a full implementation under the **v2** package [here](https://github.com/polyzos/pulsar-flink-stateful-streams/tree/main/src/main/java/io/ipolyzos/compute/v2).
Let's package and redeploy our application and verify it works.
**Note** make sure to modify the `deploy.sh` script to point to the updated **v2** version file.

Following our previous steps:
1. Run the `deploy.sh` script
2. Generate some **Order** events
3. Check the logs 

We should see an output similar to this:
```shell
taskmanager_1  | EnrichedOrder(invoiceId=67052, lineItemId=326416, user=User(id=88300, firstName=Davis, lastName=MDavis1997@earthlink.edu, emailAddress=MDavis1997@earthlink.edu, createdAt=1441790913000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=930, createdAt=1388876010000, adjective=, category=module, modifier=, name=module, price=100.0), createdAt=1443643093000, paidAt=1443745976000)
taskmanager_1  | EnrichedOrder(invoiceId=67052, lineItemId=146888, user=User(id=88300, firstName=Davis, lastName=MDavis1997@earthlink.edu, emailAddress=MDavis1997@earthlink.edu, createdAt=1441790913000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=80, createdAt=1372810111000, adjective=rechargable, category=module, modifier=cleaner, name=rechargable module cleaner, price=78.0), createdAt=1443643093000, paidAt=1443745976000)
taskmanager_1  | EnrichedOrder(invoiceId=67052, lineItemId=204597, user=User(id=88300, firstName=Davis, lastName=MDavis1997@earthlink.edu, emailAddress=MDavis1997@earthlink.edu, createdAt=1441790913000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=336, createdAt=1385261877000, adjective=fuzzy, category=module, modifier=, name=fuzzy module, price=100.0), createdAt=1443643093000, paidAt=1443745976000)
taskmanager_1  | EnrichedOrder(invoiceId=220846, lineItemId=48384, user=User(id=182477, firstName=Powell, lastName=MarinaPowell@mail.com, emailAddress=MarinaPowell@mail.com, createdAt=1485101903000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=1514, createdAt=1387918171000, adjective=miniature, category=apparatus, modifier=cleaner, name=miniature apparatus cleaner, price=99.0), createdAt=1493699951000, paidAt=1493632923000)
taskmanager_1  | EnrichedOrder(invoiceId=220846, lineItemId=230208, user=User(id=182477, firstName=Powell, lastName=MarinaPowell@mail.com, emailAddress=MarinaPowell@mail.com, createdAt=1485101903000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=2425, createdAt=1372279813000, adjective=, category=apparatus, modifier=, name=apparatus, price=300.0), createdAt=1493699951000, paidAt=1493632923000)
taskmanager_1  | EnrichedOrder(invoiceId=278358, lineItemId=129026, user=User(id=97081, firstName=Adebayo, lastName=SunitaAdebayo@inbox.info, emailAddress=SunitaAdebayo@inbox.info, createdAt=1446040475000, deletedAt=-1, mergedAt=-1, parentUserId=-1), item=Item(id=3435, createdAt=1373472723000, adjective=industrial-strength, category=widget, modifier=cleaner, name=industrial-strength widget cleaner, price=5.4), createdAt=1453951447000, paidAt=1454087954000)
```

We have successfully enriched our **Orders** events with **User** and **Items** information.
At this point there are two questions we need to address:
1. How can we investigate records that have no matching user and/or item record id?
2. Our state is kept in memory so how can we handle state too large to fit in memory?
Let's see how can achieve this.

## 3. Using Side Outputs for missing state.
Working with Distributed Systems we want to be able to handle the "Unhappy Paths", i.e an unexpected behavior within our system.
When an order is submitted we assume the information for the user and a purchased item are always present, but can we be guarantee this is always the case?

In order to have more visibility we introduce Flink's [Side Outputs](https://nightlies.apache.org/flink/flink-docs-master/docs/dev/datastream/side_output/).
You can think of Side Outputs like a branch of a stream you can use to redirect events that don't comply with your expected behavior
and need to be propagated to a different output downstream, like printing them to the console, another Pulsar topic or a database.

Doing this, if we hit a scenario that a user or item event is missing we can propagate the order event downstream.
We might not be sure why this happened but at least we have visibility that it happened and can investigate more. 
Using Side Outputs is pretty to use.
First we need to modify our process function logic:
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

- **(1)** We create an OutputTag typed with our output event **OrderWithUserData**.
- **(2)** If a key is not present in our state for a particular id then we add the event to the side output.

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

Here we create two side outputs - one for missing user and one for item events. Then we extract the side outputs from out output stream and print it.

**Note:** It's also worth highlighting the use of **name** and **uid** for each operator.
Specifying names for your operators can be considered as best practise for your Flink Job
This is useful to easier identify the operator on the Flink UI and also in cases you need to use savepoints to resume your job, after a code modification or scaling requirement (more on that later.)
You can find the full implementation under the **v3** package [here](https://github.com/polyzos/pulsar-flink-stateful-streams/tree/main/src/main/java/io/ipolyzos/compute/v3)

We have covered a lot so far. So let's take a moment and walk through the implementation and what we have achieved so far.

As a quick recap:
1. We have created 3 input sources that consume data from 3 different Pulsar topics
2. The **orders** topic is a realtime event stream. **Users** and **orders** topics are changelog streams (i.e maintain the last state per key)
3. We leverage Flink's process function along with Flink's state to enrich the input **orders** event stream **user** and **item** events.
4. We introduced Side Outputs to handle events with no matching keys in the user or items state.
In a real life scenario you can't email a user without their email information or before you have verified they have given consent, right?

We are left one open question - how we provide Fault-tolerance guarantees for our streaming job.
We want to account for scenarios that our state grows quite large to fit in memory and/or our job crashes, and we need to recover fast.

## 4. Making our job Fault Tolerant
> Checkpoints make state in Flink Fault Tolerant by allowing state and the corresponding stream positions to be recovered, thereby giving the application the same semantics as a failure-free execution.

We can easily enable checkpoints by applying some configuration option. We will enable the required configuration option and along with that
we will also add a Restart Strategy to let Flink try and restart a job upon an Exception.
Combining a Restart Strategy with Checkpoints gives our job the ability to recover in case of an Exception - for example due to temporary connection error.
For critical exceptions that will continually kill our job the best approach will be to apply kill the job, apply some fix and recover with a [savepoint](https://nightlies.apache.org/flink/flink-docs-master/docs/ops/state/savepoints/)

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
This is the directory flink uses to store all the checkpoints.
This means that when we get a savepoint, our job crashes or we stop it and need to restore it from a particular checkpoint we can do so by using this checkpoint directory.
So lets test this out - by killing our running flink job and then try to restart, using the following command:
```shell
./bin/flink run --class io.ipolyzos.compute.v4.EnrichmentStream \
  -s checkpoints/0c83cf0320b3fc6fdcdb3d8323c27503/chk-17/ \
  job.jar
```
With this command we basically start the job while instructing Flink to use the latest checkpoint and continue from there.
Navigate to the Flink UI and you should see something similar to the following screenshot
![Alt text](../images/flink/job.png "JOB")
You can see that while we consume new order events, the events actually get enriched with **user** and **item** information
even though our source streams haven't read any new records. 
This means the state is restored from the checkpoint and flink knows how to rebuild it without replaying all the events from the topics.

## Additional Resources
- RockTheJvm Apache Flink Course: https://rockthejvm.com/p/flink
- Apache Pulsar Documentation:
   - Pulsar Overview: https://pulsar.apache.org/docs/concepts-overview/
   - Pulsar Producers: https://pulsar.apache.org/docs/concepts-messaging/
- Streamnative Academy:
   - Apache Pulsar Fundamentals: https://www.academy.streamnative.io/courses/course-v1:streamnative+AP101+UNLM/about
   - Pulsar API Essentials - Java https://www.academy.streamnative.io/courses/course-v1:streamnative+AP101-Lab+UNLM/about
- Apache Pulsar Ebooks: https://streamnative.io/ebooks/
- Using RocksDB State Backend in Apache Flink: When and How: https://flink.apache.org/2021/01/18/rocksdb.html
- Apache Flink Restart Strategies: https://kartikiyer.com/2019/05/26/choosing-the-correct-flink-restart-strategy-avoiding-production-gotchas/
- Apache Flink Checkpoints: https://nightlies.apache.org/flink/flink-docs-master/docs/ops/state/checkpoints/