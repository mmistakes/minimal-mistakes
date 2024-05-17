---
title: "5 Nice Scala Tricks for Expressiveness"
date: 2020-05-21
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, tricks]
excerpt: "Scala is an amazingly expressive language, but even the most experienced devs aren't aware of all the subtleties."
---
This article is for Scala programmers of all levels who are at least familiar with the absolute essentials (values, classes, functions etc.). In this post I'm going to show you a few syntax tricks and sugar elements that make Scala such a powerful, expressive language. Many of these techniques are not so well-known, so there are probably at least some of these that you may not have seen before.

## Trick 1 - the single abstract method pattern

Since Scala 2.12, abstract classes or traits with a single unimplemented method can be reduced to lambdas. Here's an example:

```scala
trait Action {
  def act(x: Int): Int
}

val myAction: Action = (x: Int) => x + 1
```

In this case, the compiler can automatically convert the lambda into an anonymous instance of Action, so it's as if I said

```scala
val action: Action = new Action {
  override def act(x: Int) = x + 1
}
```

This is particularly useful with spawning JVM Threads, because they traditionally take a Runnable - which is an interface with a single abstract method - as argument, so we can now create Threads very easily:

```scala
new Thread(() => println("I run easy!")).start()
```

## Trick 2 - left-associative methods

Ever wondered how you could write `2 :: someList`? You're probably aware that the `::` method is used infix, but it's supposed to be a member of the List type, not on Int, so how does that work?

The answer is baked into the Scala syntax: methods with non-alphanumeric names which end in a colon, like `::`, are _right-associative_. By this we mean that we can write

```scala
1 :: 2 :: 3 :: List()
```

which in fact means

```scala
1 :: (2 :: (3 :: List()))
```

and the compiler will rewrite it in the "standard" way as

```scala
List().::(3).::(2).::(1)
```

Can you write your own operator like that? Sure you can! Here's an example:

```scala
class MessageQueue[T] {
  // an enqueue method
  def -->:(value: T): MessageQueue[T]
}

val queue = 3 -->: 2 -->: 1 -->: new MessageQueue[Int]
```

## Trick 3 - baked-in "setters"

If you come from Java, the getter/setter pattern is all too familiar. In Scala, we discourage mutable data structures in general, but in case we do want them, we don't want the fields exposed as vars. At the same time, the old getThis and setThis pattern is all too verbose.

```scala
class MutableIntWrapper {
  private var internalValue = 0
  // getter
  def value = internalValue
  // setter
  def value_=(newValue: Int) = { internalValue = value }
}
```

When we write something like that, we can now write a much more natural setter statement:

```scala
val wrapper = new MutableIntWrapper
wrapper.value = 43 // same as wrapper.value_=(43)
```

## Trick 4 - multi-word members

Scala allows multi-word method and field names, to more clearly express what they mean and avoid having to rename values which would otherwise contain restricted characters.

```scala
class Person(name: String) {
  def `then said`(thing: String) = s"$name then said: $thing"
}

val jim = new Person("Jim")
jim `then said` "Scala is pretty awesome!"
```

A real-life example where this kind of naming is used successfully is Akka HTTP, so that it can keep the familiar HTTP terms exactly as they are. Here's a real request I make to the server which does syntax highlighting for this blog:

```scala
val request = HttpRequest(
  method = HttpMethods.POST,
  uri = "http://markup.su/api/highlighter",
  entity = HttpEntity(
    ContentTypes.`application/x-www-form-urlencoded`, // <--- look here
    s"source=${URLEncoder.encode(source, "UTF-8")}&language=Scala&theme=Sunburst"
  )
)
```

## Trick 5 - backtick pattern matching

Another use of backticks is a small but powerful feature of pattern matching: the ability to match an existing variable exactly. Assume you have a value `meaningOfLife` in your code and you want to match it in a PM expression. If you write

```scala
val pm = data match {
  case meaningOfLife => ...
}
```

then all you're doing is shadowing your variable inside the PM case. You could do it like this, a bit awkwardly:

```scala
val pm = data match {
  case m if m == meaningOfLife => ...
}
```

but you can do this:

```scala
val pm = data match {
  case `meaningOfLife` => ...
}
```

which is a shorthand for saying "match the exact value this variable has now".

## Power comes in small things

Scala has some powerful and expressive features that allow one to write elegant and concise code. My bet is that even if you're an advanced Scala programmer, there is at least one trick above that you did not know about. I hope they will all be useful!
