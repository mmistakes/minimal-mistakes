---
published: true
title: "2022-03-16-DataStructure-Week9-실습2"
categories:
  - C
tags:
  - C
toc: true
toc_sticky: true
toc_label: "C"
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

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-9%EC%9E%A5-%EC%8B%A4%EC%8A%B51-4.png?raw=true)

> **Source**

- 실습1.h

```C++
#pragma once
typedef struct tree_node* tree_pointer;
typedef struct tree_node {
	int key;
	char data;
	tree_pointer left;
	tree_pointer right;
}tree_node;

tree_pointer root;

void bst_insert(int key, char data);
char bst_search(tree_pointer ptr, int key);
void bst_show_inorder(tree_pointer ptr);

```

- 실습1.cpp

```C++
#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<ctype.h>
#include"실습1.h"

void bst_insert(int key, char data) {
	tree_pointer p = NULL, c = root;
	while (c) {
		if (key == c->key)
			return;
		p = c;
		if (key < c->key)
			c = c->left;
		else
			c = c->right;
	}

	tree_pointer tmp = (tree_pointer)malloc(sizeof(tree_node));
	tmp->key = key;
	tmp->data = data;
	tmp->left = tmp->right = NULL;

	if (p) {
		if (key < p->key)
			p->left = tmp;
		else
			p->right = tmp;
	}
	else
		root = tmp;
}
char bst_search(tree_pointer ptr, int key) {
	tree_pointer tree = ptr;
	if (!tree)
		return NULL;
	if (key == tree->key)
		return tree->data;
	if (key < tree->key)
		return bst_search(tree->left, key);
	else
		return bst_search(tree->right, key);
}
void bst_show_inorder(tree_pointer ptr) {
	if (ptr) {
		bst_show_inorder(ptr->left);
		printf("%d %c \n", ptr->key, ptr->data);
		bst_show_inorder(ptr->right);
	}
}

void main() {
	char c, grade;
	int id;

	printf("********** Command **********\n");
	printf("I: Insert data, S: Search data\n");
	printf("P: Print inorder, Q: Quit \n");
	printf("*****************************\n");

	while (1) {
		printf("\nCommand> ");
		c = getch();
		putch(c);
		c = toupper(c);

		switch (c) {
		case'I':
			printf("\n id and grade: ");
			scanf("%d %c", &id, &grade);
			bst_insert(id, grade);
			break;
		case'S':
			printf("\nid: ");
			scanf("%d", &id);
			grade = bst_search(root, id);
			if (grade)
				printf("Grade of %d: %c\n", id, grade);
			else
				printf("No such id!\n");
			break;
		case 'P':
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
