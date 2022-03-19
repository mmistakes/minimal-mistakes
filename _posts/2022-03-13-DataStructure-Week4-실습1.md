---
published: true
title: '2022-03-13-DataStructure-Week4-실습1'
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: 'DataStructure'
---

# Stack 구현

- 문자들의 스택을 테스트하는 프로그램 구현
- 명령어
  push(+< 문자 >), pop(-)  
  스택 내용을 출력(S)

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-4%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

> **자료구조 및 함수 구성**

-

```C
Element stack[MAX_SIZE];
int top = -1;
```

- Void push(Element e)  
  Requires : 스택이 포화되지 않아야 함  
  Results : 스택에 e 를 삽입  
  <br>
- Element pop()  
  Requires : 스택이 비어 있지 않아야 함  
  Results : 스택에서 원소를 반환  
  <br>
- Void stack_show()  
  Results : 스택의 내용을 보여줌

> **Source**

- 실습1.h

```C
#pragma once
#define MAX_SIZE 10
#define boolean unsigned char
#define true 1
#define false 0

typedef char Element;

Element stack[MAX_SIZE];
int top = -1;

void push(Element e);
Element pop();
void stack_show();
```

- 실습1.cpp

```C
#include<stdio.h>
#include<conio.h>
#include<ctype.h>
#include<stdlib.h>
#include<string.h>
#include"실습1.h"

void push(Element e) {
	++top;
	stack[top] = e;
}
Element pop() {
	if (top == -1) {
		printf("\nStack is empty!");
		exit(1);
	}
	printf("\n%c\n", stack[top]);
	stack[top] = NULL;
	--top;
}
void stack_show() {
	printf("\n");
	for (int i = 0; i <= top; i++)
		printf("%c\n", stack[i]);
}

void main() {
	char c, e;

	printf("********** Command **********\n");
	printf("+<c>: Push c, -: Pop,\n");
	printf("S: Show, Q:Quit\n");
	printf("*****************************\n");

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'+':
			e = getch();
			putch(e);
			push(e);
			break;
		case'-':
			e = pop();
			break;
		case'S':
			stack_show();
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
