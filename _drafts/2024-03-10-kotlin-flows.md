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

## 3. Flows Lifecycle

The Kotlin coroutines library provides a set of functions to control the lifecycle of a flow. Barely, we can add an hook function for flow creation, for each emitted element, and for the completion of the flow. 

The `onStart` function lets us adding operations to be executed when the flow is started. We pass a lambda to the `onStart` function. A good question is: When a flow is started? A flow is started when a terminal operation is called on it. We've seen the `collect` function as terminal operation so far. The lambda of the `onStart` function is executed immediately after the terminal operation. It doesn't wait the first element to be emitted. Let's make an example. We want to print a message when the flow is started. Also, we want to simulate some latency in the emission of the values.

```kotlin
val spiderMenWithLatency: Flow<Actor> = flow {
    delay(1000)
    emit(tobeyMaguire)
    emit(andrewGarfield)
    emit(tomHolland)
}
spiderMenWithLatency
    .onStart { println("Starting Spider Men flow") }
    .collect { println(it) }
```

What do we expect from the program? We expect the program to print the message "Starting Spider Men flow" immediately and then, after 1 second, the actors playing. Indeed, the output of the program is exactly what we expect:

```
Starting Spider Men flow
(1 sec.)
Actor(id=Id(id=13), firstName=FirstName(firstName=Tobey), lastName=LastName(lastName=Maguire))
Actor(id=Id(id=14), firstName=FirstName(firstName=Andrew), lastName=LastName(lastName=Garfield))
Actor(id=Id(id=12), firstName=FirstName(firstName=Tom), lastName=LastName(lastName=Holland))
```

Let's see the definition of the `onStart` function:

```kotlin
// Kotlin Coroutines Library
public fun <T> Flow<T>.onStart(
    action: suspend FlowCollector<T>.() -> Unit
): Flow<T>
```

First, we see that the `onStart` function is an extension function defined on a `Flow<T>` receiver. However, the interesting thing is that the `action` lambda has a `FlowCollector<T>` as receiver, which means that we can emit values inside it. As an example, we can add the emission of Paul Robert Soles, the actor who played the voice of the Spider Man in the 1967 animated series, in the `onStart` function:

```kotlin
spiderMenWithLatency
    .onStart { emit(Actor(Id(15), FirstName("Paul"), LastName("Soles"))) }
    .collect { println(it) }
```

The output of the program will add the actor Paul Robert Soles to the list of the actors playing:

```
Actor(id=Id(id=15), firstName=FirstName(firstName=Paul), lastName=LastName(lastName=Soles))
Actor(id=Id(id=13), firstName=FirstName(firstName=Tobey), lastName=LastName(lastName=Maguire))
Actor(id=Id(id=14), firstName=FirstName(firstName=Andrew), lastName=LastName(lastName=Garfield))
Actor(id=Id(id=12), firstName=FirstName(firstName=Tom), lastName=LastName(lastName=Holland))
```

On the other hand, the `onEach` function is used to apply a lambda to each value emitted by the flow. The function has the same features of the `onStart` function, which means it accept a lambda with a `FlowCollector<T>` as receiver as input. As we previously saw, the `FlowCollector<T>` let us emit new values inside the lambda.

Let's say we want to add a delay of one second between the emission of each actors playing the Spider Man role. We can use the `onEach` function to add the delay:

```kotlin
spiderMen
    .onEach { delay(1000) }
    .collect { println(it) }
```

As you may guess, we can use the `onEach` function as a surrogate of the `collect` function. In fact, we can pass to the lambda we would have passed to the `collect` function to the `onEach` function. At this point, calling `collect` will trigger the effective execution of the flow. For example, we can rewrite the previous example as follows:

```kotlin
spiderMen.onEach { 
    delay(1000)
    println(it)
}.collect()
```

To be fair, the above approach is quite common in the Kotlin community since it produces code that is more close to the use of other collections in Kotlin.

Finally, we can add some behavior at the end of the flow, after all its values have been emitted. We can use the `onCompletion` function to add a lambda to be executed when the flow is completed. Again, the lambda passed to the function has a `FlowCollector<T>` as receiver, so we can emit additional value at the end of the flow execution. For example, we can use the `onCompletion` function to print a message when the flow is completed:

```kotlin
spiderMen
    .onEach {
      println(it)
    }
    .onCompletion { println("End of the Spider Men flow") }
    .collect()
```

Nothing new under the sun. The above code will produce the following output when executed:

```
Actor(id=Id(id=13), firstName=FirstName(firstName=Tobey), lastName=LastName(lastName=Maguire))
Actor(id=Id(id=14), firstName=FirstName(firstName=Andrew), lastName=LastName(lastName=Garfield))
Actor(id=Id(id=12), firstName=FirstName(firstName=Tom), lastName=LastName(lastName=Holland))
End of the Spider Men flow
```

What if during the execution of the flow an exception is thrown? Let's see what the library does for us in the next section.

## 4. Flows Error Handling

If something can possibly go wrong, it will. Flows execution is no exception. In fact, the Kotlin coroutines library provides a set of functions to handle errors during the execution of a flow.

The first ring bell that something went wrong during the execution of a flow is that it didn't emit any value. It's quite uncommon to build intentionally flows that don't emit anything. The Kotlin coroutines library provides a function to handle the case of an empty flow: the `onEmpty` function. The function is similar to the functions we saw in the previous section that handle a flow lifecycle. It has a lambda with a `FlowCollector<T>` as receiver as input, which makes the `onEmpty` function a good candidate to emit some default value for an empty flow:

```kotlin
val actorsEmptyFlow =
    flow<Actor> { delay(1000) }
        .onEmpty {
            println("The flow is empty, adding some actors")
            emit(henryCavill)
            emit(benAffleck)
        }
        .collect { println(it) } 
```

The output of the program doesn't surprise us:

```
(1 sec.)
The flow is empty, adding some actors
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Affleck))
```

It's possible to create an empty flow also using a dedicated builder, called `emptyFlow`. The `emptyFlow` function returns a flow that doesn't emit any value. We can rewrite the above example using the `emptyFlow` function as follows:

```kotlin
val actorsEmptyFlow_v2 =
    emptyFlow<Actor>()
        .onStart { delay(1000) }
        .onEmpty {
            println("The flow is empty, adding some actors")
            emit(henryCavill)
            emit(benAffleck)
        }
        .collect { println(it) }
```

Another common case is when and exceptions raises during the execution of a flow. First, let's see what happens if we don't use any recovering mechanism. Our example will print the actors playing Sprider Men, but during the emission of the actors we'll throw an exception:

```kotlin
val spiderMenActorsFlowWithException =
    flow {
        emit(tobeyMaguire)
        emit(andrewGarfield)
        throw RuntimeException("An exception occurred")
        emit(tomHolland)
    }
    .onStart { println("The Spider Men flow is starting") }
    .onCompletion { println("The Spider Men flow is completed") }
    .collect { println(it) }
```

If we execute the program, we'll see the following output:

```
The Spider Men flow is starting
Actor(id=Id(id=13), firstName=FirstName(firstName=Tobey), lastName=LastName(lastName=Maguire))
Actor(id=Id(id=14), firstName=FirstName(firstName=Andrew), lastName=LastName(lastName=Garfield))
The Spider Men flow is completed
Exception in thread "main" java.lang.RuntimeException: An exception occurred
...
```

What can we see from the above output? First, that an exception in the flow execution breaks it and avoid the emission of the values after the exception. To be fair, the coroutine executing the suspending lambda function passed to the `collect` function is cancelled by the exception (see next sections for further details) that will bubble up to the context that called the `collect` function. Second, that the `onCompletion` function is called even if an exception is thrown during the execution of the flow. So, the `onCompletion` function is called when the flow is completed, no matter if an exception is thrown or not. We can think about it as a `finally` block.

Can we catch the exception in some way and recover from it? Yep, we can. The library provides a `catch` method that we can chain to the flow to handle exceptions. The `catch` function is defined as follows:

```
// Kotlin Coroutines Library
public fun <T> Flow<T>.catch(action: suspend FlowCollector<T>.(cause: Throwable) -> Unit): Flow<T>
```

It takes a lambda that is called when an exception is thrown during the execution of the flow. The lambda has a `Throwable` as input, so we can inspect the exception and decide what to do. We can also emit a value since the lambda has the `FlowCollector<T>` as the receiver.

We can now change the previous example to catch the exception and emit a default value:

```kotlin
val spiderMenActorsFlowWithException_v3 =
        flow {
            emit(tobeyMaguire)
            emit(andrewGarfield)
            throw RuntimeException("An exception occurred")
            emit(tomHolland)
        }
        .catch { ex -> emit(tomHolland) }
        .onStart { println("The Spider Men flow is starting") }
        .onCompletion { println("The Spider Men flow is completed") }
        .collect { println(it) }
```

The `catch` function will intercept the `RuntimeException` and will emit the `tomHolland` actor value. The output of the program will be:

```
The Spider Men flow is starting
Actor(id=Id(id=13), firstName=FirstName(firstName=Tobey), lastName=LastName(lastName=Maguire))
Actor(id=Id(id=14), firstName=FirstName(firstName=Andrew), lastName=LastName(lastName=Garfield))
Actor(id=Id(id=12), firstName=FirstName(firstName=Tom), lastName=LastName(lastName=Holland))
The Spider Men flow is completed
```

So far so good. Another important feature of the `catch` function is that it catches all the exceptions thrown during the executions of the transformations chained to the flow before it. Let's make an example. The following code will throw an exception that will be easily handled by the `catch` function:

```kotlin
val spiderMenNames =
    flow {
        emit(tobeyMaguire)
        emit(andrewGarfield)
        emit(tomHolland)
    }
    .map {
        if (it.firstName == FirstName("Tom")) {
            throw RuntimeException("Ooops")
        } else {
            "${it.firstName.firstName} ${it.lastName.lastName}"
        }
    }.catch { ex -> emit("Tom Holland") }
    .map { it.uppercase(Locale.getDefault()) }
    .collect { println(it) }
```

The execution of the above flow will produce the expected output:

```
TOBEY MAGUIRE
ANDREW GARFIELD
TOM HOLLAND
```

What will happen if the move the throwing of the exception after the `catch` function? Let's see:

```kotlin
val spiderMenNames =
    flow {
          emit(tobeyMaguire)
          emit(andrewGarfield)
          emit(tomHolland)
        }
    .map { "${it.firstName.firstName} ${it.lastName.lastName}" }
    .catch { ex -> emit("Tom Holland") }
    .map {
        if (it == "Tom Holland") {
            throw RuntimeException("Oooops")
        } else {
            it.uppercase(Locale.getDefault())
        }
    }
    .collect { println(it) }
```

Nothing will catch the exception thrown by the second `map` function, and the flow will be cancelled and the exception will bubble up. IN fact, the output of the program is the following:

```
TOBEY MAGUIRE
ANDREW GARFIELD
Exception in thread "main" java.lang.RuntimeException: Oooops
...
```

So, we can think about the `catch` function as a `catch` block that handles all the exceptions thrown before it in the chain. For this reason, the `catch` function can't catch the exceptions thrown by the `collect` function since it's the terminal operation of the flow: 

```kotlin
val spiderMenActorsFlowWithException =
    flow {
        emit(tobeyMaguire)
        emit(andrewGarfield)
        emit(tomHolland)
    }
    .catch { ex -> println("I caught an exception!") }
    .onStart { println("The Spider Men flow is starting") }
    .onCompletion { println("The Spider Men flow is completed") }
    .collect { 
        if (true) throw RuntimeException("Oooops")
        println(it) 
    }
```

The above code will produce the following output, which means the flow was eagerly terminated by the exception thrown by the `collect` function and not intercepted by the `catch` function:

```
The Spider Men flow is starting
The Spider Men flow is completed
Exception in thread "main" java.lang.RuntimeException: Oooops
...
```

The only way we have to prevent this case is to move the `collect` logic into a dedicated `onEach` function, and put a `catch` in the chain after the `onEach` function. We can rewrite the above example as follows:

```kotlin
val spiderMenActorsFlowWithException =
    flow {
        emit(tobeyMaguire)
        emit(andrewGarfield)
        emit(tomHolland)
    }
    .onEach {
        if (true) throw RuntimeException("Oooops")
        println(it)
    }
    .catch { ex -> println("I caught an exception!") }
    .onStart { println("The Spider Men flow is starting") }
    .onCompletion { println("The Spider Men flow is completed") }
    .collect()
```

As we can see from the following output produced by the execution of the above example, the exception is caught by the `catch` function:

```
The Spider Men flow is starting
I caught an exception!
The Spider Men flow is completed
```

We saw how to handle an exception thrown during the lifecycle of a flow. However, in all the above example, catched or not, the thrown exception ended the flow. What if we want to embrace the fact that an operation can fail now and then, and we want to retry it? We can think to the call to an external service that requires a communication over the net. The network connection can be temporarly broken, the service can be temporarly unavailable due to high traffic, and so on. It's common that making a new retry of the operation can solve the problem. The Kotlin coroutines library provides a function to retry the execution of a flow in case of an exception: the `retry` function.

The `retry` function is defined as follows:

```kotlin
// Kotlin Coroutines Library
public fun <T> Flow<T>.retry(
    retries: Long = Long.MAX_VALUE,
    predicate: suspend (cause: Throwable) -> Boolean = { true }
): Flow<T>
```

The first parameter is the number of retries to make. The second parameter is a lambda that takes a `Throwable` as input and returns a `Boolean`. The lambda is used to decide if the operation should be retried or not. The default value of the `predicate` parameter is a lambda that always returns `true`, so the operation is always retried.

Let's make a real example. We can create a repository interface to mimic the I/O operations over the network:

```kotlin
interface ActorRepository {
    suspend fun findJLAActors(): Flow<Actor>
}
```

We can implement the repository in a quite naive way for our purposes:

```kotlin
val actorRepository: ActorRepository =
    object : ActorRepository {
        var retries = 0
        override suspend fun findJLAActors(): Flow<Actor> = flow {
            emit(henryCavill)
            emit(galGodot)
            emit(ezraMiller)
            if (retries == 0) {
                retries++
                throw RuntimeException("Oooops")
            }
            emit(benFisher)
            emit(benAffleck)
            emit(jasonMomoa)
        }
    }
```

Basically, the execution of the `findJLAActors` function will throw an exception the first time it's called. The second time, it will emit all the actors playing in the "Zack Snyder's Justice League" movie. The above example mimics a temporary network glitch. We can now use the `retry` function to retry the execution of the `findJLAActors` function and print all the actors playing in the movie:

```kotlin
actorRepository
    .findJLAActors()
    .retry(2)
    .collect { println(it) }
```

We'll retry 2 times to call the `findJLAActors` function. So, we expect the first attempt to print the first 2 actors, and the second attempt to print all the list. In fact, the output of the program is what we expect:

```
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=3), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Fisher))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Affleck))
Actor(id=Id(id=5), firstName=FirstName(firstName=Jason), lastName=LastName(lastName=Momoa))
```

However, in such cases it's common and good practice to wait a bit between the retries to let the glitch to be resolved. We can add a delay in the lambda passed to the `retry` function:

```kotlin
actorRepository
    .findJLAActors()
    .retry(2) { ex ->
        println("An exception occurred: '${ex.message}', retrying...")
        delay(1000)
        true
    }
    .collect { println(it) }
```

In this case, we also add a log. Please, remember to say that the function should be retried or not returning the proper boolean value. Running the above code will make the fact an exception occurred more evident:

```
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
An exception occurred: 'Oooops', retrying...
(1 sec.)
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=3), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Fisher))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Affleck))
Actor(id=Id(id=5), firstName=FirstName(firstName=Jason), lastName=LastName(lastName=Momoa))
```

Having the cause of the exception in input, we can always decide to retry or not based on the exception type.

In real-world scenario we will use a more sophisticated backoff policy and avoid retrying multiple times using the same interval. We need the current attempt number to implement such policies. To be fair, the `retry` function is a easier version of the more general `retryWhen` function that accept a lambda with two parameters as input: the exception and the attempt number. The `retryWhen` function is defined as follows:

```kotlin
// Kotlin Coroutines Library
public fun <T> Flow<T>.retryWhen(
    predicate: suspend FlowCollector<T>.(cause: Throwable, attempt: Long) -> Boolean): Flow<T> =
```

We can rewrite the previous example using the `retryWhen` function as follows, retrying with an increasing delay between the attempts: 

```kotlin
actorRepository
    .findJLAActors()
    .retryWhen { cause, attempt ->
        println("An exception occurred: '${cause.message}', retry number $attempt...")
        delay(attempt * 1000)
        true
    }
    .collect { println(it) }
```

And, that's all for the error handling in flows.

## 5. Working with Flows

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

## 6. Flows and Coroutines

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

## 7. Racing Flows

In the previous sections we focused on working with one flow. However, flows are a very nice data structure to work with concurrency. The first operation we'll analyzed is the `merge` function. It lets us run two flows concurrently, collecting the results in a single flow as they are produced. Neither of the two streams waits for the other to emit a value. For example, let's merge the JLA flow and the Avenger flow:

```kotlin
val zackSnyderJusticeLeague: Flow<Actor> =
    flowOf(
        henryCavill,
        galGodot,
        ezraMiller,
        benFisher,
        benAffleck,
        jasonMomoa,
    ).onEach { delay(400) }

val avengers: Flow<Actor> =
    flowOf(
        robertDowneyJr,
        chrisEvans,
        markRuffalo,
        chrisHemsworth,
        scarlettJohansson,
        jeremyRenner,
    ).onEach { delay(200) }

merge(zackSnyderJusticeLeague, avengers).collect{ println(it) }
```

The execution of the program will produce the following output:

```
Actor(id=Id(id=6), firstName=FirstName(firstName=Robert), lastName=LastName(lastName=Downey Jr.))
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
Actor(id=Id(id=7), firstName=FirstName(firstName=Chris), lastName=LastName(lastName=Evans))
Actor(id=Id(id=8), firstName=FirstName(firstName=Mark), lastName=LastName(lastName=Ruffalo))
Actor(id=Id(id=1), firstName=FirstName(firstName=Gal), lastName=LastName(lastName=Godot))
Actor(id=Id(id=9), firstName=FirstName(firstName=Chris), lastName=LastName(lastName=Hemsworth))
Actor(id=Id(id=10), firstName=FirstName(firstName=Scarlett), lastName=LastName(lastName=Johansson))
Actor(id=Id(id=2), firstName=FirstName(firstName=Ezra), lastName=LastName(lastName=Miller))
Actor(id=Id(id=11), firstName=FirstName(firstName=Jeremy), lastName=LastName(lastName=Renner))
Actor(id=Id(id=3), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Fisher))
Actor(id=Id(id=4), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Affleck))
Actor(id=Id(id=5), firstName=FirstName(firstName=Jason), lastName=LastName(lastName=Momoa))
```

As we may expect, the flow contains an actor of the JLA more or less every two actors of the Avengers. Once the Avengers actors are finished, the JLA actors fulfill the rest of the flow. In fact, the execution halts when both flow have finished emitting all their values.

The `merge` function is the first transformation we see that is not defined as an extension function of the `Flow` type. In fact, it's defined as a top-level function in the `Kotlinx.coroutines.flow` package. The `merge` function is defined as follows:

```kotlin
public fun <T> merge(vararg flows: Flow<T>): Flow<T>
```

As we can see, it receives an array of flows as input. So, we can merge and race the execution of more than two flows.

Sometimes, we need to work with pairs of emitted value coming from both the flows. Imagine a scenario where we want to retrieve for an actor his/her biography and filmography. The two information is retrieved from different services and we want to get them concurrently and proceed in the execution only when both are available. The `zip` function is used to do that. 

First, we define a flow retrieving the biography of Henry Cavill:

```kotlin
val henryCavillBio =
    flow {
        delay(1000)
        val biography =
            """
      Henry William Dalgliesh Cavill was born on the Bailiwick of Jersey, a British Crown dependency 
      in the Channel Islands. His mother, Marianne (Dalgliesh), a housewife, was also born on Jersey, 
      and is of Irish, Scottish and English ancestry...
    """.trimIndent()
        emit(biography)
    }
```

We delay the emission of the biography to simulate the time needed to retrieve it. Then, we define a flow retrieving the filmography of Henry Cavill:

```kotlin
val henryCavillMovies =
    flow {
        delay(2000)
        val movies = listOf("Man of Steel", "Batman v Superman: Dawn of Justice", "Justice League")
        emit(movies)
    }
```

Again, we used a delay to simulate the time needed to retrieve the filmography. Now, we can zip the two flows to get the biography and the filmography of Henry Cavill and print out the result:

```kotlin
henryCavillBio
    .zip(henryCavillMovies) { bio, movies -> bio to movies }
    .collect { (bio, movies) ->
        println(
            """
            Henry Cavill
            ------------
            BIOGRAPHY:
              $bio
              
            MOVIES:
              ${movies.joinToString("\n                  ")}
            """.trimIndent(),
        )
    }
```

The output of the program is:

```
                Henry Cavill
                ------------
                BIOGRAPHY:
                  Henry William Dalgliesh Cavill was born on the Bailiwick of Jersey, a British Crown dependency 
in the Channel Islands. His mother, Marianne (Dalgliesh), a housewife, was also born on Jersey, 
and is of Irish, Scottish and English ancestry...
                  
                MOVIES:
                  Man of Steel
                  Batman v Superman: Dawn of Justice
                  Justice League

Process finished with exit code 0
```

As we may guess, the program printed the biography and the filmography of Henry Cavill after more or less 2 seconds since it has to wait that both the flows have emitted their values. Be aware that the `zip` function requires pairs of values. So, the resulting flow stops when the shortest of the two flows stops emitting values. If we zip a flow with the empty flow, the resulting flow will be empty as well. In fact, the following zipped flow doesn't emit any value:

```kotlin
henryCavillBio
    .zip(emptyFlow<List<String>>()) { bio, movies -> bio to movies }
    .collect { (bio, movies) ->
        println(
            """
            Henry Cavill
            ------------
            BIOGRAPHY:
              $bio
              
            MOVIES:
              $movies
            """.trimIndent(),
        )
    }
```

In the section dedicated to flow transformation we didn't introduce any flavour of `flatMap` function. It's quite common for data structures representing a collection of values to offer such a function. However, the emission of values in a flow can be delayed or even stopped. So, it's not straightforward to come up with a proper implementation of the `flatMap` function. We need to understand which flow has the precedence over the other. 

The Kotlin coroutine library comes up with 3 different implementations of the `flatMap` function: `flatMapConcat`, `flatMapMerge`, and `flatMapLatest`. We'll focus on the first two functions since they are the most used.

The `flatMapConcat` function process the emitted values of the first flow and for each the associated emitted values of the second flow. In other words, it waits for the second flow to emit all its values before processing the next value of the first flow. It's defined as follows in the coroutine library:

```kotlin
@ExperimentalCoroutinesApi
public fun <T, R> Flow<T>.flatMapConcat(transform: suspend (value: T) -> Flow<R>): Flow<R>
```

The definition is quite common for an function belonging to the family of `flatMap` functions. 

Let's make an example now. We'll extend a bit the flow containing the biographies of the actors who played the Justice League movie. First of all, we add a repository returning biographies of actors:

```kotlin
interface BiographyRepository {
    suspend fun findBio(actor: Actor): Flow<String>
}

val biographyRepository: BiographyRepository =
    object : BiographyRepository {
        val biosByActor =
            mapOf(
                henryCavill to
                        listOf(
                            "1983/05/05",
                            "Henry William Dalgliesh Cavill was born on the Bailiwick of Jersey, a British Crown",
                            "Man of Steel, Batman v Superman: Dawn of Justice, Justice League",
                        ),
                benAffleck to
                        listOf(
                            "1972/08/15",
                            "Benjamin Géza Affleck-Boldt was born on August 15, 1972 in Berkeley, California.",
                            "Argo, The Town, Good Will Hunting, Justice League",
                        ),
            )
        override suspend fun findBio(actor: Actor): Flow<String> =
            biosByActor[actor]?.asFlow() ?: emptyFlow()
    }
```

For the sake of simplicity, we added only the biographies of Henry Cavill and Ben Affleck. As we can see, the `findBio` function returns the biography of an actor as a flow: First his/her date of birth, them a brief introduction, and finally a small list of movies he/she played in.

Now, we want to create a flow emitting only the actors `henryCavill` and `benAffleck`, and for each of them retrieving the biography. The `flatMapConcat` function is all that we need:

```kotlin
actorRepository
    .findJLAActors()
    .filter { it == benAffleck || it == henryCavill }
    .onEach { actor -> println(actor)}
    .flatMapConcat { actor -> biographyRepository.findBio(actor)}
```

As we said, the `flatMapConcat` function will take the first argument of the first flow, in this case `henryCavill`, and will wait for the second flow to emit all its values before processing the next value of the first flow. In fact, the output of the program is:

```
Actor(id=Id(id=1), firstName=FirstName(firstName=Henry), lastName=LastName(lastName=Cavill))
1983/05/05
Henry William Dalgliesh Cavill was born on the Bailiwick of Jersey, a British Crown
Man of Steel, Batman v Superman: Dawn of Justice, Justice League
Actor(id=Id(id=4), firstName=FirstName(firstName=Ben), lastName=LastName(lastName=Affleck))
1972/08/15
Benjamin Géza Affleck-Boldt was born on August 15, 1972 in Berkeley, California.
Argo, The Town, Good Will Hunting, Justice League
```

The `flatMapMerge` function is the second implementation of the `flatMap` function. It processes the emitted values of the first flow and for each the associated emitted values of the second flow. However, it doesn't wait for the second flow to emit all its values before processing the next value of the first flow. In other words, the values of the inner flow are processed concurrently. The `flatMapMerge` function is defined as follows in the coroutine library:

```kotlin
@ExperimentalCoroutinesApi
public fun <T, R> Flow<T>.flatMapMerge(
    concurrency: Int = DEFAULT_CONCURRENCY,
    transform: suspend (value: T) -> Flow<R>
): Flow<R>
```

Unlike the definition of the `flatMapConcat`, the `flatMapMerge` add an input parameter, which is the number of concurrent operations we want to be executed. The default value is `DEFAULT_CONCURRENCY`, which is equal to the number of available processors. The default value of concurrency is 16 and it can be changed using the `kotlinx.coroutines.flow.defaultConcurrency` JVM property. Despite the concurrency degree, the rest of the definition is quite usual for a `flatMap` function.

Now, we need an example to play with. This time, we want to simulate a repository that, given an actor, returns the small list of movies he/she played in. We can define the repository as follows:

```kotlin
val movieRepository =
    object : MovieRepository {
        val filmsByActor: Map<Actor, List<String>> =
            mapOf(
                henryCavill to
                    listOf("Man of Steel", "Batman v Superman: Dawn of Justice", "Justice League"),
                benAffleck to listOf("Argo", "The Town", "Good Will Hunting", "Justice League"),
                galGodot to listOf("Fast & Furious", "Justice League", "Wonder Woman 1984"),
            )
        override suspend fun findMovies(actor: Actor): Flow<String> = 
            filmsByActor[actor]?.asFlow() ?: emptyFlow()
    }
```

We can create a flow emitting only the actors `henryCavill`, `benAffleck`, and `galGodot`, and for each of them retrieving the list of movies they played in. We can use the `flatMapMerge` function to do that:

```kotlin
actorRepository
    .findJLAActors()
    .filter { it == benAffleck || it == henryCavill || it == galGodot }
    .flatMapMerge { actor ->
        movieRepository.findMovies(actor).onEach { delay(1000) }
    }
    .collect { println(it) }
```

We added some delay between two calls to the `findMovies` to make the program more spicy. We run the program without setting the degree of concurrency, and one of the possible outputs is the following:

```
Fast & Furious
Argo
Man of Steel
The Town
Batman v Superman: Dawn of Justice
Justice League
Wonder Woman 1984
Justice League
Good Will Hunting
Justice League
```

As we can see, the list of movies is randomly created from the merge of the original lists. For example, the "Fast & Furious" movie belongs to Gal Godot, which emitted as the second value by the first flow. Then, we have a film of Ben Affleck, and then we have the first movie of Henry Cavill. The program continues in this way until all the movies are emitted.

We can set the level of concurrency to 1, and we can see that the output will be linearized, printing all the films of an actor before moving to the next one:

```
Man of Steel
Batman v Superman: Dawn of Justice
Justice League
Fast & Furious
Justice League
Wonder Woman 1984
Argo
The Town
Good Will Hunting
Justice League
```

We've got the same result as the `flatMapConcat` function. 

The `flatMapMerge` function is very useful when we have to deal with I/O operations on a collection of information. In fact, we can set the level of concurrency to the number of available processors to maximize the performance of the program or even to fine tune the maximum level of resources we want to use. Another approach could have been using the [`async` coroutine builder](https://blog.rockthejvm.com/kotlin-coroutines-101/#52-the-async-builder) for each value the collection:

```kotlin
coroutineScope {
    listOf(henryCavill, galGodot, benAffleck).map {
        async { movieRepository.findMovies(it).onEach { delay(1000) } }
    }.flatMap {
        it.await()
    }
}
```

Clearly, here we're working with a slightly modified version of the `findMovies` function returning a list of movies and not a flow. However, using the `async` builder it's harder to have control over the level of concurrency. Plus, we can emit each movie as soon as it's available, and not waiting for all the movies of an actor to be available.

## R. Flows Are Cold Data Sources

As you might guess, flow represent a cold data source, which means that values of are calculated on demand. In detail, flows start emitting values when the first terminal operation is reached, i.e. the `collect` function is called. However, we often have to deal with hot data sources, where the values are emitted independently from the presence of a collector. For example, think about a Kafka consumer or a WebSocket server. 

Does it mean that we can't use flows to managed hot data sources? Well, we can. There are certain kinds of flow that are actually used to managed hot data sources, such as `channelFlow`, `callbackFlow`, `StateFlow`, and `SharedFlow`. All those functions and type bridge the domain of cold flows with the data structure that was thought to managed hot data source in the Kotlin coroutines library: `Channel`s.

Since the focus of this  article is to introduce the main features of flows, we left for a future work the description of the hot data sources available in the library.

## 8. Conclusions

Ladies and gentlemen, we reach the end of the article. We hope you enjoyed the journey into the world of flows. We saw how to create flows, how to consume them, and how to work with them, both synchronously and concurrently. In the following appendix, we'll also delve into the internals of flows to understand how they work under the hood. We only left out how to manage hot data sources using flows, but we'll return on the topic in a future post. We hope you found the article useful and that you learned something new. If you have any questions or feedback, please let us know. We're always happy to hear from you.

## 9. Appendix: How Flows Work

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

## 10. Appendix: Gradle Configuration

As promised, here is the complete Gradle configuration we used in this article:

```kotlin
plugins {
    id("org.jetbrains.kotlin.jvm") version "1.9.22"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
```


