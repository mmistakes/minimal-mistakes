---
title: "Sending HTTP Requests in Scala and Akka in 5 minutes"
date: 2020-04-01
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [akka, akka http, how to]
excerpt: "Learn to use Akka HTTP with Scala and send HTTP requests in just a few minutes with the Akka HTTP server DSL."
---
This article is for the Scala programmer who wants to run one-off HTTP requests quickly. The thinking style assumed is "I don't want to care too much, I'll give you a payload, you just give me a future containing your response". With minimal boilerplate, we'll do exactly that with Akka HTTP in 5 minutes.

The Rock the JVM blog is built with me typing my posts in plain text with minimal Markdown formatting, and then generating a uniform HTML out of it, with a simple Scala parser (I hate typing HTML). For syntax highlighting, I use markup.su/highlighter, which happens to have a REST endpoint. Naturally, I don't want to do it by hand, so as my HTML is generated, the syntax is automatically retrieved via Akka HTTP as client, with little code. My HMTL generator currently has less than 100 lines of code in total.

In this article, I'm going to get you started with the simplest Akka HTTP client API in 5 minutes.

## The tiny setup

First, you need to add the Akka libraries. Create an SBT project in your dev environment (I recommend IntelliJ), then add this to the build.sbt file:
(if you've never used SBT before, the build.sbt file describes all the libraries that the project needs, which the IDE will download automatically)

```scala
val akkaVersion = "2.5.26"
val akkaHttpVersion = "10.1.11"

libraryDependencies ++= Seq(
  // akka streams
  "com.typesafe.akka" %% "akka-stream" % akkaVersion,
  // akka http
  "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
)
```

Then in a Scala application I'm going to write a piece of small boilerplate, because Akka HTTP needs an actor system to run:

```scala
implicit val system = ActorSystem()
implicit val materializer = ActorMaterializer()
import system.dispatcher
```

## Sending HTTP requests

Now we'll need to start sending HTTP requests. I'll use the exact HTTP API I'm using for the blog: http://markup.su/highlighter/api. The API says it needs GET or POST requests to /api/highlighter, with the parameters "language", "theme" and "source" in a request with content type application/x-www-form-urlencoded.

So let me create a piece of Scala code:

```scala
val source =
"""
  |object SimpleApp {
  |  val aField = 2
  |
  |  def aMethod(x: Int) = x + 1
  |
  |  def main(args: Array[String]) = {
  |    println(aMethod(aField))
  |  }
  |}
""".stripMargin
```

and then let me create an HTTP request for it:

```scala
  val request = HttpRequest(
    method = HttpMethods.POST,
    uri = "http://markup.su/api/highlighter",
    entity = HttpEntity(
      ContentTypes.`application/x-www-form-urlencoded`,
      s"source=${URLEncoder.encode(source.trim, "UTF-8")}&language=Scala&theme=Sunburst"
    )
  )
```

where I've named the arguments in the call for easy reading. In Akka HTTP, an HttpRequest contains the HTTP method (POST in our case), the URI and a payload in the form of an HttpEntity. We specify the content type per the description specified in the API - notice the backticks for the name of the field - and the actual string we want to send, as described by the API. In practice, you can send other strings, like JSONs - I'll show you how to auto-convert your data types to JSON auto-magically in another article.

Then, we actually need to send our request:

```scala
  def simpleRequest() = {
    val responseFuture = Http().singleRequest(request)
    responseFuture.flatMap(_.entity.toStrict(2 seconds)).map(_.data.utf8String).foreach(println)
  }
```

The Akka HTTP client call is simple: just call the singleRequest method. You obtain a Future containing an HTTP response, which we can then unpack. We use its entity (= its payload) and convert it to a strict entity, meaning take its whole content in memory. We then take its data which is a sequence of bytes, and convert that to a string. And we're done.

## Hide it all

We can create a very nice method which hides this all away:

```scala
  def highlightCode(myCode: String): Future[String] = {
    val responseFuture = Http().singleRequest(
      HttpRequest(
        method = HttpMethods.POST,
        uri = "http://markup.su/api/highlighter",
        entity = HttpEntity(
          ContentTypes.`application/x-www-form-urlencoded`,
          s"source=${URLEncoder.encode(myCode.trim, "UTF-8")}&language=Scala&theme=Sunburst"
        )
      )
    )

    responseFuture
      .flatMap(_.entity.toStrict(2 seconds))
      .map(_.data.utf8String)
  }
```

And then you can go on with your day: pass a string, expect a future containing an HTML highlighting. All done!

If you want to practice sending HTTP requests as an exercise, you can use https://jsonplaceholder.typicode.com/ for dummy APIs, the same principle applies.
