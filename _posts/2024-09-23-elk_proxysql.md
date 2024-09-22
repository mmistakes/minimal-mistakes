---
title: "[ELK] 로그 수집시스템 - proxySQL 수집"
excerpt: "ELK 스택을 이용하여 proxySQL의 로그를 수집하고 검색하는 시스템을 구성합니다."
#layout: archive
categories:
 - Elk
tags:
  - [elk,proxysql,mysql]
toc: true
toc_sticky: true
date: 2024-09-23
last_modified_at: 2024-09-23
comments: true
---
### 🚀 MongoDB 데이터 동기화
Real MongoDB 서적의 이론을 토대로 MongoDB의 공유 캐시와 디스크 간의 데이터 동기화 과정과 캐시 효율성을 높이기 위한 운영체제 캐시 사용 여부, MongoDB의 데이터 페이지 압축에 대한 내용을 정리하였습니다.
<br/>



### 🚀 캐시 이빅션

WiredTiger 스토리지 엔진은 공유 캐시를 위해서 지정된 크기의 메모리 공간만 사용해야 하는데, 이를 위해 공유 캐시 내에 새로운 디스크 데이터 페이지를 읽어서 적재할 수 있도록 빈 공간을 항상 적절히 유지해야 합니다. 그렇지 않으면 쿼리가 필요한 데이터 페이지를 디스크에서 가져오지 못하기 때문에 쿼리의 응답 속도가 느려집니다.

WiredTiger 스토리지 엔진은 공유 캐시에 적절한 빈 공간을 유지하기 위해서 **이빅션 모듈**을 가지고 있으며, 이를 "이빅션 서버(Eviction Server)"라고도 표현합니다. 이빅션 서버는 사용자의 요청을 처리하는 쓰레드(이를 유저 쓰레드 또는 포그라운드 쓰레드라고도 함)와는 별개로 **백그라운드 쓰레드**로 실행되며, 공유 캐시에 적재된 데이터 페이지 중에서 자주 사용되지 않는 데이터 페이지 위주로 공유 캐시에서 제거하는 작업을 수행합니다. 

WiredTiger 스토리지 엔진은 공유 캐시에 적재된 데이터 페이지를 스캔하면서 자주 사용되지 않는 페이지를 제거하는데, 이 과정에서 공유 캐시 스캔을 상당히 많이 수행하게 되기 때문에 모니터링이 필요할 수 있습니다. 이빅션 서버의 작업 상태를 측정 할 수 있는 지표들이 있는데 아래와 같습니다.

- **Total Cache Bytes**  
   = `db.serverStatus() wiredTiger.cache."maximum bytes configured"`

- **Used Cache Bytes**  
   = `db.serverStatus() wiredTiger.cache."bytes currently in the cache"`

- **Dirty Cache Bytes**  
   = `db.serverStatus() wiredTiger.cache."tracked dirty bytes in the cache"`

- **Tree Walks for Eviction**  
   = `db.serverStatus() wiredTiger.cache."pages walked for eviction"`

WiredTiger 스토리지 엔진의 백그라운드 이빅션 쓰레드가 적절히 공유 캐시의 여유 공간을 확보하지 못하면 WiredTiger 스토리지 엔진에서는 사용자의 쿼리를 처리하는 포그라운드 쓰레드에서 직접 캐시 이빅션을 실행하기도 합니다. 이런 상황이 되면 쿼리를 처리해야 할 쓰레드들이 캐시 이빅션까지 처리해야 하기 때문에 MongoDB의 쿼리 처리 성능이 떨어지게 됩니다. 이러한 현상을 측정할 수 있는 지표들은 다음과 같습니다.

---
{% assign posts = site.categories.Elk %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}