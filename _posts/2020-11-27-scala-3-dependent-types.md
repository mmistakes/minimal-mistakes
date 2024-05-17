---
title: "Scala 3: Path-Dependent Types, Type Projections, Dependent Methods and Functions"
date: 2020-11-27
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, scala 3, type system]
excerpt: "This quick tutorial will show you what dependent types are and how they work in Scala 3, along with dependent methods and functions."
---

This short article is for the Scala developer who is curious about the capabilities of its type system. What I'm about to describe is not used very often, but when you need something like this, it can prove pretty powerful.

If you want to understand why abstract type projections are unsound and were removed in Scala 3, check [this article](/scala-3-type-projections/).

## 1. Nesting Types

You're probably well aware that classes, objects and traits can hold other classes, objects and traits, as well as define type members &mdash; abstract or concrete in the form of type aliases.

```scala3
class Outer {
    class Inner
    object InnerObj
    type InnerType
}
```

The question of using those types from inside the `Outer` class is easy: all you have to do is just use those nested classes, objects or type aliases by their name.

The question of using those types from _outside_ the `Outer` class is a bit trickier. For example, we would only be able to instantiate the `Inner` class if we had access to an instance of `Outer`:

```scala3
val outer = new Outer
val inner = new o.Inner
```

The type of `inner` is `o.Inner`. In other words, each instance of `Outer` has its own nested types! For example, it would be a type mismatch if we wrote:

```scala3
val outerA = new Outer
val outerB = new Outer
val inner: outerA.Inner = new outerB.Inner
```

The same thing goes for the nested singleton objects. For example, the expression

```scala3
outerA.InnerObj == outerB.InnerObj
```

would return false. Similarly, the abstract type member `InnerType` is different for every instance of `Outer`.

## 2. Path-Dependent Types and Type Projections

Let's assume we had a method in the class `Outer`, of the form

```scala3
class Outer {
  // type definitions
  def process(inner: Inner): Unit = ??? // give a dummy implementation, like printing the argument
}
```

With this kind of method, we can only pass `Inner` instances that correspond to the `Outer` instance that created them. Example:

```scala3
val outerA = new Outer
val innerA = new outerA.Inner
val outerB = new Outer
val innerB = new outerB.Inner

outerA.process(innerA) // ok
outerA.process(innerB) // error: type mismatch
```

This is expected, since `innerA` and `innerB` have different types. However, there is a parent type for all `Inner` types: `Outer#Inner`.

```scala3
class Outer {
  // type definitions
  def processGeneral(inner: Outer#Inner): Unit = ??? // give a dummy implementation, like printing the argument
}
```

The type `Outer#Inner` is called a _type projection_. With this definition, we can now use `Inner` instances created by any `Outer` instance:

```scala3
outerA.processGeneral(innerA) // ok
outerA.processGeneral(innerB) // ok
```

The types of the style `instance.MyType` and `Outer#Inner` are called _path-dependent types_, because they depend on either an instance or an outer type (a "path"). The term is quite confusing &mdash; as some feedback to this article and the [video](https://www.youtube.com/watch?v=63syJfNoDPI) has pointed out &mdash; and I'll use the term _type projection_ to differentiate the `Outer#Inner` types from the rest.

## 3. Motivation for Path-Dependent Types and Type Projections

Here are a few examples where path-dependent types type projections are useful.

Example 1: a number of libraries use type projections for type-checking and type inference. [Akka Streams](https://doc.akka.io/docs/akka/current/stream/index.html), for example, uses path-dependent types to automatically determine the appropriate stream type when you plug components together: for example, you might see things like `Flow[Int, Int, NotUsed]#Repr` in the type inferrer.

Example 2: [type lambdas](/scala-3-type-lambdas/) used to rely exclusively on type projections in Scala 2, and they looked pretty hideous (e.g. `{ type T[A] = List[A] }#T` ) because it was essentially the only way to do it. Thank heavens we now have a proper syntactic construct in Scala 3 for type lambdas.

Example 3: you might even go bananas and write a full-blown [type-level sorter](/type-level-programming-part-1/) by abusing abstract types and instance-dependent types along with implicits (or givens in Scala 3).

## 4. Methods with Dependent Types

Now, with this background in place, we can now explore methods that rely on the type of the argument to return the appropriate nested type. For example, if you had a data structure/record description for some data access API:

```scala3
class AbstractRow {
    type Key
}
```

the following method would compile just fine:

```scala3
def getIdentifier(row: AbstractRow): row.Key = ???
```

Besides generics, this is the only technique I know that would allow a method to return a different type depending on the value of the argument(s). This can prove really powerful in libraries.

## 5. Functions with Dependent Types

This is new in Scala 3. Prior to Scala 3, it wasn't possible for us to turn methods like `getIdentifier` into function values so that we can use them in higher-order functions (e.g. pass them as arguments, return them as results etc). Now we can, by the introduction of the _dependent function types_ in Scala 3. Now we can assign the method to a function value:

```scala3
val getIdentifierFunc = getIdentifier
```

and the type of the function value is `(r: AbstractRow) => r.Key`.

To bring this topic full-circle, the new type `(r: AbstractRow) => r.Key` is syntax sugar for

```scala3
Function1[AbstractRow, AbstractRow#Key] {
  def apply(arg: AbstractRow): arg.Key
}
```

which is a subtype of `Function1[AbstractRow, AbstractRow#Key]` because the `apply` method returns the type `arg.Key`, which we now [know](#2-path-dependent-types-and-type-projections) that it's a subtype of `AbstractRow#Key`, so the override is valid.

## 6. Conclusion

Let's recap:

  - we covered nested types and the need to create different types for different outer class instances
  - we explored type projections, the mother of instance-dependent types (`Outer#Inner`)
  - we went through some examples why path-dependent types and type projections are useful
  - we discussed dependent methods and dependent _functions_, the latter of which is exclusive to Scala 3

Hope it helps!
