---
title: "kubernetes 설치"
escerpt: "kubernetes 설치하기"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-18
last_modified_at: 2021-01-18

comments: true
---

## kubernetes 설치

![kubernetes_cluster_001](/assets/images/kubernetes/kubernetes_cluster_001.png)

~~~
$ sudo apt-get update
$ sudo apt-get install -y apt-transport-https ca-certificates curl
$ sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
$ echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
$ sudo apt-get update
$ sudo apt-get install -y kubelet kubeadm kubectl
$ sudo apt-mark hold kubelet kubeadm kubectl
~~~


##	Master node 세팅

마스터 노드를 실행시키려면 kubeadm init <args> 명령어를 통해 가능하다.

-	<args>에는 여러가지 옵션 값이 들어가며, 여기서 필요한 옵션 값은 아래와 같다.

  -	—-pod-network-cidr : Pod 네트워크를 설정할 때 사용
  -	--apiserver-advertise-address : 특정 마스터 노드의 API Server 주소를 설정할 때 사용
  -	만약 고가용성을 위해 마스터 노드를 다중으로 구성했다면 --control-plane-endpoint 옵션을 사용하여 모든 마스터 노드에 대한 공유 엔드포인트를 설정할 수 있다.

##	Pod 네트워크 설정

-	우선 세팅할 클러스터에서 Pod가 서로 통신할 수 있도록 Pod 네트워크 애드온을 설치 해야 한다. kubeadm을 통해 만들어진 클러스터는 CNI(Container Network Interface) 기반의 애드온이 필요하다. 
기본적으로 kubernetes에서 제공해주는 kubenet이라는 네트워크 플러그인이 있지만, 매우 기본적이고 간단한 기능만 제공하는 네트워크 플러그인이기 때문에 이 자체로는 크로스 노드 네트워킹이나 네트워크 정책과 같은 고급 기능은 구현되어 있지 않다.

- 따라서 kubeadm은 kubernetes가 기본적으로 지원해주는 네트워크 플러그인인 kubenet을 지원하지 않고, CNI 기반 네트워크만 지원한다.

- CNI 기반 Pod 네트워크 애드온 설치에 관련해서 자세한 정보는 링크를 참고한다.(Overlay Network는 크게 3가지 종류가 쓰인다.Flannel, WeaveNet, Calico)

- 여기서는 Flannel이라는 Pod 네트워크 애드온을 설치하여 사용할 것이다.

- Flannel을 사용하려면 kubeadm init 명령어에 --pod-network-cidr=10.244.0.0/16 이라는 인자를 추가해서 실행해야 한다. 10.244.0.0/16 이라는 네트워크는 Flannel에서 기본적으로 권장하는 네트워크 대역이다.

- Pod 네트워크가 호스트 네트워크와 겹치면 문제가 발생할 수 있기 때문에 일부로 호스트 네트워크로 잘 사용하지 않을 것 같은 네트워크 대역을 권장하는 것이다.

- 만일 호스트 네트워크에서 10.244.0.0/16 네트워크를 사용하고 있다면, --pod-network-cidr 인자 값으로 사용하고 있지 않은 다른 네트워크 대역을 넣어야 한다.

- 또한 sysctl net.bridge.bridge-nf-call-iptables=1 명령어를 실행하여 /proc/sys/net/bridge/bridge-nf-call-iptables 의 값을 1로 설정 해야한다.

- 이것은 일부 CNI 플러그인이 작동하기 위한 요구 사항이다. 

- 그리고 만약 방화벽을 사용하고 있다면, 방화벽 규칙이 UDP 8285, 8472 포트의 트래픽을 허용하는지 확인해야 한다.

- Flannel이 udp 백엔드를 사용하여 캡슐화 된 패킷을 보내기 위해서 UDP 8285 포트를,커널이 vxlan 백엔드를 사용하여 캡슐화 된 패킷을 보내기 위해서 UDP 8472 포트를 사용한다.

- kubernetes에서의 Flannel 세팅에 대해서 더 자세히 알고 싶으면 https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#tabs-pod-install-6
위 문서를 참조한다.

##	API Server 주소 설정 

우리는 마스터 노드를 세팅 할 것이기 때문에 이 노드가 Control Plane으로써 동작할 것이라는 것을 kubeadm에게 알려줘야 한다.

- 우선 자신의 네트워크 인터페이스를 확인한다.

- 마스터 노드의 네트워크 인터페이스 IPv4 값을 Control Plane의 API 서버에 대한 주소값으로 설정할 것이다.

~~~
$ sudo kubeadm init --apiserver-advertise-address 192.168.0.10 -- pod-network-cidr=10.244.0.0/16
~~~

![kubernetes_cluster_002](/assets/images/kubernetes/kubernetes_cluster_002.png)

![kubernetes_cluster_003](/assets/images/kubernetes/kubernetes_cluster_003.png)

셋업한 클러스터를 사용하려면 위 부분을 control-plane에서 실행시킨다. 
 
![kubernetes_cluster_004](/assets/images/kubernetes/kubernetes_cluster_004.png) 


-	해당 명령어는 Root 계정이 아닌 다른 사용자 계정에서 kubectl 커맨드 명령어를 사용하여 클러스터를 제어하기 위해 사용하는 명령어이다. 기본적으로 kubernetes에서는 /etc/kubernetes/admin.conf 파일을 가지고 kubernetes 관리자 Role의 인증 및 인가 처리를 하며, 위 명령어는 사용자 계정의 $HOME/.kube/config 디렉터리에 admin.conf 파일을 복사함으로써 사용자 계정이 kubectl을 사용하면서 관리자 Role의 인증 및 인가 처리를 받을 수 있도록 하는 것이다. 여기서 말한 사용자 계정이란, 마스터 노드의 Shell에 접속한 계정이다. 더 깊게 들어가보면 admin.conf는 클러스터에 접근할 수 있는 인증의 역할만을 하고,클러스터의 리소스에 접근하여 제어하기 위한 Role에 대한 권한 허용은 해당 계정(admin.conf)에 rolebinding을 통해서 가능하다.즉, RBAC(Role-based access control) 방식을 통해 인증 및 인가 시스템을사용한다고 보면 된다.

- RBAC는 사용자와 역할을 별개로 생성한 후 서로를 엮어서(binding) 사용자에게 역할에 대한 권한을 부여하는 방식이다.kubeadm은 기본적으로 안전한 클러스터 구성을 위하여 RBAC 사용을 강제한다.RBAC말고도 ABAC(Attribute-based access control)이라는 방식도 있는데, 이 방식은 권한에 대한 내용을 파일로 관리하기 때문에 권한을 변경하려면 직접 마스터 노드에 들어가서 파일을 변경하고 api server를 재시작 해주어야 하기 때문에 번거로워 잘 사용하지 않는다.만약 다른 컴퓨터에서 kubectl을 사용하여 클러스터와 통신하고 싶다면 아래와 같이 admin.conf 파일을 마스터 노드에서 복사해와서 kubectl --kubeconfig 명령어를 통해 가능하다.

~~~
#Ex) scp root@<마스터 노드 IP>:/etc/kubernetes/admin.conf .
$ kubectl --kubeconfig ./admin.conf get nodes
~~~ 

또한 클러스터 외부에서 마스터 노드의 API 서버에 연결하고 싶다면 아래와 같이 kubectl proxy 명령어를 사용할 수 있다.

~~~
#Ex)scp root@<마스터 노드 IP>:/etc/kubernetes/admin.conf .
$ kubectl --kubeconfig ./admin.conf proxy
~~~

이제 브라우저를 통해 http://<마스터 노드의 IP>:8001/api/v1 에 접속해보면 API 서버에 접속했음을 확인할 수 있다.그런데 admin.conf는 관리자 Role을 가지고 있으므로 보안상 외부에 노출하기에는 위험하다. 그래서 일반 사용자를 위한 일부 권한을 허용하는 고유한 자격 증명을 새로 생성하여 제공하는 것이 좋다. 클러스터에 접근하여 리소스를 사용하기 위한 인증 및 인가 처리는 완료했다.

그리고 worker node에서 join명령어 부분을 복붙 후 sudo로 실행시키면된다.

![kubernetes_cluster_005](/assets/images/kubernetes/kubernetes_cluster_005.png) 

우리가 사용할 Pod 네트워크 애드온(Flannel)을 사용하기 위해 아래의 명령어를 통해 Pod 네트워크를 클러스터에 배포한다.

~~~
$kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
~~~

![kubernetes_cluster_006](/assets/images/kubernetes/kubernetes_cluster_006.png) 

![kubernetes_cluster_007](/assets/images/kubernetes/kubernetes_cluster_007.png) 

위처럼 status가 NotReady -> Ready 된다.




---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}