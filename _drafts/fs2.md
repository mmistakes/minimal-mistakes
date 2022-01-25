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

It's not mandatory to use the `IO` effect. We can use any other effect library that supports type classes defined in the `cats-effect` library. As an example,

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
val evalMappedJlActors: Stream[IO, Unit] = jlActors.evalMap(IO.println)
```

In the case we need to perform some effects on the stream, but we don't want to change the type of the stream, we can use the `evalTap` method:

```scala
val evalTappedJlActors: Stream[IO, Actor] = jlActors.evalTap(IO.println)
```

As we can notice, the difference between the last to statement is that the first mapped the stream to a `Unit` and the second didn't perform any mapping at all.

An important feature of fs2 streams is that the functions defined on them takes constant time, regardless the structure of the stream itself. So, concatenating two streams is a constant time operation, whether the streams contain a bunch of elements or if they are infinite. As we will see in the rest of the article this feature concerns the internal representation of a stream, which is implemented as a _pull-based_ structure.

Since the functions defined on streams are a lot, we will make only few examples. Say that we want to group the Avengers by the name of the actor playing them. We can do it using the `fold` method:

```scala
val avengersActorsByFirstName: Stream[Pure, Map[String, List[Actor]]] = avengersActors.fold(Map.empty[String, List[Actor]]) { (map, actor) =>
  map + (actor.firstName -> (actor :: map.getOrElse(actor.firstName, Nil)))
}
```

As we can see, the `fold` method works exactly as its Scala counterpart.

Many other streaming libraries defines streams and transformation on them in terms of _sources_, _pipes_, and _sinks_. The elements of a stream are generated by a source, then transformed through a sequence of stages or pipes, and finally consumed by a sink. For example, the Akka Stream library has specific types modelling these concepts.

In fs2, the only available type modelling the above streaming concepts is `Pipe[F[_], -I, +O]`. To be frank, `Pipe`s are only a type alias for the function `Stream[F, I] => Stream[F, O]`. So, a `Pipe[F[_], I, O]` represents nothing more that a function between two streams, the first emitting elements of type `I`, and the second emitting elements of type `O`.

Using pipes we can make look fs2 streams definition like the definitions of streams in other libraries, representing transformations on streams as a sequence of stages. The `through` method applies a pipe to a stream. Its internal implementation is really straightforward, since it applies the function defined by the pipe to the stream:

```scala
// fs2 library code
def through[F2[x] >: F[x], O2](f: Stream[F, O] => Stream[F2, O2]): Stream[F2, O2] = f(this)
```

For example, lets transform the `jlActors` streams into a stream containing only the first names of the actors, and finally print them to the console:

```scala
val fromActorToStringPipe: Pipe[IO, Actor, String] = in =>
  in.map(actor => s"${actor.firstName} ${actor.lastName}")

def toConsole[T]: Pipe[IO, T, Unit] = in =>
  in.evalMap(str => IO.println(str))

val stringNamesOfJlActors: Stream[IO, Unit] =
  jlActors.through(fromActorToStringPipe).through(toConsole)
```

We have the the `jlActors` stream represents the _source_, whereas the `fromActorToStringPipe` represents a pipe, and the `toConsole` represents the _sink_. We can conclude that a pipe is pretty much a map/flatMap type functional operation but the pipe concept fits nicely into the mental model of a Stream.

## 4. Error Handling in Streams

What if pulling a value from a stream fails raising an exception? For example, let's introduce a repository persisting an `Actor`:

```scala
object ActorRepository {
  def save(actor: Actor): IO[Int] = IO {
    println(s"Saving actor: $actor")
    if (Random.nextInt() % 2 == 0) {
      throw new RuntimeException("Something went wrong during the communication with the persistence layer")
    }
    println(s"Saved.")
    actor.id
  }
}
```

To simulate a random error during the communication with the persistent layer, the `save` method throws an exception when a random generated number is even. Then, we can use the above repository to persist a stream of actors:

```scala
val savedJlActors: Stream[IO, Int] = jlActors.evalMap(ActorRepository.save)
```

If we run the above stream, it's very likely that we will see the following output:

```
Saving actor: Actor(0,Henry,Cavill)
java.lang.RuntimeException: Something went wrong during the communication with the persistence layer
```

As we can see, the stream is interrupted by the exception. In the above execution it doesn't persist even the first actor. So, every time an exception occurs during pulling elements from a stream, the stream execution ends.

However, fs2 gives us many choices to handle the error. First, we can handle an error returning a new stream using the `handleErrorWith` method:

```scala
val errorHandledSavedJlActors: Stream[IO, AnyVal] =
  savedJlActors.handleErrorWith(error => Stream.eval(IO.println(s"Error: $error")))
```

In above example, we react to an error by returning a stream that prints the error to the console. As we can notice, the type of the elements contained in the stream is `AnyVal`, and not `Unit`. This is because of the definition of the `handleErrorWith`:

```scala
// fs2 library code
def handleErrorWith[F2[x] >: F[x], O2 >: O](h: Throwable => Stream[F2, O2]): Stream[F2, O2] = ???
```

In fact, the `O2` type must be a super type of the original type `O`. Since both `Int` and `Unit` are subtypes of `AnyVal`, we can use the `AnyVal` type (the least common super type) to represent the resulting stream. 

Another useful available method to handle error in streams is `attempt`. The method works using the `scala.Either` type, and it returns a stream of `Either` elements. The resulting stream pulls elements wrapped in a `Right` instance, until the first error occurs, which is nothing more than an instance of a `Throwable` wrapped in a `Left`:

```scala
val attemptedSavedJlActors: Stream[IO, Either[Throwable, Int]] = savedJlActors.attempt
attemptedSavedJlActors.evalMap {
  case Left(error) => IO.println(s"Error: $error")
  case Right(id) => IO.println(s"Saved actor with id: $id")
}
```

For sake of completeness, let's say that the `attempt` method is implemented internally using the `handleErrorWith` in the most straightforward way:

```scala
// fs2 library code
def attempt: Stream[F, Either[Throwable, O]] =
  map(Right(_): Either[Throwable, O]).handleErrorWith(e => Stream.emit(Left(e)))
```

## 5. Resource Management

As the official documentation says, we don't have to use the `handleErrorWith` method to eventually manage the release of resources used by the stream. Instead, the fs2 library implements the _bracket_ pattern to manage resources.

The bracket pattern is a resource management pattern developed in functional programming domain many years ago. The pattern defines two functions: the first is used to acquire a resource, and the second is guaranteed to be called when the resource is no longer needed, also in case of error during its usage.

The fs2 library implements the bracket pattern through the `bracket` method:

```scala
// fs2 library code
def bracket[F[x] >: Pure[x], R](acquire: F[R])(release: R => F[Unit]): Stream[F, R] = ???
```

The function `acquire` is used to acquire a resource, and the function `release` is used to release the resource. The resulting stream is a stream of elements of type `R`, and it is guaranteed that the resource is released when the stream is terminated, both in case of success and in case of error. Notice that both the `acquire` and `release` functions returns an effect, since they can throw exceptions during the acquisition or release of resources.

Let's make an example. We want to use a resource during the persistence of the stream containing the actors of the JLA. First, we define a value class representing a connection to a database:

```scala
case class DatabaseConnection(connection: String) extends AnyVal
```

We will use the `DatabaseConnection` as the resource that we want to acquire and release through the bracket pattern. Then, the acquiring and releasing function:

```scala
val acquire = IO {
  val conn = DatabaseConnection("jlaConnection")
  println(s"Acquiring connection to the database: $conn")
  conn
}
val release = (conn: DatabaseConnection) => 
  IO.println(s"Releasing connection to the database: $conn")
```

Finally, we use them to call the `bracket` method, and then save the actors in the stream:

```scala
val managedJlActors: Stream[IO, Int] = 
  Stream.bracket(acquire)(release).flatMap(conn => savedJlActors)
```

Since the `savedJlActors` we defined some time ago throws an exception when the stream is evaluated, the `managedJlActors` stream will be terminated with an error. The `release` function is called, and the `conn` value is released. The execution output of the `managedJlActors` stream should be something similar to the following:

```
Acquiring connection to the database: DatabaseConnection(jlaConnection)
Saving actor: Actor(0,Henry,Cavill)
Releasing connection to the database: DatabaseConnection(jlaConnection)
java.lang.RuntimeException: Something went wrong during the communication with the persistence layer
```

As we can see, the resource we created was released, even if the stream was terminated with an error. That's awesome!

## 6. The `Pull` Type

As we said more than once, the fs2 defines streams as a _pull_ type, which means that the next element of the stream is effectively computed by the stream just in time.

To honor this kind of behavior, under the hood, the library implements the functions of the `Stream` type using the `Pull` type. This type, which is available also as a public API, lets us implementing stream modelling them as the pull model we've just described.

The `Pull[F[_], O, R]` type represents a program that can pull output values of type `O`, while computing a result of type `R`, while using amn effect of type `F`. As we can see, the type introduces the new type variable `R` that is not available in the `Stream` type.

Basically, the result of type `R` of a `Pull` represents the information available after the emission of the element of type `O` that should be used to emit the next value of a stream. For this reason, using `Pull` directly means to develop recursive programs. Ok, one step at time. Let's analyze the `Pull` type and its methods first.

Think to the `Pull` type as a way to represent a stream as a _head_ and a _tail_, much like we can represent a list. The element of type `O` emitted by the `Pull` represents the head. However, since a stream is a possible infinite data structure, we cannot represent it with a finite one. So, we return a type `R`, that is all the information that we need to compute the tail of the stream.

Without further ado, let's look at the methods of the `Pull` type. The first method we encounter is the smart constructor `output1`, which creates a `Pull` that emits a single value of type `O` and then completes.

```scala
val tomHollandActorPull: Pull[Pure, Actor, Unit] = Pull.output1(tomHolland)
```

We can convert a `Pull` having the `R` type variable bound to `Unit` directly to a `Stream` by using the `stream` method:

```scala
val tomHollandActorStream: Stream[Pure, Actor] = tomHollandActorPull.stream
```

In fact, revamping the analogy with the finite collection, a `Pull` that returns `Unit` is like a `List` with a head and empty tail.

Unlike the `Stream` type, which defines a monad instance on the type variable `O`, a `Pull` forms a monad instance on the type variable `R`. If we think, it's logical: All we want is to concatenate the information that allow us to compute the tail of the stream. So, if we want to create a sequence of `Pull` containing all the actors that play Spider Man, we can do the following:

```scala
val spiderMenActorPull: Pull[Pure, Actor, Unit] = 
  tomHollandActorPull >> Pull.output1(tobeyMaguire) >> Pull.output1(andrewGarfield)
```

Conversely, we can convert a `Stream` into a `Pull` using the `echo` method:

```scala
val avengersActorsPull: Pull[Pure, Actor, Unit] = avengersActors.pull.echo
```

In the above example, the first invoked function is `pull`, which returns a `ToPull[F, O]` type. This last type is a wrapper around the `Stream` type, which aim is to group all functions concerning the conversion into a `Pull` instance:

```scala
// fs2 library code
final class ToPull[F[_], O] private[Stream] (
  private val self: Stream[F, O]) extends AnyVal
```

Then, the `echo` function makes the conversion. It's interesting to look at the implementation of the `echo` method, since it make no conversion at all:

```scala
// fs2 library code
def echo: Pull[F, O, Unit] = self.underlying
```

In fact, the `echo` mode just returns the internal representation of the `Stream`, called `underlying`, since a stream is represents as a pull internally:

```scala
// fs2 library code
final class Stream[+F[_], +O] private[fs2] (private[fs2] val underlying: Pull[F, O, Unit])
```

Another way to convert a `Stream` into a `Pull` is to use the `uncons` function, that returns a `Pull` pulling a tuple containing the head chunk of the stream and its tail. For example, we can call `uncons` the `avengersActors` stream:

```scala
val unconsAvengersActors: Pull[Pure, INothing, Option[(Chunk[Actor], Stream[Pure, Actor])]] =  
  avengersActors.pull.uncons
```

Wow! It's a very intricate type. Let's describe it step by step. First, since the original stream uses the `Pure` effect, also the resulting `Pull` uses the same effect. Then, since the `Pull` deconstructs the original stream, it cannot emit any value, and so the output type is `INothing` (a type alias for scala `Nothing`). It follows the value returned by the `Pull`, i.e. the deconstruction of the original `Stream`.

The returned value is an `Option` because the `Stream` may be empty: If there is no more value in the original `Stream`, then we will have a `None`. Otherwise, we will have the head of the stream as a `Chunk`, and a `Stream` representing the tail of the original stream.

There is also a variant of the original `uncons` method returning not the first `Chunk` of the stream, but the first element of stream. It's called `uncons1`:

```scala
val uncons1AvengersActors: Pull[Pure, INothing, Option[(Actor, Stream[Pure, Actor])]] = 
  avengersActors.pull.uncons1
```

With these bullet in our gun, it's time to write down some functions that uses the `Pull` type. As we said, due to the structure of the type, the functions implemented using the `Pull` type are often recursive.

For example, without using the `Stream.filter` method, we can write a pipe filtering from a stream of actors all them with a given first name:

```scala
def takeByName(name: String): Pipe[IO, Actor, Actor] =
  def go(s: Stream[IO, Actor], name: String): Pull[IO, Actor, Unit] =
    s.pull.uncons1.flatMap {
      case Some((hd, tl)) =>
        if (hd.firstName == name) Pull.output1(hd) >> go(tl, name)
        else go(tl, name)
      case None => Pull.done
    }
  in => go(in, name).stream
```

First, we need to accumulate the actors in the stream that fulfill the filtering condition. So, we apply a typical pattern of functional programming, and we define an inner function that we use to recur. Let's call this function `go`.

Then, we deconstruct the stream using `uncons1` to retrieve its first element. Since the `Pull` type forms a monad on the `R` type, we can use the `flatMap` method to recur:

```scala
s.pull.uncons1.flatMap {
```

If we have a `None` value, then we're done, and terminate the recursion using the `Pull.done` method, returning a `Pull[Pure, INothing, Unit]` instance:

```scala
case None => Pull.done
```

Otherwise, we pattern match the `Some` value:

```scala
case Some((hd, tl)) =>
```

If the first name of the actor representing the head of the stream has the given first name, we output the actor and recur with the tail of the stream. Otherwise, we recur with the tail of the stream:

```scala
if (hd.firstName == name) Pull.output1(hd) >> go(tl, name)
else go(tl, name)
```

Finally, we define the whole `Pipe` calling the `go` function properly, and use the `stream` method to convert the `Pull` instance into a `Stream` instance:

```scala
in => go(in, name).stream
```

Now, we can use the pipe we just defined to filter the avengers stream, getting only the actors with the "Chris" as first name:

```scala
val avengersActorsCalledChris: Stream[IO, Unit] = 
  avengersActors.through(takeByName("Chris")).through(toConsole)
```

## 7. Using Concurrency in Streams

One of the most used fs2 features is the ability to use concurrency in streams. In fact, it's possible to implement many of the concurrency patterns using the primitives provided by the `Stream` type.

The first function we will analyze is `merge`, which lets us running two streams concurrently, collecting the results in a single stream as they are produced. The execution halts when both streams have halted. For example, we can merge JLA and Avengers concurrently, adding some sleep to the execution of each stream:

```scala
val concurrentJlActors: Stream[IO, Actor] = liftedJlActors.evalMap(actor => IO {
  Thread.sleep(400)
  actor
})

val liftedAvengersActors: Stream[IO, Actor] = avengersActors.covary[IO]
val concurrentAvengersActors: Stream[IO, Actor] = liftedAvengersActors.evalMap(actor => IO {
  Thread.sleep(200)
  actor
})

val mergedHeroesActors: Stream[IO, Unit] =
  concurrentJlActors.merge(concurrentAvengersActors).through(toConsole)
```

The output to the console of the above program is something similar to the following:

```
Actor(7,Scarlett,Johansson)
Actor(0,Henry,Cavill)
Actor(8,Robert,Downey Jr.)
Actor(9,Chris,Evans)
Actor(1,Gal,Godot)
Actor(10,Mark,Ruffalo)
Actor(11,Chris,Hemsworth)
Actor(2,Ezra,Miller)
Actor(12,Jeremy,Renner)
Actor(3,Ben,Fisher)
Actor(4,Ray,Hardy)
Actor(5,Jason,Momoa)
``` 

As we may expect, the stream contains an actor of the JLA more or less every two actors of the Avengers. Once the Avengers actors are finished, the JLA actors fulfill the rest of the stream.

If we don't care about the results of the second stream running concurrently, we can use the  `concurrently` method instead. A common use case for this method is the implementation of a producer-consumer pattern. For example, we can implement program with a producer that uses a `cats.effect.std.Queue` to share JLA actors with a consumer, which simply prints them to the console:

```scala
val queue: IO[Queue[IO, Actor]] = Queue.bounded[IO, Actor](10)

val concurrentlyStreams: Stream[IO, Unit] = Stream.eval(queue).flatMap { q =>
  val producer: Stream[IO, Unit] =
    liftedJlActors
      .evalTap(actor => IO.println(s"[${Thread.currentThread().getName}] produced $actor"))
      .evalMap(q.offer)
      .metered(1.second)
  val consumer: Stream[IO, Unit] =
    Stream.fromQueueUnterminated(q)
      .evalMap(actor => IO.println(s"[${Thread.currentThread().getName}] consumed $actor"))
  producer.concurrently(consumer)
}
```

The first line declares a `Queue` of `Actor`s of size 10. Then, we use streams to transform the effect containing the queue. In detail, we declared a `producer` stream, which scans the JLA actors and adds them to the queue. To understand what's going on, we also add a print statement to the console, which shows the thread name and the actor that was produced:

```scala
val producer: Stream[IO, Unit] =
  liftedJlActors
    .evalTap(actor => IO.println(s"[${Thread.currentThread().getName}] produced 
    .evalMap(q.offer)
    .metered(1.second)
```

The `metered` method allows to wait a given time between two consecutive pulls. We decide to wait 1 second.

Then, we declare a `consumer` stream, which pulls an actor from the queue and prints it to the console with the thread name:

```scala
val consumer: Stream[IO, Unit] =
  Stream.fromQueueUnterminated(q)
    .evalMap(actor => IO.println(s"[${Thread.currentThread().getName}] consumed $actor"))
```

Finally, we run both the producer and the consumer concurrently:

```scala
producer.concurrently(consumer)
```

Running the above program produces an output similar to the following:

```
[io-compute-2] produced Actor(0,Henry,Cavill)
[io-compute-3] consumed Actor(0,Henry,Cavill)
[io-compute-2] produced Actor(1,Gal,Godot)
[io-compute-0] consumed Actor(1,Gal,Godot)
[io-compute-0] produced Actor(2,Ezra,Miller)
[io-compute-3] consumed Actor(2,Ezra,Miller)
[io-compute-1] produced Actor(3,Ben,Fisher)
[io-compute-3] consumed Actor(3,Ben,Fisher)
[io-compute-1] produced Actor(4,Ray,Hardy)
[io-compute-0] consumed Actor(4,Ray,Hardy)
[io-compute-1] produced Actor(5,Jason,Momoa)
[io-compute-2] consumed Actor(5,Jason,Momoa)
```

As we can see, the producer and consumer are indeed running concurrently.

One important feature of the running two streams through the `concurrently` method is that the second stream halts when the first stream is finished.

Moreover, using streams we can also run concurrently a set of streams, deciding the degree of concurrency _a priori_. The method `parJoin` does exactly this. Contrary to the `concurrently` method, the results of the streams are merged in a single stream, and no assumption is made on streams' termination.

We can try to print the actors playing superheroes of the JLA, the Avengers and Spider-Man concurrently. First, we define a `Pipe` printing the thread name and the actor being processed:

```scala
val toConsoleWithThread: Pipe[IO, Actor, Unit] = in =>
  in.evalMap(actor => IO.println(s"[${Thread.currentThread().getName}] consumed $actor"))
```

Then, we can define the stream using the `parJoin` method:

```scala
val parJoinedActors: Stream[IO, Unit] =
  Stream(
    jlActors.through(toConsoleWithThread),
    avengersActors.through(toConsoleWithThread),
    spiderMen.through(toConsoleWithThread)
  ).parJoin(4)
```

The method is available only on streams of type `Stream[F, Stream[F, O]]`. In fact, it's not part directly of the `Stream` API, but it's added by an implicit conversion as an _extension method_:

```scala
// fs2 library code
implicit final class NestedStreamOps[F[_], O](private val outer: Stream[F, Stream[F, O]])
      extends AnyVal {
  def parJoin(maxOpen: Int)(implicit F: Concurrent[F]): Stream[F, O] = ???  
}
```

Each stream is traversed concurrently, and the maximum degree of concurrency is given in input as the parameter `maxOpen`. As we can see, the effect used to handle concurrency must satisfy the `Concurrent` bound, which is required anywhere concurrency is used in the library. 

In our example, we want 4 thread to pull concurrently values from the 3 stream. In fact, running the program produces an output similar to the following:

```
[io-compute-3] consumed Actor(7,Scarlett,Johansson)
[io-compute-1] consumed Actor(0,Henry,Cavill)
[io-compute-0] consumed Actor(13,Tom,Holland)
[io-compute-2] consumed Actor(8,Robert,Downey Jr.)
[io-compute-1] consumed Actor(1,Gal,Godot)
[io-compute-2] consumed Actor(9,Chris,Evans)
[io-compute-1] consumed Actor(14,Tobey,Maguire)
[io-compute-1] consumed Actor(10,Mark,Ruffalo)
[io-compute-2] consumed Actor(2,Ezra,Miller)
[io-compute-2] consumed Actor(15,Andrew,Garfield)
[io-compute-0] consumed Actor(3,Ben,Fisher)
[io-compute-1] consumed Actor(11,Chris,Hemsworth)
[io-compute-3] consumed Actor(12,Jeremy,Renner)
[io-compute-0] consumed Actor(4,Ray,Hardy)
[io-compute-2] consumed Actor(5,Jason,Momoa)
```

As we can see, the thread used by the runtime are exactly 4.

There are many other method available in the fs2 library concerning concurrency, such as `either`, `mergeHaltBoth`. Please, refer to the [documentation](https://oss.sonatype.org/service/local/repositories/releases/archive/co/fs2/fs2-core_2.13/3.2.0/fs2-core_2.13-3.2.0-javadoc.jar/!/fs2/index.html) for more details.

## 8. Conclusions

Our long journey through the main features of the fs2 library comes to an end. During the path, we introduced the concepts of `Stream` and how to declare them, both using pure values and in an effectful way. We analyzed streams internals, such as `Chunk`s and `Pull`s. We saw how to handle errors, and how a stream can safely acquire and release a resource. Finally, we focused on concurrency, and how streams can use to deal with concurrent programming. 

However, fs2 is more than this. We didn't speak about how to interact with the external world, for example reading and writing files. We didn't see ho to interrupt the execution of a stream. Moreover, we didn't cite any of the many libraries that decided to build on top of fs2, such as `doobie`, `http4s`, just to cite some. However, the [documentation](https://fs2.io/#/) of fs2 is very comprehensive, and we can refer to it for more details.


