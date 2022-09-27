---
layout: single
title:  "코딩 테스트 책 - 1차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 1차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## 그리디 알고리즘

- 단순하지만 강력한 문제 해결 방법
- 주로 탐욕법으로 소개
- **현재 상황에서 지금 당장 좋은 것만 고르는 방법**



&nbsp;

### 예제) 거스름돈

```markdown
당신은 음식점의 계산을 도와주는 점원이다. 카운터에는 거스름돈으로 사용할 500원, 100원, 50원, 10원짜리 동전이 무한히 존재한다고 가정한다. 
손님에게 거슬러 줘야 할 돈이 N원일 때 거슬러 줘야 할 동전의 최소 개수를 구하라. 단, 거슬러 줘야 할 돈N은 항상 10의 배수이다. 
```

- 가장 큰 화폐 단위부터 돈을 거슬러 주는 것
- 500 -> 100 -> 50 -> 10 단위로 거슬러 주기

&nbsp;

[**풀이**](https://replit.com/@tlsgmltns86/codingtest?v=1)

```python
N = int(input())
sum = 0

for i in [500,100,50,10]:
  sum  += N // i
  N = N % i

print(sum)
```

- 시간 복잡도 O(K) - 화폐의 종류가 K일때
- 나머지를 통해 순환

- **가지고 있는 동전 중에서 큰 단위가 항상 작은 단위의 배수이므로 작은 단위의 동전들을 종합해 다른 해가 나올 수 없기 때문**

> 대부분의 그리디 알고리즘 문제에서는 이처럼 풀이를 위한 최소한의 아이디어를 떠올리고 이것이 정당한지 검토할 수 있어야 답을 도출할 수 있다.

&nbsp;



### 큰 수의 법칙

```markdown
2, 4, 5, 4, 6으로 이루어진 배열이 있을 때 M이 8이고, K가 3이라고 가정하자. 
이 경우 특정한 인덱스의 수가 연속으로 세 번까지만 더해질 수 있으므로 
큰 수의 법칙에 따른 결과는 6+6+6+5+6+6+6+5 인 46

배열의 크기 N, 숫자가 더해지는 횟수 M, 그리고 K가 주어질 때 동빈이의 큰 수의 법칙에 따른 결과를 출력하시오
```

&nbsp;

[풀이](https://replit.com/@tlsgmltns86/keun-suyi-beobcig?v=1)

```python
N,M,K = map(int, input().split())
data = list(map(int, input().split()))

data = sorted(data, reverse=True)
print(data[0]* (M//K * K) + data[1] * (M%K))
```

> 역순으로 정렬 후 2번째 큰수까지 사용

&nbsp;

### 숫자 카드 게임

```markdown
    1. 숫자가 쓰인 카드들이 N x M 형태로 놓여 있다. 이때 N은 행의 개수를 의미, M은 열의 개수를 의미
    2. 먼저 뽑고자 하는 카드가 포함되어 있는 행을 선택한다.
    3. 그다음 선택된 행에 포함된 카드들 중 가장 숫자가 낮은 카드를 뽑아야 한다.
    4. 따라서 처음에 카드를 골라낼 행을 선택할 때, 이후에 해당 행에서 가장 숫자가 낮은 카드를 뽑을 것을 고려하여 최종적으로 가장 높은 숫자의 카드를 뽑을 수 있도록 전략을 세워야 한다.
```

&nbsp;

[풀이](https://replit.com/@tlsgmltns86/susja-kadeu-geim?v=1)

```python
n, m = map(int, input().split())

data = [list(map(int,input().split())) for i in range(n)]

min_s = 0
for i in range(len(data)):
  if min_s <= min(data[i]):
    min_s = min(data[i])

print(min_s)
```

> 각 행마다의 최소값중 가장 큰 값

&nbsp;



### 1이 될 때까지

```markdown
N이 1이 될때 까지 수행, 두 번째 연산은 N이 K로 나누어떨어질 때만 선택할수 있음
	
	1. N에서 1을 뺌
	2. N을 K로 나눈다.
```

&nbsp;



[**풀이**](https://replit.com/@tlsgmltns86/1i-doelddaeggaji?v=1)

```python
a,b = map(int,input().split())

cnt = 0
if a>= b:
  while a != 1:
    if a % b == 0:
      a = a//b
    else:
      a = a-1
    cnt += 1

print(cnt)
```

> 예외 케이스를 먼저 생각





