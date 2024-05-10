---
title: "Types, Kinds and Type Constructors in Scala"
date: 2020-10-06
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "Scala has a powerful type system. We look at how Scala types can be organized, what type constructors are, and why we should care."
---

This article is for the mature Scala developer. We aren't looking at the basics here, and some abstract thinking will be required for this one.

## 1. Background

What's up with these types in Scala? The truth is Scala's type system is extremely powerful, enough to confuse even some of the advanced devs.

Generics in particular are one hard topic, for which we've already posted [some content](https://www.youtube.com/watch?v=b1ftkK1zhxI) (and more to come). The presence of generics in Scala has some important implications in how we think about types. Now, because one of the main strengths of Scala is the increased productivity of devs by leveraging the type system, thinking about types correctly will directly influence how we design our code.

## 2. Level 0: Value Types

Types in Scala can be organized into _kinds_. I'm going to start the abstract path by looking at something really simple: normal types that we can attach to values.

```scala3
val aNumber: Int = 42
val aString: String = "Scala"
```

Types like `Int`, `String`, or regular types that we define (e.g. case classes) can be attached to values. I'll call them level-0 types. This is the simplest _kind_ of types imaginable &mdash; we use these types every day in our Scala code.

## 3. Level 1: "Generics"

As our code gets more complicated, we are increasingly interested in reusing our code for many types at once. For example, the logic of a singly linked list is identical, regardless of the type of elements it contains. As such, we attach type arguments to the new type we deeclare:

```scala3
class LinkedList[T]
class Optional[T]
```

We generally call the types such as `LinkedList` or `Optional` above simply "generic". They can work on `Int`s, `String`s, `Person`s and other level-0 types. However, these new types cannot be attached to a value on their own. They need to have a real type argument before we can use a value with them:

```scala3
val aListOfNumbers: LinkedList[Int] = new LinkedList[Int]
val aListOfStrings: LinkedList[String] = new LinkedList[String]
```

So notice we need to use a level-0 type as a type argument before we can use these new types. The type `LinkedList[Int]` is a value type (level-0), because it can be attached to a value. Because we can only use LinkedList after we pass a level-0 type as argument to it, LinkedList is a higher-level type. I'll call it a level-1 type, because it takes type arguments of the inferior kind.

Level-1 is the _kind_ of types which receive type arguments of the inferior level (level-0).

## 4. Type Constructors

Look at how we attached the type `LinkedList[Int]` to the previous value. We used the level-1 type `LinkedList` and we used the level-0 type argument `Int` to create a new level-0 type. Does that sound similar to something else you've seen?

If you think about it, this mechanism looks similar to a function: take a function, pass a value to it, obtain another value. Except in this case, we work with types: take a level-1 type, pass a level-0 type argument to it, obtain another level-0 type.

For this reason, these generic types are also called type constructors, because they can _create_ level-0 types. `LinkedList` itself is a type constructor: takes a value type (e.g. `Int`) and returns a value type (e.g. `LinkedList[Int]`).

## 5. Level 2 and Beyond: Higher-Kinded Types

Up to this point, Scala has similar capabilities to Java. However, the Scala type system moves a step further, by allowing the definitions of generic types _whose type arguments are also generic_. We call these higher-kinded types. I'll call them level-2 types, for reasons I'm going to detail shortly. These type definitions have special syntax:

```scala3
// the Cats library uses this A LOT
class Functor[F[_]]
```

The underscore marks the fact that the type argument F is itself generic (level-1). Because this new type takes a level-1 type argument, the `Functor` example above is a level-2 type. In order to use this type and attach it to a value, we need to use a real level-1 type:

```scala3
val functorList = new Functor[List]
val functorOption = new Functor[Option]
```

Notice we did not pass `List[Int]` as a type argument (which would have been a level-0 type), but rather `List` itself (a level-1 type).

Much like `LinkedList`, `Functor` itself is a type constructor. It can create a value type by passing a level-1 type to it. You can think of `Functor` as similar to a function taking a level-1 type and returning a level-0 type.

Scala is permissive enough to allow even higher-kinded types (in my terminology, level-3 and above) with nested `[_]` structures:

```scala3
class Meta[F[_[_]]] // a level 3 type
```

And they would work in a similar fashion - pass a type of an inferior-kind (this case, level 2) to use it:

```scala3
val metaFunctor = new Meta[Functor]
```

This example is a bit contrived, because we almost never need to use types beyond level-2. Level-2 types already pretty abstract as they are &mdash; although we do try to [smoothen the learning curve](https://rockthejvm.com/p/cats).

## 6. More Type Constructors

Now that you know what a type constructor is, we can expand the concept to types which take multiple type arguments, and perhaps of different _kinds_. Examples below:

```scala3
class HashMap[K, V]
val anAddressBook = new HashMap[String, String]

class ComposedFunctor[F[_], G[_]]
val aComposedFunctor = new ComposedFunctor[List, Option]

class Formatter[F[_], T]
val aFormatter = new Formatter[List, String]
```

Given what you've learned so far, you can read these types for what they are:

  - `HashMap` is (by itself) a type constructor taking two level-0 type arguments.
  - `ComposedFunctor` is (by itself) a type constructor taking two level-1 type arguments.
  - `Formatter` is (by itself) a type constructor taking a level-1 type argument and a level-0 type argument.

## 7. Conclusion: Why Should We Care?

We've explored how types in Scala are organized and what type constructors are. Why is this important? How does it help us in real life?

Here's the deal.

  1. When you get started with Scala, you work with normal types, like `Int`s or classes you define, usually plain data structures.
  2. As you work with increasingly complex code, you start noticing patterns in your code. Ideally, you'll also have more power (and responsibility) to shape the future direction of your codebase. You'll use higher-level types and generics to accomplish that. It's almost impossible not to.
  3. As you become more experienced and notice additional subtle common functionality in your code, you may look to some pure FP libraries like [Cats](https://typelevel.org/cats) to manage logic.

Without good understanding of Scala's type system, not only will this progression seem hard, but you'll also increasingly resist it. As you resist it, you place obstacles to your own growth as a Scala engineer. Conversely, with good understanding of types in Scala, this progression will not only be natural to you, but you'll enjoy your development and abstract code will seem like child's play.
