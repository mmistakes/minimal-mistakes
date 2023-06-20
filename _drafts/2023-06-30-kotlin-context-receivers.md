---
title: "Kotlin from the Future: Context Receivers"
date: 2023-06-30
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: ""
---

This article will explore a powerful feature of the Kotlin programming language called context receivers. If you're a Kotlin developer looking to write cleaner and more expressive code, context receivers are a tool you'll definitely want in your toolbox.

In Kotlin, context receivers provide a convenient way to access functions and properties of multiple receivers within a specific scope. Whether you're working with interfaces, classes, or type classes, context receivers allow you to streamline your code and enhance its maintainability.

We'll take a deep dive into context receivers, starting with their purpose and benefits. We'll explore practical examples and demonstrate how context receivers can make your Kotlin code more expressive and efficient. So let's get started and unlock the full potential of context receivers in Kotlin!

## 1. Setup

To start harnessing the power of context receivers in your Kotlin project, let's go through the setup steps. We'll be using Gradle with the Kotlin DSL and enabling the context receivers compiling option. Make sure you have Kotlin version 1.8.22 or later installed before proceeding.

We'll use nothing more than the Kotlin standard library this time on top of Java 19. At the end of the article, we'll provide the complete `build.gradle.kts` file for your reference.

If you want to try generating the project you own, just type `gradle init` on a command line, and answer to the questions you'll be asked.

Context receivers are still an experimental feature. Hence, they're not enabled by default. To enable the context receivers compiling option, we need to modify the Gradle configuration. Add the `kotlinOptions` block within the `tasks.withType<KotlinCompile>` block in your `build.gradle.kts` file:

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

In the above code snippet, we have a `Job` data class that represents a job posting. Each `Job` has an `id`, `company`, `role`, and `salary`. The `JobId`, `Company`, `Role`, and `Salary` are inline classes that wrap primitive types to provide type safety and semantic meaning to the data.

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

Now that we have our domain objects set up, let's dive into how context receivers can simplify our code and make our job search application more efficient.

## 2. Dispatchers and Receivers

To better introduce the context receivers feature, we need an example to work with. Let's consider function that needs to print the JSON representation of a list of jobs. We'll call this function `printAsJson`:

```kotlin
fun printAsJson(objs: List<Job>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
```

If we try to compile this code, we'll get an error, since there is not `toJson` function defined on the `Job` class:

```
Unresolved reference: toJson
```

Since we don't want to pollute our domain model, we implement the `toJson` extension function for `Job` domain object.

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

In Kotlin, we call the `Job` type the _receiver_ of the `toJson` function. The receiver is the object on which the extension function is invoked and that is available in the function body as `this`.

So far so good. We can now compile our code and print the JSON representation of a list of jobs:

```kotlin
fun main() {
    JOBS_DATABASE.values.toList().let(::printAsJson)
}
```

Now, we recognize the value of having a function that prints list of objects as JSON. We want to reuse this function in other parts of our application. However, we don't want to limit ourselves to printing only jobs as JSON. We want to be able to print any list of objects as JSON. So we decide to make the `printAsJson` function generic:

```kotlin
fun <T> printAsJson(objs: List<T>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
```

However, we return to the original problem. We still don't have a `toJson` function defined on the `T` type. Moreover, we don't want to change the `Job` or any other type adding the implementation from some weird interface that adds the `toJson()` methods. For example, we could not have access to the code of the class to modify it.

So, we want to execute our new parametric version of the `printAsJson` only in a scope where we know for sure there exist a `toJson` function defined on the `T` type. Let's start building all the pieces we need to achieve this goal.

First, we need to define the safe scope. We start implementing it as an interface that defines the `toJson` function:

```kotlin
interface JsonScope<T> {
    fun T.toJson(): String
}
```

Here, we introduced another characteristics of extension functions. In Kotlin, we call the `JsonScope<T>` the dispatcher receiver of the `toJson` function. In this way, we limit the visibility of the `toJson` function allowing to call it only inside the scope. We say that the `toJson` function is a context-dependent construct.

We can access the dispatcher receiver in the function body as `this`. As we might guess, Kotlin represents the `this` reference as a union type of the dispatcher receiver and the receiver of the extension function. 

```kotlin
interface JsonScope<T> {    // <- dispatcher receiver
    fun T.toJson(): String  // <- extension function receiver
    // 'this' type in 'toJson' function is JsonScope<T> & T
}
```

The `JsonScope<T>` is a safe place where we can call the `printAsJson` function since we know for sure we have access to a concrete implementation of the `toJson` function. Then, we define the `printAsJson` function as an extension function on the `JsonScope` interface:

```kotlin
fun <T> JsonScope<T>.printAsJson(objs: List<T>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
```

The last part is to define the `JsonScope` implementation for the `Job` type. We can implement it as an anonymous object:

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

The last ring of the chain is to call the `printAsJson` function in the safe scope of the `jobJsonScope`. How can we do that? We can use one of the available scope functions in Kotlin. Usually, the `with` function is the preferred in such situations. This function takes a receiver and a lambda as arguments, and it executes the lambda in the scope of the receiver. In this way, we can call the `printAsJson` function in the safe scope of the `jobJsonScope`:

```kotlin
fun main() {
    with(jobJsonScope) {
        println(printAsJson(JOBS_DATABASE.values.toList()))
    }
}
```

Did you feel we already encountered this pattern? Yes, we did. The [Kotlin coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/) heavily rely on the same pattern. All the coroutines builders, a.k.a. `launch`, `async`, are defined as extensions of the `CoroutineScope`, the dispatcher receiver and the safe place where we can call the `suspend` functions.

Moreover, if you have a Scala of Haskell background, you might notice some interesting similarities with the [Type Classes](https://blog.rockthejvm.com/why-are-typeclasses-useful/). In fact, the `JsonScope` interface is a type class, and the `jobJsonScope` is an instance of the `JsonScope` type class for the `Job` type. If we were in Scala, we would have called the `JsonScope` type class as `Jsonable` or something like that.

The differences between Kotlin and Scala/Haskell is that we have not any implicit and automatic mechanism to find the right instance of the type class. In Scala 2, we have the `implicit` classes, and in Scala 3 we have `given` classes. In Kotlin, we still not have any auto-magic mechanism.

## 3. Entering the Future: Context Receivers

The approach we used so far reached the goal. However, it has some limitations. 

The first one is that we add the `printAsJson` method to the `JsonScope` interface. However, the function has nothing to do with the `JsonScope` type. We placed there because it was the only technical possible solution offered. It's somewhat misleading: The `printAsJson` is not a method of the `JsonScope` type!

Second, extension functions are only available on objects, and this is not always that we desire. For example, we don't want our developers to use the `printAsJson` in the following way:

```kotlin
jobJsonScope.printAsJson(JOBS_DATABASE.values.toList())
```

The problem here is that we can't avoid in any way the above usage of our DSL.

Third, using extension functions with scopes we are limited to having only one receiver. For example, let's define a `Logger` interface, and an implementation that logs to the console:

```kotlin
interface Logger {
    fun log(level: Level, message: String)
}

val consoleLogger = object : Logger {
    override fun log(level: Level, message: String) {
        println("[$level] $message")
    }
}
```

If we want to add the capability of logging to our `printAsJson` function, we can't do it, because it's defined on as an extension of the `JsonScope` interface, and we can't add a second receiver to the `printAsJson` function.

To overcome these limitations, we need to introduce a new concept: the context receivers. Introduced as an experimental feature in Kotlin 1.6.20, their aim is to solve the above problems and to provide a more flexible maintainable code.

In detail, context receivers are a way to add a context or a scope to a function, without the need to pass this context as an argument. If we revised how we solved the problem of the `printAsJson` function, we can see that we passed the context as an argument. In fact, the receiver of an extension function is passed to the function as an argument by the JVM once the function is interpreted in bytecode.

Kotlin introduced a new keyword, `context` that allow us to specify the context needed by the function to execute. In our case, we can define a new version of the `printAsJson` function as:

```kotlin
context (JsonScope<T>)
fun <T> printAsJson(objs: List<T>) =
    objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() } 
```

The `context` keyword is followed by the type of the context receiver. The context receivers are available as the `this`reference inside the function body. In our example, we can access the `toJson` extension function defined in the `JsonScope` interface.

How can we bring a `JsonScope` instance into the scope of the `printAsJson` function? We can use the `with` function as we did before: (call-site)

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

Yuppy! We solved the first and the problems. What about having more than one context for our function? Fortunately, we can do it. In fact, the `context` keyword takes an array of types as arguments. For example, we can define a `printAsJson` function that takes a `JsonScope` and a `Logger` as context receivers, and uses the methods of both:

```kotlin
context (JsonScope<T>, Logger)
fun <T> printAsJson(objs: List<T>): String {
    log(Level.INFO, "Serializing $objs list as JSON")
    return objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
} 
```

As we can see, we're using the `log` method of the `Logger` interface.

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
    this.log(Level.INFO, "Serializing $objs list as JSON")
    return objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
}
```

In fact, the compiler complains with the following error:

```
'this' is not defined in this context
```

However, we can access referencing a particular function from a context using the `@` notation, as follows:

```kotlin
context (JsonScope<T>, Logger)
fun <T> printAsJson(objs: List<T>): String {
    this@Logger.log(Level.INFO, "Serializing $objs list as JSON")
    return objs.joinToString(separator = ", ", prefix = "[", postfix = "]") { it.toJson() }
}
```

In this way, we can disambiguate the context we want to use in the case of multiple contexts defining functions with colliding names.

Another interesting thing is that the `context` is part of the function signature. As we saw, we can have more than one function with the same signature with different contexts. How is it possible? The answer is in how the function looks like once it's expanded by the Kotlin compiler. The contexts are explicitly passed as arguments to the compiled function. For example, in the case of our last version of the `printAsJson` function  the Kotlin compiler generates the following signature:

```java
public static final <T> String printAsJson(JsonScope<T> jsonScope, Logger logger, List<T> objs)
```

Context receivers are available also at class level. For example, imagine we want to define a `Jobs` algebra, or module, that provides a set of functions to retrieve and persist the `Job` type. We can define it as follows:

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
        log(Level.INFO, "Searching job with id $id")
        return JOBS_DATABASE[id]
    }
}
```

As we can see, we declared the `Logger` context at class level. In this way, we can access the `log` method of the `Logger` interface from any method of the `LiveJobs` implementation. To instantiate the `LiveJobs` class, we can use the `with` function as usual:

```kotlin
fun main() {
    with(consoleLogger) {
        val jobs = LiveJobs()
    }
}
```

The above code opens to an interesting question: should we use context receivers to implement an idiomatic form of dependency injection?

## 4. What Are Context Receivers Suitable For?

Now that we understand the basics of context receivers, we can ask ourselves: what are they suitable for? In the previous section, we already saw how to use them to implement a form of type classes, or ad-hoc polymorphism. However, the last example we made using them at `class` definition level seems to fit quite well with the concept of dependency injection.

Let's try to understand if context receivers are suitable for dependency injection with an example. Let's say we have a `JobsController` class that exposes jobs as JSON, and uses a `Jobs` module to retrieve them. We can define it as follows:

```kotlin
context (Jobs, JsonScope<Job>, Logger)
class JobController {
    suspend fun findJobById(id: String): String {
        log(Level.INFO, "Searching job with id $id")
        val jobId = JobId(id.toLong())
        return findById(jobId)?.let {
            log(Level.INFO, "Job with id $id found")
            return it.toJson()
        } ?: "No job found with id $id"
    }
}
```

To use the `JobController` class, we need to provide the three contexts it requires. We can do it using the `with` scope function, as we previously did:

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

We can see that the `JobController` class has three context receivers: `Jobs`, `JsonScope<Job>`, and `Logger`. Inside the `findJobById` method, the contexts are accessed without any specification. The `log` method and the `findById` function are called as if they were part of the `JobController` class.