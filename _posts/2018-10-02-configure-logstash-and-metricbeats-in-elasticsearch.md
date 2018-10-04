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

순서
- Logstash 설치
- Logstash 디렉터리 레이아웃
- Kafka-Logstash 연동

## Logstash 설치

Logstash 는 deb 파일을 이용해서 설치하는 가이드를 찾기 어려웠다. 구글 검색 기준으로 따라서 Ubuntu 에서 사용하는 APT 를 통한 설치를 기입한다.

### APT 를 이용한 설치

아래의 명령어를 입력하여 설치

```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
sudo apt-get update && sudo apt-get install logstash
```

서비스 등록 및 구동

```
sudo systemctl enable logstash.service
sudo service logstash
```

pipeline 설정 파일을 개별로 작성하여 테스트 목적으로 실행할 수 있다. 이를 위해서는 logstash 서비스를 중단하고 명령어를 통해 기동한다.

> 이 떄 에러를 잡아낼 수 있음

```
sudo service logstash stop
/usr/local/logstash/bin/logstash -f /etc/logstash/conf.d/01-sample.conf
```

## Logstash Directory Layout

Ubuntu 환경에 구성하였으므로 Debian 과 DRPM Packages 기준으로 설명

|Type|Description|Default Location|Setting|
|:---:|:---:|:---:|:---:|
|Home|Logstash 설치 Home 디렉터리|/usr/share/logstash||
|bin|logstash 를 포함한 Binary Script 경로, logstash-plugin 을 통해 플러그인 설치|/usr/share/logstash/bin||
|settings|logstash.yml 을 포함한 설정 파일 jvm.options 그리고 startup.options 를 포함|/etc/logstash|path.settings|
|conf|logstash 파이프라인 설정 파일들|/etc/logstash/conf.d/*.conf|참고 /etc/logstash/pipelines.yml|
|logs|logstash 구동 로그|/var/log/logstash|path.logs|
|plugins|로컬이자 Ruby-Gem 이 아닌 플러그인, 각 플러그인은 하위 디렉터리에 위치, 개발 목적으로만 사용 권고!|/usr/share/logstash/plugins|path.plugins|
|data|logstash 그리고 플러그인이 사용하는 데이터 파일들 |/var/lib/logstash|path.data|


## Kafka 와 Logstash 연동

Kafka 와 Logstash 를 연동하기 위해서 아래의 설정 파일을 만든 후 재기동하거나 명령어를 실행한다.

```
input {
  kafka {
    bootstrap_servers => "192.168.0.12:9092,192.168.0.13:9092"
    topics => "metric"
    group_id => "metric-group-logstash"
    consumer_threads => 2
  }
}

filter {
  json {
    source => "message"
  }
  mutate {
    remove_field => ["message"]
  }
}

output {
  elasticsearch {
    hosts => ["192.168.0.18:9200"]
    index => "metricbeat-%{+YYYY.MM.dd}"
    document_type => "metric"
  }
  stdout { codec => rubydebug }
}
```

logstash 서비스 재기동

```
sudo service logstash restart
```

혹은 logstash 명령어를 통해 실행

```
bin/logstash -f config/logstash-metric.conf
```

# ElasticSearch 란?



## Terminology (용어)

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

###






# 참조
- [Install Logstash][1]
- [Terminology in ElasticSearch][2]
- [logstash-kafka 연동][3]
- [Logstash Directory Layout][4]

<!-- References Link -->

[1]: https://www.elastic.co/guide/en/logstash/current/installing-logstash.html "install logstash"
[2]: http://www.buyukveri.co/en/what-is-elasticsearch/ "Terminology in ElasticSearch"
[3]: http://gyrfalcon.tistory.com/entry/LogstashShipper-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-Kafka-%EB%A9%94%EC%84%B8%EC%A7%80%EB%A5%BC-elasticsearch%EB%A1%9C-%EC%A0%80%EC%9E%A5?category=674612 "logstash shipper 를 이용한 Kafka 메시지 저장"
[4]: https://www.elastic.co/guide/en/logstash/current/dir-layout.html "logstash directory layout"

<!-- Images Reference Links -->

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
