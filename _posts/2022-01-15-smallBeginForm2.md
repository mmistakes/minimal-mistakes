---
layout: post
title: "JS로 HTML 로드 (중복 코드 줄이기)"
---

# 1. 모든 view에 들어갈 navbar 생성

# 2. navbar 넣고 싶은 view에 태그 추가
```
        <nav class="navbar" includeHtml="navbar.html">
        </nav>
```

# 3. includeHTML 함수 생성
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
          
          /* 중복 방지를 위해 속성 삭제 뒤 함수 호출 */
          elmnt.removeAttribute("includeHTML");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}
```

이렇게 하니까 현재 view의 모든 내용이 request됨...

<br> <br>
참고 자료 : https://www.w3schools.com/howto/howto_html_include.asp
