---
title: "Organizing Services with ZIO and ZLayers"
date: 2021-03-01
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, zio]
excerpt: "ZIO layers (ZLayers) help us structure our complex services into modules that are independent, composable and easy to understand. Let's take a look."
---

In this article, we'll take a look at `ZLayer`s, an abstraction naturally arising from the core design of ZIO, which can greatly assist in making large code bases more understandable, composable and searchable for the human beings charged with their care.

This article is for the comfortable Scala programmer. Some familiarity with ZIO basics will help, but I'll take care to outline the necessary concepts here so that the article can be as standalone as possible.

If you want to code with me in the article (or the [YouTube video](https://youtu.be/PaogLRrYo64)), you'll have to add these lines to your `build.sbt` file:

```scala
libraryDependencies ++= "dev.zio" %% "zio" % "1.0.4-2" // latest version at the moment of this writing
```

## 1. Background

The [ZIO](https://github.com/zio/zio) library is centered around the `ZIO` type. Instances of ZIO are called "effects", which describe anything that a program normally does: printing, computing, opening connections, reading, writing etc. However it's worth pointing out that &mdash; much like other IO monads &mdash; constructing such an "effect" does not _actually_ produce it at that moment. Instead, a ZIO instance is a data structure _describing_ an effect.

![The effect is not the effect.](/images/jack%20sparrow%20effect.jpeg)

The ZIO type describes an effect which is caused by an input, and can produce either an error or a desired value. As such, it takes 3 type arguments:

- an input type `R`, also known as _environment_
- an error type `E`, which can be anything (not necessarily a Throwable)
- a value type `A`

and we thus have `ZIO[-R, +E, +A]`. Conceptually, a ZIO instance is equivalent to a function `R => Either[E,A]`, and there are natural conversion APIs between ZIO and the standard library structures.

This design allows instances of ZIO to be composed like functions, with various APIs, guarantees and conditions.

Some examples:

```scala
import zio.ZIO

// data structures to wrap a value or an error
// the input type is "any", since they don't require any input
val success = ZIO.succeed(42)
val fail = ZIO.fail("Something went wrong") // notice the error can be of any type

// reading and writing to the console are effects
// the input type is a Console instance, which ZIO provides with the import
import zio.console._
val greetingZio =
  for {
    _    <- putStrLn("Hi! What is your name?")
    name <- getStrLn
    _    <- putStrLn(s"Hello, $name, welcome to Rock the JVM!")
  } yield ()
```

These ZIO instances don't actually do anything; they only describe what will be computed or "done". If we want the `greetingZio` effect to actually run, we need to put it in a main app:

```scala
object ZioPlayground extends zio.App {
  def run(args: List[String]) =
    greetingZio.exitCode
}
```

```txt
Hello! What is your name?
> Daniel
Hello, Daniel, welcome to Rock the JVM!

Process finished with exit code 0
```

## 2. Services as Effects

In a real application, we often need to create heavyweight data structures which are important for various operations. The list is longer than we like to admit, but some critical operations usually include

- interacting with a database or storage layer
- doing business logic
- serving a front-facing API, perhaps through HTTP
- communicating with other services

Now, if we think about it, most of these data structures are created through some sort of effect: for example, creating a connection pool, reading from some configuration file, opening network ports, etc.

We can therefore conveniently think of these services as a particular kind of effect. ZIO matches this pattern perfectly:

- a service may have dependencies, therefore "inputs" or "environment"
- a service may fail with an error
- a service, once created, may serve as dependency or input to other services

This style of thinking about a service is the core idea behind a `ZLayer`.

For the rest of this article, we'll write a skeleton for an email newsletter service that automatically gives a user a welcome email, once subscribed. The implementations are console-based, but they can be easily replaced by a real database or a real email service. The goal of this example is to show you how to plug together independent components of your application.

## 3. The `ZLayer` Pattern

Let's assume we're working with user instances of the form

```scala
case class User(name: String, email: String)
```

Let's define a small service which, given a user, will send them a particular message to their email address. A simple API would look like this:

```scala
object UserEmailer {  // service
  trait Service {
    def notify(user: User, message: String): Task[Unit]
  }
}
```

A `Task` is an alias for `ZIO[Any, Throwable, A]`: produces a value (of type `Unit` in this case), takes no inputs and can throw an exception.

An implementation of this service would send an email to this user, but for this example we'll use a console printer:

```scala
val aServiceImpl = new Service {
  override def notify(user: User, message: String): Task[Unit] =
    Task {
      println(s"Sending '$message' to ${user.email}")
    }
}
```

The interesting thing is that, in order to make this service available to other parts of the application, we can wrap it inside an effectful creation of this service. This is where `ZLayer` comes into play:

```scala
val live: ZLayer[Any, Nothing, Has[UserEmailer.Service]] = ZLayer.succeed(
  // that same service we wrote above
  new Service {
    override def notify(user: User, message: String): Task[Unit] =
      Task {
        println(s"Sending '$message' to ${user.email}")
      }
  }
)
```

Much like `ZIO`, a `ZLayer` has 3 type arguments:

- an input type `RIn`, aka "dependency" type
- an error type `E`, for the error that might arise during creation of the service
- an output type `ROut`

Note the output type in this case: we have a `Has[UserEmailer.Service]`, not a plain `UserEmailer.Service`. We'll come back to this and show how this works and why it's needed.

This `live` instance sits inside the `UserEmailer` object, as the live implementation of its inner `Service` trait. Still inside the same object, it's common to expose a higher-level API:

```scala
def notify(user: User, message: String): ZIO[Has[UserEmailer.Service], Throwable, Unit] =
  ZIO.accessM(_.get.notify(user, message))
```

This may be hard to understand if you're seeing `ZIO`s for the first time. The `notify` method is an effect, so it's a `ZIO` instance. The input type is a `Has[UserEmailer.Service]`, which means that whoever calls this `notify` method needs to have obtained a `UserEmailer.Service`. If we do, then we can access that instance as the input of that ZIO instance, via `accessM`, and then use that service's API directly.

Here's how we can directly use this in a main app:

```scala
object ZLayerPlayground extends zio.App {
  override def run(args: List[String]): ZIO[zio.ZEnv, Nothing, ExitCode] =
    UserEmailer
      .notify(User("Daniel", "daniel@rockthejvm.com"), "Welcome to Rock the JVM!") // the specification of the action
      .provideLayer(UserEmailer.live) // plugging in a real layer/implementation to run on
      .exitCode // trigger the effect
}
```

So far, we have our first layer of our email newsletter service:

```scala
import zio.{ZIO, Has, Task, ZLayer}

// type alias to use for other layers
type UserEmailerEnv = Has[UserEmailer.Service]

object UserEmailer {
  // service definition
  trait Service {
    def notify(u: User, msg: String): Task[Unit]
  }

  // layer; includes service implementation
  val live: ZLayer[Any, Nothing, UserEmailerEnv] = ZLayer.succeed(new Service {
    override def notify(u: User, msg: String): Task[Unit] =
      Task {
        println(s"[Email service] Sending $msg to ${u.email}")
      }
  })

  // front-facing API, aka "accessor"
  def notify(u: User, msg: String): ZIO[UserEmailerEnv, Throwable, Unit] = ZIO.accessM(_.get.notify(u, msg))
}
```

Another ZLayer in our email newsletter application can be a user email database. Following the same pattern, we arrive at a very similar structure:

```scala
// type alias
type UserDbEnv = Has[UserDb.Service]

object UserDb {
  // service definition
  trait Service {
    def insert(user: User): Task[Unit]
  }

  // layer - service implementation
  val live: ZLayer[Any, Nothing, UserDbEnv] = ZLayer.succeed {
    new Service {
      override def insert(user: User): Task[Unit] = Task {
        // can replace this with an actual DB SQL string
        println(s"[Database] insert into public.user values ('${user.name}')")
      }
    }
  }

  // accessor
  def insert(u: User): ZIO[UserDbEnv, Throwable, Unit] = ZIO.accessM(_.get.insert(u))
}
```

## 4. Composing `ZLayer`s

The two `ZLayer`s we've just defined are so far independent, but we can compose them. Because the `ZLayer` type is analogous to a function `RIn => Either[E, ROut]`, it makes sense to be able to compose `ZLayer` instances like functions.

### 4.1. Horizontal Composition

One way of combining `ZLayers` is the so-called "horizontal" composition. If we have

- a `ZLayer[RIn1, E1, ROut1]`
- another `ZLayer[RIn2, E2, ROut2]`

we can obtain a "bigger" `ZLayer` which can take as input `RIn1 with RIn2`, and produce as output `ROut1 with ROut2`. If we suggested earlier that `RIn` is a "dependency", then this new `ZLayer` combines (sums) the dependencies of both `ZLayer`s, and produces a "bigger" output, which can serve as dependency for a later `ZLayer`.

For our use-case, it makes sense to combine `UserDb` and `UserEmailer` horizontally, because they have no dependencies and can produce a powerful layer which combines `UserDbEnv with UserEmailerEnv`. In other words, there is such a thing as

```scala
val userBackendLayer: ZLayer[Any, Nothing, UserDbEnv with UserEmailerEnv] =
  UserDb.live ++ UserEmailer.live
```

Remember what we wrote earlier when we used the email notification service directly?

```scala
override def run(args: List[String]): ZIO[zio.ZEnv, Nothing, ExitCode] =
  UserEmailer
    .notify(User("Daniel", "daniel@rockthejvm.com"), "Welcome to Rock the JVM!")
    .provideLayer(UserEmailer.live) // <--- this is where we plug a ZLayer containing a real service implementation
    .exitCode
```

We can replace `UserEmailer.live` with this `userBackendLayer` and it will still work. The nice thing is that this `userBackendLayer` can also be directly used when we say

```scala
UserDb.insert(User("Daniel", "daniel@rockthejvm.com"))
  .provideLayer(userBackendLayer)
  .exitCode
```

so we can directly use this same "bigger" `ZLayer` in both cases because it contains live implementations of both services.

### 4.2. Vertical Composition

Another way of composing `ZLayer`s is by the so-called "vertical" composition, which is more akin to regular function composition: the output of one `ZLayer` is the input of another `ZLayer`, and the result becomes a new `ZLayer` with the input from the first and the output from the second.

For our use-case, another `ZLayer` might be more appropriate.

When a user signs up to our newsletter, we want to store their email in the database _and_ send them the welcome email. In other words, we want to be able to invoke the two services from a third service, which will have a single, front-facing `subscribe` API. We'll start with the same pattern as before, but this time, we'll implement the `Service` as a class:

```scala
// type alias
type UserSubscriptionEnv = Has[UserSubscription.Service]

object UserSubscription {
  // service definition as a class
  class Service(notifier: UserEmailer.Service, userModel: UserDb.Service) {
    def subscribe(u: User): Task[User] = {
      for {
        _ <- userModel.insert(u)
        _ <- notifier.notify(u, s"Welcome, ${u.name}! Here are some ZIO articles for you here at Rock the JVM.")
      } yield u
    }
  }
}
```

The difference here is that the inner `Service` type doesn't need any abstract methods since it only uses the other two services. Concrete instances of `UserEmailer.Service` and `UserDb.Service` will in turn influence the instances of `UserSubscription.Service` via &mdash; you guessed it &mdash; dependency injection:

```scala
val live: ZLayer[UserEmailerEnv with UserDbEnv, Nothing, UserSubscriptionEnv] =
  ZLayer.fromServices[UserEmailer.Service, UserDb.Service, UserSubscription.Service]( emailer, db =>
    new Service(emailer, db)
  )
```

This is a bit opaque and hard to read: where do the real instances of `UserEmailer.Service` and `UserDb.Service` come from?

If you remember the horizontal-composed `ZLayer`:

```scala
val userBackendLayer: ZLayer[Any, Nothing, UserDbEnv with UserEmailerEnv] =
  UserDb.live ++ UserEmailer.live
```

then we can use the output of `userBackendLayer` as input of `UserSubscription.live`. Here goes:

```scala
val userSubscriptionLayer: ZLayer[Any, Throwable, UserSubscriptionEnv] =
  userBackendLayer >>> UserSubscription.live
```

We therefore obtain a single `ZLayer` which contains the implementation of a `UserSubscription.Service`, and the creation/passing of the `UserEmailer.Service` and `UserDb.Service` happens because of the construction of `userBackendLayer` (which contains implementations for both) and the `>>>` operator, which then calls the callback from `ZLayer.fromService`. You don't need to care about that, but that's just if you're curious (I for one was when I read on ZIO).


## 5. Plugging Everything Together

The final program to subscribe the first fan of Rock the JVM (me) to this fictitious email newsletter looks like this:

```scala
  import zio.{ExitCode, Has, Task, ZIO, ZLayer}

  case class User(name: String, email: String)

  object UserEmailer {
    // type alias to use for other layers
    type UserEmailerEnv = Has[UserEmailer.Service]

    // service definition
    trait Service {
      def notify(u: User, msg: String): Task[Unit]
    }

    // layer; includes service implementation
    val live: ZLayer[Any, Nothing, UserEmailerEnv] = ZLayer.succeed(new Service {
      override def notify(u: User, msg: String): Task[Unit] =
        Task {
          println(s"[Email service] Sending $msg to ${u.email}")
        }
    })

    // front-facing API, aka "accessor"
    def notify(u: User, msg: String): ZIO[UserEmailerEnv, Throwable, Unit] = ZIO.accessM(_.get.notify(u, msg))
  }

  object UserDb {
    // type alias, to use for other layers
    type UserDbEnv = Has[UserDb.Service]

    // service definition
    trait Service {
      def insert(user: User): Task[Unit]
    }

    // layer - service implementation
    val live: ZLayer[Any, Nothing, UserDbEnv] = ZLayer.succeed {
      new Service {
        override def insert(user: User): Task[Unit] = Task {
          // can replace this with an actual DB SQL string
          println(s"[Database] insert into public.user values ('${user.name}')")
        }
      }
    }

    // accessor
    def insert(u: User): ZIO[UserDbEnv, Throwable, Unit] = ZIO.accessM(_.get.insert(u))
  }


  object UserSubscription {
    import UserEmailer._
    import UserDb._

    // type alias
    type UserSubscriptionEnv = Has[UserSubscription.Service]

    // service definition
    class Service(notifier: UserEmailer.Service, userModel: UserDb.Service) {
      def subscribe(u: User): Task[User] = {
        for {
          _ <- userModel.insert(u)
          _ <- notifier.notify(u, s"Welcome, ${u.name}! Here are some ZIO articles for you here at Rock the JVM.")
        } yield u
      }
    }

    // layer with service implementation via dependency injection
    val live: ZLayer[UserEmailerEnv with UserDbEnv, Nothing, UserSubscriptionEnv] =
      ZLayer.fromServices[UserEmailer.Service, UserDb.Service, UserSubscription.Service] { (emailer, db) =>
        new Service(emailer, db)
      }

    // accessor
    def subscribe(u: User): ZIO[UserSubscriptionEnv, Throwable, User] = ZIO.accessM(_.get.subscribe(u))
  }

  object ZLayersPlayground extends zio.App {
    override def run(args: List[String]): ZIO[zio.ZEnv, Nothing, ExitCode] = {
      val userRegistrationLayer = (UserDb.live ++ UserEmailer.live) >>> UserSubscription.live

      UserSubscription.subscribe(User("daniel", "daniel@rockthejvm.com"))
        .provideLayer(userRegistrationLayer)
        .catchAll(t => ZIO.succeed(t.printStackTrace()).map(_ => ExitCode.failure))
        .map { u =>
          println(s"Registered user: $u")
          ExitCode.success
        }
    }
  }
```

## 6. So What's With That `Has` Thing?

We see that whenever we combine `ZLayers` horizontally, we obtain inputs and outputs of the form `Has[Service1] with Has[Service2]`. Why the `Has[_]`? Why not just `Service1 with Service2` à la cake-pattern?

If we had an instance of `Service1 with Service2`, that single instance would have had both their APIs. On the other hand, `Has[_]` is cleverly built to hold each instance independently while still maintaining the formal type definition. Strictly for our use case, an instance of `Has[Service1] with Has[Service2]` has one instance of `Service1` and one instance of `Service2`, which we can surface and use independently, instead of a composite `Service1 with Service2` instance.

## 7. Conclusion

We went through an overview of ZIO and we covered the essence of `ZLayer`, enough to understand what it does and how it can help us build independent services, which we can plug together to create complex applications.

More on ZIO soon.
