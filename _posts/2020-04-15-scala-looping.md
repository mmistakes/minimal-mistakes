---
title: "How Things Don't Make Sense - Scala Loops"
date: 2020-04-15
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, teaching, rant]
excerpt: "Daniel goes into another rant about learning (and teaching) Scala using loops. Are they actually useful?"
---
I wrote an article not too long ago on why <a href="https://rockthejvm.com/blog/variables">learning variables in Scala doesn't make sense</a>, and likewise teaching variables as one of the first concepts also doesn't make sense. In this article I'm going to expand that idea to the lovely loops.

This article is for 1) programmers who are just getting started with Scala and 2) for Scala teachers.

## What many start with

When learning Scala, it's very attractive, intuitive and tempting to start with what people already know. After all, Scala is mostly targeted at established programmers in other languages (especially Java), as very few instructors have attempted teaching Scala as a first language. I've yet to make this attempt myself - but I digress. So when learning Scala, people start with the familiar:

```scala
// values are constants
val x = 3

// variables are changeable, much like any other language
var y = 4
y = 5 // reassignment ok

// looping
while (y < 42) {
    println("Hey ma, I'm looping!")
    y += 1
}
```

After that, the instructor usually says: "Cool, now that you've learned about while, please don't use them. It's bad practice.". People look confused, so the instructor continues: "Just trust me.". For a long time, I've been guilty of this myself. I even continued further: "I've just shown you loops so that you can relate to them, but please don't use them.".

What I was expecting from the audience: "OK, we've wiped my memory clean and fresh. We've never heard of a loop in our life. Show us the ways of the Force."
What I actually got: What should we use instead? If you don't want us to use them, why are you showing us this?

Exactly.

## Make FP, not war

Learning loops to get familiar with Scala is bad. It's as if you wanted to learn French but still pronounce the 'h'. You need to let it go.

If loops are one of the first things you learn in Scala, that will validate all the other concepts you might have encountered in other languages. You will continue to think imperatively, that is, "do this, do that, increment this, and as long as y < 42, just increment y". In Scala, we think in terms of expressions, not instructions:

```scala
(5 until 42).foreach(_ => println("Hey ma, I'm doing it right!"))
```

If you want to transform a list, you don't use a loop, you use a map:

```scala
List(1,2,3).map(x => x + 1)
```

If every element you go through generates its own collection, you use a flatMap:

```scala
List(1,2,3).flatMap(n => Seq.fill(n)("I like FP!"))
```

What if you don't like all the elements in your collection? Use a filter:

```scala
(1 to 10000).filter(n => n % 42 == 0)
```

Want a single value out of the entire list? Use fold, count, maxBy, find and a variety of other transformations. You see, every "loop" has an equivalent transformation. Newbies ask "how can I loop through this?". Terrible, albeit understandable question. Leads to ugly, unproductive code which will not pass any code review in a mature Scala team. Instead, ask "how can I transform this into what I want?". That's a better question. Leads to clean, elegant code that will stand the test of time and will help fellow developers push more robust code faster.

## The foreach fallacy

"But Daniel, I can still loop with foreach!"

That's one of the unfortunate confusions many starters face. Foreach appears in many programming languages in various forms, so assuming a foreach in Scala is a built-in language features is understandable. It's easy to consider

```scala
List(1,2,3).foreach { x =>
    println(x)
}
```

as being similar to

```Java
List<Integer> list = ...
for (int x: list) {
    System.out.println(x)
}
```

But it's not. Foreach is not built into the Scala language. Foreach is one of the <a href="https://rockthejvm.com/blog/hof-for-oop">higher-order functions</a> that are part of every standard collection. It's particularly confusing given Scala's alternative lambda syntax with curly braces, but the "x =>" that follows the curly braces is an anonymous function, nothing more.

## The for "loop"

And don't get me started with for comprehensions.

```scala
for {
    x <- List(1, 2, 3)
    y <- List('a', 'b', 'c')
} yield (x, y)
```

Another (understandable) confusion about the Scala language. Now, for-structures like the one above ARE built into the language. It's just that they're not what they seem:

```scala
List(1, 2, 3).flatMap(x => List('a', 'b', 'c').map(y => (x, y)))
```

That's what the for "loop" above compiles to. That's why for-structures in Scala are called comprehensions. They're expressions, because they can be assigned to a value:

```scala
val allPairs = for {
    x <- List(1, 2, 3)
    y <- List('a', 'b', 'c')
} yield (x, y)
```

## To the Scala learner

If you heard about loops in Scala, try to forget them. Try to do without them. Instead of asking "how can I loop through this", ask "how can I transform this". Take this one principle to heart and you'll be ahead of many Scala programmers already.

## To the Scala teacher

Why are we teaching loops in Scala so early? It makes no sense. We want people to think in FP, with values, expressions, recursion and higher-order functions. So why are loops the first thing they learn?

Roughly a year ago, I personally stopped even mentioning loops until people are already familiar with the different mindset of functional programming. After enough practice with FP, I tell them "oh, by the way, there's also the while loop in Scala" at which they reply "that's fine, we don't need it".
