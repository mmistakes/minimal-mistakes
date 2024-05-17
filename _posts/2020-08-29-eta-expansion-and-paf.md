---
title: "Eta-Expansion and Partially Applied Functions in Scala"
date: 2020-08-29
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, functional programming]
excerpt: "We explore some not-so-well-understood territory in the form of eta-expansion and how methods and functions interoperate."
---
This article is for Scala programmers who know at least these essential concepts: what a method is and how to define a function value (lambda). Here we'll discuss the topic of eta-expansion and partially-applied functions, which are often loosely covered and piecemeal.

## Background

Long story short, methods and functions are different things in Scala. When I write

```scala
def incrementMethod(x: Int): Int = x + 1
```

that's a method, which is a piece of code that can be invoked on an instance of a class. A method is a member of the enclosing class or object and can be invoked like this:

```scala
val three = someInstance.incrementMethod(2)
```

Even if you call the method from the body of the class or object, it's the same as invoking it on the `this` instance. So you won't be able to call a method on its own, because it's tied to some instance of a class.

Function values (aka lambdas), on the other hand, are pieces of code that can be invoked independently of a class or object. Functions are assignable to values or variables, can be passed as arguments and can be returned as results - it's one of the most important tenets of functional programming in Scala.

```scala
val incrementFunction = (x: Int) => x + 1
val three = incrementFunction(2)
```

Behind the scenes, these function values are actually instances of the FunctionN family of traits with an apply method which benefits from special treatment, so what you're doing is in fact:

```scala
// what the compiler does
val incrementFunction = new Function1[Int, Int] {
    override def apply(x: Int): Int = x + 1
  }
val three = incrementFunction.apply(2) // desugared from incrementFunction(2)
```

Methods and functions are thus different in Scala. However, because the user sees and uses them in the same way (just invoke them), they're "morally" equivalent. The eta-expansion mechanism allows the conversion between a method and a function.

## Converting a Method to a Function

Because a method and a function are seen differently by the JVM - a method of a class vs a field of type FunctionN - you can't simply say

```scala
val incrementF = incrementMethod
```

because the compiler will think you'll try to call your increment method, which requires arguments. The way you'd do the conversion is

```scala
val incrementF = incrementMethod _
```

The underscore at the end is a signal for the compiler that you want to turn the method into a function value, and you'll obtain a function of type `Int => Int`. This conversion is called _eta-expansion_, and the compiler will generate a piece of code that will look something like

```scala
val incrementF = (x: Int) => incrementMethod(x)
```

The compiler can also do this automatically if you give it the function type in advance:

```scala
val incrementF2: Int => Int = incrementMethod
```

In this case, the compiler can disambiguate the context, because you declared that you want a function so the compiler will automatically eta-expand the method for you.

## Partially Applied Functions

Another important scenario where eta-expansion is useful is with methods taking multiple argument lists.

```scala
def multiArgAdder(x: Int)(y: Int) = x + y
val add2 = multiArgAdder(2) _
```

In this case, you'll get another function which takes the remaining arguments, therefore of type `Int => Int`. This is called a _partially applied function_, because you're only supplying a subset of argument lists and the remaining arguments are to be passed later:

```scala
val three = add2(1)
```

In a similar fashion as before, the compiler can detect whether a value is expected to have a function type, and so it can automatically eta-expand a method for you:

```scala
List(1,2,3).map(multiArgAdder(3)) // eta-expansion is done automatically
```

In this case, the argument of the map method needs to have the type `Int => Int`, so the compiler will automatically turn the method into an eta-expanded lambda for you.

## Interesting Questions

So far, we've discussed only methods that have a single argument in their list. Here's something to think about:

```scala
def add(x: Int, y: Int) = x + y
val addF = add _
```

In this case, the method has two arguments. An eta-expanded function value (lambda) will have two arguments as well, so it will be of type `(Int, Int) => Int`. A similar expansion will happen on a larger number of arguments as well.

Another interesting scenario is: what happens on more than two argument lists and/or we're left with more than an argument list in the expanded function:

```scala
def threeArgAdder(x: Int)(y: Int)(z: Int) = x + y + z
val twoArgsRemaining = threeArgAdder(2) _
```

In this case, we'll get a curried function which will take the remaining argument lists in turn, so the function type will be `Int => Int => Int`. If you want to invoke it:

```scala
val ten = twoArgsRemaining(3)(5)
```

At the same time, if we pass more than one argument list:

```scala
val oneArgRemaining = threeArgAdder(2)(3) _
```

then we'll get a function which takes the remaining argument lists (a single integer), so it will have the type `Int => Int`.

_In general and to put it short, eta-expansion turns a method into a function which will take the remaining argument lists (however large) in turn, however long the chain may be._

## Conclusion

Eta-expansion in Scala is often covered in small pieces in StackOverflow questions, so I hope this small blog will paint a clearer and more general picture of what it is and why it's useful in Scala code.
