---
title: "devsatck install in multi node"
escerpt: "multi node에 devstack install"

categories:
  - Openstack
tags:
  - [Openstack,devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2020-06-29 13:12
last_modified_at: 2020-06-29 13:12

comments: true

---


# conceptual architecture openstack
![openstack017](/assets/images/017.png)

# 구성도
##  Contoller Node / Compute Node 하드웨어 구성도

![controller node](/assets/images/controller node.png)

## Controller Node / Compute Node 서비스

![controller node service](/assets/images/controller_compute node service.png) 

## Installation Type

![installation type](/assets/images/installation type.png) 

Contoller Node가 작업에 대한 요청을 받았을때 직접 Controller Node에서 작업을 수행할 수도 있지만 
직접 Controller Node에서 작업을 수행할 수도 있다.Controller Node가 작업에 대한 요청을 받았을 때 
Controller Node가 작업을 수행하도록 Controller Node에게 명령어를 보내서 수행하도록 한다.
		
## OpenStack 네트워크 구성도
  
![openstack_network_architecture](/assets/images/openstack_network_architecture.png) 


# 설치과정
## Controller Node와 Compute Node 공통 설정
### Network Setting

![network setting](/assets/images/network setting.png) 


### Controller Node에서 네트워크 설정
  
![controller node_network](/assets/images/controller node_network.png) 

### Compute Node에서 네트워크 설정
#### Stack 계정 생성

![create_stack_user](/assets/images/create_stack_user.png) 

#### stack 계정생성후 passwd 만들기 
```
# passwd stack
```

    	- 확인 
```
# cat /etc/passwd | grep stack
stack:x:1001:1001::/opt/stack:/bin/bash
```
Root 계정으로 암호 필요없이 Stack 계정 권한 가져오게 하기


# 하둡설치전, 기본환경구성
### 모든 서버에 hadoop 유저그룹과 hduser 유서 생성

```
$ sudo addgroup hadoop 
$ sudo adduser -ingroup hadoop hduser
```

### sudoers file에 hduser추가


```
$ sudo visudo
$ hduser ALL=(ALL:ALL) ALL 추가하기
```
       
### hduser로 로그인


```
$ su - hduser
```
(아래 모든실행은 hduser로 이제 접근해서 시작하는것이다.)


### ssh 설정
	- hadoop은 분산처리시에 서버들간에 ssh 통신을 자동적으로 수행하게 됩니다.
	- 이를 위해서 암호입력 없이 접속이 가능하도록 ubuntu0 서버에서 공개키를 생성하고 생성된 키를 각 서버들에 배포해줍니다.
	- ssh 설정 변경
```
$ sudo vi /etc/ssh/sshd_config 
     ---------------------------------------------------------------------------------- 
     PubkeyAuthentication yes 
     AuthorizedKeysFile      .ssh/authorized_keys 
         - ex) 아래와 같이 주석처리삭제해주면 된다. 
```
![ssh change](/assets/images/ssh change.png) 

     
### 공개키를 생성
```
$ mkdir ~/.ssh 
$ chmod 700 ~/.ssh 
$ ssh-keygen -t rsa -P "" 
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```
### 공개키를 각 서버에 배포
```
$ ssh-copy-id -i ~/.ssh/id_rsa.pub ubuntu1    //ex) ssh-copy-id -i ~/.ssh/id_rsa.pub hduser@192.168.0.132 
$ ssh-copy-id -i ~/.ssh/id_rsa.pub ubuntu2 
$ ssh-copy-id -i ~/.ssh/id_rsa.pub ubuntu3
```
     
### 접속 테스트
```
$ ssh ubuntu1 //ex) ssh hduser@192.168.0.132
```
     
### 특이사항
compute1에서는 password 없이 접속가능하지만 compute2에서는 public key를 등록안했기 때문에 password가 필요하다.
![password_confirm](/assets/images/password_confirm.png) 

	- 확인 
```
# cat /etc/sudoers 
  stack ALL=(ALL) NOPASSWD: ALL
```

### Access를 위해 ssh 키를 이용하려 각 노드에서 stack 사용자 설정
```
# su - stack
```



## DevStack Release 별 설치 파일 다운로드
Release를 지정하지 않으면 최신버전 다운, 현재는 개발중인 Stein 다운됨
git clone https://git.openstack.org/openstack-dev/devstack -b stable/queens 이걸사용하자
![openstack-001](/assets/images/001.png) 

### Controller Node
#### DevStack이 정상적으로 설치됐는지 확인

![openstack-002](/assets/images/002.png) 
![openstack-003](/assets/images/003.png) 


```
$cd samples 
$cp local.conf ../

```

#### Local.conf파일 수정

![openstack-004](/assets/images/004.png) 

#### ./Stack.sh 쉘스크립트 실행
![openstack-005](/assets/images/005.png) 

### Compute Node
#### Local.conf 파일
![openstack-006](/assets/images/006.png) 
#### ./stack.sh 쉘 스크립트 실행
![openstack-007](/assets/images/007.png) 

### 설치완료 및 DashBoard 접속
#### 설치완료 후 Controller Node 화면
![openstack-008](/assets/images/008.png) 

#### 설치완료 후 Compute Node 화면
![openstack-009](/assets/images/009.png) 
 만약 설치종료 후 위화면처럼 안나온다면 에러가 있는것
	- oslo_config.cfg.defaultvalueerror error processing default value 
		1.  -> hostname 에서 "_" 을 빼자
		2. compute_node1 -> computeNode1로 변경해서 해결함
	- 공개키 만들어서 각노드에 저장시킴
	- /etc/hosts , /etc/hostname 에서 이름변경 및 해당node ip 설정해줌.
	- 그후 
```
1. lose your old terminal and open a new one  
# ./unstack.sh  
# ./clean.sh  
# export no_proxy=127.0.0.1,192.168.5.43,localhost,.localdomain  
# ./stack.sh
```
###  설치확인
ip : 192.168.109.120
id / pw : admin / password
![openstack-010](/assets/images/010.png)
대시보드에서 admin 계정으로 접속하여 우측 상단의 계정명을 클릭하여 [OpenStack RC File v3]를 다운
다운받은 파일을 OpenStack이 설치된 Ubuntu 가상머신 안으로 이동
![openstack-011](/assets/images/011.png)

#### Source admin-openrc.sh 명령어로 옮긴 스크립트 파일을 적용
![openstack-012](/assets/images/012.png)
#### Controller Node와 Compute Node가 모두 설치되면 Controller Node에서 Compute Node가 잘 설치되었는지 확인
![openstack-013](/assets/images/013.png)

#### 설치된 서비스 확인
![openstack-014](/assets/images/014.png)

#### Image의 ID확인
![openstack-015](/assets/images/015.png)

#### flavor의 ID확인
![openstack-016](/assets/images/016.png)
Contoller Node에서 대시보드로 접근하여 인스턴스가 제대로 생성 된다면 잘 설치된 것이다.