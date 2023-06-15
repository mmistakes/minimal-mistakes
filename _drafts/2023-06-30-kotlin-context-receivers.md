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

## 3. Context Receivers







