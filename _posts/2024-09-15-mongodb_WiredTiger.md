---
title: "[MongoDB] MongoDB WiredTiger 스토리지 엔진"
excerpt: "MongoDB의 메인 스토리지 엔진인 WiredTiger의 특징을 정리합니다."
#layout: archive
categories:
 - Mongodb
tags:
  - [mongodb]
#permalink: mongodb-first
toc: true
toc_sticky: true
date: 2024-09-15
last_modified_at: 2024-09-15
comments: true
---
### 🚀 MongoDB WiredTiger 스토리지 엔진
WiredTiger는 Berkeley DB 개발자들에 의해 개발된 임베디드 데이터베이스 엔진으로, 2014년 12월 MongoDB에 인수되어 현재 MongoDB의 디폴트 스토리지 엔진으로 도입되었습니다. MongoDB가 WiredTiger 스토리지 엔진을 도입하기 전에는 MMAPv1 스토리지 엔진을 사용했는데, 실제로 MMAPv1 스토리지 엔진은 범용적으로 사용하기에는 상당히 많은 문제점이 있었습니다. 따라서 MongoDB는 MMAPv1 스토리지 엔진의 문제점을 해결하기 위해 WiredTiger를 인수하고 MongoDB 서버의 스토리지 엔진으로 내장한 것입니다.

WiredTiger 스토리지 엔진은 내부적인 잠금 경합 최소화(Lock-free Algorithm)를 위해 "하자드 포인터(Hazard-Pointer)"나 "스킵 리스트(Skip-List)"와 같은 많은 신기술을 채택하고 있으며, 최신 RDBMS 서버들이 가지고 있는 MVCC(잠금 없는 데이터 읽기)와 데이터 파일 압축, 그리고 암호화 기능들을 모두 갖추고 있습니다. MongoDB 서버는 WiredTiger 스토리지 엔진을 내장함으로써 단번에 상용 RDBMS가 가지고 있는 기능들을 모두 지원합니다.

---

### 🚀 WiredTiger 스토리지 엔진 설정
WiredTiger는 Berkeley DB 개발자들에 의해 개발된 임베디드 데이터베이스 엔진으로, 2014년 12월 MongoDB에 인수되어 현재 MongoDB의 디폴트 스토리지 엔진으로 도입되었습니다. MongoDB가 WiredTiger 스토리지 엔진을 도입하기 전에는 MMAPv1 스토리지 엔진을 사용했는데, 실제로 MMAPv1 스토리지 엔진은 범용적으로 사용하기에는 상당히 많은 문제점이 있었습니다. 따라서 MongoDB는 MMAPv1 스토리지 엔진의 문제점을 해결하기 위해 WiredTiger를 인수하고 MongoDB 서버의 스토리지 엔진으로 내장한 것입니다.

WiredTiger 스토리지 엔진은 내부적인 잠금 경합 최소화(Lock-free Algorithm)를 위해 "하자드 포인터(Hazard-Pointer)"나 "스킵 리스트(Skip-List)"와 같은 많은 신기술을 채택하고 있으며, 최신 RDBMS 서버들이 가지고 있는 MVCC(잠금 없는 데이터 읽기)와 데이터 파일 압축, 그리고 암호화 기능들을 모두 갖추고 있습니다. MongoDB 서버는 WiredTiger 스토리지 엔진을 내장함으로써 단번에 상용 RDBMS가 가지고 있는 기능들을 모두 지원합니다.

---
### 🚀MySQL엔진
MySQL 엔진은 클라이언트로부터의 접속 및 쿼리 요청을 처리하는 커넥션 핸들러와 SQL파서 및 전처리기, 옵티마이저가 중심을 이룹니다. 그리고 성능 향상을 위해 MylSAM의 키 캐시나 InnoDB의 버퍼풀과 같은 보조 저장소 기능이 포함되어 있습니다. 또한，MySQL은 표준 SQL(ANSI SQL용2) 문법을 지원하기 때문에 표준 문법에 따라 작성된 쿼리는 타 DBMS와 호환되어 실행될 수 있습니다.

---

{% assign posts = site.categories.Mongodb %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}