# 파이썬 알고리즘 인터뷰 3장, 파이썬에 관하여
                    
# Chapter 3 Python

Often, the most incredible brainchilds of hackers are created right after Christmas. In December 1989, Guido Van Rossum, a computer scientist from the Netherlands, now in his mid-thirties, struggled due to the limitations of diverse programming languages. He decided to create a new language as his Christmas project.

The rules to keep were simple. First, it should be easy to read. Neat indents made by blanks replaced braces that would bind the codes. Second, the user should be allowed to create a module package as he wishes and apply it to another program. The language continued to develop on this basis,  first through easy_install and finally providing package index through pip which eventually affected numerous other languages. Third, it needed a peculiar and mystic name. The language was named after Monty Python, a prominent comedy group in England in the 70s.

##수정중

About thirty years have passed since then, and now, Python has become one of the world's most popular programming languages. Above all, the grammar is elementary, which is why this language is recommended firsthand for beginners. Therefore, the language is also called 'Executable Pseudocode.' A pseudocode is not supposed to be operating, and only the algorithm should be described, but Python is simple enough to describe just the algorithm and is operational. Moreover, Python is widely used in the field, although it is a recommended language for beginners. On the list of most popular programming languages on Stack Overflow investigated by the question ratio, Python has continuously stayed on the top list and now stands up to the first place, like image 3-2. From this, we can see how popular Python has become.

In my previous workplace, the Kakao NLP processing team, and at my current job at Hyundai AI research lab, Python is used as one of the main languages for R&D. In the past, 'Basic,' which was a language for beginners could not be put to actual use once the person left the computer academy. However, Python is learned in elementary schools on the one hand and is used for publishing papers for world-class journals by computer science professors on the other. Indeed Python is doing what all existing programming languages have never achieved.

## Understanding Python

This book will cover Python in extreme detail by solving coding test problems. Suppose you choose a particular language for your coding test. In that case, you must understand the detailed structure of the language to correctly, swiftly, and accurately solve the problem. You must be familiar with basic grammar to do well on the coding test.

Moreover, knowing just a part of it is more dangerous than not knowing. Suppose you think that dictionaries (covered in Ch 5) always maintain the order of input (only possible on version 3.7 and above). In that case, you might waste your time with the wrong results and will not be able to solve the problem within the given time. Time waste mainly comes from what we do not fully understand. Of course, many argue that language is merely a tool. Still, even the most straightforward tool requires an understanding of how to use it effectively. Giving a chainsaw to a person who cannot even use a saw won't help at all in chopping down the tree.

In this book, we will take a close look at Python along with problem-solving and will cover it in more detail than in ordinary Python books. However, the contents will be limited to built-in libraries, data structures, and algorithms. It is not too much, so you don't have to be afraid of it at this point. We will only look to the degree of providing the optimal solution. For example, Numpy is accepted as a standard library of Python, but since it cannot be used in coding tests, it will not be covered here as, well. Object-oriented programming as well will not be covered in this book.

This book is based on CPython, which is an official interpreter of Python. There are plenty of splendid interpreters like PyPy, but we will limit the boundaries to the official interpreter. The Python version we will be using will be py 3.7. At times, we will look into the inner structure of CPython to accurately understand the principles.


##Python Grammar

From here, we will understand the characteristics of Python by looking through the advanced grammar of Python, which will bring up your development skills one step further. You may miss although you have an understanding of basic Python grammar. Keep in mind the characteristics that are introduced here. You will be able to increase your productivity at the coding test.

### Indent

Indent, which is one of the representative characteristics of Python, follows the official guide PEP 8 to be set as four blank spaces.

**PEP(Python Enhancement Proposals**

Python programming follows the PEP process. The PEP process refers to the primary development process of Python that proposes new functions and collects the public opinion on communities to document Python design. The indices of PEP start from 0 and goes on, following the form 3XX and 4XX according to a particular rule. For example, numbers 1 to 15 are meta PEPs. These are PEPs about PEPs, and PEP 8, a coding style guide, belongs to this section. Other than this. PEP about Python 3.0, which is a PEP about Python 3000, is called PEP 3000. The proposals related to Python version 3 all start with 3XXX. 
You can find out the complete list of PEPs in https://www.python.org/dev/peps

The four-space indentation is also a rule for Google's Python guideline. Of course, as Python always does, this is not mandatory and can be done freely according to the user's choice. In the past, it used to be recommended to use tabs o two indents, but after PEP 8, people followed the rule of four spaces. Other than this, there are these following standards in PEP 8. 




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

if the code is divided into multiple lines, we add an indent to distinguish it from other lines.

It is not easy to consider all these methods and distinguish things. The best way is to use great development tools such as PyCharm community edition(https://www.jetbrains.com/ko-kr/pycharm/downlloads/) like image 3-3.

**그림 3-3**

If you use pycharm, it automatically follows the coding guide even if you don't pay attention to it. Or you can use PyCharm's Reformat Code to automatically fit the code to PEP 8 Standards, so it is highly convenient. Using tools like PyCharm to solve online coding tests will help solve problems according to the coding guide.

### Naming Convention

The variable naming convention, unlike Java, follows Snake Case, which separates each word with an underscore(_). The same goes for function names as well. There are situations where problems submitted for coding tests do not follow the rule. However, you still have at least to keep the names of variables and functions lowercase if it is written by yourself.

Python is highly proud of its 'Pythonic Way,' so it refrains from coding following the Camel Case or in Java style (Unlike Python, Java follows the Camel Case where a single capitalized letter separates each word). All variables in this book follow the Snake Case without exception. When you code with Python, follow the Snake Case as default, and if the interviewer asks a question about this, you must be able to answer that you prefer snake coding following Python's PEP 8 and its philosophy. Again, if you use a great IDE such as PyCharm, an error appears if a particular name does not follow the standards, so it is more convenient.




```python

```

**Camel Case, Snake Case**
Camel Case is named after its form, which resembles a camel. Upper-case and lowercase letters separate each word in this format, which is a typical Java format. Interestingly, the first letter of each word starts with a capital, but the first letter of the first word begins with a lowercase. If the first letter of the first word starts with an upper-case as well, then this is called the Pascal Case.

Snake case comes from its snake-like shape and distinguishes each word with an underscore. Most of the time, the letters are lowercase, but at times, the first letter may be in upper-case. According to research, the Snake case was recognized more quickly than the Camel case. Python recommends a naming convention following the Snake case through PEP8


```python
#Camel Case
camelCase: int = 1
#Snake Case
snake_case: int = 1

```

### Type Hint

It was briefly mentioned in Chapter 2 that although Python is a representative interactive typing language, a Type Hint that could determine the type was added to the PEP 484 document. This function can be used in Python version 3.5 and over. Cpython's typing.py clearly states the types that can be defined, and the types can be defined through the following format.


```python
a: str = "1"
b: int = 1
```

For instance, the previous Python function that does not use type hint was defined as the following

```python
def fn(a:)
...
```

It does have the advantage that the function can be quickly defined, but there is no clue what to input in parameter a, whether it is a number or a string, and we need to know what the dictionary would return. Later on, as the scale of the project becomes more significant, it becomes a primary cause of bugs, such as inputting a string in the parameter when you are supposed to put in a number. Let's look through the following code.


```python
def fn(a: int) -> bool:
...
```

With such a type hint, you can clearly state that the parameter a of the function fn() is an integer and that the return value would be True or False. The readability increases with a clear definition as above, and the bug becomes less probable. Of course, since this is not an obligation, diverse values can be allocated, so we must be cautious. Therefore, you must avoid assigning an integer to a string as follows.


```python
>>> a: str = 1
>>> type(a)
```




    int


A coding test is usually composed of a short algorithm, and the required type does not need a specification. However, if you allocate the class to make the code easily readable in the problem-solving process, the interviewer would likely give more credit.

In an online coding test, you can use mypy to automatically check if there are any errors in the type hint, so you can proofread your codes before submitting it. mypy can be installed through pip like as the following


```python
$ pip install mypy
```

For codes with incorrect type hints, it will return an Incompatible return value time, and an error will occur for you to check and fix your code.


```python
$ mypy solution.py
```

### List Comprehension

Python provides functional features like map and filter, and at the same time supports lambda expressions as the following

```python
list(map(lambda x: x+10, [1,2,3]))
```




    [11, 12, 13]



Java started supporting lambda expressions in its 8th version released in 2014, but Python has supported lambda since its 1.0 version in 1994, having a longer history. However, the far more convenient feature of Python is its list comprehension. List comprehension is a method that creates a new list based on an already existing list. It has been supported since Python2.0 and is a characteristic of Python which referenced functional languages like Haskell. In "Effective Python 파이썬 코딩의 기술(길벗, 2016)" chapter 1, 'Pythonic Thinking,' there is a phrase that goes 'Better way 7: use list comprehension instead of map and filter. As such, list comprehension is used effectively in numerous ways and is much easier to read compared to lambda expressions incorporating map and filter.

The following is a list comprehension that multiplies two if the number is odd.


```python
[n * 2 for n in range(1, 10 + 1 ) if n % 2 == 1]
```




    [2, 6, 10, 14, 18]



Without list comprehension, the code must be in the following stretched-out form.



```python
a = []
for n in range (1,10+1):
  if n%2 == 1:
    a.append(n*2)
a
```




    [2, 6, 10, 14, 18]



The code became much longer than list comprehension, and a variable had to be created. The lines of code have increased a lot. Of course, list comprehension can also be applied to those other than lists. Since version 2.7, list comprehension in a dictionary and different types became possible. 


```python
a = {}
for key, value in original.items():
  a[key]=value
```

The code shortened into the following


```python
a = {key:value for key, value in original.items()}
```

The simple one-line code using list comprehension(or dictionary comprehension, for this case) is relatively easy to read. Still, you should be aware not to make it overly complicated since it will also become challenging to understand. Typically, expressions should not exceed two.


### Generator

The generator is an old Python function added in Python version 2.2 in 2001. It is a standard form that can control the iteration of loops. For example, let's say we write a program that makes and calculates a hundred million numbers according to a particular rule. In this case, without a generator, we should have somewhere in memory the hundred-million numbers. However, if we use the generator, we can only create a generator and make the numbers whenever needed. The gap will be much more significant if about a hundred is used out of the hundred million.

You can use the yield expression to return a generator. A function returns a value and closes if we use a return expression. However, if we use yield, the function returns the weight up to the point of the expression and continues to be processed until the end of the function. Of course, in the following code, since there is no ending condition for while True, the function can continue to return values


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

#수정중
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
