---
title:  "Submit and debug Spark jobs programmatically"
header:
  image: /assets/images/data-engineering.jpg
  teaser: assets/images/2017-08-06-submit-spark2-jobs-programmatically/spark.png
excerpt: "Submit Spark apps programmatically and debug remotely!"
categories:
  - data-engineering
---

{% include toc title="Navigation" icon="file-text" %}

This is my first post in the [Data Engineering][data-engineering-category] category. In this post, I discuss how to submit Spark 2 apps programmatically in `yarn-cluster` mode, and debug them remotely (e.g., from your favorite developer laptop using your favorite IDE :)).

## What is Spark?
[Spark](http://spark.apache.org/) - originally developed as part of a research project[^spark-research] at the University of California, Berkeley and now an Apache Software Foundation project - is a framework for distributed computation. Spark was originally developed for a specific type of applications - iterative ones that reuse intermediate results (e.g., ML algorithms). The idea is to store these intermediate results in memory (in contrast to [MapReduce](https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html), which does not efficiently persist results in memory), thus significantly speeding up subsequent computations on this in-memory data. The primary abstraction in Spark is the *Resilient Distributed Dataset*[^rdd], which is a dataset that can reside in distributed memory in a computing cluster.  

## Submit Spark jobs programmatically
Spark applications are usually submitted to YARN using a `spark-submit` command. In cases where this capability is needed programmatically, Spark provides the  [`SparkLauncher`](http://spark.apache.org/docs/latest/api/java/index.html?org/apache/spark/launcher/package-summary.html) class which allows the submission of Spark apps as a child process, that can then be monitored using an elegant [Monitoring](https://spark.apache.org/docs/latest/monitoring.html) API.

Submitting jobs programmatically is often useful in cases where jobs need to be created on-the-fly. `SparkLauncher` makes this easy:
{% highlight scala linenos %}

import org.apache.spark.launcher.SparkLauncher

var sparkLauncher = new SparkLauncher()
sparkLauncher
  .setSparkHome("<your_spark_home>")
  .setAppResource(<your_main_app_jar>)
  .setDeployMode("cluster")
  .addSparkArg("--master", "yarn")
  .setMainClass(<your_main_class>)
  .addJar(<additional_jar>)
  .addFile(<resource_file>)
  .addAppArgs(<args_to_your_app>)
  .startApplication()

{% endhighlight %}

The above code snippet submits a Spark app in `yarn-cluster` mode. Note that the Spark binaries must be present locally, and their path must be specified in the `setSparkHome` method.

## Debug Spark jobs remotely
Being able to submit Spark apps programmatically is awesome, but being able to debug remotely from your favorite IDE is awesomerr!

To do this, we need to set the `spark.driver.extraJavaOptions` property to request the Spark driver to wait until a debugger is attached. This can be done like so:
{% highlight scala linenos %}

import java.util.concurrent.ThreadLocalRandom

val randomPort = ThreadLocalRandom.current.nextInt(30000, 65536)
sparkLauncher =
  sparkLauncher.setConf("spark.driver.extraJavaOptions",
  "-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=" + randomPort)

{% endhighlight %}
The above snippet generates a random number between the specified range, and uses this as the port number where the Spark driver will listen and wait for a debugger to attach. Once the Spark app is submitted, use your favorite IDE to attach a debugger to the remote host and port where the Spark driver is listening (e.g., [IntelliJ IDEA](https://www.jetbrains.com/help/idea/run-debug-configuration-remote-debug.html)).

That's it, you can now step through and inspect your code in action!

[data-engineering-category]: {{ "/categories/#data-engineering" | absolute_url }}

[^spark-research]: Zaharia, M., Chowdhury, M., Franklin, M. J., Shenker, S., & Stoica, I. (2010). Spark: Cluster computing with working sets. HotCloud, 10(10-10), 95.
[^rdd]: Zaharia, M., Chowdhury, M., Das, T., Dave, A., Ma, J., McCauley, M., ... & Stoica, I. (2012, April). Resilient distributed datasets: A fault-tolerant abstraction for in-memory cluster computing. In Proceedings of the 9th USENIX conference on Networked Systems Design and Implementation (pp. 2-2). USENIX Association.
