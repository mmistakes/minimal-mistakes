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

If we execute this code in our program, we clearly obtain a different result than the previous execution. In fact, the exception is now caught by the `try-catch` block, and the program returns an empty list.

```text
Best jobs on the market are: []
```

We've just proof that exceptions don't follow the substitution principle. In other words, exceptions are not referentially transparent, and can for this reason are considered a side effect. In other words, expressions throwing exceptions can't be reasoned about without a context of execution, aka the code around the expression. So, when we use expression, we also lose the locality of reasoning, and add a lot of cognitive load to understand the code.

However, there is one more aspect we don't like about exceptions. Let's take the signature of the `getHighlyPaidJobs method:

```kotlin
fun getHighlyPaidJobs(minimumSalary: Salary): List<Job>
```

We expect the method to take a `Salary` object as input, and return list of `Job` objects. No reference to the exception is present in the signature. As developers, we want that the compilers help us to avoid errors. However, in this case, we're not aware that the method can throw an exception, and the compiler can not help us in any way. The only place where we become aware of the exception is during runtime execution, which is a bit late.

Somebody can say that the JVM also has checked exceptions, and that we can use them to avoid the problem. In fact, if a method declares to throw a checked exception, the compiler will force us to handle it. However, checked exceptions don't work well with higher-order functions, which are a fundamental part of functional programming. In fact, if we want to use a higher-order function together with checked exception, we need to declare the exception in the signature of the lambda function, which is not feasible. Take the `map` function of any collection type:

```kotlin
fun <A, B> map(list: List<A>, f: (A) -> B): List<B>
```

As we might guess, it's impossible to use checked exceptions for the function `f`, since it must to stay generic. The only possible way is to add some very generic exception to the signature of the function, such as a `RuntimeException` or an `Exception`, which is not very useful.

So, we understood that we need a better approach to handle errors, at least in functional programming. Let's see how we can do it.

## 3. Handling Errors with Nullable Types

If we're not interested in the cause of the error, we can model the fact that an operation failed by returning a `null` value. In other languages returning a `null` is not considered a best practice. However, in Kotlin, the null check is built-in the language, and the compiler can help us to avoid errors. In Kotlin, we have Nullable Types. A Nullable Type is a type that can be either a value of the type or `null`. For example, the type `String?` is a nullable type, and it can be either a `String` or `null`.

When we work with Nullable types, the compiler forces us to handle the case when the value is `null`. For example, let's change our main example trying to handle error using nullable types:

```kotlin
interface NullableJobs {
    fun findAll(): List<Job>?
}

class LiveNullableJobs : NullableJobs {
    override fun findAll(): List<Job>? = null
}

class NullableJobsService(private val jobs: NullableJobs) {
    fun getHighlyPaidJobs(minimumSalary: Salary): List<Job> =
        jobs.findAll().filter { it.salary > minimumSalary }
}
```

If we try to compile the code, we get the following error:

```text
 Compilation failure
[ERROR] .../functional-error-handling-in-kotlin/src/main/kotlin/in/rcard/FunctionalErrorHandling.kt:[38,23] Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type List<Job>?
```

TODO

