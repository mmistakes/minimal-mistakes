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

## 2. Flows Basics

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


## 3. Flows and Coroutines

It's important to notice that despite being a suspending function, the `collect` function is inherently synchronous. No new coroutine is started under the hood. Let's try to put a print statement immediately after the `collect` function of the previous flow:

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
    println("Before Zack Snyder's Justice League")
    zackSnyderJusticeLeague.collect { println(it) }
    println("After Zack Snyder's Justice League")
```

We expect the program to print all the actors emitted by the flow and then the string "After Zack Snyder's Justice League". In fact, running the program produces the expected output:

```
Before Zack Snyder's Justice League
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=3), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Fisher))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ray), lastName=LastName(lastName=Hardy))
Actor(id=Id(id=5), firstName=FirstName(firstName=Jason), lastName=LastName(lastName=Momoa))
After Zack Snyder's Justice League
```

If we want to kick in asynchronous behavior, we need to use the `launch` function from the `CoroutineScope` interface. Let's add a delay between the emission of the actors and the print statement:

```kotlin
coroutineScope {
    val delayedJusticeLeague: Flow<Actor> =
        flow {
            delay(1000)
            emit(henryCavill)
            delay(1000)
            emit(galGodot)
            delay(1000)
            emit(ezraMiller)
            delay(1000)
            emit(benFisher)
            delay(1000)
            emit(rayHardy)
            delay(1000)
            emit(jasonMomoa)
        }
    println("Before Zack Snyder's Justice League")
    launch { delayedJusticeLeague.collect { println(it) } }
    println("After Zack Snyder's Justice League")
}
```

Now, the flow is collected inside a dedicated coroutine spawned by the `launch` coroutine builder (if you want to deep dive into the coroutines world, please refer to the article [Kotlin Coroutines - A Comprehensive Introduction](https://blog.rockthejvm.com/kotlin-coroutines-101/)). Now, the program will not wait for the whole collection of the flow to complete before printing the string "After Zack Snyder's Justice League". In fact, the output of the program is:

```
Before Zack Snyder's Justice League
After Zack Snyder's Justice League
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=3), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Fisher))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ray), lastName=LastName(lastName=Hardy))
Actor(id=Id(id=5), firstName=FirstName(firstName=Jason), lastName=LastName(lastName=Momoa))
```

Executing the collection of the values of a flow in a separate coroutine is such a common pattern that the Kotlin coroutines library provides a dedicated function to do that: the `launchIn` function:

```kotlin
coroutineScope {
    val delayedJusticeLeague: Flow<Actor> =
        flow {
            delay(1000)
            emit(henryCavill)
            delay(1000)
            emit(galGodot)
            delay(1000)
            emit(ezraMiller)
            delay(1000)
            emit(benFisher)
            delay(1000)
            emit(rayHardy)
            delay(1000)
            emit(jasonMomoa)
        }
    println("Before Zack Snyder's Justice League")
    delayedJusticeLeague.onEach { println(it) }.launchIn(this)
    println("After Zack Snyder's Justice League")
}
```

The above code will produce the same output as the previous one. The `launchIn` implementation is straightforward:

```kotlin
// Kotlin Coroutines Library
public fun <T> Flow<T>.launchIn(scope: CoroutineScope): Job = scope.launch {
    collect()
}
```

However, you might have noticed that we subtly introduced a new flow function, the `onEach` function. We'll delve in functions controlling the lifecycle of flows in a minute, but we can say that the `onEach` function is used to apply a lambda to each value emitted by the flow, and it's used in combination with the call the of `collect` function without parameters.

Every suspending function must have a coroutine context and suspending lambdas used as input to flows function are no exception. In fact, a flow uses internally the context of the coroutine that calls the `collect` function. Let's make an example and rewrite the previous code using the `withContext` function to change the context:

```kotlin
withContext(CoroutineName("Main")) {
    coroutineScope {
        val delayedJusticeLeague: Flow<Actor> =
            flow {
                println("${currentCoroutineContext()[CoroutineName]?.name} - In the flow")
                delay(1000)
                emit(henryCavill)
                delay(1000)
                emit(galGodot)
                delay(1000)
                emit(ezraMiller)
                delay(1000)
                emit(benFisher)
                delay(1000)
                emit(rayHardy)
                delay(1000)
                emit(jasonMomoa)
            }
        println(
            "${currentCoroutineContext()[CoroutineName]?.name} - Before Zack Snyder's Justice Leag
        )
        withContext(CoroutineName("Zack Snyder's Justice League")) {
            delayedJusticeLeague.collect { println(it) }
        }
        println(
            "${currentCoroutineContext()[CoroutineName]?.name} - After Zack Snyder's Justice Leagu
        )
    }
}
```

As we can see, we set the most external coroutine context to "Main" and we surround the call to the `collect` function with a new context called "Zack Snyder's Justice League". The output of the program is:

```
Main - Before Zack Snyder's Justice League
Zack Snyder's Justice League - In the flow
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=3), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Fisher))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ray), lastName=LastName(lastName=Hardy))
Actor(id=Id(id=5), firstName=FirstName(firstName=Jason), lastName=LastName(lastName=Momoa))
Main - After Zack Snyder's Justice League
```

We effectively changed the context of the coroutine that emits the values of the flow. Whereas, if we don't change the context, the context of the coroutine that emits the values of the flow is the same as the context of main coroutine:

```kotlin
withContext(CoroutineName("Main")) {
    coroutineScope {
        val delayedJusticeLeague: Flow<Actor> =
            flow {
                println("${currentCoroutineContext()[CoroutineName]?.name} - In the flow")
                delay(1000)
                emit(henryCavill)
                delay(1000)
                emit(galGodot)
                delay(1000)
                emit(ezraMiller)
                delay(1000)
                emit(benFisher)
                delay(1000)
                emit(rayHardy)
                delay(1000)
                emit(jasonMomoa)
            }
        println(
            "${currentCoroutineContext()[CoroutineName]?.name} - Before Zack Snyder's Justice League",
        )
        delayedJusticeLeague.collect { println(it) }
        println(
            "${currentCoroutineContext()[CoroutineName]?.name} - After Zack Snyder's Justice League",
        )
    }
}
```

The following output states that the main context is passed to the lambda of the `collect` function.

Changing the context of the coroutine that executes the flow is so quite common that the Kotlin coroutines library provides a dedicated function to do that: the `flowOn` function. The `flowOn` function is used to change the context of the coroutine that emits the values of the flow. Let's rewrite out example using the `flowOn` function:

```kotlin
withContext(CoroutineName("Main")) {
    coroutineScope {
        val delayedJusticeLeague: Flow<Actor> =
            flow {
                println("${currentCoroutineContext()[CoroutineName]?.name} - In the flow")
                delay(1000)
                emit(henryCavill)
                delay(1000)
                emit(galGodot)
                delay(1000)
                emit(ezraMiller)
                delay(1000)
                emit(benFisher)
                delay(1000)
                emit(rayHardy)
                delay(1000)
                emit(jasonMomoa)
            }
        println(
            "${currentCoroutineContext()[CoroutineName]?.name} - Before Zack Snyder's Justice League",
        )
        delayedJusticeLeague.flowOn(CoroutineName("Zack Snyder's Justice League")).collect {
            println(it)
        }
        println(
            "${currentCoroutineContext()[CoroutineName]?.name} - After Zack Snyder's Justice League",
        )
    }
}
```

We can use the `flowOn` function also to change the dispatcher used to execute the flow. If it performs I/O operations, such as calling an external API or writing/reading to/from a database, we can change the dispatcher to `Dispatchers.IO`. We can create a repository interface to mimic the I/O operations:

```kotlin
interface ActorRepository {
    suspend fun findJLAActors(): Flow<Actor>
}
```

Then, we can execute the retrieval of the actors playing in the "Zack Snyder's Justice League" movie using the `Dispatchers.IO` dispatcher through the `flowOn` function:

```kotlin
val actorRepository: ActorRepository =
    object : ActorRepository {
        override suspend fun findJLAActors(): Flow<Actor> =
            flowOf(
                henryCavill,
                galGodot,
                ezraMiller,
                benFisher,
                rayHardy,
                jasonMomoa,
            )
    }
actorRepository.findJLAActors().flowOn(Dispatchers.IO).collect { actor -> println(actor) }
```

## 4. Working with Flows

As you may guess, working with flows doesn't reduce to create and consume them. In fact, we can transform them, filter them, and combine them and access to all the steps of their life cycle. 

Flows are very similar to collections in terms of the API available for transforming them. In fact, we can map, filter, and reduce them. Let's start with transforming the values emitted by a flow. We can use the `map` function. For example, we can get out of an `Actor` who played in the Justice League movie only it lastname:

```kotlin
val lastNameOfJLActors: Flow<LastName> = zackSnyderJusticeLeague.map { it.lastName }
```

Easy peasy. We can now filter this new flow retaining only the actors whose last name counts 5 characters:

```kotlin
val lastNameOfJLActors5CharsLong: Flow<LastName> =
    lastNameOfJLActors.filter { it.lastName.length == 5 }
```

We should also try to map and filter in the same step. In fact, flows provide the `mapNotNull` function that applies a transformation that can create `null` values and then filters out those `null` values:

```kotlin
val lastNameOfJLActors5CharsLong_v2: Flow<LastName> =
    zackSnyderJusticeLeague.mapNotNull {
      if (it.lastName.lastName.length == 5) {
        it.lastName
      } else {
        null
      }
    }
```

The above functions, `map` and `filter`, and many others, are expressed internally as a combination of the `flow` builder function and the `collect` terminal operation. For example, we can define the `map` function as follows:

```kotlin
fun <T, R> Flow<T>.map(transform: suspend (value: T) -> R): Flow<R> =
    flow {
        this@map.collect { value ->
            emit(transform(value))
        }
    }
```

The implementation we found in the library has some differences indeed, but the concept is the same. We're creating a new flow collecting the values of the original flow and emitting the transformation to them. If you think about the above implementation is quite elegant. since it's straightforward to understand and read. The same is for the `filter` function:

```kotlin
fun <T> Flow<T>.filter(predicate: suspend (value: T) -> Boolean): Flow<T> =
    flow {
        this@filter.collect { value ->
            if (predicate(value)) {
                emit(value)
            }
        }
    }
```

Smooth.

Usually, the third operation we find on collections/sequences after the `map` and the `filter` functions is the `fold` function. As you might guess, the `fold` function is used to reduce the values of a flow to a single value. It's a final operation, like the `collect` function, which means it suspends the current coroutine until the flow ends to emit values. It requires an initial value used to accumulate the final result. In out case we can use the `fold` function to count the number of actors playing in the "Zack Snyder's Justice League" movie. The initial value in our example is the number `0`, the unit value for the sum operation on integers:

```kotlin
val numberOfJlaActors: Int =
      zackSnyderJusticeLeague.fold(0) { currentNumOfActors, actor -> currentNumOfActors + 1 }
```

Also for the `fold` function, its implementation if very straightforward. It simply accumulates the results of the accumulation into a local variable using the value emitted by the flow through the `collect` function:

```kotlin
// Kotlin Coroutines Library
public suspend inline fun <T, R> Flow<T>.fold(
    initial: R,
    crossinline operation: suspend (acc: R, value: T) -> R
): R {
    var accumulator = initial
    collect { value ->
        accumulator = operation(accumulator, value)
    }
    return accumulator
}
```

To be fair, there is a dedicated function called `count` to count the number of elements of a finite flow. It's a terminal operation either and it returns the number of elements emitted by the flow. Then, the previous example can be rewritten as follows:

```kotlin
val numberOfJlaActors_v2: Int = zackSnyderJusticeLeague.count()
```

As you might guess, the `fold` and the `count` functions doesn't work well with infinite flows. In fact, the library gives us a dedicated function for infinite flows, the `scan` function. It works like `fold`, accumulating the emitted values. However, it emits the result of the partial accumulation of each step. Unlike the `fold` function, the `scan` function is not a terminal operation.

For sake of completeness, let's emit a value that represents the number of actors emitted by the `infiniteJLFlowActors` flow at every value emission. We can add a delay of 1 second to make the code more spicy:

```kotlin
infiniteJLFlowActors
    .onEach { delay(1000) }
    .scan(0) { currentNumOfActors, actor -> currentNumOfActors + 1 }
    .collect { println(it) }

```

The output of the program is:

```
0
(1 sec.)
1
(1 sec.)
2
(1 sec.)
3
(1 sec.)
4
(1 sec.)
5
(1 sec.)
...
```

As for the previous functions we saw, the implementation of `scan` is quite elegant and straightforward:

```kotlin
// Kotlin Coroutines Library
public fun <T, R> Flow<T>.scan(initial: R, operation: suspend (accumulator: R, value: T) -> R): Flow<R> = flow {
    var accumulator: R = initial
    emit(accumulator)
    collect { value ->
        accumulator = operation(accumulator, value)
        emit(accumulator)
    }
}
```

When dealing with infinite flows, we can always try to get the first _n_ elements of the flow and then stop the collection. The `take` function is used to do that. For example, we can get the first 3 actors playing in the "Zack Snyder's Justice League" movie:

```kotlin
infiniteJLFlowActors.take(3) 
```

The `take` function is a transformation, which means it returns a new flow just like `map` or `filter`. If the original flow was infinite, the new flow will be finite.

The `drop` function makes the opposite operation. It skips the first _n_ elements of the flow and then emits the remaining ones. For example, we can skip the first 3 actors playing in the "Zack Snyder's Justice League" movie:

```kotlin
infiniteJLFlowActors.drop(3) 
```

Clearly, dropping from the head of a flow the first _n_ elements does not reduce the cardinality of an infinite flow. The new flow will be infinite as well.

## X. How Flows Work

We have seen that flows work using two function in concert: The `emit` function allows us to produce values, and the `collect` function allows us to consume them. But, how do they work under the hood? If you're a curious Kotliner, please, follow us into the black hole of the Kotlin flow library. You will not regret it.

We'll try to rebuild the `Flow` type and the `flow` builder from scratch to understand how they work. We'll start using only lambdas and functional interfaces. Let's say we want to implement a function that prints the actors playing in the Justice League movie. We can define the following function: 

```kotlin
val flow: suspend () -> Unit = {
    println(henryCavill)
    println(galGodot)
    println(ezraMiller)
    println(benFisher)
    println(rayHardy)
    println(jasonMomoa)
}
flow()
```

We made the lambda as a suspending function because we want to have the possibility to use non blocking function. Now, we want to extend our `flow` function not only to print the emitted values, but possibly to consume them in different way. We'll consume them using a lambda passed to the `flow` function. So, The new version of the code is:

```kotlin
val flow: suspend ((Actor) -> Unit) -> Unit = { emit: (Actor) -> Unit ->
    emit(henryCavill)
    emit(galGodot)
    emit(ezraMiller)
    emit(benFisher)
    emit(rayHardy)
    emit(jasonMomoa)
}
flow { println(it) }
```

We called `emit` the input lambda to apply to each emitted value of the flow. We also specified the type of the `emit` lambda, just to be more explicit. However, the Kotlin compiler is able to infer the type of the `emit` lambda, so we can omit it in the next iteration.

We just made a crucial step in the above code. We introduced the `emit` lambda, which represents the consumer logic of the values created by the flow. So, emitting a new value equals to apply consuming logic to it. And, this concept is at the core of how the `Flow` type works. The next steps will be only make up the actual code to avoid passing lambdas around.

So, let's work on the lambda passed as input to the `flow` function. We can think to every lambda as the implementation of an interface having only one method in its contract. In this case, we can call the interface `FlowCollector`, and implementing it as follows:

```kotlin
fun interface FlowCollector {
    suspend fun emit(value: Actor)
} 
```

We made the `FlowCollector` interface a functional interface (or SAM, Single Abstract Method) to let the compiler adapting the lambda to the interface. We can now rewrite our `flow` function using the `FlowCollector` interface:

```kotlin
val flow: suspend (FlowCollector) -> Unit = {
    it.emit(henryCavill)
    it.emit(galGodot)
    it.emit(ezraMiller)
    it.emit(benFisher)
    it.emit(rayHardy)
    it.emit(jasonMomoa)
}
flow { println(it) } // <- Possible because of the SAM interface
```

Since we don't like to call the `emit` function on the `it` reference, we can change again the definition of the `flow` function. Our aim is to create a smoother DSL, letting to call the `emit` function directly. Then, we need to make the `FlowCollector` instance available as the `this` reference inside the lambda. Using the `FlowCollector` interface as the receiver of the lambda does the trick (if you want to deepen your knowledge about Kotlin receivers, please refer to the article [Kotlin Context Receivers: A Comprehensive Guide](https://blog.rockthejvm.com/kotlin-context-receivers/)):

```kotlin
val flow: suspend FlowCollector.() -> Unit = {
    emit(henryCavill)
    emit(galGodot)
    emit(ezraMiller)
    emit(benFisher)
    emit(rayHardy)
    emit(jasonMomoa)
}
flow { println(it) }
```

We're almost done. Now, we don't want to pass a function to use flows. So, it's time to lift the `flow` function to a proper type. As you can imagine, the type is the `Flow` type. We can define the `Flow` type as follows:

```kotlin
interface Flow {
    suspend fun collect(collector: FlowCollector)
}
```

If we rename our `flow` function into `builder`, we can define the `Flow` type as follows:

```kotlin
val builder: suspend FlowCollector.() -> Unit = {
    emit(henryCavill)
    emit(galGodot)
    emit(ezraMiller)
    emit(benFisher)
    emit(rayHardy)
    emit(jasonMomoa)
}

val flow: Flow = object : Flow {
    override suspend fun collect(collector: FlowCollector) {
        builder(collector)
    }
}

flow.collect { println(it) }
```

Here, we use the fact that calling a function or lambda with a receiver is equal to pass the receiver as the first argument of the function. Last but not least, we miss the original `flow` builder of the Kotlin coroutines library. We can define it as follows, moving a bit of code around:

```kotlin
fun flow(builder: suspend FlowCollector.() -> Unit): Flow =
    object : Flow {
        override suspend fun collect(collector: FlowCollector) {
            builder(collector)
        }
    }
```

Clearly, we want to define flows on every type, and not only on the `Actor` type. So, we need to add a bit of generic magic powder to the code we defined so far:

```kotlin
fun interface FlowCollector<T> {
    suspend fun emit(value: T)
}

interface Flow<T> {
    suspend fun collect(collector: FlowCollector<T>)
}

fun <T> flow(builder: suspend FlowCollector<T>.() -> Unit): Flow<T> =
    object : Flow<T> {
        override suspend fun collect(collector: FlowCollector<T>) {
            builder(collector)
        }
    } 
```

That's it. The above implementation is quite similar to the actual implementation of flows in the Kotlin coroutines library. This journey let us understand that behind flows there is not magic at all, only a bit of functional programming and a lot of Kotlin. With a deeper understanding of the `Flow` type, we can proceed to define more complex use cases using flows.


