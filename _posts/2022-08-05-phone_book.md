---
layout: single
title:  "전화번호 목록"
categories: Programmers, Class2
tag: [정렬]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 전화번호 목록

## 최초 접근법

처음에는 2중 for문을 이용하여 검사하였다. 하지만, 시간초과가 발생하였다. 

## 최초 코드

```python
def solution(phone_book):
    answer = True

    for a in phone_book:
        for b in phone_book:
            if a == b: continue
            elif len(a) <= len(b):
                for i in range(len(a)):
                    if a[i] != b[i]:
                        break
                else:
                    answer = False
                    continue

    return answer
```

## 설명

- 2중 for문을 이용하여 하나의 list를 검사한다. 

- 만약 같은 원소라면 건너뛴다.

- 길이가 작거나 같아야 접두어가 될 수 있기 때문에 해당 조건을 만족할 때에만 검사한다. 

- 접두어의 가능성이 있는 원소의 index가 한번이라도 다를 경우 즉시 break한다. 

- 만약 break되지 않는다면 접두어에 해당하는 것이므로 False로 바꿔준다. 

위의 코드는 정답은 다 맞지만 시간초과가 발생하였다. 

## 수정된 접근법

전화번호부는 숫자만으로 이루어져있다는 점을 감안하면 sort를 이용하여 접근할 수 있다는 것을 깨달았다. 

- 만약 접두어가 있다면 정렬 시 해당 원소는 접두어의 바로 다음에 등장할 것이다. 

- 또 만약 접두어가 아닌데 바로 뒤에 있는 경우도 발생할 수 있다. 이럴 경우 첫번째 인덱스만 검사하여 바로 확인한다. 

## 수정된 코드

```python
def solution(phone_book):
    answer = True
    if len(phone_book) == 1:
        return answer
    phone_book = sorted(phone_book)
    for i in range(len(phone_book)-1):
        if phone_book[i] in phone_book[i+1] and phone_book[i][0] == phone_book[i+1][0]:
            answer = False

    return answer
```

## 설명

접근 방법은 위의 설명과 동일하다. 

- 전화번호부의 길이가 1이라면 검사할 원소가 없으므로 즉시 return한다. 

1. 전화번호부를 정렬한다. 

2. 처음부터 마지막 바로 앞의 원소까지 검사한다. 

3. 만약 첫번째 인덱스도 같고, 해당 원소를 포함하고 있다면 접두어에 해당한다. 이런 경우 False로 바꿔준다. 

4. 해당되지 않는다면 True를 반환한다. 

## 요점 및 배운점

- 한번의 정렬로 인해 시간복잡도가 절반으로 줄었다. 기본기가 중요하다는 것을 다시금 느낄 수 있는 문제였다. 
