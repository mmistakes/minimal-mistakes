---
title: "Java Next Big Thing: Project Loom"
date: 2023-01-30
header:
    image: "/images/blog cover.jpg"
tags: []
excerpt: "Scalac article lol."
---

Version 19 of Java came at the end of the 2022, and it brought us a lot of interesting stuff. One of the coolest is the preview of some hot topics concerning Project Loom: _virtual threads_ ([JEP 425](https://openjdk.org/jeps/425)) and _structural concurrency_ ([JEP 428](https://openjdk.org/jeps/428)). Whereas still in a preview phase (to tell the truth, structural concurrency is still in the incubator module), the two JEPs promise to bring modern concurrency paradigms that we already found in Kotlin (coroutines) and Scala (Cats Effect and ZIO fibers) also in the mainstream language of the JVM: The Java programming language.

Without further ado, let's introduce them. As we said, keep in mind that both the project are still evolving, so the final version of the features might be different from what we are going to see here.