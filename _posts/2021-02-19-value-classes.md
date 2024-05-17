---
title: "Value Classes in Scala"
date: 2021-02-19
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala]
excerpt: "An ad-hoc type definition technique for eliminating bugs which are hard to trace, with implementations in Scala 2 via newtypes and in Scala 3 via opaque types."
---

_This article is brought to you by [Riccardo Cardin](https://github.com/rcardin), a proud student of the [Scala with Cats course](https://rockthejvm.com/p/cats). Riccardo is a senior developer, a teacher and a passionate technical blogger. For the last 15 years, he's learned as much as possible about OOP, and now he is focused on his next challenge: mastering functional programming._

_Enter Riccardo:_

One of the main rules of functional developers is that we should always trust a function's signature. Hence, when we use functional programming, we prefer to define _ad-hoc_ types to represent simple information such as an identifier, a description, or a currency. Ladies and gentlemen, please welcome the value classes.

## 1. The Problem

First, let's define an example to work with. Imagine we have an e-commerce business and that we model a product to sell using the following representation:

```scala
case class Product(code: String, description: String)
```

So, every product is represented by a `code` (which can mean some barcode), and a `description`. So far, so good. Now, we want to implement a repository that retrieves products from a persistent store, and we want to allow our users to search by `code` and by `description`:

```scala
trait ProductRepository {
  def findByCode(code: String): Option[Product]
  def findByDescription(description: String): List[Product]
}
```

We cannot avoid using a description in the search by code or a code in the search by description. As we are representing both pieces of information through a `String`, we can wrongly pass a description to the search by code, and vice versa:

```scala
val aCode = "8-000137-001620"
val aDescription = "Multivitamin and minerals"

ProductRepository.findByCode(aDescription)
ProductRepository.findByDescription(aCode)
```

The compiler cannot warn us of our errors because we represent both pieces of information, i.e. the `code` and the `description`, using simple `Strings`. This fact can lead to subtle bugs, which are very difficult to intercept at runtime as well.

## 2. Using Straight Case Classes

However, we are smart developers, and we want the compiler to help us identify such errors as soon as possible. Fail fast, they said. Hence, we define two dedicated types, both for the `code`, and for the `description`:

```scala
case class BarCode(code: String)
case class Description(txt: String)
```

The new types, `BarCode` and `Description`, are nothing more than wrappers around strings. In jargon, we call them _value classes_. However, they allow us to refine the functions of our repository to avoid the previous information mismatch:

```scala
trait AnotherProductRepository {
  def findByCode(barCode: BarCode): Option[Product] =
    Some(Product(barCode.code, "Some description"))
  def findByDescription(description: Description): List[Product] =
    List(Product("some-code", description.txt))
}
```

As we can see, it is not possible anymore to search a product by code while accidentally passing a description. Indeed, we can try to pass a `Description` instead of a `BarCode`:

```scala
val anotherDescription = Description("A fancy description")
AnotherProductRepository.findByCode(anotherDescription)
```

As desired, the compiler diligently warns us that we are bad developers:

```shell
[error] /Users/daniel/Documents/value-types/src/main/scala/ValuesTypes.scala:33:39: type mismatch;
[error]  found   : com.rockthejvm.value.ValuesTypes.Description
[error]  required: com.rockthejvm.value.ValuesTypes.BarCode
[error]   AnotherProductRepository.findByCode(anotherDescription)
[error]                                       ^
```

However, we can still create a `BarCode` using a `String` representing a description:

```scala
val aFakeBarCode: BarCode = BarCode("I am a bar-code")
```

To overcome this issue we must use the _smart constructor_ design pattern. Though the description of the pattern is beyond the scope of this article, the smart constructor pattern hides to developers the main constructor of the class, and adds a factory method that performs any needed validation. In its final form, smart constructor pattern for the `BarCode` type is the following:

```scala
sealed abstract class BarCodeWithSmartConstructor(code: String)
object BarCodeWithSmartConstructor {
  def mkBarCode(code: String): Either[String, BarCodeWithSmartConstructor] =
    Either.cond(
      code.matches("\\d-\\d{6}-\\d{6}"),
      new BarCodeWithSmartConstructor(code) {},
      s"The given code $code has not the right format"
    )
}

val theBarCode: Either[String, BarCodeWithSmartConstructor] =
  BarCodeWithSmartConstructor.mkBarCode("8-000137-001620")
```

Awesome! We reach our primary goal. Now, we have fewer problems to worry about...or not?

## 3. An Idiomatic Approach

The above approach resolves some problems, but it adds many others. In fact, since we are using a `class` to wrap `String`s, the compiler must instantiate a new `BarCode` and `Description` every single time. The over instantiation of objects can lead to a problem concerning performance and the amount of consumed memory.

Fortunately, Scala provides an idiomatic way to implement value classes. Idiomatic value classes avoid allocating runtime objects and the problems we just enumerated.

A idiomatic value class is a `class` (or a `case class`) that extends the type `AnyVal`, and declares only one single public `val` attribute in the constructor. Moreover, a value class can declare `def`:

```scala
case class BarCodeValueClass(val code: String) extends AnyVal {
  def countryCode: Char = code.charAt(0)
}
```

However, value classes have many constraints: They can define `def`, but not `val` other than the constructor's attribute, cannot be extended, and cannot extend anything but _universal traits_ (for the sake of completeness, a universal trait is a trait that extends the `Any` type, has only `def` as members, and does no initialization).

The main characteristic of a value class is that the compiler treats it as a `case class` at compile-time. Still, at runtime, its representation is equal to the type declared in the constructor. Roughly speaking, the `BarCodeValueClass` type is transformed as a simple `String` at runtime.

Hence, due to the lack of runtime overhead, value classes are a valuable tool used in the SDK to define extension methods for basic types such as `Int`, `Double`, `Char`, etc.

### 3.1. The Problem With the Idiomatic Approach

We must remember that the JVM doesn't support value classes directly. So, there are cases in which the runtime environment must perform an extra allocation of memory for the wrapper type.

The Scala [documentation](https://docs.scala-lang.org/overviews/core/value-classes.html) reports the following use cases that need an extra memory allocation:

* A value class is treated as another type.
* A value class is assigned to an array.
* Doing runtime type tests, such as pattern matching.

Unfortunately, the first rule's concrete case also concerns using a value class as a type argument. Hence, also the use of a simple generic method `show`, creating a printable representation of an object, can cause an undesired instantiation:

```scala
def show[T](obj: T): String = obj.toString
println(show(BarCodeValueClass("1-234567-890234")))
```

Moreover, for the same reason, every time we want to implement the type classes pattern for a value class, we cannot avoid its instantiation. We love type classes, as functional developers, and many Scala libraries, such as Cats, are based on the root of the type classes pattern. So, this is a big problem.

The second rule concerns the use of a value class inside an array. For example, imagine we want to create a bar-code basket:

```scala
val macBookBarCode = BarCodeValueClass("1-234567-890234")
val iPhone12ProBarCode = BarCodeValueClass("0-987654-321098")
val barCodes = Array[BarCodeValueClass](macBookBarCode, iPhone12ProBarCode)
```

As expected, the `barCodes` array will contain `BarCodeValueClass` instances, and not a `String` primitive. Again, additional instantiations are needed. In detail, the problem is not due to Scala, but to how the JVM treats arrays of objects and arrays of primitive types.

Finally, as the third rule states, we cannot use a value class with pattern matching avoiding a runtime instantiation. Hence, the following method, testing if a bar-code represents a product made in Italy, forces a runtime instantiation of the `barCode` object as a `BarCodeValueClass`:

```scala
def madeInItaly(barCode: BarCodeValueClass): Boolean = barCode match {
  case BarCodeValueClass(code) => code.charAt(0) == '8'
}
```

Due to these limitations, the Scala community searched for a better solution. Ladies and gentlemen, please welcome the [NewType](https://github.com/estatico/scala-newtype) library.

## 4. The NewType Library

The NewType library allows us to create new types without the overhead of extra runtime allocations, avoiding the pitfalls of Scala values classes. To use it, we need to import the proper dependency in the `build.sbt` file:

```sbt
libraryDependencies += "io.estatico" %% "newtype" % "0.4.4"
```

It uses the experimental feature of Scala macros. So, it is necessary to enable it at compile-time, using the `-Ymacro-annotations`. In details, the library defines the `@newtype` annotation macro:

```scala
import io.estatico.newtype.macros.newtype
@newtype case class BarCode(code: String)
```

The macro expansion generates a new `type` definition and an associated companion object. Moreover, the library expands the class marked with the `@newtype` annotation with its underlying value at runtime. So, a `@newtype` class can't extend any other type.

Despite these limitations, the NewType library works like a charm and interacts smoothly with IDEs.

Using two `@newtype`s, one representing a bar-code and one representing a description, we can easily improve the definition of the initial `Product` class:

```scala
@newtype case class BarCode(code: String)
@newtype case class Description(descr: String)

case class Product(code: BarCode, description: Description)
```

Moreover, creating a new instance of a newtype it's as easy as creating an instance of a Scala regular type:

```scala
val iPhoneBarCode: BarCode = BarCode("1-234567-890123")
val iPhoneDescription: Description = Description("Apple iPhone 12 Pro")
val iPhone12Pro: Product = Product(iPhoneBarCode, iPhoneDescription)
```

As we can see, the code looks like the original `Product` definition. However, we altogether avoid the runtime instantiation of the wrapper classes. Such an improvement!

What about smart constructors? If we choose to use a `case class`, the library will generate the `apply` method in the companion object. If we want to avoid access to the `apply` method, we can use a `class` instead and create our smart constructor in a dedicated companion
object:

```scala
@newtype class BarCodeWithCompanion(code: String)

object BarCodeWithCompanion {
  def mkBarCode(code: String): Either[String, BarCodeWithCompanion] =
    Either.cond(
      code.matches("\\d-\\d{6}-\\d{6}"),
      code.coerce,
      s"The given code $code has not the right format")
}
```

### 4.1. Type Coercion

Wait. What is the `code.coerce` statement? Unfortunately, using a `class` instead of a `case class` removes the chance to use the `apply` method for other developers and us. So, we have to use type coercion.

As we know, the Scala community considers type coercion a bad practice because it requires a cast (via the `asInstanceOf` method). The NewType library tries to make this operation safer using a type class approach.

Hence, the compiler will let us coerce between types if and only if an instance of the `Coercible[R, N]` type class exists in the scope for types `R` and `N`. Fortunately, the NewType library does the dirty work for us, creating the needed `Coercible` type class instances. Taking our example, the generated `Coercible` type classes let us cast from `BarCode` to `String`, and vice versa:

```scala
val barCodeToString: Coercible[BarCode, String] = Coercible[BarCode, String]
val stringToBarCode: Coercible[String, BarCode] = Coercible[String, BarCode]

val code: String = barCodeToString(iPhoneBarCode)
val iPhone12BarCode: BarCode = stringToBarCode("1-234567-890123")
```

However, if we try to coerce a `Double` to a `BarCode`, the compiler will not find the needed type class:

```scala
val doubleToBarCode: Coercible[Double, BarCode] = Coercible[Double, BarCode]
```

In fact, the above code makes the compiler yelling:

```sbt
[error] could not find implicit value for parameter ev: io.estatico.newtype.Coercible[Double,in.rcard.value.ValuesClasses.NewType.BarCode]
[error]       val doubleToBarCode: Coercible[Double, BarCode] = Coercible[Double, BarCode]
[error]                                                                  ^
```

As the type classes pattern recommends, the NewType library defines also an extension method, `coerce`, for the types with a `Coercible` type class associated:

```scala
val anotherCode: String = iPhoneBarCode.coerce
val anotherIPhone12BarCode: BarCode = "1-234567-890123".coerce
```

However, [it's proven](https://github.com/estatico/scala-newtype/issues/64) that the scope resolution of the `Coercible` type class (a.k.a., the coercible trick) is an operation with a very high compile-time cost and should be avoided. Moreover, as the [library documentation](https://github.com/estatico/scala-newtype#coercible) says

> You generally shouldn't be creating instances of Coercible yourself. This library is designed to create the instances needed for you which are safe. If you manually create instances, you may be permitting unsafe operations which will lead to runtime casting errors.

### 4.2. Automatically Deriving Type Classes

The NewType library offers a very nice mechanism for deriving type classes for our `newtype`. Taking an idea coming from Haskell (as the library itself), the generated companion object of a `newtype` contains two methods, called `deriving` and `derivingK`.

We can call the first method `deriving`, if we want to derive an instance of a type class with the type parameter that is not higher kinded. For example, we want to use our `BarCodeWithCompanion` type together with the `cats.Eq` type class:

```scala
implicit val eq: Eq[BarCodeWithCompanion] = deriving
```

Whereas, if we want to derive an instance of a type class with the type parameter that is higher kinded, we can use the `derivingK` method instead.

Therefore, we can quickly implement type classes for newtypes should dispel any doubt whether using them to value classes.

However, with Dotty's advent (a.k.a. Scala 3), a new competitor came in town: The opaque types.

## 5. Scala 3 Opaque Types Aliases

As many of us might already know, Dotty is the former name of the new major version of Scala. Dotty introduces many changes and enhancements to the language. One of these is _opaque type aliases_, which addresses the same issue as the previous value classes: Creating zero-cost abstraction.

In effect, opaque types let us define a new `type` alias with an associated scope. Hence, Dotty introduces a new reserved word for opaque type aliases, `opaque`:

```scala
object BarCodes {
  opaque type BarCode = String
}
```

To create a `BarCode` from a `String`, we must provide one or many smart constructors:

```scala
object BarCodes {
  opaque type BarCode = String

  object BarCode {
    def mkBarCode(code: String): Either[String, BarCode] = {
      Either.cond(
        code.matches("\\d-\\d{6}-\\d{6}"),
        code,
        s"The given code $code has not the right format"
      )
    }
  }
}
```

Inside the `BarCodes` scope, the `type` alias `BarCode` works as a `String`: We can assign a `String` to a variable of type `BarCode`, and we have access to the full API of `String` through an object of type `BarCode`. So, there is no distinction between the two types:

```scala
object BarCodes {
  opaque type BarCode = String
  val barCode: BarCode = "8-000137-001620"

  extension (b: BarCode) {
    def country: Char = b.head
  }
}
```

As we can see, if we want to add a method to an opaque type alias, we can use the extension method mechanism, which is another new feature of Dotty.

Outside the `BarCodes` scope, the compiler treats a `String` and a `BarCode` as completely different types. In other words, the `BarCode` type is opaque with respect to the `String` type outside the definition scope:

```scala
object BarCodes {
  opaque type BarCode = String
}
val anotherBarCode: BarCode = "8-000137-001620"
```

Hence, in the above example, the compiler diligently warns us that the two types are incompatible:

```shell
[error] 20 |  val anotherBarCode: BarCode = "8-000137-001620"
[error]    |                      ^^^^^^^
[error]    |                      Not found: type BarCode
```

Finally, we can say that the opaque type aliases seem to be the idiomatic replacement to the NewType
library in Dotty / Scala 3. Awesome!

## 6. Conclusion

Summing up, in this article, we have first introduced the reason why we need the so-called value classes. The first attempt to give a solution uses `case class`es directly. However, due to performance concerns, we introduced the idiomatic solution provided by Scala. This approach, too, had limitations due to random memory allocations.

Then, we turned to additional libraries, and we found the NewType library. Through the use of a mix of `type` and companion objects definition, the library solved the value classes problem in a very brilliant way.

Finally, we looked at the future, introducing opaque type aliases from Dotty that give us the idiomatic language solution we were searching for.
