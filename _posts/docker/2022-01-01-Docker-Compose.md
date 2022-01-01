---
layout: single
title: "[Docker] Docker Compose 적용기"
categories: Docker
tag: [Docker, Cloud, Container]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔Docker-compose

### ✅ Docker를 사용하는 이유

- 개발 환경을 동일하게 구성하기 위함
- 여러 개의 컨테이너 서비스를 한 번에 실행할 수 있는 환경을 만들기 위함
- Docker는 기본적으로 리눅스 커널 위에서 돌아간다

Docker를 사용하는 이유는 `개발을 할 때 누구나 동일한 환경 구성`을 할 수 있다는 점이다.  
사용자마다, 서버마다 환경이 다르기 때문에 도커를 활용하여 동일한 실행 환경 구성이 가능하다.

## ✔ docker-compose?

> Docker Compose는 yaml 파일로 여러 개의 도커 컨테이너의 정의를 작성하여,  
> 사용함으로써 한 번에 많은 컨테이너들을 작동 시키고 관리할 수 있는 하나의 툴이다

### ✅ compose?

- yaml 포맷(확장자 .yml)으로 기술된 설정 파일 (스크립트 파일)
- build(빌드) + run(실행)이 한번에 가능하다

| Annotation      | Desc                                      |
| --------------- | ----------------------------------------- |
| version:        | 버전 지정                                 |
| services:       | 서비스 정의                               |
| image:          | 이미지 지정                               |
| build:          | 도커 파일 위치                            |
| command:        | container에서 작동하는 명령               |
| entrypoint:     | container에서 작동하는 명령               |
| depends_on:     | 서비스간 의존 관계 설정                   |
| enviroment:     | 컨테이너 안 환경변수 설정                 |
| container_name: | 컨테이너명                                |
| volumnes:       | 컨테이너 볼륨 마운트                      |
| volumnes_from:  | 다른 컨테이너로부터 모든 볼륨 마운트      |
| links:          | 다른 컨테이너와 연결                      |
| ports:          | Host에 해당 컨테이너가 공개하는 포트 번호 |
| expose:         | 컨테이너끼리 공개하는 포트 지정           |

## ✔ docker-compose 기본 명령어

### ✅ docker-compose up

```shell
$ docker-compose up [option] [service]
```

컨테이너를 생성 및 실행하는 명령어

| Option     | Desc                     |
| ---------- | ------------------------ |
| -d:        | 백 그라운드 실행         |
| --no-deps: | 링크 서비스 실행 안함    |
| --build:   | 이미지 빌드              |
| -t:        | 타임아웃 지정(기본 10초) |

### ✅ docker-compose run | start | stop

```shell
$ docker run IMAGE_ID
$ docker start CONTAINER_ID
$ docker stop CONTAINER_ID
```

- run: 새로운 컨테이너를 이미지로부터 만든다
- start | stop: 기존에 실행 되었던 컨테이너를 중지 시키거나 실행시킴

### ✅ docker-compose ps

```shell
$ docker-compose ps
```

- Docker Compose에 정의되어 있는 모든 서비스 컨테이너 목록을 조회할 때 사용

### ✅ docker-compose logs

```shell
$ docker-compose -f web
```

- 서비스 컨테이너의 로그를 확인하고 싶을 때 사용하며, 보통 `-f` 옵션을 사용하여 실시간 확인

### ✅ 추천 문서

- [개발자가 처음 Docker를 접할때 오는 멘붕 몇가지](https://www.popit.kr/%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%B2%98%EC%9D%8C-docker-%EC%A0%91%ED%95%A0%EB%95%8C-%EC%98%A4%EB%8A%94-%EB%A9%98%EB%B6%95-%EB%AA%87%EA%B0%80%EC%A7%80/)
- [Docker 부터 Kubernetes 까지](https://medium.com/withj-kr/docker-%EB%B6%80%ED%84%B0-kubernetes-%EA%B9%8C%EC%A7%80-5-docker-compose-%EC%9E%85%EB%AC%B8-ece1a6721775)
- [docker-compose 다루기](https://conanglog.tistory.com/72)
- [Overview of Docker Compose](https://docs.docker.com/compose/)
- [Docker-compose란](https://devbirdfeet.tistory.com/121)
- [Docker run vs start](https://blog.voidmainvoid.net/112)
