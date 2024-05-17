---
title: "Functional Error Handling in Kotlin, Part 3: The Raise DSL"
date: 2023-09-20
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [kotlin]
excerpt: "It's time to end our journey on functional error handling in Kotlin with the new features introduced by the Arrow library in version 1.2.0. We'll focus on the `Raise` DSL, a new way to handle typed errors using Kotlin contexts."
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

It's time to end our journey on functional error handling in Kotlin with the new features introduced by the Arrow library in version 1.2.0, which previews the significant rewrite we'll have in version 2.0.0. We'll mainly focus on the `Raise` DSL, a new way to handle typed errors using [Kotlin contexts](https://blog.rockthejvm.com/kotlin-context-receivers/). This article is part of a series. We can always reference the previous parts using these links:

* [Functional Error Handling in Kotlin, Part 1: Absent values, Nullables, Options](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/)
* [Functional Error Handling in Kotlin, Part 2: Result and Either](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/)

For the video version, watch here:

{% include video id="pOtET_i1v-w" provider="youtube" %}

Without further ado, let's start!

> This article requires existing Kotlin experience. If you need to get it **fast** and with thousands of lines of code and a project under your belt, you'll love [Kotlin Essentials](https://rockthejvm.com/p/kotlin-essentials). It's a jam-packed course on **everything** you'll ever need to work with Kotlin for any platform (Android, native, backend, anything), including less-known techniques and language tricks that will make your dev life easier. Check it out [here](https://rockthejvm.com/p/kotlin-essentials).

## 1. Setup

We'll use version 1.9.0 of Kotlin and version 1.2.0 of the Arrow library. In fact, the Raise DSL is not available in previous versions of Arrow.

Since the context receivers are still experimental, we must explicitly enable them. In the article [Kotlin contexts](https://blog.rockthejvm.com/kotlin-context-receivers/), we saw how to enable context receivers using Gradle. This time, we see how to do it in Maven. We need to pass the property `-Xcontext-receivers` to the `kotlin-maven-plugin` using the appropriate `configuration` element:

```xml
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
    <configuration>
        <args>
            <arg>-Xcontext-receivers</arg>
        </args>
    </configuration>
</plugin>
```

As usual, we'll put a copy of the `pom.xml` file we use at the end of the article.

## 2. The Domain

We'll use extensively the domain model we introduced in the first two articles of the series. We want to create an application that manages a job board. The main types of the domain are:

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

Since we'll use a lot of typed errors during the article, we need to define a hierarchy of errors that the `Jobs` module can raise:

```kotlin
sealed interface JobError
data class JobNotFound(val jobId: JobId) : JobError
data class GenericError(val cause: String) : JobError
data object NegativeSalary : JobError
```

Now that we have defined the domain model, the module containing the functions to access it and the errors we'll use along the way, it's time to show how the new Raise DSL works.

## 3. The Raise DSL

The Raise DSL is a new way to handle typed errors in Kotlin. Instead of using a wrapper type to address both the happy path and errors, **the `Raise<E>` type describes the possibility that a function can raise a logical error of type `E`**. A function that can raise an error of type `E` must execute in a scope that can also handle the error.

In this sense, the `Raise<E>` is very similar to the `CoroutineScope`, which describes the possibility for a function to execute suspending functions using structural concurrency (see the article [Kotlin Coroutines - A Comprehensive Introduction](https://blog.rockthejvm.com/kotlin-coroutines-101/) for further details).

As we saw in the article [Kotlin Context Receivers: A Comprehensive Guide](https://blog.rockthejvm.com/kotlin-context-receivers/), Kotlin models such scopes using receivers instead.

The easiest way to define a function that can raise an error of type `E` is to use the `Raise<E>` type as the receiver of an extension function:

```kotlin
fun Raise<JobNotFound>.appleJob(): Job = JOBS_DATABASE[JobId(1)]!!
```

The Arrow library defines the `Raise<E>` type and many other handful functions in the `arrow.core.raise.*` package. Inside the `Raise<E>` context, we have a lot of valuable functions. One of these is the `raise` function:

```kotlin
// Arrow Kt Library
public interface Raise<in Error> {
    @RaiseDSL
    public fun raise(r: Error): Nothing
    // Omissis
}
```

The above function let us short-circuit an execution and raise an error of type `E`:

```kotlin
fun Raise<JobNotFound>.jobNotFound(): Job = raise(JobNotFound(JobId(42)))
```

As we can see from the signature of the `raise` function, the only type of logical error a function can raise is the one defined in the receiver of the function. If we try to cheat, the compiler will complain immediately. The following code doesn't compile:

```kotlin
fun Raise<JobNotFound>.jobNotFound(): Job = raise(GenericError("Job not found"))
```

In fact, the compilation error is:

```text
Type mismatch: The inferred type is GenericError, but JobNotFound was expected
```

At first, it could seem a limitation and a little misleading. However, it's not. In fact, the `Raise<E>` type is a **context**, giving us some capabilities once we run a function in its scope. For example, we have access to the above `raise` function. If you remember, we did the same in the article [Kotlin Context Receivers: A Comprehensive Guide](https://blog.rockthejvm.com/kotlin-context-receivers/), where we defined a context in which it's possible to serialize an object to JSON:

```kotlin
interface JsonScope<T> {
    fun T.toJson(): String
}
```

Here, we have the same. The `Raise<E>` type is the equivalent of the `JsonScope<T>`, and the `raise` function is the equivalent of the `toJson` function. The only difference is that we can't instantiate a `Raise<E>` ourselves, but we need to use the utilities given by the Arrow library. Moreover, as we will see in a moment, the `Raise<E>` is an interface: Its implementation will differ depending on the type of error representation we want our function to raise.

We may have noticed that one advantage of **using the `Raise<E>` context** is that **the return type of the function listed only the happy path**. In fact, the `jobNotFound` function returns a `Job` and not a `Raise<JobNotFound, Job>`. As we'll see in a moment, this is a huge advantage when we want to compose functions that can raise errors.

However, using extension functions to define functions that can raise errors is not convenient. We can only have one receiver in an extension function. Let's see an example. First of all, let's start to implement our `Jobs` module. As we did in the previous articles, we'll start with the `findById` function:

```kotlin
interface Jobs {

    fun Raise<JobError>.findById(id: JobId): Job
}

class LiveJobs : Jobs {
    override fun Raise<JobError>.findById(id: JobId): Job =
        JOBS_DATABASE[id] ?: raise(JobNotFound(id))
}
```

As we said, the return type of the `findById` function is just `Job`. Another critical thing to notice is that the `Raise<E>` type is covariant in the `E` type parameter. In fact, we raised a `JobNotFound` from the `findById` function, but the extension function is defined on the `Raise<JobError>` type instead. Wow, a lot of useful features!

Let's say now that we want to add logging to the function. First, let's define a `Logger` module and its implementation.

```kotlin
interface Logger {
    fun info(message: String)
}

val consoleLogger = object : Logger {
    override fun info(message: String) {
        println("[INFO] $message")
    }
}
```

As we saw in the article [Kotlin Context Receivers: A Comprehensive Guide](https://blog.rockthejvm.com/kotlin-context-receivers/), we can't add the `Logger`type as a receiver of the `findById` method since the only available receiver is already taken by the `Raise<JobError>` type. Fortunately, Kotlin context receivers can rescue us. In fact, we can treat the `Raise<JobError>` receiver as a context receiver, obtaining the following equivalent code:

```kotlin
interface Jobs {

    context (Raise<JobError>)
    fun findById(id: JobId): Job
}

class LiveJobs : Jobs {

    context (Raise<JobError>)
    override fun findById(id: JobId): Job =
        JOBS_DATABASE[id] ?: raise(JobNotFound(id))
}
```

Since Kotlin allows more than one context receiver at a time, we can add the `Logger` module as a context receiver:

```kotlin
context (Logger, Raise<JobError>)
override fun findById(id: JobId): Job {
    info("Retrieving job with id $id")
    return JOBS_DATABASE[id] ?: raise(JobNotFound(id))
}
```

We'll use the context receiver syntax for the rest of the article since it's more convenient.

Now that we know how to create a function that can raise an error let's see how to handle it. The most generic way to execute a function that can raise an error of type `E` and that is defined in the context of a `Raise<E>` is the `fold` function, which is defined as follows:

```kotlin
// Arrow Kt Library
@JvmName("_fold")
public inline fun <E, A, B> fold(
  @BuilderInference block: Raise<E>.() -> A,
  catch: (throwable: Throwable) -> B,
  recover: (error: E) -> B,
  transform: (value: A) -> B,
): B
```

Let's split the above function into parts. The `block` parameter is the function that we want to execute. The `catch` parameter is a function that is executed when the `block` function throws an exception. The `recover` parameter is a function that is executed when the `block` function raises a logical typed error of type `E`. Finally, the `transform` parameter is a function that is executed when the `block` function returns a value of type `A`, which is the happy path. As we can see, all the handling blocks return the exact value of type `B`.

As we did in the previous articles, let's implement a service using the `Jobs` module and a function that prints the salary of a `JobId`:

```kotlin
class JobsService(private val jobs: Jobs) {

    fun printSalary(jobId: JobId) = fold(
        block = { jobs.findById(jobId) },
        recover = { error: JobError ->
            when (error) {
                is JobNotFound -> println("Job with id ${jobId.value} not found")
                else -> println("An error was raised: $error")
            }
        },
        transform = { job: Job ->
            println("Job salary for job with id ${jobId.value} is ${job.salary}")
        },
    )
}
```

Here, we used the version of the `fold` function that does not handle exceptions but simply rethrows them. In fact, the `catch` parameter is not defined. Let's use the `printSalary` function to print the salary of a job that exists in the database:

```kotlin
fun main() {
    val appleJobId = JobId(1)
    val jobs = LiveJobs()
    val jobService = JobsService(jobs)
    jobService.printSalary(appleJobId)
}
```

Obviously, the output is the following:

```text
Job salary for job with id 1 is Salary(value=70000.0)
```

Whereas, if we try to print the salary of a job that doesn't exist in the database, we obtain the following output:

```text
Job with id 42 not found
```

So far, so good. As we might notice, the `printSalary` method has no context defined. In fact, **the `fold` function "consumes" the context**, creating a concrete instance of a `Raise<E>` type and executing the `block` lambda in the context of that instance. Let's look at the implementation of the `fold` function for a moment:

```kotlin
// Arrow Kt Library
public inline fun <Error, A, B> fold(
  block: Raise<Error>.() -> A,
  catch: (throwable: Throwable) -> B,
  recover: (error: Error) -> B,
  transform: (value: A) -> B,
): B {
  contract {
    callsInPlace(catch, AT_MOST_ONCE)
    callsInPlace(recover, AT_MOST_ONCE)
    callsInPlace(transform, AT_MOST_ONCE)
  }
  val raise = DefaultRaise(false)
  return try {
    val res = block(raise)
    raise.complete()
    transform(res)
  } catch (e: CancellationException) {
    raise.complete()
    recover(e.raisedOrRethrow(raise))
  } catch (e: Throwable) {
    raise.complete()
    catch(e.nonFatalOrThrow())
  }
}
```

First, the library hints at the Kotlin compiler inside the `contract` block. In detail, it says that the `catch`, `recover`, and `transform` functions are called at most once and only inside the `fold` function.

Now comes the exciting part. The `fold` function creates a `DefaultRaise` instance, one of the available concrete implementations of the `Raise<E>` interface. The `block` is a lambda expression with a receiver, and in Kotlin, we can pass the receiver in different ways to the lambda, which are:

```kotlin
val raise = DefaultRaise(false)
// Method 1
block.invoke(raise)
// Method 2
block(raise)
// Method 3
raise.block()
```

The Arrow Library chose the second method. The `DefaultRaise` implementation of the `Raise<E>` interface is the following:

```kotlin
// Arrow Kt Library
@PublishedApi
internal class DefaultRaise(@PublishedApi internal val isTraced: Boolean) : Raise<Any?> {
    private val isActive = AtomicBoolean(true)

    @PublishedApi
    internal fun complete(): Boolean = isActive.getAndSet(false)
    override fun raise(r: Any?): Nothing = when {
        isActive.value -> throw if (isTraced) RaiseCancellationException(r, this) else RaiseCancellationExceptionNoTrace(r, this)
        else -> throw RaiseLeakedException()
    }
}
```

Implementing the `DefaultRaise.raise` throws a subclass of a `CancellationException` if the method was called inside its scope, a.k.a. the execution was not leaked. The exception contains a reference `r` to the typed error.

The `fold` function catches the `CancellationException` and calls the `recover` lambda with the typed error if the error was raised by the current `Raise<E>` instance. Otherwise, it rethrows the exception. The library performs this check using the `raisedOrRethrow` extension function:

```kotlin
// Arrow Kt Library
@PublishedApi
@Suppress("UNCHECKED_CAST")
internal fun <R> CancellationException.raisedOrRethrow(raise: DefaultRaise): R =
    when {
        this is RaiseCancellationExceptionNoTrace && this.raise === raise -> raised as R
        this is RaiseCancellationException && this.raise === raise -> raised as R
        else -> throw this
    }
```

It's essential to notice that the typed error is handled if the exception is an instance of `RaiseCancellationExceptionNoTrace` or `RaiseCancellationException`. Otherwise, if the exception is a true `CancellationException`, it is rethrown. In fact, **`CancellationException` should not be caught because it’s used by Kotlin to cancel coroutines**, and catching it can break the normal functioning of coroutines.

The last `catch` expression of the `fold` function catches all the other exceptions and calls the `catch` lambda with the exception if the exception is not fatal. Otherwise, it rethrows the exception. The library performs this check using the `nonFatalOrThrow` extension function. In case you need to know them, fatal exceptions are the following:

- `VirtualMachineError`
- `ThreadDeath`
- `InterruptedException`
- `LinkageError`
- `ControlThrowable`
- `CancellationException`

The subtypes of these errors should not be caught.

Every branch of the `fold` function completes the `DefaultRaise` instance, calling the `complete` method. The default implementation delimits the scope of the `Raise<E>` instance setting the `isActive` flag to `false`.

Please be aware that any exception thrown inside the `Raise<E>` context will bubble up and not be transformed automatically into a logical typed error. For example, imagine we need to convert amounts from dollars to euros. We can define a `CurrencyConverter` module as follows:

```kotlin
class CurrencyConverter {
    @Throws(IllegalArgumentException::class)
    fun convertUsdToEur(amount: Double?): Double =
        if (amount == null || amount < 0.0) {
            throw IllegalArgumentException("Amount must be positive")
        } else {
            amount * 0.91
        }
}
```

The `convertUsdToEur` throws an exception when the amount is `null` or negative. The exception will bubble up if we try to use it inside the `Raise<E>` context. For example, let's create a wrapper around the converter, defining a context of type `Raise<Throwable>` and try to use it:

```kotlin
class RaiseCurrencyConverter(private val currencyConverter: CurrencyConverter) {

    context (Raise<Throwable>)
    fun convertUsdToEur(amount: Double?): Double =
        currencyConverter.convertUsdToEur(amount)
}
```

Now, we can try to use the `convertUsdToEur` function and see what happens:

```kotlin
fun main() {
    val converter = RaiseCurrencyConverter(CurrencyConverter())
    fold(
        block = { converter.convertUsdToEur(-100.0) },
        catch = { ex: Throwable ->
            println("An exception was thrown: $ex")
        },
        recover = { error: Throwable ->
            println("An error was raised: $error")
        },
        transform = { salaryInEur: Double ->
            println("Salary in EUR: $salaryInEur")
        },
    )
}
```

As we said, we expect the `catch` lambda to catch the exception. In fact, if we run the code, we get the following output:

```text
An exception was thrown: java.lang.IllegalArgumentException: Amount must be positive
```

What if we want to convert the exception into a typed error? For example, we want to convert the `IllegalArgumentException` into a `NegativeSalary`. Well, we can do it using a function called `catch` provided by the Arrow library. Let's change the `RaiseCurrencyConverter.convertUsdToEur` function as follows:

```kotlin
context (Raise<NegativeSalary>)
fun convertUsdToEur(amount: Double?): Double = catch ({
    currencyConverter.convertUsdToEur(amount)
}) {_: IllegalArgumentException ->
    raise(NegativeSalary)
}
```

The implementation of the `catch` function is relatively straightforward:

```kotlin
// Arrow Kt Library
@RaiseDSL
public inline fun <A> catch(block: () -> A, catch: (throwable: Throwable) -> A): A =
    try {
        block()
    } catch (t: Throwable) {
        catch(t.nonFatalOrThrow())
    }
```

As we can see, there's nothing special with the `catch` function. It just catches the exception and calls the `catch` lambda with the exception. The `nonFatalOrThrow` extension function checks whether the exception is fatal. If the exception is fatal, it is rethrown. Otherwise, it is processed.

It's a different story if we want to recover or react to a typed error. As a rule of thumb, **we should model errors expected to happen as typed errors**. We called them logical errors. We've seen many examples in the previous articles. The `JobNotFound` and `NegativeSalary` errors are examples of errors that are expected to happen. On the contrary, **we should use exceptions to model faults**, that is, errors that are not likely to happen. Often, these kinds of errors are related to the environment or are due to bugs in our code, and we can't do anything to recover from them.

Many programming languages, like Java, model logical errors and faults with exceptions. Java architects tried to give us a way to distinguish between logical errors and faults, introducing the concept of checked and unchecked exceptions. However, nobody listens to them, and the checked exceptions are often misused.

As we said, what if we want to recover from a logical error in a computation in the `Raise<E>` context? Well, we can use the `recover` function. Let's make an example. The `RaiseCurrencyConverter.convertUsdToEur` function raises a `NegativeSalary` error when the amount is negative. We want to recover such a situation by returning a zero default value. We can do it as follows:

```kotlin
fun main() {
    val converter = RaiseCurrencyConverter(CurrencyConverter())
    recover({ converter.convertUsdToEur(-1.0) }) { _: JobError ->
        0.0
    }
}
```

The `recover` function takes a lambda in the context of a logical error of type `E` and a second lambda that is a function having as input the error of the same type. Both lambdas must return a value of type `A`. The formal definition of the function is the following:

```kotlin
// Arrow Kt Library
@RaiseDSL
public inline fun <Error, A> recover(
    @BuilderInference block: Raise<Error>.() -> A,
    @BuilderInference recover: (error: Error) -> A,
): A = fold(block, { throw it }, recover, ::identity)
```

As we can see, the `recover` function is just a wrapper around a `fold` function that doesn't handle exceptions or transform the result of the `block` lambda.

## 4. Converting `Raise<E>` Computations to a Wrapped Type

What if we want to convert a computation in the `Raise<E>` context to a function returning an `Either<E, A>`, a `Result<A>`, an `Option<A>`, or an `A?`? Well, nothing is more straightforward than that. The Arrow library provides all the tools to convert a computation in the `Raise<E>` context to a wrapped type. We can use the `either`, `result`, `option`, and `nullable` builders we saw in the previous articles. In fact, version 1.2.0 of Arrow thoroughly reviewed the implementation of such builders, defining them as wrappers around the `fold` function.

Let's start with `Either<E, A>`. The `either` builder is defined as:

```kotlin
// Arrow Kt Library
public inline fun <Error, A> either(@BuilderInference block: Raise<Error>.() -> A): Either<Error, A> =
  fold({ block.invoke(this) }, { Either.Left(it) }, { Either.Right(it) })
```

The implementation is relatively straightforward. Here, we're using the flavor of the `fold` function that rethrow any unhandled exception. The `recover` lambda builds an `Either.Left` instance with the typed error, while the `transform` lambda builds an `Either.Right` instance with the value returned by the `block` lambda.

In our domain, we can implement a function that retrieves the Company associated with a `JobId` using the `either` builder in this way:

```kotlin
class JobsService(private val jobs: Jobs) {
    // Omissis
    fun company(jobId: JobId): Either<JobError, Company> = either {
        jobs.findById(jobId).company
    }
}
```

Here, the `either` builder creates the context of type `Raise<JobError>`, handling it properly. Please praise **the simplicity and absence of boilerplate code**, like calls to `map` functions or `when` expressions.

It's also possible to make the backward conversion from an `Either<E, A>` to a `Raise<E>` using the `bind` function. In the `JobService` module, we can add the following function:

```kotlin
context (Raise<JobError>)
fun companyWithRaise(jobId: JobId): Company = company(jobId).bind()
```

As we can see, any reference to the `Either<E, A>` wrapper type vanishes. The `bind` function is defined as:

```kotlin
// Arrow Kt Library
public interface Raise<in Error> {
    // Omissis

    @RaiseDSL
    public fun <A> Either<Error, A>.bind(): A = when (this) {
        is Either.Left -> raise(value)
        is Either.Right -> value
    }
}
```

The `bind()` function calls the `raise` function if the `Either` instance is a `Left`; otherwise, it returns the value wrapped by the `Right` instance. As we saw at the beginning of this section, the `raise()` function is defined in the context of the `Raise<E>` type.

On the contrary, if we are not interested in the type of the logical error but only in the fact that an error occurred, we can transform a computation in the `Raise<E>` context to an `Option<A>` or a nullable object. Let's start with the `Option<A>` case.

First, we need to introduce how the builder for the `Option<A>` type is defined:

```kotlin
// Arrow Kt Library
public inline fun <A> option(block: OptionRaise.() -> A): Option<A> =
    fold({ block(OptionRaise(this)) }, ::identity, ::Some)
```

Despite the implementation using the `fold` function, the `option` builder is defined on a specific implementation of the `Raise<E>` type, the `OptionRaise` class. The definition of the `OptionRaise` class is the following:

```kotlin
// Arrow Kt Library
public class OptionRaise(private val raise: Raise<None>) : Raise<None> by raise
```

What does it mean? We can only raise a `None` inside an `OptionRaise` context. We can't raise a typed error. The library is designed to avoid accidentally losing the error information. So, **there is no chance to convert a `Raise<E>` context to an `Option<A>` type losing the error of type `E`**. We can only convert a `Raise<None>` context to an `Option<A>` type.

For example, say we want to add a method to the `JobService` class that retrieves the salary associated with a `JobId`. If the `JobId` is invalid, we want to return `None`. As we said, we can't use the `findById` function we defined in the `Jobs` module, but we need to implement a new version. Let's call it `findByIdWithOption`:

```kotlin
interface Jobs {
    // Omissis
    context (Raise<None>)
    fun findByIdWithOption(id: JobId): Job
}
```

The implementation is relatively straightforward:

```kotlin
class LiveJobs : Jobs {
    // Omissis
    context (Raise<None>)
    override fun findByIdWithOption(id: JobId): Job {
        return JOBS_DATABASE[id] ?: raise(None)
    }
}
```

As we said, in case of an error, we'll raise a `None` object since we're not interested in the error that happened. Now, we can use the new `findByIdWithOption` function in the `JobService` module to get the salary associated with a `JobId`. We want the new function to return an `Option<Salary>` type. We can use the `option` builder to do that:

```kotlin
fun salary(jobId: JobId): Option<Salary> = option {
    jobs.findByIdWithOption(jobId).salary
}
```

As we saw for the `Either` case, the code is linear and easy to understand and maintain. We can revert the conversion from an `Option<A>` to a `Raise<None>` context using the `bind` function:

```kotlin
context (OptionRaise)
fun salaryWithRaise(jobId: JobId): Salary = salary(jobId).bind()
```

Be aware that the `bind` function is defined in the context of the `OptionRaise` type, and it's not available if we use the type `Raise<None>` as context. The `bind` function is defined as:

```kotlin
// Arrow Kt Library
public class OptionRaise(private val raise: Raise<None>) : Raise<None> by raise {
    // Omissis
    @RaiseDSL
    public fun <A> Option<A>.bind(): A = getOrElse { raise(None) }
}
```

Another option we have to discard the error information is to convert a `Raise<E>` context to a nullable object. The builder for the nullable object is called `nullable` and is defined as:

```kotlin
// Arrow Kt Library
public inline fun <A> nullable(block: NullableRaise.() -> A): A? =
    merge { block(NullableRaise(this)) }
```

As we can see, we have another dedicated implementation of the `Raise` interface called `NullableRaise`:

```kotlin
// Arrow Kt Library
public class NullableRaise(private val raise: Raise<Null>) : Raise<Null> by raise
```

The `NullableRaise` represents a context where the error is defined using a `null` value. Let's play with it. Say we want to add a new version of the `findById` function to the `Jobs` module. If the `JobId` is invalid, we want to return `null` this time. Let's call the new function `findByIdWithNullable`:

```kotlin
interface Jobs {
    // Omissis
    context (NullableRaise)
    fun findByIdWithNullable(id: JobId): Job
}
```

Here is its implementation:

```kotlin
class LiveJobs : Jobs {
    // Omissis
    context(NullableRaise)
    override fun findByIdWithNullable(id: JobId): Job {
        return JOBS_DATABASE[id] ?: raise(null)
    }
}
```

As we should notice, **the function doesn't return a nullable type**. We represent the possible nullability of the result with the `NullableRaise` context. As we said, we raised a `null` value in case of logical error.

It's time to convert the `Raise<Null>` context to a nullable object. As we said, we can use the `nullable` builder. For example, we'll add a function to the `JosService` module to retrieve the role of a `JobId` or `null` if the `JobId` is not valid:

```kotlin
class JobsService(private val jobs: Jobs, private val converter: CurrencyConverter) {
    // Omissis
    fun role(jobId: JobId): Role? = nullable {
        jobs.findByIdWithNullable(jobId).role
    }
}
```

Working with nullable types this way becomes very easy since we don't have to deal with `?.` notation and Elvis operators. Note that we didn't need to use the `?.` operator to access the `role` property of the job since the nullability is expressed by the `NullableRaise` context.

As we did for the previous wrapper types, we can revert the conversion from a nullable object to a `NullableRaise` context using the `bind` function:

```kotlin
class JobsService(private val jobs: Jobs, private val converter: CurrencyConverter) {
    // Omissis
    context (NullableRaise)
    fun roleWithRaise(jobId: JobId): Role = role(jobId).bind()
}
```

It's worth noting that also the `bind` function returns a computation ending with a non-nullable type. In our case, the return type of the `roleWithRaise` function is `Role` and not `Role?` as in the original `role` function. The `bind` behavior is due to its implementation:

```kotlin
// Arrow Kt Library
public class NullableRaise(private val raise: Raise<Null>) : Raise<Null> by raise {
    // Omissis
    @RaiseDSL
    public fun <A> A?.bind(): A {
        contract { returns() implies (this@bind != null) }
        return this ?: raise(null)
    }
}
```

The `contract` defined in the first line gives the hint to the compiler that if the `bind` function returns, then the receiver object is not null for sure.

Finally, we saw in the previous article that the Arrow library lets us easily convert an `Option<A>` to a nullable type. This sentence also stands true in the case of a `Raise<E>` context. In fact, we can convert an `Option<A>` to a function in the `NullableRaise` context using a dedicated `bind` function:

```kotlin
// Arrow Kt Library
public class NullableRaise(private val raise: Raise<Null>) : Raise<Null> by raise {
    // Omissis
    @RaiseDSL
    public fun <A> Option<A>.bind(): A = getOrElse { raise(null) }
}
```

If we want to apply this function to our example, we can rewrite the `salary` function as:

```kotlin
context (NullableRaise)
fun salaryWithNullableRaise(jobId: JobId): Salary = salary(jobId).bind()
```

Remember that the original `salary` function returns an `Option<Salary>`.

Last, we have the `Result<A>` wrapper type. As you may remember from the [previous article of the series](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/), the `Result<A>` uses subclasses of `Throwable` to represent the error information. In fact, the Arrow library has an implementation of the `Raise<E>` interface for the `Result<A>` type. It uses `Throwable` for the `E` type variable:

```kotlin
// Arrow Kt Library
public class ResultRaise(private val raise: Raise<Throwable>) : Raise<Throwable> by raise
```

To see it in action, we can change the function `convertUsdToEur` we defined in the `RaiseCurrencyConverter` class, letting it raise an exception in case of error instead of a logical typed error. You may remember that the `currencyConverter.convertUsdToEur(amount)` statement throws an exception in case of a negative or `null` amount:

```kotlin
class RaiseCurrencyConverter(private val currencyConverter: CurrencyConverter) {
    // Omissis
    context (ResultRaise)
    fun convertUsdToEurRaiseException(amount: Double?): Double = catch({
        currencyConverter.convertUsdToEur(amount)
    }) { ex: IllegalArgumentException ->
        raise(ex)
    }
}
```

As we may expect, we also have a builder function to convert a computation in the `ResultRaise` context to a `Result<A>` object. It's called `result`, and it's defined as:

```kotlin
// Arrow Kt Library
public inline fun <A> result(block: ResultRaise.() -> A): Result<A> =
    fold({ block(ResultRaise(this)) }, Result.Companion::failure, Result.Companion::failure, Result.Companion::success)
```

The definition is a bit cumbersome due to the definition of the two possible values of a `Result<A>` object. Despite the look, the `result` function is easy to use. If we want to convert the `convertUsdToEurRaiseException` function to a `Result<A>` object, we can write:

```kotlin
fun main() {
    val converter = RaiseCurrencyConverter(CurrencyConverter())
    val maybeSalaryInEur: (Double) -> Result<Double> = { salary: Double ->
        result {
            converter.convertUsdToEurRaiseException(salary)
        }
    }
}
```

Here, we used lambda expression to avoid adding a useless function in the `JobService` class. Obviously, it's possible to convert back a `Result<A>` object to a function in the `ResultRaise` context using the `bind` function:

```kotlin
val maybeSalaryInEurRaise: context(ResultRaise) (Double) -> Double = { salary: Double ->
    maybeSalaryInEur(salary).bind()
}
```

The definition of the `bind` function is as follows:

```kotlin
// Arrow Kt Library
public class ResultRaise(private val raise: Raise<Throwable>) : Raise<Throwable> by raise {
    @RaiseDSL
    public fun <A> Result<A>.bind(): A = fold(::identity) { raise(it) }
    // Omissis
}
```

Here, the `fold` function is defined in the `Result<A>` type, which takes two lambdas: The first is called in case of success and the second one in case of failure.

## 5. Composing `Raise<E>` Computations

We saw in the previous articles of the series that one of the main strengths of the Arrow library is the ability to compose computations returning a wrapper type without the need to use the `map` and `flatMap` functions.

The above sentence is also true for the computations in the `Raise<E>` context. As we did in the previous articles, we'll prove it by implementing a function that returns the gap between the salary of a given job and the salary of the job with the highest salary among all companies. We'll call this function `getSalaryGapWithMax`.

To implement it, we need first to add a new method to the `Jobs` module, the `findAll` function returning all the jobs listed in our database:

```kotlin
interface Jobs {
    // Omissis
    context (Raise<JobError>)
    fun findAll(): List<Job>
}

class LiveJobs : Jobs {
    // Omissis
    context(Raise<JobError>)
    override fun findAll(): List<Job> = catch({
        JOBS_DATABASE.values.toList()
    }) { _: Throwable ->
        raise(GenericError("An error occurred while retrieving all the jobs"))
    }
}
```

We decided to handle any possible error from the communication with our hypothetical database with a `GenericError` typed error.

Next, we need to add a function on a list of `Job` that retrieves the maximum salary. Let's call it `maxSalary`:

```kotlin
context (Raise<JobError>)
private fun List<Job>.maxSalary(): Salary =
    if (isEmpty()) {
        raise(GenericError("No jobs found"))
    } else {
        this.maxBy { it.salary.value }.salary
    }
```

Again, we decided to raise a `GenericError` in case of an empty list. Now, we have all the bricks to implement the `getSalaryGapWithMax` function. We can do it in the `JobService` class:

```kotlin
class JobsService(private val jobs: Jobs, private val converter: CurrencyConverter) {
    // Omissis
    context (Raise<JobError>)
    fun getSalaryGapWithMax(jobId: JobId): Double {
        val job: Job = jobs.findById(jobId)
        val jobList: List<Job> = jobs.findAll()
        val maxSalary: Salary = jobList.maxSalary()
        return maxSalary.value - job.salary.value
    }
}
```

The advantage of using the `Raise<E>` context should be clear: We can write the `getSalaryGapWithMax` function without the need to call any transformation or handle any possible error. **We used plain types as if we were only interested in the happy path**. The `Raise<E>` context will do everything else for us. We didn't need the `bind` function to compose the computations. Perfection.

We can try the `getSalaryGapWithMax` function in the `main` function to get the gap between the salary of a Software Engineer at Apple and the maximum salary among all the jobs:

```kotlin
fun main() {
    val service = JobsService(LiveJobs(), CurrencyConverter())
    fold({ service.getSalaryGapWithMax(JobId(1)) },
        { error -> println("An error was raised: $error") },
        { salaryGap -> println("The salary gap is $salaryGap") })
}
```

Since the salary of the Software Engineer at Apple is 70.000 USD and the maximum salary among all the jobs is 90.000 USD, the output of the program is the following:

```text
The salary gap is 20000.0
```

However, if we try to get the salary gap of a job that doesn't exist, let's say the `JobId(42)`, we'll get the following output:

```text
An error was raised: JobNotFound(jobId=JobId(value=42))
```

Everything works as expected.

Sometimes, we need to handle logic errors from different hierarchies in the same method. For example, imagine we want the above salary gap in EUR, not USD. We need to use the converter we already introduced in the previous sections. However, to show how to handle different error type hierarchies, we'll slightly change the last definition of the converter, introducing a new error type:

```kotlin
sealed interface CurrencyConversionError
data object NegativeAmount : CurrencyConversionError
```

Then, we change the `convertUsdToEur` function to raise the new `NegativeAmount` error in case of a negative amount:

```kotlin
class RaiseCurrencyConverter(private val currencyConverter: CurrencyConverter) {
    // Omissis
    context (Raise<NegativeAmount>)
    fun convertUsdToEurRaisingNegativeAmount(amount: Double?): Double = catch({
        currencyConverter.convertUsdToEur(amount)
    }) { _: IllegalArgumentException ->
        raise(NegativeAmount)
    }
}
```

Now, we can use this new method to get the salary gap in EUR:

```kotlin
class JobsService(private val jobs: Jobs, private val converter: RaiseCurrencyConverter) {
    // Omissis
    context (Raise<JobError>)
    fun getSalaryGapWithMaxInEur(jobId: JobId): Double {
        val job: Job = jobs.findById(jobId)
        val jobList: List<Job> = jobs.findAll()
        val maxSalary: Salary = jobList.maxSalary()
        val salaryGap = maxSalary.value - job.salary.value
        return converter.convertUsdToEurRaisingNegativeAmount(salaryGap)
    }
}
```

However, if we try to compile the above code, we hurt the compiler complaining about the following error:

```text
[ERROR] /Users/rcardin/Documents/functional-error-handling-in-kotlin/src/main/kotlin/in/rcard/raise/RaiseErrorHandling.kt:[119,26] No required context receiver found: Cxt { context(arrow.core.raise.Raise<`in`.rcard.raise.NegativeAmount>) public final fun convertUsdToEurRaisingNegativeAmount(amount: kotlin.Double?): kotlin.Double defined in `in`.rcard.raise.RaiseCurrencyConverter[SimpleFunctionDescriptorImpl@3d8d926f] }
```

In fact, the `getSalaryGapWithMaxInEur` defines only the `Raise<JobError>` context, not the `Raise<NegativeAmount>` context. So, it can't use a function that also defines the `Raise<NegativeAmount>`, as the `convertUsdToEurRaisingNegativeAmount` does. Here, we have two options. The first one is to add the missing context to the `getSalaryGapWithMaxInEur` function:

```kotlin
context (Raise<JobError>, Raise<NegativeAmount>)
fun getSalaryGapWithMaxInEur(jobId: JobId): Double
```

In this way, we're exposing the internals of the function, saying that we cannot handle the `NegativeAmount` error locally and asking the caller to handle it for us.

The second option is to handle the error locally and transform the `NegativeAmount` error into a `JobError` error. The Arrow library provides a handy function to do this: the `withError` function:

```kotlin
// Arrow Kt Library
@RaiseDSL
public inline fun <Error, OtherError, A> Raise<Error>.withError(
    transform: (OtherError) -> Error,
    @BuilderInference block: Raise<OtherError>.() -> A
): A {
    contract {
        callsInPlace(transform, AT_MOST_ONCE)
    }
    return recover(block) { raise(transform(it)) }
}
```

The `withError` function takes a function that transforms an error of type `OtherError` (`NegativeAmount` in our example) into an error of type `Error` (`NegativeSalary` belonging to the `JobError` hierarchy), and a block of code that can raise an error of type `OtherError`. If the block of code raises an error of type `OtherError`, the `withError` function will transform it into an error of type `Error` and raise it. Otherwise, it will return the result of the block of code.

If we apply it to our example, the `getSalaryGapWithMaxInEur` function becomes:

```kotlin
context (Raise<JobError>)
fun getSalaryGapWithMaxInEur(jobId: JobId): Double {
    val job: Job = jobs.findById(jobId)
    val jobList: List<Job> = jobs.findAll()
    val maxSalary: Salary = jobList.maxSalary()
    val salaryGap = maxSalary.value - job.salary.value
    return withError({ NegativeSalary }) {
        converter.convertUsdToEurRaisingNegativeAmount(salaryGap)
    }
}
```

So, the `convertUsdToEurRaisingNegativeAmount` eventually raises a `NegativeAmount` typed error that is transformed into a `NegativeSalary` typed error and raised again.

Well, now, we know how to compose different functions that can raise typed errors. What if we want to accumulate more than one error in a dedicated data structure? It's time to introduce the typed error accumulation in Arrow.

## 6. Typed Error Accumulation

Until now, we've seen how to raise and handle typed errors. However, we've always taken only one error at a time. What if we want to accumulate more than one error in a dedicated data structure? For example, say we have a list of `Jobs,` and we want to find the gap with the maximum available salary in the database for each one.

To better understand the need, let's define the signature of our function in our `JobsService` module. As usual, we'll use the `Raise<A>` context to express the typed error part of the computation:

```kotlin
context (Raise<NonEmptyList<JobError>>)
fun getSalaryGapWithMax(jobIdList: List<JobId>): List<Double>
```

We used the `arrow.core.NonEmptyList<A>` type from the Arrow library for the error part. In fact, if the computation fails for at least one of the `JobId` in the list, we know that the returned list of errors will have at least a value. So, we can use the `NonEmptyList<A>` type to model this constraint. The Arrow library also defines a type alias for the `NonEmptyList<A>` called `Nel<A>`. We'll not enter the details of the `NonEmptyList<A>` type since this article focuses on typed errors rather than data structures. You can read the [official documentation](https://arrow-kt.io/learn/collections-functions/non-empty/) to learn more about the non-empty collections.

As you might guess, the Arrow library gives us a dedicated function to execute a transformation on a list of values and accumulate the errors in a `NonEmptyList<A>`. The function is called `mapOrAccumulate` and has the following structure:

```kotlin
// Arrow Kt library
@RaiseDSL
public inline fun <Error, A, B> Raise<NonEmptyList<Error>>.mapOrAccumulate(
    iterable: Iterable<A>,
    @BuilderInference transform: RaiseAccumulate<Error>.(A) -> B
): List<B> {
    val error = mutableListOf<Error>()
    val results = ArrayList<B>(iterable.collectionSizeOrDefault(10))
    for (item in iterable) {
        fold<NonEmptyList<Error>, B, Unit>(
            { transform(RaiseAccumulate(this), item) },
            { errors -> error.addAll(errors) },
            { results.add(it) }
        )
    }
    return error.toNonEmptyListOrNull()?.let { raise(it) } ?: results
}
```

Quite surprisingly, the `fold` function applies to each collection element. In case of error during the execution of the `transform` lambda, it is accumulated in a dedicated list. Finally, if the list of errors is not empty, it is raised. Otherwise, the list of results is returned.

As we can see, the `mapOrAccumulate` function uses a dedicated implementation of the `Raise<A>` context called `RaiseAccumulate<A>`:

```kotlin
// Arrow Kt library
public open class RaiseAccumulate<Error>(
  public val raise: Raise<NonEmptyList<Error>>
) : Raise<Error>
```

The `RaiseAccumulate<A>` context overrides the `raise` method to create a `NonEmptyList<E>` containing only the risen logic typed error:

```kotlin
// Arrow Kt library
@RaiseDSL
public override fun raise(r: Error): Nothing =
    raise.raise(nonEmptyListOf(r))
```

Now that we have all the pieces of the puzzle, we can implement our `getSalaryGapWithMax` function using the `mapOrAccumulate` function:

```kotlin
context (Raise<NonEmptyList<JobError>>)
fun getSalaryGapWithMax(jobIdList: List<JobId>): List<Double> =
    mapOrAccumulate(jobIdList) { getSalaryGapWithMax(it) }
```

As we can see, it is pretty straightforward to implement our use case with the `mapOrAccumulate` function and the `getSalaryGapWithMax` function that we defined previously on a single `JobId`. Then, let's try it. First, we give the function a list containing `JobId`s that are present in the database:

```kotlin
fun main() {
    val service = JobsService(LiveJobs(), RaiseCurrencyConverter(CurrencyConverter()))
    fold({ service.getSalaryGapWithMax(listOf(JobId(1), JobId(2))) },
        { error -> println("The risen errors are: $error") },
        { salaryGap -> println("The list of salary gaps is $salaryGap") })
}
```

The output is the expected one:

```text
The list of salary gaps is [20000.0, 10000.0]
```

Now, it's time to try the function giving some fake `JobId`s that are not present in the database:

```kotlin
fun main() {
    val service = JobsService(LiveJobs(), RaiseCurrencyConverter(CurrencyConverter()))
    fold({ service.getSalaryGapWithMax(listOf(JobId(1), JobId(42), JobId(-1))) },
        { error -> println("The risen errors are: $error") },
        { salaryGap -> println("The list of salary gaps is $salaryGap") })
}
```

This time, we can see that the execution returns the list of errors:

```text
The risen errors are: NonEmptyList(JobNotFound(jobId=JobId(value=42)), JobNotFound(jobId=JobId(value=-1)))
```

Suppose we directly use the `RaiseAccumulate<E>` context in the signature of the `getSalaryGapWithMax` function. In that case, we can even use the extension function defined on the `Iterable<A>` type to execute the transformation on each element of the list:

```kotlin
// Arrow Kt library
public open class RaiseAccumulate<Error>(
    public val raise: Raise<NonEmptyList<Error>>
) : Raise<Error> {
    // Omissis
    @RaiseDSL
    public inline fun <A, B> Iterable<A>.mapOrAccumulate(
        transform: RaiseAccumulate<Error>.(A) -> B
    ): List<B> = raise.mapOrAccumulate(this, transform)
}
```

Then, the `getSalaryGapWithMax` function can be rewritten as the following:

```kotlin
context (RaiseAccumulate<JobError>)
fun getSalaryGapWithMax(jobIdList: List<JobId>): List<Double> =
    jobIdList.mapOrAccumulate{ getSalaryGapWithMax(it) }
```

We can even get an `Either<NonEmptyList<JobError>, List<Double>>` instead of using `Raise<E>` as context. In fact, the Arrow library defines a version of the `mapOrAccumulate` function that works with the `Either` type:

```kotlin
// Arrow Kt library
@OptIn(ExperimentalTypeInference::class)
public inline fun <Error, A, B> Iterable<A>.mapOrAccumulate(
  @BuilderInference transform: RaiseAccumulate<Error>.(A) -> B,
): Either<NonEmptyList<Error>, List<B>> = either {
  mapOrAccumulate(this@mapOrAccumulate, transform)
}
```

As expected, this version calls the `mapOrAccumulate` function defined on the `Raise<E>` context inside an `either` builder to convert the result. If you were asking, `this@mapOrAccumulate` refers to the receiver object of the external function, in this case, the `Iterable<A>` object.

For the sake of simplicity, the Arrow library gives us a type alias for the `Either<NonEmptyList<E>, A>` type, called `EitherNel<E, A>`:

```kotlin
// Arrow Kt library
public typealias EitherNel<E, A> = Either<NonEmptyList<E>, A>
```

There is one last version of the `mapOrAccumulate` function that is worth mentioning. Instead of accumulating all the errors in a `NonEmptyList<E>`, it is possible to collect them in a custom type. First, the class must define a combining function and a zero element. For example, let's first define a new error type that takes a string message as input:

```kotlin
data class JobErrors(val messages: String = "")
```

As we can see, the type has the empty string as the default value for the `message` property. The empty string represents the zero element of the `JobErrors` type. Then, it's pretty straightforward to define the combining function on that zero element:

```kotlin
operator fun JobErrors.plus(other: JobErrors): JobErrors = JobErrors("$messages, ${other.messages}")
```

We chose the `plus` operator as a convenient combining function. We could also have implemented the operation using a proper method:

```kotlin
fun JobErrors.combine(other: JobErrors): JobErrors = JobErrors("$messages, ${other.messages}")
```

The combination creates a new `JobErrors` object, concatenating the two messages using the `','` character. For those who love functional programming, **such a type is a monoid**.

Now, we can define a new version of the `getSalaryGapWithMax` function that uses the `mapOrAccumulate` function with the `JobErrors` type:

```kotlin
context (Raise<JobErrors>)
fun getSalaryGapWithMaxJobErrors(jobIdList: List<JobId>) =
    mapOrAccumulate(jobIdList, JobErrors::plus) {
        withError({ jobError -> JobErrors(jobError.toString()) }) {
            getSalaryGapWithMax(it)
        }
    }
```

We used the `withError` function we introduced in the previous sections to convert the `JobError` type to the `JobErrors` type. The alternate version of the `mapOrAccumulate` function takes the accumulating function as the second input parameter. The rest remains the same.

As usual, let's give the new shiny function a try:

```kotlin
fun main() {
    val jobService = JobsService(LiveJobs(), RaiseCurrencyConverter(CurrencyConverter()))
    fold({ jobService.getSalaryGapWithMaxJobErrors(listOf(JobId(-1), JobId(42))) },
        { error -> println("The risen errors are: $error") },
        { salaryGaps -> println("The salary gaps are $salaryGaps") })
}
```

If we did everything correctly, we should see the following output after the execution:

```text
The risen errors are: JobErrors(messages=JobNotFound(jobId=JobId(value=-1)), JobNotFound(jobId=JobId(value=42)))
```

## 7. Zipping Errors

As we said, the `mapOrAccumulate` function allows the combination of the results of a transformation applied to a collection of elements of the same type. What if we want to combine transformations applied to objects of different types?

A classic example is **the validation during the creation of an object**. Let's build an example together. Say we want a pimped version of our `Salary` type that also adds the salary currency. We can define it as the following:

```kotlin
data class Salary(val amount: Double, val currency: String)
```

However, the above definition doesn't prevent us from creating objects that are not valid. For example, a `Salary` with an amount that is less than zero or with a currency that is not made of three capital letters:

```kotlin
val wrongSalary = Salary(-1000.0, "eu")
```

In general, we want to avoid the creation of invalid objects. To do so, we can define what we call a smart constructor. **Smart constructors are factories that look like regular constructors but perform validations and generally return the valid object or some typed error**.

In Kotlin, the application of the pattern requires to change the scope of the main construct to `private` to avoid the creation of objects outside the factory:

```kotlin
data class Salary private constructor(val amount: Double, val currency: String)
```

As we have a `data class`, bypassing the `private` constructor using the `copy` function is still possible. There is an [interesting thread](https://youtrack.jetbrains.com/issue/KT-11914/Confusing-data-class-copy-with-private-constructor) on the JetBrains tracking system about this topic. However, for the sake of simplicity, we can ignore this problem for the article.

Now, we need to create a hierarchy of the possible logical typed errors we can have while creating a `Salary` object. We'll check for the following two errors:

1. The amount must be greater than zero
2. The currency must be made of three capital letters

We define the following hierarchy of types to represent the above errors:

```kotlin
sealed interface SalaryError
data object NegativeAmount : SalaryError
data class InvalidCurrency(val message: String) : SalaryError
```

Once we have changed the constructor's scope, we need a method to effectively create a valid instance of the `Salary` type. Then, let's override the `invoke` operator in the `companion object` to create a smart constructor that looks like the regular primary constructor:

```kotlin
data class Salary private constructor(val amount: Double, val currency: String) {
    companion object {
        context (Raise<NonEmptyList<SalaryError>>)
        operator fun invoke(amount: Double, currency: String): Salary = TODO()
    }
}
```

If we don't like to override the `invoke` operator, we can define a regular function (factory method) in the `companion object`. Usually, we use the `of` name for this kind of function.

The smart constructor must perform all the needed validation on input data before creating a concrete instance of the object. For this reason, we added the context `Raise<NonEmptyList<SalaryError>>`. We used the `NonEmptyList<SalaryError>` to accumulate all possible errors during the validation. For example, invoking the smart constructor with the input data `-1.0` and `eu` must return the following list of errors:

```kotlin
NonEmptyList(NegativeAmount, InvalidCurrency("The currency must be made of three capital letters"))
```

We can't use the `mapOrAccumulate` function we previously saw because we don't have a list of objects of the same type as input. Here, we have a `Double` and `String` as input. We need to find something else.

Fortunately, the Arrow library provides the `zipOrAccumulate` function, which we need. The function is defined as follows:

```kotlin
// Arrow Kt library
@RaiseDSL
public inline fun <Error, A, B, C, D, E, F, G, H, I, J> Raise<NonEmptyList<Error>>.zipOrAccumulate(
    @BuilderInference action1: RaiseAccumulate<Error>.() -> A,
    @BuilderInference action2: RaiseAccumulate<Error>.() -> B,
    @BuilderInference action3: RaiseAccumulate<Error>.() -> C,
    @BuilderInference action4: RaiseAccumulate<Error>.() -> D,
    @BuilderInference action5: RaiseAccumulate<Error>.() -> E,
    @BuilderInference action6: RaiseAccumulate<Error>.() -> F,
    @BuilderInference action7: RaiseAccumulate<Error>.() -> G,
    @BuilderInference action8: RaiseAccumulate<Error>.() -> H,
    @BuilderInference action9: RaiseAccumulate<Error>.() -> I,
    block: (A, B, C, D, E, F, G, H, I) -> J
): J {
    contract { callsInPlace(block, AT_MOST_ONCE) }
    val error: MutableList<Error> = mutableListOf()
    val a = recover({ action1(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val b = recover({ action2(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val c = recover({ action3(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val d = recover({ action4(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val e = recover({ action5(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val f = recover({ action6(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val g = recover({ action7(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val h = recover({ action8(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    val i = recover({ action9(RaiseAccumulate(this)) }) { error.addAll(it); EmptyValue }
    error.toNonEmptyListOrNull()?.let { raise(it) }
    return block(unbox(a), unbox(b), unbox(c), unbox(d), unbox(e), unbox(f), unbox(g), unbox(h), unbox(i))
}
```

Many different versions of the function differ in the number of input parameters. The above is the one with the maximum number of parameters. The function takes a list of functions that return a value of type `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, and a function that takes all the previous values and returns a value of type `J`. The function returns the value of type `J`; if any error occurs, it raises the list of errors. So, remember: **The maximum number of single input parameters is 9**. If we need more, we must apply the function recursively multiple times.

It's worth noting the use of the `unbox` function, an Arrow library internal function used to handle possible `null` values. The function is defined as follows:

```kotlin
// Arrow Kt library
@PublishedApi
internal object EmptyValue {
    @Suppress("UNCHECKED_CAST", "NOTHING_TO_INLINE")
    public inline fun <A> unbox(value: Any?): A =
        if (value === this) null as A else value as A
}
```

The `EmptyValue` is intended only for internal use, and it's used to handle the `null` values within generic types instead of using the `Option` wrapper.

As you may guess, we'll use the version of the function taking two different input parameters, and the functions we'll apply to them are the validations we need to perform on the input data:

```kotlin
context (Raise<NonEmptyList<SalaryError>>)
operator fun invoke(amount: Double, currency: String): Salary =
    zipOrAccumulate(
        { ensure(amount >= 0.0) { NegativeAmount } },
        {
            ensure(currency.isNotEmpty() && currency.matches("[A-Z]{3}".toRegex())) {
                InvalidCurrency("Currency must be not empty and valid")
            }
        },
    ) { _, _ ->
        Salary(amount, currency)
    }
```

We already saw the `ensure` function in the previous articles of the series. The function checks if the expression given as the first parameter is true, and if not, it raises the error passed as the second parameter. The `ensure` function is defined as the following:

```kotlin
// Arrow Kt library
@RaiseDSL
public inline fun <Error> Raise<Error>.ensure(condition: Boolean, raise: () -> Error) {
    contract {
        callsInPlace(raise, AT_MOST_ONCE)
        returns() implies condition
    }
    return if (condition) Unit else raise(raise())
}
```

So, let's try to create an invalid `Salary`:

```kotlin
fun main() {
    fold({ ValidatedJob.Salary(-1.0, "EU") },
        { error -> println("The risen errors are: $error") },
        { salary -> println("The valid salary is $salary") })
}
```

As expected, the output of the program contains both errors and it's the following:

```text
The risen errors are: NonEmptyList(NegativeAmount, InvalidCurrency(message=Currency must be not empty and valid))
```

## 8. Conclusions

The long journey throughout the new error-handling style in the Arrow 1.2.0 library has ended. During the path, we introduced the central concept of this article, the `Raise<E>` context, and all its implementing flavors. We saw how to use it to transform and recover a computation in its context. Then, we saw how easy it is to pass from the `Raise<E>` context to any of the available wrapper types, like `Either<E, A>`, `Option<A>`, and `Result<A>`. We appreciated how smooth is the composition of functions defined in the `Raise<E>` context. Finally, we saw how to use the `Raise<E>` context to accumulate errors. The article should have given you a good overview of the new error handling style in Arrow and how the Arrow guys decided to get rid of a lot of category theory types (did you see any reference to a monoid, monad, applicative, or _traverse_ application?) in favor of a more straight, idiomatic and Kotlinsh approach.

If you found this article (or the ones before it) too difficult, you can quickly get the experience you need by following the Rock the JVM complete [Kotlin Essentials course](https://rockthejvm.com/p/kotlin-essentials).

## 9. Appendix: Maven Configuration

As promised, here is the complete Maven configuration we used in this article:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>in.rcard</groupId>
    <artifactId>functional-error-handling-in-kotlin</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <kotlin.version>1.9.0</kotlin.version>
        <arrow-core.version>1.2.0</arrow-core.version>
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
                <configuration>
                    <args>
                        <arg>-Xcontext-receivers</arg>
                    </args>
                </configuration>
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
