---
published: true
title: "2022-03-16-DataStructure-Week10-실습1"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# Max_heap

- Heap : key와 data를 가진 max heap 구현
- Heap 삽입, 삭제 함수 구현
- 명령어  
  I: Insert data - <key, data>  
  D: Delete max data  
  P: Print heap  
  Q: Quit

> **자료구조 및 함수 구성**

```C++
typedef struct {
	int key;
	char data;
} element;
element heap[MAX_DATA];
```

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

- void insert_max_heap(Element item)  
  히프에 item(key, data) 삽입  
  예) (3,1,7,9,5) 삽입

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B51-2.png?raw=true)

- Element delete_max_heap()  
  히프에서 max item ( 루트 ) 삭제 및 반환

- void max_heap_show()  
  히프의 자료들을 차례로 출력

- boolean is_heap_empty()

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B51-3.png?raw=true)

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B51-4.png?raw=true)

> **Source**

- 실습1.h

```C++
#pragma once
#define MAX_SIZE 100
#define boolean unsigned char
#define true 1
#define false 0

typedef struct {
	int key;
	char data;
}Element;

Element heap[MAX_SIZE];
int heap_size = 0;

void insert_max_heap(Element item);
Element delete_max_heap();
void max_heap_show();
boolean is_heap_empty();
```

- 실습1.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<ctype.h>
#include"실습1.h"

void insert_max_heap(Element item) {
	int i = ++heap_size;
	while ((i != 1) && (item.key > heap[i / 2].key)) {
		heap[i] = heap[i / 2];
		i = i / 2;
	}
	heap[i] = item;
}
Element delete_max_heap() {
	if (is_heap_empty()) {
		printf("\nHeap is Empty!!!");
		exit(1);
	}

	Element max = heap[1];
	Element tmp = heap[heap_size--];
	int p = 1, c = 2;
	while (c <= heap_size) {
		if ((c < heap_size) && (heap[c].key < heap[c + 1].key))
			c++;
		if (tmp.key >= heap[c].key)
			break;
		heap[p] = heap[c];
		p = c;
		c = c * 2;
	}
	heap[p] = tmp;
	return max;
}
void max_heap_show() {
	for (int i = 0; i < heap_size; i++)
		printf("%d %c\n", heap[i + 1].key, heap[i + 1].data);
}
boolean is_heap_empty() {
	if (heap_size == 0)
		return true;
	else
		return false;
}

void main() {
	char c, data;
	int key;
	Element item;

	printf("********** Command **********\n");
	printf("I: Inset data, D:Delete max data\n");
	printf("P: Print heap, Q: Quit\n");
	printf("*****************************\n");

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'I':
			printf("\n key and data: ");
			scanf("%d %c", &key, &data);
			item.key = key;
			item.data = data;
			insert_max_heap(item);
			break;
		case'D':
			item = delete_max_heap();
			printf("\nMax: key %d, data %c\n", item.key, item.data);
			break;
		case'P':
			printf("\n");
			max_heap_show();
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
