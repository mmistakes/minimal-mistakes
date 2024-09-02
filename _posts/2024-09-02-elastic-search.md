---
layout: single
title: '[Elastic Search] Elastic Search 란?'
categories: Elastic Search
tag: [Elastic Search]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

모든 검색엔진의 시초인 루씬(Lucene)을 기반으로 한 Elastic Search는 검색엔진이자 분산저장소이다. 2010년에 릴리스되기 시작한 이후 지금은 검색엔진 분야에서 지배적인 위치에 있다. 

<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-09-02-elastic-search\db_engine_rank.png" alt="Alt text" style="width: 100%; height: 100%; margin: 10px">
</div>

## Elasticsearch

Elasticsearch는 일반적으로 JSON 형식의 데이터를 저장하며 루씬 기반으로 개발되어있어 방대한 양의 데이터를 신속하게(거의 실시간) 저장, 검색, 분석을 수행할 수 있다. 

Elasticsearch는 로그 파일 관리나 실시간 검색 서비스 등과 같이 대용량 데이터를 빠르게 처리해야 하는 경우 유용하게 사용될 수 있다. 검색 엔진으로 단독으로 사용되기도 하며, ELK(Elasticsearch / Logstash / Kibana) 스택으로 사용되기도 한다. 

<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-09-02-elastic-search\elk.png" alt="Alt text" style="width: 80%; height: 80%; margin: 10px">
</div>


## ES vs RDBMS


Elasticsearch는 어플리케이션 검색, 어플리케이션 성능 모니터링, 로깅과 로그 분석 등 다양한 분야에 사용된다.

기존 RDBMS 기반의 어플리케이션은  LIKE 연산, 즉 패턴 매칭으로 데이터를 탐색할 것이다. 이 방식은 테이블에 저장된 모든 데이터를 탐색하며 해당 컬럼의 데이터가 주어진 패턴과 일치하는지 여부를 따져보면서, 결과를 필터링하며,  like 검색은 동의어나 유의어에 대해선 지원해주지 않는다.

물론 MySQL 5.7 버전부터 Full-Text Search 기능을 제공하며, 이는 특정 칼럼의 데이터 안에 있는 단어들을 인덱싱해준다. 엘라스틱서치가 각 단어를 개별적인 토큰 단위로 인덱싱하는 반면, MySQL의 Full-Text Search는 여러 단어(토큰)를 하나의 인덱스에서 관리하여 검색을 수행한다. 
이로 인해, MySQL은 전체 문장의 검색 정확도와 관련된 기능은 제공하지만, 엘라스틱서치만큼의 세밀한 토큰화 및 고급 텍스트 분석 기능은 제한적일 수 있다.


<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-09-02-elastic-search\es_vs_rdbms.png" alt="Alt text" style="width: 30%; height: 30%; margin: 20px">
</div>

## 역 인덱스(inverted index)

Elasticsearch는 인덱스를 사용하여 텍스트 데이터를 인덱싱하고 검색한다. 각 문서의 텍스트를 분석하여 개별 토큰(단어)으로 분리하고, 이를 역 인덱스로 저장한다. Elasticsearch는 텍스트 데이터를 다양한 방식으로 토큰화하여 저장하는데, 예를 들어, "고양이가 뛰고 있다"라는 문장이 주어지면 이를 "고양이", "뛰", "있다"와 같은 토큰으로 분리하여 각각의 토큰에 대해 역 인덱스를 생성한다.

이때 '고양이'라는 단어가 5번째, 1,000번째, 10,000번째 도큐먼트에서 등장한다고 가정해보자. 일반적인 RDBMS에서는 LIKE '%고양이%'로 검색할 때, 해당 단어를 찾기 위해 처음부터 10,000번째 행까지 모든 데이터를 탐색해야 한다. 반면, 역 인덱스 구조에서는 '고양이'라는 키워드에 연결된 인덱스만 참조하면, 그 단어가 포함된 도큐먼트를 즉시 찾을 수 있다. 이는 검색 속도를 크게 향상시키며, 특히 대규모 데이터베이스에서 매우 효율적이다.

<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-09-02-elastic-search\inverted_index.png" alt="Alt text" style="width: 70%; height: 70%; margin: 20px">
</div>



## Elasticsearch 장단점

### 장점
- 오픈소스 및 커뮤니티 지원: 활발한 오픈소스 커뮤니티가 지속적으로 ES를 개선 및 발전시키고 있어, 최신 기능과 버그 수정이 빠르게 이루어진다.
- 통계 분석 기능: 비정형 데이터를 수집하고 통계 분석에 활용할 수 있다. Kibana와의 연동을 통해 실시간으로 데이터 시각화가 가능하다.
- Schemaless: 정형화되지 않은 데이터도 자동으로 색인 및 검색할 수 있어 데이터 구조에 대한 유연성이 높다.
- RESTful API: HTTP 기반 RESTful API를 통해 다양한 플랫폼에서 쉽게 사용할 수 있으며, JSON 형식으로 데이터를 주고받아 호환성이 높다.
- 역색인(Inverted Index): 빠르고 효율적인 검색을 가능하게 하는 기본 구조로, 대량의 데이터에서도 신속한 검색이 가능하다.
- 확장성: 분산 환경에서 샤드를 통해 데이터 확장이 가능하여, 대규모 데이터를 처리할 수 있다.

### 단점 
-  근 실시간 (NRT) 검색 : 데이터 색인이 완료된 후 약 1초의 지연이 발생할 수 있으며, 이는 내부적으로 복잡한 commit과 flush 과정 때문이다.
- 트랜잭션 롤백 미지원: 성능 최적화를 위해 트랜잭션 롤백 기능을 지원하지 않으므로, 데이터 무결성에 대한 관리가 필요합니다.
- 데이터 업데이트 제약: 업데이트 시 기존 문서를 삭제하고 새로운 문서를 생성하는 방식으로, 비용이 많이 들고 실시간 업데이트에 불리하다. 이를 통해 불변성(Immutable)의 장점을 가지지만, 자원 소모가 크다.

<br>
<br>

----
Reference

- <a href = 'https://jaemunbro.medium.com/elastic-search-%EA%B8%B0%EC%B4%88-%EC%8A%A4%ED%84%B0%EB%94%94-ff01870094f0'>[Elastic Search] 기본 개념과 특징(장단점)</a>
- <a href = 'https://hstory0208.tistory.com/entry/ELK-ElasticSearch%EB%9E%80-ELK%EB%9E%80-%EC%9E%A5%EB%8B%A8%EC%A0%90-RDB%EC%99%80-%EC%B0%A8%EC%9D%B4
'>[ELK] ElasticSearch란? ELK란? 내부 구조, 장단점, RDB와 차이</a>
- <a href = 'https://jaemunbro.medium.com/elastic-search-%EA%B8%B0%EC%B4%88-%EC%8A%A4%ED%84%B0%EB%94%94-ff01870094f0'>[Elastic Search] 기본 개념과 특징(장단점)</a>
- <a href = 'https://sihyung92.oopy.io/database/elasticsearch/1'>Elasticsearch에 대해 알아보자!</a>

