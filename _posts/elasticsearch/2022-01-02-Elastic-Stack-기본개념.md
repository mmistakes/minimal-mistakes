---
layout: single
title: "[Elasticsearch] Elastic Stack 기본 개념"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Logstash]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## 🔥 [Elasticsearch 개념](https://esbook.kimjmin.net/)

- Apache Lucene 기반의 Java Open Source 분산 검색 엔진
- Elasticsearch를 통해 루씬 라이브러리를 단독으로 사용 가능
- 방대한 양의 데이터를 실시간으로 저장, 검색, 분석 가능
- 검색을 위해 단독으로 사용되기도 하며, ELK 스택으로 사용되기도 함

### ✔ [데이터 색인](https://esbook.kimjmin.net/02-install/2.1)

> 동료 개발자들과 함께 Elasticsearch에 대한 얘기를 하는 와중에,  
> 색인에 대한 개념이 잡히지 않아 따로 정리를 한다.

### 색인 (Indexing)

- 데이터가 검색될 수 있는 구조로 변경
- 원본 문서를 검색어 토큰들로 변환하여 저장하는 일련의 과정

### 인덱스 (Index, Indexies)

- 색인 과정을 거친 결과물 또는 색인된 데이터가 저장되는 저장소.
- 도큐먼트(Document)의 논리적인 집합을 표현하는 단위

### 검색 (Search)

- 인덱스에 들어있는 **검색어 토큰들을 포함하고 있는 문서를 찾아가는 과정**

### 질의 (Query)

- 사용자가 원하는 문서를 찾거나 집계 결과를 알기 위해 사용하는 검색어 또는 검색 조건

## ✔ ELK Stack?

![https://user-images.githubusercontent.com/53969142/147385782-b8bee71b-8845-49ea-9801-8ab1c7c22c75.PNG](https://user-images.githubusercontent.com/53969142/147385782-b8bee71b-8845-49ea-9801-8ab1c7c22c75.PNG)

### Logstash

- 다양한 소스(DataBase, csv 파일 등)의 **로그** 또는 **트랜잭션 데이터** 수집
- 위에서 수집한 데이터를 **집계** 및 **파싱**하여 Elasticsearch에게 전달

### Elasticsearch

- Logstash로부터 받은 데이터를 **검색** 및 **집계**하여 **필요(관심)정보**를 획득

### Kibana

- Elasticsearch의 빠른 검색을 통해 데이터를 시각화 및 모니터링
- 관리자 대시보드라 생각하면 편할 것 같다

## ✔ Elasticsearch와 RDBMS 비교

![https://user-images.githubusercontent.com/53969142/147385818-bcfdd970-cad6-4899-9bfd-8a6c3d90b567.PNG](https://user-images.githubusercontent.com/53969142/147385818-bcfdd970-cad6-4899-9bfd-8a6c3d90b567.PNG)

![https://user-images.githubusercontent.com/53969142/147385820-4e29d8d8-7220-455f-8c25-bf153b7175c5.PNG](https://user-images.githubusercontent.com/53969142/147385820-4e29d8d8-7220-455f-8c25-bf153b7175c5.PNG)

> Elasticsearch는 Data를 Document에 Key - Value 형태로 저장한다

- 위 내용은 RDBMS와 Elasticsearch를 1:1 관계로 두고 비교한 사진이다
- 주의해서 봐야할 부분은 Document와 Mapping이라 생각한다

## ✔ Elasticsearch architecture

![https://user-images.githubusercontent.com/53969142/147385889-1469c38b-ab3a-447b-95dc-631bf9c3229e.PNG](https://user-images.githubusercontent.com/53969142/147385889-1469c38b-ab3a-447b-95dc-631bf9c3229e.PNG)

### ✔ 클러스터 ( cluseter )

- 최소 하나 이상의 **노드(서버)**로 구성된 **시스템 단위**
- 서로 다른 클러스터는 **독립적인 시스템**으로 유지, 데이터 접근 및 교환이 불가능
- 여러대의 서버가 하나의 클러스터 구성 가능, 하나의 서버가 여러개의 클러스터 구성 가능

### ✔ [노드 ( node )](https://esbook.kimjmin.net/03-cluster/3.3-master-and-data-nodes)

- 클러스터 내에 존재하는 **노드(서버)**
- Elasticsearch를 구성하는 **하나의 단위 프로세스**를 의미
- 노드는 역할에 따라 구분이 된다, 아래 내용을 살펴보자

## ✨ Master Node

- **클러스터 제어 및 관리**
- **인덱스 생성 및 삭제**
- **어떤 샤드에 데이터를 할당할지 결정**

## ✨ Data Node

- 실제로 색인된 데이터를 저장하고 있는 노드
- 클러스터에서 마스터 노드와 데이터 노드를 분리하여 설정 가능

### Divide Master and Data node-1

```bash
# config/elasticsearch.yml
1 node.master: true
2 node.data: false
```

### Divide Master and Data node-2

```bash
# config/elasticsearch.yml
1 node.master: false
2 node.data: true
```

### Divide Master and Data node-3

```bash
# config/elasticsearch.yml
1 node.master: false
2 node.data: true
```

### Divide Master and Data node-4

```bash
# config/elasticsearch.yml
1 node.master: false
2 node.data: true
```

> 예시를 통해 마스터 노드와 데이터 노드를 분리하는 방법을 살펴보자

- 현재 node는 1번 부터 3번 node까지 생성했다 가정한다
- node-1은 마스터 역할만 수행하는 전용 노드
- node-2, 3는 마스터 역할은 하지않고 데이터 저장만 하는 노드로 설정

### Expectation

![https://user-images.githubusercontent.com/53969142/147402281-bb13f713-f9c9-4f2d-91d2-9c9662833c1e.PNG](https://user-images.githubusercontent.com/53969142/147402281-bb13f713-f9c9-4f2d-91d2-9c9662833c1e.PNG)

- 위 사진을 보면 하나의 클러스트로 모든 노드들을 묶는다
- 실제 데이터 입력 시 node-1에는 데이터가 들어가지 않고, node-2 ~ 4에만 데이터가 들어간다.

### Kibana Monitoring View

> 실제 운영 환경에서는 위 예제처럼 마스터 후보 노드를 1개만 설정하면 안되고  
> 최소 3개 이상의 홀수개로 설정해야 한다. 그 이유는 Split Brain 문제에서 설명하겠다.

- 대부분의 Elastic Stack 모니터링 도구에서 마스터 노드는 별( \* ) 표시로 구분한다

### Split Brain

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

### Split Brain 방지

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

### [Ingest Node](https://m.blog.naver.com/olpaemi/222005459201)

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

### ✔ [Index / Shard / Replica](https://esbook.kimjmin.net/03-cluster/3.2-index-and-shards)

### Index

- RDBMS의 Database와 상충되는 개념이다
- 단일 데이터 단위인 **Document의 집합**
- <u>7.0부터는 Index를 Database + Table로 바라보는 경향이 존재한다</u>

### Shard

- **데이터를 분산하여 저장하는 방식**
- <u>인덱스는 기본적으로 샤드(shard)라는 단위로 분리가 되어 각 노드에 분산 저장된다</u>
- 샤드는 루씬의 단일 검색 인스턴스
- 하나의 인덱스가 5개의 샤드로 저장되도록 설정한 예시

![https://user-images.githubusercontent.com/53969142/147402440-10d6457b-a812-4991-8981-a617a4fdd276.PNG](https://user-images.githubusercontent.com/53969142/147402440-10d6457b-a812-4991-8981-a617a4fdd276.PNG)

### 프라이머리 샤드(Primary Shard) 와 복제본 (Replica)

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

## ✔ **Elasticsearch 특징**

### Scale out

- <u>샤드</u>를 통해 <u>규모가 수평적</u>으로 늘어날 수 있다
- 프라이머리 샤드와 리플리카를 통해 규모 확산 가능

### **고가용성**

- Replica를 통해 데이터의 안정성을 보장

### **Schema Free**

- Json 문서를 통해 데이터 검색을 수행하므로 스키마 개념이 존재하지 않는다

### **Restful**

- 데이터 CRUD 작업은 HTTP Restful API를 통해 수행한다
- curl
- kibana devtool

### 참고 자료

- [Elastic 가이드북(2.1 데이터 색인)](https://esbook.kimjmin.net/02-install/2.1) ✨
- [Elastic 가이드북(3.2 인덱스와 샤드)](https://esbook.kimjmin.net/03-cluster/3.2-index-and-shards) ✨
- [Elastic 가이드북(3.3 마스터 노드와 데이터 노드)](https://esbook.kimjmin.net/03-cluster/3.3-master-and-data-nodes) ✨
- [Elasticsearch 성능 최적화](https://www.slideshare.net/deview/2d1elasticsearch)
- [Elasticsearch 기본 개념 잡기](https://victorydntmd.tistory.com/308)
- [엘라스틱 스택 소개](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27411?tab=note&mm=null)
- [ELK Stack 참고 이미지](https://www.edureka.co/blog/elk-stack-tutorial/)
