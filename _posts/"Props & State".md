




# props & State 


## 1. Hook의 개념

 Hook이란?
 <ul>
  <li> 클래스 컴포넌트에서만 사용할 수 있었던 상태 관리와 라이프 사이클 관리기능을 함수 컴포넌트에서도 사용할 수 있도록 연동해주는 <br>함수를 의미합니다.
 </ul>
 
 Hook의 특징
 <ul>
  <li>함수 컨포넌트에서만 사용 가능!
  <li>hook의 이름은 반드시 'use-'로 시작!
  <li>내장 hook이 존재합니다 (리액트에서 지원! ex _ useState, useEffect 등) 
  <li>내장 훅이 아닌 직접 만들어 사용하는 hook은 'custom hook'이라 합니다
  </ul>

 Hook의 사용규칙
  <ul>
  <li>hook은 함수 컴포넌트 혹은 custom hook 안에서만 호출 할 수 있습니다.
  <li>hook은 함수 컴포넌트 내의 최상위에서만 호출이 가능합니다.
  </ul>
  



## 2. Props의 개념

  props란?
  <ul>
  <li> 컴포넌트의 속성값
    <br>→ 부모 컴포넌트로부터 전달받은 데이터를 지니고 있는 객체
  </ul>
  
  
  props의 특징
  <ul>
  <li> 전달하고자 하는 어떤 값이든 자식 컴포넌트에 전달이 가능합니다
    <br>→ 문자, 숫자, 변수, 함수 등
    
  <li>부모 컴포넌트에선 tag에 속성을 주입하듯 자식 컴포넌트에 전달하고자 하는 데이터를 추가할 수 있습니다.
    </ul>
<br><br>

![image](https://user-images.githubusercontent.com/117936577/209046526-42a192dc-95e9-4261-ac35-ac9783795d62.png)

     ▲'Props'을 활용하여 부모컴포넌트에서 사용한 변수를 자식컴포넌트에서 사용할 수 있는 예시











## 3. State의 개념
 State란?
 <ul>
 <li>컴포넌트 내부에서 가지고 있는 컴포넌트의 상태값!
   <br>→ 해당 컴포넌트가 UI에 보여줄 정보를 결정할 때 사용할 수 있는 상태값
 <li>컴포넌트 내에서 정의하고 사용하며 얼마든지 변경할 수 있다.
</ul><br>

## 4. useState hook

![image](https://user-images.githubusercontent.com/117936577/209062888-7eb8cde7-9f3f-45c6-a61b-a3050634172d.png)

     ▲'useState를 사용하여 [변수, set변수]를 선언, useState를 해당 컴포넌트에서 사용할 수 있는 예시 


<br> let [Color,setColor] = useState("red") => Color의 기본 값을 "red"로 부여하고 변경이 필요할 때 setColor("변경색")을 활용한다.

useState를 사용하여 setColor("색상") 변경사항을 입력하면 Color="색상"을 입력했을때에 반해 화면을 리렌더링을 하게된다. 
즉, useState을 사용하여 변경해야 리렌더링을 통해 화면에 변경사항을 구현할 수 있다.




## 5. props, State를 함께 활용한 이벤트


![image](https://user-images.githubusercontent.com/117936577/209066033-e8027fc8-53f8-4eac-acf9-c5fdff6c87b5.png)


    ▲ 위처럼 부모 컴포넌트에서 자식 컴포넌트로 props와 state을 넘겨줄 수 있지만 반대로, 자식 컴포넌트에서 부모 컴포넌트로 넘겨줄 순 없습니다.



2022_12_22
