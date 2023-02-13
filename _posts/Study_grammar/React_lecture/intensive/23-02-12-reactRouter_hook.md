---
layout: single
title: "router HOOK  "
categories: React
tag: [React_Grammar_Intensive,Sail99]
---



# HOOK of router



## useNavigate

## useLoaction

```react
import React from "react";
import { useNavigate, useLocation} from "react-router-dom";

function Home() {
  const navigate = useNavigate(); //useNavigate import하여 선언
  const location = useLocation(); // 사용시 선언하여 사용
  return (
    <div>
      Home
      <br />
      <button
        onClick={() => {
          navigate("/works");//button onclick ==> "/works" 페이지로 이동
        }}
      >
        works로 이동
      </button>
    </div>
  );
}

export default Home;


//useLocation 사용시 콘솔로 찍으면
hash
: 
""
key
: 
"4lbtpxe7"
pathname
: 
"/"
search
: 
""
state
: 
null

이러한 내용이 있는데 추후 이 데이터를 가지고 조건부 렌더링을 위해 많이 사용할 값들
```



## Link API 

: 훅은 아니지만 HTML a태그와 같은 역할(Navigate와는 약간의 차별점)

## useParams

: import해서 사용가능 

역할 : 현재 Routing 페이지로 넘어온 **파라미터들의 정보**를 받아볼 수 있는 훅

   

## children의 용도

만약 웹페이지 내 `header`  와 `footer` 부분이 바뀌지 않고 그 중간 부분만 바뀐다고 가정했을 떄

<Hello>

<div>HI </div>

</Hello> 

이런식으로 children값만 바꾸어서 제공하게 되면 헤더 푸터를 리렌더하지 않고도 진행 가능

(props초반에 진행했던 layout생각해보자)