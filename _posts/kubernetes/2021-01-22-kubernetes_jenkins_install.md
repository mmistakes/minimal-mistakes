---
title: "kubernetes jenkins install"
escerpt: "jenkins install"

categories:
  - Kubernetes
tags:
  - [Kubernetes, devops]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2021-01-22
last_modified_at: 2021-01-22

comments: true
---

## Jenkins on Kubernetes Cluster
- namespace 생성
- kubernetes 관리자 권한이 있는 서비스 계정 생성
- pod 재시작 시 영구 jenkins 데이터에 대한 로컬 영구 볼륨 생성
- deployment.yaml만들고 배포
- service.yaml 만들고 배포
- jenkins application에 access하기


![jenkins_001](/assets/images/kubernetes/jenkins/jenkins_001.png)

1.namespace 생성

~~~
dino@master:~/work/kubernetes-jenkins/kubernetes-jenkins$ kubectl create namespace devops-tools namespace/devops-tools created
~~~


2.kubernetes 관리자 권한이 있는 서비스 계정 생성

~~~
dino@master:~/work/kubernetes-jenkins/kubernetes-jenkins$ kubectl apply -f serviceAccount.yaml 

[output]
clusterrole.rbac.authorization.k8s.io/jenkins-admin created 
serviceaccount/jenkins-admin created 
clusterrolebinding.rbac.authorization.k8s.io/jenkins-admin created
~~~

  2-1. serviceAccount.yaml

~~~
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: jenkins-admin
rules:
  - apiGroups: [""]
    resources: ["*"]
    verbs: ["*"]

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jenkins-admin
  namespace: devops-tools

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: jenkins-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: jenkins-admin
subjects:
- kind: ServiceAccount
  name: jenkins-admin
  namespace: devops-tools
~~~


jenkins-admin 은 clusterRole, jenkins-admin ServiceAccount을 하고 서비스 계정에 clusterRole을 결합한다.

jenkins-admin클러스터 역할은 클러스터 구성 요소를 관리 할 모든 권한을 가진다.
또한, 개별 리소스 작업을 지정하여 액세스를 제한할 수도 있다.

3. pod 재시작 시 영구 jenkins 데이터에 대한 로컬 영구 볼륨 생성

~~~
dino@master:~/work/kubernetes-jenkins/kubernetes-jenkins$ kubectl create -f volume.yaml

[output]
storageclass.storage.k8s.io/local-storage created
persistentvolume/jenkins-pv-volume created
persistentvolumeclaim/jenkins-pv-claim created
~~~

  3-1. volume.yaml

~~~
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer

---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: jenkins-pv-volume
  labels:
    type: local
spec:
  storageClassName: local-storage
  claimRef:
    name: jenkins-pv-claim
    namespace: devops-tools
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  local:
    path: /mnt
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - node01

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: jenkins-pv-claim
  namespace: devops-tools
spec:
  storageClassName: local-storage
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
~~~

cluster work node 호스트 이름으로 넣는다.

~~~
$ kubectl get nodes
~~~

![jenkins_002](/assets/images/kubernetes/jenkins/jenkins_002.png)

볼륨 local의 경우 데모 목적으로 스토리지 클래스를 사용했다. 즉, 위치 PersistentVolume아래의 특정 노드에 볼륨을 생성한다. /mnt .는 AS local저장 클래스 노드 선택이 필요하다, 그러므로 특정 노드에서 작업자 노드 이름을 지정해야한다.
포드가 삭제되거나 다시 시작되면 데이터가 노드 볼륨에 유지된다. 그러나 노드가 삭제되면 모든 데이터가 손실된다.
이상적으로는 노드 장애 시 데이터를 유지하기 위해 클라우드 제공자 또는 클러스터 관리자가 제공하는 사용 가능한 스토리지 클래스를 사용하는 영구 볼륨을 사용해야 한다.



4.deployment.yaml만들고 배포'

~~~
dino@master:~/work/kubernetes-jenkins/kubernetes-jenkins$ kubectl apply -f deployment.yaml

[output]
deployment.apps/jenkins created
~~~

  4-1. deploymnet.yaml

~~~
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jenkins
  namespace: devops-tools
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jenkins-server
  template:
    metadata:
      labels:
        app: jenkins-server
    spec:
      securityContext:
            fsGroup: 1000 
            runAsUser: 1000
      serviceAccountName: jenkins-admin
      containers:
        - name: jenkins
          image: jenkins/jenkins:lts
          resources:
            limits:
              memory: "2Gi"
              cpu: "1000m"
            requests:
              memory: "500Mi"
              cpu: "500m"
          ports:
            - name: httpport
              containerPort: 8080
            - name: jnlpport
              containerPort: 50000
          livenessProbe:
            httpGet:
              path: "/login"
              port: 8080
            initialDelaySeconds: 90
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 5
          readinessProbe:
            httpGet:
              path: "/login"
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          volumeMounts:
            - name: jenkins-data
              mountPath: /var/jenkins_home         
      volumes:
        - name: jenkins-data
          persistentVolumeClaim:
              claimName: jenkins-pv-claim
~~~

securityContext Jenkins 포드가 로컬 영구 볼륨에 쓸 수 있도록 한다.

Jenkins 데이터 경로를 보유하는 로컬 스토리지 클래스를 기반으로 하는 로컬 영구 볼륨 /var/jenkins_home

> deployment 파일은 Jenkins 데이터에 대한 로컬 스토리지 클래스 영구 볼륨을 사용한다. 프로덕션 사용 사례의 경우 Jenkins 데이터에 대한 클라우드별 스토리지 클래스 영구 볼륨을 추가해야 한다. 로컬 스토리지 영구 볼륨을 원하지 않는 경우 아래와 같이 배포의 볼륨 정의를 호스트 디렉터리로 바꿀 수 있다.

~~~
volumes:
      - name: jenkins-data
        emptyDir: {}
~~~

5. 배포확인

~~~
$ kubectl get deployments -n devops-tools
~~~

![jenkins_003](/assets/images/kubernetes/jenkins/jenkins_003.png)

6. 에러발생

에러발생.아래와 같은 절차로 에러발생원인 확인 후 해결하자.

~~~
$ kubectl get pod -n devops-tools
$ kubectl describe [pod name] -n devops-tools
~~~

![jenkins_004](/assets/images/kubernetes/jenkins/jenkins_004.png)

CrashLoopBackOff Exit Code 1 에러이다.관련 에러의 해결 방법론은 다음편에 공부해보자.

~~~
$ kubectl logs [pod name] -n devops-tools

[output]
standard_init_linux.go:228: exec user process caused: exec format error
~~~

관련 검색을하니 결국 도커이미지가 cpu 아키텍처에 의존성을 띄기때문에 발생하는 에러임을 알수 있었다.
현재 작성된 deployment.yaml에서 가져오는 jenkins container image는 Amd64 아키텍쳐 이며, 나는 현재 jetson nano의 ARM 계열이기에 container image를 ARM 계열로 가져오자.


8. deploymnet.yaml

~~~
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jenkins
  namespace: devops-tools
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jenkins-server
  template:
    metadata:
      labels:
        app: jenkins-server
    spec:
      securityContext:
            fsGroup: 1000
            runAsUser: 1000
      serviceAccountName: jenkins-admin
      containers:
        - name: jenkins
          image: kodbasen/jenkins-arm:2.7.1 #jenkins/jenkins:lts
          imagePullPolicy: IfNotPresent
          resources:
            limits:
              memory: "2Gi"
              cpu: "1000m"
            requests:
              memory: "500Mi"
              cpu: "500m"
          ports:
            - name: httpport
              containerPort: 8080
            - name: jnlpport
              containerPort: 50000
          livenessProbe:
            httpGet:
              path: "/login"
              port: 8080
            initialDelaySeconds: 90
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 5
          readinessProbe:
            httpGet:
              path: "/login"
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          volumeMounts:
            - name: jenkins-data
              mountPath: /var/jenkins_home
      volumes:
        - name: jenkins-data
          persistentVolumeClaim:
              claimName: jenkins-pv-claim
~~~

그 후 배포 확인을 해보면 정상적으로 올라온것을 확인할수 있다.

![jenkins_005](/assets/images/kubernetes/jenkins/jenkins_005.png)

pod도 올라왔는지 확인해보자.

~~~
$ kubectl get pod -n devops-tools
~~~

![jenkins_006](/assets/images/kubernetes/jenkins/jenkins_006.png)

9.service.yaml 만들고 배포
배포를 만들었지만 외부에서 접근할수 없다. 외부에서 jenkins 배포 application에 access위해서는 서비스를 만들고 배포에 매핑해야 한다.

  9-1. service.yaml

~~~
apiVersion: v1
kind: Service
metadata:
  name: jenkins-service
  namespace: devops-tools
  annotations:
      prometheus.io/scrape: 'true'
      prometheus.io/path:   /
      prometheus.io/port:   '8080'
spec:
  selector:
    app: jenkins-server
  type: NodePort
  ports:
    - port: 8080
      targetPort: 8080
      nodePort: 32000
~~~

~~~
$ kubectl apply -f service.yaml
~~~


> 여기에서는 NodePort포트 32000의 모든 kubernetes 노드 IP에서 Jenkins를 노출 하는 유형을 사용하고 있습니다. 수신 설정 이 있는 경우 Jenkins에 액세스하기 위한 수신 규칙을 생성할 수 있습니다. 또한 AWS, Google 또는 Azure 클라우드에서 클러스터를 실행하는 경우 Jenkins 서비스를 Loadbalancer로 노출할 수 있습니다.


10.jenkins application에 access하기

이제 노드ip중 하나를 탐색 후 32000포트로 접속하면 jenkins dashboard에 액세스 할수 있다.

~~~
http://<노드아이피>:32000
~~~

![jenkins_007](/assets/images/kubernetes/jenkins/jenkins_007.png)

~~~
$ kubectl get pods --namespace=devops-tools
$ kubectl logs <pod name> --namespace=devops-tools
~~~

![jenkins_008](/assets/images/kubernetes/jenkins/jenkins_008.png)

위 password를 이용하여 jenkins dashboard에 접속하면 된다.


11. 주의
kubernetes에서 jenkins를 호스팅할 때 포드 또는 노드 삭제 중 데이터 손실을 방지하기 위해 고가용성 영구 볼륨 설정(persistent volume)을 고려해야 한다.

<!--
### 7. jenkins dashboard 사용하기
처음에 들어가면 권장 플로그인 설치여부를 묻는다.
'install suggested plugins;를 선택하면 jenkins가 알아서 Git, Pipeline, Mailer 등의 중요 프러그인들을 자동으로 설치해준다.(5~10분정도 소요)

![jenkins_009](/assets/images/kubernetes/jenkins/jenkins_009.png)


-->
---
[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}