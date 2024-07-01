---
layout: post
title:  "[Hyperledger] 하이퍼레저 패브릭 2"
categories:
  - hyperledger
---



`deployCC` 명령어를 사용하지 않고 하이퍼레저 패브릭에서 체인코드를 배포하는 방법은 수동으로 체인코드 라이프사이클 명령어를 사용하는 것이다. 이는 체인코드 패키징, 설치, 승인, 커밋 등의 단계를 수동으로 수행하는 것을 포함한다. 다음은 이러한 단계를 하나씩 수행하는 방법이다

### 1. 체인코드 패키징

먼저 체인코드를 패키징한다

```
peer lifecycle chaincode package data-collector.tar.gz --path ../data-collector/go --lang golang --label data-collector_1.0
```

### 2. 체인코드 설치

각 피어에 체인코드를 설치한다. 예를 들어, `peer0.org1`에 설치하려면

```
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

peer lifecycle chaincode install data-collector.tar.gz
```

다음으로, `peer0.org2`에 설치하려면

```
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

peer lifecycle chaincode install data-collector.tar.gz
```

### 3. 체인코드 설치 확인

각 피어에서 설치된 체인코드 패키지 ID를 확인한다

```
peer lifecycle chaincode queryinstalled
```

출력에서 패키지 ID를 복사한다.

### 4. 체인코드 승인

각 조직에서 체인코드를 승인한다. 여기서 `<PACKAGE_ID>`는 이전 단계에서 복사한 패키지 ID이다.

```
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

peer lifecycle chaincode approveformyorg --orderer localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID mychannel --name data-collector --version 1.0 --package-id <PACKAGE_ID> --sequence 1
```

다음으로, `Org2`에서 승인하려면

```
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

peer lifecycle chaincode approveformyorg --orderer localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID mychannel --name data-collector --version 1.0 --package-id <PACKAGE_ID> --sequence 1
```

### 5. 승인 상태 확인

각 피어에서 승인 상태를 확인한다

```
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name data-collector --version 1.0 --sequence 1 --output json
```

### 6. 체인코드 커밋

모든 조직의 승인 후, 체인코드를 커밋한다

```
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID mychannel --name data-collector --version 1.0 --sequence 1 --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
```

### 7. 체인코드 커밋 확인

체인코드가 커밋되었는지 확인한다

```
peer lifecycle chaincode querycommitted --channelID mychannel --name data-collector
```

### 8. 체인코드 초기화 (선택 사항)

체인코드가 초기화 함수가 필요한 경우

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n data-collector --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'
```

이 과정을 통해 `deployCC` 스크립트를 사용하지 않고도 체인코드를 배포할 수 있다. 각 단계를 주의 깊게 따라야 하며, 특히 **환경 변수**를 정확히 설정해야 한다.