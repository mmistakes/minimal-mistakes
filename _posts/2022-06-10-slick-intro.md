---
title: "An introduction to Slick"
date: 2022-06-10
header:
    image: "/images/blog cover.jpg"
tags: [scala, beginners]
excerpt: "An introduction to the popular database library in Scala: Slick."
---
This is a beginner friendly article to get started with Slick, a popular database library in Scala. After following this post, you will be able to write scala code to communicate with database using SQL.

This guide will explain 
- what is slick and how to use slick for basic CRUD operations
- how to apply advanced concepts like join, transaction etc using slick
- integrating with postgres specific datatypes using slick-pg
- how to auto-generate slick schema from database 

## 1. Introduction 
Slick is a functional relational library in Scala which makes working with relational databases easier. We can interact with the database almost in the same way as we do with Scala collections. Additionally, Slick uses asynchronous programming using scala Futures. It also supports the usage of plain SQL queries which might come in handy if we want to exactly control the way the queries are built. 
Apart from that, Slick provides compile time safety by mapping the database columns to scala datatypes. This ensures that it is less likely to get runtime errors for database queries.

We assume the readers have basic knowledge of Scala and PostgreSQL for this post.

## 2. Setup
For this blog, we will be using Slick with _PostgreSQL_ and _Hikari_ connection pool. Also we will be using _slick-pg_ library for advanced postgres features. Let's add all the necessary dependencies together in the _build.sbt_:

```scala
libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick" % "3.3.3",
  "org.postgresql" % "postgresql" % "42.3.4",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.3.3",
  "com.github.tminglei" %% "slick-pg" % "0.20.3",
  "com.github.tminglei" %% "slick-pg_play-json" % "0.20.3"
)
```

We need to have a working PostgreSQL database for testing the application. Some of the options are:
- Installing a PostgreSQL database locally
- Use a dockerized POstgreSQL instance (locally)
- Use any free online services such as [ElephantSQL](https://www.elephantsql.com/)

Next, we can add the database configurations to the config file such as _application.conf_.

```scala
postgres = {
  connectionPool = "HikariCP" 
  dataSourceClass = "org.postgresql.ds.PGSimpleDataSource" 
  properties = {
    serverName = "localhost"
    portNumber = "5432"
    databaseName = "movies"
    user = "postgres"
    password = "admin"
  }
  numThreads = 10
}
```
Slick uses a combination of case classes and Slick Table classes to model the database schema. For that, we need to provide a JDBC Profile. Since we are using PostgreSQL, we can use the _PostgresProfile_. 

As next step, we can create a connection instance using the _PostgresProfile_ and previously defined configuration.
```scala
import PostgresProfile.profile.api._
object Connection {
  val db = Database.forConfig("postgres")
}
```

## 3. Models

As mentioned in the introduction, Slick provides compile time safety by mapping the database fields to the scala case classes. So, we need to create a case class correponding to the database table for us to use in the queries. 

```scala
final case class Movie(
    id: Long,
    name: String,
    releaseDate: LocalDate,
    lengthInMin: Int
)
```
Next, we need to create a slick table for mapping the database fields to the case class. We need to import the PostgresProfile api to get the relevant methods in scope. 

```scala
class SlickTablesGeneric(val profile: PostgresProfile) {
  import profile.api._
  class MovieTable(tag: Tag) extends Table[Movie](tag, "Movie") {
    def id = column[Long]("movie_id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def releaseDate = column[LocalDate]("release_date")
    def lengthInMin = column[Int]("length_in_min")
    override def * = (id, name, releaseDate, lengthInMin) <> (Movie.tupled, Movie.unapply)
  }
}
```
We have created defs for database fields with their correct datatypes. We can mention the primary key using the property _O.PrimaryKey_. Similarly, we can mark the column as an auto increment field by using _O.AutoInc_. By setting the column as auto increment, PostgreSQL will generate an incremented numeric value for the primary key.

We need to override the method `*` that maps the column to the case class _Movie_. 
Now, we can create an instance for the _MovieTable_ :

```scala
lazy val movieTable = TableQuery[MovieTable]
```
We can also create a Singleton object for the _SlickTablesGeneric_ by providing the Profile. For now, we will be using the profile provided by the slick. Later, we can see how to write custom profile. 

```scala
object SlickTables extends SlickTablesGeneric(PostgresProfile)
```

## 4. Basic CRUD Operations
Now that we have completed the initial setup, we can look at performing basic CRUD operations using Slick. We will be using the _movieTable_ we created for all the operations. But before that, we need to manually create the database in Postgres and also create the table. 
```sql
create database movies;
create table if not exists "Movie" ("movie_id" BIGSERIAL NOT NULL PRIMARY KEY,"name" VARCHAR NOT NULL,"release_date" DATE NOT NULL,"length_in_min" INTEGER NOT NULL);
```
We are using more tables as part of this blog, and the table creation queries are provided [here](link_it_here).

### 4.1. Insert Rows
Firstly, we can insert a record into the database. 
```scala
val shawshank = Movie(1L, "Shawshank Redemptions", LocalDate.of(1994, 4, 2), 162)

def insertMovie(movie: Movie): Future[Int] = {
  val insertQuery = SlickTables.movieTable += movie
  Connection.db.run(insertQuery)
}
```
The `db.run()` method takes an instance of `DBIOAction` and execute the action on database.

Now we can invoke _insertMovie(shawshank)_ and it will asynchronously insert the record into the database. Since we have used the _BIGSERIAL_ for the `movie_id`, postgres will automatically assign a numeric value. 
If we want to copy the generated id and return it along with the inserted object, we can use theee method `returning` as:
```scala
val insertQueryWithReturn = SlickTables.movieTable.returning(SlickTables.movieTable) += movie
val movieFuture: Future[Movie] = db.run(insertQueryWithReturn)
```

If we want to ensure that the provided movie_id is used instead of the autogenerated one, we can use the method `forceInsert` instead of `+=`. 

```scala
val forceInsertQuery = SlickTables.movieTable forceInsert movie
```
We can also insert multiple movies at a time.
```scala
val insertBatchQuery = SlickTables.movieTable ++= Seq(movie)
val forceInsertBatchQuery = SlickTables.movieTable forceInsertAll Seq(movie)
```

### 4.2. Querying Rows from Database
Now, let's see how to execute select queries and fetch the rows from the table. To get all the movies, we can use the `movieTable` as:
```scala
val movies: Future[Seq[Movie]] = db.run(SlickTables.movieTable.result)
```
The method `.result` on the _movieTable_ will create an executable action. We can filter the rows in the table using the _filter_ method just like on a collection. However, we need to use `===` method instead. 

```scala
def findMovieByName(name: String): Future[Option[Movie]] = {
    db.run(SlickTables.movieTable.filter(_.name === name).result.headOption)
}
```

### 4.3. Update a Row
We can use the method `update` to modify a record after applying the filter. 
```scala
def updateMovie(movieId: Long, movie: Movie): Future[Int] = {
    val updateQuery = SlickTables.movieTable.filter(_.id === movieId).update(movie)
    db.run(updateQuery)
}
```
In the above sample, if the filter by id is not applied, it will update all the records with the same value.

If we want to update only a particular field, we can use the `map` to get the field and then update it. For example, to update the movie name, we can do as:
```scala
val updateMovieNameQuery = SlickTables.movieTable.filter(_.id === movieId).map(_.name).update("newName")
``` 

### 4.4. Delete a Row
We can also delete a record from the database by using the method `delete`. To delete a movie we can do:
```scala
val deleteQuery = SlickTables.movieTable.filter(_.id === movieId).delete
```

## 5. Advanced Options
Since we are become familiar with the basic CRUD operations, let's look at some more advanced concepts.

### 5.1 Executing Plain Query
Sometimes we might need to run plain SQL queries to get the results in a better way. Slick provides multiple ways to run the plain query. Let's look at a simple way to run the plain query. However, since we are using the plain query, we need to provide some additional information to slick to make the queries typesafe. For that, we need to provide an implicit value with the mappings.

```scala
def getAllMoviesByPlainQuery: Future[Seq[Movie]] = {
  implicit val getResultMovie =
    GetResult(r => Movie(r.<<, r.<<, LocalDate.parse(r.nextString()), r.<<))
  val moviesQuery = sql"""SELECT * FROM public."Movie" """.as[Movie]
  db.run(moviesQuery)
}
```

### 5.2. Transactional Queries
When we have multiple queries that modifies the database table, it is always advisable to use transactions. It will ensure that the modifications happen atomically. We can combine multiple queries in Slick using _DBIO.seq_. 

```scala
def saveWithTransaction(movie: Movie, actor: Actor): Future[Unit] = {
  val saveMovieQuery = SlickTables.movieTable += movie
  val saveActorQuery = SlickTables.actorTable += actor
  val combinedQuery = DBIO.seq(saveMovieQuery, saveActorQuery)
  db.run(combinedQuery.transactionally)
}
```
The method `transactionally` on the _combinedQuery_ will make both the insert queries in a single transaction. So, if one of the fails, both the inserts will be rolled back.

### 5.3. Joining Tables

Slick also provides methods to write join queries. Let's try to join _Actor_ table and _MovieActorMapping_ table to fetch the results.

```scala
def getActorsByMovie(movieId: Long): Future[Seq[Actor]] = {
  val joinQuery = for {
    res <- movieActorMappingTable
      .filter(_.movieId === movieId)
      .join(actorTable)
      .on(_.actorId === _.id)
  } yield res._2
  db.run(joinQuery.result)
}
```
The above join operation returns a tuple of both the table results, but here we are only returning the _Actor_ table results and discarding the other one.

Apart from this, Slick also provide methods for left and right outer joins as well.

### 5.4. Mapping Enumeration Field to Column
In all the above samples, we used standard data types such as Int, String, Date, etc for the case classes. If we want to use a custom type, we need to provide an implicit converter to convert between the scala type and relevant column type. Let's try to use an enumeration field in case class. 

```scala
object StreamingProvider extends Enumeration {
  type StreamingProviders = Value
  val Netflix = Value("Netflix")
  val Hulu = Value("Hulu")
}
final case class StreamingProviderMapping(
  id: Long,
  movieId: Long,
  streamingProvider: StreamingProvider.StreamingProviders
)
```
Now, let's create the mapping table for slick as:
```scala
class StreamingProviderMappingTable(tag: Tag)
    extends Table[StreamingProviderMapping](tag, "StreamingProviderMapping") {

  implicit val providerMapper =
    MappedColumnType.base[StreamingProvider.StreamingProviders, String](
      e => e.toString,
      s => StreamingProvider.withName(s)
    )

  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def movieId = column[Long]("movie_id")
  def streamingProvider = column[StreamingProvider.StreamingProviders]("streaming_provider")
  override def * =
    (
      id,
      movieId,
      streamingProvider
    ) <> (StreamingProviderMapping.tupled, StreamingProviderMapping.unapply)
}
lazy val streamingProviderMappingTable = TableQuery[StreamingProviderMappingTable]
```
Here, we defined an implicit converter for _StreamingProvider_ enum. Since it is available in the scope, we can map the field with the enum. Slick will use the _providerMapper_ to convert between case class and database column.

### 5.5. Generating DDL Scripts from Slick Tables
Slick also provides a way to generate DDL scripts from the slick tables. This way, we can generate the table scripts and track the versions easily. This will also make sure that we can easily set up an empty database.
To generate the DDL scripts, we need to first collect all the slick tables in a collection. 

```scala
val tables = Seq(movieTable, actorTable, movieActorMappingTable, streamingProviderMappingTable)
```

Then we can combine them into a slick DDL schema using:
```scala
val ddl: profile.DDL = tables.map(_.schema).reduce(_ ++ _)
```
Now, we can invoke the method to generate the scripts:
```scala
SlickTables.ddl.createIfNotExistsStatements.mkString(";\n")
```

## 6. Slick-Pg for Postgres
PostgreSQL has additional powerful datatypes and features. We can use a thirdparty library [slick-pg](https://github.com/tminglei/slick-pg) to use those features in Slick with ease. We have already added the necessary dependencies in the _build.sbt_. 

To use it, we need to write a custom Postgres Profile and use it instead of the slick provided _PostgresProfile_. We can mix-in the traits from slik-pg based on the required features of postgres. Let's add the support for JSON, HStore and Array datatypes.

```scala
trait CustomPostgresProfile
    extends ExPostgresProfile with PgJsonSupport with PgPlayJsonSupport 
    with PgArraySupport with PgHStoreSupport with PgDate2Support {
  override def pgjson = "jsonb"
  override protected def computeCapabilities: Set[slick.basic.Capability] =
    super.computeCapabilities + slick.jdbc.JdbcCapabilities.insertOrUpdate

  override val api = CustomPGAPI
  object CustomPGAPI
      extends API
      with JsonImplicits
      with HStoreImplicits
      with ArrayImplicits
      with DateTimeImplicits {
    implicit val strListTypeMapper = new SimpleArrayJdbcType[String]("text").to(_.toList)
    implicit val playJsonArrayTypeMapper =
      new AdvancedArrayJdbcType[JsValue](
        pgjson,
        (s) => utils.SimpleArrayUtils.fromString[JsValue](Json.parse(_))(s).orNull,
        (v) => utils.SimpleArrayUtils.mkString[JsValue](_.toString())(v)
      ).to(_.toList)
  }
}
object CustomPostgresProfile extends CustomPostgresProfile
```
Now, we can use `CustomPostgresProfile` instead of the `PostgresProfile` to make use of these features.

### 6.1. Querying from an Array Column

Let's see how we can use filter query on an postgres array column. We have created a _MovieLocationsTable_ which has a _movieLocations_ array field. If we want to filter movies which was shot on any of the input locations, we can do that as:
```scala
val locations: List[String] = List("location1", "location2")
val query = SpecialTables.movieLocationsTable.filter(_.locations @& locations.bind)
```
The operator `@&` will return true if there is an overlap between the input list and the database column. There are many other such operators on array field, but we are not going to go through all of it here.

### 6.2. Querying from an HStore Column

Postgres has an extension called as `hstore`. Once it is installed, we can use the datatype _hstore_ for the columns. It is a type which stores the data as key and value pair, equivalent to an _Map_ type in Scala/Java. We can see how to filter a hstore column using slick-pg:

```scala
def getMoviesByDistributor(distributor: String): Future[Seq[MovieProperties]] = {
  val condition = Map("distributor" -> distributor)
  val query = SpecialTables.moviePropertiesTable.filter(_.properties @> condition.bind)
  Connection.db.run(query.result)
}
```
The operator `@>` filters the hstore column for the key _distributor_ and the input value. Similar to array, there are many other operators in hstore as well.

### 6.3. Querying from a JSON Column
Postgres also supports JSON datatype by default. Slick-Pg also has support for querying the json columns. Let's look at it with an example:

```scala
def getActorsBornOn(year: String): Future[Seq[ActorDetails]] = {
  Connection.db.run(
    SpecialTables.actorDetailsTable.filter(_.personal.+>>("birthYear") === year.bind).result
  )
}
```
In the above code, we are filtering the _personal_ column which is a JSON type in _ActorDetails_ table. The method `+>>` will get the json key _birthYear_ and compares it with the value provided.

## 7. Code Generation
So far, we have written the Slick tables manually. If we are following a database first approach, slick provides a way to generate the mapping tables easily. For now, we are ignoring the slick-pg types and trying to generate the slick mappings for basic datatypes. 

We can use an sbt plugin to do that. For that, let's add the following lines to the _plugins.sbt_ file.
```scala
addSbtPlugin("com.github.tototoshi" % "sbt-slick-codegen" % "1.4.0")
libraryDependencies += "org.postgresql" % "postgresql" % "42.3.4"
```

Once the sbt is refreshed, we can add the configurations in _build.sbt_:
```scala
slickCodegenSettings
enablePlugins(CodegenPlugin)
slickCodegenDatabaseUrl := "jdbc:postgresql://localhost:5432/movies"
slickCodegenDatabaseUser := "postgres"
slickCodegenDatabasePassword := "admin"
slickCodegenDriver := slick.jdbc.PostgresProfile
slickCodegenJdbcDriver := "org.postgresql.Driver"
slickCodegenOutputPackage := "com.rockethejvm.generated.models"
slickCodegenCodeGenerator := { (slickModel: model.Model) => new SourceCodeGenerator(slickModel) }
```

Now, we can use the sbt command `slickCodegen`. This will generate the case classes and slick tables. 

We can also customise the code generator class to use advanced features like slick-pg, but we will not be looking at this as part of this blog. 

## 8. Conclusion
In this article, we looked at Slick and how we can execute different types of queries using it. We also introduced some of the advanced features using slick-pg. The sample code used in this article is available in GitHub. 