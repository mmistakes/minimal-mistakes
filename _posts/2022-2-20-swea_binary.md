---
layout: single
title: "알고리즘 - SWEA 이진탐색"
categories: 알고리즘
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 이진, 탐색,  swea, sw acdemy]
toc: true
sidebar:
  nav: "docs"
---

## SWEA LIST_2 이진탐색

[문제 출처 : SW Expert Academy](https://swexpertacademy.com/main/learn/course/subjectDetail.do?courseId=AVuPDN86AAXw5UW6&subjectId=AWOVF-WqqecDFAWg)

1) 시작점과 끝점을 설정하고 중앙값을 기준으로 검색 시작  
2) 검색을 반복할 때마다 count를 증가시켜, 더 적은 쪽을 이기는 걸로.. 


```python
# 이진탐색 함수 정의 
def binary_search(page, target):
    start = 1     # 시작점 
    end = page    # 끝점
    count = 0 # 검색 수행할 때마다 +1 
    
    # 이진탐색 구현하는 while문
    while start <= end: 
        mid = int((start+end) / 2) # 중앙점
        if mid == target: 
            # 중앙점과 target 일치 -> count 리턴
            return count
        elif mid < target: # 중앙점이 타겟보다 작으면
            start = mid # 시작점을 중앙점으로 바꿈 
            count += 1 
        elif mid > target: # 중앙점이 타겟보다 크면
            end = mid  # 끝점을 중앙점으로 바꿈  
            count += 1
```


```python
T = int(input())
for tc in range(1, T + 1):
    page, a, b = map(int, input().split())
    
    count_a = binary_search(page, a) 
    count_b = binary_search(page, b)
    
    if count_a > count_b: 
        result = 'B'
    elif count_b > count_a:
        result = 'A'
    else:
        result = 0 
    
    print(f'#{tc} {result}')
```

     1
     400 300 350


    #1 A
