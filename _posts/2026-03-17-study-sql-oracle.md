---
layout: post
title: "Oracle SQL: 윈도우 함수(Window Functions) 마스터하기"
date: 2026-03-17 10:07:47 +0900
categories: [sql]
tags: [study, sql, oracle, database, automation]
---

## 실무에서 왜 중요한가?

윈도우 함수는 대규모 데이터 분석에서 필수적입니다. 복잡한 자체 조인(self-join)이나 서브쿼리 없이 행 간 비교, 누적값, 순위 계산을 한 번에 처리할 수 있습니다.

특히 매출 분석, 사용자 행동 추적, 시계열 데이터 처리에서 성능 차이가 극적입니다.

## 핵심 개념

- **OVER 절의 역할**
  윈도우 함수의 작동 범위를 정의합니다. PARTITION BY로 그룹을 나누고 ORDER BY로 정렬 순서를 지정합니다.

- **ROW_NUMBER vs RANK vs DENSE_RANK**
  ROW_NUMBER는 중복 없이 순번을 매기고, RANK는 동점에 같은 순위를 부여하며 건너뜁니다. DENSE_RANK는 동점 후에도 순위를 건너뛰지 않습니다.

- **LAG와 LEAD 함수**
  이전 행의 값(LAG)이나 다음 행의 값(LEAD)에 접근합니다. 전월 대비 증감률 계산에 유용합니다.

- **SUM OVER와 누적값**
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW를 사용하여 누적합을 계산합니다.

- **FIRST_VALUE와 LAST_VALUE**
  파티션 내 첫 번째 또는 마지막 값을 가져옵니다. 기준값 대비 비교 분석에 활용됩니다.

## 실습 예제

### 예제 1: 월별 매출과 누적 매출

```sql
SELECT
    EXTRACT(YEAR_MONTH FROM order_date) AS month,
    SUM(amount) AS monthly_sales,
    SUM(SUM(amount)) OVER (
        ORDER BY EXTRACT(YEAR_MONTH FROM order_date)
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_sales
FROM orders
GROUP BY EXTRACT(YEAR_MONTH FROM order_date)
ORDER BY month;
```

이 쿼리는 각 월의 매출과 함께 누적 매출을 한 번에 계산합니다.

### 예제 2: 부서별 급여 순위와 전월 대비 변화

```sql
SELECT
    employee_id,
    department_id,
    salary,
    RANK() OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS dept_salary_rank,
    LAG(salary, 1) OVER (
        PARTITION BY department_id
        ORDER BY hire_date
    ) AS previous_salary,
    salary - LAG(salary, 1) OVER (
        PARTITION BY department_id
        ORDER BY hire_date
    ) AS salary_change
FROM employees
ORDER BY department_id, dept_salary_rank;
```

부서 내 급여 순위와 입사 순서 기준 이전 직원의 급여를 함께 조회합니다.

### 예제 3: 고객별 첫 주문 대비 현재 주문 비교

```sql
SELECT
    customer_id,
    order_date,
    amount,
    FIRST_VALUE(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS first_order_amount,
    ROUND(
        (amount - FIRST_VALUE(amount) OVER (
            PARTITION BY customer_id
            ORDER BY order_date
        )) / FIRST_VALUE(amount) OVER (
            PARTITION BY customer_id
            ORDER BY order_date
        ) * 100, 2
    ) AS growth_percent
FROM orders
ORDER BY customer_id, order_date;
```

각 고객의 첫 주문 금액 대비 현재 주문의 성장률을 계산합니다.

## 자주 하는 실수

- **PARTITION BY 없이 OVER() 사용**
  전체 결과 집합을 하나의 윈도우로 취급합니다. 부서별 순위가 필요하면 반드시 PARTITION BY department_id를 추가하세요.

- **ORDER BY 생략**
  윈도우 함수의 동작이 예측 불가능해집니다. RANK나 ROW_NUMBER는 ORDER BY가 필수입니다.

- **ROWS 범위 설정 오류**
  ROWS BETWEEN을 명시하지 않으면 기본값이 UNBOUNDED PRECEDING AND CURRENT ROW입니다. 전체 누적이 필요하면 UNBOUNDED FOLLOWING을 추가하세요.

- **GROUP BY와 윈도우 함수 혼용 시 주의**
  집계 함수와 윈도우 함수를 함께 사용할 때 SELECT 절의 모든 열이 GROUP BY에 포함되어야 합니다.

- **성능 고려 부족**
  큰 테이블에서 PARTITION BY 열에 인덱스가 없으면 성능이 급격히 저하됩니다. 실행 계획을 확인하세요.

## 오늘의 실습 체크리스트

- [ ] ROW_NUMBER, RANK, DENSE_RANK의 차이를 직접 실행해서 확인
- [ ] 자신의 프로젝트 데이터로 LAG/LEAD 함수 작성
- [ ] 누적합 쿼리를 작성하고 결과 검증
- [ ] FIRST_VALUE와 LAST_VALUE를 조합한 쿼리 작성
- [ ] 실행 계획(EXPLAIN PLAN)을 확인하고 인덱스 전략 검토
- [ ] 복잡한 윈도우 함수 쿼리를 주석과 함께 문서화
