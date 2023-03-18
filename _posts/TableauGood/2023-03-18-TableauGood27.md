---
layout: single
title:  "집계 계산식 만들기"
categories: Tableau
tag: [Tableau]
toc: true
---

## 집계 계산식

태블로에서 다양한 형태의 뷰를 만들고 분석하고 싶을 때 데이터 원본에 없는 필드를 직접 만들 수 있다.
간단한 계산식부터 복잡한 계산식을 내장되어 있는 함수를 활용해 만들 수 있다.

## 집계 계산식 만들기

측정값에 있는 [매출],[수익]필드를 텍스트 마크에 올려준다.

![image](https://user-images.githubusercontent.com/100071667/226095863-e9671067-c930-479a-8dca-4504517d1a4c.png)

좌측 사이드 바의 화살표 모양을 클릭하여 '계산된 필드 만들기'를 선택하여 '수익률'이라는 계산된 필드를 만든다. sum([수익])/sum([매출])로, 전체 매출에 대한 수익의 비율을 계산한다. 

![image](https://user-images.githubusercontent.com/100071667/226095910-1a755a0a-e170-4f17-9ee6-85ee990f2970.png)

좌측 사이드바에서 [수익률]필드를 우클릭 해주고 기본속성->숫자형식->백분율로 지정합니다.

![image](https://user-images.githubusercontent.com/100071667/226096040-6ca26679-012b-4e48-989d-4a52e08b3c7f.png)

주문일자와 지역별로 매출, 수익, 수익률을 나타내는 테이블을 구하기위해 [주문일자]와 [지역]을 더블클릭 해줍니다.

![image](https://user-images.githubusercontent.com/100071667/226096079-0617961a-67e1-4cff-a83a-8535e03fc52c.png)