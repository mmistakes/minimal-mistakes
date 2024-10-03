---
title: "[MySQL/MariaDB] ProxySQL 클러스터 구성"
excerpt: "ProxySQL 클러스터 구성 방법을 정리합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-03
last_modified_at: 2024-10-03
comments: true
---

### 💻 ProxySQL 클러스터 배경
--- 
ProxySQL은 MySQL의 트래픽을 분산시키기 위한 목적에서 유용하게 사용되는 고성능 프록시입니다. 데이터베이스에서 리소스를 찾는 클라이언트 요청의 중개자 역할을 하는데요. ProxySQL을 사용하면 다음과 같은 기능들을 사용할 수 있습니다.

- MySQL 방화벽
- 연결 풀링
- 샤드 조회 및 자동 라우팅
- 읽기/쓰기 분할 가능
- 활성 마스터 장애 발생 시 자동으로 다른 마스터로 전환
- 쿼리 캐시
- 성과 지표

ProxySQL을 사용할 경우 어플리케이션과 데이터베이스 사이에 독립적인 구성을 통해


공식 문서나 Percona 문서를 통해 확인
가능하다면 애플리케이션과 동일한 서버에 배포하는 것이 일반적으로 권장됩니다. 이러한 방식은 수백 개의 노드까지 확장 가능하며, 런타임에서 쉽게 재구성할 수 있도록 설계되었습니다. ProxySQL 인스턴스 그룹을 관리하려면 각 호스트를 개별적으로 구성하거나,


<br/>

### ⚠️ 아직 끝나지 않았다. 슬로우쿼리 발생
---
본문

<br/>

### 🙈 문제 쿼리 확인
---

본문

<br/>

### 😸 Derived Table 성능 문제 해결
---

본문


| id   | select_type     | table       | type   | possible_keys      | key         | key_len | ref                              | rows | Extra                  |
|------|-----------------|-------------|--------|--------------------|-------------|---------|-----------------------------------|------|------------------------|
| 1    | PRIMARY         | job         | ref    | PRIMARY,idx_job_01  | idx_job_01  | 11      | const                            | 116  | Using index condition   |
| 1    | PRIMARY         | <derived2>  | ref    | key0               | key0        | 158     | frozen.job.id,frozen.job.step    | 2    | Using where             |
| 2    | LATERAL DERIVED | subJob      | ref    | jobId,idx_subjob_01 | jobId       | 5       | frozen.job.id                    | 1    | Using temporary         |

<br/>

**※ 실행계획 설명**

| 단계 | 설명 |
|---|---|
| 1 | job 테이블을 스캔하여 job.status 가 'P' 인 행을 스캔합니다. (job.status = 'P') |
| 2 | A 뷰를 구체화합니다. ***주작업의 상태가 'P'에 해당하는 하위작업만을 집계합니다.*** 주작업별(GROUP BY jobId) 가장 최근의 하위작업(MAX(subJob.id))을 계산하여 임시테이블을 생성합니다. |
| 3 | 단계1로 만들어진 결과셋과 A뷰를 조인합니다. (드라이빙 테이블 : 1 결과셋, 드리븐 테이블 : A뷰) |

<br/>

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


| id   | select_type | table      | type  | possible_keys | key       | key_len | ref                       | rows  | Extra                    |
|------|-------------|------------|-------|---------------|-----------|---------|---------------------------|-------|--------------------------|
| 1    | PRIMARY     | customer   | range | PRIMARY,name  | name      | 103     | NULL                      | 2     | Using where; Using index |
| 1    | PRIMARY     | <derived2> | ref   | key0          | key0      | 4       | test.customer.customer_id | 36    |                          |
| 2    | DERIVED     | orders     | index | NULL          | o_cust_id | 4       | NULL                      | 36738 | Using where              |

<br/>

### 😸 Lateral Derived 사용시 주의점
---

그런데 의문점이 생겼습니다. 왜 기존 쿼리는 LATERAL DERIVED 최적화가 이루어지지 않았던 것일까요? 똑같이 인라인뷰에 집계함수를 적용한 것인데 말이죠.
WINDOW 함수를 이용해 쿼리 형태를 바꾼 것과 어떤 차이가 있길래 최적화 방식이 달라진 것인지 궁금해졌습니다.

<br/>

**기존쿼리**

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

<br/>

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

<br/>

### 📚 참고자료

- [ProxySQL Cluster](https://proxysql.com/documentation/proxysql-cluster/)
- [Where Do I Put ProxySQL?](https://www.percona.com/blog/where-do-i-put-proxysql/)

<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}