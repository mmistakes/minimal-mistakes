---
layout: single
title: "배열 두배 만들기 (알고리즘)"
categories: Algo
tag: [Java,Python,NodeJs,Lv_0,"배열 두배 만들기","자바함수Arrays.stream","자바함수map","자바함수toArray","자스함수reduce","자스함수map"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Java vs Node.Js vs Python
- 문제 푸는건 5초 정리는 10분...
- 하루 시작은 알고리즘 한 문제 풀기로 시작

- 문제 -> https://school.programmers.co.kr/learn/courses/30/lessons/120809

## Java

```java
// 내가푼답 -> 오답 -> 배열크기에 대해서 몰랐음
class Solution {
    public int[] solution(int[] numbers) {
        int[] answer = {};
        for (int i= 0 ; i < numbers.length; i++){
            answer += add(new int[] {numbers[i] * 2});
            
        }
        
        return answer;
    }
}
// 다시풀기
class Solution {
    public int[] solution(int[] numbers) {
        int[] answer = new int [numbers.length];
        for(int i=0; i<numbers.length; i ++) {
            answer[i] = numbers[i] *2;
        }
        
        return answer;
    }
}
// 다른사람풀이 

import java.util.Arrays;

class Solution {
    public int[] solution(int[] numbers) {
        return Arrays.stream(numbers).map(i -> i * 2).toArray();
    }
}
```
### 정리
- 자바는 배열 크기를 초반에 정해줘야한다.
- length로 해결한 후 기본 논리 for문 실행하면 된다.
- Java8 에 Arrays.stream 을 사용하면 numbers를 순환한다.
- map 메소드는 스트림에서 나오는 데이터를 변경해준다.
- toArray로 형 변환을 해준다.

출처: https://hbase.tistory.com/171


## Python
```python
# 내가 푼 답
def solution(numbers):
    answer = [];
    for i in numbers:
        t = i*2
        answer.append(t)

    return answer
# 다른 사람 풀이 1
def solution(numbers):
    return [num*2 for num in numbers]
    
# 다른 사람 풀이 2
def solution(numbers):
    return list(map(lambda x: x * 2, numbers))
```
### 정리
- 반복문을 사용할 때는 컴프리핸션을 떠올리도록 하자



## Node.js

```javascript
// 내가 푼 답
function solution(numbers) {
    var answer = [];
    for (i=0; i<numbers.length; i++){
        answer.push(numbers[i]*2)
    }
    return answer;
}

// 다른 사람 풀이
function solution(numbers) {
    return numbers.reduce((a, b) => [...a, b * 2], []);
}

const solution = (numbers) => numbers.map((number) => number * 2)
```
### 정리
- 자바스크립트의 reduce 함수는 배열의 각 요소를 순회하며 callback 함수의 실행 값을 누적하여 하나의 결과값을 반환한다.
>arr.reduce(callback[, initialValue])

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; const sum1 = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber); console.log('sum1 =', sum1);
```
1.  callback function  
    -   다음 4가지의 인수를 가진다.
        1.  **accumulator** - accumulator는 callback함수의 반환값을 누적
        2.  **currentValue** - 배열의 현재 요소
        3.  **index**(Optional) - 배열의 현재 요소의 인덱스
        4.  **array**(Optional) - 호출한 배열
    -   callback함수의 반환 값은 accumulator에 할당되고 순회중 계속 누적되어 최종적으로 하나의 값을 반환
2.  initialValue(Optional)
    -   최초 callback함수 실행 시 accumulator 인수에 제공되는 값, **초기값을 제공하지 않을경우 배열의 첫 번째 요소를 사용하고, 빈 배열에서 초기값이 없을 경우 에러가 발생**

출처: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
https://tocomo.tistory.com/26

출처 : 프로그래머스, https://wikidocs.net/21113
