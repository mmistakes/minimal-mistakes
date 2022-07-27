---
layout: single
title:  "문자열 폭발"
categories: BOJ, Class4
tag: [자료 구조, 문자열, 스택]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 9935, 문자열 폭발

## 최초 접근법

문자열에서 쓸 수 있는 replace() 함수를 사용하여 만약에 폭탄이 있는 경우 공란("")으로 replace해준다.

이 접근법의 경우 시간초과가 발생하였다. 

Index를 slice하여 확인하는 방법으로 접근해야 풀 수 있는 문제였다. 

## 최초 코드 

```python
import sys

string = sys.stdin.readline().rstrip()
bomb = sys.stdin.readline().rstrip()
flag = 0

while not flag: # flag가 올라올떄까지 반복
    if bomb in string:
        string = string.replace(bomb, '') # 폭발물 공란으로 대체해준다.
    else:
        if bomb not in string:
            flag = 1

if string == '':
    print('FRULA')
else:
    print(string)
```

## 수정된 코드

```python
import sys

string = sys.stdin.readline().rstrip()
bomb = sys.stdin.readline().rstrip()
bomb_list = [i for i in bomb]
check = []
length = len(bomb)

for i in string: # 입력 문자열의 처음부터 마지막까지
    check.append(i)
    if i == bomb[-1]: # 폭탄의 마지막과 일치한다면
        if check[len(check)-length:len(check)] == bomb_list: # 폭탄이 들어있다면
            for _ in range(length):
                check.pop(-1)

if len(check) == 0:
    print('FRULA')
else:
    print(''.join(check))
```

## 설명

각각의 문자열을 입력받은 후 list에 추가해준다. 이는 폭탄이 들어오는 즉시 바로 확인하기 위함이다.

1. 문자열을 하나씩 입력받는다. 
2. 폭탄의 마지막과 입력이 일치한다면
   - 폭탄이 마지막에 들어왔는지 검사한다.
   - 폭탄이 들어왔다면 폭탄제거 (pop)

![KakaoTalk_20220717_193417089](../../images/2022-07-17-string_bomb/KakaoTalk_20220717_193417089-165805414089513.jpg)

## 요점 및 배운점

- in 함수와 replace()함수를 사용하는 방법이 slice하여 확인하고 pop하는 방법보다 시간복잡도가 높다. 
