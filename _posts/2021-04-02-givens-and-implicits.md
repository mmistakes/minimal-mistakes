---
title: "Scala 3: How Givens Can Work with Implicits"
date: 2021-04-02
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, scala 3]
excerpt: "This quick article will show you how given instances in Scala 3 can work with Scala 2's implicits."
---

This will be a short article. Here, I'll demonstrate the use of given instances/using clauses combo, and how this can work with the existing implicits-based mechanism.

## 1. Background & Motivation

First, if you're not familiar with given/using combos in Scala 3, I recommend you read these articles first:

- [Given & Using Clauses in Scala 3](/scala-3-given-using/)
- [Givens vs Implicits](/givens-vs-implicits/)

The new given/using combos in Scala 3 were created to reduce some of the power of the `implicit` keyword, which may be easily misused. The main arguments for implicits include:

- implicit arguments, which are now solved with given/using
- type classes, which are also solved with given/using
- extension methods, which now have their own language-level constructs in Scala
- implicit conversions, which now need to be explicitly enforced

## 2. Let's Be Friends

Even as the new given instances/using clauses in Scala 3 were designed to replace the existing implicit val/object + implicit argument combos, the `implicit` keyword has not disappeared from Scala 3. It will be slowly deprecated and eventually removed from the language.

However, this causes a confusion: are we supposed to continue using implicits? How are we going to work with existing codebases?

Short answers:

- No, you shouldn't use implicits anymore. Use the new `given`/`using` combos for implicit values/objects + implicit arguments.
- Use givens.

But how can you use the new givens-based mechanism with existing codebases riddled with implicits?

The `given` mechanism works in the same way as the `implicit` mechanism, for the purpose of finding an instance to insert into a method which requires it. Namely, if you specify a `using` clause, the compiler will look for a `given` instance defined in the following places, in order:

- the local scope where the method is being defined
- the scope of all the explicitly imported classes, objects and packages
- the scope of the companion object of the class whose method you're invoking
- the scope of the companion objects of all the types involved in the method call, if the method is generic

I talk more in depth about this mechanism in the [advanced Scala course](https://rockthejvm.com/p/advanced-scala), but it should suffice for this article.

For example, let's consider a simple no-arg method which requires a `given` instance:

```scala3
def aMethodWithGivenArg[T](using instance: T) = instance
```

This is pretty much the definition of the built-in `summon[T]` method in Scala 3. If you call `aMethodWithGivenArg[Int]`, the compiler will look for a `given` value of type `Int` in the following places:

- the scope where we defined the method
- the scope of all imports
- the scope of the companion object of the class where this method is defined (if we defined it in a class)
- the scope of all companions of the types involved in the call: in this case, the `Int` object

So if we define

```scala3
given meaningOfLife: Int = 42
```

we can call

```scala3
val theAnswer = aMethodWithGivenArg[Int] // 42
```

The exact same mechanism works in the case of a method taking an implicit argument:

```scala3
def aMethodWithImplicitArg[T](implicit instance: T) = instance
```

This is exactly the definition of the built-in `implicitly[T]` method in Scala 2 (also available in Scala 3 while implicits are still here). If you call `aMethodWithImplicitArg[Int]`, the compiler will run the exact same search for an `implicit Int`:

- scope of class/object of the method
- scope of imports
- scope of companion
- scope of ALL companions of the types involved, in this case the `Int` object

So as you can see, the mechanism is identical: if we define an implicit

```scala3
implicit meaningOfLife: Int = 43
```

then we would be able to call the method as

```scala3
val theAnswer = aMethodWithImplicitArg[Int] // 43
```

In order to be able to run a smooth transition between Scala 2 and Scala 3, the mechanism for finding given/implicit instances is identical, so you can keep assuming a similar mental model, with a slightly different syntax: `given`/`using` instead of `implicit`.

Now, in order to be able to interface with code written with `implicit`s, you can simply define your new methods with `given`/`using`, and your existing implicit values will work fine:

```scala3

// new method
def aMethodWithGivenArg[T](using instance: T) = instance

// old implicit
implicit val theOnlyInt: Int = 42

val theInt: Int = aMethodWithGivenArg[Int] // 42
```

It also works vice-versa: if you're working with an old method with implicits, and you're now defining `given` values, that'll work too:

```scala3
// old method
def aMethodWithImplicitArg[T](implicit instance: T) = instance

// new given
given meaningOfLife: Int = 42

val theAnswer = aMethodWithGivenArg[Int] // 42
```

At the same time, compiler will trigger ambiguities if it finds both an `implicit val` or a `given` in the same scope:

```scala3
// old method
def aMethodWithImplicitArg[T](implicit instance: T) = instance

// confusion
given meaningOfLife: Int = 42
implicit val theOnlyInt: Int = 42
```

This will happen regardless if your method takes an `implicit` argument or has a `using` clause.

## 3. Conclusion

In this article, we learned that the new `given`/`using` mechanism works in the same way as the old `implicit` val/object + `implicit` argument, and we can interoperate between them without any problems. This capability was created for our peace of mind as we move to Scala 3.

That said, going forward, we should all be using the new `given`/`using` structures from now on.
