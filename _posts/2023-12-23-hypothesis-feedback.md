---
layout: single
title: '코멘토 SQL 입문부터 활용까지 3주차 피드백과 회고 '
categories: 코멘토
tag: [코멘토]
author_profile: false
published: false
sidebar:
    nav: "counts"
---

## 3차 과제  

Northwind 데이터에 대한 가설을 3개 정하고, 그 가설에 대한 핵심 지표 및 보조 지표를 설정한 뒤, 그 지표를 분석해 가설에 대한 분석 보고서를 PowerPoint나 Word로 작성해 주세요. 

### 데이터 
- 가상의 Northwind 식품회사의 판매 및 구매 시나리오를 모델링한 **Northwind Database**
- 테이블은 Category, Customer, Orders, Employee 등 15의 테이블로 구성 
- 데이터는 2018년 02월부터 2021년 09월 데이터로 구성 
- 판매 식품은 Beverages, Condiments, Confections, Dairy Products, Grains/Cereals, Meat/Poultry, Produce, Seafood 로 구성 


## 데이터 분석 보고서
### 1. 가설 수립

- 삭품 업계의 매출이 증가하는 추세이기 떄문에 Northwind의 매출도 증가하는 추이라 가정했다. 

- 상위 매출 고객층은 매년 유사할거라 가정했다. 

- 보통 연말과 연초에 소지자들의 구매율이 높아지기 때문에 연말과 연초의 매출이 가장 높을거라 판단했다. 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/hypothesis.png){: .align-center .img-width-half} 

#### 가설1 : 매출은 연도별로 상승했을 것이다.
##### 1-1 연도별 매출 그래프 

2021년 8월에는 매출이 전월 대비 -16% 감소하였습니다. 
그 후, 2021년 9월에는 매출이 이전 월 대비 -46%로 급격히 하락했습니다.
 이는 이전 월에 비해 상당한 감소율을 나타냅니다.

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/year_graph_title.png){: .align-center .img-width-half} 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/h1_img.png){: .align-center} 

##### 1-2 월별 매출 그래프 

2021년 8월에는 매출이 전월 대비 -16% 감소하였습니다. 
그 후, 2021년 9월에는 매출이 이전 월 대비 -46%로 급격히 하락했습니다. 이는 이전 월에 비해 상당한 감소율을 나타냅니다.

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/month_graph_title.png){: .align-center .img-width-half} 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/month_sales.png){: .align-center } 

##### 1-3 2021년 9월 매출 
9월은 19일까지의 데이터만 존재하며, 이로 인해 매출이 예상보다 낮게 나타났을 가능성이 있습니다. 9월의 매출 하락은 주로 데이터 수집 기간의 문제로 보입니다.

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/sep_title.png){: .align-center .img-width-half} 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/sep_sales.png){: .align-center} 

#### 가설2 : 상위 매출 고객층은 매년 유사할 것이다.
##### 2-1 연도별 매출이 높은 고객은 유사할 것이다.
구매율이 높은 회사들이 매년 다르게 나타나고 있습니다. 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/customer_title.png){: .align-center .img-width-half} 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/customer_graph.png){: .align-center } 

##### 2-2 연도별 카테고리별 매출 비율도 다양할 것이다.

연도별로 매출이 높은 회사들의 구성이 다르기 때문에 카테고리별 매출 비율도 다양하게 나타난다는 가정을 했지만 
변동은 있지만 큰 이상치는 나타나지 않았습니다.
연도별로 고객들의 구매 형태가 유사한 것으로 보입니다.

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/category_graph.png){: .align-center } 

#### 가설3 : 연초와 연말의 매출이 가장 높을 것이다.

전월대비 22.94% 상승한 2018년을 12월을 제외하고 연말인 12월의 매출이 뚜렷하게 급격히 증가하는 양상은 나타나지 않았습니다. 
연초인 1월의 매출도 다른 월과 큰 차이를 보이지 않습니다
예상과는 다르게 연초와 연말에 특별한 매출 증가가 나타나지 않음을 확인했습니다

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/h3_title.png){: .align-center .img-width-half} 

![Alt text]({{site.url}}/images/2023-12-23-hypothesis-feedback/h3_img.png){: .align-center } 


## 피드백
### 잘한 점 
가설 간에 연결되는 흐름이 잘 느껴지는 점 좋습니다. 지금처럼 한 가설을 분석해보고 거기서 나온 추가적인 의문을 바탕으로 또 다른 질문을 던져보고 하는 식으로 자연스럽게 잘 구성해 주셨습니다.

### 추가할 점 
매출과 관련한 다양한 관점에서 데이터를 살펴보고 분석한 내용 잘 담아주셨습니다. 가설 각각을 보면 흥미로운 주제들을 잘 선정해주셨는데요. <br>
왜 그 가설을 선정하게 되었고, 그 가설을 분석해보는 것이 어떤 의미가 있는지 그런 내용도 추가로 담겨 있으면 더욱 좋았을 것 같습니다. <br>
특히 왜 '연도별 매출이 높은 고객이 비슷할지', '연초 연말에 매출이 높을지' 라고 예측한 이유를 같이 설명해주시면 좋을 것 같습니다.

### 질문 답안  
결론과 인사이트 도출 부분은 어렵게 생각하지 않으셔도 될 것 같습니다. 가설마다 가설을 세우는 단계에서 왜 이 가설을 정했는지, 또 이를 분석해 보는 것이 어떤 의미가 있을지가 미리 정리가 되면, 분석을 통해 그에 대한 답을 찾고, 그것이 비즈니스 적으로 어떤 의미가 있을지 정리해보시면 됩니다. 이런식으로 단순히 결과 분석 뿐만 아니라 나름의 결론과 비즈니스 적으로 의미있는 인사이트 도출을 해보시는 게 중요합니다.

### 정리
데이터를 보니 가설이 맞다, 틀리다 뿐만 아니라, 그러니까 우리 회사가 이런 전략을 세워서 어떤 마케팅을 해보면 좋을 것 같다 등의 내용이 포함된다면 더욱 알찬 데이터 분석 보고서가 되는데 중요합니다. <br>

특히 '가설 설정, 가설 검정의 기준이 되는 지표 설정, 쿼리를 통한 지표 추출 및 결과 분석, 결과 해석을 통한 가설 검정, 비즈니스 적으로 의미있는 결론 및 인사이트 도출' 이라는 제가 제안드린 분석 보고서의 흐름을 잘 익혀보시고 추후에도 활용해보시면 좋을 것 같습니다.

## 3주차 회고 

3주차는 redash를 이용한 시각화와 데이터 분석 보고서를 작성하는 과제를 수행했다.

**`가설 수립 > 가설을 검증하기 위한 지표 선정 > 지표 측정 및 분석 > 분석 결과 및 결론(인사이트)`**

3주차 과제 수행 중 가장 힘들었던 점은 데이터 분석을 위한 가설 설정이다. 가설을 어떤 방향으로 수립해야 할지 생각하는데 많은 시간을 쏟았다.

매출에 연관해서 가설을 잡아야 할 것 같아 첫 번째 가설을 막연하게 정했다. **매출은 연도별로 상승했을 것이다.** 좀 뜬금없는 가설을 설정해버렸다ㅎ

또한, 막상 가설 검증을 하고나니 그래서 어쩌란 거지? 이런 생각이 의문만 멤돌았다. 이게 정말 실무 과제였다면 가설 수립만 하다가 하루가 다갔을 것이다. 그 정도로 감이 안 잡혔다.

이래서 데이터 보고서를 쓰다가 밤을 새는구나...

내가 수립한 가설들은 마케팅 전략 수립을 위한 가설보다는 가설 수립을 위한 가설인 느낌이 들었다.

다시 분석을 한다면 데이터 그룹을 나눌 때 신규 사용자/기존 사용자와 같은 고객 데이터 중심으로 분석 방향을 정했으면 비즈니스적으로 의미 있는 인사이트 도출에 더 나아갔을 것 같다는 생각이 든다.