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
}
```

Finally, all the examples we are going to build will use the following imports:

```scala
import cats.effect.{ExitCode, IO, IOApp}
import fs2.{Chunk, INothing, Pipe, Pull, Pure, Stream}
```




 
