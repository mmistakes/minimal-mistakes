---
title: "[MySQL/MariaDB] Lateral Drived 최적화"
excerpt: "MySQL, MariaDB의 인라인뷰 사용시 Lateral Drived 최적화를 이용하여 쿼리 성능을 개선한 사례를 공유합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-16
last_modified_at: 2024-09-16
comments: true
---

### 💻 Azure MySQL Database, AWS RDS MariaDB로 이전을 마치다
--- 
<br/>
제가 근무하고 있는 환경은 멀티클라우드를 지향하고 있어 AWS, Azure, GCP 를 모두 사용중입니다.(제가 지향하는건 아니구요 또르르...ㅠ)
<br/>
그런데 청천병력과 같은 소식이 등장했습니다. 바로 [Azure MySQL Single Database 의 지원 종료 소식인데요.](https://learn.microsoft.com/ko-kr/azure/mysql/migrate/whats-happening-to-mysql-single-server) 24년 9월 16일 이후에는 지원을 종료한다는 이야기입니다.



 그래서 저희도 이와 발맞춰 착실히(?) AWS와 GCP 로 이관을 했었고 잔존했던 "레거시" DBMS 까지 드디어 상황이 맞아 AWS MariaDB RDS로 이전을 완료하였습니다.(잘했다 내자신😄) 특히나 MySQL 5.7 에서 LTS 버전인  MariaDB 10.6 으로 옮긴 상황이라 드디어 안도할 수 있었습니다.

!["Azure MySQL Single Database 중단 소식"](https://github.com/user-attachments/assets/9e342aab-3afb-43f3-a7cf-6af2a117b596)



### 😲 아직 끝나지 않았다. 슬로우쿼리 발생
---
<br/>
하지만 안도한 순간도 잠시 슬로우 쿼리들이 감지되었고 RDS 로그를 수집하고 있던 키바나를 통해 현재 발생 중인 슬로우 쿼리들을 확인하였습니다.

![슬로우쿼리 발생](https://github.com/user-attachments/assets/60bf43bd-f65c-44c3-8538-40fc7527550f)

역시나 ELK 로 모든 로그를 통합 관리해서 보니 손쉽게 확인할 수 있습니다. 분당 1회씩 꾸준히 발생 중 이었던 해당 쿼리는 동일한 패턴이었습니다. 응답시간은 무려 12초입니다.


### 🙈 문제 쿼리 확인
---
<br/>
쿼리는 매우 간단합니다.

```
SELECT 컬럼....
FROM `job` INNER JOIN subJob ON job.id = subJob.jobId AND job.step = subJob.type 
INNER JOIN (SELECT MAX(id) AS LatestId FROM subJob GROUP BY jobId) A ON subJob.id = A.LatestId 
WHERE (job.status = 'P' AND subJob.status = 'S');
```


아래처럼 job과 subjob 테이블을 조인하고

``` FROM `job` INNER JOIN subJob ON job.id = subJob.jobId AND job.step = subJob.type ```


subjob 으로 INNER JOIN 을 한번 더 합니다. 응?

``` INNER JOIN (SELECT MAX(id) AS LatestId FROM subJob GROUP BY jobId) A ON subJob.id = A.LatestId  ```


subJob 의 id 는 해당 테이블의 pk 입니다. 아하... 가장 최근에 작업한 subjob 내역들을 job 별로 조회하고 싶은 것이네요. 그런데 불필요한 조인을 한번 더하기도 하고 subjob 의 건수가 300만여 건이 넘다 보니 좋은 성능을 내기는 어렵겠네요. 실행계획을 살펴보겠습니다.


| id  | select_type | table      | type   | possible_keys                              | key        | key_len | ref               | rows   | Extra                    |
| --- | ----------- | ---------- | ------ | ------------------------------------------ | ---------- | ------- | ----------------- | ------ | ------------------------ |
| 1   | PRIMARY     | job        | ref    | PRIMARY,idx_job_01                         | idx_job_01 | 11      | const             | 104    | Using index condition    |
| 1   | PRIMARY     | subJob     | ref    | PRIMARY,jobId,idx_subjob_01,idx_subjob_02  | jobId      | 5       | frozen.job.id     | 1      | Using where              |
| 1   | PRIMARY     | <derived2> | ref    | key0                                       | key0       | 5       | frozen.subJob.id  |10     |                          |
| 2   | DERIVED     | subJob     | index  | (NULL)                                     | jobId      | 5       | (NULL)            | 3049799| Using index              |

<br/>
조인을 위한 인덱스 최적화는 모두 되어 있습니다. job이 드라이빙 테이블이되고 subJob 을 이후 접근합니다. ``` ON job.id = subJob.jobId AND job.step = subJob.type ``` 으로 인한 접근이구요. 이후에 jobId 별 id 의 최댓값을 뽑기 위해 DERIVED 처리된 subJob 테이블의 결과 집합을 조인하는 모습을 볼 수 있습니다. ``` ON subJob.id = A.LatestId  ``` 
<br/>
병목 지점은 id 2 구간 입니다. DERIVED 의 결과 집합을 임시테이블에 적재하기 위해 3백여만건의 레코드를 읽어들여야 하고 조인을 위한 인덱스 생성(***derived2***의 ***key0***) 작업이 필요합니다.(MySQL 5.X 버전의 경우는 DRIVED table 을 생성하면 임시테이블이 만들어지고 인덱스가 생성되지 않아 Using Join Buffer Block Nested Loop 의 실행계획이 생성되었습니다.) 이 과정에서 상당한 부하가 발생하였습니다.


핸들러 API를 조회해보면 아래와 같이 스캔이 과다하게 발생되는 지점을 확인할 수 있습니다.
<br/>

```
Variable_name             Value    
------------------------  ---------
Handler_read_first        1        
Handler_read_key          13      
Handler_read_last         0        
Handler_read_next         3055874 <-- Derived 테이블 생성을 위한 subJob 인덱스 풀스캔으로 조회
Handler_read_prev         0        
Handler_read_retry        0        
Handler_read_rnd          0      
Handler_read_rnd_deleted  0        
Handler_read_rnd_next     419356  <-- 조인시 Derived 테이블 접근으로 인한 발생
Handler_tmp_write		  1343096  <-- Derived 테이블 생성으로 인한 발생
```

### 😸 문제 해결
---
<br/>

일단 subjob을 두번 조회하는 목적이 가장 최근에 작업한 subjob 내역들을 job 별로 구분해서 보겠다는 의도였기 때문에 이에 맞춰서 쿼리를 재작성 하기로 결정하였습니다. 이를 위해 MySQL, MariaDB 의 [Window Function](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html) 을 사용하고자 합니다. Window Function 은 쿼리 행 집합에 대해 집계나 정렬과유사한 연산을 지원하는 함수입니다. 그러나 집계 연산이 쿼리 행을 단일 결과 행으로 그룹화하는 반면, 윈도우 함수는 각 쿼리 행에 대한 결과를 생성합니다. 

기본적인 쓰임은 OVER 구문을 같이 사용하는 것입니다. 아래와 같습니다.

<br/>

```
집계합수(컬럼) OVER()
집계합수(컬럼) OVER(PARTITION BY 기준컬럼)
집계합수(컬럼) OVER(PARTITION BY 기준컬럼 ORDER BY 정렬컬럼 ASC|DESC)
```


윈도우 함수에 쓸수 있는 집계함수는 아래와 같습니다.

먼저 집계함수에 적용되는 함수입니다.
```
AVG()
BIT_AND()
BIT_OR()
BIT_XOR()
COUNT()
JSON_ARRAYAGG()
JSON_OBJECTAGG()
MAX()
MIN()
STDDEV_POP(), STDDEV(), STD()
STDDEV_SAMP()
SUM()
VAR_POP(), VARIANCE()
VAR_SAMP()
```

MySQL은 또한 윈도우 함수로만 사용되는 비집계 함수도 지원합니다.
```
CUME_DIST()
DENSE_RANK()
FIRST_VALUE()
LAG()
LAST_VALUE()
LEAD()
NTH_VALUE()
NTILE()
PERCENT_RANK()
RANK()
ROW_NUMBER()
```


저는 그중에서도 job 내역별로 가장 최근의 subjob 내역을 확인하기 위해 ROW_NUMBER() 를 사용하려 합니다. 

```
SELECT 컬럼....
	subJob.updatedAt AS sj_updatedAt
FROM (
    SELECT *
         , ROW_NUMBER() OVER (PARTITION BY jobId ORDER BY id DESC) AS rn
    FROM subJob
) subJob
INNER JOIN job ON job.id = subJob.jobId 
AND job.step = subJob.type
WHERE subJob.rn = 1
AND job.status = 'P'
AND subJob.status = 'S';	
```


```ROW_NUMBER()``` 함수는 각 행마다 숫자를 매기는 함수입니다. 숫자를 매기는 기준은 OVER절을 이용하면 되는데 ```PARTITION BY jobId ORDER BY id DESC``` 절을 보면 알 수 있듯이 jobId 가 동일한 행들을 그룹핑해서 id 컬럼 값의 내림차 순으로 정렬하여 숫자를 매기는 방법입니다. 이렇게 처리한 후에 alias 로 'rn' 이라는 명칭으로 컬럼을 만들어주고 인라인뷰 바깥에서 WHERE subJob.rn = 1 처리로 필터링을 걸어줍니다. 이러면 조인을 두번하는 연산은 사라집니다. 
실행계획을 살펴보도록 하겠습니다.


| id   | select_type     | table       | type   | possible_keys      | key         | key_len | ref                              | rows | Extra                  |
|------|-----------------|-------------|--------|--------------------|-------------|---------|-----------------------------------|------|------------------------|
| 1    | PRIMARY         | job         | ref    | PRIMARY,idx_job_01  | idx_job_01  | 11      | const                            | 116  | Using index condition   |
| 1    | PRIMARY         | <derived2>  | ref    | key0               | key0        | 158     | frozen.job.id,frozen.job.step    | 2    | Using where             |
| 2    | LATERAL DERIVED | subJob      | ref    | jobId,idx_subjob_01 | jobId       | 5       | frozen.job.id                    | 1    | Using temporary         |




```
Variable_name             Value    
------------------------  ---------
Handler_read_first        0        
Handler_read_key          9      
Handler_read_last         0        
Handler_read_next         27 <-- Derived 테이블 생성을 위한 subJob 인덱스 풀스캔으로 조회
Handler_read_prev         0        
Handler_read_retry        0        
Handler_read_rnd          60      
Handler_read_rnd_deleted  0        
Handler_read_rnd_next     19  <-- 조인시 Derived 테이블 접근으로 인한 발생
Handler_tmp_write		      30  <-- Derived 테이블 생성으로 인한 발생
Handler_tmp_update        15  <-- Derived 테이블 생성으로 인한 발생
```



<br/>

그런데 2번 항목에 "LATERAL DERIVED" 라는 항목이 있습니다. 어떤 동작인지 알아봐야 할 것 같습니다. 

[MariaDB 의 공식문서](https://mariadb.com/kb/en/lateral-derived-optimization/)를 찾아봅니다.

"LATERAL DERIVED" 는 아래와 같은 상황일 때 동작한다고 합니다.

>- The query uses a derived table (or a VIEW, or a non-recursive CTE)
>- The derived table/View/CTE has a GROUP BY operation as its top-level operation
>- The query only needs data from a few GROUP BY groups

<br/>

번역하자면 아래와 같습니다.
>- Derived Table(인라인 뷰형태 혹은 비재귀 호출 형태의 WITH 절 테이블)을 사용하고, 
>- 인라인뷰의 최상위 레벨의 쓰임이 GROUP BY 연산을 사용할 경우,
>- SELECT 절에 많은 컬럼이 선언되지 않을 때 

<br/>

예를 들어 다음과 같은 쿼리가 있다고 가정합니다.

```
SELECT *
FROM customer
  INNER JOIN (
              SELECT
                customer_id,
                SUM(amount) as TOTAL_AMT
              FROM orders
              WHERE
                order_date BETWEEN '2017-10-01' and '2017-10-31'
              GROUP BY
                customer_id
              ) OCT_TOTALS
  ON customer.customer_id = OCT_TOTALS.customer_id
WHERE
  customer.customer_name IN ('Customer#1', 'Customer#2')
```
<br/>

위의 상황에서 MariaDB 5.3, MySQL 5.6 이전에는 다음과 같은 실행계획으로 최적화 되었습니다.


| id   | select_type | table      | type  | possible_keys | key       | key_len | ref                       | rows  | Extra                    |
|------|-------------|------------|-------|---------------|-----------|---------|---------------------------|-------|--------------------------|
| 1    | PRIMARY     | customer   | range | PRIMARY,name  | name      | 103     | NULL                      | 2     | Using where; Using index |
| 1    | PRIMARY     | <derived2> | ref   | key0          | key0      | 4       | test.customer.customer_id | 36    |                          |
| 2    | DERIVED     | orders     | index | NULL          | o_cust_id | 4       | NULL                      | 36738 | Using where              |

<br/>

위의 실행계획 단계를 설명해보면 이렇습니다.
1. customer_name 이 'Customer#1', 'Customer#2' 값을 찾습니다.
2. OCT_TOTALS 뷰를 구체화합니다. 모든 고객에 대한 OCT_TOTALS를 계산하여 임시테이블을 생성합니다.
3. 고객 테이블과 조인합니다.

<br/>

위의 id = 2번 단계에서 모든 고객에 대한 합계를 계산하는 작업이 상당히 비효율 적입니다. 왜냐하면 우리는 고객 2명("Customer#1", "Customer#2")의 합산 결과만 알면 되기 때문입니다. 하지만 Derived Table(인라인뷰) 바깥에 해당하는 필터조건을 인라인뷰는 알지 못하기 때문에 불필요한 많은 연산 작업을 동반하게 됩니다.(고객테이블의 건수가 많으면 많을 수록 성능 부하는 심해집니다.)

<br/>

"LATERAL DERIVED" 최적화는 위와 같은 문제를 해결하기 위해 Derived Table(인라인뷰) 바깥에 있는 조인조건인 
```ON customer.customer_id = OCT_TOTALS.customer_id``` 절을 내부에 푸쉬함으로써 처리범위를 극적으로 감소시킬 수 있습니다. "LATERAL DERIVED" 최적화가 이루어지면 실행계획은 아래와 같이 변경됩니다.

<br/>

| id   | select_type     | table      | type  | possible_keys | key       | key_len | ref                       | rows | Extra                    |
|------|-----------------|------------|-------|---------------|-----------|---------|---------------------------|------|--------------------------|
| 1    | PRIMARY         | customer   | range | PRIMARY,name  | name      | 103     | NULL                      | 2    | Using where; Using index |
| 1    | PRIMARY         | <derived2> | ref   | key0          | key0      | 4       | test.customer.customer_id | 2    |                          |
| 2    | LATERAL DERIVED | orders     | ref   | o_cust_id     | o_cust_id | 4       | test.customer.customer_id | 1    | Using where              |


<br/>

1. 고객 테이블을 스캔하여 'Customer#1', 'Customer#2'에 대한 customer_id를 찾습니다.
2. OCT_TOTALS 뷰를 구체화합니다. 'Customer#1', 'Customer#2' 고객에 대한 OCT_TOTALS를 계산하여 임시테이블을 생성합니다.
3. 고객 테이블과 조인합니다.

<br/>

주목해야할 점은 id = 2 에 "LATERAL DERIVED"로 표기된점과 ref 값에 test.customer.customer_id 가 들어온 점입니다. 일반적인 DERIVED TABLE에서는 ref 값은 NULL 입니다.


### 😸 의문점
---
<br/>

그런데 의문점이 생겼습니다. 왜 기존 쿼리는 LATERAL DERIVED 최적화가 이루어지지 않았던 것일까요? 

WINDOW 함수를 이용해 쿼리 형태를 바꾼 것과 어떤 차이가 있길래 최적화 방식이 달라진 것인지 궁금해졌습니다.



{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}