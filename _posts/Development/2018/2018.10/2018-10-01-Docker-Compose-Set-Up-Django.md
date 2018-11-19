---
title: Docker Compose to set up Django app
key: 20181001
tags: docker django
excerpt: "Docker 를 이용한 Django 앱 관리"
---

# Summaries

Django 개발 환경 구축 시 Docker 를 이용하는 방법을 다룬다.

<!--More-->

# Docker 의 세상

## Dockerfile 이란?

Docker 이미지의 설정 정보를 담고 있는 파일이다.

Dockerfile 의 구성을 보면 아래와 같은 명령어를 볼 수 있다.
각 명령어의 의미를 작성해 둔다.

- FROM : 베이스 이미지
- RUN : 실행 커맨드 라인
- ENV : 설정할 환경변수
- CMD : 데몬으로 실행할 명령어
- VOLUME : 호스트와 컨테이너의 디렉터리 공유
- COPY : 호스트에서 가져올 디렉터리 또는 파일
- EXPOSE : 노출할 포트 설정

## elk 이미지 설치하기

Docker hub 에서 elk 이미지를 찾아 설치한다.

### pull image from docker registry

아래의 명령어를 통해 이미지를 공용 registry 에서 불러온다.
(물론, 사설 registry 구성 또한 가능하다.)

```
sudo docker pull sebp/elk
```

### run a container from the image

불러온 이미지로부터 컨테이너를 실행 시킨다.

```
sudo docker run -p 5601:5601 -p 9200:9200 -p 5044:5044 -it --name elk sebp/elk
```

위의 명령어에서 같은 옵션(`-p`)을 여러개 바인딩하는 것을 볼 수 있다.
이는 포트를 의미하며 container 내부 포트와 host 의 포트를 맵핑하는 것으로 보인다.

- 5601 (kibana 웹 인터페이스)
- 9200 (Elasticsearch JSON 인터페이스)
- 5044 (Logstash Beat 인터페이스)

> 참고
ElasticSearch 의 Java Client API 로 사용되는 전송 인터페이스(transport interface) 는 `9300` 포트를 사용한다.

### docker process check

```
$ sudo docker ps
```

```
sudo docker exec -it <container-name>
```

### docker container check



# 참조
- [Docker Compose Django Quick Tutorial][1]
- [Docker 란? - nobemberde 개발자 블로그][2]
- [elk docker readthedocs][3]
  - 상세한 구성 가이드를 담고 있어 참조하기 좋다.
- [ElasticSearch JAVA API][4]

<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
-->
[1]: https://docs.docker.com/compose/django/ "compose django"
[2]: https://novemberde.github.io/2017/04/02/Docker_7.html ""
<!-- Images Reference Links -->
[3]: https://elk-docker.readthedocs.io/ "elk docker readthedocs"
[4]: https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/index.html "ElasticSearch Java client API"

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
