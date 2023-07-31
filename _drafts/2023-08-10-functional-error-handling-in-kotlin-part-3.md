---
title: "Functional Error Handling in Kotlin, Part 3: The Raise DSL"
date: 2023-08-10
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

It's time to end our journey on functional error handling in Kotlin with the new features introduced by the Arrow library in version 1.2.0, which are a preview of the big rewrite we'll have in version 2.0.0. We'll mainly focus on the `Raise` DSL, a new way to handle typed error using [Kotlin contexts](https://blog.rockthejvm.com/kotlin-context-receivers/). This article is part of a series: We can always reference the previous parts using this links:

* [Functional Error Handling in Kotlin, Part 1: Absent values, Nullables, Options](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/)
* [Functional Error Handling in Kotlin, Part 2: Result and Either](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/)

Without further ado, let's start!

## 1. Setup

We'll use version 1.9.0 of Kotlin and version 1.2.0 of the Arrow library. In fact, the Raise DSL is not available in previous versions of Arrow.

Since the context receivers are still an experimental feature, we need to enable them explicitly. In the article [Kotlin contexts](https://blog.rockthejvm.com/kotlin-context-receivers/), we saw how to enable context receivers using Gradle. This time, we see how to do it in Maven. We need to pass the property `-Xcontext-receivers` to the `kotlin-maven-plugin`, using the appropriate `configuration` element:

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

Since we'll use a lot of typed errors during the article, we need to define also a hierarchy of errors that the `Jobs` module can raise:

```kotlin
sealed interface JobError
data class JobNotFound(val jobId: JobId) : JobError
data class GenericError(val cause: String) : JobError
data object NegativeSalary : JobError
```

Now that we have defined the domain model and the module that will contain the algebra to access it together with the errors we'll use along the way, it's time to start to show how the new Raise DSL works.

## 3. The Raise DSL

The Raise DSL is a new way to handle typed errors in Kotlin. Instead of using a wrapper type to handle both the happy path and errors, the `Raise<E>` type describes the possibility that a function can raise a logical error of type `E`. So, instead of returning a `Raise<E>`, a function that can raise an error of type `E` must execute in a scope that is also able to handle the error.

In this sense, the `Raise<E>` is very similar the `CoroutineScope`, which describes the possibility for a function to execute suspending functions using structural concurrency (see the article [Kotlin Coroutines - A Comprehensive Introduction](https://blog.rockthejvm.com/kotlin-coroutines-101/) for further details).

As we saw in the article [Kotlin Context Receivers: A Comprehensive Guide](https://blog.rockthejvm.com/kotlin-context-receivers/), Kotlin models such scopes using receivers instead.

The easiest way to define a function that can raise an error of type `E` is to use the `Raise<E>` type as the receiver of an extension function:

```kotlin
fun Raise<JobNotFound>.appleJob(): Job = JOBS_DATABASE[JobId(1)]!!
```

Inside the `Raise<E>` context, we have a lot of useful functions. One of this is the `raise` function:

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

As we can see from the signature of the `raise` function, the only type of logical error that a function can raise is the one that is defined in the receiver of the function. If we try to cheat, the compiler will complain immediately. The following code doesn't compile:

```kotlin
fun Raise<JobNotFound>.jobNotFound(): Job = raise(GenericError("Job not found"))
```

In fact, the compilation error is:

```text
Type mismatch: inferred type is GenericError but JobNotFound was expected
```

We may have noticed that one advantage of using the `Raise<E>` context is that the return type of the function listed only the happy path. In fact, the `jobNotFound` function returns a `Job` and not a `Raise<JobNotFound, Job>`. As we'll see in a moment, this is a huge advantage when we want to compose functions that can raise errors.

However, using extension functions to define functions that can raise errors is not convenient. As you might remember, we can't have more than one receiver in an extension function. Let's see an example. First of all, let's start to implement our `Jobs` module. As we did in the previous articles, we'll start from the `findById` function:

```kotlin
interface Jobs {

    fun Raise<JobError>.findById(id: JobId): Job
}

class LiveJobs : Jobs {
    override fun Raise<JobError>.findById(id: JobId): Job =
        JOBS_DATABASE[id] ?: raise(JobNotFound(id))
}
```

As we said, the return type of the `findById` function is just `Job`. Another important thing to notice is that the `Raise<E>` type is covariant in the `E` type parameter. In fact, we raised a `JobNotFound` from the `findById` function, but the extension function is defined on the `Raise<JobError>` type instead. Wow, a lot of useful features!

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

As we did in the article [Kotlin Context Receivers: A Comprehensive Guide](https://blog.rockthejvm.com/kotlin-context-receivers/), we can't do it, since the only available receiver is already taken by the `Raise<JobError>` type. Fortunately, Kotlin context receivers can rescue us. In fact, we can treat the `Raise<JobError>` receiver as a context receiver, obtaining the following equivalent code:

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

Since Kotlin allows more than one context receiver at time, we can add the `Logger` module as a context receiver:

```kotlin
context (Logger, Raise<JobError>)
override fun findById(id: JobId): Job {
    info("Retrieving job with id $id")
    return JOBS_DATABASE[id] ?: raise(JobNotFound(id))
}
```

For the rest of the article, we'll use the context receivers syntax, since it's more convenient.

Now that we know how to create a function that can raise an error, let's see how to handle it. The most generic way to execute a function that can raise an error of type `E` and that is defined in the context of a `Raise<E>` is the `fold` function, which is defined as follows:

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

Let's split the above function in its parts. The `block` parameter is the function that we want to execute. The `catch` parameter is a function that is executed when the `block` function throws an exception. The `recover` parameter is a function that is executed when the `block` function raises an logical typed error of type `E`. Finally, the `transform` parameter is a function that is executed when the `block` function returns a value of type `A`. As we can see, all the handling blocks return the same value of type `B`.

As we did in the previous articles, let's implement a service using the `Jobs` module and function that prints the salary of a `JobId`:

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

To be fair, here, we used the version of the `fold` function that do not handle exceptions. In fact, the `catch` parameter is not defined. Let's use the `printSalary` function to print the salary of a job that exists in the database:

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

So far so good. As we might notice, the `printSalary` method has no context defined. In fact, the `fold` function "consumes" the context, creating a concrete instance of a `Raise<E>`type and executing the `block` lambda in the context of that instance. Let's look at the implementation of the `fold` function for a moment:

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

First, the library gives some hints to the Kotlin compiler inside the `contract` block. In details, it says that the `catch`, `recover` and `transform` functions are called at most once, and only inside the `fold` function.

Now, it comes the interesting part. The `fold` function creates a `DefaultRaise` instance, which is one of the available concrete implementations of the `Raise<E>` interface. The `block` is a lambda expression with a receiver, and in Kotlin, we can pass the receiver in different ways to the lambda, which are:

```kotlin
val raise = DefaultRaise(false)
// Method 1
block.invoke(raise)
// Method 2
block(raise)
// Method 3
raise.block()
```

The Arrow library chose the second method. The `DefaultRaise` implementation of the `Raise<E>` interface is the following:

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

Basically, the implementation of the `DefaultRaise.raise` throws a subclass of a `CancellationException` if the method was called inside a its scope, a.k.a. the execution was not leaked. The exception contains a reference `r` to the typed error.

The `fold` function catches the `CancellationException` and calls the `recover` lambda with the typed error, if the error was risen by the current `Raise<E>` instance. Otherwise, it rethrows the exception. The library performs this check using the `raisedOrRethrow` extension function:

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

It's important notice that the typed error is handled only if the exception is an instance of `RaiseCancellationExceptionNoTrace` or `RaiseCancellationException`. Otherwise, if the exception is a true `CancellationException`, it is rethrown. In fact, `CancellationException` should not be caught because it’s used by Kotlin to cancel coroutines, and catching it can break normal functioning of coroutines.

The last `catch` expression of the `fold` function catches all the other exceptions, and calls the `catch` lambda with the exception, if the exception is not fatal. Otherwise, it rethrows the exception. The library performs this check using the `nonFatalOrThrow` extension function. In case you need to know them, fatal exceptions are the following:

- `VirtualMachineError`
- `ThreadDeath`
- `InterruptedException`
- `LinkageError`
- `ControlThrowable`
- `CancellationException` 

The subtypes of these errors should not be caught.

Every branch of the `fold` function completes the `DefaultRaise` instance, calling the `complete` method. The default implementation just delimits the scope of the `Raise<E>` instance.

Please, be aware that any exception thrown inside the `Raise<E>` context will bubble up, and not will not be transformed automagically into a logical typed error. For example, imagine we need to convert amounts from dollars to euros. We can define a `CurrencyConverter` module as follows:

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

The `convertUsdToEur` throws an exception when the amount is `null` or negative. If we try to use it inside the `Raise<E>` context, the exception will bubble up. For example, let's create a wrapper around the converter, defining a context of type `Raise<Throwable>` and try to use it:

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

As we said, we expect the exception to be caught by the `catch` lambda. In fact, if we run the code, we get the following output:

```text
An exception was thrown: java.lang.IllegalArgumentException: Amount must be positive
```

What if we want to convert the exception into a typed error? For example, we want to convert the `IllegalArgumentException` into a `NegativeSalary`. Well, we can do it using the `catch` function. Let's change the `RaiseCurrencyConverter.convertUsdToEur` function as follows:

```kotlin
context (Raise<NegativeSalary>)
fun convertUsdToEur(amount: Double?): Double = catch ({
    currencyConverter.convertUsdToEur(amount)
}) {_: IllegalArgumentException ->
    raise(NegativeSalary)
}
```

The implementation of the `catch` function is quite straightforward:

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

As we can see, there's nothing special with the `catch` function. It just catches the exception and calls the `catch` lambda with the exception. The `nonFatalOrThrow` extension function is used to check if the exception is fatal or not. If the exception is fatal, it is rethrown. Otherwise, it is processed. However, no reference to the `Raise<E>` context is present. In fact, it's the call to the `raise` function we did that introduces the reference to the `Raise<E>` context. 

What if we want to convert a computation in the `Raise<E>` context to a function returning an `Either<E, A>`, a `Result<A>`, an `Option<A>` or a `A?`? Well, nothing easier than that. The Arrow library provides all the tools to convert a computation in the `Raise<E>` context to a wrapped type. We can use the `either`, `result`, `option`, and `nullable` builders we saw in the previous articles. In fact, version 1.2.0 of Arrow completely reviewed the implementation of such builders, defining them as wrappers around the `fold` function. 

Let's start with `Either<E, A>`. The `either` builder is defined as:

```kotlin
// Arrow Kt Library
public inline fun <Error, A> either(@BuilderInference block: Raise<Error>.() -> A): Either<Error, A> =
  fold({ block.invoke(this) }, { Either.Left(it) }, { Either.Right(it) })
```

The implementation is quite straightforward. Here, we're using the flavor of the `fold` function that simply rethrow any unhandled exception. The `recover` lambda builds an `Either.Left` instance with the typed error, while the `transform` lambda builds an `Either.Right` instance with the value returned by the `block` lambda.

In our domain, we can implement a function that retrieves the Company associated with a `JobId` using the `either` builder in this way:

```kotlin
class JobsService(private val jobs: Jobs) {
    // Omissis
    fun company(jobId: JobId): Either<JobError, Company> = either {
        jobs.findById(jobId)
    }.map { job ->
        job.company
    }
}
```

Here, the `either` builder creates the context of type `Raise<JobError>`, handling it properly. It's possible also to make the backward conversion, from an `Either<E, A>` to a `Raise<E>`, using the `bind` function. In the `JobService` module we can add the following function:

```kotlin
context (Raise<JobError>)
fun companyWithRaise(jobId: JobId): Company = company(jobId).bind()
```

As we can see, any reference to the `Either<E, A>` wrapper type is vanished. The `bind` function is defined as:

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

The `bind()` function simply calls the `raise` function if the `Either` instance is a `Left`, otherwise it returns the value wrapped by the `Right` instance. As we saw at the beginning of this section, the `raise()` function is defined in the context of the `Raise<E>` type. As we can see from its definition, also `bind()` needs a `Raise<E>` context. For this reason, calling `bind()` adds the `Raise<E>` context to the resulting function.

On the contrary, if we are not interested in the type of the logical error but only in the fact that an error occurred, we can transform a computation in the `Raise<E>` context to a `Option<A>` or into a nullable object. Let's start with the `Option<A>` case.

First, we need to introduce how the builder for the `Option<A>` type is defined:

```kotlin
// Arrow Kt Library
public inline fun <A> option(block: OptionRaise.() -> A): Option<A> =
    fold({ block(OptionRaise(this)) }, ::identity, ::Some)
```

Despite the implementation using the `fold` function, the `option` builder is defined on a specific implementation of the `Raise<E>` type, the `OptionRaise` class. The `OptionRaise` class is defined as follows:

```kotlin
// Arrow Kt Library
public class OptionRaise(private val raise: Raise<None>) : Raise<None> by raise
```

What does it mean? Well, we can only raise a `None` inside a `OptionRaise` context. We can't raise a typed error. Probably, the library is designed in this way to avoid to accidentally lose the error information. So, there is no chance to convert a `Raise<E>` context to an `Option<A>` type. We can only convert a `Raise<None>` context to an `Option<A>` type.

For example, say we want to add a method to the `JobService` class that retrieves the salary associated with a `JobId`. If the `JobId` is not valid, we want to return `None`. For what we said, we can't use the `findById` function we defined in the `Jobs` module, but we need to implement a new version of it::

```kotlin
TODO
```

The conversion between a `Result<A>` and a `Raise<E>` is a little more tricky. In fact, the `Result<A>` type uses as error type the `Throwable` type. Hence, we can convert it only to a `Raise<Throwable>` type. The case is so special that the Arrow library provides a dedicated implementation of the `Raise<E>` interface, the `ResultRaise` class:

```kotlin
// Arrow Kt Library
public class ResultRaise(private val raise: Raise<Throwable>) : Raise<Throwable> by raise
```




## X. Appendix: Maven Configuration

As promised, here is the full Maven configuration we used in this article:

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