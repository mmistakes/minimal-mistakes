# Scala as a junior developer

## Why Scala?

_"Scala is too abstract", "Scala is not for beginners", "Functional programming is like magic", etc._

These are common arguments that come up when discussing Scala or functional programming in general. While some of them may be partially true, it is precisely these reasons that make Scala so interesting to me. Because of its abstraction and expressiveness capabilities, the safety brought by functional programming, and the modularity brought by object-oriented programming.

### Benefits of functional programming

I see several benefits in using a functional programming style. Here are a few of them:

#### Predictability

In functional programming, the result of a method only depends on the arguments passed to it, regardless of the state of the program. This helps to decouple the code, making it easier to test, maintain, and debug. For instance, let's say we want to add 1 to all the elements of a list:

```scala
// result depends on the argument
def add1ToAll(list: List[Int]): List[Int] = list.map(x => x + 1)

// result depends on the state of the program
var list = List[Int]()
def add1ToAll(): List[Int] = list.map(x => x + 1)
```

#### Readability and reusability

Being able to pass functions as arguments, and to return functions, helps to write more generic (thus reusable) code, and to focus more on the algorithm itself, rather than the implementation details. In imperative-style, we can't really do that, and we have to write lots of boilerplate code to achieve the same result. For instance when adding 1 to a list of integer, in FP we just need to pass a function `x => x + 1`, whereas in imperative-style, we need to initialize a new list, iterate over the original list, and add each transformed element to the list. This is not only more code, but it's also less readable (we need to read the entire block to understand it).

#### Other benefits

There's a lot of others, such as monads, referential transparency etc. But I will not go into details here, as it would be out of scope.

### Scala reasons

Okay, so functional programming is great, but why Scala? There are many other functional programming languages, like Haskell, F#, Clojure, etc. I won't go into details here, but here are a few reasons why I chose Scala:

#### Type system & Type inference

Scala has a very powerful type system that allows us to express very complex types while keeping the code readable. However, sometimes we can end up with veeeery long type names, which can be a bit annoying. But since Scala has a very powerful type inference system, we can write code without having to specify the type of every variable (the compiler will determine it for us). This is very useful as we do not pollute the code with types while keeping the safety they provide.

#### Mix of object-oriented programming and functional programming

Scala has been a pioneer in the mixing of these two paradigms and has been (and still is!) an inspiration for many languages. We benefit from the modularity of objects while having the safety and expressivity of functional programming. Also, unlike some other functional languages, it allows the usage of mutable variables, which can lead to performance improvements.

#### Multi-platform

Scala can now run on multiple platforms. The main one is the JVM, meaning that it benefits from the Java ecosystem (which is pretty huge) and from a performant long-term runtime environment. And it will get even more performant with the Loom project (lightweight threads).

But it can also run on the browser thanks to the Scala.js project, bringing interoperability with JavaScript. And it can be run as native code (without the JVM) with Scala Native, which can be useful for low-level programming.

## My Story with Scala

### Timeline

It all started when I was in the 3rd year of my master's degree. Each year, we have an internship (with increasing length over the years) to put into practice the knowledge accumulated and to set foot in the professional world.

#### 1. Internship at [Teads](https://www.teads.com/)

In 2021, I started looking at the Scala language, and since I became quite interested in it, I decided to try it in a "real-world" case and look for a company using Scala. This way, I could evaluate my "match" with the language. There was Teads, a company that I knew was intensively using Scala (90% of their backend is Scala). Again, I would like to thank them for giving me a nice opportunity that helped open some doors later.

That's how I landed on Scala and started going "in depth". Before the internship, I learned the basics of the language and functional programming, but I was far from using it efficiently. During it, I learned quite a lot: the basics of pure functional programming with the `Cats-effect` framework, the difference between `map` and `flatMap` (which was not easy at first), for-comprehensions, and even a bit about variance...

Once it finished, I was a little bit frustrated not to have been able to do more, but it motivated me to keep learning Scala. I did this by following both the beginner and advanced courses on [RockTheJVM!](https://rockthejvm.com/) and by doing some puzzles with Scala on [CodinGame](https://www.codingame.com/). Even though I had the "thing start motivation", I was surprised not to have many difficulties following these video-based courses and keeping a certain rhythm in it (I had lots of difficulties following online courses during the COVID pandemic).

### 2. Internship at the [Scala Center](https://scala.epfl.ch/)

As I was moving forward with Scala, I became more and more enthusiast about it, and I wanted to learn more about it. At the same time, I thought of beginning to contribute to open source projects: to learn, help others (even though at this stage it was more learning than helping :smile:), and also for the possibilities open-source can provide. While searching for companies using Scala, a teacher of my school ([Polytech Montpellier](https://www.polytech.umontpellier.fr/english/)) in charge of the Scala/FP course told me about the Scala Center, a non-for-profit Scala language foundation, situated in the EPFL (Ecole Polytechnique Fédérale de Lausanne) aiming at promoting the language, contributing to and coordinating its ecosystem (among other things, you can find more details on their [5-year report](https://scala.epfl.ch/records/first-five-years/)). It seemed to correspond to what I was looking for, so I applied for an internship there.

And I got accepted for a 5-month internship on the scala implementation of the debugger in VS Code ([scala-debug-adapter](https://github.com/scalacenter/scala-debug-adapter)) ! My job was to create a new evaluation mode that would be faster, allows more expression (access to private members, access to runtime type... since we are in a debug session). There I learnt a huge amount of things about Scala and more general concepts:

* quick view of how an IDE interacts with build tools (sbt...)
* compiler concepts (type-checking, overloads resolution...)
* scala compiler academy ([link here](https://www.scala-lang.org/blog/2022/11/02/compiler-academy.html))
* implementation of interoperability with Java in the bytecode
* first steps in open-source contributions
* meta-programming & code manipulation with scalameta (AST, trees, symbols, tokens...)
* write more expressive Scala code and my own monad
* created a video script & slides about asynchronous programming with `Future` and made some research about Loom as it appears to be a game changer for asynchronous programming on the JVM
* etc.

### 3. Next steps

One big default of mine is my shyness. I am not comfortable at all in entering new areas, to the point where I wait for people to come to me instead of going to them. Thankfully, on these two internships, they all did, so it helped me a lot in integrating with the team. But still, I need to work on it, so I started participating a little in the organization of conferences.

A French Scala user Discord server was launched not long ago by some ScalaIO members, and since they were looking for volunteers, I decided to join them after a first experience in conference organization.

I also had the chance to join the volunteering team of Scala Days Madrid 2023 (co-organized by the Scala Center), thanks to [Darja Jovanovic](https://www.linkedin.com/in/darjajovanovic/) (Executive Director of the Scala Center) who asked if I wanted to and transmitted my request to the organization team, after my school gave me the authorization. I will be hosting a track for the two conference days. I am really looking forward to it but also a bit stressed :upside_down_face:

### Learning process

#### Personal difficulties

##### 1. Functions

I was already a bit familiar with functions as parameters (callbacks in JavaScript, usage of `map`, `filter`, etc.), so this part was okay. But the one that was a bit more difficult was the usage of functions as return values. However, after a few examples and some practice, it became easier.

##### 2. `map` vs `flatMap`

Using `map` and `flatMap` on collections was not a problem (I knew when to use them), but when it came to using them on monads, I felt completely lost and did not understand why I had to use one instead of the other (so maybe my understanding was not that good on collections either). What helped me here was the "implementation" of these methods, particularly the `flatten` part of `flatMap`.

##### 3. Variance

I had a hard time understanding variance at first because the first time I encountered it was when I got an error like `[...] is in covariance position` and had absolutely no idea what it meant. After a few researches, I understood the reason behind it. Coming from OOP, covariance felt like an extension of inheritance (with some constraints to guarantee type-safety), so it was okay. But contravariance is like "reverse inheritance," which was a disturbing concept at first (I liked the example of `Animal` and `Vet` from the advanced course).

#### Tips

##### 1. Implicits

Implicits are awesome, they gives us so much power, but they can be very confusing. So it might be a good thing to understand them properly before using them (and especially how the implicit resolution is done). It can really helps in "cleaning" the code by keeping only the relevant arguments on sight (for instance, not having to pass the `ExecutionContext` (the thread manager) everywhere when using `Future`), but abusing them produce code that is hard to understand.

##### 2. `Option`, `Try`

These monads (function programming design pattern), are very useful, and instead of doing manual checks (nullity for `Option` and `try-catch` for `Try`), it's worth using them, as it force you to properly handle the error cases. Coming from Java where I performed null-checks and try-catch, it was a bit of a mind-shift, but it's really worth it.

<!-- Find some more -->