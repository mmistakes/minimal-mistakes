---
title: 'Java - Lecture2 - practice3'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 배열형

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture2;

public class practice3 {
		public static void main(String[] args) {
			int[][] matrix = new int[3][]; // declaration
			int i, j;

			for (i = 0; i < matrix.length; i++) // creation
				matrix[i] = new int[i+3];
			for (i = 0; i < matrix.length; i++) // using
				for (j = 0; j < matrix[i].length; j++)
					matrix[i][j] = i*matrix[i].length + j;
			for (i = 0; i < matrix.length; i++) { // printing
				for (j = 0; j <matrix[i].length; j++)
					System.out.print(" " + matrix[i][j]);
				System.out.println();
			}
		}
}
```

> **Answer**

```java
 0 1 2
 4 5 6 7
 10 11 12 13 14
```
