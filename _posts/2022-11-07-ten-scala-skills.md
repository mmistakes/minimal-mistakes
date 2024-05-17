---
title: "Top 10 Skills (Mostly Mental Models) to Learn to Be a Scala Developer"
date: 2022-11-07
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, tips]
excerpt: "Learning Scala doesn't need to be hard. Here are 10 mental skills you can learn to be a good Scala developer."
---

This article is for aspiring Scala developers. As the Scala ecosystem matures and evolves, this is the best time to become a Scala developer, and in this piece you will learn the essential tools that you should master to be a good Scala software engineer.

If you're considering learning Scala, or you're at the beginning of your Scala journey and you don't know where to start, this article is for you. I teach everything that you'll see in this article, in great detail and with hands-on practice, here at [Rock the JVM](https://rockthejvm.com).

> Read this article to understand what you need to work with Scala. If you then want to learn these skills hands-on, check out the [Scala Essentials](https://rockthejvm.com/p/scala) and [Advanced](https://rockthejvm.com/p/advanced-scala) courses on Rock the JVM.

If you'd like to watch the video form with some nice code examples instead, please enjoy:

{% include video id="kVDgurLi-CA" provider="youtube" %}

## The Benefits of Scala

Scala offers some of the best-paid software engineering positions by programming language (all else equal). Good Scala developers think differently, and you can only obtain this mental model with lots of practice. Therefore, Scala developers tend to be quite rare, but given the enormous value of a good Scala engineer, companies are willing to pay top dollar for such skill.

Scala offers an exceptional blend of object-oriented and functional programming, with familiar syntax and concise code. Due to its structure and by following FP principles, good Scala code is often very short - much more so than other languages, e.g. Java - yet readable, fully testable and maintainable. It's no joke that sometimes you can write 10 lines of Scala with the same power as 1000 lines of equivalent Java.

As you learn Scala, you will find it very applicable for amazing engineering problems with high impact. FP works miracles in distributed systems, and Scala on the JVM is a strong combination. Some powerful tools were written in Scala, specifically targeting distributed systems (e.g. Akka) and big data (e.g. Apache Spark). These problems also come with their own flavor of intellectual satisfaction, which brings me to the fact...

... that once you have a taste of Scala, chances are low you'll want to go back to anything else.

## The Basics

Scala can be a difficult language without a good foundation. I normally teach Scala to established engineers - roughly a year of general programming experience is enough - because Scala uses a lot of software engineering concepts that cannot be learned separately one by one. Even when you write your first program, e.g.

```scala
object Main {
	def main(args: Array[String]): Unit =
		println("Hello, Scala")
}
```

there are _many_ concepts that make up that program. Literally every token in there has a special meaning. Python gets a bad rap sometimes, but it deserves credit for how easy it is to get started, when your first program is

```python
print("Hello, Python")
```

That said, I've personally encountered a small <5% of students learning Scala successfully as their first programming language. It's definitely possible, but the learning curve may be a bit steeper. Still, here are some general, foundational CS concepts that you will need to learn Scala quite fast:

- variables, functions and basic recursion
- custom data types in the form of structures or classes, with their own functions (i.e. methods)
- general OO principles, such as inheritance, interfaces or "polymorphism"
- some common sense of code organization, style and structure - some design patterns such as factory, singleton or dependency injection would go a long way
- using third party libraries or packages
- some generics (or equivalent) in a typed language would work wonders - folks coming from Python or JS will likely struggle here otherwise
- essential knowledge about threads - how they work, how you'd run some custom code on a thread
- some light knowledge of networked/distributed systems - to understand relevant questions about serialization, communication, latency or performance

These topics are usually covered in CS majors, but you can definitely learn them without a CS degree.

## Fundamental Skills 1 and 2

If you come from a programming language of the C family (C, C++, C#, Java, JS) you'll definitely feel at home with Scala. The syntax is quite familiar and easy to pick up.

**Skill 1:** One concept that will become counterintuitive very quickly is that of _immutability_: once you define a value, it's a constant. You can't change it. Therefore, in order to obtain the equivalent of "loops" or repetitions, you need to start becoming creative very quickly. That form of creativity is _recursion_. Thankfully, recursion is no rocket science, but it may take some time until it "feels" natural. In the early stages of the [Scala Essentials course](https://rockthejvm.com/p/scala) at Rock the JVM, we start practicing recursion to get accustomed to this style of thinking, which is invaluable later.

**Skill 2:** Another idea is that in Scala - and in functional programming in general - we think code in terms of _expressions_, i.e. things that are evaluated, instead of _instructions_, i.e. things that are executed step by step. This is one fundamental difference between functional programming and imperative programming in terms of mental model.

As you progress through this stage, a mental shift will start to take place. Writing Scala is not a big deal - _thinking_ in Scala is.

## Skill 3: Object-Oriented Programming

OOP principles are quite similar in Scala compared to other languages. The general ideas of

- classes, constructors and instances
- inheritance
- traits (interfaces) and abstract classes
- subtype polymorphism
- methods, overloading and overriding
- generics

are mostly the same. Some Scala original innovations are

- case classes, now adopted by other JVM languages like Kotlin (called data classes) and recent versions of Java (called records)
- objects and companions implementing the equivalent of "static" fields and methods in Java

and they are the bread and butter of code and data organization, so you need to be good users of them.

**Skill 3:** master object-oriented programming. If you're coming to Scala from another language, chances are high you're already well versed.

## Skill 4: Pattern Matching

Pattern matching is one of Scala's most powerful features, eliminating vast amounts of boilerplate. Learn what pattern matching is and how it works. As you become more experienced with pattern matching, you can also learn some nicer [pattern matching tricks](https://blog.rockthejvm.com/8-pm-tricks/) to speed up your development.

It's so useful and powerful, that it occurs everywhere. I've never heard of a Scala developer that doesn't use pattern matching.

## Skills 5 and 6 of Functional Programming

One core idea of functional programming is that you can work with functions as values: pass them around as arguments, return them as results, construct new ones on the fly - in other words, work with functions like you would with any other kinds of values. We call functions "first-class" elements of the language.

Because Scala originally targeted the JVM (built for Java, an OO language without FP features), it came up with an ingenious idea: functions in Scala are actually instances of interfaces/traits called `FunctionX` (where X is 0,1,2,3...), with a method called `apply`. Apply methods in a class allow an instance of that class to be directly "invoked", as if it were a function - which is exactly what these FunctionX interfaces do. This idea blew my mind when I first encountered it.

**Skill 5:** Therefore, the ability to use functions as values - pass them around, construct new ones on the spot, etc. - is a crucial skill for a functional Scala developer. Master it and you're well on your way.

**Skill 6:** With functional programming, we can then start to think of collections, such as List, Set, Map, Vector, etc, and process them quickly with the help of FP-style combinators. The functions `map`, `flatMap` and `filter` are your best friends. With them, you can then build the famous for-comprehensions in Scala, which are nothing more than chains of `map` and `flatMap`. This will be another counterintuitive idea, because we programmers tend to think "for" as a "loop" (the C-style language curse), whereas here, a for-comprehension is an expression.

## Skills 7 and 8 of Abstract Reasoning

**Skill 7:** After collections, our newly developed FP skills will allow us to understand other structures that look like collections, but they _mean_ something else. Two quick examples are Option and Try: these are data structures that store a single value, but the abstract meaning is "potentially absent value" and "potentially failed computation", respectively. Working with them is strikingly similar to working with collections, because we have similar `map`, `flatMap`, `filter`, for comprehensions, plus other combinators that allow us to deal with failures and absence of values, without having to directly check them! These structures eliminate vast amounts of boilerplate, nested checks and reading headaches, while maintaining code correctness, which is a massive productivity boost.

**Skill 8:** If you have more time, then, it's worth diving into the abstract world of (gasp) monads - the kind of computations that can be "chained". I've explained monads from 3 different angles ([pure productivity](/monads), [general properties](/another-take-on-monads) and ["monoids in the category of endofunctors"](/monads-are-monoids-in-the-category-of-endofunctors)), if you want to check those pieces. Monads seem to be a "sweet spot" in functional programming, because they enable the sort of pragmatic programming that produces useful values. Cats Effect and ZIO, two of the most powerful libraries in the Scala world, are heavily based on these concepts.

## Skill 9: Functional Multithreading

**Skill 9:** It's worth understanding how Futures work in Scala. Even as many Scala developers detest them, Futures are an essential tool for manipulating unfinished expressions on another thread. As with Option and Try, Futures can be processed with similar FP combinators you may have learned beforehand, which means you'll now be able to design multithreaded programs with similar code as that of a single-threaded program. This is huge.

## Skill 10: Contextual Abstractions (Scala 2: Implicits)

Contextual abstractions are tools that allow Scala code to be "correct" (i.e. compile) only in a particular set of circumstances (contexts). There are 3 major contextual abstractions that you should definitely know.

The first is the `given`/`using` combo. Given values are automatically injected by the compiler in methods that have a `using` clause. At first, you can think about such methods as having default values, except you don't provide those default values in advance, but you create them elsewhere as a `given`, and the compiler will then pass them in your stead.

The second contextual abstraction is extension methods. Scala has this great capability to add new methods to existing types. In this way, your libraries, API and regular code will become shorter, more expressive, and easier to read and understand.

The third major contextual abstraction is conversions. This has taken a less important role recently in Scala 3, but it's worth knowing regardless, because otherwise you may see code that "magically" compiles, and you won't understand why.

These 3 major contextual abstractions give rise to a whole new world of APIs and design patterns. A major design pattern is _type classes_, which you should learn as a Scala developer. Many tools in the Scala ecosystem - particularly the Typelevel stack - use type classes a lot.

**Skill 10:** if you can understand and internalize the way contextual abstractions work, you're on your way to becoming a great Scala developer.

## Bonus Skill: Honorable Mentions of the Scala Type System

Scala is immensely powerful, and the features that I've outlined so far will get you 80% of the benefits of Scala as a language and tool. If you're designing your own APIs or critical/infrastructure code, it's worth exploring Scala's type system in more depth. Some of the most important things that you can learn are

- Variance. Libraries like ZIO leverage this feature like no other in the Scala world.
- Self-types. OO programmers will find this feature quite useful
- Type members and type projections. These will help you design APIs with maximum flexibility.

# Conclusion

In this article, we've explored some critical skills and concepts that you can learn as a Scala developer. If you learn the above, you'll be well ahead of most folks learning Scala from bits and pieces around the internet or StackOverflow.
