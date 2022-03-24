---
layout: single
title: "19-회원제 게시판 만들기_SpringBoot와 JPA"
categories: memberboard
tag: [springbot, jpa]
toc: true
author_profile: false
toc: false
sidebar:
  nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}

<center><h2>인터셉터(interceptor) - SpringBoot</h2></center>

<center><h2>[인터셉터(interceptor)]</h2></center><br>

<center><h3>[인터셉터(interceptor)기능 추가하기]</h3></center><br>

<center><h6>인터셉터(interceptor) 기능은 로그인 하지 않은 회원이 예를 들어 글쓰기 링크를 클릭하는 경우<br>
            글쓰기 페이지로 가는 명령을 가로채서 login 페이지를 먼저 보여주어 <br>
            관리자가 허용하는 일부의 메뉴를 제외하고는 모두 로그인 후 사용토록 강제하는 기능이다.<br>
            실제 기능은 아래 동영상을 참고하면 된다.</h6></center>

<div>
<iframe width="250" height="600" src="https://www.youtube.com/embed/r-Jj6eLHJY0" frameborder="0" allowfullscreen></iframe> </div>

<center><h6>먼저 interceptor package를 생성하고 거기에 LoginCheckInterceptor를 class 형태로 생성하여<br>
            아래와 같이 코딩한다.</h6></center>

``` java 
public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    // @Override: 부모가 가진 메서드를 재정의 함
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        // 사용자가 요청한 주소
        String requestURI = request.getRequestURI();
        System.out.println("requestURI = " + requestURI);
        // 세션 가져옴
        HttpSession session = request.getSession();
        // 세센에 로그인 정보가 있는지 확인(session도 request 객체안에 들어있는 것)
        if(session.getAttribute(SessionConst.LOGIN_EMAIL) == null) {
            // session에 값이 있으면 로그인한 상태를 의미
						// 위 if문에 해당하는 건은 미로그인 상태를 의미
            // 로그인을 하지 않은 경우 바로 로그인페이지로 보냄.
            // 로그인 후 로그인 직전 페이지를 보여준다.
            session.setAttribute("redirectURL", requestURI);
            response.sendRedirect("/member/login");
            // 사용자가 요구한 주소값을 가지고 감.
            // MemberController loginForm 메서드를 일부 수정해야 함.
            return false;
        } else {
            // 여기는 로그인 한 상태를 의미
            return true;
        }
    }
}
```

<br>


<center><h6>여기까지 확인이 되면 인터셉터(interceptor) 기능은 정상적으로 구현되었다. </h6></center>

<center><h2>[ 인터셉터(interceptor) 파트 끝 ]</h2></center>