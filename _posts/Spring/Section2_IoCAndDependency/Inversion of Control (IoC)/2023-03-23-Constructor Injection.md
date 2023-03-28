---
layout: single
title: "Constructor Injection"
categories: Spring
tag: [Java,IoC,Inversion of Control,Constructor Injection]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  

---

# 생성자 주입

## How Spring Process your application

![](/images/2023-03-23-Constructor%20Injection/2023-03-23-03-14-48-image.png)

## Process

![](/images/2023-03-23-Constructor%20Injection/2023-03-23-03-29-03-image.png)

![](/images/2023-03-23-Constructor%20Injection/2023-03-23-03-29-13-image.png)

![](/images/2023-03-23-Constructor%20Injection/2023-03-23-03-29-29-image.png)

## 정리

- Coach 인터페이스, Demo컨트롤러, Cricket Coach implementation 을 갖고 Spring 은 뒤에서 작동한다.

- Spring은 새로운 코치 인스턴스랑 크리켓 코치 인스턴스를 만들고 Demo 컨트롤러를 갖고 생성자 주입을 한다.

- 다시말하자면 coach를 demo controller에 주입한다.

- injection은 helper 혹은 dependency로 생각하면 된다.

- coach는 실제 컨트롤러의 helper 혹은 dependency이다.
