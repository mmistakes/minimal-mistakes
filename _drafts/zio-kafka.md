---
title: "Zio Kafka: A Practical Example of Zio Streams"
date: 2021-07-24
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

Modern distributed applications need a communication system between their components that must be reliable, scalable, and efficient. Synchronous communication based on HTTP is not a choice in such application, due to latency problems, poor resources' management, etc... Hence, we need an asynchronous messaging system, capable of easily scaling, robust to errors, and with low latency.

Apache Kafka is a message broker that in the last years proved to have the above features. What's the best way to interact with such a message broker, if not with the ZIO ecosystem? Hence, ZIO provides an asynchronous, reliable, and scalable programming model, which perfectly fits the feature of Kafka. So, let's proceed without further ado.

## 1. Background

Following this article will require a basic understanding of how Kafka works. Moreover, we should know what the effect pattern is, and how ZIO implements it (refer to [ZIO: Introduction to Fibers](https://blog.rockthejvm.com/zio-fibers/), and to [Organizing Services with ZIO and ZLayers](https://blog.rockthejvm.com/structuring-services-with-zio-zlayer/) for further details).

### 1.1. Apache Kafka 101

Apache Kafka is the `stadard de-facto` within messaging systems. Every Kafka installation has a broker, or a cluster of brokers, which allows its clients to write messages in a structure called _topic_, and to read such messages from topics. The clients writing into topics are called _producers, whereas _consumers_ read information from topics.

Kafka treats each message as a sequence of byte, without imposing any structure or schema on the data. It's up to clients to eventually interpret such bytes with a particular schema. Moreover, any message can have an associated _key_. The broker doesn't interpret the key in any way, as done for the message itself.

Moreover, the broker divides every topic into partitions, which are at the core of Kafka resiliency and scalability. In fact, every partition stores only a subset of messages, divided by the broker using the hash of the message's key. Partitions are distributed among the cluster of brokers, and they are replicated to guarantee the high availability.

Consumers read the messages from topics they subscribed. A consumer read messages within a partition in the same order in which the were produced. In details, we can associate a consumer with a _consumer group_. 

![Kafka's Consumer Groups](/images/kafka%20consumer%20groups.png)

Consumers within the same consumer groups share the partitions of a topic. So, Adding more consumers to a consumer group means increasing the parallelism in consuming topics.

Using the above information, we should ready to begin out journey.

## 2. Set up

First, we need the dependency from the `zio-kafka` library:

```sbt
"dev.zio" %% "zio-kafka"   % "0.15.0"
```

Moreover, we need a Kafka broker up and running to allow our producers and consumer to write and read messages from topics. Simplifying the job, we are going to use version 2.7 of Kafka inside a Docker container. There are many Kafka images on Docker Hub, but I prefer to use the image from Confluent:

```yaml
version: '2'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:6.2.0
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:6.2.0
    hostname: broker
    container_name: broker
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
      - "9092:9092"
      - "9101:9101"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_JMX_PORT: 9101
      KAFKA_JMX_HOSTNAME: localhost
```

We must copy the above configuration inside a `docker-compose.yml` file. As we see, Kafka needs also ZooKeeper to coordinate brokers inside the cluster. From version 2.8, Kafka doesn' use ZooKeeper anymore. However, the feature is still experimental, so it's better to avoid it for the moment. 

Once set up the docker-compose file, let's start the broker with the following command:

```shell
docker-compose up -d
```

The broker is now running inside the container called `broker`, and it's listening our messages on port `9092`. To be sure that ZooKeeper and Kafka started, just type `docker-compose ps` to see the status of the active container. We should have an output similar to the following:

```
  Name               Command            State                                                                Ports                                                              
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
broker      /etc/confluent/docker/run   Up      0.0.0.0:29092->29092/tcp,:::29092->29092/tcp, 0.0.0.0:9092->9092/tcp,:::9092->9092/tcp, 0.0.0.0:9101->9101/tcp,:::9101->9101/tcp
zookeeper   /etc/confluent/docker/run   Up      0.0.0.0:2181->2181/tcp,:::2181->2181/tcp, 2888/tcp, 3888/tcp                                                                    
```

Moreover, during the article, we will need to run some commands inside the container. To access the Kafka container, we will use the following command:

```shell
docker exec -it broker bash
```

Now that everything is up and running, we can proceed introducing the `zio-kafka` library.

## 3. Consume Messages from Topic

First, we are going to analyze is how to consume messages from a topic. As usual, we create a handy use case to work with.

Image we like football very much, and we want to be always updated with the results of the UEFA European Championship, EURO 2020. For its nerdy fans, the UEFA publishes the updates of the matches on a Kafka topic, called `updates`. So, once the Kafka broker is up and running, we create the topic using the utilities the Kafka container gives. As we just saw, we can connect to the container, and crete the topic using the following command:

```shell
kafka-topics \
  --bootstrap-server localhost:9092 \
  --topic updates \
  --create
```

Obviously, the Kafka broker of the UEFA is running on our machine at `localhost`...

Now that we created the topic, we can configure a consumer to read from it. Usually, we configure Kafka consumers using a map of settings. The `zio-kafka` library uses its own types to configure a consumer:

```scala
val consumerSettings: ConsumerSettings =
  ConsumerSettings(List("localhost:9092"))
    .withGroupId("stocks-consumer")
```

Here we have the minimum configuration needed: The list of Kafka brokers in the cluster, and the _group-id_ of the consumer. As we said, all the consumers sharing the same group-id belong to the same consumer group.

The `ConsumerSettings` it's a _builder-like_ class, that exposes many methods to configure all the properties needed by a consumer. For example, we can give the consumer any known property using the following method:

```scala
// Zio-kafka library code
def withProperty(key: String, value: AnyRef): ConsumerSettings =
  copy(properties = properties + (key -> value))
```

Or, we can configure the _polling interval_ of the consumer just using the dedicated method:

```scala
// Zio-kafka library code
def withPollInterval(interval: Duration): ConsumerSettings =
  copy(pollInterval = interval)
```

Here we can dive into all the available configuration properties for a Kafka consumer: [Consumer Configurations](https://docs.confluent.io/platform/current/installation/configuration/consumer-configs.html).

Once we created the needed configuration, it's time to create the Kafka consumer. As each consumer own an internal connection pool to connect to the broker, we don't want to leak such pool in case of failure. 

In the ZIO ecosystem (as well as in Cats Effect), a type like these is called a _resource_, and the `ZManaged[R, E, A]` is the type associated with it. `ZManaged[R, E, A]` is a data structure that encapsulates the acquisition, and the release of a resource of type `A` using `R`, and that may fail with an error of type `E`.

So, let's create the resource handling the connection to the Kafka broker:

```scala
val managedConsumer: RManaged[Clock with Blocking, Consumer.Service] =
  Consumer.make(consumerSettings)
```

In this particular case, we obtain an instance of an `RManaged`, that in the ZIO jargon is a resource that cannot fail. Moreover, we see that the consumer depends upon the `Blocking` service. As the documentation says

> The Blocking module provides access to a thread pool that can be used for performing blocking operations.

In fact, ZIO internally uses such service to manage the connection pool to the broker for a consumer.

Last but not least, we create a `ZLayer` from the `managedConsumer`, allowing us to provide it as a service to any component depending on it (for a comprehensive introduction to the `ZLayer` type, please refer to the awesome article [Organizing Services with ZIO and ZLayers](https://blog.rockthejvm.com/structuring-services-with-zio-zlayer/)):

```scala
val consumer: ZLayer[Clock with Blocking, Throwable, Has[Consumer.Service]] =
  ZLayer.fromManaged(managedConsumer)
```

Now that we obtained a managed, injectable consumer, we can proceed by consuming some message from the broker. It's time to introduce `ZStream`.

### 3.1. Consuming Messages as a Stream

TODO
