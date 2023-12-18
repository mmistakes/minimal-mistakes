---
title: "Practical Type-Level Programming in Scala 3"
date: 2023-12-06
header:
  image: "/images/blog cover.jpg"
tags: []
toc: true
excerpt: "Learn how to use type-level programming to solve practical problems."
---

_by [Daniel Beskin](https://linksta.cc/@ncreep)_

# 1. Introduction

Scala 3 boasts many features that are meant to simplify and enhance type-level programming: match types, inlines, diverse compile-time operations, and the list goes on. With all these new features it is quite easy to get lost when trying to solve a concrete problem using type-level techniques.

In this article my aim is to bridge that gap by showing, step by step, how to solve a concrete problem using many of the new type-level features that Scala 3 provides. Let's dig in!

## 1.1. Setup

The full code for all the steps can be found in [this](https://github.com/ncreep/scala3-flat-json-blog/) repo.

You can see the setup for the post in [this](https://github.com/ncreep/scala3-flat-json-blog/blob/master/setup.scala) file and follow along using the [Scala CLI](https://scala-cli.virtuslab.org/) tool.

After cloning the repo, use the command
```bash
scala-cli console .
```

In the repo folder to start a REPL with the required dependencies.

## 1.2. The Problem

The problem that we are going to solve is inspired by an actual use-case that I had at work. So hopefully it will be realistic enough as to be useful for your own endeavors.

Imagine that you have the following data model[^badModel] that you need to store as JSON:
```scala
import io.circe.*
import io.circe.generic.semiauto

case class User(email: Email, phone: Phone, address: Address)

case class Email(primary: String, secondary: Option[String])

case class Phone(number: String, prefix: Int)

case class Address(country: String, city: String) 

object Email:
  given Codec.AsObject[Email] = semiauto.deriveCodec[Email]

object Phone:
  given Codec.AsObject[Phone] = semiauto.deriveCodec[Phone]

object Address:
  given Codec.AsObject[Address] = semiauto.deriveCodec[Address]
```

[^badModel]: This is a very loosely-typed model for example purposes only, please use better and more precise types for real code.

But, you can't store this data in any format you want, it has to be "flat". More specifically, each field in the top-level class has to be inlined into the top-level JSON that you produce[^whyFlat].

[^whyFlat]: I'll leave it up to you to imagine why you might have such a requirement.

Suppose you have the following data:
```scala
val user = User(
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

Notice how we no longer have the top-level fields, and instead have the data they contained inlined at the top-level[^goodIdea].

[^goodIdea]: I'm going to side-step the issue of whether tying your internal model to serialization concerns is a good idea (it's not), and just go with the problem as is.

As stated it wouldn't be difficult to solve the problem at runtime with some JSON munging. But there are at least two reasons why that's not good enough for us. A runtime penalty for creating redundant intermediate JSON structures, and more importantly; we want this as safe at compile-time as possible. We don't want our users discovering some silly mistake after they deployed to production. Safety for our purposes would mean that:
- If the top-level class has a primitive field - fail to compile
- If the inlined classes have duplicate field names - fail to compile

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

Be warned, this is quite a long post, with many different parts. Take your time reading it part by part. Reading it all in one sitting might be overwhelming.

Let us now proceed to flat serializing a concrete class. This will allow us to dip our toes into a bit of type-level programming without going into the deep end straight away.

# 2. Serializing a Concrete Class

## 2.1. Pseudocode

Since we'll be dealing with JSON, we'll need a JSON library to do the JSON work for us. I'll be using [Circe](https://github.com/circe/circe), but pretty much any other Scala JSON library (of which there are plenty) will do just fine. I won't spend too much time explaining the mechanics of Circe, in the hope that the JSON code we'll be writing is sufficiently self-explanatory.

So for this part our goal is to take any instance of the `User` class and serialize it as a flat JSON. In Circe-speak, what we need is an `Encoder` for the `User` type.

Because metaprogramming in most languages isn't as readable as plain code, when tackling a metaprogramming problem I find it helpful to first sketch a solution in pseudo-code. Let's do that for the JSON `Encoder`:
1. Given a `User` instance
1. For each field in the class
1. Find the appropriate `Encoder` for the field's type
1. Convert the field to a JSON object
1. Concatenate all the JSON objects into one

Short and to the point.

## 2.2. Lists and Tuples

In the pseudo-code we are referring to the fields of a class as if it's a list, something that we can iterate on. This is of course a simplification, since the fields of a class can have different types, while lists in Scala can only contain a single (statically-known) type.

If we try to do something like this:
```scala
val fields = user.productIterator
```

`fields` will have the not very helpful type `Iterator[Any]`. This doesn't suit our purposes, as we need everything to be known at compile-time. Otherwise, we won't be able to find the correct `Encoder`s for the fields. Remember that `Encoder`s (and implicits in general) are resolved by the statically-known type of the value.

To solve this issue we can squint a bit at the case class definitions that we are using and see that the fields of a case class are somewhat like a tuple. So the class:
```scala
case class User(email: Email, phone: Phone, address: Address)
```

Is equivalent (up to field names) to this tuple type:
```scala
(Email, Phone, Address)
```

And if we squint even a bit further, tuples are somewhat similar to lists, with the key difference that types of the elements can be different (heterogenous). To tie this all up in a nice package, Scala 3 provides us with list-like operations on tuples directly[^hlist]. Of course, since tuples are not actually lists, the way we work with them will be different, but keep the list analogy in mind as we go on to manipulate tuples in creative ways.

[^hlist]: Similar to the functionality of the `HList` type in the [Shapeless](https://github.com/milessabin/shapeless) library for Scala 2.

The `Tuple` companion has a handy function that lets us convert a case class into its equivalent tuple:
```scala
scala> val fields = Tuple.fromProductTyped(user)
val fields: (Email, Phone, Address) = (
  Email(bilbo@baggins.com,Some(frodo@baggins.com)),
  Phone(555-555-00,88),
  Address(Shire,Hobbiton))
```

Using `Tuple.fromProductTyped` we can convert a `User` value to its corresponding tuple type, without losing type information. Now all we need is to learn to operate on tuples as if they were lists.

## 2.3. Tuple Iteration

So how do we iterate over a tuple? 

If we were working with actual lists, the `map` function would come in handy for our problem.
The new Scala 3 tuples now too have the `map` function which sounds like it could be what we're looking for. Here's the code that I wish I could write:
```scala
fields.map: field =>
  val encoder = summon[Encoder]

  val json = encoder(field)

  json
```

Unfortunately, this won't work, for multiple reasons.

We're now going to play a game of code Whac-A-Mole, where we'll fix one problem and another will pop up. We'll get it to work, eventually...

To start with, what does the `summon[Encoder]` line actually means? What type exactly are we converting to JSON? An `Encoder` doesn't just take any value and turns it into JSON, but rather takes a type-parameter that indicates what type to convert, and then it can convert that specific type. So we should be calling it with `summon[Encoder[X]]`. Where `X` is the type of the field we are currently operating on. 

What is the type of `field` here? Recall that we are operating on tuples, meaning that the type of each element is unique, and `map` needs to be able to deal with that. The only way to do that is if the function argument that `map` accepts can handle any type whatsoever. And this what the `map` signature actually looks like:
```scala
def map[F[_]](f: [t] => t => F[t]): Map[this.type, F]
```

The signature is a bit intimidating, it uses a polymorphic function as an argument (and we'll ignore the return type for the time being). This means that the function that we are passing to `map` must work uniformly for **any** type[^uniformType]. As we don't get access to the current type, we cannot summon the `Encoder` because we can't provide it with a concrete type argument. A naive call to `map` then will not work for us.

[^uniformType]: From the point of view of the function argument implementation, the choice of the "current" type parameter at the time of invocation is not within its control. So any implementation of the function argument cannot assume anything about its inputs and cannot do anything special for specific types. This is a form of "[parametricity](https://en.wikipedia.org/wiki/Parametricity)" (we're assuming no cheating with reflection and the like). A further exploration of this concept can be found in the "[It's existential on the inside](https://typelevel.org/blog/2016/01/28/existential-inside.html)" blog by Stephen Compall.

I guess we have no choice but to implement our very own custom version of `map`.

## 2.4. Tuple Recursion

To implement our own `map`-like function on tuples we are going to use the analogy between lists and tuples to inform our implementation.

Suppose we have a `List` and we want to convert each element to JSON and aggregate the results into a new `List`. Here's a simplified, and non-tail-recursive[^tailRecursion] solution for this problem:
```scala
import io.circe.*

def listToJson[A: Encoder](ls: List[A]): List[Json] =
  ls match 
    case Nil => Nil
    case h :: t => 
      val encoder = summon[Encoder[A]]
      
      val json = encoder(h) 
      
      json :: listToJson(t)
```

[^tailRecursion]: A non-tail-recursive version is much more natural in these circumstances, and thus easier to implement. Although it is not acceptable in Scala for the `List` type, it will be perfectly fine for the tuple code that we are writing. Since tuples are usually not that big.

We pattern match on the list argument and handle either the empty case, or the case where we have both a head and a tail for the list[^headTail], and then recurse.

[^headTail]: I'm using the convention where `h` stands for the head of the structure, and `t` stands for the tail of the structure. This may seem a bit unreadable at first, but will grow on you eventually.

Scala 3's tuples expose a similar structure where you can either have an `EmptyTuple` or a non-empty tuple called `*:` (by analogy with `List`'s `::`). For example the type of the following tuple:
```scala
val tuple: (Int, String, Boolean) = (3, "abc", true)
```

Can be written as[^confusing]:
```scala
val tuple: Int *: String *: Boolean *: EmptyTuple = (3, "abc", true)
```

[^confusing]: Confusing though it may be, but we now have two equivalent ways of expressing the same tuple values:  
    ```scala
    (3, "abc", true) == 3 *: "abc" *: true *: EmptyTuple
    ```
    With two equivalent type names:
    ```scala
    (Int, String, Boolean) =:= Int *: String *: Boolean *: EmptyTuple
    ```

This looks like a list, but at the type-level. We have precise type-information in a form of a list that we can recurse over and manipulate in various ways.

Following the `List` analogy, we can write the following code:
```scala
def tupleToJson(tuple: Tuple): List[Json] = // 1
  tuple match
    case EmptyTuple => Nil // 2
    case ((h: h) *: (t: t)) => // 3
      val encoder = summon[Encoder[h]] // 4

      val json = encoder(h) // 5

      json :: tupleToJson(t) // 6
```

This code is broken in many ways, but it's a good start. Let's Whac-A-Mole it step by step.

First of all the signature (1), we are accepting a generic `Tuple`. This is the super-type of all tuple types. So it includes `EmptyTuple`, `Int *: EmptyTuple`, `String *: Boolean *: EmptyTuple`, etc. Since we do not know the concrete type that will be passed by the user, we will have to pattern match on it find out, as we do next.

The first case (2) is the easy one. If we have an `EmptyTuple`, this is the base case of the recursion and we return an empty list.

The second case (3) is where we have a non-empty tuple `*:`. In which case we deconstruct it into a head `h` and a tail `t`. Notice how we ascribe the type `h` to the head and the type `t` to the tail. I'm using lowercase letters for the types to indicate that these are type variables[^patternMatching]. We don't actually know what type stands at the head of the tuple or what type the resulting tail has.

[^patternMatching]: Similar to the value-level, where lowercase identifiers are fresh variables introduced by the pattern match, and uppercase identifiers are existing values.

For a concrete example: if the input tuple is `Int *: String *: EmptyTuple`. Then on the first iteration of the recursion `h = Int` and `t = String *: EmptyTuple`. On the next step `h = String` and `t = EmptyTuple`. On the next step we'll hit the empty base case.

Now that we have a name for the type at the head of the tuple we `summon` (4) the appropriate `Encoder[h]`. We use the `Encoder` (5) to convert the value at the head of the tuple to JSON. To finish up we do a recursive call (6) with the tail of the tuple and prepend the current JSON to the result of the recursive call.

This is all good and well, but if we actually try to compile this function we get:
```scala
-- [E006] Not Found Error: -----------------------------------------------------
4 |    case ((h: h) *: (t: t)) => // 3
  |              ^
  |              Not found: type h
-- [E006] Not Found Error: -----------------------------------------------------
4 |    case ((h: h) *: (t: t)) => // 3
  |                        ^
  |                        Not found: type t
-- [E006] Not Found Error: -----------------------------------------------------
5 |      val encoder = summon[Encoder[h]] // 4
  |                                   ^
  |                                   Not found: type h
```

Apparently the compiler thinks that the types `h` and `t` should actually exist independently of our pattern match. It doesn't accept this as a declaration of a type variable.

But the idea we are pursuing is sound, we just need to use a different syntax for the compiler to understand:
```scala
 case tup: (h *: t) => ...
```

With this syntax we are declaring the types, but we are not doing any destructuring. Since we are now only declaring the types `h` and `t`, but not the **values** `h` and `t` we have to fetch them ourselves. This can be done with the `head` and `tail` methods that exist directly on tuples:
```scala
def tupleToJson(tuple: Tuple): List[Json] = // 1
  tuple match
    case EmptyTuple => Nil // 2
    case tup: (h *: t) => // 3
      val encoder = summon[Encoder[h]] // 4

      val json = encoder(tup.head) // 5

      json :: tupleToJson(tup.tail) // 6
```
 
 Let us compile again:
```scala
-- [E172] Type Error: ----------------------------------------------------------
5 |      val encoder = summon[Encoder[h]] // 4
  |                                      ^
  |No given instance of type io.circe.Encoder[h] was found for parameter x of method summon in object Predef.
```

The compiler now accepts our type variable declarations. But it is rightfully complaining that it can't do anything about them. `h` is a "fresh" type, we have no idea upfront what it's going to be, it depends on user input, which is not available at compile-time. As `summon` is trying to resolve the required given value at compile-time it is stuck without knowing where to look for it. It gets worse.

The pattern match we are performing here is going to happen at runtime. And the scrutinee of the pattern-match is a generic type. But generic types are erased at runtime, so there is no way that we could possibly gain anything useful here.

Both the fact that we can't summon anything and erasure point us to the fact that we are doing something wrong. We are running the code "at the wrong time".

## 2.5. Running Code at Compile-Time

Taking a step back we should think about how we will be using our `tupleToJson` function. The "user input" to it is not going to be some arbitrary input value from external IO. It is going to be a statically-known tuple type that we are going to provide. E.g., something like this:
```scala
val tuple: Int *: String *: Boolean *: EmptyTuple = (1, "abc", true)

val list = tupleToJson(tuple)
```

At the invocation site we know the exact types that are being evaluated. If we were to try to resolve the given `Encoder`s for the types `Int`, `String`, and `Boolean` everything would work correctly. We need a way to delay the summoning to the call site.

Luckily there is a function that does exactly this:
```scala
scala.compiletime.summonInline
```

This function is the same as `summon`, but as stated in the documentation:
> The summoning is delayed until the call has been fully inlined.

What does it mean for the call to be "fully inlined"? That's where Scala's new [`inline`](https://docs.scala-lang.org/scala3/reference/metaprogramming/inline.html) keyword comes into play. 

By marking a function as `inline` the compiler will always insert the code for the function directly at the call-site. While this sounds like a rather innocent capability, when mixed with the fact that inlining can be recursive, and that the compiler can evaluate simple control-flow expressions (like `if` and `match`) while inlining, the result is something like macro code-generation powers. This is how we make the compiler evaluate code at compile-time for us.

This may sound a bit abstract, but the magic happens by sprinkling the `inline` keyword in various locations and praying for the best. Let's try it:

```scala
import scala.compiletime.summonInline

def tupleToJson(tuple: Tuple): List[Json] = // 1
  tuple match
    case EmptyTuple => Nil // 2
    case tup: (h *: t) => // 3
      val encoder = summonInline[Encoder[h]] // 4

      val json = encoder(tup.head) // 5

      json :: tupleToJson(tup.tail) // 6
```

Here I only changed (4) to be `summonInline`. This still fails with the same:
```scala
No given instance of type io.circe.Encoder[h] was found.
```

Which is no surprise, seeing how the surrounding `tupleToJson` is not being inlined anywhere. So let's `inline` it:
```scala
import scala.compiletime.summonInline

inline def tupleToJson(tuple: Tuple): List[Json] = // 1
  tuple match
    case EmptyTuple => Nil // 2
    case tup: (h *: t) => // 3
      val encoder = summonInline[Encoder[h]] // 4

      val json = encoder(tup.head) // 5

      json :: tupleToJson(tup.tail) // 6
```

This compiles fine. Unfortunately, once we stepped into `inline`-land just compiling is no longer good enough. The code we are inlining, and especially the `summonInline` call, are only going to be fully evaluated when we compile the call-site. Like this:
```scala
val tuple = (1, "abc", true)

val list = tupleToJson(tuple)
```

Which now fails to compile on the `tupleToJson` call:
```scala
-- [E172] Type Error: ----------------------------------------------------------
3 |val list = tupleToJson(tuple)
  |           ^^^^^^^^^^^^^^^^^^
  |No given instance of type io.circe.Encoder[h] was found.
```

That's exactly the same error as before, we just delayed it to the call-site. This makes sense, because when the compiler is inlining the `tupleToJson` call it is just placing the same code in a different location. It still doesn't know anything about the specific `h` type being evaluated.

Let us sprinkle some more `inline`:
```scala
import scala.compiletime.summonInline

inline def tupleToJson(tuple: Tuple): List[Json] = // 1
  inline tuple match
    case EmptyTuple => Nil // 2
    case tup: (h *: t) => // 3
      val encoder = summonInline[Encoder[h]] // 4

      val json = encoder(tup.head) // 5

      json :: tupleToJson(tup.tail) // 6
```

We marked the pattern-match as an [`inline match`](https://docs.scala-lang.org/scala3/reference/metaprogramming/inline.html#inline-matches). This forces the compiler to try to actually evaluate the pattern-match at compile-time and to choose the correct `case` branch based on information known at compile-time during inlining. This brings in some limitations with respect to what exactly can be pattern-matched. But in our case, we have a pattern-match that the compiler can evaluate. This is so because at the inlining site the tuple type is fully known and the compiler can replace the `h` and `t` with the specific types at hand, and choose the correct `case` branch on each inlining step. Like so:
```scala
scala> val tuple = (1, "abc", true)
      
       val list = tupleToJson(tuple)

val tuple: (Int, String, Boolean) = (1,abc,true)
val list: List[Json] = List(1, "abc", true)
```

It works! We managed to iterate the tuple and inline the `summonInline` calls as we go along. The compiler generated something like the following code for us:
```scala
    val tup = 1 *: "abc" *: true *: EmptyTuple
    val encoder = summon[Encoder[Int]]
    val json = encoder(tup.head)

    json :: {
      val tup = "abc" *: true *: EmptyTuple
      val encoder = summon[Encoder[String]]
      val json = encoder(tup.head)

      json :: {
        val tup = true *: EmptyTuple
        val encoder = summon[Encoder[Boolean]]
        val json = encoder(tup.head)
        
        json :: {
          Nil
        }
      }
    }
```

This is exactly what we needed. No runtime issues, everything happens safely at compile-time.

## 2.6. Compile-Time Observations

Some interesting observations about this approach:
- By being able to generate code like this, we are gaining some macro-like capabilities. This is a double-edged sword as it suffers from some of the same drawbacks as macros. The main one being
- That we only discover errors when we compile the user code. There's no way of knowing upfront that everything is going to work as expected. And when something bad happens
- The user has to debug compilation errors in code that was never written by the said user. As the logic of code generation grows more sophisticated, the debugging process can become non-trivial.
- Preserving type information is very important. Missing type information can prevent the compiler from fully inlining. For example:
    ```scala
    scala> val tuple: Tuple = (1, "abc", true)
     
           val list = tupleToJson(tuple)
    -- Error: ----------------------------------------------------------------------
    3 |val list = tupleToJson(tuple)
      |           ^^^^^^^^^^^^^^^^^^
      |           cannot reduce inline match with
      |            scrutinee:  tuple : (tuple : Tuple)
      |            patterns :  case EmptyTuple
      |                        case tup @ _:*:[h @ _, t @ _]
      |-----------------------------------------------------------------------------
      |Inline stack trace
      |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |This location contains code that was inlined from rs$line$6:2
    2 |  inline tuple match
      |         ^
    3 |    case EmptyTuple => Nil // 2
    4 |    case tup: (h *: t) => // 3
    5 |      val encoder = summonInline[Encoder[h]] // 4
    6 |      val json = encoder(tup.head) // 5
    7 |      json :: tupleToJson(tup.tail) // 6
      -----------------------------------------------------------------------------
    1 error found
    ```
    Here we purposefully lost type information by marking the `tuple: Tuple`. The compiler gets stuck when inlining as it doesn't know the full type of the provided tuple, and then spits out a vaguely inscrutable compilation error. Eerily reminiscent of macro induced errors.

But all is well, this is perfectly serviceable for our purposes.

## 2.7. Once More with a Case Class

With the implementation of `tupleToJson` and the knowledge of `Tuple.fromProductTyped` we can take our actual case class instance and turn it into a bunch of JSON values:
```scala
scala> val fields = Tuple.fromProductTyped(user)
       val jsons = tupleToJson(fields)

val fields: (Email, Phone, Address) = 
  (Email(bilbo@baggins.com,Some(frodo@baggins.com)),
   Phone(555-555-00,88),
   Address(Shire,Hobbiton))

val jsons: List[Json] = List(
  {"primary":"bilbo@baggins.com","secondary":"frodo@baggins.com"}, 
  {"number":"555-555-00","prefix":88},
  {"country":"Shire","city":"Hobbiton"})
```

These are the JSON values we were looking for. All that is left is to merge them into a single JSON object and return that.

Here we hit a small wrinkle. The static type of our list is `List[Json]`. It is not possible to merge arbitrary JSON values into a JSON object. Only JSON objects can be merged into a single object. Although we know that the actual values are indeed JSON objects, it would be unsafe to try to "cast" the `Json` values into a `JsonObject` value.

 Indeed, if our case class happens to have a primitive field, like an `Int`, we'll end up trying to merge a JSON number into a JSON object. This will blow up at runtime.

Recall that one of our safety requirements was:
> If the top-level class has a primitive field - fail to compile

How do we prevent this failure mode?

## 2.8. JSON Objects

The solution is pretty straightforward. Circe has a type called `Encoder.AsObject` which is the same as `Encoder` but additionally provides a method called `encodeObject`, which has the static return type of `JsonObject`.

If instead of requiring an `Encoder` for every field of our class we require an `Encoder.AsObject`, then we will fail to compile if any of the fields does not correspond to a JSON object. This requires only small modifications to our previous code:
```scala
inline def tupleToJson(tuple: Tuple): List[JsonObject] = // 1
  inline tuple match
    case EmptyTuple => Nil
    case tup: (h *: t) =>
      val encoder = summonInline[Encoder.AsObject[h]] // 2

      val json = encoder.encodeObject(tup.head) // 3

      json :: tupleToJson(tup.tail)
```

Now the static return type (1) is `List[JsonObject]`. This is achieved by summoning (2) an `Encoder.AsObject` for the current field. Having done that we can invoke `encodeObject` (3) to produce a `JsonObject` instance.

This still works the same for our previous example of serializing the case class. But if we add a primitive field to our class:
```scala
case class User(id: Int, email: Email, phone: Phone, address: Address)
```

Then we fail to compile:
```scala
scala> val fields = Tuple.fromProductTyped(user)
       val jsons = tupleToJson(fields)
-- [E172] Type Error: ----------------------------------------------------------
2 |val jsons = tupleToJson(fields)
  |            ^^^^^^^^^^^^^^^^^^^
  |No given instance of type io.circe.Encoder.AsObject[Int] was found.
  |I found:
  |
  |    io.circe.Encoder.AsObject.importedAsObjectEncoder[Int](
  |      /* missing */summon[io.circe.export.Exported[io.circe.Encoder.AsObject[Int]]])
  |
  |But no implicit values were found that match type io.circe.export.Exported[io.circe.Encoder.AsObject[Int]].
```

Which correctly informs us that there is no `Encoder.AsObject[Int]` in existence[^betterError].

[^betterError]: This compilation error would be more informative if we could see what field in the class triggered the error. I'll leave this as a (difficult) exercise for the reader...

## 2.9. Once More with Feeling

And now we are ready to put all the pieces together for our flat `Encoder`:
```scala
val encoder = Encoder.instance[User]: value => // 1
  val fields = Tuple.fromProductTyped(value) // 2
  val jsons = tupleToJson(fields) // 3

  concatObjects(jsons) // 4

def concatObjects(jsons: List[JsonObject]): Json =
  Json.obj(jsons.flatMap(_.toList): _*)
```

We are creating a new `Encoder` for the `User` class (1). This is done by specifying the action for a given `User` value:
- Convert the `User` into a tuple of its fields (2)
- Use `tupleToJson` (3) to iterate over the fields and transform each field into `JsonObject`
- `concatObjects` (4) is a small utility function that safely turns a list of `JsonObject` into a single object.

We can invoke the resulting `Encoder` to produce the required flat JSON:
```scala
scala>  val json = encoder(user)
val json: Json = {
  "primary" : "bilbo@baggins.com",
  "secondary" : "frodo@baggins.com",
  "number" : "555-555-00",
  "prefix" : 88,
  "country" : "Shire",
  "city" : "Hobbiton"
}
```

Finally, we are done!

The full code for the `Encoder` can be found in the accompanying [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/flat_concrete.scala).

# 3. Deserializing a Concrete Class

Now it's time to read the flat JSON back from the flat format.

## 3.1. Pseudocode

To deserialize something in Circe, we will need a `Decoder` instance for the `User` type.

As in the last part we'll start with some pseudo-code to sketch the construction of the flat JSON `Decoder`:
1. Given the `User` type
1. For each field type in the class
1. Find the appropriate `Decoder`
1. Combine the resulting `Decoder`s into a single `Decoder`
1. Read a `User` instance with the combined `Decoder`

This pseudo-code is quite similar to the pseudo-code for the `Encoder`, but the notable difference is that instead of starting with some values (the fields of `User`) we start out with some types (the types of the fields of `User`). This makes sense, since the process of deserialization begins with JSON, and only after the `Decoder`s do their job do we get back a `User` instance.

This poses a new issue: how do we get a handle on the field types of `User`?

## 3.2. Mirrors

Here too Scala 3 has new machinery for us to use: the [`Mirror`](https://blog.philipp-martini.de/blog/magic-mirror-scala3/) type.

`Mirror`s are special values that provide us with an interface for metaprogramming over [various types](https://docs.scala-lang.org/scala3/reference/contextual/derivation.html#mirror-1), case classes in particular. Each instance of a `Mirror` is synthesized by the compiler on-the-fly for the class we are interested in[^generic]. We can summon a `Mirror` for our `User` type like so:
```scala
scala> import scala.deriving.Mirror
       
       val mirror = summon[Mirror.Of[User]]
val mirror:
  scala.deriving.Mirror.Product{
    type MirroredMonoType = User;
      type MirroredType = User;
      type MirroredLabel = "User";
      type MirroredElemTypes = (Email, Phone, Address);
      type MirroredElemLabels = ("email", "phone", "address")
  } = User
  ```

[^generic]: Similar to the functionality of the `Generic` type in the [Shapeless](https://github.com/milessabin/shapeless) library in Scala 2.

Note that the resulting `Mirror` value is a very detailed refinement of the rather boring base `Mirror` type. The interesting bit for our purposes is the `MirroredElemTypes` type member:
```scala
type MirroredElemTypes = (Email, Phone, Address)
```

This is exactly the representation of the `User` type as tuple of its field types. And so, this is the tuple type that we will iterate on. Additionally, the `Mirror` provides us with utilities to convert `User` to/from tuples, which we will use later on.

But there's a wrinkle, perviously, when we iterated over a tuple, we had a tuple **value**, something concrete that we actually operate on at runtime. Here, on the other hand, all we have is a tuple **type**? What can we possibly do with just a type?

## 3.3. Erased Values

Actually, we can do quite a bit. Recall how we used `inline` and `inline match` to achieve compile-time evaluation of code. We can apply the same tools here as well, all we need is a way to pull a type into a value. 

That's where [`scala.compiletime.erasedValue`](https://www.scala-lang.org/api/3.3.1/scala/compiletime.html#erasedValue-fffff7c4) comes into play:
> Use this method when you have a type, do not have a value for it but want to pattern match on it.

Sounds exactly like what we need.

`erasedValue` lets us take a type and turn it into a (fake) value that we can pattern match on. The caveat is that this must happen within an `inline` that gets expanded at compile-time. Here's an example usage:
```scala
import scala.compiletime.*

inline def size[T <: Tuple]: Int = // 1
  inline erasedValue[T] match // 2
    case EmptyTuple => 0 // 3
    case _: (h *: t) => 1 + size[t] // 4
```

We're defining a way to compute the size of a tuple-type. We do it as an `inline` function that accepts any `Tuple` type (1). We then pattern-match on the `erasedValue` of the tuple type (2). This lets us use the regular pattern matching syntax to branch over the two cases for tuples. First, the empty case (3) where we return the size of an empty tuple, which is 0. Next we hit the non-empty case (4), where there is a head (`h`) and a tail (`t`). The size in such case is the size of the head, 1, plus the size of the tail, which we compute using a recursive call to `size`.

We can test this out:
```scala
scala> size[(String, Int, Double)]
val res2: Int = 3
```
As expected the size of the tuple is `3`.

It is important to note that I'm using `_` instead of naming the value in the pattern match. This is a non-negotiable limitation of `erasedValue`. Since all we have is a type, there isn't any value that we can **actually** use at runtime. As a result, the pattern match that we are performing is not allowed to ever use the (fake) value we are pattern-matching on. All we can do is react to the types that we are encountering on each branch[^atRuntime].

[^atRuntime]: You can actually name the branches, instead of using `_`. But if, by mistake, you try to use the named value the compiler will complain and abort compilation.

Now we can use `inline`s and `erasedValue` to iterate over tuple types.

## 3.4. Tuple Iteration Again

With these tools in hand we can now partially implement our pseudo-code. Ignoring for the moment the `User` type, let us solve the problem of creating a flat `Decoder` for arbitrary tuples. Having solved that, we'll use the `Mirror` to create a `User` instance from a tuple.

Without further ado, here's our code:
```scala
inline def decodeTuple[T <: Tuple]: Decoder[T] =  // 1
  inline erasedValue[T] match // 2
    case EmptyTuple => Decoder.const(EmptyTuple) // 3
    case _: (h *: t) => // 4
      val decoder = summonInline[Decoder[h]] // 5

      combineDecoders(decoder, decodeTuple[t]) // 6

def combineDecoders[H, T <: Tuple](dh: Decoder[H], dt: Decoder[T]): Decoder[H *: T] = // 7
  dh.product(dt).map(_ *: _)
```

Let's follow it step by step:
- We have an `inline` function (1) that works for any sub-type of a tuple, producing a decoder for that specific tuple type.
- We proceed to pattern match on the `erasedValue` of our tuple type (2).
- In the `EmptyTuple` case (3), we create a new `Decoder` that always returns `EmptyTuple`.
- In the non-empty case (4), we have the head type `h`, and the tail type `t`.
- We `summonInline` the `Decoder` for the head type (5). Recall that `summonInline` will be deferred to the use-site of our function, and will succeed only if the actual `h` type has a given `Decoder` in scope.
- We then do a recursive call (6) and create a `Decoder` for the tail type, and use `combineDecoders` to build up a `Decoder` for the full tuple, from the `Decoder[h]` we just summoned and the `Decoder[t]` that we just created with the recursive call.
- `combineDecoders` (7) is small utility function that takes a `Decoder` for the head of tuple (`H`), and `Decoder` for the tail of a tuple (`T`), and creates a composite `Decoder[H *: T]`for the head and tail combined. This utilizes the `product` function on `Decoder` to apply both `Decoder`s on the same JSON and tuples the results. Which is what we need to read the tuple from a flat JSON. The call to `map` builds up the final tuple `H *: T` from the result of `product`.

This pretty much matches the description in our pseudo-code. Too bad it's broken:
```scala
-- [E007] Type Mismatch Error: -------------------------------------------------
3 |    case EmptyTuple => Decoder.const(EmptyTuple) // 3
  |                                     ^^^^^^^^^^
  |       Found:    EmptyTuple.type
  |       Required: T
  |
  |          where:    T is a type in method decodeTuple with bounds <: Tuple
-- [E007] Type Mismatch Error: -------------------------------------------------
7 |      combineDecoders(decoder, decodeTuple[t]) // 6
  |      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |      Found:    io.circe.Decoder[h *: t]
  |      Required: io.circe.Decoder[T]
  |
  |      where:    T is a type in method decodeTuple with bounds <: Tuple
  |                h is a type in method decodeTuple with bounds
  |                t is a type in method decodeTuple with bounds <: Tuple
```

Apparently the compiler can't figure out that if we matched the branch `EmptyTuple` then `T = EmptyTuple`, and if we matched the branch `h *: t` then `T = h *: t`.

So close...

## 3.5. Type Hackery

What we are lacking here is type-unification. The compiler should've figured out that it can unify the type of each case branch with the type argument `T`.  I would claim that it's a bug that the compiler can't do this, but I have a hack to circumvent this issue. 

Apparently the compiler is better at unifying type-arguments of real types[^realTypes]. To trigger this, we need to make our pattern match include a type-argument. We can do this artificially, like so:
```scala
trait Is[A] // 1

inline def decodeTuple[T <: Tuple]: Decoder[T] = 
  inline erasedValue[Is[T]] match // 2
    case _: Is[EmptyTuple] => Decoder.const(EmptyTuple) // 3
    case _: Is[h *: t] => // 4
      val decoder = summonInline[Decoder[h]]

      combineDecoders(decoder, decodeTuple[t])

def combineDecoders[H, T <: Tuple](dh: Decoder[H], dt: Decoder[T]): Decoder[H *: T] = // 7
  dh.product(dt).map(_ *: _)
```

[^realTypes]: Traits, classes, etc., but not type aliases.

We created a dummy wrapper with a single type-argument (1)[^doesntMatter]. Now, instead of pattern-matching directly on `T`, we pattern match on `Is[T]` (2). Each branch (3) and (4) is wrapped in `Is`, and this somehow makes the compiler understand that `T` should unify with the type of each branch.

[^doesntMatter]: The specific name of the wrapper doesn't matter. The only thing that matters is that it has a single type-parameter.

This code now compiles!

We can even check that it works by decoding a tuple from the flat JSON we created with our flat `Encoder`:
```scala
scala>  val json = encoder(user)
val json: Json = {
  "primary" : "bilbo@baggins.com",
  "secondary" : "frodo@baggins.com",
  "number" : "555-555-00",
  "prefix" : 88,
  "country" : "Shire",
  "city" : "Hobbiton"
}

scala> decodeTuple[mirror.MirroredElemTypes].decodeJson(json)
val res1:
  Decoder.Result[mirror.MirroredElemTypes] = 
    Right(
      (Email(bilbo@baggins.com,Some(frodo@baggins.com)),
      Phone(555-555-00,88),
      Address(Shire,Hobbiton)))
```

Notice how we are using `mirror.MirroredElemTypes` as the type argument. This is a path-dependent type, recall that it is just an alias to the field types of `User` (`(Email, Phone, Address)`).

We managed to decode a tuple of all the fields types of `User` directly from the flat JSON that we generated in the previous part. We're almost done, we just need to wrap this code with conversion from tuples to the `User` type.

## 3.6. From Types to Values

The last piece of the puzzle is how do we convert the result of our `Decoder`, which is a tuple value back to a `User` value. It's `Mirror` to the rescue yet again: `mirror.fromTuple` will take a tuple value that matches the `User` type, and produce back a `User` instance:
```scala
scala> val tuple = (
            Email("bilbo@baggins.com", Some("frodo@baggins.com")),
            Phone("555-555-00", 88),
            Address("Shire", "Hobbiton"))
      
       val user = mirror.fromTuple(tuple)

val user: User = User(
 Email(bilbo@baggins.com,Some(frodo@baggins.com)),
 Phone(555-555-00,88),
 Address(Shire,Hobbiton))
```

With this in hand we can finally create our final `Decoder` instance:
```scala
val mirror = summon[Mirror.Of[User]] // 1

val decoder =
  decodeTuple[mirror.MirroredElemTypes] // 2
    .map(mirror.fromTuple) // 3
```

We first summon the `Mirror` for the `User` type (1). We then create a flat `Decoder` (2) for the field types of `User` that we fetch from the mirror. And lastly, we convert that tuple result of the `Decoder` into a `User` instance (3) using the `mirror.fromTuple` function.

## 3.7. Putting It All Together

Before we test our final `Decoder`, lets combine it together with the `Encoder` into a single `Codec`:
```scala
val codec = Codec.from(decoder, encoder)
```

This is now a fully-functional `Codec` that can serialize/deserialize `User` instances into/from a flat JSON format. As we can easily demonstrate:
```scala
scala> val json = codec(user)
       val decodedUser = codec.decodeJson(json)

val json: Json = {
  "primary" : "bilbo@baggins.com",
  "secondary" : "frodo@baggins.com",
  "number" : "555-555-00",
  "prefix" : 88,
  "country" : "Shire",
  "city" : "Hobbiton"
}
val decodedUser: Decoder.Result[User] = Right(
  User(
    Email(bilbo@baggins.com,Some(frodo@baggins.com)),
    Phone(555-555-00,88),
    Address(Shire,Hobbiton)))
```

A successful roundtrip with flat JSON!

The full code for the `Decoder` and `Codec` can be found in the accompanying [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/flat_concrete.scala).

# 4. A Generic Codec

So far we focused on serializing the concrete `User` class, now it's time to take it up a notch and work with any case class.

Luckily, the code we wrote so far is actually pretty generic, we didn't bake-in many assumptions about the `User` class directly in the code.

If we take a look back at the code that we have so far:

```scala
val codec: Codec[User] = // 1
  val encoder = Encoder.instance[User]: value =>
    val fields = Tuple.fromProductTyped(value)
    val jsons = tupleToJson(fields)
    
    concatObjects(jsons)
    
  val mirror = summon[Mirror.Of[User]] // 2

  val decoder =
    decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)

  Codec.from(decoder, encoder)
```

We see that we only have two places where we directly refer to the `User` type. In the `val` declaration (1), and when summoning the `Mirror` for the `User` (2). The rest of the code is completely generic and doesn't refer to the `User` type explicitly.

All we need to do now is to pull out a type-parameter instead of `User` and pass in the appropriate `Mirror` as a `given` argument. Let's do that:
```scala
def makeCodec[A]( // 1
    using mirror: Mirror.Of[A]): Codec[A] = // 2

  val encoder = Encoder.instance[A]: value =>
    val fields = Tuple.fromProductTyped(value)
    val jsons = tupleToJson(fields)

    concatObjects(jsons)

  val decoder =
    decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)

  Codec.from(decoder, encoder)
```

We create a new function `makeCodec`. Now instead of `User` we use the a type-parameter `A` (1), and we are passing a `Mirror` as a `using` argument (2). As per usual, on our first iteration this obviously fails to compile:
```scala
-- [E007] Type Mismatch Error: -------------------------------------------------
5 |    val fields = Tuple.fromProductTyped(value)
  |                                        ^^^^^
  |      Found:    (value : A)
  |      Required: Product
```

Apparently `Tuple.fromProductTyped` which helps us convert a case class into a tuple has a type-bound, it can only be used on subtypes of `Product`. This makes sense, using `fromProductTyped` on an `enum` instance would make no sense. More generally, the code we wrote would not mean much if applied to `enum`s. This is easy enough to fix, we can just add a type-bound:
```scala
def makeCodec[A <: Product]( // 1
    using mirror: Mirror.Of[A]): Codec[A] = // 2

  val encoder = Encoder.instance[A]: value =>
    val fields = Tuple.fromProductTyped(value)
    val jsons = tupleToJson(fields)

    concatObjects(jsons)

  val decoder = 
    decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)

  Codec.from(decoder, encoder)
```

This fails yet again:
```
-- [E172] Type Error: ----------------------------------------------------------
5 |    val fields = Tuple.fromProductTyped(value)
  |                                              ^
  |No given instance of type deriving.Mirror.ProductOf[A] was found for parameter m of method fromProductTyped in object Tuple. Failed to synthesize an instance of type deriving.Mirror.ProductOf[A]: trait Product is not a generic product because it is not a case class
  |
  |where:    A is a type in method makeCodec with bounds <: Product
-- [E008] Not Found Error: -----------------------------------------------------
10 |  val decoder = decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)
   |                                                          ^^^^^^^^^^^^^^^^
   |        value fromTuple is not a member of deriving.Mirror.Of[A]
   |
   |        where:    A is a type in method makeCodec with bounds <: Product
``` 

And now we learn that there are different kinds of `Mirror`s. There's a `Mirror.ProductOf` and there is `Mirror.SumOf`. Case classes which are also known as product types are matched with a `Mirror.ProductOf`. And accordingly, all functions that go back and forth between case classes and tuples need a `Mirror.ProductOf` to work. We can now specialize our `Mirror` argument to this more specific type:
```scala
def makeCodec[A <: Product]( // 1
    using mirror: Mirror.ProductOf[A]): Codec[A] = // 2

  val encoder = Encoder.instance[A]: value =>
    val fields = Tuple.fromProductTyped(value)
    val jsons = tupleToJson(fields)

    concatObjects(jsons)

  val decoder = 
    decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)

  Codec.from(decoder, encoder)
```

And we fail yet again...
```
-- Error: ----------------------------------------------------------------------
 6 |    val jsons = tupleToJson(fields)
   |                ^^^^^^^^^^^^^^^^^^^
   |               cannot reduce inline match with
   |                scrutinee:  fields : (fields : mirror.MirroredElemTypes)
   |                patterns :  case EmptyTuple
   |                            case tup @ _:*:[h @ _, t @ _]
   |----------------------------------------------------------------------------
-- Error: ----------------------------------------------------------------------
10 |  val decoder = decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)
   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |cannot reduce inline match with
   | scrutinee:  compiletime.erasedValue[Is[mirror.MirroredElemTypes]] : Is[mirror.MirroredElemTypes]
   | patterns :  case _:Is[EmptyTuple]
   |             case _:Is[*:[h @ _, t @ _]]
   |----------------------------------------------------------------------------
```

This one is a bit more difficult to decipher[^elided]. It seems that we have issues with `inline match` in our code, a failure to reduce them. Curiously, part of the errors are references to code we didn't even touch now. 

[^elided]: I elided some of the details from the full error.

We should remember that we used `inline` when writing the various tuple conversions. In return, that very code is getting copy/pasted directly into the call-site that we are currently compiling. This wasn't an issue before when we were working ont the concrete `User` type, as the compiler could easily deduce the exact types involved: the appropriate tuple type that corresponds to the `User` type. But with an abstract type `A` the compiler is stuck, it can't know at compile-time what exact shape the tuple matching `A` is going to have. As a result it cannot pattern-match on that unknown tuple type at compile-time. This is what the error messages means when it says that it "cannot reduce inline match".

Once again, the solution is to delay type resolution until the types are fully known to the compiler. So instead evaluating code inside `makeCodec`, we will defer the evaluation of `makeCodec` itself to the call-site of `makeCodec` down the line. When somewhere we actually make the call `makeCodec[User]`, only then the compiler knows all the types involved and will be able to apply the `inline match`es that we used.

The upshot here is that we need to mark `makeCodec` as `inline` as well:
```scala
inline def makeCodec[A <: Product]( // 1
    using mirror: Mirror.ProductOf[A]): Codec[A] = // 2

  val encoder = Encoder.instance[A]: value =>
    val fields = Tuple.fromProductTyped(value)
    val jsons = tupleToJson(fields)

    concatObjects(jsons)

  val decoder = 
    decodeTuple[mirror.MirroredElemTypes].map(mirror.fromTuple)

  Codec.from(decoder, encoder)
```

This now compiles successfully.

The important lesson that we can learn here is that `inline` is somewhat viral. If you use `inline` somewhere deep in your code, you need to propagate it up the stack until the types involved are concrete enough for the compiler to be able to analyze them.

As you might recall though, once we are `inline`-land, compiling doesn't necessarily mean that everything works correctly. Since the actual code to be executed is going to be fully known only at the call-site. That is, we must check that calling `makeCodec` with a concrete type works as well. Let's use the `makeCodec` to make a JSON roundtrip like we did before:
```scala
scala> val codec = makeCodec[User]
      
       val json = codec(user)
       val decodedUser = codec.decodeJson(json)
val codec: Codec[User] = io.circe.Codec$$anon$4@da69e23
val json: Json = {
  "primary" : "bilbo@baggins.com",
  "secondary" : "frodo@baggins.com",
  "number" : "555-555-00",
  "prefix" : 88,
  "country" : "Shire",
  "city" : "Hobbiton"
}
val decodedUser: Decoder.Result[User] = Right(
  User(
    Email(bilbo@baggins.com,Some(frodo@baggins.com)),
    Phone(555-555-00,88),
    Address(Shire,Hobbiton)))
```

It works yet again!

The full code for this part can be found [here](https://github.com/ncreep/scala3-flat-json-blog/blob/master/flat_generic.scala).

We now have a generic function that creates a flat JSON format for any case class. This almost fully fulfills our original problem statement. We are only left with one last safety requirement. But before we move on to it, we'll make a slight digression.

# 5. Modularity

Long ago when we were just at the introduction I convinced you to use type-level programming over macros because macros are more one-off solutions, whereas type-level programming leads to reusable techniques.

## 5.1. What Seems to Be the Problem Officer?

Having done our fair share of type-level programming by now, is this really true here?

If we take a look at one of our more advanced functions:
```scala
inline def decodeTuple[T <: Tuple]: Decoder[T] = 
  inline erasedValue[Is[T]] match
    case _: Is[EmptyTuple] => Decoder.const(EmptyTuple)
    case _: Is[h *: t] =>
      val decoder = summonInline[Decoder[h]]

      combineDecoders(decoder, decodeTuple[t])
```

Is it really reusable and not a very custom solution to a specific problem?

My answer here would be no, it's not reusable. We are solving a very specific problem, in a very non-modular way. 

By non-modular I mean that we are mixing up two different concerns into a single function:
- Iterating over tuples
- Summoning givens for each tuple component

What if for some other problem we might want the iteration but not the summoning? What if summoning needs to happen in some other part of the code?

The way `decodeTuple` is currently written does not allow for such modifications. But we can do better.

One way to regain some modularity is to split things into functions and arguments. Instead of iterating a step then summoning one `Decoder`, we can pass in all the `Decoder`s as a tuple and iterate over that. This way we fully separate summoning from iteration.

## 5.2. Match Types

A good approach though it may be, this creates a new problem, what type will the new function have?

So far we had:
```scala
def decodeTuple[T <: Tuple]: Decoder[T]
```

Which states that for any tuple type, we can produce a `Decoder` for that type. Now we want to turn the input into a tuple of `Decoder`s. Here's a first attempt:
```scala
def decodeTuple[T <: Tuple](decoders: T): Decoder[...]
```

We are stating that we receive a tuple input with all the `Decoder`s that we will iterate on. This tuple would presumably have the shape `(Decoder[A1], Decoder[A2], ..., Decoder[AN])`. Which means that our type-signature is missing some information, as the actual input has more structure than just any random tuple[^patternMatch]. Not only that, but it also makes it difficult to relate the input type with the output type. If all we have as input is `T <: Tuple`, what kind of `Decoder` should the result be[^alternativeSolution]? We have no access to that hypothetical `(A1, A2, ..., AN)` tuple. Hence the missing type-parameter in the return type.

[^patternMatch]: This can be fine, as we can pattern match on the tuple to verify the shape with an `inline match` at compile-time. But this leads as into the land of being "dynamically-typed at compile-time". Indeed, a very strange place to be.

[^alternativeSolution]: This problem actually has a solution. Below we are going to use a match type for the input and a "simple type" for the output. We could flip this around and use a "simple type" for the input and a match type for the output. But this would still leave us with the issue that the input type is missing some information and lead us to the "dynamically typed" approach.

By now we should already be used to the idea that Scala 3 has a solution to any problem I throw at it in this post[^coincidence]. In this case we can express the input type more precisely with a builtin type called `Tuple.Map`.

[^coincidence]: Coincidence? I think not...

We need a type that would allows us to relate a tuple `(A1, A2, ..., AN)` to the other tuple type `(Decoder[A1], Decoder[A2], ..., Decoder[AN])`. If we recall the analogy between tuples and lists, this is just as if we mapped the "function" `Decoder` over the "list" `(A1, A2, ..., AN)`. The desired type then is:
```scala
Tuple.Map[(A1, A2, ..., AN), Decoder]
```

`Tuple.Map` is a special kind of type called a "[match type](https://docs.scala-lang.org/scala3/reference/new-types/match-types.html)". It allows us to specify non-trivial relationships between types by writing them down as pattern and recursive calls. `Tuple.Map` is defined roughly as follows:
```scala
type Map[T <: Tuple, F[_]] <: Tuple = // 1
  T match // 2
    case EmptyTuple => EmptyTuple // 3
    case h *: t => F[h] *: Map[t, F] // 4
```

We can read this as follows:
- Given some tuple type `T` and a type-constructor `F` (1).
- Match on the type `T` (2).
- If it is the empty-tuple, the resulting type is the empty tuple as well.
- If it is made out of a head `h` and a tail `t` then the result is a new tuple made out of `F[h]` and a recursive call on `Map` with the the tail of the tuple (4).

When we make a "call" to `Map` with a concrete tuple and type constructor, the compiler will perform this logic at compile-time and compute a new resulting type[^dayOfYore]. This is very similar to how you would implement `List.map` with naive recursion. But it may be easier to follow with a concrete example. 

[^dayOfYore]: In the days of yore computations of this kind would be accomplished with an unholy mix of recursive implicits and type-members. See, e.g., all of [Shapeless](https://github.com/milessabin/shapeless). 

Suppose that `T = (String, Int, Double)` and `F = Decoder`. What is then the type `Map[(String, Int, Double), Decoder]`? Recall that with the new tuple syntax we can write our type as `Map[String *: Int *: Double *: EmptyTuple, Decoder]`. Now we can reduce this step by step:
```scala
Map[String *: Int *: Double *: EmptyTuple, Decoder] =
// T is not empty, `h = String` and `t = Int *: Double *: EmptyTuple`
F[String] *: Map[Int *: Double *: EmptyTuple, Decoder] = 
// T is not empty, `h = Int` and `t = Double *: EmptyTuple`
F[String] *: F[Int] *: Map[Double *: EmptyTuple, Decoder] = 
// T is not empty, `h = Double` and `t = EmptyTuple`
F[String] *: F[Int] *: F[Double] *: Map[EmptyTuple, Decoder] =
// T is empty
F[String] *: F[Int] *: F[Double] *: EmptyTuple =
// With the regular syntax
(F[String], F[Int], F[Double])
```

Foof, that was exhausting, luckily the compiler is going to do it for us from now on. The `Map` match type neatly solves our problem, as it both precisely specifies the shape of our expected inputs and lets us easily define the output. Like so:
```scala
def decodeTuple[T <: Tuple](decoders: Map[T, Decoder]): Decoder[T]
```

This can be read as: given a tuple made up of some `Decoder`s, such that the inner types form the tuple `T`, produce a single `Decoder` for `T`.

## 5.3. Tuple Iteration My Old Friend...

Now that we have a type-signature, we can implement it by `inline match`ing on it. The implementation is similar to the previous version of `decodeTuple` except that now we no longer need to `summon` anything, we just iterate and take the current element of the tuple:
```scala
import Tuple.*

inline def decodeTuple[T <: Tuple](decoders: Map[T, Decoder]): Decoder[T] = // 1
  inline decoders match // 2
    case EmptyTuple => Decoder.const(EmptyTuple) // 3
    case ds: (Decoder[h] *: Map[t, Decoder]) => // 4
      combineDecoders(ds.head, decodeTuple(ds.tail)) // 5
```

This should feel familiar by now:
- Given a tuple of `Decoder`s (1).
- Inline match on the `Decoder`s (2).
- If the tuple is empty produce a constant `Decoder` with the empty tuple (3).
- If it is not empty and has a head `Decoder[h]` and a tail `Map[t, Decoder]`, where `h` and `t` are the head and tail of the `T` tuple (4).
- Combine the `Decoder[h]` with the result of calling `decodeTuple` on the remaining `t` `Decoder`s (5).

This of course doesn't compile:
```scala
-- [E007] Type Mismatch Error: -------------------------------------------------
3 |    case EmptyTuple => Decoder.const(EmptyTuple) // 3
  |                                     ^^^^^^^^^^
  |       Found:    EmptyTuple.type
  |       Required: T
  |
-- [E007] Type Mismatch Error: -------------------------------------------------
5 |      combineDecoders(ds.head, decodeTuple(ds.tail)) // 5
  |      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |      Found:    io.circe.Decoder[h *: t]
  |      Required: io.circe.Decoder[T]
```

This is the same kind of failure to unify types as we had before. In the first branch of the pattern-match the compiler should be able to see that `T = EmptyTuple` and that on the second it's `T = h *: t`, but it fails to do so.

Unfortunately we will have to resort to type-hackery yet again. To this end we will create a small wrapper that will help us nudge the compiler towards unification:
```scala
import Tuple.*

case class IsDecoderMap[T <: Tuple](value: Map[T, Decoder])
```

This just wraps a `Map` value and exposes the `T` type-parameter to the outside. The idea is that once the type-parameter appears in a class, the compiler will be able to unify it. To use it, we wrap our `Decoder`s tuple in `IsDecoderMap` and match on that instead:
```scala
inline def decodeTuple[T <: Tuple](decoders: Map[T, Decoder]): Decoder[T] =
  inline IsDecoderMap(decoders) match // 1
    case _: IsDecoderMap[EmptyTuple] => Decoder.const(EmptyTuple) // 2
    case ds: IsDecoderMap[h *: t] => // 3
      combineDecoders(ds.value.head, decodeTuple(ds.value.tail))
```

In (1) we wrap our tuple and match on it. In (2) we match the `EmptyTuple` case, which forces the compiler to acknowledge that `T = EmptyTuple`. And in (3) we match on the non-empty case forcing the compiler to deduce that `T = h *: t`.

Surprisingly, this compiles!

We can even try it out:
```scala
scala> val decoders = (Decoder[Email], Decoder[Phone], Decoder[Address]) 
       val decoder = decodeTuple[(Email, Phone, Address)](decoders)
      
       decoder.decodeJson(json)
val res10:
  Decoder.Result[(Email, Phone, Address)] = Right((
    Email(bilbo@baggins.com,Some(frodo@baggins.com)),
    Phone(555-555-00,88),
    Address(Shire,Hobbiton)))
```

We construct our own tuple of `Decoder`s and pass it on to `decodeTuple`. Unfortunately Scala's type-inference is not smart enough to infer the correct `Map` type on its own, so we have to provide the type-argument to `decodeTuple` explicitly. But other than that, it works like a charm.

Now that we successfully separated summoning from iteration, how do we actually summon the `Decoder`s we need?

## 5.4. I Summon Thee

Recall that when creating the flat `Decoder` for our case class we have an access to the class's `Mirror`, and that the field types of the class are given by `MirroredElemTypes`. What we need now is to somehow summon a tuple of `Decoder`s, where we have one `Decoder` for each element in `MirroredElemTypes`.

What type will that tuple have? This is exactly what `Map` is for. The type we are after is:
```scala
Map[mirror.MirroredElemTypes, Decoder]
```

Now we could iterate over this type and `summonInline` each `Decoder` one by one[^summonExercise], but we don't have 
to. The standard library already provides us with a solution:
```scala
scala.compiletime.summonAll
```

Which is described as:
> Given a tuple `T`, summons each of its member types and returns them in a `Tuple`.

[^summonExercise]: Feel free to solve this as an exercise. This is yet another instance of tuple iteration.

So we can simply do this:
```scala
val decoders = summonAll[Map[mirror.MirroredElemTypes, Decoder]]
```

This gives us both ingredients for the creation of a flat `Decoder` just like we did before:
```scala
inline def makeDecoder[A <: Product](
    using mirror: Mirror.ProductOf[A]): Decoder[A] =

  val decoders = summonAll[Map[mirror.MirroredElemTypes, Decoder]] // 1
  
  decodeTuple(decoders).map(mirror.fromTuple) // 2
```

We first `summon` all the `Decoder`s for the class's fields (1), then we combine them into a single flat `Decoder` (2).

## 5.5. Are We Reusable Yet?

This is much more modular than what we had before. `Tuple.Map` and `summonAll` are useful tools that we can use in many other contexts. But the function `decodeTuple` is not as reusable as it can be though.

We won't be further improving the `decodeTuple` function, but I will leave you with a few of exercises in that direction.
1. The `encodeTuple` function suffers from the same lack of modularity as the old `decodeTuple`. We can reimplement in a similar way. Try implementing the following signature[^implementedInTheRepo]:
    ```scala
    inline def encodeTuple[T <: Tuple](encoders: Map[T, Encoder.AsObject]): Encoder.AsObject[T]
    ```
    You will need a couple of helper definitions:
    ```scala
    val emptyEncoder: Encoder.AsObject[EmptyTuple]
    def combineObjectEncoders[H, T <: Tuple](eh: Encoder.AsObject[H], et: Encoder.AsObject[T]): Encoder.AsObject[H *: T]
    ```
1. `decodeTuple` is very similar in structure to the famous `sequence` function from functional programming[^listAnalogy]. Generalize `decodeTuple` and implement the following signature[^cats]:
    ```scala
    def sequenceTuple[T <: Tuple, F[_]: cats.Applicative](fs: Map[T, F]): F[T]
    ```
1. Reimplement `decodeTuple` in terms of `sequenceTuple`. Can you think of other usages for `sequenceTuple`?
1. The new implementation of `encodeTuple` is very similar to `decodeTuple`. Unfortunately `sequenceTuple` won't work for it[^contravariant]. We can generalize `sequenceTuple` even further. Try implementing the following signature:
    ```scala
    def sequenceInvariantTuple[T <: Tuple, F[_]: cats.InvariantMonoidal](fs: Map[T, F]): F[T]
    ```
2. Reimplement `encodeTuple` in terms of `sequenceInvariantTuple`.
3. Reimplement `sequenceTuple` in terms of `sequenceInvariantTuple`.

[^implementedInTheRepo]: You can find the solution to this exercise in the [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/flat_modular.scala).

[^listAnalogy]: Keeping in mind the `List` analogy that we have with tuples.

[^cats]: You don't have to use the Cats library here, any definition of `Applicative` will do. But since Circe is already bringing in Cats as a dependency, we just use that.

[^contravariant]: Because `Encoder.AsObject` is a contravariant functor and cannot have an `Applicative` instance.

If you solved the exercises, congratulations! You now have some very reusable functions on your hands.

The full code for this part can be found in the [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/flat_modular.scala).

# 6. Safety First

Returning from our reusability distraction we are back to the flat JSON problem. We now have one last safety requirement to solve:
>  If the inlined classes have duplicate field names - fail to compile

Why is this a safety issue? Imagine that you have the following alternative model:
```scala
case class User2(email: Email2, phone: Phone2, address: Address2)

case class Email2(primary: String, secondary: Option[String], 
                  lastUpdate: Long, verified: Boolean)

case class Phone2(number: String, prefix: Int, verified: Boolean)

case class Address2(country: String, city: String, lastUpdate: Date)

case class Date(value: Long)

object Email2:
  given Codec.AsObject[Email2] = semiauto.deriveCodec[Email2]

object Phone2:
  given Codec.AsObject[Phone2] = semiauto.deriveCodec[Phone2]

object Address2:
  given Codec.AsObject[Address2] = semiauto.deriveCodec[Address2]

object Date:
  given Codec.AsObject[Date] = semiauto.deriveCodec[Date]
```

What will happen if we create a flat JSON format for `User2`? Here's what:
```scala
scala> val user2 = User2(
         Email2(primary = "bilbo@baggins.com", secondary = Some("frodo@baggins.com"), 
                lastUpdate = 21, verified = true),
         Phone2(number = "555-555-00", prefix = 88, verified = false),
         Address2(country = "Shire", city = "Hobbiton", lastUpdate = Date(55)))
       val codec = makeCodec[User2]
       val json2 = codec(user2)
val json2: Json = {
  "primary" : "bilbo@baggins.com",
  "secondary" : "frodo@baggins.com",
  "lastUpdate" : {
    "value" : 55
  },
  "verified" : false,
  "number" : "555-555-00",
  "prefix" : 88,
  "country" : "Shire",
  "city" : "Hobbiton"
}
```

Note how we have two different `lastUpdate` fields and two different values (`21` and `55`), but the final JSON has only a single value (`55`). The same goes for the duplicated `verified` field. So we silently lost information.

What's worse is if we try to read this JSON back we get:
```scala
scala> codec.decodeJson(json2)
val res14: Decoder.Result[User2] = Left(DecodingFailure at .lastUpdate: Long)
```

The read fails, because we try to read the first `lastUpdate` field from the `Email2` class, which should be a `Long`. But the value that was actually written comes from `Address2` and has the incompatible type `Date`. As ar result we get a runtime failure that no one warned us about. The `verified` field will be read successfully, but it will contain the wrong information in one of the locations.

Not safe, not safe at all...

Let us implement the last safety requirement, that will prevent these errors at compile-time.

## 6.1. So Many Mirrors

Content warning: this is by far the most incomprehensible part of this post as well as the most speculative. I hope we make it out okay...

Before we can check for duplicate fields we need to somehow get a list of all the fields we are going to write. The `Mirror`s for our types can provide us with this. Let us summon all the relevant `Mirror`s:
```scala
scala> val emailMirror = summon[Mirror.Of[Email]]
       val phoneMirror = summon[Mirror.Of[Phone]]
       val addressMirror = summon[Mirror.Of[Address]]
val emailMirror:
  Mirror.Product{
    type MirroredMonoType = Email;
    type MirroredType = Email; 
    type MirroredLabel = "Email";
    type MirroredElemTypes = (String, Option[String]);
    type MirroredElemLabels = ("primary", "secondary")
  } = Email$@17504660
val phoneMirror:
  Mirror.Product{
    type MirroredMonoType = Phone;
    type MirroredType = Phone;
    type MirroredLabel = "Phone";
    type MirroredElemTypes = (String, Int);
    type MirroredElemLabels = ("number", "prefix")
  } = Phone$@699053cb
val addressMirror:
  Mirror.Product{
    type MirroredMonoType = Address;
    type MirroredType = Address; 
    type MirroredLabel = "Address";
    type MirroredElemTypes = (String, String);
    type MirroredElemLabels = ("country", "city")
  } = Address$@263df135
```

The inner type `MirroredElemLabels` contains the field names as a **type**. These are string literal types. The same goes for the name of the type, contained in the `MirroredLabel` type.

It is important to notice here that we are dealing with types that are refined for each particular case. That is, the `MirroredElemLabels` type is abstract in `Mirror` and only becomes fully defined once we summon the specific given instance for the class. It now becomes paramount that we never lose any type information while performing the different compile-time manipulations. This will be the main source of complications in the code that follows.

For an informative error message we will need access to both the field names and the type name, this way we could help the user find both the name and the source of the duplicate fields. Recall that having informative error messages was one of our original requirements. To this end we will need to aggregate both the `MirroredLabel` and `MirroredElemLabels`. Let's define a helper wrapper:
```scala
trait Labelling[Label <: String, ElemLabels <: Tuple]
```

The idea is that we will extract the `MirroredLabel`[^typeBound] and `MirroredElemLabels` from each `Mirror` instance and place them as type arguments to `Labelling`[^designChoice].  Our aim is to build up the following tuple type[^notValue]:
```scala
Labelling[emailMirror.MirroredLabel, emailMirror.MirroredElemLabels] *:
  Labelling[phoneMirror.MirroredLabel, phoneMirror.MirroredElemLabels] *:
  Labelling[addressMirror.MirroredLabel, addressMirror.MirroredElemLabels] *:
  EmptyTuple
``` 

[^typeBound]: The type bound `<: String` means that we are aiming at storing string literal types here.

[^designChoice]: There's a design choice to be made here, as we could define `Label` and `ElemLabels` as type members rather than type arguments. In some sense both choices are equivalent, and the difference is mainly in ergonomics.

[^notValue]: Notice that we are only building up a type and not a corresponding value. Although a value might be useful in some contexts, and we could create an equivalent value if we needed to, it won't be necessary for our use case.

Which after de-aliasing is equivalent to:
```scala
Labelling["Email", ("primary", "secondary")] *:
Labelling["Phone", ("number", "prefix")] *:
Labelling["Address", ("country", "city")] *:
EmptyTuple
```

Once we manage to compute this type, we'll be able to process it, check for duplicate field names, and issue the appropriate error if need be.

This leaves us with a bit of a problem.

## 6.2. From Values to Types

`Mirror`s are **values** but the result we require is a **type**. So far we only computed **values** from **types** (using `inline`). How do we move from the other way around?

Inspired by the approach in [this](https://github.com/lampepfl/dotty/pull/4768/files#diff-c8a7eb6800a0b83897e79c60b4d1364aa27fc962774f9e68d7879d75d3e59690R221) outdated design document, we will define the following helper:
```scala
class Typed[A]:
  type Value = A
```

Instances of `Typed` will be **values** that capture some **type** as their type argument. For example the previous example can be "computed" into a `Typed` value as follows:
```scala
val typedResult = Typed[
  Labelling[emailMirror.MirroredLabel, emailMirror.MirroredElemLabels] *:
  Labelling[phoneMirror.MirroredLabel, phoneMirror.MirroredElemLabels] *:
  Labelling[addressMirror.MirroredLabel, addressMirror.MirroredElemLabels] *:
  EmptyTuple]
```

`typedResult` is a **value** that can be computed from other values and returned from functions. Along the way it captures a type argument that contains the `Labelling` information that we need. Once computed, we'll be able to use the type member `Value` to extract this type and use it for further error validation. The challenge now is how do we compute the appropriate `Typed` value without losing type information.

We can sketch our solution in pseudocode:
- Given a tuple of types.
- For each type in the tuple, summon the `Mirror` **value** for the type.
- Convert the `Mirror` instance into a `Labelling` **type** wrapped in a `Typed` **value**.
- Combine the `Typed` **values** by merging their **type**-parameters into a single tuple.

See how we have to jump back and forth between values and types? This is part of our challenge.

You might also ask about modularity, once again we are mixing iteration with summoning. In this case we have no choice, as far as I know there is no way to use `summonAll` (or some custom summoning function) here without losing the precise type-information that exists in each `Mirror` instance[^cantDo]. Remember that retaining type-precision is key.

[^cantDo]: A more concrete example would be something like `summonAll[Map[T, Mirror.Of]]`, the resulting statically known type will not contain anything beyond `Mirror.Of[X]`, no field names, or anything specific. Let me know if you know otherwise.

Now that we know what we are trying to do, let's make the first step by defining a type signature:
```scala
inline def makeLabellings[T <: Tuple]: Typed[_ <: Tuple]
```

This says that given some types in form of a `Tuple`, compute a `Typed` value that contains some `Tuple` in it as a type argument. This is a very vague type-signature, can we be any more precise about the return type?

We could make a small advancement by coming up with something similar to `Tuple.Map` that would state that all tuple elements are of type `Labelling[_, _]`. But that won't significantly improve things, and will just add complexity to the definitions we use. The real info resides in those string literal types that are computed on the fly for each class, this info can only be found in the `given` values we are conjuring. Since the relevant types reside inside values, there is no way (known to me[^letMeKnow]) to define a type that captures the relation between the type `T` and the output `Labelled` types.

[^letMeKnow]: Let me know if you know otherwise.

We'll roll with this signature and try an initial implementation:
```scala
inline def makeLabellings[T <: Tuple]: Typed[_ <: Tuple] =
  inline erasedValue[T] match // 1
    case EmptyTuple => Typed[EmptyTuple] // 2
    case _: (h *: t) => // 3
      val headMirror = summonInline[Mirror.ProductOf[h]] // 4
      type headLabelling = // 5
        Labelling[headMirror.MirroredLabel, headMirror.MirroredElemLabels]

      val tailLabellings = makeLabellings[t] // 6

      Typed[headLabelling *: tailLabellings.Value] // 7
```

Breaking this down:
- We match on the `T` type (1), since we only have a type and not a value, we use `erasedValue` again.
- In the empty case (2) we produce a `Typed` **value** wrapping the `EmptyTuple` **type**.
- In the non-empty case (3), we summon the `Mirror` for the head of the tuple `h` (4).
- We then create a new **type** (5) with the `Labelling` from the head `Mirror` **value**, extracting the `MirroredLabel` and `MirroredElemLabels` from it.
- Recursively compute the labellings for the tail `t` of the tuple (6).
- Now we create a new `Typed` **value** (7) joining the head `Labelling` **type** with the tail's `Labelling`s **type**.

Quite surprisingly for us, this compiles on the first go. Now we can try it out:
```scala
scala> makeLabellings[(Email, Phone, Address)]
val res24: Typed[? <: Tuple] = Typed@111494bc
```

This compiles too, strange and suspicious... Of course, if we take a closer look at the result we can see that the resulting type is quite useless. All we get back in return is `Typed[? <: Tuple]`, which means that we have no details on the `Mirror`s we captured. Hmm...

Thinking about it, this is not a surprising outcome. The static return type of `makeLabellings` is `Typed[_ <: Tuple]`, that means that on every recursive step we lose the precise type information we gleaned, and return back an anonymous `Tuple` value. We're stuck, we cannot assign a precise enough static type to `makeLabellings`, but without precise types we cannot implement our safety requirement.

In an unsurprising turn of events, Scala 3 has a solution for this as well: [`transparent inline`s](https://docs.scala-lang.org/scala3/reference/metaprogramming/inline.html#transparent-inline-methods-1). From the documentation:
> Inline methods can additionally be declared `transparent`. This means that the return type of the inline method can be specialized to a more precise type upon expansion.

Let's see a simple example of what `transparent` does:
```scala
scala> transparent inline def stuff: Tuple = (1, "b", true)
       val tuple = stuff
def stuff: Tuple
val tuple: (Int, String, Boolean) = (1,b,true)
```

Notice that despite the static type of `stuff` being declared as `Tuple`, when we actually call `stuff` and assign it to a value `tuple`, the compiler shows us a more precise type than the one we declared: `(Int, String, Boolean)`. When the compiler inlines the code, it sees the more precise type than the declared one, and assigns this specialized type to the resulting value. As long as the type is visible during inlining (at compile-time), the compiler will preserve it.

Now we can mark `makeLabellings` as `transparent`, and so preserve the precise static type we get on every recursive call:
```scala
transparent inline def makeLabellings[T <: Tuple]: Typed[_ <: Tuple] =
  inline erasedValue[T] match
    case EmptyTuple => Typed[EmptyTuple]
    case _: (h *: t) =>
      val headMirror = summonInline[Mirror.ProductOf[h]]
      type headLabelling =
        Labelling[headMirror.MirroredLabel, headMirror.MirroredElemLabels]

      val tailLabellings = makeLabellings[t]

      Typed[headLabelling *: tailLabellings.Value]
```

This still compiles, let's try it out:
```scala
scala> makeLabellings[(Email, Phone, Address)]
val res25:
  Typed[? >: Nothing *: Nothing <: Labelling[? <: String, ? <: Tuple] *: Tuple] = Typed@265627ac
```

This... is strange... We definitely got a more precise type than what we had before. Ignoring the noise, we have:
```scala
Labeling[_, _] *: Tuple
```

Definitely better than just `Tuple`, `transparent` seems to be somewhat working, but still not too useful for our purposes.

To be honest, I have no idea why our code didn't work as expected. It's time for more hackery then.

Trying to "debug" what happened here, it seems that we didn't manage to preserve the precise type of the `Labelling`s we got from the tail, hence the `Tuple` part of the return type. Nor are we preserving the type of the `Labelling`s of the head, that's the `Labelling[_, _]` we got.

The general intuition that I have from this is that we need to force the compiler to somehow be more precise. What follows is the code I ended up with after a lot of trial and error. I don't have any good way to explain why this code works, as I suspect that a lot of it is just workarounds around issues in the typer code for `transparent inline`s[^transparentIssues]. 

[^transparentIssues]: Here are a two issues I opened while playing around with this code: [18010](https://github.com/lampepfl/dotty/issues/18010) and [18011](https://github.com/lampepfl/dotty/issues/18011).

```scala
transparent inline def makeLabellings[T <: Tuple]: Typed[_ <: Tuple] =
  inline erasedValue[T] match
    case EmptyTuple => Typed[EmptyTuple]
    case _: (h *: t) =>
      inline makeLabellings[t] match // 1
        case tailLabellings => 
          inline summonInline[Mirror.Of[h]] match // 2
            case headMirror =>
              type HeadLabelling = Labelling[headMirror.MirroredLabel, headMirror.MirroredElemLabels]

              Typed[Prepend[HeadLabelling, tailLabellings.Value]] // 3

type Prepend[X, +Y <: Tuple] <: Tuple = X match
  case X => X *: Y
```

A brief explanation of this rewrite:
- At (1) instead of assigning to `makeLabellings` on the tail directly to a `val` we `inline match` on it, this seems to force the compiler to keep the precise type of the expression[^noop], while assigning to a `val` loses type information.
- At (2) we do the same thing for the `Mirror` that we summon for the head.
- For no obvious reason the order of these matches matters, if we swap them type precision is lost again.
- At (3) we build up the final result but instead of using `*:` to build the tuple we use `Prepend` which is basically an alias for `*:` defined as (a trivial) match type. For some reason using `*:` loses type precision[^differentIssue].

[^noop]: One would imagine this transformation to be a noop that does nothing to the typing process, and yet...

[^differentIssue]: This is a somewhat different manifestation of [18011](https://github.com/lampepfl/dotty/issues/18011), where instead of failing to compile we just lose the precise types.

The whole thing is very fragile[^complexity], seemingly benign code modifications break it in different and surprising ways[^tests]. For these kinds of computations (i.e., computing types from values) the Scala 2 style "Prolog with implicits" is actually more robust, and works without any surprises[^implicitLabelling]. This area of novelties in Scala 3 is far from being mature. Let's hope that it improves over time.

[^complexity]: [According](https://github.com/lampepfl/dotty/issues/18011#issuecomment-1605394436) to Martin Odersky, the relevant area of the compiler has "crazily complicated algorithms"...

[^tests]: When writing such code it's very important to have some tests to make sure that it actually does what you think it does. It will be very unpleasant if after some benign refactor code silently stops working.

[^implicitLabelling]: If you're curious what that would look like, I've implemented the same logic using implicits in the [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/labelling_implicit.scala).

Be that as it may, it works!
```scala
scala> makeLabellings[(Email, Phone, Address)]
val res0:
  Typed[
   (Labelling["Email", ("primary", "secondary")],
    Labelling["Phone", ("number", "prefix")],
    Labelling["Address", ("country", "city")])] = Typed@40edc64e
```

Look at this beautiful, precise type! It contains all the type information we need, both to check for duplicate fields, and to issue an informative error.

We can get this information directly from the mirror that we were using:
```scala
scala> val mirror = summon[Mirror.Of[User]]
       makeLabellings[mirror.MirroredElemTypes]
val res5:
  Typed[(
    Labelling["Email2", ("primary", "secondary")],
    Labelling["Phone2", ("number", "prefix")],
    Labelling["Address2", ("country", "city")])] = Typed@47927528
```

The full code for this part can be found in the [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/labelling.scala).

Now we're ready for the real fun.

## 6.3. Type-Level Programming for Real

Up until now all our type-level manipulations involved a certain value-level component. There was always some `inline def` lurking around. Now that we have our labelling as a pure type, we are going to do some hardcore type-level manipulation over it. Using pure types and nothing else. This is Scala 3's type-level support at its shining best.

The agenda is as follows:
- Given a full list of `Labelling`s for our target type (e.g., the fields of `User`).
- Compute a list of field names that overlap.
- If the list is non-empty, issue a compilation error.

This problem is in a sense easier than the problem of extracting type information from `Mirror`s. We are computing one type from another. So we don't need the `Typed` trick from before, we can work directly with the types. And the key ingredient for such manipulations are going to be the match types that we've met before[^alternative].

[^alternative]: It is actually possible to convert the `Labelling` tuple types into values, but since we want compile-time errors derived from this process, we will be very limited in what can do with these values in a way that the compiler can report about. So sticking with type-level computation is actually more straightforward here. For an alternative approach see, e.g., the [`constValue` family of functions](https://docs.scala-lang.org/scala3/reference/metaprogramming/compiletime-ops.html#constvalue-and-constvalueopt-1).

Due to the pattern-matching abilities and the recursive reductions that match types can perform, they basically form a language for working with types. A very primitive language, with poor compilation errors, almost no IDE support, with `Tuple`s instead of lists, and very little structure beyond that. Kinda like Scala in the early days... Nonetheless, this language is quite expressive, as we shall see.

The specific algorithm that I'm going to use to compute the duplicates list is not that interesting. What is important is that it's expressible with pure types.

The algorithm goes like this:
- Given a lists of labellings, for every labelling:
- Pair the label with its source (the class it came from), to obtain a list of pairs.
- Group the sources by their labels.
- Filter all the labels that have more than one source.
- The remaining labels are duplicates.

The code we'll be writing has a straightforward value-level equivalent, which you can find [here](https://github.com/ncreep/scala3-flat-json-blog/blob/master/value_level_find_duplicates.scala)[^notTheBest]. Feel free to take a look if you want a more precise idea of the algorithm we ae implementing.

[^notTheBest]: This is of course not the way you would solve this problem with regular Scala. The code is written in a style that conforms to the limitations of the type-level implementation.

## 6.4. Finding Duplicates

First we'll need a way to pair each field label with its source (the class it came from). Whenever you need some non-trivial type transformation, you can define or use a match type:
```scala
type ZipWithSource[L] <: Tuple = L match // 1
  case Labelling[label, elemLabels] => // 2
    ZipWithConst[elemLabels, label] // 3
  
type ZipWithConst[T <: Tuple, A] = 
  T Map ([t] =>> (t, A)) // 4
```

Here we:
- Define `ZipWithSource` (1) which takes an argument `Labelling`. The type bound indicates that the result is going to be some `Tuple`.
- Match on the `Labelling` (2) so that we deconstruct it into the class label (`label`) and the field labels (`elemLabels`).
- Invoke the `ZipWithConst` type "function" (3) on the labels.
- `ZipWithConst` is just an alias (4) to an invocation of `Map` that we've seen before, which is the `Tuple` equivalent of `List.map`. Notice that we're using an infix application of `Map`, which gives it a nice "collections" vibe.
- `ZipWithConst` takes a tuple and a fixed type `A` as an argument.
- The "function" that we apply to each element of the tuple is a [type-lambda](https://docs.scala-lang.org/scala3/reference/new-types/type-lambdas.html), denoted by `=>>`. Type-lambdas are the equivalent of anonymous functions at the type-level. In this case it takes each element in the original tuple and pairs it with `A`.

Let's "run" `ZipWithSource`:
```scala
scala> type L = Labelling["Email2", ("primary", "secondary", "lastUpdate", "verified")]
       type Res = ZipWithSource[L]
// defined alias type Res
   = (("primary", "Email2"), 
      ("secondary", "Email2"), 
      ("lastUpdate", "Email2"), 
      ("verified", "Email2"))
```
We are applying `ZipWithSource` to a specific `Labelling` and we get back `Tuple` of pairs, where each element is a field name and its class source.

Now we can take a tuple of `Labelling`s and apply `ZipWithSource` to all of them:
```scala
type ZipAllWithSource[Labellings <: Tuple] = Labellings FlatMap ZipWithSource
```

This takes a tuple of `Labelling`s and applies `ZipWithSource` to each one of them, then flattens the result. `FlatMap`, which is used in infix form here, is the tuple equivalent of `List.flatMap` and does exactly what you imagine it to do:
```scala

scala> type Labellings = (
           Labelling["Email2", ("primary", "secondary", "lastUpdate", "verified")],
           Labelling["Phone2", ("number", "prefix", "verified")],
           Labelling["Address2", ("country", "city", "lastUpdate")])
      
       type Res = ZipAllWithSource[Labellings]
// defined alias type Res
   = (("primary", "Email2"), ("secondary", "Email2"), ("lastUpdate", "Email2"),
      ("verified", "Email2"), ("number", "Phone2"), ("prefix", "Phone2"),
      ("verified", "Phone2"), ("country", "Address2"), ("city", "Address2"), 
      ("lastUpdate", "Address2"))
```

That's quite nice, it feels like we're programming in a real language, no more weird implicit resolution tricks like in the days of Scala 2.

Now we have a long tuple with pairs. Each pair is a field name along with the class it came from. Notice that these are all **types**. Despite appearances, there are no values here, just string type-literals.

Before we can proceed we will need some utility functions:
```scala
import scala.compiletime.ops.boolean.* // 1
import scala.compiletime.ops.any.*

type FindLabel[Label, T <: Tuple] = // 2
  T Filter ([ls] =>> HasLabel[Label, ls]) Map Second // 3

type RemoveLabel[Label, T <: Tuple] = // 4
  T Filter ([ls] =>> ![HasLabel[Label, ls]]) // 5

type HasLabel[Label, LS] <: Boolean = LS match // 6
  case (l, s) => Label == l // 7

type Second[T] = T match // 8
  case (a, b) => b
```

- First some important imports (1), the [`scala.compiletime`](https://docs.scala-lang.org/scala3/reference/metaprogramming/compiletime-ops.html#the-scalacompiletime-package-1) package has some very useful utilities that let us manipulate types as if they are regular values. In this case we import operations on booleans and on `any`, which we need for equality checks.
- The `FindLabel` type "function" (2) takes a label and a tuple.
- It then uses the `Filter` "function" (3), the equivalent of `List.filter`, to keep only those elements that have the input `Label`. This again uses type-lambdas as the equivalent of anonymous functions. Since the result is a tuple of pairs, we `Map` the `Second` function to extract only the second element of a pair, in this case the source of the label.
- Similarly, `RemoveLabel` (4) filters away (5) all the pairs that do not have the provided label, notice the type `!` (it comes from `compiletime.ops.boolean`) we apply to the boolean type-literal.
- The `HasLabel` type definition (6) takes in a label and a pair of a label with a source.
- It deconstructs the pair (7) and extracts the label, it then uses `==` to compare the extracted label with the provided `Label` argument. This `==` is type comparison that comes from the `compiletime.ops.any` package. It lets us check whether two type literals are equal and produces a type-level boolean. In our case we are comparing string type-literals.
- The `Second` match type (8) extracts the second element of a pair by matching on it.

Feels like we're working with regular value-level collections. Lets try this out:
```scala
scala> type Labels =(("primary", "Email2"), ("secondary", "Email2"), ("lastUpdate", "Email2"),
                     ("verified", "Email2"), ("number", "Phone2"), ("prefix", "Phone2"),
                     ("verified", "Phone2"), ("country", "Address2"), ("city", "Address2"),
                     ("lastUpdate", "Address2"))
      
       type Res1 = FindLabel["verified", Labels]
       type Res2 = RemoveLabel["verified", Labels]
// defined alias type Res1 
   = ("Email2", "Phone2")
// defined alias type Res2
   = (("primary", "Email2"), ("secondary", "Email2"), ("lastUpdate", "Email2"),
      ("number", "Phone2"), ("prefix", "Phone2"), ("country", "Address2"),
      ("city", "Address2"), ("lastUpdate", "Address2"))
```

In the first invocation we find all the sources for the `verified` label. In the second we remove all the tuples that contain the label `verified`[^cheating].

[^cheating]: I'm slightly cheating with the REPL output, as for some reason the REPL refuses to fully reduce the last result. To this end I wrap `Res2` with the `Reduce`, which is defined as:
    ```scala
    type Reduce[T <: Tuple] = T match 
      case EmptyTuple => EmptyTuple
      case h *: t => h *: Reduce[t]
    ```
    Which should be a noop, but for some reason forces the REPL to fully reduce the type.

Next we move on to the core of the functionality, grouping by labels. This is similar in spirit of `List.groupBy`, but is constrained by the fact that we are working with string literal **types**. So we are very limited in what we can do with them, in this case, we can only compare them for equality[^efficient]. Here goes:
```scala
type GroupByLabels[Labels <: Tuple] <: Tuple = Labels match
  case EmptyTuple => EmptyTuple
  case (label, source) *: t => // 1
    ((label, source *: FindLabel[label, t])) *: GroupByLabels[RemoveLabel[label, t]] // 2
```

Here in the non-empty branch (1) we match on a pair of label and its source. We then create a new pair (2) with that label, its current source, as well as all of the sources for that label in the tail (using `FindLabel`). And then we remove that label from the tail (with `RemoveLabel`), and proceed grouping recursively on what's left.

[^efficient]: If, for example, we could compare them lexicographically, we could have similar functionality in `O(n*log(n))`, rather than `n^2` we have here. And who knows what magic we could do with some hashing.

And testing this out:
```scala
scala> type Res = GroupByLabels[Labels]
// defined alias type Res
   = (("primary", "Email2" *: EmptyTuple),
      ("secondary", "Email2" *: EmptyTuple),
      ("lastUpdate", ("Email2", "Address2")), 
      ("verified", ("Email2", "Phone2")),
      ("number", "Phone2" *: EmptyTuple), 
      ("prefix", "Phone2" *: EmptyTuple),
      ("country", "Address2" *: EmptyTuple),
      ("city", "Address2" *: EmptyTuple))
```

The result is that now we have pairs, where the first element is a label, and the second is a tuple of its sources. Most of the labels have only one source, but some of them have two. These are our unsafe field names. We're getting close...

```scala
import scala.compiletime.ops.int.* // 1

type OnlyDuplicates[Labels <: Tuple] = Labels Filter ([t] =>> Size[Second[t]] > 1) // 2

type FindDuplicates[Labellings <: Tuple] = 
  OnlyDuplicates[GroupByLabels[ZipAllWithSource[Labellings]]] // 3

type Size[T] <: Int = T match // 4
  case EmptyTuple => 0 // 5
  case x *: xs => 1 + Size[xs] // 6
```

In here:
- We import some more `compiletime.ops` utilities (1), this time for working with type-level integer literals. This allows us to compare integers at the type-level.
- `OnlyDuplicates` (2) takes the result  of `GroupLabels` and filters away only those pairs where the tuple of sources is larger than 1. These are our problematic fields.
- Note the `>` which now operates at the type-level, and gives us a nice value-level vibe.
- `FindDuplicates` (3) brings everything together. Taking a tuple of `Labelling`s, it sends them via `ZipWithSource`, then `GroupByLabel`, and lastly leaves only the duplicates with `OnlyDuplicates`.
- There's small wrinkle with the `Size` type (4). Although there already exists `Tuple.Size`, we must define one on our own. The reason is that `Tuple.Size` constraints the input to be a subtype of `Tuple`, which makes sense. But we call `Size` inside a `Filter` invocation. Unfortunately, the types are not precise enough for `Filter` to "know" that the inputs for `Size` are actually tuples.
- As a result, our own definition is more loosely typed, it takes any input, and then matches on it assuming it's a tuple.
- In the empty case (5) the result is a type-level `0`.
- In the non-empty case we recurse on the tail and `+ 1` the result. Again, everything happens at the type-level.
- Notice how nicely this mirrors the value-level definition of `size` for tuples we had a while back. It's actually very common for type-level functions to mirror value-level ones.

And that's it, we can now find duplicate fields from a bunch of `Labelling`s[^cheatAgain]:
```scala
scala> type Res = FindDuplicates[Labellings]
// defined alias type Res
   = (("lastUpdate", ("Email2", "Address2")), 
      ("verified", ("Email2", "Phone2")))
```

[^cheatAgain]: We are cheating again and applying `Reduce` here as well.

Great success! We found the duplicate fields, along with the class names they came from. With this info, that we managed to obtain at compile-time, we can proceed to generate a compilation error. 

The full code for `FindDuplicates` can be found in the [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/find_duplicates.scala).

## 6.5. Type-Level Observations

Before we proceed, let's review what we had did here. Here's the full code for finding the duplicates:
```scala
type FindDuplicates[Labellings <: Tuple] = OnlyDuplicates[GroupByLabels[ZipAllWithSource[Labellings]]]

type ZipAllWithSource[Labellings <: Tuple] = Labellings FlatMap ZipWithSource

type GroupByLabels[Labels <: Tuple] <: Tuple = Labels match
  case EmptyTuple => EmptyTuple
  case (label, source) *: t =>
    ((label, source *: FindLabel[label, t])) *: GroupByLabels[RemoveLabel[label, t]]

type OnlyDuplicates[Labels <: Tuple] = 
  Labels Filter ([t] =>> Size[Second[t]] > 1)

type FindLabel[Label, T <: Tuple] =
  T Filter ([ls] =>> HasLabel[Label, ls]) Map Second

type RemoveLabel[Label, T <: Tuple] =
  T Filter ([ls] =>> ![HasLabel[Label, ls]])

type HasLabel[Label, LS] <: Boolean = LS match
  case (l, s) => Label == l

type ZipWithSource[L] <: Tuple = L match
  case Labelling[label, elemLabels] => ZipWithConst[elemLabels, label]

type ZipWithConst[T <: Tuple, A] = Map[T, [t] =>> (t, A)]

type Second[T] = T match
  case (a, b) => b

type Size[T] <: Int = T match
  case EmptyTuple => 0
  case x *: xs => 1 + Size[xs]
```

Some observations about this code:
- This almost looks like we're writing in a real, functional, language!
- Especially with the high-level functions like `Map`, `FlatMap`, and `Filter`. The infix syntax gives it extra familiarity.
- Having the ability to define anonymous functions with `=>>` is a very nice touch. How's that for a reusable tool?
- The type-level code mimics [value-level](https://github.com/ncreep/scala3-flat-json-blog/blob/master/value_level_find_duplicates.scala) code very well. If you were to start from some regular value-level code, translating to a type-level equivalent is fairly straightforward[^rules].
- Compared to the ad-hoc Prolog feel that we had in similar situations in the past in Scala 2 with implicits, this is a great improvement[^prologIsGreat].
- Having said that, the language we are writing in is both quite primitive and the resulting code is very "loosely typed", heavily relying on and abusing nested tuples. Kind of what a student might write for an assignment in Lisp.
- If we go back to the analogy between tuples and lists, it's as if all the code we are writing is using `List[Any]` and pattern matching to check the runtime types.
- Take a look at the "signature" of `FindDuplicates`, it states that it works for any subtype of `Tuple`, and only later on pattern-matches the structure to verify it has the right shape. And as an added insult, nothing checks for pattern exhaustivity for us. If we miss a relevant pattern, we are on our own.
- Of course in our case if we "mess up the types" the error will be reported at compile-time. But, it's likely to happen on the "client side" of the code, like we had with `inline`s above. By analogy, the "client side" of this code, is the "runtime" for type-level computations. So the errors will be reported later than desired.
- This can be very disruptive, especially during development. You get compilation errors about "match type reduction failed" in one place, but the actual error is happening somewhere else, and you need to dig in the error trace to figure out where it came from. Kind of like debugging runtime stacktraces.
- One can say that at the type-level Scala is "dynamically typed"...
- To mitigate this we could add some more structure to our types, like the `Labelling` trait. But without further utilities to make use of these types, we won't gain much, and ergonomics will suffer.
- E.g., we need some utilities to define the type of a tuple full of `Labelling`s (the equivalent of `List[Labelling]`), or a tuple of string literals (the equivalent of `List[String]`). And then we would have to adapt library functions like `Tuple.Map` to cooperate and preserve that detailed type information.
- There's a lot of room for a "standard library" for type-level programming, beyond the types in `Tuple.*` and `compiletime.ops`[^notExtensible].

[^rules]: Though you would to have to observe some "rules" when writing the value-level code, e.g., use mostly basic lists and recursion.

[^prologIsGreat]: Don't get me wrong, Prolog is great where it's [applicable](https://www.youtube.com/watch?v=9i06TyYM_lI). But in this case the functional style seems much more readable to me.

[^notExtensible]: Creating new functions similar to the ones in `Tuple.*` is possible in library code, but the functionality of `compiletime.ops` is wired into the compiler and not extensible outside of it.

Cool, let's turn this into an actual compile-time error.

## 6.6. The `error` Function

So now we have a type-level function that can do the heavy lifting and actually find the duplicate fields among all the `Labelling`s. How do we tie this to an actual compilation error?

This is the cue for:
```scala
scala.compiletime.error
```

[Described as](https://docs.scala-lang.org/scala3/reference/metaprogramming/compiletime-ops.html#error-1):
> The `error` method is used to produce user-defined compile errors during inline expansion.  
> If an inline expansion results in a call `error(msgStr)` the compiler produces an error message containing the given `msgStr`.

If we try this in the REPL, we can trigger a custom error message:
```scala
scala> import scala.compiletime.error
      
       error("my error!")
-- Error: ----------------------------------------------------------------------
3 |error("my error!")
  |^^^^^^^^^^^^^^^^^^
  |my error!
1 error found
```

This is our way to plug-in custom compile-time errors and gain some usability points. We just need to turn the `FindDuplicates` type back into a value...

It's actually not that complicated to turn types full of literals back into a value. The [`constValueTuple`](https://docs.scala-lang.org/scala3/reference/metaprogramming/compiletime-ops.html#constvalue-and-constvalueopt-1) function lets us do just that:
```scala
scala> import scala.compiletime.constValueTuple
      
       type Stuff = ("a", "b", "c")
       val tupleValue = constValueTuple[Stuff]
// defined alias type Stuff = ("a", "b", "c")
val tupleValue: Stuff = (a,b,c)
```

`constValueTuple` iterates over the tuple and calls [`constValue`](https://docs.scala-lang.org/scala3/reference/metaprogramming/compiletime-ops.html#constvalue-and-constvalueopt-1) on each element. If the element is a literal, it is turned into the corresponding value.

Now we started from a **type** `Stuff` with some string type-literals, and ended up with a **value** `tupleValue` that contains actual string values. 

We can try to experiment with the `error` function: form a string from `tupleValue` and pass it to `error`:
```scala
scala> import scala.compiletime.error
       val listValue: List[String] = tupleValue.toList
      
       error("The error" + listValue.mkString(","))
-- Error: ----------------------------------------------------------------------
5 |error("The error" + listValue.mkString(","))
  |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |A literal string is expected as an argument to `compiletime.error`. Got "The error".+(listValue.mkString(","))
1 error found
```

This does not work, apparently `error` can only work with literal strings, while the string we use here is the result of a call to `mkString`. This actually makes sense, if we want this to be a compile-time error we need the code under `error` to be evaluated at compile-time. Unless we resort to macros, we can't just evaluate arbitrary code at compile-time.

Digging some more, `error` does support something beyond string literals, we can also use the `+` and it will be evaluated at compile-time:
```scala
scala> import scala.compiletime.error
       
       error("error1" + " error2")
-- Error: ----------------------------------------------------------------------
1 |error("error1" + " error2")
  |^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |error1 error2
1 error found
```

Which is better than nothing, but if we can't do any complex manipulations on our data, it seems like the `error` function is too limited for our purposes.  Or is it?..

Recall that when we wrote code with `inline`s the resulting code got recursively evaluated at compile-time. In theory, we could make a recursive function that would take our complex data and recursively convert it to string literals a bunch of `+` calls.

This could definitely work[^exercise], but it's going to be very low-level string manipulation, as we won't have any access to the standard string utility functions. This sounds tedious, working at the value-level does not buy us much. But we do have an alternative though.

[^exercise]: As per usual, feel free to make into an exercise: given the results of `FindDuplicates` turn it into a value, and then into a single error message that can be passed to `error`.

## 6.7. Building Up a Compile-Time String

Seeing how all the information is already encoded as a type, and seeing how powerful the type "language" that we have available to us in the form of match types. We can do the string building directly at compile-time. Then, when the final string is ready, call `constValue` on that final result type.

This approach is still a bit low-level, as there aren't that many compile-time operations on strings available in the standard library. But we do have some higher-level functions like `Tuple.Fold` that we can apply at the type-level to simplify things.

To follow along the type-level code, you can find the equivalent value-level code [here](https://github.com/ncreep/scala3-flat-json-blog/blob/master/value_level_error_generation.scala).

Lets warm up with the type-level equivalent of `List.mkString`[^unsafe]:
```scala
import scala.compiletime.ops.string.*

type MkString[T <: Tuple] = // 1
  Fold[Init[T], Last[T], [a, b] =>> a ++ ", " ++ b] // 2

type ++[A, B] <: String = (A, B) match // 3
  case (a, b) => a + b
```

This time:
- We define `MkString` (1) to work for any tuple.
- We then `Fold` over that tuple (2), using the `Last` of the tuple as the initial accumulator and the `Init` (all elements but the last) as the thing we actually iterate on. We join elements of the tuple into a single string separated by a comma.
- To join the strings we can't directly use `compiletime.ops.string.+` because it expects its arguments to be strings. But the `Fold` we are using does not have that information available at compile-time.
- Instead we defined `++` (3) which is an "untyped" version of `+`, which "casts" them into strings and then applies `+` to them[^noType].

[^unsafe]: This code would be "unsafe" to run on empty tuples, it will fail at compile-time if we pass it an empty tuple. Feel free to make this function safe by correctly handling the empty case.

[^noType]: I have no idea how to specify that we are actually trying to match string literals in that match. It seems to work without any further annotations though.

This works just like `List.mkString`:
```scala
scala> type Strings = ("a", "b", "c")
       type Result = MkString[Strings]
// defined alias type Result 
   = "a, b, c"
```

`Result` is a single type-level string literal which combines all the strings in the `Strings` tuple.

Using `MkString` we can render a single group of a label and its sources[^typeBoundString]:
```scala
type RenderLabelWithSources[LabelWithSources] <: String = LabelWithSources match
  case (label, sources) => "- [" ++ label ++ "] from [" ++ MkString[sources] ++ "]"
```

[^typeBoundString]: Using a type bound here `<: String` to add a bit more precision to type-checking. Note that type bounds can only be added to match types, not to type aliases. So their usage is a bit inconsistent.

Given a pair of a label and its sources, we create a single string with the label, and an `MkString` of the sources. Like so:
```scala
scala> type Label = ("lastUpdate", ("Email2", "Address2"))
       type Result  = RenderLabelWithSources[Label]
// defined alias type Result 
   = "- [lastUpdate] from [Email2, Address2]"
```

We are starting to compute bits that look like an actual error message. This states that the `lastUpdate` field was found in both `Email2` and `Address2`. Although one could really use some string-interpolation support here. It really does feel like Scala [back in the day](https://docs.scala-lang.org/sips/string-interpolation.html)...

With `Tuple.Map` we can apply this logic to a tuple of labels with sources:
```scala
type RenderLabelsWithSources[LabelsWithSources <: Tuple] = 
  LabelsWithSources Map RenderLabelWithSource
```

And use it like so:
```scala
scala> type Labels =
         (("lastUpdate", ("Email2", "Address2")),
          ("verified", ("Email2", "Phone2")))
      
       type Result = RenderLabelsWithSources[Labels]
// defined alias type Result
   = ("- [lastUpdate] from [Email2, Address2]",
      "- [verified] from [Email2, Phone2]")
```

Getting warm... The last step is to combine this tuple into a single string:
```scala
type RenderError[LabelsWithSources <: Tuple] =
  "Duplicate fields found:\n" ++ 
    Fold[RenderLabelsWithSources[LabelsWithSources], "", [a, b] =>> a ++ "\n" ++ b]
```

Here we take a tuple of labels with their sources, render them, then fold over them to combine them into a single string separated by newlines. We prepend a fixed string to it with a description of the error.

This creates the final error message:
```scala
scala>  type Labels =
                (("lastUpdate", ("Email2", "Address2")),
                 ("verified", ("Email2", "Phone2")))
        type Result = RenderError[Labels]
// defined alias type Result
   =
    "Duplicate fields found:
     - [lastUpdate] from [Email2, Address2]
     - [verified] from [Email2, Phone2]
    "
```

Woohoo! We managed to create a highly informative and user-friendly error message from the raw data of the duplicate fields.

Last step is to patch it up into the `error` function:
```scala
inline def renderDuplicatesError[Labellings <: Tuple]: Unit = // 1
  type Duplicates = FindDuplicates[Labellings] // 2
  
  inline erasedValue[Duplicates] match // 3
    case _: EmptyTuple => () // 4
    case _: (h *: t) => error(constValue[RenderError[h *: t]]) // 5

inline def checkDuplicateFields[A](using mirror: Mirror.ProductOf[A]): Unit = // 6
  inline makeLabellings[mirror.MirroredElemTypes] match // 7
    case labels => renderDuplicatesError[labels.Value] //8
```

In this final snippet:
- Given a tuple of labellings (1).
- We apply `FindDuplicates` to it (2) and assign the result to a new type `Duplicates`.
- Since `Duplicates` is only a type and not a value, we use `erasedValue` to match on it (3) as if it's a value.
- If `Duplicates` is empty (4), there's nothing for us to do and we return without any fuss.
- If it is not empty (5), we take the resulting tuple[^alias] and apply `RenderError` to it. The result is a type-level string literal which we can pass to [`constValue`](https://docs.scala-lang.org/scala3/reference/metaprogramming/compiletime-ops.html#constvalue-and-constvalueopt-1) to turn it into a string value. Since the result of `constValue` is a literal string, we can safely pass it to the `error` function.
- To apply this logic to an actual class, we define one last function `checkDuplicateFields` (6), which takes a type and its `Mirror`.
- The field types of the class are then passed to `makeLabellings` (7) to create a tuple with all the labels of the fields of `A`.
- Once again we fear losing type precision, for this reason we cannot assign the result of `makeLabellings` to a `val` as it makes the compiler completely forget the precise types we obtain from `makeLabellings`. Instead we use the `inline match`ing hack on the result to preserve its type.
- At last, we extract the type of the labellings (8) and pass it on to `renderDuplicatesError`.

[^alias]: It would be nice to have some pattern aliases, so that we don't have to destructure `h` and `t` explicitly and restructure them back. Unfortunately `_: t@NonEmptyTuple => ...` is not valid syntax.

That's it. Will it work though?..
```scala
scala> checkDuplicateFields[User]

scala> checkDuplicateFields[User2]
-- Error: ----------------------------------------------------------------------
1 |checkDuplicateFields[User2]
  |^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |Duplicate fields found:
  |- [lastUpdate] from [Email2, Address2]
  |- [verified] from [Email2, Phone2]
1 error found
```

Will you look at this beautiful compilation error! I don't think I was ever so happy about code failing to compile.

`checkDuplicateFields` compiles fine on `User`, as it doesn't have any duplicates, but errors out with a detailed and informative error message when compiling `User2`.

The full code for this part can be found in the accompanying [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/error_generation.scala).

This concludes the last safety requirement.

## 6.8. All Together For the Last Time

Finally, we can put together all the different parts, to fully solve the flat JSON problem.

```scala
inline def makeCodec[A <: Product](
    using mirror: Mirror.ProductOf[A]): Codec[A] =

  checkDuplicateFields[A]

  val encoder = Encoder.instance[A]: value =>
    val fields = Tuple.fromProductTyped(value)
    val jsons = tupleToJson(fields)

    concatObjects(jsons)

  val decoders = summonAll[Map[mirror.MirroredElemTypes, Decoder]]
  val decoder = decodeTuple(decoders).map(mirror.fromTuple)

  Codec.from(decoder, encoder)
```

This is the same code for `makeCodec` that we had before, but before actually creating the `Codec` we make a call to `checkDuplicateFields`. If the check passed we'll continue as per usual, otherwise we'll abort compilation.

```scala
scala> val codec = makeCodec[User]
       val json = codec(user)
       val fromJson = codec.decodeJson(json)
val codec: Codec[User] = io.circe.Codec$$anon$4@6ff185a3
val json: Json = {
  "primary" : "bilbo@baggins.com",
  "secondary" : "frodo@baggins.com",
  "number" : "555-555-00",
  "prefix" : 88,
  "country" : "Shire",
  "city" : "Hobbiton"
}
val fromJson: Decoder.Result[User] = 
  Right(
    User(
      Email(bilbo@baggins.com,Some(frodo@baggins.com)),
      Phone(555-555-00,88),
      Address(Shire,Hobbiton)))
```
This works just like it did before. But when trying to create a `Codec` for `User2`:
```scala
scala> val codec = makeCodec[User2]
-- Error: ----------------------------------------------------------------------
1 |val codec = makeCodec[User2]
  |            ^^^^^^^^^^^^^^^^
  |            Duplicate fields found:
  |            - [lastUpdate] from [Email2, Address2]
  |            - [verified] from [Email2, Phone2]
1 error found
```

We get a delightful compilation error informing us that it is not safe to create the `Codec` for `User2`. Which fulfills the criteria we set from the start to have readable and informative compilation errors.

Runtime crisis averted!

# 7. Final Words

This was a long journey. We started from "simple" type-level programming with tuples and `inline`, and we ended up with a full-blown type-level language based around match types.

There were some rough edges and compiler issues, but when Scala's type-level features work, they really shine. It seems that the expressiveness of Scala's type-system keeps going up. And Scala can rise up to the challenge of solving sophisticated problems, at compile-time, with fairly readable code.

My hope is that this blog post will spark your curiosity to venture into the land of type-level computations. The more of us living at the type-level, the marrier.

Once again, the full code can be found at the [repo](https://github.com/ncreep/scala3-flat-json-blog/).

Thanks for reading so far, I hope you found some of this interesting and/or useful. Until next time!