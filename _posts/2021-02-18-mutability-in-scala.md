---
title: "Mutability in Scala"
date: 2021-02-18
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala]
excerpt: "Although frowned upon by FP purists, creating and managing mutable data structures is important in any language. Scala has some first-class features."
---

Scala is primarily targeted at established software engineers. That means that &mdash; with a few exceptions &mdash; most Scala developers did not pick Scala as their first language. Most of the time, that means Scala developers learned to code via the more traditional programming languages: Java, C (my case), C++, or Python.

When learning to code, the first thing we learn is how to change a variable. We learn to code with the deep, ingrained notion of variables and changing them over time. Soon after, we learn about data structures, which we learn to change as well.

In other words, most of us grew with mutability as a core principle of writing code.

## 1. Introduction

Learning functional programming required us to unlearn some habits and learn new ones. Mutability is usually frowned upon in the pure FP world, because after some experience with pure FP, we understand that code using variables and mutable data structures is harder to read and understand, and more error-prone especially in a multithreaded/distributed setting.

However, that does not mean mutability is bad per se. It's still useful for performance and for interacting with other code (e.g. from Java). Although we as developers are more productive writing purely functional code &mdash; given the mental space cleared by the pure FP principles &mdash; Scala itself is not dogmatic on pure FP. In fact, it has language-level constructs for mutability.

The following has all been tested both on Scala 2 and Scala 3.

## 2. The Simplest Mutation

Scala has the concept of a changeable variable, denoted by `var`. We can say

```scala
var meaningOfLife = 42
meaningOfLife = 45
```

which allows us to change variables over time.

Chances are you find this trivial. However, for some of you, it may very well be surprising.

In my first days as an instructor, I used to teach Scala `val`s and `var`s in the same lesson. But then I learned &mdash; and later [wrote about]("/variables/") &mdash; how learning variables early is not useful for learning and teaching pure functional programming, because it keeps people in their current mental model. Learning FP is a different style of thinking, and changing variables prevents unlearning.

However, after having a taste of pure FP, I then showed my audience how to mutate variables, which they can then integrate into their new mental framework.

## 3. Mutating a data structure

I've never quite been fond of the Java getters and setters when all they did was to access a private field. That would be functionally identical to making that field public &mdash; perhaps except if the getters/setters were synchronized, but let's be honest, almost nobody does that.

Getters and setters can also be used to _do something else_ &mdash; i.e. perform a side effect &mdash; while accessing that particular field. Although I would not recommend it in general, there are use cases where they can be useful if written with care, e.g. logging how many times a field was accessed.

Let's consider a Person class with a name and an age, both as private fields for "encapsulation":

```scala
class Person(private val n: String, private var a: Int)
```

Even though the fields are private, we can (obviously) still construct the class with the right constructor arguments:

```scala
val alice = new Person("Alice", 24)
```

If we wanted to mutate Alice's age, we would need to add the following to the Person class:

```scala
def age_=(newage: Int): Unit = {
  // log something
  println(s"Person $n changed age from $a to $newage")
  a = newage
}

def age: Int = {
  // do something else besides returning the field
  nAgeAccess += 1
  a
}
```

The first method `age_=` is a setter, and the other `age` (without parentheses) is a getter.

_When they are both present_ in the class, the compiler can then accept the following sugar:

```scala
val alicesAge = alice.age
alice.age = 25
```

The first line is trivial, but the other is not &mdash; the compiler rewrites it to `alice.age_=(25)`. The end feel is that Alice "seems" to have a public member called `age`.

For this scheme to work, the following restrictions apply:

- both the getter and setter need to be present
- the setter needs to have the signature `def myField_=(value: MyType): Unit`
- the getter needs to have the signature `def myField: MyType`

## 4. Updating Data in Collections

Most of us have grown used to arrays. They're easy to use and to understand.

```java
int[] array = new int[2];
array[1] = 64
```

In Scala, we also have `Array`, which are directly mapped to JVM native arrays. However, Scala allows us to create mutable data structures with the update semantics of arrays. In other words, we can define classes which are "updateable" like arrays.

Let's assume we created a Person data structure whose fields can be accessed by their index &mdash; much like a Spark Row &mdash; in the following way:

```scala
val bob = new Person("Bob", 23)
val bobsName = bob(0)
val bobsAge = bob(1)
```

This accessing style is easy: just add an apply method to the Person class taking an integer as argument:

```scala
def apply(index: Int) = index match {
  case 0 => n
  case 1 => a
  case _ => throw new IndexOutOfBoundsException
}
```

Now, for a trick not so known among Scala programmers: besides `apply`, there is another method called `update` which is treated in a particular way by the compiler. If we add the method

```scala
def update(index: Int, value: Any): Unit = index match {
  case 0 => n = value.asInstanceOf[String]
  case 1 => age = value.asInstanceOf[Int]
  case _ => throw new IndexOutOfBoundsException
}
```

(please ignore the type casts, I don't like them, but it's for illustration purposes)

then the following would work:

```scala
bob(0) = "Bobbie"
bob(1) = 24
```

So you can mutate your data structures in the same style as arrays. The only restriction is that the `update` method needs to take two arguments, the first one being an `Int`.

## 5. Conclusion

This article focused on _how_ to create mutable data structures in Scala that feel "natively" mutable. Hopefully at least one of the techniques here &mdash; I'm guessing either the `age_=(a: int)` or the `update` method &mdash; were new to you and you'll find them useful the next time you'll need mutability in Scala.

In a future article, I'll discuss the _why_ of mutability and how to use such a power wisely.
