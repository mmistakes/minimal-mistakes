---
title: "Type Classes in Kotlin: A Practical Guide"
date: 2024-02-06
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

In this article, we delve into the concept of type classes in Kotlin, a powerful tool that allows developers to abstract logic for different data types. We'll take data validation as an example to show how type classes can be used to write generic and reusable code. Our implementation will be based on the [Arrow Kt](https://arrow-kt.io/) library, which will exploit Kotlin's context receivers. So, without further ado, let's get the party started.

## 1. Setting the Stage

We’ll use version 1.9.22 of Kotlin and version 1.2.1 of the Arrow library. We'll also use [Kotlin's context receivers](https://blog.rockthejvm.com/kotlin-context-receivers/). Context receivers are still an experimental feature. Hence, they’re not enabled by default. We need to modify the Gradle configuration. Add the `kotlinOptions` block within the `tasks.withType<KotlinCompile>` block in your `build.gradle.kts` file:

```kotlin
tasks.withType<KotlinCompile>().configureEach {
    kotlinOptions {
        freeCompilerArgs = freeCompilerArgs + "-Xcontext-receivers"
    }
}
```

As usual, we’ll put a copy of the configuration file we use at the end of the article.

## 2. The Problem

In this article, we'll simulate a system for validating user portfolios in a fintech startup, with minimal features. Data validation is crucial in software development, especially in data transactions like user portfolios. Ensuring data conforms to expected formats and rules is vital for maintaining the system's integrity.

So, first, let's define the data we want to validate. In our case, we want to validate the data contained in some DTOs (Data Transfer Objects). The first DTO represents the creation of a new portfolio:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double)
```

The second DTO represents the purchase or the selling process of a stock for a given portfolio:

```kotlin
data class ChangePortfolioDTO(val stock: String, val quantity: Int)
```

If the `quantity` is positive, the DTO represents a purchase. Otherwise, it represents a sale.

Now, we need a function that uses the above data and validates it. Let's call this function `process`:

```kotlin
fun process(createPortfolioDto: CreatePortfolioDTO) {
    val createPortfolioDto: CreatePortfolioDTO = /* Validate the dto */
    // Do something with the validated object
}

fun process(changePortfolioDto: ChangePortfolioDTO) {
    val changePortfolioDto: ChangePortfolioDTO = /* Validate the dto */
    // Do something with the validated object
}
```

We'll focus on the validation logic in the following sections.

The above code could be more optimal and maintainable. The two `process` functions share the same pattern:

1. Validate the input DTO
2. Do something with the validated object

Currently, it seems we'd need to write a new `process` function for every action type. We can abstract the `process` concept so that we'd only need to write it once. The first step to achieve this is defining a common type to let both DTOs inherit from it. Let's call this type `Validatable`:

```kotlin
sealed interface Validatable {
    data class CreatePortfolioDTO(val userId: String, val amount: Double) : Validatable
    data class ChangePortfolioDTO(val stock: String, val quantity: Int) : Validatable
}
```

In this way, the two `process` functions can be merged into a single one:

```kotlin
fun process(validatable: Validatable) = {
    when (validatable) {
        is Validatable.CreatePortfolioDTO -> /* Validate the dto */
        is Validatable.ChangePortfolioDTO -> /* Validate the dto */
    }
    // Do something with the validated object
}
```

We took advantage of Kotlin's sealed classes and smart cast features here. However, the above code still needs to be optimized. The current `process` function violates the _Open-Closed_principle. This principle states that adding new cases to a feature should not change the existing code but only add a new one. It applies to our situation because, with the current version of the `process` function, we need to change the `when` expression every time we add a new DTO to validate, which is not good since such code tends to be rigid to changes, fragile, and error-prone.

Fortunately, we can abstract the validation process in a dedicated function. Let's change the `Validatable` a bit:

```kotlin
interface Validatable<T> {
    fun validate(): T
}
```

We introduced a type parameter to let the clients work with the concrete DTO type, not an abstract interface.

**Abstracting the behavior in abstract types (or interfaces) and implementing it for concrete kinds**, letting client function stay generic and reusable, is a typical pattern in any modern high-level programming language. This pattern **is called _polymorphism_**.

The method `validate` returns the validated data in case all the validation processes passed. Since we don't want to manage the case the data is not valid through exceptions (see [Functional Error Handling in Kotlin, Part 1: Absent values, Nullables, Options](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/#2-why-exception-handling-is-not-functional) for further details), we'll introduce the `Either` type from the Arrow Kt library (if you need an insight on how to use it, please refer to [Functional Error Handling in Kotlin, Part 2: Result and Either](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/)):

```kotlin
interface ValidationError

interface Validatable<T> {
    fun validate(): EitherNel<ValidationError, T>
}
```

We introduced the `ValidationError` interface to represent the possible validation errors. Moreover, we want to avoid blocking our validation process to the first error we'll find in case of complex types. So, **we need a data structure representing a list of possible errors**. For this reason, we didn't use the `Either` type but the `EitherNel` type, a type alias for `Either<NonEmptyList<E>, A>` in the Arrow Kt library.

```kotlin
// Arrow Kt library
public typealias EitherNel<E, A> = Either<NonEmptyList<E>, A>
```

The `NonEmptyList` type is a data structure in the Arrow library that represents a list of elements guaranteed to be non-empty.

Let's try solving the problem using traditional object-oriented approaches. In the object-oriented approach, each class that needs validation would implement the `Validatable<T>` interface, which might look something like this for the `CreatePortfolioDTO` class:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double) : Validatable<CreatePortfolioDTO> {
    override fun validate(): EitherNel<ValidationError, CreatePortfolioDTO> {
        // validation logic here
    }
}
```

As we can see, **using direct subtyping to implement validation rules forces us to change the code of the type we want to validate**. Initially, this might be fine and is a straightforward solution. We're using polymorphism to solve the problem, which is good. For example, if we have an external function that uses the validation, we can write it once for all the types that implement the `Validatable<T>` interface:

```kotlin
fun <T : Validatable<T>> process(validatable: T) = either {
    val validated: T = validatable.validate().bind()
    // Do something with the validated object
}
```

However, we only sometimes want to change the type to validate using subtyping, and sometimes simply we can't.

Putting the type to validate and the validation process in the same place can decrease the maintainability of the former. For example, the object-oriented approach can break the [Single Responsibility Principle](http://blog.rcard.in/solid/srp/programming/2017/12/31/srp-done-right.html). Indeed, it's only sometimes the case that the behavior (aka, the methods) exposed by the type to validate is used by the same clients as the validation process.

Moreover, the code could be auto-generated by an external tool or part of a library we don't own. A good example is DTOs generated from a protocol buffer, an Avro, or a Swagger (OpenAPI) definition.

## 4. Type Classes: A Solution for Functional Languages

If we can't use subtyping, what other solutions do we have? We don't want to lose the possibility to write polymorphic code, such as one of the `process` functions above.

Fortunately, functional programming comes with a solution for this problem: type classes. **Type classes offer a solution by allowing us to define a set of behaviors (like validation rules) that can be applied to various types without altering them**. This approach is particularly useful in a language like Kotlin, which supports both object-oriented and functional programming paradigms. Let's see how.

First, we must refactor the `Validatable<T>` interface. We'll proceed step by step, so the following version of the interface is far from the final form:

```kotlin
interface Validator<T> {
    fun validate(toValidate: T): EitherNel<ValidationError, T>
}
```

The main difference with the previous version (apart from the name) is that the `validate` method now takes a parameter of type `T` representing the object to validate. Now, we can implement the validation rules as follows for the `CreatePortfolioDTO` type:

```kotlin
val createPortfolioDTOValidator =
    object : Validator<CreatePortfolioDTO> {
        override fun validate(toValidate: CreatePortfolioDTO): EitherNel<ValidationError, CreatePortfolioDTO> {
            // validation logic here
        }
    }
```

At first sight, we decoupled the DTO from the code that validates it.

The `process` function that uses the validation can be rewritten as follows using the new `Validator<T>` interface:

```kotlin
fun <T> process(
    toValidate: T,
    validator: Validator<T>,
) = either {
    val validated: T = validator.validate(toValidate).bind()
    // Do something with the validated object
}
```

The `process` function now takes two parameters: the object to validate and the validator to use. As we can see, **we can still take advantage of polymorphism, but we don't need to bind the validation logic to the type to validate**. This polymorphism is called _ad-hoc polymorphism_, and the `Validator<T>` interface is called a _type class_.

So, **a type class is a parametric type containing a set of behaviors that can be applied to various types without altering them**. In our case, the `Validator<T>` interface defines the behavior of validating a type `T`.

Type classes don't suffer from the cons we saw in the object-oriented approach. In fact, we can define a type class for a type we don't own and multiple type classes for the same type. Moreover, we can better separate concerns since the validation logic is decoupled from the type to validate.

However, also type classes have their cons. First, they are less intuitive than the object-oriented approach. The problem is more significant if a developer has yet to gain experience with functional programming. Second, we have an issue of discoverability. We need to know that a type class exists for a type we want to validate.

We still miss a feature of the object-oriented solution: The `validate` method is not a DTO method. It's not a big problem, but it could be more elegant than the actual solution. Fortunately, we can improve our it in this direction, taking advantage of Kotlin extension functions. Let's do it.

It's time to change the `Validator<T>` interface again:

```kotlin
interface ValidatorScope<T> {
    fun T.validate(): EitherNel<ValidationError, T>
}
```

There are a few changes here. Let's analyze them one by one. First, the `validate` function became an extension method of the generic type `T`. We can call the `validate` function as if it were a method of `T` now. For completeness, **the type `T` is called the receiver of the function and can be accessed using the `this` reference inside the function scope**.

Then, we changed (again!!!) the interface's name, calling it `ValidatorScope<T>`. The name `Scope` is often used in Kotlin libraries. The name refers to a Kotlin-specific pattern called dispatcher receiver. In this way, we limit the visibility of the `validate` extension function, which allows us to call it only inside the scope. We say that the `validate` function is a context-dependent construct.

```kotlin
interface ValidatorScope<T> {                        // <- dispatcher receiver
    fun T.validate(): EitherNel<ValidationError, T>  // <- extension function receiver
    // 'this' type in 'validate' function is ValidatorScope<T> & T
}
```

We can also access the dispatcher receiver in the function body as `this`. **Kotlin can represent the `this` reference as a union type of the dispatcher receiver and the receiver of the extension function**.

For those who follow the RockTheJvm blog, it's not a surprise. We already introduced scopes in [Kotlin Context Receivers: A Comprehensive Guide ](https://blog.rockthejvm.com/kotlin-context-receivers/#2-dispatchers-and-receivers).

The last changes require us to change also the implementation of the validator for the `CreatePortfolioDTO` type:

```kotlin
val createPortfolioDTOValidatorScope = 
    object : ValidatorScope<CreatePortfolioDTO> { 
        override fun CreatePortfolioDTO.validate(): EitherNel<ValidationError, CreatePortfolioDTO> =
            // validation logic here
}
```

Also, the `process` function must be changed. We need to use it to call the `validate` function inside a `ValidatorScope.` The first solution is to make the `process` function an extension function of the `ValidatorScope<T>` interface:

```kotlin
fun <T> ValidatorScope<T>.process(toValidate: T) =
    either {
        val validated: T = toValidate.validate().bind()
        // Do something with the validated object
    }
```

Again, we used the receiver feature of the Kotlin language to access the `ValidatorScope<T>`. The caller of the `process` function has the responsibility to provide the right `ValidatorScope<T>` instance. For example, we can call the `process` function as follows:

```kotlin
fun main() {
    with (createPortfolioDTOValidatorScope) {
        process(CreatePortfolioDTO("userId", 100.0))
    }
}
```

The `with` function is a Kotlin standard library function, part of the scope functions. It takes a receiver and a lambda as parameters. The lambda is executed in the context of the receiver:

```kotlin
// Kotlin starndard library
public inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    // Omissis
    return receiver.block()
}
```

Usually, the `with` function is preferred in such situations instead of the other available scope functions.

The same pattern is used for [Kotlin coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/), where all the coroutine builders, i.e., `launch`, `async,` are extensions of the `CoroutineScope,` which acts as dispatcher receiver.

One open and unresolved point about implementing type classes in Kotlin is that we still need an automatic discovery process. Other languages supporting type classes, such as Scala and Haskell, implement some form of automatic discovery. Scala, for example, has an implicit resolution.

Last but not least, we can also use Kotlin [context receivers](https://blog.rockthejvm.com/kotlin-context-receivers/#2-dispatchers-and-receivers) to declare that a function needs a specific context to be executed. So, we can change the `process` function as follows:

```kotlin
context(ValidatorScope<T>)
fun <T> process(toValidate: T) =
    either {
        val validated: T = toValidate.validate().bind()
        // Do something with the validated object
    }
```

To sum up, **context receivers are a way to add a context or a scope to a function without passing this context as an argument or without using the extension function mechanism**.

What's next? Well, we still need to talk about the validation logic. We'll do it in the next section.

## 5. Expanding the Validation Framework

We introduced the `ValidatorScope<T>` interface in the previous section. We also saw how to use it to validate a DTO. However, we still need to talk about the validation logic. Let's do it now. We can use the type classes approach once again to solve the problem.

First, we need to define the validation rules. We'll start with the `CreatePortfolioDTO` type. We want to validate the `userId` and the `amount` fields. The `userId` field must be a non-empty string, while the `amount` field must be a positive number. Let's define the validation rules as follows:

```kotlin
interface Required<T> {
    fun T.required(): Boolean
}

interface NonEmpty<T> {
    fun T.nonEmpty(): Boolean
}

interface Positive<T : Number> {
    fun T.positive(): Boolean
}
```

As we can see, **the validation rules are generic**. This way, we can apply them to multiple types, exploiting ad-hoc polymorphisms again. And, yup, the above types are type classes. For the `CreatePortfolioDTO`, we need the following implementations:

```kotlin
val nonEmptyString = object : Required<String> {
    override fun String.nonEmpty(): Boolean = this.isNotBlank()
}

val positiveDouble = object : Positive<Double> {
    override fun Double.positive(): Boolean = this > 0.0
}
```

Nothing will stop us from having multiple implementations of the same validation rule for the same type. For example, we can have the following implementation for the `List<String>` and `Int` types:

```kotlin
val nonEmptyList = object : NonEmpty<List<String>> {
    override fun List<String>.nonEmpty(): Boolean = this.isNotEmpty()
}

val positiveInt = object : Positive<Int> {
    override fun Int.positive(): Boolean = this > 0
}
```

We need a type hierarchy implementing the errors that a single validation rule can generate. Let's define the following hierarchy:

```kotlin
sealed interface InvalidFieldError {

    val field: String

    data class MissingFieldError(override val field: String) : InvalidFieldError {
        override fun toString(): String = "Field '$field' is empty"
    }

    data class NegativeFieldError(override val field: String) : InvalidFieldError {
        override fun toString(): String = "Field '$field' must be positive"
    }

    data class ZeroFieldError(override val field: String) : InvalidFieldError {
        override fun toString(): String = "Field '$field' must be non zero"
    }
}
```

The `field` attribute is the name of the property the framework validates. Next, we need some functions that use the validation rules we defined and generate the errors in case the validation fails. Let's define the following functions:

```kotlin
context(Positive<T>)
fun <T : Number> T.positive(fieldName: String): EitherNel<NegativeFieldError, T> =
    if (this.positive()) {
        this.right()
    } else {
        NegativeFieldError(fieldName).left().toEitherNel()
    }

context(NonZero<T>)
fun <T : Number> T.nonZero(fieldName: String): EitherNel<ZeroFieldError, T> =
    if (this.nonZero()) {
        this.right()
    } else {
        ZeroFieldError(fieldName).left().toEitherNel()
    }
```

The above validation functions require a validation rules type class to be available and an extension function on the type `T`. So, in this solution version, **we need to use context receivers, since we can't have more than one receiver for a function**.

The last step is to use our freshly new validation rules to implement the validation logic of our DTO validator. Before proceeding with the implementation, we need to change the definition of the original `ValidationError` slightly by adding a list to accumulate errors oven fields:

```kotlin
data class ValidationError(val fieldErrors: NonEmptyList<InvalidFieldError>)
```

Then, we can finally implement the validation logic for the `CreatePortfolioDTO` type:

```kotlin
val createPortfolioDTOValidator =
    object : ValidationScope<CreatePortfolioDTO> {
        override fun CreatePortfolioDTO.validate(): Either<ValidationError, CreatePortfolioDTO> =
            with(requiredString) {
                with(positiveDouble) {
                    zipOrAccumulate(
                        userId.required("userId"),
                        amount.positive("amount"),
                        ::CreatePortfolioDTO,
                    ).mapLeft(::ValidationError)
                }
            }
    }
```

Here is where we start exploiting the full power of the Arrow library. The `zipOrAccumulate` function takes a variable number of `EitherNel<E, A>` instances and zips their returns in a single `EitherNel` instance. The function is overloaded in the Arrow library to apply to a variable number of inputs. The `zipOrAccumulate` function version with the most significant number of input variables is defined as follows:

```kotlin
// Arrow Kt library
public inline fun <E, A, B, C, D, EE, F, G, H, I, J, Z> zipOrAccumulate(
      a: EitherNel<E, A>,
      b: EitherNel<E, B>,
      c: EitherNel<E, C>,
      d: EitherNel<E, D>,
      e: EitherNel<E, EE>,
      f: EitherNel<E, F>,
      g: EitherNel<E, G>,
      h: EitherNel<E, H>,
      i: EitherNel<E, I>,
      j: EitherNel<E, J>,
      transform: (A, B, C, D, EE, F, G, H, I, J) -> Z,
    ): EitherNel<E, Z> {
      // Omissis...
      return if (a is Right && b is Right && c is Right && d is Right && e is Right && f is Right && g is Right && h is Right && i is Right && j is Right) {
        Right(transform(a.value, b.value, c.value, d.value, e.value, f.value, g.value, h.value, i.value, j.value))
      } else {
        val list = buildList {
          if (a is Left) addAll(a.value)
          if (b is Left) addAll(b.value)
          if (c is Left) addAll(c.value)
          if (d is Left) addAll(d.value)
          if (e is Left) addAll(e.value)
          if (f is Left) addAll(f.value)
          if (g is Left) addAll(g.value)
          if (h is Left) addAll(h.value)
          if (i is Left) addAll(i.value)
          if (j is Left) addAll(j.value)
        }
        Left(NonEmptyList(list[0], list.drop(1)))
      }
    }
```

Many different versions of the function differ in the number of input parameters. The above is the one with the maximum number of parameters. The function takes a list of functions that return a value of type `EitherNel<E, A>`, `EitherNel<E, B>`, `EitherNel<E, C>`, `EitherNel<E, D>`, `EitherNel<E, EE>`, `EitherNel<E, F>`, `EitherNel<E, G>`, `EitherNel<E, H>`, `EitherNel<E, I>`, `EitherNel<E, J>` and a function that takes all the previous contained values and returns a value of type `Z`. Finally, the function `zipOrAccumulate` returns the value of type `EitherNel<E, Z>`; if any error occurs, it raises the list of errors. So, remember: The maximum number of single input parameters is 10. If we need more, we must apply the function recursively multiple times.

In case of the execution of `zipOrAccumulate` will return a `Left<NonEmptyList<InvalidFieldError>>,` we simply map it into a `Left<NonEmptyList<ValidationError>>` containing the whole previous non-empty list.

Now that we have defined the validator for the `CreatePortfolioDTO`, it's time to close the circle in the `process` function. We can do it as follows:

```kotlin
with(createPortfolioDTOValidator) {
    process(CreatePortfolioDTO("userId", 100.0))
}
```

So, if we need to use the `process` function for a different type, defining a new validator is sufficient. For example, we can define the following validator for the `ChangePortfolioDTO` type:

```kotlin
val changePortfolioDTOValidator =
    object : ValidatorScope<ChangePortfolioDTO> {
        override fun ChangePortfolioDTO.validate(): Either<ValidationError, ChangePortfolioDTO> =
            validation {
                with(requiredString) {
                    with(nonZeroInteger) {
                        zipOrAccumulate(
                            stock.required("stock"),
                            quantity.nonZero("quantity"),
                            ::ChangePortfolioDTO,
                        ).mapLeft(::ValidationError)
                    }
                }
            }
    }
```

The invocation of the `process` function changes as follows:

```kotlin
with(changePortfolioDTOValidator) {
    process(ChangePortfolioDTO("stock", 100))
}
```

If we want to extend our framework with new types of validation rules, we can define new type classes and new implementations for them. For example, we can add a policy to check if a number is within a given range:

```kotlin
interface InRange<T : Number> {
    fun T.inRange(min: T, max: T): Boolean
}
```

Then, we can implement it for the `Int`:

```kotlin
val rangeInteger = object : InRange<Int> {
    override fun Int.inRange(min: Int, max: Int): Boolean = this in min..max
}
```

_Et voilà!_

## 6. Conclusions

In conclusion, this article has explored the concept of type classes in Kotlin, demonstrating their utility in abstracting validation logic for different data types. We've seen how type classes can solve ad-hoc polymorphism, allowing us to define a set of behaviors that can be applied to various types without altering the types themselves. This approach is advantageous in languages like Kotlin, which supports object-oriented and functional programming paradigms. We've also delved into using Kotlin's context receivers and extension functions to enhance the elegance and intuitiveness of our code. Furthermore, we've seen how the Arrow library can be leveraged to handle validation errors functionally, avoiding exceptions and enhancing code maintainability.  However, it's important to note that while type classes offer many advantages, they also come with challenges, such as discoverability and the need for a certain level of familiarity with functional programming concepts. Overall, type classes represent a powerful tool in a developer's toolkit, offering a flexible and maintainable approach to handling everyday programming tasks such as data validation.

## 7. Appendix: Gradle Configuration

As promised, here is the Gradle configuration we used to compile the code in this article. Please set up your project using the `gradle init` command.

```kotlin
plugins {
    id("org.jetbrains.kotlin.jvm") version "1.9.22"
    application
}

repositories { .
    mavenCentral()
}

dependencies {
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.9.1")
    implementation("io.arrow-kt:arrow-core:1.2.1")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(19))
    }
}

application {
    mainClass.set("in.rcard.type.classes.AppKt")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile>().configureEach {
    kotlinOptions {
        freeCompilerArgs = freeCompilerArgs + "-Xcontext-receivers"
    }
}
```
