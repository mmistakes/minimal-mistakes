---
layout: single
title:  "[프로그래머스] 오픈채팅방"
categories: programmers
tag: [python, algolithm, level2, dict, queue, programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 오픈채팅방

[오픈채팅방](https://school.programmers.co.kr/learn/courses/30/lessons/42888)

## 문제 설명
---
카카오톡 오픈채팅방에서는 친구가 아닌 사람들과 대화를 할 수 있는데, 본래 닉네임이 아닌 가상의 닉네임을 사용하여 채팅방에 들어갈 수 있다.

신입사원인 김크루는 카카오톡 오픈 채팅방을 개설한 사람을 위해, 다양한 사람들이 들어오고, 나가는 것을 지켜볼 수 있는 관리자창을 만들기로 했다. 채팅방에 누군가 들어오면 다음 메시지가 출력된다.

"[닉네임]님이 들어왔습니다."

채팅방에서 누군가 나가면 다음 메시지가 출력된다.

"[닉네임]님이 나갔습니다."

채팅방에서 닉네임을 변경하는 방법은 다음과 같이 두 가지이다.
- 채팅방을 나간 후, 새로운 닉네임으로 다시 들어간다.
- 채팅방에서 닉네임을 변경한다.

닉네임을 변경할 때는 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 전부 변경된다.

예를 들어, 채팅방에 "Muzi"와 "Prodo"라는 닉네임을 사용하는 사람이 순서대로 들어오면 채팅방에는 다음과 같이 메시지가 출력된다.

"Muzi님이 들어왔습니다."

"Prodo님이 들어왔습니다."

채팅방에 있던 사람이 나가면 채팅방에는 다음과 같이 메시지가 남는다.

"Muzi님이 들어왔습니다."

"Prodo님이 들어왔습니다."

"Muzi님이 나갔습니다."

Muzi가 나간후 다시 들어올 때, Prodo 라는 닉네임으로 들어올 경우 기존에 채팅방에 남아있던 Muzi도 Prodo로 다음과 같이 변경된다.

"Prodo님이 들어왔습니다."

"Prodo님이 들어왔습니다."

"Prodo님이 나갔습니다."

"Prodo님이 들어왔습니다."

채팅방은 중복 닉네임을 허용하기 때문에, 현재 채팅방에는 Prodo라는 닉네임을 사용하는 사람이 두 명이 있다. 이제, 채팅방에 두 번째로 들어왔던 Prodo가 Ryan으로 닉네임을 변경하면 채팅방 메시지는 다음과 같이 변경된다.

"Prodo님이 들어왔습니다."

"Ryan님이 들어왔습니다."

"Prodo님이 나갔습니다."

"Prodo님이 들어왔습니다."

채팅방에 들어오고 나가거나, 닉네임을 변경한 기록이 담긴 문자열 배열 record가 매개변수로 주어질 때, 모든 기록이 처리된 후, 최종적으로 방을 개설한 사람이 보게 되는 메시지를 문자열 배열 형태로 return 하도록 solution 함수를 완성하라.


## 제한사항
---
![스크린샷 2022-08-02 오전 3 55 45](https://user-images.githubusercontent.com/88064555/182223021-dcec9e2c-83e4-47f2-b919-1931278a9846.png)

## 입출력 예
---
![스크린샷 2022-08-02 오전 3 56 01](https://user-images.githubusercontent.com/88064555/182223133-5bda7d80-cb68-4964-a024-3bab80350166.png)


## 입출력 예 설명
---
입출력 예 #1
문제의 설명과 같다.

# 문제 해석

- 아이디가 따로 있고 아이디에 대응하는 닉네임이 있다.
- 닉네임을 바꾸고 나가면 그동안 출력되었던 나의 닉네임이 바꾼 닉네임으로 출력된다.
- 입력받는 문자의 앞 단어는 Enter, Change, Leave 세개다.
- result 작업은 전부 입력을 받고나서 마지막에 해줘야 한다.
    - 이유는 닉네임을 바꾸게 되면 바뀐 닉네임으로 전부 출력해줘야 하기 때문.


# 풀이

- record의 길이만큼 루프를 돈다.
    - split 함수를 이용해 공백을 기준으로 문자들을 잘라준다.
    - 가장 앞의 문자는 Enter, Change, Leave 세개 중 한개일 것이다.
    - Enter라면?
        - dict에 id에 맞게 닉네임을 넣어준다.
        - queue에 enter, id 값을 넣어준다.
    - Leave라면?
        - queue에 leave, id 값을 넣어준다.
    - Change라면?
        - dict에 id에 맞게 닉네임을 변경해준다.
        - 닉네임을 바꾼것은 출력해줄 필요가 없기 때문에 아무것도 쓰지 않는다.
- queue가 빌때까지 루프를 돌려준다.
    - 명령어와 id 두개를 queue에 집어넣었기 때문에 변수 두개로 popleft 한것을 받아준다.
    - 만약 명령어가 Enter라면?
        - result에 id에 맞는 닉네임과 인삿말을 넣어준다.
    - Leave라면?
        - result에 id에 맞는 닉네임과 인삿말을 넣어준다.


```python
from collections import deque

def solution(record):
    answer = []
    name_list = dict()
    queue = deque()

    for i in range(len(record)):
        a = record[i].split(" ")
        if a[0] == "Enter":
            name_list[a[1]] = a[2]
            queue.append(("E", a[1]))
        elif a[0] == "Leave":
            queue.append(("L", a[1]))
            continue
        else:
            name_list[a[1]] = a[2]
    while queue:
        flag, id = queue.popleft()
        a = ""
        if flag == "E":
            a += name_list[id] + "님이 들어왔습니다."
            answer.append(a)
        elif flag == "L":
            a += name_list[id] + "님이 나갔습니다."
            answer.append(a)
    return answer
    
```

