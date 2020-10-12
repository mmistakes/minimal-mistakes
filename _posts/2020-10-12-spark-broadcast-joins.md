---
title: "Broadcast Joins in Apache Spark: an Optimization Technique"
date: 2020-10-12
header:
  image: "/images/blog cover.jpg"
tags: [spark, optimization]
excerpt: "Broadcast joins in Apache Spark are one of the most bang-for-the-buck techniques for optimizing speed and avoiding memory issues. Let's take a look." 
---

## 1. Essentials

This article is for the Spark programmers who know some fundamentals: how data is split, how Spark generally works as a computing engine, plus some essential DataFrame APIs.

For this article, we use Spark 3.0.1, which you can either [download](https://spark.apache.org/downloads.html) as a standalone installation on your computer, or you can import as a library definition in your Scala project, in which case you'll have to add the following lines to your build.sbt:

```scala
val sparkVersion = "3.0.1"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion,
  "org.apache.spark" %% "spark-sql" % sparkVersion,
)
``` 

If you chose the standalone version, go ahead and start a Spark shell, as we will run some computations there. If you chose the library version, create a new Scala application and add the following tiny starter code:

```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder()
    .appName("Broadcast Joins")
    .master("local")
    .getOrCreate()
```

For this article, we'll be using the DataFrame API, although a very similar effect can be seen with the low-level RDD API.

## 2. A Tale of an Innocent Join

Here's the scenario. Let's say we have a huge dataset - in practice, in the order of magnitude of billions of records or more, but here just in the order of a million rows so that we might live to see the result of our computations locally.

```scala
// large table
val table = spark.range(1, 100000000) // column is "id"
```

At the same time, we have a small dataset which can easily fit in memory. For some reason, we need to join these two datasets. Examples from real life include:

  - tagging each row with one of n possible tags, where n is small enough for most 3-year-olds to count to
  - finding the occurrences of some preferred values (so some sort of filter)
  - doing a variety of lookups with the small dataset acting as a lookup table
  
Regardless, we join these two datasets. Let's take a combined example and let's consider a dataset that gives medals in a competition:

```scala
val rows = sc.parallelize(List(
  Row(1, "gold"),
  Row(2, "silver"),
  Row(3, "bronze")
))

val rowsSchema = StructType(Array(
  StructField("id", IntegerType),
  StructField("medal", StringType)
))

// small table
val lookupTable: DataFrame = spark.createDataFrame(rows, rowsSchema)
```

Having these two DataFrames in place, we should have everything we need to run the join between them. It's easy, and it should be quick, since the small DataFrame is really small:

```scala
val joined = table.join(lookupTable, "id")
joined.show()
```

Brilliant - all is well. Except it takes a bloody ice age to run.

## 3. The Large-Small Join Problem

Why does the above join take so long to run?

If you ever want to debug performance problems with your Spark jobs, you'll need to know how to [read query plans](https://blog.rockthejvm.com/reading-query-plans/), and that's what we are going to do here as well. Let's have a look at this job's query plan so that we can see the operations Spark will perform as it's computing our innocent join:

```scala
joined.explain()
```

This will give you a piece of text that looks very cryptic, but it's information-dense:

```perl
== Physical Plan ==
*(5) Project [id#259L, medal#264]
+- *(5) SortMergeJoin [id#259L], [cast(id#263 as bigint)], Inner
   :- *(2) Sort [id#259L ASC NULLS FIRST], false, 0
   :  +- Exchange hashpartitioning(id#259L, 200)
   :     +- *(1) Range (1, 10000000, step=1, splits=6)
   +- *(4) Sort [cast(id#263 as bigint) ASC NULLS FIRST], false, 0
      +- Exchange hashpartitioning(cast(id#263 as bigint), 200)
         +- *(3) Filter isnotnull(id#263)
            +- Scan ExistingRDD[id#263,order#264]
```

In this query plan, we read the operations in dependency order from top to bottom, or in computation order from bottom to top. Let's read it top-down:

  - the final computation of the `id` and the `medal` obtained after the join of the two DataFrames, which requires
  - a sort-merge join on the columns `id` and `id` (with different identifiers under the hash tag), which requires
    - a sort of the big DataFrame, which comes after
    - **a shuffle of the big DataFrame**
  - and a sort + shuffle + small filter on the small DataFrame
  
The shuffle on the big DataFrame - the one at the middle of the query plan - is required, because a join requires matching keys to stay on the same Spark executor, so Spark needs to redistribute the records by hashing the join column. This is a shuffle. But as you may already know, a shuffle is a massively expensive operation. On billions of rows it can take hours, and on more records, it'll take... more.

## 4. Enter Broadcast Joins

Fundamentally, Spark needs to somehow guarantee the correctness of a join. Normally, Spark will redistribute the records on both DataFrames by hashing the joined column, so that the same hash implies matching keys, which implies matching rows.

There is another way to guarantee the correctness of a join in this situation (large-small joins) by simply duplicating the small dataset on all the executors. In this way, each executor has all the information required to perform the join at its location, without needing to redistribute the data. This is called a broadcast.

```scala
val joinedSmart = table.join(broadcast(lookupTable), "id")
joinedSmart.show()
```

Much to our surprise (or not), this join is pretty much instant. The query plan explains it all:

```perl
== Physical Plan ==
*(2) Project [id#294L, order#299]
+- *(2) BroadcastHashJoin [id#294L], [cast(id#298 as bigint)], Inner, BuildRight
   :- *(2) Range (1, 100000000, step=1, splits=6)
   +- BroadcastExchange HashedRelationBroadcastMode(List(cast(input[0, int, false] as bigint)))
      +- *(1) Filter isnotnull(id#298)
         +- Scan ExistingRDD[id#298,order#299]
```

It looks different this time. No more shuffles on the big DataFrame, but a BroadcastExchange on the small one. Because the small one is tiny, the cost of duplicating it across all executors is negligible.

## 5. Automatic Detection

In many cases, Spark can automatically detect whether to use a broadcast join or not, depending on the size of the data. If Spark can detect that one of the joined DataFrames is small (10 MB by default), Spark will automatically broadcast it for us. The code below:

```scala
val bigTable = spark.range(1, 100000000)
val smallTable = spark.range(1, 10000) // size estimated by Spark - auto-broadcast
val joinedNumbers = smallTable.join(bigTable, "id")
```

produces the following query plan:

```perl
== Physical Plan ==
*(2) Project [id#14L]
+- *(2) BroadcastHashJoin [id#14L], [id#12L], Inner, BuildLeft
   :- BroadcastExchange HashedRelationBroadcastMode(List(input[0, bigint, false])), [id=#88]
   :  +- *(1) Range (1, 10000, step=1, splits=1)
   +- *(2) Range (1, 100000000, step=1, splits=1)
```

which looks very similar to what we had before with our manual broadcast.

However, in the previous case, Spark did not detect that the small table could be broadcast. How come? The reason is that Spark will not determine the size of a local collection because it might be big, and evaluating its size may be an O(N) operation, which can defeat the purpose before any computation is made.

Spark will perform auto-detection when

  - it constructs a DataFrame from scratch, e.g. `spark.range`
  - it reads from files with schema and/or size information, e.g. Parquet
  
## 6. Configuring Broadcast Join Detection

The threshold for automatic broadcast join detection can be tuned or disabled. The configuration is `spark.sql.autoBroadcastJoinThreshold`, and the value is taken in bytes. If you want to configure it to another number, we can set it in the SparkSession:

```scala
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", 104857600) // 100MB detection
```

or deactivate it altogether by setting the value to -1:
 
```scala
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", -1) 
```

This is also a good tip to use while testing your joins in the absence of this automatic optimization. We also use this in our [Spark Optimization course](https://rockthejvm.com/p/spark-optimization) when we want to test other optimization techniques.

## 7. Conclusion

Broadcast joins are one of the first lines of defense when your joins take a long time and you have an intuition that the table sizes might be disproportionate. It's one of the cheapest and most impactful performance optimization techniques you can use. Broadcast joins may also have other benefits (e.g. mitigating OOMs), but that'll be the purpose of another article.






