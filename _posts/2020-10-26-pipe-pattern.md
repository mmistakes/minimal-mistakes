---
title: "Akka Typed: How the Pipe Pattern Prevents Anti-Patterns"
date: 2020-10-26
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [akka]
excerpt: "Akka Typed has not only made fundamental changes in the actor protocol definitions, but made significant improvements in actor mechanics as well."
---

This article is for people who are getting familiar with Akka Typed actors. You don't have to be an expert &mdash; that would certainly be a plus &mdash; but some familiarity with actor concepts is assumed.

## Setup

We assume you have Akka Typed in your project. If not, just create a new SBT project and add the following to your build.sbt:

```scala
val akkaVersion = "2.6.10"

libraryDependencies += "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion
```

## Background

This piece assumes you know the first principles of Akka actors (check the intro of [this article](/stateful-stateless-actors) for an introduction). In particular for this article, we care most about actor **encapsulation**: the state of an actor is inaccessible from the outside, even in a multithreaded/distributed environment. We can only communicate with an actor via message exchanges.

However, in "real life", our actor may not necessarily block on resources while handling a message. We often make our actors interact with otherwise asynchronous services. These asynchronous services can break actor encapsulation, because handling an asynchronous response happens on some thread &mdash; potentially a different thread than the one that just took control of the actor.

## An Anti-Pattern

Imagine we're designing a Twilio-like service which performs phone calls. To call somebody (a customer, a friend, etc) we have a "database" of name-number pairs that we can access via an asynchronous call. The "infrastructure", in this simplified model, looks like this:

```scala
import scala.concurrent.{ExecutionContext, Future}
import java.util.concurrent.Executors

object Infrastructure {

  private implicit val ec: ExecutionContext = ExecutionContext.fromExecutorService(Executors.newFixedThreadPool(8))

  private val db: Map[String, Int] = Map(
    "Daniel" -> 123,
    "Alice" -> 456,
    "Bob" -> 999
  )

  // external API
  def asyncRetrievePhoneNumberFromDb(name: String): Future[Int] =
    Future(db(name))
}
```

Assume we're designing an actor which can receive a command to initiate a phone call to a person. This actor would call the external service, and upon obtaining the phone number, it would initiate the call. A quick implementation would look like this:

```scala
import akka.actor.typed.scaladsl.{Behaviors, Routers}
import scala.util.{Failure, Success}

trait PhoneCallProtocol
case class FindAndCallPhoneNumber(name: String) extends PhoneCallProtocol

val quickPhoneCallInitiator: Behavior[PhoneCallProtocol] =
  Behaviors.setup { (context, message) =>
    var nPhoneCalls = 0
    var nFailures = 0

    Behaviors.receiveMessage {
      case FindAndCallPhoneNumber(name) =>
        val futureNumber: Future[Int] = asyncRetrievePhoneNumberFromDb(name)
        futureNumber.onComplete {
          case Success(number) =>
            // actually perform the phone call here
            context.log.info(s"Initiating phone call to $number")
            nPhoneCalls += 1 // please cringe here
          case Failure(ex) =>
            context.log.error(s"Phone call to $name failed: $ex")
            nFailures += 1 // please cringe here
        }
        Behaviors.same
    }
  }
```

After designing the actor protocol in terms of the commands it can receive (here, only one), we are setting up the actor state with `Behaviors.setup` and then returning a message handler with `Behaviors.receive`. In this handler, upon receiving the `FindAndCallPhoneNumber` command, this actor would invoke the external service, then process the resulting future with `.onComplete`.

So what's the problem?

`Future` callbacks, as well as transformations, are evaluated on _some_ thread. This thread may or may not be the one that's handling the message. In other words, each line with "please cringe here" is a race condition. **We've broken the actor encapsulation.**

A second drawback is that, since changing actor state happens in a `Future` callback, we can't make this actor [stateless](/stateful-stateless-actors).

## Enter Pipes

There is another way which is completely safe, both from a type perspective and from a multithreading perspective.

The question is: why handle the `Future` manually at all? Why not send the result of that `Future` to this actor as a message, which it can later handle in a thread-safe way?

This technique is the pipe pattern. We are going to automatically redirect the contents of the `Future` back to this actor, as a message which it will receive later. There are two important aspects to this approach:

- A benefit: no more encapsulation break, since handling the result of the `Future` will be handled as a message in a thread-safe way
- A benefit + responsibility: because the actor is typed, we need to transform the result of the `Future` (which is a `Try[Something]`) into a message type the actor supports

In order to make pipes work, the result of our "infra" asynchronous call (either successful or failed) needs to be transformed into a message type the actor supports, so we'll need to create two more message classes:

```scala
case class InitiatePhoneCall(number: Int) extends PhoneCallProtocol
case class LogPhoneCallFailure(reason: Throwable) extends PhoneCallProtocol
```

After which we can make the actor send the future result to itself later, and handle the new messages:

```scala
val phoneCallInitiatorV2: Behavior[PhoneCallProtocol] =
  Behaviors.setup { (context, message) =>
    var nPhoneCalls = 0
    var nFailures = 0

    Behaviors.receiveMessage {
      case FindAndCallPhoneNumber(name) =>
        val futureNumber: Future[Int] = asyncRetrievePhoneNumberFromDb(name)
        // pipe makes all the difference
        // transform the result of the future into a message
        context.pipeToSelf(futureNumber) {
          case Success(phoneNumber) =>
            // messages that will be sent to myself
            InitiatePhoneCall(phoneNumber)
          case Failure(ex) =>
            LogPhoneCallFailure(ex)
        }
        Behaviors.same
      case InitiatePhoneCall(number) =>
        // perform the phone call
        context.log.info(s"Starting phone call to $number")
        nPhoneCalls += 1 // no more cringing
        Behaviors.same
      case LogPhoneCallFailure(ex) =>
        context.log.error(s"Calling number failed: $ex")
        nFailures += 1 // no more cringing
        Behaviors.same
    }
  }
```

Notice the `pipeToSelf` call. We pass a `Future` and a function which transforms a `Try[Int]` into a message this actor will handle later. In the message handlers, we are then free to change actor state, because handling a message is atomic. We've repaired the actor encapsulation.

This pattern now enables us to make the actor stateless if we wanted, because changing state happens in a message handler. So we can further refactor our actor:

```scala
def phoneCallInitiatorV3(nPhoneCalls: Int = 0, nFailures: Int = 0): Behavior[PhoneCallProtocol] =
  Behaviors.receive { (context, message) =>
    message match {
      case FindAndCallPhoneNumber(name) =>
        val futureNumber: Future[Int] = asyncRetrievePhoneNumberFromDb(name)
        // pipe makes all the difference
        // transform the result of the future into a message
        context.pipeToSelf(futureNumber) {
          case Success(phoneNumber) =>
            // messages that will be sent to myself
            InitiatePhoneCall(phoneNumber)
          case Failure(ex) =>
            LogPhoneCallFailure(ex)
        }
        Behaviors.same
      case InitiatePhoneCall(number) =>
        // perform the phone call
        context.log.info(s"Starting phone call to $number")
        // change behavior
        phoneCallInitiatorV3(nPhoneCalls + 1, nFailures)
      case LogPhoneCallFailure(ex) =>
        // log failure
        context.log.error(s"Calling number failed: $ex")
        // change behavior
        phoneCallInitiatorV3(nPhoneCalls, nFailures + 1)
    }
  }
```

Notice how we turned the `val` behavior into a `def` which now keeps the "state" as method arguments. Wherever we used to change state, now we return a new behavior containing the new "state" as method arguments. Because there's nothing mutable to set up, we don't need `Behaviors.setup` and now use `Behaviors.receiveMessage` instead.

To end, the `pipeToSelf` call is completely thread-safe and fine to call even from other Future callbacks.

## Conclusion

In this article, we explored how the pipe pattern solves a potentially serious problem when handling `Futures` inside an actor's scope, how we can repair it and (as a bonus) how we can make an actor stateless even while handling results from external services. Hopefully this is useful!
