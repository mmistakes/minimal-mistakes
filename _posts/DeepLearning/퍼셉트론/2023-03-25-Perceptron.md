---
layout: single
title: "퍼셉트론 구현해보기!"
categories: ML_DL
tag: [Python,AND 게이트,OR 게이트,NAND 게이트,XOR 게이트]
toc: true
toc_sticky: true
author_profile: false

---

# 퍼셉트론이 뭐죵?

- 퍼셉트론은 다수의 신호를 입력으로 받아 하나의 신호로 출력한다.
- 여기서 말하는 *신호* 란 전류가 "흐른다", "안흐른다"의 두 가지 값을 가질 수 있다.
- 뉴런에서 보내온 신호의 총합이 정해진 한계를 넘어설 때만 1을 출력하며 그 한계를 ***임계값*** 이라고한다.
- 신호가 흐른다 -> 1 , 신호가 흐르지 않는다 -> 0
-  ![](https://i.imgur.com/Hg5GU0d.png) 식으로 표현하면 이렇다.


## AND 게이트

![](https://i.imgur.com/fyLnzzM.png)

- 입력이 둘이고 출력은 하나다.
- 입력이 모두 1일 때만 1을 출력하고 그 이외에는 0을 출력한다.

### 파이썬으로 간단한 구현

```python
def AND(x1, x2):
    w1, w2, theta = 0.5,0.5,0.7
    tmp = x1*w1 + x2*w2
    
    if tmp <= theta:
        return 0
    elif tmp > theta:
        return 1

print("AND 함수 기대값 0 출력" , AND(0,1))
print("AND 함수 기대값 1 출력" , AND(1,1))
```

#### 코드 이해하기

- w1, w2 는 가중치 , theta는 임계 값이다.
- 파라미터 x1, x2 각각 0 과 1 을 받으면 미리 정해둔 가중치와 곱한 값이 tmp 변수에 저장된다.
- 이 떄 tmp의 변수 값이 임계 값 0.7. 보다 높다면 1을 출력한다.

### 가중치와 편향 도입

```python
def AND(x1, x2):

    x = np.array([x1, x2])
    w = np.array([0.5, 0.5])
    b = -0.7 # theta -> -b 로 변경
    tmp = np.sum(w*x) + b

    if tmp <= 0:
        return 0
    else:
        return 1
```

#### 코드 이해하기

- ![](https://i.imgur.com/IEKbQbg.png) 아까전에 쎄타를 -b로 치환한다.
-  변수 x, w 는 브로드캐스팅으로 계산된다.
- 총 합에서 편향이 더해져 0 보다 작은지 판별한뒤 값이 리턴된다.


## NAND 게이트와 OR 게이트

![](https://i.imgur.com/DYMLDIz.png)
- NAND 진리표

----
---


![](https://i.imgur.com/QMM4Nha.png)
- OR 진리표

### 파이썬으로 구현

```python
def NAND(x1, x2):

    x = np.array([x1, x2])
    w = np.array([-0.5, -0.5]) # and와는 가중치(w와 b)만 다르다!
    b = 0.7
    tmp = np.sum(w*x) + b

    if tmp <= 0:
        return 0
    else:
        return 1

def OR(x1, x2):

    x = np.array([x1, x2])
    w = np.array([0.5, 0.5]) # and와는 가중치(w와 b)만 다르다!
    b = -0.2
    tmp = np.sum(w*x) + b

    if tmp <= 0:
        return 0
    else:
        return 1
```

- AND,NAND,OR 는 모두 같은 구조의 퍼셉트론이다.
- 차이는 가중치 매개변수의 값뿐이다.

## 퍼셉트론의 한계

- ![](https://i.imgur.com/1G7XgYL.png)
- 위의 OR 게이트는 0,0 일 때 0을 출력하고 나머지 (0, 1) , (1, 0) , (1 , 1) 일 때는 1을 출력한다.
   따라서 위 그림과 같이 1개의 직선으로 네 점을 나눌 수 있다.

- XOR 게이트는 배타적 논리 회로다.
- ![](https://i.imgur.com/1CQyva4.png)
- ![](https://i.imgur.com/MabniwU.png)
- ![](https://i.imgur.com/rH1zALf.png)
- 위와 같은 XOR 게이트 같은 경우 직선으로 나눌 수 없다.
- 하지만 아래 그림과 같이 곡선이면 나눌 수 있다.
- ![](https://i.imgur.com/505G9Ln.png)

### 아니 그럼 XOR 게이트는 어떻게 만들지?

- XOR 게이트를 만드는 방법은 다양하지만 그 중에 하나는 앞에서 만든 AND, NAND, OR 게이트를 조합하면 된다.
- ![](https://i.imgur.com/WpMVOOY.png)
- ![](https://i.imgur.com/X2h4ZfM.png)
- 다음의 그림을 다시 진리표로 나타내면 아래와 같다.
- ![](https://i.imgur.com/8Bvwy7k.png)
- 복습을 해보자면 
	- x1, x2 값이 둘 다 0이면 NAND 에서 값은 *1*, OR 에서는 *0* 이다.
	- x1, x2 값이 0, 1이면 NAND 에서 값은 *1*, OR 에서는 *1* 이다.
	- x1, x2 값이 1, 0이면 NAND 에서 값은 *1*, OR 에서는 *1* 이다.
	- x1, x2 값이 둘 다 1이면 NAND 에서 값은 *0*, OR 에서는 *1* 이다.
		- 위 값으로 다시 AND 게이트에 대입하면 XOR이 완성된다.

### 파이썬으로 구현

```python
def XOR(x1, x2):

    s1 = NAND(x1, x2)
    s2 = OR(x1, x2)
    y = AND(s1, s2)

    return y
```

### 다층 구조의 네트워크

![](https://i.imgur.com/LqC0SQC.png)

- XOR 의 퍼셉트론을 그림으로 표현하면 이렇다.
- AND, OR은 단층 퍼셉트론인 데 반해 XOR은 2층 퍼셉트론이다.
- 이처럼 층이 여러개인 퍼셉트론을 다층 퍼셉트론이라고 한다.
- 놀라운 사실은 NAND 게이트의 조합만으로 컴퓨터를 만들 수 있다고 한다.
- 이론상 퍼셉트론은 층을 거듭 쌓으면 비선형적인 표현도 가능하고 컴퓨터가 수행하는 처리도 모두 표현할 수 있다.

