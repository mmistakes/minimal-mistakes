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

* [PostgreSQL database server](https://www.postgresql.org/download/)
* [Scala and sbt (Scala Build Tool)](https://docs.scala-lang.org/getting-started/sbt-track/getting-started-with-scala-and-sbt-on-the-command-line.html)


> I understand that at the time the article was written, IntelliJ had poor support for Skunk as the compiler would underline Skunk keywords such as .query, .command, etc in red on SQL statements. If you're facing this issue, it is possible to make it go away by installing this [skunk-intellij](https://github.com/trobert/skunk-intellij) plugin.


Once you have PostgreSQL installed and a database set up, create a new Scala project using sbt. Then, add Skunk as a dependency in your `build.sbt` file:

```scala
libraryDependencies += "org.tpolecat" %% "skunk-core" % "0.0.26"
```

With Skunk added to your project, let's explore each of these concepts in detail and demonstrate how to leverage Skunk effectively.

## 4. Setting Up Database Connection

To begin interacting with the database using Skunk, establish a database connection. This involves configuring the connection parameters such as host, port, username, password, and database name. Skunk provides a convenient way to manage database sessions using resources.
```scala
import skunk._
import skunk.implicits._

  def sessions[F[_]: ConcurrentEffect: ContextShift] = {
    val single: Resource[F, Session[F]] =
      Session.single(
        host = "localhost",
        port = 5432,
        user = "postgres",
        database = "postgres",
        password = Some("postgres")
      )

    val pool: Resource[F, Resource[F, Session[F]]] =
      Session.pooled(
        host = "localhost",
        port = 5432,
        user = "postgres",
        database = "postgres",
        password = Some("postgres"),
        max = 10
      )
  }
```
Replacing `postgres` accordingly with your actual database credentials.
We have `Session.single` and `Session.pooled` which are two different methods used to manage database connections, each serving different purposes based on the requirements of the application.

`Session.single` creates a single, non-pooled database connection and is suitable for applications with low to moderate database usage or when the number of concurrent database connections is not a concern.

`Session.pooled` creates a pool of reusable database connections and is suitable for applications with high database usage or when there is a need to manage multiple concurrent database connections efficiently with a configurable maximum number of connection in the pool.

Both methods need `Concurrent and ContextShift` implicit instances in scope from cats-effect to establish a connection. 

## 5. Type-Safe SQL Interpolation

Skunk offers type-safe SQL interpolation, allowing us to construct SQL queries with compile-time validation. This ensures that SQL queries are syntactically correct and type-safe.
```scala
  val userId: UUID = UUID.randomUUID()
  val query: Query[UUID, (UUID, String, String)] =
    sql"""SELECT id, name, email
        FROM users WHERE id = $uuid
       """.query(uuid, varchar, varchar)
```
In this example, `uuid`, `varchar` and `varchar` are placeholders for `UUID`, `String` and `string` values, respectively. Skunk infers the SQL parameter types based on the provided Scala type `(UUID, String and String)` where the query takes a `UUID` and returns a tuple3 `(UUID, String, String)`.

## 6. Type Mapping

Skunk automatically maps Scala data types to PostgreSQL data types, eliminating the need for manual type conversions. This ensures type safety and reduces boilerplate code.
```scala
case class User(id: UUID, name: String, email: String)

//User encoder and decoder
val userCodec: Codec[User] =
  (uuid ~ varchar ~ varchar).imap { 
    case id ~ name ~ email => User(id, name, email)
  }(user => user.id ~ user.name ~ user.email)
```

`userCodec` is a user encoder and decoder that maps a PostgreSQL row to a User case class and vice versa.
We use the `~` operator to build left-associated nested pairs of values and types.

## 7. Query and Command

### 7.1. Query 
It represents a SQL statement that can be parameterized. With Query, we can create SQL statements with placeholders for parameters, which ensures that they are type-safe and validated during compile-time. The input and output types of a Query represent the types of parameters and the structure of the result set, respectively.
```scala
import skunk.Query
import skunk.codec.all._
import java.util.UUID

// Define a Query to fetch a user by ID
// Input type: UUID
// Output type: (UUID, String, String)
val findById: Query[UUID, (UUID, String, String)] =
  sql"SELECT id, name, email 
      FROM users WHERE id = $uuid
     ".query(uuid, varchar, varchar)
```
### 7.2. Command 
It represents a parameterized SQL statement that modifies the database state (e.g. insert, update, and delete).
Similar to Query, Command allows us to construct SQL commands with placeholders for parameters, ensuring type safety and compile-time validation. However, it's parameterized by input type only, as it does not return a result set.
```scala
import skunk.Command
import java.util.UUID

// Define a Command to insert a user
// Output type: (UUID, String, String)
val insertUser: Command[(UUID, String, String)] =
  sql"INSERT INTO users (id, name, email) 
      VALUES ($uuid, $varchar, $varchar)
    ".command
```
### 7.3 Executing Query and Command

Once `Query` and `Command` objects are defined, they can be executed within a Skunk session to interact with the database.
```scala
import skunk.Session
import cats.effect.IO
import java.util.UUID

// Executing a Query
val userId: UUID = UUID.fromString("0155907f-ef6d-44b6-b429-77decd944fa7")
val result: IO[List[(UUID, String, String)]] =
  session.use { s =>
    s.execute(findById(userId))
  }

// Executing a Command
val id: UUID = UUID.randomUUID()
val name: String = "Jacob"
val email: String = "email@jacob.com"
val insertResult: IO[Unit] =
  session.use { s =>
    s.execute(insertUser(id, name, email))
  }
```
`Query` and `Command` in Skunk provide a type-safe and composable way to construct and execute SQL queries and commands, enabling us to interact with the database efficiently while ensuring type safety and compile-time validation.

## 8. Create an application
Let's create an application designed to perform basic CRUD(Create, Read, Update, and Delete) operations within a PostgreSQL database. This will help us better understand the above concepts. We shall include a few libraries such as [newtype](https://index.scala-lang.org/estatico/scala-newtype) for generating new types wrapper over our existing types via `@newtype` macro, and [pureConfig](https://index.scala-lang.org/pureconfig/pureconfig) to load our database configuration. 

Given we're leveraging the use of a purely functional library, we shall write purely functional code throughout using the tagless final approach.

Before we get started, let's create three files useful to spin up our application.
### 8.1. `application.conf`
Here, we define our database configuration needed  to establish a database connection. Modify this file to reflect your PostgreSQL credentials. It's a good practice to place this file in the following directory: `src/main/resources`.
```scala
postgres {
  host: "localhost"
  host: ${?POSTGRES_HOST}
  port: 5432
  port: ${?POSTGRES_PORT}
  user: "postgres"
  user: ${?POSTGRES_USER}
  password: "postgres"
  password: ${?POSTGRES_PASSWORD}
  database: "skunk"
  max-connections: 10
}
```
### 8.2. `tables.sql`
We simply prrovide an SQl statement to create our `users` table on initializing our PostgreSQL database.
```sql
CREATE TABLE IF NOT EXISTS users (
    id      UUID    PRIMARY KEY,
    name    VARCHAR        NOT NULL,
    email   VARCHAR UNIQUE NOT NULL
);
```
### 8.3. `docker-compose.yml`
This docker file helps us spin up our PostgreSql database instance in a docker container and mounts a volume from the host machine to persist data generated by the PostgreSQL container initialized with `tables.sql`. This ensures that data is not lost when the container is stopped or removed. Modify to reflect your desired PostgreSQL credentials and database name.
```yml
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
Please make sure you have [Docker engine]( https://docs.docker.com/engine/install/) and [Docke-compose](https://docs.docker.com/compose/install/) installed to be able to successfully run `docker-compose up` command.

### 8.4. Update `build.sbt` and load config values
We should update our `build.sbt` file to include our added libraries.
```scala
    libraryDependencies ++= Seq(
      "org.tpolecat" %% "skunk-core" % "0.0.26",
      "io.estatico" %% "newtype" % "0.4.4",
      "com.github.pureconfig" %% "pureconfig" % "0.14.1",
      "com.github.pureconfig" %% "pureconfig-cats-effect" % "0.14.1"
    ),
    scalacOptions ++= Seq(
      "-Ymacro-annotations",
    )
```
It's time to write some code, we can start by creating a `Config` object that defines our PostgreSQL configuration structure.
```scala
import cats.effect.{Blocker, ContextShift, Sync}
import pureconfig.ConfigSource
import pureconfig.generic.auto._
import pureconfig.module.catseffect.syntax.CatsEffectConfigSource

object Config {
  final case class PostgresConfig(
     host: String,
     port: Int,
     user: String,
     password: String,
     database: String,
     maxConnections: Int
  )

  final case class AppConfig(postgres: PostgresConfig)
  object AppConfig {
    def load[F[_] : Sync : ContextShift](blocker: Blocker): F[AppConfig] =
      ConfigSource.default.loadF[F, AppConfig](blocker)
  }
}
```
We have a load method that load our config values from `application.conf` using pureConfig given some implicit instances in scope (`Sync` and `ContextShift` from cats-effect already available in the skunk library) and a `Blocker` that provide us with an execution context safe to use with blocking operations.

### 8.5. Database session
We can now create a resource that represents our database session using either `Session.single` or `Session.pooled`.
```scala
import cats.effect.{ConcurrentEffect, ContextShift, Resource}
import natchez.Trace.Implicits.noop
import skunk.Session
import skunk.config.Config.AppConfig

final class Resources[F[_]] (
    val postgres: Resource[F, Session[F]]
)

object Resources {
  def makePooledSession[F[_] : ConcurrentEffect : ContextShift](
      config: AppConfig
  ): Resource[F, Resources[F]] = createPostgresPooledSession(config).map(p => new Resources[F](p))

  def makeSingleSession[F[_] : ConcurrentEffect : ContextShift](
     config: AppConfig
  ): Resources[F] = new Resources[F](createPostgresSingleSession(config))

  // Creating a single database session
  private def createPostgresSingleSession[F[_] : ConcurrentEffect : ContextShift](
     config: AppConfig
  ): Resource[F, Session[F]] =
    Session.single[F](
      host = config.postgres.host,
      port = config.postgres.port,
      user = config.postgres.user,
      password = Some(config.postgres.password),
      database = config.postgres.database
    )

  // Creating a pooled database session
  private def createPostgresPooledSession[F[_] : ConcurrentEffect : ContextShift](
    config: AppConfig
    ): Resource[F, Resource[F, Session[F]]] =
    Session.pooled[F](
      host = config.postgres.host,
      port = config.postgres.port,
      user = config.postgres.user,
      password = Some(config.postgres.password),
      database = config.postgres.database,
      max = config.postgres.maxConnections
    )
}
```
We can test our CRUD operations for this article using just a `Session.single` implementation, even though we provided both implementations and created our resource file in a generic way that can be scaled for other resource allocation. However, for better performance as you scale, it is recommended to use `Session.pooled`.

### 8.6. Database Repository
We can proceed to define our abstract repository now, which can be utilized for interacting with our database.
```scala
import cats.effect.{Resource, Sync}
import cats.implicits._
import skunk.{Command, Query, Session, SqlState}
import skunk.errors.Errors.UniqueViolation

// While F is the effect type, E represents the domain/model used to perform operations
trait Repository[F[_], E] {
    protected def resource: Resource[F, Session[F]]
    protected def run[A](session: Session[F] => F[A])(implicit F: Sync[F]): F[A] =
    resource.use(session).handleErrorWith {
      case SqlState.UniqueViolation(ex) =>
        UniqueViolation(ex.detail.fold(ex.message)(m => m)).raiseError[F, A]
    }

  protected def findOneBy[A](query: Query[A, E], argument: A)(implicit F: Sync[F]): F[Option[E]] =
    run { session =>
      session.prepare(query).use { preparedQuery =>
        preparedQuery.option(argument)
      }
    }

  protected def update[A](command: Command[A], argument: A)(implicit F: Sync[F]): F[Unit] =
    run { session =>
      session.prepare(command).use { preparedCommand =>
        preparedCommand.execute(argument).void
      }
    }
}
```
We have a `run` method to allocation a resource to be used within a database session, a `findOneBy` method that can be used to fetch a specific row from a table such as fetching a user given the user's id, and an `update` method for operations that update the state of the database such as deleting from a database.
`UniqueViolation` is just a postgres error exception which can be handled depending on the fields we set as unique in our tables.

###  8.7. Domain
Let's create the user domain/model and its repository to interact with our database.
```scala
import io.estatico.newtype.macros.newtype
import java.util.UUID

final case class User (
  id: User.Id,
  name: User.Name,
  email: User.Email
)

object User {
  @newtype case class Id(value: UUID)
  @newtype case class Name(value: String)
  @newtype case class Email(value: String)
}
```
The `UserRepository` defines methods that allow us to access our database. It extends our abstract `Repository` trait and specifies the data type that the repository will handle, which in this case is `User`.
```scala
import cats.effect.{Resource, Sync}
import cats.implicits._
import skunk.db.Repository
import fs2.Stream
import skunk._
import skunk.codec.all._
import skunk.implicits._
import fs2.Stream

import java.util.UUID

trait UserRepository[F[_]] extends Repository[F, User]{
  def findAll: Stream[F, User]
  def findById(id: User.Id): F[Option[User]]
  def create(name: User.Name, email: User.Email): F[User.Id]
  def update(user: User): F[Unit]
  def delete(id: User.Id): F[Unit]
}
```
A **smart constructor** is used to enforce constraints and control the creation of our `UserRepository` instances. 
```scala
  def make[F[_] : Sync](
      resource: Resource[F, Session[F]]
  ): F[UserRepository[F]] =
    Sync[F].delay(new UserPrivateRepository[F](resource))
```
Using this technique helps us enforce constraints, perform validation, and ensure data integrity within our code.

We use a private class called `UserPrivateRepository` for our initialization logic. This abstracts all implementation details from the outside world.
```scala
    final private class UserPrivateRepository[F[_] : Sync](
    val resource: Resource[F, Session[F]]
  ) extends UserRepository[F] {
    override def findAll: Stream[F, User] =
      Stream.evalSeq(run(_.execute(selectAll)))

    override def findById(id: User.Id): F[Option[User]] =
      findOneBy(selectById, id.value)

    override def create(name: User.Name, email: User.Email): F[User.Id] =
      run { session =>
        session.prepare(insert).use {cmd =>
          val userId = User.Id(UUID.randomUUID())
          cmd.execute(User(userId, name, email)).map(_ => userId)
        }
      }

    override def update(user: User): F[Unit] =
      update(_update, user)

    override def delete(id: User.Id): F[Unit] =
      update(_delete, id)
  }
```
Our `UserPrivateRepository` utilizes our generic `Repository` to implement the methods defined in the `UserRepository`. The implementation is closed off from the outside world and relies on private SQL statements that are defined within the companion object of our `UserRepository`. These SQL statements demonstrate how the Codec (encoder and decoder) seamlessly integrates with Skunk Queries and Commands statements in a type-safe manner to interact with our database.
```scala
  private val codec: Codec[User] =
    (uuid ~ varchar ~ varchar).imap {
      case id ~ name ~ email => User(
        User.Id(id),
        User.Name(name),
        User.Email(email)
      )
    }(user => user.id.value ~ user.name.value ~ user.email.value)
```
The above code simply defines a codec value for the `User` type to be used by `Query` and `Command`.

```scala
  private val selectAll: Query[Void, User] =
    sql"""
         SELECT * FROM users
       """.query(codec)

  private val selectById: Query[UUID, User] =
    sql"""
         SELECT * FROM users
         WHERE id = $uuid
       """.query(codec)
```
We have two queries: `selectAll` and `selectById`. `selectAll` is an empty parameter query that retrieves all users and maps them to the `User` type using our `codec`. On the other hand, `selectById` takes a unique identity as a parameter and returns the corresponding user. The user is also properly mapped to the `User` type using our `codec`.
```scala
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
       """.command.contramap { user =>
      user.name.value ~ user.email.value ~ user.id.value
    }

  private val _delete: Command[User.Id] =
    sql"""
         DELETE FROM users
         WHERE id = $uuid
       """.command.contramap(_.value)
```
Skunk Command is a SQL command that is parameterized and designed to execute update operations on a database table. Specifically, in this instance, it is intended to update the `users` table without returning any result set. Although the `_update` command may seem intricate, it is in fact straightforward and easy to understand with attentive observation.

Ok, let me explain what this code does. The `_update` command is a Skunk Command that updates a user's `name` and `email` fields given their `id`. The input to this command is a `User` object. The `.command` part of the code converts the SQL query into a Skunk Command object. The `.contramap` part maps the input values to the parameters expected by the SQL command and orders them as per the SQL query. In this case, it maps the `User` object's properties to `name`, `email`, and `id` in that order, using the `~` operator to concatenate them.

The `insert` and `_delete` commands are simple and direct. The `insert` command requires a `User` object as input and uses `codec` to create a valid SQL command, as explained earlier. On the other hand, the `_delete` command follows the same logic as the `_update` command, but only deals with the user's `id`.

### 8.8. Creating a runnable file
We can then put all the parts into a single `IOApp` from `cats-effect` and run our application.
```scala
import cats.effect.{Blocker, ExitCode, IO, IOApp}
import skunk.config.Config.AppConfig
import skunk.domain.user.{User, UserRepository}
import skunk.modules.Resources

object Main extends IOApp {

  implicit class IODebugger[A](io: IO[A]) {
    def debugIO: IO[A] = io.map { a =>
      println(s"[${Thread.currentThread().getName}] - $a")
      a
    }
  }

  override def run(args: List[String]): IO[ExitCode] =
    Blocker[IO].use(AppConfig.load[IO]).flatMap { config =>
      for {
        userRepo <- UserRepository.make[IO](Resources.makeSingleSession[IO](config).postgres)
        _ <- IO(println("Creating users" + "_" * 50))
        johnId <- userRepo.create(User.Name("John"), User.Email("email@john.com")).debugIO
        jacobId <- userRepo.create(User.Name("Jacob"), User.Email("email@jacob.com")).debugIO
        _ <- userRepo.create(User.Name("Kendrick"), User.Email("email@kendrick.com")).debugIO
        _ <- IO(println("Fetching all users" + "_" * 50))
        _ <- userRepo.findAll.compile.toList.debugIO
        _ <- IO(println("Fetching John by Id" + "_" * 50))
        _ <- userRepo.findById(johnId).debugIO
        _ <- IO(println("Update John's email" + "_" * 50))
        _ <- userRepo.update(User(User.Id(johnId.value), User.Name("John"), User.Email("email@email.com")))
        _ <- userRepo.findAll.compile.toList.debugIO
        _ <- IO(println("Delete Jacob" + "_" * 50))
        _ <- userRepo.delete(jacobId)
        _ <- userRepo.findAll.compile.toList.debugIO
      } yield ExitCode.Success
    }
}
```
Using a blocker resource (A resource used for blocking operations in a non-blocking context) we effectfully load our config values. We then create our database session to be acquired and released within our controlled scope. You can learn more about resource handling and effectful computations from this [cats-effect](https://rockthejvm.com/p/cats-effect) course.

>We recommend using a pooled database session instead of a single database session.

The `IODebugger` class acts as a pimp to the IO type, adding a method called `debugIO` that prints the content of the IO type on a specific thread. We then create a user repository and play with our methods.


## 9. Run our application
To spin up the postgres image and initialize your database, run the following command in the terminal of the project's directory:

```
docker-compose up -d
```

This command will start the postgres container in the background and initialize your database based on the configurations in your `docker-compose.yml` file.
```
sbt run
```
provided your container is up and running, execute the above sbt command to run your application. Your terminal should produce an output similar to the following
```scala
Creating users__________________________________________________
[ioapp-compute-6] - 02853188-8bf7-4d32-baa7-733102e54364
[ioapp-compute-0] - e4c4400b-6c9a-46fb-903e-d6a2d1cc6089
[ioapp-compute-7] - d46ec54a-1fa4-41eb-b761-de85ef1a3a06
Fetching all users__________________________________________________
[ioapp-compute-4] - List(User(02853188-8bf7-4d32-baa7-733102e54364,John,email@john.com), User(e4c4400b-6c9a-46fb-903e-d6a2d1cc6089,Jacob,email@jacob.com), User(d46ec54a-1fa4-41eb-b761-de85ef1a3a06,Kendrick,email@kendrick.com))
Fetching John by Id__________________________________________________
[ioapp-compute-1] - Some(User(02853188-8bf7-4d32-baa7-733102e54364,John,email@john.com))
Update John's email__________________________________________________
[ioapp-compute-0] - List(User(e4c4400b-6c9a-46fb-903e-d6a2d1cc6089,Jacob,email@jacob.com), User(d46ec54a-1fa4-41eb-b761-de85ef1a3a06,Kendrick,email@kendrick.com), User(02853188-8bf7-4d32-baa7-733102e54364,John,email@email.com))
Delete Jacob__________________________________________________
[ioapp-compute-5] - List(User(d46ec54a-1fa4-41eb-b761-de85ef1a3a06,Kendrick,email@kendrick.com), User(02853188-8bf7-4d32-baa7-733102e54364,John,email@email.com))
```

## 10. Conclusion

In this comprehensive guide, we've explored the Skunk Scala library and its features for interacting with PostgreSQL databases by creating a reusable application that performs basic CRUD operations. Skunk's type-safe SQL interpolation, automatic type mapping, and resource-safe session management make it an excellent choice for building robust and scalable Scala applications. By mastering Skunk's core concepts and leveraging its features effectively, you can streamline PostgreSQL database interactions and focus on building innovative features for their applications. Happy coding with Skunk!

GitHub repository for the application: [skunk a comprehensive guide](https://github.com/bomenderick/skunk_a-simple-guide.git).