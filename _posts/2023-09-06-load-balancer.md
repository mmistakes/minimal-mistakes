---
title: "Functional Load Balancer"
date: 2023-09-06
header:
    image: "/images/blog cover.jpg"
tags: [scala,http4s,cats,fp]
excerpt: "Building an application load balancer with the help of Scala & cats, featuring efficiency and concurrency "
---

_by [Anzori (Nika) Ghurtchumelia](https://github.com/ghurtchu)_

## 1. Introduction

"What I cannot build, I do not understand"

~ Richard Feynman

In this article we will make use of `cats.effect.Ref`, `cats.effect.IO` and `http4s` to build an application layer load balancer.

A load balancer usually sits in front of a few servers and forwards the HTTP requests to them based on some algorithm. The goal of a load balancer is
to "balance the load" by distributing it to the available backends.

There are different algorithms that can be used to achieve this goal, in this case we're going to be using Round Robin algorithm.

Our load balancer must:
- be effective in distributing requests to the backends (Round Robin Algorithm)
- make sure that requests are forwarded only to the available backends (Reliability)
- manage the state safely while the backends die and come back online (Periodic health checks)

In practice, every non-trivial application should have:
- `domain` - data models which describe the domain
- `services` - bundle of logic which uses `domain` and other `services` to achieve something

Let's start with Domain Modeling.

## 2. Project Structure

We will use Scala 3.3.0, SBT 1.9.4 and several monumental libraries to complete our project. 

The initial project skeleton: 
- `src/main/scala` groups production code 
- `src/main/test` groups tests
- `src/main/resources/application.conf` defines the project configuration
- `.scalafmt.conf` is used to format the code
- `build.sbt` is responsible for building the project and generating `lb.jar` which we can run with `java` or `scala`
![alt "Project skeleton"](../images/load-balancer-project-skeleton.png)

Let's have a look at the libraries listed in `build.sbt`:
- first three dependencies which start with `org.http4s` are concerned with the HTTP server & client and handy dsl for creating `HttpRoutes`
- `munit`and `munit-cats-effect-3` are libraries which will help us in testing both, synchronous and effectful (IO-based) code
- last two libraries will be used for logging and loading project configuration respectively

```scala
val Http4sVersion          = "0.23.23"
val CirceVersion           = "0.14.5"
val MunitVersion           = "0.7.29"
val LogbackVersion         = "1.4.11"
val MunitCatsEffectVersion = "1.0.7"

lazy val root = (project in file("."))
  .settings(
    organization                     := "com.rockthejvm",
    name                             := "loadbalancer",
    scalaVersion                     := "3.3.0",
    libraryDependencies ++= Seq(
      "org.http4s"            %% "http4s-ember-server" % Http4sVersion,
      "org.http4s"            %% "http4s-ember-client" % Http4sVersion,
      "org.http4s"            %% "http4s-dsl"          % Http4sVersion,
      "org.scalameta"         %% "munit"               % MunitVersion           % Test,
      "org.typelevel"         %% "munit-cats-effect-3" % MunitCatsEffectVersion % Test,
      "ch.qos.logback"         % "logback-classic"     % LogbackVersion         % Runtime,
      "com.github.pureconfig" %% "pureconfig-core"     % "0.17.4",
    ),
    assembly / assemblyMergeStrategy := {
      case "module-info.class" => MergeStrategy.discard
      case x                   => (assembly / assemblyMergeStrategy).value.apply(x)
    },
    assembly / mainClass             := Some("Main"),
    assembly / assemblyJarName       := "lb.jar",
  )
```

Every non-trivial project must include at least two packages:
- `domain` - which describes the business entities of the application
- `services` - isolated piece of logics which use `domain` and other `services` to achieve some goals

In our case we will also have additional two packages:
- `errors` - for enumerating the error values
- `http` - for grouping `HttpClient`, `HttpServer`, `HttpServerStatus` and related entities

With that we can move on and start defining data models.

## 3. Domain Modeling
The domain of load balancer is really simple. Let's unfold it step by step. 

In a load balancer, you often need to handle requests and route them to different backend servers based on the URL or other request attributes. The `Url` case class which we'll write provides a convenient way to represent and manipulate URLs in a strongly-typed manner, making it easier to work with URL-related logic in the load balancer. Using a dedicated `Url` type makes the code more self-explanatory and easier to understand for other developers working on the project. It provides a clear and meaningful abstraction for URLs.

So, let's define it in the `domain` package, extend `AnyVal` for the compiler to optimize boxing where it's possible (we could have used Scala 3 `opaque type` but it doesn't work well with `pureconfig` unfortunately) and override its `toString` method for logging purposes:

```scala
package com.rockthejvm.loadbalancer.domain

final case class Url(value: String) extends AnyVal:
  override def toString: String = value
```

In a load balancer, we typically need to manage a collection of backend server URLs to distribute incoming requests. The `Urls` case class which we will define in `domain` module provides a structured and type-safe way to store and manipulate these URLs as a collection:

```scala
package com.rockthejvm.loadbalancer.domain

import scala.util.Try

final case class Urls(values: Vector[Url]):

  def next: Urls =
    Try(copy(values.tail :+ values.head))
      .getOrElse(Urls.empty)

  def currentOpt: Option[Url] =
    Try(currentUnsafe).toOption

  def currentUnsafe: Url =
    values.head

  def remove(url: Url): Urls =
    copy(values.filter(_ != url))

  def add(url: Url): Urls =
    if (values contains url) this
    else copy(values :+ url)

object Urls:

  def empty: Urls = Urls(Vector.empty)
```

It is worth to mention that The `next` method implements a round-robin algorithm for cycling through the backend server URLs. This is a common load balancing strategy where each request is routed to the next server in the list. The next method ensures that requests are evenly distributed among the available servers, which is a fundamental aspect of load balancing.

The `add` and `remove` methods allow you to dynamically manage the list of backend servers. This is valuable because in a real-world scenario, backend servers may come online or go offline, and the load balancer needs to adapt accordingly. These methods ensure that you don't have duplicate URLs in the list, which could lead to uneven load distribution.

`currentUnsafe` and `currentOpt` methods are pretty much self-explanatory.

As a next step we can write some unit tests to make sure that `Urls` API is sound. Such unit tests help ensure the correctness of the `Urls` class's functionality and behavior in various scenarios. They are essential for catching bugs or regressions when making changes to the `Urls` class. 

So, let's introduce `munit` library and create `UrlsTest.scala`:

```scala
package com.ghurtchu.loadbalancer.domain

import com.ghurtchu.loadbalancer.domain.Urls._
import munit.FunSuite

class UrlsTest extends FunSuite {

  private def sequentialUrls(from: Int, to: Int): Urls = Urls {
    (from to to)
      .map(i => Url(s"url$i"))
      .toVector
  }

  test("next [success]") {
    val urls     = sequentialUrls(1, 5)
    val obtained = urls.next
    val expected = Urls(sequentialUrls(2, 5).values :+ "url1")

    assertEquals(obtained, expected)
  }

  test("next [1 value]") {
    val urls     = Urls(Vector("url1"))
    val obtained = urls.next
    println(obtained)
    val expected = urls

    assertEquals(obtained, expected)
  }

  test("currentOpt [success]") {
    val urls     = sequentialUrls(1, 5)
    val obtained = urls.currentOpt.map(_.value)
    val expected = Some("url1")

    assertEquals(obtained, expected)
  }

  test("currentOpt [failure]") {
    val urls     = Urls.empty
    val obtained = urls.currentOpt.map(_.value)
    val expected = None

    assertEquals(obtained, expected)
  }

  test("currentUnsafe [success]") {
    val urls     = sequentialUrls(1, 5)
    val obtained = urls.currentUnsafe.value
    val expected = "url1"

    assertEquals(obtained, expected)
  }

  test("currentUnsafe [failure]") {
    intercept[NoSuchElementException] {
      Urls.empty.currentUnsafe
    }
  }

  test("remove") {
    val urls     = sequentialUrls(1, 5)
    val obtained = urls.remove("url1")
    val expected = sequentialUrls(2, 5)

    assertEquals(obtained, expected)
  }

  test("add") {
    val urls     = sequentialUrls(2, 5)
    val obtained = urls.add("url1")
    val expected = Urls(urls.values :+ "url1")

    assertEquals(obtained, expected)
  }
}
```

Later we will need to define the model for working with configuration - a case class `Config`, but it will require to have a model for describing the health check intervals in a type safe manner:
```scala
package com.rockthejvm.loadbalancer.domain

final case class HealthCheckInterval(value: Long) extends AnyVal
```

`HealthCheckInterval` will indicate the delay between checking server healths in a Round Robin fashion.

What's next? How about making load balancer configurable? This way it will be more flexible and easy to tweak.

By default, the configuration file locations is: `src/main/resources/application.conf` and it follows `HOCON` format.

You may have different ideas as to what to configure, but I believe there are four must have things:
- `port` - load balancer port
- `host` - load balancer host (port + host = url)
- `backends` - this setting is crucial for a load balancer as it defines the pool of backend servers that the load balancer will distribute incoming requests to, so a collection of backend url-s
- `health-check-interval` - this setting specifies the frequency at which the load balancer should conduct health checks on the backend servers. (`HealthCheckInterval` which we defined above)

So, the actual `application.conf` may look like:

```conf
port="8080",
host="localhost",
backends=[
 "http://localhost:8081",
 "http://localhost:8082",
 "http://localhost:8083"
], 
health-check-interval="1"
```

In summary, this configuration is important when implementing a load balancer because it determines how incoming client requests are received, which backend servers they are forwarded to, and how the health and availability of these servers are monitored. Proper configuration and management of these settings are crucial for ensuring that the load balancer operates effectively, efficiently balances the load, and provides high availability for the application or service it serves.

Now we can create the `Config` model for capturing the aforementioned idea:

```scala
package com.rockthejvm.loadbalancer.domain

import com.rockthejvm.loadbalancer.domain.Url
import pureconfig.ConfigReader
import pureconfig._
import pureconfig.generic.derivation.default._

import scala.util.Try

import Config._

final case class Config(
    port: Int,
    host: String,
    backends: Urls,
    healthCheckInterval: HealthCheckInterval,
) derives ConfigReader

object Config:
  given urlsReader: ConfigReader[Urls] = ConfigReader[Vector[Url]].map(Urls.apply)

  given urlReader: ConfigReader[Url] = ConfigReader[String].map(Url.apply)

  given healthCheckReader: ConfigReader[HealthCheckInterval] =
  ConfigReader[Long].map(HealthCheckInterval.apply)
```

Let's explain what these `givens` do in the companion object of `Config`:

First ofa ll the `derives ConfigReader` annotation instructs `PureConfig` to automatically derive a configuration reader for this case class, allowing it to be used to parse configuration files into `Config` instances.

`given urlsReader: ConfigReader[Urls]:` This custom reader is defined for the `Urls` type and instructs `PureConfig` to read a configuration value of type `Vector[Url]` and map it to an `Urls` instance using the `Urls.apply` constructor.

`given urlReader: ConfigReader[Url]:` This custom reader is defined for the Url type and instructs `PureConfig` to read a configuration value of type `String` and map it to a `Url` instance using the `Url.apply` constructor.

`given healthCheckReader: ConfigReader[HealthCheckInterval]:` This custom reader is defined for the `HealthCheckInterval` type and instructs `PureConfig` to read a configuration value of type `Long` and map it to a `HealthCheckInterval` instance using the `HealthCheckInterval.apply` constructor.

Splendid!

Ok, what about the fact that our load balancer should incorporate concurrency and thread-safety?

It is apparent that the load balancer will have to handle concurrent requests from different clients which can be issued even the same time! So we need to make sure that the state updates for 
`Urls` are atomic.

For that we can make use of `cats.effect.Ref`, however we need to distinguish between two completely separate problems:
- forwarding requests to the backends and returning the response to the clients (main feature)
- checking the health of the backends (secondary feature)

So, clearly we see that we need to have two separate instances which wrap `cats.effect.Ref`. Let's name them as `Backends` and `HealthChecks`:

```scala
package com.rockthejvm.loadbalancer.domain

import cats.effect.{IO, Ref}

enum UrlsRef(val urls: Ref[IO, Urls]):
  case Backends(override val urls: Ref[IO, Urls])     extends UrlsRef(urls)
  case HealthChecks(override val urls: Ref[IO, Urls]) extends UrlsRef(urls)
```

In this code, the `UrlsRef` enumeration is used to represent different types of references (possibly mutable state) related to URL management in a load balancer or a similar application. The use of `Ref[IO, Urls]` suggests that these references are handled within the Cats Effect's IO monad, which is used for handling effectful operations in a purely functional manner.

The actual usage and behavior of these references would depend on the rest of the codebase where this enumeration is used. They might be used for managing, updating, or querying the URLs or health checks in a load balancer system in a thread-safe and functional way.

With this we have finished modeling the domain and tested it. Now we can move on to the more interesting part - defining services.

## 3. Services

There are a handful of services which we can be useful to abstract over to make them reusable, isolated and testable:
- constructing proper URI-s for sending requests (parser)
- having the abstraction of HTTP client for sending requests which will make testing dependent services easier
- sending requests to backends (main feature) and health checks (secondary feature)
- applying Round Robin to `HealthChecks` and `Backends` on each request (through the `cats.effect.Ref` API)
- updating `Backends` based on health check responses (adding or removing backends through `cats.effect.Ref` API)

Let's gradually follow the list above: 

We need a proper service for constructing `org.http4s.Uri` because we'll be using `http4s` and its inclusive ecosystem to write the HTTP server for our load balancer.

So, `Uri` parser could look like:

```scala
package com.ghurtchu.loadbalancer.services

import cats.syntax.either._
import com.ghurtchu.loadbalancer.services.LoadBalancer.InvalidUri
import org.http4s.Uri

trait ParseUri {
  def apply(uri: String): Either[InvalidUri, Uri]
}

object ParseUri {
  
  def impl: ParseUri = new ParseUri {
    /**
     * Either returns proper Uri or InvalidUri
     */
    override def apply(uri: String): Either[InvalidUri, Uri] =
      Uri
        .fromString(uri)
        .leftMap(_ => InvalidUri(uri))
  }
}
```

And the tests for `ParseUri`:
```scala
package com.ghurtchu.loadbalancer.services

import com.ghurtchu.loadbalancer.services.LoadBalancer.InvalidUri
import munit.FunSuite
import org.http4s.Uri

class ParseUriTest extends FunSuite {

  val parseUri = ParseUri.impl

  test("valid URI") {
    val uri      = "0.0.0.0/8080"
    val obtained = parseUri(uri)
    val expected = Right(Uri.unsafeFromString(uri))

    assertEquals(obtained, expected)
  }

  test("invalid URI") {
    val uri      = "definitely invalid uri XD"
    val obtained = parseUri(uri)
    val expected = Left(InvalidUri(uri))

    assertEquals(obtained, expected)
  }
}
```

Going good!

What about HTTP Client? This part is important because it will be used by other services which we will define later.

If we create even the simplest abstraction for HTTP Client it will definitely help us easily test the dependent services:

```scala
package com.ghurtchu.loadbalancer.http

import cats.effect.IO
import org.http4s.client.Client
import org.http4s.{Request, Uri}

import scala.concurrent.duration.DurationInt

trait HttpClient {
  def sendAndReceive(uri: Uri, requestOpt: Option[Request[IO]]): IO[String]
}

object HttpClient {

  def of(client: Client[IO]): HttpClient = new HttpClient {
    /**
     * sends requestOpt to uri if requestOpt is defined, or else only pings it
     */
    override def sendAndReceive(uri: Uri, requestOpt: Option[Request[IO]]): IO[String] =
      IO.println(s"sending request to $uri") *>
        requestOpt.fold(
          client.expect[String](uri),
        ) { request => 
          client.expect[String](request.withUri(uri)) 
        }
  }

  // Below are some useful values for tests
  val testSuccess: HttpClient = new HttpClient {
    override def sendAndReceive(uri: Uri, requestOpt: Option[Request[IO]]): IO[String] =
      IO.pure("Hello")
  }

  val testFailure: HttpClient = new HttpClient {
    override def sendAndReceive(uri: Uri, requestOpt: Option[Request[IO]]): IO[String] =
      IO.raiseError(new RuntimeException("Server is dead"))
  }

  val testTimeout: HttpClient = new HttpClient {
    override def sendAndReceive(uri: Uri, requestOpt: Option[Request[IO]]): IO[String] =
      IO.sleep(6.seconds)
        .as("Hello")
  }
}
```

Now that we have `HttpClient` in place we can move on and implement more interesting services, such as `SendAndExpect[A]` which directly uses `HttpClient`.


This will be a special service which:
- forwards request to the backend, receives response and returns it to the client
- pings the backend to check its health

Let's translate this to code:
```scala
package com.ghurtchu.loadbalancer.services

import cats.effect.IO
import com.ghurtchu.loadbalancer.http.HttpClient
import org.http4s.client.UnexpectedStatus
import org.http4s.{Request, Uri}
import cats.syntax.option._

import scala.concurrent.duration.DurationInt

trait SendAndExpect[A] {
  def apply(uri: Uri): IO[A]
}

object SendAndExpect {

  sealed trait Status

  object Status {
    case object Alive extends Status
    case object Dead  extends Status
  }
  
  import Status._

  def toBackend(httpClient: HttpClient, req: Request[IO]): SendAndExpect[String] =
    new SendAndExpect[String] {
      /**
       * sends the request to the backend
       * receives response and returns to the client
       * if errors are occurred returns the special message
       */
      override def apply(uri: Uri): IO[String] =
        httpClient
          .sendAndReceive(uri, req.some)
          .handleError {
            case _: UnexpectedStatus => s"resource at uri: [$uri] was not found"
            case _                   => s"server with uri: [$uri] is dead"
          }
    }

  def toHealthCheck(httpClient: HttpClient): SendAndExpect[Status] =
    new SendAndExpect[Status] {
      /**
       * pings the backend, if the response is successful it maps it to Status.Alive
       * if receiving the response takes more than 5 seconds or some other error pops up it returns Status.Dead
       */
      override def apply(uri: Uri): IO[Status] =
        httpClient
          .sendAndReceive(uri, none)
          .as(Status.Alive)
          .timeout(5.seconds)
          .handleError(_ => Status.Dead)
    }

}
```

Awesome! Let's write some tests to make sure that our definitions meet the criteria:

```scala
package com.ghurtchu.loadbalancer.services

import cats.effect.IO
import cats.effect.unsafe.implicits.global
import com.ghurtchu.loadbalancer.http.{HttpClient, HttpServer}
import munit.FunSuite
import org.http4s.{Request, Uri}

class SendAndExpectTest extends FunSuite {

  val emptyRequest  = Request[IO]()
  
  test("toBackend [Success]") {
    val sendAndExpect = SendAndExpect.toBackend(HttpClient.testSuccess, emptyRequest)
    val backend       = Uri.fromString("localhost:8080").toOption.get

    sendAndExpect(backend)
      .map { obtained =>
        assertEquals(obtained, "Hello")
      }
      .unsafeRunSync()
  }

  test("toBackend [Failure]") {
    val sendAndExpect = SendAndExpect.toBackend(HttpClient.testFailure, emptyRequest)
    val uri           = "localhost:8080"
    val backend       = Uri.fromString(uri).toOption.get

    sendAndExpect(backend)
      .map { obtained =>
        assertEquals(obtained, s"server with uri: [$uri] is dead")
      }
      .unsafeRunSync()
  }

  test("toHealthCheck [Alive]") {
    val sendAndExpect = SendAndExpect.toHealthCheck(HttpClient.testSuccess)
    val backend       = Uri.fromString("localhost:8080").toOption.get

    sendAndExpect(backend)
      .map { obtained =>
        assertEquals(obtained, HttpServer.Status.Alive)
      }
      .unsafeRunSync()
  }

  test("toHealthCheck [Dead due to timeout]") {
    val sendAndExpect = SendAndExpect.toHealthCheck(HttpClient.testTimeout)
    val backend       = Uri.fromString("localhost:8080").toOption.get

    sendAndExpect(backend)
      .map { obtained =>
        assertEquals(obtained, HttpServer.Status.Dead)
      }
      .unsafeRunSync()
  }

  test("toHealthCheck [Dead due to exception]") {
    val sendAndExpect = SendAndExpect.toHealthCheck(HttpClient.testFailure)
    val backend       = Uri.fromString("localhost:8080").toOption.get

    sendAndExpect(backend)
      .map { obtained =>
        assertEquals(obtained, HttpServer.Status.Dead)
      }
      .unsafeRunSync()
  }
}
```
Cool!

We need a few more services before we write the whole logic for load balancer or backend health checks, so, let's move on.

Now we need a special service which will be responsible for applying Round Robin logic to `UrlsRef`-s, so to the `Backends` and `HealthChecks` which we defined in the `domain` part.
```scala
package com.ghurtchu.loadbalancer.services

import cats.Id
import cats.effect.IO
import com.ghurtchu.loadbalancer.domain.Urls.Url
import com.ghurtchu.loadbalancer.domain.{Backends, UrlsRef}

trait RoundRobin[F[_]] {
  def apply(ref: UrlsRef): IO[F[Url]]
}

object RoundRobin {

  type BackendsRoundRobin     = RoundRobin[Option]
  type HealthChecksRoundRobin = RoundRobin[Id]

  def forBackends: BackendsRoundRobin = new BackendsRoundRobin {
    override def apply(ref: UrlsRef): IO[Option[Url]] =
      ref.urls
        .getAndUpdate(_.next)
        .map(_.currentOpt)

  }

  def forHealthChecks: HealthChecksRoundRobin = new HealthChecksRoundRobin {
    override def apply(ref: UrlsRef): IO[Id[Url]] =
      ref.urls
        .getAndUpdate(_.next)
        .map(_.currentUnsafe)
  }

  val testId: RoundRobin[Id] = new RoundRobin[Id] {
    override def apply(ref: UrlsRef): IO[Id[Url]] =
      IO.pure(Url("localhost:8081"))
  }

  val testOpt: RoundRobin[Option] = new RoundRobin[Option] {
    override def apply(ref: UrlsRef): IO[Option[Url]] =
      IO.pure(Some(Url("localhost:8081")))
  }
}

```

(I omitted the tests for `RoundRobin` because it's really huge, you can view whole the source code in the end)

Nice! 

It's time to create something that based on `Status` will update the `Backends` atomically - either remove or add new `Url` to it:

```scala
package com.ghurtchu.loadbalancer.services

import cats.effect.IO
import com.ghurtchu.loadbalancer.domain.Backends.Backends
import com.ghurtchu.loadbalancer.domain.Urls.Url
import com.ghurtchu.loadbalancer.domain.{Backends, Urls}
import com.ghurtchu.loadbalancer.services.SendAndExpect.Status

trait UpdateBackendsAndGet {
  def apply(backends: Backends, url: Url, status: Status): IO[Urls]
}

object UpdateBackendsAndGet {

  def impl: UpdateBackendsAndGet = new UpdateBackendsAndGet {
    /**
     * if status is Alive it adds url to backends atomically
     * if status is Dead it removes url from backends atomically
     */
    override def apply(backends: Backends, url: Url, status: Status): IO[Urls] =
      status match {
        case Status.Alive =>
          IO.println(s"$url is alive") *>
            backends.urls
              .updateAndGet(_.add(url))
        case Status.Dead  =>
          IO.println(s"$url is dead") *>
            backends.urls
              .updateAndGet(_.remove(url))
      }
  }
}
```

Looks so simple, right? 

It's no brainer that tests will also look pretty straightforward:

```scala
package com.ghurtchu.loadbalancer.services

import cats.effect.IO
import cats.effect.unsafe.implicits.global
import com.ghurtchu.loadbalancer.domain.Urls
import com.ghurtchu.loadbalancer.domain.Urls._
import com.ghurtchu.loadbalancer.domain.Backends._
import com.ghurtchu.loadbalancer.services.SendAndExpect._
import munit.FunSuite

class UpdateRefUrlsAndGetTest extends FunSuite {

  val updateBackendsAndGet = UpdateBackendsAndGet.impl
  val localhost            = Url("localhost:8083")

  test("Alive") {
    val status = Status.Alive
    val urls   = Urls(Vector("localhost:8081", "localhost:8082"))

    (for {
      ref     <- IO.ref(urls)
      updated <- updateBackendsAndGet(Backends(ref), localhost, status)
    } yield updated.values == (urls.values :+ localhost))
      .unsafeRunSync()
  }

  test("Dead") {
    val status = Status.Dead
    val urls   = Urls(Vector("localhost:8081", "localhost:8082", localhost))

    (for {
      ref     <- IO.ref(urls)
      updated <- updateBackendsAndGet(Backends(ref), localhost, status)
    } yield updated.values == Vector("localhost:8081", "localhost:8082"))
      .unsafeRunSync()
  }

}
```

With these services available we have everything we need to implement two main bosses:
- load balancer
- backend health checks

Let's start with the simpler one - `HealthCheckBackends`.

This service will use definitions from `domain` and `services` to check the availability of backends, so effectively it will:
- apply Round Robin to `HealthChecks`
- parse uri string to `Uri`
- ping the `Uri`
- sleep for the predetermined amount of time and do the same again (functional `while (true)` loop if I can say so)

Let's express this idea as code:
```scala
package com.ghurtchu.loadbalancer.services

import cats.effect.IO
import com.ghurtchu.loadbalancer.domain.Config.HealthCheckInterval
import com.ghurtchu.loadbalancer.domain.Backends.{Backends, HealthChecks}
import com.ghurtchu.loadbalancer.services.SendAndExpect.Status
import com.ghurtchu.loadbalancer.services.RoundRobin.HealthChecksRoundRobin

import scala.concurrent.duration.DurationLong

object HealthCheckBackends {

  def periodically(
    healthChecks: HealthChecks,
    backends: Backends,
    parseUri: ParseUri,
    updateBackendsAndGet: UpdateBackendsAndGet,
    healthChecksRoundRobin: HealthChecksRoundRobin,
    sendAndExpectStatus: SendAndExpect[Status],
    healthCheckInterval: HealthCheckInterval
  ): IO[Unit] =
    (for {
      currentUrl <- healthChecksRoundRobin(healthChecks)
      uri        <- IO.fromEither(parseUri(currentUrl.value))
      status     <- sendAndExpectStatus(uri)
      _          <- updateBackendsAndGet(backends, currentUrl, status)
    } yield ())
      .flatMap(_ => IO.sleep(healthCheckInterval.value.seconds))
      .foreverM
}
```

As you can see `HealthCheckBackends` is just a piece of logic which uses the services which we defined above.

We can move to `LoadBalancer` now.

This will be a service which:
- accepts any request (let's say `"localhost:8080/users/1"`)
- applies Round Robin to `Backends` (let's say the current backend will be `"localhost:8083"`)
- updates uri in the following fashion: `"localhost:8080/users/1"` => `"localhost:8083/users/1"` (so that it hits the correct backend resource)
- parses uri
- sends request to uri
- sends response to the client

```scala
package com.ghurtchu.loadbalancer.services

import cats.effect.IO
import com.ghurtchu.loadbalancer.domain.Backends.Backends
import com.ghurtchu.loadbalancer.services.RoundRobin.BackendsRoundRobin
import org.http4s.dsl.Http4sDsl
import org.http4s.{HttpRoutes, Request}

object LoadBalancer {

  def from(
    backends: Backends,
    sendAndExpectResponse: Request[IO] => SendAndExpect[String],
    parseUri: ParseUri,
    backendsRoundRobin: BackendsRoundRobin,
  ): HttpRoutes[IO] = {
    val dsl = new Http4sDsl[IO] {}
    import dsl._
    HttpRoutes.of[IO] { case request =>
      backendsRoundRobin(backends).flatMap {
        _.fold(Ok("All backends are inactive")) { currentUrl =>
          val urlUpdated = currentUrl.value
            .concat(request.uri.path.renderString)
          for {
            uri      <- IO.fromEither(parseUri(urlUpdated))
            response <- sendAndExpectResponse(request)(uri)
            result   <- Ok(response)
          } yield result
        }
      }
    }
  }

  final case class InvalidUri(uri: String) extends Throwable {
    override def getMessage: String =
      s"Could not construct proper URI from $uri"
  }
}
```
Awesome, we defined the `LoadBalancer` which will return `HttpRoutes[IO]` and `http4s` will run it.

Now, let's see how "the end of the world" would look like:

```scala
import cats.effect.{IO, IOApp}
import cats.implicits.{catsSyntaxTuple2Parallel, catsSyntaxTuple2Semigroupal}
import com.comcast.ip4s.{Host, Port}
import com.ghurtchu.loadbalancer.domain.{Config, Urls}
import com.ghurtchu.loadbalancer.domain.Backends.{Backends, HealthChecks}
import com.ghurtchu.loadbalancer.http.HttpServer
import com.ghurtchu.loadbalancer.services.{ParseUri, RoundRobin, UpdateBackendsAndGet}
import pureconfig._
import pureconfig.generic.auto._

object Main extends IOApp.Simple {

  override def run: IO[Unit] =
    for {
      config                   <- IO(ConfigSource.default.loadOrThrow[Config])
      (backends, healthChecks) <- refs(config.backends)
      (host, port)             <- IO.fromEither {
        hostAndPort(
          config.hostOr(fallback = "0.0.0.0"),
          config.portOr(fallback = 8080),
        )
      }
      _                        <- IO.println(s"Starting server on URL: $host:$port")
      _                        <- HttpServer.start(
        backends,
        healthChecks,
        port,
        host,
        config.healthCheckInterval,
        ParseUri.impl,
        UpdateBackendsAndGet.impl,
        RoundRobin.forBackends,
        RoundRobin.forHealthChecks,
      )
    } yield ()

  private def refs(urls: Urls): IO[(Backends, HealthChecks)] =
    (
      IO.ref(urls),
      IO.ref(urls),
    ).parMapN { case (backendsRef, healthChecksRef) =>
      (Backends(backendsRef), HealthChecks(healthChecksRef))
    }

  private def hostAndPort(
    host: String,
    port: Int,
  ): Either[Config.InvalidConfig, (Host, Port)] =
    (
      Host.fromString(host),
      Port.fromInt(port),
    ).tupled
      .toRight(Config.InvalidConfig)
}
```

Almost done!

Before testing the load balancer manually we need to have some backends.

For that I wrote really simple Python flask application which looks like this:

```python
from flask import Flask
import sys

app = Flask(__name__)
host = "localhost"
port = int(sys.argv[1])

@app.route("/")
def hello():
    return f"hello from {url(host, port)}"

@app.route("/health")
def health():
    return f"{url(host, port)} is alive and healthy ^_^"

def url(host, port):
    return f"http://{host}:{port}"

if __name__ == '__main__':
    app.run(host=host, port=port, debug=True)
```

Now we can create two shell scripts for running load balancer and backends easily.

We can write a shell script - `be`, with which we can run the python flask app:
```shell
#!/bin/sh

python3 echoer.py $1
```

and a separate shell script - `lb`, for running the load balancer:
```shell
#!/bin/sh

scala lb.jar $1
```

In this video you can see the live testing of load balancer:
{% include video id="SkQ6s_nwCgY" provider="youtube" %}

If you want to see the whole project you can view _[Source code](https://github.com/Ghurtchu/lb)_

Thank you for your time!

