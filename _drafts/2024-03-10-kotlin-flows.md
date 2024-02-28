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

Our domain will be an application faking the imdb website. We'll focus on the actors playing movies. So, first of all, let's define the `Actor` type:

```kotlin
object Model {
    @JvmInline value class Id(val id: Int)

    @JvmInline value class FirstName(val firstName: String)

    @JvmInline value class LastName(val lastName: String)

    data class Actor(val id: Id, val firstName: FirstName, val lastName: LastName)
}
```

We want to be sure to not confuse the first name and the last name of an actor. So, we create two dedicated types for them. We also create a dedicated type for the `Actor` id. Then, we need to have a bit of data to play with. We'll define the following actors:

```kotlin
object Data {
    // Zack Snyder's Justice League
    val henryCavill = Actor(Id(1), FirstName("Henry"), LastName("Cavill"))
    val galGodot: Actor = Actor(Id(1), FirstName("Gal"), LastName("Godot"))
    val ezraMiller: Actor = Actor(Id(2), FirstName("Ezra"), LastName("Miller"))
    val benFisher: Actor = Actor(Id(3), FirstName("Ben"), LastName("Fisher"))
    val rayHardy: Actor = Actor(Id(4), FirstName("Ray"), LastName("Hardy"))
    val jasonMomoa: Actor = Actor(Id(5), FirstName("Jason"), LastName("Momoa"))

    // The Avengers
    val robertDowneyJr: Actor = Actor(Id(6), FirstName("Robert"), LastName("Downey Jr."))
    val chrisEvans: Actor = Actor(Id(7), FirstName("Chris"), LastName("Evans"))
    val markRuffalo: Actor = Actor(Id(8), FirstName("Mark"), LastName("Ruffalo"))
    val chrisHemsworth: Actor = Actor(Id(9), FirstName("Chris"), LastName("Hemsworth"))
    val scarlettJohansson: Actor = Actor(Id(10), FirstName("Scarlett"), LastName("Johansson"))
    val jeremyRenner: Actor = Actor(Id(11), FirstName("Jeremy"), LastName("Renner"))

    // Spider Man
    val tomHolland: Actor = Actor(Id(12), FirstName("Tom"), LastName("Holland"))
    val tobeyMaguire: Actor = Actor(Id(13), FirstName("Tobey"), LastName("Maguire"))
    val andrewGarfield: Actor = Actor(Id(14), FirstName("Andrew"), LastName("Garfield"))
}
```

We have defined the actors playing in the movies "Zack Snyder's Justice League", "The Avengers", and the various reboot of "Spider Man". Now, we can start to play with Kotlin flows.