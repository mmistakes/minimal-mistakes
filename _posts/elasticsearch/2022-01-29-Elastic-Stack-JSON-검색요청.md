---
layout: single
title: "[Elasticsearch] Elastic Stack JSON을 이용한 검색 요청"
date: "2022-01-28 06:00:00"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, JSON]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ 검색 API

### ✅ 검색 시작하기

- 간단한 검색부터 시작
- 검색을 실행하는 기본적인 두 가지 방법
  - REST 요청 **URI**를 통해 검색 매개 변수 보내기
  - REST 요청 **본문**을 통해 검색 매개 변수 보내기
- 요청 본문 메서드 사용시 표현력을 높이고 더 쉽게 읽을 수 있는 JSON 형식 사용
- 검색용 REST API는 \_search 엔드 포인트에서 엑세스

### ✅ URI를 통해 검색 매개 변수 보내기

bank 인덱스의 모든 문서 반환 예제

```json
GET /bank/_search?q=*&sort=account_number:asc&pretty
```

### ✅ 검색 API 결과

```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 4,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "my_index",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 1.0,
        "_source" : {
          "category" : "리모콘 Tv"
        }
      },
    ..중략
```

| 항목           | 설명                                             |
| -------------- | ------------------------------------------------ |
| **took**       | 검색 실행에 걸린 시간 (ms)                       |
| **time_out**   | 검색 시간 초과 여부                              |
| **\_shards**   | 검색된 파편의 수, 성공 / 실패한 파편의 수를 알림 |
| **hits**       | 검색 결과                                        |
| **hits.total** | 검색 조건에 일치하는 총 문서 수                  |
| **hits.hits**  | 검색 결과의 실제 배열 (기본값 10은 처음 10개)    |
| **hit.sort**   | 결과 정렬 키 (점수순 정렬시 누락)                |

### ✅ 본문(Body)를 통해 검색 매개 변수 보내기

```json
GET /bank/_search
{
  "query": {
    "match_all" : {},
      "sort": [
        {
                "account_number": "asc"
        }
      ]
  }
}
```

**script**를 통해 좀 더 세밀한 조회를 위해 본문에 내용을 전달한다.

### ✅ Query DSL: 쿼리 언어 소개

```json
GET kibana_sample_data_ecommerce/_search
{
  "query": {
    "match_all": {}
  }
}
```

kibana_sample_data_ecommerce 인덱스에 존재하는 모든 데이터를 검색한다.

```json
GET kibana_sample_data_ecommerce/_search
{
  "query": {
    "match_all": {}
  },
  "size": 1
}
```

해당 인덱스 조회 시 검색 결과를 한 개만 반환하도록 size를 1로 설정 하였다.  
기본적으로 디폴트 size 값은 10개를 출력하도록 설정이 되어있다.

```json
GET kibana_sample_data_ecommerce/_search
{
  "query": {
    "match_all": {}
  },
  "from": 10,
  "size": 10
}
```

결과의 10번째 항목부터 10개를 출력한다. **페이징 처리시**에 10번째 항목이 넘어가면  
다음 페이지 10개를 출력 하는것과 동일하다 봐도 무방하다.

### ✅ Query DSL: 자세히 들여다보기

```json
GET bank/_search
{
  "_source": ["account_number", "balance"],
  "query" : {
    "match_all" : {}
  },
  "sort" : {
    "balanace": {
      "order": "desc"
    }
  }
}
```

기본적으로 전체 JSON 문서가 모든 검색의 일부로 반환 되는데, 이를 **소스**라고 부른다.  
또한 위에서 말한 **소스**는 검색 결과 내에 존재하는 **\_source**를 의미한다.

엘라스틱서치의 \_source를 RDBMS의 예시와 함께 비교해보자.

**전체 필드 조회**

```sql
SELECT *
FROM BANK
ORDER BY
    balance DESC;
```

**원하는 필드만 조회**

```sql
SELECT
    account_number,
    balance
FROM
    BANK
ORDER BY
    balance DESC;
```

RDB에서 **원하는 필드만 지정**하여 출력을 하였듯이, elasticsearch 역시 \_source 옵션을 사용하여
원하는 필드의 검색 결과만 출력 할 수 있다.

### ✅ Query DSL: match 키워드 사용해보기

**account_nubmer가 20과 일치하면 반환**

```json
GET bank/_search
{
  "query" :{
    "match": {
      "account_number": 20
    }
  }
}
```

**match_all**이 아닌 **match 키워드**를 사용하면 정확하게 일치하는 값을 출력한다.  
간단한 예로는 **전체 유저**를 조회하는 경우와 **단일 유저**를 조회하는 경우를 떠올리면 될 것 같다.

### ✅ Query DSL: bool, must, match 혼합 쿼리

```json
GET bank/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}
```

두 개의 match 쿼리를 작성한 후에 'mill'과 'lane'이 포함되는 모든 계정을 반환한다.

### ✅ Query DSL: must, must not 쿼리

```json
GET bank/\_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": 40 } }
      ],
      "must_not": [
        { "match": { "state": "ID"} }
      ]
    }
  }
}
```

반드시 나이가 40인 데이터와 state가 ID가 아닌 데이터를 출력한다.

### ✅ term 쿼리와 match 쿼리의 차이

쿼리 컨텍스트(Query Context)와 필터 컨텍스트Filter Context)에서 사용이 되는  
match, term의 차이를 간략히 정리하고 넘어가자.

```json
GET bank/_search
{
  "query": {
    "match": {
      "category": "The bank"
    }
  }
}
```

```json
GET bank/_search
{
  "query": {
    "term": {
      "category": "The bank"
    }
  }
}
```

**term 쿼리**

<mark style='background: linear-gradient(to right, #7FFFD4 10%, #3DFF92 90%) '>검색에에 대한 분석을 거치지 않고 온전히 그 검색어와 정확히 일치하는 문서를 검색한다.</mark> 즉, **검색어가 분석기를 거쳐 토크나이징 없이** 검색을 한다는 의미다. 또한 모든 **대문자**는 **소문자**로 변형이 되고 **중복된 단어는 제거**가 되는 특징을 가지고 있다.

**match 쿼리**

<mark style='background: linear-gradient(to right, #7FFFD4 10%, #3DFF92 90%) '>검색어에 대해 분석을 거쳐 검색을 하며 이는 bool 쿼리 중에서도 should조건으로 검색을한다.</mark> 즉 검색어를 **분석기**를 통해 **토크나이징해서** 토크나이징 된 단어들을 찾아 문서들을 검색하고 토크나이징 된 단어들이 최소 1개라도 들어있다면 검색 결과에 포함한다. 이때 최소 n개이상 포함되면 포함시킬지 말지 결정하는 옵션도 있으니 이는 설정에 따라 다르겠지만 기본은 일단 1개라도 포함이 되면 결과에 포함된다.

### 참고 자료

- [JSON을 이용한 검색 요청](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27232?tab=curriculum&volume=1.00)
