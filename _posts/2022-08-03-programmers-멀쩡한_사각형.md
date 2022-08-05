---
layout: single
title:  "[프로그래머스] 멀쩡한 사각형"
categories: programmers
tag: [python, algolithm, level2, gcd, programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 멀쩡한 사각형

[멀쩡한 사각형](https://school.programmers.co.kr/learn/courses/30/lessons/62048)

## 문제 설명
---
가로 길이가 Wcm, 세로 길이가 Hcm인 직사각형 종이가 있습니다. 종이에는 가로, 세로 방향과 평행하게 격자 형태로 선이 그어져 있으며, 모든 격자칸은 1cm x 1cm 크기입니다. 이 종이를 격자 선을 따라 1cm × 1cm의 정사각형으로 잘라 사용할 예정이었는데, 누군가가 이 종이를 대각선 꼭지점 2개를 잇는 방향으로 잘라 놓았습니다. 그러므로 현재 직사각형 종이는 크기가 같은 직각삼각형 2개로 나누어진 상태입니다. 새로운 종이를 구할 수 없는 상태이기 때문에, 이 종이에서 원래 종이의 가로, 세로 방향과 평행하게 1cm × 1cm로 잘라 사용할 수 있는 만큼만 사용하기로 하였습니다. 

가로의 길이 W와 세로의 길이 H가 주어질 때, 사용할 수 있는 정사각형의 개수를 구하는 solution 함수를 완성해 주세요.


## 제한사항
---
- W, H : 1억 이하의 자연수

## 입출력 예
---
```
W	H	result
8	12	80
```


## 입출력 예 설명
---

입출력 예 #1

가로가 8, 세로가 12인 직사각형을 대각선 방향으로 자르면 총 16개 정사각형을 사용할 수 없게 됩니다. 원래 직사각형에서는 96개의 정사각형을 만들 수 있었으므로, 96 - 16 = 80 을 반환합니다.

![img](https://grepp-programmers.s3.amazonaws.com/files/production/ee895b2cd9/567420db-20f4-4064-afc3-af54c4a46016.png)



# 문제 해석

- 정사각형들로 이루어진 W X H 직사각형이 있다.
- 만약 사각형에 꼭지점을 이은 선이 지나가기라도 한다면 이 정사각형은 멀쩡한 사각형으로 보기 어렵다.
- 절대 조금이라도 지나지 않는 사각형만 멀쩡한 사각형이다.


# 풀이

- 최대공약수를 이용한 문제이다.

<p align="center">
<img style="margin:50px 0 10px 0" src="https://user-images.githubusercontent.com/95459089/182899707-06229658-ed1f-44f7-9fe4-92623b5c3b5c.png" alt/>
  <p align = "center">
  8 X 12 직사각형
  </p>
</p> 

- 8과 12의 최대 공약수는 4이다.
- 그래서 (0, 0)과 (8, 12)를 이은 직선이 (2, 3), (4, 6), (6, 9), (8, 12) 이렇게 4점에서 만난다. 
- 4개의 직사각형을 만들어준다.

<p align="center">
<img style="margin:50px 0 10px 0" src="https://user-images.githubusercontent.com/95459089/182902628-79ee7756-a627-4590-874a-734e1cb9bc1e.png" alt/>
  <p align = "center">
  2 X 3 직사각형
  </p>
</p> 

- 2 X 3 직사각형 4개를 만들어준다.
- 최대공약수로 나누게 되면 그 수들은 최대공약수가 존재하지 않게 된다.

<p align="center">
<img style="margin:50px 0 10px 0" src="https://user-images.githubusercontent.com/95459089/182902919-b48060db-9e9d-4fde-8de0-20cd6e644cba.png" alt/>
  <p align = "center">
  3 X 4 직사각형
  </p>
</p> 

- 3 X 4 직사각형도 최대공약수가 없는 직사각형이다.
- 두개를 본다면 최대공약수가 존재하지 않는 직사각형은 각 겹치는 부분을 고려해서 한가지 규칙을 찾을 수 있다.
- 높이 + (밑변 - 1) 만큼 선에 사각형이 겹친다.

- 그래서 8 X 12 직사각형을 보면 2 X 3 직사각형 4개를 선이 지나게 된다.
- 2 X 3 직사각형은 선이 지나가는 사각형이 3 + (2 - 1) = 4이다.
- 4개의 직사각형이 지나가기 때문에 선이 지나가는 사각형의 갯수는 4 * 4 = 16이다.
- 총 정사각형의 갯수는 8 X 12 = 96인데 16개의 정사각형이 온전하지 못하다.
- **점화식**
    - 온전한 정사각형의 갯수 = (w * h) - (w와 h의 최대공약수) * (h + (w - 1))
    - 최대공약수를 곱해주는 이유는 최대공약수의 수만큼 직사각형에 선이 지나가기 때문이다.
- 예외
    - 3 X 3 같은 정사각형의 최대 공약수는 3이다.
    - 그래서 이런 경우는 3개의 정사각형에 선이 깔금하게 지나가기 때문에 전체 사각형의 갯수 - 밑변의 길이 를 해주면 된다.
    


```python
import math

def solution(w,h):
    if w == h:
        return w * h - w
    else:
        a = math.gcd(w, h)
        if a == 1:
            return w * h - (h + w - 1)
        else:
            sum = w * h
            w = w // a
            h = h // a
            return sum - (a * (h + w - 1))
```


# 고찰

- 좌표화해서 생각했으면 쉽게 풀 수 있는 문제였지만 거기까지 가는 과정이 어려웠다.
- 기본적인 수학 문제여서 많은 생각이 필요했다.
