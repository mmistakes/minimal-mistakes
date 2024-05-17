---
title: "Exploiting Implicit Ambiguity in Scala"
date: 2021-07-07
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: []
excerpt: "In this article, I'll show you how you can exploit the implicit resolution mechanism in Scala to enforce type relationships at compile time."
---

This article is the Scala 2 version of a similar problem we solved with [NotGiven in Scala 3](/anti-givens).

The technique here is a bit more general, though - we can exploit the entire implicit resolution mechanism to prove the existence (or the ambiguity of existence) of type relationships at compile time. This was recently made impossible by the design of the new [Scala 3 givens mechanism](/givens-vs-implicits). But since it's a forbidden fruit, I suspect it's even more tempting to learn, especially as it will continue to be applicable in Scala 2 and Scala 3 early versions for as long as implicits are a thing.

_A word of warning, though: this technique should probably not be used as it is in real life code. This article is mostly an illustration of what's possible with the Scala compiler. A note on the alternative below._

## 1. Background

Nothing in particular is required for this article - only that you're familiar with implicits and how they work. We have some examples of how far implicit generation can go with the [type-level programming mini-series](/type-level-programming-part-1). If you're new to implicits but know the Scala basics, check out the [advanced Scala course](rockthejvm.com/p/advanced-scala) for lots of details.

## 2. Gentle Intro: Proving Type Equality

Assume we have a library that processes two lists:

```scala
def processLists[A, B](la: List[A], lb: List[B]): List[(A, B)] =
  for {
    a <- la
    b <- lb
  } yield (a, b)
```

Assume this method is critical for our application, but we can't change it. Assume that we only want this method to be applicable for lists of the same type ONLY. In other words, we want this code to compile:

```scala
val sameKindOfLists = processLists(List(1,2,3), List(4,5))
```

and this one to _not_ compile:

```scala
val differentKindsOfLists = processLists(List(1,2,3), List("black", "white"))
```

There are some solutions to this problem. An easy one would be to wrap the API into another one which takes a single type argument, therefore enforcing that whoever calls `processLists` will do so with the same types:

```scala
def processListsSameTypeV2[A](la: List[A], lb: List[A]): List[(A, A)] =
  processLists[A,A](la, lb)
```

Now, for a variety of reasons, such a solution may not be appropriate, especially in very general library code.

There is another, more powerful technique.

There is a little-known type in the Scala library `=:=[A,B]` (also usable infix as `A =:= B`) which describes the "equality" of types A and B. Upon request &mdash; i.e. if we require an implicit instance &mdash; the compiler can synthesize an instance of that type for two _equal_ types.

```scala
def processListsSameTypeV3[A, B](la: List[A], lb: List[B])(using A =:= B): List[(A, B)] =
  processLists(la, lb)
```

In this case, we'll have the following:

```scala
// works
val sameKindOfLists = processListsSameTypeV3(List(1,2,3), List(4,5))
// doesn't work - implicit not found
val differentKindsOfLists = processListsSameTypeV3(List(1,2,3), List("black", "white"))
```

This approach is much more general and can be taken to a new level for a harder problem.

## 3. Level 2 Problem: Proving Type Difference

Let's consider the opposite problem: we have that `processList` API, but we need to make sure that we can only call it with _different_ types only. Right now, nothing prvents us from calling that method on two lists of integers, or two lists of Strings, you get the idea. To solve this, we'll take a similar approach and we'll create a synthetic "not equal" type that looks like this:

```scala
trait =!=[A, B]
```

And define a method that requires the presence of an implicit instance of this type:

```scala
def processDifferentTypes[A, B](la: List[A], lb: List[B])(implicit evidence: A =!= B): List[(A, B)] =
  processLists(la, lb)
```

We can also follow the same approach as the standard library does with `=:=` and synthesize implicit instances for any two types:

```scala
// we don't care what value we put in here, we only care it exists.
implicit def neq[A, B]: A =!= B = null
```

However, this is still not enough: this implicit def only ensures we can create instances of `=!=` for _any_ two types!

And this is where the trick comes in: we want our method to not compile if we use the same type of lists, not because the compiler can't find an implicit instance of `=!=`, but because it finds _too many_! Let me define the following:

```scala
implicit def generate1[A]: A =!= A = null
implicit def generate2[A]: A =!= A = null
```

This brilliant solution is not mine, but it belongs to Miles Sabin from an old StackOverflow answer which I couldn't find anymore, but stuck with me for a long time. The genius of this approach is that when we call

```scala
processDifferentTypes(List(1,2,3), List(4,5))
```

the compiler tries to synthesize an instance of `Int =!= Int`. Because we have `generate1` and `generate2`, that will trigger a compiler implicit ambiguity, so the code will not compile because the compiler won't know which implicit to inject! This ambiguity is only triggered for two types which are identical.

_Question: why did we need two implicit defs? Wouldn't we get an ambiguity with just one `generate` and `neq`?_

Due to how the compiler tries to synthesize implicit arguments, a single `generate` implicit def is not enough. That is because the signatures of `generate` and `neq` are different. Not only different, but the `generate`'s returned type is more specific than that of `neq`, so when the compiler searches for ways to create an instance of `=!=`, it will take the implicit def with the most specific signature, and then stop.

## 4. Sounds great! Should I use this?

Not in production code. People will hate you.

Seriously, if you need something like this, there's probably something in the design of your code that you should change. If someone triggers an implicit ambiguity (which you've so diligently added by design), 99% chances are they'll think they made a mistake. There's very little _real_ reason why you should go with this approach.

> So what should you do instead? Here are some options:

* Define [type classes](/why-are-typeclasses-useful/). Make them available (e.g. via implicit defs) only for the type combinations you want to support.
* Upgrade to Scala 3 and use the [NotGiven](/anti-givens) technique. It's built-in and much safer.

> So why did you write this article in the first place? This technique is useless!

Scala is an amazing language and its compiler is extremely powerful. Much like the [type-level programming examples](/type-level-programming-part-1) have little _immediate_ practical application, this article wanted to show you what it's possible with the Scala compiler. You can truly build amazing things.

## 4. Conclusion

Implicits are extremely powerful, and implicit instance generation is a magical tool to prove the existence (or non-existence) of type relationships in Scala. For as long as implicits continue to be a feature in Scala (in versions 2.x and early 3.x), this trick will continue to be applicable.
