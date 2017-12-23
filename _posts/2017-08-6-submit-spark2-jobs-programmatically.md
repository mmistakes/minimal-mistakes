---
title:  "Submit Spark 2 jobs programmatically"
header:
  image: /assets/images/data-engineering.jpg
  teaser: assets/images/2017-08-06-submit-spark2-jobs-programmatically/spark.png
excerpt: "Submit Spark 2 apps programmatically, from anywhere within your code."
categories:
  - data-engineering
---

{% include toc title="Navigation" icon="file-text" %}

This is my first post in the [Data Engineering][data-engineering-category] category. In this post, I discuss how to submit Spark 2 apps remotely in `yarn-cluster` mode.

## What is Spark?
[Spark](http://spark.apache.org/) - originally developed as part of a research project[^spark-research] at the University of California, Berkeley and now an Apache Software Foundation project - is a framework for distributed computation. Spark was originally developed for a specific type of applications - iterative ones that reuse intermediate results (e.g., ML algorithms). The idea is to store these intermediate results in memory (in contrast to [mapreduce](https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html), which does not efficiently persist results in memory), thus significantly speeding up subsequent computations on this in-memory data. The primary abstraction in Spark is the *Resilient Distributed Dataset*[^rdd], which is a dataset that can reside in distributed memory in a computing cluster.  

## The Problem
Spark applications are usually submitted to YARN using a `spark-submit` command. In cases where this capability is needed progammatically, Spark provides the [`SparkLauncher`](http://spark.apache.org/docs/1.6.0/api/java/index.html?org/apache/spark/launcher/package-summary.html) class which allows the submission of Spark apps as a child process, that can then be monitored using an elegant [Monitoring](https://spark.apache.org/docs/latest/monitoring.html) API.

However, I find that the API documentation for the `SparkLauncher` class is woefully minimal. In [this](http://blog.rocana.com/how-to-submit-spark-jobs-to-yarn-from-java) blog post, Abdul Bashar puts together a comprehensive working example of how Spark 1.x apps can be submitted programmatically. However, he rightly notes the instructions are for Spark 1.x, and that since that Spark is notorious for breaking backward compatibility, they may not work with Spark 2.x.

Turns out Abdul's prediction is correct. The instructions no longer work with Spark 2.x. This blog post attempts to fix that.

**Note:** Although not required, the reader should read Abdul's [post](http://blog.rocana.com/how-to-submit-spark-jobs-to-yarn-from-java) before reading this one, because I only briefly explain the changes to Abdul's code necessary to work with Spark 2.x, without going into details of the rest of the code that remains unchanged.
{: .notice--warning}

In Abdul's post, the astute reader may notice that there is significant duplication of configuration settings between `SparkConf` and `ClientArguments`. To remedy this redundancy, [this](https://issues.apache.org/jira/browse/SPARK-12343) JIRA sub-task suggests changing the visibility of `Client` and `ClientArguments` to `private` to prevent client code from directly interacting with them, and [this](https://github.com/apache/spark/pull/11603) pull request implements these changes. However, in the meantime, no concrete documentation explains how to deal with these breaking changes.

## The Solution
A few changes are necessary to Abdul's code to get it to work with Spark 2.x. Specifically,

1. The `--addJars` argument has been replaced with the `SparkConf` configuration setting `spark.yarn.dist.files`,
2. The `ClientArguments` constructor no longer needs a `SparkConf` object as a parameter, and
3. Although both `Client` and `ClientArguments` are now `private` in the Spark Scala library, their Java counterparts are still publicly accessible, enabling us to create a Java wrapper for executing `client.run()`.

Here is what the final application looks like:

The `Spark` singleton object:
{% highlight scala linenos %}
import java.util.Properties
import com.google.common.collect.Lists
import org.apache.spark.sql.types.{LongType, StringType, TimeStampType}
import org.apache.spark.{SparkConf}

import scala.collection.JavaConversions_

/**
  * Submit a Spark app in yarn-cluster mode
  */
object Spark {

  def submit(jobName: String, jobClass: String, applicationJar: String,
             sparkProperties: Properties, additionalJars: Array[String],
             files: Array[String]): Unit = {

    val args = Lists.newArrayList("--jar", applicationJar, "--class", jobClass)

    // Identify that you will be using SparkClient as YARN mode
    System.setProperty("SPARK_YARN_MODE", "true")

    val sparkConf = new SparkConf
    sparkConf.set("spark.yarn.preserve.staging.files", "true")

    if(additionalJars != null && additionalJars.length > 0) {
      sparkConf.set("spark.yarn.dist.jars", additionalJars.mkString(","))
    }

    if(files != null && files.length > 0) {
      sparkConf.set("spark.yarn.dist.files", files.mkString(","))
    }

    // Set all remaining sparkConf properties
    // (e.g., spark.executor.cores, spark.driver.cores, ...)
    for(e <- sparkProperties.entrySet) {
      sparkConf.set(e.getKey.toString, e.getValue.toString)
    }

    SparkClient.run(args, sparkConf)
  }
}
{% endhighlight %}

On line 39, observe that the `run()` method  of the `SparkClient` class is called. The `SparkClient` class represents the Java wrapper that we shall use to submit our Spark app to YARN in `yarn-cluster` mode.

The `SparkClient` class:
{% highlight java linenos %}
import org.apache.hadoop.conf.Configuration;
import org.apache.spark.SparkConf;
import org.apache.spark.deploy.yarn.Client;
import org.apache.spark.deploy.yarn.ClientArguments;
import java.util.Arrays;
import java.util.List;

public class SparkClient {
  public static void run(List<String> args, SparkConf sparkConf) {
    ClientArguments cArgs = new ClientArguments(args.ToArray(new String[args.size()]));
    Client client = new Client(cArgs, new Configuration(), sparkConf);

    // Submit the Spark app
    client.run();
  }
}
{% endhighlight %}

That's it! You can now submit Spark 2.x apps remotely in `yarn-cluster` mode!

[data-engineering-category]: {{ "/categories/#data-engineering" | absolute_url }}
[^spark-research]: Zaharia, M., Chowdhury, M., Franklin, M. J., Shenker, S., & Stoica, I. (2010). Spark: Cluster computing with working sets. HotCloud, 10(10-10), 95.
[^rdd]: Zaharia, M., Chowdhury, M., Das, T., Dave, A., Ma, J., McCauley, M., ... & Stoica, I. (2012, April). Resilient distributed datasets: A fault-tolerant abstraction for in-memory cluster computing. In Proceedings of the 9th USENIX conference on Networked Systems Design and Implementation (pp. 2-2). USENIX Association.
