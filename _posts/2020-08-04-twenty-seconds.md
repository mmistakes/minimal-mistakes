---
title: "How Does \"20 seconds\" Work in Scala?"
date: 2020-08-04
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, tricks]
excerpt: "Various constructions like \"20.seconds\" look like baked into the Scala language. Let's see how these work."
---
This short article will show you how apparently magical constructs like `20.seconds` works in Scala, although the Int type doesn't have such methods natively.

This article will make more sense if you know the basics of implicits, but then again, if you do know how implicits work, there's only one step to understanding how these seemingly magical methods work, so I'll cover everything you need to know.

## 1. The "Problem"

The question we're addressing here is the following: the Int type has a very small set of methods and certainly the `seconds` method isn't one of them:

```scala
val womp = 20.seconds // compile error: symbol "seconds" not found
```

However, once we add a special import, it magically works:

```scala
import scala.concurrent.duration._

val aDuration = 20.seconds // works!
```

So how does the magical import work?

## 2. Enriching Types

The answer is not in the import itself, but in <em>what's imported</em> - the types and values that are imported might as well be in scope and methods like `.seconds` would work just as fine. It's their structure that provides the magic. To understand how they work, we need to go back to implicits.

I'm not going to talk about all the functionality that the `implicit` keyword does in Scala - we'll probably do that in another article - but we are going to focus on one kind of implicits: _implicit classes_. Implicit classes are one-argument wrappers, i.e. a class with one constructor argument, with regular methods, fields, etc, except that they have the `implicit` keyword in their declaration:

```scala
implicit class MyRichString(string: String) {
  def fullStop: String = string + "."
}
```

If I removed the `implicit` keyword there, this would be a pretty uninteresting class. Adding `implicit` will add some special powers. We can either say

```scala
new MyRichString("This is a sentence").fullStop
```

or, watch this:

```scala
"This is a sentence".fullStop
```

This works although the `fullStop` method doesn't exist for the String class. Normally, the code would not compile, but the compiler will add an extra step of searching for any implicit wrapping or conversion of a String value that might have the `fullStop` method, which in our case it does. So in reality, the compiler will rewrite our last call as

```scala
// "This is a sentence".fullStop beecomes:
new MyRichString("This is a sentence").fullStop
```

which is what we (explicitly) wrote earlier. This pattern provides what we call <em>extension methods</em> - libraries like Cats use this all the time.

## 3. Importing

If an implicit class like this is not written in the scope where we use the "magical" method, the code will not compile until we bring that implicit class into scope. This means an import. Usually, libraries (including the standard library) packs implicits into "Ops"-like objects:

```scala
package mylibrary

object MyStringOps {
    implicit class MyRichString(string: String) {
      def fullStop: String = string + "."
    }
}

```

and then later in our code, when we import it, we'll also have access to the extension method:

```scala
import mylibrary._

"Starting to get it".fullStop
```

The Scala `duration` package works in the same way: when you import `scala.concurrent.duration._` you gain access to extension methods on the Int type that returns instances of `Duration`:

```scala
import scala.concurrent.duration._
20.seconds
500.millis
```

## 4. A Bit More and Conclusion

Some packages are automatically imported with every Scala code. Some of these packages might include extension methods like the `.seconds` one. Ever wondered how things like

```scala
val range = 1 to 100
```

work? With the tools you now have, it's quite easy to understand that there is an implicit conversion that enriches the Int type:

```scala
// some implicit conversion here { ...
    def to(end: Int): Range
// ... }
```

You've now learned how extension methods work and how magical things like `20.seconds` work in Scala, making them seem like they're part of the language or standard library. This skill will prove useful as you become more experienced with Scala libraries like Cats.
