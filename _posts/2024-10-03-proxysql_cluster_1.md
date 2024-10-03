---
title: "[MySQL/MariaDB] ProxySQL 클러스터 구성(1/3)"
excerpt: "ProxySQL 클러스터에 대한 기본 지식을 정리합니다."
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

### ❓ProxySQL 을 어떻게 구성하면 좋을까?
--- 
ProxySQL은 MySQL의 트래픽을 분산시키기 위한 목적에서 유용하게 사용되는 고성능 프록시입니다. ProxySQL을 사용하면 트래픽 분산외에도 다음과 같은 기능들을 사용할 수 있습니다.

- MySQL 방화벽
- 연결 풀링
- 샤드 조회 및 자동 라우팅
- 읽기/쓰기 분할 가능
- 활성 마스터 장애 발생 시 자동으로 다른 마스터로 전환

이렇게 좋은 기능을 가진 ProxySQL을 어떻게 구성을 해야할지 무척 고민이 될 것입니다. 
대표적으로는 2개의 안으로 나눠볼 수 있습니다. 먼저 아래와 같이 여러 애플리케이션 서버의 요청을 모두 처리하는 중앙집중형 구성입니다.

![ProxySQL 아키텍처1](https://github.com/user-attachments/assets/48322c3b-9d7e-49ce-919c-6ea5c157b97a)
[그림1] ProxySQL 아키텍처1

\[그림1\]의 아키텍처는 여러 애플리케이션 서버의 요청을 단일 혹은 소수의 ProxySQL이 처리하는 중앙집중형 구조입니다. 대표적으로 AWS RDS Proxy가 위와 같은 아키텍처입니다. ProxySQL을 관리하는 운영조직과 API를 관리하는 개발조직이 분리되어 있는 형태에서 관리적인 용이성을 위해 구성될 수 있는 아키텍처입니다. 이러한 구성은 별도의 노드에 추가적인 네트워크 홉이 발생하는 형태이기 때문에 쿼리의 응답시간이 지연될 가능성이 있지만 나쁜 구성이라는 뜻은 절대로 아닙니다. 추가적인 네트워크 홉이 발생하더라도 목표 응답시간은 준수하고 있다면 조직 체계로 인한 관리적인 용이성은 가져가면서 부하 분산 및 고가용성을 유지할 수 있는 구성안입니다.

다른 안은 어플리케이션과 동일한 노드 내에 proxySQL을 두는 방식입니다.

![ProxySQL 아키텍처2](https://github.com/user-attachments/assets/bb8b6c0c-a0a8-4997-8423-a3b6d6a27dbb)
[그림2] ProxySQL 아키텍처2

추가 네트워크 홉을 피하기 위해 애플리케이션 서버에 ProxySQL을 설치하는 형태입니다. 그런 다음 애플리케이션은 Unix Domain Socket을 사용하여 로컬호스트에서 ProxySQL에 연결하고 라우팅 규칙을 사용하여 자체 연결 풀링으로 실제 MySQL 서버에 도달하고 통신합니다. 이러한 방식은 수백 개의 노드까지 확장 가능하고 SPOF(단일고장점)를 회피할 수도 있습니다. 하지만 이러한 구성은 애플리케이션 수만큼 증가하는 ProxySQL을 관리하기 위해 많은 부분들의 자동화(배포관리, 모니터링, 장애대응)가 필요하기 때문에 난이도가 높은 구성입니다.

즉 어느 구성이든 옳고 그른 것은 없기 때문에 서비스를 운영하면서 정한 SLO(목표 가동시간, 목표 응답시간)에 맞춰 자유롭게 구성하는 것이 바람직하겠습니다.

<br/>

### 🚀이중화 관리를 용이하게, ProxySQL 클러스터 
---
서비스를 운영하면서 중요한 점이 있다면 바로 SPOF(단일고장점)입니다. 서비스를 운영하는 컴포넌트 중 하나가 망가졌다고 해서 서비스 연속성이 무너지면 안되는 것입니다. 이를 위해 규모 있는 회사들의 경우 매년마다 재해복구 훈련을 하고 고가용성을 위해 Standby 서버들을 마련합니다. 마찬가지로 ProxySQL이 불특정한 이유로 서비스가 되지 않는다면 이를 대비한 Standby 서버들이 필요하다는 것입니다. 또한 과도한 트래픽을 단일 ProxySQL이 감당할 수 있는지 여부도 고민해야합니다. 즉 위에서 언급한 1안(\[그림1\])도 proxySQL이 단일 노드처럼 구성된 것으로 그려지고 있지만 이를 대비한 이중화와 로드밸런싱 구성이 필요합니다.

![ProxySQL HA, 로드밸런싱 구성안](https://github.com/user-attachments/assets/9460076f-74e8-45f1-a6ad-177a54a5beda)   
[그림3] ProxySQL HA, 로드밸런싱 구성안

위의 그림은 ProxySQL의 HA(고가용성)를 위한 구성안입니다. App Server에서 ProxySQL 노드의 ip에 직접 연결하는 것이 아니라 vip를 통해 연결하는 방식입니다. 위의 구성안을 이용하면 L4 Switch에 등록된 ProxySQL에 트래픽을 분배할 수 있습니다. 위의 가장 큰 이점은 유지보수 작업으로 인해 ProxySQL 서버를 교체하거나 Auto Failover가 발생할 경우 App Server 단의 연결정보를 변경할 필요가 없다는 것입니다. 또한 Standby 용 L4 Switch가 있어 Active 장비가 장애가 발생했을 경우 VRRP 프로토콜을 이용하여 vip 를 Standby 로 이동시킴으로써 고가용성을 유지할 수 있습니다.

위와 같은 구성에서 여러대의 ProxySQL 노드를 관리하기 위해서는 각 노드별로 Ansible / Chef / Puppet / Salt와 같은 IaC 도구를 사용해서 일괄 배포를 하거나, Consul/ZooKeeper와 같은 서비스 검색 도구를 사용하여 관리할 수 있습니다. 하지만 이러한 접근 방식은 아래와 같은 불편함이 있습니다.

- 외부 소프트웨어(IaC 도구)에 의존해야 합니다.
- 반영 시간 예측할 수 없습니다.
- 네트워크 분리에 대한 보호가 없습니다.

이러한 이유로, ProxySQL 1.4.x 버전부터는 클러스터 구성을 지원하고 있습니다. ProxySQL 클러스터를 구성하면 코어노드에서 변경한 설정들을 클러스터링된 모든 ProxySQL 노드에 동적으로 반영시킬 수 있기 때문에 관리면에서 용이합니다. 


![ProxySQL 클러스터 + MySQL Aurora 클러스터 구성안](https://github.com/user-attachments/assets/b3af0f0b-8317-47a8-bf60-b2477ef223a2)   
[그림4] ProxySQL 클러스터 + MySQL Aurora 클러스터 구성안

AWS 환경인 경우 MySQL Aurora 클러스터를 사용하고 있다면 \[그림4\] 과 같은 구성안을 통해 ProxySQL을 운영할 수 있습니다. 구성안을 설명하면 다음과 같습니다.
- az 장애에 대비하여 ProxySQL 클러스터의 각 노드들은 다른 az에 구성합니다. 
- API의 요청의 분산이 필요하거나 유지보수 용이성 확보하기 위해 ProxySQL은 NLB로 운영합니다.
- NLB에 설정된 리스너를 통해 API의 요청을 수신하고 요청 트래픽을 대상 그룹 내 ProxySQL 들로 분배합니다.
- 각 ProxySQL에는 Aurora 클러스터의 각 엔드포인트 설정이 있습니다.
- ProxySQL의 설정변경은 availability zone c 영역에 있는 핵심 멤버에서만 수행하여도 모두 전파됩니다.
- NLB에 등록된 ProxySQL 인스턴스 중 하나에 장애가 발생하면 NLB에 미등록된 ProxySQL 인스턴스로 교체할 수 있습니다.


<br/>

### ✏️ProxySQL 클러스터 주요개념
---
ProxySQL 클러스터의 구성을 위해서는 기본적으로 ProxySQL 클러스터 구성 멤버인 핵심(Core) 멤버와 위성(Satellites) 멤버를 이해하고 있어야 합니다. 아래는 공식문서에 기술된 ProxySQL 클러스터 멤버의 종류와 각 멤버의 특징입니다.

**※클러스터 멤버**

ProxySQL 클러스터 멤버는 두 가지 역할 중 하나를 수행하는 여러 ProxySQL 노드로 구성됩니다.
- 핵심(Core) 멤버: 클러스터의 기본 노드로, 설정을 공유하고 전파합니다. 다수로 구성할 수 있습니다.
- 위성(Satellites) 멤버: 클러스터의 복제 노드로, 핵심 멤버로부터 설정을 가져옵니다.

ProxySQL 클러스터의 핵심 멤버가 되기 위한 전제조건은 아래와 같습니다. 
- 다른 핵심 멤버와 함께 proxysql_servers 테이블에 존재합니다.
- 클러스터의 다른 핵심 멤버의 proxysql_servers 테이블에 존재합니다.

Satellite 노드는 다음 조건을 만족해야합니다.
- 자신의 proxysql_servers 테이블에 존재하지 않습니다.
- 다른 핵심 멤버의 proxysql_servers 테이블에 존재하지 않습니다.     

<br/>

**※클러스터 동기화 방식**

ProxySQL 의 핵심 멤버의 변경사항이 클러스터 전체에 반영되는 방식은 2단계로 구분할 수 있습니다.  

- 1단계: 설정 전파를 위한 데이터(resultset) 생성 및 체크섬 업데이트
- 2단게: 체크섬 업데이트가 감지되었을 때 다른 노드에서 가져오기

1단계는 사용자가 설정을 업데이트하고 런타임으로 승격할 때 발생합니다.(LOAD *MODULE* TO RUNTIME;) 런타임 단계로 LOAD된 구성으로 resultset을 생성합니다. 이 resultset은 나중에 다른 클러스터 노드 요청에 응답할 때 Admin 모듈에서 사용됩니다. 유의할 점으로 resultset의 형태가 변경분만 해당하는 것이 아닌 전체 설정 결과이기 때문에 mysql_query_rules나 mysql_users모듈의 결과가 많은 상황이라면 네트워크 부하가 발생할 수 있음을 유의해야 합니다.

2단계는 1단계에서 만들어진 결과를 가져오는 단계입니다. 프록시들이 서로를 모니터링하기 때문에, 체크섬이 변경되었을 때 즉시 구성이 변경되었음을 알 수 있습니다. 전체 검사 및 동기화 절차는 다음 단계로 요약할 수 있습니다.

| 단계 | 설명 |
|------|------|
| 1    | `global_checksum`을 확인합니다. 이 `global_checksum`은 인스턴스의 어느 모듈에서도 변경이 발생하지 않았다는 것을 확인하는 데 필요한 네트워크 부하를 최소화합니다. |
| 2    | `global_checksum`이 변경된 경우, 이는 하나 이상의 모듈 구성이 수정되었음을 나타냅니다. `SELECT * FROM runtime_checksums_values ORDER BY name` 과 같은 쿼리가 다른 인스턴스로 전송되어 모든 모듈에 대한 최신 체크섬(에포크 및 버전 포함)을 가져옵니다. |
| 3    | 전달 받은 모듈 체크섬을 현재 설정과 비교합니다. 다른 인스턴스의 설정과 자신의 설정이 동시에 또는 짧은 시간 내에 변경될 가능성이 있기 때문에 이러한 확인이 이루어집니다. 이때 수행되는 작업은 자체 모듈 버전 번호에 따라 달라집니다.<br> - 자체 버전이 1이면, 버전이 1보다 크고 에포크가 가장 높은 인스턴스를 찾아 즉시 동기화합니다. 5단계로 이동합니다.<br> - 자체 버전이 1보다 크면 4단계를 따릅니다. |
| 4    | `admin-module_name_diffs_before_sync` 변수에 의해 주로 결정되는 유예 기간 단계가 있습니다. 각 체크는 `stats_proxysql_servers_checksums`의 `diff_check` 값을 증가시킵니다. 변수가 설정한 임계값을 초과하면 데이터 가져오기가 시작됩니다. |
| 5    | 데이터 가져오기는 헬스체크를 수행하는 동일한 연결에서 수행된 일련의 `SELECT` 문을 통해 이루어집니다. 이 문장은 `SELECT _list_of_columns_ FROM runtime_module` 형식입니다. |
| 6    | 전달 받은 데이터가 미리 가져온 체크섬과 일치하는지 확인하여, 변경할 모듈이 체크섬 변경 감지와 가져오기 작업 사이에 설정이 다시 변경되지 않았음을 보장합니다. |
| 7    | 모든 조건이 충족되면 로컬 구성 테이블은 `DELETE FROM module_name` 형식의 문을 통해 삭제됩니다. 가져온 데이터는 모듈 테이블에 삽입됩니다. 구성은 `LOAD module_name TO RUNTIME` 명령을 통해 런타임으로 승격됩니다. 이로 인해 모듈 버전 번호가 증가하고 새로운 체크섬이 생성됩니다. |
| 8    | 마지막으로 구성은 모듈 변수 `cluster_module_name_save_to_disk`의 값에 따라 조건부로 디스크에 저장됩니다. true로 설정된 경우 `SAVE module_name TO DISK` 명령을 통해 디스크에 저장됩니다. |

<br/>

### 😸향후 진행할 ProxySQL 클러스터 구성
---
HA를 고려한 ProxySQL 클러스터 구성을 간단히 테스트해 볼 예정입니다. 아래 그림은 테스트로 구성할 ProxySQL의 아키텍처입니다.

![keepalived + ProxySQL 클러스터 + MySQL 레플리카 구성안](https://github.com/user-attachments/assets/816a403c-b937-4453-8ba7-ac523f06642a)
[그림5] keepalived + ProxySQL 클러스터 + MySQL 레플리카 구성안

저는 핵심 멤버 2대를 클러스터로 구성하고 keepalived 를 이용하여 각각 active, backup 용도로 구분할 예정입니다. keepavlied 설정으로 인해 active 상태인 서버는 vip로 연결할 수 있습니다. vip를 할당받은 서버에 구성된 ProxySQL이 강제종료 되면 VRRP 프로토콜에 의해 backup 상태의 노드가 active로 전환됩니다. 구성한 ProxySQL 2대를 모두 핵심 멤버로 구성하는 이유는 핵심 멤버 1대가 문제가 생겼을 경우 다른 핵심 멤버를 통해 설정을 전파할 수 있기 때문입니다. 실습이 완료되는대로 별도의 포스팅을 할 예정입니다. 

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