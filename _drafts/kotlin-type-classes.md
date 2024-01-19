---
title: "Type Classes in Kotlin: A Concrete Example of Context Receivers Use"
date: 2024-01-30
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

## 1. Setting the Stage

TODO

## 2. The Problem

In software development, especially in systems dealing with data transactions like user portfolios, data validation is crucial. Ensuring that data conforms to expected formats and rules is vital for maintaining the integrity of the system.

So, first, let's define the data we want to validate. In our case, we want to validate the data contained in some DTOs (Data Transfer Object). The first DTO represents the creation of a new portfolio:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double)
```

The second DTO represents the purchase or the selling process of a stock for a given portfolio:

```kotlin
data class ChangePortfolioDTO(val stock: String, val quantity: Int)
```

If the `quantity` is positive, then the DTO represents a purchase. Otherwise, it represents a selling.

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

We'll focus on the validation logic in next sections.

Clearly, the above code is not optimal, nor maintainable. The two `process` functions share the same pattern:

1. Validate the input dto
2. Do something with the validated object

We'd like to abstract over this so we can write the function once instead of once for every type. To achieve this, the first step is defining a common type to let both of the DTOs inherit from it. Let's call this type `Validatable`:

```kotlin
sealed interface Validatable {
    data class CreatePortfolioDTO(val userId: String, val amount: Double) : Validatable
    data class ChangePortfolioDTO(val stock: String, val quantity: Int) : Validatable
}
```

In this way, the two `process` function can be merged into a single one:

```kotlin
fun process(validatable: Validatable) = {
    when (validatable) {
        is Validatable.CreatePortfolioDTO -> /* Validate the dto */
        is Validatable.ChangePortfolioDTO -> /* Validate the dto */
    }
    // Do something with the validated object
}
```

Here, we took advantage of the sealed classes and smart casts features of Kotlin. However, the above code is still far to be optimal. As Robert C. Martin taught us, the current `process` function violates the Open-Closed principle. If we want to add a new DTO and validate it, we need to change the existing implementation of the `process` function. This is not good, since such code tends to be rigid to changes, fragile and error-prone.

Fortunately, we can abstract the validation process in a dedicated function. Let's change the `Validatable` a bit:

```kotlin
interface Validatable<T> {
    fun validate(): T
}
```

We introduced a type parameter just to let the clients to work with the concrete DTO type, and not with an abstract interface.

Abstracting the behavior in abstract types (or interfaces) and implementing it in concrete types, letting client function to stay generic and reusable is a common pattern in any modern high-level programming language. In fact, this pattern is called _polymorphism_.

The method `validate` returns the validated data in case all the. Since we don't want to manage the case the data is not valid through exceptions (see [Functional Error Handling in Kotlin, Part 1: Absent values, Nullables, Options](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/#2-why-exception-handling-is-not-functional) for further details), we'll introduce the `Either` type from the Arrow Kt library (if you need an insight on how to use it, please refer to [Functional Error Handling in Kotlin, Part 2: Result and Either](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/)):

```kotlin
interface ValidationError

interface Validatable<T> {
    fun validate(): EitherNel<ValidationError, T>
}
```

We introduced the `ValidationError` interface to represent the possible validation errors. Moreover, we don't want to block our validation process to the first error we'll find in case of complex types. So, we need a data structure that can represent a list of possible errors. For this reason, we didn't use the `Either` type, but the `EitherNel` type, which is a type alias for `Either<NonEmptyList<E>, A>` in the Arrow Kt library

```
// Arrow Kt library
public typealias EitherNel<E, A> = Either<NonEmptyList<E>, A>
```

The `NonEmptyList` type is a data structure contained in the Arrow library that represents a list of elements that is guaranteed to be non-empty.

Let's try solving the problem using traditional object-oriented approaches. In the object-oriented approach, each class that needs validation would implement the `Validatable<T>` interface. This might look something like this for the `CreatePortfolioDTO` class:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double) : Validatable<CreatePortfolioDTO> {
    override fun validate(): EitherNel<ValidationError, CreatePortfolioDTO> {
        // validation logic here
    }
}
```

As we can see, the using direct subtyping to implement validation rules force us to change the code of the type we want to validate. At the beginning, this might not be a problem, and it's a straightforward solution indeed. We're using polymorphism to solve the problem, and this is a good thing. For example, if we have an external function that uses the validation, we can write it once for all the types that implement the `Validatable<T>` interface:

```kotlin
fun <T : Validatable<T>> process(validatable: T) = either {
    val validated: T = validatable.validate().bind()
    // Do something with the validated object
}
```

However, we don't always want to change the code of type to validate using subtyping, and sometimes we simply can't.

In fact, putting the type to validate and the validation process in the same place can decrease the maintainability to the former. For example, the object oriented approach can break the [Single Responsibility Principle](http://blog.rcard.in/solid/srp/programming/2017/12/31/srp-done-right.html). Indeed, it's not always the case that the behavior (aka, the methods) exposed by the type to validate is used by the same clients than the validation process.

Moreover, the code could be auto-generate by an external tool, or it could be part of a library we don't own. A good example are DTOs generated from a protocol buffer, an avro, or a Swagger (OpenAPI) definition.

## 4. Type Classes: A Solution for Functional Languages

If we can't use subtyping, what other solutions do we have? Well, if we are functional programming geeks, we know that this paradigm doesn't have subtyping. However, we don't want to lose the possibility to write polymorphic code, such the one of the `process` function above. 

Fortunately, functional programming comes with a solution for this problem: type classes. Type classes offer a solution by allowing us to define a set of behaviors (like validation rules) that can be applied to various types without altering the types themselves. This is particularly useful in a language like Kotlin, which supports both object-oriented and functional programming paradigms. 

Type classes offer a solution by allowing us to define a set of behaviors (like validation rules) that can be applied to various types without altering the types themselves. Let's see how.

First, we need to refactor a bit the `Validatable<T>` interface. We'll proceed step by step, so the following version of the interface is not the final form:

```kotlin
interface Validator<T> {
    fun validate(toValidate: T): EitherNel<ValidationError, T>
}

interface ValidationError
```

The main difference with the previous version (a part for the name) is that the `validate` method now takes a parameter of type `T` that represents the object to validate. Now, we can implement the validation rules as follows for the `CreatePortfolioDTO` type:

```kotlin
val createPortfolioDTOValidator =
    object : Validator<CreatePortfolioDTO> {
        override fun validate(toValidate: CreatePortfolioDTO): EitherNel<ValidationError, CreatePortfolioDTO> {
            // validation logic here
        }
    }
```

At first sight, we decoupled the DTO from the code that validates it. 

The `process` function, aka the function that uses the validation, can be rewritten as follows using the new `Validator<T>` interface:

```kotlin
fun <T> process(
    toValidate: T,
    validator: Validator<T>,
) = either {
    val validated: T = validator.validate(toValidate).bind()
    // Do something with the validated object
}
```

The `process` function now takes two parameters: the object to validate and the validator to use. As we can see, we can still take advantage of polymorphism, but we don't need to bind the validation logic to the type to validate. This kind of polymorphism is called _ad-hoc polymorphism_, and the `Validator<T>` interface is called a _type class_.

So, a type class is parametric type containing a set of behaviors that can be applied to various types without altering the types themselves. In our case, the `Validator<T>` interface defines the behavior of validating a type `T`.

Type classes don't suffer from the cons we saw in the object-oriented approach. In fact, we can define a type class for a type we don't own, and we can define multiple type classes for the same type. Moreover, we can achieve a better separation of concerns since the validation logic is decoupled from the type to validate.

However, also type classes have their cons. First, they are less intuitive than the object-oriented approach. The problem is bigger if a developer has no experience with functional programming. Second, we have a problem of discoverability. In fact, we need to know that a type class exists for a type we want to validate.

We still miss a feature of the object-oriented solution: The `validate` method is not a method of the DTO.This is not a big problem, but it's not as elegant as the object-oriented solution. Fortunately, we have can improve our solution in this direction taking advantage of Kotlin extension functions. Let's do it.

It's time to change the `Validator<T>` interface again:

```kotlin
interface ValidatorScope<T> {
    fun T.validate(): EitherNel<ValidationError, T>
}
```

A little of changes here. Let's analyze them one by one. First, the `validate` function is not an extension method of the generic type `T`. We can call the `validate` function as if it was a method of `T` now. For the sake of completeness, the type `T` is called the receiver of the function, and can be accessed using the `this` reference inside the function scope.

Then, we changed (again!!!) the name of the interface, calling it `ValidatorScope<T>`. We can find the `Scope` name used quite often in Kotlin libraries. In fact, the name refers to a Kotlin-specific pattern, called dispatcher receiver. In this way, we limit the visibility of the `validate`extension function, which allows us to call it only inside the scope. We say that the `validate` function is a context-dependent construct.

```kotlin
interface ValidatorScope<T> {                        // <- dispatcher receiver
    fun T.validate(): EitherNel<ValidationError, T>  // <- extension function receiver
    // 'this' type in 'validate' function is ValidatorScope<T> & T
}
```

We can also access the dispatcher receiver in the function body as `this`. In fact, Kotlin can represent the `this` reference as a union type of the dispatcher receiver and the receiver of the extension function.

For those of view that follows RockTheJvm blog, it's not a surprise. We already introduced scopes in [Kotlin Context Receivers: A Comprehensive Guide ](https://blog.rockthejvm.com/kotlin-context-receivers/#2-dispatchers-and-receivers).

The last changes require us to change also the implementation of the validator for the `CreatePortfolioDTO` type:

```kotlin
val createPortfolioDTOValidatorScope = 
    object : ValidatorScope<CreatePortfolioDTO> { 
        override fun CreatePortfolioDTO.validate(): EitherNel<ValidationError, CreatePortfolioDTO> =
            // validation logic here
}
```

Also, the `process` function must be changed to. We need to use to call the `validate` function inside a `ValidatorScope`. The first solution is to make the `process` function an extension function of the `ValidatorScope<T>` interface:

```kotlin
fun <T> ValidatorScope<T>.process(toValidate: T) =
    either {
        val validated: T = toValidate.validate().bind()
        // Do something with the validated object
    }
```

Again, we used the receiver feature of the Kotlin language to access the `ValidatorScope<T>`. It's responsibility of the caller of the `process` function to provide the right `ValidatorScope<T>` instance. For example, we can call the `process` function as follows:

```kotlin
fun main() {
    with (createPortfolioDTOValidatorScope) {
        process(CreatePortfolioDTO("userId", 100.0))
    }
}
```

The `with` function is a Kotlin standard library function and it's part of the so-called scope functions. It takes a receiver and a lambda as parameters. The lambda is executed in the context of the receiver:

```kotlin
// Kotlin starndard library
public inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    // Omissis
    return receiver.block()
}
```

Usually, the with function is preferred in such situations.

The same pattern is used for [Kotlin coroutines](https://blog.rockthejvm.com/kotlin-coroutines-101/), where all the coroutine builders, i.e. `launch`, `async`, are extensions of the `CoroutineScope`, which acts as dispatcher receiver.

One open point about the implementation of type classes in Kotlin is that we still don't have any automatic discover process for them. Other languages supporting type classes, such as Scala and Haskell, implement some form of automatic discovery. Scala, for example, has implicit resolution. 

Last but not least, we can also use Kotlin [context receivers](https://blog.rockthejvm.com/kotlin-context-receivers/#2-dispatchers-and-receivers) to declare that a function needs a specific context to be executed. So, we can change the `process` function as follows:

```kotlin
context(ValidatorScope<T>)
fun <T> process(toValidate: T) =
    either {
        val validated: T = toValidate.validate().bind()
        // Do something with the validated object
    }
```

To sum up, context receivers are a way to add a context or a scope to a function without passing this context as an argument.

What's next? Well, we didn't talk about the validation logic yet. We'll do it in the next section.

## 5. Expanding the Validation Framework

In the previous section, we introduced the `ValidatorScope<T>` interface. We also saw how to use it to validate a DTO. However, we didn't talk about the validation logic yet. Let's do it now. We can use the type classes approach once again to solve the problem.

First, we need to define the validation rules. We'll start with the `CreatePortfolioDTO` type. We want to validate the `userId` and the `amount` fields. The `userId` field must be a non-empty string, while the `amount` field must be a positive number. Let's define the validation rules as follows:

```kotlin
interface NonEmpty<T> {
    fun T.nonEmpty(): Boolean
}

interface Positive<T : Number> {
    fun T.positive(): Boolean
}
```

As we can see, the validation rules are generic. In this way, we can apply them to multiple types, exploiting ad-hoc polymorphisms once again. And, yup, the above types are type classes. For the `CreatePortfolioDTO` we need the following implementations:

```kotlin
val nonEmptyString = object : Required<String> {
    override fun String.nonEmpty(): Boolean = this.isNotBlank()
}

val positiveDouble = object : Positive<Double> {
    override fun Double.positive(): Boolean = this > 0.0
}
```

Nothing will stop us to have multiple implementations of the same validation rule for the same type. For example, we can have the following implementation for the `List<String>` and `Int` types:

```kotlin
val nonEmptyList = object : NonEmpty<List<String>> {
    override fun List<String>.nonEmpty(): Boolean = this.isNotEmpty()
}

val positiveInt = object : Positive<Int> {
    override fun Int.positive(): Boolean = this > 0
}
```

Now, we need a type hierarchy implementing the errors that can be generated by a single validation rule. Let's define the following hierarchy:

```kotlin
sealed interface InvalidFieldError {

    val field: String

    data class MissingFieldError(override val field: String) : InvalidFieldError {
        override fun toString(): String = "Field '$field' is empty"
    }

    data class NegativeFieldError(override val field: String) : InvalidFieldError {
        override fun toString(): String = "Field '$field' must be positive"
    }
}
```

The `field` attribute stands for the name of the property the framework is validating. Next, we need some functions that use the validation rules we defined and generate the errors in case the validation fails. Let's define the following functions:

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

The above validation functions requires a validation rules type class to be available as an extension function on the type `T`. So, in this version of the solution we need to use context receivers, since we can't have more than one receiver for a function. However, we can do better than this. In fact, Since the two function need a validation rule type class as context, why can't we move them directly inside the validation rules type classes? Let's do it:

```kotlin
interface Required<T> {
    fun T.required(): Boolean

    fun T.required(fieldName: String): EitherNel<MissingFieldError, T> =
        if (required()) {
            this.right()
        } else {
            MissingFieldError(fieldName).left().toEitherNel()
        }
}

interface Positive<T : Number> {
    fun T.positive(): Boolean

    fun T.positive(fieldName: String): EitherNel<NegativeFieldError, T> =
        if (positive()) {
            this.right()
        } else {
            NegativeFieldError(fieldName).left().toEitherNel()
        }
} 
```

The approach above lets us to completely rid off the context receiver in function definition.

The last step is to use our freshly new validation rules to implement the validation logic of our DTO validator. Before proceed with the implementation, we need to slightly change the definition of the original `ValidationError` adding a list to accumulate errors oven fields:

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

## 6. Conclusion

Type classes in Kotlin offer a powerful tool for solving common problems in a more flexible and composable manner than traditional object-oriented approaches. By leveraging Kotlin's functional programming features, we can write cleaner, more maintainable code that scales well with complexity.
