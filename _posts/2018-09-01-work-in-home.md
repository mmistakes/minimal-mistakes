---
title: Work in Home
key: 20180901
tags: work home
---

집에서 일하기 ....

<!--more-->

**참조 링크**
- [continuous_deployment](https://dodo4513.github.io/2017/08/19/continuous_deployment/)
- [jekyll in gitlab](https://gitlab.com/pages/jekyll#getting-started)
- [docker를 이용한 CI 구축 연습하기](http://jojoldu.tistory.com/139)
- [continuous deployment with jenkins and dotnet](https://blog.couchbase.com/continuous-deployment-with-jenkins-and-net/)

1) gitlab docker 설치
2) gitlab에 jekyll 설치
3) composer 구성하기
4) gitlab 백업 구성
5) jenkins 설정

gitlab 기반으로 SVN 서버를 구축하고 Jekins 를 통해서 자동으로 원격 서버에 배포하기

gitlab docker 설치 및 셋업하기

```
sudo docker pull gitlab/gitlab-ce:latest
```

gitlab 실행하기
```
docker run --detach --hostname gitlab.example.com --publish 443:443 --publish 80:80 --publish 22:22 --name gitlab --restart always --volume /srv/gitlab/config:/etc/gitlab --volume /srv/gitlab/logs:/var/log/gitlab --volume /srv/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce:latest

```


---

If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
