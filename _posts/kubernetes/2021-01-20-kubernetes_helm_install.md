---
title: "kubernetes helm install"
escerpt: "helm install"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-20
last_modified_at: 2021-01-20

comments: true
---

## Helm
Helm은 쿠버네티스의 package managing tool이다. 크게 세가지 컨셉을 가지고 있다

-	Chart : Helm package. app을 실행시키기위한 모든 리소스가 정의되어있다
  - Ex) Apt dpkg, Yum RPM파일과 비슷

-	Repository : chart들이 공유되는 공간. 
  - Ex) docker hub

-	Release : 쿠버네티스 클러스터에서 돌아가는 app들은(chart instance) 모두 고유의 release 버전을 가지고 있다

정리) helm은 chart를 쿠버네티스에 설치하고, 설치할때마다 release버전이 생성되며, 새로운 chart를 찾을때에는 Helm chart repository에서 찾을 수 있다.


## Helm Installation

1. kubectl을 사용할 수 있는 노드로 이동하여 설치.

~~~
$ curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
~~~

2. version check

~~~
$ helm version    
~~~

![helm_001](/assets/images/kubernetes/helm/helm_001.png)

3. Helm chart repository 추가

~~~
$ helm repo add stable https://charts.helm.sh/stable
~~~

![helm_002](/assets/images/kubernetes/helm/helm_002.png)

4. Chart list 출력

~~~
$ helm search repo stable
~~~

![helm_003](/assets/images/kubernetes/helm/helm_003.png)

5. Chart update

~~~
$ helm repo update
~~~

![helm_004](/assets/images/kubernetes/helm/helm_004.png)

---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}