---
published: true
title: "2022-03-13-DataStructure-Week5-실습2"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# linked_list

- 문자들의 리스트를 linked_list로 구현
- 명령어  
  +<c> : Insert c  
  -<c> : Delete c  
  ?<c> : Search c  
  S : Show  
  Q : Quit

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-5%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

> **자료구조 및 함수 구성**

- void list_insert (list_pointer head, Element e)  
  Results : 문자 e 를 담은 노드를 만들어 head 리스트의 앞에 삽입  
  <br>
- list_pointer list_search(list_pointer head, Element e)  
  Results : 문자 e 를 head 리스트에서 찾아서 노드의 주소 반환  
  <br>
- void list_delete(list_pointer head, Element e)  
  Results : 문자 e 를 head 리스트에서 찾아서 노드를 삭제  
  <br>
- boolean list_empty(list_pointer head)  
  Results : head 리스트가 비어있으면 true  
  <br>
- void list_show(list_pointer head)  
  Results : head 리스트의 내용을 출력

> **Source**

- 실습2.h

```C++
#pragma once
#define Element char
#define bool unsigned char
#define true 1
#define false 0

typedef struct list_node* list_pointer;
typedef struct list_node{
	Element data;
	list_pointer link;
}list_node;

void list_insert(list_pointer head, Element e);
void list_delete(list_pointer head, Element e);
list_pointer list_search(list_pointer head, Element e);
bool list_empty(list_pointer head);
void list_show(list_pointer head);
```

- 실습2.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<ctype.h>
#include<stdlib.h>
#include"실습2.h"

void main() {
	char c, e;
	list_pointer head, p;

	head = (list_pointer)malloc(sizeof(list_node));
	head->data = NULL;
	head->link = NULL;

	while (1) {
		printf("\nCommand> ");
		c = _getch();
		_putch(c);
		c = toupper(c);
		switch (c) {
		case'+':
			e = _getch();
			_putch(e);
			list_insert(head, e);
			break;
		case'-':
			e = _getch();
			_putch(e);
			list_delete(head, e);
			break;
		case'?':
			e = _getch();
			_putch(e);
			p = list_search(head, e);
			if (p) {
				printf("\n %c is in the list. \n", e);
				printf(" Node address = %p, data = %c, link = %p \n", p, p->data, p->link);
			}
			else
				printf("\n %c is not in the list \n", e);
			break;
		case 'S':
			list_show(head);
			break;
		case 'Q':
			printf("\n");
			exit(1);
		default:
			break;
		}
	}
}

void list_insert(list_pointer head, Element e) {
	list_pointer dummy;
	dummy = (list_pointer)malloc(sizeof(list_node));
	dummy->data = e;
	dummy->link = head->link;
	head->link = dummy;
}
void list_delete(list_pointer head, Element e) {
	list_pointer p = head;

	if (p != NULL) {
		while (p != NULL) {
			if (p->link->data == e) {
				p->link = p->link->link;
				return;
			}
			p = p->link;
		}
	}
	else
		head = head->link;
}
list_pointer list_search(list_pointer head, Element e) {
	list_pointer p = head;
	while (p) {
		if (p->data == e)
			return p;
		p = p->link;
	}
	return NULL;
}
bool list_empty(list_pointer head) {
	if (head->link == NULL)
		return true;
	else
		return false;
}
void list_show(list_pointer head) {
	if (list_empty(head)) {
		printf("\nList is Empty\n");
		return;
	}
	printf("\n");
	list_pointer p = head;
	while (p != NULL) {
		printf("%c ", p->data);
		p = p->link;
	}
}
```
