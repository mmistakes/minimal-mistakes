---
layout: single
title:  "[Reference] Spring Batch"
categories: Project
tag: [web, server, DB, spring boot, java]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# Batch란?

요청이 들어올때 마다 실시간으로 데이터를 처리 하는것이 아닌 일괄적으로 모아서 하는 작업을 말한다.<br>
이런 특성 덕분에 배치작업은 **정해진 시간에 대량의 데이터를 일괄적으로 처리**하는 특징을 가진다.

<br>

# Spring Batch

Spring Batch는 트랜잭션 관리, 작업 처리 통계, 작업 재시작, 로깅/추적 등 대용량 레코드 처리에 필수적인 기능을 제공한다.<br>
Spring Batch에서 배치가 실패하여 작업 재시작을 하게 된다면, 실패한 지점부터 실행하게 되며, 중복 실행을 막기 위해 성공한 이력이 있는 Batch는 동일한 파라미터로 실행 시 Exception이 발생하게 된다.

![batch](/images/reference/batch.png)<br>
<출처 : [https://spring.io/batch](https://spring.io/batch)>

>**[참고]**<br>
**Spring Batch**는 **Batch Job**을 관리하지만, Job을 구동하거나 실행시키는 기능은 지원하지 않는다.<br>
Spring에서 **Batch Job**을 실행시키기 위해서는 Quartz, Scheduler, Jenkins 등 전용 Scheduler를 사용해야 한다.

<br>

# Spring Batch 용어

`JobLauncher`<br>
Job과 JobParameters를 사용하여 Job을 실행하는 객체.

`Job`<br>
배치처리 과정을 하나의 단위로 만들어 놓은 객체.<br>
정해진 Step을 실행시킬 작업을 의미.

`Step`<br>
Job의 배치처리를 정의하고, 순차적인 단계를 캡슐화.<br>
Job은 최소한 1개 이상의 Step을 가져야 하며, Job의 실제 일괄 처리를 제어하는 모든 정보가 들어있다.<br>
(**Tasklet**, **Chunk**)

`JobInstance`<br>
Job의 실행 단위를 나타내며, Job을 실행시키게 되면 하나의 JobInstance가 생성된다.

`JobParameters`<br>
JobInstance를 JobParameters를 통해 구분할 수 있으며, JobInstance에 전달되는 매개변수 역할도 한다.(String, Double, Long, Date)

`JobExecution`<br>
JobInstance에 대한 실행 시도에 관한 객체.(실행 상태, 시작시간, 종료시간, 생성시간 등의 정보를 담고 있다.)

`JobRepository`<br>
위에 나와있는 모든 배치 처리 정보를 담고있는 매커니즘.<br>
Job이 실행되면 JobRepository에 JobExcution과 StepExecution을 생성하며, JobRepository에서 Execution 정보들을 저장하고 조회하며 사용하게 된다.

## Tasklet Vs Chunk

간단하게 구성할 때는 Tasklet이 좋지만, Spring Batch는 Chunk를 지향하고 있다.

`Tasklet` : 하나의 작업 기반으로 실행<br>
- 하나의 메서드로 구성 되어있는 간단한 인터페이스.
- 실패를 알리기 위해 예외를 반환하거나 throw할 때까지 execute를 반복적으로 호출.

<br>

`Chunk` : 하나의 큰 덩어리를 N개씩 나눠서 단위로 실행<br>
- Chunk란 처리 되는 커밋 row 수를 의미.
- Batch 처리에서 Chunk 단위로 Transaction을 수행하기 때문에 실패시 Chunk 단위 만큼 rollback이 된다.

**Chunk 지향 처리에서의 3가지 시나리오**<br>
- Read : DB에서 배치처리를 할 Data를 읽어온다.
- Processing : 읽어온 Data를 가공, 처리.(필수X)
- Write : 가공, 처리한 데이터를 DB에 저장

<br>

**Step의 종류 3가지(Chunk기준)**

- ItemReader
- ItemWriter
- ItemProcessor(필수X)

`ItemReader`<br>
Step에서 Item을 읽어오는 인터페이스.<br>
ItemReader에 대한 다양한 인터페이스가 존재하며 다양한 방법으로 Item을 읽어올 수 있다.

`ItemWriter`<br>
처리된 Data를 Write할 때 사용. Writer는 처리 결과물에 따라 Insert가 될 수도, Update가 될 수도있다.<br>
Writer는 기본적으로 Item을 Chunk로 묶어 처리.

`ItemProcessor`<br>
Reader에서 읽어온 Item 데이터를 처리하는 역할.