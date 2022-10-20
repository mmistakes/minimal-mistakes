# Chapter 3 Python

Oftentimes, the most incredible outcomes of hackers are created right after Christmas. The same was for Guido. December 1989, a computer scientist of the Netherlands in the mid thirties Guido Van Rossum struggled due to the limits of diverse programming languages and decided to create a new language as a Christmas project.

The rules were simple. First, it should be easy to read. Instead of binding the codes into braces, the codes were surrounded by neat indents of blanks. Second, the user must be able to create a module package that the user wantss and make it usable in another program. Later on, this method continued to develop through easy_install and then finally providing package index through pip which affected numerous other languages. Third, it needed a peculiar and a mystic name. The language was named after Monty Python, a prominent comedy group of England in the 70s.

About thirty years have passed since then, and now, Python has become one of the world's most popular programming language. Above all, the grammer is extremely simple which is why this language is recommended firsthand for beginners. Therefore, the language is also called 'Executable Pseudocode.' A pseudocode is not supposed to be operating and only the algorithm should be described, but Python is simple enough to describe just the algorithm and is operational. Moreover, Python is widely used in the field although it is a recommmended language for beginners. On the list of most popular programming languages on Stack Overflow investigated by the question ratio, Python has continuously stayed on the top list and now stood up to the first place like image 3-2. From this we can see how popular Python has become.

In my previous workplace, Kakao NLP processing team and at my current job at Hyundai AI research lab, Python is being used as one of the main languages for R&D. IInthe past, 'Basic,' which was a language for beginners could not be put to actual use once the person left the computer academy. However, Python is learned in elementary schools on the one hand and is used for publishing papers for world-class journals by computer science professors on the other. Indeed Python is doing what all existing programming languages have never achieved.

## Understanding Python

In this book, we will cover Python in extreme detail by solving coding test problems. If you choose a certain language for your coding test, you must understand the detailed structure of the language to correctly, swiftly, and accurately solve the problem. If you are not even familiar with the basic grammar, you cannot do well on the coding test.

Moreover, knowing just a part of it is more dangerous than not knowing at all. If you think that dictionaries (covered in Ch 5) always maintain the order of input (only possible on version 3.7 and above), you might waste your time with the wrong results and will not be able to solve the problem within the given time. Time waste mostly comes from what we do not fully understand. Of course many argue that language is merely a tool, but even a simplest tool requires an understanding of how to use it to effectively use it. If you give a chainsaw to a person that cannot even use a saw, that won't help at all chopping down the tree.

In this book, we will take a close look at python alogn with problem solving, and will be covering in more detail above that of ordinary Python books. However, the contents will be limited to built-in libraries, data structure, and algorithm. It is not too much, so you don't have to be afraid of it at this point. We will only look to the degree of providing the optimal solution. For example, Numpy is accepted as a standard library of Python, but since it cannot be used in coding tests, it will not be covered here as well. Object oriented programming as well will not be covered in this book.

This book is based on CPython which is an official interpretor of Python. There are plenty of splendid interpreters like PyPy, but we will limit the boundaries to the official interpretor. The Python version we will be using will py 3.7, and at times, we will look into the inner structure of CPython to accurately understand the principles.

##Python Grammar

From here, we will understand the characteristics of Python by looking through the advanced grammer of Python which will bring up your development skills one step further, and those you may miss although you have an understanding of basic Python grammar. If you keep in mind the characteristics that are introduced here, you will be able to increase your productivity at the codinig test.

### Indent

Indent, which is one of the representative characteristics of Python, follows the official guide PEP 8 to be set as four blank spaces.

**PEP(Python Enhancement Proposals**

Python programming follows the PEP process. PEP process refers to the main development process of Python that proposes new functions and collects the public opinion on communities to document Python design. The indices of PEP starts from 0 and goes on folllowing the form 3XX and 4XX according to a certain rule. For example, numbers 1 to 15 are meta PEPs. These are PEPs about PEPs, and PEP 8 which is a coding style guide belongs to this section. Other than this. PEP about Python 3.0 which is a PEP about Python 3000 is PEP 3000. The proposals related to Python version 3 all start with 3XXX. 
You can find out the full list of PEPs in https://www.python.org/dev/peps

The four-space indentation is also a rule for Google's Python guideline. Of course as Python always does, this is not mandatory and can be done freely according to the user's choice. In the past, it used to be recommended to use tabs o two indents, but after PEP 8, people follow the rule of four spaces. Other than this, there are these following standards in PEP 8. 



```python
foo = long_function_name(var_one, var_two,
                         var_three, var_four
```

Like the code above, if there is a parameter in the first line of code, we match it to the beginning of the parameter so that it looks good.


```python
def long_function_name(
    var_one, var_two, var_three.
    var_four):
  print(var_one)
```

Like in this code, if there is no parameter on the first line, we add a four-spaced indent again to distinguish it from other lines of code.


```python
foo = long_function_name(
    var_one, var_two,
    var_three, var_four)
```

if the code is divided into multiple linew, we add an indent to distinguish it from other lines.

It is not easy to consider all these methods and distinguish things. THe best way is to use great development tools such as PyCharm community edition(https://www.jetbrains.com/ko-kr/pycharm/downlloads/) like image 3-3.

**그림 3-3**

If you use pycharm, it automatically follows the coding guide even if you don't put any attention to it. Or uoi can use PyCharm's Reformat Code to automatically fit the code to PEP 8 Standards, so it is extremely convenient. If you use tools like PyCharm to solve online coding tests, it willl help a lot in solving problems according to the coding guide.

### Naming Convention

The variable naming convention, unlike Java, follows Snake Case which weparates each word with an underscore(_). The same goes for function names as well. In fact, there are situations where problems submitted for coding test do not follow the rule, but you still have to at least keep the names of variables and functions lower-case if it is written by yourself.

Python is extremely proud in its 'Pythonic Way', so it refrains from coding following the Camel Case or in Java-style(Unlike Python, Java follows the Camel Case where a single capitalized letter separates each word). All variables that appear in this book follow the Snake Case without any exception. When you code with Python, follow the Snake Case as default and if the interview asks a question about this, you must be able to answer that you prefer snake coding following Python's PEP 8 and its philosophy. Here again if you use great IDE such as PyCharm, an error apears if a certain name does not follow the standards so it is more convenient.




```python

```

**Camel Case, Snake Case**
Camel Case is named after its form which resembles a camel. Upper-case and lower-case letters separate each word in this format and is a typical format of Java. Interestingly, the first letter of each word starts with a capital, but the first letter of the first word starts with a lower-case. If the first letter of the first word starts with an upper-case as well, than this is called the Pascal Case.

Snake case comes from its snake-like shape and distinguishes each word with an underscore. Most of the times, the letters are lower-cased but at times, the first letter may be in upper-case. According to research, Snake case turned out to be recognized more easily than Camel case. Python recommends a naming convention following the Snake case through PEP8


```python
#Camel Case
camelCase: int = 1
#Snake Case
snake_case: int = 1

```

### Type Hint

It was briefly mentioned in Chapter 2 that although Python is a representitive interactive typing language, a Type Hint that could determine the type was added to the PEP 484 document. THis function can be used in Python version 3.5 and over. Cpython's typing.py clearly states the types that can be defined, and the types can be defined throough the following format.


```python
a: str = "1"
b: int = 1
```

For instance, the previous puthon function that does not use type hint was defined as the following


```python
def fn(a:)
...
```

It does have an advantage that the function can be quickly defined, but there is no clue in what to input in parameter a, whether it is a number or a string, and we cannot know what the dictionary would return. Later on as the scale of the project becomes larger, it becomes a main cause of bugs such as inputting a string in the parameter when you are supposed to put in a number. Let's look through the following code.


```python
def fn(a: int) -> bool:
...
```

With such type hint, you can clearly state that the parameter a of the function fn() is an integer and that the return value would be True or False. With a clear definition as above, the readability increases and the bug become less probable. Of course since this is not an obligation, adiverse values can be allocated so we must be cautious. Therefore, you must stay away from allocating an integer to a string as the following.


```python
>>> a: str = 1
>>> type(a)
```




    int



A coding test usually is composed of a short algorith, and the required type is clear not needing a specification. However if you allocate the type to make the code easily readable in the problem solving process, the interviewer would likely give more credit.

In an online coding teest, you can use mypy to automatically check if there are any errors in the type hint, so you can proofread your codes before submitting it. mypy can be installed through pip like as the following


```python
$ pip install mypy
```

For codes with incorrect type hint, it will return Incompatible return value time and an error will occur for you to check and fix your code.


```python
$ mypy solution.py
```

### List Comprehension

Python provides functional features like map and filter, and at the same time supports labda expressions as the following


```python
list(map(lambda x: x+10, [1,2,3]))
```




    [11, 12, 13]



Only in its 8th version released in 2014 did Java support lambda expressions, but Python has supported lambda since its 1.0 version in 1994, having a longer history. However, the far more convenient feature of Python is its list comprehension. List comprehension iis a method that creates a new list based on an already existing list. It has been supported since Python2.0 and is a characteristic of Python which referenced functional languages like Haskell. In "Effective Python 파이썬 코딩의 기술(길벗, 2016)" chapter 1, 'Pythonic Thinking,' there is a phrase that goes 'Better way 7: use list comprehension instead of map and filter. As such, list comprehension is used effectively in numeroous ways, and moreover is much easier to read compared to lambda expressions incorporating map and filter.

The following is a list comprehension that multiplies two if the number is odd.


```python
[n * 2 for n in range(1, 10 + 1 ) if n % 2 == 1]
```




    [2, 6, 10, 14, 18]



Without list comprehension, the code will have to be in the following stretched out form.



```python
a = []
for n in range (1,10+1):
  if n%2 == 1:
    a.append(n*2)
a
```




    [2, 6, 10, 14, 18]



The code became much longer compared to list comprehension, and a variable a had to be created. We can see that the lines of code has increased a lot. Of course list comprehension can also be applied to those other than lists. Since version 2.7, a list comprehension on dictionary and other types became possible. 


```python
a = {}
for key, value in original.items():
  a[key]=value
```

The code shortened into the following


```python
a = {key:value for key, value in original.items()}
```

The simple one-line code using list comprehension(or dictionary comprehension for this case) is quite easy to read, but you should be aware to not make it overly complicated since it will also become difficult to understand. Normally, expressions should not exceed two.

### Generator

Generator is an old Python function added in Python version 2.2 in 2001. It is a routine form that can control the iteration of loops. For example, let's say we write a program that makes and calculates a hundred-million numbers according a certain rule. In this case, without a generator, we should have somewhere in memory the hundred-million numbers. However if we use the generator, we can only create a generator and create the numbers whenever needed. If about a hundred is used out of the hundred million, the gap will be much greater.

You can use the yield expression to return a generator. A function returns a value and closes if we use a return expression. However if we use yield, the function returns the value up to the point of the expression and continues to be processed until the end of the function. Of course in the following code since there is no ending condition for while True, the function can continue to return values


```python
def get_natural_number( ):
  n=0
  while True:
    n += 1
    yield n
```

In this case, tje returned value of the function becomes a generator like the following.


```python
get_natural_number()
```




    <generator object get_natural_number at 0x7fbda3b43780>



if you want the next value, you can use next(). For example, if you want to generate 100 valuesm you can do next() 100 times like the following.


```python
g = get_natural_number()
for _ in range(0,100):
  print(next(g))
```

    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    11
    12
    13
    14
    15
    16
    17
    18
    19
    20
    21
    22
    23
    24
    25
    26
    27
    28
    29
    30
    31
    32
    33
    34
    35
    36
    37
    38
    39
    40
    41
    42
    43
    44
    45
    46
    47
    48
    49
    50
    51
    52
    53
    54
    55
    56
    57
    58
    59
    60
    61
    62
    63
    64
    65
    66
    67
    68
    69
    70
    71
    72
    73
    74
    75
    76
    77
    78
    79
    80
    81
    82
    83
    84
    85
    86
    87
    88
    89
    90
    91
    92
    93
    94
    95
    96
    97
    98
    99
    100


Moreover in generators, you can make it possible to return diverse types of values from a single function.


```python
def generator():
  yield 1
  yield "string"
  yield True
g = generator()
g
```




    <generator object generator at 0x7fbda4477db0>




```python
next(g)
```




    1




```python
next(g)
```




    'string'




```python
next(g)
```




    True



### range

A representitive function that uses a generator method is range(). It is usually implemented in a for loop and is used like the following.


```python
list(range(5))
```




    [0, 1, 2, 3, 4]




```python
type(range(5))
```




    range




```python
for i in range(5):
  print(i, end= " ")
```

    0 1 2 3 4 

In this code, range( ) returns a range class and if used within a for statement, it generates the next number just as the generator's next( ) expression would do. In fact, range( ) function was not like what it is up until python 2.x. Range generated numbers in advance and returned it as a list, and a method for returning a generator existed separately as xrange(). But after Python version 3, range( ) function was changed to return a range class acting as a generator and xrange( ) function was depricated.

What if you have to generate about a million numbers? It will take up a lot of memory and will take some time. However, that is not the case if you return the class range as you return a generator. You can just decide the generation conditions and use it when needed. The following are two methods to generate a million numbers.


```python
a = [n for n in range(1000000)]
b = range(1000000)
```

In fact, if you compare the length of both variables using len, both returns a million and the comparision operator returns True.


```python
len(a)
```




    1000000




```python
len(b)
```




    1000000




```python
len(a)==len(b)
```




    True



However, there is a diffeence that a holds an already generated value, but b only has the condition to generate the values.


```python
b
```




    range(0, 1000000)




```python
type(b)
```




    range



If we compare the memory usage of the two, it will be easier to visualize why it is better to return a class range.


```python
#import sys
sys.getsizeof(a)
```




    8697464




```python
sys.getsizeof(b)
```




    48



The two equally hold a million numbers but the memory uage of b which uses the class range is much smaller. Even if it is a hundred million numbers, the memory usage of b remains the same because it only holds the conditions for generating the numbers. It can be thought that accessing the variable using indices would be impossible because the varables are not actually generated, but  actually it is made possible and you can use it like a list without any inconveniance.


```python
b[999]
```




    999



### enumerate

enumerate returns ordinal data types(list, set, tupel) with the indices in a form of an enumerate object. It can be used in the following way.


```python
a = [1,2,3,2,45,2,5]
```


```python
enumerate(a)
```




    <enumerate at 0x7f0627e8b870>




```python
list(enumerate(a))
```




    [(0, 1), (1, 2), (2, 3), (3, 2), (4, 45), (5, 2), (6, 5)]



You an return the results usinig list(), and since the indices are automatically applied, it is extremely convenient.

What if you want to print a list a = ['a1','b2','c3'] along with the indices of the list?


```python
for i in range(len(a)):
  print(i,a[i])
```

    0 1
    1 2
    2 3
    3 2
    4 45
    5 2
    6 5


You can first think of the code in the above format. However, it isn't neat to use a[i] to look up the indices and search the total length of the list to create a loop. Without using range() you can implement it in the following way as well.


```python
i = 0
for v in a:
  print(i,v)
  i += 1
```

    0 1
    1 2
    2 3
    3 2
    4 45
    5 2
    6 5


The values are neat, but this too is a method that creates a variable to hold the indices, so needs improvement. The best way is to use enumerate() as the following.


```python
for i, v in enumerate(a):
  print(i,v)
```

    0 1
    1 2
    2 3
    3 2
    4 45
    5 2
    6 5


This way, you can process both the indices and the values at once.

### // division operator

For Python version 2 and under, there were common mistakes due to the division operator / maintaining variables' original type. If we do 5 / 3, it should return 1.666 in Python 3 and over, but it would return 1 maintaining the integer form in Python 2 and under. 


```python
5/3
```




    1.6666666666666667




```python
5//3
```




    1



In PEP 238, a modification in this type of operation was suggested, and afterwards, there was a change in the defaunt division operator. In this PEP, a new // division opeartor was added which maintains the type of the variables. This // operator acts in the same way as the / operator of the past Python 2 and under. When dividing an integer, it returns an integer and operates as a floor divisor. In other words, it gets the quotient.


```python
5/3
```




    1.6666666666666667




```python
type(5/3)
```




    float




```python
5//3
```




    1




```python
type(5//3)
```




    int



5//3 is the same as int(5/3) and can be handled easily. Further in this book, we will always use this operator in case we need an integer result in a division. To add, we can get the remainder through the modulo operator which is % and can be used in the following way.


```python
#Remainder
5%3
```




    2



If we want both the quotient and the remainder, we can use the divmod() function. Further in this book, this function will be frequently used as well.


```python
#When we get both the quotient and the remainder
divmod(5,3)
```




    (1, 2)



### print

The most frequently used command while debugging in a coding test problem solving process is print()(print was a statement until Python 2.x and changed to print() function in 3.x). In most coding test platforms, they let you print out the stdout result using print() to be used for debugging. However, there are cases where print() is not shown when submitting the answer, so it requires caution. Debugging using print() is not recommended at work. However, during a coding test it is also difficult to use a debugger or make a TDD approach, so the only function available for debugging is print(). Let's look at a few methods to make more of this function. Since it is the only choice available, it shoud print out well to increase productivity.

The easiest way to print out a values is to use commas. In this case, a single blank space will be set as default, and when you print the values, each value will be separated with a black space.


```python
print('A1','B2')
```

    A1 B2


Using a set parameter, you can assign a comma as a separator.


```python
print('A1','B2',sep = ',')
```

    A1,B2


Print() function always changes a line, so if you print a value of a long loop, it will be difficult for debugging. In this case, you can set the end parameter as blank to not make the function change the line every time.


```python
print('aaa', end = ' ')
print('bb')
```

    aaa bb


If you want to print a list, you use join().


```python
a=['A','B']
print(' '.join(a))
```

    A B


If idx and fruit are defined as the following,


```python
idx = 1
fruit = 'Apple'
```

how can you add one to idx and print it along with fruit?


```python
print('{0}: {1}'.format(idx+1, fruit))
```

    2: Apple


You can print it with the index in this form. You can also skip the index using the following code.


```python
print('{}: {}'.format(idx+1, fruit))
```

    2: Apple


The method I prefer the most is f-string(formated string literal). You don't have to assign a variable separately and you can insert it inline which makes it convenient. Compared to using % and /format, this method is much simple, easy to read, and fast.


```python
print(f'{idx+1}:{fruit}')
```

    2:Apple


Sadly f-string only works on python 3.6+ and since it does not work on lower versions, you should be aware of it.

### pass

When coding, we often make an approach of first making a large framework and organizing the inner parts one by one write down the following code.


```python
class MyClass(object):
  def method_a(self):

  def method_b(self):
    print("Method B")
c = MyClass()
```

But in this case, the code doesn't run returning an indentation error.

The problem is, the error occurred in method_b() because method_a() did not return anything. This error is necessary, but it is a hassle to handle it in the middle of coding. pass can stop this error from happening. If you insert pass in method_a(), the problem is simply solved.


```python
class MyClass(object):
  def method_a(self):
    pass
  def method_b(self):
    print("Method B")
c = MyClass()
```

pass in python is a null operation that does not do anything. I you assign pass that does not take any role, you can prevent unneeded errors like the indentation error above. With pass, you can create a mockup interface first, and proceed with the actual codes later on. This can be extremely useful even during a coding test.

I made effort to write all the codes in this book the most pythonic way. Even deciding a name of a variable took a lot of effort. Referencing the coding style of this book will help a lot when writing a good python code. It is often said that the code smells good, meaning that a good code has a scent just by looking at it. Of course a bad code will be the opposite. I put in a lot of effort in trying to make the codes have the good smell and you will all be able to do the same. The following specific cases will be a lot of help.

### Variable name and comments

First, the following is a code that gets the number of sub sequence matched to a string which was used in a actual problem-solving process. Let's assign the variable names in whatever way and look through the written code without any comment.


```python
#from typing import List
def numMatchingSubseq(self, S: str, words: List[str]) -> int:
  a=0

  for b in words:
    c=0
    for i in range(len(b)):
      d = S[c:].find(b[i])
      if d < 0:
        a-=1
        break
      else:
        c += d + 1
    a += 1
  return a
```

Doesn't it look like a professional code? Thankfully Python forces you to indent so at least it doesn't look unorganized. At least it doesn't stink, and this owes to Python's strength. However, it is difficult to understand what the variable names indicate and there is no comment on the algorithm making it difficult to understand how the codes work. Of course uncle Bob argues that you should not write comments in his book "Clean Code," but not writing comments in a language other than Java is controversial. I prefer to write comments as detailed as possible, and even during coding tests, I look throught whether there are comments in the submitted result, and discuss about the comments during the interview.


```python
def numMatchingSubseq(self, S: str, words: List[str]) -> int:
  matched_count = 0

  for word in words:
    pos = 0
    for i in range(len(word)):
      #Find matching position for each character
      found_pos = S[pos:].find(word[i])
      if found_pos < 0:
        matched_count -= 1
        break
        
```

Personally, adding simple comments looks much more easy to read, and the same is for name of variables especially for Python. Instead of som random name, each has a specific meaning and are written according to the Snake Case of PEP 8 document. The code is from Leetcode's soluution and the only function which was not named following the Snake Case is a given function name from the Leetcode question, so it was impossible to modify. This is because Leetcode does not follow PEP 8, and I hope Leetcode fixes this someday.

Comments can be written in Korean but you should be at least comfortable with reading and writing them in English. During an online coding test, English comments will have more chance to give a professionalistic impression. Of course in this book, the comments are not properly written because there are separate detailed explanations for each code snippet. However in an actual coding test, you cannot add these descriptions so it is best to always put detailed comments on the code.

### List comprehension

List comprehension is one of the four outstanding functions of Python, and is one of the representitive characteristics of Python. However due to the unique grammar and its implicit nature, it may reduce the readability once it is abused. The following is one representitive case of lowering the readability.


```python
str1s = [str1[i:i+2].lower() for i in range(len(str1)-1) if re.findall('[a-z]{2}', str1[i:i+2].lower())]
```

List comprehensions are often written in a single line because of its powerfulness, but even in this case, if you separate the lines according to each role, the code becomes much easier to read and understand. Let's change the lines of each code and organize it.


```python
str1s = [
         str1[i:i+2].lower() for i in range(len(str1)-1)
         if re.findall('[a-z]{2}', str1[i:i+2].lower())
         ]
```

Rather than being obsessed with a single-line solution, I used the lines more freely to increase readability. Also as explained on page 81, I limited the expressions to 2 to lower the complexity. It is better than lambda expressions, but list comprehensions still have lower readability than a fully written down code.


```python
str1s = []
for i in range(len(str1)-1):
  if re.findall('[a-z]{2}', str1[i:i+2].lower()):
    str1s.append(str1[i:i+2].lower())
```

Writing down everything like this is not so bad for readability. We can read the code from top to bottom which makes it much easier to understand. We don't have to be too obsessed with shorter lines of code. At times, we can consider writing everything down to make it easier to read. Expressions in list comprehensions must not exceed two. If multiple expressions are written across multiple lines, the readability decreases significantly.


```python
retyrn[(x, y, z)
for x in range(5)
for y in range(5)
if x != y
for z in range(5)
if y !=z]
```

### Google Python style guide

I previously introduced PEP 8, the official Python style guide. It was explained that there are many guidelines in PEP 8 such as setting the indent as four blank space, and using an IDE like PyCharm will automatically help you follow these standards. Google Python style guide is a style guide organized by Google where there are several guidelines for a good code not discussed in the official style guide, PEP 8. There are especially guidelines to increase the readability of codes, and we will look through several of them because it fits well wit the coding style introduced in this chapter.

First, you must not use mutable objects as default function value. If the function modifies an object (adding an item in a list), the default value will change. Therefore, we must refrain from using [] or {} as default function value as the following.


```python
def foo(a, b=[]):
  ...
def foo(a,b: Mapping = {}):
  ...
```

Instead, use an immutable object like the following. Assigning None is one good method.


```python
def foo(a, b=None):
  if b is None:
    b=[]
def foo(a, b: Optional[Sequence] = None):
  if b is None:
    b = []
```

When determining True and False, using implicit methods is more simple and easy to read. Thus, you don't have to use if foo != []: which can be replaced with if foo:. The following are several similar cases.


```python
#Yes: 
#1
if not users:
  print('no users')

#2
if foo == 0:
  self.handle_zero()

#3
if i % 10 == 0:
  self.handle_multiple_of_ten()

#No:
if len(users) == 0:
  print('no users')

if foo is not None and not foo:
  self.handle_zero()

if not i % 10:
  self.handle_multiple_of_ten()
```

len(users) == 0 means the length is zero, which means that users doesn't have a value and as #1, using not users is just enough. It is much easier to read. When processing integers, it is less risky to directly compare the integer values like #2 rather than implicitly determining True and False. In the same way, processing a modulo result 0 as an implicit False rather than its integer form is a dangerous move as well and it decreases the readability. Like #3, it is better to explicitly compare the values as i % 10 == 0. Ptherwise, you must not end a line with a semicolon and you also must not write two sentences within a line using a semicolon.

The amximum length of line is set as 80 letters. Although most use big moniters now, there is still an implicit rule that the horizontal length of a code should not be long. Google style guide as well restricts the length of line to 80 letters.
Until now, we looked through each of the basic Python grammer that is easy to miss and also discussed about coding style as well. From chapter 4, we will start looking into the data structure focusing on the datatypes provided by Python.

## Python Philosophy

Python has its own philosophy of a 'Pythonic Way". Python is already a giant universal language that anyone uses, but it is still based upon the philosophy of a pythonic way, and it is a philosophy that developers at least once remind themselves of when creating a new module. Python provides this philosophy through the 'Zen of Python'. This was defined by Tim Peters who made Timsort which we will discuss in chapter 6 'String Manipulation' and can be run by 'import this' command.


```python
import this
```

    The Zen of Python, by Tim Peters
    
    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!


Always remind yourself of this when using python. "There should be one-- and  preferably only one --obvious way to do it." This is what 'Pythonic way' is.

#Chapter 4 Big-O, Datatypes

Big-O is an important topic that is covered in almost all books about algorithm. In computer science, big-O is used to classify how the required time of processing (time complexity) and space requirements (space complexity) increase as the size of input value increases and is extremely useful in analyzing the efficiency of an algorithm.

In this chapter, we will look into this iimportant concept of big-O, get a grasp on cow to differentiate 'best case' and 'worst case' and also deeply look into amortized analysis which is one of the very important methods of explaining how a function is run.

Moreover, before we engage in explaining data structire deeply, we will look over what datatypes Python provides, and what characteristic these datatypes have. It may seem a bit early to explain data types befire basic data structure. However, the topics discussed here will repetitively appear in the following chpters, and even if you do not fully understand all of this chapter's information, you can read through the following chapters that deal with other data structures and try to understand by relating those with the information provided in this chapter.

## Big-O

Big-O is one of the most universially used mathmatical notations of Asymtotic Running Time. An asymtotic running time is the difference in a function's running time when the input value n increases to infinity. Algorithms are ultimately realized through computers, so considering the rapid processing speed of computers, any complex algorithm is finished in a matter of seconds if the input size is small. Therefore, the matter of interest is when the input value is big enough. In a large enough input, the running time can greatly differ depending on the efficiency of the algorithm.

Let's take a look at a simple example. Say you want to send a file in your disk to a friend who lives in another region. If the size of the file is small in image 4-1, in other words, if n is small, an online transmission which takes O(n) amount of time is faster. However if the file size is extremely large, a physical transmission through a plane can take less time (let's not think about the price). No matter how large the file gets, no matter how large n is, the file transmission through a plane will always equally need O(1) amount of time. This is wjat we call Asymtotic Running Time, and big-O is one method to visualize this. 

그림 4-1 파일 크기에 따른 소요 시간

 Asymtotic running time, in other words, is time complexity. The definition of time complexity is the computational complexity explaining how long it takes to process a certain algorithm, and a representitive notation for computational complexity is big-O. When expressing time complexity using big-O, you only write down the term with the largest degree. For example, if there is a function that calculates 4n^2+3n+4 times, you only consider 4n^2 which is the term with the largest degree. Form the term, you ignore the coefficient and the constants and only consider n^2. Thus, the time complexity here is O(n^2). As such, when expressing time complexity, you only look at the shift in the algorithm running time depending on the input value. The types of big-O notations according to this shift is as the following:

O(1): The rinning time is constant regardless of the size of input value. This can be said as the best algorith, An algorithm with a constant time iis like a holy grail, being extremely valuable once you find it, but you may have to spend your whole life searching for it. So if you find a person that promotes an algorithm with a constant time, you should be doubtful about it.

O(logn): From here, the running time is affected by the input. However, log is resistant to change even if the input is extremely large, so it runs solid for a n with a decent size. Binary search is one representitive method and wew will discuss it in more detail in chapter 18.

O(n^2): The less effective sorting algorithms like Bubble sort (more details on chapter 17) belong to this time complexity.

O(2^n): A recursive algorithm calculating fibbonacci numbers (more details on chapter 23) belong to this time complexity. Some may confuse this with n^2, but although it may seem similiar initially, 2^n is much larger. You can find this out with just a few calculations and the result is on chapter 4-1.

O(n!): Solving the Traveling Salesman Problem(TSP), calculating the shortest distance for visiting each city, with brute force belongs to this time complexity and will be elaborated on chapter 12. It is the smallest algoriithm, and even iwth a slight increase in input, it cannot be calculated within a decent polynomial time. Just with n=100, n! results in 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000. 

Let's take a look at the following codes that calculate n^2, and 2^n.







```python
for n in range(1, 15+1):
    print(n, n**2, 2**n)
```

    1 1 2
    2 4 4
    3 9 8
    4 16 16
    5 25 32
    6 36 64
    7 49 128
    8 64 256
    9 81 512
    10 100 1024
    11 121 2048
    12 144 4096
    13 169 8192
    14 196 16384
    15 225 32768


This is the result of a simple script for printing the results of n^2 and 2^2 according to each n. Until n=4, there is no big difference between n^2 and 2^n. However, the gap begins to be significant from n=5 and when n=15, the two are 224 and 32768 which is 145 times larger. The gap gets larger as n continues to increase. As such, 2^n is much more complex compared to n^2 so take care not to confuse the two.



So far, we discussed about the big-O notation for representing time complexity. Big-O is also used to express space complexity along with time complexity. In algorithms, we can often find space-time tradeoffs. This means a fast algorithm takes up more space, and an algorithm taking up less space is slower. 

This is not that different from your friends back at school. A friend with high gpa usually aren't that atheletic, and a friend good at sports mostly does not have a good gpa. Of course there are rare cases where a friend is good at sports and has a high grade. There are rare algorithms that run fast and take up less space. However in most cases, time and space are traded off, and this is one of the important characteristics of algorithms. 

## Upper bound and lower bound

The big-O means the upper bound. There is also the big omega meaning the lower bound and big theta meaning the time spent for the average case. In the field, there is a tendency to put together big theta and big O to make the expression simpler unlike the academics. The average case is often simplified as the upper bound since differentiating the two every time is time consuming, confusing, and usiung the upper bound lowers the probability of errors.

One thing to not here is confusing the upper bound as the worst case. THe big-O notation is a method to express a long, complicated function in a 'adequate' length, meaning it has nothing to do with the time complexity of the worst and average case. Let's look through this in image 4-2.

그림 4-2 Best, average, worst complexity depending on the size of the question



In 그림 4-2, we input the bestm averagem and worst number of calculations required depending on the size of the problem. For instance, ifen if N=4, the best case requires only a few calculations but the worst case may need more than three times more calculations than the best case.

Let's take Quick sort as an example to get into more detail. When the input is [1, 4, 3, 7, 8, 6, 5], it is the best case when we take a Lomuto Partition (which is the simplest method, selecting the rightmost value as the pivot. It will be dealt with in detail in chapter 17.) and we will need a total of 18 comparison or swap operations. As n=7, it is close to O(nlogn).

Meanwhile, if the input is [1, 2, 3, 4, 5, 6, 7], you will need 48 operations. This is the worst case and is close to O(n^2). You would need 24 cycles on averge moving back and forth. Thus, when n=7, the best case, the average case, and the worst case will be 18, 24, and 48, respectively. The ratio between thesee values will stay similar even when n gets larger. So far, these are the best/average/worst cases we can figure out pretty much regardless of the big-O notation.

Meanwhile, the bio-O notation indicates the upper bound and lower bound of the running time of a complex function like f(n) in 그림 4-3. Thus, it is called a big-O when it is the slowest, big omega when it is the fastest, and big-theta on average. We ignore when n is small, in other words, when the value is below n0 and the big-O notation focuses on the larger picture when n gets extremely big.

When we look back at the example of quicksort, the  'optimal case' is O(nlogn) means when the input value is [1, 4, 3, 7, 8, 6, 5], the maximum number of operations is within nlogn. In fact, when calculating log as natural logarithm, nlogn is approximately 14, and since the number of operations at the best case was 18, it is a quite similar value regarding that the constant was ommitted. If we play with the words a bit more, the phrase 'the best case is O(n^2) is also true. Big-O only means the maximum so the actual number of operations just have to be smaller than this value. In the same way, 'The best case is O(n^3)' is also true. However in this case, the upper bound is set to high so of course it is meaningless. 


Now, let's reorganize what big-O is through what I explained so far. 
  
  Big-O notation expresses the running time of the best/worst/average case of a given situation.

**Amortized Analysis**

It was said that it is overly pessimistic to only look at the worst case rather than considering the whole algorithm when calculating the complexity of an algorithm that analyzews time or memory. As a result, Amortized analysis emerged.

Amortized Analysis, along with Big-O, is one of the important analysis methods for explaing the mechanism of a function. One example where Amortized Analysis could be effectively implemented is 'Dynamic Array.' In this case, a doubling occurs once in a while, but it is overly pessimistic and inaccurate to say 'the time complexity of a dynamic array is O(n) when inserting an item. Therefore, in this case, we can calculate the algorithm's time complexity by using 'Amortized Analysis' or 'Amortization' which distributes the worst case through multiple iterations. This way, the time complexity of an insertion in a dynamic array becomes O(1). The method was first introduced by Robert Tarjan, a mathmatician and a comuter scientist of the U.S. in 1985 in his paper 'Amortized Computational complexity,' and has recently become a universally adopted method for analyzing time complexity because of its usefullness.

##Parallelization

Several algorithms can increase its running sped through parallelization. Recently, parallelization is getting much attention with the popularization of deep learning and GPU is a representitive device for parallel computing. Each core of GPU is much slower than the CPU but GPU's is composed of thousands of cores while the CPU has at much dozens, which makes it possilbe for the GPU to process hundreds times more operations at once compared to a CPU. For example, CPU is like carrying things through an airplane multiple times, while GPU is shipping much more at once. As the speed of each ship is much slower the an airplane but could carry much more luggage, GPU can get much more done at a same given time. As such, parallelizable agorithms including deep learning is recently getting much attention. Parallizability of an algorithm is becoming a very important criteria for evaluating the quality of an algorithm other than the time complexity of the algorithm itself.

##Data Type

Now lets look at what data type Python offers and what characteristics these data types have. You will get in touch with the ones dealt with in Chapter 4 and 5 most frequently while using Python, and we will focus on List and Dictionary which is what you will most often be using  during coding tests as well. The two data types will be continuously popping up, so keeping these in mind here will greatly help you understanding the topics that will be dealt with later.

##Python Data Types

First, let's look at the data types that Python supports. There's too much to look through all the data types, so we will focus on a few major data types.

그림 4-4

그림 4-4 is an illustration of the major data types in Python version 3(there is a bit of difference between the data types of version 2 and 3, and the explination this book is based of Python 3.7). The following is the categorization of the image based on the type.

**Number**
Python provides only int for an integer. How will we store something bigger than int? Do we not have long in Python? Originally, Python had int and long separately until version 2. int was a C style fixed-precision integer, and long was an arbitrary-precision integer. Since version 2.4 with PEP 237, the structure has changed to automatically convert into long when there is not enough int, so unlike C, the occurrance of an overflolw has disappeared. According to PEP 237 roadmap, the two were unified as int since version 3. int supports arbitrary precision, and Python no more supports fixed-precision integer. 
To be strict, bool is a logic operator, but in Python, is a subclass of int which is 1(True) and 0(False) intrinsicly. int is also a subclass of Object so the structure is as the following:
object > int > bool

If we compare True, which is a logic data type with 1, an integer data type, the result is as the following.


```python
True == 1
```




    True




```python
False == 0
```




    True



As we have confirmed with the comparison operator ==, logic data types intrinicly have an integer value.

##Arbitrary-Precision
What does 'Arbitrary-Preciison' mean? Arbitrary Precision integer is simply an integer that provides unlimited digets. How is this possible? The solution is to consider an integer as an array of numbers. Thus, each diget is saved as an array. For instance, a large number 123456789011121314115 follows the representation of the chart 4-1.

표 4-1

The representation can again be converted into a mathmatical expression as the following.

(437976919x2^(30x0))+(87719511x2^(30x1))+(107x2^(30x2)) = 123456789011121314115

As such, the number is processed with the calculation of the number separated by tis digets. The precise expenation of the logic behind this goes beyond the coverage of this book, so we will only look up to here. A problem that is similar to the logic of arbitrary precision is in Chapter 19, 'Bit manipulation' when solving a problem that applies a Full Adder. 
Of course the precessing speed decreases when processing a number with arbitrary precision. However, since we can process numbers in a single data type, the language structure becomes extremely simple, and for the ones using the language, we do not have to consider overflow which prevents calculation errors. This is an exchange of speed with fuctionality and safety, and we will discuss another case of trading speed with functionality later when dealing with object structure of Python. Java provides the data type BigInteger that supports arbitrary precision apart from basic integer, and in Python, the basic integer int supports arbitrary precision calculation as well.

##Mapping
Mapping type is a complex data type composed of Keys and Values, and the unique mapping data type in Python is Dictionary. Dictionary, along with list discussed earlier is the most frequently used data type, so it will be again dealt with in detail later in Chapter 5.

## Set
In Python, a set data type set is a data type that does not have overlapping values. An empty set is declared as the following in Python:


```python
a = set()
a
```




    set()




```python
type(a)
```




    set



When declaring a nonempty set with values, we use the form a = {1,2,3}, but since we use curly brackets as we have for dictionaries, we should keep it in mind. However, distinguishing the two is not difficult. Dictionary takes the form of Key/Value, but dictionary only declared the value, so if we take a look at the format of declaration, we can easily judge the type. The python compiler automatically makes type declaration in the same way,


```python
a = {'a','b','c'}
type(a)
```




    set




```python
a = {'a':'A','b':'B','c':'C'}
type(a)
```




    dict



set does not maintain the input order, and when there is overlapping value, it only leaves it leaves one and removes the duplicates.


```python
a = {3, 2, 3, 5}
a
```




    {2, 3, 5}



##Sequence
Sequence means an ordered list. For example, str is an ordered lsit of characters and is a data type that composes a sring. List is a data type which is an ordered list of diverse values in a form of an array. In Python, which does not have array, a sequence type 'list' takes the role of an array. A sequence can be divided into immutable and mutable, and literally, we cannot change the value of an immutable sequence.


```python
a = 'abc'
a = 'def'
type(a)
```




    str



Variable a is a str, and was at first allocated abc, and later def. The value of the variable a has been changed. Then what does it mean by str being immutable? This may be confusing, but we never made any changes to the string abc which was first allocated to variable a. It is immutable. Later, variable a referred to another str, def, and abc, def both have never been changed since it was created. It is immutable, so it cannot be changed. Now, let's look at the following code.


```python
a = 'abc'
id('abc')
```




    140386814930032




```python
id(a)
```




    140386814930032




```python
a = 'def'
id('def')
```




    140386814074672




```python
id(a)
```




    140386814074672



If we print each memory address, variable a first referred to abc, and later was changed to referr to def. abc and def was never changed after being created and was stored somewhere in memory. If str really has to be mutated, the following allocater to the str that is being referred to has to be processed, but it gives us an error.


```python
a[1]='d'
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-18-ac4676b91da0> in <module>()
    ----> 1 a[1]='d'
    

    TypeError: 'str' object does not support item assignment


As such, str cannot be mutated and is immutable. This statement is easily understood. List is a dynamic array where we can freely add or remove values. List will be dealt with in detail in Chapter 5 as well.
So far, we dealt with the main data types that Python provides. Since we stated that the imoprtant ones will be explained again later, let's look at them one by one. First, we will take a look at Python's unique type structure.



##Primitive Types

Standard programming languages like C and Java support Primive Types. Especially, C supports diverse primitive types even for the same integer type depending on its size or if it is plus or minus. 

그림 4-5

We discussed earlier that one of the strengths of arbitrary precision is that the  numbers could be processed in a single form, so the language becomes extremely simple, but C is a language on the totallay opposite side. Just to represent C, the language supports numerous data types as can be seen on 그림 4-5.
Primitive data types allocate just enough space on the memory for the size of the type, and fills the space just with the values. If it were an array, it will become a form where elements take up the amount of space needed for the size of the data type in the physical memory in order.
그림 4-6

Not only C but Java as well. It supports primitive data types and is capable of extremely fast calculation. The syntax for primitive data types in Java is the same as C, and is defined as the following.


```python
int a = 5;
```

Moreover, Java supports class objects which are equal to primitive types as the following.


```python
Integer a = new Integer(5);
```

As such, it has an object corresponding to the primitive type and if the primitive type is converted to an object, it is possible to carry out diverse tasks. What would have been impossible if only the numbers were stored in memory would become possible if it is converted to an object. FOr example, you can try bit manipulation like converting to a hexadecimal or shifting. One thing to note is since this requires diverse additionaal information, it takes up more memory space and trhe calculation speed decreases. While Java's int is 32 bits, the result of running the following JOL(Java Object Layout) states that the object Integer is 128 bits(16bytes) which takes up four times more space, which can be seen by simple comparison. 



```
$ java -jar jol-cil/target/jol-cil.jar internals java.lang.Integer

# 자바 코드
```



If we take a look at the JOL, it can be seen taht the space where the actual value is stored is the last four bites, and the remaining 12 bytes iss the header containing diverse additional information. Int is fascinating enough, but when we take a look at bool, it gets even worse. bool primitive type is merely a single bit, but the object Boolean is a whooping 128 bits. It is takiing up 128 tiumes more space, and as such, objects trade part of its speed and space with the availability to provide diverse handy functions.
C only supports primitive types and Java supports both priumitive types and objects. How about Python? C and Java emphasize performance. As a result, it provides primitive types which are closer to a hardware, and it is possible to process much faster when running with primitive types. Then you may easily guess what choice Python has made. Python does not support primitive types. Python is a language developed in the first place to provide handy functions and it may be obvious that it is more interested in providing much diverse functions with objects even if it means slower running speed and taking up more memory. To sum up, it becomes like 표 4-2.

표4-2


##Object

Everytthing in Python is an Object. Objects can be divided into immutable Objects and Mutable Objects in large. As can be seen in 그림4-4, we have already tried distinguishing immutable and mutable in sequences. The mutability of each data type including sequences can be found in 표4-3.

표 4-3
Immutable Objects

##Immutable objects

Most of all, in python, everything is an object. The task of assigning a variable means referring to the corresponding object. There is no exception to this and even strings and numbers are all objects, just that there's a difference that strings and numbers are immutable objects. We can take a look at what this means through a simple experiment. 


```python
10
a=10
b=a
id(10),id(a),id(b)
```




    (94698107591456, 94698107591456, 94698107591456)



There's this number 10. Now we allocate this 10 to variable a. Then, we allocate variable a to varable b. If these were all primitive data types, each value would be placed in a different location within the memory. But since everything in Python is an object, the result of running the id() function that returns the addoress of the object within the memory is equal. If 10 becomes 11, variable a and b should all become 11 but that does not happen. This is because numbers and strings are all immutable objects. Now, you will understand what we meant by saying str is an immutable object. THe varialbe that holds the value is just a reference and int and str that holds the actual value are all immutable objects. Another immutable object is tuble. Once it holds a valuye, the value cannot be changed, literally. It could be used as read-only like a constant and as the value does not change, it can be used as a dict's key or a value of a set. list is mutable so it cannot be assigned as a dict's key or a value of a set.

##Mutable objects

Now let's look through mutable objects. As can be seen in 그림 4-4, one of the mutable sequences is a list. Unlike int and str, the value of a list can be changed, and this means if another variable is referring to a list, the value of that value folllows the changes made to the list. We will check this out through the following simple experiment.



```python
a = [1,2,3,4,5]
b = a
b
```




    [1, 2, 3, 4, 5]




```python
a[2]=4
a,b
```




    ([1, 2, 4, 4, 5], [1, 2, 4, 4, 5])



Variable a is a list. We allocated a to b, which means b is referring to a. Then we changed an element from the list a to change the value. WHat happens to b? As we can see from the above code, the value of b has changed as well. If b was referring to an immutable object like an int or a str, such thing would not have happened, but since it is referring to a mutable object, list, this can always happen

##Comparison with the reference system of C++

One thing to be cautious about is that the reference method of C++ is different from that of reference allocation in Python.

'''C code'''

Allocation variable in C++ has a reference like in Python. Moreover, if you allocate a certain value to a reference variable, the referencing variable also changes to the allocated value. In this case, the value being allocated changes from 10 to 7.


```python
a = 10
b = a
id(a),id(b)
```




    (94698107591456, 94698107591456)




```python
b = 7
a, id(a),id(b)
```




    (10, 94698107591456, 94698107591360)



However, things are different in Python. Through b=a, a and b direct to the same memory address. However, when we allocate a new value to b with b=7, variable b no more refers to a and now refers to a object which is 7. THerefore, b has a different ID and the value of variable a stays as 10. Although the two languages have the same meaning as referering to a certain value, the allocation method of C++ and Python are different, so if you are a developer already familiar with C++, you should be cautious of such difference. The values of immutable objects such as strings and Integers discussed before cannot be manipulated with a reference variable. However, if it holds a mutable object like a list, it is possible to manipulate its value through a reference. However in this case, if you reallocate using a = operator, the ID changes so you have to be careful.


```python
a = [1,2,3]
b = a
b[2] = 5
a
```




    [1, 2, 5]



##is and ==

In Python, there are the comparison operators is and ==. The relationship between the two are deeply related with Python's object structure. First, is comapres the id() values. None is null so cannot be compared with ==. Therefore, it can only be compared using is. 


```python
if a is None:
  pass
```

==, as you already know, compares the values. Whern you compare the created lists as the following, you can get the difference between == and is.


```python
a = [1,2,3]
a == a
```




    True




```python
a == list(a)
```




    True




```python
a is a
```




    True




```python
a is list(a)
```




    False



The value is the same, but if you wrap it with a list() again, it is copied as a separate object and has a different ID. Therefore, is becomes False.


```python
import copy
a = [1,2,3]
a == copy.deepcopy(a)
```




    True




```python
a is copy.deepcopy(a)
```




    False



When you copy using copy.deepcopy(), the value is the same but the ID is diffrent. If you compare using ==, it is True but when you compare using is, it becomes False. 

## Speed

Python's object system is well structured, is convenient, and provides diverse powerful features. The problem is speed. As 그림 4-7, the object structure of Python is one of the reasons that make it slower than other languages like Java and C.

그림 4-5

Just a simple addition of integers can be done with a single operation in primitive data types. However, as can be seen in 그림 4-7, Python's object requires you to find the type code in var ->PyObject_HEAD and there are multiple additional required processes. For the same reason, a calculation with object in Java is much slower than a calculation with a primitive data type. However, Java supports primitive data types, so if it uses a primitive type, it can make a speed close to C. In the sam way, Python's science calculation module NumPy is famous for its speed. This is because Numpy is module made of C and intrinsicly processes lists through C's primitive data type.


```python
%timeit -n 100 np.std(numpy_rands)
%timeit -n 100 standard_deviation(rands)
```

This is the result of running the code that calculates the standard deviation of 1000000 randomly generated numbers a hundred times in a macbook. There was more than 40 times gap in the average running time between the two. 
- running time for calculating the standard deviation using a numpy array: 3.28 ms
- running time for calculating the standard deviation using Python list: 131 ms

The speed gap between a primitive data type and a object is extreme as can be seen from the example. Then why does Python give up primitive data type abd stick to lists and objects? The reason will be explained in the following chapter 5.

## Data Structure, Data Type, and Abstract Data Type

In this book, the terms Data Structure, Data Type, and Abstract Data Type continue to appear. Although these words are seemingly close to each other, there is a clear difference so we must be able to clearly define each word. To do so, we will look through these one by one. 

First, in Computer Science, data structure refers to the system, handling, and saving method of data for us to more efficiently approach and manipulate it. It is an academic definition of data structure that we normally speak of.

People often confuse Data Type and Data Structure. Basically, Data Type is a sort of data attribute that informs the compiler or the interpreter how the programmer is using the data. In a easier expression, Data Type is much more specific compared to Data Structure, and in a particular language, Data Type includes all types of data including the primitive data types such as integers, floating-point numbers, and strings that the language supports.

Data Structure normally refers to arrays, linked lists, or objects that are based on primitive data types. From a data type perspective, data structure is a composite data type that is a combination of diverse primitive data types. 

Finally, Abstract Data Type, in short, ADT, is the mathmetical model that deals with data types. In other words, ADT is the specification of operations that can be processed when dealing with the particular data type. ADT defines the actions, but does not specify the actual method of implementing the operation. This is different from data structures. For those that have experienced Object Oriented Programming(OOP), it would be easier for your understanding when you think of 'Abstraction.' Abstraction reveals only the essential attributes, and hides the unnecessary ones. Therefore, ADT is a similar concept as OOP's abstraction in that it only shows the interface but does not show the actual implementation.

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

#Chapter 6 String Manipulation

String manipulation means the diverse process such as changing or politting a string. Originally, a string should be manipulated at a low level, or in a language without string like C, it is very difficult to manipulate. However, in most languages, string data types and diverse functions to manipulate strings are basically provided, so unless there is a certain restriction, it is best to get the most out of basic functions provided in a language. String manipulation is a topic that frequently appears in coding tests, and is an extremely useful function that is often used in real life. Fields that use algorithms that have to do with string manipulation is as the following.

 - Data Processing: When searching a webpage using a certain keyword, you get to use string manipulation applications. Especially, most of the modern data is composed of strings so string manipulation is essential in data processing.
 - Communication System: When sending a text message or an email,  you send a string from one place to another. As such, data transmission is why string manipulation algorithms were born, and string manipulation is extremely important in data transmission.
  - Programming System: Program is itself, consisted of strings. Compilers and interpreters are used to interpret strings and translate them to machine language. Here, an extremely precise string manipulation algorithm is used.

Until chapter 5, we looked through diverse data types and background languages that are required for problem solving. From now, we will start solving problems related to strings, and look around one by one what functions are provided and what methods can be used to manipulate and process strings within Python. 

## 1. Valid Palindrome

Check if the given string is a palindrome. It does not distinguish capitalization, and it only takes English characters and numbers. 

Example 1
Input: "A man, a plan, a canal: Panama"
Output: true

Example 2
Input: "race a car"
Output: false

What is 'Palindrome'?
A Palindrome is a word or a sentence that is identical when reversed. "우리 말로는 회문이라 부르며 문단 중에서는 대표적으로 '소주 만 명만 주소'같은 문장이 이에 해당한다. 이 문장은 뒤집어도 '소주 만 병만 주소''가 된다. Using this characteristc of a palindrome, you can create diverse interesting questions, so it is a topic that is repetitively introduced in coding tests. We will try solving diverse problems that have to do with application of palindromes in this book as well.

### Solution 1 Conversion to a List

Here, we directly get the string as the input and determine if it is a palindrome. This question has the limitation that it does not distinguish capitalization and only takes English characters and numbers as its input. Therefore, we construct the preprocessing part as the following.


```python
s="A man, a plan, a canal: Panama"
strs = []
for char in s:
  if char.isalnum():
    strs.append(char.lower())
```

Here, isalnum() is a function determines if the string is composed of English characters and numbersm so you only add the characters that are true. It does not distinguish capitalization so we convert all of it to lower case using lower(). Now, when the input is "A man, a plan, a canal: Panama", the following values are saved in the strs list.

['a', 'm', 'a', 'n', 'a', 'p', 'l', 'a', 'n', 'a', 'c', 'a', 'n', 'a', 'l', 'p', 'a', 'n', 'a', 'm', 'a']

Now let's check if this is a palindrome.


```python
while len(strs) > 1:
  if strs.pop(0) != strs.pop():
    return False
```

You can assign an index in pop() function in Python list , so you can get the first value when assigning 0. You can match it with the last value, and if it does not, it returns False, and if all words have passed, it returns True. The full code is as the following.


```python
def isPalindrome(self, s: str)-> bool:
  strs = []
  for char in s:
    if char.isalnum():
     strs.append(char.lower())

  #determining if palindrome
  while len(strs) > 1:
    if strs.pop(0) != strs.pop():
      return False

  return True
```

### Solution 2 Optimization using Deque Data type

List is enough to solve the problem, but if you explicitly declare using deque, you can increase its speed. The running time of solution 1 was 304 ms. It cannot be seen as a well performing code, and we'll see how much better it gets just by simply changing it to a deque.


```python
def isPalindrome(self, s:str)->bool:
  strs: Deqie = collections.deque()
  for char in s:
    if char.isalnum():
      strs.append(char.lower())
  while len(strs) > 1:
    if strs.popleft() != strs.pop():
      return False
  return True
```

Here, predefining the datatype with strs: Deque = collections.deque() makes the running time 64 milliseconds. This is about five times faster than the speed of solution #1. While pop(0) of a list is O(n), the popleft() is O(1) , and if the two are iterated n times, the list approach is O(n^2) the deque approach becomes O(n) which makes a large gap in the performatnce (to know more about deque, refer to chapter 10). Anyways, this much performance is good enough, However, let's try the optimized innate functions of Python  to enhance the function a bit more. 

### Solution 3 Using Slicing

The following is a problem solving code using slicing.


```python
def isPalindrome(self, s: str) -> bool:
  s = s.lower()
  #removing unneeded words using regular expression
  s = re.sub('[^a-z0-9]',' ',s)

  return s == s[::-1] #slicing
```

There's nothing much to call an algorithm here. We filtered the unneeded words using the regular expression, and used Python's Slicing to manipulate strings(consult the 'string slicing' box on page 143.) In the previous solution, we examined each character one by one using isallnum().
Here, we used the regular expression to filter out only the Alphanumeric characters from the whole string at once. Moreover, Oython provides a good function to freely slice strings like an array or a list, and you can flip it using [::-1]. The code gets much shorter, and as the code is intrinsicly constructed using C, you can expect a much faster speed. In this case, the running time is 36 milliseconds, which is about twice faster than the solution #2.


###Solution 4 C implementation

Finally, how faster can we get by making it with a high-functioning language? Here, we wiull use C as a benchmark and compare. 


```python
//C
...
```

For the fastest speed, we wrote the code with C. We directly made changes to the char pointer that saves strings to make it work as fast as possible. The words to be filtered weree processed using variables bias_left and bias_right, in a form of skipping every other word. Because we had to create all functions, the code got longer but it will be extremely fast because we are manipulating the location pointer ourselves, Evidently, it showed an amazing speed of 4 milliseconds of runnig time. 

As such, we were able to use advanced methods for optimization, and found out that the compile languages like C are much high-functional than interpreter languages like Python.

###String Slicing

Python provides an extremely handy function called string slicing. Moreover, it works extremely fast intrinsicly. When we set a location, we get the sequence pointer of that location, and we can find the actual value through the connected object, and as this process is extremely fast, it is always best for speed to use slicing first. Methods like mapping strings into lists is a good approach when handling data structure, but mapping into another data type requires a lot of operation cost, so you may be losing the overall speed. Most of the work regarding strings are solved most quickly using slicing. Table 6-1 shows the speed comparison between slicing and other operations, and reveals how quick slicing is. 

표 6-1

As above, slicing is the fastest and an extremely handy function that Python provides. Now, let's look at how we can use slicing with the string "Hello".

***이 밑은 어떻게 해석해야 할 지 모르겠네요..
'안녕하세요' 이요한 예시


## 2. Reverse String
Write a function that flips a string. The input is a string, and manipulate the list content *directly* without returning the value. 

Example 1


```python
#input
["h","e","l","l","o"]
#output
["o","l","l","e","h"]
```

Example 2


```python
#input
["H","a","n","n","a","h"]
#output
["h","a","n","n","a","H"]
```




    ['o', 'l', 'l', 'e', 'h']



###Solution 1 Swap using a Two Pointer
First, we will try the traditional method using a Two Pointer. The details of Two Pointer will be explained again in Chapter 7, but to briefly explain here, this method is literally using two pointers to adjust the range. Here, you can solve it by continuously narrowing down the range and swapping. Since there is a restriction in the problem that says 'not to return and directly manipulate the list content,' you can solve it a s the following by swapping the inside of the s. The full code is as the following.


```python
def reverseString(self, s: List[str]) -> None:
  left, right = 0, len(s)-1
  while left < right:
    s[left], s[right] = s[right], s[left]
    left +=1
    right -=1
```

###Solution 2 Pythonic way

Using the basic function of Python, this problem can be solved in a single line. These methods are what we call a Pythonic way. The input is provided as a list, so you can use the reverse() function to flip it around,


```python
def reverseString(self, s: List[str])-> None:
  s.reverse()
```

reverse() is only provided for lists. If the input is a string, you can use string slicing which is what we looked through before. Slicing can be used on lists, and has a very excellent performance.

s = [::-1]

However, this code does not work on leetcode. [::-1] should work, but for this problem, it doesn;t because the space complexity is limited to O(1), so there is a restriction to processing variable allocation. In this case, it works well with the following trick.

s[:] = [::-1]

These sorts of tricks are difficult to find out, so when this kind of problem occurs during coding tests, you may struggle debugging., so you must be aware of the platform's characteristics.
In fact, this is a problem with way too much restraint. When you have to take a coding test on a platform other than leetcode service, such as hackerrank or codility, it may function differently so you must be aware of the characteristics of each platform in detail before taking the test. In fact, most platforms give you enough time to practice before taking a test. FOr instance, RemoteInterview, which is a coding platform that line used to use gave an hour to practice, so we should make use of these opportunities as much as possible.

##3. Reorder Log File
Reorder the log according to the following standard.
1. The front of the log is the indicator.
2. Log composed of alphabet come before numeric logs.
3, The indicator does not affect the order, but if the alphabet is the same, it goes in the order of the indicator.
4. Numeric logs are in the input order.


```python
#input
logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6", "let2 own kit dig", "let3 art zero"]
#output
["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
```

###Solution 1 Using Lambda and + operator
This is a question that asks how well you can process the given requirements. These sorts of logic is often used at workplaces, so it can be seen as an extremely practical one.

First, logs composed of strings come before numeric logs, and numeric logs are left as its input order. Then, we distinguish the strings and numbers, and the numbers are appended later on as it is. The log itself saves the numeric logs into strings as well, so if you check the type, eeverything becomes a string. Therefore, you have to distinguish if it is numeric using isdigit(). 

```
if log.split()[1].isdigit():
  digits.append(log)
else:
  letters.append(log)
```
In this case, the log that can be converted to numbers are saved into digits and the others are added to letters. Now the string logs are organized into setters, so all you have to do is to sort it as the following.

```
letters.sort(key=lambda x: (x.split()[1:], x.split()[0]))
```
Here, we use the string's [1:] which excludes the indicator as the key and sort, and when the  value is equal, we assign the indicator [0] afterwards using the lambda expression (about lambda expressions, consult the box description on the next page). Now, put it all together and return it as the following.

```
return letters + digits
```
You would be curious how the + operator functions, so let's look at the next code.

```
>>> a = [1,2,3]
>>> b = [4,5,6]
>>> a+b
[1,2,3,4,5,6]
>>> b+a
[4,5,6,1,2,3]
```
When you allocate [1,2,3] to variable a and assign [4,5,6], and do a+b, the result becomes the connection of [1,2,3] of a and [4,5,6] of b to make [1,2,3,4,5,6]. When you do b+a, it returns the opposite which connects the value of b and then value of a which is [4,5,6,1,2,3]. If it was another language, the algoritm would have been quite long but we could do it neatly using just a few lines of code.





```python
def reorderLogFiles(self, logs: List[str]) -> List[str]:
  letters, digits = [], []
  for log in logs:
    if log.split()[1].isdigit():
      digits.append(log)
    else:
      letters.append(log)

      #sorting the two keys using lambda expression
      letters.sort(key=lambda x: (x.split()[1:], x.split()[0]))
      return letters + digits
      

```

### Grammar, Lambda Expression
Lambda expression means a function that is operational without an indicator, so you can simply express a function even if you do not define it. However, we will mainly use List Comprehension which is much simpler and easy to read compared to lambda expressions. However, if it is necessary, we use lambda expressions, especially at times when it is easier to use lambda as in question 3.
In the solution, we saw the grammatical expression that sorts the two keys using the lambda expression. 
```
s.sort(key=lambda x: (x.split()[1:], x.split()[0]))
```
If s was ['2 A', '1 B', '4 C', '1 A'], the result of sorting using sort() is as the following. 


```
>>> s = ['2 A', '1 B', '4 C', '1 A']
>>> sorted(s)
['1 A','1 B','2 A','4 C']
```

However, what we want is not the sorting using each element's number, but according to the string at the back, and using the number only when the string is the same. In this case, we have to process each element of the list and here, we can use lambda expressions. In simple words, we can say lambda is a method to simply define a function. If we don't use lambda and define the function directly, it would be in the following form:


```
>>> def func(x):
  return x.split()[1], x.split()[0]
>>> s.sort(key = func)
>>> s
['1 A', '2 A', '1 B', '4 C']
```
Now if we use lambda expressions, we do not have to define a separate function and can process it as if we have defined a simple funciton.


```
>>> s.sort(key=lambda x: (x.split()[1], x.split()[0]))
>>> s
['1 A', '2 A', '1 B', '4 C']
```
However, the readability of the lambda expression could be extremely lowered once the code gets longer opr if we mix it with map or filter, so it requires caution.




## 4. Most Common Word

 Return the most frequent word that is not *banned*. We do not distinguish uppercase and lowercase letters and ignore punctuations (periods, commas, etc.)





```python
#Input:
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
```


```python
#Output:
"ball"
```

### Solution 1 List comprehension, Using Counter object

There are both upper and lower cases as well as punctuations such as a comma in the input. Therefore, we need to 'preprocess' the input value with a method called data cleansing. We can use regular expressions to make it easier to make the process easier.


```python
words=[word for word in re.sub(r'[^\w]', ' ', paragraph).lower().split() if word not in banned]
```

\w in regular expression refers to word character and ^ means not. As a result, the above regular expression substitutes all characters that are not word characters into blanks.

Moreover, the conditional for the list comprehension only considers words that are not included in 'banned.' Therefore, a list of words excluding lower case, punctuation, and 'banned' are saved in 'words.' Now, lets cound the number of each words as the following.



```python
counts = collections.defaultdict(int)
for word in words:
  counts[word]+=1
```

Here, we set the variable that holds the number of words as a dictionary, and to automatically use int as default using defaultdict(). Therefore, we can process counts[word]+=1 without checking if a key exists.


```python
return max(counts, key = count.get)
```

We retrieve the key with the largest value from the dictionary variable, counts. Thus, this acts the same as argmax from math. However, Python's basic type does not support argmax. Numpy which is a scientific calculation library supports this well, but unfortunately, we cannot use any external libraries during coding tests. Therefore, we could go around by assigning a key to the max() function to retrieve argmax. Processing the number of words can be done more neatly using the Counter module.

The following code retrieves the first value of the most common word from 'words' with most_common(1). The input from the question would give [('ball',2)] and using [0][0], we can finally get the key of the first index. THe extracted key, 'ball,' is the most frequent word, so we return this value.



```python
counts = collections.Counter(words)
return counts.most_common(1)[0][0]
```

As such, it was quite easy to realize using the Counter object, and to sum up, the code is as the following.


```python
def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
    words = [word for word in re.sub(r'[^\w]', ' ', paragraph).lower().split() if word not in banned]

    counts = collections.Counter(words)
    return counts.most_common(1)[0][0]
```

## 5. Group Anagrams

Given an array of strings, group the anagrams together.


```python
#input
["eat","tea","tan","ate","nat","bat"]
#output
[["bat"],["nat","tan"],["ate","eat","tea"]]
```

### What is an Anagram
Anagram is a type of pun, rearranging the letters of a word to change it to a word with another meaning. In Europe, such play was very popular. 애너그램의 우리말 예로는, '문전박대'를 '대박전문'으로 바꿔 부르는 단어 등을 들 수 있다.

### Solution 1 Sorting and Adding to DIctionary

The best way to determine if a word is an anagram is to sort and compare. This is because if we sort the anagrams, they return the same value. sorted() runs well on strings and returns the result in a form of list, and we compose a dictionary that uses these values as keys using join(). The anagrams share the same key, so it would have to be in a form of append(). Fyi, Python's dictionary is a key/value hash table datatype as we've seen in chapter 5.


```python
anagrams[''.join(sorted(word))].append(word)
```

As such, we use the sorted values as keys and append it to the dictionary. If we try to insert an an existing key, it returns a KeyError, so we have to define it using defaultdict() to prevent the error so we would not have to go through the hassle of checking the existance of a certain key every time. This makes the code more simple.


```python
anagrams = collections.defaultdict(list)
```

To sum up, we can come up with a simple solution as the following.


```python
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
  anagrams = collections.defaultdict(list)
  
  for word in strs:
    anagrams[''.join(sorted(word))].append(word)
  return anagrams.values()
```

### Many Ways to Sort

Python provides an inherent sort function. We will deal with sort in detail in chapter 17, so we will look into how Python sort functions work instead of the sort algorithm itself. We will look into Timsort, which is not the normal sort algorithm we deal with in the academia, but is a high-functioning sort algorithm that started in Python. We will set what we discuss here as a baseline to explain sorting methods in the following chapters. This is an example of sorting a list using sorted() function.


```python
a = [2, 5, 1, 9, 7]
sorted(a)
```

Of course, it sorts lists well and it could also sort strings as well. 


```python
b = 'zbdaf'
sorted(b)
```

It returns the alphabetically sorted list of the string zbdaf, ['a', 'b', 'd', 'f', 'z']. If we want to merge it back into a list, we can use join() as the following.


```python
b = 'zbdaf'
"".join(sorted(b))
```

Other than a a separate sorted() function, list datatypes provide a sort() method, whjich can be used to sort a whole list. This is called an in-place sort. Normally an in-place sort overlaps an input with the output, so no additional space is required and there is no returned value. Therefore, it requires caution as it is different from sorted() which returns the sorted result.


```python
alist.sort()          #sort() does an in-place sort on a list itself
alist = blist.sort()  #wrong phrase
                      #sort() function returns None, so it needs caution
```

sorted() can be used with a keys option to assign a key or a function to be used for sorting. The following code is a function for sorting,a nd the function for sorting ahas been assigned to len, used to get the length of an attribute.


```python
c = ['ccc','aaaa','d','bb']
sorted(c, key = len)
```

In this case, it is sorted not alphabetically, but in the order of length.

Let's look more into using a function to define a key. The following uses a function to sort from the first string(s[0]) to the last(s[-1]).


```python
a = ['cde','cfc','abc']

def fn(s):
  return s[0], s[-1]

print(sorted(a,key=fn))
```

If we used just sorted(), c is the same, so we would compare the next string d and f which would return in the order of ['abc','cde','cfc'].

If we use lambda, we can do it in a single line withoud defining a separate function. This is a method we looked through in the 'lambda expression' box before.


```python
a = ['cde','cfc','abc']
sorted(a, key=lambda s: (s[0],s[-1]))
```

### Sort algorithm and timsort

The most popular sorting algorithm is Merge Sort designed by John von Neumann. In most cases, quick sort is faster but the variance is large according to the size of data, but merge sort is equally O(nlogn) and is preferred because it is a Stable Sort. 
What algorithm does Python's sorted() use?
Python uses Timsort. Timsort is based on an a paper published in 1993 by Tim Peters and Peter Mclorry and is a algorithm built by C to be used for Python in 2002. It is called Timsort following the founder's name, Tim Peters. Timsort does not aim to become a delicate algorithm to be accepted in the academia, but instead assumes that 'most data would be already mostly sorted' and is built to show high performance on actual data. This is because it is assumed that most data are rarely messed up all over. Timsort is not a single algorithm, but mixes insertion sort and merge sort heuristically at the right place. In most cases, it is faster to use Python's sort algorithm.This is because it uses Timsort proper for the actual data and it is carefully written in a low level language as a Python's built-in function. Therefore, if there is no other restriction, it is fastest to usePythons built-in function for highest speed.
Such practical, highly functioning Timsort affected Java. Java's array. sort() has been using an enhanced version of merge sort designed by Joshua Bloch, who wrote the famous 'Effective Java.' As Timsort started to gain popularity, Java started potting it. Afterwards, Timsort was discovered to show up to 25 times faster speed, so when Jave 7 was released, it became an official sorting algorithm of the Java collection. Timsort is currently widely being used not only in android but Google Chrme, and Apple Swift.
Meanwhile, the GO commuinity rejected Timsort due to its space complexity as it is based on merge sort, requiring at least an additional O(1/2*n) memory space

As shown in table 6-2, Timsort outmatches other algorithms in terms of time complexity. Quick sort is a fast algorithm, but at the worst case, it could be O(n^2). Merge sort shows consistant speed, but cannot go faster than O(nlogn)
As such, other algorithms stay at the asymtotic lower bounds of Ω(nlogn) while timsort otimizes the results supposing that the 'actual data would already be mostly sorted.' In theory, no algorithm can be faster than Ω(nlogn) if it makes more than one comparison. However, timsort skips the comparison for the already sorted cases, which makes it possible to reach Ω(n).

Until now, wer took a look on Python's sorting algorithms and the high-functional Timsort. In fact, timsort is actually the most widely used algorithm outmatching merge sort and quick sort. Unfortunately, noone seems to ask this sort of question at an interview. As it is an algorithm that emerged at the field rather than the academia, it is not dealt with in the popular bibles of algorithm, and the recent sorting algorithms are not well known to the interviewers and the interviewees unless they are experts of the field.

Here, we will end the description about Timsort at this point, but we recommend that the interested readers find out more deeply about Timsort. It is to keep in mind that Python, based on Timsort can quickly sort actual data and this has affected development languages such as Java and Swift, and even affected platforms such as Android and Chrome.

## Longest Palindrome Substring

Pring the longest palindrome substring.


```python

```
