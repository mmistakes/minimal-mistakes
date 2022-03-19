---
published: true
title: '2022-03-16-DataStructure-Week13-실습1'
categories:
  - DataStructure
tags:
  - DataStructure
toc: true
toc_sticky: true
toc_label: 'DataStructure'
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

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-13%EC%9E%A5-%EC%8B%A4%EC%8A%B51-1.png?raw=true)

> **Source**

- 실습1.h

```C
#pragma once
#define MAX_SIZE 10
#define boolean unsigned char
#define true 1
#define false 0

int original[] = { 25,5,37,1,61,11,59,15,48,19 };
int num_compare;

void insertion_sort(int list[], int n);
void quick_sort(int list[], int left, int right);
void merge_sort(int list[], int left, int right);
void merge(int list[], int left, int mid, int right);

void copy_list(int original[], int list[], int n);
void print_list(int list[], int left, int right);
```

- 실습1.cpp

```C
#include<stdio.h>
#include"실습1.h"

void copy_list(int original[], int list[], int n) {
	int i;
	for (i = 0; i < n; i++)
		list[i] = original[i];
}

void print_list(int list[], int left, int right) {
	int i;
	for (i = 0; i < left; i++)
		printf(" ");
	for (i = left; i <= right; i++)
		printf("%4d", list[i]);
	printf("\n");
}

void insertion_sort(int list[], int n) {
	int next;
	int i, j;

	for (i = 1; i < n; i++) {
		next = list[i];
		for (j = i - 1; j >= 0 && next < list[j]; j--) {
			num_compare++;
			list[j + 1] = list[j];
		}
		list[j + 1] = next;
		print_list(list, 0, n - 1);
	}
}
void quick_sort(int list[], int left, int right) {
	int pivot;
	int tmp;

	if (left < right) {

		//partition
		int i = left, j = right + 1;
		pivot = list[left];
		while (i < j) {
			while (list[++i] < pivot)
				num_compare++;
			while (list[--j] > pivot)
				num_compare++;
			if (i < j) {
				tmp = list[i];
				list[i] = list[j];
				list[j] = tmp;
			}
		}
		tmp = list[left];
		list[left] = list[j];
		list[j] = tmp;
		//

		print_list(list, left, right);

		quick_sort(list, left, j-1);
		quick_sort(list, j + 1, right);
	}


}
void merge_sort(int list[], int left, int right) {
	if (left < right) {
		int mid = (left + right) / 2;

		merge_sort(list, left, mid);
		merge_sort(list, mid + 1, right);

		merge(list, left, mid, right);
		print_list(list, left, right);
	}

}
void merge(int list[], int left, int mid, int right) {
	int sorted[MAX_SIZE];

	int i = left, j = mid + 1, k = left, n;
	while (i <= mid && j <= right) {
		if (list[i] <= list[j]) {
			sorted[k++] = list[i++];
			num_compare++;
		}
		else {
			sorted[k++] = list[j++];
			num_compare++;
		}
	}
	if (i > mid) {
		for (n = j; n <= right; n++)
			sorted[k++] = list[n];
	}
	else {
		for (n = i; n <= mid; n++)
			sorted[k++] = list[n];
	}

	for (n = left; n <= right; n++)
		list[n] = sorted[n];
}

void main() {
	int list[MAX_SIZE], n = MAX_SIZE;

	printf("\n----- insertion sort -----\n");
	copy_list(original, list, n);
	print_list(list, 0, n - 1);
	num_compare = 0;
	insertion_sort(list, n);
	printf("\n");
	print_list(list, 0, n - 1);
	printf("\n Total number of comparison = %d\n", num_compare);

	printf("\n----- quick sort -----\n");
	copy_list(original, list, n);
	print_list(list, 0, n - 1);
	num_compare = 0;
	quick_sort(list, 0, n - 1);
	printf("\n");
	print_list(list, 0, n - 1);
	printf("\n Total number of comparison = %d\n", num_compare);

	printf("\n----- merge sort -----\n");
	copy_list(original, list, n);
	print_list(list, 0, n - 1);
	num_compare = 0;
	merge_sort(list, 0, n - 1);
	printf("\n");
	print_list(list, 0, n - 1);
	printf("\n Total number of comparison = %d\n", num_compare);
}
```
