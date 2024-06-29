---
title: "스프링 DI(Dependency Injection) 3가지 방법과 장단점"
date: 2024-06-29
categories: spring
comments: false
---

## 의존성 주입(DI)이란?
스프링 프레임워크에서는 빈(Bean) 주입을 통해 객체 간의 의존성을 관리합니다. 빈 주입 방식에는 생성자 주입, 세터 주입, 필드 주입이 있습니다. 각 방식의 장단점과 사용 방법을 알아봅시다.

## DI 3가지 방법
- 생성자 주입 (Constructor Injection)  
객체 생성 시점에 의존성을 주입하는 방식입니다.
```java
@Service
public class MyService {
    private final Dependency dependency;

    public MyService(Dependency dependency) {
        this.dependency = dependency;
    }
}
```
    - 장점
        - 의존성을 불변(immutable)하게 유지할 수 있습니다.
        - 의존성을 주입하지 않으면 객체를 생성할 수 없어, 의존성 주입이 필수임을 보장합니다.
        - 순환 의존성을 방지할 수 있습니다.
    - 단점
        - 의존성이 많을 경우 생성자가 복잡해질 수 있습니다.

- 세터 주입 (Setter Injection)   
세터 메서드를 통해 의존성을 주입하는 방식입니다.
```java
@Service
public class MyService {
    private Dependency dependency;

    @Autowired
    public void setDependency(Dependency dependency) {
        this.dependency = dependency;
    }
}
```
    - 장점
        - 선택적 의존성을 주입할 때 유용합니다.
        - 코드가 더 간결해질 수 있습니다.
    - 단점
        - 객체가 불완전한 상태로 생성될 수 있습니다.
        - 의존성이 변경 가능(mutable)하여 객체의 상태가 예측하기 어려워질 수 있습니다.

- 필드 주입 (Field Injection)  
클래스 필드에 @Autowired 어노테이션을 사용하여 의존성을 주입하는 방식입니다.
```java
코드 복사
@Component
public class MyService {
    @Autowired
    private Dependency dependency;
}
```
    - 장점
        - 코드가 가장 간결하고 설정이 쉽습니다.
    - 단점
        - 테스트하기 어렵고, 의존성 주입이 이루어지기 전에 객체를 초기화할 수 없습니다.
        - 순환 의존성 문제를 유발할 수 있습니다.

## 추천 방식
기본적으로 생성자 주입 (Constructor Injection)을 추천하지만 상황에 따라서 세터 주입 방식도 사용합니다.  
생성자 주입 방식은 런타임 시점에 의존 객체가 변경될 우려가 없어 안전성이 보장되고 테스트에 용이합니다.
순환 의존성도 방지할 수 있어서 안전합니다.  
세터 주입 방식은 동적으로 의존성을 변경할 때 사용합니다.

## 결론
각 주입 방식은 상황에 따라 적절히 사용해야 합니다. 생성자 주입은 불변성과 테스트 용이성 측면에서 권장됩니다.
세터 주입은 선택적 의존성 주입에 적합하고 필드 주입은 세 가지중 제일 간단하지만 테스트와 유지보수 측면에 불리하므로 사용에 주의가 필요합니다.