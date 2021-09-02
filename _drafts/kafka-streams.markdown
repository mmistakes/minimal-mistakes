---
title: "Kafka Streams 101"
date: 2021-09-15
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

Apache Kafka nowadays is clearly the leading technology concerning message brokers. It's scalable, resilient, and easy to use. Moreover, it leverages a bunch of interesting client libraries that offer a vast set of additional feature. One of this libraries is _kafka-streams_. 

Kafka streams brings a completely full stateful streaming system based directly on top of Kafka. Moreover, it introduces many interesting concepts, like the duality between topics and database tables. Implementing such concepts, kafka streams provide us many useful operation on topics, such as joining messages, grouping capabilities, and so on.

Because the kafka-streams library is very large and quite complex, this article will introduce only its main features, such use the architecture, the types `KStream`, `KTable`, and `GlobalKTable`, and some information about the _state store_.

## 1. Set up

As we said, the Kafka streams are implemented using a set of client libraries. Using Scala as the language to make some experiments, we have to declare the following dependencies in the `build.sbt` file:

```sbt
libraryDependencies ++= Seq(
  "org.apache.kafka" %  "kafka-clients"        % "2.8.0",
  "org.apache.kafka" %  "kafka-streams"        % "2.8.0",
  "org.apache.kafka" %% "kafka-streams-scala"  % "2.8.0"
)
```

We will use version 2.8.0, of Kafka, the latest stable version at the moment. As we've done in the article [ZIO Kafka: A Practical Streaming Tutorial](https://blog.rockthejvm.com/zio-kafka/), we will start the Kafka broker using a Docker container. So, the `docker-compose.yml` file describing the container is the following:

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

Please, refer to the above article for further details on starting the Kafka broker inside Docker.