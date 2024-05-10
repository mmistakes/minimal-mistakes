---
title: "Kotlin Coroutines - A Comprehensive Introduction"
date: 2023-01-03
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [kotlin, coroutines, concurrency]
excerpt: "Kotlin coroutines are a powerful tool for asynchronous programming, and they fall under the umbrella of structured concurrency. Let's check out their main features and strengths in this tutorial."
---

_This article is brought to you by [Riccardo Cardin](https://github.com/rcardin). Riccardo is a proud alumnus of Rock the JVM, now a senior engineer working on critical systems written in Scala and Kotlin._

_Enter Riccardo:_

This article introduces Kotlin coroutines, a powerful tool for asynchronous programming. Kotlin's coroutines fall under the umbrella of structured concurrency. They implement a model of concurrency which you can consider similar to Java virtual threads, [Cats Effect](https://blog.rockthejvm.com/cats-effect-fibers/) and [ZIO fibers](https://blog.rockthejvm.com/zio-fibers/). In detail, we'll present some use cases concerning the use of coroutines on backend services, not on the Android environment.

The article requires existing knowledge of Kotlin.

> Coroutines can be tough. If you need to get the Kotlin fundamentals **fast** and with thousands of lines of code and a project under your belt, you'll love [Kotlin Essentials](https://rockthejvm.com/p/kotlin-essentials). It's a jam-packed course on **everything** you'll ever need to work with Kotlin for any platform (Android, native, backend, anything), including less-known techniques and language tricks that will make your dev life easier. Check it out [here](https://rockthejvm.com/p/kotlin-essentials).

## 1. Background and Setup

All the examples we'll present requires at least version 1.7.20 of the Kotlin compiler and version 1.6.4 of the Kotlin Coroutines library. The basic building blocks of coroutines are available in the standard library. The full implementation of the structured concurrency model is in an extension library called `kotlinx-coroutines-core`.

We'll use a Maven file to resolve dependency and build the code. We shared an example of `pom.xml` file at the end of this article. It's also possible to create a similar building file for Gradle, but we'll stick to Maven for simplicity.

During the article, we'll use an Slf4j logger to print the output of the code instead of using the `println` function:

```kotlin
val logger: Logger = LoggerFactory.getLogger("CoroutinesPlayground")
```

The logger allows us to easily trace the id of the coroutine running the code and the thread's name executing it. Remember: To see the identifier of the coroutine, we need to add the following VM property when running the code:

```
-Dkotlinx.coroutines.debug
```

For example, with the above setup, we will have the following output:

```text
14:59:20.741 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Boiling water
```

In the above example, the `DefaultDispatcher-worker-1` represents the thread's name. The `coroutine` string is the default coroutine name, whereas the `#2` string represents the identifier.

## 2. Why Coroutines?

The first question that comes to mind is: why should we use coroutines? The answer is simple: coroutines are a powerful tool for asynchronous programming. Someone could argue that we already have the `Thread` abstraction in the JVM ecosystem that models an asynchronous computation. However, **threads that the JVM maps directly on OS threads are heavy**. For every thread, the OS must allocate a lot of context information on the stack. Moreover, every time a computation reaches a blocking operation, the underneath thread is paused, and the JVM must load the context of another thread. The context switch is costly, so we should avoid blocking operations in our code.

On the other end, as we will see, **coroutines are very lightweight**. They are not mapped directly on OS threads but at the user level, with simple objects called _continuations_. Switching between coroutines does not require the OS to load another thread's context but to switch the reference to the continuation object.

Another good reason to adopt **coroutines** is that they **are a way to write asynchronous code in a synchronous fashion**.

As an alternative, we can use callbacks. However, callbacks are not very elegant, and they are not composable. Moreover, it's not very easy to reason about them. It's easy to end up in a *callback hell*, where the code is tough to read and maintain:


```kotlin
a(aInput) { resultFromA ->
  b(resultFromA) { resultFromB ->
    c(resultFromB) { resultFromC ->
      d(resultFromC) { resultFromD ->
        println("A, B, C, D: $resultFromA, $resultFromB, $resultFromC, $resultFromD")
      }
    }
  }
}
```

The example above shows the execution of four functions using the callback style. As we can see, collecting the four values returned by the four functions takes a lot of work. Moreover, the code could be easier to read and maintain.

Another model that is used in asynchronous programming is reactive programming. However, the problem is that it needs to produce more complex code to understand and maintain. Let's take, for example, the following code snippet from the official documentation of the RxJava library:

```java
Flowable.fromCallable(() -> {
    Thread.sleep(1000); //  imitate expensive computation
    return "Done";
})
  .subscribeOn(Schedulers.io())
  .observeOn(Schedulers.single())
  .subscribe(System.out::println, Throwable::printStackTrace);
```

The above code simulates the run of some computation, and network request on a background thread, showing the results (or error) on the UI thread. It's not self-explanatory, and we need to know the library well to understand what's happening.

Coroutines solve all the above problems. Let's see how.

## 3. Suspending Functions

To start, you can think of a coroutine as a lightweight thread, which means it's not mapped directly to an OS thread. It's a computation that can be suspended and resumed at any time. So, before we can start looking at how to build a coroutine, we need to understand how to suspend and resume a coroutine.

**Kotlin provides the `suspend` keyword to mark a function that can suspend a coroutine**, i.e. allow it to be paused & resumed later:

```kotlin
suspend fun bathTime() {
  logger.info("Going to the bathroom")
  delay(500L)
  logger.info("Exiting the bathroom")
}
```

If you're a Scala geek and have been following us for a while, you may notice the example is the same as the [ZIO Fibers article](https://blog.rockthejvm.com/zio-fibers/) - a great opportunity for you to see how coroutines are different from fibers.

The `delay(timeMillis: Long)` function is a `suspend` that suspends a coroutine for `timeMillis` milliseconds. A `suspend` function can be called only from a coroutine or another `suspend` function. It can be suspended and resumed. In the example above, the `bathTime` function can be suspended when the coroutine executes the `delay` function. Once resumed, the `bathTime` function will continue its execution from the line immediately after the suspension.

The above mechanism is wholly implemented in the Kotlin runtime, but how is it possible? Without going too deep into coroutines' internals, **the whole context of the suspending function is saved in an object of type `Continuation<T>`**. The `T` type variable represents the function's return type. The continuation contains all the state of the variables and parameters of the function. Moreover, it includes a label that stores the point where the execution was suspended. So, the Kotlin compiler will rewrite every suspending function adding a parameter of type `Continuation` to the function signature. The signature of our `bathTime` function will be rewritten as follows:

```kotlin
fun bathTime(continuation: Continuation<*>): Any
```

Why the compiler also changes the return type? The answer is that when the `suspend` function is suspended, it cannot return the value of the function. Still, it must return a value that marks that the function was suspended, `COROUTINE_SUSPENDED`.

Inside the `continuation` object, the compiler will save the state of the execution of the function. Since we have no parameters and no internal variables, the continuation stores only a label marking the advance of the execution. For the sake of simplicity, let's introduce a `BathTimeContinuation` type to store the context of the function.

In our example, the runtime can call the `bathTime` function at the beginning or after the `delay` function. If we use an `Int` label, we can represent the two possible states of the function as follows:

```kotlin
fun bathTime(continuation: Continuation<*>): Any {
    val continuation =
      continuation as? BathTimeContinuation ?: BathTimeContinuation(continuation)
    if (continuation.label == 0) {
      logger.info("Going to the bathroom")
      continuation.label = 1
      if (delay(500L, continuation) == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED
    }
    if (continuation.label == 1) {
      logger.info("Exiting the bathroom")
    }
    error("This line should never be reached")
}
```

Well, a lot of things are happening here. First, we must check if the `continuation` object is of type `BathTimeContinuation`. If not, we create a new `BathTimeContinuation` object, passing the `continuation` object as a parameter. We create a new continuation instance when the `bathTime` function is called for the first time. As we can see, continuations are like onions: **Every time we call a suspending function, we wrap the continuation object in a new one**.

Then, if the `label` is `0`, we print the first message and set the label to `1`. Then, we call the `delay` function, passing the continuation object. If the `delay` function returns `COROUTINE_SUSPENDED`, it means that the function was suspended, and we return `COROUTINE_SUSPENDED` to the caller. Suppose the `delay` function returns a value different from `COROUTINE_SUSPENDED`. In that case, it means the function resumed, and we can continue the execution of the `bathTime` function. If the label is `1`, the function is just resumed, and we print the second message.

The above is a simplified version of the actual code generated by the Kotlin compiler and run by the Kotlin runtime. Though, it's enough to understand how coroutines work.

## 4. Coroutine Scope and Structural Concurrency

Now we can start looking at how Kotlin implements the concept of structural concurrency. Let's declare another suspending function, which will simulate the action of boiling some water:

```kotlin
suspend fun boilingWater() {
    logger.info("Boiling water")
    delay(1000L)
    logger.info("Water boiled")
}
```

The first function we introduce is the `coroutineScope` suspending function. This function is at the core of coroutines and is used to create a new coroutine scope. It takes a suspending lambda as a parameter with an instance of `CoroutineScope` as the receiver:

```kotlin
suspend fun <R> coroutineScope(
  block: suspend CoroutineScope.() -> R
): R
```

**The coroutines scope represents the implementation of structural concurrency in Kotlin**. The runtime blocks the execution of the `block` lambda until all the coroutines started inside the `block` lambda are completed. These coroutines are called children coroutines of the scope. Moreover, structural concurrency also brings us the following features:

* Children coroutines inherit the context (`CoroutineContext`) of the parent coroutine, and they can override it. The coroutine's context is part of the `Continuation` object we've seen before. It contains the name of the coroutine, the dispatcher (aka, the pool of threads executing the coroutines), the exception handler, and so on.
* When the parent coroutine is canceled, it also cancels the children coroutines.
* When a child coroutine throws an exception, the parent coroutine is also stopped.

In addition, the `coroutineScope` function also creates a new coroutine, which suspends the execution of the previous one until the end of its execution. So, if we want to execute the two steps of our morning routine sequentially, we can use the following code:

```kotlin
suspend fun sequentialMorningRoutine() {
  coroutineScope {
    bathTime()
  }
  coroutineScope {
    boilingWater()
  }
}
```

To execute the `sequentialMorningRoutine`, we must declare a suspending `main` function that we'll reuse throughout the rest of the article:

```kotlin
suspend fun main() {
    logger.info("Starting the morning routine")
    sequentialMorningRoutine()
    logger.info("Ending the morning routine")
}
```

The `sequentialMorningRoutine` function will execute the `bathTime` function sequentially and then the `boilingWater` function in two different coroutines. So, we shouldn't be surprised that the output of the above code is something similar to the following:

```text
15:27:05.260 [main] INFO CoroutinesPlayground - Starting the morning routine
15:27:05.286 [main] INFO CoroutinesPlayground - Going to the bathroom
15:27:05.811 [kotlinx.coroutines.DefaultExecutor] INFO CoroutinesPlayground - Exiting the bathroom
15:27:05.826 [kotlinx.coroutines.DefaultExecutor] INFO CoroutinesPlayground - Boiling water
15:27:06.829 [kotlinx.coroutines.DefaultExecutor] INFO CoroutinesPlayground - Water boiled
15:27:06.830 [kotlinx.coroutines.DefaultExecutor] INFO CoroutinesPlayground - Ending the morning routine
```

As we can see, the execution is purely sequential. However, we can see that the runtime uses two different threads to execute the whole process, the `main` and the `kotlinx.coroutines.DefaultExecutor` thread. An important property of coroutines is that **when they are resumed, they can be executed in a different thread than the one that suspended them**. For example, the `bathTime` coroutine starts on the main thread. Then, the `delay` function suspends it. Finally, it is resumed on the `kotlinx.coroutines.DefaultExecutor` thread.

## 5. Coroutine Builders

### 5.1. The `launch` Builder

At this point, we should know about suspending functions and the basics of structural concurrency. It's time to create our first coroutine explicitly. **The Kotlin coroutines library provides a set of functions called builders**. These functions are used to create a coroutine and to start its execution. The first function we'll see is the `launch` function:

```kotlin
public fun CoroutineScope.launch(
    context: CoroutineContext = EmptyCoroutineContext,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    block: suspend CoroutineScope.() -> Unit
): Job
```

The library defines the `launch` builder as an extension function of the `CoroutineScope`. So, we need a scope to create a coroutine in this way. To create a coroutine, we also need a `CoroutineContext` and a lambda with the code to execute. The builder will pass its `CoroutineScope` to the `block` lambda as the receiver. This way, we can reuse the scope to create new children coroutines. Finally, the builder's default behavior is to immediately start the new coroutine (`CoroutineStart.DEFAULT`).

So, let's add some concurrency to our morning routine. We can start the `boilingWater` and the `bathTime` functions in two new coroutines and see them racing:

```kotlin
suspend fun concurrentMorningRoutine() {
    coroutineScope {
        launch {
            bathTime()
        }
        launch {
            boilingWater()
        }
    }
}
```

The log of the above code is something similar to the following:

```text
09:09:44.817 [main] INFO CoroutinesPlayground - Starting the morning routine
09:09:44.870 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Going to the bathroom
09:09:44.871 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Boiling water
09:09:45.380 [DefaultDispatcher-worker-2 @coroutine#1] INFO CoroutinesPlayground - Exiting the bathroom
09:09:45.875 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Water boiled
09:09:45.876 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Ending the morning routine
```

We can extract a lot of information from the above log. First, we can see that we effectively spawned two new coroutines, `coroutine#1` and `coroutine#2`. The first runs the `bathTime` suspending function, and the second the `boilingWater`.

The logs of the two functions interleave, so the execution of the two functions is concurrent. **This model of concurrency is cooperative** (more in the following sections). The `coroutine#2` had a chance to execute only when `coroutine#1` reached the execution of a suspending function, i.e., the `delay` function.

Moreover, when suspended, the `coroutine#1` was running on thread `DefaultDispatcher-worker-1`. Whereas, when resumed, it ran on thread `DefaultDispatcher-worker-2`. Coroutines run on configurable thread pools. As the log suggested, the default thread pool is called `Dispatchers.Default` (more on the dedicated following section).

Last but not least, the log shows a clear example of structural concurrency. The execution printed the last log in the `main` method after the execution of both the coroutines. As we may have noticed, we didn't have any explicit synchronization mechanism to achieve this result in the `main` function. We didn't wait or delay the execution of the `main` function. As we said, this is due to structural concurrency. The `coroutineScope` function creates a scope that is used to create both the two coroutines. Since the two coroutines are children of the same scope, it will wait until the end of the execution of both of them before returning.

We can also avoid using structural concurrency. In this case, we need to add some wait for the end of the execution of the coroutines. Instead of using the `coroutineScope` function, we can use the `GlobalScope` object. It's like **an empty coroutine scope that does not force any parent-child relationship**. So, we can rewrite the morning routine function as follows:

```kotlin
suspend fun noStructuralConcurrencyMorningRoutine() {
    GlobalScope.launch {
        bathTime()
    }
    GlobalScope.launch {
        boilingWater()
    }
    Thread.sleep(1500L)
}
```

The log of the above code is more or less the same as the previous one:

```text
14:06:57.670 [main] INFO CoroutinesPlayground - Starting the morning routine
14:06:57.755 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Boiling water
14:06:57.755 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Going to the bathroom
14:06:58.264 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Exiting the bathroom
14:06:58.763 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Water boiled
14:06:59.257 [main] INFO CoroutinesPlayground - Ending the morning routine
```

Since we do not have any structural concurrency mechanism using the `GlobalScope`, we added a `Thread.sleep(1500L)` at the end of the function to wait the end of the execution of the two coroutines. If we remove the `Thread.sleep` call, the log will be something similar to the following:

```text
21:47:09.418 [main] INFO CoroutinesPlayground - Starting the morning routine
21:47:09.506 [main] INFO CoroutinesPlayground - Ending the morning routine
```

As expected, the primary function returned before the end of the execution of the two coroutines. So, we can say that the `GlobalScope` is not a good choice for creating coroutines.

If we look at the definition of the `launch` function, we can see that it returns a `Job` object. **This object is a handle to the coroutine**. We can use it to cancel the execution of the coroutine or to wait for its completion. Let's see how we can use it to wait for the coroutine's completion. Let's add a new suspending function to our wallet:

```kotlin
suspend fun preparingCoffee() {
    logger.info("Preparing coffee")
    delay(500L)
    logger.info("Coffee prepared")
}
```

In our morning routine, we only want to prepare coffee after a bath and boiling water. So, we need to wait for the completion of the two coroutines. We can do it by calling the `join` method on the resulting `Job` object:

```kotlin
suspend fun morningRoutineWithCoffee() {
    coroutineScope {
        val bathTimeJob: Job = launch {
            bathTime()
        }
        val  boilingWaterJob: Job = launch {
            boilingWater()
        }
        bathTimeJob.join()
        boilingWaterJob.join()
        launch {
            preparingCoffee()
        }
    }
}
```

As expected, from the log, we can see that we prepared the coffee only after the end of the execution of the two coroutines:

```text
21:56:18.040 [main] INFO CoroutinesPlayground - Starting the morning routine
21:56:18.128 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Going to the bathroom
21:56:18.130 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Boiling water
21:56:18.639 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Exiting the bathroom
21:56:19.136 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Water boiled
21:56:19.234 [DefaultDispatcher-worker-2 @coroutine#3] INFO CoroutinesPlayground - Preparing coffee
21:56:19.739 [DefaultDispatcher-worker-2 @coroutine#3] INFO CoroutinesPlayground - Coffee prepared
21:56:19.739 [DefaultDispatcher-worker-2 @coroutine#3] INFO CoroutinesPlayground - Ending the morning routine
```

However, since we know all the secrets of structural concurrency now, we can rewrite the above code using the power of the `coroutineScope` function:

```kotlin
suspend fun structuralConcurrentMorningRoutineWithCoffee() {
    coroutineScope {
        coroutineScope {
            launch {
                bathTime()
            }
            launch {
                boilingWater()
            }
        }
        launch {
            preparingCoffee()
        }
    }
}
```

The output of the above code is the same as the previous one.

### 5.2. The `async` Builder

What if we want to return a value from the execution of a coroutine? For example, let's define two new suspending functions: The former produces the blend of the coffee we prepared. At the same time, the latter returns a toasted bread:

```kotlin
suspend fun preparingJavaCoffee(): String {
  logger.info("Preparing coffee")
  delay(500L)
  logger.info("Coffee prepared")
  return "Java coffee"
}

suspend fun toastingBread(): String {
  logger.info("Toasting bread")
  delay(1000L)
  logger.info("Bread toasted")
  return "Toasted bread"
}
```

Fortunately, the library provides a way for a coroutine to return a value. **We can use the `async` builder to create a coroutine that returns a value**. In detail, it produces a value of type `Deferred<T>`, which acts more or less like a java `Future<T>`. On the object of type `Deferred<T>`, we can call the `await` method to wait for the coroutine's completion and get the returned value. The library also defines the `async` builder as a `CoroutineScope` extension method:

```kotlin
public fun <T> CoroutineScope.async(
  context: CoroutineContext = EmptyCoroutineContext,
  start: CoroutineStart = CoroutineStart.DEFAULT,
  block: suspend CoroutineScope.() -> T
): Deferred<T>
```

Let's see how we can use it to return the blend of the coffee we prepared and the toasted bread:

```kotlin
suspend fun breakfastPreparation() {
    coroutineScope {
        val coffee: Deferred<String> = async {
            preparingJavaCoffee()
        }
        val toast: Deferred<String> = async {
            toastingBread()
        }
        logger.info("I'm eating ${coffee.await()} and ${toast.await()}")
    }
}
```

If we look at the log, we can see that the execution of the two coroutines is still concurrent. The last log awaits the completion of the two coroutines to print the final message:

```text
21:56:46.091 [main] INFO CoroutinesPlayground - Starting the morning routine
21:56:46.253 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Preparing coffee
21:56:46.258 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Toasting bread
21:56:46.758 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Coffee prepared
21:56:47.263 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Bread toasted
21:56:47.263 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - I'm eating Java coffee and Toasted bread
21:56:47.263 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Ending the morning routine
```

## 6. Cooperative Scheduling

At this point, we should know something about the basics of coroutines. However, we still have to discuss one essential coroutines' aspect: cooperative scheduling.

The coroutines scheduling model is very different from the one adopted by Java `Threads`, called preemptive scheduling. In preemptive scheduling, the operating system decides when to switch from one thread to another. **In cooperative scheduling, the coroutine itself decides when to yield the control to another coroutine**.

In the case of Kotlin, a coroutine decides to yield the control reaching a suspending function. Only at that moment the thread executing it will be released and allowed to run another coroutine.

If we noticed, in the logs we've seen so far, the execution control always changed when calling the `delay` suspending function. However, to understand it better, let's see another example. Let's define a new suspending function that simulates the execution of a very long-running task:

```kotlin
suspend fun workingHard() {
    logger.info("Working")
    while (true) {
        // Do nothing
    }
    delay(100L)
    logger.info("Work done")
}
```

The infinite cycle will prevent the function from reaching the `delay` suspending function, so the coroutine will never yield control. Now, we define another suspending function to execute concurrently with the previous one:

```kotlin
suspend fun takeABreak() {
    logger.info("Taking a break")
    delay(1000L)
    logger.info("Break done")
}
```

Finally, let's glue everything together in a new suspending function running the two previous functions in two dedicated coroutines. To make sure we'll see the effect of the cooperative scheduling, we limit the thread pool executing the coroutines to a single thread:

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
suspend fun workingHardRoutine() {
  val dispatcher: CoroutineDispatcher = Dispatchers.Default.limitedParallelism(1)
  coroutineScope {
    launch(dispatcher) {
      workingHard()
    }
    launch(dispatcher) {
      takeABreak()
    }
  }
}
```

The `CoroutineDispatcher` represents the thread pool used to execute the coroutines. The `limitedParallelism` function is an extension method of the `CoroutineDispatcher` interface that limits the number of threads in the thread pool to the given value. Since it's an experimental API, we need to annotate the function with the `@OptIn(ExperimentalCoroutinesApi::class)` annotation to avoid compiler warnings.

We launched both the coroutines on the only available thread of the `dispatcher`, and the log shows us the effect of the cooperative scheduling:

```text
08:46:04.804 [main] INFO CoroutinesPlayground - Starting the morning routine
08:46:04.884 [DefaultDispatcher-worker-2 @coroutine#1] INFO CoroutinesPlayground - Working
-- Running forever --
```

Since the `workingHard` coroutine never reached a suspending function, it never yields the control back. Then, the `takeABreak` coroutine is never executed. On the contrary, if we define a suspending function that yields the control back to the dispatcher, the `takeABreak` coroutine will have the chance to be executed:

```kotlin
suspend fun workingConsciousness() {
    logger.info("Working")
    while (true) {
        delay(100L)
    }
    logger.info("Work done")
}

@OptIn(ExperimentalCoroutinesApi::class)
suspend fun workingConsciousnessRoutine() {
  val dispatcher: CoroutineDispatcher = Dispatchers.Default.limitedParallelism(1)
  coroutineScope {
    launch(dispatcher) {
      workingConsciousness()
    }
    launch(dispatcher) {
      takeABreak()
    }
  }
}
```

Now, the log shows that the `takeABreak` coroutine had the chance to execute, even if the `workingConsciousness` runs forever and we have a single thread:

```text
09:02:49.302 [main] INFO CoroutinesPlayground - Starting the morning routine
09:02:49.376 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Working
09:02:49.382 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Taking a break
09:02:50.387 [DefaultDispatcher-worker-1 @coroutine#2] INFO CoroutinesPlayground - Break done
-- Running forever --
```

We can obtain the same log also using the `workingHard` coroutine, adding a thread to the thread pool:

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
suspend fun workingHardRoutine() {
  val dispatcher: CoroutineDispatcher = Dispatchers.Default.limitedParallelism(2)
  coroutineScope {
    launch(dispatcher) {
      workingHard()
    }
    launch(dispatcher) {
      takeABreak()
    }
  }
}
```

Since we have two threads and two coroutines, the concurrency degree is now two. As usual, the log confirms the theory: `coroutine#1` executes on `DefaultDispatcher-worker-1`, and `coroutine#2` executes on `DefaultDispatcher-worker-2`.

```text
13:40:59.864 [main] INFO CoroutinesPlayground - Starting the morning routine
13:40:59.998 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Working
13:41:00.003 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Taking a break
13:41:01.010 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Break done
-- Running forever --
```

**Cooperative scheduling forces us to be very careful when designing our coroutines**. Suppose a coroutine performs an operation blocking the underlying thread, such as a JDBC call. In that case, it blocks the thread from executing any other coroutine.

For this reason, the library allows us to use different dispatchers for different operations. The main ones are:

1. `Dispatchers.Default` is the default dispatcher used by the library. It uses a thread pool with a number of threads equal to the number of available processors. It's the right choice for CPU-intensive operations.
2. `Dispatchers.IO` is the dispatcher used for I/O operations. It uses a thread pool with a number of threads equal to available processors or, at most 64. It's the right choice for I/O operations, such as network calls or file operations.
3. Dispatcher created from a thread pool: It's possible to make our instance of `CoroutineDispatcher` using a thread pool. We can easily use the `asCoroutineDispatcher` extension function of the `Executor` interface. However, be aware that it's our responsibility to close the underlying thread pool when we don't need it anymore:

```kotlin
val dispatcher = Executors.newFixedThreadPool(10).asCoroutineDispatcher()
```

If we have both CPU-intensive and blocking parts, we must use both the `Dispatchers.Default` and the `Dispatchers.IO` and make sure to launch CPU-intensive coroutines on the default dispatchers and blocking code on the IO dispatcher.

## 7. Cancellation

When we reason about concurrent programming, cancellation is always a tricky topic. Killing a thread and abruptly stopping the execution of a task is not a good practice. **Before stopping a task, we must free the resources in use, avoid leaks, and leave the system in a consistent state**.

As we can imagine, Kotlin allows us to cancel the execution of coroutines. **The library provides a mechanism to cancel a coroutine cooperatively to avoid problems**. The `Job` type provides a `cancel` function that cancels the execution of the coroutine. However, the cancellation is not immediate and happens only when the coroutine reaches a suspending point. The mechanism is very close to the one we saw for cooperative scheduling.

Let's see an example. We want to model that we receive an important call during the working routine. We forgot the birthday of our best friend, and we want to go to buy a present before the mall closes:

```kotlin
suspend fun forgettingTheBirthDayRoutine() {
  coroutineScope {
    val workingJob = launch {
      workingConsciousness()
    }
    launch {
      delay(2000L)
      workingJob.cancel()
      workingJob.join()
      logger.info("I forgot the birthday! Let's go to the mall!")
    }
  }
}
```

A lot is going on in this snippet. First, we started the `workingConsciousness` coroutine and collected the corresponding `Job`. We used the `workingConsciousness` suspending function because it suspends inside the infinite loop, calling the `delay` function.

Concurrently, we launch another coroutine, which cancels the `workingJob` after 2 seconds and waits for its completion. The `workingJob` is canceled, but the `workingConsciousness` coroutine is not stopped immediately. It continues to execute until it reaches the suspending point, and then it is canceled. Since we want to wait for the cancellation, we call the `join` function on the `workingJob`.

The log confirms the theory. About 2 seconds from the start of the `coroutine#1`, the `coroutine#2` prints its log, and the `coroutine#1` is canceled:

```text
21:36:04.205 [main] INFO CoroutinesPlayground - Starting the morning routine
21:36:04.278 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Working
21:36:06.390 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - I forgot the birthday! Let's go to the mall!
21:36:06.391 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Ending the morning routine
```

The `cancel` and then `join` pattern is so common that the Kotlin coroutines library provides us with a `cancelAndJoin` function that combines the two operations.

As we said, cancellation is a cooperative affair in Kotlin. **If a coroutine never suspends, it cannot be canceled at all**. Let's change the above example using the `workingHard` suspending function instead. In this case, the `workingHard` function never suspends, so we expect the `workingJob` cannot be canceled:

```kotlin
suspend fun forgettingTheBirthDayRoutineWhileWorkingHard() {
    coroutineScope {
        val workingJob = launch {
            workingHard()
        }
        launch {
            delay(2000L)
            workingJob.cancelAndJoin()
            logger.info("I forgot the birthday! Let's go to the mall!")
        }
    }
}
```

This time, our friend will not receive her present. The `workingJob` is canceled, but the `workingHard` function is not stopped since it never reaches a suspension point. Again, the log confirms the theory:

```text
08:56:10.784 [main] INFO CoroutinesPlayground - Starting the morning routine
08:56:10.849 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Working
-- Running forever --
```

Behind the scenes, the `cancel` function sets the `Job` in a state called "Cancelling". At first reached suspension point, the runtime throws a `CancellationException`, and the coroutine is finally canceled. This mechanism allows us to clean up the resources used by the coroutine safely. There are a lot of strategies we can implement to clean up the resources, but first, we need a resource to free during our examples. We can define the class `Desk` that represents a desk in our office:

```kotlin
class Desk : AutoCloseable {
    init {
        logger.info("Starting to work on the desk")
    }

    override fun close() {
        logger.info("Cleaning the desk")
    }
}
```

The `Desk` class implements the `AutoCloseable` interface. So, it's an excellent candidate to free during a coroutine's cancellation. Since it implements `AutoCloseable`, we can use the `use` function to automatically close the resource when the block of code is completed:

```kotlin
suspend fun forgettingTheBirthDayRoutineAndCleaningTheDesk() {
    val desk = Desk()
    coroutineScope {
        val workingJob = launch {
            desk.use { _ ->
                workingConsciousness()
            }
        }
        launch {
            delay(2000L)
            workingJob.cancelAndJoin()
            logger.info("I forgot the birthday! Let's go to the mall!")
        }
    }
}
```

The `use` function works precisely as the _try-with-resources_ construct in Java.

As expected, before we moved to the mall, we cleaned up the desk, and the log confirms it:

```text
21:38:30.117 [main] INFO CoroutinesPlayground - Starting the morning routine
21:38:30.124 [main] INFO CoroutinesPlayground - Starting to work on the desk
21:38:30.226 [DefaultDispatcher-worker-1 @coroutine#1] INFO CoroutinesPlayground - Working
21:38:32.298 [DefaultDispatcher-worker-2 @coroutine#1] INFO CoroutinesPlayground - Cleaning the desk
21:38:32.298 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - I forgot the birthday! Let's go to the mall!
21:38:32.298 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Ending the morning routine
```

We can also use the `invokeOnCompletion` function on the canceling `Job` to clean up the desk after the `workingConsciousness` function is completed:

```kotlin
suspend fun forgettingTheBirthDayRoutineAndCleaningTheDeskOnCompletion() {
  val desk = Desk()
  coroutineScope {
    val workingJob = launch {
      workingConsciousness()
    }
    workingJob.invokeOnCompletion { exception: Throwable? ->
      desk.close()
    }
    launch {
      delay(2000L)
      workingJob.cancelAndJoin()
      logger.info("I forgot the birthday! Let's go to the mall!")
    }
  }
}
```

As we can see, the `invokeOnCompletion` method takes a nullable exception as an input argument. If the `Job` is canceled, the exception is a `CancellationException`.

**Another feature of cancellation is it propagates to children coroutines**. When we cancel a coroutine, we implicitly cancel all of its children. Let's see an example. During the day, it's essential to stay hydrated. We can use the `drinkWater` suspending function to drink water:

```kotlin
suspend fun drinkWater() {
  while (true) {
    logger.info("Drinking water")
    delay(1000L)
    logger.info("Water drunk")
  }
}
```

Then, we can create a coroutine that spawns two new coroutines for working and drinking water. Finally, we can cancel the parent coroutine, and we expect that the two children are canceled as well:

```kotlin
suspend fun forgettingTheBirthDayWhileWorkingAndDrinkingWaterRoutine() {
    coroutineScope {
        val workingJob = launch {
            launch {
                workingConsciousness()
            }
            launch {
                drinkWater()
            }
        }
        launch {
            delay(2000L)
            workingJob.cancelAndJoin()
            logger.info("I forgot the birthday! Let's go to the mall!")
        }
    }
}
```

As expected, when we cancel the  `workingJob`, we also cancel and stop its children's coroutines. Here is the log that describes the situation:

```text
13:18:49.143 [main] INFO CoroutinesPlayground - Starting the morning routine
13:18:49.275 [DefaultDispatcher-worker-2 @coroutine#2] INFO CoroutinesPlayground - Working
13:18:49.285 [DefaultDispatcher-worker-3 @coroutine#3] INFO CoroutinesPlayground - Drinking water
13:18:50.285 [DefaultDispatcher-worker-3 @coroutine#3] INFO CoroutinesPlayground - Water drunk
13:18:50.286 [DefaultDispatcher-worker-3 @coroutine#3] INFO CoroutinesPlayground - Drinking water
13:18:51.288 [DefaultDispatcher-worker-2 @coroutine#3] INFO CoroutinesPlayground - Water drunk
13:18:51.288 [DefaultDispatcher-worker-2 @coroutine#3] INFO CoroutinesPlayground - Drinking water
13:18:51.357 [DefaultDispatcher-worker-2 @coroutine#4] INFO CoroutinesPlayground - I forgot the birthday! Let's go to the mall!
13:18:51.357 [DefaultDispatcher-worker-2 @coroutine#4] INFO CoroutinesPlayground - Ending the morning routine
```

And that's all for coroutines cancellation!

## 8. The Coroutine Context

In the section concerning continuation and the section concerning builders, we briefly introduced the concept of coroutine context. Also, the `CoroutineScope` retains a reference to a coroutine context. As you can imagine, **it is a way to store information passed from parents to children to develop structural concurrency internally**.

The type representing the coroutine context is called `CoroutineContext`, and it is part of the Kotlin core library. It's a funny type since it represents a collection of elements, but also, every element is a collection:

```kotlin
public interface CoroutineContext
// But also
public interface Element : CoroutineContext
```

The implementation of the `CoroutineContext` is placed in the Kotlin coroutines library, together with the `Continuation<T>` type. Among the actual implementations, we have the `CoroutineName`, which represents the name of a coroutine:

```kotlin
val name: CoroutineContext = CoroutineName("Morning Routine")
```

In addition, the `CoroutineDispatcher` and the `Job` type implement the `CoroutineContext` interface. The identifier we saw in the above logs is the `CoroutineId`. This context is automatically added by the runtime to every coroutine when we enable the debug mode.

Since the `CoroutineContext` behaves like a collection, the library also defines the `+` operator to add elements to the context. So, creating a new context with many elements is as simple as:

```kotlin
val context: CoroutineContext = CoroutineName("Morning Routine") + Dispatchers.Default + Job()
```

Removing elements from the context is also possible using the `minusKey` function:

```kotlin
val newContext: CoroutineContext = context.minusKey(CoroutineName)
```

As we should remember, we can pass the context to a builder to change the behavior of the created coroutine. For example, suppose we want to create a coroutine with a specific name that uses the `Dispatchers.Default`. In that case, we can do it as follows:

```kotlin
suspend fun asynchronousGreeting() {
    coroutineScope {
        launch(CoroutineName("Greeting Coroutine") + Dispatchers.Default) {
            logger.info("Hello Everyone!")
        }
    }
}
```

Let's run it inside the `main` function. We can see in the log that the coroutine is created with the specified name, and it's executed in the `Default` dispatcher:

```text
11:56:46.747 [DefaultDispatcher-worker-1 @Greeting Coroutine#1] INFO CoroutinesPlayground - Hello Everyone!
```

A coroutine context also behaves as a map since we can search and access the elements it contains using the name of the type corresponding to the element we want to retrieve:

```kotlin
logger.info("Coroutine name: {}", context[CoroutineName]?.name)
```

The above code prints the coroutine name stored in the context, if any. The `CoroutineName` used inside the square brackets is neither a type nor a class. Indeed, it references the companion object called the `Key` of the class—just some Kotlin syntactic sugar.

The library also defines the empty coroutine context, `EmptyCoroutineContext`, which we can use as a "zero" element to create a new custom context.

So, context is a way to pass information among coroutines. **Any parent coroutine gives its context to its children coroutines**. Children coroutines copy values from the parent to a new instance of the context that they can override. Let's see an example of inheritance without override:

```kotlin
suspend fun coroutineCtxInheritance() {
    coroutineScope {
        launch(CoroutineName("Greeting Coroutine")) {
            logger.info("Hello everyone from the outer coroutine!")
            launch {
                logger.info("Hello everyone from the inner coroutine!")
            }
            delay(200L)
            logger.info("Hello again from the outer coroutine!")
        }
    }
}
```

The log of the above code is the following, and it highlights that both coroutines share the same name:

```text
12:19:12.962 [DefaultDispatcher-worker-1 @Greeting Coroutine#1] INFO CoroutinesPlayground - Hello everyone from the outer coroutine!
12:19:12.963 [DefaultDispatcher-worker-2 @Greeting Coroutine#2] INFO CoroutinesPlayground - Hello everyone from the inner coroutine!
12:19:12.963 [DefaultDispatcher-worker-1 @Greeting Coroutine#1] INFO CoroutinesPlayground - Hello again from the outer coroutine!
```

As we said, if we want, we can override the values inside the context from the child coroutine:

```kotlin
suspend fun coroutineCtxOverride() {
    coroutineScope {
        launch(CoroutineName("Greeting Coroutine")) {
            logger.info("Hello everyone from the outer coroutine!")
            launch(CoroutineName("Greeting Inner Coroutine")) {
                logger.info("Hello everyone from the inner coroutine!")
            }
            delay(200L)
            logger.info("Hello again from the outer coroutine!")
        }
    }
}
```

The log of the above code shows the override of the parent coroutine. However, the original value is still the original in the parent context:

```text
12:22:33.869 [DefaultDispatcher-worker-1 @Greeting Coroutine#1] INFO CoroutinesPlayground - Hello everyone from the outer coroutine!
12:22:33.870 [DefaultDispatcher-worker-2 @Greeting Inner Coroutine#2] INFO CoroutinesPlayground - Hello everyone from the inner coroutine!
12:22:34.077 [DefaultDispatcher-worker-1 @Greeting Coroutine#1] INFO CoroutinesPlayground - Hello again from the outer coroutine!
12:22:34.078 [DefaultDispatcher-worker-1 @Greeting Coroutine#1] INFO CoroutinesPlayground - Ending the morning routine
```

The only exception to the context inheritance rule is the `Job` context instance. Every new coroutine creates its own `Job` instance, which is not inherited from the parent. Whereas, the other context elements, such as the `CoroutineName` or the dispatcher, are inherited from the parent.

## 9. Conclusions

Our journey through the basics of the Kotlin coroutines library is over. We saw why coroutines matter and made a simplified explanation of how they're implemented under the hood. Then, we showed how to create coroutines, also introducing the structural concurrency topic. We saw how cooperative scheduling and cancellation work with many examples. Finally, we introduced the main features of the coroutines' context. There is a lot more to say about coroutines, but we hope this article can be a good starting point for those who want to learn more about them.

If you found coroutines too difficult, you can quickly get the Kotlin basics you need by following the complete [Kotlin Essentials course](https://rockthejvm.com/p/kotlin-essentials) on Rock the JVM.

## 10. Appendix A

As promised, here is the `pom.xml` file that we used to run the code in this article:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>in.rcard</groupId>
  <artifactId>kactor-coroutines-playground</artifactId>
  <version>0.0.1-SNAPSHOT</version>

  <properties>
    <kotlin.version>1.7.20</kotlin.version>
    <kotlinx-coroutines.version>1.6.4</kotlinx-coroutines.version>
    <slf4j-api.version>2.0.5</slf4j-api.version>
    <logback-classic.version>1.4.5</logback-classic.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.jetbrains.kotlin</groupId>
      <artifactId>kotlin-stdlib</artifactId>
      <version>${kotlin.version}</version>
    </dependency>
    <dependency>
      <groupId>org.jetbrains.kotlinx</groupId>
      <artifactId>kotlinx-coroutines-core</artifactId>
      <version>${kotlinx-coroutines.version}</version>
    </dependency>

    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>${slf4j-api.version}</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>${logback-classic.version}</version>
    </dependency>
  </dependencies>

  <build>
    <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
    <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>

    <plugins>
      <plugin>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-maven-plugin</artifactId>
        <version>${kotlin.version}</version>

        <executions>
          <execution>
            <id>compile</id>
            <goals>
              <goal>compile</goal>
            </goals>
          </execution>

          <execution>
            <id>test-compile</id>
            <goals>
              <goal>test-compile</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>7</source>
          <target>7</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

Enjoy!
