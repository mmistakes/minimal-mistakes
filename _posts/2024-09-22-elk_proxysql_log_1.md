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

### 🙈ProxySQL의 로그 종류
---

먼저 ProxySQL에 존재하는 로그들이 무엇이 있는지 알아보도록 하겠습니다.

#### 1) 감사로그

ProxySQL의 감사 로그(Audit Log)는 버전 2.0.5부터 도입되었습니다.

이 기능은 특정 연결 활동을 추적할 수 있도록 해줍니다. ProxySQL를 사용하는 경우 DB 접근을 위한 단일 지점에 해당하는 경우가 대다수 이기 때문에 ProxySQL 을 통한 데이터베이스 접근에 대한 기록을 남겨두는 것은 중요한 부분입니다. 이 기능을 활성화하려면, mysql-auditlog_filename 변수를 구성하여 로그가 기록될 파일을 지정해야 합니다. 이 변수의 기본값은 빈 문자열이며, 기본적으로는 로그 기록이 활성화되지 않습니다.

기능을 활성화하면, 다음 이벤트들이 기록됩니다:

**MySQL 모듈**

- 성공적인 인증
- 실패한 인증
- 정상적인 연결 해제
- 연결 종료
- 스키마 변경(COM_INIT_DB)


**Admin 모듈**

- 성공적인 인증
- 실패한 인증
- 정상적인 연결 해제
- 연결 종료


저는 mysql-auditlog_filename 변수를 audit.log 라 지정하였습니다. 이후에 datadir 영역에 audit.log 가 저장되는데 아래 그림과 같은 형식으로 로그파일이 발생합니다. 

![audit.log](https://github.com/user-attachments/assets/8f499ed3-0126-4309-81d3-d62ec166812b)


지정한 이름 뒤에 8자리의 롤링형식 숫자가 더해져 파일이름이 생깁니다. 이러한 파일들은 추후 logrotate 를 통해 적절히 truncate & drop 처리를 해주어야 합니다.


**audit log 형식**

아래 내용을 펼치면 알 수 있듯이 각 라인마다 json 형식으로 출력됩니다.
대부분 필드명이 직관적이라 어떤 의미인지 금방 파악이 가능합니다. 다만 extra_info 필드는 의미가 모호해서 설명을 드리자면 세션이 코드의 어느 부분에서 닫혔는지를 나타냅니다.

<details><summary>audit.log</summary>
<div markdown="1">

```json
{
    "client_addr":"175.196.243.164:49960",
    "creation_time":"2024-09-28 13:02:52.145",
    "duration":"5.332ms",
    "event":"MySQL_Client_Close",
    "extra_info":"MySQL_Thread.cpp:4125:ProcessAllSessions_Healthy0()",
    "proxy_addr":"0.0.0.0:6033",
    "schemaname":"",
    "ssl":false,
    "thread_id":2,
    "time":"2024-09-28 13:02:52.151",
    "timestamp":1727496172151,
    "username":""
 }
 {
    "client_addr":"175.196.243.164:49961",
    "event":"MySQL_Client_Connect_OK",
    "proxy_addr":"0.0.0.0:6033",
    "schemaname":"information_schema",
    "ssl":true,
    "thread_id":3,
    "time":"2024-09-28 13:03:10.713",
    "timestamp":1727496190713,
    "username":"svcusr"
 }
 {
    "client_addr":"175.196.243.164:49961",
    "event":"MySQL_Client_Quit",
    "proxy_addr":"0.0.0.0:6033",
    "schemaname":"information_schema",
    "ssl":true,
    "thread_id":3,
    "time":"2024-09-28 13:03:15.045",
    "timestamp":1727496195045,
    "username":"svcusr"
 }
 {
    "client_addr":"175.196.243.164:49961",
    "creation_time":"2024-09-28 13:03:10.673",
    "duration":"4372.127ms",
    "event":"MySQL_Client_Close",
    "extra_info":"MySQL_Thread.cpp:4232:process_all_sessions()",
    "proxy_addr":"0.0.0.0:6033",
    "schemaname":"information_schema",
    "ssl":true,
    "thread_id":3,
    "time":"2024-09-28 13:03:15.045",
    "timestamp":1727496195045,
    "username":"svcusr"
 }
```
</div>
</details>

<br/>


#### 2) 에러로그

ProxySQL의 에러 로그(Error Log)는 버전 0.1부터 도입되었습니다. 이 기능은 ProxySQL에서 생성된 메시지를 파일에 기록할 수 있도록 해줍니다. ProxySQL이 -f 옵션과 함께 실행되면, 모든 메시지는 stdout으로 출력됩니다. 이 기능을 활성화하려면, 설정 파일(proxysql.cnf) 에서 errorlog 변수를 설정하여 로그가 기록될 파일을 지정해야 합니다. 이 변수의 기본값은 [datadir]/proxysql.log 입니다. 그리고 mysql-verbose_query_error 변수를 추가로 true로 설정하면 에러의 상세 정보가 더 많이 출력됩니다. 이 파일 경로는 절대 경로를 권장하고 있습니다.

기능을 활성화하면 다음과 같은 이벤트가 기록됩니다:

- 시작 메시지
- 종료 메시지
- 로드된 플러그인
- 에러 메시지
- 경고 메시지
- 정보 메시지
- 디버그 메시지
- 변수 설정


**에러로그 파일 형식**

현재 구현된 에러 로그의 파일 형식은 syslog 와 유사한 일반 텍스트 형식만 지원됩니다. 각 로그는 다음과 같은 속성을 가집니다:

- date: 날짜 (YYYY-MM-DD 형식)
- time: 시간 (HH:MM 로컬 시간)
- file:line: 메시지를 생성한 소스 코드의 파일, 줄 번호, 함수 이름
- \[loglevel\]: 로그 레벨 (info, warn, error, debug)
- message: 상세 메시지 (여러 줄일 수 있음)

![image](https://github.com/user-attachments/assets/25e0f54a-13a2-49ca-ac6e-776f32115d72)



#### 3) 쿼리로그

ProxySQL은 통과하는 쿼리를 로그로 기록할 수도 있는데 선택적으로 설정하여 특정 조건일 때만 쿼리를 로깅할 수도 있고 백엔드 호스트 그룹에 보낸 모든 SQL 문(또는 특정 유형의 SQL 문)을 저장할 수 있습니다.

버전 2.0.6 이전에는 mysql_query_rules.log를 사용하는 쿼리 규칙(Query Rules)으로 로깅을 설정할 수 있었으며, 이를 통해 매우 광범위하거나 세밀한 로깅이 가능합니다.

버전 2.0.6부터는 새로운 전역 변수 mysql-eventslog_default_log가 추가되었습니다. mysql_query_rules.log 값을 지정하지 않으면, mysql-eventslog_default_log가 적용됩니다. 이 변수의 기본값은 1이며, 가능한 값은 mysql-eventslog_format과 1입니다.

**설정**

지금 언급드릴 명령어를 통해 쿼리 로깅 설정이 가능합니다. 모두 바로 아래의 ProxySQL Admin 접속 포트로 연결을 하고 명령어를 수행해야합니다.

```bash
mysql -h127.0.0.1 -uadmin -p'admin' -P 6032
```

아래와 같이 파라미터를 적용합니다.

```sql
SET mysql-eventslog_filename='queries.log';
LOAD MYSQL VARIABLES TO RUNTIME;
SAVE MYSQL VARIABLES TO DISK;
```

혹시나 autocommit, mysql-eventslog_format 과 같은 기록들도 추가로 남기고 싶다면 아래의 설정도 활성화 합니다.

```sql
SET mysql-eventslog_default_log=1;
LOAD MYSQL VARIABLES TO RUNTIME;
SAVE MYSQL VARIABLES TO DISK;
```

만일 Insert 구문에 대한 기록을 남기고 싶다면 아래의 명령어를 사용합니다. 아래처럼 설정하면 모든 삽입 구문들이 로깅됩니다.(대소문자 상관없이 모든 삽입 명령어들이 로깅됩니다.)

```sql
INSERT INTO mysql_query_rules(rule_id, active, match_digest, log, apply) VALUES(1, 1, 'INSERT.*', 1, 0);
```

특정 유저의 모든 쿼리를 기록할 수도 있습니다. 예를들어 duhokim 이란 유저의 모든 기록을 남기고 싶다면 아래와 같이 설정합니다.

```sql
INSERT INTO mysql_query_rules(rule_id, active, username, log, apply) VALUES(1, 1, 'duhokim', 1, 0);
```

쿼리로깅이 활성화 되면 아래와 같이 datadir 영역에 query.log 파일이 기록됩니다. 재기동 될 때 마다 8자리의 숫자값들이 롤링된 형태로 붙습니다. audit.log 와 마찬가지로 logrotate 를 통해 관리가 필요합니다.

![proxysql query log 저장 구조](https://github.com/user-attachments/assets/341edf4a-c74a-409f-8208-f53f6e7b79a8)


2.0.6 버전 이전에는 /tools/eventslog_reader_sample 툴을 사용했어야 했지만 이후 버전 부터는 mysql-eventslog_format 파라미터의 값을 2 로 설정하면 json 형식으로 출력됩니다. 


```bash
mysql -h127.0.0.1 -uadmin -p'admin' -P 6032
```

```sql
SET mysql-eventslog_format=2;
LOAD MYSQL VARIABLES TO RUNTIME;
SAVE MYSQL VARIABLES TO DISK;
```

<details><summary>query.log</summary>
<div markdown="1">

```json
{
   "client":"175.196.243.164:49962",
   "digest":"0x40B75DE8A4AD05EE",
   "duration_us":10171,
   "endtime":"2024-09-28 13:03:28.008654",
   "endtime_timestamp_us":1727496208008654,
   "event":"COM_QUERY",
   "hostgroup_id":1,
   "query":"select * from mysql.user",
   "rows_sent":0,
   "schemaname":"information_schema",
   "server":"192.168.0.11:3306",
   "starttime":"2024-09-28 13:03:27.998483",
   "starttime_timestamp_us":1727496207998483,
   "thread_id":4,
   "username":"svcusr"
}{
   "client":"175.196.243.164:49963",
   "digest":"0xEC8F4091354B6EA1",
   "duration_us":416,
   "endtime":"2024-09-28 13:03:37.516404",
   "endtime_timestamp_us":1727496217516404,
   "event":"COM_QUERY",
   "hostgroup_id":1,
   "query":"select * from duhokim0901.select * from tab",
   "rows_sent":0,
   "schemaname":"information_schema",
   "server":"192.168.0.11:3306",
   "starttime":"2024-09-28 13:03:37.515988",
   "starttime_timestamp_us":1727496217515988,
   "thread_id":5,
   "username":"svcusr"
}{
   "client":"175.196.243.164:49964",
   "digest":"0x74C20CCE37936724",
   "duration_us":360,
   "endtime":"2024-09-28 13:03:40.007992",
   "endtime_timestamp_us":1727496220007992,
   "event":"COM_QUERY",
   "hostgroup_id":1,
   "query":"select * from duhokim0901.select * from tab1",
   "rows_sent":0,
   "schemaname":"information_schema",
   "server":"192.168.0.11:3306",
   "starttime":"2024-09-28 13:03:40.007632",
   "starttime_timestamp_us":1727496220007632,
   "thread_id":6,
   "username":"svcusr"
}
```

</div>
</details>


<br/>

### 📚로그수집 구조도
---
ProxySQL의 로그들을 ElasticSearch에 보내는 개념은 다음과 같습니다. 세분화 시키자면 elasticsearch 클러스터 만으로도 노드 별 Role 이 다양하기 때문에 구조가 복잡해지겠지만 큰 흐름은 아래의 그림과 같습니다.

![ELK 스택의 로그수집 구조](https://github.com/user-attachments/assets/f4bbfcd0-8372-4ed3-bf4c-d49b81ca9758)

Filebeat 를 이용하여 원하는 로그의 내용을 가져옵니다. 그리고 해당 로그를 Logstash 라는 전처리기를 통해 구문을 분석하고 변환, 정제합니다. Logstash를 통해 정제된 내용들은 Elasticsearch 라는 저장소로 전달합니다. 그리고 이렇게 저장된 데이터들은 Kibana 를 통해 시각화할 수 있습니다.

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

- filebeat.inputs : 수집해야할 로그를 명시합니다. 그리고 저 같은 경우는 tags 를 logstash 에서 전달받은 로그를 어떤 인덱스로 보낼지 분기하기 위해 사용합니다. 자세한 내용은 logstash 설정을 언급할 때 다시 말씀드리도록 하겠습니다.

- output.logstash : 수집된 로그를 전달하기 위한 설정입니다. 로그들을 전처리하기 위해 logstash 로 전달합니다.

<br/>

#### 1) proxySQL 감사로그 - filebeat 설정

감사로그용 filebeat 을 만들기 위해 /etc/filebeat 경로에 filebeat.yml 을 복사하여 filebeat_audit.yml 을 하나 만듭니다.

```bash
cp /etc/filebeat/filebeat.yml /etc/filebeat/filebeat_proxysql_audit.yml
```

filebeat_audit.yml 의 주요설정입니다.

```yml
filebeat:
  registry:
    path: /tmp/myqsl-proxysql-audit-log-registry.json

filebeat.inputs:
- type: log
  paths:
    - /{datadir경로}/audit.log.*
  tags: ["mysql-proxysql-audit-log","mysql"]

output.logstash:
  hosts: ["로그스태시주소:5503"]
```

- filebeat.registry.path : 이 설정은 Filebeat가 로그 파일의 읽은 위치를 저장하는 레지스트리 파일의 경로를 지정합니다. Filebeat는 로그 파일을 읽을 때 이미 읽은 로그를 다시 읽지 않기 위해 파일의 현재 오프셋(읽은 위치)을 레지스트리 파일에 기록합니다. 만약 Filebeat가 재시작되더라도 레지스트리 파일을 통해 중복되지 않게 로그를 읽을 수 있습니다.

- filebeat.inputs.paths : 수집할 로그 파일의 경로를 정의합니다. 이 경우 datadir 경로의 audit.log.* 경로에서 로그 파일을 읽습니다. .*는 와일드카드로, 여러 개의 로그 파일을 처리할 수 있습니다. 예를 들어, audit.log, audit.log.1 등과 같은 여러 로그 파일을 포함할 수 있습니다.

- tags : 태그를 설정합니다. 태그는 로그 이벤트에 메타데이터를 추가하기 위한 필드로, 로그 분석 시 필터링을 쉽게 만들어 줍니다. 이 설정에서 각 로그 이벤트에 mysql-proxysql-audit-log 및 mysql 태그가 추가됩니다. 저는 이 태그를 이용해서 logstash 에서 elasticsearch로 보낼 대 특정 인덱스로 보내는 작업을 합니다.

- output.logstash.hosts: 로그 데이터를 보낼 Logstash 서버의 호스트 주소와 포트를 지정합니다. 로그스태시주소 포트 5503으로 설정되어 있습니다. 이를 통해 Filebeat는 이 Logstash 서버로 데이터를 전송하게 됩니다.



<br/>

#### 2) proxySQL 에러로그 - filebeat 설정

에러로그용 filebeat 을 만들기 위해 /etc/filebeat 경로에 filebeat.yml 을 복사하여 filebeat_error.yml 을 하나 만듭니다.

```bash
cp /etc/filebeat/filebeat.yml /etc/filebeat/filebeat_proxysql_error.yml
```

filebeat_error.yml 의 주요설정입니다.

```yml
filebeat:
  registry:
    path: /tmp/myqsl-proxysql-error-log-registry.json

filebeat.inputs:
- type: log
  paths:
    - /{datadir경로}/proxysql.log
  multiline.pattern: '^\d{4}-\d{2}-\d{2}'  # 타임스탬프 패턴 (로그의 시작을 나타내는 패턴)
  multiline.negate: true
  multiline.match: after
  tags: ["mysql-proxysql-error-log","mysql"]    

output.logstash:
  hosts: ["로그스태시주소:5504"]
```

대부분 위에서 언급드린 audit 의 설정과 동일합니다. 다른 부분만 설명드리자면 다음과 같습니다.

- multiline.pattern: 여러 줄인 로그의 시작을 정의하는 정규 표현식을 설정 필드입니다. 패턴 '^\d{4}-\d{2}-\d{2}'는 로그의 첫 줄이 날짜 형식(예: 2024-09-29)으로 시작되는 경우를 나타냅니다. 로그에서 날짜로 시작하는 줄을 하나의 새로운 로그 항목으로 간주합니다.

- multiline.negate: true로 설정되면, 패턴과 일치하지 않는 줄이 있을 때 그 줄을 이전 줄에 추가합니다. 이 설정에서 true로 지정된 이유는 다중 줄 로그가 패턴과 일치하지 않는 줄로 이어지는 경우를 처리하기 위해서입니다. 즉, 날짜로 시작하지 않는 줄들은 이전 줄의 연속으로 간주됩니다.

- multiline.match: after는 패턴과 일치하는 첫 줄 이후에 나오는 줄들을 하나의 로그 항목으로 묶겠다는 의미입니다.
예를 들어, 로그 파일에서 첫 줄이 날짜로 시작하고, 그 다음 줄들이 패턴과 일치하지 않을 경우 그 줄들을 함께 묶어 하나의 로그 항목으로 처리합니다.


<br/>

#### 3) proxySQL 쿼리로그 - filebeat 설정

쿼리로그용 filebeat 을 만들기 위해 /etc/filebeat 경로에 filebeat.yml 을 복사하여 filebeat_error.yml 을 하나 만듭니다.

```bash
cp /etc/filebeat/filebeat.yml /etc/filebeat/filebeat_proxysql_query.yml
```

filebeat_error.yml 의 주요설정입니다.

```yml
filebeat:
  registry:
    path: /tmp/myqsl-proxysql-query-log-registry.json

filebeat.inputs:
- type: log
  paths:
    - /{datadir경로}/queries.log.*
  tags: ["mysql-proxysql-query-log","mysql"]  

output.logstash:
  hosts: ["로그스태시주소:5505"]
```

대부분 위에서 언급드린 audit 의 설정과 동일합니다.


#### 4) filebeat systemd 설정

각각의 filebeat의 systemd 를 만들어 보겠습니다. 기존의 /usr/lib/systemd/system/filebeat.service 파일을 복사하여 각 로그용도의 system load file 을 생성합니다.

```bash
cp /usr/lib/systemd/system/filebeat.service /usr/lib/systemd/system/filebeat_proxysql_audit.service
cp /usr/lib/systemd/system/filebeat.service /usr/lib/systemd/system/filebeat_proxysql_error.service
cp /usr/lib/systemd/system/filebeat.service /usr/lib/systemd/system/filebeat_proxysql_query.service
```

그리고 각 파일을 열어 환경 변수들을 변경합니다. /usr/lib/systemd/system/filebeat_proxysql_audit.service 파일을 예시로 들면 다음과 같습니다.

```bash
[Unit]
Description=Filebeat sends log files to Logstash or directly to Elasticsearch.
Documentation=https://www.elastic.co/beats/filebeat
Wants=network-online.target
After=network-online.target

[Service]

UMask=0027
Environment="GODEBUG='madvdontneed=1'"
Environment="BEAT_LOG_OPTS="
Environment="BEAT_CONFIG_OPTS=-c /etc/filebeat/filebeat_proxysql_audit.yml" #변경항목
Environment="BEAT_PATH_OPTS=--path.home /usr/share/filebeat --path.config /etc/filebeat --path.data /var/lib/filebeat_proxysql_audit --path.logs /var/log/filebeat_proxysql_audit" #변경항목
ExecStart=/usr/share/filebeat/bin/filebeat --environment systemd $BEAT_LOG_OPTS $BEAT_CONFIG_OPTS $BEAT_PATH_OPTS
Restart=always

[Install]
WantedBy=multi-user.target
```

보시는 바와 같이 설정파일의 경로와 --path.data, --path.logs 의 설정을 변경합니다. 서로 겹치지 않게 주의합니다.


아래 명령어를 통해 수정된 데몬들을 각각 활성화합니다.

```bash
systemctl enable filebeat_proxysql_audit.service
systemctl enable filebeat_proxysql_error.service
systemctl enable filebeat_proxysql_query.service
```

그리고 기동합니다.

```bash
systemctl start filebeat_proxysql_audit.service
systemctl start filebeat_proxysql_error.service
systemctl start filebeat_proxysql_query.service
```



<br/>

### 🚀ProxySQL 로그 수집을 위한 Logstash 설정
---
ProxySQL 로그 수집을 위한 Filebeat 설정을 알아보도록 하겠습니다. 들어오는 로그 포맷에 따라 필터처리하는 방식이 달라집니다. Json 같은 경우 Json Filter를 이용하면 아주 손쉽게 필드들을 구분하여 수집할 수 있습니다. 혹 Json 형식이 아니더라도 Grok 패턴 Filter 를 적용한다면 마찬가지로 정교하게 수집할 수 있습니다. filter나 output의 길이가 너무 길면 가독성이 좋지 않기 때문에 로그의 성격별로 /etc/logstash.conf.d 디렉토리에 설정파일을 분류해두면 관리하기 좋습니다. 저는 그런 취지에서 3개의 파일에 대한 logstash의 설정파일을 각각 따로 설정하도록 하겠습니다.(물론 if ~ else 처리로 한 파일 내에 분기 쳐도 괜찮습니다.)

파일을 각각 만들어줍니다.

```bash
cd /etc/logstash/conf.d/

ls -al 

합계 20
drwxr-xr-x. 2 root root  129  9월 29 02:26 .
drwxr-xr-x. 4 root root 4096  9월 27 23:06 ..
-rw-r--r--. 1 root root  750  9월 27 23:08 mysql_proxysql_audit.conf
-rw-r--r--. 1 root root  753  9월 27 23:08 mysql_proxysql_error.conf
-rw-r--r--. 1 root root  748  9월 27 23:08 mysql_proxysql_query.conf

```

#### 1) 감사로그의 logstash 설정

아래는 감사로그용 logstash의 설정파일입니다.

```yml
input {
        beats { 
                port => 5003
                host => "0.0.0.0"
        }
}

filter {
        if "mysql-proxysql-audit-log" in [tags] {
                json {
                        source => "message"
                }
                    mutate {
                        rename => { "event" => "connect_type" }
                    }
        }
}

output {
        if "mysql-audit-log" in [tags] {
                elasticsearch {
                        hosts => ["http://엘라스틱서치주소:엘라스틱서치포트"]
                        user => "elastic"
                        password => "elatsic패스워드"
                        index => "mysql-audit-logs-%{+YYYY.MM.dd}"
            }
        }
}
```

- input: Logstash가 Filebeat와 같은 Beats 클라이언트로부터 로그 데이터를 수신할 수 있고 5000 포트를 통해 데이터를 수신합니다. host => "0.0.0.0" 설정을 통해서 모든 네트워크 인터페이스에서 들어오는 데이터를 수신할 수 있습니다.

- filter: 이 섹션에서는 수신된 로그 데이터를 특정 조건에 맞춰 처리 및 변환하는 작업을 수행합니다. 주로 로그 데이터를 변환하거나 불필요한 데이터를 제거할 때 사용됩니다.
  - if "mysql-proxysql-audit-log" in [tags] : 수신된 로그 데이터의 tags 필드에 "mysql-proxysql-audit-log" 태그가 포함되어 있는지 확인합니다. 해당 태그가 포함된 경우에만 아래의 필터가 적용됩니다. 이 조건을 통해 ProxySQL 감사 로그와 관련된 데이터만 필터링 및 변환할 수 있습니다.

  - json: 수신된 로그 데이터가 JSON 형식일 때, 이 데이터를 파싱하여 구조화된 데이터로 변환합니다. source => "message" 설정을 통해서 로그의 JSON 데이터를 message 필드에 포함시킵니다.

  - mutate: mutate 필터는 로그 데이터 내의 필드를 변환하거나 조작하는 데 사용됩니다. rename 옵션을 사용하여 필드 이름을 변경합니다. 가져오는 json 필드내에 event 필드가 있는데 이미 예약어로 존재했기 때문에 그냥 가져오면 conflict가 발생합니다. 따라서 필드의 이름을 변경해주어서 conflict를 예방하고 필드의 의미를 명확히 해주는 작업이 필요합니다. rename => { "event" => "connect_type" } 이라는 설정을 통해서 event라는 필드 이름을 connect_type으로 변경합니다.


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
                hosts => ["엘라스틱서치주소:엘라스틱서치포트"]
                        user => "elastic"
                        password => "elatsic패스워드"
                        index => "mysql-proxysql-error-logs-%{+YYYY.MM.dd}"
            }
        }
}
```

감사로그의 logstash 설정과 다른부분만 설명드리겠습니다. 

- filter: 이 섹션에서는 수신된 로그 데이터를 특정 조건에 따라 처리하고 변환하는 작업을 수행합니다. grok 필터는 로그 메시지를 특정 패턴에 따라 파싱하고 필드로 나누는 데 사용됩니다. 주로 비정형 로그를 구조화된 데이터로 변환하는 역할을 합니다. match 를 통해 message 필드에 있는 로그 데이터를 특정 패턴에 따라 매칭하여 개별 필드로 추출합니다.
사용된 패턴은 다음과 같습니다.
  - %{TIMESTAMP_ISO8601:timestamp}: ISO 8601 형식의 타임스탬프를 추출하여 timestamp라는 필드에 저장합니다.
  - %{GREEDYDATA:error_trace}: 뒤에 따라오는 데이터를 모두 잡아 error_trace 필드에 저장합니다.
  - \[%{LOGLEVEL:level}\]: 로그 레벨(예: INFO, ERROR 등)을 추출하여 level 필드에 저장합니다. 로그 레벨은 대괄호로 둘러싸여 있습니다.
  - %{GREEDYDATA:error_message}: 남은 메시지를 모두 잡아 error_message 필드에 저장합니다.



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
                        user => "elastic"
                        password => "elatsic패스워드"
                        index => "mysql-proxysql-query-logs-%{+YYYY.MM.dd}"
            }
        }
}
```

대부분 위에서 언급드린 audit 의 설정과 동일합니다.


위의 작업이 모두 끝났다면 logstash를 기동합니다.

```bash
systemctl start logstash.service
```


<br/>

### 😸ProxySQL 로그 수집을 위한 kibana 설정
---
시각화 도구인 kibana를 통해 수집한 로그를 확인합니다. 이를위해 로그스태시 URL 주소에 접근합니다. 그리고 elasticsearch 구성시 생성한 elastic 계정의 패스워드로 로그인합니다.
아래는 proxySQL의 쿼리로그의 시각화 예시입니다.

```
http://kibana주소:5601
```

그리고 좌측 햄버거 아이콘을 클릭 후 Discover 에 들어갑니다.

![Dicover](https://github.com/user-attachments/assets/e961e937-bfdd-49c3-93f4-f8a8f382e2c1)

좌측상단의 파란색 박스에 인덱스 선택 란을 클릭한 후 Create a data view 를 선택합니다.

![Create a data view](https://github.com/user-attachments/assets/a515a649-d0c4-47aa-ab06-e12243e215a7)

Create data view 상세화면에 진입하면 data view 명칭과 인덱스 패턴을 설정합니다. 저는 data view 명칭은 mysql-proxysql-querty-logs 라고 기재하였습니다.(이미 만들어 놓았기 때문에 빨간색 글씨로 경고 문구가 나왔습니다만 최초 생성한다면 해당 문구는 없습니다.) 그리고 인덱스 패턴은 mysql-proxysql-queryt-logs-* 로 설정하였습니다. 우측에 해당 인덱스 패턴과 매칭되는 소스들을 확인할 수 있습니다. 그리고 Save data view to Kibana 를 눌러 설정을 반영합니다.

좌측의 Search field names 라는 항목이 있을 것입니다. 해당 란에서 필드명을 검색해볼 수 있는데 host.name 필드와 message 필드를 검색해서 Add field as column 버튼을 눌러 우측 컬럼 항목에 추가해줍니다.

![Add field as column](https://github.com/user-attachments/assets/203552d8-fc82-4c74-80b1-79e3809b1b8e)

추가하면 아래와 같은 결과 화면을 볼 수 있습니다. host.name 필드는 filebeat로 가져온 로그가 저장된 파일의 hostname 이 저장된 컬럼입니다.(예약어로 지정된 컬럼) message 컬럼은 logstash 의 json filter 처리시에 source => "message" 설정으로 인해 json 형식의 로그 메시지들이 담겨 있습니다.

![hostname과 message 컬럼](https://github.com/user-attachments/assets/6e781ab4-42a2-4642-b8b2-031b3501c66a)


그리고 우측 행의 좌측의 확대 아이콘(Toggle dialog with details)을 클릭하면 해당 도큐먼트에 설정된 모든 필드를 확인할 수 있습니다. 

![Toggle dialog with details](https://github.com/user-attachments/assets/cf7a0b8b-9f30-4948-8d8d-09caf8452c95)

![Document](https://github.com/user-attachments/assets/167c93c7-fc51-4f30-969c-a5f4666fc66d)

도큐먼트 정보란에 분류된 필드 중 원하는 필드를 기억해두고 Search field names 에서 검색한 뒤 추가 버튼을 눌러 원하는 컬럼만 볼 수 있습니다. 저는 아래와 같이 보고싶은 필드를 다시 정리하였습니다.

![proxySQL query 로그 시각화](https://github.com/user-attachments/assets/74874907-7ca8-4c86-ab07-1e3fd58fd7ba)

위의 루틴대로 시각화 설정을 하면 proxySQL의 감사로그와 에러로그도 다음과 같이 설정할 수 있습니다.

![proxySQL error 로그 시각화](https://github.com/user-attachments/assets/8e849bab-4f5e-434d-b44e-3cc8d6223d6b)
에러로그의 경우 grok 패턴으로 전처리를 하였는데요. 멀티라인의 로그도 이상없이 하나의 행에 잘 담겨있는 모습입니다.

![proxySQL audit 로그 시각화](https://github.com/user-attachments/assets/75008ca2-b08d-46e4-942d-9777f29654f5)
감사로그도 문제 없이 잘 수집된 모습입니다.


이렇게 proxySQL의 로그를 ELK 를 사용하여 수집하고 시각화하는 방법에 대해 말씀드려보았습니다. 긴 글 읽어주셔서 감사드립니다.
<br/>


### 📚참고문헌
[ProxySQL 감사로그(클릭)](https://proxysql.com/documentation/audit-log/?highlight=log)

[ProxySQL 에러로그(클릭)](https://proxysql.com/documentation/error-log/?highlight=log)

[ProxySQL 쿼리로그(클릭)](https://proxysql.com/documentation/query-logging/?highlight=log)

{% assign posts = site.categories.Elk %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}