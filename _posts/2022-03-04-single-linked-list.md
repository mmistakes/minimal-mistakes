---
layout: single
title: "Single Linked List."
---

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>

struct node {
	struct node* next;
	int data;
};
void addFirst(struct node* head) {
	struct node* newNode = malloc(sizeof(struct node));
	int input_data = 0;
	printf("data >> ");
	scanf("%d", &input_data);
	newNode->data = input_data;
	if (head->next == NULL)	newNode->next = NULL;
	else newNode->next = head->next;
	head->next = newNode;
}
void print(struct node* head) {
	struct node* curr = head->next;
	while (curr != NULL) {
		printf("%d \n", curr->data);
		curr = curr->next;
	}
}
void Exit(struct node* head) {
	struct node* curr = head->next;
	while (curr != NULL) {
		struct node* next = curr->next;
		free(curr);
		curr = next;
	}
	free(head);
	printf("exit");
}

int main(void) {
	int select = 0;
	struct node* head = malloc(sizeof(struct node));
	head->next = NULL;

	while (1) {
		printf("(1)add (2)print (0)exit >> ");
		scanf("%d", &select);
		switch (select) {
		case 0:
			Exit(head);
			return 0;
		case 1:
			addFirst(head);
			break;
		case 2:
			print(head);
			break;
		default:
			printf("error \n");
			break;
		}
	}	

	return 0;
}
```