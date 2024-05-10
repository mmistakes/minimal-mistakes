---
title: "Algebraic Data Types (ADT) in Scala"
date: 2021-01-16
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala]
excerpt: "Every developer using Scala meets the acronym ADT sooner or later. In this article, we will try to answer all of your questions about ADTs."
---

_A small note: this is the first guest post on the blog! This article is brought to you by Riccardo Cardin, a proud student of the [Scala with Cats course](https://rockthejvm.com/p/cats). Riccardo is a senior developer, a teacher and a passionate technical blogger. For the last 15 years, he's learned as much as possible about OOP, and now he is focused on his next challenge: mastering functional programming!_

_Enter Riccardo:_

Every developer using Scala meets the acronym ADT sooner or later. But, what are Algebraic Data Types? Why are they so useful? In this article, we will try to answer all of your questions about ADT.

## 1. Introduction to Algebraic Data Types


As the name suggested, ADTs are a data type. Hence, we can use them to structure the data used by a program. We can define ADT as a pattern because they give us a standard solution to modeling data.

The ideas behind the ADTs come from the Haskell programming language. As we should know, Haskell is like a father for Scala, as Martin Odersky took many ideas from Haskell during the modeling of the first version of Scala.

Though ADTs are often associated with functional programming, they are not exclusive to this paradigm. Hence, many Scala libraries use them proficiently. The Akka library is one of them.

So, let's have a deep dive into the world of ADTs.

### 1.1. Sum Types


The best way to understand an abstract concept is to model something
we know very well. For example, imagine we have to create some type representing a weather forecast service.

We can model the weather in Scala using a base `trait` and then deriving from it every possible weather state:

```scala
sealed trait Weather
case object Sunny extends Weather
case object Windy extends Weather
case object Rainy extends Weather
case object Cloudy extends Weather
case object Foggy extends Weather
```


Congratulations! We have just defined our first Algebraic Data Type! In detail, the above code represents a Sum type. If you think about it, a variable of type `Weather` can have exactly one value of the `object` types extending it. So, the possible available values are the sum of the `object` types:

```
type Weather = Sunny + Windy + Rainy + Cloudy + Foggy
```

In other words, the `Weather` type is `Sunny` _OR_ `Windy` _OR_ `Rainy`, and so forth (to tell the truth, we are talking about an XOR, or exclusive OR). Because a Sum type enumerates all the possible instances of a type, they are also called Enumerated types.

Why did we use a `sealed trait`? Well, the word `sealed` forces us to define all possible extensions of the `trait` in the same file, allowing the compiler to perform "exhaustive checking". This feature is handy when associated with pattern matching:

```scala
def feeling(w: Weather): String = w match {
  case Sunny => "Oh, it's such a beautiful sunny day :D"
  case Cloudy => "It's cloudy, but at least it's not raining :|"
  case Rainy => "I am very sad. It's raining outside :("
}
```

In the above case, the compiler knows which are the extension of `Weather`, and it warns us that the pattern matching is not handling all the possible values:

```
[warn] [...] match may not be exhaustive.
[warn] It would fail on the following inputs: Foggy, Windy
[warn]     def feeling(w: Weather): String = w match {
[warn]                                       ^
```

Exhaustive checking can make our life as developers much more straightforward.

If we want to discourage trait mixing and get better binary compatibility, we can use a `sealed abstract class` instead of a `sealed trait`.

Why did we use a set of `case object`s? The answer is straightforward. We don't need to have more than one instance of each extension of `Weather`. Indeed, there is nothing that distinguishes two instances of the `Sunny` type. So, we use `object` types that are translated by the language as idiomatic singletons.

Moreover, using a `case object` instead of a simple `object` gives us a set of useful features, such as the `unapply` method, which lets our objects to work very smoothly with pattern matching, the free implementation of the methods `equals`, `hashcode`, `toString`, and the extension from `Serializable`.

### 1.2. Product Types

Sum types are not the only ADTs available. Imagine having to model a request to our forecast service. Probably, the information the service needs is at least the latitude and the longitude of the point we want to ask the forecast:

```scala
case class ForecastRequest(val latitude: Double, val longitude: Double)
```

In the language of types, we can write the constructor as `(Long, Long) => ForecastRequest`. In other words, the number of possible values of `ForecastRequest` is precisely the cartesian product of the possible values for the `latitude` property _AND_ all the possible values for the `longitude` property:

```
type ForecastRequest = Long x Long
```

Therefore, we have defined a Product type! As we already introduced, Product types are associated with the _AND_ operator, in contrast with the Sum types that we associate with the _OR_ operator.

As we just have seen, Scala models Product types using a `case class`. As for `case object`, one of the power of case classes is the free implementation of the `unapply` method, which allows smoothly decomposing the Product types:

```scala
val (lat, long): (Double, Double) = ForecastRequest(10.0D, 45.3D)
println(s"A forecast request for latitude $lat and longitude $long")
```

Product types introduce a lot more flexibility in modeling and representing reality. However, this comes within a cost: The more the type's values, the more cases we will need to verify in tests.

### 1.3. Hybrid Types

Last but not least, it's easy to put together both the above types into something new that we call Hybrid types:

```scala
sealed trait ForecastResponse
case class Ok(weather: Weather) extends ForecastResponse
case class Ko(error: String, description: String) extends ForecastResponse
```

In this case, the `ForecastResponse` is a Sum type because it is an `Ok` OR a `Ko`. The `Ko` type is a Product type because it has an `error` AND a `description`. Hence, Hybrid types let us take the best of both worlds, i.e., Sum and Product types, adding the capability to model more and more business cases.

Often, Hybrid types are also called Sum of Product types.

## 2. Why Should I Care About ADTs

Ok, all the above information is useful. But why should we care about ADTs? When using functional programming, ADTs play an essential role. Whereas in OOP, we tend to think about data and functionality together, in FP, we use to define data and functionality separately. Sum types and Product types give us the right abstractions to model domain data.

For example, let's take the `ForecastResponse` type. We could have used simple tuples to model data:

```scala
// Instance of the Ko type
val (error, description): (String, String) = ("PERMISSION_DENIED", "You have not the right permission to access the resource")
```

Using a tagged type, we can add a name to the entity that maps to our domain model. Moreover, using a name lets the compiler automatically validate the information, generating only valid combinations. There is a principle in data modeling that **illegal states should not be representable at all**, and ADTs allow us to do exactly that. Indeed, the compiler defends us from constructing a `Ko` response with an `Int` as a description.

The **compositionality** of ADTs is the crucial feature that makes them a perfect fit to model domain models in applications. Indeed, functional programming lets us build larger abstractions from smaller ones. The `Ok` type is a perfect example:

```scala
case class Ok(weather: Weather) extends ForecastResponse
```

Indeed, we use the `Weather` Sum type to create a new ADT with a richer semantic.

Moreover, ADTs' representation in Scala through `case class` and `case object` forces us to use **immutable types**. As we know, immutability is at the core of functional programming and brings many useful features. For example, it connects directly with the idea of functional purity. It allows a safer approach to concurrency, avoiding the mutable state and minimizing the probability of race conditions.

Then, ADTs work very well with pattern matching and partial functions. The `unapply` method of the `case class` and `case object` works like a _charm_ together with the`match` statement.

There are many more programming paradigms other than functional programming that use ADTs extensively. For example, think about Akka. For Akka developers, the best practice is to design the communication protocols between actors (i.e., request and response messages) using ADTs:

```scala
val weatherReporter: Behavior[ForecastResponse] =
  Behaviors.receive { (context, message) =>
    message match {
      case Ok(weather: Weather) =>
        context.log.info(s"Today the weather is $weather")
      case Ko(e, d) =>
        context.log.info(s"I don't know what's the weather like, $d")
    }
    Behaviors.same
  }
```

Finally, ADTs provide no functionality, only data. So, ADTs **minimize the set of dependencies** they need, making them easy to publish and share with other modules, and programs.

## 3. A Final Step: Why "Algebraic"?

Many of us are just thinking: "Why are these kinds of types called 'algebraic'"? Well, we first have to define what algebra is.

An algebra is nothing more than a type of objects and one or more operations to create new items of that type. For example, in _numeric algebra_ the objects are the numbers, and the operations are +, -, \*, and /. Talking about ADTs, the objects are the Scala standard types themselves, and the class constructors of ADTs are the operators. They allow building new objects, starting from existing ones.

Going deeper, we can introduce more mathematics associated with ADTs. In detail, we have:

* `case class`es are also known as _products_
* `sealed trait`s (or `sealed abstract class`es) are also known as _coproducts_
* `case object`s and `Int`, `Double`, `String` (etc) are known as _values_

As we saw, we can compose new data types from the _AND_ and _OR_ algebra. A Sum type (or coproduct) can only be one of its values:

```
Weather (coproduct) = `Sunny` XOR `Windy` XOR `Rainy` XOR ...
```

Whereas a Product type (product) contains every type that it is composed of:

```
Ko (product) = String x String
```

We can define the complexity of a data type as the number of values that can exist. Data types should have the least amount of complexity they need to model the information they carry. Let's take an example. Imagine we have to model a data structure that holds mutually exclusive configurations. For the sake of simplicity, let this configuration be three `Boolean` values:

```scala
case class Config(a: Boolean, b: Boolean, c: Boolean)
```

As we just defined, the above Product type has a complexity of 8. Can we do any better? Let's try to model the `Config` type as a Sum type instead:

```scala
sealed trait Config
case object A extends Config
case object B extends Config
case object C extends Config
```

The Sum type `Config` has the same semantic as its Product type counterpart, plus it has a smaller complexity, and it does not allow 5 invalid states to exist. Also, as we said, the lesser values a type admits, the easier the tests associated with it will be. Less is better :)

Let's rethink our `Ko` Product type. Can we do any better? Absolutely. We should try to avoid invalid states and limit the number of values the type can admit. Hence, we can replace the first value of the type, `error: String`, with a Sum type that enumerates the possible types of available errors:

```scala
sealed trait Error
case object NotFound extends Error
case object Unauthorized extends Error
case object BadRequest extends Error
case object InternalError extends Error
// And so on...
case class Ko(error: Error, description: String) extends ForecastResponse
```

We reduced the complexity of the type, making it more focused, understandable, and maintainable.

## 4. Conclusion

Summing up, in this article, we introduced the Algebraic Data Types, or ADTs. In detail, we defined the two possible ADTs, Sum types and Product types. Then, we extended our domain, adding the Hybrid type, and enumerate the pros we have using ADTs in real-life scenarios.
