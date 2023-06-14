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

Now that we have our domain objects set up, let's dive into how context receivers can simplify our code and make our job search application more efficient.


