---
title: "Functional Error Handling in Kotlin, Part 1: Absent values, Nullables, Options"
date: 2023-04-27
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: "Whether we develop using an object-oriented or functional approach, we always have the problem of handling errors. Kotlin offers a lot of different methods to do it. Here, we'll focus on strategies that deal with the error without managing its cause, i.e., nullable types and Arrow Option types."
toc: true
toc_label: "In this article"
---

_This article is brought to you by [Riccardo Cardin](https://github.com/rcardin). Riccardo is a proud alumnus of Rock the JVM, now a senior engineer working on critical systems written in Scala and Kotlin._

If you'd like to watch the video form of this article, please enjoy:

{% include video id="783eGYfsVuU" provider="youtube" %}

The Kotlin language is a multi-paradigm, general-purpose programming language. Whether we develop using an object-oriented or functional approach, we always have the problem of handling errors. Kotlin offers a lot of different methods to handle errors. Still, this article will focus on the functional approaches and introduce the Arrow library. This article is the first part of a series. We'll focus on strategies that deal with the error without managing its cause, i.e., nullable types and Arrow Option types. So, without further ado, let's get started.

> This article assumes you're comfortable with Kotlin. If you need to get those essential skills **as fast as possible** and with thousands of lines of code and a project under your belt, you'll love [Kotlin Essentials](https://rockthejvm.com/p/kotlin-essentials). It's a jam-packed course on **everything** you'll ever need to work with Kotlin for any platform (Android, native, backend, anything), including less-known techniques and language tricks that will make your dev life easier. Check it out [here](https://rockthejvm.com/p/kotlin-essentials).

## 1. Setup

Let's first create the setup we'll use throughout the article as usual. We'll use the last version of Kotlin available at the moment of writing, version 1.8.20.

As we said, we will use the [Arrow](https://arrow-kt.io/) libraries. Arrow adds functional types to the Kotlin standard library. In detail, we'll use the [core](https://arrow-kt.io/docs/core/) library. Here, it is the dependency we need:

```xml
<dependency>
    <groupId>io.arrow-kt</groupId>
    <artifactId>arrow-core</artifactId>
    <version>1.1.5</version>
    <type>pom</type>
</dependency>
```

We'll use Maven to build the project. You'll find the complete `pom.xml` file at the end of the article.

## 2. Why Exception Handling is Not Functional

First, we need to understand what's wrong with the traditional approach to error handling, which is based on exceptions. We need some context to understand the problem.

Imagine we want to create an application that manages a job board. First, we need a simplified model of a job:

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
        JobId(1),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ),
    JobId(2) to Job(
        JobId(2),
        Company("Microsoft"),
        Role("Software Engineer"),
        Salary(80_000.00),
    ),
    JobId(3) to Job(
        JobId(3),
        Company("Google"),
        Role("Software Engineer"),
        Salary(90_000.00),
    ),
)
```

We can use a dedicated module to retrieve the job information. As a first operation, we want to retrieve a job by its id:

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

When the job was not found, we threw a `NoSuchElementException`. Easy peasy.

Now that we have our `Jobs` module, we can use it in a program. Let's say we want to retrieve the salary associated with a particular job. The program is straightforward, but it's enough to show the problem:

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

As expected, the program crashes with the following exception:

```text
Exception in thread "main" java.util.NoSuchElementException: Job not found
	at in.rcard.exception.LiveJobs.findById-aQvFPlM(ExceptionErrorHandling.kt:17)
	at in.rcard.exception.JobsService.retrieveSalary-aQvFPlM(ExceptionErrorHandling.kt:24)
	at in.rcard.MainKt.main(Main.kt:12)
	at in.rcard.MainKt.main(Main.kt)
```

Fair enough. The exception is thrown outside the `try-catch` block and bubbles up to the `main` method.

One of the main principles of functional programming is referential transparency, which states that a function should always return the same result when called with the same arguments. In other words, a function should not have any side effects. One of the results of this principle is that **an expression can be replaced with its value without changing the program's behavior**.

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

If we execute this code in our program, we obtain a different result than the previous execution. In fact, the exception is now caught by the `try-catch` block, and the program generates the following output.

```text
The salary of the job 42 is 0.0
```

We've just proven that exceptions don't follow the substitution principle. In other words, exceptions are not referentially transparent and, for this reason, are considered a side effect. In other words, **an expression throwing exceptions can't be reasoned about without a context of execution, aka the code around the expression**. So, when we use the expression, we also lose the locality of reasoning and add a lot of cognitive loads to understand the code.

Moreover, there is one more aspect we would like to change about exceptions. Let's take the signature of the `retrieveSalary` method:

```kotlin
fun retrieveSalary(id: JobId): Double
```

We expect the method to take a job id as input and return a salary as a `Double`. No reference to the exception is present in the signature. **As developers, we want the compilers to help us avoid errors**. However, in this case, we're not aware that the method can throw an exception, and the compiler can not help us in any way. The only place we become aware of the exception is during runtime execution, which is a bit late.

Somebody can say that the JVM also has checked exceptions and that we can use them to avoid the problem. However, **Kotlin doesn't have checked exceptions**. Let's try to act as if it has them. If a method declares to throw a checked exception, the compiler will force us to handle it. But, **checked exceptions don't work well with higher-order functions**, which are fundamental to functional programming. In fact, if we want to use a higher-order function together with checked exceptions, we need to declare the exception in the signature of the lambda function, which is not feasible. Take the `map` function of any collection type:

```kotlin
fun <A, B> map(list: List<A>, f: (A) -> B): List<B>
```

As we might guess, using checked exceptions for the function `f` is impossible since it must stay generic. The only possible way is to add some generic exception to the function's signature, such as an `Exception`, which is useless.

So, we understood that we need a better approach to handle errors, at least in functional programming. Let's see how we can do it.

## 3. Handling Errors with Nullable Types

Suppose we're not interested in the cause of the error. In that case, we can model that an operation failed by returning a `null` value. In other languages returning a `null` is not considered a best practice. However, **in Kotlin, the null check is built-in the language, and the compiler can help us to avoid errors**. In Kotlin, we have nullable types. A nullable type is a type that can be either a value of the class or `null`. For example, the type `String?` is a nullable type, and it can be either a `String` or `null`.

When we work with nullable types, the compiler forces us to handle the case when the value is `null`. For example, let's change our primary example, handling errors using nullable types. First, we redefined the `Jobs` interface and its implementation to use nullable types:

```kotlin
interface Jobs {
    fun findById(id: JobId): Job?
}

class LiveJobs : Jobs {
    override fun findById(id: JobId): Job? = try {
        JOBS_DATABASE[id]
    } catch (e: Exception) {
        null
    }
}
```

As we said, using nullable types to handle failures means completely losing the cause of the error, which is not propagated in any way to the caller.

Then, we also change the `JobsService`, and we try to use the dereference operator `.` to access the `salary` property of the `Job` object directly:

```kotlin
class JobsService(private val jobs: Jobs) {
    fun retrieveSalary(id: JobId): Double =
        jobs.findById(id).salary.value
}
```

If we try to compile the code, we get the following error:

```text
Compilation failure
[ERROR] /functional-error-handling-in-kotlin/src/main/kotlin/in/rcard/nullable/NullableTypeErrorHandling.kt:[21,26] Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type Job?
```

The compiler is warning us that we forgot to handle the case where the list is `null`. As we can see, the compiler is helping us to avoid errors. Let's fix the code:

```kotlin
fun retrieveSalary(id: JobId): Double =
    jobs.findById(id)?.salary?.value ?: 0.0
```

Here, we used the `?.` operator to call a method on a nullable object only if it's not `null`. We must use the `?.` operator for every method call if we have a chain of calls. Finally, we use the "Elvis" operator, `?:`, as a fallback value, in case the job is `null`.

At first, using a nullable value seems less composable than using, for example, the Java `Optional` type. This last type has a lot of functions, `map`, `flatMap`, or `filter`, which make it easy to compose and chain operations.

Kotlin nullable types have nothing to envy to the Java `Optional` type. In fact, the Kotlin standard library provides a lot of functions to handle nullable types. For example, **the `Optional.map` function is equivalent to the `let` scoping function**:

```kotlin
// Kotlin SDK
public inline fun <T, R> T.let(block: (T) -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block(this)
}
```

The `let` function takes a lambda function as input, applying it to the receiver type, and returning the result, as the `map` function (ed., [contracts](https://kotlinlang.org/docs/whatsnew13.html#contracts) is a powerful tool of the language to give the compiler some hints).

To build an example, let's say that the salary of our jobs is in USD, and we want to convert it to EUR. We need a new service to do that:

```kotlin
class CurrencyConverter {
    fun convertUsdToEur(amount: Double): Double = amount * 0.91
}
```

We can pass the new service to the `JobsService` and use it to get the salary in EUR for a job:

```kotlin
class JobsService(private val jobs: Jobs, private val converter: CurrencyConverter) {
    
    // Omissis...
    fun retrieveSalaryInEur(id: JobId): Double =
        jobs.findById(id)?.let { converter.convertUsdToEur(it.salary.value) } ?: 0.0
}
```

We can easily map a nullable value by mixing up the `let` function with the `?.` operator. Similarly, we can simulate the `filter` function on a nullable value. We'll use the `?.` operator and the `takeIf` function in this case. So, let's add a new function to our service that returns if a job is an Apple job:

```kotlin
fun isAppleJob(id: JobId): Boolean =
    jobs.findById(id)?.takeIf { it.company.name == "Apple" } != null
```

As we can see, we used the `takeIf` in association with the `?.` operator to filter the nullable value. The `takeIf` is an extension function that receives a lambda predicate as a parameter and applies the lambda to the receiver type (not the nullable type):

```kotlin
// Kotlin SDK
@OptIn(ExperimentalContracts::class)
public inline fun <T> T.takeIf(predicate: (T) -> Boolean): T? {
    contract {
        callsInPlace(predicate, InvocationKind.EXACTLY_ONCE)
    }
    return if (predicate(this)) this else null
}
```

Now, we can change the `main` method to use the new function:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val currencyConverter = CurrencyConverter()
    val jobsService = JobsService(jobs, currencyConverter)
    val appleJobId = JobId(1)
    val isAppleJob = jobsService.isAppleJob(appleJobId)
    println("Q: Is the job with id $appleJobId an Apple job?\nA: $isAppleJob")
}
```
If we run the program, we get the expected output:

```text
Q: Is the job with id JobId(value=1) an Apple job?
A: false
```

Although the `?.` operator and the `let` function are extremely powerful, ending with a code with many nested calls is pretty straightforward. For example, let's create a function in our service that returns the sum of the salaries of two jobs:

```kotlin
fun sumSalaries(jobId1: JobId, jobId2: JobId): Double? {
    val maybeJob1: Job? = jobs.findById(jobId1)
    val maybeJob2: Job? = jobs.findById(jobId2)
    return maybeJob1?.let { job1 ->
        maybeJob2?.let { job2 ->
            job1.salary.value + job2.salary.value
        }
    }
}
```

To overcome the above problem, we can use some sweet functionalities provided by the Kotlin Arrow library. We already imported the dependency from Arrow in the setup section, so we can use it in our code.

The Arrow library provides a lot of functional programming constructs. In detail, for error handling, **it provides a uniform form of monadic list-comprehension** (in Scala, it's called _for-comprehension_) that allows us to write functional code more imperatively and declaratively and avoid the nested calls.

The Arrow DSL applies the same syntax for all the types we can use to handle errors, and it's based on the concept of continuations.

For nullable type, Arrow offers the `nullable` DSL. We can access helpful functions inside the DSL, such as the `ensureNotNull` function and the `bind` extension function. Let's rewrite the `sumSalaries` function using the `nullable` DSL, adding a few logs that we'll use to understand what's going on:

```kotlin
import arrow.core.raise.*

fun sumSalaries2(jobId1: JobId, jobId2: JobId): Double? = nullable {
    println("Searching for the job with id $jobId1")
    val job1: Job = jobs.findById(jobId1).bind()
    println("Job found: $job1")
    println("Searching for the job with id $jobId2")
    val job2: Job = ensureNotNull(jobs.findById(jobId2))
    println("Job found: $job2")
    job1.salary.value + job2.salary.value
}
```

As we can see, the two functions extract the value from the nullable type. If the value is `null`, then the `nullable` block returns `null` immediately. In the version 2.0 of Arrow, the `nullable` DSL manages both normal and suspend functions inside.

We can give the function a job id that doesn't exist, and then we can check its behavior:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val currencyConverter = CurrencyConverter()
    val jobsService = JobsService(jobs, currencyConverter)
    val salarySum = jobsService.sumSalaries2(JobId(42), JobId(2)) ?: 0.0
    println("The sum of the salaries using 'sumSalaries' is $salarySum")
}
```

The output of the program is the following:

```text
Searching for the job with id JobId(value=42)
The sum of the salaries using 'sumSalaries' is 0.0
```

As we might expect, the function returns `null` immediately after searching for the `JobId(42)` returns `null`.

Although nullable types offer a reasonable degree of compositionality and full support by the Kotlin language, there are some cases when you can't use it to handle errors. There are some domains where the `null` value is valid, and we can't use it to represent an error. Other times, we need to work with some external libraries that don't support nullable types, such as RxJava or the project Reactor.

Fortunately, Kotlin and the Arrow library provide a lot of alternatives to handle errors functionally. Let's start with the `Option` type.

## 4. Handling Errors with `Option`

Unlike Java, Kotlin doesn't provide a type for handling optional values. As we saw in the previous section, **Kotlin creators preferred introducing nullable values instead of having an `Option<T>` type**.

We can add optional types to the language using the `Arrow` library, which provides a lot of functional programming constructs, including an `Option` type.

The type defined by the Arrow library to manage optional values is the `arrow.core.Option<out A>` type. Basically, it's a [Algebraic Data Type (ADT)](https://blog.rockthejvm.com/algebraic-data-types/), technically a sum type, which can be either `Some<A>` or `None`.

The `Some<A>` type represents a value of type `A`, while the `None` type represents the absence of any value. In other words, `Option` is a type that can either contain a value or not.

In Arrow, we can create an `Option` value using the available constructors directly:

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

The library also provides some helpful extension functions to create `Option` values:

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

Now that we know how to create `Option` values let's see how to use it. First of all, we make the version of the `Jobs` module that uses the `Option` type:

```kotlin
interface Jobs {

    fun findById(id: JobId): Option<Job>
}

class LiveJobs : Jobs {
    
    override fun findById(id: JobId): Option<Job> = try {
        JOBS_DATABASE[id].toOption()
    } catch (e: Exception) {
        none()
    }
}
```

Again, we're not interested in the cause of the error. We want to handle it. If the `findById` function fails, we return a `None` value. As you may guess, **the `Option` type is a sealed class**, so we can use the `when` expression to handle the two possible cases. We can define a function that prints the job information of a job id if it exists:

```kotlin
class JobsService(private val jobs: Jobs) {

    fun printOptionJob(jobId: JobId) {
        val maybeJob: Option<Job> = jobs.findById(jobId)
        when (maybeJob) {
            is Some -> println("Job found: ${maybeJob.value}")
            is None -> println("Job not found for id $jobId")
        }
    }
}
```

In this case, we can call the `value` property of the `Some` type to get the actual value because Kotlin is smart casting the original `maybeJob` value to the `Some` type.

If we call the above function with the id of a job present in the database, aka `JobId(1)`, we get the expected output:

```text
Job found: Job(id=JobId(value=2), company=Company(name=Apple, Inc.), role=Role(name=Software Engineer), salary=Salary(value=70000.0))
```

However, if we use a job id that is not associated with any job, we get the following output:

```text
Job not found for id JobId(value=42)
```

However, working with pattern matching is only sometimes very convenient. A lot of time, we need to transform and combine different `Option` values. As in Scala, the `Option` type is a [monad](https://blog.rockthejvm.com/monads/), so we can use the `map` and `flatMap` functions to transform and combine `Option` values. Let's see an example.

Imagine we want to create a function that returns the gap between the job salary given a job id and the maximum salary for the same company. We want to return `None` if the job doesn't exist. To implement such a function, first, we need to add a `findAll` method to our `Jobs` interface:

```kotlin
interface Jobs {

    // Omissis...
    fun findAll(): List<Job>
}

class LiveJobs : Jobs {
    
    // Omissis...
    override fun findAll(): List<Job> = JOBS_DATABASE.values.toList()
}
```

Then, we can implement the first version of the function calculating the salary gap using direct `map` and `flatMap` functions:

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

We can check that everything is working by invoking the `getSalaryGapWithMax` in our `main` function:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val jobsService = JobsService(jobs)
    val appleJobId = JobId(1)
    val salaryGap: Option<Double> = jobsService.getSalaryGapWithMax(appleJobId)
    println("The salary gap between $appleJobId and the max salary is ${salaryGap.getOrElse { 0.0 }}")
}
```

If we run the above code, we get the expected following output:

```text
The salary gap between JobId(value=1) and the max salary is 20000.0
```

As we said, **the Kotlin language does not support the _for-comprehension_ syntax**, so the sequences of nested calls to the `flatMap` and `map` function repeatedly can be a bit confusing. Again, the Arrow library gives us help and defines an `option` DSL to call functions on `Option` values in a more readable way.

The `option` DSL is similar to the `nullable` DSL, but works on the `Option` type instead. As for the `nullable` counterpart, we have two flavors of the DSL. The one accepting a suspendable lambda with receiver is `option`, and the one taking a non-suspendable lambda with receiver is called `option.eager`. The receiver of the former DSL is an `arrow.core.continuations.OptionEffectScope`. In contrast, the latter DSL accepts an `arrow.core.continuations.OptionEagerEffectScope`:

```kotlin
// Arrow SDK
public object option {
    public inline fun <A> eager(crossinline f: suspend OptionEagerEffectScope.() -> A): Option<A> =
            // Omissis...

    public suspend inline operator fun <A> invoke(crossinline f: suspend OptionEffectScope.() -> A): Option<A> =
            // Omissis...
}
```

Let's change the above function to use the `option` DSL:

```kotlin
fun getSalaryGapWithMax2(jobId: JobId): Option<Double> = option.eager {
    println("Searching for the job with id $jobId")
    val job: Job = jobs.findById(jobId).bind()
    println("Job found: $job")
    println("Searching for the job with the max salary")
    val maxSalaryJob: Job = jobs.findAll().maxBy { it.salary.value }.toOption().bind()
    println("Job found: $maxSalaryJob")
    maxSalaryJob.salary.value - job.salary.value
}
```

Again, inside the DSL, the `bind` function is available. If you remember from the previous section, the  `bind` function is defined as a member extension function of the `EagerEffectScope` on the `Option` type. It extracts the value from the `Option` if it is a `Some` value. Otherwise, it eagerly returns `None` to the whole DSL:

```kotlin
// Arrow SDK
public value class OptionEagerEffectScope(private val cont: EagerEffectScope<None>) : EagerEffectScope<None> {
    
    // Omissis... 
    public suspend fun <B> Option<B>.bind(): B = bind { None }
}

public suspend fun <B> Option<B>.bind(shift: () -> R): B =
    when (this) {
        None -> shift(shift())
        is Some -> value
    }
```

Let's check it out. We change the `main` function to call the `getSalaryGapWithMax2` function, passing a not existing job id:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val jobsService = JobsService(jobs)
    val salarySum = jobsService.getSalaryGapWithMax2(JobId(42))
    println("The sum of the salaries using 'sumSalaries' is ${salarySum.getOrElse { 0.0 }}")
}
```

We can check that the function immediately returns the `None` value without executing the rest of the code:

```text
Searching for the job with id JobId(value=42)
The sum of the salaries using 'sumSalaries' is 0.0
```

In addition, the `option` DSL also integrates with nullable types through the `ensureNotNull` function. In this case, if present, the function extracts the value from a nullable type. Otherwise, it collapses the execution of the whole lambda in input to the `option` DSL, returning the `None` value. Then, we can rewrite the above example as follows:

```kotlin
fun getSalaryGapWithMax3(jobId: JobId): Option<Double> = option.eager {
    val job: Job = jobs.findById(jobId).bind()
    val maxSalaryJob: Job = ensureNotNull(
            jobs.findAll().maxBy { it.salary.value },
    )
    maxSalaryJob.salary.value - job.salary.value
}
```

Last but not least, the `nullable` DSL we've seen in the previous section integrates smoothly with the `Option` type. In this case, the `bind` function called on a `None` type will eagerly end the whole block returning a `null` value:

```kotlin
fun getSalaryGapWithMax4(jobId: JobId): Double? = nullable {
    println("Searching for the job with id $jobId")
    val job: Job = jobs.findById(jobId).bind()
    println("Job found: $job")
    println("Searching for the job with the max salary")
    val maxSalaryJob: Job = ensureNotNull(
            jobs.findAll().maxBy { it.salary.value },
    )
    println("Job found: $maxSalaryJob")
    maxSalaryJob.salary.value - job.salary.value
}
```

We can quickly test it by giving the `getSalaryGapWithMax4` function a job id that is not present in the database and checking logs:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val jobsService = JobsService(jobs)
    val fakeJobId = JobId(42)
    val salaryGap: Double? = jobsService.getSalaryGapWithMax4(fakeJobId)
    println("The salary gap between $fakeJobId and the max salary is ${salaryGap ?: 0.0}")
}
```

The logs we get are the following, highlighting the fact that the `bind` function is called on a `None` value, and the whole block is immediately ended:

```text
Searching for the job with id JobId(value=42)
The salary gap between JobId(value=42) and the max salary is 0.0
```

## 5. Conclusions

This article introduced the meaning of functional error handling in Kotlin. We started showing why we shouldn't rely on exceptions to handle errors. Then, we introduced two strategies to handling errors that forget the cause of errors: Kotlin nullable types and the Arrow `Option` type. Moreover, we saw how the Arrow library provides useful DSL to work with both nullable types and the `Option` type. 

In the next part of this series, we will see different strategies that allow us to propagate the cause of errors, such as the Kotlin `Result<T>` type and the Arrow `Either<L, R>` type.

If you found this article too difficult, you can quickly get the experience you need by following the complete [Kotlin Essentials course](https://rockthejvm.com/p/kotlin-essentials) on Rock the JVM.

## 6. Appendix: Maven Configuration

We give you the maven configuration we used during the examples. Here is the `pom.xml` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>in.rcard</groupId>
    <artifactId>functional-error-handling-in-kotlin</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <kotlin.version>1.8.20</kotlin.version>
        <arrow-core.version>1.1.5</arrow-core.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
        <dependency>
            <groupId>io.arrow-kt</groupId>
            <artifactId>arrow-core</artifactId>
            <version>${arrow-core.version}</version>
            <type>pom</type>
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
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>7</source>
                    <target>7</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
