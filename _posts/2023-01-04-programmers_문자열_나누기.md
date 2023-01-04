---
layout: single
title: "[programmers] 문자열 나누기"
categories: CodingTest
tag: [coding test, Java, 문자열]
toc: true
sidebar:
    nav: "docs"
---
# [programmers] 문자열 나누기
## 문제 설명
문자열 `s`가 입력되었을 때 다음 규칙을 따라서 이 문자열을 여러 문자열로 분해하려고 합니다.

* 먼저 첫 글자를 읽습니다. 이 글자를 `x` 라고 합시다.

* 이제 이 문자열을 왼쪽에서 오른쪽으로 읽어나가면서, `x`와 `x`가 아닌 다른 글자들이 나온 횟수를 각각 셉니다. 처음으로 두 횟수가 같아지는 순간 멈추고, 지금까지 읽은 문자열을 분리합니다.

* `s`에서 분리한 문자열을 빼고 남은 부분에 대해서 이 과정을 반복합니다. 남은 부분이 없다면 종료합니다.

* 만약 두 횟수가 다른 상태에서 더 이상 읽을 글자가 없다면, 역시 지금까지 읽은 문자열을 분리하고, 종료합니다.   

문자열 `s`가 매개변수로 주어질 때, 위 과정과 같이 문자열들로 분해하고, 분해한 문자열의 개수를 return 하는 함수 solution을 완성하세요.

## 제한사항
* 1 ≤ `s`의 길이 ≤ 10,000

* `s`는 영어 소문자로만 이루어져 있습니다.

## 해결
### 아이디어
우선 분해하는 문자열의 첫 글자를 저장할 변수가 필요합니다. 한 글자이므로 `char`타입의 변수를 선언합니다.
```java
char x = ' ';
```
  
`x`와 `x`가 아닌 글자가 나온 횟수를 세어야 하기 때문에 `int`타입의 변수를 2개 선언합니다.

```java
int cntOfX = 0;
int cntOfNotX = 0;
```

문자열 `s`를 오른쪽으로 읽어나가기 때문에 `for`반복문을 이용합니다. 인덱스를 이용해 해당 위치의 문자를 가져와 `x`와 비교합니다. 비교해서 같으면 `cntOfX`를 증가시키고 다르면 `cntOfNotX`를 증가시킵니다. 이를 코드로 나타내면 다음과 같습니다.
```java
for (int i = 0; i < s.length(); i++) {
    if (s.charAt(i) == x) {
        cntOfX++;
    } else {
        cntOfNotX++;
    }
}
```
`cntOfX`와 `cntOfNotX`의 개수가 같으면 문자열을 분해합니다. 따라서 `answer` 값을 증가시키고 `cntOfX`와 `cntOfNotX`를 `0`으로 초기화 합니다. 문자열을 분해했으므로 첫 글자인 `x`도 다시 초기화 해야합니다. 이를 코드로 나타내면 다음과 같습니다.
```java
if (cntOfX == cntOfNotX) {
    answer++;
    cntOfX = 0;
    cntOfNotX = 0;
    x = s.charAt(i); // i번째로 초기화
}
```
x를 i번째로 초기화 하는 이유는 `for`반복문 안에서 제일 먼저 위의 코드가 실행될 것이기 때문입니다.   
글자 수를 비교하는 `if`조건문이 뒤에 나오는 경우 `x`의 값을 `i + 1`번째 문자로 초기화 해야하는데 그럼 `for`반목문의 범위를 다시 조정해야하고 여러모로 귀찮아집니다. 따라서 이를 앞에 넣어 간단하게 합니다. 전체 코드는 다음과 같습니다.
### 전체 코드
```java
class Solution {
    public int solution(String s) {
    int answer = 0;
    char x = ' ';
    int cntOfX = 0;
    int cntOfNotX = 0;
    
    for (int i=0; i<s.length(); i++) {
        if (cntOfX == cntOfNotX) {
            answer++;
            cntOfX = 0;
            cntOfNotX = 0;
            x = s.charAt(i);
        }
        
        if (s.charAt(i) == x) {
            cntOfX++;
        } else {
            cntOfNotX++;
        }
    }

    return answer;
    }
}
```
