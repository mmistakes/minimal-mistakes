---
layout: single
title: "Early and late binding closures in Python"
date: 2022-11-23
mathjax: true
---

So it happened again, late-binding closures bit me. I once again had to discover that this
was a thing so I decided to make a little post about it just in case someone happens to
run into this and by some miracle lands here.

The goal is to keep this short but I want to cover 3 main things
* What are closures?
* How can you shoot yourself in the foot with them?
* How not so shoot aforementioned foot.

## What are closures (the short version)
In many cases closures are taken to be synonymous with anonymous (or lambda, no not the AWS kind) functions. However, one can have an anonymous function that is not a closure and a closure that is not an anonymous function. In simple terms a closure is *a function that captures at least one variable from the environment* (i.e. outside of its lexical scope). Make sense? Lets look at some examples.

```python
from typing import Callable

# closure with a nested function
def f(x: int) -> Callable[[int], int]:
    def g(y: int) -> int:
        return x + y

    return g

# closure with a lambda function
def h(x: int) -> Callable[[int], int]:
    return lambda y: x + y

CONSTANT: Final[int] = 4

# also a closure
l = lambda x: x + CONSTANT

# same...
def k(x: int) -> int:
    return x + CONSTANT
```
Both functions `g` and `h` return a closure and `l` and `k` are closures themselves. They are closures because they use variables outside of their lexical scope, `g` and `h` from the outer functions `f` and `h` scope, respectively, and `l` and `k` use the `CONSTANT` from the module scope.

So if we call some of these functions it would look like
```python
# these return functions that take in an integer and return an integer
a = f(2) 
b = h(2)

print(a(4)) # returns 6 (2+4)
print(b(2)) # returns 4 (2+2)
```
So we can first generate our closure by calling `g` and `h`, respectively and then pass our second variable when calling that returned function. This may seem strange to newer programmers or maybe those from pure object oriented languages but using functions as first-class citizens in your code can be quite powerful.

## The late-binding vs. early-binding problem
Ok, now that we have a decent understanding of what closures are, lets look at how we can shoot ourselves in the foot. Say we are all excited, because closures are awesome, and we want to make a list of functions to perform some action, say add one to a given number.

And since we love being "pythonic" we decide to be clever:
```python
new_funcs = [lambda: ii+1 for ii in range(5)]
output = [nf() for nf in new_funcs]
```
We have created our closure and then created 5 functions, the first will do `0+1`, the second `1+1` and if we evaluate these functions in order we will get `[5,5,5,5,5]`. Wait that doesn't seem right, what happened? Late-binding closures is what happened. This means that the value used in the closure, `ii` in this case, is looked up when the function is called and now when it was defined. Since the function is called after the loop if finished we will end up always using the last value in the loop. 

## How to avoid foot shooting
We can avoid the problem above in a few ways, one is to use something like our functions `f` or `h` above to bind the argument to the closure *early* by passing it as the argument of the outer function.
```python
from typing import Callable


def add_one(x: int) -> Callable[[], int]:
    def g() -> int:
        return x + 1

    return g


# could use lambda here as well
def add_one(x: int) -> Callable[[], int]:
    return lambda: x + 1


new_funcs = [add_one(ii) for ii in range(5)]
outputs = [nf() for nf in new_funcs]
```
The output will now be my luggage combination `[1,2,3,4,5]`. Another option, which is much less verbose (although almost identical under the hood) is to use `functools.partial`
```python
from functools import partial


def add_one(x: int) -> int:
    return x + 1


new_funcs = [partial(add_one, ii) for ii in range(5)]
outputs = [nf() for nf in new_funcs]
```
This will return the same output. Both of these approaches lead to *early* binding of the arguments and can be quite useful for making generic callback functions, among other things.

Well, thats it for this time and watch out for those early-binding closures.



