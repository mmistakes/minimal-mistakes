---
layout: single
title: "[Elasticsearch] Elastic Stack Batch Process"
date: "2022-01-02 16:29:53"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Batch Process]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ⚙ Tech Spec

- Virtualization
  - VMware
- OS Name
  - Ubuntu 20.04.3 LTS
- Tool
  - Kibana Dev Tool

## ✔ Elasticsearch Batch Process

### 🔥 Batch Process?

> 한 번의 API 요청으로 대량으로 document를 추가하고 조회하는 방법

- \_bulk API를 사용하여 위의 작업을 일괄적으로 수행 할 수 있는 기능
- \_bulk API로 index -> create, update, delete 수행이 가능하다
- delete문을 제외하고는 **명령문**과 **데이터문**을 한 줄씩 입력해야 한다
- 최대한 적은 네트워크 왕복으로 가능한 빠르게 여러 작업을 수행할 수 있는 메커니즘 제공
- 네트워크 오버헤드를 방지하기위함
- <u>HTTP 바디 부분 끝에 반드시 엔터 추가 입력 필요</u>

#### 일괄작업 두 개의 문서 인덱싱

```json
POST /customer/type1/_bulk?pretty
{"index": {"_id" : "1"}}
{"name": "John Doe" }
{"index": {"_id" : "2"}}
{"name": "Jane Doe" }
```

- 위 예제에서는 일괄 작업으로 두 개의 문서를 인덱싱

```json
# Batch Process id auto increment
POST /customers/user/_bulk
{ "index" : {} }
{ "name"  : "test_auto_generate_id" }
{ "index" : {} }
{ "name"  : "name_create1" }
{ "index" : {} }
{ "name"  : "name_create2" }
{ "index" : {} }
{ "name"  : "name_create3" }
```

> Elasticsearch Bulk API Auto Generator 가능 여부?

- INSERT 시에 Id값을 생략하여 넣는 것을 시도
- 위와 같이 구문을 작성하였는데 숫자가 아닌 다른 ID값이 들어간다

#### 첫 번째, 두 번째 문서를 삭제 및 업데이트

```json
POST /customer/type1/_bulk?pretty
{"update": {"_id" : "1"}}
{"doc": { "name": "John Doe becomes Jane Doe" } }
{"delete": {"_id" : "2"}}
[엔터]
```

- 첫 번째 문서(ID 1)를 업데이트 한 후 두 번째 문서(ID 2)를 일괄작업에서 삭제

### 🔥 Batch Processing

- **Bulk API**는 하나의 작업이 실패하여도 작업을 중단하지 않는다
- 즉, 하나의 행동이 실패 하여도 나머지 행동을 계속해서 처리한다
- 대량 API가 반환되는 경우
  - 각 액션에 대한 상태가 전송 된 순서대로 제공된다
  - 위 같은 이유를 통해 어떤 액션이 실패했는지 확인이 가능하다

### 🔨 Batch Process Self Test Code

```json
# Batch Process Self Test
DELETE customer
GET /customer/type1/_search?pretty
GET /customer/_doc/7?pretty
POST /customer/type1/_bulk
{"index": {"_id": "1"}}
{"name": "ymkim"}
{"index": {"_id": "2"}}
{"name": "sh"}
{"index": {"_id": "3"}}
{"name": "helloboy"}
{"index": {"_id": "4"}}
{"name": "nanum"}
{"index": {"_id": "5"}}
{"name": "boy"}
{"index": {"_id": "6"}}
{"name": "girl"}

# Batch Process Self Test 2
POST /customer/type1/_bulk
{"update": {"_id": "1"}}
{"doc": {"age": "30"}}
{"delete": {"_id": "2"}}
{"create": {"_id": "7"}}
{"gender": "M"}
```

### 참고 자료

- [Batch Process란?](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27231?volume=1.00&mm=null&quality=1080&tab=curriculum) 📌
- [벌크 API - \_bulk API](https://esbook.kimjmin.net/04-data/4.3-_bulk)
- [Elasticsearch 대량 추가/조회(Bulk API, MultiSearch API)](https://victorydntmd.tistory.com/316)
