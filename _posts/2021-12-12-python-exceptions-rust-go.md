---
layout: single
title: "A Modern and Explicit approach to Python Exceptions"
date: 2021-12-11
mathjax: true
---
Two of the most popular "modern" programming languages are Rust and Go. While these
languages are quite different, both have a few things in common. First, they are
[loved by their users](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved), are growing fast,
and both forego exceptions as a way of handling errors, instead they treat errors
like any other type/object.

Since Python is dynamically types or nowadays, ["gradually typed"](https://www.python.org/dev/peps/pep-0483/), handling
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
get on with our usual business of dividing `x` by `y`. When we call this function we would
handle the error like:
```python
try:
    value = divide(x, y)
except ZeroDivisionError:
    # handle here
```
Or if choose not to recover then we can just call the function and the Exception will
cause the program to crash. This is all fine and is indeed the standard way of handling
errors but it is a bit tricky to know that this function may raise this error. Even
if is provided in the documentation (which it is best practice to document any exceptions
that could be raised) there is nothing for any linters or static type checkers to pick
up on that will let a user know that the `divide` function could raise an error. This is
where Rust and Go do something different as we will now see.

## Error Handling in Rust

In Rust errors are handles by using the [`Result`](https://doc.rust-lang.org/std/result/)
type which is actually a rust enum containing two variants, an `Ok` representing success
and an `Err` representing an error. We specify in the return type the values stored in`Ok`
and `Err`, respectively. Our divide function would look something like this in Rust:

```rust
fn divide(x: f64, y: f64) -> Result<f64, &'static str> {
    if y == 0.0 {
        return Err("Cannot divide by 0");
    }
    Ok(x / y)
}
```
If we call this function we can handle this in many different ways but a few common
ways would be
```rust
// handle via pattern matching
match divide(x, y) {
    Ok(v) => println!("The result is {}", v),
    Err(e) => println!("Error in divide: {}", e),
}

// handle via a method on Result that will return the value is succesful or
// panic if there was an error
let value = divide(x, y).unwrap()
```

There are many many other ways to handle this and don't worry about the syntax
if you are unfamiliar with Rust, the main point is that `value` is
not itself the value `x/y` but an enum of type `Result` with two variants, `Ok(x/y)` or
`Err("Cannot divide by 0")`. This forces the caller to handle any potential errors *explicitly*. The second method by calling `unwrap()` is most similar to just calling
the function in python and letting it raise an error if it indeed throws that error;
however, calling `unwrap` is generally bad practice in Rust. Nevertheless, a caller
is still aware that the function can fail just by the fact that the return type is a
`Result`.

## Error Handling in Go

In Go, errors are handled very explicitly. Instead of returning a single type like
in Rust, Go returns both the value and an error. If there is no error then it will
be set to `nil`. While this is more verbose than Rust it does follow the same principle
of explicitly leaving error handling up to the caller by putting the error in the return
of the function. Our division function would be written something like this:

```go
import (
	"errors"
)

func Divide(x, y float64) (float64, error) {
	if y == 0.0 {
		return 0.0, errors.New("Cannot divide by 0")
	}
	return x / y, nil
}
```
Just like in the above cases we check for the error case of `y=0` and then return a placeholder value and the error. If there is no error then we return the real value and `nil`. Then when calling this function we would do something like
```go
import (
    "fmt"
)

value, err := Divide(x, y)

// it is always best practice to do this check
// the value should not be trusted if this check is not done
if err != nil {
    fmt.Println("An error has occured:", err)
    return
}
fmt.Println("Dividend is:", value)
```
Just like with Rust, the user will explictly know that this function can fail, just by
the fact that it returns a value an a possible error. This check of `if err != nil` is
ubiquitous in Go code and is the main way to check for errors. One different with Rust
is that a user could still go ahead and use the `value` even if there is an error but
that wouldn't be very smart and is not recommended.

## A Go-like error handling pattern in Python

We have seen the basics of how errors are handled in Rust and Go. Lets see how we
can make our Python error handling more Go-like.

The simplest way to do this is to re-write our function like:
```python
from typing import Optional, Tuple


def divide(x: float, y: float) -> Tuple[float, Optional[ZeroDivisionError]]:
    if y == 0:
        return 0, ZeroDivisionError("Cannot divide by 0")
    return x / y, None
```
Here we return two values just like in our Go code, the actual value or a placeholder
along with a `ZeroDivisionError` or `None`. In this case we still make use of the builtin
exceptions because hey, we are using Python! For the typing, we have to specify the error
as `Optional` since we can also return `None`. When using this function we can follow this pattern
```python
value, err = divide(x, y)

if err is not None:
    raise err

print(f"Dividend is: {value}")
```
Looks almost just like the Go code! Just as in our example above we can still use the
value without the check but at least we know that this can return an error by the return
signature and types. In this case since we are still using Python exceptions we can `raise` the error if we don't have any way of avoiding it. This is similar to the `try-except` statement from above but now we *explicitly* use the error as a value
and not just something that may happen when calling the function.

Just for fun, we can make this a bit cleaner using python generics!
```python
T = TypeVar("T")
E = TypeVar("E", bound=Exception)

Result = Tuple[T, Optional[E]]


def divide(x: float, y: float) -> Result[float, ZeroDivisionError]:
    if y == 0:
        return 0, ZeroDivisionError("Cannot divide by 0")
    return x / y, None
```
In Rust-like fashion we now return a `Result` type that is just a type alias for
a tuple of any type and an option error that is a subclass of `Exception`. While
this does the same thing it is less verbose and could represent an idomatic way of
doing things.

If we don't want to specify the exact exception type we could make another type alias:
```python
from typing import Optional, Tuple, TypeVar

T = TypeVar("T")

ResultWithErr = Tuple[T, Optional[Exception]]


def divide(x: float, y: float) -> ResultWithErr[float]:
    if y == 0:
        return 0, ZeroDivisionError("Cannot divide by 0")
    return x / y, None
```
This just tells us that we are returning a result and an error, where the error is
an `Exception` of some kind.

These type aliases could be nice to cut down on boilerplate but possibly make things a bit
less explicit. In any case, Python offers a lot of optoins in terms of typing and actually
returning errors.

Doing error handling the Go way is pretty straightforward in Python and is definitely
more *explicit* than the `try-except` methods.

## A Rust-like error handling pattern in Python
While implementing errors Go-style was pretty straightforward, to get a Rust-like system
will be a bit more work. So in Rust-land an enum can hold values and have methods defined
on it. In Python things don't quite work that way, so to mimic the `Result` type we will
instead define two generic classes `Ok[T,E]` and `Err[T, E]` and use a type alias of `Union`. In the end we will have a Rust-like error handling system with a small subset
of the Rust functionality. Lets start with the `Ok` class
```python
from typing import Any, Callable, Generic TypeVar

T = TypeVar("T")
E = TypeVar("E", bound=BaseException)


class Ok(Generic[T, E]):
    _value: T
    __match_args__ = ("_value",)

    def __init__(self, value: T):
        self._value = value

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, Ok):
            return self._value == other._value  # type: ignore
        return False

    def unwrap(self) -> T:
        return self._value

    def unwrap_or(self, default: T) -> T:
        return self.unwrap()

    def unwrap_or_else(self, op: Callable[[E], T]) -> T:
        return self.unwrap()

    def is_ok(self) -> bool:
        return True

    def is_err(self) -> bool:
        return False

    def __repr__(self) -> str:
        return f"Ok({repr(self._value)})"
```
