---
published: true
title: "[Tableau] 신병훈련소 DAY 2"

categories: Tableau
tag: [tableau]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-22
---
Tableau 신병훈련소 22기 DAY 2

----

# ✏️ 학습

## 행 수준 계산식 vs 집계 수준 계산식

<br>

**행 수준 계산**

- 모든 행에 대해 계산 후 결과값을 집계
- 데이터 원본에 각각 하나하나 행마다 데이터가 계산 되는 것 
- 계산된 행의 값들을 이용해서 다시 한 번 합계 값을 구함

- [수익] / [매출]
- 모든 행에 대해 결과 값이 실체화(materialized) 되기 때문에 처리 로직을 다시 실행할 필요가 없음


**집계 수준 계산**

- 각 필드 값을 집계한 후에 계산

- SUM([수익]) / SUM([매출])
- 뷰에 사용된 차원에 따라 집계 값이 달라지기 때문에 Tableau 데이터 추출에서 실체화(materialized)될 수 없음


![image](https://github.com/leejongseok1/algorithm/assets/79849878/89ff4eda-d2d9-4830-becc-04f413a2bc46)

<br>
<br>

![계산된 필드 만들기 2](https://github.com/leejongseok1/algorithm/assets/79849878/0b77d8b2-2c77-4f1c-ad25-360976b02a6d)
![계산된 필드 만들기 3](https://github.com/leejongseok1/algorithm/assets/79849878/57585eca-0c8d-4993-a211-0d522807c5c8)

위 사진은 매출을 집계 수준으로 계산하고 목표 매출인 2억이 넘는 `시도`를 색상으로 구분한 것이다.

만약에 행 수준으로 계산했다면 건당 하나가 2억 이상인 것을 구분하는 것이기 때문에 색상이 바뀌는 `시도`는 없을 것이다.

행 수준으로 구하느냐, 집계 수준으로 구하느냐에 따라서 다른 결과물을 불러온다.

행 수준 계산식을 사용하는 때는 다음과 같다.
- 열과 열의 연산이 사칙연산을 사용할 때
- 문자열을 처리할 때
- 형 변환할 때 (각각의 행마다 형을 변환해야하기 때문)
- 날짜/시간 계산 (각각의 행마다 적용해야하기 때문) 

<br>
<br>
<br>

# 📝 과제

## 1. 워드클라우드

워드클라우드 | 많은 키워드 속에서 분석 목적에 따라 핵심 키워드를 표현하는데 유용한 시각화

![image](https://github.com/leejongseok1/algorithm/assets/79849878/01364320-e1a6-4166-809f-afbe80786416)

<br>
<br>

## 2. 칼로리 박스플롯

박스플롯 | 데이터의 분포 상태와 이상치를 동시에 보여주면서 서로 다른 데이터군을 쉽게 비교할 수 있는 시각화

![2  칼로리 박스플롯](https://github.com/leejongseok1/algorithm/assets/79849878/720100e2-211d-4761-a439-fac2824a9bf3)

<br>
<br>

## 3. 지정 카페인 용량 (계산된 필드 만들기)

![image](https://github.com/leejongseok1/algorithm/assets/79849878/0e9eabb0-d503-4c08-b544-f44a9edf0229)

![3  계산된 필드 만들기](https://github.com/leejongseok1/algorithm/assets/79849878/adb9b03d-cf48-4762-978a-177b1e3852cf)

<br>
<br>

## [추가도전과제] 시·도별 매장운영시간

`DATEDIFF` 함수를 이용해 `영업시작시간`과 `영업종료시간`의 차이를 계산한 `매장운영시간` 을 만들 수 있다.

![4   추가도전과제  매장운영시간 (계산된 필드 만들기)](https://github.com/leejongseok1/algorithm/assets/79849878/2b04cdfd-d136-4b24-8621-c8289894dfa7)

<br>

`매장운영시간`을 열 선반, `매장명`을 행 선반에 놓고 `매장운영시간`을 레이블에 놓아준 뒤, `시도`를 필터로 설정한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/849f0b1c-9583-4d20-bc38-ff68b19c01ec)