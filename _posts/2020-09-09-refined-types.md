---
title: "Refined Types in Scala"
date: 2020-09-09
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, type system, refined]
excerpt: "We look at how we can impose constraints on values at compile time with the Refined library."
---
This article is for Scala programmers of all levels, although if you're a more advanced programmer or you watched/read the <a href="https://www.youtube.com/playlist?list=PLmtsMNDRU0ByOQoz6lnihh6CtMrErNax7">type-level programming mini-series</a>, you will get more value out of it because you'll have a good intuition for what happens behind the scenes.

I'm talking about "behind the scenes" because today's topic involves lots of Scala magic: refined types.

## Introduction

So what's the problem?

We often work with data that cause us problems: negative numbers, empty strings, emails that don't contain "@", and so on. To handle them, we usually write a lot of defensive code so that our application doesn't crash at runtime.

The problem is that very often, such problems can be avoided altogether before the application is compiled. Say we're writing a distributed chat application, and our users are signed in by email:

```scala
case class User(name: String, email: String)
```

In this case, we're going to be perfectly fine citizens and write

```scala
val daniel = User("Daniel", "daniel@rockthejvm.com")
```

But when someone else created that type and we want to create an instance of User, we can be sloppy, forgetful or simply innocent and write

```scala
val noDaniel = User("daniel@rockthejvm.com", "Daniel")
```

and it would be perfectly fine to the compiler... until the application crashes at some point because you're attempting to send an email to "Daniel".

## Enter Refined

If you want to write code with me in this article, I'll invite you to add the following to your build.sbt file:

```scala
libraryDependencies += "eu.timepit" %% "refined" % "0.9.15"
```

(of course, if you want a newer version, check the library's <a href="https://github.com/fthomas/refined/releases">releases page on GitHub</a>)

Refined is a small library for Scala that wants to help us avoid this kind of preventable crashes at compile time. We can leverage the power of the Scala compiler to validate certain predicates before our application has the chance to run and ruin our day. Let's start with something simple. Say we're using only positive numbers in our application, but there's no such thing as a positive integer type. We can use a refined type over Int, to enforce that the number is positive:

```scala
import eu.timepit.refined.api.Refined
import eu.timepit.refined.auto._
import eu.timepit.refined.numeric._

val aPositiveInteger: Refined[Int, Positive] = 42
```

Refined is a type that takes two type arguments: the "value" type you're testing/validating, and the predicate you want the value to pass. If you've gone through the type-level programming mini-series earlier, you have a good warmup: the predicate is embedded as a type. Obviously, there's some implicit conversion happening behind the scenes so you can simply write 42 on the right-hand side.

Refined is pretty powerful, because if you use a value that's not appropriate

```scala
val aNegativeInteger: Refined[Int, Positive] = -100
```

the code will not even compile! This is the main benefit of Refined: it helps the compiler catch your errors before you even deploy your application.

## Refined Tools

Now that you're more familiar with the problem and how Refined can solve it, let's go over some of the capabilities of the library. I'm going to go over the most useful of them.

You saw the numerical Positive predicate. There are tons of others:

  - allow only negative numbers
  - allow only non-negative numbers (including 0)
  - allow only odd numbers
  - allow only even numbers

```scala
val aNegative: Int Refined Negative = -100
val nonNegative: Int Refined NonNegative = 0
val anOdd: Int Refined Odd = 3
val anEven: Int Refined Even = 68
```

Notice I used Refined in infix notation: `Refined[Int, Odd]` can also be written as `Int Refined Odd`.

There are also some more interesting filters. For example, allow only numbers less than a certain value. This is possible at compile time with the magic provided by <a href="https://github.com/milessabin/shapeless">shapeless</a> and its macros:

```scala
import eu.timepit.refined.W
val smallEnough: Int Refined LessThan[W.`100`.T] = 45
```

The `W` value is an alias for shapeless' Witness, which is able to generate a type for us with the construct `W.`100`.T`. Whenever you need to create one of these types yourself, you would use a construct like that.

With this new tools, a whole lot of other functionalities for filtering numbers are unlocked:

  - less than a certain number (or less-than-or-equal)
  - greater than a certain number (or gte)
  - in an open/closed interval between numbers
  - divisible by a number
  - whose modulo is a certain number

Again, all available at compile time!

## Refined Tools, Supercharged

However, the most useful validations happen on strings. Since so much of our application logic is dependent on strings, it makes sense to want to validate them in many ways. For strings, by far the most useful filters are ends-with, starts-with and regex matching:

```scala
import eu.timepit.refined.string._

val commandPrompt: String refined EndsWith[W.`"$"`.T] = "daniel@mbp $"
```

Regex is probably the most powerful - the library allows you to both test whether a string is a regex, and if a string matches a regex:

```scala
val isRegex: String Refined Regex = "rege(x(es)?|xps?)"
```

If the string you use is not a valid regex string, the compilation will fail. For regex matching:

```scala
type Email = String Refined MatchesRegex[W.`"""[a-z0-9]+@[a-z0-9]+\\.[a-z0-9]{2,}"""`.T]
```

In the above we use MatchesRegex and we use triple-quotes to not have to escape every backslash again. With MatchesRegex, you can go wild and add validations for everything you may want:

```scala
type SimpleName = String Refined MatchesRegex[W.`"""[A-Z][a-z]+"""`.T]
case class ProperUser(name: SimpleName, email: Email)

val daniel = ProperUser("Daniel", "daniel@rockthejvm.com")
// val noDaniel = ProperUser("daniel@rockthejvm.com", "Daniel") // doesn't compile
```

## Refining at Runtime

Granted, we can't work with manually-inserted literals all the time - probably not even most of the time. The Refined library allows you to put a value through a predicate and return an Either which contains the predicate failing error (as a String) or the refined type:

```scala
import eu.timepit.refined.api.RefType

val poorEmail = "daniel"
val refineCheck = RefType.applyRef[Email](poorEmail)
```

After you've done the check, you can pattern-match the result and move along with your parsed value.

## Conclusion

You've hopefully learned a new powerful tool to test values at compile time and catch nasty bugs before your application is even deployed. If you need some intuition on how Refined works, check out the type-level programming mini-series:

  - <a href="https://rockthejvm.com/blog/type-level-programming-1">part 1</a>
  - <a href="https://rockthejvm.com/blog/type-level-programming-2">part 2</a>
  - <a href="https://rockthejvm.com/blog/type-level-programming-3">part 3</a>
</ul>
