---
layout: single
title : "[js] 더글라스 크락포드 자바스크립트 개념 정리(CORE)"
categories: javascript
tag: [web, javascript]
toc : true
author_profile: false
sidebar:
    nav: "docs"
search: true
---

### 자바스크립트 개념 정리(더글라스 크락포드)
> 부서를 새로 이동하면서 사수님이 처음으로 준 책[더글라스 크락포드의 자바스크립트]

비록 2008년에 작성된 책이지만 아직도 유용하게 사용되는 자바스크립트의 핵심개념(특히 프로토타입)에 대해서 자세히 써있어서 공부한 내용을 정리해보려고 한다.

처음에 봤을때는 잘 이해가 안되었지만 계속해서 자바스크립트 인강을 찾아보면서 반복해서 읽으니 조금씩 이해가 가는것 같기도 하다(물론 개인적인 생각이지만..)

> 사실 자바스크립트는 다른사람들이 봤을때 그냥 단순히 DOM 컨트롤만 하거나 버튼 클릭시 이벤트만 발생하게 하는 용도로 생각할 수 있지만 깊게 공부하면 할수록 굉장히 어렵고 많은 것을 할 수 있는 언어라고 생각한다. 
> 
> (참고로 스팀에 뱀파이어 서바이버라는 게임도 자바스크립트로 만들었다고 한다. 대박..)
> 
> 현재 개발을 오래하지 않았고 많은 언어를 접해보지 않았지만 사실 가장 내가 좋아하는 언어중에 하나이다.

가장 큰 이유는 브라우저에서 실행 후 F12만 누르는것만으로도 CONSOLE창에서 언어를 직접 테스트 할 수있는 간편함 때문일까?

물론 각 언어마다 장단점이 있지만 나는 단순히 메모장이나 F12 개발자도구 등 쉽게 작성하고 실행할 수 있다는 것에 가장 큰 매력을 느끼는것 같다.

> 또 사설이 길었는데 바로 자바스크립트 배운 내용을 정리해보겠다.

#### 1장. 객체 선언
```js
var empty_object = {};

var stooge = {
    "first-name" : "Jerome",
    "last-name" : "Howard"
}

var flight = {
    airline : "Oceanic",
    number : 815,
    departure : {
        IATA : "SYD",
        time : "2004-09-22 14:55",
        city : "Sydney"
    },
    arrival : {
        IATA : "LAX",
        time : "2004-09-23 10:42",
        city : "Los Angeles"
    }
};
stooge["first-name"];
flight.departure.IATA;
```

<b>기본값 설정 방법. 앞에 값이 없을 경우에는 뒤에있는걸로 default설정.</b>
```js
var middle = stooge["middle"] || "(none)";
var status = flight.status || "unknown";   
var first = stooge["first"] || "none";
```

<b>객체의 속성을 아래와 같이 추가해줄 수 있다.</b>
```js
stooge["first-name"] = "JEROME";
stooge["middle-name"] = "Lester";
stooge.nickname = "Curly";
flight.equipment = {
    model : 'Boeing 777'
};
flight.status = 'overdue';
```

<b>객체는 참조 방식으로 전달되며 새로 생성하는게 아니라 기존에 있는 주소를 그대로 넘겨주는 방식 >> 값을 변경하면 참조한 값도 같이 변경됨</b>

```js
var x = stooge;
x.nickname = 'Curly2';
var nick = stooge.nickname;

var a = {}, b = {}, c = {}; // a,b,c 모두 다른 객체
a = b = c = {}; // a,b,c 모두 같은 객체
```

#### 2장. 프로토타입
<b>프로토 타입</b>
<b>객체 리터럴로 생성되는 모든 객체는 표준 객체인 Objec의 속성인 prototype(Object.prototype) 객체에 연결된다.</b>
```js
if(typeof Object.create !== 'function'){
    Object.create = function(o){
        var F = function(){};
        F.prototype = o;
        return new F();
    };
}

var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Harray';
another_stooge['middle-name'] = 'Moses';


//위와 같이 Object.create 를 통해서 전달받은 객체(stooge)를 F의 프로토타입으로 연결시킨다음 새로 객체를 생성해서 리턴하게 되면 별개의 객체로 분류해서 값을 변경해도 stooge의 값은 그대로이다.

//프로토타입 연결은 값의 갱신에 영향을 받지 않는다. 즉 객체를 변경하더라도 객체의 프로토타입에는 영향을 미치지 않는다.

//프로토타입 연결은 오직 객체의 속성을 읽을 때만 사용한다. 객체에 있는 특정 속성의 값을 읽으려고 하는데 해당 속성이 객체에 없는 경우 자바스크립트는 이 속성을 프로토타입 객체에서 찾으려고 한다.
//이러한 시도는 프로토타입 체인의 가장 마지막인 Object.prototype 까지 계속해서 이어진다.

stooge.profession = 'actor';

another_stooge.profession; //이렇게 입력하면 actor가 나오지만 actor는 another_stooge에 있는것이 아닌 stooge에 있는 속성이다.

```

<b>리플렉션(reflection)</b>

```js
typeof flight.number;
typeof flight.status;
typeof flight.arrival;
typeof flight.manifest;

typeof flight.toString;
typeof flight.constructor;

//typeof 는 매우 유용하다. 쉽게 속성의 타입을 알 수가있다. 하지만 프로토타입 체인상에 있는 속성들도 반환할 수 있어 주의가 필요하다.
//이 때 자기 자신의 속성들만 확인하고 싶은경우 어떻게 해야할까?
//hasOwnProperty 메소드 사용하기

flight.hasOwnProperty('number');
flight.hasOwnProperty('constructor');
flight.hasOwnProperty('first-name');
```

<b>열거(Enumeration)</b>
```js
//for in 구문을 사용하면 객체애 있는 모든 속성의 이름을 열거할 수 있다.
//이러한 열거 방법에는 함수나 프로토타입에 있는 속성 등 모든 속성이 포함되기 때문에 원하지 않는 값들을 걸러낼 필요가 있다. 
//가장 일반적인 필터링 방법이 hasOwnProperty 메소드와 함수를 배제하기 위한 typeof를 사용하는것이다.
var name;
for (name in another_stooge){
    if(typeof another_stooge[name] !== 'function'){
        document.writeln(name + " : "+another_stooge[name]+"<br>");
    }
}
document.writeln('<br>');

//for in 구문을 사용하면 속성들이 이름순으로 나온다는 보장이 없다. 그러므로 만약 특정 순으로 열거되기를 원한다면 아래와 같이 사용하자.
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
for(i = 0; i < properties.length; i += 1){
    document.writeln(properties[i] + ' : ' + another_stooge[properties[i]]+ '<br>');
}
```

<b>삭제(delete)</b>
```js
//delete 연산자를 사용하면 객체의 속성을 삭제할 수 있다.
//delete연산자는 해당 속성이 객체에 있을 경우에 삭제를 하며 프로토타입 연결 상에 있는 객체들은 접근하지 않는다.

another_stooge.nickname;

delete another_stooge.nickname;

another_stooge.nickname;

//객체에서 특정 속성을 삭제했는데 같은 이름의 속성(다른 값 [Moe -> Curly])이 나오는 이유는 프로토타입 체인에 같은 이름의 속성이 있기 때문이다.
```

#### 3장. 최소한의 변수[핵심]

<b>최소한의 전역변수 사용(핵심파트)</b>
```js
//자바스크립트에서는 전역변수 사용이 매우 쉽다. 그러나 가능하면 프로그램의 유연성을 약화하기 때문에 피하는것이 좋다.
//전역변수 사용을 최소화하는 방법 한 가지는 애플리케이션에서 전역변수 사용을 위해 다음과 같이 전역변수 하나를 만드는 것이다.

var MYAPP = {};
//이제 이 변수를 다른 전역변수를 위한 컨테이너로 사용하자

MYAPP.stooge = {
    'first-name' : 'Joe',
    'last-name' : 'Howard'
};

MYAPP.flight = {
    airline : 'Oceanic',
    number : 815,
    departure : {
        IATA : 'SYD',
        time : '2004-09-22 14:55',
        city : 'Sydney'
    },
    arrival : {
        IATA : 'LAX',
        time : '2004-09-23 10:42',
        city : 'Los Angeles'
    }
};

var GAMEAPP = {};
GAMEAPP.charactor = {
    name : 'name',
    gender : 'gender'
}
GAMEAPP.charactor.attack = function(){
    document.writeln(this.name + "attack");
}

GAMEAPP.monster = {
    name : 'm-name',
    gender : 'm-gender'
}

document.writeln('<br>');
for(obj in GAMEAPP){
    for(name in GAMEAPP[obj]){
        if(typeof GAMEAPP[obj][name] !== 'function'){
            document.writeln(obj+"["+name+"]" + " : "+GAMEAPP[obj][name]);
            document.writeln("<br>");
        }
    }
}
```


#### 4장. 함수(function)[핵심]
```js
//함수는 객체이기 때문에 다른 값들처럼 사용할 수 있다. 함수는 변수나 객체, 배열 등에 저장되먀, 다른 함수에 전달하는 인수로도 사용하고, 반환값으로도 사용한다.

//함수 리터럴(아래와 같이 함수의 이름이 주어지지 않은 경우 익명함수라고 한다.)
var add = function (a, b){
    return a + b;
};

//함수를 호출하면 현재 함수의 실행을 잠시 중단하고 제어를 매개변수와 함께 호출한 함수로 넘긴다. 모든 함수는 명시되어 있는 매개변수에 더해서 this와 arguments라는 추가적인 매개변수 두 개를 받는다.
//자바스크릡트 함수 호출에는 메소드 호출 패턴, 함수 호출 패턴, 생성자 호출 패턴, apply 호출 패턴이 있으며 각각의 패턴에 따라 this라는 매개변수를 다르게 초기화한다.

//함수를 호출할 때 넘기는 인수의 개수와 매개변수의 개수가 일치하지 않아도 실행시간 오류는 발생X.
//만약 인수가 더 많을 경우 매개변수 수보다 초과하는 인수는 무시한다. 적은 경우에는 남은 매개변수에 undefined를 할당한다.

//[메소드 호출 패턴]
//함수를 객체의 속성에 저장하는 경우 이 함수를 메소드라고 부른다. 메소드를 호출할 대, this는 메소드를 포함하고 있는 객체에 바인딩 된다.
//즉, this는 객체 자체가 된다.

var myObject = {
    value : 0,
    increment : function(inc){
        this.value += typeof inc === 'number' ? inc : 1;
        console.log("myObject.increment(메소드 호출패턴)에서 this : "+this); //여기서는 객체자신[ojbect Object]출력
    },
    getValue : function(){
        return this.value;
    }
};

myObject.increment();
document.writeln(myObject.value); //1

myObject.increment(2);
document.writeln(myObject.value); //3

//메소드는 자신을 포함하는 객체의 속성들에 접근하기 위해서 this를 사용할 수 있다.

//[함수 호출 패턴]
//항수가 객체의 속성이 아닌 경우에는 함수로서 호출한다.
var sum = add(3, 4); //합은 7

//함수를 이 패턴으로 호출할 때 this는 전력객체체 바인딩된다. 이런 특성은 언어 설계단계에서의 실수이다.[더글라스]
//바르게 설꼐했다면 내부함수를 호출할 때 이 함수의 this는 외부 함수의 this변수에 바인딩 되어야 한다. 이러한 오류의 결과는 메소드가 내부 함수를 사용하여 자신의 작업을 돕지 못한다는 것이다.
//내부 함수는 메소드가 객체 접근을 위해 사용하는 this에, 자신의 this를 바인딩하지 않고 엉뚱한 값(전역객체)에 연결하기 때문이다.
//하지만 대안은 있다.
//메소드에서 변수를 정의한 후 여기에 this를 할당하고, 내부 함수는 이 변수를 통해서 메소드의 this에 접근하는 방법이다.

myObject.double = function(){
    var that = this; //객체(MyObject)를 의미한다.
    console.log("double에서 this : "+this);
    var helper = function(){
        that.value = add(that.value, that.value);
        console.log("double.helper(함수 호출패턴)에서 this : "+this); //여기서는 전역변수[ojbect Window]출력
    }
    helper(); //helper를 함수로 호출
}

//double을 메소드로 호출
myObject.double();
document.writeln(myObject.getValue());

```

#### 5장. 생성자 호출 패턴[핵심]
<b></b>
```js
//자바스크립트는 프로토타입에 의해서 상속이 이루오지는 언어이다. 이 말은 객체가 자신의 속성들을 다른 객체에 바로 상속할 수 있다는 뜻이다.
//자바스크립트는기존 언어들의 경향과는 조금 다른 급진적인 것이었다.(2008년 기준)
//2008년 오늘날 대부분의 언어는 클래스를 기반으로 하고 있다. 자바스크립트 자신도 자신의 프로토타입적 본성에 확신이 없었는지, 클래스 기반의 언어들을 생각나게 하는 객체 생성 문법을 제공한다.
//클래스 기반의 프로그래밍에 익숙한 프로그래머들에게 프로토타입에 의한 상속은 받아들여지지 않았고 클래스를 사용하는 듯한 구문은 진정한 프로토타입적 속성을 애매하게 만들었다...
//함수를 new라는 연산자와 함께 호출하면, 호출한 함수의 prototype 속성의 값에 연결되는 (숨겨진) 링크를 찾는 객체가 생성되고, 이 새로운 객체는 this에 바인딩 된다.

var Quo = function(string){
    this.status = string;
};

Quo.prototype.get_status = function(){
    return this.status; 
}

var myQuo = new Quo('confused');

document.writeln(myQuo.get_status());

//new라는 전치연산자와 함께 사용하도록 만든 함수를 생성자(constructor)라고 한다.
//일반적으로 생성자는 이니셜을 대문자로 표기하여 이름을 지정한다.
//이 사용법은 권하나는 스타일이 아니다. 추후에 더 나은 대안을 살펴보자.


//[qpply 호출 패턴]
//자바스크립트는 함수형 객체지향 언어이기 때문에, 함수는 메소드를 가질 수 있다.
//apply 메소드는 함수를 호출할 때 사용할 인수들의 배열을 받아들인다. 또한 이 메소드는 this의 값을 선택할 수 있도록 해준다.
//apply 메소드에는 매개변수 두개가 있다. 첫 번째는 this에 묶이게 될 값이며, 두 번째는 매개변수들의 배열이다

var array = [3, 4];
var sum = add.apply(null, array); //합은 7

var statusObject = {
    status : 'A-OK'
};

// statusObject는 Quo.prototype을 상속받지 않지만, 
// Qo에 있는 get_status 메소드가 statusObject를 대상으로 실행되도록 호출할 수 있음.
var status = Quo.prototype.get_status.apply(statusObject); //원래 Quo.prototype.get_status는 Quo객체의 this.status값을 리턴하는 함수였지만 이렇게 사용하면 Quo객체가 아니라 statusObject객체의 this.status값을 사용한다.
//status는 'A-OK'

//[인수배열]
//함수를 호출할 때 추가적인 매개변수로 arguments라는 배열을 사용할 수 있다.
//이 배열은 함수를 호출할 때 전달된 모든 인수를 접근할 수 있게 한다.
//여기에는 매개변수 개수보다 더 많이 전달된 인수들도 모두 포함한다.
//이 arguments라는 매개변수는 매개변수의 개수를 정확히 정해놓지 않고, 넘어오는 인수의 개수에 맞춰서 동작하는 함수를 만들수 있게한다.

var sum = function(){
    var i, sum = 0; 
    for ( i = 0; i < arguments.length; i += 1){
        sum += arguments[i];
    }
    console.log(arguments);
    
    return sum;
}

/*
rguments(5) [4, 8, 12, 15, 42, callee: ƒ, Symbol(Symbol.iterator): ƒ]
0: 4
1: 8
2: 12
3: 15
4: 42
callee: ƒ ()
length: 5
Symbol(Symbol.iterator): ƒ values()
[[Prototype]]: Object
*/
document.writeln(sum(4, 8, 12, 15, 42));

//이 예제는 그다지 유용한 패턴이 아니다. 추후에 더 유사한 메소드를 배열에 추가하는것을 살펴보자.
//arguments는 실제 배열이 아니다. 배열 같은 객체이다.
//arguments는 length라는 속성은 있지만 모든 배열이 가지는 메소드들은 없다. 설계상의 오류(2008년 기준)
```

#### 6장. 예외처리
```js
//자바스크립트는 예외를 다룰 수 있는 메커니즘을 제공한다.

var add = function ( a, b ){
    if( typeof a !== 'number' || typeof b !== 'number'){
        throw{
            name : 'TypeError',
            message : 'add needs numbers'
        };
    }
    return a + b;
}

//throw 문은 함수의 실행을 준단하다. throw는 name속성과 message속성을 반환해야한다.
//추가로 더 필요한 속성이 있는경우 추가가 가능하다.
//예외 객체는 try 문의 catch 절에 전단된다.

var try_it = function(){
    try {
        add("seven");
    }catch(e){
        document.writeln(e.name + " : "+e.message);
    }
}
```
<b>객체 생성 복습</b>
```js
//[객체 생성 복습]
function Test(name){
    this.name = name;
}

var testObj = new Test('test');
Test.printName = function(){
    console.log(this.name);
}
//위와 아래 둘다 객체 생성 가능한 패턴이고 prototype이 빠지면 객체를 생성했을때 그 객체들은 prototype없이 등록된 함수의 경우 호출 불가능.

var MakeTest = function(name){
    this.name = name;
}

var makeTestObj = new MakeTest('makeTest');
MakeTest.prototype.printName = function(){
    console.log(this.name);
}
```

<b>[기본 타입에 기능 추가]</b>
```js
//자바스크립트 언어의 기본타입에 기능 추가 허용한다.
//앞에서 Object.prototype에 메소드를 추가하여 모든 객체에서 미 메소드를 사용 가능한 것을 보았다.

//예를 들어 다음과 같이 method 라는 메소드를 Function.prototype에 추가하면 이후 모든 함수에서 이 메소드를 사용할 수 있다.
Function.prototype.method = function(name, func){
    this.prototype[name] = func;
    return this;
}

//이와 같이 Method라는 메소드를 Function.prototype에 추가함으로써 아프오르는 Function.prototype에 메소드를 추가할 때 prototype이라는 속성 이름을 사용할 필요가 없다.
//이로 인해 코드를 다소 보기 안좋게 하는 부분(.prototype)이 사라진다.
//위 코드처럼 추가하던 것을 아래의 코드처럼 .prototype 부분없이 깜끔하게 사용 가능하다.

//자바스크립트는 구분된 정수형이 없어서 때떄로 숫자형에서 정수 부분만 추출해야 하는 경우가 생긴다. 그런데 이러한 작업을 위해 자바스크립트가 제공하는 방법은 용이하지 않다.
//이러한 문제를 해결하기 위해 다음의 예처럼 Number, prototype에 integer라는 메소드를 추가해서 해결할 수 있다.

Number.method('integer', function(){
    return Math[this < 0 ? 'ceiling' : 'floor'](this);
})

document.writeln((-10 / 3).integer());
//위에 에러 발생... 추후 확인해보자

//기본 타입의 프로토타입은 public 구조이다. 그러므로 라이브러리들을 섞어서 사용할 때는 주의할 피룡가 있다. 한가지 방어적인 방법은 존재하지 않는 메소드만 추가하는 것이다.

Function.prototype.method = function(name, func){
    if(!this.prototype[name]){
        this.prototype[name] = func;
    }
}
```

#### 7장. 재귀적호출
<b>재귀 함수는 직접 또는 간접적으로 자신을 호출하는 함수이다. 재귀적 호출은 어떤 문제가 유사한 하위 문제로 나뉘어지고 각가의 문제를 같은 해결 방법으로 처리할 수 있을때 사용하는 강력한 프로그래밍 기법이다.</b>
```js
//DOM 같은 트리구조를 다루는데 매우 효과적이다. 각각의 재귀적 호출이 트리 구조의 항목 하나에 대해 작동하면 효율적으로 트리 구조를 다룰 수 있다.

var walk_the_DOM = function walk(node, func){
    func(node);
    node = node.firstChild;
    while(node){
        walk(node, func);
        node = node.nextSibling;
    }
};

var getElementsByAttribute = function(attr, value){
    var results = [];

    walk_the_DOM(document.body, function(node){
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if(typeof actual === 'string' && (actual === value || typeof value !== 'string')){
            results.push(node);
        }
    });

    return results;
};

// 위에 내용은 아직 어려우니 추후 고민해보자

var factorial = function factorial(i, a){
    a = a || 1;
    if(i < 2){
        return a;
    }
    console.log("i - 1 : "+(i-1)+" , a * i : "+(a * i));
    return factorial(i - 1, a * i);
}

document.writeln("<br>");
document.writeln(factorial(4));
```

#### 8장. 스코프(Scope) - 유효범위[핵심]
```js
var foo = function(){
    var a = 3, b = 5;
    var bar = function(){
        var b = 7, c = 11;
        
        //이 시점에서 a = 3, b = 7, c = 11
        a += b + c;
        //이 시점에서 a = 21, b = 7, c = 11
    };

    //이 시점에서 a = 3, b = 5, c = 정의되지 않음.
    bar();

    //이 시점에서 a = 21, b = 5
    
}

//자바스크립트의 블록 구문은 마치 블록 유효범위를 지원하는 것처럼 보이지만 불행히도 블록 유효범위가 없다.
//자바스크립트는 함수 유효범위가 있다. 즉 함수내에서 정의된 매개변수와 변수는 함수 외부에서는 유효하지 않다.
//반면에 이렇게 내부에서 정의된 변수는 함수 어느곳에서도 접근할 수 있다.
//오늘날 대부분의 언어는 처음 사용하기 바로 전에 선언하는것을 권장하나 자바스크립트에서는 모든 변수를 함수 첫 부분에서 선언하는 것이 최선이다.
```
#### 9장. 클로저(closure)[핵심]
<b></b>
```js
//유효범위에 관한 좋은 소식 하나는 내부 함수에서 자신을 포함하고 있는 외부 함수의 매개변수와 변수들을 접근할 수 있다는 것이다.
//03.호출 절에서 value라는 속성과 increment라는 메소드를 가진 myObject를 살펴봤다. 이제 myObject 객체에서 허락되지 않는 경우에는 value 속성의 값을 변경할 수 없게 하고 싶다고 가정하자.
//myObject를 객체 리터럴로 초기화하는 대신에 다음에 나오는 코드처럼 객체 리터럴을 반환하는 함수를 호출하여 초기화한다.
//이렇게 하면 increment와 getValue를 통해 value라는 변수에 접근할 수 있지만 함수 유효범위 때문에 프로그램의 나머지 부분에서는 접근할 수가 없다.

var myObject = function(){
    var value = 0;

    return {
        increment : function(inc){
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue : function(){
            return value;
        }
    }
}();

console.log(myObject);
/* 결과 : value 접근불가능.
    {increment: ƒ, getValue: ƒ}
    getValue: ƒ ()
    increment: ƒ (inc)
    [[Prototype]]: Object
*/

//코드를 잘 살펴보면 myObject에 함수를 할당한 것이 아니라 함수를 호출한 결과를 할당하고 있다. 맨 마지막 줄에 있는 ()를 주목해보면 함수는 메소드 두개를 가진 객체를 반환하며 이 두 메소드는 계속해서 value라는 변수에 접근할 수 있다.
//이전 일반 myObject 코드[메소드 호출패턴]
var myObject = {
    value : 0,
    increment : function(inc){
        this.value += typeof inc === 'number' ? inc : 1;
        console.log("myObject.increment(메소드 호출패턴)에서 this : "+this); //여기서는 객체자신[ojbect Object]출력
    },
    getValue : function(){
        return this.value;
    }
};
console.log(myObject);
/* 결과 : value 접근가능.
    getValue: ƒ ()
    increment: ƒ (inc)
    value: 0
    [[Prototype]]: Object
*/

//예시 하나더 Quo
var quo = function(status){
    return {
        get_status : function(){
            return status;
        }
    }
}

var myQuo = quo("amazed");
document.writeln(myQuo.get_status());

// 이러한 것을 클로저라고 부르는데.. 의미를 모르겠다.. 유튜브 보고 찾아보자

var fade = function(node){
    var level = 1;
    var step = function(){
        var hex = level.toString(16);
        console.log(hex);
        node.style.backgroundColor = '#FFFF'+hex+hex;
        if(level < 15){
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};

fade(document.body);


//나쁜예제
//노드를 클릭하면 해당 노드가 몇번째인지 알고싶지만 클릭하면 항상 전체 노드의 수만을 보여줌.
var add_the_handlers = function(nodes){
    var i ;
    for(i = 0; i < nodes.length; i += 1){
        nodes[i].onclick = function(e){
            alert(i);
        }
    }
}

//더 나은 예제
//노드를 클릭하면 해당 노드가 몇번째 노드인지 경고창으로 알려줌
var add_the_handlers = function(nodes){
    var i;
    for(i = 0; i < nodes.length; i += 1){
        nodes[i].onclick = function(i){
            return function(e){
                alert(i);
            }
        }(i);
    }
};

```

#### 10장. 콜백[핵심]
```js
//함수는 비연속적인 이벤트를 다루는 것을 좀더 쉽게 할 수 있는 방법을 제공한다.
//사용자와 상호작용으로 시작해서 서버로 요청을 하고 마지막으로 요청에 대한 응답을 보여주는 일련의 작업 흐름이 있다고 가정해보자.
//가장 고지식한 방법

request = prepare_the_request();
response = send_request_synchronously(request);
display(response);

//바람직한 예시
request = prepare_the_request();
send_request_synchronously(request, function(response){
    display(response);
})

```

#### 11장. 모듈[핵심]
```js
//함수와 클로저를 사용해서 모듈을 만들수 있다.
//모듈은 내부의 상태나 구현내용은 숨기고 인터페이스만 제공하는 함수나 객체이다.
//모듈을 만들기 위해서 함수를 사용하면 전역변수 사용을 거의 대부분 제거할 수 있기 때문에 결국 자바스크립트의 최대 약점 중 하나를 보완할 수 있다.

var serial_maker = function(){
    var prefix = '';
    var seq = 0;
    return {
        set_prefix : function(p){
            prefix = String(p);
        },
        set_seq : function(s){
            seq = s;
        },
        gensym : function(){
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    }
}
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
```

#### 12장. 연속호출
```js
//일부 메소드는 반환값이 없습니다. 예를 들어 객체의 상태를 변경하거나 설정하는 메소드들은 일반적으로 반환값이 없다.
//만약 이러한 메소드들이 undefined대신에 this를 반환한다면 연속 호출이 가능하다.
//연속 호출을 사용하면 닽은 객체에 대해 문장 하나로 연속되는 많은 메소드를 호출할 수 있다.

getElementsByAttribute('myBoxDiv').move(300,150).width(100).height(100).color('red').on('mousedown', function(m){this.startDrag()})
```

#### 13장. 커링(Curry)
```js
//함수는 값(value)이며, 이 함수값을 흥미로운 방법으로 다룰 수 있습니다. 커링은 함수와 인수를 결합하여 새로운 함수를 만들 수 있게 한다.

var add1 = add.curry(1);
document.writeln(add1(6));

Function.method('curry', function(){
    var args = arguments , that = this;
    return function(){
        return that.apply(null, args.concat(arguments));
    }
})
```