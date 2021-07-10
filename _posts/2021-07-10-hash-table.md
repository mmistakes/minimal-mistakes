---
layout: single
title: "Hash Table" 
categories:
  - Python
tags:
  - Python
  - Data structure
---

## 5. Hash Table

### 1. 해쉬 구조
* Hash Table: 키(Key)에 데이터(Value)를 저장하는 데이터 구조
    * Key를 통해 바로 데이터를 받아올 수 있으므로, 속도가 획기적으로 빨라짐
    * 파이썬 딕셔너리(Dictionary) 타입이 해쉬 테이블의 예: Key를 가지고 바로 데이터(Value)를 꺼냄
    * 보통 배열로 미리 Hash Table 사이즈만큼 생성 후에 사용 (공간과 탐색 시간을 맞바꾸는 기법; 공간을 늘리면 충돌로 인한 시간 줄일 수 있음)
    * <span style="color:red"> 단, 파이썬에서는 해쉬를 별도 구현할 이유가 없다 - 딕셔너리 타입 사용하면 됨</span>

### 2. 알아둘 용어
* 해쉬(Hash): 임의 값을 고정 길이로 변환하는 것
* 해쉬 테이블(Hash Table): 키 값을 연산에 의해 직접 접근이 가능한 데이터 구조
* 해싱 함수(Hashing Function): Key에 대해 산술 연산을 이용해 데이터 위치를 찾을 수 있는 함수
* 해쉬 값(Hash Value) 또는 해쉬 주소(Hash Address): Key를 해싱 함수로 연산해서 해쉬 값을 알아내고, 이를 기반으로 해쉬 테이블에서 해당 Key에 대한 데이터 위치를 일관성 있게 찾을 수 있음
* 슬롯(Slot): 한 개의 데이터를 저장할 수 있는 공간
* 저정할 데이터에 대해 Key를 추출할 수 있는 별도 함수도 존재할 수 있음

###  3. 간단한 예

#### 3.1. hash table 만들기
* 참고: 파이썬 list comprehension - https://www.fun-coding.org/PL&OOP5-2.html


```python
hash_table=list([i for i in range(10)])
hash_table
```




    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



#### 3.2. 초간단 해쉬 함수 만들기


```python
def hash_func(key):
    return key%5
```

#### 3.3. 해쉬 테이블에 저장
* 데이터에 따라 필요시 key 생성 방법 정의가 필요함


```python
data1='Andy'
data2='Dave'
data3='Trump'

##ord(): 문자의 ASCII CODE return

print(ord(data1[0]), ord(data2[0]), ord(data3[0]))
print(ord(data1[0]), hash_func(ord(data1[0])))
```

    65 68 84
    65 0


#### 3.3.2. 해쉬 테이블에 값 저장 예
* data:value 와 같이 data와 value를 넣으면 해당 data에 대한 key를 찾아서, 해당 key에 대응하는 해쉬주소에 value를 저장


```python
def storage_data(data, value):
    key=ord(data[0])
    hash_address=hash_func(key)
    hash_table[hash_address]=value
```

#### 3.4. 해쉬 테이블에서 특정 주소의 데이터를 가져오는 함수


```python
storage_data('Andy', '01055553333')
storage_data('Dave', '01044443333')
storage_data('Trump', '01022223333')

def get_data(data):
    key=ord(data[0])
    hash_address=hash_func(key)
    return hash_table[hash_address]

get_data('Andy')
```




    '01055553333'



### 4. 해쉬 테이블의 장단점과 주요 용도
* 장점
    + 데이터 저장/읽기 속도가 빠르다 (검색 속도가 빠름)
    + 해쉬는 키에 대한 데이터가 있는지 (중복) 확인이 쉬움
* 단점
    * 일반적으로 저장공간이 좀 더 많이 필요함
    * __여러 키에 해당하는 주소가 동일할 경우 충돌을 해결하기 위한 별도 자료구조 혹은 알고리즘이 필요함__
* 주요 용도
    * 검색이 많이 필요한 경우
    * 저장, 삭제, 읽기가 빈번한 경우
    * Cache 구현시 (중복 확인이 쉽기 때문)

### 5. 프로그래밍 연습


```python
hash_table=list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key%8

def save_data(data, value):
    hash_address=hash_function(get_key(data))
    hash_table[hash_address]=value
    
def read_data(data):
    hash_address=hash_function(get_key(data))
    return hash_table[hash_address]
```


```python
save_data('Dave', '01033631386')
save_data('Andy', '01033125966')
read_data('Dave')
```




    '01033631386'



### 6. 충돌(Collision) 해결 알고리즘 (좋은 해쉬 함수)

#### 6.1. Chaining 기법
* 개방 해싱 또는 Open Hashing 기법 중 하나; 해쉬 테이블 저자공간 외의 공간을 활용하는 기법
* 충돌이 일어나면, Linked list를 사용해서 데이터를 추가로 뒤에 연결시켜 저장


```python
hash_table=list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key%8

def save_data(data, value):
    index_key=get_key(data)
    hash_address=hash_function(index_key)
    if hash_table[hash_address]!=0:
        for index in range(len(hash_table[hash_address])):
            if hash_table[hash_address][index][0]==index_key:
                hash_table[hash_address][index][1]=value
                return
        hash_table[hash_address].append([index_key,value])
    else:
        hash_table[hash_address]=[[index_key, value]]
    
def read_data(data):
    index_key=get_key(data)
    hash_address=hash_function(index_key)
    if hash_table[hash_address]!=0:
        for index in range(len(hash_table[hash_address])):
            if hash_table[hash_address][index][0]==index_key:
                return hash_table[hash_address][index][1]
        return None
    else:
        return None
    
```


```python
print(hash('SJr')%8)
print(hash('ALata')%8)
```

    7
    7



```python
save_data('SJr', '01033631386')
save_data('ALata', '01651561619')
read_data('SJr')
```




    '01033631386'




```python
hash_table
```




    [0,
     0,
     0,
     0,
     0,
     0,
     0,
     [[249107968159328223, '01033631386'], [-3438398040016001649, '01651561619']]]



#### 6.2. Linear Probing 기법
* __폐쇄 해싱 또는 Close Hashing 기법__ 중 하나; 해쉬 테이블 저장공간 안에서 충돌 문제를 해결하는 기법
* 충돌이 일어나면, 해당 hash address의 다음 address부터 맨 처음 나오는 빈 공간에 저장하는 기법
    * 저장공간 활용도를 높이기 위한 기법


```python
hash_table=list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key%8

def save_data(data, value):
    index_key=get_key(data)
    hash_address=hash_function(index_key)
    if hash_table[hash_address]!=0:
        for index in range(hash_address, len(hash_table)):
            if hash_table[index]==0:
                hash_table[index]=[index_key, value]
                return
            elif hash_table[index][0]==index_key:
                hash_table[index][1]=value
                return
    else:
        hash_table[hash_address]=[index_key, value]

def read_data(data):
    index_key=get_key(data)
    hash_address=hash_function(index_key)
    if hash_table[hash_address]!=0:
        for index in range(hash_address, len(hash_table)):
            if hash_table[index]==0:
                return None
            elif hash_table[index][0]==index_key:
                return hash_table[index][1]
    else:
        return None
```


```python
print(hash('db')%8)
print(hash('dj')%8)
```

    5
    5



```python
save_data('db', '65064606886')
save_data('dj', '54646468450')
read_data('dj')
```




    '54646468450'



#### 6.3. 빈번한 충돌을 개선하는 방법
* 해쉬 함수 재정의 및 해쉬 테이블 저장공간 확대

### 참고: 해쉬 함수와 키 생성 함수
* 파이썬의 hash() 함수는 실행할 때마다, 값이 달라짐
* 유명한 해쉬 함수들; SHA(Secure Hash Algorithm, 안전한 해시 알고리즘) 
    + 어떤 데이터도 유일한 고정된 크기의 고정값을 리턴해주므로 해쉬 함수로 유용하게 활용 가능

#### SHA-1


```python
import hashlib

data='test'.encode() #byte형태로 변환
hash_object=hashlib.sha1()
hash_object.update(b'test') #문자열 앞에 b를 넣으면 byte 형태로 변환
#hash_object.update(data) 위와 동일
hex_dig=hash_object.hexdigest() #hash값을 16진수로 변환
print(hex_dig)
```

    a94a8fe5ccb19ba61c4c0873d391e987982fbbd3


 __SHA-256__


```python
import hashlib

data='test'.encode() #byte형태로 변환
hash_object=hashlib.sha256()
hash_object.update(b'test') #문자열 앞에 b를 넣으면 byte 형태로 변환
#hash_object.update(data) 위와 동일
hex_dig=hash_object.hexdigest() #hash값을 16진수로 변환
print(hex_dig)
```

    9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08


### 이전 예제의 키 생성 함수를 SHA-256 알고리즘으로 변경


```python
import hashlib

hash_table=list([0 for i in range(8)])

def get_key(data):
    hash_object=hashlib.sha256()
    hash_object.update(data.encode())
    hex_dig=hash_object.hexdigest() #16진수 문자열
    return int(hex_dig, 16) #문자열이므로 int형으로 변환

def hash_function(key): 
    return key%8

def save_data(data, value):
    index_key=get_key(data)
    hash_address=hash_function(index_key)
    if hash_table[hash_address]!=0:
        for index in range(hash_address, len(hash_table)):
            if hash_table[index]==0:
                hash_table[index]=[index_key, value]
                return
            elif hash_table[index][0]==index_key:
                hash_table[index][1]=value
                return
    else:
        hash_table[hash_address]=[index_key, value]

def read_data(data):
    index_key=get_key(data)
    hash_address=hash_function(index_key)
    if hash_table[hash_address]!=0:
        for index in range(hash_address, len(hash_table)):
            if hash_table[index]==0:
                return None
            elif hash_table[index][0]==index_key:
                return hash_table[index][1]
    else:
        return None
```


```python
print(get_key('db')%8)
print(get_key('da')%8)
print(get_key('dh')%8)
```

    1
    2
    2



```python
save_data('da', '0108466842')
save_data('dh', '0101516582')
read_data('dh')
```




    '0101516582'



### 7. 시간 복잡도
* 일반적인 경우 (Collision이 없는 경우)는 O(1)
* 최악의 경우 (Collision이 모두 발생하는 경우) O(n)
> 해쉬 테이블은 일반적인 경우를 기대하고 만들기 때문에, 시간 복잡도는 O(1) 이라고 말할 수 있음.





> Ref: https://fun-coding.org/
