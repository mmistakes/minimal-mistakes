---
layout: single
title: "프로토타입"
categories: DeepDiveJS
tag: [JavaScript]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

# 프로토타입

자바스크립트는 명령형<sup>imperative</sup>, 함수형<sup>functional</sup>, 프로토타입 기반<sup>prototype-based</sup> 객체지향 프로그래밍<sup>OOP; Object Oriented Programming</sup>을 지원하는 멀티 패러다임 프로그래밍 언어다.

간혹 C++나 자바같은 클래스 기반 객체지향 프로그래밍 언어의 특징인 클래스와 상속, 캡슐화를 위한 키워드인 public, private, protected 등이 없어서 자바스크립트는 객체지향 언어가 아니라고 오해하는 경우도 있다. 하지만 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향 프로그래밍 언어다.

자바스크립트는 객체 기반의 프로그래밍 언어이며 **자바스크립트를 이루고 있는 거의 "모든 것"이 객체**다. 원시 타입<sup>primitive type</sup>의 값을 제외한 나머지 값들(함수, 배열, 정규 표현식 등)은 모두 객체다.

## 객체지향 프로그래밍

객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍<sup>Imperative programming</sup>의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 객체<sup>object</sup>의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

객체지향 프로그래밍은 실세계의 실체(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다. 실체는 특징이나 성질을 나타내는 **속성<sup>attribute/property</sup>**을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

예를 들어, 사람은 이름, 주소, 성별, 나이, 신장, 체중, 학력, 성격, 직업 등 다양한 속성을 갖는다. 이때 "이름이 아무개이고 성별은 여성이며 나이는 20세인 사람"과 같이 속성을 구체적으로 표현하면 특정한 사람을 다른 사람과 구별하여 인식할 수 있다. 

이러한 방식을 프로그래밍에 접목시켜보자. 사람에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 "이름"과 "주소"라는 속성에만 관심이 있다고 가정하자. 이처럼 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 **추상화<sup>abstraction</sup>**라 한다.

"이름"과 "주소"라는 속성을 갖는 `person`이라는 객체를 자바스크립트로 표현하면 다음과 같다. 

```javascript
// 이름과 주소 속성을 갖는 객체
const person = {
    name: 'Kwon',
    address: 'Seoul'
};
console.log(person); // {name: "Kwon", address: "Seoul"}
```

이때 프로그래머(subject, 주체)는 이름과 주소 속성으로 표현된 객체(object)인 `person`을 다른 객체와 구별하여 인식할 수 있다. 이처럼 **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조**를 객체라하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.

이번에는 원<sup>Circle</sup>이라는 개념을 객체로 만들어보자. 원에는 반지름이라는 속성이 있다. 이 반지름을 가지고 원의 지름, 둘레, 넓이를 구할 수 있다. 이때 반지름은 원의 **상태를 나타내는 데이터**이며 원의 지름, 둘레, 넓이를 구하는 것은 **동작**이다.

```javascript
const circle = {
    radius: 5, // 반지름
    // 원의 지름: 2r
    getDiameter() {
        return 2 * this.radius;
    },
    // 원의 둘레: 2πr
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    },
    // 원의 넓이: πrr
    getArea() {
        return Math.PI * this.radius ** 2;
    }
};
console.log(circle);
// {radius: 5, getDiameter: f, getPerimeter: f, getArea: f}
console.log(circle.getDiameter()); // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea()); // 78.53981633974483
```

이처럼 객체지향 프로그래밍은 객체의 **상태<sup>state</sup>**를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작<sup>behavior</sup>**을 하나의 논리적인 단위로 묶어 생각한다. 따라서 객체는 **상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조**라고 할 수 있다. 이때 객체의 상태 데이터를 프로퍼티<sup>property</sup>, 동작을 메서드<sup>method</sup>라 부른다.

각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만 자신의 고유한 기능을 수행하면서 다른 객체와 관계성<sup>relationship</sup>을 가질 수 있다. 다른 객체와 메시지를 주고받거나 데이터를 처리할 수도 있다. 또는 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 한다.

## 상속과 프로토타입

상속<sup>inheritance</sup>은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다. 코드 재사용은 개발 비용을 현저히 줄일 수 있는 잠재력이 있으므로 매우 중요하다.

```javascript
// 생성자 함수
function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        // Math.PI는 원주율을 나타내는 상수다.
        return Math.PI * this.radius ** 2;
    };
}
// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false
console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```



