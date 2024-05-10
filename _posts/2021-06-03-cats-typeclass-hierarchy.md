---
title: "Cats: Essential Type Class Hierarchy, Explained"
date: 2021-06-03
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, cats]
excerpt: "Cats is a complex library for Scala. In this article, we'll deconstruct the major type classes of Cats and explain how they're connected."
---

_This article is about the Cats Scala library. For lots of in-depth explanations, examples, exercises and a hands-on experience with Cats, check out the Rock the JVM [Cats course](https://rockthejvm.com/p/cats). It's going to make you a productive developer with Scala and Cats and a better engineer and thinker overall._

This article is for the comfortable Scala programmer. We'll discuss the essential type classes in the Cats library, why we need them, how they're related and how you should think about them so that you're not tangled in all the abstractions.

The code we'll write here is for **Scala 3**, but with a [minor adjustment](/givens-and-implicits/) it will work with Scala 2 as well.

## 1. Setup and Background

You've surely heard (or even read) about Cats: it's a library for functional programming abstractions, going beyond what Scala brings with its standard library. Cats offers (offer?) a range of type classes, extension methods and general FP primitives that allow us to write very general and extensible code very quickly (if we know what we're doing).

A side note: because I'm probably going to refer to Cats many times in this article, there's the problem of whether it should be singular (one library) or plural (multiple categories, playfully called "cats"). For the ease of reading, I'll just refer to Cats in the singular. Grammar be damned.

Cats needs to be added to your `build.sbt` file for us to work with it:

```scala
libraryDependencies += "org.typelevel" %% "cats-core" % "2.6.1"
```

For a quick introduction of why we need type classes in the first place, check out [this piece](/why-are-typeclasses-useful/).

## 2. Starting Easy: Semigroups and Monoids

We've already talked a bit about [Semigroups and Monoids](/semigroups-and-monoids-in-scala/) in another article. These are some of the simplest type classes in Cats.

A Semigroup is a type class granting the capability of a type to combine two values of that type and produce another value of that same type:

```scala
trait Semigroup[A] {
  def combine(x: A, y: A): A
}
```

We can use Semigroups whenever we write generic code and operate with values that need to be combined:

- numbers
- strings
- shopping carts in an online store
- permissions in a data repository

Monoids are a special kind of semigroups, where besides the combination function, we also have a "neutral element" of that combination function. We call that value `empty`, or "zero" (with the proper quotes because zero has a special meaning in math, you know). The property is that

```scala
combine(x, empty) == x
combine(empty, x) == x
```

for all elements x of type A. A monoid is defined as

```scala
trait Monoid[A] extends Semigroup[A] {
  def empty: A
}
```

So we have our first relationship: Monoids extend Semigroups.

## 2. Functors

We also talked about [functors](/what-the-functor/) in another article and video. In there, we talked about why we need functors, with lots more examples. As a summary, functors describe the capability to "map" containers, such as lists, options, sets, futures, etc. The functor trait looks like this:

```scala
trait Functor[F[_]] {
  def map[A, B](fa: F[A])(f: A => B): F[B]
}
```

Notice it's higher-kinded, because the types which can be "mapped" are also generic.

At this point, it's worth mentioning that Cats has a rule of thumb when it deconstructs type classes: in general, _each type class has **one** fundamental method_. In the case of functors here, the fundamental method is `map`.

## 3. Monads

Monads are the sweet spot of pure FP. They encapsulate chainable computations, and we talked more about the [practical side of monads](/monads/) and the [_very_ theoretical side of monads](/monads-are-monoids-in-the-category-of-endofunctors/) in other articles here on the blog, but never about monads as a type class.

For those of you who have read about Cats and experimented with monads, you know that monads have two capabilities:

- the capability to "lift" a plain value into a monadic type, an operation known as `pure`
- the capability to "chain" computations of monadic types, an operation known as `flatMap` or `bind`

The monad trait can look something like this:

```scala
trait Monad[F[_]] {
  def pure[A](a: A): F[A]
  def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B]
}
```

You know this from real life: flatMapping lists, futures, options are all (simpler) versions of the monadic chaining capabilities.

Because Monads have `pure` and `flatMap`, we can express the much weaker `map` method in terms of those two:

```scala
def map[A, B](fa: F[A])(f: A => B): F[B] =
  flatMap(fa)(a => pure(f(a)))
```

Therefore, Monad should extend Functor, because we can implement the `map` method for free. So we have the type class hierarchy like this:

```jeg
 Semigroup            Functor
     │                   │
     │                   │
     ▼                   ▼
  Monoid               Monad
```

## 4. Applicatives and Weaker Monads

The thing is, I mentioned earlier that Cats' rule of thumb is one fundamental capability for each type class. Monad has two. Which of these two should be in a separate type class?

The main intuition of monads is the "chained" computations of FP. Therefore, the `pure` method should be the one to go into a separate type class. That type class is called Applicative, and it sits between Functor and Monad.

```scala
trait Applicative[F[_]] extends Functor[F] {
  def pure[A](a: A): F[A]
}
```

Nice. Applicative is the type class with the capability to wrap a plain value into a wrapped type. Now, here's some kicker news for you: we'll also move `flatMap` to a different type class.

Why?

Monads establish most of the equivalence between imperative programming and functional programming. An imperative program can easily be transformed into FP by creating a monadic type capable of chaining each "instruction" as a new (pure) value. "Do this, do this, and then this" becomes "new monad, flatMap to new monad, then flatMap to a final monad".

In order to keep its promise and bridge the concept of "imperative" to FP, the Monad trait has another fundamental method that can "iterate". That method is called `tailrecM`, which brings stack safety to an arbitrarily large sequence of flatMaps. The `flatMap` method belongs to a different type class, which bears the (perhaps uninspired) name of `FlatMap` (with an F):

```scala
trait FlatMap[F[_]] extends Functor[F] {
  def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B]
}
```

Therefore, Monad extends these two and implements that `map` method for free:

```scala
trait Monad[F[_]] extends FlatMap[F] with Applicative[F] {
  override def map[A, B](fa: F[A])(f: A => B) = {
    flatMap(fa)(a => pure(f(a)))
  }
}
```

So the hierarchy looks like this:

```jeg

                       Functor
  Semigroup               │
      │           ┌───────┴────────┐
      │           │                │
      ▼           ▼                ▼
   Monoid     FlatMap           Applicative
                  │                │
                  └───────┬────────┘
                          │
                          ▼
                        Monad

```

## 5. Semigroupals

This is one of the type classes which are harder to get into and rarely used directly.

Think of two lists. Whenever we write a for-comprehension of two lists (or a flatMap), we're doing a cartesian product of those two lists. The concept of a cartesian product (which is not the same as a flatMap) is core to the type class called Semigroupal.

```scala
trait Semigroupal[F[_]] {
  def product[A, B](fa: F[A], fb: F[B]): F[(A, B)]
}
```

Semigroupal has a method that takes two wrapped values and returns a wrapped value of tuple(s). This is the (very general) concept of a cartesian product over any type F. Semigroupal doesn't have a parent type class in our hierarchy here.

## 6. Weaker Applicatives

Here's where it gets tricky. Cats has a bunch of type classes that seem unnecessarily abstract and without correspondent in real life. Apply is one of them.

Apply is a weaker (but more general) applicative, and it sits between Applicative and Functor in the above diagram. It's a higher-kinded type class (much like Applicative, Functor and Monad) which allows us to invoke a wrapped function over a wrapped value and obtain a wrapped result:

```scala
trait Apply[F[_]] extends Functor[F] {
  def ap[A, B](fab: F[A => B], fa: F[A]): F[B]
}
```

Now, with the `ap` method and the `map` method from Functor, we can implement the following method for free:

```scala
def product[A, B](fa: F[A], fb: F[B]): F[(A, B)] = {
  val myFunction: A => B => (A, B) = (a: A) => (b: B) => (a, b)
  val fab: F[B => (A, B)] = map(fa)(myFunction)
  ap(fab, fb)
}
```

In other words, if Apply extends Functor, then it naturally extends Semigroupal as well. Now, with the `product` method set, we can implement a much useful method that you may have used in real life &mdash; `mapN`:

```scala
def mapN[A, B, C](fa: F[A], fb: F[B])(f: (A, B) => C): F[C] = {
  map(product(fa, fb)) {
    case (a,b) => f(a,b)
  }
}
```

The `mapN` method not only does a (cartesian) product between two wrapped values, but it also applies a function to the elements being tupled. Our hierarchy now looks like this:

```jeg
                      Functor            Semigroupal
                         │                    │
                 ┌───────┴────────┐ ┌─────────┘
 Semigroup       │                ▼ ▼
     │           │               Apply
     │           │                 │
     ▼           ▼                 │
  Monoid     FlatMap               ▼
                 │             Applicative
                 │                 │
                 └───────┬─────────┘
                         │
                         ▼
                       Monad
```

## 7. Error Types

Besides Applicatives which can wrap successful values of type `A` into a wrapped type `F[A]`, we can also wrap error types and treat them in the same way:

```scala
trait ApplicativeError[F[_], E] extends Applicative[F] {
  def raiseError[A](error: E): F[A]
}
```

The `raiseError` method can take an undesirable, "error" value and wrap that into a wrapped type `F[A]`. Notice that the error type E does not appear in the result type `F[A]` &mdash; that's because we treat wrapped types in the same way down the line, regardless of whether they're successful or not, and treat the error cases later in a purely functional way if we need to.

In the same style, we have an error-enhanced monadic type as well, called `MonadError`:

```scala
trait MonadError[F[_], E] extends ApplicativeError[F, E] with Monad[F]
```

And thus, the final type class hierarchy looks like this:

```jeg
                      Functor            Semigroupal
                         │                    │
                 ┌───────┴────────┐ ┌─────────┘
 Semigroup       │                ▼ ▼
     │           │               Apply
     ▼           ▼                 │
  Monoid     FlatMap               ▼
                 │             Applicative
                 │                 │
                 └───────┬─────────┤
                         ▼         │
                       Monad       │
                         │         ▼
                         │    ApplicativeError
                         │         │
                         └─────┬───┘
                               │
                               ▼
                          MonadError
```

## 8. Conclusion

In this article, we've gone over the major type classes in Cats and established the basic relationship between them. The deep reasoning behind them is complex and way outside the scope of this piece, but hopefully you got the main intuition behind most (maybe all) of the type classes and relationships above.

Obviously, the [Cats course](https://rockthejvm.com/p/cats) describes everything in detail, with lots of exercises and many more functionalities of Cats that we did not have time to even touch in this article &mdash; e.g. data validation, purely functional state, modes of evaluation, traversing, Kleisli, type class variance &mdash; but I hope this article gave you some essential tips on how to start looking at the core type classes so you can use them for your own projects.
