---
title: "Type-Level Programming in Scala 3, Part 2: A Quicksort on Types"
date: 2021-10-11
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: []
excerpt: "Level 90 of type-level programming: a real sorting algorithm on lists... as types."
---

This article is the part 2 of the mini-series of type-level programming in Scala 3. If you want an introduction to type-level programming and a gentle tutorial of how we can encapsulate a computational problem as a relationships between types which the compiler can solve, [read the first part here](/type-level-programming-scala-3).

In this article, we're going to use the skills we learned in the previous part, and take them to level 90: we're going to write a quicksort algorithm on lists, at the type level, which the compiler can solve at compile time.

## 1. Where We Left Off

In the first part of the mini-series focused on the representation of natural numbers as types, in the [Peano arithmetic](https://en.wikipedia.org/wiki/Peano_axioms). The entire set of naturals can be expressed just with the number 0 and the succession relationship between two consecutive numbers.

With this representation, we can demonstrate a "less than" and "less than, or equal" relationship between numerical types by proving the existence of a `given` value which denotes the appropriate relationship: `<` or `<=`. The compiler synthesizes these instances based on rules defined by the `given`s below.

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

## 2. A Type-Level List

In the style of [shapeless](https://github.com/milessabin/shapeless), we'll denote a heterogeneous list (HList) at the type level as follows:

```scala3
  trait HList
  class HNil extends HList
  class ::[H <: Nat, T <: HList] extends HList
```

For example, the list `[1,2,3,4]` at the type level would be analogous to the type `::[_1, ::[_2, ::[_3, ::[_4, HNil]]]]`, or `_1 :: _2 :: _3 :: _4 :: HNil` with the infix notation.

We will attempt to "sort" such an HList using a quicksort on types. Much like testing the comparison between numbers, e.g. `<[_1, _3]`, we will test the "sorted" relationship between two lists. Something like `Sorted[_2 :: _3 :: _1 :: _4 :: HNil, _1 :: _2 :: _3 :: _4 :: HNil]` will test that the sorted version of `_2 :: _3 :: _1 :: _4 :: HNil` is `_1 :: _2 :: _3 :: _4 :: HNil`.

Then we will take this to level 91 and make the compiler _infer_ the appropriate result type for us, automatically.

It's a long way to go. For a "normal" quicksort on a linked list, we'll need to

- take the head of the list (pivot), then _partition_ the list into two parts: one with elements smaller than the pivot, and those greater than or equal to it
- sort the partitions recursively
- combine the sorted partitions with concatenation

For the type-level sort, this plan corresponds to 3 type-level operations:

- concatenation
- partitioning
- sorting

We'll take them all in turn.

## 3. Type-level Quicksort, Part 1: The Concatenation

In the first part of the mini-series we use type-level programming as "tests". In other words, the relationship `1 < 3` is true only if there is an instance of the type `<[_1, _3]` that the compiler can either find or generate.

We'll do the same with concatenating two lists. We'll use concatenation as a test, which we'll denote `Concat[HA, HB, O]`, where all type members are subtypes of `HList`. For example, the concatenation `[1,2] ++ [3,4] == [1,2,3,4]` is only true if there is an instance of a `Concat[_1 :: _2 :: HNil, _3 :: _4 :: HNil, _1 :: _2 :: _3 :: _4 :: HNil]`. Otherwise the relationship is not true.

The axioms of concatenation are as follows:

1. (basic) Concatenating the empty list with any list `L` results in that list `L`.
2. (inductive/recursive) Concatenating any non-empty list, say `H :: T`, with any list `L` results in a new list whose head is `H` and tail is the concatenation of `T` and `L`.

Written as `given`s, the first axiom allows the compiler to generate any `Concat[HNil, L, L]` for any list type `L`

```scala3
  given basicEmpty[L <: HList]: Concat[HNil, L, L] with {}
```

and the second axiom allows the compiler to _rely on_ an existing (recursive) concatenation before it can synthesize a concatenation for our original lists:

```scala3
  given inductive[N <: Nat, HA <: HList, HB <: HList, O <: HList](using Concat[HA, HB, O]): Concat[N :: HA, HB, N :: O] with {}
```

Putting all pieces together, along with a `summon`-like `apply` method in the companion of `Concat`, we'll get this:

```scala3
  trait Concat[HA <: HList, HB <: HList, O <: HList]
  object Concat {
    given basicEmpty[L <: HList]: Concat[HNil, L, L] with {}
    given inductive[N <: Nat, HA <: HList, HB <: HList, O <: HList](using Concat[HA, HB, O]): Concat[N :: HA, HB, N :: O] with {}
    def apply[HA <: HList, HB <: HList, O <: HList](using concat: Concat[HA, HB, O]): Concat[HA, HB, O] = concat
  }
```

To test this real quick, the concatenation of the lists `[1,2]` and `[3,4]` looks like this:

```scala
  val concat = Concat[_0 :: _1 :: HNil, _2 :: _3 :: HNil, _0 :: _1 :: _2 :: _3 :: HNil]
```

The compiler successfully compiles this code because:

- the apply method needs a `Concat[_0 :: _1 :: HNil, _2 :: _3 :: HNil, _0 :: _1 :: _2 :: _3 :: HNil]`
- the compiler can use the `inductive` method, but it needs a `Concat[_1 :: HNil, _2 :: _3 :: HNil, _1 :: _2 :: _3 :: HNil]`
- the compiler can again use `inductive` but it needs a `Concat[HNil, _2 :: _3 :: HNil, _2 :: _3 :: HNil]`
- the compiler can use `basic` with the type `_2 :: _3 :: HNil` to create a `Concat[HNil, _2 :: _3 :: HNil, _2 :: _3 :: HNil]`
- working backwards, the compiler can create all the necessary intermediate `given`s for the apply method

Conversely, any incorrect concatenation results in uncompilable code.

Part 1 of quicksort, check.

## 4. Type-level Quicksort, Part 2: The Partitioning

The second phase of our type-level quicksort algorithm is a type-level partitioning. Namely, we need to pick a "head" (the pivot) off our type-level linked list and separate the elements "smaller than" and "greater than or equal to" the pivot.

For this step, we will use another type, `Partition[HL <: HList, L <: HList, R <: HList]` which denotes that the list `HL` was successfully partitioned into `L` (the elements smaller than the pivot, including the pivot) and `R` (containing the elements greater than or equal to the pivot).

For example, we'll say that the list `[_2 :: _3 :: _1 :: HNil]` was successfully partitioned into `[_2 :: _1 :: HNil]` and `[_3 :: HNil]` if the compiler can find or synthesize a `given` instance of `Partition[_2 :: _3 :: _1 :: HNil, _2 :: _1 :: HNil, _3 :: HNil]`.

The axioms of partitioning are as follows:

1. Partitioning an empty list results in the empty list on the "left" and the empty list on the "right".
2. Partitioning a one-element list results in that same list on the "left" and the empty list on the "right".
3. Considering a list with at least two elements `P :: N :: T` (pivot, next number and tail of the list), we'll need to assume a recursive partitioning of `T` into a "left" `L` (with elements smaller than the pivot) and a "right" `R` (with elements >= the pivot). Now we need to decide where `N` is going to stay.

    - If `P <= N`, then `N` will stay on the "right" side.
    - If `N < P`, then `N` will stay on the "left" side.

Axioms 1 and 2 are more easily translatable to givens. The first axiom creates a given for a Partition where the original list is HNil and the "left" and "right" side of the split are both HNil.

```scala3
  given basic: Partition[HNil, HNil, HNil] with {}
```

The second axiom creates a given for any one-element list: the "left" side will be the list itself, while the "right" side is empty.

```scala3
  given basic2[N <: Nat]: Partition[N :: HNil, N :: HNil, HNil] with {}
```

The third axiom has two parts, so we will implement each "branch" separately. We will assume a list with at least two elements, `P :: N :: T`, where P is the pivot, N is a "number" and T is the tail of the list. If we can somehow split T into `L` and `R`, then if `P <= N`, then `N` will stay in the right. The encoding is a bit more complex:

```scala3
  given inductive[P <: Nat, N <: Nat, T <: HList, L <: HList, R <: HList]
  (using P <= N, Partition[P :: T, P :: L, R]):
    Partition[P :: N :: T, P :: L, N :: R] with {}
```

The other branch is similar, but we'll assume `N < P` this time, which means `N` will stay on the "left":

```scala3
  given inductive2[P <: Nat, N <: Nat, T <: HList, L <: HList, R <: HList]
  (using N < P, Partition[P :: T, P :: L, R]):
    Partition[P :: N :: T, P :: N  :: L, R] with {}
```

That, plus an `apply` method to summon the relevant given, will make `Partition` look like this:

```scala3
  trait Partition[HL <: HList, L <: HList, R <: HList] // pivot included in left
  object Partition {
    given basic: Partition[HNil, HNil, HNil] with {}
    given basic2[N <: Nat]: Partition[N :: HNil, N :: HNil, HNil] with {}

    given inductive[P <: Nat, N <: Nat, T <: HList, L <: HList, R <: HList]
    (using P <= N, Partition[P :: T, P :: L, R]):
      Partition[P :: N :: T, P :: L, N :: R] with {}

    given inductive2[P <: Nat, N <: Nat, T <: HList, L <: HList, R <: HList]
    (using N < P, Partition[P :: T, P :: L, R]):
      Partition[P :: N :: T, P :: N  :: L, R] with {}

    def apply[HL <: HList, L <: HList, R <: HList]
    (using partition: Partition[HL, L, R]): Partition[HL, L, R] =
        partition
  }
```

Testing this to see whether our `Partition` type works well:

```scala3
  val partition = Partition[_2 :: _3 :: _1 :: HNil, _2 :: _1 :: HNil, _3 :: HNil]
```

This code compiles because the compiler:

- requires a `Partition[_2 :: _3 :: _1 :: HNil, _2 :: _1 :: HNil, _3 :: HNil]`
- can use `inductive`, but it requires a `Partition[_2 :: _1 :: HNil, _2 :: _1 :: HNil, HNil]`
- can use `inductive2`, but it requires a `Partition[_2 :: HNil, _2 :: HNil, HNil]`
- can use `basic2[_2]` to build a `Partition[_2 :: HNil, _2 :: HNil, HNil]`
- works backwards to build the necessary givens.

Note: there are alternative partitioning schemes which the compiler will not be able to validate. This partitioning does not work, for example, although it's perfectly valid.

```scala3
  val partitionAlsoValid = Partition[_2 :: _3 :: _1 :: _4 :: HNil, _2 :: _1 :: HNil, _4 :: _3 :: HNil]
```

But the following does (the `_3` comes before the `_4`)

```scala3
  val partitionAlsoValid = Partition[_2 :: _3 :: _1 :: _4 :: HNil, _2 :: _1 :: HNil, _3 :: _4 :: HNil] // works
```

because the relative order of the elements in the list is kept. For the normal quicksort, the relative order of elements inside each partition is not required.

That is of no consequence for correct sorting, as the compiler will be able to find _at least one_ partitioning that works for quicksort.

## 5. Type-Level Quicksort: The Sorting Operation

This will be the final step in our quicksort algorithm at the type level, which will rely on both concatenation and partitioning (the ops we did before).

I think, by now, we got the hang of it. We'll use a new type `QSort[HL, R]` to test whether the sorting of `HL` is in fact `R`. If the compiler can find or generate a `given` of that type that we want to test, then the sorting is correct, otherwise it's not.

The sorting axioms are as follows:

- Sorting an empty list gives us back an empty list.
- Sorting a non-empty list, say `N :: T` has several requirements:
  - the correct partitioning of the list into a "left" `N :: L` (remember, the pivot is here) and a "right" `R`
  - recursive sorting of `L` and `R` into, say `SL` (sorted "left") and `SR` (sorted "right")
  - the concatenation of the results: `SL` comes first, then `N` the pivot, then `SR`

The first axiom is similar to the basic axioms of the other operations:

```scala3
  given basicEmpty: QSort[HNil, HNil] with {}
```

The second axiom is the juice of this entire article.

```scala3
  given inductive[N <: Nat, T <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList]
    (
      using
      Partition[N :: T, N :: L, R],
      QSort[L, SL],
      QSort[R, SR],
      Concat[SL, N :: SR, O]
    ): QSort[N :: T, O] with {}
```

As before, the complete sorting looks like this:

```scala3
  trait QSort[HL <: HList, Res <: HList]
  object QSort {
    given basicEmpty: QSort[HNil, HNil] with {}
    // given basicOne[N <: Nat]: QSort[N :: HNil, N :: HNil] with {}
    given inductive[N <: Nat, T <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList]
      (
        using
        Partition[N :: T, N :: L, R],
        QSort[L, SL],
        QSort[R, SR],
        Concat[SL, N :: SR, O]
      ): QSort[N :: T, O] with {}

    def apply[HL <: HList, Res <: HList](using sort: QSort[HL, Res]): QSort[HL, Res] = sort
  }
```

And we can test it on a bunch of examples to see that they work:

```scala3
  val sortTest = QSort[_3 :: _2 :: _1 :: _4 :: HNil, _1 :: _2 :: _3 :: _4 :: HNil]
  val sortTest2 = QSort[_1 :: _2 :: _3 :: _4 :: HNil, _1 :: _2 :: _3 :: _4 :: HNil]
  val sortTest3 = QSort[_4 :: _3 :: _2 :: _1 :: HNil, _1 :: _2 :: _3 :: _4 :: HNil]
  val sortTest4 = QSort[_4 :: _4 :: _4 :: HNil, _4 :: _4 :: _4 :: HNil]
```

That's it, folks! Quicksort on types at compile time!

## 6. Type-Level Quicksort... Auto-Inferred

We can take this even further, though. It's one thing for us to "test" that a sorting is correct, but a whole other thing to _make the compiler figure out the correct sorting on its own!_

Let's consider a different kind of sorting type:

```scala3
  trait Sort[HL <: HList] {
    type Result <: HList
  }
```

Notice we eliminated the second generic type argument, and added the abstract type member instead. We will make the compiler "store" that abstract type member all by itself.

In the companion of `Sort`, we'll define a type alias for a sorting operation which looks similar to the `QSort` above.

```scala3
  type QSort[HL <: HList, O <: HList] = Sort[HL] { type Result = O }
```

Why did I do that? In the process of finding the right `given`s, the compiler does type inference anyway. So we can make the compiler infer the generic types automatically in the process of `given` resolution, AND in the meantime write the abstract type argument in `Sort`. Here's how we'll rewrite the axioms.

The first axiom is for sorting an empty list:

```scala3
  given basicEmpty: QSort[HNil, HNil] = new Sort[HNil] { type Result = HNil }
```

Notice the difference? Instead of creating a `QSort[HNil, HNil] with {}` &mdash; which we can't do with abstract type members &mdash; we're instead _providing_ the type signature of the `given` (for later resolutions) and instead we use a `Sort[HNil]` with the right type member.

The inductive axiom is more complex, as expected:

```scala3
  given inductive[N <: Nat, T <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList] (
    using
    Partition[N :: T, N :: L, R],
    QSort[L, SL],
    QSort[R, SR],
    Concat[SL, N :: SR, O]
  ): QSort[N :: T, O] = new Sort[N :: T] { type Result = O }
```

Again, the only thing that's changed here is how the `QSort` instance is actually created: as an instance of `Sort` with the right types.

In total, the new auto-inferred sort looks like this:

```scala3
  trait Sort[HL <: HList] {
    type Result <: HList
  }
  object Sort {
    type QSort[HL <: HList, O <: HList] = Sort[HL] { type Result = O }
    given basicEmpty: QSort[HNil, HNil] = new Sort[HNil] { type Result = HNil }
    given inductive[N <: Nat, T <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList] (
      using
      Partition[N :: T, N :: L, R],
      QSort[L, SL],
      QSort[R, SR],
      Concat[SL, N :: SR, O]
    ): QSort[N :: T, O] = new Sort[N :: T] { type Result = O }

    def apply[L <: HList](using sort: Sort[L]): QSort[L, sort.Result] = sort
  }
```

Now we can safely test it...

```scala3
  val qsort = Sort.apply[_4 :: _3 :: _5 :: _1 :: _2 :: HNil]
```

... or can we?

What's the resulting type? Of course, we can specify it ourselves in the `val` definition, but it defeats the purpose. And the compiler knows the result type anyway!

We could print it to show it's the right one - but we can't simply `.toString` the value, because the generic types, as well as abstract type members, are erased.

We need to save the types to runtime. Rob Norris has this amazing tiny (20-line tiny) [library](https://github.com/tpolecat/typename/tree/main/src/main) that can do that, with a bit of metaprogramming. Adding the following to `build.sbt`

```scala3
  libraryDependencies += "org.tpolecat" %% "typename" % "1.0.0"
```

and with a helper method on my part

```scala3
  def printType[A](value: A)(using typename: TypeName[A]): String = typename.value
```

we can safely print

```scala3
  printType(qsort).replaceAll("com.rockthejvm.blog.typelevelprogramming.TypeLevelProgramming.", "") // remove fully qualified type name prefixes
```

And lo and behold:

```scala3
  Sort[::[_4, ::[_3, ::[_5, ::[_1, ::[_2, HNil]]]]]] {
    type Result >:
      ::[Succ[_0], ::[Succ[_1], ::[Succ[_2], ::[Succ[_3], ::[Succ[_4], HNil]]]]]
    <: ::[Succ[_0], ::[Succ[_1], ::[Succ[_2], ::[Succ[_3], ::[Succ[_4], HNil]]]]]
  }
```

In other words, the result type is `::[Succ[_0], ::[Succ[_1], ::[Succ[_2], ::[Succ[_3], ::[Succ[_4], HNil]]]]]` or `_1 :: _2 :: _4 :: _3 :: _5 :: HNil`!

## 6. Conclusion

If this is not the most badass quicksort you've ever seen in Scala, you can't be human.

Scala rocks, folks.
