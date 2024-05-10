---
title: "Scala 3: Anti-Givens"
date: 2021-06-30
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala 3]
excerpt: "Showing a Scala 3 trick that few developers know: exploiting the _absence_ of a given instance to enforce type relationships."
---

The Scala 3 [given/using combos](/scala-3-given-using/) have enormous expressive power. Just by themselves, they can synthesize new types and prove relationships between types, much like the old Scala 2 [implicits](/givens-vs-implicits).

In this article, I'll show you a trick that few Scala developers know: making the compiler exploit the _absence_ of a given instance for enforcing type relationships.

## 1. Background

This article is exclusive to Scala 3. So grab your dev environment and create a new Scala 3 project (no libraries are required). Also, some knowledge of [givens](/scala-3-given-using/) is going to prove useful.

## 2. The Smaller Problem: Proving Type Equality

Imagine you have a library API that processes two lists:

```scala3
def processLists[A, B](la: List[A], lb: List[B]): List[(A, B)] =
  for {
    a <- la
    b <- lb
  } yield (a, b)
```

Assume this method is not changeable, but you want to use it only for the situation where the type A _must_ be the same as B. In other words, you want this line to compile:

```scala3
val sameKindOfLists = processLists(List(1,2,3), List(4,5))
```

and this one to _not_ compile:

```scala3
val differentKindsOfLists = processLists(List(1,2,3), List("black", "white"))
```

There are several approaches to doing it. A first approach &mdash; probably the simplest &mdash; is to create a wrapper method that takes a single type argument, therefore enforcing the lists to be of the same type:

```scala3
def processListsSameTypeV2[A](la: List[A], lb: List[A]): List[(A, A)] =
  processLists[A,A](la, lb)
```

In this way, you won't be able to pass two lists of different types.

However, there is a more complex, much less known, but more powerful technique.

In Scala, the standard library contains the little-known type `=:=[A,B]` (also usable infix as `A =:= B`) which denotes the "equality" of types A and B. The compiler is able to synthesize instances of `=:=[A,A]` wherever we have methods requiring an implicit argument or a `using` clause. In our case, we can write

```scala3
def processListsSameTypeV3[A, B](la: List[A], lb: List[B])(using A =:= B): List[(A, B)] =
  processLists(la, lb)
```

which means that wherever we call this method with some concrete types, the compiler will search for a given instance of `=:=` for those particular types. In our case, we have

```scala3
// works
val sameKindOfLists = processListsSameTypeV3(List(1,2,3), List(4,5))
// doesn't work
val differentKindsOfLists = processListsSameTypeV3(List(1,2,3), List("black", "white"))
```

In the first case, the call works because the compiler can synthesize an instance of `=:=[Int, Int]`, whereas in the second case the compiler cannot find an instance of `=:=[Int, String]` and so it won't compile.

This second solution, albeit more complex, paves the way for the solution to a bigger problem.

## 3. The Bigger Problem: Proving Type Difference

Let's consider we have the same `processList` library API that we can't change. However, we're faced with the exact opposite constraint this time: how can we make sure that we can only call `processList` with _different_ type arguments? For whatever reason, we can only combine elements from different types in our application so we must enforce this constraint.

Right now, there's nobody preventing us from calling `processList` with two lists of integers. However, we can exploit the solution we gave to the first (easier) problem with givens. In this case, we'll exploit the _absence_ of any instance of `=:=` for the types we want. Here's how we're going to do it.

First of all, we'll add a special import:

```scala3
import scala.util.NotGiven
```

The type NotGiven has special treatment from the compiler. Wherever we require the presence of a `NotGiven[T]`, the compiler will successfully synthesize an instance of `NotGiven[T]` if and only if it _cannot_ find or synthesize a given instance of `T`. In our case, we must not find or synthesize an instance of `A =:= B`, so our wrapped method becomes:

```scala3
def processListsDifferentType[A, B](la: List[A], lb: List[B])(using NotGiven[A =:= B]): List[(A, B)] =
  processLists(la, lb)
```

and with that, our code satisfies our constraints:

```scala3
// doesn't compile
val sameListType = processListsDifferentType(List(1,2,3), List(4,5))
// works
val differentListTypes = processListsDifferentType(List(1,2,3), List("black", "white"))
```

The first one doesn't compile now, because the compiler can synthesize an instance of `=:=[Int, Int]` and so the `NotGiven` cannot be found, whereas the second case is the opposite.

## 4. Conclusion

You learned another trick for manipulating the Scala 3 compiler to enforce type relationships at compile time. More to come!
