---
title:  "[정렬] 계수 정렬"
date:   2018-05-02 21:25:00
categories:
- Easy-Algorithm
tags:
- Sort
---

### 서론
이번 글에서는 계수 정렬에 대해 소개를 하겠습니다.<br>
이 알고리즘은 원래 0이상의 정수 데이터에 대해 성립하는 알고리즘이지만, 조금만 고친다면 정수 전체에 대해 성립하는 알고리즘으로 바꿀 수 있습니다.<br>

### 작동 방식
{0, 1, 4, 3, 2, 0, 0, 4, 5, 2, 2, 3} 의 정렬 결과를 먼저 말씀드리자면,<br>
{0, 0, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5} 입니다.

기수정렬은 정렬하기 전에 각 숫자가 몇 번 나왔는지 카운팅을 합니다.<br>
0은 3번<br>
1은 1번<br>
2는 3번<br>
3은 2번<br>
4는 2번<br>
5는 1번 나왔습니다.<br>

표로 나타내봅시다.
<table>
<tr> <th>숫자</th> <td>0</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
<tr> <th>개수</th> <td>3</td> <td>1</td> <td>3</td> <td>2</td> <td>2</td> <td>1</td> </tr>
</table>

이제 누적합으로 바꿔줍시다.

<table>
<tr> <th>숫자</th> <td>0</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
<tr> <th>누적합</th> <td>3</td> <td>4</td> <td>7</td> <td>9</td> <td>11</td> <td>12</td> </tr>
</table>

누적합으로 바꾸면 새로운 정보를 얻을 수 있습니다.<br>
0은 0부터 2번 인덱스,<br>
1은 3번 인덱스,<br>
2는 4부터 6번 인덱스,<br>
3은 7, 8번 인덱스,<br>
4는 9, 10번 인덱스,<br>
5는 11번 인덱스에 들어갑니다.

이제, 각 숫자를 해당하는 인덱스에 넣어주면 됩니다.

### 구현
```cpp
#include <stdio.h>
#include <stdlib.h>

const int n = 7;

void countingSort(int arr[]){
    int *cntArr;
    int max = arr[0];
    for(int i=1; i<n; i++) max = max>arr[i]?max:arr[i]; //리스트에서 최대값 추출
    cntArr = (int*)malloc(sizeof(int) * (max + 1)); //카운팅 배열 할당
    for(int i=0; i<=max; i++) cntArr[i] = 0; //카운팅 배열 초기화
    for(int i=0; i<n; i++){ //카운팅 시작
        cntArr[ arr[i] ] ++;
    }
    for(int i=1; i<=max; i++){ //누적 합 계산
        cntArr[i] = cntArr[i] + cntArr[i-1];
    }
    int tmp[n]; for(int i=0; i<n; i++) tmp[i] = arr[i]; //원본 데이터
    for(int i=n-1; i>=0; i--){ //뒤 부터 탐색
        arr[ cntArr[ tmp[i] ] - 1 ] = tmp[i]; //인덱스가 0부터 시작하므로,

                                      //cntArr[tmp[i]]-1 을 인덱스로 한다
        cntArr[ tmp[i] ]--;
    }
}

int main(){
    int arr[n] = {3, 0, 1, 1, 2, 2, 1};
    countingSort(arr);
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
}
```

### 시간 복잡도 분석
시간 복잡도를 분석해봅시다.<br>
최대값 추출, 카운팅 배열 초기화, 카운팅 모두 O(n)입니다.<br>
최대값을 d라고 하면, 누적합 계산은 O(d)입니다.<br>
배열을 채워 나가는 것은 O(n)입니다.

O(d) + O(n) = O(d+n)입니다.
