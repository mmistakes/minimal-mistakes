---
title: "Functional Error Handling in Kotlin, Part 2: Result and Either"
date: 2023-06-16
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [kotlin]
excerpt: "In this article, we continue our journey through functional error handling by looking at the `Result` and `Either` data types and how to use them."
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

In this series [first part](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/), we introduced some of the available strategies to handle errors in a functional fashion using Kotlin and the Arrow library. In this second part, we'll continue our journey by looking at the `Result` and `Either` data types and how to use them to handle errors in a functional way.

For the project's setup, please refer to the first part of this series, in which we set up Maven and the needed dependencies.

For the video version, watch below:

{% include video id="C0B44WBJJmY" provider="youtube" %}

Without further ado, let's get started!

> This article, as the first part, requires existing Kotlin experience. If you need to get it **fast** and with thousands of lines of code and a project under your belt, you'll love [Kotlin Essentials](https://rockthejvm.com/p/kotlin-essentials). It's a jam-packed course on **everything** you'll ever need to work with Kotlin for any platform (Android, native, backend, anything), including less-known techniques and language tricks that will make your dev life easier. Check it out [here](https://rockthejvm.com/p/kotlin-essentials).

## 1. The Domain

We'll use extensively the domain model we introduced in the last article. We want to create an application that manages a job board. The main types of the domain are:

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

Moreover, we'll simulate a database of jobs using a `Map<JobId, Job>`:

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

A `Jobs` module will handle the integration with the database:

```kotlin
interface Jobs
```

Now that we have defined the domain model and the module that will contain the algebra to access it, it's time to start implementing the different approaches to handle errors in a functional way.

## 2. The `Result` Type: Lifting the Try-Catch Approach to a Higher Level

Nullable types and the `Option` type we've seen so far are great for handling errors in a functional way. They don't store the cause of the error. In other words, they don't tell us _why_ the error happened.

We can represent an error using different approaches. The first is reusing the `Throwable` type and all its exception subtypes. The Kotlin programming language has the `Result<A>` type for that since version 1.3, **which models the result of an operation that may succeed with an instance of `A` or may result in an exception**. It's similar to the `Try<A>` type we've seen in the Scala programming language.

Despite what you may guess, the `Result<A>` type is not defined as a sealed class. It's a value class without any subclass:

```kotlin
// Kotlin SDK
@JvmInline
public value class Result<out T> @PublishedApi internal constructor(
    @PublishedApi
    internal val value: Any?
) : Serializable
```

If you're asking, the `@PublishedApi` marks the `internal` constructor and the `value` as accessible from public extension inline functions but not from anywhere else. Here, the trick to represent success and failure results as values of the `value` attribute, which has the type `Any?` and not `T?`. In case of success, the `value` attribute will contain the value of type `T`, **while in case of failure, it will contain an instance of the `Result.Failure` class**, defined as follows:

```kotlin
// Kotlin SDK
internal class Failure(
        @JvmField
        val exception: Throwable
    ) : Serializable
```

Now that we introduced a bit of internals let's see how we can create instances of the `Result<A>` type. Kotlin defines two different smart constructors for that:

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

Unfortunately, we've no fancy extension functions defined on the `Result<A>` type, so we can't write anything similar to `job.toResult()`. _C'est la vie_. It's not that hard to define such an extension function:

```kotlin
fun <T> T.toResult(): Result<T> =
    if (this is Throwable) Result.failure(this) else Result.success(this)

val result = 42.toResult()
```

How can we use it now that we know how to build a `Result`? First of all, let's create the version of our `Jobs` module that uses the `Result` type:

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

We decided to handle only unexpected errors with the `Result` type by catching exceptions, not the case in which the job is not found.

The `findById` function is implemented using the `try-catch` approach. However, using the `Result` type together with a `try-catch` block is so common, that the Kotlin SDK defines a `runCatching` function that does exactly that:

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

Once we have a `Result`, we can use it differently. The first is to check if the result is a success or failure. We can use the `isSuccess` and `isFailure` properties. To show them, as we made for other types, we can create our `JobsService` using the new flavor of the `Jobs` module, and develop a simple `printOptionJob` method, which prints different messages depending on the result of the `findById` function:

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

The above code also introduces some of the extractor methods defined on the `Result` type:

* `getOrNull` returns the value of the `Result` or `null` otherwise.
* `getOrThrow` returns the value of the `Result` or the throw of the exception contained in the `Result.Failure` instance.
* `getOrDefault` returns the value of the `Result` or a given default value if the `Result` is a failure.
* `getOrElse` returns the value of the `Result`, or the result of a given lambda, `onFailure: (exception: Throwable) -> R` if the `Result` is a failure.

Conversely, the method `exceptionOrNull` returns the exception in the `Result.Failure` instance or `null` otherwise.

If we execute the above method using a valid `JobId`, we'll get the following output:

```text
Job found: Job(id=JobId(value=1), company=Company(name=Apple, Inc.), role=Role(name=Software Engineer), salary=Salary(value=70000.0))
```

However, it's far more idiomatic to transform and react to values of a `Result` rather than extracting it. To apply a transformation to the value of a `Result`, we can use the classic `map` function:

```kotlin
val appleJobSalary: Result<Salary> = appleJob.map { it.salary }
```

Instead, we can use the `mapCatching` function if the transformation to apply to the value of the `Result` can throw an exception. Let's reuse our `CurrencyConverter` class from the first part of the series. The `CurrencyConverter` is a class that converts amounts from one currency to another one. In detail, we want to develop a method to convert an amount in USD to EUR. This time, we add validation on the input amount:

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

The converter will throw an exception if the input amount is `null` or negative. Let's think about the converter as an external library that we can't change. We can use the `mapCatching` function to convert the salary of a job from USD to EUR, handling the fact that the conversion can fail, throwing an exception. Let's add the converter as a dependency to our `JobService` class, and let's use it to implement a new method:

```kotlin
class JobService(private val jobs: Jobs, private val currencyConverter: CurrencyConverter) {

    fun getSalaryInEur(jobId: JobId): Result<Double> =
        jobs.findById(jobId)
            .map { it?.salary }
            .mapCatching { currencyConverter.convertUsdToEur(it?.value) }
}
```

If we execute the above function using an invalid `JobId`, we'll get a `Result` containing the exception thrown by the `convertUsdToEur` function:

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

If we want to recover from a failure `Result`, we can use the `recover` function. This function takes a lambda that will be executed if the `Result` is a failure. The lambda takes as input the exception contained in the `Result.Failure` instance and returns a new value of the same type as the successful type of the original `Result`:

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

The original `T` type must be a subtype of the new `R` type since we return the initial value if the `Result` succeeds.

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

If we execute the above code with the same input as the previous example, we can get a more detailed and more precise output than the previous one:

```text
The amount must be positive
Success(0.0)
```

As we did for the `map` function, we can use the `recoverCatching` variant if the lambda passed to the `recover` function can throw an exception.

To execute some side effect with the value of a `Result`, whether successful or a failure, we can use the reliable methods the SDK gives us, i.e., the functions `onSuccess` and `onFailure`. Both functions return the original `Result` instance, so we can chain them:

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

We can refactor our primary example to use the `onSuccess` and `onFailure` functions:

```kotlin
val notFoundJobId = JobId(42)
val maybeSalary: Result<Double> =
    JobService(jobs, currencyConverter).getSalaryInEur(notFoundJobId)
maybeSalary.onSuccess {
    println("The salary of jobId $notFoundJobId is $it")
}.onFailure {
    when (it) {
        is IllegalArgumentException -> println("The amount must be positive")
        else -> println("An error occurred ${it.message}")
    }
}
```

Clearly, the output of the above code is the following since the `JobId` 42 is not present in our database:

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

As we can see, the `fold` function is not only used to apply side effects. It can be used to transform a `Result` into another type. In fact, many of the transformations we've seen so far are shorthands for applying the `fold` function in particular cases.

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

## 3. Composing `Result` Instances

As we saw in the previous article, we often deal with types (usually some containers) that are "chainable" or "monadic" in structure (more details on [Another Take at Monads: A Way to Generalize Chained Computations](https://blog.rockthejvm.com/another-take-on-monads/)), so the crucial point is how we can compose and combine them. In the first part of this series, we implemented a function that returns the gap between the job salary given a job id and the maximum compensation for the same company. We called the function `getSalaryGapWithMax`.

We want to refactor the example using the `Result` type. First, we need to add the `findAll` function to the `Jobs` interface and implementation:

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

To calculate the gap with the max salary, we need to retrieve a job with a given id and all the jobs available. So, we need to compose two `Result` instances.

The Kotlin SDK doesn't provide any form of `flatMap` like function for the `Result` type. So, how can we compose subsequent computations resulting in a `Result`? **Remember that two of the most essential principle of Kotlin are pragmatism and ergonomics**. If we think about it, we already have all the tools to build some monadic style list comprehension without using `flatMap`.

One of the main properties of monadic list-comprehension is the ability to short-circuit the computation if one of the steps fails. Exceptions are very good at doing short-circuiting, so why not use them? We saw that on a `Result`, we can call the `getOrThrow` function to get the value of a `Result` or throw an exception if the `Result` is a failure. So, we can use the `getOrThrow` function to short-circuit the computation if one of the steps fails. However, we want to avoid handling exceptions through `try-catch` blocks. So, we can use the `runCatching` function to wrap the computation again in a `Result`.

To make the code more readable, first, we define an extension function that returns the maximum salary of a list of `Job`:

```kotlin
fun List<Job>.maxSalary(): Result<Salary> = runCatching {
    if (this.isEmpty()) {
        throw NoSuchElementException("No job present")
    } else {
        this.maxBy { it.salary.value }.salary
    }
}
```

If the list is empty, we threw a `NoSuchElementException`, wrapping it together in a `Result`. Then, we can use the new function to implement the `getSalaryGapWithMax` function in the `JobService` as follows:

```kotlin
class JobService(private val jobs: Jobs, private val currencyConverter: CurrencyConverter) {

    // Omissis...
    fun getSalaryGapWithMax(jobId: JobId): Result<Double> = runCatching {
        val maybeJob: Job? = jobs.findById(jobId).getOrThrow()
        val jobSalary = maybeJob?.salary ?: Salary(0.0)
        val jobList = jobs.findAll().getOrThrow()
        val maxSalary: Salary = jobList.maxSalary().getOrThrow()
        maxSalary.value - jobSalary.value
    }
}
```

As we can see, **we can forget about the `Result` type during the composition process with this approach, focusing on the success values**. The rise of exceptions and the use of the `runCatching` function allows us to short-circuit the computation if one of the steps fails.

What about the Arrow library and the `Result` type? As we saw for the nullable types, Arrow offers some exciting extensions. First, Arrow adds the `flatMap` function to the `Result` type. If we are Haskell lovers, we can't live without it, and we can use the `flatMap` to compose subsequent computations resulting in a `Result`. Let's try to rewrite the previous example using the `flatMap` function from the Arrow library:

```kotlin
import arrow.core.flatMap

class JobService(private val jobs: Jobs, private val currencyConverter: CurrencyConverter) {

    // Omissis...
    fun getSalaryGapWithMax2(jobId: JobId): Result<Double> =
        jobs.findById(jobId).flatMap { maybeJob ->
            val jobSalary = maybeJob?.salary ?: Salary(0.0)
            jobs.findAll().flatMap { jobList ->
                jobList.maxSalary().map { maxSalary ->
                    maxSalary.value - jobSalary.value
                }
            }
        }
}
```

As we said in the previous article, the absence of native support for monadic comprehension in Kotlin makes the code less readable if we use sequences of `flatMap` and `map` invocations. However, as we saw both for nullable types and for the `Option` type, **Arrow gives us nice DSLs to deal with the readability problem**. For the `Result`type, the DSL is called `result`:

```kotlin
// Arrow SDK
public object result {
    public inline fun <A> eager(crossinline f: suspend ResultEagerEffectScope.() -> A): Result<A>
    // Omissis

    public suspend inline operator fun <A> invoke(crossinline f: suspend ResultEffectScope.() -> A): Result<A>
    // Omissis
}
```

The `suspend` and the `eager` version of the DSL define a scope object as the receiver, respectively `arrow.core.continuations.ResultEffectScope` and `arrow.core.continuations.ResultEagerEffectScope`. As we did in the previous article, we'll use the _eager_ flavor of the DSL.

As for the nullable types and the `Option` type, the `result` DSL gives us the `bind` extension function to unwrap the value of a `Result` and use it. If the `Result` fails, the `bind` function will short-circuit the calculation and the whole block inside the `result` DSL returns the failure. The `bind` function is defined as an extension function inside the `ResultEagerEffectScope`:

```kotlin
// Arrow SDK
public value class ResultEagerEffectScope(/* Omissis */) : EagerEffectScope<Throwable> {

    // Omissis
    public suspend fun <B> Result<B>.bind(): B =
        fold(::identity) { shift(it) }
}
```

The `shift` function short-circuits the computation and returns the failure, terminating the continuation chain. Remember, **Arrow implements all the scopes concerning error handling using a continuation-style approach**.

```kotlin
fun getSalaryGapWithMax3(jobId: JobId): Result<Double> = result.eager {
    println("Searching for the job with id $jobId")
    val maybeJob: Job? = jobs.findById(jobId).bind()
    ensureNotNull(maybeJob) { NoSuchElementException("Job not found") }
    val jobSalary = maybeJob.salary
    println("Job found: $maybeJob")
    println("Getting all the available jobs")
    val jobList = jobs.findAll().bind()
    println("Jobs found: $jobList")
    println("Searching for max salary")
    val maxSalary: Salary = jobList.maxSalary().bind()
    println("Max salary found: $maxSalary")
    maxSalary.value - jobSalary.value
}
```

This time, we'll change the example's main workflow. We'll use a `NoSuchElementException` to signal the job with the given `jobId` is not present in the database. We used the `ensureNotNull` function to check and apply if a nullable value is not null and apply. In the case of the scope defined in the `result` DSL, the function short-circuits the execution with a `Result` containing the given exception as a failure.

Let's change the `main` function to use the new `getSalaryGapWithMax3` function:

```kotlin
fun main() {
    val currencyConverter = CurrencyConverter()
    val jobs = LiveJobs()
    val notFoundJobId = JobId(42)
    val salaryGap: Result<Double> =
        JobService(jobs, currencyConverter).getSalaryGapWithMax3(notFoundJobId)
    salaryGap.fold({
        println("Salary gap for job $notFoundJobId is $it")
    }, {
        println("There was an error during execution: $it")
    })
}
```

If we run the previous example giving the `JobId` 42 as input, we'll get the following expected output:

```text
Searching for the job with id JobId(value=42)
There was an error during execution: java.util.NoSuchElementException: Job not found
```

As we can see, the execution was short-circuited when the `ensureNotNull` function returned a `Result` containing the `NoSuchElementException` as a failure. However, the `result` DSL does not equal the `runCatching` function. If we throw an exception inside the `result` DSL, it will be propagated to the caller and bubble up through the call stack. Let's try to throw an exception inside the `result` DSL:

```kotlin
fun main() {
    val result: Result<Nothing> = result.eager {
        throw RuntimeException("Boom!")
    }
}
```

If we run the above code, we `RuntimeException` will escape the `result` DSL, printing the following stack trace:

```text
Exception in thread "main" java.lang.RuntimeException: Boom!
	at in.rcard.result.ResultTypeErroHandlingKt$main$$inlined$eager-IoAF18A$1.invokeSuspend(result.kt:43)
	at in.rcard.result.ResultTypeErroHandlingKt$main$$inlined$eager-IoAF18A$1.invoke(result.kt)
	at in.rcard.result.ResultTypeErroHandlingKt$main$$inlined$eager-IoAF18A$1.invoke(result.kt)
	at arrow.core.continuations.DefaultEagerEffect$fold$1.invokeSuspend(EagerEffect.kt:190)
	at arrow.core.continuations.DefaultEagerEffect$fold$1.invoke(EagerEffect.kt)
	at arrow.core.continuations.DefaultEagerEffect$fold$1.invoke(EagerEffect.kt)
	at arrow.core.continuations.DefaultEagerEffect.fold(EagerEffect.kt:192)
	at arrow.core.continuations.ResultKt.toResult(result.kt:10)
	at in.rcard.result.ResultTypeErroHandlingKt.main(ResultTypeErroHandling.kt:122)
	at in.rcard.result.ResultTypeErroHandlingKt.main(ResultTypeErroHandling.kt)
```

If we want to use some computation that can throw an exception, we can use the `runCatching` function inside the `result` DSL:

```kotlin
fun main() {
    result.eager {
        runCatching<Int> {
            throw RuntimeException("Boom!")
        }.bind()
    }
}
```

However, sometimes we want to map errors in custom types that don't belong to the `Throwable` hierarchy. For example, we can map a `NoSuchElementException` to a `JobNotFound` type or any rich and meaningful type we want. To do this, we need another strategy to handle errors. It's time to introduce the `Either` type.

## 4. Type-safe Error Handling: The `Either` Type

Let's now introduce the `Either` type for error handling. Kotlin doesn't ship the `Either` type with the standard SDK. We need Arrow to add it to the game. The structure of `Either<E, A>` is that of an [Algebraic Data Type](https://blog.rockthejvm.com/algebraic-data-types/) (ADT). In detail, it's a sum type that can contain either a value `A` wrapped in the type `Right<A>` or a value `E` wrapped in a type `Left<E>`. It's common to associate `Left` instances with the result of a failed computation and `Right` instances with the result of a successful calculation. The `Either` type is defined as follows:

```kotlin
// Arrow SDK
public sealed class Either<out A, out B>
public data class Left<out A> constructor(val value: A) : Either<A, Nothing>()
public data class Right<out B> constructor(val value: B) : Either<Nothing, B>()
```

The `Either` type is a sealed class, so it cannot be extended outside the Arrow library, and the compiler can check if all the possible cases are handled in a `when` expression.

Since we can now use any type to represent errors, we can create an ADT on error causes. For example, we can define a `JobError` sealed class and extend it with the `JobNotFound` and `GenericError` classes:

```kotlin
sealed interface JobError
data class JobNotFound(val jobId: JobId) : JobError
data class GenericError(val cause: String) : JobError
```

Let's see how to create an `Either` instance. The `Left` and `Right` classes have a constructor that takes a single parameter. Here's an example of how to create a `Right` instance:

```kotlin
val appleJobId = JobId(1)
val appleJob: Either<JobError, Job> = Right(JOBS_DATABASE[appleJobId]!!)
```

Here, we forced the type of the left part of the `Either` to be `JobError`. Notice that the constructor returns an `Either` with the left part defined as `Nothing`. The compiler allows us to do this because the `Nothing` type is a subtype of any other type, and **the `Either<A, B>` is covariant on the left part since it's defined using the `out` keyword** (we already saw variance in previous articles on Scala, [Variance Positions in Scala, Demystified](https://blog.rockthejvm.com/scala-variance-positions/)).

Now, we can create our `Left` type instance:

```kotlin
val jobNotFound: Either<JobError, Job> = Left(JobNotFound(appleJobId))
```

For those who prefer extension functions, Arrow provides the `left` and `right` functions to create `Left` and `Right` instances:

```kotlin
val anotherAppleJob = JOBS_DATABASE[appleJobId]!!.right()
val anotherJobNotFound: Either<JobError, Job> = JobNotFound(appleJobId).left()
```

Since Arrow defines the `Either` type as a sealed class, we can use the `when` expression to handle all the possible cases taking advantage of the smart casting. For example, in the following `printSalary`function, we can access the `value` attribute of the `Right` instance without any explicit cast:

```kotlin
fun printSalary(maybeJob: Either<JobError, Job>) = when (maybeJob) {
    is Right -> println("Job salary is ${maybeJob.value.salary}")
    is Left -> println("No job found")
}
```

If we want to extract the contained value from an `Either`, we have some functions. The `getOrNull` function returns a nullable type containing the value if it's a `Right` instance. We can use it if we want to discard the error:

```kotlin
val appleJobOrNull: Job? = appleJob.getOrNull()
```

Similarly, we can transform an `Either` instance into an `Option` instance using the `getOrNone` function:

```kotlin
val maybeAppleJob: Option<Job> = appleJob.getOrNone()
```

Then, the `getOrElse` function lets us extract the value contained in a `Right` instance or a default value if it's a `Left` instance:

```kotlin
val jobCompany: String = appleJob.map { it.company.name }.getOrElse { "Unknown company" }
```

The `getOrElse` function takes a lambda with the error as a parameter, so we can use it to react differently to different errors:

```kotlin
val jobCompany2: String =
    appleJob.map { it.company.name }.getOrElse { jobError ->
        when (jobError) {
            is JobNotFound -> "Job not found"
            is GenericError -> "Generic error"
        }
}
```

Using typed errors has many advantages:

 1. We can use the type system to check if all the possible cases are handled.
 2. The possible causes of failure are listed directly in the function's signature as the left part of the `Either` type. Understanding the possible causes of failure lets us build better tests and error-handling strategies.
 3. Typed errors compose better than exceptions.

To prove the above advantages, as we previously did for the `Result` type, it's time to use the `Either` type in our example. Let's change the `Jobs` module to return an `Either` type instead of a `Result` type:

```kotlin
interface Jobs {

    fun findById(id: JobId): Either<JobError, Job>
}
```

Here we are using the `JobError` ADT we defined so far. At this point, we can know precisely how the function can fail by looking at the signature. Now, we can implement the `LiveJobs` class:

```kotlin
class LiveJobs : Jobs {

    override fun findById(id: JobId): Either<JobError, Job> =
        try {
            JOBS_DATABASE[id]?.right() ?: JobNotFound(id).left()
        } catch (e: Exception) {
            GenericError(e.message ?: "Unknown error").left()
        }
}
```

As we might expect, we're wrapping the happy path with a `Right` instance and all the available error cases with a `Left` instance. We are treating the absence of a job as a logic error, and we're wrapping it with a `JobNotFound` object using the recommended and idiomatic syntax:

```kotlin
value?.right() ?: error.left()
```

On the other hand, we catch all the exceptions and wrap them in a `GenericError` instance. The pattern of catching exceptions and wrapping them in a `Left` instance is so common that Arrow provides the `catch` function to do it for us in the companion object of the `Either` type:

```kotlin
@JvmStatic
@JvmName("tryCatch")
public inline fun <R> catch(f: () -> R): Either<Throwable, R> =
  try {
    f().right()
  } catch (t: Throwable) {
    t.nonFatalOrThrow().left()
  }
```

The `nonFatalOrThrow` function checks whether the exception should be handled. The fatal exceptions are the following and their subclasses:

* `VirtualMachineError`
* `ThreadDeath`
* `InterruptedException`
* `LinkageError`
* `ControlThrowable`
* `CancellationException`

The subtypes of these errors should not be caught. For example, CancellationException should not be caught because it's used by Kotlin to [cancel coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/#7-cancellation), and catching it can break normal functioning of coroutines.

Then, we can rewrite the `LiveJobs` class using the `catch` function:

```kotlin
class LiveJobs : Jobs {

    override fun findById(id: JobId): Either<JobError, Job> = catch {
        JOBS_DATABASE[id]
    }.mapLeft { GenericError(it.message ?: "Unknown error") }
     .flatMap { maybeJob -> maybeJob?.right() ?: JobNotFound(id).left() }
}
```

Wait. We introduced a bunch of new functions here. Let's see them in detail. First, **the `Either` type is right-based**, which means  that `Right` is assumed to be the default case to operate on. If it is `Left`, operations like `map`, `flatMap`, return the `Left` value unchanged. In this case, we applied the `flatMap` function to check if the retrieved job was null, eventually creating a `Left` value using the pattern we saw a moment ago.

Moreover, we introduced the `mapLeft` function. This function is similar to the `map` function but applies to the `Left` part of the `Either` type. In this case, we're mapping `Throwable` exceptions to a `GenericError` object. The `mapLeft` function is defined as follows:

```kotlin
// Arrow SDK
public inline fun <C> mapLeft(f: (A) -> C): Either<C, B> =
    fold({ Left(f(it)) }, { Right(it) })
```

As we can see, the definition of the `mapLeft` function allows us to introduce another essential function, the `fold` function. We already saw this function in the `Result` type, and we can use it to transform both the `Left` and `Right` instances of the `Either` class into a target type. The `fold` function is defined as follows:

```kotlin
// Arrow SDK
public inline fun <C> fold(ifLeft: (left: A) -> C, ifRight: (right: B) -> C): C =
    when (this) {
        is Right -> ifRight(value)
        is Left -> ifLeft(value)
    }
```

The `fold` function wraps around the `when` expression. It's crucial in the library, and many of the `getOr*` are implemented using it. For example, let's say we want to get the salary of a job, whether it's a `Left` or a `Right` instance. We can use the `fold` function and return a default value if the job is not found:

```kotlin
val jobSalary: Salary = jobNotFound.fold({ Salary(0.0) }, { it.salary })
```

The same thing can be done using a composition of `map` and `getOrElse` functions:

```kotlin
val jobSalary2: Salary = jobNotFound.map { it.salary }.getOrElse { Salary(0.0) }
```

## 5. Composing `Either` Instances

It's time to talk about how to compose different `Either` instances. As you might imagine, since **the `Either` type is a monad on the right type**, we can use the `map` and `flatMap` functions to compose different instances (remember, monads have a single type parameters, while the `Either` type has two of them).

We will again implement the `getSalaryGapWithMax` function, using the `Either` type to handle errors. First, we need to add the `findAll` function to our `Jobs` module:

```kotlin
interface Jobs {

    // Omissis
    fun findAll(): Either<JobError, List<Job>>
}

class LiveJobs : Jobs {

    // Omissis
    override fun findAll(): Either<JobError, List<Job>> =
        JOBS_DATABASE.values.toList().right()
}
```

Then, we can use `map` and `flatMap` to compose the `findAll` and `findById` functions and implement the `getSalaryGapWithMax` function. As we did for the `Result` type, we define a utility function getting the maximum salary from a list of jobs, this time using an `Either` instance as a result:

```kotlin
private fun List<Job>.maxSalary(): Either<GenericError, Salary> =
    if (this.isEmpty()) {
        GenericError("No jobs found").left()
    } else {
        this.maxBy { it.salary.value }.salary.right()
    }
```

Then, we can assemble all the pieces together in our first version of the `getSalaryGapWithMax` function:

```kotlin
class JobsService(private val jobs: Jobs) {

    fun getSalaryGapWithMax(jobId: JobId): Either<JobError, Double> =
        jobs.findById(jobId).flatMap { job ->
            jobs.findAll().flatMap { jobs ->
                jobs.maxSalary().map { maxSalary ->
                    (maxSalary.value - job.salary.value)
                }
            }
        }
}
```

Apart from the type used to express failures, the `getSalaryGapWithMax` function is similar to the one we implemented using the `Result` type or the `Option` type in part one. Another thing similar to the previous implementations is the pain of reading such code. We have a lot of nested calls, no monadic list-comprehension support, and it's not easy to understand what's going on.

As we might guess, Arrow offers a DSL to simplify the composition of `Either` instances, and it's called `either`. The `either.eager` DSL is the non-suspending counterpart:

```kotlin
// Arrow SDK
public object either {
    public inline fun <E, A> eager(noinline f: suspend EagerEffectScope<E>.() -> A): Either<E, A> =
        // Omissis...

    public suspend operator fun <E, A> invoke(f: suspend EffectScope<E>.() -> A): Either<E, A> =
        // Omissis...
}
```

Both the DSL are builders for two different scopes they defined as receivers, respectively `arrow.core.continuations.EagerEffectScope<A>`, and `arrow.core.continuations.EffectScope<A>`. Let's try to make the `getSalaryGapWithMax` function more readable using the `either` DSL:

```kotlin
fun getSalaryGapWithMax2(jobId: JobId): Either<JobError, Double> = either.eager {
    println("Searching for the job with id $jobId")
    val job = jobs.findById(jobId).bind()
    println("Job found: $job")
    println("Getting all the available jobs")
    val jobsList = jobs.findAll().bind()
    println("Jobs found: $jobsList")
    println("Searching for max salary")
    val maxSalary = jobsList.maxSalary().bind()
    println("Max salary found: $maxSalary")
    maxSalary.value - job.salary.value
}
```

The `either` DSL gives us access to the `bind` member extension function on the `EagerEffectScope` to extract `Right` values from an `Either` instance or to short-circuit the entire computation if a `Left` instance is found. The `bind` function is defined as follows:

```kotlin
// Arrow SDK
public interface EagerEffectScope<in R> {

    // Omissis...
    public suspend fun <B> Either<R, B>.bind(): B =
        when (this) {
            is Either.Left -> shift(value)
            is Either.Right -> value
        }
}
```

Nothing new in here. If we run the `getSalaryGapWithMax2` function with the `JobId(42)`, the execution will be short-circuited after the call to the `jobs.findById(jobId)` statement, and we get the following output:

```text
Searching for the job with id JobId(value=42)
```

Similarly, we have access to the `ensureNotNull` extension function, which short-circuits the computation if a `null` value is found, and it's defined as follows:

```kotlin
// Arrow SDK
@OptIn(ExperimentalContracts::class)
public suspend fun <R, B : Any> EagerEffectScope<R>.ensureNotNull(value: B?, shift: () -> R): B {
    contract { returns() implies (value != null) }
    return value ?: shift(shift())
}
```

To demonstrate the `ensureNotNull` function, let's try to implement a variant of the `getSalaryGapWithMax` function using a new version of the extension function `maxSalary` we implemented before:

```kotlin
private fun List<Job>.maxSalary2(): Salary? = this.maxBy { it.salary.value }.salary
```

The above version of the function returns a nullable `Salary` object instead of an `Either`. We can use the `ensureNotNull` function to short-circuit the computation if a `null` value is found in the `getSalaryGapWithMax` function:

```kotlin
fun getSalaryGapWithMax3(jobId: JobId): Either<JobError, Double> = either.eager {
    val job = jobs.findById(jobId).bind()
    val jobsList = jobs.findAll().bind()
    val maxSalary = ensureNotNull(jobsList.maxSalary2()) { GenericError("No jobs found") }
    maxSalary.value - job.salary.value
}
```

If the `jobsList.maxSalary2()` statement returns a `null` value, we short-circuit the computation with a `Left` instance containing a `GenericError`.

The `ensure` extension function is similar to the `ensureNotNull` function but works with a predicate instead of a nullable value. The `ensure` function is defined as follows:

```kotlin
// Arrow SDK
public suspend fun ensure(condition: Boolean, shift: () -> R): Unit =
    if (condition) Unit else shift(shift())
```

We can use the `ensure` function when implementing smart constructors. For example, let's implement a pimped version of the `Salary` type containing a smart constructor, which checks if the given value is a positive integer:

```kotlin
object NegativeAmount : JobError

object EitherJobDomain {

    @JvmInline
    value class Salary private constructor(val value: Double) {

        companion object {
            operator fun invoke(value: Double): Either<JobError, Salary> = either.eager {
                ensure(value >= 0.0) { NegativeAmount }
                Salary(value)
            }
        }
    }
}
```

We use the `ensure` function to short-circuit the computation if the given value is negative. We can quickly test the smart constructor and check if it works as expected:

```kotlin
fun main() {
    val salaryOrError: Either<JobError, Salary> = Salary(-1.0)
    println(salaryOrError)
}
```

The above code produces the following expected output if executed:

```
Either.Left(in.rcard.either.NegativeAmount@246b179d)
```

What if we have to accumulate many errors, for example, while creating an object? The `Either` type in version 1.1.5 of Arrow does not fit this need. In fact, the `Validated` type suits better this use case. However, in the next version of Arrow, 1.2.0, the `Validated` class will be deprecated. In the next part of this series, we will learn how to accumulate errors directly using the new version of the `Either` type.

And that's all, folks!

## 6. Conclusions

In this second part of the series dedicated to error handling in Kotlin, we introduced the `Result` and the `Either`type. These types represent both the happy and error paths, unlike the types we saw in the first part of the series. We explored their APIs in deep and saw which features the Arrow library offers us to simplify the composition of `Result` and `Either` instances. It's time to recap what we've learned so far. We can use nullable types and the `Option` type if we are not interested in the possible error path of a computation. In Kotlin, such types are quite similar. If we want to know the cause of an error, we can use the `Result` type. Here, we use the subclasses of the `Throwable` type to express the cause. Finally, we use the `Either` type to avoid the `Throwable` type and handle errors using a hierarchy of custom-typed errors. In the last part of this series, we will introduce the upcoming features of the next version of the Arrow library, 1.2.0, which will further simplify the functional handling of errors.

If you found this article (or the first part) too difficult, you can quickly get the experience you need by following the complete [Kotlin Essentials course](https://rockthejvm.com/p/kotlin-essentials) on Rock the JVM.
