---
layout: single
title:  "[Python-Algorithm]Python으로 하노이탑(Tower of Hanoi) 재귀알고리즘(Recursive function) 구현"
categories: Python
tag: [Python, Algorithm, recurvice function, Tower of Hanoi]
toc: true
author_profile: true
sidebar: true
search: true
---

## 하노이탑 ?
![image](https://user-images.githubusercontent.com/58736077/218662776-c00ee618-deff-4888-90e9-04d8e2456e45.png)
  
게임의 목적은 다음 두 가지 조건을 만족시키면서, 한 막대에 꽂힌 원판들을 그 순서 그대로 다른 막대로 옮겨 쌓는 것이다.  

<div class="notice--danger">
<h3>📌 규칙</h3>
<h3>1. 한 번에 하나의 원판만 옮길 수 있다.</h3>
<h3>2. 큰 원판이 작은 원판 위에 있어서는 안된다.</h3>
</div>


## Python 하노이탑 재귀알고리즘 구현

```python
def hanoi(n,p1,p2,p3):
    if n == 0:
        return
    else:
        hanoi(n-1,p1,p3,p2)
        print('%s → %s' %(p1,p2))
        hanoi(n-1,p3,p2,p1)

hanoi(3,'A','B','C')
# A -> C
# A -> B
# C -> B
# A -> C
# B -> A
# B -> C
# A -> C

```