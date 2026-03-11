---
layout: post
title: "Apache Kafka 기초: 실무에서 필요한 메시지 큐 이해하기"
date: 2026-03-11 10:03:03 +0900
categories: [data-infra]
tags: [study, kafka, streaming, infra, automation]
---

## 왜 Kafka가 중요한가?

현대적인 데이터 인프라에서 Kafka는 필수 도구입니다. 마이크로서비스 아키텍처에서 서비스 간 통신, 실시간 데이터 스트리밍, 로그 수집 등 다양한 용도로 사용됩니다.

특히 대규모 트래픽을 처리하는 시스템에서 느슨한 결합(loose coupling)을 유지하면서 높은 처리량을 보장합니다. Netflix, LinkedIn, Uber 같은 대형 기업들이 Kafka를 핵심 인프라로 사용하는 이유입니다.

## 핵심 개념

- **Topic**
  메시지가 저장되는 논리적 채널입니다. 데이터베이스의 테이블처럼 생각하면 됩니다.

- **Partition**
  Topic을 분산 처리하기 위해 나누는 물리적 단위입니다. 각 Partition은 순서를 보장하며 병렬 처리를 가능하게 합니다.

- **Producer**
  메시지를 Topic에 보내는 클라이언트입니다. 어느 Partition으로 보낼지 결정합니다.

- **Consumer**
  Topic에서 메시지를 읽는 클라이언트입니다. Consumer Group을 통해 같은 메시지를 여러 곳에서 처리할 수 있습니다.

- **Broker**
  Kafka 서버 인스턴스입니다. 여러 Broker가 클러스터를 이루어 고가용성을 제공합니다.

## 실습: 간단한 Producer-Consumer 구현

먼저 Docker로 Kafka를 실행합니다.

```bash
docker run -d --name kafka -p 9092:9092 \
  -e KAFKA_BROKER_ID=1 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  confluentinc/cp-kafka:latest
```

Python에서 Producer를 작성합니다.

```python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

for i in range(10):
    message = {'id': i, 'text': f'Message {i}'}
    producer.send('test-topic', value=message)
    print(f'Sent: {message}')

producer.flush()
producer.close()
```

이제 Consumer를 작성합니다.

```python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'test-topic',
    bootstrap_servers=['localhost:9092'],
    group_id='test-group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    print(f'Received: {message.value}')
```

Producer를 먼저 실행한 후 Consumer를 실행하면 메시지가 전달됩니다.

## 흔한 실수

- **Partition 수를 무분별하게 늘리기**
  Partition이 많을수록 관리 복잡도가 증가하고 메모리 사용량이 늘어납니다. 처리량 요구사항에 맞춰 신중하게 설정하세요.

- **Consumer Group 설정 무시하기**
  같은 Consumer Group의 Consumer들은 Partition을 나눠서 처리합니다. 이를 모르면 중복 처리나 누락이 발생합니다.

- **Offset 관리 소홀**
  Consumer가 어디까지 읽었는지 추적하지 않으면 메시지 손실이나 중복 처리가 발생합니다. auto.offset.reset 설정을 명확히 하세요.

- **Replication Factor를 1로 설정**
  Broker가 장애나면 데이터가 손실됩니다. 프로덕션에서는 최소 3으로 설정하세요.

- **Producer의 acks 설정 무시**
  acks=1은 빠르지만 데이터 손실 위험이 있습니다. 중요한 데이터는 acks=all을 사용하세요.

## 오늘의 실습 체크리스트

- [ ] Kafka 클러스터 로컬 환경에 설치 또는 Docker로 실행
- [ ] kafka-topics.sh로 Topic 생성해보기
- [ ] 위의 Producer 코드 실행하여 메시지 전송
- [ ] 위의 Consumer 코드 실행하여 메시지 수신 확인
- [ ] Consumer Group 개념 이해하고 여러 Consumer 실행해보기
- [ ] kafka-console-consumer.sh로 Topic 내용 확인
- [ ] Partition 수를 변경하고 메시지 분배 방식 관찰
