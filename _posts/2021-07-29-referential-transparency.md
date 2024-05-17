---
title: "Why Should You Care About Referential Transparency?"
date: 2021-07-29
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [fp]
excerpt: "Referential transparency is your best tool for productivity as a functional programmer in Scala. In this article, we'll talk about what it is and why it's important."
---

In this article, we'll talk about referential transparency and why it's useful for us as programmers. This piece is a bit more language-agnostic as it applies to any programming language where FP can work, but the examples are written in Scala.

The short version is this: referential transparency is a fancy term for "replaceable code". In this article we'll understand what that means, and it applies to all levels of experience.

## 1. What is Referential Transparency?

Referential transparency is a fancy term that is attached to a computable expression. A piece of code is referentially transparent if we can safely replace that piece of code with the value it computes and vice-versa, anywhere where that piece is used, without changing the meaning or result of our program.

Best explained with some examples. The simplest example is a function that combines two numbers in some simple math expression, say addition:

```scala
def add(a: Int, b: Int) = a + b
```

This function is referentially transparent. Why? Because we can replace all occurrences of this function with the expression it evaluates to, and then with the value it computes, at any point in our program. For example, let's say we have a small expression called `five`:

```scala
val five = add(2,3)
```

We can safely replace `five` with `add(2,3)`, with `2 + 3` or with `5` anywhere in our code where the value `five` is used. By consequence, all the expressions below are identical in meaning and output:

```scala
val ten = five + five
val ten_v2 = add(2,3) + add(2,3)
val ten_v3 = 5 + add(2,3)
val ten_v4 = 10
```

An expression is referentially transparent if we can do this back-and-forth replacement anytime anywhere, without changing the meaning and output of our program. Mega powerful, as we'll see later.

## 2. What is NOT Referentially Transparent?

We can understand referential transparency both by examples of what _is_ referentially transparent, and also by contrast to expressions that are _not_ referentially transparent.

Let me give some examples. Let's say that you want to borrow some money from a mob boss and you have to pay back with 10% interest, but you also have to show respect to them (mob bosses are big on deference and respect).

```scala
def showMeTheMoney(money: Int): Int = {
  println("Here's your cash, Your Excellency.") // assume the mob boss wants you to show respect
  money * 110/100 // let's say you get some interest
}
```

Let's further assume that you take $1000 from this mob boss:

```scala
val aGrandWI = showMeTheMoney(1000) // a grand with interest
```

But for some reason, you do it twice. In this case, you need to be careful. If you do

```scala
val twoGrandWI = showMeTheMoney(1000) + showMeTheMoney(1000)
```

then you borrow twice, you pay back twice and you show the appropriate respect (twice). But if you're hasty and you replace the expression with its value

```scala
val twoGrandWI_v2 = aGrandWI + aGrandWI
```

you borrow twice, you pay back twice, but you only show the appropriate respect once. You're making a terrible mistake. The mob boss can be very angry. This expression is not referentially transparent, because, besides the actual value the expression computes (the money you need to pay back), you also _do_ something else (printing a respect line to the boss). You can't replace the expression with its value because the meaning of your program changes (showing respect once instead of twice).

Here's another example. You've just been kidnapped, and your kidnappers decide to play a game of Russian roulette with you. You rely on the current time of the system, and if the time as millis is a multiple of 6, then the gun will shoot, otherwise you'll miss.

```scala
def whatsTheTime(): Long = System.currentTimeMillis()

val currentTime = whatsTheTime()
```

Is this expression (the `whatsTheTime` function) referentially transparent?

The function doesn't take any input, sure, but if you call it multiple times it will return different values. That's because besides returning a value, this function interacts with some mutable state (the clock of the system). Therefore, replacing the function with its value will not be possible without changing the meaning of your program, with potentially life-threatening consequences:

```scala
val currentTime = whatsTheTime()
val russianRoulette = if (whatsTheTime() % 6 == 0) "BANG" else "Click"
val russianRoulette_v2 = if (currentTime % 6 == 0) "BANG" else "Click" // may NOT be the same
```

In these examples, not being careful about referential transparency can save your life.

Joke aside, referential transparency can make our developers' lives much easier, because we can quickly replace referentially transparent code with the value it produced without giving second thoughts about it, therefore freeing our mental space to focus on the important work, which is to build quality software.

## 3. Referential Transparency Benefit #1: Refactoring

If we can determine that an expression is referentially transparent, we can quickly replace it with the value it produces, _and_ vice-versa. Some examples follow.

A common pain in large codebasess is repeated code. With referentially transparent expressions, we can safely remove duplications:

```scala
def anRTFunction(a: Int, b: Int): Int = a + b

def aBigComputation() = {
  val comp1 = anRTFunction(2, 3)
  val comp2 = anRTFunction(2, 3)
  val comp3 = anRTFunction(2, 3)

  comp1 + comp2 + comp3
}
```

Because our auxiliary function is referentially transparent, there's no point in calling it 3 times because it produces the same value every time. So we can cut our code to just

```scala
def aBigComputation_v2() = {
  val comp = anRTFunction(2, 3)
  comp + comp + comp
}
```

Another refactoring tool is extracting variables. If we have many referentially transparent expressions

```scala
// implementations not important
def rtf1(a: Int) = a + 1
def rtf2(a: Int) = a * 2
def rtf3(a: Int) = a * 10
def rtf4(a: Int) = a + 100
```

and we combine them together in one big expression, our code may not be that readable:

```scala
def bigProgram() = anRTFunction(anRTFunction(rtf1(1), rtf2(4)), anRTFunction(rtf3(5), rtf4(20)))
```

but because our expressions are referentially transparent, then we can extract variables to make our code easier to read, especially if these expressions are repeated:

```scala
def bigProgram_v2() = {
  val e1 = rtf1(1)
  val e2 = rtf2(4)
  val e3 = rtf3(5)
  val e4 = rtf4(20)
  val e12 = anRTFunction(e1, e2)
  val e34 = anRTFunction(e3, e4)
  anRTFunction(e12, e34)
}
```

Referential transparency is basically a fancy term for "replaceable code". Refactoring capabilities come for free in RT code.

## 4. Referential Transparency Benefit #2: Mental Space

Let me define a small function to compute the sum of all naturals up to `n`:

```scala
def sumN(n: Int): Int =
    if (n <= 0) 0
    else n + sumN(n - 1)
```

Looking at the code, we quickly understand that this function is referentially transparent: it does nothing else but compute values. No interaction with the world of any kind. If our function is RT, then we can quickly trace its execution:

```
sumN(10) =
10 + sumN(9) =
10 + 9 + sumN(8) =
10 + 9 + 8 + sumN(7) =
...
10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 + 0 =
55
```

If our functions are not referentially transparent, then tracing the program execution is an order of magnitude harder. That's why we needed complex debuggers, inspections and complex tools to inspect imperative code, because we simply had no guarantees that our functions were referentially-transparent, so the entire codebase is a suspect for bugs in our software.

Using RT in our code frees mental space so that we can focus on what's important, which is shipping quality software. Ideally, we can look at the type signature of a function and immediately be able to tell what that function computes and what it can do besides computing the values, which is why pure FP libraries like Cats Effect can be so powerful.

## Conclusion: Referential Transparency and Pure Functional Programming

Functional programming works with functions just like any other of values. _Pure_ functional programming works with values, functions and expressions while those expressions are _pure_, meaning they only compute values and do not "do" anything besides computing values.

Referential transparency describes the purity aspect of functional programming: only expressions that compute values and don't produce side effects of interacting with the world in any way. The overlap with pure functional programming is so large, that you might be tempted to equate pure functional programming with RT.

Academic and definitional distinctions aside, referential transparency is a powerful mental tool in our programmers' arsenal mainly because of their practical utility: the ability to quickly inspect code, read, understand, reason about, change and deconstruct the meaning of our programs without altering it in any way. The mental space that RT frees up for us as programmers is hard to understate, and it makes us overall more productive and happy writing quality software.
