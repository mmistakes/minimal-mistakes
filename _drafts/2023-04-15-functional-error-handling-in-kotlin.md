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
data class Job(val id: JobId, val company: Company, val role: Role, val salary: Salary)

@JvmInline
value class JobId(val value: Long)

@JvmInline
value class Company(val name: String)

@JvmInline
value class Role(val name: String)

@JvmInline
value class Salary(val value: Double) {
    operator fun compareTo(other: Salary): Int = value.compareTo(other.value)
}
```

Then, we can simulate a database of jobs using a `Map<JobId, Job>`:

```kotlin
val JOBS_DATABASE: Map<JobId, Job> = mapOf(
    JobId(1) to Job(
        JobId(2),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ),
    JobId(2) to Job(
        JobId(3),
        Company("Microsoft"),
        Role("Software Engineer"),
        Salary(80_000.00),
    ),
    JobId(3) to Job(
        JobId(4),
        Company("Google"),
        Role("Software Engineer"),
        Salary(90_000.00),
    ),
)
```

We can use a dedicated module to retrieve the jobs information. As a first operation, we want to retrieve a job by its id:

```kotlin
interface Jobs {
    fun findById(id: JobId): Job
}
```

Let's start with a trivial implementation of the `Jobs` interface:

```kotlin
class LiveJobs : Jobs {
    override fun findById(id: JobId): Job {
        val maybeJob: Job? = JOBS_DATABASE[id]
        if (maybeJob != null) {
            return maybeJob
        } else {
            throw NoSuchElementException("Job not found")
        }
    }
}
```

For this first implementation, we decided to throw a `NoSuchElementException` when the job is not found.

Now that we have our `Jobs` module, we can use it in a program. Let's say we want to retrieve the salary associated to a particular job. The program is very easy, but it's enough to show the problem:

```kotlin
class JobsService(private val jobs: Jobs) {
    fun retrieveSalary(id: JobId): Double {
        val job = jobs.findById(id)
        return try {
            job.salary.value
        } catch (e: Exception) {
            0.0
        }
    }
}
```

Now, let's see what happens when we run the program for a job that doesn't exist:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val jobsService = JobsService(jobs)
    val jobId: Long = 42
    val salary = jobsService.retrieveSalary(JobId(jobId))
    println("The salary of the job $jobId is $salary")
}
```

As expected the program crashes with the following exception:

```text
Exception in thread "main" java.util.NoSuchElementException: Job not found
	at in.rcard.exception.LiveJobs.findById-aQvFPlM(ExceptionErrorHandling.kt:17)
	at in.rcard.exception.JobsService.retrieveSalary-aQvFPlM(ExceptionErrorHandling.kt:24)
	at in.rcard.MainKt.main(Main.kt:12)
	at in.rcard.MainKt.main(Main.kt)
```

Fair enough. The exception is thrown outside the `try-catch` block, and it bubbles up to the main method. 

One of the main principle functional programming is referential transparency, which states that a function should always return the same result when called with the same arguments. In other words, a function should not have any side effects. One of the corollary of this principle is that an expression can be replaced with its value without changing the program's behavior. 

Let's try it on our program. If we substitute the `jobs.findById(42)` expression to the `job` variable in the `retrieveSalary`method, we get the following code:

```kotlin
fun retrieveSalary(id: JobId): Double {
    val job: Job = throw NoSuchElementException("Job not found")
    return try {
        job.salary.value
    } catch (e: Exception) {
        0.0
    }
}
```

As expected, we obtained a program that crashes with the same exception. However, if we move the retrieval of the job inside the `try-catch` block, we get the following code:

```kotlin
fun retrieveSalary(id: JobId): Double {
    return try {
        val job = jobs.findById(id)
        job.salary.value
    } catch (e: Exception) {
        0.0
    }
}
```

If we execute this code in our program, we clearly obtain a different result than the previous execution. In fact, the exception is now caught by the `try-catch` block, and the program generates the following output.

```text
The salary of the job 42 is 0.0
```

We've just proof that exceptions don't follow the substitution principle. In other words, exceptions are not referentially transparent, and, for this reason, are considered a side effect. In other words, expressions throwing exceptions can't be reasoned about without a context of execution, aka the code around the expression. So, when we use expression, we also lose the locality of reasoning, and add a lot of cognitive load to understand the code.

However, there is one more aspect we don't like about exceptions. Let's take the signature of the `retrieveSalary` method:

```kotlin
fun retrieveSalary(id: JobId): Double
```

We expect the method to take a job id as input, and return a salary as a `Double`. No reference to the exception is present in the signature. As developers, we want that the compilers help us to avoid errors. However, in this case, we're not aware that the method can throw an exception, and the compiler can not help us in any way. The only place where we become aware of the exception is during runtime execution, which is a bit late.

Somebody can say that the JVM also has checked exceptions, and that we can use them to avoid the problem. In fact, if a method declares to throw a checked exception, the compiler will force us to handle it. However, checked exceptions don't work well with higher-order functions, which are a fundamental part of functional programming. In fact, if we want to use a higher-order function together with checked exception, we need to declare the exception in the signature of the lambda function, which is not feasible. Take the `map` function of any collection type:

```kotlin
fun <A, B> map(list: List<A>, f: (A) -> B): List<B>
```

As we might guess, it's impossible to use checked exceptions for the function `f`, since it must to stay generic. The only possible way is to add some very generic exception to the signature of the function, such as a `RuntimeException` or an `Exception`, which is not very useful.

So, we understood that we need a better approach to handle errors, at least in functional programming. Let's see how we can do it.

## 3. Handling Errors with Nullable Types

If we're not interested in the cause of the error, we can model the fact that an operation failed by returning a `null` value. In other languages returning a `null` is not considered a best practice. However, in Kotlin, the null check is built-in the language, and the compiler can help us to avoid errors. In Kotlin, we have Nullable Types. A Nullable Type is a type that can be either a value of the type or `null`. For example, the type `String?` is a nullable type, and it can be either a `String` or `null`.

When we work with nullable types, the compiler forces us to handle the case when the value is `null`. For example, let's change our main example trying to handle error using nullable types. First, we change the signature of the `findAll` method in the `Jobs` interface, letting it to return a nullable list, `List<Job>?`:

```kotlin
interface NullableJobs {
    fun findAll(): List<Job>?
}

class LiveNullableJobs : NullableJobs {
    override fun findAll(): List<Job>? = null
}
```

Then, we try to use it in the `getHighlyPaidJobs` method, as we did previously:

```kotlin

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

The compiler is warning us that we forgot to handle the case in which the list is `null`. As we can see, the compiler is helping us to avoid errors. Let's fix the code:

```kotlin
fun getHighlyPaidJobs(minimumSalary: Salary): List<Job> =
        jobs.findAll()?.filter { it.salary > minimumSalary } ?: listOf()
```

Here, we used the `?.`operator, which allows to call a method on a nullable object only if it's not `null`. Finally, we use the "elvis" operator, `?:`, as a fallback value, in case the list is `null`. With this new bulletproof code, we can now change the `main` method:

```kotlin
fun main() {
    val jobsService = NullableJobsService(LiveNullableJobs())
    val highlyPaidJobs = jobsService.getHighlyPaidJobs(Salary(100_000.00))
    println("Best jobs on the market are: $highlyPaidJobs")
}
```

If we run the program, we get the expected output, without any exception:

```text
Best jobs on the market are: []
```

At first glance, using nullable value seems to be less composable than using, for example, the Java `Optional` type. This last type has a lot of functions, `map`, `flatMap`, or `filter`, which make it easy to compose and chain operations.

Well, Kotlin nullable type have nothing to envy to the Java `Optional` type. In fact, the Kotlin standard library provides a lot of functions to handle nullable types. For example, the `Optional.map` function is equivalent to using the `let` scoping function. For example, let's try to get the jobs by company, using the `let` function:

```kotlin
fun getJobsByCompanyMap(): Map<String, List<Job>> {
    val jobs = jobs.findAll()
    return jobs?.let {
        it.groupBy { job -> job.company.name }
    } ?: return mapOf()
}
```

As we can see, mixing up the `let` function with the `?.` operator, we can easily map a nullable value. In a similar way, we can simulate the `filter` function on a nullable value. In this case, we'll use the `?.` operator and the `takeIf` function. So, let's add a new function to our `NullableJobs` interface and a possible implementation on the live object:

```kotlin
interface NullableJobs { 
    // ...
    fun findFirstByCompany(company: Company): Job?
}

class LiveNullableJobs : NullableJobs {
    // ...
    override fun findFirstByCompany(company: Company): Job? =
        findAll()?.firstOrNull { it.company == company }
        
}
```

Now, we can use the `findFirstByCompany` to implement a method in the service that takes the first job by company if it has a minimum salary:

```kotlin
class NullableJobsService(private val jobs: NullableJobs) {
    // ...
    fun getHighlyPaidJobByCompany(company: Company, minimumSalary: Salary): Job? {
        val job = jobs.findFirstByCompany(company)
        return job?.takeIf { it.salary > minimumSalary }
    }
}
```

As we can see, we used the `takeIf` in association with the `?.` operator to filter the nullable value. The `takeIf` receives as parameter a lambda with receiver, where the receiver is the original type (not the nullable type). 

Now, we can change the `main` method to use the new function:

```kotlin
fun main() {
    val minimumSalary = Salary(100_000.00)
    val jobsService = NullableJobsService(LiveNullableJobs())
    val apple = Company("Apple")
    val job = jobsService.getHighlyPaidJobByCompany(apple, minimumSalary)
    job?.apply { println("One of the best job at $apple on the market is: $this") }
        ?: println("No job at $apple on the market is worth $minimumSalary")
}
```
If we run the program, we get the expected output:

```text
No job at Company(name=Apple) on the market is worth Salary(value=100000.0)
```

Although nullable types offer a good degree of compositionality and a full support by the Kotlin language itself, the community of functional programmers is not very happy with this approach. The reason is that nullable types still require some boilerplate code to handle the case when the value is `null`.

Fortunately, Kotlin and some of its libraries provide a more functional approach to handle errors. Let's see how we can use it.

## 4. Handling Errors with `Option`

Unlike Java, Kotlin doesn't provide a type for handling optional values. As we saw in the previous section, Kotlin creators preferred to introduce nullable values instead of having an `Option<T>` type. 

However, the Kotlin community has created a library called `Arrow` that provides a lot of functional programming constructs, including an `Option` type. In the set-up section, we already imported the dependency from Arrow, so we can use it in our code.

The type defined by the Arrow library to manage optional values is defined as `arrow.core.Option<out A>`. Basically, it's a [Algebraic Data Type (ADT)](https://blog.rockthejvm.com/algebraic-data-types/), technically a sum type, which can be either `Some<A>` or `None`.

The `Some<A>` type represents a value of type `A`, while the `None` type represents the absence of a value. In other words, `Option` is a type that can either contain a value or not.

In Arrow, we can create an `Option` value using directly the available constructors:

```kotlin
val awsJob: Some<Job> =
    Some(
        Job(
            JobId(1),
            Company("AWS"),
            Role("Software Engineer"),
            Salary(100_000.00),
        ),
    )
val noJob: None = None
```

The library also provides some useful extension functions to create `Option` values:

```kotlin
val appleJob: Option<Job> =
    Job(
        JobId(2),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ).some()
val noAppleJob: Option<Job> = none()
```

Be careful: Invoking the `some()` function on a `null` value will return a `Some(null)`. If you want to create an `Option` value from a nullable value, you should use the `Option.fromNullable` function:

```kotlin
val microsoftJob: Job? =
    Job(
        JobId(3),
        Company("Microsoft"),
        Role("Software Engineer"),
        Salary(80_000.00)
    )
val maybeMsJob: Option<Job> = Option.fromNullable(microsoftJob)
val noMsJob: Option<Job> = Option.fromNullable(null) // noMsJob is None
```

Instead, to convert a nullable value to an `Option` value, we can also use the `toOption()` extension function:

```kotlin
val googleJob: Option<Job> =
    Job(
        JobId(4),
        Company("Google"),
        Role("Software Engineer"),
        Salary(90_000.00),
    ).toOption()
val noGoogleJob: Option<Job> = null.toOption() // noGoogleJob is None
```

Now that we know how to create an `Option` value, let's see how we can use it. First of all, we create the version of the `Jobs` module that uses the `Option` type:

```kotlin
TODO()
```

As you may guess, the `Option` type is defined as a sealed class, so we can use the `when` expression to handle the two possible cases:

```kotlin
fun printOptionJob(maybeJob: Option<Job>) {
    when (maybeJob) {
        is Some -> println("Job found: ${maybeJob.value}")
        is None -> println("Job not found")
    }
}
```

In this case, we can call the `value` property of the `Some` type to get the actual value because Kotlin is smart casting the original `maybeJob` value to the `Some` type.

If we call the above function with the `awsJob` value, we get the expected output:

```text
Job found: Job(id=JobId(value=1), company=Company(name=AWS), role=Role(name=Software Engineer), salary=Salary(value=100000.0))
```

However, working the pattern matching is not always very convenient. A lot of time, we need to transform and combine different `Option` values. As it happens in Scala, the `Option` type is a [monad](https://blog.rockthejvm.com/monads/), so we can use the `map`, `flatMap` function to transform and combine `Option` values. Let's see and example.

Imagine we want to create a function that, given a job id, it returns the gap between the job salary and the maximum salary for the same company. If the job doesn't exist, we want to return `None`. We can implement a first version of such a function using directly `map` and `flatMap` functions:

```kotlin
class JobsService(private val jobs: Jobs) {

    fun getSalaryGapWithMax(jobId: JobId): Option<Double> {
        val maybeJob: Option<Job> = jobs.findById(jobId)
        val maybeMaxSalary: Option<Salary> =
            jobs.findAll().maxBy { it.salary.value }.toOption().map { it.salary }
        return maybeJob.flatMap { job ->
            maybeMaxSalary.map { maxSalary ->
                maxSalary.value - job.salary.value
            }
        }
    }
}
```