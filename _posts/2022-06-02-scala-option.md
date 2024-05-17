---
title: "Scala Option: A Gentle Introduction"
date: 2022-06-02
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, beginners]
excerpt: "Scala Options are some of the first things we learn - but why? What do they do, and why are they useful?"
---

This is a beginner-friendly article. We'll introduce Scala Options, a seemingly contrived data structure, but we'll see in this post that it's extremely powerful and useful in its simplicity. If you're just getting started with Scala and Options seem hard to understand, this article is for you.

We teach Options in-depth in the [Scala Essentials](https://rockthejvm.com/p/scala) course, along with examples and exercises, if you want to check it out. In this article, we'll introduce Options, show you how they work, and _why_ they exist.


If you want to see this article in video form, please watch below:

{% include video id="xywCiwNwPEU" provider="youtube" %}

## 1. Introduction to Scala Option

The first real data structure we learn when getting started with Scala is the list. It's quick to set up, and easy to understand.

```scala
val aList: List[Int] = List(1,2,3)
```

You probably know by now that lists are immutable &mdash; every transformation on a list results in a new list &mdash; and there are some transformations we use a lot: `map`, `flatMap` and `filter`:

```scala
val aTransformedList = aList.map(x => x + 1) // [2,3,4]
val aTransformedList_v2 = aList.flatMap(x => List(x, x+1)) // [1,2 ,2,3, 3,4]
val aFilteredList = aList.filter(x => x % 2 == 0) // [2]
```

To recap:

- `map` turns a list into another, where for every element in the original list, the supplied function is apply
- `flatMap` runs a function on every element on the list, resulting in many mini-lists; these lists are then concatenated into the final result
- `filter` keeps the elements which satisfy the boolean predicate passed as argument

Because we have `map` and `flatMap`, we can run for-comprehensions on lists:

```scala
val combinedLists = for {
  num <- List(1,2,3)
  char <- List('a','b')
} yield s"$num-$char"
// List(1,2,3).flatMap(num => List('a','b').map(char => s"$num-$char"))
// [1-a, 1-b, 2-a, 2-b, 3-a, 3-b]
```

You also probably know that for-comprehensions are rewritten by the compiler into chains of `map` and `flatMap`, as you can see in the above snippet. The coolest thing about for-comprehensions is that any data structure can be eligible for for-comprehensions, as long as they have `map` and `flatMap` with similar signatures as that of the `List` type.

Why did we start this post describing lists instead of Options?

The easiest way to understand a Scala Option is to imagine it as a **list with at most one value**, that is, it either contains a single value, or nothing at all.

```scala
val anOption: Option[Int] = Option(42) // an option that contains a single value: 42
val anEmptyOption: Option[Int] = Option.empty // an option that doesn't contain any value
```

Let's see some operators on Options.

## 2. Scala Option API

First, let's talk about the possible cases of an Option:

- an empty Option containing no value
- an Option containing a single value

We can build these cases explicitly:

```scala
val anOption_v2: Option[Int] = Some(42) // same as Option(42)
val anEmptyOption_v2: Option[Int] = None // same as Option.empty
```

A very interesting case is when we use `Option(null)`, which gives back a `None`, i.e. an empty Option. We'll come back to this idea, because it leads to the main reason why Scala Options are useful in the first place.

Much like lists, Options can be transformed with `map`, `flatMap` and `filter`. The `map` function transforms an Option by returning a new Option containing
- nothing, if the original Option was empty
- the transformed element of the original Option contained a value

```scala
val aTransformedOption: Option[Int] = anOption.map(x => x * 10) // Some(420)
```

The `flatMap` method is a bit more difficult, but it resembles the list `flatMap` method &mdash; the function we pass as argument turns an element into another Option:

```scala
val aTransformedOption_v2: Option[Int] = anOption.flatMap(x => Option(x * 10)) // Some(420)
```

However, in this case, the `flatMap` method doesn't have the _meaning_ of concatenation (as was the case for lists), because here there's either a single value, or nothing. For Option, the `flatMap` method is a way of _chaining_ computations that may either produce a value or nothing. This general idea of sequencing computations is [immensely powerful](/monads/).

Finally, the `filter` method retains the original value of the Option if it passes a predicate, or it discards it otherwise, turning the original Option into None. Of course, if the original Option was empty to begin with, there's nothing to filter, hence nothing to process.

```scala
val aFilteredOption: Option[Int] = anOption.filter(x => x > 100) // None
```

Now, because we have `map` and `flatMap`, we also have for-comprehensions unlocked for Option:

```scala
val combinedOptions = for {
  num <- Option(42)
  str <- Option("Scala")
} yield s"$str is the meaning of life, aka $num"
```

For those of you coming to Scala from another language, the for-comprehension might look a little... unusual. When our background is mostly imperative languages (Java, Python, C++, C#, etc), we tend to think about `for` structures as "loops". In Scala, a for-comprehension is **not** a loop, but rather a chain of `map` and `flatMap`, which we saw are expressions returning other data structures.

Besides `map`, `flatMap` and `filter`, Options also have other APIs to transform values or run checks:

```scala
val checkEmpty: Boolean = anOption.isEmpty
val innerValue: Int = anOption.getOrElse(99)
val aChainedOption: Option[Int] = anEmptyOption.orElse(anOption)
```

The `isEmpty` method checks whether an Option contains nothing. The `getOrElse` method returns either the value inside the option, or the default value which we pass as argument. Finally, the `orElse` method returns the original Option if non-empty, or the other option otherwise. There's also a `get` method on Option, which returns the value inside, but beware: if the Option is empty, the method will crash!

There are more methods in the Option data type, but these are the most frequently used.

## 3. Why We Need Options in Scala

At this point, you might be thinking why on Earth we need this weird data structure which resembles a list, but it only contains a single value or nothing. Why can't we just use a list?

The reason why Options are useful is not the same why Lists are useful. Options are not used to "store" values &mdash; as your intuition clearly can tell, we can use lists to store as many values as we like. The utility of Options is not in data storage.

Options are used to describe the **possible absence of a value**.

If, like most of us, your experience is mostly with the "mainstream" languages like Java or C, you've probably been dealing with the absence of values by using the `null` reference. Because `null` is a proper replacement for every type, at the slightest suspicion that an expression might return null, we need to write defensive code so that we stay away from the dreaded `NullPointerException`.

```scala
def unsafeMethod(arg: Int): String = null // implementation not important, assume that for some code path the function returns null
// defensive code
val potentialValue = unsafeMethod(44)
val myRealResult =
  if (potentialValue == null)
    "ERROR"
  else
    potentialValue.toUpperCase()
```

However, in real life we deal not just with one value, but with many. Assume we want to combine two such calls to `unsafeMethod`. How would we do it? Defensively, of course:

```scala
val callToExternalService = unsafeMethod(55)
val combinedResult =
  if (potentialValue == null)
    if (callToExternalService == null)
      "ERROR 1"
    else
      "ERROR 2"
  else
    if (callToExternalService == null)
      "ERROR 3"
    else
      potentialValue.toUpperCase() + callToExternalService.toUpperCase()
```

Nothing short of horrible. What if we need to combine 3 values? Do we add 8 if-clauses there? This is unproductive, unmaintainable and unreadable.

Options can save us from ourselves:

```scala
val betterCombinedResult: Option[String] = for {
  firstValue <- Option(unsafeMethod(44))
  secondValue <- Option(unsafeMethod(55))
} yield firstValue.toUpperCase() + secondValue.toUpperCase()

val finalValue = betterCombinedResult.getOrElse("ERROR")
```

The for-comprehension, because it's expressed in terms of `map` and `flatMap`, can take care automatically to check whether the Options inside are empty or not, and return the appropriate value, without us checking everything ourselves. This code offers many benefits:

- much easier to understand: combine 2 Options if they're non-empty, return empty otherwise
- easier to maintain: can easily add another Option there without blowing up the if-else conditions
- much shorter, saving us time and (mental) space

With this in mind, we'll write a first piece of good practice:

> When you have APIs that risk returning nulls, wrap them in Options when you use them. Better yet, if you can change the API, return Option[YourType] instead.

## 4. Resisting the Temptation to Retrieve Option Values

Beginning Scala programmers, upon learning about Options, can successfully navigate Option transformations in other people's code. However, when some external code hands them an Option, the immediate itch is to try to "get" the value inside the Option, so that you can do something meaningful to it.

That's a mistake.

Because you don't know whether an Option is empty or not, if we ever want to "get" a value safely we need to test whether the Option is empty or not. Considering the same example with calling the `unsafeMethod` multiple times (this time wrapped inside Options), scratching the itch to "get" the values inside will lead us to code that looks like this:

```scala
val firstValue = Option(unsafeMethod(44))
val secondValue = Option(unsafeMethod(55))
val combinedResult_v2 =
  if (firstValue.isEmpty)
    if (secondValue.isEmpty)
      "ERROR 1"
    else
      "ERROR 2"
  else
    if (secondValue.isEmpty)
      "ERROR 3"
    else
      firstValue.get.toUpperCase() + secondValue.get.toUpperCase()
```

Notice something? This is just as bad as dealing with nulls in the first place!

So here's the second piece of advice:

> Resist the temptation to "get" the values inside your Options. Rather, use transformations like `map`, `flatMap`, `filter`, `orElse`, etc.

## 5. The Option Mistake of Doom

We mentioned at the beginning that we can build Options with the `Some` and `None` constructors explicitly. That's discouraged; you should always use the `Option` constructor/apply method all the time.

The reason is that by the contract of `Some`, this Option is guaranteed to never contain a null value. However, if you ever write

```scala
val myOption = Some(myExpression)
```

on the grounds that you're "sure" the expression will never return null, you can be mistaken. If so, you'll be _gravely_ mistaken, because subsequent computations will rely on the fact that the Option is non-empty, or that the value contained is not null. If you ever break that contract, your application can crash so bad and so much later than the moment you wrote this code, that debugging can take hours, days or more.

So here's the final bit of best practice:

> Always use the `Option` "constructor"/apply method to build new Options. NEVER EVER use `Some(null)` or `Some(anExpressionThatCanBeNull)`, because you'll kill us all.

## 6. Conclusion

In this article, we introduced Scala Options: how you can start thinking about them, the main API, how to transform Options, _why_ they are useful, and we also shared some bits of best practice when dealing with them.
