---
layout: post
title:  "Git 서버 구성"
subtitle: "Ubuntu 에서 깃 서버 구성"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-07-31 00:00:00 +0900
categories: [ "git", "ubuntu", "server"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 ubuntu 환경에서 Git 서버 구성 방법을 알아보도록 하겠습니다. 😺

<!--more-->

# 개요

SSH 를 통해서 깃 서버에 접속하도록 구성하며, SSH Public Key 를 통해서 클라이언트가 접속하도록 구성합니다.

{% include advertisements.html %}

- SSH 접속을 통한 깃 서버를 설정

```bash
# Server
$ sudo adduser git
$ su git
$ cd
$ mkdir .ssh && chmod 700 .ssh
$ touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
```

{% include advertisements.html %}

- SSH 키 생성 및 서버 복사

```bash
# Client
$ ssh-keygen -t rsa -b 4096 -C "gbkim1988@gmail.com"
$ scp ~/.ssh/id_rsa.pub git@192.168.x.xxx:/home/git/.ssh/id_rsa.gbkim.pub
# Server
$ cat ./.ssh/id_rsa.gbkim.pub >> ~/.ssh/authorized_keys
```

{% include advertisements.html %}

- git-shell 을 git 의 기본 쉘로 변경

```bash
# Server, 깃 계정에 git-shell 을 부여
$ sudo chsh git -s $(which git-shell)
```

- ssh 연결 테스트 (연결이 거부됨)

```bash
# Client, git 계정으로 로그인 시도
$ ssh git@192.168.x.xxx
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-133-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

17 packages can be updated.
10 updates are security updates.

New release '18.04.2 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


*** System restart required ***
fatal: Interactive git shell is not enabled.
hint: ~/git-shell-commands should exist and have read and execute access.
Connection to 192.168.x.xxx closed.
```

- Repo 생성 및 git 에 권한 할당

```bash
# Server, Git Repo 생성하기
$ cd /srv/git
$ mkdir project.git
$ cd project.git
$ git init --bare
Initialized empty Git repository in /srv/git/project.git/
chown -R git:git /srv/git/
```

- 배포 내용 작성 및 배포

```bash
# Client
$ cd /path/to/project/
$ git init
$ git add .
$ git commit -m "test"
$ git push origin master
# * [new branch]      master -> master
```

{% include advertisements.html %}

## Sourcetree 사용하기

Sourcetree 를 이용해 클라이언트에 생성한 프로젝트 폴더에 접근합니다. 

![테마-1](/assets/img/2019/07/Sourcetree_git_ssh.png)]

# 마무리

지금까지 깃(git) 서버를 구성하고 깃 프로젝트를 생성하는 과정까지 확인하였습니다. 소규모에서 프로젝트를 관리하는 경우 매우 간단하고 유용하게 사용할 수 있습니다. 지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

# 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [git-scm : Git On the Server](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)
