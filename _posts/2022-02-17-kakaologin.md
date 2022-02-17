---
layout: single
title:  "자바스크립트로 카카오로그인 api구현하기"
---

# 자바스크립트로 카카오로그인 api구현하기


## 로그인 API를 사용하는 이유
왜 로그인 API를 사용하는 걸까?

1. 비밀번호암호화, 회원가입시 유효성검사와 암호화 등 로그인과 회원가입기능에 
신경써야할 부분이 많기 때문에 로그인 API를 쓰면 로그인과 회원가입을 대신해 주기 때문에 
회원관리하기가 편해진다.

2. 유저입장에서도 회원가입절차가 줄어들어 사용성이 높아진다.

### 환경설정

* 스프링부트
* JQUERY
* EL표현식
* JSTL

## 카카오로그인 기본 셋팅.
카카오로그인 API 사용법에는 REST API와 자바스크립트 API가 있는데 나는 웹버전이라 브라우저가 자바스크립트를 지원해주기때문에 자바스크립트 버전을 사용해 구현했다.

카카오로그인 API를 사용하기 위해 KAKAO DEVELOPER사이트에서 접근 키를 받아야한다.

https://developers.kakao.com/docs/latest/ko/kakaologin/js

1. 애플리케이션 추가 ⇒ 카카오api 접근 키 생성됨 → 외부로 유출nono(보안문제)
![](https://images.velog.io/images/ggujunhee/post/0e4bc197-5441-4202-b79f-2b0565aa1721/image.png)
![](https://images.velog.io/images/ggujunhee/post/3a0d3702-714b-4f75-9bc3-df2da669648a/image.png)

2. 플랫폼 web 사이트도메인 등록하기
    ![](https://images.velog.io/images/ggujunhee/post/b3c06b9f-2fb3-4668-8875-6e939084f679/image.png)
    
3. redirect URI 등록 (restAPI 사용시 필수 등록.)
![](https://images.velog.io/images/ggujunhee/post/c45f5e9b-ec16-43ef-aebd-e73de99d3569/image.png)    
    
4. 동의항목 체크
    1. 필수 동의 (사용자가 동의를 선택시 사용가능.)
![](https://images.velog.io/images/ggujunhee/post/83089869-d030-4271-bca4-a68fbf096b7e/image.png)


## 카카오로그인 구현.
<br>

![](https://images.velog.io/images/ggujunhee/post/e47bcfcd-3cab-4b59-8a5a-fbb5739fcd61/image.png)


### html
``` jsp
<!-- 로그인 모달창 -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
					<div class="d-flex justify-content-center">
						<a href="#" class="text-reset p-2" title="Tooltip">비밀번호 찾기</a> 
						<span class="p-2"> | </span> 
						<a href="registerUser" class="text-reset p-2" title="Tooltip">회원가입</a>
					</div>
				</div>
				<div class="modal-footer ">
	    		   <p>SNS 로그인</p>
		    		<div class="border p-3 mb-4 bg-light d-flex justify-content-between">
			    		<%-- 
			    			카카오 로그인 처리중 중 오류가 발생하면 아래 경고창에 표시된다.
			    			카카오 로그인 오류는 스크립트에서 아래 경고창에 표시합니다.
			    		 --%>
			    		<div class="alert alert-danger d-none" id="alert-kakao-login">오류 메세지</div>
						    		
		    			<a id="btn-kakao-login" href="kakao/login">
		  					<img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="200" alt="카카오 로그인 버튼"/>
						</a>
		    		</div>
		    		<form id="form-kakao-login" method="post" action="kakao-login">
		    			<input type="hidden" name="email"/>
		    			<input type="hidden" name="name"/>
		    			<input type="hidden" name="img"/>
		    		</form>
				</div>
			</div>
		</div>
	</div>
```
<br>

### jsp의 자바스크립트
``` java
$(function(){

	$("#btn-kakao-login").click(function(event){
		// a태그 기능 실행멈춤.
		event.preventDefault();
		// 카카오 로그인 실행시 오류메시지를 표시하는 경고창을 화면에 보이지 않게 한다.
		$("alert-kakao-login").addClass("d-none");
		// 사용자 키를 전달, 카카오 로그인 서비스 초기화.
		Kakao.init('본인 접근키 입력');
		// 카카오 로그인 서비스 실행하기 및 사용자 정보 가져오기.
		Kakao.Auth.login({
			success:function(auth){
				Kakao.API.request({
					url: '/v2/user/me',
					success: function(response){
						// 사용자 정보를 가져와서 폼에 추가.
						var account = response.kakao_account;
						
						$('#form-kakao-login input[name=email]').val(account.email);
						$('#form-kakao-login input[name=name]').val(account.profile.nickname);
						$('#form-kakao-login input[name=img]').val(account.profile.img);
						// 사용자 정보가 포함된 폼을 서버로 제출한다.
						document.querySelector('#form-kakao-login').submit();
					},
					fail: function(error){
						// 경고창에 에러메시지 표시
						$('alert-kakao-login').removeClass("d-none").text("카카오 로그인 처리 중 오류가 발생했습니다.")
					}
				}); // api request
			}, // success 결과.
			fail:function(error){
				// 경고창에 에러메시지 표시
				$('alert-kakao-login').removeClass("d-none").text("카카오 로그인 처리 중 오류가 발생했습니다.")
			}
		}); // 로그인 인증.
	}) // 클릭이벤트
})// 카카오로그인 끝.
```

kakao.auth.login(auth)을 request하면 유효시간이 존재하는 토큰을 준다.
그 url이 /v2/user/me이고 회원가입을 시키려면 비밀번호를 제외한(비밀번호는 당연히 제공이 안되기때문) 다른 정보들을 가져와 controller로 보내 유저정보를 추가한다.
로그인버튼하나로 회원가입까지 완료되는 것이다.

위의 코드에선 email, nickname, img를 가져와서 form에 넣고 controller로 submit을 시켰다.
<br>

### Controller
```java
	// kakao로그인 요청을 처리한다.
	@PostMapping("/kakao-login")
	public String loginWithKakao(KakaoLoginForm form){
		log.info("카카오 로그인 인증정보:"+ form);
		
		User user = User.builder()
					.email(form.getEmail())
					.name(form.getName())
					.img(form.getImg())
					.loginType(KAKAO_LOGIN_TYPE)
					.build();
		
		User savedUser = userService.loginWithKakao(user);
		
		// 저장된 회원정보가 없으면 전달받은 회원정보를 세션에 저장, 있으면 기존 정보 저장.
		if(savedUser != null) {
			SessionUtils.addAttribute("LOGIN_USER", savedUser);
		}else {
			SessionUtils.addAttribute("LOGIN_USER", user);
		}
		
		return "redirect:/";
	}

```
이렇게 전달받은 정보를 post로 받아서 user객체에 정보들을 저장하고 테이블에 동일한 email이 있는지 확인하고 존재하는 경우, savedUser을 세션에 저장한다.
존재하지 않는 경우엔 user정보를 테이블에 저장(service에서)하고 그 정보를 세션에 저장한 후 home으로 이동시킨다.

* 여기서 중요한 점 하나!
> loginType으로 일반로그인과 구분해야한다.

일반회원가입과 카카오로그인의 탈퇴방식이 다르고 카카오로그인이면 비밀번호정보가 없기때문에 비밀번호 변경등 일부 서비스에 제한을 둬야함으로 loginType으로 구분해줘야한다.
<br>

### Service

```java
	// 카카오 로그인
	public User loginWithKakao(User user) {
		User savedUser = userMapper.getUserByEmail(user.getEmail());
		if(savedUser == null) {
			userMapper.addUser(user);
		}
		return savedUser;
	}
```
저장된 회원정보인지 확인하는 과정이다.
* email로 테이블에서 회원정보를 조회한 결과값이 null이면 신규회원임으로 저장.
* null이 아닌 경우, 저장된 유저정보를 그대로 반환해서 기존회원임을 알려준다. 