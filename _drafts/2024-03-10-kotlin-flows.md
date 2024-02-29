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
```

We have defined the actors playing in the movies "Zack Snyder's Justice League", "The Avengers", and the various reboot of "Spider Man". Now, we can start to play with Kotlin flows.

## 2. Creating Flows

What is a flow in Kotlin? A `Flow<T>` is a reactive data structure that emits a sequence of values of type `T`. Flows are part of the Kotlin coroutines library. In their simplest form, flows can be viewed as a collection, a sequence, or an iterable of values. In fact we can create a flow from a finite list of values using the `flowOf` function:

```kotlin
val zackSnyderJusticeLeague: Flow<Actor> = 
    flowOf(
        henryCavill,
        galGodot,
        ezraMiller,
        benFisher,
        rayHardy,
        jasonMomoa
    )
```

We can even create a flow from a list, a set, and so on using the `asFlow` extension function:

```kotlin
val avengers: Flow<Actor> =
    listOf(
        robertDowneyJr,
        chrisEvans,
        markRuffalo,
        chrisHemsworth,
        scarlettJohansson,
        jeremyRenner,
    ).asFlow()
```

If we have a function that returns a value, we can create a flow from it using the `asFlow` function as well:

```kotlin
val theMostRecentSpiderManFun: () -> Actor = { tomHolland }

val theMostRecentSpiderMan: Flow<Actor> = theMostRecentSpiderManFun.asFlow()
```

Under the hood, all the above `Flow` factories are defined in terms of the so called flow builder, aka the `flow` function. The `flow` function is the most general way to create a flow. It takes a lambda that can emit values using the `emit` function. Let's make an example to clarify this concept. We want to create a flow that emits the actors that played in the "Spider Man" movies as main character. We can define the following flow:

```kotlin
val spiderMen: Flow<Actor> = flow {
  emit(tobeyMaguire)
  emit(andrewGarfield)
  emit(tomHolland)
}
```

Maybe, you're wondering from where the `emit` function comes from. Well, the lambda passed as parameter to the `flow` function defined as its receiver an instance of a functional interface called `FlowCollector`. The `FlowCollector` interface has a single method called `emit` that allows to emit a value. We'll see more about the `Flow` internals in the next sections. For now, it's enough to know that the `emit` function is used to emit a value within the `flow`.

It's easy to define the previous factory methods in terms of the `flow` function. For example, the `flowOf` function is defined as follows:

```kotlin
// Kotlin Coroutines Library
fun <T> flowOf(vararg values: T): Flow<T> = flow {
    for (value in values) {
        emit(value)
    }
}
```

Since it's a reactive data structure, the values in a flow are not computed until they are requested. A `Flow<T>` it's just a definition of how to compute the values, not the values themselves. This is a fundamental difference with collections, sequences, and iterables. In fact, we can define an infinite `Flow` quite easily:

```kotlin
val infiniteJLFlowActors: Flow<Actor> = flow {
  while (true) {
    emit(henryCavill)
    emit(galGodot)
    emit(ezraMiller)
    emit(benFisher)
    emit(rayHardy)
    emit(jasonMomoa)
  }
}
```

The flow `infiniteJLFlowActors` doesn't emit values during creation. If we put a print statement immediately after the flow definition, we will see the output.

Consuming a `Flow` it's quite straightforward. In fact, on the `Flow` type is defined one and only one terminal operation: the `collect` function. The `collect` function is used to consume the values emitted by the flow. It takes a lambda that is called for each value emitted by the flow. Say that we want to print the actors playing in the "Zack Snyder's Justice League" movie, we'll use the following code:

```kotlin
suspend fun main() {
    val zackSnyderJusticeLeague: Flow<Actor> =
        flowOf(
            henryCavill,
            galGodot,
            ezraMiller,
            benFisher,
            rayHardy,
            jasonMomoa
        ) 
    zackSnyderJusticeLeague.collect { println(it) }
}
```

As the most of you would have noticed, we called the `collect` function from the `suspend main` function. In fact, the `collect` method is defined as a suspending function since it has to wait and suspend for consuming the emitted values without blocking a thread. Here is the definition of the `Flow` type:

```kotlin
// Kotlin Coroutines Library
public interface Flow<out T> {
    public suspend fun collect(collector: FlowCollector<T>)
}
```

The `collect` function is one of the possible *terminal operations*. They are so called because they consumer the values contained in the `Flow`.  


