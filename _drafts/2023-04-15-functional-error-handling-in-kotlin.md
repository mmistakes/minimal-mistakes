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
value class Salary(val value: Double) {
    operator fun compareTo(other: Salary): Int = value.compareTo(other.value)
}
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

Let's start with a trivial implementation of the `Jobs` interface:

```kotlin
class FakeJobs : Jobs {
    override fun findAll(): List<Job> = throw RuntimeException("Boom!")
}
```

As we can see, the `FakeJobs` class throws an exception when we call the `findAll` method. Now, let's see what happens when we run the program:

```kotlin
fun main() {
    val jobsService = JobsService(FakeJobs())
    val highlyPaidJobs = jobsService.getHighlyPaidJobs(Salary(100_000.00))
    println("Best jobs on the market are: $highlyPaidJobs")
}
```

As expected the program crashes with the following exception:

```text
Exception in thread "main" java.lang.RuntimeException: Boom!
	at in.rcard.FakeJobs.findAll(FunctionalErrorHandling.kt:14)
	at in.rcard.JobsService.getHighlyPaidJobs(FunctionalErrorHandling.kt:19)
	at in.rcard.FunctionalErrorHandlingKt.main(FunctionalErrorHandling.kt:5)
	at in.rcard.FunctionalErrorHandlingKt.main(FunctionalErrorHandling.kt)
```

Fair enough. The exception is thrown outside the `try-catch` block, and it bubbles up to the main method. 

One of the main principle functional programming is referential transparency, which states that a function should always return the same result when called with the same arguments. In other words, a function should not have any side effects. One of the corollary of this principle is that an expression can be replaced with its value without changing the program's behavior. 

Let's try it on our program. If we substitute the `jobs.findAll()` expression to the `retrievedJobs` variable, we get the following code:

```kotlin
class JobsService(private val jobs: Jobs) {
    fun getHighlyPaidJobs(minimumSalary: Salary): List<Job> {
        return try {
            jobs.findAll().filter { it.salary > minimumSalary } // <== Substituted expression
        } catch (e: Exception) {
            listOf()
        }
    }
}
``` 

If we execute this code in our program, we clearly obtain a different result, than the previous execution:

```text
Best jobs on the market are: []
```

