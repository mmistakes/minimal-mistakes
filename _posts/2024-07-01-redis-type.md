---
title: "Redis 타입 살펴보기"
date: 2024-07-1
categories: redis
comments: false
---

## 개요
레디스(Redis)는 인메모리 데이터 구조 저장소로서, 다양한 데이터 타입을 지원하여 각각의 특징에 맞는 데이터 관리 및 처리를 가능하게 합니다. 이 포스팅에서는 레디스가 지원하는 주요 데이터 타입들에 대해 알아보겠습니다.
## Redis란?
빠른 속도와 간편한 사용성을 제공하는 키-값 기반의 NoSQL 데이터베이스로, 주로 메모리 내에서 데이터를 저장하고 접근하는 용도로 활용됩니다.
## 타입
### Strings
- 단일 값을 저장하는 가장 기본적인 데이터 타입입니다.
- 설정 값, 캐시 데이터 등 간단한 문자열 데이터를 저장할 때 사용됩니다.
```sql
SET mykey "Hello, Redis!"
GET mykey
"Hello, Redis!"
```

### Lists
- 순서가 있는 문자열 요소들을 저장하며, 리스트의 양 끝에서 요소를 추가하거나 제거할 수 있습니다.
- 큐(Queue)나 최근 작업 이력 등을 저장하고 관리할 때 사용됩니다.
```sql
LPUSH mylist "World"
LPUSH mylist "Hello"
LRANGE mylist 0 -1
1) "Hello"
2) "World"
```

### Sets
- 중복을 허용하지 않는 고유한 문자열 집합을 관리하며, 집합 연산을 지원합니다.
- 고유한 아이템 목록을 관리하거나, 특정 요소의 존재 여부를 빠르게 확인할 때 사용됩니다.
```sql
SADD myset "Hello"
SADD myset "World"
SMEMBERS myset
1) "Hello"
2) "World"
```

### Hashes
- 필드와 값의 쌍을 저장하는 데이터 구조로, 객체를 해시 형태로 관리할 때 유용합니다.
- 사용자 정보, 제품 정보 등의 객체 데이터를 구조화하여 저장할 때 사용됩니다.
```sql
HSET myhash user_id "12345"
HSET myhash username "son"
HGETALL myhash
1) "user_id"
2) "12345"
3) "username"
4) "son"
```

### Sorted Sets
- 각 요소에 점수를 부여하고 정렬하여 저장하는 데이터 타입으로, 순위 기반의 데이터를 관리할 때 유용합니다.
- 리더보드, 순위 정보 등을 저장하고 관리할 때 사용됩니다.
```sql
ZADD leaderboard 100 "player1"
ZADD leaderboard 90 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
1) "player2"
2) "90"
3) "player1"
4) "100"
```

### Bitmaps
- 비트 연산을 지원하는 데이터 타입으로, 특정 위치의 비트를 설정하거나 확인할 수 있습니다.
- 통계 데이터, 온라인 상태 등을 비트로 표현하고 관리할 때 사용됩니다.
```sql
SETBIT mybitmap 0 1
GETBIT mybitmap 0
(integer) 1
```

### HyperLogLogs
- 고유한 요소의 개수를 근사치로 계산하는 확률적 자료구조입니다.
- 고유 방문자 수, 독특한 사용자 수 등을 추정할 때 사용됩니다.
```sql
PFADD unique_visitors "user1"
PFADD unique_visitors "user2"
PFCOUNT unique_visitors
(integer) 2
```

### Streams
- 시간 순서대로 정렬된 메시지 스트림을 저장하고 처리하는 데이터 타입입니다.
- 실시간 데이터 스트리밍, 이벤트 로깅 등을 처리할 때 사용됩니다.
```sql
XADD mystream * sensor_id 1001 temperature 24.5
XRANGE mystream - +
1) "1609517473707-0"
   1) "sensor_id"
   2) "1001"
   3) "temperature"
   4) "24.5"
```

### Geospatial Indexes
- 위치 정보를 저장하고 지리적 연산을 지원하는 데이터 타입입니다.
- 위치 기반 서비스, 지도 애플리케이션 등에서 위치 검색 및 분석에 사용됩니다.
```sql
GEOADD cities 126.9780 37.5665 "Seoul"     # 서울, 대한민국
GEOADD cities 139.6917 35.6895 "Tokyo"     # 도쿄, 일본
GEOADD cities 116.4074 39.9042 "Beijing"   # 베이징, 중국
GEORADIUS cities 135 35 1000 km
1) "Tokyo"
2) "Seoul"
```