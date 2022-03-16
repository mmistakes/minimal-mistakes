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

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-9%EC%9E%A5-%EC%8B%A4%EC%8A%B52-2.png?raw=true)

- void insert_max_heap(Element item)  
  히프에 item(key, data) 삽입  
  예 (3,1,7,9,5) 삽입

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-9%EC%9E%A5-%EC%8B%A4%EC%8A%B52-3.png?raw=true)

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-9%EC%9E%A5-%EC%8B%A4%EC%8A%B52-4.png?raw=true)

> **Source**

- 실습2.h

```C++
#pragma once
typedef struct tree_node* tree_pointer;
typedef struct tree_node {
	char w1[100];
	char w2[100];
	tree_pointer left;
	tree_pointer right;
}tree_node;
tree_pointer root;

int build_dictionary(char* fname);
void bst_insert(char* w1, char* w2);
char* bst_search(tree_pointer ptr, char* w1);
void bst_show_inorder(tree_pointer ptr);

```

- 실습2.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<string.h>
#include<ctype.h>
#include"실습2.h"

int build_dictionary(char* fname) {
	int i = 0;
	char w1[100], w2[100];
	FILE* fp;

	if ((fp = fopen(fname, "r")) == NULL) {
		printf("No such file ! \n");
		exit(1);
	}

	while (fscanf(fp, "%s %s", w1, w2) != EOF) {
		i++;
		bst_insert(w1, w2);

	}
	fclose(fp);
	return i;
}


void bst_insert(char* w1, char* w2) {	//w1 = key, w2 = data
	tree_pointer p = NULL, c = root;
	while (c) {
		if (strcmp(w1, c->w1) == 0)
			return;
		p = c;
		if (strcmp(w1, c->w1) == -1)
			c = c->left;
		else if (strcmp(w1, c->w1) == 1)
			c = c->right;
	}

	tree_pointer tmp = (tree_pointer)malloc(sizeof(tree_node));
	strcpy(tmp->w1, w1);
	strcpy(tmp->w2, w2);
	tmp->left = tmp->right = NULL;

	if (p) {
		if (strcmp(w1, p->w1) == -1)
			p->left = tmp;
		else
			p->right = tmp;
	}
	else
		root = tmp;
}
char* bst_search(tree_pointer ptr, char* w1) {
	tree_pointer tree = ptr;
	if (!tree)
		return NULL;
	if (w1 == tree->w1)
		return tree->w2;
	if (w1 < tree->w1)
		return bst_search(tree->left, w1);
	else
		return bst_search(tree->right, w1);
}
void bst_show_inorder(tree_pointer ptr) {
	if (ptr) {
		bst_show_inorder(ptr->left);
		printf("%s %s \n", ptr->w1, ptr->w2);
		bst_show_inorder(ptr->right);
	}
}

void main() {
	char c, fname[20];
	char w1[100], * w2;
	int wcount;

	printf("********** Command **********");
	printf("R: Read data, S: Search data\n");
	printf("P: Printf inorder, Q: Quit\n");
	printf("*****************************");
	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'R':
			printf("\n Dictionary file name: ");
			scanf("%s", fname);
			wcount = build_dictionary(fname);
			printf("Total number of words: %d\n", wcount);
			break;
		case'S':
			printf("\nWord: ");
			scanf("%s", w1);
			w2 = bst_search(root, w1);
			if (w2)
				printf("Meaning: %s\n", w2);
			else
				printf("No such word!\n");
			break;
		case'P':
			printf("\n");
			bst_show_inorder(root);
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
