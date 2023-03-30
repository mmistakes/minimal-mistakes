---
title: "Functional Error Handling in Kotlin"
date: 2023-04-15
header:
image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: "A functional approach to error handling in Kotlin"
---

The Kotlin language is a multi-paradigm, general-purpose programming language. Whether we develop using an object-oriented approach, or a functional one, we always have the problem of handling errors. Kotlin offers a lot of different approaches to handle errors, but in this article, we will focus on the functional approaches, introducing also the `arrow-kt` library. So, without further ado, let's get started.

## 1. Setup

As usual, let's first create the setup we'll use through all the article. We'll use the last version of Kotlin available at the moment of writing, version 1.8.10. 

As we said, we're gonna use the [Arrow](https://arrow-kt.io/) libraries. Arrow adds functional types to the Kotlin standard library. In details, we'll use the [core](https://arrow-kt.io/docs/core/) library. Here, it is the dependency we need:

```xml
<dependency>
    <groupId>io.arrow-kt</groupId>
    <artifactId>arrow-core</artifactId>
    <version>1.1.5</version>
    <type>pom</type>
</dependency>
```

As you may guess, we'll use Maven to build the project. At the end of the article, you'll find the complete `pom.xml` file.

## 2. Why Exception Handling is not Functional

First, we need to understand what's wrong with the traditional approach to error handling, which is based on exceptions. We need some context to understand the problem.

For sake of this examples, imagine we want to create an application that manages a jobs board. First, we need a simplified model of a job:

```kotlin
data class Job(val company: Company, val role: Role, val salary: Salary)

@JvmInline
value class Company(val name: String)
@JvmInline
value class Role(val name: String)
@JvmInline
value class Salary(val value: Double)
```

We can use a dedicated module to retrieve the jobs information:

```kotlin
interface Jobs {
    fun findAll(): List<Job>
}
```

Now that we have our `Jobs` module, we can use it in a program, for example, to retrieve a list of all the jobs offering a minimum salary of 100k:

```kotlin
class JobsService(private val jobs: Jobs) {
    fun getHighlyPaidJobs(minimumSalary: Salary): List<Job> {
        val retrievedJobs = jobs.findAll()
        return try {
            retrievedJobs.filter { it.salary.value > minimumSalary.value }
        } catch (e: Exception) {
            listOf()
        }
    }
}
```
TODO
