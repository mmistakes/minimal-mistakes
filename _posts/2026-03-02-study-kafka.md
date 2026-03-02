---
layout: post
title: "Apache Kafka 기초: 메시지 스트리밍의 핵심 이해하기"
date: 2026-03-02 10:05:59 +0900
categories: [data-infra]
tags: [study, kafka, streaming, infra, automation]
---

## 왜 Kafka가 중요한가?

Kafka는 대규모 실시간 데이터 처리의 중추입니다. 금융 거래, 로그 수집, 사용자 이벤트 추적 등 모든 곳에서 필요합니다.

초당 수백만 건의 메시지를 안정적으로 처리해야 하는 프로덕션 환경에서 Kafka 없이는 불가능합니다.

## 핵심 개념

- **Producer(생산자)**
  데이터를 Kafka에 보내는 애플리케이션입니다. 웹 서버, 센서, 데이터베이스 등이 될 수 있습니다.

- **Consumer(소비자)**
  Kafka에서 데이터를 읽어가는 애플리케이션입니다. 분석, 저장, 실시간 처리 등을 수행합니다.

- **Topic(토픽)**
  메시지의 카테고리입니다. 신문사의 섹션처럼 같은 주제의 메시지들이 모입니다.

- **Partition(파티션)**
  토픽을 여러 개로 나눈 것입니다. 병렬 처리를 가능하게 하고 확장성을 제공합니다.

- **Broker(브로커)**
  Kafka 서버 자체입니다. 메시지를 저장하고 전달하는 역할을 합니다.

## 실습: 간단한 Producer와 Consumer

먼저 Python 클라이언트를 설치합니다.

```bash
pip install kafka-python
```

Producer 코드입니다.

```python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

for i in range(10):
    message = {'id': i, 'text': f'Message {i}'}
    producer.send('my-topic', value=message)
    print(f'Sent: {message}')

producer.flush()
producer.close()
```

Consumer 코드입니다.

```python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'my-topic',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    auto_offset_reset='earliest'
)

for message in consumer:
    print(f'Received: {message.value}')
```

두 스크립트를 다른 터미널에서 실행하면 메시지가 전달되는 것을 확인할 수 있습니다.

## 흔한 실수들

- **Partition 개수를 무시하기**
  Partition이 1개면 병렬 처리가 불가능합니다. 처음부터 적절한 개수로 설정하세요.

- **Consumer Group을 이해하지 못하기**
  같은 group의 여러 consumer는 다른 partition을 처리합니다. Group 설정을 명확히 하세요.

- **Offset 관리 소홀**
  auto_offset_reset을 제대로 설정하지 않으면 메시지를 놓치거나 중복 처리합니다.

- **에러 처리 없이 코딩하기**
  네트워크 장애, 브로커 다운 등에 대비한 재시도 로직이 필수입니다.

- **메시지 크기 제한 무시**
  기본값은 1MB입니다. 큰 파일을 보낼 때는 설정을 변경해야 합니다.

## 오늘의 실습 체크리스트

- [ ] Kafka 로컬 환경 설정 (Docker 또는 직접 설치)
- [ ] Topic 생성하기: `kafka-topics.sh --create --topic my-topic --partitions 3 --replication-factor 1`
- [ ] Producer 스크립트 작성 및 실행
- [ ] Consumer 스크립트 작성 및 실행
- [ ] Consumer Group 개념 이해하기
- [ ] Kafka UI 또는 CLI로 메시지 확인하기
- [ ] 여러 Consumer를 같은 group으로 실행해보기
