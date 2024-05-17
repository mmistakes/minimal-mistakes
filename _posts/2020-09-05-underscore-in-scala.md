---
title: "Underscores are Overloaded in Scala!"
date: 2020-09-05
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala]
excerpt: "Scala syntax is so confusing sometimes - I'll show almost all uses of underscores in Scala. Sometimes the philosophy is inconsistent, but it's worth at least being aware."
---
This article is for the curious Scala programmer who has seen underscores more times than they'd find comfortable. In this article I'll share almost all the places where you might see an underscore, so that you don't freak out when you see yet another one in a different context.

I want to get straight to the point.

## 1. Ignoring

Underscores are commonly used when names or values are not important and/or unused. Here is a comprehensive list of ignored elements. First, variable names:

```scala
val _ = 5
```

Why you'd do that, I have no idea - the point of intentionally declaring a value or variable is to use it. But it's possible. Probably the most useless case of an underscore. However, the case when the compiler throws a value at use, but we don't use it, so we use an underscore. The most common use case is with lambdas whose arguments we don't need or use:

```scala
val onlyFives = (1 to 10).map(_ => 5)
```

We could have said `(1 to 10).map(x => 5)` but we don't need x and the compiler would have issued an unused variable warning anyway, so we replace with an underscore.

Another scenario is when we use <a href="https://rockthejvm.com/blog/self-types-quick">self-types</a> as a type restriction, but you don't actually need to name the self-type:

```scala
trait Singer
trait Actor { _: Singer =>
  // implementation
}
```

Finally, one of the less common places where underscores ignore stuff is generic types. For example:

```scala
def processList(list: List[Option[_]]): Int =  list.length
```

Since we don't care what type those Options are, we type them with underscore. Underscores are also useful when we want to interoperate with Java libraries or generic types which were not explicitly typed (think pre-Java 5).

## 2. Wildcards

Underscores are also used to have the meaning of "everything" in certain contexts. One of them is importing everything in a package:

```scala
import cats.implicits._
```

But by far the most frequent use case is in pattern matching, where the underscore means "match everything".

```scala
meaningOfLife match {
  case _ => "I'm fine with anything"
}
```

## 3. Default Initializers

Particularly for variables, when we don't know what to initialize them with, let the JVM decide - zero for numerical values, false for Booleans, null for reference types:

```scala
var myVariable: String = _
```

## 4. Lambda Sugars

You've probably seen this before. Let's say we want to multiply every element of a list by 5, we would do

```scala
List(1,2,3,4).map(x => x * 5)
```

Except there's an even shorter version. We can wrote

```scala
List(1,2,3,4).map(_ * 5)
```

which means the same thing: the compiler expands that to the slightly longer lambda version. The downside is that we can only use the underscore once in the function body - that's because each underscore represents a different argument of the lambda. For example, if I wrote

```scala
val sumFunction: (Int, Int) => Int = _ + _
```

The `_ + _` part is identical to `(a, b) => a + b`. Java programmers seeing this for the first time might find it too short, but it's really easy to get used to it.

## 5. <a href="https://rockthejvm.com/blog/eta-paf">Eta-expansion</a>

Underscores are also used to turn methods into function values. We talk about the process in detail in another article (check the link above).

```scala
def incrementer(x: Int) = x + 1
val incrementerFunction = incrementer _
```

The underscore is a signal to the compiler to create a new lambda with the implementation of `x => incrementer(x)`.

## 6. Higher-Kinded Types

HKTs are generic types, whose type arguments are themselves generic. Libraries like Cats exploit this like crazy. Their structure is of the form

```scala
class MyHigherKindedJewel[M[_]]
```

Where the type argument M is also generic. If I want to instantiate my HKT with a concrete generic type like List, I'll use the List type (not a List[String] or something else):

```scala
val myJewel = new MyHigherKindedJewel[List]
```

## 7. Vararg methods

When we have a method taking a variable number of arguments, such as

```scala
def makeSentence(words: String*) = ...
```

we might find ourselves we need to expand some collection of Strings as arguments to this method. We can't pass them manually at runtime, so we need to expand the collection automatically:

```scala
val words = List("I", "love", "Scala")
val love = makeSentence(words: _*)
```

In this way, the elements of the list are exploded into the argument list to the method.

## Conclusion

Scala overloaded the meaning of the underscore in many, many places - hopefully this article served as a good overview of where you might see it in real code.

Let me know if I've missed anything!
