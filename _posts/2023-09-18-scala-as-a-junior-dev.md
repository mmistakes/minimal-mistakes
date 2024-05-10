---
title: "Scala as a Junior Developer"
date: 2023-09-18
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: []
excerpt: "A story of a beginner developer learning and working with Scala."
toc: true
toc_label: "The Story"
---

_By [Lucas Nouguier](https://github.com/iusildra)_

> Hey everyone, Daniel here. Lucas' story is shared by lots of beginner Scala developers, which is why I wanted to post it here on the blog. I've watched thousands of developers learn Scala from scratch, and, like Lucas, they love it!
>
> If you want to learn Scala well **and** fast, take a look at my [Scala Essentials](https://rockthejvm.com/p/scala) course at Rock the JVM.
> Enjoy!

## 1. Why Scala?

_"Scala is too abstract", "Scala is not for beginners", "Functional programming is like magic", etc._

These are common arguments that come up when discussing Scala or functional programming in general. While some of them may be partially true, it is precisely these reasons that make Scala so interesting to me. Because of its abstraction and expressiveness capabilities, the safety brought by functional programming, and the modularity brought by object-oriented programming.

### 1.1. Benefits of functional programming

I see several benefits in using a functional programming style. Here are a few of them:

#### 1.1.1. Predictability

In functional programming, the result of a method only depends on the arguments passed to it, regardless of the state of the program. This helps to decouple the code, making it easier to test, maintain, and debug. For instance, let's say we want to add 1 to all the elements of a list:

```scala
// result depends on the argument
var list = List(1, 2, 3)
def add1ToAll(l: List[Int]): List[Int] = l.map(x => x + 1)
add1ToAll(list) // List(2, 3, 4)
list = List(2, 3, 4)
add1ToAll(list) // List(3, 4, 5)
```

With this functional programming compliant implementation, I can predict the result without even computing it, because it depends only on the list I feed it with. I could even replace the function call with its result, and it would still work as expected.

However, if I do not comply with functional programming principles, I can't be sure of the result without computing it, because it does not depend on the input anymore, but on the state of the program, which can change at any time:

```scala
// result depends on the state of the program
var list = List(1, 2, 3)
def add1ToAll(): List[Int] = list.map(x => x + 1)
add1ToAll() // List(2, 3, 4)
// list is changed somewhere else in the program
add1ToAll() // List(3, 4, 5)
```

Because we have side effects, it's hard to tell what the behavior of the program is (what it does and in which cases), which can lead to an incorrect reading of the code and to bugs. That's another benefit of the functional programming approach: it is easier to reason about the code. We can have "local" reasoning, meaning that we can operate on a scope without having to worry about the rest of the program:

```scala
// non-local reasoning
var mutableThing = ???
def smallSpaghetti() =
  if mutableThing == ??? then // do something
  else // do something else
```

Here I need to understand what is `mutableThing`, when and where it is modified to understand what the method does. This is not the case in functional programming, where we can have local reasoning:

```scala
// local reasoning
def complicateMethod(mutableThing: Any) =
  if mutableThing == ??? then // do something
  else // do something else
```

#### 1.1.2. Readability and reusability

Being able to pass functions as arguments, and to return functions, helps to write more generic (thus reusable) code, and to focus more on the algorithm itself, rather than the implementation details. For instance, let's say we want to transform a collection. In FP, all we need to do is define a method that takes a transformation function as argument, and apply it to the collection. Then the developer can choose the transformation function they want to apply, and the method will do the rest. An example with a simple `map` method:

```scala
// FP-style
class MyArray[A](size: Int) {
  private val container = ???
  // ...
  def map[B](f: A => B): MyArray[B] = ???
}

MyArray(1, 2, 3).map(x => x + 1) // MyArray(2, 3, 4)
MyArray("a", "b", "c").map(x => x + "z") // MyArray("az", "bz", "cz")
```

You can find a complete example in the [Scala Essential Courses](https://rockthejvm.com/courses/enrolled/830425)

You could ask, "why would I use `map` when I can use loops ?". Well, for each transformation, we need to manually initialize a new collection, iterate over the original one, and then apply the transformation to each element. This is not only more code, but it's also less readable (we need to read the entire block to understand it).

```scala
// imperative-style
def add1ToAll(list: List[Int]): List[Int] = {
  var newList = List[Int]()
  for (i <- 0 until list.length)
    newList = newList :+ list(i) + 1
  newList
}
def addZToAll(list: List[String]): List[String] = {
  var newList = List[String]()
  for (i <- 0 until list.length)
    newList = newList :+ list(i) + "z"
  newList
}
add1ToAll(List(1, 2, 3)) // List(2, 3, 4)
addZToAll(List("a", "b", "c")) // List("az", "bz", "cz")
```

### 1.2. Scala reasons

Okay, so functional programming is great, but why Scala? There are many other functional programming languages, like Haskell, F#, Clojure, etc. I won't go into details here, but here are a few reasons why I chose Scala:

#### 1.2.1. Type system & Type inference

Scala has a very powerful type system that allows us to express very complex types while keeping the code readable. However, sometimes we can end up with veeeery long type names, which can be a bit annoying. But since Scala has a very powerful type inference system, we can write code without having to specify the type of every variable (the compiler will determine it for us). This is very useful as we do not pollute the code with types while keeping the safety they provide.

```scala
val x = 1                     // x: Int = 1
val list = List(1, 1, 2)      // list: List[Int] = List(1, 1, 2)
val str = list.mkString(", ") // str: String = 1, 1, 2
val longThing =               // longThing: Int = 10
  List(1, 2, 3, 4, 5)
    .map(0 until _)
    .filter(_.sum > 8)
    .flatten
    .sum
// same but without type inference
val longUglyThing: Int =
  List[Int](1, 2, 3, 4, 5)
    .map((x: Int) => 0 until x)
    .filter((r: Range) => r.sum > 8)
    .flatten
    .sum
```

You can activate an option in Metals (a scala language server for IDEs) to show the inferred types as a decoration in the editor, which I now use most of the time. I recommend the "minimal" setting option because it shows only relevant types (parameters, return types...).

#### 1.2.2. Mix of object-oriented programming and functional programming

Scala has been a pioneer in the mixing of these two paradigms and has been (and still is!) an inspiration for many languages. We benefit from the modularity of objects while having the safety and expressivity of functional programming. Also, unlike some other functional languages, it allows the usage of mutable variables, which can lead to performance improvements.

#### 1.2.3. Multi-platform

Scala can now run on multiple platforms. The main one is the JVM, meaning that it benefits from the Java ecosystem (which is pretty huge) and from a performant long-term runtime environment. And it will get even more performant with the Loom project (lightweight threads).

But it can also run on the browser thanks to the Scala.js project, bringing interoperability with JavaScript. And it can be run as native code (without the JVM) with Scala Native, which can be useful for low-level programming.

#### 1.2.4. Implicits

Implicits are specific values that will be injected by the compiler when they are required (and if they are in available in the current scope). They are very useful to keep a context and not having to write it each time (reduce boilerplate code).

A nice example is with `Future`. A `Future` is a value that will be computed asynchronously in a separate thread. To do so, we need a thread manager as the `Future` only models the value, and we need to pass it each time we create a `Future`.

```scala
import scala.concurrent.ExecutionContext.global // a thread manager

Future(1 + 1)(global)
  .map(_ + 1)(global)
  .flatMap(x => Future(x + 1))(global)
```

Which is quite cumbersome. But the execution context can be passed implicitly, so we can write:

```scala
import scala.concurrent.ExecutionContext.Implicits.global

Future(1 + 1)
  .map(_ + 1)
  .flatMap(x => Future(x + 1))
```

Which is much more pleasant to read.

Implicits allows to have `type classes`, which define a generic behavior that is to be implemented with a specific type. It can be seen as a way to automatically extends a type with new behaviors if and only if their corresponding implementations are present in the current scope. It is particularly powerful in library design as it helps in decoupling the code by keeping the core behavior in the class and the "required" behavior in the type class. For instance:

```scala
trait Animal
case class Cat(name: String, age: Int) extends Animal
case class Dog(name: String, age: Int) extends Animal

trait InfoExtractor[T]:
  def extractInfo(t: T): String

extension [T <: Animal](t: T) def serialize(using s: InfoExtractor[T]): String = s.extractInfo(t)

given InfoExtractor[Cat] with { def extractInfo(t: Cat) = s"Cat: ${t.name}, ${t.age}" }
given InfoExtractor[Dog] with { def extractInfo(t: Dog) = s"Dog: ${t.name}, ${t.age}" }

val cat = Cat("Scala", 11)
val dog = Dog("Java", 25)

cat.serialize // "Cat: Scala, 11"
dog.serialize // "Dog: Java, 25"
```

We could use standard interfaces to reproduce type classes, but then we would have to manually pass the implementation each time which has 2 drawbacks:

- it is cumbersome to write and it pollutes the code with "context" arguments (arguments that will always be the same in the current scope)
- when changing the implementation, it must be done everywhere to keep the same behavior and we might forget some places, leading to unexpected behaviors

You can find more about implicits (also called given/using clauses in Scala 3) in this [article](https://blog.rockthejvm.com/scala-3-given-using/)

But implicits comes with a trade-off: they can be hard to understand at first, and might lead to unexpected behaviors where the wrong implicit is injected. Especially when there are multiple implicits of the same type in the scope (look at the implicit resolution process to avoid this). Still, it is a very powerful feature that helps in making the code more expressive by masking some boilerplates (I know that I'm giving `global` as execution context, so I don't want to see it each time).

#### 1.2.5. Conciseness

While having a very robust type system, Scala is not verbose at all. The syntax is very concise and somewhat similar to Python's syntax. We can even define our own operators with special characters (`+`, `++`, `-`, `+?`...) and in infix position (e.g. `1 |& 1` instead of `1.|&(1)`), which is so cool to express logic in a readable way.

Lambda syntax can also very concise. For instance:

- We can use placeholders `_` in lambdas like `.map(_ + 1)` instead of `.map(x => x + 1)`. The n-th placeholder is replaced by the n-th argument, so we can write `.map(_ + _)` instead of `.map((x, y) => x + y)`, but we cannot reuse the same placeholder twice (e.g. `.map(_ + _)` is not a valid replacement for `.map(x => x + x)`).
- If the lambda is composed of a single method call whose arguments are the same (same type & order) as the lambda's arguments, we can define the lambda with only the method name like `.map(println)` instead of `.map(x => println(x))`.

#### 1.2.6. Pattern matching

This is one thing I cannot not talk about. Pattern matching allows to easily control the execution flow based on patterns. A pattern can be almost anything: a type, a value, a destructured object...

```scala
sealed trait Pattern
case class Simple(x: Any) extends Pattern
case class Complex(x: Int, s: String, p: Option[Pattern]) extends Pattern

def matchPattern(p: Pattern): Unit = p match {
  case Simple("lulu") => println(s"Simple: lulu")
  case Simple(1 | 2) => println(s"Simple: 1 or 2")
  case Simple(x: Int) if x == 10 => println(s"Simple int: $x")
  case Complex(x, s, None) => println(s"Complex without pattern")
  case _ => println("Other")
}
```

You can even define your own pattern with an extractor: an `object` with an `unapply` method whose argument is the value to match and return type a boolean if you simply want a match or not, or an `Option[T]` if you want to extract a value of type `T` from the value to match.

```scala
object Even {
  def unapply(x: Int): Boolean = x % 2 == 0
}
object SimpleComplex {
  def unapply(p: Pattern): Option[(Int, String, Option[Pattern])] = p match {
    case Complex(x, s, p @ (None | Some(_: Simple))) => Some((x, s, p))
    case _ => None
  }
}
```

The `@` is used to extract the value from the pattern and bind it to a variable. Now we can use these patterns in our `match`:

```scala
// ...
  case SimpleComplex(x, s, p) => println(s"A complex with a simple pattern or nothing")
  case Simple(Even()) => println(s"Simple even number")
// ...
```

The pattern matching is exhaustive, meaning that if you forget a case, the compiler will warn you. And if don't do as he says, he might throw an exception at runtime if it does not find any match. To overcome this, you can use a wildcard pattern `_` or a simple variable name without constraint (e.g. `case rest => ???`) to match anything else.

Also, the matching is done in order, so the first match will be executed. Meaning that the most specific cases must be placed on top of the list, and the most generic ones at the bottom. However, the compiler will warn you if a case is unreachable.

## 2. My Story with Scala

### 2.1. Timeline

It all started when I was in the third year of my master's degree. Each year, we have an internship (with increasing length over the years) to put into practice the knowledge accumulated and to set foot in the professional world.

#### 2.1.1. Internship at [Teads](https://www.teads.com/)

In 2021, I started looking at the Scala language, and since I became quite interested in it, I decided to try it in a "real-world" case and look for a company using Scala. This way, I could evaluate my "match" with the language. There was Teads, a company that I knew was intensively using Scala (90% of their backend is Scala). Again, I would like to thank them for giving me a nice opportunity that helped open some doors later.

That's how I landed on Scala and started going "in depth". Before the internship, I learned the basics of the language and functional programming, but I was far from using it efficiently. During it, I learned quite a lot: the basics of pure functional programming with the `Cats-effect` framework, the difference between `map` and `flatMap` (which was not easy at first), for-comprehensions, and even a bit about variance...

Once it was finished, I was a little bit frustrated not to have been able to do more, but it motivated me to keep learning Scala. I did this by following both the beginner and advanced courses on [RockTheJVM!](https://rockthejvm.com/) and by doing some puzzles with Scala on [CodinGame](https://www.codingame.com/). Even though I had the initial motivation, I was surprised not to have many difficulties following these video-based courses and keeping a certain rhythm in it (I had lots of difficulties following online courses during the COVID pandemic).

#### 2.1.2 Internship at the [Scala Center](https://scala.epfl.ch/)

As I was moving forward with Scala, I became more and more enthusiast about it, and I wanted to learn more about it. At the same time, I thought of beginning to contribute to open source projects: to learn, help others (even though at this stage it was more learning than helping :smile:), and also for the possibilities open-source can provide. While searching for companies using Scala, a teacher of my school ([Polytech Montpellier](https://www.polytech.umontpellier.fr/english/)) in charge of the Scala/FP course told me about the Scala Center, a non-for-profit Scala language foundation, situated in the EPFL (Ecole Polytechnique Fédérale de Lausanne) aiming at promoting the language, contributing to and coordinating its ecosystem (among other things, you can find more details on their [5-year report](https://scala.epfl.ch/records/first-five-years/)). It seemed to correspond to what I was looking for, so I applied for an internship there.

And I got accepted for a 5-month internship on the scala implementation of the debugger in VS Code ([scala-debug-adapter](https://github.com/scalacenter/scala-debug-adapter)) ! My job was to create a new evaluation mode that would be faster, allows more expression (access to private members, access to runtime type... since we are in a debug session). There I learnt a huge amount of things about Scala and more general concepts:

- quick view of how an IDE interacts with build tools (sbt...)
- compiler concepts (type-checking, overloads resolution...)
- scala compiler academy ([link here](https://www.scala-lang.org/blog/2022/11/02/compiler-academy.html))
- implementation of interoperability with Java in the bytecode
- first steps in open-source contributions
- meta-programming & code manipulation with scalameta (AST, trees, symbols, tokens...)
- write more expressive Scala code and my own monad
- created a video script & slides about asynchronous programming with `Future` and made some research about Loom as it appears to be a game changer for asynchronous programming on the JVM (and at the same time realized the huge amount a work required to make a single video of 15 min :sweat_smile:)
- ...

#### 2.1.3. Next steps

One big default of mine is my shyness. I am not comfortable at all in entering new areas, to the point where I wait for people to come to me instead of going to them. Thankfully, on both of these internships, they all did, so it helped me a lot in integrating with the team. But still, I need to work on it, so I started participating a little bit in the organization of conferences.

A French Scala user Discord server was launched not long ago by some ScalaIO members, and since they were looking for volunteers, I decided to join them after a first experience in conference organization.

I have also had the chance to join the volunteering team of Scala Days Madrid 2023 (co-organized by the Scala Center), thanks to [Darja Jovanovic](https://www.linkedin.com/in/darjajovanovic/) (Executive Director of the Scala Center) who asked if I wanted to and transmitted my request to the organization team, after my school gave me the authorization. I will be hosting a track for the two conference days. I am really looking forward to it but also a bit stressed :upside_down_face:

### 2.2. Learning process

#### 2.2.1. Personal difficulties

##### 2.2.1.1. Functions as value

I was already a bit familiar with functions as parameters (callbacks in JavaScript, usage of `map`, `filter`, etc.), so this part was okay. But the one that was a bit more difficult was the usage of functions as return values. However, after a few examples and some practice, it became easier. It is another mindset, but it is so helpful once you get it. For instance when you have a method with several parameters and some of them are always the same, you can create a function that takes the "common" parameters and returns a function that takes the rest of the parameters. This way, only the "relevant" parameters appear in the call.

```scala
def method(a: Int, b: Int, c: Int, d: Int): Int = a+d+c+d
val f: (Int, Int) => Int = method(1, 2, _, _)
f(3, 4) // 12
f(5, 6) // 18
```

You can also use it to return a function based on the parameters values:

```scala
def method(a: Int, b: Int): Int => Int =
  if (a > b) (x: Int) => a * x + b
  else (x: Int) => b * x + a

val f1: Int => Int = method(1, 2)
val f2: Int => Int = method(3, 1)
f1(3) // Int = 7
f2(3) // Int = 10
```

##### 2.2.1.2. `map` vs `flatMap`

Using `map` and `flatMap` on collections was not a problem (I knew when to use them), but when it came to using them on monads, I felt completely lost and did not understand why I had to use one instead of the other (so maybe my understanding was not that good on collections either). What helped me here was to look at the implementation of these methods, particularly the ones of `Option` (as the others are more complicated)

```scala
val list = List(1, 2, 3)
val anotherList = list.map(x => x + 1)            // List(2, 3, 4)
val listOfList = list.map(x => List(x, x + 1))    // List(List(1, 2), List(2, 3), List(3, 4))
val flatList = list.flatMap(x => List(x, x + 1))  // List(1, 2, 2, 3, 3, 4)

val anOption = Some(1)
val anotherOption = anOption.map(x => x + 1)           // Some(2)
val optionOfOption = anOption.map(x => Some(x + 1))    // Some(Some(2))
val flatOption = anOption.flatMap(x => Some(x + 1))    // Some(2)
```

Basically, `map` is used when you simply want to transform the value, and `flatMap` is used to chain operations. Let's imagine we have two methods that return an `Option`:

```scala
def getA: Option[A] = ???
def getB(a: A): Option[B] = ???
```

We need to get an `A` from `getA` to then get a `B` from `getB`. We could do it like this:

```scala
val res: Option[Option[B]] = getA.map(a => getB(a))
```

But it returns an `Option[Option[B]]`, which is not exactly what we want. We need to "flatten" the result:

```scala
val res: Option[B] = getA.flatMap(a => getB(a))
```

This is possible because the return type of the function of `flatMap` is constraint to be an `Option`

##### 2.2.1.3 Variance

I had a hard time understanding variance at first because the first time I encountered it was when I got an error like `[...] is in covariance position` and had absolutely no idea what it meant. After a few researches, I understood the reason behind it. Coming from OOP, covariance felt like an extension of inheritance (with some constraints to guarantee type-safety), so it was okay. But contravariance is like "reverse inheritance," which was a disturbing concept at first (I liked the example of `Animal` and `Vet` from the courses).

Given `Type[_]` a generic type and $<:$ the 'isSubtypeOf' operation, the 3 types of variances can be summarized like this:

- Covariance: $\forall \{A, B\},\; A <: B \Leftrightarrow Type[A] <: Type[B]$
- Contravariance: $\forall \{A, B\},\; A <: B \Leftrightarrow Type[B] <: Type[A]$
- Invariance: $\forall \{A, B\},\; A = B \Leftrightarrow Type[A] = Type[B]$

There are some constraints to guarantee type-safety, but the idea is here

#### 2.2.2. Tips

##### 2.2.2.1 Evaluation

In Scala, everything is an expression, meaning that it is evaluated and has a value. It contrasts to imperative languages where everything is an instruction that may not return a value (such as `void` in Java). Scala wraps the `void` type from Java into `Unit`. Additionally, there are two modes of evaluating method/function parameters:

- by-value: the value is evaluated before the method is called
- by-name: the value is evaluated when it is used in the method (and each time it is used). It is represented by an arrow before the parameter's type: `=> ...`

```scala
import scala.util.Random

def byValue(t: Int): Seq[Int] =
  for
    _ <- 0 until 3
  yield t

def byName(t: => Int): Seq[Int] =
  for
    _ <- 0 until 3
  yield t

byValue(Random.nextInt(10000))  // : Seq[Int] = Seq(2551, 2551, 2551)
byName(Random.nextInt(10000))   // : Seq[Int] = Seq(6419, 9607, 1189)
```

It is very important to understand the difference between these two, especially when dealing with side effects or if you want to enhance performances (e.g. when a parameter is not used because of a condition, it is not necessary to evaluate it, especially if it is a long computation).

##### 2.2.2.2. Immutability

To guarantee immutability you obviously need a value (which is immutable otherwise it is a variable), but also immutable types. For instance

```scala
class A(var x: Int) // mutable type

val a = new A(1)
a.x = 2
a.x                 // : Int = 2 <-- no immutability
```

If you don't have these 2 criteria, then you do not have immutability, and your code is subject to side-effects

##### 2.2.2.3. Implicits

Implicits are awesome, they give us so much power, but they can be very confusing. So it might be a good thing to understand them properly before using them, and especially how the implicit resolution is done. And also take a few minutes to think "am I using it because it's fun / looks smart or because it will save me from passing the same arguments tens of times ?".

Because implicits can really help in "cleaning" the code by keeping only the relevant arguments on sight, but abusing them produce code that is hard to understand. Because we need to keep the context in mind, and it's not always easy to do so.

There is an option in Metals to show the implicits as a decoration in the editor, that I use when dealing with a code with lots of implicits.

##### 2.2.2.4 `Option`, `Try`... and monads in general

Monads are a bit strange at first and you might feel like writing more code than necessary, but it's worth it, in both readability and maintainability. It makes a certain behavior explicit (possible nullity for `Option`, possible failure for `Try`...) and forces you to handle it, so the code is more robust.

Let's say we have this small code:

```scala
class A {
  def method: String = if (Random.nextBoolean) then "not null" else null
}
val nullable: A = if (Random.nextBoolean) new A() else null
```

In a very imperative way, we would write something like this:

```scala
val res1: A = if (nullable != null) nullable.method else null
val res2: String = if (res1 != null) s"Length: ${res1.size}" else null
```

But we might forget to check for `null` at some point, and the code will fail at runtime. So we can use `Option` to make the nullity explicit, resulting in a safer code:

```scala
val res3: Option[String] =
  for
    res <- Option(nullable)
    str <- Option(res.method)
  yield s"Length: ${str.size}"
```

Each monads has its own behavior (we can not use a `Try` to handle nullability for instance), but the principle is the same: make a certain behavior explicit and force you to handle it properly:

- transform the result with `map` / `recover`
- chain operations with `flatMap` / `recoverWith`
- filter the result with `filter` / `filterNot`
- ...

##### 2.2.2.5. Recursion instead of loops

If you are not familiar with recursion, it is definitely worth learning it as Scala is working very nicely with recursion. They are usually more expressive and cleaner than loops, but the trade-off is that they are a bit less efficient.

A common limitation of recursive methods is the stack size, but Scala can optimize a method to be tail-recursive: instead of stacking then de-stacking, it will reuse the same stack frame. To do so, the recursive call must be the last instruction of the method, and the method might be annotated with `@tailrec` (to make sure the compiler will optimize it, if it can not do it, an error will be thrown). With the `factorial` example:

```scala
@tailrec
def factorial(n: Int): Int =
  if (n == 0) 1
  else n * factorial(n - 1) // error
```

Here it might look like the recursive call is the last instruction, but it is not. The last instruction is the multiplication, and the recursive call is used as an argument. So the compiler will throw an error. But we still need to "keep" the intermediate result, so we can use an accumulator:

```scala
@tailrec
def factorial(n: Int, acc: Int = 1): Int =
  if (n == 0) acc
  else factorial(n - 1, n * acc) // ok
```

You can see the accumulator as if you were gradually building the result, instead of preparing all the intermediate result to catch them all at the end.

But then you should be extra careful about end conditions as a tail-recursive method can run indefinitely (as long as you have electricity) if the end condition is not reached since the stack won't grow :grin:

Accumulators imply to add an argument to the method, which can be confusing (especially if the method is public) and developers might give it a wrong value (e.g. `factorial(5, 5)`). So we can use either a private method (also called auxiliary method) or a local method to mask the recursive method:

```scala
def factorial(n: Int): Int =
  def loop(n: Int, acc: Int): Int =
    if (n == 0) acc
    else loop(n - 1, n * acc)
  loop(n, 1)
```

Personally, for small recursive ones, I prefer the local method as it stays in its scope and does not pollute the class. But the best of tail-recursion is that in some cases, it can lead to huge performance improvements ! Let's take the fibonacci suite example in a "standard" top-down recursive implementation (`fiboRC`) and a tail-recursive one (`fiboTR`):

```scala
def fiboRC(n: Int): Int =
  if (n <= 1) n
  else fibo(n - 1) + fibo(n - 2)

def fiboTR(n: Int): Int =
  def loop(n: Int, acc1: Int, acc2: Int): Int =
    if (n <= 1) acc1
    else loop(n - 1, acc2, acc1 + acc2)
  loop(n, 0, 1)
```

`fiboRC(50)` is very simple, but it is also very inefficient: computing `fiboRC(50)` will take tens of seconds. That's because we will recompute many time the same values (e.g. `fiboRC(10)`) But if we use a tail-rec approach (where we don't recompute any values), it will be almost instantaneous:

- `fiboRC(50)` : 59 s
- `fiboTR(50)` : 96 µs

And if we take the optimized solution with a while-loop implementation:

```scala
def fiboWL(n: Int): Int = {
  var acc1 = 0
  var acc2 = 1
  var i = 0
  while (i < n) {
    val tmp = acc1
    acc1 = acc2
    acc2 = tmp + acc2
    i += 1
  }
  acc1
}
```

I personally prefer the tail-rec approach as it is more expressive and easier to read. But if performances are critical, then the while-loop is the best solution.

##### 2.2.2.6. `for-comprehension`

`for-comprehension` is syntactic sugar for `map` / `flatMap` / `filter` and can be used with any type that has these methods. It is very useful to chain operations on collections or on monads without having to nest them. They are Scala's idiomatic way to chain operations and help a lot in making the code easy to read. Therefore, you should get familiar with them. For instance, if we want to do a cartesian product of three lists:

```scala
val list1 = List(1, 2, 3)
val list2 = List(4, 5, 6)
val list3 = List(7, 8, 9)

// for-comprehension
for
  i <- list1
  j <- list2
  k <- list3
yield (i, j, k)
// standard way
list1.flatMap: i =>
  list2.flatMap: j =>
    list3.map((i, j, _))
```

The `for-comprehension` allows to transform an horizontal code into a vertical one, which is much easier to read (you don't like `if` forests, do you ?). But they can be even more expressive with filters without much more complexity. Let's say we want to remove all the even numbers from `list1` in the cartesian product:

```scala
for
  i <- list1
  if i % 2 == 0
  j <- list2
  k <- list3
yield (i, j, k)
```

And that's all! The condition is applied to each element of `list1`. If we really don't want to use for-comprehension, we can use the standard way:

```scala
list1: i =>
  if i % 2 == 0 then
    list2.flatMap: j =>
      list3.map((i, j, _))
  else Nil
```

But I think most will prefer the `for-comprehension` version. Final words on for-comprehensions: since everything in Scala is an expression, you can use expressions in for-comprehensions:

```scala
for
  i <- if (condition) then list1 else list2
  j <- list3
yield (i, j)
```

##### 2.2.2.7. Type Inference

Type inference is an awesome feature that makes developing much more pleasant. However, it is recommended to specify the type of public methods and fields as it helps in understanding the code. Personally, while I'm creating the method/fields, I don't specify the type, but once I'm done, I add it. This way, my screen does not turn red while coding, and if I need to refactor/correct the implementation and end up with the wrong type, the compiler will tell me instead of crashing at call-sites.

## 3. Conclusion

Scala is a very rich language with lots of features, and it can be a bit overwhelming at first. But it's actually all these features that attracted me to this language, for all the possibilities they offer. Thankfully, you don't need to master them all to start writing good Scala code; there are still advanced features for which I have had no usage yet, like recursive types (this one is funny)

Also, don't hesitate to ask questions on the forums or community channels that you can find on the [Scala website](https://scala-lang.org/community/). The community is very welcoming and will be happy to help you.

I hope you enjoyed reading this article and that it will help you in your journey with Scala. I tried to make it as complete as possible, but I might have forgotten some things. If you have any questions, feel free to ask me or the community.

Happy coding! :technologist:
