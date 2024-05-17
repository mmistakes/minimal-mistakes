---
title: "Free Monad in Scala"
date: 2022-05-26
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [abstract]
excerpt: "A tutorial on the Free monad in Scala, how it works and what it's good for."
---

This article describes the Free monad in Scala &mdash; how it works, what it's good for and why we need it in the first place.

This piece assumes you're already very comfortable with Scala. If you know a bit of Cats (which we teach in the [Cats course](https://rockthejvm.com)), that's a bonus, but not required for this article, because we're going to lay all the groundwork for what we need here.

This post was written for Scala 3, but the concepts work almost identically for Scala 2 if you replace [givens with implicits](/givens-vs-implicits/).

If you want to see this article in video form, please watch below:

{% include video id="lzlCjgRWPDU" provider="youtube" %}

## 1. Introduction

In order to describe the Free monad, we need to understand what a Monad is. We've already written several approaches to it:

- [a way to avoid cluttered code](/monads/)
- [a type describing sequential computations](/another-take-on-monads/)
- [a monoid in the category of endofunctors](/monads-are-monoids-in-the-category-of-endofunctors/)

I encourage you to read at least the first two approaches. Monads are very powerful and form the building blocks for every useful piece of purely functional code. We describe monads as a type class, which takes a generic type argument which is itself generic (a higher-kinded type):

```scala3
trait Monad[M[_]] {
  def pure[A](a: A): M[A]
  def flatMap[A, B](ma: M[A])(f: A => M[B]): M[B]
}
```

Monads describe, in essence, two fundamental operations:

- a way to wrap a plain value into a "wrapper" type
- a way to obtain a wrapper type from another, through a specific kind of transformation function

Just from these two operations, we can describe an incredible variety of computations:

- sequential collections, e.g. lists
- potentially absent values, i.e. Options
- computations that might fail, i.e. Try
- potentially failed computations with an error type of our choosing, e.g. Either
- computations that might perform side effects, i.e. IO from [Cats Effect](https://rockthejvm.com/p/cats-effect)
- combinations thereof, e.g. ZIO, which take dependencies, can fail, and can perform side effects in the same computation

The Free monad describes a similar "sequential" capability for a wrapper type _and for a well-defined value type_.

## 2. Enter The Free Monad

The Free monad in Scala can be described by a similar type signature, taking a type argument `M[_]` which is the container exhibiting monadic capabilities, _and_ a type argument `A` which is the value type with which that wrapper is defined. In other words, a Free monad trait can be written as

```scala3
trait Free[M[_], A]
```

Because it's a monad, we can also write the `pure` and `flatMap` methods, with the exact same meaning. However, since the Free data type has a slightly different signature, the `pure` and `flatMap` will also look a little different:

```scala3
trait Free[M[_], A] {
  def pure(a: A): Free[M, A]
  def flatMap[B](f: A => Free[M, B]): Free[M, B]
}
```

A difference from the "regular" monad is that in this case, we shouldn't really need an instance of Free to build a new instance of Free with the `pure` method. So we'll move the `pure` method to a companion object, while keeping the `pure` concept intact:

```scala3
trait Free[M[_], A] {
  def flatMap[B](f: A => Free[M, B]): Free[M, B]
}

object Free {
  def pure[M[_], A](a: A): Free[M, A] = ???
}
```

We'll leave the `pure` method unimplemented for now. The important bit is that we have the same `pure` + `flatMap` concepts here as well, even though the methods themselves are moved to different places. Now, because we have `pure` and `flatMap`, we can implement the `map` method for free &mdash; as we teach in the [Scala with Cats course](https://rockthejvm.com), the Functor's fundamental method can be expressed in terms of `pure` and `flatMap`:

```scala3
trait Free[M[_], A] {
  // ... the rest of the code
  import Free._
  def map[B](f: A => B): Free[M, B] = flatMap(a => pure(f(a)))
}
```

This `map` method will come in handy later.

Besides `pure`, `flatMap` and `map` (which derives from the other two), we also have a function that turns a regular `M[A]` into a Free instance. This function is called "lift", either named `liftM` or `liftM` in real libraries, and looks like this:

```scala3
object Free {
  // ... the rest of the code
  def liftM[M, A](ma: M[A]): Free[M, A]
}
```

That's it! This is the Free monad.

But... why?

Before we implement an actual Free monad, we'll take a detour to explain why the Free monad is a useful concept in the first place. We'll go through an example to understand how the Free monad would be actually used.

## 3. Why We Need The Free monad

### 3.1. Writing Programs with The Free Monad

Let's imagine we're writing a small tool to interact with a custom database we have at work. For the sake of simplicity, we'll assume the fundamental operations of the database to be the regular CRUD:

```scala3
trait DBOps[A]
case class Create[A](key: String, value: A) extends DBOps[Unit]
case class Read[A](key: String) extends DBOps[A]
case class Update[A](key: String, value: A) extends DBOps[A]
case class Delete(key: String) extends DBOps[Unit]
```

This suite of operations (some of which can wrap others in real libraries) bears the fancy name of "algebra", for the reason that any expression composed out of these fundamental types through some operators (like nesting or regular methods) belong to this group as well.

It's easy to imagine an example of an interaction with such a database:

- read something from a key, like the name of a person
- change it, e.g. run a `toUppercase` on it
- associate this new value to another key
- delete the old key

This is a sequential suite of operations. Because it's sequential, a monadic data type to describe all of these operations can prove very useful. However, instead of writing a type class instance for `Monad[DBOps]` and following the [tagless-final](/tagless-final) approach, we're going to use a Free monad:

```scala3
type DBMonad[A] = Free[DBOps, A]
```

Because we're using a Free monad, instead of describing combinators of the data types above, we're going to "lift" them to Free through smart constructors:

```scala3
def create[A](key: String, value: A): DBMonad[Unit] =
  Free.liftM[DBOps, Unit](Create(key, value))

def get[A](key: String): DBMonad[A] =
  Free.liftM[DBOps, A](Read[A](key))

def update[A](key: String, value: A): DBMonad[A] =
  Free.liftM[DBOps, A](Update[A](key, value))

def delete(key: String): DBMonad[Unit] =
  Free.liftM(Delete(key))
```

and with these smart constructors in place, we can immediately imagine an abstract program that does what we said above &mdash; read, change, create new entry, delete old entry:

```scala3
  def myLittleProgram: DBMonad[Unit] = for {
    _ <- create[String]("123-456", "Daniel")
    name <- get[String]("123-456")
    _ <- create[String]("567", name.toUpperCase())
    _ <- delete("123-456")
  } yield ()
```

This program can be completely described in terms of the Free monad, regardless of what wrapper type we use. The only problem is that it's a _description_ of a computation; it does not perform any meaningful work in the world, like, you know, interacting with an actual database.

We need something to _interpret_ this program.

### 3.2. Free Monad FoldMap

What does "interpretation" even mean? Interpreting a program means transforming this abstract program written in terms of the Free monad into another data type that actually performs the computations when evaluated. A good candidate for such a data structure is, for example, the Cats Effect IO. However, we can pick another data type of our choosing, with the meaning of

- potentially absent values: Option
- potentially failed computations: Try
- potentially failed computations with an error type of our choosing: Either
- computations that can perform side effects: IO
- combinations of the above: ZIO
- aggregating values: List

This is why the Free monad has another operation that can "evaluate" an instance of Free to one of these data types. The operation is called `foldMap` and looks like this:

```scala3
trait Free[M[_], A] {
    // ... existing code
    def foldMap[G[_]: Monad](natTrans: M ~> G): G[A]
}
```

This one is a bit more complicated. Let's take each piece in turn.

First of all, what's a `natTrans` and the `~>` symbol? The concept of "natural transformation" is a higher-kinded Function1 type that looks like this:

```scala3
  trait ~>[F[_], G[_]] {
    def apply[A](fa: F[A]): G[A]
  }
```

So instead of a regular Function1 taking value types as type parameters, now we operate at a higher kind. We used this concept in our demonstration for why [monads are monoids in the category of endofunctors](/monads-are-monoids-in-the-category-of-endofunctors/). Examples of natural transformations in real life include:

- `Try[A].toOption`: this is an example of an implementation of a natural transformation between `Try` and `Option`
- `List[A].headOption` which returns the head of the list, if it exists: an example of an implementation of a natural transformation between `List` and `Option`
- `Option[A].toList`: the reverse

We can abstract away this concept of natural transformation by the `~>` symbol, which looks like a function type at a higher kind.

Back to `foldMap`. Notice that the return value of `foldMap` is `G[A]`, so a different monadic type than `M[_]`, assuming that G "is" a Monad, by the context bound `G[_]: Monad`. This is important, because the evaluation of an instance of Free can only happen if the wrapper type which we're evaluating _to_ is also a monad, i.e. exhibits monadic behavior.

### 3.3. Natural Transformations

For our little program, we can interpret it with `foldMap`, if we can create a natural transformation from our type `DBOps` to some other type that will actually perform the actions described by the program. Let's write a simple IO data type in the style of Cats Effect:

```scala3
case class IO[A](unsafeRun: () => A)
object IO {
  def create[A](a: => A): IO[A] = IO(() => a)
}
```

The IO type encapsulates computations that evaluate to `A`, with potential side effects. The IO data type is a monad, meaning that we can create a Monad instance for it:

```scala3
given ioMonad: Monad[IO] with {
  override def pure[A](a: A) =
    IO(() => a)
  override def flatMap[A, B](ma: IO[A])(f: A => IO[B]) =
    IO(() => f(ma.unsafeRun()).unsafeRun())
}
```

Being a monad, the IO data type is a suitable "evaluator" for our abstract program. The only piece that we need is a natural transformation from `DBOps` to IO. This natural transformation is the logic of evaluating the abstract CRUD operations (for now just data structures) into actual effects in the real world. For that, we'll need an actual database to store and retrieve data. For this simple example, we'll assume a simple mutable map, but this can easily be replaced in practice by a real database.

```scala3
val myDB: mutable.Map[String, String] = mutable.Map()
```

For _our_ particular database, in order to read/write values of type `A`, we'll also provide some awesome serialization/deserialization API to/from String:

```scala3
def serialize[A](a: A): String = a.toString
def deserialize[A](value: String): A = value.asInstanceOf[A]
```

Of course, with your own database, the communication protocol will be different, but for this example it'll be sufficient.

The natural transformation from `DBOps` to our IO data type will need to take the "database" and the "protocol" into account. All we need to do is convert all cases of `DBOps` into proper `IO`s that will perform effects on the database when evaluated, so we can resort to simple pattern matching for this:

```scala3
val dbOps2IO: DBOps ~> IO = new (DBOps ~> IO) {
  override def apply[A](fa: DBOps[A]): IO[A] = fa match {
    case Create(key, value) => IO.create {
      // database insert query - here, just printing
      println(s"insert into people(id, name) values ($key, $value)")
      myDB += (key -> serialize(value))
      ()
    }
    case Read(key) => IO.create {
      println(s"select * from people where id=$key limit 1")
      deserialize(myDB(key))
    }
    case Update(key, value) => IO.create {
      println(s"update people(name=$value) where id=$key")
      val oldValue = myDB(key)
      myDB += (key -> serialize(value))
      deserialize(oldValue)
    }
    case Delete(key) => IO.create {
      println(s"delete from people where id=$key")
      ()
    }
  }
}
```

### 3.4. Evaluating the Program

With all pieces in place, we can now run the interpreter of our abstract program with `foldMap` and with the natural transformation we've just implemented:

```scala3
val ioProgram: IO[Unit] = myLittleProgram.foldMap(dbOps2IO)
```

This is a single `IO[Unit]` effect which can be passed around, reused, or "run" in main:

```scala3
def main(args: Array[String]): Unit = {
  ioProgram.unsafeRun() // PERFORMS THE ACTUAL WORK
}
```

This will execute the IO effect, which in turn will evaluate our abstract program.

### 3.5. The Free Monad Pattern

Why have we gone all this way just to insert a bunch of data into a database?

The Free monad is a pattern which allows us to separate

- the description of fundamental operations
- the business logic of our application
- the evaluation of that business logic

In other words, our abstract program is what matters for our application/business logic. We can keep that fixed, and give it different interpreters depending on how our requirements change &mdash; e.g. perhaps we want the program to be evaluated asynchronously &mdash; or we can do the reverse. This makes it very easy to maintain, because we can work independently on either

- the business logic, while keeping interpreters fixed
- the interpreters, while keeping the business logic fixed
- the fundamental operations and the interpreter(s), while keeping the business logic fixed

So notice the **flexibility** we get by choosing to work on a piece of the system without affecting the others. Another benefit of this approach is **testability**, because we can always supply a "testing" monad to evaluate the program, make assertions and ensure the business logic is correct, while the interpreter itself can be independently tested.

## 4. Implementing a Free Monad

You might have noticed that our current code is incomplete. We took a detour to understand the reasons why Free monads are useful and how they help with code decoupling. Let's move back to the Free monad itself, because our Free type currently looks like this:

```scala3
trait Free[M[_], A] {
  def flatMap[B](f: A => Free[M, B]): Free[M, B]
  def map[B](f: A => B): Free[M, B] = flatMap(a => pure(f(a)))
  def foldMap[G[_]: Monad](natTrans: M ~> G): G[A]
}

object Free {
  def pure[M[_], A](a: A): Free[M, A] = ???
  def liftM[M[_], A](ma: M[A]): Free[M, A] = ???
}
```

We're going to write actual instances of Free as case classes for all fundamental operations:

- pure
- flatMap
- liftM

```scala3
object Free {
  // ... existing code
  case class Pure[M[_], A](a: A) extends Free[M, A]
  case class FlatMap[M[_],A,B](fa: Free[M, A], f: A => Free[M, B]) extends Free[M, B]
  case class Suspend[M[_], A](ma: M[A]) extends Free[M, A]
}
```

The `Pure` type simply wraps a single value of type `A`; we'll make use of this later when we evaluate `foldMap`. The `FlatMap` case class follows the signature of the `flatMap` method in the Free trait, keeping the Free instance to be transformed and a function to turn an `A` into another instance of `Free[M, B]`. The final case class is `Suspend` which corresponds to the `liftM` method.

With these case classes in place, we can evaluate `pure`, `flatMap` and `liftM` immediately:

```scala3
trait Free[M[_], A] {
  import Free.*
  def flatMap[B](f: A => Free[M, B]): Free[M, B] = FlatMap(this, f) // added now
  def map[B](f: A => B): Free[M, B] = flatMap(a => pure(f(a)))
  def foldMap[G[_]: Monad](natTrans: M ~> G): G[A]
}

object Free {
  def pure[M[_], A](a: A): Free[M, A] = Pure(a) // added now
  def liftM[M[_], A](ma: M[A]): Free[M, A] = Suspend(ma) // added now

  // added earlier
  case class Pure[M[_], A](a: A) extends Free[M, A]
  case class FlatMap[M[_],A,B](fa: Free[M, A], f: A => Free[M, B]) extends Free[M, B]
  case class Suspend[M[_], A](ma: M[A]) extends Free[M, A]
}
```

So the final piece that we need to implement is `foldMap`. The `foldMap` method will now need to evaluate this Free instance, depending on which type this instance belongs to:

- If this instance is a `Pure`, then return a "pure" `G[A]`. Because `G` is a monad, we can do that easily.
- If this instance is a `Suspend`, then take the `M[A]` wrapped inside and turn that into a `G[A]` because we have the natural transformation handy.
- If this instance is a `FlatMap`, then this instance has two fields: another Free instance and a transformation function.
  - Run a recursive `foldMap` on the wrapped Free instance, returning a `G[A]`.
  - Then `flatMap` that because `G` is a monad, so we can use the Monad instance to do it.

Notice how the presence of a given/implicit `Monad[G]` in scope is crucial here. Our code for `foldMap` is as follows:

```scala3
def foldMap[G[_]](natTrans: M ~> G)(using monadG: Monad[G]): G[A] = this match {
  case Pure(a) => Monad[G].pure(a)
  case Suspend(ma) => natTrans.apply(ma)
  case FlatMap(fa, f) =>
    monadG.flatMap(fa.foldMap(natTrans))(a => f(a).foldMap(natTrans))
}
```

Here, we've slightly changed the signature of `foldMap` so that we can make use of the given `Monad[G]`, but we can also keep the old signature and add a summoning method for Monad:

```scala3
// alternative
object Monad {
  def apply[M[_]](using monad: Monad[M]): Monad[M] = monad
}

trait Free[M[_], A] {
  // ... existing code

  // added now
  def foldMap[G[_]: Monad](natTrans: M ~> G): G[A] = this match {
     case Pure(a) => Monad[G].pure(a)
     case Suspend(ma) => natTrans.apply(ma)
     case FlatMap(fa, f) => // need a G[B]
       Monad[G].flatMap(fa.foldMap(natTrans))(a => f(a).foldMap(natTrans))
   }
}
```

### 5. Final Code

The full program with all pieces put together looks like this:

```scala3
object FreeMonad {
  trait Monad[M[_]] {
    def pure[A](a: A): M[A]
    def flatMap[A, B](ma: M[A])(f: A => M[B]): M[B]
  }

  object Monad {
    def apply[M[_]](using monad: Monad[M]): Monad[M] = monad
  }

  trait ~>[F[_], G[_]] {
    def apply[A](fa: F[A]): G[A]
  }

  trait Free[M[_], A] {
    import Free.*
    def flatMap[B](f: A => Free[M, B]): Free[M, B] = FlatMap(this, f)
    def map[B](f: A => B): Free[M, B] = flatMap(a => pure(f(a)))
    def foldMap[G[_]: Monad](natTrans: M ~> G): G[A] = this match {
      case Pure(a) => Monad[G].pure(a)
      case Suspend(ma) => natTrans.apply(ma)
      case FlatMap(fa, f) => // need a G[B]
        Monad[G].flatMap(fa.foldMap(natTrans))(a =>     f(a)      .foldMap(natTrans) )
    }
  }

  object Free {
    def pure[M[_], A](a: A): Free[M, A] = Pure(a)
    def liftM[M[_], A](ma: M[A]): Free[M, A] = Suspend(ma)

    case class Pure[M[_], A](a: A) extends Free[M, A]
    case class FlatMap[M[_],A,B](fa: Free[M, A], f: A => Free[M, B]) extends Free[M, B]
    case class Suspend[M[_], A](ma: M[A]) extends Free[M, A]
  }

  // sequence computations as data structures, THEN attach the monadic type at the end
  // "algebra"
  trait DBOps[A]
  case class Create[A](key: String, value: A) extends DBOps[Unit]
  case class Read[A](key: String) extends DBOps[A]
  case class Update[A](key: String, value: A) extends DBOps[A]
  case class Delete(key: String) extends DBOps[Unit]

  // definitions - fancier algebra
  type DBMonad[A] = Free[DBOps, A]

  // "smart" constructors
  def create[A](key: String, value: A): DBMonad[Unit] =
    Free.liftM[DBOps, Unit](Create(key, value))

  def get[A](key: String): DBMonad[A] =
    Free.liftM[DBOps, A](Read[A](key))

  def update[A](key: String, value: A): DBMonad[A] =
    Free.liftM[DBOps, A](Update[A](key, value))

  def delete(key: String): DBMonad[Unit] =
    Free.liftM(Delete(key))

  // business logic is FIXED
  def myLittleProgram: DBMonad[Unit] = for { // monadic
    _ <- create[String]("123-456", "Daniel")
    name <- get[String]("123-456")
    _ <- create[String]("567", name.toUpperCase())
    _ <- delete("123-456")
  } yield () // description of a computation

  // evaluate the program - interpreter/"compiler"
  // IO
  case class IO[A](unsafeRun: () => A)
  object IO {
    def create[A](a: => A): IO[A] = IO(() => a)
  }

  given ioMonad: Monad[IO] with {
    override def pure[A](a: A) = IO(() => a)
    override def flatMap[A, B](ma: IO[A])(f: A => IO[B]) =
      IO(() => f(ma.unsafeRun()).unsafeRun())
  }

  val myDB: mutable.Map[String, String] = mutable.Map()
  // TODO replace these with some real serialization
  def serialize[A](a: A): String = a.toString
  def deserialize[A](value: String): A = value.asInstanceOf[A]

  // nat trans DBOps -> IO
  val dbOps2IO: DBOps ~> IO = new (DBOps ~> IO) {
    override def apply[A](fa: DBOps[A]): IO[A] = fa match {
      case Create(key, value) => IO.create { // actual code that uses the database
        println(s"insert into people(id, name) values ($key, $value)")
        myDB += (key -> serialize(value))
        ()
      }
      case Read(key) => IO.create {
        println(s"select * from people where id=$key limit 1")
        deserialize(myDB(key))
      }
      case Update(key, value) => IO.create {
        println(s"update people(name=$value) where id=$key")
        val oldValue = myDB(key)
        myDB += (key -> serialize(value))
        deserialize(oldValue)
      }
      case Delete(key) => IO.create {
        println(s"delete from people where id=$key")
        ()
      }
    }
  }

  val ioProgram: IO[Unit] = myLittleProgram.foldMap(dbOps2IO)

  def main(args: Array[String]): Unit = {
    ioProgram.unsafeRun() // PERFORMS THE ACTUAL WORK
  }
}
```


## 6. Conclusion

In this article, we did a comprehensive overview of what a Free monad is, why it's useful, how it helps us decouple our code, how it adds flexibility and testability in our programs, and we implemented our own simple version of a Free monad along with an example abstract program and an interpreter for it in the style of Cats Effect.

Use it well!
