---
layout: single
title:  "파이차트"
categories: Tableau
tag: [Tableau]
toc: true
---

## 파이 차트

파이 차트는 전체에 대해 각각의 비중을 살펴보는 차트이다.
파이 차트는 총합에 대한 값을 보여주기 힘들고, 추가적인 메시지를 주는 데 한계가 있어서 많은 기업에서 파이 차트보다 도넛 차트를 사용한다.

![image](https://user-images.githubusercontent.com/100071667/219523251-1492ce2a-b4ab-412a-b428-150861d13a8b.png)

매출 합계가 큰 값에서 작은 값으로 내림차순 정렬을 하고자 할때에는 [세그먼트]를 우클릭하고 '정렬'을 해준다.

![image](https://user-images.githubusercontent.com/100071667/219523556-ca47196e-ee63-42e4-863c-b6781e504ebe.png)


레이블로 배정되어 있는 필드 중에서 [합계(매출)]을 우클릭 한 다음 '퀵 테이블 계산'에서 '구성 비율'을 선택하면 매출 비중이 표현이 된다.

![image](https://user-images.githubusercontent.com/100071667/219523778-beb5030d-d2f4-4d47-b335-590e4e5520d4.png)


좌측 사이드 바의 빈 여백을 우클릭한 후에 '계산된 필드 만들기'를 선택한다. 필드명은 '전체 매출 총합', 계산식은 {SUM([매출])}로 입력하고 필드를 드래그해 '세부 정보'마크에 올린다.

![image](https://user-images.githubusercontent.com/100071667/219524431-d96608c0-4569-4c13-9668-24b1f67c5f72.png)

워크시트 제목을 더블 클릭한 후에 '삽입'을 통해 입력해줍니다.

![image](https://user-images.githubusercontent.com/100071667/219524669-b076c10f-b00b-4020-98c2-4d57aea1b7eb.png)

계산식은 {SUM([매출])} 대신 TOTAL(SUM([매출]))을 활용해도 된다.


![image](https://user-images.githubusercontent.com/100071667/219524795-f7debbfb-0336-4457-a233-5bd93d41ec67.png)