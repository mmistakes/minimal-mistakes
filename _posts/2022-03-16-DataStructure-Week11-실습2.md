---
published: true
title: "2022-03-16-DataStructure-Week11-실습2"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# adj_matrix

- DFS와 BFS의 구현
- 명령어  
  D: DFS  
  B: BFS  
  Q: Quit

> **자료구조 및 함수 구성**

```C++
// Adjacency matrix for a graph
int adj[MAX_VERTICES][MAX_VERTICES];
```

- void build_simple_graph()  
  샘플 그래프의 생성

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-11%EC%9E%A5-%EC%8B%A4%EC%8A%B51-2.png?raw=true)

- void insert_edge(int v, int w)  
   vertex v와 w를 연결하는 edge 삽입  
  <br>
- void dfs(int v)  
  v에서 DFS 수행  
  <br>
- void bfs(int v)  
   v에서 BFS 수행  
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

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-11%EC%9E%A5-%EC%8B%A4%EC%8A%B51-3.png?raw=true)

> **Source**

- 실습1.h

```C++
#pragma once
#define boolean unsigned char
#define MAX_VERTICES 100
#define TRUE 1
#define FALSE 0

typedef struct node* node_pointer;
typedef struct node {
	int vertex;
	node_pointer link;
}node;

node_pointer adj[MAX_VERTICES];
int visited[MAX_VERTICES];

void build_simple_graph();
void insert_edge(int v, int w);
void dfs(int v);
void bfs(int v);

typedef int Element;
typedef struct queue* queue_pointer;
typedef struct queue{
	Element item;
	queue_pointer link;
}queue;
queue_pointer front, rear;

void addq(Element e);
Element deleteq();
boolean is_queue_empty();
```

- 실습1.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<ctype.h>
#include"실습1.h"

void build_simple_graph() {
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
	insert_edge(4, 5);
	insert_edge(5, 4);

	printf("\n Graph is built. V = 5, E = 6. \n\n");

}
void insert_edge(int v, int w) {
	node_pointer tmp;
	tmp = (node_pointer)malloc(sizeof(node));
	tmp->vertex = w;
	tmp->link = adj[v];
	adj[v] = tmp;
}
void dfs(int v) {
	node_pointer w;
	printf("%d ", v);
	visited[v] = TRUE;
	for (w = adj[v]; w; w = w->link) {
		if (!visited[w->vertex])
			dfs(w->vertex);
	}
}
void bfs(int v) {
	node_pointer w;
	printf("%d ", v);
	visited[v] = TRUE;
	addq(v);
	while (!is_queue_empty()) {
		v = deleteq();
		for (w = adj[v]; w; w->link) {
			if (!visited[w->vertex]) {
				printf("%d ", w->vertex);
				visited[w->vertex] = TRUE;
				addq(w->vertex);
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
		return TRUE;
	else
		return FALSE;
}

void main() {
	char c;
	int i, v;

	front = rear = NULL;
	build_simple_graph();

	printf("********* Command ********\n");
	printf("D: DFS, B: BFS, Q: Quit \n");
	printf("**************************\n");

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
				visited[i] = FALSE;
			dfs(v);
			printf("\n");
			break;
		case'B':
			printf("\n Start vertex: ");
			scanf("%d", &v);
			for (i = 0; i < MAX_VERTICES; i++)
				visited[i] = FALSE;
			bfs(v);
			printf("\n");
			break;
		case'Q':
			printf("\n");
			break;
		default:
			break;
		}
	}
}
```
