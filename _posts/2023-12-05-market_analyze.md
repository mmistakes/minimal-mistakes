---
layout: single
title:  "서울 상권 데이터 분석"
categories: EDA,data science,data
tag : [EDA,data science]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

<br>


# 서울 상권 데이터 분석 목표 

<br>


상권 분석 : 해당 상권이 특정 업종에 적합한지 다각도로 분석하는것을 의미 한다



20 30 , 30 40 세대 기준으로 상권 분석 할 예정이다



2019- 2023의 데이터가 존재 하는데 2021-2023까지의 데이터를 사용할 예정이다



**사용한 서울 상권 데이터**

<br>


+ 생활 인구

  + 20 30 , 30 40의 유동인구를 파악하는 목적


<br>



+ 상주 인구

  + 상권내에 인구가 얼마나 있는지 파악하기 위함

<br>


+ 아파트

  + 상권내에 아파트 단지가 몇개 있는지 파악 목적

<br>


+ 점포

  + 한국 표준 산업 분류 테이블 기준으로 상권내에 있는 업종을 파악하는게 목적이다

<br>


+ 접객 시설

  + 교통이나, 주변에 학교(초중고대)
  상권에 접근성이 좋은지 판단 목적

<br>


+ 직장 인구

  + 2030 3040세대의 직장 인구 파악 위함

<br>


+ 추정 매출

  + 20 30 3040의 분기면 매출추정 하기 위함

<br>


203040세대 직장인 인구한테 인기 있는 상권 지역과 203040 유동인구 한테 인기 있는 상권 지역을 분류 하는 목적으로 과제를 진행 하였다 

<br>


사용한 데이터 : 길단위 인구 상권,아파트 상권, 점포 상권, 접객시설 상권, 직장인구 상권, 추정 매출 상권


<br>


# 데이터 분석  

모든 데이터를 나중에 하나로 합치기 위해 각각의 데이터를 상권 구분 코드명과 상권 코드명으로 groupby해주었다 

<br>



**유동인구수, 직장인구수,추정 매출금액,매출건수는 20세대 30세대 40세대로 각각 나누었다**

<br>



+ 접객시설 데이터에서 초중고대는 하나의 학교수, 지하철 버스등의 교통시설도 교통시설수, 일반병원 약국수도 종합병원의 수로 합쳐서 처리하였다 



+ 점포 데이터는 다음 그림의 기준을 가지고 점포를 나누어서 처리 하였다 


<br>



![shop image](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image.png)



<br>


> 모든 데이터는 상권 구분코드 ,상권 코드명을 공통으로 가지고 있기 때문에 이 2가지 attribute로 모든데이터를 통합하고 null data에 대해서는 0으로 처리 하였다 그리고 scale을 정규화 하는 과정은 사이킷런의 minmax sclaer를 사용하였고 결과는 다음과 같다 


> 결론적으로 합쳐진 데이터는 각각의 상권 지역에 따른 모든데이터 내용이 통합된 데이터이다 


<br>


![min_max_sclaer](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image2.png)

<br>



# knn 모델 결과 

총상주 인구수, 20,30,40 유동인구수, 20,30,40 직장인구수, 접객시설수, 학교수 ,아파트 단지수,종합병원수를 통합한 새로운 num_data를 만들어주고 이 데이터를 knn에 넣어주었다 그리고 가장 높은 실루엣 점수를 가지는 k를 구하는 과정은 다음과 같다 



![knn score](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image3.png)



하지만 2가지 경우로 분류 하고 싶기 때문에 k=2로 설정 하기로 한다 (유동인구 인기 영역, 직장인 인기 영역)



<br>


**다음은 k=2로 knn 진행했을때의 결과 이다**

<br>


![cluster result](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image4.png)

<br>


# cluster = 0

<br>


![직장인인기영역](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image5.png)


![직장인 상권영역](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image6.png)

<br>


# cluster =1 

<br>


![유동인구영역](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image7.png)

<br>


![유동인구상권영역](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image8.png)

골목 상권이 100%로 나왔는데 합친 데이터에서 결측치 제거 할때나 아니면 합칠때 문제가 있었을것으로 예상한다 

<br>


직장인구와 유동인구의 영역에는 크게 차이가 없이 오락서비스와 카페가 인기가 많은것으로 볼수있다 


# 연령별 매출 금액 매출 건수 비교 

<br>


**20대 매출금액**

![20 매출금액](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image9.png)

<br>



**30대 매출금액**


![30 매출금액](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image10.png)

<br>



<br>




**40대 매출금액**
<br>


![40 매출금액](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image11.png)
<br>



**20대 매출건수**


![20 매출건수](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image12.png)
<br>



**30대 매출건수**


![30매출건수](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image13.png)

<br>



**40대 매출건수**


![40매출건수](C:\github_blog\sullivan.github.io\images\2023-12-05-market_analyze\image14.png)


<br>


기본적으로 유동인구 보다 직장인구 매출금액 건수의 큰 이상치가 많은것으로 보아서 직장인구 상권 영역이 더 큰 매출과 건수를 가지는것으로 볼수있을것 같다 그리고 20<30<40 순으로 매출금액 차이가 있음을 알수있다 



<br>


# 정리 

<br>


+ 직장인구 인기 영역에서는 종합 병원수 교통 시설, 접객 시설이 많고 아파트 단지수 ,학교수, 203040유동인구,총상주인구가 부족한 편인 영역임을 알수있다 





+ 유동인구 인기영역은 반대로 아파트 단지수와 학교수,총상주 인구가 많은 편이고 주변에 종합병원수,교통시설수,접객시설이 비교적 부족한 편임을 알수가 있다 




<br>



# 데이터 분석 코드와 knn모델 코드 

다음 깃헙 주소에서 전체 코드를 볼수있다 



https:\\github.com\meang123\market_analyze

<br>


# 참고 링크 

https:\\github.com\chenni0531\data-seoul-market-analysis

<br>


