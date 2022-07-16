---
layout: single
title: "실행 컨텍스트 (Execution Context)"
categories: "FrontEnd"
tag: [Javascript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---

# Closure

```jsx
function makeAdd(v1) {
  return function (v2) {
    return v1 + v2; //클로저가 없었다면 v1을 사용할 수 없다.
  };
}
const add3 = makeAdd(3);
console.log(add3(10));
const add7 = makeAdd(7);
console.log(add7(10));

결과;
13;
17;
```

자바스크립트에는 클로저(closure)라는 기능이 있다. 클로저는 함수와 그 함수를 둘러싸고 있는 주변의 상태를 기억하는 기능이다. 함수안에 또다른 함수가 있는데 이럴 때 클로저의 기능을 사용할 수 있다. 클로저 덕분에 내부 함수는 외부함수의 지역변수와 매개변수에 접근할 수 있다.

많은언어에서 함수의 지역변수와 매개변수는 함수가 실행되는 동안에만 존재해야한다. 하지만 자바스크립트에서는 그렇지 않는다. 클로저가 있기 때문이다. 내부 함수에서 v1을 사용하고 있는데, 클로저가 없었다면 이 v1이라는 것을 안에서 사용할수 없었을거다. 왜냐하면 v1은 makeAdd함수가 실행을 끝내면 없어지기 때문이다.

makeAdd 함수를 호출하고 있는데 3을 매개변수로 전달받았기 때문에 v1은 3이 될것이다. 그리고 makeAdd함수안에 있는 함수는 또 다른 함수를 반환한다.

add3함수를 실행할때 v1을 사용하고 있다. 하지만 v1은 이전에 실행했던 함수에서 사용했던 매개변수(3)이다.

클로저가 없었다면 const add3 = makeAdd(3) 이부분에서 실행을 종료하면서 v1은 사라졌을 텐데 클로저 덕분에 add3를 실행할때 v1을 사용할 수 있다.

## 자바스크립트 엔진 내부 로직원리 Execution Context

```jsx
1-4) function f1() {
	const v1 = 123;
	console.log(v1);
}
const v2 = 456;
1-3) function f2() {
	f1();
	console.log(v2);
}
f2(); // global execution context 생성 후, 위에서부터 실행되다가 함수 실행을 만남

// call stack
// execution context (콜스택에 담기는 함수의 정보)
```

#### 자바스크립트에서 함수가 실행이 될때 자바스크립트 엔진에서 내부적으로 어떻게 처리가 되는지 알아보자.

모든 언어에서는 함수의 실행 정보를 관리하기 위해서 콜스택이라는 것을 관리한다.

함수가 실행될때마다 현재까지 실행하던 함수의 정보를 콜스택에 저장하고 함수가 실행이 종료되면 콜스택에서 이전에 마지막으로 실행했던 그 함수의 정보를 꺼내온다. 이전의 멈췄던 부분부터 실행을 하는것이다. 자바스크립트에서는 이렇게 콜스텍에 담기는 함수의 정보를 execution context라고 부른다.

그리고 이 전체를 감싸고 있는 하나의 커다란 함수가 있다고 생각할 수있는데, 그래서 프로그램이 처음에 실행될때 global execution context 라는 것이 생성이 된다. 그래서 global execution context이 만들어진 상태에서 위에서부터 실행이 된다. 그러다가 함수 실행을만난다.

```jsx
1-4) function f1() {
	const v1 = 123;
	console.log(v1);
}
const v2 = 456;
1-3) function f2() {
	f1();
	console.log(v2);
}
f2();

// call stack 1 => global execution context가 콜스택에 담기고
// 새로운 execution context가 생성된다.
// f2()함수 호출을 위한 execution context가 만들어지므로 1-3부분이 실행이된다.
// 이렇게 실행을하다 f2함수안에 있는 또다른 f1함수의 실행을 만난다.
```

그러면 지금까지 가지고 있던 현재의 execution context를 콜스택에 넣는다.

global execution context 가 콜스택에 담기게된다. 이렇게 하나가 담기고 새로운 execution context가 만들어진다. 이 함수 호출을 위한 execution context가 만들어 진다. 그래서 1-3 부분의 함수가 실행이하다가 처음부터 또 다른 함수의 실행을 만난다.

```jsx
1-4) function f1() {
	const v1 = 123;
	console.log(v1);
}
const v2 = 456;
1-3) function f2() {
	f1();
	console.log(v2);
}
f2();

// call stack 2 => f2에서 실행하면서 f1도 실행되어 콜스택에 execution context 2개가
// 콜스택에 들어가 2개가 된다.
// f1함수가 실행되면서 새로운 execution context가 만들어진다.
// 그래서 f1부터 실행이되는데 f1에서 지역변수가 처음나오는데 이런 지역변수의 정보를 갖고 있는
// 것이 lexical environment라고 부른다. { 변수이름 : 값} {v1 : 123}
// 지역변수 v1이 사용될때 이 변수를 찾는데, 이를 lexical environment에서 찾는다.
// lexical environment에 123이 있기 때문에 console.log가 실행되고 함수는 종료된다.
// 함수가 종료되어 현재 갖고 있는 execution context는 삭제된다.
```

그러면 지금 갖고있던 execution context를 콜스택에 넣는다. 2개가 되었고 이 함수가 실행되면서 새로운 execution context가 만들어진다.

그래서 1-4)함수부터 실행이된다. 여기서 지역변수가 처음으로 나왔는데 이런 지역변수의 정보를 갖고 있는것이 있는데 자바스크립트에서는 lexical environment라고 부른다. execution context안에 lexical environment가 있는것이다. {변수이름 : 값}을 key와 value로 하는 map이라 생각하면된다. 변수의 사전이라고 볼수있다. 그래서 지금은 {v1 : 123} 이러한 map이 있다고 생각할 수 있다.

```jsx
1-4) function f1() {
	const v1 = 123;
	console.log(v1);
}
const v2 = 456;
1-3) function f2() {
	f1();
	console.log(v2);
}
f2();

// call stack 1
// 아까 처음 f2를 실행하다가 f1에서 멈춘 부분부터 다시 실행이된다.
// 그리고 여기서 v2라는 것을 lexical environment에서 찾게 된다.
// 현재  lexical environment는 {}처럼 비어있는 map이다. (f2안에는 변수가 없고 이미 f1에서
// 사용했던 v1은 함수가 종료되어 삭제되었다.
// 자바스크립트는 이렇게 지역변수가 없는상황에서 전역변수 v2를 사용하게된다.
// 이렇게하여 함수실행은 종료되고, 현재 갖고있는 execution context는 삭제된다.
```

그래서 변수를 사용할때 lexical environment에서 찾아서 v1이 1,2,3이 실행된다. 이렇게 함수의 실행이 끝나고 execution context는 삭제된다.

콜스택에서 마지막에 저장된것을 하나 가져오므로 하나가된다. 마지막에서 멈췄던 f1() 부분이 실행된다.

```jsx
1-4) function f1() {
	const v1 = 123;
	console.log(v1);
}
const v2 = 456;
1-3) function f2() {
	f1();
	console.log(v2);
}
f2();

// call stack 0
// 콜스택에 담겨있는 execution context를 하나 꺼낸다 (삭제한다) (global execution context)
// 그래서 f2함수 다음부터 다시 실행을 시작한다.
```

글로벌 영역에서 전역변수 v2가 있었는데, global execution context안에 있는 lexical environment에 {v2 : 456} 값이 있어서 v2의 값을 찾을 수 있었다.

#### lexical environment 예제 1)

```jsx
function makeAdd(v1) {
  return function (v2) {
    return v1 + v2; //클로저가 없었다면 v1을 사용할 수 없다.
  };
}
const add3 = makeAdd(3);
console.log(add3(10));
const add7 = makeAdd(7);
console.log(add7(10));
```

[![  1](https://imchanyo.netlify.app/static/c7ba1fe4363caf12f4bd5e703a2682f5/1075d/%EA%B7%B8%EB%A6%BC1.png)](https://imchanyo.netlify.app/static/c7ba1fe4363caf12f4bd5e703a2682f5/1075d/그림1.png)

이 코드 전체를 감싸고 있는 하나의 함수가 있다. 그래서 그 함수의 execution context가 있고 그 안에 있는 lexical environment 를 위와같이 그림으로 표현했다.

자바스크립트에서는 함수도 변수처럼 취급이되기 떄문에 함수이름도 lexical environment에 등록이 된다. 함수자체가 값이 된다. 밑에있는 변수는 const로 정의했기때문에 undefined가 아니라 값이없는상태가 된다.

[![  2](https://imchanyo.netlify.app/static/5a4b5a573ea2735da86cc0babb224dce/80833/%EA%B7%B8%EB%A6%BC2.png)](https://imchanyo.netlify.app/static/5a4b5a573ea2735da86cc0babb224dce/80833/그림2.png)

[![  3](https://imchanyo.netlify.app/static/c06f379025707eacca3efa1e53a03530/fe486/%EA%B7%B8%EB%A6%BC3.png)](https://imchanyo.netlify.app/static/c06f379025707eacca3efa1e53a03530/4f70e/그림3.png)

처음부터 실행한다음 makeAdd라는 함수를 호출이 되고 함수가 호출될때마다 execution context가 생성되고 그안에 lexical environment가 있다. 이런식으로 하나가 더 생성된다. 매개변수로 3을 입력했기 때문에 매개변수도 lexical environment에 등록이 된다. 여기서 화살표가 있는데, 함수가 생성될때 부모 함수의 lexical environment를 기억한다.

그리고 그 함수가 호출될때, 부모함수의 lexical environment를 체인으로 연결한다. makeAdd를 기준으로 보면 makeAdd함수가 만들어질 당시의 부모함수의 lexical environment는 바로 그림1의 lexical environment가 된다.

이렇게 함수가 만들어질 당시의 부모함수의 lexical environment를 기억한다. 그랬다가 이렇게 호출이되면 기억했던 lexical environment로 연결을한다

(부모로) 그래서 이안에 어떤 변수를 사용할 때, 그 변수를 자기자신에 찾아보고 만약에 없다면 연결된 곳으로가서 변수를 찾는다. 지금은 makeAdd함수에 변수가 없기때문에 따로 찾는 동작은 하지않는다. 그리고 함수안에서는 새로운 함수를 만들어서 반환을 해주고 있다.

그러면 만들어진 함수입장에서는 이 함수가 만들어질 당시의 부모 함수의 lexical environment를 기억할것이다. 여기서의 부모는 makeAdd가 된다.

그렇게 해서 함수가 반환이되어 add3이라는 변수에 담겨진다. 이렇게 이 함수의 실행은 종료가 된다. 이전에는 마치 함수가 종료될 때마다 execution context가 제거되고 그 안에 있던 lexical environment도 제거 되는 것처럼 보였지만 지금과 같이 내부에서 함수가 만들어지는 경우에는 이렇게 lexical environment가 유지가 된다.

makeAdd함수가 종료되어도 그림2는 유지가 된다. add3이라는 함수가 호출이된다.add3이라는 함수가 호출이되면 또다시, execution context가 생성되고 그 안에 lexical environment가 생성이된다.

매개변수로 10을 입력했기 때문에 v2는 10이 된다. add3함수가 값이 초기화가 될때, 그림 2에서 그림 3처럼 값이 입력된다.

그래서 add3함수를 사용하려고 할때 그림 2의 lexical environment에서 그 변수를 찾아서 사용한다. 그렇게 되면 makeAdd함수안에 있는 함수를 실행하는데 v1이라는 값을 먼저찾는다. 자기자신에는 없으니까 v1 : 3 LE로 가서 v1값을 찾는다. v2라는 값을 자기자신에서 찾아서 13이라는 값을 반환한다.

[![  4](https://imchanyo.netlify.app/static/5a4b5a573ea2735da86cc0babb224dce/80833/%EA%B7%B8%EB%A6%BC4.png)](https://imchanyo.netlify.app/static/5a4b5a573ea2735da86cc0babb224dce/80833/그림4.png)

함수안에서는 또 다른 함수를 생성하지 않았기 때문에 v2 : 10인 LE는 제거가 된다.

[![  5](https://imchanyo.netlify.app/static/706b17f68b3b6f42acb58ad8ac883c00/dc057/%EA%B7%B8%EB%A6%BC5.png)](https://imchanyo.netlify.app/static/706b17f68b3b6f42acb58ad8ac883c00/dc057/그림5.png)[![  6](https://imchanyo.netlify.app/static/12c1f6ad2e51fdcf29710a1fa50bf074/90cda/%EA%B7%B8%EB%A6%BC6.png)](https://imchanyo.netlify.app/static/12c1f6ad2e51fdcf29710a1fa50bf074/90cda/그림6.png)

그 다음에는 makeAdd(7)이 실행되어 매개변수가 7이 입력이 됐고, 새로운 lexical environment가 생성이 된다. 마찬가지로 내부에서 함수가 생성외 됐고 v1 : 7인 lexical environment는 나중에 사용될 수 있기 때문에 지워지지않는다. 만약 변수에 할당하지않았다면 함수의 값을 반환하더라도 사용할 수없기때문에 lexical environment도 지워지지만 변수에 할당되었기때문에 지울수 없다.

그래서 add7 변수도 값이 초기화가 된다. 그림6처럼

[![  7](https://imchanyo.netlify.app/static/940c4ebafcd4aac9a77c60e1dcdcf759/fe486/%EA%B7%B8%EB%A6%BC7.png)](https://imchanyo.netlify.app/static/940c4ebafcd4aac9a77c60e1dcdcf759/78204/그림7.png)

그리고 add7함수를 실행한다. v2에 10을 넣었고 함수가 실행이 되었기때문에 lexical environment이 생성이된다. v1을 v2 : 10 LE에서 찾지모새서 v1 : 7 LE에서 찾게된다. 그리고 v2는 v2 :10 LE에서 찾게 된다. 결국 17이라는 값을 반환하게 된다. 그리고 함수가 종료가 되면 v2 : 10의 lexical environment는 제거가된다.

#### lexical environment 예제 2)

```jsx
function main() {
  let v = 0;
  function f1() {
    v++;
    console.log(v);
  }
  function f2() {
    v++;
    console.log(v);
  }
  return { f1, f2 };
}
const obj = main();
obj.f1();
obj.f2();
obj.f1();
obj.f2();
```

[![  8](https://imchanyo.netlify.app/static/2220500cadca065872bf553d505d2c0a/16bd5/%EA%B7%B8%EB%A6%BC8.png)](https://imchanyo.netlify.app/static/2220500cadca065872bf553d505d2c0a/16bd5/그림8.png)

[![  8](https://imchanyo.netlify.app/static/2220500cadca065872bf553d505d2c0a/16bd5/%EA%B7%B8%EB%A6%BC8.png)](https://imchanyo.netlify.app/static/2220500cadca065872bf553d505d2c0a/16bd5/그림8.png)

global execution context에 있는 lexical environment가 그림1처럼 있다. main라는 함수가 있고 obj라는 변수가 하나있다. const로 정의했기때문에 undefined가 아니라 값이 없는상태이다.

처음부터 실행을 하다가 main()부분에서 함수를 실행하고 있다. 그래서 그림 2처럼 lexical environment가 생성된다. main 함수안에는 세개의 변수가 있다. (함수까지 포함) v는 let으로 정의했기때문에 값이 없는상태로 초기화가 됨. 함수는 그 함수자체로 값에 할당이된다.

f1, f2 두개의 함수가 객체 형식으로 묶여서 반환이 된다. 이렇게 내부 함수가 만들어졌기 때문에 그림 2의 lexical environment는 삭제 되지않는다.

[![  10](https://imchanyo.netlify.app/static/142e37312202ffe6a55ee0013fc1c093/afe45/%EA%B7%B8%EB%A6%BC10.png)](https://imchanyo.netlify.app/static/142e37312202ffe6a55ee0013fc1c093/afe45/그림10.png)

[![  11](https://imchanyo.netlify.app/static/32f2bf4e444608795a74b506cb583492/8a174/%EA%B7%B8%EB%A6%BC11.png)](https://imchanyo.netlify.app/static/32f2bf4e444608795a74b506cb583492/8a174/그림11.png)

main함수를 실행하는 과정에서 v는 0으로 초기화가된다. 함수의 실행은 종료가되고, obj의 값은 그림4처럼 객체로 할당이된다.

[![  12](https://imchanyo.netlify.app/static/3dae910753cde38dc123986448372464/fe486/%EA%B7%B8%EB%A6%BC12.png)](https://imchanyo.netlify.app/static/3dae910753cde38dc123986448372464/08990/그림12.png)

[![  13](https://imchanyo.netlify.app/static/35fc1b030efaafec274ebe4725ff298f/fe486/%EA%B7%B8%EB%A6%BC13.png)](https://imchanyo.netlify.app/static/35fc1b030efaafec274ebe4725ff298f/e0a8c/그림13.png)그다음 f1이라는 함수가 실행이 됐기때문에 그림 5처럼 lexical environment가 생성된다.

f1함수안에서 정의된 변수가 없기 때문에 그림 6처럼 lexical environment는 비어있는 상태가 된다.

f1함수에서 v라는 값을 찾을텐데, v : 0 LE에서 v를 찾는다.

[![  14](https://imchanyo.netlify.app/static/d38ecf01dc2b6c7737ac4014227d867e/fe486/%EA%B7%B8%EB%A6%BC14.png)](https://imchanyo.netlify.app/static/d38ecf01dc2b6c7737ac4014227d867e/9cda9/그림14.png)

[![  15](https://imchanyo.netlify.app/static/55a7ebab5bf94dd656cb7f23708171c3/a855c/%EA%B7%B8%EB%A6%BC15.png)](https://imchanyo.netlify.app/static/55a7ebab5bf94dd656cb7f23708171c3/a855c/그림15.png)

v를 찾은후에, v++로 증감연산자를 사용했기때문에 v1의 값도 1증가한다.

그리고 이 v를 또 사용하려고 할때는 자기자신은 없고 1이라는 값을 가져다 사용한다. 그렇게 f1의 함수는 실행이 종료되어 그림8처럼 f1의 lexical environment는 삭제가 된다.

[![  16](https://imchanyo.netlify.app/static/b7fe20a2a3538e40134b3451827171bc/fe486/%EA%B7%B8%EB%A6%BC16.png)](https://imchanyo.netlify.app/static/b7fe20a2a3538e40134b3451827171bc/8144d/그림16.png)

[![  17](https://imchanyo.netlify.app/static/db634c6d9597cfbc995f8ed953c1c06d/fe486/%EA%B7%B8%EB%A6%BC17.png)](https://imchanyo.netlify.app/static/db634c6d9597cfbc995f8ed953c1c06d/d9c1b/그림17.png)

그다음 f2함수를 실행하게되어 새로운 lexical environment가 생성된다. 이번에도 이 안에는 아무런 값이 없다. 여기서 v라는 값을 사용하기때문에 자기자신은 없어서 v: 1의 LE에서 찾아서 값을 증가시킨다. 그림10처럼 v는 2가되었다. 그리고 또 console.log에서 v2를 사용하기때문에 자기자신은없고 v1 :2 LE에서 v1을 가져와서 사용한 후, 함수는 종료가된다.

[![  18](https://imchanyo.netlify.app/static/82bfd539df4983bcff9beb295bac350b/663f3/%EA%B7%B8%EB%A6%BC18.png)](https://imchanyo.netlify.app/static/82bfd539df4983bcff9beb295bac350b/663f3/그림18.png)

[![  19](https://imchanyo.netlify.app/static/a4232e7f96c3bce75481b002d19c2e20/ee2c8/%EA%B7%B8%EB%A6%BC19.png)](https://imchanyo.netlify.app/static/a4232e7f96c3bce75481b002d19c2e20/ee2c8/그림19.png)

함수가 종료되면 f2의 lexical environment는 제거되어 그림11처럼 사라진다.

그렇게 계속 반복을 하게된다.

여기서 한가지 주목할 점은 증가된 v를 가지고있는 lexical environment를 여러 함수가 공유한다는 점이다. 그래서 v변수가 공유가 되어 네번 호출하게되면 그림12처럼 v는 값이 4가 된다.
