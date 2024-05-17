---
title: "A Comprehensive Guide to Choosing the Best Scala Course"
date: 2023-05-23
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, learning]
excerpt: "Discover the best Scala course for your learning journey. Explore the recommended courses and libraries like Cats Effect, ZIO, and Apache Spark."
---

This article is all about choosing the right Scala course for your journey. In particular, you will learn:

- what to look for in a course
- what's the best course for beginners if you're just starting out
- how you should learn Scala
- what course to take if you already know the basics of Scala and functional programming
- how to learn other libraries in the Scala ecosystem

**The TLDR - which Scala course should I take?**

- if you're starting out, take [Scala & FP Essentials](https://rockthejvm.com/p/scala)
- if you're an intermediate Scala user looking to go advanced, take [Advanced Scala](https://rockthejvm.com/p/advanced-scala)
- after mastering Scala, check out [Cats](https://rockthejvm.com/p/cats), [Cats Effect](https://rockthejvm.com/p/cats-effect) and the [Typelevel](https://rockthejvm.com/p/typelevel-rite-of-passage) ecosystem to get the full Scala developer experience
- alternative to Cats Effect: take [ZIO](https://rockthejvm.com/p/zio)
- alternative 2 to Cats Effect is Akka &mdash; I wouldn't recommend spending much time there unless you absolutely need it, in which case I have [a whole bundle](https://rockthejvm.com/p/the-akka-bundle)
- for learning Spark, take this [Spark course set](https://rockthejvm.com/p/the-spark-bundle)

Read on to understand my approach to learning Scala and how you can quickly get any Scala skills you want.

## 1. Introduction

I've made almost 300 hours of courses so far at Rock the JVM, so it's only natural that every once in a while I get one or more of the following questions:

> - _In what order should I take your courses?_
> - _How should I get started with Scala? Which course should I take?_
> - _Do you have any tips to learn Scala quickly?_

I wanted to write this article to answer more than just those questions, and give you my deconstructed approach to learning Scala, which learning materials you should take, in what order, and most importantly, _why_ each piece is important.

## 2. How to Learn Scala as a Beginner

Scala is not necessarily aimed at first-time programmers. It's certainly doable, some schools teach Scala to first-year CS students, heck, even [kids can do it](https://twitter.com/BesseIFunction/status/1648560454975868933) with the right teacher. However, the main strength of Scala is in parallel and concurrent systems, and the main selling point of Scala at the time of writing is effect systems like [Cats Effect](https://typelevel.org/cats-effect) and [ZIO](https://zio.dev/), both of which are quite tough to learn unless you're already a professional developer.

So to get started with Scala, I generally recommend at least 1 year of experience in some other language. Scala is usually taught to Java developers, but Java is not mandatory: Python, C++, C#, JavaScript or some other mainstream language is perfectly fine. Because you know a programming language, you should be familiar with the following concepts:

- variables and variable change
- control structures like if statements
- repetitions with loops
- functions and function calls
- defining your own data structures
- simple algorithms

With these foundations in place, Scala will come pretty naturally to you, with a small mindset shift towards functional programming which we've talked about elsewhere here on the blog and on the main Rock the JVM site.

### 2.1. What should I look for in a Scala course?

There are a few things to bear in mind if you're considering taking a Scala course:

1. **Make sure that the course doesn't spend too much time on the syntax.** There is _much_ more to Scala than syntax, and the mindset/"thinking in Scala" aspect is the most important. If you see a course that teaches "if statements" 1/3 into the course, look elsewhere.
2. **Look for a course that focuses on _functional programming_ in Scala.** All mainstream languages are pretty similar when it comes to imperative programming, i.e. variables, loops and the like. If you manage to see a preview of the course, the code inside should look pretty strange to you, and that is good! If the teacher uses variables and loops and it looks like regular Java or Python code but with a different syntax, then that course will miss the essentials of Scala.
3. **Look for a deconstructed, progressive learning approach.** For Scala, you should see the following topics, in roughly this order:
   - values (constants), syntax and control structures e.g. if-expressions
   - object-oriented programming and how to organize your code; methods, traits, inheritance
   - functional programming and thinking in terms of expressions, function values and chained computations
   - collections and processing data in a functional way with higher-order functions
4. If anyone says "for loop" in the course, run.

### 2.2. What's the best Scala course for beginners?

This [Scala & FP Essentials](https://rockthejvm.com/p/scala) is your introduction to Scala. I've recorded it 3 times by now, and the latest version of this course covers Scala 3 from scratch. You will get everything you need to be able to read, understand and contribute to any beginner-to-intermediate Scala project. Most importantly, you'll get a _mindset shift_ which is by far the most important thing to know when you learn Scala or any functional language.

At this stage of learning Scala, you need to learn:

- how to think your code in expressions instead of instructions
- how to get used to immutable data and constants, which are important no matter what programming language you end up using
- how to design your own data structures with classes, objects, inheritance
- how to write idiomatic, elegant and concise code in Scala
- how to think your code in terms of functional programming principles
- how functions-as-first-class-citizens work on top of the JVM
- how to process collections in a straightforward way
- how to use pattern matching, one of Scala's most powerful features

The course above will check all the above boxes, and more. It has already taught thousands of Scala developers to write and _think_ Scala.

If you have 2 hours free and want to simply have a taste of Scala instead of the full-blown experience, you can check out the [Scala at Light Speed](https://rockthejvm.com/p/scala-at-light-speed) mini-course, which is completely free, and you'll learn the quick foundations of Scala, including OOP, functional programming essentials, and even touching on some advanced features of Scala, such as given/using combos or advanced types.

## 3. How to Learn Scala as an Intermediate-Advanced User

Once you have a solid foundation in Scala and functional programming, it's time to take your skills to the next level. As an intermediate or advanced user, there are some topics you should focus on to enhance your expertise in Scala.

### 3.1. Intermediate Topics to Learn: Concurrency, Contextual Abstractions, Type System

At this point, you can already write and read just about 75% of existing Scala code. The areas that will get you to 95% are concurrency, contextual abstractions and mastering the type system. Let's take them in turn.

**Concurrency**. Scala's strength lies is its support for concurrent and parallel programming. Because Scala was primarily built for the JVM, you will need to understand the JVM threading model. Java developers are at an advantage here, because they've had more time to get accustomed to the mechanics of the JVM. But after you go through the initial mechanics, and with the FP principles you learned in the Scala essentials course, you are ready to discover Scala Futures, which are a functional way of dealing with asynchronous code. You'll compose Futures like you do with regular data types, and you'll learn about [controllable Futures](/controllable-futures), aka Promises.

**Contextual Abstractions**: This is a set of powerful features in Scala that allow you to define context-specific behavior. You'll be able to [pass arguments automatically](/scala-3-given-using), you'll be able to decorate existing types with [new methods](/scala-3-extension-methods), and you'll learn about implicit conversions. These constructs are at the foundation of popular libraries in the Scala ecosystem, like Cats Effect, ZIO and Akka.

**Type System**: Scala has a sophisticated and expressive type system. To become an advanced Scala developer, you should explore advanced type system features such as higher-kinded types, type projections and variance. Understanding these concepts will allow you to write more general and powerful code, while being type-safe 100% of the time.

### 3.2. What's the Best Scala Course for Advanced Users?

For intermediate users looking to deepen their Scala knowledge and get advanced, this [Advanced Scala and Functional Programming course](https://rockthejvm.com/p/advanced-scala) is what you need. This course covers all the advanced topics we discussed above, with functional programming techniques based on them, such as type classes or monads. It will give the skills needed to tackle complex Scala projects and make the most of the language's advanced features.

## 4. What Libraries to Learn as a Scala Developer

Scala has a rich ecosystem of libraries, each built on a radically different set of ideas. Familiarizing yourself with these libraries will greatly expand your capabilities as a Scala developer. Here are some notable libraries you should consider learning:

### 4.1. Cats Effect

[Cats Effect](https://typelevel.org/cats-effect) is a functional effect library that provides a general approach to handling side effects in a purely functional way. Besides the IO monad which gives you the power to write large-scale concurrent applications quite easily, Cats Effect also generalizes computations with type classes, making your code very clear, although it requires quite a bit of discipline to not get frustrated about compiler errors &mdash; which are good! Remember that the compiler is supposed to guard you from bugs.

Cats and Cats Effect have started Typelevel, their own mini-ecosystem of libraries, including [http4s](https://http4s.org), [fs2](https://fs2.io/) and [doobie](https://tpolecat.github.io/doobie/), which are heavily used in production.

I talked at length about writing production apps on the Typelevel libraries at Scalar and ScalaMatsuri 2023; you can find a polished recording [here](https://youtu.be/f7IKyXmcT8w).

> If you want to master the Typelevel ecosystem in my biggest course to date, check out the [Typelevel Rite of Passage](https://rockthejvm.com/p/typelevel-rite-of-passage). We build a full-stack application that I deploy to production, on camera.

If you want to learn Cats Effect, I have a long-form [Cats Effect course for Scala developers](https://rockthejvm.com/p/cats-effect). I also teach pure functional programming with [Cats](https://rockthejvm.com/p/cats) if you'd like that instead.

### 4.2. ZIO

[ZIO](https://zio.dev) is another powerful functional effect library for Scala. It's built on similar principles as Cats Effect, although it diverges in a few fundamental aspects.

First, it doesn't use type classes. The ZIO philosophy avoids capability declaration by implicit type class instances (a form of the [tagless final pattern](/tagless-final)). Instead, the ZIO effect already declares all it can do by just looking at its type (dependencies, errors, values).

Second, it opts for more practicality with layers. With the Typelevel ecosystem, as I argued in my conference talk as well, you need a high amount of discipline to organize your code properly. If you have it or it comes natural to you, you're set; not everyone feels like that, and we crave the removal of mental burdens. ZIO embraces the concept of layers, whereby all dependencies for effects are merely declared, and at the end of the application the ZIO library checks if you've passed all dependencies in one big declaration called `provide`. The library takes care to pass the right instance to the right module, freeing your memory from having to remember which module depends on what.

Third, type safety is guaranteed by embracing variance, one of the powerful features of the Scala type system which we explore in the advanced Scala course.

ZIO is super powerful and has an emerging ecosystem of libraries that interact with databases, HTTP, ES, Cassandra, Kafka, GRPC, even Akka wrappers. If you want to learn ZIO, we have a full-blown [ZIO course here](https://rockthejvm.com/p/zio).

### 4.3. Apache Spark

Apache Spark is a popular distributed computing engine that provides high-performance processing of large-scale datasets. It offers Scala APIs and is widely used for big data processing and analytics. Learning Spark will open up opportunities to work on big data projects and leverage the distributed computing capabilities of Scala.

Spark was the Scala ecosystem crown jewel for a long time, and in many respects, is still one of the most powerful pieces of software ever written in Scala. It almost single-handedly exploded the data engineering field.

Apache Spark is for aspiring data engineers. You don't need advanced Scala features to learn Spark, but if you want to get into data engineering, Spark is a great choice. Don't think of Spark as a glorified SQL on trillions of rows, though. Learning Spark will give you principles that you can apply to any data engineering framework.

If you're interested in learning Spark, I recommend the following Spark courses, in order:

- [Spark Essentials](https://rockthejvm.com/p/spark-essentials) for the fundamentals
- [Spark Optimization](https://rockthejvm.com/p/spark-optimization) for the rare skills and Spark optimization techniques
- [Spark Performance Tuning](https://rockthejvm.com/p/spark-performance-tuning) for the cluster and infrastructure optimization of Spark
- [Spark Streaming](https://rockthejvm.com/p/spark-streaming) for the same Spark principles applied to continuous data

### 4.4. Honorable mentions

[Akka](https://akka.io) is a set of libraries for building highly concurrent, distributed, and fault-tolerant applications. I am personally a big fan of Akka because of scalability potential and maturity, but since Lightbend's OSS license reversal, I can only recommend studying Akka if you need it for your work, in which case I have a whole bundle of [Akka courses](https://rockthejvm.com/p/the-akka-bundle).

[Play](https://playframework.com/) is a powerful framework that allows you to build web applications quickly. I have not covered Play in my courses here at Rock the JVM, and the most recent Play books are 5+ years old, so the only true resource is documentation.

[Finagle](https://twitter.github.io/finagle/) is a set of pragmatic Scala libraries used by Twitter in production. They innovated with a few concepts that are now present in various Scala libraries &mdash; if you can believe it, Finagle had the `Future` concept before the Scala standard library, and to this day is more powerful, with support for cancellation and distributed invocations.

## 5. Learning Path for Scala Developers

So, the big question: **what's a good order of topics to learn to become a Scala developer?**

I'd recommend the following learning path:

- Scala foundations
  - basics
  - advanced concepts that we discussed earlier in the article
- one FP library ecosystem, either Typelevel or ZIO &mdash; don't ask which because you'll get into endless debates, pick one at random and stick with it
  - the core library (Cats Effect or ZIO)
  - an HTTP library (Http4s or ZIO HTTP)
  - a database/persistence library (Doobie or Quill)
  - a streaming library (FS2 or ZIO Streams)
  - a functional abstractions library (Cats or ZIO Prelude)

If you want to be a data engineer, follow the Spark learning path above after learning the basics of Scala.

## 5. Conclusion

This article is a comprehensive guide to what you should learn to master Scala. We discussed some essential topics that every Scala developer needs to know, in what order, and which resources to use to learn Scala quickly. We also explored the most important libraries and tools in the Scala ecosystem, as well as a sequenced learning path to becoming a full-blown Scala developer.
