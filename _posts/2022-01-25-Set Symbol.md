---
layout: single
title: "ES6 set(), 심볼(Symbol)"
categories: [JavaScript]
tag: [JS, set, Symbol]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# ES6 set() 자료구조

ES6에서 새롭게 도입된 데이터 자료구조의 종류로는 map, set 메소드가 있다.
map은 key와 value를 한 쌍으로 묶는다는 점에서 객체(object)와 비슷하고 set은 중복을 허용하지 않는다는 특징을 빼면 배열과 유사하다.

1. set
   set => 집합 => key, value의 쌍이 있다면 value들의 집합 또는 컬렉션.

2. 특징
   배열(array)은 같은 값을 가질수있지만, set(집합)은 같은 값을 중복해서 가질수없다. 중복해서 같은 값을 추가해봤자 추가되지 않는다. 그래서, 이러한 성질을 이용하여 중복을 제거하는 용도로도 많이 쓰인다.      

   ```javascript
   let arr = [1, 2, 3, 4, 5, 5];
   console.log(arr); // 1, 2, 3, 4, 5, 5
   console.log(arr[4]); //5
   console.log(arr[5]); // 5
   ```

3.  set 사용법
   생성 => new
   추가 => add
   삭제 => delete

- 생성

  ```javascript
  let arr1 = new Set(); //비어있는 set(집합)을 하나 생성.
  console.log(arr1); //object Set 객체를 반환.
  ```

- 추가

  ```javascript
    arr1.add('A');
    arr1.add('B');
    arr1.add('C');
    arr1.add('C');
    arr1.add('C');
    console.log(arr1); // A B C
    console.log(arr1[0]); // undefined => 뭔가 배열과는 틀리구나,,라는 것을 알 수 있다.
    //사이즈
    console.log(arr1.size); // 3
  ```

- 삭제

  ```javascript
  arr1.delete('C');
  console.log(arr1); // A, B
  한꺼번에 모두 삭제 => clear()
  arr1.clear()
  console.log(arr1); // object Set 객체를 반환. Set(0)
  ```

- 생성시 추가와 Spread(펼침) 연산자 출력

1. 생성시 값을 추가하는 방법

  ```js
  let ar = new Set().add('X').add('Y');
  console.log(ar); // X , Y
  //추가
  ar.add('A');
  ar.add('B');
  ar.add('C');
  console.log(ar); // X, Y, A, B, C
  console.log(arr.size); //5
  ```

  

2. 출력 => Spread 연산자 사용 => 이터러블 객체(Iterable Object)의 요소를 하나씩 분리하여 전개 => 펼침 연산자

  ```js
  let testArr = ['k', 'o', 'r', 'e', 'a'];
  console.log(...testArr); // k o r e a
  console.log([...testArr]); //  ["k", "o", "r", "e", "a"] 배열로 뿌려줌
  ```



## ES6 set() 자료구조 - 반복

```js
let arr = ['a', 'b', 'c', 'd', 'e'];
```

1. 전통적인 for 반복문

   ```js
   for(let i = 0; i < arr.length; i++) {
   	console.log(arr);
   }
   ```

2. forEach() 메서드를 사용한 반복

   ```js
   arr.forEach(function(x) {
   	console.log(x);
   });
   ```

3. Set의 다양한 메서드 => keys(), values()

   ```js
   let testSet3 = new Set(["tiger", "lion", "dog", "cat"]);
   testSet3.add("hippo"); 
   console.log(testSet3); // {"tiger", "lion", "dog", "cat", "hippo"}
   
   let arr = [..testSet3];
   console.log(arr); // ["tiger", "lion", "dog", "cat", "hippo"]
   
   //keys() 메서드 => Iterator(반복자) 객체를 반환 => next() 메서드
   const key_itr = testSet3.keys();
   console.log(key_itr.next().value); //tiger
   console.log(key_itr.next().value); //lion
   console.log(key_itr.next().value); //dog
   console.log(key_itr.next().value); //cat
   console.log(key_itr.next().value); //hippo
   
   //values() 메서드 => Iterator(반복자) 객체를 반환 => next() 메서드
   const val_itr = testSet3.values();
   console.log(val_itr.next().value); //tiger
   ```

4. for..of 반복문으로 출력

   ```js
   for (let i of testSet3) {
   	console.log(i);
   }
   ```

5. entries() 메서드 - 삽입순으로 Set 요소 각각에 대해서 [value, value] 배열 형식으로 새로운 객체를 반환.

   ```js
   let testSet5 = new Set();
   
   testSet5.add('홍길동');
   testSet5.add('이순신');
   testSet5.add('강감찬'):
   
   const entries = testSet5.entries();
   for(let i of entries) {
   	console.log(i);
   } 
   // ["홍길동", "홍길동"]
   // ["이순신", "이순신"]
   // ["강감찬", "강감찬"] 
   ```

   

# ES6 심볼(Symbol)타입 

- 심볼타입이란 무엇인가?
  => 타입이란 말에서 알 수 있듯이 ES6에서 새롭게 도입된 원시형 타입 중 하나 => 객체의 속성으로 사용.
  심볼의 사전적 의미 => 상징 => 심볼형을 사용하면 => 유일무이한 값, 고유한 값을 가진다.
  동시에 심볼형 값은 => 변경 불가능한  불변값.

- 기존타입들 => 원시형과 참조형 => 이중 원시형에 새롭게 추가된 타입
      1. 원시형 - Number, String, Null, Undefined, Boolean, Symbol(ES6)
  	2. 참조형 - Object(object, function, array..)

- 왜 객체의 속성으로 심볼을 사용하지? => 충돌을 피하기 위함.
  예를 들어서, 배열 객체를 만들어서 "배열명.length"하면 => 배열의 길이 => 같은 이름의 length로 덮어쓰면 덮어써지는 문제가 발생.
  이때, 배열의 길이 값은 그대로 유지하면서 같은 이름의 length 속성을 추가하고자 할 때 => 심볼을 사용하면 => 문제 해결

  ```js
  let ar = [1, 2, 3, 4, 5]; 
  alert(ar.length); // 5 => 배열의 길이 => 즉, 요소 수를 알 수 있는 내장된 속성 => length 속성 덕분에.
  
  ar.length = 50; // ar 배열에 length 속성을 정의하고 50을 할당.
  alert(ar.length); // 50 => 이렇게 덮어써버림.
  
  //심볼을 사용하면
  let ar2 = [1, 2, 3, 4, 5];
  const length = Symbol('length');
  ar2[length] = 50; // ar2 배열의 length 속성에 50 할당.
  
  alert(ar2.length); //5
  alert(ar2[length]); //50
  
  //객체에 속성을 추가하거나 덮어써질 우려가 있다면 => 충돌을 피하기 위한 수단으로 => 심볼(Symbol)을 사용할 수 있다.
  ```

- 심볼은  new 연산자를 사용하지 않는다. 그럼??  => Symbol()함수를 사용하여 생성.

  ```js
  let symbol = Symbol();
  ```

- 괄호안은 비어두고 생성해도 되고, 문자열을 넣어서 생성해도 된다.
  보통 이때의 문자열은 단순 디버깅 용도이거나 단순 설명일 뿐, 고유한 값을 가지는데 있어서 어떤 영향을 끼치거나 하지는 않는다.
    따라서, description 인자는  심볼의 고유값을 구분하지 못한다. 이유는 심볼은 매번 심볼함수 호출시 새로운 심볼 값을 생성해내기 때문이다.

  ```js
    let symbol2 = Symbol('personName');
    let symbol3 = Symbol('personName');
    alert(symbol2 === symbol3); //false
  ```

- 심볼의 출력 형태
  이때, 심볼 값은 문자열 형태로 변환할수 없기 때문에 출력은 console.log로 콘솔에 출력

  ```js
  let symbol5 = Symbol('age');
  alert(symbol5); //오류 뜸
  console.log(symbol5); //Symbol(age) <= 이와같은 형태로 출력
  ```

- 심볼형은 for..in 구문으로 반복시 출력되지 않는다.
  배열객체에 속성을 추가하면 => for..in 반복문으로 출력시 해당 속성도 같이 출력이 된다.

  ```js
  let ar6 = [1, 2, 3, 4, 5];
  ar6.someProperty = 10;
  
  for (let i in ar6) {
  	console.log(i); // 0, 1, 2, 3, 4, someProperty
  }
  
  // 심볼형을 사용하면
  let ar6_ = [1, 2, 3, 4, 5];
  let someProperty = Symbol('someProperty');
  ar6_[someProperty] = 10;
  for (let i in ar6_) {
  	console.log(i); //0, 1, 2, 3, 4 => someProperty 속성이 나타나보이지않고 인덱스만 출력
  	console.log(ar6_[someProperty]); //  0 1 2 3 4 10
  }
  ```

  배열 객체에 어떤 속성을 넣고자 한다면 그리고 동시에 반복문에서 속성이 나타나지않게 하고자 한다면 => 즉, 속성을 은닉화 하자고한다면
  심볼을 사용할수 있다.
