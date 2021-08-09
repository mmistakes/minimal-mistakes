---
title: "Zio Kafka: A Practical Example of Zio Streams"
date: 2021-07-24 
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

Modern distributed applications need a communication system between their components that must be reliable, scalable, and efficient. Synchronous communication based on HTTP is not a choice in such applications due to latency problems, insufficient resources' management, etc... Hence, we need an asynchronous messaging system capable of quickly scaling, robust to errors, and low latency.

Apache Kafka is a message broker that in the last years proved to have the above features. What's the best way to interact with such a message broker, if not with the ZIO ecosystem? Hence, ZIO provides an asynchronous, reliable, and scalable programming model, which perfectly fits the feature of Kafka. So, let's proceed without further ado.

## 1. Background

Following this article will require a basic understanding of how Kafka works. Moreover, we should know what the effect pattern is and how ZIO implements it (refer to [ZIO: Introduction to Fibers](https://blog.rockthejvm.com/zio-fibers/), and to [Organizing Services with ZIO and ZLayers](https://blog.rockthejvm.com/structuring-services-with-zio-zlayer/) for further details).

## 2. Apache Kafka 101

Apache Kafka is the standard de-facto within messaging systems. Every Kafka installation has a broker, or a cluster of brokers, which allows its clients to write messages in a structure called _topic_ and to read such messages from topics. The clients writing into topics are called _producers, whereas _consumers_ read information from topics.

Kafka treats each message as a sequence of bytes without imposing any structure or schema on the data. It's up to clients to eventually interpret such bytes with a particular schema. Moreover, any message can have an associated _key_. The broker doesn't decrypt the key in any way, as done for the message itself.

Moreover, the broker divides every topic into partitions at the core of Kafka's resiliency and scalability. In fact, every partition stores only a subset of messages, divided by the broker using the hash of the message's key. Partitions are distributed among the cluster of brokers, and they are replicated to guarantee high availability.

Consumers read the messages from topics they subscribed to. A consumer reads messages within a partition in the same order in which they were produced. In detail, we can associate a consumer with a _consumer group_.

![Kafka's Consumer Groups](/images/kafka%20consumer%20groups.png)

Consumers within the same consumer groups share the partitions of a topic. So, Adding more consumers to a consumer group means increasing the parallelism in consuming topics.

Using the above information, we should be ready to begin our journey.

## 3. Set up

First, we need the dependency from the `zio-kafka` and `zio-json`:

```sbt
libraryDependencies ++= Seq(
  "dev.zio" %% "zio-kafka"   % "0.15.0",
  "dev.zio" %% "zio-json"    % "0.1.5"
)
```

Then, during the article, all the code will use the following imports:

```scala
import org.apache.kafka.clients.producer._
import zio._
import zio.blocking.Blocking
import zio.clock.Clock
import zio.console.Console
import zio.duration.durationInt
import zio.json._
import zio.kafka.consumer._
import zio.kafka.producer.{Producer, ProducerSettings}
import zio.kafka.serde.Serde
import zio.stream.ZSink

import java.util.UUID
import scala.util.{Failure, Success}
```

Moreover, we need a Kafka broker up and running to allow our producers and consumer to write and
read messages from topics. Simplifying the job, we are going to use version 2.7 of Kafka inside a
Docker container. There are many Kafka images on Docker Hub, but I prefer to use the image from
Confluent:

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

We must copy the above configuration inside a `docker-compose.yml` file. As we see, Kafka also needs ZooKeeper to coordinate brokers inside the cluster. From version 2.8, Kafka doesn't use ZooKeeper anymore. However, the feature is still experimental, so it's better to avoid it for the moment.

Once set up the docker-compose file, let's start the broker with the following command:

```shell
docker-compose up -d
```

The broker is now running inside the container called `broker`, and it's listening to our messages on port `9092`. To be sure that ZooKeeper and Kafka started, just type `docker-compose ps` to see the status of the active container. We should have an output similar to the following:

```
  Name               Command            State                                                                Ports                                                              
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
broker      /etc/confluent/docker/run   Up      0.0.0.0:29092->29092/tcp,:::29092->29092/tcp, 0.0.0.0:9092->9092/tcp,:::9092->9092/tcp, 0.0.0.0:9101->9101/tcp,:::9101->9101/tcp
zookeeper   /etc/confluent/docker/run   Up      0.0.0.0:2181->2181/tcp,:::2181->2181/tcp, 2888/tcp, 3888/tcp                                                                    
```

Moreover, during the article, we will need to run some commands inside the container. To access the
Kafka container, we will use the following command:

```shell
docker exec -it broker bash
```

Now that everything is up and running, we can proceed with introducing the `zio-kafka` library.

## 4. Creating a Consumer

First, we are going to analyze how to consume messages from a topic. As usual, we create a handy use case to work with.

Imagine we like football very much, and we want to be continuously updated with the results of the UEFA European Championship, EURO 2020. For its nerdy fans, the UEFA publishes the updates of the matches on a Kafka topic, called `updates`. So, once the Kafka broker is up and running, we create the topic using the utilities the Kafka container gives. As we just saw, we can connect to the container and create the topic using the following command:


```shell
kafka-topics \
  --bootstrap-server localhost:9092 \
  --topic updates \
  --create
```

Obviously, the Kafka broker of the UEFA is running on our machine at `localhost`.

Each message's key is the concatenation of the two teams' nation. For example, the match between Italy and England generates messages with the key `ITA-ENG`. Then, the value of a message is the match's score in `String` format: `3-2`.

Now that we created the topic, we can configure a consumer to read from it. Usually, we configure Kafka consumers using a map of settings. The `zio-kafka` library uses its own types to configure a consumer:

```scala
val consumerSettings: ConsumerSettings =
  ConsumerSettings(List("localhost:9092"))
    .withGroupId("stocks-consumer")
```

Here we have the minimum configuration needed: The list of Kafka brokers in the cluster and the _group-id_ of the consumer. As we said, all the consumers sharing the same group-id belong to the same consumer group.

The `ConsumerSettings` is a _builder-like_ class that exposes many methods to configure all the properties a consumer needs. For example, we can give the consumer any known property using the following procedure:

```scala
// Zio-kafka library code
def withProperty(key: String, value: AnyRef): ConsumerSettings =
  copy(properties = properties + (key -> value))
```

Or, we can configure the _polling interval_ of the consumer just using the reliable method:

```scala
// Zio-kafka library code
def withPollInterval(interval: Duration): ConsumerSettings =
  copy(pollInterval = interval)
```

Here we can dive into all the available configuration properties for a Kafka
consumer: [Consumer Configurations](https://docs.confluent.io/platform/current/installation/configuration/consumer-configs.html).

Once we created the needed configuration, it's time to complete the Kafka consumer. As each consumer owns an internal connection pool to connect to the broker, we don't want to leak such a pool in case of failure.

In the ZIO ecosystem, a type like this is called a _resource_ and is called `ZManaged[R, E, A]`. `ZManaged[R, E, A]` is a data structure that encapsulates the acquisition and the release of a resource of type `A` using `R`, and that may fail with an error of type `E`.

So, let's create the resource handling the connection to the Kafka broker:

```scala
val managedConsumer: RManaged[Clock with Blocking, Consumer.Service] =
  Consumer.make(consumerSettings)
```

In this particular case, we obtain an instance of an `RManaged`, that in the ZIO jargon is a resource that cannot fail. Moreover, we see that the consumer depends upon the `Blocking` service. As the documentation says

> The Blocking module provides access to a thread pool that can be used for performing blocking operations.

In fact, ZIO internally uses such a service to manage the connection pool to the broker for a consumer.

Last but not least, we create a `ZLayer` from the `managedConsumer`, allowing us to provide it as a service to any component depending on it (for a comprehensive introduction to the `ZLayer` type,
please refer to the fantastic article [Organizing Services with ZIO and ZLayers](https://blog.rockthejvm.com/structuring-services-with-zio-zlayer/)):

```scala
val consumer: ZLayer[Clock with Blocking, Throwable, Consumer] =
  ZLayer.fromManaged(managedConsumer)
```

Now that we obtained a managed, injectable consumer, we can proceed by consuming some message from
the broker. It's time to introduce `ZStream`.

## 5. Consuming Messages as a Stream

The zio-kafka library allows consuming messages read from a Kafka topic as a stream. Basically, a
stream is an abstraction of a possible infinite collection. In ZIO, we model a stream using the
type `ZStream[R, E, O]`, which represents an effectual stream requiring an environment `R` to
execute, eventually failing with an error of type `E`, and producing values of type `A`.

We used the _effectual_ adjective because a `ZStream` implements the Effect Pattern: It is a
blueprint, or a description, of how to produce values of type `A`.However, the real execution of the
code producing them is postponed. In other words, a `ZIO` always succeeds with a single value
whereas a `ZStream` succeeds with zero or more values, potentially infinitely many.

Another important feature of `ZStream`s is the implicit chunking. By design, Kafka consumers poll (
consume) from a topic a batch of messages (configurable using
the [`max.poll.records`](https://docs.confluent.io/platform/current/installation/configuration/consumer-configs.html#consumerconfigs_max.poll.records))
. So, each invocation of the `poll` method on the Kafka consumer should return a collection (
a `Chunk` in ZIO jargon) o messages.

The `ZStream` type flatten the list of `Chunk`s for us, letting us to treat them as they were a
single and continue flux of data.

### 5.1. Subscription to Topics

Creating a stream from the `ZManaged` consumer we just built means to subscribing it to a Kafka
topic, and to configure how to interpret the bytes of both the key and the value of each message:

```scala
val matchesStreams: ZStream[Consumer, Throwable, CommittableRecord[String, String]] =
  Consumer.subscribeAnd(Subscription.topics("updates"))
    .plainStream(Serde.string, Serde.string)
```

The above code introduces many concepts. So, let's analyze them one at time.

First, a `CommitableRecord[K, V]` is a wrapper around the official Kafka
class `ConsumerRecord[K, V]`. Basically, Kafka associates with every message a lot of metadata,
represented as a `ConsumerRecord`:

```scala
// Zio-kafka library code
final case class CommittableRecord[K, V](record: ConsumerRecord[K, V], offset: Offset)
```

Among the other, one important information is the `offset` of the message, which represent its
position inside the topic partition. A consumer commit an offset within a consumer group after it
successfully processed a message, marking that all the messages with a lower offset were been read
yet.

As the subscription object takes a list of topics, a consumer can subscribe to many topics at time.
In addition, we can use a pattern to tell the consumer which topics to subscribe. Imagine we have a
different topic for the updates of every single match. Hence, the names of the topics should reflect
this information, for example using a pattern like `"updates|ITA-ENG"`. If we want to subscribe to
all the topics associated with a match of the Italian football team, we can do the following:

```scala
val itaMatchesStreams: SubscribedConsumerFromEnvironment =
  Consumer.subscribeAnd(Subscription.pattern("updates|.*ITA.*".r))
```

In some weird cases, we would be interested in subscribing a consumer not to random partition of a
topic, but to a specific partition of the topic. As Kafka guarantees the ordering of the messages
only locally to a partition, a scenario is when we need to preserve such order also in message
elaboration. In this case, we can use the dedicated subscription method, and subscribe to the
partition 1 of the topic `updates`:

```scala
val partitionedMatchesStreams: SubscribedConsumerFromEnvironment =
  Consumer.subscribeAnd(Subscription.manual("updates", 1))
```

### 5.2. Interpreting Messages: Serialization and Deserialization

Once we subscribed to a topic, we must instruct our consumer how to interpret messages coming from
the topic. Apache Kafka introduced the concept of _serde_, which stands for _ser_ializer and _
de_serializer. A consumer should interpret both the key and the value of a message. We give the
right serde types during the materialization of the read messages into a stream:

```scala
Consumer.subscribeAnd(Subscription.topics("updates"))
  .plainStream(Serde.string, Serde.string)
```

The `plainStream` method takes two serdes as parameters, the first for the key, and the second for
the value of a message. Fortunately, the zio-kafka library comes with serdes for common types:

```scala
// Zio-kafka library code
private[zio] trait Serdes {
  lazy val long: Serde[Any, Long]
  lazy val int: Serde[Any, Int]
  lazy val short: Serde[Any, Short]
  lazy val float: Serde[Any, Float]
  lazy val double: Serde[Any, Double]
  lazy val string: Serde[Any, String]
  lazy val byteArray: Serde[Any, Array[Byte]]
  lazy val byteBuffer: Serde[Any, ByteBuffer]
  lazy val uuid: Serde[Any, UUID]
}
```

In addition, we can use more advanced serialization / deserialization capabilities. For example, we
can derive the serde directly from one of the available using the `inmap` family of functions:

```scala
// Zio-kafka library code
trait Serde[-R, T] extends Deserializer[R, T] with Serializer[R, T] {
  def inmap[U](f: T => U)(g: U => T): Serde[R, U]

  def inmapM[R1 <: R, U](f: T => RIO[R1, U])(g: U => RIO[R1, T]): Serde[R1, U]
}
```

Hence, we will use the `inmap` function if the derivation is not effectful, for example if it always
succeeds. Otherwise, we will use the `inmapM` if the derivation can produce side effects, such as
throwing an exception. For example, imagine that each Kafka message has a JSON payload, representing
a snapshot of a match during the time:

```json
{
  "players": [
    {
      "name": "ITA",
      "score": 3
    },
    {
      "name": "ENG",
      "score": 2
    }
  ]
}
```

We can represent the same information using Scala classes:

```scala
case class Player(name: String, score: Int)

case class Match(players: Array[Player])
```

So, we need to define a decoder, that is an object that can transform the JSON string representation
of a match in an instance of the `Match` class. Luckily, the ZIO ecosystem has a project that can
help us: The [zio-json](https://github.com/zio/zio-json) library.

We are not going to go deeper in the zio-json library, since it's not the main focus of the article.
However, let's see together the easiest way to declare a decoder and an encoder. So, we start with
the decoder. If the class we want to decode has already the fields' names equal to the JSON fields,
we can declare a `JsonDecoder` type class with just one line of code:

```scala
object Player {
  implicit val decoder: JsonDecoder[Player] = DeriveJsonDecoder.gen[Player]
}
```

The type class adds to the `String` type the following extension method, which lets us decode a JSON
string into a class:

```scala
// zio-json library code
def fromJson[A](implicit A: JsonDecoder[A]): Either[String, A]
```

As we can see, the above function returns an `Either` object mapping a failure as a `String`.

In the same way, we can declare a `JsonEncoder` type class:

```scala
object Player {
  implicit val encoder: JsonEncoder[Player] = DeriveJsonEncoder.gen[Player]
}
```

This time, the type class adds a method to our type that encodes it into a JSON string:

```scala
// zio-json library code
def toJson(implicit A: JsonEncoder[A]): String
```

Note that it's a best practice to declare the instances of decoder and encoder type classes inside
the companion object of a type.

Now, we just assemble all the pieces we just created using the `inmapM` function:

```scala
val matchSerde: Serde[Any, Match] = Serde.string.inmapM { matchAsString =>
  ZIO.fromEither(matchAsString.fromJson[Match].left.map(new RuntimeException(_)))
} { matchAsObj =>
  ZIO.effect(matchAsObj.toJson)
}
```

The only operation we have done in addition to what we already said is mapping the left value of
the `Either` object resulting from the decoding into an exception. In this way, we honor the
signature of the `ZIO.fromEither` factory method.

Finally, it's usual to encode Kafka messages' values using some form of binary compression, suca
as [Avro](https://avro.apache.org/). In this case, we can create a dedicated `Serde` directly from
the raw type `org.apache.kafka.common.serialization.Serde` coming from the official Kafka client
library. In fact, there are many implementations of Avro serializers and deserializer, such
as [Confluent](https://docs.confluent.io/platform/current/schema-registry/serdes-develop/serdes-avro.html) `KafkaAvroSerializer`
and `KafkaAvroDeserializer`.

### 5.3. Consuming messages

We can read typed messages from a Kafka topic. As we said, the library shares the messages with
developers using a `ZStream`. In our example, the produced stream has
type `ZStream[Consumer, Throwable, CommittableRecord[UUID, Match]]`:

```scala
val matchesStreams: ZStream[Consumer, Throwable, CommittableRecord[UUID, Match]] =
  Consumer.subscribeAnd(Subscription.topics("updates"))
    .plainStream(Serde.uuid, matchSerde)
```

Now what should we do with them? Well, if we read a message, maybe we want to process it in some
way, and ZIO lets us use all the functions available in the `ZStream` type. We might be requested to
map each message. ZIO gives use many variants of the `map` function. The main two are the following:

```scala
def map[O2](f: O => O2): ZStream[R, E, O2]
def mapM[R1 <: R, E1 >: E, O2](f: O => ZIO[R1, E1, O2]): ZStream[R1, E1, O2]
```

As we can see, the difference is if the transformation is effectful or not. Let's map the payload of
the message in a `String`, suitable for printing:

```scala
matchesStreams
  .map(cr => (cr.value.score, cr.offset))
```

The `map` function uses utility methods we defined on the `Match` and `Player` type:

```scala
case class Player(name: String, score: Int) {
  override def toString: String = s"$name: $score"
}

case class Match(players: Array[Player]) {
  def score: String = s"${players(0)} - ${players(1)}"
}
```

Moreover, it's always a good idea to forward the `offset` of the message, since we'll use it to
commit the message's position inside the partition.

Using the information just transformed, we can now produce some side effect, such as writing the
payload to a database or simply to the console. ZIO defines the `tap` method for doing this:

```scala
// zio-kafka library code
def tap[R1 <: R, E1 >: E](f0: O => ZIO[R1, E1, Any]): ZStream[R1, E1, O]
```

So, after getting a printable string from our Kafka message, we print it to the console:

```scala
matchesStreams
  .map(cr => (cr.value.score, cr.offset))
  .tap { case (score, _) => console.putStrLn(s"| $score |") }
```

Once we finished playing with messages, it's time for our consumer to commit the offset of the last
read message. In this way, the next poll cycle will read from the assigned partition a new set of
information.

The consumers from zio-kafka read messages from topic grouped in `Chunk`s. As we said, the `ZStream`
implementation lets us forgetting about chunk during processing. However, to commit the right offset
we need the access again to the `Chunk`.

Fortunately, the zio-stream libraries defines a set of transformations that executes on `Chunk` and
not on single elements of the stream: They're called _transducers_, and the reference type
is `ZTransducer`. The library defines a transducer as:

```scala
ZTransducer[- R, + E, - I, + O](
val push: ZManaged[R, Nothing, Option[Chunk[I]] => ZIO[R, E, Chunk[O]]]
)
```

Basically, it's a wrapper around a function that from a resource that might produce a chunks
containing values of type `I`, obtains an effect of chunks containing values of type `O`. The size
of each chunk may vary during the transformation.

In our case, we are going to apply the `Consumer.offsetBatches` transducer:

```scala
// zio-kafka library code
val offsetBatches: ZTransducer[Any, Nothing, Offset, OffsetBatch] =
  ZTransducer.foldLeft[Offset, OffsetBatch](OffsetBatch.empty)(_ merge _)
```

Broadly, the transducer merges the input offsets, where the `merge` function implements the
classic _max_ function in this case.

So, after the application of the `offsetBatches` transducer, each chunk of messages is mapped into a
chunk containing only one element, which is their maximum offset:

```scala
matchesStreams
  .map(cr => (cr.value.score, cr.offset))
  .tap { case (score, _) => console.putStrLn(s"| $score |") }
  .map { case (_, offset) => offset }
  .aggregateAsync(Consumer.offsetBatches)
```

In reality, the `OffsetBatch` type is more than just an offset. In fact, the library defines the
type as follow:

```scala
// zio-kafka library code
sealed trait OffsetBatch {
  def offsets: Map[TopicPartition, Long]

  def commit: Task[Unit]

  def merge(offset: Offset): OffsetBatch

  def merge(offsets: OffsetBatch): OffsetBatch
}
```

In addition to the information we've just describe, the `OffsetBtach` type contains also the
function that creates the effect to commits the offset to the broker, i.e. `def commit: Task[Unit]`.

Great. Now we know for every chunk which is the offset to commit. How can we do that? There are many
ways of doing this, among which we can use a `ZSink` function. As in many other streaming libraries,
sinks represents the consuming function of a stream. After the execution of a sink, the values of
the stream are not available to further processing.

The `ZSink` type has many built-in operations, and we are going to use one of the easier,
the `foreach` function, which applies an effectful function to all the values emitted by the sink.

So, commit the offsets prepared by the previous transducer is equal to declare a `ZSink` invoking
the `commit` function on each `OffsetBatch` it emits:

```scala
matchesStreams
  .map(cr => (cr.value.score, cr.offset))
  .tap { case (score, _) => console.putStrLn(s"| $score |") }
  .map { case (_, offset) => offset }
  .aggregateAsync(Consumer.offsetBatches)
  .run(ZSink.foreach(_.commit))
```

The result of the application of the above whole pipeline of operation is
a `ZIO[Console with Any with Consumer with Clock, Throwable, Unit]`, which means an effect that
writes to the console something it read from a Kafka consumer, and can fail with a `Throwable`, and
finally produces no value. In somebody asks why we need also a `Clock` to execute the effect, the
answer is that the transducer executes operations on chunks directly using `Fiber`s, and so it
requires the capability to schedule them properly.

### 5.4. Handling Poison Pills

When we use `ZStream`, we must remember that he default behavior for a consumer stream when encountering a deserialization failure is to fail the stream. Until now, we developed the _happy path_, that is when everything goes fine. However, many errors can rise during messages elaboration.

One of the possibles are deserialization error of the messages. We define as a _poison pill_ a message having a schema that isn't deserializable. If it's not properly manage, the reading of a poison pill message will terminate the whole stream.

Fortunately, zio-kafka let us deserialize the key and the value of a massage in a `Try`, just call the `asTry` method of a `Serde`:

```scala
Consumer.subscribeAnd(Subscription.topics("updates"))
  .plainStream(Serde.uuid, matchSerde.asTry)
```

In this way, if something goes wrong during the deserialization process, the developer can teach to the program how to react, without abruptly terminating the stream:

```scala
Consumer.subscribeAnd(Subscription.topics("updates"))
  .plainStream(Serde.uuid, matchSerde.asTry)
  .map(cr => (cr.value, cr.offset))
  .tap { case (tryMatch, _) =>
    tryMatch match {
      case Success(matchz) => console.putStrLn(s"| ${matchz.score} |")
      case Failure(ex) => console.putStrLn(s"Poison pill ${ex.getMessage}")
    }
  }
```

Usually, a poison pill message is properly logged as an error and its offset committed as a regular message. 

## 6. Printing Something to Console

Now that we have a consumer that can read messages from the `updates` topic, we are ready to execute
our program and produce some messages. Summing up, the overall program is the following:

```scala
object EuroGames extends zio.App {

  case class Player(name: String, score: Int) {
    override def toString: String = s"$name: $score"
  }

  object Player {
    implicit val decoder: JsonDecoder[Player] = DeriveJsonDecoder.gen[Player]
    implicit val encoder: JsonEncoder[Player] = DeriveJsonEncoder.gen[Player]
  }

  case class Match(players: Array[Player]) {
    def score: String = s"${players(0)} - ${players(1)}"
  }

  object Match {
    implicit val decoder: JsonDecoder[Match] = DeriveJsonDecoder.gen[Match]
    implicit val encoder: JsonEncoder[Match] = DeriveJsonEncoder.gen[Match]
  }

  val matchSerde: Serde[Any, Match] = Serde.string.inmapM { matchAsString =>
    ZIO.fromEither(matchAsString.fromJson[Match].left.map(new RuntimeException(_)))
  } { matchAsObj =>
    ZIO.effect(matchAsObj.toJson)
  }

  val consumerSettings: ConsumerSettings =
    ConsumerSettings(List("localhost:9092"))
      .withGroupId("updates-consumer")

  val managedConsumer: RManaged[Clock with Blocking, Consumer.Service] =
    Consumer.make(consumerSettings)

  val consumer: ZLayer[Clock with Blocking, Throwable, Has[Consumer.Service]] =
    ZLayer.fromManaged(managedConsumer)

  val matchesStreams: ZIO[Console with Any with Consumer with Clock, Throwable, Unit] =
    Consumer.subscribeAnd(Subscription.topics("updates"))
      .plainStream(Serde.uuid, matchSerde)
      .map(cr => (cr.value.score, cr.offset))
      .tap { case (score, _) => console.putStrLn(s"| $score |") }
      .map { case (_, offset) => offset }
      .aggregateAsync(Consumer.offsetBatches)
      .run(ZSink.foreach(_.commit))

  override def run(args: List[String]): URIO[zio.ZEnv, ExitCode] =
    matchesStreams.provideSomeLayer(consumer ++ zio.console.Console.live).exitCode
}
```

Since we've not talk about producers in zio-kafka, we need produce some messages using the `kafka-console-producer` utility. First of all, we have to connect to the `broker` container. Then, we start an interactive producer using the following shell command:

```shell
kafka-console-producer \
   --topic updates \
   --broker-list localhost:9092 \
   --property parse.key=true \
   --property key.separator=,
```

As we can see, we are creating a producer that will send messages to the broker listening on port 9092 at localhost, and we will use the `','` character to separate the key from the payload of each message. Once type the command, the shell waits us to type the first message. Let's proceed typing the following messages:

```shell
b91a7348-f9f0-4100-989a-cbdd2a198096,{"players":[{"name":"ITA","score":0},{"name":"ENG","score":1}]}
b26c1b21-41d9-4697-97c1-2a8d4313ae53,{"players":[{"name":"ITA","score":1},{"name":"ENG","score":1}]}
2a90a703-0be8-471b-a64c-3ea25861094c,{"players":[{"name":"ITA","score":3},{"name":"ENG","score":2}]}]}
```

If everything goes well, our zio-kafka consumer should start printing to the console the read information:

```
| ITA: 0 - ENG: 1 |
| ITA: 1 - ENG: 1 |
| ITA: 3 - ENG: 2 |
```

## 7. Producing Messages

As it should be obvious, the zio-kafka libraries also provides Kafka producers in addition to consumers.

As we made for consumers, if we want to produce some messages to a topic, the first thing to create the resource and the layer associated with a producer:

```scala
val producerSettings: ProducerSettings = ProducerSettings(List("localhost:9092"))

val producer: ZLayer[Blocking, Throwable, Producer[Any, UUID, Match]] =
  ZLayer.fromManaged(Producer.make[Any, UUID, Match](producerSettings, Serde.uuid, matchSerde))
```

The `ProducerSettings` follows the same principles of the `ConsumerSettings` type we've already analyzed. The only difference is that the properties we can provide are those related to producers. Refer to [Producer Configurations](https://docs.confluent.io/platform/current/installation/configuration/producer-configs.html) for further details.

Once we crated a set of settings listing at lease the URI of the broker we are going to send the messages to, we build a `Producer` resource, and we surround inside a `ZLayer`. It's very important that we provide explicit information of types in the `Producer.make` smart constructor: The first parameter refers to the environment used by ZIO to create the two `Serde`, whereas the second and the third parameters refer to the type of the keys and of the values of messages respectively.

To send messages to a topic, we have many choices. In fact, the `Producer` module exposes many  accessor functions to send messages. Among the others we find the following:

```scala
// zio-kafka library code
object Producer {
  def produce[R, K, V](record: ProducerRecord[K, V]): RIO[R with Producer[R, K, V], RecordMetadata]
  def produce[R, K, V](topic: String, key: K, value: V): RIO[R with Producer[R, K, V], RecordMetadata]
  def produceChunk[R, K, V](records: Chunk[ProducerRecord[K, V]]): RIO[R with Producer[R, K, V], Chunk[RecordMetadata]]
}
```

As we can see, we can produce a single message, or a chunk. Also, we can specify directly the topic, key and value of the message, or we can work directly with the `ProducerRecord` type, which already contains them. In our scenario, for sake of simplicity, we decide to produce a single message:

```scala
val messagesToSend: ProducerRecord[UUID, Match] =
  new ProducerRecord(
    "updates",
    UUID.fromString("b91a7348-f9f0-4100-989a-cbdd2a198096"),
    itaEngFinalMatchScore
  )

val producerEffect: RIO[Producer[Any, UUID, Match], RecordMetadata] =
  Producer.produce[Any, UUID, Match](messagesToSend)
```

Also in this case, if we want the Scala compiler to understand right the types of our variable, we have to help him specifying the types requested by the `Producer.produce` function. The types semantic is the same as with the `Producer.make` smart constructor.

Hence, the produced effect requests a `Producer[Any, UUID, Match]` as environment type. To execute the effect, we just provide the producer layer we defined above:

```scala
producerEffect.provideSomeLayer(producer).exitCode
```

We can compose the production of the messages and the consumption directly in one program using _fibers_ (see [ZIO: Introduction to Fibers](https://blog.rockthejvm.com/zio-fibers/) for further details on ZIO fibers):

```scala
val program = for {
  _ <- matchesStreams.provideSomeLayer(consumer ++ zio.console.Console.live).fork
  _ <- producerEffect.provideSomeLayer(producer) *> ZIO.sleep(5.seconds)
} yield ()
program.exitCode
```

## 8. Conclusions

In this article, we started learning the library zio-kafka introducing the basics of Kafka, and how to set up a working environment using Docker. Then, we focused on the consumer part. After learning how to subscribe to a topic, we talked about serialization and deserialization of messages, going into details of zio-json. The consumption of messages through ZIO stream was the next issue. Finally, we end the article talked about producers, and giving an example merging all the previous topics together. I hope you enjoyed the journey.