---
published: true
title: '2022-03-16-DataStructure-Week7-실습1'
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: 'DataStructure'
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

```C
typedef struct node *tree_pointer;
typedef struct node{
	Element data;
	tree_pointer left_child;
	tree_pointer right_child;
};
```

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-7%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

- tree_pointer build_simple_tree()  
  다음과 같은 이진 트리를 생성  
  ![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-7%EC%9E%A5-%EC%8B%A4%EC%8A%B51-2.png?raw=true)  
  n1~n9 의 tree_pointer 와 malloc 사용

- int bt_count(tree_pointer ptr)  
   트리의 노드수를 계산
  <br>
- int bt_sum(tree_pointer ptr)  
   트리의 데이터 합을 계산
  <br>
- int bt_height(tree_pointer ptr)  
   트리의 높이를 계산
  <br>
- void bt_show_preorder(tree_pointer ptr)  
   트리의 내용을 preorder 로 출력
  <br>
- void bt_free(tree_pointer ptr)  
   트리의 모든 노드를 시스템에 반환(free)
  <br>
- int Max(int i, int j)

> **실행 예**

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-7%EC%9E%A5-%EC%8B%A4%EC%8A%B51-3.png?raw=true)

> **Source**

- 실습1.h

```C
#pragma once
#define boolean unsigned char
#define true 1
#define false 0

typedef int Element;

typedef struct tree_node* tree_pointer;
typedef struct tree_node {
	Element data;
	tree_pointer left;
	tree_pointer right;
}tree_node;

tree_pointer build_simple_tree();
int bt_count(tree_pointer ptr);
int bt_sum(tree_pointer ptr);
int bt_height(tree_pointer ptr);
void bt_show_preorder(tree_pointer ptr);
void bt_free(tree_pointer ptr);
int max(int i, int, j);
```

- 실습1.cpp

```C
#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
#include<ctype.h>
#include"실습1.h"

tree_pointer build_simple_tree() {
	tree_pointer node1 = (tree_pointer)malloc(sizeof(tree_node));
	tree_pointer node2 = (tree_pointer)malloc(sizeof(tree_node));
	tree_pointer node3 = (tree_pointer)malloc(sizeof(tree_node));
	tree_pointer node4 = (tree_pointer)malloc(sizeof(tree_node));
	tree_pointer node5 = (tree_pointer)malloc(sizeof(tree_node));
	tree_pointer node6 = (tree_pointer)malloc(sizeof(tree_node));
	tree_pointer node7 = (tree_pointer)malloc(sizeof(tree_node));
	node1->data = 10;
	node1->left = node2;
	node1->right = node3;
	node2->data = 20;
	node2->left = node4;
	node2->right = node5;
	node3->data = 30;
	node3->left = node6;
	node3->right = node7;
	node4->data = 40;
	node4->left = NULL;
	node4->right = NULL;
	node5->data = 50;
	node5->left = NULL;
	node5->right = NULL;
	node6->data = 60;
	node6->left = NULL;
	node6->right = NULL;
	node7->data = 70;
	node7->left = NULL;
	node7->right = NULL;

	return node1;
}
int bt_count(tree_pointer ptr) {
	if (!ptr)
		return 0;
	return (1 + bt_count(ptr->left) + bt_count(ptr->right));
}
int bt_sum(tree_pointer ptr) {
	if (!ptr)
		return 0;
	return (ptr->data + bt_sum(ptr->left) + bt_sum(ptr->right));
}
int bt_height(tree_pointer ptr){
	if (!ptr)
		return 0;
	return (1 + max(bt_height(ptr->left) + bt_height(ptr->right)));
}
void bt_show_preorder(tree_pointer ptr) {
	if (ptr) {
		printf("%d", ptr->data);
		bt_show_preorder(ptr->left);
		bt_show_preorder(ptr->right);
	}
}
void bt_free(tree_pointer ptr) {
	if (!ptr)
		return 0;
	bt_free(ptr->left);
	bt_free(ptr->right);
	free(ptr);
}
int max(int i, int, j) {
	if (i >= j)
		return i;
	else
		return j;
}

void main() {
	char c;
	int n;
	tree_pointer t;
	t = build_simple_tree();

	printf("********** Command **********\n");
	printf("C: Count tree, A: Sum tree data\n");
	printf("H: Height of tree, S: Show preorder\n");
	printf("F: Free tree, Q: Quit\n");
	printf("*****************************\n");

	while (1) {
		printf("\nCommand> ");
		c = _getch();
		_putch(c);
		c = toupper(c);

		switch (c) {
		case 'C':
			n = bt_count(t);
			printf("\nTotal number of node = %d\n", n);
			break;
		case'A':
			n = bt_sum(t);
			printf("\nSum of tree data = %d\n", n);
			break;
		case'H':
			n = bt_height(t);
			printf("\nHeight of tree = %d", n);
			break;
		case'S':
			printf("\n");
			bt_show_preorder(t);
			printf("\n");
			break;
		case'F':
			printf("\n");
			bt_free(t);
		case 'Q':
			printf("\n");
			exit(1);
		default:
			break;
		}
	}
}
```
