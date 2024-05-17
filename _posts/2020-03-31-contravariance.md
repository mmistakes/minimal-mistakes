---
title: "Why is Scala contravariance so hard?"
date: 2020-03-31
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, type system]
excerpt: "The Scala type system is powerful, but also hard. We look at contravariance in Scala and try to make some sense out of it."
---

> We discuss variance and variance positions in depth in the [Advanced Scala](https://rockthejvm.com/p/advanced/scala) course. Check it out!

This article is for the Scala programmer who's either getting started with Scala generics, OR who has been using generics in their basic form, i.e. just attach type arguments, like

```scala
val list: List[Int] = List(1,2,3)
```

## So what's variance?

It's that cute little question: if dogs are animals, could lists of dogs be considered lists of animals as well? This is the variance question, i.e. whether the subtype relationship can be transferred to generic types.

If the answer to the variance question is "yes", then we consider the generic type covariant, and in Scala we write a + next to the type argument, like

```scala
abstract class List[+T]
```

which then allows us to operate with lists polymorphically:

```scala
val laika: Animal = new Dog("Laika")
val myDogs: List[Animal] = List(lassie, hachi, laika)
```

This is more easily understood. Dog subtype of Animal, therefore List[Dog] subtype of List[Animal].

However, that's not the only possible answer. We can also have no variance (no + sign), which makes a generic type invariant. This is the Java way of dealing with generics. Dog subtype of Animal? I don't care. List[Dog] and List[Animal] are two different types, with no relationship between them. That means if you write

```scala
val myDogs: List[Animal] = List(lassie, hachi, laika)
```

the code will not compile, because the compiler expects a List[Animal] and you're giving it a List[Dog].

That's not the end of it, though. There is still one more possible answer to the yes/no variance question. We dealt with the yes and no answers, but there is a third one, which sounds like "hell no" or "no, quite the opposite". This is contravariance.

## Enter contravariance

Let's get this straight. So we have Dog subtype of Animal, and we're wondering what could be the relationship between List[Dog] and List[Animal]. In the contravariance answer, we would have a list of animals being a subtype of a list of dogs, which is the exact opposite of covariance above. The following will be very confusing.

```scala
class MyList[-T]
val myAnimals: MyList[Dog] = MyList(crocodile, kitty, lassie) // some animals
```

When you write a minus in the generic type, that's a marker to the compiler that the generic type will have the subtype relationship exactly opposite to the types it wraps. Namely, MyList[Animal] is a subtype of a MyList[Dog]. The code above would compile, but we would not be happy, because it makes no sense. Why would we write that for a list? Why would a list of animals be a SUBTYPE of a list of dogs?

## The why

Why do we need contravariance? When should we use it?

## The because

Many Scala developers dismiss the variance concepts (contravariance in particular) as obscure and purely academic. However, if we think about other scenarios of real life, we can actually find some meaning in variance. Let's go back to the Dog-Animal relationship and let's try to imagine something like a Vet, which can heal an animal.

```scala
trait Vet[-T] { // we can also insert an optional -T <: Animal here if we wanted to impose a type constraint
    def heal(animal: T): Boolean
}
```

I've already defined it with a -T, for the following reason: if you ask me "Daniel, gimme a vet for my dog" and I'll give you a vet which can heal ANY animal, not just your dog, your dog will live.

```scala
val myDog = new Dog("Buddy")
val myVet: Vet[Dog] = new Vet[Animal] { ... }
myVet.heal(myDog)
```

Look at the above code until it makes sense. We're declaring a Vet[Dog], and instead we have a Vet[Animal], with the meaning that the vet can heal any animal, therefore it can work on my dog as well. The code will compile, our buddy will live, and we would be happy.

## The punchline

So when is it best to use covariance and contravariance? Clearly a contravariant list doesn't make sense (as we saw at the beginning), and in the exact same style, a covariant vet doesn't make sense.

Here's a rule of thumb: when your generic type "contains" or "produces" elements of type T, it should be covariant. When your generic type "acts on" or "consumes" elements of type T, it should be contravariant.

Examples of covariant concepts: a cage (holds animals), a garage (holds cars), a factory (creates objects), a list (and any other collection).
Examples of contravariant concepts: a vet (heals animals), a mechanic (fixes cars), a garbage pit (consumes objects), a function (it acts on/it's applied on arguments).
