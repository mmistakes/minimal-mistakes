---
published: true
title: '2023-07-04-Etc-동국대SW역량강화캠프 사전TEST-구간의 합들'
categories:
  - Etc
tags:
  - Etc
toc: true
toc_sticky: true
toc_label: 'Etc'
---

**문제**  
자연수가 N개 주어질 때, 아래 조건을 만족하는 구간의 수를 출력하자.

A[i] + A[i + 1] + ... + A[j - 1] + A[j] = M

첫 번째 예제에서는 [1, 2], [2, 3], [3, 4] 구간이 조건을 만족하므로 답이 3이다.

<br>

**입력**  
첫 줄에는 수의 개수를 나타내는 정수 N과 구간의 합을 의미하는 정수 M이 주어진다.  
1 ≤ N ≤ 500, 1 ≤ M ≤ 10^8  
두 번째 줄에는 배열을 구성하는 3 ∗ 10^4 이하의 자연수가 N개 주어진다.

<br>

**출력**  
문제의 조건을 만족하는 구간의 수를 출력하자.

<br>

**예제 1 입력**

```
4 2
1 1 1 1
```

<br>

**예제 1 출력**

```
3
```

<br>

**예제 2 입력**

```
6 8
1 3 3 2 2 1
```

<br>

**예제 2 출력**

```
2
```

<br>

---

<br>

> **Source**

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Scanner;
public class main{
    public static void main(String[] args) throws IOException{
        Scanner sc = new Scanner(System.in);

        int N = sc.nextInt();
        int M = sc.nextInt();
        int[] A = new int[N];
        for (int i = 0; i < N; i++) {
            A[i] = sc.nextInt();
        }

        int[] sum = new int[N + 1];
        sum[0] = 0;
        for (int i = 1; i <= N; i++) {
            sum[i] = sum[i - 1] + A[i - 1];
        }

        int count = 0;
        for (int i = 0; i < N; i++) {
            for (int j = i + 1; j <= N; j++) {
                if (sum[j] - sum[i] == M) {
                    count++;
                }
            }
        }

        System.out.println(count);
    }
}
```
