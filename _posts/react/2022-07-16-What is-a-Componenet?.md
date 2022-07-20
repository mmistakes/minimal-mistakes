---

layout: single
title: "What is a Componenet?"
categories: "React"
tag: [Components ]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
date: 2022-07-16
last_modified_at: 2022-07-16

---



## 1. React is all about “Components”

[![component](https://imchanyo.netlify.app/static/74a0b0625f512a057571172a4df4bbe7/fe486/component.png)](https://imchanyo.netlify.app/static/74a0b0625f512a057571172a4df4bbe7/23a6b/component.png)

### 1-1. Reusability

- Block의 반복을 피하게 해준다.

### 1-2. Separation of Concerns

- 코드를 작고 관리할 수 있는 규모로 유지할 수 있습니다.
- 모든 HTML,JS의 거대한 파일을 가질 필요가 없어집니다.
- 모든 사용자 인터페이스에서 분리되어 작은 단위로 관리할 수있고, 그럼 각 컴포넌트가 하나의 사항에 대해서만 집중 할 수있게 됩니다. 그리고 코드를 여러 개의 파일로 나누면 작은 단위이기 떄문에 수업을 진행하면서 코드를 관리하기 수월해집니다.

```jsx
function CreateSupportChannel(email) {
    if(!email || !email.includes('@')) {
        showErroMessage('Invalid email - could not create channel');
    }

function inputIsValid(email, password){
    return emailIsValid(email) && password && password.trim() !== '';
}

function emailIsValid(email){
    return email && email.includes('@');
}

function showErroMessage(message){
    console.log(message)
}
```

#### 일반적인 프로그래밍에 관해 생각해봅시다.

어떤 프로그래밍언어든지 관계없이 여러분은 함수로 작업을 할 것입니다. 그리고 위의코드처럼 코드를 여러 개의 작은 함수로 나누겠죠. 그럼 작은 함수들이 아웃 소스 로직을 함수로 바꾸고 우려사항을 나눠서 같은 코드를 여러번 실행할 수있습니다. 리액트는 이러한개념을 통해 코드를 나누고 프론트 엔드 웹 앱 세상에 옮깁니다.

코드를 여러개의 컴포넌트로 나눈뒤에 필요에 따라 섞어서 쓸 수 있습니다.

```jsx
function CreateSupportChannel(email) {
    // 아웃소스 로직 -> 함수로 변환
    if(emailIsValid(email)) {
        showErroMessage('Invalid email - could not create channel');
    }

    //....
```

## 2. How Is A Compoenet Built?

[![component1](https://imchanyo.netlify.app/static/351a0cb91eacb1fad478d340bfa3bdb4/fe486/component1.png)](https://imchanyo.netlify.app/static/351a0cb91eacb1fad478d340bfa3bdb4/e52c7/component1.png)

사용자 인터페이스는 HTML, CSS , 자바스크립트와 관련이 있습니다. HTML, CSS , 자바스크립트가 결합하는 겁니다.

리액트로 작업하고 컴포넌트를 만들 때도 같은 방법을 이용합니다. HTML, CSS, 자바스크립트를 통합해서 같은 컴포넌트로 묶고 사용자 인터페이스를 만드는 겁니다.

- 리액트는 컴포넌트로 구성되고, 모든 걸 합쳐서 컴포넌트를 만들 수 있습니다.
- 리액트로 재사용 할 수 있고 반응하는 컴포넌트를 만들 수 있습니다.
- 리액트는 선언 접근 방식이라는 걸 사용합니다. 이 방식으로 컴포넌트를 만듭니다.
- 선언 접근방식이란 리액트가 선호하는 타겟 상태를 정한 뒤에 책임지고 실제 돔 지시를 생성하고 실행하는 것입니다.
- 리액트에게 특정 HTML 요소가 사용자 인터페이스의 특정 장소에 만들어지고 삽입되도록 할 수 없습니다.
