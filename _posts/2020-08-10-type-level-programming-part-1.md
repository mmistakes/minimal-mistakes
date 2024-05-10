---
title: "Type-Level Programming in Scala, Part 1"
date: 2020-08-10
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "This one is hardcode. We make the Scala compiler infer type relationships for us at compile time. Pure power."
---

In this mini-series I'll introduce you to some advanced Scala techniques for type-level programming. In other words, you'll learn to use the power of the Scala compiler to solve problems for you and to validate properties of <em>types</em>.

This article (and its subsequent parts) require an advanced Scala programmer, so you'll need to be comfortable with quite a few of the harder topics in Scala:
  - type aliases
  - type members
  - implicit methods
  - how the compiler searches for implicits

In this first part of the series, I'll introduce you the notion of values as types and I'll show how you can embed a mathematical problem as a type constraint, which the Scala compiler can happily validate or invalidate for you before the code can compile.

## Prologue

This article series is applicable to Scala 2.12 and 2.13 - when Scala 3 arrives, I'll release an updated Scala 3 version of this series. If you're following this article series on Scala 2.13, make sure you add the scala-reflect package to your build.sbt file:

```scala
libraryDependencies += "org.scala-lang" % "scala-reflect" % scalaVersion.value
```

This is not a cheat - we aren't using reflection to manipulate types at runtime. We're using the reflect package to print something to the console, although the mere fact the code compiles will mean that we're successful in what we're going to do. Nevertheless, I'll add the following starter code here so we can focus only on type-level programming from now on:

```scala
package myPackage

object TypeLevelProgramming { // this is where I'll store my main method
  import scala.reflect.runtime.universe._
  def show[T](value: T)(implicit tag: TypeTag[T]) =
    tag.toString.replace("myPackage.TypeLevelProgramming.", "") // this will be very verbose otherwise
}
```

With that, we're ready to dive into type-level programming with Scala.

## 1. Numbers as Types

We're going to start easy. We're going to declare a type that will represent natural numbers. However, we aren't going to use the plain Int type, but rather we'll represent the relationship between numbers as a succession.

```scala
trait Nat
class _0 extends Nat
class Succ[A <: Nat] extends Nat
```

With the above code, we've defined the entire set of natural numbers! Think about it. If you wanted to represent the number 5, how would you do it in terms of the above definitions, in Scala?

```scala
type _1 = Succ[_0]
type _2 = Succ[_1] // = Succ[Succ[_0]]
type _3 = Succ[_2] // = Succ[Succ[Succ[_0]]]
type _4 = Succ[_3]
type _5 = Succ[_4]
```

Essentially, the number 5 is now a <em>type</em>, and we represent it as `Succ[Succ[Succ[Succ[Succ[_0]]]]]]`. The compiler can represent any number at all in terms of this succession relationship. We'll keep the above type aliases for convenience.

This natural number representation bears the name of the would-be-rockstar-Scala-functional-programmer-if-he-were-alive <a href="https://en.wikipedia.org/wiki/Giuseppe_Peano">Giuseppe Peano</a>, and the number relationships that we're going to transform into type constraints in the Scala compiler will be the foundation of the Peano number arithmetic.

## 2. Number Comparison as Types

The first part was gentle enough. If I've caught your attention and curiosity, then do stick around - we're in for quite a ride.

At this stage, we have numbers and their succession relationship as type constraints. The number 1 is the successor of 0, 2 is the successor of 1, and so on. We'd like to be able to tell whether one number is "less than" another. This relationship is not trivial. Succession (difference of 1) is fine, but how can you tell that 1 is "less than" 4 just by looking at the type definition?

We'll make the compiler determine that for us.

```scala
trait <[A <: Nat, B <: Nat]
```

You're probably well aware that Scala is very permissive with naming methods, identifiers and types, and `<` is perfectly fine (and convenient). We can, of course, use this as a regular type:

```scala
val someComparison: _2 < _3 = ???
```

But we won't need that, because the compiler will create the appropriate instances for us.

## 3. The Compiler Validates

We'll never build instances of "less-than" ourselves, but we'll make the compiler build implicit instances of "less-than" <em>just for the right types</em>. Through these instances, we'll thus validate the existence of the "less-than" type for various numbers, and therefore prove the comparison between numbers.

Implicit methods to the rescue:

```scala
implicit def ltBasic[B <: Nat]: <[_0, Succ[B]] = new <[_0, Succ[B]] {}
```

What does this mean? For every type B which extends Nat, the compiler will be able to automatically build an instance of `_0 < Succ[B]`. This will have the same meaning as Peano's first axiom of comparison: for every natural n, 0 < succ(n).

We can write a similar thing to make the compiler automatically compare other numbers:

```scala
implicit def inductive[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[Succ[A], Succ[B]] = new <[Succ[A], Succ[B]] {}
```

In other words: if the compiler can find and implicit instance of `<[A, B]`, then the compiler will also build an instance of `<[Succ[A], Succ[B]]`. This mechanism has the same effect as proving the second of Peano's axioms on comparison: for every two naturals a and b, if a < b, then succ(a) < succ(b).

These two implicit methods, used in combination, will have the powerful effect of proving the existence of any `<[A,B]` type, whenever the "less-than" relationship makes sense. Let's add a simple method which fetches the implicit instance of comparison at the point of use, and group the implicit methods into the companion of `<` because the compiler will search that space in its attempt to resolve implicits:

```scala
object < {
  def apply[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[A, B] = lt
  implicit def ltBasic[B <: Nat]: <[_0, Succ[B]] = new <[_0, Succ[B]] {}
  implicit def inductive[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[Succ[A], Succ[B]] = new <[Succ[A], Succ[B]] {}
}
```

In this way, we can write the following:

```scala
val validComparison: _2 < _3 = <[_2, _3]
```

This compiles, because
  - the apply method needs an implicit instance of `<[_2, _3]`
  - to find that instance, the compiler can choose to run any of the two implicit methods - it will attempt to call the `inductive` method, but it will need an implicit instance of `<[_1, _2]`
  - in the same way, the compiler marks that it can call the `inductive` method, but it needs an implicit instance of type `<[_0, _1]`
  - in this case, the method signature of `ltBasic` signals that the compiler can build an instance of `<[_0, _1]` because `_1 = Succ[0]`
  - now, given an instance of `<[_0, _1]` the compiler can build an instance of `<[_1, _2]`
  - in the same style, given an instance of `<[_1, _2]` the compiler can build an instance of `<[_2, _3]`
  - given the instance of `<[_2, _3]`, it can safely be passed to the `apply` method and returned

However, if you try to wrote

```scala
val invalidComparison: _3 < _2 = <[_3, _2]
```

this will trigger a compiler error, because no implicit instances of `<[_3, _2]` can be found.

## 4. Number Comparison as Types

The full code, with a shameless copy of less-than-equal, is below:

```scala
  trait Nat
  class _0 extends Nat
  class Succ[A <: Nat] extends Nat

  type _1 = Succ[_0]
  type _2 = Succ[_1] // = Succ[Succ[_0]]
  type _3 = Succ[_2] // = Succ[Succ[Succ[_0]]]
  type _4 = Succ[_3] // ... and so on
  type _5 = Succ[_4]

  sealed trait <[A <: Nat, B <: Nat]
  object < {
    def apply[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[A, B] = lt
    implicit def ltBasic[B <: Nat]: <[_0, Succ[B]] = new <[_0, Succ[B]] {}
    implicit def inductive[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[Succ[A], Succ[B]] = new <[Succ[A], Succ[B]] {}
  }

  sealed trait <=[A <: Nat, B <: Nat]
  object <= {
    def apply[A <: Nat, B <: Nat](implicit lte: <=[A, B]): <=[A, B] = lte
    implicit def lteBasic[B <: Nat]: <=[_0, B] = new <=[_0, B] {}
    implicit def inductive[A <: Nat, B <: Nat](implicit lt: <=[A, B]): <=[Succ[A], Succ[B]] = new <=[Succ[A], Succ[B]] {}
  }
```
