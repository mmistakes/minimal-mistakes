---
title: "Another Take at Monads: A Way to Generalize Chained Computations"
date: 2021-08-30
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [fp]
excerpt: "We've talked about monads quite a lot on Rock the JVM. In this article, we'll approach them from yet another angle."
---

Much virtual ink has been spilled talking about Monads in Scala. Even here on Rock the JVM, we've talked about Monads in a variety of ways: as a [practical necessity](/monads), or in their the most [abstract possible representation](/monads-are-monoids-in-the-category-of-endofunctors), or as a component of Cats, a popular FP library for Scala that we [teach here on the site](https://rockthejvm.com/p/cats).

In this article, we'll approach the M word from yet another angle: the DRY principle and how the monad abstraction ends up simplifying our code, while making it more general, more expressive and more powerful at the same time.

The only requirements of this article are

- comfortable with the Scala language
- (ideally) reading the other blog posts on monads here on the blog
- actually following this article in your own dev environment

We'll be writing Scala 3 for this article.

## 1. The Fundamentals

The Scala standard library is generally pretty consistent. Tools like `map` and `flatMap` are indispensable in data processing and various pieces of business logic. Those of you coming from the [Essentials course](https://rockthejvm.com/p/scala) should have these concepts fresh in your mind.

We can transform data structures easily with `map`, `flatMap` and `for` comprehensions:

```scala3
val aList = List(1,2,3,4)
val anIncrementedList = aList.map(_ + 1) // [2,3,4,5]
val aFlatMappedList = aList.flatMap(x => List(x, x + 1)) // [1,2,2,3,3,4,4,5]
```

The same concept applies to many useful data structures: Options, Try, [IO](https://rockthejvm.com/p/cats-effect) all share the same properties:

- the ability to "construct" an instance of this type out of a plain value
- the ability to transform wrapped values through functions
- the ability to chain computations through functions that take a value and return a new wrapper type

## 2. The Problem

Assume that you're working on a small toolkit for your team. You want to be able to create a function that returns the combinations of strings and numbers out of many possible kinds of data structures:

- combining a list of strings with a list of numbers will give you a list with all possible tuples
- combining an Option of a string with an Option of a number will give you an Option with the tuple if both Options are non-empty
- combining a Try of a string with a Try of a number ... you get the idea.

With what we know so far, let's sketch an implementation for lists:

```scala3
def combineLists(str: List[String])(num: List[Int]): List[(String, Int)] = for {
    s <- str
    n <- num
} yield (s, n)
```

Given that Option and Try are different types, we have no choice but to duplicate this API for these types as well:

```scala3
def combineOptions(str: Option[String])(num: Option[Int]): Option[(String, Int)] = for {
  s <- str
  n <- num
} yield (s, n)

def combineTry(str: Try[String])(num: Try[Int]): Try[(String, Int)] = for {
  s <- str
  n <- num
} yield (s, n)
```

The method signatures are different (and they have to be), yet they are strikingly similar, and their implementation is _identical_.

Can we do better?

## 3. The Solution

Guided by the DRY principle, let's abstract away this common structure.

What do we need? We need to be able to write a for-comprehension for any kind of data structure that has `map` and `flatMap`. We're getting a little ahead of ourselves, so let's try simply creating a [type class](/why-are-typeclasses-useful) that has these functionalities. We'll provide a method for

- creating an instance of this magical data type (whatever the type is) out of a plain value
- transforming an instance to another type of instance through a function, i.e. a `map`
- chaining the computation of instances based on dependent plain values, i.e. a `flatMap`

The type class is unsurprisingly called `Monad` and it looks something like this:

```scala3
trait Monad[M[_]] {
  def pure[A](a: A): M[A]
  def flatMap[A, B](ma: M[A])(f: A => M[B]): M[B]
  // for free
  def map[A, B](ma: M[A])(f: A => B): M[B] =
    flatMap(ma)(a => pure(f(a)))
}
```

Notice our method signatures look a little different, because the methods do not belong to the magical data structures directly, but they belong to the type class. Otherwise, we have the same semantics as the map/flatMap combinations of standard data types.

Because we structured our code in this way, we get the `map` method can be fully implemented in terms of pure + flatMap, so our Monad type is a natural and direct descendant of the [Functor](/what-the-functor) type class. But that's a subject we approached in [another article](/cats-typeclass-hierarchy).

In any event, given the fact that we now have a type class, we need to follow the type class pattern and create some type class instances and create a single, unifying, general API that requires the presence of a type class instance for our particular type. The steps follow.

Let's create, as an example, a type class instance for Monad for List:

```scala3
given monadList: Monad[List] with {
  override def pure[A](a: A) = List(a)
  override def flatMap[A, B](ma: List[A])(f: A => List[B]) = ma.flatMap(f)
}
```

As an implementation, we rely on the standard Scala collection library.

Let's also define our unifying API:

```scala3
def combine[M[_]](str: M[String])(num: M[Int])(using monad: Monad[M]): M[(String, Int)] =
  monad.flatMap(str)(s => monad.map(num)(n => (s, n)))
```

Notice that we're not using for-comprehensions as we can't yet (we depend on the monad instance), but the semantics stay the same. Given this new method signature and implementation, we can now safely combine lists:

```scala3
println(combine(List("a", "b", "c"))(List(1,2,3))) // [(a,1), (a,2), (a,3), (b,1), (b,2), (b,3), (c,1), (c,2), (c,3)]
```

The magical benefit is that if we have a `given Monad[Option]` in scope, we can safely call `combine` on Options as well. Our user-facing API does not require a specific type now, but only the presence of a `given Monad` of that type in scope. You can now combine Options, Try, IOs, States, or whatever other kinds of monads you want.

The Monad type class was driven, in this article, by the necessity to not duplicate any code.

## 4. Enhancing Expressiveness

That said, we can go further and make our instances of `M[_]` (whatever M is) behave like our original duplicated API. In other words, we can grant instances of `M[_]` the ability to do for comprehensions. How can we do that? Using [extension methods](/scala-3-extension-methods).

For any `M[_]` for which there is a given `Monad[M]` in scope, we can enhance instances of M with the map and flatMap methods, so they behave exactly like our original lists:

```scala3
extension [M[_], A](ma: M[A])(using monad: Monad[M]) {
  def map[B](f: A => B): M[B] = monad.map(ma)(f)
  def flatMap[B](f: A => M[B]): M[B] = monad.flatMap(ma)(f)
}
```

So with that in place, we can create another version of our general combine API to look like this:

```scala3
def combine_v2[M[_] : Monad](str: M[String])(num: M[Int]): M[(String, Int)] = for {
  s <- str
  n <- num
} yield (s, n)
```

where the `M[_] : Monad` means that we require the presence of a given `Monad[M]` in scope. Because of that, we can now use `map` and `flatMap` on our instances of `M[String]` and `M[Int]` as well, thereby enabling for-comprehensions in the most general terms.

Testing the new API, we'll see that all of them work in the same way:

```scala3
combineLists(List("a", "b", "c"))(List(1,2,3,4)) == combine(List("a", "b", "c"))(List(1,2,3,4)) // true
combineLists(List("a", "b", "c"))(List(1,2,3,4)) == combine_v2(List("a", "b", "c"))(List(1,2,3,4)) // true
```

## 5. Conclusion

Although we explored many facets of Monads on the blog and in the Cats course, in this article we saw another necessity for Monads as a type class: the need to not repeat ourselves in API design and implementation. Through Monads, we can now create general ways of chaining computations, with significant implications in our code at all levels.
