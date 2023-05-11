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

We can represent an error using different approaches. The first one is reusing the `Throwable` type and all its exceptions subtypes. The Kotlin programming language has the `Result<A>` type for that since version 1.3, which models the result of an operation that may succeed or may result in an exception. In that, it's similar to the `Try<A>` type we've seen in the Scala programming language.

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

If we want to recover from an failure `Result`, we can use the `recover` function. This function takes a lambda that will be executed if the `Result` is a failure. The lambda takes as input the exception contained in the `Result.Failure` instance, and returns a new value of the same type of the original `Result`:

```kotlin
// Kotlin SDK
public inline fun <R, T : R> Result<T>.recover(transform: (exception: Throwable) -> R): Result<R> {
    contract {
        callsInPlace(transform, InvocationKind.AT_MOST_ONCE)
    }
    return when (val exception = exceptionOrNull()) {
        null -> this
        else -> Result.success(transform(exception))
    }
}
```

The original `T` type must be a subtype of the new `R` type since we return the original value if the `Result` is a success.

In our example, we can use the `recover` function to return a default value if no job is found:

```kotlin
val maybeSalary: Result<Double> = JobService(jobs, currencyConverter).getSalaryInEur(JobId(42))
val recovered = maybeSalary.recover {
    when (it) {
        is IllegalArgumentException -> println("The amount must be positive")
        else -> println("An error occurred ${it.message}")
    }
    0.0
}
println(recovered)
```

If we execute the above code with the same input as the previous example, we can get a more detailed and clearer output than the previous one:

```text
The amount must be positive
Success(0.0)
```

As we did for the `map` function, we can use the `recoverCatching` variant if the lambda passed to the `recover` function can throw an exception.

To execute some side effect with the value of a `Result`, both if it's successful or a failure, we can use the dedicated methods the SDK gives us, i.e. the functions `onSuccess` and `onFailure`. Both function return the original `Result` instance, so we can chain them:

```kotlin
// Kotlin SDK
public inline fun <T> Result<T>.onSuccess(action: (value: T) -> Unit): Result<T> {
    contract {
        callsInPlace(action, InvocationKind.AT_MOST_ONCE)
    }
    if (isSuccess) action(value as T)
    return this
}

public inline fun <T> Result<T>.onFailure(action: (exception: Throwable) -> Unit): Result<T> {
    contract {
        callsInPlace(action, InvocationKind.AT_MOST_ONCE)
    }
    exceptionOrNull()?.let { action(it) }
    return this
}
```

We can refactor our main example to use the `onSuccess` and `onFailure` functions:

```kotlin
val notFoundJobId = JobId(42)
val maybeSalary: Result<Double> = JobService(jobs, currencyConverter).getSalaryInEur(notFoundJobId)
maybeSalary.onSuccess {
    println("The salary of jobId $notFoundJobId is $it")
}.onFailure {
    when (it) {
        is IllegalArgumentException -> println("The amount must be positive")
        else -> println("An error occurred ${it.message}")
    }
}
```

Clearly, the output of the above code is the following since the `JobId`42 is not present in our database:

```text
The amount must be positive
```

If we want to give both the lambda to apply in case of success and the lambda to apply in case of failure, we can use the `fold` function:

```kotlin
// Kotlin SDK
public inline fun <R, T> Result<T>.fold(
    onSuccess: (value: T) -> R,
    onFailure: (exception: Throwable) -> R
): R {
    contract {
        callsInPlace(onSuccess, InvocationKind.AT_MOST_ONCE)
        callsInPlace(onFailure, InvocationKind.AT_MOST_ONCE)
    }
    return when (val exception = exceptionOrNull()) {
        null -> onSuccess(value as T)
        else -> onFailure(exception)
    }
}
```

As we can see, the `fold` function is not only used to apply side effects. It can be used to transform a `Result` to another type. In fact, many of the transformations we've seen so far are shorthands for the application of `fold` function in particular cases.

The above example can be rewritten using the `fold` function as follows:

```kotlin
maybeSalary.fold({
    println("The salary of jobId $notFoundJobId is $it")
}, {
    when (it) {
        is IllegalArgumentException -> println("The amount must be positive")
        else -> println("An error occurred ${it.message}")
    }
})
```

As we saw in the previous article, when dealing with _effects_, _monads_, _container types_ or whatever we want to call them, one crucial point is how we can compose and combine them. For example, let say we want to refactor the example of retrieving the gap between the salary of a job with the maximum salary available in the database. First, we need to add the `findAll` function to the `Jobs` interface and implementation:

```kotlin 
interface Jobs {

    fun findAll(): Result<List<Job>>
    // Omissis...
}

class LiveJobs : Jobs {

    override fun findAll(): Result<List<Job>> = 
        Result.success(JOBS_DATABASE.values.toList())
    // Omissis...
}
```

To calculate the gap with the max salary, we need to both retrieve a job with a given id, and all the jobs available. So, we need to compose two `Result` instances. 

The Kotlin SDK doesn't provide any form of `flatMap` like function for the `Result` type. So, how the heck can we compose subsequent computations resulting in a `Result`? Remember that two of the most important principle of Kotlin are pragmatism and ergonomic. If we think about it, we already have all the tools to build some monadic style list-comprehension without the need of using `flatMap`. 

For sure, it should be sound very strange that Kotlin provides so many `getOrSomething` types of functions. One of the main properties of monadic list-comprehension is the ability to short-circuit the computation if one of the steps fails. Exceptions are very good at doing short-circuiting, so why not use them? We saw that on a `Result` we can call the `getOrThrow` function to get the value of a `Result` or throw an exception if the `Result` is a failure. So, we can use the `getOrThrow` function to short-circuit the computation if one of the steps fails. However, we don't want to deal with raw exceptions handling in our program. So, we can use the `runCatching` function to wrap again the computation in a `Result`.

To make the code we'll use more readable, first, we define an extension function that returns the maximum salary of a list of `Job`:

```kotlin
fun List<Job>.maxSalary(): Result<Salary> = runCatching {
    if (this.isEmpty()) {
        throw NoSuchElementException("No job present")
    } else {
        this.maxBy { it.salary.value }.salary
    }
}
```

We decided to throw a `NoSuchElementException` if the list is empty, wrapping all together in a `Result`. Then, we can use the new function to implement the `getSalaryGapWithMax` function as follows:

```kotlin
fun getSalaryGapWithMax(jobId: JobId): Result<Double> = runCatching {
    val maybeJob: Job? = jobs.findById(jobId).getOrThrow()
    val jobSalary = maybeJob?.salary ?: Salary(0.0)
    val jobList = jobs.findAll().getOrThrow()
    val maxSalary: Salary = jobList.maxSalary().getOrThrow()
    maxSalary.value - jobSalary.value
}
```

As we can see, we can forget about the `Result` type during the composition process with this approach, focusing on the success values. The rising of exception together with the use of the `runCatching` function allows us to short-circuit the computation if one of the steps fails.

What about the Arrow library and the `Result` type? As we saw for the nullable types, Arrow offers some interesting extension to the basic type. First, Arrow adds the `flatMap` function to the `Result` type. If we are Haskell lovers, we can't live without it, and we can use the `flatMap` to compose subsequent computations resulting in a `Result`. Let's try to rewrite the previous example using the `flatMap` function:

```kotlin
fun getSalaryGapWithMax2(jobId: JobId): Result<Double> =
    jobs.findById(jobId).flatMap { maybeJob ->
        val jobSalary = maybeJob?.salary ?: Salary(0.0)
        jobs.findAll().flatMap { jobList ->
            jobList.maxSalary().map { maxSalary ->
                maxSalary.value - jobSalary.value
            }
        }
    } 
```

As we said in the previous article, the absence of any native support for monadic list-comprehension in Kotlin makes the code less readable if we use sequences of `flatMap` and `map` invocations. However, as we saw both for nullable types and for the `Option` type, Arrow gives us a nice DSLs to deal with the readability problem. For the `Result`type, the DSL is called `result`.

```kotlin
fun getSalaryGapWithMax3(jobId: JobId): Result<Double> = result.eager {
    val maybeJob: Job? = jobs.findById(jobId).bind()
    val job = ensureNotNull(maybeJob) { NoSuchElementException("Job not found") }
    val jobSalary = maybeJob.salary
    val jobList = jobs.findAll().bind()
    val maxSalary: Salary = jobList.maxSalary().bind()
    maxSalary.value - jobSalary.value
}
```









