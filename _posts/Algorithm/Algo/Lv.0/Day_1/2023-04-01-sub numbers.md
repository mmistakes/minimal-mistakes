---
layout: single
title: "두 수의 차 (알고리즘)"
categories: Algo
tag: [Java,Python,NodeJs,Lv_0,"두 수의 차"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Java vs Node.Js vs Python
- 문제 푸는건 5초 정리는 10분...

- 문제 -> https://school.programmers.co.kr/learn/courses/30/lessons/120803

## Java

```java
// 내가 푼 답
class Solution {
    public int solution(int num1, int num2) {
        int answer = num1 - num2;
        return answer;
    }
}

// 다른 사람 풀이 
pass

```
### 정리
- pass


## Python
```python
# 내가 푼 답
def solution(num1, num2):
    answer = num1 - num2
    return answer

# 다른 사람이 푼 답
solution = lambda num1, num2 : num1 - num2
```
### 정리
- 다음에 람다 써봐야겠다.
## Node.js

```javascript
// 내가 푼 답
function solution(num1, num2) {
    var answer = num1-num2;
    return answer;
}

// 다른 사람 풀이
const solution = (num1, num2) => num1 - num2
```
### 정리
-  pass


출처 : 프로그래머스
