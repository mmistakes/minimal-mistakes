---
layout: single
title:  "파드 내 설정값 적용 우선 순위"
categories: Kubernetes
tag: [쿠버네티스, Kubernetes]
author_profile: false
sidebar:
    nav: "docs"
---

**[공지사항]** 
이전부터 학습하고 연구한 내용들을 함께 나누기 위해 최근 기술블로그를 개설하고 지속적으로 업로드하고 있습니다. 많은 관심과 피드백 부탁드립니다! 감사합니다 :)
{: .notice--success}

쿠버네티스에서 실행되는 애플리케이션에 설정값을 전달하는 방법은 여러가지가 있습니다. 컨테이너 이미지 자체에 설정값을 포함하여 실행시키는 방법이 있고, 매니페스트에 직접 정의하거나 ConfigMap, Secret을 사용하여 전달하는 방법이 있습니다. 하지만 때로는 테스트나 운영상의 목적으로 이미 정의된 설정값을 다른 값으로 치환해야 하거나 모종의 이유로 두 가지 이상의 방법으로 동일한 설정값을 중복 적용하는 일이 발생합니다. 이럴 경우 어떤 방법으로 적용한 설정값이 애플리케이션에 우선적으로 반영될까요?

이번 포스팅에서는 파드에서 구동되는 컨테이너에 설정값을 적용하는 다양한 방법과 우선 순위에 대해 작성하려고 합니다.

## 컨테이너 이미지에 설정값 정의

우선 busybox 이미지를 기반으로 간단한 이미지를 하나 빌드하고 하나의 파드를 replica로 실행시키는 Deployment를 배포합니다.

```docker
FROM    busybox:1.28
ENV	    TIME=60
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: busybox
  labels:
    app: bash
spec:
  replicas: 1
  selector:
    matchLabels:
      app: bash
  template:
    metadata:
      labels:
        app: bash
    spec:
      containers:
      - name: busybox
        image: lewisjlee/sleep:v1
        command: [ 'sh', '-c', 'while true; do echo "Sleeping for $TIME"; sleep $TIME; done' ]
```

60 이라는 값을 가진 TIME 환경 변수를 포함한 신규 이미지를 빌드하고 저의 Repository에 push합니다. 그리고 실행되는 파드가 이미지에 정의된 TIME 환경 변수를 가지고 60초동안 sleep을 실행하고 sleep을 실행하는 시간을 표준 출력하도록 Deployment 매니페스트를 정의합니다. 해당 Deployment를 배포하고 표준 출력을 살펴보면 이미지에 반영된 TIME 환경 변수가 정상 적용되었음을 확인할 수 있습니다.

<img title="" src="../../images/2024-12-17-priority_pod_config/54a7301a272d06894982384155cc59be8eedfc13.png" alt="loading-ag-684" data-align="center">

## ConfigMap을 통한 설정값 적용

그렇다면 위의 이미지와 매니페스트에 ConfigMap을 통해 설정값을 중복 정의하면 어떻게 될까요? 이번에는 TIME 환경 변수를 45로 설정한 ConfigMap을 생성하고 매니페스트에 추가하여 실행해 보도록 하겠습니다.

```bash
kubectl create configmap time-configmap --from-literal=TIME=45
```

```yaml
spec:
  containers:
  - name: busybox
    image: lewisjlee/sleep:v1
envFrom:
        - configMapRef:
            name: time-configmap
        command: [ 'sh', '-c', 'while true; do echo "Sleeping for $TIME"; sleep $TIME; done' ]    command: [ 'sh', '-c', 'while true; do echo "Sleeping for $TIME"; sleep $TIME; done' ]
```

컨테이너 이미지에 이미 60이라는 값을 가진 TIME 환경 변수가 설정되어 있는 상태에서 45라는 값을 가진 TIME 환경 변수를 담은 ConfigMap을 적용했습니다. 그 결과 애플리케이션은 ConfigMap에 적용된 TIME 값을 사용하는 것으로 확인됩니다.

<img title="" src="../../images/2024-12-17-priority_pod_config/4761422d016eeacd6d634ac5d64a74773c765810.png" alt="loading-ag-795" data-align="center">

애플리케이션은 환경 변수를 읽어들이기도 하지만 대부분 특정 configuration 파일에서 설정값을 읽어들이는 경우가 많습니다. 그래서 ConfigMap은 컨테이너 내부에 환경 변수의 형태로 설정값을 전달하기도 하지만 ConfigMap 자체를 하나의 configuration 파일로 컨테이너 내부에 저장하도록 하는 매니페스트 정의도 있습니다.

**파드로 실행되는 대부분의 애플리케이션은 최초로 읽어들인 ConfigMap 설정값을 메모리에 저장하여 사용하고, 이후에 일어난 ConfigMap의 변경은 반영하지 않습니다.** 그렇기 때문에 ConfigMap 내 변경 사항을 반영하기 위해서는 파드를 재시작하거나 컨트롤러를 Rollout 해야 합니다.

## 매니페스트 내 env 자체 정의

설정값을 전달하기 위해 리소스 매니페스트 내 env 필드를 자체 정의하는 방법이 있습니다. 이번에는 ConfigMap을 사용하여 설정값을 전달한 매니페스트에 30이라는 값을 가진 TIME 변수를 env 필드로 추가하여 실행해보겠습니다.

```yaml
spec:
  containers:
  - name: busybox
    image: lewisjlee/sleep:v1
    env:
    - name: TIME
      value: "30"
    envFrom:
    - configMapRef:
        name: time-configmap
    command: [ 'sh', '-c', 'while true; do echo "Sleeping for $TIME"; sleep $TIME; done' ]
```

이미 컨테이너 이미지에 60이라는 값이 TIME이라는 환경 변수에 설정되어 있고 이를 ConfigMap에 정의된 45라는 값으로 치환했었습니다. 그러나 동일한 매니페스트에서 env 필드를 이용해 값을 30으로 설정하고 배포해보니 env 필드에 정의된 TIME 변수값이 사용되는 것을 확인할 수 있었습니다.

<img title="" src="../../images/2024-12-17-priority_pod_config/510753a2f4091d89c508ea52726fe18346b601d6.png" alt="loading-ag-811" data-align="center">

## 설정값 적용 우선 순위

### <center>매니페스트 내 env 자체 정의 > ConfigMap > 컨테이너 이미지 내 설정값</center>

동일한 환경 변수를 세 가지 경우로 모두 적용하고 확인한 결과, 리소스 매니페스트에 env 필드로 정의한 값이 가장 우선 순위로 적용되고 그 다음 ConfigMap, 컨테이너 이미지에 적용된 설정값이 가장 후순위로 적용됨을 알 수 있었습니다. 그렇다면 각각의 경우 어떠한 설정값을 적용하면 좋을까요?

먼저 최우선 순위가 되는 매니페스트 env 필드는 **예외적으로 설정값을 적용해야 하는 경우**에 적용합니다. 쿠버네티스 인프라에서는 애플리케이션의 설정값을 중앙 관리하기 위해 ConfigMap을 사용합니다. 테스트나 디버깅 등을 위해 예외적으로 설정값을 적용해야 할 경우 ConfigMap에서 정의한 값을 매니페스트 내 env 자체 정의를 사용해 치환할 수 있습니다.

ConfigMap은 **쿠버네티스 인프라에 애플리케이션을 배포할 때 표준으로 적용하는 설정값**을 정의합니다. 애플리케이션 이미지에 이미 적용된 값이 있지만 운영 환경에 배포하면서 공통적으로 적용해야 하는 설정값이 있을 경우 ConfigMap을 생성하여 배포합니다.

가장 후순위가 되는 컨테이너 이미지 내 설정값은 **모든 애플리케이션 기본 configuration**을 설정합니다. ConfigMap이나 매니페스트 정의에 의해 변경될 수 있고, 그렇지 않을 경우 기본으로 적용하고자 하는 설정값을 컨테이너 이미지 빌드 시 적용할 수 있습니다.
