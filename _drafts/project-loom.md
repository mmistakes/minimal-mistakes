---
title: "Project Loom: A New Hope"
date: 2023-01-30
header:
    image: "/images/blog cover.jpg"
tags: []
excerpt: "Scalac article lol."
---

Version 19 of Java came at the end of the 2022, and it brought us a lot of interesting stuff. One of the coolest is the preview of some hot topics concerning Project Loom: _virtual threads_ ([JEP 425](https://openjdk.org/jeps/425)) and _structural concurrency_ ([JEP 428](https://openjdk.org/jeps/428)). Whereas still in a preview phase (to tell the truth, structural concurrency is still in the incubator module), the two JEPs promise to bring modern concurrency paradigms that we already found in Kotlin (coroutines) and Scala (Cats Effect and ZIO fibers) also in the mainstream language of the JVM: The Java programming language.

Without further ado, let's introduce them. As we said, keep in mind that both the project are still evolving, so the final version of the features might be different from what we are going to see here.

## 1. Setup

As we said, both the JEPs are still in preview/incubation step so we need to enable them in our project. First, we need to use a version of Java that is at least 19. Then, we need to give the `--enable-preview` flag to the JVM. Moreover, to access the structured concurrency classes, we need to enable and import the `jdk.incubator.concurrent`. Under the folder `src/main/java`, we need to create a file named `module-info.java` with the following content:

```java
module virtual.threads.playground {
  requires jdk.incubator.concurrent;
}
```

The name of our module doesn't matter. We used `virtual.threads.playground` but we can use any name we want. The important thing is that we need to use the `requires` directive to enable the incubator module. At the end of the article we will give an example of a Maven configuration that enables the preview and the incubator module.

We'll use Slf4j to log something on the console. So, all the code snippets in this article will use the following logger:

```java
static final Logger logger = LoggerFactory.getLogger(App.class);
```

Moreover, we'll use also Lombok, to reduce the boilerplate code when dealing with checked exceptions. So, we'll use the `@SneakyThrows`, that let us treating checked exceptions as unchecked ones (don't use it in production!). For example, we'll wrap the `Thread.sleep` method, that throws a checked `InterruptedException`, with the `@SneakyThrows` annotation:

```java
@SneakyThrows
private static void sleep(Duration duration) {
  Thread.sleep(duration);
}
```

Since we're in an application using Java modules, we need to both the dependencies to the required modules. The above module declaration then becomes the following:

```java
module virtual.threads.playground {
  requires jdk.incubator.concurrent;
  requires org.slf4j;
  requires static lombok;
}
```

At the end of the article, we will give an example of a Maven configuration with all the needed dependencies and configurations.

## 2. Why Virtual Threads?

For people who already follows us, we made the same question on the article on [Kotlin Coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/). However, we think that it is important to give a brief introduction to the problem that virtual threads are trying to solve.

The JVM is a multithreaded environment. As we may know, the JVM gives us an abstraction of OS threads through the type `java.lang.Thread`. Until Project Loom, every thread in the JVM is just a little wrapper around an OS thread. We can call such implementation of the `java.lang.Thread` type as _platform thread_.

The problem with platform thread is that they are expensive under a lot of points of view. First, they are expensive to create. Every time a platform thread is created, the OS must allocate a very large amount of memory (megabytes) in the stack to store the thread context, native, and Java call stacks. This is due to the not resizable nature of the stack. Moreover, every time the scheduler preempts a thread from execution, this huge amount of memory must be moved around.

As we can imagine, this is a very expensive operation, both in space and time. In fact, th huge size of stacks frame is what really limit the number of threads that can be created. We can reach a `OutOfMemoryError` quite easily in Java, continuing creating new platform threads till the OS runs out of memory:

```java
private static void stackOverFlowErrorExample() {
  for (int i = 0; i < 100_000; i++) {
    new Thread(() -> {
      try {
        Thread.sleep(Duration.ofSeconds(1L));
      } catch (InterruptedException e) {
        throw new RuntimeException(e);
      }
    }).start();
  }
}
```

The results depend on the OS and the hardware, but we can easily reach a `OutOfMemoryError` in a few seconds:

```
[0.949s][warning][os,thread] Failed to start thread "Unknown thread" - pthread_create failed (EAGAIN) for attributes: stacksize: 1024k, guardsize: 4k, detached.
[0.949s][warning][os,thread] Failed to start the native thread for java.lang.Thread "Thread-4073"
Exception in thread "main" java.lang.OutOfMemoryError: unable to create native thread: possibly out of memory or process/resource limits reached
```

The above example shows how we wrote concurrent programs was constrained until now. 

From its inception, Java has been a language that tried to strive for simplicity. In concurrent programming, this means that we should try to write programs as if the were sequential.  In fact, the more straightforward way to write concurrent programs in Java is to create a new thread for every concurrent task. This model is called _one task per thread_. 

In such approach, every thread can use its own local variable to store information, and the need to share mutable state among threads, which is the well-known "hard part" of concurrent programming, drastically decreases. However, using such approach, we can easily reach the limit of the number of threads that we can create.

As we said in the article concerning Kotlin Coroutines, a lot of different approaches risen during the past years to overcome the above problem. Reactive programming and async/await approaches are two of the most popular.

The reactive programming initiatives tries to overcome the lack of thread resources building a custom DSL to declarative describe the flow of data, and let the framework handle concurrency. However, the DSL tends to be very hard to understand and to use, losing the simplicity that Java tries to give us.

Also the async/await approach, such as Kotlin coroutines, has its own problems. Despite the fact that it aims is to to model the _one task per thread_ approach, it can't rely on any native JVM construct. For example, Kotlin coroutines based the whole story on _suspending functions_, i.e. functions that can suspend a coroutine. However, the suspension is completely based upon non-blocking IO, which we can achieve using libraries based on Netty for example. However, not every task can be expressed in terms of non-blocking IO. In the end, we must divide our program in two parts: one that is based on non-blocking IO (suspending functions), and one that is not. This is a very hard task, and it is not easy to do it correctly. Moreover, we loose again the simplicity that we want to have in our programs.

The above are some of the reasons why the JVM community is looking for a better way to write concurrent programs. Project Loom is one of the attempts to solve the problem. So, let's introduce the first brick of the project: _virtual threads_.

## 3. How to Create a Virtual Thread

As we said, virtual threads are a new type of threads that tries to overcome the problem of resource limitation of platform threads. They are an alternate implementation of the `java.lang.Thread` type, which store they stack frames in the heap (garbage collected memory) instead of the stack.

Therefore, the initial memory footprint of a virtual thread tends to be very small, a few of hundred bytes, instead of megabytes. In fact, the stack chunk can resize in every moment. So, we don't need to allocate a gazillion of memory to try to fit every possible use case. 

Create a new virtual thread is very easy. We can use the new factory method `ofVirtual`on the `java.lang.Thread` type. In detail, we create an utility function to create a virtual thread with a given name:

```java
private static Thread virtualThread(String name, Runnable runnable) {
  return Thread.ofVirtual()
    .name(name)
    .start(runnable);
}
```

To show how virtual threads work, we'll use the same example we used in the Kotlin Coroutine article. Let's say we want to describe our morning routine. Every morning, we take a bath:

```java
static Thread bathTime() {
  return virtualThread("Bath time", () -> {
    logger.info("I'm going to take a bath");
    sleep(Duration.ofMillis(500L));
    logger.info("I'm done with the bath");
  });
}
```

Another task that we do every morning is to boil some water to make a tea:

```java
static Thread boilingWater() {
  return virtualThread("Boil some water", () -> {
    logger.info("I'm going to boil some water");
    sleep(Duration.ofSeconds(1L));
    logger.info("I'm done with the water");
  });
}
```

Fortunately, we can race the two tasks, to speed up the process and go to work earlier:

```java
@SneakyThrows
static void concurrentMorningRoutine() {
  var vt1 = bathTime();
  var vt2 = boilingWater();
  vt1.join();
  vt2.join();
}
```

We joined both the virtual threads, so we can be sure that the main thread will not terminate before the two virtual threads. Let's run the program:

```
15:19:25.243 [Bath time] INFO in.rcard.virtual.threads.App - I'm going to take a bath
15:19:25.243 [Boil some water] INFO in.rcard.virtual.threads.App - I'm going to boil some water
15:19:25.750 [Bath time] INFO in.rcard.virtual.threads.App - I'm done with the bath
15:19:26.253 [Boil some water] INFO in.rcard.virtual.threads.App - I'm done with the water
```

The output is exactly what we expected. The two virtual threads run concurrently, and the main thread waits for them to terminate.

Other than the factory method, we can use a new implementation of the `java.util.concurrent.ExecutorService` tailored on virtual threads, called `java.util.concurrent.ThreadPerTaskExecutor`. It's name is quite evocative. it creates a new virtual thread for every task submitted to the executor:

```java
@SneakyThrows
static void concurrentMorningRoutineUsingExecutors() {
  try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    var f1 = executor.submit(() -> {
      logger.info("I'm going to take a bath");
      sleep(Duration.ofMillis(500L));
      logger.info("I'm done with the bath");
    });
    var f2 = executor.submit(() -> {
      logger.info("I'm going to boil some water");
      sleep(Duration.ofSeconds(1L));
      logger.info("I'm done with the water");
    });
    f1.get();
    f2.get();
  }
}
```

The way we start threads is a little different since we're using an `ExecutorService`. Every call to the `submit` method requires a `Runnable` or a `Callable<T>` instance. The `submit` returns an instance of a  `Future<T>` that we can use to join the underlying virtual thread.

The output is more or less the same as before:

```
21:22:52.561 [] INFO in.rcard.virtual.threads.App - I'm going to take a bath
21:22:52.561 [] INFO in.rcard.virtual.threads.App - I'm going to boil some water
21:22:53.072 [] INFO in.rcard.virtual.threads.App - I'm done with the bath
21:22:53.570 [] INFO in.rcard.virtual.threads.App - I'm done with the water
```

As we can see, threads created in this way have not a name, and it can be difficult to debug errors without it. We can overcome this problem just by using the `ThreadPerTaskExecutor` factory method that takes a `ThreadFactory` as parameter:

```java
@SneakyThrows
static void concurrentMorningRoutineUsingExecutorsWithName() {
  final ThreadFactory factory = Thread.ofVirtual().name("routine-", 0).factory();
  try (var executor =
      Executors.newThreadPerTaskExecutor(factory)) {
    var f1 =
        executor.submit(
            () -> {
              logger.info("I'm going to take a bath");
              sleep(Duration.ofMillis(500L));
              logger.info("I'm done with the bath");
            });
    var f2 =
        executor.submit(
            () -> {
              logger.info("I'm going to boil some water");
              sleep(Duration.ofSeconds(1L));
              logger.info("I'm done with the water");
            });
    f1.get();
    f2.get();
  }
}
```

A `ThreadFactory` is a factory that creates threads that share the same configuration. In our case, we give the prefix `routine-` to the name of the threads, and we start the counter from 0. The output is the same as before, but now we can see the name of the threads:

```
08:32:07.342 [routine-0] INFO in.rcard.virtual.threads.App - I'm going to take a bath
08:32:07.342 [routine-1] INFO in.rcard.virtual.threads.App - I'm going to boil some water
08:32:07.850 [routine-0] INFO in.rcard.virtual.threads.App - I'm done with the bath
08:32:08.351 [routine-1] INFO in.rcard.virtual.threads.App - I'm done with the water
```

Now that we know how to create virtual threads, let's see how they work under the hood.

## 4. How Virtual Threads Work

How do virtual threads work? The figure below shows the relationship between virtual threads and platform threads:

![Java Virtual Threads Representation](/images/virtual-threads/java-virtual-threads.png)

Basically, the JVM maintains a pool of _platform threads_, created and maintained by a dedicated `ForkJoinPool`. Initially, the number of platform threads is equal to the number of CPU cores, and it cannot increase more than 256. 

For each created virtual thread, the JVM schedules its execution on a platform thread, temporarily copying the stack chunk for the virtual thread from the heap to the stack of the platform thread. We said that the platform thread becomes the _carrier thread_ of the virtual thread. 

The first time the virtual thread blocks on a blocking operation, the carrier thread is released, and the stack chunk of the virtual thread is copied back to the heap. In this way, the carrier thread is available to execute any other eligible virtual threads. Once the blocked virtual thread finish the blocking operation, the scheduler schedules it again for execution. The execution can continue on the same carrier thread, or on a different one.

There a lot of details to consider. Let's start from the scheduler.

### 4.1. The Scheduler

As we said, virtual threads are scheduled on a dedicated `ForkJoinPool`. The default scheduler is defined in the `java.lang.VirtualThread` class:

```java
// SDK code
final class VirtualThread extends BaseVirtualThread {
  private static final ForkJoinPool DEFAULT_SCHEDULER = createDefaultScheduler();
  
  // Omissis
  
  private static ForkJoinPool createDefaultScheduler() {
    // Omissis
    int parallelism, maxPoolSize, minRunnable;
    String parallelismValue = System.getProperty("jdk.virtualThreadScheduler.parallelism");
    String maxPoolSizeValue = System.getProperty("jdk.virtualThreadScheduler.maxPoolSize");
    String minRunnableValue = System.getProperty("jdk.virtualThreadScheduler.minRunnable");
    // Omissis
    return new ForkJoinPool(parallelism, factory, handler, asyncMode,
        0, maxPoolSize, minRunnable, pool -> true, 30, SECONDS);
  }
}
```

As we might imagine, it's possible to configure the pool dedicated to carrier threads using the above system properties. The default pool size (parallelism) is equal to the number of CPU cores, and the maximum pool size is at most 256. The minimum allowed number of core threads not blocked is half the pool size.

In Java, virtual threads implements cooperative scheduling. As we saw for [Kotlin Coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/#6-cooperative-scheduling), it's a virtual thread that decide when to yield the execution to another virtual thread. In detail, the control is passed to the scheduler and the virtual thread is _unmounted_ from the carrier thread when it reaches a blocking operation.

We can empirically verify this behavior playing around with the `sleep` method, and the above system properties. First, let's define a function creating a virtual thread that contains an infinite loop. Let's say we want to model a employee that is working hard on a task:

```java
static Thread workingHard() {
  return virtualThread(
      "Working hard",
      () -> {
        logger.info("I'm working hard");
        while (alwaysTrue()) {
          // Do nothing
        }
        sleep(Duration.ofMillis(100L));
        logger.info("I'm done with working hard");
      });
}
```

As we can see, the IO operation, the `sleep` method, is after the infinite loop. We defined also an `alwaysTrue()` function, which returns `true`, and it allows us to write an infinite loop without using the `while (true)` construct that is not allowed by the compiler.

Then, we define a function to let our employee take a break:

```java
static Thread takeABreak() {
  return virtualThread(
      "Take a break",
      () -> {
        logger.info("I'm going to take a break");
        sleep(Duration.ofSeconds(1L));
        logger.info("I'm done with the break");
      });
}
```

Now, we can compose the two function and let the two thread race:

```java
@SneakyThrows
static void workingHardRoutine() {
  final Thread vt1 = workingHard();
  final Thread vt2 = takeABreak();
  vt1.join();
  vt2.join();
}
```

Before running the `workingHardRoutine()` function, we set properly the three system properties:

```
-Djdk.virtualThreadScheduler.parallelism=1
-Djdk.virtualThreadScheduler.maxPoolSize=1
-Djdk.virtualThreadScheduler.minRunnable=1
```

The above settings force the scheduler to use a pool configured with only one carrier thread. Since the `"Working hard"` virtual thread never reaches a blocking operation, it will never yield the execution to the `"Take a break"` virtual thread. In fact, the output is the following:

```
21:52:29.852 [Working hard] INFO in.rcard.virtual.threads.App - I'm working hard
```

The `"Working hard"` virtual thread is never unmounted from the carrier thread, and the `"Take a break"` virtual thread is never scheduled.

Let's now change the things a little to let the cooperative scheduling work. We define a new function simulating an employee that is working hard, but it stops working every 100 milliseconds:

```java
static Thread workingConsciousness() {
  return virtualThread(
      "Working consciousness,
      () -> {
        logger.info("I'm working hard");
        while (alwaysTrue()) {
          sleep(Duration.ofMillis(100L));
        }
        logger.info("I'm done with working hard");
      });
}
```

Now, the execution can reach the blocking operation, and the `"Working hard"` virtual thread can be unmounted from the carrier thread. To verify this, we can race the above thread with the `"Take a break"` thread:

```java
@SneakyThrows
static void workingConsciousnessRoutine() {
  final Thread vt1 = workingConsciousness();
  final Thread vt2 = takeABreak();
  vt1.join();
  vt2.join();
}
```

This time, we expect the `"Take a break"` virtual thread to be scheduled and executed on the only carrier thread, when the `"Working consciousness"` reaches the blocking operation. The output confirms our expectations:

```
21:58:34.568 [Working consciousness] INFO in.rcard.virtual.threads.App - I'm working hard
21:58:34.574 [Take a break] INFO in.rcard.virtual.threads.App - I'm going to take a break
21:58:35.578 [Take a break] INFO in.rcard.virtual.threads.App - I'm done with the break
```

Unfortunately, it's not possible to retrieve the name of the carrier thread of a virtual thread, but the above examples show clearly the presence of the cooperative scheduling.

