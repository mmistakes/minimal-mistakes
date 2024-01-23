---
published: true
title: "[Tableau] 신병훈련소 DAY 3"

categories: Tableau
tag: [tableau]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-23
---
Tableau 신병훈련소 22기 DAY 3

----

# ✏️ 학습 - 매개변수

매개변수 | 계산, 필터 및 참조선에서 상수 값을 동적으로 바꿀 수 있는 변수, 값을 동적으로 변경해가면서 분석을 할 수 있도록 도와주는 기능

<br>

**고급 분석에서 상호작용까지 다양하게 사용**
- Top N 필터
- 구간 차원 변경
- What-If 분석
- 참조선 값
- 매개변수를 이용한 집합 만들기
- 이동 평균선
- KPI 조정하기
- 차트에서 필드 변경하기
- 대시보드에서 차트 변경하기

<br>

**매개변수 활용 순서**

사용할 **매개변수 생성** -> 생성한 매개변수를 활용할 수 있도록 **계산식 생성** -> 만들어진 계산식을 **분석에 활용**

<br>

매개변수 생성은 아래사진처럼 클릭하면 된다.

![매개변수 만들기](https://github.com/leejongseok1/algorithm/assets/79849878/b2a7d20e-6c54-46b4-9c0d-9208b078a5fd)

<br>

## KPI

아래는 목표 매출 2억을 달성한 시도와 아닌 시도를 색상으로 구분한 막대그래프이다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/ede63d9f-0309-4542-a915-ab36f14b9e39)

이제 우리가 해야할 일은 매개변수를 만들어 목표 매출을 2억이 아닌, 동적으로 값을 바꿀 수 있도록 하는 것이다.

<br>

![매개변수 만들기2](https://github.com/leejongseok1/algorithm/assets/79849878/16f44248-e30f-4e5c-ad84-b6f5ce02e29d)

이렇게 매개변수를 생성하고

<br>

아래처럼 계산식과 연결해주고 매개변수를 표시해주면

![매개변수 만들기4 - 계산식과 연결](https://github.com/leejongseok1/algorithm/assets/79849878/162dfaea-ef54-4195-bc0b-76d6439a3b40)

<br>

동적인 조건에 따라 목표 매출 값이 바뀌며 결과값이 표시된다.

![매개변수 만들기5 - 동적인 조건에 따라서 결과값이 표시됨](https://github.com/leejongseok1/algorithm/assets/79849878/e556a847-fa11-4fd9-bb09-28da494e3a1c)

<br>
<br>

## Top N

상위 N개의 품목을 확인하기 위해 매개변수를 생성해 동적으로 N을 바꿔가면서 시각화할 수도 있다.

`Top N` 매개변수를 생성하고

![image](https://github.com/leejongseok1/algorithm/assets/79849878/fc8b5dab-b35e-41b3-8dbd-600298e3c5e2)

필터 상위에서 매개변수를 활용하면

![매개변수 만들기6 - 필터에다가](https://github.com/leejongseok1/algorithm/assets/79849878/17992d03-3beb-4fef-b48e-cd7340701986)

아래사진 처럼 N을 바꿔가면서 상위 N개 제품을 볼 수 있다.

![매개변수 만들기7](https://github.com/leejongseok1/algorithm/assets/79849878/1b458f8a-46e8-4a7c-9411-706a350aad22)

<br>
<br>

## 측정값

확인하고 싶은 값들을 넣은 매개변수를 만들고

![매개변수 만들기8 - 측정값 선택](https://github.com/leejongseok1/algorithm/assets/79849878/9d1504fd-945e-4e9c-b477-a74b9302d648)

계산된 필드를 `CASE`를 이용해 만들면 원하는 측정값을 선택하면서 볼 수 있다.

![매개변수 만들기9 - 계산된 필드 만들어](https://github.com/leejongseok1/algorithm/assets/79849878/a8cf9149-4d53-4f0f-97bc-e6a28baa0341)

![image](https://github.com/leejongseok1/algorithm/assets/79849878/d3b8912f-1a1e-4e0f-8571-d31391987b37)

매출과 수익은 합계로 보는 게 맞지만 할인율은 평균 할인율로 봐야하는데, 만든 계산식은 기본적으로 모두 합계값으로 집계가 된다. 

이럴 때에는 계산식을 아래와 같이 `SUM`, `AVG` 등 집계 형태를 지정해주면 된다.

![매개변수 만들기10 - 집계형태 지정](https://github.com/leejongseok1/algorithm/assets/79849878/4b4668a7-ff80-4662-9bc3-b5136f0b9b37)


![매개변수 만들기10 - 측정값 집계](https://github.com/leejongseok1/algorithm/assets/79849878/aae49439-b0f5-4708-9be2-1db0441bf4a5)


<br>
<br>

# ✏️ 학습 - 대시보드 동작

대시보드 동작 | 대시보드 내에서 데이터를 손쉽게 탐색할 수 있도록 다양한 동작 제공

상단 대시보드 메뉴에서 동작을 실행시키면 해당 대시보드 내에서 추가할 수 있는 동작들을 볼 수 있다.

대시보드에 포함된 시트에서 '필터로 사용'을 클릭하면 해당 시트에 있는 값들이 다른 시트에 영향을 주어 필터링이 되는 것을 볼 수 있다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/0d110c51-46cf-45ce-8e68-e38965eaaf17)

**하이라이트 추가**

![image](https://github.com/leejongseok1/algorithm/assets/79849878/1ca8b4c3-d48e-4111-b5b1-29b15945ae5b)

이렇게 하이라이트를 추가하면, 제품대분류에 마우스 오버했을 때 그에 해당하는 제품 중분류만 색이 짙어져나온 것을 볼 수 있다.

![3  하이라이트 적용 예시](https://github.com/leejongseok1/algorithm/assets/79849878/0b27157c-3fea-4bf9-88e4-f0e1242710cd)

<br>
<br>
<br>

# 📝 과제

<br>

## 1. 매개 변수를 사용하여 측정값 변경하기1 & 마크 색상 표현하기

![1  매개변수를 사용하여 측정값 변경하기1   마크 색상 표현하기](https://github.com/leejongseok1/algorithm/assets/79849878/46b6b615-e865-4b02-8b12-8afccd5df91f)

<br>

## 2. 매개 변수를 사용하여 측정값 변경하기2

![2  매개변수를 사용하여 측정값 변경하기2](https://github.com/leejongseok1/algorithm/assets/79849878/e3b62bc1-fc44-4ece-adf8-de789c128563)

<br>

## 3. 대시보드 동작 적용하기

**(하이라이트 적용)**

![3  대시보드 동작 적용하기](https://github.com/leejongseok1/algorithm/assets/79849878/33acd0e2-1eb6-4fff-a130-cc2a1bfdbd1b)
