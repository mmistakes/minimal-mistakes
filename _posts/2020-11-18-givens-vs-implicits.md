---
title: "Givens vs. Implicits in Scala 3"
date: 2020-11-18
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala 3]
excerpt: From the previous article, you know how givens work. Let's compare them with the old Scala implicits.
---

This article is for the Scala programmers who have some familiarity with implicits.

If you're just starting out and got to Scala 3 directly, [the essential concepts](/scala-3-given-using) of given/using will be enough. No need to read this article because implicits are phased out in Scala 3. To use some word play here, just stick to `using` `given`s.

If you come from Scala 2, you're familiar with implicits and need to move to given/using combos, read on.

## Background: Overhaul of Implicits

Implicits are some of the most powerful Scala features. They allow code abstractions that sit outside the traditional OO-style type hierarchy. Implicits have demonstrated their use and have been battle-tested in many scenarios. Listing just a few:

- Implicits are an essential tool for creating [type classes](/why-are-typeclasses-useful/) in Scala. Libraries like [Cats](https://typelevel.org/cats) (which we [teach](https://rockthejvm.com/p/cats)) could not exist without them.
- Extending the capabilities of existing types, in expressions such as `20.seconds` (more [here](/twenty-seconds)), is possible with implicits.
- Implicits allow the automatic creation of new types and enforcing type relationships between them at compile time. We can go as far as run [type-level computations in Scala](/type-level-programming-part-1) with implicits.

In Scala 2, this suite of capabilities is available under the same `implicit` keyword, through implicit `val`s, implicit `def`s and implicit classes. However, this unified scheme has its downsides, and implicits have garnered criticism. Some of the most important:

1. When we have some working code using implicits, it's often very hard &mdash; and exponentially harder with a growing codebase &mdash; to pinpoint which implicits made it possible.
2. When we write code that requires implicits, we often need to import the _right_ implicits to make it compile. Automatic imports are really hard &mdash; the IDE can't read your mind &mdash; so that leaves us with either a) magically knowing which imports to pick, or b) frustration.
3. Implicit `def`s without implicit arguments are capable of doing conversions. Most of the time, these conversions are dangerous and hard to pin down. Moreover, they're the easiest implicits feature to use, which makes them double-dangerous.
4. Implicits are really hard to learn and therefore push many beginners away from Scala.
4. Various annoyances, such as
    - the need to name implicits when we often don't need them
    - some syntax confusions if a method requires implicit parameters
    - the discrepancy between structure and intention: for example, an `implicit def` is never used with the meaning of a "method".

## Implicit Conversions

Implicit conversions now need to be made explicit. This solves a big burden.

Prior to Scala 3, implicit conversions were required for extension methods and for the type class pattern. Now, with Scala 3, the extension method concept is standalone, and so we can implement many of the patterns that required implicits without relying on conversions. As such, it's quite likely that the need for conversions will drop significantly. At the same time, conversions are dangerous on their own, and because they used to be so sneaky, they're double-dangerous. With Scala 3, conversions need to be declared in a specific way.

Prior to Scala 3, implicit conversions were incredibly easy to write compared to their power (and danger).  Assuming a class

```scala3
case class Person(name: String) {
  def greet: String = s"Hey, I'm $name. Scala rocks!"
}
```

we could write a one-liner implicit conversion as

```scala3
implicit def stringToPerson(string: String): Person = Person(string)
```

and then we could write

```scala3
"Alice".greet
```

Now, with Scala 3, there are many steps to follow to make sure we know what we're doing. An implicit conversion is a `given` instance of `Conversion[A, B]`. The example of the Person class would be

```scala3
given stringToPerson: Conversion[String, Person] with {
  def apply(s: String): Person = Person(s)
}
```

but we still wouldn't be able to rely on the implicit magic. We also need to specifically import the `implicitConversions` package. So we need to write

```scala3
import scala.language.implicitConversions

// somewhere in the code
"Alice".greet
```

In this way, you need to be really motivated to use implicit conversions. Coupled with the lack of proper reasons to use implicit conversions &mdash; we don't need them for extension methods anymore &mdash; should make the use of implicit conversions drop dramatically.

## Scala 3 Givens, Implicits and Naming

Firstly, Scala 2 implicits needed to be named, even though we might never need to refer to them. Not anymore with givens. You can simply a given instance without naming it:

```scala3
given Ordering[String] {
    // implementation
}
```

and at the same time, write `using` clauses without naming the value which will be injected:

```scala3
def sortThings[T](things: List[T])(using Ordering[T]) = ...
```

## Givens, Implicits and Syntax Ambiguities

Secondly, givens solve a syntax ambiguity when invoking methods which have `using` clauses. Let's take an example. If we had a method

```scala3
def getMap(implicit size: Int): Map[String, Int] = ...
```

then we could not write `getMap("Alice")` even if we had an implicit in scope, because the argument will override the implicit value the compiler would have inserted, and so we'll get a type error from the compiler.

Givens solve that. If we had a method

```scala3
def getMap(using size: Int): Map[String, Int] = ...
```

we cannot call the method explicitly with an argument of our choosing to be passed for `size`, unless we are also explicit about it:

```scala3
getMap(using 42)("Alice")
```

which again is very clear. If we do have a `given` Int in scope, then we can simply call `getMap("Alice")`, because the given value was already injected into `size`.

## How Scala 3 Givens Solve the Track-Down Problem

Implicits are notorious in Scala 2 for being extremely hard to pin down. That means that in a large chunk of working code, you may be using methods that take implicit arguments, be using implicit conversions and/or methods that don't belong to the type you're using (extension methods), _and still have no idea where they come from_.

Givens attempt at solving the problem in multiple ways.

Firstly, given instances need to be [explicitly imported](/scala-3-given-using/#importing-givens), so you can better track down which imported parts are actually given instances.

Secondly, givens are only used for automatic injection of arguments via a `using` clause. In this way, you can look at imported given instances for this particular issue, i.e. finding _method arguments that you aren't passing explicitly_. For the other implicit magic, the other mechanisms (clearly defined implicit conversions and extension methods) have similar track-down capabilities.

## Scala 3 Givens and Auto-Imports

This is a hard one. Because givens are automatically injected wherever a `using` clause for that type is present, this mechanism is similar to implicits. If we call a method which has a `using` clause:

```scala3
def sortTheList[T](list: List[T])(using comparator: Comparator[T]) = ...
```

then the IDE cannot read our mind and automatically import the right `given` instance in scope so we can call our method. Imports will still need to be explicit.

However, the current implicit resolution mechanism leaves very generic errors. At most, "no implicits found". The Scala 3 compiler has come a long way to surface more meaningful errors, so that if the search for `given`s fails, it will show the point where the compiler got stuck, so we can provide the remaining `given` instances in scope.

## Scala 3 Givens, Implicits and Intentions

Implicit defs were never meant to be used like methods. Therefore, there's a clear discrepancy between the structure of the code (a method) and the intention (a conversion). The new Scala 3 contextual abstractions solve this problem by being very clear on the intent:

- given/using clauses are used for passing "implicit" arguments
- implicit conversions are done by creating instances of `Conversion`
- extension methods have their first-class syntactic structure

## Conclusion

Implicits are powerful, dangerous and one of the features that make Scala unique. Scala 3 moves beyond the implicit mechanism with much clearer intention of which feature wants to achieve what. The new world with given/using + extension methods + explicit implicit conversions will encounter some push-back because of current familiarity, but looking a few years into the future, I'm optimistic we'll look back to now and be glad we write clearer Scala code because of this new move.
