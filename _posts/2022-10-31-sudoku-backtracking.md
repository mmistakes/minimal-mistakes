---
title: "A Backtracking Sudoku Solver in Scala"
date: 2022-10-31
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, algorithms]
excerpt: "How to approach Sudoku and other constraint-satisfaction problems with recursive backtracking in Scala."
---

This article is for Scala beginners. After you learn the language, the next big thing you need to master is how to write essential "algorithms" in Scala. As you can probably tell and as senior developers will no doubt tell you, the mindset that comes with the Scala language is very different from what we're usually taught in school, or in programming tutorials. This tends to make algorithms in Scala quite difficult.

This article will show you how to _think_ such "algorithmic" problems with recursion, with a famous example: a Sudoku solver in Scala.

> If you want to master this mindset for Google-style algorithms questions, check out the [Scala & FP interview practice course](https://rockthejvm.com/p/scala-functional-programming-interview-practice). It's a long-form, 15-hour course that will take you through all the essential data structures and algorithms, taken in a functional style with Scala.

If you want to follow the video version, check out the video below or on [YouTube](https://youtu.be/zBLCbqycVzw).

{% include video id="zBLCbqycVzw" provider="youtube" %}

This article works identically for Scala 2 and Scala 3. In fact, the techniques are applicable to all other languages, including Java, Python, Kotlin and others. All you need is recursion.

## 1. Introduction

The Sudoku problem is famous, but let's state it here really quick:

You have a 9x9 board, partially filled with numbers 1-9.
You need to fill the board with numbers 1-9, such that
  - every row
  - column
  - every 3x3 "box" that the big board is composed of (9 boxes in total)

must contain all numbers 1-9, exactly once. Let's call this property "the Sudoku property".

An example Sudoku puzzle looks like this:

```text
+-------+-------+-------+
| 5 3 _ | _ 7 _ | _ _ _ |
| 6 _ _ | 1 9 5 | _ _ _ |
| _ 9 8 | _ _ _ | _ 6 _ |
+-------+-------+-------+
| 8 _ _ | _ 6 _ | _ _ 3 |
| 4 _ _ | 8 _ 3 | _ _ 1 |
| 7 _ _ | _ 2 _ | _ _ 6 |
+-------+-------+-------+
| _ 6 _ | _ _ _ | 2 8 _ |
| _ _ _ | 4 1 9 | _ _ 5 |
| _ _ _ | _ 8 _ | _ 7 9 |
+-------+-------+-------+
```

Notice that I've visually separated the 3x3 "boxes" so that they're easier to spot - not _all_ possible 3x3 boxes inside this matrix need to have the Sudoku property.

## 2. Preparation - Printing a Sudoku Game in Scala

How should we represent a Sudoku puzzle in Scala? It's a 9x9 matrix, so it's going to be an array of arrays, where we're going to denote every "space" as a zero:

```scala
val problem =
  Array(
        Array(5,3,0, 0,7,0, 0,0,0),
        Array(6,0,0, 1,9,5, 0,0,0),
        Array(0,9,8, 0,0,0, 0,6,0),
        Array(8,0,0, 0,6,0, 0,0,3),
        Array(4,0,0, 8,0,3, 0,0,1),
        Array(7,0,0, 0,2,0, 0,0,6),
        Array(0,6,0, 0,0,0, 2,8,0),
        Array(0,0,0, 4,1,9, 0,0,5),
        Array(0,0,0, 0,8,0, 0,7,9),
  )
```

Let's write a function that will print this puzzle nicely to the console, so that we can keep track of our attempt at filling it.

```scala
type Board = Array[Array[Int]]

def prettyString(sudoku: Board): String = sudoku.mkString("\n")
```

First, we need to lay out all the rows, one by one, with a newline `\n` in between them. However, at the moment we get this:

```text
[I@467aecef
[I@2173f6d9
[I@307f6b8c
[I@7a187f14
[I@6f195bc3
[I@51e2adc7
[I@1a8a8f7c
[I@2353b3e6
[I@631330c
```

We need to unwrap the arrays as well, and turn each into a string:

```scala
def prettyString(sudoku: Board): String = sudoku.map(row => row.mkString(" ")).mkString("\n")
```

which now prints something a little bit nicer:

```text
5 3 0 0 7 0 0 0 0
6 0 0 1 9 5 0 0 0
0 9 8 0 0 0 0 6 0
8 0 0 0 6 0 0 0 3
4 0 0 8 0 3 0 0 1
7 0 0 0 2 0 0 0 6
0 6 0 0 0 0 2 8 0
0 0 0 4 1 9 0 0 5
0 0 0 0 8 0 0 7 9
```

Still quite hard to read, as we need to squint in this 9x9 matrix to find out which cell belongs to which 3x3 box, so we need to split the lines and the columns in groups of 3, each:

```scala
sudoku.grouped(3).map { bigGroup =>
  bigGroup.map { row =>
    row.grouped(3).map { smallGroup =>
      smallGroup.mkString(" ")
    }.mkString("|")
  }.mkString("\n")
}.mkString("\n+------------------+\n")
```

which looks a bit better:

```text
5 3 0|0 7 0|0 0 0
6 0 0|1 9 5|0 0 0
0 9 8|0 0 0|0 6 0
+------------------+
8 0 0|0 6 0|0 0 3
4 0 0|8 0 3|0 0 1
7 0 0|0 2 0|0 0 6
+------------------+
0 6 0|0 0 0|2 8 0
0 0 0|4 1 9|0 0 5
0 0 0|0 8 0|0 7 9
```

Just add a bit of padding and alignment and we should be good with the pretty printer:

```scala
  def prettyString(sudoku: Board): String = {
    sudoku.grouped(3).map { bigGroup =>
      bigGroup.map { row =>
        row.grouped(3).map { smallGroup =>
          smallGroup.mkString(" ", " ", " ")
        }.mkString("|", "|", "|")
      }.mkString("\n")
    }.mkString("+-------+-------+-------+\n", "\n+-------+-------+-------+\n", "\n+-------+-------+-------+")
  }
```

```text
+-------+-------+-------+
| 5 3 0 | 0 7 0 | 0 0 0 |
| 6 0 0 | 1 9 5 | 0 0 0 |
| 0 9 8 | 0 0 0 | 0 6 0 |
+-------+-------+-------+
| 8 0 0 | 0 6 0 | 0 0 3 |
| 4 0 0 | 8 0 3 | 0 0 1 |
| 7 0 0 | 0 2 0 | 0 0 6 |
+-------+-------+-------+
| 0 6 0 | 0 0 0 | 2 8 0 |
| 0 0 0 | 4 1 9 | 0 0 5 |
| 0 0 0 | 0 8 0 | 0 7 9 |
+-------+-------+-------+
```

That's more like it - we can now identify things in the Sudoku matrix easily.

## 3. Writing a Sudoku Validation Function in Scala

The most important aspect of a constraint satisfaction problem is how to maintain the constraints _as we're building the solution_. We did something similar in the [N-Queens](/n-queens) problem. The way we're going to build up our solution will be:

- on every row
  - on every column
    - check if there is a non-zero value there; if it is, that's part of the original puzzle
    - if there's a zero, we'll try all numbers from 1-9:
      - set a value
      - _check if it satisfies the Sudoku property_
      - move to the next cell to the right, try out all possible solutions from there
      - unset the value and try the next one

Of course, this is an imperative style, "algorithmic" approach - we'll build up a recursive solution in Scala for Sudoku shortly, but first, we need to be able to validate whether a value we're placing in an empty cell is "correct", i.e. satisfies the Sudoku property. Of course, we don't need to check _all_ rows, columns and boxes, but just those for the cell we're filling.

If we're placing the number 4 at row 2, column 5, we need to check the Sudoku property for row 2, for column 5, and for the 3x3 box at "big row" 0, "big column" 1. Let's write a function to validate the property, given a Sudoku board, a row, a column and a value:

```scala
def validate(sudoku: Board, x: Int, y: Int, value: Int): Boolean = ???
```

First, let's validate the row. _Be careful_ &mdash; the row index is the coordinate y (vertical):

```scala
val row = sudoku(y)
val rowProperty = !row.contains(value)
```

If the row already contains the value we're trying to fill, the value is invalid for this board configuration.

Testing the column is a bit more tricky, because the Sudoku board is an array of _rows_, so we need to pick the "x-th" element out of each row to identify the column &mdash; thankfully, we have `map` for that:

```scala
val column = sudoku.map(r => r.apply(x))
// same property applied to column too
val columnProperty = !column.contains(value)
```

Now, for the box. We need to be careful here. We need to find the indices of the elements in the _corresponding 3x3 box_ of the x-y pair. Here's how we're going to find them:

- Imagine the Sudoku board not as a 9x9 matrix of numbers, but as a 3x3 matrix of "boxes".
- The coordinates of a "box" in the 3x3 matrix of "boxes" are always going to be `x/3` and `y/3`.
- The coordinates of the top-left cell in this box are going to be `3 * xBox` and `3 * yBox`.
- The coordinates of the bottom-right cell in this box are then going to be `3 * xBox + 2` and `3 * yBox + 2`.

Let's fetch all these elements:

```scala
val boxX = x / 3
val boxY = y / 3
val box = for {
  yb <- (boxY * 3) until (boxY * 3 + 3) // indices for rows in THIS box
  xb <- (boxX * 3) until (boxX * 3 + 3) // same for cols
} yield sudoku(yb)(xb)

// apply the Sudoku property for this box as a collection of numbers:
val boxProperty = !box.contains(value)
```

Combining all the properties gives us the final validation function:

```scala
def validate(sudoku: Board, x: Int, y: Int, value: Int): Boolean = {
  val row = sudoku(y)
  val rowProperty = !row.contains(value)

  val column = sudoku.map(r => r.apply(x))
  val columnProperty = !column.contains(value)

  val boxX = x / 3
  val boxY = y / 3
  val box = for {
    yb <- (boxY * 3) until (boxY * 3 + 3) // indices for rows in THIS box
    xb <- (boxX * 3) until (boxX * 3 + 3) // same for cols
  } yield sudoku(yb)(xb)
  val boxProperty = !box.contains(value)

  rowProperty && columnProperty && boxProperty
}
```

Testing a few scenarios should validate our validation function:

```scala
validate(problem, 5, 2, 4) // true
validate(problem, 5, 2, 5) // false
validate(problem, 5, 2, 7) // false
```

## 4. The Recursive Backtracking Sudoku Solver

Now we have everything in place. We can create a solver function that tries all possible solutions _starting at certain coordinates x and y_.

```scala
def solve(sudoku: Board, x: Int = 0, y: Int = 0): Unit = ???
```

When does this function end? Two cases:
- we reached the end of the board, i.e. `y >= 9`, which means we've filled the board and we have a solution
- we've exhausted all possible values

The second stopping condition will arise by itself, as we'll try all numbers 1-9 and this list is finite. Let's focus on the first condition:

```scala
if (y >= 9) println(prettyString(sudoku)) // final solution
else ... // TODO
```

If we reached the end of a row, i.e. `x >= 9`, then we need to call the `solve` function recursively starting at the next row `y + 1` and the row `0`. If it just so happens that y now becomes 9, then we're done. Otherwise, the function will continue.

```scala
else if (x >= 9) solve(sudoku, 0, y + 1) // need to fill in the next row
else ... // TODO
```

Okay, so we're inside the board now. We need to check if the board already contains a value, as we need to skip it since it was part of the original puzzle:

```scala
else if (sudoku(y)(x) > 0) solve(sudoku, x + 1, y) // need to fill in the next cell (cell to the right)
```

Otherwise, we're at a cell which doesn't have a value yet, so we have to try all possible values which satisfy the Sudoku property, and we have a function for that!

```scala
else (1 to 9).filter(value => validate(sudoku, x, y, value)).foreach { value => /* TODO */ }
```

We keep just the values that are good candidates, i.e. pass the validation function. Inside the `foreach`, then we need to
- put the value in the matrix
- call `solve` on the next cell
- remove the value in the matrix to make room for the new one

```scala
....foreach { value =>
  // fill the sudoku board with the value
  sudoku(y)(x) = value
  // try the next cell
  solve(sudoku, x + 1, y)
  // remove the value
  sudoku(y)(x) = 0
}
```

So the final solver looks like this:

```scala
def solve(sudoku: Board, x: Int = 0, y: Int = 0): Unit = {
  if (y >= 9) println(prettyString(sudoku)) // final solution
  else if (x >= 9) solve(sudoku, 0, y + 1) // need to fill in the next row
  else if (sudoku(y)(x) > 0) solve(sudoku, x + 1, y) // need to fill in the next cell (cell to the right)
  else (1 to 9).filter(value => validate(sudoku, x, y, value)).foreach { value =>
    // fill the sudoku board with the value
    sudoku(y)(x) = value
    // try the next cell
    solve(sudoku, x + 1, y)
    // remove the value
    sudoku(y)(x) = 0
  }
}
```

## 5. Full Code

Putting all the pieces together, we get to the final code for the Sudoku solver in Scala:

```scala

object Sudoku {

  type Board = Array[Array[Int]]

  def prettyString(sudoku: Board): String = {
    sudoku.grouped(3).map { bigGroup =>
      bigGroup.map { row =>
        row.grouped(3).map { smallGroup =>
          smallGroup.mkString(" ", " ", " ")
        }.mkString("|", "|", "|")
      }.mkString("\n")
    }.mkString("+-------+-------+-------+\n", "\n+-------+-------+-------+\n", "\n+-------+-------+-------+")
  }

  def validate(sudoku: Board, x: Int, y: Int, value: Int): Boolean = {
    val row = sudoku(y)
    val rowProperty = !row.contains(value)

    val column = sudoku.map(r => r.apply(x))
    val columnProperty = !column.contains(value)

    val boxX = x / 3
    val boxY = y / 3
    val box = for {
      yb <- (boxY * 3) until (boxY * 3 + 3) // indices for rows in THIS box
      xb <- (boxX * 3) until (boxX * 3 + 3) // same for cols
    } yield sudoku(yb)(xb)
    val boxProperty = !box.contains(value)

    rowProperty && columnProperty && boxProperty
  }

  def solve(sudoku: Board, x: Int = 0, y: Int = 0): Unit = {
    if (y >= 9) println(prettyString(sudoku)) // final solution
    else if (x >= 9) solve(sudoku, 0, y + 1) // need to fill in the next row
    else if (sudoku(y)(x) > 0) solve(sudoku, x + 1, y) // need to fill in the next cell (cell to the right)
    else (1 to 9).filter(value => validate(sudoku, x, y, value)).foreach { value =>
      // fill the sudoku board with the value
      sudoku(y)(x) = value
      // try the next cell
      solve(sudoku, x + 1, y)
      // remove the value
      sudoku(y)(x) = 0
    }
  }

  def main(args: Array[String]): Unit = {
    val problem =
      Array(
            Array(5,3,0, 0,7,0, 0,0,0),
            Array(6,0,0, 1,9,5, 0,0,0),
            Array(0,9,8, 0,0,0, 0,6,0),
            Array(8,0,0, 0,6,0, 0,0,3),
            Array(4,0,0, 8,0,3, 0,0,1),
            Array(7,0,0, 0,2,0, 0,0,6),
            Array(0,6,0, 0,0,0, 2,8,0),
            Array(0,0,0, 4,1,9, 0,0,5),
            Array(0,0,0, 0,8,0, 0,7,9),
      )

    println(prettyString(problem))
    solve(problem)
  }
}
```

Running the application, we then get to a predictably satisfying solution:

```text
+-------+-------+-------+
| 5 3 4 | 6 7 8 | 9 1 2 |
| 6 7 2 | 1 9 5 | 3 4 8 |
| 1 9 8 | 3 4 2 | 5 6 7 |
+-------+-------+-------+
| 8 5 9 | 7 6 1 | 4 2 3 |
| 4 2 6 | 8 5 3 | 7 9 1 |
| 7 1 3 | 9 2 4 | 8 5 6 |
+-------+-------+-------+
| 9 6 1 | 5 3 7 | 2 8 4 |
| 2 8 7 | 4 1 9 | 6 3 5 |
| 3 4 5 | 2 8 6 | 1 7 9 |
+-------+-------+-------+
```

## 6. Conclusion

In this article, we learned how to approach a constraint satisfaction problem with recursive backtracking in Scala. Sudoku puzzles are always fun, and now you've written one to solve _all_ possible 9x9 Sudoku games!
