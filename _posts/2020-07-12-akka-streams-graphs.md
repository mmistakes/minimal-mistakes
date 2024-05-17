---
title: "How to Use Akka Streams Graph DSL"
date: 2020-07-12
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [akka streams]
excerpt: "Akka Streams has the Graph DSL, which is one of its most powerful APIs. Learn how to use it and get started quickly with Akka Streams."
---

This article is for the Scala programmer with a little bit of Akka background, but who is utterly baffled by the seemingly magical Akka Streams Graph DSL. This article will attempt to demystify the apparent magic of the DSL into bits of Scala code that are easy to understand.

If you want to code with me, add the following to your build.sbt file:

```scala
val akkaVersion = "2.6.5"

libraryDependencies ++= Seq(
  // akka streams
  "com.typesafe.akka" %% "akka-stream" % akkaVersion,
  "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion,
)
```

## Prologue

In this article I'm assuming you know what Akka tries to do with actors and a bit of Akka Streams, at least what a Source, Sink and Flow do. To recap, a basic usage example of Akka Streams is to create some (potentially async) components that deal with receiving and/or passing data around, and plugging them together like pipes:

```scala
implicit val system = ActorSystem()
import system.dispatcher // "thread pool"

// a source element that "emits" integers
val source = Source(1 to 1000)
// a flow that receives integers, transforms them and passes their results further down
val flow = Flow[Int].map(x => x * 2)
// a sink that receives integers and prints each to the console
val sink = Sink.foreach[Int](println)
// combine all components together in a static graph
val graph = source.via(flow).to(sink)
// start the graph = "materialize" it
graph.run()
```

This example will print the number 2 to 2000, in steps of 2, on separate lines. Akka Streams is all about creating these individual data-receiving and data-passing components, and combining them to create useful data pipes in your application. The beauty of this way of thinking about data is that you don't need to concern yourself with synchronization or communication problems; everything is taken care of by the middleware.

## Enter the Graph DSL

After understanding the basic flow of Akka (pun intended), I see lots of people hitting a brick wall when they move to level 2 of Akka Streams, which is the infamous Graph DSL. It's not an API, it's a full-blown DSL.

I called this Graph DSL a "level 2" of Akka Streams because besides the standard Source-flow-sink structure, complex applications need complex data-passing architectures. For example, when you're hitting reply-all to that email, you want to broadcast that email to all 354 recipients of your liss. Or another example: if you're writing an online store, and a user just paid for a product, you want to query the payment provider to make sure the payment went through, and at the same time instruct the fulfilment center to dispatch an order. These are likely two different services, whose replies you need to glue together before you can send your lovely user an order confirmation. These examples (and countless others) need something more than the linear source-flow-sink data passing scheme.

Enter the Graph DSL.

Let's do with something simple. Assume you are starting with a source of integers, and you want to feed them to two independent, asynchronous complex computation engines. Then you want to stitch the results together as a tuple, and print the tuples to the console. Almost inevitably, most documentation articles give you the whole structure which has some alien tokens inside, but I want to break this down into some steps that you can follow when you want to create your own graphs.

First of all, you need to know what kind of components you will need for such a job. Besides sources, sinks and flows, we can have other components that can have either multiple inputs (like a zip) or multiple outputs (like a broadcast). Our graph will look something like below, with the components separated:

![How to Use Akka Streams Graph DSL - tutorial](https://rtjvm-website-blog-images.s3-eu-west-1.amazonaws.com/23-1-first-graph.png)

This visual representation will be reflected in the code, much more than you think. So the above was step 0: make a mental diagram of how you want your data to move.

## Step 1: the frame

```scala
val graph = GraphDSL.create() { implicit builder: GraphDSL.Builder[NotUsed] =>
  import GraphDSL.Implicits._ // brings some nice operators in scope

}
```

The `GraphDSL.create` is a curried function. The first argument list is empty (but it also has overloads with arguments, don't worry about those) and the second argument is a function. That function takes a mutable data structure called a Builder which is typed with a <a href="https://rockthejvm.com/blog/materialized-values">materialized value</a>, which in our case will be NotUsed, as we aren't surfacing anything outside of the stream. Inside the function block, we are already importing `import GraphDSL.Implicits._` to bring some alien operators in scope.

## Step 2: create the building blocks

After the implicit import, still inside the block of the function, we need to add the individual components that we are going to use in the graph:

```scala
val input = builder.add(Source(1 to 1000)) // the initial elements
val incrementer = builder.add(Flow[Int].map(x => x + 1)) // hard computation #1
val multiplier = builder.add(Flow[Int].map(x => x * 10)) // hard computation #2
val output = builder.add(Sink.foreach[(Int, Int)](println)) // the printer

val broadcast = builder.add(Broadcast[Int](2)) // fan-out operator
val zip = builder.add(Zip[Int, Int]) // fan-in operator
```

The last two components are the most interesting. The Broadcast has the capacity to duplicate the incoming data into multiple outputs - which will be fed into our individual super-heavy computations - and the Zip will receive the results from the two flows, and whenever a value is ready at both its inputs, it will take them, tuple them and send them downstream, while keeping the order of elements.

## Step 3: glue the components together

This step is the most fun and also the hardest to understand if you've never seen this before.

```scala
input ~> broadcast

broadcast.out(0) ~> incrementer ~> zip.in0
broadcast.out(1) ~> multiplier  ~> zip.in1

zip.out ~> output
```

The squiggly arrow thing is a method which is brought in scope by our implicits import in step 1 - we're of course using it infix because it looks cool. You might notice that we aren't using the result of these expressions. That's because the methods return Unit, but they take the implicit Builder (again from step 1) as argument. In other words, the squiggly arrow mutates the Builder which (internally) describes the layout of our stream. This step is one of the most powerful in Akka Streams, because the code looks visually similar to our earlier diagram. If I change some whitespace, I could make the code like this:

```scala
                    broadcast.out(0) ~> incrementer ~> zip.in0
input ~> broadcast;                                             zip.out ~> output
                    broadcast.out(1) ~> multiplier  ~> zip.in1
```

The code looks visual, all without needing to care about the internal implementation of these individual components. They're all asynchronous and backpressured, and we're getting all the benefits for free.

## Step 4: closing

Still in the block of the function we opened in step 1, we need to make the function return what Akka Streams calls a Shape. Because our graph is closed, i.e. has no open inputs and outputs, we're returning ClosedShape.

```scala
val graph = GraphDSL.create() { implicit builder: GraphDSL.Builder[NotUsed] =>
  import GraphDSL.Implicits._ // brings some nice operators in scope

    // ... the rest of the implementation

    ClosedShape
}
```

ClosedShape is an object which is a marker for Akka when you will materialize this graph, to make sure you didn't leave any internal component with any input or output hanging or unconnected.

## Final code

After you are done creating the graph, you will need to materialize it to run:

```scala
import akka.NotUsed
import akka.actor.ActorSystem
import akka.stream.ClosedShape
import akka.stream.scaladsl.{Broadcast, Flow, GraphDSL, RunnableGraph, Sink, Source, Zip}

object AkkaStreamsGraphs {

  implicit val system = ActorSystem("GraphBasics")

  // step 1 - setting up the fundamentals for the graph
  val graph =
    GraphDSL.create() { implicit builder: GraphDSL.Builder[NotUsed] => // builder = MUTABLE data structure
      import GraphDSL.Implicits._ // brings some nice operators into scope

      // step 2 - add the necessary components of this graph
      val input = builder.add(Source(1 to 1000))
      val incrementer = builder.add(Flow[Int].map(x => x + 1)) // hard computation
      val multiplier = builder.add(Flow[Int].map(x => x * 10)) // hard computation
      val output = builder.add(Sink.foreach[(Int, Int)](println))

      val broadcast = builder.add(Broadcast[Int](2)) // fan-out operator
      val zip = builder.add(Zip[Int, Int]) // fan-in operator

      // step 3 - tying up the components
      input ~> broadcast

      broadcast.out(0) ~> incrementer ~> zip.in0
      broadcast.out(1) ~> multiplier  ~> zip.in1

      zip.out ~> output

      // step 4 - return a closed shape
      ClosedShape
    }

  def main(args: Array[String]): Unit = {
    RunnableGraph.fromGraph(graph).run()
  }
}
```
