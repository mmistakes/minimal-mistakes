---
layout: single
title: "Access Modifiers in Python"
date: 2022-01-15
mathjax: true
---

If you have stumbled across this post then you are probably coming to Python from another object oriented language that has real support for access modifiers. Python has *almost* no support for access modifiers at runtime but it does now have pretty good support for access modifiers at "compile time" through linters and type checkers.

In this short post we will cover the main ways that one can mimic access modifiers in Python. We will cover private and protected attributes and methods, readonly attributes, and final methods and variables.

For this post, the code is checked with the great [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) based language server in vscode. So other IDEs or static checkers/linters may not give the same warnings/errors. I also make use of the phrase "compile time", which just means that at the time that linters or type checkers are run.

## Private vs Protected

I have been programming in Python for almost 15 years now and I only recently discovered that the "underscore" (i.e. naming a variable or method `_name` instead of `name`) convention actually represents a protected value and not a private value. Furthermore, I discovered that Python actually does have runtime support for private variables through a double underscore (i.e. `__name`). It will actually raise an error!

As a refresher, private means that the attribute/method can only be used inside the class where it is defined. Protected means that the attribute/method can only be used in the class where it is defined or its subclasses.

Ok, so how do we use this? What does it actually do? And why would we do it? Lets look at a convoluted, but illuminating example:
```python
class Thing:
    def __init__(self, public: str, *, protected: str = "protected", private: str = "private"):
        self.public = public
        self._protected = protected
        self.__private = private

    def info(self) -> None:
        print(
            (
                f"This class has public attribute: {self.public}, "
                f"protected attribute: {self._protected}, "
                f"and private attribute: {self.__private}"
            )
        )
```
So here we have a simple `Thing` class with three attributes. One is public, one is protected, and one is private. We can see that we denote "protected" with a single underscore before the variable name and "private" with a double underscore before the variable name.

The first thing to note is that if you define a private attribute you should use it in the class since that is the only place it can be used. If you do not you will probably get a warning such as "__private is not accessed". Ok, lets use this thing!

```python
>>> thing = Thing("public")

# this is fine because it is assessing the variables internally in the info method
>>> thing.info()
'This class has public attribute: public, protected attribute: protected, and private attribute: private'

# this is also fine because the public attribute is indeed public
>>> print(thing.public)
'public'

# this will run but will give an error when checked with pylance
>>> print(thing._protected)
'"_protected" is protected and used outside of the class in which it is declared'

# this will not actually run and will raise an AttributeError but it will also give an error when checked
>>> print(thing.__private)
'"__private" is private and used outside of the class in which it is declared'
```
So we see that we can use both the `__private` and `_protected` attributes inside the `info` method and we can use the `public` attribute anywhere. Furthermore, we cannot use the `_protected` or `__private` attributes outside of the class. So far in this example, there is really no difference between protected and private since we only have the one class. Lets make a subclass
```python
class SomeThing(Thing):
    def more_info(self) -> None:
        print(f"This class has public attribute: {self.public}, protected attribute: {self._protected}")

>>> some_thing = SomeThing("public")

# still can use the info method which uses the private attribute internally
>>> some_thing.info()
'This class has public attribute: public, protected attribute: protected, and private attribute: private'

# can use the new more_info method that uses the public and protected attribute
>>> some_thing.more_info()
'This class has public attribute: public, protected attribute: protected'
```
We have made a subclass of `Thing` and we have a simple method that can indeed use the `_protected` attribute. However, if we try to add a new method that uses the private attribute then bad things will happen
```python
class SomeThing(Thing):
    def more_info(self) -> None:
        print(f"This class has public attribute: {self.public}, protected attribute: {self._protected}")

    def use_private(self) -> None:
        print(f"Private attribute is {self.__private}")

>>> some_thing = SomeThing("public")

# this will raise an AttributeError and will also give an error when checked
>>> some_thing.use_private()
'"__private" is private and used outside of the class in which it is declared'
```
So we cannot use the `__private` attribute in the subclass, as expected.

Ok, we have shown a basic example of how to use protected and private attributes. The same rules work for protected and private methods. But when should you use them? There aren't any hard and fast rules for this but there are a few rules of thumb and things to be aware of

* protected and private variables are part of a concept known as [information hiding](https://en.wikipedia.org/wiki/Information_hiding) which deals with hiding implementation details from downstream users.
* private attributes/methods should be used in cases where you don't want downstream users or developers to have access to that attribute or method. This is good for hiding implementation details which may be prone to change but will not affect downstream users.
* protected attributes/methods should be used where developers can have access (through subclassing) but not outside users. This is useful for defining methods to be implemented by subclasses (through ABCs) which are then used in the parent class through a code re-use mechanism. Check out my [previous post](../2022-01-11-abc-vs-protocol) for more info on this use case.
* If you use protected attributes/methods and allow for subclassing then these attributes/methods essentially become part of the *public* API since other developers can have access to them in their subclasses. This means that a change to the protected implementation in the parent class will affect all subclasses. We will see later how we can protect against unwanted subclassing with the `@final` decorator.

## Readonly attributes

In the example above the public attribute was read/write. What if we want a readonly attribute? There are two ways to do this, one is enforced at runtime and the other is enforced through type checking at "compile time". Lets modify our example above to include a readonly attribute
```python
class Thing:
    def __init__(self, readonly: str):
        self.__readonly = readonly

    @property
    def readonly(self) -> str:
        return self.__readonly


>>> thing = Thing("readonly")
>>> print(thing.readonly)
'readonly'

# this will raise an AttributeError but will also raise an error when checking
>>> thing.readonly = "Hello!"
'Cannot assign member "readonly" for type "Thing" Property "readonly" has no defined setter'
```
We have made use a `@property` which allows us to make `readonly` a readonly attribute. This will raise both a runtime error and a "compile time" error when trying to set this attribute. However, it does require the use of a private attribute (could also use protected, making sure to pay attention the caveats mentioned above) and the use of a property. There is a shorter way by using the `Final` type
```python
from typing import Final


class Thing:
    def __init__(self, readonly: str = "readonly"):
        self.readonly: Final = readonly

>>> thing = Thing("readonly")
>>> print(thing.readonly)
'readonly'

# this will not raise a runtime error but will raise an error when checking
>>> thing.readonly = "Hello!"
'Cannot assign member "readonly" for type "Thing" "readonly" is declared as Final and cannot be reassigned'
```
In this case we only have to annotate the `readonly` attribute with the `Final` type to get the same behavior at "compile time", but we will not get the runtime error (i.e. we can set this variable). So depending on how you use type checking this method could more or less useful to you.

Lastly, the `Final` type does not only apply to attributes but can be used anywhere. It is very useful for defining module level constants that should not be modified.

## Final classes and methods

In the last section, we saw how to use the `Final` type annotations to make variables readonly, at least in a static type checking sense. In this last section we will see how to make classes and methods more restricted in terms of what can be subclasses or overridden. Lets go back to our `Thing` class
```python
from typing import final


@final
class Thing:
    def __init__(self, public: str, *, protected: str = "protected", private: str = "private"):
        self.public = public
        self._protected = protected
        self.__private = private

    def info(self) -> None:
        print(
            (
                f"This class has public attribute: {self.public}, "
                f"protected attribute: {self._protected}, "
                f"private attribute: {self.__private}, "
            )
        )
```
This is identical to our definition above but we have added the `@final` decorator. If we not try to subclass this class
```python
class SomeThing(Thing):
    pass
```
then we will get an error (through static type checking, not at runtime) "Base class "Thing" is marked final and cannot be subclassed". We should also note that if we do mark a class a final then there is no need to distinguish between protected and private variables since both technically have the same meaning now since the class cannot be subclassed.

You can also use the `@final` decorator to control which methods are allowed to be overridden:
```python
class Thing:
    def __init__(self, public: str, *, protected: str = "protected", private: str = "private"):
        self.public = public
        self._protected = protected
        self.__private = private

    @final
    def info(self) -> None:
        print(
            (
                f"This class has public attribute: {self.public}, "
                f"protected attribute: {self._protected}, "
                f"private attribute: {self.__private}, "
            )
        )
```
When we sublcass and try to override the info method
```python
class SomeThing(Thing):
    def info(self) -> None:
        print("Overriding info method")
```
We would get the following error: "Method "info" cannot override final method defined in class "Thing"".

Both of these methods can be useful when you really want to control what downstream users/developers can do with your classes and methods.

## Conclusion

In this post we have seen how to make attributes/methods both private and protected and the caveats associated with that. We have also seen how to use a `@property` decorator and `Final` annotation to make an attribute or variable readonly. Finally (get it?!) we have seen how to use the `@final` decorator to mark a class or a method as final, thus barring it from being subclassed or overridden.

Lastly, I'll offer some advice. In the world of open source software we need think differently about what is actually private, public, and protected. We don't want to restrict access too much so that it makes developer's lives harder when trying to extend your code, but we also don't want to create a large API surface with a lot of unneeded public methods and attributes that have to be kept backwards compatible. So now that you know how to use these features in Python, think carefully about how you use them and remember "With great power comes great responsibility".
