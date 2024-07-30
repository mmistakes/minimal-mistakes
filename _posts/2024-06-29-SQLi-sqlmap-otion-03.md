---
layout: single
title:  "SQLi-sqlma 옵션 리스트 03"
categories: SQLi
tag: [SQLi, sqlmap, 이론, 옵션]
toc: true
author_profile: false
---

**[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)
{: .notice--danger}

**[SQLi-sqlma 옵션 리스트 01]**[SQLi-sqlma 옵션 리스트 01로 이동 합니다.](https://weoooo.github.io/sqli/SQLi-sqlmap-otion-01/)
{: .notice--success}

## 운영 체제 접근(Operating system access)

이 옵션들은 백엔드 데이터베이스 관리 시스템의 운영 체제에 접근하는 데 사용됩니다.

1. **--os-cmd=OSCMD**:
   
   **설명**: 운영 체제 명령을 실행합니다.
   {: .notice--danger}
   **사용법**: 데이터베이스 서버에서 직접 운영 체제 명령을 실행하려고 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --os-cmd="ipconfig"`
   {: .notice--danger}

2. **--os-shell**:
   
   **설명**: 인터랙티브 운영 체제 셸을 실행합니다.
   {: .notice--danger}
   **사용법**: 데이터베이스 서버의 운영 체제 셸을 인터랙티브로 사용하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --os-shell`
   {: .notice--danger}

3. **--os-pwn**:
   
   **설명**: OOB 셸, Meterpreter 또는 VNC를 위한 프롬프트를 실행합니다.
   {: .notice--danger}
   **사용법**: 외부로부터 데이터베이스 서버의 셸을 장악하려고 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --os-pwn`
   {: .notice--danger}

4. **--os-smbrelay**:
   
   **설명**: 한 번의 클릭으로 OOB 셸, Meterpreter 또는 VNC를 위한 프롬프트를 실행합니다.
   {: .notice--danger}
   **사용법**: SMB 릴레이 공격을 통해 셸을 장악하려고 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --os-smbrelay`
   {: .notice--danger}

5. **--os-bof**:
   
   **설명**: 저장된 프로시저 버퍼 오버플로우를 악용합니다.
   {: .notice--danger}
   **사용법**: 데이터베이스 서버의 저장된 프로시저에 버퍼 오버플로우 취약점이 있을 때 이를 악용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --os-bof`
   {: .notice--danger}

6. **--priv-esc**:
   
   **설명**: 데이터베이스 프로세스 사용자 권한을 상승시킵니다.
   {: .notice--danger}
   **사용법**: 현재 사용자의 권한을 상승시키고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --priv-esc`
   {: .notice--danger}

7. **--msf-path=MSFPATH**:
   
   **설명**: Metasploit Framework가 설치된 로컬 경로를 지정합니다.
   {: .notice--danger}
   **사용법**: Metasploit을 사용한 공격을 수행하기 위해 프레임워크의 경로를 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --msf-path="/path/to/metasploit"`
   {: .notice--danger}

8. **--tmp-path=TMPPATH**:
   
   **설명**: 임시 파일 디렉터리의 원격 절대 경로를 지정합니다.
   {: .notice--danger}
   **사용법**: 임시 파일을 저장할 디렉터리를 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --tmp-path="/tmp"`
   {: .notice--danger}

## 윈도우 레지스트리 접근(Windows registry access)

이 옵션들은 백엔드 데이터베이스 관리 시스템의 윈도우 레지스트리에 접근하는 데 사용됩니다.

1. **--reg-read**:
   
   **설명**: 윈도우 레지스트리 키 값을 읽습니다.
   {: .notice--danger}
   **사용법**: 레지스트리 키 값을 읽고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-read`
   {: .notice--danger}

2. **--reg-add**:
   
   **설명**: 윈도우 레지스트리 키 값을 작성합니다.
   {: .notice--danger}
   **사용법**: 새로운 레지스트리 키 값을 추가하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-add`
   {: .notice--danger}

3. **--reg-del**:
   
   **설명**: 윈도우 레지스트리 키 값을 삭제합니다.
   {: .notice--danger}
   **사용법**: 특정 레지스트리 키 값을 삭제하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-del`
   {: .notice--danger}

4. **--reg-key=REGKEY**:
   
   **설명**: 윈도우 레지스트리 키를 지정합니다.
   {: .notice--danger}
   **사용법**: 작업할 레지스트리 키를 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-key="HKLM\Software\MyKey"`
   {: .notice--danger}

5. **--reg-value=REGVAL**:
   
   **설명**: 윈도우 레지스트리 키 값을 지정합니다.
   {: .notice--danger}
   **사용법**: 작업할 레지스트리 키 값을 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-value="MyValue"`
   {: .notice--danger}

6. **--reg-data=REGDATA**:
   
   **설명**: 윈도우 레지스트리 키 값 데이터를 지정합니다.
   {: .notice--danger}
   **사용법**: 작업할 레지스트리 키 값 데이터를 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-data="MyData"`
   {: .notice--danger}

7. **--reg-type=REGTYPE**:
   
   **설명**: 윈도우 레지스트리 키 값 유형을 지정합니다.
   {: .notice--danger}
   **사용법**: 작업할 레지스트리 키 값의 유형을 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --reg-type="REG_SZ"`
   {: .notice--danger}

## 일반 옵션 (General Options)

SQLmap을 사용하여 웹 애플리케이션 취약점을 평가하고 테스트할 때 다양한 설정과 기능을 제공합니다.

1. **-s SESSIONFILE**
   
   **설명**: 저장된 세션 파일(.sqlite)을 불러옵니다.
   {: .notice--danger}
   **사용법**: 이전에 저장된 세션 데이터를 사용하여 테스트를 재개하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -s "session.sqlite"`
   {: .notice--danger}

2. **-t TRAFFICFILE**
   
   **설명**: 모든 HTTP 트래픽을 텍스트 파일에 기록합니다.
   {: .notice--danger}
   **사용법**: HTTP 트래픽을 기록하여 나중에 분석하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -t "traffic.txt"`
   {: .notice--danger}

3. **--answers=ANSWERS**
   
   **설명**: 사전에 정의된 답변을 설정합니다. 예: "quit=N,follow=N".
   {: .notice--danger}
   **사용법**: SQL Injection 공격 시 사용자 입력을 자동으로 처리하고자 할 때 유용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --answers="quit=N,follow=N"`
   {: .notice--danger}

4. **--base64=BASE64PARAMS**
   
   **설명**: Base64로 인코딩된 데이터를 포함하는 매개변수를 지정합니다.
   {: .notice--danger}
   **사용법**: Base64로 인코딩된 데이터를 해석하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --base64="param1,param2"`
   {: .notice--danger}

5. **--base64-safe**
   
   **설명**: URL 및 파일 이름 안전한 Base64 알파벳을 사용합니다 (RFC 4648).
   {: .notice--danger}
   **사용법**: URL 및 파일 이름에 안전한 Base64 인코딩을 사용하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --base64-safe`
   {: .notice--danger}

6. **--batch**
   
   **설명**: 사용자 입력을 묻지 않고 기본 동작을 사용합니다.
   {: .notice--danger}
   **사용법**: 자동화된 스크립트 실행 등 사용자 입력 없이 작업을 수행하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --batch`
   {: .notice--danger}

7. **--binary-fields=FIELDS**
   
   **설명**: 이진 값을 갖는 결과 필드를 지정합니다 (예: "digest").
   {: .notice--danger}
   **사용법**: 이진 데이터를 포함하는 필드를 명시적으로 지정하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --binary-fields="digest"`
   {: .notice--danger}

8. **--check-internet**
   
   **설명**: 타겟 평가 전에 인터넷 연결을 확인합니다.
   {: .notice--danger}
   **사용법**: SQLmap 실행 전에 인터넷 연결 상태를 확인하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --check-internet`
   {: .notice--danger}

9. **--cleanup**
   
   **설명**: DBMS에서 SQLmap 관련 UDF와 테이블을 정리합니다.
   {: .notice--danger}
   **사용법**: SQLmap 사용 후 DBMS를 정리하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --cleanup`
   {: .notice--danger}

10. **--crawl=CRAWLDEPTH**
    
    **설명**: 타겟 URL에서 웹사이트를 크롤링합니다.
    {: .notice--danger}
    **사용법**: 지정된 깊이까지 웹사이트를 크롤링하여 취약점을 찾고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --crawl=3`
    {: .notice--danger}

11. **--crawl-exclude=REGEXP**
    
    **설명**: 크롤링할 때 제외할 페이지의 정규 표현식을 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 페이지를 크롤링에서 제외하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --crawl-exclude="logout"`
    {: .notice--danger}

12. **--csv-del=CSVDEL**
    
    **설명**: CSV 출력에 사용될 구분 문자를 지정합니다. 기본값은 쉼표(,)입니다.
    {: .notice--danger}
    **사용법**: 데이터 덤프 시 CSV 파일의 구분자를 설정하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --csv-del=";"`
    {: .notice--danger}

13. **--charset=CHARSET**
    
    **설명**: Blind SQL Injection에 사용할 문자 집합을 지정합니다. 예: "0123456789abcdef".
    {: .notice--danger}
    **사용법**: Blind SQL Injection에서 사용할 문자 집합을 사용자 정의하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --charset="0123456789abcdef"`
    {: .notice--danger}

14. **--dump-format=DUMPFORMAT**
    
    **설명**: 덤프 데이터의 형식을 지정합니다. 기본값은 CSV이며, HTML 또는 SQLITE 형식도 사용할 수 있습니다.
    {: .notice--danger}
    **사용법**: 데이터를 특정 형식으로 덤프하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --dump-format=HTML`
    {: .notice--danger}

15. **--encoding=ENCODING**
    
    **설명**: 데이터 검색에 사용할 문자 인코딩을 지정합니다. 예: GBK.
    {: .notice--danger}
    **사용법**: 데이터베이스와 통신할 때 특정 문자 인코딩을 사용하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --encoding=GBK`
    {: .notice--danger}

16. **--eta**
    
    **설명**: 각 출력별 예상 도착 시간을 표시합니다.
    {: .notice--danger}
    **사용법**: 작업의 진행 상황을 추적하고 예상 시간을 파악하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --eta`
    {: .notice--danger}

17. **--flush-session**
    
    **설명**: 현재 타겟의 세션 파일을 삭제합니다.
    {: .notice--danger}
    **사용법**: 현재 작업 중인 세션을 초기화하고 다시 시작하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --flush-session`
    {: .notice--danger}

18. **--forms**
    
    **설명**: 타겟 URL에서 폼을 파싱하고 테스트합니다.
    {: .notice--danger}
    **사용법**: 웹 양식에 대한 자동화된 테스트를 수행하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --forms`
    {: .notice--danger}

19. **--fresh-queries**
    
    **설명**: 세션 파일에 저장된 쿼리 결과를 무시합니다.
    {: .notice--danger}
    **사용법**: 이전 쿼리 결과를 무시하고 새로운 쿼리를 실행하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --fresh-queries`
    {: .notice--danger}

20. **--gpage=GOOGLEPAGE**
    
    **설명**: 지정된 페이지 번호의 구글 도크 결과를 사용합니다.
    {: .notice--danger}
    **사용법**: 구글 도크에서 특정 페이지의 결과를 활용하여 취약점을 찾고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --gpage=2`
    {: .notice--danger}

21. **--har=HARFILE**
    
    **설명**: 모든 HTTP 트래픽을 HAR 파일에 기록합니다.
    {: .notice--danger}
    **사용법**: HTTP 트래픽을 기록하여 나중에 분석하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --har="traffic.har"`
    {: .notice--danger}

22. **--hex**
    
    **설명**: 데이터 검색 시 Hex 변환을 사용합니다.
    {: .notice--danger}
    **사용법**: 데이터베이스와 통신할 때 Hex 변환을 사용하여 데이터를 전송하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --hex`
    {: .notice--danger}

23. **--output-dir=OUTDIR**
    
    **설명**: 사용자 정의 출력 디렉토리 경로를 설정합니다.
    {: .notice--danger}
    **사용법**: 결과 파일을 특정 디렉토리에 저장하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --output-dir="/path/to/output"`
    {: .notice--danger}

24. **--parse-errors**
    
    **설명**: 응답에서 DBMS 오류 메시지를 파싱하고 표시합니다.
    {: .notice--danger}
    **사용법**: 데이터베이스 오류 메시지를 자동으로 분석하여 문제를 진단하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --parse-errors`
    {: .notice--danger}

25. **--preprocess=PREPROCESS**
    
    **설명**: 요청 전처리를 위해 지정된 스크립트(들)를 사용합니다.
    {: .notice--danger}
    **사용법**: 요청 데이터를 처리하거나 수정하기 위해 사용자 지정 스크립트를 실행하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --preprocess="preprocess_script.py"`
    {: .notice--danger}

26. **--postprocess=POSTPROCESS**
    
    **설명**: 응답 후처리를 위해 지정된 스크립트(들)를 사용합니다.
    {: .notice--danger}
    **사용법**: 응답 데이터를 처리하거나 수정하기 위해 사용자 지정 스크립트를 실행하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --postprocess="postprocess_script.py"`
    {: .notice--danger}

27. **--repair**
    
    **설명**: 알 수 없는 문자 마커(?)를 가진 항목을 다시 덤프합니다.
    {: .notice--danger}
    **사용법**: 데이터 덤프 시 미확인된 문자 마커를 가진 데이터를 다시 처리하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --repair`
    {: .notice--danger}

28. **--save=SAVECONFIG**
    
    **설명**: 설정을 구성 INI 파일로 저장합니다.
    {: .notice--danger}
    **사용법**: 설정을 백업하거나 공유하기 위해 설정 파일로 저장하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --save="config.ini"`
    {: .notice--danger}

29. **--scope=SCOPE**
    
    **설명**: 대상을 필터링하기 위한 정규 표현식을 설정합니다.
    {: .notice--danger}
    **사용법**: 특정 도메인 또는 경로를 포함하거나 제외하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --scope="site.com"`
    {: .notice--danger}

30. **--skip-heuristics**
    
    **설명**: SQLi/XSS 취약점의 휴리스틱 감지를 건너뜁니다.
    {: .notice--danger}
    **사용법**: 자동 휴리스틱 분석을 건너뛰고 명시적으로 취약점을 테스트하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --skip-heuristics`
    {: .notice--danger}

31. **--skip-waf**
    
    **설명**: WAF/IPS 보호의 휴리스틱 감지를 건너뜁니다.
    {: .notice--danger}
    **사용법**: 웹 어플리케이션 방화벽 또는 침입 방지 시스템의 감지를 우회하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --skip-waf`
    {: .notice--danger}

32. **--table-prefix=PREFIX**
    
    **설명**: 임시 테이블에 사용할 접두사를 설정합니다. 기본값은 "sqlmap"입니다.
    {: .notice--danger}
    **사용법**: 테스트 중에 생성되는 임시 테이블의 접두사를 변경하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --table-prefix="prefix"`
    {: .notice--danger}

33. **--test-filter=TESTFILTER**
    
    **설명**: Payload 또는 제목을 기준으로 테스트를 선택합니다. 예: ROW.
    {: .notice--danger}
    **사용법**: 특정 페이로드나 제목을 기준으로 테스트를 선택하여 실행하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --test-filter="ROW"`
    {: .notice--danger}

34. **--test-skip=TESTSKIP**
    
    **설명**: Payload 또는 제목을 기준으로 테스트를 건너뜁니다. 예: BENCHMARK.
    {: .notice--danger}
    **사용법**: 특정 페이로드나 제목을 기준으로 테스트를 건너뛰고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --test-skip="BENCHMARK"`
    {: .notice--danger}

35. **--web-root=WEBROOT**
    
    **설명**: 웹 서버 문서 루트 디렉토리 경로를 설정합니다. 예: "/var/www".
    {: .notice--danger}
    **사용법**: 웹 서버의 루트 디렉토리를 설정하여 데이터를 참조하거나 처리할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --web-root="/var/www"`
    {: .notice--danger}

## Miscellaneous

SQLmap의 다양한 기능과 설정을 확장하여, 사용자가 필요에 따라 도구를 적절하게 활용할 수 있도록 합니다.

1. **-z MNEMONICS**
   
   **설명**: 짧은 기호를 사용하여 명령어를 정의합니다 (예: "flu,bat,ban,tec=EU").
   {: .notice--danger}
   **사용법**: 사용자 지정된 짧은 기호를 사용하여 SQLmap의 기능을 활성화하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -z "flu,bat,ban,tec=EU"`
   {: .notice--danger}

2. **--alert=ALERT**
   
   **설명**: SQL Injection 취약점을 발견했을 때 호스트 OS 명령을 실행합니다.
   {: .notice--danger}
   **사용법**: SQL Injection 취약점을 발견하면 특정 명령어를 실행하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --alert="command_to_execute"`
   {: .notice--danger}

3. **--beep**
   
   **설명**: 질문 시 또는 SQLi/XSS/FI 취약점을 발견했을 때 비프음을 울립니다.
   {: .notice--danger}
   **사용법**: 질문이나 취약점 발견 시 알림을 받고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --beep`
   {: .notice--danger}

4. **--dependencies**
   
   **설명**: 누락된 (선택적인) SQLmap 종속성을 확인합니다.
   {: .notice--danger}
   **사용법**: SQLmap 실행 전 필요한 종속성이 설치되어 있는지 확인하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py --dependencies`
   {: .notice--danger}

5. **--disable-coloring**
   
   **설명**: 콘솔 출력 색상을 비활성화합니다.
   {: .notice--danger}
   **사용법**: 터미널이 색상 출력을 지원하지 않거나, 색상 출력을 원하지 않을 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --disable-coloring`
   {: .notice--danger}

6. **--list-tampers**
   
   **설명**: 사용 가능한 탐퍼 스크립트 목록을 표시합니다.
   {: .notice--danger}
   **사용법**: 사용자가 적용할 수 있는 다양한 탐퍼 스크립트를 확인하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py --list-tampers`
   {: .notice--danger}

7. **--offline**
   
   **설명**: 오프라인 모드에서 작업합니다 (세션 데이터만 사용).
   {: .notice--danger}
   **사용법**: 인터넷에 연결되지 않은 환경에서 SQLmap을 사용하여 데이터베이스를 평가하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --offline`
   {: .notice--danger}

8. **--purge**
   
   **설명**: SQLmap 데이터 디렉토리에서 모든 내용을 안전하게 제거합니다.
   {: .notice--danger}
   **사용법**: SQLmap 데이터 디렉토리를 초기화하고 모든 데이터를 삭제하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py --purge`
   {: .notice--danger}

9. **--results-file=RESULTSFILE**
   
   **설명**: 다중 대상 모드에서 CSV 결과 파일의 위치를 지정합니다.
   {: .notice--danger}
   **사용법**: 다수의 대상을 평가하고 결과를 CSV 파일로 저장하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -m targets.txt --results-file="results.csv"`
   {: .notice--danger}

10. **--shell**
    
    **설명**: 대화형 SQLmap 셸을 시작합니다.
    {: .notice--danger}
    **사용법**: SQLmap을 사용하여 인터랙티브하게 명령을 실행하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --shell`
    {: .notice--danger}

11. **--tmp-dir=TMPDIR**
    
    **설명**: 임시 파일을 저장할 로컬 디렉토리 경로를 설정합니다.
    {: .notice--danger}
    **사용법**: SQLmap 작업 중 생성되는 임시 파일을 저장할 경로를 지정하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --tmp-dir="/path/to/tmp"`
    {: .notice--danger}

12. **--unstable**
    
    **설명**: 불안정한 연결에 맞추어 옵션을 조정합니다.
    {: .notice--danger}
    **사용법**: 네트워크 연결이 불안정할 때 SQLmap 실행을 최적화하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --unstable`
    {: .notice--danger}

13. **--update**
    
    **설명**: SQLmap을 업데이트합니다.
    {: .notice--danger}
    **사용법**: SQLmap을 최신 버전으로 업데이트하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py --update`
    {: .notice--danger}

14. **--wizard**
    
    **설명**: 초보 사용자를 위한 간단한 위자드 인터페이스를 실행합니다.
    {: .notice--danger}
    **사용법**: SQLmap의 기본 기능을 사용하여 취약점을 평가하고자 할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py --wizard`
    {: .notice--danger}


