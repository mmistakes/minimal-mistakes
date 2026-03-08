---
layout: post
title: "Oracle SQL 기초: SELECT와 WHERE 절로 데이터 조회하기"
date: 2026-03-08 10:06:37 +0900
categories: [sql]
tags: [study, sql, oracle, database, automation]
---

## 왜 이 주제가 중요한가?

Oracle SQL의 SELECT와 WHERE 절은 데이터베이스에서 필요한 정보를 추출하는 가장 기본적이면서도 강력한 도구입니다.

실무에서는 매일 수백 개의 쿼리를 작성하며, 이 기초를 제대로 이해하지 못하면 성능 문제와 잘못된 결과를 초래합니다.

## 핵심 개념

- **SELECT 절의 역할**
  조회할 컬럼을 명시하는 부분입니다. 와일드카드(*)는 편리하지만 성능을 해칠 수 있으므로 필요한 컬럼만 선택해야 합니다.

- **WHERE 절의 조건 필터링**
  데이터를 필터링하는 핵심 부분입니다. WHERE 절이 없으면 전체 테이블을 스캔하므로 성능 저하가 발생합니다.

- **비교 연산자와 논리 연산자**
  =, !=, <, >, <=, >=와 AND, OR, NOT을 조합하여 복잡한 조건을 만듭니다.

- **NULL 처리**
  NULL은 '값이 없음'을 의미하며, = 연산자로 비교할 수 없습니다. IS NULL 또는 IS NOT NULL을 사용해야 합니다.

- **LIKE와 와일드카드**
  문자열 패턴 매칭에 사용되며, %는 0개 이상의 문자, _는 정확히 1개의 문자를 나타냅니다.

## 실습 예제

다음은 직원 테이블에서 급여가 5000 이상인 개발팀 직원을 조회하는 예제입니다.

```sql
CREATE TABLE employees (
    emp_id NUMBER PRIMARY KEY,
    emp_name VARCHAR2(50),
    department VARCHAR2(30),
    salary NUMBER,
    hire_date DATE
);
```

기본 INSERT 문으로 샘플 데이터를 입력합니다.

```sql
INSERT INTO employees VALUES (1, '김철수', 'Development', 6000, TO_DATE('2023-01-15', 'YYYY-MM-DD'));
INSERT INTO employees VALUES (2, '이영희', 'Development', 5500, TO_DATE('2023-03-20', 'YYYY-MM-DD'));
INSERT INTO employees VALUES (3, '박민준', 'Sales', 4500, TO_DATE('2023-06-10', 'YYYY-MM-DD'));
INSERT INTO employees VALUES (4, '정수진', 'Development', 4800, TO_DATE('2023-02-28', 'YYYY-MM-DD'));
COMMIT;
```

이제 조건에 맞는 데이터를 조회합니다.

```sql
SELECT emp_id, emp_name, department, salary
FROM employees
WHERE department = 'Development'
  AND salary >= 5000
ORDER BY salary DESC;
```

결과는 다음과 같습니다: 김철수(6000), 이영희(5500)가 조회됩니다.

## 일반적인 실수

- **NULL 값을 = 연산자로 비교**
  NULL은 어떤 값과도 같지 않습니다. WHERE salary = NULL은 항상 거짓입니다. 반드시 IS NULL을 사용하세요.

- **WHERE 절 없이 전체 테이블 조회**
  대규모 테이블에서 WHERE 절이 없으면 수백만 건의 데이터를 모두 로드하여 성능이 급격히 저하됩니다.

- **LIKE에서 와일드카드 위치 실수**
  'Development%'는 Development로 시작하는 문자열을 찾지만, '%Development'는 Development로 끝나는 문자열을 찾습니다. 의도를 명확히 하세요.

- **AND와 OR의 우선순위 혼동**
  AND가 OR보다 먼저 실행됩니다. 복잡한 조건은 괄호로 명확히 하세요: WHERE (dept = 'A' OR dept = 'B') AND salary > 5000

- **문자열 비교 시 대소문자 무시**
  Oracle SQL은 기본적으로 대소문자를 구분합니다. 'development'와 'Development'는 다릅니다. UPPER() 함수를 사용하세요.

## 오늘의 실습 체크리스트

- [ ] Oracle SQL 클라이언트(SQL*Plus 또는 SQL Developer) 접속 확인
- [ ] 위 예제의 employees 테이블 생성 및 데이터 입력
- [ ] 기본 SELECT 쿼리 실행: 전체 직원 조회
- [ ] WHERE 절 추가: 특정 부서 직원만 조회
- [ ] AND 연산자 사용: 부서와 급여 조건 동시 적용
- [ ] NULL 처리 연습: IS NULL 사용하여 NULL 값 찾기
- [ ] LIKE 연산자 연습: 이름이 '김'으로 시작하는 직원 조회
- [ ] 결과를 ORDER BY로 정렬하여 출력
- [ ] 작성한 쿼리를 파일로 저장하고 재실행 확인
