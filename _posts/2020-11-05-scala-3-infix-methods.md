---
title: "Infix Methods in Scala 3"
date: 2020-11-05
header:
  image: "/images/blog cover.jpg"
tags: [scala 3]
excerpt: "A quick article on one of the simple, but expressive features of the Scala 3 method syntax." 
---

No doubt, Scala is an expressive language. This article will be short and to the point, regarding a particular expressive feature of Scala: infix methods.

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## Background

Scala is expressive and powerful in many ways, but two (quite simple) features make it distinctive from most other languages:

- method naming including non-alphanumeric characters, which allow math-like operators such as `++`, `-->`, `?` and more
- the ability to infix methods with a single argument

We're going to stress on the second. The idea is that, if a method has a single argument, we can write it as if it were an operator. An example:

```scala3
case class Person(name: String) {
  def likes(movie: String): String = s"$name likes $movie"
}
```

In this case, an instance of Person can call its `likes` method either in "normal", Java-style dot notation, or it can call it in "infix operator". In other words, if we instantiated a person we could call its method as usual:

```scala3
val mary = Person("Mary")
val marysFavMovie = mary.likes("Forrest Gump")
```

but we can also call it in a different way:

```scala3
// identical
val marysFavMovie2 = mary likes "Forrest Gump"
```

which the compiler rewrites as `mary.likes("Forrest Gump")`, but looks much closer to natural language. This works for any method with _one argument_ and allows us to write `object.method(arg)` or `object method arg`.

## Infix Methods and Scala 3, Now Explicit

Infix methods were introduced to allow the operator notation for methods that look like operators: `+`, `-->`, `!`, `::` etc. However, Scala 2 also allows regular methods - see the `likes` example above to be invoked with the infix notation.

In Scala 3, infix notation for "regular" (i.e. alphanumeric) methods will be discouraged and deprecated (according to the [docs](https://dotty.epfl.ch/docs/reference/changed-features/operators.html#motivation-1) starting in Scala 3.1). Expressions like `mary likes "Forrest Gump"` will now compile with a warning. However, Scala 3 allows us to remove the warning if the method comes annotated with `@infix`:

```scala3
import scala.annotation.infix

case class Person(name: String) {
  @infix
  def likes(movie: String): String = s"$name likes $movie"
}
```

The `@infix` annotation is only required for alphanumeric method names. If we had

```scala3
def ::(person: Person): String = "$name talks to ${person.name}"
```

we could call `mary :: bob` no problem.

## The New Infix Definition

So far, nothing rocket science. However, the following came by surprise. Assume we had the class `Person` without any inside implementations:

```scala3
case class Person(name: String)
```

Now, in some other part of the code, we can define a method that looks like this:

```scala3
@infix
def (person: Person).likes(movie: String): String = s"${person.name} likes $movie"
```

which would then enable us to write, as before,

```scala3
val mary = Person("Mary")
val marysFavMovie3 = mary likes "Forrest Gump"
```

Now that's some funky syntax. The construct above is a method called `likes` which we can invoke only on an instance of `Person`. Not only that, but since it has one argument, we can also call it in infix position, and the infix rules - including annotations and deprecation - also apply here.

That funky method definition is an _extension method_. The syntax is shorthand for the longer-form

```scala3
extension (person: Person)
  def likes(movie: String): String = s"${person.name} likes $movie"
```

which the docs aren't too clear about at the moment.

More on extensions, in another article.

## Conclusion

We've learned - or at least recapped - a few ideas about infix methods and how the rules change in Scala 3, plus a new friend with infix extension methods with shorthand syntax.

More to come on Scala 3!