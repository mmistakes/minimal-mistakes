---
title: "프로그래머스 가장 큰 수 문제"
categories: [코딩테스트]
tags: [정렬, 문자열, Java]
date: 2025-06-24 10:00:00 +0900
layout: single
author_profile: true
read_time: true
share: true
show_tags: true         
show_categories: true 
sidebar:
  nav: "counts"
---

## 문제 설명

0 또는 양의 정수가 담긴 배열 `numbers`가 주어졌을 때,  
**순서를 재배치하여 만들 수 있는 가장 큰 수**를 문자열 형태로 리턴하는 문제입니다.  
(프로그래머스: 정렬 문제 중 하나)

---

## 풀이 아이디어

- 숫자를 **문자열로 변환**하여 정렬합니다.
- 두 문자열 `a`, `b`를 비교할 때 `a+b`와 `b+a` 중 더 큰 쪽이 앞에 오도록 정렬합니다.
- 예: `"3"`과 `"30"` → `"330"` vs `"303"` → `"3"`이 앞에 와야 함.
- 정렬된 결과를 하나의 문자열로 이어붙입니다.
- 맨 앞이 `"0"`이라면 `"0"`을 반환합니다 (예: `[0, 0]`).

---

## 📄 자바 풀이 코드

```java
package Sort;
import java.util.*;

public class programmers2 {
    class Solution {
        public String solution(int[] numbers) {
            String answer = "";

            // 정수를 문자열로 변환해 리스트에 저장
            List<String> list = new ArrayList<>();
            for (int i : numbers) {
                list.add(Integer.toString(i));
            }

            // 정렬 기준: 두 숫자를 문자열로 이어붙였을 때 큰 순서
            list.sort((a, b) -> (b + a).compareTo(a + b));

            // 모든 수가 0인 경우 예외 처리
            if (list.get(0).equals("0")) {
                return "0";
            }

            // 문자열 합치기
            for (String s : list) {
                answer += s;
            }

            return answer;
        }
    }
}
```
---
## ✅ 보충 설명: compareTo()와 람다식 정렬 기준
🔹 compareTo() 메서드란?
Java에서 compareTo()는 문자열을 사전순(알파벳순) 으로 비교합니다.

```java
"9".compareTo("5") → 양수 → "9"가 더 큼  
"30".compareTo("34") → 음수 → "34"가 앞에 와야 함
```
결과 :

* 음수: 앞의 문자열이 작음 → 자리 바꿔야 함

* 양수: 앞의 문자열이 큼 → 그대로 유지

* 0: 두 문자열이 같음

🔹 람다식 정렬 기준

```java
list.sort((a, b) -> (b + a).compareTo(a + b));
```

* a, b를 단순히 숫자 크기로 비교하는 것이 아니라

* 두 숫자를 문자열로 붙여서 "어떤 순서로 결합했을 때 더 큰 수가 되는가" 를 기준으로 비교합니다.

예시:

"3"과 "30" →
"330" vs "303" → "330"이 더 크기 때문에 "3"이 앞에 와야 함.

이런 방식으로 정렬하면, 정렬된 숫자를 순서대로 붙였을 때 가장 큰 수가 됩니다.
---
