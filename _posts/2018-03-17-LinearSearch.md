---
title:  "[탐색] 선형 탐색(Linear Search)"
date:   2018-03-17 16:12:00
categories:
- Easy-Algorithm
tags:
- Search
---

### 서론
이번 글에서는 선형 탐색의 여러 방법을 소개합니다.<br>
먼저, 기본적인 순차 탐색(Sequential Search)을 간단히 설명하고, 자기 구성 순차 탐색(Self-Organizing Sequential Search)을 설명하겠습니다.<br>
자기 구성 순차 탐색 에서는 전진 이동법(Move to Front Method)과 전위법(Transpose Method)을 소개할 것입니다.<br>

### 순차 탐색(선형 탐색)
순차 탐색은 배열(혹은 리스트 등과 같은 데이터의 집합) 의 처음부터 끝까지 순서대로 탐색을 하는 방법입니다. 한쪽 방향으로만 탐색한다 해서 선형 탐색(Linear Search)라고 칭하기도 합니다.<br>
효율이 비교적 좋지 않고, 무식한 방법이지만, 구현이 간단하고, 그래서 버그가 발생할 확률이 적어서 간단한 데이터들을 다룰때 자주 사용합니다.

arr이라는 배열의 길이가 n이고, x라는 값을 찾고 싶다면,
```cpp
#include <stdio.h>
int main(){
    const int n = 10;
    int arr[n] = {1, 3, 5, 7, 9, 2, 4, 6, 8, 0};
    int x =  6;
    for(int i=0; i<n; i++){
        if(arr[i] == x){
            printf("[[find]] index : %d\n", i);
            break;
        }
    }
}
```
이런식으로 구현하시면 됩니다.

그런데, 이 알고리즘은 매우 간단하기에, 조금 더 나아가서 자기 구성 순차 탐색 을 설명하려 합니다.<br>
자기 구성 순차 탐색은 자주 사용되는 항목을 배열의 앞쪽에 배치해서 순차탐색의 계산량을 줄여주는 방법입니다.<br>
자기 구성 순차 탐색에는 전진 이동법, 전위법 등의 방법이 있습니다.

### 전진 이동법
전진 이동법은 어떤 항목이 탐색이 되면 그 항목을 배열의 맨 앞에 배치하는 방법입니다. 한 번 찾은 데이터를 계속해서 찾을 때 쓰면 탐색의 효율을 끌어 올릴 수 있습니다.<br><br>
{1, 3, 5, 7, 9, 2, 4, 6, 8, 0} 에서 4를 찾는다고 가정하면, 0번 부터 6번 인덱스 까지 순회를 하면서 4를 찾아내고, 맨 앞으로 옮깁니다. 그러면<br>
{4, 1, 3, 5, 7, 9, 2, 6, 8, 0} 이 되고, 4를 연속해서 찾게 되면 더 빨리 찾을 수 있게 됩니다.<br>
코드로 구현해보면 아래와 같습니다.
```cpp
#include <stdio.h>
int Move2Front(int arr[], int n, int x){
    for(int i=0; i<n; i++){
        if(arr[i] == x){
            for(int j=i-1; j>=0; j--){
                arr[j+1] = arr[j];
            }
            arr[0] = x;
            return i;
        }
    }
    return -1;
}

int main(){
    const int n = 10;
    int arr[n] = {1, 3, 5, 7, 9, 2, 4, 6, 8, 0};
    int x =  6;
    int result = Move2Front(arr, n, x);
    if(result == -1) printf("Not Found\n");
    else{
        printf("[[find]] idx = %d\n", result);
        printf("arr = {");
        for(int i=0; i<n; i++) printf("%d ", arr[i]); printf("}\n");
    }
}
```

Move2Front함수에서 순차 탐색을 한 뒤, 발견이 되면 그 값을 맨 앞으로 옮기고, 발견된 곳의 인덱스를 반환합니다.<br>
만약 찾지 못한다면, -1 을 반환합니다.

### 전위법
전진 이동법은 맨 앞으로 보내지만, 전위법은 발견될 때 마다 한 칸씩 앞으로 이동합니다.<br>
만약 {1, 3, 5, 7, 9, 2, 4, 6, 8, 0} 과 같은 배열이 있고, 2를 찾는다고 가정합시다.<br>
0부터 5번 인덱스까지 순회를 해서 2를 찾아냅니다. 찾으면 그 값을 한 칸 앞으로 보내서<br>
{1, 3, 5, 7, 2, 9, 4, 6, 8, 0} 가 되고, 2를 한 번 더 찾으면<br>
{1, 2, 5, 2, 7, 9, 4, 6, 8, 0}이 됩니다.<br>
전진 이동법은 최근에 나온게 앞으로 가는 성향이 강하다면, 전위법은 자주 나온것이 앞으로 가는 성향이 있습니다. 코드로 구현해보면 아래와 같습니다.
```cpp
#include <stdio.h>
int transpose(int arr[], int n, int x){
    for(int i=0; i<n; i++){
        if(arr[i] == x) {
            if (i != 0) {
                int tmp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = tmp;
            }
            return i;
        }
    }
    return -1;
}

int main(){
    const int n = 10;
    int arr[n] = {1, 3, 5, 7, 9, 2, 4, 6, 8, 0};
    int x =  6;
    int result = transpose(arr, n, x);
    if(result == -1) printf("Not Found\n");
    else{
        printf("[[find]] idx = %d\n", result);
        printf("arr = {");
        for(int i=0; i<n; i++) printf("%d ", arr[i]); printf("}\n");
    }
}
```
