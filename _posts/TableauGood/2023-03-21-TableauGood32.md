---
layout: single
title:  "전체 범위로 필터 적용 및 컨텍스트 필터에 추가하기"
categories: Tableau
tag: [Tableau]
toc: true
---

## 전체 범위로 필터 적용 및 컨텍스트 필터에 추가하기

차원에 있는 [고객명]필드를 행선반에 올리고 측정값에 있는 [매출]필드를 열선반에 올려준다. 매출 축에서 매출 합계 기준으로 고객명을 내림차순 정렬하고 [p_Top N]이라는 매개 변수를 만들어준다.

![image](https://user-images.githubusercontent.com/100071667/226590047-3d875166-df35-4823-8d1d-57268b19dbaf.png)

행선반에 있는 [고객명]필드를 우클릭하여 '필터'를 선택해준다. 여기에서 '목록에서 선택'이 아닌 '모두 사용'을 선택해준다. 그리고 상단에 있는 상위 탭으로 이동하여 아래와 같이 작성해주면 설정한 숫자만큼 필터링 처리된다.

![image](https://user-images.githubusercontent.com/100071667/226591219-95f209a5-aa89-49c3-82b9-fd95bde66623.png)

![image](https://user-images.githubusercontent.com/100071667/226591297-9899cebb-2d61-4cd1-8105-5c806ea75324.png)

행선반의 [고객명]필드 뒤에 더블 클릭하여 임시 계산을 아래와 같이 작성해준다.
RANK(SUM([매출])) ← 좌측과 같이 쓰고 엔터 입력

[순위]라는 이름으로 필드명이 생기는데 이를 연속형이 아닌 불연속형으로 변환시켜준다.

![image](https://user-images.githubusercontent.com/100071667/226591703-97f3f7d1-aa6c-4e2e-8f64-2095effd70e1.png)

각 고객들이 어느 지역에 살고 있는지 표현해주기 위해 지역필드를 행필드에 올려주고 필터에 드래그 앤드 드롭해준다.

![image](https://user-images.githubusercontent.com/100071667/226593026-fe45217a-04c1-4fd1-866e-69968f14d3e0.png)

지역 필터 표시에서 필터의 모양인 '다중 값(목록)' 대신 '단일 값(목록)'을 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/226593754-82a997d8-aeae-4f69-bac1-0b4044848b72.png)

반대로, 각 [지역]별로 상위 TOP N을 보고 싶은 경우는 태블로의 작동 순서를 참고해서 필터의 작동 순서를 변경해주면 된다.
[고객명 (TOP N)]필터보다 [지역]필터를 상위 필터로 변경하기 위해서는 필터에 있는 [지역]필터를 우클릭하여 '컨텍스트에 추가'를 선택해주면 된다.

![image](https://user-images.githubusercontent.com/100071667/226594196-f6c6a432-0237-44ab-9bff-d5c3df6f311d.png)

뷰에는 각 지역별 상위 50명이 표시된다.

![image](https://user-images.githubusercontent.com/100071667/226594133-8e94a4f8-653d-4002-a367-0511e3e26450.png)