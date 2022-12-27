# useEffect


## 1. React에서 Side Effect의 올바른 발생시점
<ul>
  <li>함수의 return문 위에서 바로 하고싶은 동작(Side Effect)를 실행하자
    <br/> → SideEffect 발생의 문제점<br/>
       1. Side Effect가 렌더링을 Blocking 한다.<br/>
       2. 매 렌더랑마다 Side Effect가 수행된다.
  </ul>

 ### ▶ Side Effect가 렌더링을 Blocking
  - 코드는 위에서 아래방향으로 순차적 진행이 이루어집니다.
  - 선언한 SideEffect의 동작이 끝날 때 까지 JSX를 return하는 코드로 넘어가지 않습니다.<br/>
      ex) alert ("alert 창을 닫기전까진 JSX의 return문을 읽을 수 없어요!")
  - 함수 컴포넌트가 JSX를 리턴하기 전까지는 브라우저상에 UI는 렌더링 되지 않습니다.
  - Side Effect가 종료되기 전까진 렌더링을 하지못하는 브라우저는 UI를 띄울 수 없습니다.
<br/>

  ### ▶ 매 렌더링마다 Side Effect가 수행된다.
  - 특정 사이드 이펙트는 매번 수행될 필요가 없습니다.
  - React에서 함수 컴포넌트의 리렌더링은 함수 컴포넌트를 다시 호출하는 방식으로 실행 됩니다.
  - 즉, 매 렌더링마다 함수 컴포넌트가 호출된다는 것입니다.
  - 함수의 본문에 작성한 코드들은 함수가 호출될 때 마다 실행됩니다.
  - Data Fetching 등 특정한 상황에서만 필요한 Side Effect가 매 렌더링마다 (매 함수 호출마다) 발생하는 것은 비효율적입니다. <br/>


  ## 따라서 
   - 렌더링을 Blocking 하지 않기 위해서 <b>렌더링이 모두 완료되고 난 후에 실행할 수 있어야합니다.</b>
   - 매 렌더링마다 실행되는 것이 아니라 <b>원할때만 조건부로 실행할 수 있어야합니다.</b>
<br/>

▶ 이것을 가능하게 해주는 것이 <b>'useEffect hook'</b> 입니다.

 <br/>
 <br/>



## 2. useEffect의 사용법

![image](https://user-images.githubusercontent.com/117936577/209595860-3f40a4dd-c7ce-4c50-ab81-ad5b212c205b.png)

</br>
useEffect hook 안에 있는 동작들을 화면의 UI 렌더링이 다 끝난 뒤에 실



## 3. 조건부 Side Effect 발생시키기






## 4. Rendering & Effect Cycle





## 5. Clean Up Effect








