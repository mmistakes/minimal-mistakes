---
layout: post
title:  "[Hyperledger] 하이퍼레저 패브릭 3"
categories:

- hyperledger
---

<h1>하이퍼레저 패브릭 네트워크 구성 파일 작성 및 스마트 컨트랙트 풀 작성



### 1. 네트워크 구성 파일 준비

#### 하이퍼레저 패브릭 바이너리 및 Docker 이미지 다운로드

하이퍼레저 패브릭 바이너리와 Docker 이미지를 다운로드한다.

``````bash
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.0 1.4.9
``````

#### Docker Compose 파일 작성

하이퍼레저 패브릭 네트워크를 정의하는 `docker-compose.yaml` 파일을 작성한다. 이는 기본적인 Orderer와 Peer 서비스를 포함한다.

``````yaml
version: '2'

volumes:
  peer0.org1.example.com:
  orderer.example.com:

networks:
  byfn:

services:
  orderer.example.com:
    container_name: orderer.example.com
    image: hyperledger/fabric-orderer:2.2.0
    environment:
      - ORDERER_GENERAL_LOGLEVEL=debug
      - ORDERER_GENERAL_LISTENADDRESS=0.0.0.0
      - ORDERER_GENERAL_GENESISMETHOD=file
      - ORDERER_GENERAL_GENESISFILE=/var/hyperledger/orderer/orderer.genesis.block
      - ORDERER_GENERAL_LOCALMSPID=OrdererMSP
      - ORDERER_GENERAL_LOCALMSPDIR=/var/hyperledger/orderer/msp
    volumes:
        - ./channel-artifacts/genesis.block:/var/hyperledger/orderer/orderer.genesis.block
        - ./crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp:/var/hyperledger/orderer/msp
        - orderer.example.com:/var/hyperledger/production/orderer
    ports:
      - 7050:7050
    networks:
      - byfn

  peer0.org1.example.com:
    container_name: peer0.org1.example.com
    image: hyperledger/fabric-peer:2.2.0
    environment:
      - CORE_PEER_ID=peer0.org1.example.com
      - CORE_PEER_ADDRESS=peer0.org1.example.com:7051
      - CORE_PEER_LISTENADDRESS=0.0.0.0:7051
      - CORE_PEER_CHAINCODEADDRESS=peer0.org1.example.com:7052
      - CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:7052
      - CORE_PEER_GOSSIP_BOOTSTRAP=peer0.org1.example.com:7051
      - CORE_PEER_GOSSIP_EXTERNALENDPOINT=peer0.org1.example.com:7051
      - CORE_PEER_LOCALMSPID=Org1MSP
    volumes:
        - ./crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp:/etc/hyperledger/fabric/msp
        - ./crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls:/etc/hyperledger/fabric/tls
        - peer0.org1.example.com:/var/hyperledger/production
    ports:
      - 7051:7051
    networks:
      - byfn
``````

### 2. 체인코드 개발

#### 체인코드 작성

체인코드는 스마트 컨트랙트 풀에서 템플릿을 저장하고 관리하는 로직을 포함해야하는 `smartcontract_pool.go` 파일을 작성한다.

``````go
package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
    contractapi.Contract
}

type ContractTemplate struct {
    ID      string `json:"id"`
    Name    string `json:"name"`
    Version string `json:"version"`
    Code    string `json:"code"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
    templates := []ContractTemplate{
        {ID: "1", Name: "Template1", Version: "1.0", Code: "code1"},
        {ID: "2", Name: "Template2", Version: "1.0", Code: "code2"},
    }

    for _, template := range templates {
        templateJSON, err := json.Marshal(template)
        if err != nil {
            return err
        }

        err = ctx.GetStub().PutState(template.ID, templateJSON)
        if err != nil {
            return err
        }
    }

    return nil
}

func (s *SmartContract) CreateTemplate(ctx contractapi.TransactionContextInterface, id string, name string, version string, code string) error {
    template := ContractTemplate{
        ID:      id,
        Name:    name,
        Version: version,
        Code:    code,
    }

    templateJSON, err := json.Marshal(template)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(id, templateJSON)
}

func (s *SmartContract) QueryTemplate(ctx contractapi.TransactionContextInterface, id string) (*ContractTemplate, error) {
    templateJSON, err := ctx.GetStub().GetState(id)
    if err != nil {
        return nil, err
    }
    if templateJSON == nil {
        return nil, fmt.Errorf("template %s does not exist", id)
    }

    var template ContractTemplate
    err = json.Unmarshal(templateJSON, &template)
    if err != nil {
        return nil, err
    }

    return &template, nil
}

func main() {
    chaincode, err := contractapi.NewChaincode(new(SmartContract))
    if err != nil {
        fmt.Printf("Error create smart contract: %s", err.Error())
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting smart contract: %s", err.Error())
    }
}

``````

#### 체인코드 컴파일

체인코드를 컴파일한다.

``````bash
GO111MODULE=on go mod vendor
go build
``````

### 3. 체인코드 배포 및 인스턴스화

#### 체인코드 설치 및 인스턴스화

위에서 작성한 Docker Compose 파일을 사용하여 네트워크를 시작한 후, 체인코드를 설치하고 인스턴스화한다.

``````bash
docker exec -it cli bash

# 체인코드 설치
peer chaincode install -n smartcontractpool -v 1.0 -p /opt/gopath/src/github.com/chaincode/smartcontract_pool

# 체인코드 인스턴스화
peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n smartcontractpool -v 1.0 -c '{"Args":[""]}'

``````

### 4. 체인코드 사용

체인코드를 호출하여 템플릿을 생성하고 조회할 수 있다.

#### 템플릿 생성

``````bash
peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n smartcontractpool -c '{"function":"CreateTemplate","Args":["3","Template3","1.0","code3"]}'
``````

#### 템플릿 조회

``````bash
peer chaincode query -C mychannel -n smartcontractpool -c '{"function":"QueryTemplate","Args":["3"]}'
``````