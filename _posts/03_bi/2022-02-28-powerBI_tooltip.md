---
layout: single
title: PowerBI 'tooltip(말풍선)' 사용 방법
categories: 03_bi
tag: [BI, tooltip, PowerBI]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---
Tooltip은 ‘말풍선’이라고 한국어버전에서 나오는데, 나는 영어버전을 쓰니 tooltip이라고 표현하겠다. Microsoft 등의 software 업체에서 정식으로 배포한 manual 혹은 한글버전은 항상 느끼지만 참 가독성이 안좋다. 이 때문에 설명은 블로그를 찾아보거나 youtube를 참고하는 일이 많다. 동일한 이유로 차라리 SW는 영문 버전을 쓰는 게 편할 때가 많다. 어쨌건 이 tooltip이라는건 본인이 원하는 영역에 마우스포인터를 올려놨을 때 필요한 정보가 보이는 기능이다. <br><br>
[**참고자료**] 생산라인에서 버려지는 비용(Cost_Sum, 막대그래프), 버려지는 비율(Rate, 선그래프)을 2시간 간격으로 나타내주는 그래프이다. 지금은 마우스포인터를 올릴 경우 간단한 정보만 보여준다. <br>
<img src = "/assets/img/bongs/1_main_page_graph.png">
<img src = "/assets/img/bongs/2_no_tooltip.png">
<br>
## 1. tooltip page를 만들자
우선 마우스포인터가 올려졌을 때 어떤 정보가 tooltip에 나타났으면 좋을지 생각한다. 그 원하는 정보를 나타내는 page를 하나 만든다. 마우스 포인터를 댈 경우 각 라인 별 세부 정보가 보였으면 좋겠다. 우선 라인 별 세부 정보를 나타내는 page를 만들자.<br> 
<img src = "/assets/img/bongs/3_tooltip_creation.png">
<br>
## 2. 세부설정
해당 tooltip page에서 tooltip으로 사용 가능하게 설정을 해줘야 한다.
<img src = "/assets/img/bongs/4_tooltip_page_setting.png">
<br>
## 3. main page에서도 설정 
그러면 main page에서도 tooltip이 적용되도록 설정을 해준다. 그래프를 클릭하고 오른쪽 ‘format 창에 들어가서 tooltip을 on 시켜주고, page에 이전에 만들었던 tooltip 이름으로 선택해준다.
<img src = "/assets/img/bongs/5_main_page_tooltip.png">
<br>
## 4. 결과 확인 
이제 결과를 확인한다. 마우스포인터를 갖다 대니 해당 시간에 라인 별 세부 정보가 뜬다. **차~~~~암 쉽쥬?**
<img src = "/assets/img/bongs/6_result.png">
 
