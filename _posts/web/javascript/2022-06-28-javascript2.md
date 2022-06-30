---
layout: single
title : "[js] 자바스크립트 객체와 클래스, 프로토타입[CORE]"
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

<br>
<br>

#### 0장. 학습한 내용으로 만든 결과물 미리보기

클래스 ES6 문법(IE 동작 X, EDGE O)

ex) 계산기 모듈

> js 클래스와 프로토타입 개념을 학습하면 아래와 같은 계산기를 클래스화 하여 만들수 있다


<!-- ![calulator](../../../images/posts/js/calculator.png){: width="100" height="100"} -->
<center><img src="../../../images/posts/js/calculator.png" width="400" height="400"></center>



#### 1장. 객체 리터럴, 생성자 맛보기
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

1-1장. 생성자 함수
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
```


1-2장. Computed property
```js
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

#### 2장. 객체 리터럴 복습[핵심]
<b>여기부터는 js 핵심파트</b>니까 꼭 다시한번 보면서 정리하자.

```js
$(document).ready(function(){
    tabMenu1.init();
});
function pr(param){
    console.log(param);
}
//리터럴 클래스로 정의
var tabMenu1 = {
    //3개의 멤버변수 초기화
    $tabMenu : null,
    $menuItems : null,
    $selectMenuItem : null,

    //요소의 값 지정하는 메서드
    init : function(){
        pr("init 호출");
        pr(this);
        this.$tabMenu = $("#tabMenu1");
        this.$menuItems = this.$tabMenu.find("li");
        this.initEvent();
    },

    //이벤트 등록
    initEvent : function(){
        var objThis = this;
        console.log("objThis : "+objThis);
        console.log(objThis);
        this.$menuItems.on("click", function(){
            console.log("click이벤트 안에 있는 this : "+this);
            console.log(this);
            objThis.setSelectItem($(this));
        })
    },

    setSelectItem : function($menuItem){
        console.log("setSelectItem 에 있는 this : "+this);
        pr(this);
        console.log("setSelectItem 에 있는 $menuItem : "+$menuItem);
        pr($menuItem)
        if(this.$selectMenuItem){
            this.$selectMenuItem.removeClass("select");
        }
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass("select");

    }
}
//결론은 오브젝트 리터럴 방식은 오로지 하나의 인스턴스만 가진다. {}에 프로퍼티, 메서드가 존재하므로 정의함과 동시에 인스턴스가 생성된다.
//따로 우리가 new 연산자를 사용하지 않아도 하나의 인스턴스는 만들어지지만 여러개를 만들지 못한다.
//오브젝트 리터럴 방식의 주 용도는 요러개의 데이터를 포장용으로 사용하거나 함수에 매개 변수값으로 줄 때 이 방식이 유용하다.


```

```js
$(document).ready(function(){
    //매개변수 5개 가지는 함수 구현(call by value 방식)
    
    //오브젝트 리터럴 클래스를 매개변수로 받고 있다.
    function showInfo(userInfo){
        document.write("리터럴 방식<br>");
        document.write("userName : "+userInfo.userName + " , id : "+userInfo.id + " , nickname : "+userInfo.nickname+" , age : "+userInfo.age+" , address : "+userInfo.address);
        document.write("<br>");
    }
    
    //오브젝트 리터럴 클래스 방식으로 매개변수를 주는 코드
    var userInfo = {
        userName : "신은혁",
        id : "ek",
        nickname : "태권소년",
        age : 15,
        address : "대구시"
    }

    //함수호출 - 오브젝트 리터럴 방식을 사용하지 않은 일반적 방식
    //showInfo("신은혁", "ek", "태권소년", 15, "대구시");
    
    //함수호출 - 오브젝트 리터럴 방식으로 사용
    showInfo(userInfo);
});      
```

jquery 호출시 옵션으로 {}객체 형태를 전달함으로써 한번에 간결하게 호출[좋은 습관]
```js
$(document).ready(function(){
    /*
        var $bar1 = $("#bar1");
        $bar1.css("position", "absolute");
        $bar1.css("left", 100);
        $bar1.css("top", 100);
    */

    //가독성이 올라가고 효율적 
    var $bar1 = $("#bar1").css({
        "position" : "absolute",
        "left": 100,
        "top" : 100
    })
})

```
#### 2장. 클래스란?[핵심]
```js
//클래스를 설계하는 부분(붕어빵틀을 만드는 과정)
function Person(){
    this.name = "신은혁";
    this.age = 15;
    this.address = "대구시";
    this.displayPerson = function(){
        document.write("name : "+this.name+" , age : "+this.age);
    };
}

//인스턴스를 생성
var person = new Person();
person.displayPerson();
person.age = 20;
person.displayPerson();
```

클래스 심화 TabMenu
```js
$(document).ready(function(){
    var tab = new TabMenu();
    tab.init();
    tab.initEvent();
});

//Tab메뉴 클래스 설계
function TabMenu(){
    //프로퍼티의 초기화
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectedMenuItem = null;
    
    //초기화 멤버메서드 init()만들기
    this.init = function(){
        this.$tabMenu = $("#tabMenu1");
        this.$menuItems = this.$tabMenu.find("li");
    }

    //이벤트 등록 멤버 메서드 initEvent() 만들기
    this.initEvent = function(){
        var _this = this;
        this.$menuItems.on("click", function(){
            _this.setSelectItem($(this)); 
            //여기서 던져줄때 jquery로 만들어서 던져주던가 or 받는쪽에서 jquery로 만들어서 사용하던가.
        })
    };

    this.setSelectItem = function(selectedMenu){
        console.log(this.$selectedMenuItem);
        if(this.$selectedMenuItem){
            this.$selectedMenuItem.removeClass("select");
            console.log(this.$selectedMenuItem);
        }
        this.$selectedMenuItem = selectedMenu;
        this.$selectedMenuItem.addClass("select");
        console.log(this.$selectedMenuItem);
    }
}
```

반복연습
```js
$(document).ready(function(){
    var tab = new TabMenu("#tabMenu1").init();
    var tab = new TabMenu("#tabMenu2").init();
    /*
    var tab2 = new TabMenu();
    tab2.init("#tabMenu2");
    tab2.initEvent();
    */
});

//Tab메뉴 클래스 설계(코드의 재사용성이 높아진다.)
function TabMenu(selector){
    //프로퍼티의 초기화
    this.$tabMenu = $(selector);
    this.$menuItems = null;
    this.$selectedMenuItem = null;
    
    //초기화 멤버메서드 init()만들기
    this.init = function(){
        this.$menuItems = this.$tabMenu.find("li");
        console.log("init");
        this.initEvent();
    }

    //이벤트 등록 멤버 메서드 initEvent() 만들기
    this.initEvent = function(){
        console.log("initEvent호출");
        var _this = this;
        this.$menuItems.on("click", function(){
            _this.setSelectItem($(this)); //여기서 던져줄때 jquery로 만들어서 던져주던가 or 받는쪽에서 jquery로 만들어서 사용하던가.
        })
    };

    this.setSelectItem = function(selectedMenu){
        console.log(this.$selectedMenuItem);
        if(this.$selectedMenuItem){
            this.$selectedMenuItem.removeClass("select");
            console.log(this.$selectedMenuItem);
        }
        this.$selectedMenuItem = selectedMenu;
        this.$selectedMenuItem.addClass("select");
        console.log(this.$selectedMenuItem);
    }
}

```


#### 3장. 클래스 및 프로토타입[핵심]
```js
//클래스를 설계하는 부분(붕어빵틀을 만드는 과정)
function Person(){
    this.name = "신은혁";
    this.age = 15;
    this.address = "대구시";
    
}

Person.prototype.displayPerson = function(){
    document.write("name : "+this.name+" , age : "+this.age+" <br>");
};

//인스턴스를 생성
var person = new Person();
person.displayPerson();
person.age = 20;
person.displayPerson();

var person2 = new Person();
person2.displayPerson();
```

위에서 작성했던 객체리터럴 방식을 클래스와 프로토타입 방식으로 변경

```js
$(document).ready(function () {
    var tabMenu1 = new TabMenu("#tabMenu1");
    var tabMenu2 = new TabMenu("#tabMenu2");

});

//Tab메뉴 클래스 설계
function TabMenu(selector) {
    //프로퍼티의 초기화
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectedMenuItem = null;

    //해당 selector에 의해서 각기 다른 인스턴스를 만들기 위해서
    //init() 호출이 된다.
    //여기서 호출하는게 앞에는 없고 뒤에 prototype에 만들었어도 여기서 이런방식으로 사용할 수 있다.!!!!!!!!!!!!!!!!
    this.init(selector);
    this.initEvent();
}

//초기화 멤버메서드 init()만들기
TabMenu.prototype.init = function (selector) {
    this.$tabMenu = $(selector);
    this.$menuItems = this.$tabMenu.find("li");
}

//이벤트 등록 멤버 메서드 initEvent() 만들기
TabMenu.prototype.initEvent = function () {
    var _this = this;
    this.$menuItems.on("click", function () {
        _this.setSelectItem($(this)); //여기서 던져줄때 jquery로 만들어서 던져주던가 or 받는쪽에서 jquery로 만들어서 사용하던가.
    })
};

TabMenu.prototype.setSelectItem = function (selectedMenu) {
    console.log(this.$selectedMenuItem);
    if (this.$selectedMenuItem) {
        this.$selectedMenuItem.removeClass("select");
        console.log(this.$selectedMenuItem);
    }
    this.$selectedMenuItem = selectedMenu;
    this.$selectedMenuItem.addClass("select");
    console.log(this.$selectedMenuItem);
}
```

쉬운 구구단 예제
```js
$(document).ready(function(){
    var my99dan = new My99DAN();

    
    /*
    $("#3dan").click(function(){
        my99dan.print3dan();
    });

    $("#6dan").click(function(){
        my99dan.print6dan();
    });

    $("#9dan").click(function(){
        my99dan.print9dan();
    });
    */
    $("#clear").click(function(){
        my99dan.clear();
    });
});

//클래스 설계하기
function My99DAN(){
    //출력 노드 찾아오기
    this.$output = $("#output");
    this.init();
}

My99DAN.prototype.init = function(){
    var dan = prompt("출력을 원하는 단을 입력하세요.");
    this.print99dan(dan);
}

My99DAN.prototype.print99dan = function(dan){
    if(isNaN(dan)){
        alert("문자입니다.");
        this.init();
        return;
    } 
    var str = "";
    for(var i = 1; i <= 9; i+=1){
        str += dan + " * " + i + " = " + (dan * i) + "<br>";
    }
    this.$output.html(str);
}
/*
My99DAN.prototype.print3dan = function(){
    this.print99dan(3);
}

My99DAN.prototype.print6dan = function(){
    this.print99dan(6);
}

My99DAN.prototype.print9dan = function(){
    this.print99dan(9);
}
*/

My99DAN.prototype.clear = function(){
    this.$output.html("");
}
```

#### 4장. 탭메뉴 예제 마무리
```js
$(document).ready(function(){
    var tab = new TabMenu();
    tab.init();
    tab.initEvent();
});

//Tab메뉴 클래스 설계
function TabMenu(){
    //프로퍼티의 초기화
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectedMenuItem = null;
    
    //초기화 멤버메서드 init()만들기
    this.init = function(){
        this.$tabMenu = $("#tabMenu1");
        this.$menuItems = this.$tabMenu.find("li");
    }

    //이벤트 등록 멤버 메서드 initEvent() 만들기
    this.initEvent = function(){
        var _this = this;
        this.$menuItems.on("click", function(){
            _this.setSelectItem($(this)); //여기서 던져줄때 jquery로 만들어서 던져주던가 or 받는쪽에서 jquery로 만들어서 사용하던가.
        })
    };

    this.setSelectItem = function(selectedMenu){
        console.log(this.$selectedMenuItem);
        if(this.$selectedMenuItem){
            this.$selectedMenuItem.removeClass("select");
            console.log(this.$selectedMenuItem);
        }
        this.$selectedMenuItem = selectedMenu;
        this.$selectedMenuItem.addClass("select");
        console.log(this.$selectedMenuItem);
    }
}

//탭메뉴 정보 추가(클래스 프로퍼티와 메서드)
TabMenu.version = "1.0";
TabMenu.getInfo = function(){
    let info = {
        developer : "차가운핫초코",
        email : "Giyeon@naver.com",
        desc : "탭 메뉴를 구현한 클래스입니다."
    };
    return info;
}
console.log(TabMenu.getInfo().email);


```

#### 5장. 절차지향과 객체지향의 차이

<b>절차지향 방식</b>

```js
//절차지향적 프로그램의 예
var $tab1MenuItems = null;
var $tab2MenuItems = null;

$(document).ready(function(){
    $tab1MenuItems = $("#tabMenu1 li");
    $tab2MenuItems = $("#tabMenu2 li");
    
    //함수의 매개변수로 전역데이터를 넘겨준다.
    tabMenu($tab1MenuItems);
    tabMenu($tab2MenuItems);

    //탭메뉴 초기화 이벤트 리스터 등록
    $("#btnReset").click(function(){
        resetTabMenu($tab1MenuItems);
        resetTabMenu($tab2MenuItems);
    })
});

//탭메뉴 생성
function tabMenu($menuItems){
    $menuItems.click(function(){
        selectMenuItemAt($menuItems, $(this).index());
    })
}

//n번째 탭메뉴 선택
function selectMenuItemAt($menuItems, index){
    $menuItems.removeClass("select");
    $menuItems.eq(index).addClass("select");
}

function resetTabMenu($menuItems){
    $menuItems.removeClass("select");
}
```

<b>객체지향 방식</b>

```js
//객체지향적 프로그래밍의 예
//코드의 재사용성이 매우 높다. 외부에서 접근할려면 인스턴스 변수를 가지고
//얼마든지 접근을 할 수가 있다.
$(document).ready(function(){
    var tabMenu1 = new TabMenu("#tabMenu1");
    var tabMenu2 = new TabMenu("#tabMenu2");

    $("#btnReset").click(function(){
        tabMenu1.clearItems();
        tabMenu2.clearItems();
    })
})

//탭메뉴 클래스 정의(설계)
function TabMenu(selector){
    //this는 new라는 연산자로 메모리에 객체가 올라갔을때 사용할 수 있는것이다.
    //함수에서 그냥 쓰는 this는 window객체라고 보면 된다. 만약 new를 안쓰고 TabMenu("#tabMenu1");
    // 쓰면 window {window: Window, self: Window, document: document, name: '', location: Location, …} 생성
    console.log(this);
    this.init(selector);
    this.initEvent();
}

//요소 초기화
TabMenu.prototype.init = function(selector){
    console.log("init호출");
    //인스턴스가 생성이 되면 탭메뉴가 생성이 되고 li태그를 찾아와라.
    this.tabMenu = $(selector);
    this.$menuItems = this.tabMenu.find("li");
    console.log(this.$menuItems);
}

//이벤트 초기화
TabMenu.prototype.initEvent = function(){
    console.log("initEvent호출");
    console.log(this);
    var localThis = this;
    console.log(this.$menuItems);
    this.$menuItems.on("click", function(){
        console.log(this);
        //선택된 아이템의 인덱스를 가지고 메서드를 호출하고 있다.
        localThis.setSelectMenuItemAt($(this).index());
    });
}

//n번째 탬메뉴 선택
TabMenu.prototype.setSelectMenuItemAt = function(index){
    this.$menuItems.removeClass("select");
    this.$menuItems.eq(index).addClass("select");
}

//초기화 클릭시 이벤트 발생
TabMenu.prototype.clearItems = function(){
    this.$menuItems.removeClass("select");
}       
```

#### 6장. 결과물 미리보기(계산기)

```js
class Calculator{
    constructor(options){
        this.calculator = $('#calculator');
        this.text = options.text;
        this.date = options.date;
        
        //content에 들어갈 내용
        this.title = options.title; //아이콘 이름
        this.content = options.content;
        this.type = options.type; //icon , program
        this.size = options.size;

        //Program 버튼 셋팅
        this.closeBtn = null;

        //계산기 전용
        this.content = this.calculator.find('.content');
        this.buttons = this.calculator.children('.bottom').find('span');
        this.leftNum = '';
        this.rightNum = '';
        this.inputNumberFlag = 'left';
        this.tempNum = '';
        this.showNum = '';
        this.operator = '';
        this.operatorFlag = false;
        
        this.focusFlag = false;
        

        this.init();
    }
    init(){
        this.closeBtn = this.calculator.find("#closeBtn");
        this.initEvent();
    }
    initEvent(){
        var _this = this;
        //draggable 할수있게 해주자
        this.calculator.draggable({
            handle : '.top'
        });
        this.closeBtn.on('click', function(){
            _this.closeProgram();
        })
        this.buttons.on('click', function(){
            _this.clickButton($(this)[0].outerText);
        })
        this.calculator.on('click', function(){
            _this.calculator.toggleClass('focus');
            _this.focusFlag = !_this.focusFlag;
            console.log(_this.focusFlag);
        })
        window.addEventListener('keydown', function(e){
            console.log(e.key);
            if(_this.focusFlag){
                let code = e.keyCode;

                if((code>47 && code < 58) || e.ctrlKey || e.altKey || code == 8 || code == 9 || code ==46 || e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == 'Enter' || e.key == 'Escape' || e.key == '.'){
                    _this.clickButton(e.key);     
                    return;
                }
            }
        })

    }
    closeProgram(){
        //숨기기
        this.calculator.stop().slideToggle();
    }
    clickButton(param){
        let input = param;

        if(isNaN(input) && input != '.'){
            this.inputNotNumber(input);
        }else{
            //숫자가 들어올때
            if(this.inputNumberFlag == 'left'){
                this.leftNum += input;
            }else{
                this.rightNum += input;
            }
        }
        this.showNumber();
    }
    showNumber(){
        console.log(this.leftNum + " " + this.operator+" "+this.rightNum +"");
        this.content.text(this.leftNum + " " + this.operator+" "+this.rightNum +"");
        if(this.leftNum == ''){
            this.content.text('0');
        }
    }
   

    inputNotNumber(input){
        // if(this.operator != '' && this.leftNum != ''){
        //     console.log("1");
        //     this.operator = input;
        //     return;
        // }else 
        if(this.leftNum == ''){
            return;
        }
        if(this.leftNum != '' && this.rightNum != ''){
            console.log("2");
            this.runCalculator();
        }
         //숫자가 아닌경우(연산자가 들어올때)
         switch (input){
            case '+' : this.operator = '+'; break;
            case '-' : this.operator = '-'; break;
            case 'x' : this.operator = '*'; break;
            case '*' : this.operator = '*'; break;
            case '÷' : this.operator = '÷'; break;
            case '/' : this.operator = '÷'; break;
            case 'C' : this.operator=''; this.leftNum=''; this.rightNum=''; this.inputNumberFlag = 'left'; return; 
            case 'Escape' : this.inputNumberFlag = 'left'; this.operator=''; this.leftNum=''; this.rightNum=''; return; 
            case '.' : return;
            case '+/-' : return;
            case '%' : return;
                // if(this.inputNumberFlag == 'left')
                //     this.leftNum += '.';
                // else
                //     this.rightNum += '.';
                break;
            // case '=' : this.runCalculator(); break;
        }
        if(this.input != '.') this.inputNumberFlag = 'right';
        if(input == 'C' || input == 'Escape') this.inputNumberFlag = 'left';
    }

    runCalculator(){
        console.log('runCAl');
        let number1 = Number(this.leftNum);
        let number2 = Number(this.rightNum);
        let answer = null;
        switch (this.operator){
            case '+' : answer = number1 + number2; console.log("+"); break;
            case '-' : answer = number1 - number2; console.log("-"); break;
            case '*' : answer = number1 * number2; console.log("x"); break;
            case '÷' : answer = number1 / number2; console.log("÷"); break;
            case 'C' : this.leftNum = ''; this.rightNum =''; this.operator ='';
            case '=' : this.runCalculator; break;
            break;
        }
        this.operator = '';
        this.inputNumberFlag = 'left';
        this.leftNum = answer;
        this.rightNum = '';
        this.content.text(answer);
    }
    
}
```


```
학습한 내용을 바탕으로 이번 토이프로젝트에 들어갈 계산기를 만들어보았습니다.
아직 많이 부족하지만 지금까지 학습한 내용을 바탕으로 클래스 형태로 구성하여 만들었는데 
아직도 많이 부족한것 같습니다.

나중에는 div 태그 하나에 js 한줄로 완벽기능을 가진 계산기 컴포넌트를 만드는것을 목표로 열심히 하겠습니다.
```

이 글이 다른분들에게 도움이 되었으면 좋겠습니다.

