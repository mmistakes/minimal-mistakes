---
title: "Scala 3: Opaque Types"
date: 2020-10-02
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, scala 3]
excerpt: "We discover opaque type aliases in Scala 3 and how we can define new types with zero overhead."
---

This article continues the series on Scala 3. I'll assume you're familiar with some of the Scala (version 2) foundations, such as defining basic classes, methods, type aliases.

This article focuses on a small but exciting feature: opaque types. This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## 1. Background and Motivation

It is often the case that we define new types as wrappers over existing types (composition). However, in many cases this mechanism will involve at least some sort of overhead, while accessing fields, methods or composing these new types.

Let's take an example. Say we're working on a social network. One of the fundamental pieces of data is a user's details, but we want to enforce some rules so that the user's details are correct. For instance, we may want to force their names to start with a capital letter (this may not be true in all languages, but let's take this scenario for the sake of the example).

```scala3
case class Name(value: String) {
  // some logic here
}
```

This case is a plain wrapper over a String. Of course, we can also use things like [refined types](https://www.youtube.com/watch?v=IDrGbsupaok), but regardless of what we end up choosing, this new Name type incurs some sort of overhead. If we have millions of users, these tiny overheads will start to add up.

## 2. Enter Opaque Types

A name is really just a string, but due to the extra logic we attach to it, we have no choice but to incur this overhead, either by wrapping the string, or by forcing the compiler to run some extra checks at compile time. Opaque types allow us to define Name as *being* a String, and allows us to also attach functionality to it:

```scala3
object SocialNetwork {
    opaque type Name = String
}
```

We've defined a type alias, which we can now freely use interchangeably with String inside the scope it's defined.

## 3. Defining an Opaque Type's API

The benefit of an opaque type is that we can treat this new type like a standalone type, such as a class or trait. That means we can define a companion object.

```scala3
object SocialNetwork {
  opaque type Name = String

  object Name {
    def fromString(s: String): Option[Name] =
    if (s.isEmpty || s.charAt(0).isLower) None else Some(s) // simplified
  }
}
```

The idea with an opaque type is that you can only interchange it with String in the scope it's defined, but otherwise the outside world has no idea that a Name is in fact a String. To the outside scope, Name is a completely different type with its own API (currently none). This allows you to start with a new type being implemented in terms of an existing type (String) with zero boilerplate or overhead. On the other hand, the new type is treated as having no connection to the type it's implemented as. The line below will not compile:

```scala3
val name: Name = "Daniel" // expected Name, got String
```

In this way, we have some good news and bad news. The bad news is that this new type has no API of its own. Even if it's implemented as a String, you don't have access to any String methods. However, the good news is that you now have a fresh zero-overhead type whose API you can write from scratch.

The API for the new type will have to be defined as extension methods. We'll talk extension methods in another article, but the structure will look like this:

```scala3
// still within the SocialNetwork scope where Name is defined
extension (n: Name) {
  def length: Int = n.length
}
```

Having defined some basic "static" API (i.e. companion object) and "non-static" API (i.e. extension methods), we're now ready to use our new type:

```scala3
val name: Option[Name] = Name.fromString("Daniel")
val nameLength = name.map(_.length)
```

## 4. Opaque Types with Bounds

Opaque type definitions can have type restrictions, much like regular type aliases. Let's imagine we're working on a graphics library and we deal with colors:

```scala3
object Graphics {
  opaque type Color = Int // in hex
  opaque type ColorFilter <: Color = Int

  val Red: Color = 0xff000000
  val Green: Color = 0xff0000
  val Blue: Color = 0xff00
  val halfTransparency: ColorFilter = 0x88
}
```

We can then use Color and ColorFilter in the same style as we use a class hierarchy, in what concerns the possible substitutions:

```scala3
import Graphics._
case class Overlay(c: Color)

// ok, because ColorFilter "extends" Color
val fadeLayer = Overlay(halfTransparency)
```

## 5. Conclusion

You've learned a new tool in the Scala 3 arsenal. It has its drawbacks - notably the inability to use the underlying type's API outside the alias definition scope - but it allows much more flexibility in what you can express in terms of existing types with zero overhead.
