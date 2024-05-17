---
title: "Let's Talk About the Scala 3 Indentation"
date: 2020-11-02
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
tags: [scala 3]
excerpt: "Some people love it, some hate it. Scala 3 indented syntax is not that bad, and it might actually help. Let's take a look at how Scala 3 can change the structure of our code."
---

Regardless of whether you're experienced or new to Scala, you've probably been confused about Scala syntax inconsistencies and alternatives at least once. In this article, we'll take a careful, structured look at how Scala 3 adds yet another facility to our ever-expanding set of alternative code styles.

This feature (along with dozens of other changes) is explained in depth in the [Scala 3 New Features](https://rockthejvm.com/p/scala-3-new-features) course.

## 1. If Expressions

The Scala 2 syntax allows you to write if expressions on multiple lines:

```scala3
val aCondition = if (2 > 3)
  "bigger"
  else "smaller"
```

Of course, that's not how aesthetics are generally chosen. Some styles include:

```scala3
// one-liner
val aCondition = if (2 > 3) "bigger" else "smaller"

// java-style
val aCondition2 =
  if (2 > 3) {
    "bigger"
  } else {
    "smaller"
  }

// compact
val aCondition3 =
    if (2 > 3) "bigger"
    else "smaller"
```

To be clear, all the above _are still supported_ in Scala 3. However, we can make do without the braces and even the parentheses of if expressions, while _indentation becomes significant_.

```scala3
val anIndentedCondition =
  if 2 > 3
    "bigger"
  else
    "smaller"
```

When we remove the parens around `2 > 3`, indentation becomes significant for this expression. This means that the `else` branch must be at least at the indent level of the `if`. In real life, mixed indentations for if/else branches (especially in junior/hacked code) are extremely confusing especially in chained conditions, so the compiler helps in this case. The code also looks a bit cleaner than the Java-style version above.

If we want to place the if-branch result on the same line as the condition, we need to add a `then` keyword:

```scala3
// one-liner
val aCondition = if 2 > 3 then "bigger" else "smaller"
// compact
val aCondition =
  if 2 > 3 then "bigger"
  else "smaller"
```

That's it!

## 2. For Comprehensions

A similar change has been added to other control structures like `for` comprehensions. The idea is: if we don't add braces, indentation becomes significant. Here's what we used to write:

```scala3
for {
  n <- List(1, 2, 3)
  c <- List('a', 'b', 'c')
} yield s"$c$n"
```

Now, in Scala 3:

```scala3
for
  n <- List(1, 2, 3)
  c <- List('a', 'b', 'c')
yield s"$c$n"
```

Same code, right? That's because the Scala 2 version also included some proper aesthetics. Without braces, those indents are now mandatory.

No biggie.

## 3. Indentation regions

In the syntactic analysis compilation step, the compiler adds indentation regions after certain tokens. Translation: as per the [official docs](http://dotty.epfl.ch/docs/reference/other-new-features/indentation.html#optional-braces), after the keywords `if  then  else  while  do  try  catch  finally  for  yield  match  return` and the tokens `=  =>  <-`, we can break the line and write our code one level deeper than the line above. This indentation level will serve as a baseline for the other expressions that we might nest inside. The compiler does it by adding some fake tokens at line breaks (`<indent>` or `<outdent>`) to keep track of the indentation level without multiple passes over the code.

This means that methods can now be implemented without braces:

```scala3
def computeMeaningOfLife(year: Int): Int =
  println("thinking...")

  42 // <-- indent matters, so it's taken under the scope of this method
```

This part may be particularly confusing. The way I like to talk about it is: imagine the compiler inserted braces between `=` and your returned value; in this way, the implementation of the method is a _code block_, which, obviously, is a single expression whose value is given by its last constituent expression. The significant indentation means, in this case, that we actually have an invisible code block there.

An indentation region is also created when we define classes, traits, objects or [enums](https://blog.rockthejvm.com/enums-scala-3/) followed by a colon `:` and a line break. This token is now interpreted by the compiler as "colon at end of line", which is to say "colon then define everything indented". Examples:

```scala3
class Animal:
  def eat(): Unit

trait Carnivore:
  def eat(animal: Animal): Unit

object Carnivore:
  def apply(name: String): Carnivore = ???
```

Similar rules apply for extension methods and given instances (we'll talk about them in a later article):

```scala3
given myOrder as Ordering[Int]: // <-- start the indentation region
  def compare(x: Int, y: Int) =
    if x < y then 1 // notice my new syntax
    else if x > y then -1
    else 0
```

Now for the million dollar question: indent with _spaces or tabs_? Scala 3 supports both, and the compiler is able to compare indentations.

If two lines start with the same number of spaces or the same number of tabs, the indentations are comparable, and the comparison is given by the number of spaces/tabs after. For example, 3 tabs + one space is "less indented" than 3 tabs + 2 spaces. Similarly, 4 spaces + 1 tab is "less indented" than 4 spaces + 2 tabs. Makes sense. If two lines don't start with the same number of spaces/tabs, they are _incomparable_, e.g. 3 tabs vs 6 spaces. The compiler always knows the indentation baseline for an indentation region, so if a line is incomparable with the baseline, it'll give an error.

Here's the bottom line: just don't mix spaces with tabs. Pick your camp, fight to the death, but don't mix 'em.

## 4. Function arguments

There's a common style of writing Scala 2 with one-arg methods:

```scala3
val aFuture = Future {
  // some code
}
```

which is the same as `Future(/* that block of code */)`, which throws some newcomers off. This brace syntax is applicable to any method with a single argument.

Here's the thing: this one is here to stay. No significant indentation here. We could add support for it with the `-Yindent-colons` compiler option, which would allow us to add an end-of-line `:` and write the method argument indented:

```scala3
val nextYear = Future:
  2021
```

or

```scala3
List(1,2,3).map:
  x => x + 1
```

However, this is not part of the core language rules.

## 5. The `end` Game

This new concept of indentation regions can cause confusions with large blobs of code, particularly in the class definition department - we tend to write lots of code there. Even chained if-expressions can also become hard to read while indented, since code for branches may span several lines, sometimes with whitespace in between them, so it's hard to pinpoint exactly where each code belongs.

To that end (pun intended), Scala 3 introduced the `end` token to differentiate which code belongs to which indentation region:

```scala3
class Animal:
  def eat(): Unit =
    if System.currentTimeMillis() % 2 == 0
      println("even")
    else
      println("odd")
    end if
  end eat
end Animal
```

Obviously, this example is trivial, but the `end` token will definitely prove useful when we have 100x more code in the same file than in the above snippet, when we have lots of indents, and/or lots of whitespace in between lines. The `end` token does not influence the compiler, but it was added for our ease of reading code.

## 6. Conclusion

There's not much more to it - pretty much everything you need to know about indentation with Scala 3. When I personally looked at the new indentation rules for Scala 3, I personally thought, "what have you done?!". Come to take a more structured approach, it's not that bad, and it might actually help. Several people already report that Scala feels faster to write, easier to read and generally more productive with this style. Only time will tell - in any event, if this article made even one person think, "this isn't as bad as I thought", then it was a success!
