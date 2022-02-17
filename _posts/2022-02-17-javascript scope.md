# Javascript Scope



### 01. Scope란?

scope는 Javascript 문법이 아니다.

Javascript에서 scope란 **변수가 어디까지 쓰일 수 있는지** 의 범위를 의미한다.

어떤 변수는 여기저기서 쓸 수 있는 반면에, 어떤 변수는 특정 함수 내에서만 쓸 수 있다. 이런 개념이 바로 **scope** 이다.



---



### 02. Block

scope 전에 먼저 알아야할 개념이 block이다.

block은 `function`, `if`, `for` 문을 사용할 때 경험 했을 것이다.

**block이란 ** 중괄호 `{}` 로 감싸진 것을 말한다.

`function`의 내부는 하나의 block이다.

```js
function hi() {
  return 'i am block';
}
```

`for` 문도 하나의 block이고

```js
for (let i = 0; i < 10; i++) {
  count++;
}
```

`if` 문의 `{}` 도 하나의 block이다

```js
if (i === 1) {
  let j = 'one';
  console.log(j);
}
```

이렇게 block 내부에서 변수가 정의되면 변수는 오로지 `{}` 내부에서만 사용할 수 있다 그것을 **local(지역) 변수**라고 부른다.



---



### 03. Global(전역) Scope

scope는 변수가 선언되고 사용할 수 있는 공간이다.

block 밖인 global scope에서 만든 변수를 **global variable(전역변수)**라고 한다.

```js
const color = 'red';
console.log(color);

function returnColor() {
  console.log(color);
  return color;
}

console.log(returnColor());
```



---



### 04. Scope 주의점

글로벌 변수를 여기 저기서 접근하기 쉬워 너무 남용하면 프로그램에 문제를 일으킬 수 있다.

global 변수를 선언하면, 해당프로그램의 어디에서나 사용할 수 있는 **global namespace**를 갖는다.

**namespace**라는 것은 변수 이름을 사용할 수 있는 범위라는 뜻이다. scope이라고도 하고 특히 변수이름을 얘기할 때는 namespace라고도 한다.

```js
const satellite = 'The Moon';
const galaxy = 'The Milky Way';
let stars = 'North Star';

const callMyNightSky = () => {
  stars = 'Sirius';
  
  return 'Night Sky: ' + satellite + ', ' + stars + ', ' + galaxy;
};

console.log(callMyNightSky());
console.log(stars);
```

위에 코드를 보면 stars 라는 전역변수를 callMyNightSky 함수에서 사용하고 value 값을 변경했다. 

이렇게 되면 함수 밖 맨 아래 콘솔을 출력해보면 starts 변수값이 `Sirius` 로 변경되버린다. 

그러면 다른 함수 내부에서 starts 전역변수를 참조할 때 값이 변경되서 혼동을 일으킬 수 있다.



---



### 05. 좋은 Scoping 습관

위와 같이 전역 변수가 여기 저기서 수정되면 안되기 때문에 변수들은 block scope로 최대한 나눠놔야 한다.

- 타이트한 scope의 변수는 코드 품질을 올린다.
- 코드가 block 으로 명확하게 구분되기 때문에 코드 가독성이 높아진다
- 코드가 각각의 기능별로 block을 나누면 코드가 이해하기 쉬워진다.
- 나중에 코드를 봐도 잘 나뉘어 있어서 유지보수가 쉽다.
- 전역변수가 아닌 block으로 넣어놓으면 프로그램이 끝날때까지 변수가 살아있는 것이 아니라서 메모리 절약이 된다.
