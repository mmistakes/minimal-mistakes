---
layout: single
title:  "도넛차트"
categories: Tableau
tag: [Tableau]
toc: true
---

## 도넛 차트

도넛 차트는 파이 차트 두 개를 합쳐서 만든 차트이다. 파이 차트와 동일하게 전체에서 각각의 값에 대한 비중을 살펴보는 차트로, 파이 차트보다 많이 활용되는 이유는 두 번째 파이 차트 위에 전체 합계를 표현할 수 있고 추가적으로 요약 및 텍스트를 넣을 수 있기 때문이다.

열선반을 더블클릭하여 MIN(1)이라는 임시계산된 필드를 만들고 '파이 차트'를 선택하고, 열선반에서 복제한다.


![image](https://user-images.githubusercontent.com/100071667/219729159-d1edbb1c-b102-43a6-9627-e0b256b4b1e6.png)

집계(MIN(1))을 선택한 다음 세그먼트 필드를 색상 마크에 올리고, 크기를 크게 해준다. 
세그먼트를 레이블 마크에 올리고, 매출필드를 각도, 레이블 마크에 올리면 아래와 같이 나온다.

![image](https://user-images.githubusercontent.com/100071667/219730882-c9c6a0d6-ffd1-4fe9-8cdb-5c976a57e35a.png)

오른쪽 집계(MIN(1)) 필드를 **이중 축**으로 선택한다.

![image](https://user-images.githubusercontent.com/100071667/219731757-060e8d73-0dca-4287-b478-a6351ef26728.png)

집계(MIN(1))(2) 마크에서 색상을 **흰색**으로 변경해준다음 크기를 알맞게 크게 해준다.

![이중축](https://user-images.githubusercontent.com/100071667/219732365-393944a0-c269-4abf-82ad-f16ad8a831cc.png)

![image](https://user-images.githubusercontent.com/100071667/219732555-b660ec7f-243b-4787-97d7-bade3adb7545.png)

집계(MIN(1))(2) 레이블 마크를 선택한 다음 편집창에서 '총 매출'이라는 텍스트를 추가해준다.

![image](https://user-images.githubusercontent.com/100071667/219734187-0defc29e-91f4-45c4-9d79-a3b1e62f3432.png)

주문일자를 열선반에 올리면 연도별로 쪼개진다.

![image](https://user-images.githubusercontent.com/100071667/219736342-4ece27be-39fc-4edd-bece-39f8aa9d0ac1.png)