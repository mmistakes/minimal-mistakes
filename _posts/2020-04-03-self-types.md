---
title: "Self-types in Scala, Real Quick"
date: 2020-04-03
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "Self types are a really interesting way to enforce type constraints in Scala. Learn to use it in a few minutes."
---
In this article I'm going to address self-types, which are a pretty strange piece of Scala syntax and functionality. Many Scala devs go on writing code for months without any encounter with self-types, then they get baffled by the structure when they need to dig into some library code.

I'm going to address two different wildly different angles to self-types:
    1) What the weird structure means
    2) What do you do when you want to enforce that a trait MUST be mixed into a type you're defining.

I'll start with #2 and get back to #1 into a (hopefully) logical progression.

## Enforcing type constraints

Let's say you have two separate type hierarchies:

```scala
// person hierarchy
trait Person {
    def hasAllergiesFrom(thing: Edible): Boolean
}
trait Child extends Person
trait Adult extends Person

// diet hierarchy
trait Diet {
    def eat(thing: Edible): Boolean
}
trait Carnivore extends Diet
trait Vegetarian extends Diet
```

The problem is that you want the diet to be applicable to Persons only. Not only that, but your functionality actually relies on logic from the Person class. For example, you need a person's age or weight while you implement your Diet API. This is often an issue when you design library APIs. There are various options to do it.

## Option 1: Inheritance

```scala
// option 1
trait Diet extends Person
```

This option makes all the (non-private) Person functionality available to Diet. However, this obviously makes a mess out of two otherwise clean and separate concept hierachies.

## Option 2: Generics

```scala
// option 2
trait Diet[P <: Person]
```

This option adds a degree of separation by adding a type argument. A bit better, but with its own problems. You have access to the Person type, but not to its methods - you would need an instance of Person to access the logic, but then you'd need to pass a Person as a constructor argument. Until Scala 3 comes along, there's no way for you to do that, or enforce any Diet subclasses to pass a person as an argument. Not to mention variance problems. Is a vegetarian diet for an adult also applicable to teenagers? Which implementations can I reuse for which types?

So here's an option that can make it clean:

## Option 3: Self-types

```scala
// option 3
trait Diet { self: Person =>

}
```

This is called a self-type. It looks like a lambda structure, but it has a completely different meaning. When you see something like this in a class or trait definition, you need to read it as "whichever class implements the Diet trait MUST ALSO implement the Person trait". For example:

```scala
class VegAthlete extends Vegetarian with Adult
```

This class implements both the Diet trait (via Vegetarian) and the Person trait (via Adult). The main advantage of using this structure is that you can use the Person functionality directly in the Diet trait, without otherwise creating any type relationship between the two hierarchies:

```scala
trait Diet { self: Person =>
    def eat(thing: Edible): Boolean =
        if (self.hasAllergiesFrom(thing)) false
        else ...
}
```

Since you created Diet as a self-type, you already assume that whoever implements Diet will also implement Person, so you will have access to the Person methods. So you can directly use them ahead of time, in the Diet trait.

## The Punchline

People constantly ask me what the fundamental difference between self-types and inheritance is, aside from the scenario above. "Why can't we solve this with plain inheritance?". The fundamental difference is subtle. Here's the quick "remember this" lesson:

```scala
class Dog extends Animal
```

This means Dog IS AN Animal. When you say

```scala
trait Diet { self: Person =>

}
```

you say that Diet REQUIRES A Person. So remember the "is a" vs "requires a" distinction.
