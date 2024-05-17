---
title: "Higher-Order Functions for OO Programmers"
date: 2020-04-06
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, functional programming]
excerpt: "For OO programmers looking to dive into functional programming in Scala: a gentle introduction to functions working with other functions."
---
This article is for the programmer who is familiar with Scala concepts and structure, but has the object-oriented programming principles deeply ingrained. This article will not attempt to change them, but rather show you how you can map these principles to the very abstract functional programming concept of HOF, or higher-order functions.

## Prelude

You're probably aware that the apply method is treated in a special way:

```scala
class Applicable {
    def apply(x: Int) = x + 1
}

val applicable = new Applicable

applicable.apply(2) // 3
applicable(2) // still 3
```

The apply method allows instances of classes to be "invoked" like functions. As such, objects with apply methods can behave like functions: they take arguments and return results. The Scala standard library actually has built-in types for function objects, which are nothing else but plain instances with apply methods:

```scala
val incrementer = new Function1[Int, Int] {
    override def apply(x: Int) = x + 1
}

incrementer(4) // 5
```

Scala, being the nice functional language it is, allows for concise syntax sugars:

```scala
val incrementerAlt = (x: Int) => x + 1
incrementerAlt(4) // 5 of course
```

The shorthand version is unwrapped by the compiler into the exact same Function1[Int, Int] construction which we saw earlier. The type of this function is Int => Int, which is also another sweet name for Function1[Int, Int].

## The HOF baffle

Naturally, because these "functions" are nothing but objects with apply methods, they can be passed around as arguments or returned as results. The functions which take other functions as arguments and/or return other functions as results are called HOFs, or higher-order functions. This is usually easy to make sense of.

Here is something I often ask people to do in my trainings after I explain the above. Define a function which takes a function f and a number n, and returns another function whose implementation is f applied n times. In other words, write an implementation for

```scala
def nTimes(f: Int => Int, n: Int): Int => Int = ???

//
//    If we call g = nTimes(f, 30), then
//    g(x) = f(f(f(...f(x)))) 30 times
//
```

This is where I expect certain existing mental structures to either adapt or break, both of which are intentional effects I'm after. If you want to avoid spoilers, pause here and try this exercise yourself.

Here's a possible implementation of this exercise:

```scala
def nTimes(f: Int => Int, n: Int): Int => Int =
    if (n <= 0) (x: Int) => x
    else (x: Int) => nTimes(f, n-1)(f(x))
```

## Um. Yeah, makes sense. But wait, wha...?

The above code is concise and often hard to read, especially if you've not done a lot of this before, so it's natural if it takes a few minutes to unpack.

_FAQ 1: How do you read this? _

Let's take a look at the code. If n is zero or less, we return a function that given an argument returns the argument (the identity function). Otherwise, we return a function, that given an argument, _applies the n-1-times function to f(x)._. Look at this breakdown:

```scala
nTimes(f, 4) = x => nTimes(f, 3)(f(x))
nTimes(f, 3) = x => nTimes(f, 2)(f(x))
nTimes(f, 2) = x => nTimes(f, 1)(f(x))
nTimes(f, 1) = x => nTimes(f, 0)(f(x))
nTimes(f, 0) = x => x
```

So then

```scala
nTimes(f, 1) = x => nTimes(f, 0)(f(x)) = f(x)
nTimes(f, 2) = x => nTimes(f, 1)(f(x)) = f(f(x))
nTimes(f, 3) = x => nTimes(f, 2)(f(x)) = f(f(f(x)))
nTimes(f, 4) = x => nTimes(f, 3)(f(x)) = f(f(f(f(x))))
*/
```

_FAQ 2: When are these functions created? _

If we read the code, we can see that all these intermediate functions are not created until we actually call the result function. For example, if we said

```scala
val f4 = nTimes(f, 4)
```

Then this will not create all the intermediate functions up to 0. It's as if I said

```scala
val f4 = (x: Int) => nTimes(f, 3)(f(x))
```

which is easier to see: this is not creating the rest of the functions up to n = 0. If we invoke f4, then that will be a different story, as all the intermediate functions will be created.

_FAQ 3: I understand the mathematical definition. But to an OO programmer like me, how are these functions created in memory?_

It's worth coming back to the origins of functions. Let me rewrite the code with the original types:

```scala
def nTimes(f: Function1[Int, Int], n: Int): Function1[Int, Int] =
    if (n <= 0)
        new Function1[Int, Int] { override def apply(x: Int) = x }
    else
        new Function1[Int, Int] { override def apply(x: Int) = nTimes(f, n-1).apply(f(x)) }
```

Somewhat counterintuitively, it's easier for OO (especially Java) programmers to read this, whereas the more experienced you are with Scala, the more bloated this code will seem. If you come from a very heavy OO background, this code will shed some light onto how the functions are getting created, because we're now talking about plain JVM objects. If you track this down in the same style we saw above, you will see how the function objects are being spawned in memory. Being recursive, these objects are short lived, so even though they might be using more memory than necessary, they will be quickly freed by the JVM's garbage collection.
