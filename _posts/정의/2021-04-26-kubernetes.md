---
title: \[kubernetes] 쿠버네티스란?

categories: 
   - kubernetes

tags:
   - k8s
   - kubernetes
   - service
   - replica set
   - deployment

toc: false

last_modified_at: 2021-05-24

---
먼저, 쿠버네티스는 도커를 통해 개발한 서비스를 쉽게 관리하게 도와주는 어플리케이션이다.
단, 하나의 서버만 띄운다면 쿠버네티스는 필요없다. 도커만 있어도 된다. 하지만, 트래픽과 오류 등에 대한 대비의 문제로 여러 서버를 띄울 때 쿠버네티스를 사용한다.

쿠버네티스에는 여러 컨트롤러가 있다.

- auto healing: pod, 혹은 pod가 실행되고 있는 node에 문제가 생겨 가용되지 못할 경우, 해당 pod를 다시 실행시킴.
- auto scaling: pod의 리소스가 부족할 경우, pod를 추가적으로 생성해서 부하를 분산시킴.
- deployment: pod에 대한 자동 업데이트 기능을 제공한다. 업데이트가 잘못되면 롤백도 가능.
- job: 일정한 시간에 배치 등의 로직을 수행시킬 수 있음. 필요한 순간에만 pod를 생성하고, 수행이 끝나면 pod를 제거함.

pod는 쉽게 삭제, 생성되는 특성이 있는데, 이를 컨트롤러들이 보안한다.

Replic Set은 말그대로 **복제 세트**이다. (Replication Controller도 있는데, 이제는 사용하지 않는다.)
(기능: Replication Controller < Replica Set)

pod를 생성, 복제, 삭제를 하는 것이 주된 기능이다. pod에 접속량이 많아지거나 연산이 많아져 부하가 몰리면 해당 pod를 복제하여 접속을 분산시키기도 하고 worker node에 문제가 생겨 pod가 망가지면 정상적인 다른 node에 pod를 재생성 하여 서비스 중단을 막기도 한다.

Deployment는 Replica Set을 관리한다. (Deployment의 추상화 수준이 더 높다.)
배포에는 두 가지 방법이 존재한다.

- Recreate: 한번에 pod들을 교체한다. A 버전의 pod들이 전부 종료된 뒤 B 버전의 pod들을 실행시킨다. 해당 방식의 단점은 교체하는 과정에서 down time(서비스가 중단되는 시간)이 발생한다.
- Rolling Update: 업데이트 시 새 버전의 pod과 이전 버전의 pod를 한개씩 교체하면서 업데이트 하는 방식이다. 단점은 새 버전과 구 버전이 동시에 서비스되는 시간이 발생하지만, 사용자 입장에서는 서비스가 중단되지 않고 업데이트가 되는 **무중단 업데이트 방식**이다.

![kubernetes%20(k8s)%20%E1%84%85%E1%85%A1%E1%86%AB%2061d08913815a45cda85265cba9f24eb7/Untitled.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fo6b7z%2FbtqBxAePh4J%2Fu0A1FNr9Fe5oW6bthxyZnK%2Fimg.png)

[사진 출처 바로가기](https://boying-blog.tistory.com/8)

Replica Set에는 `selector`와 `template`를 설정할 수 있다. selector에 매칭되는 게 존재하는지 replica set은 확인하고, 매칭되는게 있다면 연결한다. 만약, 없다면 template에 있는 spec들로 pod를 생성한 뒤 연결한다.  `relicas: 1`라고 적힌 부분은 pod의 개수를 몇개로 유지할 것인 가이다.

Deployment는 pod 업데이트를 위해 사용되는 기본 컨트롤러이다.

k8s 환경변수도 바인딩을 하고, `spec.spec.volumes:`를 쓰면 ``kind: ConfigMap`의 내용을 cotainer로 가져올 수 있다.

배포할 container의 port와 protocol 등을 설정할 수 있습니다.

Service는 Pod들을 관리하는 논리적인 집단이다. 로드밸런싱과 라우팅의 역할을 한다.
Replica Set이 Pod 전체의 생명 관리를 한다면, Service는 요청이 들어왔을 때, 어떤 Pod에게 할당할지를 정한다. 우리 입장에서는 여러 Pod들은 몰라도, Service에게만 접근하면 Service가 알맞은 Pod에게 routing 해준다. 

Ingress의 경우 외부 통신에 대한 Routing을 한다. 들어온 요청에 대해서 어느 service로 갈지 proxy한다고 생각하면 된다. 

NetworkPolicy는 Inbound, Outbound에 대한 트래픽 제한을 설정한다. 기본적으로 외부 요청을 전부 막혀있는 걸로 알고있다. (HTTP, HTTPS(80/443 port)는 제외하고)
이 때 egress 설정으로 원하는 요청에 대해서 허용 설정을 하면 된다.

---
노트 정리 이미지
![](https://i.ibb.co/mCsMZmZ/Kubernetes-210425-233021-1.jpg)
![](https://i.ibb.co/qmrYJ6z/Kubernetes-210425-233021-2.jpg)
![](https://i.ibb.co/WkmskXB/Kubernetes-210425-233021-3.jpg)
![](https://i.ibb.co/j3wQtTf/Kubernetes-210425-233021-5.jpg)
![](https://i.ibb.co/vh2Fjvd/Kubernetes-210425-233021-6.jpg)
![](https://i.ibb.co/YbjBMhH/Kubernetes-210425-233021-7.jpg)
![](https://i.ibb.co/ZVTrP1D/Kubernetes-210425-233021-8.jpg)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ4NDY1NzA0NiwtMTU0MzUyMTA5MV19
-->