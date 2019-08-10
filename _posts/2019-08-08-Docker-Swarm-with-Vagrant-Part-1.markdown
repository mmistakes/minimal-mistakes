---
layout: post
title:  "Vagrant 를 이용한 Docker Swarm 테스팅 (Windows 10)"
subtitle: "빠르게 구축하고 테스팅하기"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-08 00:00:00 +0900
categories: [ "docker", "swarm", "vagrant", "windows10", "virtualbox"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 저번 시간에 Swarm 과 Compose 의 차이점을 쇼핑몰 사례를 분석하면서 소개하였습니다. 오늘은 Vagrant 라는 툴을 이용해서 간편하게 Docker Swarm 을 윈도우에서 테스트해보도록 하겠습니다.😺

<!--more-->

## 개요

Vagrant 는 가상 머신을 스크립트를 통해서 제어하는 툴입니다. Vagrantfile 을 생성해두고 `vagrant up` 명령을 실행하면 간편하게 가상 머신이 동작하게 됩니다. ssh 등의 접속에 대한 불편함 없이 인스턴스들을 관리할 수 있으므로 이번 시간에 사용해 보았습니다. **제 개인적인 견해로는 분산 관점의 Docker Swarm 을 잘 이해하기 위해서는 개인 머신에서 이를 테스트해보는 것이 가장 좋은 학습 방법으로 보입니다.**

{% include advertisements.html %}

## 요구 사항

지금 알려드리는 방법은 Windows 10 을 기반으로 테스트되었으므로 당연히 종속성이 발생합니다. 간략하게 설치하는 방법을 설명드리도록 하겠습니다.

## Virtualbox 사용하기

Virtualbox 를 사용하기 위해 Hyper-V 가 걸림돌이 됩니다. 쿨하게 Off 해주시면 VirtualBox 가 잘 구동되니 아래의 설정을 확인해 주세요.

- Windows : Hyper-V 설정 Off
  - 프로그램 설정에서 Hyper-V 를 Off 합니다.
- Windows : Device Guard 설정 Off
- BIOS : VT-X 설정 On

- Device Guard 설정 위치
![Device Guard](/assets/img/2019/08/guard-off-1.png)

- 설정 Disabled 상태로 변경 확인
![Device Guard](/assets/img/2019/08/guard-off-2.png)

{% include advertisements.html %}

### babun 설치

저는 개인적인 취향으로 리눅스를 좋아합니다. 여러분도 리눅스를 즐겨 쓰기를 바라는 마음에서 `babun` 이라는 프로젝트를 소개해 드리도록 하겠습니다. 아래의 링크를 클릭해서 프로젝트를 한번 확인해 볼까요?

- [Github : Babun 프로젝트](https://github.com/babun/babun)

- Viemo : Babun 시연 영상

<div style="text-align:center;"> <!-- vimeo iframe 중앙 설정 -->
<iframe src="https://player.vimeo.com/video/95045348" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen ></iframe>
</div>

### babun 이슈 [PROJECT_DISCONTINUED]

예전에 사용하였을 때에는 프로젝트가 활성화되어 있었으나 현재는 동작하지 않습니다 대안으로 chocolatey 를 사용하는 것을 권장해 드립니다. 오래전에 작성한 문서를 옮겨오는 과정에서 이슈가 있었네요. 혹시 오픈 소스 프로젝트에 기여하고 싶은 개발자 여러분은 maintainer 를 모집하고 있으니 참여해 보시는 것을 권장합니다.

## choco - vagrant 설치

안타까운 babun 은 어쩔 수 없습니다. choco 를 통해서 설치해 볼까요?

- 파워쉘 초코 인스톨 코드

```powershell
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

- vargrant 설치

```powershell
choco install vagrant
```

### vagrant 설치 스크립트

vargrant 가 설치 완료되었습니다. 아래의 명령어를 입력하여 Vagrantfile 을 생성합니다.

```bash
curl https://gist.githubusercontent.com/code-machina/1994fb4c8546a680d58b61a5cdbc1fe2/raw/fd29669ccc3e9424df713f24d1ed99dfa91bdb83/Vagrantfile -o Vargrantfile
```

### Vagrant 파일 역할

다운로드 받은 파일은 아래의 역할을 합니다.

- `ubuntu/xenial64` 이미지 다운로드
- `WORKER_COUNT` 에 맞추어 숫자 조정
- `VM` 의 아이피 설정 (192.168.100.10(manager), 192.168.100.11(worker1), 192.168.100.12(worker2), ...)
- 네트워크 포워딩 (호스트(PC) 포트와 VM Guest 포트를 포트포워딩 설정)
- VM 메모리 설정
- 프로비져닝 설정 (docker-ce 설치)

### worker 수 늘리기

다운받은 Vagrantfile 은 WORKER_COUNT 를 조정할 수 있습니다.

```bash
$ vim ./Vagrantfile
WORKER_COUNT=2 # 원하는 카운트를 지정합니다.
```

## 인스턴스 접속

vagrant 명령을 이용해 아이피를 입력하지 않고 Guest OS에 접속이 가능합니다.

```bash
vagrant ssh manager
```

## Swarm 시작

이제, docker swarm 을 manager VM 에서 구성하고 worker1 을 Join 하는 작업을 해보도록 하겠습니다.

- swarm 시작 (manager)

```bash
sudo docker swarm init --advertise-addr 192.168.100.10
```

### Swarm Join

- swarm join (worker1)

worker1 VM 에 접속합니다.

```bash
vagrant ssh worker1
```

swarm 노드에 join 을 겁니다.

```bash
sudo docker swarm join --token SWMTKN-1-0d4lym64rmugfp6nhybhy0r6i8v108gar84nzzpie8q6xvn9v1-dnz6k2mm70gjt19v1pvbhzuvx 192.168.100.10:2377
```

### Swarm 노드 확인

구성된 현황을 확인해 보겠습니다. 구성한 노드가 확인됩니다.

```bash
$ sudo docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
ddek7dcrq4mf7r84cr1a2z8zt *   manager             Ready               Active              Leader              19.03.1
dzuemtrjbr8k3wynndx77m2o1     worker1             Ready               Active                                  19.03.1
```

## nginx 구성

이제 Nginx 이미지를 서비스로 띄우고 이를 확인해 보겠습니다.

```bash
sudo docker service create --replicas 2 --publish 80:80 nginx
```

생성된 서비스를 확인합니다. replica 가 2로 할당되어 있으며 정상적으로 실행 중입니다.

```bash
$ sudo docker service ls
ID                  NAME                  MODE                REPLICAS            IMAGE               PORTS
bko16lhgmpya        affectionate_mendel   replicated          2/2                 nginx:latest        *:80->80/tcp
```

### 접속 확인

이제 PC 에서 접속을 체크해 볼까요?

![Nginx 접속 화면](/assets/img/2019/08/nginx-01.png)

정상적으로 잘 작동합니다.

## 부록: Vagrantfile 소스코드

소스코드의 내용은 아래와 같습니다.

<script src="https://gist.github.com/code-machina/1994fb4c8546a680d58b61a5cdbc1fe2.js"></script>

## 마무리

지금까지 Vagrant 를 이용하여 Virtualbox 를 통해 Ubuntu VM 을 간편하게 구성해 보았고, Docker Swarm 까지 구성해 보았습니다. 다음 이 시간에는 Docker Swarm 을 모니터링하는 컨테이너를 구성하고 서비스 스택을 올려보도록 하겠습니다. 지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

## 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [Babun, Vagrant](https://medium.com/@robzhu/setting-up-a-docker-host-on-windows-with-vagrant-37db0250190c)
- [Vagrantfile : Ubuntu 16.04 + Docker Setup](https://gist.github.com/code-machina/1994fb4c8546a680d58b61a5cdbc1fe2)
- [Docker Swarm Node](http://redgreenrepeat.com/2018/10/12/working-with-multiple-node-docker-swarm/)
- [Portainer.io : Docker Management Tool](https://www.portainer.io/installation/)
