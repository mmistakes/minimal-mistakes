---
layout: single
title: "[Elasticsearch] Elastic Stack Study 1th"
date: "2022-01-04 02:08:43"
categories: Elastic Stack
tag: [Elastic Stack, Company Study]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## 📌 1.1 엘라스틱서치의 탄생

> 엘라스틱 서치가 처음 등장했을 때 어느 누구도 빅데이터 파이프라인을 구성하는  
> 플랫폼 형태로 성장하리라 예상하기는 어려웠을 것이다.

### ✔ 클라이언트의 요구사항

- 엘라스틱 서치가 등장했을 때 사용자의 요구사항은 명확
- 사이트 내에 전문 검색 기능을 추가하는 것

### ✔ 현 시점의 문제점

- 인터넷 검색 서비스가 계속해서 등장 하였지만 구현체를 공개하지 않음
- 기업 내에서 대량의 DB나 값 비싼 솔루션에 의지

### ✔ 새로운 검색 엔진의 등장

- 1999년 하둡의 창시자 더그 커팅의 <u>다섯 번째 검색 엔진을 개발</u>
- 부인의 이름을 딴 루씬(Lucene) 개발

### 🕐 루씬의 기원

- `2001`년 아파치 자카르타에 합류
- `2005`년 `2월` 독자적 아파치 프로젝트로 분류
- `2003년` `6월` 더그 커팅은 100만 페이지를 가져오는 웹크롤러 개발
  - 너치(Apache Nutch)
  - 루씬의 위력을 다시 한번 증명
- 이러한 너치는 맵리듀스 기능과 분산 파일 시스템 기반으로 만들어짐
  - <u>하둡의 시초</u>

### ✔ 루씬의 문제점 해결

- 루씬은 라이브러리 형태이기에 제대로 사용하기위해 해야 할 작업이 상담함
- 2006년 기술 잡지사 CNET 네트워크에서 2004년 검색 엔진 소스 코드를 아파치 재단에 기부
  - 솔라
- 또한, CNET 네트워크가 솔라를 개발하고 있을 시점..
  - 샤이배넌은 요리 학교를 다니던 자신의 부인이 손쉽게 레시피를 검색하기를 원함
  - 2010년 엘라스틱 서치 발표
    - HTTP 상 JSON 인터페이스 지원
    - 다양한 P/G 언어 지원

## 📌 1.2 엘라스틱 스택으로 발전

> 비츠 -> 로그스태시 -> 엘라스틱 서치 -> 키바나

- 데이터를 수집, 가공, 저장, 분석, 시각화하는 일련의 파이프라인을 구성하기 위해  
  다양한 오픈소스 소프트웨어를 조합해야 하는 불편함이 존재
- 엘라스틱은 이 지점에서 해법을 제시하고 간편하게 빅데이터 파이프라인을 구성하고 싶은  
  기업의 요구사항을 충족하기위한 스택을 개발

### ✔ 엘라스틱서치가 개발될 무렵

- 두 가지 오픈소스 프로젝트가 추가로 진행중
  - 👨 요르단 시셀 : 로그스태시 개발
  - 🧑 라시드 칸 : 키바나 개발
- 👦 샤이 배넌은 두 사람과 친분이 있었기에 팀을 결성, 엘라스틱 스택을 개발
- 초창기에는 느슨한 형태로 개발 및 버전 관리 진행
  - 많은 문제점 발생
- <u>2015년 10월 버전을 동일하게 맞춘 제품을 출시하여 안정성 확보</u>

## 📌 엘라스틱 스택의 구성요소

> 엘라스틱 스택은 데이터 수집, 가공, 저장, 분석, 시각화에 필요한 모든 S/W를 갖춘다

- **비츠 & 로그 스태시**
  - 데이터를 수집 및 가공
- **엘라스틱 서치**
  - 저장 및 분석
- **키바나**
  - 엘라스틱 서치에 저장된 데이터 시각화 및 모니터링
- <u> 필요에 따라서 키바나 제외, 엘라스틱 스택의 나머지 구성요소로 파이프라인 구축 가능</u>

### ✔ 엘라스틱서치: 분산 검색 엔진

- Near Real Time 거의 실시간 검색이 가능 (1초?)
- 검색엔진은 내부적으로 각 도큐먼트를 인덱싱하고 빠르게 검색하는 기술
- 엘라스틱 서치는 모든 레코드를 JSON 도큐먼트 형태로 입력 및 관리
  - 일반적인 RDB와 마찬가지로 쿼리에 일치한 <u>원본 도큐먼트</u>를 반환
- RDB와는 다르게 데이터 타입에 대해 최적화가 되있다 (타입의 유연함)
  - 숫자
  - 날짜
  - IP 주소
  - 지리 정보 등

### ✔ 엘라스틱서치: 특징

- 엘라스틱 서치는 텍스트 및 도큐먼트
  - 인덱싱 시점에 분석을 거쳐 용어 단위로 분해 후 역인덱스 사전 구축
- 숫자 및 키워드 타입 데이터
  - 집계를 위해 집계에 최적화된 컬럼 기반 자료구조로 저장
- <u>위 같이 저장된 데이터를 병렬 처리 및 분산 처리</u>
- <u>스코어링, 즉 연관도에 따른 정렬</u>
  - 검색어에 대한 유사도 스코어 기반 정렬 제공

### ✔ 키바나: 시각화 및 엘라스틱서치 관리 도구

> Browser, curl 등등..

- 엘라스틱 서치는 사용자의 입력을 REST API 형태로 받아들인다
- 하지만 복잡한 요청을 처리하기에는 한계가 있다
- 위와 같은 이유로 인해 나온것이 키바나(Kibana)

### ✔ 키바나: 특징

- 엘라스틱 스택의 UI를 담당(DashBoard)
- 엘라스틱에 대한 대부분의 관리 기능 탑재
  - API를 실행할 수 있는 콘솔
  - 솔루션 페이지
  - 스택별 모니터링 페이지
- <u>하지만 가장 중요한 기능은 시각화와, 대시보드</u>
  - 라인 차트
  - 파이 차트
  - 테이블
  - 지도 등

![https://user-images.githubusercontent.com/53969142/147950459-84a574c8-5939-4525-b20b-b5e96ae0251b.PNG](https://user-images.githubusercontent.com/53969142/147950459-84a574c8-5939-4525-b20b-b5e96ae0251b.PNG)

### ✔ 로그스태시: 이벤트 수집 및 정제

> 대량의 데이터를 검색하기 위해 가장 먼저 해야할 부분은 데이터 적재

![https://user-images.githubusercontent.com/53969142/147950644-c6ba338c-30af-4f40-95e9-9dca63eeb537.PNG](https://user-images.githubusercontent.com/53969142/147950644-c6ba338c-30af-4f40-95e9-9dca63eeb537.PNG)

- 위 사진은 로그 스태시의 동작 방식과 구성요소
- 다양한 소스(DataBase, csv 파일 등)의 <u>로그 또는 트랜잭션 데이터 수집</u>  
  수집한 데이터를 집계 및 파싱하여 Elasticsearch에게 전달
- 필터 기능을 이용하여 비정형, 반정형 데이터를 분석하기 쉬운 형태로 정제(변형)할 수 있다

### ✔ 로그스태시: 특징

- 확장 가능한 200개 이상의 플러그인
- 엘라스틱서치의 인덱싱 성능 최적화를 위한 배치 처리 및 병렬 처리 가능
- 영속 큐(Queue)방식을 사용, 현재 처리중인 이벤트 최소 1회 전송 보장

### ✔ 비츠: 엣지단에서 동작하는 경량 수집 도구

![https://user-images.githubusercontent.com/53969142/147951426-8818e7f2-078b-46c7-bfb6-884680188087.PNG](https://user-images.githubusercontent.com/53969142/147951426-8818e7f2-078b-46c7-bfb6-884680188087.PNG)

> 로그스태시의 기능은 충분히 강력하다. 하지만 무겁다  
> 그래서 경량 수집기인 파일비트, 메트릭비트을 사용

- 각 비츠는 로그 수집, 시스템 지표 수집 등 특정 목적에 최적화되었으며  
  가볍기로 유명한 GoLang으로 작성됨
- 대부분 비츠와 로그스태시를 혼합해 많이 사용

### ✔ 기타 솔루션

- APM
- SIEM
- 인프라 모니터링 솔루션

## 📌 엘라스틱 스택의 용도

> 시간이 길어질 것 같아 상세한 부분은 생략하였습니다.

- 엘라스틱 스택은 다양한 목적으로 사용이 가능하다
- 현재 다양한 회사에서 다양한 서비스를 지탱하는 핵심 기반 기술로 자리 잡고 있으며  
  검색 엔진, 각종 로그 분석, 머신러닝까지의 다양한 스펙트럼 자랑

### ✔ 전문 검색 엔진

- 도큐먼트가 많지 않다면 일반적인 RDB의 LIKE 질의만으로도 충분히 검색이 가능
- 만약에 그렇지 않다면?
- <u>도큐먼트가 100000개라면?</u>

![https://user-images.githubusercontent.com/53969142/147952248-7bab03f1-269f-4b5f-86e2-9f16bba7a09a.jpg](https://user-images.githubusercontent.com/53969142/147952248-7bab03f1-269f-4b5f-86e2-9f16bba7a09a.jpg)

- 위 같은 이유로 인해 빠르고 정확한 검색을 지원하는 엘라스틱 서치 사용을 지양하는것을 권장

### ✔ 로그 통합 분석

![https://user-images.githubusercontent.com/53969142/147952785-18a10e54-dca8-48e0-93f6-0da9541f8ddd.PNG](https://user-images.githubusercontent.com/53969142/147952785-18a10e54-dca8-48e0-93f6-0da9541f8ddd.PNG)

- 복수의 서비스가 연계되어 동작하는 상황에서 로그의 발생 위치를 모두 기억해야 한다면?
  - 해당 서비스 로그(Log)를 일일이 찾아서 확인해야한다
  - tail 명령어로 찾는것도 한계가 있음
- <u>엘라스틱 스택은 여러 서비스에서 발생하는 로그들을 통합하고 검색하는데 최적화된 솔루션이다</u>
- 즉, 다양한 플랫폼에서 발생하는 로그를 수집할 수 있다
- 비츠(경량화 수집기)를 통해 로그를 빠르게 수집 후 로그스태시의 다양한 필터를 통해 데이터 수집

### ✔ 보안 이벤트 분석

![https://user-images.githubusercontent.com/53969142/147953512-cd593845-e695-4f92-b7dd-1f952e3c80b8.PNG](https://user-images.githubusercontent.com/53969142/147953512-cd593845-e695-4f92-b7dd-1f952e3c80b8.PNG)

- 조직 내의 다양한 장비들로부터 보안 이벤트 수집 및 분석

### ✔ 애플리케이션 성능 분석

![https://user-images.githubusercontent.com/53969142/147953998-c3745f52-7b2b-4cb3-8c0e-e96386734ce3.PNG](https://user-images.githubusercontent.com/53969142/147953998-c3745f52-7b2b-4cb3-8c0e-e96386734ce3.PNG)

- 애플리케이션을 운영하는 데 있어 가장 중요한 것 중 하나는 안정적인 서비스 운영
- 이를 위해 필연적으로 단순히 하나가 아닌 여러개의 애플리케이션의 상태를 모니터링 해야 한다
- 엘라스틱 스택의 APM은 프로그래밍 언어별 에이전트를 통해 성능 지표 수집 및 분석 UI 제공

## 📌 빅데이터 플랫폼의 일부로 동작하는 엘라스틱 스택

> 엘라스틱 스택은 간편하게 빅데이터 파이프라인을 구성하고 싶은 기업의 요구사항을  
> 충족하기 때문에 인기를 끌고 있다. 그렇다면 다수의 기업에서 어떻게 사용을 하고 있을까?

- [우버(Uber)](https://www.ut.taxi/kr/ko/)
  - 대규모 실시간 데이터 통찰 플랫폼 [가이로스](https://zzsza.github.io/data/2021/03/14/gairos-scalability/)를 구축
  - 가격 책정
  - 최대 ETA(도착 예정 시간) 계산
  - 수요/공급 예측

> 가이로스에 대한 부분은 정리가 되지 않아 참고 링크를 걸어두었습니다

### ✔ 엔터프라이즈 데이터 버스인 카프카와 연동

- [아파치 카프카](https://www.redhat.com/ko/topics/integration/what-is-apache-kafka)는 분산 환경에서 사용되는 데이터 스트리밍 플랫폼
- 카프카와 엘라스틱 스택은 데이터 수집 시점에서 많이 연계되어 사용이 된다
- 아래 예시를 통해 살펴보자

![https://user-images.githubusercontent.com/53969142/147955344-8e554bdb-f6fe-420d-adee-c581aa6e978b.PNG](https://user-images.githubusercontent.com/53969142/147955344-8e554bdb-f6fe-420d-adee-c581aa6e978b.PNG)

1. 비츠에서 수집한 각 장비의 이벤트를 카프카로 전송
2. 로그스태시가 해당 정보를 다시 읽어들인다
3. 마지막에 엘라스틱서치가 읽어들인다

### ✔ 관계형 데이터베이스와의 연동

![https://user-images.githubusercontent.com/53969142/147956220-e4484ce4-daea-43e3-80ed-8234fb7d6431.PNG](https://user-images.githubusercontent.com/53969142/147956220-e4484ce4-daea-43e3-80ed-8234fb7d6431.PNG)

- 로그스태시는 JDBC 입력 플러그인, 필터 등 RDB와 연계할 수 있는 다양한 방법 제공
- 기존 RDB에 저장된 데이터를 인덱싱하거나 입력받는 이벤트 정보 주입 용도로 사용
- RDB에 저장된 데이터를 엘라스틱서치로 이전할 경우, 엘라스틱 스택의 우수한 성능을 이용해  
  RDB로는 처리가 힘든 <u>집계</u>도 쉽게 처리할 수 있다

## 📌 Elasticsearch 개념 정리

> Elasticsearch의 중요 키워드를 정리 하였습니다.

### ✔ 인덱싱(색인)

- 데이터가 검색될 수 있는 구조로 변경
- 원본 문서를 검색어 토큰으로 변환하여 저장하는 과정

### ✔ 인덱스(index, indexies)

- 도큐먼트의 논리적인 집합을 표현하는 단위
- 색인된 데이터가 저장되는 저장소
- RDB에서의 데이터베이스를 생각

### ✔ 검색(search)

- <u>인덱스에 들어있는 **검색어 토큰**들을 포함하고 있는 문서를 찾아가는 과정</u>

### ✔ 질의(query)

- 문서를 찾거나 집계 결과를 알기 위해 사용하는 검색어 또는 조건

## 📌 Elasticsearch architecture

![https://user-images.githubusercontent.com/53969142/147385889-1469c38b-ab3a-447b-95dc-631bf9c3229e.PNG](https://user-images.githubusercontent.com/53969142/147385889-1469c38b-ab3a-447b-95dc-631bf9c3229e.PNG)

### ✔ 클러스터 ( cluseter )

- 최소 하나 이상의 **노드(서버)**로 구성된 **시스템 단위**
- 서로 다른 클러스터는 **독립적인 시스템**으로 유지, 데이터 접근 및 교환이 불가능
- 여러대의 서버가 하나의 클러스터 구성 가능, 하나의 서버가 여러개의 클러스터 구성 가능

### ✔ [노드(node)](https://esbook.kimjmin.net/03-cluster/3.3-master-and-data-nodes)

- 클러스터 내에 존재하는 **노드(서버)**
- Elasticsearch를 구성하는 **하나의 단위 프로세스**를 의미
- 노드는 역할에 따라 구분이 된다, 아래 내용을 살펴보자

## 📌 Master Node

- **클러스터 제어 및 관리**
- **인덱스 생성 및 삭제**
- **어떤 샤드에 데이터를 할당할지 결정**

## 📌 Data Node

- 실제로 색인된 데이터를 저장하고 있는 노드
- 클러스터에서 마스터 노드와 데이터 노드를 분리하여 설정 가능

### ✔ Divide Master and Data node-1

```bash
# config/elasticsearch.yml
1 node.master: true
2 node.data: false
```

### ✔ Divide Master and Data node-2

```bash
# config/elasticsearch.yml
1 node.master: false
2 node.data: true
```

### ✔ Divide Master and Data node-3

```bash
# config/elasticsearch.yml
1 node.master: false
2 node.data: true
```

### ✔ Divide Master and Data node-4

```bash
# config/elasticsearch.yml
1 node.master: false
2 node.data: true
```

> 예시를 통해 마스터 노드와 데이터 노드를 분리하는 방법을 살펴보자

- 현재 node는 1번 부터 3번 node까지 생성했다 가정한다
- node-1은 마스터 역할만 수행하는 전용 노드
- node-2, 3는 마스터 역할은 하지않고 데이터 저장만 하는 노드로 설정

### ✔ Expectation

![https://user-images.githubusercontent.com/53969142/147402281-bb13f713-f9c9-4f2d-91d2-9c9662833c1e.PNG](https://user-images.githubusercontent.com/53969142/147402281-bb13f713-f9c9-4f2d-91d2-9c9662833c1e.PNG)

- 위 사진을 보면 하나의 클러스트로 모든 노드들을 묶는다
- 실제 데이터 입력 시 node-1에는 데이터가 들어가지 않고, node-2 ~ 4에만 데이터가 들어간다.

### ✔ Kibana Monitoring View

> 실제 운영 환경에서는 위 예제처럼 마스터 후보 노드를 1개만 설정하면 안되고  
> 최소 3개 이상의 홀수개로 설정해야 한다. 그 이유는 Split Brain 문제에서 설명하겠다.

- 대부분의 Elastic Stack 모니터링 도구에서 마스터 노드는 별( \* ) 표시로 구분한다

### ✔ Split Brain

- 마스터 후보 노드가 하나일 경우,**해당 노드**가 **유실**되면 클러스터 전체 작동이 정지될 위험이 있음
- 해당 이슈로 인해, 최소한 **백업용 노드**를 설정해야 한다
- 그러므로 **3개 이상의 홀수개**로 마스터 노드를 구성하는 것을 권장한다
- 만약 **마스터 후보 노드**를 **2개** 혹은 **짝수**로 운영하는 경우 네트워크 유실로 인해 아래 상황을 겪을 수 있다.

![https://user-images.githubusercontent.com/53969142/147402377-d00b8fbb-5998-4bf5-8432-7b8734f3462e.PNG](https://user-images.githubusercontent.com/53969142/147402377-d00b8fbb-5998-4bf5-8432-7b8734f3462e.PNG)

1. 위와 같이 **네트워크 단절**로 마스터 후보 노드인 node-1 과 node-2 가 분리
2. 서로 다른 클러스터로 구성되어 계속 동작하는 경우 발생
3. 이 상태에서 각자의 클러스터에 데이터 추가 및 변경
4. 네트워크가 복구 되고 하나의 클러스터로 합쳐졌을 때 **데이터 정합성** 및 **무결성 문제** 발생
5. 위 같은 문제를 Split Branin이라 지칭

### ✔ Split Brain 방지

> Split Branin의 방지를 위해서는 마스터 후보 노드를 3개로 두고 클러  
> 스터에 마스터 후보 노드가 최소 2개 이상 존재하고 있을 때에만 클러  
> 스터가 동작하고 그렇지 않은 경우 클러스터는 동작을 멈추도록 해야 한다.

### 6.x 이전 버전에서 사용하던 방식

```bash
# elasticsearch.yml
1 discovery.zen.minimum_master_nodes: 2
```

- minimum_master_nodes 값은 ( 전체 마스터 후보 노드 / 2 ) + 1로 설정
- 마스터 노드가 5개인 경우 3으로 설정

### 7.0 버전부터 사용하는 방식

```bash
# elasticsearch.yml
1 node.master: true
```

- 7.0 부터는 위 구문을 통해 `클러스터`가 스스로 `minimum_master_nodes 노드 값`을 변경하도록 패치

```bash
# elasticsearch.yml
cluster.initial_master_nodes: [ 'node-1' , 'node-2' ]
```

- 사용자는 위 구문을 통해 `최초 마스터 후보` 지정만 하면 된다
- 위 설정시 네트워크가 단절 되면 minimum_master_nodes가 `2 이상`인 클러스만 살아있는다

### ✔ [Ingest Node](https://m.blog.naver.com/olpaemi/222005459201)

```bash
# elasticsearch.yml
1 node.master: false
2 node.voting_only: false
3 node.data: false
4 node.ingest: true # node ingest 설정
5 node.ml: false
6 node.transform: false
7. node.remote_cluster_client: false
```

> 현재는 Elasticsearch의 큰 틀을 잡아야 하기에, 상단 링크를 참고하여 추후 정리하겠습니다

- 다양한 프로세서(Processors)로 `파이프라인`을 구성
- 순차적으로 데이터를 처리한 후 Elasticsearch에 `인덱싱`하도록 해준다

## 📌 [Shard / Replica](https://esbook.kimjmin.net/03-cluster/3.2-index-and-shards)

### ✔ Shard

- **데이터를 분산하여 저장하는 방식**
- <u>인덱스는 기본적으로 샤드(shard)라는 단위로 분리가 되어 각 노드에 분산 저장된다</u>
- 샤드는 루씬의 단일 검색 인스턴스
- 하나의 인덱스가 5개의 샤드로 저장되도록 설정한 예시

![https://user-images.githubusercontent.com/53969142/147402440-10d6457b-a812-4991-8981-a617a4fdd276.PNG](https://user-images.githubusercontent.com/53969142/147402440-10d6457b-a812-4991-8981-a617a4fdd276.PNG)

### ✔ 프라이머리 샤드(Primary Shard) 와 복제본 (Replica)

> 중간 점검 : 클러스터 > 노드(Node) > 인덱스(Index) → 분리 → 샤드(Shard) > 도큐먼트(Document)

- 인덱스 생성 시 별도의 설정이 없을 경우 7.0 부터는 디폴트로 1개의 샤드로 인덱스 구성
- 6.x 이하 버전에서는 디폴트로 5개의 샤드로 인덱스 구성
- 클러스터에 노드 추가 시 샤드들이 각 노드들로 분산되고 디폴트로 1개의 복제본 생성
- 위 같은 상황에서 `처음 생성된 샤드`를 `프라이머리 샤드`, 복제본은 `리플리카`라 지징한다.
- `클러스터`가 `4개의 노드`로 구성, 하나의 `인덱스`가 `5개의 샤드`로 구성,
- 총 10개의 샤드들이 전체 노드에 골고루 분배되어 저장이 된다.

![https://user-images.githubusercontent.com/53969142/147402547-1248f0fe-269d-4d31-a17b-01056631d8e6.PNG](https://user-images.githubusercontent.com/53969142/147402547-1248f0fe-269d-4d31-a17b-01056631d8e6.PNG)

> 노드가 1개만 있는 경우 프라이머리 샤드만 존재하고 복제  
> 본은 생성되지 않는다. 또한 Elasticsearch는 아무리 작은 클  
> 러스트라도 데이터 가용성과 무결성을 위해 최소 3개의 노드로  
> 구성 할 것을 권장하고 있다.

- 같은 샤드와 복제본은 동일한 데이터를 담고 있으며, 반드시 서로 다른 노드에 저장된다.
- 데이터 유실을 막기 위해 위 같은 방법을 사용
- node-3 가 죽는 경우, 클러스터는 유실된 노드가 복구 되기를 기다리다가 안되면 복제를 시작

### 참고 자료

- [Elasticsearch 개발부터 운영까지](http://www.yes24.com/Product/Goods/103030516) 📌
- [Elastic 가이드북(2.1 데이터 색인)](https://esbook.kimjmin.net/02-install/2.1) ✨
- [Elastic 가이드북(3.2 인덱스와 샤드)](https://esbook.kimjmin.net/03-cluster/3.2-index-and-shards) ✨
- [Elastic 가이드북(3.3 마스터 노드와 데이터 노드)](https://esbook.kimjmin.net/03-cluster/3.3-master-and-data-nodes) ✨
- [Elastic Stack 기본 개념](https://ym1085.github.io/elasticsearch/Elastic-Stack-%EA%B8%B0%EB%B3%B8%EA%B0%9C%EB%85%90/)
- [Elastic Stack 사용 사례](https://ym1085.github.io/elasticsearch/Elastic-Stack-%EC%82%AC%EC%9A%A9%EC%82%AC%EB%A1%80/)
