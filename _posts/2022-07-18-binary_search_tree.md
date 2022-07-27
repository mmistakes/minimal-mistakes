---
layout: single
title:  "이진 검색 트리"
categories: BOJ, Class4
tag: [그래프 이론, 그래프 탐색, 트리, 재귀]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 5639, 이진 검색 트리

## 최초 접근법

최초의 접근법은 조금 무식했던 것 같다...

1. 입력 받은 수들로 이진 트리를 만든다.
2. 후위 순회로 출력한다.

이 방법은 가능은 하겠으나 코드가 꽤나 어려워질 것이고, 시간초과가 발생할 것이라 예상했다. 

## 코드

```python
import sys

sys.setrecursionlimit(10 ** 6)

tree = []

while True:
    try:
        n = int(input())
        tree.append(n)
    except:
        break


def recurs(start, end):
    if start >= end:
        return

    root = tree[start]
    temp = 0

    if tree[end-1] <= root:
        recurs(start+1, end)
        print(root)
        return

    for i in range(start+1, end):
        if tree[i] > root: # 트리의 루트보다 커지는 경우
            temp = i
            break

    recurs(start+1, temp)
    recurs(temp, end)
    print(root)

recurs(0, len(tree))
```



## 설명

이 문제는 입력이 몇개 주어진다는 조건이 없다. 

- while 무한 반복문 속에서 try - except를 이용하여 입력받아야한다. 

입력이 전위 순회로 들어온다. 이를 List에 저장한 후 해당 리스트를 계속해서 '루트 - 왼쪽 트리 - 오르쪽 트리' 로 나눠주는 것이다. 이를 재귀를 이용하여 반복한다. 

![KakaoTalk_20220718_143106400](../../images/2022-07-18-binary_search_tree/KakaoTalk_20220718_143106400.jpg)

위 그림을 참고하면 조금은 이해에 도움이 될 것이다. 

1. 시작 index가 끝 index보다 크거나 같은 경우 return한다.
   -  이는 더이상 내려갈 트리가 없는 경우이다. 
2. 끝 index의 바로 앞 index가 root 즉, 시작 index의 값보다 작아진다면 
   - 이것은 마지막 트리 즉, base case에 해당한다는 것이다. 순서대로 루트 - 왼쪽 - 오른쪽 이렇게 3개의 인덱스만 남은 경우이기 때문이다. 
   - 이 경우 시작 index바로 앞 index와 끝 index만 재귀를 실행해준 후 루트를 출력한다. 왜냐하면 오른쪽 트리에서의 재귀는 그 이전에 실행되었기 때문이다. 

3. 1, 2에 해당하지 않는다면 root보다 커질 때까지 for문을 통해 검사한다. 만약 root보다 커지는 순간이 온다면
   - 커지는 해당 index를 temp에 저장한다. 
   - temp를 기준으로 왼쪽 트리를 다시 재귀
   - temp부터하여 오른쪽 트리를 재귀
   - 위 두 재귀가 끝난다면 좌, 우측 트리를 모두 돌고 온 것이므로 root를 출력한다. 

## 요점 및 배운점

- 입력받는 횟수가 주어지지 않을 때 try - except 문을 이용할 수 있다는 것을 배웠다. 
- 재귀를 이용한 트리 탐색 문제였다. 재귀에 익숙하지 않아 꽤나 이해하는데 어려웠다. 2진 트리에서는 재귀가 많이 사용되는 것으로 알고 있다. 앞으로 재귀에 익숙해지도록 더욱 공부하자!!
