---
layout: single
title: "[Elasticsearch] Elastic Stack CRUD Quiz"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Logstash, ELK RESTFul API]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Elastic Stack CRUD Quiz

> 실습 자료는 강의를 통해 참고해 주시면 감사하겠습니다.

- 여행사 고객 관리 시스템 구축
- 고객관리 데이터 입력
  - Index: tourcompany
  - Type: customerlist
- Query 작성
  - BoraBora 여행자의 명단 삭제 ( DELETE )
  - Hawaii 출발일을 2017-01-10에서 2017-01-17로 변경 ( UPDATE )
  - 디즈니랜드로 휴일 여행을 떠나는 사람들의 핸드폰 번호 조회 ( SELECT )

## ✔ Check Health

### IN

```shell
GET /_cat/health?v
```

### OUT

```shell
epoch      timestamp cluster   status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1641093591 03:19:51  mycluster yellow          1         1     12  12    0    0        2             0                  -                 85.7%
```

- 클러스터의 상태 정보를 보려면 위 명령어 수행
- `v` 옵션은 컬럼 내용까지 볼 경우 사용을 한다

## ✔ Check Indicies

### IN

```shell
GET /_cat/indices?v
```

### OUT

```shell
# OUTPUT
health status index                             uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   .geoip_databases                  pX5UN4wESS-vCV5AoEuhxQ   1   0         44           43     43.6mb         43.6mb
green  open   .kibana_task_manager_7.16.2_001   JwZwWmBvQv20SgLrQainDw   1   0         17         2593    453.9kb        453.9kb
green  open   .kibana_7.16.2_001                Uh68EfHsQ5y_ieTOkOjlWQ   1   0        276            6      2.4mb          2.4mb
...중략
```

- 복구정보
- **인덱스 리스트 목록** 확인

## ✔ Create Index and Insert data

### IN

```json
PUT tourcompany/customerlist/1
{
  "name": "Alfred",
  "phone": "010-1234-5678",
  "holiday_dest": "Disneyland",
  "departure_date": "2017/01/20"
}

POST tourcompany/customerlist/2
{
  "name": "Huey",
  "phone": "010-2222-4444",
  "holiday_dest": "Disneyland",
  "departure_date": "2017/01/20"
}

POST tourcompany/customerlist/3
{
  "name": "Naomi",
  "phone": "010-3333-5555",
  "holiday_dest": "Hawaii",
  "departure_date": "2017/01/10"
}
```

### OUT

```shell
# select all data
GET tourcompany/_search?pretty

# select one data
GET tourcompany/_doc?1
```

```json
{
  "_index": "tourcompany",
  "_type": "_doc",
  "_id": "1",
  "_version": 2,
  "_seq_no": 6,
  "_primary_term": 1,
  "found": true,
  "_source": {
    "name": "Alfred",
    "phone": "010-1234-5678",
    "holiday_dest": "Disneyland",
    "departure_date": "2017/01/20"
  }
}
```

- 데이터를 삽입할 경우에는 POST, PUT 키워드를 사용
- 삽입한 데이터는 아래 명령어를 통해 조회가 가능하다
- \_doc
  - 단일 건수
- \_search
  - 전체 건수

### DELETE Data

```http
DELETE tourcompany/customerlist/4
```

- 삭제 구문

### Update Data

```json
POST tourcompany/customerlist/3/_update
{
  doc: {
    "departure_date" : "2017/01/10"
  }
}
```

- 업데이트 구문같은 경우 \_update 키워드를 추가
- 바디(Body) 영역에 업데이트를 할 데이터를 입력

### 참고 자료

- [엘라스틱서치 CRUD 문제와 해설](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27230?volume=1.00&mm=null&quality=1080) 📌
- [엘라스틱서치 기본 명령어 정리](https://esbook.kimjmin.net/04-data/4.2-crud)
- [엘라스틱 CRUD 사용법](https://velog.io/@qnfmtm666/elasticsearch-Elasticsearch-CRUD-%EA%B8%B0%EB%B3%B8%EC%82%AC%EC%9A%A9%EB%B2%95-feat.-Kibana)
- [cat API 간단 설명과 유용한 cat API 예제](https://knight76.tistory.com/entry/elasticsearch-5-cat-API)
