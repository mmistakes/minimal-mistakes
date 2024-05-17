---
title: "Scala 3: Extension Methods"
date: 2021-04-06
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala 3]
excerpt: "Deconstructing extension methods, one of the most exciting features of the upcoming Scala 3."
---

This article is for the curious folks going from Scala 2 to Scala 3 - we're going to explore extension methods, one of the most exciting features of the upcoming version of the language.

As for requirements, two major pieces are important:

- how implicits work
- how [given/using combos work](/scala-3-given-using/)

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## 1. Background

In Scala 2, we had this concept of adding methods to types that were already defined elsewhere, and which we couldn't modify (like String, or Int). This technique was called "type enrichment", which was a bit boring, so people came up with the more tongue-in-cheek "pimping", which bordered on slang-ish, so the term commonly used is "extension methods", because that's what we're doing.

In Scala 2, we can add extension methods to existing types via implicit classes. Let's say we have a case class

```scala3
case class Person(name: String) {
    def greet: String = s"Hi, I'm $name, nice to meet you."
}
```

In this case, then the following implicit class

```scala3
implicit class PersonLike(string: String) {
    def greet: String = Person(string).greet
}
```

would enable us to call the `greet` method on a String

```scala3
"Daniel".greet
```

and the code would compile &mdash; that's because the compiler will silently turn that line into

```scala3
new PersonLike("Daniel").greet
```

In other words, the `greet` method is an extension to the String type, even though we did not touch the String type at all.

Libraries like [Cats](https://typelevel.org/cats) (which I [teach](https://rockthejvm.com/p/cats) here on the site) do this all the time.

## 2. Proper Extensions

In Scala 3, the `implicit` keyword, although fully supported (for this version), is being replaced:

- `implicit` values and arguments replaced for [`given`/`using`](/scala-3-given-using/) clauses &mdash; see how they [compare with implicits](/givens-vs-implicits/) and how they [work in tandem with implicits](/givens-and-implicits/)
- `implicit` defs (used for conversions) are [replaced with explicit conversions](/givens-vs-implicits/#implicit-conversions)
- `implicit` classes are replaced with proper extension methods &mdash; the focus of this article

So how are extension methods declared?

For our scenario with the string taking an extra method `greet` (which is person-like), we can write an explicit `extension` clause:

```scala3
extension (str: String)
    def greet: String = Person(str).greet
```

And now we can call the `greet` method as before:

```scala3
"Daniel".greet
```

## 3. Generic Extensions

Much like implicit classes, extension methods can be generic. Let's say somebody wrote a new binary tree data structure

```scala3
sealed abstract class Tree[+A]
case class Leaf[+A](value: A) extends Tree[A]
case class Branch[+A](left: Tree[A], right: Tree[A]) extends Tree[A]
```

and we have no access to the source code. On the other hand, we want to add some methods that we normally use on lists, for example. A `filter`, for instance, would be nice. Here's how we could write it:

```scala3
extension [A](tree: Tree[A])
  def filter(predicate: A => Boolean): Boolean = tree match {
    case Leaf(value) => predicate(value)
    case Branch(left, right) => left.filter(predicate) || right.filter(predicate)
  }
```

So the method is generic, in that it can "attach" to any `Tree[T]`.

An even better feature is that the method itself can be generic. Let's see how we can write a `map` method on trees:

```scala3
extension [A](tree: Tree[A])
  def map[B](func: A => B): Tree[B] = tree match {
    case Leaf(value) => Leaf(func(value))
    case Branch(left, right) => Branch(left.map(func), right.map(func))
  }
```

By the way, we can group both extension methods together under a single `extension` clause:

```scala3
extension [A] (tree: Tree[A]) {
  def filter(predicate: A => Boolean): Boolean = tree match {
    case Leaf(value) => predicate(value)
    case Branch(left, right) => left.filter(predicate) || right.filter(predicate)
  }

  def map[B](func: A => B): Tree[B] = tree match {
    case Leaf(value) => Leaf(func(value))
    case Branch(left, right) => Branch(left.map(func), right.map(func))
  }
}
```

(used curly braces, but [indentation regions](/scala-3-indentation/) will also work)

## 4. Extensions in the Presence of Givens

Or, more precisely, in the presence of `using` clauses.

Let's see how we can attach a new method `sum` to our new binary tree data structure, if our type argument is numeric &mdash; in other words, if we have a `given Numeric[A]` in scope:

```scala3
extension [A](tree: Tree[A])(using numeric: Numeric[A]) {
  def sum: A = tree match {
    case Leaf(value) => value
    case Branch(left, right) => numeric.plus(left.sum, right.sum)
  }
}
```

At this point, we can safely use a `Tree[Int]` and call this `sum` method on it:

```scala3
val tree = Branch(Leaf(1), Leaf(2))
val three = tree.sum
```

The `using` clause might be present in the `extension` clause, or in the method signature itself:

```scala3
// works exactly the same
extension [A](tree: Tree[A]) {
  def sum(using numeric: Numeric[A]): A = tree match {
    case Leaf(value) => value
    case Branch(left, right) => numeric.plus(left.sum, right.sum)
  }
}
```

Or even in both places, if you'd like.

## Conclusion

In this article, we've deconstructed the mechanism of `extension` methods. This feature, coupled with the given/using combo, allows for some powerful abstractions including [type classes](/why-are-typeclasses-useful/), DSLs and many more.

I'm pretty confident that Scala 3 will rock. We may have some contention [here and there](/scala-3-indentation/) &mdash; and I absolutely hate the 3-spaces indentation which I will not follow if it becomes "convention" &mdash; but overall, Scala is getting more mature, more expressive, easy and fun to read and write. Which is what a language should be.
