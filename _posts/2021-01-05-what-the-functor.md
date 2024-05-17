---
title: "What the Functor?"
date: 2021-01-05
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, cats]
excerpt: "In this article, we'll explore one of the most used (and useful) concepts in pure functional programming: the Functor. Pretty abstract, so buckle up."
---

This article is pretty general. Although we'll write Scala, the article will focus more on the concept than on some very specific API.

This is one of the lessons of the [Cats course](https://rockthejvm.com/p/cats), which we look at in general terms here.

## 1. Background

Pure functional programming deals with immutable values, and so if we want to transform a data structure, we'll need to create another one. You're probably familiar with the famous `map` method on lists:

```scala3
val anIncrementedList = List(1,2,3).map(x => x + 1) // [2,3,4]
```

This `map` transformation concept can be applied to other data structures as well. Scala programmers are all too familiar with Options &mdash; data structures which may contain zero or one values &mdash; and Try, which is similar (can hold value or exception). Java folks also use `Optional` with the same semantics to Scala's `Option`, and other typed languages have similar structures in place.

The `map` transformation applies to `Option`, `Try` and... some others. We've covered some of those [briefly elsewhere](/monads), and they deserve more attention in a future article.

```scala3
val aTransformedOption = Some(2).map(x => x * 2) // Some(4)
val aTransformedTry = Try(43).map(x => x - 1) // Try(42). Don't try so hard.
```

The point is that this `map` concept is transferable, and it bears the name of Functor.

## 2. Enter Functors

For purely practical reasons, let's consider the following small API for multiplying "mappable" values like lists, options or Try:

```scala3
def do10xList(list: List[Int]): List[Int] = list.map(_ * 10)
def do10xOption(option: Option[Int]): Option[Int] = option.map(_ * 10)
def do10xTry(attempt: Try[Int]): Try[Int] = attempt.map(_ * 10)
```

Every time we'd want to support another "mappable" container (e.g. a binary tree), we'd have to add another method to our API and then build our library or application again. It's a form of code duplication: if you look at the implementation of the 3 methods above, all of them look identical.

There's no need to repeat ourselves. Since we've established that the `map` concept is transferable, we can create an interface for it. In Scala, a "transferable concept" can be easily expressed as a [type class](/why-are-typeclasses-useful). We named this concept a Functor, so we can create the following trait:

```scala3
trait Functor[C[_]] {
  def map[A, B](container: C[A])(f: A => B): C[B]
}
```

The definition is pretty compact, so let's read it slowly:

- `Functor` takes a type argument `C` (for Container) which is itself generic &mdash; think Lists, Options and Try as examples
- the `map` method takes an initial container `C[A]` and a transformation function `A => B`, and we obtain a new container `C[B]`

## 3. Transferring the `map` Concept

In order to use the `map` concept on various data structures, we'd need to create implementations of the `Functor` trait for various structures we'd like to support. For example, on Lists, we would have:

```scala3
given listFunctor as Functor[List] {
  override def map[A, B](container: List[A])(f: A => B) = container.map(f)
}
```

Notice I've used the [given](/scala-3-given-using) syntax of Scala 3. In Scala 2, that would have been an implicit value.




The interesting thing is that once we have Functor instances for all the data structures we'd like to support, our initial "repeated" API would no longer need to be bloated or repeated, and can be generalized:

```scala3
def do10x[C[_]](container: C[Int])(using functor: Functor[C]) = functor.map(container)(_ * 10)
```

So we've reduced this API to a single method, which we can now use on different data structures, provided we have a `given` Functor for that data structure in scope. For example, the call

```scala3
do10x(List(1,2,3))
```

would "just work". Now, this example can be quickly dismissed as something simple because the `map` method exists on Lists, but let's consider a completely new data structure, such as a binary tree:

```scala3
trait Tree[+T]
object Tree {
  def leaf[T](value: T): Tree[T] = Leaf(value)
  def branch[T](value: T, left: Tree[T], right: Tree[T]): Tree[T] = Branch(value, left, right)
}
case class Leaf[+T](value: T) extends Tree[T]
case class Branch[+T](value: T, left: Tree[T], right: Tree[T]) extends Tree[T]
```

If we have a functor in scope, such as

```scala3
given treeFunctor as Functor[Tree] {
  override def map[A, B](container: Tree[A])(f: A => B) = container match {
    case Leaf(value) => Leaf(f(value))
    case Branch(value, left, right) => Branch(f(value), left.map(f), right.map(f))
  }
}
```

then for a Tree instance such as

```scala3
val tree =
  Tree.branch(1,
    Tree.branch(2,
      Tree.leaf(3),
      Tree.leaf(4)),
    Tree.leaf(5)
  )
```

we can just as easily say

```scala3
val tenxTree = do10x(tree)
```

and it would "just work" just as fine.

This is the power of a Functor: it allows us to generalize an API and process any "mappable" data structures in a uniform way, without needing to repeat ourselves.

## 4. Attaching the "Mappable" Concept

We can even go one step further. With Scala 3's extension methods (or with implicit classes in Scala 2), we can "attach" the map method to a data structure that normally does not have it, if we have a Functor for that data structure. Here's a possible implementation:

```scala3
extension [C[_], A, B](container: C[A])(using functor: Functor[C])
    def map(f: A => B) = functor.map(container)(f)
```

In other words, a container `C[A]` will also have access to a new `map` method if we have a functor for that data structure type `Functor[C]` in scope. With this extension method in place, we can simply call the map method on a Tree data structure, such as:

```scala3
val tenxTree2 = tree.map(_ * 10)
```

and it would "just work".

## 5. Conclusion

Functors embody the concept of "mappable" data structures. In Scala, we generally write it as a type class, because we'd like to attach this concept to some data structures (e.g. lists, options, binary trees) but not others. We use Functors to generalize our APIs, so that we don't have to write the same transformations on different data structures. After creating Functor instances, we can even add the `map` extension method to the data structures we would like to support, if it doesn't have it already.
