---
title: "Sync, Async and (non) blocking in Scala and Akka"
date: 2020-05-08
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, akka]
excerpt: "We discuss the tradeoffs between 3 different styles of writing parallel code, in terms of thread use (and other effects) in Scala and Akka."
---
This article is for programmers of all levels, willing to deal with asynchronous and/or non-blocking computation. I'm going to write Scala (naturally), but the problem I'll address is general and across almost every language and tech: the difference between synchronous, asynchronous, blocking and non-blocking.

## Synchronous, blocking

Without invoking any other threads, every single thing we write is serial. However, not all things are active in the sense that they perform work. Our job is to get the most out of our CPU, but some function calls invoke some sort of resource (like a database), or wait for it to start, or wait for a response. That is called a blocking call. Blocking, because when you call the function, you can't do anything until you get a result.

```scala
def blockingFunction(arg: Int): Int = {
    Thread.sleep(10000)
    arg + 42
}
```

If we call the function, the subsequent expression will need to wait at least 10 seconds:

```scala
blockingFunction(3)
val theMeaningOfLife = 42 // I don't want to touch on the philosophical, but this happens in real life.
```

The main downside of blocking calls is that the calling thread is neither doing any work, nor is it making any progress, nor is it yielding control to something else.

## Asynchronous, blocking

If a synchronous computation performs serially, then an asynchronous expression will be evaluated in parallel. So while your main program flow carries on, your async computation also runs at the same time. This happens, of course, due to both multi-processor systems - which allow us to perform multiple computations at literally the same time - or because of smart process scheduling - which moves so fast that it gives us the impression of multiple things happening simultaneously. In Scala, an asynchronous computation is called a Future, and it can be evaluated on another thread.

```scala
def asyncBlockingFunction(arg: Int): Future[Int] = Future {
    Thread.sleep(10000)
    arg + 42
}
```

In this case, when we call this method

```scala
asyncBlockingFunction(3)
val theMeaningOfLife = 42
```

The value after the call evaluates immediately, because the actual computation of the async method will run in parallel, on another thread. This is asynchronous. However, it's also blocking because, although you're not blocking the main flow of the program, you're still blocking some thread at (or close to) the moment you're calling the method. It's like passing the burning coal from your hand to someone else.

The blocking aspect comes from the fact that these kinds of computations need to be constantly monitored for completion. It's like you spawn an annoying parrot, saying:

"Are you done?"
"Are you done?"
"Are you done?"
"Are you done?"
"How about now?"

so that when you are indeed done, the parrot will say "roger that" and will fly back to you (the calling thread) to deliver the result.

## Asynchronous, non-blocking

The true non-blocking power comes from actions that do not block either you (the calling thread) or someone else (some secondary thread). Best exemplified with an Akka actor. An actor, unlike what you may have read from the webs, is not something active. It's just a data structure. The power of Akka comes from the fact that you can create a huge amount of actors (millions per GB of heap), so that a small number of threads can operate on them in a smart way, via scheduling.

```scala
def createSimpleActor() = Behaviors.receiveMessage[String] { someMessage =>
    println(s"Received something: $someMessage")
    Behaviors.same
}
```

Here I'm using the Akka Typed API. The short story is that the above describes what an actor will do: given a message of type String, it will print something out, and the actor will resume to its same behavior. The API is a bit obscure, and I might talk about it another time. If we create an actor:

```scala
val rootActor = ActorSystem(createSimpleActor(), "TestSystem") // guardian actor that will create an entire hierarchy
rootActor ! "Message in a bottle"
```

Then calling the tell method (!) on the actor is completely asynchronous _and non-blocking_. Why non-blocking? Because this doesn't block the calling thread - the tell method returns immediately - and also because it doesn't spawn (or block) any other thread. Because Akka has an internal thread scheduler, it will be some point in the future when a thread will be scheduled to dequeue this message out of the actor's mailbox and process it for me.

Asynchronous, non-blocking computation is what you want.

However, even in this example we have a drawback: we aren't returning any meaningful value out of the interaction. To solve that, we could return a Future which the actor might complete manually. Check out the <a href="https://rockthejvm.com/blog/conttrollable-futures">controllable Futures article</a> for details into the reasoning.

```scala
  val promiseResolver = ActorSystem(
    Behaviors.receiveMessage[(String, Promise[Int])] {
      case (message, promise) =>
        // do some computation
        promise.success(message.length)
        Behaviors.same
    },
    "promiseResolver"
  )
```

This actor will complete a promise when it receives a message. On the other end - in the calling thread - we could process this promise when it's complete. Let's define some sensible API that would wrap this asynchronous, non-blocking interaction:

```scala
def doAsyncNonBlockingThing(arg: String): Future[Int] = {
    val aPromise = Promise[Int]()
    promiseResolver ! (arg, aPromise)
    aPromise.future
}
```

Here's how we could use it:

```scala
val asyncNonBlockingResult = doAsyncNonBlockingThing("Some message")
asyncNonBlockingResult.onComplete(value => s"I've got a non-blocking async answer: $value")
```

In this way, neither the calling thread, nor some other thread is immediately used by the call, and we still return meaningful values from the interaction, which we can register a callback on when complete. For some reason, the ask pattern in Akka Typed is very convoluted, but on that, another time.
