---
layout: single
title: "지옥의 알고리즘 공부"
categories: study
toc: true
tag: stress,algorithm
---

문제를 똑바로 읽자...
문제를 똑바로 읽자...

1.  Your while-statement is missing a `:` at the end.
2.  It is considered very dangerous to use `input` like that, since it evaluates its input as real Python code. It would be better here to use [`raw_input`](http://docs.python.org/2.7/library/functions.html#raw_input) and then convert the input to an integer with [`int`](http://docs.python.org/2.7/library/functions.html#int).

#전수와 리스트에 있는 수가 같은지 확인하고 그 수를 새로운 리스트에 부여
#효율성을 높이는 방법
```python
#오답
def solution(arr):
    answer=[]
    for x in range(len(arr)-1):
        if arr[x]!=arr[x+1]:
            answer= answer+ [arr[x]]
    answer= answer+ [arr[len(arr)-1]]
    return answer
#정답
def solution(arr):
    answer=[]
    for x in range(len(arr)-1):
        if arr[x]!=arr[x+1]:
            answer.append(arr[x])
    answer.append(arr[len(arr)-1])
    return answer

```
위는 실패한 코드이다... 왜냐하면 효율성 테스트에서 떨어졌기 때문이지.
내 코드의 시간복잡도를 낮추기위해서....일단찍어서 답이나오기만 하면되는거 아닌가..?

정답은 append를 쓰는거였다...
문제는 리스트가 연산이 가능하다는 점을 이용해 answer=answer+ [arr[x]] 이거랑 answer.append[arr[x]]의 차이점을 알아야 한다는것.

두 리스트를 합쳐서 만드는 것이기때문에 append보다 비효율적이다.

함수 호출단계/ 함수 실행단계/ 함수 종료단계 (함수 내부생성된 메모리 해제)
함수를 호출하면 함수의 인자에 위치하는 변수가 인자값을 바인딩하고 그걸 컴퓨터 메모리 어딘가에 할당.

<https://docs.python.org/ko/3.8/library/dis.html>
dis 모듈을 통해 역어셈블링해서 함수 호출과정 분석가능
창작 예제)
```python
import dis
a="a"
list1=[]
list2=[]
def func1(a):
  list1= list1+[a]
  return list1
def func2(b):
  list2= list2.append('a')
  return list2
print(dis.dis(func1))
  6           0 LOAD_FAST                1 (list1)
              2 LOAD_FAST                0 (a)
              4 BUILD_LIST               1
              6 BINARY_ADD
              8 STORE_FAST               1 (list1)

  7          10 LOAD_FAST                1 (list1)
             12 RETURN_VALUE
None

print(dis.dis(func2))
  9           0 LOAD_FAST                1 (list2)
              2 LOAD_METHOD              0 (append)
              4 LOAD_CONST               1 ('a')
              6 CALL_METHOD              1
              8 STORE_FAST               1 (list2)

 10          10 LOAD_FAST                1 (list2)
             12 RETURN_VALUE
None
 
```
+=의 경우 BUILD LIST를 사용하는 것이다.
	빈 리스트를 하나 생성해서 덧셈연산을 수행하고
append의 경우 LOAD METHOD + CALL METHOD을 사용한다.
	존재하던 리스트에서 추가하는 것이다.


numpy를 몰라서 틀렸다.
	np.array
	(처리된 데이터).tolist
	
	
아래는 남의코드 출처:
<https://velog.io/@ryong9rrr/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-Lv1.-%ED%96%89%EB%A0%AC%EC%9D%98-%EB%8D%A7%EC%85%88>
```python
def solution(arr1, arr2):
    answer = []
    
    def add_arr(a, b) :
        arr = []
        for i in range(len(a)) :
            arr.append(a[i]+b[i])
        return arr
    
    for i in range(len(arr1)) :
        answer.append(add_arr(arr1[i],arr2[i]))
        
    return answer
```

import math 모듈 

	math.gcd(최대공약수)
	math.lcm(최대공배수)
	
```python
from math import gcd

def solution(n, m):
    def lcm(n, m):
        return n * m // gcd(n,m)
    answer = []
    a=gcd(n,m)
    b=lcm(n,m)
    answer = [a,b]
    return answer
```

```python
def solution(n):
    a=n**0.5
    if a%1==0:
        answer=(a+1)**2
    else:
        answer=-1
    return answer
```
float를 1로 나눴을때 나머지가 0이면,
이건 정수다! 정수는 int다!