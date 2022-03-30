---
title: "Stateful Streams with Apache Flink"
date: 2022-01-29
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

### 1. Introduction
Typical Data Architectures include a streaming storage layer like Apache Pulsar which serves as the backbone of the infrastructure, combined with a stream computing engine 
like Apache Flink in order to perform advanced streaming computations. Data often resides inside multiple different topics in a streaming storage layer and it is required to
combine data from multiple topics in order to have the right context for more advanced analytics or processing. In this blog post we will walkthrough how you can use Apache Flink to
enrich real time data streams with data that resides into large changelog topics. We will use Apache Pulsar as our streaming storage layer.
Apache Pulsar and Apache Flink have a strong integration together and enable a Unified Batch and Streaming Architecture. If you are interested about this type of Architecture you can find more [here](https://www.youtube.com/watch?v=2MpiE238Pzw)

## 2. Example Use Case
![Alt text](../images/pf2.png "Example Use Case")

As an example use case we will consider an online store. Users come online to our store and place orders. Every order is ingested into the `orders` topic and at the same time
every user registered as well as every item are ingested into the `users` and `items` topics respectively. They contain a unique id which is used as the key for the message
written into the topic.

## 3. Pre-Flight Check
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
We expose ports `8080` that is the Pulsar http port as well as port `6650` which is the broker port. We also enable some configuration: the first two `systemTopicEnabled` and 
`topicLevelPoliciesEnabled` allow to use topic level policies. We need those in order to use infinite retention at the topic level, i.e keep our data around infinitely.
The `transactionCoordinatorEnabled` enables the transactions coordinator which is used by the Pulsar-Flink connector.
Now you can easily spin up the clusters by running `docker-compose up`.

At this point we have our clusters up and running and the last thing we want to do is create our topics and set infinite retention on our lookup data topics.
The reason we want to enable infinite retention is for disaster recovery scenarios, so we are able to replay the whole state from the topic and not lose it.
You can find a helper script that creates all the required topics and sets the policies on the github repo [here]().
We create 3 partitioned topics (orders, users and items), with one partition each and set infinite retention for the users and items topics which will contain the lookup data
to enrich the orders data stream.
Note: We use partitioned topics in order to be able to increase the number of partition later, in case we need to scale. Otherwise if we had a not-partitioned topicm we would have to create 
a new partitioned topic and transfer all the data to this new topic.

## 4. Reading data from Pulsar
In order to read data from these 3 Pulsar Topic with Flink we will use the Pulsar Flink connector. You can find more information about the connectors [here](https://nightlies.apache.org/flink/flink-docs-release-1.14/docs/connectors/datastream/pulsar/)
As a first step we need to create three sources - one for each topic. The following code snippet shows the relevant code for doing that, but you can find the complete code [here]()
```java
        // 2. Initialize Sources
        PulsarSource<User> userSource = PulsarSource.builder()
                .setServiceUrl(AppConfig.SERVICE_URL)
                .setAdminUrl(AppConfig.SERVICE_HTTP_URL)
                .setStartCursor(StartCursor.earliest())
                .setTopics(AppConfig.USERS_TOPIC)
                .setDeserializationSchema(
                        PulsarDeserializationSchema.pulsarSchema(JSONSchema.of(User.class), User.class)
                )
                .setSubscriptionName("flink-user-consumer")
                .setSubscriptionType(SubscriptionType.Exclusive)
                .build();

        PulsarSource<Item> itemSource = PulsarSource.builder()
                .setServiceUrl(AppConfig.SERVICE_URL)
                .setAdminUrl(AppConfig.SERVICE_HTTP_URL)
                .setStartCursor(StartCursor.earliest())
                .setTopics(AppConfig.ITEMS_TOPIC)
                .setDeserializationSchema(
                        PulsarDeserializationSchema.pulsarSchema(JSONSchema.of(Item.class), Item.class)
                )
                .setSubscriptionName("flink-items-consumer")
                .setSubscriptionType(SubscriptionType.Exclusive)
                .build();

        PulsarSource<Order> orderSource = PulsarSource.builder()
                .setServiceUrl(AppConfig.SERVICE_URL)
                .setAdminUrl(AppConfig.SERVICE_HTTP_URL)
                .setStartCursor(StartCursor.latest())
                .setTopics(AppConfig.ORDERS_TOPIC)
                .setDeserializationSchema(
                        PulsarDeserializationSchema.pulsarSchema(JSONSchema.of(Order.class), Order.class)
                )
                .setSubscriptionName("flink-orders-consumer")
                .setSubscriptionType(SubscriptionType.Exclusive)
                .build();
```

The next step will be to create a Watermark strategy for our orders input data stream, so we can handle late order events.
We will use the creation time of the order as our Event Time, so let's extract it from the payload.
```java
WatermarkStrategy<Order> watermarkStrategy =
                WatermarkStrategy.<Order>forBoundedOutOfOrderness(Duration.ofSeconds(5))
                        .withTimestampAssigner(
                                (SerializableTimestampAssigner<Order>) (order, l) -> order.getCreatedAt()
                        );
```

Finally let's create the datastream from our three input sources and print the `Orders Stream` to the console to verify 
we can successfully read events from Pulsar
```java
  // 3. Initialize Streams
        DataStream<User> userStream =
                env.fromSource(userSource, WatermarkStrategy.noWatermarks(), "Pulsar User Source")
                        .name("pulsarUserSource")
                        .uid("pulsarUserSource");

        DataStream<Item> itemStream =
                env.fromSource(itemSource, WatermarkStrategy.noWatermarks(), "Pulsar Items Source")
                        .name("pulsarItemSource")
                        .uid("pulsarItemSource");

        DataStream<Order> orderStream = env.fromSource(orderSource, watermarkStrategy, "Pulsar Orders Source")
                .name("pulsarOrderSource")
                .uid("pulsarOrderSource");

        env.execute("Order Enrichment Stream");
        
        orderStream.print();
        env.execute("Order Enrichment Stream");
```
Notice on the code above that as a best practise we specify names and uids for our operators. This is useful to easier identify the operator on the Flink UI and also 
in cases you need to use savepoints to resume your job, after a code modification or scaling requirement (more on that later.)
With our sources and streams in place run your code to verify we can actually read data from Pulsar.
- Use the `deploy.sh` script to package your application and deploy it on your Flink cluster.
Then when you see the job has started run the OrdersProducer found [here]()
```shell
taskmanager_1  | Order(invoiceId=44172, lineItemId=192933, userId=145493, itemId=602, itemName=prize-winning instrument, itemCategory=instrument, price=48.40000000000001, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=44172, lineItemId=385101, userId=145493, itemId=3362, itemName=matte instrument, itemCategory=instrument, price=55.0, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=44172, lineItemId=285219, userId=145493, itemId=2584, itemName=industrial-strength instrument, itemCategory=instrument, price=132.0, createdAt=1469834917000, paidAt=1469700797000)
taskmanager_1  | Order(invoiceId=245615, lineItemId=229127, userId=112915, itemId=1982, itemName=extra-strength gadget wrapper, itemCategory=gadget, price=71.2, createdAt=1463179333000, paidAt=1463195221000)
taskmanager_1  | Order(invoiceId=245615, lineItemId=384894, userId=112915, itemId=564, itemName=gadget wrapper, itemCategory=gadget, price=35.6, createdAt=1463179333000, paidAt=1463195221000)
taskmanager_1  | Order(invoiceId=343211, lineItemId=258609, userId=34502, itemId=1257, itemName=tool warmer, itemCategory=tool, price=27.500000000000004, createdAt=1421975214000, paidAt=1422101333000)
```
Now that we verified we can read our events, the next step is to combine these multiple sources together, extract the user and items ids and use them to perform 
lookups and retrieve the necessary information for our user and item. 

## 4. Performing Data Lookups with Flink Process Functions

```java
  DataStream<OrderWithUserData> orderWithUserDataStream = orderStream
                .keyBy(Order::getUserId)
                .connect(userStream.keyBy(User::getId))
                .process(new UserLookupHandler())
                .uid("usersLookup")
                .name("usersLookup");
```

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

```java
   SingleOutputStreamOperator<EnrichedOrder> enrichedOrderStream = orderWithUserDataStream
                .keyBy(OrderWithUserData::getItemId)
                .connect(itemStream.keyBy(Item::getId))
                .process(new ItemLookupHandler())
                .uid("itemsLookup")
                .name("itemsLookup");
```

## 4. Conclusion



```shell
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:105:0:39 - Total 2180
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:106:0:0 - Total 2181
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:106:0:1 - Total 2182
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:106:0:2 - Total 2183
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:106:0:3 - Total 2184
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:0 - Total 2185
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:1 - Total 2186
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:2 - Total 2187
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:3 - Total 2188
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:4 - Total 2189
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:5 - Total 2190
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:6 - Total 2191
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:7 - Total 2192
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:8 - Total 2193
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:9 - Total 2194
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:10 - Total 2195
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:11 - Total 2196
16:45:45.383 INFO [pulsar-client-io-1-1] io.ipolyzos.producers.EnrichmentDataSource - ✅ Acked message 36:107:0:12 - Total 2197
16:46:08.097 INFO [Thread-3] io.ipolyzos.producers.EnrichmentDataSource - Sent '117178' user records and '2198' item records.
16:46:08.097 INFO [Thread-3] io.ipolyzos.producers.EnrichmentDataSource - Closing Resources...
16:46:08.105 INFO [pulsar-client-io-1-1] org.apache.pulsar.client.impl.ProducerImpl - [persistent://public/default/users-partition-0] [user-producer] Closed Producer
16:46:08.106 INFO [pulsar-client-io-1-1] o.a.pulsar.client.impl.PartitionedProducerImpl - [users] Closed Partitioned Producer
16:46:08.109 INFO [pulsar-client-io-1-1] org.apache.pulsar.client.impl.ProducerImpl - [persistent://public/default/items-partition-0] [item-producer] Closed Producer
```