---
title: "Authentication with Http4s Part 1"
date: 2023-02-23
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: "There are several authentication methods available, each with its pros and cons, here, we will look at implementations of these different methods in scala using the Http4s library"
toc: true
toc_label: "In this article"
---

## Introduction

As a backend developer, authentication is a topic you will encounter numerous times in your career. With numerous authentication methods available, it becomes a challenge not only to choose but also to implement in your application. In this article, we will go through 4 authentication methods and how to implement them in Scala using the Http4s library namely, Basic Authentication, Digest Authentication, Session Authentication, and Token Authentication.

### Requirements

To follow along, you will need to add the following to your build.sbt file.

```scala
val scala3Version = "3.2.2"

val Http4sVersion = "0.23.18"
val JwtHttp4sVersion = "1.2.0"
val JwtScalaVersion = "9.3.0"

val http4sDsl =       "org.http4s"              %% "http4s-dsl"          % Http4sVersion
val emberServer =     "org.http4s"              %% "http4s-ember-server" % Http4sVersion
val jwtHttp4s =       "dev.profunktor"          %% "http4s-jwt-auth"     % JwtHttp4sVersion
val jwtScala =        "com.github.jwt-scala"    %% "jwt-core"            % JwtScalaVersion
val jwtCirce =        "com.github.jwt-scala"    %% "jwt-circe"           % JwtScalaVersion

lazy val authentication = project
  .in(file("authentication"))
  .settings(
    name := "authentication",
    version := "0.1.0-SNAPSHOT",
    scalaVersion := scala3Version,
    libraryDependencies ++= Seq(
      emberServer,
      http4sDsl,
      jwtHttp4s,
      jwtScala,
      jwtCirce
    )
  )
```

The code in this article will be written in Scala 3 but can still be implemented for Scala 2 with very minor changes.

# Authentication

Throughout this article, we will be using the different authentication methods to grant a user access to Http4s `Routes`. Here's a simple implementation of how this will be done.

```scala
import cats.effect.*
import org.http4s.*
import org.http4s.dsl.io.*
import org.http4s.server.*
import org.http4s.implicits.*
import org.http4s.ember.server.*
import com.comcast.ip4s.*

object SimpleRoutes extends IOApp:
    val routes: HttpRoutes[IO] =
        HttpRoutes.of {
            case GET -> Root / "welcome" / user =>
                Ok(s"Welcome, ${user}")
        }

    val server = EmberServerBuilder
        .default[IO]
        .withHost(ipv4"0.0.0.0")
        .withPort(port"8080")
        .withHttpApp(routes.orNotFound)
        .build

    override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

In this example, the routes are accessed without authentication. We define our routes using the `HttpRoutes.of` function through which `Http4s` pattern matches against each defined `case`. For our implementation, we have one `case` that accepts `GET` requests from `/welcome/user` where the server responds with `Ok(s"Welcome, ${user}")`. `user` is any alphanumeric value that's passed in the request.

We use `Ember` server through port `8080` to receive requests.

For an in-depth explanation on how to use `Http4s`, there's a good explanation of most concepts [here]("https://blog.rockthejvm.com/http4s-tutorial/").

Let's test our server.

```bash
 curl -vv http://localhost:8080/welcome/john
*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
> GET /welcome/john HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Wed, 24 May 2023 14:45:11 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 13
<
* Connection #0 to host localhost left intact
Welcome, john⏎
```

When we send a request `http://localhost:8080/welcome/john` to our Rest API, we receive our expected response `Welcome, john`.
At this point we realize anyone can access this route, to limit access to verified users, the solution is authentication.

## Basic Authentication

Basic authentication is an authentication scheme where user credentials are sent through `HTTP` headers to the server for authentication. The specifications for Basic Authentication are defined in [RFC 7617](https://datatracker.ietf.org/doc/html/rfc7617). Here's how it works.

1. The user's credentials are sent to the server through the use of an `Authorization` header with a `Basic` `scheme`.
2. `Basic` authentication requires a `username` and `password` to be sent as credentials to the server
3. The `username` and `password` are joined by a colon `:` and `Base64` encoded before being sent using the `Authorization` header.
4. The `Authorization` header in the request would be defined as `Authorization:Basic Base64(username:password)`
5. When the request is received by the server, the credentials are decoded and used to either grant access to a user with a `200 Ok Success` status code or deny access usually with a `401 Unauthorized` status.

### Http4s Implementation

Http4s provides an easy way to implement basic authentication using `Middleware` which is simply a function that takes a service and returns another service.
To begin with we will need a data structure to hold our user information.

```scala
case class User(id: Long, name: String)
```

We will also need a function that intercepts the request to validate the user's credentials before granting access to the routes. This is done by use of a `Kleisli`.

```scala
import cats.data.*
import org.http4s.Credentials
import org.http4s.headers.Authorization

val authUserEither: Kleisli[IO, Request[IO], Either[String, User]] = Kleisli{req =>
    val authHeader: Option[Header] = req.headers.get[Authorization]
    authHeader match
        case Some(value) => value match
            case Authorization(BasicCredentials(creds)) =>  IO(Right(User(1,creds._1)))
            case _ => IO(Left("No basic credentials"))
        case None => IO(Left("Unauthorized"))
}
```

In this example, we define our Kleisli function `authUserEither` which will take a `Request` and returns an `Either[String,User]`. The function signature `Kleisli[IO, Request[IO], Either[String, User]]` simply translates to `IO[Request[IO]] => IO[Either[String, User]]`

The function checks for the availability of an `Authorization` header which is stored in `authHeader` giving us an `Option[Header]`. Pattern matching on `authHeader` provides us with two cases for the presence or absence of the `Authorization` header.
In case the header is present, we further check for `BasicCredentials` and map those to the `User` case class. The credentials `creds` is a tuple of the form (username,password). At this point in the implementation, one may check against the database to verify the user's credentials, but for simplicity, we return `IO(Right(User(1,creds._1)))` where `creds._1` is the username.
In case we don't receive something other than an `Authorization` header we return a `Left("No basic credentials")` and in case there's no `Authorization` header, we return a `Left("Unauthorized)`.

The next step is to convert our `Kleisli` to middleware by wrapping it in the `AuthMiddleware` function.

```scala
val userMiddleware: AuthMiddleware[IO,User] =
    AuthMiddleware(authUserEither)
```

To use the middleware, we'll need to modify our routes to the `AuthedRoutes` type instead of `HttpRoutes`

```scala
val authedRoutes: AuthedRoutes[User,IO] =
    AuthedRoutes.of{
        case GET -> Root / "welcome" as user =>
            Ok(s"Welcome, ${user.name}")
    }
```

Previously the `user` value was passed as part of the `URI` in the `GET` request, in this case, the `user` value comes in through the `authUserEither` `Kleisli` function. We will also need Routes to handle failure, which we define next.

```scala
val onFailure: AuthedRoutes[String, IO] = Kleisli{(req: AuthedRequest[IO,String]) =>
    req.req match
        case _ => OptionT.pure[IO](Response[IO](status = Status.Unauthorized))
}
```

The `onFailure` function takes a request and returns a `Response` with `status` code `401 Unauthorized`. Now we can put everything together using the `AuthMiddleware` function to create the middleware. This function takes `authUserEither` and `onFailure` as arguments.

```scala
val authMiddleware: AuthMiddleware[IO,User] = AuthMiddleware(authUserEither, onFailure)
```

The final is creating our service by passing our `authedRoutes` to the `authMiddleware` function.

```scala
val serviceKleisli: HttpRoutes[IO] = authMiddleware(authedRoutes)
```

With the service now available, we simply pass it to the `Ember` Server and run it.

```scala
val server = EmberServerBuilder
    .default[IO]
    .withHost(ipv4"0.0.0.0")
    .withPort(port"8080")
    .withHttpApp(serviceKleisli.orNotFound)
    .build

override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

Let's test our server
First, we encode our username and password in Base64 before we put it in our request.

```bash
$ echo "username:password" | base64
dXNlcm5hbWU6cGFzc3dvcmQK
```

The encoded value can now be passed to the `Authorization` header with a `Basic` scheme.

```bash
$ curl -v -H "Authorization:Basic dXNlcm5hbWU6cGFzc3dvcmQK" http://localhost:8080/welcome

*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
> GET /welcome HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
> Authorization:Basic dXNlcm5hbWU6cGFzc3dvcmQK
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Sat, 13 May 2023 13:18:09 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 17
<
* Connection #0 to host localhost left intact
Welcome, username⏎
```

Let's test the failure case.

```bash
$ curl -v http://localhost:8080/welcome

*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
> GET /welcome HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 401 Unauthorized
< Date: Sat, 13 May 2023 13:20:14 GMT
< Connection: keep-alive
< Content-Length: 0
<
* Connection #0 to host localhost left intact
```

Without the `Authorization` header we get a `401 Unauthorized` status. You can change this response by modifying the `onFailure` function.

Here is the full code:

```scala
import cats.data.*
import cats.effect.{IO,IOApp}
import org.http4s.*
import org.http4s.dsl.io.*
import org.http4s.server.*
import org.http4s.implicits.*
import org.http4s.ember.server.*
import com.comcast.ip4s.*
import org.http4s.Credentials
import org.http4s.headers.Authorization

object BasicExample extends IOApp:

  val authUserEither: Kleisli[IO, Request[IO], Either[String, User]] = Kleisli{req =>
      val authHeader: Option[Header] = req.headers.get[Authorization]
      authHeader match
          case Some(value) => value match
              case Authorization(BasicCredentials(creds)) =>  IO(Right(User(1,creds._1)))
              case _ => IO(Left("No basic credentials"))
          case None => IO(Left("Unauthorized"))
  }

  val userMiddleware: AuthMiddleware[IO,User] =
    AuthMiddleware(authUserEither)

  val authedRoutes: AuthedRoutes[User,IO] =
    AuthedRoutes.of{
        case GET -> Root / "welcome" as user =>
            Ok(s"Welcome, ${user.name}")
    }

  val onFailure: AuthedRoutes[String, IO] = Kleisli{(req: AuthedRequest[IO,String]) =>
    req.req match
        case _ => OptionT.pure[IO](Response[IO](status = Status.Unauthorized))
  }

  val authMiddleware: AuthMiddleware[IO,User] = AuthMiddleware(authUserEither, onFailure)

  val serviceKleisli: HttpRoutes[IO] = authMiddleware(authedRoutes)

  val server = EmberServerBuilder
    .default[IO]
    .withHost(ipv4"0.0.0.0")
    .withPort(port"8080")
    .withHttpApp(serviceKleisli.orNotFound)
    .build

  override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)

```

## Digest Authentication

Similar to Basic Authentication, Digest Authentication also involves passing credentials through the `Authorization` header to the server, however, the Digest Authentication scheme is a two-step process, here's how it works.

1. When a client tries to request information from the server without authorization, the server responds with a `401 Unauthorized` status code, but it also attaches the `realm`, `qop`, and `nounce` to its response.
   The `realm` is a string supplied by the server which sometimes includes the host name.
   `qop` stands for the quality of protection, its value might be `auth` (authentication) or 'auth-int' (authentication with integrity)
   The `nounce` is a unique string generated by the server each time it responds to a `401 status code`.

2. The user at this point provides his or her credentials which are the username and password. These credentials are sent within the `Authorization` header along with some additional information, these include the `realm`, `qop`, and `nounce` which were sent earlier but additionally, the client will attach a `URI`, `cnounce`, `nc` and a `response` to the request.

3. If the credentials checkout, the user will be granted access otherwise access will be denied with the `401 status code`.

I realize there are a lot of new words in the explanation, however, this is beyond the scope of this article, I encourage you to read the [RFC 2617]('https://datatracker.ietf.org/doc/html/rfc2617') specification for Digest Authentication for a more in-depth explanation.

### Digest Authentication in http4s

Digest Authentication in Http4s is easily implemented using the `DigestAuth` function, but first, we need to define our `User` case class.

```scala
case class User(id: Long, name: String)
```

The `DigestAuth` function takes two arguments, the `realm` and a function of type `String => IO[Option[(User, String)]]` where the input `String` represents the username and the `String` in `IO[Option[(User,String)]]` represents our password. Let's define this function.

```scala
import cats.effect.*

val funcPass: String => IO[Option[(User, String)]] = (usr_name: String) =>
  usr_name match
      case "username" => IO(Some(User(1,"username"),"password"))
      case _ => IO(None)
```

The function `funcPass` receives the username and which it matches to find the correct `User`. The resulting value `IO[Option[User,String]]` is also checked to contain to correct password. The implementation above is straightforward but can be modified for your specific needs.

```scala
import org.http4s.server.*
import org.http4s.server.middleware.authentication.DigestAuth

val middleware:AuthMiddleware[IO, User] = DigestAuth[IO,User]("http://localhost:8080/welcome", funcPass)
```

Here we provide the arguments to `DigestAuth`, which returns a value of type `AuthMiddleware[IO, User]`.

Just like Basic Authentication, we'll also need `AuthedRoutes`.

```scala
import org.http4s.*
import org.http4s.dsl.io.*

val authedRoutes: AuthedRoutes[User,IO] =
    AuthedRoutes.of{
        case GET -> Root / "welcome" as user =>
            Ok(s"Welcome, ${user.name}")
    }
```

To create our service, we call our routes through the middleware function defined previously.

```scala
val digestService: HttpRoutes[IO] = middleware(authedRoutes)
```

Finally, we pass our service to the Ember server and run it.

```scala
import org.http4s.ember.server.*
import com.comcast.ip4s.*

val server = EmberServerBuilder
  .default[IO]
  .withHost(ipv4"0.0.0.0")
  .withPort(port"8080")
  .withHttpApp(digestService.orNotFound)
  .build

override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

Let's test our server.

```bash
 curl -vv http://localhost:8080/welcome --digest -u username:password

*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
* Server auth using Digest with user 'username'
> GET /welcome HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 401 Unauthorized
< Date: Sat, 13 May 2023 13:55:27 GMT
< Connection: keep-alive
< WWW-Authenticate: Digest realm="http://localhost:8080/welcome",qop="auth",nonce="b5dca735c6c67c0fe45259e9804e8240487b6a01"
< Content-Length: 0
<
* Connection #0 to host localhost left intact
* Issue another request to this URL: 'http://localhost:8080/welcome'
* Found bundle for host localhost: 0x55f1a55e9650 [serially]
* Re-using existing connection! (#0) with host localhost
* Connected to localhost (::1) port 8080 (#0)
* Server auth using Digest with user 'username'
> GET /welcome HTTP/1.1
> Host: localhost:8080
> Authorization: Digest username="username", realm="http://localhost:8080/welcome", nonce="b5dca735c6c67c0fe45259e9804e8240487b6a01", uri="/welcome", cnonce="YWQ1YzEzOTZiOTk3NGNhNGIyMjE1ODUzZjkxNDVjMDE=", nc=00000001, qop=auth, response="66f87d38f4a2105e4ead0333c2a650b0"
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Sat, 13 May 2023 13:55:27 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 17
<
* Connection #0 to host localhost left intact
Welcome, username⏎
```

`curl` provides a `--digest` flag which takes the username and password and does the initial request followed by a second request with credentials attached in one step.

If the wrong password or username is provided, the server will respond with a `401 Unauthorized`, its also important to note that if the Authorization header is missing or the scheme is anything but `Digest`, the request will fail with a `401 Unauthorized` as well.

Here's the full code

```scala
import cats.effect.*
import org.http4s.*
import org.http4s.dsl.io.*
import org.http4s.server.*
import org.http4s.implicits.*
import org.http4s.ember.server.*
import com.comcast.ip4s.*
import org.http4s.server.middleware.authentication.DigestAuth

object DigestExample extends IOApp:
    case class User(id: Long, name: String)

    val funcPass: String => IO[Option[(User, String)]] = (hashedVal: String) =>
    hashedVal match
        case "username" => IO(Some(User(1,"username"),"password"))
        case _ => IO(None)

    val middleware:AuthMiddleware[IO, User] = DigestAuth[IO,User]("http://localhost:8080/welcome", funcPass)

    val authedRoutes: AuthedRoutes[User,IO] =
        AuthedRoutes.of{
            case GET -> Root / "welcome" as user =>
                Ok(s"Welcome, ${user.name}")
        }

    val digestService: HttpRoutes[IO] =
        middleware(authedRoutes)

    val server = EmberServerBuilder
    .default[IO]
    .withHost(ipv4"0.0.0.0")
    .withPort(port"8080")
    .withHttpApp(digestService.orNotFound)
    .build

    override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

## Session Authentication

Session authentication is an authentication technique where the server keeps track of session information after the user has logged in. It works in the following way.

1. When a user logs into a website after verification of username and password, the server responds with a generated unique string which is passed in the `Response` and set as a cookie on the client's side.
2. This unique string is always passed whenever there are subsequent requests made by the client. If the unique string is valid, access is granted otherwise access is denied.
3. This cookie can also be valid for a specific amount of time, after which it expires and is automatically removed on the client side.
4. If the client logs out, the server will remove the cookie from the client side as well.

### Session Authentication in Http4s

For this implementation, we are going to reuse our code from the Digest Authentication section.

The first thing we need is a way to generate the unique code that we will send to the client.

```scala
import java.time.LocalDateTime
import java.util.Base64
import java.nio.charset.StandardCharsets

val today: String = LocalDateTime.now().toString()
def setToken(user: String, date: String):String = Base64.getEncoder.encodeToString(s"${user}:{$today}".getBytes(StandardCharsets.UTF_8))
```

Here we create the unique code or token using the `setToken` function which takes a username as `user` and a date computed by `LocalDateTime.now().toString()`, these values are then combined and encoded using Java's `Base64` utility.

Next, we attach a new cookie to the response, this happens after a successful login.

We'll also define a function that will decode the token when it's received from the client.

```scala
import scala.util.*

def getUser(token: String): Try[String] = Try((new String(Base64.getDecoder.decode(token))).split(":")(0))
```

The `getUser` function will take the token and try to decode it, this can either succeed or fail as we will see later.

We modify the `authedRoutes` from our Digest authentication example to add a cookie with the token information

```scala
import cats.effect.*
import org.http4s.*
import org.http4s.dsl.io.*

case class User(id: Long, name: String)
val authedRoutes: AuthedRoutes[User,IO] =
    AuthedRoutes.of{
        case GET -> Root / "welcome" as user =>
            Ok(s"Welcome, ${user.name}").map(_.addCookie(ResponseCookie("sessioncookie", setToken(user.name, today), maxAge = Some(86400))))
    }
```

We set our session token as a cookie on the client side using the `addCookie` function on the `Response` object. The `ResponseCookie` object takes the cookie name, `sessioncookie`, the cookie value which we set using the `setToken` function which we call with the user name and the current datetime, and finally, the maxAge, which is how long the token will persist. This is set to `Some(86400)` equal to 24 hours.

Separate routes are also defined that will be accessed using our session data.

```scala
val cookieAccessRoutes = HttpRoutes.of[IO]{
  case GET -> Root / "statement" =>
    Ok("Financial statement processing...")
  case GET -> Root / "logout" =>
    Ok("Logging out...").map(_.removeCookie("sessioncookie").headers)
}
```

The `cookieAccessRoutes` service contains two routes, `/statement` which returns financial statement information, and `/logout` which removes the `sessioncookie` token when the user is logging out. It uses the `removeCookie` function on the `Response` object.

We will now need to check for the presence of our `sessioncookie` token when requests come in, here's how this can be done.

```scala
import cats.data.*
import org.http4s.headers.Cookie

def cookieCheckerService(service: HttpRoutes[IO]): HttpRoutes[IO] = Kleisli{req =>
    val authHeader:Option[Cookie] = req.headers.get[Cookie]
    OptionT.liftF{authHeader match
        case Some(cookie) =>
            cookie.values.toList.find{x =>
                x.name == "sessioncookie"
            } match
                case Some(token) =>
                    getUser(token.content) match
                        case Success(user) =>
                            service.orNotFound.run((req.withPathInfo(Uri.Path.fromString(s"/statement/$user"))))
                        case Failure(_) => Ok("Invalid token")
                case None => Ok("No token")
        case None => Ok("No cookies")
        }
}
```

In http4s one can define custom middleware through the use of a `Kleisli`, here we define a function that takes a service of type `HttpRoutes[IO]` and returns another service. We first intercept the request and check if it contains any cookies, this is done using the `.get[Cookie]` function on the request headers, which returns an `Option[Cookie]`.
If the cookies are present, we then check for our `sessioncookie` within the list of cookies otherwise, we respond with `Ok("No cookies")`.
If the `sessioncookie` is present, we call the `getUser(token.content)` function with the token value which returns a `Try[String]`, we match against this to either get the user name or respond with `Ok("Invalid token")`.
If the user name is present, we pass it to our `service` by modifying the path info using the `withPathInfo()` function on our request. This takes a `URI` which we provide as `Uri.Path.fromString(s"/statement/$user")` with the username passed in.

Let's define a router to handle our two services.

```scala
import org.http4s.server.*

val serviceRouter =
    Router(
        "/login" -> digestService,
        "/" -> cookieCheckerService(cookieAccessRoutes)
    )
```

The `/login` path will receive our login request which will be handled by digestService while the sessions will be handled by the `cookieCheckerService()` function taking the `cookieAccessRoutes` service as an argument.

Finally, we can run our server with our new serviceRouter.

```scala
import org.http4s.ember.server.*
import com.comcast.ip4s.*

val server = EmberServerBuilder
  .default[IO]
  .withHost(ipv4"0.0.0.0")
  .withPort(port"8080")
  .withHttpApp(serviceRouter.orNotFound)
  .build

override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

Let's test our service, first by logging in.

```bash
curl -vv http://localhost:8080/login/welcome --digest -u username:password
*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
* Server auth using Digest with user 'username'
> GET /login/welcome HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 401 Unauthorized
< Date: Mon, 22 May 2023 10:29:53 GMT
< Connection: keep-alive
< WWW-Authenticate: Digest realm="http://localhost:8080/welcome",qop="auth",nonce="f6006e52b0212ead5f3e7fa9a600f52ec1667e22"
< Content-Length: 0
<
* Connection #0 to host localhost left intact
* Issue another request to this URL: 'http://localhost:8080/login/welcome'
* Found bundle for host localhost: 0x56088ccca650 [serially]
* Re-using existing connection! (#0) with host localhost
* Connected to localhost (::1) port 8080 (#0)
* Server auth using Digest with user 'username'
> GET /login/welcome HTTP/1.1
> Host: localhost:8080
> Authorization: Digest username="username", realm="http://localhost:8080/welcome", nonce="f6006e52b0212ead5f3e7fa9a600f52ec1667e22", uri="/login/welcome", cnonce="MTVkM2RjMGZjZDdhMzlhNTViYjMzMjcyNjE4NTI1MDQ=", nc=00000001, qop=auth, response="b344f127ddf856f962e51ed5030f30ab"
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Mon, 22 May 2023 10:29:54 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 17
< Set-Cookie: sessioncookie=dXNlcm5hbWU6ezIwMjMtMDUtMjJUMTM6Mjk6MTEuMzc5NTI4fQ==; Max-Age=86400
<
* Connection #0 to host localhost left intact
Welcome, username⏎
```

The sessioncookie has now been sent to the client and can be used for subsequent requests.

```bash
curl -vv --cookie "sessioncookie=dXNlcm5hbWU6ezIwMjMtMDUtMjJUMTM6Mjk6MTEuMzc5NTI4fQ==" http://localhost:8080/statement
*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
> GET /statement HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
> Cookie: sessioncookie=dXNlcm5hbWU6ezIwMjMtMDUtMjJUMTM6Mjk6MTEuMzc5NTI4fQ==
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Mon, 22 May 2023 10:33:20 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 56
<
* Connection #0 to host localhost left intact
Welcome back username, Financial statement processing...⏎
```

Here's the full code.

```scala
import cats.effect.*
import org.http4s.*
import org.http4s.dsl.io.*
import org.http4s.server.*
import org.http4s.ember.server.*
import com.comcast.ip4s.*
import org.http4s.server.middleware.authentication.DigestAuth
import org.http4s.headers.Cookie
import cats.data.*
import java.time.LocalDateTime
import java.util.Base64
import java.nio.charset.StandardCharsets
import scala.util.*

object SessionAuth extends IOApp:
    case class User(id: Long, name: String)
    val today: String = LocalDateTime.now().toString()
    def setToken(user: String, date: String):String = Base64.getEncoder.encodeToString(s"${user}:{$today}".getBytes(StandardCharsets.UTF_8))
    def getUser(token: String): Try[String] = Try((new String(Base64.getDecoder.decode(token))).split(":")(0))

    val funcPass: String => IO[Option[(User, String)]] = (user_val: String) =>
        user_val match
            case "username" => IO(Some(User(1,"username"),"password"))
            case _ => IO(None)

    val middleware:AuthMiddleware[IO, User] = DigestAuth[IO,User]("http://localhost:8080/welcome", funcPass)

    val authedRoutes: AuthedRoutes[User,IO] =
        AuthedRoutes.of{
            case GET -> Root / "welcome" as user =>
                Ok(s"Welcome, ${user.name}").map(_.addCookie(ResponseCookie("sessioncookie", setToken(user.name, today), maxAge = Some(86400))))
        }

    val digestService: HttpRoutes[IO] =
        middleware(authedRoutes)


    val cookieAccessRoutes = HttpRoutes.of[IO]{
        case GET -> Root / "statement" / user =>
            Ok(s"Welcome back $user, Financial statement processing...")
        case GET -> Root / "logout" =>
            Ok("Logging out...").map(_.removeCookie("sessioncookie"))
    }

    def cookieCheckerService(service: HttpRoutes[IO]): HttpRoutes[IO] = Kleisli{req =>
        val authHeader: Option[Cookie] = req.headers.get[Cookie]
        OptionT.liftF{authHeader match
            case Some(cookie) =>
                cookie.values.toList.find{x =>
                    x.name == "sessioncookie"
                } match
                    case Some(token) =>
                        getUser(token.content) match
                            case Success(user) =>
                                service.orNotFound.run((req.withPathInfo(Uri.Path.fromString(s"/statement/$user"))))
                            case Failure(_) => Ok("Invalid token")
                    case None => Ok("No token")
            case None => Ok("No cookies")
            }
    }


    val serviceRouter =
        Router(
            "/login" -> digestService,
            "/" -> cookieCheckerService(cookieAccessRoutes)
        )

    val server = EmberServerBuilder
    .default[IO]
    .withHost(ipv4"0.0.0.0")
    .withPort(port"8080")
    .withHttpApp(serviceRouter.orNotFound)
    .build

    override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

## JSON Web Token Authentication

For JWT authentication to work, a payload containing information for authentication is transmitted between the client and service as a JSON object. JSON Web Tokens are digitally signed using a secret or a private/public key pair so that the tokens' integrity can be verified by both the server and the client.

### JWT authentication in http4s

We'll be using the `http4s-jwt-auth` library to implement JWT's in Http4s.
First let's create our token that we will send to the client once he/she logs in.

```scala
import pdi.jwt.*
import java.time.Instant

val claim = JwtClaim(content = """{"user":"John", "level":"basic"}""", expiration = Some(Instant.now.plusSeconds(157784760).getEpochSecond), issuedAt = Some(Instant.now.getEpochSecond))

val key = "secretKey"

val algo = JwtAlgorithm.HS256

val token = JwtCirce.encode(claim, key, algo)
```

To create our token we use the `encode` function from `JwtCirce`, which takes a `secret key`, the encoding algorithm, `JwtAlgorithm.HS256`, and a `claim` passed as a `JwtClaim` object.
The `JwtClaim` object contains the payload which is stored as a JSON string, `"""{"user":"John", "level":"basic"}"""`, here we include the `user` name and his access `level`, there also `expiration` and `issuedAt` values which are both of type `Option[Long]`.

Now we can define our login route where we pass our JSON Web Token to the client.

```scala
import cats.effect.*
import org.http4s.*
import org.http4s.dsl.io.*

val loginRoutes: HttpRoutes[IO] =
    HttpRoutes.of[IO]{
        case GET -> Root / "login" =>
            Ok(s"Logged In").map(_.addCookie(ResponseCookie("token", token)))
    }
```

In this case, the JSON Web Token is stored as a cookie named `token` on the client side.

When a request is received we will need to handle the JSON stored in the payload.

```scala
import io.circe.*

case class TokenPayLoad(user: String, level: String)

object TokenPayLoad:
    given decoder: Decoder[TokenPayLoad] = Decoder.instance{h =>
        for
            user <- h.get[String]("user")
            level <- h.get[String]("level")
        yield TokenPayLoad(user,level)
    }
```

We can parse the JSON string with the help of `Circe`, first we define a case class named `TokenPayLoad` which will hold our payload information. The companion object `TokenPayLoad` contains a `given` or `implicit` decoder method that `yields` a `Decoder[TokenPayLoad]` object from the JSON string.
Now we can define a function to authenticate the JSON Web Token when it's passed by the user.

```scala
import dev.profunktor.auth.jwt.*
import io.circe.parser.*

case class AuthUser(id: Long, name: String)
val database = Map("John" -> AuthUser(123,"JohnDoe"))

val authenticate: JwtToken => JwtClaim => IO[Option[AuthUser]] =
    (token: JwtToken) =>
        (claim: JwtClaim)
        => decode[TokenPayLoad](claim.content) match
                case Right(payload) =>
                    println(payload)
                    println(payload.user)
                    IO(database.get(payload.user))
                case Left(_) => IO(None)
```

The `authenticate` function signature is of type `JwtToken => JwtClaim => IO[Option[AuthUser]]`. This function receives a `JwtToken` and transforms it into a `JWTClaim`, the payload represented as `claim.content` is then extracted and passed to our decoder function. This function results in an `Either[circe.error, TokenPayLoad]`, we can then pattern match against this value to check if the user exists in our simple database by calling `database.get(payload.user)` and returning either a `Left` with circe.error or `Right` with the `TokenPayLoad`. The final result will be an `IO[Option[AuthUser]]`.

We can now define the middleware and routes.

```scala
import dev.profunktor.auth.*

val jwtAuth = JwtAuth.hmac(key, algo)
val middleware = JwtAuthMiddleware[IO, AuthUser](jwtAuth, authenticate)

val authedRoutes: AuthedRoutes[AuthUser,IO] =
AuthedRoutes.of{
    case GET -> Root / "welcome" as user =>
        Ok(s"Welcome, ${user.name}")
}
```

The middleware is defined by calling `JwtAuthMiddleware[IO, AuthUser](jwtAuth, authenticate)` which is basically a Kleisli that receives the JSON Web Token and authenticates it to retrieve our `AuthUser`. It takes the `authenticate` function and a `JwtAuth` object which holds the `key` and `algo` values.

The routes are defined as `AuthedRoutes` for this implementation.

```scala
import cats.implicits.*

val securedRoutes: HttpRoutes[IO] = middleware(authedRoutes)

val service = loginRoutes <+> securedRoutes
```

`securedRoutes` is now our authentication service since our request first goes through the middleware and then responds with the authedRoutes service.
The final service is composed using the `<+>` operator.

Finally, we can run our server.

```scala
import org.http4s.ember.server.*
import com.comcast.ip4s.*

val server = EmberServerBuilder
.default[IO]
.withHost(ipv4"0.0.0.0")
.withPort(port"8080")
.withHttpApp(service.orNotFound)
.build

override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```

Let's test our server.

```bash
curl -vv http://localhost:8080/login
*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
> GET /login HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Mon, 22 May 2023 13:12:05 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 9
< Set-Cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4NDI1NDU2NjQsImlhdCI6MTY4NDc2MDkwNCwidXNlciI6IkpvaG4iLCAibGV2ZWwiOiJiYXNpYyJ9.VjkUrL6Ud0SINNWhUV8M_fFi9YgU8zxevcasiosRIKg
<
* Connection #0 to host localhost left intact
Logged In⏎
```

First, we log into the server and receive the JSON Web Token, then we can be connected to the rest of the site as an authroized user.

```bash
curl -vv -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4NDI1NDU2NjQsImlhdCI6MTY4NDc2MDkwNCwidXNlciI6IkpvaG4iLCAibGV2ZWwiOiJiYXNpYyJ9.VjkUrL6Ud0SINNWhUV8M_fFi9YgU8zxevcasiosRIKg" http://localhost:8080/welcome
*   Trying ::1:8080...
* Connected to localhost (::1) port 8080 (#0)
> GET /welcome HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.71.1
> Accept: */*
> Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4NDI1NDU2NjQsImlhdCI6MTY4NDc2MDkwNCwidXNlciI6IkpvaG4iLCAibGV2ZWwiOiJiYXNpYyJ9.VjkUrL6Ud0SINNWhUV8M_fFi9YgU8zxevcasiosRIKg
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Mon, 22 May 2023 13:13:29 GMT
< Connection: keep-alive
< Content-Type: text/plain; charset=UTF-8
< Content-Length: 16
<
* Connection #0 to host localhost left intact
Welcome, JohnDoe⏎
```

We receive the expected welcome message `Welcome, JohnDoe⏎ `, note that the JWT token is passed as a `Bearer` token using the `Authorization` header.
Here's the full code.

```scala
import cats.effect.{IOApp, IO, ExitCode}
import org.http4s.*
import org.http4s.dsl.io.*
import org.http4s.ember.server.*
import com.comcast.ip4s.*
import cats.implicits.*
import dev.profunktor.auth.*
import dev.profunktor.auth.jwt.*
import pdi.jwt.*
import java.time.Instant
import io.circe.*
import io.circe.parser.*

object TokenAuth extends IOApp:
    case class AuthUser(id: Long, name: String)
    case class TokenPayLoad(user: String, level: String)

    object TokenPayLoad:
        given decoder: Decoder[TokenPayLoad] = Decoder.instance{h =>
            for
                user <- h.get[String]("user")
                level <- h.get[String]("level")
            yield TokenPayLoad(user,level)
        }

    val claim = JwtClaim(content = """{"user":"John", "level":"basic"}""",expiration = Some(Instant.now.plusSeconds(157784760).getEpochSecond),
    issuedAt = Some(Instant.now.getEpochSecond))

    val key = "secretKey"

    val algo = JwtAlgorithm.HS256

    val token = JwtCirce.encode(claim, key, algo)

    val database = Map("John" -> AuthUser(123,"JohnDoe"))

    val authenticate: JwtToken => JwtClaim => IO[Option[AuthUser]] =
        (token: JwtToken) =>
            (claim: JwtClaim)
            => decode[TokenPayLoad](claim.content) match
                    case Right(payload) =>
                        println(payload)
                        println(payload.user)
                        IO(database.get(payload.user))
                    case Left(_) => IO(None)

    val jwtAuth = JwtAuth.hmac(key, algo)
    val middleware = JwtAuthMiddleware[IO, AuthUser](jwtAuth, authenticate)

    val authedRoutes: AuthedRoutes[AuthUser,IO] =
    AuthedRoutes.of{
        case GET -> Root / "welcome" as user =>
            Ok(s"Welcome, ${user.name}")
    }

    val loginRoutes: HttpRoutes[IO] =
        HttpRoutes.of[IO]{
            case GET -> Root / "login" =>
                Ok(s"Logged In").map(_.addCookie(ResponseCookie("token", token)))
        }

    val securedRoutes: HttpRoutes[IO] = middleware(authedRoutes)

    val service = loginRoutes <+> securedRoutes

    val server = EmberServerBuilder
    .default[IO]
    .withHost(ipv4"0.0.0.0")
    .withPort(port"8080")
    .withHttpApp(service.orNotFound)
    .build

    override def run(args: List[String]): IO[ExitCode] = server.use(_ => IO.never).as(ExitCode.Success)
```
