---
title: "Akka Typed Actors: Stateful and Stateless"
date: 2020-10-22
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [akka]
excerpt: "Akka Typed has fundamentally changed the way we create actors. In this article we'll look at several ways we can keep state inside Akka actors."
---

This article is for people getting started with Akka typed actors. We'll look at how we can keep state inside an actor in a few different ways.

## Setup

This article will assume you have the Akka Typed library set up in your project. If you don't, you can create a new SBT project with your favorite tool, and add the following to your build.sbt file:

```scala
val akkaVersion = "2.6.10"

libraryDependencies += "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion
```

## Background

This article assumes you know the principles of Akka actors. In short:

- standard multithreading/parallel applications are a pain to write because of concurrency issues
- in Akka, we design applications in terms of actors
- an actor is an object whose state we cannot access directly, but we can only interact with it via asynchronous messages
- message passing and handling eliminates the need for us to manage threads & concurrency, while making it easy to write massively distributed systems

An actor is described by its behavior, which (among other things) is responsible for handling the messages that the actor can receive. After each message, the actor's behavior can change: given new information, the actor might change the way it handles future messages - much like us humans in real life.

An important part of an actor is the potential data it might hold - we call that its _state_. As a reaction to an incoming message, the data held inside the actor might change.

As an aside, this actor model embodies the real encapsulation principle: you can never access the internal state of the actor. We can never call some `getState()` method on it, but we can only interact with it via asynchronous messages. This is what object-oriented programming was [supposed to be](http://userpage.fu-berlin.de/~ram/pub/pub_jf47ht81Ht/doc_kay_oop_en) (search for "messages"). For some reason, OOP took a different turn... but I digress.

## A Stateful Emotional Actor

For this example, we'll write an actor that reacts to external messages from the world by changing its happiness level, originally starting at zero. Let's assume we have a few message types to send to this actor:

```scala
trait SimpleThing
case object EatChocolate extends SimpleThing
case object WashDishes extends SimpleThing
case object LearnAkka extends SimpleThing
```

We can then define an actor with a mutable piece of data (state) as follows:

```scala
import akka.actor.typed.Behavior
import akka.actor.typed.scaladsl.Behaviors

val emotionalMutableActor: Behavior[SimpleThing] = Behaviors.setup { context =>
    // define internal state
    var happiness = 0

    Behaviors.receiveMessage {
      case EatChocolate =>
        context.log.info(s"($happiness) Eating chocolate, getting a shot of dopamine!")
        // change internal state
        happiness += 1
        // new behavior for future messages
        Behaviors.same
      // similar cases for the other messages
      case WashDishes =>
        context.log.info(s"($happiness) Doing chores, womp, womp...")
        happiness -= 2
        Behaviors.same
      case LearnAkka =>
        context.log.info(s"($happiness) Learning Akka, looking good!")
        happiness += 100
        Behaviors.same
      case _ =>
        context.log.warn(s"($happiness) Received something i don't know")
        Behaviors.same
    }
  }
```

In order to use mutable state, we create this behavior using `Behaviors.setup`, which allows you to allocate resources at the moment of instantiation, before any messages can arrive to this actor.

If we want to test this actor, all we have to do is back it up by an `ActorSystem` and then fire a few messages to see how it does:

```scala
  def demoActorWithState(): Unit = {
    val emotionalActorSystem = ActorSystem(emotionalMutableActor, "EmotionalSystem")

    emotionalActorSystem ! EatChocolate
    emotionalActorSystem ! EatChocolate
    emotionalActorSystem ! WashDishes
    emotionalActorSystem ! LearnAkka

    Thread.sleep(1000)
    emotionalActorSystem.terminate()
  }
```

So if we call this in our main method and run our application, we'll get the following log lines:

```
[2020-10-22 17:49:32,854] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (0) Eating chocolate, getting a shot of dopamine!
[2020-10-22 17:49:32,854] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (1) Eating chocolate, getting a shot of dopamine!
[2020-10-22 17:49:32,854] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (2) Doing chores, womp, womp...
[2020-10-22 17:49:32,854] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (0) Learning Akka, looking good!
```

So we see that with every new message, our actor modified its internal state.

Mutable variables are generally fine inside an actor, because handling a message is thread-safe*, so we can safely change our variable without worrying that some other thread might race to change or read that variable at the same time.

\* except Future callbacks inside actors, which will be a discussion for another time...

## A Stateless Emotional Actor

But in pure Scala we hate variables and anything mutable. So in this part, I'll show you how we can write the same actor without needing a variable. Instead of a variable, we'll use a method taking an `Int` argument and returning a `Behavior` instance:

```scala
def emotionalFunctionalActor(happiness: Int = 0): Behavior[SimpleThing] = Behaviors.receive { (context, message) =>
  // handle message here
}
```

Notice that we moved our mutable variable as a method argument, and because we don't have a variable to initialize, we don't need `Behaviors.setup` anymore, so we can directly use `Behaviors.receive`. Inside the block, all we have to do is run a pattern match on the message and do something similar to what we did earlier. However, this time, we aren't returning `Behaviors.same` on every branch, but rather a new behavior obtained by calling `emotionalFunctionalActor` with a new value for happiness:

```scala
  def emotionalFunctionalActor(happiness: Int = 0): Behavior[SimpleThing] = Behaviors.receive { (context, message) =>
    message match {
      case EatChocolate =>
        context.log.info(s"($happiness) eating chocolate")
        // change internal state
        emotionalFunctionalActor(happiness + 1)
      case WashDishes =>
        context.log.info(s"($happiness) washing dishes, womp womp")
        emotionalFunctionalActor(happiness - 2)
      case LearnAkka =>
        context.log.info(s"($happiness) Learning Akka, yes!!")
        emotionalFunctionalActor(happiness + 100)
      case _ =>
        context.log.warn("Received something i don't know")
        Behaviors.same
    }
  }
```

Sure enough, if we change our test method to use this new `emotionalFunctionalActor` instead, the logged output will look the same:

```
[2020-10-22 17:59:27,334] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (0) eating chocolate
[2020-10-22 17:59:27,335] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (1) eating chocolate
[2020-10-22 17:59:27,335] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (2) washing dishes, womp womp
[2020-10-22 17:59:27,335] [INFO] [live.day2actors.AkkaEssentials$] [] [EmotionalSystem-akka.actor.default-dispatcher-3] - (0) Learning Akka, yes!!
```

## How to Turn a Stateful Actor into Stateless

Here are some steps to turn a stateful actor &mdash; with variables or mutable pieces of data &mdash; into a "stateless" actor:

1.  Create your actor behavior as a method. The arguments of the method will be immutable versions of the pieces of data you used to hold.
2. If you created your stateful actor with `Behaviors.setup`, you'll probably no longer need it &mdash; use `Behaviors.receive` or `Behaviors.receiveMessage`.
3. Most of the time, stateful actors keep the same behavior after the reception of a message &mdash; see earlier case where we returned `Behaviors.same` every time. This time, with every message reception, you'll change the behavior to a new method call with new arguments, depending on the data you need to change.

You may be wondering whether calling the said method again in the message handling cases (this case `emotionalFunctionalActor`) can blow up the stack. This is an interesting topic.

This "recursive" method call is not truly recursive. Remember, when a thread schedules this actor for execution, it will dequeue messages off its mailbox. Once it handles a message, it will create a new behavior which it will attach to the actor &mdash; of course, by calling the `emotionalFunctionalActor` or whatever your method is. But this method returns _immediately_ with a new behavior &mdash; it won't call itself forever, the thread just calls it once, and it returns an object. Once the actor is again scheduled for execution &mdash; perhaps even on the same thread as before &mdash; the thread will simply apply that behavior on the message again, create a new behavior, etc. Nothing truly recursive happens there, because the behavior is invoked at a different time.

## Conclusion

We've seen how we can create stateful actors in Akka Typed, how a "stateless" actor looks like, and how to turn mutable state into method arguments in a stateless actor version. I hope this is useful, and that you'll create more functional-style/"stateless" actors after this article!
