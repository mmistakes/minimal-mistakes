---
layout: single
title:  "히스토그램"
categories: Tableau
tag: [Tableau]
toc: true
---

## 히스토그램

**히스토그램**은 막대 차트처럼 보이지만 사실 **연속형 측정값**을 기준으로 구간 차원을 만드는 것이다. 특정 구간(또는 범위)에 얼마나 범주형 값들이 분포되어 있는지 살펴보는 데 유익하다.

## 히스토그램 만들기

'계산된 필드 만들기'를 통해 총 4가지를 생성해준다.

![image](https://user-images.githubusercontent.com/100071667/221295593-8bac416b-d446-427d-a2d8-8edd57efe84e.png)

![image](https://user-images.githubusercontent.com/100071667/221296446-cdeda53d-b22f-41ce-8a31-13c7df9f5167.png)

![image](https://user-images.githubusercontent.com/100071667/221296500-2cabe2be-4d63-467f-afbf-eec31c308b49.png)

![image](https://user-images.githubusercontent.com/100071667/221296376-87c5639e-77df-448a-820b-f6a4316dfb24.png)


측정값에 이쓴 [고객별 첫 주문 후 두 번째 주문까지 걸린 날짜]를 우클릭 후 만들기 -> 구간 차원을 선택하면 구간 차원 만들기 대화 상자가 열리는데 새 필드명은 '두 번째 주문까지 걸린 날짜(구간 차원)'로 입력해주고, 구간 차원 크기를 '10'으로 설정해준다.

![image](https://user-images.githubusercontent.com/100071667/221297178-02f34950-e859-42cd-b307-40edcf1554a9.png)

[두 번째 주문까지 걸린 날짜(구간 차원)]를 연속형으로 변환해주고 차원에 있는 [두 번째 주문까지 걸린 날짜(구간 차원)]을 열 선반에 드래그해서 올리고 [고객명]을 마우스 오른쪽 버튼을 누른채 [카운트(고유)(고객명)]을 선택하면 10일 간격으로 두 번째 구매한 고객들의 합계를 나타내는 막대차트를 표현한다.

![image](https://user-images.githubusercontent.com/100071667/221297693-bc2cf71f-c618-440f-a7f0-f1b0b73aceba.png)

색상, 크기를 변경하고 열과 행 방향의 라인을 서식을 통해 삭제해준다. 이를 통해 첫 구매 후 두 번째 구매까지 20~39일 걸리는 고객이 총 30명으로 가장 많았다는 것을 알 수 있다.

![image](https://user-images.githubusercontent.com/100071667/221298293-d4f0dde7-5abb-4077-9889-2c663d3621e7.png)