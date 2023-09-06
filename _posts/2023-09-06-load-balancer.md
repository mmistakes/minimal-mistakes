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

In this blogpost we will make use of `cats.effect.Ref`, `cats.effect.IO` and `http4s` to build an application layer load balancer which
will be featuring the following characteristics:
- Being effective in distributing requests to the backends (Round Robin Algorithm)
- Making sure that requests are forwarded only to the available backends (Reliability)
- Managing the state safely while the backends die and come back online (Periodic health checks)

## 2. Domain Modeling
The domain of load balancer is really simple. We need some sort of immutable blueprint which will represent the different states of backend URL-s.
Let's call that `Urls`:
```scala
package com.ghurtchu.loadbalancer.domain

import com.ghurtchu.loadbalancer.domain.Urls.Url

import scala.util.Try

final case class Urls(values: Vector[Url]) extends AnyVal {

  /**
   * Applies Round Robin algorithm to itself
   * (1, 2, 3) -> (2, 3, 1) -> (3, 1, 2) -> (1, 2, 3)
   */
  def next: Urls =
    Try(copy(values.tail :+ values.head))
      .getOrElse(Urls.empty)

  /**
   * Safa access to head
   */
  def currentOpt: Option[Url] =
    Try(currentUnsafe).toOption

  /**
   * Unsafe access to head
   */
  def currentUnsafe: Url =
    values.head

  /**
   * Drops the passed url
   */
  def remove(url: Url): Urls =
    copy(values.filter(_ != url))

  /**
   * adds the passed url
   */
  def add(url: Url): Urls =
    if (values contains url) this
    else copy(values :+ url)
}

object Urls {

  final case class Url(value: String) extends AnyVal {
    override def toString: String = value
  }

  implicit def stringToBackendUrl: String => Url = Url

  def empty: Urls = Urls(Vector.empty)
}
```

We can write some tests to make sure that `Urls` API is sound, for that `munit` will suffice:
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

Moreover, we would like to configure the load balancer before running it, so the configuration might look like:
```conf
port="8080",
host="localhost",
backends=[
 "http://localhost:8081",
 "http://localhost:8082",
 "http://localhost:8083"
],
health-check-interval="1" // check backend health per every new second
```

Let's create a `Config` for capturing the aforementioned idea:

```scala
package com.ghurtchu.loadbalancer.domain

import com.ghurtchu.loadbalancer.domain.Config.HealthCheckInterval

import scala.util.Try

final case class Config(
  port: String,
  host: String,
  backends: Urls,
  healthCheckInterval: HealthCheckInterval
) {

  def hostOr(fallback: String): String =
    if (host.isEmpty) fallback
    else host

  def portOr(fallback: Int): Int =
    Try(port.toInt).toOption
      .getOrElse(fallback)
}

object Config {

  type InvalidConfig = InvalidConfig.type

  final case object InvalidConfig extends Throwable {
    override def getMessage: String =
      "Invalid port or host, please fix Config"
  }

  final case class HealthCheckInterval(value: Long) extends AnyVal
}
```

And the tests for `Config`:
```scala
package com.ghurtchu.loadbalancer.domain

import munit.FunSuite
import Config.HealthCheckInterval

class ConfigTest extends FunSuite {

  val config = Config(
    port = "8081",
    host = "localhost",
    backends = Urls.empty,
    healthCheckInterval = HealthCheckInterval(1),
  )

  test("hostOr") {
    val obtained = config.hostOr("0.0.0.0")
    val expected = "localhost"
    assertEquals(obtained, expected)

    val configWithEmptyHost = config.copy(host = "")
    val obtainedDefault     = configWithEmptyHost.hostOr("0.0.0.0")
    val expectedDefault     = "0.0.0.0"
    assertEquals(obtainedDefault, expectedDefault)
  }

  test("portOr") {
    val obtained = config.portOr(8080)
    val expected = 8081
    assertEquals(obtained, expected)

    val configWithEmptyPort = config.copy(port = "invalid port")
    val obtainedDefault     = configWithEmptyPort.portOr(8080)
    val expectedDefault     = 8080
    assertEquals(obtainedDefault, expectedDefault)
  }
}
```

Splendid!

It is apparent that the load balancer must handle concurrent requests from different clients which can be issued at the same time, so we need to make sure that the state updates for 
`Urls` is atomic.

For that we can make use of `cats.effect.Ref`, however we need to distinguish between two completely separate problems:
- forwarding requests to the backends and returning the response to the clients (main feature)
- checking the health of the backend (secondary feature)

So, clearly we see that we need to have something which will represent `Backends` and `HealthChecks` which also must incorporate atomicity:

```scala
package com.ghurtchu.loadbalancer.domain

import cats.effect.{IO, Ref}

trait UrlsRef {
  def urls: Ref[IO, Urls]
}

object UrlsRef {
  final case class Backends(urls: Ref[IO, Urls])     extends UrlsRef
  final case class HealthChecks(urls: Ref[IO, Urls]) extends UrlsRef
}
```

With this we can finish modeling the domain and move on to the more interesting part - defining services.

## 3. Services

There are only a handful of services which we can be useful to abstract over to make them reusable, isolated and testable:
- constructing proper URI-s for sending requests
- having the abstraction of HTTP client for sending requests which will make testing dependent services easier
- sending requests to backends (main feature) and health checks (seconday feature)
- applying Round Robin to `HealthChecks` and `Backends` on each request (through the `cats.effect.Ref` API)
- updating `Backends` based on health check responses (adding or removing backends through `cats.effect.Ref` API)

Let's start with the simplest one: We need a proper service for constructing `org.http4s.Uri` because we'll be using `http4s` as the main backend for our load balancer.

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

Tests for `ParseUri`:
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

What about HTTP Client? This part is important because it will be used by other services which we will define later.

If we create even the simplest abstraction for HTTP Client it will definitely make the testing part trivial.

```scala
package com.ghurtchu.loadbalancer.http

import cats.effect.IO
import org.http4s.client.Client
import org.http4s.{Request, Uri}

import scala.concurrent.duration.DurationInt

trait HttpClient {
  def sendAndReceive(uri: Uri, requestOpt: Option[Request[IO]] = None): IO[String]
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

Now that we have `HttpClient` in place we can move on and implement more interesting services, such as `SendAndExpect[A]` which uses `HttpClient`.


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
          .sendAndReceive(uri)
          .as(Status.Alive)
          .timeout(5.seconds)
          .handleError(_ => Status.Dead)
    }

}
```

Awesome! Let's write some tests to make sure that our definitions meets the criteria:

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

Cool, now we need a special service which will be responsible for applying Round Robin logic to `UrlsRef`-s, so to the `Backends` and `HealthChecks`:
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

(I omitted the testing part for `RoundRobin` because it's really huge, you can view whole the source code in the end)

Nice! It's time to create something that based on `Status` will update the `Backends` atomically - either remove or add new `Url` to it:

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

Looks so simple, right? Tests also look pretty straightforward too:

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

This service will use definitions from `domain` and `services` to check the availability of backends, so it will:
- apply Round Robin to `HealthChecks`
- parse uri
- ping the uri
- sleep for the predetermined amount of time and do the same again (functional `while (true)` loop if I can say so)

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

And the `LoadBalancer` - a service which:
- accepts any request
- applies Round Robin to `Backends` (let's say the current backend will be `"localhost:8083"`)
- updates uri in the following fashion: `"localhost:8080/users/1"` => `"localhost:8083/users/1"`
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

Let's see how the `Main` object looks like (omitting a few things):

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

Now I will show you a really simple Python flask application for having a basic backend for manual testing:

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

See live testing:
{% include video id="SkQ6s_nwCgY" provider="youtube" %}

View _[Source code](https://github.com/Ghurtchu/lb)_

