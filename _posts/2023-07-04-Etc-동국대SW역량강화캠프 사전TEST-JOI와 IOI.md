---
published: true
title: '2023-07-04-Etc-동국대SW역량강화캠프 사전TEST-JOI와 IOI'
categories:
  - Etc
tags:
  - Etc
toc: true
toc_sticky: true
toc_label: 'Etc'
---

**문제**  
입력으로 주어지는 문자열에서 연속으로 3개의 문자가 JOI 또는 IOI인 곳이 각각 몇 개 있는지 구하는 프로그램을 작성하시오. 문자열은 알파벳 대문자로만 이루어져 있다. 예를 들어, 아래와 같이 "JOIOIOI"에는 JOI가 1개, IOI가 2개 있다.

![image](https://github.com/seungsimdang/seungsimdang.github.io/blob/master/_images/JOI%EC%99%80%20IOI.png?raw=true)

**입력**  
첫째 줄에 알파벳 10000자 이내의 문자열이 주어진다.

<br>

**출력**  
첫째 줄에 문자열에 포함되어 있는 JOI의 개수, 둘째 줄에 IOI의 개수를 출력한다.

<br>

**예제 1 입력**

```
JOIJOI
```

<br>

**예제 1 출력**

```
2
0
```

<br>

**예제 2 입력**

```
JOIOIOIOI
```

<br>

**예제 2 출력**

```
1
3
```

<br>

---

<br>

> **Source**

```java
import java.io.IOException;
import java.util.Scanner;
public class main{
    public static void main(String[] args) throws IOException{
        Scanner sc = new Scanner(System.in);

        String str = sc.next();

        int joiCount = 0;
        int ioiCount = 0;
        for (int i = 0; i < str.length() - 2; i++) {
            if (str.substring(i, i + 3).equals("JOI")) {
                joiCount++;
            } else if (str.substring(i, i + 3).equals("IOI")) {
                ioiCount++;
            }
        }

        // 출력
        System.out.println(joiCount);
        System.out.println(ioiCount);
    }
}
```
