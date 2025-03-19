---
layout: single
title: "OpenSearch 가이드"
categories: TechNote
tags: [OpenSearch, 검색 엔진, 데이터 분석, Elasticsearch]
toc: true
toc_sticky: true
author_profile: true
---

## 📌 OpenSearch란?

💡 **OpenSearch**는 **Elasticsearch 7.10을 기반으로 Amazon에서 개발한 오픈소스 검색 및 분석 엔진**입니다.  
Elasticsearch와 Kibana가 오픈소스 라이선스 변경을 발표한 이후, AWS에서 이를 **OpenSearch 프로젝트**로 분리하여 운영하고 있습니다.

🔹 **주요 특징**

- **검색(Search) 및 로그 분석(Log Analytics)**
- **분산형(Distributed) 구조로 대용량 데이터 처리 가능**
- **RESTful API를 제공하여 다양한 애플리케이션과 통합 가능**
- **SQL 및 PPL (Piped Processing Language) 지원**
- **Kibana를 대체하는 OpenSearch Dashboards 제공**

🔹 **사용 사례**

- **웹사이트 검색 기능** (예: 전자상거래 사이트)
- **로그 및 보안 데이터 분석**
- **비정형 데이터 검색**
- **IoT 데이터 모니터링**
- **데이터 스트리밍 분석**

---

## 📌 OpenSearch vs. Elasticsearch 차이점

| 기능                | OpenSearch | Elasticsearch       |
| ------------------- | ---------- | ------------------- |
| 라이선스            | Apache 2.0 | Elastic License 2.0 |
| 개발사              | Amazon     | Elastic             |
| SQL 지원            | ✅         | ✅                  |
| 보안 기능 기본 제공 | ✅         | ❌                  |
| Machine Learning    | ✅         | ❌                  |

💡 **OpenSearch는 무료로 사용할 수 있으며, 기본적으로 보안 기능 및 머신 러닝 기능을 제공합니다.**

---

## 📌 OpenSearch 아키텍처

OpenSearch는 **분산형 검색 및 데이터 저장 시스템**으로, 아래와 같은 구조를 가집니다.

- [Client] → [Coordinator Node] → [Data Node] → [Search & Query Execution]

### 1. Client

- **클라이언트는 OpenSearch에 요청을 보내는 애플리케이션**
  - 사용자가 검색, 데이터 삽입, 삭제 요청을 OpenSearch에 보냄
  - OpenSearch REST API, Java/Python SDK, Kibana(Dashboards) 등을 활용하여 요청 수행

### 2. Coordinator Node

- **클라이언트의 요청을 받아서 적절한 Data Node로 분산**

  - 요청을 적절한 데이터 노드에 전달하고 결과를 병합하여 반환
  - 데이터 저장 요청 시 부하를 분산하여 적절한 Data Node에 배분
  - Coordinator Node 자체는 데이터를 저장하지 않음

- **역할**
  - 검색 요청: 여러 Data Node에서 검색 후 결과를 통합
  - 데이터 저장 요청: 적절한 Data Node로 저장

### 3. Data Node

- **실제 데이터를 저장하고 검색을 처리하는 노드**
  - 데이터 저장, 색인(indexing), 검색, 집계(aggregation) 수행
  - 데이터를 샤드(Shard) 단위로 나누어 저장하여 분산 처리
- **샤드(Shard)란?**
  - 하나의 인덱스를 여러 개의 작은 조각(Shard)으로 나누어 저장
  - 예: my-index가 3개의 샤드로 구성되면
    ```scss
      my-index
      ├── Shard 1 (Data Node A)
      ├── Shard 2 (Data Node B)
      ├── Shard 3 (Data Node C)
    ```
  - 여러 개의 Data Node가 존재하면 자동으로 데이터가 분배되어 저장됨

### 4. Search & Query Execution

- **클라이언트의 검색 요청을 실행하고 결과를 반환**
  - Coordinator Node가 검색 요청을 적절한 Data Node로 전달
  - Data Node는 샤드에서 검색을 수행한 후 결과를 반환
  - Coordinator Node가 검색 결과를 병합하여 클라이언트에 응답

### 🔹 **주요 구성 요소**

1. **Cluster**: OpenSearch의 전체 시스템 (노드들의 집합)
2. **Node**: 데이터 저장, 검색 및 분석을 수행하는 단위
   - **Coordinator Node**: 클라이언트 요청을 분배
   - **Data Node**: 실제 데이터를 저장하고 검색 쿼리를 처리
   - **Master Node**: 클러스터 상태 관리
3. **Index**: RDBMS의 "데이터베이스"와 유사한 개념 (문서 저장 단위)
4. **Shard**: 인덱스를 여러 개로 나눠 저장하는 단위 (수평 확장 가능)

---

## 📌 OpenSearch 서버 생성방법

### 🚀 옵션 1: Docker로 OpenSearch 실행

**빠르고 간단한 방법**으로, **Docker를 사용**해서 OpenSearch 서버를 실행할 수 있음

### **(1) Docker 설치 (만약 설치 안되어 있다면)**

- [Docker 홈페이지](https://www.docker.com/)
- 설치 후, `docker --version`으로 정상 설치 확인

### **(2) OpenSearch 및 Dashboards 실행**

아래 `docker-compose.yml`을 생성 후 실행하면 됨.

#### `docker-compose.yml` 파일 생성

- docker-compose.yml 파일을 원하는 폴더에 만들고 내용을 추가

```yaml
version: "3"
services:
  opensearch:
    image: opensearchproject/opensearch:latest
    container_name: opensearch
    environment:
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=yourPassword # 비밀번호 추가 없으면 default
      - DISABLE_SECURITY_PLUGIN=true # 보안 플러그인 비활성화 (SSL 문제 해결)
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    ports:
      - "9200:9200"
      - "9600:9600"
    volumes:
      - opensearch-data:/usr/share/opensearch/data

volumes:
  opensearch-data:
```

### **(3) 실행 명령어**

```sh
docker-compose up -d
```

🚀 **서버 실행 후 확인:**

- OpenSearch: http://localhost:9200
- OpenSearch Dashboards: http://localhost:5601

> 🛠 기본 로그인 정보
>
> - **Username:** `admin`
> - **Password:** `admin`

---

### 🏗 **옵션 2: AWS OpenSearch Service 사용**

1. AWS OpenSearch 콘솔 접속: [AWS OpenSearch](https://aws.amazon.com/opensearch-service/)
2. "클러스터 생성" 클릭
3. "배포 유형" 선택 (프로덕션 환경이면 "전용 클러스터", 테스트용이면 "단일 노드")
4. "인스턴스 유형" 선택 (테스트용: `t3.small.search`, 프로덕션: `m6g.large.search` 이상)
5. "VPC 또는 퍼블릭 액세스 설정"
6. 생성 후 **OpenSearch 엔드포인트 URL 확인**

```sh
curl -X GET "https://your-opensearch-domain.region.es.amazonaws.com"
```

---

## 📌 OpenSearch 기본 API 사용법

### 1️⃣ 클러스터 상태 확인

```bash
curl -X GET "http://localhost:9200/\_cluster/health?pretty"
```

### 2️⃣ 인덱스 생성

```bash
curl -X PUT "http://localhost:9200/my-index?pretty"
```

### 3️⃣ 문서 추가

```bash
curl -X POST "http://localhost:9200/my-index/\_doc/1?pretty" -H "Content-Type: application/json" -d'
{
"title": "OpenSearch 개요",
"content": "OpenSearch는 강력한 검색 및 분석 엔진입니다."
}'
```

### 4️⃣ 문서 검색

```bash
curl -X GET "http://localhost:9200/my-index/\_search?q=title:OpenSearch&pretty"
```

### 5️⃣ 문서 삭제

```bash
curl -X DELETE "http://localhost:9200/my-index/\_doc/1?pretty"
```

---

## 📌 OpenSearch Dashboards 사용법

💡 OpenSearch Dashboards는 Kibana와 유사한 UI를 제공하며, 시각화를 지원합니다.

### 1️⃣ 웹 브라우저에서 실행

1. http://localhost:5601 접속
2. opensearch 사용자 로그인 (기본 ID/PW: admin/admin)
3. 데이터 시각화 대시보드 구성

### 2️⃣ 시각화(Vizualization) 구성

- Discover: 문서 검색
- Dashboards: 차트 및 그래프 생성
- Machine Learning: 이상 탐지 모델 사용 가능

## 📌 OpenSearch 고급 기능

### 1️⃣ SQL 쿼리 지원

💡 OpenSearch는 SQL을 사용하여 데이터를 검색할 수 있습니다.

```sql
SELECT title, content FROM my-index WHERE title = 'OpenSearch 개요'
```

### 2️⃣ 머신 러닝 (ML)

💡 OpenSearch는 이상 탐지(Anomaly Detection) 기능을 제공합니다.

```bash
curl -X POST "http://localhost:9200/\_plugins/\_ml/models/\_search"
```

### 3️⃣ OpenSearch Security (보안 설정)

💡 기본적으로 HTTPS 및 Role-based Access Control(RBAC)을 지원합니다.

```bash
curl -X POST "http://localhost:9200/\_opendistro/\_security/api/roles"
```

## 📌 OpenSearch Java 연동 가이드

💡 Java에서 OpenSearch에 연결하고 데이터를 추가, 검색하는 방법을 소개합니다.

### 1️⃣ **OpenSearch Java 클라이언트 추가**

💡 **Gradle 또는 Maven을 사용하여 OpenSearch Java 클라이언트를 프로젝트에 추가합니다.**

#### **Gradle (build.gradle.kts)**

```kotlin
dependencies {
    implementation("org.opensearch.client:opensearch-rest-high-level-client:2.6.0")
}
```

#### Maven (pom.xml)

```xml
<dependency>
    <groupId>org.opensearch.client</groupId>
    <artifactId>opensearch-rest-high-level-client</artifactId>
    <version>2.6.0</version>
</dependency>
```

### 2️⃣ **OpenSearch 클라이언트 연결**

💡 **Java에서 OpenSearch 서버에 연결하는 방법합니다.**

```java
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.indices.CreateIndexRequest;
import org.opensearch.client.indices.CreateIndexResponse;
import org.opensearch.client.RestClient;
import org.apache.http.HttpHost;

public class OpenSearchClientExample {
    public static void main(String[] args) {
        // OpenSearch 클라이언트 생성
        try (RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")))) {

            // 인덱스 생성 요청
            CreateIndexRequest request = new CreateIndexRequest("my-index");
            CreateIndexResponse createIndexResponse = client.indices().create(request, RequestOptions.DEFAULT);

            System.out.println("인덱스 생성 여부: " + createIndexResponse.isAcknowledged());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 3️⃣ Java에서 OpenSearch에 데이터 추가\*\*

💡 **OpenSearch에 문서를 추가하는 예제**

```java
import org.opensearch.action.index.IndexRequest;
import org.opensearch.action.index.IndexResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.client.RestClient;
import org.apache.http.HttpHost;
import org.opensearch.common.xcontent.XContentType;
import java.util.HashMap;
import java.util.Map;

public class OpenSearchAddDocument {
    public static void main(String[] args) {
        try (RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")))) {

            // 문서 데이터 생성
            Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("title", "OpenSearch 예제");
            jsonMap.put("content", "Java에서 OpenSearch에 데이터를 추가하는 예제입니다.");

            // 인덱스 요청
            IndexRequest request = new IndexRequest("my-index").id("1")
                    .source(jsonMap, XContentType.JSON);

            IndexResponse indexResponse = client.index(request, RequestOptions.DEFAULT);

            System.out.println("문서 추가 상태: " + indexResponse.getResult().name());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### **4️⃣ Java에서 OpenSearch에 데이터 검색**

💡 **OpenSearch에서 데이터를 검색하는 방법**

```java
import org.opensearch.action.search.SearchRequest;
import org.opensearch.action.search.SearchResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.client.RestClient;
import org.apache.http.HttpHost;
import org.opensearch.index.query.QueryBuilders;
import org.opensearch.search.builder.SearchSourceBuilder;

public class OpenSearchSearchDocument {
    public static void main(String[] args) {
        try (RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")))) {

            // 검색 요청 생성
            SearchRequest searchRequest = new SearchRequest("my-index");
            SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
            sourceBuilder.query(QueryBuilders.matchQuery("title", "OpenSearch"));
            searchRequest.source(sourceBuilder);

            // 검색 실행
            SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

            System.out.println("검색 결과: " + searchResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
