---
published: true
layout: single
title: "Kubernetes 정리"
category: kubernetes
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### root 계정 아닌 곳에서 아래 Error 발생할 경우
* * *
The connection to the server localhost:8080 was refused - did you specify the right host or port?

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#### PORT Open
sudo iptables -I INPUT 1 -p tcp --dport 8080 -j ACCEPT
sudo iptables -I OUTPUT 1 -p tcp --dport 8080 -j ACCEPT


#### 그래도 안될 때
- kubectl config view 를 입력 후, contexts에 null이 표시되는지 확인
- null로 표시 된다면 context 셋팅 해줘야 한다.
- kubectl config get-contexts 입력
- 출력 결과에서 NAME 가져와서, kubectl config use-context [NAME] 입력
- bash 입력
- kubectl config view 입력해서 context 설정됐느지 확인
- 이후 kubectl get nodes 정상 동작 확인


#### token list
- token은 24시간 뒤에 만료 된다.
- kubeadm token list
- openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'

#### Error 확인하는 법
- journalctl -xeu kubelet 입력해서 로그 확인

#### core dns 업그레이드
- kubeadm upgrade apply v1.11.0 --feature-gates=CoreDNS=true


#### kubernetes 완전 삭제
kubeadm reset
sudo apt-get purge kubeadm kubectl kubelet kubernetes-cni kube*   
sudo apt-get autoremove  
sudo rm -rf ~/.kube


 #### Config not found: /etc/kubernetes/admin.conf Error 발생
 - kubeadm init

#### CNI failed to retrieve network namespace path
kubeadm reset
systemctl stop kubelet
systemctl stop docker
rm -rf /var/lib/cni/
rm -rf /var/lib/kubelet/*
rm -rf /etc/cni/
ifconfig cni0 down
ifconfig flannel.1 down
ifconfig docker0 down
ip link delete cni0
ip link delete flannel.1

hostname 바꿔서 진행??

####
- kubeadm은 시스템 상태를 검증하면서 2 CPU의 최소 요구사항이 있는지를 검사하게 되는데, 가능한 CPU수가 1개라서 이부분을 init시 오류제외를 시켜줘야함
- kubeadm init --ignore-preflight-errors=NumCPU

- networkPlugin cni failed on the status hook for pod

#### 
- sudo kubeadm init --pod-network-cidr=10.244.0.0/16
- https://beer1.tistory.com/5


#### master node not ready
- kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

#### Docker 설치
- apt-get remove docker docker-engine docker.io containerd runc
- apt-get update
- apt-get -y install apt-transport-https ca-certificates curl gnupg lsb-release
- curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
- echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
- apt-get update
- apt-get install docker-ce docker-ce-cli containerd.io
- docker --version

#### docker-ce?? 문제 발생시
- https://forums.docker.com/t/subprocess-installed-post-installation-script-returned-error-exit-status-1/37444/3

#### 컨테이너드로 CRI 런타임 구성
- https://wookiist.dev/142


swapoff -a


https://it-hangil.tistory.com/59
- 여기 은근 도움됨

#### Virtual Box
- sudo apt install virtualbox 설치
- VBoxManage list runningvms 구동 중인 vm 조회
- VBoxManage modifyvm CENTOS7_VM --cpus 2 --memory 1024 --vram 16

- VBoxManage createvm --name master-node --register
- VBoxManage createhd --filename master-disk --size 4000 --variant Fixed
- VBoxManage storagectl master-node --name "IDE Controller" --add ide --controller PIIX4
- VBoxManage storageattach master-node --storagectl "IDE Controller" --port 0 --device 0 --type hdd --medium master-disk