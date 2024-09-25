---
title: "[ELK] proxySQL 로그 수집"
excerpt: "filebeat와 logstash를 이용하여 proxySQL의 로그를 수집해봅니다."

categories:
  - Elk
tags:
  - [elk, elasticsearch, filebeat, logstash]
#permalink: mysql-first
toc: true
toc_sticky: true
 
date: 2024-09-22
last_modified_at: 2024-09-22
comments: true
---

ProxySQL은 MySQL의 L7 Layer에서 커넥션 풀 관리와 로드밸런싱을 돕는 Third Party 솔루션입니다. DBA에게는 너무나도 유용한 솔루션 중에 하나입니다. 이번에는 ProxySQL의 로그들을 장기간 보관하고 통합 관리할 수 있도록 ElasticSearch에 보내는 방법을 공유드리고자 합니다.

### 🙈ProxySQL의 로그(Log) 종류
---

먼저 ProxySQL에 존재하는 로그들이 무엇이 있는지 알아보도록 하겠습니다.

#### 1) 감사로그

#### 2) 에러로그

#### 3) 쿼리로그

<br/>

### 📚로그수집 구조도
---
ProxySQL의 로그들을 ElasticSearch에 보내는 개념은 다음과 같습니다.

<br/>

### 🚀ProxySQL 로그 수집을 위한 Filebeat 설정
---
ProxySQL 로그 수집을 위한 Filebeat 설정을 알아보도록 하겠습니다. Filebeat 설정은 간단합니다. filebeat.inputs 와 output.logstash 항목을 작성하면 됩니다. 아래는 설정 예시입니다.

```yml
#filebeat.inputs

filebeat.inputs:
- type: log
  paths:
    - /data/mysql/log/audit.log
  tags: ["mysql-audit-log","mysql"]

output.logstash:
  # The Logstash hosts
  hosts: ["로그스태시접속주소:허용포트"]
```

filebeat.inputs 를 통해 수집해야할 로그를 명시합니다. 그리고 저 같은 경우는 tags 를 logstash 에서 전달받은 로그를 어떤 인덱스로 보낼지 분기하기 위해 사용합니다. 자세한 내용은 logstash 설정을 언급할 때 다시 말씀드리도록 하겠습니다.

<br/>

### 🚀ProxySQL 로그 수집을 위한 Logstash 설정
---
ProxySQL 로그 수집을 위한 Filebeat 설정을 알아보도록 하겠습니다. 들어오는 로그 포맷에 따라 필터처리하는 방식이 달라집니다. Json 같은 경우 Json Filter를 이용하면 아주 손쉽게 필드들을 구분하여 수집할 수 있습니다. 혹 Json 형식이 아니더라도 Grok 패턴 Filter 를 적용한다면 마찬가지로 정교하게 수집할 수 있습니다.

#### 1) 감사로그의 logstash 설정

```yml
input {
        beats { 
                port => 5000
                host => "0.0.0.0"
        }
}

filter {
        if "mysql-audit-log" in [tags] {
                json {  
                        source => "message"
                }

                # audit_record.name이 "PING"이면 로그를 제외
                if [audit_record][name] == "Ping" {
                    drop { }
                }
        }

}

output {
        if "mysql-audit-log" in [tags] {
                elasticsearch {
                        hosts => ["http://10.0.2.101:9200"]
                        user => "elastic"
                        password => "xyNgYy_+qpxWxT-X_0hJ"
                        index => "mysql-audit-logs-%{+YYYY.MM.dd}"
            }
        }
}
```

#### 2) 에러로그의 logstash 설정

```yml
input {
        beats { 
                port => 5502
                host => "0.0.0.0"
        }
}

filter {
        if "mysql-proxysql-error-log" in [tags] {
                grok {
                        match => { 
                                        "message" => "%{TIMESTAMP_ISO8601:timestamp}%{GREEDYDATA:error_trace}\[%{LOGLEVEL:level}\] %{GREEDYDATA:error_message}"
                                }
                }
        }
}

output {
        if "mysql-proxysql-error-log" in [tags] {
                elasticsearch {
                hosts => ["http://10.0.2.101:9200"]
                        #ssl_enabled => true
                        #ssl_keystore_path => "/etc/logstash/certs/http.p12"
                        #ssl_keystore_password => "duhokim"
                        #ssl_truststore_path => "/etc/logstash/certs/http.p12"
                        #ssl_truststore_password => "duhokim"
                        user => "elastic"
                        password => "xyNgYy_+qpxWxT-X_0hJ"
                        index => "mysql-proxysql-error-logs-%{+YYYY.MM.dd}"
            }
        }
}
```


#### 3) 쿼리로그의 logstash 설정

```yml
input {
        beats { 
                port => 5501
                host => "0.0.0.0"
        }
}

filter {
        if "mysql-proxysql-query-log" in [tags] {
                json {
                        source => "message"
                }
                    mutate {
                        rename => { "event" => "query_type" }
                    }
        }
}

output {
        if "mysql-proxysql-query-log" in [tags] {
                elasticsearch {
                hosts => ["http://10.0.2.101:9200"]
                        #ssl_enabled => true
                        #ssl_keystore_path => "/etc/logstash/certs/http.p12"
                        #ssl_keystore_password => "duhokim"
                        #ssl_truststore_path => "/etc/logstash/certs/http.p12"
                        #ssl_truststore_password => "duhokim"
                        user => "elastic"
                        password => "xyNgYy_+qpxWxT-X_0hJ"
                        index => "mysql-proxysql-query-logs-%{+YYYY.MM.dd}"
            }
        }
}
```

<br/>

### 😸문제해결
---
이빅션 쓰레드는 한정된 공유캐시의 공간을 확보하기 위해 적절히 제거할 수 있는 페이지를 디스크 영역으로 동기화 시키는 작업을 수행하는데 이 때 하자드 포인터를 참조하여 공유 캐시에 제거 가능한지 여부를 확인합니다. 

사용자 쓰레드는 사용자의 쿼리를 처리하기 위해 WiredTiger 의 공유캐시를 참조할 때 먼저 하자드 포인터에 자신이 참조하는 페이지를 등록합니다. 그리고 사용자 쓰레드가 쿼리를 처리하는 동안 이빅션 쓰레드는 동시에 캐시에서 제거해야 할 데이터 페이지를 골라 캐시에서 삭제하는 작업을 실행합니다. 이때 "이빅션 쓰레드"는 적절히 제거할 수 있는 페이지(자주 사용되지 않는 페이지)를 골라 먼저 하자드 포인터에 등록돼 있는지 확인합니다.

<br/>

{% assign posts = site.categories.Elk %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}