---
layout: single
title:  "영역 차트"
categories: Tableau
tag: [Tableau]
toc: true
---

## 영역 차트

**영역 차트**는 라인과 축 사이의 공간을 색상으로 입히는 또 다른 라인 차트이다.
라인 차트와 비슷하게 시간에 따른 추이를 살펴보는데, 일반적인 추이보다는 영역을 색깔로 채우는 개념이기 때문에 **누적해서 보는 경우**에 주로 사용이 된다.

## 영역 차트 만들기

매출을 더블클릭하여 행 선반에 올려주고 주문일자를 초록색 연속형 [분기(주문 일자)] 선택 후 확인 버튼을 눌러준다.

![image](https://user-images.githubusercontent.com/100071667/220887335-90569870-cb1c-4180-973f-47d7e7ae15ac.png)

마크를 <영역>으로 변경 후에 차원에 있는 [고객 세그먼트]를 <색상>에 올려 준다.

![image](https://user-images.githubusercontent.com/100071667/220887212-da8f78c2-ab91-4e3b-b855-7024cf44259c.png)

행 선반에 있는 [합계(매출)]을 퀵 테이블 계산에서 누계를 선택 해준다.
![image](https://user-images.githubusercontent.com/100071667/220887838-ae150973-348f-4733-8434-13749bc18782.png)

![image](https://user-images.githubusercontent.com/100071667/220887879-4f590568-f203-4df5-9c40-1a4ca4152255.png)

매출을 드래그하여 마크 레이블에 드롭해주고 퀵 테이블 계산에서 비율 차이를 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/220889208-8a1fc4cf-b622-4fdf-ab0a-7e768806a47f.png)

마크에 있는 '도구설명'에서 아래와 같이 편집해준다.

![image](https://user-images.githubusercontent.com/100071667/220889781-d18c6dff-f1a6-4c0d-9743-3cd677d90360.png)

![image](https://user-images.githubusercontent.com/100071667/220889909-7ae2b8f0-efac-4809-a962-b8a5e3c5a258.png)
