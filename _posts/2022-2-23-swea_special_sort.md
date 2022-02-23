---
layout: single
title: "알고리즘 - SWEA 특별한 정렬"
categories: 알고리즘
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 특별한 정렬, 4843,  swea, sw acdemy]
toc: true
sidebar:
  nav: "docs"
---
## SWEA 4843 특별한 정렬

[문제 출처 : SW Expert Academy](https://swexpertacademy.com/main/learn/course/subjectDetail.do?courseId=AVuPDN86AAXw5UW6&subjectId=AWOVF-WqqecDFAWg#)

### 셀렉션 알고리즘 


```python
데이터에서 k번째로 크거나 작은 원소를 찾는 방법
선택정렬 -> 가장 작은 값부터 차례대로 선택하여 위치교환
```

### 문제 및 접근 소개
```python
문제 - 정수 10개(n)를 큰 수와 작은 수 번갈아가며 정렬
```


```python
입력 <- 1 2 3 4 5 6 7 8 9 10
출력 -> 10 1 9 2 8 3 7 4 6 5
```


```python
1. 특별한 정렬을 담을 리스트를 따로 만든다.
2. 규칙에 맞게 하나씩 넣은 뒤 기존 리스트에선 제거한다.
3. 인덱스 0,2,4 .. -> max / 1,3,5 .. min 함수 적용
```

### 코드
```python
T = int(input())
for tc in range(1, T + 1):
    n = int(input())
    arr = list(map(int, input().split()))
    answer = [] # 특별한 정렬을 담을 리스트
    
    for i in range(len(arr)):
        if i % 2 == 0: 
            answer.append(max(arr))
            arr.remove(max(arr))
        else: 
            answer.append(min(arr))
            arr.remove(min(arr))
    # answer 리스트를 공백으로 구분된 문자열로 바꿔주고, 10개까지만 담는다.
    answer = ' '.join(map(str, answer[0:10]))
    print(f'#{tc} {answer}')
```
     1
     20
     3 69 21 46 43 60 62 97 64 30 17 88 18 98 71 75 59 36 9 26
    #1 98 3 97 9 88 17 75 18 71 21

