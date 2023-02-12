---
layout: single
title: "styled components"
categories: React
tag: [React_Grammar_Intensive,Sail99,setting]
---

# Styled Components



> ## 환경설정

extension에 styled-components 설치(전역설치됨)

yarn add styled-components로 json package 추가



```react
import React from 'react'
import "./App.css"
import styled from "styled-components"

//스타일링 css in js --> styled component 로 하는 방법 강의
// div는 컴포명 ``안에 인수 넣어주면 진행
//styled.뒤에는 항상 html 요소 옴
const StBox = styled.div`
width : 100px;
height : 100px;
border : 1px solid red;
margin : 20px;
`

// ex: p태그에 적용
// const StP = styled.p`
// color : blue;
// `


function App() {
  return (
      <>
    <StBox borderColor="red">
          박스
    </StBox>
          </>
  )
}

export default App
```



### CSS  in JS

JS로 CSS코드 작성하는 방식

Props를 통해 부모=>자식 컴포로  **조건부 스타일링** 가능

### 참고 :  styled components => 지역스타일링





# 글로벌 스타일링

---



프로젝트 규모가 클 경우 사용

1. 전역적 스타일링 위해 파일 생성

```react
import { createGlobalStyle } from "styled-components";

const GlobalStyle = 
/* body태그 밑의 요소에 모두 적용해라 */
      createGlobalStyle`
body{
    font-family: "Helvetica", "Arial", sans-serif;
  line-height: 1.5;
  }
`;

export default GlobalStyle;



```





# Sass방식

---



: 그래서 코드의 재사용성을 높이고, 가독성 또한 향상시켜줄 수 있는 방법이 바로 Sass

### 변수화하여 사용

```react
$color: #4287f5;
$borderRadius: 10rem;

div {
	background: $color;
	border-radius: $borderRadius;
}
```

### 중첩하여 사용 == Nesting

```react
label {
      padding: 3% 0px;
      width: 100%;
      cursor: pointer;
      color: $colorPoint;

      &:hover {
        color: white;
        background-color: $color;
      }
}

label스타일 내 hover시 저렇게 사용된다 이렇게도 사용가능
```

### Import하여 사용 가능

```css
//// colors
$color1: #ed5b46;
$color2: #f26671;
$color3: #f28585;
$color4: #feac97;

==========================================


//style.scss
@import "common.scss";

.box {
	background-color: $color3;
}

//보는 바와 같이 변수화된 $colors를 import하여 $color3;를 css파일에서 바로 사용
//보통 회사내 지정된 컬러가 있을 것 그것을 끌어와 사용할 떄 유용할듯
```



# CSS Reset

---



```react
import React from "react";

function App() {
  return (
    <div>
      <p>나는 p태그</p>
    </div>
  ); 
}

export default App;
```

위의 상황일 때 default margin 몇px font-size 몇px padding :몇px; 등등 
**default style**이 존재함



검색시 나오는 많은 방법중 강의 내 사용방법은
