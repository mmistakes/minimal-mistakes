---
layout: single
title: "두 수의 곱 (알고리즘)"
categories: Algo
tag: [Java,Python,NodeJs,Lv_0,"두 수의 곱"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Java vs Node.Js vs Python
- 문제 푸는건 5초 정리는 10분...

- 문제 -> https://school.programmers.co.kr/learn/courses/30/lessons/120804

## Java

```java
// 내가 푼 답
class Solution {
    public int solution(int num1, int num2) {
        int answer = num1 * num2;
        return answer;
    }
}

// 다른 사람 풀이 

class Solution {
    public int solution(int num1, int num2) {
        int answer = 0;
        if(0<=num1 && 100>=num1 && 0<=num2 && 100>=num2){
         answer = num1 * num2;
        }
        return answer;
    }
}

```
### 정리
- pass


## Python
```python
# 내가 푼 답
solution = lambda num1, num2 : num1 * num2

# 다른 사람이 푼 답
pass
```
### 정리
- pass
## Node.js

```javascript
// 내가 푼 답
const solution = (num1, num2) => num1 * num2
// 다른 사람 풀이
pass
```
### 정리
-  pass


출처 : 프로그래머스
