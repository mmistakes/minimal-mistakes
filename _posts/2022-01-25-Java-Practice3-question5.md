---
title: 'Java - Practice3 - question5'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 5_1

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%ED%96%89%EB%A0%AC%20%EA%B3%B1%EC%85%88.png)

A = { {1, 2}, {3, 4} }, B = { {2, 4}, {6, 8} }와 같은 배열 2개가 있다.  
A와 B를 이중 배열을 써서 나타내고, 두 배열의 곱을 새로운 배열 c를 통해 나타내야 한다.

# 문제 5_2

사용자로부터 숫자 N을 입력받고, [N x N] 행렬 P, Q를 생성한다.  
P의 모든 원소는 1, Q의 모든 원소는 3으로 구성된다.  
두 행렬의 곱은 새로운 행렬 R로 표현하여 출력하는 코드를 작성하시오.  
(P x Q = R)

## 콘솔 입출력 결과

```java
배열의 크기를 입력해주세요: 4
배열 C
12 12 12 12
12 12 12 12
12 12 12 12
12 12 12 12
```

```java
배열의 크기를 입력해주세요: 7
배열 C
21 21 21 21 21 21 21
21 21 21 21 21 21 21
21 21 21 21 21 21 21
21 21 21 21 21 21 21
21 21 21 21 21 21 21
21 21 21 21 21 21 21
21 21 21 21 21 21 21
```

<br>

> **Answer**

### question5.java

```java
package practice3;

public class question5 {
	public static void main(String args[]) {
		int[][] a = { { 1, 2 }, { 3, 4 } };
		int[][] b = { { 2, 4 }, { 6, 8 } };
		int[][] c = new int[2][2];

		for (int i = 0; i < 2; i++) {
			for (int j = 0; j < 2; j++) {
				for (int k = 0; k < 2; k++) {
					c[i][j] += a[i][k] * b[k][j];
				}
			}
		}

		for (int i = 0; i < 2; i++) {
			for (int j = 0; j < 2; j++) {
				System.out.print(c[i][j]+" ");
			}
			System.out.println();
		}
	}
}
```

### question5_2.java

```java
package practice3;

import java.util.Scanner;

public class question5_2 {
	public static void main(String args[]) {
		Scanner sc = new Scanner(System.in);

		System.out.print("배열의 크기를 입력해주세요: ");
		int size=sc.nextInt();

		int[][] a = new int[size][size];
		int[][] b = new int[size][size];
		int[][] c = new int[size][size];

		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++) {
				a[i][j]=1;
				b[i][j]=3;
			}
		}

		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++) {
				for (int k = 0; k < size; k++) {
					c[i][j] += a[i][k] * b[k][j];
				}
			}
		}

		System.out.println("배열 C");
		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++) {
				System.out.print(c[i][j]+" ");
			}
			System.out.println();
		}
	}
}
```
