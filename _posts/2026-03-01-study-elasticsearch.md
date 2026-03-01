---
layout: post
title: "Elasticsearch 기초: 검색 엔진의 핵심 이해하기"
date: 2026-03-01 10:13:22 +0900
categories: [data-infra]
tags: [study, elasticsearch, search, infra, automation]
---

## 왜 Elasticsearch가 중요한가?

Elasticsearch는 대규모 데이터에서 밀리초 단위의 빠른 검색을 가능하게 하는 핵심 인프라입니다.

실제 프로젝트에서 로그 분석, 전문 검색(full-text search), 실시간 분석이 필요할 때 필수적입니다. 관계형 데이터베이스의 LIKE 쿼리로는 처리할 수 없는 대량의 비정형 데이터를 효율적으로 다룰 수 있습니다.

## 핵심 개념

- **인덱스(Index)**
  데이터베이스의 테이블과 유사한 개념입니다. 검색 가능한 데이터의 논리적 모음입니다.

- **도큐먼트(Document)**
  JSON 형식의 단일 데이터 단위입니다. 데이터베이스의 행(row)에 해당합니다.

- **필드(Field)**
  도큐먼트 내의 개별 속성입니다. 데이터베이스의 열(column)과 같습니다.

- **샤드(Shard)**
  인덱스를 분산 저장하는 단위입니다. 대규모 데이터를 여러 노드에 나누어 저장합니다.

- **레플리카(Replica)**
  샤드의 복제본입니다. 장애 대응과 검색 성능 향상을 위해 사용됩니다.

## 실습: 기본 CRUD 작업

먼저 인덱스를 생성하고 데이터를 추가해봅시다.

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
      "category": {"type": "keyword"}
    }
  }
}'
```

이제 도큐먼트를 추가합니다.

```bash
curl -X POST "localhost:9200/products/_doc" -H "Content-Type: application/json" -d '{
  "name": "무선 이어폰",
  "price": 89000,
  "category": "전자제품"
}'
```

검색 쿼리를 실행해봅시다.

```bash
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '{
  "query": {
    "match": {
      "name": "이어폰"
    }
  }
}'
```

도큐먼트를 업데이트합니다.

```bash
curl -X POST "localhost:9200/products/_update/1" -H "Content-Type: application/json" -d '{
  "doc": {
    "price": 79000
  }
}'
```

## 자주 하는 실수

- **텍스트 필드에 keyword 타입 사용**
  전문 검색이 필요한 필드는 text 타입을 사용해야 합니다. keyword는 정확한 매칭만 가능합니다.

- **샤드 수를 무분별하게 증가**
  샤드가 많을수록 오버헤드가 증가합니다. 초기에는 1-3개 정도로 시작하고 필요에 따라 조정하세요.

- **매핑 없이 데이터 추가**
  자동 매핑은 예상치 못한 타입 추론을 할 수 있습니다. 명시적으로 매핑을 정의하는 것이 안전합니다.

- **모든 필드를 분석 대상으로 설정**
  분석(analyzer)은 CPU 리소스를 소비합니다. 필요한 필드만 text로 설정하세요.

- **인덱스 삭제 후 복구 불가능**
  프로덕션 환경에서는 인덱스 삭제 전에 백업을 확인하세요.

## 오늘의 실습 체크리스트

- [ ] 로컬 환경에서 Elasticsearch 설치 및 실행 확인
- [ ] 인덱스 생성 및 매핑 정의
- [ ] 3개 이상의 도큐먼트 추가
- [ ] match 쿼리로 전문 검색 테스트
- [ ] bool 쿼리로 복합 조건 검색 시도
- [ ] 인덱스 상태 확인 (GET /_cat/indices)
- [ ] 도큐먼트 업데이트 및 삭제 작업 수행
