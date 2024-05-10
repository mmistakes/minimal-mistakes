---
title: "Semigroups and Monoids in Scala"
date: 2021-03-19
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, cats]
excerpt: "This article is about Monoids and Semigroups as a gentle introduction to functional abstractions and to how the Cats library works."
---

This article is for the comfortable Scala programmer. The code here will be written in Scala 3, but it's equally applicable in Scala 2 with some syntax adjustments &mdash; which I'm going to show you as needed.

## 1. Objective

The goal of Monoids, Semigroups, [Monads](/monads/) and other abstractions in functional programming is not so that we can inject more math into an already pretty abstract branch of computer science, but because these abstractions can be incredibly useful. As I hope the following code examples will demonstrate, many high-level constructs expressed as type classes can help make our API more general, expressive and concise at the same time, which is almost impossible without them.

This article will focus on Semigroups and Monoids.

## 2. Semigroups

A semigroup is defined loosely as a set + a combination function which takes two elements of that set and produces a third, still from the set. We generally express this set as a type, so for our intents and purposes, a semigroup is defined on a type, which has a combine method taking two values of that type and producing a third.

Long story short, a semigroup in Scala can be expressed as a generic trait:

```scala3
trait Semigroup[T] {
    def combine(a: T, b: T): T
}
```

That's it! That's a semigroup. With this trait, we can then create instances of semigroups which are applicable for some types that we want to support:


```scala3
val intSemigroup: Semigroup[Int] = new Semigroup[Int] {
  override def combine(a: Int, b: Int) = a + b
}

val stringSemigroup: Semigroup[String] = new Semigroup[String] {
  override def combine(a: String, b: String) = a + b
}
```

## 3. Semigroups as a Type Class

To make these semigroups &mdash; which are essentially 2-arg combination funcitons &mdash; actually useful, we're going to follow the [type class](/why-are-typeclasses-useful/) pattern. We've already defined the general API of the type class' trait, so we're going to turn to these type class instances and turn them into [given instances](/scala-3-given-using/), or into implicit values/objects for Scala 2. For ergonomics, we'll also move them into an appropriate enclosure (usually an object):

```scala3
object SemigroupInstances {
  given intSemigroup: Semigroup[Int] with
    override def combine(a: Int, b: Int) = a + b

  given stringSemigroup: Semigroup[String] with
    override def combine(a: String, b: String) = a + b
}
```

(using the Scala 3 syntax as of March 2021, which is very close to the final thing)

Now, in order to be able to use these instances explicitly, we need a way to summon them, either with the `summon` method in Scala 3, or with `implicitly` in Scala 2, or with our own structure e.g. an apply method:

```scala3
object Semigroup {
  def apply[T](using instance: Semigroup[T]): Semigroup[T] = instance
}
```

After that, we can use our semigroups to obtain new values:

```scala3
import SemigroupInstances.given
val naturalIntSemigroup = Semigroup[Int]
val naturalStringSemigroup = Semigroup[String]

val meaningOfLife = naturalIntSemigroup.combine(2, 40)
val language = naturalStringSemigroup.combine("Sca", "la")
```

But why do we need this fancy structure, when we already have the `+` operator for both ints and strings?

## 4. The Problem Semigroups Solve

Let's assume you're creating a tool for other programmers, and you want to expose the ability to collapse lists of integers into a single number (their sum), and lists of strings into a single string (their concatenation). Aside from ints and strings, you want to support many other types, and perhaps others that your users might need in the future. Without semigroups, we'd write something like

```scala3
def reduceInts(list: List[Int]): Int = list.reduce(_ + _)
def reduceStrings(list: List[String]): String = list.reduce(_ + _)
```

... and so on for every type you might want to support in the future. I hope the implementations rang a bell, because they look the same. Don't repeat yourself.

So, in our quest to make things general (and also extensible for the future), we can collapse the 3802358932 different API methods into a single one, of the form

```scala3
def reduceThings[T](list: List[T])(using semigroup: Semigroup[T]): T = list.reduce(semigroup.combine)
```

(Scala 2 would have `implicit` instead of `using`)

... and you're done! Any time there's a `given` Semigroup for the type you need, you can simply call

```scala3
reduceThings(List(1,2,3)) // 6
reduseThings(List("i", "love", "scala")) // "ilovescala"
```

which is not only more elegant and more compact, but this can be applied to any type you might ever need, provided you can write a Semigroup instance for that type and make that a `given`.

Long story short, a semigroup helps in creating generalizable 2-arg combinations under a single mechanism.

## 5. Semigroups as Extensions

Still, we can move further and make our API even better-looking. Because we have Semigroup as a type class, we might want to create an extension method that is applicable for any two items of type T for which there is a `Semigroup[T]` in scope:

```scala3
object SemigroupSyntax {
  extension [T](a: T)
    def |+|(b: T)(using semigroup: Semigroup[T]): T = semigroup.combine(a, b)
}
```

In Scala 2, that extension method would need to be created as a method of an implicit class:

```scala3
object SemigroupSyntax {
  implicit class SemigroupExtension[T](a: T)(implicit semigroup: Semigroup[T]) {
    def |+|(b: T): T = semigroup.combine(a, b)
  }
}
```

Whichever version you use, this means that wherever you have a Semigroup in scope, you can simply use the extension method `|+|`, which also happens to be infix-able, i.e. you can say `x |+| y`. Our generalizable API can also be made more compact and better looking by changing it to this:


```scala3
import SemigroupSyntax._
def reduceCompact[T : Semigroup](list: List[T]): T = list.reduce(_ |+| _)
```

There's a lot happening here:

- the import adds the extension method capability, provided you also have access to instances of Semigroup for the types you want to use
- `[T : Semigroup]` means that there's a `given` (Scala 3) or `implicit` (Scala 2) instance of `Semigroup[T]` in scope
- `_ |+| _` is possible since the presence of the Semigroup unlocks the extension method `|+|`

But if you've followed the steps, then this `reduceCompact[T : Semigroup](list: List[T]): T` is the single API you'll ever need to be able to collapse any list to a single value. Now, you'll be able to simply write

```scala3
val sum = reduceCompact((1 to 1000).toList)
val text = reduceCompact(List("i", "love", "scala"))
```

One method to rule them all.  This is one of the reasons why we use Semigroups, Monoids, Monads, Traverse, Foldable and many other type classes.

## 6. Monoids

With the background of Semigroups, Monoids should feel like a piece of cake now.

Monoids are Semigroups with a twist: besides the 2-arg combination function, Monoids also have an "identity", aka a "zero" or "empty" element. The property of this zero element is that `combine(zero, x) == x` for all `x` in the set (type in our case).

In other words, Monoids share the trait

```scala3
trait Monoid[T] extends Semigroup[T] {
    def empty: T
}
```

Following the structure from Semigroups, we can follow a very similar type class pattern:

```scala3
object MonoidInstances {
  given intMonoid: Monoid[Int] with {
    def combine(a: Int, b: Int): Int = a + b
    def empty: Int = 0
  }

  given stringMonoid: Monoid[String] with {
    def combine(a: String, b: String): Int = a + b
    def empty: String = ""
  }
}
```

Now, since Monoid shares the same 2-arg combination function with Semigroup, there's no point in adding yet another extension method `|+|` since Semigroups are already sufficient for unlocking the method.

The only thing we might want to change is the organization of `given` instances. Since we have two `given`s for Monoid and two `given`s for Semigroup, they might come into conflict if we import both (because both are also semigroups). Therefore, it's usually a good idea to organize type class instances per _supported type_ instead of per type class. So to refactor our `MonoidInstances` and `SemigroupInstances`, we'll instead have

```scala3
object IntInstances {
  given intMonoid: Monoid[Int] with {
    def combine(a: Int, b: Int): Int = a + b
    def empty: Int = 0
  }
}

object StringInstances {
  given stringMonoid: Monoid[String] with {
    def combine(a: String, b: String): Int = a + b
    def empty: String = ""
  }
}
```

and both will serve as both Semigroups or Monoids depending on which type class we require; all we need to do is `import IntInstances._` and we're good to go.

## 7. The Cats Library

The way we organized our code is very, _very_ similar to how the Cats library organizes most type classes. In fact, both Semigroups and Monoids are already implemented in Cats and you can use them like this:

```scala3
import cats.Semigroup // similar trait to what we wrote
import cats.instances.int._ // analogous to our IntInstances import
val naturalIntSemigroup = Semigroup[Int] // same apply method
val intCombination = naturalIntSemigroup.combine(2, 46) // same combine method

// once the semigroup is in scope
import cats.syntax.semigroup._ // analogous to our SemigroupSyntax import
val anIntSum = 2 |+| 3
```

We dicsuss a lot of other aspects related to Semigroups (and much more) in the [Cats course](https://rockthejvm.com/p/cats) if you're interested.

## 8. Conclusion

In this article, we discussed two common type classes used in Cats and other FP libraries, and we showed what kind of practical problems they solve &mdash; besides the mathematical abstractions.

Hopefully after reading this article, you'll find that such type classes are not really rocket science, and you'll start to use them more in your Scala code once you understand their utility.
