---
layout: single
title:  "코딩 테스트 책 - 5차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 5차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## 정렬 알고리즘



### **선택 정렬**

- 데이터가 무작위로 있을때 이중에서 가장 작은 데이터를 선택해 맨 앞에 있는 데이터와 바꾸고, 그다음 작은 데이터를 선택해 앞에서 두 번째 데이터와 바꾸는 과정을 반복
- 가장 작은 것을 선택한다는 의미

**ex) 선택 정렬 예시**

```python
array = [7,5,9,0,3,1,6,2,4,8]

for i in range(len(array)):
    min_index = i # 가장 작은 원소 인덱스
    for j in range(i+1, len(array)):
        if array[min_index] > array[j]:
            min_index = j
    array[i], array[min_index] = array[min_index], array[i] # 변경

print(array)
>> [0,1,2,3,4,5,6,7,8,9]
```

- 선택 정렬의 시간 복잡도
  - ![image-20220930172430175](/images/2022-09-29-coding_test5/image-20220930172430175.png)
  - 데이터의 개수가 10,000개 이상이면 정렬 속도가 급격하게 느려짐

&nbsp;

###  삽입 정렬

- 특정한 데이터를 적절한 위치에 '삽입'한다는 의미
- 삽입정렬은 두 번째 데이터부터 시작, 첫 번째 데이터는 이미 정렬되었다고 판단

**ex) 삽입 정렬 예시**

```python
array = [7,5,9,0,3,1,6,2,4,8]

for i in range(1, len(array)):
    for j in range(i, 0, -1):
        if array[j] < array[j-1]:
            array[j], array[j-1] = array[j-1], array[j]
        else:
            break

print(array)
>> [0,1,2,3,4,5,6,7,8,9]
```

- 삽입 정렬의 시간 복잡도
  - ![image-20220930172430175](/images/2022-09-29-coding_test5/image-20220930172430175.png)
  - 현재 리스트가 정렬된 상태라면 선택 정렬보다 빠름

&nbsp;



### 퀵 정렬

- 가장 많이 사용되는 알고리즘
- 기준 데이터를 설정하고 그 기준보다 큰 데이터와 작은 데이터의 위치를 변경
- 재귀 함수와 동작원리가 같음

**퀵 정렬 소스코드**

```python
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]


def quick_sort(array, start, end) :
  if start >= end: #원소가 1개인 경우 종료
    return
  pivot = start
  left = start + 1
  right = end
  while left <= right:
    #피벗보다 큰 데이터를 찾을 때까지 반복
    while left <= end and array[left] <= array[pivot]:
      left += 1

    #피벗보다 작은 데이터를 찾을 때까지 반복
    while right > start and array[right] >= array[pivot]:
      right -= 1

    if left > right: #엇갈렸다면 작은 데이터와 피벗을 교체
      array[right], array[pivot] = array[pivot], array[right]
    
    else: # 엇갈리지 않았다면 작은 데이터와 피벗을 교체
      array[left], array[right] = array[right], array[left]

    #분할 이후 왼쪽과 오른쪽 부분에서 각각 정렬 수행

  quick_sort(array, start, right - 1)
  quick_sort(array, right +1, end)


quick_sort(array, 0, len(array)-1)
print(array)

>> [0,1,2,3,4,5,6,7,8,9]
```

**파이썬의 장점을 살린 퀵 정렬 소스코드**

```python
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array):
  # 리스트가 하나 이하의 원소만을 담고 있다면 종료
  if len(array) <= 1:
    return array

  pivot = array[0] #피벗은 첫 번째 원소
  tail = array[1:] # 피벗을 제외한 리스트 


  left_side = [x for x in tail if x <= pivot] #분할된 왼쪽 부분
  right_side = [x for x in tail if x >= pivot] #분할된 오른쪽 부분




  #분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬을 수행하고, 전체 리스트를 반환 
  return quick_sort(left_side) + [pivot] + quick_sort(right_side)



print(quick_sort(array))
>> [0,1,2,3,4,5,6,7,8,9]
```

- 최악의 경우 ![image-20220930172430175](/images/2022-09-29-coding_test5/image-20220930172430175.png), 평균은 O(NlogN)

&nbsp;

### 계수 정렬

- 특정한 조건이 부합할 때만 사용할 수 있지만 매우 빠른 정렬 알고리즘
- O(N+K) 의 시간복잡도 보장
  - 데이터 개수가 N
  - 데이터 중 최댓값이 K

**계수 정렬 소스코드**

```python
array = [7,5,9,0,3,1,6,2,9,1,4,8,0,5,2]

#모든 범위를 포함하는 리스트 선언(모든 값은 0으로 초기화)
count = [0] * (max(array) + 1)


for i in range(len(array)) :
  count[array[i]] += 1 # 각 데이터에 해당하는 인덱스의 값 증가


for i in range(len(count)): # 리스트에 기록된 정렬 정보 확인
  for j in range(count[i]):
    print(i, end =' ') # 띄어쓰기를 구분으로 등장한 횟수만큼 인덱스 출력
```



### 정렬 라이브러리

- sorted()
  - 퀵 정렬과 동작 방식이 비슷한 병합 정렬을 기반으로 만듬
  - 퀵보다는 일반적으로 느려도 최악의 경우 O(NlogN)

- 문제 유형
  1. 정렬 라이브러리로 풀 수 있는 문제
     - 단순히 정렬 기법을 알고 있는지 물어보는 유형, 기본 정렬 라이브러리의 사용 방법으로 해결
  2. 정렬 알고리즘의 원리에 대해서 물어보는 문제
     - 선택, 삽입, 퀵 정렬등의 원리를 알고 있어야 문제 해결 가능
  3. 더 빠른 정렬이 필요한 문제
     - 퀵 정렬 기반의 정렬 기법으로는 풀 수 없으며 계수 정렬 등의 다른 정렬 알고리즘을 이용하거나 알고리즘의 구조적인 개선이 필요
