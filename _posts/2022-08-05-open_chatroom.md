---
layout: single
title:  "오픈채팅방"
categories: Programmers, Class2
tag: [Dictionary]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 오픈채팅방

## 최초 접근법

문제를 보자마자 사용자의 id를 key로하여 value를 최종 닉네임으로만 지정해준다면 아주 쉽게 풀 수 있는 문제라고 생각하였다. 

- 가장 마지막에 Enter 또는 Change된 닉네임이 해당 id의 최종 닉네임이 된다. 따라서 뒤에서부터 검사하면 된다. 

- 만약 같은 id가 또 등장한다면 볼 필요 없다. 왜냐면 어차피 마지막에 등장하였던 닉네임이 최종 닉네임이기 때문이다. 

- 닉네임이 다 정해졌다면, record만 순서대로 확인하여 출력해주면 된다. 

## 코드

```python
d = dict()


def solution(record):
    answer = []

    for r in range(len(record)-1, -1, -1):
        msg = list(map(str, record[r].split(' ')))
        if msg[1] not in d:
            if msg[0] != 'Leave':
                d[msg[1]] = msg[2]
        else: continue

    for i in record:
        i = list(map(str, i.split(' ')))
        if i[0][0] == 'E':
            answer.append(f"{d[i[1]]}님이 들어왔습니다.")
        elif i[0][0] == 'L':
            answer.append(f"{d[i[1]]}님이 나갔습니다.")

    return answer
```

## 설명

최초 접근법과 동일하여 생략한다. 

## 요점 및 배운점

- dictionary의 value가 string형식이라면 수정될 수 없다. 처음에는 이를 간과하고 순서대로 검사하였지만, 이를 금방 알아채고 뒤에서부터 검사하였다. 사사로운 실수를 줄이자.
