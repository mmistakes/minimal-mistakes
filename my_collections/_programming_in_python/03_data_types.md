**Data Types**

1. [Introduction](#1-introduction)
2. [Tuples](#2-tuples)
3. [When to use Tuples?](#3-when-to-use-tuples)
4. [Some Definitions](#4-some-definitions)
    1. [Object](#41-object)
    2. [Identity](#42-identity)
    3. [Type](#43-type)
    4. [Value](#44-value)
5. [Mutable vs. Immutable Data Types](#5-mutable-vs-immutable-data-types)
    1. [Examples of Immutable Data Types](#51-examples-of-immutable-data-types)

---
---
## **1. Introduction**
You have most likely already heard phrases like "_strings are immutable_", "_lists are mutable_" or "_we cannot change elements of a string_". So far we have not spent much time explaining what exactly we mean by that. The reason was simple - you had to learn basics to understand the difference between mutable and immutable objects. But now you know quite a bit. Hence it's a good time to understand what's the difference between these two types of data.

Consider the following example code:

```python
a = [1, 2, 3]
b = a
b[1] = 4

print("Printing b: ", b)
print("Printing a: ", a)
```

What do you think will be the output of the first `print` call? What about the second one? Run the code and check if your intuitions were correct.

As you probably expected, the `b` list looks like this: `[1, 4, 3]`. There is no surprise there. We have changed the element at the first index to be `4` instead of `2`. 

The interesting part is in the second `print` output. The `a` list has also changed, even though we do not have any line of code which changes explicitly elements of `a`! This is the best example to understand the difference between a variable and the object which is stored inside the variable. Let's go through this example to understand what is happening.

In the first line Python creates an object: a `[1, 2, 3]` list. This is the object itself. Python creates it and stores it somewhere in the memory. But there is also something else happening in the first line of code - we ask Python to create a variable named `a`. This variable's goal is to _point_ to the object we have created. If we need to do something with the created object, we will use this name when communicating with Python. So variable is not an object itself. It's just a name for it.

It turns out that we can have multiple names for the same object. Just like in real life, the same person can be called by their name, e.g. `Sam`, but sometimes they can be referred to as `my_friend` or `my_gardener`. This is what happens in the second line of code. We tell Python to remember another name: `b` and that this name should point _to the same object_ as name `a`.

This is why when we change the elements of a thing currently named `b`, the elements of a thing named `a` also change - this names refer to the same object! Whatever we do will affect the object - it does not matter by what name we will call it!

Having several names for one object is called _aliasing_. This makes sense - an _alias_ is another name for the same thing. In Python we can have as many aliases as we want.

This should help you understand the difference between mutable and immutable objects. It should be now obvious to you that lists are mutable - we have just experienced that. We also know that strings are immutable. You can try to create a similar example for strings as the one above and you will fail to change the object. You can of course create multiple aliases for the same string. But you cannot change the string itself, so there is no risk of getting this weird behavior for strings. 

This already shows the trade-off between mutable and immutable data types. Immutable data types are safer - there is no risk that you will change something when using one name and miss out that all other names will now also refer to the changed object. On the other hand, mutable objects give you more freedom. You do not have to create a new object whenever you want to change something. In the next sections we will discuss this and other differences between these two data types much more deeply.

## **2. Tuples**

`tuple` is a built-in data type in Python like `list` and `dictionary` which were explained to you before. This data type is ordered and immutable (unchangeable). You may think of a `tuple` like a `list` which cannot be modified. Typically `tuple`s are used to store some important and unchangeable data/information. A great example of such usage might be a calendar, where we can assign abbreviated names of months to each of the elements of a `tuple`:

    >>> calendar = ('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec')

As you can see you can create a `tuple` almost in the same manner as you create a `list` - simply use round brackets instead of square ones. Since names of months most likely will not change, it is better to use a `tuple` than a `list`. A `tuple` might be also a good solution for storing some personal data of employees or some bank accounts numbers. 

There is also another way to create a tuple - if we have another iterable object we can convert it to the `tuple` type using `tuple` function:
 
    >>> t_1 = tuple([1,2,3,4,5,8])
    >>> t_1
    (1, 2, 3, 4, 5, 8)
    >>> t_2 = tuple("someone")
    >>> t_2
    ('s', 'o', 'm', 'e', 'o', 'n', 'e')

Notable is a fact that if you wish to create a `tuple` with only one element, you have to do it like this:

    >>> one_element_tuple = (1,)
    >>> one_element_tuple
    (1,)

Try to guess what type of the object you will get if you omit the comma in the expression above. You can check with the `type` function if your predictions were correct. 

Similarly to `list`s, you can create a `tuple` which contains different data types like `int`, `str`, `float` or `bool`:

    >>> a = (2,3,4,4.5,True,'dog')
    >>> a
    (2, 3, 4, 4.5, True, 'dog')

Now you may wonder if a example which we have discussed at the very beginning of this chapter is also valid for `tuple`s. Let us try this, so in the end we will know whether `tuple`s are mutable or immutable data types. Let's start with simply replacing `[]` to `()` during object creation: 

```python
a = (1, 2, 3)
b = a
b[1] = 4

print("Printing b: ", b)
print("Printing a: ", a)
```

When you call this few lines of code you will see an **error** stating that `'tuple' object does not support item assignment`: 

```python
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
/tmp/ipykernel_138735/1157130565.py in <module>
      1 a = (1, 2, 3)
      2 b = a
----> 3 b[1] = 4
      4 
      5 print("Printing b: ", b)

TypeError: 'tuple' object does not support item assignment
```

This error is related to properties of immutable data types to which `tuple` belongs to. Basically, we cannot modify a `tuple` object. Hence, if we are trying to _assign_ new value to the element `b[1]`, we get an error. This wasn't a problem when we were using lists, because they are mutable objects.

---
---
### **3. When to use Tuples?**
Up to this moment you might have thought that using `tuple`s does not give you anything special beside making it more complicated when you want to modify them. However, by using `tuple`s you save some memory and computation time. This happens because `tuple`s are immutable and so have fixed size. Therefore upon allocation in memory Python knows the exact size that has to be reserved the object. In case of `list`s Python has to reserve more memory to allow for any further modifications.

Before we compare the size and operation speed over `list`s and `tuple`s you have to get familiar with some tools which will be necessary. 
To initialize a `list` or `tuple` with numbers ascending from 0 to `x-1` we can simply use `range(x)`

    >>print(list(range(10)))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>print(tuple(range(10)))
    (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

Then we have to somehow check how much memory some variable took after allocation. To do so we can use the `getsizeof` function which is defined in the `sys` library. This function returns the size of an object in bytes. To use it we can simply import sys library:

    >>import sys
    >>print(sys.getsizeof(list(range(10))))
    208

In the end we also want to measure which data type is faster, so we have to somehow measure time of execution . This can be done with the aid of the `time` library and a function `time`:

    >>> import time
    >>> s = time.time()
    >>> e = time.time()
    >>> e - s
    8.275716066360474

Note that the final output in this example will depend on how long you wait between second and third command. 

OK, now we have all the tools we need. Let us compare the memory size of a `tuple` and a `list` filled up with the same numbers and the time needed to go through both objects.

```python
import sys
import time

#Initialize sample LIST
start_time = time.time()
my_list = list(range(1000000))
end_time = time.time()
print("Initialization time for LIST:", end_time - start_time)

#Initialize sample TUPLE
start_time = time.time()
my_tuple = tuple(range(1000000))
end_time = time.time()
print("Initialization time for TUPLE:", end_time - start_time)

#Check the memory needed for LIST and TUPLE
print(f'Size of my_list {sys.getsizeof(my_list)}')
print(f'Size of my_tuple {sys.getsizeof(my_tuple)}')

#Measure the time needed to go through all indexes
start_time = time.time()
for item in my_list:
    a = my_list[item]
end_time = time.time()
print("Time for LIST: ", end_time - start_time)

start_time = time.time()
for item in my_tuple:
    b = my_tuple[item]
end_time = time.time()
print("Time for TUPLE: ", end_time - start_time)
```
In the example above we create a `tuple` and a `list` filled up with numbers from 0 up to 999999. We also measure time needed to initialise both objects. Next thing we do is checking how much memory python needed to allocate such long objects. Finally we loop over both objectsto compare time needed to perform the same operation. The `for` loop does not do anything - in each iteration we simply point a variable to the next element from the `list` or the `tuple`. 

Let's see example the results. Again, note that these result may (and most likely will) be different on different machines or even on different runs of the program! The important aspect is how results for `list`s compare to those obtained for `tuple`s. It does not matter so much what are the exact numbers you get.
    
    Initialization time for LIST: -126.84030365943909
    Initialization time for TUPLE: 0.08508086204528809
    Size of my_list 9000120
    Size of my_tuple 8000056
    Lookup time for LIST:  0.18608546257019043
    Lookup time for TUPLE:  0.09678792953491211

To conclude:
- `tuple`s use less memory than `list`s
- `tuple`s are more time efficient than `list`s

---
---
## **4. Some Definitions**
### **4.1 Object**
An object is a collection of data and methods that act on this data. This is very crucial to understand because Python is an object-oriented programming language. All objects in Python are characterized by identity, type, and value. Let's briefly discuss these terms.

### **4.2 Identity** 
The object’s identity **never changes once it has been created**; this is something like national ID number. You can change your name, surname or ask your friends to use another nickname for you. But usually you cannot change your national ID number. This is the number your country uses to refer to specifically you. The identity of an object in Python plays a similar role. This is the **object’s address in memory**. Python uses the identity to determine where the object itself can be found. It doesn't matter what are the current names for the object, i.e. what variables point to this object.

The `is` **operator** compares if the identity of two objects is the same:

    >>> a = [1, 2, 3]
    >>> b = a
    >>> a is b
    True

If you want to see what is an identity of an object, you can do so with the `id` function - note that you will most likely get a different output on your computer:

    >>> id(a)
    4449813056
    >>> id(b)
    4449813056

Python shows us the id of the _object_ stored in the variable. We can clearly see that the id of the object stored in `a` is the same as the id of the object stored in `b`.

### **4.3. Type**
The object’s type defines the **possible operations** we can perform on the object. For instance, can we ask Python to compute lenght of this object and so use `len` function on this object. As we will learn at some point, the type of an object also determines what values and methods can be found as features of this object. We will dive into that when we will be discussing objects and classes, but you kind of already have seen that. For instance, if we are dealing with a `str` we will find a method `capitalize` in this type. There is no such method for a `list`:

    >>> "mateusz".capitalize()
    'Mateusz'
    >>> [1, 2, 3].capitalize()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    AttributeError: 'list' object has no attribute 'capitalize'

The `type` function which you already know returns the type of an object. The object's type is **unchangeable** like the object's identity.

### **4.4 **Value****
The value of the object is the data stored inside. For a `[1, 2, 3]` list it's the sequence of numbers stored in this specific order. For the `'mateusz'` string it's the sequence of letters. 

The value of some objects can change. Objects **whose value can change are called mutable**. Objects **whose value is unchangeable** after they were created are called **immutable**. Hence, the type of an object _determines its mutability_.

You may find more information at [link](https://towardsdatascience.com/https-towardsdatascience-com-python-basics-mutable-vs-immutable-objects-829a0cb1530a). Quotes were also made from this reference.

---
---
## **5. Mutable vs. Immutable Data Types**
Now you understand what is the difference between mutable and immutable data types. Here we provide you with a table which shows which objects are mutable and which are immutable:
| Mutable | Immutable |
| ---     | ---       |
|list     | int, float| 
| dictionary | decimal,bool |
| set | string, tuple |
| user-defined classes | range |

For more information about each type, you may simply call a `help` function. Inside the parentheses, you should provide the name of data type about which you want to learn more.
    
    >>> help(int)
You should see something like this:

    Help on class int in module builtins:
    
    class int(object)
     |  int([x]) -> integer
     |  int(x, base=10) -> integer
     |
     |  Convert a number or string to an integer, or return 0 if no arguments
     |  are given.  If x is a number, return x.__int__().  For floating point
     |  numbers, this truncates towards zero.
     |
     |  If x is not a number or if base is given, then x must be a string,
     |  bytes, or bytearray instance representing an integer literal in the
     |  given base.  The literal can be preceded by '+' or '-' and be surrounded
     |  by whitespace.  The base defaults to 10.  Valid bases are 0 and 2-36.
     |  Base 0 means to interpret the base from the string as an integer literal.
     |  >>> int('0b100', base=0)
     |  4
     |
     |  Built-in subclasses:
     |      bool
     |
     |  Methods defined here:
     |
     |  __abs__(self, /)
    :
 
To scroll through the help page in inline mode you usually press `enter`. To quit you usually have to press `q`.

### **5.1 Examples of Immutable Data Types**
From the table above you know that `int, float, decimal, bool, string, tuple, range` are immutable data types. Let us check what is happening with our data types when we are performing simple operations. Let's define some variables with an int, a string and a float inside, respectively:

    >>> my_int = 2022
    >>> my_string = '2022'
    >>> my_float = 2.022

and check their identities:

    >>> id(my_int)
    4497530448
    >>> id(my_string)
    4495707376
    >>> id(my_float)
    4497527344

Now let's see what happens if we try to add something to our variables:

    >>> my_int += 1
    >>> my_string += ' year'
    >>> my_float += 0.001

Ask yourself - will the identities be the same? Well, they cannot be, because we are dealing with the immutable data type. If something has changed, a new object had to be created:

    >>> id(my_int)
    4497530384
    >>> id(my_string)
    4495707440
    >>> id(my_float)
    4494190160
    
So what must have happened  is the following. Behind the scenes Python created new objects based on the original ones. Then our variables started pointing to these new objects.

---
---
QUIZ
1. What is the primary difference between lists and tuples?
    *   You can access a specific element in a list by indexing to its position, but you cannot access a specific element in a tuple unless you iterate through the tuple
    *  + Lists are mutable, meaning you can change the data that is inside them at any time. Tuples are immutable, meaning you cannot change the data that is inside them once you have created the tuple.
    *   Lists are immutable, meaning you cannot change the data that is inside them once you have created the list. Tuples are mutable, meaning you can change the data that is inside them at any time.
    *   Lists can hold several data types inside them at once, but tuples can only hold the same data type if multiple elements are present.
2. Which choice is an immutable data type?
    *   dictionary
    *   list
    *   set
    *  + string
3. What built-in Python data type is best suited for implementing a queue?
    *   set
    *   None. You can only build a queue from scratch.      
    *  + list
    *   dictionary
4. What will this statement return?
 ```python
{x : x*x for x in range(1,100)}
```
    *  + a dictionary with x as a key, and x squared as its value; from 1 to 99
    *   a set of tuples, consisting of (x, x squared); from 1 to 99   
    *   a list with all numbers squared from 1 to 99  
    *   a dictionary with x as a key, and x squared as its value; from 1 to 100   
5.  Which collection type is used to associate values with unique keys?
    *   slot
    *  + dictionary
    *   queue
    *   sorted list
6. Mutable list has several important properties that help you use this data type effectively. In the list below, select all of these properties:
    *   You can't remove elements from it 
    *  + It allows you to have duplicates
    *  + Its size can be changed
    *  + It is an ordered sequence of elements
7. Select all immutable basic data types: 
    * dictionary, list, set, float
    * + integer, string, tuple, float
    * set, list, float, integer
    * string, list, float, tuple
8. Which of the following would complete `A = ` to 25 by slicing my_tuple.

    my_tuple = ("Dog", (1, 25, 300), (50, 5, 2))

    *  +`A = my_tuple[1][1]`
    *  `A = my_tuple[1:2](1)`
    *  `A = my_tuple[2][1]`
    *  `A = my_tuple[1:2][1]`
9. Which of the following are true of Python lists?
    * All elements in a list must be of the different type
    * List may not contain another list
    * + There is no size limit of list
    * These are the same list: `[1,2,3]` and `[2,1,3]`
10. Consider the following nested list definition: `my_list = [['dog', 'cat'],123,[2.5, 13,['pet',98,'fly']],'end']`. What is the expression that returns the 't' in 'pet'?
    *   my_list[2][3][0][2]
    *   my_list[2][2][2][0]
    *   my_list[2][1][1][3]
    *   +my_list[2][2][0][2]
11. Suppose you have the following tuple definition: `my_tuple =('dog', 'pet', 'cat)` how to replace `'pet'` with `'owl'`?

    *  + You can not modified tuples
    *   Non of provided answers
    *   `my_tuple(0) = 'owl'`
    *   `my_tuple[0] = 'owl'`
