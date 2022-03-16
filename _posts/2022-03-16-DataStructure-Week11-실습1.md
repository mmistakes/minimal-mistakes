---
published: true
title: "2022-03-16-DataStructure-Week11-실습1"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# adj_list

- DFS와 BFS의 구현
- 명령어  
  D: DFS  
  B: BFS  
  Q: Quit

> **자료구조 및 함수 구성**

```C++
typedef struct node *node_pointer;
typedef struct node {
	int vertex;
	node_pointer link;
} node;
// Adjacency lists for a graph
node_pointer adj[MAX_VERTICES];
```

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

- void build_simple_graph()  
  샘플 그래프의 생성

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

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

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B52-2.png?raw=true)

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-10%EC%9E%A5-%EC%8B%A4%EC%8A%B52-3.png?raw=true)

> **Source**

- 실습2.h

```C++
#pragma once
#define MAX_SIMUL_TIME 20
#define MAX_PRINTING_TIME 10
#define JOB_ARRIVAL_PROB 0.5
#define boolean unsigned char
#define true 1
#define false 0
#define MAX_PQ_SIZE 1000

int current_time = 0;
int new_job_id = 0;
int current_job_id;
int remaining_time;

int total_wait_time;
int num_printed_jobs;

//Job
typedef struct {
	int key;	//Priority queue의 키 값(duration을 키로 설정)
	int id;		//Job id;
	int arrival_time;	//Job이 요청된 시간
	int duration;	//Job의 프린트 시간
}Job;
typedef Job Element;

//Global PQ(priority queue): min heap - key값(duration)이 작을수록 우선순위가 높음
Element PQ[MAX_PQ_SIZE];
int PQ_size = 0;

void insert_job(int id, int arrival_time, int duration);
void process_next_job();
boolean is_job_arrived();
boolean is_printer_idle();

double random();
int get_random_duration();

void insert_PQ(Element item);
Element delete_PQ();
void PQ_show();
boolean is_PQ_empty();
```

- 실습2.cpp

```C++
#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include"실습2.h"

void insert_job(int id, int arrival_time, int duration) {
	Job p;
	p.key = duration;
	p.id = id;
	p.arrival_time = arrival_time;
	p.duration = duration;

	insert_PQ(p);
	printf("새 job <%d>이 들어 왔습니다. 프린트 시간은 %d 입니다.\n", id, duration);
}
void process_next_job() {
	Job p;
	p = delete_PQ();

	current_job_id = p.id;
	remaining_time = p.duration - 1;
	total_wait_time += current_time - p.arrival_time;
	++num_printed_jobs;

	printf("프린트를 시작합니다 = job<%d>...\n", current_job_id);
}
boolean is_job_arrived() {
	if (random() < JOB_ARRIVAL_PROB)
		return true;
	else
		return false;
}
boolean is_printer_idle() {
	if (remaining_time <= 0)
		return true;
	else
		return false;
}

double random() {
	return rand() / (double)RAND_MAX;
}
int get_random_duration() {
	return (int)(MAX_PRINTING_TIME * random()) + 1;
}

void insert_PQ(Element item) {
	int i = ++PQ_size;
	while ((i != 1) && (item.key > PQ[i / 2].key)) {
		PQ[i] = PQ[i / 2];
		i = i / 2;
	}
	PQ[i] = item;
}
Element delete_PQ() {
	Element max = PQ[1];
	Element tmp = PQ[PQ_size--];
	int p = 1, c = 2;
	while (c <= PQ_size) {
		if ((c < PQ_size) && (PQ[c].key < PQ[c + 1].key))
			c++;
		if (tmp.key >= PQ[c].key)
			break;
		PQ[p] = PQ[c];
		p = c;
		c = c * 2;
	}
	PQ[p] = tmp;
	return max;
}
void PQ_show() {
	printf("현재 프린터 큐: [ ");
	for (int i = 0; i < PQ_size; i++)
		printf("<%d %d> ", PQ[i + 1].id, PQ[i + 1].key);
	printf("]\n");
}
boolean is_PQ_empty() {
	if (PQ_size == 0)
		return true;
	else
		return false;
}

void main() {
	int duration;

	srand(time(NULL));

	while (current_time < MAX_SIMUL_TIME) {
		printf("\n----- time %d -----\n", current_time);

		if (is_job_arrived()) {
			++new_job_id;
			duration = get_random_duration();
			insert_job(new_job_id, current_time, duration);
		}
		if (is_printer_idle()) {
			if (!is_PQ_empty())
				process_next_job();
		}
		else {
			printf("아직 Job <%d>을 프린트하고 있습니다...\n", current_job_id);
			--remaining_time;
		}
		PQ_show();
		++current_time;
	}

	printf("\n완료된 프린트 job = %d개 \n", num_printed_jobs);
	printf("평균 지연 시간 = %f 단위시간 \n\n", (double)total_wait_time / num_printed_jobs);
}
```
