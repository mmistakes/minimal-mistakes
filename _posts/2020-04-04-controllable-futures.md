---
title: "Controllable Futures in Scala"
date: 2020-04-04
header:
  image: "/images/blog cover.jpg"
tags: [scala, async]
excerpt: "In this article we learn to address the problem of \"deterministic\" Futures in Scala, using Promises."
---
In this article I'm going to address the problem of "deterministic" Futures. You probably know by now that Futures are inherently non-deterministic, in the sense that if you create a Future

```scala
val myFuture = Future {
    // you have no future, you are DOOMED!
    42
    // JK.
}
```

you know the value inside will be evaluated on "some" thread, at "some" point in time, without your control.

## The scenario

Here I will speak to the following scenario which comes up in practice. Imagine you're designing an function of the following sort:

```scala
def gimmeMyPreciousValue(yourArg: Int): Future[String]
```

with the assumption that you're issuing a request to some multi-threaded service which is getting called all the time. Let's also assume that the service looks like this:

```scala
object MyService {
  def produceThePreciousValue(theArg: Int): String = "The meaning of your life is " + (theArg / 42)

  def submitTask[A](actualArg: A)(function: A => Unit): Boolean = {
    // send the function to be evaluated on some thread, at the discretion of the scheduling logic
    true
  }
}
```

So the service has two API methods:

    1) A "production" function which is completely deterministic.
    2) A submission function which has a pretty terrible API, because the function argument will be evaluated on one of the service's threads and you can't get the returned value back from another thread's call stack.

Let's assume this important service is also impossible to change, for various reasons (API breaks etc). In other words, the "production" logic is completely fixed and deterministic. However, what's not deterministic is _when_ the service will actually end up calling the production function. In other words, you can't implement your function as

```scala
def gimmeMyPreciousValue(yourArg: Int): Future[String] = Future {
  MyService.produceThePreciousValue(yourArg)
}
```

because spawning up the thread responsible for evaluating the production function is not up to you.

## The solution

Introducing Promises - a "controller" and "wrapper" over a Future. Here's how it works. You create a Promise, get its Future and use it (consume it) with the assumption it will be filled in later:

```scala
// create an empty promise
val myPromise = Promise[String]()
// extract its future
val myFuture = myPromise.future
// do your thing with the future, assuming it will be filled with a value at some point
val furtherProcessing = myFuture.map(_.toUpperCase())
```

Then pass that promise to someone else, perhaps an asynchronous service:

```scala
def asyncCall(promise: Promise[String]): Unit = {
    promise.success("Your value here, your majesty")
}
```

And at the moment the promise contains a value, its future will automatically be fulfilled with that value, which will unlock the consumer.

## How to use it

For our service scenario, here's how we would implement our function:

```scala
def gimmeMyPreciousValue(yourArg: Int): Future[String] = {
    // create promise now
    val thePromise = Promise[String]()

    // submit a task to be evaluated later, at the discretion of the service
    // note: if the service is not on the same JVM, you can pass a tuple with the arg and the promise so the service has access to both
    MyService.submit(yourArg) { x: Int =>
        val preciousValue = MyService.producePreciousValue(x)
        thePromise.success(preciousValue)
    }

    // return the future now, so it can be reused by whoever's consuming it
    thePromise.future
}
```

So we create a promise and then we return its future at the end, for whoever wants to consume it. In the middle, we submit a function which will be evaluated at some point, out of our control. At that moment, the service produces the value and fulfils the Promise, which will automatically fulfil the Future for the consumer.

This is how we can leverage the power of Promises to create "controllable" Futures, which we can fulfil at a moment of our choosing. The Promise class also has other methods, such as failure, trySuccess/tryFailure and more.

I hope this was useful!