---
layout: single
title: "Abstract Base Classes and Protocols: What Are They? When To Use Them?? Lets Find Out!"
date: 2022-01-11
mathjax: true
---

In Python there are two similar, yet different, concepts for defining something akin to an interface, or a contract describing what methods and attributes a class will contain. These are [Abstract Base Classes (ABCs)](https://docs.python.org/3/library/abc.html) and [Protocols](https://www.python.org/dev/peps/pep-0544/).

Until the advent of [type annotations](https://docs.python.org/3/library/typing.html), ABCs were the way to go if you wanted to have any kind of validation on class/instance methods or properties and `isinstance` checks. With type annotations, ABCs became more relevant as a way to define an "interface" for a given class and then use that as a type annotation.

However, to use ABCs as an interface we must rely on *nominal subtyping* and a strict class hierarchy (we will explain this later but, in short, we will have to subclass the ABCs in order to use it as an interface). With Protocols we can use *structural subtyping* or "Duck typing" (i.e. the class only has to have the same methods and attributes, no subclassing necessary).

So when do we use ABCs and when do we use Protocols? Before we dig into this, lets first get a basic understanding of how each works.

## What are Abstract Base Classes

Here I will give a brief overview of ABCs, if you want a much more detailed explanation see [this great video by one of the creators of ABCs](https://youtu.be/S_ipdVNSFlo).

In general there are two use cases for ABCs, as a pure ABC that defines an "interface" and as a tool for code re-use via the Framework Design Pattern or through Mixins.

### Pure ABCs (ABC as Interface)

The simplest way to use an ABC is as a pure ABC, for example:
```python
from abc import ABC, abstractmethod


class Animal(ABC):
    @abstractmethod
    def walk(self) -> None:
        pass

    @abstractmethod
    def speak(self) -> None:
        pass
```
Here we have defined an ABC `Animal` with two methods: `walk` and `speak`. Note that the way to do this is to subclass `ABC` and to decorate the methods that must be implemented (i.e. part of the "interface") with the `@abstractmethod` decorator.

Now we can implement this "interface" to create a `Dog`
```python
class Dog(Animal):
    def walk(self) -> None:
        print("This is a dog walking")

    def speak(self) -> None:
        print("Woof!")
```
This will work fine but if we happened to forget to implement the `speak` method then we would get this error on creation
```python
>>> dog = Dog()
TypeError: Can't instantiate abstract class Dog with abstract method speak
```
We can see that we get an error because we haven't implemented the abstract method `speak`. This ensures that all subclasses implement the correct "interface".

## ABCs as a tool for code reuse

Another, and probably more common, use case for ABCs
is for code reuse. Below is a slightly more realistic
example of a base class for a statistical or Machine Learning regression model
```python
from abc import ABC, abstractmethod
from typing import List, TypeVar

import numpy as np

T = TypeVar("T", bound="Model")


class Model(ABC):
    def __init__(self):
        self._is_fitted = False

    def fit(self: T, data: np.ndarray, target: np.ndarray) -> T:
        fitted_model = self._fit(data, target)
        self._is_fitted = True
        return fitted_model

    def predict(self, data: np.ndarray) -> List[float]:
        if not self._is_fitted:
            raise ValueError(f"{self.__class__.__name__} must be fit before calling predict")
        return self._predict(data)

    @property
    def is_fitted(self) -> bool:
        return self._is_fitted

    @abstractmethod
    def _fit(self: T, data: np.ndarray, target: np.ndarray) -> T:
        pass

    @abstractmethod
    def _predict(self, data: np.ndarray) -> List[float]:
        pass
```
Ok, lets unpack this first. There are two public methods, `fit` and `predict`. The `fit` method calls the private abstract method `_fit` and then sets the private attribute `_is_fitted`. The `predict` method checks if we have fit the model before trying
to make predictions and then calls the private abstract method `_predict`. Lastly the base class defines a property `is_fitted`. We do this so that a user cannot set this value explicitly and it will only get set when calling `fit`.

A quick aside. Other than the ABC there are a few other important things going on. The first is the use of [generic self](https://mypy.readthedocs.io/en/stable/generics.html#generic-methods-and-generic-self) in the definition of the `fit` method. Here we type `self` with a generic variable `T` that is bound to the model class. We do this to ensure that subclasses of `Model` will return the correct type when calling `fit`. Secondly we use a *private* attributed `_is_fitted` internally and expose this with the `is_fitted` property. This is not strictly necessary but it is good practice to keep this variable readonly since we really only want this to be `True` if we have actually successfully run `fit`.

Ok, back to ABCs. In the example above we have used this base class to implement some logic that will be inherited by all of its children, namely the `fit` and the `predict` methods. These methods delegate the actual work to the private abstract methods, `_fit` and `_predict`, that the children must implement. Of course we could make this a pure ABC and have all children implement `fit` and `predict` but it would be quite tedious for all children to have to re-implement the `is_fitted` validation in
both of these methods. Furthermore, this is a simple example and in real situation there could be much more complicated shared code in the base class. Finally, we could have made the abstract methods public but in this case and probably most cases like the above example we should keep them private instead of polluting the class. A end consumer only needs to know that the class has a `fit` and a `predict` method and a `is_fitted` (i.e. readonly) property.

For a good, real life example of this kind of pattern take a look at Pytorch's [`Module`](https://github.com/pytorch/pytorch/blob/49a07c892265ed89ed8302db15af4647746f6543/torch/nn/modules/module.py#L204). While this class does not actually use ABCs it uses the same pattern where there is *a lot* of reusable code in the base `Module` class and users only have to implement the `forward` method.

Ok, now that we have some understanding of how to use ABCs for code reuse. Lets implement a super simple model
```python
class MeanRegressor(Model):
    def __init__(self):
        super().__init__()
        self._mean = None

    def _fit(self, data: np.ndarray, target: np.ndarray) -> "MeanRegressor":
        self._mean = target.mean()
        return self

    def _predict(self, data: np.ndarray) -> List[float]:
        return list(np.ones(data.shape[0]) * self._mean)
```
In this example we have implemented a very simple regression model to return the mean of the target for every sample. In this case the `_fit` method only sets a private state variable which is the mean of the target. The `_predict` method returns a list that is the length of the number of samples with the computed mean as the value. Lets see how this works.

```python
>>> data = np.array([1.0, 2.0, 3.0, 4.0])
>>> target = np.array([2.0, 3.0, 5.0, 10.0])
>>> mean_regressor = MeanRegressor()

# try to predict without fitting first
>>>  mean_regressor.predict(data)
ValueError: MeanRegressor must be fit before calling predict

# Check if fitted
>>> mean_regressor.is_fitted
False

# Fit and predict
>>> preds = mean_regressor.fit(data, target).predict(data)
[5.0, 5.0, 5.0, 5.0]

# Check if fitted now
>>> mean_regressor.is_fitted
True
```
As we can see in the example above we are actually calling the methods and property from the ABC which under the hood is calling our concrete implementations of the private `_fit` and `_predict` methods. So we get the error checking and automatic setting of the `_is_fitted` attributes for free. This way, users do not need to worry about that when creating a new type of `Model`. Isn't that fun?


## What are Protocols

Protocols were introduced in [PEP-544](https://www.python.org/dev/peps/pep-0544/) as a way to formally incorporate structural subtyping (or "duck" typing) into the python type annotation system.

There are two main, but related, use cases for Protocols. First, they can be used as an interface for classes and functions which can be used downstream in other classes or functions. Secondly, they can be used to set bounds on generic types.

### Protocols as Interfaces

Protocols allow you to define an interface for a class or function that will be type checked on usage rather than on creation. For example, we can make our `Animal` ABC above a Protocol
```python
from typing import Protocol

class Animal(Protocol):
    def walk(self) -> None:
        ...

    def speak(self) -> None:
        ...
```
Note that this looks pretty similar to our ABC based `Animal` class above. We inherit from `typing.Protocol` instead of `abc.ABC` and we don't need to add the `@abstractmethod` decorators since Protocols are not meant to be "implemented" but simply act as an interface in downstream tasks. Lastly, it is common practice to use `...` in the body of methods in a Protocol instead of `pass` as we did in the ABC, although either will work in both places.

Ok, lets now implement a `Dog`
```python
class Dog:
    def walk(self) -> None:
        print("This is a dog walking")

    def speak(self) -> None:
        print("Woof!")
```
Note here that we don't subclass animal, we simply have to implement the methods specified in the `Animal` Protocol. We can then use this in a downstream task like:
```python
def make_animal_speak(animal: Animal) -> None:
    animal.speak()

>>> dog = Dog()
>>> make_animal_speak(dog)
'Woof!'
```
Here static type checkers would be happy because the `dog` instance does indeed implement the `Animal` Protocol because it has the same *structure* but is not itself a child class of `Animal`.

Lets see how Protocols enforce the interface. Lets say we forget to implement the speak method on our `Dog` class
```python
>>> dog = Dog()
>>> make_animal_speak(dog)
Argument of type "Dog" cannot be assigned to parameter "animal" of type "Animal" in function "make_animal_speak"
  "Dog" is incompatible with protocol "Animal"
    "speak" is not present
```
In this case a static type checker (Pylance in the example above) would raise an error and tell the user that `Dog` does obey the `Animal` Protocol since it doesn't implement the `speak` method. Notice that this is different than an ABC that will raise an error when creating the `Dog` class, whereas Protocols will raise an error where they are used.

Ok, lets get a bit more tricky. What if we define the `Dog` class but change the signature of `speak` a bit
```python
class Dog:
    def walk(self) -> None:
        print("This is a dog walking")

    def speak(self, name: str) -> None:
        print(f"Woof! My name is {name}")
```
When we try to use this in the function
```python
>>> dog = Dog()
>>> make_animal_speak(dog)
Argument of type "Dog" cannot be assigned to parameter "animal" of type "Animal" in function "make_animal_speak"
  "Dog" is incompatible with protocol "Animal"
    "speak" is an incompatible type
      Type "(name: str) -> None" cannot be assigned to type "() -> None"
        Keyword parameter "name" is missing in destination
```
So, once again we get an error but this time it is because the `speak` method on `Dog` does not have the same signature. Pretty cool huh?


In the example function above, we don't actually even need the `walk` method since it won't be used in the function. We can narrow down the input type by defining a new Protocol
```python
class SupportsSpeak(Protocol):
    def speak(self) -> None:
        ...

def make_animal_speak(animal: SupportsSpeak) -> None:
    animal.speak()

>>> dog = Dog()
>>> make_animal_speak(dog)
'Woof!'
```
So we still have the same `Dog` class with a `walk` and `speak` method but we define the new Protocol `SupportsSpeak` (the naming is somewhat standard if you are defining an interface with one method) that just defines the `speak` method. And everything still works and would indeed work with any class that has the same `speak` method signature. This is a simple example but this can be quite powerful in more complicated code.

One last thing to mention about using Protocols as interfaces is that it is possible to make them useable at runtime via an `isinstance` check with the [`runtime_checkable`](https://docs.python.org/3/library/typing.html#typing.runtime_checkable) decorator.
```python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Animal(Protocol):
    def walk(self) -> None:
        ...

    def speak(self) -> None:
        ...

>>> dog = Dog()
>>> isinstance(dog, Animal)
True
```


## Protocols as Generic Type Bounds

When defining a generic type variable in python we can give it a bound which means that the generic type must either be a child class of the bound if given a class bound or it must implement the protocol if given a Protocol. If you were paying attention we actually used a type bound in the `Model` ABC example above. In this case we typed the `self` variable with the generic type `T` that was bound by `Model` itself. This was done so that child classes of `Model` would return the correct type for `fit` which indeed returns `self`. If that is not clear take a look at the [documentation](https://mypy.readthedocs.io/en/stable/generics.html#generic-methods-and-generic-self). So that was an example of using a class bound.

However, in generic programming we usually want to make things as specific as possible. The `max` function is a great example of this. The builtin `max` function can take in several different types of input. We could use [`overload`](https://docs.python.org/3/library/typing.html#typing.overload) for every different kind of input but that can be tedious. Instead we notice that a specific implementation of `max` only requires that the input types define the `__lt__` magic method (meaning we can do `x < y`). We can type (a somewhat simplified) `max` method as follows (for a much more detailed video, check out [this](https://www.youtube.com/watch?v=kDDCKwP7QgQ))
```python
from typing import TypeVar, Protocol


class SupportsLessThan(Protocol):
    def __lt__(self, __other: Any) -> bool:
        ...

S = TypeVar("S", bound=SupportsLessThan)

def my_max(x: S, y: S) -> S:
    if x < y:
        return y
    return x
```
Lets break this down. First, we implement a Protocol that defines the `__lt__` method. We then create a generic type variable `S` that is bound by our `SupportsLessThan` Protocol. This means that `S` can be any type as long as it implements `__lt__`. We then define the `max` function which takes in two arguments `x` and `y`, which are both generic type `S` and returns the same type.

A lot of builtin types have a `__lt__` method implemented so we can use this function with integers or strings, for example
```python
>>> max_int = my_max(4, 5)
>>> max_str = my_max("hello", "world!")
```
In the example above the `max_int` will return an int and `max_str` will return a string. If we pass in an object that does not have `__lt__` implemented then we will get an error.


## So ABC or Protocol?

Yes. You should use both as they are good at different things and both have should their place in your toolbox. We have already seen above the main use cases for ABCs and Protocols and how they work. Given those examples here are some good overall suggestions and observations.

* **Abstract Base Classes**
    - Belong to their subclasses. An ABC is not usable by itself, it can only be used by implementing a child class. So because of this, ABCs inherently belong to their subclasses as part of a strict class hierarchy.
    - ABCs are a good mechanism for code reuse, especially for boilerplate code or logic that will not change for any (or most) subclasses. The best strategy here is to have the ABC (i.e. parent class) do most of the work and have the children implement the specifics.
    - Good for real time validation when *creating* an instance of a child class. As we saw above, ABCs will raise an error on creation if the child does not implement all abstract methods.

* **Protocols**
    - Belong where they are used. As we saw above, Protocols are not "implemented" but tell downstream code (i.e. other functions or classes) what the structure of the input object is expected to be. Also, we saw that we can define multiple protocols for the same kind of object depending on what is needed. This means that Protocols belong where they are used.
    - Good for defining interfaces, especially for 3rd-party libraries when we don't want to tightly couple our code to a specific 3rd party library.
    - Good (really the only way) for specifying flexible generic type bounds.
    - This somewhat goes without saying but Protocols only are useful if using type annotations and cannot be used in any other way (except for [`runtime_checkable`](https://docs.python.org/3/library/typing.html#typing.runtime_checkable)).

Ok, so we know that ABCs and Protocols are, we know what they are good at. So when should we use them? The answer to that is somewhat subjective and depends on your environment but here are some rules of thumb

* Use ABCs if you want to reuse code. Inheritance is not always the best method of code reuse but it can be quite useful.
* Use ABCs if you require strict class hierarchy (as in you need to use method resolution order or you need to check `__subclasses__`) in your application.
* Use ABCs if you will need several implementations of a class with several methods.
* Use Protocols for strict type annotations (i.e.only annotate the methods/attributes you need)
* Use Protocols for generic bounds
* Use Protocols for abstract interfaces for 3rd party libraries

Well, thats it for this time. Now go forth into our bold almost statically typed python future with confidence!
