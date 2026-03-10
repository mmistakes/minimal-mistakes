---
layout: post
title: "Elasticsearch 기초: 검색 엔진의 핵심 이해하기"
date: 2026-03-10 10:01:13 +0900
categories: [data-infra]
tags: [study, elasticsearch, search, infra, automation]
---

## 왜 Elasticsearch를 배워야 할까?

Elasticsearch는 대규모 로그 분석, 실시간 검색, 모니터링 시스템의 핵심입니다. 매일 수백만 건의 데이터를 빠르게 검색해야 하는 프로덕션 환경에서 필수적인 기술입니다.

현대적인 데이터 인프라에서 Elasticsearch 없이는 효율적인 검색과 분석이 거의 불가능합니다. 로그 수집(ELK Stack), 메트릭 모니터링, 전문 검색 기능 등 실무에서 자주 마주치는 요구사항들을 해결합니다.

## 핵심 개념 5가지

- **Index (인덱스)**
  데이터베이스의 테이블처럼 문서들을 저장하는 논리적 단위입니다. 검색 성능을 위해 역색인(inverted index) 구조로 저장됩니다.

- **Document (문서)**
  JSON 형식의 단일 데이터 단위입니다. 각 문서는 고유한 ID를 가지며 여러 필드로 구성됩니다.

- **Field (필드)**
  문서 내의 개별 데이터 속성입니다. 텍스트, 숫자, 날짜 등 다양한 타입을 지원합니다.

- **Shard (샤드)**
  인덱스를 물리적으로 분산 저장하는 단위입니다. 대용량 데이터를 여러 노드에 분산하여 성능을 높입니다.

- **Replica (복제본)**
  샤드의 복사본으로 고가용성과 읽기 성능을 보장합니다.

## 실습: 기본 CRUD 작업

### 1단계: 인덱스 생성

```bash
curl -X PUT "localhost:9200/products" -H "Content-Type: application/json" -d '{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name": {"type": "text"},
      "price": {"type": "integer"},
      "category": {"type": "keyword"},
      "created_at": {"type": "date"}
    }
  }
}'
```

### 2단계: 문서 추가

```bash
curl -X POST "localhost:9200/products/_doc" -H "Content-Type: application/json" -d '{
  "name": "무선 이어폰",
  "price": 89000,
  "category": "electronics",
  "created_at": "2026-03-10T10:30:00Z"
}'
```

### 3단계: 검색 쿼리

```bash
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '{
  "query": {
    "match": {
      "name": "이어폰"
    }
  }
}'
```

### 4단계: 범위 검색

```bash
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '{
  "query": {
    "range": {
      "price": {
        "gte": 50000,
        "lte": 100000
      }
    }
  }
}'
```

## 자주 하는 실수들

- **매핑을 정의하지 않고 시작하기**
  동적 매핑은 편하지만 프로덕션에서는 예상치 못한 타입 변환 문제를 일으킵니다. 항상 명시적으로 매핑을 정의하세요.

- **모든 필드를 text로 설정하기**
  카테고리나 상태값처럼 정확한 매칭이 필요한 필드는 keyword 타입을 사용해야 합니다. text는 전문 검색에만 사용하세요.

- **샤드 수를 과하게 많이 설정하기**
  샤드가 많으면 오버헤드가 증가합니다. 일반적으로 노드당 1-3개 샤드가 적절합니다.

- **쿼리 성능 최적화 없이 대규모 데이터 처리하기**
  필터(filter) 컨텍스트를 사용하고 불필요한 필드는 제외하세요. 성능 차이가 매우 큽니다.

- **인덱스 설정을 변경한 후 재색인하지 않기**
  매핑 변경 후에는 반드시 재색인이 필요합니다. 기존 데이터는 새 설정을 적용받지 않습니다.

## 오늘의 실습 체크리스트

- [ ] 로컬 환경에 Elasticsearch 설치 및 실행 확인
- [ ] 간단한 인덱스 생성 (최소 3개 필드 포함)
- [ ] 5개 이상의 샘플 문서 추가
- [ ] match 쿼리로 텍스트 검색 테스트
- [ ] range 쿼리로 숫자 범위 검색 테스트
- [ ] bool 쿼리로 AND/OR 조건 조합해보기
- [ ] 검색 결과의 응답 구조 분석 (hits, total, score 이해)
- [ ] Kibana Dev Tools에서 위 모든 쿼리 실행 및 결과 확인
