---
title: "Immutable Doubly Linked Lists in Scala with Call-By-Name and Lazy Values"
date: 2020-12-04
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, data structures]
excerpt: "I'll show you a technique to use lazy values and call-by-name for recursive value definitions and implement a fully immutable doubly-linked list in Scala."
---

This article is for the Scala programmers who want to brush up on their data structures. However, even seasoned developers might find the following problem challenging:

> How would you write a simple, fully immutable, doubly-linked list in Scala?

If you're up for a challenge, try your hand at this problem before reading the rest of the article. You might find it's not quite what you'd expect.

This article was inspired by a question from one of my students who got the point of my initial singly linked list implementation and wanted to move one level up. However simple a doubly-linked-list might be conceptually, this student picked quite a difficult data structure for practice.

## 1. The Disclaimer

A doubly-linked list doesn't offer too much benefit in Scala, quite the contrary. The complexity is still O(1) for accessing the "head" i.e. the current element you're pointing at, and O(n) for basically everything else. While appending was O(n) for singly-linked lists, now you'll get O(n) for _prepending_ as well for doubly-linked lists. Not to mention you'd have to replace the entire list for every modification.

So this data structure is pretty useless from a practical standpoint, which is why (to my knowledge) there is no doubly-linked list in the Scala standard collection library. The only utility in having a doubly-linked list is the ability to traverse the list in both directions.

All that said, a doubly-linked list is an excellent exercise on the mental model of immutable data structures.

## 2. The Challenge with a Doubly-Linked List

Implementing a _singly_ linked list is relatively easy. Define a list interface with some basic methods:

```scala
trait MyList[+T] {
  def head: T
  def tail: MyList[T]
  def ::[S >: T](element: S): MyList[S]
}
```

with a type widening `[S >: T]` to save ourselves the trouble of the [cryptic variance positions error](/scala-variance-positions/) (read that article first to understand what's happening, if you're curious about it).

Then the implementation would be pretty straightforward: an empty object which is a `MyList[Nothing]`, and a non-empty `Cons[+T]` &mdash; Cons stands for "constructor", an ancient primitive for lists in functional languages. So you'd end up with something like this:

```scala
case object Empty extends MyList[Nothing] {
  override def head: Nothing = throw new NoSuchElementException("head of an empty list")
  override def tail: Nothing = throw new NoSuchElementException("tail of an empty list")
  override def ::[S >: Nothing](element: S): MyList[S] = Cons(element, Empty)
}

// head/tail are vals, they don't need to be evaluated every time
case class Cons[+T](override val head: T, override val tail: MyList[T]) extends MyList[T] {
  override def ::[S >: T](element: S): MyList[S] = Cons(element, this)
}
```

The point being that adding an element is straightforward: create a new node, point the tail to the existing list, then return the new node as the head of the resulting list.

Let's try the same with a doubly-linked list. This time we have two list references (because we can traverse both ways), and we have two addition methods because we can add to either end of the list:

```scala
trait DLList[+T] {
  def value: T // "head" doesn't feel right
  def prev: DLList[T]
  def next: DLList[T]
  def prepend[S >: T](element: S): DLList[S]
  def append[S >: T](element: S): DLList[S]
}
```

Assuming we had a similar Cons-like data type for a non-empty list, the Empty case would be straightforward:

```scala
case object DLEmpty extends DLList[Nothing] {
  override def value = throw new NoSuchElementException("head of an empty list")
  override def prev = throw new NoSuchElementException("prev of an empty list")
  override def next = throw new NoSuchElementException("tail of an empty list")

  override def prepend[S >: Nothing](element: S) = new DLCons(element, DLEmpty, DLEmpty)
  override def append[S >: Nothing](element: S) = new DLCons(element, DLEmpty, DLEmpty)
}
```

Now the Cons thing (which I've named DLCons) is not straightforward. Let's say we're looking at the list `[1,2,3]` and our "pointer" is at 2. How do we prepend an element to this list? We'd have to find the starting node of the list, add a new one, and have its `next` reference point to the existing list, correct?

Not so fast.

  - Because this is a doubly-linked list, the existing "left-end" of the list would have to point to the new node as well.
  - Which means we'd have to replace it with a new node.
  - However, this new node's `next` reference would have to point to the remainder of the list.
  - Which means that we'd have to replace this existing node in the list with a new node as well.
  - And so on, for the entire list...
  - ...without any mutable variables.

Turns out that's hard to do in a single operation. We can't have two declared nodes reference each other, because at least one would have to be a forward declaration. Demo with a circular singly linked list (which doesn't work):

```scala
val a = Cons(3, b) // who's b? I can't create a
val b = Cons(4, a) // who's a?
```

An imperative approach would quickly solve this problem because we're allowed to mutate references: for example we could start with nodes pointing at `null`, then change the references to point to the right nodes. But we're not allowed mutation, so we have our hands tied.

## 3. Enter Call-By-Name and Lazy Vals

This section assumes you know call-by-name and lazy values. A quick recap:

  - The marker `=>` attached to a method argument means that this argument will _not_ be evaluated until needed, and it will be evaluated as many times as it's used in the method body. This is a "call-by-name", or simply by-name, argument.
  - A `lazy` variable (either `val` or `var`) means that the variable will only be evaluated when used _for the first time_. After the first use, the value will be already set and won't need recomputing.

These two features have pretty powerful consequences, especially [when used in conjunction](/3-tricks-for-cbn/#trick-2---manageable-infinity).

For our use-case this delayed computation allows us to use _forward references_. Here is a first stab at the non-empty doubly-linked list:

```scala
class DLCons[+T](override val value: T, p: => DLList[T], n: => DLList[T]) extends DLList[T] {
  override lazy val prev: DLList[T] = p
  override lazy val next: DLList[T] = n
}
```

Obviously, the `prepend` and `append` methods are the meat of the problem. Let's take prepending, without loss of generality &mdash; appending will be implemented in a perfectly symmetrical way.

As we mentioned earlier, prepending means:

  - finding the "left-end" of the list
  - adding a new node
  - pointing that node's `next` reference to the rest of the list...
  - ...which also needs to update its `prev` and `next` reference throughout the list

## 4. Forward References and Lazy Vals

Let's take the smaller problem of updating a node's `prev` reference. Let's say we have the list `[1,2,3,4]`, pointing at 1. We want to change this node's `left` reference to another value, say 5, so we'll end up with `[5,1,2,3,4]`.

First, we need to create another node whose `prev` reference now points where we wanted.

```
old:     1 ⇆ 2 ⇆ 3 ⇆ 4
new: 5 ← 1
```

We then need to update the `prev` reference of the _next_ node (this case 2), while updating the `next` reference of the new 1, _in the same operation_.

```
old:     1 ⇆ 2 ⇆ 3 ⇆ 4
new: 5 ← 1 ⇆ 2
```

Think about it: this operation in Java would have been done in 3 steps:

  - new node
  - new node's prev is 1
  - 1's next is the new node

If we can execute that new `1 ⇆ 2` _in the same expression_, we've made it; we can then recursively apply this operation on the rest of the list. Strangely enough, it's possible. Here's how we can do it. We'll define two more methods in the main trait:

```scala
trait DLList[+T] {
  // ... other methods
  def updatePrev[S >: T](newPrev: => DLList[S]): DLList[S]
  def updateNext[S >: T](newNext: => DLList[S]): DLList[S]
}
```

(notice the by-name argument)
These methods will be straightforward in the Empty case since there's no reference to update:

```scala
case object DLEmpty extends DLList[Nothing] {
  // ... other methods
  override def updatePrev[S >: Nothing](newPrev: => DLList[S]): DLList[S] = this
  override def updateNext[S >: Nothing](newNext: => DLList[S]): DLList[S] = this
}
```

Now for the non-empty list, we'll use lazy vals and we'll exploit the fact that the constructor arguments for `DLCons` are by-name:

```scala
class DLCons[+T](override val value: T, p: => DLList[T], n: => DLList[T]) extends DLList[T] {
  // ... other methods

  override def updatePrev[S >: T](newPrev: => DLList[S]) = {
    lazy val result: DLCons[S] = new DLCons(value, newPrev, n.updatePrev(result))
    result
  }

  override def updateNext[S >: T](newTail: => DLList[S]) = {
    lazy val result: DLCons[S] = new DLCons(value, p.updateNext(result), newTail)
    result
  }
}
```

Look at `updatePrev`: we're creating a new node, whose `next` reference immediately points to a recursive call; the recursive call is on the current `next` node, which will update its own previous reference to the result we're still in the process of defining! This forward reference is only possible in the presence of lazy values and the by-name arguments. The `updateNext` method is simply symmetrical.

## 5. Adding Elements to a Doubly-Linked list

With these methods in place, we can now use a similar technique to add another element to either ends of a doubly-linked list:

```scala
class DLCons[+T](override val value: T, p: => DLList[T], n: => DLList[T]) extends DLList[T] {
  // ... other methods
  def append[S >: T](element: S): DLList[S] = {
    lazy val result: DLList[S] = new DLCons(value, p.updateNext(result), n.append(element).updatePrev(result))
    result
  }

  def prepend[S >:T](element: S): DLList[S] = {
    lazy val result: DLList[S] = new DLCons(value, p.prepend(element).updateNext(result), n.updatePrev(result))
    result
  }
}
```

Look at the `prepend` method: we're creating a new node with the same value as the one we're looking at, whose previous node is a recursive call to `prepend` _with its `next` pointer updated to the node we're currently defining_ (the same forward reference technique), and the "tail" of the list simply being an update of the current "tail" with the `prev` pointer to the node we're currently defining (yet another forward reference). Again, the `append` method is symmetrical.

## 6. Full Code

```scala
trait DLList[+T] {
  def value: T // instead of "head"
  def prev: DLList[T]
  def next: DLList[T]
  def prepend[S >: T](element: S): DLList[S]
  def append[S >: T](element: S): DLList[S]

  def updatePrev[S >: T](newPrev: => DLList[S]): DLList[S]
  def updateNext[S >: T](newNext: => DLList[S]): DLList[S]
}

case object DLEmpty extends DLList[Nothing] {
  override def value = throw new NoSuchElementException("head of an empty list")
  override def prev = throw new NoSuchElementException("prev of an empty list")
  override def next = throw new NoSuchElementException("tail of an empty list")

  override def prepend[S >: Nothing](element: S) = new DLCons(element, DLEmpty, DLEmpty)
  override def append[S >: Nothing](element: S) = new DLCons(element, DLEmpty, DLEmpty)

  override def updatePrev[S >: Nothing](newPrev: => DLList[S]): DLList[S] = this
  override def updateNext[S >: Nothing](newNext: => DLList[S]): DLList[S] = this
}

class DLCons[+T](override val value: T, p: => DLList[T], n: => DLList[T]) extends DLList[T] {
  override lazy val prev: DLList[T] = p
  override lazy val next: DLList[T] = n

  override def updatePrev[S >: T](newPrev: => DLList[S]) = {
    lazy val result: DLCons[S] = new DLCons(value, newPrev, n.updatePrev(result))
    result
  }

  override def updateNext[S >: T](newTail: => DLList[S]) = {
    lazy val result: DLCons[S] = new DLCons(value, p.updateNext(result), newTail)
    result
  }

  def append[S >: T](element: S): DLList[S] = {
    lazy val result: DLList[S] = new DLCons(value, p.updateNext(result), n.append(element).updatePrev(result))
    result
  }

  def prepend[S >:T](element: S): DLList[S] = {
    lazy val result: DLList[S] = new DLCons(value, p.prepend(element).updateNext(result), n.updatePrev(result))
    result
  }
}

// play with the data structure and test it around
object DLListPlayground {
  def main(args: Array[String]): Unit = {
    val list = DLEmpty.prepend(1).append(2).prepend(3).append(4)
    println(list.value) // 1
    println(list.next.value) // 2
    println(list.next.prev == list) // true
    println(list.prev.value) // 3
    println(list.prev.next == list) // true
    println(list.next.next.value) // 4
    println(list.next.next.prev.prev == list) // true
  }
}
```

## 7. Conclusion

We learned how to use _forward references_ based on call-by-name and lazy values to implement a (pretty primitive) fully immutable doubly-linked list with proper appending and prepending. This data structure will likely not become part of the standard library too soon &mdash; we'd have to replace the whole list on every new addition &mdash; this is an excellent small exercise for the technique, that you might apply elsewhere in your libraries or custom data structures.
