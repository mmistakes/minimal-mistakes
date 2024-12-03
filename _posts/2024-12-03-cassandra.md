---
title: "[Cassandra] 내결함성을 고려한 Cassandra Cluster 구축"
excerpt: "클라우드 환경에서 내결함성(Fault tolerance)을 고려한 설치형 카산드라 클러스터 구축 디자인을 알아봅니다."
#layout: archive
categories:
 - Cassandra
tags:
  - [Cassandra]
#permalink: Cassandra-first
toc: true
toc_sticky: true
date: 2024-12-03
last_modified_at: 2024-12-03
comments: true
---

### 🚀 아파치 카산드라

카산드라는 Java 기반의 NoSQL 분산 데이터베이스입니다. 컬럼패밀리 기반의 데이터베이스로 기본적으로 고정된 스키마가 없다는 점에서 관계형 데이터베이스와 다르다 볼 수 있습니다. 또한 프라이머리 키 내에서도 파티션 키를 기준으로 노드에 분산되어 데이터를 저장하는 구조로 이루어져 있어 핫블록 경합을 최소화 할 수 있기 때문에 RDBMS에 비해 쓰기와 읽기 처리량을 높일 수 있는 장점이 있습니다. 데이터의 삽입, 변경, 삭제가 발생된다면 주로 알고 있는 RDBMS의 경우, 변경 레코드가 적재된 버퍼에 변경 내용을 반영하는 구조(Dirty Buffer) 이지만 카산드라의 경우는 LSM(Log Structure Merge) Tree 라고 하는 Data Structure 로 관리합니다.   

[LSM Tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree) 는 Key(primary key), value(column family) 를 디스크에 빠르게 저장 시킬수 있도록 구성된 데이터 스트럭쳐입니다. 그리고 LSM Tree 는 Key를 기준으로 정렬된 상태의 모양을 하고 있습니다.(SizeTiered 와 Leveled 관점에서 다른부분이 있으나 맥락은 유사합니다. 관련한 내용은 다른 포스팅에서 담겠습니다.) 그리고 이러한 구조체를 메모리 영역내에 보관하고 있는데 이를 memtable 이라 부릅니다.  

memtable은 memtable_flush_period_in_ms 설정 값에 의해 flush 가 일어납니다. flush 과정에서 memtable의 구조체인 정렬된 상태 그대로 디스크에 저장되기 때문에 Sorted String Table, 즉 sstable 이라고 부릅니다. sstable 을 만드는 과정은 RDBMS 의 체크포인트의 관점과 다릅니다. 더티버퍼를 내려쓰는 과정에서 더티버퍼들이 디스크 상에 랜덤하게 위치해 있기 때문에 Random IO 를 유발하지만 sstable은 append-only 한 방식이므로 Sequencial Write 하게 동작합니다. 따라서 쓰기의 성능이 매우 빠르다고 볼 수 있습니다.

<br>

### 🚀 CAP 이론 중 내분할성(Partioning)에 강한 카산드라
---

카산드라는 CAP의 이론 중에서도 가용성과 내분할성에 강한 특징을 보이고 있습니다. 여러 지역에 데이터센터를 둘 수 있고 연결 드라이버에서 DCAwareRoundRobinPolicy 의 설정을 통해 사용할 로컬 데이터 센터를 지정할 수도 있습니다. 데이터 센터간 특정 노드간의 가십프로토콜 통신이 정상적으로 이루어지지 않는다고 해서 특정 지역 내 데이터 센터의 서비스는 독립적으로 운영될 수 있습니다.

<img src="https://github.com/user-attachments/assets/5ca36313-cea9-41bd-926a-f8dde15d88e0" alt="CAP 이론에서의 카산드라" width="500">    
[그림1] CAP 이론에서의 카산드라

<br>


### 🚀 내결함성(Fault Tolerance)에 강한 카산드라
---

카산드라는 하드웨어 장애에 강한 특징을 보입니다. 데이터를 복제본으로 관리하고 있어 특정 노드가 소실 되더라도 읽기, 쓰기 일관성의 수준에 따라 다른 노드에서 데이터를 읽거나 쓸 때 다른 노드에 복사본을 이용할 수 있으므로 서비스가 유지될 수 있습니다. 즉 내결함성이 강하다고 볼 수 있습니다.  

하드웨어 장애가 발생된 노드가 정상적으로 기동이 되었을 때 hinted handoff, read repair, anti-entropy repair 와 같은 작업을 통해 데이터의 정합성을 다시 맞추는 것도 가능합니다.(노드 장애시 복구 시나리오 4가지가 존재하는데 별도 포스팅에서 다루도록 하겠습니다.)

그러나 이러한 내결함성을 유지하면서 카산드라 클러스터를 클라우드 환경에 구축하기 위해서는 리전과 가용성의 관점을 카산드라의 논리적인 개념과 매핑시켜 보아야 합니다. 만약 AWS 클라우드 환경에서 카산드라를 구축한다고 가정한다면 아래와 같습니다.

<img src="https://github.com/user-attachments/assets/eeae85e8-7946-4628-bb89-f315a52d3999" alt="내결함성을 고려한 카산드라 클러스터" width="500">    
[그림2] 내결함성을 고려한 카산드라 클러스터

<br>

카산드라의 데이터 위치를 정하기 위한 논리적인 개념으로 데이터센터(DC)와 랙(Rack)이라는 개념이 존재합니다. 데이터센터는 카산드라에서 데이터를 저장하기 위한 가장 넓은 단위입니다. 내결함성을 위해 데이터센터를 AWS 환경에서 하나의 지역(Region)과 동일한 관점으로 매핑시켜야합니다.

그리고 카산드라의 데이터 복제본의 개수를 설정하기 위해서 RF(Replication Factor)를 3으로 설정하였습니다. 복제본의 개수는 읽기와 쓰기 일관성 관점에서 정족수(Quorum)를 기반으로 동작시키기 위해 홀수개를 설정하였습니다.

랙(Rack)은 카산드라의 복제본을 분배하는 논리적인 그룹입니다. [그림2]와 같이 랙이 3개로 구성되어 있다면 데이터의 복제본은 3개의 랙에 균등분배 됩니다. 그리고 데이터가 특정 노드에 배치되는 기준은 Vnode 를 기준으로 파티션키의 일관된 해싱을 사용하여 분산처리 합니다. 여기서 불변하는 점은 데이터의 복사본은 Rack 을 기준으로 균등분배 된다는 점입니다.

내결함성은 결국 노드가 장애가 나더라도 다른 노드에서 필요로 하는 데이터 복사본이 존재하기 때문에 읽고 쓰는데 문제가 없음을 말하기 때문에 Rack을 가용영역과 동일한 관점으로 매핑시켜야합니다. [그림2] 에서는 Rack1 을 A존, Rack2 를 B존, Rack3을 C존에 매핑시켰습니다. 이러한 설정은 각 노드들의 ec2 머신이 할당받는 서브넷대역의 가용영역에 대한 설정과 cassandra-rackdc.properties 파일에 DC와 RACK 정보를 위의 그림처럼 정의하면 됩니다. 

혹은 cassandra.yaml 파일내 endpoint_snitch 에 대한 설정을 Ec2Snitch 로 설정하면 편리하게 위의 디자인으로 구축 가능합니다. 개인적으로는 GossipingPropertyFileSnitch 로 설정하여 노드 별 DC와 Rack 정보를 매뉴얼하게 설정하는 것을 선호하는 편입니다. Rack 에 배치시킨 노드의 개수는 서비스가 요구하는 처리량에 따라 적절히 구성하면 됩니다. 그림에서는 Rack 별로 3대씩 이루어져 있습니다. 위의 구성처럼 설정한다면 Rack3(C존)이 장애가 발생한다고 하더라도 Rack1 과 Rack2 에 필요로 하는 데이터가 존재하기 때문에 읽기와 쓰기를 문제없이 처리할 수 있습니다.

이러한 모습은 마치 오로라 클러스터의 디스크 볼륨 구성과 유사한 모습을 보입니다. 

![오로라의 내결함성](https://github.com/user-attachments/assets/6aa65fa8-d437-485d-9909-a132be829c40)     
[그림3] 오로라의 내결함성   

<br>

오로라 클러스터의 디스크 볼륨 그룹도 3개의 가용영역 당 2개의 쿼럼 구성원을 배치시켜 총 6개의 쿼럼을 이용하여 읽기 쓰기를 처리합니다. 이 중 AZ 3이 장애가 발생했을 때 다른 가용영역에 총 4개의 쿼럼 구성원이 존재하므로 쓰기와 읽기가 정상적으로 이루어집니다. 물론 여기서 추가로 AZ 1에 하드웨어 장애로 쿼럼 구성원 하나가 추가로 장애가 발생한다면 쓰기 작업은 불능상태이겠지만 읽기는 유지됩니다. 이처럼 오로라 클러스터 또한 내결함성이 강한 아키텍처를 갖고 있다고 볼 수 있습니다.

<br>

{% assign posts = site.categories.Cassandra %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}