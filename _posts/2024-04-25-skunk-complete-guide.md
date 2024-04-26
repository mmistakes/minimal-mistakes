---
title: "The Skunk Scala Library for Database Interaction: A Comprehensive Guide"
date: 2024-04-25
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [skunk]
excerpt: "Learn how to use the Skunk library to interact with PostgreSQL database in a type-safe and non-blocking manner."
---

_by [Derick Bomen](https://www.linkedin.com/in/bomen-derick-b6b06517b/)_

## 1. Introduction

In modern application development, efficient database interactions are crucial for building scalable and maintainable systems. Scala, being a versatile language, offers various tools and libraries to streamline these interactions. One such powerful tool among others ([Doobie](https://index.scala-lang.org/tpolecat/doobie/artifacts/doobie-hikari/0.9.0?binary-version=_2.13), [Slick](https://index.scala-lang.org/slick/slick), [Quill](https://index.scala-lang.org/zio/zio-quill) etc) is the [Skunk Scala library](https://typelevel.org/skunk/), which provides a functional and typesafe interface for PostgreSQL databases access in Scala applications. In this article, we'll delve deep into Skunk, exploring its features and demonstrating how to interact with a database effectively in a non-blocking manner.

## 2. What is Skunk?

Skunk is a robust Scala library that has been specifically crafted to offer optimal database access to PostgreSQL. Its functional, typesafe, resource-safe session, and composable interface provides a high level of type-safety, ensuring that SQL queries are checked at compile-time. With Skunk, developers can expect a reliable and efficient way to interact with PostgreSQL databases. Its advanced features offer a seamless and typesafe experience that enables developers to streamline their database access and management. Skunk is the perfect choice for developers who strive to achieve efficient and secure database access while maintaining a high level of type-safety.

> Skunk is part of the Typelevel ecosystem of libraries. If you want some intense hands-on experience with Scala and the Typelevel stack, you'll greatly enjoy the [Typelevel Rite of Passage](https://rockthejvm.com/p/typelevel-rite-of-passage) course. It's the biggest course on Rock the JVM, where you'll write a full-stack, production-grade application from scratch, including authentication, credit card checkout, email services, comprehensive test coverage, etc. Check it out [here](https://rockthejvm.com/p/typelevel-rite-of-passage).

## 3. Understanding Skunk Core Concepts

Before diving into the practical implementation, let's familiarize ourselves with Skunk's core concepts:

* __Session Management:__ Skunk manages database sessions using resources, ensuring proper resource cleanup after each database interaction.
* __SQL Interpolation:__ Skunk provides a type-safe SQL interpolation mechanism, allowing developers to construct SQL queries with compile-time validation.
* __Type Mapping:__ Skunk maps Scala data types to PostgreSQL data types automatically, reducing boilerplate code and enhancing type safety.
* __Query Execution:__ Skunk supports both query execution and statement preparation, enabling efficient database interactions.

Before we delve into each concept, ensure you have the following prerequisites installed:

* [Scala and sbt (Scala Build Tool)](https://docs.scala-lang.org/getting-started/sbt-track/getting-started-with-scala-and-sbt-on-the-command-line.html)
* [Docker engine]( https://docs.docker.com/engine/install/)
* [Docker-compose](https://docs.docker.com/compose/install/)

To build and manage our Scala project, we will be using _Scala_ and _sbt_. To run a PostgreSQL database, we will be using _Docker_ as a containerized service. This involves pulling a PostgreSQL image from _Docker Hub_ (the official repository for Docker images), and running it as a container in our Docker installed system.

> Tip: for better Skunk support in IntelliJ IDEA with syntax highlighting, warnings etc., you may want to install the [skunk-intellij](https://github.com/trobert/skunk-intellij) plugin.

Our proposed use case involves developing an application that allows the creation, reading, updating, and deleting of user data (CRUD operations). The application will make use of Skunk concepts to interact with a PostgreSQL database and manage user data. Our objective with this use case is to showcase the effectiveness of Skunk in database management. By utilizing Skunk concepts, the application will demonstrate how to perform CRUD operations on a PostgreSQL database effortlessly and efficiently.

Let's set up a new Scala (Scala version 3.x) project using sbt. After that, we can add Skunk Scala library and [pureconfig-core](https://www.javadoc.io/doc/com.github.pureconfig/pureconfig-core_3/latest/index.html) as dependencies in our `build.sbt` file. Pureconfig-core will help us to load our configuration values found in `application.conf` needed to establish our database session.

```scala
libraryDependencies ++= Seq(
  "org.tpolecat" %% "skunk-core" % "0.6.3",
  "com.github.pureconfig" %% "pureconfig-core" % "0.17.5"
)
```

With our dependencies loaded to our project, we can explore each of these concepts in detail and demonstrate how to leverage Skunk effectively. However, before diving into that, Let's start by defining our domain and setting up environment variables that will be used to launch our docker container.

## 4. Creating a Domain

This guide will help us identify the data to manipulate in our database session.
* `User.scala` placed in `src/main/scala/com/rockthejvm/domain`. This will guide us on the necessary _fields_ and _data types_ to create our `users` table (We will create the table in a short while.) for storing `User` data.

```scala
import java.util.UUID

final case class User (
  id: UUID,
  name: String,
  email: String
)
```

* `Config.scala` placed in `src/main/scala/com/rockthejvm/domain`. This represent the configuration values that we have set in our `application.conf` file (We will create it shortly) for our PostgreSQL database. The `derives` clause automatically derive config values for our `Config` case class using PureConfig provided we have the right imports in scope as shown in the code snippet below. This automatically provide us with a `given ConfigReader instance` useful to read our config values. Check [pureconfig](https://pureconfig.github.io/docs/index.html) for more details.

```scala
import pureconfig.ConfigReader
import pureconfig.generic.derivation.default.*

final case class Config (
    host: String,
    port: Int,
    username: String,
    password: String,
    database: String
) derives ConfigReader
```

## 5. Creating and Using Resources

Configuration values reflecting our domain to be used throughout our project.

* `application.conf` placed in `src/main/resources`. Here we set our configuration values needed to establish our database session. The key-value pairs that are set up in this file must correspond to the values specified in our `Config` case class.

```scala
db{
    host: "localhost"
    port: 5432
    username: "postgres"
    password: "postgres"
    database: "skunk"
  }
```
* `tables.sql` placed in `/database` under the root project. We need to write a SQL statement to create a `users` table in our database. As previously mentioned, the **fields** and **data types** of the created table (`users` in our case) should match the **values** and **data types** of the domain to be stored in (`User` in our case).

```sql
CREATE TABLE IF NOT EXISTS users (
  id      UUID    PRIMARY KEY,
  name    VARCHAR        NOT NULL,
  email   VARCHAR UNIQUE NOT NULL
);
```
* We can now create a `docker-compose.yml` file (which can be placed in the root directory of our project) to spin up a docker container running a postgreSQL image with the given environment values. Please ensure that the database credentials in this file match the postgres configuration values set in `application.conf`. `tables.sql` is used by docker as an entry point to initialize our database and provide a volume to store our data.

```scala
version: "3.3"

services:
  postgres:
    restart: always
    image: postgres:13.0-alpine
    ports:
      - "5432:5432"
    environment:
      - DEBUG=false
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=skunk
    volumes:
      - ./database/tables.sql:/docker-entrypoint-initdb.d/init.sql
```

## 6. Setting Up a Database Connection

To begin interacting with the database using Skunk, establish a database connection. This involves configuring the connection parameters such as host, port, username, password, and database name. Skunk provides a convenient way to manage database sessions using resources.

Before establishing our database connection, let's start our Docker container by running the following command; `docker-compose up` in the terminal at the root directory or wherever we placed our `docker-compose.yml` file.

We then create a `main.scala` file in our project where we will test our codes.
Good! Now let's create an object named `DbConnection` to establish a database connection, allowing us to choose between two connection types: `single` or `pooled`, based on the provided configuration values.

```scala
import cats.effect.{Temporal, Resource}
import cats.effect.std.Console
import fs2.io.net.Network
import natchez.Trace
import skunk.Session
import com.rockthejvm.domain.Config

object DbConnection {
  def single[F[_] : Temporal : Trace : Network : Console](config: Config): Resource[F, Session[F]] =
    Session.single(
      host = config.host,
      port = config.port,
      user = config.username,
      password = Some(config.password),
      database = config.database,
    )

  def pooled[F[_] : Temporal : Trace : Network : Console](config: Config): Resource[F, Resource[F, Session[F]]] =
    Session.pooled(
      host = config.host,
      port = config.port,
      user = config.username,
      password = Some(config.password),
      database = config.database,
      max = 10
    )
}
```
Let's take a closer look at creating a database connection, as it involves several given instances that may seem overwhelming at first. However, we're here to help and provide a clear explanation of the purpose and use of each of these instances, to help you move forward with confidence.

In Skunk, given instances such as `Temporal, Trace, Network, and Console` play essential roles in defining database connections using `Session.single` and `Session.pooled`. These instances are used to handle various aspects of database interaction, logging, and tracing.

1. `Temporal`
  * **Purpose**: Work with time-related effects that provide operations for dealing with time-based computations such as delays, timeouts, and scheduling.
  * **Use**: Some common uses are delaying execution through its `sleep` method that suspend a thread for a specific duration, timeout handling which allows you to execute fallback logic or abort computations if they take too long to complete, and task scheduling which enables you to schedule tasks to be executed at a specific point in time or after a certain delay.

2. `Trace`
  * **Purpose**: Responsible for distributed tracing, allowing us to monitor the flow of requests across services and components.
  * **Use**: Tracing provides insights into database interactions, helping to identify bottlenecks, failures, or performance issues within our application. You can integrate Skunk with your preferred tracing system, such as [Zipkin](https://zipkin.io/pages/quickstart) by providing appropriate Trace instances.

3. `Network`
  * **Purpose**: Work with network-related effects by encapsulating the functionality related to network communication, such as connecting to remote hosts, sending and receiving data over sockets, and managing network resources.
  * **Use**: The `Network` type class can be used for handling socket connections by providing methods for managing socket connections, including reading and writing data to and from sockets, handling timeouts, and closing connections gracefully.

4. `Console`
  * **Purpose**: Provides logging functionality to output messages to the console.
  * **Use**: Console instances are useful for logging debug information, errors, or other messages related to database interactions. They enable us to monitor the behavior of our application and diagnose issues during development and debugging. These messages can be logged to the console or redirected to other logging systems as needed.

  In summary, these given instances (`Temporal, Trace, Network, Console`) are crucial for configuring and managing database connections in Skunk as they ensure correct data handling.

  Hopefully we uunderstand the roles of the above instances in creating a skunk database connection, let's use `IOApp` from cats-effect as a context to create a connection and test our connection by simply querying our current date and time.

  ```scala
  ...
  import cats.effect.{ExitCode, IO, IOApp}
  import pureconfig.ConfigSource
  import pureconfig.error.ConfigReaderFailures
  import skunk.*
  import skunk.syntax.all.*
  import skunk.codec.all.*
  import natchez.Trace.Implicits.noop
  import com.rockthejvm.modules.DbConnection

  object main extends IOApp {

    def singleSession(config: Config): IO[Unit] = DbConnection.single[IO](config).use { session =>
      for {
        _           <- IO(println("Using a single session..."))
        dateAndTime <- session.unique(sql"select current_timestamp".query(timestamptz))
        _           <- IO(println(s"Current date and time is $dateAndTime."))
      } yield ()
    }

    def pooledSession(config: Config): IO[Unit] = DbConnection.pooled[IO](config).use { resource =>
      resource.use { session =>
        for {
          _           <- IO(println("Using a pooled session..."))
          dateAndTime <- session.unique(sql"select current_timestamp".query(timestamptz))
          _           <- IO(println(s"Current date and time is $dateAndTime."))
        } yield ()
      }
    }

    override def run(args: List[String]): IO[ExitCode] = {
      val config: Either[ConfigReaderFailures, Config] = ConfigSource.default.at("db").load[Config]
      config match
      case Left(configFailure) =>
        for {
          _ <- IO(println(configFailure.prettyPrint(2)))
        } yield ExitCode.Success

      case Right(configValues) =>
        singleSession(configValues) *> pooledSession(configValues) *> IO.pure(ExitCode.Success)
    }
  }
  ```
  We first load configuration values from `application.conf`. If values are properly set up, we pass the config values to both methods `singleSession` and `pooledSession` to establish our database connections with the help of `DbConnection` object we previously created and run both connections in a sequence. Otherwise, we print errors to the console to better understand what went wrong. We now test our database connections by fetching the current date and time of our system, and if our connections was succesfully established, we should have an output similar to the following.
  ```
  Using a single session...
  Current date and time is 2024-02-20T17:29:20.972023Z.
  Using a pooled session...
  Current date and time is 2024-02-20T17:29:21.058790Z.
  ```
  `Session.single` and `Session.pooled` are two distinct methods for establishing database connections, each with its own approach for managing connections. The following comparison can assist you in selecting the method that is most suitable for your application's needs and scalability requirements. For simplicity, we will use `Session.single` throughout, but feel free to experiment with `Session.pooled` to understand its benefits.

  |Feature        | Session.single | Session.pooled |
  |---------------|----------------|----------------|
  |Connection Management | Creates a single connection per session. | Manages a pool of connections.
  |Suitable For | Low database load or manual connection management. | High database load or automatic connection pooling.
  |Connection Reuse  |Each call establishes a new connection. | Reuses existing connections from the pool.
  |Performance | May have higher overhead due to frequent connection           establishment. | Generally more efficient due to connection pooling.

## 7. Type Mapping in Skunk

Let's talk about type mapping as it is an essential concept that helps us in the execution of skunk queries and commands. It's a process of converting between PostgreSQL data types and corresponding Scala types. This mapping ensures that data retrieved from the database can be represented and manipulated in a type-safe manner within Scala code. Through the use of `Codec`(encoder and decoder), we can create a mapping between fields from our `users` table and values from our `User` case class as follow. In Skunk, we can use three different techniques to form tuples during mappings: `regular tuples`, `twiddle tuples`, and the `~` operator. However, the `~` operator has been deprecated since version 0.6.

```scala
import cats.syntax.all.*
import skunk.*
import skunk.codec.all.*
import skunk.syntax.all.*
import com.rockthejvm.domain.User

object main extends IOApp {
  // Using regular tuples
  val codec: Codec[User] =
    (uuid, varchar, varchar).tupled.imap {
      case (id, name, email) => User(id, name, email)
    } { user => (user.id, user.name, user.email) }

  // Using twiddle tuples
  val codecTwiddle: Codec[User] =
    (uuid *: varchar *: varchar).imap {
      case id *: name *: email *: EmptyTuple => User(id, name, email)
    }(user => user.id *: user.name *: user.email *: EmptyTuple)

  // Using the `~` operator
  val codec2: Codec[User] =
    (uuid ~ varchar ~ varchar).imap {
      case id ~ name ~ email => User(id, name, email)
    }(user => user.id ~ user.name ~ user.email)
...
...
}
```
Twiddle tuples are built incrementally, element by element, via the `*:` and `EmptyTuple` operations which are also made available in Scala 3 standard library and operate exactly the same. On Scala 2, the Twiddles library defines `*:` and `EmptyTuple` as aliases for Shapeless HLists. Check [Twiddle Lists](https://typelevel.org/skunk/reference/TwiddleLists.html) for more details.
The `~` operator build left-associated nested pairs of values to form tuples.

To keep things simple, we will use regular tuples going forward.

Please add the above values to our `main.scala` file as it will help us set up our SQL statements.
We shall soon see these conversions in use as we interact with our database through queries and commands.

## 8. SQL Interpolation (Query and Command)

Skunk offers type-safe SQL interpolation, enabling us to construct SQL statements with compile-time validation. It ensures that SQL statements are both syntactically correct and type-safe. There are two types of SQL statements that Skunk can build: queries and commands. In this sections, we will demonstrate both types of statements on a table of users we previously created.

> `Skunk queries` are parameterized sql statements where the input and output types represent the type of parameters and the structure of the result set, respectively. While `skunk commands` are parameterized sql statements by input type only, as it does not return a result set.

Still in our `main.scala` file, let's create an SQL statement (Skunk Command). This Skunk Command will allow us to insert user data into our `users` table. We'll define the user data to be inserted as an argument.

```scala
val insert: Command[User] =
  sql"""
      INSERT INTO users
      VALUES ($codec)
    """.command

val userId: UUID = UUID.randomUUID()
val userData: User = User(userId, "Jacob", "jacob@email.com")
```
With our command and data in place, we can use our database session previously established to prepare and execute the command.

```scala
....
....
  val resource: Resource[IO, Session[IO]] = DbConnection[IO].single(configValues)
  resource.use { session =>
    for {
      command  <- session.prepare(insert)
      rowCount <- cmd.execute(userData)
      _        <- IO(println(s"Inserted $rowCount row(s) with id: $userId"))
    } yield ExitCode.Success
  }
```
After calling `Session.prepare`, a prepared command is created using our defined command to be executed on `userData`. Following this, the `execute` method is used, and the number of affected rows is returned. Finally, we print the user-created ID to the console. When this command is executed, the output will be similar to the following.
```
Inserted Insert(1) row(s) with id: b68f2676-611e-4db2-af80-0458e9c52bd3
```
To fetch the user we created using the obtained id, we will use a skunk query. The input of the query will be the user's id, and the output will be a User object. The query is constructed as follows:

```scala
....
....
  val selectById: Query[UUID, User] =
    sql"""
        SELECT * FROM users
        WHERE id = $uuid
      """.query(codec)
```
It's worth noting that we still use `codec` conversion to automatically convert obtained PostgreSQL types to our Scala types. The query to be executed is prepared similarly to the previous command.

```scala
....
....
resource.use { session =>
  for {
    query <- session.prepare(selectById)
    res   <- query.option(UUID.fromString("67b5d283-f48a-4a00-87e0-fb60e36e9d8a"))
    _     <- res match
      case Some(user) => IO(println(s"User found: $user"))
      case None       => IO(println(s"No user found with id: $userId")) *> IO.raiseError(new NoSuchElementException())
  } yield ExitCode.Success
}
```
After preparing our query, we fetch a maximum of one row by using the `option` method along with the provided id as an argument. If a user is found, we'll print the result to the console. However, if no user is found, we'll raise an error with a message indicating that no user was found. Executing this query in our `main.scala` file with a known user id should give an output similar to the following

```
User found: User(b68f2676-611e-4db2-af80-0458e9c52bd3,Jacob,jacob@email.com)
```

## 9. Refactoring
Let's refactor our code in a functional style and add support for basic CRUD operations.
Given we're leveraging the use of a purely functional library, we shall continue writing purely functional code throughout using the tagless final approach.

### 9.1. Database Repository
To prevent the need to repeatedly prepare queries and commands while interacting with our database, a `Repository` trait is introduced. This trait defines certain methods that provide a generic way to write queries and commands, which can be used to interact with the database while also offering a generic data type.

 This file is placed in `src/main/scala/com/rockthejvm/db`.

```scala
import cats.effect.Sync
import cats.syntax.all.*
import skunk.{Command, Query, Session}

// While F is the effect type, E represents the domain to be used, and A the argument type
trait Repository[F[_], E](session: Session[F]) {
  protected def findOneBy[A](query: Query[A, E], argument: A)(using F: Sync[F]): F[Option[E]] =
    for {
      preparedQuery <- session.prepare(query)
      result        <- preparedQuery.option(argument)
    } yield result

  protected def update[A](command: Command[A], argument: A)(using F: Sync[F]): F[Unit] =
    for {
      preparedCommand <- session.prepare(command)
      _               <- preparedCommand.execute(argument)
    } yield ()
}
```
Our trait takes an instance of `Session[F]` useful to establish a database session. However, this is possible only for `Scala 3` as the app written in this article is based on Scala 3 features.

We a `findOneBy` method that can be used to fetch a specific row from a table such as fetching a user given the user's id.
An `update` method for operations that update the state of the database such as deleting from a database.

###  9.2. User Repository
Still in the package `src/main/scala/com/rockthejvm/db`, we define a `UserRepository` class to handle the `User` domain.

```scala
import cats.effect.Sync
import cats.syntax.all.*
import fs2.Stream
import skunk.{Codec, Command, Query, Session, Void}
import skunk.codec.all.*
import skunk.syntax.all.*
import com.rockthejvm.domain.User

import java.util.UUID

final class UserRepository[F[_]: Sync](session: Session[F])
  extends Repository[F, User](session) {
  import UserRepository.*

  def create(name: String, email: String): F[UUID] =
    for {
      cmd    <- session.prepare(insert)
      userId = UUID.randomUUID()
      _      <- cmd.execute(User(userId, name, email))
    } yield userId

  def findAll: Stream[F, User] =
    Stream.evalSeq(session.execute(selectAll))

  def findById(id: UUID): F[Option[User]] =
    findOneBy(selectById, id)

  def update(user: User): F[Unit] =
    update(_update, user)

  def delete(id: UUID): F[Unit] =
    update(_delete, id)

}

object UserRepository {
  def make[F[_]: Sync](session: Session[F]): F[UserRepository[F]] =
    Sync[F].delay(new UserRepository[F](session))

  private val codec: Codec[User] =
    (uuid, varchar, varchar).tupled.imap {
      case (id, name, email) => User(id, name, email)
    } { user => (user.id, user.name, user.email) }

  private val selectAll: Query[Void, User] =
    sql"""
        SELECT * FROM users
      """.query(codec)

  private val selectById: Query[UUID, User] =
    sql"""
        SELECT * FROM users
        WHERE id = $uuid
      """.query(codec)

  private val insert: Command[User] =
    sql"""
        INSERT INTO users
        VALUES ($codec)
      """.command

  private val _update: Command[User] =
    sql"""
        UPDATE users
        SET name = $varchar, email = $varchar
        WHERE id = $uuid
      """.command.contramap { user => (user.name, user.email, user.id)
    }

  private val _delete: Command[UUID] =
    sql"""
        DELETE FROM users
        WHERE id = $uuid
      """.command.contramap(i => i)
}
```
The `UserRepository` defines methods that allow us to interact with our database. It extends our `Repository` trait and specifies the data type that the repository will handle, which in this case is `User`.
A **smart constructor** is placed in its companion object which is used to enforce constraints and control the creation of our `UserRepository` instances.

```scala
def make[F[_]: Sync](session: Session[F]): F[UserRepository[F]] =
  Sync[F].delay(new UserRepository[F](session))
```
Using this technique helps us enforce constraints, perform validation, and ensure data integrity within our code.

We've included additional queries and commands to the companion object, similar to the ones we previously covered. Thus, we won't spend much time discussing them as the same logic applies.

```scala
private val _update: Command[User] =
  sql"""
      UPDATE users
      SET name = $varchar, email = $varchar
      WHERE id = $uuid
    """.command.contramap { user => (user.name, user.email, user.id)
  }
```
Let's discuss how the `_update` command works as it appears to be a bit different from other commands. It updates the `name` and `email` fields of a user based on their `id`. The input to this command is a `User` object. The code's `.command` part converts the SQL query into a Skunk Command object. The `.contramap` part maps the input values to the parameters expected by the SQL command and orders them according to the SQL query. In this case, it maps the properties of the `User` object to a tuple of `name`, `email`, and `id` in that order.

### 9.3 Database Connection

We have created a package (`src/main/scala/com/rockthejvm/modules`) that contains an object used to establish our two different types of database connections based on the provided configuration values. We already explain this concept, please refer to [section 6](#6-setting-up-database-connection) for a refresh.

```scala
import cats.effect.{Resource, Temporal}
import cats.effect.std.Console
import com.rockthejvm.domain.Config
import fs2.io.net.Network
import natchez.Trace
import skunk.Session

object DbConnection {
  def single[F[_] : Temporal : Trace : Network: Console](config: Config): Resource[F, Session[F]] =
    Session.single(
      host = config.host,
      port = config.port,
      user = config.username,
      password = Some(config.password),
      database = config.database,
    )

  // max = 10 represent a maximum of 10 concurrent sessions
  def pooled[F[_] : Temporal : Trace : Network: Console](config: Config): Resource[F, Resource[F, Session[F]]] =
    Session.pooled(
      host = config.host,
      port = config.port,
      user = config.username,
      password = Some(config.password),
      database = config.database,
      max = 10
    )
}
```

### 9.4. Our `main.scala` file
We refactored our main file and reduce boilerplate code by extracting logic into separate files. This is how our main file looks now.

```scala
import cats.effect.{ExitCode, IO, IOApp}
import cats.syntax.all.*
import pureconfig.ConfigSource
import pureconfig.error.ConfigReaderFailures
import skunk.Session
import skunk.syntax.all.*
import natchez.Trace.Implicits.noop
import com.rockthejvm.db.UserRepository
import com.rockthejvm.domain.{Config, User}
import com.rockthejvm.modules.DbConnection

object main extends IOApp {

  override def run(args: List[String]): IO[ExitCode] =
    val config: Either[ConfigReaderFailures, Config] = ConfigSource.default.at("db").load[Config]
    config match
      case Left(configFailure) =>
        for {
          _ <- IO(println("Failed to load configurations"))
          _ <- IO(println(configFailure.prettyPrint()))
        } yield ExitCode.Success

      case Right(configValues) =>
        DbConnection.single[IO](configValues).use {session =>
          for {
            userRepo <- UserRepository.make[IO](session)
            _ <- IO(println("Creating users" + "_" * 50))
            johnId <- userRepo.create("John", "email@john.com")
            _ <- IO(println(s"John created with id: $johnId"))
            jacobId <- userRepo.create("Jacob", "email@jacob.com")
            _ <- IO(println(s"Jacob created with id: $jacobId"))
            kendrickId <- userRepo.create("Kendrick", "email@kendrick.com")
            _ <- IO(println(s"Kendrick created with id: $kendrickId"))
            _ <- IO(println("Fetching all users" + "_" * 50))
            users_1 <- userRepo.findAll.compile.toList
            _ <- IO(println(s"Users found: $users_1"))
            _ <- IO(println("Update John's email to: email@email.com" + "_" * 50))
            _ <- userRepo.update(User(johnId, "John", "email@email.com"))
            _ <- IO(println("Fetching all users" + "_" * 50))
            users_2 <- userRepo.findAll.compile.toList
            _ <- IO(println(s"Users found: $users_2"))
            _ <- IO(println("Deleting John" + "_" * 50))
            _ <- userRepo.delete(johnId)
            _ <- IO(println("Fetching all users" + "_" * 50))
            users_3 <- userRepo.findAll.compile.toList
            _ <- IO(println(s"Users found: $users_3"))
          } yield ExitCode.Success
        }
}
```
Our main file now appears cleaner because we have abstracted our logic and provided only useful methods to interact with the database session. Upon running the file, you should see an output similar to the following.

```
Creating users__________________________________________________
John created with id: d2daebdb-008c-4fd5-a61d-1d0ba933994a
Jacob created with id: b45ec9e4-4d2f-47fe-b5aa-e28da60aa3ed
Kendrick created with id: 3587ff17-8775-4eea-976a-6de7bd7312fc
Fetching all users__________________________________________________
Users found: List(User(d2daebdb-008c-4fd5-a61d-1d0ba933994a,John,email@john.com), User(b45ec9e4-4d2f-47fe-b5aa-e28da60aa3ed,Jacob,email@jacob.com), User(3587ff17-8775-4eea-976a-6de7bd7312fc,Kendrick,email@kendrick.com))
Update John's email to: email@email.com__________________________________________________
Fetching all users__________________________________________________
Users found: List(User(b45ec9e4-4d2f-47fe-b5aa-e28da60aa3ed,Jacob,email@jacob.com), User(3587ff17-8775-4eea-976a-6de7bd7312fc,Kendrick,email@kendrick.com), User(d2daebdb-008c-4fd5-a61d-1d0ba933994a,John,email@email.com))
Deleting John__________________________________________________
Fetching all users__________________________________________________
Users found: List(User(b45ec9e4-4d2f-47fe-b5aa-e28da60aa3ed,Jacob,email@jacob.com), User(3587ff17-8775-4eea-976a-6de7bd7312fc,Kendrick,email@kendrick.com))
```
Please ensure that your Docker container is running before executing your `main.scala` file.

## 10. Conclusion

In this comprehensive guide, we've explored the Skunk Scala library and its features for interacting with PostgreSQL databases by creating a reusable application that performs basic CRUD operations. Skunk's type-safe SQL interpolation, automatic type mapping, and resource-safe session management make it an excellent choice for building robust and scalable Scala applications. By mastering Skunk's core concepts and leveraging its features effectively, you can streamline PostgreSQL database interactions and focus on building innovative features for their applications.
Happy coding with Skunk!
Please note that for more detailed information, you can visit the [official documentation of Skunk](https://typelevel.org/skunk/tutorial/Setup.html).

GitHub repository: [skunk a comprehensive guide](https://github.com/bomenderick/skunk_a-comprehensive-guide).
