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

此外，分区还有另外一个好处：通过将不同的分区保存在不同的kafka服务器（broker）上，可以很好地扩展集群的容量和吞吐量。

![kafka_topic](/images/kafka_topic.jpg)

kafka将消息（或log）保存在服务器的磁盘文件系统中。在我们印象中，访问磁盘是一种非常耗时的操作，这是因为当随机访问磁盘时，磁盘驱动首先要移动磁盘的磁盘头到指定的cycle。相比于访问内存，这种机械操作的时延是非常大的。

但是，如果是顺序访问磁盘呢？一般操作系统都会使用内存缓存来读写磁盘。对于顺序访问，无需频繁移动磁盘磁头，那么其读写速度其实与访问内存是相当的。

## 2 consumer

### 2.1 最简单的consumer

作为消息队列，除了集群之外，还有另外2个角色：

- producer 消息生产者，将消息push到队列
- consumer 消息消费者，从队列获取消息

在消费侧，不同的消息队列可能会有不同的行为：

对于已经消费了的消息，是否会将消息从队列里删除？

某些队列（比如RabbitMQ）在consumer确认收到消息后就会将消息从队列中删除。这意味着，对于每一个consumer，MQ集群都必须为其复制一份数据。集群的容量就与consumer的数量是相关的，consumer数量越多，集群需要存储消息的空间就越大。

对于kafka而言，集群的容量与consumer的数量是无关的。每个consmuer去broker取消息的时候，都必须要指明起始offset。这意味着，消息投递策略是由consumer自行确定的。

消息投递策略是指对于指定的消息，consumer侧：

- 最多收到一次
- 最少收到一次
- 正好收到一次

consumer在崩溃重启之后，再次拉取更新的offset可以是：崩溃前最后收到消息的offset；或者，崩溃前最后收到消息的下一个消息的offset。

> 每一个topic的每一个partition可能会设置多个replication，但是这是为了防止消息丢失，而不是为了支持多个consmuer。

#### `FetchRequest`

只要发送`FetchRequest`消息到**正确的**broker，就可以拉取到消息了。

```
FetchRequest => ReplicaId MaxWaitTime MinBytes [TopicName [Partition FetchOffset MaxBytes]]
```

在上面的消息描述中，"[]"表示可能包含多组数据。用C++描述FetchRequest，如下所示：

```c
struct partition_info {
	int32 partition;
	int64 FetchOffset;
	int32 MaxBytes;
};

struct fetch_partitions {
	string TopicName;
	std::vector<struct partition_info> partitions[];
};

struct FetchRequest {
	int32 ReplicaId;
	int32 MaxWaitTime;
	int32 MinBytes;
	std::vector<struct fetch_partitions> partitions;
};
```

可以发现，一次Fetch请求可以查询多个topic的多个partition。但是，对每一个topic:partition，都需要填上合适的offset。

需要注意的是，`FetchRequest`必须发送到指定topic-partition的leader broker。所以，consumer首先要知道topic有多少个partition，每个partition的leader broker是哪个。这可以通过消息`TopicMetaRequest`来获取。

#### `TopicMetaRequest`

```
TopicMetadataRequest => [TopicName]
```

`TopicMetadataRequest`消息可以发送到任意一个broker。回复消息格式如下：

```
MetadataResponse => [Broker][TopicMetadata]
  Broker => NodeId Host Port  (any number of brokers may be returned)
    NodeId => int32
    Host => string
    Port => int32
  TopicMetadata => TopicErrorCode TopicName [PartitionMetadata]
    TopicErrorCode => int16
  PartitionMetadata => PartitionErrorCode PartitionId Leader Replicas Isr
    PartitionErrorCode => int16
    PartitionId => int32
    Leader => int32
    Replicas => [int32]
    Isr => [int32]
```

#### 代码实现

一个简单的consumer的逻辑，用伪代码表示如下：

```c
struct broker_info {
	int broker_id;
	char *host;
	int port;
};

struct partition_info {
	int partition_id;
	struct broker_info* leader;
};

void simple_consumer_run()
{
	partitions[N];
	send(TopicMetadataRequest);
	partitions -< recv(TopicMetadataRequestResponse);

	while(1) {
		if ( FetchRequest(partitions) == false) {
			send(TopicMetaRequest);
			update(partitions)
		}
		//handler messages
	}
}
```
### 2.2 并发consumer

如果某个topic的消息产生速度非常快，导致一个consumer无法及时处理消息，怎么办？

首先需要明确的一点是，即使consumer无法及时处理消息，kafka集群的性能是不受影响的，因为集群是不会管consumer的行为的。

回到正题，如果一个consumer不够，那么我们就起2个consumer，订阅同一个topic。那么我们需要做什么工作？

1. 对于一个topic的一个partition，肯定是不能由2个consumer同时订阅的。所以，我们要先分配每个consumer处理哪些partition。这意味着，partition的数量最好是consmuer数量的整数倍。
2. 在任何一个consumer挂了的情况下，另外一个（或一些）的consumer必须感知到，然后接手它负责的partition，否则消息会不全。
3. 对于新接手的partiton，该consumer必须知道之前的consumer消费到哪个offset了，然后接着消费。

### 