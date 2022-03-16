---
published: true
title: "2022-03-16-DataStructure-Week12-실습1"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# hash_dictionary

- Hashing(linear probing) 구현
- 명령어  
  R: Read data
  - 파일에서 <key data>들을 읽어 차례로 해시테이블에 insert
- S: Search data
  - key 값을 받아서 (영어단어), 해시테이블을 search, data값을 반환 (국어단어)
- P: Print hash table
  - 현재 해시테이블의 내용을 출력
- Q: Quit

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-12%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

> **자료구조 및 함수 구성**

```C++
typedef struct {
	char key[100];
	char data[100];
} element;
element hash_table[TABLE_SIZE];
```

- void build_simple_graph()  
  샘플 그래프의 생성

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-11%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

- void insert_edge(int v, int w)  
  vertex v 와 w 를 연결하는 edge 를 2 차원 배열에 표현  
  <br>
- void dfs(int v)  
  v 에서 DFS 수행  
  <br>
- void bfs(int v)  
  v 에서 BFS 수행
  <br>
- void addq(Element e)  
  새 노드 생성  
  큐의 맨 뒤에 삽입  
  <br>
- Element deleteq()  
  큐의 맨 앞 노드 삭제  
  <br>
- boolean is_queue_empty()

  > **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-11%EC%9E%A5-%EC%8B%A4%EC%8A%B52-2.png?raw=true)

> **Source**

- 실습2.h

```C++
#pragma once
#define MAX_VERTICES 100
#define boolean unsigned char
#define true 1
#define false 0

int adj[MAX_VERTICES][MAX_VERTICES];
int visited[MAX_VERTICES];

void build_simple_graph();
void insert_edge(int v, int w);
void dfs(int v);
void bfs(int v);

typedef int Element;
typedef struct queue* queue_pointer;
typedef struct queue {
	Element item;
	queue_pointer link;
}queue;
queue_pointer front, rear;

void addq(Element e);
Element deleteq();
boolean is_queue_empty();
```

- 실습2.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<ctype.h>
#include"실습2.h"

void build_simple_graph() {
	for (int i = 0; i < MAX_VERTICES; i++)
		for (int j = 0; j < MAX_VERTICES; j++)
			adj[i][j] = 0;

	insert_edge(1, 2);
	insert_edge(2, 1);
	insert_edge(1, 3);
	insert_edge(3, 1);
	insert_edge(1, 4);
	insert_edge(4, 1);
	insert_edge(2, 5);
	insert_edge(5, 2);
	insert_edge(3, 5);
	insert_edge(5, 3);
	insert_edge(3, 5);
	insert_edge(5, 4);

	printf("\nGraph is built. V = 5, E = 6. \n\n");
}
void insert_edge(int v, int w) {
	adj[v][w] = 1;
	adj[w][v] = 1;
}
void dfs(int v) {
	printf("%d ", v);
	visited[v] = true;
	for (int i=1; i<=MAX_VERTICES; i++) {
		if (adj[v][i] && !visited[i])
			dfs(i);
	}
}

void bfs(int v) {
	queue_pointer w;
	printf("%d ", v);
	visited[v] = true;
	addq(v);
	while (!is_queue_empty()) {
		v = deleteq();
		for (int i = 1; i <= MAX_VERTICES; i++) {
			if (adj[v][i] && !visited[i]){
				printf("%d ", i);
				visited[i] = true;
				addq(i);
			}
		}
	}
}

void addq(Element e) {
	queue_pointer temp = (queue_pointer)malloc(sizeof(queue));
	temp->item = e;
	temp->link = NULL;

	if (is_queue_empty())
		front = rear = temp;

	rear->link = temp;
	rear = temp;
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
boolean is_queue_empty() {
	if (front == NULL)
		return true;
	else
		return false;
}

void main() {
	char c;
	int i, v;

	front = rear = NULL;
	build_simple_graph();

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'D':
			printf("\n Start vertex: ");
			scanf("%d", &v);
			for (i = 0; i < MAX_VERTICES; i++)
				visited[i] = false;
			dfs(v);
			printf("\n");
			break;
		case'B':
			printf("\n Start vertex: ");
			scanf("%d", &v);
			for (i = 0; i < MAX_VERTICES; i++)
				visited[i] = false;
			bfs(v);
			printf("\n");
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
