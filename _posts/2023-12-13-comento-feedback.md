---
layout: single
title: '코멘토 SQL 입문부터 활용까지 1-2주차 피드백'
categories: 코멘토
tag: [코멘토]
toc: true 
author_profile: false
published: true
sidebar:
    nav: "counts"

---

코멘토 SQL 입문부터 활용까지 1-2주차 과제 피드백을 받았습니다. 

## 1주차 

**1. Country 별로 ContactName이 ‘A’로 시작하는 Customer의 숫자를 세는 쿼리를 작성하세요**

```sql
SELECT Country, COUNT(id)
FROM Customers
WHERE ContactName LIKE BINARY 'A%'
GROUP BY Country;
```


![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w1-1
.png)


>### 멘토님 Review

#### COUNT() 사용시 주의 할 점

COUNT() 안에 컬럼명을 넣으면 그 컬럼 값이 null이 있을 때는 카운트를 하지 않고, null이 아닌 경우에만 카운트를 하겠다는 의미이다.

반면 count(1)과 같이 컬럼명이 없으면 null이 있어도 카운트를 하게 되고, 그냥 row수를 세는 것과 같은 의미이므로 의미 차이를 알고 의도에 맞게 사용하자! 

참고로 count(1)과 count(*)에는 차이가 없다

----

<br>


**2. Customer 별로 Order한 Product의 총 Quantity를 세는 쿼리를 작성하세요**

```sql
SELECT DISTINCT o.CustomerID, SUM(od.Quantity) 
FROM OrderDetails as od
JOIN Orders as o
ON od.OrderID = o.OrderID
GROUP BY o.CustomerID;
```

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w1-2
.png)

>### 멘토님 Review

#### 풀어서 쓰는 습관을 들이자

쿼리를 쓰는 사람 입장에서도 읽는 사람 입장에서도 더 명확하게 쓰기 위해서 생략해서 쓰지 말고 inner join 혹은 left (outer) join이라고 풀어서 쓰는 습관을 들이자. 

-----

<br>


**3. 년월별, Employee별로 Product를 몇 개씩 판매했는지를 표시하는 쿼리를 작성하세요.**

```sql
SELECT DISTINCT DATE_FORMAT(o.OrderDate, '%Y-%m') as YM, o.EmployeeID, SUM(od.Quantity)
FROM OrderDetails as od
INNER JOIN Orders as o ON od.OrderID = o.OrderID
GROUP BY YM, o.EmployeeID;
```

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w1-3
.png) 

>### 멘토님 Review

#### datetime 변수

 MySQL에서는 datetime 변수를 다루기 위해 year(), month(), date_format() 등의 함수를 많이 쓰고, 날짜를 문자열로 보고 substr() 함수를 사용해도 된다.


----

<br>

## 2주차 

**1. 상품(product)의 카테고리(category)별로, 상품 수와 평균 가격대(list_price)를 찾는 쿼리를 작성하세요.**

- 필요한 테이블 : products

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-1.png) 


<br>


**2. 2006년 1분기에 고객(customer)별 주문(order) 횟수, 주문한 상품(product)의 카테고리(category) 수, 총 주문 금액(quantity * unit_price)을 찾는 쿼리를 작성하세요. (힌트: join)**

**필요한 테이블**

- 고객(customer)별 주문(order) 횟수  : orders
- 주문한 상품(product)의 카테고리(category) 수 : products
- 총 주문 금액(quantity * unit_price) : order_details

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\orders.png) ![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\products.png) ![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\order_details.png) 

----

```sql
SELECT o.customer_id, COUNT(*) '주문(order) 횟수',  COUNT(p.category) '카테고리(category) 수', sum(od.quantity * od.unit_price) '주문 금액'
FROM orders o
LEFT JOIN order_details od ON o.id = od.order_id
LEFT JOIN products p ON p.id = od.product_id
WHERE o.order_date BETWEEN '2006-1-1' AND '2006-4-1'
GROUP BY o.customer_id;
```

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-2.png) 


>### 멘토님 Review

고객(customer)별 주문(order) 횟수 :
-  COUNT(*) 가 아니라  COUNT(distinct o.id) 를 이용해야 모든 행의 수가 아닌 주문 횟수만 얻을 수 있다.

주문한 상품(product)의 카테고리(category) 수 :
- COUNT() 안에  distinct를 추가해야 중복없이 데이터의 수를 가져올 수 있다. 

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-2-answer.png) 

----

<br>

**3. 2006년 3월에 주문(order)된 건의 주문 상태(status_name)를 찾는 쿼리를 작성하세요. (join을 사용하지 않고 쿼리를 작성하세요.) (힌트: orders_status 사용, sub-query)**

**필요한 테이블**
- order, order_status (코드 테이블)

```sql
SELECT o.id , ( 
SELECT os.status_name
FROM orders_status os
WHERE o.status_id = os.id
) as '주문 상태'
FROM orders as o
WHERE o.order_date >= '2006-3-1' AND o.order_date < '2006-4-1'
ORDER BY o.id;
```
![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-3.png) 

<br>

**4. 2006년 1분기 동안 세 번 이상 주문(order) 된 상품(product)과 그 상품의 주문 수를 찾는 쿼리를 작성하세요. (order_status는 신경쓰지 않으셔도 됩니다.) (힌트: sub-query or having)**

**필요한 테이블**
- orders, order_details 

```sql

SELECT od.product_id, COUNT(od.product_id)
FROM orders o
LEFT JOIN order_details od ON o.id = od.order_id
WHERE (o.order_date BETWEEN '2006-01-01' AND '2006-04-01') 
GROUP BY od.product_id
HAVING COUNT(od.product_id) >=3;

```

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-4.png) 

----

<br>

**5-1. 2006년 1분기, 2분기 연속으로 주문(order)을 받은 직원(employee)을 찾는 쿼리를 작성하세요. (order_status는 신경쓰지 않으셔도 됩니다.) (힌트: sub-query, inner join)**


- 1차 답안  

```sql
SELECT DISTINCT employee_id '직원'
FROM orders
WHERE (QUARTER(order_date) = 1 AND employee_id IN (SELECT DISTINCT employee_id FROM orders WHERE QUARTER(order_date) = 2))
   OR (QUARTER(order_date) = 2 AND employee_id IN (SELECT DISTINCT employee_id FROM orders WHERE QUARTER(order_date) = 1))
ORDER BY employee_id;

```
>### 멘토님 Review
결과는 맞으나 JOIN을 이용하여 푸는 것이 훨씬 간단하다. 좀 더 간단한 방법을 이용하자.

1차 답안을 피드백 받을 때 다른 분들의 답안보다 훨씬 기간이 오래 걸렸다. 그 이유는 쿼리가 너무 꼬여 있고 어떤 의도로 작성했는지 한눈에 파악하기 힘들어서이다.

나도 내 쿼리를 다시 보고 왜 저렇게 작성했지? 란 생각이 들 정도였다.

쿼리를 작성할 때는 다른 사람도 쉽게 이해할 수 있도록 작성하자!

- JOIN을 이용한 2차 답안 


```sql
SELECT DISTINCT q1.employee_id '직원'
FROM (SELECT employee_id FROM orders WHERE order_date BETWEEN '2006-01-01' AND '2006-04-01') as q1 
INNER JOIN 
(SELECT employee_id FROM orders WHERE order_date BETWEEN '2006-04-01' AND '2006-07-01') as q2
ON q1.employee_id = q2.employee_id;
```


![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-5-1.png) 




---

**5-2. 2006년 1분기, 2분기 연속으로 주문을 받은 직원별로, 월별 주문 수를 찾는 쿼리를 작성하세요. (order_status는 신경쓰지 않으셔도 됩니다.) (힌트: sub-query 중첩, date_format() )**

- 1차 답안 

```sql
SELECT employee_id, DATE_FORMAT(order_date, '%m') AS month, COUNT(*) AS '주문 수'
FROM orders
WHERE (QUARTER(order_date) = 1 AND employee_id IN (SELECT DISTINCT employee_id FROM orders WHERE QUARTER(order_date) = 2))
   OR (QUARTER(order_date) = 2 AND employee_id IN (SELECT DISTINCT employee_id FROM orders WHERE QUARTER(order_date) = 1))
GROUP BY employee_id, month
ORDER BY employee_id, month;

```

>### 멘토님 Review
5-1 의 피드백과 동일 

- 2차 답안

```sql

SELECT o.employee_id, MONTH(o.order_date) '월', COUNT(DISTINCT o.id) ' 주문 수'
FROM orders o
WHERE o.employee_id in ( 
SELECT q1.employee_id 
FROM (SELECT employee_id FROM orders WHERE order_date BETWEEN '2006-01-01' AND '2006-04-01') as q1 
INNER JOIN 
(SELECT employee_id FROM orders WHERE order_date BETWEEN '2006-04-01' AND '2006-07-01') as q2
ON q1.employee_id = q2.employee_id) 
GROUP BY o.employee_id, MONTH(o.order_date);
```

![Alt text]({{site.url}}\images\2023-12-13-comento-feedback\w2-5-2.png) 

## 중요 포인트 정리

### 1. 실행 순서를 생각하며 작성하자

> **5 select** 결과를 보여줄 컬럼을 지정, \* <br> 
> **1 from** 데이터를 가져올 테이블을 지정 <br> 
> **2 where** 컬럼에 조건을 지정  <br> 
> **3 group by** 그룹화할 기준이 되는 컬럼을 지정, ~별  <br> 
> **4 having** 집계함수의 결과값에 조건을 지정  <br> 
> **6 order by** 정렬할 기준과 방법을 지정 <br> 

쿼리문은 항상 SELECT 구로 시작하지만 쿼리문 작성시에는 SELECT 부터 작성하면 헷갈리기 쉽다.

실행 순서를 생각하면서 조건에는 무엇이 포함되는지, 그룹화할 컬럼은 없는지 파악하면서 쿼리를 작성하자.

### 2. 중복 제거를 위해 DISTINCT를 사용하자
COUNT 함수 안에 DISTINCT를 넣어 중복 제거도 가능하다.

### 3. 쿼리를 읽는 사람 입장에서 명확하게 읽을 수 있게 작성하자.
쿼리문은 나만 보는 것이 아니라 다른 사람과 공유할 수 있어야 하므로 좀 더 알기 쉽게 풀어서 쓰는 습관을 가지자.
