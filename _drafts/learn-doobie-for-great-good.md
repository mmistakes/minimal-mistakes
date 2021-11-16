---
title: "Learn Doobie for Great Good"
date: 2021-11-25
header:
image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

The vast majority of applications in the world today connect with some form of persistent layer, and, sooner or later, every developer faces the challenge of connecting to a database. If we need to connect to SQL databases, in the JVM ecosystem we rely on the JDBC specification. However, JDBC is not a good fit if we are using functional programming, since the library performs a lot of side effects. Fortunately, there is a library called [Doobie](https://tpolecat.github.io/doobie/), which provides a higher-level API on top of JDBC, using an effectful style through the Cats and Cats Effect libraries.

So, without further ado, let's introduce the Doobie library.

## 1. Set Up

As usual, we'll start by importing the libraries we need in the SBT file. We will use Postgres as our database of reference: 

```sbt
val DoobieVersion = "1.0.0-RC1"

libraryDependencies ++= Seq(
  "org.tpolecat" %% "doobie-core"     % DoobieVersion,
  "org.tpolecat" %% "doobie-postgres" % DoobieVersion,
  "org.tpolecat" %% "doobie-hikari"   % DoobieVersion
)
```

As we said, Doobie is a library that lives in the Cats ecosystem. However, the dependencies to Cats and Cats Effects are already contained in the Doobie library. Version 1.0.0-RC1 of Doobie uses the Cats Effect version 3.

Since we chose to use Postgres as our database, we need to spin up a Postgres instance. We will use the [Postgres Docker image](https://hub.docker.com/r/postgres/postgres/) to do this. To simplify the process, we define the Postgres image in a docker-compose.yml file:

```yaml
version: '3.1'

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: example
    ports:
      - "5432:5432"
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

The above configuration defines a Postgres instance listening on port 5432 and having a user, _admin_, with password _example_. Moreover, we define an Adminer instance listening on port 8080. Adminer is a web interface to Postgres, which we will use to create a database, some table, and to populate them with some data.

Next, we need a use case to train our skill about Doobie. We will use the same use case we introduced in the article [Unleashing the Power of HTTP Apis: The Http4s Library](https://blog.rockthejvm.com/http4s-tutorial/), that is implementing a small IMDB-like web service. The main domain objects of the service are movies, actors, and directors. The goal is to use Doobie to interact with these tables, through queries, insertion and updates.

Inside Postgres, we will model the domain objects as tables, and we will define the relations between them as foreign keys. The tables will be named `movies`, `actors`, and `directors`:

```sql
-- Database
CREATE DATABASE myimdb;

-- Directors
CREATE TABLE directors (
  id serial NOT NULL,
  PRIMARY KEY (id),
  name character varying NOT NULL,
  last_name character varying NOT NULL
);

-- Movies
CREATE TABLE movies (
  id uuid NOT NULL,
  title character varying NOT NULL,
  year_of_production smallint NOT NULL,
  director_id integer NOT NULL
);

ALTER TABLE movies
ADD CONSTRAINT movies_id PRIMARY KEY (id);
ALTER TABLE movies
ADD FOREIGN KEY (director_id) REFERENCES directors (id);

-- Actors
CREATE TABLE actors (
  id serial NOT NULL,
  PRIMARY KEY (id),
  name character varying NOT NULL
);

-- Link between movies and actors
CREATE TABLE movies_actors (
  movie_id uuid NOT NULL,
  actor_id integer NOT NULL
);

ALTER TABLE movies_actors
ADD CONSTRAINT movies_actors_id_movies_id_actors PRIMARY KEY (movie_id, actor_id);
ALTER TABLE movies_actors
ADD FOREIGN KEY (movie_id) REFERENCES movies (id);
ALTER TABLE movies_actors
ADD FOREIGN KEY (actor_id) REFERENCES actors (id);
```

The ER diagram associated with the above tables' definition is the following:

TODO: Add image of the ER

Then, we need to populate the above tables with some data. As in the previous article, we renew our love for the movie "Zack Snyder's Justice League":

```sql
-- Actors
INSERT INTO actors (name) VALUES ('Henry Cavill');
INSERT INTO actors (name) VALUES ('Gal Godot');
INSERT INTO actors (name) VALUES ('Ezra Miller');
INSERT INTO actors (name) VALUES ('Ben Affleck');
INSERT INTO actors (name) VALUES ('Ray Fisher');
INSERT INTO actors (name) VALUES ('Jason Momoa');
COMMIT;

-- Directors
INSERT INTO directors (name, last_name)
VALUES ('Zack', 'Snyder');
COMMIT;

-- Movies
INSERT INTO movies (id, title, year_of_production, director_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 'Zack Snyder''s Justice League', '2021', 1);
COMMIT;

-- Actor-Movie link
INSERT INTO movies_actors (movie_id, actor_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 1);
INSERT INTO movies_actors (movie_id, actor_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 2);
INSERT INTO movies_actors (movie_id, actor_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 3);
INSERT INTO movies_actors (movie_id, actor_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 4);
INSERT INTO movies_actors (movie_id, actor_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 5);
INSERT INTO movies_actors (movie_id, actor_id)
VALUES ('5e5a39bb-a497-4432-93e8-7322f16ac0b2', 6);
COMMIT;
```

In Scala, we will use the following classes to define the domain objects:

```scala
case class Actor(id: Int, name: String)

case class Movie(id: String, title: String, year: Int, actors: List[String], director: String)

class Director(_name: String, _lastName: String) {
  def name: String = _name

  def lastName: String = _lastName

  override def toString: String = s"$name $lastName"
}
```

If you're asking why we did not use a `case class` for the `Director` type, the reason will be clear in the rest of the article.

Finally, all the examples contained in the article will use the following imports:

```scala
import cats.effect._
import cats.implicits.catsSyntaxApplicativeId
import doobie._
import doobie.implicits._
import doobie.postgres._
import doobie.postgres.implicits._
import doobie.util.transactor.Transactor._
```

So, with the above solid background, we can now enter the world of Doobie.

## 2. Getting a Connection

The first thing we need to work with a database is retrieving a connection. In Doobie, the type handling the connection for us is the `doobie.util.transactor.Transactor`. There are many ways to create an instance of a `Transactor`. The easiest is to use the `Transactor.fromDriverManager` method, which will create a `Transactor` from a JDBC driver manager:

```scala
val xa: Transactor[IO] = Transactor.fromDriverManager[IO](
  "org.postgresql.Driver",
  "jdbc:postgresql:myimdb",
  "postgres",
  "example"   // The password
)
```

This approach is the simplest and the most straightforward, but it is not the most efficient. The reason is that the JDBC driver manager will try to load the driver for each connection, which can be quite expensive. Moreover, the driver manager has no upper bound on the number of connections it will create. However, to experimenting and testing Doobie features, this approach works quite well. 

As we said in the introduction, Doobie is just a wrapper over the JDBC specification in Java, and it uses the Cats Effect library under the hood. Since JDBC provides only a blocking interface to interact with SQL databases, we should be careful to also use the blocking facilities available in Cats Effect. Fortunately, Doobie takes care of using the `Blocking` context for us:

```scala
// Doobie library's code
// The ev variable is an instance of Async[IO]
val acquire = ev.blocking{ Class.forName(driver); conn() }
```

In production code, as we said, we don't want ot use an instance of `Transactor` coming directly from the JDBC driver manager. Instead, we will use a `Transactor` that is backed by a connection pool. Doobie integrates well with the [HikariCP](https://github.com/brettwooldridge/HikariCP) connection pool library, through the `doobie-hikari` module. Since a connection pool is a resource with its own lifecycle, we will use the Cats Effect `Resource` type to manage it:

```scala
val postgres: Resource[IO, HikariTransactor[IO]] = for {
  ce <- ExecutionContexts.fixedThreadPool[IO](32)
  xa <- HikariTransactor.newHikariTransactor[IO](
    "org.postgresql.Driver",
    "jdbc:postgresql:myimdb",
    "postgres",
    "example",    // The password
    ce
  )
} yield xa
```

In the vast majority of the examples in the article, we will use directly the `Transactor` coming from the JDBC driver manager. Instead, in the last part, we will focus on using the `Resource` type to manage the connection pool.

### 2.1. The YOLO Mode

TODO

## 3. Querying the Database

Now that we learnt how to connect to a database, we can start querying it. The easiest query we can do, is to retrieve all actors names in the database, since the query doesn't request any input parameter, and extract only a column:

```scala
def findAllActorsNamesProgram: IO[List[String]] = {
  val findAllActorsQuery: doobie.Query0[String] = sql"select name from actors".query[String]
  val findAllActors: doobie.ConnectionIO[List[String]] = findAllActorsQuery.to[List]
  findAllActors.transact(xa)
}
```

As it's the first query we make, the code is really verbose. However, we can analyze every aspect of a query, in this way.

First, the `sql` interpolator allow us to create SQL statement fragments (more to come). Next, the method `query` lets us creating a type that maps the single row result of the query in a Scala type. The type is called `Query0[A]`. To accumulate results into a list, we use the `to[List]` method, which creates a `ConnectionIO[List[String]]`.

The `ConnectionIO[A]` type is very interesting, since it introduces a common pattern used in the Doobie library. In fact, Doobie defines all its most important type as instances of the [`Free`  monad](https://typelevel.org/cats/datatypes/freemonad.html):

TODO Image describing the relation between the Doobie types and JDBC's ones

Although the description and deep comprehension of the free monad is behind the scope of this article, we can say that a program with type `ConnectionIO[A]` represents a computation that, given a `Connection`, will generate a value of type `IO[A]`.

Every free monad is only a description of a program. It's not executable at all, since it requires an interpreter. The interpreter, in this case, is the `Transactor` we created. Its role is to compile the program into a `Kleisli[IO, Connection, A]`. As we should remember from the course on [Cats](https://rockthejvm.com/p/cats), the above `Kleisli` is another representation of the function `Connection => IO[A]`.

So, given an instance of `IO[Connection]` to the `Kleisli` through the `transact` method, we can execute the compiled program into the desired `IO[A]`, and then execute it using the Cats Effect library:

```scala
object DoobieApp extends IOApp {

  val xa: Transactor[IO] = Transactor.fromDriverManager[IO](
    "org.postgresql.Driver",
    "jdbc:postgresql:myimdb",
    "postgres",
    "example"
  )
  
  override def run(args: List[String]): IO[ExitCode] = {
    findAllActorsNamesProgram
      .map(println)
      .as(ExitCode.Success)
  }
}
```

Given the information we initially stored in the database, the above code produces the following output:

```
List(Henry Cavill, Gal Godot, Ezra Miller, Ben Affleck, Ray Fisher, Jason Momoa)
```

Although extracting actors in a `List[String]` seems legit at first sight, it's not safe in a real world application. In fact, the number of extracted rows could be very large to not fit inside the memory allocated to the application. For this reason, we should use a `Stream` instead of a `List`. Doobie integrates smoothly with the functional streaming library [fs2](https://fs2.io). Again, describing how fs2 works is behind the scope of this article, and we just focus on how to use it with doobie.

For example, let's change the above example to use the streaming API:

```scala
val actorsNamesStream: fs2.Stream[doobie.ConnectionIO, String] = 
  sql"select name from actors".query[String].stream
```

The `stream` method on the type `Query0` returns a `Stream[ConnectionIO, A]` which means a stream containing instances of type `A`, wrapped in an effect of type `ConnectionIO` (for a brief explanation of the Effect pattern, please refer to [The Effect Pattern](https://blog.rockthejvm.com/zio-fibers/#2-the-effect-pattern)).

Once we obtained an instance of a `Stream`, we can decide to return it to the caller as it is, or to compile it into a finite type, such as `List[String]` or `Vector[String]`:

```scala
val actorsNamesList: IO[List[String]] = actorsNamesStream.compile.toList.transact(xa)
```


