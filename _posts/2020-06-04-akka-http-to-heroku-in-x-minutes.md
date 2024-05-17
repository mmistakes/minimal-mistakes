---
title: "Akka HTTP to Heroku in 10 Minutes"
date: 2020-06-04
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [akka http, heroku, how to]
excerpt: "Akka HTTP is super easy to deploy to a web server. Learn how to use Heroku and deploy your first Akka HTTP service in minutes."
---
This article is for newbies to Akka HTTP and for those who have written some Akka HTTP but have never deployed their own server. Here I'll teach you what you need to know and do so that you have your first server up and running on Heroku in just a few minutes.

I'll be working in IntelliJ IDEA which creates an SBT project structure quickly, but you can also use the `sbt` command line to do the same things I do here. So here goes:

## Step 1 - Intro

We'll start by creating a vanilla Scala-SBT project in intelliJ:

![Akka HTTP to Heroku in 10 Minutes - tutorial](https://rtjvm-website-blog-images.s3-eu-west-1.amazonaws.com/20-1.png)

![Akka HTTP to Heroku in 10 Minutes - tutorial](https://rtjvm-website-blog-images.s3-eu-west-1.amazonaws.com/20-2.png)

And after you click Finish, IntelliJ will create the appropriate project structure for you. Go to the `src/` folder, and create a package and then an application under it. I created a package called `server` and under it I started a simple `MyServer.scala`:

```scala
object MyServer {
  def main(args: Array[String]): Unit = {
    // will write in due time
  }
}
```

Once you've done that, it's time to "register" it as the runnable application so Heroku can identify it.

## Step 2 - The Boilerplate

IntelliJ will create a `project/` folder, where you will need to add a file called `plugins.sbt` and add an SBT plugin so you can package your application at the time you will deploy it to Heroku:

```scala
addSbtPlugin("com.typesafe.sbt" % "sbt-native-packager" % "1.3.12")
```

Then under your `build.sbt` you'll need to install the Akka libraries, refer to the packaging plugin and register the main class. Here is the entire content of the file:

```scala
name := "akka-http-test"

version := "0.1"

scalaVersion := "2.12.4"

// this will add the ability to "stage" which is required for Heroku
enablePlugins(JavaAppPackaging)

// this specifies which class is the main class in the package
mainClass in Compile := Some("server.MyServer")

val akkaVersion = "2.6.5"
val akkaHttpVersion = "10.1.12"

// add the Akka HTTP libraries
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-stream" % akkaVersion,
  "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion,
  "com.typesafe.akka" %% "akka-http" % akkaHttpVersion
)
```

After that, IntelliJ will usually pop up a small dialog asking you to "Import Changes". Click that and wait for a minute to download and install the libraries and plugin. Otherwise, go to View -> Tool Windows -> SBT and click on the tiny refresh icon to do the same thing.

After you don't see any red in build.sbt, you're good to go and you can write the actual code of your server

## Step 3 - The Fun Part

It's probably the place we care about the most: the actual writing of the logic that will be our server. Akka HTTP is a huge set of libraries and with lots of capabilities. In this article I'll focus on a server that when hit with a GET request, will respond with a small HTML which will be seen in your browser. So here goes. Go to `MyServer.scala` and add any HTML you fancy:

```scala
  val content =
    """
      |<html>
      | <head></head>
      | <body>
      |   This is an HTML page served by Akka HTTP!
      | </body>
      |</html>
    """
```

Then you will define the logic of the server by a Directive, which is a fancy DSL to compose routing mechanisms very quickly:

```scala
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
```

and inside your server application:

```scala
val route = get {
  complete(
    HttpEntity(
      ContentTypes.`text/html(UTF-8)`,
      content
    )
  )
}
```

which means that this server will respond to any GET request with an HTTP response with the content type `text/html(UTF-8)`, and with the payload given by the content (HTML string) you defined earlier).

Then in the main method, you need to actually bind this routing logic on a hostname/port combination. On Heroku, you can't bind to localhost, so you will bind to `0.0.0.0`. Here's how the main method looks like:

```scala
import akka.actor.ActorSystem
import akka.http.scaladsl.Http

def main(args: Array[String]): Unit = {
  // Akka HTTP needs an actor system to run
  implicit val system = ActorSystem("Server")

  // set hostname/port combination
  val host = "0.0.0.0"
  val port: Int = sys.env.getOrElse("PORT", "8080").toInt

  // this actually starts the server
  Http().bindAndHandle(route, host, port)
}
```

And that's it! Your application is now ready. All you have to do is deploy it to Heroku.

## Step 4 - The Deploy

Do the steps below, they will take just a couple of minutes:

1. If you don't have a Heroku account, <a href="https://signup.heroku.com/">create one</a>.
2. Then, <a href="https://dashboard.heroku.com/new-app">create a new app</a>, give it a name.
3. After that, make sure you install the <a href="https://devcenter.heroku.com/articles/heroku-cli#download-and-install">Heroku command line</a>.

After you have the Heroku command line, open a terminal and go to the directory of your Akka HTTP project, and run the following: first, make your project a Git repository:

```scala
$ git init
$ git add .
$ git commit -m "my first server"
```

Then, login to Heroku and make Heroku detect this project as a Scala application:

```scala
$ heroku login
```

which will also add the `heroku` remote for this project. After that, all you have to do is

```scala
$ git push heroku master
```

## Part 5 - Enjoy

Navigate to <a href="https://replace-this-with-your-akka-http-server.herokuapp.com">https://replace-this-with-your-akka-http-server.herokuapp.com</a> and see your first Akka HTTP server in action!
