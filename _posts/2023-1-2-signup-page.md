---
layout: single
title: "Making a registration page Part 1"
categories: [JavaScript, HTML, CSS]
tag: [JavaScript, HTML, CSS]
author_profile: false
sidebar:
    nav: "docs"
---
## Making a signup page using basic HTML, CSS, JavaScript knowledge

Today I tried to create a registration page to test the knowledge I learned as I did the Cyworld Project.

### My code for today

I first created the structure using HTML:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>회원가입</title>
    <link href="./final.css" rel="stylesheet">
    <script src="./final.js"></script>
</head>
<body>
    <div class="signup">
        <div class="wrapper">
            <div class="title">코드캠프 회원가입</div>
            <div class="inputBox">
                <input class="input" id="email" type="text" placeholder="이메일을 입력해주세요." onclick="enterInfoE()">
                <input class="input" id="name" type="text" placeholder="이름을 입력해주세요." onclick="enterInfoN()">
                <input class="input" id="pw1" type="text" placeholder="비밀번호를 입력해주세요." onclick="enterInfoPw1()">
                <input class="input" id="pw2" type="text" placeholder="비밀번호를 다시 입력해주세요." onclick="enterInfoPw2()">
            </div>
            <div class="phone">
                <div class="phone__number">
                    <input class="input2" id="p1" type="text" oninput="enterP1()" maxlength="3" re = \d>
                    <span>ー</span>
                    <input class="input2" id="p2" type="text" oninput="enterP2()" maxlength="4" re = \d>
                    <span>ー</span>
                    <input class="input2" id="p3" type="text" oninput="enterP3()" maxlength="4" re = \d>
                </div>
            </div>
            <div class="authentication">
                <div class="auth__num" id="authNum">000000</div>
                <button class="authClick" id="authSend" disabled="true" onclick="auth()">인증번호 전송</button>
            </div>
            <div class="time">
                <div class="timer" id="timer">3:00</div>
                <button class="authComplete" id="authDone" disabled="true" onclick="authDone()">인증 완료</button>
            </div>
            <div class="region">
                <select class="input">
                    <option  disabled="true" selected="true">지역을 선택하세요.</option>
                    <option class="options">서울</option>
                    <option class="options">경기</option>
                    <option class="options">인천</option>
                </select>
            </div>
            <div class="gencheck">
                <input id="dotcheck" type="radio" name="gender">여성
                <input id="dotcheck" type="radio" name="gender">남성
            </div>
            <div class="divideLine"></div>
            <div class="register">
                <button class="register__button" id="registerClick" onclick="registerClick()">가입하기</button>
            </div>
        </div>
    </div>
    
</body>
</html>
```
I designed the UI with CSS:
```css
* {
    box-sizing: border-box;
    margin: 0px;
}

html, body {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.signup {
    display: flex;
    background-color: white;
    border: 1px solid #AACDFF;
    border-radius: 20px;
    width: 540px;
    height: 900px;
    justify-content: center;
    box-shadow: 7px 7px 39px rgba(0, 104, 255, 0.25);
}

.wrapper {
    display: flex;
    flex-direction: column;
}

.title {
    width: 380px;
    height: 47px;
    margin-top: 40px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    font-weight: 700;
    font-size: 32px;
    color: #0068FF;
}

.inputBox {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.input {
    width: 100%;
    height: 60px;
    color: black;
    border: 1px solid #D2D2D2;
    border-radius: 7px;
    font-weight: 400;
    font-size: 16px;
}

.phone {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    width: 100%;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.input2 {
    width: 100px;
    height: 100%;
    border: 1px solid #D2D2D2;
    border-radius: 7px;
}

.authentication {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.auth__num {
    font-weight: 400;
    font-size: 18px;
    color: #0068FF;
}

.authClick {
    width: 120px;
    height: 40px;
    background-color: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 7px;
    font-size: 16px;
    font-weight: 400;
    color: #D2D2D2;
    margin-left: 20px;
    cursor: pointer;
}

.time {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.timer {
    font-weight: 400;
    font-size: 18px;
    color: #0068FF;   
}

.authComplete {
    width: 120px;
    height: 40px;
    background-color: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 7px;
    font-size: 16px;
    font-weight: 400;
    color: #D2D2D2;
    margin-left: 20px;
    cursor: pointer;
}

.region {
    margin-top: 20px;
    margin-bottom: 20px;
}

.input {
    font-size: 16px;
    font-weight: 400;
    color: #797979;
}

.options {
    color: black;
}

.gencheck {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#dotcheck {
    width: 20px;
    height: 19.95px;
    margin-left: 20px;
    background-color: #EBEBEB;
    border: 1px solid #D2D2D2;
}

.divideLine {
    width: 100%;
    border-top: 1px solid #E6E6E6;
    margin: 10px 0px;
}

.register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
}

.register__button {
    width: 100%;
    height: 75px;
    background-color: #FFFFFF;
    border: 1px solid #0068FF;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 400;
    color: #0068FF;
    cursor: pointer;
}
```

And then I tried to put in some function with JavaScript:
```javascript

function enterInfoE() {
    document.getElementById("email").style="border: 1px solid #0068FF"
    let email = document.getElementById("email").value
    
    if (email) {
        document.getElementById("name").focus()
    }
}

function enterInfoN() {
    document.getElementById("name").style="border: 1px solid #0068FF"
    let name = document.getElementById("name").value
    
    if (name) {
        document.getElementById("pw1").focus()
    }
}

function enterInfoPw1() {
    document.getElementById("pw1").style="border: 1px solid #0068FF"
    let pw1 = document.getElementById("pw1").value
    
    if (pw1) {
        document.getElementById("pw2").focus()
    }
}

function enterInfoPw2() {
    document.getElementById("pw2").style="border: 1px solid #0068FF"
    let pw2 = document.getElementById("pw2").value
    
    if (pw2) {
        document.getElementById("p1").focus()
    }
}

function enterP1() {
    document.getElementById("p1").style="border: 1px solid #0068FF"
    let phone1 = document.getElementById("p1").value
    if (phone1.length === 3) {
        document.getElementById("p2").focus()
    }
}

function enterP2() {
    document.getElementById("p2").style="border: 1px solid #0068FF"
    let phone2 = document.getElementById("p2").value
    if (phone2.length === 4) {
        document.getElementById("p3").focus()
    }
}

function enterP3() {
    document.getElementById("p3").style="border: 1px solid #0068FF"
    let phone3 = document.getElementById("p3").value
    if (phone3.length === 4) {
        document.getElementById("authSend").disabled = "false"
        document.getElementById("authSend").style="color: #0068FF"
    }
}

let isStarted = false;

function auth() {
    if (isStarted === false) {
        isStarted = true;
        document.getElementsById("authDone").disabled = false;
        document.getElementsById("authDone").style="background-color: #0068FF; color: #FFFFFF; border: 0px";
        const token = String (Math.floor(Math.random()*1000000)).padStart(6, "0")
        document.getElementsById("authNum").innerText = token

        let time = 10
        let timer
        timer = setInterval(function(){
            if (time >= 0) {
                let min = Math.floor(time / 60)
                let sec = String(time % 60).padStart(2,"0")
                document.getElementsById("timer").innerText = min + ":" + sec
                time = time - 1
            } else {
                document.getElementsById("authDone").disabled = true;
                isStarted = false
                clearInterval(timer)
            }
        }, 1000)
    } else {
        isStarted = false;
    }
}

function authDone() {
    if (document.getElementById("timer").innerText !== "0:00") {
        console.log("인증이 완료되었습니다.")
    }
}

function registerClick() {
    if (document.getElementById("authNum").innerText !== "000000") {
        console.log("가입이 완료되었습니다.")
    } else {
        
    }
}
```
This is the incomplete version. Since the instructor was expecting 1 hour, this is about as far as I could get from  an hour. 
However, I some functions do not work well and some designs look awkward, so I will try to fix that tomorrow.
