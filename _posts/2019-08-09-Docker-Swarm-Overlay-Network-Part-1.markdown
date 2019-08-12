---
layout: post
title:  "도커 오버레이 네트워크(Docker Overlay Network) 알아보기 Part 1"
subtitle: "오버레이 네트워크 활용 전략"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-09 00:00:00 +0900
categories: [ "docker", "network", "overlay"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 도커의 오버레이 네트워크(Docker Overlay Network)에 대해서 알아보도록 하겠습니다. 이 글을 통해서 여러분은 도커 오버레이 네트워크(`Docker Overlay Network`)를 이해할 수 있으며, 또한 도커 Swarm 에서 자유롭게 분산환경에서도 네트워킹을 하는 방법을 소개해 드리겠습니다. 😺

<!--more-->

## 개요

이 글을 통해서 우리는 다음의 지식을 학습하며 응용할 수 있는 역량을 갖추게 됩니다.

- overlay 네트워크 구성 방법
- ingress 와 docker_gwbridge 의 차이점
- 단독 실행형과 스웜의 통신 연결
- 네트워크 간의 암호화 통신

<!-- 내용이 너무 많은데 작성하다가 많으면 두개로 분할하자. -->

{% include advertisements.html %}

## 오버레이 네트워크란

오버레이 네트워크 드라이버는 도커 데몬 호스트들 간의 분산 네트워크를 만들어줍니다. 또한, 호스트 네트워크의 상단에 있으므로 컨테이너 간의 통신을 할 수 있으며 또한 안전한 통신 방법을 제공해줍니다. 도커는 모든 패킷을 투명하게 처리해 줍니다.

## ingress 와 docker_gwbridge

처음으로 Swarm 을 초기화 하고 호스트들을 연결하였을 때, 두개의 네트워크가 자동으로 생성됩니다. 이들의 이름은 각각 `ingress`, `docker_gwbridge` 입니다. 

각 네트워크 드라이버의 특성을 한번 살펴볼까요?

- **ingress**
  - overlay 네트워크 드라이버 입니다.
  - 스웜 서비스와 관련된 데이터 트래픽을 통제합니다.
  - swarm 서비스의 기본 네트워크 드라이버(default bridge 와 같음)로 서비스 생성 시 네트워크 정보를 지정하지 않는다면 자동으로 `ingress` 네트워크에 연결 됩니다.
   
   
- **docker_gwbridge**
  - bridge 네트워크 드라이버 입니다.
  - 스웜에 참여한 도커 데몬들을 연결해 주는 역할을 합니다. (즉, 분산 환경에 참여한 호스트들을 연결해 줍니다.)

## Overlay 네트워크 사용 방법

위에서 오버레이 네트워크는 호스트들 간의 네트워크를 형성해 주는 용도라고 알고 있습니다. 사용자 정의 브릿지 네트워크 드라이버처럼 오버레이 또한 사용자 정의를 만들 수 있습니다. 서비스 혹은 컨테이너들은 한번에 여러개의 네트워크에 연결되어 있을 수 있습니다. 또한, 네트워크 드라이버로 묶여있어야만 서로와 통신할 수 있습니다.

## 주의점

여러분이 이 주제의 시리즈를 계속 읽어야 하는 이유가 될 수 있습니다. 그것은 다음의 이유 때문입니다.

**오버레이 네트워크에 연결된 서비스와 독립실행형 컨테이너는 동일한 오버레이 네트워크에 연결되어 있을지라도 기본 동작과 설정이 다르기 때문입니다.**

이제 여러분이 이 시리즈를 왜 정독해 주셔야하는지 감이 오셨을 것이라고 믿습니다. 좀 더 나아가 보겠습니다.

## 호스트 방화벽 미리 체크하기

실습 전에 방화벽 상태를 미리 점검해 볼까요? 만약에 여러분이 도커 스웜을 구성하지 않았다면 아래의 링크를 통해 20분 만에 도커 스웜을 구성해보세요.

- [Vagrant 를 이용한 Docker Swarm 테스팅 (Windows 10)]({% link _posts/2019-08-08-Docker-Swarm-with-Vagrant-Part-1.markdown %})

- ufw enable 명령을 통해서 아래의 내용을 활성해 주세요

|Port 번호|용도|프로토콜|
|:---:|:---:|:---:|
|**2377**|스웜 클러스터 통신 포트|TCP|
|**7946**|노드 간의 통신 포트|TCP/UDP|
|**4789**|오버레이 네트워크 트래픽을 위한 통신 포트|UDP|

## 케이스: 단독실행형과 스웜 통신

단독 실행형과 스웜 통신에 대해서 알아보겠습니다. 이 케이스는 다음의 두 가지 유형으로 나누어 설명드리겠습니다.

- 단순 오버레이 네트워크 생성
- 컨테이너 통신을 위한 `--attachable` 설정

우선 오버레이 네트워크를 만들어서 테스트 해볼까요?

### 1. 단순 오버레이 네트워크 생성

`test-cluster-net2` 라는 이름으로 오버레이 네트워크를 생성합니다. 그리고 생성된 네트워크 정보를 보겠습니다.

- 오버레이 네트워크 생성

옵션을 제공하지 않고 단순히 드라이버 이름을 오버레이로 지정해줍니다.

```bash
docker network create -d overlay test-cluster-net2
```
- 10.0.1.1/24 서브넷으로 할당되어 있습니다.

```bash
docker network inspect test-cluster-net2 | jq '.[0] | { IPAM }'
{
  "IPAM": {
    "Config": [
      {
        "Gateway": "10.0.1.1",
        "Subnet": "10.0.1.0/24"
      }
    ],
    "Options": null,
    "Driver": "default"
  }
}
```

- 생성된 네트워크의 Subnet 정보는 아래와 같습니다.

비트 마스크가 24 이므로  2^(8=32-24) == 256 개 만큼 아이피를 할당할 수 있습니다.

|CIDR Range|10.0.1.0/24|
|Netmask|255.255.255.0|
|Wildcard Bits|0.0.0.255|
|First IP|10.0.1.0|
|Last IP |10.0.1.255|
|Total Host|256|

- 다음으로 replica 가 5개인 nginx 웹 서비스를 구동하겠습니다.

```bash
docker service create \
  --name my-nginx \
  --publish target=80,published=80 \
  --replicas=5 \
  --network test-cluster-net2 \
  nginx
```

- 독립 실행형 컨테이너 구동 및 연결 시도

```bash
# 사용자 정의 브릿지 네트워크를 생성해 줍니다.
docker network create --driver bridge test-net
# alpine 컨테이너를 독립 실행형으로 구동합니다.
docker run -dti --name alpine1 --network test-net alpine ash
# 그리고, 컨테이너에 접속합니다.
docker attach alpine1
```

- 연결 테스트

사용자 정의 브릿지는 Auto DNS Resolution 기능을 제공해줍니다. 따라서, `my-nginx` 라는 이름으로 구성된 서비스에 연결 시도를 해보도록 하겠습니다.

```bash
## alpine1 호스트 입니다.
/ # ping my-nginx
ping: bad address 'my-nginx'
```

우리가 원하는 DNS Resolution 이 동작하지 않습니다. 그렇다면 네트워크 지식으로 `test-cluster-net2` 에 연결하면 통신이 가능할 것으로 생각됩니다.

- 오버레이 네트워크에 연결 시도

안타깝게도 아래와 같이 에러가 발생합니다. 그런데 `not manually attachable` 이라고 에러가 보입니다.

```bash
# docker network connect test-cluster-net2 alpine1
Error response from daemon: Could not attach to network test-cluster-net2: rpc error: code = PermissionDenied desc = network test-cluster-net2 not manually attachable
```

그렇다면, 어떻게 해야 우리의 `alpine1` 컨테이너는 스웜 서비스의 `my-nginx` 웹 서비스와 통신할 수 있을까요? 다음 실습 내용을 정독해 주세요.

## 2. 오버레이 네트워크와 attachable 플래그

정답은 사용자 정의 네트워크 드라이버 생성 시 지정할 수 있는 `--attachable` 플래그(옵션)입니다. 이제 우리는 새로운 오버레이 네트워크를 생성할텐데요. 차이점이 있다면 `--attachable` 을 단순히 표기하는 정도입니다. 그러나 결과는 완전히 다릅니다.

- 네트워크 생성

```bash
docker network create -d overlay --attachable test-cluster-net
```

- 서비스 재구동 혹은 네트워크 드라이버 연결

네트워크 드라이버를 적용하는 방법으로는 새로운 서비스를 생성하는 방법과 기존 서비스를 변경하는 방법이 있습니다. **그러나 아래의 명령을 실행하는 것은 절대 권해드리지 않습니다.**

실제에서는 서비스 중단에 이를 수 있기 때문이죠.

```bash
docker service create \
  --name my-nginx \
  --publish target=80,published=80 \
  --replicas=5 \
  --network test-cluster-net \ # 이러면 서비스를 어떻게 스위칭하지?
  nginx
```

- 대안 service update 명령어 사용

`--network-add` 플래그를 통해서 `test-cluster-net` 네트워크 드라이버를 `my-nginx` 서비스에 추가해 줍니다. 이 때의 특징은 서비스는 문제없이 구동이 된다는 점입니다. 이러한 현상의 원인은 HA를 위해서 구성한 `--replicas=5` 플래그 덕분인 것으로 보입니다.

```bash
docker service update --network-add test-cluster-net my-nginx
my-nginx
overall progress: 5 out of 5 tasks 
```

- 서비스가 사용 중인 네트워크 정보를 확인

우리는 `service inspect` 명령을 통해서 어떠한 인터페이스가 물려있는지 확인할 수 있습니다.

```bash
docker service inspect my-nginx | jq '.[0].Spec.TaskTemplate.Networks'
[
  {
    "Target": "nfeyohnge53hflppaioxl949m"
  },
  {
    "Target": "zpwku8vx6elfvboj3zw00it38"
  }
]
```

- 네트워크 드라이버가 다음과 일치하는 것을 확인

`--network-add` 플래그는 기존의 네트워크 드라이버를 건드리지 않고 신규 드라이버만 추가해줍니다.

```bash
docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
nfeyohnge53h        test-cluster-net    overlay             swarm
zpwku8vx6elf        test-cluster-net2   overlay             swarm
```

- 쓰지 않는 드라이버 제거

이제 `test-cluster-net2` 드라이버와 작별할 시간이 왔습니다. 아래의 명령어를 실행해 주세요.

```bash
docker service update --network-rm test-cluster-net2 my-nginx
```

- 독립 실행형 컨테이너 재연결

자 이제 우리는 서비스와 컨테이너 간의 통신을 할 수 있게되었습니다.

```bash
docker network connect test-cluster-net alpine1
```

- DNS Resolution 확인

축하드립니다. 이제 여러분은 도커 스웜과 독립 실행형 컨테이너를 연결할 수 있게되었습니다.

```bash
docker exec alpine1 ash -c 'ping -c 2 my-nginx'
PING my-nginx (10.0.0.5): 56 data bytes
64 bytes from 10.0.0.5: seq=0 ttl=64 time=0.340 ms
64 bytes from 10.0.0.5: seq=1 ttl=64 time=0.113 ms

--- my-nginx ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.113/0.226/0.340 ms
```

## 스웜 서비스와 독립 실행형 컨테이너 연결의 의미

여러분은 여러가지 이유로 컨테이너를 스웜에 올리지 못하는 경우가 생깁니다. 만약 여러분이 여러 호스트에 걸쳐서 이미 독립 실행형 컨테이너들을 생성해 두었다고 가정해볼까요?

그렇다면 어떻게 스웜과 통신하도록 할 수 있을까요? 바로 위에서 소개해 드린 방법을 통해서 입니다. 즉, 좀더 유연하게 우리는 네트워크 조작을 할 수 있으며 이를 통해서 원하는 전략을 서비스 중단 없이 구현할 수 있는 능력을 방금 갖추었습니다. 참 쉽죠?

## 팁: Overlay 암호화 통신

호스트 간의 통신에서 만약 통신이 공개되어 있다면 매우 난감할 수 있습니다. 이때 사용하는 플래그가 `-opt encrypted` 입니다. 그렇다면 암호화 스펙을 알아볼까요?

- 모든 노드 간의 IPSEC 터널링
- GCM 모드의 AES 알고리즘 사용
- 12 시간마다 키 로테이션

> ⚠️ **주의**: 윈도우 환경에서는 이 옵션이 지원되지 않습니다. 

 암호화를 통해 보안을 강화한다. MITM 과 같은 공격에 대해 완화가 된다.

```bash
docker network create --opt encrypted --driver overlay --attachable my-attachable-multi-host-network
```

## 정리

지금까지 도커 네트워크에서 Overlay 네트워크 드라이버의 개념과 실습을 병행하였습니다. 또한, 스탠드얼론(독립실행형, standalone) 컨테이너와 스웜 서비스와의 통신을 원활하게 연결하는 방법을 배웠습니다.

이번 내용은 시리즈로 구성하였습니다. 다음 글 (**도커 오버레이 네트워크(Docker Overlay Network) 알아보기 Part 2**) 에서는 아래의 주제를 다루고 도커 오버레이 시리즈를 마치도록 하겠습니다.

- ingress, docker_gwbridge 커스터마이징
- routing mesh 의 개념

지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

## 참고

- [도커 Docs: 오버레이 네트워크](https://docs.docker.com/network/overlay/)
- [도커 Docs: overlay 네트워크 튜토리얼](https://docs.docker.com/network/network-tutorial-overlay)
- [도커 Docs: service update 명령어](https://docs.docker.com/engine/reference/commandline/service_update/)
