---
title: "[MySQL/MariaDB] ProxySQL 클러스터 구성"
excerpt: "ProxySQL 클러스터 구성 방법을 정리합니다."
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
대표적으로는 2개의 안으로 나눠볼 수 있습니다. 먼저 아래와 같이 ProxySQL을 사용할 경우 어플리케이션과 데이터베이스 사이에 별도의 노드를 두어 구성하는 경우가 있습니다.

![ProxySQL 아키텍처1](https://github.com/user-attachments/assets/48322c3b-9d7e-49ce-919c-6ea5c157b97a)
[그림1] ProxySQL 아키텍처1

\[그림1\]의 아키텍처는 ProxySQL을 관리하는 운영조직과 API를 관리하는 개발조직이 분리되어 있는 형태에서 관리적인 용이성을 위해 구성될 수 있습니다. 대표적으로 AWS RDS Proxy가 위와 같은 아키텍처입니다. 이러한 구성은 별도의 노드에 추가적인 네트워크 홉이 발생하는 형태이기 때문에 쿼리의 응답시간이 지연될 가능성이 있지만 나쁜 구성이라는 뜻은 절대로 아닙니다. 추가적인 네트워크 홉이 발생하더라도 목표 응답시간은  준수하고 있다면 조직 체계로 인한 관리적인 측면의 용이성은 가져가면서 부하 분산 및 고가용성을 유지할 수 있는 구성안입니다.

또다른 안은 어플리케이션과 동일안 노드 내에 proxySQL을 두는 방식입니다.

![ProxySQL 아키텍처2](https://github.com/user-attachments/assets/bb8b6c0c-a0a8-4997-8423-a3b6d6a27dbb)
[그림2] ProxySQL 아키텍처2

추가 네트워크 홉을 피하기 위해 애플리케이션 서버에 ProxySQL을 설치하는 형태입니다. 그런 다음 애플리케이션은 Unix Domain Socket을 사용하여 로컬호스트에서 ProxySQL에 연결하고 라우팅 규칙을 사용하여 자체 연결 풀링으로 실제 MySQL 서버에 도달하고 통신합니다. 이러한 방식은 수백 개의 노드까지 확장 가능하고 SPOF(단일고장점)를 회피할 수도 있습니다. 하지만 이러한 구성은 ProxySQL의 설정을 한번씩 바꿀 때마다 매번 관리자가 ProxySQL 노드 개수만큼 변경을 해주어야 한다는 문제가 있습니다. 노드가 추가될 때마다 관리포인트는 늘어나고 관리자 <-> ProxySQL 노드간의 추가적인 네트워크 허용이 생겨 보안위협을 야기할 수도 있습니다.

즉 어느 구성이든 옳고 그른 것은 없기 때문에 서비스를 운영하면서 정한 목표가동시간, 목표 응답시간 등의 SLO 에 맞춰 자유롭게 구성하는 것이 바람직하겠습니다.

<br/>

### 🚀이중화 관리를 용이하게, ProxySQL 클러스터 
---
서비스를 운영하면서 중요한점 중의 하나가 있다면 바로 SPOF(단일고장점) 회피입니다. 서비스를 운영하는 컴포넌트 중 하나가 망가졌다고 해서 서비스 연속성이 무너지면 안되는 것입니다. 이를 위해 매년마다 재해복구 훈련 등을 하는 것이고 standby 서버들이 존재하는 것이죠. 마찬가지로 ProxySQL이 불특정한 이유로 서비스가 되지 않는다면 이를 대비한 standby 성 서버들이 필요하다는 것입니다. 또한 과도한 트래픽을 단일 ProxySQL이 감당할 수 있는지 여부도 고민해야합니다. 즉 위에서 언급한 1안(\[그림1\])의 경우에도 proxySQL이 단일 노드처럼 구성된 것으로 그려지고 있지만 이를 대비한 이중화와 로드밸런싱 구성이 필요합니다.

![ProxySQL HA, 로드밸런싱 구성안](https://github.com/user-attachments/assets/9460076f-74e8-45f1-a6ad-177a54a5beda)   
[그림3] ProxySQL HA, 로드밸런싱 구성안

위의 그림은 ProxySQL의 HA(고가용성)를 위한 구성안입니다. App Server에서 ProxySQL 노드의 ip에 직접 연결하는 것이 아니라 vip를 통해 연결하는 방식입니다. 위의 구성안을 이용하면 L4 Switch에 등록된 ProxySQL에 트래픽을 분배할 수 있습니다. 또한 유지보수 작업으로 인해 ProxySQL 서버를 교체하거나 할 경우 App Server 단의 연결정보를 변경할 필요가 없습니다. 또한 standby 용 L4 Switch가 있어 Active 장비가 장애가 발생했을 경우 VRRP 프로토콜을 이용하여 vip 를 standby 로 이동시킴으로써 고가용성을 유지할 수 있습니다.

이 경우 ProxySQL 인스턴스 그룹을 관리하기 위해서는 각 호스트를 개별적으로 구성 후 Ansible / Chef / Puppet / Salt와 같은 구성 관리 도구를 사용해서 일괄배포를 하거나, Consul/ZooKeeper와 같은 서비스 검색 도구를 사용하여 관리할 수 있습니다. 하지만 이러한 접근 방식에는 몇 가지 단점이 있습니다.

- 외부 소프트웨어(구성 관리 소프트웨어 자체)에 의존해야 합니다.
- 반영 시간 예측할 수 없습니다.
- 네트워크 분리에 대한 보호가 없습니다.

이러한 이유로, ProxySQL 1.4.x 버전부터는 클러스터 구성을 지원하고 있습니다. ProxySQL 클러스터를 구성하면 코어노드에서 변경한 설정들을 클러스터링된 모든 ProxySQL 노드에 동적으로 반영시킬 수 있기 때문에 관리면에서 용이합니다. 


![ProxySQL 클러스터 + Aurora 구성안](https://github.com/user-attachments/assets/b3af0f0b-8317-47a8-bf60-b2477ef223a2)   
[그림4] ProxySQL클러스터 + Aurora 구성안

AWS 환경인 경우 \[그림4\] 과 같은 구성안을 통해 ProxySQL을 운영할 수 있습니다. 구성안을 설명하면 다음과 같습니다.
- 특정 az의 장애발생에 대비하여 고가용성을 유지할 수 있도록 ProxySQL 클러스터의 각 노드들은 다른 az에 구성합니다. 
- API의 요청의 분산이 필요하거나 유지보수측면의 용이성 확보하기 위해 ProxySQL은 NLB(Network Load Balancer)로 묶어서 운영합니다.
- NLB에 설정된 리스너를 통해 API의 요청을 수신하고 요청 트래픽을 대상 그룹 내 ProxySQL 인스턴스들로 분배합니다.
- 각 ProxySQL에는 Aurora 클러스터의 각 엔드포인트로 분배하는 설정을 갖습니다.
- ProxySQL의 설정변경은 availability zone c 영역에 있는 핵심노드에서만 수행하여도 모두 전파됩니다.
- NLB에 등록된 ProxySQL 인스턴스 중 하나가 장애가 발생하면 대상그룹에서 제외하고 미등록된 ProxySQL 인스턴스로 교체할 수 있습니다.


<br/>

### ✏️ProxySQL 클러스터 주요개념

ProxySQL 클러스터의 구성을 위해서는 기본적으로 ProxySQL 클러스터 구성 멤버인 핵심(Core) 멤버와 위성(Satellites) 멤버를 이해하고 있어야 합니다. 아래는 공식문서에 기술된 ProxySQL 클러스터 멤버의 종류와 각 멤버가 되기 위한 전제조건이 기술되어 있습니다.

**클러스터 멤버**
ProxySQL 클러스터는 두 가지 역할 중 하나를 수행하는 여러 ProxySQL 노드로 구성됩니다.
- Core: 클러스터의 기본 노드로, 구성을 공유하고 전파합니다.
- Satellites: 클러스터의 복제 노드로, Core 노드로부터 구성을 가져옵니다.

ProxySQL 클러스터의 Core 노드가 되기 위한 전제조건은 아래와 같습니다. 
- 다른 Core 멤버와 함께 proxysql_servers 테이블에 존재합니다.
- 클러스터의 다른 Core 노드의 proxysql_servers 테이블에 존재합니다.

Satellite 노드는 다음 조건을 만족해야합니다.
- 자신의 proxysql_servers 테이블에 존재하지 않습니다.
- 다른 Core 노드의 proxysql_servers 테이블에 존재하지 않습니다.

핵심 노드와 위성 노드의 구성 개수를 유연하게 조정할 수 있습니다. 저는 핵심노드 2대를 별도 노드로 구성하고 클러스터링 하여 이중화하고 ProxySQL을 keepalived 를 이용하여 SPOF를 막기 위한 용도로 구성해보는 테스트를 해보도록 하겠습니다. 핵심노드는 2대 이상을 구성하는 이유는 핵심 노드 1대가 문제가 생겼을 경우 다른 핵심노드를 통해 위성노드에 설정을 전파할 수 있기 때문입니다.

<br/>

### 😸ProxySQL 클러스터 구성 테스트 
---

본문

<br/>


### 📚 참고자료

- [ProxySQL 클러스터](https://proxysql.com/documentation/proxysql-클러스터/)
- [Where Do I Put ProxySQL?](https://www.percona.com/blog/where-do-i-put-proxysql/)
- [ProxySQL Aurora 구성](https://community.aws/content/2fUJK8dG9EYXLr52nCWVRejCCf0/using-proxysql-to-replace-deprecated-mysql-8-0-query-cache)
- 
<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}