---
title: "Practical Type-Level Programming in Scala 3, Part 1: Introduction"
date: 2023-08-27
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: "Learn how to use type-level programming to solve practical problems."
---

Scala 3 boasts many features that are meant to simplify and enhance type-level programming: match types, inlines, diverse compile-time operations, and the list goes on. With all these new features it is quite easy to get lost when trying to solve a concrete problem using type-level techniques.

In this article my aim is to bridge that gap by showing, step by step, how to solve a concrete problem using many of the new type-level features that Scala 3 provides. Let's dig in!

## The Problem

The problem that we are going to solve is inspired by an actual use-case that I had at work. So hopefully it will be realistic enough as to be useful for your own endeavors.

Imagine that you have the following data model[^badModel] that you need to store as JSON:
```scala
case class User(email: Email, phone: Phone, address: Address)

case class Email(primary: String, secondary: Option[String])

case class Phone(number: String, prefix: Int)

case class Address(country: String, city: String) 
```

[^badModel]: This is a very loosely-typed model for example purposes only, please use better and more precise types for real code.

But, you can't store this data in any format you want, it has to be "flat". More specifically, each field in the top-level class has to be inlined into the top-level JSON that you produce[^whyFlat].

[^whyFlat]: I'll leave it up to you to imagine why you might have such a requirement.

Suppose you have the following data:
```scala
User(
  Email(
    primary = "bilbo@baggins.com", 
    secondary = Some("frodo@baggins.com")),
  Phone(number = "555-555-00", prefix = 88),
  Address(country = "Shire", city = "Hobbiton"))
```

The resulting JSON should be the following:
```json
{
  "primary": "bilbo@baggins.com",
  "secondary": "frodo@baggins.com",
  "number": "555-555-00",
  "prefix": 88,
  "country": "Shire",
  "city": "Hobbiton"
}
```

Notice how we no longer have the top-level fields, and instead have the data they contained at the top-level[^goodIdea].

[^goodIdea]: I'm going to side-step the issue of whether tying your internal model to serialization concerns is a good idea (it's not), and just go with the problem as is.

As stated it wouldn't be difficult to solve the problem at runtime with some JSON munging. But there are at least two reasons why that's not good enough for us. A runtime penalty for creating redundant intermediate JSON structures, and more importantly; we want this as safe at compile-time as possible. We don't want our users discovering some silly mistake after they deployed to production. Safety for our purposes would mean that:
- If the top-level class has a primitive field - fail to compile
- If the inlined classes have overlapping field names - fail to compile

We'll see later why these are actual safety issues, but for now these conditions are enough to force us to use compile-time techniques[^manually].

[^manually]: Or we could do it "manually" by creating another class with the desired flat format and then convert between the original nested classes and the new flat one. We could, but it would be tedious, and not as magical...

Broadly speaking, Scala has two classes of compile-time techniques: type-level programming and macros. Although we could solve the flat JSON problem with macros, we won't be doing this here. Macros are quite powerful, but they also tend to be a very "one-off" kind of solution. Tailored to a specific problem, rather than made up of reusable components. On the other hand, type-level techniques are usually made up from existing and reusable language features. Every type-level feature we are going to learn about can become a new tool that you can reuse in different contexts. So in this article we'll focus exclusively on type-level programming, using only existing language features, rather than inventing our own with macros[^otherLibraries].

[^otherLibraries]: There are libraries that can somewhat simplify meta-programming in Scala, such as [Magnolia](https://github.com/softwaremill/magnolia) and [Shapeless 3](https://github.com/typelevel/shapeless-3). These libraries are useful, but as of writing they are not powerful enough to solve the problem as stated.

I will add a disclaimer, that as of writing some of the new type-level capabilities in Scala 3 have their rough edges, and not everything will go smoothly for us[^issues]. Hopefully we'll make it out with minimal damage to our psyche. If you do find yourself debating between using type-level programming and macros, macros may be the less painful choice (again, as of writing; things are improving all the time).

[^issues]: I found myself discovering and reporting a couple of issues while researching the material for this article. And to add some further entertainment, occasionally Metals would refuse to compile on some spurious errors, only after hitting "recompile workspace" the errors would go away.

In Scala 2 type-level programming is somewhat notorious for creating inscrutable compilation errors. Luckily, Scala 3 added tools that let us provide custom errors of our own. Since we would like our users to have nice ergonomics, we'll add one last condition to our problem: provide readable compilation errors in case something fails to compile.

To conclude, here's what we are going to do:
1. Given a class
1. Provide a JSON serializer/deserializer for its flat format
1. Fail to compile if the class doesn't meet the safety criteria
1. Without using any macros
1. With reasonably informative compilation errors

Since solving the full flat JSON problem is going to take quite a bit of work, we'll split the solution into a series of (hopefully digestible) parts as follows:
- Part 1 (this article): introduction
- [Part 2](/practical-type-level-programming-part2): create a flat serializer for a concrete class
- More parts to come...

The full code for all of the parts can be found in [this](https://github.com/ncreep/scala3-flat-json-blog/) repo.

See you in the [next part](/practical-type-level-programming-part2)!


