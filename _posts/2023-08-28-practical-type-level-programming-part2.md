---
title: "Practical Type-Level Programming in Scala 3, Part 2: Serializing a Concrete Class"
date: 2023-08-28
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: "JSON serialization of a concrete class with type-level techniques."
---

Welcome to the second installation of this series. I'm assuming that you've read the [first part](/practical-type-level-programming-part1), and are familiar with the "flat JSON" problem we are trying to solve.

Let us now proceed to flat serializing a concrete class. This will allow us to dip our toes into a bit of type-level programming without going into the deep end straight away.

## Serializing a Concrete Class

Since we'll be dealing with JSON, we'll need a JSON library to do the JSON work for us. I'll be using [Circe](https://github.com/circe/circe), but pretty much any other Scala JSON library (of which there are plenty) will do just fine. I won't spend too much time explaining the mechanics of Circe, in the hope that the JSON code we'll be writing is sufficiently self-explanatory.

You can see the full setup for the post in [this](https://github.com/ncreep/scala3-flat-json-blog/blob/master/setup.scala) file[^buildTool]

[^buildTool]: This is a [Scala CLI](https://scala-cli.virtuslab.org/) project.

So for today's part our goal is to take any instance of the `User` class and serialize it as a flat JSON. In Circe-speak, what we need is an `Encoder` for the `User` type.

Because metaprogramming in most languages isn't as readable as plain code, when tackling a metaprogramming problem I find it helpful to first sketch a solution in pseudo-code. Let's do that for the JSON `Encoder`:
1. Given a `User` instance
1. For each field in the class
1. Find the appropriate `Encoder` for the field's type
1. Convert the field to a JSON object
1. Concatenate all the JSON objects into one

Short and to the point.

## Lists and Tuples

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

## Tuple Iteration

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

## Tuple Recursion

To implement our own `map`-like function on tuples we are going to use the analogy between lists and tuples to inform our implementation.

Suppose we have a `List` and we want to convert each element to JSON and aggregate the results into a new `List`. Here's a simplified, and non-tail-recursive[^tailRecursion] solution for this problem:
```scala
def listToJson(ls: List[X]): List[Json]
  ls match 
    case Nil => Nil
    case h :: t => 
      val json = encoder(h) 
      
      json :: listToJson(f, t)
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

For a concrete example: if the input tuple is `Int *: String *: EmptyTuple`. Then on the first iteration of the recursion `h = Int` and `t = String *: EmptyTuple`. On the next step `h = String` and `t = EmptyTuple`. On the next step we'll hit the base case.

Now that we have a name for the type at the head of the tuple we `summon` (4) the appropriate `Encoder[h]`. We use the `Encoder` (5) to convert the value at the head of the tuple to JSON. To finish up we do a recursive call (6) with the tail of the tuple and prepend the current JSON to the result of the recursive call.

This is all good and well, but if we actually try to compile this function we get:
```scala
-- [E006] Not Found Error: -----------------------------------------------------
4 |    case ((h: h) *: (t: t)) => // 3
  |              ^
  |              Not found: type h
  |
  | longer explanation available when compiling with `-explain`
-- [E006] Not Found Error: -----------------------------------------------------
4 |    case ((h: h) *: (t: t)) => // 3
  |                        ^
  |                        Not found: type t
  |
  | longer explanation available when compiling with `-explain`
-- [E006] Not Found Error: -----------------------------------------------------
5 |      val encoder = summon[Encoder[h]] // 4
  |                                   ^
  |                                   Not found: type h
  |
  | longer explanation available when compiling with `-explain`
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

## Running Code at Compile-Time

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
```plaintext
The summoning is delayed until the call has been fully inlined.
```

What does it mean for the call to be "fully inlined"? That's where Scala's new [`inline`](https://docs.scala-lang.org/scala3/reference/metaprogramming/inline.html) keyword comes into play. 

By marking a function as `inline` the compiler will always insert the code for the function directly at the call-site. While this sounds like a rather innocent capability, when mixed with the fact that inlining can be recursive, and that the compiler can evaluate simple control-flow expressions (like `if` and `match`) while inlining, the result is something like macro code-generation powers. This is how we make the compiler evaluate code at compile-time for us.

This may sound a bit abstract, but the magic happens by sprinkling the `inline` keyword in various locations and praying for the best. Let's try it:

```scala
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
     |
     | val list = tupleToJson(tuple)

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

## Compile-Time Observations

Some interesting observations about this approach:
- By being able to generate code like this, we are gaining some macro-like capabilities. This is a double-edged sword as it suffers from some of the same drawbacks as macros. The main one being
- That we only discover errors when we compile the user code. There's no way of knowing upfront that everything is going to work as expected. And when something bad happens
- The user has to debug compilation errors in code that was never written by the said user. As the logic of code generation grows more sophisticated, the debugging process can become non-trivial.
- Preserving type information is very important. Missing type information can prevent the compiler from fully inlining. For example:
    ```scala
    scala> val tuple: Tuple = (1, "abc", true)
    |
    | val list = tupleToJson(tuple)
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

## Once More with a Case Class

With the implementation of `tupleToJson` and the knowledge of `Tuple.fromProductTyped` we can take our actual case class instance and turn it into a bunch of JSON values:
```scala
scala> val fields = Tuple.fromProductTyped(user)
     | val jsons = tupleToJson(fields)

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

## JSON Objects

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

Then we would fail to compile:
```scala
scala> val fields = Tuple.fromProductTyped(user)
     | val jsons = tupleToJson(fields)
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
  |-----------------------------------------------------------------------------
  |Inline stack trace
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  |This location contains code that was inlined from rs$line$16:5
5 |      val encoder = summonInline[Encoder.AsObject[h]] // 2
  |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

Which correctly informs us that there is no `Encoder.AsObject[Int]` in existence[^betterError].

[^betterError]: This compilation error would be more informative if we could see what field in the class triggered the error. I'll leave this as a (difficult) exercise for the reader...

## Once More with Feeling

And now we are ready to put all the pieces together for our flat `Encoder`:
```scala
val encoder = Encoder.instance[User]: value => // 1
  val fields = Tuple.fromProductTyped(value) // 2
  val jsons = tupleToJson(fields) // 3

  concatObjects(jsons) // 4
```

We are creating a new `Encoder` for the `User` class (1). This is done by specifying the action for a given `User` value:
- Convert the `User` into a tuple of its fields (2)
- Use `tupleToJson` to iterate over the fields and transform each field into `JsonObject`
- `concatObjects(jsons: List[JsonObject]): Json` - (3) is a small utility function that safely turns a list of `JsonObject` into a single object.

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

The full code can be found at the accompanying [repo](https://github.com/ncreep/scala3-flat-json-blog/blob/master/flat_concrete.scala).

In the next part we are going create a matching flat `Decoder` for our `User` class. Until next time...