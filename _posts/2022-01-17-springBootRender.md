---
layout: post
title: "스프링부트 html 렌더"
---

며칠 동안 왜 안되나 봤더니  
`<html lang="en" xmlns:th="http://www.thymeleaf.org">` 에서 xmlns 부분을 안썼다..  
그러니까 타임리프를 쓴다고 인식이 안되서 스프링부트 html 렌더가 안된 것...  

<br>

# 디렉토리
![image](https://user-images.githubusercontent.com/86642180/149716085-5691fb34-0b07-460a-b242-3174233722c4.png)
공통으로 들어갈 부분은 fragment 폴더에만 저장할 것이다.  

<br>

# 설정
공통 부분으로 들어갈 코드 작성 이후  
`xmlns:th="http://www.thymeleaf.org"` 타임리프를 사용하겠다는 코드 추가  
`<div th:fragment="fragment-nav">` 공통부분을 한 번 더 div로 감싸줌(렌더될 부분)  

<br>

# 렌더
렌더할 뷰페이지에도 `xmlns:th="http://www.thymeleaf.org"` 추가  
`<div th:replace="/fragment/navbar.html :: fragment-nav"></div>` 추가할 부분에 맞게 코드 추가  
⭐ 렌더할 때 경로는 기본적으로 templates를 스캔하기 때문에 templates을 쓰지 않는다!  

<br>

# 헷갈리던 점
그 전에 렌더가 안되서 자바스크립트로 가져오는 코드를 작성했다.  
```
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  
  /* 현재 문서 (navbar.html말고)의 모든 요소를 z에 다 가져옴 */
  z = document.getElementsByTagName("*");
  
  /* for문으로 elmnt 객체에 하나하나 배열로 넣어줌 */
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    
    /* 2에서 추가한 attribute(불러올 HTML 파일명)를 file에 넣어주고 여부 확인 */
    file = elmnt.getAttribute("includeHTML");
   
    if (file) {
      /* includeHTML 속성을 가진 개체가 있다면 비동기적 방식인 XMLHttpRequest로 navbar 데이터 요청(가져옴) */
      xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function() {   /* XMLRequest 객체의 상태가 바뀔때 반응하는 이벤트 핸들러 작성 */
      /* readyState = XMLRequest 객체의 상태, status = 서버 상태 */
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}

        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}
```
그때 컨트롤러에서 navbar.html을 리턴해야지만 작동이 잘 됐다.  
이유가 좀 헷갈렸는데 gradle은 templates에서 view를 찾는다.  
컨트롤러에서 리턴되는 view만 웹브라우저에 보여지는데(화면 생성 요청이 되어 스캔된 것이니까)  
스캔이 안된 navbar.html은 웹브라우저에서 보여지는게 안됨..  
그래서 컨트롤러에서 리턴해주니까 잘 되던것  

<br>

결론은 지금 잘 작동한다!  
오늘 브랜치 병합까지 완료  
운동 다녀온 이후에 폼 조건 넣어줄 예정  
