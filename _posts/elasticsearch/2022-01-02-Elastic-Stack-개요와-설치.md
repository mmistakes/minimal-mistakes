---
layout: single
title: "[Elasticsearch] Elastic Stack 개요와 설치"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Logstash]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ 엘라스틱 서치 DB 소개와 설치

> 설치 과정은 강의에 나와있는 부분을 참고하기에는 다른 부분이 다수 존재하여,  
> [ELK Stack Debian Document](https://techviewleo.com/install-elastic-stack-7-elk-on-debian/)를 참고 하였습니다.

- 확장성이 뛰어난 오픈소스, 전체 텍스트 검색 및 분석 엔진
- 대량의 데이터를 신속하고 거의 실시간으로 저장, 검색 및 분석
- 일반적으로 복잡한 검색기능과 요구사항이 있는 응용 P/G을 구동하는 기본엔진 및 기술
- 엘라스틱 서치는 자바 루씬 기반의 검색 엔진이다.

### 엘라스틱 서치 사용 사례

- 제품 검색을 할 수 있는 온라인 웹 스토어 운영
- 로그 또는 트랜잭션 데이터를 수집, 분석 및 조사하여 추세, 통계, 요약 또는 예외 탐지

## ✔ 엘라스틱서치 다운로드

> 실습은 VM workspace Ubuntu 16 환경에서 진행 하였습니다.  
> Ubuntu MinimalCD로 변경할 예정.

## Step 1: Update System Packages

> Update your system packages to begin your installation

```bash
# update apt package
$ sudo apt-get update && apt-get upgrade

# ubuntu reboot
$ sudo reboot
```

## Step 2: Install Java on Debian 10 / Debian 11

> ELK deployment requires that Java 8 or 11 is installed.  
> Run the below commands to install OpenJDK 11

```bash
$ sudo apt install openjdk-11-jdk -y
```

> Confirm Java Installation by checking on the version

```bash
$ java --version or java -version
openjdk 11.0.12 2021-07-20
OpenJDK Runtime Environment (build 11.0.12+7-post-Debian-2)
OpenJDK 64-Bit Server VM (build 11.0.12+7-post-Debian-2, mixed mode, sharing)
```

## Step 3: Add Elastic Stack Repository to Debian 10

> Install Elastic stack PGP signing key with the below command:

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```

> Install ELK APT repository on Debian 11/10 system:

```bash
$ sudo apt install apt-transport-https
$ echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
```

> Update package list cache:

```bash
$ sudo apt update
```

## Step 4: Install Elasticsearch on Debian 10 / Debian 11

> Once we have successfully added ELK repo,we can go ahead to install the different components of elactic stack. To install elasticsearch, run the below command:

```bash
$ sudo apt install elasticsearch
```

> Now we need to configure Elasticsearch to define the IP address and the port to listen on. Also set discovery type and cluster name. The configuration file is found in */etc/elasticsearch/elasticsearch.yml*.

```bash
$ sudo vim /etc/elasticsearch/elasticsearch.yml
```

> Change the settings as below:

```bash
# ---------------------------------- Cluster -----------------------------------
cluster.name: mycluster

# ---------------------------------- Network -----------------------------------
network.host: 0.0.0.0
http.port: 9200

# --------------------------------- Discovery ----------------------------------
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
discovery.seed_hosts: []
discovery.type: single-node
```

> Also set JVM heap size to about the available memory on your system.

```bash
$ sudo vim /etc/elasticsearch/jvm.options
# Xms represents the initial size of total heap space
# Xmx represents the maximum size of total heap space

-Xms512m
-Xmx512m
```

> Save the file then start and enable Elasticsearch as below:

```bash
$ sudo systemctl enable --now elasticsearch
```

> Confirm status with the following command:

```bash
$ systemctl status elasticsearch
● elasticsearch.service - Elasticsearch
  Loaded: loaded (/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
  Active: active (running) since Mon 2021-01-18 11:49:06 EAT; 1min 1s ago
    Docs: https://www.elastic.co
Main PID: 2524 (java)
   Tasks: 49 (limit: 2320)
  Memory: 1003.9M
```

## Step 5: Install Kibana on Debian 10 / Debian 11

> Once Elasticsearch is up and running, install Kibana with the below command:

```bash
$ sudo apt install kibana
```

> The default Kibana configuration file is in */etc/kibana/kibana.yml*.
> Configure IP address and port as below

```bash
$ sudo vim /etc/kibana/kibana.yml
# Kibana is served by a back end server. This setting specifies the port to use.
# server.port: 5601
server.port: 5601

# To allow connections from remote users, set this parameter to a non-loopback address.
#server.host: "localhost"
server.host: "0.0.0.0"
```

> Use the below settings to configure how Kibana connects to Elasticsearch

```bash
# The URLs of the Elasticsearch instances to use for all your queries.
# elasticsearch.hosts: ["http://localhost:9200"]
elasticsearch.hosts: ["http://localhost:9200"]
```

> Enable and start Kibana

```bash
$ sudo systemctl enable --now kibana
```

> Confirm Kibana status

```bash
$ systemctl status kibana
● kibana.service - Kibana
     Loaded: loaded (/etc/systemd/system/kibana.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2021-10-22 16:04:19 UTC; 11s ago
       Docs: https://www.elastic.co
   Main PID: 249961 (node)
      Tasks: 18 (limit: 2340)
     Memory: 192.7M
        CPU: 10.514s
     CGroup: /system.slice/kibana.service
             ├─249961 /usr/share/kibana/bin/../node/bin/node /usr/share/kibana/bin/../src/cli/dist --logging.dest=/var/log/kibana/kibana.log --pid.file=/run/kibana/kibana.pid
             └─249973 /usr/share/kibana/node/bin/node --preserve-symlinks-main --preserve-symlinks /usr/share/kibana/src/cli/dist --logging.dest=/var/log/kibana/kibana.log --pid.file=/run/kibana/ki>

Oct 22 16:04:19 debian-bullseye-01 systemd[1]: Started Kibana.
```

> Configure firewall to allow Kibana port for Kibana to be accessible from the internet

```bash
$ sudo ufw allow 5601/tcp
```

> Access Kibana dashboard from the browser using your server IP or hostname and Kibana port 5601: *http://<server-ip-address>:5601*

```bash
# Enter web site in browser
http://localhost:5601
```

## Step 6: Install Logstash on Debian 10 / Debian 11

> Once Kibana is running, run the below command to install Logstash

```bash
$ sudo apt-get install logstash
```

### Configure Logstash

> Create a configuration file named `02-beats-input.conf` where you will set up your Filebeat input

```bash
$ sudo vim  /etc/logstash/conf.d/02-beats-input.conf
```

> Add the following content

```bash
input {
 beats {
   port => 5044
 }
}
```

> Create another configuration file to add filters configurations for system logs

```bash
sudo vim /etc/logstash/conf.d/10-syslog-filter.conf
```

> Add the following content to the file. This is just an example of a configuration for parsing incoming system logs to make them structured and usable by the Kibana dashboards:

```bash
filter {
    if [type] == "syslog" {
        grok {
          match => { "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }
          add_field => [ "received_at", "%{@timestamp}" ]
          add_field => [ "received_from", "%{host}" ]
        }
        syslog_pri { }
        date {
          match => [ "syslog_timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
        }
    }
}
```

> Lastly, create another configuration file where we are going to tell Logstash to store Beats data in Elasticsearch.

```bash
$ sudo vim /etc/logstash/conf.d/30-elasticsearch-output.conf
```

> Put the following content

```bash
output {
   elasticsearch {
     hosts => ["localhost:9200"]
     manage_template => false
     index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
   }
}
```

> Start and enable Logstash with the below commands:

```bash
$ sudo systemctl start logstash
$ sudo systemctl enable logstash
```

## Step 7: Install Filebeat on Debian 10 / Debian 11

> As explained earlier, ELK uses beats to ship data from various sources and present them to either Logstash or Elasticsearch. Below are some of the beats and what they do:

> In this tutorial we are going to install filebeat on the same server as Elasticsearch

```bash
$ sudo apt-get install filebeat
```

> Now configure filebeat to send data to Logstash:

```bash
$ sudo vim /etc/filebeat/filebeat.yml
```

> In the output section, comment out Elasticsearch and enable Logstash output

```bash
#-------------------------- Elasticsearch output ------------------------------
# output.elasticsearch:
 # Array of hosts to connect to.
 # hosts: ["localhost:9200"]

 # Optional protocol and basic auth credentials.
 #protocol: "https"
 #username: "elastic"
 #password: "changeme"

#----------------------------- Logstash output --------------------------------
output.logstash:
 # The Logstash hosts
 hosts: ["localhost:5044"]
...
```

### Enable Filebeat Modules

> The modules collect and parse system logs. Enable as below:

```bash
$ sudo filebeat modules enable system
```

### Load Index Template

> We need to load the template to elasticsearch manually since we have configured our output to Logstash. Run the command below:

```bash
$ sudo filebeat setup \
  --index-management -E output.logstash.enabled=false \
  -E 'output.elasticsearch.hosts=["localhost:9200"]'
```

> Now start and enable Filebeat as below:

```bash
$ sudo systemctl start filebeat
$ sudo systemctl enable filebeat
```

## Step 8: Other Information to remember

```bash
# status check
$ systemctl status logstash
$ systemctl status kibana
$ systemctl status elasticsearch
$ systemctl status filebeat

# start
$ systemctl start logstash
$ systemctl start kibana
$ systemctl start elasticsearch
$ systemctl start filebeat

# start
$ systemctl stop logstash
$ systemctl stop kibana
$ systemctl stop elasticsearch
$ systemctl stop filebeat

# restart
$ systemctl restart logstash
$ systemctl restart kibana
$ systemctl restart elasticsearch
$ systemctl restart filebeat

# request
$ curl -X GET 'localhost:9200' # elasticsearch root
$ curl -X GET /_cat/health?v # health check opt
```

### 참고 자료

- [ELK 개요와 설치](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27227?tab=note)
- [How to install ELK Stack?](https://techviewleo.com/install-elastic-stack-7-elk-on-debian/)
