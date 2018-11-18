---
title: Celery, Django, Docker 를 결합하기
key: 20181118
tags: django docker celery wmi
excerpt: "프로젝트 shred 의 일부로서 도커를 통해 Celery, Django 등을 결합한다."
toc: true
toc_sticky: true
---

# Celery, Django, Docker 를 결합하기

이번 토픽에서는 Celery, Django, Docker 를 결합하여 하나의 어플리케이션을 만들고 이를 Public Repository 에 저장하는 과정을 다루겠다. 아마도 내용이 방대하여 조금 줄여야 할지도 모르겠다. 하지만, 중요한 것은 Ubuntu 에서 사용이 가능해진 환경이다. 우리는 이러한 환경을 통해서 OS 종속성을 어느 정도 탈피할 수 있다.

## 0. Summary

이 토픽에서는 Shred 프로젝트를 좀 더 강화해 보겠다. 우선, Redis 를 사용해야 하므로 Redis 를 구동한다. 그리고 Docker 컴파일 시에 Shred 프로젝트를 구동하기 위해서 Ubuntu 16.04 환경의 Docker 파일을 만들 것이다. 그러나 wmi 모듈을 빌드해야 하므로 이 환경을 빌드한 Dockerfile 을 만든다. 더불어 필요한 Dockerfile 들을 생성한다. 마지막으로 Celery 를 고도화 하기 위한 스터디를 진행한다.

Celery 를 고도화하는 방법이란, 다음의 요구사항을 만족시켜야 한다.

- Celery 프로젝트를 초기화 할 떄 yml 설정을 확인하여 동적으로 작업을 예약 후 구동한다.
- Django 인터페이스를 통해서 Celery Task 를 제어해야 한다.
- 다중 쿼리를 실행 시키되 분할하여 실행 시키고 이를 결합하는 구현이 가능한지 확인한다.
  - canvas 를 통해서 가능할 것으로 생각된다. (Celery 의 Workflow 기능)
- python flower 모듈을 분석하여 더 나은 인터페이스를 제공할 방법을 모색한다.

Dockerfile 을 통해서 Docker 기반 서비스를 구동한다. 아래의 요구사항을 만족시킨다. 

- redis 서비스
- shred 를 구동하기 위한 ubuntu 환경 구성
  - 그리고 새로운 이미지 파일 만들어 공유하기
    - 새로운 이미지 파일은 awesome-pakcages 에 따로 언급하기

## 1. Docker 파일 만들기

wmic 명령어를 사용가능하게 하는 ubuntu 환경을 우선 만들어서 commit 해보자. 이 과정은 차주에 진행하는 docker 강의 2주차에 반영할 예정이다.

### 1.1. Docker - Ubuntu 이미지 받기

Ubuntu 베이스 이미지를 다운받는다. 그리고 이를 바탕으로 새로운 이미지를 만든다.

```bash
# Powershell in Windows 10
$> docker pull ubuntu:16.04
```

### 1.2. Docker - Ubuntu 이미지 실행하기

다운받은 이미지는 `docker run -ti ${image name}` 을 통해 실행 할 수 있다. 

```bash

$> docker run -ti ubuntu:16.04
(new ubuntu bash shell) ... > ls -al 
```

### 1.3. Docker - Build Dockerfile

shred 프로젝트를 구동하기 위해서는 별도의 이미지를 만들어야 한다. 그 이유는 다음과 같다.  

- wmi-1.3.14 빌드
- shred 프로젝트 옮기기
  - docker-compose 를 통해서 옮길 수도 있다.  
    개발 연속성을 위해 docker-compose 를 통해서 프로젝트 파일을 옮기는 것은 어떠한가?  
    django 앱 개발 시 docker 를 이용하는 사례를 알아보면 도움이 될 것이다.  (조사 필요)  
    [Django, Docker, AWS(ECS) 참조 링크](https://medium.com/@rohitkhatana/deploying-django-app-on-aws-ecs-using-docker-gunicorn-nginx-c90834f76e21)  
    github 에 push 시 docker 를 이미지를 테스트하는 경우가 있는가? (조사 필요)  
    [Heroku](https://devcenter.heroku.com/articles/github-integration)

아래는 빌드에 성공한 Dockerfile 이다. Dockerfile 을 다운받기 위해서는 아래의 링크를 참조한다.

```bash
FROM ubuntu:16.04
MAINTAINER code-machina <gbkim1988@gmail.com>

# 업데이트 필수
RUN apt-get update
# 필수 패키지 설치
RUN apt-get install -y -qq gcc g++ make python3=3.5.1* autoconf wget build-essential p7zip-full python3-pip python python-pip sudo
# 디렉터리 생성
RUN mkdir /data /data/tool /app /app/shred
# 디렉터리 이동
WORKDIR /data/tool 
# wmi-1.3.15-patched.7z 다운로드
RUN wget https://github.com/code-machina/awesome-packages/raw/master/openvas-wmi/wmi-1.3.14-patched.7z
# 7z 압축 파일 해제
RUN 7z x ./wmi-1.3.14-patched.7z 
# 디렉터리 이동
WORKDIR /data/tool/wmi-1.3.14
# 빌드하기
RUN chmod -R +x ./
RUN sudo make "CPP=gcc -E -ffreestanding"
# 실행 파일 복사
RUN sudo cp Samba/source/bin/wmic /usr/local/bin/
# python3 모듈 설치
RUN pip3 install wmi-client-wrapper

COPY mango /app/shred
COPY requirements-181116.txt /app/shred
WORKDIR /app/shred/
RUN pip3 install -r ./requirements-181116.txt

EXPOSE 80
EXPOSE 443
```

## 2. Celery 고도화 하기

### 2.1. Celery 테스트 1

Celery 를 구성하고 yaml 파일에 등록된 호스트마다 Task 를 부여하여 동작하도록 구성한다. Metric 수집 대상인 호스트가 변경될 일은 빈도가 작음을 유념한다. 

- 방안 1. django 프로젝트의 `setting.py` 에 작업을 동적으로 생성하는 방향을 생각한다.
- 방안 2. celery 문서를 정독한다. 그리고 활용할 방안을 모색한다.

2018.11.18 - 그리고 나는 맥도날드에서 버거를 사먹는다. ㅋㅋㅋㅋ


<!-- Image link references -->

<!-- -->

<!-- External link references -->

[1]: https://blog.nacyot.com/articles/2014-01-27-easy-deploy-with-docker/ "Docker Deploy"


---

<!-- End Of Documents -->
If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
