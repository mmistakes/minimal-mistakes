---
published: true
title: "2022-03-16-DataStructure-Week13-실습1"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# Sorting

- Sorting 함수의 구현  
  Insertion Sort  
  Quick Sort  
  Merge Sort  
  키 비교 회수를 출력

> **자료구조 및 함수 구성**

- void insertion_sort(int list[], int n)  
  insertion sort. 중간 단계와 키 비교 수 출력  
  <br>
- void quick_sort(int list[], int left, int right)  
  quick sort. 중간 단계와 키 비교 수 출력  
  <br>
- void merge_sort(int list[], int left, int right)  
  merge sort. 중간 단계와 키 비교 수 출력  
  <br>
- void merge(int list[], int left, int mid, int right)  
  정렬되어 있는 list[left..mid]와 list[mid+1..right]를 합병  
  <br>
- void copy_list(int original[], int list[], int n)  
  original을 list에 복사  
  <br>
- void print_list(int list[], int left, int right)  
  list를 left에서 right까지만 출력

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-12%EC%9E%A5-%EC%8B%A4%EC%8A%B51-3.png?raw=true)

> **Source**

- 실습1.h

```C++
#pragma once
#define TABLE_SIZE 13
#define boolean unsigned char
#define true 1
#define false 0

typedef struct {
	char key[100];
	char data[100];
}element;
element hash_table[TABLE_SIZE];

int num_comparison;
int build_dictionary(char* fname);
void hash_insert(char* key, char* data);
char* hash_search(char* key);
void hash_show();

int hash(char* key);
int transform(char* key);
```

- 실습1.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<string.h>
#include<ctype.h>
#include"실습1.h"

int build_dictionary(char* fname) {
	int i = 0;
	char key[100], data[200];
	FILE* ifp;

	if ((ifp = fopen(fname, "r")) == NULL) {
		printf("No such file!\n");
		exit(1);
	}

	while (fscanf(ifp, "%s %s", key, data) == 2) {
		hash_insert(key, data);
		i++;
	}
	fclose(ifp);
	return i;
}

void hash_insert(char* key, char* data) {
	int a, hash_value;
	a = hash_value = hash(key);
	while (strlen(hash_table[a].key) != 0) {
		if (strcmp(hash_table[a].key, key) == 0) {
			printf("duplication\n");
			return;
		}
		a = (a + 1) % TABLE_SIZE;
		if (a == hash_value) {
			printf("table full\n");
			return;
		}
		strcpy(hash_table[a].key, key);
		strcpy(hash_table[a].data, data);
	}
}
char* hash_search(char* key) {
	int a, hash_value;
	a = hash_value = hash(key);
	while (strlen(hash_table[a].key) != 0) {
		if (strcmp(hash_table[a].key, key) == 0) {
			num_comparison++;
			printf(" Hash_value = %d\n", hash_value);
			return hash_table[a].data;
		}
		a = (a + 1) % TABLE_SIZE;
		if (a == hash_value) {
			num_comparison++;
			printf("fail\n");
			return NULL;
		}
		printf("fail\n");
	}
}
void hash_show() {
	int a = 0;

	while (a < TABLE_SIZE) {
		printf("hash_table[%s] : <%s>\n", hash_table[a].key, hash_table[a].data);
		a++;
	}
}

int hash(char* key) {
	return(transform(key) % TABLE_SIZE);
}
int transform(char* key) {
	int number = 0;
	while (*key)
		number += *key++;
	return number;
}

void main() {
	char c, fname[20];
	char key[100], * data;
	int wcount;

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'R':
			printf("\nDictionary file name: ");
			scanf("%s", fname);
			wcount = build_dictionary(fname);
			printf("Total number of words: %d\n", wcount);
			break;
		case'S':
			printf("\nWord: ");
			scanf("%s", key);
			num_comparison = 0;
			data = hash_search(key);
			if (data)
				printf("Meaning: %s\n", data);
			else
				printf("No such word!\n");
			printf("Total number of comparison = %d\n", num_comparison);
			break;
		case'P':
			printf("\n");
			hash_show();
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
