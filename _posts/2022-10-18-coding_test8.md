---
layout: single
title:  "코딩 테스트 책 - 8차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 8차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

### 부품찾기

```markdown
동빈이네 전자 매장에는 부품이 N개 있다. 각 부품은 정수 형태의 고유한 번호가 있다. 어느 날 손님이 M개의 종류의 부품을 대량으로 구매하겠다며 당일 날 견적서를 요청했다. 동빈이는 때를 놓치지 않고 손님이 문의한 부품 M개 종류를 모두 확인해서 견적서를 작성해야 한다. 이때 가게 안에 부품이 모두 있는지 확인하는 프로그램을 작성해보자.
예를 들어 가게의 부품이 총 5개일 때 부품 번호가 다음과 같다고 하자.

N=5
[8, 3, 7, 9, 2]

손님은 총 3개의 부품이 있는지 확인 요청했는데 부품 번호는 다음과 같다.

M=3
[5, 7, 9]

이때 손님이 요청한 부품 번호의 순서대로 부품을 확인해 부품이 있으면 yes를, 없으면 no를 출력한다. 구분은 공백으로 출력


- 입력 예시
5
8 3 7 9 2
3
5 7 9

- 출력 예시
no yes yes
```

&nbsp;

- in 사용

```python
m = int(input())
num_list = list(map(int,input().split()))
n = int(input())
check_list = list(map(int,input().split()))

for i in check_list:
  if i in num_list:
    print('yes', end=' ')
  else:
    print('no', end= ' ')
```

- 이진 탐색

```python
def binary_def(array, target, start, end):
    while start <= end:
        mid = (start + end) // 2
        
        if array[mid] == target:
            return mid
        elif target < array[mid]:
            end = mid - 1
        else:
            start = mid + 1
    return None


m = int(input())
num_list = list(map(int,input().split()))
num_list.sort() # 이진탐색 사용 위해서 정렬
n = int(input())
check_list = list(map(int,input().split()))

for i in check_list:
  result = binary_def(num_list, i, 0 ,m-1)
  if result != None:
    print('yes', end= ' ')
  else:
    print('no', end= ' ')
```

- 계수 정렬

```python
m = int(input())
array = [0] * 1000001 # 배열 생성

for i in input().split():
  array[int(i)] = 1

n = int(input())
check_list = list(map(int,input().split()))

for i in check_list:
  if array[i] == 1:
    print('yes', end= ' ')
  else:
    print('no', end = ' ')
```

&nbsp;

### 떡볶이 떡 만들기

```markdown
오늘 동빈이는 여행 가신 부모님을 대신해서 떡집 일을 하기로 했다.
오늘은 떡볶이 떡을 만드는 날이다.
동빈이네 떡볶이 떡은 재밌게도 떡볶이 떡의 길이가 일정하지 않다.
대신에 한 봉지 안에 들어가는 떡의 총 길이는 절단기로 잘라서 맞춰준다.
절단기에 높이(H)를 지정하면 줄지어진 떡을 한 번에 절단한다.
높이가 H보다 긴 떡은 H 위의 부분이 잘릴 것이고, 낮은 떡은 잘리지 않는다.
예를 들어 높이가 19, 14, 10, 17cm 인 떡이 나란히 있고 절단기 높이를 15cm로 지정하면
자른 뒤 떡의 높이는 15, 14, 10, 15cm가 될 것이다.
잘린 떡의 길이는 차례대로 4, 0, 0, 2cm이다.
손님은 6cm만큼의 길이를 가져간다.
손님이 왔을 때 요청한 총 길이가 M일 때, 적어도 M만큼의 떡을 얻기 위해 절단기에 설정할 수 있는 높이의 최댓값을 구하는 프로그램을 작성하세요.


- 입력 조건
첫째 줄에 떡의 개수 N과 요청한 떡의 길이 M이 주어진다. (1 <= N <= 1,000,000, 1 <= M <= 2,000,000,000)
둘째 줄에는 떡의 개별 높이가 주어진다. 떡 높이의 총합은 항상 M 이상이므로, 손님은 필요한 양만큼 떡을 사갈 수 있다.
높이는 10억보다 작거나 같은 양의 정수 또는 0 이다.

- 출력 조건
적어도 M만큼의 떡을 집에 가져가기 위해 절단기에 설정할 수 있는 높이의 최댓값을 출력한다.


- 입력 예시
4 6
18 15 10 17

- 출력 예시
15
```

- 이진탐색 풀이

```python
m,n = map(int, input().split())
num_list = list(map(int, input().split()))

# 위치 초기화
start = 0
end = max(num_list)

# 이진탐색
result = 0
while start <= end:
  total = 0
  mid = (start + end) // 2
  for i in num_list:
    if i > mid:
      total += i - mid

# 떡의 양이 부족한 경우 더 많이 자르기
  if total < n:
    end = mid - 1
  else:
    result = mid
    start = mid + 1

print(result)
```

