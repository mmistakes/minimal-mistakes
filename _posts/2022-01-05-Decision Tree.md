---
layout: single
title:  "Decision Tree"
---

# 1. Decision Tree

- Supervised Learning 알고리즘 중 하나이다.
- 데이터 마이닝, 머신러닝에서 자주 사용하는 알고리즘이다.



# 2. Algorithm

>  가정
>
> 1. Train Data : ${(x_1, y_1), (x_2, y_2), (x_3, y_3), ..., (x_n, y_n)}$
> 2. $x_i$ : $k$개의 feature가 있는 $i$ 번째 데이터 샘플
> 3. $y_i$ : $i$ 번째 데이터 샘플의 클래스

**Step 1. 분기 전 Entropy, 분기 후보의 Entropy 계산**

**Step 2. 후보들의 Information Gain 계산**

**Step 3. 가장 높은 Information Gain 의 분기 선택**

**Step 4. 위 과정을 반복**



# 3. Entropy, Information Gain

- Entropy : 데이터가 균일하게 분류되어 있는지에 대한 척도
- Information Gain : 분기 이전의 Entropy와 분기 이후의 Entropy의 차이
- Entropy가 높게 나왔다면 클래스의 분포가 균등하게 나왔다고 볼 수 있다. 즉, 좋지 않은 상태라 볼 수 있다. 낮게 나왔다면 불균형한 상태로 클래스가 나누어져 특정 클래스로 분류되었다고 볼 수 있다.
- Information Gain의 경우 분기 이전과 이후의 Entropy를 뺀 경우로 높을수록 잘 분리된 상황이라 판단 할 수 있다.



# 4. Decision Tree의 장단점

- 장점
  1. 해석하기 쉽다. 즉, 해당 클래스로 예측했을 때 트리를 따라가며 예측 과정을 해석할 수 있다.
  2. 구현과 이해하기 쉬운 모델이다.
  3. 비모수적 모델이다. 즉, 통계모델에 요구되는 가정이 없음 (정규성, 독립성, 등분산성 등..)
- 단점
  1. 데이터의 수가 적을수록 모델이 불안정하다.
  2. Overfitting 발생 확률이 높다.



# 5. Decision Tree 예제



