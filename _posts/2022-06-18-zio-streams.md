---
title: "ZIO Streams: An Introduction"
date: 2022-06-18
header:
  image: "/images/blog cover.jpg"
tags: [zio, zio-streams]
excerpt: "An Introduction to ZIO Streams"
---

In this post, we're going to go over an introduction to the main components of
ZIO Streams, how to work with them when things go right, and what to do when
things go wrong.

As a toy example, we're going to take a brief foray into asynchronous
operations, by connecting two streams to the same concurrent data structure.

For a more concrete example, we are going to write a program that will parse
markdown files, extract words identified as tags, and then regenerate those
files with tag-related metadata injected back into them.

## Set up

We're going to base this discussion off of the latest ZIO 2.0 code, which is
still an `RC` (at the time of writing, mid-June 2022), but the API hopefully
won't change before release. These are the dependencies to include for our walk
through:

```scala
libraryDependencies ++= Seq(
      "dev.zio" %% "zio" % "2.0.0-RC6",
      "dev.zio" %% "zio-streams" % "2.0.0-RC6",
      "dev.zio" %% "zio-json" % "0.3.0-RC8"
)
```

## What's a Stream?

_Broadly:_ A _stream_ is a series of data elements that are made available over
time.

### LazyList

A specific example of a stream implementation, is Scala's `LazyList`. A
`LazyList` is a linked list, where the `tail` is lazily evaluated. This fits our
broad definition above, because the tail isn't evaluated until accessed -
meaning they are made available over the time. If we investigated this in a
_repl_, we'd see :

```shell
scala> val ll = LazyList(1,2,3,4,5)
val ll: scala.collection.immutable.LazyList[Int] = LazyList(<not computed>)

scala> ll.head
val res1: Int = 1

scala> ll.tail
val res2: scala.collection.immutable.LazyList[Int] = LazyList(<not computed>)
```

Once the `LazyList` has been created, we can access the `head` element, but the
`tail` is not yet computed. This is in stark comparison to a `List`, for which
the same exercise would yield:

```shell
scala> val l = List(1,2,3,4,5)
val l: List[Int] = List(1, 2, 3, 4, 5)

scala> l.head
val res0: Int = 1

scala> l.tail
val res1: List[Int] = List(2, 3, 4, 5)
```

Scala's `LazyList` also has the bonus of the elements being memoized - meaning
they are only computed once. Let's go back to the _repl_, and look at our
`LazyList` after the first two elements have been accessed.

```shell
scala> ll.tail.head
val res3: Int = 2

scala> ll
val res4: scala.collection.immutable.LazyList[Int] = LazyList(1, 2, <not computed>)
```

We can see that the first two elements now clearly show! If you haven't felt the
excitement of generating the Fibonacci sequence with `LazyList`s, I encourage
you to do so. However, the most important take-away from this feature, is that
_memoization_ is not in our broad definition above - this is not a feature of
all streams.

### Logs-As-A-Stream

Many messaging platforms, such as Kafka, Pulsar, and/ RabbitMQ have what they
advertise as `Stream`s. At the heart of this, there is the concept that a
message is _produced_, and written to disk as an _append-only_ log. _Some time
later_ a `consumer` can read back entries from that log at their own leisure,
and there is a guarantee that the within the same offset (i.e. the first 1000
elements), the data will be constant, even if re-processed later. This fits our
broad definition, because the data is ordered and available over time.

### FileInputStream

In our example later, we are going to process blog posts to parse tag-data.
These files are not processed terribly different than our append-only log above;
any given file is an ordered collection of elements, we read them in one at a
time, and do something with that information as we go. A notable difference from
above, is that the elements within an offset can change _when not being
processed_. If I go back and edit a blog post, there is no guarantee that when
the file is re-processed that the first 1000 elements will be the same as
before.

### Stream Recap

We can see that the fluid meaning of what a stream is can solidify itself around
a context.

If we're in the mindset of Kafka, a stream might mean the implication of
consistent data within an offset _at all times_.

If we're in the mindset of parsing files, a stream might imply meaningfully
ordered elements that consistently build a larger concept, _at the time of
processing_. This is to say, here it is more important that a stream of `Byte`
can always be processed into a `String` by following an encoding pattern. If we
go back and re-process it, we don't care if the contents have changed, just that
the content can be processed.

As we move on to ZIO Streams, we should keep our broad definition in mind, so we
don't ensnare ourselves on the implementation details.

## ZIO Stream Components

Before we start discussing the core components of ZIO Streams, let's first
revisit the type signature of a zio: `ZIO[R, E, A]`. This is an effect that will
compute a single _value_ of type `A`, requires _dependencies_ of type `R` to do
so, and could possibly fail with an _error_ of type `E`. Note, that `E` are
errors you potentially want to recover from - an error which occurs that is not
of type `E` is called a _defect_. If there are no dependencies required, then
`R` is `Any`. If there are no errors you expect to recover from, then `E` is
`Nothing`. The concept of declaring _dependencies_, _errors_, and _values_ in
our type signature will be central to our understanding of `ZStream`s going
forward!

We should also briefly mention the `Chunk[A]`. Due to practicality, and
performance, our streams work in batches, and the `zio.Chunk[A]` is an immutable
array-backed _collection_, containing elements of type `A`, which will often
present itself when working with `ZStream`s.

### ZStream

A ZStream has the signature: `ZStream[R, E, O]`, which means it will produce
**some number** of `O` elements, requiring dependencies `R` to do so, and could
possibly fail with an error of type `E`. Since this is a _stream_ we could
possibly be producing somewhere between 0 and infinite `O` elements.

A ZStream represents the _source_ of data in your work flow.

### ZSink

At the opposite end of our stream, we have a `ZSink`, with the signature:
`ZSink[R, E, I, L, Z]`. `R`, and `E` are as described above. It will consume
elements of type `I`, and produce a value of type `Z` and any elements of type
`L` that may be left over.

A ZSink represents the terminating _endpoint_ of data in your workflow.

`L` deserves a dedicated note: `L` describes values that have not been processed
by the `ZSink`. For example, if our intent is to sum every element in the
stream, then we would not expect any elements to be left over once processed:

```scala
  val sum: ZSink[Any, Nothing, Int, Nothing, Int] =
    ZSink.sum[Int]
```

On the other hand, if our intent is to only operate on the first few elements of
a stream, via an operation like `take`, then there exists the possibility that
there are remaining, unprocessed values. Let's also map our output, so we can
see the different output type.

```scala
  val take5: ZSink[Any, Nothing, Int, Int, Chunk[Int]] =
    ZSink.take[Int](5)

  val take5Map: ZSink[Any, Nothing, Int, Int, Chunk[String]] =
    take5.map(chunk => chunk.map(_.toString))
```

If we knew our collection was finite, we could also return the leftovers that
were not operated on - or we could outright ignore them.

```scala
  val take5Leftovers: ZSink[Any, Nothing, Int, Nothing, (Chunk[String], Chunk[Int]) =
    take5Map.exposeLeftover

  val take5NoLeftovers: ZSink[Any, Nothing, Int, Nothing, Chunk[String]] =
    take5Map.dropLeftover
```

### A Prelude to ZPipelines

If we have some logic to _process_ a stream already, but suddenly our stream is
a different type, we can use `contramap` to map the input type appropriately. If
using both `map` and `contramap`, then there is an equivalent `dimap` you can
call as well.

```scala
  // take5Map would work on this.
  val intStream: ZStream[Any, Nothing, Int] =
  ZStream(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

  // take5Map would not work on this.
  val stringStream: ZStream[Any, Nothing, String] =
    ZStream("0", "1", "2", "3", "4", "5", "6", "7", "8", "9")

  // We can use contramap to use our take5 logic, and operate on stringStream with it.
  val take5Strings: ZSink[Any, Nothing, String, Int, Chunk[String]] =
    take5Map.contramap[String](_.toInt)

// This is equivalent to take5Strings above
  val take5Dimap: ZSink[Any, Nothing, String, Int, Chunk[String]] =
    take5.dimap[String, Chunk[String]](_.toInt, _.map(_.toString))
```

Notice that the type of `L` is still `Int`. With `contramap`, we are operating
on the input element to get it to the correct type (`String`), however, if
anything is left over, then it wasn't operated on - meaning it's still the input
type from `take5` (`Int`).

It's worthwhile to pause here, and discuss `contramap`. We are converting a
value of type `A` to a value of type `B`, with a function that is `B => A` -
this operates like `map` _in reverse_. Without diving too far into category
theory, you can think of a Covariant Functor as something that may "produce" a
value of type `A` (and implements a `map`), whereas a Contravariant Functor may
"consume" a value of type `A` (and implements a `contramap`). With JSON as an
example, the _contravariant_ `Encoder[A]` consumes a value of type `A` to
produce JSON, whereas the _covariant_ `Decoder[A]` produces a value of type `A`
by consuming JSON.

### ZPipelines

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

  val businessLogic: ZPipeline[Any, Nothing, String, Int] =
    ZPipeline.map[String, Int](_.toInt)

  val zio: ZIO[Any, Nothing, Int] =
    stringStream.via(businessLogic).run(sum)
```

We can also _compose_ `ZPipeline`s together to form a new `ZPipeline` with
`>>>`, for example:

```scala
  val businessLogic: ZPipeline[Any, Nothing, String, Int] =
    ZPipeline.map[String, Int](_.toInt)

  val filterLogic: ZPipeline[Any, Nothing, Int, Int] =
    ZPipeline.filter[Int](_ > 3)

  val appLogic: ZPipeline[Any, Nothing, String, Int] =
    businessLogic >>> filterLogic

  val zio: ZIO[Any, Nothing, Int] =
    stringStream.via(appLogic).run(sum)
```

An interesting thing we're seeing here for the first time, is seeing that
connecting a `ZSink` to a `ZStream` results in a `ZIO`. In oder to process of
our stream logic, we need to connect streams to sinks to produce a `ZIO` we can
evaluate. As we're talking about the complete processing of a stream, we should
mention that ZIO uses pull-based streams, meaning that elements are processed by
being "pulled through the stream" by the sink. In push-based systems, elements
would be "pushed through the stream" to the sink.

Along with the typical collection-like operations you'd expect, there are a
number of addition ones that are available directly on `ZStream`, and can be
referenced in the
[official docs](https://zio.dev/next/datatypes/stream/zstream/#operations) .

## Handling Failures

Illustrating failures can be a little lack-luster in a less-interactive medium,
suh as reading a blog post. For example, we might declare a example of stream
with a failure as

```scala
  val failStream: ZStream[Any, String, Int] = ZStream(1, 2) ++ ZStream.fail("Abstract reason") ++ ZStream(4, 5)
```

but what does that mean in use? We're not going to intentionally instantiate a
`ZStream` with a `.fail` in the middle of of it. Thinking about how you can get
into a failure state is as valuable as how to recover from it. So instead of the
example above, let's do something that feels more real, and implement an
`InputStream` that we can control the success/failure cases.

```scala
  class FakeInputStream[T <: Throwable](failAt: Int, failWith: => T) extends InputStream {
    val data: Array[Byte] = "0123456789".getBytes
    var counter = 0

    override def read(b: Array[Byte]): Int = {
      if (counter == failAt) throw failWith
      if (counter < data.length) {
        b(0) = data(counter)
        counter += 1
        1
      } else {
        -1
      }
    }

    // Not used, but needs to be implemented
    override def read(): Int = ???
  }
```

Our `FakeInputStream` with make the elements of the string `"0123456789"`
available. In the constructor, we can pass in a `failAt` to indicate the point
when we should throw an exception, and `failWith` is the exception we should
throw. By setting `failAt` higher than the length of our string, we wont fail.
By passing in different instances of `failsWith`, we can control wether or not
if the error is in the `E` channel of our `ZStream[R, E, O]`.

With this in mind, let's set up some stream components that we can run together,
and test different error cases.

```scala
  // 99 is higher than the length of our data, so we won't fail
  val nonFailingStream: ZStream[Any, IOException, String] =
    ZStream.fromInputStream(new FakeInputStream(99, new IOException("")), chunkSize = 1)
      .map(b => new String(Array(b)))

  // We will fail, and the error type matches ZStream error channel
  val failingStream: ZStream[Any, IOException, String] =
    ZStream.fromInputStream(new FakeInputStream(5, new IOException("")), chunkSize = 1)
      .map(b => new String(Array(b)))

  // We fail, but the error does not match the ZStream error channel
  val defectStream: ZStream[Any, IOException, String] =
    ZStream.fromInputStream(new FakeInputStream(5, new IndexOutOfBoundsException("")), chunkSize = 1)
      .map(b => new String(Array(b)))

  // When recovering, we will use this ZStream as the fall-back
  val recoveryStream: ZStream[Any, Throwable, String] =
    ZStream("a", "b", "c")

  // We will pull values one at a time, and turn them into one string separated by "-"
  val sink: ZSink[Any, Nothing, String, Nothing, String] =
    ZSink.collectAll[String].map(_.mkString("-"))
```

If we were to define a program, and look at the output of the success case, it
might look like:

```scala
object ZStreamExample extends ZIOAppDefault {

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    nonFailingStream
      .run(sink)
      .debug("sink")
}
```

and we would see the output `sink: 0-1-2-3-4-5-6-7-8-9`.

Now let's turn our attention to the `failingStream`.

```scala
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    failingStream
      .run(sink)
      .debug("sink")
```

The above code will fail less than gracefully, with something like

```shell
<FAIL> sink: Fail(java.io.IOException: ,StackTrace(Runtime(6,1655962329,),Chunk(com.alterationx10.zse.ZStreamExample.run(ZStreamExample.scala:53),com.alterationx10.zse.ZStreamExample.run(ZStreamExample.scala:54))))
timestamp=2022-06-23T05:32:09.924145Z level=ERROR thread=#zio-fiber-0 message="" cause="Exception in thread "zio-fiber-6" java.io.IOException: java.io.IOException:
	at com.alterationx10.zse.ZStreamExample.run(ZStreamExample.scala:53)
	at com.alterationx10.zse.ZStreamExample.run(ZStreamExample.scala:54)"
```

Let's see how we can recover with `orElse`/`orElseEither`:

```scala
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    failingStream.orElse(recoveryStream)
      .run(sink)
      .debug("sink")
```

outputs `sink: 0-1-2-3-4-a-b-c`. From the result, we can see that the elements
of the original stream were processed up to the point of failure, and then
elements of the recovery stream started to be processed afterwards.

```scala
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    failingStream.orElseEither(recoveryStream)
      .run(ZSink.collectAll[Either[String, String]])
      .debug("sink")
```

outputs
`sink: Chunk(Left(0),Left(1),Left(2),Left(3),Left(4),Right(a),Right(b),Right(c))`.
The interesting thing of `orElseEither` is that we can distinguish the
transition when `failingStream` failed, and `recoveryStream` was used, as the
former values would be a `Left` and latter values would be `Right`. Note that we
adjusted our `ZSink` here, sone the output changed from `String` to
`Either[String, String]`.

If we want to recover from specific failures via
`PartialFunction[E, ZStream[R1, E1, A1]]`s we can use `catchSome` ( or
`catchSomeCause` for causes - a.k.a _defects_).

```scala
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    failingStream.catchSome {
      case _: IOException => recoveryStream
    }
      .run(sink)
      .debug("sink")

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    defectStream.catchSomeCause {
      case Fail(e: IOException, _) => recoveryStream
      case Die(e: IndexOutOfBoundsException, _) => recoveryStream
    }
      .run(sink)
      .debug("sink")
```

Both of the examples above result in `sink: 0-1-2-3-4-a-b-c`. We can see that
with `catchSomeCause` we can also drill into the cause, and be able to recover
from errors that are not included in the error channel of our `ZStream`.

If we want to exhaustively recover from errors via `E => ZStream[R1, E2, A1]`)
(and causes), we can use `catchAll` (or `catchAllCause`).

```scala
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    failingStream.catchAll {
      case _: IOException => recoveryStream
      case _ => ZStream("x", "y", "z")
    }
      .run(sink)
      .debug("sink")

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    defectStream.catchAllCause(_ => recoveryStream)
      .run(sink)
      .debug("sink")
```

Both of the examples above result in `sink: 0-1-2-3-4-a-b-c`.

If we want to push our error handling downwards, we can also transform a
`ZStream[R, E, A]` to `ZStream[R, Nothing, Either[E, A]]` via `either`.

```scala
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    failingStream.either
      .run(ZSink.collectAll[Either[IOException, String]])
      .debug("sink")
```

will succeed, and output
`sink: Chunk(Right(0),Right(1),Right(2),Right(3),Right(4),Left(java.io.IOException: ))`.
We can see that we have our processed values up until the failures as `Right`s,
ending with a `Left` of the failure, and we did not have to provide a recovery
stream. If we felt this level of processing was good enough, we could use
`failingStream.either.collectRight.run(sink)` to get `sink: 0-1-2-3-4`.

## Async ZStreams

So far, we've discussed fairly bounded streams, from defined/known collections
of values. It won't be long before we want to "feed" data into a stream we've
previously created. Luckily, we can create a `ZStream` from a `Queue`/`Hub`
directly, which are asynchronous data structures in ZIO. In our example, we'll
use a `Queue`, and with a reference to that `queue` we can offer values to it
elsewhere. Additional, we can also create a `ZSink` from a `Queue`/`Hub`!

If we can set both the _endpoint_ and the _source_ as a queue, what if we joined
two `ZStream`s together with the _same_ queue? Let's look at a toy example,
where we "process" one stream to sanitize values, that we then feed that into
another stream that now doesn't have to address that concern.

After our `ZStream` practice above, and a reminder that `parsePipeline` converts
`String`s to `Int`s, we might first write something like this:

```scala
  // Bad code!
  val program: ZIO[Any, Throwable, ExitCode] = for {
    queue <- Queue.unbounded[Int]
    producer <- nonFailingStream.via(parsePipeline)
      .run(ZSink.fromQueue(queue))
    result <- ZStream.fromQueue(queue)
      .run(ZSink.sum[Int]).debug("sum")
  } yield ExitCode.success
```

and it will _almost_ do what we think! We expected it to funnel all of the
elements of the first `ZStream` through the second, and them sum them in the
`ZSink.sum` to produce a resulting value. However, it will process the values,
and feed them to the second `ZStream`, **but** our program will hang. Why?
Because we're working with asynchronous things now. Our `result` has processed
all the elements from our `producer` - but it continues to wait for any new
values that could be passed into the our `queue`. It can't complete! We need to
signal to `result` that we should finalize, by closing the `queue`. We could
make a `Promise`, and use it to `await` before closing the `queue`, but luckily
this functionality is already included with `ZSink.fromQueueWithShutdown`

Now, we might be tempted to write:

```scala
  // Still bad code!
  val program: ZIO[Any, Throwable, ExitCode] = for {
    queue <- Queue.unbounded[Int]
    producer <- nonFailingStream.via(parsePipeline)
      .run(ZSink.fromQueueWithShutdown(queue))
    result <- ZStream.fromQueue(queue)
      .run(ZSink.sum[Int]).debug("sum")
  } yield ExitCode.success
```

and it will work _even less than expected_! We will be greeted by an exception,
because our queue will be closed before we initialize the `ZStream` of our
`result` with it! We need to think asynchronously top-to-bottom, and realize
that we need to `fork` both our `producer` _and_ `result`, and then `join` them,
so our `queue` is appropriately closed _after_ we've feed all of out data into
it, and our second stream has opened from it to process the values in it.

```scala
  val program: ZIO[Any, Throwable, ExitCode] = for {
    queue <- Queue.unbounded[Int]
    producer <- nonFailingStream.via(parsePipeline)
      .run(ZSink.fromQueueWithShutdown(queue))
      .fork
    result <- ZStream.fromQueue(queue)
      .run(ZSink.sum[Int]).debug("sum")
      .fork
    _ <- producer.join
    _ <- result.join
  } yield ExitCode.success
```

Asynchronous code can be tricky to debug, but becomes a lot easier if you
recognize the scope of context you are working in - i.e Are we processing the
content of a file, which is finite, or are we streaming generated events to a
websocket, which could be infinite.

## Example: Processing Files

Let's walk through a simple, but working example application that parses
markdown blog entries, automatically looks for tagged words, and re-generates a
file with tags automatically added, and linked to their respective page. We'll
also generate a "search" file, that is a JSON object that could be used by a
JavaScript front end to find all pages that use a particular tag.

### The Content

We'd normally read these from files, but for the purpose of this post, we'll
have the example markdown as a String containing the sample content.

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
```

We'll take note that we have `tags: []` in the post front-matter, and our
content has words prefixed with a `#` that we want to index on. We'll also make
a helper `Map` to represent how we'd call the file name to get the content
later, as if we were reading from actual files.

### Pipelines

Let's break up our concerns, and cover a first step of collecting all the tags
we'll need, and then use those results for the blog post regeneration. Finally,
we'll put everything together into an application we can run start-to-end.

#### Collecting tags

Let's outline the process of collecting our tags. The general steps we want to
take are:

1. Filter words that match our tagging pattern
2. Remove any punctuation, in case the last work in the sentence is tag - as
   well as to remove the `#`.
3. Convert our parsed tags to lowercase
4. Put them all in a `Set[String]` to avoid duplicates.

Let's also set up some helpers to looks for our `#tag`, as well as a reusable
regex to remove punctuation when we need to.

Along with our ZSink, we can make _compose_ our ZPipeline components together
with the `>>>` operator, and bundle them together as:

```scala

  val hashFilter: String => Boolean =
    str =>
      str.startsWith("#") &&
        str.count(_ == '#') == 1 &&
        str.length > 2

  val punctRegex: Regex = """\p{Punct}""".r

  val parseHash: ZPipeline[Any, Nothing, String, String] =
    ZPipeline.filter[String](hashFilter)

  val removePunctuation: ZPipeline[Any, Nothing, String, String] =
    ZPipeline.map[String, String](str => punctRegex.replaceAllIn(str, ""))

  val lowerCase: ZPipeline[Any, Nothing, String, String] =
    ZPipeline.map[String, String](_.toLowerCase)

  val collectTagPipeline: ZPipeline[Any, CharacterCodingException, Byte, String] =
    ZPipeline.utf8Decode >>>
      ZPipeline.splitLines >>> // This removes return characters, in case our tag is at the end of the line
      ZPipeline.splitOn(" ") >>> // We want to parse word-by-word
      parseHash >>>
      removePunctuation >>>
      lowerCase

  val collectTags: ZSink[Any, Nothing, String, Nothing, Set[String]] =
    ZSink.collectAllToSet[String]

```

#### Regenerating Files

Now that we have the tags for any given file, we can regenerate our blog post.
We want to

1. Automatically inject the tags into the front-matter of the content
2. Add a link to every `#tag`, which takes us to a special page on our blog that
   lists all posts with that tag (e.g. `[#TagWord](/tag/tagword)`).

```scala
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

  val addNewLine: ZPipeline[Any, Nothing, String, String] =
    ZPipeline.map[String, String](_.appended('\n'))

  val regeneratePostPipeline: Set[String] => ZPipeline[Any, CharacterCodingException, Byte, Byte] =
    ZPipeline.utf8Decode >>>
      ZPipeline.splitLines >>> // we want to operate own whole lines this time
      addTags(_) >>>
      addLink >>>
      addNewLine >>> // since we split on out new line characters, we should add one back in
      ZPipeline.utf8Encode // Back to a format to write to a file

    val writeFile: String => ZSink[Any, Throwable, Byte, Byte, Long] =
    ZSink.fromFileName(_)

```

#### Building or Program

With all of our processes defined, we can now build our program!

```scala
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

We're just running these three samples serially, but if we wanted to speed up
processing, we could do a `ZIO.foreachPar` to process files in parallel. Below
is the content of the files we generated, and note that it's additionally
formatted from the rules being applied to this post:

> hello-world.md

```md
---
title: "Hello World"
tags: [generic]
---

======

## Generic Heading

Even pretend blog posts need a [#generic](/tag/generic) intro.
```

> zio-streams.md

#####

```md
---
title: "ZIO Streams: An Introduction"
tags: [scala, zio, zstreams]
---

======

## Some Heading

This is a post about [#Scala](/tag/scala) and [#ZIO](/tag/zio)
[#ZStreams!](/tag/zstreams)
```

> scala-3-extensions.md

```md
---
title: "Scala 3 for You and Me"
tags: [scala, implicits, extensions]
---

======

## Cool Heading

This is a post about [#Scala](/tag/scala) and their re-work of
[#implicits](/tag/implicits) via thing like [#extensions.](/tag/extensions)
```

> search.json

```json
{
  "zstreams": ["zio-streams.md"],
  "implicits": ["scala-3-extensions.md"],
  "generic": ["hello-word.md"],
  "extensions": ["scala-3-extensions.md"],
  "zio": ["zio-streams.md"],
  "scala": ["scala-3-extensions.md", "zio-streams.md"]
}
```

## Wrapping up

Hopefully, after reading through this introduction, you are now more familiar
and comfortable with `ZStream`s, how we can process data via `ZPipeline`s, and
finalizing the processing of data to a `ZSink`s - as well as methods for
recovering from errors, should something go wrong during processing.

Additionally, I hope that the simple examples introducing the the prospect of
working with `ZStream`s asynchronously, as well as the start-to-finish
processing of files provides enough insight to get you started tackling your own
real-world use cases.
