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

As we said, Doobie is a library that lives in the Cats ecosystem. However, the dependencies to Cats and Cats Effects are already contained in the Doobie library.

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

Finally, in Scala, we will use the following classes to define the domain objects:

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

So, with the the above solid background, we can now enter the world of Doobie.

