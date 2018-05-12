---
title:  "Use multiple Kerberos principals within the same JVM"
header:
  image: /assets/images/data-engineering.jpg
  teaser: assets/images/2018-5-12-using-multiple-kerberos-principals-in-same-jvm/kerberos.png
excerpt: "Use multiple Kerberos principals within the same app!"
categories:
  - data-engineering
---

{% include toc title="Navigation" icon="file-text" %}

This is my second post in the [Data Engineering][data-engineering-category] category. In this post, I discuss how to authenticate and use multiple Kerberos principals within the same JVM. Note that the examples in this post use the Hadoop [`UserGroupInformation`](http://hadoop.apache.org/docs/r2.8.3/api/org/apache/hadoop/security/UserGroupInformation.html) API.

**Note:** This post is neither an introduction to Kerberos, nor a deep dive. Some familiarity with Kerberos is required.
{: .notice--info}

## What is Kerberos?
[*Kerberos*](https://web.mit.edu/kerberos/)[^kerberos] is a sophisticated, and widely used, network authentication protocol developed by MIT. Kerberos is usually used by client-server applications, in order for a client to prove its identity to the server (and potentially vice-versa). Kerberos is frequently used with SASL and TLS to protect communication between the client and server. The Hadoop ecosystem, specifically the Hadoop `UserGroupInformation` (abbreviated UGI) API, provides a comprehensive framework for using Kerberos and TLS in your applications, but it suffers from a [complex implementation and lack of comprehensive documentation](https://steveloughran.gitbooks.io/kerberos_and_hadoop/content/sections/ugi.html).

## Using Kerberos with Hadoop
**Note:** In all code examples in this post, Scaladoc comments are provided where useful, and omitted where unnecessary for brevity.
{: .notice--info}
The vast majority of applications built for Hadoop use a single Kerberos principal for the lifetime of the application. Hadoop's UGI API provides a simple way to work with this:

{% highlight scala linenos %}

import org.apache.hadoop.security.UserGroupInformation
import org.apache.hadoop.conf.Configuration

@throws(classOf[Exception])
def authenticate(principal: String, keyTabPath: String): UserGroupInformation = {

  // Set UserGroupInformation for Hadoop components that do use it (e.g., HDFS)
  logger.info("Attempting to authenticate to KDC for principal " +
    principal + " using keytab " + keyTabPath)

  val conf = new Configuration
  conf.set("hadoop.security.authentication", "kerberos")
  UserGroupInformation.setConfiguration(conf)
  UserGroupInformation.loginUserFromKeytab(principal, keyTabPath)

  logger.info("Currently logged in user: " +
    UserGroupInformation.getCurrentUser.getShortUserName)

  UserGroupInformation.getCurrentUser
}

{% endhighlight %}

The above code works great when only a single Kerberos principal is to be used within the app, but does not work well when multiple principals are to be used. This is because the `UserGroupInformation.loginUserFromKeytab` method sets static state within the JVM, meaning that whatever principal is being authenticated will be used for all subsequent operations that require authentication.

For using multiple principals within the same JVM, Hadoop provides another method - `UserGroupInformation.loginUserFromKeytabAndReturnUGI` - which authenticates the specified principal using the specified keytab, and *returns* the authenticated principal as a `UserGroupInformation` object. This makes it very flexible to work with multiple principals within the same application. This is where I find even Hadoop experts fumble, so here's (an attempt at) a comprehensive example:

{% highlight scala linenos %}

import org.apache.hadoop.security.UserGroupInformation
import org.apache.hadoop.conf.Configuration
import java.security.PrivilegedExceptionAction

@throws(classOf[Exception])
def authenticateAndGetUGI(principal: String, keyTabPath: String): UserGroupInformation = {

  // Set UserGroupInformation for Hadoop components that do use it (e.g., HDFS)
  logger.info("Attempting to authenticate to KDC for principal " +
    principal + " using keytab " + keyTabPath)

  val conf = new Configuration
  conf.set("hadoop.security.authentication", "kerberos")
  UserGroupInformation.setConfiguration(conf)
  val ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI(principal, keyTabPath)

  logger.info("Successfully authenticated user: " + ugi.getUserName)

  ugi
}

/**
  * Execute an arbitrary piece of code as the specified Kerberos principal
  * @param ugi The authenticated UserGroupInformation object
  * @param code The piece of code to be executed
  */
def ugiDoAs[T](ugi: UserGroupInformation)(code: => T): T = {
  ugi.doAs(new PrivilegedExceptionAction[T] {
    override def run(): T = code
  })
}

def doYourThing() = {
  val userA = authenticateAndGetUGI(<userA_principal>, <userA_keytab>)
  val userB = authenticateAndGetUGI(<userB_principal>, <userB_keytab>)

  ugiDoAs(userA)({ println("This is done as userA!") })
  ugiDoAs(userB)({ println("This is done as userB!") })
}

{% endhighlight %}

In the code above, the method `authenticateAndGetUGI` authenticates the specified principal to the KDC using the specified keytab, and returns this authenticated principal as a `UserGroupInformation` object. The method `ugiDoAs` provides a helpful abstraction for executing any arbitrary piece of code as the specified Kerberos principal. Finally, this is demonstrated in the method `doYourThing`, which authenticates two users - `userA` and `userB` - and then invokes the `ugiDoAs` method to execute arbitrary code as those users.

That's it for this post! Hope that helps you navigate the rather complicated Hadoop and Kerberos maze.

[data-engineering-category]: {{ "/categories/#data-engineering" | absolute_url }}

[^kerberos]: Neuman, B. C., & Ts'o, T. (1994). Kerberos: An authentication service for computer networks. IEEE Communications magazine, 32(9), 33-38.
