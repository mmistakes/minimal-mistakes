---
published: true
title: '2023-07-04-Etc-동국대SW역량강화캠프 사전TEST-삼십'
categories:
  - Etc
tags:
  - Etc
toc: true
toc_sticky: true
toc_label: 'Etc'
---

**문제**  
윌리는 어느날 자신이 가진 숫자들의 자리수를 잘 섞었을 때, 30의 배수가 될 수 있는 지 궁금해졌다.  
또, 가능한 수들 중에서 제일 큰 수가 어떤 수 인지 찾고 싶어한다.  
윌리를 도와주는 프로그램을 작성하자.

<br>

Tip. 각 자리수를 모두 더해서 3의 배수인 수는 모두 3의 배수이다.

<br>

**입력**  
선호가 가지고 있는 수 N이 주어진다.  
N은 최대 100000자리수이다.

<br>

**출력**  
자리수의 위치들을 변경하여 만들 수 30의 배수들 중 제일 큰 수를 출력한다.  
만약, 불가능하다면 -1을 출력한다.

<br>

**예제 1 입력**

```
102
```

<br>

**예제 1 출력**

```
210
```

**예제 2 입력**

```
2931
```

<br>

**예제 2 출력**

```
-1
```

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
    public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
        String N = scanner.next();

        int[] count = new int[10];

        int sum = 0;

        for (int i = 0; i < N.length(); i++) {
            int digit = N.charAt(i) - '0';
            count[digit]++;
            sum += digit;
        }

        if (sum % 3 != 0 || count[0] == 0) {
            System.out.println(-1);
        }
		else {
            StringBuilder largestNumber = new StringBuilder();

            for (int i = 9; i >= 0; i--) {
                while (count[i] > 0) {
                    largestNumber.append(i);
                    count[i]--;
                }
            }

            System.out.println(largestNumber);
        }
    }
}

```
