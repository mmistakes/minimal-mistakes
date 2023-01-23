---
layout: single
title: " sys 모듈 stdin.readline() 사용하기 "
categories: python
---


## sys 모듈 stdin.readline() 사용하기

알고리즘 문제를 풀 때, 파이썬의 `input()`은 실행시간이 느려서 자주 시간초과가 난다. 이럴때 sys모듈의 `stdin`을 사용하면 더 빠르게 input이 가능하다.


```python
import sys, os
os.getcwd()
```




    '/Users/mk-mac-357/Documents/yjjo/practice'



### sys.stdin.readline() 써보기
입력값이 몇줄이든 한줄 단위로 읽어오는 메소드이다.   해당 메소드로 불러올 경우, 뒤에 **\n** 이 붙어 제거해야한다. 아래 파일로 몇 가지 테스트를 해보자.


**test.txt** 파일   
3    
problem1 solve1   
problem2 solve2   
problem3 solve3   


```python
sys.stdin = open('test.txt','r')
```


```python
n = int(sys.stdin.readline())
print(n)
```

    3


뒤에 \n 이 붙어서 같은 print 로 출력했지만 한줄 내림이 되었다.


```python
a = sys.stdin.readline()
b = sys.stdin.readline()
c = sys.stdin.readline()
print(a,b,c)
```

    problem1 solve1
     problem2 solve2
     problem3 solve3


알고리즘 테스트를 볼 때, 라인 수를 확인할 수 없으므로 첫줄에 n으로 줄 수를 확인하도록 제공하는 경우가 많으니 보고 확인하자

### 01) 여러 라인의 결과 확인하기   
보면 맨 마지막 줄 결과 외에는 \n 이 붙어있음을 알 수 있다.


```python
sys.stdin = open('test.txt','r')

n = int(sys.stdin.readline())
print('number', n)

tmpL = []
for _ in range(n):
    words = sys.stdin.readline()#.rstrip().split()
    tmpL.append(words)
tmpL
```

    number 3





    ['problem1 solve1\n', 'problem2 solve2\n', 'problem3 solve3']



### 02) 각 결과에 \n 제거하기    
오른쪽에 붙는 \n을 제거하기위해 `rstrip()`또는 `strip()`를 사용해도 하면 지워진다. 


```python
sys.stdin = open('test.txt','r')

n = int(sys.stdin.readline())
print('number', n)

tmpL = []
for _ in range(n):
    words = sys.stdin.readline().rstrip()#.split()
    tmpL.append(words)
tmpL
```

    number 3





    ['problem1 solve1', 'problem2 solve2', 'problem3 solve3']



### 03) 각 line 의 출력물을 요소 별로 저장하려면?


```python
sys.stdin = open('test.txt','r')

n = int(sys.stdin.readline())
print('number', n)

tmpL = []
for _ in range(n):
    words = sys.stdin.readline().rstrip().split()
    tmpL.append(words)
tmpL
```

    number 3





    [['problem1', 'solve1'], ['problem2', 'solve2'], ['problem3', 'solve3']]


