---
layout: single
title: '자료구조와 알고리즘을 배워야하는 이유'
categories:  시간복잡도
tag: [자료구조와 알고리즘]
author_profile: false
published: true
use_math: true
sidebar:
    nav: "counts"
---

코딩테스트 문제를 풀다보면 분명 input과 output 은 맞는데 시간 초과로 틀렸다고 나오는 경우를 많이 경험하게 된다. 코드를 계속 수정해도 시간 초과의 덫에 한번 빠지면 해결하기 어렵다.

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-01-13-time-complexity\time_over.png" alt="Alt text" style="width: 30%; margin: 0 35px;">
  <img src="{{site.url}}\images\2024-01-13-time-complexity\crazy.gif" alt="Alt text" style="width: 40%; margin: 0 5px;">
</div>

<br>

그럴때마다 입력값이랑 출력값만 맞으면 되지 도대체 얼마나 오래 걸린다고 틀린답이라는 건지 답답할때가 많다. 

이런 답답함을 풀기위해 알고리즘에 따라 코드 실행 시간이 얼마나 더 오래 걸리는지, 자료구조와 알고리즘이 왜 중요한지 관련 자료를 찾다가 <a href= 'https://www.youtube.com/playlist?list=PL7jH19IHhOLMdHvl3KBfFI70r9P0lkJwL'> 노마드 코더 Nomad Coders</a> 에 좋은 자료가 있어서 영상의 내용들을 내가 이해한대로 정리해봤다.

## 파이썬의 메모리 핸들링

파이썬은 모든것이 객체이다. 변수가 가질 수 있는 값의 타입을 고정하지 않으며, 우리가 리스트와 같은 배열을 사용할 때도 크기를 사전에 지정하지 않아도 파이썬이 자동으로 조정해준다.

메모리 관점에서 배열을 생성할 때 컴퓨터에게 배열의 크기를 전달해주면 RAM은 그 공간을 미리 할당해준다. 즉 메모리 시작 위치와 전체 크기를 미리 알고있는 것이다. 
파이썬에서는 우리도 모르게 위 과정이 이루어지고 있다. 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-01-13-time-complexity\memory_address.png" alt="Alt text" style="width: 70%; margin: 0 5px;">
</div>

<i><span style="font-size: 14px;">  Image Ref : <a href ='https://medium.com/@pranaygore/memory-management-in-python-3ef7e90ee2bf'>Memory management in Python</a></span></i>


파이썬은 메모리 핸들링을 대신해주기 때문에 우리는 메모리 할당 과정을 알지 못해도 편하게 데이터를 생성하고 사용할 수 있다. 이렇게 직접 메모리 핸들링은 안하는 건 편리한 점도 많지만 그 덕분에 직접 핸들링이 가능한 C나 JAVA와 비교해서 프로그램이 느려질 수 있는 단점도 존재한다. 

그래서 파이썬에서는 코드를 효율적으로 작성할려면, 자료구조와 알고리즘을 잘 알아야한다.

## 배열(Array) 오퍼레이션 

### Read

배열은 0부터 인덱싱한다. 우리는 인덱스의 위치만 알면 데이터에 접근할 수 있다.

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\op_read_array.png){: .align-center .img-height-half .img_width_half} 

위 데이터에서 ice cream 을 가져오고 싶다면 우리는 인덱스 1번 값을 달라고 컴퓨터에게 말하기만 하면 된다. 

```python
# 요소가 4개인 array 
arr = ['pasta', 'ice cream', 'pizza', 'potato']

#배열에서 ice cream 을 얻고싶다면 인덱스 1번의 값을 달라고 하면된다.
arr[1]
```
인덱스에서 요소를 읽어나는 속도는 배열의 길이와 상관없이 동일하기 때문에 Read 는 속도가 매우 빠르다. 

### Search

우리가 보통 검색을 할때, 우리의 목적은 데이터가 존재하는 지 여부를 확인하기 위함이다. 인덱스로 메모리에 쉽게 접근할 수 있지만 그 안의 값을 직접 보기 전까지는 어떤 데이터가 있는지 모른다. 

즉, 배열의 값을 하나하나 체크하는 과정을 거쳐야하고 Read 연산 보다는 시간이 걸릴수 밖에 없다.


운이 좋으면 찾고싶은 아이템이 맨 앞에 존재하여 한번에 찾을수도 있지만 최악의 경우에는 우린 모든 데이터를 뒤졌지만 찾고있는 아이템이 존재하지 않을수도 있다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\search_case.png){: .align-center .img-height-half .img_width_half} 


이렇게 우리가 모든 데이터를 하나하나 열어보는 과정을 <b>선형검색</b>이라고 한다. 


### Insert
위에서 배열을 생성할때 컴퓨터는 미리 사이즈를 할당한다고 했었다. 

미리 할당된 메모리가 아직 여유가 있고 새로운 데이터를 넣고 싶다면 미리 할당된 메모리 공간에 넣어 주기만 하면 된다.

검색 때와 마찬가지로 어디에 데이터를 할당하고 싶은지에 따라 최상의 시나리오부터 최악의 시나리오까지 나올 수 있다.

#### 메모리 공간이 여유있는 경우 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\op_search_array.png){: .align-center .img-height-half .img_width_half} 


데이터를 맨 끝에 넣는 경우 우리는 이미 배열의 크기를 알고있기 때문에 인덱스를 이용해서 간단하게 맨 뒤에 아이템을 넣을 수 있다.

중간에 넣는 경우부터 이미 할당된 데이터들을 뒤로 옮겨 추가 공간을 생성하게 된다. 맨 앞에 아이템을 추가하는 경우에는 이미 존재하는 모든 데이터들을 뒤로 이동시켜야 한다. 사이즈가 큰 배열이라면 많은 시간을 소요하게 될수도 있다. 

더 최악의 경우는 아직 존재한다. 

#### 메모리 공간이 꽉 찬 경우

이미 공간이 다 차있는데 아이템을 추가할 경우 기존에 미리 할당한 메모리 공간을 더 늘릴수는 없다. 그래서 이전 배열을 복사하고, 다시 새로 추가를 해야한다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\op_search_copy.png){: .align-center .img-height-half .img_width_half} 

요소를 복사한 후 다시 만들고 그 다음 데이터 추가를 해야하기 때문에 메모리 공간이 꽉 차있고 맨앞에 데이터를 추가하는 경우에는 매우 오랜 시간이 걸린다. 

### Delete
삭제 연산은 삽입 연산과 유사하다.

배열에서 마지막 데이터를 삭제하고 싶은 경우에는 우린 이미 배열의 사이즈를 알고있기 때문에 아주 쉽게 데이터를 삭제 할 수 있다. 하지만 다른 경우에는 데이터를 삭제한 후 삭제한 데이터의 인덱스 위치 다음에 오는 모든 값들을 앞으로 이동시켜 공간을 채워줘야한다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\op_delete.png){: .align-center .img_width_half} 

데이터를 읽을때는 연산 속도가 매우 빠르지만, 검색, 추가 , 삭제 연산을 수행할 때는 처리 속도가 느려진다. 

데이터를 맨앞에 추가하는 경우에 언제나 매우 느린 속도로 프로그램이 처리되기를 기다려야 하는걸까?

이럴때 우리는 다양한 알고리즘을 이용해서 느린 연산도 빠른 속도롤 처리할 수 있다! 그러므로 자료구조에 대한 이해도와 Read, Search, Insert, Delete 연산의 처리 과정을 생각하면서 상황에 따라 적절한  알고리즘을 이용해 코드를 작성하는 것이 중요하다.

## 알고리즘

알고리즘은 작업을 수행하기 위해서 따라야하는 <b>절차(step)</b>를 말한다. 요리를 하기위해 따라야하는 레시피라고 생각하면 쉽다. 

알고리즘은 step 이 적을수록 속도가 빠르고 더 훌륭한 알고리즘이다. 

### Search 알고리즘
#### 선형 검색 (Linear search )
선형 검색은 데이터를 하나하나 보면서 순서대로 목표값을 찾는것을 말한다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\linear_search.gif){: .align-center .img_height_half .img_width_half}

위 이미지를 보면 33 을 찾기위해서 인덱스 0부터 순서대로 원하는 아이템을 찾을때까지 모든 데이터를 다 살펴봐야하기 때문에 배열의 사이즈가 커질수록 검색 시간도 늘어날 것이다. 원하는 아이템이 배열에 없거나 마지막 인덱스에 존재할때 위 방법으로 아이템을 찾는건 매우 비효율적으로 보인다.

그래서 선형 검색보다 발전한 <b>이진 검색 (binary search)</b> 알고리즘이 존재한다. 

#### 이진 검색 (Binary search)

선형검색 보다 빠르지만 정렬된 배열에서만 사용가능하다. 

binary는 하나를 두개로 쪼개는것을 뜻하며, 이진 검색은 매 스텝마다 절반의 아이템을 없앤다.

하지만 이진검색은 배열이 정렬되어 있어야만 적용할 수 있기 때문에 선형 검색과는 다르게 정렬 시간이 추가된다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\binary_vs_linear.gif){: .align-center .img_height_half .img_width_half}


이진검색 과정을 파이썬 코드로 구현하면 다음과 같다.

```python
def binary_search(arr, num):
    global cnt 
    cnt +=1
    
    print(f"[{cnt}] : {arr}")
    if len(arr) == 1:
         return arr[0]
    
    mid = len(arr)//2
    print(f"mid : {mid}")
    if num == arr[mid]:
         return arr[mid]
    if num>arr[mid]:
         return binary_search(arr[mid:], num)
    else:
         return binary_search(arr[:mid], num)
        

global cnt 
cnt =0

arr = [i for i in range(1, 11)]
num = 7
print(f"search num : {num}")
print(f"array : {arr}")
print('-'*(len(arr)*4))
binary_search(arr, num)

```

```
search num : 7
array : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
----------------------------------------
[1] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
mid : 5
[2] : [6, 7, 8, 9, 10]
mid : 2
[3] : [6, 7]
mid : 1


```

매 스텝마다 중간값 보다 찾고싶은 데이터가 크면 중간값 보다 작은 데이터들은 다 제거하고 데이터가 더 작으면 중간값 보다 큰 데이터들을 제거한다. 

위 과정을 원하는 아이템을 찾을때까지 반복하는것이 이진 검색 알고리즘이다. 

1에서 10으로 이루어진 배열에서 7을 찾기 위해서는 선형 검색으로는 7번의 step이 필요하지만 이진 검색으로는 3번의 step으로 찾을 수 있다.

데이터가 많을수록 이진검색이 얼마나 효율적인지 알 수 있다. 

```python
global cnt 
cnt =0

arr = [i for i in range(1,21)]
num = 12 
print(f"search num : {num}")
print(f"array : {arr}")
print('-'*(len(arr)*4))
binary_search(arr, num)
```
```python
search num : 12
array : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
--------------------------------------------------------------------------------
[1] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
mid : 10
[2] : [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
mid : 5
[3] : [11, 12, 13, 14, 15]
mid : 2
[4] : [11, 12]
mid : 1
```
데이터가 2배 증가했지만 step 은 고작 한단계만 증가했다.

그 이유는 데이터가 두배 증가해도 처음 시작할때 절반을 날리고 시작하기 때문에 스텝은 한단계만 추가된다. 

그러면 데이터 개수를 처음보다 1000배 늘려 10000개의 데이터에서 아이템을 찾으면 시간이 얼마나 걸릴까?

선형 검색을 이용하면 처음보다 1000배의 시간이 걸릴수도 있다.


```python
global cnt 
cnt =0

arr = [i for i in range(1,10001)]
num = 10000
print(f"search num : {num}")
print(f"array : {arr}")
print('-'*(len(arr)*4))
binary_search(arr, num)
```

```python
search num : 10000
array : [1, 2, 3, 4, 5, 6 .... 9999, 10000]
[1] : [1, 2, 3, 4, 5, 6 .... 9999, 10000]
mid : 5000
[2] : [5001, 5002, 5003, 5004, 5005 .... 9999, 10000]
mid : 2500
[3] : [7501, 7502, 7503, 7504, 7505, 7506 .... 9999, 10000]
mid : 1250
[4] : [8751, 8752, 8753, 8754, 8755, .... 9999, 10000]
mid : 625
[5] : [9376, 9377, 9378, 9379, 9380, .... 9999, 10000]
mid : 312

...

[13] : [9998, 9999, 10000]
mid : 1
[14] : [9999, 10000]
mid : 1
```

위 코드를 보면 10000개의 데이터 중 맨 마지막 아이템인 10000을 찾는 경우에도 14단계 밖에 안걸리는걸 볼 수있다!

선형 검색으로 10000단계가 필요한 일은 14단계로 줄여버렸다. 

이진 검색을 사이즈가 큰 배열을 다룰때 효과적이이며, 배열은 정렬된 상태여야 한다.

데이터를 정렬하는데에 시간이 걸리겠지만 아이템을 검색하는게 목적이라면 정렬 후 이진 검색을 이용하는것이 정렬 안된 데이터에서 선형 검색을 하는것보다 훨씬 빠를것이다.

만약, 아이템을 추가하는것이 목적이라면 정렬이 된 배열에서 아이템을 추가하는 것보다는 순서가 상관이 없는 정렬이 안된 배열에 아이템을 추가하는게 훨씬 빠를것이다. 

이렇게 자료구조와 알고리즘의 상충관계를 명확히 이해하고 코드를 작성해야 효율적인 코드를 작성할 수 있다.

-----

## 시간복잡도 (Time Complexity)
알고리즘의 속도는 1분 1초 단위로 계산하는 것이 아니라 얼마나 많은 <b>"단계(step)"</b> 가 있는가로 측정한다.

왜냐면 동일한 알고리즘 코드도 하드웨어 성능에 따라 속도가 달라지기 때문이다. 컴퓨터의 성능이 좋다면 더 빠른 속도로 계산된다.

따라서 <b>"작업완료까지 걸리는 절차의 수"</b> 로 성능을 측정한다. 

시간복잡도는 자료구조의 오퍼레이션 혹은 알고리즘이 얼마나 빠르고 느린지 측정하는 방법이다.

선형 검색에서은 input 의 개수에 비례해서 절차가 증가했다. 즉, input size가 N이면 N스텝이 요구된다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\linear_time.png){: .align-center .img_height_half .img_width_half}

알고리즘의 시간복잡도를 이해하기 쉽게 설명하기 위해 <b>Big-O 표기법</b>을 사용한다. 

간단하게 해서 입력의 크기가 $n$ 일 때, $O(n)$ 은 입력 크기에 비례하는 절차가 소요된다는 뜻이다. 

### Constant time algorithm

<br>

```python
arr = ['pasta', 'ice cream', 'pizza', 'waffle']

def print_first(arr):
    print(arr[0])

print_first(arr)
```

위 함수의 시간복잡도는 무엇일까?

하나의 요소를 한번만 출력하므로 한번의 절차로 작업이 완료된다. 

따라서 위 코드의 시간복잡도는 $O(1)$ 이다.

```python
arr = ['pasta', 'ice cream', 'pizza', 'waffle', 'apple', 'melon' , 'potato']

def print_first(arr):
    print(arr[0])

```

그러면 위 상황에서 시간복잡도는 무엇일까? 배열의 크기가 증가했으니 시간복잡도 또한 증가할까?

그렇지않다. 위 코드는 배열의 크기와 상관없이 한번의 print문은 수행한 후 작업을 완료하기 때문에 여전히 시간복잡도는 $O(1)$ 이다.

<b>input size에 상관없이 스텝이 정해진 알고리즘</b>을 <b>Constant time algorithm</b> 이라고 부른다. 

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\Constant_time.png){: .align-center .img_height_half .img_width_half}

```python
# 아래의 함수는 O(4) ?!
def print_first(arr):
    print(arr[0])
    print(arr[0])
    print(arr[0])
    print(arr[0])


```
그러면 print문의 개수를 증가시키면 어떻게 될까? 4번의 print문을 수행하니까 시간복잡도는 $O(4)$ 라고 생각을 하게된다.

그러나 여전히 $O(1)$ 이다. <b>Big-O 는 함수의 디테일에 관심이 없다.</b> 이 함수가 input size에 따라 어떻게 작동하는지만 생각한다. 

print_first() 함수를 보면 input size 가 엄청나게 커져도 상관없이 미리 정해진 숫자에 따라 작동한다. 위 코드에서 input size는 중요하지 않다. 

----

다음 함수의 시간복잡도는 무엇일까?

```python
def print_all(arr):
    for n in arr:
        print(n)
```

Constant time algorithm과 다르게  <b>input size가 증가할수록 step의 개수가 선형적으로 증가</b>한다. Big-O로 $O(n)$ 으로 표현할 수 있다.

### $O(n)$

<br>

```python
def print_all(arr):
    for n in arr:
        print(n)
    for n in arr:
        print(n)
    for n in arr:
        print(n)
    for n in arr:
        print(n)
```
그럼 위 코드는 $O(n)$이 4번 반복하니까 시간복잡도는 $4O(n)$ 이구나.. 라고 생각하면 안된다. 여전히 본질은 동일하다. input size가 증가할수록 step의 개수가 선형적으로 증가한다는 사실은 변하지 않는다. 여전히  $O(n)$ 으로 표현된다.

시간복잡도를 생각할때는 상수 디테일은 신경쓰지 말자

-----

다음 함수의 시간복잡도는 무엇일까?
```python
def print_twice(arr):
    for i in arr:
        for j in arr:
            print(i,j)
```

루프문안에 루프문을 실행하므로 $O(n^2)$로 표현할 수 있다. 

input size가 10이면 100번의 절차를 수행하고 100이면 10000번의 절차를 수행한다.

### $O(n^2)$

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\squard_time.png){: .align-center .img_height_half .img_width_half}

다음 함수의 시간복잡도를 계산해보자
```python
cnt = 0

def binary_search(arr, num):
    global cnt 
    cnt +=1
    
    print(f"[{cnt}] : {arr}")
    if len(arr) == 1:
         return arr[0]
    
    mid = len(arr)//2
    print(f"mid : {mid}")
    if num == arr[mid]:
         return arr[mid]
    if num>arr[mid]:
         return binary_search(arr[mid:], num)
    else:
         return binary_search(arr[:mid], num)
        
```

익숙한 코드이다! 바로 이진검색을 구현한 함수이다.

이전에 봤던 함수들은 코드를 보면 직관적으로 시간복잡도를 계산하기 쉬웠는데 이번에는  한번에 파악하기 쉽지않다. 

위 알고리즘은 로그를 이용하여 표현할 수 있다.

log와 지수의 관계를 생각해보자. log와 지수는 정반대이다.

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-01-13-time-complexity\log_vs_exp.png" alt="Alt text" style="width: 70%; margin: 0 5px;">
</div>

### $O(log_2 n)$

<br>

이진 검색은 매 스텝마다 절반을 자른다. 그렇기 때문에 input size가 2배가 증가해도 하나의 스텝만 증가한다. input size가 4배가 증가하면 1단계에서 $1/2$이 사라지고 2단계에서 처음보다 $1/2^2$이 사라져 기존 input_size 동일한 크기가 된다. 

즉, 이진검색의 시간복잡도는 로그에 비례하므로 $O(log_2 n)$로 표현한다.

![Alt text]({{site.url}}\images\2024-01-13-time-complexity\time_complexity.png){: .align-center .img_height_half .img_width_half}

위 그래프를 보면 시간복잡도에 따른 성능을 파악할 수 있다. $O(log_2 n)$는 선형 시간($O(n)$) 보다는 빠르고 상수시간($O(1)$) 보다는 느리다.  

코드를 작성할 때 결과에만 신경쓰지 말고 시간복잡도를 최적화 할 수 있는 자료구조와 알고리즘을 생각하면서 코드를 작성해야 "시간초과" 라는 문구를 피할수 있을 거다.


----

<br>

이번에 시간복잡도를 공부하면서 왜 시간복잡도가 중요한지, 알고리즘에 따라서 시간복잡도가 얼마나 달라지는지, 자료구조와 알고리즘의 관계는 무엇인지 한번 살펴보았다. 

막연하다 중요하다고는 알고있었지만 근본적으로 왜 중요한지는 정확히 몰랐는데 이번에 관련 자료를 정리하면서 시간복잡도의 개념이 머리속으로 정리된것 같다. 

코드를 작성하면서 시간초과 문구를 더 이상 안봤으면 좋겠다. 그러기 위해서는 여러 알고리즘과 동적 자료구조에 대한 공부가 추가적으로 필요함을 느꼈다. 

다음에는 동적 자료구조와 다양한 알고리즘에 대해 정리할 생각이다.


----

Reference
- 시간복잡도 그래프 : <a href = 'https://www.theknowledgeacademy.com/blog/time-complexity/'>What is Time Complexity</a>
- 로그와 지수 : <a href = 'https://helpingwithmath.com/logarithms'>logarithms</a>
- 알고리즘 & 데이터 구조 : <a href= 'https://www.youtube.com/playlist?list=PL7jH19IHhOLMdHvl3KBfFI70r9P0lkJwL'> 노마드 코더 Nomad Coders</a>