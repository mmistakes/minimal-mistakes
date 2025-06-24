---
title: "프로그래머스 - K번째 수 문제"
categories: [코딩테스트]
tags: [sort, array, codingtest]
toc: true
date: 2025-06-23 17:00:00 +0900
layout: single
author_profile: true
read_time: true
share: true
show_tags: true
show_categories: true
sidebar:
  nav: "counts"
---

## 📌 문제 설명

주어진 배열 `array`에서 `commands`에 따라 특정 범위를 잘라 정렬한 뒤, K번째 수를 구하는 문제입니다.

---

## 💡 접근 방식

- `commands`의 각 명령어는 `[i, j, k]` 형식입니다.
  - `array`의 i번째부터 j번째까지 자르고 (`1-based index`)
  - 정렬한 뒤
  - k번째 수를 선택합니다.

---

## 🧠 풀이 과정

1. `commands`의 길이만큼 결과 배열 `answer`를 생성합니다.
2. 각 명령어에 대해:
   - 범위에 해당하는 부분 배열을 추출하고
   - 정렬한 후
   - `k`번째 수를 `answer`에 저장합니다.

---

## 💻 자바 풀이 코드

```java
package Sort;
import java.util.*;

public class programmers1 {
    class Solution {
        public int[] solution(int[] array, int[][] commands) {
            // 결과를 담을 배열을 commands 길이만큼 생성
            int[] answer = new int[commands.length];

            // commands 배열을 하나씩 처리
            for(int i = 0; i < commands.length; i++) {
                List<Integer> list = new ArrayList<>();

                // commands[i][0] ~ commands[i][1]까지 (1-based 인덱스)
                // array는 0-based 인덱스이므로 -1 보정하여 포함 범위 반복
                for(int j = commands[i][0] - 1; j <= commands[i][1] - 1; j++) {
                    list.add(array[j]);  // 해당 구간 원소를 리스트에 추가
                }

                // 리스트를 오름차순 정렬
                Collections.sort(list);

                // 정렬된 리스트에서 commands[i][2]번째 (1-based) 숫자를 결과 배열에 저장
                answer[i] = list.get(commands[i][2] - 1);
            }

            return answer;
        }
    }
}
```
