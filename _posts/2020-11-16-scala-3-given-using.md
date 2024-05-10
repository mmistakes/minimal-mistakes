---
title: "Given and Using Clauses in Scala 3"
date: 2020-11-16
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala 3]
excerpt: The given/using clauses are some of the most important features of Scala 3. Read on for the essential concepts and how to use them."
---

In this article, we'll take a structured look at the new given/using clauses in Scala 3, which promises to be a big leap forward.

Unlike other posts on the topic, this article is also approachable for Scala beginners. The given/using pair in Scala 3 is often described in comparison with implicits &mdash; which are themselves really powerful and hard to learn if you're starting out &mdash; but here I'll make no such references or assumptions.

So if you're starting out directly on Scala 3, or you're a Scala 2 developer without too much experience with implicits, this one is for you. If you happen to know how implicits work, that'll only be a plus.

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## A Small Problem

Here's a situation. Let's say we write a nation-wide census application. Something like the following case class (perhaps with some more fields) would be used everywhere:

```scala3
case class Person(surname: String, name: String, age: Int)
```

It would make sense for instances of Person to be ordered in various data structures. For applications like these, ordering Persons needs to have a "standard" algorithm, usually alphabetically by surname:

```scala3
val personOrdering: Ordering[Person] = new Ordering[Person] {
  override def compare(x: Person, y: Person): Int =
    x.surname.compareTo(y.surname)
}
```
(you can use your favorite comparison class instead of `Ordering` if you like)

In other words, we need a single standard `Ordering[Person]` that we need to use everywhere. At the same time, making that instance available and using it explicitly would make the code cumbersome, because such a standard ordering is _assumed_, and (as a developer) we want to focus on the logic rather than pass the same standard value everywhere:

```scala3
def listPeople(persons: Seq[Person])(ordering: Ordering[Person]) = ...
def someOtherMethodRequiringOrdering(alice: Person, bob: Person)(ordering: Ordering[Person]) = ...
def yetAnotherMethodRequiringOrdering(persons: List[Person])(ordering: Ordering[Person]) = ...
```

When we call these methods, we first need to

- find the standard ordering, without needing to re-instantiate it
- plug it into all these methods

Instead of doing this explicitly every single time for every single method, we can delegate this menial task to the compiler.

## Given/Using Clauses

We'll change our code in two small ways.

First, our standard ordering will be considered a "given", that is, an automatically created instance which is readily available to be injected in the "right place". The structure of the declaration will look like this:

```scala3
given personOrdering: Ordering[Person] with {
  override def compare(x: Person, y: Person): Int =
    x.surname.compareTo(y.surname)
}
```

So notice we aren't "assigning" the Ordering instance to a value. We are marking that instance as a "standard" (or a "given"), and we attach a name to it. The name is useful so we can reference this instance and use fields and methods on it, much like any other value.

However, we also need to mark the places where this given should automatically be injected. For this, we mark the relevant method argument with the `using` clause:

```scala3
def listPeople(persons: Seq[Person])(using ordering: Ordering[Person]) = ...
```

So that when we invoke this method, we don't need to explicitly pass the `ordering` argument:

```scala3
listPeople(List(Person("Weasley", "Ron", 15), Person("Potter", "Harry", 15))) // <- the compiler will inject the ordering here
```

This leads to much cleaner code, especially in large function call chains.

## Importing Givens

The compiler can inject a given instance where a `using` clause is, if it has access to a given instance of that type in scope. If we continue the example above, a large-scale application will not be written in a single file, so we need a mechanism for importing given instances.

Let's assume our given instance stays in an `object`:

```scala3
object StandardValues {
  given personOrdering: Ordering[Person] with {
    override def compare(x: Person, y: Person): Int = x.surname.compareTo(y.surname)
  }
}
```

We would import the given instance as

```scala3
import StandardValues.personOrdering
```

which would make it explicit and easy to track down. Alternatively, if we wanted to import a given instance of a particular type &mdash; there can only be one &mdash; we could say:

```scala3
import StandardValues.{given Ordering[Person]}
```

Note that the regular wildcard import `import StandardValues._` would import all definitions _except_ given instances. If we want to bring all given values in scope, we could write:

```scala3
import StandardValues.{given _}
```

## Deriving Givens

As we saw earlier, a given instance will be automatically created and injected where a `using` clause is present. Taking this concept further, what if we had a given instance that depends on another given instance, via a `using` clause?

In Scala 3, we can.

Let's imagine that in our big census application we have many types for which we have `given` instances of `Ordering`. Meanwhile, because we're using pure FP to deal with value absence, we're working with Options, and we need to compare them, sort them etc. Can we automatically create an `Ordering[Option[T]]` if we had an `Ordering[T]` in scope?

```scala3
given optionOrdering[T](using normalOrdering: Ordering[T]): Ordering[Option[T]] with {
  def compare(optionA: Option[T], optionB: Option[T]): Int = (a, b) match {
    case (None, None) => 0
    case (None, _) => -1
    case (_, None) => 1
    case (Some(a), Some(b)) => normalOrdering.compare(a, b)
  }
}
```

This structure tells the compiler, "if you have a given instance of `Ordering[T]` in scope, then you can automatically create a new instance of `Ordering[Option[T]]` with the implementation following the brace. Behind the scenes, the new given structure works similar to a method. If we ever need to call a method such as

```scala3
def sortThings[T](things: List[T])(using ordering: Ordering[T]) = ...

// elsewhere in our code
val maybePersons: List[Option[Person]] = ...
sortThings(maybePersons)
```

the compiler will automatically create an `Ordering[Option[Person]]` based on the existing `Ordering[Person]`, so the call will look like

```scala3
sortThings(maybePersons)(optionOrdering(personOrdering))
```

Of course, that's not what we see (because we don't see anything), but this serves as an analogy to better understand the processes under the hood.

## Where Givens Are Useful

The problem we started with was pretty small, but it's also the easiest to lean into. Given/using clauses, in combination with extension methods &mdash; coming in another article &mdash; are a powerful cocktail of tools, which can be used for (among others):

- type classes
- dependency injection
- contextual abstractions, i.e. ability to use code for some types but not for others
- automatic type creation
- type-level programming

We will explore lots of these problems and how given/using clauses + extension methods solve them as the blog evolves.

In the simplest terms, a `using` clause is a marker to the compiler, so that if it can find a `given` instance of that type in the scope where that definition is used (e.g. a method call), the compiler will simply take that given instance and inject it there.

The obvious restriction is that **there cannot be two `given` instances of the same type in the same scope**, otherwise the compiler would not know which one to pick.

More philosophically, a `given` proves the existence of a type. If the existence of a type can be proven by the compiler, new given instances can be constructed, if they rely on a `using` clause. If we combine given/using combos for certain types, we can prove type relationships at compile time, in a style that looks like [this](/type-level-programming-part-1). In a future article, I'll show you how we can run type-level computations with givens in Scala 3.

## Other Niceties

Notice that in the previous example with the person ordering, once we used the given/using combo, we didn't even need the name of the given instance. In that case, we can simply write:

```scala3
given Ordering[Person] {
  override def compare(x: Person, y: Person): Int =
    x.surname.compareTo(y.surname)
}
```

Sometimes defining instances on the spot might not be convenient, when we already have simpler/better construction tools available (e.g. factory methods, existing values, better constructors). If that is the case, we can create a given instance where the value of it is an expression:

```scala3
given personOrdering: Ordering[Person] = Ordering.fromLessThan((a, b) => a.surname.compareTo(b.surname) < 0)
```

or even make it anonymous:

```scala3
given Ordering[Person] = Ordering.fromLessThan((a, b) => a.surname.compareTo(b.surname) < 0)
```

## Conclusion

The `given` structure allows an instance of a certain type to be automatically constructed, available and inserted wherever a `using` clause for that type is present.

That sentence took me 15 minutes to write.
