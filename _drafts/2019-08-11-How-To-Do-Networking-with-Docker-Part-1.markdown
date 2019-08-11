---
layout: post
title:  "도커 네트워킹 파트 1"
subtitle: "독립 컨테이너와 통신하기"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-11 00:00:00 +0900
categories: [ "docker", "network"]
excerpt_separator: <!--more-->
---

<!-- excerpt_separator 작성 가이드
SEO 관점으로 유추하건데, 글의 내용을 요약하는 부분이 상당히 중요하다.
내용을 잘 요약하여 검색 결과에 잘 노출될 수 있도록 신경을 쓴다.
 -->

안녕하세요 **코마**입니다. 오늘은 도커를 이용한 네트워킹 방법을 알려드리겠습니다. 이번 시간에는 스탠드얼론(Standalone) 컨테이너의 통신에 대해서 설명을 드리고 `bridge` 네트워크 방식과 `user-defined bridge` 에 대해서 상세히 알려드리도록 하겠습니다.😺

<!--more-->

## Overview (개요)

이 글을 통해 여러분은 독립 실행형 컨테이너와 서비스의 차이점을 이해할 수 있습니다. 더 나아가 독립 실행형 컨테이너의 네트워킹을 어떻게 조정하고 이를 통해 도커 네트워킹을 이해할 수 있게 됩니다.

기본 브릿지 네트워크(default bridge network)는 프로덕션에 바로 사용하기에는 무리가 있습니다. 따라서 사용자 정의 브릿지 네트워크(user defined bridge network)를 설정하고 컨테이너간에 통신을 테스트하게 됩니다.

{% include advertisements.html %}

## Goals (목표)

이 글을 정독할 경우 다음을 할 수 있게 됩니다.

- 기본 브릿지 네트워크를 이해
- 컨테이너 간의 통신을 제어하는 방법을 이해
- 사용자 정의 브릿지 네트워크에 대한 이해

{% include advertisements.html %}

### 사전 조건

이 글의 내용을 따라하기 위해서는 다음이 필요합니다.

- Microsoft Windows 10
- VirtualBox
- Vagrant
- choco

> ⚠️ **경고**: 본 글은 [Vagrant 를 이용한 Docker Swarm 테스팅 (Windows 10)
]({% link _posts/2019-08-08-Docker-Swarm-with-Vagrant-Part-1.markdown %}) 를 통해 환경을 구성해야 실습을 따라할 수 있습니다.

## 기본 Bridge 네트워크 사용하기

이 장에서는 두 개의 alpine 컨테이너를 생성합니다. 단, 생성하는 호스트는 1개 입니다. vagrant 를 통해서 다중 VM 을 구성한 경우 manager 노드에서 코드를 실행해 봅니다.

그리고 생성한 두 개의 컨테이너를 bridge 네트워크를 통해서 연결해 보도록 하겠습니다.

{% include advertisements.html %}

### 1. 네트워크 알아보기

아래의 명령을 입력하면 네트워크 목록을 볼 수 있습니다. 이번 시간은 `bridge` 만을 다루도록 하겠습니다. (이미지를 클릭하면 확여 볼 수 있습니다.)

- 현재 네트워크 목록 출력

```bash
docker network ls | grep local
```

- 네트워크 목록

[![도커 네트워크](/assets/img/2019/08/docker-network-1.png)](/assets/img/2019/08/docker-network-1.png)

출력 결과를 통해 우리가 다루려는 bridge 외에도 host, null 등의 네트워크가 보입니다. 네트워크들에 대한 자세한 내용은 아래의 링크에서 설명해 놓았으니 참고해 보도록 합니다.

- [Vagrant 를 이용한 Docker Swarm 테스팅 (Windows 10)
]({% link _posts/2019-08-07-Difference-between-Docker-Composer-N-Swarm.markdown %}#docker-network)

host 와 none 는 완전한 네트워크는 아닙니다. 그러나 다음의 설명과 같은 역할을 위해서 필요한 네트워크 드라이버입니다.

> ⚠️ **안내**: 여기서 네트워크 드라이버란 도커가 제공하는 네트워크의 종류를 정형화한 형태입니다. 컨테이너 간의 네트워크 유형을 정의하고 용도에 따라 미리 만들어 놓은 것으로 사용자가 도커 클러스터 혹은 도커 데몬에서 네트워크 구성을 용이하게 해줍니다.

|Driver|설명|
|:---:|:---:|
|host|도커 데몬 호스트(manager 노드)의 네트워크 스택과 직접 연결된 컨테이너를 구성하기 위한 네트워크 드라이버|
|none|네트워크가 없는 컨테이너를 구성하기 위한 네트워크 드라이버|

### 2. 컨테이너 실행하기

이제 컨테이너를 실행해 볼까요? 컨테이너를 실행하기 전에 간단한 명령어 옵션을 체크하고 가겠습니다. 아래의 표를 참고해주세요.

docker 명령 프로그램은 다양한 커맨드와 옵션을 가지고 있습니다. 옵션들은 커맨드에 종속되므로 혼동하지 말아주세요.

- 도커 명령 설명표

|키워드|명령|옵션|설명|
|:---:|:---:|:---:|:---:|
|run|√||이미지 실행|
|-d||√|백그라운드 실행 옵션|
|-i||√|인터랙티브(interactive) 모드|
|-t||√|TTY 모드 (입력과 출력을 확인 가능) |
|--name||√|컨테이너 이름을 지정|
|alpine|||사용할 이미지의 이름|
|ash|||alpine 이미지에서 사용하는 기본 쉘 |

- 다음의 두 명령을 실행하여 alpine 컨테이너 두 개를 실행합니다.

아래의 명령에서 우리가 `--network` 옵션을 지정하지 않았으므로 컨테이너는 자동으로 기본 네트워크인 `bridge`로 연결 됨을 명심해주세요.

```bash
docker run -dit --name alpine1 alpine ash

docker run -dit --name alpine2 alpine ash
```

- 생성한 컨테이너 목록을 확인합니다.

```bash
docker container ls -f "name=alpine"
```

- 명령어 실행 결과입니다.

[![도커 컨테이너 목록](/assets/img/2019/08/docker-container-1.png)](/assets/img/2019/08/docker-container-1.png)

### 3. 네트워크 검사하기

네트워크 정보를 확인해 보겠습니다. 현재 bridge 네트워크에 실행한 컨테이너들이 연결되어 있으므로 `docker inspect` 명령을 통해 `bridge` 네트워크의 상세 정보를 확인합니다.

- [jq 명령어](https://stedolan.github.io/jq/)

- 도커 네트워크 검사 명령어를 실행

```bash
docker network inspect bridge
```

- 컨테이너, 네트워크 정보 확인

`jq` 필터를 사용하여 정보를 분석해보겠습니다.

```bash
docker network inspect bridge | jq '.[0] | { Containers, IPAM }'
```

[![브릿지 네트워크 정보](/assets/img/2019/08/docker-inspect-1.png)](/assets/img/2019/08/docker-inspect-1.png)

네트워크 정보를 통해서 우리는 컨테이너에 할당된 아이피 정보와 bridge 네트워크 연결된 컨테이너의 목록을 알 수 있습니다.

- attach 명령을 통해 쉡 접속

`exec` 명령을 이용해 접속을 할 수도 있습니다. 하지만, attach 를 사용하면 좀 더 간편하게 컨테이너에 접근할 수 있습니다.

```bash
docker attach alpine1
ip addr show
ping -c 2 google.com
ping -c 2 alpine2 # Error: Bad Address
```

- 다음은 네트워크 테스트 결과입니다.

다음 그림과 여러분의 결과를 비교해보세요.

[![Alpine1 네트워크 테스트](/assets/img/2019/08/alpine1-1.png)](/assets/img/2019/08/alpine1-1.png)

위의 명령에서 우리는 하나의 사실을 알 수 있습니다. 바로 `alpine2` 컨테이너 이름으로 ping을 던질 경우 실패한다는 점입니다. 그렇다면 컨테이너 이름으로 연결이 가능하려면 어떻게 해야할까요?

- 아이피로 alpine2에 접근

아이피로는 접근이 가능합니다. 즉, 네트워크로 연결되어 있음을 말합니다.

[![아이피로 접근 가능](/assets/img/2019/08/alpine1-2.png)](/assets/img/2019/08/alpine1-2.png)

> ⚠️ **주의**: 기본 bridge 를 Production 모드에서 사용하는 것을 공식 문서에서 권장하지 않습니다. 즉, 사용자 정의 브릿지 네트워크를 구성해야하는 것입니다. 이 글에서 내용을 다루니 좀 더 읽어주세요.

## 사용자 정의 Bridge 네트워킹

이 실습에서는 `alpine` 컨테이너를 네 개를 생성합니다 그전에 사용자 정의 네트워크를 생성하고 여기에 컨테이너들을 연결하는데 적절한 테스트를 위해서 아래의 표와 같이 구성합니다.

- 각 컨테이너 테스트 결과표
  - **인터넷 연결**: 구글 접속이 가능한지 테스트한 결과 입니다. (true: 연결 가능)
  - **Automatic Service Discovery Support** : 도커가 제공하는 컨테이너 이름을 통한 네트워크 연결 기능입니다.
    - 즉 각 컨테이너는 컨테이너 이름만으로 네트워크 접속이 가능합니다.

|컨테이너 이름|네트워크|인터넷 연결|Automatic Service Discovery Support|
|:---:|:---:|:---:|:---:|
|alpine1|user-defined bridge(alpine-net)|true|true|
|alpine1|user-defined bridge(alpine-net)|true|true|
|alpine1|default bridge|true|false|
|alpine1|**user-defined bridge(alpine-net)**, **default bridge**|true|true|

- Service Discovery Support 표

우리는 이전에 `alpine2` 과 같은 컨테이너 이름으로 연결이 되지 않는 것을 확인하였습니다. 그러나 사용자 정의 Bridge 는 가능하다고 알게되었습니다. 따라서 아래의 표를 확인하면 연결 관계를 확인할 수 있습니다.

|Container/Container|alpine1|alpine2|alpine3|alpine4|
|:---:|:---:|:---:|:---:|:---:|
|**alpine1**|√|√||√|
|**alpine2**|√|√||√|
|**alpine3**|||||
|**alpine4**|√|√||√|

결과를 미리 확인하였으니 한번 실제로 테스트 해보도록 하겠습니다.

### 0. 이전 실습 환경 제거

이전에 생성한 컨테이너들을 중지하고 삭제해 줍니다.

- 컨테이너 제거 명령어

```bash
docker container stop alpine1 alpine2
docker container rm alpine1 alpine2
```

{% include advertisements.html %}

### 1. 사용자 정의 네트워크 생성

- 아래의 명령어를 통해서 네트워크를 생성합니다.

```bash
docker network create --driver bridge alpine-net # 사용자 정의 네트워크 생성
docker network ls -f name=alpine-net # 'alpine-net' 네트워크만 출력
```

- 출력 결과

```bash
NETWORK ID          NAME                DRIVER              SCOPE
0db85059443c        alpine-net          bridge              local
```

### 2. 사용자 정의 네트워크 생성

- 컨테이너를 생성합니다.
  - **--network** : 사용자 정의 네트워크 드라이버 이름을 지정합니다.

```bash
docker run -dit --name alpine1 --network alpine-net alpine ash
docker run -dit --name alpine2 --network alpine-net alpine ash
docker run -dit --name alpine3 alpine ash
docker run -dit --name alpine4 --network alpine-net alpine ash
docker network connect bridge alpine4 # alpine4 는 두개의 네트워크에 연결
```

- 명령 실행 결과

```bash
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
c38217299997        alpine              "ash"               24 seconds ago      Up 22 seconds                           alpine4
7dcc9a4828f2        alpine              "ash"               26 seconds ago      Up 24 seconds                           alpine3
861e9502b242        alpine              "ash"               28 seconds ago      Up 26 seconds                           alpine2
6c8dab79ab87        alpine              "ash"               30 seconds ago      Up 28 seconds                           alpine1
```

### 3. 네트워크 체크하기

- 생성한 네트워크의 상세 정보를 확인합니다.

```bash
docker network inspect bridge | jq '.[0] | { Containers, IPAM }'
docker network inspect alpine-net | jq '.[0] | { Containers, IPAM }'
```

- 네트워크 정보입니다.

[![네트워크 정보](/assets/img/2019/08/alpine1-3.png)](/assets/img/2019/08/alpine1-3.png)

- 네트워크 할당 표

위의 네트워크 정보를 해석하면 아래와 같이 간략한 표로 만들 수 있습니다.

|Network/Container|alpine1|alpine2|alpine3|alpine4|
|:---:|:---:|:---:|:---:|:---:|
|**default bridge**|||√|√|
|**alpine-net**|√|√||√|

### 4-1. 테스트 alpine1 의 사정

alpine1 컨테이너 관점에서 pinging, auto discovery service 를 테스트 해보겠습니다.

- alpine1 에 접속합니다.

```bash
docker attach alpine1
```

- alpine3 를 제외하고 연결이 가능합니다.

```bash
/ # ping -c 2 alpine2
PING alpine2 (172.19.0.3): 56 data bytes
64 bytes from 172.19.0.3: seq=0 ttl=64 time=0.060 ms
64 bytes from 172.19.0.3: seq=1 ttl=64 time=0.075 ms

--- alpine2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.060/0.067/0.075 ms
/ # ping -c 2 alpine3
ping: bad address 'alpine3'
/ # ping -c 2 alpine4
PING alpine4 (172.19.0.4): 56 data bytes
64 bytes from 172.19.0.4: seq=0 ttl=64 time=0.188 ms
64 bytes from 172.19.0.4: seq=1 ttl=64 time=0.239 ms

--- alpine4 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.188/0.213/0.239 ms
```

### 4-2. 테스트 alpine3 의 사정

- alpine3 에 접속해보겠습니다.

```bash
docker attach alpine3
```

- 동일한 테스트를 진행한 결과 아래와 같습니다.
  - `alpine3` 는 `172.17.0.2` 아이피입니다.
  - `alpine4` 컨테이너 이름으로 핑 시도 : **실패**
  - `172.17.0.3` (alpine4) IP 로의 핑 시도 : **성공**
  - `172.19.0.2 ~ 4` IP 로의 핑 시도 : **실패**

```bash
/ # ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
42: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 scope global eth0
       valid_lft forever preferred_lft forever
/ # ping alpine4
ping: bad address 'alpine4'
/ # ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3): 56 data bytes
64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.162 ms
64 bytes from 172.17.0.3: seq=1 ttl=64 time=0.303 ms
^C
--- 172.17.0.3 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.162/0.232/0.303 ms
/ # ping -c 2 172.19.0.3
PING 172.19.0.3 (172.19.0.3): 56 data bytes

--- 172.19.0.3 ping statistics ---
2 packets transmitted, 0 packets received, 100% packet loss
```

### 4-3. 테스트 alpine4 의 사정

alpine4 는 default bridge 와 user-defined bridge 에 모두 연결된 독특한 컨테이너 입니다. 따라서, 네트워크 테스트 결과가 주목될만 합니다.

- alpine4 에 연결

```bash
docker attach alpine4
```

- 네트워크 테스트 결과는 아래와 같습니다.
  - bridge 네트워크에 대한 IP 핑 : **성공**
  - alpine-net 네트워크에 대한 IP 핑 : **실패**
  - alpine-net 네트워크에 대한 Auto Discovery : **실패**
  - bridge 네트워크에 대한 Auto Discovery : **실패**

```bash
/ # ping -c 2 alpine1
PING alpine1 (172.19.0.2): 56 data bytes
64 bytes from 172.19.0.2: seq=0 ttl=64 time=0.186 ms
64 bytes from 172.19.0.2: seq=1 ttl=64 time=0.098 ms

--- alpine1 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.098/0.142/0.186 ms
/ # ping -c 2 alpine2
PING alpine2 (172.19.0.3): 56 data bytes
64 bytes from 172.19.0.3: seq=0 ttl=64 time=0.171 ms
64 bytes from 172.19.0.3: seq=1 ttl=64 time=0.164 ms

--- alpine2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.164/0.167/0.171 ms
/ # ping -c 2 alpine3
ping: bad address 'alpine3'
/ # ping -c 2 172.17.0.2
PING 172.17.0.2 (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.086 ms
64 bytes from 172.17.0.2: seq=1 ttl=64 time=0.141 ms

--- 172.17.0.2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.086/0.113/0.141 ms
```

## 실습 종료/정리하기

- 다 사용한 컨테이너들을 정리해 줍니다.

```bash
docker container stop alpine1 alpine2 alpine3 alpine4
docker container rm alpine1 alpine2 alpine3 alpine4
docker network rm alpine-net
```

## 결론

지금까지 Docker 네트워크 중 Bridge 에 대해서 체크해보았습니다. 이제 우리는 default bridge 네트워크를 사용해야 하지 말아야할 이유로 `Auto Discovery Service` 가 지원이 되지 않음을 말할 수 있게되었습니다. 그리고 이에 따라, 도커 네트워크를 구성할 때 아이피로만 통신을 지정해야하는 불편함이 따르게 됩니다.

따라서, 우리는 bridge 네트워크를 구성할 때, 사용자 정의로 구성을 해주어야 함을 자연히 깨닫을 수 있게되었으며 컨테이너 이름으로 통신을 설정할 수 있어 매우 편리함을 알 수 있었습니다.

지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

## 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [Docs Docker: Bridge](https://docs.docker.com/network/bridge/)
- [Docs Docker: Bridge Network Tutorial](https://docs.docker.com/network/network-tutorial-standalone/)
- [Success Docker: Networking](https://success.docker.com/article/networking)
