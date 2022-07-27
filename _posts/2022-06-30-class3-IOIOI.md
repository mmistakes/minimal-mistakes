---
layout: single
title:  "IOIOI"
categories: BOJ, Class3
tag: [문자열]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 5525, IOIOI

## 최초 접근법

p를 만들어준 다음 입력받은 문자열을 앞에서부터 검사하는 식으로 풀면 쉽게 풀릴 것이라 생각했다. 

But, 실패

## 50점 코드

```python
n = int(input())
m = int(input())
s = input()

p = 'IO' * n + 'I'

cnt = 0

for i in range(m-2*n):
    if p == s[i:i+(2*n+1)]:
        cnt += 1

print(cnt)
```

## 풀이1

1. p를 만들어준다.
2. 문자열 앞에서부터 순서대로 접근해서 p와 일치하는지 검사한다.
3. 일치한다면 정답 cnt를 1증가시키고 최종적으로 출력한다.

**하지만 이 경우 N과 M에 제약이 없을때 시간초과가 발생한다.**

## 100점 코드

```python
n = int(input())
m = int(input())
s = input()

ans, index, cnt = 0, 0, 0

while index < m-1:
    if s[index:index+3] == 'IOI':
        cnt += 1

        if cnt == n:
            ans += 1
            cnt -= 1
        index += 1
    else:
        cnt = 0
    index += 1

print(ans)
```

## 풀이2

IOI가 n번만큼 반복되는지의 여부를 체크하고 모든 index를 검사하면 반복문을 빠져나온다. 

1. IOI가 발견되면 cnt를 1증가시킨다.
2. 만약 cnt가 n과 같아진다면 p가 발견된 것과 같다.
3. 이 경우 발견 횟수 ans를 1증가시키고 cnt를 1감소시킨다.
   - 연속해서 또, p가 발견될 수 있기 때문에 cnt를 초기화하는 것이 아니라 1감소시킨다. 
4. p의 발견 여부와 관계없이 index를 1증가시켜 다음 index를 검사한다. 
5. 만약 IOI가 발견되지 않는다면 p가 나올 수 없기 때문에 cnt를 0으로 초기화시킨다.
6. IOI의 발견 여부와 관계없이 index를 1증가시킨다.
   - 만약 p가 발견된다면 최종적으로 index는 2가 증가된 것이다. 따라서 바로 다음의 I를 검사할 수 있다. 

## 요점 및 배운점

1. 이 문제의 핵심은 문자열 문제에서 index를 자유자재로 검사하고 생각할 수 있는가를 묻는 것 같았다. 
2. IOI의 단순 반복을 체크하는 것이기 때문에 굳이 p를 만들어 일일이 검사할 필요가 없었다. 

### 시간초과 탈출법

- p를 만들지 않고 IOI의 반복성을 이용하여 n번 반복되었는지의 유무만으로 p의 유무를 체크한다. 
- IOI가 발견되지 않는 경우 바로 다음 index로 넘어간다.
- p가 발견된 경우 index를 2번 증가시켜 'O'가 아니라 다음의 'I'부터 검사할 수 있도록 한다. 
