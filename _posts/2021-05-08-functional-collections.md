---
title: "Scala Functional Collections"
date: 2021-05-08
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, collections]
excerpt: "A short article with a powerful idea about functional collections many Scala programmers do not know about."
---

This article is more beginner-friendly, so all you need is a basic understanding of Scala syntax, (partial) functions and collections. In what follows, I'll share some ideas about functional collections that many Scala developers are unaware of.

These ideas are actually what sparked my interest in Scala and functional programming in the first place &mdash; when one of my friends talked about this cool language he discovered (Scala) some 10 years ago and how often his mind was blown, I couldn't resist diving into it myself.

This is a compact version of a thought experiment we follow &mdash; and then write code for &mdash; in the [advanced Scala course](https://rockthejvm.com/p/advanced-scala), once we lay some foundations of FP.

No libraries are required for this article, as we will write plain Scala. Both Scala 2 and Scala 3 will work just as fine.

## 1. Exploring Functional Sets

Think of sets for a moment &mdash; those well-known collections of objects that don't allow for duplicates. The implementation of sets &mdash; be it tree-sets, hash-sets, bit-sets, etc &mdash; is less important than what they _mean_.

Let's build a small set:

```scala
val aSet = Set(1,2,3,4,5)
```

The critical API of a set consists of

- the ability to tell whether an item is in the set or not
- the ability to add an element to a set (and if it exists, don't add it again)
- the ability to remove an element from the set (and if it doesn't exist, don't remove it again, of course)

Let's concentrate on the first capability at the moment. The way we tell whether an element is in the set is by calling `contains`, or `apply`:

```scala
aSet.contains(2) // true
aSet(2) // also true
```

Notice that the apply method makes the set "callable" like a function. At the same time, that invocation always returns a value (true or false), for any argument you pass to it.

So notice that a set behaves like a function `A => Boolean`, because you can pass any argument of type A, and you'll get a Boolean (whether or not the argument is in the set).

Here's an outrageous idea: **sets ARE functions**!

If you dive deeper into the Set definition from the standard library, you'll eventually find a declaration that fits:

```scala
trait Set[A] extends Iterable[A]
    with collection.Set[A]
    with SetOps[A, Set, Set[A]]
    with IterableFactoryDefaults[A, Set] {
  ...
}

// in the scala.collection.immutable package

trait SetOps[A, +CC[X], +C <: SetOps[A, CC, C]]
  extends collection.SetOps[A, CC, C] {
  ...
}

// in the general scala.collection package

trait SetOps[A, +CC[_], +C <: SetOps[A, CC, C]]
  extends IterableOps[A, CC, C]
    with (A => Boolean) { // <-- jackpot!
  ...
}
```

## 2. Writing a Small Functional Set

Here's a small experiment &mdash; let's write a small implementation of a set that implements the functional interface `A => Boolean`:

```scala
trait RSet[A] extends (A => Boolean) {
    def apply(x: A): Boolean = contains(x)
    def contains(x: A): Boolean
    def +(x: A): RSet[A]
    def -(x: A): RSet[A]
}
```

The main trait implements the crucial Set API:

- testing if an element is in the set
- adding an element
- removing an element

Let's then continue with an implementation of an empty set, correctly typed. The standard library uses an object typed with `Set[Any]` and then type-checked via casting, but let's use a small case class for our experiment:

```scala
case class REmpty[A]() extends RSet[A] {
    override def contains(x: A) = false
    def +(x: A): RSet[A] = ???
    def -(x: A): RSet[A] = this
}
```

The implementation of 2 out of 3 methods is easy:

- the set doesn't contain anything, so `contains(x) == false` for all x in A
- the set can't remove anything, so return the same set

We'll come back to the third method shortly.

Let's now consider a set given by a property, i.e. similarly to how we were taught in math classes. For example, the set of all even natural numbers is something like `{ x in N | x % 2 == 0 }`. Pure sets in mathematics are described by their properties. Some sets may be finite, or infinite, some may be countable (or not).

We're not going to dive super-deep into the rabbit hole &mdash; that's a job for my students in the advanced Scala course &mdash; but let's try declaring a small set in terms of the property of their elements (a property-based set):

```scala
case class PBSet[A](property: A => Boolean) extends RSet[A] {
    def contains(x: A): Boolean = property(x)
    def +(x: A): RSet[A] = new PBSet[A](e => property(e) || e == x)
    def -(x: A): RSet[A] = if (contains(x)) new PBSet[A](e => property(e) && e != x) else this
}
```

Let's look at the main API methods:

- this set is all about the property of the elements, so `contains` returns true only if that property is satisfied
- adding an element means adjusting the property so that it also holds true for the element we want to add
- removing an element means adjusting the property so that it definitely returns false for the element we're removing

And that's it! The set will not contain duplicates nor change if we try removing a non-existent element, because neither makes any sense now.

Coming back to REmpty's add method, it will look like this:

```scala
def +(x: A): RSet[A] = new PBSet[A](_ == x)
```

A single-element set is a property-based set, where the property only returns true for that particular element.

Of course, we can test this out. Let's make a small helper method that will allow us to build sets more easily:

```scala
object RSet {
  def apply[A](values: A*) = values.foldLeft[RSet[A]](new REmpty())(_ + _)
}
```

Then in main, we can run some tests:

```scala
val first5Elements: RSet[Int] = REmpty[Int]() + 1 + 2 + 3 + 4 + 5
val first5lementsFancy = RSet(1,2,3,4,5)
val first1000Elements = RSet(1 to 1000: _*) // pass as varargs

first5Elements(42) // false
first5lementsFancy(3) // true
first1000Elements(68) // true
```

Is this cool or what?

The interesting thing about this set definition is that you can now declare _infinite_ sets, just based on their property. For example, the set of even natural numbers is now trivial:

```scala
val allEvens = PBSet[Int](_ % 2 == 0)
```

You can then add other operations on sets, e.g. intersection, union, difference, concatenation (even with infinite sets). Go wild!

## 3. Other Functional Collections

The idea above blew my mind when I first discovered it, roughly 10 years ago. I was always under the impression that a collection must hold _elements_, but here we have a completely different approach to it. Of course, nobody is naive, memory is not free: we're storing increasingly complex (and memory-occupying) properties instead of elements. But the mental model is the best value for this idea.

With the functional approach for sets clarified, we can easily extend this to other collections.

For example, think of the main API of a sequence (Seq) in Scala: sequences have the sole job of giving you an item at an index. If that index is out of bounds, an exception will be thrown.

```scala
val aSeq = Seq(1,2,3)
aSeq(1) // 2
aSeq(5) // Out of bounds!
```

Question: what functional "thing" is invokable like a function, but _not on all arguments_?
Hint: it starts with "P" and rhymes with "artialFunction".

Yep, I said it: sequences are partial functions. The type of the argument is an Int (the index which you want to access) and the return type is A (the type of the Seq). It's also found in the standard library:

```scala
// scala.collection.immutable
trait Seq[+A] extends Iterable[A]
                 with collection.Seq[A]
                 with SeqOps[A, Seq, Seq[A]]
                 with IterableFactoryDefaults[A, Seq] {
  ...
}

// scala.collection
trait Seq[+A]
  extends Iterable[A]
    with PartialFunction[Int, A] // <-- jackpot
    with SeqOps[A, Seq, Seq[A]]
    with IterableFactoryDefaults[A, Seq]
    with Equals {
  ...
}
```

As a mental exercise: try implementing a Seq as a `PartialFunction[Int, A]`!

Same idea is applicable to Maps. Maps are "invokable" objects on a key, returning a value (if it exists) or throwing an exception (if it doesn't). What's that again? PartialFunction!

```scala
// scala.collection.immutable
object Map extends MapFactory[Map] { ... }
//      ^                      ^
//      | immutable Map        | general Map

// scala.collection
trait Map[K, +V]
  extends Iterable[(K, V)]
    with collection.Map[K, V]
    with MapOps[K, V, Map, Map[K, V]]
    with MapFactoryDefaults[K, V, Map, Iterable] {
  ...
}

// still there
trait MapOps[K, +V, +CC[_, _] <: IterableOps[_, AnyConstr, _], +C]
  extends IterableOps[(K, V), Iterable, C]
    with PartialFunction[K, V] // <-- here
{
  ...
}
```

## 4. Conclusion

We've just learned that many critical Scala collections are not just "functional", but they are _actual_ functions. If your mind was at least moved a bit (not necessarily blown away), I'm really happy. These kinds of concepts make functional programming great, and Scala awesome.
