---
layout: single
title: "두 수의 합 (알고리즘)"
categories: Algo
tag: [Java,Python,NodeJs,Lv_0,"두 수의 합"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Java vs Node.Js vs Python
- 문제 푸는건 5초 정리는 10분...

- 문제 -> https://school.programmers.co.kr/learn/courses/30/lessons/120802

## Java

```java
// 내가 푼 답
class Solution {
    public int solution(int num1, int num2) {
        int answer = num1 + num2;
        return answer;
    }
}

// 다른 사람 풀이 
class Solution {
    public int solution(int num1, int num2) {
        boolean val = (-50000<= num1 && num1<= 50000 && -50000<=num2 && num2 <= 50000);
        int answer = -1;
        if(val){
            answer = num1 + num2;
        }
        return answer;
    }
}

```
### 정리
- 음.. 데이터 우선 검사하고 반환 값을 나누는게 더 효율이 좋은거 같다.


## Python
```python
# 내가 푼 답
def solution(num1, num2):
    answer = num1 + num2
    return answer

# 다른 사람이 푼 답
solution=lambda *x:sum(x)
```
### 정리
- ****X 는 함수로 들어오는 인수를 튜플로 패킹한다는 뜻***
## Node.js

```javascript
// 내가 푼 답
function solution(num1, num2) {
    var answer = num1+num2;
    return answer;
}

// 다른 사람 풀이
function solution(num1, num2) {    
    if(-50000<=num1 && num1<=50000){
        if(-50000<=num2 && num2<=50000){
            const answer = num1 + num2;

            return answer;
        }
    }
}
```
### 정리
-  자바스크립트랑 자바는 숫자 크기도 설정을 해준다.


출처 : 프로그래머스
