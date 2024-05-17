---
title: "Scala 3 and General Type Projections"
date: 2022-05-17
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, scala 3]
excerpt: "Scala general type projections are unsound and were removed in Scala 3 - what do you mean?"
---

This article is about Scala 3. We've talked a lot about the additions in Scala 3 (which you can easily search on the blog), but it's also worth talking about the removals. In particular, this article will focus on the fact that "general type projections are unsound": what that phrase means, what that leads to, and why the feature was removed in Scala 3.

This removal (along with dozens of other changes) was explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## 1. Background and Context

We should know already that we can define classes, objects and traits _inside_ other classes, objects and traits.

```scala
class Outer {
  class Inner
}
```

In this example, each instance of `Outer` gives rise to a different `Inner`:

```scala
val o1 = new Outer
val o2 = new Outer
val i1 = new o1.Inner
val i2 = new o2.Inner
```

The instances `o1` and `o2` result in the different _types_ `o1.Inner` and `o2.Inner`, and they're completely unrelated.

```scala
val i3: o1.Inner = new o2.Inner // compiler error (type mismatch)
```

However, as we explain in the [Advanced Scala course](https://rockthejvm.com/p/advanced-scala), all possible `o.Inner` types are subtypes of a general type called `Outer#Inner`. This is called a _type projection_, which is a pretty cool feature of Scala's type system.

In Scala 2, it was also possible to express type projections based on types which were themselves abstract, i.e. abstract type members or generic type arguments. So it was possible to write something like `A#Inner`, where the compiler only knows that `A <: Outer`, for instance. This is called a "general" or "abstract" type projection, because the root `A` is not concrete.

We used abstract type projections in the Scala 2 [type-level programming mini-series](/type-level-programming-part-1/) to force the compiler to make type resolutions at compile time, to a wonderful effect (sorting types at compile time)

The problem is, it's not quite right. Martin Odersky initially signalled this by showing [an example](https://github.com/lampepfl/dotty/issues/1050) where the general type projections leads to uncompilable code which does compile and throws an error. The example does not compile in 2.13 anymore so the issue was fixed, but the general argument remains.

## 2. Using General Type Projections

I'll follow upon an exercise that I used in the [Advanced Scala 2 course](https://rockthejvm.com/p/scala-advanced-old) to practice path-dependent types and type projections. The exercise sounds like this &mdash; assume we'd like to build a general library for fetching type-safe fields from a database. We have a general type that describes items in the database, along with an identifier (key) in the folloing form:

```scala
  trait ItemLike {
    type Key
  }

  trait Item[K] extends ItemLike {
    type Key = K
  }
```

We forced the type `Key` in `Item` to be exactly the same as the generic type argument `K`. We'd like to be able to define a method called `get`, such that we pass a `Key` as an argument, and return an _item type_ for which that `Key` was defined. The signature was the goal of the exercise. The goal was that, given some `Item` types such as

```scala
  class StringItem extends Item[String]
  class IntItem extends Item[Int]
```

we would be able to say

```scala
get[IntItem](42) // ok, returns an IntItem
get[StringItem]("Scala") // ok, returns a StringItem
get[StringItem](55) // not ok, should not compile
```

The solution signature was this:

```scala
def get[I <: ItemLike](key: I#Key): I = ??? // implementation not important (and also impossible without some other info)
```

and lo and behold, the code compiles for those previous examples.

## 3. Compiling Code that Breaks

However, let me follow on the process to show you how quickly even this code can lead to trouble at runtime. Assume that we expand this suite of definitions with the following two types:

```scala
trait ItemAll extends ItemLike {
  override type Key >: Any
}

trait ItemNothing extends ItemLike {
  override type Key <: Nothing
}
```

These type bounds don't really make sense, because
- there's no supertype of `Any`
- there's no subtype of `Nothing`

However, the compiler allows setting these bounds (they're called "bad bounds" for obvious reasons) because the compiler allows setting bounds with respect to any type, as long as the bounds do reconcile in a concrete class. Of course, there is no class that is able to extend both types:

```scala
class ItemWeird extends ItemAll with ItemNothing // does not compile
```

However, there's nobody preventing us from "writing" the type `ItemAll with ItemNothing`, even though there's no possible real class that can conform to this type. Let us set up a few constructs that use general type projections and see how they can tie up with the impossibility of defining a value of type `ItemAll with ItemNothing`.

We'll first define a method that returns an identity function, by virtue of a generic type argument which extends `ItemAll`:

```scala
def funcAll[I <: ItemAll]: Any => I#Key = x => x
```

This function compiles and is legal code because, given the fact that `I <: ItemAll`, then the type `I` surely has the type member `Key` which is a supertype of `Any` (because any change in the bounds would lead to uncompilable code), so it must be that `I#Key >: Any`, so the identity function `x => x` is legal and of the type `Any => I#Key`.

We can also write a symmetrical function with respect to the Nothing type:

```scala
def funcNothing[I <: ItemNothing]: I#Key => Nothing = x => x
```

Similarly, if we know `I <: ItemNothing`, then we know that `I` has an abstract type `Key` which is a subtype of `Nothing`. Therefore, the identity function `x => x` works, because the argument `x` is of type `I#Key`, therefore the return value of the function belongs to `I#Key <: Nothing`, so the identity function conforms to the type `I#Key => Nothing`.

Now for the truly evil part:

```scala
def funcWeird[I <: ItemAll with ItemNothing]: Any => Nothing =
  funcAll[I].andThen(funcNothing[I])
```

This function is also legal. There's nobody preventing us from "using" the type `ItemAll with ItemNothing` even though there's no possible concrete type that conforms to it.
1. Because `I <: ItemAll`, we can call `funcAll[I]`, which is an identity function of type `Any => I#Key`.
2. Because `I <: ItemNothing`, we can call `funcNothing[I]`, which is an identity function of type `I#Key => Nothing`.
3. Because the return type of `funcAll[I]` is the same as the argument type of `funcNothing[I]`, we can chain these two.

The result is a compilable abomination which doesn't make sense, because we've made the compiler to delegate the bounds-checking phase to... never. The function we obtain is legal, and it will never work.

Writing anything semi-legitimate in an application, such as

```scala
val anInt: Int = funcWeird("Scala")
println(anInt + 1)
```

will run into...

```txt
Exception in thread "main" java.lang.ClassCastException: class java.lang.String cannot be cast to class scala.runtime.Nothing$ (java.lang.String is in module java.base of loader 'bootstrap'; scala.runtime.Nothing$ is in unnamed module of loader 'app')
	at scala.Function1.$anonfun$andThen$1(Function1.scala:85)
	at com.rockthejvm.part3removals.TypeProjections$.main(TypeProjections.scala:39)
	at com.rockthejvm.part3removals.TypeProjections.main(TypeProjections.scala)
```

And of course it does! The identity function is of type `Any => Nothing`, which means the String we pass to this function will have to be converted to `Nothing`. It doesn't make sense, and the runtime catches up to us.

## 4. Explanation and Conclusion

The reason is the general type projection `I#Key`. Because the compiler allows us to write an abstract type projection, the compiler cannot do any bound compatibility checks on the `Key` member of `I` because `I` is abstract, and therefore it has no information on what `I#Key` can or cannot be.

The phrase "general type projection is unsound" means that allowing this feature would lead to corner cases where the code should not compile, but it does, and leads to the kind of nonsense that we demonstrated earlier.

This article wanted to show you how, and why, the feature of general type projections were removed in Scala 3, with and example and a piece of uncompilable code which does compile and runs into trouble.
