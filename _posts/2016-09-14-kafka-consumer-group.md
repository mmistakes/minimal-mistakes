---
title: "kafka协议之cousumer group"
excerpt: "本文介绍kafka的consumer group的概念，以及如何使用好consumer group"
categories: kafka
tags: kafka consumer-group
---

{% include toc icon="gears" title="目录" %}

## 1 什么是kafka？

什么是kafka？这里引用kafka官方文档的介绍

> Kafka is a distributed, partitioned, replicated commit log service

在Kafka中，不同种类的消息（或者说log）可以按照topic进行分类。不同的topic是相互独立的。

我们知道，队列是一种先进先出（FIFO）的数据结构。所以对于任何的消息队列，消息的有序性是必须保证的。对于一个消息队列来说，先入队列的消息必须被先读出来。这样来看，在处理消息队列时，貌似就无法做到并发处理了。因为一旦并发，不同执行流之间的有序性就无法保证了。

Kafka提供了一种解决思路：

对每个topic，将其分成若干个分区（partition）。kafka对每个partition，保证其有序性；partition之间则不保证其有序性（也无法保证）。

那么，如果对消息有序性有要求的话，应该在生产者和消费者之间形成一种约定：按照特定的路由规则（分区规则），保证同一个key的消息全部到同一个partition即可。

![kafka_topic](/images/kafka_topic.jpg)

## 2 什么是 consumer group?


