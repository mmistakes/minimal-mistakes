---
title: "Advanced functions"
excerpt: "You will learn more about functions"
toc: true
toc_sticky: true
---

<script src="https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js"></script>
<script>addBackToTop()</script>

- [1. Function basics](#1-function-basics)
- [2. No `return` functions](#2-no-return-functions)
  - [2.1. NoneType](#21-nonetype)
  - [2.2. `return None`](#22-return-none)
  - [2.3. Function without `return`](#23-function-without-return)
- [3. Global Variables](#3-global-variables)
- [4. Keywords & Default parameters](#4-keywords--default-parameters)
  - [4.1. Keywords](#41-keywords)
  - [4.2. Default parameters](#42-default-parameters)
- [5. Arbitrary Number of Arguments](#5-arbitrary-number-of-arguments)
- [6. A Function in a Function?](#6-a-function-in-a-function)
  - [6.1. Recursion](#61-recursion)
  - [6.2. A Function in a Function](#62-a-function-in-a-function)
- [7. Exercises](#7-exercises)
  - [7.1. Ex. 1 (1 point)](#71-ex-1-1-point)
  - [7.2. Ex. 2 (1 point)](#72-ex-2-1-point)
  - [7.3. Ex.3 (2 points)](#73-ex3-2-points)
  - [7.4. Ex.4 (3 points)](#74-ex4-3-points)
  - [7.5. Ex.5 (3 points)](#75-ex5-3-points)
- [8. Appendix](#8-appendix)
  - [8.1. Syntactic Sugar in Python](#81-syntactic-sugar-in-python)
  - [8.2. Useful hyperlinks](#82-useful-hyperlinks)


---
---

## 1. Function basics 
In this module, you will learn more information about Python functions. Up to this moment you should know how to define a function, as well as how the function construction looks like. So far, you have defined a function like this:

```python
def my_function(a,b):
    ...
    body
    ...
    return sth_to_return
```
where `a,b` are function parameters. During function execution, those are called arguments. 

---
---

## 2. No `return` functions
### 2.1. NoneType
Similarly like in English, there is a way of saying "nothing" in Python. There is a specific object, the `None` object, which in Python means "nothing". `None` is not the same as `0`, `False` or empty string are all not the same as `None`. While making a logical comparison using `==` we would get `False` each time. Let us see:

    None == 0

After executing this line you get the following output:

    False

`None` is a specific object of type `NoneType` which is simply used to say nothing to Python. It is widely used as a function's return value in cases when we want to indicate the absence of a result.

### 2.2. `return None`
So far, if you wanted to write a simple `add(a,b)` function you would have done it like this:

```python
def add(a,b):
    return a + b
```
In the above example, we have defined the `add(a,b)` function, which returns the sum of the `a,b` parameters. When we call this function, it follows:  

    A = add(1,2)

the function will return `3` which will be assigned to variable A.
But sometimes we want our function to display some information or value on the screen instead of returning a specific value. In this scenario we may define our function with `print()` inside and with `return None` so that our function won't return any value. Let us call it `add_print(a,b)`, and write it like this:

```python
def add_print(a,b):
    print(a + b)
    return None
```
Now when we call `add_print(1,2)` we will see `3` on our screen, but when you execute it like this.  

    A1 = add_print(1,2) 

a `None` value will be assigned to the `A1` variable. So, take into consideration what you want to obtain from a function that you are executing.  

### 2.3. Function without `return`
In fact, because the situation when there is no result happens quite often in programming life, in Python you do not have to write `return None` if you want the function to return `None`. We can simply skip the `return` statement and the function will return `None` by default:

```python
def add_print(a,b):
    print(a + b)
```

The function above works exactly the same as in previous example: prints `3` on screen for `A1 = add_print(1,2)` and assigns `None` to variable A1.  

---
---

## 3. Global Variables
As far as you know, the variables defined outside a function are visible inside the function; you can easily use those variables inside the function. But in fact, you cannot modify those variables. To do so, we have to define a variable with the `global` keyword. Using `global` allows one to modify inside the function, a variable that was not defined inside the function. Below you may find a sample example of using a `global` inside a function.

```python
def glob_var():
    global a
    a, b = 20, 30
    print(a,b,c)
```
Let us see how this function works. We define variables `a, b, c ` with the numbers `1, 2, 3` , and then we call our function. 

    a, b, c = 1, 2, 3
    glob_var() 

Probably, as you are assuming, we should see `20, 30, 3` where each number corresponds to `a, b, c` realistically inside a `global_var()` function.
    
    20, 30, 3

But what values are assigned to our variables inside the whole Python program? We can simply see it with the `print(a,b,c) `

    print(a,b,c) 

Interestingly, we see a different output than the one from the function. The value of `a` variable was only modified, and the rest of our variables were unchanged, even though the function has assigned a value of `30` to `b` variable.  

    20, 2, 3

The `c` variable is used here to show how the local variable is treated inside/outside the function body. As you could have seen, the value of `c` was always equal to `3`. Treat it like a control sample. 

A conclusion of this part is that you have to be aware of `global` and `local` variables. The inaccuracy of this might be a source of code bugs. 


---
---

## 4. Keywords & Default parameters

### 4.1. Keywords
**Keyword arguments** allow you to pass arguments to the function in any random order, as long as you specify the keyword to which the value goes.
Let us try to perform a simple test:

```python
def greeting(person1, person2, word):
    return "{0} says {1} to {2}".format(person1,word, person2)
```
---
`.format()` is a method of string, which helps handling complex string formatting. This method puts the value provided in `.format(value)` into a `{}` written in a string sentence. The value can be: integer, float, string, character or a value. More information about this method and similar are explained in the next module.

---

Normally you would probably call this function like this `greeting('Mark', 'Tom', 'Hello!')`. It's perfectly fine, you will get the desired behavior. But there is also another way of calling this function which you might find much more explicit:

    greeting(person1='Mark', person2='Tom', word = 'Hello!')

The obvious advantage of this approach is that you explicitly see which arguments correspond to which parameters. It's easier to understand what is their purpose. But there is also another reason - if you name the arguments during the function call, you can specify them in any order you want:

    greeting(word = 'Hello!', person1='Mark', person2='Tom')

Check this out and you will see that you get exactly the same result. Try to do this without naming the arguments and see what happens.

### 4.2. Default parameters
During function definition, there is a possibility of providing default parameter values. Thanks to this method, these already defined parameters become optional arguments during the execution of the function. This means that you will not have to provide them if you do not want to. <ins> The right order of parameters inside the function definition is crucial </ins>. During the definition of a function **firstly**, you **have to** provide non-default parameters. Then you **can** provide default parameters, but you **do not have to** if the default values are ok for you. Below arguments `a` and `b` are non-default parameters and `c`, `d` and `e` all have a default value.

```python 
def my_function( a, b, c=2, d = 'dog', e = [1,2,3]):
    ...
    body
    ...
    return sth_to_return 
```
This means that whenever you call a function `my_function(...)` you have to specify at lest 2 arguments `a,b`, the remaining 3 are optional. 
You may see that we have defined a function `my_function( a, b, c=2, d = 'dog', e = [1,2,3])`,where `a,b` are non-default parameters with which you are familiar with, the defined one are as follow: `c=2`, `d = 'dog'` and `e = [1,2,3]'`.  

Now, we have a look at some basic examples of the use of defined parameters.
Let us take a closer look at what the money exchange platform may look like. For example, let's say you want to exchange some amount `X` of PLN into EUR. Typically it works like that is some exchange rate value, which is typically provided by the Bank. The exchange point or platform is using this rate, but to make some profit on it, some spread is also applied during the exchange process. So in the end, one will obtain less money than it should be from simple division of the PLN amount by the PLN/EUR exchange rate. A simple math formula representing this operation is defined in `exchange_rate(amount, rate=4.75, spread=0.05)`.    

```python 
def exchange_rate(amount, rate=4.75, spread=0.05):
    return round((amount / rate) * ( 1 - spread),2)
```
As you may see, the `amount` parameter is not default, because each 'customer' will want to exchange a different amount of PLN. Typically, for some short period of time, the exchange rate `rate` is constant. Let us assume that it is equal to `4.75`. The spread of an exchange point or platform is also typically constant and changes very rarely. So, for example, if you want to exchange **2137 PLN** you may just simply call a `exchange_rate(2137)` and the function will return you **427.4 EUR**.

You may wonder how you can change the default parameters. This is very simple and quite intuitive. Let us try to do this - try to execute the following command and see what is the result of the `exchange_rate(...)`

    A = exchange_rate(100, 10, 0.01)
    B = exchange_rate(100, rate=10, spread = 0.01)
    C = exchange_rate(100, spread = 0.01, rate=10)
    D = exchange_rate(1000, 5)
    E = exchange_rate(1000, rate=5)
    F = exchange_rate(2137, spread = 0.01)
    
After executing these examples, you should see that `A = B = C` and `D = E`. When you look closer, you may see that there are at least five different possibilities to call `exchange_rate(...)`. As mentioned before, you should always first provide non-default parameters in correct order. Then you may provide default parameters.

For instance, if you do it like in the example below,

    exchange_rate(spread = 0.01, 2137)

Python will prompt you with such an error:
    
    SyntaxError: positional argument follows keyword argument
    
This error means that you wanted to specify a default argument before the non-default argument, which is wrong. 

---
---

## 5. Arbitrary Number of Arguments
Up to this moment we were using functions which had predefined number of parameters. You know that during the function call you do not always have to provide all arguments; some of the arguments might have been default parameters. A big advantage of Python is the fact that you may define a function without specifying how many arguments it will tak. You may do it with two different types of arguments:

* *args - Non-Keyword Arguments
* \**kwargs - Keyword Arguments

The use of `* (asterix) ` is necessary to allow the function to accept any number of parameters. In the case of `**` the second asterix allows one to pass keyword arguments.  

As an example, you may think about function which multiplies all of the numbers provided as arguments. The number of arguments is not specified beforehand. Such function may look like:

```python
def multiply(*numbers):
    result = 1
    for n in numbers:
        result = result * n
    return result
```
By calling `multiply(2,4,5)` we will get the result of multiplying 3 numbers - `40` in this example. However, if we call `multiply(10, 7, 2, 5)` 4 numbers will be multiplied.

In the `** kwargs` approach the arguments are keywords, and so they must be named during function call. We may simply define a `calling(...)` function which prints the value of a key and its assigned value.  

```python
def calling(**numbers):
    for key, value in numbers.items():
        print("{0} == {1}".format(key, value))
```

    calling(one=1, five=5, three=3, two=2, four=4)
The function is not very complicated, but you should carefully study the syntax necessary to obtain the correct result.

    one == 1
    five == 5
    three == 3
    two == 2
    four == 4

Familiarity with the syntax of `* args, ** kwargs ` is necessary to be able to read the Python documentation. Such syntax is present in most of the matplotlib functions ( a library that allows one to create plots). Have a look at one of the simplest functions for plotting:

    matplotlib.pyplot.plot(*args, scalex=True, scaley=True, data=None, **kwargs)
   
An example function call for `plot` looks like this:

    plot(x, y, color='green', marker='o', linestyle='dashed', linewidth=2, markersize=12)
    
If you wish, you can verify on your own what this command does. 

---
---

## 6. A Function in a Function?

### 6.1. Recursion
>Recursion (adjective: recursive) occurs when a thing is defined in terms of itself or of its type. Recursion is used in a variety of disciplines ranging from linguistics to logic. The most common application of recursion is in mathematics and computer science, where a function defined is applied within its own definition. While this apparently defines an infinite number of instances (function values), it is often done in such a way that no infinite loop or infinite chain of references ("crock recursion") can occur.
><cite> <href>https://en.wikipedia.org/wiki/Recursion
    
You may identify the recursion with the function that is calling itself inside its own body. Typically, the number of calls inside a function is limited by some condition or the number of self-calling is set to some constant value. One of the simplest examples of recursion might be the sum of all numbers before a given one. For example, if we want to sum all numbers up to `4` we will have to add `1+2+3+4` and the result will be `10`. Typically, you may do it using a while loop:
    
```python
def sum_all_numbers(number):
  result = 0
  i = 1
  while i <= number:
    result = result + i
    i = i + 1
  return result
```
    
But this procedure might also be written in a recursion function. Below, you might find an example of `sum_all_numbers` which is doing exactly what we did before without using a `while` loop. 
    
```python
def sum_all_numbers(number):
  if number > 1: # condition of function execution
    return number + sum_all_numbers(number-1)
  else: return 1 # 'emergency exit' for summing 0 or negative values
```
Following the example from the text before you may run `sum_all_numbers(4)` to see that the result is 10.
    
    sum_all_numbers(4)
    
    10
    
How does it work? Well, if you think about it, the sum of all numbers smaller or equal to `4` is the sum of all numbers smaller or equal to `3` plus `4`. In other words: `sum_all_numbers(4) = sum_all_numbers(3) + 4`. So, if you already know the answer for `sum_all_numbers(3)`, you can just plug it in and the result is ready. But how do you know the result of `sum_all_numbers(3)`? Well, you can apply the same reasoning to get `sum_all_numbers(3) = sum_all_numbers(2) + 3`. We can do it over and over again to finally reach `1`, where the answer is simple: `sum_all_numbers(1)` is equal to `1`. This is when we start going back up. `sum_all_numbers(2) = sum_all_numbers(1) + 2`, so it is equal to `3`. Then `sum_all_numbers(3) = sum_all_numbers(2) + 3`, so it is equal to `3 + 3 = 6`. Finally `sum_all_numbers(4) = sum_all_numbers(3) + 4`, so the final result is `6 + 4 = 10`. Of course the same reasoning stands for any argument `number` which is bigger than `1`, i.e. `sum_all_numbers(number) = sum_all_numbers(n) + number`. 

The `1` case is called the base case, when you know the answer by default. In general there might be more than one base case. Python does not need recursion when considering base cases. The other cases are general cases - they do not provide you with an answer, but rather with a receipt how one can get the answer.
    
### 6.2. A Function in a Function
In the previous section you have learned that in Python a function can call itself inside its body. In general a function can call any other function in its body. Even more - you can create functions inside other functions and return them as a result! This is very useful when you want to have one big function that is responsible for various operations. Inside this large function, you may call a lot of smaller functions that are necessary for the whole procedure.  

Imagine that you want to create a simple calculator which can calculate the sum, difference, product and quotient of two arguments `a, b`. You do not need to call each function separately; you are just providing two arguments and the name of operation. Such a function, `math_operation(name)`, is easy to write.     
```python
def math_operation(name):
    if name == 'sum':
        def f(a,b):
            return a + b
    elif name == 'diff':
        def f(a,b):
            return a - b
    elif name == 'multi':
        def f(a,b):
            return a * b
    else:
        def f(a,b):
            return a / b
    return f
```
As you may see, a function above has only one parameter `name`. All logical conditions are related to the `name` parameter. The function compares this parameter with names of 3 operations('sum'- sum, 'diff'- difference, and 'multi'- product) and chooses the right operation. If the `name` is different from given 3 a quotient is calculated. 

Now, if you call this function and save the result in a variable you will get... a function!

```python
s = math_operation('sum')
type(s)
```

You can now call this function in the same way you would call any other function. By using its name (`s`) and providing appropriate amount of arguments (in this case 2):
    
    s(13, 9)
    
You might wonder why would you need something like this. Isn't it easier to just write `13 + 9` for sum, `13 * 9` for product, and so on and so on? Well, in this case of course it is. But imagine you are writing a more sophisticated calculator, when a user can for instance add both numbers or tables of numbers. They can then first specify, what operation they want to perform and, for instance, if they choose tables case you will display a pleasant table fill-in form for them to use. You can get this behavior using the method above! The code will be longer and more complicated; you will need some knowledge of display methods. But the general idea - that your function will generate another function - will be the same.
    
We can also use the result function without storing it in a variable:

    math_operation('sum')(13,9)
    
Since `math_operation('sum')` part is a function, we can provide it with arguments - the so called inner arguments. In this case those are `13` and `9`. 
    
There is one more way a function can be used in another function. It can be passed as an argument. This usually happens when we have a function for some general case, but for some reason we need to use it many times in some specific case. For instance, if we have two functions:

    def add(a, b):
        return a + b
    
    def multiply(a, b):
        return a * b
    
we can define a general function:
    
    def perform(operation, a, b):
        return operation(a, b)
    
which we can then execute to compute either sum or product:
    
    perform(add, 7, 8) # compute sum
    perform(multiply, 7, 8) # compute product
               
## 7. Exercises

### 7.1. Ex. 1 (1 point)
Your task is to create a `factorial_recursive(x)` function that calculates the [factorial](https://www.britannica.com/science/factorial) of the number provided. Use recursion. To check if your function generates correct results you can use `factorial_iterative(x)` which is also calculating the factorial of provided number but uses a for loop:
    
```python    
def factorial_iterative(x):
    result = 1
    for i in range(1, x + 1): result *= i
    return result
```
    
### 7.2. Ex. 2 (1 point)
Finding the greatest common divisor should have been a simple exercise during your high school education period. You are probably familiar with the operation done on a piece of paper. However, you are not familiar with what this algorithm looks like in Python. Your task is to write a `gcd(a,b)` function which will return the greatest common divisor of `a,b`. Write this function in a recursion manner.
    
### 7.3. Ex.3 (2 points)
Create a `apply_function(list, function)` taking a list of strings as the first parameter and a function as a second parameter. The function is then applied to each string to get a value. The final result of the `apply_function` is a list with all obtained values - in the same order in which the strings were present in the original list. E.g.
    
    apply_function(['mateusz', 'is', 'boring'], len)
    
should return `[7, 2, 6]`.

### 7.4. Ex.4 (3 points)
Check out again the `math_operation(name)` example. Then rewrite this function without using `if` conditions, so that new function `math_operation(option, a,b)` which expects 3 arguments: `option` - name of math operation to perform, `a,b` - integer values. This function returns result of given math operation. Use the provided math functions, `option` name in comment section.  
    
```python
def summation(arg_1,arg_2): #'sum'
    return arg_1 + arg_2
def multiplication(arg_1,arg_2): #'multi'
    return arg_1 * arg_2
def subtraction(arg_1,arg_2): #'diff'
    return arg_1 - arg_2
def division(arg_1,arg_2): #'div'
    return arg_1 / arg_2
def to_power(arg_1,arg_2): #'pow'
    return arg_1 ** arg_2
```
### 7.5. Ex.5 (3 points)
The [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number) is one of the most popular examples of an approximation of the golden spiral. You have probably heard about this in your high school. The mathematical formulas for this sequence are as follows:

$F_{0} = 0, F_{1} = 1$

and
    
$F_{n} = F_{n-1} + F_{n-2}$ for $n > 1$
    
Your task is to write a `fib(n)` function, where `n` is a parameter that indicates the number of the desired term 
of the Fibonacci sequence. Also, you have to count all the functions calls. This function returns tuple with two values:
1st - the Fibonacci number, and 2nd is the number of function calls. 

Sample `fib(n)` call:

    fib(6)
output:
    (8, 13) 

## 8. Appendix
### 8.1. Syntactic Sugar in Python
It is typical to use abbreviations in daily life, so why don't we use some while coding in Python? Simple math operation might be shorten in following syntax:

```Python
a += 1  # equivalent to a = a + 1
a -= 1  # equivalent to a = a - 1
a *= b  # equivalent to a = a * b
a /= b  # equivalent to a = a / b
a %= b  # equivalent to a = a % b
a **= b # equivalent to a = a ** b
a //= b # equivalent to a = a // b
```
Try to get familiar with this syntax and use it frequently ;) 
    
### 8.2. Useful hyperlinks

    https://www.toppr.com/guides/python-guide/references/methods-and-functions/function-argument/python-function-arguments-default-keyword-arbitrary/
    
    https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html#matplotlib.pyplot.plot
