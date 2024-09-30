---
layout: single
title:  "Programmers_폰켓몬(Hash, Dictionary)"
---

# 딕셔너리(Key-Value)를 사용한 파이썬 풀이

```python
def solution(nums):
    answer = 0
    l = len(nums)
    pocketmons = {} #dic {포켓몬 번호 : 개수}
    for i in nums:
        if i in pocketmons:
            pocketmons[i] += 1 #키가 있다면 개수 + 1
        else:
            pocketmons[i] = 1 #키가 없다면 1로 초기화

    # 포켓몬 키 값 개수(중복 없음)
    answer = len(pocketmons.keys())
    
    #구한 값이 l/2와 같거나 크다면 l/2가 답
    if answer >= l/2: 
        answer = l/2
        
    return answer

```
