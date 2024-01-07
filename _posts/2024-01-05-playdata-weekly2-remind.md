---
layout: single
title: '플레이데이터 2주차 회고 '
categories: playdata
tag: [회고]
author_profile: false
published: true
sidebar:
    nav: "counts"
---

어느덧 플레이데이터 엔지니어링 부트캠프를 들은지 2주차 회고를 써야할 때이다. 순식간에 2024년도 다가왔다..

2주차도 1주차와 마찬가지로 파이썬 기본 문법에 대해 수강했다. 데이터엔지니어링 커리큘럼 상 파이썬 파트는 거의 끝맏쳤다. 

나는 이전 부트캠프와 학부때 전공 수업으로 파이썬을 수강했기 때문에 1주차에는 수업 내용의 90%는 이미 알고있던 내용이라 가벼운 마음으로 들었지만 2주차부터는 배웠지만 잊고있었던, 잘못 이해하고 넘어갔던 내용들이 나오기 시작했다. 

예를들어 파이썬 기본 메소드인 sort()가 있단건 알고있지만 sort(key = [정렬기준]) kwy 값을 기준으로 정렬할 수 다는 내용을 까먹고 있었다..

그 외에도 <span style = "background : #F1F5FE; font-weight:bold;">fiter와 map의 차이, 가변인자, class 메소드(@classmethod), static 메소드(@staticmethod)</span> 등 알지만 모르는 새로운 내용들을 다시 공부하는데 집중했다. 


## 2주차 학습 내용 정리 

### 가변인자(Var args) 파라미터

전달받을 값의 개수가 가변(정해지지 않은경우)일 경우 입력 데이터의 개수는 다양할 것이다. 

#### 1. *변수명 가변인자 : positional argument 

다음 함수처럼 positional argument 의 개수가 정해지지 않은 경우에는 <b>가변인자</b>를 설정할 수 있다!

```python
# 리스트의 모든 원소의 합을 반환하는 함수
def summation(nums): 
    value = 0
    for v in nums:
        value += v
    return value
```

```python
input1 = [1, 2, 10, 20, 6]
input2 = [1, 2, 10]

result1 = summation(input1)
result2 = summation(input2)

print(f"result1 : {result1}")
print(f"result2 : {result2}")

```
```
result1 : 39
result2 : 13
```


```python
print(f"result2 : {summation(input2)}")
```
```
result2 : 11
```


<span style = " font-weight:bold;" >*변수명 가변인자</span>는 전달된 값을 tuple로 받아서 처리하므로  positional arguments 이며, 관례적으로 변수명은 <span style = "color : #3E49E6; font-weight:bold;" >*args</span>로 표현한다. 


```python
def summation_var_args(*nums): 
    print(type(nums))
    value = 0
    for v in nums:
        value += v
    return value

```

```python

result1 = summation_var_args(1, 2, 10, 20, 6)
result2 = summation_var_args( 1, 2, 10)

print(f"result1 : {result1}")
print(f"result2 : {result2}")

```

```python
<class 'tuple'>
<class 'tuple'>
result1 : 39
result2 : 13
```
#### 2. **변수명 가변인자 : keyword argument 

weight, height 를 이용하여  bmi 를 구하는 함수를 구현하면 다음과 같다. 

```python
def print_bmi(weight, height):
    bmi = round(weight/(height**2), 2)
    return bmi

height = 1.8
weight = 75
bmi = print_bmi(weight, height)
print(f"bmi :{bmi}")

```
```python
bmi :23.15
```
argument 를 입력할 때 parameter에 어떤 값을 전달할 것인지 지정해서 호출하는 경우에는 <b>**변수명 가변인자(<span style = "color : #3E49E6; font-weight:bold;">**kwargs</span> )</b>를 사용하여 표현할 수 있다.

```python
def print_bmi_var_args(**info):
    print(type(info))
    print(info)
    bmi = round(weight/(height**2), 2)
    return bmi
bmi = print_bmi_var_args(weight = 75,  height = 1.8)
print(f"bmi :{bmi}")
```
```python
<class 'dict'>
{'weight': 75, 'height': 1.8}
bmi :23.15
```
전달된 값들은 dictionary로 받아서 처리된다 ! 간단한 keyword argument 을 이용하여 값을 입력 밪는 경우 가변인자를 이용해 함수를 간단하게 표현할 수 있다. 

### iterable 관련 함수 : Sort, Map 

#### filter(함수-filter조건, 자료구조)
sorted 함수는 iterable 객체를 정렬할 때 사용하는 함수이다. sorted는 key를 이용하여 정렬기준을 정할 수 있다.   

```python
lst = ["apple", "Cake", "melon", "orange", "strawberry", "Icecream"]
sorted(lst, key = lambda x : len(x))
```
key를 이용하여 쉽게 원소의 글자 수 기준으로 정렬이 가능하다. 

```python
['Cake', 'apple', 'melon', 'orange', 'Icecream', 'strawberry']
```
#### map(함수-처리방식, 자료구조)

map() 함수는 각 원소를 처리결과에 따라 리턴해준다. 

```python
list(map(lambda x : x.upper(), lst))
```

```python
['APPLE', 'CAKE', 'MELON', 'ORANGE', 'STRAWBERRY', 'ICECREAM']
```

--- -

### 정보 은닉 (Information Hiding)

setter/getter 메소드를 이용하여 클래스를 작성하면 다음과 같다. 

```python
class Person:
    
    def __init__(self, name, age, email):
        self.set_name(name)
        self.set_age(age)
        self.set_email(email) 
    
    # getter
    def get_name(self):
        return self.__name

    def get_age(self):
        return self.__age
    
    def get_email(self):
        return self.__email
    
    def set_name(self, name):
        if name:
            self.__name = name 
        else:
            print('이름을 입력하세요')
            self.__name = 'unknown'
            
    def set_age(self, age):
        if age> 0:
            self.__age = age 
        else:
            print('나이를 정확히 입력하세요')
            self.__age = None
                    
    def set_email(self, email):
        if '@' in email and '.com' in email.split('@')[1]:        
            self.__email = email 
        else:
            print("정확한 이메일 형식을 입력하세요")
            self.__email = None
            
    def print_info(self):
        print(f"name : {self.__name}, age : {self.__age}, email : {self.__email}")

p = Person("Ken", 25, 'ken@gmail.com')
p.print_info()

p = Person("Ken", -10, 'kengmail.com')
p.print_info()
```

```python
name : Ken, age : 25, email : ken@gmail.com

나이를 정확히 입력하세요
정확한 이메일 형식을 입력하세요
name : Ken, age : None, email : None
```

####  @property 데코레이터 (decorator) 이용한 접근 제한

- getter메소드: @property 데코레이터를 선언  
- setter메소드: @getter메소드이름.setter  데코레이터를 선언.
    - 반드시 getter 메소드를 먼저 정의한다.
    - setter메소드 이름은 getter와 동일해야 한다.
- getter/setter의 이름을 Attribute 변수처럼 사용한다.

```python
class Person:
    
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email
    
    # attribute들의 값을 반환(알려주는) 메소드 -> getter
    # 메소드이름 -> 사용할 attribute의 이름으로 지정.
    #              @property (decorator)를 선언
    @property
    def name(self):
        return self.__name
    
    @property
    def age(self):
        return self.__age
    
    @property
    def email(self):
        return self.__email
    
    # attribute들의 값을 변경 메소드 -> setter
    # 메소드이름 -> 사용할 attribute의 이름으로 지정.
    #        @getter이름.setter
    @name.setter
    def name(self, name):
        if name:
            self.__name = name 
        else:
            print('이름을 입력하세요')
            self.__name = 'unknown'
    
    @age.setter
    def age(self, age):
        if age> 0:
            self.__age = age 
        else:
            print('나이를 정확히 입력하세요')
            self.__age = None
    
    @email.setter
    def email(self, email):
        if '@' in email and '.com' in email.split('@')[1]:        
            self.__email = email 
        else:
            print("정확한 이메일 형식을 입력하세요")
            self.__email = None

    def print_info(self):
        print(f"name : {self.__name}, age : {self.__age}, email : {self.__email}")
```

@property 데코레이터를 이용하면 get,set 함수를 만들지 않고 클래스 내 변수의 접근 제한을 간단히 구현할 수 있다. 