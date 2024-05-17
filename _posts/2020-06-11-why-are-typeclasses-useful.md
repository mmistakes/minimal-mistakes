---
title: "Why are Type Classes Useful in Scala?"
date: 2020-06-11
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, functional programming, type system]
excerpt: "FP fans talk about pure functional programming in Scala with type classes. They're hard. Why do we really need them?"
---
This article is for the Scala programmer who knows what implicits are and (for the most part) how they work. This article will also involve a somewhat high degree of abstraction.

Type classes are these super-abstract concepts in functional programming, which FP purists and Haskellers eat for breakfast, lunch and dinner. <a href="https://en.wikipedia.org/wiki/Type_class">Wikipedia</a> says type classes are "type system constructs that support ad hoc polymorphism". What the heck does that mean?

This article wants to be down to earth.

## The problem

Ever since generics were invented, you've surely come across the need for specialized implementations. In other words, let's say you have a method

```scala
def processMyList[T](list: List[T]): T = {
    // aggregate a list
}
```

and in this function's implementation, you need a result that is obtained by processing the list argument - for the sake of example, let's say you "sum" all the elements of the list. But here's the twist: if the list is a list of integers, the "sum" should be the real sum of the elements; if the list contains strings, then the "sum" should be the <em>concatenation</em> of all the elements. For all other types, we should not be able to use this method. And we want to do everything automatically.

If you're in Java, you can kiss this dream goodbye. If you're in C++, you have to resort to template specializations. In Scala, we have an elegant way of dealing with it.

## Plugging an implicit

In Scala, we can enhance this method with implicit arguments which can enhance its capability and constrain its use at the same time. Let me give an example.

```scala
trait Summable[T] {
    def sumElements(list: List[T]): T
}
```

This is a trait that defines the capability of aggregating a list into a single element. We can of course add some implementations for Int and String, the way we like it:

```scala
implicit object IntSummable extends Summable[Int] {
    def sumElements(list: List[Int]): Int = list.sum
}

implicit object StringSummable extends Summable[String] {
    def sumElements(list: List[String]): String = list.mkString("")
}
```

As you can see, two very different implementations of the "sum" we can perform. We can then enhance the original method like this:

```scala
def processMyList[T](list: List[T])(implicit summable: Summable[T]): T =
    summable.sumElements(list)
```

If you try this, you will notice that it works for Strings and Ints, and <em>it doesn't even compile</em> for anything else:

```scala
processMyList(List(1,2,3)) // 6
processMyList(List("Scala ", "is ", "awesome")) // "Scala is awesome"
processMyList(List(true, true, false)) // ERROR
```

In this way, the implicit works as both a <em>capability enhancer</em> and a type constraint, because if the compiler cannot find an implicit instance of a ListAggregation of that particular type, i.e. your specialized implementation, then it's certain that the code can't run.

## The fancy terms

Did you hear "type class" anywhere? You don't need to. If you absolutely must hear the terms, let me break them down:

The behavior we've just implemented is called "ad hoc polymorphism" because the `sumElements` ability is unlocked only in the presence of an implicit instance of the trait which provides the method definition, right there when it's called, hence the "ad hoc" name. "Polymorphism" because the implementations we can provide can obviously be different for different types, as we did with Int and String.

The trait `Summable[T]` itself is nothing special. However, when you combine it with one/more implicit <em>instances</em> of the trait - and in our case we  `IntSummable` and `StringSummable` - we have a pattern, which we generally call a "type class". This structure allows us to define specific implementations for certain types and not for others, in the "ad hoc polymorphic" style we did earlier.

## Capish?

I hope this article cut through the abstraction weeds and was as down to earth as possible. Dying for feedback, so leave your comments here!
