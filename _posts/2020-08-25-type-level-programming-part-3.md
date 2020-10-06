---
title: "Type-Level Programming in Scala, Part 3"
date: 2020-08-25
header:
  image: "/images/blog cover.jpg"
tags: [scala, type system]
excerpt: "Final blow in the type-level trilogy. We learn how to sort lists... at compile time."
---
In this article we will continue what we started in the <a href="https://rockthejvm.com/blog/type-level-programming-1">first</a> and <a href="https://rockthejvm.com/blog/type-level-programming-2">second part of the series</a> and become a badass type-level programmer in Scala. This mini-series is about using the power of the Scala compiler to enforce complex relationships between types that mean something special to us. In the <a href="https://rockthejvm.com/blog/type-level-programming-1">first part</a>, we defined the "less-than" relationship between numbers as types, and in the <a href="https://rockthejvm.com/blog/type-level-programming-2">second part</a> we learned to "add" two "numbers" as types. Everything, again, at compile time.

The third time is the charm. In this third part, we're going to do something magical. We're going to rely on the first part (with number-type comparisons) and sort lists... at compile time.

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

We are considering numbers as types, in the Peano representation: zero as the starting number, and every number defined in terms of its succession to another number.

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

We then built a comparison relationship as a type, while making the compiler build implicit instances of that type so that it can "prove" than one "number" is "less than" another. The code looked like this:

```scala
  trait <[A <: Nat, B <: Nat]
  object < {
    implicit def ltBasic[B <: Nat]: <[_0, Succ[B]] = new <[_0, Succ[B]] {}
    implicit def inductive[A <: Nat, B <: Nat](implicit lt: <[A, B]): <[Succ[A], Succ[B]] = new <[Succ[A], Succ[B]] {}
    def apply[A <: Nat, B <: Nat](implicit lt: <[A, B]) = lt
  }
  val comparison: _1 < _3 = <[_1, _3]
  /*
    What the compiler does:

    <.apply[_1, _3] -> requires implicit <[_1, _3]
    inductive[_0, _2] -> requires implicit <[_0, _2]
    ltBasic[_1] -> produces implicit <[_0, Succ[_1]] == <[_0, _2]
   */
  // val invalidComparison: _3 < _2 = <[_3, _2] - will not compile: 3 is NOT less than 2

  trait <=[A <: Nat, B <: Nat]
  object <= {
    implicit def lteBasic[B <: Nat]: <=[_0, B] = new <=[_0, B] {}
    implicit def inductive[A <: Nat, B <: Nat](implicit lte: <=[A, B]): <=[Succ[A], Succ[B]] = new <=[Succ[A], Succ[B]] {}
    def apply[A <: Nat, B <: Nat](implicit lte: <=[A, B]) = lte
  }
  val lteTest: _1 <= _1 = <=[_1, _1]
  // val invalidLte: _3 <= _1 = <=[_3, _1] - will not compile
```

The second part was about real arithmetic between numbers. We also embedded the addition between two number-types as a type:

```scala
  // this time, we'll embed the result as a type member
  trait +[A <: Nat, B <: Nat] { type Result <: Nat }
  object + {
    type Plus[A <: Nat, B <: Nat, S <: Nat] = +[A, B] { type Result = S }
    // 0 + 0 = 0
    implicit val zero: Plus[_0, _0, _0] = new +[_0, _0] { type Result = _0 }
    // for every A <: Nat st A > 0, we have A + 0 = A and 0 + A = A
    implicit def basicRight[A <: Nat](implicit lt: _0 < A): Plus[_0, A, A] = new +[_0, A] { type Result = A }
    implicit def basicLeft[A <: Nat](implicit lt: _0 < A): Plus[A, _0, A] = new +[A, _0] { type Result = A }
    // if A + B = S, then Succ[A] + Succ[B] = Succ[Succ[S]]
    implicit def inductive[A <: Nat, B <: Nat, S <: Nat](implicit plus: Plus[A, B, S]): Plus[Succ[A], Succ[B], Succ[Succ[S]]] =
      new +[Succ[A], Succ[B]] { type Result = Succ[Succ[S]] }
    def apply[A <: Nat, B <: Nat](implicit plus: +[A, B]): Plus[A, B, plus.Result] = plus
  }

  val zero: +[_0, _0] = +.apply
  val two: +[_0, _2] = +.apply
  val four: +[_1, _3] = +.apply
  // val invalidFour: +[_2, _3, _4] = +.apply
  /*
    - I need an implicit +[1, 3, 4] == +[Succ[0], Succ[2], Succ[Succ[2]]]
    - can run inductive, but I ned an implicit +[0, 2, 2]
    - can run basicRight and construct a +[0, 2, 2]
   */
```

With that, we're ready to get started into our most complex work yet: sorting lists at compile time.

## Lists as types

As is now pretty standard for the series, we'll represent everything as a type. In our case, we'll represent lists of number-types as types again:

```scala
trait HList
class HNil extends HList
class ::[H <: Nat, T <: HList] extends HList
```

You may have seen similar definitions for heterogeneous lists (hence the HList name) in Shapeless and other libraries. In our case, our HList types are only restricted to Nat types.

We're going to sort these HList types into other HList types, all inferred by the compiler. For that, we're going to use a merge-sort algorithm. You must know it already. We need to

  - split the lists in half
  - sort the halves
  - then merge the halves back in a sorted order

Every operation will be encoded as a type, and all results will be computed by the compiler via implicits.

## Operation 1: The Split

We need to be able to split a list in exactly half or at most one element difference (if the list has an odd number of elements). I bet you're used to encoding operations as types - this is what the second part's arithmetic was about - so we'll encode this as a type as well:

```scala
trait Split[HL <: HList, L <: HList, R <: HList]
```

In this case, HL is the original list, and L and R are the "left" and "right" halves of the list, respectively. We're going to make the compiler compute instances of this Split type, and thus prove that a list can be halved. As before, we're going to do everything in a companion of Split, starting with the basic case: an empty list is halved into two empty lists:

```scala
object Split {
  implicit val basic: Split[HNil, HNil, HNil] = new Split[HNil, HNil, HNil] {}
}
```

This is one of the starting points. Another basic case is that any one-element list can also be split into itself on the left, and empty on the right:

```scala
implicit def basic2[N <: Nat]: Split[N :: HNil, N :: HNil, HNil] =
    new Split[N :: HNil, N :: HNil, HNil] {}
```

In the above, we're using the infix :: to make the types easier to read. So for any type N which is a "number", the compiler can automatically create an instance of `Split[N :: HNil, N :: HNil, HNil]`, which is proof of the existence of a split of a list of one element into itself and the empty type.

The general inductive case, is when you have a list with at least two elements. That will have the type `N1 :: N2 :: T`, where T is some other list type (the tail of the list).

```scala
implicit def inductive[H <: Nat, HH <: Nat, T <: HList, L <: HList, R <: HList]
    (implicit split: Split[T, L, R])
    : Split[H :: HH :: T, H :: L, HH :: R]
    = new Split[H :: HH :: T, H :: L, HH :: R] {}
```

In other words, if the tail T can be split into L and R - as detected by the compiler in the presence of an implicit `Split[T,L,R]` then N1 :: N2 :: T can be split into N1 :: L and N2 :: R. One number goes to the left, the other to the right.

We can now add an apply method in Split:

```scala
def apply[HL <: HList, L <: HList, R <: HList](implicit split: Split[HL, L, R]) = split
```

and then test it out:

```scala
val validSplit: Split[_1 :: _2 :: _3 :: HNil, _1 :: _3 :: HNil, _2 :: HNil] = Split.apply
```

This works, because the compiler does the following:
  - it requires an implicit `Split[_1 :: _2 :: _3 :: HNil, _1 :: _3 :: HNil, _2 :: HNil]`
  - it can build that implicit by running inductive, but it needs an implicit `Split[_3 :: HNil, _3 :: HNil, HNil]`
  - it can build that implicit by running `basic2[_3]`
  - it will then build the dependent implicits as required

Conversely, the compiler will not compile your code if the split is invalid:

```scala
// will not compile
val invalidSplit: Split[_1 :: _2 :: _3 :: HNil, _1 :: HNil, _2 :: _3 :: HNil] = Split.apply
```

Though technically viable, the compiler needs to have a single proof for a split, so we chose the approach of "one number to the left, one to the right" and consider everything else invalid.

## Operation 2: The Merge

You know the drill - we'll create a new type which will have the meaning of a sorted merge of two lists:

```scala
trait Merge[LA <: HList, LB <: HList, L <: HList]
```

This means list LA merges with list LB and results in the final list L. We have two basic axioms we need to start with, and that is any list merged with HNil results in that list:

```scala
object Merge {
    implicit def basicLeft[L <: HList]: Merge[HNil, L, L] =
        new Merge[HNil, L, L] {}
    implicit def basicRight[L <: HList]: Merge[L, HNil, L] =
        new Merge[L, HNil, L] {}
}
```

This time we need two basic axioms because the types `Merge[HNil, L, L]` and `Merge[L, HNil, L]` are different to the compiler.

The inductive implicits are interesting. Considering two lists with at least an element each, say `HA :: TA` and `HB :: TB`, we need to compare their heads HA and HB:

  - if HA <= HB, then HA must stay first in the result
  - if HB < HA, then HB must stay first in the result

The question is, what's the result?

  - if HA <= HB, then the compiler must find a merge between TA and the other list `HB :: TB`, so it'll need an implicit instance of `Merge[TA, HB :: TB, O]`, where O is some HList, and the final result will be `HA :: O`
  - if HB < HA, it's the other way around - the compiler needs to find an implicit of `Merge[HA :: TA, TB, O]` and then the final result will be `HB :: O`

So we need to embed those rules as implicits:

```scala
implicit def inductiveLTE[HA <: Nat, TA <: HList, HB <: Nat, TB <: HList, O <: HList]
    (implicit merged: Merge[TA, HB :: TB, O], lte: HA <= HB)
    : Merge[HA :: TA, HB :: TB, HA :: O]
    = new Merge[HA :: TA, HB :: TB, HA :: O] {}

implicit def inductiveGT[HA <: Nat, TA <: HList, HB <: Nat, TB <: HList, O <: HList]
    (implicit merged: Merge[HA :: TA, TB, O], g: HB < HA)
    : Merge[HA :: TA, HB :: TB, HB :: O]
    = new Merge[HA :: TA, HB :: TB, HB :: O] {}
```

Let's take the first case and read it: if the compiler can find an implicit `Merge[TA, HB :: TB, O]` and an implicit instance of `HA <= HB` (based on part 1), then the compiler will be able to automatically create an instance of `Merge[HA :: TA, HB :: TB, HA :: O]`, which means that HA stays at the front of the result.

The other case reads in the exact same way except the conditions are the opposite: HB < HA, so HB needs to stay at the front of the result.

Finally, if we add an apply method to Merge:

```scala
def apply[LA <: HList, LB <: HList, O <: HList](implicit merged: Merge[LA, LB, O]) = merged
```

then we should be able to test it:

```scala
val validMerge: Merge[_1 :: _3 :: HNil, _2 :: HNil, _1 :: _2 :: _3 :: HNil] = Merge.apply
```

This works, because the compiler

  - requires an implicit `Merge[_1 :: _3 :: HNil, _2 :: HNil, _1 :: _2 :: _3 :: HNil]`
  - will run the inductiveLTE, requiring an implicit `Merge[_3 :: HNil, _2 :: HNil, _2 :: _3 :: HNil]` and an implicit `_1 < _2`, which we'll assume true by virtue of Part 1
  - will run inductiveGT, requiring an implicit `Merge[_3 :: HNil, HNil, _3 :: HNil]`
  - will run basicLeft, creating an implicit `Merge[_3 :: HNil, HNil, _3 :: HNil]`
  - will create all the dependent implicits in reverse order

Conversely, if you try an invalid merge, the compiler won't compile your code because it can't find the appropriate implicits.

## Operation 3: The Sort

By now you should be ahead of my writing - encode the sort operation as a type:

```scala
trait Sort[L <: HList, O <: HList]
```

where L is the input list and O is the output list. Let's now think of the sorting axioms, again in the companion object of Sorted.

The first basic axiom is that an empty list should stay unchanged:

```scala
implicit val basicNil: Sorted[HNil, HNil] = new Sorted[HNil, HNil] {}
```

Same for a list of one element:

```scala
implicit def basicOne[H <: Nat]: Sorted[H :: HNil, H :: HNil] =
    new Sorted[H :: HNil, H :: HNil] {}
```

Now the inductive axiom is the killer one, as it will require all our previous work. We'll need the compiler to split the list, sort the halves and merge them back. Here's how we can encode that:

```scala
implicit def inductive[I <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList]
    (implicit
     split: Split[I, L, R],
     sl: Sort[L, SL],
     sr: Sort[R, SR],
     merged: Merge[SL, SR, O])
    : Sort[I, O]
    = new Sort[I, O] {}
```

This reads as:
  - given a Split of the input list into left (L) and right (R)
  - given an existing instance of `Sort[L, SL]`
  - given an existing instance of `Sort[R, SR]`
  - given a Merge of SL and SR (which are sorted) into O

then the compiler can automatically build an instance of `Sort[I, O]`. With a little bit of practice, this reads like natural language, doesn't it? Split, sort left, sort right, merge.

Let's stick an apply method there:

```scala
def apply[L <: HList, O <: HList](implicit sorted: Sorted[L, O]) = sorted
```

And we should be free to test!

```scala
val validSort: Sort[
    _4 :: _3 :: _5 :: _1 :: _2 :: HNil,
    _1 :: _2 :: _3 :: _4 :: _5 :: HNil
    ] = Sort.apply
```

This compiles, because the compiler will bend over backwards to try to find an implicit for every operation we need: the split of `_4 :: _3 :: _5 :: _1 :: _2 :: HNil`, the sorting of the smaller lists - which involve another splitting - and the merge of `_2 :: _4 :: _5 :: HNil` with `_1 :: _3 :: HNil` into the final result.

Just plain amazing. The Scala compiler is awesome.

## Operation Figure It Out

We can make the compiler awesomer. What we have above is just asking for the compiler to validate whether sorting 4,3,5,1,2 results in 1,2,3,4,5. We can go further and make the compiler figure that out by itself.

For this, we'll use the trick we used in Part 2, when we made the compiler figure out what the sum of two numbers was supposed to be. We'll do the same here.

Instead of having the Sort type take two arguments, let's have it take only one and store the result as a type member instead:

```scala
trait Sort[L <: HList] {
    type Result <: HList
}
```

And in the Sort companion object, we'll create an auxiliary type with two type arguments:

```scala
type SortOp[L <: HList, O <: HList] = Sort[L] {
    type Result = O
    }
```

Now with this SortOp type alias, we'll make our implicits return this SortOp type, but since we can't instantiate it by itself, we'll need to create a Sort instance with the right type member:

```scala
implicit val basicNil: SortOp[HNil, HNil] =
    new Sort[HNil] { type Result = HNil }
```

The signature looks identical to what we had before (we're returning an instance with two type arguments), but in the implementation we're returning an instance of Sort with a single type argument and the right type member inside. This is the trick we'll use to make the compiler figure out the result type for us.

A similar implementation for the other basic axiom:

```scala
implicit def basicOne[H <: Nat]: SortOp[H :: HNil, H :: HNil] =
    new Sort[H :: HNil] { type Result = H :: HNil }
```

And a similar approach (with changes in multiple places for the inductive implicit:

```scala
implicit def inductive[I <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList]
    (implicit
     split: Split[I, L, R],
     sl: SortOp[L, SL],
     sr: SortOp[R, SR],
     merged: Merge[SL, SR, O])
    : SortOp[I, O]
    = new Sort[I] { type Result = O }
```

And with that, we can make the compiler figure out what the result type should be:

```scala
> show(Sort[_4 :: _3 :: _5 :: _1 :: _2 :: HNil])
TypeTag[... { type Result =
    Succ[_0]
    :: Succ[Succ[_0]]
    :: Succ[Succ[Succ[_0]]]
    :: Succ[Succ[Succ[Succ[_0]]]]
    :: Succ[Succ[Succ[Succ[Succ[_0]]]]]
    :: HNil
}]
```

In other words, the result is 1, 2, 3, 4, 5.

We love you, compiler.

## The Final Code

This is the final version of what we wrote in this part. Stick the first two parts before it and you'll have the greatest merge sort in Scala the world has ever seen.

```scala
trait HList
class HNil extends HList
class ::[H <: Nat, T <: HList] extends HList
trait Split[HL <: HList, L <: HList, R <: HList]
object Split {
  implicit def basic: Split[HNil, HNil, HNil] = new Split[HNil, HNil, HNil] {}
  implicit def basic2[H <: Nat]: Split[H :: HNil, H :: HNil, HNil] = new Split[H :: HNil, H :: HNil, HNil] {}
  implicit def inductive[H <: Nat, HH <: Nat, T <: HList, L <: HList, R <: HList] (implicit split: Split[T, L, R]): Split[H :: HH :: T, H :: L, HH :: R] =
    new Split[H :: HH :: T, H :: L, HH :: R] {}
  def apply[HL <: HList, L <: HList, R <: HList](implicit split: Split[HL, L, R]) = split
}

val validSplit: Split[_1 :: _2 :: _3 :: HNil, _1 :: _3 :: HNil, _2 :: HNil] = Split.apply // good
// val invalidSplit: Split[_1 :: _2 :: _3 :: HNil, _1 :: _2 :: HNil, _3 :: HNil] = Split.apply // doesn't compile

trait Merge[LA <: HList, LB <: HList, L <: HList]
object Merge {
  implicit def basicLeft[L <: HList]: Merge[HNil, L, L] = new Merge[HNil, L, L] {}
  implicit def basicRight[L <: HList]: Merge[L, HNil, L] = new Merge[L, HNil, L] {}
  implicit def inductiveLTE[HA <: Nat, TA <: HList, HB <: Nat, TB <: HList, O <: HList] (implicit merged: Merge[TA, HB :: TB, O], lte: HA <= HB)
  : Merge[HA :: TA, HB :: TB, HA :: O] = new Merge[HA :: TA, HB :: TB, HA :: O] {}
  implicit def inductiveGT[HA <: Nat, TA <: HList, HB <: Nat, TB <: HList, O <: HList] (implicit merged: Merge[HA :: TA, TB, O], g: HB < HA)
  : Merge[HA :: TA, HB :: TB, HB :: O] = new Merge[HA :: TA, HB :: TB, HB :: O] {}
  def apply[LA <: HList, LB <: HList, O <: HList](implicit merged: Merge[LA, LB, O]) = merged
}

val validMerge: Merge[_1 :: _3 :: HNil, _2 :: HNil, _1 :: _2 :: _3 :: HNil] = Merge.apply // compiles

trait Sort[L <: HList] {
  type Result <: HList
}
object Sort {
  type SortOp[L <: HList, O <: HList] = Sort[L] { type Result = O }
  implicit val basicNil: SortOp[HNil, HNil] = new Sort[HNil] { type Result = HNil }
  implicit def basicOne[H <: Nat]: SortOp[H :: HNil, H :: HNil] = new Sort[H :: HNil] { type Result = H :: HNil }
  implicit def inductive[I <: HList, L <: HList, R <: HList, SL <: HList, SR <: HList, O <: HList]
  (implicit
   split: Split[I, L, R],
   sl: SortOp[L, SL],
   sr: SortOp[R, SR],
   merged: Merge[SL, SR, O])
  : SortOp[I, O]
  = new Sort[I] { type Result = O }

  def apply[L <: HList](implicit sorted: Sort[L]): SortOp[L, sorted.Result] = sorted
}

println(show(Sort[_4 :: _3 :: _5 :: _1 :: _2 :: HNil])) // if it compiles, you're good!
```