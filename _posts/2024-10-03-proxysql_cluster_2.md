---
title: "[MySQL/MariaDB] ProxySQL 클러스터 구성(2/3)"
excerpt: "HA를 고려한 ProxySQL 클러스터 구성을 테스트합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-03
last_modified_at: 2024-10-03
comments: true
---

### 😸ProxySQL 클러스터 테스트 구성
---
간단한 테스트를 위해 HA를 고려한 ProxySQL 클러스터 구성을 해보도록 하겠습니다. [ProxySQL에 대한 기본적인 설명은 이전 포스팅을 참고(클릭)](https://duhokim0901.github.io/mysql/proxysql_cluster_1/)하시기 바랍니다. 저는 핵심 멤버 2대를 클러스터로 구성하고 keepalived 를 이용하여 각각 active, backup 용도로 구분할 예정입니다. keepavlied 설정으로 인해 active 상태인 서버는 vip로 연결할 수 있습니다. vip를 할당받은 서버에 구성된 ProxySQL이 강제종료 되면 VRRP 프로토콜에 의해 backup 상태의 노드가 active로 전환됩니다. 구성한 ProxySQL 2대를 모두 핵심 멤버로 구성하는 이유는 핵심 멤버 1대가 문제가 생겼을 경우 다른 핵심 멤버를 통해 설정을 전파할 수 있기 때문입니다. 아래 그림은 테스트로 구성할 ProxySQL의 아키텍처입니다. 

![keepalived + ProxySQL 클러스터 + MySQL 레플리카 구성안](https://github.com/user-attachments/assets/816a403c-b937-4453-8ba7-ac523f06642a)
[그림1] keepalived + ProxySQL 클러스터 + MySQL 레플리카 구성안

테스트 환경은 아래와 같습니다.

**서버정보**
- mysql-server1 192.168.0.11
- mysql-server2 192.168.0.12
- mysql-server3 192.168.0.13


**구성정보**

| 구성              | 버전             | OS        | 서버 대수                | 서버 IP                  |
|-------------------|------------------|-----------|--------------------------|--------------------------|
| **ProxySQL**       | 2.7.0-11         | Rocky 8.8 | 2대                      | mysql-server1, mysql-server2|
| **Keepalived**     | 2.1.5            | -         | Active/Backup             | Active: mysql-server1      |
|                   |                  |           |                          | Backup: mysql-server2      |
| **MySQL**          | 8.0.39           | Rocky 8.8 | 3대                      | mysql-server1(P), mysql-server2(R), mysql-server3(R) |

<br/>

실습환경은 ProxySQL 1대와 MySQL3대는 이미 구성 중이고 mysql-server2 에 설정정보가 전혀 반영되어 있지 않은 ProxySQL을 신규 설치한 상황입니다. 이 상황에서 ProxySQL 클러스터를 구성하고 keepalived 를 이용하여 HA 설정을 해보려합니다. 테스트 환경처럼 ProxySQL 구성이 아직 안되어 있다면 **ProxySQL 기본설치편(클릭)** 를 먼저 확인하시고 읽어주시기 바랍니다.

<br/>

### 🚀ProxySQL 클러스터 설정
---
mysql-server1의 ProxySQL 관리콘솔에 접속하여 ADMIN VARIABLES 를 변경합니다.

```bash
mysql -u admin -padmin -h 127.0.0.1 -P6032 --prompt='Admin> ' 
```

그리고 아래와 같이 클러스터 설정에 필요한 클러스터 사용자의 정보를 추가합니다.

```sql
UPDATE global_variables SET variable_value='admin:admin;cluster_user:cluster_pass' WHERE variable_name='admin-admin_credentials';
UPDATE global_variables SET variable_value='cluster_user' WHERE variable_name='admin-cluster_username';
UPDATE global_variables SET variable_value='cluster_pass' WHERE variable_name='admin-cluster_password';
```

그리고 클러스터의 상태를 체크하기 위한 용도의 ADMIN VARIABLES 도 추가합니다. 명령어에 대한 설명은 주석을 참고하시면 됩니다.

```sql
/*클러스터의 상태를 확인하는 간격을 설정합니다. 이 경우 1000ms로 설정되어 있으며, 클러스터의 상태를 1초마다 점검하게 됩니다.*/
UPDATE global_variables SET variable_value=1000 WHERE variable_name='admin-cluster_check_interval_ms';

/*클러스터 상태 체크의 빈도를 설정합니다. 10으로 설정되었으므로 ProxySQL은 클러스터 상태를 10번 확인한 후 결과를 기록합니다.*/
UPDATE global_variables SET variable_value=10 WHERE variable_name='admin-cluster_check_status_frequency';

/*MySQL 쿼리 규칙을 디스크에 저장할지 여부를 설정합니다. true로 설정되었으므로, 쿼리 규칙이 클러스터에 동기화될 때 디스크에 저장됩니다.*/
UPDATE global_variables SET variable_value='true' WHERE variable_name='admin-cluster_mysql_query_rules_save_to_disk';

/*MySQL 서버 정보가 클러스터에 동기화될 때 디스크에 저장할지 여부를 설정합니다. true로 설정되었으므로 MySQL 서버 정보가 디스크에 저장됩니다.*/
UPDATE global_variables SET variable_value='true' WHERE variable_name='admin-cluster_mysql_servers_save_to_disk';

/*MySQL 사용자 정보가 클러스터에 동기화될 때 디스크에 저장할지 여부를 설정합니다. true로 설정되었으므로 MySQL 사용자 정보가 디스크에 저장됩니다.*/
UPDATE global_variables SET variable_value='true' WHERE variable_name='admin-cluster_mysql_users_save_to_disk';

/*ProxySQL 서버 정보가 클러스터에 동기화될 때 디스크에 저장할지 여부를 설정합니다. true로 설정되었으므로 ProxySQL 서버 정보가 디스크에 저장됩니다.*/
UPDATE global_variables SET variable_value='true' WHERE variable_name='admin-cluster_proxysql_servers_save_to_disk';

/*쿼리 규칙이 동기화되기 전에 몇 번의 차이점(diff)을 허용할지를 설정합니다. 3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables SET variable_value=3 WHERE variable_name='admin-cluster_mysql_query_rules_diffs_before_sync';

/*MySQL 서버 정보 동기화 전에 허용할 차이점의 수를 설정합니다. 3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables SET variable_value=3 WHERE variable_name='admin-cluster_mysql_servers_diffs_before_sync';

/*MySQL 사용자 정보 동기화 전에 허용할 차이점의 수를 설정합니다. 3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables SET variable_value=3 WHERE variable_name='admin-cluster_mysql_users_diffs_before_sync';

/*ProxySQL 서버 정보 동기화 전에 허용할 차이점의 수를 설정합니다. 3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables SET variable_value=3 WHERE variable_name='admin-cluster_proxysql_servers_diffs_before_sync';
```


위에서 반영한 어드민 변수를 런타임으로 로드하고 영구반영하기 위해 디스크에 저장합니다.

```sql
LOAD ADMIN VARIABLES TO RUNTIME;
SAVE ADMIN VARIABLES TO DISK;
```

그리고 클러스터 멤버 중 핵심 멤버 정보를 proxysql_servers 테이블에 입력합니다. 입력 대상에서 위성 멤버는 제외해야합니다.

```sql
INSERT INTO proxysql_servers VALUES('192.168.0.11',6032,0,'proxysql_node1');
INSERT INTO proxysql_servers VALUES('192.168.0.12',6032,0,'proxysql_node2');
```

 PROXYSQL SERVERS 정보를 런타임으로 로드하고 영구반영하기 위해 디스크에 저장합니다.

 ```sql
LOAD PROXYSQL SERVERS TO RUNTIME;
SAVE PROXYSQL SERVERS TO DISK;
 ```


proxysql_servers 테이블에 명시된 핵심 멤버의 정보들을 기반으로 설정을 가져옵니다. 위성 멤버의 경우 RUNTIME 단계로 proxysql_servers 설정을 반영시켜야 핵심 멤버의 정보들을 동기화합니다. 초기 동기화 과정에서 아래와 같은 에러가 반복적으로 발생합니다. 

```
Cluster: detected a peer %s with **module_name** version 1, epoch %d, diff_check %d. Own version: 1, epoch: %d. diff_check is increasing, but version 1 doesn't allow sync

실제 예시
[WARNING] Cluster: detected a peer 192.168.0.11:6032 with mysql_servers version 1, epoch 1727874872, diff_check 210. Own version: 1, epoch: 1727932964. diff_check is increasing, but version 1 doesn't allow sync. This message will be repeated every 30 checks until LOAD MYSQL SERVERS TO RUNTIME is executed on candidate master.
```

위의 에러는 핵심 멤버의 현재 정보의 설정과 위성 멤버의 현재 정보의 설정을 비교하고 있는데(diff_check) 버전이 1인 상황이어서 동기화를 하지 못한다는 내용입니다.이 일치하기 때문에 나타나는 현상으로 핵심 멤버중 하나에 접근해서 모듈 정보를 명시적으로 LOAD 함으로써 설정 버전을 올리면 해결됩니다.

```
LOAD **MODULE_NAME** TO RUNTIME;

실제 예시
LOAD MYSQL SERVERS TO RUNTIME;
```

<br/>

### 🚀제목 
---
본문


<br/>

### ✏️제목
---
본문

<br/>

### 😸제목
---
본문

<br/>


### 📚 참고자료
---
- [ProxySQL 클러스터](https://proxysql.com/documentation/proxysql-클러스터/)
- [Where Do I Put ProxySQL?](https://www.percona.com/blog/where-do-i-put-proxysql/)
- [ProxySQL Aurora 구성](https://community.aws/content/2fUJK8dG9EYXLr52nCWVRejCCf0/using-proxysql-to-replace-deprecated-mysql-8-0-query-cache)
- 
<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}