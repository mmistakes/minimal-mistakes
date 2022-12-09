---
title: "Kotlin Coroutines 101"
date: 2022-12-14
header:
  image: "/images/blog cover.jpg"
tags: [kotlin, coroutines, concurrency]
excerpt: ""
---

This article introduces Kotlin coroutines, a powerful tool for asynchronous programming. Kotlin's coroutines fall under the umbrella of structured concurrency, and, basically, they implement a model of concurrency that is similar to Java virtual threads, [Cats Effect](https://blog.rockthejvm.com/cats-effect-fibers/) and [ZIO fibers](https://blog.rockthejvm.com/zio-fibers/). In detail, we'll present some use cases concerning the use of coroutines on backend services, not on the Android environment. 

The article requires a minimum knowledge of the Kotlin language, but if you came from a Scala background, you should be fine.

## 1. Background and Setup

All the examples we'll present requires at least version 1.7.20 of the Kotlin compiler and version 1.6.4 of the Kotlin Coroutines library. In fact, whereas the basic building blocks of coroutines are available in the standard library, the full implementation of the structured concurrency model is available in an extension library, called `kotlinx-coroutines-core`.

We'll use the following Maven file to resolve dependency and build the code.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.rockthejvm</groupId>
    <artifactId>kactor-coroutines-playground</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <kotlin.version>1.7.20</kotlin.version>
        <kotlinx-coroutines.version>1.6.4</kotlinx-coroutines.version>
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
        </plugins>
    </build>
</project>
```

Clearly, it's possible to create a similar building file for Gradle, but we'll stick to Maven for the sake of simplicity.

## 2. Why Coroutines?

The first question that comes to mind is: why should we use coroutines? The answer is simple: coroutines are a powerful tool for asynchronous programming. Someone could argue that we already have the `Thread` abstraction in the JVM ecosystem that model an asynchronous computation. However, threads, that the JVM maps directly on OS threads, are really heavy. For every thread, the OS must allocate a lot of context information on the stack. Moreover, every time a computation reaches a blocking operation, the underneath thread is suspended, and the JVM must load the context of another thread. This is a very expensive operation, and it's the reason why we should avoid blocking operations in our code. 

On the other end, as we will see, coroutines are very lightweight. They are not mapped directly on OS threads, but are mapper at user level, with simple objects called _continuations_. Switching between coroutines does not require the OS to load the context of another thread, but it's just a matter of switching the reference to the continuation object.

Another good reason to adopt coroutines is that they are a way to write asynchronous code in a synchronous way.

A first attempt in writing asynchronous code in a synchronous way is to use callbacks. However, callbacks are not very elegant, and they are not composable. Moreover, they are not very easy to reason about. In fact, it's easy to end up in a callback hell, where the code is very hard to read and to maintain:

````java
// Find a good example of callback hell
````

Another model that is used in asynchronous programming is the reactive programming. However, the problem is that it produces a code that is really hard to understand, and so to maintain. Let's take for example the following code snippet, taken from the official documentation of the RxJava library:

```java
Flowable.fromCallable(() -> {
    Thread.sleep(1000); //  imitate expensive computation
    return "Done";
})
  .subscribeOn(Schedulers.io())
  .observeOn(Schedulers.single())
  .subscribe(System.out::println, Throwable::printStackTrace);
```

The above code just simulate the run of some computation, network request on a background thread, showing the results (or error) on the UI thread. We have to admit that it's not really self-explanatory, and we need to know well the library to understand what's going on.

All the above problems are solved by coroutines. Let's see how.

## 3. Coroutines Basics

### 3.1. Suspending Functions

As we said, a coroutine is a lightweight thread, which means it's not mapped directly to a thread. It's a computation that can be suspended and resumed at any time. So, before we can start looking at how to build a coroutine, we need to understand how to suspend and resume a coroutine.

Kotlin provides the `suspend` keyword to mark a function that can suspend a coroutine:

```kotlin
suspend fun bathTime() {
  println("Going to the bathroom")
  delay(500L)
  println("Exiting the bathroom")
}
```
As we can see, we will use the same examples of the article [ZIO: Introduction to Fibers](https://blog.rockthejvm.com/zio-fibers/), just to show how coroutines are different from fibers. 

The `delay(timeMillis: Long)` function is a `suspend` that actually suspends a coroutine for `timeMillis` milliseconds, and it's provided by the `kotlinx-coroutines-core` library. A `suspend` function can be called only from a coroutine or another `suspend` function, and literally it can be suspended and resumed. In the example above, the `bathTime` function can be suspended when the coroutine executes the `delay` function. Once resumed, the `bathTime` function will continue its execution from the next line.

How is it possible? Without going to deep into coroutines internals, the whole context of the suspending function saved in an object of type `Continuation<T>`, where the `T` type variable represents the return type of the function. Such object contains all the state of the variables and parameters of the function and a label that stores where the execution of was suspended. So, the Kotlin compiler will rewrite every suspending function adding a parameter of type `Continuation` to the function signature. The signature of our `bathTime` function will be rewritten as follows:

```kotlin
fun bathTime(continuation: Continuation<*>): Any
```

Why the compiler also changes the return type? The answer is that when the `suspend` function is suspended it cannot return the value of the function, but it must return a value that marks that the function was suspended, `COROUTINE_SUSPENDED`.

Inside the `continuation` object, the compiler will save the state of the execution of the function. Since we have no parameters and no internal variables, the continuation stores only a label marking the advance of the execution. For sake of simplicity, let's introduce a `BathTimeContinuation` type to store the context of the function. In our example, the `bathTime`can be called at the beginning or after the `delay` function. If we use an `Int` label, we can represent the two possible states of the function as follows:

```kotlin
fun bathTime(continuation: Continuation<*>): Any {
    val continuation =
      continuation as? BathTimeContinuation ?: BathTimeContinuation(continuation)
    if (continuation.label == 0) {
      println("Going to the bathroom")
      continuation.label = 1
      if (delay(500L, continuation) == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED
    }
    if (continuation.label == 1) {
      println("Exiting the bathroom")
    }
    error("This line should never be reached")
}
```

Well, a lot of things are happening here. First of all, we have to check if the `continuation` object is of type `BathTimeContinuation`. If not, we create a new `BathTimeContinuation` object, passing the `continuation` object as a parameter. This is the case when the `bathTime` function is called for the first time. As we can see, continuations are like onions: Every time we call a suspending function, we wrap the continuation object in a new one.

Then, if the `label` is `0`, we print the first message and we set the label to `1`. Then, we call the `delay` function, passing the continuation object. If the `delay` function returns `COROUTINE_SUSPENDED`, it means that the function was suspended, and we return `COROUTINE_SUSPENDED` to the caller. If the `delay` function returns a value different from `COROUTINE_SUSPENDED`, it means that the function was resumed, and we can continue the execution of the `bathTime` function. If the label is `1`, the function was just resumed, and we print the second message.

Basically, a suspending function acts like a state machine. Clearly, the above is a simplified version of the actual code generated by the Kotlin compiler. Though, it's enough to understand how coroutines work. However, we didn't talk about how the runtime resumes a suspended coroutine, and how we can set the state of a suspending function, since this is far beyond the scope of this article.

