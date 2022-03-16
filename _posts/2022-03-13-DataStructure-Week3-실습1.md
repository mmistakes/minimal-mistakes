---
published: true
title: "2022-03-13-DataStructure-Week3-실습1"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# List 구현

- 문자들을 원소로 하는 리스트 프로그램 구현

- 명령어
  원소 삽입(+문자), 원소 삭제(-문자)  
  리스트가 비어있는지 확인(E)  
  리스트가 꽉 차있는지 확인(F)  
  리스트 내용 출력(S)

- Objects  
  List  
  문자들의 리스트, 사이즈 = MaxSize

- Functions  
  list_insert(c): 리스트에 문자 c 삽입  
  list_delete(c): 리스트에서 문자 c 삭제  
  list_full(): 리스트가 full이면 true  
  list_empty(): 리스트가 empty이면 true  
  list_show(): 리스트의 내용을 출력

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-3%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

<br>

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-3%EC%9E%A5-%EC%8B%A4%EC%8A%B51-2.png?raw=true)

> **자료구조 및 함수 구성**

-

```C++
// Global로 선언 (main() 밖에 선언)
Element List[MaxSize];
int size = 0;
```

- void list_insert(Element e)  
  Requires : 리스트가 포화(Full)되지 않아야 함  
  Results : e 를 리스트의 마지막에 삽입  
  <br>
- void list_delete(Element e)  
  Requires : 리스트가 비어있지 않아야 함  
  Results : 리스트에서 e를 찾아 삭제 (삭제된 자리를 메꾸어야 함)  
  <br>
- boolean list_empty()  
  Results : L이 비어 있다면 true, 그렇지 않으면 false를 리턴  
  <br>
- boolean list_full()  
  Results : L이 포화상태라면 true, 그렇지 않으면 false를 리턴  
  <br>
- void list_show(List \*L)  
  Results : 리스트 L에 있는 모든 원소를 출력

> **Source**

- 실습1.h

```C++
#pragma once
#define MaxSize 3
#define boolean unsigned char
#define true 1
#define false 0

typedef char Element;

//Global로 선언한 List 자료구조
Element List[MaxSize];
int size = 0;

void list_insert(Element e);
void list_delete(Element e);
boolean list_empty();
boolean list_full();
void list_show();
```

- 실습1.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<ctype.h>
#include<stdlib.h>
#include<string.h>
#include"실습1.h"

boolean list_full() {
	if (size == MaxSize)
		return true;
	else
		return false;
}

boolean list_empty() {
	if (size == 0)
		return true;
	else
		return false;
}

void list_show() {
	if (size == 0)
		printf("\nList is Empty!!!\n");
	else {
		printf("\n");
		for (int i = 0; i < size; i++)
			printf("%c ", List[i]);
	}
}


void list_insert(Element e) {
	if (size == MaxSize)
		printf("\nList is Full!!!\n");
	else {
		List[size] = e;
		size++;
	}
}

void list_delete(Element e) {
	boolean flag = 0;

	if (size == 0)
		printf("Data does not exist!!!\n");
	else {
		for (int i = 0; i < size; i++) {
			if (List[i] == e) {
				for (int j = i; j < size; j++) {
					if (List[j + 1] != NULL)
						List[j] = List[j + 1];
				}
				size--;
				break;
			}
		}
		printf("\nData does not exist!!!\n");
	}
}

void main() {
	char c;

	printf("**********Command**********\n");
	printf("+<c>: Insert c, -<c>:Delete c, \n");
	printf("E: ListEmpty, F:ListFull, S: ListShow, Q: Quit \n");
	printf("***************************\n");

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'+':
			c = getch();
			putch(c);
			list_insert(c);
			break;
		case'-':
			c = getch();
			putch(c);
			list_delete(c);
			break;
		case'E':
			if (list_empty())
				printf("\nTRUE \n");
			else
				printf("\nFALSE \n");
			break;
		case'F':
			if (list_full())
				printf("\nTRUE \n");
			else
				printf("\nFALSE \n");
			break;
		case'S':
			list_show();
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
