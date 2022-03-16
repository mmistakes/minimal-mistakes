---
published: true
title: "2022-03-13-DataStructure-Week4-실습2"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# postfix evaluation

- 후위 연산식 계산 함수 구현
  후위연산식 하나를 문자열로 받아
  계산 결과를 반환하는 함수
  스택 사용

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-4%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

> **자료구조 및 함수 구성**

-

```C++
int stack[MAX_SIZE];
int top = -1;
```

- int eval_postfix(char \*exp)  
  Results : exp( 후위표기 연산식 를 처리하여 결과를 반환  
  <br>
- void push(int e)  
  <br>
- int pop( )

> **Source**

- 실습2.h

```C++
#pragma once
#define MAX_SIZE 100
#define boolean unsigned char
#define true 1
#define false 0

int stack[MAX_SIZE];
int top = -1;

void push(int e);
int pop(int i);

int eval_postfix(char exp);
boolean is_number(char c);
int is_op(char c);
```

- 실습2.cpp

```C++
#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>
#include<string.h>
#include"실습2.h"

boolean is_number(char c) {
	if (('0' <= c) && (c <= '9'))
		return true;
	else
		return false;
}

int is_op(char c) {
	switch (c) {
	case '+':
		return 1;
	case '-':
		return 2;
	case '*':
		return 3;
	case'/':
		return 4;
	default:
		break;
	}
}

void push(int e) {
	++top;
	stack[top] = e;
}

int pop(int i) {
	int tmp = stack[top];
	stack[top] = NULL;
	--top;
	switch (i) {
	case 1:
		return stack[top] + tmp;
	case 2:
		return stack[top] - tmp;
	case 3:
		return stack[top] * tmp;
	case 4:
		return stack[top] / tmp;
	default:
		break;
	}
}

int eval_postfix(char* exp) {
	while (*exp != NULL) {
		if (is_number(*exp))
			push(*exp - 48);
		else
			stack[top] = pop(is_op(*exp));
		exp++;
	}
	return stack[top];
}

void main() {
	char exp[100];
	int result;

	while (1) {
		printf("\nInput postfix expression: ");
		scanf("%s", exp);

		result = eval_postfix(exp);
		printf("Result = %d \n\n", result);
	}
}
```
