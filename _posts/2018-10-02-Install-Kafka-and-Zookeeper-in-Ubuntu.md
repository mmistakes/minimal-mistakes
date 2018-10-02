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

- Kafka 설치
```
wget http://apache.mirror.cdnetworks.com/kafka/2.0.0/kafka_2.11-2.0.0.tgz
tar -xvf kafka_2.11-2.0.0.tgz
```


- Zookeeper 설치

```
wget http://apache.mirror.cdnetworks.com/zookeeper/stable/zookeeper-3.4.12.tar.gz
tar -xvf zookeeper-3.4.12.tar.gz
```



<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
-->
[1]: https://vivi-world.tistory.com/entry/0-ElasticSearch-FileBeat-Kafka-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%97%B0%EB%8F%99 "ELK FileBeat and Kafka"

<!-- Images Reference Links -->

<!--
When you use image link just put it on the document.

![kibana 모니터링 화면][kibana-monitoring]

This is sample code to embed an image in markdown document.s
[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
-->




<!-- End of Documents -->


If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
