---
layout: single
title:  "문자열 압축"
categories: Programmers, Class2
tag: [문자열]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 문자열 압축

## 최초 접근법

이 문제는 설명이 너무 애매해서 헤메었다. 내가 처음에 이해한 것은 문자열을 하나씩 검사하면서 압축할 수 있는 최대로 압축한 후 가장 문자열 길이가 짧아지는 것의 길이를 반환하는 것이었다. 

**But,** 훨씬 쉬운 문제였다.... 단위만큼 앞에서부터 검사하는 방식이다. 

즉, 만약 abcabcabcdedede일때 2개씩 압축하는 경우를 확인해보자

ab ca bc ab cd ed ed e로 나눌 수 있다. 이 경우 abcabcabcd2ede가 될 것이다. 

만약 내가 처음 이해한대로 풀었다면 abcabcabc3de가 될것이다. 



## 최초 코드

```python
s = input()


def solution(s):
    ans = (len(s), s)

    for i in range(1, (len(s)//2)+1): # 압축단위
        idx = 0 # 인덱스
        cnt = 1 # 반복횟수
        flag = 0
        temp = '' # 최종 압축된 문자열

        ## 인덱스 활용해서 하나씩 확인
        while True:
            if idx >= len(s):
                # print('범위 초과', idx)
                break

            if s[idx:idx+i] == s[idx+i:(idx+i*2)]: # 첫번째 반복 확인되면
                flag += 1
                cnt += 1 # 반복되는 횟수 1증가
                idx += i

                while (idx + i*2) <= len(s) and s[idx:idx+i] == s[idx+i:(idx+i*2)]:
                    cnt += 1
                    idx += i

            else: # 첫번째 반복이 확인되지 않으면 그냥 바로 추가
                temp += s[idx]

            if flag == 1: # 반복이 학인되었다면
                temp += str(cnt) + s[idx-i:idx] # 반복횟수와 반복되는 문자열 추가
                idx += i-1
                cnt = 1 # 횟수 초기화
                flag -= 1 # 플래그 다시 내려줌
            idx += 1  # 인덱스 하나씩 증가하면서 확인
        # print(temp)
        if ans[0] > len(temp):
            ans = (len(temp), temp)
    return ans[0]


solution(s)
```

## 설명

1. 처음 ans를 최초 입력 문자열의 길이와 문자열을 tuple로 저장한다. 

2. 1부터 최대 압축범위까지 for문을 돈다.

   - index를 0부터 확인하여 1씩 증가해주면서 검사한다. 
   - 첫번째 반복이 확인되는 순간
     - flag를 세워주고 반복 횟수 cnt를 1증가한다.
     - 범위를 벗어나지 않으면서 또 반복되는 문자열이 더 나올때까지 반복하면서 index를 i씩 증가해주고 반복횟수 cnt를 1증가해준다.

   - 반복이 확인되지 않으면 해당 문자열을 바로 temp에 붙여준다. 
   - flag가 세워져있다면 즉, 반복이 확인되었다면
     - temp에 반복 횟수와 반복되는 문자열을 붙여준다. 
     - index를 반복이 끝나는 지점까지 더해준다. 
     - cnt와 flag를 각각 1과 0으로 초기화해준다. 

3. 만약 압축된 temp의 길이가 기존 길이보다 더 짧다면 기존 ans를 갱신해준다. 



## 수정된 코드

```python
def solution(s):
    ans = (len(s), s)

    for i in range(1, (len(s)//2)+1): # 압축단위
        idx = 0 # 인덱스
        cnt = 1 # 반복횟수
        flag = 0
        temp = '' # 최종 압축된 문자열

        ## 인덱스 활용해서 하나씩 확인
        while True:
            if idx >= len(s):
                # print('범위 초과', idx)
                break

            if s[idx:idx+i] == s[idx+i:(idx+i*2)]: # 첫번째 반복 확인되면
                flag += 1
                cnt += 1 # 반복되는 횟수 1증가
                idx += i

                while (idx + i*2) <= len(s) and s[idx:idx+i] == s[idx+i:(idx+i*2)]:
                    cnt += 1
                    idx += i

            else: # 첫번째 반복이 확인되지 않으면 그냥 바로 추가
                temp += s[idx:idx+i]
                idx += i

            if flag == 1: # 반복이 학인되었다면
                temp += str(cnt) + s[idx-i:idx] # 반복횟수와 반복되는 문자열 추가
                idx += i
                cnt = 1 # 횟수 초기화
                flag -= 1 # 플래그 다시 내려줌
            # idx += i  # 인덱스 하나씩 증가하면서 확인
        # print(temp)
        if ans[0] > len(temp):
            ans = (len(temp), temp)
    return ans[0]
```



## 설명

기존 코드에서 내가 잘못 이해한 부분만 수정해주면 된다.

기존에 발견되지 않았을때 index를 1씩 증가해주었던 것을 바로 압축 단위만큼 문자열에 붙여주고 index도 그만큼 옯겨주면 된다.



## 요점 및 배운점

- 문제를 잘 이해하지 못해서 더 어렵게 풀었고 헤메었다. 
- 문자열의 indexing을 활용하는 문제였다. 꼬이지 않게 잘 생각하는 스킬이 필요하다.
