---
layout: post
title: "Redis와 SQL의 만남: 캐싱 전략으로 데이터베이스 성능 극대화"
date: 2026-02-28 09:58:30 +0900
categories: [sql]
tags: [study, redis, caching, database, automation]
---

## 왜 이 주제가 중요한가?

SQL 기반 애플리케이션에서 데이터베이스는 병목이 된다. 같은 쿼리를 반복 실행하면 디스크 I/O가 증가하고 응답 시간이 늘어난다.

Redis를 캐시 레이어로 추가하면 자주 조회하는 데이터를 메모리에 저장해 쿼리 실행 횟수를 줄일 수 있다. 이는 데이터베이스 부하를 크게 감소시킨다.

## 핵심 개념

- **캐시 계층의 역할**
  SQL 쿼리 결과를 Redis에 저장하고, 동일한 요청이 들어오면 데이터베이스 대신 Redis에서 즉시 반환한다.

- **캐시 무효화 전략**
  데이터가 변경되면 해당 캐시를 삭제해야 한다. TTL(Time To Live)을 설정하거나 이벤트 기반으로 무효화한다.

- **직렬화와 역직렬화**
  SQL 결과(보통 JSON)를 Redis에 저장하려면 문자열로 변환하고, 조회할 때 원래 형태로 복원해야 한다.

- **핫 데이터 식별**
  모든 쿼리를 캐시할 필요는 없다. 자주 조회되고 변경이 적은 데이터를 우선적으로 캐시한다.

- **캐시 스탬피드 방지**
  캐시 만료 시점에 동시에 많은 요청이 들어오면 데이터베이스가 과부하된다. 락이나 확률적 갱신으로 방지한다.

## 실전 예제

### 기본 캐싱 패턴

```python
import redis
import json
from datetime import datetime

redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)

def get_user_by_id(user_id):
    # 1. 캐시에서 먼저 확인
    cache_key = f"user:{user_id}"
    cached_user = redis_client.get(cache_key)
    
    if cached_user:
        print(f"캐시 히트: user_id={user_id}")
        return json.loads(cached_user)
    
    # 2. 캐시 미스 시 데이터베이스 조회
    print(f"캐시 미스: 데이터베이스에서 조회 user_id={user_id}")
    user = query_database(f"SELECT * FROM users WHERE id = {user_id}")
    
    # 3. 결과를 캐시에 저장 (TTL: 3600초)
    if user:
        redis_client.setex(cache_key, 3600, json.dumps(user))
    
    return user
```

### 데이터 변경 시 캐시 무효화

```python
def update_user(user_id, new_data):
    # 1. 데이터베이스 업데이트
    execute_query(f"UPDATE users SET name='{new_data['name']}' WHERE id={user_id}")
    
    # 2. 해당 캐시 삭제
    cache_key = f"user:{user_id}"
    redis_client.delete(cache_key)
    print(f"캐시 삭제: {cache_key}")
    
    return {"status": "success", "user_id": user_id}
```

### 캐시 스탬피드 방지 (확률적 갱신)

```python
import random

def get_product_with_protection(product_id):
    cache_key = f"product:{product_id}"
    cached_product = redis_client.get(cache_key)
    ttl = redis_client.ttl(cache_key)
    
    # 캐시가 있고 만료 시간이 남아있으면 반환
    if cached_product and ttl > 0:
        # 만료 시간이 10% 이하 남았으면 10% 확률로 미리 갱신
        if ttl < 360 and random.random() < 0.1:
            refresh_cache_async(product_id)
        return json.loads(cached_product)
    
    # 캐시 미스 또는 만료
    product = query_database(f"SELECT * FROM products WHERE id = {product_id}")
    if product:
        redis_client.setex(cache_key, 3600, json.dumps(product))
    
    return product
```

## 자주 하는 실수

- **모든 쿼리를 캐시하려는 시도**
  변경이 빈번한 데이터를 캐시하면 오래된 정보를 제공하게 된다. 읽기가 많고 변경이 적은 데이터만 캐시하자.

- **캐시 무효화 로직 누락**
  데이터베이스를 업데이트했지만 캐시를 지우지 않으면 불일치가 발생한다. 모든 쓰기 작업 후 관련 캐시를 반드시 삭제하자.

- **직렬화 형식 불일치**
  JSON으로 저장했는데 pickle로 로드하려고 하면 에러가 난다. 저장과 로드 시 동일한 형식을 사용하자.

- **TTL 설정 없이 캐시 저장**
  TTL이 없으면 캐시가 영구 저장되어 메모리를 낭비한다. 모든 캐시에 적절한 TTL을 설정하자.

- **동시성 문제 무시**
  여러 스레드에서 동시에 캐시를 갱신하면 race condition이 발생한다. 락이나 원자적 연산을 사용하자.

## 오늘의 실습 체크리스트

- [ ] Redis 로컬 환경 설정 (docker run redis 또는 설치)
- [ ] Python redis 라이브러리 설치 (`pip install redis`)
- [ ] 간단한 SELECT 쿼리 결과를 Redis에 캐시하는 코드 작성
- [ ] 캐시 히트/미스 로그를 출력하는 함수 구현
- [ ] UPDATE 작업 후 캐시 삭제 로직 추가
- [ ] TTL 설정이 제대로 작동하는지 redis-cli로 확인
- [ ] 동일한 쿼리를 10번 실행해 응답 시간 차이 측정
- [ ] 캐시 무효화 없이 데이터 변경 시 문제점 재현해보기
