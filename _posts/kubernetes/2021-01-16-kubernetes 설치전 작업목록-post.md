---
title: "kubernetes 설치전 작업목록"
escerpt: "kubernetes 설치전에 작업목록 체크사항"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-16
last_modified_at: 2021-01-16

comments: true
---

## kubernetes 설치전 OS 필수설치 목록

클러스터의 모든 시스템 간에 완벽한 네트워크 연결. 즉, 마스터 노드와 워커 노드는 네트워크를 통해 통신이 가능해야 한다.

## user 추가, 권한추가, ip update

1.	os설치 후 root paaswd 추가

```
$ passwd
```

2. user추가 

```
$ sudo adduser xxx
```

3. 해당 user의 권한 추가

~~~
$ sudo chmod 777 /etc/sudoers #해당 파일 변경권한주기
$ Vim /etc/sudoers   # 해당 user 권한 추가
$ sudo chmod 440 /etc/sudoers  # 해당 파일 변경권한 닫기
~~~

4.	hostname변경
~~~
## 각 node마다 (master, node01, node02) hostname변경필요하다
$hostnamectl set-hostname master
$hostnamectl set-hostname node01
$hostnamectl set-hostname node02
~~~

5. 각 node끼리 연결가능하도록 host ip update


![check_before_002](/assets/images/kubernetes/check_before_002.png)
~~~
$ vi /etc/hosts
~~~

##	스왑 메모리 비활성화

/etc/fstab 파일내부에서 스왑메모리에 대한 줄만 주석처리할것!

![check_before_003](/assets/images/kubernetes/check_before_003.png)
~~~
$ swapoff –a
~~~



##	NTP(Network Time Protocol)설정

클러스터는 보통 여러 개의 VM이나 서버로 구성되기 때문에 클러스터 내의 모든 노드들은 NTP를 통해서 시간동기화가 되어야한다. 

~~~
$ sudo apt install ntp
$ sudo service ntp restart
$ sudo ntpq -p
~~~

##	컨테이너 런타임 설치(Docker)

>참조 사이트 : https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker

```markdown
# apt가 HTTPS로 리포지터리를 사용하는 것을 허용하기 위한 패키지 설치
$ sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg2

# 도커 공식 GPG 키 추가:
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key --keyring /etc/apt/trusted.gpg.d/docker.gpg add -

# 도커 apt 리포지터리 추가:
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 도커 CE 설치
$ sudo apt-get update && sudo apt-get install -y containerd.io=1.2.13-2 docker-ce=5:19.03.11~3-0~ubuntu-$(lsb_release -cs) docker-ce-cli=5:19.03.11~3-0~ubuntu-$(lsb_release -cs)

## /etc/docker 생성
$ sudo mkdir /etc/docker

# 도커 데몬 설정
$ cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

# /etc/systemd/system/docker.service.d 생성
$ sudo mkdir -p /etc/systemd/system/docker.service.d

# 도커 재시작 & 부팅시 실행 설정 (systemd)
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
$ sudo systemctl enable docker
```


---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}