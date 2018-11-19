---
title: Elk Trouble Shooting
key: 20181005
tags: elasticsearch kibana
excerpt: "ELK 관련 트러블 슈팅을 정리"
---

# Summaries

ELK 를 구축하는 과정에 발생하는 Trouble Shooting 을 기록하여 정리한다.

# 비고

현재 작업 중인 환경을 Kafka 를 구성하여 logstash 를 Consumer 로 사용하는 환경이다.

Index 를 위해서 logstash 를 사용한다고 알고 있다.

<!--more-->

# ElasticSearch 인덱스 조회

Docker를 통해 간단히 ElasticSearch 를 테스트할 수 있는 환경을 구축한다.

링크 참조

---
- [Elk Dockerfile in Docker Hub][1]

On Windows OS

```
PS > docker pull sebp/elk
```

# Error: The request for this panel faield

- Error Message in Kibana
> Fielddata is disabled on text fields by default. Set fielddata=true on [beat.name] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory. Alternatively use a keyword field instead.

- uninverting 및 inverted index 란?





# 참조
- [Elk Dockerfile in Docker Hub][1]

<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
[1]: https://vivi-world.tistory.com/entry/0-ElasticSearch-FileBeat-Kafka-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%97%B0%EB%8F%99 "ELK FileBeat and Kafka"
[2]: https://devops.profitbricks.com/tutorials/install-and-configure-apache-kafka-on-ubuntu-1604-1/ "Install and Configure Apache Kafka on Ubuntu 16.04"
-->
[1]: https://hub.docker.com/r/sebp/elk/~/dockerfile/ "Elk Dockerfile"
<!-- Images Reference Links -->
<!--

-->

<!--
When you use image link just put it on the document.

![kibana 모니터링 화면][kibana-monitoring]

This is sample code to embed an image in markdown document.s
[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
-->




<!-- End of Documents -->


If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
