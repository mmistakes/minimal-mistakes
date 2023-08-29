---
title: "kubernetes prometheus install"
escerpt: "prometheus install"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-21
last_modified_at: 2021-01-21

comments: true
---



## Prometheus

![prometheus_011](/assets/images/kubernetes/prometheus/prometheus_011.png)

Prometheus는 시계열 데이터베이스를 기반으로 구축된 오픈 소스 서비스 모니터링 시스템으로, 쿼리, 그래프 및 기본 제공 경고를 지원하는 것 외에도 데이터를 수신하고 저장할 수 있다. HTTP를 통해 지표를 요청하기 위해 대상 엔드포인트에 연결하는 Prometheus는 고유한 시계열의 일부로 식별하는 이름 및/또는 태그로 지표를 정의할 수 있는 다차원 데이터 모델을 제공한다. 오픈 소스 Prometheus 메트릭의 기본 보존 기간은 15일이며, 더 길게 보관하고 싶다면 명령줄에 희망하는 기간을 지정해주거나, 원격 DB에 저장해야 한다. 그런 다음 Prometheus 쿼리 언어(PromQL)를 사용하여 메트릭을 탐색하고 간단한 그래프를 그릴 수 있다.


## Prometheus Installation
1. install

~~~
$ helm install monitor stable/prometheus
~~~

![prometheus_001](/assets/images/kubernetes/prometheus/prometheus_001.png)


2. pod상태 확인

~~~
$ kubectl get pod
~~~

![prometheus_002](/assets/images/kubernetes/prometheus/prometheus_002.png)

- 몇 개의 pod가 Pending상태이다. 이유는 k8s클러스터에 StorageClass가 정의되어있지 않기 때문이다.(pvc의 요청을 받아줄 provisioner가 없기 때문) 그래서 일단 pv옵션을 false로 변경해주어 EmptyDir을 사용하게 해야 한다. 

- Helm chart의 설정을 변경하는 방법은 아래와 같다.

  - using yaml
    문제가 되는 chart를 먼저 확인해보자.
~~~
$ helm inspect values stable/prometheus
~~~
 
![prometheus_003](/assets/images/kubernetes/prometheus/prometheus_003.png)



  - persistentVolume.enabled가 True다. 이렇게 표기되어있는 부분이 총 세군데가 있다. 수정할 부분만 따로 파일을 만들어주어서 업데이트하면 된다.
~~~
$ vim volumeF.yaml
~~~

![prometheus_004](/assets/images/kubernetes/prometheus/prometheus_004.png)

~~~
$ helm upgrade -f prometheus_volumeF.yaml monitor stable/Prometheus
~~~

  - 업그레이드 하면 pending이었던 pod들이 running 상태로 변한다.
 
![prometheus_005](/assets/images/kubernetes/prometheus/prometheus_005.png)


  - 확인

~~~
$ kubectl get svc
~~~
  pod들이 정상적으로 running되었음을 확인할수 있다.
  
  ![prometheus_006](/assets/images/kubernetes/prometheus/prometheus_006.png)

3. Prometheus web 접속
 
prometheus-server를 clusterIP에서 NodePort로 변경해주자.

~~~
$ kubectl edit svc monitor-prometheus-server
~~~
 
![prometheus_007](/assets/images/kubernetes/prometheus/prometheus_007.png)

  - error 발생시 해결방법
  
![prometheus_008](/assets/images/kubernetes/prometheus/prometheus_008.png)

~~~
$ kubectl get svc monitor-prometheus-server -o yaml > monitor-prometheus-server.yaml
~~~
여기서 수정후

~~~
$ kubectl apply –f monitor-prometheus-server.yaml
$ kubectl get svc 
~~~
  
확인해보면 nodeport로 바뀐걸 알수있다.

![prometheus_009](/assets/images/kubernetes/prometheus/prometheus_009.png)
 

192.168.0.10:31557로 접근하면 Prometheus 설치완료된걸 볼수있다.

![prometheus_010](/assets/images/kubernetes/prometheus/prometheus_010.png)

 
4. Prometheus 삭제

삭제할때는 간단하게 설치할때 사용했던 이름만 사용하면 된다.

~~~
$ helm uninstall {이름}
~~~

---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}