---
title: "ZIO and the Fiber Model"
date: 2021-06-31 header:
image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

There are many libraries implementing the effect pattern in the Scala ecosystem: Cats Effect, Monix,
and ZIO just to list some. Every of these implements its own concurrency model. For example. Cats
Effect and ZIO both rely on _fibers_. In the
articles [Cats Effect 3 - Introduction to Fibers](https://blog.rockthejvm.com/cats-effect-fibers/)
and [Cats Effect 3 - Racing IOs](https://blog.rockthejvm.com/cats-effect-racing-fibers/), we
introduced the fiber model adopted by the Cats Effect library. Now, it's time to analyze the ZIO
libraries and its implementation of the fiber model.

## 1. Background and Setup

We live in a wonderful world, in which Scala 3 is the actual major release of our loved programming
language. So, we will use Scala 3 through the article. Moreover, we will need the dependency from
the ZIO library:

```sbt
libraryDependencies += "dev.zio" %% "zio" % "1.0.8"
```

Nothing else will be required.

## 2. The Effect Pattern

Before talking about ZIO fibers, we need to have the notion of the _Effect Pattern_. The main
objective of any effect library is to deal with statements that can lead to side effects. The
_substitution model_ is the fundamental building block of the functional programming. Unfortunately,
we cannot model side effects using the substitution model, because we cannot substitute functions
with their results, which may vary from information other than simple functions' inputs. Such
functions are often called _impure_:

// EXAMPLE

So, it comes the Effect Pattern. The pattern aims to model side effects with the concept of effect.
An effect is a blueprint of statements that can produce a side effect, not the result itself. When
we instantiate an effect with some statements, we don't execute anything: We are just describing
what the code inside the effect will perform once executed:

// EXAMPLE

The above code doesn't print anything to the console, it just describes what we want to achieve with
the code, not how we will execute it.

Moreover, the Effect Pattern add two more conditions to the whole story:

1. The type of the effect must describe the type returned by the effect once executed, and what kind
   of side effect it represents.
2. The use of the effect must separate the description of the side effect (the blueprint) from its
   execution.

The first condition allows us to trace the impure code in our program. One of the main problems with
side effects is that they are hidden in the code. Instead, the second condition allow us to use the
substitution model with the effect, until the point we need to run it. We call such a point "the end
of the world", and we merely identify it with the `main` method.

## 3. ZIO Effect

The ZIO library is one of the implementation of the effect pattern available in Scala. It's main
effect type is `ZIO[R, E, A]`. We call the `R` type the _environment type_, and it represents the
dependencies the effect need to execute. Once executed, the effect can produce a result of type `A`
or fail producing a value of the type `E`. For these reasons, it's common to think about the type
`ZIO[R, E, A]` as an _effectful_ version of the function type `R => Either[E, A]`.

The default model of execution of the `ZIO` effect is synchronous. To start showing some code, let's
model some useful scenario. So, we will model the wake-up routing of Bob. Every morning, Bob wakes
up, goes to the bathroom, then boils some water to finally prepare a cup of coffee:

```scala
val bathTime = ZIO.succeed("Going to the bathroom")
val boilingWater = ZIO.succeed("Boiling some water")
val preparingCoffee = ZIO.succeed("Preparing the coffee")
```

As the three effect cannot fail, we use the smart constructor `ZIO.succeed`. Moreover, to help us
debug the execution thread of each effect, we define the following function:

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

As we expected the execution of the `run` show us that ZIO executes sequentially all of the effects
in the same thread:

```shell
[zio-default-async-1]: Going to bath
[zio-default-async-1]: Boiling some water
[zio-default-async-1]: Preparing the coffee
```

## 4. Fibers

If we want to leverage all the power of ZIO and starting to execute effects asynchronously, we must
introduce the `Fiber` type.

A _fiber_ is a concept that is beyond the ZIO library. In fact, it's a concurrency model. Often, we
refer to fibers as _green threads_. Like a thread, a fiber represents the blueprint of a running
computation that may not have started yet. However, it's only a data type, which means it doesn't
map on any operating system or JVM concept. So it's instantiation is very lightweight with respect
to a system thread. Hence, we can create millions of fibers, and switching between them without the
overheads associated with threads.

The ZIO library represents fibers using the type `Fiber[E, A]`, which means a computation that will
produce a result of type `A` or will fail with the type `E`. Moreover, ZIO executes fibers using an
`Executor`, which is a sort of abstraction over a thread pool.

### 4.1. Create a New Fiber

To create a new fiber in ZIO, we must _fork_ it from an instance of the `ZIO` effect:

```scala
// From ZIO library
trait ZIO[-R, +E, +A] {
  def fork: URIO[R, Fiber[E, A]]
}
```

As we can see, the `ZIO.fork` method returns a new effect `URIO[R, Fiber[E, A]]`, which is a simple
type alias for the type `ZIO[R, Nothing, Fiber[E, A]]` representing an effect that requires an `R`,
and cannot fail, but can succeed with a `Fiber[E, A]`.

Returning to our example, let's imagine that Bob can boil the water for the coffee and going to the
bathroom concurrently. We can fork the `bathTime` effect to make it executing on a different thread
than the effect `boilingWater`:

```scala
def concurrentBathroomTimeAndBoilingWater(): ZIO[Any, Nothing, Unit] = for {
  _ <- bathTime.debug(printThread).fork
  _ <- boilingWater.debug(printThread)
} yield ()
```

For sake of simplicity, we forget about the preparation of the coffee for now. Once executed, the
above method prints the following information:

```shell
[zio-default-async-2]: Going to the bathroom
[zio-default-async-1]: Boiling some water
```

As we expect, ZIO executed the two effect concurrently on different thread. Just to remember,
executing concurrently a set of tasks means that the order in which the runtime executes the tasks
is not relevant.

### 4.2. Synchronizing with a Fiber

The astute reader should have noticed that boiling the water without preparing a good coffee is
non-sense. However, Bob can't prepare the coffee without the boiled water. Moreover, Bon can't
prepare the coffee if he's still in the bathroom. So, we need to synchronize the action of preparing
coffee to the results of the previous two actions.

ZIO fibers provide the `join` method to wait the termination of a fiber:

```scala
// From ZIO library
trait Fiber[+E, +A] {
  def join: IO[E, A]
}
```

Through the `join` method, we can wait for the result of a concurrent computation and eventually use
the result of such computation:

```scala
def concurrentWakeUpRoutine(): ZIO[Any, Nothing, Unit] = for {
  bathFiber <- bathTime.debug(printThread).fork
  boilingFiber <- boilingWater.debug(printThread).fork
  zippedFiber = bathFiber.zip(boilingFiber)
  _ <- zippedFiber.join.debug(printThread)
  _ <- preparingCoffee.debug(printThread)
} yield ()
```

However, in our example, we need to wait for the completion of two concurrent fibers. So, we need to
combine them first, and then joining the resulting fiber. The `zip` method combines two fibers into 
a single fiber that produces the results of both.

The execution of the `concurrentWakeUpRoutine` function prints exactly what we expect:

```shell
[zio-default-async-2]: Going to the bathroom
[zio-default-async-3]: Boiling some water
[zio-default-async-6]: (Going to the bathroom,Boiling some water)
[zio-default-async-6]: Preparing the coffee
```
