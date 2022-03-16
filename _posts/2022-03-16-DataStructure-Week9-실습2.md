---
published: true
title: "2022-03-16-DataStructure-Week9-실습2"
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: "DataStructure"
---

# BST

- BST: 영어단어를 key 로 하는 트리. 국어단어도 기록
- 명령어  
  R : Read data dic.txt 파일을 읽어 영어단어를 key로 BST를 구성  
  S : Search data 영어단어를 탐색, 국어단어를 반환  
  P : Print inorder  
  Q : Quit

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-9%EC%9E%A5-%EC%8B%A4%EC%8A%B52-1.png?raw=true)

> **자료구조 및 함수 구성**

```C++
typedef struct node *tree_pointer;
typedef struct node{
	char w1[100];
	char w2[100];
	tree_pointer left;
	tree_pointer right;
};
tree_pointer root;
```

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-9%EC%9E%A5-%EC%8B%A4%EC%8A%B52-2.png?raw=true)

- int build_dictionary(char \*fname)  
   파일에서 단어들을 읽어 bst_insert 를 이용, 이진탐색트리 구성
  <br>
- void bst_show_inorder(tree_pointer ptr)  
   트리의 단어들을 inorder로 출력
  <br>
- void bst_insert(char *w1, char *w2)  
   트리에 (w1, w2) 자료 삽입 (key: w1)
  <br>
- char * bst_search(char *w1)
  트리에서 키값이 w1 인 자료를 검색, w2 를 반환

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
