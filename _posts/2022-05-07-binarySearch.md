---
layout: post
title: "이진탐색, 백준 1654번"
---

# 이진탐색 알고리즘
```
def binary_search(array, target, start, end):
    while start <= end:
        mid = (start + end) // 2

        # 원하는 값 찾은 경우 인덱스 반환
        if array[mid] == target:
            return mid
        # 원하는 값이 중간점의 값보다 작은 경우 왼쪽 부분(절반의 왼쪽 부분) 확인
        elif array[mid] > target:
            end = mid - 1
        # 원하는 값이 중간점의 값보다 큰 경우 오른쪽 부분(절반의 오른쪽 부분) 확인
        else:
            start = mid + 1

    return None
```
즉 배열이나 array에서 원하는 인덱스를 찾을 때 유리한 알고리즘이다  
시간복잡도는 O(logN)  
작년에 아무것도 모르고 알고리즘 수업 들을 때 배웠었다  
파이썬은 저렇게 쓸 필요도 없고 `bisect` 라이브러리를 쓰면 된다고 한다  

<br>

예전 수업때 핶던게 어렴풋이 기억나는데 막상 1654에 적용하려니 잘 모르겠다  
인덱스를 구하는 것에서 길이를 구하는 것으로 바뀐것인데  
그래도 응용하려니까 어렵다  

<br>

1. 오영식이 이미 가지고 있는 랜선의 개수 K, 필요한 랜선의 개수 N을 string token으로 받음  
2. 각각 랜선의 길이를 배열로 받음  
참고로 N, K, 각각 랜선의 길이는 int 범위에서 벗어나지 않으므로 int 타입  
3. 이진탐색 알고리즘을 활용할 것이므로 `min과 max를 1`  
`mid = (max + min) / 2`로 지정한다  
4. for 루프를 통해 n개를 만들 수 있는 랜선의 최대 길이를 찾는다(int)  
4-1. 
