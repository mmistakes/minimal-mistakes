---
title: "Type-Level Programming in Scala 3, Part 1: Comparing Types"
date: 2021-10-04
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: []
excerpt: "Learning how to use the power of givens to infer type relationships in Scala 3... at compile time."
---

This article will introduce you to type-level programming on Scala 3 &mdash; the capability to express computations on _types_ instead of values, by making the compiler figure out some type relationships at compile time. By encoding some computational problem as a type restriction or as an enforcement of a type relationship, we can make the compiler "solve" our computation by searching, inferring or validating the proper use of types.

This will be a 2-part series, specifically focused on **Scala 3**. I also published an older [type-level programming miniseries](/type-level-programming-part-1) for Scala 2, which still works on Scala 3 as because implicits are still supported. In this version, we're going to use

- [givens](/scala-3-given-using)
- generics
- type members (for the next article)

The final objective of this mini-series is to be able to _sort type-level lists at compile time_. For the sake of variety, in this series we're going to do a _type-level quicksort_ instead of a mergesort (which we did in the Scala 2 miniseries). In this article, we'll take on the much smaller problem of properly comparing numbers (as types), at compile time.

## 1. Encoding Type-Level Numbers

The natural numbers set consists of all the numbers from 0 to infinity, counted one by one. One way of thinking about the naturals set is to imagine all the numbers extending forever. An alternative way &mdash; which is also much more useful for us &mdash; is to define these numbers in terms of their _relationship_ to each other. This is called the [Peano](https://en.wikipedia.org/wiki/Giuseppe_Peano) representation of numbers.

```scala3
  trait Nat
  class _0 extends Nat
  class Succ[A <: Nat] extends Nat
```

The lines above fully represent the entire set of natural numbers: the number zero, and the succession relationship between any two numbers. By these two rules alone, we can obtain any number in the naturals set. For example, the number 127 is `Succ[Succ[Succ[...[_0]]]]`, where `Succ` occurs 127 times. For the following examples, we should add a few type aliases:

```scala3
  type _1 = Succ[_0]
  type _2 = Succ[_1] // Succ[Succ[_0]]
  type _3 = Succ[_2] // Succ[Succ[Succ[_0]]]
  type _4 = Succ[_3] // ... and so on
  type _5 = Succ[_4]
```

Note that this notation has nothing to do with the literal types [recently added in Scala 3](/new-types-scala-3). The literal types have no relationship to each other, so we'll need to model this relationship ourselves.

## 2. Ordering Numbers at the Type Level

As in the Scala 2 version of the article, we'll create a small trait to describe the ordering relationship between types, we'll name this `<`, because we can.

```scala3
  trait <[A <: Nat, B <: Nat]
```

For example, we'll say that the number 1 is less than 2 _if there exists an instance of_ `<[_1, _2]`. This is how we'll interpret the "less than" relationship, between types, at the type level.

In order to model this relationship, we'll make the compiler prove the truth value of the question "is 1 less than 3" by creating `given` instances of `<`. If the compiler can have access to one &mdash; either by our explicit definition or by a synthetic construction by the compiler &mdash; then the relationship is proven. If the compiler cannot access or create a `given` instance of the appropriate type, the relationship cannot be proven and therefore is deemed to be false.

## 3. Proving Ordering at the Type Level

First, we need to think about how we can prove this relationship in mathematical terms. How can we determine that `_3` is "less than" `_5` when all we have is the "number" `_0` and the succession relationship between two consecutive numbers?

We can solve this problem by writing the axioms (basic truths) of the `<` relationship. Here is how to think about it:

1. The number 0 is smaller than any other natural number. Besides zero, every other natural number is the successor of some other number. So it's safe to say that, for every number in the naturals set, the successor to that number is greater than zero.
2. If we can somehow prove that number A is smaller than number B, then it's also true that the successor of A is smaller than the successor of B. This axiom can also be expressed backwards: we can say that A is less than B _if and only if_ the predecessor of A is less than the predecessor of B.

Let's walk through an example: say we want to determine if `_3 < _5`.

- By the second axiom, `_3 < _5` if and only `_2 < _4` because `_3 = Succ[_2]` and `_5 = Succ[_4]`. So we need to prove `_2 < _4`.
- Again, by the second axiom, `_2 < _4` if and only if `_1 < _3`, for the same reason.
- Second axiom again: `_1 < _3` if and only if `_0 < _2`.
- `_0 < _2` is true, by virtue of the first axiom.
- Therefore, walking back, `_3 < _5` is true.

How can we embed that in Scala code? We'll make the compiler search for, or create, `given` instances for the `<` type.

- For the first axiom, we'll make the compiler generate a given `<[_0, Succ[N]]`, for every `N` which is a natural.
- For the second axiom, we'll make the compiler generate a given `<[Succ[A], Succ[B]]` if it can find a given `<[A, B]` already in scope.

Getting that in code leads to the following `given`s:

```scala3
  given basic[B <: Nat]: <[_0, Succ[B]] with {}
  given inductive[A <: Nat, B <: Nat](using lt: <[A, B]): <[Succ[A], Succ[B]] with {}
```

Note that in Scala 3.1 (not out yet at the time of writing) you'll be able to say `<[_0, Succ[B]]()` instead of `<[_0, Succ[B]] with {}`, for conciseness.

For ergonomics, we're going to store the above givens in the companion of `<`, so that the code will look like this:

```scala3
  object < {
    given basic[B <: Nat]: <[_0, Succ[B]] with {}
    given inductive[A <: Nat, B <: Nat](using lt: <[A, B]): <[Succ[A], Succ[B]] with {}
    def apply[A <: Nat, B <: Nat](using lt: <[A, B]) = lt
  }
```

I also took the liberty of writing an `apply` method which simply surfaces out whatever `given` value of the requested type the compiler is able to find (or synthesize).

## 4. Testing Type-Level Comparisons

With the above code in place, let's see how the compiler validates (or not) the type relationships. The simple test is: does the code compile?

```scala3
  val validComparison = <[_3, _5]
```

This one is valid. The code compiles. Let's see what the compiler does behind the scenes:

- We're requesting a `given` of type `<[_3, _5]`. The compiler needs to find if it can generate one from either of the two `given` synthesizers we specified earlier.
- The second `given` works, because the compiler looks at the signature of the as-of-yet-ungenerated given: `<[Succ[_2], Succ[_4]]`. However, in order to generate that, it needs to find or create a given of type `<[_2, _4]`.
- Again, teh second `given` can be used, for the same reason. For that, the compiler needs a given of type `<[_1, _3]`.
- Same deal, the compiler can create a `given` of type `<[_1, _3]` if it can find a given of type `<[_0, _2]`.
- Using the _first_ given this time around, we see that the compiler can create a given of type `<[_0, _2]` because `_2 = Succ[_1]`.
- Walking backwards, the compiler can generate all the intermediate givens in order to create the given we requested.

In other words, the relationship `<[_3, _5]`, or written infix `_3 < _5` can be proven, so it's true. Notice how similarly the compiler generated the given instances in the exact same sequence of steps we used for our mathematical induction above.

By the same mechanism, we can prove any less-than relationships between types that are mathematically correct. The `given`s specification is identical to the mathematical description of the axioms we outlined in the previous section. Conversely, invalid relationships, e.g. `_4 < _2` cannot be proven because the compiler cannot find (or create) a given of the appropriate type, and so it will not compile our code.

## 5. Extending Type-Level Comparisons

I took the liberty of using the same principle to create a "less than or equal" relationship between types. This is going to be useful for the quicksort we're going to do in the upcoming article.

The axioms are similar:

- The number 0 is less than or equal to any other number. In Scala terms, it means we can always generate a given `<=[_0, N]` for any `N <: Nat`.
- The second axiom of `<=` is identical to the one for `<`: if a number-type `A` is "less than or equal to" another number type `B`, that means that `Succ[A] <= Succ[B]` as well.

Compressed, the code will look like this:

```scala3
  trait <=[A <: Nat, B <: Nat]
  object <= {
    given lteBasic[B <: Nat]: <=[_0, B] with {}
    given inductive[A <: Nat, B <: Nat](using lte: <=[A, B]): <=[Succ[A], Succ[B]] with {}
    def apply[A <: Nat, B <: Nat](using lte: <=[A, B]) = lte
  }
```

Again, the correct relationships compile:

```scala3
val lteTest = <=[_3, _3]
val lteTest2 = <=[_3, _5]
```

whereas the incorrect relationships do not:

```scala3
val invalidLte = <=[_5, _3] // cannot find the appropriate given
```

## 6. Conclusion

The complete code can be found below:

```scala3
  trait Nat
  class _0 extends Nat
  class Succ[N <: Nat] extends Nat

  type _1 = Succ[_0]
  type _2 = Succ[_1] // Succ[Succ[_0]]
  type _3 = Succ[_2]
  type _4 = Succ[_3]
  type _5 = Succ[_4]

  // name it "LessThan", then refactor to "<"
  trait <[A <: Nat, B <: Nat]
  object < {
    given basic[B <: Nat]: <[_0, Succ[B]] with {}
    given inductive[A <: Nat, B <: Nat](using lt: <[A, B]): <[Succ[A], Succ[B]] with {}
    def apply[A <: Nat, B <: Nat](using lt: <[A, B]) = lt
  }
  val comparison = <[_1, _3]
  /*
    <.apply[_1, _3] -> requires <[_1, _3]
    inductive[_0, _2] -> requires <[_0, _2]
    ltBasic[_1] -> produces <[_0, Succ[_1]] == <[_0, _2]
   */

  trait <=[A <: Nat, B <: Nat]
  object <= {
    given lteBasic[B <: Nat]: <=[_0, B] with {}
    given inductive[A <: Nat, B <: Nat](using lte: <=[A, B]): <=[Succ[A], Succ[B]] with {}
    def apply[A <: Nat, B <: Nat](using lte: <=[A, B]) = lte
  }
  val lteTest: _1 <= _1 = <=[_1, _1]
```

With this code, we showed how we can compare natural numbers &mdash; in their type-level Peano representation &mdash; at compile time, by proving the existence of the appropriate `given` value of the comparison "operator" (again, at the type level).

In the next part, we'll take this skill to level 90 and do a quicksort on types.
