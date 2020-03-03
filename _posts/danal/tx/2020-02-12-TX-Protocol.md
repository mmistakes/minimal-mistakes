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
실제 서비스 되는 휴대폰 결제의 비즈니스 로직을 작성하는 과제를 수행하게 되었다. 흐름은 가맹점 인증, 고객 인증, 결제 / 취소 에 대한 로직을 작성했다.  

다날에서는 비즈니스 로직(JavaScript)만 작성하며 **세션관리, 파라미터 파싱, http 통신(stateless)이지만 흐름 제어,  데이터에 저장** 등 비즈니스 로직을 제외한 모든 부분은 다날의 자체 프레임워크 **TUNA**(JAVA로 개발)을 사용하고 있다.  

TUNA를 수정, 추가하는 일도 있지만 비즈니스 로직에 관한 개발은 Javascipt으로만 개발한다.  

# 흐름

## 휴대폰 결제
---
1. **가맹점 및 상품 인증** : 고객이 가맹점을 통해 물건을 사려고 할 때, 가맹점은 다날의 서버(TX)에게 가맹점 인증 요청을 보낸다.   

2. **사용자 인증** : 가맹점 인증이 완료 후 이용할 고객의 정보가 유효(본인확인)한지, 현재 고객이 실제로 해당 정보의 고객이 맞는지 인증 할 OTP를 생성한 뒤 통신사에게 OTP SMS 요청한다.  
	*  사용자 인증 외에 해당 사용자의 리스크를 분석하여 나중에 돈을 지불할 수 있는지 등을 판단하는 역할도 여기서 한다.  

3. **OTP 확인** : 고객의 번호로 보낸 OTP와 고객에게 받은 OTP가 동일한지 확인하여 본인확인을 한다. 

4. **결제** : 본인확인까지 성공한 뒤 가맹점으로부터 요청이 오면 통신사에게 결제 요청을 한다.  

## 휴대폰 결제 취소
---
휴대폰 결제는 **취소/환불**로 나뉘는데, 그 이유는 결제 취소를 요청한 날짜에 있다.  

1. 결제 취소 시점이 결제일의 **익월**인 경우, 사용자는 결제 대금을 치룬 뒤 다시 돈을 돌려받는 환불의 형태를 취해야 한다.  

2. 결제 취소 시점이 결제일의 **당월**인 경우, 아직 대금을 치루지 않은 상태임으로 사용자는 결제 요금을 지불할 필요가 없다.  
통신사에게 결제 취소 요청만 보내면 된다.  


# 세션 관리

TUNA가 일반적인 프레임워크인 Spirng을 사용하지 않는 이유는 각 거래의 세션관리를 커스텀마이징 하여 사용하기 위함이다.  
일반적으로 HTTP 통신은 stateless이기 때문에 이전 세션에 대한 정보를 가지고 있지 않다.  

> 물론 Spring에서 Session 관리를 해주긴 하지만 여러 대의 서버가 하나의 세션을 공유하기 위해 자체 프레임워크를 개발한 것 같다.  
> 이것도 사실 Redis 사용하면 더 효율적으로 세션 공유 할 수 있을 거 같은데 TUNA가 개발된 이후에 나와서 못 쓴건가..?  

흐름제어를 위해 하나의 통신이 종료하기 전에 요청을 Session Table에 저장해두며, 동일한 거래 ID를 가진 요청이 들어왔을 때 Session Table에서 정보를 꺼내와 연결된 통신인 것처럼  동작한다.  

Session Table에 보관하는 주기를 조절함으로써 세션에 대한 데이터 관리와 거래 연결 주기를 조절하게 된다. 또한, 여러 대의 서버가 하나의 세션을 공유하는 효과를 낸다.   

# 코드

## 휴대폰 결제

### CP 인증 (가맹점 인증)

<details>
<div markdown="1">

```  javascript
importScript(component/LOG.js);
importScript(component/AUTH.js);

(function() {

	/* 
	* reqMap : 요청으로 들어온 파라미터 정보를 담은 Map
	* sessionMap : 이전 세션의 정보를 가지고 있는 Map 
	* persistMap : 현재 요청에서 정보를 다음 요청에서 사용하기 위해
	* 저장하는 Map. 즉, persistMap에 저장하게 된 정보는 다음 로직에서 
	* sessionMap에서 사용 가능하다.  
	*/
	
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

	// 가맹점 인증 (유효 여부 체크) 
	if(CP.isValid(cp.id, cp.pwd))
		setSuccess();
	else
		setFail();

	// 해당 프로토콜의 SASSION SAVE 가 1이므로 가맹점 인증의 결과에 상관없이 무조건 값들을 session에 저장
	persistMap.put("CP", cp);
	persistMap.put("PRODUCT", product);

	log.info("TID => " + tid);
	log.info("CP => " + cp);
	log.info("PRODUCT => " + product);

})();
```

</div>
</details>


### 사용자 인증 & OTP 전송

<details>
<div markdown="1">

``` javascript
importClass(packages.kr.co.danal.rnd.tuna.consts.FlowConstants);
importScript(components/LOG.js);
importScript(components/AUTH.js);
importScript(components/REQUEST.js);

(function (){

	/* 
	* reqMap : 요청으로 들어온 파라미터 정보를 담은 Map
	* sessionMap : 이전 세션의 정보를 가지고 있는 Map 
	* persistMap : 현재 요청에서 정보를 다음 요청에서 사용하기 위해
	* 저장하는 Map. 즉, persistMap에 저장하게 된 정보는 다음 로직에서 
	* sessionMap에서 사용 가능하다.  
	*/
	
	// 사용자 정보
    var user = {
        name: reqMap.get("name"),
        phone_number: reqMap.get("phone_number"),
        carrier: reqMap.get("carrier"),
        birth: reqMap.get("birth"),
        gender: reqMap.get("gender")
    }
    
    // 난수 생성
    // OTP_DIGIT : 6 -> 생성할 OTP 자리수
    var otp = createOTP(FlowConstants.JAVASCRIPT.OTP_DIGIT);
	
	// 1. 다날 리스크 매니저를 통해 USER 인증
	// 2. 통신사를 통해 USER 인증
	// 3. 통신사에게 OTP를 USER에게 SMS 보내기을 요청
	if(USER.isValidInRM(user) && USER.isValidInCarrier(user) && CARRIER.sendSMS(user, otp))
		setSuccess();
	else
		setFail();

	log.info("USER INFO => " + user);
	log.info("AUTH_OTP => " + otp);	
    
    // 모든 정보를 다음 로직에서 사용할 수 있도록 세션에 저장
    persistMap.putAll(sessionMap);
    persistMap.put("USER", user);
    persistMap.put("AUTH_OTP", otp);
        
}) ();
```

</div>
</details>


### OTP 인증

<details>
<div markdown="1">

``` javascript
importScript(components/LOG.js);
importScript(components/AUTH.js);

(function (){

	/* 
	* reqMap : 요청으로 들어온 파라미터 정보를 담은 Map
	* sessionMap : 이전 세션의 정보를 가지고 있는 Map 
	* persistMap : 현재 요청에서 정보를 다음 요청에서 사용하기 위해
	* 저장하는 Map. 즉, persistMap에 저장하게 된 정보는 다음 로직에서 
	* sessionMap에서 사용 가능하다.  
	*/
	
	if(OTP.check())
		setSuccess();
	else
		setFail();

	log.info("AUTH OTP : " + sessionMap.get("AUTH_OTP"));
	log.info("USER OTP : " + reqMap.get("OTP"));	
    
    // 다음 세션을 위해 정보 저장
    persistMap.putAll(sessionMap);
        
}) ();
```

</div>
</details>

### 결제

<details>
<div markdown="1">

``` javascript
importScript(components/LOG.js);
importScript(components/REQUEST.js);

(function (){

	/* 
	* reqMap : 요청으로 들어온 파라미터 정보를 담은 Map
	* sessionMap : 이전 세션의 정보를 가지고 있는 Map 
	* persistMap : 현재 요청에서 정보를 다음 요청에서 사용하기 위해
	* 저장하는 Map. 즉, persistMap에 저장하게 된 정보는 다음 로직에서 
	* sessionMap에서 사용 가능하다.  
	*/
	
	// 사용자 정보
    var user = sessionMap.get("USER");
    var product = sessionMap.get("PRODUCT");
    
    // 리스크 매니저가 허용한 사용자 한도 감소
	if(RM.deductLimit(user, product)){
		// 결제
		if(CARRIER.bill(user, product)){
			// 결제 성공 시만 DB에 저장
			persistMap.putAll(sessionMap);
			setSuccess();
		}else{
			// 한도 롤백                                                                                                                 
			RM.rollbackLimit(user, product);
			setFail();
		}
	}else{
		setFail();
	}
        
}) ();
```

</div>
</details>

## 휴대폰 결제 취소

결제 취소는 환불이든, 취소든 하나의 로직으로 들어와 처리된다.  
DB 사용 등의 기능은 자바의 코드를 가져와 기능을 이용한다.  

### 취소 / 환불

<details>
<div markdown="1">

``` javascript
importScript(components/LOG.js);
importScript(components/REQUEST.js);
importScript(components/DB.js);

(function (){

	/* 
	* reqMap : 요청으로 들어온 파라미터 정보를 담은 Map
	* sessionMap : 이전 세션의 정보를 가지고 있는 Map 
	* persistMap : 현재 요청에서 정보를 다음 요청에서 사용하기 위해
	* 저장하는 Map. 즉, persistMap에 저장하게 된 정보는 다음 로직에서 
	* sessionMap에서 사용 가능하다.  
	*/
	
	// 가져올 데이터
    var params = new HashMap();
    params.put("TID", reqMap.get("O_TID"));

	var bill = BILL.get(params);

	var todayMonth = Integer.parseInt(new Date().getMonth()) + 1;
	var billMonth = Integer.parseInt(String(bill.get("INDATE")).split("-")[1]);
	
    // 취소
	if(todayMonth == billMonth){
		// 통신사에게 취소 요청, RM 한도 롤백
		if(CARRIER.cancel(bill) && RM.rollbackLimit(bill)){
			// 결제 성공 시만 DB에 저장
			persistMap.put("O_TID", reqMap.get("O_TID"));
			persistMap.put("TID", reqMap.get("TID"));
			setSuccess();
		}else{
			setFail();
		}
	}else{
		// 통신사에게 환불 요청, RM 한도 롤백
		if(CARRIER.refund(bill) && RM.rollbackLimit(bill))
			setFail();
	}
        
}) ();
```


