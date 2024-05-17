---
title: "The Practical Difference Between Abstract Classes and Traits in Scala"
date: 2020-08-07
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "Abstract classes and traits share a lot of overlap in Scala. How are they actually different?"
---
This short article will compare abstract classes and traits as means of inheritance. This is for the beginner Scala programmer who is just getting started with Scala's inheritance model. If you're trying to figure out which is the best way to create OO-style type hierarchies and abstract classes seem too similar to traits, this article is for you.

## Background

Scala is particularly permissive when it comes to inheritance options. Of course, Scala has a single-class inheritance model, where one can extend a single class. Much like Java, Scala classes can inherit from multiple traits (the equivalent of Java interfaces).

Scala also has the concept of an abstract class, where one can
  - restrict the ability of a class to be instantiated
  - add unimplemented fields or methods

```scala
abstract class Person {
  // the abstract keyword is not necessary in the field/method definition
  val canDrive: Boolean
  def discussWith(another: Person): String
}

val bob = new Person // error - not all members implemented
```

An abstract class may or may not have either abstract (unimplemented) or non-abstract (implemented) methods.

However, traits also share most of the same capabilities:
  - they can't be instantiated by themselves
  - they may have abstract (unimplemented) fields or methods
  - (more importantly) they may have non-abstract (implemented) fields and methods as well

So while teaching Scala at Rock the JVM, I often come across this popular question: how are traits and abstract classes really different?

## The similarity

There is little practical difference between an abstract class and a trait if you extend a single one. If you look at the example below:

```scala
class Adult(val name: String, hasDrivingLicence: Boolean) extends Person {
  override def toString: String = name
  override val canDrive: Boolean = hasDrivingLicence
  override def discussWith(another: Person): String = "Indeed, ${other}, Kant was indeed revolutionary for his time..."
}
```

the code is identical, regardless of whether Person was a trait or an abstract class. So from this point of view, a trait and an abstract class are identical.

## The practical differences

When we move towards multiple inheritance, things start to look different. One of the fundamental differences between a trait and an abstract class is that multiple traits may be used in the inheritance definition of a class, whereas a single abstract class can be extended. Since traits can have non-abstract methods as well, a good (and natural) follow-up question might be: "but what happens if a class inherits from two traits with the same method implemented in different ways?", which resembles the famous diamond problem. Scala solves it with a dedicated mechanism called linearization, which we will discuss in another article.

A second, more practical difference between a trait and an abstract class is that an abstract class can take constructor arguments:

```scala
abstract class Person(name: String, age: Int)
```

whereas traits cannot:

```scala
trait Person(name: String, age: Int) // error
```

That is, at least until Scala 3 comes out - Scala 3 will also allow constructor arguments for traits.

## The subtle difference

When I speak in a live training about the above differences between traits and abstract classes, my audience is usually not impressed - it seems the overlap is so large that there might be no purpose to two different concepts.

However, I always end up with the following reasoning: for good practice, it is always a good idea to make code easy to read, understand and reason about. To this aim, we generally represent "things" as classes, and "behaviors" as traits. This conceptual difference is directly mapped in the language: a "thing" (class) can be a specialized version of another "thing" (also a class), but might incorporate multiple "behaviors" (traits).
