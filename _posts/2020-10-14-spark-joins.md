---
title: "ALL the Joins in Spark DataFrames"
date: 2020-10-12
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [spark]
excerpt: "It's obvious that Spark allows us to join tables. What's not obvious is how many different kinds of joins Spark supports. We explore them in this article."
---

This article is for the beginner Spark programmer. If you're just starting out and you're curious about the kinds of operations Spark supports, this blog post is for you.

## Setup

We use Spark 3.0.1, which you can [download](https://spark.apache.org/downloads.html) to your computer or set up manually as a library in a Scala & SBT project, with the following added to your build.sbt:

```scala
val sparkVersion = "3.0.1"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion,
  "org.apache.spark" %% "spark-sql" % sparkVersion,
)
```

If you use the standalone installation, you'll need to start a Spark shell. If you're in a dedicated Scala application, add the following small boilerplate at the start of your code:

```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder()
    .appName("ALL THE JOINS")
    .master("local")
    .getOrCreate()

val sc = spark.sparkContext // for creating RDD through parallelize
```

This article explores the different kinds of joins supported by Spark. We'll use the DataFrame API, but the same concepts are applicable to RDDs as well.

## Joining DataFrames

Let's say we're working on a dataset of kids, where they need to organize into teams to complete a project for school. Assume lots of records in practice, but we'll be working on smaller data here to prove a point. You can copy the following data:

```scala
import org.apache.spark.sql.Row
import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}

val kids = sc.parallelize(List(
  Row(40, "Mary", 1),
  Row(41, "Jane", 3),
  Row(42, "David", 3),
  Row(43, "Angela", 2),
  Row(44, "Charlie", 1),
  Row(45, "Jimmy", 2),
  Row(46, "Lonely", 7)
))

val kidsSchema = StructType(Array(
  StructField("Id", IntegerType),
  StructField("Name", StringType),
  StructField("Team", IntegerType),
))

val kidsDF = spark.createDataFrame(kids, kidsSchema)

val teams = sc.parallelize(List(
  Row(1, "The Invincibles"),
  Row(2, "Dog Lovers"),
  Row(3, "Rockstars"),
  Row(4, "The Non-Existent Team")
))

val teamsSchema = StructType(Array(
  StructField("TeamId", IntegerType),
  StructField("TeamName", StringType)
))

val teamsDF = spark.createDataFrame(teams, teamsSchema)
```

## Join Type 1: Inner Joins

If we wanted to know the team names for every kid in our dataset, we would do the following:

```scala
val joinCondition = kidsDF.col("Team") === teamsDF.col("TeamId")
val kidsTeamsDF = kidsDF.join(teamsDF, joinCondition, "inner")
```

which would give us the following table if we showed the new DataFrame:

```
+---+-------+----+------+---------------+
| Id|   Name|Team|TeamId|       TeamName|
+---+-------+----+------+---------------+
| 40|   Mary|   1|     1|The Invincibles|
| 44|Charlie|   1|     1|The Invincibles|
| 41|   Jane|   3|     3|      Rockstars|
| 42|  David|   3|     3|      Rockstars|
| 43| Angela|   2|     2|     Dog Lovers|
| 45|  Jimmy|   2|     2|     Dog Lovers|
+---+-------+----+------+---------------+
```

The above join we showed above is the "natural" kind of join we would expect when we combine two different tables - we'll keep just the rows from both tables that match the join condition, and we'll form a new table out of those combined rows. This is called an **inner** join, and it's the default join type Spark will perform... that is, unless we specify another kind of join.

This is where the fun starts.

## Join Type 2: Outer Joins

Assuming we still want to attach a team to every kid, the inner join above will completely omit the Lonely kid in our DataFrame, because this poor kid doesn't have a team. We would be able to show this kid in the resulting table by placing a null next to it, so that the class teacher can spot poor Lonely and assign them a team.

A left-outer join does that. All the rows in the left/first DataFrame will be kept, and wherever a row doesn't have any corresponding row on the right (the argument to the `join` method), we'll just put nulls in those columns:

```scala
kidsDF.join(teamsDF, joinCondition, "left_outer")
```

Notice the `"left_outer""` argument there. This will print the following table:

```
+---+-------+----+------+---------------+
| Id|   Name|Team|TeamId|       TeamName|
+---+-------+----+------+---------------+
| 40|   Mary|   1|     1|The Invincibles|
| 44|Charlie|   1|     1|The Invincibles|
| 41|   Jane|   3|     3|      Rockstars|
| 42|  David|   3|     3|      Rockstars|
| 46| Lonely|   7|  null|           null|
| 43| Angela|   2|     2|     Dog Lovers|
| 45|  Jimmy|   2|     2|     Dog Lovers|
+---+-------+----+------+---------------+
```

Now poor Lonely has null where the team details are supposed to be shown.

If we wanted to do the reverse - show all the teams which have no members, we would do a `right_outer` join. Same principle:

```scala
kidsDF.join(teamsDF, joinCondition, "left_outer")
```

(notice the argument to the method there) and the output would be:

```
+----+-------+----+------+--------------------+
|  Id|   Name|Team|TeamId|            TeamName|
+----+-------+----+------+--------------------+
|  40|   Mary|   1|     1|     The Invincibles|
|  44|Charlie|   1|     1|     The Invincibles|
|  41|   Jane|   3|     3|           Rockstars|
|  42|  David|   3|     3|           Rockstars|
|null|   null|null|     4|The Non-Existent ...|
|  43| Angela|   2|     2|          Dog Lovers|
|  45|  Jimmy|   2|     2|          Dog Lovers|
+----+-------+----+------+--------------------+
```

Notice how the Non-Existent Team has no members, so it appears once in the table with `null` where a kid is supposed to be.

If we wanted to show both kids that have no teams AND teams that have no kids, we can get a combined result by using an `outer` join:

```
kidsDF.join(teamsDF, joinCondition, "outer")
```

which gives us

```
+----+-------+----+------+--------------------+
|  Id|   Name|Team|TeamId|            TeamName|
+----+-------+----+------+--------------------+
|  40|   Mary|   1|     1|     The Invincibles|
|  44|Charlie|   1|     1|     The Invincibles|
|  41|   Jane|   3|     3|           Rockstars|
|  42|  David|   3|     3|           Rockstars|
|null|   null|null|     4|The Non-Existent ...|
|  43| Angela|   2|     2|          Dog Lovers|
|  45|  Jimmy|   2|     2|          Dog Lovers|
| 46 | Lonely|   7|  null|                null|
+----+-------+----+------+--------------------+
```

You've probably encountered these concepts from standard databases. We use inner joins and outer joins (left, right or both) ALL the time. However, this is where the fun starts, because Spark supports more join types. Let's have a look.

## Join Type 3: Semi Joins

Semi joins are something else. Semi joins take all the rows in one DF such that _there is a row on the other DF so that the join condition is satisfied_. In other words, it's essentially a filter based on the existence of a matching key on the other DF. In SQL terms, we can express this computation as `WHERE EXISTS (SELECT * FROM otherTable WHERE joinCondition)`.

For our use case, a left semi join will show us all kids which have a team:

```scala
kidsDF.join(teamsDF, joinCondition, "left_semi").show
```

and we would show this:

```
+---+-------+----+
| Id|   Name|Team|
+---+-------+----+
| 40|   Mary|   1|
| 44|Charlie|   1|
| 41|   Jane|   3|
| 42|  David|   3|
| 43| Angela|   2|
| 45|  Jimmy|   2|
+---+-------+----+
```

As expected, Lonely is not here.

## Join Type 4: Anti Joins

Anti joins are also very interesting. They're essentially the opposite of semi joins: they return all the rows from one table such that _there is NO row on the other table satisfying the join condition_. In SQL terms, this is equivalent with `WHERE NOT EXISTS (SELECT * FROM otherTable WHERE joinCondition)`.

In our case, a left anti join would show all kids who do NOT have a team yet:

```scala
kidsDF.join(teamsDF, joinCondition, "left_anti").show
```

As expected, Lonely should show up here:

```
+---+------+----+
| Id|  Name|Team|
+---+------+----+
| 46|Lonely|   7|
+---+------+----+
```

## Join type 5: Cross Joins

A cross join describes all the possible combinations between two DFs. Every one is game. Here's how we can do it:

```scala
kidsDF.crossJoin(teamsDF)
```

This would produce the quite-big-for-small-data table:

```
+---+-------+----+------+--------------------+
| Id|   Name|Team|TeamId|            TeamName|
+---+-------+----+------+--------------------+
| 40|   Mary|   1|     1|     The Invincibles|
| 40|   Mary|   1|     2|          Dog Lovers|
| 40|   Mary|   1|     3|           Rockstars|
| 40|   Mary|   1|     4|The Non-Existent ...|
| 41|   Jane|   3|     1|     The Invincibles|
| 41|   Jane|   3|     2|          Dog Lovers|
| 41|   Jane|   3|     3|           Rockstars|
| 41|   Jane|   3|     4|The Non-Existent ...|
| 42|  David|   3|     1|     The Invincibles|
| 42|  David|   3|     2|          Dog Lovers|
| 42|  David|   3|     3|           Rockstars|
| 42|  David|   3|     4|The Non-Existent ...|
| 43| Angela|   2|     1|     The Invincibles|
| 43| Angela|   2|     2|          Dog Lovers|
| 43| Angela|   2|     3|           Rockstars|
| 43| Angela|   2|     4|The Non-Existent ...|
| 44|Charlie|   1|     1|     The Invincibles|
| 44|Charlie|   1|     2|          Dog Lovers|
| 44|Charlie|   1|     3|           Rockstars|
| 44|Charlie|   1|     4|The Non-Existent ...|
+---+-------+----+------+--------------------+
```

So as you can see, the size of your resulting data simply explodes. Being a cartesian product, the size of the resulting DF is the product of the individual sizes of the joined DFs. So be careful in production - I'd generally avoid cross joins unless absolutely necessary.

## Conclusion

There you have it, folks: all the join types you can perform in Apache Spark. Even if some join types (e.g. inner, outer and cross) may be quite familiar, there are some interesting join types which may prove handy as filters (semi and anti joins).
