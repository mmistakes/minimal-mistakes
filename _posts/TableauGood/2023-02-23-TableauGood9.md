---
layout: single
title:  "누적 막대 차트"
categories: Tableau
tag: [Tableau]
toc: true
---

## 누적 막대 차트

태블로에서는 기본적으로 측정값들을 집계하기 때문에 **마크를 누적**해서 보는 경향이 강하다. 축에 따라 각각의 값들에 대한 개별 측정값과 전체 누적값을 볼 수 있다.

## 누적 막대 차트 만들기

매출을 행 선반에 올린 후 세그먼트를 색상 마크에 올려준다. 그 후 아래와 같이 정렬을 해 설정을 해준다.

![image](https://user-images.githubusercontent.com/100071667/220891732-fcaf761c-b52d-44dc-9df2-607a79076684.png)

세그먼트, 매출, 메출 비율에 대한 레이블을 설정해주고 매출 레이블의 퀵테이블 계산을 '구성 비율'로 바꾸어준다.

그 후 레이블 마크에서 ...을 선택 후 아래와 같이 설정해준다. 

![image](https://user-images.githubusercontent.com/100071667/220892481-3750514b-c6fe-4ce7-b902-b683873e4359.png)

[합계(매출)]을 ctrl키를 누른채로 마우스로 드래그하여 옆에다가 드롭해준다. 그 후 아래에 생긴 차트를 간트 차트로 변경해준다.

![image](https://user-images.githubusercontent.com/100071667/220892986-7b03791c-f85a-4483-94b9-039e67c8bc0a.png)

세그먼트에 대한 매출 비율의 년도에 따른 추세를 알기 위해 열선반에 주문 일자 필드를 올려준다. 그리고 매출의 구성 비율이 각 년도에서 100%가 되게 하기 위해 레이블의 매출 비율에서 퀵테이블 편집에서 차원을 바꿔 준다.

기업 고객의 매출은 증가하고 있으나 비중은 줄어들고 있고, 홈 오피스는 매출도 증가하면서 전체 대비 비중도 늘어나고 있는 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/100071667/220894429-6c0f9fb2-aa17-4a16-9238-1095bb93f270.png)

![image](https://user-images.githubusercontent.com/100071667/220894499-d8ce8eb9-72c8-44c7-aa56-9baa4a237e26.png)
