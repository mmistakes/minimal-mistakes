---
published: true
title: "2022-03-13-DataStructure-Week3-실습1"
categories:
  - C
tags:
  - C
toc: true
toc_sticky: true
toc_label: "C"
---

# List 현

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
##include<stdio.h>
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
