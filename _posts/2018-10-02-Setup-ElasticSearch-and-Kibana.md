---
title: Setup Elasticsearch and Kibana
key: 20181002
tags: elasticsearch kibana ubuntu16.04
excerpt: "Ubuntu 에서 Elasticsearch 클러스터와 Kibana 구축하기"
---

# Summaries

Ubuntu 환경에서 Elasticsearch 클러스터와 Kibana 를 구축한다.

# System Specs

| Hostname |       ip      |                  Spec                  |                          OS                         |       use      |
|:--------:|:-------------:|:--------------------------------------:|:---------------------------------------------------:|:--------------:|
|   mon1   | 172.111.1.195 |   i7 8700 / 32GB / SSD 1TB / SATA 1TB  | Ubuntu 16.04.5 LTS x86_64 (Linux 4.4.0-135-generic) | Elasticsearch1 |
|   mon2   | 172.111.1.196 | i7 8700 / 16GB / SSD 250 GB / SATA 1TB | Ubuntu 16.04.5 LTS x86_64 (Linux 4.4.0-135-generic) | Elasticsearch2 |
|   mon3   | 172.111.1.197 | i7 8700 / 16GB / SSD 250 GB / SATA 1TB | Ubuntu 16.04.5 LTS x86_64 (Linux 4.4.0-135-generic) | Elasticsearch3 |
|   mon4   | 172.111.1.197 | i7 8700 / 16GB / SSD 250 GB / SATA 1TB | Ubuntu 16.04.5 LTS x86_64 (Linux 4.4.0-135-generic) | Elasticsearch4 |


# 오해와 진실

시스템을 구축할 때 선입견을 가지고 접근하는 경우 에러를 범하기도 한다. 이를 정리해 본다.

## Master 노드 설정

처음 Elastic Cluster 를 구성할 때 Master Node 를 Hadoop 처럼 따로 지정해야 한다고 생각했다. 그러나 eligible 이라는 개념으로 설정이 가능하다고 한다.
즉, Master 노드가 될만한 노드를 미리 지정해 두고 상황에 따라서 변한다는 의미인 것으로 받아들여진다.

# vague concept (모호한 개념 정리)

아래는 찾아보고 해결해야 하는 과제이다.

## master 노드는 data 노드가 아니다?

**Q**. master 노드는 데이터 노드가 아니어야 하는가? 우선 master-eligible (master 노드 자격이 있는 노드를 설정) 한 뒤에
의도적으로 data 노드 설정을 빼버렸다. 이는 합리적인 설정인가?

**A**
추후 기입 예정

<!--More-->

# Install(설치) Oracle-JDK

오라클 자바를 설치한다. 구글링을 해본 결과 OpenJDK 는 아직 사용하기엔 부족하다고 한다.

아래의 명령어를 입력하고 설치 결과를 `java -version` 명령어를 통해서 확인한다.

```
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
sudo apt-get -y install oracle-java8-installer
java -version
```

# Install(설치) ElasticSearch

ElasticSearch 를 설치한다. Debian Package (.deb) 파일을 이용해서 설치하도록 한다.

`mon1`, `mon2`, `mon3`, `mon4` 서버 모두에 설치하며 설치 후 `/etc/elasticsearch/elasticsearch.yml`
설정 파일을 설정할 때 다음의 주의 사항을 따른다.


1. `master.node: true` 는 master 노드로 지정하고픈 대상 시스템에만 설정한다.
  - 추측 단계이지만 이는 `eligible` 개념인 것 같다. (유동적으로 master 노드가 결정됨)
2. `discovery.zen.ping.unicast.hosts` 설정에 모든 node 의 아이피를 기입한다.
  - 새로운 노드가 추가될 때마다 설정하도록 주석은 가이드한다.
  - > Pass an initial list of hosts to perform discovery when new node is started:
3. `elasticsearch.yml` 파일을 수정할 때 아래의 필드를 수정한다.

elasticsearch deb 파일 다운로드 및 설치 (`dpkg` 사용)

```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.4.1.deb
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.4.1.deb.sha512
shasum -a 512 -c elasticsearch-6.4.1.deb.sha512  
sudo dpkg -i elasticsearch-6.4.1.deb
```

설치 후 서비스 등록 및 서비스 시작

```
sudo systemctl enable elasticsearch.service
sudo service elasticsearch start
```

설치 확인 테스트(test)

```
curl -XGET 'localhost:9200' # check if elasticsearch run
```

## `elasticsearch.yml` 파일 작성 및 배포

설치 당시에 `master.node` 으로 여기는 `mon1` 에 `elasticearch.yml` 설정을 작성하고 이를 배포 한다. 배포된 파일에서 수정하는 부분은 `node.master`, `node.data`, `network.host` 인데 각각의 설명은 아래의 파일을 참조한다.


- master node `elasticsearch.ym` 파일 설정

```
uster.name: ymon-cluster # 클러스터를 설명하는 이름
node.name: "ymon-node-1" # node 이름 설정
node.master: true # master-eligible 인지를 설정
# node.data: true # data 노드인지를 설정 (10.02 시점에서 설정하지 않으나 변경 가능성이 농후한 설정)
network.host: 192.168.1.195 # 접근 IP 주소를 바인딩 (이후 1.195:9200 으로만 접근 가능)
discovery.zen.ping.unicast.hosts: ["192.168.1.195", "192.168.1.196", "192.168.1.197", "192.168.1.198"] # elk 를 구축하려는 모든 node 의 아이피 정보를 기입한다. 이는 node discovery 에 사용되는 정보이다.
```

- Default 설정을 변경하기 않음

```
# Path to directory where to store the data (separate multiple locations by comma):
#
path.data: /var/lib/elasticsearch
#
# Path to log files:
#
path.logs: /var/log/elasticsearch
# Set a custom port for HTTP:
#
http.port: 9200
#
```

- data node `elasticsearch.yml` 파일 설정 정보

master node 의 설정에서 아래의 부분을 수정한다.

```
# node.master: true # 주석 처리하여 해제함
node.data: true # 주석을 해제한다.
# network.host: 192.168.1.xxx # 옵션을 설정하는 호스트 ip 를 기입

```


## Directory Structure of ElasticSearch (ElasticSearch 디렉터리 구조)

아래의 표는 Elasticsearch 를 default location 으로 설치할 경우 생성되는 경로이며 기능을 기술해 두었다. 나중에 참조 :start2:

|Type|Description|Default Location|Setting|
|:---:|:---:|:---:|:---:|
|home|elasticsearch 의 홈 디렉터리로, 환경 변수는 `$ES_HOIME`| `/usr/share/elasticsearch`||
|bin| binary 스크립트가 보관된 장소이다. 노드를 시작하는 `elasticsearch` 및 플러그인을 설치하는 `elasticsearch-plugin` | `/usr/share/elasticsearch/bin`||
|conf| `elasticsearch.yml` 파일이 보관된 폴더|`/etc/elasticsearch`|`path.conf`|
|data| 각 `index`, `shard` 의 데이터 파일이 보관된 폴더, 이외에도 다른 폴더를 추가 가능|`path.data`|
|logs| 로그 파일을 보관 | `/var/log/elasticsearch`|`path.logs`|
|plugins|플러그인 파일을 보관하며 플러그인은 각 하위 디렉터리 단위로 보관 | `/usr/share/elasticsearch/plugins`|`repo`|

## ElasticSearch 설정 정리

elasticsearch 는 Tuning이 필요하다고 한다. 여러 자료를 살펴보았지만 아직은 파악이 어렵다.
그러나 설정을 정리해 두면 분명 도움이 될 것이라 생각된다.

아래의 각 칼럼은 아래의 의미를 가진다.
- Setting : 설정 파일에서 설정 키 값
  - `master.node: true` 에서 `master.node` 를 가리킴
- Default Value : 설정하지 않아도 `elasticsearch` 가 저절로 가지는 값
- Description : 설정에 대한 설명 (문서를 참조하여 작성)
- Updated Date : 설정에 대한 정보를 기록한 날짜
- Location : `elasticsearch.yml` 파일만 현재 건드리고 있으나 다른 설정을 조정해야 할지도 모르는 일이다. 따라서 설정 파일 이름을 기입한다.
  - > 설정 파일 경로를 모두 기입하는 건 공간 낭비가 아닐까?

|Setting|Default Value|Description|Updated Date|Location|
|:---:|:---:|:---:|:---:|
|master.node|||2018.10.02|elasticearch.yml|

# Install(설치) Kibana

설치 방법에는 특별한 내용이 없다. 단순히 반복한다.

```
wget https://artifacts.elastic.co/downloads/kibana/kibana-6.4.1-amd64.deb
shasum -a 512 kibana-6.4.1-amd64.deb  
sudo dpkg -i kibana-6.4.1-amd64.deb
```

```
sudo systemctl enable kibana.service
sudo service kibana start
```

## Kibana 설정(Configuration)

`/etc/kibana/kibana.yml` 설정 파일을 수정한다. 수정 뒤에 kibana 서비스를 재시작한다.

```
server.port: 5601 # kibana 접속 포트
server.host: "192.168.2.195" # 바인딩할 로컬 서버 주소, 192.168.2.195 로만 접속 가능
elasticsearch.url: "http://192.168.2.195:9200" # 접속할 elasticsearch 주소
```

kibana 서비스 재기동

```
sudo service kibana stop & sudo service kibana start # 서비스 재기동
```

## Kibana 구동 화면

Kibana 가 구동되면 Cluster 정보 또한 자동으로 등록한다.

![kibana 모니터링 화면][kibana-monitoring]

![kibana 관리 화면][kibana-mgmt]


# 참조
- [ElasticSearch Configuration Options][1]



<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
-->

[1]: https://www.elastic.co/guide/en/elasticsearch/reference/index.html "elasticsearch configuration options"


<!-- Images Reference Links -->

<!--
When you use image link just put it on the document.

![kibana 모니터링 화면][kibana-monitoring]

This is sample code to embed an image in markdown document.s
[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
-->

[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
[kibana-mgmt]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-mgmt.png

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
