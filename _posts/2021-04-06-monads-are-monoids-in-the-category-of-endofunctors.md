---
title: "Monads are Monoids in the Category of Endofunctors - Scala version, No Psychobabble"
date: 2021-04-06
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, mathematics, category theory]
excerpt: "What's the problem?"
---

This article will attempt to demystify one of the most condensed and convoluted pieces of abstract math to ever land in functional programming.

The description of monads as "just monoids in the category of endofunctors" is commonly attributed the book [Categories for the Working Mathematician](https://www.amazon.co.uk/Categories-Working-Mathematician-Graduate-Mathematics/dp/0387984038), and then appeared in many other places. Some people [made some fun of it](http://james-iry.blogspot.com/2009/05/brief-incomplete-and-mostly-wrong.html). There were quite a few articles on the topic, most littered with mathematical jargon, and almost none in Scala.

The article was inspired by an innocent question from one of my students on Slack (I see you, Kamran), of the form of "@Daniel - can you expand on: monads are just monoids in the category of endofunctors". A couple of weeks and many headaches later, I came up with this article, which is the only version that I could also understand, written for Scala 3.

Before we begin, let's establish some goals.

*This article will have zero immediate practical application for you.* HOWEVER: the kind of mental gymnastics we'll do and the code we'll write here are both going to make a big difference in how you read, understand and reason about extremely abstract code in your library or codebase. This skill is timeless, and even transcends Scala as a language.

So this article is for

1. Curious people wanting to learn what's with this "monoids in the category of endofunctors" psychobabble, without *using* any psychobabble.
2. Software engineers with a long-term vision for their skills and future.

If you want the shortest version possible, check out this [Twitter thread](https://twitter.com/rockthejvm/status/1379695298365300736)

## 1. Background

We're going to write some pretty abstract Scala. Some topics are required, but the following will be sufficient for you to understand everything:

- [Higher-Kinded Types](/scala-types-kinds/)
- [Type Lambdas in Scala 3](/scala-3-type-lambdas/) - we're going to use this syntactic structure once
- [Semigroups and Monoids](/semigroups-and-monoids-in-scala/) - we're going to need monoids (obviously)
- [Functors](/what-the-functor) - obviously
- [Monads](/monads) - at least in the practical sense

We're also going to use some notations that are popular within the Cats library. The students of the [Cats course](https://rockthejvm.com/p/cats) and Scala folks familiar to Cats are going to find this very natural.

We're not going to need any library dependencies for this article (no Cats or anything), as we'll write plain Scala.

## 2 - MICE, a.k.a. Monoids in the Category of Everything

If you remember monoids, either from the [article](/semigroups-and-monoids-in-scala/), the [video](https://www.youtube.com/watch?v=LmBTiFYa-V4) or from [Cats](https://rockthejvm.com/p/cats), you'll remember that we write it like a simple trait:

```scala3
trait Monoid[T] {
    // the official interface
    def empty: T
    def combine(a: T, b: T): T
}
```

A monoid is a mathematical construct which denotes a combination function between values. This function is associative, i.e. `combine(a, combine(b, c)) == combine(combine(a, b), c)`, and has a neutral value "empty" which has no effect, i.e. `combine(a, empty) == combine(empty, a) == a`. In the article, video and the Cats course we talk at length about why monoids are useful for programming.

You can imagine that this Monoid is defined as a trait with methods taking arguments, but we can imagine a functionally equivalent Monoid whose methods return functions. Here's how we can make it look like:

```scala3
trait FunctionalMonoid[T] {
    def unit: Unit => T
    def combine: ((T, T)) => T
}
```

This interface is equivalent to the Cats version. We can indeed create a relationship between them:

```scala3
trait Monoid[T] extends FunctionalMonoid[T] {
    // the "official" API
    def empty: T
    def combine(a: T, b: T): T

    // the hidden interface
    def unit = _ => empty
    override def combine = t => combine(t._1, t._2)
}
```

Why did we write `FunctionalMonoid`? Because we can generalize the concept of the empty value "production" and the concept of a "tuple". Let's say that instead of Unit, we had a general type U, and instead of a tuple, we had a general type P (for "product"):

```scala3
trait GeneralMonoid[T, U, P] {
    def unit: U => T // U "informs" the creation of the empty value
    def combine: P => T // P "informs" the creation of a product value
}
```

We can of course say that the immediate equivalent to our Monoid extends this GeneralMonoid thing:

```scala3
trait FunctionalMonoid[T] extends GeneralMonoid[T, Unit, (T, T)] {
    // same code
}
```

Take a look again at GeneralMonoid. Notice that both `unit` and `combine` return instances of `Function1`. We can even generalize this concept to a general type:

```scala3
trait MostAbstractMonoid[T, ~>[_, _], U, P] {
    def unit: U ~> T
    def combine: P ~> T
}

trait GeneralMonoid[T, U, P] extends MostAbstractMonoid[T, Function1, U, P] {
    // same code
}
```

The type `MostAbstractMonoid`, as its name suggests, denotes the most abstract monoid we can imagine, where the concepts of "empty" and "combine" mean something more general than just computing values. Technically, `MostAbstractMonoid` is a Scala representation of a monoid in a monoidal category. I'm going to skip many of the math properties and structures, but think of `MostAbstractMonoid` as "monoid in the category of T". I'm actually going to rename it to make it clear, so here's the Scala code so far:

```scala3
trait MonoidInCategory[T, ~>[_, _], U, P] {
  def unit: U ~> T
  def combine: P ~> T
}

trait GeneralMonoid[T, U, P] extends MonoidInCategory[T, Function1, U, P] {
  def unit: U => T
  def combine: P => T
}

trait FunctionalMonoid[T] extends GeneralMonoid[T, Unit, (T, T)] {
  def unit: Unit => T
  def combine: ((T, T)) => T
}

// this is the monoid we know
trait Monoid[T] extends FunctionalMonoid[T] {
  // the official interface
  def empty: T
  def combine(a: T, b: T): T

  // the hidden interface
  def unit = _ => empty
  override def combine = t => combine(t._1, t._2)
}
```

With that out of the way, I'm going to make one last stretch and declare a `MonoidInCategory` for higher-kinds as well. Same structure, but all the generic types are themselves generic. No biggie:

```scala3
trait MonoidInCategoryK2[T[_], ~>[_[_], _[_]], U[_], P[_]] {
  def unit: U ~> T
  def combine: P ~> T
}
```

## 3. (Endo)Functors

Another known topic that I've talked about &mdash; in an [article](/what-the-functor), a [video](https://www.youtube.com/watch?v=aSnY2JBzjUw) and in the [Cats](https://rockthejvm.com/p/cats) course &mdash; is functors. They have this structure:

```scala3
trait Functor[F[_]] {
    def map[A, B](fa: F[A])(f: A => B): F[B]
}
```

Functors describe the structure of "mappable" things, like lists, options, Futures, and many others.

For practical reasons why we need functors in Scala, check out the resources above. As for the mathematical properties of functors, they describe "mappings", i.e. relationships between categories, while preserving their structure. The abstract mathematical functor definition is very general, but thankfully we don't need it here. The functors we know (as functional programmers) operate on a single category (the category of Scala types) and describe mappings to the same category (the category of Scala types). In mathematical jargon, this special kind of functor (from a category to itself) is called an *endofunctor*.

In other words, the functors we know and love are actually *endofunctors*.

So we currently have "monoids in the category of", and we have "endofunctors". Before we click the words together, we need some glue.

## 4. The Glue

### 4.1. Functor Transformations

In functional programming, we compute values based on functions. For example, we have things such as

```scala3
trait Function1[-A, +B] {
  def apply(a: A): B
}
```

For *functors*, the higher-kinded version of `Function1` is called a *natural transformation*. The structure looks something like this:

```scala3
trait FunctorNatTrans[F[_], G[_]] {
    def apply[A](fa: F[A]): G[A]
}
```

Examples of natural transformations can be found throughout the Scala standard library, if you know how to look for them. The `.headOption` method on lists is a good example of a natural transformation from lists to options:

```scala3
object ListToOptionTrans extends FunctorNatTrans[List, Option] {
    override def apply[A](fa: List[A]) = fa.headOption
}
```

Even though this might not make too much sense right now, I'm going to remind you of that very general super-monoid definition:

```scala3
trait MonoidInCategoryK2[T[_], ~>[_[_], _[_]], U[_], P[_]]
```

Just take a look at that higher-kinded `~>` type and figure out if it matches the structure of FunctorNatTrans. Once it does, carry on with the article. Seed was planted.

### 4.2 The Id

Take a really hard look at this type:

```scala3
type Id[A] = A
```

Notice if this type fits the structure of `U` in the `MonoidInCategoryK2` definition above. If it does, just move along.

### 4.3 Functor Composition

This is the point where it's going to start getting a bit abstract.

Remember what we did earlier when we generalized the monoid. We started by having a 2-arg method `combine(a: T, b: T): T`, then we generalized that as a single-arg function `((T, T)) => T`, then we generalized the concept of tupling itself, by denoting "products" under the general type P. Then we created a higher-kinded version of that, denoted `P[_]`. This product thing can mean absolutely anything at all:

- tupling two values
- cross-product between two sets
- zipping between two lists of the same size
- wrapping an option inside another option
- parallelizing two futures

For our purposes, we want to create a "product" concept between functors, by wrapping them inside one another:

```scala3
type HKTComposition[F[_], G[_], A] = F[G[A]]
```

But because we're working with endofunctors, we're essentially doing

```scala3
type SameTypeComposition[F[_], A] = F[F[A]]
```

Just remember that `F[F[A]]` thing. We'll need it.

## 5. Monoids in the Category of Endofunctors

This is probably the hardest bit. Here goes.

We can write a special type of `MonoidInCategoryK2`, where

1. the type `T[_]` is a type for which there is a given `Functor[T]` in scope - in other words `T` "is" a functor
2. the type `~>` is the functor natural transformation type (see [4.1](#41-functor-transformations))
3. the type `U[_]` is the identity type (see [4.2](#42-the-id))
4. the type `P` is the functor composition type `F[F[_]]`

Written in Scala, the header of this special monoid looks like this:

```scala3
trait MonoidInCategoryOfFunctors[F[_]: Functor]
extends MonoidInCategoryK2[F, FunctorNatTrans, Id, [A] =>> F[F[A]]] {
    type EndofunctorComposition[A] = F[F[A]] // instead of the type lambda
}
```

Where that final functor composition needs to be written as a generic type, so we express that as a [type lambda](/scala-3-type-lambdas/).

Take a break until you can mentally fit the pieces inside the type arguments of `MonoidInCategoryK2`. I'll explain what the implications are if they work.

Cool.

Once we fit the pieces, then the compiler knows this trait will have the following method definitions:

```scala3
def unit: FunctorNatTrans[Id, F]
def combine: FunctorNatTrans[EndofunctorComposition, F]
```

Let's assume something concrete. Let's imagine somebody implements such a special monoid for lists &mdash; which are functors, because we can easily implement a `Functor[List]`. In this case, our special monoid's methods will look like this:

```scala3
object ListSpecialMonoid extends MonoidInCategoryOfFunctors[List] {
    override def unit: FunctorNatTrans[Id, List] = new FunctorNatTrans[Id, List] {
        // remember Id[A] = A
        override def apply[A](fa: Id[A]): List[A] = List(fa) // create a list
    }

    // remember     EndofunctorComposition[A] = F[F[A]]
    // we know      F = List
    // so           EndofunctorComposition[A] = List[List[A]]
    override def combine = new FunctorNatTrans[EndofunctorComposition, List] {
        override def apply[A](fa: EndofunctorComposition[A]) = fa.flatten
    }
}
```

The thing is, because the `unit` and `combine` methods are so general and abstract, they are quite clunky:

```scala3
val simpleList = ListSpecialMonoid.combine(
    List(
        List(1,2,3),
        List(4,5,6),
        List(7,8,9)
        )
    ) // List(1,2,3,4,5,6,7,8,9)
```

Take a break here to to observe something. Notice that the concept of combination has completely changed. In our first Monoid version, combining meant putting two values in a function. Now, in the case of lists, combining means *flattening lists two levels deep*. The only common ground is "two" (but it's important). The whole concept of what "combine" means was made extremely abstract, and here it means a totally different thing.

Now, we haven't actually made this whole journey just to use the clunky `unit` and `combine` methods. We need something more useful.

```scala3
trait MonoidInCategoryOfFunctors[F[_]: Functor]
extends MonoidInCategoryK2[F, FunctorNatTrans, Id, [A] =>> F[F[A]]] {
    // whoever implements this trait will implement empty/combine

    type EndofunctorComposition[A] = F[F[A]] // instead of the type lambda

    // we can define two other functions
    def pure[A](a: A): F[A] =
        unit(a)

    def flatMap[A, B](ma: F[A])(f: A => F[B]): F[B] =
        combine(summon[Functor[F]].map(ma)(f))
}
```

These two methods are much closer to what we use in real life, because we wrap values and process these [special structures](/monads) all the time with for-comprehensions.

A bit of explanation on that one-liner `flatMap`:

- we assume `F[_]` has a given `Functor[F]` in scope, so we use the `summon` method to obtain it
- because we have a `Functor[F]`, we can say `functor.map(ma)(f)` to obtain a `F[F[B]]`
- because we have the clunky but general `combine` method, we can turn that `F[F[B]]` into a single `F[B]`

And of course, because we have `pure` and `flatMap` for free, we can use them directly:

```scala3
val expandedList = ListSpecialMonoid.flatMap(List(1,2,3))(x => List(x, x + 1))
// List(1, 2, 2, 3, 3, 4)
```

In other words, folks, whoever implements a `MonoidInCategoryOfFunctors` &mdash; which is a monoid in the category of *endofunctors*, as described &mdash; has just written a monad.

## 6. Monads

To have a full equivalence, we need to make the inverse implication. Let's say somebody implemented a monad trait, in the style of Cats:

```scala3
trait Monad[F[_]] extends Functor[F] {
    // the public API - don't touch this
    def pure[A](a: A): F[A]
    def flatMap[A, B](ma: F[A])(f: A => F[B]): F[B]

    // the method from Functor, in terms of pure + flatMap
    override def map[A, B](fa: F[A])(f: A => B) = flatMap(fa)(a => pure(f(a)))
}
```

Many of us are more familiar with this structure, and we can easily implement instances of Monad for various known types. For lists, for example:

```scala3
object ListMonad extends Monad[List] {
  override def pure[A](a: A) = List(a)
  override def flatMap[A, B](ma: List[A])(f: A => List[B]) = ma.flatMap(f)
}
```

This is a piece of cake compared to the rest of the article. However, once we write `pure` and `flatMap`, I'll show you how we can find the exact structure of our general monoid (because it ain't obvious):

```scala3
// ... still inside Monad[F[_]]

type EndofunctorComposition[A] = F[F[A]] // same as before

// auxiliary function I made
def flatten[A](ffa: F[F[A]]): F[A] = flatMap(ffa)(x => x)

// the methods of our general monoid
def unit: FunctorNatTrans[Id, F] =
    new FunctorNatTrans[Id, F] {
      override def apply[A](fa: Id[A]) = pure(fa)
    }

def combine: FunctorNatTrans[EndofunctorComposition, F] =
    new FunctorNatTrans[EndofunctorComposition, F] {
      override def apply[A](fa: F[F[A]]) = flatten(fa)
    }
```

so even though we said

```scala3
trait Monoid[F[_]] extends Functor[F]
```

we can say &mdash; without any change to our public API &mdash; that

```scala3
trait Monad[F[_]]
extends Functor[F]
with MonoidInCategoryK2[F, FunctorNatTrans, Id, [A] =>> F[F[A]]]
```

or, in other words, that if we write a Monad, we actually write a monoid in the category of (endo)functors.

## 7. Conclusion

We've just gone through some serious mental gymnastics here. I hope this makes sense.

I will have one mention, though. The original quote said "monads are _just_ monoids in the category of endofunctors". In this article, we've gone a bit further than that, and we showed how monads are _exactly_ monoids in the category of endofunctors.

If you've read this far, you rock. Thank you.
