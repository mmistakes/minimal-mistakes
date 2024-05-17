---
title: "How Akka Typed Incentivizes You to Write Good Code"
date: 2020-05-11
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [akka]
excerpt: "Akka Typed is one of the best things that happened with the Akka API. We explore how good practices are baked into the API directly."
---
Akka Typed is widely praised for bringing compile-time checks to actors and a whole new actor API. The problem is that even this new typed API has loopholes that almost never completely close the old Akka anti-patterns. However, the 2.6 API is a big step in the right direction, because although the API is not airtight, it's extremely powerful in the way that it shapes incentives to write good code. Let me give some examples for some of the most basic things.

## Typed messages

Let me start with the obvious: the messages an actor can receive will be reflected in the type of the actor, and vice-versa: the type of its ActorRef will be both a reason for the compiler to yell at you if you don't send a message of the right type, and also an indication to the user of the actor about what it's supposed to do. Let me give an example:

```scala
  trait ShoppingCartMessage
  case class AddItem(item: String) extends ShoppingCartMessage
  case class RemoveItem(item: String) extends ShoppingCartMessage
  case object ValidateCart extends ShoppingCartMessage

  val shoppingActor = ActorSystem(
    Behaviors.receiveMessage[ShoppingCartMessage] { message =>
      message match {
        case AddItem(item) =>
          println(s"adding $item")
        case RemoveItem(item) =>
          println(s"removing $item")
        case ValidateCart =>
          println("checking cart")
      }

      Behaviors.same
    },
    "simpleShoppingActor"
  )
```

Please ignore that I'm catastrophically using Double for currency, and don't try this at home (or in production). The problem with the new typed behaviors is that messages are still pattern-matched, and it's very unlikely that in your big-ass application an actor will process a single message type EVER. However, the natural tendency is to think of an actor as receiving a message from a given hierarchy, which leads to a nice OO-type structure of messages. Of course, you can circumvent this and use Any, but why would you do that? Right from the moment of typing Any there you probably get an icy feel in the back of your neck that there's something wrong with your code.

Additionally, if your message hierarchy is sealed, then the compiler will also help you treat every case.

## Mutable state

Mutable state was discouraged in Akka from the very beginning. If you remember the old "classic" API, we had this context-become pattern to change actor behavior and hold immutable "state" in method arguments returning receive handlers. Variables and mutable state have not disappeared:

```scala
  val shoppingActorMutable = ActorSystem(
    Behaviors.setup { _ =>
      var items: Set[String] = Set()

      Behaviors.receiveMessage[ShoppingCartMessage] {
        case AddItem(item) =>
          println(s"adding $item")
          items = items + item
          Behaviors.same
        case RemoveItem(item) =>
          println(s"depositing $item")
          items = items - item
          Behaviors.same
        case ValidateCart =>
          println(s"checking cart: $items")
          Behaviors.same
        // can also try with pattern matching and returning Behavior.same once
      }
    },
    "mutableShoppingActor"
  )
```

However, in most Behavior factories - if not all, I'm not 100% up to speed yet - you are forced to return a new behavior after a message is being handled. In other words, the behavior changing is baked into the API now. With this in mind, it's much easier to create different behaviors and have the actors adapt in a more logical way:

```scala
  def shoppingBehavior(items: Set[String]): Behavior[ShoppingCartMessage] =
    Behaviors.receiveMessage[ShoppingCartMessage] {
    case AddItem(item) =>
      println(s"adding $item")
      shoppingBehavior(items + item)
    case RemoveItem(item) =>
      println(s"removing $item")
      shoppingBehavior(items - item)
    case ValidateCart =>
      println(s"checking cart: $items")
      Behaviors.same
  }
```

So why would you need variables anymore when you have this logical code structure that avoids mutable state altogether? Much easier to write good code.

## Actor hierarchy

One of the massive benefits of Akka was the "let it crash" mentality embedded into the toolkit. This was achieved by making the actors maintain a supervision hierarchy, in which if an actor fails, then its parent - which acts like a supervisor - can deal with the failure and decide whether to restart the actor, stop it, resume it or simply escalate to its parent.

A common anti-pattern of the old Akka API was spawning very flat hierarchies, which destroyed this massive benefit. The crux of the problem was the easily usable system.actorOf. Everyone anywhere could go "system.actorOf" left and right and all of a sudden you had massive groups of actors managed by the same user guardian actor with the default supervision strategy.

In the new API, we don't have that. No more system.actorOf. You are now forced to think of the actor hierarchy and how the root guardian will manage them. That's simply by the fact that you can't spawn actors AT ALL - you can only spawn child actors:

```scala
  val rootActor = ActorSystem(
    Behaviors.setup { ctx =>
      // create children
      ctx.spawn(shoppingBehavior(Set()), "danielsShoppingCart")
      // no behavior in the root actor directly
      Behaviors.empty
    },
    "onlineStore"
  )
```

So even if your root actor doesn't handle messages itself, the fact that you can only spawn actors from a hierarchy is a huge win. It forces you to be a good citizen and embed actor hierarchy - and thus supervision - into your code.

## A way forward

This new API redefines what "normal" code should look like, and for the most part, it's shepherding Akka code towards the right direction. As I mentioned earlier, the API is not airtight and it can still be circumvented, but expect to see better Akka code in the future simply by the tools we now have at our disposal.
