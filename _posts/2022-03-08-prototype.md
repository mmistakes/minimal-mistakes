---
layout: single
title: "프로토타입(Prototype)이란?"
categories: [JavaScript]
tag: [prototype]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

## 프로토타입이란 무엇인가 ?

- 자바스크립트를 공부하는 과정에서 흔히 들어보게 되는 용어 중 하나로 자바스크립트는 프로토타입 기반의 언어이다.
- 이를 기반으로 확장과 재사용성을 높여줍니다.ㄴㄴ
- 사전적의미로는 Protoype은 원형입니다. 이러한 사전적의미와 같은 개념으로 자바스크립트에서도 사용합니다.
- **즉, 생성된 객체는 자기자신의 프로토타입을 갖는다. 즉, 자기자신이 만들어지게된 원형을 안다.**



## Prototype VS Class

- 지금은 자바스크립트도 Class를 문법적으로 지원하기 시작했지만 원래 자바스크립트는 프로토타입 기반의 언어입니다. 

- 객체의 원형인 프로토타입을 이용하여 객체의 확장과 재사용, 상속 등을 구현해나갔습니다.

- Prototype 객체는 new 연산자에 의해서 생성된 객체입니다.

- 이 객체는 공유 프로퍼티, 메서드 등을 제공하기 위해 사용됩니다.

  ```js
  fruit = {name: 'apple'};
  console.log(fruit.name); // apple
  
  // 속성 추가
  fruit.expiration = '20220308';
  console.log(fruit.expiration); 
  
  // 속성이 있는지 없는지 체크
  console.log(fruit.hasOwnProperty('expiration')); // true
  console.log(fruit.hasOwnProperty('country')); // false 
  ```



## 자바스크립트 함수의 내부와 객체간의 관계

- 함수가 만들어지고 수행이 되어지면 내부에서는

  - 함수 자신과 예를 들면 "Animal 함수" 자신과 그리고 자신과 같은 이름의 "Animal 프로토타입 객체" 가 생성됩니다.

  - Animal 함수 멤버로 prototype 속성이 생성되고 다른곳에 생성된 같은 함수 이름의 "Animal 프로토타입 객체" 를 가리킵니다.(참조)

    ```js
      Animal 함수                                              Animal 프로토타입 객체
    + prototype --> Animal 프로토타입 객체(참조)				   + construtor --> Animal 함수(참조)			
    														  + run()
    // 이런 상황일 때 ==> "Animal 프로로타입 객체" --> 생성자 함수와 new 연산자를 통해서 만들어내는 모든 객체의 원형이 되는 객체입니다.
    
    let tiger = new Animal();
    let lion = new Animal();
    // 이렇게 new 연산자와 생성자 함수를 이용하여 객체 생성시 각 객체에서는 __proto__ 속성이 자동으로 생성됩니다.
    // __proto__는 이 객체가 만들어질 수 있도록 해준 원형인 "Animal 프로토타입 객체" 가르킵니다.
    
    ```

    ![r1](https://user-images.githubusercontent.com/81172451/157412574-97dc0143-120c-43a5-9fd1-1a4956843456.png)

  - Animal 프로토타입 객체는 tiger, lion 과 같은 객체들의 원형이 되는 객체입니다.

    따라서, tiger, lion 과 같은 객체들은 모두 이 "Animal 프로토타입 객체" 에 접근이 가능하고, 동시에 Animal 프로토타입 객체에 멤버 한개를 추가하면 tiger, lion 객체들도 동시에 이 멤버를 공유해서 모두가 사용 가능합니다.

    ```js
    Animal.prototype.aniRun = function() {
        return "동물이 뛴다.";
    }
    console.log(tiger.aniRun()); // 동물이 뛴다.
    console.log(lion.aniRun()); // 동물이 뛴다.
    ```

    ![r2](https://user-images.githubusercontent.com/81172451/157412590-b894cd40-30d6-4d41-b0e9-eb8dda494c74.png)

  - 어떤 함수(Animal)의 "(Animal) 프로토타입 객체"는 객체의 생성을 위한 부모격의 원형이 되는 객체입니다.
  
  - 이 프로토타입(원형)으로 생성된 객체들은 모두 이 "프로토타입 객체"의 멤버들에 접근이 가능하고 사용할 수 있습니다. (생성된 객체들과 공유)
  
  - 새롭게 생성된 객체에서 원형의 메서드를 다시 재정의해서 사용할 수도 있습니다.