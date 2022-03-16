---
published: true
title: "2022-03-13-DataStructure-Week6-실습1"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# Linked_Queue 구현

- 문자들의 Linked Queue 를 테스트하는 프로그램 구현
- 명령어  
  +<c> : AddQ  
  --: DeleteQ  
  S : Show  
  Q : Quit

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-6%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

> **자료구조 및 함수 구성**

```C++
typedef struct queue queue_pointer;
typedef struct queue {
	Element item;
	queue_pointer link;
} queue;
queue_pointer front, rear;
```

- Void addq(Element e)  
  Results : Queue 에 e 를 삽입  
  <br>
- Element deleteq()  
  Requires : Queue 가 비어 있지 않아야 함  
  Results : Queue 에서 원소를 반환  
  <br>
- Void queue_show()  
  Results : Queue 의 내용을 보여줌  
  <br>
- Boolean is_queue_empty()  
  Results : Queue 가 비어있으면 true 반환

> **Source**

- 실습1.h

```C++
#pragma once
#define boolean unsigned char
#define true 1
#define false 0

typedef char Element;
typedef struct queue* queue_pointer;
typedef struct queue {
	Element item;
	queue_pointer link;
}queue;
queue_pointer front, rear;

void addq(Element e);
Element deleteq();
void queue_show();
boolean is_queue_empty();
```

- 실습1.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<ctype.h>
#include"실습1.h"

void addq(Element e) {
	queue_pointer temp = (queue_pointer)malloc(sizeof(queue));
	temp->item = e;
	temp->link = NULL;

	if (is_queue_empty())
		front = rear = temp;
	else {
		rear->link = temp;
		rear = temp;
	}
}
Element deleteq() {
	queue_pointer temp;
	Element item;

	if (is_queue_empty())
		return item;
	item = front->item;
	temp = front;

	front = front->link;
	free(temp);

	return item;
}
void queue_show() {
	queue_pointer head;
	head = front;
	printf("\n");
	while (head != NULL) {
		printf("%c ", head->item);
		head = head->link;
	}
}
boolean is_queue_empty() {
	if (front == NULL)
		return true;
	else
		return false;
}

void main() {
	char c, e;
	front = rear = NULL;
	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);
		switch (c) {
		case'+':
			e = getch();
			putch(e);
			addq(e);
			break;

		case '-':
			if (is_queue_empty())
				printf("\nQueue is empty!!!\n");
			else {
				e = deleteq();
				printf("\n %c", e);
			}
			break;
		case'S':
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
