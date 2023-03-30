---
layout: single
title: "숫자 비교하기 (알고리즘)"
categories: Algo
tag: [Java,Python,NodeJs,Lv_0,"숫자 비교하기"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Java vs Node.Js vs Python
- 하다보니까 이제 3개 점점 못 해지는 느낌...
- 은근 비슷하면서 다르니까 헷갈리고 계속 까먹어서 
  그냥 기본기도 다시 다질겸
  레벨 0부터 풀기로 함

- 문제 -> https://school.programmers.co.kr/learn/courses/30/lessons/120807

## Java

```java
// 내가 푼 답
class Solution {
    public int solution(int num1, int num2) {
        if (num1 == num2){
            int answer = 1;
            
            return 1;
        }else{
            int answer = -1;
            return -1;
        }
    }
}

// 다른 사람 풀이 
class Solution {
    public int solution(int num1, int num2) {
        int answer = (num1 == num2) ? 1 : -1;
        return answer;
    }
}

```
### 정리
- 다른 사람 풀이를 보니까 삼항 연산자를 사용한거 같은데 다음에 꼭 사용해봐야지
- ![](https://i.imgur.com/rI2KBkC.png)

	- 삼항 연산자를 사용한다고 컴파일 속도가 빨라지는 건 아니라고한다.
	- 기능에 특별한게 없으니 가독성을 우선적으로 생각해서 사용하면 됨

## Python
```python
# 내가 푼 답
def solution(num1, num2):
    if num1 == num2:
        return 1
    else:
        return -1

# 다른 사람이 푼 답
def solution(num1, num2):
    return 1 if num1==num2 else -1
```
### 정리
- return 문에 if문도 한 꺼번에 사용가능하다.
- return q if 조건 else n  
	- (***조건이 성립하면 앞에 q을 반환 아니면 n을 반환*** ) 

## Node.js

```javascript

// 내가 푼 답
function solution(num1, num2) {
    if(num1 === num2){
        return 1
    }else{
        return -1
    }
}

// 다른 사람 풀이
function solution(num1, num2) {
    var answer = num1 === num2 ? 1 : -1;
    return answer;
}
```
### 정리
- 삼항연산자 사용법
```javascript
var age = 26;
var beverage = (age >= 21) ? "Beer" : "Juice";
console.log(beverage); // "Beer"
```

출처 : 프로그래머스, https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
