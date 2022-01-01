---
layout: single
title: "[Elasticsearch] Elastic Stack CRUD"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Logstash]
toc: true
author_profile: false
# sidebar:
#   nav: "docs"
---

## ✔ 엘라스틱서치 CRUD

### 클러스터 탐색

Elasticsearch는 클러스터와 상호 작용하는데 사용할 수 있는 REST API 제공

### REST API

- 노드와 통신하는 방법
- API로 수행 할 수 있는 몇 가지 작업
  - 클러스터, 노드 및 색인 상태, 통계 확인
  - 클러스터, 노드, 색인 데이터, 메타 데이터 관리
  - CRUD(Create, Read, Update, Delete) 및 인덱스에 대한 검색 작업 수행
  - 페이징, 정렬, 필터링, 스크립팅, 집계 및 기타 여러 고급 검색 작업 수행
- 웹의 창시자(HTTP) 중의 한 사람 RoyFelling 2000년 논문에 의해 소개
  - 웹의 장점을 최대한 활용할 수 있는 네트워크 기반의 아키텍쳐
- 구성요소 3가지
  ```bash
  HTTP POST, http://myweb/users/
  {
  	"users":{
  		"name": "gasbugs"
  	}
  }
  ```
  - 리소스 (URI)
  - [메서드](https://github.com/ym1085/TIL/wiki/HTTP-%EB%A9%94%EC%84%9C%EB%93%9C) (POST)
  - 메시지 (위 코드 전체를 표현)

### 클러스터 상태(Health)

```bash
# _언더바 : API를 의미한다, REST API랑은 무관
# _update
# _search
# _cat: 노드의 대한 상태를 출력
# ?v: 상세 정보를 보여준다
GET /_cat/nodes?v
```

- 클러스터가 어떻게 진행되고 있는지 기본적인 확인
- curl을 사용하여 이를 수행
- HTTP/REST 호출을 수행 할 수 있는 모든 도구를 사용 가능
- 클러스터 상태를 확인하기 위해 \_cat API를 사용
- **녹색**
  - 모든 것이 좋음(클러스터가 완전히 정상 작동 함)
- **노란색**
  - 모든 데이터를 사용할 수 있지만 일부 복제본은 아직 할당되지 않음
  - 클러스터는 작동 된 상황
- **빨간색**
  - 어떤 이유로든 일부 데이터를 사용할 수 없음
  - 클러스터가 부분적으로 작동함
  - 빨간색이 나오면 문제가 있다는 의미

### 데이터베이스가 가진 데이터 확인하기

```bash
GET /_cat/indices?v
```

- 갖고 있는 모든 인덱스 항목 조회
- index는 일반 RDB에서 데이터베이스의 역할
- indecies
  - index의 복수형
  - 즉, 위 명령어는 데이터베이스를 전부 확인한다는 의미

### 엘라스틱 데이터베이스의 인덱싱 방식

<img width=400 height=250 src="https://user-images.githubusercontent.com/53969142/147403262-cf6db104-bc4c-4af9-9862-763629f0fad4.PNG" />

**Index(DataBase)**

| 문서 | 문서 내용                   |
| ---- | --------------------------- |
| Doc1 | blue sky green land red sun |
| Doc2 | blue ocean green land       |
| Doc3 | red flower blue sky         |

| 검색어 | 검색어가 가리키는 문서 |
| ------ | ---------------------- |
| blue   | Doc1, Doc2, Doc3       |
| sky    | Doc1, Doc3             |
| green  | Doc1, Doc2             |
| land   | Doc1, Doc2             |
| red    | Doc1, Doc3             |
| ocean  | Doc2                   |
| flower | Doc3                   |
| sun    | Doc1                   |

- 검색어는 해당 단어가 어느 문서(Document)에 포함이 되어있는지 확인
- blue라는 단어를 검색 시 Doc1, Doc2, Doc3 문서를 가르킨다.
- 데이터의 양이 많아진다는 단점이 있지만, 데이터 검색 속도가 증가한다.

### HTTP 메서드와 CRUD, SQL을 비교

| HTTP 메서드 | CRUD   | SQL    |
| ----------- | ------ | ------ |
| GET         | Read   | Select |
| PUT         | Update | Update |
| POST        | Create | Insert |
| DELETE      | Delete | Delete |

- 해당 열이 Elasticsearch에서 사용이 되는 HTTP 메서드.
- 6.x 부터 PUT이랑 POST를 엄격히 구분하지 않고 사용을 한다.
- Mapping?
  - 데이터베이스의 구성요소를 구성한다, 테이블 생성.
  - Elasticsearch는 Mapping이 필수 사항이 아니다.
  - 하지만 필요한 상황이 존재.

## ✔ 엘라스틱서치 데이터 처리

### 엘라스틱서치의 데이터 구조

<img width=500 height=350 src="https://user-images.githubusercontent.com/53969142/147403293-0cfc8971-7f1d-4383-88a8-664369353092.PNG" />

- 인덱스(Index), 타입(Type), 도큐먼트(Document)의 단위를 가짐
- 도큐먼트는 엘라스틱서치의 데이터가 저장되는 최소 단위
- 여러 개의 도큐먼트는 하나의 타입(테이블)
- 다시 여러 개의 타입은 하나의 인덱스(스키마)로 구성

| 엘라스틱서치 | 관계형 DB |
| ------------ | --------- |
| Index        | Database  |
| Type         | Table     |
| Field        | Column    |
| Document     | Row       |
| Mapping      | Scema     |

### 엘라스틱 서치 질의 방법

- CLI의 curl 명령어 사용
- [postman](https://www.postman.com/) 응용프로그램 사용
- Kibana에서 제공해주는 [devtool](https://www.tutorialspoint.com/kibana/kibana_dev_tools.htm) 사용

### 데이터 입력/조회/삭제/업데이트 요약

6.x 버전부터는 PUT과 POST를 혼용하여 사용한다

| 데이터 처리 | 메서드 | 구문                                                                       |
| ----------- | ------ | -------------------------------------------------------------------------- |
| 입력        | PUT    | http://localhost:9200/index1/type1/1 -d ‘{”num”: 1, “name”: “llsun Choi”}’ |
| 조회        | GET    | http://localhost:9200/index1/type1/1                                       |
| 삭제        | DELETE | http://localhost:9200/index1/type1/1                                       |
| 업데이트    | POST   | http://localhost:9200/index1/type1/1 \_update -d ‘’{doc: {”age”: 99} }’    |

**URI 분석**

> http://localhost:9200/index1/type1/1 -d ‘{”num”: 1, “name”: “llsun Choi”}’

- **index1**
  - Database 명명
- **type1**
  - 테이블 정의
- **1**
  - Document(Row)
- -d ‘{”num”: 1, “name”: “llsun Choi”}’
  - 메시지 부분
  - 메시지는 반드시 key - value 한 쌍으로 들어가야 한다

## ✔ 인덱스 만들기

### **Customer Index 생성**

```bash
PUT /customer?pretty
GET /_cat/indices?v

<curl 명령어>
curl -X PUT "localhost:9200/customer?pretty"
curl -X PUT "localhost:9200/_cat?indices?v"
```

- 첫 번째 명령은 PUT 동사를 사용하여 “customer”라는 **색인**을 생성
- JSON 응답 (있을 경우)을 포맷팅하여 출력하도록 끝 부분에 **pretty구문** 추가

### **PUT 명령어 실행 시**

```json
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "customer"
}
```

- **acknowledged**: 응답 결과 정상
- **shard_acknowledged**:
- **index:** 생성된 데이터베이스명

### GET 명령어로 index 전체 조회

```bash
GET /_cat/indices?v
```

- 전체 인덱스를 조회

### GET 명령어 실행 시

```bash
health status index                             uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   .geoip_databases                  ''                     1   0         43           40     40.8mb         40.8mb
... 중략
```

- \_cat 명령어를 사용하여 전체 index(데이터베이스)를 조회 한다.

### POST 명령어 사용하여 데이터 삽입

```bash
POST customer/type1/1
{
  "name": "ymkim"
}
```

### POST 명령어 실행 시

```bash
{
  "_index" : "customer",
  "_type" : "type1",
  "_id" : "1", # document => 지정하지 않을 시 랜덤으로 들어간다
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

### DELETE 명령어로 데이터 삭제

```bash
DELETE customer/type1/1
```

### DELETE 명령어 실행 시

```bash
{
  "_index" : "customer",
  "_type" : "type1",
  "_id" : "1",
  "_version" : 2,
  "result" : "deleted", # 삭제 여부
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}
```

### Document의 일부분을 변경

```bash
# 아래 명령어를 통해 document의 일부분을 변경할 수 있다
POST customer/type1/1/_update
{
  "doc" : {
    "age" : 123
  }
}

# 해당 명령어는 document 전체를 갈아끼우는 방법이다, 지양해야할 것 같다
POST customer/type1/1
{
  "name": "ymkim"
}
```

### Elasticsearch script 사용

```bash
POST customer/type1/1/_update
{
  "script" : {
    "inline": "if(ctx._source.age==123) {ctx._source.age++}"
  }
}
```

- 위와 같이 Javascript 구문을 사용하여 데이터를 핸들링 할 수 있다.

### 참고 자료

- [엘라스틱서치 CRUD](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27229?tab=curriculum&volume=1.00&quality=auto&mm=close)
