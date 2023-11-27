---
layout: single
title: '선형 결합, 생성, 기저 벡터'
categories: 선형대수의본질
tag: [math, vector, Linear combinations]
toc: true 
author_profile: false
use_math: true
sidebar:
    nav: "counts"

---

<i><span style="font-size: 14px;">모든 내용은 3Blue1Brown의 <a href ='https://www.3blue1brown.com/topics/linear-algebra'>'Essence of Linear Algebra' </a> 을 번역한 <a href='https://www.youtube.com/@3Blue1BrownKR'>3Blue1Brown 한국어</a>를 정리한 내용입니다.</span></i>

----------------

<br>

## 기저벡터 (Basis Vectors)

(3, -2) 처럼 벡터를 묘사하는 숫자 쌍이 하나 있을 때, 각 좌표값을 스칼라로써 생각해보시기 바랍니다. 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/coord_scalar.gif){: .align-center }

$xy$ 좌표계에는 특수한 벡터 두 개가 있습니다. 첫 번째는 오른쪽을 가리키며 길이가 1인 벡터로, 일반적으로 **î** (i-hat) 이나 **x-단위벡터**라 부릅니다. 

두 번째는 위쪽을 가리키며 길이가 1인 벡터로, 일반적으로 **ĵ** (j-hat) 이나 **y-단위벡터**라 부릅니다. 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/unit_bases.png){: .align-center }

이제 벡터의 x좌표를 î을 스케일하는 스칼라로, y좌표를 ĵ을 스케일하는 스칼라로 생각해봅시다. 

이런 의미에서 이 좌표쌍이 나타내는 벡터는 **두 스케일된 벡터의 합**입니다. 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/basis_vectors.png){: .align-center }

여기서 단위벡터 î과 ĵ는 특별한 이름을 가지게 됩니다.

><span style="color:#72E093">**î**</span> 와 <span style="color:#E06E6E">**ĵ**</span> 는 $xy$ 좌표계의 **"기저벡터"**이다.

이 두 벡터를 통틀어 좌표계의 **기저**라고 부릅니다.

기저는 기본적으로 좌표쌍을 스칼라로써 생각할 때, 그 스칼라들이 스케일하는 실제 대상들이 되는 벡터입니다.

## 다양한 기저벡터 선택

만약 다른 기저벡터를 선택한다면, 새로운 좌표계를 얻을 수 있습니다.

예를 들어, 오른쪽 위를 가리키는 어떤 벡터와 오른쪽 아래를 가리키는 어떤 벡터를 선택한다고 가정해봅시다. 이 두 벡터를 기저벡터로 사용하여 각 벡터를 스케일한 후 더하면 어떤 결과를 얻을 수 있을까요?

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/alternate_basis.png){: .align-center }

정답은 모든 2차원 벡터를 만들 수 있다는 것입니다. 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/linear_combination.gif){: .align-center}

선택한 새로운 기저벡터들을 사용하면, 특정한 스칼라를 선택하여 그 벡터들을 스케일하고 더하면 어떤 점을 가리키는 2차원 벡터든지 표현할 수 있습니다.

이렇게 선택한 새로운 기저벡터들은 표준 기저인 î과 ĵ를 사용한 것과는 다르게, 좌표 공간 상의 벡터들을 다르게 표현합니다. 

우리가 벡터를 수적으로 표현할 때, 그것은 우리가 선택한 기저벡터에 의존한다는 사실을 이해하는 것이 중요합니다.

## 선형 결합 (Linear Combinations)

이처럼 두 벡터를 스케일하고 더하여 새 벡터를 얻는 모든 연산을 **선형 결합** 이라고 부릅니다.

> '**선형**' 이라는 단어는 어디에서 왔을까요? 이것이 선과 관련이 있는 이유는 뭘까요? 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/linear_combination_def.gif){: .align-center }

두 스칼라 중 하나를 고정하고 다른 하나의 값을 자유롭게 놓는다면, 벡터의 머리가 한 직선을 그리게 됩니다. 

두 스칼라의 범위를 자유롭게 놓고 얻을 수 있는 모든 가능한 벡터를 고려하면 대부분의 경우,  **평면 위 모든 점**에 다다를 수 있을 것입니다. 

그러나 두 기저벡터가 같은 직선상에 위치한다면 결과 벡터의 끝점이 원점을 지나는 한 직선으로 제한될 것입니다.

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/parallel_combination.gif){: .align-center }


두 벡터가 모두 **영벡터**인 경우에는 원점에 갇혀 있게 됩니다. 

주어진 벡터 쌍의 선형 결합으로 얻을 수 있는 모든 결과 벡터의 집합을 두 벡터의 **생성(선형 생성)** 이라고 합니다. 

> 벡터 $\vec{v}$와 $\vec{w}$ 의 "**생성**"은 그들의 **모든 선형 결합의 집합**입니다.

대부분 2차원 벡터 쌍의 생성은 2차원 공간의 벡터 전체가 됩니다. 두 벡터의 선형 생성이란 근본적으로 이렇게 묻는 것과 같습니다. 

> **"벡터의 덧셈과 스칼라배, 이 두 기초 연산만 가지고, 다다를 수 있는 모든 가능한 벡터들엔 무엇이 있는가?"**

## 벡터 vs 점 

### 2차원 벡터

백터의 모음을 다룰 때는, 각각을 공간상 **점**으로 나타내는 것이 일반적입니다. 

점의 위치는 벡터의 끝점으로 놓고, 벡터의 시작점(꼬리)은 원점에 위치한다고 생각합니다.

![vector_ perspective]({{site.url}}/images/
2023-11-27-linear_combinations/point_line.gif){: .align-center }

이렇게 함으로써 어떤 직선에 나열된 모든 가능한 벡터를 그 직선 자체로 쉽게 생각할 수 있습니다. 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/point_space.gif){: .align-center }

마찬가지로, 모든 가능한 2차원 벡터를 한 번에 생각할 때는 각자의 끝점이 위치하는 곳에 점으로써 개념화할수 있습니다.

일반적으로는 **벡터 자체**를 다룰 때는 주로 **화살표**로 생각하고, 벡터의 모음(집합)으로 다룰 때는 점으로 생각하는 것이 편리합니다. 

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/think_about_vectors.png){: .align-center }

### 3차원 벡터 

3차원 공간에서 서로 다른 방향을 가리키고 있는 두 벡터에 대하여 그들을 생성한다는 것은 두 벡터의 모든 선형 결합의 집합입니다. 

즉, 두 벡터를 각각 스케일하여 더할 때 얻을 수 있는 모든 가능한 벡터의 집합입니다. 스케일된 벡터들을 더해서 만들어지는 벡터의 끝점들을 상상하면 그 끝점은 3차원 공간의 원점을 지나는 어떤 평면을 그려냅니다.

$$\vec{x} = a\vec{v} + b\vec{w}$$

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/span_in_3d.gif){: .align-center }

이 평면이 바로 두 벡터의 **생성**입니다. 

세 번째 벡터를 추가해 이 세 벡터의 생성을 생각한다면, 세 다른 스칼라를 선택하여 각 벡터를 스케일한 뒤 모두 더하는 것입니다. 

만약 세 번째 벡터가 다른 두 벡터의 생성 위에 놓여 있다면, 생성은 변하지 않고 똑같은 평면에 갇히게 됩니다. 

$$\vec{u} = a\vec{v} + b\vec{w}$$

그러나 세 번째 벡터가 두 벡터의 생성 위에 놓여있지 않는 경우, 그 벡터가 새로운 방향을 가리키기 때문에 모든 가능한 3차원 벡터에 접근할 수 있게 됩니다. 

세 번째 벡터를 스케일하면 두 벡터의 생성의 평면이 그 벡터를 따라 움직여 공간 전체를 휩쓸게 됩니다.

$$\vec{x} = a\vec{v} + b\vec{w} + c\vec{u}$$

![vector_ perspective]({{site.url}}/images/2023-11-27-linear_combinations/span_in_3d_3vector.gif){: .align-center }

## 선형 종속 (Linearly Dependent)

세 번째 벡터가 다른 두 벡터의 생성에 놓이는 경우나 두 2차원 벡터가 일직선 위에 정렬한 경우, 이 벡터들 중 최소한 하나는 불필요한 경우로, 생성에 아무것도 더하지 못하는 경우를 설명하는 용어가 있습니다.

이러한 경우를 "**선형 종속**"이라고 합니다. 

$$\vec{u} = a\vec{v} + b\vec{w}$$

이는 벡터들 중 하나가 다른 벡터들의 선형 결합으로 표현될 수 있다는 것을 의미합니다.


## 선형 독립 (Linearly Independent)

만약 벡터 모두가 각자의 생성에 다른 차원을 구성한다면, 이러한 벡터들을 "**선형 독립**"이라고 합니다. 

$$\vec{u} \neq a\vec{v} + b\vec{w}$$

즉, 어떤 벡터도 다른 벡터들의 선형 결합으로 표현되지 않는 경우를 말합니다.

-  **Linearly Dependent** : <span style="color:#53A0ED">$\vec{u}$</span> $=$ <span style="color:#D1514F">$a\vec{v}$</span> $+$ <span style="color:#1ED177">$b\vec{w}$</span>  for Some <span style="color:#D1514F">$a$</span>  and <span style="color:#1ED177">$b$</span>
- **Linearly Independent** : <span style="color:#53A0ED">$\vec{u}$</span> $=$ <span style="color:#D1514F">$a\vec{v}$</span> $+$ <span style="color:#1ED177">$b\vec{w}$</span>  for All <span style="color:#D1514F">$a$</span>  and <span style="color:#1ED177">$b$</span>



## 정리

>💡 벡터 공간의 기저는 공간 전체를 생성하는 선형 독립인 벡터의 집합이다. 

