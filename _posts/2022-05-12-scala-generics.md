---
title: "Scala Generics: A Gentle Introduction"
date: 2022-05-12
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, beginners]
excerpt: "Scala generics are easy to understand if you come from a Java background. But what about Python or JS folks?"
---

This beginner-friendly article will introduce you to Scala generics in a smooth, approachable way. If you're just getting started with Scala and generics seem challenging to you, we'll make everything clear. The article is aimed at people getting into Scala from other languages _with dynamic typing_, such as Python or JavaScript. In my experience teaching, I noticed that Scala's type system, particularly generics, [variance](/scala-variance-positions/) and other bits around generics seem to be especially difficult if my students' entire programming experience was in Python, JS or other languages with dynamic type systems. That said, Java folks will also benefit from this article.

This is a Scala generics guide that will explain
- what generics are in Scala
- where and how to use them
- most importantly, _why_ they exist

The concept of Scala generics is explained in-depth and with practice exercises in the [Scala Essentials course](https://rockthejvm.com/p/scala). The code that we write in this article works on both Scala 2 and Scala 3.

If you want to see this article in video form, please watch below:

{% include video id="ozcY_K-ij20" provider="youtube" %}

## 1. Introduction to Scala Generics

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Dynamically typed languages only work because you already have the types in your head.</p>&mdash; Rock the JVM (@rockthejvm) <a href="https://twitter.com/rockthejvm/status/1519578027411349505?ref_src=twsrc%5Etfw">April 28, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

If you've started to learn Scala, you probably know that Scala has a _static type system_. By this we mean that the types of all the values, variables and expressions in your program are known by the compiler ahead of time, before the program runs. The compiler is therefore a tool to help us catch bugs in case we call some method or operator that is not allowed for those particular types. That's not the case for languages like Python or JavaScript; and there are lots of reasons to adopt a static or dynamic type system, and we won't need to go to deep there.

In Scala, when we create a list, we write

```scala
val aList = List(1,2,3)
```

whereas in Python or JavaScript we write

```python
aList = [1,2,3]
```

Not much different, but in the case of the Scala compiler, the compiler already knows that `aList` is a list of integers, therefore you know for sure that when you write

```scala
val aNumber = aList(2)
```

that is an integer, whereas in the other cases (Python, JS, etc) the list might contain ints, strings and other data structures in the same place!

We say that the type of `aList` is `List[Int]`, a list of integers. The `[Int]` is a _type argument_, which gives us a clear indication that all numbers in this list are integers: we can add integers, extract integers, transform integers, etc. Alternatively, we say that the type `List` is _generic_, meaning that you can use the list concept on many different types, and work with lists of ints, with lists of strings and everything else.

For now, remember this:

> The reason why we have a static type system is so that we can correctly make _assumptions_ about the data we work with.

Scala generics were invented as an extension to this fact: by working with a `List[Int]`, for example, we can safely make the assumption that all this list will ever contain is integers. This will allow us, for instance, to sum up all the numbers in the list. This would not have been possible if we hadn't known the types of all elements.

## 2. Why We Use Generics in Scala

There is another big reason that Scala generics are so useful:

> Generics allow us to reuse the same logic on many (potentially unrelated) types.

Let's assume for a moment that you're designing your own data structure. Say, a list. We start simple, with a definition that will allow us to store integers, because in our application we work with numbers most of the time. A definition might look something like this:

```scala
  trait MyList {
    def head: Int
    def tail: MyList
  }
```

The fundamental operations of a list are to
- get the first element (head)
- get the rest of the list, without the head (which is also a list)

We can implement this list by considering two cases
- an empty list, for which both the `head` and `tail` method return nothing/throw an exception
- a non-empty list which contain both pieces of data

Sample implementations would look like this:

```scala
  case class Empty() extends MyList {
    override def head = throw new NoSuchElementException()
    override def tail = throw new NoSuchElementException()
  }

  case class NonEmpty(h: Int, t: MyList) extends MyList {
    override def head = h
    override def tail = t
  }
```

We have a list definition, so we can start using it:

```scala
val someNumbers: MyList = NonEmpty(1, NonEmpty(2, NonEmpty(3, Empty())))
val secondNumber = someNumbers.tail.head
```
So far, so good.

Let's imagine now that your application needs a list that would be applicable to Strings, too. In this case, our current list doesn't suffice, because it's strictly tied to integers. But we can copy it!

```scala
  trait MyListString {
    def head: String
    def tail: MyListString
  }

  case class EmptyString() extends MyListString {
    override def head = throw new NoSuchElementException()
    override def tail = throw new NoSuchElementException()
  }

  case class NonEmptyString(h: String, t: MyListString) extends MyListString {
    override def head = h
    override def tail = t
  }
```

Done - one copy/paste and a few renames, and we also have a list of strings!

```scala
val someStrings: MyListString = NonEmptyString("I", NonEmptyString("love", NonEmptyString("Scala", EmptyString())))
```

But what if our needs increase? What if we want to apply this list concept to more than `Int` and `String` and copying becomes unsustainable? We can use one List with `Any` (the parent of all types) as the type!

```scala
  trait MyListAny {
    def head: Any
    def tail: MyListAny
  }

  case class EmptyAny() extends MyListAny {
    override def head = throw new NoSuchElementException()
    override def tail = throw new NoSuchElementException()
  }

  case class NonEmptyAny(h: Any, t: MyListAny) extends MyListAny {
    override def head = h
    override def tail = t
  }
```

Now, we only need to use this one, and it will be applicable for both numbers and strings and everything else!

However, there's a problem. Because the elements are of type `Any`, we can insert numbers, strings, and everything else _in the same list_, which means we cannot make any assumptions about the data actually stored within. Even if we did have a list of just numbers, because they're typed with `Any`, that will not allow us to do anything with those numbers (e.g. sum them or do any statistics).

We've lost the very reason static typing exists (the ability to make assumptions about the data). In other words, we've lost _type safety_.

## 3. How to Use Generics in Scala

The best solution for this situation is to make the list data structure _generic_. Here's how we can add generics to our list:

```scala
  trait GoodList[A] {
    def head: A
    def tail: GoodList[A]
  }
```

The `[A]` is the _type argument_ of the data structure. Once we add the type argument, we can use it anywhere in the body of the trait/class, and the compiler will always replace `A` with the concrete type we'll end up using. Let's continue the implementation of the generic subtypes of list, and we'll demonstrate shortly.

```scala
  case class GoodEmpty[A]() extends GoodList[A] {
    override def head = throw new NoSuchElementException()
    override def tail = throw new NoSuchElementException()
  }

  case class GoodNEmpty[A](h: A, t: GoodList[A]) extends GoodList[A] {
    override def head: A = h
    override def tail: GoodList[A] = t
  }
```

Notice that the implementations have not changed aside from the types the methods need to return!

Because we added the type argument to `GoodList`, the compiler will replace it with the real type we end up using:

```scala
val goodNumbers: GoodList[Int] = GoodNEmpty(1, GoodNEmpty(2, GoodNEmpty(3, GoodEmpty())))
val firstNumber: Int = goodNumbers.head
```

In this case, we know for a fact that `firstNumber` must be an Int, by the definition of the `head` method, which returns the same type `A` (which is `Int` in this case) as the list was defined with.

We get multiple benefits by using Scala generics in this way:
- we eliminate the need to copy and paste
- we can reuse the same code/logic for _all_ types
- we guarantee type safety

Now, generics in Scala lead to a whole range of [features](/scala-variance-positions/) and potentially [difficult concepts](/contravariance/), but here are some features of generics that you can use right now.

First, you can add type arguments to every class or trait that you want to reuse for different types, in the style shown above.

Second, if you need _multiple_ type arguments, you can do that too. For instance, if you want to define a "dictionary"/map data structure, you would write something like this:

```scala
  trait MyMap[K, V] {
    def put(key: K, value: V): MyMap[K, V]
    def get(key: K): V
  }
```

and the mechanics would work in the same way:
- after defining the type arguments `K, V` you can use them inside the trait body
- the `put` method takes a key of exactly type `K` and a value of exactly type `V`, and returns a map of the same type (see type safety?)
- the `get` method takes a key of type `K` and returns a value of type `V`, exactly the same types with which we defined the map

Third, you can also reuse a single piece of logic (i.e. a method) by making it generic. For instance, if you want to find the last element of a list, you can write

```scala
  def lastElement[A](list: GoodList[A]): A =
    if (list == GoodEmpty[A]()) throw new NoSuchElementException
    else if (list.tail == GoodEmpty[A]()) list.head
    else lastElement(list.tail)
```

and that would be a generic method in Scala.

## 4. Conclusion

This article was a slow and smooth introduction to Scala generics, for people who are getting started with Scala and particularly those coming from dynamically-typed languages like Python or JavaScript. We discussed why static typing is useful, how generics help us reuse code easily, and some generics features such as multiple type arguments and generic methods.

If you liked this approach, we explain a lot more such core Scala concepts in the [Scala Essentials course](https://rockthejvm.com/p/scala), so consider checking it out.
