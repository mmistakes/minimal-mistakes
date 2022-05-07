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

