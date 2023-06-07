---
layout: single
title:  "Project - Guess the number game"
tag: [Javascirpt]
Projects: [Guess the number game]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





 <a href ="https://guess-number-game932.netlify.app/" target="_blank">Guess the number game project 주소</a>

# ◆Guess the number game - javascript

```javascript
let computerumber = 0;
let usernumber = document.getElementById("user-number");
let resultarea = document.getElementById("result-area");
let playbutton = document.getElementById("play-button");
let chancearea = document.getElementById("chance-area");
let resetbutton = document.getElementById("reset-button");
let img = document.getElementById("basic-img");
let usernumberlist = [];
let chance =5;
playbutton.addEventListener("click", play);
resetbutton.addEventListener("click", reset);
usernumber.addEventListener("focus", function(){
    usernumber.value = "";
});

function num (){
    computerumber = Math.floor(Math.random()*100)+1;
    console.log("정답", computerumber);
}
num();

function play(){
    let uservalue = usernumber.value;
    
    if(uservalue<1 || uservalue>100 || uservalue == null || isNaN(uservalue) == true){
        resultarea.innerText = "1부터 100사이의 값을 입력하세요.";
        return;
    }

    if(usernumberlist.includes(uservalue)){
        resultarea.innerText = "이미 입력한 값 입니다.";
        return;
    }
    
    
    chance --;
    chancearea.innerText = `남은기회 ${chance}번`
    
    if(uservalue < computerumber){
       resultarea.innerText = "UP!"
       img.src="images/up.gif";
   }else if(uservalue > computerumber){        
       resultarea.innerText = "DOWN!"
       img.src="images/down.gif";
   }else {
    resultarea.innerText = "That's right!"
       img.src="images/success.gif";
       playbutton.disabled = true;
   return;
   }

    
    if(chance==0){
        resultarea.innerText = "~GAME OVER~"
        img.src="images/fail.gif";
        playbutton.disabled = true;
    }

    usernumberlist.push(uservalue);
}

function reset(){
    chance =5;
    chancearea.innerText = `남은기회 ${chance}번`
    playbutton.disabled = false;
    usernumberlist = [];
    usernumber.value = "";
    num ();
    resultarea.innerText = "1부터 100사이의 값을 입력하세요.";
    img.src="images/basic.gif";
}
```

<br/>

``변수 및 이벤트 지정``

```javascript
let computerumber = 0;
let usernumber = document.getElementById("user-number");
let resultarea = document.getElementById("result-area");
let playbutton = document.getElementById("play-button");
let chancearea = document.getElementById("chance-area");
let resetbutton = document.getElementById("reset-button");
let img = document.getElementById("basic-img");
let usernumberlist = []; //usernumber에 입력하는 숫자들의 배열 값
let chance =5; //기회는 5번

playbutton.addEventListener("click", play); //playbutton 클릭 시 play 함수 실행
resetbutton.addEventListener("click", reset); //resetbutton클릭 시 reset 함수 실행
usernumber.addEventListener("focus", function(){
    usernumber.value = "";
}); //usernumber에 마우스가 이동하였을 때 입력값을 null(없음)으로 변경하는 함수 실행
```

<br/>

``램덤 숫자 지정``

```javascript
function num (){
    computerumber = Math.floor(Math.random()*100)+1;
    console.log("정답", computerumber);
} 
num();
/*Math.floor()함수를 쓰고 100까지의 숫자 표현을 위해 100을 곱해준 뒤, 
  Math.floor()함수를 이용하여 자연수만 표현되도록 만들어 준다. 
  Math.floor(Math.random()*100)은 1~99까지 밖에 표현이 안되서 +1을 더해준다.
  num(); 함수를 불러준다.
*/
```

<br/>

``playbutton을 클릭했을 때 실행할 함수``

```javascript
function play(){
    let uservalue = usernumber.value;
    
    if(uservalue<1 || uservalue>100 || uservalue == null || isNaN(uservalue) == true){
        resultarea.innerText = "1부터 100사이의 값을 입력하세요.";
        return;
    }
    //입력값 중 1 또는 100 또는 입력안함 또는 null 값이면 결과창에 "1부터 100사이의 값을 입력하세요." 출력
    //chance 값 감소가 안되도록 return값을 주어 함수를 마무리 한다.
    
    if(usernumberlist.includes(uservalue)){
        resultarea.innerText = "이미 입력한 값 입니다.";
        return;
    }
    //usernumberlist(입력한 값의 배열) 중 uservalue(입력한 값)이 포함되어 있으면 결과창에 "이미 입력한 값 입니다." 출력
    // chance 값 감소가 안되도록 return값을 주어 함수를 마무리 한다.
```

<br/>

``기회 설정``

```javascript
chance --;
    chancearea.innerText = `남은기회 ${chance}번`
//입력한 값이 위의 if문에 아무것도 포함이 되지않는다면 기회가 하나씩 감소한다.
//chance값에 `남은기회 ${chance}번`표시된다.
```

<br/>

``결과값 출력``

```javascript
if(uservalue < computerumber){
       resultarea.innerText = "UP!"
       img.src="images/up.gif";
//입력값이 램덤번호보다 작다면, 결과창에 "UP!" 출력
//이미지도 "images/up.gif" 주소변경
   }else if(uservalue > computerumber){        
       resultarea.innerText = "DOWN!"
       img.src="images/down.gif";
//입력값이 램덤번호보다 크다면, 결과창에 "DOWN!" 출력
//이미지도 "images/down.gif" 주소변경
   }else {
    resultarea.innerText = "That's right!"
       img.src="images/success.gif";
       playbutton.disabled = true;
//입력값이 램덤번호와 일치한다면(크지도 않고 작지도 않고), 결과창에 "That's right!" 출력
//이미지도 "images/success.gif" 주소변경
//playbutton은 비활성화 시킨다.
   return;
//chance가 0일때의 조건문이 실행되지 않도록 return을 사용하여 함수를 마무리 한다.(chance값이 0이 될때 입력값이 램덤번호와 일치하면 "~GAME OVER~"값이 아닌 "That's right!" 출력한다.)
   }
```

<br/>

``찬스값이 0일때``

```javascript
 if(chance==0){
     resultarea.innerText = "~GAME OVER~"
     img.src="images/fail.gif";
     playbutton.disabled = true;
 }
//chance값이 0일때 결과창에 "~GAME OVER~" 출력
//이미지도 "images/fail.gif" 주소변경
//playbutton은 비활성화 시킨다.
```

<br/>

``입력값 배열``

```javascript
usernumberlist.push(uservalue);
}
//usernumberlist(입력한 값의 배열)에 uservalue(입력한 값)을 넣어주어야지 추후에 if문을 활용하여 동일 입력값이 있는지 확인할수 있다.
```

<br/>

``리셋함수``

```javascript
function reset(){
    chance =5; //chance값을 5번 넣어준다.
    chancearea.innerText = `남은기회 ${chance}번` 
    playbutton.disabled = false; //playbutton은 비활성화 시킨다.
    usernumberlist = []; //이전게임에서 입력했던 값을 없애기 위해 usernumberlist 배열을 다시 재할당 해준다.
    usernumber.value = "";
    num (); //램덤숫자을 다시 지정해 준다.
    resultarea.innerText = "1부터 100사이의 값을 입력하세요.";
    img.src="images/basic.gif";
}
```

<br/>





# ◆프로젝트 중 몰랐던 개념 정리



## < Math>

-수학에서 자주 사용하는 상수와 함수들을 미리 구현해 놓은 자바스크립트 표준 객체이다.<br/>

|     Math      | 설명                                                       |
| :-----------: | :--------------------------------------------------------- |
| Math.random() | 0~1사이의 값을 반환(1에 근접한 값까지 출력해서 1은 미포함) |
| Math.floor()  | 소수점 버림                                                |
| Math. ceil()  | 소수점 올림                                                |
| Math.round()  | 소수점 반올림                                              |
|  Math.max()   | 여러개의 값중 제일 큰값 반환                               |
|  Math.min()   | 여러개의 값중 제일 작은값 반환                             |

<br/>







## <다양한 노드의 속성값>

```html
<!--예제-->
<div id='my_div'>
  안녕하세요?     만나서 반가워요.
  <span style='display:none'>숨겨진 텍스트</span>
</div>
```



### 1)innterHTML

-Element의 HTML,XML을 읽어오거나, 설정할 수 있으며 태그 안에있는 HTML 전체 내용을 들고온다.<br/>
즉, innerHTML을 사용하면 내부 HTML 코드를 JavaScript 코드에서 새 내용으로 쉽게 변경할 수 있는 것이다.<br/>

```javascript
console.log(document.getElementId("my_div").innerHTML);
//안녕하세요?     만나서 반가워요.
//<span style='display:none'>숨겨진 텍스트</span>
```



### 2)innerText

-사용자에게 보여지는 텍스트 값만 반환한다.(글자사이에 스페이스가 많으면 스페이스를 한칸만 남기고 가져옴)<br/>

```javascript
console.log(document.getElementId("my_div").innerText);
//안녕하세요? 만나서 반가워요.
```



### 3)textContent

-해상 노드가 가지고 있는 텍스트 값을 그대로 가져온다.<br/>

```javascript
console.log(document.getElementId("my_div").textContent);
//안녕하세요?     만나서 반가워요.
//숨겨진 텍스트
```

<br/>





## <백틱(``)사용법>

-**표현식 삽입**을 할 수 있다.<br/>-형식 : `고정값${변수}`

```javascript
//예제
chancearea.textContent = `남은기회 ${chance}번`
```

<br/>





## <height: 100% 와 height: 100vh의 차이점>

### -height: 100%

-요소를 감싸고 있는 부모의 높이를 100%로 채운다는 의미이다.<br/>

```html
<body>
    <div id ="container">
        <p>
            "안녕하세요"
        </p>
    </div>
</body>
```

```css
#container{
    background-color: red;
}
#container p{
    heigth: 100%
    background-color: yellow;
}
```

![height 100]({{site.url}}/images/2023-06-02-Guess the number game/height 100.png)

위의 이미지와 같이 heigth을 100%로 설정해도 채워지지가 않는다. <br/>그 이유는 브라우저 입장에서는 html>body>div의 계층이 있는데 html이나 body의 browser를 꽉 채워야 하위에 있는 div도 꽉 채울 수 있기 때문이다.<br/>

따라서 아래와 같은 내용이 추가되어야 한다.<br/>

```css
html, body {
    height: 100%
}
```



### -height: 100vh

-부모와 상관없이 화면을 채우고 싶은 경우 vh(view heigth)단위를 사용한다.<br/> -vh단위는 높이를 사용하기 때문에 부모와 상관없이 동작한다.<br/>

```css
#container{
    background-color: red;
}
#container p{
    heigth: 100vh
    background-color: yellow;
}
```

![height 100 2]({{site.url}}/images/2023-06-02-Guess the number game/height 100 2.png)

따라서 예제의 body태그도 vh단위를 사용했다.

```css
.body{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image:url("images/numberbackground.jpg");
    margin: 0;
    font-family: 'Poppins', sans-serif;
}
```

<br/>





## < Input tag>

-type의 유형에 따라 입력형식을 구현할 수 있다.<br/> -type: 입력태그 유형<br/> -value: 입력태그의 초기값을 말하며 사용자가 변경 가능하다.<br/> -name: 서버로 전달되는 이름을 말한다.<br/>

|   유형   | 예제                                                         | 설명                                                         |
| :------: | ------------------------------------------------------------ | :----------------------------------------------------------- |
|   text   | < input type="text" name="텍스트" value="기본내용" size="텍스트 필드 크기" maxlength="최대 문재개수"> | 빈텍스트를 입력하는 유형                                     |
|  button  | < input type="button" value="버튼이름" onclick="window.open()" > | 버튼을 만들고 싶을 때 사용하며 함수 지정가능하다.            |
| checkbox | < label>< input type="checkbox" name="english" value="영어">영어</ label> | 선택이 가능한 유형이면 label 태그와 같이 사용                |
| password | < input type="password" id="userpass" size="텍스트 필드 크기"> | 패스워드 입력유형이고 화면에는'*'로 표시된다.                |
|  search  | < input type="serch">                                        | 검색상자를 만드는 유형                                       |
|  hidden  | < input type="hidden" name="나라" value="korea(서버에 전송 될 값)"> | 화면에는 표시가 되지 않지만 서버에 입력 form을 전송 시 함께 전송 |
|  reset   | < input type ="reset">                                       | 사용자가 입력한 모든 정보를 지울 수 있다.                    |
|   tel    | < input type ="tel">                                         | 전화번호 입력을 위한 태그로써 바로 통화 연결될 수 있다.      |
|  email   | < input type="email">                                        | 이메일을 입력하기 위한 유형으로써  브라우저 자체에서 '@'들어간 이메일 형식인지 검사해준다. |
|   file   | < input type="file">                                         | 파일을 첨부하고 싶을 때 사용                                 |

<br/>



## <버튼 비활성화 하기>

### 1)태그에 직접 disabled 입력

```html
<!--HTML-->
<input type ="button" value = "activated"/> <!-- activated 버튼은 항상 활성화 상태-->
<input type ="button" disabled value = "deactivation"/> <!--deactivation 버튼은 비활성화 상태-->
```



### 2)자바스크립트를 통한 비활성화

```html
<!--HTML-->
<body>
<input type='button' id='target-btn' value ='play'>
<input type='button' value='activated' onclick='btnActive()' >
<input type='button'  value='deactivation' onclick='btnDisabled()' >
</body>
```

```javascript
//Javascript
function btnActive (){
    let target = document.getElementById('target-btn');
    target.disabled = true;
};
function btnDisabled(){
    let target = document.getElementById('target-btn');
    target.disabled = false;
};
btnActive(); // deactivation 버튼을 클릭해도 play버튼이 클릭 안됨
btnDisabled(); // activated 버튼을 클릭하면 play버튼이 클릭됨
```

<br/>





## <Text-align(텍스트 정렬)>

-text-align속성에 값을 넣으면 정렬이 된다.<br/>-text-align: "정렬방법";

|     정렬     | 설명                                          |
| :----------: | :-------------------------------------------- |
|    start     | 현재 텍스트 줄의 시작 위치에 맞추어 문단 정렬 |
|     end      | 현재 텍스트 줄의 끝 위치에 맞추어 문단 정렬   |
|     left     | 왼쪽 정렬                                     |
|    right     | 오른쪽 정렬                                   |
|    center    | 가운데 정렬                                   |
|   justify    | 양쪽 정렬                                     |
| match-parent | 부모 요소에 따라 문단 정렬                    |

<br/>





## <location.href : 페이지 이동>

-location.href : href는 location 객체에 속해있는 프로퍼티로 현재 접속중인 페이지 정보를 갖고 또한 값을 변경할 수 있는 속성이기 때문에 다른 페이지로 이동가능하다.<br/>

|                 속성                 | 설명                                     |
| :----------------------------------: | :--------------------------------------- |
| onclick="location.href='index.html'" | 현재 페이지에서 다른 페이지으로 이동하기 |
| onclick="window.open('index.html')"  | 새 페이지에서 다른 페이지 열기           |
|     onclick="location.reload();"     | 현재 페이지 새로고침                     |
|      onclick="history.back();"       | 뒤로 가기                                |
|      onclick="history.go(-1);"       | 뒤로 1번 가기                            |

<br/>





## < Element selectors>

-자바스크립트가 HTML의 값을 가져와 다루기 위해서 태그를 선택하여야 하는데, document객체에서 다양하게 선택하는 방식이 있다.<br/>

|             선택자              | 설명                                                         |
| :-----------------------------: | :----------------------------------------------------------- |
|     doucment.getElementByld     | id로 선택                                                    |
| doucment.getElementsByClassName | class로 선택, 같은 class가 여러개 있을 경우 모두 다 선택되어 배열에 저장된다. |
|     document.querySelector      | id,class둘다 선택이 가능하고 좀더 디테일한 선택이 가능하다. <br/>참고로 선택가능한 값이 여러개가 있을 경우 그중에 첫번째 태그 하나만 반환한다. |
|    document.querySelectorAll    | doument.qurerySelector과 같지만, 선택된값 모두를 nodelist에 담아 반환한다. |
