---
layout: single
title: '데이터 분석을 위한 가설 수립하기 '
categories: 데이터분석
author_profile: false
published: true
sidebar:
    nav: "counts"
---

코멘토 '데이터 분석 보고서 작성하기' 과제 중 가설 설정을 위한 올바른 질문은 무엇인지 궁금증이 생겨 도움이 되는 자료들을 정리했다.  

멘토님이 제시해 주신 분석 보고서 작성 단계는 다음과 같다.


>분석 보고서는 **'가설 수립 > 가설을 검증하기 위한 지표 선정 > 지표 측정 및 분석 > 분석 결과 및 결론(인사이트)'** 순으로 작성하면 됩니다.


분석 보고서의 시작은 가설 수립이다. 가설을 수립하기 위해서 내가 첫번째로 던져야할 질문은 무엇일까?


### 무작정 가설 수립하기 

#### 데이터 
- 가상의 Northwind 식품회사의 판매 및 구매 시나리오를 모델링한 **Northwind Database**
- 테이블은 Category, Customer, Orders, Employee 등 15의 테이블로 구성 
- 데이터는 2018년 02월부터 2021년 09월 데이터로 구성 
- 판매 식품은 Beverages, Condiments, Confections, Dairy Products, Grains/Cereals, Meat/Poultry, Produce, Seafood 로 구성 

#### 데이터 분석 툴
- Redash

----- 

위 데이터를 이용하여 무작정 가설을 시도해봤다. 

#### 1. 우선 년도별 매출액을 살펴보자

```sql

SELECT DISTINCT DATE_FORMAT(o.OrderDate, '%Y') as Y, SUM(od.UnitPrice * od.Quantity) 'Sales'
FROM Orders o
LEFT JOIN OrderDetail od ON o.id = od.OrderId
GROUP BY Y ;


```
<br>

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_by_year_plot1.png)

2018년과 2021년 매출액이 상대적으로 낮지만 두 해는 다는 연도보다 기간이 짧았기 때문에 당연히 낮을수 밖에 없다.

그러면 연도별 2-9월 데이터만 포함하도록 조건을 준 후 한 후 다시 살펴보자

```sql
SELECT DISTINCT DATE_FORMAT(o.OrderDate, '%Y') as Year, SUM(od.UnitPrice * od.Quantity) 'Sales'
FROM Orders o
LEFT JOIN OrderDetail od ON o.id = od.OrderId
WHERE MONTH(o.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)
GROUP BY Year;
```


![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_by_year_plot2.png)

2018년 부터 2021년까지의 2월 부터 9월 매출액을 시각화했다.

2020년이 가장 많은 매출액을 기록했고 그 다음 2019년 2018년 2021년 순이다.

2020년까지 매출액이 오르다 2021년에 하락한 이유는 무엇일까?

얼마나 하락했는지 비율로 나타내보자 

```sql

SELECT DISTINCT DATE_FORMAT(o.OrderDate, '%Y') as Year, SUM(od.UnitPrice * od.Quantity) 'Sales',
CASE YEAR(OrderDate)
    WHERE 2018 THEN YEAR(OrderDate)
FROM Orders o
LEFT JOIN OrderDetail od ON o.id = od.OrderId
WHERE MONTH(o.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)
GROUP BY Year
```

#### 2. 카테고리별 매출을 살펴보자 

```sql

SELECT DISTINCT c.CategoryName, SUM(od.UnitPrice * od.Quantity) Sales
FROM Product p
LEFT JOIN Category c ON p.CategoryId = c.Id
LEFT JOIN OrderDetail od ON od.ProductId = p.id
GROUP BY c.CategoryName ;
```
<br>

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_by_categpry_plot.png)

Beverages 가 높고 그 다음으로 Confections , Meat/poultry 순이고 가장 낮은 카테고리는 Grains/Cereals 이다.

이러한 정보를 바탕으로 가설을 어떻게 수립할까?

최고 매출액이 Beverages 이면 ... 아이디어가 떠오르지 않는다 ^^ 

막상 가설을 설립하려니 어떤 가설을 설립해야 의미있는 분석이 될지 감이 안잡혔다.

### 데이터 분석을 위한 가설 설립 



### 1. 지표를 입체적으로 바라보기
여러 지표를 통해 이 지표를 설명하는 것은 모든 데이터 분석의 기초가 된다. 예를 들어 매출을 서비스별로 나누어 본다. 다른 것보다 특이하거나 예상한 추세보다 특이한 세부적인 서비스에 집중해서 본다. 

우리가 집중해서 볼 **종속 변수** 를 찾는데 도움을 준다.

종속변수를 정했다면 종속 변수를 설명하는 여러 개의 설명 변수, X값을 찾는 게 가설을 만드는 데 도움을 준다.  

<span style="font-size : 12pt;">참고로 종속변수와 독립변수가 헷갈린다면 다음 사이트에 쉽게 설명되어 있다 : <a href = 'https://yozm.wishket.com/magazine/detail/2031/'> 독립변수와 종속변수란? </a> </span>

이렇게 계속 지표로 지표를 설명하는 과정을 거치면서 어떤 지표의 값 변화가 다른 지표의 값 변화를 야기하는 것을 알게 된다면 하나의 지표를 통해 다른 지표, 우리가 중요하게 생각하는 KPI 변화를 미리 예측하거나 정책을 만들 수 있다.


### 2. 데이터를 많이 보기
지표로 지표를 설명할 수 있으려면 많이 알고 있어야 한다. 지표를 더 많이 알게 될수록 가설에 사용할 수 있는 내용이 늘어난다. 그러면 선후 관계가 있는 지표들의 조합도 더 많이 알게되고 상관성이 높은 지표도 파악할 수 있다. 







과제에서 사용하는 데이터베이스인 판매 및 구매 시나리오를 모델링한 [Northwind] Database 을 바탕으로 살펴보자.








 