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

The main difference with the previous version is that the `validate` method now takes a parameter of type `T` that represents the object to validate. Now, we can implement the validation rules as follows for the `CreatePortfolioDTO` type:

```kotlin
val createPortfolioDTOValidator =
    object : Validator<CreatePortfolioDTO> {
        override fun validate(toValidate: CreatePortfolioDTO): EitherNel<ValidationError, CreatePortfolioDTO> {
            // validation logic here
        }
    }
```

At first sight, we decouple the DTO from the code that validates it. 

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

### Example: Validating a DTO

Consider the `CreatePortfolioDTO` class in Kotlin:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double)
```

This DTO needs validation for `userId` and `amount`. Using type classes, we can define generic validation rules that are decoupled from the data type.

### Implementing Type Classes in Kotlin with Context Receivers

Kotlin's Context Receivers feature provides a way to implement type classes elegantly. Here's an example implementation using your provided code:

```kotlin
// [Your provided code snippet here]
```

This implementation defines a series of validation rules (`Required`, `Positive`, `NonZero`) and applies them to the `CreatePortfolioDTO` fields. The beauty of this approach lies in its reusability and the ability to compose validations.

## 5. Conclusion

Type classes in Kotlin offer a powerful tool for solving common problems in a more flexible and composable manner than traditional object-oriented approaches. By leveraging Kotlin's functional programming features, we can write cleaner, more maintainable code that scales well with complexity.
