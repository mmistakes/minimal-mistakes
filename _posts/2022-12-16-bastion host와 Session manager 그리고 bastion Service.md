---
title: "[AWS]bastion host와 Session manager 그리고 bastion Service"
categories: AWS
tag: [AWS,네트워크, network]
toc: true
author_profile: false
sidebar:
 nav: "docs"
#search: false

---

# **bastion host, bastion service 그리고 Session manager**

![bastion1](https://user-images.githubusercontent.com/75375944/208288367-737063e6-f2df-41ee-af57-ec3430de481f.png)

[AWS Systems Manager Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)

[Linux Bastion Hosts on AWS - 솔루션](https://aws.amazon.com/ko/solutions/implementations/linux-bastion/)

## **Bastion host**

일반적으로 bastion server라고도 하며 OpenSSH 서버 또는 RDP 게이트웨이와 같은 프로토콜별 서버가 있는 최소한의 운영 체제로 구성된다.

![bastion2](https://user-images.githubusercontent.com/75375944/208288369-f877f800-a265-42a0-86a8-c46fc1872095.png)

**SSH Bastion host 모범 사례**

[14 Best Practices to Secure SSH Bastion Host](https://goteleport.com/blog/security-hardening-ssh-bastion-best-practices/)

이것저것 읽어보면서 정리한 Bastion host의 단점으로는 우선 관리할 전용서버가 필요하다. AWS의 경우 VM인 EC2로 생성하여 VPN과 연결하곤 하는데, 단순히 점프용도로 사용하는 케이스가 많다. 

본인은 프록시 용도로 활용하는 bastion host를 보면서 해커가 bastion host에 침투할 수 있는 경우, 방화벽을 비활성화할 수 있지 않을까라는 생각이 들었다. 구글링해보니 Bastion host가 손상되는 경우는 점프용도로만 쓸 경우 흔치는 않고, sudo를 읽어 관리자의 패스워드를 하이재킹한 경우가 있었다고 한다. 그래서 Bastion Host에서 sudo를 사용하려면 OTP에만 강제하도록 해야하고 이게 힘들면 이중 인증절차(2FA)를 쓰길 권유한다. 또 가장 좋은 방법은 bastion host를 읽기전용 이미지에서 실행하고 업그레이드나 관리 작업을 전혀 수행하지 못하게 하는 것 같다. 여기에 단일 계정이 아니라 권한을 격리시키면 더 좋을 것 같다.

이에 Bastion host가 리눅스라면 Tripwire IDS(침입방지시스템)를 설치해서 승인되지않은 일이 발생하면 즉시 알리도록하고, logwatch 설치 및 활용으로 하이재킹하는 침입자를 잡는 것이 어쩌면 엔지니어가 할 수 있는 최선이라는 생각이 든다.

[Securing the Linux filesystem with Tripwire](https://opensource.com/article/18/1/securing-linux-filesystem-tripwire)

## AWS System Manager의 Session Manager기능

AWS는 bastion host 없이 프라이빗 인프라에 안전하게 연결할 수 있는 새로운 AWS Systems Manager(Session Manager) 기능을 출시했다. 액세스 제어를 중앙 집중화하고 인바운드 액세스를 줄임으로써 보안 및 감사 상태가 크게 향상된다고 AWS는 강조한다.

이러한 Bastion host의 유스케이스와 비교하여 Session Manager를 사용하여 SSH 키 또는 SSH 인증서를 처리하고 SSH 서버를 노출하고 방화벽 규칙을 처리하여 액세스를 필터링하는 방식이 비용, 관리, 운영, 보안 측면에서 좋은게 아닌가?라는 의견이 생겨났고 AWS에서도 돈을벌기 위해서인지는 모르겠지만 그렇게 말하는 것 같다.

**— AWS System Manager 특징**

터널링 SSH 없이 SSM을 사용하면 다음과 같은 이점이 있다.

- 세션 중에 실행된 명령과 결과를 기록. Session Manager 내에서 SSH를 사용하면 모두 암호화
- SSH 키를 관리할 필요가 없다
- Shell access는 IAM(Identity and Access Management) 정책 내에 완전히 포함되어 있으므로 해당 접근을 제어하는 하나의 통로가 있다
- 원격 액세스를 활성화하기 위해 공용 IP 주소를 가상 머신과 연결할 필요는 없다
- SSH 다중화 공격의 가능성을 제거
- IAM 자격 증명에 대한 액세스(예: SSH 또는 RDP)를 통합
- 원격 액세스를 위해 메타데이터 및 전체 세션 로그(가능한 경우)를 캡처
- Session Manager는 액세스 및 로깅과 관련된 다양한 서비스에 대해 VPC 엔드포인트를 사용할 수 있으므로 인터넷에 대한 노출이 최소화

**— AWS System Manager구성 시 필요한것**

- **로그** 를 저장할 S3 bucket
- **AWS System Manager logging** 활성화
- 리소스에서 SSM을 허용하고 로그를 bucket으로 전송 하는 **IAM 역할**
- **SSM agent** 가 있는 EC2 인스턴스

<aside>
💡 최소한 로그 전용 AWS 계정이 있는 것이 좋습니다.

</aside>

## Bastion Service

Bastion host에서 새로운 진화라고 하는 Bastion service가 있다. (Bastion Service에 대한 소개는 Teleport사이트에서 가져온 표로 대체.)

| 특징      | Bastion host                                          | Bastion Service                                                                          |
| ------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 배포 유형   | 전용 Linux 서버, VM, 방화벽                                  | 플랫폼에 구애받지 않습니다. 클라우드 네이티브 워크플로를 지원하고 임시 서비스가 될 수 있으며 Kubernetes에 배포하거나 PaaS로 제공할 수 있습니다. |
| 토폴로지 유형 | 일반적으로 단일 사설 네트워크에 연결됨                                 | 다중 클라우드, 다중 데이터 센터 클러스터를 지원하여 상호 연결된 지리적 범위 액세스 포인트를 허용합니다.                              |
| 구성품     | 여러 서비스(SSH, FTP, HTTP 등)를 지원하는 개별 구성 요소               | 여러 프로토콜을 이해하고 수용하는 단일 서비스                                                                |
| 네트워크 매핑 | 개인-공용 네트워크 매핑                                         | 내부 애플리케이션 및 서비스 매핑에 대한 공용 네트워크.                                                          |
| 운송 보안   | 일반 텍스트 전송 가능                                          | 암호화된 연결만(주로 TLS)                                                                         |
| 프로토콜 인식 | 네트워크 인식                                               | 프로토콜 및 애플리케이션 권한 인식                                                                      |
| 입증      | 네트워크 기반 액세스 제어. 추가 인증은 연결 전달을 담당하는 서비스(예: SSH)에 따라 다름 | 기업 IAM과 통합된 기본 액세스 제어. 클라이언트 인증, 장치 증명을 지원                                               |

Bastion Service에 관심이 생긴 이유는 문제 해결과 패치 및 업데이트를 위해 단순히 ssh를 비활성시키는 환경은 자체적으로 관리하기 쉬운 작업환경이 아니며, 긴급상황에 서버에 빠르게 액세스하고, 디버그 및 수정하는 기능을 쓰는곳이 대부분이기 때문에 ssh를 관리한다는 점 때문이다. 그리고 보안성이 강화된 Bastion Service가 여기에 특화되어 있다.

> **Bastion 서비스 몇 가지** : [BeyondCorp](https://cloud.google.com/beyondcorp) , [Teleport](https://goteleport.com/how-it-works/) , [Azure Bastion](https://docs.microsoft.com/en-us/azure/bastion/bastion-overview)

## **Teleport**

![bastion3](https://user-images.githubusercontent.com/75375944/208288372-158c7629-8c57-4605-b238-170762f770b5.png)

출처: https://goteleport.com/how-it-works

    

    

Bastion Service 중 Teleport는 SSH 서버, Windows 서버 및 desktop, Kubernetes 클러스터, 웹 애플리케이션 또는 데이터베이스에 액세스할 수 있다.

![bastion4](https://user-images.githubusercontent.com/75375944/208288376-09c559d4-8e26-4055-a46d-edc0ac53fd4c.png)

- 장점
  
  - SSH 명령어 레코딩 기능과 db쿼리 로깅 기능
  
  - Teleport Web에서 Console로 접근하여 ssh 접근가능, tsh라는 Teleport ssh를 OS별로 설치할 수 있어서 세팅이 간편
  
  - 이중 인증 절차(2FA)를 기본적으로 갖추고 있어 보안이 뛰어남(앞서 얘기한 Bastion host의 단점을 보완)

    

## 짤막한 결론

여차저차 최근 진행하는 Peak Triffic Test 프로젝트에 AWS Session Manager 먼저 도입해보고나서 Teleport로 접근제어하는 방식도 한번 적용을 고려해봐야겠다.

[Teleport: Identity-Native Infrastructure Access. Faster. More Secure.](https://goteleport.com/)

그외 유용한 레퍼런스

[New - Port Forwarding Using AWS System Manager Session Manager ](https://aws.amazon.com/ko/blogs/aws/new-port-forwarding-using-aws-system-manager-sessions-manager/)

[Running a bastion host/jumpbox on Fargate](https://blog.deleu.dev/running-a-bastion-host-on-fargate/)

(요건 ECS fargate 사용할 때 참고)
