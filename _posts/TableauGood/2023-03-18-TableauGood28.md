---
layout: single
title:  "IF로 계산된 필드 만들기"
categories: Tableau
tag: [Tableau]
toc: true
---

## IF함수

IF함수는 조건에 충족되는지 여부를 확인해, 조건에 충족하면 TRUE인 값을 변환하고, FALSE면 두 번째 값을 반환한다. 그 와중에 IF가 아닌 경우 ELSE로 끝낼 수 있지만 조건이 많아지면 ELSEIF로 확장해 나갈 수 있다.

## IF로 계산된 필드 만들기

[매출]필드를 열선반에, [제품 중분류]필드를 행선반에 올린 후  뷰 하단에 있는 '매출'을 내림차순 정렬해준다. 측정값에 있는 [매출]을 레이블 마크 위에 올리면 제품 중분류별 매출 합계가 막대 차트의 레이블로 표시된다.

![image](https://user-images.githubusercontent.com/100071667/226096627-cc266f07-dbaf-478d-b22b-6064b5d17a61.png)

계산식으로 아래와 같이 작성해준다.

![image](https://user-images.githubusercontent.com/100071667/226096834-ba2f0b85-ea9f-43c1-82e2-c3c99cd36da6.png)

2억을 기준으로 참조선을 추가하기 위해 좌측 사이드 바에 있는 '분석'패널로 이동하여 '상수 라인'을 테이블 참조선 추가에 올려준다. 이 상수 라인을 편집하기 위해 상수 라인을 우클릭 후 편집에서 아래와 같이 편집을 해준다.

![image](https://user-images.githubusercontent.com/100071667/226096917-6d515eda-b670-4692-86d5-f941c87001e7.png)

위어서 '매출 2억 구분'이라는 계산식을 좀 더 단순하게 만들 수 있는 방법으로 IIF라는 함수가 더 효율적으로 쓰인다.

![image](https://user-images.githubusercontent.com/100071667/226097035-9deae93c-1f2f-4159-92a8-674285ad7ab7.png)

좀 더 간단하게 만들 수 있는 방법도 있다.

![image](https://user-images.githubusercontent.com/100071667/226097171-1178260a-60eb-4dc0-a83c-2288a94b9b1d.png)

계산된 필드를 만들 때 사용하는 데이터 유형은 계산 속도에 상당한 영향을 미친다. 정수 및 부올이 일반적으로 문자열 보다 훨씬 빠르다.