---
layout: post
title:  "MongoDB 와 도커(Docker) in Ubuntu"
subtitle: "도커를 이용한 Mongo 클러스터 구성"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-07-18 00:00:00 +0900
categories: [ "mongo", "ubuntu", "docker", "bash"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 우분투 환경에서 Mongo DB 클러스터를 Docker 화 하는 과정을 소개해 드리겠습니다. 😺

<!--more-->

# 개요

MongoDB 를 도커(Docker)를 이용하여 Replica set 을 간단히 구성하는 방법을 살펴보도록 한다. 추후에 서비스 단위로 구성할 때에 볼륨(Volume)을 연결하여 서비스 이슈 없이 데이터를 잘 연결하도록 하며 HA(High Availability)를 이해하여 이슈(장애, 일부 인스턴스 다운 등)에도 서비스가 유지될 수 있도록 한다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 목표

이번 시간 목표는 아래와 같습니다.

- 도커를 이용한 몽고 DB 클러스터 구성

## Docker 설치

아래의 명령어를 통해서 Docker 를 설치한다.

```bash
apt install docker
```

## MongoDB 이미지 다운로드

docker pull 명령을 통해 mongo 이미지를 다운로드 한다.

```bash
docker pull mongo
```

## Replica Sets 구성하기

이제 Primary 인스턴스 1개, Secondary 인스턴스 2개를 설정하여 Mongo Replica Set 을 구성해 보도록 한다. 
아래의 절차대로 작업을 진행하여 구성 상에 문제가 없도록 한다.

- 도커 네트워크 생성
- 도커 볼륨 지정
- 도커 인스턴 생성 (anguis1, anguis2, anguis3)
- mongo Replica Set 설정
- Mongo Replica 테스트 

### 도커 네트워크 생성

도커 네트워크 생성 후 컨테이너 생성 시에 네트워크 이름 정보를 전달한다.

```bash
docker network create mongo-cluster
docker network ls
```

### 도커 볼륨 설정

컨테이너에서 데이터를 저장할 경우 데이터 유실 위험이 있다. 디렉터리 생성 후 디스크를 마운트하여 쓰게될 경우 컨테이너 삭제 등의 상황에도 안정적으로 사용할 수 있다.
필자의 경우 `/data/mongo/db-01` 에 디렉터리를 생성하여 사용한다.

```bash
mkdir -p /data/mongo/db-01
```

### 도커 컨테이너 생성

도커 컨테이너를 생성한다. 도커 컨테이너 설정 시 명령행은 도커 옵션과 mongod 옵션으로 구분할 수 있다.
아래의 간단한 명령어 옵션을 살펴보자.

- docker Options 
     - -d : detach 모드
     - -p : 포트 바인딩
     - -v : volume 설정
     - --name : 컨테이너 이름 설정
     - --net : 네트워크 설정
- mongod Options
     - replSet : replica Set 의 줄임말
     - --dbpath : mongod 가 참조할 DB 저장 경로

```bash
# docker [command] [-d: detach 모드] [-p: 포트 바인딩] [-v: 볼륨 연결] [--name: 컨테이너 이름] [--net: 도커 네트워크 이름] [이미지:버전] \
docker run -d -p 30001:27017 -v /data/mongo/db-01:/data/db --name anguis1 --net mongo-cluster mongo:4.1 \
# mongod [--replSet: Replica Set 이름] [--dbpath: 데이터베이스 경로]
mongod --replSet anguis-repl --dbpath /data/db
```

이제 준비가 완료되었으니 도커 컨테이너를 생성한다.

```bash
docker run -d -p 30001:27017 -v /data/mongo/db-01:/data/db --name anguis1 --net mongo-cluster mongo:4.1 mongod --replSet anguis-repl --dbpath /data/db
docker run -d -p 30002:27017 -v /data/mongo/db-02:/data/db --name anguis2 --net mongo-cluster mongo:4.1 mongod --replSet anguis-repl --dbpath /data/db
docker run -d -p 30003:27017 -v /data/mongo/db-03:/data/db --name anguis3 --net mongo-cluster mongo:4.1 mongod --replSet anguis-repl --dbpath /data/db
```

생성된 컨테이너 중 `anguis1` 에서 mongo 명령을 실행한다. 여기서 `-it` 옵션은 인터렉티브한 Psuedo-TTY 을 열어둔다. 이를 통해 Bash 와 같은 인터렉티브한 명령어 전달이 가능한 쉘(?)이 열리게된다.

- docker exec 옵션
  - -i : `Keep STDIN open even if not attached` STDIN 을 열어두어 사용자 입력이 가능하게 한다.
  - -t : `Allocate a pseudo-TTY` 가상 TTY 를 할당하여 콘솔 작업이 가능하도록 한다.

자 이제 Mongo 쉘을 열어 작업해 보자.

```bash
docker exec -it anguis1 mongo
```

### Primary-Secondary 설정 및 Replica Set 설정

우리는 이전 작업에서 Replica Set 이름을 `anguis-repl` 이라고 설정한 바 있다. 그리고 Replica Set 을 3개의 노드에 적용하려고 한다.
우선, Replica Set을 설정할 DB 를 만들어보자. 아래 단계와 같이 진행한다.

- `medusa` DB 를 생성한다.
- host 와 replica 이름을 설정한 config 변수를 생성하고 적용한다.
- Secondary 노드들에 Slave 를 걸어둔다.

```bash
# Primary Node 설정 작업
# 데이터베이스 생성
db = (new Mongo('localhost:27017')).getDB('medusa')
# 설정
config = {
     "_id" : "anguis-repl",
     "members" : 
     [
          {"_id" : 0,"host" : "anguis1:27017"},
          {"_id" : 1, "host" : "anguis2:27017"}, 
          {"_id" : 2, "host" : "anguis3:27017"}
     ]
}
# config 설정 등록
rs.initiate(config)
```

이제 Secondary 노드에 접속하여 설정을 한다.

```bash
docker exec -it anguis2
```

세컨더리에서 Mongo 인스턴스 쉘에 접속한 뒤에 아래의 명령을 입력한다. Secondary Node 모두에 아래의 명령을 입력하면 
Replica Set 이 구성 완료된다.

```bash
anguis-repl:SECONDARY> db = (new Mongo('localhost:27017')).getDB('medusa')
anguis-repl:SECONDARY> db.setSlaveOk()
```

### Replica Set 테스트

Replica Set 을 구성하는 이유는 무엇일까? 바로 HA(High Availability)이다. 인스턴스가 어떠한 이유로 장애가 발생하더라도 Secondary 가 곧이어 Primary 역할을 이어받는다. 이를 통해 우리는 장애에 유연한 구성을 가질 수 있다. 그러나 Secondary 는 Primary 의 oplogs (Operation Logs)를 전달 받아 변경 내용을 그대로 적용하는 역할을 한다. 따라서 Write Operation 이 여기에 동작해서는 안된다. 따라서, 우리는 다음의 테스트를 통해 Replica Set 이 잘 구성되어 있는지를 확인할 필요가 있다.

그리고 다음 장에서는 Express.js 와 MongoDB Replica Set이 잘 연동 되도록 설정하는 방법을 알아보고 중단 등의 이벤트를 먹여 동작이 잘되는지 확인해 본다. 

**Replica Set 체크리스트**

- Primary Node 에서 신규 Record 추가
- Secoondary Node 에서 신규 Record 추가 시 에러 확인
- Primary Node 에서 생성한 Record 가 확인되는지 체크하기
- Primary Node 중단시 Secondary Node 가 이를 대체하는지 확인

우선, Primary Node 에서 아래의 명령을 입력하여 데이터가 입력되는지 확인한다.

```bash
# Primary Node
db = (new Mongo('localhost:27017').getDB('medusa'))
db.test.insert({name: 'anguis1'});
db.test.find();
```

이제, 아래의 anguis2 노드에 접속하여 보자. 그리고 아래의 명령어를 입력하면 Primary 노드에서 생성한 데이터를 확인할 수 있다.

> 주의사항: `db.setSlaveOk()` 명령어는 mongo 쉘로 하여금 우리가 지금 의도적으로 Secondary 에서 쿼리(Query)를 하고 있음을 알려주는 역할이다. 따라서 find 명령을 실행하기 전에 반드시 입력하도록 하자.

```bash
# Seconary Node 
db = (new Mongo('localhost:27017').getDB('medusa'))
db.setSlaveOk()
db.test.find()
```

다음으로, Write Operation 방지가 가능한지 확인해 보자. 이번엔 anguis3에서 작업해 보자.

```bash
# Secondary Node
db = (new Mongo('localhost:27017').getDB('medusa'))
db.setSlaveOk()
db.test.insert({name: 'medusa3'})
```

입력할 경우 WriteCommandError 가 출력되면서 errmsg 에 "not master" 라고 알려준다. 즉, Master 에서만 Write 를 할 수 있다는 의미이다.

```bash
WriteCommandError({
        "operationTime" : Timestamp(1563769852, 1),
        "ok" : 0,
        "errmsg" : "not master",
        "code" : 10107,
        "codeName" : "NotMaster",
        "$clusterTime" : {
                "clusterTime" : Timestamp(1563769852, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
})
```

마지막으로, Primary 노드가 중단되더라도 데이터가 보존되는지 확인해 보자.
docker 명령을 이용하여 간편하게 컨테이너를 중단(stop)할 수 있다. 그리고 anguis2 컨테이너의 mongo 인스턴스 쉘에 접속해본다.

```bash
# 호스트 쉘
docker stop anguis1
docker exec -it anguis2 mongo
# 생략
anguis-repl:PRIMARY>
```

예상대로 anguis2 가 프라이머리로 설정되어 있다. 데이터가 잘 이관되어 있는지 확인해 보자.

```bash
db = (new Mongo('localhost:27017').getDB('medusa'))
db.test.find()
```

이전에 생성된 데이터가 잘 보관되어 있는 것을 확인하였다. 

```bash
{ "_id" : ObjectId("5d2ff7bd02fca5309d815b27"), "name" : "sample" }
{ "_id" : ObjectId("5d3003866168a17f78e7e766"), "name" : "sample-2" }
{ "_id" : ObjectId("5d3003f96168a17f78e7e767"), "name" : "sample-3" }
{ "_id" : ObjectId("5d353a288baac31f205ba9f4"), "name" : "medusa1" }
```

이제, 원인모를(?) 이유로 중단된 컨테이너를 재 기동하여 본다. 비록 Primary 가 아닌 Secondary 이지만 다시 Replica Set 에 복귀하였음을 알 수 있다.
앞으로 다루게될 Express 와 같은 백엔드 들은 MongoDB 의 Connection String 을 통해 Replica Set 에 별다른 어려움 없이 접속할 수 있을 것이다. **이 내용은 Part-2 에서 다루도록 한다.**

```bash
docker start anguis1
```

# 마무리

지금 까지 Docker 를 이용하여 Mongo Replica Set 을 구성하고 Replica Set 의 Primary 와 Secondary 가 어떻게 동작하는지를 살펴보았습니다. 다음 이 시간에는 Express.js 에서 MongoDB 를 사용할 때 Replica Set 을 어떻게 다루는지 그리고 Primary Node에 장애가 발생하였을 때 어떠한 현상을 보이는지 확인해 보도록 하겠습니다.

또한, Part3 에서는 MongoDB 보안 설정과 동시에 Express.js 를 MSA Gateway Pattern 을 Docker 를 이용해서 구성하는 방법을 소개해 드리도록 하겠습니다. 

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다 😺

# 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [Docker Mongo Replica Set](https://www.sohamkamani.com/blog/2016/06/30/docker-mongo-replica-set/)
- [Developer's Guide : MongoDB Replica Sets](https://severalnines.com/blog/developer-s-guide-mongodb-replica-sets)
