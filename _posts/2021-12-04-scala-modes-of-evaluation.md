---
title: "Evaluation Modes in Scala"
date: 2021-12-04
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, philosophical]
excerpt: "We'll take a look at some core Scala constructs and look at them from a different angle than we're used to."
---

This article is a bit shorter than usual, but I hope it will share a different kind of insight. We're not going to explore new features, external libraries, create apps or demos. We're going to take a look at some core Scala constructs and _understand_ them in a different context.

## 1. The 3 Evaluation Modes

When we want to compute a value, we can think of two different aspects to how that value is computed. There are more, but I will focus on the following:

1. The time. We can choose to compute a value _now_ vs compute a value _later_, i.e. we declare that value now, but the evaluation itself happens at a later point, _when that value is needed_.
2. The memory. We can choose to _store_ that value in memory, or we can choose not to, which means that we'd have to _recompute_ that value whenever we need it.

The time aspect divides computations into now vs later. The memory aspect divides computations into _"memoized"_ and _non-memoized_. I put "memoized" in quotes, because memoization is considered to be an optimization technique. However, at a foundational level, storing vs. not storing is a fundamental aspect of any computation. Note that there are many more aspects of computation that I did not refer to, e.g. asynchrony, side effects, etc.

In this classification, these two orthogonal aspects give us 4 kinds of computations:

- computed now, memoized
- computed later, memoized
- computed now, non-memoized
- computed later, non-memoized

Arguably, type 3 isn't useful: computing a value immediately (i.e. at the point of definition) without storing the value is pure waste. So I'll consider the last type (computed later, non-memoized) as "type 3".

## 2. Scala Constructs For The 4 Evaluation Modes

How does Scala implement this classification? Here's a quick breakdown.

Type 1: How do we define a value that we compute _right now_ and store it in memory? By defining a `val`:

```scala
val meaningOfLife = 40 + 2
```

When we define a `val`, it will _always_ be computed at the point of definition. The expression is evaluated and the result is stored.

Type 2: How do we define a value that's computed _later_, but stored when computed? Scala has a construct called a `lazy val`:

```scala
lazy val complexThing = (1 to 42).map(_ => 1).reduce(_ + _)
```

This value is defined, but the expression will only be evaluated _at the point of use_. Once evaluated, it's stored, so we can reference (and reuse) that value every time after that. Note that the question of "computed later" does not refer to _asynchrony_. When we define a Future, for example, the Future itself is available (as an instance of a type), and it's its internal mechanism that decides to use threads, fetch results asynchronously, etc.

Type 3: How do we define a value that's computed later, but not stored, i.e. if we want to use it again, we'll have to recompute it? It's a `def`:

```scala
def recomputed = 3 + 39
```

This is potentially the most surprising. But it's true: every time we use `recomputed`, the expression is evaluated again!

So we have the following associations:

- computed now, memoized: `val`
- computed later, memoized: `lazy val`
- computed later, non-memoized: `def`

But since our programs are not built just out of plain values, but also functions taking arguments, we can also transfer this small classification to arguments as well:

- computed now, memoized: plain argument
- computed later, non-memoized: by-name argument
- computed later, memoized: by name argument + lazy val (call by need)

## 3. Conclusion: The Philosophy Hidden in Plain Sight

Scala is brilliant on so many levels, but this particular aspect of Scala makes it so powerful, because it leverages concepts we (as programmers) are familiar with in different contexts, and gave them new meanings. We think of

- `val`s as constants
- `lazy val`s as constants computed later
- `def`s as methods

but how many times do think about what computations expressed in these terms _are_?
