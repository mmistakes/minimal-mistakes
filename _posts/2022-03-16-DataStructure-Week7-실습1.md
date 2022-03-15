---
published: true
title: "2022-03-16-DataStructure-Week7-실습1"
categories:
  - C
tags:
  - C
toc: true
toc_sticky: true
toc_label: "C"
---

# binary_tree 구현

- binary_tree 관련 프로그램 구현
- 명령어  
  C: Count tree  
  A: Sum tree data  
  H: Height of tree  
  S: Show tree (preorder)  
  F: Free tree  
  Q: Quit

> **자료구조 및 함수 구성**

```C++
typedef struct node *tree_pointer;
typedef struct node{
	Element data;
	tree_pointer left_child;
	tree_pointer right_child;
};
```

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-6%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

- tree_pointer build_simple_tree()  
  다음과 같은 이진 트리를 생성  
  ![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-6%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)
  n1~n9 의 tree_pointer 와 malloc 사용

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-6%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-6%EC%9E%A5-%EC%8B%A4%EC%8A%B52-2.png?raw=true)

> **Source**

- 실습2.h

```C++
#pragma once
//시뮬레이션 설정 상수
#define MAX_SIMUL_TIME 20		//시뮬레이션 진행 시간
#define MAX_PRINTING_TIME 5		//각 Job의 가능한 최대 프린트 시간
#define JOB_ARRIVAL_PROB 0.5	//매 시각 새로운 Job의 도착 확률
#define boolean unsigned char
#define true 1
#define false 0

//시뮬레이션을 위한 global variables
int current_time = 0;	//현재 시각
int new_job_id = 0;		//새로운 Job의 ID

int current_job_id;		//현재 프린트하고 있는 Job의 ID
int remaining_time;		//현재 프린트하고 있는 Job의 남은 프린트 시간. 매 시각 1씩 감소

int total_wait_time;	//프린트를 시작한 모든 Job의 대기시간(start time - arrival time)의 합
int num_printed_jobs;	//시뮬레이션이 끝날 때까지 시작된 Job의 총 수

//Job
typedef struct {
	int id;				//Job ID
	int arrival_time;	//Job이 요청된 시간
	int duration;		//Job의 프린트 시간
}Job;
typedef Job Element;

//Global queue
typedef struct queue* queue_pointer;
typedef struct queue {
	Element item;
	queue_pointer link;
}queue;
queue_pointer front, rear;

//ID가 id, 요청시간이 arrival_time, 프린트 시간이 duration인 Job을 큐에 삽입
void insert_job_into_queue(int id, int arrival_time, int duration);
//다음 job을 큐에서 꺼내 수행(현재 job id, remaining time 등 설정)
void process_next_job();
//랜덤하게 true 혹은 false를 return. True일 확률을 JOB_ARRIVAL_PROB
boolean is_job_arrived();
//프린터가 놀고 있으면(현재 job의 remaining time <= 0) true
boolean is_printer_idle();

double random();	//0.0 ~ 1.0 사이의 랜덤 값을 반환
int get_randon_duration(); //1-MAX_PRINTING_TIME+1 사이의 랜덤 값을 반환

void addq(Job e);
Element deleteq();
boolean is_queue_empty();
void queue_show();	//현재 큐에 있는 job의 id들을 프린트
```

- 실습2.cpp

```C++
#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include"실습2.h"

//ID가 id, 요청시간이 arrival_time, 프린트 시간이 duration인 Job을 큐에 삽입
void insert_job_into_queue(int id, int arrival_time, int duration) {
	Job p;

	//id, arrival_time, duration 설정 후 job p를 큐에 삽입
	//addq()사용

	p.id = id;
	p.arrival_time = arrival_time;
	p.duration = duration;

	addq(p);

	printf("새 job <%d>이 들어 왔습니다. 프린트 시간은 = %d 입니다 \n", id, duration);
}
//다음 job을 큐에서 꺼내 수행(현재 job id, remaining time 등 설정)
void process_next_job() {
	Job p = deleteq();

	// deleteq() 사용
	//다음 job을 큐에서 꺼내와
	//current_job_id, remaining_time(duration - 1),
	//total_wait_time(total_wait_time + (current_time - arrival_time) 설정

	++current_job_id;
	remaining_time = p.duration - 1;
	total_wait_time += (current_time - p.arrival_time);

	++num_printed_jobs;
	printf("프린트를 시작합니다 - job<%d> ... \n", current_job_id);
}
//랜덤하게 true 혹은 false를 return. True일 확률을 JOB_ARRIVAL_PROB
boolean is_job_arrived() {
	if (random() < JOB_ARRIVAL_PROB)
		return true;
	else
		return false;
}
//프린터가 놀고 있으면(현재 job의 remaining time <= 0) true
boolean is_printer_idle() {
	if (remaining_time <= 0)
		return true;
	else
		return false;
}
//0.0 ~ 1.0 사이의 랜덤 값을 반환
double random() {
	return rand() / (double)RAND_MAX;
}

//1-MAX_PRINTING_TIME+1 사이의 랜덤 값을 반환
int get_randon_duration() {
	return (int)(MAX_PRINTING_TIME * random()) + 1;
}

void addq(Job e) {
	queue_pointer temp = (queue_pointer)malloc(sizeof(queue));
	/*temp->item.id = e.id;
	temp->item.arrival_time = e.arrival_time;
	temp->item.duration = e.duration;*/
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
//현재 큐에 있는 job의 id들을 프린트
void queue_show() {
	queue_pointer head;
	head = front;
	printf("현재 프린터 큐: [ ");
	while (head != NULL) {
		printf("%d ", head->item);
		head = head->link;
	}
	printf("]");
}

void main() {
	int duration;

	srand(time(NULL));
	while (current_time < MAX_SIMUL_TIME) {
		printf("\n----- time %d -----\n", current_time);

		//새 job이 들어오면 큐에 삽입
		if (is_job_arrived()) {
			++new_job_id;
			duration = get_randon_duration();
			insert_job_into_queue(new_job_id, current_time, duration);
		}
		//프린터가 놀고 있으면 다음 job을 수행
		if (is_printer_idle()) {
			if (!is_queue_empty())
				process_next_job();
		}
		//아직 프린트 중
		else {
			printf("아직 Job<%d>을 프린트하고 있습니다...\n", current_job_id);
			--remaining_time;
		}
		//현재 큐의 상태를 보여줌
		queue_show();
		++current_time;
	}

	//통계 자료 출력 - 완료된 프린트 job 수, 평균 지연 시간(total_wait_time/num_printed_jobs)
	printf("\n\n완료된 프린트 job = %d 개\n", num_printed_jobs);
	printf("평균 지연 시간 = %lf 단위시간", (double)total_wait_time / (double)num_printed_jobs);
}
```
