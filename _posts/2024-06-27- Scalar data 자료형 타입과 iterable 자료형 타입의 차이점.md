## 리스트와 튜플
 - 리스트 선언 후, 인덱싱 & 슬라이싱


```python
list_a= [273, 32,'A',True,[1,2,3]]
list_a[0]
```




    273




```python
list_a= [273, 32,'A',True,[1,2,3]]
list_a[4][1]
```




    2




```python
list_a[-1] #맨 뒷값 출력시 사용
```




    [1, 2, 3]




```python
list_a[5]
```


    ---------------------------------------------------------------------------

    IndexError                                Traceback (most recent call last)

    Cell In[6], line 1
    ----> 1 list_a[5]
    

    IndexError: list index out of range



```python
#p.196
list_a=[1,2,3]
list_b=[5,6,7]
list_a+list_b
```




    [1, 2, 3, 5, 6, 7]




```python
list_a * 3
```




    [1, 2, 3, 1, 2, 3, 1, 2, 3]




```python
list_a + 4
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[12], line 1
    ----> 1 list_a + 4
    

    TypeError: can only concatenate list (not "int") to list



```python
list_a + [4]
```




    [1, 2, 3, 4]




```python
list_a + list('a')
```




    [1, 2, 3, 'a']




```python
list_a + list('1')
```




    [1, 2, 3, '1']



- 리스트 값 바꾸고 싶을 때


```python
list_a= [273, 32,'A',True,[1,2,3]]
#list_a[인텍스번호] = 새로운 값
list_a[2] = 410
list_a

```




    [273, 32, 410, True, [1, 2, 3]]




```python
len(list_a)
```




    5



[append method](https://docs.python.org/ko/3/tutorial/datastructures.html)

[Using Lists as Stacks](https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks)

## append()와 insert()


```python
list_a = [1,2,3]
list_a.append(4)
list_a.append("a")
list_a
```




    [1, 2, 3, 4, 'a']




```python
list_a.insert(1,100)
list_a
```




    [1, 100, 2, 3, 4, 'a']




```python
list_a.apend(4)
```


    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    Cell In[31], line 1
    ----> 1 list_a.apend(4)
    

    AttributeError: 'list' object has no attribute 'apend'


^ error 
 - 1. 공식 문서에 있는지 확인


## extend() p.201
 - extend() 함수는 매개변수로 리스트를 입력
 - [LIST_EXTEND(i)](https://docs.python.org/ko/3/library/dis.html#opcode-LIST_EXTEND)

## 인덱스로 제거하기 : del 키워드 , pop() 키워드 
p.203


```python
list_a = ["a","b","c","d"]
del list_a[0]
list_a
```




    ['b', 'c', 'd']



## pop 
- "리스트에서 주어진 위치의 항목을 제거하고 반환합니다. 인덱스가 지정되지 않은 경우, a.pop()은 리스트의 마지막 항목을 제거하고 반환합니다. 만약 리스트가 비어 있거나 인덱스가 리스트 범위를 벗어나면 IndexError가 발생합니다."
- [출처](https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks)


```python
list_a.pop()

list_a
```




    ['b']




```python
list_a = ["a","b","c","d"]
del list_a[0:2]
list_a
```




    ['c', 'd']



## 값으로 제거하기
 - 인덱스 번호가 아닌 실제 값을 의미한다.


```python
list_a = ["a","b","c","d"]
list_a.remove(1)
list_a
#해당 코드에서 발생하는 오류는 ValueError: list.remove(x): x not in list입니다. 이 오류는 remove() 메소드를 사용하여 리스트에서 존재하지 않는 항목을 제거하려고 할 때 발생합니다
#코드에서 list_a는 문자열들의 리스트입니다. 그런데 list_a.remove(1)을 호출하면, Python은 list_a에서 1이라는 항목을 찾아 제거하려고 시도합니다12. 그러나 list_a에는 1이라는 항목이 없습니다. 따라서 Python은 ValueError를 발생시키며, 해당 항목이 리스트에 없다는 것을 알려줍니다.

#이 오류를 해결하려면, 제거하려는 항목이 리스트에 있는지 먼저 확인해야 합니다.
```


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    Cell In[47], line 2
          1 list_a = ["a","b","c","d"]
    ----> 2 list_a.remove(1)
          3 list_a
    

    ValueError: list.remove(x): x not in list



```python
list_a = ["a","b","c","d"]
list_a.remove("a")
list_a
```




    ['b', 'c', 'd']




```python
#공백도 지우기 가능
list_a = ["a","b"," ","d"]
list_a.remove(" ")
list_a
```




    ['a', 'b', 'd']



## 모두 제거하기


```python
list_a = ["a","b","c","d"]
list_a.clear()
list_a
```




    []



## 리스트 정렬하기 : sort()
- [sort 공식 문서](https://docs.python.org/ko/3/library/stdtypes.html#list.sort)
- **sort(*, key=None, reverse=False)**
- "이 메소드는 리스트를 제자리에서 정렬하며, 항목 간의 비교는 오직 < 비교만을 사용합니다. 예외는 무시되지 않습니다
- 만약 어떤 비교 작업이 실패하면 전체 정렬 작업이 실패하게 되며(그리고 리스트는 아마도 부분적으로 수정된 상태로 남게 될 것입니다)."


```python
list_a =[52,273,103,32]
list_a.sort()
list_a
```




    [32, 52, 103, 273]




```python
list_a.sort(reverse=True)
list_a
```




    [273, 103, 52, 32]



## 리스트 내부에 있는지 확인하기
### in/not in 연산자
 - 문자열과 비슷


```python
"a" in "abc"
```




    True




```python
273 in [52,273,103,32]
```




    True



## 튜플 (p.317)
- 리스트와 비슷한 자료형
- 인덱싱,슬라이싱 모두 가능


```python
tuple_test = (10,20,30)
tuple_test
```




    (10, 20, 30)




```python
tuple_test = (10,20,30,40,50,60)
tuple_test
```




    (10, 20, 30, 40, 50, 60)




```python
tuple_test[0]
```




    10




```python
#튜플 값 변경
tuple_test[0] = 100

```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[62], line 2
          1 #튜플 값 변경
    ----> 2 tuple_test[0] = 100
    

    TypeError: 'tuple' object does not support item assignment


1. 가변성: 리스트는 가변적(mutable)입니다, 즉 리스트의 항목은 변경될 수 있습니다. 반면에 튜플은 불변(immutable)입니다, 즉 튜플의 항목은 한 번 생성되면 변경할 수 없습니다1.
2. 메모리 사용량과 속도: 튜플은 리스트에 비해 더 적은 메모리를 필요로 하며, 속도가 빠릅니다
따라서, 프로그램이 실행되는 동안 값이 변경되면 안 되는 경우에는 튜플을 사용하면 좋습니다.
반면에 항목을 추가, 제거, 변경해야 하는 경우에는 리스트를 사용하는 것이 더 적합합니다

## 딕셔너리
[Mapping Types — dict](https://docs.python.org/3/library/stdtypes.html#typesmapping)
 - Web 관련 자료형 중에서 json 형태와 유사
 - pandas 데이터프레임을 만들 때도 매우 자주 사용
 - 사전식 구성 연상
 - + 키워드 입력 ==> 다양한 의미
   + Love, 동사, 명사 등등 

 딕셔너리는 키(Key)와 값(Value)의 쌍으로 이루어진 데이터를 저장하는 자료형입니다.

딕셔너리는 중괄호 {} 안에 <키>: <값> 형태의 데이터 쌍을 쉼표 ,로 구분해서 나열하여 생성할 수 있습니다.
딕셔너리는 가변(mutable) 자료형이므로, 생성 후에도 새로운 키에 값을 추가하거나 기존 키의 값을 변경 또는 삭제할 수 있습니다. 
또한, 딕셔너리의 키로는 해시 가능한(hashable) 모든 데이터를 사용할 수 있으며, 값에 대해서는 아무런 제한 없이 어떤 자료형의 데이터도 저장할 수 있습니다.

딕셔너리는 데이터를 효율적으로 저장하고 검색하는 데 매우 유용하며, Python 프로그래밍에서 자주 사용됩니다


```python
dict_a = {
    "name" : "어벤저스 엔드게임",
    "type" : "히어로 무비", 
    "director" : ["안소니 루소","조 루소"],
    "year" : 2019
}
dict_a 
```




    {'name': '어벤저스 엔드게임',
     'type': '히어로 무비',
     'director': ['안소니 루소', '조 루소'],
     'year': 2019}




```python
##딕셔너리 ==> 리스트 ==> 문자열과 자료형이 막 바뀌더라
dict_a['director'][0][0:3]
```




    '안소니'




```python
print(dict_a['director'][0])
#어떤 자료형인지 파악
```

    안소니 루소
    


```python
dict_a['Director']
#대소문자 구분함
```


    ---------------------------------------------------------------------------

    KeyError                                  Traceback (most recent call last)

    Cell In[72], line 1
    ----> 1 dict_a['Director']
    

    KeyError: 'Director'



```python
#key 값 설정 시, 무조건 따옴표 사용 
dict_key = {
    'name' : "값 설정 "
}
dict_key
```




    {'name': '값 설정 '}




```python
#key 값 설정 시, 무조건 따옴표 사용 
dict_key = {
    name : "값 설정 "
}
dict_key
```


    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    Cell In[75], line 3
          1 #key 값 설정 시, 무조건 따옴표 사용 
          2 dict_key = {
    ----> 3     name : "값 설정 "
          4 }
          5 dict_key
    

    NameError: name 'name' is not defined



```python
#key 값 설정 시, 무조건 따옴표 사용 
dict_key['새로운 키'] = "새로운 값"
dict_key['price'] = [1,2,3,4,5]
dict_key['새로운 딕셔너리'] = {'a' : 1, 'b':[1,2,3]}
   
dict_key
```




    {'name': '값 설정 ',
     '새로운 키': '새로운 값',
     'price': [1, 2, 3, 4, 5],
     '새로운 딕셔너리': {'a': 1, 'b': [1, 2, 3]}}




```python
del dict_key['새로운 딕셔너리']
dict_key
```




    {'name': '값 설정 ', '새로운 키': '새로운 값', 'price': [1, 2, 3, 4, 5]}




```python
#실습
#나의 tmi 사전 만들어보기_생성

my_dict_tmi = {
    'name' : '김 아무개',
    'age' : '2441',
    'my phone' : '갤럭시 s23',
    'favorit color' : 'pink'
}
my_dict_tmi
```




    {'name': '김 아무개',
     'age': '2441',
     'my phone': '갤럭시 s23',
     'favorit color': 'pink'}




```python
#실습
#나의 tmi 사전 만들어보기_키
my_dict_tmi.keys() 
```




    dict_keys(['name', 'age', 'my phone', 'favorit color'])




```python
#실습
#나의 tmi 사전 만들어보기_값
my_dict_tmi.values()
```




    dict_values(['김 아무개', '2441', '갤럭시 s23', 'pink'])




```python
#실습
#나의 tmi 사전 만들어보기_추가
my_dict_tmi['food']="milktea"
my_dict_tmi
```




    {'name': '김 아무개',
     'age': '2441',
     'my phone': '갤럭시 s23',
     'favorit color': 'pink',
     'food': 'milktea'}




```python
dict_key.keys()
```




    dict_keys(['name', '새로운 키', 'price'])




```python
dict_key.values()
```




    dict_values(['값 설정 ', '새로운 값', [1, 2, 3, 4, 5]])




```python
dict_key.values().append('dfdf')
##append() 함수는 list 함수라서 딕셔너리에선 사용안됨
```


    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    Cell In[85], line 1
    ----> 1 dict_key.values().append('dfdf')
    

    AttributeError: 'dict_values' object has no attribute 'append'


## 조건문 
- 00조건을 마족한다 ==> True
- 그러면, 우리가 옷을 사야지!
- 00조건을 만족하지 못함 ==> False
   + 남의 옷을 얻어 입어야지

- if-else 


```python
a = 1
if a>= 1:                       #해당되는 조건식을 만드는 것이 핵심
    print("1보다 큼")
else:
    print("1 보다 작음")
```

    1보다 큼
    


```python
#실습

a, b  = input().split()
a = int(a)
b = int(b)

if (a==b):
    print(true)
else:
    print(False)
```

     3 5
    

    False
    


```python
number = input("정수입력>")
number = int(number)

if number > 0:
 print("양수")

if number < 0:
 print("음수")

if number == 0:
 print("0입니다")
```

    정수입력> 4
    

    양수
    


```python
#시나리오
#- 여러분의 돈이 00 있음
#- 파이브가이즈 햄버거 세트 가격이 35000원 이라고 함
#- 햄버거 먹을 수 있는 상황/그렇지 못한 상황에 대해서 프로그래밍 하세요!


money = int(input())
price = 35000                 #변수 설정 해주기
s = price-money

if money >= 35000:
    print("파이브 가이즈 햄버거 먹을 수 있습니다.")

else:
 print(s, "원 부족하여 햄버거를 먹을 수 없습니다." )

```

     4555555
    

    파이브 가이즈 햄버거 먹을 수 있습니다.
    

## 날짜/시간 활용하기
 - [detetime (파이썬 기본 라이브러리)](https://docs.python.org/3/library/datetime.html)
 - [pandas to_datetime](https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html)


```python
#datetime source code
try:
    from _datetime import *
    from _datetime import __doc__
except ImportError:
    from _pydatetime import *
    from _pydatetime import __doc__

__all__ = ("date", "datetime", "time", "timedelta", "timezone", "tzinfo",
           "MINYEAR", "MAXYEAR", "UTC")
```


```python
import datetime

#현재 날짜/시간 구하기
now =datetime.datetime.now()
now
```




    datetime.datetime(2024, 6, 27, 14, 39, 55, 641475)




```python
print(f'{now.year}년 {now.month}원 {now.day}일')
```

    2024년 6원 27일
    

## if else와 elif 구문


```python
now =datetime.datetime.now()
month = now.month

if 3 <= month <=5:
    print ("봄")
    
elif 6 <= month <=8:
    print("여름")
    
elif 9 <= month <=11:
    print("가을")
else:
    print("겨울")
```

    여름
    

## for 반복문 
 - p.207
 - 몇 번을 반복해야 하는지 사용자가 가정


```python
for i in range(3) : #처음에 범위 지정 할 때 , 3번 정도 확인 후 => 확정
    print("출력")
    
```

    출력
    출력
    출력
    

## while 반복문
 - 조건문이 참이면 계속 수행
 - 예) 게임 자동사냥
    + 지동 사냥 버튼 ==> true



```python
##p.209
array = [273,32,103,57,52]

for element in array:
    print(element)
```

    273
    32
    103
    57
    52
    


```python
array = ['a','b','c','d','e']

for element in array:
    print(element)
```

    a
    b
    c
    d
    e
    


```python
text = 'abc'

for element in text:
    print(element)
```

    a
    b
    c
    


```python
tuple = (1,3,4)


for element in tuple:
    print(element)
```

    1
    3
    4
    

##### 문제 
 - 반복문을 쓰고 싶음 . 근데 iterable만 가능
 - 문제 : 자료형이 iterable인지 아닌지 알고 싶음. 그래서 iterable이면 반복문 수행하도록 if-조건문 만들기


```python
list_of_list = [[1, 2, 3], [4, 5, 6, 7], [8, 9]]
list_of_list

for items in list_of_list:
    print(items)
    for item in items:
        print(item)
```

    [1, 2, 3]
    1
    2
    3
    [4, 5, 6, 7]
    4
    5
    6
    7
    [8, 9]
    8
    9
    


```python
#구국단
num1 = [2,3,4,5,6,7,8,9]
num2 = [2,3,4,5,6,7,8,9]
for i in num1:
  #  print(i)  # 이중 for문 사용할 때 중간중간 print로 확인해주기.
    for j in num2:
           print(f"{i} * {j} = {i*j}")

```

    2 * 2 = 4
    2 * 3 = 6
    2 * 4 = 8
    2 * 5 = 10
    2 * 6 = 12
    2 * 7 = 14
    2 * 8 = 16
    2 * 9 = 18
    3 * 2 = 6
    3 * 3 = 9
    3 * 4 = 12
    3 * 5 = 15
    3 * 6 = 18
    3 * 7 = 21
    3 * 8 = 24
    3 * 9 = 27
    4 * 2 = 8
    4 * 3 = 12
    4 * 4 = 16
    4 * 5 = 20
    4 * 6 = 24
    4 * 7 = 28
    4 * 8 = 32
    4 * 9 = 36
    5 * 2 = 10
    5 * 3 = 15
    5 * 4 = 20
    5 * 5 = 25
    5 * 6 = 30
    5 * 7 = 35
    5 * 8 = 40
    5 * 9 = 45
    6 * 2 = 12
    6 * 3 = 18
    6 * 4 = 24
    6 * 5 = 30
    6 * 6 = 36
    6 * 7 = 42
    6 * 8 = 48
    6 * 9 = 54
    7 * 2 = 14
    7 * 3 = 21
    7 * 4 = 28
    7 * 5 = 35
    7 * 6 = 42
    7 * 7 = 49
    7 * 8 = 56
    7 * 9 = 63
    8 * 2 = 16
    8 * 3 = 24
    8 * 4 = 32
    8 * 5 = 40
    8 * 6 = 48
    8 * 7 = 56
    8 * 8 = 64
    8 * 9 = 72
    9 * 2 = 18
    9 * 3 = 27
    9 * 4 = 36
    9 * 5 = 45
    9 * 6 = 54
    9 * 7 = 63
    9 * 8 = 72
    9 * 9 = 81
    

## 리스트 컴프리헨션
- pythonic 한 코드
- **반복문을 한 줄로 처리**
- **결과값은 리스트로 반환**


```python
a = [1,2,3,4]
result = []
for num in a:
    print(num*3)
    result.append(num*3)
    result

```

    3
    6
    9
    12
    


```python
b = [1,2,3,4]
result2 = [num *3 for num in b]
result2
```




    [3, 6, 9, 12]




```python
num1 = [1,2,3,4]
num2 = [10,20,30,40]
for n1,n2 in zip(num1,num2):
    print(n1,n2)
```

    1 10
    2 20
    3 30
    4 40
    


```python
#아래 코드를 리스트 컴프리헨션으로 변경하세요
num1 = [1, 2, 3, 4]
num2 = [10, 20, 30, 40]
result = []
for n1, n2 in zip(num1, num2):
    print(n1, n2, n1 * n2)
    result.append(n1 * n2)
result
```

    1 10 10
    2 20 40
    3 30 90
    4 40 160
    




    [10, 40, 90, 160]




```python
a= [ n1*n2 for n1,n2 in zip(num1,num2)]
print(a)
```

    [10, 40, 90, 160]
    


```python

```
