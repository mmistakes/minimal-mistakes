# 목차1 - 식별자
- 식별자에 대해 배웁니다. 


```python
1+1
```




    2



## 스네이크 케이스와 캐멀 케이스 
- 각 프로그래밍 언어마다 양식이 존재함
- 클래스를 정의할 때, 앞문자가 대문자여야 함 / CamelCase
- 함수를 정의할 때, snake_case 방식으로 사용해라

# 목차2 - 식별자 구분하기


```python
print() # 소문자
list() # 소문자
class Animal: # 대문자
BeautifulSoup() # 대문자/ CamelCase
```

# 입력과 출력
- input() : 입력
- print() : 출력


```python
var1 = input("아무것나 입력하세요!!!")
print(var1)
```

    아무것나 입력하세요!!! fdjkajfkldajfd
    

    fdjkajfkldajfd
    

- 숫자 출력할 때와 문자를 출력할 때가 다름


```python
print("# 하나만 출력합니다")
print()
print(10, 20, 30)
```

    # 하나만 출력합니다
    
    10 20 30
    

# 자료형과 문자열
- 숫자 : 물건의 가격
- 문자 : 메시지 내용
- 논리 / True or False


```python
print(type("안녕하세요"))
```

    <class 'str'>
    


```python
import pandas as pd 
df = pd.DataFrame({
    'col1' : [1, 2, 3], 
    'col2' : [1, 2, 3], 
})

print(type(df))
```

    <class 'pandas.core.frame.DataFrame'>
    

    C:\Users\pcuser\AppData\Local\Temp\ipykernel_16556\4176926866.py:1: DeprecationWarning: 
    Pyarrow will become a required dependency of pandas in the next major release of pandas (pandas 3.0),
    (to allow more performant data types, such as the Arrow string type, and better interoperability with other libraries)
    but was not found to be installed on your system.
    If this would cause problems for you,
    please provide us feedback at https://github.com/pandas-dev/pandas/issues/54466
            
      import pandas as pd
    

## 문자열 만들기
- 큰 따옴표 방식 / 작은 따옴표 방식
- 결론부터 말하면, 지금은 크게 구분하지 않는다.
- 주의해야 하는 것은 "", '' 식으로 매칭
    + '" <-- 이런것 안됨


```python
print('안녕하세요") 
```


      Cell In[5], line 1
        print('안녕하세요")
              ^
    SyntaxError: unterminated string literal (detected at line 1)
    


- page89 확인


```python
print('"안녕하세요"라고 말했습니다')
```

    "안녕하세요"라고 말했습니다
    


```python
print('"안녕하세요'라고 말했습니다')
```


      Cell In[8], line 1
        print('"안녕하세요'라고 말했습니다')
                              ^
    SyntaxError: unterminated string literal (detected at line 1)
    


## 이스케이프 문자
- \n : 줄바꿈
- \t : 탭
- \\ : 역슬래시(\)를 의미합니다.


```python
print("안녕하세요\n안녕하세요")
```

    안녕하세요
    안녕하세요
    


```python
print("안녕하세요\t안녕하세요")
```

    안녕하세요	안녕하세요
    

## 문자열 연산자 (중요)
- 자주 사용함
- 사칙연산 중에서 덧셈과 곱셈 사용 가능


```python
print(2+2)
print(5-2)
print(6*3)
print(3/6)
```

    4
    3
    18
    0.5
    


```python
print("안녕" + "하세요")
```

    안녕하세요
    


```python
var1 = "안녕"
var2 = "하세요"

result = var1 + var2
print(result)
```

    안녕하세요
    


```python
print("1안녕")
```

    1안녕
    


```python
num1 = 1
var1 = "안녕"

result = num1 + var1
print(result)
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[18], line 4
          1 num1 = 1
          2 var1 = "안녕"
    ----> 4 result = num1 + var1
          5 print(result)
    

    TypeError: unsupported operand type(s) for +: 'int' and 'str'



```python
num1 = "1"
var1 = "안녕"

result = num1 + var1
print(result)
```

    1안녕
    


```python
num3 = "1"
print(type(num3))
```

    <class 'str'>
    


```python
num1 = 1
var1 = "안녕"

result = str(num1) + var1
print(result)
```

    1안녕
    


```python
num2 = 1
result = num1 + num2
print(result)
```

    2
    


```python
var1 = "안녕"
var2 = "하세요"

result = var1 * 3
print(result)
```

    안녕안녕안녕
    

## 문자 선택 연산자(인덱싱): [] 
- 리스트, 튜플 등등 원리는 동일


```python
var1 = "안녕하세요"
print(var1[0]) 
print(var1[3]) 
```

    안
    세
    


```python
var1 = "안녕하세요"
print(var1[-1]) 
print(var1[-2]) 
```

    요
    세
    


```python
var1 = "Hello, Python!!!"
print(var1[6])
```

     
    

## 문자열 범위 선택(슬라이싱) [:]
- 리스트, 튜플 등 자료형과 원리 동일


```python
var1 = "Hello, Python!!!"
print(var1[1:4])
```

    ell
    


```python
var1 = "Hello, Python!!!"
print(var1[7:])
```

    Python!!!
    


```python
var1 = "Hello, Python!!!"
print(var1[:7])
```

    Hello, 
    


```python
var1 = "Hello, Python!!!"
print(var1[100])
```


    ---------------------------------------------------------------------------

    IndexError                                Traceback (most recent call last)

    Cell In[41], line 2
          1 var1 = "Hello, Python!!!"
    ----> 2 print(var1[100])
    

    IndexError: string index out of range



```python
len(var1)
```




    16




```python
var1 = "abababababababababab"
print(var1[0::2])
```

    abababababababababab
    


```python
var1 = "abababababababababab"
print(var1[0:])
```

    abababababababababab
    


```python
var1 = "abababababababababab"
print(var1[0::2])
```

    aaaaaaaaaa
    


```python
var1 = "abababababababababab"
print(var1[1::2])
```

    bbbbbbbbbb
    


```python
var1 = "abababababababababab"
print(var1[::2])
```

    aaaaaaaaaa
    

# 자료형과 숫자

## 지수 표현


```python
0.52273e2
```




    52.273




```python
0.52273e-2
```




    0.0052273



## 사칙연산


```python
6/3
```




    2.0




```python
6+3
```




    9




```python
2.0 + 3
```




    5.0




```python
3 // 2 # // 나누기 연산자
```




    1




```python
5 % 3 # 나머지 연산자
```




    2




```python
2 ** 2
```




    4




```python
3 ** 2
```




    9




```python
number = 100
number = number + 10
print(number)
```

    110
    


```python
number = 100
number += 10
print(number)
```

    110
    


```python
sample_text = "안녕"
sample_text = sample_text + "i"
print(sample_text)
```

    안녕i
    


```python
sample_text = "안녕"
sample_text += "i"
print(sample_text)
```

    안녕i
    

## input() 


```python
num1 = input("숫자를 입력하세요!!")
num2 = int(input("숫자를 입력하세요!!"))

result = int(num1) + num2
print(result)
```

    숫자를 입력하세요!! 5
    숫자를 입력하세요!! 5
    

    10
    


```python
num1 = input("숫자를 입력하세요!!")
num2 = int(input("숫자를 입력하세요!!"))

print(type(num1), type(num2))

result = int(num1) + num2
print(result)
```

    숫자를 입력하세요!! 5
    숫자를 입력하세요!! 5
    

    <class 'str'> <class 'int'>
    10
    


```python
num1 = "52"
num2 = "52.273"

print(int(num1))
print(float(num2))
```

    52
    52.273
    


```python
print(float(num1))
```

    52.0
    

- "52.273"처럼 소숫점이 있는 문자열은 바로 정수 변환이 안됨 (주의)
    + 문자열 ==> 실수형 ==> 정수형


```python
print(int(num2))
```


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    Cell In[79], line 1
    ----> 1 print(int(num2))
    

    ValueError: invalid literal for int() with base 10: '52.273'



```python
print(int(float(num2)))
```

    52
    

# 문자열 포맷팅
- 강사는 f-문자열 좋아함
- `f'문자열{표현식}문자열'`


```python
# {} format() 함수 방식
num1 = 10
"{}".format(num1)
```




    '10'




```python
# f-문자열 방식
num1 = 10
f'{num1}'
```




    '10'



# 문자열의 내장 메서드
- 공식문서 꼭 확인


```python
# Sample strings
string1 = "12345"
string2 = "12345abc"
string3 = "98765"

# Checking if the strings contain only digits
result1 = string1.isdigit()
result2 = string2.isdigit()
result3 = string3.isdigit()

# Printing the results
print(f"'{string1}' contains only digits: {result1}")
print(f"'{string2}' contains only digits: {result2}")
print(f"'{string3}' contains only digits: {result3}")
```

    '12345' contains only digits: True
    '12345abc' contains only digits: False
    '98765' contains only digits: True
    

## 8교시에 할 것
- 문자열 내장 메서드 익히기
- f-문자열 익히기


```python
print("안녕" in "안녕하세요")
```

    True
    


```python
print("안" in "안녕하세요")
```

    True
    


```python
print("안녕허" in "안녕하세요")
```

    False
    


```python
a = "10 20 30 40 50".split(" ")
a
```




    ['10', '20', '30', '40', '50']




```python
a = "10 20 30 40 50".split(sep=" ")
a
```




    ['10', '20', '30', '40', '50']




```python
filename = "sample.file.txt,py.test"
parts = filename.split('.')
print(parts)
```

    ['sample', 'file', 'txt,py', 'test']
    

# 리스트와 튜플


```python
a = list()
b = []
c = [1, 2, 3]
d = ["a", "b", "c"] 
e = [1, 2, "a", None, True]
f = [1, 2, 3, [1, 2, "Hello, Python!!!", None, True]] # Nested List, 중첩 리스트
```


```python
print(a)
print(f)
```

    []
    [1, 2, 3, [1, 2, 'a', None, True]]
    


```python
print(f[3])
```

    [1, 2, 'Hello, Python!!!', None, True]
    


```python
f_a = f[3]
text = f_a[2]
text[7:13]
```




    'Python'




```python
# 중간에 있는 파이썬 뽑기
g = [1, 2, 3, 4, 5, 6, [1, 2, "Hi,,,, !! Python !!! Hello, ", None, True]]
result = g[6][2][10:16]
print(result)
```

    Python
    
