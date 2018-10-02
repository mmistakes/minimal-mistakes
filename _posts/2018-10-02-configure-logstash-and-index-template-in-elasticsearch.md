---
title: Configure logstash and index template in ElasticSearch
key: 20181002
tags: elasticsearch logstash index template
excerpt: "Logstash 설치 및 index template 구성"
---

# Summaries

logstash 를 구성하고 elasticsearch 의 index template 을 구성한다.

<!--More-->

# Logstash 설치

# ElasticSearch 란?

## Terminology (전문 용어)

- ElasticSearch 용어

아래의 내용은 참조 `Terminology in ElasticSearch` 를 참고하였음 (링크는 문서 끝을 참조)

|ElasticSearch 용어| Relation DB 용어|
|:---:|:---:|
|Elasticsearch 의 document 란?|각 레코드(행)은 document|
|Elasticsearch 의 index 란?|각 데이터베이스는 index|
|Field 란?|각 칼럼(열)은 field|
|type 이란?|database 의 table 과 유사|
|Elasticsearch 에서 mapping 이란?|database 의 schema 와 유사|
|Elasticsearch 에서 Shard 란?|클러스터 내에서 Lucene 인스턴스마다 붙여지는 이름|

- Terminology

|Relation Database|Elasticsearch|
|:---:|:---:|
|Database|Index|
|Table|Type|
|Row|Document|
|Column|Fields|
|Schema|Mapping|

|ElasticSearch|DB|Operation|
|:---:|:---:|
|GET|SELECT|read|
|PUT|UPDATE|update|
|POST|INSERT|create|
|DELETE|DELETE|delete|

- Replica 란?

Elasticsearch 는 document 의 복사본을 다른 노드에 저장한다. 







# 참조
- [Install Logstash][1]
- [Terminology in ElasticSearch][2]


<!-- References Link -->

[1]: https://www.elastic.co/guide/en/logstash/current/installing-logstash.html "install logstash"
[2]: http://www.buyukveri.co/en/what-is-elasticsearch/ "Terminology in ElasticSearch"

<!-- Images Reference Links -->

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
