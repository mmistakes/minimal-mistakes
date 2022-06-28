---
layout: single
title : "[js] 자바스크립트 패턴 및 플러그인"
categories: javascript
tag: [web, javascript]
toc : true
author_profile: false
sidebar:
    nav: "docs"
search: true
---

### 자바스크립트 현업 작성 방식
```
이번에는 현업에서 작성하는 코드와 일반적으로 내가 작성하던 코드가 얼마나 다른지 비교를 한번 해보겠다.
실제로 경험이 오래된 사수님이 작성하신 코드를 보면 충격을 받을때가 많다.
단순히 일회성 코드를 작성하는게 아닌 재사용성을 강조하며 플러그인 형태로 작성하는 방법을 처음 봤을때는 충격을 크게 받았어서 아직도 기억에 남는다.
```

> 이번 포스팅에서는 아주아주 기초적인 자바스크립트 작성 패턴과 플러그인 형태에 대해서 정리해보겠다.(코린이ver)

내용 전체적으로 수정

> 코린이 ver
```js
    var dropDown = document.getElementById("dropDown");
```


#### 1장. 객체 리터럴
```js
//객체 리터럴
let user = {
    name : 'Mike',
    age : 30,
    introduce : function(){
        console.log(this.name + "인사한다");
        var _this = this;
        var polite_introduce = function(){
            console.log("polite_introduce");
            console.log(_this.second());
        }
        polite_introduce();
    },
    init : function(){
        this.introduce();
    },
    second : function(){
        console.log("second");
    }
}

console.log(user.init());
```

2장. 생성자 함수
```js
//생성자함수
function User(name, age){ //(첫 글자를 대문자로 해준다.)
    this.name = name;
    this.age = age;
    console.log(this); //여기서 this는 자기자신을 가리킨다.
}
let user2 = new User('giyeon', '30');
let user3 = new User('Jane', '22');

function User(name, age){ //이런식으로 생성됨
    //this = {} 1. this = {}라는 빈 객체를 만든다.

    this.name = name; // 2. this의 프로퍼티들을 추가한다.
    this.age = age;
    this.sayName = function(){
        console.log(this.name); //여기서 this는 생성된 객체를 말한다 (user1 , user2, user3 .... , user100)
    }
    //return this; //3. this를 반환한다.
}

//생성자 함수는 잊지말고 new를 붙여줘야 한다. 그 이유는 this라는 객체를 만들고 return 해주는 과정이 new를 붙여야지 수행되기 때문이다.
let user4 = User('Hogmi', 19);
//이렇게 하면 user4에는 undefined가 들어가는데 그 이유는 new를 붙이지 않아서 리턴해주는값이 없고 그냥 User라는 함수만 호출했기 때문이다.


//Computed property
let a = 'age';

const temp_user = {
    name : 'Mike',
    [a] : 30 //이렇게 사용하면 a가 아니라 a라는 변수에 담긴 age라는 값이 key가 된다. 이것을 Computed property라고 한다.
}

//Object.assign() : 객체 복제
const man = {
    name : 'Mike',
    age : 30
} 
const cloneUser = man; //이렇게 하면 객체가 복제되는걸까? 아니다. user가 참조하고 있는 주소값만 가져오기때문에 cloneUser를 수정하면 user도 변경되게 된다.
//동일하게 복제하기 위해서는
const newUser = Object.assign({}, man); //여기서 {} 빈 객체는 초기값이다.
// {} + { name : 'Mike', age : 30} => { name : 'Mike', age : 30 } 이렇게 추가로 할당해서 객체를 만들어준다
console.log(newUser);
/*
{name: 'Mike', age: 30}
age: 30
name: "Mike"
[[Prototype]]: Object
*/
const salaryMan = Object.assign({ salary : 100000000 }, man); // 전혀 별개의 개체
console.log(salaryMan); 
/*
age: 30
name: "Mike"
salary: 100000000
[[Prototype]]: Object
*/

const copy_user = {
    name : 'Mike'
}
const info1 = {
    age : 30
}
const info2 = {
    gender : 'male'
}

Object.assign(user, info1, info2); //여기서 만약에 Key값이 같다면 그냥 덮어씌어지게 된다. 

//Object.keys() : 키 배열 반환
const key_user = {
    name : 'Mike',
    age : 30,
    gender : 'male'
}

let object_keys = Object.keys(key_user); // 오브젝트의 키 값만 추출한다.

//Object.values() : 값 배열 반환
let object_values = Object.values(key_user); //오브젝트의 값만 추출한다.

//Object.entries() : 키/값 배열 반환
console.log(Object.entries(key_user)); 
/*
0: (2) ['name', 'Mike']
1: (2) ['age', 30]
2: (2) ['gender', 'male']
length: 3
[[Prototype]]: Array(0)
*/

function makeObj(key, val){
    return {
        [key] : val
    };
}

const obj = makeObj("성별", "male");
const obj2 = makeObj("나이", "12");
//[key]를 저렇게 써주면 key값을 미리 정하는게 아니라 호출할때 받는 파라미터로 key값을 재정의 할 수 있다. 대박...
```

아직... 내용정리 더 필요.. 플러그인 추가 현업 코드 코린이 코드 비교