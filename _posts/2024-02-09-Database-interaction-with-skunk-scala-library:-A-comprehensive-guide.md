---
title: "Database interaction with skunk scala library: A comprehensive guide."
date: 2024-02-09
header:
  image: "/images/blog cover.jpg"
tags: [skunk]
excerpt: "Learn how to use Skunk Scala library to interact with PostgreSQL database in a type-safe and non-blocking manner."
---

## 1. Introduction

In modern application development, efficient database interactions are crucial for building scalable and maintainable systems. Scala, being a versatile language, offers various tools and libraries to streamline these interactions. One such powerful tool among others ([Doobie](https://index.scala-lang.org/tpolecat/doobie/artifacts/doobie-hikari/0.9.0?binary-version=_2.13), [Slick](https://index.scala-lang.org/slick/slick), [Quill](https://index.scala-lang.org/zio/zio-quill) etc) is the [Skunk Scala library](https://typelevel.org/skunk/), which provides a functional and typesafe interface for PostgreSQL databases access in Scala applications. In this article, we'll delve deep into Skunk, exploring its features and demonstrating how to interact with a database effectively in a non-blocking manner.

## 2. What is Skunk Scala Library?

Skunk is a robust Scala library that has been specifically crafted to offer optimal database access to PostgreSQL. Its functional, typesafe, resource-safe session, and composable interface provides a high level of type-safety, ensuring that SQL queries are checked at compile-time. With Skunk, developers can expect a reliable and efficient way to interact with PostgreSQL databases. Its advanced features offer a seamless and typesafe experience that enables developers to streamline their database access and management. Skunk is the perfect choice for developers who strive to achieve efficient and secure database access while maintaining a high level of type-safety.

## 3. Understanding Skunk's Core Concepts

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

> I understand that at the time the article was written, IntelliJ had poor support for Skunk as the compiler would underline Skunk keywords such as .query, .command, etc in red on SQL statements. If you're facing this issue, it is possible to make it go away by installing this [skunk-intellij](https://github.com/trobert/skunk-intellij) plugin.

To facilitate our understanding as we proceed, we will develop a simple application that demonstrates the basic Create, Read, Update and Delete (CRUD) operations, illustrating the concepts we will be learning.

Let's set up a new Scala project using sbt. After that, we can add Skunk Scala library and [pureconfig-core](https://www.javadoc.io/doc/com.github.pureconfig/pureconfig-core_3/latest/index.html) as dependencies in our `build.sbt` file. Pureconfig-core will help us to load our configuration values found in `application.conf` needed to establish our database session.

```scala
    libraryDependencies ++= Seq(
      "org.tpolecat" %% "skunk-core" % "0.6.3",
      "com.github.pureconfig" %% "pureconfig-core" % "0.17.5"
    )
```

With our dependencies loaded to our project, we can explore each of these concepts in detail and demonstrate how to leverage Skunk effectively. However, before diving into that, Let's start by defining our domain and setting up environment variables that will be used to launch our docker container.

## 4. Domain

This guide will help us identify the data to manipulate in our database session.
* `User.scala` placed in `src/main/scala/domain`. This will guide us on the necessary _fields_ and _data types_ to create our `users` table (We will create the table in a short while.) for storing `User` data.
```scala
    import java.util.UUID

    final case class User (
      id: UUID,
      name: String,
      email: String
    )
```

* `Config.scala` placed in `src/main/scala/domain`. This represent the configuration values that we have set in our `application.conf` file (We will create it shortly) for our PostgreSQL database. The `derives` clause automatically derive config values for our `Config` case class using PureConfig provided we have the right imports in scope as shown in the code snippet below. This automatically provide us with an `implicit ConfigReader instance` useful to read our config values. Check [pureconfig](https://pureconfig.github.io/docs/index.html) for more details.

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

## 5. Resources
Configuration values reflecting our domain to be used throughout our project.

* `application.conf` placed in `src/main/resources`. Here we set our configuration values needed to establish our database session. The key-value pairs that are set up in this file must correspond to the values specified in our `Config` case class.
```scala
    host: "localhost"
    port: 5432
    username: "postgres"
    password: "postgres"
    database: "skunk"
```
* `tables.sql` placed in `src/main/resources`. We need to write a SQL statement to create a `users` table in our database. As previously mentioned, the **fields** and **data types** of the created table (`users` in our case) should match the **values** and **data types** of the domain to be stored in (`User` in our case).
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
          - ./src/main/resources/tables.sql:/docker-entrypoint-initdb.d/init.sql
```

## 6. Setting Up Database Connection

To begin interacting with the database using Skunk, establish a database connection. This involves configuring the connection parameters such as host, port, username, password, and database name. Skunk provides a convenient way to manage database sessions using resources.

Before establishing our database connection, let's start our Docker container by running the following command; `docker-compose up` in the terminal at the root directory or wherever we placed our `docker-compose.yml` file.

We then create a `main.scala` file in our project where we will test our codes.
Good! Now let's create a class named `DbConnection` to establish a database connection, allowing us to choose between two connection types: `single` or `pooled`, based on the provided configuration values.
```scala
    import cats.effect.Temporal
    import cats.effect.std.Console
    import fs2.io.net.Network
    import natchez.Trace
    import skunk.Session
    import skunk_guide.domain.Config

    final class DbConnection[F[_] : Temporal : Trace : Network : Console] {
      def single(config: Config): Resource[F, Session[F]] = Session.single(
          host = config.host,
          port = config.port,
          user = config.username,
          password = Some(config.password),
          database = config.database,
      )

      def pooled(config: Config): Resource[F, Resource[F, Session[F]]] = Session.pooled(
          host = config.host,
          port = config.port,
          user = config.username,
          password = Some(config.password),
          database = config.database,
          max = 10
      )
    }
```
Let's take a closer look at creating a database connection, as it involves several implicit instances that may seem overwhelming at first. However, we're here to help and provide a clear explanation of the purpose and use of each of these instances, to help you move forward with confidence.

In Skunk, implicit instances such as `Temporal, Trace, Network, and Console` play essential roles in defining database connections using `Session.single` and `Session.pooled`. These instances are used to handle various aspects of database interaction, logging, and tracing. 

1. `Temporal`
  * **Purpose**: Handle conversions between Scala types and PostgreSQL temporal types like timestamp, date, time, etc.
  * **Use**: When executing queries or fetching data from the database, temporal instances ensure that the date and time values retrieved from PostgreSQL are correctly mapped to Scala types, and vice versa. For example, a PostgreSQL `timestamp` would be mapped to a Scala `java.time.Instant`

2. `Trace`
  * **Purpose**: Responsible for distributed tracing, allowing us to monitor the flow of requests across services and components.
  * **Use**: Tracing provides insights into database interactions, helping to identify bottlenecks, failures, or performance issues within our application. You can integrate Skunk with your preferred tracing system, such as [Zipkin](https://zipkin.io/pages/quickstart) by providing appropriate Trace instances.

3. `Network`
  * **Purpose**: Handle network operations related to database connections.
  * **Use**: Network instances manage the underlying network connections to the PostgreSQL server. They handle tasks such as establishing connections, pooling, and managing the lifecycle of connections. This ensures efficient and reliable communication between our application and the database.

4. `Console`
  * **Purpose**: Provides logging functionality to output messages to the console.
  * **Use**: Console instances are useful for logging debug information, errors, or other messages related to database interactions. They enable us to monitor the behavior of our application and diagnose issues during development and debugging. These messages can be logged to the console or redirected to other logging systems as needed.

  In summary, these implicit instances (`Temporal, Trace, Network, Console`) are crucial for configuring and managing database connections in Skunk as they ensure correct data handling.

  Hopefully we uunderstand the roles of the above instances in creating a skunk database connection, let's use `IOApp` from cats-effect as a context to create a connection and test our connection by simply querying our current date and time.
  ```scala
      ...
      import cats.effect.{ExitCode, IO, IOApp}
      import skunk.*
      import skunk.implicits.*
      import skunk.codec.all.*
      import natchez.Trace.Implicits.noop

      object main extends IOApp {

        override def run(args: List[String]): IO[ExitCode] =
          val config: Either[ConfigReaderFailures, Config] = ConfigSource.default.load[Config]
          config match
            case Left(configFailure) =>
              for {
                _ <- IO(println(configFailure.prettyPrint(2)))
              } yield ExitCode.Success

            case Right(configValues) =>
              val resource: Resource[IO, Session[IO]] = new DbConnection[IO].single(configValues)
              val resources: Resource[IO, Resource[IO, Session[IO]]] = new DbConnection[IO].pooled(configValues)
              resource.use { session =>
                for {
                  _           <- IO(println("Using a single session..."))
                  dateAndTime <- session.unique(sql"select current_timestamp".query(timestamptz))
                  _           <- IO(println(s"Current date and time is $dateAndTime."))
                } yield ()
              } *>
              resources.use { resource =>
                resource.use { session =>
                  for {
                    _           <- IO(println("Using a pooled session..."))
                    dateAndTime <- session.unique(sql"select current_timestamp".query(timestamptz))
                    _           <- IO(println(s"Current date and time is $dateAndTime."))
                  } yield ExitCode.Success
                }
              }
      }
  ```
  We first load configuration values from `application.conf`. If values are properly set up, we create both single and pooled database connections with the help of our `DbConnection` class we previously created. Otherwise, we print errors to the console to better understand what went wrong. We now test our database connections by fetching the current date and time of our system, and if our connections was succesfully established, we should have an output similar to the following.
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

Let's talk about type mapping as it is an essential concept that helps us in the execution of skunk queries and commands. It's a process of converting between PostgreSQL data types and corresponding Scala types. This mapping ensures that data retrieved from the database can be represented and manipulated in a type-safe manner within Scala code. Through the use of `Codec`(encoder and decoder), we can create a mapping between fields from our `users` table and values from our `User` case class as follow.
```scala
    object main extends IOApp {
      val codec: Codec[User] =
        (uuid ~ varchar ~ varchar).imap { 
          case id ~ name ~ email => User(id, name, email)
        }(user => user.id ~ user.name ~ user.email)
    ...
    ...
```
Please add the above code to our `main.scala` file as it will help us set up our SQL statements.
the `~` operator help us to build left-associated nested pairs of values during conversion. You can also make use of `*:` operator to create tuple values or sequence operations in a specific order. Check the official documentation for more details.
We shall soon see these conversions in use as we interact with out database through queries and commands.

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
      val resource: Resource[IO, Session[IO]] = new DbConnection[IO].single(configValues)
      resource.use { session =>
        session.prepare(insert).flatMap { cmd =>
          cmd.execute(userData).flatMap { rowCount =>
            IO(println(s"Inserted $rowCount row(s)"))
          }
        } *> IO.pure(ExitCode.Success)
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
        session.prepare(selectById).flatMap { pq =>
          pq.option(UUID.fromString("b68f2676-611e-4db2-af80-0458e9c52bd3")).flatMap { res =>
            res match
              case Some(user) => IO(println(s"User found: $user"))
              case None       => IO(println(s"No user found with id: $userId")) *> IO.raiseError(new NoSuchElementException())
          }
        } *> IO.pure(ExitCode.Success)
```
After preparing our query, we fetch a maximum of one row by using the `option` method along with the provided id as an argument. If a user is found, we'll print the result to the console. However, if no user is found, we'll raise an error with a message indicating that no user was found. Executing the query with a known user id should give an output similar to the following
```
User found: User(b68f2676-611e-4db2-af80-0458e9c52bd3,Jacob,jacob@email.com)
```


## 9. Refactoring our code
Let's refactor our code in a functional style and add support for basic CRUD operations.
Given we're leveraging the use of a purely functional library, we shall continue writing purely functional code throughout using the tagless final approach.

### 9.1. Database Repository
We define a trait called `Repository` to handle our queries and commands for interacting with our database. This file is placed in `src/main/scala/db`.
```scala
    import cats.effect.{Resource, Sync}
    import cats.implicits.*
    import skunk_guide.errors.Errors.UniqueViolation
    import skunk.{Command, Query, Session, SqlState}

    // While F is the effect type, E represents the domain/model used to perform operations
    trait Repository[F[_], E](resource: Resource[F, Session[F]]) {
      protected def run[A](session: Session[F] => F[A])(implicit F: Sync[F]): F[A] =
        resource.use(session).handleErrorWith {
          case SqlState.UniqueViolation(ex) =>
            UniqueViolation(ex.detail.fold(ex.message)(m => m)).raiseError[F, A]
        }

      protected def findOneBy[A](query: Query[A, E], argument: A)(implicit F: Sync[F]): F[Option[E]] =
        run { session =>
          session.prepare(query).flatMap { preparedQuery =>
            preparedQuery.option(argument)
          }
        }

      protected def update[A](command: Command[A], argument: A)(implicit F: Sync[F]): F[Unit] =
        run { session =>
          session.prepare(command).flatMap { preparedCommand =>
            preparedCommand.execute(argument).void
          }
        }
    }
```
Our trait takes a `Resource` parameter useful to establish a database session. However, this is possible only for `Scala 3` as the app written in this article is based on Scala 3 features.

We have a `run` method to allocate a resource to be used within a database session, a `findOneBy` method that can be used to fetch a specific row from a table such as fetching a user given the user's id, and an `update` method for operations that update the state of the database such as deleting from a database.
`UniqueViolation` is just a postgres error exception which can be handled depending on the fields we set as unique in our tables.

###  9.2. User Repository
Still in the package `src/main/scala/db`, we define a `UserRepository` class to handle the `User` domain.
```scala
    import cats.effect.{Resource, Sync}
    import cats.implicits.*
    import skunk.{Codec, Command, Query, Session, Void, ~}
    import skunk.codec.all.*
    import skunk.implicits.*
    import skunk_guide.domain.User
    import skunk_guide.db.Repository
    import fs2.Stream

    import java.util.UUID

    private final class UserRepository[F[_]: Sync](resource: Resource[F, Session[F]]) extends Repository[F, User](resource) {
      import UserRepository.*

      def create(name: String, email: String): F[UUID] =
        run { session =>
          session.prepareR(insert).use { cmd =>
            val userId = UUID.randomUUID()
            cmd.execute(User(userId, name, email)).map(_ => userId)
          }
        }

      def findAll: Stream[F, User] =
        Stream.evalSeq(run(_.execute(selectAll)))

      def findById(id: UUID): F[Option[User]] =
        findOneBy(selectById, id)

      def update(user: User): F[Unit] =
        update(_update, user)

      def delete(id: UUID): F[Unit] =
        update(_delete, id)
    }

    object UserRepository {
      def make[F[_]: Sync](resource: Resource[F, Session[F]]): F[UserRepository[F]] =
        Sync[F].delay(new UserRepository[F](resource))

      private val codec: Codec[User] =
        (uuid ~ varchar ~ varchar).imap {
          case id ~ name ~ email => User(id, name, email)
        }{user => user.id ~ user.name ~ user.email }

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
    def make[F[_]: Sync](resource: Resource[F, Session[F]]): F[UserRepository[F]] =
      Sync[F].delay(new UserRepository[F](resource))
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
Let's discuss how the `_update` command works as it appears to be different from other commands. It updates the `name` and `email` fields of a user based on their `id`. The input to this command is a `User` object. The code's `.command` part converts the SQL query into a Skunk Command object. The `.contramap` part maps the input values to the parameters expected by the SQL command and orders them according to the SQL query. In this case, it maps the properties of the `User` object to `name`, `email`, and `id` in that order, using the `~` operator to concatenate them.

### 9.3 Database Connection

We have created a package (`src/main/scala/modules`) that contains an object used to establish our two different types of database connections based on the provided configuration values. We already explain this concept, please refer to [section 6](#6-setting-up-database-connection) for a refresh.
```scala
    import cats.effect.{Resource, Temporal}
    import cats.effect.std.Console
    import fs2.io.net.Network
    import natchez.Trace
    import skunk.Session
    import skunk_guide.domain.Config

    final class DbConnection[F[_] : Temporal : Trace : Network: Console] {
      def single(config: Config): Resource[F, Session[F]] = Session.single(
        host = config.host,
        port = config.port,
        user = config.username,
        password = Some(config.password),
        database = config.database,
      )

      // max = 10 represent a maximum of 10 concurrent sessions
      def pooled(config: Config): Resource[F, Resource[F, Session[F]]] = Session.pooled(
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
    import cats.effect.{ExitCode, IO, IOApp, Resource}
    import cats.implicits.*
    import skunk.Session
    import skunk.implicits.*
    import natchez.Trace.Implicits.noop
    import pureconfig.ConfigSource
    import pureconfig.error.ConfigReaderFailures
    import skunk_guide.db.UserRepository
    import skunk_guide.domain.{Config, User}
    import skunk_guide.modules.DbConnection

    object main extends IOApp {

      override def run(args: List[String]): IO[ExitCode] =
        val config: Either[ConfigReaderFailures, Config] = ConfigSource.default.load[Config]
        config match
          case Left(configFailure) =>
            for {
              _ <- IO(println("Failed to load configurations"))
              _ <- IO(println(configFailure.prettyPrint()))
            } yield ExitCode.Success

          case Right(configValues) =>
            val resource = new DbConnection[IO].single(configValues)
            for {
              userRepo <- UserRepository.make[IO](resource)
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