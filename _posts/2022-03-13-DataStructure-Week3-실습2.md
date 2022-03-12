---
published: true
title: "2022-03-13-DataStructure-Week3-실습2"
categories:
  - C
tags:
  - C
toc: true
toc_sticky: true
toc_label: "C"
---

# Matrix

- 행렬 연산 함수 구현
- A, B, C 가 3 x 3 행렬일 때  
  C = A + B  
  C = A x B  
  C = A^T  
  C 출력

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-3%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

> **자료구조 및 함수 구성**

-

```C++
int a[ROW][COL]={ {1,0,0},{1,0,0},{1,0,0} };
int b[ROW][COL]={ {1,1,1},{0,0,0},{0,0,0} };
```

- void matrix_init(a)  
  matrix a의 원소를 모두 0으로  
  <br>
- void matrix_add(a, b, c)  
  a + c 를 수행하여 c 에 저장  
  <br>
- void matrix_mult(a, b, c)  
  a x b 를 수행하여 c 에 저장  
  <br>
- void matrix_trans(a, c)  
  a transpose 를 수행하여 c 에 저장  
  <br>
- void matrix_print(a)  
  행렬 a 출력

> **Source**

- 실습2.h

```C++
#pragma once
#define ROW 3
#define COL 3

void matrix_init(int a[ROW][COL]);
void matrix_add(int a[ROW][COL], int b[ROW][COL], int c[ROW][COL]);
void matrix_mult(int a[ROW][COL], int b[ROW][COL], int c[ROW][COL]);
void matrix_trans(int a[ROW][COL], int b[ROW][COL]);
void matrix_print(int a[ROW][COL]);
```

- 실습2.cpp

```C++
#include <stdio.h>
#include "실습2.h"

void matrix_init(int a[ROW][COL]) {
	int i, j;

	for (i = 0; i < ROW; i++) {
		for (j = 0; j < COL; j++)
			a[i][j] = 0;
	}
}

void matrix_add(int a[ROW][COL], int b[ROW][COL], int c[ROW][COL]) {
	int i, j;
	for (i = 0; i < ROW; i++) {
		for (j = 0; j < COL; j++)
			c[i][j] = a[i][j] + b[i][j];
	}
}

void matrix_mult(int a[ROW][COL], int b[ROW][COL], int c[ROW][COL]) {
	int i, j, k;

	for (i = 0; i < ROW; i++) {
		for (j = 0; j < COL; j++) {
			if (ROW >= COL)
				for (k = 0; k < ROW; k++)
					c[i][j] += a[i][k] * b[k][j];
			else
				for (k = 0; k < COL; k++)
					c[i][j] += a[i][k] * b[k][j];

		}
	}
}


void matrix_trans(int a[ROW][COL], int b[ROW][COL]) {
	int i, j, k;

	for (i = 0; i < ROW; i++) {
		for (j = 0; j < COL; j++) {
			b[i][j] = a[j][i];
		}
	}
}

void matrix_print(int a[ROW][COL]) {
	int i, j;
	for (i = 0; i < ROW; i++) {
		for (j = 0; j < COL; j++)
			printf("%d\t", a[i][j]);
		printf("\n");
	}
}

void main() {

	int a[ROW][COL] = { {1,0,0},{1,0,0},{1,0,0} };
	int b[ROW][COL] = { {1,1,1},{0,0,0},{0,0,0} };
	int c[ROW][COL] = { {0,0,0},{0,0,0},{0,0,0} };

	matrix_print(a);
	printf("\n");
	matrix_print(b);

	matrix_add(a, b, c);
	printf("\n");
	matrix_print(c);

	matrix_init(c);
	matrix_mult(a, b, c);
	printf("\n");
	matrix_print(c);

	matrix_init(c);
	matrix_trans(a, c);
	printf("\n");
	matrix_print(c);
}
```
