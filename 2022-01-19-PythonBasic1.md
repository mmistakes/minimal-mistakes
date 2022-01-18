#### *Jupyter notebook 명령어
[Command Mode] <br>
A : **위쪽에 셀 삽입** <br>
B : **아래쪽에 셀 삽입** <br>
d+d : **셀삭제** <br>
h : 단축키 도움말 <br>

[Edit Mode] <br>
Ctrl + Enter : **현재 셀 실행** <br>
Shift + Enter : **현재 셀 실행 후 아래 셀로 이동**<br>

-----------------------------------------

# Python 실무 기초
## 1. 기초 문법

### (1) 변수 선언
##### 데이터 타입 (자료형)종류
- 정수 : int
- 실수 : float
- 문자열 : str


###### **변수명 규칙** 
- 숫자로 시작할 수 없다.
- 띄어쓰기를 사용할 수 없다.
- 한글을 사용할 수 없다.
- 관례적으로 가변적인 변수는 소문자로, 상수는 대문자로 표기한다.


```python
a = 1      # 정수 (int)
b = 1.5    # 실수 (float)
c = "대한" # 문자열 (str)
d = '민국' # 문자열 (str)
```


```python
print(a + a) # 정수
print(a + b) # 실수
print(b + b) # 실수
print(c + d) # 문자열
```

    2
    2.5
    3.0
    대한민국
    

### (2) 산술 연산자


```python
a = 1
b = 2
c = 10
print(a + b) # 3
print(a - b) # -1
print(a / b) # 0.5
print(a * b) # 2
```

    3
    -1
    0.5
    2
    


```python
print(b ** c) # 1024
print(c // a) # 10
print(b % a)  # 0
```

    1024
    10
    0
    

### (3) 출력 (print)


```python
a = "AB"
b = "CD"
print(a)     # AB
print(a,b)  # AB CD
print(a + b) # ABCD

a = 3 # 숫자
b = "ABC"
print(a, b)    # 3 ABC
# print(a + b) # 에러
```

    AB
    AB CD
    ABCD
    3 ABC
    


```python
print("a의 값은 " + str(a) + " 입니다.")
print(f"a의 값은 {a} 입니다.")
```

    a의 값은 3 입니다.
    a의 값은 3 입니다.
    

### (4) if 문


```python
a = 70
b = 100

if a > b:
    print("a가 b보다 큽니다.")
else:
    print("ABS")
```

    ABS
    

### (5) for 문


```python
a = 10
for i in range(5):
    a += i
    print(a)
```

    10
    11
    13
    16
    20
    


```python
a = 10
for i in range(10,15):
    a += i
    print(a)
```

    20
    31
    43
    56
    70
    

### (6) while 문


```python
cnt = 1
while cnt < 10:
    print(cnt)
    cnt += 1
```

    1
    2
    3
    4
    5
    6
    7
    8
    9
    


```python
cnt = 1
while True:
    print(cnt)
    cnt += 1
    if cnt > 10:
        break
```

    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    

### (7) 리스트(list) & 딕셔너리(dict)


```python
a = [1, 2, 4]


a.pop() # 맨 뒤에 데이터 빼기
print(a) #[1,2]

a.insert(0, 10) # 맨 앞에 데이터 넣기
print(a) #[10,1,2]

a.index(2)
```

    [1, 2]
    [10, 1, 2]
    




    2




```python
b = [4, 5, 6]
```


```python
a = {"서울":"02","인천":"032"}

print(a)
print(a.items())
print(a.keys())
print(a.values())
```

    {'서울': '02', '인천': '032'}
    dict_items([('서울', '02'), ('인천', '032')])
    dict_keys(['서울', '인천'])
    dict_values(['02', '032'])
    


```python
a["서울"]
```




    '02'




```python
# map & filter Example

# list(map(int, a))
# list(filter(lambda x: x > 0, range(-5,10)))
```

### (8) pass, break, continue


```python
a = 100

if a > 50:
    pass
else:
    print("TEST")

```


```python
# 5 ~ 7에서만 출력
for i in range(10):
    if i < 5:
        pass
    elif i > 7:
        break
    else:
        print(i)
```

    5
    6
    7
    


```python
for i in range(5):
    print(i)
    
```

    0
    1
    2
    3
    4
    

### (9) 함수


```python

# Position argument
def func(param1, param2):
    result = param1 + param2
    return result

a = func(1, 2)
print(a)
```

    3
    


```python
# Keyword argument
def func2(key="KOREA", value=1004):
    print(key)
    print(value)
    
tmp = func2(key="중국",value=100)
print(tmp)
```

    중국
    100
    None
    


```python
# Position argument Unpacking
def func3(*args):
    hap = 0
    for i in args:
        hap += i
    return hap

func3(10, 20, 30,40,50,100)
```




    250




```python
# Keyword argument Unpacking
def func4(**kargs):
    return kargs

func4(a = 123, b = 345, c=111)
# func4(**{"서울":"02","인천":"032"})
```




    {'a': 123, 'b': 345, 'c': 111}



### 참고) class


```python
class model():
    
    def __init__(self):
        self.A = 1
        self.B = 2
    
    def run(self):
        return self.A
    
    def hap(self):
        return self.A + self.B
```


```python
a = model()
```


```python
a.hap()
```




    3


