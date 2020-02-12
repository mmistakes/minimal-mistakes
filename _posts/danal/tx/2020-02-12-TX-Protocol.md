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


# 비즈니스 로직

## 사용자 인증 & OTP 인증 로직

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
