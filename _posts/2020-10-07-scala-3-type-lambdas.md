---
title: "Type Lambdas in Scala 3"
date: 2020-10-06
header:
  image: "/images/blog cover.jpg"
tags: [scala, type system]
excerpt: "Exploring a quick but powerful structure in Scala 3 - type lambdas. This will help you think higher-level." 
---

This article is a bit more difficult &mdash; it's aimed at the experienced Scala developer who can think at a higher level. Ideally, you've read the [previous article](https://rockthejvm.com/scala-types-kinds) - it serves as a prep for this one. Type lambdas are simple to express in Scala 3, but the ramifications are deep.

## 1. Background

We discussed in the [previous article](https://rockthejvm.com/scala-types-kinds) about categorizing types in Scala into _kinds_. Scala 3 is no different here. However, it introduces a new concept and a syntactic structure to express it, which might look daunting and hard to wrap your head around.

To quickly recap:

  - Scala types belong to _kinds_. Think of kinds as _types of types_.
  - Plain types like `Int`, `String` or your own non-generic classes belong to the _value-level_ kind &mdash; the ones you can attach to values.
  - Generic types like `List` belong to what I called the level-1 kind &mdash; they take plain (level-0) types as type arguments.
  - Scala allows us to express higher-kinded types &mdash; generic types whose type arguments are also generic. I called this kind the level-2 kind.
  - Generic types can't be attached to values on their own; they need the right type arguments (of inferior kinds) in place. For this reason, they're called type constructors.
  
## 2. Types Look Like Functions

As I mentioned before, generic types need the appropriate type arguments before they can be attached to a value. We can never use the `List` type directly to a value, but only `List[Int]` (or some other concrete type).

You can therefore think of `List` (the generic type itself) as similar to a function, which takes a level-0 type and returns a level-0 type. This "function" from level-0 types to level-0 types represents the _kind_ which `List` belongs to. In Scala 2, representing this such a type was horrible (`{ type T[A] = List[A] })#T`, yuck). In Scala 3, it looks much more similar to a function:

```scala3
[X] =>> List[X]
```

Read this structure as "a type that takes a type argument `X` and results in the type `List[X]`". This does the exact same thing as the `List` type (by itself): takes a type argument and results in a new type.

Some more examples in increasing order of complexity:

  - `[T] =>> Map[String, T]` is a type which takes a single type argument `T` and "returns" a `Map` type with `String` as key and `T` as values
  - `[T, E] =>> Either[Option[T], E]` is a type which takes two type arguments and gives you back a concrete `Either` type with `Option[T]` and `E`
  - `[F[_]] =>> F[Int]` is a type which takes a type argument which is itself generic (like `List`) and gives you back that type, typed with `Int` (too many types, I know)

## 3. Why We Need Type Lambdas

Type lambdas become important as we start to work with higher-kinded types. Consider Monad, one of the most popular higher-kinded type classes. In its simplest form, it looks like this:

```scala
trait Monad[M[_]] {
  def pure[A](a: A): M[A]
  def flatMap[A, B](m: M[A])(f: A => M[B]): M[B]
}
``` 

You might also know that `Either` is a monadic data structure (another article on that, perhaps), so we can write a `Monad` for it. However, `Either` takes two type arguments, whereas `Monad` requires that its type argument take only one. How do we write it? We would like to write something along the lines of

```scala
class EitherMonad[T] extends Monad[Either[T, ?]] {
  // ... implementation
}
```

In this way, this `EitherMonad` could work for both `Either[Exception, Int]` and `Either[String, Int]`, for example (where `Int` is the desired type). Given an error type `E`, we'd like `EitherMonad` to work with `Either[E, Int]` whatever concrete `E` we might end up using.

Sadly, the above structure is not valid Scala. 

The answer is that we would write something like

```scala 3
class EitherMonad[T] extends Monad[[E] =>> Either[T, E]] {
  // ... implementation
}
```

It's as if we had a two-argument function, and we needed to pass a partial application of it to another function.

If this is really abstract and hard to wrap your head around, I feel ya.

Prior to Scala 3, libraries like Cats used to resort to compiler plugins ([kind-projector](https://github.com/typelevel/kind-projector)) to achieve something akin to the `?` structure above. Now in Scala 3, it's expressly permitted in the language.

## 4. Conclusion

With a simple syntactic structure, Scala 3 solved a problem that API designers had been facing (and bending over backwards) for ages - how to define higher-kinded types where some type arguments are left "blank".

In a future article, we'll talk about some more advanced capabilities (and pitfalls) of type lambdas.

