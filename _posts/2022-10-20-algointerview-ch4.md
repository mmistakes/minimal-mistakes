---
layout : post
title : "This is the first post"
---

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
