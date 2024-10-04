---
title: "[MySQL/MariaDB] ProxySQL 클러스터 구성(2/2)"
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
| **Keepalived**     | 2.1.5            | Rocky 8.8 | Active/Backup             | Active: mysql-server1      |
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
UPDATE global_variables 
SET variable_value='admin:admin;cluster_user:cluster_pass' 
WHERE variable_name='admin-admin_credentials';

UPDATE global_variables 
SET variable_value='cluster_user' 
WHERE variable_name='admin-cluster_username';

UPDATE global_variables 
SET variable_value='cluster_pass' 
WHERE variable_name='admin-cluster_password';
```

그리고 클러스터의 상태를 체크하기 위한 용도의 ADMIN VARIABLES 도 추가합니다. 명령어에 대한 설명은 주석을 참고하시면 됩니다.

```sql
/*클러스터의 상태를 확인하는 간격을 설정합니다. 
이 경우 1000ms로 설정되어 있으며, 클러스터의 상태를 1초마다 점검하게 됩니다.*/
UPDATE global_variables 
SET variable_value=1000 
WHERE variable_name='admin-cluster_check_interval_ms';

/*클러스터 상태 체크의 빈도를 설정합니다. 
10으로 설정되었으므로 ProxySQL은 클러스터 상태를 10번 확인한 후 결과를 기록합니다.*/
UPDATE global_variables 
SET variable_value=10 
WHERE variable_name='admin-cluster_check_status_frequency';

/*MySQL 쿼리 규칙을 디스크에 저장할지 여부를 설정합니다. 
true로 설정되었으므로, 쿼리 규칙이 클러스터에 동기화될 때 디스크에 저장됩니다.*/
UPDATE global_variables 
SET variable_value='true' 
WHERE variable_name='admin-cluster_mysql_query_rules_save_to_disk';

/*MySQL 서버 정보가 클러스터에 동기화될 때 디스크에 저장할지 여부를 설정합니다. 
true로 설정되었으므로 MySQL 서버 정보가 디스크에 저장됩니다.*/
UPDATE global_variables 
SET variable_value='true' 
WHERE variable_name='admin-cluster_mysql_servers_save_to_disk';

/*MySQL 사용자 정보가 클러스터에 동기화될 때 디스크에 저장할지 여부를 설정합니다. 
true로 설정되었으므로 MySQL 사용자 정보가 디스크에 저장됩니다.*/
UPDATE global_variables 
SET variable_value='true' 
WHERE variable_name='admin-cluster_mysql_users_save_to_disk';

/*ProxySQL 서버 정보가 클러스터에 동기화될 때 디스크에 저장할지 여부를 설정합니다. 
true로 설정되었으므로 ProxySQL 서버 정보가 디스크에 저장됩니다.*/
UPDATE global_variables 
SET variable_value='true' 
WHERE variable_name='admin-cluster_proxysql_servers_save_to_disk';

/*쿼리 규칙이 동기화되기 전에 몇 번의 차이점(diff)을 허용할지를 설정합니다. 
3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables 
SET variable_value=3 
WHERE variable_name='admin-cluster_mysql_query_rules_diffs_before_sync';

/*MySQL 서버 정보 동기화 전에 허용할 차이점의 수를 설정합니다. 
3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables 
SET variable_value=3 
WHERE variable_name='admin-cluster_mysql_servers_diffs_before_sync';

/*MySQL 사용자 정보 동기화 전에 허용할 차이점의 수를 설정합니다. 
3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables 
SET variable_value=3 
WHERE variable_name='admin-cluster_mysql_users_diffs_before_sync';

/*ProxySQL 서버 정보 동기화 전에 허용할 차이점의 수를 설정합니다. 
3으로 설정되어, 세 번의 차이점이 발생하면 동기화가 진행됩니다.*/
UPDATE global_variables 
SET variable_value=3 
WHERE variable_name='admin-cluster_proxysql_servers_diffs_before_sync';
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


mysql-server1 의 ProxySQL 에러로그를 확인해보면 아래와 같은 메시지를 확인할 수 있습니다.

```
2024-10-04 12:56:29 ProxySQL_Cluster.cpp:244:ProxySQL_Cluster_Monitor_thread(): [WARNING] Cluster: unable to connect to peer 192.168.0.12:6032 . Error: ProxySQL Error: Access denied for user 'cluster_user'@'192.168.0.11' (using password: YES)
```

mysql-server2(192.168.0.12:6032)와 연결이 안된다는 메시지 입니다. 이는 클러스터 관리 계정이 미생성 되어있어서 그렇습니다. mysql-server2 의 관리콘솔로 접속하여 클러스터 전용 계정을 생성합니다.

```bash
#mysql-server2 로 접속
[root@mysql-server2 proxysql]# mysql -u admin -padmin -h 127.0.0.1 -P6032 --prompt='Admin> ' 
```

```sql
/*클러스터 계정 등록*/
UPDATE global_variables 
SET variable_value='admin:admin;cluster_user:cluster_pass'
WHERE variable_name='admin-admin_credentials';

UPDATE global_variables 
SET variable_value='cluster_user' 
WHERE variable_name='admin-cluster_username';

UPDATE global_variables 
SET variable_value='cluster_pass' 
WHERE variable_name='admin-cluster_password';
```

그리고 mysql-server2 의 ProxySQL에는 클러스터와 관련된 설정이 없는 상태이기 때문에 기본적인 어드민 변수들을 반영해주어야 합니다. mysql-server1에서 수행했던 어드민 변수 설정과 PROXYSQL SERVER 정보 등록을 동일하게 수행합니다. 그리고 별도로 모니터링 계정 생성과 관련 변수도 설정해 줍니다.


```sql
/*mysql-server1 에서 수행한 어드민 변수 설정을 동일하게 수행 후 런타임으로 로드*/
LOAD ADMIN VARIABLES TO RUNTIME;
SAVE ADMIN VARIABLES TO DISK;


/*모니터 계정 등록*/
UPDATE global_variables 
SET variable_value='monitor' 
WHERE variable_name='mysql-monitor_username';

UPDATE global_variables 
SET variable_value='monitor' 
WHERE variable_name='mysql-monitor_password';

UPDATE global_variables SET variable_value='2000' 
WHERE variable_name IN ('mysql-monitor_connect_interval'
                        ,'mysql-monitor_ping_interval'
                        ,'mysql-monitor_read_only_interval');

LOAD MYSQL VARIABLES TO RUNTIME;
SAVE MYSQL VARIABLES TO DISK;



/*PROXYSQL SERVERS 정보를 반영합니다.*/
INSERT INTO proxysql_servers VALUES('192.168.0.11',6032,0,'proxysql_node1');
INSERT INTO proxysql_servers VALUES('192.168.0.12',6032,0,'proxysql_node2');

LOAD PROXYSQL SERVERS TO RUNTIME;
SAVE PROXYSQL SERVERS TO DISK;

```

위의 설정을 반영하면 mysql-server2 의 ProxySQL 의 에러로그에 아래와 같은 메시지가 반복적으로 발생하게 됩니다. 저는 테스트 과정에서 2개의 모듈(MYSQL QUERY RULES, MYSQL SERVERS)에서 발생하였습니다.

```
2024-10-04 13:05:54 ProxySQL_Cluster.cpp:863:set_checksums(): [WARNING] Cluster: detected a peer 192.168.0.11:6032 with mysql_query_rules version 1, epoch 1727968666, diff_check 150. Own version: 1, epoch: 1728013985. diff_check is increasing, but version 1 doesn't allow sync. This message will be repeated every 30 checks until LOAD MYSQL QUERY RULES TO RUNTIME is executed on candidate master.

2024-10-04 13:05:54 ProxySQL_Cluster.cpp:915:set_checksums(): [WARNING] Cluster: detected a peer 192.168.0.11:6032 with mysql_servers version 1, epoch 1727968666, diff_check 150. Own version: 1, epoch: 1728013985. diff_check is increasing, but version 1 doesn't allow sync. This message will be repeated every 30 checks until LOAD MYSQL SERVERS TO RUNTIME is executed on candidate master.

```

이는 앞서 설명드린 ProxySQL의 [클러스터 동기화 과정(클릭)](https://duhokim0901.github.io/mysql/proxysql_cluster_1/#%EF%B8%8Fproxysql-%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0-%EC%A3%BC%EC%9A%94%EA%B0%9C%EB%85%90)에 의해 발생합니다. mysql-server1(192.168.0.11) 에서 전달받은 모듈의 체크섬의 결과값과 자신의 체크섬 값이 상이할 경우 모듈별 현재 체크섬의 버전과 에포크를 비교하면서 동기화를 수행합니다. 이 때 mysql-server2의 버전이 1일 경우 1버전보다 크면서 에포크 값이 가장 높은 인스턴스를 찾아 동기화를 해야합니다. 하지만 에러 메시지를 통해 미루어보아 mysql-server1 의 모듈 체크섬 버전이 1이기 때문에 동기화를 하지 못하는 것입니다.   

모듈별 체크섬 버전과 에포크 값을 확인하는 방법은 아래와 같습니다.

- 관리콘솔 접속
  
```bash
mysql -u admin -padmin -h 127.0.0.1 -P6032 --prompt='Admin> ' 
```

- runtime_checksums_values 테이블 조회
  
```sql
SELECT * FROM runtime_checksums_values;
```

- 확인결과
  
```
mysql-server1> SELECT * FROM runtime_checksums_values;
+-------------------+---------+------------+--------------------+
| name              | version | epoch      | checksum           |
+-------------------+---------+------------+--------------------+
| admin_variables   | 1       | 1727968666 | 0xB62B8D3CB14389C2 |
| mysql_query_rules | 1       | 1727968666 | 0x9DEAF45E6E662B5F | <-- 코어 멤버의 mysql server rules 모듈의 체크섬 정보 version 1
| mysql_servers     | 1       | 1727968666 | 0x397CE208AB710D50 | <-- 코어 멤버의 mysql servers 모듈의 체크섬 정보 version 1
| mysql_users       | 2       | 1727969204 | 0x4C50FB16DB34D2E5 |
| mysql_variables   | 2       | 1728014575 | 0x4E71AB1ADF17EF70 |
| proxysql_servers  | 1       | 1727968666 | 0xEB7F779029A89859 |
| mysql_servers_v2  | 1       | 1727968666 | 0x74B77E00F44904CE |
+-------------------+---------+------------+--------------------+
7 rows in set (0.01 sec)


mysql-server2> SELECT * FROM runtime_checksums_values;
+-------------------+---------+------------+--------------------+
| name              | version | epoch      | checksum           |
+-------------------+---------+------------+--------------------+
| admin_variables   | 2       | 1728014600 | 0xB62B8D3CB14389C2 |
| mysql_query_rules | 1       | 1728013985 | 0x0000000000000000 | <-- 신규 구성 멤버의 mysql server rules 모듈의 체크섬 정보 version 1
| mysql_servers     | 1       | 1728013985 | 0x0000000000000000 | <-- 신규 구성 멤버의 mysql servers 모듈의 체크섬 정보 version 1
| mysql_users       | 2       | 1727969204 | 0x4C50FB16DB34D2E5 |
| mysql_variables   | 2       | 1728014575 | 0x4E71AB1ADF17EF70 |
| proxysql_servers  | 2       | 1728014605 | 0xEB7F779029A89859 |
| mysql_servers_v2  | 1       | 1728013985 | 0x0000000000000000 |
+-------------------+---------+------------+--------------------+
7 rows in set (0.00 sec)
```

확인해본 결과와 같이 version 값이 "1보다 커야" 동기화가 가능하지만 현재 버전이 1로 동일한 상황입니다. 이를 해결하기 위한 방법으로 핵심 멤버의 모듈을 runtime 단계롤 다시 재로딩하는 것입니다. 아래의 명령어를 mysql-server1(192.168.0.11) 에서 수행하고 체크섬 값과 로그를 다시 확인해봅니다.

- runtime 단계에서 모듈 재로딩
  
```
LOAD MYSQL SERVERS TO RUNTIME;
LOAD MYSQL QUERY RULES TO RUNTIME;
```

- 모듈별 체크섬 결과
   
```
mysql-server1> SELECT * FROM runtime_checksums_values;
+-------------------+---------+------------+--------------------+
| name              | version | epoch      | checksum           |
+-------------------+---------+------------+--------------------+
| admin_variables   | 1       | 1727968666 | 0xB62B8D3CB14389C2 |
| mysql_query_rules | 2       | 1728016171 | 0x9DEAF45E6E662B5F | <-- 버전2로 변경
| mysql_servers     | 2       | 1728016170 | 0x397CE208AB710D50 | <-- 버전2로 변경
| mysql_users       | 2       | 1727969204 | 0x4C50FB16DB34D2E5 |
| mysql_variables   | 2       | 1728014575 | 0x4E71AB1ADF17EF70 |
| proxysql_servers  | 1       | 1727968666 | 0xEB7F779029A89859 |
| mysql_servers_v2  | 2       | 1728016170 | 0x74B77E00F44904CE |
+-------------------+---------+------------+--------------------+
7 rows in set (0.01 sec)


mysql-server2> SELECT * FROM runtime_checksums_values;
+-------------------+---------+------------+--------------------+
| name              | version | epoch      | checksum           |
+-------------------+---------+------------+--------------------+
| admin_variables   | 2       | 1728014600 | 0xB62B8D3CB14389C2 |
| mysql_query_rules | 2       | 1728016171 | 0x9DEAF45E6E662B5F | <-- 버전2로 변경, mysql-server1의 체크섬 값과 동일
| mysql_servers     | 2       | 1728016170 | 0x397CE208AB710D50 | <-- 버전2로 변경, mysql-server1의 체크섬 값과 동일
| mysql_users       | 2       | 1727969204 | 0x4C50FB16DB34D2E5 |
| mysql_variables   | 2       | 1728014575 | 0x4E71AB1ADF17EF70 |
| proxysql_servers  | 2       | 1728014605 | 0xEB7F779029A89859 |
| mysql_servers_v2  | 2       | 1728016170 | 0x74B77E00F44904CE |
+-------------------+---------+------------+--------------------+
7 rows in set (0.00 sec)

```

- mysql-server2의 ProxySQL 에러로그 확인
  
```
2024-10-04 13:29:31 [INFO] Cluster: detected a peer 192.168.0.11:6032 with mysql_servers_v2 version 2, epoch 1728016170, diff_check 1565. Own version: 1, epoch: 1728013985. Proceeding with remote sync
2024-10-04 13:29:31 [INFO] Cluster: Fetch mysql_servers_v2:'YES', mysql_servers:'YES' from peer 192.168.0.11:6032
2024-10-04 13:29:31 [INFO] Cluster: detected peer 192.168.0.11:6032 with mysql_servers_v2 version 2, epoch 1728016170
2024-10-04 13:29:31 [INFO] Cluster: Fetching MySQL Servers v2 from peer 192.168.0.11:6032 started. Expected checksum 0x74B77E00F44904CE
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Servers v2' from peer 192.168.0.11:6032 completed
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Group Replication Hostgroups' from peer 192.168.0.11:6032
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Galera Hostgroups' from peer 192.168.0.11:6032
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Aurora Hostgroups' from peer 192.168.0.11:6032
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Hostgroup Attributes' from peer 192.168.0.11:6032
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Servers SSL Params' from peer 192.168.0.11:6032
2024-10-04 13:29:31 [INFO] Cluster: Fetching 'MySQL Servers' from peer 192.168.0.11:6032 completed
2024-10-04 13:29:31 [INFO] Cluster: Computed checksum for MySQL Servers v2 from peer 192.168.0.11:6032 : 0x74B77E00F44904CE
2024-10-04 13:29:31 [INFO] Cluster: Computed checksum for MySQL Servers from peer 192.168.0.11:6032 : 0x397CE208AB710D50
2024-10-04 13:29:31 [INFO] Cluster: Fetching checksum for 'MySQL Servers' from peer 192.168.0.11:6032 successful. Checksum: 0x74B77E00F44904CE
2024-10-04 13:29:31 [INFO] Cluster: Writing mysql_servers table
```

보이는 바와 같이 mysql-server1의 체크섬 버전이 2로 올라가면서 mysql-server2 또한 동기화된 것을 확인할 수 있습니다.

- 동기화 결과 확인 

```bash
mysql -u admin -padmin -h 127.0.0.1 -P6032 --prompt='Admin> ' 
```

```sql
SELECT * FROM mysql_servers;
SELECT * FROM mysql_servers;
SELECT * FROM mysql_servers;
```

위 쿼리 결과를 ProxySQL 간 비교해보면 동일한 것을 확인하실 수 있습니다.


<br/>

### 🚀keepalived 를 이용한 HA 구성
---
이번에는 keepalived 를 이용하여 vip를 만들고 Active - Backup 구조를 만들어보도록 하겠습니다. Active 서버는 mysql-server1(192.168.0.11)이고 Backup 서버는 mysql-server2(192.168.0.12) 입니다.

먼저 yum 을 이용해 패키지를 설치합니다. mysql-server1 과 mysql-server2 양쪽에 모두 수행합니다.

```shell
yum install keepalived
```


이후에 설정파일을 수정합니다. Active, Backup 용도에 맞게 mysql-server1 과 mysql-server2 의 설정파일을 각각 설정해야합니다.

먼저 Active 용도의 mysql-server1 의 keepalived.conf 입니다.
```shell
[root@mysql-server1 ~]# vi /etc/keepalived/keepalived.conf
```

```conf
global_defs {

}


vrrp_script chk_service {          # 서비스 상태 확인 스크립트 정의 
    script "/etc/keepalived/check_service.sh"  # 스크립트 경로 
    interval 2                     # 스크립트 실행 간격 (초 단위)
    weight -20                     # 실패 시 우선순위를 줄임 
    fall 2
}

vrrp_instance VI_1 {
    state MASTER                   # MASTER 또는 BACKUP 설정
    interface enp0s3                 # 가상 IP를 바인딩할 네트워크 인터페이스 (예: eth0)
    virtual_router_id 51           # VRRP 그룹을 구분하는 ID (0~255 범위)
    priority 100                   # 마스터의 우선순위 (BACKUP은 더 낮게 설정)
    #advert_int 1                   # VRRP 광고 전송 간격 (초 단위)

    authentication {               # 인증 설정 (옵션)
        auth_type PASS
        auth_pass 1234
    }

    virtual_ipaddress {            # 가상 IP 설정
        192.168.0.20/24
    }

    track_script {                 # 상태 확인 스크립트 (옵션)
        chk_service
    }
}
```

위 설정을 간략하게 설명하면 다음과 같습니다.

| 설정 항목            | 설명                                                                                     |
|----------------------|------------------------------------------------------------------------------------------|
| `vrrp_script`        | VRRP에서 사용할 서비스 상태 확인 스크립트 설정.                                           |
| `chk_service`        | - 스크립트 경로: `/etc/keepalived/check_service.sh`<br>- 스크립트 실행 간격: 2초<br>- weight 조정: -20 (서비스가 비정상일 경우 우선순위를 20 낮춤)<br>- fall: 2 (2회 연속 실패 시 스크립트 상태를 비정상으로 간주) |
| `vrrp_instance VI_1` | VRRP 인스턴스 설정 블록. VRRP ID, 인증, 우선순위, 가상 IP 주소 등을 정의.                    |
| `state MASTER`       | 현재 노드를 MASTER로 설정 (백업 노드보다 높은 우선순위를 가짐).                             |
| `interface enp0s3`   | 가상 IP를 바인딩할 네트워크 인터페이스 (예: `enp0s3`).                                       |
| `virtual_router_id 51` | VRRP 그룹을 구분하는 ID (마스터와 백업이 동일한 ID로 설정되어 같은 그룹으로 인식됨).       |
| `priority 100`       | 마스터 노드의 우선순위 (백업 노드보다 높은 값으로 설정).                                     |
| `authentication`     | - 인증 방식: `PASS`<br>- 인증 비밀번호: `1234`                                            |
| `virtual_ipaddress`  | 가상 IP 설정: `192.168.0.20/24` (마스터와 백업 노드 모두 동일한 IP를 사용).                  |
| `track_script`       | 서비스 상태 확인 스크립트 `chk_service`를 트래킹하여 서비스 상태에 따라 VRRP 우선순위 조정. |

<br/>

다음은 Backup 용도의 mysql-server2 의 keepalived.conf 입니다.
```shell
[root@mysql-server2 ~]# vi /etc/keepalived/keepalived.conf
```

```conf
global_defs {

}

vrrp_script chk_service {          # 서비스 상태 확인 스크립트
    script "/etc/keepalived/check_service.sh"
    interval 2
    weight -20
    fall 2
}


vrrp_instance VI_1 {
    state BACKUP                   # 이 노드는 백업으로 설정
    interface enp0s3                 # VIP를 바인딩할 인터페이스
    virtual_router_id 51           # 마스터와 동일한 VRRP ID
    priority 90                    # 백업 노드는 마스터보다 낮은 우선순위를 가짐
    #advert_int 1                   # VRRP 광고 메시지 간격

    authentication {               # 인증 설정 (마스터와 동일)
        auth_type PASS
        auth_pass 1234
    }

    virtual_ipaddress {            # 마스터와 동일한 가상 IP
        192.168.0.20/24
    }

    track_script {                 # 상태 확인 스크립트
        chk_service
    }
}

```

위 설정을 간략하게 설명하면 다음과 같습니다.

| 설정 항목            | 설명                                                                 |
|----------------------|----------------------------------------------------------------------|
| `vrrp_script`        | VRRP(Virtual Router Redundancy Protocol)에서 사용할 서비스 상태 확인 스크립트 설정. |
| `chk_service`        | - 상태 확인 스크립트 경로: `/etc/keepalived/check_service.sh`<br>- 스크립트 실행 간격: 2초<br>- weight 조정: -20 (서비스가 비정상이면 우선순위가 20 낮아짐)<br>- fall: 2 (2회 연속 실패 시 다운) |
| `vrrp_instance VI_1` | VRRP 인스턴스 설정 블록. VRRP ID, 인증, 우선순위, 가상 IP 주소 등을 정의. |
| `state BACKUP`       | 현재 노드를 백업으로 설정하여 마스터 장애 발생 시만 활성화.                              |
| `interface enp0s3`   | 가상 IP를 바인딩할 네트워크 인터페이스.                                                 |
| `virtual_router_id 51` | 마스터와 동일한 VRRP ID (마스터와 백업이 같은 그룹으로 인식됨).                   |
| `priority 90`        | 우선순위를 90으로 설정하여 마스터보다 낮음 (마스터보다 높은 숫자일수록 우선순위 높음).  |
| `authentication`     | - 인증 방식: `PASS`<br>- 인증 비밀번호: `1234`                                          |
| `virtual_ipaddress`  | 마스터와 동일한 가상 IP 설정 (192.168.0.20/24).                                        |
| `track_script`       | 상태 확인 스크립트 `chk_service`를 트래킹하여 서비스 상태에 따라 VRRP 상태 변경.      |

<br/>

keepalived 설정 파일을 구성하였으면 vrrp_script(vrrp 상태 체크) 를 생성합니다. 해당 작업은 mysql-server1, mysql-server2 모두 동일하게 적용하면 됩니다. ProxySQL 프로세스가 존재하지 않을 경우 vrrp 프로토콜에 의해 vip 를 backup 서버로 전달하기 위한 설정입니다.


```shell
#!/bin/bash

# keepalive가 포함된 프로세스의 수를 확인
count=$(ps -ef | grep "proxysql.cnf" | egrep -v "grep" | wc -l)

# 카운트가 0보다 크면 exit 0, 그렇지 않으면 exit 1
if [ "$count" -gt 0 ]; then
    exit 0
else
    exit 1
fi
```


위 설정을 완료하면 keepalived 데몬을 기동합니다.

```shell

systemctl start keepalived.service

```

keepalived 데몬 기동 후 로그는 아래의 명령어를 통해 확인할 수 있습니다.

```shell
tail -f /var/log/messages | grep "Keepalived"
```

아래는 기동 후 발생하는 로그입니다.

```
`[root@mysql-server1 ~`]# tail -f /var/log/messages | grep "Keepalived"
Oct  4 15:37:56 mysql-server1 Keepalived[640388]: Starting Keepalived v2.1.5 (07/13,2020)
Oct  4 15:37:56 mysql-server1 Keepalived[640388]: Running on Linux 4.18.0-477.10.1.el8_8.x86_64 #1 SMP Tue May 16 11:38:37 UTC 2023 (built for Linux 4.18.0)
Oct  4 15:37:56 mysql-server1 Keepalived[640388]: Command line: '/usr/sbin/keepalived' '-D'
Oct  4 15:37:56 mysql-server1 Keepalived[640388]: Opening file '/etc/keepalived/keepalived.conf'.
Oct  4 15:37:56 mysql-server1 Keepalived[640389]: NOTICE: setting config option max_auto_priority should result in better keepalived performance
Oct  4 15:37:56 mysql-server1 Keepalived[640389]: Starting VRRP child process, pid=640390
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: Registering Kernel netlink reflector
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: Registering Kernel netlink command channel
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: Opening file '/etc/keepalived/keepalived.conf'.
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: Assigned address 192.168.0.11 for interface enp0s3
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: Assigned address fe80::a00:27ff:fe71:50fe for interface enp0s3
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: Registering gratuitous ARP shared channel
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: (VI_1) removing VIPs.
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Entering BACKUP STATE (init)
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: VRRP sockpool: [ifindex(  2), family(IPv4), proto(112), fd(11,12)]
Oct  4 15:37:56 mysql-server1 Keepalived_vrrp[640390]: VRRP_Script(chk_service) succeeded
Oct  4 15:38:00 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Receive advertisement timeout
Oct  4 15:38:00 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Entering MASTER STATE
Oct  4 15:38:00 mysql-server1 Keepalived_vrrp[640390]: (VI_1) setting VIPs.
Oct  4 15:38:00 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Sending/queueing gratuitous ARPs on enp0s3 for 192.168.0.20
Oct  4 15:38:00 mysql-server1 Keepalived_vrrp[640390]: Sending gratuitous ARP on enp0s3 for 192.168.0.20
```

enp0s3 네트워크 카드에 vip 가 정상적으로 등록 되었는지 확인합니다.

```shell
ip addr show dev enp0s3
```

설정한 192.168.0.20 ip 가 등록된것을 확인할 수 있습니다.
```
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:71:50:fe brd ff:ff:ff:ff:ff:ff
    inet 192.168.0.11/24 brd 192.168.0.255 scope global noprefixroute enp0s3
       valid_lft forever preferred_lft forever
    inet 192.168.0.20/24 scope global secondary enp0s3
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fe71:50fe/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
```

<br/>

### 😸HA + ProxySQL 연결 테스트
---
모든 구성이 끝났으니 간단한 동작 테스트를 해보려고 합니다. duhokim.tab1 이란 테이블에 1초 주기마다 데이터를 INSERT 를 하도록 하겠습니다. 이 때 keepalived 로 설정한 vip 와 ProxySQL 포트(6033)를 이용하여 접근할 것입니다. 이 상황에서 mysql-server1(192.168.0.11) 서버의 ProxySQL 이 예기치 않은 종료가 이루어졌을 때에도 지속적으로 데이터 삽입이 가능한지 볼 예정입니다.

duhokim.tab1 테이블은 아래와 같습니다.

```sql
mysql> desc tab1;
+-------+--------------+------+-----+-------------------+-------------------+
| Field | Type         | Null | Key | Default           | Extra             |
+-------+--------------+------+-----+-------------------+-------------------+
| col1  | int          | NO   | PRI | NULL              | auto_increment    |
| col2  | varchar(100) | YES  |     | NULL              |                   |
| col3  | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------+--------------+------+-----+-------------------+-------------------+
```

INSERT 쿼리는 아래와 같습니다.
```sql
INSERT INTO tab1(col2, col3) values(@@hostname, now());
```


반복호출을 시도합니다.
```shell
 while [ true ] ;do mysql -h192.168.0.20 -usvcusr -psvcusr -P6033 duhokim < test.sql; sleep 1; done
```

아래와 같이 매초마다 데이터가 삽입되고 있습니다.
```
mysql> select * from duhokim.tab1;
+------+---------------+---------------------+
| col1 | col2          | col3                |
+------+---------------+---------------------+
|  433 | mysql-server1 | 2024-10-03 22:04:10 |
|  434 | mysql-server1 | 2024-10-03 22:04:11 |
|  435 | mysql-server1 | 2024-10-03 22:04:12 |
|  436 | mysql-server1 | 2024-10-03 22:04:13 |
|  437 | mysql-server1 | 2024-10-03 22:04:14 |
|  438 | mysql-server1 | 2024-10-03 22:04:15 |
|  439 | mysql-server1 | 2024-10-03 22:04:16 |
|  440 | mysql-server1 | 2024-10-03 22:04:17 |
|  441 | mysql-server1 | 2024-10-03 22:04:18 |
|  442 | mysql-server1 | 2024-10-03 22:04:19 |
|  443 | mysql-server1 | 2024-10-03 22:04:20 |
|  444 | mysql-server1 | 2024-10-03 22:04:21 |
|  445 | mysql-server1 | 2024-10-03 22:04:22 |
|  446 | mysql-server1 | 2024-10-03 22:04:24 |
|  447 | mysql-server1 | 2024-10-03 22:04:25 |
|  448 | mysql-server1 | 2024-10-03 22:04:26 |
|  449 | mysql-server1 | 2024-10-03 22:04:27 |
|  450 | mysql-server1 | 2024-10-03 22:04:28 |
|  451 | mysql-server1 | 2024-10-03 22:04:29 |
|  452 | mysql-server1 | 2024-10-03 22:04:30 |
|  453 | mysql-server1 | 2024-10-03 22:04:31 |
|  454 | mysql-server1 | 2024-10-03 22:04:32 |
|  455 | mysql-server1 | 2024-10-03 22:04:33 |
|  456 | mysql-server1 | 2024-10-03 22:04:34 |
|  457 | mysql-server1 | 2024-10-03 22:04:35 |
|  458 | mysql-server1 | 2024-10-03 22:04:36 |
|  459 | mysql-server1 | 2024-10-03 22:04:37 |
|  460 | mysql-server1 | 2024-10-03 22:04:38 |
|  461 | mysql-server1 | 2024-10-03 22:04:39 |
|  462 | mysql-server1 | 2024-10-03 22:04:40 |
|  463 | mysql-server1 | 2024-10-03 22:04:42 |
|  464 | mysql-server1 | 2024-10-03 22:04:43 |
|  465 | mysql-server1 | 2024-10-03 22:04:44 |
|  466 | mysql-server1 | 2024-10-03 22:04:45 |
|  467 | mysql-server1 | 2024-10-03 22:04:46 |
+------+---------------+---------------------+
35 rows in set (0.00 sec)
```

위의 상황에서 mysql-server1 의 proxysql 데몬을 kill -9 처리하여 강제 종료 시키겠습니다.

```shell
[root@mysql-server1 ~]# ps -ef | grep proxysql | grep proxysql.cnf | egrep -v grep
proxysql  445081       1  0 00:17 ?        00:00:00 /usr/bin/proxysql --idle-threads -c /etc/proxysql.cnf
proxysql  445082  445081  0 00:17 ?        00:06:56 /usr/bin/proxysql --idle-threads -c /etc/proxysql.cnf

[root@mysql-server1 ~]# kill -9 445081
```

위의 작업을 수행하면 실행중인 반복문에서 일시적으로 연결 실패가 나타납니다. 하지만 머지않아 다시 정상적으로 연결됩니다.
```
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.0.20:6033' (111)
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.0.20:6033' (111)
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.0.20:6033' (111)
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.0.20:6033' (111)
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.0.20:6033' (111)
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.0.20:6033' (111)
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
mysql: [Warning] Using a password on the command line interface can be insecure.
```

mysql-server1의 keepalived 로그를 살펴보겠습니다.

```shell
[root@mysql-server1 ~]# tail -f /var/log/messages | grep "Keepalived"
Oct  4 16:07:00 mysql-server1 Keepalived_vrrp[640390]: Script `chk_service` now returning 1
Oct  4 16:07:02 mysql-server1 Keepalived_vrrp[640390]: VRRP_Script(chk_service) failed (exited with status 1)
Oct  4 16:07:02 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Changing effective priority from 100 to 80
Oct  4 16:07:05 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Master received advert from 192.168.0.12 with higher priority 90, ours 
Oct  4 16:07:05 mysql-server1 Keepalived_vrrp[640390]: (VI_1) Entering BACKUP STATE
Oct  4 16:07:05 mysql-server1 Keepalived_vrrp[640390]: (VI_1) removing VIPs.
```

다음은 mysql-server2의 keepalived 로그입니다.

```shell
[root@mysql-server2 ~]# tail -f /var/log/messages | grep "Keepalived"
Oct  4 16:07:02 mysql-server2 Keepalived_vrrp[638259]: (VI_1) received lower priority (80) advert from 192.168.0.11 - discarding
Oct  4 16:07:03 mysql-server2 Keepalived_vrrp[638259]: (VI_1) received lower priority (80) advert from 192.168.0.11 - discarding
Oct  4 16:07:04 mysql-server2 Keepalived_vrrp[638259]: (VI_1) received lower priority (80) advert from 192.168.0.11 - discarding
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: (VI_1) Receive advertisement timeout
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: (VI_1) Entering MASTER STATE
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: (VI_1) setting VIPs.
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: (VI_1) Sending/queueing gratuitous ARPs on enp0s3 for 192.168.0.20
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: Sending gratuitous ARP on enp0s3 for 192.168.0.20
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: Sending gratuitous ARP on enp0s3 for 192.168.0.20
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: Sending gratuitous ARP on enp0s3 for 192.168.0.20
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: Sending gratuitous ARP on enp0s3 for 192.168.0.20
Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: Sending gratuitous ARP on enp0s3 for 192.168.0.20
```

보시는 바와 같이 VRRP_Script 가 동작하면서 priority 를 80 으로 낮추면서 priority 값이 그보다 높은 값(90)을 가진 Backup 서버로 VIP 가 전달 되었습니다.
실제로 데이터도 살펴보도록 하겠습니다.

```sql
mysql> select * from tab1 where col1 >= 585 and col1 <= 600;
+------+---------------+---------------------+
| col1 | col2          | col3 (UTC)          |
+------+---------------+---------------------+
|  585 | mysql-server1 | 2024-10-03 22:06:51 |
|  586 | mysql-server1 | 2024-10-03 22:06:52 |
|  587 | mysql-server1 | 2024-10-03 22:06:53 |
|  588 | mysql-server1 | 2024-10-03 22:06:54 |
|  589 | mysql-server1 | 2024-10-03 22:06:55 |
|  590 | mysql-server1 | 2024-10-03 22:06:56 |
|  591 | mysql-server1 | 2024-10-03 22:06:57 |
|  592 | mysql-server1 | 2024-10-03 22:06:58 |
|  593 | mysql-server1 | 2024-10-03 22:07:05 |<--- 장애발생시점 이후 정상화된 시간
|  594 | mysql-server1 | 2024-10-03 22:07:06 |
|  595 | mysql-server1 | 2024-10-03 22:07:07 |
|  596 | mysql-server1 | 2024-10-03 22:07:08 |
|  597 | mysql-server1 | 2024-10-03 22:07:09 |
|  598 | mysql-server1 | 2024-10-03 22:07:10 |
|  599 | mysql-server1 | 2024-10-03 22:07:11 |
|  600 | mysql-server1 | 2024-10-03 22:07:12 |
+------+---------------+---------------------+
16 rows in set (0.15 sec)
```

위의 로그내용과 데이터 상황을 종합해보면 다음과 같습니다.

- chk_service 스크립트를 통해 proxySQL이 다운된 것을 감지합니다.
  ```Oct  4 16:07:00 mysql-server1 Keepalived_vrrp[640390]: Script `chk_service` now returning 1```
- 그리고 mysql-server2 가 vip를 넘겨받은 시간은 16:07:05 입니다.
  ```Oct  4 16:07:05 mysql-server2 Keepalived_vrrp[638259]: (VI_1) Sending/queueing gratuitous ARPs on enp0s3 for 192.168.0.20```
- 16:07:05 부터 vip 연결이 정상화 되어 DB 내에 데이터를 적재할 수 있게 되었습니다.


대략 Failover 이후 정상화 단계까지 7초 정도 걸렸습니다. AWS RDS 의 유지보수 작업 시 발생하는 Failover 에 비하면 상당히 빠른 전환이라 볼 수 있지만 vrrp_script 의 체크인터벌을 줄이면 조금 더 민첩하게 대응할 수 있을 것으로 보입니다. 물론 운영환경에서는 조금 더 안전한 방식의 HA를 구성하는 것이 정신건강에 좋을 수 있습니다. 저라면 Cloud 를 쓸 수 있는 환경이라면 관리형 로드밸런서를 이용하고 IDC 환경일 경우 L4 Switch 장비를 선택할 것 같습니다. 가벼운 시스템의 경우 지금처럼 Keepalived 를 이용하여 구축을 할 수도 있습니다. 그리고 StandBy 서버에서도 ProxySQL을 통해 미리 연결 풀링을 맺은 상태이기 때문에 커넥션을 맺는 과정이 생략되어 전환이 좀 더 빨라진 효과도 얻었다고 볼 수 있습니다. HA 를 고려한 ProxySQL 클러스터 구성 및 테스트는 여기서 마무리 하도록 하겠습니다. 감사합니다.


<br/>


### 📚 참고자료
---
- [ProxySQL 클러스터](https://proxysql.com/documentation/proxysql-클러스터/)
- [Where Do I Put ProxySQL?](https://www.percona.com/blog/where-do-i-put-proxysql/)
- [ProxySQL Aurora 구성](https://community.aws/content/2fUJK8dG9EYXLr52nCWVRejCCf0/using-proxysql-to-replace-deprecated-mysql-8-0-query-cache)

<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}