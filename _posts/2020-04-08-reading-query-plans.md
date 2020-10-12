---
title: "Reading Spark Query Plans"
date: 2020-04-08
header:
  image: "/images/blog cover.jpg"
tags: [spark, how to]
excerpt: "In this article you'll learn one of the most important Spark skill: reading how your job will run. This is foundational to any further Spark optimization."
---
This article is for the Spark programmer who has at least some fundamentals, e.g. how to create a DataFrame and how to do basic operations like selects and joins, but has not dived into how Spark works yet. Perhaps you're interested in boosting the performance out of your Spark jobs.

## Prerequisites

The code I'll be writing is inside a Spark shell with version 3.0.0, which you can find <a href = "https://spark.apache.org/downloads.html">here</a> for download. The default choices in the dropdowns will give you a pre-compiled Spark distribution. Just download, unzip, navigate to the bin folder, then run the spark-shell executable.

That is, if you've never installed Spark before.

## How Spark doesn't run

You're probably aware that Spark has this lazy execution model, i.e. that you write transformations but they're not actually run until you call an action, like a show, or collect, or take, etc.

When you write transformations, Spark will automatically build up a dependency tree of your DataFrames, which will actually end up executing when you call an action. Let me give an example:

```scala
val simpleNumbers = spark.range(1, 1000000)
val times5 = simpleNumbers.selectExpr("id * 5 as id")
```

That times5 DataFrame will not actually get evaluated. If you hit those two lines in the Spark shell, you'll notice that they return instantly. However, when you do

```scala
times5.show()
```

then this will take a little more than an instant - that's because Spark is only now performing the actual computations. If you want to see what operations Spark did, you can try explaining the DF:

```scala
times5.explain()
```

and this will give you the prettiest thing:

```perl
== Physical Plan ==
*(1) Project [(id#0L * 5) AS id#2L]
+- *(1) Range (1, 1000000, step=1, splits=6)
```

This is a query plan. When you call the explain method, the final plan - the physical one that will actually be run on executors - will be shown here. You can inspect this plan for your massive computations before kicking off any job. This is particularly important because the ability to read and interpret query plans allows you to predict performance bottlenecks.

## Reading plans

So let's go over some examples of query plans and how to read them. Let's go back to the one we've just shown:

```perl
== Physical Plan ==
*(1) Project [(id#0L * 5) AS id#2L]
+- *(1) Range (1, 1000000, step=1, splits=6)
```

We read this plan backwards, bottom to top:

1) First Spark builds a Range object from 1 to 1000000. The splits parameter defines the number of partitions.
2) Then Spark does a "project", which is the mathematical term for a database/DF select. So we're selecting the column id with the identifier 0L (long type), and multiplying the value there with 5. The result will be a new column with the name id and the identifier 2.

Or we can read this plan top to bottom, like this:

2) The end of the computation is a "project" (with the meaning above), which depends on
1) A Range from 1 to 1 million in 6 partitions.

Not too hard. Let's do another:

```scala
val moreNumbers = spark.range(1, 10000000, 2)
val split7 = moreNumbers.repartition(7)
split7.explain()
```

```scalaPerl
== Physical Plan ==
Exchange RoundRobinPartitioning(7)
+- *(1) Range (1, 10000000, step=2, splits=6)
```

Same operation first, but the next step is an Exchange, which is another name for a shuffle. You're probably aware - a shuffle is an operation in which data is exchanged (hence the name) between all the executors in the cluster. The more massive your data and your cluster is, the more expensive this shuffle will be, because sending data over takes time. For performance reasons, it's best to keep shuffles to a minimum.

So a performance tip: whenever you see Exchange in a query plan, that's a perf bottleneck.

Let's do one more, this time make it complex:

```scala
val ds1 = spark.range(1, 10000000)
val ds2 = spark.range(1, 10000000, 2)
val ds3 = ds1.repartition(7)
val ds4 = ds2.repartition(9)
val ds5 = ds3.selectExpr("id * 5 as id")
val joined = ds5.join(ds4, "id")
val sum = joined.selectExpr("sum(id)")
sum.explain
```

```scalaPerl
== Physical Plan ==
*(7) HashAggregate(keys=[], functions=[sum(id#36L)])
+- Exchange SinglePartition
   +- *(6) HashAggregate(keys=[], functions=[partial_sum(id#36L)])
      +- *(6) Project [id#36L]
         +- *(6) SortMergeJoin [id#36L], [id#32L], Inner
            :- *(3) Sort [id#36L ASC NULLS FIRST], false, 0
            :  +- Exchange hashpartitioning(id#36L, 200)
            :     +- *(2) Project [(id#30L * 5) AS id#36L]
            :        +- Exchange RoundRobinPartitioning(7)
            :           +- *(1) Range (1, 10000000, step=1, splits=6)
            +- *(5) Sort [id#32L ASC NULLS FIRST], false, 0
               +- Exchange hashpartitioning(id#32L, 200)
                  +- Exchange RoundRobinPartitioning(9)
                     +- *(4) Range (1, 10000000, step=2, splits=6)
```

Now that's a nasty one. Let's take a look.

Notice this plan is now branched. It has two sections:

section 1, bottom:
    A Range 1 to 1 million, in steps of 2, in 6 partitions,
    which is repartitioned (shuffled) into 9 partitions,
    then repartitioned again by a hash partitioner with the key being the column id (identifier 32) into 200 partitions,
    then sorted by the column id (identifier 32) ascending.

section 2, less bottom:
    A range 1 to 1 million, in steps of 1, in 6 partitions,
    repartitioned (shuffled) to 7 partitioned,
    modified as id * 5, with the name id (identifier 36)
    then repartitioned again by a hash partitioner with the key being the column id (identifier 36) into 200 partitions
    then sorted by that

Then those two sections are used for the SortMergeJoin. The join operation requires that the DFs in question be partitioned with the same partitioning scheme and sorted. This is why Spark does all these operations.

Then we have a project (select), in which we're selecting just one of the two columns, because otherwise we'd have duplicate columns.

Then we have an operation called HashAggregate, in which partial sums are being computed on every partition.

Then, all the partial sums are brought to a single partition by the last exchange.

Finally we have a single HashAggregate operation in which all the partial sums are now combined for a single result.

## Just the beginning

This seems tedious, but in practice, the skill of reading and interpreting query plans is invaluable for performance analysis. You might notice that in the last example, we're doing quite a few shuffles. With time, you will learn to quickly identify which transformations in your code are going to cause a lot of shuffling and thus performance issues.