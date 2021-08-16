---
layout: single
tags: 
 - javascript
title: "[javascript] wecode 사전스터디 week3"
---





- # 객체란 무엇이며 필요한 이유

  자바스크립트의 기본 타입(data type)은 객체(object)입니다.

  객체란 이름(name)과 값(value)으로 구성된 프로퍼티(property)의 정렬되지 않은 집합입니다.

  프로퍼티의 값으로 함수가 올 수도 있는데, 이러한 프로퍼티를 메소드(method)라고 합니다.

  자바스크립트에서는 숫자, 문자열, 불리언, undefined 타입을 제외한 모든 것이 객체입니다.

  하지만 숫자, 문자열, 불리언과 같은 원시 타입은 값이 정해진 객체로 취급되어, 객체로서의 특징도 함께 가지게 됩니다.

  **객체가 필요한 이유는 관련된 정보를 서로 연결해주며, key값으로 해당 정보에 쉽게 접근할 수 있게 해주기 때문입니다.**



- # 객체에서 property, key, value

  자바스크립트의 객체는 key 값과 key에 해당하는 데이터인 value 값이 쌍으로 이루어진 property로 구성됩니다. 객체는 {} 안에 key와 value를 쌍으로 묶어 만들고, key값이 여러개일 때는 ,로 구분합니다.

  ```js
  let 객체이름 = {
  
      프로퍼티1이름 key : 프로퍼티1의값 value ,
  
      프로퍼티2이름 key2 : 프로퍼티2의값 value,
  
      ...
  
  };
  ```

  

- # 객체에 접근 하는 두 가지가 있는 이유

  객체 속성 접근 방법은 dot notation과 bracket notation 두 가지가 있습니다.

  ### **dot notation**

  읽기 더 쉽고 자주 사용

  프로퍼티 식별자는 알파벳( **_** & **$** 포함)로 시작

  숫자로 시작할 수 없음

  variables를 포함할 수 없음

  ```js
  let obj = {
  	cat: 'meow',
  	dog: 'woof'
  };
  
  let sound = obj.cat; // objectName.propertyName;
  console.log(sound); // meow
  ```

  ### **bracket notation**

  프로퍼티 식별자는 문자열(String)을 갖는다.

  어떤 문자든 공백을 포함할 수 있다.

  변수가 문자열로 해석되면 변수 또한 쓸 수 있다.

  숫자로 시작해도 가능

  ```js
  let obj = {
  	cat: 'meow',
  	dog: 'woof'
  };
  
  let sound = obj.['cat']; // objectName["propertyName"]
  console.log(sound); // meow
  ```

  ```js
  let obj = {
  	cat: 'meow',
  	dog: 'woof',
  };
  
  let dog = 'cat';			
  let sound = obj[dog];			
  
  console.log(sound); // meow		
  
  let dog = 'cat';
  let sound = obj.dog;
  console.log(sound); // woof
  ```

  ```js
  let arr = ['a', 'b', 'c'];
  
  let letter = arr[1]; // objectName["propertyName"]
  
  console.log(letter); // b
  ```

  

- # 객체의 값을 추가,수정, 삭제하는 방법

  ### 객체 수정

  ```js
  let myDog = {
      "name": "Coder",
      "legs": 4,
      "tails": 1,
      "friends": ["freeCodeCamp Campers"]
    };
  
  myDog.name = "Happy Coder"
  console.log(myDog.name); // "Happy Coder"
  
  myDog['name'] = "Happy"
  console.log(myDog.name);// "Happy"
  ```

  #### 객체 추가

  ```js
  let myDog = {
      "name": "Happy Coder",
      "legs": 4,
      "tails": 1,
      "friends": ["Wecode Bootcamp"]
    };
    
  myDog.bark = "woof" // myDog['bark'] = "woof"
  console.log(myDog);
  /*
  {
    bark: "woof",
    friends: ["Wecode Bootcamp"],
    legs: 4,
    name: "Happy Coder",
    tails: 1
  }
  */
  ```

  ### 객체 삭제

  ```js
  let myDog = {
      "name": "Happy Coder",
      "legs": 4,
      "tails": 1,
      "friends": ["Wecode Bootcamp"],
      "bark": "woof"
    };
  
  delete myDog.tails; //또는 delete myDog['tails'];
  console.log(myDog);
  /*
  {
    "name": "Happy Coder",
    "legs": 4,
    "friends": ["Wecode Bootcamp"],
    "bark": "woof"
  }
  */
  ```

  

- # 객체와 배열이 섞인 복잡한 객체 만들어서 접근하는 방법

  ```js
  let myPlants = [
      {
        type: "flowers",
        list: [
          "rose",
          "tulip",
          "dandelion"
        ]
      },
      {
        type: "trees",
        list: [
          "fir",
          "pine",
          "birch"
        ]
      }
    ];
  
  let foundValue = myPlants[1].list[1]; // let foundValue = myPlants[1]['list'][1]
  console.log(foundValue); //"pine"
  ```

  

- # 배열의 타입이 객체인 이유

  최신 ECMAScript 표준은 다음과 같은 7개의 자료형을  정의한다.

  ### 기본 타입 (Primitive value) 6개

  원시 타입 (Primitive data type) : 원시 타입의 값은 **변경 불가능한 값 (immutable value)**이며 **pass-by-value(값에 의한 전달)** 이다.

  - [Boolean](https://developer.mozilla.org/ko/docs/Glossary/Boolean)
  - [Null](https://developer.mozilla.org/ko/docs/Glossary/Null)
  - [Undefined](https://developer.mozilla.org/ko/docs/Glossary/undefined)
  - [Number (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Number)
  - [String](https://developer.mozilla.org/ko/docs/Glossary/String)
  - [Symbol](https://developer.mozilla.org/ko/docs/Glossary/Symbol) (ECMAScript 6 에 추가됨)

  ### 객체 (Objects)

  컴퓨터 과학에서, 객체는 [식별자 (Identifier)](https://developer.mozilla.org/ko/docs/Glossary/Identifier) 로 참조할 수 있는, 메모리에 있는 값이다.

  ##### 속성 (Properties)

  자바스크립트에서, 객체는 속성들을 담고있는 가방 (collection) 으로 볼 수 있다. [객체 리터럴 문법 (object literal syntax)](https://developer.mozilla.org/en-US/JavaScript/Guide/Values,_variables,_and_literals#object_literals) 으로 제한적으로 몇 가지 속성을 초기화할 수 있고, 그러고 나서 속성들을 추가하거나 제거할 수도 있다. 속성 값은 객체를 포함해 어떠한 자료형도 될 수 있고, 그 덕분에 복잡한 데이터 구조를 형성하는게 가능해진다. 속성은 키 (key) 값으로 식별된다. 키 값은 String 이거나 Symbol 값이다.

  두 종류의 객체 속성이 있는데, 이들은 종류에 따라 특성값들을 가질 수 있다. 데이터 (data) 속성과 접근자 (accessor) 속성이 그것이다.

  ### Arrays

  **[배열(Arrays](https://developer.mozilla.org/en-US/JavaScript/Reference/Global_Objects/Array)) 는 정수키를 가지는 일련의 값들을 표현하기 위한 오브젝트이다.** 배열 오브젝트에는 길이를 나타내는 'length'란 속성도 있다. 배열은 Array.prototype을 상속받으므로 배열을 다룰 때 편한 [indexOf](https://developer.mozilla.org/en-US/JavaScript/Reference/Global_Objects/Array/indexOf) (배열에서 값 검색)와 [push](https://developer.mozilla.org/en-US/JavaScript/Reference/Global_Objects/Array/push) (새로운 값 추가) 같은 함수를 사용할 수 있다. 배열은 리스트나 집합을 표현하는데 적합하다.

  

  JavaScript는 객체 기반의 스크립트 언어로서 JavaScript를 이루고 있는 거의 모든 것이 객체이다. 원시 타입을 제외한 나머지 값들(배열, 함수, 정규표현식 등)은 모두 객체이다. 또한 **객체는 참조에 의한 전달 (pass-by-reference)방식으로 전달된다.**
