---
title: "How to Write a Full-Stack Scala 3 Application with the Typelevel Stack"
date: 2024-01-23
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: []
excerpt: "Learn how to write a full-stack Scala 3 application with Cats Effect, Doobie, Http4s and Tyrian, from scratch."
toc: true
toc_label: "In this article"
---

{% include video id="6NHEGejBQ0w" provider="youtube" %}

## 1. Introduction

The Typelevel stack is one of the most powerful sets of libraries in the Scala ecosystem. They allow you to write powerful applications with pure functional programming - as of this writing, the Typelevel ecosystem is one of the biggest selling points of Scala.

The Typelevel stack is based on [Cats](https://typelevel.org/cats/) and [Cats Effect](https://typelevel.org/cats-effect/). The Cats library offers general functional programming abstractions, e.g. [functors](/what-the-functor), [monads](/monads), applicatives, etc; while the Cats Effect library defines what it means to be an "effect". With these ideas we can build powerful software, with some guarantees granted by the Scala type system, some granted by the design of the abstractions, and with some guardrails over what we can and cannot do.

This article shows you how to build a full-stack web application with some of these libraries. We will use some of the popular Typelevel libraries, including

- Cats for FP abstractions and extension methods
- Cats Effect for effectful operations
- Doobie for database interactions
- Http4s for a purely functional web server

This is on the backend. On the frontend: although not an official Typelevel library, we will use [Tyrian](https://tyrian.indigoengine.io/), a nice frontend library inspired by Elm, based on Cats Effect, for Scala 3 transpiled to JavaScript (ScalaJS).

Together we will build the minimal start of a full-stack application, entirely written in Scala. The use-case is a fictitious "job board" - we will define a server that is able to insert and retrieve data from the database, then surface that data on the frontend.

>This demo is the start of the production-grade application we write in the giant [Typelevel Rite of Passage](https://rockthejvm.com/p/typelevel-rite-of-passage) course. It is currently the biggest course on the site, and teaches you how to write production software using the Typelevel stack, how to make sound architectural decisions, how to do proper testing, how to write app features, payment systems, email services and everything that you'd normally expect from a proper web application, and also how to deploy it to your domain.
>
> If you're interested, check out the course [here](https://rockthejvm.com/p/typelevel-rite-of-passage).

## 2. Setup

Start by cloning [this repository](https://github.com/rockthejvm/full-stack-typelevel-demo) and checking out the `start` tag. We can also start from empty directory (like we start in the Typelevel Rite of Passage course), but this option is quicker.

After you clone the repository, you will find the build.sbt file. It contains all the library definitions that you'll need to get an SBT project started with 3 modules:
- a backend module called `server`
- a frontend module called `app`
- an intermediate module called `common`, for sharing code between the frontend and backend

Let's go over the important components of the project. The relevant build.sbt file is below:

```scala
ThisBuild / version := "1.0.0"

lazy val rockthejvm    = "com.rockthejvm"
lazy val scala3Version = "3.3.1"

lazy val core = (crossProject(JSPlatform, JVMPlatform) in file("common"))
  .settings(
    name         := "common",
    scalaVersion := scala3Version,
    organization := rockthejvm
  )

lazy val tyrianVersion = "0.6.1"
lazy val fs2DomVersion = "0.1.0"
lazy val circeVersion  = "0.14.0"

lazy val app = (project in file("app"))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    name         := "app",
    scalaVersion := scala3Version,
    organization := rockthejvm,
    libraryDependencies ++= Seq(
      "io.indigoengine" %%% "tyrian-io"     % tyrianVersion,
      "com.armanbilge"  %%% "fs2-dom"       % fs2DomVersion,
      "io.circe"        %%% "circe-core"    % circeVersion,
      "io.circe"        %%% "circe-parser"  % circeVersion,
      "io.circe"        %%% "circe-generic" % circeVersion
    ),
    scalaJSLinkerConfig ~= { _.withModuleKind(ModuleKind.CommonJSModule) },
    semanticdbEnabled := true,
    autoAPIMappings   := true
  )
  .dependsOn(core.js)

lazy val catsEffectVersion          = "3.3.14"
lazy val http4sVersion              = "0.23.15"
lazy val doobieVersion              = "1.0.0-RC1"
lazy val logbackVersion             = "1.4.0"
lazy val slf4jVersion               = "2.0.0"

lazy val server = (project in file("server"))
  .settings(
    name         := "server",
    scalaVersion := scala3Version,
    organization := rockthejvm,
    libraryDependencies ++= Seq(
      "org.typelevel"         %% "cats-effect"         % catsEffectVersion,
      "org.http4s"            %% "http4s-dsl"          % http4sVersion,
      "org.http4s"            %% "http4s-ember-server" % http4sVersion,
      "org.http4s"            %% "http4s-circe"        % http4sVersion,
      "io.circe"              %% "circe-generic"       % circeVersion,
      "io.circe"              %% "circe-fs2"           % circeVersion,
      "org.tpolecat"          %% "doobie-core"         % doobieVersion,
      "org.tpolecat"          %% "doobie-hikari"       % doobieVersion,
      "org.tpolecat"          %% "doobie-postgres"     % doobieVersion,
      "org.slf4j"              % "slf4j-simple"        % slf4jVersion,
    ),
  )
  .dependsOn(core.jvm)
```

If you open this project in any IDE (both Metals and IntelliJ should work) or if you run `sbt` in the root folder, you will see 3 subfolders `server`, `app`, `common`, one for each module.

In the `db` folder you will also find a Docker-based Postgres database (so make sure you have Docker Compose installed). The `docker-compose.yml` definition is below, with the port changed to 5444 instead of the usual 5432, just in case you may have other Postgres instances running:

```yaml
version: '3.1'

services:
  db:
    image: postgres
    restart: always
    volumes:
      - "./sql:/docker-entrypoint-initdb.d"
    environment:
      - "POSTGRES_USER=docker"
      - "POSTGRES_PASSWORD=docker"
    ports:
      - "5444:5432"
```

Before we start writing code, open a terminal, go to the `db` folder and run the command `docker-compose` up to have the database ready. This command will create a Docker-based Postgres with the script in the `db/sql` folder already run. The script currently contains just the creation of a table called `jobs`, along with some dummy data. The table looks like this:

```sql
create table jobs(
	id uuid primary key default gen_random_uuid (),
	company text not null,
	title text not null,
	description text not null,
	externalUrl text not null,
	salaryLo integer,
	salaryHi integer,
	currency text,
	remote boolean,
	location text not null,
	country text
);
```

Once we have the Postgres ready, we can start writing code.

## 3. Backend - Core Module

In this application, we will separate the server logic from the business logic of the application. Because in this case the business logic is minimal (just retrieving and inserting things into the database), we will keep this "core" module close to the database. In the `server` SBT module, create the `src/main/scala/com/rockthejvm/livedemo` directory if you don't have it already.

Typically, a core module contains the following:

- a trait with effectful APIs
- one or more implementations of this trait
- each implementation with a companion object, which (at a minimum) exposes a smart-effectful constructor or a resource which contains an instance of the trait

Let's take them in turn. First, a trait with effectful APIs:

```scala
trait Dummy[F[_]] {
  def action(arg: Int): F[String] // a general example
}
```

We say that the `action` method is effectful because it returns a value wrapped in an "effect" called `F[_]`. This effect type depends on the capabilities (described by Cats/Cats Effect type classes) required to implement the method. Generally, all our business logic methods are effectful, because they might "do" things in the real world, and the _description_ of those "doings" are the F[_] values that we will then compose into bigger programs.

The second component of the core module is an implementation of the trait/API. Let's assume that a sensible implementation of `action` is a plain string, e.g. `s"Called an action with the arg $arg"`, wrapped in F. "Wrapped in F" means that F "contains" the string value we've built; it is, in other words, a _pure_ value. The `pure` capability is granted by the `Applicative` type class in Cats, which is why we will implement this class as follows:

```scala
import cats.*
import cats.syntax.all.*

class DummyLive[F[_]: Applicative] private extends Dummy[F] {
  override def action(arg: Int): F[String] =
    s"Called an action with the arg $arg".pure[F]
}
```

The Applicative type class grants the effect type F the capability of wrapping values, i.e. turning values of type `A` into `F[A]`. Examples of applicatives include Option, Try, Validated, List. All these types can "wrap" normal values into wrapper values, e.g. turning a `String` into an `Option[String]`. Given our very general type definition (with `F[_]`), we reserve the freedom to pick the effect type later, depending on the semantics of the effect: for testing, we might pick `Option`, for production, we might pick `IO`.

This style is sometimes called "[tagless final](/tagless-final)", even though the original theory of Tagless Final is far more formal and separated from the concept of type classes than the representation we're picking here (`F[_]` with type class constraints). But we digress.

We currently have 1) the trait, 2) an implementation of the trait. The third part is a companion object with some effectful smart constructors. Generally, such a companion would look like this:

```scala
import cats.effect.kernel.Resource

object DummyLive {
  // "Smart constructor"
  def make[F[_]: Applicative]: F[Dummy[F]] =
    new DummyLive[F].pure[F]

  // resource constructor
  def resource[F[_]: Applicative]: Resource[F, Dummy[F]] =
    Resource.pure(new DummyLive[F])
}
```

Here we provide two popular versions of smart constructors:
- one that returns an instance of the module `Dummy[F]` wrapped in an effect, therefore `F[Dummy[F]]`
- one that returns a _resource_ containing the module `Dummy[F]`, therefore `Resource[F, Dummy[F]]`

Generally, the "resource" constructor is preferred, because in the process of constructing the resource, we also provide the logic of allocation and release of whatever auxiliary resources we need, therefore freeing the mind of whoever builds this resource from the need to manage it.

This was all an example. Let's make things more concrete: a module that is able to
- read all jobs from the database
- insert a job into the database

For this we will need a domain model; let's write a case class in the `com.rockthejvm.livedemo.domain` package of the `server` module:

```scala
package com.rockthejvm.livedemo.domain

object job {
  case class Job(
      company: String,
      title: String,
      description: String,
      externalUrl: String,
      salaryLo: Option[Int],
      salaryHi: Option[Int],
      currency: Option[String],
      remote: Boolean,
      location: String,
      country: Option[String]
  )

  object Job {
    val dummy = Job(
      "Rock the JVM",
      "Instructor",
      "Scala teacher",
      "rockthejvm.com",
      Some(0),
      Some(99),
      Some("EUR"),
      true,
      "Bucharest",
      Some("Romania")
    )
  }
}
```

Using the fields from the database script, we can create a `case class Job` with corresponding fields; any nullable column corresponds with an `Option[...]` in the case class definition. We might also create a companion object for `Job`, with "static" APIs or default values we might need in the development of the application.

After we've created the domain model &mdash; and in real-life the domain model might be far more complex than one case class &mdash; we should be free to create the `Jobs` core module. So in the `com.rockthejvm.livedemo.core` package, let's create the `Jobs` core module. Again, we need 3 components:
- a trait
- an implementation
- a companion object for the implementation

Let's take them in turn: the first component is the API definition. Let's assume we want to retrieve all jobs as a `List[Job]`, and whenever we create a job we return its unique UUID:

```scala
import com.rockthejvm.livedemo.domain.job.*
import java.util.UUID

trait Jobs[F[_]] { // "algebra"
  def create(job: Job): F[UUID]
  def all: F[List[Job]]
}
```

The second component is the implementation. We've talked at length about [Doobie](/doobie) in another article, so the implementations of these methods are as simple as `INSERT INTO jobs(...) VALUES (...)` and `SELECT * FROM jobs`, respectively; of course, we need to express these SQL queries in terms of Doobie. The implementation looks as follows:

```scala
import cats.effect.*
import cats.syntax.all.*
import doobie.implicits.*
import doobie.postgres.implicits.*
import doobie.util.transactor.Transactor

class JobsLive[F[_]: Concurrent] private (transactor: Transactor[F]) extends Jobs[F] {
  override def all: F[List[Job]] =
    sql"""
      SELECT
        company,
        title,
        description,
        externalUrl,
        salaryLo,
        salaryHi,
        currency,
        remote,
        location,
        country
      FROM jobs
    """
      .query[Job]
      .stream
      .transact(transactor)
      .compile
      .toList

  override def create(job: Job): F[ju.UUID] =
    sql"""
      INSERT INTO jobs(
        company,
        title,
        description,
        externalUrl,
        salaryLo,
        salaryHi,
        currency,
        remote,
        location,
        country
      ) VALUES (
        ${job.company},
        ${job.title},
        ${job.description},
        ${job.externalUrl},
        ${job.salaryLo},
        ${job.salaryHi},
        ${job.currency},
        ${job.remote},
        ${job.location},
        ${job.country}
      )
    """.update
      .withUniqueGeneratedKeys[UUID]("id")
      .transact(transactor)
}
```

The `all` method is essentially the SQL query `SELECT * FROM jobs`, expressed as a Doobie `sql` interpolator, along with the right building methods - we return an effect `F[List[Job]]`. For the use of the `sql` interpolator, the effect type F needs to have a given `Concurrent` instance in scope, which we pass as a type bound in the definition of the `LiveJobs` implementation.

The `create(Job)` method is very similar and has similar requirements. One notable difference is that we instruct the database to create the `id` column automatically, which is also supported by the table, if you remember (look at the SQL table creation above).

We can try out this module independently to see if it works. Either here in the same file, or in another package of the `server` module, we can create a standalone Cats Effect application, let's call it `JobsPlayground`.

```scala
import cats.effect.*

object JobsPlayground extends IOApp.Simple {
  override def run: IO[Unit] =
    ???
}
```

In order to build the `Jobs` module, we need a Postgres `Transactor`, which Doobie can provide to us as a `Resource`:

```scala
import doobie.util.ExecutionContexts
import doobie.hikari.HikariTransactor

// in the JobsPlayground app
def makePostgres = for {
  ec <- ExecutionContexts.fixedThreadPool[IO](32)
  transactor <- HikariTransactor.newHikariTransactor[IO](
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost:5444/",
    "docker",
    "docker",
    ec
  )
} yield transactor
```

Note how Resources can be composed very nicely with for-comprehensions &mdash; we talk in depth about Resources in the [Cats Effect course](https://rockthejvm.com/p/cats-effect).

With the Postgres resource in place, we can build a `LiveJobs` module, and we can also use it, in the same program:

```scala
// in the JobsPlayground app
def program(postgres: Transactor[IO]) =
  for {
    jobs <- JobsLive.make[IO](postgres)
    _    <- jobs.create(Job.dummy)
    list <- jobs.all
    _    <- IO.println(list)
  } yield ()
```

This program creates the module, calls the `create` method, then the `all` method, and prints whatever jobs there are in the `jobs` table. This `program` function is a "user" of the resource that contained the Postgres `Transactor`, which is why we can directly "use" the `postgres` resource as follows:

```scala
override def run: IO[Unit] =
  makePostgres.use(program)
```

If we run this application, we should see at least the `dummy` job that we inserted in the table, and we can also check the database to see if it was inserted correctly.

At this point, we have the core module done. We can, of course, create multiple core modules, of different complexities, requirements, and dependencies, and we can combine them all in a big `Core` module that we can then use in the higher levels in the application. Some examples of core modules you can create:
- a Users module, that takes care of user passwords, authorizations, roles, etc
- an Emails module which is in charge of sending emails to people, e.g. notifications for a job, or account-related emails (e.g. forgotten password)
- a Payments module for paid features of the application - in the [Typelevel Rite of Passage](https://rockthejvm.com/p/typelevel-rite-of-passage) we use Stripe for credit card checkout

It's now time to move one level up and expose an external API that a third party (or in our case, the frontend) can access.

## 4. Backend - Server Module

We will build the server module with Http4s. For every vertical in the app (in this case, the "jobs" vertical) it is a good idea to expose an HTTP API for whatever functionality you would like to make available to the frontend. In this case, we would like to be able to list all jobs and create a job, all from the HTTP API, so we'll need to expose some frontend endpoints.

Let's imagine the following endpoints:
- a POST at `/jobs/create`, with a `Job` case class instance passed as a JSON payload
- a GET at `/jobs` with the list of jobs returned as a JSON list

We've covered [Http4s](/http4s-tutorial) in detail in another article, so we will use those lessons to build our HTTP API. In the `com.rockthejvm.livedemo.http` package, we will scaffold the `JobRoutes` class which will contain the endpoints we've discussed:

```scala
import cats.effect.*
import cats.*
import cats.syntax.all.*
import org.http4s.*
import org.http4s.implicits.*
import org.http4s.dsl.Http4sDsl

import com.rockthejvm.livedemo.core.*

class JobRoutes[F[_]: Concurrent] private (jobs: Jobs[F]) extends Http4sDsl[F] {

}

object JobRoutes {
  def resource[F[_]: Concurrent](jobs: Jobs[F]): Resource[F, JobRoutes[F]] =
    Resource.pure(new JobRoutes[F](jobs))
}
```

We're going to follow the same pattern as in the `Jobs` module and expose either a smart-effectful constructor of this class, or a resource constructor; in this case we've picked a resource constructor, because it will be more useful when we combine the resources later, at the point when we build the Http4s `Server` instance. The `Concurrent` requirement is also important for us to implement the HTTP routes. Even the `circe` library needs the `Concurrent` type class to encode and decode JSON.

Defining the endpoints is quite straightforward. For the POST endpoint, we need to parse the payload of the HTTP request as JSON and return the `Job` inside, after which we can pass it as argument to the `Jobs.create` API. The route looks as follows:

```scala
import org.http4s.circe.CirceEntityCodec.*
import io.circe.generic.auto.*

import com.rockthejvm.livedemo.domain.job.*

// inside `JobRoutes`
  private val createJobRoute: HttpRoutes[F] = HttpRoutes.of[F] {
    case req @ POST -> Root / "create" =>
      for {
        job  <- req.as[Job]
        id   <- jobs.create(job)
        resp <- Created(id)
      } yield resp
  }
```

The 3-step process is:
- parse the payload
- insert the entry in the database
- return a 201 Created with the ID of the job

Likewise, for the GET endpoint, the process is similarly straightforward, except the payload encoding to JSON is automatic:

```scala
// inside `JobRoutes`
private val getAllRoute: HttpRoutes[F] = HttpRoutes.of[F] { case GET -> Root =>
  jobs.all.flatMap(jobs => Ok(jobs))
}
```

The process is
- find all the jobs by calling `jobs.all`
- encode the list of Jobs as JSON (automatic)
- return a 200 OK with the payload

Currently, we just have two private fields. We need to expose a proper HTTP API. We need to combine these routes into a `Router`:

```scala
import org.http4s.server.Router

// inside `JobRoutes`
val routes: HttpRoutes[F] = Router(
  "/jobs" -> (createJobRoute <+> getAllRoute)
)
```

And with that, we have our HTTP API.

## 5. Backend - Putting it All Together

We now need to combine the two "layers" of our backend into one comprehensive application. We need the following:
- a Postgres `Transactor` to build the `Jobs` module
- the `Jobs` module to build the `JobRoutes`
- the `JobRoutes` to specify the HTTP API
- the Http4s `Server` resource
- a final program to use that resource and keep the server alive

If all of the above sounds like a for-comprehension, it is. First, the Postgres, just like in `JobsPlayground:

```scala
import cats.effect.*
import doobie.util.ExecutionContexts
import doobie.hikari.HikariTransactor
import com.comcast.ip4s.*
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.server.middleware.CORS

import com.rockthejvm.livedemo.core.*
import com.rockthejvm.livedemo.http.*

object Application extends IOApp.Simple {
  def makePostgres = for {
    ec <- ExecutionContexts.fixedThreadPool[IO](32)
    transactor <- HikariTransactor.newHikariTransactor[IO](
      "org.postgresql.Driver",
      "jdbc:postgresql://localhost:5444/",
      "docker",
      "docker",
      ec
    )
  } yield transactor



  override def run: IO[Unit] = ??? // for now
}
```

After having the Postgres instance running, we need to build the server with the rest of the for-comprehension. That is:

```scala
// inside `Application`
  def makeServer = for {
    postgres <- makePostgres
    jobs     <- JobsLive.resource[IO](postgres)
    jobApi   <- JobRoutes.resource[IO](jobs)
    server <- EmberServerBuilder
      .default[IO]
      .withHost(host"0.0.0.0")
      .withPort(port"4041")
      .withHttpApp(CORS(jobApi.routes.orNotFound))
      .build
  } yield server
```

And now we need to be able to use this resource, by keeping it alive forever:

```scala
// in `Application`
override def run: IO[Unit] =
  makeServer.use(_ => IO.println("Rock the JVM! Server ready.") *> IO.never)
```

If you run the application, you should now be able to use cURL or httpie to interact with it.

Congratulations, we now have the server ready!

## 6. Frontend

Before we get started on the frontend, we need to be able to share the domain model between multiple compilation modules in our project. For this, we will need to
- create a `src/main/scala` directory inside the `shared` directory of the `common` module
- move the `com/rockthejvm/livedemo/domain` folder to the newly created directory

The IDEs might get scared at such a massive move, but a restart of the build server should take things back to green again. The move is very important, and also very powerful &mdash; the ability to share code between frontend and backend is one of the most underrated features of Scala, with no need for API updates, schema generation and synchronization, or other third-party definitions. Every relevant piece is written 100% in Scala, with compilation updates managed by the build tool. Amazing!

After the move, let's briefly describe how the frontend application works. We will need a few things ready; you can follow them in the `app` module if you've cloned the repository, or you can build them from scratch by looking at the code below.

The first thing we need is an HTML page to render. The relevant page itself needs to just contain a `<body>` tag with a `<div>` inside. In that div, the entire Scala application will be mounted. This is an almost identical page that we use in the Typelevel Rite of Passage:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Rock the JVM Demo App</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" href="./static/img/icon.png"  type="image/png">
		<link rel="apple-touch-icon" href="./static/img/icon.png" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
		<link rel="stylesheet" href="./css/style.css">
	</head>
	<body>
		<div id="app"></div>
		<script type="module" src="./app.js"></script>
	</body>
</html>
```

The relevant part is the `<div id="app">` tag. Inside here, we run the JavaScript called `app.js` (which we will cover shortly), whose job is to change the contents of this div into whatever we specify in ScalaJS.

Second important thing: the main `app.js`. The JavaScript is a 2-liner and looks like this:

```js
import { RockTheJvmApp } from './target/scala-3.3.1/app-fastopt.js';
RockTheJvmApp.launch("app")
```

This might look a bit strange. We know that ScalaJS will compile _all_ Scala code into a single file called `app-fastopt.js`, located in the `target` directory of this module. The main object will be called `RockTheJvmApp` because that's what we'll write in Scala, to be explained shortly. That object will have a method called `launch`, which will start changing the contents of the `app` div that we specified in `index.html`.

The third important thing: JavaScript packages and a local server to show us locally-built HTML and JS. This is managed by NPM (so make sure you have node.js NPM installed) and it's described in a `package.json` file. Still in the root of `app`, the `package.json` file looks like this:

```json
{
	"scripts": {
		"start": "parcel index.html --no-cache --dist-dir dist --log-level info"
	},
	"devDependencies": {
		"parcel": "^2.1.0",
		"process": "^0.11.10",
		"sass": "^1.34.0"
	},
	"dependencies": {
		"moment": "^2.29.4"
	}
}
```

We will use a bundler and server called Parcel to package the HTML and JavaScript into one set of files that we can (in theory) simply copy and paste to a static web server if we want to ship the frontend.

Before writing any Scala code, in the root of `app` run the command `npm install` to install all the library dependencies for JavaScript. Because we have very few dependencies, the command should not take too long.

The Scala code that we write in the frontend is not very different to the code we write on the backend: we still need to create a source dir and a package, so go ahead and create the directory `src/main/scala/com/rockthejvm/livedemo` and in it, create an object called `App`.

The `App` object currently looks like this (include the imports, they save a lot of headache later):

```scala
import scala.scalajs.js
import scala.scalajs.js.annotation.*

import cats.effect.*
import tyrian.*
import tyrian.Html.*
import tyrian.http.*
import io.circe.syntax.*
import io.circe.parser.*
import io.circe.generic.auto.*

object App {

}
```

This App will be a Tyrian application.

Tyrian has very few rules at its roots. The core mechanism of a Tyrian app is as follows:
- we have the concept of a _model_, which is the _data_ currently being "held" in the app; think of it as the _state_ of the application
- a function called `view` is always invoked on the model, which returns the HTML that is being injected in that `<div id="app">` in the main HTML
- if the model ever changes, Tyrian calls the `view` on the new model automatically

How can the model ever change? Tyrian offers a function to _update_ the model. The data that tells Tyrian _how_ to update the model is called a _message_. So the function to update the model is of the sort `(Model, Message) => Model`.

So the model can be changed with a _message_. But who (or what) can _send_ a message? The act of sending a message is called a _command_. When you create a `Cmd` aka a command, Tyrian will unpack that command, extract the message, and subject it to the update function. If the model changes, the view (meaning the web page) will update automatically. As a result of updating the model, we might need to send a further command as a "reaction", which is why the update function is not truly of the sort `(Model, Message) => Model`, but `(Model, Message) => (Model, Cmd)`.

So we know that a model determines the view (=UI), the model can be changed via messages, and messages can be sent via commands. But how does an application start? We (the programmer) are the ones to determine the initial model and the initial command.

Additionally, Tyrian offers us the ability to send messages automatically by subscribing to events, for example browser navigation for single-page applications. Any value "emitted" by the subscription stream sends a new message &mdash; which in turn triggers a model change, then a view change, etc.

In light of the above (very short) description, the definition of a Tyrian app looks like this:

```scala

trait Msg
trait Model

@JSExportTopLevel("RockTheJvmApp")
object App extends TyrianApp[Msg, Model] {
  override def init(flags: Map[String, String]): (Model, Cmd[IO, Msg]) = ???

  override def view(model: Model): Html[Msg] = ???

  override def update(model: Model): Msg => (Model, Cmd[IO, Msg]) = ???

  override def subscriptions(model: Model): Sub[IO, Msg] = ???
}
```

To recap:
- we have to specify the types of the model and message, i.e. the structure of the state, and the possible descriptions of how we can change the state
- we have a `view` function that, given a Model, returns an HTML; whenever the model changes, this `view` is invoked automatically
- we have an `update` function, which, given a model and a message, returns a new model, _plus_ a possible Cmd that might send another message when done
- we have an `init` function that returns the initial model with an initial command that might, for example, fetch the first blob of data from the backend
- we have a `subscriptions` function that allows us to send messages based on various streams of events, e.g. timed events or browser navigation events

All of this is still quite abstract, so let's make it concrete. In this (very simple) frontend, let's imagine that upon loading the application, we need to send the first backend call and return the first list of Jobs from the backend, so that we can display that list in the frontend.

In this case, the Model is a case class containing the `List[Job]` that we might want to render on screen (as nice HTML). In terms of update: we can decide to change the model by either
- doing nothing, e.g. a no-op
- adding new jobs to the model
- showing an error

So the relevant data types for our needs might look like this:

```scala3
enum Msg {
  case NoMsg
  case LoadJobs(jobs: List[Job])
  case Error(e: String)
}

case class Model(jobs: List[Job] = List())
```

We can start implementing the 4 fundamental methods with the `init` method, which will create the first (empty) Model, along with the first command to ever run in the app once mounted:

```scala
  def backendCall: Cmd[IO, Msg] = ???

  override def init(flags: Map[String, String]): (Model, Cmd[IO, Msg]) =
    (Model(), backendCall)
```

The `backendCall` is the first command that will ever be run. It will send a backend call to the server, and when it returns, we will parse the payload and create one of the `Msg` types, which will be automatically processed by Tyrian. We will implement the backend call shortly.

The second method we can implement is the `view`, which returns the HTML appropriate for the value of the model:

```scala
  override def view(model: Model): Html[Msg] =
    div(`class` := "row")(
      p("This is the first ScalaJS app by Rock the JVM"),
      div(`class` := "contents ")(
        model.jobs.map { job =>
          div(job.toString)
        }
      )
    )
```

In Tyrian, all HTML tags have corresponding methods which can take child elements as argument, much like proper HTML tags contain child tags inside. The returned value is of type `Html[Msg]`, because the HTML we return might be active and can send `Msg` elements either on their own, or as a result of a user interaction (e.g. a button click or form update). This particular implementation doesn't send anything because the elements contained are passive (plain paragraphs and divs).

An easy method to implement (because it's mostly ignored) is subscriptions. We don't care about any sort of event, so we return an empty subscription:

```scala
  override def subscriptions(model: Model): Sub[IO, Msg] =
    Sub.None
```

Which leaves us with the update function. Given the subtypes of `Msg`, all we have to do is pattern match the possible values:

```scala
  override def update(model: Model): Msg => (Model, Cmd[IO, Msg]) = msg =>
    msg match {
      case Msg.NoMsg          => (model, Cmd.None)
      case Msg.Error(e)       => (model, Cmd.None)
      case Msg.LoadJobs(list) => (model.copy(jobs = model.jobs ++ list), Cmd.None)
    }
```

The only place where anything interesting happens is the `Msg.LoadJobs(list)` value: if we somehow emit/send this message, the model will be updated, which in turn will trigger a UI update on the page.

So we have all the functions implemented, except the backend call. Tyrian offers us some basic HTTP capabilities, and the backend call will create an HTTP request, send it to the backend, then the result will be parsed and turned into one of the `Msg` types. The function looks as follows:

```scala
  def backendCall: Cmd[IO, Msg] =
    Http.send(
      Request.get("http://localhost:4041/jobs"),
      Decoder[Msg](
        resp =>
          parse(resp.body).flatMap(_.as[List[Job]]) match {
            case Left(e)     => Msg.Error(e.getMessage())
            case Right(list) => Msg.LoadJobs(list)
          },
        err => Msg.Error(err.toString)
      )
    )
```

The relevant pieces are:
- `Http.send`, which takes an HTTP request and a decoder
- the Decoder, which contains two functions: how to parse an HTTP response, and how to parse an HTTP error
- the HTTP response parser uses Circe (manually) to `parse(resp.body)` and then pattern match on the result to build a `Msg` instance

And at this point, we have the Tyrian app ready. The full Tyrian app is below:

```scala
package com.rockthejvm.livedemo

import scala.scalajs.js
import scala.scalajs.js.annotation.*

import cats.effect.*
import tyrian.*
import tyrian.Html.*
import tyrian.http.*
import io.circe.syntax.*
import io.circe.parser.*
import io.circe.generic.auto.*

import com.rockthejvm.livedemo.domain.job.Job

enum Msg {
  case NoMsg
  case LoadJobs(jobs: List[Job])
  case Error(e: String)
}

case class Model(jobs: List[Job] = List())

@JSExportTopLevel("RockTheJvmApp")
object App extends TyrianApp[Msg, Model] {

  def backendCall: Cmd[IO, Msg] =
    Http.send(
      Request.get("http://localhost:4041/jobs"),
      Decoder[Msg](
        resp =>
          parse(resp.body).flatMap(_.as[List[Job]]) match {
            case Left(e)     => Msg.Error(e.getMessage())
            case Right(list) => Msg.LoadJobs(list)
          },
        err => Msg.Error(err.toString)
      )
    )

  override def init(flags: Map[String, String]): (Model, Cmd[IO, Msg]) =
    (Model(), backendCall)

  override def view(model: Model): Html[Msg] =
    div(`class` := "row")(
      p("This is the first ScalaJS app by Rock the JVM"),
      div(`class` := "contents ")(
        model.jobs.map { job =>
          div(job.toString)
        }
      )
    )

  override def update(model: Model): Msg => (Model, Cmd[IO, Msg]) = msg =>
    msg match {
      case Msg.NoMsg          => (model, Cmd.None)
      case Msg.Error(e)       => (model, Cmd.None)
      case Msg.LoadJobs(list) => (model.copy(jobs = model.jobs ++ list), Cmd.None)
    }

  override def subscriptions(model: Model): Sub[IO, Msg] =
    Sub.None
}
```

## 6. Running Everything

This is a full-stack app, so we need to run many pieces for everything to work:

1. We need the database to be running, so make sure you have it active or run `docker-compose up` in the `db` directory.
2. We need the `Application` in the `server` module to run, which you can start either in IntelliJ/Metals or in SBT.
3. We need to compile the frontend, so open an SBT console, run `project app`, then run `~fastOptJS` to continuously compile the Scala code to JS.
4. We need to serve the resulting HTML and JS, so in the root of the `app` directory, run `npm run start`

After this, navigate to `http://localhost:1234` and you should see the list of all the jobs in the database displayed on the front page. True, they're just regular strings, but you can now show them with any sort of fancy UIs, with nice layouts and CSS.

## 7. Conclusion

In this article, you've learned how to build a full-stack Scala 3 application from (almost) scratch. You've learned how to use Typelevel libraries to describe effects, how to build core modules and web servers, and you've learned how to use Tyrian for a purely functional web server. Most importantly, these independent modules work with sharing code between the JVM and JS, which is one of the most underrated features of Scala, making it a truly full-stack language.

If you like what you've seen in this article, check out the [Typelevel Rite of Passage](https://rockthejvm.com/p/typelevel-rite-of-passage), where we take all the ideas here to a production-grade level.
