---
layout: single
title: Cloud Computing Overview
categories:
  - Cloud Computing
tags:
  - Cloud-Computing
toc: true
---
### 클라우드의 역사
- 1960년대 가상화 용어 사용
    - 전 가상화 기법 구현
    - 에뮬레이터 존재

- 다양한 하이퍼바이저 출현
    - IBM Logical Partition
        - IBM 유닉스 머신에 사용되는 하이퍼바이저
    - VMWare
    - Xen
    - KVM
    - Hyper-V

### 서버 가상화
1. 전통 OS 작동 방식 vs Hypervisor
2. Type 1 vs Type 2
3. Type 1 -> 전가상화 / 반가상화

### Type 1 vs Type 2
Type 1 : Native (bare metal)
- IBM Xen
- VMWare ESX Server
- MS Hyper-V
- KVM

Type 2 : Hosted
- VMware Server
- Vmware Workstation
- MS Virtual Server
- Oracle Virtual Box

### 전가상화 vs 반가상화
전가상화(Full Virtualization)
- 하드웨어 모두 가상화
- 게스트 OS가 직접 CPU에게 하드웨어 제어 요청

반가상화(Para-Virtualization)
- 하드웨어 완전 가상화 X
- 게스트 OS가 하이퍼바이저에 하드웨어 제어 요청


### Why Cloud?
스케일업, 스케일 아웃 이미지
- 효율적인 비용 절감
    - 사용한 만큼 지불 등 기회 비용 최적화 -> 비용 절감
    - 다양한 부가 상품 이용을 통해 개발 비용 절감
-  빠른 Deploy
    -  기존 Legacy 인프라에 비해 빠른 인프라 구성 시간
-  글로벌 진출 시 용이
    -  글로벌 리전 활용을 통해 글로벌 진출 시 빠르고 손쉬운 인프라 구성
-  보안
    -  인프라에 대한 보안을 CSP(클라우드 공급 업체)에 위임
    -  다양한 보안 상품을 이용하여 보안 강화

### Cloud 모델 분류
On-premise, IaaS, PaaS, SaaS 분류 이미지

IaaS 예시
PaaS 예시
SaaS 예시

### Deployment Model

| 구분     | Private Cloud        | Public Cloud                                                          |
| ------ | -------------------- | --------------------------------------------------------------------- |
| 서비스 대상 | 한정된 그룹               | 불특정 다수                                                                |
| 인프라 위치 | 자체 데이터센터             | CSP 데이터센터                                                             |
| 인프라 운영 | 사내 엔지니어              | CSP 엔지니어                                                              |
| 장점     | 기업이 원하는 설계대로 구축 및 운영 | 초기 구축 비용 저렴<br>인프라 환경 운영 부담 X<br>트래픽 빠른 대응 가능<br>PaaS, SaaS 이용한 빠른 개발 |

Multi Cloud

Hybrid Cloud

