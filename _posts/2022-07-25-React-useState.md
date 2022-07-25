---
layout: single
title: "[React] Hooks : useState() 함수 "
categories: React
tags: [React]
toc: true


---

### 2022.07.22

<span style ='color:blue'>React Hooks - useState()</span>

React 컴포넌트에서 동적인 값을 <span style ='color:red'>State</span>라고 부른다. 

사용자 인터랙션을 통해 컴포넌트의 상태값이 동적으로 바뀔 경우에는 상태를 관리하는 것이 필요하다. 

오늘 배운 <span style ='color:red'>useState()</span> 함수는 함수형 컴포넌트에서도 상태를 관리할 수 있게 해준다. 

```react
import {useState} from 'react';

function App(){
  let post = 'React Blog';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집','파이썬 독학'])
  
  return(
    <div className="App">
      <div className="black-nav">
        <h4 style={{color : 'red', fontSize : '16px'}}>{post}</h4>
      </div>
      
      <button onClick={()=>{
          let array = [...글제목].sort();
          글제목변경(array)
        }}>가나다 정렬</button>
  		<div className='list'>
    	<h4>{ 글제목[0] }</h4>
      </div>
    </div>
  );
}
```

```react
import {useState} from 'react';
```

: React 패키지에서 useState 함수를 불러오는 식을 먼저 선언한다. 

```react
function App(){
  let [글제목,글제목변경] = useState(['0','0','0'])
}
```

: useState() 함수를 호출하면 배열을 반환하는데 [글제목]은 <span style = 'color:red'>현재 상태값 변수</span>이고, [글제목변경]은 <span style = 'color:red'>상태값을 갱신해줄 수 있는 Setter 함수</span>이다.  useState 괄호 안의 값은 <span style = 'color:red'>상태초기의 값</span>이다. 

```react
 return(
    <div className="App">
      <div className="black-nav">
        <h4 style={{color : 'red', fontSize : '16px'}}>{post}</h4>
      </div>
     
     불가능
     <div></div>
     <div></div>
     
     가능 	
     <div>
     <div></div>
     </div>
```

: html은 return 함수 안에서 작성해야 하며 return() 안에는 <span style ='color:red'>병렬로 태그 2개이상 기입이 금지</span>된다. 



<span style ='background-color:black;'>[유튜브 코딩애플을 통해 공부](https://www.youtube.com/watch?v=fE4t2Ovgp-0&list=PLfLgtT94nNq0qTRunX9OEmUzQv4lI4pnP&index=3)</span>



