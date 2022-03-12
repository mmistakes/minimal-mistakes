---
published: true
title: "2022-03-13-DataStructure-Week2-실습1"
categories:
  - C
tags:
  - C
toc: true
toc_sticky: true
toc_label: "C"
---

# 학생 성적 관리

- 파일로부터 성적을 읽어 명령을 처리  
  ![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-2%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

- 명령어
  성적 출력(P), 성적 찾기(S), 성적 수정(C), 파일에 저장(W)

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-2%EC%9E%A5-%EC%8B%A4%EC%8A%B51-2.png?raw=true)

<br>

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-2%EC%9E%A5-%EC%8B%A4%EC%8A%B51-3.png?raw=true)

> **자료구조 및 함수 구성**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-2%EC%9E%A5-%EC%8B%A4%EC%8A%B51-4.png?raw=true)

```C++
typedef struct {
	char name[10];
	int id;
	char grade[4];
} StudentRecord;
```

- void read_record(char \*fname)  
   Requires : 파일 이름  
   Results : 파일에서 레코드를 하나씩 읽어 구조체의 배열에 저장  
  <br>
- void print_record()  
  Requires : 없음  
  Results : 구조체의 배열을 차례로 읽어 자료 전체를 출력  
  <br>
- void search_record()  
  Requires : 없음  
  Results : 이름을 입력 받아 해당 학생의 자료를 출력  
  <br>
- void change_record( )  
  Requires : 없음  
  Results : 이름과 성적을 입력 받아 해당 자료를 수정  
  <br>
- void write_record(char \*fname)  
  Requires : 파일 이름  
  Results : 구조체의 배열 차례로 읽어 자료 전체를 파일에 저장

> **Source**

- 실습1.h

```C++
#pragma once
#define MAX 100

typedef struct {
	char name[10];
	int id;
	char grade[4];
}StudentRecord;

StudentRecord r[MAX];
int num_record = 0;
const char* fname = "grade.txt";

void read_record(const char* fname);
void print_record();
void search_record();
void change_record();
void write_record(const char* fname);
```

- 실습1.cpp

```C++
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<conio.h>
#include<ctype.h>
#include"실습1.h"

void read_record(const char* fname) {
	FILE* fp;
	fp = fopen(fname, "r");
	while (!feof(fp)) {
		fscanf(fp, "%s %d %s", r[num_record].name, &r[num_record].id, r[num_record].grade);
		num_record++;
	}

	fclose(fp);
}
void print_record() {
	printf("\n");

	for (int i = 0; i < num_record; i++)
		printf("%s %d %s\n", r[i].name, r[i].id, r[i].grade);
}
void search_record() {
	char name[10];
	printf("\nSearch Name: ");
	scanf("%s", name);

	for (int i = 0; i < num_record; i++) {
		if (strcmp(name, r[i].name) == 0)
			printf("Name: %s\nID: %d\nGrade: %s\n", r[i].name, r[i].id, r[i].grade);
	}
}
void change_record() {
	char name[10];
	char grade[4];
	printf("\nName: ");
	scanf("%s", name);

	printf("Grade: ");
	scanf("%s", grade);

	for (int i = 0; i < num_record; i++) {
		if (strcmp(name, r[i].name) == 0) {
			strcpy(r[i].grade, grade);
			printf("Record Changed!\n");
		}
	}
}
void write_record(const char* fname) {
	FILE* fp;
	fp = fopen(fname, "w");
	for (int i = 0; i < num_record; i++)
		fprintf(fp, "%s %d %s\n", r[i].name, r[i].id, r[i].grade);

	printf("\n%d record(s) have written to grade.txt\n", num_record);

	fclose(fp);
}

void main() {
	char c;

	read_record(fname);

	printf("**********명령어**********\n");
	printf("P: Print all records \n");
	printf("S: Search record \n");
	printf("C: Change record \n");
	printf("W: Write record \n");
	printf("Q: Save and quit \n");
	printf("**************************\n");

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'P':
			print_record();
			break;
		case'S':
			search_record();
			break;
		case'C':
			change_record();
			break;
		case'W':
			write_record(fname);
			break;
		case'Q':
			printf("\n");
			exit(1);
			break;
		default:
			printf("\nUnknown command!\n");
			break;
		}
	}
}
```
