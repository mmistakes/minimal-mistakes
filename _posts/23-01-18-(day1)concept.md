2023-01-18 javascript 스터디 1일차

# 2023-01-18 javascript 스터디 1일차 - 개념정리

# 자바스크립트 

## <모던 마크업>

- script 태그엔  <script type=...>과 같은 속성, <script language=...> 언어, 

  그리고 <script>...</script> 와 같은 주석이 있었는데 이는 사용 X(있다면 오래전 코드)

- src 속성을 이용해 html에 파일로 소분가능

  ```html
  ex) 
  <script src = "/path/to/script.js"></script> //절대경로
  <script src = "../desktop/script.js"></script> //상대경로
  <script src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>//url속성

  파일 두개 이상일 경우 script 태그 여러개 사용

  ```

- 분리파일로 작성할 경우 

  - 스크립트는 한번 다운받은 파일을 캐시로 저장해 지속적으로 쓰기 때문에 트래픽 절약(속도 빨라짐) 
  - src속성 코드 있을 경우 script 내부 코드 무시됨



## <코드 구조>

- 세미콜론

  : js는 줄바꿈이 있으면 암시적 세미콜론 있다고 해석(구문이 끝났을 경우)

  대괄호 [ ] 앞에 줄바꿈이 있어도 세미콜론 취급 X : 

  ```javascript
  alert('hey')
  [1,2].foreach
  //hey뒤 세미콜론이 없어 foreach구문 에러 
  ```




## <alert, prompt, confirm을 이용한 상호작용>

- alert 

  alert  뜨는 창을 모달창(modal window) : 떠 있는 동안 다른 기능 수행 불가

  ​

- prompt

  ```javascript
  // result  = prompt(title,[default]);

  let age = prompt('나이를 입력해주세요.', 100);

  alert(`당신의 나이는 ${age}살 입니다.`); // 당신의 나이는 100살입니다.
  ```

  title : 사용자에게 보여줄 문자열

  default : 입력 필드의 초깃값(선택값) // default를 감싸는 대괄호는 매개변수가 선택값임을 의미

  prompt 함수 == 사용자 필드입력값을 반환(취소시 null반환) 

  깔끔하게 보여주기 위해 두번째 매개변수(100)에는 undefined(' ') 설정



- Confirm 대화상자

  ```javascript
  result = confirm(question);
  ```

  confirm함수는 매개변수로 받은 question 과 확인 취소버튼 보여줌

  사용자의 확인 == true  그외 == false 반환

  (예시)

  ```javascript
  let isBoss = confirm("당신이 주인인가요?");

  alert( isBoss ); // 확인 버튼을 눌렀다면 true가 출력됩니다.
  ```

  ​

  ## <주석>

  - 주석은 코드 동작 방법이 아닌 코드가 무엇을 하는지를 설명해야 한다.

  - 함수 내에 기능을 가진 함수가 있는 경우

    :  **함수를 분리**하여 이름을 붙이고 이름은 유추할 수 있도록

  - 함수가 여러개 일렬로 있는 경우

    : 다른 **함수를 생성**해 역할을 알수 있도록 해줌


  - (예제)

    아래로 죽 늘어져 있는 경우

    ```js
    // 위스키를 더해줌
    for(let i = 0; i < 10; i++) {
      let drop = getWhiskey();
      smell(drop);
      add(drop, glass);
    }

    // 주스를 더해줌
    for(let t = 0; t < 3; t++) {
      let tomato = getTomato();
      examine(tomato);
      let juice = press(tomato);
      add(juice, glass);
    }

    // ...
    ```

    이럴 땐 새로운 함수를 만들고, 코드 일부를 새로 만든 함수에 옮기는 게 좋습니다. 아래와 같이 말이죠.

    ```js
    addWhiskey(glass);
    addJuice(glass);

    function addWhiskey(container) {
      for(let i = 0; i < 10; i++) {
        let drop = getWhiskey();
        //...
      }
    }

    function addJuice(container) {
      for(let t = 0; t < 3; t++) {
        let tomato = getTomato();
        //...
      }
    }
    ```



## <변수>

- 변수 == 저장소
- let 키워드 사용
- 한줄에 변수 하나를 사용할 것

ex)

```js
let user = 'John';
let age = 25;
let message = 'Hello';
or
let user = 'John',
let age = 25,
let message = 'Hello';

```

*스칼라, *얼랭은 함수형언어인데 이들은 변숫값 변경이 금지됨

- 변수명 금지 
  숫자로 시작 X
  특수문자 X
  예약어 X (return, class, let, function 등)
- 변수명 가능
  일반적으로 카멜형 == hanghaeTeamCclass
  _와$ 는 변수명으로 가능 하이픈(-)은 안됨



## <상수?>

- 변하지 않는 상수는 let 대신 **const** 를 사용

  ex) const myBirthday = '1994.11.24'




## <자료형>

### 기본자료형 8가지 

: 변수에 담기는 데이터의 타입이 바뀔 수 있는 (숫자형 이나 문자열) 언어의 경우 이를 동적 타입 언어라고 함

1. 숫자형` – 정수, 부동 소수점 숫자 등의 숫자를 나타낼 때 사용합니다. 정수의 한계는 ±253 입니다.

   Infinity == 무한대 => alert(Infinity); , alert(1 / 0);

   NaN == 연산오류



2. bigint` – 길이 제약 없이 정수를 나타낼 수 있습니다.

   ​

3. 문자형` – 빈 문자열이나 글자들로 이뤄진 문자열을 나타낼 때 사용합니다. 단일 문자를 나타내는 별도의 자료형은 없습니다.

   " ", ' ', `` 큰따 작따 백틱 有

   백틱으로 감싼 후 변수나 표현식을 넣어줄 수 있음

```js
let name = John
// 변수를 문자열 중간에 삽입
alert( `Hello, ${name}!` ); // Hello, John!

// 표현식을 문자열 중간에 삽입
alert( `the result is ${1 + 2}` ); // the result is 3
```



4. `불린형` – `true`, `false`를 나타낼 때 사용합니다.


5. null` – `null` 값만을 위한 독립 자료형입니다. `null`은 알 수 없는 값을 나타냅니다.`

   ​

6. undefined` – `undefined` 값만을 위한 독립 자료형입니다. `undefined`는 할당되지 않은 값을 나타냅니다.`

   ​

7. 객체형` – 복잡한 데이터 구조를 표현할 때 사용합니다.` 

   ​

8. 심볼형` – 객체의 고유 식별자를 만들 때 사용합니다.

   ​

- `typeof` 연산자는 피연산자의 자료형을 알려줍니다.
  typeof x` 또는 `typeof(x)` 형태로 사용합니다.

  ex) 

```js
typeof 0 // "number"Math == 수학 연산을 하는 <u>내장개체</u> 
```

​	null != 객체 (호환상 객체로 취급 실제론 객체아님)

​	alert == 함수 -->  함수도 객체에 속하지만 호환상 객체로 취급

- 피연산자의 자료형을 문자열 형태로 반환
- `null`의 typeof 연산은 `"object"`인데, 이는 언어상 오류입니다. null은 객체가 아님.



## <형 변환(원시형만 다룸)>

1. 문자형으로 변환

   alert(value) 는 매개변수로 문자형을 받음

   String(value)는 value를 문자형으로 형변환

2. 숫자형으로 변환

   alert는 문자형으로 받지만 연산 적용시 숫자형으로 변경됨

   ```js
   alert(15 / 5)  //3 //나누기가 적용되었기 때문
   ```

또는 

```js
let str = "123"
alert(str) // 문자열상태
let num = Number(str) // 문자열 --> 숫자형

//이 떄 주의할 점은 바뀌었을 때 숫자형만 포함하고 있어야함. 문자열이 함께 있으면 결과 == NaN
]


```

**불린 to 숫자형으로 변경시 적용되는 규칙**

undefined => NaN
null => 0
true, false => 1, 0
string => 양쪽 끝 공백 제거 후 문자열이 없으면 0, 이후 문자열 숫자 읽고 그것도 없으면 NaN

boolean 

1 == true / 0 == false / 문자열데이터 있으면 == true / 문자열데이터 == false

** 문자열 "123" == true



**불린형 변경시 적용 규칙**

`0`, `null`, `undefined`, `NaN`, `""`  ==> false
그 외 					      ==> true



### **기본 연산자와 수학 참고 **

https://ko.javascript.info/operators#ref-31



## <비교 연산자>

### 문자열 비교 알고리즘

1. 두 문자 비교시 첫글자가 사전순으로 뒤에 있는 것이 큰 것, 비교되면 종료
2. 같을 경우 두 문자열의 첫 글자가 같으면 두 번째 글자부터 같은 방식으로 비교
3. 비교 후 길이가 같다면 동일, 길이가 다르면 긴 것이 더 크다고 인식



- 비교 연산자는 불린값을 반환
- 문자열은 사전순 비교(문자열 숫자도 포함)
- 서로 다른 타입의 값을 비교할 땐 숫자형으로 형 변환이 이뤄지고 난 후 비교가 진행됩니다(일치 연산자는 제외).
- `null`이나 `undefined`가 될 확률이 있는 변수가 `>` 또는 `<`의 피연산자로 올 때는 주의. 
  **null`, `undefined` 여부를 확인하는 코드를 따로 추가하는 습관권유**





## < IF, ? 를 사용한 조건 처리>

### 물음표 연산자(=조건부 연산자)

```js
ex1)
let result = condition ? value1 : value2;  //조건이 참이면? value1 아니면 value2 반환 **condition은 괄호로 묶어라

ex2)
let age = prompt('나이를 입력해주세요',18);
let message = (age < 3) ? '아기야 안녕?' :
  (age < 18) ? '안녕!' :
  (age < 100) ? '환영합니다!' :
  '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!';        //else if와 비슷한 조건처리

alert( message );

```



## <논리연산자>

- ## OR역할

1. OR == || 

   : 이항 연산자로 둘 중 하나라도 참이면 참 둘다 아니면 false

2. 추가기능 1
   :let abc =  A || B || C

   이 중 truthy 있으면 멈추고 아니면 마지막 값 반환

3. 추가기능 2

   ```js
   true || alert("not printed");
   false || alert("printed");
   ```

   두 번째 메시지만 출력

   첫 번째 줄의 `||` 연산자는 `true`를 만나자마자 평가를 멈추기 때문에 `alert`가 실행X

   단락 평가는 연산자 왼쪽 조건이 falsy일 때만 명령어를 실행하고자 할 때 자주 쓰임



## - AND 역할

1. AND == &&

   : 이항 연산자로 하나라도 거짓이면 false

2.  OR과 같은 방식으로 falsy 값을 왼쪽부터 찾음



**++ 우선순위는 && > ||**



- ## NOT = !  

: not은 피연산자 불린형으로
ex) alert (!true )  // false

tip :  not을 연달아 두번(!!)사용하면 불린형으로 형변환 가능



## < SWITCH문 >

https://ko.javascript.info/switch

## <While 과 for 반복문>

https://ko.javascript.info/while-for

## <표현식>

https://smallzoodevs-organization.gitbook.io/javascript-study/day-01.-hello-world/2.








