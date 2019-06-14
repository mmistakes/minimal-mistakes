---
layout: post
title:  "우분투18 에서 MongoDB 활용하기"
subtitle: "MongoDB 설치"
author: "코마"
date:   2019-06-15 00:00:00 +0900
categories: [ "ubuntu", "mongodb"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 우분투 18.04 LTS (Bionic)에서 MongoDB를 설치하는 방법을 소개해 드리도록 하겠습니다. 😺

<!--more-->

## 개요

간략히 설치 방법을 설명하고 주의사항을 따라 정리하여 구독자의 설치상의 오류를 최소한으로 하도록 돕습니다.

## 주의 사항

### WSL (Windows Subsystem for Linux) 미지원

몽고 DB 는 WSL 를 지원하지 않으며 WSL 을 사용할 경우 다양한 에러가 발생하므로 이를 주의합니다.

### IBM Power System 에서 패키지 업데이트 이슈

`lock elision bug` 로그로 인해 glibc 패키지 업데이트가 필요

### mongodb-org vs mongodb

mongodb 와 mongodb-org 는 유지보수 주체가 다릅니다. mongodb-org 패키지는 MongoDB 에서 공식적으로 지원하는 패키지입니다.
그러나, mongodb 는 그렇지 않습니다. 만약 설치의도와 다른 패키지를 설치하신 경우 아래의 명령어를 입력합니다.

```bash
sudo apt list --installed | grep mongodb
sudo apt remove mongodb
sudo apt purge mongodb
```

## 설치 방법

이제 mongodb Community Edition 을 설치해보도록 하겠습니다. 추후에 백업, 확장성 등을 고려하여 구축하는 방법을 알려드릴 예정입니다.

### public key 임포트

PMS(Package Management System)의 일종인 Ubuntu 패지키 관리 툴(dpkg 그리고 apt)은 package 의 일관성(consistency)과 진위여부(authenticity)를
판별합니다. 이때 배포자(distributor, MongoDB Inc)로 하여금 GPG 키로 패키지들을 서명하기를 요구하는데요.

이를 임포트하여 패키지 관리 툴에게 키 정보를 입력합니다.

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

### list 파일을 생성

apt 명령어를 사용하여 패키지 설치 시 패키지 명령어를 받아올 장소를 알고 있어야 합니다. 따라서 list 파일을 만들어 둡니다.

만약에 `apt-get update` 명령 상에 문제가 발생하는 경우 이는 list 파일의 문제입니다.

아래의 명령어를 입력하여 리스트 파일을 생성합니다. (역시 리눅스는 아릅답습니다 😺)

```bash
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

### 로컬 패키지 DB 리로드(Reload)

Local 의 패키지 DB 를 리로드합니다.

```bash
sudo apt-get update
```

### MongoDB 설치

자 이제 설치하도록 하겠습니다. 패키지 명이 `mongodb-org` 인 점에 유의해 주세요.

```bash
sudo apt-get install -y mongodb-org
```

## 데몬 구동

- 시작

```bash
sudo service mongod start
```

- 재시작

```bash
sudo service mongod restart
```

- 종료

```bash
sudo service mongod stop
```

## 환경 설정 파일

처음 구동 후에 host OS 에서 guest OS 로 27017 포트를 통해 MongoDB 로 연결하려면 Connection Reset 이 발생합니다. 이는 
MongoDB 의 Default BindIp 설정 값이 loopback 주소이기 때문입니다. 따라서 아래와 같이 수정합니다.

```bash
sudo vi /etc/mongod.conf
service mongod restart
```

```yml
# /etc/mongod.conf
net:
  port: 27017
  bindIp: 0.0.0.0
```

## 연결 테스트

텔넷을 통해서 포트 오픈을 확인합니다.

```powershell
telent db.secu.io 27017
```

## 참조

- [Manual : Install MongoDB on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

## 결론

이번 시간에는 mongodb 을 사용할 수 있는 환경을 설치해 보았습니다. 시작이 반이라고 합니다. 즐거운 코딩 되시길 바랍니다.

지금까지 **코마**의 훈훈한 블로그 였습니다. 구독해 주셔서 감사합니다. 더욱 발전하는 모습을 보여드리기 위해 노력하도록 하겠습니다.
