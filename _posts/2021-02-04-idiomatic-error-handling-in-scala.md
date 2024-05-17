---
title: "Idiomatic Error Handling in Scala"
date: 2021-02-04
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala]
excerpt: "Error handling is likely one of the most frustrating part of programming, and in Scala, there are better and worse ways to do it. Let's take a look."
---

This article will show you various ways of dealing with errors in Scala. Some are easy and beginner-friendly, and some are more complex, but more powerful. Let's take a look.

## 1. Throwing and Catching Exceptions

Short story: Scala runs on the JVM, so it can throw and catch exceptions just like Java. There's little more to say. This leads to the first straightforward way of dealing with errors.

Because Scala can throw and catch exceptions, naturally the try/catch/finally structure exists in Scala at the language level. Much like in Java, you can wrap potentially dangerous code inside a `try` block, then `catch` the particular exceptions you're interested in, then `finally` _do_ some other stuff, e.g. close resources. An example looks like this:

```scala
val magicChar = try {
  val scala: String = "Scala"
  scala.charAt(20) // throws out of bounds exception
} catch {
  case e: NullPointerException => 'z'
  case r: RuntimeException => 'z'
} finally {
  // close a file or some other resource
}
```

This try/catch structure is an expression, just like anything else in Scala, and returns `'z'` in this case. The fact that this structure is an expression is already an advantage (compared to Java), because this expression reduces to a value, and so you can more easily understand what's happening in your code when you use the `magicChar` value you defined above.

However, this straightforward approach is rarely the recommended one, for a few big reasons:

- the structure is cumbersome and hard to read, particularly if the attempted code or the exception-handling code becomes big
- nesting such structures (even at level 2) become exponentially harder to debug and understand
- for pure functional programmers, the `finally` part doing things outside of value computations might cause a small aneurysm

## 2. Let's `Try` Better

Idiomatic functional programming requires us to reason with code by thinking of every piece as an expression, hence something that reduces to a value. Therefore, we need to think exception handling in much the same way: as an expression meaning a crashed computation, or a successful one.

Enter Try:

```scala
sealed abstract class Try[+T]
case class Success[+T](value: T) extends Try[T]
case class Failure(reason: Throwable) extends Try[Nothing]
```

By this definition, a computation that succeeded (and returned a value) will be wrapped in a value of type `Success`, and a crashed computation will also be a proper value of type `Failure`. Now being values instead of actual JVM crashes, we can choose what we want to do with the information we have, because crashing is also information.

The `Try` type comes with a companion object with a handy `apply` method which takes a [by-name](/3-tricks-for-CBN/) argument. It looks something like this:

```scala
object Try {
  def apply[T](computation: => T): Try[T] = ...
}
```

This would allow us to write

```scala
val potentiallyHarmful = Try {
  val scala = "Scala"
  scala.charAt(20)
}
```

But notice we used `Try` (with capital T), meaning we called the `apply` method of the `Try` object. The returned value is of type `Try[Char]`, which in this case will be a `Failure[StringIndexOutOfBoundsException]`.

Why is this approach better? For several reasons:

- `Try` deals with the computation (and not the exception), so we can focus more on what we want (the values), instead of what we don't want. Exception handling can be done outside the computation, which frees mental (and screen) space.
- `Try` has the `map`, `flatMap` and `filter` methods, much like regular collections. We can think of `Try` as a "collection" with maybe one value. For this reason, composing multiple potentially harmful computations is now easy, because we can chain them with `flatMap`. And for-comprehensions.
- `Try` also has convenient APIs for recovering and combining with other values.
- `Try` instances can be pattern-matched, which is a huge bonus for both value- and error-handling in the same place.

Some examples:

```scala
val aSuccessfulComputation = Try(22) // Success(22)
val aModifiedComputation = aSuccessfulComputation.map(_ + 1) // Success(23)
val badMath = (x: Int) => Try(x / 0) // Int => Try[Int]

val aFailedComputation = aSuccessfulComputation.flatMap(badMath) // Failure(ArithmeticException)
val aRecoveredComputation = aFailedComputation.recover {
  case _: ArithmeticException => -1
}  // Success(-1)

val aChainedComputation = for {
  x <- aSuccessfulComputation
  y <- aRecoveredComputation
} yield x + y // Success(21)
```
If you're just starting to use Scala, use Try until you never have to try/catch again. Then go to the next step.

## 3. `Either` This or That

`Try` is based on the assumption that an exception is also a valid data structure. Fundamentally, an error in an application is also valuable information. Therefore, we should treat it as such, by manipulating this information into something useful. In this way, we reduce the notion of "error" to a value.

We can expand on this concept by thinking that an "error", imagined in this way, can have any type. This has historically been the case; before "exceptions", there were error codes (as strings). Before error codes, there were error numbers. So an "error" can be whatever is valuable for you to handle.

With this freeing concept in mind, we can then start to think about other data structures that are useful for error handling. One example is `Either`. `Either` is an instance which can be one of two cases: a "left" wrapper of a value, or a "right" wrapper of a value of a (maybe) different type. It looks something like this:

```scala
sealed abstract class Either[+A, +B]
case class Left[+A, +B](value: A) extends Either[A,B]
case class Right[+A, +B](value: B) extends Either[A,B]
```

Notice how Either is very similar to Try, but Try is particularly focused on successes (containing a value of any kind) or failures (strictly containing Throwables). Either can also be thought of in this way: it's either an "undesired" Left value (of any type) or a "desired" Right value (of any type). Imagined in this way, Either is a conceptual expansion of Try, because in this case, a "failure" can have a type convenient for you

When used properly, `Either` has the same benefits as `Try`:

- Because the `Right` is "desirable", you can focus on the computation (and not the exception), thus freeing from the try/catch defensiveness.
- `Either` has the same `map`, `flatMap` and `filter` which work for the `Right` cases, leaving the `Left` intact.
- `Either` has convenient methods for processing both the left and the right cases of it, plus conversion to other types e.g. `Try` or `Option`.
- `Either` instances can be pattern-matched, which gives you the option to handle both "desired" and "undesired" information in the same place.

Besides that, `Either` has the liberating benefit of creating and handling any type you'd like as an "error". You might want to consider Strings as errors. Maybe numbers, maybe Throwables, maybe `Person` instances that you can then blame. There's no need to stick to the JVM notion of an "error" anymore.

Some examples:

```scala
// good practice to add type aliases to understand what the "left" means
type MyError = String

val aSuccessfulComputation: Either[MyError, Int] = Right(22)
val aModifiedComputation = aSuccessfulComputation.map(_ + 1) // Right(23)
val badMath = (x: Int) => if (x == 0) Left("Can't divide by 0") else Right(45 / x)

val aFailedComputation = Right(0).flatMap(badMath) // Left("Can't divide by 0")
val aRecoveredComputation = aFailedComputation.orElse(Right(-1)) // Right(-1)

val aChainedComputation = for {
  x <- aSuccessfulComputation
  y <- aRecoveredComputation
} yield x + y // Right(21)
```

## 4. Advanced: `Validated`

There are many data structures in various libraries with certain set goals in mind. One of the popular ones is `Validated`, which is part of the Cats library. By the way, I [teach](https://rockthejvm.com/p/cats) this here at Rock the JVM.

Besides doing pretty much everything that Either does, Validated allows us to _accumulate_ errors. One obvious use case is online forms that have to meet certain criteria. If a user fails those conditions, the form should ideally show the user _all the places_ in which they filled wrong, not just a single error.

For this section, you'll need to add the Cats library to your `build.sbt`:

```scala
libraryDependencies += "org.typelevel" %% "cats-core" % "2.2.0"
```

Validated instances can be created in much the same way as Either. Here are some examples:

```scala
import cats.data.Validated
val aValidValue: Validated[String, Int] = Validated.valid(42) // "right" value
val anInvalidValue: Validated[String, Int] = Validated.invalid("Something went wrong") // "left" value
val aTest: Validated[String, Int] = Validated.cond(42 > 39, 99, "meaning of life is too small")
```

Easy enough. In addition, Validated shines where error accumulation is required. Say for example that we have the following conditions for a number:

```scala
def validatePositive(n: Int): Validated[List[String], Int] =
  Validated.cond(n > 0, n, List("Number must be positive")

def validateSmall(n: Int): Validated[List[String], Int] =
  Validated.cond(n < 100, n, List("Number must be smaller than 100")

def validateEven(n: Int): Validated[List[String], Int] =
  Validated.cond(n % 2 == 0, n, List("Number must be even")

import cats.instances.list._ // to combine lists by concatenation
implicit val combineIntMax: Semigroup[Int] = Semigroup.instance[Int](Math.max) // to combine ints by selecting the biggest

def validate(n: Int): Validated[List[String], Int] = validatePositive(n)
      .combine(validateSmall(n))
      .combine(validateEven(n))
```

The `validate` method can combine 3 `Validated` instances, in the sense that:

- If all are valid, their wrapped values will combine as specified by the implicit `Semigroup` of that type (basically a combination function).
- If some are invalid, the result will be an Invalid instance containing the combination of all the errors as specified by the implicit `Semigroup` for the error type; in our case, the Cats default for lists is to concatenate them.

`Validated` is therefore more powerful than Either, because besides giving us the freedom to pick the types for the "errors", it allows us to

- combine multiple errors into one instance, thus creating a comprehensive report
- process both values and errors, separately or at the same time
- convert to/from Either, Try and Option

## 5. Conclusion

In this article, you've seen a few ways to handle errors, from the most basic and limiting, to the most advanced, complex and powerful. In short:

- try/catches are almost always undesirable,
- Try wraps failed computations into values we can then process and handle as we see fit,
- Either expands on the concept by considering errors to be valuable information of any type, and
- Validated adds extra power by the capacity to combine errors and values.

Hopefully, after this article, you'll lean more into idiomatic error handling by proper functional programming. Errors are useful.
