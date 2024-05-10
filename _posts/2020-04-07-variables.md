---
title: "How Things Don't Make Sense - Scala Variables"
date: 2020-04-07
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, teaching, rant]
excerpt: "Daniel goes into a small rant about learning (and teaching) Scala using variables."
---
For a long time in my Scala classes and trainings I used to start the training, obviously, with values and variables.

## The gripe

This is what everyone starts with when learning Scala:

```scala
val aValue = 2
aValue = 3 // NOPE. can't reassign

var aVariable = 3
aVariable = 47 // OK
```

Piece o' cake. This is what I used to start with as well. However, the very next thing I say is, "don't use variables, they are discouraged". People look confused, so I immediately follow with a "trust me" just to ease the tension in the room.

The confusion is natural. People usually come from an imperative programming background, like Java or Python, where you can't do squat without variables. So from an instructor's point of view, introducing Scala by relying on something people already know seems natural and intuitive.

I've recently started to believe that is the wrong approach.

## Because FP

Once someone gets started with Scala by learning mutable variables, they instantly validate every other concept they might have learned or used in other languages or thinking styles.

```scala
// do something 10 times
var i = 0
while (i < 10) {
  println("Hey ma, I'm looping!")
  i = i + 1
}
```

In other words, people start thinking - or I should say continue thinking - procedurally. This is blocking the normal flow of learning functional programming, because we want think in terms of expressions, not instructions.

```scala
(0 until 10).foreach(_ => println("Hey ma, I'm doing it right!"))
```

The looping version above would not pass code review in any strong Scala team.

Mutation is also a big problem:

```scala
var myList = List(1,2,3)
// use the list
myList = myList :+ 4
// pass the list to some other API
invokeExternalService(myList)
```

Even if Scala learners understand immutable data structures, reusing variables makes code very hard to read and reason about, especially in multithreaded or distributed applications. In this case, we can very quickly lose track of who modified which variable, or which piece of code reassigned our shared variables. If we start learning Scala with variables, we continue thinking this way, and make concurrent and distributed code worse in Scala than in Java. Instead, keep it clean.

```scala
val startingList = List(1,2,3)
// use it
// ...
// pass something else to the other API
invokeExternalService(startingList :+ 4)
```

That's not to say that variables are bad all the time. I'll probably talk about when variables are useful in another article. But if we want to discourage people from using variables, why are variables the first thing they learn?

## The contrarian

So I've stopped teaching people about variables, and my recent trainings at Adobe and the <a href="https://rockthejvm.com/course/scala-at-light speed">Scala at Light Speed</a> embody that belief. I start with values and just carry on with expressions, then functions and then teach people how to build moroe complex things. Some trainees and students sometimes ask me, "Daniel, isn't there some variable or something?" at which I tell a lie and say "Nope. You'll have to use what you have.". And they always do, they find a way, and after the training or the class they tell me they understand Scala as a different way of thinking, which is my main goal. Only then do I tell them that there is such a thing as a variable in Scala, but by that time, nobody even cares.

Rule of thumb:
  - If you're learning Scala, pretend you've never even heard of variables. There are no such things.
  - If you're teaching Scala, if you don't want your students to use variables and loops, don't teach them!
