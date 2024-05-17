---
title: "Custom Pattern Matching in Scala"
date: 2021-09-21
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala]
excerpt: "Pattern matching is one of Scala's most powerful features. In this article, we'll how to customize it and create our own patterns."
---

## 1. Background

Pattern matching is one of the most powerful features of the Scala language: it's extremely practical for quick decomposition of data, it's very powerful, easy to use and covers [a lot of use-cases](/8-pm-tricks/).

In this article, we'll learn how to define our own patterns and make our own types compatible with pattern matching. Both Scala 2 and Scala 3 are supported, and you don't need to install any special libraries if you want to follow along.

This article is for Scala developers with _some_ existing experience. The techniques I'm about to show you are not rocket science, but they are nonetheless pretty useful.

## 1. Pattern Matching on Any Type

As you well know, pattern matching is applicable to some groups of types in the Scala library:

- constants
- strings
- singletons
- case classes
- tuples (being case classes as well)
- some collections (you'll now understand why)
- combinations of the above

What if you're dealing with types that do not belong to the list above? What if, for example, you're dealing with data structures from an old Java library that is crucial for your application? Let's say, for the sake of argument, that somebody defined a class

```java
public class Person {
  String name;
  int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String greet() {
    return "Hi, I'm " + name + ", how can I help?";
  }
}
```

And you can't touch that library. Assume you want to be able to decompose instances of `Person` with pattern matching - right now that's impossible. To make things worse, what if your Person class had 243 fields instead of one?

Here's the solution.

Much like Scala has a special method called _apply_, which is often used as a factory method to construct instances, it also has a method called _unapply_ which is used to _deconstruct_ instances through pattern matching.

```scala
object Person {
  def unapply(person: Person): Option[(String, Int)] =
    if (person.age < 21) None
    else Some((person.name, person.age))
}
```

This is an example of an `unapply` method which takes an instance of Person as an argument, and depending on the logic inside &mdash; in our case if they are of legal drinking age in the US &mdash; it will return a tuple wrapped in an Option.

The method might look a bit unintuitive and also pretty useless. However, a method that has this signature will suddenly allow us to write the following:

```scala
val daniel = new Person("Daniel", 99)
val danielsDrinkingStatus = daniel match {
  case Person(n, a) => s"Daniel was successfully deconstructed: $n, $a"
}
```

Let's make the connections.

- `case Person(...)` denotes the name of the pattern. In our case, the name of the pattern is `Person`, so when we write `case Person ...` the compiler looks for an `unapply` method in the `Person` object. It does not need to be the companion of the class, but it's often practiced.
- `daniel match ...` means that the `daniel` instance _is subject to pattern matching_, i.e. is the argument of the `unapply` method. The compiler therefore looks for an `unapply(Person)` method inside the `Person` object.
- `Person(n,a)` means that a tuple of 2 might be returned. Because in our case the compiler found an `unapply` that returns an `Option[(String, Int)]`, the `n` is taken as a `String` and the `a` is the `Int`.
- Why return an `Option`? Because the tuple might be present (pattern was matched) or not (pattern did not match). We'll nuance this a bit later.

In other words, the pattern match tells the compiler to invoke `Person.unapply(daniel)` and if the result is empty, the pattern did not match; if it did, then it will extract the tuple, take its fields and put them through the resulting expression.

This is power already: we've just enabled pattern matching on a custom data type!

## 2. Custom Patterns

A powerful property of `unapply` is that it doesn't need to be connected to

- the companion object of the class in question
- the fields of the class

In other words, we can create another pattern with a totally different name, returning different things:

```scala
object PersonDrinkingStatus {
  def unapply(age: Int): Option[String] =
    if (age < 21) Some("minor")
    else Some("legally allowed to drink")
}
```

The definition above allows me to write the following pattern matching expression:

```scala
val danielsLegalStatus = daniel.age match {
  case PersonDrinkingStatus(status) => s"Daniel's legal drinking status is $status"
}
```

Making the connections again, the compiler invokes `PersonDrinkingStatus.unapply(daniel.age)`. Returning a non-empty `Option[String]` means that the pattern was matched.

Note that the name of the pattern, the type subject to pattern matching and the values deconstructed many not have any connection to each other. It's quite common that the `unapply` methods be stored in the companion object of the class/trait in question.

## 3. Matching sequences

Ever wondered how we can write

```scala
aList match {
  case List(1,2,3) => ...
}
```

In this section, I'll show you how we can enable _any_ data structure for sequential matching exactly like a list. To that end, let's create our own data structure which resembles a singly linked list:

```scala
abstract class MyList[+A] {
  def head: A = throw new NoSuchElementException
  def tail: MyList[A] = throw new NoSuchElementException
}

case object Empty extends MyList[Nothing]
case class Cons[+A](override val head: A, override val tail: MyList[A]) extends MyList[A]
```

We can make this list available for _sequential_ pattern matching by writing a method similar to `unapply` &madsh; it's called `unapplySeq`:

```scala
object MyList {
  def unapplySeq[A](list: MyList[A]): Option[Seq[A]] =
    if (list == Empty()) Some(Seq.empty)
    else unapplySeq(list.tail).map(restOfSequence => list.head +: restOfSequence)
}
```

Ignore the implementation for now, and take a look at its signature. Notice that now the return type is an `Option[Seq[A]]` instead of an option containing some plain value. The `Seq` is a marker to the compiler that the pattern may contain zero, one, or more elements. This automatically unlocks the following pattern matching styles:

```scala
val myList: MyList[Int] = Cons(1, Cons(2, Cons(3, Empty())))
val varargCustom = myList match {
  case MyList(1,2,3) => "list with just the numbers 1,2,3" // patterns with a finite number of values
  case MyList(1, _*) => "list starting with 1"  // patterns with varargs
  case _ => "some other list"
}
```

The mechanism behind `unapplySeq` is similar to that of `unapply`. Once you write an `unapplySeq`, you automatically unlock the vararg pattern, which is one of the less-known tricks I show you in [another article](/8-pm-tricks/).

## 4. Explaining the Known & Conclusion

You know that case classes are automatically eligible for pattern matching. That's because the compiler automatically generates `unapply` methods in the companion objects of the class! Case classes are indeed mega-powerful.

The Scala standard library is also rich in pattern-matchable structures: most collections are decomposable with `unapplySeq`, which is why we can easily write complex patterns on lists:

```scala
val aList = List(1,2,3)
aList match {
  case List(1,2,3) => ... // regular unapplySeq
  case List(1, _*) => ... // varargs, unlocked by unapplySeq
  case 1 :: List(2,3) => ... // case class :: combined with unapplySeq of the rest of the list
  case 1 +: List(2,3) => ... // special pattern name called +:, combined with unapplySeq
  case List(1,2) :+ 3 => ... // same for :+
}
```

Pattern matching is indeed one of the most powerful features of the Scala language. It took Java more than a decade to replicate a fraction of it; however, having pattern matching so powerful and customizable is something we will not see very soon in other JVM languages.
