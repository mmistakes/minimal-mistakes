---
layout: single
title: PowerBI 'drill-through(드릴스루)'와 'drill-down(드릴다운)' 차이가 대체 뭐냐
categories: 03_bi
tag: [PowerBI, BI, drillthrough, drilldown, 드릴스루, 드릴다운]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---
Power BI 기능에서 가장 중요한 기능들이다. 무엇보다 잘 이해하고 무심한듯 쓰면 다른 사람으로하여금 뭔가 있어 보이게 한다. 하지만 용어가 주는 압박으로 그 의미를 이해하는게 쉽지 않다. 대체 ‘Drill through(드릴스루)’와 ‘Drill down(드릴다운)’의 차이가 뭐냐고!! 두 기능 모두 말 그대로 ‘drill’ 드륄~~!, 뭔가 드릴링한다고 한다. 
<br><br>
[**참고자료**] 생산라인에서 버려지는 비용(Cost_Sum, 막대그래프), 버려지는 비율(Rate, 선그래프)을 2시간 간격으로 나타내주는 그래프이다. 본인은 기본적으로 생산기술부의 엔지니어로 이런 데이터밖에 없음을 이해해주길 바란다. 개념이 어렵진 않다. <br>

<br>
## 1. drill through(드릴스루)를 알아보자
우선 ‘Drill through(드릴스루)’는 main page에서 ‘뭔가(Power BI에서는 특정 column)’를 통해서(through) 현재 페이지의 어떤 부분을 클릭하면 다른 page로 순간이동(이걸 drilling이라고 이해하자)을 하게된다. 그 page에는 금방 main page에서 클릭한 부분과 연관된 세부 정보들이 나와있다. 
<br>
### 1> main page의 그래프인데 특정 부분에 오른쪽 클릭했을 때 drill through가 안나온다<br>
<img src = "/assets/img/bongs/20220302/1_main_page_no_drillthrough.png">
<br>
### 2> 새로운 page(bongs_drillthrough)에 원하는 정보의 그래프를 만든다.<br>
<img src = "/assets/img/bongs/20220302/2_bongs_drillthrough_creation.png">
<br>
### 3> 해당 그래프 아무대나 클릭 후 화면 오른 쪽에 보면 [Fields]에 보면 빨간 체크된 부분에 main page와 bongs_drillthrough page가 통할 column을 넣어주면 된다. (최선을 다해 설명했는데 이게 내 표현의 한계다ㅜㅜ. 혹시 이해 안가면 더 많이 생각을 해보길 바란다 ㅜ) <br>
<img src = "/assets/img/bongs/20220302/3_add_drillthrough_fields.png">
<br>
### 4> 본인은 이번에 Line column을 드래그해서 넣어보겠다. Line 별로 station이 어떤 비율로 있는지 보고싶다<br>
<img src = "/assets/img/bongs/20220302/4_added.png">
<br>
### 5> 이제 다시 main page로 돌아가서 특정 부분 오른쪽 클릭하면 드디어 drill through가 보인다. 선택하면 bongs_drillthrough로 순간이동한다<br>
<img src = "/assets/img/bongs/20220302/5_result_check.png">
<br>
 ### drill-down(드릴다운)은 다음에 포스팅하겠다.
