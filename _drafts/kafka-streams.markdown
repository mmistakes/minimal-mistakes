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

TODO