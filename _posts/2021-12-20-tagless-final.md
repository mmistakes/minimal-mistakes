---
title: "Tagless Final in Scala"
date: 2021-12-20
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, abstract]
excerpt: "Demystifying the tagless final pattern in Scala. TLDR: it's got nothing to do with type classes."
---

This article is about a popular topic in the Scala world, which is a very weird combination, probably the weirdest I've come across on the blog.

- It's (described to be) highly abstract and solves a very general kind of problem.
- It caused a giant amount of confusion in the Scala community, including myself for a very long time.
- It's poorly covered in articles, books and videos. I've read and watched everything I could get my hands on and still had gaps in my understanding.
- It's very popular and widely used, especially in code based on the Cats Effect/Typelevel stack.

That final point is striking. It seems as though TF is used not _because of_, but _in spite of_ its structure. Some argued it causes more problems than it solves. Debates started. Competing libraries emerged.

I'd argue TF's bad rap (if there is one) could be solved with a better learning curve. This article is the summary of everything I know so far, in what I hope to be an easily digestible form.

There's also a video form, which you can watch here:

{% include video id="m3Qh-MmWpbM" provider="youtube" %}

Special thanks to

- the original [TF paper](https://okmij.org/ftp/tagless-final/JFP.pdf) formalizing the pattern with examples in Haskell
- pretty much every other article, book or video referencing TF

## 1. The Expression Problem

Because we write FP, we think in terms of expressions. In fact, a purely functional program is nothing else but a single expression (if quite big) that computes a value (albeit quite complex, e.g. a server or a data pipeline). This is what I teach in both my [Scala](https://rockthejvm.com/p/scala) [courses](https://rockthejvm.com/p/advanced-scala) here at Rock the JVM.

For pure FP to work properly in a strongly typed language like Scala, we immediately get into the _expression problem_. Namely, if we're given an expression computing a value, we would like to be able to evaluate it and return the proper value of the right _type_ for that expression.

Let's imagine something simple. We want to write a program that is able to evaluate boolean expressions. To do so, we can encode the boolean operands and operators as nodes in a binary tree. An expression is a tree consisting of operands (leaves) and operators (branches), and we can evaluate the expression by traversing the tree and collapsing its result to a single value. For instance, the expression

```scala3
true && false || true
```

can be modeled as

```scala3
Or(And(Leaf(true), Leaf(false)), Leaf(true))
```

considering we had data structures to represent each node in the tree. Naming `Leaf` as `B` (easier), we can immediately build up a few case classes to represent our particular expression problem:

```scala3
trait Expr // the "tree"
case class B(boolean: Boolean) extends Expr
case class Or(left: Expr, right: Expr) extends Expr
case class And(left: Expr, right: Expr) extends Expr
case class Not(expr: Expr) extends Expr
```

and an evaluation function would look like this:

```scala3
def eval(expr: Expr): Boolean = expr match {
  case B(b) => b
  case Or(a, b) => eval(a) || eval(b)
  case And(a, b) => eval(a) && eval(b)
  case Not(e) => !eval(e)
}
```

Of course, the computer can already calculate boolean expressions of any complexity, but bear with me. Assume that we'd now like to enhance our evaluation capabilities to now include integers as well, so we'd like to have an additional set of case classes

```scala3
case class I(int: Int) extends Expr
case class Sum(left: Expr, right: Expr) extends Expr
```

but now evaluating an expression is not so straightforward, because not only do we have to add some additional cases in our pattern match, but also lose type safety and type-cast everything:

```scala3
def eval_v2(expr: Expr): Any = expr match { // notice the Any return type
  case B(b) => b
  case Or(a, b) => eval(a).asInstanceOf[Boolean] || eval(b).asInstanceOf[Boolean]
  // casts everywhere
}
```

not to mention that some of those expressions can have the incorrect type, e.g. `Or(I(1), B(true))` which will crash when type-casting. So the problem becomes: how do we return the right type for the right expression?

The expression problem is very general. The example we have here might look contrived, but we'll see a more realistic example later.

## 2. First Solution: Tagging

The expression problem reduces to differentiating numerical expressions from boolean expressions without destroying the code quality, losing type safety or using type casts everywhere.

One easy way of doing this differentiation is by using some additional data inside each instance of `Expr` to be able to tell whether we should be using type casts, and what type to expect:

```scala3
trait Expr(val tag: String)
case class B(boolean: Boolean) extends Expr("bool")
case class Or(left: Expr, right: Expr) extends Expr("bool")
case class And(left: Expr, right: Expr) extends Expr("bool")
case class Not(expr: Expr) extends Expr("bool")
case class I(int: Int) extends Expr("int")
case class Sum(left: Expr, right: Expr) extends Expr("int")

def eval(expr: Expr): Any = expr match {
  case B(b) => b
  case Or(left, right) =>
    if (left.tag == "bool" && right.tag == "bool")
        eval(left).asInstanceOf[Boolean] || eval(right).asInstanceOf[Boolean]
    else
        throw new IllegalArgumentException("attempting to evaluate an expression with improperly typed operands")
  // same for others
}
```

This approach has the benefit of doing "type" checks (by checking the tag) and returning the correct result for each expression. However, the type check still happens at runtime, we still don't have true type checking (by the `Any` return type) and we're still doing type casts. A slight improvement would be to move the "type" checks at the construction phase of each data structure, e.g.

```scala3
case class Or(left: Expr, right: Expr) extends Expr("bool") {
  assert(left.tag == "bool" || right.tag == "bool")
}
```

but this would still crash at runtime. We'd like something better

## 3. Removing Tags

Why add tags and check them at runtime, when we have a strongly typed language that can do the type checks for us at compile time?

Because the tags in the previous solution essentially added type information to the runtime, we can remove the tags and let the compiler do the type-checking automatically.

```scala3
trait Expr[A]
case class B(boolean: Boolean) extends Expr[Boolean]
case class Or(left: Expr[Boolean], right: Expr[Boolean]) extends Expr[Boolean]
case class And(left: Expr[Boolean], right: Expr[Boolean]) extends Expr[Boolean]
case class Not(expr: Expr[Boolean]) extends Expr[Boolean]
case class I(int: Int) extends Expr[Int]
case class Sum(left: Expr[Int], right: Expr[Int]) extends Expr[Int]
```

We got rid of the tags and added a generic type argument, which the compiler will use to check correctness. For instance, we can easily build an expression such as `Or(B(true), B(false))` but we can't build an expression such as `Or(I(1), B(true))` or `I(false)` or `B(45)`.

Now, we can also make our evaluation function correctly typed:

```scala3
def eval[A](expr: Expr[A]): A = expr match {
  case B(b) => b
  case I(i) => i
  case Or(left, right) => eval(left) || eval(right)
  case Sum(left, right) => eval(left) + eval(right)
  // etc
}
```

Code looks cleaner, correctness is easier to prove, no more type tags, maintaining type safety. So good.

This is a tagl*less* solution, because we've removed tags. It's called _tagless initial_, because we work with intermediate data structures, not with the values we care about. That would be _tagless final_, coming next. In the meantime, if we test what we have,

```scala3
def demoTagless(): Unit = {
    import TaglessInitial._
    println(eval(Or(B(true), And(B(true), B(false)))))
    println(eval(Sum(I(24), I(-3))))
}
```

it prints exactly what we're expecting: the boolean `true` and the integer `21`. As mentioned earlier, only properly-formed expressions will work, because otherwise the compiler will catch the type mismatches.

## 4. Tagless Final

There is another step where we can take this. Not only can we remove tags, but we can also immediately represent these expressions in terms of the evaluated value we care about (the final value). This is tagless _final_. We'll represent our expression types a bit differently,

```scala3
trait Expr[A] {
  val value: A // the final value we care about
}

def b(boolean: Boolean): Expr[Boolean] = new Expr[Boolean] {
  val value = boolean
}

def i(int: Int): Expr[Int] = new Expr[Int] {
  val value = int
}

def or(left: Expr[Boolean], right: Expr[Boolean]) = new Expr[Boolean] {
  val value = left.value || right.value
}

def and(left: Expr[Boolean], right: Expr[Boolean]) = new Expr[Boolean] {
  val value = left.value && right.value
}

def sum(left: Expr[Int], right: Expr[Int]) = new Expr[Int] {
  val value = left.value + right.value
}

def eval[A](expr: Expr[A]): A = expr.value
```

where our `Expr[A]` has the evaluated value directly in the instance, as a member. Each construction of another `Expr` of the right type already has the final value embedded there. Therefore, our evaluation function is almost empty, because all we need to do is just return the value embedded in the expression being passed as argument.

Of course, a demonstration of this code will also print what the initial tagless solution did:

```scala3
def demoTaglessFinal(): Unit = {
    import TaglessFinal._
    println(eval(or(b(true), and(b(true), b(false)))))
    println(eval(sum(i(24), i(-3))))
}
```

This is, of course, a mere refactoring of the code in tagless initial so that we can immediately work with the final representation of our results.

But that, friends, is it. This is tagless final. We started with the initial expression problem, and we solved it with this style of organizing code. I want you to think about TF as a "design pattern", because that's what we did: we designed and structured our code to fit a particular use-case.

_fine print: Tagless final in the original paper is much more than a design pattern, it's a way of creating new "languages", e.g. means of computation + syntaxes, on top of existing languages, e.g. Scala. That said, for the practicality of Scala programmers, this article is focused on our pragmatic need to write good code._

Now, after "this is tagless final", the big question: _where's the `F[_]`_?

For context, the `F[_]` is seen very often in code bases that run Cats Effect/Typelevel libraries under the hood, where method definitions use higher-kinded types for which we require the presence of a particular type class:

```scala3
def myService[F[_]: Concurrent](...)
```

and this is often called "tagless final". However, programming against type classes and the tagless final pattern have nothing to do with each other. The only overlap is in how the code ends up looking like and the functionality restriction:

- type classes are a sets of functionalities which you want to offer to some types and not for others
- tagless final wants to prove correctness of expressions of some types and not for others

See the overlap?

## 5. A "Tagless Final" Refactor

We can also take our own solution from the previous section and refactor it to use higher kinds.

We can group all our functionalities, i.e. the ability to construct expressions, operands and operators in a single type class, implemented in terms of an abstract type `E`:

```scala3
trait Algebra[E[_]] {
  def b(boolean: Boolean): E[Boolean]
  def i(int: Int): E[Int]
  def or(left: E[Boolean], right: E[Boolean]): E[Boolean]
  def and(left: E[Boolean], right: E[Boolean]): E[Boolean]
  def sum(left: E[Int], right: E[Int]): E[Int]
}
```

Although "algebra" is too fancy a term for my taste and for the pragmatic Scala programmer, we'll consider it here. Given this interface, we can now imagine some concrete representations of it; one simple example below:

```scala3
case class SimpleExpr[A](value: A)
given simpleExprAlg: Algebra[SimpleExpr] with {
  override def b(boolean: Boolean) = SimpleExpr(boolean)
  override def i(int: Int) = SimpleExpr(int)
  override def or(left: SimpleExpr[Boolean], right: SimpleExpr[Boolean]) = SimpleExpr(left.value || right.value)
  override def and(left: SimpleExpr[Boolean], right: SimpleExpr[Boolean]) = SimpleExpr(left.value && right.value)
  override def sum(left: SimpleExpr[Int], right: SimpleExpr[Int]) = SimpleExpr(left.value + right.value)
}
```

where the implementation of the `Algebra` for `SimpleExpr` was made a `given` (or an `implicit val` in Scala 2). The implementation is called an _interpreter_, which is one of many possible.

Now, if we want to reproduce the same expressions as last time, we'll need to build _programs_, i.e. build expressions using this `Algebra` trait.

```scala3
def program1[E[_]](using alg: Algebra[E]): E[Boolean] = {
  import alg._
  or(b(true), and(b(true), b(false)))
}

def program2[E[_]](using alg: Algebra[E]): E[Int] = {
  import alg._
  sum(i(24), i(-3))
}
```

And if we want to print the same result:

```scala3
def demoFinalTagless_v2(): Unit = {
  import TaglessFinal_V2._
  println(program1[SimpleExpr].value)
  println(program2[SimpleExpr].value)
}
```

This is what we end up with in libraries such as Cats Effect. We write very general code in terms of an effect type, and finally we plug it in at the "end of the world", where the type class instances for that effect type are brought into scope. I show that in the [Cats Effect course](https://rockthejvm.com/p/cats-effect), by the way.

However, using this style is not a requirement for a solution to be "tagless final".

Another question: why is there so much fuss about tagless final? It seems very abstract. How is this related to "real-life code"?

Tagless final indeed is a topic for abstract algebra, with examples in Haskell (a much more mathematical language than Scala). However, the problem that tagless final solves is very practical and very general. Just to give a 30-second refactor, we have our tagless-final-with-type-classes solution below:

```scala3
object TaglessFinal_V2 {
  trait Algebra[E[_]] {
    def b(boolean: Boolean): E[Boolean]
    def i(int: Int): E[Int]
    def or(left: E[Boolean], right: E[Boolean]): E[Boolean]
    def and(left: E[Boolean], right: E[Boolean]): E[Boolean]
    def sum(left: E[Int], right: E[Int]): E[Int]
  }

  case class SimpleExpr[A](value: A)
  given simpleExprAlg: Algebra[SimpleExpr] with {
    override def b(boolean: Boolean) = SimpleExpr(boolean)
    override def i(int: Int) = SimpleExpr(int)
    override def or(left: SimpleExpr[Boolean], right: SimpleExpr[Boolean]) = SimpleExpr(left.value || right.value)
    override def and(left: SimpleExpr[Boolean], right: SimpleExpr[Boolean]) = SimpleExpr(left.value && right.value)
    override def sum(left: SimpleExpr[Int], right: SimpleExpr[Int]) = SimpleExpr(left.value + right.value)
  }

  def program1[E[_]](using alg: Algebra[E]): E[Boolean] = {
    import alg._
    or(b(true), and(b(true), b(false)))
  }

  def program2[E[_]](using alg: Algebra[E]): E[Int] = {
    import alg._
    sum(i(24), i(-3))
  }
}
```

But this implementation can very well be the description of a realistic service, e.g. a user-login service:

```scala3
object TaglessFinal_V2 {
  trait UserLogin[E[_]] {
    def checkLogin(mfa: Boolean): E[Boolean]
    def countActiveSessions(server: Int): E[Int]
    def mfa_v1(email: E[Boolean], sms: E[Boolean]): E[Boolean]
    def mfa_v2(phone: E[Boolean], mobileApp: E[Boolean]): E[Boolean]
    def totalSessionLogins(server1Logins: E[Int], server2Logins: E[Int]): E[Int]
  }

  case class UserLoginStatus[A](value: A)
  given loginCapabilityImplementation: UserLogin[UserLoginStatus] with {
    override def checkLogin(mfa: Boolean) = UserLoginStatus(mfa)
    override def countActiveSessions(server: Int) = UserLoginStatus(server)
    override def mfa_v1(email: UserLoginStatus[Boolean], sms: UserLoginStatus[Boolean]) = UserLoginStatus(email.value || sms.value)
    override def mfa_v2(phone: UserLoginStatus[Boolean], mobileApp: UserLoginStatus[Boolean]) = UserLoginStatus(phone.value && mobileApp.value)
    override def totalSessionLogins(server1Logins: UserLoginStatus[Int], server2Logins: UserLoginStatus[Int]) = UserLoginStatus(server1Logins.value + server2Logins.value)
  }

  def userLoginFlow[E[_]](using alg: UserLogin[E]): E[Boolean] = {
    import alg._
    mfa_v1(checkLogin(true), mfa_v2(checkLogin(true), checkLogin(false)))
  }

  def checkLastStatus[E[_]](using alg: UserLogin[E]): E[Int] = {
    import alg._
    totalSessionLogins(countActiveSessions(24), countActiveSessions(3))
  }
}
```

Yes, it's the exact same code with different function names &mdash; we see this all the time in service descriptions based on the Cats Effect/Typelevel stack!

## 6. Conclusion

In this article, we visited the tagless final approach, what it involves and what it means for us as Scala programmers. If you now know

- where TF comes from
- that TF is just an extension of "programming to interfaces"
- that TF is not the same concept as `F[_]` + type classes, but only similar in representation

then I've done my job and this article (and the video above) is a success.
