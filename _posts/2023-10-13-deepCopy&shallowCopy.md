---
published: true
layout: single
title:  "[JavaScript] Deep Copy vs Shallow Copy"
excerpt: "깊은 복사와 얕은 복사에 대해 알아봅니다."
categories:
  - JavaScript
tags:
  - JavaScript
toc: true
---

# 깊은 복사(Deep Copy)   

---  

다음과 같은 코드가 있다.

```javascript
    let num1 = 1;
    let num2 = num1;  // 이 과정에서 새로운 값이 생성되어 복사된다.
    
    num2 = 2;
    
    console.log(num1, num2); // 1  2
```
- ```num1: 1, num2: 2``` 가 나온다고 생각하는게 합당해 보인다. 이는 javascript 가 다음과 같이 동작하기 때문이다.

```javascript
    let num1 = 1;
    // 이때 새로운 숫자 값 1이 생성되어 num2 변수에 할당된다. 
    let num2 = 1;
    
    // num1 과 num2 의 값은 다른 메모리 공간에 저장된 별개의 값이다.
    // 따라서 num2 변수의 값을 변경해도 num1 변수의 값에는 어떠한 영향도 주지 않는다.
    num2 = 2;
```
- ```num1``` 변수와 ```num2``` 변수의 값은 동일하다. 하지만 ```num``` 변수와 ```num2``` 변수의 값 1은 다른 메모리 공간에 저장된 별개의 값이다.
- 원시값은 값을 복사 할 때 복사된 값을 _다른 메모리에 할당_ 하기 때문에 원래의 값과 복사된 값이 서로에게 영향을 미치지 않는다.


그렇다면 원시값이란 뭘까? 데이터 타입은 크게 원시 타입(primitive type) 과 객체 타입(object/reference type) 으로 구분할 수 있다. 
- 원시 타입의 값, 즉 원시 값은 불변 값(immutable value)이다. 객체 타입의 값은 변경 가능한 값(mutable value)이다.
- 원시값을 변수에 할당하면 실제 값이 저장된다. 객체를 변수에 할당하면 참조 값이 저장된다.
- 원시값은 복사 시에 원본의 값이 복사되어 전달된다. 이를 값에 의한 전달이라 한다. 객체의 경우 복사 시 참조값이 전달된다.



|       | 원시타입(primitive type) | 객체타입(reference type) |
|-------|----------------------|----------------------|
| 불변여부  | immutable            | mutable              |
| 저장 방식 | 실제 값이 저장됨            | 참조 값이 저장됨            |
| 복사 방식 | 원시 값이 복사됨            | 참조 값이 복사됨            |




# 얕은 복사(Shallow Copy)   


```javascript
    const obj1 = {
        id: 1,
        name: "이름"
    }
    
    let obj2 = obj1;
```