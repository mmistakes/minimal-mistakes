---
title: "Variance Positions in Scala, Demystified"
date: 2020-11-10
header:
  image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [scala, type system]
excerpt: "We'll take a look at the famous \"covariant type occurs in contravariant position\" problem, and what we can do about it."
toc: true
toc_label: "In this article"
---

Variance in Scala is one of the most powerful concepts of its type system. It's simple in theory, but it can cause massive headaches when we think we got the hang of writing abstract, generic code. In this article, we'll take a careful and structured look at one of the most cryptic compiler errors you'll ever see:

Error: covariant type T occurs in contravariant position in type T of value myArg
{: .notice--danger}

We won't need a particular project setup for this article - a plain Scala/SBT project will do.

> We discuss variance and variance positions in depth in the [Advanced Scala](https://rockthejvm.com/p/advanced/scala) course. Check it out!
## 1. Background

This article will assume you're familiar with generics (either in Java, Scala or some other statically typed language).

Beyond the capability of the Java generics, Scala also has the concept of _variance_, which is a way of transferring the subtype relationship from the type arguments to the generic type.

This sounds quite complicated until we bring it back to real life. Imagine we're implementing a generic collection which we'll call `MyList[T]`. If we have a small class hierarchy &mdash; -e.g. the classical example with `Animal`s and then `Cat`s and `Dog`s which extend Animals &mdash; then it makes sense to ask the following question:

> If Dogs are also Animals, then is a list of Dogs also a list of Animals?

For a list, the answer is yes. However, this answer doesn't make sense for every type.

## 2. The Variance Question

To put it another way, if we wanted to write a new `Thing[T]` generic type in our code base, the following question is important:

> If A is a subtype of B, then should Thing[A] be a subtype of Thing[B]?

This is the _variance question_.

If our `Thing` is a collection, such as a list, the answer is yes: if Dogs are Animals, then a collection of Dogs is also a collection of Animals. So from a substitution perspective, we could assign a collection of Dogs to a collection of Animals:

```scala
val dogs: MyList[Animal] = new MyList[Dog]
```

We say that MyList is _covariant_ in its type argument [T], and we mark it with a small `+` sign in the class declaration: `class MyList[+T]`

But that's not the only possibility. We can also answer "no", i.e. Thing[A] and Thing[B] have no subtype relationship, i.e. we can't assign one to a value bearing the other type. In this case, we'd call Thing _invariant_ in its type argument [T], and we leave the type argument T as it is in the class declaration, i.e. `class Thing[T]`

There's still one more possible answer: "hell no, it's backwards!". In other words, if A is a subtype of B, _then `Thing[B]` is a subtype of `Thing[A]`_. This is called [contravariant](/contravariance), and we mark it with a `-` sign at the class declaration. For the Animals use case, a good contravariant example would be a Vet:

```scala
class Vet[-T]

val lassiesVet: Vet[Dog] = new Vet[Animal]
```

A Vet[Animal] is a proper replacement for a Vet[Dog], because a Vet can treat any Animal, and so she/he can treat a Dog too.

If you want to keep a good rule of thumb on how to pick variance for your new generic type, it's this:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">A year of mental strain on <a href="https://twitter.com/hashtag/Scala?src=hash&amp;ref_src=twsrc%5Etfw">#Scala</a> variance, compressed:<br><br>Covariant = retrieves or produces T.<br>Contravariant = acts on, or consumes T.</p>&mdash; Rock the JVM (@rockthejvm) <a href="https://twitter.com/rockthejvm/status/1316385189883453441?ref_src=twsrc%5Etfw">October 14, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 3. The Variance Positions Problem

Now that we've found that a collection should be covariant, we get to work and write our own list, because of course we can:

```scala
abstract class MyList[+T] {
  def head: T
  def tail: MyList[T]
  def add(elem: T): MyList[T]
}
```

We start from the very basics. But before we even write a proper subtype for MyList, we hit a wall:

Error: covariant type T occurs in contravariant position in type T of value elem
{: .notice--danger}

Just as we thought we understood variance, here comes the compiler trying to prove we don't know squat.

We'll take a careful, structured approach of what this problem means, and then we'll learn how we can solve it. For the following examples, we'll use the same example with animals.

### 3.1. Types of `val`s Are in Covariant Position

Let's say we had a Vet. As discussed before, a Vet should be a contravariant type. Let's also imagine this vet had a favorite animal `val` field, of the same type she can treat:

```scala
class Vet[-T](val favoriteAnimal: T)
```

Assuming this was possible, then the following code would compile:

```scala
val garfield = new Cat
val theVet: Vet[Animal] = new Vet[Animal](garfield)
val lassiesVet: Vet[Dog] = theVet
```

See any trouble here?

- `lassiesVet` is declared as `Vet[Dog]`; as per contravariance we can assign a `Vet[Animal]`
- `theVet` is a `Vet[Animal]` (typed correctly), but is constructed with a `Cat` (a legit Animal)
- `lassiesVet.favoriteAnimal` is supposed to be a `Dog` per the generic type declared, but it's really a `Cat` per its construction

No-no. This is a type conflict. A sound type checker will not compile this code. **We say that the types of `val` fields are in _covariant_ position**, and this is what the compiler will show you:

Error: contravariant type T occurs in covariant position in type T of value favoriteAnimal
{: .notice--danger}

If the generic type was covariant (e.g. a list), then it would work. If the generic type was invariant, we wouldn't even have this problem, as we'd have the same type T everywhere.

### 3.2. Types of `var`s Are Also in Contravariant Position

If our contravariant Vet example had a `var` field, we'd have the exact same problem right at initialization. Therefore, **types of `var` members are in _covariant_ position** as well. Because `var`s can be reassigned, they come with an extra restriction.

Let's think about `Option[T]` for a second. Should it be covariant or contravariant?

Spoiler: it's covariant. If `Dog` extends `Animal` then `Option[Dog]` should be a subtype of `Option[Animal]`. Pick your favorite reason (both are true):

- If a dog is an animal, then a maybe-dog is also a maybe-animal.
- Think of an Option as a list with at most one element. If a list is covariant, then an option is covariant.

Now, imagine that (for whatever reason) we had a mutable version of an option. Let's call it `MutableOption[+T]` with a subtype containing a `var` member, e.g. `class MutableSome[+T](var contents: T)`.

Here's what we're going to do next:

```scala
val maybeAnimal: MutableSome[Animal] = new MutableSome[Dog](new Dog)
maybeAnimal.contents = new Cat
```

The first line is perfectly legal: because `MutableSome` is covariant, we can assign a maybe-dog on the right-hand side of the assignment. Now, because we declared `maybeAnimal` to be a `MutableSome[Animal]`, the compiler would allow us to change the `contents` variable to another kind of `Animal`. Because a `Cat` is an `Animal`, then a `Cat` is a legal value to use, which would also blow up the type guarantee. That is because the original `MutableSome[Dog]` we used on the first line also comes with a guarantee that the contents are of type `Dog`, but we've just ruined it.

Therefore, we say that **types of `var` fields are in _contravariant_ position**.

But wait, didn't we say that they were in _covariant_ position as per the earlier argument?

Yes! That's true as well. **The types of `var` fields are in _covariant AND contravariant_ position**. The only way they would work is if the generic type were invariant, which eliminates the problem (same type argument everywhere, no need for substitution).

### 3.3. Types of Method Arguments Are in Contravariant Position

This says it all. How do we prove it? We try the reverse and see how it's wrong.

Let's take the (now) classical example of a list. A list is covariant, we know that. So what would be wrong with

```scala
abstract class MyList[+T] {
  def head: T
  def tail: MyList[T]
  def add(elem: T): MyList[T]
}
```

Let's imagine this code compiled. Let's also imagine we gave some dummy implementations to these methods, as the implementation doesn't matter, only their signature. As per the covariance declaration, we could say

```scala
val animals: MyList[Animal] = new MyList[Cat]
val moreAnimals = animals.add(new Dog)
```

which again breaks the type guarantees. Line 2 allows us to add an Animal to `animals`, and a Dog is an Animal, so we can. However, at line 1, we are using a `MyList[Cat]`, which bears the guarantee that the list contains just cats, and we've just added a Dog to it, which breaks the type checker. Therefore, we say that **the type of method arguments is in _contravariant_ position**.

The (contravariant) Vet example works:

```scala
class Vet[-T] {
  def heal(animal: T): Boolean = true // implementation unimportant
}

val lassiesVet: Vet[Dog] = new Vet[Animal]
lassiesVet.heal(lassie) // correct; it's a Dog, which is also an Animal; Vet[Animal] can heal any Animal
lassiesVet.heal(garfield) // legitimate error: Lassie's vet heals Dogs, so Cats aren't allowed
```

### 3.4. Method Return Types Are in Covariant Position

Again, we can prove the title by trying the reverse. Assume a contravariant type (again, our favorite Vet) and write a method returning a T:

```scala
abstract class Vet[-T] {
  def rescueAnimal(): T
}
```

In this case, we can write

```scala
val vet: Vet[Animal] = new Vet[Animal] {
  override def rescueAnimal(): Animal = new Cat
}

val lassiesVet: Vet[Dog] = vet // OK because it's a Vet[Animal]
val rescuedDog: Dog = vet.rescueAnimal // what's up dawg, I'm a Cat
```

Again, breaking the type guarantees: we use a `Vet[Animal]` whose method returns a `Cat`, so when we finally invoke the method on `lassiesVet` (which is declared as `Vet[Dog]`), the type checker expects a `Dog` but we get a `Cat` per its real implementation! Not funny.

Therefore, we say **method return types are in _covariant_ position**. A covariant example works fine for this case.

## 4. How to Solve the Variance Positions Problem

We proved that a covariant list cannot have an `add(elem: T)` method because it breaks type guarantees. However, does that forbid us from ever adding an element to a list?!

Hell, no.

Let's take this back to first principles. We [said](#33-types-of-method-arguments-are-in-contravariant-position) that we can't add an `add(elem: T)` method to a list, because otherwise we could write

```scala
val animals: MyList[Animal] = new MyList[Dog]
val moreAnimals = animals.add(new Cat)
```

Go back to real life: if we had 3 dogs and a cat, what would the group of 4 be called?

Animals. The most specific type that describes all four.

What if our `add(elem: T): MyList[T]` received an argument of a different type and returned a result of a different type? Allow me to make a suggestion:

```scala
def add[S >: T](elem: S): MyList[S]
```

In other words, if we happen to add an element of a different type than the original list, we'll let the compiler infer the lowest type S which describes both the element being added AND the existing elements of the list. As a result, we'll obtain a `MyList[S]`. In our cats vs dogs example, if we add a cat to a list of dogs, we'll obtain a list of animals. If we add a flower to it, we'll obtain a list of life forms. If we add a number, we'll obtain a list of Any. You get the idea.

This is how we solve the cryptic "covariant type T occurs in contravariant position":

```scala
abstract class MyList[+T] {
  def add[S >: T](elem: S): MyList[S]
}
```

Similarly, we can solve the opposite "contravariant type occurs in covariant position" with the opposite type bound:

```scala
abstract class Vet[-T] {
  def rescueAnimal[S <: T](): S
}
```

Assuming we can actually implement this method in such general terms, the compiler would be happy: we can force the Vet to return an instance of a particular type:

```scala
val lassiesVet: Vet[Dog] = new Vet[Animal]
val rescuedDog: Dog = vet.rescueAnimal[Dog] // type checking passes now
```

## 5. Conclusion

This is one of the hardest parts of the Scala type system, even though it starts from such an innocent question (should lists of dogs be lists of animals). If you're curious, the [advanced Scala course](https://rockthejvm.com/p/advanced-scala) contains what you've just learned (and lots more on Scala's type system) with some practice exercises.

This article was pretty dense, and we learned quite a bit:

- the variance question: if A extends B, should `Thing[A]` be a subtype of `Thing[B]`?
- variance possibilities as answers to the variance question: covariant (yes), invariant (no), contravariant (hell no, backwards)
- types `val` fields are in covariant position
- types of `var` fields are in covariant AND contravariant position
- types of method arguments are in contravariant position
- method return types are in covariant position
- we solve the "covariant type occurs in contravariant position" by "widening": we add a type argument `[S >: T]` and change the argument type to S
- we solve the "contravariant type occurs in covariant position" by "narrowing": we add a type argument `[S <: T]` and change the method return type to S

## 6. Watch on YouTube

{% include video id="aUmj7jnXet4" provider="youtube" %}
