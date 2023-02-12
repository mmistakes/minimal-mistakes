---
layout: single
title: " 코딩앙마 JS 초급 "
categories: Javascript
tag: [lecture,codingakma]
---
# 코딩앙마 100분

명시적 형변환을 습관화
: 자동 형변환이 아닌 의도적으로 원하는 자료형(문자형 숫자형 불린형) 등으로 변환시켜서
출력하는 연습 할 것



**형변환 요약**`

String() : 문자형으로 변환

Number()  : 숫자형으로 변환
​			Number("문자가 포함되면 12") // NaN출력

Boolean() : 0, null,undefined, Nan , ''(공백이 아닌 빈값) // false를 출력 

**주의
 Number(null) // 0
 Number(undefined) // 0

Number(0) // F
Number('0') // T
Number('') // F
Number(' ') // T





##  비교연산자와 조건문

< > <= >= == != ===(타입일치)

비교연산자는 불린형으로 반환

```js
const age = 19;

if(age > 19){
console.log('환영합니다.');
}else if(age === 19){
  console.log('수능잘치세염')     
}
else{
  console.log('안녕히 가세요');
}
console.log('----------------')

// 수능잘치세염 --------------------
```



## 논리연산자

||	 :  하나라도 true면 true 반환

여러 조건이 있을때
첫번쨰 true를 발견 즉시 평가를 멈춘다.



&&	 : 하나라도 false면 false

여러 조건이 있을때
첫번쨰 false 를 발견 즉시 평가를 멈춘다.



!	 : true false 반전함



**논리연산관련 최적화**
ex)
**운전면허** 있고 **시력**이 좋은 **여군**
(전체 군인의80%)  (60%)    (7%)

이떄 여군을 먼저 배치해  T F 빨리 평가하게 만들자

여군인데 시력이 좋고 운전면허 있는 사람

```js
//ex)
const name = "Mike"
const age = 30;

if(name === 'Tom' || age > 19){
    console.log('통과')
} 										//통과
========================================================================
const name = "Mike"
const age = 30;

if(name === 'Tom' || age > 19){
    console.log('통과')
}else{
    console.log('불통)')
  }							//불통

========================================================================
const gender = 'F';
const name = "jenny";
const isAdult = true;

if(gender = 'M' && name === 'Mike' || isAdult){
  console.log('통과')
} //통과 출력 // 이유는 &&가 우선이라 or 전에 false가 출력되고 그 후 or 이 true출력

// ↓ 의도한바 이렇게 되면 &&가 나중에 평가되어 false
if(gender = 'M' && (name === 'Mike' || isAdult)){
  console.log('통과')
}

```





## 반복문

: 동일 작업 반복하기 위해 사용

### 반복문 for

```js
for(let i=0; i<10; i++){
    //초기값, 조건, 코드실행후 초기값에 적용할 작업	
}
```

```js
for(let i=0; i<10; i++){
```
### 반복문 while

```js
let i = 0;			
while(i<10){
  //반복할코드
}

// let i =0; : 초기값 --> while(조건) --> {반복할 코드}
// i가 계속 0이면 무한루프 --> i++로 증가시켜주어야 끝남
let i = 0;			
while(i<10){
  //반복할코드
  i++;
}

```

### 반복문 do.. while

while과 차이 : 우선 먼저 한번 코드를 실행하고 조건을 체크함

```js
let i = 0;
do{
  //반복코드
  i++;
} while(i<10)
```

### break, continue

break : 멈추고 바로 빠져나옴
continue : 멈추고(안빠져나옴) 다음 반복문으로 점프해서 진행

```js
//break 
//참고로 while(true)는 무한반복임
while(true){
  let answer = console.log("계속 할까요?");
  if(!answer){
    break;
  }
}
// break만나기 전까지 반복됨. answer에 중간에 false가 되었을 떄 break 명시 중요!


//continue
//짝수만 반복
for(let i =0; i<10; i++){
  if(i%2){
    continue;
  }
  console.log(i)
}

// 명확한 횟수가 정해져있으면 for문 아니면 while (do..while별로 사용X)
```





### switch문

if문으로 모두 작성가능하지만
case가 다양할 경우 switch문으로 코드를 간결하게 만들 수 있기 떄문에 사용 



```js
//form
swich(평가){
  case A:
  //A일때 코드
  case B:
  //B일떄 코드
  ...
}
  =============================
  //위 코드는 아래 if문과 동일
  if(평가==A){
    //A일때 코드
  }else if(평가==B){
    //B일때 코드
  }


```

```js
let fruit = prompt('무슨 과일을 사고 싶나여')

switch (fruit){
  case '사과' : 
    console.log('100원 입니다');
    //break;
    case '바나나':
    console.log('200원 입니다');
    //break;
    case '키위' : 
    console.log('300원 입니다');
    //break;
    case '멜론' : 
    case '수박' : 
    console.log('500원 입니다');
    //break;
    
    //default :
    	//console.log('그런과일읍따')
  
}
//바나나 입력하면 바나나 이후 모두 출력 == break없기 떄문에
//+ default가 else와 동일 ==> 여기없는 과일입력하면 그런과일읍따 출력
//멜론 수박 가격 동일하니까 합치기 가능
```





## 함수

기본적으로 중복을 없애기 위해 사용

### 형태

```js
function sayHello(name){
//함수    함수명  매개변수                   
  console.log('Hello,${name}`);
}
              sayHello('Mike');
```

### 매개변수 있는 함수

```js
function sayHello(name){
  const msg = `Hello{name}`;
  console.log(name);
}
 sayHello('Mike');
```

```js
let msg = 'Hello' //전역 변수
console.log('함수호출전');
console.log(msg);

function sayHello(name){
  if(name){
    msg += `, ${name}`;
  }
  console.log('함수내부');
  console.log(msg);
}
sayHello();
sayHello('Mike')
console.log('함수 호출 후');
console.log(msg);
```

### 지역, 전역 , 매개변수있는 함수 관련

```js
function sayHello(name){
  // 여기서 funtion sayHello(name = 'friends)면 name디폴트값이 'Friends' 매개변수는 선언되지 않았을 때 디폴트를 할당함.
    let newName = name || 'Friends'
    let msg = `Hello, ${newName}`
    console.log(msg)
}

sayHello();
sayHello('jane'); 							// Hello, Friends
										   // Hello, jane 출력

// 이유 : 매개변수 빈값은 undefined == false이기 때문에 함수 내 or에서 재끼고 friends선택됨 
// 		 jane이 name변수에 할당되었을 때는 먼저 true인 jane 선택 (or은 true 발견시 즉시 중지)



```



### 어떤 값을 반환하는 함수

반환은 retrun 을 사용

```js
function add(num1, num2){
    return num1 + num2;
}

const result = add(2,3)
console.log(result)
// 5 반환

```

### 함수작성시 주의

- 한번에 한작업 집중

- 읽기 쉽고 어떤 동작인지 알수 있게 네이밍

  ex)
  showError // 에러보여줌
  getName // 이름얻어옴
  createUserData // 유저데이터생성
  checkLgoin // 로그인여부체크 등등



## 함수표현식  화살표 함수

```js
//함수선언문
function add(num1, num2){
    return num1 + num2;
}
//함수표현식 : 이름이 없는 함수를 만들고 변수를 선언해서 함수를 만듦
let sayHello = function(){
  console.log('hello')
}

//사용방식 실행방식 동작방식 모두 동일 
//호출할 수 있는 타이밍이 다름


```

함수선언문은 어디서나 호출할 수 있다. 아무데서나 호출하면 나옴

JS는 위에서 아래로 순차적으로 해석하여 즉시 결과를 반영하는 "인터프리터 언어"

JS는 실행전 코드의 함수선언문을 모두 찾아 저장해둔다

그래서 선언된 위치까지 올라갈 수도 있다 

### 이를 호이스팅(hoisting) 이라고 한다.

반면! 

함수 표현식은 해당 코드에 도달하면 생김(저장소에 저장되지 않는다?)



## 화살표함수

```js
let add = function(num1,num2){
  return num1 + num2;
}
-------------------------------
let add =        (num1,num2)=>{
  return num1 + num2;
}
-------------------------------
let add =        (num1,num2)=>(
  num1 + num2;)
-------------------------------
let add =        (num1,num2)=>num1 + num2;						//리턴문이1줄이면 괄호도 생략가능
-------------------------------
let add = number=>'Hello, ${number}'				//인수가 딱1개면 괄호생략가능
```



표현식 화살표함수로

```js
const add = function(num1,num2){
    const result = num1+num2
    return result;
}; 
--------------------------------------
  const add = (num1, num2) =>  num1+num2;  // return문이 한줄이기 떄문에 (n1+n2)의 괄호 생략 가능
```





## 객체 (:object)

### 형태

```js
const superman ={
  name : 'clark',				//name == key //clark ==value
  age : 33,						
}

//각 프로퍼티는 ,(쉼표) 로 구분/마지막쉼표는 없어도 되지만 수정 삭제 이동에 용이함
```

### 프로퍼티 접근/추가/삭제

```js
//객체접근 .을 사용


const superman ={
  name : 'clark',				
  age : 33,						
}
// 접근
superman.name // 'clark'
superman['age'] // 33

//추가
superman.gender = 'male';
superman['hairColor'] = 'black'

//삭제 
delete superman.hairColor

```

### object 단축 프로퍼티(간단하게 접근가능)

```js
ex)
//이런변수가 있고
const name = 'clark'
const age = 33;

//이런 객체가 있다
const superman = {
  name:name,
  age:age,
  gender:'male'
}

//이때 
name:'clark',
age: 33;
//과 같은데 이것을 아래와 같이 표현 가능
name, == name:'clark'
age,  == age:33; 

```

### object - 프로퍼티 존재여부 확인

만약 존재하지 않는 프로퍼티에 접근하면 
에러 발생 X ==> undefined

```js
const superman ={
  name : 'clark',				
  age : 33,						
}


superman.birthDay; // undefined

'birthDay' in superman; //false

'age' in superman; // true
```

어떤 것이 나올지 확신할 수 없을 때 in 사용



## for ...in 반복문

### for in 반복문 사용하면?

객체를 순회하며 정보를 가져올 수 있음

```js
for(let key in superman){
console.log(key)
console.log(superman[key])
  }
```



## Method 

### method

: 객체에 **프로퍼티로** 할당된 함수



```js
      
// 기본형태
const superman = {
        name : 'clark',
        age : 33,
        fly : (){					  //fly:function(){console.log('a')}에서 fly(){console} 로 변경가능
          console.log('날아갑니다.')
        }
      }
```

### method _ this함수

```js 
//형태 및 this메소드 사용 
const user = {
    name : 'Mike',
    sayHello : function(){
        console.log(`Hello I'm ${this.name}`);
    }
}


user.sayHello();

// Hello I'm Mike 



```

```js
//method
let boy = {
    name : 'Mike', 
    showName : function(){
        console.log(this.name)
    }
};

boy.showName();

let man = boy; //이런식으로 객체를 다른 곳에 할당해서 두가지 변수이름으로 접근가능 

man.name = 'TOM'   //객체를 새론만드는게 아님!!! 한 객체에 이름표만 2개
console.log(boy.name) // 고로 이때 boy의 프로퍼티값이 바뀌어서 Tom을 출력함
man.showName(); 
boy = null; //이러면 man로만 접근가능
man.showName(); // ??에러남 왜냐, boy의 프로퍼티가 모두 사라졌기 때문에 

//이 때 boy 내 console.log(boy.name) 을  console.log(this.name)으로 변경하면
//this가 있는 객체자체를 신경씀(객체명 신경안씀) 고로 출력됨

// Mike Tom Tom Tom

//고로 메소드에서는 객체명을 직접 써주는 것보다 this 활용많이 할 것
```

### method_화살표함수

```js
// 객체 화살표함수
// Method2 boy를 화살표함수로 바꾸면?
let boy = {
    name : 'Mike', 
    sayThis: () => {
        console.log(this);
    }
};

boy.sayThis(); // 객체가 반환됨

//여기서 화살표함수로 바꾸면
//this는 boy의 객체들을 가르키지않고 전역객체(window)를 가리키기 때문에 // {}반환 
//화살표함수 쓰지말 것.  
```

