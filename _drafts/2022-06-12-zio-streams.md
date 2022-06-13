---
title: "ZIO Streams: An Introduction"
date: 2022-06-12
header:
  image: "/images/blog cover.jpg"
tags: [zio, zio-streams]
excerpt: "An Introduction to ZIO Streams"
---

Talk'n bout ZIO Streams.

## Set up

```scala
libraryDependencies ++= Seq(
      "dev.zio" %% "zio" % "2.0.0-RC6",
      "dev.zio" %% "zio-streams" % "2.0.0-RC6"
)
```

## ZIO Stream Components

Before we start discussing the core components of ZIO Streams, let's first
revisit the type signature of a zio: `ZIO[R, E, A]`. This is an effect that will
compute a result `A`, requires dependencies `R` to do so, and could possibly
fail with an error `E`. Note, that `E` are errors you maybe potentially want to
recover from - an error which occurs that is not of type `E` is called a
_defect_. If there are no dependencies required, then `R` is `Any`. If there are
no errors you expect to recover from, then `E` is `Nothing`. These Types will be
central to our understanding of ZStreams going forward!

We should also briefly mention `Chunk[A]`. Due to practicality, and performance,
all things work in batches, and the `zio.Chunk[A]` is an immutable array-backed
_collection_ which will often present itself when working with ZStreams.

### ZStream

A ZStream has the signature: `ZStream[R, E, O]`, which means it will produce
**some number** of `O` elements, requiring dependencies `R` to do so, and could
possibly fail with an error of type `E`. Since this is a _Stream_ we could
possibly be producing somewhere between 0 and infinite `O` elements.

A ZStream represents the _source_ of data in your work flow.

### ZSink

At the opposite end of our stream, we have ZSink, with the signature:
`ZSink[R, E, I, L, Z]`. `R`, and `E` are as described above. It will consume
input of `I`, producing `Z` and any `L` that may be left over. Generally `I`
will be matching the ZStream `O`.

A ZSink represents the terminating _endpoint_ of data in your workflow.

Let's have a quick chat about that `L` type. `L` can really depend on the
operation you are performing. For example, if your intention is to sum a stream
of integers, you wouldn't expect there to be anything left over.

```scala
  val sum: ZSink[Any, Nothing, Int, Nothing, Int] = ZSink.sum[Int]
```

On the other hand, an operation like `take` implies that there are possibly
elements you are not operating on. Let's also map our output, so we can see a
different output type.

```scala
  val take5: ZSink[Any, Nothing, Int, Int, Chunk[Int]] = ZSink.take[Int](5)
  val take5Map: ZSink[Any, Nothing, Int, Int, Chunk[String]] = take5.map(chunk => chunk.map(_.toString))
```

If we knew our collection was finite, we could also return the leftovers that
were not operated on - or we could outright ignore them.

```scala
  val take5Leftovers: ZSink[Any, Nothing, Int, Nothing, (Chunk[String], Chunk[Int])] = take5Map.exposeLeftover
  val take5NoLeftovers: ZSink[Any, Nothing, Int, Nothing, Chunk[String]] = take5Map.dropLeftover
```

If we have some logic to process a stream already, but suddenly our stream is a
different type, we can use `contramap` to map the input type appropriately. If
using both `map` and `contramap`, then there is an equivalent `dimap` you can
call as well.

```scala

  // take5Map works on this.
  val intStream: ZStream[Any, Nothing, Int] = ZStream(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

  // take5Map does not work on this.
  val stringStream: ZStream[Any, Nothing, String] = ZStream("0", "1", "2", "3", "4", "5", "6", "7", "8", "9")

  // We can use contramap to use our take5 logic, and operate on stringStream with it.
  val take5Strings: ZSink[Any, Nothing, String, Int, Chunk[String]] = take5Map.contramap[String](_.toInt)
  val take5Dimap: ZSink[Any, Nothing, String, Int, Chunk[String]] = take5.dimap[String, Chunk[String]](_.toInt, _.map(_.toString))
```

Notice that he `L` is still `Int`. With contramap, we are operating on input
element to get it to the correct type (`String`), however, if it is left over,
then it wasn't operated on - meaning it's still the input type from `take5`
(`Int`).

### ZPipeline

A ZPipeline converts one ZStream to another ZStream. It can conceptually be
thought of as
`type ZPipeline[Env, Err, In, Out] = ZStream[Env, Err, In] => ZStream[Env, Err, Out]`.

The main use case of a ZPipeline is to separate out reusable transform logic,
that can then be composed together with other ZPipelines, and then placed in
between any appropriate ZStream and a ZSink.

From our example above, instead of rewriting `take5Map` as `take5Strings` with
contramap, we could separate that logic out, and use our original ZSink:

```scala
  //stringStream.run(take5Map) <- This doesn't compile
  val businessLogic: ZPipeline[Any, Nothing, String, Int] = ZPipeline.map[String, Int](_.toInt)
  val zio: ZIO[Any, Nothing, Chunk[String]] = stringStream.via(businessLogic).run(take5Map)
```

## Handling Failures

Don't blow your top.

## ZStream Operations

The useful stuff.

## ZStream Operations

Probably useful stuff.

## ZSink Operations

Also useful stuff.

## An example

Build a tagging + indexing pipeline for markdown files.
