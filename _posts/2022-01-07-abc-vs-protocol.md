---
layout: single
title: "Abstract Base Classes and Protocols: What Are They? When To Use Them?? Lets Find Out!"
date: 2022-01-07
mathjax: true
---

In Python there are two similar, yet different, concepts for defining something akin to an interface, or a contract describing what methods and attributes a class will contain. These are [Abstract Base Classes (ABCs)](https://docs.python.org/3/library/abc.html) and [Protocols](https://www.python.org/dev/peps/pep-0544/).

Until the advent of [type annotations](https://docs.python.org/3/library/typing.html), ABCs were the way to go if you wanted to have any kind of validation on class/instance methods or properties and `isinstance` checks. With type annotations, ABCs became more relevant as a way to define an "interface" for a given class and then use that as a type annotation.

However, to use ABCs as an interface we must rely on *nominal subtyping* and a strict class hierarchy (we will explain this later but, in short, we will have to subclass the ABCf in order to use it as an interface). With Protocols we can use *structural subtyping* or "Duck typing" (i.e. the class only has to have the same methods and attributes, no subclassing necessary).

So when do we use ABCs and when do we use Protocols? Before we dig into this, lets first get a basic understanding of how each works.

## What are Abstract Base Classes

Here I will give a brief overview of ABCs, if you want a much more detailed explanation see [this great video by one of the creators of ABCs](https://youtu.be/S_ipdVNSFlo).

In general there are two use cases for ABCs as a pure ABC that defines an "interface" and as a tool for code re-use via the Framework Design Pattern or through Mixins.

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
Ok, lets unpack this first. There are two public methods, `fit` and `predict`. The `fit` method calls the private abstract method `_fit` and then sets the private attribute `_is_fitted`. The `transform` method checks if we have fit the model before trying
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


Outline:

* ABC
    - Belong with their subclasses.
    - Good for code re-use
    - Good for real time validation when class is created

* Protocol
    - Belong where they are used
    - Best for defining interfaces
    - Good for generic bounds
    - Good for 3rd party library decoupling
