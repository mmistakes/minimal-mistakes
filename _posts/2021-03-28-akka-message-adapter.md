---
title: "Akka Typed: Adapting Messages"
date: 2021-03-28
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [akka]
excerpt: "In this article we'll see a good practice for organizing code, messages, domains and logic in an Akka application with Scala."
---

This article is for people comfortable with Akka Typed actors in Scala. I don't require you to be an expert, though - just the basics are assumed.

## 1. Setup

This article assumes you have Akka Typed in your project. If not, just create a new SBT project and add the following to your build.sbt:

```scala
val akkaVersion = "2.6.13"

libraryDependencies += "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion
```

## 2. Background

While working with Akka, your Scala code might become quite verbose, because of various factors

- declaring various messages actors might support
- organizing mini-domains inside your application
- defining behaviors and handling every type of supported message
- the various `Behaviors` constructs need you to pass boilerplate every time

Because of this, Akka code might become quite hard to read and reason about, especially if you have lots of various actors interacting with one another. Therefore, it usually pays off to follow some good code organization practices, so your logic is not swallowed inside a large amount of boilerplate.

This article will show you one technique. It's not perfect, but it solves one small problem well. In time, we'll have more techniques here on the blog, and you'll be able to compare and contrast them, so you can use the best one for your needs.

## 3. The Problem

Assume you're working on the backend/logic of an online store. Everything is asynchronous and non-blocking (by the nature of Akka), and you're currently focusing on one piece of your logic:

- a customer asks to check out their shopping cart (identified by a `cartId`)
- there's a Checkout actor which is responsible for surfacing the total amount due
- the Checkout actor will interact with a ShoppingCart actor, responsible for fetching the list of items in that cart

Let's take the following code structure to define messages. Take a moment to read this. We have a few message domains, for the ShoppingCart and Checkout actors respectively:

```scala
import akka.actor.typed.ActorRef

object StoreDomain {
  // never use double for money - for illustration purposes
  case class Product(name: String, price: Double)
}

object ShoppingCart {
  import StoreDomain._
  sealed trait Request
  case class GetCurrentCart(cartId: String, replyTo: ActorRef[Response]) extends Request
  // + some others

  sealed trait Response
  case class CurrentCart(cartId: String, items: List[Product]) extends Response
  // + some others

}

object Checkout {
  import ShoppingCart._

  // this is what we receive from the customer
  sealed trait Request
  final case class InspectSummary(cartId: String, replyTo: ActorRef[Response]) extends Request
  // + some others

  // this is what we send to the customer
  sealed trait Response
  final case class Summary(cartId: String, amount: Double) extends Response
  // + some others
}
```

We want to implement the following logic:

- a customer actor (of type `ActorRef[Response]`) sends a request to the Checkout actor, e.g. `InspectSummary`
- the Checkout actor queries the ShoppingCart actor for all the items in the basket, identified by the `cartId`
- the ShoopingCart replies with a `CurrentCart` containing all the items to the Checkout actor
- the Checkout actor will compute a total amount due, and send it back to the customer in the form of a `Summary` message

For our intents and purposes, the message flow is customer -> Checkout -> ShoppingCart, back to Checkout, back to customer. For this reason, the Checkout actor is called the "frontend", and the ShoppingCart actor is called the "backend".

The problem is that both ShoppingCart and Checkout have their own protocols (Request and Response). We need to make them interact.

The naive solution is to make the Checkout actor/behavior handle the ShoppingCart actor's responses. So the Checkout actor needs to handle messages of two separate types:

- Checkout.Request
- ShoppingCart.Response

That's an anti-pattern. If we go along this route, then imagine what would happen in an actor interacting with many others in your system: it would need to support its commands/requests, plus responses from everyone else. Because we're dealing with typed actors, unifying all these types is impossible unless we use `Any`, which leads us back to the untyped actors land.

## 4. The Solution: Adapting Messages

The rule of thumb is that *each actor needs to support its own "request" type and nothing else*.

To that end, if our Checkout actor needs to receive messages from the ShoppingCart actor, we need to turn them into `Checkout.Request` instances. The easiest way to do this is to wrap `ShoppingCart.Response` instances into `Checkout.Request` instances:

```scala
// message wrapper that can translate from the outer (backend) actor's responses to my own useful data structures
private final case class WrappedSCResponse(response: ShoppingCart.Response) extends Request
```

This was easy. The second step is to somehow automatically convert instances of `ShoppingCart.Response` to `Checkout.Request`. Akka offers a first-class API for doing that.

```scala
def apply(shoppingCart: ActorRef[ShoppingCart.Request]): Behavior[Request] =
  Behaviors.setup[Request] { context =>
    // message adapter turns a ShoppingCart.Response into my own message
    val responseMapper: ActorRef[ShoppingCart.Response] =
      context.messageAdapter(rsp => WrappedSCResponse(rsp))

    // ... rest of logic
  }
```

The `responseMapper` can only be spawned by this actor's `context`. It's a fictitious actor which, upon receiving messages of type `ShoppingCart.Response`, auto-sends the appropriate `WrappedSCResponse` to me (the Checkout actor).

This solution is a quick way to ensure that the Checkout actor *is only responsible for messages of type `Checkout.Request`*. Of course, the actual logic of handling the response from the ShoppingCart actor will have to live somewhere, but the responsibility is defined in terms of the declared actor type (watch the `apply` method return type).

## 5. Using Message Adapters

At this point, we can implement the rest of the logic of the Checkout actor, which is beyond the scope of the adapting technique. Let's assume we're keeping track of multiple users checking out at the same time (we're async, of course), so we can define a [stateless](/stateful-stateless-actors/) behavior:

```scala
def handlingCheckouts(checkoutsInProgress: Map[String, ActorRef[Response]]): Behavior[Request] = {
  Behaviors.receiveMessage[Request] {
    // message from customer - query the shopping cart
    // the recipient of that response is my message adapter
    case InspectSummary(cartId, replyTo) =>
      shoppingCart ! ShoppingCart.GetCurrentCart(cartId, responseMapper) // <--- message adapter here
      handlingCheckouts(checkoutsInProgress + (cartId -> replyTo))

    // the wrapped message from my adapter: deal with the Shopping Cart's response here
    case WrappedSCResponse(resp) =>
      resp match {
        case CurrentCart(cartId, items) =>
          val summary = Summary(cartId, items.map(_.price).sum)
          val customer = checkoutsInProgress(cartId)
          customer ! summary
          Behaviors.same

        // handle other potential responses from the ShoppingCart actor here
      }

  }
}
```

So that our final `Checkout` actor creation method will look like this:

```scala
def apply(shoppingCart: ActorRef[ShoppingCart.Request]): Behavior[Request] =
  Behaviors.setup[Request] { context =>
    // message adapter turns a ShoppingCart.Response into my own message
    val responseMapper: ActorRef[ShoppingCart.Response] =
      context.messageAdapter(rsp => WrappedSCResponse(rsp))

    def handlingCheckouts(checkoutsInProgress: Map[String, ActorRef[Response]]): Behavior[Request] = {
      // ... see above
    }

    // final behavior
    handlingCheckouts(checkoutsInProgress = Map())
  }
```

## 6. An End-to-End Application

See the full code below. Aside from the code we discussed earlier, please see the added sections marked as "NEW" in the comments, which are necessary for a runnable application.

```scala

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, ActorSystem, Behavior, DispatcherSelector, Dispatchers}

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

object AkkaMessageAdaptation {

  object StoreDomain {
    case class Product(name: String, price: Double) // never use double for money
  }

  object ShoppingCart {
    import StoreDomain._

    sealed trait Request
    case class GetCurrentCart(cartId: String, replyTo: ActorRef[Response]) extends Request
    // some others

    sealed trait Response
    case class CurrentCart(cartId: String, items: List[Product]) extends Response
    // some others

    // NEW: a dummy database holding all the current shopping carts
    val db: Map[String, List[Product]] = Map {
      "123-abc-456" -> List(Product("iPhone", 7000), Product("selfie stick", 30))
    }

    // NEW: a dummy shopping cart fetching things from the internal in-memory "database"/map
    def apply(): Behavior[Request] = Behaviors.receiveMessage {
      case GetCurrentCart(cartId, replyTo) =>
        replyTo ! CurrentCart(cartId, db(cartId))
        Behaviors.same
    }
  }

  object Checkout {
    import ShoppingCart._

    sealed trait Request
    final case class InsepctSummary(cartId: String, replyTo: ActorRef[Response]) extends Request
    // some others

    // message wrapper that can translate from the outer (backend) actor's responses to my own useful data structures
    private final case class WrappedSCResponse(response: ShoppingCart.Response) extends Request

    sealed trait Response
    final case class Summary(cartId: String, amount: Double) extends Response

    def apply(shoppingCart: ActorRef[ShoppingCart.Request]): Behavior[Request] =
      Behaviors.setup[Request] { context =>
        // adapter goes here
        val responseMapper: ActorRef[ShoppingCart.Response] =
          context.messageAdapter(rsp => WrappedSCResponse(rsp))

        // checkout behavior's logic
        def handlingCheckouts(checkoutsInProgress: Map[String, ActorRef[Response]]): Behavior[Request] = {
          Behaviors.receiveMessage[Request] {
            // message from customer - query the shopping cart
            // the recipient of that response is my message adapter
            case InsepctSummary(cartId, replyTo) =>
              shoppingCart ! ShoppingCart.GetCurrentCart(cartId, responseMapper) // <--- message adapter here
              handlingCheckouts(checkoutsInProgress + (cartId -> replyTo))

            // the wrapped message from my adapter: deal with the Shopping Cart's response here
            case WrappedSCResponse(resp) =>
              resp match {
                case CurrentCart(cartId, items) =>
                  val summary = Summary(cartId, items.map(_.price).sum)
                  val customer = checkoutsInProgress(cartId)
                  customer ! summary
                  Behaviors.same

                // handle other potential responses from the ShoppingCart actor here
              }

          }
        }

        handlingCheckouts(checkoutsInProgress = Map())
      }
  }

  // NEW - a main app with an actor system spawning a customer, checkout and shopping cart actor
  def main(args: Array[String]): Unit = {
    import Checkout._

    val rootBehavior: Behavior[Any] = Behaviors.setup { context =>
      val shoppingCart = context.spawn(ShoppingCart(), "shopping-cart")

      // simple customer actor displaying the total amount due
      val customer = context.spawn(Behaviors.receiveMessage[Response] {
        case Summary(_, amount) =>
          println(s"Total to pay: $amount - pay by card below.")
          Behaviors.same
      }, "customer")

      val checkout = context.spawn(Checkout(shoppingCart), "checkout")

      // trigger an interaction
      checkout ! InsepctSummary("123-abc-456", customer)

      // no behavior for the actor system
      Behaviors.empty
    }

    // setup/teardown
    val system = ActorSystem(rootBehavior, "main-app")
    implicit val ec: ExecutionContext = system.dispatchers.lookup(DispatcherSelector.default)
    system.scheduler.scheduleOnce(1.second, () => system.terminate())
  }
}
```
