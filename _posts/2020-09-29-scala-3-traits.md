---
title: "Scala 3 Traits: New Features"
date: 2020-09-29
header:
  image: "/images/blog cover.jpg"
tags: [scala, jvm, scala 3, traits]
excerpt: "Scala 3, Traits"
---

This article will continue some of the previous explorations of Scala 3. Here, we'll discuss some of the new functionality of traits in Scala 3.

## 1. Background

Scala traits were originally conceived to be analogous to Java interfaces. Essentially, a trait was a type definition which wrapped a suite of abstract fields and methods. In time, traits acquired additional functionality and features, such as non-abstract fields and methods. This led to some legitimate questions around the [https://www.youtube.com/watch?v=_7ULjOILxhI](boundary between abstract classes and traits).

That line will get even blurrier with the arrival of Scala 3.

## 2. Trait Arguments

One of the practical differences between abstract classes and traits was (in Scala 2) that traits could not receive constructor arguments. Put simply, now they can:

```scala3
trait Talker(subject: String) {
    def talkWith(another: Talker): String
}
```

Extending such a trait looks just like extending a regular class:

```scala3
class Person(name: String) extends Talker("rock")
```

Enhancing traits with parameters certainly has its advantages. However, this may pose some problems. The first problem is that sometimes in large code bases (and not only), extending the same trait multiple times is not unheard of. What happens if you mix-in a trait with one argument in one place, and with another argument in another place?

The short answer is that won't compile. The rule is: if a superclass already passes an argument to the trait, if we mix it again, we must not pass any argument to that trait again.

```scala3
class RockFan extends Talker("rock")
class RockFanatic extends RockFan with Talker // must not pass argument here
```

Another problem is: what happens if we define a trait hierarchy? How should we pass arguments to derived traits?

Again, short answer: derived traits will not pass arguments to parent traits:

```scala3
trait BrokenRecord extends Talker
```

That's a rule. Passing arguments to parent traits will not compile.

Cool, but how are we now supposed to mix this trait into one of our classes? Say we wanted to create a class which denotes this person we all have in our family or our circle of friends, who talks until they turn pale.

```scala3
class AnnoyingFriend extends BrokenRecord("politics")
```

This is illegal, because the BrokenRecord trait doesn't take arguments. But then how are we supposed to pass the right argument to the Talker trait?

The answer is by mixing it again:

```scala3
class AnnoyingFriend extends BrokenRecord with Talker("politics")
```

A bit clunky, but that's the only way to make the type system sound with respect to this new capability of traits.

## 3. Super Traits

The Scala compiler's type inference is one of its most powerful features. However, without enough information, sometimes even the compiler's type inference isn't powerful enough. Here's an example:

```scala3
trait Color
case object Red extends Color
case object Green extends Color
case object Blue extends Color

val color = if (43 > 2) Red else Blue
```

Can you guess what the inferred type of `color` is? Spoiler: it's not `Color`.

Which is weird, right? We'd expect the inferred type to be the lowest common ancestor of the two types, Red and Blue. The complete inferred type is `Color with Product with Serializable`. The reason is that both Red and Blue derive from Color, but because they are `case object`s, they automatically implement the traits `Product` (from Scala) and `Serializable` (from Java). So the lowest common ancestor is the combination of all three.

The thing is that we rarely use the traits `Product` or `Serializable` as standalone types we attach to values. So Scala 3 allows us to ignore these kinds of traits in type inference, by making them a `super` trait. Here's an example. Assume we have the following definitions for a graphical library:

```scala3
trait Paintable
trait Color
object Red extends Color with Paintable
object Green extends Color with Paintable
object Blue extends Color with Paintable
```

(Notice we did not make them `case object`s for brevity. We'll come back to it.)

Assume further that the trait `Paintable` is rarely used as a standalone trait, but rather as an auxiliary trait in our library definitions. In this case, if we were to say

```scala
val color = if (43 > 2) Red else Blue
```

then we'd like the type inference to detect `color` as being of type `Color`, not `Color with Paintable`. We can suppress `Paintable` from type inference by marking it with `super`:

```scala3
super trait Paintable
```

After that we'll see that our variable `color` is now marked as `Color`.

When Scala 3 comes out, the traits `Product`, `Comparable` (from Java) and `Serializable` (from Java) will be automatically be treated as super traits in the Scala compiler. Of course, if you mark your value as having a particular type, super traits will not influence the type checker.

## 4. Conclusion

You've learned two new features of Scala 3 regarding traits. Put them to good use when Scala 3 comes out!




