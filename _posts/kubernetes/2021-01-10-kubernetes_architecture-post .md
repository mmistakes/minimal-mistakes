---
title: "kubernetes Architecture"
escerpt: "kubernetes의 구조확인"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-10
last_modified_at: 2021-01-10

comments: true
---

---

## Architecture
![kubernetes_architecture_001.png](/assets/images/kubernetes/architecture_001.png)

## Master node 

master node에는 kube-ApiServer, Controller-Manager, ETCD Cluster, Kube-Scheduler가 있다

- kube-ApiServer :  Kubernetes API 서버는 포드, 서비스, 복제 컨트롤러 등을 포함하는 api 개체에 대한 데이터를 검증하고 구성. API 서버는 REST 작업을 서비스하고 다른 모든 구성 요소가 상호 작용하는 클러스터의 공유 상태에 대한 프런트 엔드를 제공

- Controller-Manager: Kubernetes 컨트롤러 관리자는 Kubernetes와 함께 제공되는 핵심 제어 루프를 포함하는 데몬. 로봇 공학 및 자동화 응용 분야에서 제어 루프는 시스템 상태를 조절하는 비 종결 루프이며, Kubernetes에서 컨트롤러는 apiserver를 통해 클러스터의 공유 상태를 감시하고 현재 상태를 원하는 상태로 이동하기 위해 변경하는 제어 루프. 현재 Kubernetes와 함께 제공되는 컨트롤러의 예로는 복제 컨트롤러, 엔드 포인트 컨트롤러, 네임 스페이스 컨트롤러 및 서비스 계정 컨트롤러가 있다

- ETCD Cluster : ETCD는 모든 클러스터 데이터에 대한 Kubernetes의 백업 저장소로 사용되는 일관되고 가용성이 높은 키 값 저장소.

- Kube-Scheduler : Kubernetes 스케줄러는 노드에 포드를 할당하는 제어 영역 프로세스. 스케줄러는 제약 조건 및 사용 가능한 리소스에 따라 예약 대기열의 각 포드에 대해 유효한 배치 인 노드를 결정. 그런 다음 스케줄러는 유효한 각 노드의 순위를 매기고 포드를 적절한 노드에 바인딩.

## worker node 

Worker node에는 kubelet, Container Runtime Engine, Kube-Proxy가 있다.

- kubelet : kubelet은 각 노드에서 실행되는 기본 "노드 에이전트" kubelet은 PodSpec 측면에서 작동. PodSpec은 포드를 설명하는 YAML 또는 JSON 객체이며, kubelet은 다양한 메커니즘 (주로 apiserver를 통해)을 통해 제공되는 일련의 PodSpec을 가져와 해당 PodSpec에 설명 된 컨테이너가 실행 중이고 정상인지 확인. kubelet은 Kubernetes에서 생성되지 않은 컨테이너를 관리하지 않음

- Container Runtime Engine : 컨테이너 런타임 클러스터의 각 노드에 Pod가 실행될 수 있도록 함

- Kube-Proxy : Kubernetes 네트워크 프록시는 각 노드에서 실행. 이는 각 노드의 Kubernetes API에 정의 된 서비스를 반영하며 백엔드 세트에서 간단한 TCP, UDP 및 SCTP 스트림 전달 또는 라운드 로빈 TCP, UDP 및 SCTP 전달을 수행 할 수 있음. 서비스 클러스터 IP 및 포트는 현재 서비스 프록시에서 열린 포트를 지정하는 Docker-links 호환 환경 변수를 통해 찾을 수 있음. 이러한 클러스터 IP에 대해 클러스터 DNS를 제공하는 선택적 애드온이 있음. 사용자는 프록시를 구성하기 위해 apiserver API로 서비스를 만들어야함.

## master/worker node간의 연결성

- 과한 통신량을 받게 되면 Master 혼자서 감당하기 힘들며 Master Node가 고장나면 전체 Cluster에 영향을 받게 되므로 고가용성으로 Cluster를 연결하여 Load Balancing 및 고가용성을 유지할수 있는 환경 구축 필요

- Worker Node들이 Master Node와 통신을 하기 위해 Load Balancer를 통해 Master Node에 접근 가능

- Kube-ApiServer는 Load Balancer에 의해 Worker Node로 노출이 된됨.

- Control Plane node는 Local ETCD 멤버를 생성하고 해당 ETCD 멤버는 오직 Kube-ApiServer와 통신함.

- Kubeadm init과 kubeadm join --control-plane으로 Control Plane Node에서 자동으로 ETCD 멤버를 만들 수 있음

---


[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}