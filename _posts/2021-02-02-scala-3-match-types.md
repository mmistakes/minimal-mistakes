---
title: "Match Types in Scala 3"
date: 2021-02-02
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, scala 3]
excerpt: "Scala 3 comes with lots of new features. In this episode, match types: a pattern matching on types, and a tool for more accurate type checking."
---

This article is for the Scala programmers who are curious about the next features of Scala 3. Familiarity with some of the current Scala 2 features (e.g. generics) is assumed. This article will also involve a bit of type-level nuance, so answer to questions like "how is this useful for me?" will be more subtle.

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## 1. Background: First-World Problems

Instead of describing the feature, I want to start with the need first. Let's say you are working on a library for standard data types (e.g. Int, String, Lists), and you want to write a piece of code that extracts the last constituent part of a bigger value:

- assuming BigInts are made of digits, the last part is the last digit
- the last part of a String is a Char
- the last part of a list is the element on its last position

For these purposes, you might want to create the following methods:

```scala3
def lastDigitOf(number: BigInt): Int = (number % 10).toInt

def lastCharOf(string: String): Char =
  if string.isEmpty then throw new NoSuchElementException
  else string.charAt(string.length - 1)

def lastElemOf[T](list: List[T]): T =
  if list.isEmpty then throw new NoSuchElementException
  else list.last
```

Being the DRY maniac you are, you notice that the signatures of these methods is similar, and all of them have the meaning of "last piece of", so you'd like to reduce this API to one grand unifying API which can ideally work for all types. Plus, thinking about the future, you'd like to be able to extend this logic to other types as well in the future, perhaps some that are completely unrelated.

How can you do that in the current Scala 2 world?

## 2. Enter Match Types

Some good news and some bad news. The bad news is that you can't follow your dreams in Scala 2 (not this one at least). The good news is that it's possible in Scala 3.

In Scala 3, we can define a type member which can take different forms &mdash; i.e. reduce to different concrete types &mdash; depending on the type argument we're passing:

```scala3
type ConstituentPartOf[T] = T match
  case BigInt => Int
  case String => Char
  case List[t] => t
```

This is called a match type. Think of it like a pattern match done on types, by the compiler. The following expressions would all be valid:

```scala3
val aNumber: ConstituentPartOf[BigInt] = 2
val aCharacter: ConstituentPartOf[String] = 'a'
val anElement: ConstituentPartOf[List[String]] = "Scala"
```

That `case List[t] => t` is a pattern on types, which is evaluated on variable type arguments. The compiler figures out what the type `t` is, then proceeds to reduce the abstract `ConstituentPartOf[List[t]]` to that `t`. All done at compile time.

## 3. Dependent Methods with Match Types

Now let's see how match types can help solve our first-world-DRY problem. Because all the previous methods have the meaning of "extract the last part of a bigger thing", we can use the match type we've just created to write the following all-powerful API:

```scala3
def lastComponentOf[T](thing: T): ConstituentPartOf[T]
```

This method, in theory, can work with any type for which the relationship between `T` and `ConstituentPartOf[T]` can be successfully established by the compiler. So if we could implement this method, we could simply use it on all types we care about _in the same way_:

```
val lastDigit = lastComponentOf(BigInt(53728573)) // 3
val lastChar = lastComponentOf("Scala") // 'a'
val lastElement = lastComponentOf((1 to 10).toList) // 10
```

Now, for the implementation. There are special compiler rules for methods that return a match type. We need to use a value-level pattern matching with the exact same structure as the type-level pattern matching. Therefore, our method will look like this:

```scala3
def lastComponentOf[T](thing: T): ConstituentPartOf[T] = thing match
  case b: BigInt => (b % 10).toInt
  case s: String =>
    if (s.isEmpty) throw new NoSuchElementException
    else s.charAt(s.length - 1)
  case l: List[_] =>
    if (l.isEmpty) throw new NoSuchElementException
    else l.last
```

And our first-world problem is done by unification.

## 4. The Subtle Need for Match Types

Why would we need these match types to begin with?

The general answer is: **to be able to express methods returning potentially unrelated types (which are dependent on the input types), in a unified way, which can be correctly type-checked at compile time**. That was a mouthful. Let's draw some distinctions to what you may already be familiar with.

**Why is this different from regular inheritance-based OOP?** Because if you write code against an interface, e.g.

```scala3
def returnConstituentPartOf(thing: Any): ConstituentPart = ... // pattern match
```

you lose the type safety of your API, because the real instance is returned at runtime. At the same time, the returned types must all be related, since they must all derive from a mother-trait.

**How is this different from normal generics?** This is a much more nuanced question, since generics are used for exactly this purpose: to be able to reuse code and logic on potentially unrelated types. For example, the logic of a list is identical for lists of Strings and for lists of numbers.

Take, for example, the following method:

```scala3
def listHead[T](l: List[T]): T = l.head
```

From this method signature, it's clear to the compiler that the returned type must be strictly equal to the type of the list this method receives as argument. Any type difference is a deal-breaker. Therefore, there is a direct connection between the returned type and the argument type, which is exactly: "method taking `List[T]` returns a T and nothing else".

On the other hand, our `lastComponentOf` method allows the compiler to be flexible in terms of the returned type, depending on the type definition:

- if the method takes a String argument, it returns a Char
- if it takes a BigInt argument, it returns an Int
- if it takes a `List[T]` argument, it returns a `T`

Expressed this way, we see how we make the connection between argument and return type more loose, but still properly covered.

## 5. Extra Power for Match Types

Match types can be recursive. For example, if we wanted to operate on nested lists, we would say something like

```scala3
type LowestLevelPartOf[T] = T match
  case List[t] => LowestLevelPartOf[t]
  case _ => T

val lastElementOfNestedList: LowestLevelPartOf[List[List[List[Int]]]] = 2 // ok
```

However, the compiler will detect cycles in your definition:

```scala3
// will not compile
type AnnoyingMatchType[T] = T match
  case _ => AnnoyingMatchType[T]
```

And potential infinite recursions:

```scala3
type InfiniteRecursiveType[T] = T match
  case Int => InfiniteRecursiveType[T]

def aNaiveMethod[T]: InfiniteRecursiveType[T] = ???
val illegal: Int = aNaiveMethod[Int] // <-- error here: the compiler SO'd trying to find your type
```

## 6. Limitations for Match Types

As far as I'm aware &mdash; and please correct me if I'm wrong &mdash; the utility of match types in dependent methods is conditioned by the exact signature of the dependent method. So far, only methods with the signature

```scala3
def method[T](argument: T): MyMatchType[T]
```

are allowed. For our use case with `ConstituentPartOf`, if we wanted to create a more useful API, e.g. for adding a value to a container, in the likes of

```scala3
def accumulate[T](accumulator: T, value: ConstituentPartOf[T]): T
```

would be possible to define, but impossible to implement: even if the pattern match structure on `accumulator` is identical to the type-level pattern match, the compiler can't figure out that `accumulator` may have the `+` operator if it's determined to be a BigInt. Such a pattern match would be equivalent with _flow typing_, which is probably a holy grail of the future Scala type system.

## 7. Conclusion

We learned about match types, which are able to solve a very flexible API unification problem. I'm sure some of you will probably dispute the seriousness of the problem to begin with, but it's a powerful tool to have in your type-level arsenal, when you're defining your own APIs or libraries.
