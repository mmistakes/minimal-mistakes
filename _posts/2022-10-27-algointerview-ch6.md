## Chapter 6, String Manipulation

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

Print the longest palindrome substring.

Longest Palindrome Substring

예제 1
예제 2

Solution 1. Expanding from the center

There is a classic computer science problem called "Longest Common Substring." We must find the longest common substring among the multiple input strings, a traditional problem we could solve through dynamic programming. However, it is hard to understand the solution that uses dynamic programming intuitively, and the operation speed is slow, unlike common expectations. Here., we will be using a two-pointer expanding from the center, which is much more effective and intuitive. Based on the notion that all we have to do is to determine if an input is a palindrome, let's create an algorithm that detects the longest palindrome.

그림 6-3 전진하는 2개의 투 포인터

The logic is simple. As can be seen in the image, two-pointers that take up two spaces and three spaces each move forward like a sliding window. Here, if the string that enters the window is a palindrome, the pointer stops and continues to expand. A palindrome could increase by even numbers in cases such as "bb" or odd such as "bab". Therefore, examining both even and odd cases is necessary. In image 6-3, we can see that bab is detected as the answer immediately.

그림 6-4 중앙을 중심으로 확장

Let's look at a more complicated example through images 6-4. The two-pointers, odd (3 space) and even (2 space), proceeds to the right. At 5, the odd two-pointer expands to 454, which matches the definition of a  palindrome. It continues to expand from 34543, 2345432, and finally, 123454321, which is saved as the most extended value of palindrome. The even two-pointer is ignored in this image since it is not a palindrome.

Let's build our code based on what we have discussed so far. First, we should consider the exceptions. Python's string slicing speed is outstanding, as we have looked through before, so filtering the values with s == s[::-1] speeds up the overall problem-solving rate. 

if len(s) < 2 or s == s[::-1]:
	return s

We need to be careful as slicing and using indices such as s[3] is quite different in how it returns the numbers. For instance, when s = '12345', s[1:3] returns 23, but s[3] returns 4. Thus, slicing returns up to n-1, whereas index search returns the value of the index. This concept may easily be misunderstood, so you must be aware of its logic, as it often leads to bugs, even during coding tests. Now the sliding window moves to the right, from the string's start to the end.

for i in range(0,len(s)-1):
	result = max(result, expand(s,i,i+1), expand(s,i,i+2), key = len)
return result

The nested function defined with expand() examines if the part of the string is a palindrome using two-pointers, odd and even, and continues to move to the right like a sliding window. The maximum value determined as such becomes the final result. The complete code is as the following.
 
def longestPalindrome():

Unicode and UTF-8
The most widely used method for expressing characters is the ASCII encoding method, which describes all characters using a single byte. Moreover, one byte is excluded as a checksum, so strings were expressed using 128 characters. As a result, Korean and Chinese characters had to be written by putting together more than two special characters. Still, of course, this method is abnormal, and there were often cases where the characters did not print out correctly. To solve this problem, Unicode emerged by allocating characters with plenty of space of 2 to 4 bytes. However, Unicode requires over two bytes for a character that could be represented in a single byte, which leads to a waste of memory. UTF-8 effectively manages this problem by using a variable-length encoding method. UTF-8 was developed by Rob Pike, famous for Go, and a living legend Ken Thompson, renowned as a Unix developer.

The string methods are among the most significant differences in Python version 3. stringobject.c, which would process strings in the previous CPython, was replaced with unicodeobject.c, making a substantial difference in its name and implementation. Python 2 and under would encode special characters, including Korean, separately, making it difficult to print out the original value within the console. However, since Python 3, all strings are based on unicode. As a result, there have been many advancements, so there is no problem printing multiple languages such as Korean, Chinese characters, and English in Python 3. 

Now, we will look into the inner structure of UTF-8, the variable-length encoding method of unicode. If all characters were represented in 4 bytes(32 bits), the string "Python" would take up 24 bytes of memory as follows.

그림 삽입

However, there is a problem with this method. ASCII is sufficient to represent English characters, so each character takes up a single byte. Since all characters take up 4 bytes, three bytes per character are being wasted as a blank spot. The variable-length encoding method was introduced to solve this problem, and UTF-8 is the most well-known. Then how does UTF-8 encode unicode? We can check it out in the following Chart 6-3

표 6-3

The binary format of this chart is straightforward and intuitive. We can see that the initial bit determines the total bytes of the character. If the initial bit of the first byte is 0, it is a 1-byte character, whereas if it is 10, it is the middle byte of a particular character. 110 means 2 bytes, 1110 means 3 bytes, 11110 means 4 bytes, and so forth. We could expand up to 6 bytes originally, but it was limited to 4 since RFC 3629 (RFC, Request for Comments, works as an official document related to internet technology, and all Internet standards follow RFC. We can say that it is a model for Python PEP.), allowing only about a million expressions except the reserved spaces.

The critical point here is that we can save the unnecessary waste of space by determining the bytes according to the Unicode value. If the value is under 128, we represent it using 1 byte. There is a total of 128 ASCII characters, and the Unicode value of these characters are the same. As a result, 1 byte can represent the original ASCII characters, including English and numbers. The string "Python" is all within ASCII's coverage, so it can be expressed in UTF-8 as 0x50 0x79 0x74 0x68 0x6f 0x6e, in 6 bytes. It uses only one-fourth of the memory compared to the 24 bytes needed when represented using 4 bytes(32 bits), so we can cut needless memory waste. 

Let's try to represent each character with its Unicode and UTF-9 encoding value as in the following image 6-5. 

그림 6-5

The UTF-8 encoding value of the Unicode value of each character "A", "π", and "한" is represented in the image 6-5. 

First, "A" is an ASCII character that 7 bits can represent. Therefore, the UTF-8 encoded value is 01000001, leaving the first bit as 0 and using 1 byte.
The Unicode value of "π" exceeds 1 byte. However, it is located relatively forward, so it can be represented within 11bits. Therefore, we can express it using 2 bytes as the image 6-5.
"한" is a Korean character which uses all 16 bits. THe last 16 bit is 1, so to represent it, we must use 3 bytes as teh image 6-5. In fact, unicode includes not only 11,172 complete Korean characters, buit also vowols and consenents. As such, UTF-8 encoded value for Korean needs 3 bytes per character. 
The problem of validating if a value is an UTF-8 encoded string will appear later on in chapter 19 problem 73, 'UTF-8 validation'

Unicode Encoding
Previously, we discussed that Python 3 and after uses Unicode to represent all strings, but Python does not use UTF-8 encoding intrinsicly. Why not use such an effective encoding method? The reason is because it is difficult to approach each character using idices. 
Python supports diverse methods to approach wanted characters such as string slicing. If the strings are encoded using UTF-8, the byte length of each character becomes different, so we need to scan the whole string to approach the wanted index quickly. As a result, we need a fixed-length encoding method, and Python solves this problem by applying different fixed-length encoding methods depending on the string. 
If all string is within the ASCII coverage, it uses Latin-1 encoding (fixed 1 byte encoding), and else, most of the strings use 2 bytes using the USC-2 method (fixed 2-byte encoding). For strings with special characters, image emojis, and rare languages, it uses 4 bytes with the USC-4 method (fixed 4-byte encoding). As such, Python adopts different fixed-length encoding methods according to the range of characters within each string, making it possible for Python to approach wanted indices in cases such as string slicing.


```python

```




    ['hi']


