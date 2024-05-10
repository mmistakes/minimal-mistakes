---
title: "Type-Level Programming in Scala, Part 2"
date: 2020-08-17
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "We continue down the path of type-level power in Scala. We learn to add numbers as types, at compile time."
---
In this article we will continue what we started in the [first part](/type-level-programming-part-1) and enhance our type-level capabilities. As a quick reminder, in this mini-series we learn to use the power of the Scala compiler to validate complex relationships between types that mean something special to us, for example that a "number" (as a type) is  "smaller than" another "number".

## Background

I mentioned earlier that I'm using Scala 2 - I'll update this series once Scala 3 arrives - so you'll need the following to your build.sbt:

```scala
libraryDependencies += "org.scala-lang" % "scala-reflect" % scalaVersion.value
```

and in order to print a type signature, I have the following code:

```scala
package myPackage

object TypeLevelProgramming {
  import scala.reflect.runtime.universe._
  def show[T](value: T)(implicit tag: TypeTag[T]) =
    tag.toString.replace("myPackage.TypeLevelProgramming.", "")
}
```

Again, we aren't cheating so that we manipulate types at runtime - the compiler will figure out the types before the code is compiled, and we use the above code just to print types.

## Where We Left Off

The first article discussed the creation of natural numbers as types, following the Peano representation: zero as a starting value, then the succession of numbers as types.

```scala
trait Nat
class _0 extends Nat
class Succ[A <: Nat] extends Nat

type _1 = Succ[_0]
type _2 = Succ[_1] // = Succ[Succ[_0]]
type _3 = Succ[_2] // = Succ[Succ[Succ[_0]]]
type _4 = Succ[_3] // ... and so on
type _5 = Succ[_4]
```

Then we built up a comparison relationship between these numbers, again as a type. This time, we also made the compiler build implicit instances of the "less-than" type in order to prove that the relationship is true:

```scala
sealed trait <[A <: Nat, B <: Nat]
object < {
    def apply[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[A, B] = lt
    implicit def ltBasic[B <: Nat]: <[_0, Succ[B]] = new <[_0, Succ[B]] {}
    implicit def inductive[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[Succ[A], Succ[B]] = new <[Succ[A], Succ[B]] {}
}

sealed trait <=[A <: Nat, B <: Nat]
object <= {
    def apply[A <: Nat, B <: Nat](implicit lte: <=[A, B]): <=[A, B] = lte
    implicit def lteBasic[B <: Nat]: <=[_0, B] = new <=[_0, B] {}
    implicit def inductive[A <: Nat, B <: Nat](implicit lt: <=[A, B]): <=[Succ[A], Succ[B]] = new <=[Succ[A], Succ[B]] {}
}
```

In this way, if we write

```scala
val validComparison: <[_2, _3] = <[_2, _3]
```

the compiler can build an implicit instance of `<[_2, _3]` so the relationship is "correct" and the code can compile, whereas if we write

```scala
val invalidComparison: <[_3, _2] = <[_3, _2]
```

the code will not compile because the compiler will be unable to build an implicit instance of `<[_3, _2]`.

We will use similar techniques to take the power up a notch: the ability to add and subtract "numbers" as types.

## Adding "Numbers" as Types

In a similar style that we used to compare numbers, we'll create another type that will represent the sum of two numbers as types:

```scala
trait +[A <: Nat, B <: Nat, S <: Nat]
```

which means that "number" A added with "number" B will give "number" S. First, we'll make the compiler automatically detect the truth value of A + B = S by making it construct an implicit instance of `+[A, B, S]`. We should be able to write

```scala
val four: +[_1, _3, _4] = +[_1, _3, _4]
```

but the code should not compile if we wrote

```scala
val five: +[_3, _1, _5] = +[_3, _1, _5]
```

so for starters, we should create a companion for the `+` trait and add an apply method to fetch whatever implicit instance can be built by the compiler:

```scala
object + {
    def apply[A <: Nat, B <: Nat, S <: Nat](implicit plus: +[A, B, S]): +[A, B, S] = plus
}
```

In the same companion object we will also build the implicit values that the compiler can work with.

## Axioms of Addition as Implicits

First, we know that 0 + 0 = 0. In terms of the trait that we defined, that means the compiler must have access to an instance of `+[_0, _0, _0]`. So let's build it ourselves:

```scala
implicit val zero: +[_0, _0, _0] = new +[_0, _0, _0] {}
```

That one was the easiest. Another "base" axiom is that for any number A > 0, it's always true that A + 0 = A and 0 + A = A. We can embed these axioms as implicit methods:

```scala
implicit def basicRight[A <: Nat](implicit lt: _0 < A): +[_0, A, A] = new +[_0, A, A] {}
implicit def basicLeft[A <: Nat](implicit lt: _0 < A): +[A, _0, A] = new +[A, _0, A] {}
```

Notice that the type `+[_0, A, A]` and `+[A, _0, A]` are different - this is why we need two different methods there.

At this point, you might be wondering why we need those constraints and why we can't simply say that for <em>any</em> number A, it's always true that 0 + A = A and A + 0 = A. That's true and more general, but it's also confusing to the compiler, because it would have multiple routes through which it can build an instance of +[_0, _0, _0]. We want to separate these cases so that the compiler can build each implicit instance by following exactly one induction path.

With these 3 implicits, we can already validate a number of sums:

```scala
val zeroSum: +[_0, _0, _0] = +[_0, _0, _0]
val anotherSum: +[_0, _2, _2] = +[_0, _2, _2]
```

but are yet to validate sums like `+[_2, _3, _5]`. That's the subject of the following inductive axiom. The reasoning works like this: if A + B = S, then it's also true that Succ[A] + Succ[B] = Succ[Succ[S]]. In the compiler's language, if the compiler can create an implicit +[A, B, S], then it must als be able to create an implicit +[Succ[A], Succ[B], Succ[Succ[S]]]:

```scala
implicit def inductive[A <: Nat, B <: Nat, S <: Nat](implicit plus: +[A, B, S]): +[Succ[A], Succ[B], Succ[Succ[S]]] =
  new +[Succ[A], Succ[B], Succ[Succ[S]]] {}
```

With these 4 implicits, the compiler is now able to validate any sum. For example:

```scala
val five: +[_2, _3, _5] = +[_2, _3, _5]
```

This compiles, because
  - the compiler needs an implicit `+[_2, _3, _5]` which is in fact `+[Succ[_1], Succ[2], Succ[Succ[_3]]]`
  - the compiler can run the inductive method, but it requires an implicit `+[_1, _2, _3]` which is `+[Succ[_0], Succ[_1], Succ[Succ[_1]]]`
  - the compiler can run the inductive method again, but it requires an implicit `+[_0, _1, _1]`
  - the compiler can run the basicRight method and build the implicit `+[_0, _1, _1]`
  - the compiler can then build all the other dependent implicits

However, if we write an incorrect "statement", such as

```scala
val four: +[_2, _3, _4] = +[_2, _3, _4]
```

the code can't compile because the compiler can't find the appropriate implicit instance.

Right now, our code looks like this:

```scala
trait +[A <: Nat, B <: Nat, S <: Nat]
object + {
    implicit val zero: +[_0, _0, _0] = new +[_0, _0, _0] {}
    implicit def basicRight[B <: Nat](implicit lt: _0 < B): +[_0, B, B] = new +[_0, B, B] {}
    implicit def basicLeft[B <: Nat](implicit lt: _0 < B): +[B, _0, B] = new +[B, _0, B] {}
    implicit def inductive[A <: Nat, B <: Nat, S <: Nat](implicit plus: +[A, B, S]): +[Succ[A], Succ[B], Succ[Succ[S]]] =
        new +[Succ[A], Succ[B], Succ[Succ[S]]] {}
    def apply[A <: Nat, B <: Nat, S <: Nat](implicit plus: +[A, B, S]): +[A, B, S] = plus
}
```

## Supercharging Addition

This is great so far! We can make the compiler validate type relationships like the "addition" of "numbers" at compile time. However, at this point we can't make the compiler <em>figure out</em> what the result of an addition should be - we need to specify the result type ourselves, and the compiler will simply show a thumbs-up if the type is good.

The next level in this Peano arithmetic implementation would be to somehow make the compiler infer the sum type by itself. For that, we'll change the type signature of the addition:

```scala
trait +[A <: Nat, B <: Nat] extends Nat {
    type Result <: Nat
}
```

So instead of a type argument, we now have an abstract type member. This will help us when we use the `+` type at the testing phase. Now, in the companion object, we'll declare an auxiliary type:

```scala
object + {
    type Plus[A <: Nat, B <: Nat, S <: Nat] = +[A, B] { type Result = S }
}
```

This new type `Plus` is exactly the same as our previous `+` and we will use it in our implicit resolution. The trick here is to have the compiler automatically match the `Result` abstract type member to the `S` type <em>argument</em> of the auxiliary sum type.

The next step is to change our axiom (read: implicits) definitions to use this new type:

```scala
implicit val zero: Plus[_0, _0, _0] = new +[_0, _0] { type Result = _0 }
implicit def basicRight[B <: Nat](implicit lt: _0 < B): Plus[_0, B, B] = new +[_0, B] { type Result = B }
implicit def basicLeft[B <: Nat](implicit lt: _0 < B): Plus[B, _0, B] = new +[B, _0] { type Result = B }
implicit def inductive[A <: Nat, B <: Nat, S <: Nat](implicit plus: Plus[A, B, S]): Plus[Succ[A], Succ[B], Succ[Succ[S]]] =
    new +[Succ[A], Succ[B]] { type Result = Succ[Succ[S]] }
```

Each rewrite goes as follows:
  - make the return type be the new `Plus` type instead of the old `+`
  - because we can't build `Plus` directly, we'll need to build an instance of `+` that has the correct type member

Finally, the apply method will need to undergo a change as well. First of all, we'll get rid of the third type argument:

```scala
def apply[A <: Nat, B <: Nat](implicit plus: +[A, B]): +[A, B] = plus
```

At this point, we can now say

```scala
val five: +[_2, _3] = +.apply // or +[_2, _3]
```

and if the code compiles, then the compiler is able to validate the <em>existence</em> of a sum type between _2 and _3.

But what's the result?

## The Final Blow

Right now, we can't see the final result of summing the "numbers". If we print the type tag of the sum we won't get too much info:

```scala
> println(show(+[_2, _3]))
TypeTag[_2 + _3]
```

However, we can force the compiler to show the result type to us, because we have a `Result` type member in the `+` trait. All we need to do is change the apply method slightly:

```scala
def apply[A <: Nat, B <: Nat](implicit plus: +[A, B]): Plus[A, B, plus.Result] = plus
```

Instead of returning a `+[A, B]`, we return a `Plus[A, B, plus.Result]`. We can use this dirty trick because
  - `Plus` is nothing but a type alias
  - we can use type members in method return types

With this minor change, the code still compiles, but if we show the type tag now, the tag looks different:

```scala
> println(show(+[_2, _3]))
TypeTag[Succ[Succ[_0]] + Succ[Succ[Succ[_0]]]{ type Result = Succ[Succ[Succ[Succ[Succ[_0]]]]] }]
```

In other words, the result type the compiler has is `Succ[Succ[Succ[Succ[Succ[_0]]]]]`, which is `_5`!

The final code is below:

```scala
trait +[A <: Nat, B <: Nat] { type Result <: Nat }
object + {
    type Plus[A <: Nat, B <: Nat, S <: Nat] = +[A, B] { type Result = S }
    implicit val zero: Plus[_0, _0, _0] = new +[_0, _0] { type Result = _0 }
    implicit def basicRight[B <: Nat](implicit lt: _0 < B): Plus[_0, B, B] = new +[_0, B] { type Result = B }
    implicit def basicLeft[B <: Nat](implicit lt: _0 < B): Plus[B, _0, B] = new +[B, _0] { type Result = B }
    implicit def inductive[A <: Nat, B <: Nat, S <: Nat](implicit plus: Plus[A, B, S]): Plus[Succ[A], Succ[B], Succ[Succ[S]]] =
      new +[Succ[A], Succ[B]] { type Result = Succ[Succ[S]] }
    def apply[A <: Nat, B <: Nat](implicit plus: +[A, B]): Plus[A, B, plus.Result] = plus
}

def main(args: Array[String]): Unit = {
    println(show(+[_2, _3]))
}
```

P.S. Creating a value of the sum type and then printing it will not produce the same result because of how types are attached to expressions:

```scala
> val five: +[_2, _3] = +[_2, _3]
> println(five)
TypeTag[_2 + _3]
```

## To Be Continued

I hope that by the end of this second part you're getting a sense of how you can express a mathematical problem as a set of constraints on type relationships, written as implicit definitions. The compiler "solves" the problem for you by automatically building the right implicit, whose type holds the relationship you wanted.

There's more to come...
