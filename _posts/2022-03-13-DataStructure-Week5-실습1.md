---
published: true
title: '2022-03-13-DataStructure-Week5-실습1'
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: 'DataStructure'
---

# Array Queue 구현

- 문자들의 Queue 를 테스트하는 프로그램 구현
- 명령어  
  +<c>: AddQ  
  -: DeleteQ  
  S: Show  
  Q: Quit

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-5%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

> **자료구조 및 함수 구성**

- Void addq(Element e)  
  Requires : Queue 가 포화되지 않아야 함  
  Results : Queue 에 e 를 삽입  
  <br>
- Element deleteq()  
  Requires : Queue 가 비어 있지 않아야 함  
  Results : Queue 에서 원소를 반환  
  <br>
- Void queue_show()  
  Results : Queue 의 내용을 보여줌

> **Source**

- 실습1.h

```C
#pragma once
#define MAX_SIZE 10
#define boolean unsigned char
#define true 1
#define false 0

typedef char Element;

Element queue[MAX_SIZE];
int front = 0;
int rear = 0;

void addq(Element e);
Element deleteq();
void queue_show();
```

- 실습1.cpp

```C
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<ctype.h>
#include"실습1.h"

void addq(Element e) {
	if (rear >= MAX_SIZE) {
		printf("\nQueue is Full!!!\n");
		return;
	}
	queue[rear++] = e;
}
Element deleteq() {
	if (front < 0) {
		printf("Queue is empty!!!\n");
		exit(1);
	}

	Element tmp;

	tmp = queue[front];
	queue[front++] = NULL;
	return tmp;
}
void queue_show() {
	for (int i = 0; i < MAX_SIZE; i++)
		printf("%c ",queue[i]);
}

void main() {
	char c, e;

	while (1) {
		printf("\nCommand> ");
		c = _getch();
		_putch(c);
		c = toupper(c);

		switch (c) {
		case'+':
			e = _getch();
			_putch(e);
			addq(e);
			break;
		case'-':
			e = deleteq();
			printf("\n %c", e);
			break;
		case 'S':
			queue_show();
			break;
		case'Q':
			printf("\n");
			exit(1);
		default:
			break;
		}
	}
}
```
