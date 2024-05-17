---
title: "ZIO: Introduction to Fibers"
date: 2021-06-24
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [zio]
excerpt: "Many libraries implement the effect pattern in the Scala ecosystem, and every one has its own concurrency model. First, let's introduce the ZIO library and its implementation of the fiber model."
---

_Another great round by [Riccardo Cardin](https://github.com/rcardin), a proud student of the [Scala with Cats course](https://rockthejvm.com/p/cats). Riccardo is a senior developer, a teacher and a passionate technical blogger, and now he's neck deep into ZIO._

_Enter Riccardo:_

Many libraries implement the effect pattern in the Scala ecosystem: Cats Effect, Monix, and ZIO, just to list some. Each of these implements its own concurrency model. For example. Cats Effect and ZIO both rely on _fibers_. In the articles [Cats Effect 3 - Introduction to Fibers](https://blog.rockthejvm.com/cats-effect-fibers/) and [Cats Effect 3 - Racing IOs](https://blog.rockthejvm.com/cats-effect-racing-fibers/), we introduced the fiber model adopted by the Cats Effect library. Now, it's time to analyze the ZIO library and its implementation of the fiber model.

## 1. Background and Setup

We live in a beautiful world where Scala 3 is the actual major release of our loved programming language. Scala 3 and Scala 2.13 will both work with no changes to the code here. Moreover, we will need the dependency from the ZIO library:

```scala
libraryDependencies += "dev.zio" %% "zio" % "1.0.9"
```

Nothing else will be required.

## 2. The Effect Pattern

Before talking about ZIO fibers, we need to have the notion of the _Effect Pattern_. The main objective of any effect library is to deal with statements that can lead to side effects. The _substitution model_ is the fundamental building block of functional programming. Unfortunately, **it doesn't work with code that produces side effects because we cannot substitute functions with their results**. Such functions are often called _impure_:

```scala
// The type of println is String => Unit. The program prints the given String to the console
val result = println("The meaning of life is 42")
// Using the substitution model, we try to substitute the result of the println execution to the variable
val result: Unit = ()
//...however, after the substitution, the meaning of the program completely changed
```

So, we need a model like the Effect Pattern. The pattern aims to model side effects with the concept of "effect". **An effect is a blueprint of statements that can produce a side effect, not the result itself**. So, when we instantiate an effect with some statements, we don't execute anything: We are just describing what the code inside the effect will perform once executed:

```scala
// This code doesn't print anything to the console. It's just a blueprint
val result = ZIO.succeed(println("The meaning of life is 42"))
```

The above code doesn't print anything to the console; it just describes what we want to achieve with the code, not how we execute it.

Moreover, the Effect Pattern adds two more conditions to the whole story:

1. The type of the effect must describe a) the kind of computation it executes, b) the value it contains or produces (usually via a generic type argument).
2. The use of the effect must separate the description of the side effect (the blueprint) from its execution.

The first condition allows us to trace the impure code in our program. One of the main problems with side effects is that they are hidden in the code. Instead, the second condition allows us to use the substitution model until we need to run the effect. We call such a point "the end of the world", and we merely identify it with the `main` method.

## 3. ZIO Effect

The ZIO library is one of the implementations of the effect pattern available in Scala. Its primary effect type is `ZIO[R, E, A]`. We call the `R` type the _environment type_, representing the dependencies the effect needs to execute. Once executed, the effect can produce a result of type `A` or fail, producing a value of the type `E`. For these reasons, it's common to think about the type`ZIO[R, E, A]` as an _effectful_ version of the function type `R => Either[E, A]`, i.e. the evaluation of a `ZIO` might produce a side effect.

**The default model of execution of the `ZIO` effect is synchronous**. To start showing some code, let's model some scenarios. So, we will model the wake-up routine of Bob. Every morning, Bob wakes up, goes to the bathroom, then boils some water to finally prepare a cup of coffee:

```scala
val bathTime = ZIO.succeed("Going to the bathroom")
val boilingWater = ZIO.succeed("Boiling some water")
val preparingCoffee = ZIO.succeed("Preparing the coffee")
```

As the three effects cannot fail, we use the smart constructor `ZIO.succeed`. Moreover, to help us debug the execution thread of each effect, we define the following function:

```scala
def printThread = s"[${Thread.currentThread().getName}]"
```

With these bullets in our functional gun, we can compose the above effects and execute them:

```scala
import zio._

object FibersTutorial extends zio.App {

  def printThread = s"[${Thread.currentThread().getName}]"

  val bathTime = ZIO.succeed("Going to the bathroom")
  val boilingWater = ZIO.succeed("Boiling some water")
  val preparingCoffee = ZIO.succeed("Preparing the coffee")

  def sequentialWakeUpRoutine(): ZIO[Any, Nothing, Unit] = for {
    _ <- bathTime.debug(printThread)
    _ <- boilingWater.debug(printThread)
    _ <- preparingCoffee.debug(printThread)
  } yield ()

  override def run(args: List[String]): URIO[zio.ZEnv, ExitCode] =
    sequentialWakeUpRoutine().exitCode
}
```

As we expected, the execution of the `run` show us that ZIO executes all of the effects in the same thread sequentially:

```shell
[zio-default-async-1]: Going to bath
[zio-default-async-1]: Boiling some water
[zio-default-async-1]: Preparing the coffee
```

## 4. Fibers

If we want to leverage all the power of ZIO and starting to execute effects asynchronously, we must
introduce the `Fiber` type.

A _fiber_ is a concept that is beyond the ZIO library. In fact, it's a concurrency model. Often, we refer to fibers as _green threads_. **A fiber is a schedulable computation**, much like a thread. However, it's only a data structure, which means **it's up to the ZIO runtime to schedule these fibers for execution** (on the internal JVM thread pool). Unlike a system/JVM thread which is expensive to start and stop, fibers are cheap to allocate and remove. Hence, we can create millions of fibers and switch between them without the overheads associated with threads.

The ZIO library represents fibers using the type `Fiber[E, A]`, which means a computation that will produce a result of type `A` or will fail with the type `E`. Moreover, ZIO executes fibers using an `Executor`, which is a sort of abstraction over a thread pool.

### 5. Create a New Fiber

To create a new fiber in ZIO, we must _fork_ it from an instance of the `ZIO` effect:

```scala
// From ZIO library
trait ZIO[-R, +E, +A] {
  def fork: URIO[R, Fiber[E, A]]
}
```

As we can see, the `ZIO.fork` method returns a new effect `URIO[R, Fiber[E, A]]`. The `URIO[R, A]` type is a simple type alias for the type `ZIO[R, Nothing, A]` representing an effect that requires an `R`, and cannot fail, but will succeed with a value of type `A`. In the `fork` method, the effect will succeed with a `Fiber[E, A]`.

Returning to our example, let's imagine that Bob can boil the water for the coffee and going to the bathroom concurrently. We can fork the `bathTime` effect to make it execute on a different thread than the effect `boilingWater`:

```scala
def concurrentBathroomTimeAndBoilingWater(): ZIO[Any, Nothing, Unit] = for {
  _ <- bathTime.debug(printThread).fork
  _ <- boilingWater.debug(printThread)
} yield ()
```

For the sake of simplicity, we forget about the preparation of the coffee for now. Once executed, the above method prints the following information:

```shell
[zio-default-async-2]: Going to the bathroom
[zio-default-async-1]: Boiling some water
```

As we expect, ZIO executed the two effects concurrently on different threads. Just to remember, concurrently running a set of tasks means that the order in which the runtime performs them is undefined.

### 6. Synchronizing with a Fiber

The astute reader should have noticed that boiling the water without preparing a good coffee is non-sense. However, Bob can't prepare the coffee without the boiled water. Moreover, Bob can't prepare the coffee if he's still in the bathroom. So, we need to synchronize the action of preparing coffee to the results of the previous two activities.

ZIO fibers provide the `join` method to wait for the termination of a fiber:

```scala
// From ZIO library
trait Fiber[+E, +A] {
  def join: IO[E, A]
}
```

Through the `join` method, we can wait for the result of concurrent computation and eventually use it:

```scala
def concurrentWakeUpRoutine(): ZIO[Any, Nothing, Unit] = for {
  bathFiber <- bathTime.debug(printThread).fork
  boilingFiber <- boilingWater.debug(printThread).fork
  zippedFiber = bathFiber.zip(boilingFiber)
  result <- zippedFiber.join.debug(printThread)
  _ <- ZIO.succeed(s"$result...done").debug(printThread) *> preparingCoffee.debug(printThread)
} yield ()
```

However, in our example, we need to wait for the completion of two concurrent fibers. So, we need to combine them first and then join the resulting fiber. Thus, the `zip` method combines two fibers into a single fiber that produces both results.

Joining a fiber lets us also gather the result of its execution. In the example, the variable `result` has type `(String, String)`, and we successfully use it in the next step of the routine. We also introduced the `*>` operator, which is an alias for the `zipRight` function, and let us concatenate the execution of two effects not depending on each other.

The execution of the `concurrentWakeUpRoutine` function prints precisely what we expect:

```shell
[zio-default-async-2]: Going to the bathroom
[zio-default-async-3]: Boiling some water
[zio-default-async-6]: (Going to the bathroom,Boiling some water)
[zio-default-async-6]: (Going to the bathroom,Boiling some water)...done
[zio-default-async-6]: Preparing the coffee
```

Bob uses the fiber to go to the bathroom, and the fiber that boils the water runs concurrently on different threads. Then, ZIO executes the fiber used to prepare the coffee in a new thread only after the previous fibers succeeded.

However, this code is not using systems threads directly for concurrent computation. In fact, the ZIO runtime is smart to free up threads when they're not active, so **ZIO fibers don't block any thread during the waiting** associated with the call of the `join` method. Just remember that a `Fiber` represents only a data structure, a blueprint of computation, and not the computation itself.

### 7. Interrupting a Fiber

The last main feature on fibers that the ZIO library provides is interrupting the execution of a fiber. Why should we interrupt a fiber? The main reason is that some action external to the fiber execution turns the fiber useless. So, to not waste system resources, it's better to interrupt the fiber.

Imagine that, while Bob is taking a bath, and the water is waiting to boil, Alice calls him to breakfast in a Cafe. But, then, Bob doesn't need the water anymore. So, we should interrupt the associated fiber.

In ZIO, we can interrupt a `Fiber` using the `interrupt` function:

```scala
// From ZIO library
trait Fiber[+E, +A] {
  def interrupt: UIO[Exit[E, A]]
}
```

As we can see, the interruption of fiber results in an effect that always succeeds (`UIO[A]` is just a type alias for `ZIO[Any, Nothing, A]`) with an `Exit` value. If the fiber already succeeded with its value when interrupted, then ZIO returns an instance of `Exit.Success[A]`, an `Exit.Failure[Cause.Interrupt]` otherwise.

So, without further ado, let's model the calling of Alice with an effect:

```scala
val aliceCalling = ZIO.succeed("Alice's call")
```

Then, we want to add some delay to the effect associated with the boiling water. So we use the ZIO primitive `ZIO.sleep` to create an effect that waits for a while:

```scala
import zio.duration._ // 5.seconds is not the Scala standard duration

val boilingWaterWithSleep =
  boilingWater.debug(printThread) *>
    ZIO.sleep(5.seconds) *>
    ZIO.succeed("Boiled water ready")
```

Finally, we put together all the pieces, and model the whole use case:

```scala
import zio.clock._

def concurrentWakeUpRoutineWithAliceCall(): ZIO[Clock, Nothing, Unit] = for {
  _ <- bathTime.debug(printThread)
  boilingFiber <- boilingWaterWithSleep.fork
  _ <- aliceCalling.debug(printThread).fork *> boilingFiber.interrupt.debug(printThread)
  _ <- ZIO.succeed("Going to the Cafe with Alice").debug(printThread)
} yield ()
```

As we can see, after Alice's call, we interrupt the `boilingFiber` fiber. The result of executing
the `concurrentWakeUpRoutineWithAliceCall` method is the following:

```ssh
[zio-default-async-1]: Going to the bathroom
[zio-default-async-2]: Boiling some water
[zio-default-async-3]: Alice's call
[zio-default-async-5]: Failure(Traced(Interrupt(Id(1624109234226,1))... // Ommitted
[zio-default-async-5]: Going to the Cafe with Alice
```

After Alice's call, the fiber executing on thread `zio-default-async-2` was interrupted, and the console never printed the string `Boiled water ready`. Since the fiber was still running when interrupted, its value was a `Failure`, specifying in a huge object the cause of failure.

**Unlike interrupting a thread, interrupting a fiber is an easy operation**. In fact, the creation of a new `Fiber` is very lightweight. It doesn't require the creation of complex structures in memory, as for threads. Interrupting a fiber simply tells the `Executor` that the fiber must not be scheduled anymore.

Finally, unlike threads, **we can attach _finalizers_ to a fiber**. A finalizer will close all the resources used by the effect. The ZIO library guarantees that if an effect begins execution, its finalizers will always be run, whether the effect succeeds with a value, fails with an error, or is interrupted.

Last but not least, we can declare a fiber as `uninterruptible`. As the name suggests, an uninterruptible fiber will execute till the end even if it receives an interrupt signal.

Returning to Bob, imagine that Alice calls him when he's already preparing the coffee after the water boiled. Probably, Bob will decline Alice's invitation and will make breakfast at home. Let's model such a scenario. But, first, we add some delay to the action of preparing coffee:

```scala
val preparingCoffeeWithSleep =
  preparingCoffee.debug(printThread) *>
    ZIO.sleep(5.seconds) *>
    ZIO.succeed("Coffee ready")
```

Then, we model Alice's call during coffee preparation:

```scala
def concurrentWakeUpRoutineWithAliceCallingUsTooLate(): ZIO[Clock, Nothing, Unit] = for {
  _ <- bathTime.debug(printThread)
  _ <- boilingWater.debug(printThread)
  coffeeFiber <- preparingCoffeeWithSleep.debug(printThread).fork.uninterruptible
  result <- aliceCalling.debug(printThread).fork *> coffeeFiber.interrupt.debug(printThread)
  _ <- result match {
    case Exit.Success(value) => ZIO.succeed("Making breakfast at home").debug(printThread)
    case _ => ZIO.succeed("Going to the Cafe with Alice").debug(printThread)
  }
} yield ()
```

As we said, marking as `uninterruptible` the fiber `coffeeFiber` makes it unstoppable. The call of
the `interrupt` method on it doesn't do anything, and the above code will have the following output:

```shell
[zio-default-async-1]: Going to the bathroom
[zio-default-async-1]: Boiling some water
[zio-default-async-2]: Preparing the coffee
[zio-default-async-3]: Alice's call
[zio-default-async-4]: Coffee ready
[zio-default-async-5]: Success(Coffee ready)
[zio-default-async-5]: Making breakfast at home
```

Bob will make breakfast at home, no matter Alice's call. Sorry, Alice, maybe next time.

## 8. Conclusions

In the article, we briefly introduced the concept of effect and how ZIO uses it to implement concurrent execution through fibers. Then, using a simple example, we showed how to use the three primary operations available on fibers: fork, join, and interrupt.

Moreover, fibers are the actual brick of concurrency programming in ZIO. A lot of concepts are built upon them, implementing richer and more complex use cases.
