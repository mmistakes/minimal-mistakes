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

To achieve this, we need to define a component that defines the behavior of validating data. Let's call this component as `Validatable`:

```kotlin
interface Validatable<T> {
    fun validate(): T
}
```

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

Now, we need an type to validate. We'll use the information needed to create a new portfolio, that is, the user id and the amount of money to be invested:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double)
```

Let's try solving the problem using traditional object-oriented approaches. In the object-oriented approach, each class that needs validation would implement the `Validatable<T>` interface. This might look something like this for the `CreatePortfolioDTO` class:

```kotlin
data class CreatePortfolioDTO(val userId: String, val amount: Double) : Validatable<CreatePortfolioDTO> {
    override fun validate(): EitherNel<ValidationError, CreatePortfolioDTO> {
        // validation logic here
    }
}
```

We'll focus on the validation logic in next sections.

As we can see, the using direct subtyping to implement validation rules force us to change the code of the type we want to validate. At the beginning, this might not be a problem, but we don't always want to change the code of type to validate, and sometimes we simply can't. In fact, the code could be auto-generate by an external tool, or it could be part of a library we don't own. A good example can be DTOs generated from a protocol buffer, an avro, or a Swagger (OpenAPI) definition.

However, traditional object-oriented approaches sometimes fall short in providing flexible and reusable validation mechanisms. This brings us to the exploration of an alternative approach using Type Classes in Kotlin.

## 3. How Object-Oriented Languages Solve the Problem

Object-oriented languages typically handle validation through inheritance and polymorphism. This approach, while powerful, can sometimes lead to rigid class hierarchies and can lack the expressiveness needed for more complex validation scenarios. For instance, extending classes or implementing interfaces for each validation rule can quickly become unwieldy.

## 4. Type Classes: A Solution for Functional Languages

Type classes offer a solution by allowing us to define a set of behaviors (like validation rules) that can be applied to various types without altering the types themselves. This is particularly useful in a language like Kotlin, which supports both object-oriented and functional programming paradigms.

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
