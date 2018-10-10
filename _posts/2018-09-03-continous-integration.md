---
title: Continuous Integration
key: 20180903
tags: CI Security Jenkins gitlab deployment
---

개발 환경(Windows)에서 gitlab 에 변경 사항을 저장 그리고 Jenkins 를 통해 deployment 를 하는 것을 테스트 한다.
단, gitlab 및 Jenkins 는 각각 docker 로 구성한다.

<!--more-->

**참조 링크**
- [Sample Link1]()
- [사내 docker 저장소(registry) 구축하기](http://www.kwangsiklee.com/2017/08/%EC%82%AC%EB%82%B4-docker-%EC%A0%80%EC%9E%A5%EC%86%8Cregistry-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0/)

# Intro

특정 언어 및 특정 프레임워크의 개발 환경을 구축이라기 보다는 지속적인 통합(Continuous Integration, CI)을 목적으로 구축한다. CI 는 버전 반영 및 빠른 배포에 적합하다.

## 구축 환경 정의

구축 환경을 아래와 같이 정의한다.

* Docker 기반의 Container 시스템
 * Jenkins Container
 * gitlab Container
 * etc ...
* Docker 호스트
 * Ubuntu 16.04

## docker 설치
우선 의식의 흐름대로 Docker 를 설치한다. 참조 링크를 활용해 docker-setup.sh_ 파일을 작성하여 설치하였다.

**참조 링크**
- [docker community edition install in Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-from-a-package)

docker-setup.sh_
```
# Set up the repository
sudo apt-get update

# Install packages to allow apt to use a repository over HTTPS
sudo apt-get install \
         apt-transport-https \
         ca-certificates \
         curl \
         software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Verify that you now have the key with the fingerprint.
# For example, 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88, by searching for the last 8 characters of the fingerprint.
sudo apt-key fingerprint 0EBFCD88

# Set up the stable repository.
# To install builds from `edge` or `test` repositories as well. add the word edge or test (or both) after the wrod stable in the commands below
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update

sudo apt-get install docker-ce
```
※ 설치 중에 특이사항은 없었다.

### docker composer (?)

docker composer 가 필요한 이유는 단순히 container 를 설치하는 것 뿐만아니라 로그 수집의 위치등을 기입하여 한번에 설정하도록 함에 있다. 또한 플러그인 설치를 자동으로 수행함에도 그 의의가 있다.

**docker composer 의 쓰임(?)**
- 백업 경로 설정
- 로그 경로 설정
- 플러그인 설치 자동화
- WAS 세부적인 설정(Django 와 같은 것들은 말이지)

```
```
### docker registry

아래의 인용은 [도커 미러링](http://www.kwangsiklee.com/2017/08/%EC%82%AC%EB%82%B4-docker-%EC%A0%80%EC%9E%A5%EC%86%8Cregistry-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0/) 을 참조하였음.

> 또한 stackoverflow 글에서도 docker hub pull 기능과 docker push를 내부적으로 사용하기 위해서는 private registry와 mirror registry를 띄워야 한다고 의견이 모아지고 있다.

### Docker Swarm

- [Docker Swarm Mode Overview](https://docs.docker.com/engine/swarm/)

- Feature highlights
 - Cluster management integrated with Docker Engine
   - Docker Engine CLI 를 통해서 swarm 을 관리할 수 있다. 별도의 orchestration software 가 필요하지 않는다.
 - Decentralized design
   - you can build an entire swarm from a single disk image
 - Declarative service model
   - let you define the desired state of the various services in your application stack. For example, you might describe an application comprised of a web front end service with message queueing services and a database backend.
 - Scaling
   - declare the number of tasks you want to run. "Scale up or down"
 - Desired state reconciliation
   - swarm manager node constantly monitors the cluster state and reconciles any differences between the actual state and your expressed desired state.
   - For example, if you set up a service to run 10 replicas of a container, and a worker machine hosting two of those replicas crashes, the manager creates two new replicas to replace the replicas that crashed. The swarm manager assigns the new replicas to workers that are running and available.
 - Multi-host networking
   - specify an overlay network for your services
   - manager automatically assigns addresses to the containers on the overlay network when it initializes or updates the application.
 - Service discovery
   - manager nodes assign each service in the swarm a unique DNS name and load balances running containers.
 - Load balancing
   - You can expose the ports for services to an external load balancer
 - Secure by default
   - Each node in the swarm enforces TLS mutual authentication and encryption to secure communications between itself and all other nodes

#### Create a Swarm

- [Create Swarm](https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/)
- [HA of docker Swarm](http://www.sauru.so/blog/high-availability-of-docker-swarm/)

Swarm 을 생성하기 위해 아래와 같이 명령을 전달한다.

- --advertise-addr flag 는 manager node 를 192.168.99.100 아이피를 통해서 publish 한다. 다른 노드들은 반드시 이 아이피를 통해서 접근할 수 있어야 한다.

- swarm 을 생성하게 되면 `새로운 노드가 swarm 에 가입할 수 있는 명령어를 제공한다.` 이러한 노드들은 --token 플래그에 지정된 옵션에 따라 manager 인지 worker 인지 정의된다.

```
docker swarm init --advertise-addr 192.168.99.100

--- output ---

docker swarm join \
--token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
192.168.99.100:2377
```


```
docker swarm join-token worker

--- output ---
To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5zfq1ofjhl-07silivne3rwbadtx0967ax36 192.168.x.xxx:2377
```
##### Docker Machine

Docker Machine 이 아직 무엇인지는 자세히 알지는 못하지만 설치하고 테스트 해본다.
Docker Node 를 Machine 을 통해 provision(공급)이 가능하다고 한다.

- [provision docker node with docker machine](http://www.sauru.so/blog/provision-docker-node-with-docker-machine/)
- [install machine directly](https://docs.docker.com/machine/install-machine/#install-machine-directly)

`install-docker-machine.sh`
```
base=https://github.com/docker/machine/releases/download/v0.14.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo install /tmp/docker-machine /usr/local/bin/docker-machine
```

>이와는 달리 Docker Machine은, Docker Engine을 사용자 앞의 기계가 아닌 클라우드 컴퓨팅 VM을 비롯한 원격지의 서버에 설치할 수 있도록 돕는다.

> 원격지 서버에 들어가서 Local에 설치하듯 설치하는 것이 아니라, 원격 조정으로 설치할 수 있도록 해준다. 그것 뿐만 아니라! 명령 하나로 아직 존재하지도 않는 기계를 새로 만들어서 Engine까지 한 방에 설치해주는 멋진 도구다!

##### Docker Swarm 고가용성

- [HA of docker Swarm](http://www.sauru.so/blog/high-availability-of-docker-swarm/)

1. 클러스터를 이루는 요소 중 일부에 장애가 발생한 경우, 현재 가동중에 있는 서비스/업무에 영향을 주지 않아야 함
  1. 서비스의 가용성
  2. Manager 의 scheduling 기능에 의해 보장
     - Scheduler 는 Swarm에게 Service 가 할당 되었을 때, 다시 Task 로 나누고 이에 Slot 개념을 적용하여 빈 Slot 이 없도록 유지관리하는 기능을 가진다.
2. 일부 구성요소가 가용하지 않음에도 불구하고, 그 클러스터가 여전히 제어 가능한 상태에 있어야  한다는 것
  2. 제어의 가용성
    - 복수의 Manager Node 로 구성된 Manager Pool 을 구성하영 manager 중 일부가 죽더라도 기능이 정샂거으로 동작할 수 있도록 현황정보를 공유를 포함한 클러스터 기능을 제공하고 있다.

HA 클러스터의 기본원리
---
* 클러스터의 종류
 - 병렬처리 클러스터 (부하분산 클러스터)
 - 가용성 클러스터 (장애상황을 유연하게 대처, HA(High Availability) 클러스터)



## gitlab container 설치

자 이제 gitlab 컨테이너를 내려받아 설치할 차례이다. composer 를 사용할지는 아직 확실치 않으나 composer 파일을 구성하는 이유는 백업 등의 여러 복합적인 설정을 번거롭지 않게 한번에 처리하기 위함이다.





---

If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
