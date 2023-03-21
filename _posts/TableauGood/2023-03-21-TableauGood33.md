---
layout: single
title:  "필터"
categories: Tableau
tag: [Tableau]
toc: true
---

## 필터

차원에 있는 [주문 일자]필드와 측정값에 있는 [매출]필드를 <표현 방식>을 '하이라이트 테이블'을 선택해준다.
레이블 마크를 눌러 맞춤을 '가운데' 정렬하고, 글꼴은 16pt로 변경해준다. 연도 위에 있는 '주문 일자'필드 레이블을 숨기고자 우클릭 후 '열에 대한 필드 레이블 숨기기'를 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/226599000-5eda4e35-7339-4e5f-8411-10f14861340e.png)

불연속형 '월'로 화면을 나누기 위해 차원에 있는 주문일자 필드를 마우스 오른쪽과 왼쪽을 동시에 누른상태에서 열선반 뒤에 올려주고 불연속형 '월(주문 일자)'를 선택해준다. 

![image](https://user-images.githubusercontent.com/100071667/226600542-bf00ad99-a253-4069-be03-2aafcb606dd7.png)

측정값에 있는 [매출]을 드래그 하여 레이블 마크에 올려주고 레이블을 클릭하여 '최소/최대'를 선택, 그리고 옵션에서 '레이블이 다른 마크와 겹치도록 허용'은 체크 해제해준다.

![image](https://user-images.githubusercontent.com/100071667/226601035-402dad4a-ebf5-4389-87cb-e8291c1969b4.png)

새 대시보드를 연다음 '연간 매출 하이라이트', '고객 세그먼트별 연월 매출'을 대시보드에 올려준다. 

![image](https://user-images.githubusercontent.com/100071667/226602521-79cecc4a-f959-4d74-ac63-0ffcc2203c09.png)

위아래 차트 연도의 위치가 불일치하는데 이를 맞춰주기 위해 아래 차트의 축을 우클릭 후 '머리글 표시'를 해제해준다.

![image](https://user-images.githubusercontent.com/100071667/226602885-a6807e4f-5c4c-4a49-bb11-6983f38f4604.png)

대시보드 액션을 추가하기 위해 상단에 대시보드 메뉴에서 '동작'을 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/226603418-43baea8f-4c90-4b88-ba65-4b3dd526600b.png)

다시 필터를 만들어준다.

![image](https://user-images.githubusercontent.com/100071667/226604073-a2af3556-c408-49d4-8c2e-d322f8fed796.png)

대시보드 제목을 아래와 같이 작성해주고 상단의 하이라이트 테이블의 연도를 선택해주면 해당하는 라인 그래프가 하단에 그려진다.

![image](https://user-images.githubusercontent.com/100071667/226604417-c60b938e-3e79-4761-8114-fab8e5a52c63.png)

마지막으로 대시보드 제목과 하이라이트 테이블의 연도 사이에 구분 라인을 추가하기 위해 좌측 하단에 있는 텍스트 개체를 드래그해서 사이에 점선이 생겼을 때 놓아준다. 그 뒤 좌측 사이드 바에 있는 '레이아웃'패널에서 백그라운드에 없음 대신 색상을 입혀준다.

![image](https://user-images.githubusercontent.com/100071667/226605488-95a15786-a1b4-4c1c-b4f0-7ea2b87c3ec5.png)