---
title: "How to Create Your Own Custom String Interpolator"
date: 2020-05-12
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala, tricks]
excerpt: "Yep, you can write your own interpolator that looks like it was built into the Scala language. Learn how."
---
This article will show you a less-known customizable part of Scala that will allow you to build powerful tools that seem to be part of the language itself. The article is for intermediate to advanced Scala programmers who know how implicit classes work.

## The Background

You're surely well aware of the standard Scala string interpolators. They allow us to inject values and even whole expressions into a string.

The best known and most used interpolator is the S interpolator, which simply expands values or expressions inside a string.

```scala
val lifeOfPi = 3.14159
val sInterpolator = s"The value of pi is $lifeOfPi. Half of pi is ${lifeOfPi / 2}"
```

This interpolator will simply call the toString methods of every value and expression that we expand, and the results will be part of the resulting string

```Perl
The value of pi is 3.14159. Half of pi is 1.570795
```

Then we have the Raw interpolator, which is the same as the S interpolator, except that it doesn't escape characters, but keeps them exactly as they are:

```scala
val rawIterpolator = raw"The value of pi is $lifeOfPi\n <-- this is not a newline"
```

Normally, the \n would trigger a new line, but in a Raw interpolator, it doesn't:

```Perl
The value of pi is 3.14159\n <-- this is not a newline
```

And finally we have the F interpolator, which has the ability to control the format in which values are shown. It has similar functionality to standard printf, such as controlling the number of decimals in a number:

```scala
val fInterpolator = f"The approximate value of pi is $lifeOfPi%3.2f"
```

```Perl
The approximate value of pi is 3.14
```

## The Motivation

If you've worked with Scala libraries and tools, you might have noticed other expressions that look like interpolators. For example, Spark or Slick:

```scala
val myDataFrame = input.select($"col1", $"col2")
```

```scala
val query = sql"Select * from citizens where ..."
```

These libraries make it seem that their interpolators are part of the language itself. We can also do that.

## The Scenario

I'm going to assume a simple scenario: imagine you are using the following case class A LOT in your library:

```scala
case class Person(name: String, age: Int)
```

and you are doing a lot of parsing from strings in the form of "name,age" into instances of this Person class:

```scala
def stringToPerson(line: String): Person = {
    // assume the strings are always "name,age"
    val tokens = line.split(",")
    Person(tokens(0), tokens(1).toInt)
}

val bob = stringToPerson("Bob,55")
// and you're calling stringToPerson everywhere
```

I'll show you how you can create an interpolator so you can write

```scala
val bob = person"Bob,55"
```

as if the "person" interpolator was baked into the language itself

## The Mechanics

A custom interpolator needs only two things: an implicit wrapper over a special class called StringContext, and a method whose name is identical to the name of the interpolator you want to create. For "person", the method name needs to be "person".

```scala
implicit class PersonInterpolator(sc: StringContext) {
    def person(args: Any*): Person = {
        // logic here
    }
}
```

The method "person" needs to take Any* as argument: these are all the expressions you can inject into a string. Let me explain. When you write

```scala
s"The value of pi is $lifeOfPi. Half of pi is ${lifeOfPi / 2}"
```

The values you expand with the dollar sign are called _arguments_, and can be of any type (hence the type Any), while the pieces of string in between the arguments are called _parts_ and you can access them by sc.parts. In the method "person", you have access to both, so you can process them as you see fit. I'm just going to concatenate them all, and parse the Person from the resulting String:

```scala
implicit class PersonInterpolator(sc: StringContext) {
    def person(args: Any*): Person = {
        // concatenate everything: use the built-in S method (which happens to be used in the S interpolator)
        val tokens = sc.s(args: _*).split(",")
        Person(tokens(0), tokens(1).toInt)
    }
}
```

And finally you will be able to do

```scala
val name = "Bob"
val age = 23
val bob = person"$name,$age"
```

which will (behind the scenes) invoke the "person" method from a new instance of PersonInterpolator created with the StringContext obtained by the compiler after parsing the string and isolating its "parts" and "arguments".

Potential drawback: instantiation of the PersonInterpolator many times if you're doing lots of these conversions.

## A Powerful tool

Custom interpolation is a nice tool for making various functionalities in your library seem like part of the language. It's (usually) short and straightforward, while making user code also short and self-explanatory.
