---
title: "Objects and Companions in Scala"
date: 2021-01-15
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala]
excerpt: "This article is for the starting Scala programmer: an introduction to singleton objects and companions in Scala, what they can do, and why and where we should use them."
---

This article is at a beginner level. If you're starting out with Scala and are interested in some of its core distinguishing features, this one is for you. Here, we'll discuss how Scala allows us to create singleton objects and how the class + singleton combo is a powerful one, including some best practices.

## 1. Singletons Just Got Easier

If you're in the process of learning Scala, you're probably well aware that Scala allows a blend of object-oriented and functional programming styles. Scala can declare classes much like Java or any other common object-oriented languages.

However, after your first experience with object-oriented programming in the language of your choice (probably Java, but not necessarily), the next step was learning how you can structure your code so you don't duplicate logic or find yourself tangled in your own code. So you learned OO design patterns.

One of the first OO design patterns we usually learn is singleton: in short, we make sure that only one instance of a particular type is present in our codebase. There are several possible solutions, on different levels of cleanliness and thread safety.

Scala makes it super easy to implement the singleton pattern. Just do this:

```scala
object MySingleton
```

This declaration defines both a type and the only possible instance of that type. In other words, the singleton pattern: in Scala, we call this an "object". Thread safety is not an issue here, since this instance is immediately available once your application starts.

Singleton declarations work like class declarations, in the sense that we can define fields and methods on it:

```scala
object ClusterSingleton {
  val MAX_NODES = 20

  def getNumberOfNodes(): Int = { /* code */ }
}

// later
val singleton = ClusterSingleton
val nodesInCluster = ClusterSingleton.getNumberOfNodes()
val maxNodes = ClusterSingleton.MAX_NODES
```

## 2. Companions in Scala

Objects are useful as they are, but the singleton pattern was not the main reason why this concept of an "object" was introduced into the Scala language as a first-class structure.

**In short, it is possible to have a class and an object with the same name in the same file. We call these companions.**

```scala
class Kid(name: String, age: Int) {
  def greet(): String = s"Hi, I'm $name and I'm $age years old."
}

object Kid {
  val LIKES_VEGETABLES: Boolean = false
  // ... and other kids preconceptions
}
```

More often, we say that the object Kid is the _companion object_ of the class Kid.

Companions have the property that they can access each other's private fields and methods. Their fields' and methods' access modifiers are otherwise unchanged.

## 3. Why We Need Companions

This class-object combo is very powerful, because we can use the fields and methods on the Kid _class_ for instance-related logic &mdash; e.g. a kid is introducing themselves, or they want to play a game &mdash; and then use the Kid _object_ for logic that does _not_ depend on any instance of Kid.

Ring a bell?

Instance-independent code is usually called "static" in several languages (most notably Java). So in Java, if we were to write code that describes kids, we would write something like the following:

```java
class Kid {
  String name = "";
  int age = 0;

  public Kid(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String greet() {
    return "Hi, I'm " + name + " and I'm " + age + " years old.";
  }

  static boolean LIKES_VEGETABLES = false;
  // ...and other kids preconceptions
}
```

Notice how in Scala, we separated the code in the class (for instance-dependent logic) and the companion object (for instance-independent logic). **The secret purpose of a companion object as a best practice is to store "static" fields and methods.** Because class/object companions can access each other's private fields and methods, there's some extra convenience for us.

To further prove the equivalence, Scala code with companions is compiled to the same bytecode as a Java class with static fields and methods.

## 4. A Bit of Nuance

All the logic we can write in Scala (at least in Scala 2) can only exist within a class or an object. Therefore, all the logic we write belongs _to some instance of some type_, which means that Scala is purely object-oriented. Scala 3 will change that, because we'll soon be allowed to write top-level value and method declarations.

Another small difference to be aware of, which might be more consequential: the type of a class is different from the type of its companion object. This is important, because if we have a method which receives a Kid argument, we can't pass the Kid companion object in there as a value.

```scala
def playAGameWith(kid: Kid) = { /*code*/ }

val bobbie = new Kid("Bobbie", 9)
playAGameWith(bobbie) // OK
playAGameWith(Kid /* <-- the companion*/) // will not compile
```

To be truly technical, the type of the Kid object is known to the compiler as `Kid.type`, which is different than `Kid` (the class name). I'll share more details about `.type` in another more advanced article, but for now, just know the class/object types are different, but they're "compatible" to the compiler (in a sense that I'll clarify when I talk about `.type`).

## 5. Conclusion

We discussed about Scala `object`s as implementing the singleton pattern in one line, and then we explored the concept of class/object companions in Scala and the implications. We learned a best-practice structure of our code and how to split it in between the class (for instance-dependent logic) and the companion object (for instance-independent logic).

Hopefully this article will be useful in your Scala learning journey.
