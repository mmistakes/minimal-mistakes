---
title: Docker Summary for busy users
key: 20180910
tags: docker summary
---

시간은 돈이다 그러니 최대한 효율적으로 필요한 것만 챙긴다 ...

<!--more-->

> 어떻게 정리해야 효율적일까?

Docker 에 대한 여러 좋은 블로그들을 많이 참조하였다. 그러나 결론은 바로 쓸 수 있는 것이 최고다.
Docker 가 좋고 많이 사용되는 것은 알겠다. 중요한 것은 빠르게 도입해서 쓰는 것이다.
그리고 테스트 해보는 것이다.

따라서 아래와 같이 목표를 구성하였다.

**목표**
- 어차피 서비스로 올리는 것이다.
- 기본은 나중에 천천히 해도 무방하다.
- 큰 그림 부터 잡자.


**목차**
- [이 문서의 10분 파트](#10분)
- [이 문서의 개념 파트](#개념)
- [이 문서의 자료 수집](#자료-수집)
- [이 문서의 아이디어](#아이디어)

# 10분

나는 모든 것이 10분만에 완료가 가능하도록 여기에 압축한다. 목적은 Docker Swarm 모드로
내 노트북에 구성하고 gitlab, jenkins 등을 관리하는 것이다.

```
# 윈도우 10
docker swarm init --advertise-addr 192.168.25.43
# 리눅스, ip 치환명령이 들어감
docker swarm init --advertise-addr $(docker-machine ip `docker-machine active`)
# Worker 를 붙일때 사용할 명령어
docker swarm join --token SWMTKN-1-0nc679vhp459s5t8dhweokfphv8lcz8bzex39199ry8og0ho53-2ju3fb81hquxt3nsgr707h8oz 192.168.25.43:2377
```
![Alt](/assets/images/2018-09-10-docker-summary-for-busy-user/docker-swarm-init.png)

# 개념

## Container 란 무엇인가?

- [소용환님의 생각 저장소/Docker 시리즈](http://www.sauru.so/blog/getting-started-with-docker/)

 > 개별 Software의 실행에 필요한 실행환경을 독립적으로 운용할 수 있도록 기반환경 또는 다른 실행환경과의 간섭을 막고 실행의 독립성을 확보해주는 운영체계 수준의 격리 기술

 ![Alt](http://cdn.rancher.com/wp-content/uploads/2017/02/16175231/VMs-and-Containers.jpg)


## Docker Swarm

아래는 Docker Swarm 의 기능인데 요약하면 한줄이다.

`Container 들을 유기적으로 관리`

**세부 기능은 아래와 같다**
 - Cluster management integrated with Docker Engine
 - Decentralized design
 - Declarative service model
 - Scaling
 - Desired state reconciliation
 - Multi-host networking
 - Service discovery
 - Load balancing
 - Secure by default
 - Rolling updates

**용어 정리**

본인이 소용환님 처럼 이 정의를 다 알필요는 없다. 그냥 헷갈릴 떄 참조한다.

- Container
 - 사용자가 실행하고자 하는 프로그램의 독립적 실행을 보장하기 위한 격리된 실행 공간/환경
- Task
 - Docker Container 또는 그 격리 공간 안에서 실행되는 단위 작업으로, Swarm이 작업계획을 관리하는 최소단위 (Container와 1:1 관계임)
- Service
 - 사용자가 Docker Swarm에게 단위 업무를 할당하는 논리적 단위로, Swarm에 의해 여러 Task로 분할되어 처리됨
- Dockerized Host 또는 Host
 - Docker Engine이 탑재된 Virtual Machine이나 Baremetal
- Swarm Node 또는 Node
 - Docker Engine이 Swarm mode로 동작하는 Host 하지만 오랜 버릇으로 인해, 이전 글에서는 Host와 같은 의미로 사용하기도 했다.
- Manager Node 또는 Manager
 - Swarm Node 중에서 Cluster 관리 역할을 수행하는 Node
- Worker Node 또는 Worker
 - Swarm Node 중에서 Container를 실행하여 실제 일을 처리하는 Node. 일부러 제외하지 않으면 모든 Node는 기본적으로 Worker가 됨

# 자료 수집

## Django Docker

- [Django 프로젝트를 Docker Container 로 .... ](https://micropyramid.com/blog/how-to-deploy-django-project-into-docker-container/)
  - Django 개발기를 구성하고 이를 Docker 에 올리는 경우 유념하라.

# 아이디어

## Slack 활용

모니터링에 slack을 활용하자.

# 의문

## manager 에 worker 또한 추가가 가능?

잘 모르겠다. 추가하는 과정을 봐야 겠다.

---

If you like the essay, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
