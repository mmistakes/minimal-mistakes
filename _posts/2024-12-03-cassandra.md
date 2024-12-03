---
title: "[Cassandra] 내결함성(Fault tolerance)을 고려한 Cassandra Cluster 설계"
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

카산드라는 Java 기반의 NoSQL 분산 데이터베이스입니다. 컬럼패밀리 기반의 데이터베이스로 기본적으로 고정된 스키마가 없다는 점에서 관계형 데이터베이스와 다르다 볼 수 있습니다. 또한 프라이머리 키 내에서도 파티션 키를 기준으로 노드에 분산되어 데이터를 저장하는 구조로 이루어져 있어 핫블록으로 인한 버퍼 경합이 최소화 되기 때문에 RDBMS에 비해 쓰기와 읽기 처리량을 높일 수 있는 장점이 있습니다. 데이터의 삽입, 변경, 삭제가 발생된다면 주로 알고 있는 RDBMS의 경우, 변경 레코드가 적재된 버퍼에 변경 내용을 반영하는 구조(Dirty Buffer) 이지만 카산드라의 경우는 LSM(Log Structure Merge) Tree 라고 하는 Data Structure 로 관리합니다.   

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

카산드라는 하드웨어 장애에 강한 특징을 보입니다. 데이터를 복제본으로 관리하고 있어 특정 노드가 소실이 되더라도 읽기, 쓰기 일관성의 수준에 따라 다른 노드에서 데이터를 읽거나 쓸 때 다른 노드에 복사본을 이용할 수 있으므로 서비스가 유지될 수 있습니다. 하드웨어 장애가 발생된 노드가 정상적으로 기동이 되었을 때 hinted handoff, read repair, anti-entropy repair 와 같은 작업을 통해 데이터의 정합성을 다시 맞추는 것도 가능합니다.(노드 장애시 복구 시나리오 4가지가 존재하는데 별도 포스팅에서 다루도록 하겠습니다.)

그러나 이러한 내결함성을 유지하면서 카산드라 클러스터를 클라우드 환경에 구축하기 위해서는 리전과 가용성의 관점을 카산드라의 논리적인 개념과 매핑시켜 보아야 합니다. 만약 AWS 클라우드 환경에서 카산드라를 구축한다고 가정한다면 아래와 같습니다.


![내결함성을 고려한 카산드라 클러스터](https://github.com/user-attachments/assets/eeae85e8-7946-4628-bb89-f315a52d3999)   
[그림2] 내결함성을 고려한 카산드라 클러스터




이러한 모습은 마치 오로라 클러스터의 디스크 볼륨 구성과 유사한 모습을 보입니다. 

![오로라의 내결함성](https://github.com/user-attachments/assets/6aa65fa8-d437-485d-9909-a132be829c40)
[그림3] 오로라의 내결함성


{% assign posts = site.categories.Cassandra %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}