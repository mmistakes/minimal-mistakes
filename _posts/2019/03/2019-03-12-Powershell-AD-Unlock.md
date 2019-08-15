---
layout: post
title:  "파워쉘을 이용한 AD 계정 잠금 해제"
subtitle: "Powershell을 이용한 AD 계정 관리"
author: "코마"
date:   2019-03-12 03:00:00 +0900
categories: [ "windows", "powershell", "event", "activedirectory" ]
comments: true
excerpt_separator: <!--more-->
---

안녕하세요 코마입니다. 이번 시간에는 Powershell 을 이용한 AD 계정 잠금 해제 관리를 알아보도록 하겠습니다.

<!--more-->

# 계정 잠김 원인

AD 인증을 사용하다 보면 비밀번호 패스워드 주기를 설정하게 됩니다. (만약 설정되어 있지 않으면 보안을 위해 설정하도록 합니다.) 모든 보안 설정이 그러하듯 패스워드 만료 주기에 따른 사이드 이펙트가 존재합니다. 그 중에 하나가 계정 잠김입니다.

계정 잠김 현상을 완전히 차단할 수 없습니다. 잠겼다는 것 자체가 보안 수준을 유지하고 지키려는 행위입니다. 그렇다면 계정이 잠겼을 때 빠르게 인지하고 잠김을 풀어주는 것이 불편을 줄이는 일일 것입니다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 윈도우 원격 서버 관리 도구 (RSAT)

윈도우 서버 관리자를 위해 마이크로소프트는 RSAT 라는 패키지를 별도로 제공합니다. 사용자는 설치파일을 다운로드 하여 이를 관리 PC 에 설치합니다. 여러분들을 위해 저 코마는 설치 파일의 경로를 정리하였으므로 필요하실 떄 클릭하면됩니다.

- [윈도우 7 : 원격 서버 관리 도구 다운로드](https://www.microsoft.com/ko-kr/download/details.aspx?id=7887)
- [윈도우 10 : 원격 서버 관리 도구 다운로드](https://www.microsoft.com/ko-KR/download/details.aspx?id=45520)

## 윈도우 10 설정 (관리도구 활성화)

관리 도구를 설치하였지만 곧바로 활성화되지 않습니다. 이를 위해 윈도우 설정에서 관리 도구 활성화가 필요합니다. 윈도우 10 을 기준으로 설명드리겠습니다. 

- 윈도우 키 > 선택적 기능 관리 > 기능 추가 버튼 클릭 > RSAT 선택

## 윈도우 7 설정 (관리도구 활성화)

관리 도구를 설치하였지만 곧바로 활성화되지 않습니다. 이를 위해 윈도우 설정에서 관리 도구 활성화가 필요합니다. 윈도우 7 을 기준으로 설명드리겠습니다. 

- 제어판 > 윈도우 기능 추가/제거 > 원격 서버 관리 도구 > AD DS and AD LDS Tool 선택

# 파워쉘을 이용한 계정 잠금 해제

파워쉘을 통해서 계정 잠금을 해제하기 위해서는 `ActiveDirectory` 모듈을 파워쉘 콘솔에서 임포트(Import-Module)해주어야 합니다.

```powershell
$ Import-Module ActiveDirectory
```

ActiveDirectory 모듈을 활성화 한 뒤에 `Search-ADAccount` 와 `Unlock-ADAccount` Cmdlet 를 통해 잠긴 계정을 확인하고 잠금을 해제합니다.

```powershell
$ Search-ADAccount -LockedOut
```

`-LockedOut` 옵션은 잠긴 계정을 출력하는 옵션입니다. 이외에도 계정 상태에 따라 다양한 검색이 가능합니다. `AccountDisabled`, `AccountExpired`, `AccountInactive` 등이 주로 사용되는 옵션입니다.

그렇다면 이제 잠금을 해제하도록 하겠습니다. 잠금을 해제하기 위해서는 계정을 식별하는 식별자가 필요합니다. 여기서 사용될 수 있는 옵션은 `DistinquishedName`, `SamAccountName`, `SID` 등이 있습니다. 그러나 여기에선 우리에게 친숙한 `SamAccountName` 을 이용하도록 하겠습니다.

```powershell
$ UnLock-ADAccount -Identity "code-machina"
```

`-Identity` 옵션은 바로 `SamAccountName`을 지정할 수 있는 옵션입니다. 일반적으로 AD 환경에서 로그온 시 계정이름을 입력하는데 이것이 바로 `SamAccountName` 입니다. 따라서 매우 편리하게 입력할 수 있습니다.

# 결론

지금까지 파워쉘을 이용하기 위해 ActiveDirectory 모듈을 설치하고 임포트 한 뒤에 `Search-ADAccount` 와 `Unlock-ADAccount` 두 가지 cmdlet 을 이용하여 잠긴 계정을 찾고 이를 해제하여 보았습니다. 질문이 있으실 경우 이메일 혹은 댓글로 알려주시면 친절히 답변 드리도록 하겠습니다. 지금까지 코마의 `파워쉘을 이용한 AD 계정 잠금 해제` 였습니다. 이상입니다. 감사합니다.


