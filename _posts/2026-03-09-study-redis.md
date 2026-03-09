---
layout: post
title: "Redis와 SQL: 캐싱 전략으로 데이터베이스 성능 극대화하기"
date: 2026-03-09 10:06:56 +0900
categories: [sql]
tags: [study, redis, caching, database, automation]
---

## 왜 이 주제가 중요한가?

SQL 데이터베이스만으로는 대규모 트래픽을 감당하기 어렵습니다. Redis를 캐싱 레이어로 추가하면 데이터베이스 부하를 크게 줄이고 응답 속도를 10배 이상 개선할 수 있습니다.

실제 프로젝트에서는 자주 조회되는 데이터(사용자 정보, 상품 목록, 세션 등)를 Redis에 저장해 데이터베이스 쿼리를 최소화합니다.

## 핵심 개념

- **인메모리 저장소**
  Redis는 모든 데이터를 메모리에 저장하므로 디스크 I/O 없이 매우 빠른 접근이 가능합니다.

- **캐시 무효화 전략**
  데이터 변경 시 Redis의 캐시를 즉시 삭제하거나 TTL(Time To Live)을 설정해 자동으로 만료되도록 합니다.

- **SQL과의 조합 패턴**
  먼저 Redis에서 데이터를 찾고, 없으면 SQL 데이터베이스에서 조회한 후 Redis에 저장하는 "Look-Aside" 패턴이 가장 일반적입니다.

- **데이터 타입 활용**
  String(단순 값), Hash(객체), List(순서 있는 목록), Set(중복 없는 집합) 등 다양한 자료구조를 지원합니다.

- **동시성 문제**
  여러 요청이 동시에 같은 데이터를 캐시할 때 "캐시 스탬피드" 현상이 발생할 수 있으므로 주의가 필요합니다.

## 실전 예제: 사용자 정보 캐싱

### 기본 구조

```python
import redis
import json
import time
from datetime import datetime

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_user_info(user_id):
    # 1단계: Redis에서 캐시 확인
    cache_key = f"user:{user_id}"
    cached_data = redis_client.get(cache_key)
    
    if cached_data:
        print(f"캐시 히트: user_id={user_id}")
        return json.loads(cached_data)
    
    # 2단계: 캐시 미스 시 SQL 데이터베이스에서 조회
    print(f"캐시 미스: user_id={user_id}")
    user_data = query_database(user_id)  # SQL 쿼리
    
    # 3단계: 결과를 Redis에 저장 (TTL: 3600초)
    redis_client.setex(
        cache_key,
        3600,
        json.dumps(user_data)
    )
    
    return user_data
```

### 데이터 변경 시 캐시 무효화

```python
def update_user_info(user_id, new_data):
    # 1단계: SQL 데이터베이스 업데이트
    update_database(user_id, new_data)
    
    # 2단계: Redis 캐시 삭제
    cache_key = f"user:{user_id}"
    redis_client.delete(cache_key)
    
    print(f"캐시 무효화: user_id={user_id}")
    return True
```

### 상품 목록 캐싱 (Hash 사용)

```python
def get_product_list(category):
    cache_key = f"products:{category}"
    
    # Redis Hash에서 모든 상품 조회
    products = redis_client.hgetall(cache_key)
    
    if products:
        print(f"캐시 히트: category={category}")
        return {k.decode(): json.loads(v) for k, v in products.items()}
    
    # 캐시 미스 시 데이터베이스에서 조회
    products = query_products_by_category(category)
    
    # Hash로 저장 (product_id를 필드로 사용)
    for product in products:
        redis_client.hset(
            cache_key,
            product['id'],
            json.dumps(product)
        )
    
    # 1시간 후 자동 만료
    redis_client.expire(cache_key, 3600)
    
    return products
```

## 자주 하는 실수

- **TTL 설정 없이 캐시 저장**
  Redis 메모리가 무한정 증가하면 서버가 다운될 수 있습니다. 모든 캐시에 적절한 TTL을 설정하세요.

- **캐시 무효화 누락**
  데이터베이스는 업데이트했지만 Redis 캐시는 그대로 두면 사용자가 구 데이터를 계속 보게 됩니다.

- **대용량 객체를 문자열로 저장**
  복잡한 객체는 JSON 직렬화 오버헤드가 크므로 Hash나 Set 구조를 활용하는 것이 효율적입니다.

- **캐시 스탬피드 미처리**
  인기 있는 데이터의 캐시가 만료되면 수천 개의 요청이 동시에 데이터베이스를 조회합니다. 락(Lock) 메커니즘을 추가하세요.

- **Redis 연결 풀 미설정**
  매번 새로운 연결을 만들면 성능이 급격히 떨어집니다. 연결 풀을 사용하세요.

## 오늘의 실습 체크리스트

- [ ] 로컬 환경에 Redis 설치 및 실행 확인
- [ ] Python redis 라이브러리 설치 (`pip install redis`)
- [ ] get_user_info() 함수 구현 및 테스트
- [ ] update_user_info() 함수로 캐시 무효화 동작 확인
- [ ] redis-cli를 이용해 저장된 데이터 직접 조회
- [ ] TTL 설정 후 시간 경과에 따른 자동 만료 확인
- [ ] Hash 구조로 상품 목록 캐싱 구현
- [ ] 캐시 히트/미스 로그 출력으로 동작 검증
