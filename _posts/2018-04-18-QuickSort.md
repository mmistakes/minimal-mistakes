---
title:  "[정렬] 퀵 정렬"
date:   2018-04-18 12:05:00
categories:
- Medium-Algorithm
tags:
- Sort
---

퀵정렬은 분할 정복 기법을 씁니다.

### 작동 방식
퀵정렬을 하는 방법을 간단하게 설명하자면,<br>
1. 리스트에서 하나의 원소를 선택한다. 그 원소를 피벗 이라고 한다.
2. 피벗보다 작은 원소들은 모두 피벗의 왼쪽으로, 더 큰 원소들은 모두 피벗의 오른쪽으로 이동한다.
3. 피벗을 기준으로 분할 된 두 개의 작은 리스트에 대해 리스트의 크기가 0 또는 1이 될 때 까지 재귀적으로 1, 2번 항목을 반복한다.

이 과정을 통해 수행할 수 있습니다.

조금 더 자세히 설명하자면,<br>
1. pivot보다 큰 값을 pivot보다 왼쪽에서 찾고(큰 값이 나타날 때 까지 i 를 증가시킵니다.)
2. pivot보다 작은 값을 pivot보다 오른쪽에서 찾습니다.(작은 값이 나타날 때 까지 j를 감소시킵니다.)
3. pivot을 기준으로 값 비교가 완료되었다면, i와 j 인덱스를 비교합니다.
4. i <= j이면 두 값을 교환합니다.
5. i <= j이면 계속 4번 항목을 반복합니다.6. 5번 항목이 끝났다면, 피벗 왼쪽 부분과 오른쪽 부분에 대해 각각 재귀 호출 합니다.

### 구현
```cpp
void quickSort(int arr[], int left, int right) {
    int i = left, j = right;
    int pivot = arr[(left + right) / 2];
    int temp;
    do {
        while (arr[i] < pivot)
            i++;
        while (arr[j] > pivot)
            j--;
        if (i<= j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    } while (i<= j);

    /* recursion */
    if (left < j)
        quickSort(arr, left, j);

    if (i < right)
        quickSort(arr, i, right);
}
```

### 시간 복잡도 분석
퀵 정렬의 시간 복잡도는 아래 글에 자세하게 나와 있습니다.
https://justicehui.github.io/2018/03/11/%EC%8B%9C%EA%B0%84%EB%B3%B5%EC%9E%A1%EB%8F%844.html
