---
layout: single
title:  "A Modern and Explicit approach to Python Exceptions"
date: 2021-12-12
mathjax: true
---
Two of the most popular "modern" programming languages are Rust and Go. While these
languages are quite different, both have a few things in common. First, they are
[loved by their users](), are [growing very fast](), and both forego exceptions
as a way of handling errors, instead they treat errors like any other type/object.

Since Python is dynamically types or nowadays, ["gradually typed"](), handling
errors with exceptions makes sense. But in the modern Python era we can make
use of type annotations to make error handling a bit more explicit. After all,
"Explicit is better than implicit".

In this post we will be exporing some alternative ways of handling errors in Python
based on the ways in which Rust and Go handle errors. But first, lets review how
errors are handled in the three languages.

## Traditional Error Handling in Python

Traditionally error handling in Python is handled through [Exceptions](https://docs.python.org/3/tutorial/errors.html). While there are many ways to handle these exceptions
with differing levels of sopistication the basic structure looks like this:
```python
def divide(x: float, y: float) -> float:
    if y == 0:
        raise ZeroDivisionError("Cannot divide by 0")
    return x / y
```
So here we check that the denominator is 0 (because we can't divide by 0) and if so, we
will raise a special exception `ZeroDivisionError` with a custom message, otherwise we
get on with our usual business of dividing `x` by `y`.

## Error Handling in Rust

## Error Handling in Go
