---
title: "Functional Error Handling in Kotlin, Part 2: Result, Either, and the Raise DSL"
date: 2023-06-01
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: "In this article"
---

In the [first part](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/) of this series, we introduced some of the available strategies to handle errors in a functional fashion using Kotlin and the Arrow library. In this second part, we'll continue our journey by looking at the `Result` and `Either` data types, and how to use them to handle errors in a functional way. In the end, we'll also introduce the Raise DSL, a pragmatic approach to functional error handling implemented in the Arrow library. 

For the setup of the project, please refer to the first part of this series, in which we set up Maven and the needed dependencies.

Without further ado, let's get started!

## 1. Lifting the Try-Catch Approach to a Higher Level: The `Result` Type

Nullable types and the `Option` type we've seen so far are great for handling errors in a functional way, they don't store the cause of the error. In other words, they don't tell us _why_ the error happened.

We can represent an error using different approaches. The first one is reusing the `Throwable` type and all its exceptions subtypes. The Kotlin programming language has the `Result<A>` type for that, which models the result of an operation that may succeed or may result in an exception. In that, it's similar to the `Try<A>` type we've seen in the Scala programming language.

Despite what you may guess, the `Result<A` type is not defined as a sealed class. It's a value class, without any subclass:

```kotlin
// Kotlin SDK
@JvmInline
public value class Result<out T> @PublishedApi internal constructor(
    @PublishedApi
    internal val value: Any?
) : Serializable
```

If you're asking, the `@PublishedApi` marks the `internal` constructor and the `value` as accessible from public extension inline functions, but not from anywhere else. Here, the trick to represent success and failure results as values of the `value` attribute, which has type `Any?`, and not `T?`. In case of success, the `value` attribute will contain the value of type `T`, while in case of failure, it will contain an instance of the `Result.Failure` class, defined as follows:

```kotlin
// Kotlin SDK
internal class Failure(
        @JvmField
        val exception: Throwable
    ) : Serializable
```

Now that we introduced a bit of internals, let's see how we can create instances of the `Result<A>` type. Kotlin defines two different smart constructors for that:

```kotlin
val appleJob: Result<Job> = Result.success(
    Job(
        JobId(2),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ),
)

val notFoundJob: Result<Job> = Result.failure(NoSuchElementException("Job not found")) 
```

Unfortunately. we've no fancy extension functions defined on the `Result<A>` type, so we can't write anything similar to `job.toResult()`. _C'est la vie_. To be fair, it's not that hard to define such an extension function:

```kotlin
fun <T> T.toResult(): Result<T> =
    if (this is Throwable) Result.failure(this) else Result.success(this)

val result = 42.toResult()
```

Now that we know how to build a `Result`, how can we use it? First of all, let's create the version of our `Jobs` module that uses the `Result` type:

```kotlin
interface Jobs {

    fun findById(id: JobId): Result<Job?>
}

class LiveJobs : Jobs {

    override fun findById(id: JobId): Result<Job?> = try {
        Result.success(JOBS_DATABASE[id])
    } catch (e: Exception) {
        Result.failure(e)
    }
}
```

Nothing fancy here. We decided to handle only real errors using the `Result` type, and not the case in which the job is not found.

The `findById` function is implemented using the `try-catch` approach. However, the fact that using the `Result` type together with a `try-catch` block is so common, that the Kotlin SDK defines a `runCatching` function that does exactly that:

```kotlin
// Kotlin SDK
public inline fun <R> runCatching(block: () -> R): Result<R> {
    return try {
        Result.success(block())
    } catch (e: Throwable) {
        Result.failure(e)
    }
}
```

Using the `runCatching` function, we can rewrite the `findById` function as follows:

```kotlin
override fun findById(id: JobId): Result<Job?> = runCatching {
    JOBS_DATABASE[id]
}
```

The `runCatching` function is also defined as an extension function on the `Any` type, so we can use it on any object:

```kotlin
override fun findById(id: JobId): Result<Job?> = id.runCatching {
    JOBS_DATABASE[this]
}
```


Once we have a `Result`, we can use it in different ways. The first one is to check if the result is a success or a failure. We can do that using the `isSuccess` and `isFailure` properties. To show them, as we made for other types, we can create our `JobsService` using the new flavor of the `Jobs` module:

```kotlin
class JobService(private val jobs: Jobs) {

    fun printOptionJob(jobId: JobId) {
        val maybeJob: Result<Job?> = jobs.findById(jobId)
        if (maybeJob.isSuccess) {
            maybeJob.getOrNull()?.apply { println("Job found: $this") } ?: println("Job not found for id $jobId")
        } else {
            println("Something went wrong: ${maybeJob.exceptionOrNull()}")
        }
    }
}
```

The above code introduces also some of the extractor methods defined on the `Result` type: 
* `getOrNull` returns the value of the `Result`, or `null` otherwise.
* `getOrThrow` returns the value of the `Result`, or the throw the exception contained in the `Result.Failure` instance.
* `getOrDefault` returns the value of the `Result`, or a given default value if the `Result` is a failure.
* `getOrElse` returns the value of the `Result`, or the result of a given lambda, `onFailure: (exception: Throwable) -> R` if the `Result` is a failure.

On the other end, the method `exceptionOrNull` returns the exception contained in the `Result.Failure` instance, or `null` otherwise.

If we execute the above method using a valid `JobId`, we'll get the following output:

```text
Job found: Job(id=JobId(value=1), company=Company(name=Apple, Inc.), role=Role(name=Software Engineer), salary=Salary(value=70000.0))
```

However, it far more idiomatic to transform and react to values of a `Result` rather than extracting it. To apply a transformation to the value of a `Result`, we can use the classic `map` function:

```kotlin
val appleJobSalary: Result<Salary> = appleJob.map { it.salary }
```

Instead, we can use the `mapCatching` function if the transformation to apply to the value of the `Result` can throw an exception. Let's reuse our `CurrencyConverter` class. This time, we add a validation on the input amount:

```kotlin
class CurrencyConverter {
    @Throws(IllegalArgumentException::class)
    fun convertUsdToEur(amount: Double?): Double =
        if (amount != null && amount >= 0.0) {
            amount * 0.91
        } else {
            throw IllegalArgumentException("Amount must be positive")
        }
}
```

The converter will throw an exception if the input amount is present and not negative. Let's think about the converter as an external library that we can't change. We can use the `mapCatching` function to convert the salary of a job from USD to EUR, handling the fact that the conversion can fail throwing an exception:

```kotlin
fun getSalaryInEur(jobId: JobId): Result<Double> =
    jobs.findById(jobId)
        .map { it?.salary }
        .mapCatching { currencyConverter.convertUsdToEur(it?.value) }
```

If we execute the above function using a invalid `JobId`, we'll get a `Result` containing the exception thrown by the `convertUsdToEur` function:

```kotlin
fun main() {
    val currencyConverter = CurrencyConverter()
    val jobs = LiveJobs()
    val maybeSalary = JobService(jobs, currencyConverter).getSalaryInEur(JobId(42))
    println(maybeSalary)
}
```

The output is the following:

```text
Failure(java.lang.IllegalArgumentException: Amount must be positive)
```




