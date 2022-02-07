---
title: 'Java - Practice5 - question1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 1

임의의 크기를 가진 행렬X, Y가 있다.
두 행렬의 곱셈 결과를 나타내는 프로그램을 작성하시오.

- 행렬의 곱셈은 X행렬의 열과 Y행렬의 행 값이 같아야 됩니다.  
  <br>

> **Answer**

```java
package practice5;

import java.util.Scanner;

public class question1 {
	public static void main(String args[]) {
		Scanner sc = new Scanner(System.in);

		System.out.println("행렬X의 크기를 입력해주세요\n");

		int x_size1 = sc.nextInt();
		int x_size2 = sc.nextInt();

		int[][] x = new int[x_size1][x_size2];

		for (int i = 0; i < x_size1; i++) {
			System.out.println(i + 1 + "행을 입력해주세요: ");
			for (int j = 0; j < x_size2; j++) {
				x[i][j] = sc.nextInt();
			}
		}

		System.out.println("행렬Y의 크기를 입력해주세요\n");

		int y_size1 = sc.nextInt();
		int y_size2 = sc.nextInt();

		int[][] y = new int[y_size1][y_size2];

		for (int i = 0; i < y_size1; i++) {
			System.out.println(i + 1 + "행을 입력해주세요: ");
			for (int j = 0; j < y_size2; j++) {
				y[i][j] = sc.nextInt();
			}
		}

		if(x_size2!=y_size1) {
			System.out.println("형식이 맞지 않아 계산할 수 없습니다.");
		}
		else {
			System.out.println();
			int[][] z = new int[x_size1][y_size2];

			for (int i = 0; i < x_size1; i++) {
				for (int j = 0; j < y_size2; j++) {
					for (int k = 0; k < x_size2; k++) {
						z[i][j] += x[i][k] * y[k][j];
					}
				}
			}

			for (int i = 0; i < x_size1; i++) {
				for (int j = 0; j < y_size2; j++) {
					System.out.print(z[i][j] + " ");
				}
				System.out.println();
			}
		}
	}
}
```
