---
layout: post
title:  "[Blockchain] 하이퍼레저 패브릭 1"
---

# 하이퍼레저란??

## 기업형 블록체인의 탄생배경

블록체인을 구성하는 방법에 따라 여러 형태가 있지만 크게 두 가지로 볼 수 있다.

누구나 참여할 수 있는 개방형(public)과 이해관계자들이 모여 구성한 폐쇄형(private)이 있다.

기업에서 개방형 블록체인을 적용하기엔 자신들의 기업정보가 공개되는 것을 싫어하기 때문에 이해관계가 맞는 당사들끼리만 필요에 의해 특정 정보를 공유 및 제어하고 싶어한다. 이때 블록체인의 트렐레마를 해결해야한다.

![블록체인 트릴레마? — Steemit](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtycubBLdLfitpxmYp5_cw_uW9yGJ11jHPjYjucipdTA&s)

블록체인 트렐레마(3가지 딜레마)란 Scalability(확장성), Decentralization(분산화), Security(보안성) 세가지 문제점을 모두 충족시키기 어렵다는 딜레마 이다. 개방형은 확장성과 분산화가 좋지만 보안성이 떨어지는 편이고, 폐쇄형은 보안성과 확장성이 좋지만 분산화가 떨어지는 편이다.

이러한 요구를 충족하기 위해 탄생한 것이 기업형 블록체인이고,  그 중 하나가 바로 하이퍼레저 이다.

## 하이퍼레저의 구성

![img](https://blog.kakaocdn.net/dn/cT4hkQ/btqxgzZhG7n/wv4HtBxxTNK1rG3F6DLfWK/img.png)

하이퍼레저는 참여가 허락된 참여자만 블록체인 네트워크에 참여할 수 있고, 참여한 네트워크에서 작은 조직(Organization)을 만들고 채널(Channel)이라는 논리적인 묶음으로 각기 다른 원장(ledger)을 공유할 수도 있다. 

하이퍼레저는 기업형 블록체인 플랫폼으로서 블록체인을 기업에서 사용할 수 있도록 **표준**을 제공하는 블록체인 플랫폼이다. 하이퍼레저는 6개의 하위 프로젝트와 여러 개의 툴로 하이퍼레저 그린하우스(GreenHouse)를 구성한다.

![img](https://blog.kakaocdn.net/dn/cJI8TC/btqxjAvFab6/iF94lY5k0W4Hp9MxGc2OBK/img.png)

### 하이퍼레저 프로젝트

#### 1. Hyperledger Burrow

이더리움과 하이퍼레저를 연결하는 프로젝트이다. EVM(Ethereum Virtual Machine) 위에서 이더리움의 Dapp을 구동할 수 있다.<br>즉, 하이퍼레저에서 이더리움 기반의 프로그램을 동작시킬 수 있도록 지원하는 프로젝트이다.

#### 2. Hyperledger Fabric

현재 기업용 블록체인에 많이 사용되는 프로젝트이다. Peer, Orderer 등의 기능을 가지고 있는 컴포넌트들로 모듈화되어 있다. MSP(Membership Service Provider) 기반의 인증 서비스를 사용하며, 체인코드라는 스마트 컨트랙트를 사용한다. 또한 원장(ledger)와 현재의 상태값을 저장하는 현재 블록체인의 상태가 존재한다.

#### 3. Hyperledger Grid

Supply Chain(공급망) 솔루션을 개발하기 위한 웹 어셈블리 기반의 프레임워크 이다. 물류 서비스는 블록체인을 적용할 수 있는 가장 적합한 분야 중 하나이며, Grid 프로젝트는 빠른 서비스를 만들 수 있게 관련 라이브러리와 SDK 등을 제공한다.

#### 4. Hyperledger Indy

분상 원장 기반의 디지털 ID 또는 DID(Decentralized ID)를 제공하기 위한 프레임워크이다.<br>신원을 인증하는 기관 없이 신원을 증명할 수 있는 자주적인(Self-Sovereign) 신원을 제공하는 데 목적을 두고 있다.

#### 5. Hyperledger Iroha

C++ 개발 환경을 사용하며, 안드로이드/IOS 등 모바일과 자바스크립트 등의 웹을 위한 인프라를 제공하는 플랫폼이다.

#### 6. Hyperledger Sawtooth

분산된 원장을 생성하고, 배포하고, 운영하기 위한 모듈러 플랫폼이다. PeET(Proof of Elapsed Time) 기반의 Consensus algorithm을 제공하고, Permissioned(허가형)와 Permissionless(참여형) 모두 지원한다.

## 하이퍼레저 패브릭의 특징

![하이퍼레저 패브릭이란? -입문](https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/5OMt/image/x7aEFCU1HyL4R39Q7cWCWE8Klqg.png)

### 1. 컴포넌트 모듈 단위로 네트워크를 구성한다

모듈 단위로 작동하기 때문에 블록체인 네트워크 구성이 비교적 명확하고, 이러한 모듈성(Modualr) <u>컴포넌트</u>들을 plugged(플러그인 형태)로 사용할 수 있기 때문에 다양한 형태의 네트워크 구성이 가능하다.<br><u>컴포넌트</u> : Consensus algorithm, Smart contract, 네트워크 레이어, Data store, 인증 서비스, API 등이 해당

### 2. 비트코인과 이더리움에서 사용하는 토큰 혹은 암호화폐 기반의 플랫폼이 아니다.

자산 발행 또는 토큰 발행을 스마트 계약으로 생성할 수 있지만, Public(개방형) 블록체인에서 사용되는 보상을 위한 화폐의 개념과는 다르다.

### 3. MSP(멤버쉽 서비스)를 이용해 참여 노드에 역할을 부여하고, 인증된 멤버만이 채널이라는 논리적 구성을 하거나 구성한 채널에 노드를 추가하고, 체인코드를 호출 할 수 있다.

MSP(멤버쉽 서비스)를 이용해 허가된 참가자만 패브릭 네트워크에 참여하게 할 수 있기 때문에 기업에 적용하기 좋은 블록체인 플랫폼이다.
