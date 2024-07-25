---
title:  "내가 보려고 만든 backtracking (using Python)" 

categories: coding_tools
tag: [python, coding]
toc: true
date: 2024-07-24
last_modified_at: 2024-07-24
---

알고리즘 중 하나인 백트래킹(Backtracking)에 대해 알아보겠습니다. 이 글에서는 백트래킹을 언제 쓰는지 예시와 함께 다룰 예정입니다. (본인 공부 및 기록용) 😁

# 백트래킹(Backtracking)이란?
백트래킹은 문제를 해결하는 과정에서 가능한 모든 해를 탐색하는 알고리즘입니다. 모든 가능성을 탐색하는 방법이지만, 필요 없는 경로는 더 이상 진행하지 않고 돌아가는 방식이죠. 이게 왜 중요하냐면, 불필요한 계산을 줄여서 효율적으로 문제를 해결할 수 있기 때문입니다.

## 언제 사용하는지
"모든" 경우의 수를 탐색해야하는 경우에 주로 사용된다.
- 조합과 순열 (combination, permutation) 🌟🌟🌟
- 집합의 부분 집합 구하기 (조합과 유사) 🌟
- 퍼즐 문제 (ex. N-Queen 문제) 🌟🌟
- 그래프 탐색(ex. 미로 찾기) 🌟🌟

## 장점과 단점
장점:
- "모든 가능"한 해를 탐색하여 정확한 해를 찾을 수 있습니다.
- 불필요한 경로를 제거하여 효율성을 높일 수 있습니다.

단점:
- 최악의 경우 모든 가능한 경로를 탐색해야하므로 최악의 시간 복잡도가 높습니다.
- 문제의 크기가 커질수록 성능이 급격하게 저하될 수 있습니다.

## 예시
코드와 함께 자주 쓰이는 몇가지 예시를 들어드리겠습니다.

### 조합 (combination) 🌟🌟🌟
```python
def backtrack_combination(path, start, nums, k):
    if len(path) == k:
        print(path)
        return
    
    for i in range(start, len(nums)):
        path.append(nums[i])
        backtrack_combination(path, i + 1, nums, k)
        path.pop()  # 백트래킹

nums = [1, 2, 3]
k = 2  # 부분집합의 크기
backtrack_combination([], 0, nums, k)
```

### 순열 (permutation) 🌟🌟🌟
```python
def backtrack_permutation(path, used, nums):
    if len(path) == len(nums):
        print(path)
        return
    
    for i in range(len(nums)):
        if not used[i]:
            used[i] = True
            path.append(nums[i])
            backtrack_permutation(path, used, nums)
            path.pop()  # 백트래킹
            used[i] = False

nums = [1, 2, 3]
backtrack_permutation([], [False] * len(nums), nums)
```

### 모든 부분 집합 🌟
```python
def backtrack(subset, nums, index):
    # 현재 부분 집합 출력
    print(subset)
    
    for i in range(index, len(nums)):
        subset.append(nums[i])
        backtrack(subset, nums, i + 1)
        subset.pop()  # 백트래킹

nums = [1, 2, 3]
backtrack([], nums, 0)
```

