---
title: "Cats Effect 3 - Racing IOs"
date: 2021-04-29
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [cats effect]
excerpt: "After the previous introduction to concurrency in Cats Effect, we'll look at how to manage racing IOs and fibers."
---

Like the previous article, this one requires you to be comfortable writing Scala (I'll write Scala 3), but with otherwise I'll assume you're just getting started with Cats Effect, along the lines of "I've spent <30 minutes on their main documentation website".

## 1. Background

There's no big setup needed. I'll be writing Scala 3, although you can also write Scala 2 with the minor change of using an `implicit class` instead of an [extension method](/scala-3-extension-methods). If you want to test this code in your own project, add the following to your `build.sbt` file:

```scala3
libraryDependencies += "org.typelevel" %% "cats-effect" % "3.1.0"
```

Nothing else will otherwise be required in terms of setup.

In terms of understanding, I highly recommend checking out the [previous article](/cats-effect-fibers) because we'll be building on the ideas we discussed there. Here's the gist:

* Cats Effect has this general IO type which represents any computation that might have side effects.
* Fibers are the abstraction of a lightweight thread - IOs use them for massive parallelism on an otherwise small thread pool.
* Fibers can be started, joined and cancelled.

Also in the previous article, we wrote an extension method for IOs, so that we can see their running thread. I'll attach it here:

```scala3
extension [A] (io: IO[A]) {
  def debug: IO[A] = io.map { value =>
    println(s"[${Thread.currentThread().getName}] $value")
    value
  }
}
```

## 2. Racing

Once we can evaluate IOs on another thread, the immediate next question is how we can manage their lifecycle:

- how we can start them, wait for them and inspect their results (did that in the previous article)
- how we can trigger many at the same time and determine the relationship between them (this article)
- how we can coordinate between many IOs running concurrently (some future, harder article)

In this article, we'll focus on a part of the second bullet - racing.

Racing means two computations run at the same time and reach some sort of common target: modifying a variable, computing a result, etc. In our case, we're interested in the IO which finishes first.

Let's consider two IOs:

- one tries to compute a result: we'll simulate that with a sleep
- one triggers a timeout

```scala3
val valuableIO: IO[Int] =
    IO("task: starting").debug *>
    IO.sleep(1.second) *>
    IO("task: completed").debug *>
    IO(42)

val vIO: IO[Int] = valuableIO.onCancel(IO("task: cancelled").debug.void)

val timeout: IO[Unit] =
    IO("timeout: starting").debug *>
    IO.sleep(500.millis) *>
    IO("timeout: DING DING").debug.void
```

(as a reminder, the `*>` operator is a sequencing operator for IOs, in the style of `flatMap`: in fact, it's implemented with `flatMap`)

We can race these two IOs (started on different fibers) and get the result of the first one that finishes (the winner). The loser IO's fiber is cancelled. Therefore, the returned value of a race must be an Either holding the result of the first or second IO, depending (of course) which one wins.

```scala3

def testRace() = {
  val first = IO.race(vIO, timeout)

  first.flatMap {
    case Left(v) => IO(s"task won: $v")
    case Right(_) => IO("timeout won")
  }
}
```

A possible output might look like this:

```
[io-compute-10] timeout: starting
[io-compute-6] task: starting
[io-compute-5] timeout: DING DING
[io-compute-4] task: cancelled
[io-compute-4] timeout won
```

Notice how the task IO (which is taking longer) is being cancelled. The output "task: cancelled" was shown due to the `.onCancel` callback attached to `valuableIO`. It's always good practice to have these calls for IOs handling resources, because in the case of cancellation, those resources might leak. There are many tools for handling resources, such as manually adding `.onCancel` to your IOs, using the `bracket` pattern or using the standalone `Resource` type in Cats Effect &mdash; I'll talk about all of them in detail in the upcoming Cats Effect course, which is better and when you should use each.

## 3. Timeout

It's a common pattern to start an IO, then in parallel start a timeout IO which cancels the task if the time elapsed. The pattern is so common, that the Cats Effect library offers a dedicated method for it: `timeout`.

```scala3
val testTimeout: IO[Int] = vIO.timeout(500.millis)
```

This IO will run in the following way:

- The original IO will be started asynchronously on its own fiber.
- The timer will also be started on another fiber.
- When the time runs out, the timeout fiber will cancel the original fiber and the whole result will raise an exception.
- If the original task completes before the timeout, the timeout fiber is cancelled and the result IO will contain the result of the task.

## 4. More Control Over Races

Cats Effect offers a much more powerful IO combinator, called `racePair`.

- Like `race`, `racePair` starts two IOs on separate fibers.
- Unlike `race`, `racePair` does not cancel the losing IO.
- The result of `racePair` is a tuple containing result of the winner (as an `Outcome`) and the _fiber_ of the loser, for more control over the fiber.

Because either IO can win, the result type is a bit more complex. Instead of an `Either[A, B]` in the case of `race`, here we have

- a tuple of `(OutcomeIO[A], FiberIO[B])` if the first IO wins
- a tuple of `(FiberIO[A], OutcomeIO[B])` if the second IO wins

Therefore, the result type is an Either with each: `Either[(OutcomeIO[A], FiberIO[B]), (FiberIO[A, OutcomeIO[B])]`.

An example:

```scala3
def demoRacePair[A](iox: IO[A], ioy: IO[A]) = {
  val pair = IO.racePair(iox, ioy)
  // ^^ IO[Either[(OutcomeIO[A], FiberIO[B]), (FiberIO[A], OutcomeIO[B])]]
  pair.flatMap {
    case Left((outA, fibB)) => fibB.cancel *> IO("first won").debug *> IO(outA).debug
    case Right((fibA, outB)) => fibA.cancel *> IO("second won").debug *> IO(outB).debug
  }
}
```

This snippet has similar mechanics to `race`: the loser's fiber is cancelled and the winner's result is surfaced. However, the power of `racePair` is in the flexibility it provides by handing you the losing fiber so you can manipulate it as you see fit: maybe you want to wait for the loser too, maybe you want to give the loser one more second to finish, there's a variety of options.

Here's an example of how we can demonstrate a `racePair`:

```scala3
val iox = IO.sleep(1.second).as(1).onCancel(IO("first cancelled").debug.void)
val ioy = IO.sleep(2.seconds).as(2).onCancel(IO("second cancelled").debug.void)

demoRacePair(iox, ioy) // inside an app
```

with some sample output:

```
[io-compute-4] second cancelled
[io-compute-4] first won
[io-compute-4] Succeeded(IO(1))
```

## 5. Conclusion

In this short beginner-friendly article, we learned how we can race IOs running concurrently, the timeout pattern and a more powerful version of racing that allows us to more flexibly process the results of the concurrent IOs.

Enjoy using Cats Effect!
