---
title: Install Kafka and Zookeeper in Ubuntu
key: 20181002
tags: kafka zookeeper
excerpt: "Zookeepr 와 Kafka 구성하기"
---

# Summaries

Zookeeper, Kafka 클러스터링을 구성하고 구현해 본다.

P.S Filebeat 를 기반으로 IIS Log 를 수집해 본다.

<!--more-->


# Zookeeper 설치

```
wget http://apache.mirror.cdnetworks.com/zookeeper/stable/zookeeper-3.4.12.tar.gz
tar -xvf zookeeper-3.4.12.tar.gz
```

# Kafka 설치

```
wget http://apache.mirror.cdnetworks.com/kafka/2.0.0/kafka_2.11-2.0.0.tgz
tar -xvf kafka_2.11-2.0.0.tgz
```

## Kafka 테스팅

Kafka 가 잘 구성되었는지 테스트 한다.

# Kafka Monitoring

Kafka 가 잘 구동하는지 모니터링한다.

## Kafka Offset Monitoring

Kafka Offset Monitor 를 구성하여 logstash Consumer 와 Metricbeat Producer 의 상태를 확인한다.

jar 파일을 다운로드 후 아래의 명령어를 실행한다.

```
java -cp KafkaOffsetMonitor-assembly-0.2.1.jar \
     com.quantifind.kafka.offsetapp.OffsetGetterWeb \
     --zk zk-server1,zk-server2 \
     --port 8080 \
     --refresh 10.seconds \
     --retain 2.days
```

## Kafka Manager 사용

Kafka Manager 를 설치하여 구동 한다.

```
git clone https://github.com/yahoo/kafka-manager
sbt clean dist
cd target/universal
unzip kafka-manager-1.3.3.21

```

`application.conf` 파일을 수정한다.

```
vim conf/application.conf

.... (중략) ...
kafka-manager.zkhosts="192.168.2.195:2181"
.... (중략) ...
```

kafka manager 를 구동한다.

```
bin/kafka-manager
```

구동화면 추가 예정

>  zk the ZooKeeper hosts
 port on what port will the app be available
 refresh how often should the app refresh and store a point in the DB
 retain how long should points be kept in the DB
 dbName where to store the history (default 'offsetapp')

# 참조

- [Apache-Kafka-클러스터링-구축-및-테스트][1]
  - 정리가 가장 잘되어 있음
- [Apache Kafka Quick Start 공식 문서][5]
  - 공식 문서가 좋다.
- [Kafka Offset Monitor][6]

<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
-->
[1]: https://vivi-world.tistory.com/entry/0-ElasticSearch-FileBeat-Kafka-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%97%B0%EB%8F%99 "ELK FileBeat and Kafka"
[2]: https://devops.profitbricks.com/tutorials/install-and-configure-apache-kafka-on-ubuntu-1604-1/ "Install and Configure Apache Kafka on Ubuntu 16.04"
<!-- Images Reference Links -->
[3]: http://programist.tistory.com/entry/Apache-Kafka-%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0%EB%A7%81-%EA%B5%AC%EC%B6%95-%EB%B0%8F-%ED%85%8C%EC%8A%A4%ED%8A%B8 "Apache-Kafka-클러스터링-구축-및-테스트"
[4]: https://taetaetae.github.io/2017/11/02/what-is-kafka/ "what-is-kafka"
[5]: http://kafka.apache.org/quickstart "Apache Kafka Quick Start"
[6]: http://quantifind.github.io/KafkaOffsetMonitor/ "Kafka Offset Monitor"

<!--
When you use image link just put it on the document.

![kibana 모니터링 화면][kibana-monitoring]

This is sample code to embed an image in markdown document.s
[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
-->




<!-- End of Documents -->


If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
