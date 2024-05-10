---
title: "Scala CLI Tutorial: Creating a CLI Sudoku Solver"
date: 2023-01-09
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala 3, cats, scala-native, scala-cli]
excerpt: "Scala CLI is a great tool for prototyping and building Scala applications. We'll use `scala-cli`, `Scala Native` and `decline` to build a brute-force sudoku solver."
---

_This article is brought to you by [Antonio Gelameris](https://github.com/TonioGela). Antonio is an alumnus of Rock the JVM, now a senior Scala developer with his own contributions to Scala libraries and junior devs under his mentorship.
Which brings us to this article: Antonio originally started from my [Sudoku backtracking](/sudoku-backtracking) article and built a Scala CLI tutorial for the juniors he's mentoring. Now, he's sharing his process with us._

_Enter Antonio:_

## 1. Introduction

[Sudoku](https://en.wikipedia.org/wiki/Sudoku) is a notorious combinatorial puzzle solvable with optimised and efficient algorithms. Today we won't focus on any of those techniques, but we'll leverage the computing power of our machines to brute-force the solution in a functional immutable fashion.

The Scala ecosystem has many fantastic tools and libraries to help us synthesise the solution and package our solver in an ultra-fast native executable with instant startup time using our favourite language and its expressive power. To implement our solution, I chose [scala-cli](https://scala-cli.virtuslab.org/) to structure the project and to compile it with [Scala Native](https://scala-native.org/en/stable/), [decline](https://ben.kirw.in/decline/) to parse command line arguments and [cats](https://typelevel.org/cats/) for its purely functional approach.

## 2. Scala-CLI: your best command line buddy

[Scala CLI](https://scala-cli.virtuslab.org/) is a recent command line tool by [VirtusLab](https://virtuslab.org/) that lets you interact with Scala in multiple ways. One of its most valuable features is the support to create single-file scripts that can use any Scala dependency and be packaged in various formats to run everywhere.

Once [installed](https://scala-cli.virtuslab.org/install), let's write a simple hello world application in a `.scala` file :

```scala
/* Hello.scala */
object Hello {
  def main(args: Array[String]): Unit = println("Hello from scala-cli")
}
```

and run it using `scala-cli run Hello.scala`

```shell
$ scala-cli run Hello.scala
# Compiling project (Scala 3.2.0, JVM)
# Compiled project (Scala 3.2.0, JVM)
Hello from scala-cli
```

Scala CLI, by default, downloads the latest scala version and uses the available JVM installed on your system unless you specify otherwise.

```shell
$ scala-cli run Hello.scala --jvm "temurin:11" --scala "2.13.10"
# Downloading JVM temurin:11
# Compiling project (Scala 2.13.10, JVM)
# Compiled project (Scala 2.13.10, JVM)
Hello from scala-cli
```
The best way to customise its default behaviour is through Scala CLI's [using Directives](https://scala-cli.virtuslab.org/docs/guides/using-directives).

### 2.1 Directives
Let's say that for the purposes of our script, a library like [PPrint](https://github.com/com-lihaoyi/PPrint) might be convenient. With directives, it's possible to declare it as our script's dependency and to specify both the JVM and Scala versions we intend to run our script with:

```scala
/* Maps.scala */
//> using scala "2.13.10"
//> using jvm "temurin:11"
//> using lib "com.lihaoyi::pprint::0.6.6"

object Maps {
  def main(args: Array[String]): Unit =
    println("Maps in Scala have the shape " + pprint.tprint[Map[_,_]])
}
```

Now it's possible to execute the script with no additional command line flags

```shell
$ scala-cli run Hello.scala
# Compiling project (Scala 2.13.10, JVM)
# Compiled project (Scala 2.13.10, JVM)
Maps in Scala have the shape Map[_, _]
```

Through directives you can, for example:
- add java options or compiler flags
- declare tests
- change the compilation target
- package the application as a fat jar or as a script that downloads all the required dependencies

and much more. For a complete reference, see [Directives](https://scala-cli.virtuslab.org/docs/reference/scala-command/directives).

### 2.2. Updating dependencies

As some of you may have noticed, the `pprint` library version in the example is not the newest one: at the time of writing, the most recent version is 0.8.0. Luckily we're not forced to _check it manually on Github or Maven Central_ since scala-cli exposes the `dependency-update` command that will fetch the last version of each dependency and print a command to update them all.

```shell
$ scala-cli dependency-update Maps.scala
Updates
   * com.lihaoyi::pprint::0.6.6 -> 0.8.0
To update all dependencies run:
    scala-cli dependency-update --all

$ scala-cli dependency-update --all Maps.scala
Updated dependency to: com.lihaoyi::pprint::0.8.0

$ head -3 Maps.scala
//> using scala "2.13.10"
//> using jvm "temurin:11"
//> using lib "com.lihaoyi::pprint::0.8.0"
```

### 2.3. IDE support

Writing Scala code without the help of a fully-fledged IDE is okay if you're writing a "Hello world" application or similar, but for a _"complete programming experience"_ using one of the IDE alternatives &mdash; at the moment either IntelliJ or a Metals-compatible one &mdash; is recommended. Scala CLI can help you set up your IDE of choice by generating the necessary files to provide full-blown IDE support.

The [setup-ide](https://scala-cli.virtuslab.org/docs/commands/setup-ide) command is run before every `run`, `compile` or `test` but it can be invoked manually like:

```shell
$ scala-cli setup-ide Maps.scala
```

resulting in the generation of 2 files that both Metals and IntelliJ use to provide all their functionalities.

```shell
.
├── .bsp
│  └── scala-cli.json
├── .scala-build
│  └── ide-inputs.json
└── Maps.scala
```

Opening the _enclosing folder_ in your Metals-enabled editor or importing it in IntelliJ will provide you with the Scala IDE experience you're used to.

### 2.4. Formatting

Our developer experience can't be complete without a properly configured formatter. Luckily scala-cli can run [scalafmt](https://scalameta.org/scalafmt/) with `scala-cli fmt Maps.scala`. A `.scalafmt.conf` file in the project's root folder will let you customize the default formatting behaviour (add `--save-scalafmt-conf` to save locally the default configuration if needed).

Now that we have a working IDE, we can begin modelling the problem and its solution.

## 3. Modeling a Sudoku Board

Since sudoku consists of 9 lines of 9 digits from 1 to 9, one of the ways to encode and store the information in a case class is wrapping a `Vector[Int]`. So in a newly created `Sudoku.scala` file, we'll define

```scala
/* Sudoku.scala */
//> using scala "3.2.1"

final case class Sudoku private (data: Vector[Int])
```

We made the constructor private to avoid `Sudoku` getting instantiated outside its companion object, where we will soon create a "factory" method named `from`.

Since we plan to read sudoku boards from the command line, it's reasonable to imagine a factory method that accepts a `String` and returns a `Sudoku` or a data structure that may contain either a `Sudoku` or a way to signal an error (like an error `String` to log in case of validation errors).

```scala
/* Sudoku.scala */
//> using scala "3.2.1"

final case class Sudoku private (data: Vector[Int])

object Sudoku {

  def from(s: String): Either[String, Sudoku] = ???
}
```

To implement the method, we'll leverage some utility functions that [Cats](https://typelevel.org/cats/) provide.

```scala
/* Sudoku.scala */
//> using scala "3.2.1"
//> using lib "org.typelevel::cats-core::2.9.0"

import cats.syntax.all.*

final case class Sudoku private (data: Vector[Int])

object Sudoku {

  def from(s: String): Either[String, Sudoku] =
    s.replace('.', '0')
      .asRight[String]
      .ensure("The sudoku string doesn't contain only digits")(
        _.forall(_.isDigit)
      )
      .map(_.toVector.map(_.asDigit))
      .ensure("The sudoku string is not exactly 81 characters long")(
        _.length === 81
      )
      .map(Sudoku.apply)
}
```

Let's examine the `from` function line by line:
- `s.replace('.', '0')` replaces the `.`s with `0`s to signal the lack of a digit using a value that belongs to type `Int`. Replacing `.` is necessary since we'll use [this generator](https://qqwing.com/generate.html) with "Output format: One line", getting an input value like `8...1...2.7...931.....485...2....8.91..2....3.........7...9...1.5...1.....3.7.29.` that represents the 81 digits of the board.
- `.asRight[String]` is the first cats utility that we'll use. Defined as

  ```scala
  def asRight[B]: Either[B, A] = Right(a)
  ```

  it is an extension method over `a: A`. It wraps the value in a `Right` but requires a type argument `B` to widen the result declaration to `Either[B,A]`. This way, the result will not have type `Right[String]` but `Either[String, String]`, letting us use other utility functions defined over `Either[_,_]`.
- `.ensure("The sudoku string doesn't contain only digits")(_.forall(_.isDigit))` uses the extension method `ensure`, a guard function that filters either in the case is a `Right` and returns the content of the first parenthesis in case of errors. Its definition (where `eab` is the extended value) is
  ```scala
  def ensure(onFailure: => A)(condition: B => Boolean): Either[A, B] = eab match {
    case Left(_)  => eab
    case Right(b) => if (condition(b)) eab else Left(onFailure)
  }
  ```
  In this particular case, we use to check that all the characters in the string (`forall`) are digits (`isDigit`) otherwise, we return a `Left("The sudoku string doesn't contain only digits")` to signal the error, short-circuiting all the following validations.
- `.map(_.toVector.map(_.asDigit))` maps over the `Either[String,String]` to transform its content (when it's a `Right`) and then we map every `Char` into an `Int` `map`ping over the vector. (Note: we use `asDigit` and not `toDigit` as we want to interpret the literal value of the `Char` as a digit and not its internal representation)
- Using the same `ensure` function we check that the string has the correct length
- Finally, we map the `Either[String, Vector[Int]]` into an `Either[String, Sudoku]` calling `Sudoku`'s constructor, that here in the companion object is accessible.

The main strength of the `from` function is that it won't let us create a `Sudoku` if the input doesn't comply with a set of minimum requirements needed to fully and correctly describe a `Sudoku`. This approach, sometimes called ["Parse, don't validate"](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/), might not seem like a big deal. Still, it enables us to write functions and extension methods that use `Sudoku` as parameters and are not required to perform any validation. `Sudoku`s are now impossible to create without using a valid input: we made invalid `Sudoku`s impossible to represent.

## 4. Adding utility methods

Our `Sudoku` case class is pretty much useless without any function using it, so let's write a few methods that might help us solve the problem. Since each number in each cell is _row_, _column_ and _cell_ constrained, it makes sense to code a way to extract those pieces of information from the case class.

```scala
/* Sudoku.scala */
//> using scala "3.2.1"
//> using lib "org.typelevel::cats-core::2.9.0"

import cats.syntax.all.*

final case class Sudoku private (data: Vector[Int]) {

  def get(x: Int)(y: Int): Int = data(y * 9 + x)

  def getRow(y: Int): Vector[Int] = data.slice(y * 9, (y + 1) * 9)

  def getColumn(x: Int): Vector[Int] = (0 until 9).toVector.map(get(x))

  def getCellOf(x: Int)(y: Int): Vector[Int] = {
    def span(n: Int): Vector[Int] = {
      val x: Int = (3 * (n / 3))
      Vector(x, x + 1, x + 2)
    }

    for {
      b <- span(y)
      a <- span(x)
    } yield get(a)(b)
  }
}

object Sudoku {

  def from(s: String): Either[String, Sudoku] = /* ... */
}
```

> Note: We added these methods to the case class itself, but another option we could have chosen is to add this logic in an [extension](https://docs.scala-lang.org/scala3/book/ca-extension-methods.html). Creating an extension over the `Sudoku` datatype will let us call the methods defined in it as if they were methods of the `Sudoku` class.
> ```scala
> object Sudoku {
>
>   extension (s: Sudoku) {
>     def get(x: Int)(y: Int): Int = /* ... */
>     def getRow(y: Int): Vector[Int] = /* ... */
>     /* ... */
>   }
> }
>
> sudoku.get(0)(0)
> ```
> Extending may be preferable since it keeps data separated from the logic that manipulates them (enforcing some [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)), and since it's possible over data types not part of your codebase, like standard library types or data types coming from a library. This approach shines when the extension depends on a [typeclass](https://docs.scala-lang.org/scala3/book/ca-type-classes.html), since extending the type class for a new type `T` (i.e. adding a "*case*") you get a custom syntax over `T` for free.
>
> On the other hand, defining new methods in the class (or in a trait) is easier if you intend to add new operations to that specific type (or trait). Pros and cons of the _type class_ vs _inheritance_ approach to the [Wadler's expression problem](https://en.wikipedia.org/wiki/Expression_problem) will be discussed in a future article.

## 5. Testing

Now that we have some APIs over `Sudoku`, it makes sense to test them out before trying to solve the problem further. [Scala-cli supports testing](https://scala-cli.virtuslab.org/docs/commands/test) out of the box and detects test files in several ways. The easiest one to leverage is using the `.test.scala` extension, ideal when you have a single source file like `foo.scala` and its testing companion `foo.test.scala`.

A more structured way to set up a project is to separate the source files from the test ones, maybe in different folder trees, using a slightly more complex project structure that [scala-cli supports](https://scala-cli.virtuslab.org/docs/reference/root-dir).

```shell
.
├── src
│  └── Sudoku.scala
├── test
│  └── SudokuSpec.scala
└── project.scala
```

This structure auto-detects *test classes* using the files' relative path: if the file's path contains the string `"test"`, it will be treated as a test class. To test the application, we will declare munit in the `project.scala` file that now contains all the directives previously in `Sudoku.scala`.

```scala
/* project.scala */
//> using scala "3.2.1"
//> using lib "org.typelevel::cats-core::2.9.0"
//> using lib "com.monovore::decline::2.4.1"
//> using lib "org.scalameta::munit::0.7.29"
```

```scala
/* src/Sudoku.scala */
import cats.syntax.all.*

final case class Sudoku private (data: Vector[Int]) { /* ... */ }

object Sudoku { /* ... */ }
```

```scala
/* test/SudokuSpec.scala */
import munit.*
import cats.syntax.all.*

class SudokuSpec extends FunSuite {

  // format: off
  val maybeSudoku = Sudoku.from(
    "435269781" +
    "682571493" +
    "197834562" +
    "826195347" +
    "374682915" +
    "951743628" +
    "519326874" +
    "248957136" +
    "763418259"
  )
  // format: on

  val sudokuF: FunFixture[Sudoku] = FunFixture(_ => maybeSudoku.fold(failSuite(_), identity), _ => ())

  /* Tests here! */

}
```

To easily have a `Sudoku` instance available for easy unit testing, we used `FunFixture`. `FunFixture` is one of the [available fixtures](https://scalameta.org/munit/docs/fixtures.html) that munit provides to acquire and release resources and to share them between single tests or whole suites. We coded `sudokuF` to fail the entire suite if the `Sudoku` is trying to instantiate is invalid and to give it to the fixture user otherwise.

Now we can define tests using the munit's simple syntax:

```scala
sudokuF.test("Sudoku.get(x,y) should extract the number at (x,y) (0 based, from top left)") { sudoku =>
  assertEquals(sudoku.get(0)(0), 4)
  assertEquals(sudoku.get(1)(0), 3)
  assertEquals(sudoku.get(2)(7), 8)
}

sudokuF.test("Sudoku.getRow(n) should extract nth row from top") { sudoku =>
  assertEquals(sudoku.getRow(0), Vector(4, 3, 5, 2, 6, 9, 7, 8, 1))
  assertEquals(sudoku.getRow(6), Vector(5, 1, 9, 3, 2, 6, 8, 7, 4))
}

sudokuF.test("Sudoku.getColumn(n) should extract nth column from left") { sudoku =>
  assertEquals(sudoku.getColumn(0), Vector(4, 6, 1, 8, 3, 9, 5, 2, 7))
  assertEquals(sudoku.getColumn(6), Vector(7, 4, 5, 3, 9, 6, 8, 1, 2))
}

sudokuF.test("Sudoku.getCellOf(n) should extract the correct cell") { sudoku =>
  assert(sudoku.getCellOf(1)(1).forall((1 to 9).contains))
  assert(sudoku.getCellOf(7)(3).forall((1 to 9).contains))
}
```

and test our implementation using the `test` command of scala-cli:

```shell
$ scala-cli test .
SudokuSpec:
  + Sudoku.get(x,y) should extract the number at (x,y) (0 based, from top left) 0.037s
  + Sudoku.getRow(n) should extract nth row from top 0.002s
  + Sudoku.getColumn(n) should extract nth column from left 0.001s
  + Sudoku.getCellOf(n) should extract the correct cell 0.003s
```

## 6. Recursive immutable solution

To solve the sudoku, we will use a recursive brute-forcing algorithm:

1. Given a sudoku board, we will search for a zero
2. For each zero, we will find all the numbers that fit in that position according to the constraints
3. For each of those numbers, we will generate a new sudoku replacing the zero with it
4. We will apply the three previous steps to every sudoku we have created so far until there are no more zeros
5. We will end up with a list of solved sudoku boards that we will return to the user

We will need to implement a couple of methods over `Sudoku` to implement this solution:

```scala
final case class Sudoku private (data: Vector[Int]) {

  /* ... */

  // None will signal the lack of zeros, so a complete sudoku.
  // Since -1 means that indexWhere hasn't found zeros we remap
  // it to None using filterNot.
  def getZero: Option[(Int, Int)] = Option(data.indexWhere(_ === 0))
    .filterNot(_ === -1)
    .map(i => (i % 9, i / 9))

  // This is the method that checks if the cell, row and
  // column constraints are satisfied for a certain value
  def fitsInPlace(x: Int, y: Int)(value: Int): Boolean =
    !(getCellOf(x)(y).contains(value) || getRow(y).contains(value) || getColumn(x).contains(value))

  def set(x: Int, y: Int)(value: Int): Sudoku = Sudoku(
    data.updated(y * 9 + x, value)
  )
}
```

Let's try to implement the algorithm using the newly created methods. The function should accept a `Sudoku` and return all the possible solved ones, so the method signature is easy to write:

```scala
def solve(s: Sudoku): List[Sudoku] = ???
```

The first step is searching for zero, and we wrote a method for that:

```scala
def solve(s: Sudoku): List[Sudoku] = s.getZero match {
  case None => ???
  case Some((x,y)) => ???
}
```

Since `getZero` returns a `None` in the case there are no more zeros in the sudoku, it means that `s` is solved, so we can return it to the caller, wrapping it in a `List` to comply with the function signature:

```scala
def solve(s: Sudoku): List[Sudoku] = s.getZero match {
  case None => s :: Nil
  case Some((x,y)) => ???
}
```

In case `getZero` returns the coordinates of a zero, we have to calculate all the possible numbers that fit in that cell according to the constraints and return the list of the corresponding sudoku boards (with that zero replaced by a possible number). Since there are multiple ways to implement this logic, it makes sense to wrap it in a standalone function `calcStep`.

Bear in mind that since this function returns a list of sudoku boards that satisfy some constraints, it may return an empty list. So this function is in charge of skimming the unsolvable boards from the list.

```scala
def solve(s: Sudoku): List[Sudoku] = s.getZero match {
  case None => s :: Nil
  case Some((x,y)) => calcStep(x, y)(s)
}

def calcStep(x: Int, y: Int)(s: Sudoku): List[Sudoku] = 1
  .to(9)
  .filter(s.fitsInPlace(x, y))
  .map(s.set(x, y))
  .toList
```

The function consists of 2 steps: filtering out from the 1 to 9 range the numbers that don't satisfy the constraints and getting a new `Sudoku` for each one that does.

Now that the solving step has been implemented, it's time to add some recursion to find the solutions. Since the sudoku boards that `calcStep` returns might still have zeros, it makes sense to re-submit them to the `solve` function. Since we have a `List[Sudoku]` and `solve` returns a `List[Sudoku]` as well, the easiest way to chain the `solve` function to itself is using `flatMap`:

```scala
def solve(s: Sudoku): List[Sudoku] = s.getZero match {
  case None => s :: Nil
  case Some((x,y)) => calcStep(x, y)(s).flatMap(solve)
}

def calcStep(x: Int, y: Int)(s: Sudoku): List[Sudoku] = 1
  .to(9)
  .filter(s.fitsInPlace(x, y))
  .map(s.set(x, y))
  .toList
```

A fancier way to write this solution, leveraging some `cats` aliases and using `fold`, is the following:

```scala
def solve(s: Sudoku): List[Sudoku] = s.getZero.fold(s :: Nil) {
  case (x, y) => calcStep(x, y)(s) >>= solve
}
```

## 7. Creating the command line application

Now that we've built the core of the logic, it's time to wire it to create a command line application. The chosen library for command line argument parsing is [decline](https://ben.kirw.in/decline/). We will place the argument parsing logic and the application entry point in their own `Main.scala` file.

```shell
.
├── src
│  ├── Main.scala
│  └── Sudoku.scala
├── test
│  └── SudokuSpec.scala
└── project.scala
```

The decline API to define a command line argument parser is called `Opts`. `Opts` features a few [basic options](https://ben.kirw.in/decline/usage.html#basic-options) to combine to determine the command line API of your application:

- `Opts.argument[T]` to define a mandatory argument that MUST be passed to you application
- `Opts.option[T]` to modify the program's behaviour and that require a value (like `-n 10`)
- `Opts.flag` that are identical to `option` but don't require a value (like `-l` or `--verbose`)
- `Opts.env[T]` to read environment variables

Each of these options has an "s-terminating" alternative (like `Opts.arguments[T]`) that will parse multiple instances of the defined option. Decline features [commands and subcommands](https://ben.kirw.in/decline/usage.html#commands-and-subcommands), but they're out of scope for the sake of this post.

Since our application's solving logic must receive a `Sudoku` we will write a `Opts[Sudoku]` definition:

```scala
/* src/Main.scala */
import com.monovore.decline.*
import cats.syntax.all.*
import Sudoku.*

val sudokuArgument: Opts[Sudoku] =
  Opts.argument[String]("sudoku").mapValidated(Sudoku.from(_).toValidatedNel)
```

The definition starts from a string argument that gets parsed to create a `Sudoku`. Decline offers the `mapValidated` method, that accepts a `String => ValidatedNel[String, Sudoku]` function that should convert the provided string to a Sudoku. The returned data type is a [Validated](https://typelevel.org/cats/datatypes/validated), an `Either`-like structure offered by cats that doesn't form a monad and that is [particularly suited for error accumulation](https://typelevel.org/cats/datatypes/validated#parallel-validation). Luckily we can convert from `Either[A,B]` to `Validated[NonEmptyList[A],B]` using an extension method.

To use the newly defined `sudokuArgument` we must extend [CommandApp](https://ben.kirw.in/decline/usage.html#using-commandapp), to wire up our app's `main` method:

```scala
/* src/Main.scala */
import com.monovore.decline.*
import cats.syntax.all.*
import Sudoku.*

val sudokuArgument: Opts[Sudoku] =
  Opts.argument[String]("sudoku").mapValidated(Sudoku.from(_).toValidatedNel)

object Main extends CommandApp(
  name = "sudokuSolver",
  header = "Solves sudokus passed as 81 chars string with . or 0 in place of empty cells",
  main = sudokuArgument.map(sudoku => println(sudoku.asPrettyString))
)
```

having this definition of `asPrettyString`:

```scala
  def asPrettyString: String = {
    def showRow(a: Vector[Int]): String =
      a.grouped(3).map(_.mkString).mkString("│")

    (0 until 9)
      .map(getRow)
      .map(showRow)
      .grouped(3)
      .map(_.mkString("\n"))
      .mkString("\n───┼───┼───\n")
  }
```

Now we can run our application using scala-cli:

```shell
$ scala-cli run .
Missing expected positional argument!

Usage: sudokuSolver <sudoku>

Solves sudokus passed as 81 chars string with . or 0 in place of empty cells

Options and flags:
    --help
        Display this help text.

$ scala-cli run . -- "483591267957268431621473895879132654164985372235647918792314586348756129516829743"
483│591│267
957│268│431
621│473│895
───┼───┼───
879│132│654
164│985│372
235│647│918
───┼───┼───
792│314│586
348│756│129
516│829│743
```

Every argument that we will decide to support in the future will be documented in the `--help` output of our application.
To solve the passed sudoku we must call the `solve` method on it and print both the success and failure cases to stdout and stderr, respectively.

```scala
/* src/Main.scala */
import com.monovore.decline.*
import cats.syntax.all.*
import Sudoku.*

val sudokuArgument: Opts[Sudoku] =
  Opts.argument[String]("sudoku").mapValidated(Sudoku.from(_).toValidatedNel)

object Main extends CommandApp(
  name = "sudokuSolver",
  header = "Solves sudokus passed as 81 chars string with . or 0 in place of empty cells",
  main = sudokuArgument.map(sudoku =>
    sudoku.solve.headOption.fold { // We will print the first solution only
      System.err.println("Sudoku not solvable"); System.exit(1)
    } {
      s => System.out.println(s); System.exit(0)
    }
  )
)
```

## 8. Packaging as an executable file

It's time to use scala-cli to [package](https://scala-cli.virtuslab.org/docs/cookbooks/scala-package) our application. By default, scala-cli packages in a [lightweight format](https://scala-cli.virtuslab.org/docs/cookbooks/scala-package) that contains only your bytecode. To run the application, the `java` command needs to be available, and access to the internet, if dependencies need to be downloaded. Adding `//> using packaging.output "sudokuSolver"` to `project.scala` will let us control the filename of the produced executable file.

```shell
$ scala-cli package .
Wrote /Users/toniogela/repo/sudoku/sudokuSolver, run it with
  ./sudokuSolver

$ ./sudokuSolver "....47......5.....9.483..15.19.7...4...3.9.21.3...5.7......8....78.2..3...1.5.4.."
185│247│963
763│591│248
924│836│715
───┼───┼───
819│672│354
457│389│621
236│415│879
───┼───┼───
342│168│597
578│924│136
691│753│482

$ ./sudokuSolver "foo"
The sudoku string doesn't contain only digits

Usage: sudokuSolver <sudoku>

Solves sudokus passed as 81 chars string with . or 0 in place of empty cells

Options and flags:
    --help
        Display this help text.
```

Running `sudokuSolver` on a fresh machine featuring only a Java installation will automagically download every dependency needed to run your code, plus macOS and Linux executables are portable between these two operating systems, maximising the "shareability" of your application package 😍.

## 9. Benchmarking and Scala Native

Now that we have a universal-ish binary that can run virtually anywhere there's a java installation, it's time for some benchmarking. To benchmark the time, our command line app takes to solve a specific sudoku we'll use [hyperfine](https://github.com/sharkdp/hyperfine), an awesome command-line benchmarking tool written in Rust.

```shell
$ SUDOKU="....47......5.....9.483..15.19.7...4...3.9.21.3...5.7......8....78.2..3...1.5.4.."

$ hyperfine --warmup 20 -N "./sudokuSolver ${SUDOKU}"
Benchmark 1:
  Time (mean ± σ):     855.4 ms ±   8.7 ms    [User: 1738.1 ms, System: 102.3 ms]
  Range (min … max):   845.6 ms … 870.3 ms    10 runs
```

Running 20 warmup tests and avoiding spawning the command in a subshell (using `-N`) to reduce the number of statistical outliers, we get a mean resolution time of `855.4 ms`, which is a good, but not so good time.

To get a considerable performance increase, we will leverage [Scala Native](https://scala-native.org/en/stable), an optimising ahead-of-time compiler and lightweight managed runtime specifically designed for Scala. To use libraries with Scala Native, they must be built specifically for it, and recently [several major Typelevel projects were published for it](https://typelevel.org/blog/2022/09/19/typelevel-native.html). Luckily for us, the list includes cats and decline, so we can seamlessly compile our application to native code.

To achieve it, we can add a few directives to `project.scala`:
- `//> using platform "scala-native"` to toggle the native compilation
- `//> using nativeMode "release-full"` to choose a release mode optimised for performance
- `//> using nativeGc "none"` to disable the garbage collector completely: this is an opinionated but safe choice since our app is a short-lived one

Tweaking the `packaging.output` directive to rename the executable to `"sudokuNativeSolver"` and waiting for a while ("release-full" mode will significantly increase compilation times) will result in a native executable:

```shell
$ scala-cli package -f .
Compiling project (Scala 3.2.1, Scala Native)
Compiled project (Scala 3.2.1, Scala Native)
[info] Linking (3057 ms)
[info] Discovered 2011 classes and 13735 methods
[info] Optimizing (release-full mode) (73201 ms)
[info] Generating intermediate code (9415 ms)
[info] Produced 1 files
[info] Compiling to native code (110000 ms)
[info] Total (196293 ms)
Wrote /Users/toniogela/Downloads/sudoku/sudokuNativeSolver, run it with
  ./sudokuNativeSolver

$ SUDOKU="....47......5.....9.483..15.19.7...4...3.9.21.3...5.7......8....78.2..3...1.5.4.."

$ ./sudokuNativeSolver $SUDOKU
185│247│963
763│591│248
924│836│715
───┼───┼───
819│672│354
457│389│621
236│415│879
───┼───┼───
342│168│597
578│924│136
691│753│482
```

Now that we have two versions of the app, we can compare them using hyperfine again:

```shell
$ hyperfine --warmup 20 -N "./sudokuSolver $SUDOKU" "./sudokuNativeSolver $SUDOKU"
Benchmark 1: ./sudokuSolver
  Time (mean ± σ):     860.5 ms ±  17.9 ms    [User: 1751.0 ms, System: 103.1 ms]
  Range (min … max):   844.8 ms … 903.9 ms    10 runs

Benchmark 2: ./sudokuNativeSolver
  Time (mean ± σ):     122.5 ms ±   2.1 ms    [User: 83.4 ms, System: 34.0 ms]
  Range (min … max):   119.3 ms … 127.5 ms    24 runs

Summary
  './sudokuNativeSolver' ran 7.02 ± 0.19 times faster than './sudokuSolver'
```

As we can see, Scala Native annihilated the application startup time (there's no JVM to startup) and reduced the whole computing time altogether by seven times.

Scala Native can be used to craft NGINX Unit server applications using [Snunit](https://github.com/lolgab/snunit), and as recently a [Cats-Effect single-threaded native runtime](https://github.com/armanbilge/epollcat) was published, it's possible to use [Http4s with Ember](https://github.com/ChristopherDavenport/scala-native-ember-example) to create single-threaded native servers!

## 10. Conclusion

In this article, we saw how to use [scala-cli](https://scala-cli.virtuslab.org/), [Scala Native](https://scala-native.org/en/stable/) and [decline](https://ben.kirw.in/decline/), a combination of tools that rocks when used to craft lightweight command line tools and much more. Despite not being a comprehensive guide to all their features, I hope this article will act as a starting point for ideas.

Some ideas for further improvements:
- Writing a `solve` stack-safe implementation
- Adding a `--all` flag to print all the solutions
