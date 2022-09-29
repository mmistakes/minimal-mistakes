---
layout: single
title:  "문자열 조작"
excerpt: "박상길, 『파이썬알고리즘인터뷰』, 책만(2020), p137-168."

categories: AlgorithmByPython
tag: [Python, string, algorithm]

toc: true
toc_sticky: true

author_profile: true
sidebar: true

search: true
 
date: 2022-09-19
last_modified_at: 2022-09-29
---

# Valid Palindrome



[leetcode : valid-palindrome]([https://leetcode.com/problems/valid-palindrome/](https://leetcode.com/problems/valid-palindrome/)).

**다음 문제부터는 나의 풀이를 기록하고 책에 나와있는 풀이를 분석하도록 할 것.** 

<br/>

## 리스트로 변환

```python
def isPalindrome(self, s: str) -> bool:
    strs = []
    for char in s:
        is char.isalnum():
            strs.append(char.lower())
    while len(strs) > 1:
        if strs.pop(0) != strs.pop():
            return False
    return True
```

* isalnum() 함수를 통해 string에서 받아온 문자열 하나하나를 문자나 숫자인지를 판별한다.
* 그 후에 소문자로 동일하게 맞춰주어 비교를 할 수 있게 lower()라는 함수를 이용하고 appned()를 이용해  list에 넣어준다.
* pop()함수는 list에서 마지막 인덱스의 값을 반환하는 동시에 제거를 한다. 이 때 인수에 0을 전달하면 맨처음의 값을 반환한다.



<br/><br/>

## 데크 자료형을 이용해 최적화

``` python
def isPalindrome(self, s: str) -> bool:
    #자료형을 데크로 선언
    strs: Deque = collections.deque()
    
    for char in s:
        if char.isalnum():
            strs.append(char.lower())
            
    while len(strs) > 1:
        if strs.popleft() != strs.pop():
            return False
    return True
```

다음과 같이 strs를 list가 아닌 Deque로 자료형을 선언하게 되면 pop(0) 이 아닌 popleft() 함수를 이용해 처음 index의 값을 불러 올 수 있는데 이는 pop(0) 이 $O(n)$ 인것에 비해 popleft()이 $O(1)$이므로 Deque자료형을 이용하면 성능을 더 좋게 만들 수 있다.

<br/><br/>

## 슬라이싱

``` python
def isPalindrome(self, s: str) -> bool:
    s = s.lower()
    # 정규식으로 불필요한 문자 필터링
    s = re.sub('[^a-z0-9]', '', s)
    
    return s == s[::-1] # 슬라이싱
```

슬라이싱은 내부적으로 C로 빠르게 구현이 되어 있어 훨씬 더 좋은 속도를 기대할 수 있다.

**대부분의 문자열 작업은 슬라이싱으로 처리하는 편이 가장 빠르다.**



( C로 구현하게 되면 코드는 길지만 훨씬 더 빠른 속도로 실행시킬 수 있다.)



<br/><br/>

# reverse-string

[leetcode : reverse-string]([https://leetcode.com/problems/reverse-string/](https://leetcode.com/problems/reverse-string/)).

<br/>

## 내 풀이

```python
def reverseString(self, s: List[str]) -> None:
        s.reverse()
```

reverse()함수를 이용해 s라는 list 자체를 바꾼다.

<br/><br/>

## 투 포인터를 이용한 스왑

```python
def  reverseString(self, s: List[str]) -> None:
    left, right = 0, len(s) -1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
```

포인터의 범위를 좁혀가며 스왑을 하는 방식이다.



<br/><br/>



## 파이썬의 방식

```python
def reverseString(self, s: List[str]) -> None: 
    s.reverse()
```



<br/>

<br/>

## 처음에 했던 풀이

```python
def reverseString(self, s: List[str]) -> None: 
   s = s[::-1]
```

공간복잡도를 $O(1)$로 문제에서 제한을 했기 때문에 다음은 에러가 난다.

```python
def reverseString(self, s: List[str]) -> None: 
   s[:] = s[::-1]
```

이를 다음과 같이 수정을 하면 된다.

s = s[::-1]는 기존의 다른 list를 참조하고 있던 s가 다른 list를 참조하기 때문에 공간복잡도의 조건인 $O(1)$을 만족하지 못하는 것으로 보인다.

<br/><br/>

# 로그 파일 재정렬

<br/>

## 내 풀이

```python
class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        logs_let = {}
        logs_dig = []
        keys = []
        values = []
        
        for element_logs in logs: # distinguish 2 cases
            i = 0
            for char in element_logs:
                i += 1
                if char == ' ': 
                    break 
            if element_logs[i].isdigit(): 
                logs_dig.append(element_logs) 
            else:
                keys.append(element_logs[:(i-1)])
                values.append(element_logs[i:])
        
        logs_let = dict(zip(keys, values))
            
        marklist = sorted(logs_let.items(), key=lambda x:x[1]) # sort by value
        sortdict = dict(marklist)

        sorted_let_list = []
        for k, v in sortdict.items():
            sorted_let_list.append(k+' '+v)
        result_list = sorted_let_list + logs_dig 
    
        return result_list
```

* 일단 letter-logs가 digit-logs보다 앞에 와야 하므로 우선적으로 digit-logs는 다 list로 분리시켜 원래의 순서를 유지 시켰다.



* identifier는 key로 나머지 letter-logs는 value로 분리시켜서 정렬시키고자 하였다.



* value를 1순위로 정려하고 2순위로 key 사전순서에 맞게 정렬을 시키고자 우선 value를 사전순서에 맞게 정렬시켰다. key와 value의 값을 합쳐서 다시 list로 만들어주었다.



**여기서 value의 사전순서에 맞게 정렬을 시키고 유지한 채로 key의 사전순서에 맞게 정렬을 시켜야하는데 이러한 문제점이 해결되지 않았다.**

<br/><br/>

## 람다와 + 연산자를 이용



```python
class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        letters, digits = [], []
        for log in logs:
            if log.split()[1].isdigit():
                digits.append(log)
            else:
                letters.append(log)
                
        letters.sort(key=lambda x: (x.split()[1:], x.split()[0]))
        return letters + digits
```

* split()으로 logs에 있는 각 문자열 원소를 띄어쓰기를 기준으로 분리한다.

* 문자열이므로 isdigit()함수를 이용해 문자인지 숫자인지를 판별해 각 list로 분리시킨다.

  

문자로그를 따로 정렬을 해야하는데 람다표현식으로 나타내었다.

이 때 앞선 identifier보다 뒤의 contents를 기준으로 우선 정렬해주고 contents가 같을 경우 identifier의 사전순서에 맞춰 정렬을 해줘야 한다.

이때 sort() 함수의 paramter인 key를 설정해주어서 이용하면 이러한 것이 가능하다.

이때 2가지 조건이 있으므로 lambda함수를 설정해서 key()함수의 parameter를 설정할 수 있다.

위에서의 람다식은 contents를 우선으로 정렬하고, 2순위로 identifier를 정렬한다는 뜻이다.



* 정렬된 letters뒤에 digits를 더하여 digits는 순서를 유지한채 뒤에 추가로 붙게된다.

<br/><br/>

# most common word



[leetcode : most-common-word]([https://leetcode.com/problems/most-common-word/](https://leetcode.com/problems/most-common-word/))

<br/>



## 내 풀이

```python
class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        str_list = []
        for char in paragraph.lower():
            if char.isalpha() or char == ' ':
                str_list.append(char)
        str = ''.join(str_list)
        word = []
        word = str.split(' ') 
        
        for ban_word in banned:
            for one_of_word in word:
                if one_of_word == ban_word:
                    word.remove(ban_word)
                    
        num_index = []
        for i in range(len(word)):
            num = 0
            for j in range(len(word)):
                if word[i] == word[j]:
                    num += 1
            num_index.append(num)

        tmp = max(num_index)
        index = num_index.index(tmp)
        
        return word[index]
```

* 위와 같은 방식으로 문제를 풀었을 경우 48개의 testcase중 input이 "a, a, a, a, b,b,b,c, c" 일 경우의 testcase를 통과시키지 못하였다.
* 문제점1:  문자열에서 띄어쓰기에 의존적으로 단어를 구분하여 구분자를 없애도 띄어쓰기가 없다면 단어를 이어버린다.
* 문제점2: 금지된 단어를 없앨때 remove()함수를 이용하게 되면 for문에서 정상적으로 모든 원소에 접근할 수 없어 모두 제거할 수 없다.
* 해결책1: 띄어쓰기에 의존하는 것이 아닌 구분자이전에 나오는 단어들을 인식해 구분하는 방법을 이용한다
* 해결책2: 원본의 리스트를 복사해 for문을 이용해 모든 원소에 접근할 수 있도록 한다.

```python
class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        s = paragraph.lower()
        s = re.sub('[^a-z]', ' ', s)
        list_s = s.split(' ')
        for char in list_s[:]:
            if char == '':
                list_s.remove(char)
                
        for ban_word in banned:
            for one_of_word in list_s[:]:
                if one_of_word == ban_word:
                    list_s.remove(one_of_word)
        num_index = []
        for i in range(len(list_s)):
            num = 0
            for j in range(len(list_s)):
                if list_s[i] == list_s[j]:
                    num += 1
            num_index.append(num)

        tmp = max(num_index)
        index = num_index.index(tmp)

        return list_s[index]
```

<br/>

<br/>

## 리스트 컴프리헨션, Counter 객체 사용

```python
# Preprocessing
words = [word for word in re.sub(r'[^\w]', ' ', paragraph)
         .lower().split()
         if word not in banned]

'''
counts = collections.defaultdict(int)
for word in words:
    counts[word] += 1
return max(counts, key = counts.get)
'''

counts = collections.Counter[words]
return counts.most_common(1)[0][0]
```

여기서 collections.dafultdict(int) 로 counts 변수를 할당해서 기본적으로 0의 값을 가지는 dict로 만들어줘

동일한 문자를 key로 가지는 value를 증가시켜서 마지막으로 max()함수를 이용해 value가 가장 높은 key를 출력한다.



이를 collections 에서 Counter 객체를 설정해 더 편하게 하는 방법이 있는데 most_common(1)을 통해 가장 흔하게 등장하는 단어를 추출한다.

이때, 추출하게 되면 [('key', value)]이러한 형식의 값을 가지게 되는데, 이를 index를 통해 접근해 가장 많이 출현하는 단어를 뽑아내게 된다.



<br/><br/>

# 그룹 애너그램

[leetcode : group-anagrams]([https://leetcode.com/problems/group-anagrams/](https://leetcode.com/problems/group-anagrams/))

<br/>



## 정렬하여 딕셔너리에 추가

```python
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    anagrams = collections.defaultdict(list)
    
    for word in strs:
        anagrams[''.join(sorted(word))].append(word)
    return list(anagrams.values())
```

* collections.defaultdict(list) 를 통해 anagrams라는 변수가 기본적으로 value값을  list라는 값을 가지게 한다.



* 결국에 애너그램이라는 것은 사전순으로 정렬을 했을 때 결과값이 같은 단어들을 나타낸 것이므로 다음과 같이 같은 정렬값을 key값으로 두고 value값에 해당하는 단어들을 넣어준다.



* return 하는 값은 value값들에 한번더 list()를 씌어준 값을 반환한다.

<br/><br/>

### 정렬 방법

```python
a = [2, 5, 1, 9, 7]
>>> sorted(a)
[1, 2, 5, 7, 9]
```



```python
b = 'zbdaf'
>>>sorted(b)
['a', 'b', 'd', 'f', 'z']
```

sort한 결과를 list로 반환한다. 결과를 다시 접합하려면 join()함수를 이용한다.



리스트는 sort()라는 메소드도 제공하는데 이는 In-place sort로써 기존의 list 자체를 바꾼다.

```python
c = ['ccc', 'aaaa', 'd', 'bb']
sorted(c, key = len) #다음과 같이 길이를 기준으로 정렬하는 key를 설정할 수도 있다.
```



```python
a = ['cde', 'cfc', 'abc']

def fn(s):
    return s[0], s[-1]
sorted(a, key=fn)
```

다음과 같이 함수로도 key를 설정할 수도 있다.



```python
a = ['cde', 'cfc', 'abc']
sorted(a, key = lambda s: (s[0], s[-1]))
```

다음과 같이 람다식으로도 설정이 가능하다.



<br/><br/>

# 가장 긴 팰린드롬 부분 문자열

[leetcode : longest-palindromic-substring]([https://leetcode.com/problems/longest-palindromic-substring/](https://leetcode.com/problems/longest-palindromic-substring/))

<br/>



## 내 풀이

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        palindromic_substring = []
        for i in range(len(s)):
            for j in range(i+1, len(s)+1):
                if s[i:j] == s[i:j][::-1]:
                    palindromic_substring.append(s[i:j])
    
        return max(palindromic_substring, key=len)
```

제출을 했었을 때 실행시간 초과가 발생하였다. 

이는 예상하건데 $O(n^2)$으로 리스트의 모든 원소를 접근해 비효율적으로 판별하는데 이유가 있다고 보여진다. 



<br/><br/>

## 중앙을 중심으로 확장하는 풀이

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        #confirm palindrome and expand
        def expand(left: int, right: int) -> str:
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return s[left + 1:right]
        #exception
        if len(s) < 2 or s == s[::-1]: 
            return s
        result = ''
        for i in range(len(s)-1):
            result = max(result,
                        expand(i, i  + 1),
                        expand(i, i + 2),
                        key = len)
        return result
        
        
```

슬라이딩 윈도우 처럼 이동하는 투 포인터를 이용해 짝수, 홀수인경우 모두 검사해 가장 긴 팰린드롬을 찾는 방식이다.

expand함수를 통해 palindrome일 경우 확장시켜 palindrome중 가장 긴 palindrome을 찾는다.

최종적으로 result에는 가장 길이가 긴 palindrome이 들어간다.

<br/><br/>

## 유니코드, UTF-8

* 파이썬3부터는 문자열 모두 유니코드 기반이다.

* 유니코드 자체로는 비효율적이므로 이를 효율적으로 하기 위해 UTF-8인코딩 방식을 이용한다.

* 바이트수는 1부터 4까지 직관적이고 간단하게 나타내었다.

* 예약된 공간을 제외하면 약 100만자를 표현한다.

* 유니코드 값에 따라 가변적으로 바이트를 결정한다.

**파이썬에서는 내부적으로 UTF-8 인코딩 방식을 사용하지는 않는다. **

**개별문자에 인덱싱을 통해 접근하기 어렵기 때문이다. 이는 UTF-8방식으로 인코딩을 하면 문자마다 바이트 길이가 달라져 빠르게 접근할 수 없기 때문이다. **

**문자열의 특성에 따라 바이트 수를 다르게 고정시켜서 인코딩한다.**







