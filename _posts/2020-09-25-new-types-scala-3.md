---
title: "New Types in Scala 3"
date: 2020-09-25
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, scala 3, type system]
excerpt: "Scala 3 introduces some new kinds of types, which we're eagerly awaiting for."
---
This article is for Scala programmers of all levels, although some of the later parts and questions will be a tad more difficult. We will start exploring the new features that Scala 3 brings, as well as changes in style, syntax, or deprecations.

The focus of this article is some of the new kinds of types now allowed in Scala 3.

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## 1. Literal Types

This feature was technically introduced in Scala 2.13, but we will explore it here in the context of the types we're going to talk about next. In short, Scala is now able to treat literal values as singletons of their own types. Remember <a href="https://rockthejvm.com/blog/type-level-programming-1">type-level programming</a>? We needed to defined each "number" as its own type. Now, Scala can do this by default. The catch is that you'll now have to declare it explicitly:

```scala
val aNumber = 3 // an Int
val three: 3 = 3
```

If you don't specify the type of your val, the compiler will infer the type based on the right-hand side as it did before. If you specify the literal type yourself, the compiler will automatically build a new type behind the scenes, based on what you declared. Any literal can become its own type, and it will be a subtype of its "normal" type, e.g. the type 3 will be a subtype of Int:

```scala
def passNumber(n: Int) = println(n)
passNumber(aNumber)
passNumber(three) // correct, d'oh
```

However, once you declare that a method/function takes a literal type as argument, nothing but that value will be accepted:

```scala
def passStrict(n: 3) = println(n)
passStrict(3)
// passStrict(aNumber) // not correct
```

Literal types can be defined for other numerical types (e.g. doubles), for booleans or for strings. Side note: even though String is a reference type, <a href="https://docs.oracle.com/javase/specs/jls/se7/html/jls-3.html#jls-3.10.5">String interning</a> happens automatically for String literals, and Scala can take advantage of it.

```scala
val myFavoriteLanguage: "Scala" = "Scala"
val pi: 3.14 = 3.14
val truth: true = true
```

Why are literal types useful at all? Literal types are used to enforce compile-time checks to your definitions so that you don't go reckless with your code.

```scala
def doSomethingWithYourLife(meaning: Option[42]): Unit =
    meaning.foreach(m => s"I've made it: $m")
```

The method above will only take Some(42) or None, nothing in between. It's often a good idea to restrict your type declarations to literal types when you're certain that your particular value is critical for your application's logic. In this way, you'll avoid the error of passing an invalid value, and everything will be caught at compile time.

## 2. Union Types

This is a completely new addition in Scala 3. It allows you to use a combined type ("either A or B") in the same declaration. However, this has nothing to do with the `Either` monadic type. Here's an example:

```scala
def ambivalentMethod(arg: String | Int) = arg match {
    case _: String => println(s"a String: $arg")
    case _: Int => println(s"an int: $arg")
}
```

This method happily receives either an Int argument or a String argument. This was not possible in the prior versions of Scala. We can use the method as follows:

```scala
ambivalentMethod(33)
ambivalentMethod("33")
```

The caveat of having a union type in a method/function is that in order to use the types properly, e.g. use their methods, we have to pattern match the union-typed value against the possible types.

I mentioned we would discuss literal types in the context of Scala 3, because in conjunction with union types, literal types unlock a nice piece of functionality. Languages like TypeScript have had this for years, and it's really nice that we can have the equivalent in Scala:

```scala
type ErrorOr[T] = T | "error" // this puts some restraints on what you can do with your values
def handleResource(file: ErrorOr[File]): Unit = { // we'll discuss braceless syntax in another article
    // your code here
}
```

Inside this method, you can't access the API of the argument "good" type (i.e. File in this case) until you've dealt with the error case. This prevents you from being reckless in your code and forces you to treat unwanted values properly. The best part? Everything happens at compile time.

One more thing about union types. They are not inferred automatically by the compiler if an expression can return multiple types. In other words, the compiler will still compute the lowest common ancestor type by way of inheritance. That said, we can define a union type explicitly if we wanted, and the compiler will be happy too:

```scala
val stringOrInt = if (43 > 0) "a string" else 43 // Any, as inferred by the compiler
val aStringOrInt: String | Int = if (43 > 0) "a string" else 43 // OK
```

## 3. Intersection Types

By way of symmetry, we also have intersection types in Scala 3 now. While you can think of union types as "either A or B", intersection types can be read as "both A and B". Here's an example:

```scala
trait Camera {
    def takePhoto(): Unit = println("snap")
}
trait Phone {
    def makeCall(): Unit = println("ring")
}

def useSmartDevice(sp: Camera & Phone): Unit = {
    sp.takePhoto()
    sp.makeCall()
}
```

Inside the `useSmartDevice` method, the compiler guarantees that the argument will adhere to both the Camera and the Phone APIs, so you can use both types' methods inside. The intersection type will also act as a type restriction, so we need to mix in both traits if we are to use this method properly:

```scala
class Smartphone extends Camera with Phone

useSmartDevice(new Smartphone) // cool!
```

Naturally, an intersection type will be a subtype of both types involved.

An interesting question that might come up is: what if the two types share a method definition? The answer is that the compiler doesn't care. The real type that will be passed to such a method will need to solve the conflict. In other words, the real type that will be used will only have a single implementation of that method, so there will be no conflict at the call site. We're going to address the exact ways Scala solves this problem and the diamond problem with trait linearization in another article.

Another interesting question is: what if the two types share a method signature except the returned types? Assume we have the modules below:

```scala
trait HostConfig
trait HostController {
    def get: Option[HostConfig]
}

trait PortConfig
trait PortController {
    def get: Option[PortConfig]
}
```

And assume we want to mix them in our main web server:

```scala
def getConfigs(controller: HostController & PortController) = controller.get
```

First question: does this code even compile?

Yes, it does. The `get` method is common between the two types, so we should be able to use it.

Second question: what type does the new `get` method return? What type does this big `getConfigs` method return?

This is a tricky one. Because the argument is of type `HostController & PortController`, any real type that can extend both HostController and PortController must implement the `get` method such that it returns both an `Option[HostConfig]` and `Option[PortConfig]`. The only solution is to make `get` return `Option[HostConfig] & Option[PortConfig]`. The compiler is able to figure this out, and you can be explicit about it:

```scala
def getConfigs(controller: HostController & PortController)
    : Option[HostConfig] & Option[PortConfig]
    = controller.get
```

Third question: does an intersection type play nice with variance?

Yes, it does. Because Option is covariant, it means that subtyping between Options matches the subtyping between generic types. In other words, `Option[A] & Option[B]` is the same as `Option[A & B]`. We can also change our method as such:

```scala
def getConfigs(controller: HostController & PortController)
    : Option[HostConfig & PortConfig]
    = controller.get
```

And the code still compiles.

## Conclusion

We explored 2 new types that Scala 3 brings to the table: intersection types and union types. Combined with literal types which were released with Scala 2.13, we are going to see much more powerful and expressive APIs real soon.

Let me know if you liked this article, and I'll write more articles on Scala 3!
