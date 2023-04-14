---
published: true
title: 'Programmers : 입실 퇴실'
categories:
  - Programmers
tags:
  - Programmers
toc: true
toc_sticky: true
toc_label: 'Programmers'
---

**문제**  
오늘 회의실에는 총 n명이 입실 후 퇴실했습니다. 편의상 사람들은 1부터 n까지 번호가 하나씩 붙어있으며, 두 번 이상 회의실에 들어온 사람은 없습니다. 이때, 각 사람별로 반드시 만난 사람은 몇 명인지 구하려 합니다.

예를 들어 입실 명부에 기재된 순서가 [1, 3, 2], 퇴실 명부에 기재된 순서가 [1, 2, 3]인 경우,

- 1번과 2번은 만났는지 알 수 없습니다.
- 1번과 3번은 만났는지 알 수 없습니다.
- 2번과 3번은 반드시 만났습니다.

또 다른 예로 입실 순서가 [1, 4, 2, 3], 퇴실 순서가 [2, 1, 3, 4]인 경우,

- 1번과 2번은 반드시 만났습니다.
- 1번과 3번은 만났는지 알 수 없습니다.
- 1번과 4번은 반드시 만났습니다.
- 2번과 3번은 만났는지 알 수 없습니다.
- 2번과 4번은 반드시 만났습니다.
- 3번과 4번은 반드시 만났습니다.

회의실에 입실한 순서가 담긴 정수 배열 enter, 퇴실한 순서가 담긴 정수 배열 leave가 매개변수로 주어질 때, 각 사람별로 반드시 만난 사람은 몇 명인지 번호 순서대로 배열에 담아 return 하도록 solution 함수를 완성해주세요.
  
<br>

**제한 사항**  
- 1 ≤ enter의 길이 ≤ 1,000
- 1 ≤ enter의 원소 ≤ enter의 길이
- 모든 사람의 번호가 중복없이 하나씩 들어있습니다.
- leave의 길이 = enter의 길이
- 1 ≤ leave의 원소 ≤ leave의 길이
- 모든 사람의 번호가 중복없이 하나씩 들어있습니다.
<br>

**입출력 예시**  
![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%85%EC%8B%A4%20%ED%87%B4%EC%8B%A4.png?raw=true)
<br>

---

<br>

> **Source**

```python
def solution(enter, leave):
    result = [0]*len(enter)
    # pop시 에러 방지용
    result.append(0)
    
    current = []
    
    while leave:
        if leave[0] in current:
            out = leave.pop(0)
            current.remove(out)
            result[out] += len(current)
            
            for i in current:
                result[i] += 1
        else:
            current.append(enter.pop(0))
    
    return result[1:]

print(solution([1,3,2], [1,2,3]))
```
