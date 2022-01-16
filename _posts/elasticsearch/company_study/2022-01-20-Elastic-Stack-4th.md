---
layout: single
title: "[Elastic Stack] Elastic Stack Study 4th"
date: "2022-01-16 16:57:13"
categories: Elastic Stack
tag: [Elastic Stack, Company Study, Aggregation]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## Elastic Stack 4th 집계 스터디

> 엘라스틱 스택의 핵심 기술인 집계를 제대로 분석

## 📌 목차

- 엘라스틱서치: 집계
  - 집계의 요청: 응답 형태
  - 메트릭 집계
  - 버킷 집계
  - 집계의 조합
  - 파이프라인 집계

## 📌 1-1 엘라스틱서치: 집계

### 엘라스틱서치의 집계란?

- 데이터를 그룹핑( Grouping )하고 통계값을 얻는 기능이다
- RDB SQL의 GROUPBY와 통계 함수를 포함하는 개념이다

### 엘라스틱서치의 집계 예시

- 데이터를 날짜별로 묶거나 특정 카테고리별로 묶어 그룹별 통계를 작성한다

## ✔ 1-2 엘라스틱서치: 집계

### 집계 기능의 효과

- 엘라스틱서치의 검색 기능과 맞물려 엘라스틱서치를 고성능 집계 엔진으로 활용
- 대표적인 활용 사례로는 키바나( 데이터 시각화 도구 )가 존재한다
- 키바나의 시각화 대시보드는 대부분 집계 기능을 기반으로 동작한다

### 사용해야 하는 이유 ( 간단한 예시 )

- "비행기 탑승객 중 이름에 mary가 들어간 사람이 있나요?" (Query Context)
- "비행기가 연착되었습니까?" (Filter Context)

## ✔ 2-1 집계의 요청: 응답 형태

### 엘라스틱서치의 집계 표기법?

- 엘라스틱 서치는 집계를 위한 특별한 API 제공 ❌, **aggs 파라미터**를 이용한다

```JSON
GET <인덱스명>/_search
{
	"aggs": {
		"my_aggs": {
			"agg_type": {
				...
			}
		}
	}
}
```

- aggs: 집계 요청을 하겠다는 의미
- my_aggs: 사용자가 지정하는 집계 이름
- agg_type: 집계 타입

## ✔ 3-1 메트릭 집계

### 메트릭 집계 용도

- 최소/최대/평균/합계/중간값 같은 통계 결과를 산출할 때 사용이 된다
- 텍스트(Text) 타입은 메트릭 집계에 사용할 수 없다

| 메트릭 집계      | 설명                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| **avg**          | 필드의 평균값을 계산                                                 |
| **min**          | 필드의 최솟값 계산                                                   |
| **max**          | 필드의 최대값 계산                                                   |
| **sum**          | 필드의 총합 계산                                                     |
| **perceties**    | 필드의 백분위값 계산                                                 |
| **stats**        | 필드의 min, max, sum, avg, count(도큐먼트 개수)를 한 번에 볼 수 있다 |
| **cardinality**  | 필드의 유니크한 값 개수 계산                                         |
| **geo-centroid** | 필드 내부의 위치 정보의 중심점 개선                                  |

## ✔ 3-2 메트릭 집계

### 메트릭 집계 실습 전

- 메트릭 집계의 가장 기본은 통계 작업이다
- 최소/최대/합계/평균/중간값 등을 구하는 메트릭 집계는 기본이며 사용 빈도 👆
- 사칙 연산을 수행하는 작업은 메트릭 집계를 통해 수행한다 생각하자

> 다음은 메트직 집계를 사용하여 평균값과 중간값을 구하는 예제를 살펴보자

## ✔ 3-3 메트릭 집계: 평균값

### 평균값 구하기: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
	"size": 0,
	"aggs": { 						// 집계 표현
		"stats_aggs": { 				// 사용자가 지정한 집계명
			"avg": { 				// 집계 타입
				"field": "products_base_price"
			}
		}
	}
}
```

- 해당 도큐먼트(kibana_sample...)에서 필드명이 products_base_price의 평균값 출력
- **size 0**을 선언하면 집계에 사용된 해당 도큐먼트를 포함시키지 않는다 ( 비용 절약 효과 )
- 평균값을 구하기 위해서는 **정수** 혹은 **실수**의 값만 허용이 된다

## ✔ 3-4 메트릭 집계: 평균값

### 평균값 구하기: 결과

```json
{
  "took": 1,
  // ..중략
  "aggregations": {
    "stats_aggs": {
      "value": 34.88652318578368
    }
  }
}
```

- 위에서 선언한 stats_aggs 집계를 통해 평균값 34.88652318578368 출력

## ✔ 3-5 메트릭 집계: 중간값

### 중간값(백분위) 구하기: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
	"size": 0,
	"aggs": { // 집계 표현
		"stats_aggs": { // 사용자가 지정한 집계명
			"precenties": { // 백분위 요청 타입
				"field": "products.base_price",
				"percents": [ // 25% ~ 50%에 해당하는 데이터를 요청
					25,
					50
				]
			}
		}
	}
}
```

- **products_base_price** 필드의 **백분위값**을 구하는 요청
- 집계타입이 **avg**가 아닌, **perceties**로 정의했다는 차이가 있다

## ✔ 3-6 메트릭 집계: 중간값

### 중간값(백분위) 구하기: 결과

```json
{
  "took": 1,
  // ..중략
  "aggregations": {
    "stats_aggs": {
      "values": {
        "25.0": 16.9843785,
        "50.0": 25.6598135964912
      }
    } // 사용자가 지정한 집계명
  }
}
```

- 해당 사진에서의 values는 25% ~ 50%에 속하는 값을 출력한다

## ✔ 3-7 메트릭 집계: 필드의 유니크한 값 개수 확인

### Cardinality Aggregation?

- 카디널리티 집계(cardinality aggregation) 📌
- 필드의 중복값을 제외하고 유니크한 데이터의 개수만 보여줄 경우 사용한다
- RDB SQL의 distinct count라고 이해하면 될 것 같다
- 일반적으로는 [범주형 데이터]()에서 유니크한 데이터를 확인할 경우 많이 사용한다

> 다음은 메트직 집계를 사용한 카디널리티 집계 요청을 살펴보자

## ✔ 3-8 메트릭 집계: 필드의 유니크한 값 개수 확인

### 필드의 유니크한 값 개수 확인하기: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
	"size": 0,
	"aggs": { // 집계 표시
		"cardi_aggs": { // 집계명
			"cardinality": {
				"field": "day_of_week",
				"precision_threshold": 100 // 기본값: 3000, 최대 40000까지
			}
		}
	}
}
```

- day_of_week 필드의 유니크한 데이터를 개수를 요청한다
- **precision_threshold** 파라미터는 정확도 수치라 이해하면 된다
- 값이 크면(리소스 많이 소모) 정확도가 정확하고, 낮으면 정확도가 낮아진다

## ✔ 4-1 메트릭 집계: 필드의 유니크한 값 개수 확인

### 필드의 유니크한 값 개수 확인하기: 결과

```json
{
  "took": 1,
  // ..중략
  "aggregations": {
    "cardi_aggs": {
      "values": 7
    }
  }
}
```

- 해당 사진에서의 **value**는 **요일의 개수**(**결과값**)를 의미한다
- 카디널리티는 매우 적은 메모리(memory)로 집합의 원소 개수를 추정할 수 있다
  - [HyperLogLog++ 알고리즘](../add_exp/README.md)을 사용
- 또한, **precision_threshold** 값은 **실제 결과값보다 크게** 잡아야한다

## ✔ 4-2 메트릭 집계: 용어 집계 ( term )

> 버킷 집계의 일종인 용어 집계(terms)를 사용하면 유니크한 필드 개수와  
> 함께 **필드값들을 확인할 수 있다**

### 용어 집계 요청: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
	"size": 0,
	"aggs": {
		"cardi_aggs": {
			"terms": {
				"field": "day_of_week"
			}
		}
	}
}
```

- 주목할 부분은 집계 타입이 "**cardinality**"에서 "**terms**"로 변경 된 부분이다🚀

## ✔ 4-3 메트릭 집계: 용어 집계 ( term )

```json
{
  // ..중략
  "aggregations": {
    "cardi_aggs": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "Thursday", // day_of_week 필드의 유니크한 값(value)
          "doc_count": 775 // 유니크한 필드를 가진 도큐먼트의 개수
        },
        {
          "key": "Friday",
          "doc_count": 770
        } // ...중략
      ]
    }
  }
}
```

- 필드 내의 **유니크한 값**(**Friday**)을 보여주면서 **도큐먼트 개수**도 보여준다

## ✔ 4-4 메트릭 집계: 검색 결과 내에서의 집계

**이번 Chpater**에서는 **쿼리**(**Query**)**와 함께** **집계**(**Aggregation**)**를 사용하는 방법**을 알아본다. 가령 **day_of_week**가 "**Monday**"인 도큐먼트만으로 **메트릭 집계를 수행**한다고 생각해보자. **집계 작업을 하기전**에 특정 도큐먼트만 선별하고 그 결과를 토대로 집계 작업을 수행해야 할 것이다. 4장(쿼리 컨텍스트, 필터 컨텍스트 등)에서 배운 쿼리를 이용해 필요한 도큐먼트를 먼저 검색 후 이를 바탕으로 집계를 수행한다. **REST API를 요청**해보자

## ✔ 4-5 메트릭 집계: 쿼리를 이용해 집계 범위 지정: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "query": {
    "term": {
      "day_of_week": "Monday"
    }
  },
  "aggs": {
    "query_aggs": {
      "sum": {
        "field": "products.base_price"
      }
    }
  }
}
```

- 집계 전 "**query**"를 사용하여 도큐먼트의 범위를 제한 하였다
- **day_of_week**가 "**Monday**"인 **도큐먼트의 products.base_price의 합계**를 구한다

## ✔ 4-6 메트릭 집계: 쿼리를 이용해 집계 범위 지정: 결과

```json
{
  //..중략
  "aggregations": {
    "query_aggs": {
      "value": 45457.28125
    }
  }
}
```

1. 월요일인 도큐먼트를 대상의 집계 범위를 좁힌다
2. 전체 도큐먼트(4675개) -> 579개의 도큐먼트가 query를 통해 구분이 된다
3. 579개의 도큐먼트를 대상으로 집계를 수행한 결과값 -> **45457.28125**

## 📌 5-1 버킷 집계

### 버킷 집계 용도

- **메트릭 집계**는 **특정 필드를 기준으로 통곗값을 계산하려는 목적**이다
- **버킷 집계**는 **특정 기준에 맞춰서 도큐먼트를 그룹핑하는 역할**을 한다.

#### [RDB 에서의 GROUP BY](https://extbrain.tistory.com/56)

```SQL
SELECT type, COUNT(name) AS cnt FROM hero_collection GROUP BY type
```

## ✔ 5-2 버킷 집계

### 버킷 집계 예제

![https://user-images.githubusercontent.com/53969142/149649090-bc5ed9c5-5afa-4e0d-9d60-fa546782e91e.PNG](https://user-images.githubusercontent.com/53969142/149649090-bc5ed9c5-5afa-4e0d-9d60-fa546782e91e.PNG)

- 그림 5.8은 데이터를 **요일별**로 구분 하였다
- 이렇듯 특정 목적으로 도큐먼트를 **그룹핑** 하고 싶을 때 버킷 집계를 사용한다
- 또한, 버킷으로 도큐먼트를 구분한 후 메트릭 집계와 혼합해 사용이 가능하다-

| 버킷 집계             | 설명                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **histogram**         | 숫자 타입 필드를 일정 간격으로 분류                                                                   |
| **date_histogram**    | 날짜/시간 타입 필드를 일정 날짜/시간 간격으로 분류                                                    |
| **range**             | 사용자가 원하는 범위로 숫자 타입 필드를 뷴류                                                          |
| **date_range**        | 사용자가 원하는 날짜/시간 간격으로 분류                                                               |
| **terms**             | 필드에 많이 나타나는 용어(값)들을 기준으로 분류                                                       |
| **significant_terms** | terms 버킷과 유사하나 모든 값 대상이 아닌 현재 검색 조건에서 통계적으로 유의미한 값들을 기준으로 분류 |
| **filters**           | 각 그룹에 포함시킬 문서의 조건을 직접 지정, 조건은 일반적으로 검색에 사용되는 쿼리와 동일             |

## ✔ 5-3 히스토그램 집계 ( type: histogram, date_histogram )

### 히스토그램 집계 요청: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "histogram_aggs": { // 집계명
      "histogram": { // 집계 타입
        "field": "products.base_price",
        "interval": 100
      }
    }
  }
}
```

- 위 쿼리에서 주요하게 봐는 키워드는 "**histogram**", "**interval**"이다
- interval은 간격을 지정하는 파라미터다

## ✔ 5-4 히스토그램 집계 ( type: histogram, date_histogram )

### 히스토그램 집계 요청: 결과

```json
GET kibana_sample_data_ecommerce/_search
"aggregations" : {
    "histogram_aggs" : {
      "buckets" : [
        {"key" : 0.0, "doc_count" : 4672},
        {"key" : 100.0, "doc_count" : 26},
        {"key" : 200.0, "doc_count" : 12},
        {"key" : 300.0, "doc_count" : 1},
        //..중략
        {"key" : 1000.0, "doc_count" : 1}
      ]
    }
  }
```

- 위 쿼리에서 "**key**"는 5-3에서 지정한 interval(간격)을 의미한다
- 0.0 ~ 99, 100 ~ 199, 200 ~ 299.. 순으로 데이터를 출력한다
- 날짜 히스토그램 집계(**date_histogram**)는 간격이 날짜/시간이라는 차이점이 있다

## ✔ 5-5 범위 집계 ( type: range, date_range )

### 범위 집계 요청: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "range_aggs": {
      "range": {
        "field": "products.base_price",
        "ranges": [
          {"from": 0, "to": 50},
          {"from": 50, "to": 100},
          //..중략
        ]
      }
    }
  }
}
```

- 범위 집계는 사용자가 범위를 지정할 수 있다

```json
"aggregations" : {
    "range_aggs" : {
      "buckets" : [
        {
          "key" : "0.0-50.0",
          "from" : 0.0,
          "to" : 50.0,
          "doc_count" : 4341
        },
        //..중략
        {
          "key" : "200.0-1000.0",
          "from" : 200.0,
          "to" : 1000.0,
          "doc_count" : 13
        }
      ]
    }
  }
```

- 데이터가 없으면 **병합**하여 데이터를 보여준다
- 데이터가 많은 **구간**은 세분화하여 보여준다

## ✔ 5-6 용어 집계 ( type: terms )

### 용어 집계 요청: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "term_aggs": {
      "terms": {
        "field": "day_of_week",
        "size": 10
      }
    }
  }
}
```

## ✔ 5-6 용어 집계 ( type: terms )

```json
"aggregations" : {
    "term_aggs" : {
      "doc_count_error_upper_bound" : 0, // 집계 수행 시 발생한 오류
      "sum_other_doc_count" : 0, // 반환된 버킷에 포함되지 않는 Document 수
      "buckets" : [ // 집계 결과로 반환된 버킷 목록
        {
          "key" : "Thursday",
          "doc_count" : 775 // grouping 된 개수?
        },
        {
          "key" : "Friday",
          "doc_count" : 770
        },
        //...중략
        {
          "key" : "Monday",
          "doc_count" : 579 // 해당 버킷에 들어있는 도큐먼트(Document)의 개수
        }
      ]
    }
  }
```

## ✔ 5-7 용어 집계가 정확하지 않은 이유

### 문제점

- 분산 시스템 과정에서 발생하는 잠재적인 오류 가능성
- 분산 시스템에서는 데이터를 여러 노드에서 분산하고 취합한다
- 위 같은 과정에서 오류가 발생할 수 있다

## ✔ 5-8 용어 집계

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "term_aggs": {
      "terms": {
        "field": "day_of_week",
        "size": 6,
        "show_term_doc_count_error": true
      }
    }
  }
}
```

- "**show_term_doc_count_error**": **true**
- 위 키워드를 통해 버킷마다 에러를 확인할 수 있다

## 📌 6-1 집계의 조합

### 집계 조합 방법

- RDB에서 GROUP BY를 통해 그룹핑 후 통계 함수를 이용하는 것처럼  
  버킷 집계와 메트릭 집계를 조합하여 다양한 그룹별 통계를 계산

### 버킷 집계와 메트릭 집계 혼합 사용 방법

- 버킷 집계로 도큐먼트를 그룹핑한 후 버킷 집계별 메트릭 집계 사용

## ✔ 6-2 버킷 집계 후 메트릭 집계 요청: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "term_aggs": {
      "terms": {
        "field": "day_of_week",
        "size": 5
      },
      "aggs": {
        "avg_aggs": {
          "avg": {
            "field": "products.base_price"
          }
        }
      }
    }
  }
}
```

- 버킷 집계로 도큐먼트를 그룹핑하고 메트릭 집계로 통계를 구한다

## ✔ 6-2 버킷 집계 후 메트릭 집계 요청: 결과

```json
"aggregations" : {
    "term_aggs" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 1171,
      "buckets" : [
        {
          "key" : "Thursday",
          "doc_count" : 775,
          "avg_aggs" : {
            "value" : 34.68040897713688
          }
        },
        //..중략
        {
          "key" : "Sunday",
          "doc_count" : 614,
          "avg_aggs" : {
            "value" : 35.27872066570881
          }
        }
      ]
    }
  }
```

- **avg_aggs**: 요일별 product_base_price의 평균치

## ✔ 6-3 서브 버킷 집계

- 버킷 안에서 다시 버킷 집계를 요청하는 집계
- 즉, 버킷 집계로 버킷을 생성한 후, 버킷 내부에서 다시 버킷 집계를 한다
- 트리구조를 떠올리면 된다

## ✔ 6-4 서브 버킷 생성 요청: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "histogram_aggs": {
      "histogram": {
        "field": "products.base_price",
        "interval": 100
      },
      "aggs": {
        "term_aggs": {
          "terms": {
            "field": "day_of_week",
            "size": 2
          }
        }
      }
    }
  }
}
```

- products.base_price 필드를 100단위로 구분

## ✔ 6-5 서브 버킷 생성 요청: 결과

```json
"buckets" : [ // 서브 버킷은 2단계를 초과해 사용하면 좋지 않다
        {
          "key" : 0.0, // 범위 ( histogram )
          "doc_count" : 4672, // 해당 버킷 내에서 존재하는 doc 개수
          "term_aggs" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 3128,
            "buckets" : [
              {
                "key" : "Thursday",
                "doc_count" : 775
              },
              {
                "key" : "Friday",
                "doc_count" : 769
              }
            ]
          }
        },
        //..중략
```

- 6-4 절에서 product_base_price를 100단위로 구분

## 📌 7-1 엘라스틱 파이프라인 집계

- 이전 집계로 만들어진 결과를 입력으로 삼아 다시 집계하는 방식
- 이 과정에서는 **부모 집계**, **형제 집계** 두 가지 유형이 존재한다
- 두 집계의 차이는 집계가 작성되는 **위치**

> 다음 예제를 통해 어떤 위치의 차이가 있는지 확인 해보자

#### 부모 집계

```json
{
  "aggs": {
    "aggs": {
      ...
      "부모 집계" // 기존 집계 결과를 이용해 새로운 집계를 생성. 결과는 기존 집계 내부에서 나온다
    }
  }
}
```

#### 형제 집계

```json
{
  "aggs": {
    "aggs": {
      ...
    },
    "형제 집계" // 기존 집계를 참고해 집계를 수행, 결과는 집계와 동일선상에서 나온다
  }
}
```

![pip_aggregation](https://user-images.githubusercontent.com/53969142/149651289-08e5c689-30c6-409c-93b9-eb1a75b15c5d.PNG)

- 파이프라인 옵션은 위 사진을 참고

## ✔ 7-2 부모 집계

- 부모 집계는 단독으로 사용이 불가능하며 반드시 다른 집계가 있어야 하며  
  해당 집계 결과를 부모 집계가 사용한다
- 부모 집계는 이전 집계 내부에서 실행한다

> 다음은 누적합을 구하는 부모 집계를 생성 해보자

## ✔ 7-3 누적합을 구하는 부모 집계 생성: 실행

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "histogram_aggs": {
      "histogram": {
        "field": "products.base_price",
        "interval": 100
      },
      "aggs": {
        "sum_aggs": {
          "sum": {
            "field": "taxful_total_price"
          }
        },
        "cum_sum": {
          "cumulative_sum": {          // 누적합 계산
            "buckets_path": "sum_aggs" // 이전 집계를 지정
          }
        } // 부모 집계
      }
    }
  }
}
```

## ✔ 7-4 형제 집계: 실행

- 형제 집계는 기존 집계 내부가 아닌 외부에서 기존 집계를 이용해 집계 작업

```json
GET kibana_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "term_aggs": {
      "terms": {
        "field": "day_of_week",
        "size": 2
      },
      "aggs": {
        "sum_aggs": {
          "sum": {
            "field": "products.base_price"
          }
        }
      }
    },
    "sum_totla_price": {
      "sum_bucket": {
        "buckets_path": "term_aggs>sum_aggs"
      }
    }
  }
}
```

## ✔ 7-5 형제 집계: 결과

```json
"aggregations" : {
    "term_aggs" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 3130,
      "buckets" : [
        {
          "key" : "Thursday",
          "doc_count" : 775,
          "sum_aggs" : {
            "value" : 58020.32421875
          }
        },
        {
          "key" : "Friday",
          "doc_count" : 770,
          "sum_aggs" : {
            "value" : 58341.9765625
          }
        }
      ]
    },
    "sum_totla_price" : {
      "value" : 116362.30078125
    }
  }
```

### 참고 자료

- [엘라스틱스택 개발부터 운영까지](http://www.yes24.com/Product/Goods/103030516) 📌
