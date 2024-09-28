---
title: "[MySQL] Outer Join 성능 개선"
excerpt: "MySQL 8.0.37 과 MariaDB 10.6.15 버전에서 Outer Join 사용시 유의 사항을 공유합니다. 조인조건이 멀티 컬럼일 때 Composite Column Index로 최적화 할 수 없습니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-15
last_modified_at: 2024-09-15
comments: true
---

### ⚠️Outer Join 시 발생하는 성능 문제
---
Outer Join 사용 시 조인 절에 해당하는 ON 절이 멀티 컬럼으로 구성되어 있을 경우, 조인컬럼에 대한 복합 컬럼 인덱스를 구성하더라도 조인해야할 레코드의 처리 범위를 단일 컬럼으로만 줄이는 문제가 있습니다. 즉, Access Predicate 로 멀티 컬럼이 모두 반영이 되어야 하는데 단일 컬럼만 반영되고 Access Predicate 로 반영되지 못한 다른 컬럼들은 Filter Predicate 로 처리되어 비효율적인 인덱스 스캔, Random Access 가 발생하는 현상입니다. 다른 DBMS 에서는 나타나지 않는 현상인데 MySQL 엔진에서 발생합니다. MySQL 8.0.37 버전과 MariaDB 10.6.15 버전에서 여전히 문제가 나타납니다.

#### 1) 문제 현상

드라이빙 테이블이 department 가 유리한 상황에서 후행테이블의 Access Predicate 를 고려하여 employees 테이블에 (department_id, hire_date) 순의 복합 컬럼 인덱스를 만들어도 department_id 컬럼을 기준으로만 레코드를 조인하고 hire_date 는 Filter 처리되어 비효율적인 인덱스 범위 스캔 및 랜덤엑세스가 발생합니다.(위의 LEFT JOIN 을 INNER JOIN 으로 변경하면 employess 테이블의 Access Predicate 를 department_id, hire_date 기준으로 삼아 처리범위를 감소시킵니다.)

문제쿼리 예시

```sql
  SELECT d.name
        ,e.id
        ,e.name
        ,e.birth
  FROM department d 
  LEFT JOIN employees e
  ON d.id = e.department_id 
    AND e.hire_date <= DATE_SUB(DATE_FORMAT(NOW(),'%Y-%M-%D'),INVERVAL 5 YEAR)
  ;    
  
```

Outer Join의 성능 비효율로 인하여 위 쿼리의 데이터 스캔범위는 아래 그림에서 빗금 영역 전체가 됩니다. 이 중 버려지는 데이터는 "ON d.id = e.department_id 범위(employees 기준 차집합 영역의 빗금범위)" 이 됩니다.

!["데이터스캔범위"](https://github.com/user-attachments/assets/93fc58f7-0785-499d-b98c-3bd77ef7ac2c "데이터스캔범위1")


<br/>

### 😸해결방안
---
Filter 처리되는 범위가 많아 문제가 발생하는 경우 Outer Join을 쓰지않는 방법으로 성능 문제를 해결해야만 합니다. 다양한 방법 중 다음과 같은 방법으로 문제를 해결할 수 있습니다.

#### 테이블 반정규화

정규화된 테이블을 다시 합쳐서 Outer Join 의 쓰임을 제거합니다. 단, 해당 방법은 다른 API 의 쿼리도 수정해야하는 부담이 있기 때문에 초기 프로젝트 진행 시 테이블 설계 단계에서 적용 검토 합니다.
    
#### 쿼리 재작성 - Outer Join 제거, Inner Join + Not exists UNION ALL
Outer Join 대신 Inner Join, Not exsists 절의 UNION ALL 조합으로 쿼리 재작성 합니다.
테이블 구조 변경 없이 가능한 방법입니다. 단, NOT EXISTS 절의 성능을 고려해야합니다. 안티 세미조인 패턴을 데이터 분포도에 따라서 DEPENDANT SUBQUERY로 풀어내는 것이 유리할 수 있습니다. 이 경우 NO_SEMIJOIN 힌트를 써야할 수 있습니다. JPA를 통해 실행되는 쿼리라면 커스텀이 필요한 단점이 있습니다.

개선쿼리 예시

```
SELECT d.name
      ,e.id
      ,e.name
      ,e.birth
FROM department d 
INNER JOIN employees e
ON d.id = e.department_id 
   AND e.hire_date <= DATE_SUB(DATE_FORMAT(NOW(),'%Y-%M-%D'),INVERVAL 5 YEAR)
UNION ALL
SELECT d.name
      ,NULL as 'id'
      ,NULL as 'employee_name'
      ,NULL as 'birth'      
FROM department d
WHERE NOT EXISTS (
  SELECT 1
  FROM employees e
  WHERE d.id = e.department_id 
   AND e.hire_date <= DATE_SUB(DATE_FORMAT(NOW(),'%Y-%M-%D'),INVERVAL 5 YEAR)
)
;
```

문제되었던 쿼리를 위 처럼 변경하면 데이터 스캔범위는 아래그림의 빗금 영역 전체에 해당하게 됩니다. employees 레코드에 filter predicate 로 인한 작업이 없어지기 때문에 불필요한 스캔범위가 없어집니다.

![image](https://github.com/user-attachments/assets/3966fc6d-5962-4518-855c-2ea0f22ccc63)


부연 설명을 하자면 department 테이블과 employees 테이블의 교집합과 department 테이블 기준 차집합을 각각 추출한 후 결합하여 데이터를 리턴하는 것입니다. 후행테이블인 employees 에 INNER JOIN 으로 접근시 department_id, hire_date 가 MySQL 기능인 ICP(Index Condition Pushdown)로 인해 access predicate 로 설정되어 불필요한 데이터 스캔범위 없이 교집합을 추출해낼 수 있고 department 테이블의 차집합은 department 테이블의 데이터 건수가 작을 경우에는 dependant subquery로 풀어내고 , 반대의 경우에는 semi join으로 풀어 불필요한 데이터 스캔범위를 줄일 수 있습니다.

<br/>

### 🚀개선사례
---
실제로 아래와 같은 쿼리에서 문제 현상을 겪었습니다. JPA를 통해 Generated 된 쿼리입니다.

```sql
SELECT col1, col2, col3, col4 ...
FROM   `obs_group` `bsGroup`
       LEFT JOIN `obs` `scd`
              ON `scd`.`group_id` = `bsGroup`.`id`
                 AND ( `scd`.`start_date` <= NOW()
                       AND `scd`.`end_date` >= NOW()
                       AND `scd`.`status` = 'active' )
WHERE  `bsGroup`.`name` IN ( '******' )
       AND `bsGroup`.`status` = '******'
ORDER  BY `bsGroup`.`update_ts` DESC,
          `scd`.`slot` ASC ;
```

아래는 실행계획입니다.

| id | select_type | table | type | possible_keys | key | key_len | ref | rows | filtered | Extra |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | SIMPLE | bsGroup | ref | idx_obs_group_01 | idx_obs_group_01 | 366 | const,const | 1 | Using index condition; Using temporary; Using filesort |
| 1 | SIMPLE | scd | ref | idx_obs_03,idx_obs_05,idx_obs_06 | idx_obs_06 | 188 | cms_operation.bsGroup.id,const | 1664 | Using where |

드라이빙 테이블로 bsGroup 이 선정되었고 `name`,`status` 로 구성된 idx_obs_group_01 인덱스를 탑니다. 그리고 scd 테이블에 조인 접근 시 `group_id`,`status`,`end_date` 로 구성된 idx_obs_06 인덱스에 접근합니다. 실행계획에 출력되는 1664 라는 값은 추정치이므로 정확한 값을 보려면 핸들러 API 호출 수를 확인해보아야 합니다.

핸들러 API 호출수를 확인해 보았을 때 해당 쿼리의 레코드 호출비용은 아래와 같았습니다.

```
Variable_name             Value   
------------------------  --------
Handler_read_first        0       
Handler_read_key          2       
Handler_read_last         0       
Handler_read_next         70249   
Handler_read_prev         0           
Handler_read_rnd          1           
Handler_read_rnd_next     2       

```
위의 수치에서 주목해야할 항목은 Handler_read_next 입니다. Hander_read_next는 인덱스 리프페이지에 접근후 검사된 레코드 행의 수를 의미합니다. 즉, Index Range Scan 으로 검사한 행의 수를 말하는 것입니다. Index Range Scan 으로 읽어들인 행의 수가 약 7만개입니다. 그러나 실제로 리턴한 결과는 2건 뿐이었습니다. 버려지는 비용이 많았습니다.
이는 scd 테이블에 group_id 단일 컬럼을 인덱스로 생성한 후 조인한 레코드 비용과 일치합니다. 다시 말해서 group_id, status, end_date 세개의 컬럼 조건으로 처리범위를 감소시키지 못했음을 의미합니다.


위와 같은 현상을 없애기 위해 아래와 같은 형태로 쿼리를 변경하겠습니다. Outer Join은 교집합과 차집합의 결합으로 변경할 수 있습니다. 따라서 아래와 같이 Inner Join + Not Exists 의 결합으로 대체할 수 있습니다.

```sql
SELECT bsInfo.*
FROM (
	SELECT
	`bsGroup`.`col1`,
	`bsGroup`.`col2`,
	`bsGroup`.`col3`,
	`bsGroup`.`col4`,
	`scd`.`col11`,
	`scd`.`col12`
	FROM   `obs_group` `bsGroup`
	       INNER JOIN `obs` `scd` 
		      ON (`scd`.`group_id` = `bsGroup`.`id`
		      AND  `scd`.`start_date` <= NOW()
		      AND `scd`.`end_date` >= NOW()
		      AND `scd`.`status` = 'active')
	WHERE  1=1
	      AND `bsGroup`.`name` IN ( '******' )
	       AND `bsGroup`.`status` = '******'
	UNION ALL
	SELECT
	`bsGroup`.`col1`,
	`bsGroup`.`col2`,
	`bsGroup`.`col3`,
	`bsGroup`.`col4`,
	NULL as 'col11',
  NULL as 'col12'
	FROM `obs_group` `bsGroup`
	WHERE 1=1
	AND `bsGroup`.`name` IN ( '******')
	AND `bsGroup`.`status` = '******'
	AND NOT EXISTS (
	    SELECT 1
	    FROM `obs` `scd` 
	    WHERE `scd`.`group_id` = `bsGroup`.`id`
	    AND `scd`.`start_date` <= NOW()
	    AND `scd`.`end_date` >= NOW()
	    AND `scd`.`status` = 'active'
	)
) bsInfo
ORDER  BY `bsInfo`.`update_ts` DESC,
`bsInfo`.`slot` ASC ;
```


쿼리 형태를 변경한 쿼리 실행계획은 아래와 같습니다.

| id | select_type | table | type | possible_keys | key | key_len | ref | rows | filtered | Extra |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | PRIMARY | <derived2> | ALL | (NULL) | (NULL) | (NULL) | (NULL) | 1665 | 100.00 | Using filesort |
| 2 | DERIVED | bsGroup | ref | PRIMARY,idx_obs_group_02,idx_obs_group_01 | idx_obs_group_01 | 366 | const,const | 1 | 100.00 | Using index condition |
| 2 | DERIVED | scd | ref | idx_obs_03,idx_obs_05,idx_obs_06 | idx_obs_06 | 188 | cms_operation.bsGroup.id,const | 1664 | 100.00 | Using index condition; Using where |
| 3 | UNION | bsGroup | ref | idx_obs_group_01 | idx_obs_group_01 | 366 | const,const | 1 | 100.00 | Using index condition; Using where |
| 4 | DEPENDENT SUBQUERY | scd | index_subquery | idx_obs_03,idx_obs_02,idx_obs_04,idx_obs_05,idx_obs_06 | idx_obs_06 | 188 | func,const | 1664 | 100.00 | Using where |

마찬가지로 드라이빙 테이블로 bsGroup이 선정되었고 `name`,`status` 으로 구성된 idx_obs_group_01 인덱스를 탑니다. 이후에 이전쿼리와 마찬가지로 scd 테이블에 조인 접근하는데 동일하게  `group_id`,`status`,`end_date` 로 구성된 idx_obs_06 인덱스를 탑니다. 이전과 실행계획이 달라진 점이 있다면 scd 접근시 Extra 항목에 Using index condition 항목이 나타났다는 것입니다. 해당 구문은 ICP(Index Condition Pushdown)가 사용되었음을 의미합니다. 즉 조인조건에 해당하는 모든 컬럼이 모두 Storage Engine 영역에서 처리되었음을 의미합니다. 실행계획에 출력되는 1664 라는 값은 추정치이므로 정확한 값을 보려면 핸들러 API 호출 수를 확인해보아야 합니다.

핸들러 API 호출수를 확인해 보았을 때 해당 쿼리의 레코드 호출비용은 아래와 같았습니다.

```
Variable_name             Value   
------------------------  --------
Handler_read_first        0       
Handler_read_key          3       
Handler_read_last         0       
Handler_read_next         2       
Handler_read_prev         0       
Handler_read_rnd          1          
Handler_read_rnd_next     2       
```

이전과 달리 Handler_read_next 의 수치가 극단적으로 감소하였습니다. group_id, status, end_date 세개의 컬럼 조건으로 처리범위를 감소시켰기 때문입니다. 이처럼 데이터분포도에 따라서 Outer Join 성능이 현저하게 차이가 날 수 있기 때문에 해당 현상에 대하여 유의하시고 운영하셨으면 좋겠습니다.


---
{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}