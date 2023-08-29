---
title: "kubernetes 설치전 점검 환경"
escerpt: "kubernetes 설치전에 점검환경 사항"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-15
last_modified_at: 2021-01-15

comments: true
---

## Architecture
![check_before_001](/assets/images/kubernetes/check_before_001.png)

- 컴퓨터 당 2GB 이상의 RAM (이보다 적으면 앱을 위한 공간이 없음)

- CPU 2개 이상

- 클러스터의 모든 시스템 간 완벽한 네트워크 연결

- 모든 노드에 대한 고유한 호스트 이름, 고유한 MAC 주소, 고유한 product_uuid

    - MAC 주소 확인방법
```
# method1
ifconfig –a  

# method2
ip link    
``` 
    - Product_uuid 확인방법

```markdown
$ sudo cat /sys/class/dmi/id/product_uuid
```

-	스왑 메모리 비활성화

    - Pod를 할당하고 제어하는 kubelet은 스왑 상황을 처리하도록 설계되지 않았음.

    - 이유는 kubernetes에서 가장 기본이 되는 Pod의 컨셉 자체가 필요한 리소스 만큼만 호스트 자원에서 할당 받아 사용한다는 구조이기 때문이다.

    - 따라서 kubernetes 개발팀은 메모리 스왑을 고려하지 않고 설계했기 때문에 클러스터 노드로 사용할 서버 머신들은 모두 스왑 메모리를 비활성화 해줘야 한다.

    - 스왑 메모리를 비활성화 하기 위해 아래 명령어를 사용한다.

```
$ swapoff -a 
$ sed -i '2s/^/#/' /etc/fstab
```


##	각 노드별 포트중첩제거

#### 1. Master node에서 필요한 필수포트

- 6443 포트 : Kubernetes API Server / Used By All

- 2379~2380 포트 : etcd server client API / Used By kube-apiserver, etcd

- 10250 포트 : Kubelet API / Used By Self, Control plane

- 10251 포트 : kube-scheduler / Used By Self

- 10252 포트 : kube-controller-manager / Used By Self

#### 2. Worker node에서 필요한 필수포트

- 10250 포트 : Kubelet API / Used By Self, Control plane

- 30000~32767 포트 : NodePort Services / Used By All

> Kubernetes v1.6.0 부터는 기본적으로 CRI(Container Runtime Interface)를 사용하도록 해서 상관없지만 그 하위 버전에서는 컨테이너 런타임이 설치되어 있어야 한다.(CRI-O, Containerd, Docker 등)

> Kubernetes v1.14.0 부터 kuberadm은 잘 알려진 도메인 소켓 목록을 스캔하여 Linux 노드에서 컨테이너 런타임을 자동으로 감지하려고 시도한다. 사용 가능하고 감지가 가능한 컨테이너 런타임 및 소켓 경로는 아래와 같다.

~~~
+-----------------+-----------------------------------+ 
| 컨테이너 런타임 | 소켓 경로 | 
+-----------------+-----------------------------------+ 
| Docker | /var/run/docker.sock | 
| Containerd | /run/containerd/containerd.sock | 
| CRI-O | /var/run/crio/crio.sock | 
+-----------------+-----------------------------------+
~~~

- Docker와 Containerd가 모두 감지되면 Docker가 우선한다.

- 이외에 다른 2개 이상의 컨테이너 런타임이 감지되면 kuberadm은 적절한 오류 메시지를 출력하고 종료된다.


---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}