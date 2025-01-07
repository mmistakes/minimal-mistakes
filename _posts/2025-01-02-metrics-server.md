---
layout: single
title:  "kubelet TLS Bootstraping을 통한 metrics-server Troubleshooting"
categories: Kubernetes
tag: [쿠버네티스, Kubernetes]
author_profile: false
sidebar:
    nav: "docs"
---

**[공지사항]** 
이전부터 학습하고 연구한 내용들을 함께 나누기 위해 최근 기술블로그를 개설하고 지속적으로 업로드하고 있습니다. 많은 관심과 피드백 부탁드립니다! 감사합니다 :)
{: .notice--success}

## metrics-server란?

metrics-server는 쿠버네티스 리소스의 성능 지표를 kubelet으로부터 연동하는 addon 컴포넌트입니다. 쿠버네티스를 기반으로 서비스를 운영하다 보면 사이트 이벤트와 같은 이슈를 앞두고 더 많은 워크로드로 확장해야 할 때가 있을 것입니다. 그 때 컨트롤러 내 파드 수를 자동으로 늘릴 수 있도록 하기 위해서는 **HPA(Horizontal Pod AutoScaler)** 를 배포해야 하는데요. 이 때 HPA는 metrics-server에서 수집된 성능 지표를 기반으로 워크로드를 확장할 수 있습니다.

metrics-server는 현재 시점의 리소스의 **CPU나 Memory 사용량 같은 기본적인 metric만을 연동**하기 때문에 더 상세한 metric을 확인하고 HPA로 확장할 수 있게 하기 위해서는 **Prometheus** 같은 도구를 사용하는 것이 효과적입니다.

metrics-server는 쿠버네티스 클러스터 구성 시 기본으로 설치되는 컴포넌트가 아니기 때문에 별도의 설치 과정이 있으며, 아래 metrics-server 공식 github 링크를 참고하여 매니페스트 혹은 helm 차트를 통해 Deployment로 설치할 수 있습니다.

[metrics-server Installation](https://github.com/kubernetes-sigs/metrics-server?tab=readme-ov-file)

## kubelet에서의 성능 metric 연동 오류

저는 helm 차트를 통해 metrics-server를 배치하고 나서 리소스 기본 성능을 확인하기 위해 kubectl top node를 실행했지만 "error: Metrics API not available" 이라는 에러 메시지를 확인할 수 있었습니다. metrics-server 파드의 상태를 확인해보니 Readiness probe 실패로 파드가 다운되어 있었는데요. 다운되기 전 출력한 log를 확인해보니 다음과 같은 메시지를 확인할 수 있었습니다.

**"Failed to scrape node" err="Get \"https://[host ip]:10250/metrics/resource\": tls: failed to verify certificate: x509: cannot validate certificate for [host ip] because it doesn't contain any IP SANs" node=[hostname]**

직관적으로 해석해 보면 kubelet의 서버 인증서 SANs에 노드의 ip 정보가 없어 metric 연동을 실패하는 것으로 보입니다.

### 초기 클러스터 구성 시 kubelet TLS 인증서

초기 클러스터 구성 시 노드가 default로 생성하는 Self-Signed 서버 인증서는 SANs에 노드의 hostname을 DNS 이름으로 갖고 IP Address 정보는 갖고 있지 않습니다.[(쿠버네티스 TLS Post 참고)](https://lewisjlee.github.io/kubernetes/ssl_tls_kubernetes/) 이를 해결하기 위해 metrics-server 공식 github를 살펴보면 'Requirement' 소제목에 "Kubelet certificate needs to be signed by cluster Certificate Authority (or disable certificate validation by passing `--kubelet-insecure-tls` to Metrics Server)" 라는 요구 사항을 확인할 수 있습니다.

`--kubelet-insecure-tls`를 활성화하는 방법으로 TLS 암호화 통신 없이 metric을 주고받을 수 있도록 할 수 있지만 신뢰성 있는 쿠버네티스 환경을 만들기 위해서는 좋은 방법이 아니라고 생각했습니다. 그래서 저는 요구 사항 원문대로 **kubelet 데몬이 클러스터 CA로부터 서명받은 인증서를 사용하도록** 바꾸기로 결정했습니다.

## 쿠버네티스 클러스터 CA 서명을 받은 TLS 인증서 Bootstraping

쿠버네티스 공식 문서의 kubelet config 페이지를 살펴 보면 Self-Signed 인증서 대신 인증서 API를 통해 인증서를 생성할 수 있는 **`serverTLSBootstrap`** 설정값을 소개하고 있습니다. 이 설정값은 default로 false로 지정되어 있기 때문에 Kubelet Configuration에서 true를 명시적으로 지정해 주고 kubelet을 restart 해주게 되면 kubelet은 자동으로 CSR을 생성하고 등록하게 됩니다.

<img title="" src="../../images/2025-01-02-metrics-server/2025-01-07-19-15-01-image.png" alt="loading-ag-809" data-align="center">

```bash
sudo systemctl restart kubelet
```

해당 CSR을 승인해주게 되면 kubelet은 자동적으로 클러스터 CA의 서명을 받은 새로운 서버 인증서로 API를 제공하게 됩니다.

<img title="" src="../../images/2025-01-02-metrics-server/e3484a0b3ae2aa471431160335c4d3f25e4ece8b.png" alt="loading-ag-866" data-align="center">

마찬가지로 다른 노드의 kubelet Configuration을 동일하게 설정하고 재시작한 다음 CSR을 승인하면

<img title="" src="../../images/2025-01-02-metrics-server/2025-01-07-19-27-22-image.png" alt="loading-ag-874" data-align="center">

문제없이 metric을 가져와 보여주는 것을 확인할 수 있었습니다.

## 초기 클러스터 구성부터 클러스터 CA 서명된 kubelet 인증서 사용하려면?

HPA는 쿠버네티스 워크로드의 확장성을 위해 꼭 필요한 기능으로 꼽힙니다. 그런 만큼 초기 쿠버네티스 클러스터를 구성할 때부터 metrics-server를 사용할 수 있도록 하는 것이 편리할 텐데요. 그렇다면 첫 Control-Plane에서 kubeadm init을 실행할 때 `serverTLSBootstrap` 설정값을 담은 최소 Kubelet Configuration을 전달해서 실행해야 합니다. 아래와 같이 Kubelet Configuration을 작성하고 클러스터를 초기화하면 노드의 kubelet은 default로 클러스터 CA로부터 서명된 서버 인증서를 사용하여 API를 제공할 수 있습니다.

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
serverTLSBootstrap: true
```

```bash
kubeadm init --config=kubelet-config.yaml
```





#### <참고>

[kubelet &quot;서버&quot; 를 위한 인증서 (kubelet.crt, kubelet.key) (feat: Metrics-Server TLS 인증서 오류 조치) by "Daniel Kim 의 기술 블로그"](https://www.kimsehwan96.com/kubelet-server-certificates/)

[Kubelet Configuration (v1beta1)](https://kubernetes.io/docs/reference/config-api/kubelet-config.v1beta1/#kubelet-config-k8s-io-v1beta1-KubeletConfiguration)

[Resource metrics pipeline](https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/)

[Certificate Management with kubeadm](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/#kubelet-serving-certs)
