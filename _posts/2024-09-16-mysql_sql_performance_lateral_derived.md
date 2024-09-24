---
title: "[MySQL/MariaDB] Lateral Drived 최적화를 통한 성능 개선 사례"
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
제가 근무하고 있는 환경은 멀티클라우드를 지향하고 있어 AWS, Azure, GCP 를 모두 사용중입니다.(제가 지향하는건 아니구요 또르르...😢)

그런데 청천병력과 같은 소식이 등장했습니다. 바로 [Azure MySQL Single Database 의 지원 종료 소식인데요.](https://learn.microsoft.com/ko-kr/azure/mysql/migrate/whats-happening-to-mysql-single-server) 24년 9월 16일 이후에는 지원을 종료한다는 이야기입니다.

!["Azure MySQL Single Database 중단 소식"](https://github.com/user-attachments/assets/9e342aab-3afb-43f3-a7cf-6af2a117b596)

 그래서 저희도 이와 발맞춰 착실히(?) AWS와 GCP 로 이관을 했었고 잔존했던 "레거시" DBMS 까지 드디어 상황이 맞아 AWS MariaDB RDS로 이전을 완료하였습니다. 특히나 MySQL 5.7 에서 LTS 버전인  MariaDB 10.6 으로 옮긴 상황이라 드디어 안도할 수 있었습니다.(잘했다 내자신😄)

 MySQL 5.7 에서 MariaDB 10.6 으로 이전하면서 발생한 자잘한 이슈들이 있는데 추후에 정리를 해보겠습니다.(뒷일은 미래의 나에게 맡긴다 후후..)


<br/>

### ⚠️ 아직 끝나지 않았다. 슬로우쿼리 발생
---
이전을 완료했다는 안도감도 잠시 슬로우 쿼리 알람이 발생하였고 RDS 로그를 수집하고 있던 키바나를 통해 현재 발생 중인 슬로우 쿼리들을 확인하였습니다.

![슬로우쿼리 발생](https://github.com/user-attachments/assets/60bf43bd-f65c-44c3-8538-40fc7527550f)

역시나 ELK 로 모든 로그를 통합 관리해서 보니 손쉽게 확인할 수 있습니다. 분당 1회씩 꾸준히 발생 중 이던 해당 쿼리는 동일한 패턴이었습니다. 응답시간은 무려 12초입니다😲

<br/>

### 🙈 문제 쿼리 확인
---

쿼리는 매우 간단합니다.

```sql
SELECT 컬럼....
FROM `job` INNER JOIN subJob 
    ON job.id = subJob.jobId 
    AND job.step = subJob.type 
INNER JOIN (SELECT jobId, MAX(id) AS LatestId 
            FROM subJob 
            GROUP BY jobId) A 
    ON subJob.id = A.LatestId 
WHERE (job.status = 'P' AND subJob.status = 'S');
```

아래처럼 주작업(job) 테이블과 하위작업(subjob) 테이블을 조인하고

```sql
FROM job INNER JOIN subJob ON job.id = subJob.jobId AND job.step = subJob.type
```
 
하위작업(subjob)테이블과 INNER JOIN 을 한번 더 합니다. 응?

```sql
INNER JOIN (SELECT jobId, MAX(id) AS LatestId FROM subJob GROUP BY jobId) A ON subJob.id = A.LatestId  
```


주 작업(job) 테이블과 하위작업(subjob) 테이블을 조인한 뒤 한번 더 하위작업(subjob) 테이블을 이용해서 주 작업번호(jobid) 를 기준으로 하위 작업번호(subjob.id) 의 최댓값을 집계한 인라인뷰를 만들어 이너조인 시키고 있습니다. 

결국엔 주 작업(subjob.jobid) 별로 가장 최근에 작업한 하위작업(subjob.id) 내역만을 조회하고 싶은 것이었네요. 그런데 불필요한 조인을 한번 더하기도 하고 하위작업(subjob)테이블의 건수가 300만여 건이 넘다 보니 좋은 성능을 내기는 어려워 보입니다. 일단 실행계획을 살펴보겠습니다.


| id  | select_type | table      | type   | possible_keys                              | key        | key_len | ref               | rows   | Extra                    |
| --- | ----------- | ---------- | ------ | ------------------------------------------ | ---------- | ------- | ----------------- | ------ | ------------------------ |
| 1   | PRIMARY     | job        | ref    | PRIMARY,idx_job_01                         | idx_job_01 | 11      | const             | 104    | Using index condition    |
| 1   | PRIMARY     | subJob     | ref    | PRIMARY,jobId,idx_subjob_01,idx_subjob_02  | jobId      | 5       | frozen.job.id     | 1      | Using where              |
| 1   | PRIMARY     | <derived2> | ref    | key0                                       | key0       | 5       | frozen.subJob.id  |10     |                          |
| 2   | DERIVED     | subJob     | index  | (NULL)                                     | jobId      | 5       | (NULL)            | 3049799| Using index              |



**※ 실행계획 설명**

| 단계 | 설명 |
|---|---|
| 1 | job 테이블을 스캔하여 job.status 가 'P' 인 행을 스캔합니다. (job.status = 'P') |
| 2 | 단계1의 결과셋과 subjob을 조인합니다.<br>- 단계1의 job.id 값을 상수화 시켜 subjob.jobId 에 대입하며 전달합니다. 스토리지 엔진 영역으로 푸시되는 조건입니다. (access predicate)<br>- 단계1의 job.step 값을 상수값으로 전달받아 subJob.type 에 대입하며 전달합니다. MySQL 엔진 영역으로 필터링 되는 조건입니다. (filter predicate) |
| 3 | A 뷰를 구체화합니다. 전체 하위작업을 주작업으로 집계합니다. 주작업별(GROUP BY jobId) 가장 최근의 하위작업(MAX(subJob.id))을 계산하여 임시테이블을 생성합니다. |
| 4 | 단계1,2로 만들어진 결과셋과 A뷰를 조인합니다. (드라이빙 테이블 : 1,2 결과셋, 드리븐 테이블 : A뷰) |


병목 지점은 rows 수치가 압도적으로 높은 id 2 구간 입니다. DERIVED 의 결과 집합을 임시테이블에 적재하기 위해 3백여만건의 레코드를 읽어들여야 하고 조인을 위한 인덱스 생성(derived2 key0) 작업이 필요합니다. 이 과정에서 부하가 발생합니다.

핸들러 API를 조회해보면 아래와 같이 스캔이 과다하게 발생되는 것을 확인할 수 있습니다.

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
Handler_tmp_write         1343096  <-- Derived 테이블 생성으로 인한 발생
```

<br/>

### 😸 문제 해결
---

하위작업(subjob) 테이블을 두번 조회하는 이유가 주 작업(subjob.jobid) 별로 가장 최근에 작업한 하위작업(subjob.id) 내역만을 조회하겠다는 것이므로 이에 맞춰서 쿼리를 재작성 하였습니다. 이를 위해 [Window Function](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html) 중 ROW_NUMBER() 를 사용하였습니다. 변경쿼리는 아래와 같습니다.


```sql
SELECT 컬럼....
	subJob.updatedAt AS sj_updatedAt
FROM job
INNER JOIN (
              SELECT jobId, type, 컬럼....
                    , ROW_NUMBER() OVER (PARTITION BY jobId ORDER BY id DESC) AS rn
              FROM subJob
            ) subJob
    ON job.id = subJob.jobId 
    AND job.step = subJob.type
WHERE subJob.rn = 1
AND job.status = 'P'
AND subJob.status = 'S';	
```


```ROW_NUMBER()``` 함수는 각 행마다 숫자를 매기는 함수입니다. 추가로 ```OVER (PARTITION BY jobId ORDER BY id DESC)``` 라고 작성하여 각 파티션(subjob.jobId)의 행들마다 subjob.id 컬럼의 내림차 순 기준으로 숫자를 할당하는 'rn' 이라는 명칭의 컬럼을 만들어줍니다. 그리고 인라인뷰 바깥에서 WHERE subJob.rn = 1 처리로 필터합니다. 이러면 조인을 두번하는 연산은 사라집니다. 실행계획을 살펴보도록 하겠습니다.


| id   | select_type     | table       | type   | possible_keys      | key         | key_len | ref                              | rows | Extra                  |
|------|-----------------|-------------|--------|--------------------|-------------|---------|-----------------------------------|------|------------------------|
| 1    | PRIMARY         | job         | ref    | PRIMARY,idx_job_01  | idx_job_01  | 11      | const                            | 116  | Using index condition   |
| 1    | PRIMARY         | <derived2>  | ref    | key0               | key0        | 158     | frozen.job.id,frozen.job.step    | 2    | Using where             |
| 2    | LATERAL DERIVED | subJob      | ref    | jobId,idx_subjob_01 | jobId       | 5       | frozen.job.id                    | 1    | Using temporary         |

**※ 실행계획 설명**

| 단계 | 설명 |
|---|---|
| 1 | job 테이블을 스캔하여 job.status 가 'P' 인 행을 스캔합니다. (job.status = 'P') |
| 2 | A 뷰를 구체화합니다. ***주작업의 상태가 'P'에 해당하는 하위작업만을 집계합니다.*** 주작업별(GROUP BY jobId) 가장 최근의 하위작업(MAX(subJob.id))을 계산하여 임시테이블을 생성합니다. |
| 3 | 단계1로 만들어진 결과셋과 A뷰를 조인합니다. (드라이빙 테이블 : 1 결과셋, 드리븐 테이블 : A뷰) |


핸들러 API 수치도 확인해봅니다.

```
Variable_name             Value    
------------------------  ---------
Handler_read_first        0        
Handler_read_key          9      
Handler_read_last         0        
Handler_read_next         27
Handler_read_prev         0        
Handler_read_retry        0        
Handler_read_rnd          60      
Handler_read_rnd_deleted  0        
Handler_read_rnd_next     19
Handler_tmp_write		      30  <-- Derived 테이블 생성으로 인한 발생
Handler_tmp_update        15  <-- Derived 테이블 생성으로 인한 발생
```

뭐지? 아주 극적인 성능 개선입니다. 이전과 Handler의 호출 수를 비교했을 때 급격히 낮아졌고 응답시간도 10ms 이내입니다. 
성능이 개선되었으니 바로 이슈를 종료하려 했으나 뭔가 미심쩍었습니다. 
단순히 테이블 조인하나 빼려고 한건데 이정도의 개선이 맞는건가 싶었죠.(잘되도 의심하는 나란 녀석...😂)

그 때 눈에 잘 익지 않던 select_type 보입니다. 바로 id = 2 의 "LATERAL DERIVED" 라는 항목인데요. 그냥 넘어가면 안되겠다는 느낌이 바로 들어 어떤 동작인지 살펴보았습니다.
[MariaDB 의 공식문서](https://mariadb.com/kb/en/lateral-derived-optimization/)를 찾아봅니다.
확인해본 결과 "LATERAL DERIVED" 최적화는 아래와 같은 상황일 때 동작합니다.

>- The query uses a derived table (or a VIEW, or a non-recursive CTE)
>- The derived table/View/CTE has a GROUP BY operation as its top-level operation
>- The query only needs data from a few GROUP BY groups

번역하자면 아래와 같습니다.

>- Derived Table(인라인 뷰형태 혹은 비재귀 호출 형태의 WITH 절 테이블)을 사용하고, 
>- 인라인뷰의 최상위 레벨의 쓰임이 GROUP BY 연산을 사용할 경우,
>- 몇개의 GROUP BY 그룹의 데이터만 필요할 때 

예를 들어 다음과 같은 쿼리가 있다고 가정합니다.

```sql
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


MariaDB 5.3, MySQL 5.6 이전에는 위의 쿼리는 다음과 같은 실행계획으로 최적화 되었습니다.


| id   | select_type | table      | type  | possible_keys | key       | key_len | ref                       | rows  | Extra                    |
|------|-------------|------------|-------|---------------|-----------|---------|---------------------------|-------|--------------------------|
| 1    | PRIMARY     | customer   | range | PRIMARY,name  | name      | 103     | NULL                      | 2     | Using where; Using index |
| 1    | PRIMARY     | <derived2> | ref   | key0          | key0      | 4       | test.customer.customer_id | 36    |                          |
| 2    | DERIVED     | orders     | index | NULL          | o_cust_id | 4       | NULL                      | 36738 | Using where              |

**※ 실행계획 설명**

| 단계 | 설명 |
|---|---|
| 1 | customer_name 이 'Customer#1', 'Customer#2' 값을 찾습니다. |
| 2 | OCT_TOTALS 뷰를 구체화합니다. 모든 고객에 대한 OCT_TOTALS를 계산하여 임시테이블을 생성합니다. |
| 3 | 고객 테이블과 조인합니다. |

위의 id = 2번 단계에서 모든 고객에 대한 합계를 계산하는 작업은 상당히 비효율적입니다. 왜냐하면 사실 고객 2명("Customer#1", "Customer#2")의 합산 결과만 알면 되기 때문입니다. Derived Table(인라인뷰) 바깥의 WHERE 절로 인해 결국엔 고객 2명을 제외한 행들은 필터링 되니까요. 하지만 Derived Table 바깥에 해당하는 필터조건을 인라인뷰는 알 수 없기 때문에 불필요한 많은 연산 작업을 동반하게 됩니다.(고객테이블의 건수가 많으면 많을 수록 성능 부하는 심해집니다.)

"LATERAL DERIVED" 최적화는 위와 같은 문제를 해결하기 위해 Derived Table 바깥에 있는 조인조건인 ```ON customer.customer_id = OCT_TOTALS.customer_id``` 절을 Derived Table 내부에 푸쉬함으로써 연산 대상이 되는 행 범위를 극적으로 감소시킬 수 있습니다.
"LATERAL DERIVED" 최적화가 이루어지면 실행계획은 아래와 같이 변경됩니다.

| id   | select_type     | table      | type  | possible_keys | key       | key_len | ref                       | rows | Extra                    |
|------|-----------------|------------|-------|---------------|-----------|---------|---------------------------|------|--------------------------|
| 1    | PRIMARY         | customer   | range | PRIMARY,name  | name      | 103     | NULL                      | 2    | Using where; Using index |
| 1    | PRIMARY         | <derived2> | ref   | key0          | key0      | 4       | test.customer.customer_id | 2    |                          |
| 2    | LATERAL DERIVED | orders     | ref   | o_cust_id     | o_cust_id | 4       | test.customer.customer_id | 1    | Using where              |

**※ 실행계획 설명**

| 단계 | 설명 |
|---|---|
| 1 | 고객 테이블을 스캔하여 'Customer#1', 'Customer#2'에 대한 customer_id를 찾습니다. |
| 2 | OCT_TOTALS 뷰를 구체화합니다. 'Customer#1', 'Customer#2' 고객에 대한 OCT_TOTALS를 계산하여 임시테이블을 생성합니다. |
| 3 | 고객 테이블과 조인합니다. |


주목해야할 점은 id = 2 에 "LATERAL DERIVED"로 표기된점과 ref 값에 test.customer.customer_id 가 들어온 점입니다. 일반적인 DERIVED TABLE에서는 ref 값은 NULL 입니다.
즉, DERIVED TABLE을 만들 때 2명의 고객('Customer#1', 'Customer#2')에 대한 customer_id가 푸시되면서 집계 처리범위를 감소시킨 것입니다.

<br/>

### 😸 사용시 주의점
---

그런데 의문점이 생겼습니다. 왜 기존 쿼리는 LATERAL DERIVED 최적화가 이루어지지 않았던 것일까요? 똑같이 인라인뷰에 집계함수를 적용한 것인데 말이죠.
WINDOW 함수를 이용해 쿼리 형태를 바꾼 것과 어떤 차이가 있길래 최적화 방식이 달라진 것인지 궁금해졌습니다.


#### 기존쿼리

```sql
SELECT 컬럼....
FROM `job` INNER JOIN subJob 
    ON job.id = subJob.jobId 
    AND job.step = subJob.type 
INNER JOIN (SELECT jobId, MAX(id) AS LatestId 
            FROM subJob 
            GROUP BY jobId) A 
    ON subJob.id = A.LatestId 
WHERE (job.status = 'P' AND subJob.status = 'S');
```

#### 변경쿼리

```sql
SELECT 컬럼....
	subJob.updatedAt AS sj_updatedAt
FROM job
INNER JOIN (
              SELECT jobId, type, 컬럼....
                    , ROW_NUMBER() OVER (PARTITION BY jobId ORDER BY id DESC) AS rn
              FROM subJob
            ) subJob
    ON job.id = subJob.jobId 
    AND job.step = subJob.type
WHERE subJob.rn = 1
AND job.status = 'P'
AND subJob.status = 'S';	
```


테스트를 해본 결과 조인조건에 해당하는 컬럼이 DERIVED 테이블 내에서 가공된 컬럼에 해당한다면 LATERAL DERIVED 는 적용되지 않습니다.
기존쿼리의 경우 바깥 결과셋과 조인시 필요한 컬럼인 LatestId 값은 MAX() 집계함수에 의해 가공된 값이므로 LATERAL DERIVED 를 적용받지 못합니다.

개선한 쿼리에도 바깥 결과셋과 조인시 필요한 컬럼인 jobId 값을 가공한다면 LATERAL DERIVED 최적화는 불가능합니다.
예를들면 아래와 같은 형태의 가공입니다.

#### Lateral Derived 불가 쿼리 예시

```sql
SELECT 컬럼....
	subJob.updatedAt AS sj_updatedAt
FROM job
INNER JOIN (
              SELECT jobId * 1 as 'jobId' -- jobId 에 *1 가공
                    , type, 컬럼....
                    , ROW_NUMBER() OVER (PARTITION BY jobId ORDER BY id DESC) AS rn
              FROM subJob
            ) subJob
    ON job.id = subJob.jobId 
    AND job.step = subJob.type
WHERE subJob.rn = 1
AND job.status = 'P'
AND subJob.status = 'S';	
```

조인컬럼이 되는 jobId 에 1을 곱하는 연산을 작성하고 실행계획을 봅니다.


| id   | select_type     | table       | type   | possible_keys      | key         | key_len | ref                              | rows | Extra                  |
|------|-----------------|-------------|--------|--------------------|-------------|---------|-----------------------------------|------|------------------------|
| 1    | PRIMARY         | job         | ref    | PRIMARY,idx_job_01  | idx_job_01  | 11      | const                            | 4  | Using index condition   |
| 1    | PRIMARY         | <derived2>  | ref    | key0               | key0        | 158     | frozen.job.id,frozen.job.step    | 10    | Using where             |
| 2    | DERIVED | subJob      | ALL    | (NULL) | (NULL)       | (NULL)       | (NULL)                    | 3049555    | Using temporary         |


실행계획을 보면 DERIVED 로 변경되었습니다. 그리고 ref 의 값도 NULL 이 되었죠. 참고로 쿼리 실행속도는 기존 속도보다 훨씬더 느려집니다ㅋㅋㅋ
(WINDOW 함수를 썼기 때문에 인라인뷰의 결과 집합은 subjob의 전체 테이블 건수가 되니 그만큼 조인시 스캔해야할 행이 많아집니다.)


#### Lateral Derived 의 제어

LATERAL DERIVED 최적화는 optimizer_switch 에서도 제어가 가능합니다. split_materialized 을 on / off 시키면 되고 
기본적으로는 on 으로 설정되어 있습니다. 개인적으로는 인라인뷰의 성능 이슈를 해결하기 위한 좋은 방안이 될 수 있기 때문에
해당 옵션은 켜주는 게 맞다고 보고 있습니다.


- LATERAL DERIVED 끄기

```sql
set optimizer_switch='split_materialized=off'
```

- LATERAL DERIVED 켜기

```sql
set optimizer_switch='split_materialized=off'
```

### 👉 MySQL의 Lateral Derived 설정

MySQL 8.0 에서도 Lateral Derived 테이블 설정이 가능합니다. 다만 문법이 약간 달라서 기재를 해둡니다.
혹시나 MySQL / MariaDB 간 전환 작업이 필요할 경우를 대비해야할 것 같습니다.

[MySQL 8.0 의 Lateral Derived Tables 와 관련된 공식문서](https://dev.mysql.com/doc/refman/8.0/en/lateral-derived-tables.html) 의 쿼리 예시를 가져와봅니다.

```sql
SELECT
  salesperson.name,
  max_sale.amount,
  max_sale_customer.customer_name
FROM
  salesperson,
  -- calculate maximum size, cache it in transient derived table max_sale
  LATERAL
  (SELECT MAX(amount) AS amount
    FROM all_sales
    WHERE all_sales.salesperson_id = salesperson.id)
  AS max_sale,
  -- find customer, reusing cached maximum size
  LATERAL
  (SELECT customer_name
    FROM all_sales
    WHERE all_sales.salesperson_id = salesperson.id
    AND all_sales.amount =
        -- the cached maximum size
        max_sale.amount)
  AS max_sale_customer;
```

인라인뷰 앞에 LATERAL 이라는 문구를 표기하고 조인조건에 해당하는 절을 인라인뷰 내부에 선언해주는 형식입니다.
특별히 어렵진 않으나 MySQL / MariaDB 간 문법이 상이하다는 점만 숙지해두면 좋을 것 같습니다.
분량이 생각보다 길어진 것 같은데 이만 글을 줄이도록 하겠습니다. 감사합니다.


### 📚 참고자료

- [Lateral Derived Optimization (클릭)](https://mariadb.com/kb/en/lateral-derived-optimization/)
- [Lateral Derived Tables (클릭)](https://dev.mysql.com/doc/refman/8.0/en/lateral-derived-tables.html) 


{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}