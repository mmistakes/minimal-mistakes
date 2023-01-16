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

The JVM is a multithreaded environment. As we may know, the JVM gives us an abstraction of OS threads through the type `Thread`. Until Project Loom, every thread in the JVM is just a little wrapper around an OS thread. We can call such implementation of the `Thread` type as _platform thread_.

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

The results depend on the OS and the hardware, but we can easily reach a `OutOfMemoryError` in a few seconds.

The above example shows how we wrote concurrent programs was constrained until now. In fact, the more straightforward way to write concurrent programs in Java is to create a new thread for every concurrent task, _one task per thread_ approach. In such approach, every thread can use its own local variable to store information, and the need to share mutable state among threads drastically decreases. However, using such approach, we can easily reach the limit of the number of threads that we can create.

As we said in the article concerning Kotlin Coroutines, a lot of different approaches risen during the past years to overcome the above problem. Reactive programming and async/await approach are two of the most popular. 
