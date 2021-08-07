---
title: "[정렬] 인트로 정렬"
date: 2019-03-24 23:27:00
categories:
- Medium-Algorithm
tags:
- Sort
---

### 개요
인트로 정렬은 C++ STL에서 기본적으로 제공되는 정렬 함수입니다. 인트로 정렬은 퀵 정렬, 힙 정렬, 삽입 정렬로 이루어져 있습니다.<br>
퀵 정렬은 평균의 경우에는 매우 빠른 알고리즘이지만, 최악의 경우에서는 느려지게 됩니다. 그 단점을 보완한 알고리즘이 인트로 정렬입니다.

### 작동 과정
인트로 정렬의 과정은 다음과 같습니다.

1. 리스트의 크기가 16 이하라면 삽입 정렬을 한다.
2. 전체 리스트에 대해 퀵 정렬을 수행한다.
3. 수행 도중 재귀 호출의 깊이가 2⌈log⁡n ⌉을 넘어가게 되면 4번 항목으로 넘어간다.
4. 쪼개진 부분 리스트의 크기가 16 이하라면 그대로 놔둔다.<br>16보다 크다면 해당 부분 리스트에 대해 힙 정렬을 수행한다.
5. 3, 4번 항목이 모두 완료된 후, 대부분 정렬이 된 전체 리스트에 대해 삽입 정렬을 수행한다.

데이터가 적을 때에는 삽입 정렬이 퀵 정렬보다 더 빠르다는 것이 증명이 되어 있고, 16을 휴리스틱 하게 구해진 값입니다. 또한, 데이터가 “거의 다” 정렬이 된 경우에는 삽입 정렬이 가장 빠릅니다.<br>
퀵 정렬을 2⌈log⁡ n⌉ 까지만 수행하기 때문에 최악의 경우에도 O(n^2)이 나오지 않게 됩니다.<br>
코드는 퀵 정렬, 힙 정렬, 삽입 정렬을 이용해 짜면 됩니다.

### 구현
```cpp
void __swap(int * a, int * b) {
	int tmp = * a;
	* a = * b;
	* b = tmp;
}

void __makeHeap(int *arr, int left, int right) {
	for(int i=left; i<=right; i++) {
		int now = i;
		while(now > 0) {
			int par = now-1>>1;
			if(arr[par] < arr[now]) __swap(arr+par, arr+now);
			now = par;
		}
	}
}

void __heapSort(int *arr, int left, int right) {
	__makeHeap(arr, left, right);
	for(int i=right; i>left; i--) {
		__swap(arr, arr+i);
		int left = 1, right = 2;
		int sel = 0, par = 0;
		while(1) {
			if(left >= i) break;
			if(right >= i) sel = left;
			else {
				if(arr[left] < arr[right]) sel = right;
				else sel = left;
			}
			if(arr[sel] > arr[par]) {
				__swap(arr+sel, arr+par);
				par = sel;
			} else break;
			left = (par<<1) + 1;
			right = left+1;
		}
	}
}

void __insertionSort(int arr[], int left, int right) {
	for(int i=left; i<right; i++) {
		int key = arr[i+1];
		int j;
		for(j=i; j>=left; j--) {
			if(arr[j] > key) arr[j+1] = arr[j];
			else break;
		}
		arr[j+1] = key;
	}
}


void __quickSort(int arr[], int left, int right, int depth) {
	if(depth == 0) {
		int size = right-left+1;
		if(size > 16) {
			__heapSort(arr, left, right);
		}
		return;
	}

	int i = left, j = right;
    int pivot = arr[(left + right) / 2];
    int temp;
    do {
        while (arr[i] < pivot)
            i++;
        while (arr[j] > pivot)
            j--;
        if (i<= j) {
            __swap(arr+i, arr+j);
            i++;
            j--;
        }
    } while (i<= j);

    if (left < j)
        __quickSort(arr, left, j, depth-1);

    if (i < right)
        __quickSort(arr, i, right, depth-1);

}

void introSort(int arr[], int n) {
	int limit = 2*ceil(log2(n));
	if(n <= 16){
		__insertionSort(arr, 0, n-1);
		return;
	}
	__quickSort(arr, 0, n-1, limit);
	__insertionSort(arr, 0, n-1);
}
```

시간 복잡도는 최선의 경우에는 퀵 정렬의 최선의 시간 복잡도와 같고, 최악의 경우에는 힙 정렬의 최악의 시간 복잡도와 같습니다. 즉, 항상 O(n log⁡ n)입니다.
