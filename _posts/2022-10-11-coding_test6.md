---
layout: single
title:  "코딩 테스트 책 - 6차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true

---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 6차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## 정렬 알고리즘 연습



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

###  위에서 아래로

```markdown
# 문제
하나의 수열에는 다양한 수가 존재하며, 이런 큰 수는 크기와 상관 없이 무작위로 주어진다. 이 수를 큰수 부터 작은 수까지 내림차순으로 정렬하면되는 문제다. 즉 수열을 내림차순으로 정렬하는 프로그램을 만드시오.

# 입력 예시
3
5
27
12

# 출력 예시
27 15 12
```

- 풀이

```python
m = int(input())
num = []

for _ in range(m):
  num.append(int(input()))
num.sort(reverse=True)

print(num)
```

- python 기본 라이브러리 sort 사용

&nbsp;

### 성적이 낮은 순서로 학생 출력하기

```markdown
# 문제
N명의 학생의 성적 정보가 주어진다. 형식은 이름 성적 으로 주어지는데 이때 이들의 성적이 낮은 순으로 학생 이름을 출력하는 프로그램을 작성하시오.

# 입력 예시
2
홍길동 96
이순신 77

# 출력 예시
이순신 홍길동
```

- 풀이

```python
m = int(input())

dic = []

for _ in range(m):
  name, score = input().split()
  dic.append((name, int(score)))

dic.sort(key=lambda x : x[1])

for i in dic:
  print(i[0], end= ' ')
```

&nbsp;

### 두 배열의 원소 교체

```markdown
# 문제
동빈이는 두 개의 배열 A와 B를 가지고 있다. 두 배열은 N개의 원소로 구성되어 있으며, 배열의 원소는 모두 자연수이다. 동빈이는 최대 K 번의 바꿔치기 연산을 수행할 수 있는데, 바꿔치기 연산이란 배열 A에 있는 원소 하나와 배열 B에 있는 원소 하나를 골라서 두 원소를 서로 바꾸는 것을 말한다. 동빈이의 최종 목표는 배열 A의 모든 원소의 합이 최대가 되도록 하는 것이며, 여러분은 동빈이를 도와야한다.

N, K, 그리고 배열 A와 B의 정보가 주어졌을 때, 최대 K 번의 바꿔치기 연산을 수행하여 만들 수 있는 배열 A의 모든 원소의 합의 최댓값을 출력하는 프로그램을 작성하시오.

# 입력
5 3
1 2 5 4 3
5 5 6 6 5

# 출력
26
```

- 풀이

```python
m,n = 5,3

list1 = list(map(int, input().split()))
list2 = list(map(int, input().split()))

list1.sort()
list2.sort(reverse=True)

for i in range(3):
  n1, n2 = list1[i], list2[i]
  if n1 < n2:
    list1[i], list2[i] = n2, n1 

print(sum(list1))
```

