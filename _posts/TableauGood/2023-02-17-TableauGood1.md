---
layout: single
title:  "막대 차트와 라인 차트"
categories: Tableau
tag: [Tableau]
toc: true
---

## 막대 차트

고객 세그먼트를 차원으로, 매출을 측정값으로 한 후에 고객 세그먼트 별 매출을 볼 수 있다.

![행열 전환](https://user-images.githubusercontent.com/100071667/219515875-e2442573-56d3-4c11-bdd3-bb474ef7757c.png)

행, 열 전환

![전체 보기](https://user-images.githubusercontent.com/100071667/219515903-2e6691ba-6609-4a49-8174-2f51506ff78b.png)

전체보기로 바꾸어 준다.

![image](https://user-images.githubusercontent.com/100071667/219516060-92640e3d-d86e-4219-9114-48b2ad0099e0.png)

![내림차순](https://user-images.githubusercontent.com/100071667/219515965-b5337c94-df01-4757-b167-f42c5548db0d.png)

내림차순 아이콘을 눌러 정렬 순서를 오름차순으로 또는 내림차순으로 바꾸어 줄 수 있다.

![image](https://user-images.githubusercontent.com/100071667/219515721-55aa1446-ef6c-4e07-9eeb-0f7ff71b6201.png)

좌측 사이드 바에서 **글꼴 및 크기**등 다양하게 바꾸어 줄 수 있다.

![레이블 폰트변경](https://user-images.githubusercontent.com/100071667/219516668-3491d2dd-595e-4373-af03-3df337d1c2b7.png)

고객 세그먼트를 마크 안에 색상에 올려놓으면, 각 세그멘트가 **다른 색상**으로 표시된다. 오른쪽 색상 범례에서는 색상을 편집을 할 수 있다.

![색상 편집](https://user-images.githubusercontent.com/100071667/219517404-263b548f-0697-47d2-a66a-166e7e61f434.png)
 
![image](https://user-images.githubusercontent.com/100071667/219517041-9e95f495-e5b6-4d23-8ad1-d8fdb4538dfc.png)

## 라인 차트

라인 차트는 뷰 안에 있는 개별 데이터들을 연결하는데, 시간별 추세나 미래 값을 예측하는 경우에 유용하다. 막대 차트에 날짜 형식의 필드를 선반에 올리면 마크가 라인 차트로 변경이 된다. 

태블로는 **시계열 데이터**는 라인차트를 우선적으로 표현하기 때문에 라인 차트가 만들어 진다.
![image](https://user-images.githubusercontent.com/100071667/219519023-84cca40b-ae4d-47a3-bde9-ab33019b4708.png)

년(주문 날짜) 옆에 + 표시를 클릭해주면 분기 -> 월 -> 일로 표현이 된다.

![년 주문 날짜](https://user-images.githubusercontent.com/100071667/219518847-bd11075c-f632-44ec-9a36-9b537ddb9390.png)

![image](https://user-images.githubusercontent.com/100071667/219519174-5dea320b-6027-40c5-a0d7-9e79ea3bcb4a.png)

열선반을 다음과 같이 년과 월이 정방향이 아닐 경우 월을 우클릭-> **레이블 회전**을 선택하면 정방향으로 변경할 수 있다.

![서식](https://user-images.githubusercontent.com/100071667/219519284-315ca129-a65e-4cb5-bf7d-d124725c118a.png)

어떤 값을 주목해서 봐야 할지 눈에 안 들어 올 경우 레이블 마크를 선택해 이것을 **최소/최대**로 선택을 해준다.
또한 레이블 마크>**라인끝**을 선택하면 선 시작점, 선 끝점에 레이블을 표시할건지를 선택할 수도 있다.
![최소 최대](https://user-images.githubusercontent.com/100071667/219519664-3a525b7f-8af3-4d6a-81e7-1d5265306767.png)

각 연도별 최솟값과 최댓값이 하나씩 표현된다.

![image](https://user-images.githubusercontent.com/100071667/219519708-18eece6b-68fa-4f14-b07f-d1bc0391ca5b.png)

특정 월을 보고 싶으면 레이블 마크>**하이라이트 됨**을 선택하고 열선반의 월>하이라이터 표시>우측 카드에서 하이라이트 할 월을 선택할 수 있다.

![하이라이트](https://user-images.githubusercontent.com/100071667/219520132-01516f59-f5ec-477e-8aac-98daf9121b04.png)