---
title: "Data Types"
excerpt: "You will learn the difference between mutable and immutable objects"
toc: true
toc_sticky: true
---

<script src="https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>

## **1. Introduction**
You have most likely already heard phrases like "_strings are immutable_", "_lists are mutable_" or "_we cannot change elements of string_". So far we have not spent much time explaining what exactly we mean by that. The reason was simple - you had to learn basics to understand the difference between mutable and immutable objects. But now you know quite a bit. Hence it's a good time to understand what's the difference between these two types of data.

Consider the following example code:

```python
a = [1, 2, 3]
b = a
b[1] = 4

print("Printing b: ", b)
print("Printing a: ", a)
```

What do you think will be the output of the first `print` call? What about the second one? Run the code and check if your intuitions were correct.

As you probably expected, the `b` list will looks like this: `[1, 4, 3]`. There is no surprise there. We have changed the element at the first index to be `4` instead of `2`. 

The interesting part is in the second `print` output. The `a` list has also changed, even though we do not have any line of code which changes explicitly elements of `a`! This is the best example to understand the difference between a variable and the object which is stored inside the variable. Let's go through this example to understand what is happening.

In the first line Python creates an object: a `[1, 2, 3]` list. This is the object itself. Python creates it and stores it somewhere in the memory. But there is also something else happening in the first line of code - we ask Python to create a variable named `a`. This variable's goal is to _point_ to the object we have created. If we need to do something with the created object, we will use this name when communicating with Python. So variable is not an object itself. It's just a name for it.

It turns out that we can have multiple names for the same object. Just like in real life, the same person can be called by their name, e.g. `Sam`, but sometimes they can be referred to as `my_friend` or `my_gardener`. This is what happens in the second line of code. We tell Python to remember another name: `b` and that this name should point _to the same object_ as name `a`.

This is why when we change the elements of a thing currently named `b`, the elements of a thing named `a` also change - this names refer to the same object!. Whatever we do to the object will affect the object. It does not matter by what name we will call it. 

Having several names for one object is called _aliasing_. This makes sense - an _alias_ is another name for the same thing. In Python we can have as many aliases as we want.

This should help you understand the difference between mutable and immutable objects. It should be now obvious to you that lists are mutable - we have just experienced that. We also know that strings are immutable. You can try to create a similar example for strings as the one above for lists and you will fail to change the object. You can of course create multiple aliases for the same string. But you cannot change the string itself, so there is no risk of getting this weird behavior for strings. 

This already shows the trade-off between mutable and immutable data types. Immutable data types are safer - there is no risk you will change something when using one name and miss out that all other names will now also refer to the changed object. On the other hand, mutable objects give you more freedom. You do not have to create a new object whenever you want to change something. In the next sections we will discuss this and other differences between these two data types much more deeply.

## **2. Tuples**

 `tuple` is a built-in data type in Python like `list` and `dictionary` which were explained to you before. This data type is ordered and immutable(unchangeable). It is written in rounded brackets. You may think of it like about a `list` which can not be easily modified. Typically `tuple`s are used to store some important and unchangeable data/information. A great example of such usage might be a calendar, where we can assign number of days to each of slots of a `tuple` of length equal to 12( we have 12 months in a year) a `tuple` might be also a good solution for storing some personal data of employees or some bank accounts numbers. 

 Ok, but at first you have to know how to create a `tuple`! Let us start with some simple examples where we are creating `tuple` with a brackets 'method' or with the aid of a keyword `tuple` :
 
```python
my_tuple = (1,2,3,4,5,8)
print(my_tuple)
my_tuple = tuple([1,2,3,4,5,8])
print(my_tuple)
my_tuple = tuple((1,2,3,4,5,8))
print(my_tuple)
```
The output is the same for all lines above `(1, 2, 3, 4, 5, 8)`. Notable is the fact that if you wish to create a `tuple` with only one element, you have to do it like this `my_tuple = (1,)` pleas check with `type()` what will you get if the `,` was missing. 

Similarly to `list` you can create w `tuple` which contains different data types like: `int`, `str`, `float` and `bool`.
```python
a = [2,3,4,4.5,True,'dog']
b = tuple(a)
print(f'Printing b:{b}')
```

The only possible output will look like:

    (2, 3, 4, 4.5, True, 'dog')

Now you may wonder if a example which we have discussed at the very beginning of this topic is also valid for `tuple`s. Let us try this, so in the end we will know whether `tuple`s are mutable or immutable data types. We shall start with the same examples, in which we will simply replace `[]` to `()`, to make `tuple`s instead of `list`s.  

```python
a = (1, 2, 3)
b = a
b[1] = 4

print("Printing b: ", b)
print("Printing a: ", a)
```
When you call this few lines of code you will see some **error**, `'tuple' object does not support item assignment`. This error is related to properties of immutable data types to which `tuple` belongs to. We many not modify `tuple` in the same way as we did it for `list`s. 

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
As expected, you may not change any value in the already defined `tuple`. On the basis of that, you should see that `tuple` is **immutable** because it is unchangeable.
---
---
### **3. When to use Tuples?**
Up to this moment you may think that using `tuple`s do not give you anything special beside making it more complicated when you want to modify them. However, by using `tuple`s you save some memory and computation time. This happened so because `tuple`s are immutable and fixed size, so upon allocation in memory Python knows the exact size so reserves only the minimum of demanding memory. In case of `list`s Python has to to reserve more memory to allow for any further modifications, because it is a mutable.

Before we compare the size and operation speed over `list` vs `tuple` you have to get familiar with some tools which will be necessary. 
To initialize `list` or `tuple` with numbers ascending from 0 to `x-1` we can simply use `range(x)`

    >>print(list(range(10)))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>print(tuple(range(10)))
    (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

Then we have to somehow check how much memory some variable took after allocation. To do so we have to use the `getsizeof()` function which is defined in the `sys` library. This function returns the size of an object in bytes. To use it we can simply import sys library:

    >>import sys
    >>print(sys.getsizeof(list(range(10))))
    208

In the end we want to measure which data type is faster, so we have to somehow measure a time. This can be done with the aid of time library and function `time()`, which returns a time.

    >>import time
    >>start_time = time.time()
    >>print(tuple(range(1000)))
    >>end_time = time.time()
    >>print("Initialization time for TUPLE:", end_time - start_time)
   
    Initialization time for TUPLE: 0.00013184547424316406

OK, by now we have all the needed tools, let us compare the memory size of `tuple` and `list` filled up with the same numbers, and the time needed to go through all the numbers.
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
Let us create a `tuple` and `list` filled up with numbers from 0 up to 999999. Then let us check how much memory it took to allocate such a long `tuple` and `list`. After this we may loop over each element of `tuple` and `list` in separate loops to compare time needed to perform the same operation.
    
    Initialization time for LIST: -126.84030365943909
    Initialization time for TUPLE: 0.08508086204528809
    Size of my_list 9000120
    Size of my_tuple 8000056
    Lookup time for LIST:  0.18608546257019043
    Lookup time for TUPLE:  0.09678792953491211

To conclude:
- `tuple`s need less memory than `list`s
- `tuple`s are more time efficient than `list`s

---
---
## **4. Some Definitions**
### **4.1 Object**
An object is a collection of data(variables) and methods(functions) that act on those data. 
This is very crucial to understand because Python is an object-oriented programming language. 
All objects in Python are characterized by identity, type, and value. Let's briefly discuss them.

### **4.2 Identity** 
The object’s identity **never changes once it has been created**; this is something like national ID number. You can change your name, surname or ask your friends to use another nickname for you. But usually you cannot change your national ID number. This is the number your country uses to refer to specifically you. The identity of an object in Python plays similar role. This is the **object’s address in memory**. Python uses the identity to determine where the object itself can be found. It doesn't matter what are the current names for the object, i.e. what variables point to this object. (on yours computers there might be different output of identity than in the examples below.)

The `is` **operator** compares the identity of two objects:

    >>> a = [1, 2, 3]
    >>> b = a
    >>> a is b
    True

If you want to see what is an identity of an object, you can do so with the `id` function:

    >>> id(a)
    4449813056
    >>> id(b)
    4449813056

Python shows us the id of the _object_ stored in the variable. We can clearly see that id of the object stored in `a` is the same as the ide of the object stored in `b`.

### **4.3. Type**
The object’s type defines the **possible operations** we can perform on the object (e.g. can we ask Python to compute lenght of this object, i.e. can we use `len` function on this object). As we will learn at some point, the type of an object also determines what values and methods can be found as features of this object. We will dive into that when we will be discussing objects and classes, but you kind of already have seen that. For instance, if we are dealing with a `str` we will find a method `capitalize` in this type. There is no such method for a `list`:

    >>> "mateusz".capitalize()
    'Mateusz'
    >>> [1, 2, 3].capitalize()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    AttributeError: 'list' object has no attribute 'capitalize'

The `type` function which you already know returns the type of an object. An object type is **unchangeable** like the object's identity.

### **4.4 **Value****
The value of the object is the data stored inside. For a `[1, 2, 3]` list it's the sequence of numbers stored in this specific order. For a `"mateusz"` string it's the sequence of letters. 

The value of some objects can change. Objects **whose value can change are called mutable**. Objects **whose value is unchangeable** after they were created are called **immutable**. Hence, the type of an object _determines its mutability_.

You may find more information at [link](https://towardsdatascience.com/https-towardsdatascience-com-python-basics-mutable-vs-immutable-objects-829a0cb1530a). Quotes were also made from this reference.  

---
---
## **5. Mutable vs. Immutable Data Types**
Now you should be able to understand the difference between mutable and immutable data types. To make it easier, we already know which objects are mutable and which are immutable:
| Mutable | Immutable |
| ---     | ---       |
|list     | int, float| 
| dictionary | decimal,bool |
| set | string, tuple |
| user-defined classes | range |

For more information about each type of Data Types, you may simply call a `help()` function. Inside the parentheses, you should provide the name of data type for which you want to learn more.
    
    help("int")
If you simply try with "int" you will see:
```python
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
 |      abs(self)
...
 |  
 |  real
 |      the real part of a complex number
 ```
### **5.1 Examples of Immutable Data Types**
From the table above you know that `int, float, decimal, bool, string, tuple, range` are immutable data types. Let us check what is happening with our data types when we are performing simple operations: 
```python
my_int = 2022
my_string = '2022'
my_float = 2.022

print('Let us see the identity of each before any modifications')

print(f'ID of: my_int - {id(my_int)}, my_string - {id(my_string)} and my_float - {id(my_float)}')
```
When we run these lines of code, we will see that

    Let us see the identity of each before any modifications
    ID of: my_int - 139726245163248, my_string - 139726692184688 and my_float - 139726691885328

Now we can make some simple modifications to our variables. Let us add some values for digits and some text to our string:
```python
my_int += 1
my_string += ' year'
my_float += 0.001

print('Let us see the identity of each after modifications')

print(f'ID of: my_int - {id(my_int)}, my_string - {id(my_string)} and my_float - {id(my_float)}')
```
As you should expect, our previous identities are not equal to the new one:
    
    Let us see the identity of each after modifications
    ID of: my_int - 139726245161392, my_string - 139726692238704 and my_float - 139726245162160

But what have happened to our variables? These were immutable data types, so they were unchangeable. The answer is simple, when the identity changes, the new variable is created.

---
---

QUIZ
1. What is the primary difference between lists and tuples?
    *  You can access a specific element in a list by indexing to its position, but you cannot access a specific element in a tuple unless you iterate through the tuple
    *  Lists are mutable, meaning you can change the data that is inside them at any time. Tuples are immutable, meaning you cannot change the data that is inside them once you have created the tuple.
    *  Lists are immutable, meaning you cannot change the data that is inside them once you have created the list. Tuples are mutable, meaning you can change the data that is inside them at any time.
    *  Lists can hold several data types inside them at once, but tuples can only hold the same data type if multiple elements are present.
2. Which choice is an immutable data type?
    *  dictionary
    *  list
    *  set
    *  string
3. What built-in Python data type is best suited for implementing a queue?
    *  set
    *  None. You can only build a queue from scratch.      
    *  list
    *  dictionary
4. What will this statement return?

    {x : x*x for x in range(1,100)}

    *  a dictionary with x as a key, and x squared as its value; from 1 to 99
    *  a set of tuples, consisting of (x, x squared); from 1 to 99   
    *  a list with all numbers squared from 1 to 99  
    *  a dictionary with x as a key, and x squared as its value; from 1 to 100   
5.  Which collection type is used to associate values with unique keys?
    *  slot
    *  dictionary
    *  queue
    *  sorted list
6. Mutable list has several important properties that help you use this data type effectively. In the list below, select all of these properties:
    *  You can't remove elements from it 
    *  It allows you to have duplicates
    *  Its size can be changed
    *  It is an ordered sequence of elements
7. Select all immutable basic data types: 
    *  dictionary, list, set, float
    *  integer, string, tuple, float
    *  set, list, float, integer
    *  string, list, float, tuple
8. Which of the following would complete `A = ` to 25 by slicing my_tuple.

    my_tuple = ("Dog", (1, 25, 300), (50, 5, 2))

    *  `A = my_tuple[1][1]`
    *  `A = my_tuple[1:2](1)`
    *  `A = my_tuple[2][1]`
    *  `A = my_tuple[1:2][1]`
9. Which of the following are true of Python lists?
    *  All elements in a list must be of the different type
    *  List may not contain another list
    *  There is no size limit of list
    *  These are the same list: `[1,2,3]` and `[2,1,3]`
10. Consider the following nested list definition: `my_list = [['dog', 'cat'],123,[2.5, 13,['pet',98,'fly']],'end']`. What is the expression that returns the 't' in 'pet'?
    *  my_list[2][3][0][2]
    *  my_list[2][2][2][0]
    *  my_list[2][1][1][3]
    *  my_list[2][2][0][2]
11. Suppose you have the following tuple definition: `my_tuple =('dog', 'pet', 'cat)` how to replace `'pet'` with `'owl'`?

    *  You can not modified tuples
    *  Non of provided answers
    *  `my_tuple(0) = 'owl'`
    *  `my_tuple[0] = 'owl'`
