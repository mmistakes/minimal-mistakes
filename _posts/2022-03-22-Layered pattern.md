---
layout: single
title: "Layered pattern"
categories: Reference
tag: [total, pattern]
---

## 01. seperation of concern (관심사의 분리)

![screencapture-7929729](/images/screencapture-7929729.png)

현재 데이터의 흐름은 클라이언트에서 API 를 요청하면 서버는 DB 에서 데이터를 받고 서버는 다시 클라이언트로 정보를 보내주는 흐름이다.

![screencapture-7929890](/images/screencapture-7929890.png)

식당에서의 주문을 예를 들면 고객은 직원에게 요청을 하고 직원은 재료를 이용해서 음식을 만든다.

하지만 직원이 혼자라면 할 일이 너무 많다.

그리고 직원은 고객을 맞고 주문을 받는일을 정말 잘하지만 재료 가공이나 요리를 잘 못한다.

**그래서 각자의 능력을 증폭 시킬 수 있게 다양한 직원을 고용한다.**

![screencapture-7929918](/images/screencapture-7929918.png)

직원 1, 2, 3을 고용하여 각자가 잘하는 업무를 전담하며 **많은 주문이 들어와도 수월하게 수행하며 각자의 업무가 있어서 누가 무슨일을 하는지 명확하게 확인 할 수 있다.**

## 02. Layered pattern

![screencapture-7930678](/images/screencapture-7930678.png)

레이어 **계층은 크게 3가지가 있다**.

클라이언트와 가장 가까운 **Presentation layer**

비지니스 로직을 담당하는 **Business layer**

데이터베이스와 가장 가까운 **Persistence layer**

### 02-1. Presentation Layer

시스템을 사용하는 클라이언트 시스템과 직접적으로 연결되는 부분으로 API 앤드포인트를 정의한다.

**HTTP 로 읽어 들어오는 로직을 구현한다**.

실제 시스템이 구현하는 비지니스 로직은 다음 레이어로 전달한다.

### 02-2. Business Layer

**비지니스 로직이란 기업마다 사용하는 규정이나 규약을 로직으로 구현한 곳이다.**

예를 들면 비밀번호의 길이가 8자 미만이라면 회원가입을 거부하는 로직을 구현한다.

### 02-3. Persistence Layer

**데이터베이스와 관련된 로직을 구현한다**.

필요한 데이터를 생성, 수정, 읽기 등을 처리한다.

#### 모든 레이어는 단방향성을 띈다.

지금까지 보면 클라이언트는 Persentation layer에게 API 를 요청하고 Persentation layer 는 받은 API를 읽어 들어오기만 하고 실제 시스템이 구현하는 로직은 다임 레이어로 전달한다.

그로인해서 **다음으로 수행되는 로직과 연관이 없으며, 당연히 데이터베이스와도 연관이 없다.**

**오직 클라이언트에서 API 요청을 받고 Business layer 로 넘겨주는 단방향성을 띄는것이다**.

**의존적이지 않고 독립적이다**. 그래서 **필요에 따라서 layer만 교체할 수 있어 유지보수에 용이하다.**

#### 그림으로 쉽게 보면

![screencapture-7931037](/images/screencapture-7931037.png)

controller, service, model 로 나눌 수 있다.

**각각 처리하는 기능이 다르고 실제 파일구조를 생성할 때 해당 명칭을 사용한다.**
