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
      "dev.zio" %% "zio-streams" % "2.0.0-RC6",
      "dev.zio" %% "zio-json" % "0.3.0-RC8"
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

From our example above, let's say we wanted to sum the stream of Strings.
Instead of adapting our `sum` ZSink with contramap, we can write:

```scala
  //stringStream.run(sum) <- This doesn't compile
  val businessLogic: ZPipeline[Any, Nothing, String, Int] = ZPipeline.map[String, Int](_.toInt)
  val zio: ZIO[Any, Nothing, Int] = stringStream.via(businessLogic).run(sum)
```

## Handling Failures

If we think of some `val s1: ZStream[R, E, A]`:

we can use the `orElse` methods to directly provide the recovery stream. The
interesting thing of `orElseEither` is that we can distinguish the transition
when s1 failed, and s2 was used, as s1 values would be a `Left` and values from
s2 would be `Right`.

```scala
s1.orElse(s2: => ZStream[R1, E1, A1]): ZStream[R1, E1, A1]
s1.orElseEither(s2: => ZStream[R1, E1, A1]): ZStream[R1, E1, Either[A, A1]]
```

If we want to recover from specific failures via
`PartialFunction[E, ZStream[R1, E1, A1]]`s (and causes), we can use `catchSome`
( or `catchSomeCause`)

```scala
s1.catchSome {
  case e1: Error1 => s2
}
```

If we want to exhaustively recover from errors via `E => ZStream[R1, E2, A1]`)
(and causes), we can use `catchAll` (or `catchAllCause`)

```scala
s1.catchAll {
  case e1: Error1 => s2
  case e2: Error2 => s3
  case _          => s4
}
```

If we want to push our error handling downwards, we can also transform a
`ZStream[R, E, A]` to `ZStream[R, Nothing, Either[E, A]]` via `either` (e.g.
`s1.either`).

Recovering form a failure in a ZStream generally revolves around providing a
secondary stream to recover with. If you are looking to recover "in-place", by
effectively just dropping that element, you could do something like
`s1.either.collectRight`. For more robust solutions, we would likely need to
encode that logic elsewhere.

## ZStream Operations

The useful stuff.

## ZSink Operations

Also useful stuff.

## Async ZStreams

example:

```scala
  // Bad code!
  val program: ZIO[Any, Throwable, ExitCode] = for {
    queue <- Queue.unbounded[Int]
    producer <- dirtyStream.via(parsePipeline)
      .run(ZSink.fromQueue(queue))
    result <- ZStream.fromQueue(queue)
      .run(ZSink.sum[Int]).debug("sum")
  } yield ExitCode.success
```

```scala
  val program: ZIO[Any, Throwable, ExitCode] = for {
    queue <- Queue.unbounded[Int]
    producer <- dirtyStream.via(parsePipeline)
      .run(ZSink.fromQueueWithShutdown(queue))
      .fork
    result <- ZStream.fromQueue(queue)
      .run(ZSink.sum[Int]).debug("sum")
      .fork
    _ <- producer.join
    _ <- result.join
  } yield ExitCode.success
```

## An example

Build a tagging + indexing pipeline for markdown files.



```scala
  val post1: String = "hello-word.md"
  val post1_content: Array[Byte] =
    """---
      |title: "Hello World"
      |tags: []
      |---
      |======
      |
      |## Generic Heading
      |
      |Even pretend blog posts need a #generic intro.
      |""".stripMargin.getBytes

  val post2: String = "scala-3-extensions.md"
  val post2_content: Array[Byte] =
    """---
      |title: "Scala 3 for You and Me"
      |tags: []
      |---
      |======
      |
      |## Cool Heading
      |
      |This is a post about #Scala and their re-work of #implicits via thing like #extensions.
      |""".stripMargin.getBytes

  val post3: String = "zio-streams.md"
  val post3_content: Array[Byte] =
    """---
      |title: "ZIO Streams: An Introduction"
      |tags: []
      |---
      |======
      |
      |## Some Heading
      |
      |This is a post about #Scala and #ZIO #ZStreams!
""".stripMargin.getBytes

  val fileMap: Map[String, Array[Byte]] = Map(
    post1 -> post1_content,
    post2 -> post2_content,
    post3 -> post3_content
  )

  val hashFilter: String => Boolean =
    str =>
      str.startsWith("#") &&
        str.count(_ == '#') == 1 &&
        str.length > 2

  val punctRegex: Regex = """\p{Punct}""".r

  val parseHash: ZPipeline[Any, Nothing, String, String] = ZPipeline.filter[String](hashFilter)
  val removePunctuation: ZPipeline[Any, Nothing, String, String] = ZPipeline.map[String, String](str => punctRegex.replaceAllIn(str, ""))
  val lowerCase: ZPipeline[Any, Nothing, String, String] = ZPipeline.map[String, String](_.toLowerCase)

  val collectTags: ZSink[Any, Nothing, String, Nothing, Set[String]] = ZSink.collectAllToSet[String]

  val addTags: Set[String] => ZPipeline[Any, Nothing, String, String] =
    tags =>
      ZPipeline.map[String, String](_.replace("tags: []", s"tags: [${tags.mkString(", ")}]"))


  val addLink: ZPipeline[Any, Nothing, String, String] =
    ZPipeline.map[String, String] { line =>
      line.split(" ").map { word =>
        if (hashFilter(word)) {
          s"[$word](/tag/${punctRegex.replaceAllIn(word.toLowerCase, "")})"
        } else {
          word
        }
      }.mkString(" ")
    }

  val addNewLine: ZPipeline[Any, Nothing, String, String] = ZPipeline.map[String, String](_.appended('\n'))

  val writeFile: String => ZSink[Any, Throwable, Byte, Byte, Long] = ZSink.fromFileName(_)

  val collectTagPipeline: ZPipeline[Any, CharacterCodingException, Byte, String] =
    ZPipeline.utf8Decode >>>
      ZPipeline.splitLines >>>
      ZPipeline.splitOn(" ") >>>
      parseHash >>>
      removePunctuation >>>
      lowerCase

  val regeneratePostPipeline: Set[String] => ZPipeline[Any, CharacterCodingException, Byte, Byte] =
    ZPipeline.utf8Decode >>>
      ZPipeline.splitLines >>>
      addTags(_) >>>
      addLink >>>
      addNewLine >>>
      ZPipeline.utf8Encode

  val parseProgram: ZIO[Console, Throwable, ExitCode] = for {
    tagMap <- ZIO.foreach(fileMap) { (k, v) =>
      ZStream.fromIterable(v)
        .via(collectTagPipeline)
        .run(collectTags)
        .map(tags => k -> tags)
    }
    _ <- ZIO.foreachDiscard(fileMap) { kv =>
      Console.printLine(s"// Generating file ${kv._1}") *>
        ZStream.fromIterable(kv._2)
          .via(regeneratePostPipeline(tagMap(kv._1)))
          .run(writeFile(kv._1))
    }
    _ <- Console.printLine("// Generating file search.json")
    searchMap = tagMap.values.toSet.flatten.map(t => t -> tagMap.filter(_._2.contains(t)).keys.toSet).toMap
    _ <- ZStream.fromIterable(searchMap.toJsonPretty.getBytes)
      .run(ZSink.fromFileName("search.json"))
  } yield ExitCode.success

```