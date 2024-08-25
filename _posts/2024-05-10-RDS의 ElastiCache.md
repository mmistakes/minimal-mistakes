---
layout: single
title:  "RDS의 ElastiCache"
categories: [AWS]
tag: [AWS, RDS]
toc: true
toc_sticky: true
post-header: false

---

## ElastiCache

- 클라두으 내에서 In-memory 캐시를 만들어줌
- 데이터베이스에서 데이터를 읽어오는것이 아니라 캐시에서 빠른 속도로 데이터를 읽어옴
    - 수백, 수천만 개의 프로세싱을 동시다발적으로 처리할 경우 큰 차이가 생김
    - 종종 불러오는 레코드들은 예를 들면 SNS, 네이버 실시간 검색어 Top10 등 많은 사람들에 의해서 읽혀지는 데이터들을 캐시에 넣음으로써 빠른 로딩을 가능하게 함
- Read-Heavy 어플리케이션에서 상당한 Latency 감소 효과가 있음
- 초반 어플리케이션 개발 및 테스트 용도로는 적합하지 않음
- Elasti Cache는 Memcached와 Redis가 존재한다.

## Memcached

- Object 캐시 시스템으로 잘 알려져 있음
- ElastiCache는 Memcached의 프로토콜을 디폴트로 따름
- EC2 Auto Scaling처럼 데이터 처리 사용량에 따라 캐시의 크기가 커졌다 작아졌다 가능함
- Memcached는 오픈 소스이다.

### Memcached는 이럴때 사용하면 좋다!

1. 가장 단순한 캐싱 모델이 필요한가요? Yes
2. Object caching이 주된 모기적인가요? Yes
3. 캐시 크기를 마음대로 scaling하기를 원하나요? Yes

## Redis

- Key-Value, Set, List와 같은 형태의 데이터를 In-Memory에 저장 가능함
- 오픈 소스이다.
- Multi-AZ 기능을 지원한다. (Disaster Recovery 기능)

### Redis는 이럴때 사용하면 좋다!

1. List, Set과 같은 데이터셋을 사용하나요? Yes
2. 리더보드처럼 데이터셋의 랭킹을 정렬하는 용도가 필요한가요? Yes
3. Multi AZ기능이 필요하나요? Yes