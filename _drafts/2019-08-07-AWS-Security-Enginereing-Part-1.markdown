---
layout: post
title:  "AWS Security Engineering Session Part 1"
subtitle: "memo"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-07 00:00:00 +0900
categories: [ "aws", "security"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 AWS Security Engineering 중 OOOOO 에 대해 소개해 드리도록 하겠습니다.😺

<!--more-->

## 요약 정리


jq 명령을 통해서 ip-ranges 를 체크할 수 있음 

```bash
curl https://ip-ranges.amazonaws.com/ip-ranges.json | jq -r '.prefixes[] | if .service == "EC2" then . else empt end'
```

{% include advertisements.html %}

## API Gateway 란

API 게이트웨이는 API 서버 앞단에서 모든 API 서버들의 엔드포인트를 단일화하여 묶어주고 API 에 대한 인증과 인가 기능에서부터 메시지에 따라서 여러 서버로 라우팅하는 고급 기능까지 담을 수 있습니다. (조대협 님의 블로그를 빌려왔습니다.)

우리는 이 과정에서 인증, 인가 기능을 구현하도록 하며 추후에 Aggregation 까지 나아가도록 하겠습니다.

{% include advertisements.html %}

## Requirements

이 튜토리얼을 진행하기 위해서는 아래의 사항이 설치되어야 합니다.

- vue/cli 설치
- docker-composer
- docker

## git 서버 구성

URL 링크 추가하기, *지킬에서는 어떻게 설정하지? URL이 변환되는데...*

## 프로젝트 구조 잡기

프로젝트를 구성하기 위해서 디렉터리 구조를 잡는 것이 중요합니다. 필요한 프로젝트 구조를 잡습니다.

- 디렉터리 구조 생성

```bash
mkdir -p /path/to/your/project # 
cd /path/to/your/project 
```

- vue/cli 설치

```bash
npm install -g @vue/cli
```

## Docker Compose 설정 작성

Docker Composer 작성을 통해 우리는 여러 컨테이너에 대한 설정을 한번에 할 수 있으며 하나의 서비스 처럼 컨테이너들을 다룰 수 있습니다.

- docker-compose.yml 파일 작성하기

```bash
touch docker-compose.yml
vim docker-compose.yml
```

```yml
version: '2.0'
services:
  web:
    # 프론트 앱 설정
    build: './front'
    ports: 
      - "3000:3000"
    environment:
      # 환경 변수로 포트 설정을 해준다.
      - PORT=3000
  nginx:
    # nginx 설정
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./front/public:/srv/www/static
      - ./default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - web
```

## Nginx 설정

Nginx 를 통해서 맨 앞단에 80/443 포트로 연결 접속을 받습니다. 그리고 Vue Front App 을 내려주는 작업을 합니다.

- nginx 설정 파일 생성

```
touch default.conf # nginx 
```

- nginx 설정 파일 작성

위에서 docker-compose.yml 파일에서 front 앱의 별칭을 `web` 이라고 지정하였습니다. 이는 호스트 이름 처럼 동작합니다.
따라서, nginx 는 web 이라는 호스트 이름을 인식하여 자동으로 `proxy_pass` 를 합니다.

```conf
server {
  listen 80;
  location / {
    # We try to get static files from nginx first
    # because node is not great at IO operations
    # 80 포트로 / 접속을 하는 경우 web 으로 리다이렉트한다.
    try_files $uri $uri/ @web;
  }
  location @web {
    proxy_pass http://web:3000;
  }  
}
```

## Vue Front 앱 생성

아래의 명령어를 통해 Vue Front 앱을 생성합니다. 아직 프론트 앱을 개발할 타이밍이 아니므로 우선, 생성만 해두겠습니다.

- front 프로젝트 생성

```bash
vue create front
```

## Docker 파일 작성

nginx 는 default.conf 만 복사하므로 Docker 파일이 필요 없습니다. 따라서, Vue Front 앱의 Dockerfile 만 작성하면 됩니다. 상기할 점은 http-server 를 사용하는 점입니다. 

```bash
cd front
touch Dockerfile
```

```conf
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --production

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# Test Expose 
EXPOSE 3000

CMD [ "http-server", "dist" ]
```

## 빌드 및 서비스 하기

이제 모든 준비가 완료 되었습니다. 한번 실행해 볼까요?

```bash
docker-compose up --build
```

`http://localhost/` 에 접속하면 Vue.js 앱이 열리게됩니다. 이제 프론트 앱의 기초작업이 완료되었습니다. 너무 쉽지 않나요?

# 마무리

지금까지 프론트 앱을 Microservice 구현을 위해 컨테이너화를 하고 Nginx, Vue 구성이 제대로 동작하는지 확인하였습니다. 다음 장에는 Backend 를 구성하여 진정한 API Gateway 패턴을 구현해 보도록 하겠습니다. 지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

# 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [MSA 아키텍쳐 구현을 위한 API 게이트웨이의 이해(API GATEWAY)](https://bcho.tistory.com/1005)
- [Medium : deploy microservices to a docker swarm cluster docker](https://towardsdatascience.com/deploy-a-nodejs-microservices-to-a-docker-swarm-cluster-docker-from-zero-to-hero-464fa1369ea0)