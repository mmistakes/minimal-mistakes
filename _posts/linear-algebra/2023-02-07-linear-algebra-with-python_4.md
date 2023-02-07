---
layout: single
title: "[선형대수(with 파이썬)] 3. 벡터의 곱셈"
categories: Linear-algebra
tag: [python, Linear-algebra]
toc: true
---

## 벡터의 곱셈


### 1. 용어 정리

 - **내적(inner product)** : 내적은 벡터의 특정 방향, 성분 등을 구할 때 필요하다. 마치 **벡터를 수처럼 곱하는 개념**이다. 

 - **외적(outer product)** : 외적은 면 벡터의 표현등을 구할때 필요하다. **내적의 결과가 스칼라인 숫자와 달리 외적의 결과는 벡터인 것이 큰 차이**이다.

### 2. 내적

![image](https://user-images.githubusercontent.com/100071667/217165380-b3ab3d33-7a9a-4f9f-b4b7-27b9c1a937e3.png)

백터 내적을 하면 스칼라를 만드는 곱이 됩니다.

```python
A = np.arange(3).reshape([1,3])
B = np.arange(3).reshape([3,1])
print('A')
print(A)
print('B')
print(B)
print('A.dot(B)')
print(A.dot(B))
```

결과값

```
A
[[0 1 2]]
B
[[0]
 [1]
 [2]]
A.dot(B)
[[5]]
```

### 3. 행렬곱(@)

행렬이라는 2차원 공간에서는 내적과 같은 역할을 하게 됩니다.

```python
A = np.arange(3).reshape([1,3])
B = np.arange(6).reshape([3,2])-1
print('A')
print(A)
print('B')
print(B)
print('A@B')
print(A@B)
```

결과값

```
A
[[0 1 2]]
B
[[0 1]
 [2 3]
 [4 5]]
A@B
[[10 13]]
```


---

공부한 전체 코드는 깃허브에 올렸습니다.


**[깃허브 링크](<https://github.com/mgskko/linear-algebra-with-python/blob/master/%EB%B2%A1%ED%84%B0%EC%9D%98%20%EA%B3%B1%EC%85%88.ipynb>)**
{: .notice--primary}