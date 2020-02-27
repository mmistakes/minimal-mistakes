---
title: \[다날-과제] 가맹점(CP) - 다날(TX 서버-TUNA)간 휴대폰 결제 비즈니스 로직 개발
categories: [Danal, TUNA]
tags:
   - TX(TUNA)
   - 휴대폰 결제
author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true #Table Of Contents 목차 보여줌
toc_label: "My Table of Contents" # toc 이름 정의
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

date: 2020-02-12T14:29:00 # 최초 생성일
last_modified_at: 2020-02-12T14:29:00 # 마지막 변경일

---

<!-- intro -->
{% include intro %}

해당 포스팅은 지속적으로 업데이트 될 수 있습니다.
{: .notice--success}

# 들어가며
실제 서비스 되는 휴대폰 결제의 비즈니스 로직을 작성하는 과제를 수행하게 되었다.  
흐름은 가맹점의 인증 -> 구매자에 대한 인증 -> 결제 / 취소 에 대한 로직을 작성하려고 한다.  

# 휴대폰 결제 흐름

1. 사용자가 가맹점을 통해 물건을 사려고 할 때, 가맹점은 다날의 서버 즉 TX에게 자신(가맹점)에 대한 인증 요청을 보낸다.   
2. 가맹점 인증이 완료되면, 구매자를 인증해야 함으로 가맹점은 Web을 통해 사용자로부터 사용자 정보를 받아 TX 서버에게 사용자 인증 요청을 보낸다.  
사용자 인증에 성공하면, 인증된 사용자가 구매자와 동일한지 인증하기 위해 사용자의 휴대폰으로 OTP를 보낸다.  
3. 사용자는 가맹점 -> 다날 Web을 통해 자신이 받은 OTP를 TX에게 보내 인증 요청을 한다.  
4. OTP까지 성공하면, 사려고한 결제 상품을 결제하겠다는 요청을 가맹점으로 부터 받으면 결제를 한다.  

# 휴대폰 결제 취소

휴대폰 결제는 취소/환불로 나뉘는데, 그 이유는 결제 취소를 요청한 날짜에 있다.  
결제일로 부터 익월로 넘어갈 경우, 사용자는 결제 대금을 치룬뒤 다시 돈을 돌려받는 환불의 형태를 취해야 한다.  
하지만 당월에 결제 취소를 한 경우 아직 대금을 치루지 않은 상태임으로 사용자는 결제 요금을 지불할 필요가 없다.  

이를 위해서 DB에서 결제 데이터(Bill)을 가져와 결제 시간과 현재 날짜를 비교하여 결제/환불 비즈니스 로직을 실행하면 된다.  

# 세션 관리

TUNA가 일반적인 프레임워크인 Spirng을 사용하지 않는 이유는 각 거래의 세션관리를 커스텀마이징 하여 사용하기 위함이다.  
일반적으로 HTTP 통신은 stateless이기 때문에 이전 세션에 대한 정보를 가지고 있지 않다.  
이를 위해 하나의 통신이 종료하기 전에 정보를 Session Table에 저장해두며, 동일한 TID를 가진 요청이 들어왔을 때 Session Table에서 정보를 꺼내와 연결된 통신인 것처럼  동작한다.  

Session Table에 보관하는 주기를 조절함으로써 세션에 대한 데이터 관리와 거래 연결 주기를 조절하게 된다.  

# 비즈니스 로직
---

## 휴대폰 결제

### CP 인증 (가맹점 인증)
---

``` javascript
importScript(component/LOG.js);
importScript(component/AUTH.js);

(function() {

	// 가맹점 정보
	var cp = {
		id: reqMap.get("CP_ID"),
		name: reqMap.get("CP_NAME"),
		pwd: reqMap.get("CP_PWD")
	};
	
	// 상품 정보
	var product = {
		id: reqMap.get("P_ID"),
		name: reqMap.get("P_NAME"),
		price: reqMap.get("P_PRICE")
	};

	if(CP.isValid(cp.id, cp.pwd))
		setSuccess();
	else
		setFail();

	// 해당 프로토콜의 SASSION SAVE 가 1이므로 가맹점 인증의 결과에 상관없이 무조건 값들을 저장
	persistMap.put("CP", cp);
	persistMap.put("PRODUCT", product);

	log.info("TID => " + tid);
	log.info("CP => " + cp);
	log.info("PRODUCT => " + product);

})();
```

### 사용자 인증 & OTP 전송
---

``` javascript
importClass(packages.kr.co.danal.rnd.tuna.db.directory.GlobalDirectory);
importScript(component / LOG.js);

// 이통사에게 사용자 인증 요청
function authUser(user){
    //Dummy
    var sendUserInfo = function(user){
        return true;
    };
    
    // 이통사에게 사용자 정보 전송 후 인증 결과
    if(sendUserInfo(user)){
        log.info("user's infomation is identified.");
        return true;
    }else{
        log.info("user's infomation is wrong.");
        return false;
    }
}

// 이통사에게 문자 인증 요청
function requestSMS(otp){
    return true;
}

function createOTP(digit){
    var otp = "";
    for(int i = 0; i < digit; i++)
        otp += String( Math.floor(Math.random() * 10) );
    log.info("opt(" + otp + ") is created.");
    return otp;
}

(function (){
    var user = {
        name: reqMap.get("name"),
        phone_number: reqMap.get("phone_number"),
        carrier: reqMap.get("carrier"),
        birth: reqMap.get("birth"),
        gender: reqMap.get("gender")
    }
    
    // 난수 생성
    var otp = createOTP(6);
    
    // OTP -> Session SAVE
    persistMap.put("otp", otp);
    persistMap.put("user_name", user.name);
    persistMap.put("user_phone_number", user.phone_number);
    persistMap.put("user_carrier", user.carrier);
    persistMap.put("user_birth", user.birth);
    persistMap.put("user_gender", user.gender);
    
    if (authUser(user) && requestSMS(otp))
        setSuccess();
    else
        setFail();
    
}) ();
```

### OTP 인증

### 결제

## 휴대폰 결제 취소

### 결제 취소
---

### 결제 환불
---
