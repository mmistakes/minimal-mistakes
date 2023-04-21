---
title: "Functional Error Handling in Kotlin"
date: 2023-04-15
header:
image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: "A functional approach to error handling in Kotlin"
---

The Kotlin language is a multi-paradigm, general-purpose programming language. Whether we develop using an object-oriented approach, or a functional one, we always have the problem of handling errors. Kotlin offers a lot of different approaches to handle errors, but in this article, we will focus on the functional approaches, introducing also the `arrow-kt` library. So, without further ado, let's get started.

## 1. Setup

As usual, let's first create the setup we'll use through all the article. We'll use the last version of Kotlin available at the moment of writing, version 1.8.10. 

As we said, we're gonna use the [Arrow](https://arrow-kt.io/) libraries. Arrow adds functional types to the Kotlin standard library. In details, we'll use the [core](https://arrow-kt.io/docs/core/) library. Here, it is the dependency we need:

```xml
<dependency>
    <groupId>io.arrow-kt</groupId>
    <artifactId>arrow-core</artifactId>
    <version>1.1.5</version>
    <type>pom</type>
</dependency>
```

As you may guess, we'll use Maven to build the project. At the end of the article, you'll find the complete `pom.xml` file.

## 2. Why Exception Handling is not Functional

First, we need to understand what's wrong with the traditional approach to error handling, which is based on exceptions. We need some context to understand the problem.

For sake of this examples, imagine we want to create an application that manages a jobs board. First, we need a simplified model of a job:

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

Then, we can simulate a database of jobs using a `Map<JobId, Job>`:

```kotlin
val JOBS_DATABASE: Map<JobId, Job> = mapOf(
    JobId(1) to Job(
        JobId(2),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ),
    JobId(2) to Job(
        JobId(3),
        Company("Microsoft"),
        Role("Software Engineer"),
        Salary(80_000.00),
    ),
    JobId(3) to Job(
        JobId(4),
        Company("Google"),
        Role("Software Engineer"),
        Salary(90_000.00),
    ),
)
```

We can use a dedicated module to retrieve the jobs information. As a first operation, we want to retrieve a job by its id:

```kotlin
interface Jobs {
    fun findById(id: JobId): Job
}
```

Let's start with a trivial implementation of the `Jobs` interface:

```kotlin
class LiveJobs : Jobs {
    override fun findById(id: JobId): Job {
        val maybeJob: Job? = JOBS_DATABASE[id]
        if (maybeJob != null) {
            return maybeJob
        } else {
            throw NoSuchElementException("Job not found")
        }
    }
}
```

For this first implementation, we decided to throw a `NoSuchElementException` when the job is not found.

Now that we have our `Jobs` module, we can use it in a program. Let's say we want to retrieve the salary associated to a particular job. The program is very easy, but it's enough to show the problem:

```kotlin
class JobsService(private val jobs: Jobs) {
    fun retrieveSalary(id: JobId): Double {
        val job = jobs.findById(id)
        return try {
            job.salary.value
        } catch (e: Exception) {
            0.0
        }
    }
}
```

Now, let's see what happens when we run the program for a job that doesn't exist:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val jobsService = JobsService(jobs)
    val jobId: Long = 42
    val salary = jobsService.retrieveSalary(JobId(jobId))
    println("The salary of the job $jobId is $salary")
}
```

As expected the program crashes with the following exception:

```text
Exception in thread "main" java.util.NoSuchElementException: Job not found
	at in.rcard.exception.LiveJobs.findById-aQvFPlM(ExceptionErrorHandling.kt:17)
	at in.rcard.exception.JobsService.retrieveSalary-aQvFPlM(ExceptionErrorHandling.kt:24)
	at in.rcard.MainKt.main(Main.kt:12)
	at in.rcard.MainKt.main(Main.kt)
```

Fair enough. The exception is thrown outside the `try-catch` block, and it bubbles up to the main method. 

One of the main principle functional programming is referential transparency, which states that a function should always return the same result when called with the same arguments. In other words, a function should not have any side effects. One of the corollary of this principle is that an expression can be replaced with its value without changing the program's behavior. 

Let's try it on our program. If we substitute the `jobs.findById(42)` expression to the `job` variable in the `retrieveSalary`method, we get the following code:

```kotlin
fun retrieveSalary(id: JobId): Double {
    val job: Job = throw NoSuchElementException("Job not found")
    return try {
        job.salary.value
    } catch (e: Exception) {
        0.0
    }
}
```

As expected, we obtained a program that crashes with the same exception. However, if we move the retrieval of the job inside the `try-catch` block, we get the following code:

```kotlin
fun retrieveSalary(id: JobId): Double {
    return try {
        val job = jobs.findById(id)
        job.salary.value
    } catch (e: Exception) {
        0.0
    }
}
```

If we execute this code in our program, we clearly obtain a different result than the previous execution. In fact, the exception is now caught by the `try-catch` block, and the program generates the following output.

```text
The salary of the job 42 is 0.0
```

We've just proof that exceptions don't follow the substitution principle. In other words, exceptions are not referentially transparent, and, for this reason, are considered a side effect. In other words, expressions throwing exceptions can't be reasoned about without a context of execution, aka the code around the expression. So, when we use expression, we also lose the locality of reasoning, and add a lot of cognitive load to understand the code.

However, there is one more aspect we don't like about exceptions. Let's take the signature of the `retrieveSalary` method:

```kotlin
fun retrieveSalary(id: JobId): Double
```

We expect the method to take a job id as input, and return a salary as a `Double`. No reference to the exception is present in the signature. As developers, we want that the compilers help us to avoid errors. However, in this case, we're not aware that the method can throw an exception, and the compiler can not help us in any way. The only place where we become aware of the exception is during runtime execution, which is a bit late.

Somebody can say that the JVM also has checked exceptions, and that we can use them to avoid the problem. In fact, if a method declares to throw a checked exception, the compiler will force us to handle it. However, checked exceptions don't work well with higher-order functions, which are a fundamental part of functional programming. In fact, if we want to use a higher-order function together with checked exception, we need to declare the exception in the signature of the lambda function, which is not feasible. Take the `map` function of any collection type:

```kotlin
fun <A, B> map(list: List<A>, f: (A) -> B): List<B>
```

As we might guess, it's impossible to use checked exceptions for the function `f`, since it must to stay generic. The only possible way is to add some very generic exception to the signature of the function, such as a `RuntimeException` or an `Exception`, which is not very useful.

So, we understood that we need a better approach to handle errors, at least in functional programming. Let's see how we can do it.

## 3. Handling Errors with Nullable Types

If we're not interested in the cause of the error, we can model the fact that an operation failed by returning a `null` value. In other languages returning a `null` is not considered a best practice. However, in Kotlin, the null check is built-in the language, and the compiler can help us to avoid errors. In Kotlin, we have nullable types. A nullable type is a type that can be either a value of the type or `null`. For example, the type `String?` is a nullable type, and it can be either a `String` or `null`.

When we work with nullable types, the compiler forces us to handle the case when the value is `null`. For example, let's change our main example trying to handle error using nullable types. First, we redefined the `Jobs` interface and its implementation to use nullable types:

```kotlin
interface Jobs {
    fun findById(id: JobId): Job?
}

class LiveJobs : Jobs {
    override fun findById(id: JobId): Job? = try {
        JOBS_DATABASE[id]
    } catch (e: Exception) {
        null
    }
}
```

As we said, using nullable types to handle failures means losing completely the cause of the error, which is not propagated in any way to the caller.

Then, we change also the `JobsService`, and we try to use the dereference operator `.` to access directly the `salary` property of the `Job?` object:

```kotlin
class JobsService(private val jobs: Jobs) {
    fun retrieveSalary(id: JobId): Double =
        jobs.findById(id).salary.value
}
```

If we try to compile the code, we get the following error:

```text
Compilation failure
[ERROR] /functional-error-handling-in-kotlin/src/main/kotlin/in/rcard/nullable/NullableTypeErrorHandling.kt:[21,26] Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type Job?
```

The compiler is warning us that we forgot to handle the case in which the list is `null`. As we can see, the compiler is helping us to avoid errors. Let's fix the code:

```kotlin
fun retrieveSalary(id: JobId): Double =
    jobs.findById(id)?.salary?.value ?: 0.0
```

Here, we used the `?.` operator, which allows to call a method on a nullable object only if it's not `null`. If we have a chain of method calls, we must use the `?.` operator for every method call. Finally, we use the "elvis" operator, `?:`, as a fallback value, in case the job is `null`.

At first glance, using nullable value seems to be less composable than using, for example, the Java `Optional` type. This last type has a lot of functions, `map`, `flatMap`, or `filter`, which make it easy to compose and chain operations.

Well, Kotlin nullable types have nothing to envy to the Java `Optional` type. In fact, the Kotlin standard library provides a lot of functions to handle nullable types. For example, the `Optional.map` function is equivalent to using the `let` scoping function. 

To build an example, let's say that the salary of our jobs is in USD, and we want to convert it to EUR. We need a new service to do that:

```kotlin
class CurrencyConverter {
    fun convertUsdToEur(value: Double): Double = value * 0.91
}
```

We can pass the new service to the `JobsService` and use it to get the salary in EUR for a job:

```kotlin
class JobsService(private val jobs: Jobs, private val converter: CurrencyConverter) {
    
    // Omissis...
    fun retrieveSalaryInEur(id: JobId): Double =
        jobs.findById(id)?.let { converter.convertUsdToEur(it.salary.value) } ?: 0.0
}
```

As we can see, mixing up the `let` function with the `?.` operator, we can easily map a nullable value. In a similar way, we can simulate the `filter` function on a nullable value. In this case, we'll use the `?.` operator and the `takeIf` function. So, let's add a new function to our service that returns if a job is an Apple job:

```kotlin
fun isAppleJob(id: JobId): Boolean =
    jobs.findById(id)?.takeIf { it.company.name == "Apple" } != null
```

As we can see, we used the `takeIf` in association with the `?.` operator to filter the nullable value. The `takeIf` receives as parameter a lambda with receiver, where the receiver is the original type (not the nullable type). 

Now, we can change the `main` method to use the new function:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val currencyConverter = CurrencyConverter()
    val jobsService = JobsService(jobs, currencyConverter)
    val appleJobId = JobId(1)
    val isAppleJob = jobsService.isAppleJob(appleJobId)
    println("Q: Is the job with id $appleJobId an Apple job?\nA: $isAppleJob")
}
```
If we run the program, we get the expected output:

```text
Q: Is the job with id JobId(value=1) an Apple job?
A: false
```

Despite the fact that the `?.` operator and the `let` function are extremely powerful, it's quite easy to end with a code that has a lot of nested calls. For example, let's create a function in out service that returns the sum of the salaries of two jobs:

```kotlin
fun sumSalaries(jobId1: JobId, jobId2: JobId): Double? {
    val maybeJob1: Job? = jobs.findById(jobId1)
    val maybeJob2: Job? = jobs.findById(jobId2)
    return maybeJob1?.let { job1 ->
        maybeJob2?.let { job2 ->
            job1.salary.value + job2.salary.value
        }
    }
}
```

To overcome the above problem, we can use some sweet functionalities provided by the Kotlin Arrow library. In the set-up section, we already imported the dependency from Arrow, so we can use it in our code.

The Arrow library provides a lot of functional programming constructs. In detail, it provides some form of monadic list-comprehension (in Scala, it's called _for-comprehension_) that allows us to write functional code in a more imperative and declarative way and avoid the nested calls.

For nullable type, Arrow offers the `nullable` DSL. Inside the DSL, we have access to some useful functions, such as the `ensureNotNull` function and the `bind` extension function. Let's rewrite the `sumSalaries` function using the `nullable` DSL, and then we'll analyze the code:

```kotlin
fun sumSalaries2(jobId1: JobId, jobId2: JobId): Double? = nullable.eager {
    val job1: Job = jobs.findById(jobId1).bind()
    val job2: Job = ensureNotNull(jobs.findById(jobId2))
    job1.salary.value + job2.salary.value
}
```

As we can see, the two functions extract the value from the nullable type. If the value is `null`, then the `nullable.eager` block returns `null` immediately. Here, we use the `eager` function, which accepts a not suspendable function. If we want to use a suspendable function, we can use the `nullable` DSL directly.

Clearly, giving two existing jobs to the `sumSalaries` and to the `sumSalaries2`functions we get the same result. We changed the `main` function to call both the functions: 

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val currencyConverter = CurrencyConverter()
    val jobsService = JobsService(jobs, currencyConverter)
    val salarySum1 = jobsService.sumSalaries(JobId(1), JobId(2))
    val salarySum2 = jobsService.sumSalaries2(JobId(1), JobId(2))
    println("The sum of the salaries using 'sumSalaries' is $salarySum1")
    println("The sum of the salaries using 'sumSalaries2' is $salarySum2")
}
```

The output of the program is the expected one:

```text
The sum of the salaries using 'sumSalaries' is 150000.0
The sum of the salaries using 'sumSalaries2' is 150000.0
```

If we pass a job id that doesn't exist, we get the expected result from both the functions:

```text
The sum of the salaries using 'sumSalaries' is null
The sum of the salaries using 'sumSalaries2' is null
```

Both the `nullable` and the `nullable.eager` DSL have a scope as receiver, respectively a `arrow.core.continuations.NullableEagerEffectScope`and a `arrow.core.continuations.NullableEffectScope`. The library defines the `ensureNotNull` and the `bind` extension functions on these scopes. To be fair, the `bind` function is just a wrapper to the same function defined in the `Optional` type that we'll see it in the next section.

Although nullable types offer a good degree of compositionality and a full support by the Kotlin language itself, there are some use cases when you can't use it to handle errors. There are some domains where the `null` value is a valid value, and we can't use it to represent an error. Other times, we need to work with some external libraries that don't support nullable types, such as RxJava or the project Reactor.

Fortunately, Kotlin and the Arrow library provide a lot of alternatives to handle errors in a functional way. Let's start with the `Option` type.

## 4. Handling Errors with `Option`

Unlike Java, Kotlin doesn't provide a type for handling optional values. As we saw in the previous section, Kotlin creators preferred to introduce nullable values instead of having an `Option<T>` type. 

We can add optional types to the language using the `Arrow` library, which provides a lot of functional programming constructs, including an `Option` type.

The type defined by the Arrow library to manage optional values is defined as `arrow.core.Option<out A>`. Basically, it's a [Algebraic Data Type (ADT)](https://blog.rockthejvm.com/algebraic-data-types/), technically a sum type, which can be either `Some<A>` or `None`.

The `Some<A>` type represents a value of type `A`, while the `None` type represents the absence of a value. In other words, `Option` is a type that can either contain a value or not.

In Arrow, we can create an `Option` value using directly the available constructors:

```kotlin
val awsJob: Some<Job> =
    Some(
        Job(
            JobId(1),
            Company("AWS"),
            Role("Software Engineer"),
            Salary(100_000.00),
        ),
    )
val noJob: None = None
```

The library also provides some useful extension functions to create `Option` values:

```kotlin
val appleJob: Option<Job> =
    Job(
        JobId(2),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ).some()
val noAppleJob: Option<Job> = none()
```

Be careful: Invoking the `some()` function on a `null` value will return a `Some(null)`. If you want to create an `Option` value from a nullable value, you should use the `Option.fromNullable` function:

```kotlin
val microsoftJob: Job? =
    Job(
        JobId(3),
        Company("Microsoft"),
        Role("Software Engineer"),
        Salary(80_000.00)
    )
val maybeMsJob: Option<Job> = Option.fromNullable(microsoftJob)
val noMsJob: Option<Job> = Option.fromNullable(null) // noMsJob is None
```

Instead, to convert a nullable value to an `Option` value, we can also use the `toOption()` extension function:

```kotlin
val googleJob: Option<Job> =
    Job(
        JobId(4),
        Company("Google"),
        Role("Software Engineer"),
        Salary(90_000.00),
    ).toOption()
val noGoogleJob: Option<Job> = null.toOption() // noGoogleJob is None
```

Now that we know how to create an `Option` value, let's see how we can use it. First of all, we create the version of the `Jobs` module that uses the `Option` type:

```kotlin
interface Jobs {

    fun findById(id: JobId): Option<Job>
}

class LiveJobs : Jobs {
    
    override fun findById(id: JobId): Option<Job> = try {
        JOBS_DATABASE[id].toOption()
    } catch (e: Exception) {
        none()
    }
}
```

Again, we're not interested in the cause of the error, we just want to handle it. If the `findById` function fails, we return a `None` value. As you may guess, the `Option` type is defined as a sealed class, so we can use the `when` expression to handle the two possible cases. We can define a function that prints the job information of a job id if it exists:

```kotlin
class JobsService(private val jobs: Jobs) {

    fun printOptionJob(jobId: JobId) {
        val maybeJob: Option<Job> = jobs.findById(jobId)
        when (maybeJob) {
            is Some -> println("Job found: ${maybeJob.value}")
            is None -> println("Job not found for id $jobId")
        }
    }
}
```

In this case, we can call the `value` property of the `Some` type to get the actual value because Kotlin is smart casting the original `maybeJob` value to the `Some` type.

If we call the above function with the id of a job present in the database, aka `JobId(1)`, we get the expected output:

```text
Job found: Job(id=JobId(value=2), company=Company(name=Apple, Inc.), role=Role(name=Software Engineer), salary=Salary(value=70000.0))
```

However, if we use a job id that is not associated with any job, we get the following output:

```text
Job not found for id JobId(value=42)
```

However, working the pattern matching is not always very convenient. A lot of time, we need to transform and combine different `Option` values. As it happens in Scala, the `Option` type is a [monad](https://blog.rockthejvm.com/monads/), so we can use the `map`, `flatMap` function to transform and combine `Option` values. Let's see and example.

Imagine we want to create a function that, given a job id, it returns the gap between the job salary and the maximum salary for the same company. If the job doesn't exist, we want to return `None`. To implement such function, first, we need to add a `findAll` method to our `Jobs` interface:

```kotlin
interface Jobs {

    // Omissis...
    fun findAll(): List<Job>
}

class LiveJobs : Jobs {
    
    // Omissis...
    override fun findAll(): List<Job> = JOBS_DATABASE.values.toList()
}
```

Then, we can implement a first version of the function calculating the salary gap using directly `map` and `flatMap` functions:

```kotlin
class JobsService(private val jobs: Jobs) {

    fun getSalaryGapWithMax(jobId: JobId): Option<Double> {
        val maybeJob: Option<Job> = jobs.findById(jobId)
        val maybeMaxSalary: Option<Salary> =
            jobs.findAll().maxBy { it.salary.value }.toOption().map { it.salary }
        return maybeJob.flatMap { job ->
            maybeMaxSalary.map { maxSalary ->
                maxSalary.value - job.salary.value
            }
        }
    }
}
```

We can check that everything is working invoking the `getSalaryGapWithMax` in out `main` function:

```kotlin
fun main() {
    val jobs: Jobs = LiveJobs()
    val jobsService = JobsService(jobs)
    val appleJobId = JobId(1)
    val salaryGap: Option<Double> = jobsService.getSalaryGapWithMax(appleJobId)
    println("The salary gap between $appleJobId and the max salary is ${salaryGap.getOrElse { 0.0 }}")
}
```

If we run the above code, we get the expected following output:

```text
The salary gap between JobId(value=1) and the max salary is 20000.0
```

As we said, the Kotlin language does not support the _for-comprehension_ syntax, so the sequences of nested calls to `flatMap` and `map` functions repeatedly can be a bit confusing. Again, the Arrow library gives us an help, defining a `option` DSL to calling functions on `Option` values in a more readable way. 

The `option` DSL is very similar to the `nullable` DSL, but it works on the `Option` type, instead. As for the `nullable` counterpart, we have two flavors of the DSL. The one accepting a suspendable lambda with receiver, called simply `option`, and the once accepting a non-suspendable lambda with receiver, called `option.eager`. The receiver of the former DSL is a `arrow.core.continuations.OptionEffectScope`, whereas the latter DSL accepts a `arrow.core.continuations.OptionEagerEffectScope`.

Let's change the above function to use the `option` DSL:

```kotlin
fun getSalaryGapWithMax2(jobId: JobId): Option<Double> = option.eager {
    val job: Job = jobs.findById(jobId).bind()
    val maxSalaryJob: Job = jobs.findAll().maxBy { it.salary.value }.toOption().bind()
    maxSalaryJob.salary.value - job.salary.value
}
```

Again, inside the DSL, the `bind` function is available. If you remember from the previous section, the  `bind` function is defined as an extension function of the `Option` type, and it extracts the value from the `Option` if it is a `Some` value, otherwise it eagerly returns `None` to the whole DSL.

In addition, the `option` DSL integrates also with nullable types through the `ensureNotNull` function. In this case, the function extracts the value from a nullable type if present, otherwise it collapses the execution of the whole lambda in input to the `option` DSL, returning the `None` value. The, we can rewrite the above example as follows:

```kotlin
fun getSalaryGapWithMax3(jobId: JobId): Option<Double> = option.eager {
    val job: Job = jobs.findById(jobId).bind()
    val maxSalaryJob: Job = ensureNotNull(
            jobs.findAll().maxBy { it.salary.value },
    )
    maxSalaryJob.salary.value - job.salary.value
}
```

Last but not least, the `nullable` DSL we've seen in the previous section integrates smoothly with the `Option` type. In this case, the `bind` function called on an `None` type will eagerly end the whole block returning a `null` value:

```kotlin
fun getSalaryGapWithMax4(jobId: JobId): Double? = nullable.eager {
    val job: Job = jobs.findById(jobId).bind()
    val maxSalaryJob: Job = ensureNotNull(
        jobs.findAll().maxBy { it.salary.value },
    )
    maxSalaryJob.salary.value - job.salary.value
}
```