---
title: "The Difference Between Null, Nothing, Nil, None and Unit in Scala"
date: 2020-07-31
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "We explore the various flavors of nothing-ness in Scala."
---

There are lots of terms to express the lack of values in Scala. Today we're going to discuss the difference between null, Null (not a typo), None, Nil, Unit and Nothing. They all seemingly describe the lack of a meaningful value, which can definitely be confusing. Thank goodness Scala doesn't have `undefined`...

This article is for the beginner Scala programmer. We'll make a clear distinction between all these terms, and by the end of this article you'll know which to use when.


## The null reference
This is probably the most familiar. If you come to Scala from another programming language, perhaps <a href="rockthejvm.com/p/scala-at-light-speed">very quickly</a>, you're probably familiar with the `null` reference. It's used as an absent value.

```scala
val anAbsentString: String = null
```

You've surely dealt with your own set of null-access exceptions. That is because an absent value doesn't have fields or methods.

```scala
anAbsentString.length() // triggers the famous NullPointerException
```

This one is easy.

## The Null <em>type</em>

Now, in Scala, the null reference belongs to its own distinct type, which is called `Null` with a capital N.

```scala
val theNullReference: Null = null
```

The Null type has no methods, no fields, cannot be extended or instantiated, so by itself is pretty boring. The only interesting aspect of Null is that it "extends" all reference types. By that we mean that we can successfully use it as a replacement for any reference type

```scala
val noString: String = theNullReference
val noPerson: Person = theNullReference
val noList: List[Int] = theNullReference
```

So from the point of view of subtyping, Null is a proper subtype of all reference types. In Scala, the reference type hierarchy starts with AnyRef at the top and ends with Null at the bottom.

A common question is: how can Null be a proper subtype for all reference types, since Scala offers a single-class inheritance model? The answer is that Null is treated in a particular way by the compiler, so there's no need for us programmers to intervene in any way.

## Nil

This sounds very similar to null and Null, but Nil means something completely different: Nil is the empty implementation of a List.

```scala
val anEmptyList: List[Int] = Nil
```

Unlike null, Nil is a proper value. It has fields and methods:

```scala
val emptyListLength: Int = Nil.length
```

We can pass it around:

```scala
def processList(list: List[Int]): Int = list.length

// later:
procesesList(Nil)
```

and generally do with Nil whatever we do with regular values.

## None

Truth be told, we very rarely use `null` in Scala. Using null incentivizes us to write imperative, Java-style, defensive and error-prone code. Instead of `null`, we commonly use Options, which are data structures meant to represent the presence or absence of a value. Options allow (and force) us to write clearer, more concise code which is harder to fail. The two kinds of instances we can use for Option are `Some` instances and the `None` value.

```scala
val anAbsentInt: Option[Int] = None
val aPresentInt: Option[Int] = Some(42)
```

The difference between `None` and `null` is that `None` is a proper value (much like `Nil`) and we can pass it around and process it. We're going to talk more about Options and why they are useful in another article.

The `null` and `None` values are interoperable, in the sense that we can lift ourselves from the muddy null-checking realm to Options by using the Option apply factory method:

```scala
val anAbsentValue: Option[Int] = Option(null) // this returns None
```

## Unit

Thankfully, Unit will hopefully prove a little clearer. One of the very first things we learn as Scala programmers coming from another language is how to declare methods returning "void". The equivalent of "void" in other languages is `Unit` in Scala.

```scala
def aUnitReturningFunction(): Unit = println("Starting to get the difference!")
```

If you are clear on the difference between `null` and `void` in other languages, you'll understand how `Unit` is different from what we talked so far.

## Nothing

Finally, let's end with the mother of nothingness. We've <a href="https://rockthejvm.com/blog/much-ado-about-nothing">spoken about Nothing before</a> so we won't spend too much time here, but Nothing is the type of no value at all. Nothing can't be instantiated and has no values of that type. Nothing truly means nothing: not even null, not Unit, not None, nothing at all. The only expressions that return Nothing are throwing exceptions:

```scala
val theNothing = throw new RuntimeException("Nothing to see here")
```

The interesting thing about Nothing is that, much like Null, it can be used as a replacement for any type - this time including the value types:

```scala
val nothingInt: Int = throw new RuntimeException("No int")
val nothingString: String = throw new RuntimeException("No string")
```

In other words, Nothing is a proper subtype for all possible types in Scala. Much like Null, it's treated in a special way by the compiler.

## Conclusion

I hope that by now you have more clarity about the differences between null, Null, None, Nil, Unit and Nothing. Each is used for a completely different purpose, unlike some other languages' multiple null versions (cough* JavaScript cough*).
