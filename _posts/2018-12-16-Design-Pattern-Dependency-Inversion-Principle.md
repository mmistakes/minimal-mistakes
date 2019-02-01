---
layout: post
title: (주말 공부) (디자인 패턴) 의존성 역전 원칙 (Dependency Inversion Principle)
key: 20181216
tags: pattern DesignPattern DIP DependencyInversionPrinciple 의존성_역전
excerpt: "디자인 패턴에서 의존성 역전 원칙(Dependency Inversion Principle)을 살펴보고 실제로 어떻게 적용할지를 살펴본다."
toc: true
toc_sticky: true
---

# 주의

아래의 영어 작문은 한글을 기반으로 작성된 것으로 실제 원어민의 영어 작문이 아님을 밝힘. 이에 영어 표현에 있어서 영어적인 표현이 아닐 수 있음에 주의.

English translation is not based on native speakers' writings. Therefore, When you read this article in english, you should take care of missing words and sentences.

# 의존성 역전 원칙이란

Robert C. Martin 의 저서인 `Agile Principles Pattern and Practices in C#` 에 따르면 의존성 역전 원칙(Dependency Inversion Principle)에 대해 다음과 같이 말하고 있다.

상위 계층 모듈은 하위 모듈의 변경에 덜 민감해야 한다. 상위 모듈이라 함은 어플리케이션의 비즈니스 모델 혹은 중요한 정책 설정인데 이는 어플리케이션의 정체성(identity)를 의미한다.

이러한 정체성은 쉽게 변경되어서는 안된다. 따라서 추상(abstraction)을 바탕으로 상위 모듈과 하위 모듈 간의 약속(인터페이스)를 정의한다. *그러나 여기서 인터페이스를 선언하는 측은 하위 모듈이 아닌 상위 모듈이다.*

상위 모듈에서 추상을 정의하고 이를 하위 모듈이 따르도록 하는 것은 다음의 이점이 있다.

- 전통적인 상위 모듈의 하위 모듈에 대한 의존을 역전
- 하위 모듈의 변경에 상위 모듈은 민감하지 않음

Accodring to the book "Agile Principles Pattern and Practices in C#" that is written by Robert C. Martin, The book said that High-Level module should not depend on Low-Level modules. Instead, Both should depend on abstractions.

In the concept, High-Level modules are application's business model, or important policy settings. that is, it is an identity of application.

The identity shouldn't be changed easily. Therefore, we do make a contract, which are based on abstractions, between high-level modules and low-level modules using an interface. It is rather a high-level module than a low-level module that declare abstractions(interface).

There are some benefits when high-level module declare abstractions(interface) and let low-level module follow these contracts(promise).

- Inverted traditional dependency relationship between high and low-level modules
- High-Level modules are insensitive in the change of low-level modules.

## 상위 모듈의 특성

원칙에서 언급하는 상위 모듈이란 아래의 특성을 가진다.

- 중요한 정책 결정을 포함
- 어플리케이션의 비즈니스 모델을 포함
- 어플리케이션의 정체성(identity)를 포함

The principle mentioned about the high-level modules, let's take a look at what characteristics of high-level module.

- Include an important policy settings
- Include an application's business models
- Represent an application's identity.

## 원칙

Robert C. Martin 은 자신의 저서에 의존성 역전 원칙을 이렇게 말하고 있다.

- 상위 모듈은 하위 모듈에 의존해서는 안된다. 두 모듈 모두 추상화에 의존해야 한다.
- 추상화는 세부적인 내용에 의존해서는 안된다. 세부사항이 추상에 의존해야 한다.

According to Robert C. Martin's book, He said about the principle like the below.

- High-level modules should not depend on low-level modules. Both should depends on abstractions.
- Abstractions should not depend upon details. Details should depend upon abstractions.

## 사례

여러 자료를 살펴본 결과 의존성 역전 원칙에 대한 몇 가지 그림을 찾을 수 있었고 모든 그림들은 위의 원칙을 아래와 같이 표현하고 있다.

After reviewing some articles about depdency inversion principle, I found some pictures that describe the concept of DIP. Every pictures present the concept which was described at the beginning of this document.

![DIP-example-01][dip-ex1]

나 역시 이러한 사고 방법에 맞추어 몇 가지 다이어그램을 그렸고 현재 설계 중인 프로젝트에 맞게 아래와 같이 그려보았다.

I also did draw some diagrams to depict the concept. It is based on current working project.

![DIP-example-02][dip-ex2]

## 통찰

많은 훌륭한 개발자들이 남긴 말들이 있어 이를 언급하고 여기에서 여러분들이 통찰을 얻기를 바란다.

Many marvelous develops mention about the principle. I would write them down to provide you some insight.

### What is a layer

Booch 에 따르면 '구조화가 잘된 객체 지향 아키텍처는 분명하게 정의된 레이어가 존재한다. 각 레이어는 잘 정의되고 통제된 인터페이스를 통해서 일관성잇는 서비스 집합을 제공한다.'

According to Booch, "all well structured object-oriented architectures have clearly-defined layers, with each layer providing some coherent set of services through a well-defined and controlled interface.

## 나쁜 설계의 예

나쁜 설계의 예를 들어 상위 모듈의 하위 모듈에 대한 종속성을 가지는 경우 어떠한 일이 발생하는지를 알아보자.

Through a bad design, Let's talk about what bad implication of the case that high-level module depends on low-level module might has.

![DIP-example-03][dip-ex3]

위의 설계대로 구현한 경우 아래와 같은 의존성 문제를 겪을 수 있다.

If you design the class like the above one, you might have a dependency problem like the below

- Policy 레이어는 Mechanism 레이어에 종속된다.
- Mechanism 레이어는 Utility 레이어에 종속된다.
- 따라서, Policy 레이어는 Utility 레이어에 종속된다.

- Policy layer depends on Mechanism layer
- Mechanism layer depends on Utility layer
- So, Policy layer depends on Utility layer

그러므로, Utility 레이어의 변화는 Policy 레이어의 변화를 촉구할 가능성이 존재한다. 이러한 구조는 잠재적으로 혹은 점진적으로 시스템에 해를 끼치는 구조라고 간주할 수 있다.

Therefore, There would be posibility that the changes of Utility layer might change the implementation of Policy layer. This structure could be considered as insidious structure.

## 응용 패턴

Dependency Inversion Principle 은 말 그대로 원칙이다. 이러한 원칙을 지키기 위한 패턴은 다음과 같다.

The Dependency Inversion Principle is a principle. There are two representative patterns to implmenet the principle.

- Dependency Injection Pattern
- Service Locator Pattern

특히, Depedency Injection Pattern(DI)의 경우 ASP.NET MVC 프레임워크, Java Spring 프레임워크에서 기본적으로 제공한다.
Especially, In case of DI Pattern, ASP.NET MVC Framework and Java Spring Framework basically provides it.

## 결론

지금까지 의존성 역전 원칙에 대해 알아 보았다. 모든 원칙은 상황에 따라서 그 적용의 여부가 다르다. 이는 경험과 효율성에 대한 고민을 통해서 이루어진다. 즉, 정답은 없다는 말이다. 그러나 언제나 그렇듯 효율적인 방향은 존재한다. 그리고 이를 따르거나 그렇지 않거나는 개발 조직의 성향이 결정함을 명심하자.

## 참조

아래의 내용을 참조하여 위의 컨텐츠를 작성하였다. 비판적 수용은 언제나 필수인 듯하다. 아낌없는 토론을 바란다.

- Agile Principles Patterns and Practices in CSharp (Robert C. Martin)
- Wekipedia.com

<!-- Images Reference Links -->
[dip-ex1]: /assets/img/2018.12/dip_01.png
[dip-ex2]: /assets/img/2018.12/dip_02.png
[dip-ex3]: /assets/img/2018.12/dip_03.png

<!-- External Reference Links -->

[1]: https://www.shellandco.net/wmic-command-ubuntu-16-04-lts/ "Wmic Command in Ubuntu 16.04 LTS"
[2]: https://stackoverflow.com/questions/38859777/windows-10-wmic-wmi-remote-access-denied-with-local-administrator "Windows 10 Enable Wmi Remoting"

---

<!-- End Of Documents -->
If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
