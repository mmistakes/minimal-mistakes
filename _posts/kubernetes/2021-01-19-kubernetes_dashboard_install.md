---
title: "kubernetes dashboard install"
escerpt: "dashboard install"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-19
last_modified_at: 2021-01-19

comments: true
---


## 1. 공식 k8s 문서에서 적용한 dashboard 명령어 실행

```markdown
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yaml
```

![kubernetes_dashboard_001](/assets/images/kubernetes/kubernetes_dashboard_001.png)

## 2. proxy 실행

~~~
$ kubectl proxy
Starting to server on 127.0.0.1:8001
~~~

- localhost에서만 웹에 접근가능

## 3. 서비스 계정 생성

~~~
$ cat <<EOF | kubectl apply -f - 
apiVersion: v1 
kind: ServiceAccount 
metadata:
 name: admin-user
 namespace: kubernetes-dashboard 
EOF 

- output - 
serviceaccount/admin-user unchanged
~~~

## 4. ClusterRoleBinding 만들기

~~~
$ cat <<EOF | kubectl apply -f - 
apiVersion: rbac.authorization.k8s.io/v1 
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF

- output - 
clusterrolebinding.rbac.authorization.k8s.io/admin-user unchanged
~~~

## 5. 토큰받기

~~~
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
~~~

![kubernetes_dashboard_002](/assets/images/kubernetes/kubernetes_dashboard_002.png)

## 6. NodePort로 편집(외부에서 접속하기 위해서)
~~~
$ kubectl get service kubernetes-dashboard -n kubernetes-dashboard
$ kubectl edit service kubernetes-dashboard -n kubernetes-dashboard  //nodeport 추가하기 32471port로 추가
$ kubectl get service kubernetes-dashboard -n kubernetes-dashboard
~~~

![kubernetes_dashboard_003](/assets/images/kubernetes/kubernetes_dashboard_003.png)

## 7. 확인

https://192.168.0.10:32471/#/login

![kubernetes_dashboard_004](/assets/images/kubernetes/kubernetes_dashboard_004.png)

## 8. 대시보드 삭제
~~~
$ kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yaml
~~~


## 9. 대시보드 특징
9-1. Daemon Set

![kubernetes_dashboard_005](/assets/images/kubernetes/kubernetes_dashboard_005.png)

 데몬셋 은 모든(또는 일부) 노드가 파드의 사본을 실행함. 노드가 클러스터에 추가되면 파드도 추가.노드가 클러스터에서 제거되면 해당 파드는 가비지(garbage)로 수집. 데몬셋을 삭제하면 데몬셋이 생성한 파드들이 정리.

- 모든 노드에서 클러스터 스토리지 데몬 실행

- 모든 노드에서 로그 수집 데몬 실행

- 모든 노드에서 노드 모니터링 데몬 실행

단순한 케이스에서는, 각 데몬 유형의 처리를 위해서 모든 노드를 커버하는 하나의 데몬셋이 사용. 더 복잡한 구성에서는 단일 유형의 데몬에 여러 데몬셋을 사용할 수 있지만, 각기 다른 하드웨어 유형에 따라 서로 다른 플래그, 메모리, CPU 요구가 달라짐.

9.2. Pod
![kubernetes_dashboard_006](/assets/images/kubernetes/kubernetes_dashboard_006.png)

- 파드(Pod) 는 쿠버네티스에서 생성하고 관리할 수 있는 배포 가능한 가장 작은 컴퓨팅 단위

- 파드는 하나 이상의 컨테이너의 그룹. 이 그룹은 스토리지 및 네트워크를 공유하고, 해당 컨테이너를 구동하는 방식에 대한 명세를 갖음. 파드의 콘텐츠는 항상 함께 배치되고, 함께 스케줄되며, 공유 콘텍스트에서 실행. 파드는 애플리케이션 별 "논리 호스트"를 모델링. 여기에는 상대적으로 밀접하게 결합된 하나 이상의 애플리케이션 컨테이너가 포함. 클라우드가 아닌 콘텍스트에서, 동일한 물리 또는 가상 머신에서 실행되는 애플리케이션은 동일한 논리 호스트에서 실행되는 클라우드 애플리케이션과 비슷

- 애플리케이션 컨테이너와 마찬가지로, 파드에는 파드 시작 중에 실행되는 초기화 컨테이너가 포함될 수 있음. 클러스터가 제공하는 경우, 디버깅을 위해 임시 컨테이너를 삽입할 수도 있음

9.3 서비스

![kubernetes_dashboard_007](/assets/images/kubernetes/kubernetes_dashboard_007.png)

- 집합에서 실행중인 애플리케이션을 네트워크 서비스로 노출하는 추상화 방법

- 쿠버네티스를 사용하면 익숙하지 않은 서비스 디스커버리 메커니즘을 사용하기 위해 애플리케이션을 수정할 필요가 없음. 쿠버네티스는 파드에게 고유한 IP 주소와 파드 집합에 대한 단일 DNS 명을 부여하고, 그것들 간에 로드-밸런스를 수행할 수 있음

9.4. 노드

![kubernetes_dashboard_008](/assets/images/kubernetes/kubernetes_dashboard_008.png)

- 쿠버네티스는 컨테이너를 파드내에 배치하고 노드 에서 실행함으로 워크로드를 구동. 노드는 클러스터에 따라 가상 또는 물리적 머신일 수 있음. 각 노드는 컨트롤 플레인에 의해 관리되며 파드를 실행하는 데 필요한 서비스를 포함

- 일반적으로 클러스터에는 여러 개의 노드가 있으며, 학습 또는 리소스가 제한되는 환경에서는 하나만 있을 수도 있음

- 노드의 컴포넌트에는 kubelet, 컨테이너 런타임 그리고 kube-proxy가 포함.


---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}