---
title: "Akka HTTP loves JSON: 3 Libraries You Can Integrate into Akka HTTP"
date: 2020-09-16
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [akka http, spray, circe, jackson]
excerpt: "Akka HTTP needs JSON like humans need water. We show you how to integrate Spray-Json, Circe and Jackson into Akka HTTP."
---
This article is for the Scala programmer who works with <a href="https://doc.akka.io/docs/akka-http/current/index.html">Akka HTTP</a>. Probably one of the most common problems for any developer writing HTTP services is, obviously, JSON manipulation.

In this article we'll address not one, but 3 different ways to handle JSON in Akka HTTP.

## The Background

To work alongside this article, you'll need to add the Akka actors and Akka HTTP libraries to your build.sbt file:

```scala
val akkaVersion = "2.6.5"
val akkaHttpVersion = "10.2.0"

libraryDependencies ++= Seq(
    "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion,
    "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
)
```

Because this article is focused exclusively on JSON manipulation, we'll steer away from the massive complexity (and power) of <a href="https://doc.akka.io/docs/akka-http/current/routing-dsl/index.html">Akka HTTP directives</a> and just focus on some of them: `get`/`post`, `entity` and `as`. We'll briefly go through them when we use them so you aren't left in the dark if you haven't seen them before.

For this article, we'll create a simple HTTP service which exposes an HTTP POST endpoint. Assume we're working on a dating app, so a central data structure will be a person, containing their name and age. We intend to add such persons to an internal database, and return events that have a unique identifier and a timestamp:

```scala
case class Person(name: String, age: Int)
case class UserAdded(id: String, timestamp: Long)
```

Now, let's assume we're working on the user creation service of this dating platform which exposes a POST endpoint which takes a Person object encoded as JSON, "adds" it to our "database", then replies back with a JSON string. We need to be able to (de)serialize between the JSON payload and our internal data structures.

Here's a simple Akka HTTP server that does everything but the JSON part:

```scala
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

/*
    We're going to work with these data structures in our endpoints.
    In practice we'd create some "request" data structures, e.g. AddUserRequest.
*/
case class Person(name: String, age: Int)
case class UserAdded(id: String, timestamp: Long)

object AkkaHttpJson {
  implicit val system = ActorSystem(Behaviors.empty, "AkkaHttpJson")

  val route: Route = (path("api" / "user") & post) {
    complete("Yep, roger that!")
  }

  def main(args: Array[String]): Unit = {
    Http().newServerAt("localhost", 8081).bind(route)
  }
}
```

Of course, this example is really simple: we accept any post request on the path "api/user", and we reply with 200 OK and the payload "Yep, roger that!".

Let's make this server accept JSON payloads, first by using the go-to library for Akka HTTP which is also maintained by the Akka team: Spray-json.

## 1. Spray-json

To add Spray-json to your project, you'll need to add the following dependency to your build.sbt:

```scala
    // (inside the library dependencies sequence)
    "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion
```

Now, to use Spray-json, you'll need to follow a few steps. JSON manipulation is not 100% automatic, but you won't need to write too much code either.

Step 1. You'll need to add the Spray-json package to your application file, so that you can access the API.

```scala
import spray.json._
```

Step 2. You'll need to create a scope - a trait, an object etc - which has JSON converters for any type that you might want to support. Here, we have just the Person type, so we'll use this as an example.

```scala
trait PersonJsonProtocol extends DefaultJsonProtocol {
  /*
    The `jsonFormat2` method is applicable for Product types (which include case classes) with 2 members.
    If you have case classes with more than 2 fields, you'd use the appropriate `jsonFormatX` method.
  */
  implicit val personFormat = jsonFormat2(Person)
  implicit val userAddedFormat = jsonFormat2(UserAdded)
}
```

Step 3. You'll need to add the implicit JSON converters into the scope of your route. If you created the converters within a trait, as we did above, you'll simply need to mix the trait into your main app. If you wrote them inside an object, you'll need to import the contents of that object. Besides this, you'll also need to mix-in the trait `SprayJsonSupport`, which contains some implicit definitions that the Akka HTTP server directives will need.

```scala
object AkkaHttpJson extends PersonJsonProtocol with SprayJsonSupport {
    // ... the rest of the code
}
```

Step 4. Add the `entity` and `as` server directives into the route, so that the payload from the HTTP request is automatically parsed and converted into the type that you wanted to support - in our case Person:

```scala
  // at the top
  import java.util.UUID

  // inside the server app
  val route: Route = (path("api" / "user") & post) {
    entity(as[Person]) { person =>
      complete(UserAdded(UUID.randomUUID().toString, System.currentTimeMillis()))
    }
  }
```

The code is short but magical. Here's how it works in a nutshell:

<ol>
  - `as[Person]` fetches whatever implicit marshaller (serializer) of Persons the compiler has access to. Because you've imported the implicit JSON format for Person in scope (from step 3) and added SprayJsonSupport - which is able to convert between an Akka HTTP Entity and the internal JSON format of Spray-json - the compiler does the rest.
  - The `entity` directive uses the marshaller that you pass as argument to decode the HTTP Entity into a value of your desired type (Person). The directive conveniently takes a second argument in the form of a function from Person to whatever you choose to do with it (in our case to complete an HTTP response).
  - Inside the `complete` directive, you can pass anything that can be marshalled to an HTTP response. Because we have the implicit JSON formats in scope and because we added SprayJsonSupport, the compiler can automatically turn a UserAdded data structure into not only a JSON string, but in a complete HTTP response with the correct status code, etc.
</ol>

At this point, we should be ready to start the server and issue HTTP requests to the server. If you want to send HTTP requests easily, I really like <a href="https://httpie.org/">HTTPie</a> (which formats the responses much better), but you can also use cURL as well.

```bash
echo '{"name":"Daniel", "age": 56}' | http post localhost:8081/api/user
```
```http
HTTP/1.1 200 OK
Content-Length: 71
Content-Type: application/json
Date: Tue, 15 Sep 2020 09:30:02 GMT
Server: akka-http/10.2.0

{
    "id": "29ba99ff-4032-433b-be32-3320978a9810",
    "timestamp": 1600162202286
}
```

Alternatively, with cURL:
```bash
$ curl \
      -XPOST \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"Daniel\", \"age\":56}" http://localhost:8081/api/user

{"id":"ec72aefa-a68a-45e4-ae30-7cdec81fb959","timestamp":1600162164182}
```

## 2. Circe

The <a href="https://github.com/circe/circe">Circe</a> library is very popular within the Typelevel ecosystem. However, it only works well with the Typelevel libraries, so porting it to Akka HTTP is not straightforward. Thankfully, Heiko Seeberger created this <a href="https://github.com/hseeberger/akka-http-json">cute repo of JSON libraries</a> for Akka HTTP, just in case Spray-json is not enough for you. You can also dive into the code of the libraries, it's not that long - just a few implicit wrappers over the given functionality of Circe (and other JSON libraries). The JSON libray support for Circe ships in its own distribution, so you'll need to add

```scala
val akkaHttpJsonSerializersVersion = "1.34.0"
libraryDependencies ++= Seq(

    // ... the other libraries here

    // add this
    "de.heikoseeberger" %% "akka-http-circe" % akkaHttpJsonSerializersVersion
}
```

At this point, you should be ready to use Circe with Akka HTTP. Here's how you do it:

Step 1. Add the `FailFastCirceSupport` trait as a mix-in to your main application object. This will bring the necessary implicits so that the directives can find the marshallers (serializers) between the HTTP entities that Akka HTTP understands and the internal formats of Circe. Pretty much similar to step 3 of the Spray-json integration.

Step 2. Add an import so that Circe can automatically generate an implicit encoder/decoder pair for the types you want to support (case classes, usually):

```scala
import io.circe.generic.auto._
```

And that's it! The rest of the code can stay identical. The code looks like this:

```scala
object AkkaHttpCirceJson extends FailFastCirceSupport {
  import io.circe.generic.auto._

  implicit val system = ActorSystem(Behaviors.empty, "AkkaHttpJson")

  val route: Route = (path("api" / "user") & post) {
    entity(as[Person]) { person =>
      complete(UserAdded(UUID.randomUUID().toString, System.currentTimeMillis()))
    }
  }

  def main(args: Array[String]): Unit = {
    Http().newServerAt("localhost", 8082).bind(route)
  }
}
```

Same requests will give us the similar responses:

```bash
echo '{"name":"Daniel", "age": 56}' | http post localhost:8082/api/user
```
```http
HTTP/1.1 200 OK
Content-Length: 71
Content-Type: application/json
Date: Tue, 15 Sep 2020 09:33:20 GMT
Server: akka-http/10.2.0

{
    "id": "8de03e1a-913c-4063-80db-8c4b6317715b",
    "timestamp": 1600162400694
}
```

Alternatively, with cURL:
```bash
$ curl \
    -XPOST \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Daniel\", \"age\":56}" http://localhost:8082/api/user

{"id":"ef64fc3b-086c-424f-8404-5c389bf6ca74","timestamp":1600162424186}
```


## 3. Jackson

Yes, the popular library simply known as "JSON for Java" (or the JVM). Fortunately, we're now warmed up and ready to import it from the same repo:

```scala
libraryDependencies ++= Seq(

    // ... the other libraries here

    // add this
    "de.heikoseeberger" %% "akka-http-jackson" % akkaHttpJsonSerializersVersion
}
```

After including it, you can now use it as well. The usage is even simpler in this case: all you have to do is add the Jackson support trait to your main application object so that the compiler can build the implicits that the Akka HTTP directives will need to marshal/unmarshal entities to/from your types. The support trait is called (unsurprisingly) `JacksonSupport`, so the code will look like this:

```scala
object AkkaHttpJackson extends JacksonSupport {
  implicit val system = ActorSystem(Behaviors.empty, "AkkaHttpJson")

  val route: Route = post {
    entity(as[Person]) { person =>
      complete(UserAdded(UUID.randomUUID().toString, System.currentTimeMillis()))
    }
  }

  def main(args: Array[String]): Unit = {
    Http().newServerAt("localhost", 8083).bind(route)
  }
}
```

And once you start your server, the POST commands will look the same:

```bash
echo '{"name":"Daniel", "age": 56}' | http post localhost:8083/api/user
```
```http
HTTP/1.1 200 OK
Content-Length: 71
Content-Type: application/json
Date: Tue, 15 Sep 2020 09:34:35 GMT
Server: akka-http/10.2.0

{
    "id": "f1ec08f8-382c-488a-8ba0-195ef2ba3aa2",
    "timestamp": 1600162475889
}
```

Alternatively, with cURL:
```bash
$ curl \
      -XPOST \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"Daniel\", \"age\":56}" http://localhost:8083/api/user

{"id":"fbddb191-a28c-446a-9ec5-e91c3d69ed98","timestamp":1600162458223}
```

## Conclusion

Akka HTTP is a magical library for spinning up HTTP services very quickly. In this article, you learned how to use not 1, but 3 different libraries for serializing and deserializing JSON auto-magically with directives.

Enjoy JSONs!
