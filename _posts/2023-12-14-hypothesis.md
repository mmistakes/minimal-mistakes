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


### 무작정 데이터 보고서 작성하기 

#### 데이터 
- 가상의 Northwind 식품회사의 판매 및 구매 시나리오를 모델링한 **Northwind Database**
- 테이블은 Category, Customer, Orders, Employee 등 15의 테이블로 구성 
- 데이터는 2018년 02월부터 2021년 09월 데이터로 구성 
- 판매 식품은 Beverages, Condiments, Confections, Dairy Products, Grains/Cereals, Meat/Poultry, Produce, Seafood 로 구성 

#### 데이터 분석 툴
- Redash

----- 

일단 가설 설정을 하지않고 무작정 데이터 보고서를 작성해봤다. 


#### 1. 우선 년도별 매출액을 살펴보자

```sql

SELECT DISTINCT DATE_FORMAT(o.OrderDate, '%Y') as Y, SUM(od.UnitPrice * od.Quantity) 'Sales'
FROM Orders o
LEFT JOIN OrderDetail od ON o.id = od.OrderId
GROUP BY Y ;


```
<br>

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_by_year_plot1.png){: .align-center}

2018년과 2021년 매출액이 상대적으로 낮지만 두 해는 다는 연도보다 기간이 짧았기 때문에 당연히 낮을수 밖에 없다.

그러면 연도별 2-9월 데이터만 포함하도록 조건을 준 후 한 후 다시 살펴보자

```sql
SELECT DISTINCT DATE_FORMAT(o.OrderDate, '%Y') as Year, SUM(od.UnitPrice * od.Quantity) 'Sales'
FROM Orders o
LEFT JOIN OrderDetail od ON o.id = od.OrderId
WHERE MONTH(o.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)
GROUP BY Year;
```


![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_by_year_plot2.png){: .align-center}

2018년 부터 2021년까지의 2월 부터 9월 매출액을 시각화했다.

2020년이 가장 많은 매출액을 기록했고 그 다음 2019년 2018년 2021년 순이다.

2020년까지 매출액이 오르다 2021년에 하락한 이유는 무엇일까?

얼마나 하락했는지 비율로 나타내보자 

##### 전년도 매출을 서브쿼리로 구현

서브쿼리로 하나하나 구해줬다.

한눈에 봐도 어지럽고 정신없는 코드가 완성됐다

전년대비 수익률은 ([현재 매출] - [작년 매출])/[작년 매출] * 100 으로 계산했다. 

```sql

SELECT DISTINCT YEAR(o.OrderDate) AS Year,
    CASE 
        WHEN YEAR(o.OrderDate) = 2018 THEN '-'
        WHEN YEAR(o.OrderDate) = 2019 THEN 
            CONCAT(ROUND(((SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o1 
              LEFT JOIN OrderDetail od ON o1.Id = od.OrderId 
              WHERE YEAR(o1.OrderDate) = 2019 AND  MONTH(o1.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9))
            - 
            (SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o2 
              LEFT JOIN OrderDetail od ON o2.Id = od.OrderId 
              WHERE YEAR(o2.OrderDate) = 2018 AND  MONTH(o2.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9))
            )/(SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o2 
              LEFT JOIN OrderDetail od ON o2.Id = od.OrderId 
              WHERE YEAR(o2.OrderDate) = 2018 AND  MONTH(o2.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)) * 100, 2) ,'%')
              
        WHEN YEAR(o.OrderDate) = 2020 THEN 
            CONCAT(ROUND(((SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o1 
              LEFT JOIN OrderDetail od ON o1.Id = od.OrderId 
              WHERE YEAR(o1.OrderDate) = 2020 AND  MONTH(o1.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9))
            - 
            (SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o2 
              LEFT JOIN OrderDetail od ON o2.Id = od.OrderId 
              WHERE YEAR(o2.OrderDate) = 2019 AND  MONTH(o2.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9))
            )/ (SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o2 
              LEFT JOIN OrderDetail od ON o2.Id = od.OrderId 
              WHERE YEAR(o2.OrderDate) = 2019 AND  MONTH(o2.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)) * 100, 2) ,'%')
              
        WHEN YEAR(o.OrderDate) = 2021 THEN 
            CONCAT(ROUND(((SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o1 
              LEFT JOIN OrderDetail od ON o1.Id = od.OrderId 
              WHERE YEAR(o1.OrderDate) = 2021 AND  MONTH(o1.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9))
            - 
            (SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o2 
              LEFT JOIN OrderDetail od ON o2.Id = od.OrderId 
              WHERE YEAR(o2.OrderDate) = 2020 AND  MONTH(o2.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9))
            ) / (SELECT SUM(od.UnitPrice * od.Quantity) 
              FROM Orders o2 
              LEFT JOIN OrderDetail od ON o2.Id = od.OrderId 
              WHERE YEAR(o2.OrderDate) = 2020 AND  MONTH(o2.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)) * 100,2), '%')
              
    END AS YoY
FROM 
    Orders o
    LEFT JOIN OrderDetail od ON o.id = od.OrderId
WHERE 
    MONTH(o.OrderDate) IN (2, 3, 4, 5 ,6 ,7, 8, 9)
GROUP BY 
    Year, o.OrderDate; 

```

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\YoY1.png){: .align-center}

#### SET 문법 이용 
SET 을 이용해 prev 변수를 만든 후 이전 연도 매출액 (prev_sales) 을 계산한 다음 이전 연도 대비 매출 (YoY)를 계산하니 훨씬 보기좋고 간단해졌다!

```sql

-- 변수 초기화
SET @prev := 0;

-- 매출 및 이전 연도 대비 매출 계산
SELECT 
    YEAR,
    @prev AS prev_sales,
    CONCAT(ROUND (100 * 
    CASE @prev  WHEN 0 THEN 0
    ELSE (SALES.total_sales - @prev)/ @prev END, 2), '%') AS YoY,
    @prev := total_sales AS total_sales
FROM (
    SELECT 
        YEAR(OrderDate) AS YEAR,
        SUM(UnitPrice * Quantity) AS total_sales
    FROM 
        Orders
        LEFT JOIN OrderDetail ON Orders.id = OrderDetail.OrderId
    WHERE MONTH(Orders.OrderDate) BETWEEN 2 AND 9
    GROUP BY 
        YEAR
) AS SALES;

```
![Alt text]({{site.url}}\images\2023-12-14-hypothesis\YoY2.png){: .align-center}

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\YoY_plot.png){: .align-center}

전년 대비 매출을 비교를 한번에 파악하기 쉬워졌다.

그러면 여기서 분석 아이디어를 확장해보자

2021년도 매출액 감소의 원인은 무엇일까? 

#### 2. 카테고리별 매출을 살펴보자 

```sql

SELECT YEAR(o.OrderDate) YEAR, c.CategoryName, SUM(od.UnitPrice * od.Quantity) Sales
FROM Product p
LEFT JOIN Category c ON p.CategoryId = c.Id
LEFT JOIN OrderDetail od ON od.ProductId = p.id
LEFT JOIN Orders o ON o.id = od.OrderId
WHERE MONTH(o.OrderDate) BETWEEN 2 AND 9
GROUP BY YEAR, c.CategoryName ;

```
<br>

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\category_pie.png){: .align-center}


Visualization을 이용해서 연도별로 카테고리별 매출을 더 자세히 살펴봤다.

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\category_sales_pie.png){: .align-center}

연도별 카테고리별 매출 비율의 차이는 1위 2위 카테고리가 변하고있지만 변동율이 0.1-0.2 % 내외라 큰 이상치는 안보인다.


다음은 어떤 데이터를 분석해야 할까? 

고객 데이터를 봐야하나? 지역별 매출액을 살펴 볼까....

이런식으로 데이터 분석 보고서를 작성하려 하니 작성 방향이 안잡혔다. 멘토님 말씀대로 가설 설정 후 데이터 분석을 시도해보자.

그 전에 데이터 분석을 위한 가설 설립을 하는 이유를 찾아보았다. 

### 데이터 분석을 위한 가설 설립 

우리는 왜 데이터를 분석해야 하는가?를 알 수 있는 ‘문제 파악’에 긴 시간을 투자해야 한다.

가설이 올바르게 수집되지 못한다면 ‘문제 해결을 위한 상당한 물적, 인적 자원을 낭비하게된다. 

#### 1. 지표를 입체적으로 바라보기
여러 지표를 통해 이 지표를 설명하는 것은 모든 데이터 분석의 기초가 된다. 예를 들어 매출을 서비스별로 나누어 본다. 다른 것보다 특이하거나 예상한 추세보다 특이한 세부적인 서비스에 집중해서 본다. 

우리가 집중해서 볼 **종속 변수** 를 찾는데 도움을 준다.

종속변수를 정했다면 종속 변수를 설명하는 여러 개의 설명 변수, X값을 찾는 게 가설을 만드는 데 도움을 준다.  

<span style="font-size : 12pt;">참고로 종속변수와 독립변수가 헷갈린다면 다음 사이트에 쉽게 설명되어 있다 : <a href = 'https://yozm.wishket.com/magazine/detail/2031/'> 독립변수와 종속변수란? </a> </span>

이렇게 계속 지표로 지표를 설명하는 과정을 거치면서 어떤 지표의 값 변화가 다른 지표의 값 변화를 야기하는 것을 알게 된다면 하나의 지표를 통해 다른 지표, 우리가 중요하게 생각하는 KPI 변화를 미리 예측하거나 정책을 만들 수 있다.


#### 2. 데이터를 많이 보기
지표로 지표를 설명할 수 있으려면 많이 알고 있어야 한다. 지표를 더 많이 알게 될수록 가설에 사용할 수 있는 내용이 늘어난다. 그러면 선후 관계가 있는 지표들의 조합도 더 많이 알게되고 상관성이 높은 지표도 파악할 수 있다. 

----

<br>

데이터 분석에서의 가설은 결론이 아니라 과정에 대한 것이다. 

위에서 내가 데이터 분석을 작성할 때 한 실수는 결론으로 도출될 내용만으로 생각하고 분석에 임했기 때문이다.

나는 '매출이 2021년에 감소했다.' 는 결론에만 집중해서 이 결론을 만들 원인만 찾고있었다.

가설은 과정에 대한 것이어야 한다. 애초에 결론으로 도출될 내용만으로 생각하고 분석에 임해서는 안된다.

예를 들어보자

>인테리어 시장이 코로나 전후로 성장했을까? 란 호기심으로 데이터를 찾았다면 그 후 어떤 품목이 올랐을까? 해당 품목은 성장률이 높을까? 타깃이 다른 품목이랑 다를까? 란 식으로 궁금점이 연이어 셍긴다.

여기서 데이터를 보며 갖게되는 ‘질문’, 즉 호기심이 가설이다.

질문을 잘 던지려면 해당산업을 어느정도 이해하고 있어야 가능하다. 데이터를 보는 중에 아무 호기심이 들지 않는다면, 그건 데이터 분석이 제대로 되지 않다는 증거이다.



### 데이터 보고서 작성하기 

#### 첫번째 가설 : 연도별 고객 순위는 유사할 것이다. 

연도별 고객 비율을 살펴보았다. 

GROUP BY 후 LIMIT 10 을 이용하여 가져 올 경우 GROUP BY 적용 전 데이터 기준으로 10개만가져와져서 Sales 별ㅀ 순위를 매기기 위해서 이전 행의 YEAR 값을 가져오는 prevYEAR 변수를 생성하여 연도별 Num 값을 매겨준 후 Sales 순 TOP 5 데이터를 가져오는쿼리를 작성했다. 

**Year, Company 별 그룹화 한 후 Sales 순 TOP 5 데이터를 가져오는쿼리**

```sql
SET @prevYEAR := null;
SET @num := 1;

SELECT Year, CompanyName, Sales, Num
FROM (
    SELECT 
        Year, 
        CompanyName,
        Sales,
        @num := IF(Year = @prevYEAR, @num + 1, 1) AS Num,
        @prevYEAR := Year AS prevYEAR
    FROM (
        SELECT 
            YEAR(o.OrderDate) AS Year, 
            c.CompanyName, 
            SUM(od.UnitPrice * od.Quantity) AS Sales
        FROM Customer c
        LEFT JOIN Orders o ON c.Id = o.CustomerId
        LEFT JOIN OrderDetail od ON o.Id = od.OrderId
        WHERE MONTH(o.OrderDate) BETWEEN 2 AND 9
        GROUP BY Year, CompanyName
        ORDER BY Year, Sales DESC
    ) AS A
) AS B
WHERE Num BETWEEN 1 AND 5;
```

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\company_sales_pie.png){: .align-center}

구매율이 높은 회사들을 살펴 보았지만 연도별 고객 회사들의 구성의 차이가 큰것을 볼 수 있다. 

Hanari Carnes, Ricardo Adocicados 정도만 2018년 2021년에 동일하게 나타났다. 

위에서 연도별 카테고리 매출액 비율이 거의 동일한것과는 다른 형태를 보인다. 

고객은 다르지만 연도별 고객들의 쇼핑 형태는 유사한 것으로 보인다. 

크게 연도별로 매출액을 살펴보았다.

그럼 좀더 디테일하게 월별로 살펴보면 어떨까?


##### 월별 매출액 시각화

```sql

-- 연도별 월별 매출액

SELECT YEAR(o.OrderDate) Year, MONTH(o.OrderDate) Month, SUM(od.UnitPrice * od.Quantity) AS Sales
FROM Customer c LEFT JOIN Orders o ON c.Id = o.CustomerId
LEFT JOIN OrderDetail od ON o.Id = od.OrderId
GROUP BY Year, Month
ORDER BY Year, Month, Sales DESC;

-- 연도별 월별 매출 증감율
SET @prev := 0;

SELECT 
    YEAR,
    Month,
    @prev AS prev_sales,
    CONCAT(ROUND (100 * 
    CASE 
    WHEN @prev = 0 OR Month = 1 THEN 0
    ELSE (SALES.total_sales - @prev)/ @prev END, 2), '%') AS YoY,
    @prev := total_sales AS total_sales
FROM (
    SELECT 
        YEAR(OrderDate) AS YEAR,
        MONTH(OrderDate) Month,
        SUM(UnitPrice * Quantity) AS total_sales
    FROM 
        Orders
        LEFT JOIN OrderDetail ON Orders.id = OrderDetail.OrderId
    GROUP BY 
        YEAR, Month
) AS SALES;

```

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_m_line.png){: .align-center}

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_mom.png){: .align-center}

2021년 9월의 매출이 급격히 감소한 것을 확인했다.

21년 7월에는 최고 매출을 기록했지만 8월에 -16% 감소했으며 9월에 - 46%로 급감했다. 

---

21년 매출을 자세히 살펴보자 

21년 9월의 데이터는 19일 까지만 존재해 다를 달보다 데이터 양이 적어 매출이 감소한것처럼 보인것을 알 수 있다. 

```sql
SELECT o.OrderDate, SUM(od.UnitPrice * od.Quantity) AS Sales
FROM Customer c LEFT JOIN Orders o ON c.Id = o.CustomerId
LEFT JOIN OrderDetail od ON o.Id = od.OrderId
WHERE YEAR(o.OrderDate) = 2021 AND MONTH(o.OrderDate) = 9
GROUP BY o.OrderDate
ORDER BY o.OrderDate;
```

![Alt text]({{site.url}}\images\2023-12-14-hypothesis\sales_2021_9.png){: .align-center}

----

