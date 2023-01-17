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

## 3. Virtual Threads

As we said, virtual threads are a new type of thread that tries to overcome the problem of resource limitation of platform threads. They are an alternate implementation of the `java.lang.Thread` type, which store they stack frames in the heap (garbage collected memory) instead of the stack.

Therefore, the initial memory footprint of a virtual thread tends to be very small, a few of hundred bytes, instead of megabytes. In fact, the stack chunk can resize in every moment. So, we don't need to allocate a gazillion of memory to try to fit every possible use case. 

Create a new virtual thread is very easy. We can use the new factory method `ofVirtual`on the `java.lang.Thread` type:

```java
private static Thread createNewVirtualThreadWithFactory() {
  return Thread.ofVirtual().start(() -> System.out.println("Hello from a virtual thread!"));
}
```

Other than the factory method, we can use a new implementation of the `java.util.concurrent.ExecutorService` tailored on virtual threads:

```java
private static void createNewVirtualThreadWithExecutorService()
    throws ExecutionException, InterruptedException {
  try (var executorService = Executors.newVirtualThreadPerTaskExecutor()) {
    var future = executorService.submit(() -> System.out.println("Hello from a virtual thread!"));
    future.get();
  }
}
```