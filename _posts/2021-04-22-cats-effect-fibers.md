---
title: "Cats Effect 3 - Introduction to Fibers"
date: 2021-04-22
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [cats effect]
excerpt: "A quick dive into asynchronous computations with fibers in Cats Effect 3, written for Scala 3."
---

Cats Effect 3 has just been launched, with a lot of exciting changes and simplifications. Some aspects have not changed, though, and for good reason. This article starts the exploration of one of them - fibers.

This article is for the comfortable Scala programmer, but with otherwise limited exposure to Cats Effect. If you've just browsed through the Cats Effect documentation page and at least heard about the IO monad for Scala &mdash; perhaps from the first few pieces of the "getting started" section &mdash; this article is for you.

## 1. Background and Setup

The code I'll show here is entirely written in Scala 3 &mdash; I'm a bit impatient and I'm using Scala 3 RC2, but the code is 100% compatible with the final Scala 3. If you want to test this code in your Scala 3 project, you'll need to add this library to your `build.sbt` file:

```scala3
libraryDependencies += "org.typelevel" %% "cats-effect" % "3.1.0"
```

Nothing else will otherwise be required.

## 2. Running Things on Other Threads

Cats Effect's core data structure is its main effect type, `IO`. `IO[A]` instances describe computations that (if finished) evaluate to a value of type A, and which can perform arbitrary side effects (e.g. printing things, acquiring/releasing resources, etc). IOs can take many shapes and sizes, but I'll use the simple ones for the async stuff I'll show you later:

```scala3
val meaningOfLife = IO(42)
val favLang = IO("Scala")
```

Also for ease of demonstrating asynchronicity, I'll decorate the IO type with an extension method which also prints the current thread and the value it's about to compute:

```scala3
extension [A] (io: IO[A])
  def debug: IO[A] = io.map { value =>
    println(s"[${Thread.currentThread().getName}] $value")
    value
  }
```

IO instances can run synchronously on the main thread, unless specified otherwise. For example, a simple application can look something like this:

```scala3
object AsynchronousIOs extends IOApp {
  val meaningOfLife: IO[Int] = IO(42)
  val favLang: IO[String] = IO("Scala")

  extension [A] (io: IO[A])
    def debug: IO[A] = io.map { value =>
      println(s"[${Thread.currentThread().getName}] $value")
      value
    }

  def sameThread() = for {
    _ <- meaningOfLife.debug
    _ <- favLang.debug
  } yield ()

  def run(args: List[String]): IO[ExitCode] =
    sameThread().as(ExitCode.Success)
}
```

If we run this application, we'll see these IOs disclosing their same thread:

```
[io-compute-11] 42
[io-compute-11] Scala
```

However, we can make IOs evaluate on other JVM threads, through a concept known as a Fiber.

Fibers are so-called "lightweight threads". They are a semantic abstraction similar to threads, but unlike threads (which can be spawned in the thousands per JVM on a normal multi-core machine), fibers can be spawned in the millions per GB of heap. Notice that we're measuring threads versus CPU cores and fibers versus GB of heap. That's because fibers are not active entities like threads, but rather passive data structures which contain IOs (themselves data structures). The Cats Effect scheduler takes care to schedule these IOs for execution on the (rather few) threads it manages.

With that secret out, let's look at the shape of a fiber:

```scala3
def createFiber: Fiber[IO, Throwable, String] = ???
```

A Fiber takes 3 type arguments: the "effect type", itself generic (usually IO), the type of error it might fail with and the type of result it might return if successful.

It's by no coincidence I'm implementing this method with `???` - fibers are almost impossible to create manually as a user. Fibers can be created through the `start` method of IOs, and the necessary data (e.g. thread scheduler) will be automatically passed as well:

```scala3
val aFiber: IO[Fiber[IO, Throwable, Int]] = meaningOfLife.debug.start
```

The `start` method should spawn a Fiber. But since creating the fiber itself &mdash; and running the IO on a separate thread &mdash; is an _effect_, the returned fiber is wrapped in another IO instance, which explains the rather convoluted type signature of this val.

We can see that the two IOs show different threads if we run this:

```scala3
  def differentThreads() = for {
    _ <- aFiber
    _ <- favLang.debug
  } yield ()
```

If we call this method from main (or `run`), we indeed see different threads:

```
[io-compute-1] 42
[io-compute-11] Scala
```

## 3. Gathering Results from Fibers

Much like we wait for a thread to join to make sure a variable was updated, and we `Await` a Future to compute a result, we also have the concept of joinin a Fiber, except in this case, it's all done in a purely functional way.

```scala3
  def runOnAnotherThread[A](io: IO[A]) = for {
    fib <- io.start
    result <- fib.join
  } yield result
```

Joining returns the result of the fiber, wrapped in an IO.

If we run this method in our main with our `meaningOfLife` IO instance, we'll get something very interesting:

```
[io-compute-7] Succeeded(IO(42))
```

Notice that the result of joining a fiber is not a value, but something that wraps an IO which wraps a value. In this case, it's a `Succeeded` instance, much like a `Success` case in running a Future. We get this kind of data (called an Outcome) after the fiber finishes.

## 4. The End States of a Fiber

A fiber can terminate in one of 3 states:

- successfully, with a value (wrapped in IO, see example above)
- as a failure, wrapping an exception
- cancelled, which is neither

Let's see how a fiber can fail with an exception:

```scala3
  def throwOnAnotherThread() = for {
    fib <- IO.raiseError[Int](new RuntimeException("no number for you!")).start
    result <- fib.join
  } yield result
```

Running this method in main as

```scala3
throwOnAnotherThread().debug.as(ExitCode.Success)
```

gives the following output:

```
[io-compute-11] Errored(java.lang.RuntimeException: no number for you!)
```

The `Errored` case is the second state the fiber might terminate with. Of course, we can then process that result further and investigate/recover from errors if need be.

The success/failure modes are not entirely new. Futures can finish with the same kind of results, albeit much more simply as `Try` instances. The new possible end state for a fiber is the _cancelled_ state. Fibers can be cancelled while they're running, in a purely functional way. Cancellation is a big thing in Cats Effect, and I'll talk more in depth about it, perhaps in a future article/video and definitely in the upcoming dedicated Cats Effect 3 course which I'm working on.

In any event, let me give an example of a cancelled fiber. Let's say we run an IO which takes at least 1 second to run, and halfway through (from another thread) we cancel it. The code might look something like this:

```scala3
  def testCancel() = {
    val task = IO("starting").debug *> IO.sleep(1.second) *> IO("done").debug

    for {
      fib <- task.start
      _ <- IO.sleep(500.millis) *> IO("cancelling").debug
      _ <- fib.cancel
      result <- fib.join
    } yield result
  }
```

The `*>` operator is the sequence operator on IOs. You can also use `>>` for the same effect &mdash; however, bear in mind `>>` uses the by-name argument passing, but that's a topic for another time.

The example above starts an IO on a fiber, and half the time later, I'm cancelling the fiber from the main thread, then wait for the fiber to terminate.

The result looks like this:

```
[io-compute-9] starting
[io-compute-0] cancelling // half a second later
[io-compute-0] Canceled() // the result of the fiber
```

## 5. To Be Continued

This was a beginner-friendly introduction to Cats Effect fibers and asynchronous IO execution. We've covered what fibers are and how they work, how we can start them, wait for them to finish, and how to obtain the different end states they might find themselves in.

In the next article & video we'll explore the kind of effects we can run in a purely functional way, on top of these concepts.
