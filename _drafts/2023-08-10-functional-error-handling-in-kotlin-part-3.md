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

TODO

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