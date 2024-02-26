---
title: "Kotlin Flows - A Comprehensive Introduction"
date: 2024-03-10
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

In the article [Kotlin Coroutines - A Comprehensive Introduction](https://blog.rockthejvm.com/kotlin-coroutines-101/), we have seen how to use Kotlin coroutines to write asynchronous code in a more natural and readable way. In this article, we will focus on another important concept in the Kotlin coroutines world: Kotlin Flows. Flows are that type of data structure that you didn't know, but once you know them, you can't live without them. So, without further ado, let's dive into Kotlin Flows.

## 1. Setting the Stage

We'll use Kotlin 1.9.22 and Kotlinx coroutines 1.8.0. In fact, flows are part of the Kotlin coroutines library. We'll use the Gradle build tool to manage our dependencies. Here's the dependencies added in the  `build.gradle.kts` file:

```kotlin
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
}
```

As usual, at the end of the article, you'll find the complete Gradle file to run the examples.

Kotlin flows can be compared somewhat to the Typelevel FS2 library in Scala. We already talk about FS2 in the article [FS2 Tutorial: More than Functional Streaming in Scala](https://blog.rockthejvm.com/fs2/), and to let the developers who are familiar with FS2 understand the concept of Kotlin flows, we'll use the same examples as in the FS2 article.