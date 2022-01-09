---
layout: single
title: "A Modern and Explicit approach to Python Exceptions"
date: 2021-12-13
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
["Explicit is better than implicit"](https://www.python.org/dev/peps/pep-0020/#id2).

In this post we will be exploring some alternative ways of handling errors in Python
based on the ways in which Rust and Go handle errors. But first, lets review how
errors are handled in the three languages.

{: .notice--info}
As I was writing this and working on the code I came across a much more fleshed
out version of a [python Rust result type](https://github.com/rustedpy/result)
so if you actually want to use this in your code I would recommend this package
as it is much more fleshed out.

## Traditional Error Handling in Python

Traditionally error handling in Python is handled through [Exceptions](https://docs.python.org/3/tutorial/errors.html). While there are many ways to handle these exceptions
with differing levels of sophistication the basic structure looks like this:
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

// handle via a method on Result that will return the value is successful or
// panic if there was an error
let value = divide(x, y).unwrap();
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
Just like with Rust, the user will explicitly know that this function can fail, just by
the fact that it returns a value an a possible error. This check of `if err != nil` is
ubiquitous in Go code and is the main way to check for errors. One difference with Rust
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
this does the same thing it is less verbose and could represent an idiomatic way of
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
less explicit. In any case, Python offers a lot of options in terms of typing and actually
returning errors.

Doing error handling the Go way is pretty straightforward in Python and is definitely
more *explicit* than the `try-except` methods.

## A Rust-like error handling pattern in Python
While implementing errors Go-style was pretty straightforward, to get a Rust-like system
will be a bit more work. So, in Rust-land an enum can hold values and have methods defined
on it. In rust, the `Result` enum looks like:
```rust
enum Result<T, E> {
   Ok(T),
   Err(E),
}
```
where `T` and `E` are generic types. One could then implement methods on this enum.
 In Python things don't quite work that way, so to mimic the `Result` type we will
instead define two generic classes `Ok[T,E]` and `Err[T, E]` and use a type alias of `Union` to make a `Result[T, E]`. In the end we will have a Rust-like error handling system with a small subset of the Rust functionality. Lets start with the `Ok` class
```python
from typing import Any, Callable, Generic, TypeVar

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

    def __repr__(self) -> str:
        return f"Ok({repr(self._value)})"
```
Ok (get it!) lets unpack this a bit. First this class is generic (since it inherits
from [`Generic`](https://mypy.readthedocs.io/en/stable/generics.html#generics))
over a general type variable `T` and a bound type variable `E`. In this case we place
a bound on `E` so that it must be a subclass of `BaseException`. This is different than
Rust where anything can be used as an error but Python already has exceptions so we
may as well use them. Next we see that this class is initialized with a value of type `T`
which can be any type. We define the magic method `__eq__` to return `True` if the
contained values match in another instance of `Ok`. This will be important later when
performing pattern matching or any other equality tests. We have also defined a nice
repr on this class so that it is easily inspected.

Now, we have some methods on this class which are meant to mirror the functionality of
the Rust [`Result` enum](https://doc.rust-lang.org/std/result/enum.Result.html). Before
we get into the methods, lets define the `Err` class since it will have the same methods.
```python
class Err(Generic[T, E]):
    _err: E
    __match_args__ = ("_err",)

    def __init__(self, err: E):
        self._err = err

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, Err):
            return self._err == other._err  # type: ignore
        return False

    def unwrap(self) -> NoReturn:
        raise self._err

    def unwrap_or(self, default: T) -> T:
        return default

    def unwrap_or_else(self, op: Callable[[E], T]) -> T:
        return op(self._err)

    def __repr__(self) -> str:
        return f"Err({repr(self._err)})"
```
Just as in the `Ok` case this class is generic over `T` and `E`. It is also initialized
with an `err` of type `E` (must be a subclass of `BaseException`) And it defined
`__eq__` in an analogous way to `Ok`.

Now for the methods. Well, first lets define our result type:
```python
Result = Union[Ok[T, E], Err[T, E]]
```
This is just a type-alias of `Union`. So if we do `Result[float, ZeroDivisionError]` this
means that a function/method will return either `Ok(float)` or `Err(ZeroDivisionError)`.
Since we can return either we must have exactly the same methods on both the `Ok` and `Err` classes. This is as close as we can get to defining methods on a single enum as
we can do in Rust. Without further ado lets look at the methods and how they would
be used in our canonical example.
```python
def divide(x: float, y: float) -> Result[float, ZeroDivisionError]:
    if y == 0:
        return Err(ZeroDivisionError("Cannot divide by 0"))
    return Ok(x / y)
```
where we return `Err` if `y=0` and wrap our output in `Ok` if not just like our Rust
example above. When we use this function we can handle the errors in multiple ways
```python
# handle via pattern matching (very Rusty!, but only in python >= 3.10)
match divide(x, y):
    case Ok(v): print(f"The value is {v}")
    case Err(e): print(f"The error is {e}")

# unwrap the result and let an error be raised if the function failed
value = divide(x, y).unwrap()
```
The first method here uses Python's new [structural pattern matching](https://www.python.org/dev/peps/pep-0636/) which has a syntax very similar to Rust. Note, the `__match_args__` class attributes in `Ok` and `Err` lets us match on the values
without providing the keyword. The second method here calls the `unwrap` method, which,
as we can see from the code above, will just return the value if `Ok` and will raise
the error if the function errored. This is nearly equivalent to just raising the error
in the function itself (the standard python way) but now at least we know the function
can error by the `Result` return type and the fact that we must call `unwrap`. However,
there are more things we could do.

We can provide a default value to fall back on if the function errors
```python
# this will return the Ok value if no error, otherwise it will return the default (0.0)
value = divide(x, y).unwrap_or(0.0)
```

We can also provide a callable to try to recover from the error
```python
x, y = 1.0, 0.0
EPS = 1e-9
value = divide(x, y).unwrap_or_else(lambda e: x / (y + EPS))
```
In this case we supply a function that takes in the error (in this case we don't actually
use the error value but we could) and returns the division again but with a small offset
to the zero denominator. This may or not be a good idea in this case but it illustrates
the point. This method `unwrap_or_else` will return the `Ok` value if there is no error,
otherwise it will call the supplied function.

It is not shown directly here but all of this is fully typed and will work with
type checkers in and intellisense!

So this was a bit more work but we have partially replicated some of the Rust
functionality and we have made error handling *explicit*!

## Summary

Python handles errors by raising exceptions which can then be caught in downstream
callers. However, since Python is becoming gradually typed it makes sense to think
of alternate ways to handle errors that are made *explicit* through the type system.
In this post we have looked at how two modern languages, Rust and Go, handle errors
and showed how we can do similar things in Python.

In summary:

* Go handles errors by returning the value alongside the error. We can do this in
Python by returning a tuple or the value and a possible error. We then check for this
error explicitly in our downstream code and we know about it from the return type.

* Rust handles errors by returning an enum with two variants `Ok` or `Err`. The caller
then must pull out the value or error through various different methods. We can replicate
this in python by returning a single value which is a type alias of `Union`. A downstream
caller then will "unwrap" this in ways similar to Rust.

Lastly, I will mention that neither of these approaches is likely to become mainstream
simply because of the massive code bases already written and the now idiomatic way of
handling exceptions; however it may still be useful to use these methods on stand-alone
projects or to just think about alternatives!