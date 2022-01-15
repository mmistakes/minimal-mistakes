---
title: "FS2: More than Functional Streaming in Scala"
date: 2022-01-31
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

Nowadays, modern applications are often built on top of streaming data. Reading from a huge file and processing information, or handling continuous data coming from the network as websockets or fom a message broker, is a common use case. Streams are the way to go in such situations, and Scala provides its own implementation of streams.

However, streams in the standard library are not as powerful as they could be, and don't offer features such as concurrency, throttling, or backpressure.

Fortunately, there are libraries that offer a more powerful implementation of streams. One of these is the fs2 library, built on top of Cats and Cats-effect. Moreover, fs2 offers a completely functional approach to stream processing. So, without further ado, let's dive into the details of fs2.

## 1. Set Up

The fs2 library is available both for Scala 2 and for Scala 3. The following code will set up SBT to use the library for Scala 3.

```scala
val Fs2Version = "3.2.4"

libraryDependencies += "co.fs2" %% "fs2-core" % Fs2Version
```

As we said, the fs2 streaming library is build on top of Cats and Cats-effect. However, we don't need to specify them as direct dependencies in the sbt file, since the two libraries are already contained in fs2.

The `fs2-core` library provides the core functionality of the library. There are a lot of other plugins that add more feature. For example, the `fs2-io` library provides the IO functionality, which is needed to read from and write to file, from the network, and so on. Moreover, there a lot of projects using fs2 under the hood, such as `http4s`, `doobie`, `skunk`, just to name a few. Please, refer to the [fs2 documentation](https://fs2.io/#/ecosystem) for more information.

It's usual for us at RockTheJvm to build the examples around a concrete scenario. We can continue to refer to the _myimdb_ project that we used both in the article on [http4s](https://blog.rockthejvm.com/http4s-tutorial/), and on [doobie](https://blog.rockthejvm.com/doobie/).

So, we define the Scala class that represents an actor inside a hypotecial movie database:

```scala
object Model {
  case class Actor(id: Int, firstName: String, lastName: String)
}
```

As we adore movies based on comics, we define some actors that are famous to play the role of a hero:

```scala
object Data {
  // Justice League
  val henryCavil: Actor = Actor(0, "Henry", "Cavill")
  val galGodot: Actor = Actor(1, "Gal", "Godot")
  val ezraMiller: Actor = Actor(2, "Ezra", "Miller")
  val benFisher: Actor = Actor(3, "Ben", "Fisher")
  val rayHardy: Actor = Actor(4, "Ray", "Hardy")
  val jasonMomoa: Actor = Actor(5, "Jason", "Momoa")
  
  // Avengers
  val scarlettJohansson: Actor = Actor(6, "Scarlett", "Johansson")
  val robertDowneyJr: Actor = Actor(7, "Robert", "Downey Jr.")
  val chrisEvans: Actor = Actor(8, "Chris", "Evans")
  val markRuffalo: Actor = Actor(9, "Mark", "Ruffalo")
  val chrisHemsworth: Actor = Actor(10, "Chris", "Hemsworth")
  val jeremyRenner: Actor = Actor(11, "Jeremy", "Renner")

  val tomHolland: Actor = Actor(13, "Tom", "Holland")
  val tobeyMaguire: Actor = Actor(14, "Tobey", "Maguire")
  val andrewGarfield: Actor = Actor(15, "Andrew", "Garfield")
}
```

Finally, all the examples we are going to build will use the following imports:

```scala
import cats.effect.{ExitCode, IO, IOApp}
import fs2.{Chunk, INothing, Pipe, Pull, Pure, Stream}
```

## 2. Building a Stream

As the official page of the of fs2 stream library reports, its main feature are:
 
 - Functional
 - Effectful
 - Concurrent
 - I/O (networking, files) computations in constant memory 
 - Stateful transformations 
 - Resource safety and effect evaluation

Despite all the above features , the main type defined by the library is only one, `Stream[F, O]`. This type represents a stream that can pull values of type `O` using an effect of type `F`. The last part of this sentence will be clear in a moment.

The easiest way to create a `Stream` is to use directly its constructor. Say that we want to create a `Stream` containing the actors in the Justice League. We can do it like this:

```scala
val jlActors: Stream[Pure, Actor] = Stream(
  henryCavil,
  galGodot,
  ezraMiller,
  benFisher,
  rayHardy,
  jasonMomoa
)
```

Since we don't use any effect to compute (or pull) the elements of the stream, we can use the `Pure` effect. In other words, using the `Pure` effect means that pulling the elements from the stream cannot fail.

In a similar way, we can create pure streams using smart constructors, instead of using the `Stream` constructor. Among the others, we have `emit`and `emits`, which create a pure stream with only one element or with a sequence of elements respectively:

```scala
val tomHollandStream: Stream[Pure, Actor] = Stream.emit(tomHolland)
val spiderMen: Stream[Pure, Actor] = Stream.emits(List(
  tomHolland, 
  tobeyMaguire, 
  andrewGarfield
))
```

As no effect is used at all, it's possible to convert _pure streams_ into Scala `List` of `Vector` using the convenient methods provided by the library:

```scala
val jlActorList: List[Actor] = jlActors.toList
val jlActorVector: Vector[Actor] = jlActors.toVector
```

It's also possible to create also an infinite stream. The fs2 library provides some  convenient methods to do this:

```scala
val infiniteJlActors: Stream[Pure, Actor] = jlActors.repeat
val repeatedJLActorsList: List[Actor] = infiniteJlActors.take(12).toList
```

The `repeat` method does exactly what its name suggests, it repeats the stream infinitely. Since we cannot put an infinite stream into a list, we take the first _n_ elements of the stream and convert them into a list as we've done before.

However, the most of the time, the `Pure` effect is not sufficient to pull new elements from a stream. In detail, the operation can fail, or it must interact with some external resource or with some code performing _side effects_. In this case, we need to use some effect library, such as Cats-effect, and it's effect type called `IO[A]`.

This is the "functional" and "effectful" part of the library. As we will see in a moment, all the streams' definitions are referentially transparent and remains pure, since no side effects are performed.

Starting from the stream we already defined, we can create a new effectful stream mapping the `Pure` effect in a `IO` effect using the `covary[F]` method:

```scala
val liftedJlActors: Stream[IO, Actor] = jlActors.covary[IO]
```

The name is called `covary` because of the covariance of the `Stream` type in the `F` type parameter:

```scala
// fs2 library code
final class Stream[+F[_], +O]
```

Since the `Pure` effect is defined as an alias of the Scala bottom type `Nothing`, the `covary` method just take advantage of this fact change the effect type to `IO`:

```scala
// Covariance in F means that 
// Pure <: IO => Stream[Pure, O] <: Stream[IO, O]
```

However, in most cases, we want to create a stream directly evaluating some statement that may produce side effects. So, for example, let's try to persist an actor through a stream:

```scala
val savingTomHolland: Stream[IO, Unit] = Stream.eval {
  IO {
    println(s"Saving actor $tomHolland")
    Thread.sleep(1000)
    println("Finished")
  }
}
```

The fs2 library gives us the method `eval` that takes a `IO` effect and returns a `Stream` that will evaluate the `IO` effect when pulled. Now, a question arises: How do we pull the values from an effectful stream? We cannot convert such a stream into a Scala collection using the `toList` function, and if we try, the compiler soundly yells at us:

```shell
[error] 95 |  savingTomHolland.toList
[error]    |  ^^^^^^^^^^^^^^^^^^^^^^^
[error]    |value toList is not a member of fs2.Stream[cats.effect.IO, Unit], but could be made available as an extension method.
```

In fs2 jargon, we need to _compile_ the stream into a single instance of the effect:

```scala
val compiledStream: IO[Unit] = savingTomHolland.compile.drain
```

In this case, we also applied the `drain` method, which discards the any output of the effect. However, once compiled, we return to have many choices. For example, we can transform the compiled stream into an effect containing a `List`:

```scala
val jlActorsEffectfulList: IO[List[Actor]] = liftedJlActors.compile.toList
```

In the end, compiling a stream always produce an effect of the type declared in the `Stream` first type parameter. If we are using the `IO` effect, we can call the `unsafeRunSync` to run the effect:

```scala
import cats.effect.unsafe.implicits.global

savingTomHolland.compile.drain.unsafeRunSync()
```

Otherwise, we can run our application as a `IOApp` (preferred way):

```scala
object Fs2Tutorial extends IOApp {
  override def run(args: List[String]): IO[ExitCode] = {
    savingTomHolland.compile.drain.as(ExitCode.Success)
  }
}
```

### 2.1. Chunks

Inside, every stream is made of _chunks_. A `Chunk[O]` is a finite sequence of stream elements of type `O` stored inside a structure that is optimized for indexed based lookup of elements. We can create a stream directly through the `Stream.chunk` method, which accepts a sequence of `Chunk`:

```scala
val avengersActors: Stream[Pure, Actor] = Stream.chunk(Chunk.array(Array(
  scarlettJohansson,
  robertDowneyJr,
  chrisEvans,
  markRuffalo,
  chrisHemsworth,
  jeremyRenner
)))
```

The fs2 library defines a lot of smart constructors for the `Chunk` type, letting us create a `Chunk` from an `Option`, a `Seq`, a `Queue`, and so on.

Most of the functions defined on streams are `Chunk`-aware, which means that we don't have to worry about chunks while we are working with them.

## 3. Transforming a Stream

Once we've built a Stream, we can transform its values more or less as we make to regular Scala collections. For example, let's create a stream containing all the actors which hero belongs from the Justice League or the Avengers. We can use the `++` operator, which concatenates two streams:

```scala
val dcAndMarvelSuperheroes: Stream[Pure, Actor] = jlActors ++ avengersActors
```

So, the `dcAndMarvelSuperheroes` stream will emit all the actors from the Justice League and then the Avengers.

The `Stream` type forms a monad on the `O` type parameter. This means that a `flatMap` method is available on streams, and we can use it to concatenate operations concerning the output values of the stream.

For example, a typical pattern to print to the console the elements of a stream is through the use of the `flatMap` method:

```scala
val printedJlActors: Stream[IO, Unit] = jlActors.flatMap { actor =>
  Stream.eval(IO.println(actor))
}
```

The pattern of calling the function `Stream.eval` inside a `flatMap` is so common that fs2 provides a shortcut for it through the `evalMap` method:

```scala
jlActors.evalMap(IO.println)
```

TODO Say that are all constant in time





 
