# Chapter 5 List, Dictionary

Lists and Dictionaries are the data types that you will be most frequently using while coding with Python. Especially in coding tests, these two data types are the ones that are almost never left out in the probelms given during coding tests. Therefore, you have to fully understand its structure to form the basis and be aware of how to apply these so that you can freely use them in your solution. As a result, in chapter 5, we will cover these two in detail, the structure, logic, and grammar, apart from other data types.

## List

Python's List is literally a sequence that saves in order and is mutable. THe input order is maintained, and internally is implemented through a dynamic array. The structure of a dynamic array will be discusses in detail later in chapter 7, and the data type for implementing a dynamic array for each language is shown in 표 5-1. 

표 5-1

If you are already aware of C++ or Java, you will eaily understand what Python's list data type iis. Not only Python, but most modern programming languages support dynamic arrays and even in C++ and Java, dynamic array is one of the most frequently used data types. No need to say in Python, it is the most frequently use data type and is often implemented in coding tests.

What makes Python list outstanding is its extremely diverse features. When using lists, you do not have to make a decision whether to use a stack or a queue(which will be discussed in detail in chapter 9) and provides all available operations in stacks and queues. This allows Python to hold great advantage over other languages in coding tests and it is one of the biggest reasons you must choose Python. On the other hand,languages like C do not provide any multifunctional data type, so it takes lots of effort to solve a problem that can be easily done with a simple dynamic array. Of course in a coding test where there is a time limit, it is an extreme weakness. 

As such, lists provide diverse functions and also has several operations that can be run in O(1). Adding .append at the end of the list, or using pop() to extract, and searching the element of the wanted index (of course since it's an array) is all O(1). Meanwhile, removing an element or extracting the first element with pop(0) which is an operation of a queue is O(n). Therefore, you should be cautious of queue's operation when using lists. In this case, you can increase the performance using data types like Deque, and this will be discussed in detail in chapter 9. The main operations and time complexity is in 표 5-2.

표 5-2

Although it will be revisited in chapter 18, a binary search is efficient when looking for whether there is a certain value within a sorted list. However, it requires sorting every single time and often, the list is not sorted. As a result, lists are structured to search for each element in order, so the worst case is always O(n).


##Application of Lists

We define a list like the following:


```python
a = list()
```

Or simply, you can use square brackets([ ])


```python
a = []
```

You can predefine the values or add values using append().


```python
a = [1 ,2, 3]
a
```




    [1, 2, 3]




```python
a.append(4)
a
```




    [1, 2, 3, 4]



When you use insert(), you can designate an index of a particular location to add an element. With the following code, you can insert 5 at the third index(index starts from zero).


```python
a.insert(3,5)
```


```python
a
```




    [1, 2, 3, 5, 4]



Until now, we only inserted numbers, but Python's list can manage diverse data types other than numbers, which makes it convenient. As the following, you can freely insert strings and booleans. 


```python
a.append('Hello')
a.append(True)
a
```




    [1, 2, 3, 5, 4, 'Hello', True]



In other languages, what can be inseted whin a dynamic array is often a signle type, but in Python, you can freely insert what you want. In the case of these other languages, you have to go through additional procedures such as converting the tyupe, but you do not need to consider these additional parts in Python, so it is extremely convenient and productive.

When calling a value, you can simply assign an index.


```python
a[3]
```




    5



There is a slicing function in Python list which makes it easy to call values within a certain range. Slicing is originally a useful function for processing strings, but it can work in the same way for lists. Slicing is one of the functions that can well represent the characteristics of Python, its simplicity and its power, which are the outstanding features of Python that represent its strengths. Here, let's try calling the values from index 1 to index 3 (index 3 is not included).



```python
a[1:3]
```




    [2, 3]



In other languages, you cave to construct a loop anad print the values through iterations, but for Python's slicing, you can simply assign the start index and end index to print the desired values. The start index can be left out like the following.


```python
a[:3]
```




    [1, 2, 3]



In this case, you can call the values from the beginning. Otherwise, you can leave out the end index.


```python
a[4:]
```




    [4, 'Hello', True]



This time, it calls until the end of the list. As the following, you can make it call the numbers in the odd number index. 


```python
# values of index 1, 2, 3
a[1:4]
```




    [2, 3, 5]




```python
#values of index 1, 3
a[1:4:2]
```




    [2, 5]



Originally [1:4] calls the values in the in the index 1,2,3, but if you assign the third parameter, it means step, so if you say [1:4:2], it calls the variables with an interval. Thus, it starts from index 1, and skips to index 3 which is two spaces away. The syntax of slicing and the methods of implementation will be explained again in chapter 6.

When you search a nonexistant index, an IndexError occurs as the following:


```python
a[9]
```


    ---------------------------------------------------------------------------

    IndexError                                Traceback (most recent call last)

    <ipython-input-12-044f1ccc0778> in <module>()
    ----> 1 a[9]
    

    IndexError: list index out of range


IndexError occurs when the index exceeds the range of the list, and using a try statement, you can make an exception to to errors.


```python
try:
  print(a[9])
except IndexError:
  print("Nonexistant Element")
```

    Nonexistant Element
    

There are two ways for deleting an element from a list.
 - Deleting with an index
 - Deleting with a value
When you use the del keyword, you can delete the element with at the location of the index.



```python
a
```




    [1, 2, 3, 5, 4, 'Hello', True]




```python
del a[1]
```


```python
a
```




    [1, 3, 5, 4, 'Hello', True]



When you use the remove() function, you can delete the element according to its value.


```python
a
```




    [1, 3, 5, 4, 'Hello', True]




```python
a.remove(3)
a
```




    [1, 5, 4, 'Hello', True]



The diverse application method of lists will be looked through one by one by solving the problems on the following several chapters

##Characteristics of Lists

Until now, we have briefly looked through Python lists. Python's list takes the advantages of both list that locate elements in a continuous space and a linked list that puts together diverse types, and it is powerful enough that you may not even need arrays and linked lists if you can use lists well enough. Therefore, Python does not even provide arrays which are primitive data types. Next is a part of the header file that defines a list in CPython. 

In CPython, lists are defined as a Struct that contains the pointer catalog(ob_item) for the elements. It is structured as when you add or manipulate an element in a list, you can adjust the size of the ob_item.

In Chapter 4, it has been discussed that all data types of Python including integers are composed of objects as cam be seen in 그림 5-1. 

그림 5-1

As such, lists connect all data types that are in the object form with pointers.

그림 5-2

In Python, every thing is an object and Python's list is structured to managfe the pointer catalog for these objects as can be seen in 그림 5-2. In fact, the pointer list for the linked list is managed as an array and thanks to that, Python's list has the combined strength of an array and a linked list. The following is the code that puts integers inside a Python list.


```python
a = [1, 2, 3]
a
```




    [1, 2, 3]



Normally when we refer to an integer array, it means a list like the above which is only composed of integers which is saved in consecutive memory space, and noninteger values cannot be stored. However, Python's list manages the pointer catalog for linked lists and as we looked through in the 'Application of Lists,' it is possible to manage multiple types including integers, strings, and booleans in a single list.


```python
a = [1,'Hello',True]
a
```




    [1, 'Hello', True]



As such, you can save an integer 1, string 'Hello', and boolean True which are all different data type within a single list. This characteristic makes its usage very powerful and conveniant. However, because the size of each data type is different, it is impossible to allocate a consecutive memory space to these values. As a result, it has to be structured to be referring to each object. Of course, searching the index requires additional work such as heading to all pointer's locations, confirming the type code, and looking through each value, so speed becomes its great weakness. As such, Python chose reference to lists and objects for its powerful system over unfortunate sacrifice of its speed. 

## Dictionary

Python's dictionary refers to a dictionary that has a key/value structure. In Python 3.7+, the input order is preserved and is implicitly coded as a hash table. The details of hash table will be dealt with in chapter 11 and the key/value structured data types using a hash table is as according to 표 5-3.

표 5-3

If you already know C++ or Java, you would already have experiance of using the data types introduced in 표 5-3. Unlike lists where you can only set the indices as numbers, you can set diverse types including strings as keys in dictionaries. Especially in Python's dictionary, as long as it is hashable, you can set immutable objects, strings and sets, as keys. This process is called hashing, and you can save the data using a hash table. Moreover, hash table supports diverse types as keys and the input and search are all possible with O(1). If ciyrse the worst case of a hash table would be O(n) but at most cases it would be much faster than  this, and the time complexity of amortized analysis is O(1). Other main operations and its according time complexity is shown in 표 5-4.

표 5-4

As such, dictionary is an excellent data type that can carry out most of its operations at O(1). It is a useful data tupe for saving key/value structured data and is used very often just as much as lists during coding tests. Originally in Python, the input order was not maintained for dictionaries. In most other languages as well, the input order of data types that use hash tables are not maintained as well. In Python 3.6 and under, the input order was not maintained so a separate data type called collections.OrderedDict( ) was provided. However since Python 3.7, it has been enhanced to maintain the input order through intrinsic index. Even so, there are many places that still use Python 3.6 and under, and because the compatibility with lower versions, and since it is difficult to check the version of the interpreter during coding tests, the input order may not be maintained so proceeding at the premise that the order is maintained is an extremely dangerous idea and is normally not recommended. Otherwise, since Python 3.6, there have been advancements to its performance decreasing the memory usage of dictionaries by about 20%.
 - Python 3.7+: Maintaining the input order of dictionaries
 - Python 3.6+: Decreasing the memory usage of dictionaries by 20%
 Other than these advancements, Python provides diverse additional models to effectively create dictionaries. There is collections.OrderedDict( ) under Python 3.6 that maintains the input order and collections, defaultdict() always creates a default value when searching to prevent key error, collections.Counter() sets the value as key and the number of occurance as values to count. The functions provided in this collecitons module will be useful in solving the problems that are provided in this book's coding test.


 

## Application of Dictionaries

 A dictionary can be defined as the following:


```python
a = dict()
```

Or you can use curly brackets to do it simpler.


```python
a = {}
```

You can set the initial values key1 and key 2 as the following, and you can define key3 later to allocate value 3. 


```python
a = {'key1': 'value1', 'key2':'value2'}
a
```




    {'key1': 'value1', 'key2': 'value2'}




```python
a['key3']='value3'
a
```




    {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'}



If you assign a dictionary's key, you can search its value. As the following, if you try to search a nonexistant key, an error occurs. 


```python
a['key1']
```




    'value1'




```python
a['key4']
```


    ---------------------------------------------------------------------------

    KeyError                                  Traceback (most recent call last)

    <ipython-input-5-91c1e5997b2c> in <module>()
    ----> 1 a['key4']
    

    KeyError: 'key4'


When you search a nonexistant index in lists, an IndexError occurs, while when you search a noniexant key in dictionaries, such as key4, a KeyError occurs. As the following, you can make exceptions using a try statement. 


```python
try:
  print(a['key4'])
except KeyError:
  print('Nonexistant Key')
```

As such, if you make an exception to a nonexistant key, it is useful because you can try additional tasks such as inserting it later on. KeyError also occurs when you delete a key as the following:


```python
del a['key4']
```


    ---------------------------------------------------------------------------

    KeyError                                  Traceback (most recent call last)

    <ipython-input-7-11c368e79f18> in <module>()
    ----> 1 del a['key4']
    

    KeyError: 'key4'


Likewise, if you make an exception using the try statement, you can try additional tasks to keys that do not exist which makes it useful. Or other than making exceptions, you can check in advance if a key exists and proceed to further tasks.


```python
'key4' in a
```




    False




```python
if 'key4' in a:
  print('Existing key')
else:
  print('Nonexistant key')
```

    Nonexistant key
    

The keys/values in dictionary can be searched using a for loop as well. As the following, if you use the items( ) method, you can retrieve the keys and values separately.


```python
for k,v in a.items():
  promt(k,v)
```

Dictionary's key, as we dealt with in the former part with error, can be edeletind using del.



```python
del a['key1']
```

We will look through diverse application methods of dictionaries by solving the problems in the following chapters.

##Dictionary Module

We will look through unique container data types related to dictionary, defaultdict, Counter, and OrderedDict.

### defaultdict object
When searching a nonexistant key in defaultdict object,it creates a dictionary item according to the key with a default value instead of printing an error message. In the same wa, it actually has the class collections.defaultdict.



```python
a = collections.defaultdict(int)
a['A'] = 5
a['B'] = 4
a
```

We allocated 5 and 4 to A and B. In this dictionary, these two items exist.


```python
a['C'] += 1
a
```

Here, C is a nonexistant key. In an ordinary dictionary, as we ahve looked through in the 'Application of Dictionaries,' a KeyError would occur. It is possible in defaultdict object to directly add +1 wihout error and in this case, it generates the value as the default 0 and adds 1 to it, which makes it 1 at the end. When you look at the result here, you can see that the three items exist as {'A': 5, 'B': 4, 'C': 1}

###Counter object
Counter calculates the counts of each item and returns it as a dictionary, and is implemented as the following.


```python
import collections
a = [1,2,3,4,5,5,5,6,6]
b = collections.Counter(a)
b
```




    Counter({1: 1, 2: 1, 3: 1, 4: 1, 5: 3, 6: 2})



As the above, Counter object creates a dictionary that has the item as the key and the counts of the item as the value. It actually belongs to the collections.Counter class which once more wraps around a dictionary.


```python
type(b)
```

Because it automatically counts the number of items, it is extremely conveniant and is used in diverse fields. TThen how can we extract the most commoin item from the Count object? You can use most_common() as the following.


```python
b.most_common(2)
```

If you extract the two most common elements as the above, it prints out [(5, 3),(6, 2)] as its result.

###OrderedDict Object

In most languages, a data type using hash table does not preserve its input order. In version 3.6 and under, this was also true for Python and it provided a separate object called OrderedDict. As the following, if you assign an input value, OrderedDict preserves its input order


```python
collections.OrderedDict({'banana': 3,'apple': 4, 'pear': 1, 'orange':2})
```




    OrderedDict([('banana', 3), ('apple', 4), ('pear', 1), ('orange', 2)])



However, since Python 3.7, it was enhanced to intrinsicly use indices to maintain the input order. Therefore, there is no need to use OrderedDict anymore and using the basic dictionary will keep the input order. OrderedDict, other than few additional methods related to order, is left just for compatibility with lower versions. However, there are cases where you use lower version Python interpreters during coding tests, and since hash tables originally do not intervene with input order, it is not recommended and is dangerous to expect input order from a dictionary.

In fact, there was a case when a coding test was carried out with an interpreter with a Python 3.6 and under, and a candidate gave a solution with the results extracted in the input order. The person was not accepted because the solution was considered incorrect for several test cases. Nowadays, most coding test websites use 3.7 and over, so this would be a rare case. However, still, you should be cautious not to expect input order from a dictionary.

Otherwise, modules related to dictionaries can be well applied to problems in diverse fields. In the following several chapters, we will look over the cases by looking through the problems ourselves.

## Syntax: Declaring Type

In Python, you can declare type by assigning a type name, but you can do it easier using symbols. First, declaring typs using name is as the following.



```python
a = list()
type(a)
```




    list



As such, if you declare a list using its name, it becomes a list data type. Then how can we use a symbol to declare the type? Each symbol and its corresponding data type is as the following.


```python
type([])
```


```python
type(())
```


```python
type({})
```


```python
type({1})
```

Each is a declaration of list, tuple, dictionary, and set using symbols. Amongt these, dictionaries and sets use the same curly brackets but are declared as different data types according to the existance of a key. We dealt with this in chapter 4 page 110, and if you declare its value 1 without any key, it becomes a set.
