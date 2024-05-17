---
title: "Scala Testing with ScalaTest: Test Styles for Beginners"
date: 2021-05-17
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, testing]
excerpt: "In this article, we'll go through the major testing styles with Scala and ScalaTest, and we'll understand what 'FunSuite', 'FlatSpec' etc mean."
---

In this article, we'll learn the various testing styles of Scala with ScalaTest, one of the most important testing frameworks for Scala. You'll see how to structure your tests, how to describe behaviors, and how to make the distinction between all those FlatSpecs.

This article is beginner-friendly and runs on **both Scala 2 and Scala 3** exactly as it is. No modification needed.

## 1. Background

For the longest time, I never paid any attention to ScalaTest and the various testing structures. Whatever I found in my project, e.g. FlatSpecs, I kept writing those. If I found FunSpecs, I kept writing those.

This article makes the distinction between various testing approaches with ScalaTest, with a few clear examples for each. As much as possible, I'll keep the same examples throughout, so you can make the difference between testing styles with Scala and ScalaTest.

To write code with me in this article, you'll need to add the ScalaTest libraries to your SBT project in the `build.sbt` file:

```scala
libraryDependencies ++= Seq(
  "org.scalactic" %% "scalactic" % "3.2.7",
  "org.scalatest" %% "scalatest" % "3.2.7" % "test"
}
```

We'll write our tests in the `src/test/scala` folder in the SBT project.

For the purposes of this article, we'll be testing a simple Calculator object that we can create really quickly:

```scala
class Calculator {
  def add(a: Int, b: Int) = a + b
  def subtract(a: Int, b: Int) = a - b
  def multiply(a: Int, b: Int) = a * b
  def divide(a: Int, b: Int) = a / b
}
```

Because adding and subtracting are simple, we'll focus on a few examples related to multiplication and division.

## 2. Simple Unit Tests: FunSuites

This style of testing is straightforward. Each test comes with its own description and its own body. This is the style of JUnit, MUnit or other unit testing frameworks that use this same structure. Here is an example of a suite that tests for

- multiplication with 0 should always be 0
- division by 0 should throw a math error

```scala
import org.scalatest.funsuite.AnyFunSuite

class CalculatorSuite extends AnyFunSuite {

  val calculator = new Calculator

  test("multiplication with 0 should always give 0") {
    assert(calculator.multiply(572389, 0) == 0)
    assert(calculator.multiply(-572389, 0) == 0)
    assert(calculator.multiply(0, 0) == 0)
  }

  test("dividing by 0 should throw a math error") {
    assertThrows[ArithmeticException](calculator.divide(57238, 0))
  }
}
```

In ScalaTest, `FunSuites` are used for JUnit-like, independent tests.

## 3. Structured, Nested, Described Tests: FunSpecs

This style of testing is focused on testing specifications, i.e. behaviors. It still doesn't use the full expressiveness of Scala, but now we have more powerful testing structures:

- we can nest tests into one another
- we can add pinpoint descriptions to particular tests

```scala
import org.scalatest.funspec.AnyFunSpec

class CalculatorSpec extends AnyFunSpec {
  val calculator = new Calculator

  // can nest as many levels deep as you like
  describe("multiplication") {
    it("should give back 0 if multiplying by 0") {
      assert(calculator.multiply(572389, 0) == 0)
      assert(calculator.multiply(-572389, 0) == 0)
      assert(calculator.multiply(0, 0) == 0)
    }
  }

  describe("division") {
    it("should throw a math error if dividing by 0") {
      assertThrows[ArithmeticException](calculator.divide(57238, 0))
    }
  }
}
```

In ScalaTest, `FunSpecs` are used for structured, descriptive tests. The style is still similar to the above FunSuites, but we are now moving towards testing behaviors (BDD), which is more powerful and easy to reason about in large codebases.

## 4. Structured, Nested, Expressive Testing: WordSpecs

Still in the Spec world (BDD), this style of testing takes more advantage of the expressiveness of the Scala language. The tests look more like natural language through the use of "keyword"-methods e.g. `should`, `must`, etc. A test in the word-spec style looks like this:

```scala
import org.scalatest.freespec.AnyFreeSpec

class CalculatorWordSpec extends AnyWordSpec {
  val calculator = new Calculator

  "A calculator" should {
    "give back 0 if multiplying by 0" in {
      assert(calculator.multiply(653278, 0) == 0)
      assert(calculator.multiply(-653278, 0) == 0)
      assert(calculator.multiply(0, 0) == 0)
    }

    "throw a math error if dividing by 0" in {
      assertThrows[ArithmeticException](calculator.divide(653278, 0))
    }
  }
}
```

The beauty of this style of testing is that we can still nest tests inside one another, so that in the end we get a massive suite of tests that perfectly describe what our code-under-test is supposed to do and when.

Expressiveness aside, this testing style enforces a relatively strict testing structure, thereby aligning all team members to the same testing convention.

## 5. The Expressive Testing, No Constraints: FreeSpecs

This style of testing is very similar to word specs, in the sense that the tests can be read like natural language. Besides that, the testing structure is now free of constraints (hence the Free name prefix): we can nest them, we can create predefined test preparations, we can nest on different levels, etc. This test is still in the behavior (BDD) world, hence the Spec name.

A test suite in the free-spec style looks like this:

```scala
class CalculatorFreeSpec extends AnyFreeSpec {
  val calculator = new Calculator

  "A calculator" - { // anything you want
    "give back 0 if multiplying by 0" in {
      assert(calculator.multiply(653278, 0) == 0)
      assert(calculator.multiply(-653278, 0) == 0)
      assert(calculator.multiply(0, 0) == 0)
    }

    "throw a math error if dividing by 0" in {
      assertThrows[ArithmeticException](calculator.divide(653278, 0))
    }
  }
}
```

In this style, the `-` operator takes the significance of any previous keyword in the word-spec style. It can mean anything, which makes this ScalaTest testing style very powerful and flexible.

## 6. Property Checks: PropSpec

ScalaTest is able to structure behavior (BDD) tests in the style of properties. Using PropSpec and some prepared examples, we can do just that:

```scala
import org.scalatest.propspec.AnyPropSpec

class CalculatorPropSpec extends AnyPropSpec {
  val calculator = new Calculator

  val multiplyByZeroExamples = List((653278, 0), (-653278, 0), (0, 0))

  property("Calculator multiply by 0 should be 0") {
    assert(multiplyByZeroExamples.forall{
      case (a, b) => calculator.multiply(a, b) == 0
    })
  }

  property("Calculator divide by 0 should throw some math error") {
    assertThrows[ArithmeticException](calculator.divide(653278, 0))
  }
}
```

In this testing style, we now have access to the `property` method which creates an independent test. For us, that means a comprehensive test that fully covers a property of the subject-under-test. This Scala testing style is particularly useful when examples are generated programmatically and laying out 1000 tests manually would make our tests unreadable (and perhaps slow).

ScalaTest also has other tools to help create properties and test them automatically, but that's a subject for a future article.

## 7. The Wonky Tests: RefSpecs

This testing style is rare, but it's still worth mentioning.

A Scala language feature I use to make the students of my [beginners course](https://rockthejvm.com/p/scala) shout "Scala is cool" is infix methods, which make Scala look like plain English. The thing I show right after that is multi-word variable/method names. Not all Scala devs know that we can create a variable with the name `rock the jvm`, just like this:

```scala
val `rock the jvm` = 42
```

This definition is valid, as the backtics isolate the name of this identifier. The same goes for class names and for method names.

With that intro out of the way, let's talk about testing. RefSpecs are a BDD-style testing structure where the testing suite is described in plain language as an `object` whose name is written with backticks. An example with our calculator would look like this:

```scala
import org.scalatest.refspec.RefSpec

class CalculatorRefSpec extends RefSpec { // based on reflection
  object `A calculator` {
    val calculator = new Calculator

    def `multiply by 0 should be 0`: Unit = {
      assert(calculator.multiply(653278, 0) == 0)
      assert(calculator.multiply(-653278, 0) == 0)
      assert(calculator.multiply(0, 0) == 0)
    }

    def `should throw a math error when dividing by 0`: Unit = {
      assertThrows[ArithmeticException](calculator.divide(653278, 0))
    }
  }
}
```

The object `A calculator` is a test suite, where each method is a test case. When we run this test, ScalaTest will inspect the RefSpec via reflection and turn the objects into test suites and methods into independent tests.

## 8. Conclusion

This beginner-friendly article introduced the various testing styles of Scala with ScalaTest. We learned how we can define independent tests, how to create nested tests in different styles, how to use Scala's expressiveness to write DSL-like tests, plus some wonky things at the end. Enjoy Scala testing!
