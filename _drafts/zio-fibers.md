---
title: "ZIO and the Fiber Model"
date: 2021-06-31 header:
image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

There are many libraries implementing the effect pattern in the Scala ecosystem: Cats Effect, Monix,
and ZIO just to list some. Every of these implements its own concurrency model. For example. Cats
Effect and ZIO both rely on _fibers_. In the
articles [Cats Effect 3 - Introduction to Fibers](https://blog.rockthejvm.com/cats-effect-fibers/)
and [Cats Effect 3 - Racing IOs](https://blog.rockthejvm.com/cats-effect-racing-fibers/), we
introduced the fiber model adopted by the Cats Effect library. Now, it's time to analyze the ZIO
libraries and its implementation of the fiber model.

1. Background and Setup

We live in a wonderful world, in which Scala 3 is the actual major release of our loved programming
language. So, we will use Scala 3 through the article. Moreover, we will need the dependency from
the ZIO library:

```sbt
libraryDependencies += "dev.zio" %% "zio" % "1.0.8"
```

Nothing else will be required.

2. The Effect Pattern

Before talking about ZIO fibers, we need to have the notion of the _Effect Pattern_. The main 
objective of any effect library is to deal with statements that can lead to side effects. The 
_substitution model_ is the fundamental building block of the functional programming. Unfortunately,
we cannot model side effects using the substitution model, because we cannot substitute functions
with their results, which may vary from information other than simple functions' inputs. Such 
functions are often called _impure_:

// EXAMPLE

So, it comes the Effect Pattern. The pattern aims to model side effects with the concept of effect.
An effect is a blueprint of statements that can produce a side effect, not the result itself. When
we instantiate an effect with some statements, we don't execute anything: We are just describing 
what the code inside the effect will perform once executed:

// EXAMPLE

The above code doesn't print anything to the console, it just describes what we want to achieve with
the code, not how we will execute it.

Moreover, the Effect Pattern add two more conditions to the whole story:

1. The type of the effect must describe the type returned by the effect once executed, and what kind 
   of side effect it represents.
2. The use of the effect must separate the description of the side effect (the blueprint) from its
   execution.
   
The first condition allows us to trace the impure code in our program. One of the main problems with
side effects is that they are hidden in the code. Instead, the second condition allow us to use the
substitution model with the effect, until the point we need to run it. We call such a point "the 
end of the world", and we merely identify it with the `main` method.

3. ZIO Effect

The ZIO library is one of the implementation of the effect pattern available in Scala. It's main
effect type is `ZIO[R, E, A]`. We call the `R` type the _environment type_, and it represents the 
dependencies the effect need to execute. Once executed, the effect can produce a result of type `A`
or fail producing a value of the type `E`. For these reasons, it's common to think about the type
`ZIO[R, E, A]` as an _effectful_ version of the function type `R => Either[E, A]`.

The default model of execution of the `ZIO` effect is synchronous. To start showing some code, let's
model some useful scenario. So, we will model the wake-up routing of Bob. Every morning, Bob wakes 
up, goes to the bathroom, then boils some water to finally prepare a cup of coffee:

```scala
val bathTime = ZIO.succeed("Going to the bathroom")
val boilingWater = ZIO.succeed("Boiling some water")
val preparingCoffee = ZIO.succeed("Preparing the coffee")
```

As the three effect cannot fail, we use the smart constructor `ZIO.succeed`.