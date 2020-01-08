---
permalink: /release/
title: "ToSee 릴리즈 정보"
author_profile: true
layout: single
share: true
related: true
type: posts
logo                     : "/img/Logo_002.png"
---
![ToSee Logo](/img/LogoBar_Enterprise.png)

# ToSee Personal Version

-----

## 2.1.~

<pre>
2020.01.08

0. ToSee Agent
    - 파일트랩의 ON/OFF 상태를 재부팅 후에도 유지할 수 있게 수정

1. 파일트랩
    - 일부 NAS 사용시 발생되는 권한문제를 수정
</pre>

#### 2.0.~
<pre>
2019.12.30

1. ToSee
   - 날짜 LOCK 해제.(기존 12월 31일까지로 되어 있던 날짜 Lock을 해제하였습니다.)
     사용기간이 지난경우에도 업데이트 및 매니저를 제외한 기능을 모두 이용할 수 있습니다.
   
2. FileTrap 기능 보완 및 추가
   - 보호폴더 삭제 방지기능 안정화
     : 보호폴더와 보호폴더를 포함하는 상위폴더에 대해서는 임의 삭제를 차단.
   - MS워드, 파워포인트, 엑셀, 아래한글, PDF, AI, PSD 파일에 대해서 삭제시 해당 드라이브의 ISecure 폴더에 자동백업
   - 관련파일의 삭제를 위해서는 백업된 ISecure 폴더에서 Shift + Del 키를 이용한 완전삭제시에만 해당파일의 백업을 하지 않고 삭제됨.
   - 파일트랩의 기능 On/OFF 추가
   - 파일트랩의 기능을  Off 시 자동백업 및 폴더보호 정지.  단, 랜섬웨어 차단기능은 유지됨.

3. Analyzer 수정
   - 공유폴더 관련 진단사항에 공유폴더명을 추가
   - Analyzer UI 수정
   - Analyzer 내부 오류 수정

4. Agent 관련
   - Agent 프로세스 종료 방지
   - UI 수정(파일트랩의 기능 On/OFF 추가)
   - 메모리 누수관련 수정

5. 업데이트 수정
    - 업데이트 UI 수정
</pre>