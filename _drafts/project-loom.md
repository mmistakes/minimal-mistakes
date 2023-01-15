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