---
layout: single
title: "Action Value + Creator "
categories: React
tag: [React_Grammar_Intensive,Sail99]
---



# Action Value + Creator

## 궁극적목적 : 휴먼에러 방지

dipatch로 액션을 담은 객체를 보낼때,

type의 이름과 리듀서의 case의 이름을 일치켜야하는데,

case의 개수가 많아지면 직접 다 수정해야함

이들을 관리하기 위한 **Action value + creator 등장**



### Action Value형태

Reducer를 하나하나 나누기보다는 **변수**형태로 관리하면 편할 것.

1. case문 안에 문자열을 직접  변수를 가지고오자 

   => reducer상단에 action value 변수를 상수로 생성

   

   ex) `export const Plus_one = "Plus_one"` 

   ​	 컴포에서 import {Plus_one} 

   : App컴포에서도 쓰려고 export-import

   이후 컴포 타입에 변수를 할당.

   ---

   하지만  이후 action 객체에 payload도 들어가게 되면 타이핑이 많아져

   휴먼에러 발생률up => action value 를 다른형태로 관리해보자 (action creator)

   ---



### Action creator형태

우선 함수의 모양을 가짐

```react
export const plusOne = () => {
  return {
    type: Plus_one,
  };
};
```







