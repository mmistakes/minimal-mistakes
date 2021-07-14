---

title: "kubernetes prometheus install"
description: "prometheus install"
comments: true
date: 2021-01-21 17:12
categories: kubernetes
tags: kubernetes,devops
---
# Prometheus

Helm은 쿠버네티스의 package managing tool이다.
크게 세가지 컨셉을 가지고 있다
-	Chart : Helm package. app을 실행시키기위한 모든 리소스가 정의되어있다
  - Ex) Apt dpkg, Yum RPM파일과 비슷
-	Repository : chart들이 공유되는 공간. 
  - Ex) docker hub
-	Release : 쿠버네티스 클러스터에서 돌아가는 app들은(chart instance) 모두 고유의 release 버전을 가지고 있다

- 정리) helm은 chart를 쿠버네티스에 설치하고, 설치할때마다 release버전이 생성되며, 새로운 chart를 찾을때에는 Helm chart repository에서 찾을 수 있다.


# Prometheus Installation
### install
~~~
$ helm install monitor stable/prometheus
~~~

![prometheus_001](/assets/images/kubernetes/prometheus/prometheus_001.png)


### pod상태 확인
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



    persistentVolume.enabled가 True다. 이렇게 표기되어있는 부분이 총 세군데가 있다. 수정할 부분만 따로 파일을 만들어주어서 업데이트하면 된다.
    ~~~
    $ vim volumeF.yaml
    ~~~

    ![prometheus_004](/assets/images/kubernetes/prometheus/prometheus_004.png)
 
    ~~~
    $ helm upgrade -f prometheus_volumeF.yaml monitor stable/Prometheus
    ~~~

    업그레이드 하면 pending이었던 pod들이 running 상태로 변한다.
 
    ![prometheus_005](/assets/images/kubernetes/prometheus/prometheus_005.png)


  - 확인

  ~~~
  $ kubectl get svc
  ~~~
  pod들이 정상적으로 running되었음을 확인할수 있다.
  
  ![prometheus_006](/assets/images/kubernetes/prometheus/prometheus_006.png)

### Prometheus web 접속
 
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

 
### Prometheus 삭제
삭제할때는 간단하게 설치할때 사용했던 이름만 사용하면 된다.
~~~
$ helm uninstall {이름}
~~~
