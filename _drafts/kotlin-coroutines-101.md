---
title: "Kotlin Coroutines 101"
date: 2022-12-14
header:
  image: "/images/blog cover.jpg"
tags: [kotlin, coroutines, concurrency]
excerpt: ""
---

This article introduces Kotlin coroutines, a powerful tool for asynchronous programming. Kotlin's coroutines fall under the umbrella of structured concurrency, and, basically, they implement a model of concurrency that is similar to Java virtual threads, Cats Effect and ZIO fibers. In detail, we'll present some use cases concerning the use of coroutines on backend services, not on the Android environment. 

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
