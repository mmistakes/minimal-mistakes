---
layout: single
title: "알고리즘 - 백준 python 50(2)"
categories: 알고리즘
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 화성수학, 소음, 시험성적, 세 수 중 두번째로 큰 수, 문자열 반복, 소인수 분해, 수들의 합, 윤년, 평균점수, 최소공배수, 주사위 세개, 백준, python50, 풀이, 답]
toc: true
sidebar:
  nav: "docs"
---

[문제출처 :백준 python 50](https://www.acmicpc.net/workbook/view/459)


### 14번 화성수학
```python

case = int(input()) 

# 화성수학 변환 for 문 
for i in range(case): 
    math = list(map(str,input().split())) # 화성수학 입력
    result = 0
    for j in range(len(math)): # 입력받은 화성수학 갯수 만큼 반복
        if j == 0:
            result += float(math[j]) # 첫번째 인덱스는 result 변수에 float 형으로 더함
        else: 
            if math[j] == "@": # 주어진 화성식에 맞춰 result에 수학식을 적용
                result *= 3
            elif math[j] == "%": 
                result += 5
            elif math[j] == "#":
                result -= 7

    print("%0.2f" % result) # 소숫점 둘째자리까지 출력
```

     3 
     10 @ #


    23.00


     10 20 2


    10.00


     20 30 @


    60.00


### 15번 문자열 반복
```python

n = int(input()) 

for i in range(n): 
    cnt, word = input().split() # 문자열 반복횟수(cnt)와 문자열(word)를 입력받음
    for j in word:
        print(j*int(cnt), end='') # 문자열 하나씩 cnt 곱해줌, end=''통해 붙여서 한줄에 표시
    print() # 개행
```

     3
     3 abc


    aaabbbccc


     2 /HTP


    //HHTTPP


     4 adlafjksd


    aaaaddddllllaaaaffffjjjjkkkkssssdddd


### 16번 소음 
```python


# 숫자 2개와 그 사이에 * 혹은 +를 입력받는다 
a = int(input())
b = input()
c = int(input())

if b == "*": # b가 * 라면 곱해주고 아니면 + 해준다
    print(a*c)
else:
    print(a+c)
```

     1000
     *
     10


    10000


### 17번 소음

```python


s = int(input())

# if와 elif, 마지막 else로 점수별 등급구간을 나눈다
if s >= 90: 
    print("A")
elif s >= 80: 
    print("B")
elif s >= 70:
    print("C")
elif s >= 60:
    print("D")
else: 
    print("F")
```

     100


    A


### 18번 세 수 중 두번째로 큰 수
```python

n = map(int, input().split()) 
    # map 함수 활용해서 type을 지정하고 3개의 요소를 공백기준으로 나눠서 n 변수에 저장

a = sorted(n) # sorted 함수의 디폴트는 오름차순 (작은 수부터)
print(a[1])
```

     30 20 50


    20


### 19번 소인수분해
```python

n = int(input())

if n == 1: # 1이 입력될 경우 '' 출력
    print('')
    
for i in range(2, n+1): # 소인수분해로 들어갈 수 있는 모든 경우의 수 반복(2부터 n까지) 
    
    while n % i == 0: # 입력된 n을 i로 나눈 나머지가 0이 될때 까지 반복 
        print(i)
        n = n / i # n 값을 n/i 값으로 갱신 (i가 n보다 크면 갱신된 n은 바로 0이 됨)
```

     100


    2
    2
    5
    5



```python
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10
```




    55



### 20번 수들의 합

```python


s = int(input()) 
n = 1 # 가장 작은 수 1을 n으로 정의

# 두 수 사이의 합 공식 n*(n+1)/2 적용 (1 ~ 10까지 합 생각해보면 됨)
while n*(n+1)/2 <= s:
    n += 1 # 가장 큰 수 n이 구해질 때까지 n을 1씩 증가시키기

print(n-1) # 공식의 값이 s보다 커지면 n-1이 최대 자연수가 된다
```

     200


    19


### 21번 윤년
```python


a = int(input())

# (4의 배수 '이면서' 100이 배수가 아닐때) 혹은 400의 배수일 때 
if (a % 4 == 0 and a % 100 != 0) or a % 400 == 0:
    print(1)
else:
    print(0)
```

     1999


    0


### 22번 평균점수
```python


sum = 0 # 점수를 더해줄 sum 변 

# 점수의 최소값을 40으로 하는 for 문
for i in range(5): 
    x = int(input())
    if x < 40: 
        sum += 40
    else: 
        sum += x
    
print(int(sum/5))
```

### 23번 최소공배수 (최대공약수로 나눠줌)
```python

num = int(input()) # 반복 횟수 입력 

for i in range(num): 
    a, b = map(int, input().split())
    A, B = a, b 
        # 입력받은 숫자를 A, B에 옮김 
        # a, b 는 최대공약수를 구하는 과정에서 갱신 
    
    # while 문이 종료하면 최대공약수(gcd)인 b가 산출됨
    while a!=0:
        b = b%a # b%a 결과를 b에 대입 (결과가 0이 되면 while문 종료)
        a,b = b,a # a보다 작아진 b를 a에 넣고 기존의 a를 b에 대입
        
    lcm = A*B //b
    print(lcm)
```

     3
     1 45000


    45000


     6 10


    30


     13 17


    221


### 24번 주사위 세개
```python


a, b, c = map(int, input().split())

# 비교 대상이 적어 경우의 수가 적으니 단순하게 구현 
if a == b == c:
    print(10000 + a*1000)
elif a==b or a==c: 
    print(1000 + a * 100)
elif b==c:
    print(1000 + b * 100)
else:
    print(100 * max(a,b,c))
```

     2 2 2


    12000

