---
title: "이진 탐색- 상/하한선"
categories:
  - 알고리즘
#tags:
#  - 알고리즘
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---

## 1. Binary Search이란?
이진 탐색이란 데이터가 정렬돼 있는 배열에서 특정한 값을 찾아내는 알고리즘이다. 배열의 중간에 있는 임의의 값을 선택하여 찾고자 하는 값 X와 비교한다. X가 중간 값보다 작으면 중간 값을 기준으로 좌측의 데이터들을 대상으로, X가 중간 값보다 크면 배열의 우측을 대상으로 다시 탐색한다. 동일한 방법으로 다시 중간의 값을 임의로 선택하고 비교한다. 해당 값을 찾을 때까지 이 과정을 반복한다.

## 2. Lower Bound/Upper Bound란?
이진 탐색이 데이터 내 특정 값을 정확히 찾는 것이라면 lower bound와 upper bound는 이진 탐색 알고리즘에서 약간 변형된 것으로 중복된 자료가 있을 때 유용하게 탐색할 수 있는 알고리즘이다.

### 2.1 Lower Bound
> 데이터 내 특정 X값보다 같거나 큰 값이 처음 나오는 위치를 리턴해주는 알고리즘이다.

이진 탐색과 다른 점은 크기가 9인 int test[] = {1,2,2,3,3,3,4,6,7} 이 주어질 때 이진 탬색은 정확히 같은 값이 있는 곳을 찾지만 lower bound는 주어진 값보다 큰 값이 처음으로 나오는 걸 리턴해야 하는데 만약 lower_bound(9)면 주어진 배열크기 만큼 리턴되어야 하기 때문에 high = array.length-1이 아니고 high = array.length로 지정 해야 한다.

그리고 탐색한 값이 주어진 값보다 크거나 같으면 바로 리턴하지 않고 크거나 같은 값이 처음으로 나오는 값을 찾기 위해 범위를 더 좁히면서 찾아간다.

 따라서 크거나 같은 경우 high = mid로 지정해서 범위를 좀 더 좁혀 나가면서 찾아가는 것이다

```java
public static int lowerBound(int[] array, int value){
    int low = 0;
    int high = array.length;
    while(low < high){
        int mid = (high + low)/2;
        if(value <= array[mid]) {
            high = mid;
        }else{
            low = mid +1;
        }
    }
    return low;
}
```

### 2.2 Upper Bound
> 데이터 내 특정 X값보다 처음으로 큰 값이 나오는 위치를 리턴해주는 알고리즘이다.

lower bound와 마찬가지로 upper bound는 주어진 값보다 큰 값이 처음으로 나오는 걸 리턴해야 하는데 만약 upper_bound(9)면 주어진 배열 크기만큼 리턴되어야 하기 때문에 high = array.length-1이 아니고 high = array.length로 지정 해야 한다.

그리고 탐색한 값이 주어진 값보다 크다면 바로 리턴하지 않고 최초로 큰 값이 있는 위치를 찾기 위해 high = mid 로 지정하여 범위를 좁히면서 찾아가면 된다.

```java
public static int upperBound(int[] arry, int value) {
    int low = 0;
    int high = arry.length;
    while (low < high) {
        int mid = (high + low)/2;
        if(value >= array[mid]){
            low = mid+1;
        }else{
            high = mid;
        }
    }
    return low;
}
```


## Ref.
[잭팟53-이진탐색-상/하한선](https://jackpot53.tistory.com/33)
