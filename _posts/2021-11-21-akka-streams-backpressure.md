---
title: "Akka Streams Backpressure"
date: 2021-11-21
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [akka, akka streams]
excerpt: "Akka Streams implements backpressure, a critical component of the Reactive Streams specification. This article is a demonstration of this mechanism."
---

This article is a long-overdue written analogue to [this video](https://www.youtube.com/watch?v=L5FAyCCWGL0), which discusses one of the most important aspects of a reactive system using Akka Streams.

## 1. Background

What's Akka Streams again?

It's this library that allows us to write systems in which data is received in pieces as a stream, instead of all at once. Akka actors are a powerful tool which we can use to implement any kind of business logic, but the particular use case of data transfer in a continuous, stable, fast, resilient and fault-tolerant manner is too complex to be implemented over and over on top of actors.

Akka Streams implement (implements?) the [Reactive Streams](https://www.reactive-streams.org/) specification, which describes how a reactive system is supposed to work and what the main concepts and abstractions are.

We discuss this in detail in the [Akka Streams](https://rockthejvm.com/p/akka-streams/) course, but to recap really quickly:

- A reactive system is built out of components which have certain roles. We have _sources_ (emitters of elements), _sinks_ (receivers of elements), _flows_ (transformers of elements), among other kinds. We build a system by connecting these components together in a graph.
- Akka Streams components work with a _demand-based_ protocol. In other words, data flows through the graph as a response to demand from receivers. Producers then comply and send more elements downstream.
- A second (transparent) protocol kicks in when production of elements is faster than demand. This protocol (backpressure) slows down the producers and ensures no data is lost.

## 2. Getting Started

Let's add the Akka Streams library to the `build.sbt` file of our project:

```scala
val akkaVersion = "2.6.13"

libraryDependencies += Seq(
  // among (perhaps) your other libraries)
  "com.typesafe.akka" %% "akka-stream" % akkaVersion
)
```

After that, we'll spin up a simple application with Akka Streams by creating an actor system:

```scala
object AkkaStreamsBackpressure {
  implicit val system: ActorSystem[_] = ActorSystem(Behaviors.empty, "StreamsSystem")

  // rest of the code to follow
}
```

We create the actor system as `implicit` because it also contains the tools to allocate the resources for the Akka Streams components we're going to add and run. When we actually start the stream, the actor system will be passed automatically.

If you haven't worked with Akka Streams components yet, here's how we can build a few components:

```scala
val source = Source(1 to 1000)
val flow = Flow[Int].map(_ * 10)
val sink = Sink.foreach[Int](println)
```

and we can connect these components into a graph

```scala
val graph = source.via(flow).to(sink)
```

however, this graph is just a blueprint for a running computation, which we can start by calling the `run` method on it.

In order to demonstrate backpressure, we're going to create some slightly different components so that we can investigate the difference in behavior:

```scala
val slowSink = Sink.foreach[Int] { x =>
  Thread.sleep(1000)
  println(x)
}

val debuggingFlow = Flow[Int].map { x =>
  println(s"[flow] ${x}")
  x
}
```

## 3. No Backpressure Yet

After learning the concepts and the basic components of Akka Streams, a naive approach would be to just create a slow consumer (like the above sink) and connect a stream, like so:

```scala
def demoNoBackpressure(): Unit = {
  source.via(debuggingFlow).to(slowSink).run()
}
```

What we see in the console is:

```text
[flow] 1
1
[flow] 2
2
[flow] 3
3
[flow] 4
4
[flow] 5
5
[flow] 6
6
[flow] 7
7
```

and each pair is printed once per second (as the bottleneck is the flow). Is this backpressure? In effect, our flow is slowed down, isn't it?

The answer might be surprising: this is _not_ an example of backpressure. When we connect Akka Streams components in this way, i.e. `source.via(debuggingFlow).to(slowSink)`, the Akka Streams library will make an interesting assumption.

* Because we'd like these components to be as fast as possible in real life, we assume that each transformation along the entire graph is very quick.
* Because components run on top of actors, sending elements between subsequent components is based on message exchanges between actors.
* Because the components are considered to be fast, message exchanges are assumed to be a significant _overhead_: the time for a message to be sent, enqueued and received is (in this assumption) comparable with the time it takes for the data to be processed.

For these reasons, Akka Streams automatically _fuses_ components together: if we connect components with the `via` and `to` methods, Akka Streams will actually run them on _the same actor_ to eliminate these message exchanges. The direct consequence is that all data processing happens _sequentially_.

But wait, isn't Akka Streams supposed to parallelize everything, because it's based on actors?

This may or may not be what you want. Akka Streams is a very general library, and for the use-cases described above (components with fast processing times), it's actually better to run them on the same actor.

## 4. The Beginning of Backpressure

The assumption we described earlier breaks down when the data processing is slow for one (or more) of the components involved. Because everything happens sequentially, this component will slow down the entire stream. For this situation, we need _async boundaries_: a way to specify which part(s) of the stream will run on one actor, which part(s) on another actor, etc. This simple method will suffice:

```scala
def demoBackpressure(): Unit = {
  source.via(debuggingFlow).async.to(slowSink).run()
}
```

The `async` is the crux here: everything to the left of `async` runs on one actor, everything on the right runs on another actor. Obviously, we can add many `async` calls, even after each component if we want to. In this case, the source and flow run on the same actor (call this actor 1), and the slow sink will run on a different actor (say actor 2).

If we run this method instead, we get a (perhaps surprisingly) different output. My notes are prefixed with `----` in the output below:

```text
---- burst, all at once
[flow] 1
[flow] 2
[flow] 3
[flow] 4
[flow] 5
[flow] 6
[flow] 7
[flow] 8
[flow] 9
[flow] 10
[flow] 11
[flow] 12
[flow] 13
[flow] 14
[flow] 15
[flow] 16
---- then slow, one per second
1
2
3
4
5
6
7
---- burst again
[flow] 17
[flow] 18
[flow] 19
[flow] 20
[flow] 21
[flow] 22
[flow] 23
[flow] 24
---- slow again, one per second
8
9
10
11
12
13
14
15
---- burst
[flow] 25
[flow] 26
[flow] 27
[flow] 28
[flow] 29
[flow] 30
[flow] 31
[flow] 32
---- etc.
16
17
```

Why do we get such a different behavior?

Because the source + flow combo and the sink run on different actors, now we have message exchanges between the components of the stream, so we have the demand/backpressure protocol we described at the beginning of the article.

Here's a breakdown of what's happening in this case:

1. The sink demands an element, which starts the flow + source.
2. In a snap, the sink receives an element, but it takes 1 second to process it, so it will send a _backpressure signal_ upstream.
3. During that time, the flow will attempt to keep the throughput of the source, and _buffer 16 elements_ internally.
4. Once the flow's buffer is full, it will stop receiving new elements.
5. Once per second, the sink will continue to receive an element and print it to the console (the second, slow batch).
6. After 8 elements, the flow's buffer becomes half-empty. It will then resume the source and print 8 more elements in a burst, until its buffer is full again.
7. The slow sink will keep doing its thing.
8. After 8 more elements, the flow's buffer becomes half-empty again, which will resume the source.
9. And so on.

As you can see, the natural response to a backpressure signal is to attempt _buffering new elements locally_ in order to maintain the producer throughput for as long as possible. Each Akka Streams component has its own internal buffer (by default 16 elements).

## 5. Customizing Buffering

We can control what happens when a consumer is slow. Akka Streams components allow us to

* buffer elements locally, with a configurable size
* drop data to maintain throughput, with configurable deletion strategies
* send backpressure signal upstream
* fail and tear down the stream altogether

We can decorate sources and flows with a configurable buffer which has all the capabilities described above. A simple example would look like

```scala
def demoBackpressure(): Unit = {
  source.via(debuggingFlow.buffer(10, OverflowStrategy.backpressure)).async.to(slowSink).run()
}
```

where `buffer(10, OverflowStrategy.backpressure)` means

* an additional buffer of 10 elements
* if the buffer is full, the decision will be to send a backpressure signal upstream to slow down the source

Some demonstrations follow.

### 5.1. Backpressure - Slow Down the Stream

The stream is exactly the one in the example above:

```scala
source.via(debuggingFlow.buffer(10, OverflowStrategy.backpressure)).async.to(slowSink).run()
```

The output is (the `----` are my notes)

```text
---- burst
[flow] 1
[flow] 2
[flow] 3
[flow] 4
[flow] 5
[flow] 6
[flow] 7
[flow] 8
[flow] 9
[flow] 10
[flow] 11
[flow] 12
[flow] 13
[flow] 14
[flow] 15
[flow] 16
[flow] 17
[flow] 18
[flow] 19
[flow] 20
[flow] 21
[flow] 22
[flow] 23
[flow] 24
[flow] 25
[flow] 26
---- slow
1
2
3
4
5
6
7
---- burst
[flow] 27
[flow] 28
[flow] 29
[flow] 30
[flow] 31
[flow] 32
[flow] 33
[flow] 34
---- slow
8
9
10
11
12
13
14
15
[flow] 35
[flow] 36
[flow] 37
[flow] 38
[flow] 39
[flow] 40
[flow] 41
[flow] 42
---- and so on
16
```

We now have 26 items being printed in the first burst because we have 16 elements from the original flow, plus 10 of the additional buffer. Otherwise the behavior is identical to the one described earlier.

### 5.2. Dropping Data - Oldest (Head)

If we absolutely need to maintain throughput, we have no choice but to start dropping data. One strategy is to make room for the incoming element by removing the _oldest_ element in the current buffer (the head of the list).

```scala
source.via(debuggingFlow.buffer(10, OverflowStrategy.dropHead)).async.to(slowSink).run()
```

The output is:

```text
---- burst
[flow] 1
[flow] 2
[flow] 3
---- omitting for brevity
[flow] 1000
---- slow
991
992
993
994
995
996
997
998
999
1000
---- end of stream
```

Here, the behavior is different: the flow is fast, but it has to start dropping data, and with every incoming element, the oldest current element in the buffer will be removed. So at every point, the buffer will keep the latest data, which (after 1 second) ends up being printed in the sink, slowly.

### 5.3. Dropping Data - Newest (Tail)

Still in the realm of dropping data, we can make room for the incoming element by removing the latest element in the buffer. The code looks like this:

```scala
source.via(debuggingFlow.buffer(10, OverflowStrategy.dropTail)).async.to(slowSink).run()
```

And the output is:

```text
---- burst
[flow] 1
[flow] 2
[flow] 3
---- omitting for brevity
[flow] 1000
---- slow
1
2
3
4
5
6
7
8
9
1000
```

In this case, every incoming element displaces the previous newest element in the buffer. At the end (after 1 second), the buffer will contain the 9 oldest elements (1 through 9) and the absolute newest element, 1000.

### 5.3. Dropping Data - New Element

If the buffer overflows, we can also choose to keep the buffer as it is and drop the incoming element instead, because we may consider the historical data more important. The difference is in using `dropNew`:

```scala
source.via(debuggingFlow.buffer(10, OverflowStrategy.dropNew)).async.to(slowSink).run()
```

And the output is:

```text
---- burst
[flow] 1
[flow] 2
[flow] 3
---- omitting for brevity
[flow] 1000
---- slow
1
2
3
4
5
6
7
8
9
10
```

In this case, the buffer is intact by the time the sink starts printing, so only the numbers 1-10 get shown.

### 5.4. Dropping Data - Entire Buffer

Finally, we can decide to remove the entire buffer if it overflows, and start fresh. The overflow strategy is called `dropBuffer`:

```scala
source.via(debuggingFlow.buffer(10, OverflowStrategy.dropNew)).async.to(slowSink).run()
```

With a surprising output:

```text
---- burst
[flow] 1
[flow] 2
[flow] 3
---- omitting for brevity
[flow] 1000
---- slow
991
992
993
994
995
996
997
998
999
1000
---- end of stream
```

Same as with `dropHead`, but here the mechanism is different: the buffer is removed entirely with each overflow, so in the end we'll have the last 10 elements. If instead of a source 1000 elements we used 1001 elements, we would have had yet another buffer drop with the last element, which would have been the only one being printed.

### 5.5. Teardown

This last resort is uninspiring: when we want both the throughput to be high and the data to be intact, the only thing we can do in case of a buffer overflow is to throw an exception, which will fail the entire stream. The strategy is called `fail`.

## 6. Conclusion

In this article, we went through backpressure in reactive systems, how Akka Streams manages it, and we did some demos on what should happen in case we want to maintain throughput/lose data or slow down stream/keep data.

The video version can be found here:

{% include video id="L5FAyCCWGL0" provider="youtube" %}
