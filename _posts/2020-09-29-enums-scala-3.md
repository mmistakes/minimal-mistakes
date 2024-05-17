---
title: "Enums in Scala 3"
date: 2020-09-29
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, scala 3]
excerpt: "Scala 3 introduces enums. About time! Even though it might seem like something minor, it has important implications."
---

This article is for Scala programmers of all levels, and particularly for those Scala programmers who have been emulating enums in Scala 2 for the longest time. Your day has come, because Scala 3 now supports enums out of the box. This will be the focus of this article.

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## Background

Scala 2 famously had no support for enums. We had to bend over backwards to support it:

```scala
object Permissions extends Enumeration {
  val READ, WRITE, EXEC, NONE = Value
}
```

What on Earth was that? Value?!

We won't even get into the weeds there, it makes no sense. This construct was probably one of the weirdest parts of Scala 2.

## Enter Enums

Finally, Scala has first-class enums like any standard programming language:

```scala
enum Permissions {
    case READ, WRITE, EXEC
}
```

There you go. There's one `case` which might or might not have been needed, but we can't be too picky. Enums are now first-class, and we can use them as in Java or other languages:

```scala
val read: Permissions = Permissions.READ
```

Under the hood, the compiler generates a sealed class and 3 well-defined values in its companion object.

## Enums with Arguments

As was expected, enums can also have arguments, and the constants will have to be declared with a given expression:

```scala
enum PermissionsWithBits(bits: Int) {
    case READ extends PermissionsWithBits(4) // binary 100
    case WRITE extends PermissionsWithBits(2) // binary 010
    case EXEC extends PermissionsWithBits(1) // binary 001
    case NONE extends PermissionsWithBits(0)
}
```

The construct is again a bit boilerplate-y - especially since we can't extend anything except the wrapping enum - but we can't complain. In the above example we have an enum with 4 possible values. Of course, we can access their field with the regular accessor syntax.

## Fields and Methods

Enums can contain fields and methods, just like a normal class - they're compiled to a sealed class after all. We can define them inside the enum body and we can access them with the regular dot-accessor syntax.

```scala
enum PermissionsWithBits(bits: Int) {
    // the cases here

    def toHex: String = Integer.toHexString(bits) // the java way of impl
    // can also define other members, e.g. vals
}
```

One interesting thing is that we can also define variables (vars) inside the enum. This might come in conflict with the immovable aspect of enums. I would certainly not recommend creating variables inside enums - it would be like defining global variables, free for anyone in any point of the code to change.

A nice addition to enums is the ability to create companion objects, where we can define "static" fields and methods, perhaps "smart" constructors:

```scala
object PermissionsWithBits {
    def fromBits(bits: Int): PermissionsWithBits = // do your bit checking
      PermissionsWithBits.NONE
}
```

## Standard API

Enums come with some predefined utility methods. First, the ability to check the "index" of a given enum value inside the "order" of definition of cases:

```scala
// if you want to convert to an integer (the order of the enum instance)
val indexOfRead = Permissions.READ.ordinal
```

Second, the ability to fetch all possible values of an enum type, perhaps to iterate over them or to consider all at once:

```scala
val allPermissions = Permissions.values
```

Third, the ability to convert a String into an enum value:

```scala
val readPermission = Permissions.valueOf("READ")
```

## Conclusion

And with that, you should be set! Scala 3 is now in line with many other languages in its capability to define enums. You should now be able to safely define and use enums, add parameters, methods and fields and use their pre-defined APIs.

Let me know if you liked this article, and I'll write more articles on Scala 3!
