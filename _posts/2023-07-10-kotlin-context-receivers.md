---
title: "Kotlin Context Receivers: A Comprehensive Guide"
date: 2023-07-10
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [kotlin]
excerpt: "This tutorial describes Kotlin context receivers, a new feature of the Kotlin language for nice and controllable abstractions."
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

This article will explore a powerful feature of the Kotlin programming language called context receivers. If you're a Kotlin developer looking to write cleaner and more expressive code, context receivers are a tool you'll want in your toolbox.

In Kotlin, context receivers provide a convenient way to access functions and properties of multiple receivers within a specific scope. Whether you're working with interfaces, classes, or type classes, context receivers allow you to streamline your code and enhance its maintainability.

We'll dive deeply into context receivers, starting with their purpose and benefits. We'll explore practical examples and demonstrate how context receivers can make your Kotlin code more expressive and effective. So let's get started and unlock the full potential of context receivers in Kotlin!

> Context Receivers are an experimental feature and requires good knowledge of Kotlin. If you need to get those skills **quickly** and with thousands of lines of code and a project under your belt, we think you'll love [Kotlin Essentials](https://rockthejvm.com/p/kotlin-essentials). It's a jam-packed course on **everything** you'll ever need to work with Kotlin for any platform (Android, native, backend, anything), including less-known techniques and language tricks that will make your dev life easier. Check it out [here](https://rockthejvm.com/p/kotlin-essentials).

If you'd like to watch the video version, please find it below:

{% include video id="TVdFAftHzPE" provider="youtube" %}

## 1. Setup

Let's go through the setup steps to harness the power of context receivers in your Kotlin project. **We'll use Gradle with the Kotlin DSL** and enable the context receivers compiling option. Make sure you have Kotlin version 1.8.22 or later installed before proceeding.

We'll use nothing more than the Kotlin standard library this time on top of Java 19. At the end of the article, we'll provide the complete `build.gradle.kts` file for your reference.

If you want to try generating the project you own, just type `gradle init` on a command line, and answer the questions you'll be asked.

**Context receivers are still an experimental feature**. Hence, they're not enabled by default. We need to modify the Gradle configuration. Add the `kotlinOptions` block within the `tasks.withType<KotlinCompile>` block in your `build.gradle.kts` file:

```kotlin
tasks.withType<KotlinCompile>().configureEach {
    kotlinOptions {
        freeCompilerArgs = freeCompilerArgs + "-Xcontext-receivers"
    }
}
```

We'll explore the concept of context receivers in the context of a job search domain. To make our examples more relatable, let's consider a simplified representation of job-related data using Kotlin data classes and inline classes.

```kotlin
data class Job(val id: JobId, val company: Company, val role: Role, val salary: Salary)

@JvmInline
value class JobId(val value: Long)

@JvmInline
value class Company(val name: String)

@JvmInline
value class Role(val name: String)

@JvmInline
value class Salary(val value: Double)
```

In the above code snippet, we have a `Job` data class that represents a job posting. Each `Job` has an `id`, `company`, `role`, and `salary`. The `JobId`, `Company`, `Role`, and `Salary` are inline classes that wrap primitive types to provide data type safety and semantic meaning.

Finally, we can define a map of jobs to mimic a database of job postings:

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

Now that we have our domain objects set up let's dive into how context receivers can simplify our code and make our job search application more efficient.

## 2. Dispatchers and Receivers

We need an example to work with to better introduce the context receivers feature. Let's consider a function that needs to print the JSON representation of a list of jobs. We'll call this function `printAsJson`:

```kotlin
fun printAsJson(objs: List<Job>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") {
        it.toJson()
    }
```

If we try to compile this code, we'll get an error since there is no `toJson` function defined on the `Job` class:

```
Unresolved reference: toJson
```

Since we don't want to pollute our domain model, we implement the `toJson` extension function for the `Job` domain object.

```kotlin
fun Job.toJson(): String =
    """
        {
            "id": ${id.value},
            "company": "${company.name}",
            "role": "${role.name}",
            "salary": $salary.value}
        }
    """.trimIndent()
```

In Kotlin, we call the `Job` type the _receiver_ of the `toJson` function. **The receiver is the object on which the extension function is invoked**, which is available in the function body as `this`.

So far, so good. We can now compile our code and print the JSON representation of a list of jobs:

```kotlin
fun main() {
    JOBS_DATABASE.values.toList().let(::printAsJson)
}
```

Now, we want to reuse this function in other parts of our application. However, we want to extend the function beyond printing only jobs as JSON. We want to be able to print any list of objects as JSON. So we decide to make the `printAsJson` function generic:

```kotlin
fun <T> printAsJson(objs: List<T>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") {
        it.toJson()
    }
```

However, we return to the original problem. We still don't have a `toJson` function defined on the `T` type. Moreover, we don't want to change the `Job` or any other type adding the implementation from some weird interface that adds the `toJson()` methods. We could not even have access to the class code to modify it.

So, we want to execute our new parametric version of the `printAsJson` only in a scope where we know a `toJson` function is defined on the `T` type. Let's start building all the pieces we need to achieve this goal.

First, we need to define the safe scope. We start implementing it as an interface that defines the `toJson` function:

```kotlin
interface JsonScope<T> {
    fun T.toJson(): String
}
```

Here, we introduced another characteristic of extension functions. In Kotlin, **we call the `JsonScope<T>` the dispatcher receiver of the `toJson` function**. In this way, we limit the visibility of the `toJson` function, which allows us to call it only inside the scope. We say that the `toJson` function is a context-dependent construct.

We can access the dispatcher receiver in the function body as `this`. As we might guess, Kotlin represents the `this` reference as **a union type of the dispatcher receiver and the receiver of the extension function**.

```kotlin
interface JsonScope<T> {    // <- dispatcher receiver
    fun T.toJson(): String  // <- extension function receiver
    // 'this' type in 'toJson' function is JsonScope<T> & T
}
```

The `JsonScope<T>` is a safe place to call the `printAsJson` function since we know we have access to a concrete implementation of the `toJson` function. Then, we define the `printAsJson` function as an extension function on the `JsonScope` interface:

```kotlin
fun <T> JsonScope<T>.printAsJson(objs: List<T>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
```

The next step is to define the `JsonScope` implementation for the `Job` type. We can implement it as an anonymous object:

```kotlin
val jobJsonScope = object : JsonScope<Job> {
    override fun Job.toJson(): String {
        return """
            {
                "id": ${id.value},
                "company": "${company.name}",
                "role": "${role.name}",
                "salary": $salary.value}
            }
        """.trimIndent()
    }
}
```

The last ring of the chain is to call the `printAsJson` function in the safe scope of the `jobJsonScope`. How can we do that? We can use one of the available **scope functions** in Kotlin. Usually, the `with` function is preferred in such situations. This function takes a receiver and a lambda as arguments and executes the lambda in the receiver's scope. In this way, we can call the `printAsJson` function in the safe context of the `jobJsonScope`:

```kotlin
fun main() {
    with(jobJsonScope) {
        println(printAsJson(JOBS_DATABASE.values.toList()))
    }
}
```

Did we already encounter this pattern? Yes, we did. The [Kotlin coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/) heavily rely on the same design. All the coroutine builders, a.k.a. `launch` and `async`, are extensions of the `CoroutineScope`, the dispatcher receiver and the safe place to call the `suspend` functions.

Moreover, if you have a Scala or Haskell background, you might notice some interesting similarities with the [Type Classes](https://blog.rockthejvm.com/why-are-typeclasses-useful/). In fact, the `JsonScope` interface is a type class, and the `jobJsonScope` is an instance of the `JsonScope` type class for the `Job` type. If we were in Scala, we would have called the `JsonScope` type class `Jsonable` or something like that.

The difference between Kotlin and Scala/Haskell is that we do not have any implicit and automatic mechanism to find the correct type class instance. In Scala 2, we have the `implicit` classes, and in Scala 3, we have `given` classes. In Kotlin, we still do not have any auto-magic mechanism.

## 3. Entering the Future: Context Receivers

The approach we used so far reached the goal. However, it has some limitations.

First, we add the `printAsJson` function as an extension to the `JsonScope` interface. However, the function has nothing to do with the `JsonScope` type. We placed it there because it was the only technical possible solution offered. It's somewhat misleading: The `printAsJson` is not a method of the `JsonScope` type!

Second, extension functions are only available on objects, which is only sometimes what we desire. For example, we don't want our developers to use the `printAsJson` in the following way:

```kotlin
jobJsonScope.printAsJson(JOBS_DATABASE.values.toList())
```

The problem is that we can't avoid the above usage of our DSL.

Third, we are limited to having only one receiver using extension functions with scopes. For example, let's define a `Logger` interface and an implementation that logs to the console:

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

Suppose we want to add logging capability to our `printAsJson` function. In that case, we can't do it because it's defined as an extension of the `JsonScope` interface, and we can't add a second receiver to the `printAsJson` function.

To overcome these limitations, we must introduce a new concept: context receivers. Presented as an experimental feature in Kotlin 1.6.20, their aim is to solve the above problems and to provide a more flexible maintainable code.

In detail, **context receivers are a way to add a context or a scope to a function without passing this context as an argument**. If we revised how we solved the problem of the `printAsJson` function problem, we could see that we passed the context as an argument. In fact, the receiver of an extension function is passed to the function as an argument by the JVM once the function is interpreted in bytecode.

Kotlin introduced a new keyword, `context`, that allows us to specify the context the function needs to execute. In our case, we can define a new version of the `printAsJson` function as:

```kotlin
context (JsonScope<T>)
fun <T> printAsJson(objs: List<T>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") {
        it.toJson()
    }
```

The `context` keyword is followed by the type of the context receiver. The context receivers are available as the `this` reference inside the function body. Our example allows us to access the `toJson` extension function defined in the `JsonScope` interface.

How can we bring a `JsonScope` instance into the scope of the `printAsJson` function? We can use the `with` function as we did before (call-site):

```kotlin
fun main() {
    with(jobJsonScope) {
        println(printAsJson(JOBS_DATABASE.values.toList()))
    }
}
```

We just solved one of our problems with the previous solution. In fact, the `printAsJson` function is not available as a method of the `JsonScope` interface. We can't call it in the following way:

```kotlin
// Compilation error
jobJsonScope.printAsJson(JOBS_DATABASE.values.toList())
```

Yuppy! We solved the first and the problems. What about having more than one context for our function? Fortunately, we can do it. In fact, **the `context` keyword takes an array of types as arguments**. For example, we can define a `printAsJson` function that takes a `JsonScope` and a `Logger` as context receivers and uses the methods of both:

```kotlin
context (JsonScope<T>, Logger)
fun <T> printAsJson(objs: List<T>): String {
    info("Serializing $objs list as JSON")
    return objs.joinToString(separator = ", ", prefix = "[", postfix = "]") {
        it.toJson()
    }
}
```

As we can see, we're using the `info` method of the `Logger` interface.

Calling the new pimped version of the `printAsJson` function is straightforward. We can provide both contexts using the `with` function, as we did before:

```kotlin
fun main() {
    with(jobJsonScope) {
        with(consoleLogger) {
            println(printAsJson(JOBS_DATABASE.values.toList()))
        }
    }
}
```

Finally, we solved all the problems we found with the previous solution.

Inside the function using the `context` keyword, we can't access the context directly using the `this` keyword. For example, the following code doesn't compile:

```kotlin
context (JsonScope<T>, Logger)
fun <T> printAsJson(objs: List<T>): String {
    this.info("Serializing $objs list as JSON")
    return objs.joinToString(separator = ", ", prefix = "[", postfix = "]") {
        it.toJson()
    }
}
```

In fact, the compiler complains with the following error:

```
'this' is not defined in this context
```

However, **we can access referencing a particular function from a context using the `@` notation**, as follows:

```kotlin
context (JsonScope<T>, Logger)
fun <T> printAsJson(objs: List<T>): String {
    this@Logger.info("Serializing $objs list as JSON")
    return objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
}
```

In this way, we can disambiguate the context we want to use in the case of multiple contexts defining functions with colliding names.

Another exciting thing is that **the `context` is part of the function signature**. As we saw, we can have multiple functions with the same signature in different contexts. How is it possible? The answer is how the function looks once it's expanded by the Kotlin compiler. The contexts are explicitly passed as arguments to the compiled function. For example, in the case of our last version of the `printAsJson` function, the Kotlin compiler generates the following signature:

```java
public static final <T> String printAsJson(JsonScope<T> jsonScope, Logger logger, List<T> objs)
```

Context receivers are also available at the class level. For example, imagine we want to define a `Jobs` algebra, or module, that provides a set of functions to retrieve and persist the `Job` type. We can define it as follows:

```kotlin
interface Jobs {
    suspend fun findById(id: JobId): Job?
}
```

A possible implementation would need to produce some logging during the execution of its methods. To be sure an instance of the `Logger` interface is available, we can implement the `Jobs` interface as follows:

```kotlin
context (Logger)
class LiveJobs : Jobs {
    override suspend fun findById(id: JobId): Job? {
        info("Searching job with id $id")
        return JOBS_DATABASE[id]
    }
}
```

As we can see, we declared the `Logger` context at the class level. In this way, we can access the `info` method of the `Logger` interface from any `LiveJobs` implementation methods. To instantiate the `LiveJobs` class, we can use the `with` function as usual:

```kotlin
fun main() {
    with(consoleLogger) {
        val jobs = LiveJobs()
    }
}
```

The above code opens an interesting question: should we use context receivers to implement an idiomatic form of dependency injection?

## 4. What Are Context Receivers Suitable For?

Now that we understand the basics of context receivers, we can ask ourselves: what are they suitable for? In the previous section, we already saw how to use them to implement type classes. However, the last example we made using them at the `class` definition level seems to fit quite well with the concept of dependency injection.

Let's try to understand if context receivers are suitable for dependency injection with an example. Let's say we have a `JobsController` class that exposes jobs as JSON and uses a `Jobs` module to retrieve them. We can define it as follows:

```kotlin
context (Jobs, JsonScope<Job>, Logger)
class JobController {
    suspend fun findJobById(id: String): String {
        info("Searching job with id $id")
        val jobId = JobId(id.toLong())
        return findById(jobId)?.let {
            info("Job with id $id found")
            return it.toJson()
        } ?: "No job found with id $id"
    }
}
```

We must provide the three required contexts to use the `JobController` class. We can do it using the `with` scope function, as we previously did:

```kotlin
suspend fun main() {
    with(jobJsonScope) {
        with(consoleLogger) {
            with(LiveJobs()) {
                JobController().findJobById("1").also(::println)
            }
        }
    }
}
```

We can see that the `JobController` class has three context receivers: `Jobs`, `JsonScope<Job>`, and `Logger`. Inside the `findJobById` method, the contexts are accessed without specification. The `info` method and the `findById` function are called as part of the `JobController` class.

The above code makes it unclear which method belongs to which class. Who owns the function `findById` or the function `info`? In general, **implicit function resolution is harder to read and understand** and, thus, to maintain. Moreover, we can't avoid name clashes when using multiple contexts.

We can change and make it more explicit by using the `@` notation to access the context receivers. For example, we can rewrite the `findJobById` method as follows:

```kotlin
context (Jobs, JsonScope<Job>, Logger)
class JobController {
    suspend fun findJobById(id: String): String {
        this@Logger.info("Searching job with id $id")
        val jobId = JobId(id.toLong())
        return this@Jobs.findById(jobId)?.let {
            this@Logger.info("Job with id $id found")
            return it.toJson()
        } ?: "No job found with id $id"
    }
}
```

However, the notation is very verbose and makes the code less readable. Moreover, we must ensure that a developer uses it.

In Scala, we had a very close problem with the [Tagless Final encoding](https://blog.rockthejvm.com/tagless-final/) pattern.

> If you don't know Scala or Tagless Final, just skip the Scala code - it's a small comparison.

In the past, many Scala developers started to use the pattern to implement dependency injection. Using a similar approach to context receivers, Scala allows us to define type constraints in the type parameters definition. The `JobController` class would look like the following in Scala:

```scala
class JobController[F[_]: Monad: Jobs: JsonScope: Logger]: F[String] {
    def findJobById(id: String): F[String] = {
        Logger[F].info(s"Searching job with id $id") *>
        Jobs[F].findById(JobId(id.toLong)).flatMap {
            case Some(job) =>
                Logger[F].info(s"Job with id $id found") *>
                job.toJson.pure[F]
            case None =>
                s"No job found with id $id".pure[F]
        }
    }
}
```

If you need to get more familiar with monads and higher-kinded types in Scala, don't worry. With the syntax `JobController[F[_]: Monad...`, we're just saying that the `JobController` class performs some I/O, and we want to be able to describe such operations and chain them without effectively executing them. It's the same reason we added the `suspend` keyword to the `findJobById` method in the Kotlin example.

The rest of the type constraints define the contexts we need to perform the I/O operations. Then, the Scala compiler tries to implicitly resolve the contexts every time it finds a `Jobs[F]` or a `Logger[F]` in the code (Kotlin still doesn't implement the automatic resolution of implicit contexts). It's called summoned value pattern, and it's implemented by a code similar to the following:

```scala
object Jobs {
  def apply[F[_]](implicit jobs: Jobs[F]): Jobs[F] = jobs
}
```

Anyway, in Scala, the above approach is considered an anti-pattern. In fact, while the `Monad[F]` and  `JsonScope[F]` are type classes and then represent classes that have a coherent behavior among their concrete implementations, the `Jobs[F]` and `Logger[F]` are not. So, we're mixing apples with oranges.

In general, **business logic algebras should always be passed explicitly.**

We can make an exception for common effects that would be shared by many of the services of our application, such as the `Logger` context in our example. This way, we can avoid pollution of the constructor's signatures with the `Logger` context everywhere.

Summing up, our `JobController` class should be rewritten as follows:

```kotlin
context (JsonScope<Job>, Logger)
class JobController(private val jobs: Jobs) {
    suspend fun findJobById(id: String): String {
        info("Searching job with id $id")
        val jobId = JobId(id.toLong())
        return jobs.findById(jobId)?.let {
            info("Job with id $id found")
            return it.toJson()
        } ?: "No job found with id $id"
    }
}
```

As we can see, the code it's easier to read. The responsibilities of each method call are clear and explicit.

So, although it's possible to implement dependency injection through context receivers, the final solution has a lot of concerns and should be avoided.

The final use case for context receivers is to help with typed errors. In fact, the newer version of the Arrow library uses context receivers to implement an intelligent mechanism to handle typed errors when using functional error handling. However, we'll see this in the next series article, "Functional Error Handling in Kotlin". You can find the first two parts of the series [here](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/) and [here](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/).

## 5. Conclusion

It's time we sum up what we saw. In this article, we introduced the experimental feature of context receivers in Kotlin. First, we saw the problem it addresses using the use case of type classes, and we first implemented it through extension functions and dispatcher receivers. Then, we saw how context receivers could improve the solution. Finally, we focused on the strengths and weaknesses of context receivers, and we proved that there are better solutions for dependency injection.

In the next article, we will see how context receivers can help us handle typed errors functionally and how they'll be used in the next version of the Arrow library.

If you felt that this article was too complex and need to ramp up on Kotlin quickly, do check out the complete [Kotlin Essentials course](https://rockthejvm.com/p/kotlin-essentials).

## 6. Appendix: Gradle Configuration

As promised, here is the Gradle configuration we used to compile the code in this article. Please, remember to set up your project using the `gradle init` command.

```kotlin
plugins {
    // Apply the org.jetbrains.kotlin.jvm Plugin to add support for Kotlin.
    id("org.jetbrains.kotlin.jvm") version "1.8.22"

    // Apply the application plugin to add support for building a CLI application in Java.
    application
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    // Use the Kotlin JUnit 5 integration.
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")

    // Use the JUnit 5 integration.
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.9.1")
}

// Apply a specific Java toolchain to ease working on different environments.
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(19))
    }
}

application {
    // Define the main class for the application.
    mainClass.set("in.rcard.context.receivers.AppKt")
}

tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}
tasks.withType<KotlinCompile>().configureEach {
    kotlinOptions {
        freeCompilerArgs = freeCompilerArgs + "-Xcontext-receivers"
    }
}
```
