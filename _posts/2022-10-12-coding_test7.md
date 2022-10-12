---
layout: single
title:  "코딩 테스트 책 - 7차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 7차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## 범위를 반씩 좁혀가는 탐색



### **순차 탐색**

- 리스트 안에 있는 특정한 데이터를 찾기 위해 앞에서부터 데이터를 하나씩 차례대로 확인하는 방법
- 보통 정렬되지 않은 리스트에서 데이터 찾을때 사용

&nbsp;

**ex) 순차 탐색 예시**

```python
#순차 탐색 코드
def sequentail_search(n,target,array):
  #각 원소를 하나씩 확인하며
  for i in range(n):
    #현재의 원소가 찾고자 하는 원소가 동일한 경우
    if array[i] == target:
      return i+1 #현재의 위치 변환(인덱스는 0부터 시작하므로 1더하기)
  
print('생성할 원소 개수를 입력한 다음 한 칸 띄고 찾을 문자열을 입력하세요.')
input_data = input().split()
n = int(input_data[0]) #원소의 개수
target = input_data[1] #찾고자 하는 문자열

print('앞서 적은 원소 개수만큼 문자열을 입력하세요. 구분은 띄어쓰기 한 칸으로 합니다.')
array = input().split()

#순차 탐색 수형결과 출력
print(sequentail_search(n,target,array))
```

- 시간복잡도는 O(N)

&nbsp;

###  이진 탐색 : 반으로 쪼개면서 탐색하기

- 배열 내부의 데이터가 정렬되어 있어야만 사용할수 있는 알고리즘
- 찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교

&nbsp;

**재귀 함수로 구현한 이진 탐색 소스코드**

```python
#이진탐색 구현 (재귀 함수)

def binary_search(array,target,start,end):
  if start > end:
    return None
  mid = (start + end) // 2
  #찾은 경우 중간점 인덱스 반환
  if array[mid] == target:
    return mid
  #중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
  elif array[mid] > target:
    return binary_search(array,target,start,mid-1)
  #중간점의 값보다 찾고자 하는 값이 오른쪽인 경우 오른쪽 확인
  else:
    return binary_search(array,target,mid+1,end)

#n(원소의 개수)가 target(찾고자 하는 문자열)을 입력받기
n,target = list(map(int,input().split()))

#전체 원소 입력받기
array = list(map(int,input().split()))

#이진 탐색 수행 결과 출력
result = binary_search(array,target,0,n-1)

if result == None:
  print('원소가 존재하지 않습니다')
else:
  print(result +1)
```

&nbsp;

**반복문으로 구현한 이진 탐색 소스코드**

```python
# 반복문으로 구현한 이진 탐색
def binary_search(array,target,start,end):
  while start <= end:
    mid = (start+end) //2
    #찾은 경우 중간점 인덱스 반환
    if array[mid] == target:
      return mid
    #중간점 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
    if array[mid] > target:
      end = mid - 1
    #중간점 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
    else:
      start = mid + 1
  return None

#n(원소의 개수)가 target(찾고자 하는 문자열) 입력받기
n,target = list(map(int,input().split()))
#전체 원소 입력받기
array = list(map(int,input().split()))
#이진 탐색 수형 결고 출력
result = binary_search(array,target,0,n-1)
if result == None:
  print('원소가 존재하지 않습니다.')
else:
  print(result + 1)
```

- 시간 복잡도 O(logN)

&nbsp;

### 트리 자료구조

- 노드와 노드의 연결로 표현하며 여기에서 노드는 정보의 단위로서 어떤한 정보를 가지고 있는 개체로 이해할수 있음
- 그래프 자료구조의 일종으로 데이터베이스 시스템이나 파일 시스템과 같은 곳에서 많은 양의 데이터를 관리하기 위한 목적으로 사용
- **특징**
  - 트리는 부모 노드와 자식 노드의 관계로 표현
  - 트리의 최상단 노드를 루트 노드라고 함
  - 트리의 최하단 노드를 단말 노드라고 함
  - 트리에서 일부를 떼어내도 트리 구조이며 이를 서브 트리라 함
  - 트리는 파일 시스템과 같이 계층적이고 정렬된 데이터를 다루기에 적합

&nbsp;

### 이진 탐색 트리

- 트리 자료구조 중에서 가장 간단한 형태
- 이진 탐색이 동작 할 수 있도록 고안된, 효율적인 탐색이 가능한 자료구조
- **특징**
  - 부모 노드보다 왼쪽 자식 노드가 작음
  - 부모 노드보다 오른쪽 자식 노드가 큼



