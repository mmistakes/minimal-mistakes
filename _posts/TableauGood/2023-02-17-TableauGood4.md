- - -

## layout: single
title: "임시 계산"
categories: Tableau
tag: [Tableau]
toc: true

## 임시 계산

**임시 계산**이란 선반에서 직접 새로운 계산식을 만들거나 선반에 올라가 있는 필드를 편집해 만드는 계산 방식이다. 임시 계산은 **입력 계산** 또는 **인라인 계산**이라고도 한다.

## CASE 1. 차원 필드를 임시 계산으로 새로운 필드 만들기

행 선반을 더블 클릭 후 다음과 같이 입력한다.

- //시도 + 시군구 <- <code>쉬프트키를 누른 다음 엔터키 입력 후</code>
- [시도] + "" + [시군구] <- <code>좌측과 같이 입력 후 엔터키 입력</code>
입력 시 없던 새로운 필드인 [시도 + 시군구]가 생긴다.

![image](https://user-images.githubusercontent.com/100071667/219741456-827df232-5f8c-4e71-bc62-7e2596d2f6e4.png)

행 선반을 더블 클릭 후 다음과 같이 입력한다.

- //순위 <- <code>쉬프트키를 누른 다음 엔터키 입력 후</code>
-  rank(sum([매출])) <- <code>좌측과 같이 입력 후 엔터키 입력</code>

입력 시 없던 새로운 필드인 [순위]가 생긴다. 순위 필드를 불연속형으로 변환해주고 [순위]필드를 맨 앞에 표시되도록 변경해준다.


![image](https://user-images.githubusercontent.com/100071667/219743885-c1da76b7-bafd-4e2e-9a43-cd1ad350b7c9.png)

## CASE 2. 측정값 필드를 임시 계산으로 새로운 필드 만들기

[지역] 필드를 행선반에 올리고 열 선반에서 [수익률]필드를 임시 계산을 통해 만들어 준다.
 - //수익률 <- <code>쉬프트키를 누른 다음 엔터키 입력 후</code>
 - SUM([수익])/SUM([매출]) <- <code>좌측과 같이 입력 후 엔터키 입력</code>

[수익률]과 레이블에 있는 [집계(수익률)]를 서식을 통해 **백분율**로 변경해준다.

![image](https://user-images.githubusercontent.com/100071667/219747066-a32ff209-35c0-4038-9131-c67edc3e0d15.png)

## CASE 3. 각 지역별 매출 비중을 전체 기준으로 보여주는 막대 차트 만들기

[지역] 필드를 행선반에 올리고 [매출] 필드를 열 선반에 올린다. '매출'축을 내림차순 정렬 아이콘을 선택하면 매출 합계 기준으로 내림차순 정렬이 된다.

![image](https://user-images.githubusercontent.com/100071667/219749995-744db5a4-36a4-4b91-91f4-41c89e6ee530.png)


열선반 우측 빈공간을 더블 클릭한 후에 AVG((1))을 임시 계산을 만들어주고 이중축을 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/219752940-cee518f1-be20-4d9f-86ba-19d86229779f.png)

양쪽 축을 동일한 범위로 맞추기 위해 양쪽 축 아무 곳을 우클릭 후 **축 동기화**를 선택해주면 양쪽 축이 동기화가 되면서 동일한 범위로 설정된다.

![image](https://user-images.githubusercontent.com/100071667/219753575-8a98f832-d1a9-4725-a808-6777c552061f.png)

하단 축을 마우스 우클릭해 '축 편집'에서 범위를 '고정'으로 선택한 후 '1.05'로 변경해준다.

![image](https://user-images.githubusercontent.com/100071667/219755469-f3937752-1fa6-4095-94f1-bab8b5908dd4.png)

열 방향의 라인을 없애기 위해 격자선 : '없음'으로 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/219755827-f82e6ae9-b0f4-4d41-8a82-2bf47393d979.png)
