---
layout: single
title: "알고리즘 - SWEA 색칠하기, 부분집합 "
categories: 알고리즘
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 비트연산자, 색칠하기, &, <<, 부분집합의 합, swea, sw acdemy]
toc: true
sidebar:
  nav: "docs"
---

## SWEA - LIST2 

[문제 출처 : SW Expert Academy](https://swexpertacademy.com/main/learn/course/subjectDetail.do?courseId=AVuPDN86AAXw5UW6&subjectId=AWOVF-WqqecDFAWg)

### 1. 색칠하기

```
1) 색칠영역은 0으로 구성된 2차원 배열로 표시 (10 x 10)  
2) 가로(x)축과 세로(y)축을 이동하며 for문이 진행되며 만나는 좌표마다 +1 
```


```python
T = int(input())
for tc in range(1, T+1):
    n = int(input())
    arr=[[0]*10 for _ in range(10)] # 10 x 10 2차원 배열
    
    cnt = 0 # 보라색될 때마다 하나씩 증가
    
    for _ in range(n):
        x1, y1, x2, y2, color = map(int, input().split())
        for i in range(x1, x2+1): # x축 이동하며 Loof 
            for j in range(y1, y2+1): # y축 이동하며 Loof 
                if arr[i][j] == 1:
                    cnt += 1 # 좌표값 1이라면 이미 한번 만난 곳이므로 보라색 (cnt +1)
                elif arr[i][j] == 0:
                    arr[i][j] += 1 # 처음만난 좌표에 1 추가
                
    print(f'#{tc} {cnt}')
```

### 2. 부분집합의 합

```
- n개 원소집합 -> 비트연산자 << 로 구함   
- 부분집합의 모든 경우의 수는 2의 n승 
```


```python
T = int(input())

for tc in range(1, T+1):
    n, k = map(int, input().split())
    nums = list(range(1,13)) # 1~12 집합 nums 
    cnt = 0 
    # 부분집합 경우의 수만큼 반복 (비트연산자 활용)                
    for case in range(1 << 12): # 1 << 12 는 4096 (2의 12승)
        sub_sum = [] # 부분 집합 원소 담을 리스트
        sum_value = 0 # 부분 집합의 값 
        for i in range(12): 
            if case & (1 << i): # 아래 참고
                sub_sum.append(nums[i]) 
                # sub_sum에 nums[i]을 리스트로 추가하고 
                sum_value += nums[i] # sum_value 에도 num[i] 값 추가 
        if len(sub_sum) == n and sum_value == k:
            # 부분집합 원소갯수가 n개 이고 부분집합의 합이 k 면 cnt 증가
            cnt += 1 
     
    print(f'#{tc} {cnt}')       
```

### if case & (1 << i)  의미

```
비트 연산자는 2진수로 변환해서 비교한다  
case 가 3인 경우는 이진수로 011 이고,     
(1 << i)에서 i가 1인 경우 001, 2인 경우 010, 3인 경우 100 이다.  

011 & 001 = 001 (True) --> 1이 부분집합으로 들어간다.  
011 & 010 = 010 (True) --> 2가 부분집합으로 들어간다.  
011 & 100 = 000 (False)

즉, case가 3인 경우 sub_sum =[1,2] sum_value=3이 된다.
```

