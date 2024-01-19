---
published: true
title: "[Tableau] 신병훈련소 DAY 1"

categories: Tableau
tag: [tableau]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-19
---
Tableau 신병훈련소 22기 DAY 1

# 데이터

"스타벅스 메뉴 데이터"와 "매장 정보 데이터"를 이용해 시각적 분석을 한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/2bfe49eb-8bd1-4d31-803b-9af0028dafbf)

![image](https://github.com/leejongseok1/algorithm/assets/79849878/4f4693d8-a010-430f-866c-5f8e35e732a9)

<br>

# 1. 카테고리 별 평균 칼로리 & 평균 카페인

![1  카테고리별 평균 칼로리 카페인](https://github.com/leejongseok1/algorithm/assets/79849878/3f3dd824-edcc-494b-938c-e55594a8abb6)


커피 카테고리 안에 여러 종류의 카페가 있기 때문에 카테고리 별 평균을 집계로 사용해야한다.

<br>

# 2. 메뉴명 별 칼로리 & 카페인

![2  메뉴별 칼로리 카페인](https://github.com/leejongseok1/algorithm/assets/79849878/0fb452e0-c80b-48fe-a4ba-77e1a79b3383)


위 시각화는 트리맵으로, 트리맵은 계층 구조의 데이터를 표시하는데 적합한 시각화로 전체 대비 부분의 비율이 얼마나 되는지 비교하는데 많이 사용된다.

**칼로리는 사각형의 크기**로, **카페인은 색상**으로 표현하였다.

이번에는 메뉴명을 기준으로 칼로리와 카페인 값을 계산한다.

메뉴명은 유일하게 구분되고 중복되지 않는 값이기 때문에 이번 시각화에서의 집계는 평균으로 하지않는 것이 옳다. 합계로 계산하나 평균으로 계산하나 결과는 동일하다.

<br>

# 3. 카테고리와 메뉴명을 한 번에 살펴보기

![3  카테고리와 메뉴명을 한 번에 살펴보기](https://github.com/leejongseok1/algorithm/assets/79849878/e4c19875-da72-4c82-adba-c7753ff00fb8)

카테고리에 마우스 오버하면, 해당 카테고리에 해당되는 메뉴가 나타나게 하는 방법.

<br>
<br>
<br>

![스크린샷 2024-01-19 160446](https://github.com/leejongseok1/algorithm/assets/79849878/7d42213e-12ed-4ca8-ab80-19b375126839)

평균(칼로리(Kcal)) 마크 카트를 클릭하고, 도구 설명을 클릭해 추가할 시각화에 대한 설명을 입력한다.

<br>


![image](https://github.com/leejongseok1/algorithm/assets/79849878/cbc81aeb-46a9-4497-b593-07b7e34ad6fe)


삽입 > 시트 에서 메뉴명 별 칼로리&카페인을 선택한 후, 크기를 조정한다.

<br>

# 4. 당분 함유량과 칼로리의 상관관계

![4  당분 함유량과 칼로리의 상관관계](https://github.com/leejongseok1/algorithm/assets/79849878/ae0dd52f-3eb3-4335-a2b8-c4f201f5f19e)

당류와 칼로리를 열 선반과 행 선반에 위치 시키고

메뉴명을 마크 선반의 세부 정보에 가져다 놓아 시각화의 집계 기준이 메뉴명 수준으로 변경되게 한다.
> 마크 유형을 자동으로 하지 않고, "원"과 같이 특정 형태로 지정해줘야 색상 편집이나 테두리 등을 설정할 수 있었다. 참고하자

카페인으로 마크의 색상과 크기를 표현하고,

겹쳐지는 메뉴를 쉽게 볼 수 있도록 불투명을 조정하고, 테두리를 추가한다.

추세선은 마우스 우클릭으로, 평균라인은 분석패널에서 설정할 수 있다.

<br>

# 5. 시군구 별 매장 분포 현황

![5  시군구 별 스타벅스 매장 수](https://github.com/leejongseok1/algorithm/assets/79849878/53aee77a-1fc9-4328-b6a0-1cd87f554a81)

시도, 시군구 필드를 이용해 매장이 존재하는 시군구를 표현한다.

"매장코드"의 측정값을 카운트로 하면 스타벅스 매장수를 표현할 수 있다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/f954ec77-5bea-4658-ba97-5f6289e9d162)

<br>

# 6. 대시보드 만들기

![image](https://github.com/leejongseok1/algorithm/assets/79849878/89a94a20-bbb3-4a42-ae1c-4b5f32bba30c)

<br>
<br>

# [추가 도전 과제]

## 1. 메뉴별 칼로리와 카페인의 상관관계

![image](https://github.com/leejongseok1/algorithm/assets/79849878/74781a94-6855-4547-9946-70c89ad6427a)

<br>

## 2. 서울시 실제 매장 위치 표현

![image](https://github.com/leejongseok1/algorithm/assets/79849878/7e6e6732-06aa-4d6c-87b7-f794ac1efe9e)

경도와 위도를 시도, 시군구 별로 표현하면 전국 스타벅스 매장 위치를 나타낼 수 있다.

필터를 사용해 서울시를 클릭하면 서울시의 스타벅스 매장 위치만 나타난다.