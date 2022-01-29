---
layout: single
title: "[Elasticsearch] Elastic Stack URL을 이용한 검색 요청"
date: "2022-01-29 04:47:05"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Search, ELK Query DSL]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ 검색 API

### ✅ 검색(\_search API)

- 엘라스틱서치에서 검색은 **인덱스** 또는 **타입 단위**로 수행
- \_search API 사용
- 질의는 q 매개변수의 값으로 입력
- hamlet이라는 검색어로 검색

| 질의                                        | 질의문                                      |
| ------------------------------------------- | ------------------------------------------- |
| **books 인덱스, book 타입에서 hamlet 검색** | localhost:9200/books/book/\_search?q=hamlet |
| **books 인덱스에서 hamlet 검색**            | localhost:9200/books/\_search?q=hamlet      |
| **전체 인덱스에서 time 검색**               | localhost:9200/\_search?q=time              |

## ✔ Query String 검색 옵션 정리

### ✅ 특정 필드 검색

| 질의                                       | 질의문                |
| ------------------------------------------ | --------------------- |
| **전체 인덱스의 title 필드에서 time 검색** | /\_search?q=time:time |

### ✅ 다중 조건 검색

| 질의                                     | 질의문                             |
| ---------------------------------------- | ---------------------------------- |
| **title 필드에서 time과 machine을 검색** | /\_search?q=title:time AND machine |

### ✅ explain

| 질의                                                | 질의문                         |
| --------------------------------------------------- | ------------------------------ |
| **explain 매개변수를 사용하여 검색 처리 결과 표시** | /\_search?q=title:time&explain |

explain 키워드의 경우 점수(scoring)계산에서 사용된 상세 값 출력하는 용도로 사용이 된다.

### ✅ 요약된 전체 hit 수와 점수(score) 등의 메타 정보 출력

| 질의                                                                 | 질의문                                |
| -------------------------------------------------------------------- | ------------------------------------- |
| **\_source 매개변수를 false로 설정해 도큐먼트 내용을 배제하고 검색** | /\_search?q=title:time&\_source=false |

\_source를 false를 설정하는 경우 검색 결과의 개수(count)만 알고싶은 경우에 사용이 된다.

### ✅ 출력 결과에 표시할 필드 지정

| 질의                                    | 질의문                                                      |
| --------------------------------------- | ----------------------------------------------------------- |
| **title, author, category 필드만 출력** | /\_search?q=title:time&\_source=**title, author, category** |

\_source에 표시할 필드를 위와 같이 ','로 구분하여 입력하면 해당 필드만 출력할 수 있다.

### ✅ 검색 결과의 출력 순서 정렬

| 질의                                    | 질의문                                   |
| --------------------------------------- | ---------------------------------------- |
| **pages 필드를 기준으로 오름차순 정렬** | /\_search?q=author:jules&sort=pages      |
| **pages 필드를 기준으로 내림차순 정렬** | /\_search?q=author:jules&sort=pages:desc |

- sort=필드명 형식 사용 (디폴트 : \_score 값 기준)
- 내림차순 정렬: sort=필드명:desc (디폴트 : asc(오름차순))

### 🔥 퀴즈를 통한 쿼리 작성

위에서 배운 내용을 kibana devtool을 사용하여 직접 쿼리를 작성해보자.

### 참고 자료

- [URL을 이용한 검색 요청](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27233?tab=curriculum&volume=0.90&quality=1080)
