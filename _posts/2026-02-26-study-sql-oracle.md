---
layout: post
title: "Oracle SQL: 윈도우 함수(Window Functions) 완벽 가이드"
date: 2026-02-26 10:04:43 +0900
categories: [sql]
tags: [study, sql, oracle, database, automation]
---

## 왜 윈도우 함수가 중요한가?

실무에서 데이터 분석 요청이 들어올 때 윈도우 함수는 필수 도구입니다.

복잡한 GROUP BY 없이도 행 단위의 컨텍스트를 유지하면서 집계 계산을 할 수 있어서 성능이 뛰어납니다. 특히 매출 순위, 누적합, 이전 달과의 비교 같은 분석 쿼리에서 코드 가독성과 실행 속도를 동시에 확보할 수 있습니다.

## 핵심 개념

- **윈도우 함수의 구조**
  함수명() OVER (PARTITION BY 컬럼 ORDER BY 컬럼 ROWS/RANGE 범위) 형태로 작성됩니다.

- **PARTITION BY 절**
  데이터를 그룹으로 나누는 역할을 합니다. GROUP BY와 달리 행을 축소하지 않습니다.

- **ORDER BY 절**
  각 파티션 내에서 정렬 순서를 정의합니다. 순위 함수나 누적 계산에 필수입니다.

- **행 범위 지정 (ROWS/RANGE)**
  현재 행 기준으로 이전/이후 행들을 포함할 범위를 설정합니다.

- **주요 함수 분류**
  순위 함수(ROW_NUMBER, RANK, DENSE_RANK), 집계 함수(SUM, AVG, COUNT), 분석 함수(LAG, LEAD, FIRST_VALUE, LAST_VALUE)가 있습니다.

## 실습 예제

### 1단계: 기본 순위 함수

```sql
SELECT
  employee_id,
  salary,
  department_id,
  ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank_in_dept,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank_with_tie,
  DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dense_rank
FROM employees
WHERE department_id IN (10, 20, 30);
```

이 쿼리는 각 부서별로 급여 순위를 매깁니다. ROW_NUMBER는 동일 값도 다른 순위를 부여하고, RANK는 동일 값에 같은 순위를 부여합니다.

### 2단계: 누적 합계 계산

```sql
SELECT
  order_date,
  amount,
  SUM(amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sum,
  AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3
FROM sales
ORDER BY order_date;
```

ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW는 처음부터 현재 행까지의 누적값을 계산합니다. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW는 3행(현재 포함) 이동평균을 구합니다.

### 3단계: 이전/다음 행 값 비교

```sql
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
  LEAD(revenue) OVER (ORDER BY month) AS next_month_revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS month_over_month_change
FROM monthly_sales
ORDER BY month;
```

LAG는 이전 행의 값을, LEAD는 다음 행의 값을 가져옵니다. 이를 이용해 전월 대비 변화를 쉽게 계산할 수 있습니다.

## 자주 하는 실수

- **PARTITION BY 없이 ORDER BY만 사용**
  전체 데이터를 하나의 윈도우로 취급하게 됩니다. 부서별 순위가 필요하면 반드시 PARTITION BY를 추가하세요.

- **ROWS 범위를 명시하지 않음**
  ORDER BY만 있으면 기본값이 UNBOUNDED PRECEDING AND CURRENT ROW가 되어 누적값처럼 동작합니다. 원하는 범위를 명확히 지정하세요.

- **NULL 값 처리 무시**
  LAG/LEAD에서 NULL이 반환될 수 있습니다. COALESCE나 NULLS FIRST/LAST를 활용해 처리하세요.

- **윈도우 함수를 WHERE 절에서 사용**
  윈도우 함수는 SELECT 절에서만 사용 가능합니다. 필터링이 필요하면 서브쿼리나 WITH 절을 사용하세요.

- **성능 고려 없이 복잡한 윈도우 정의**
  여러 개의 다른 PARTITION BY를 가진 윈도우 함수를 같은 쿼리에 섞으면 성능이 저하됩니다. 필요시 임시 테이블이나 CTE로 분리하세요.

## 오늘의 실습 체크리스트

- [ ] ROW_NUMBER, RANK, DENSE_RANK의 차이점을 직접 쿼리로 확인하기
- [ ] 자신의 업무 데이터로 부서별/카테고리별 순위 쿼리 작성하기
- [ ] 누적 합계와 이동평균을 계산하는 쿼리 작성하기
- [ ] LAG/LEAD를 사용해 전월 대비 변화율 계산하기
- [ ] 서브쿼리 없이 윈도우 함수로만 상위 3개 항목 필터링하기 (RANK 활용)
- [ ] PARTITION BY 없는 경우와 있는 경우 결과 비교하기
- [ ] 실행 계획(EXPLAIN PLAN)으로 윈도우 함수 성능 확인하기
