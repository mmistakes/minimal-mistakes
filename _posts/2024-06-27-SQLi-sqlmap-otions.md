---
layout: single
title:  "SQLi-sqlma 옵션 리스트 01"
categories: SQLi
tag: [SQLi, sqlmap, 기초, 옵션]
toc: true
author_profile: false

---

**[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)
{: .notice--danger}

### 기본 옵션

1. **-h, --help**:
   
   **설명**: 기본 도움말 메시지를 보여주고 프로그램을 종료합니다.
   {: .notice--danger}
   **사용법**: SQLmap에서 사용 가능한 가장 일반적인 명령어와 옵션 요약을 보고 싶을 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -h`
   {: .notice--danger}

2. **-hh**:
   
   **설명**: 고급 도움말 메시지를 보여주고 프로그램을 종료합니다.
   {: .notice--danger}
   **사용법**: SQLmap의 모든 사용 가능한 옵션에 대한 자세한 정보를 보고 싶을 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -hh`
   {: .notice--danger}

3. **--version**:
   
   **설명**: 현재 사용 중인 SQLmap의 버전을 표시하고 프로그램을 종료합니다.
   {: .notice--danger}
   **사용법**: 시스템에 설치된 SQLmap의 버전을 확인하고 싶을 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py --version`
   {: .notice--danger}

4. **-v VERBOSE**:
   
   **설명**: 출력 메시지의 자세한 정도(Verbosity Level)를 설정합니다. 자세한 정도는 0에서 6까지이며, 기본값은 1입니다.
   {: .notice--danger}
   
   - **0**: 오류만 표시
   - **1**: 기본 정보 표시 (기본값)
   - **2**: 더 많은 상세 정보 표시
   - **3**: 디버그 정보 표시
   - **4**: 전송된 페이로드 표시
   - **5**: HTTP 요청 표시
   - **6**: HTTP 응답 표시
   
   **사용법**: 출력에서 볼 수 있는 정보의 양을 조절할 때 사용합니다. 높은 자세한 정도는 디버깅이나 SQLmap이 수행하는 단계를 이해하는 데 유용합니다.   
   {: .notice--danger}
   
   **예제**: `python sqlmap.py -v 3` (이렇게 하면 실행 중 디버그 정보가 제공됩니다)
   {: .notice--danger}

### 타겟 옵션

타겟(Target) 옵션에 대한 설명입니다. 이 옵션들 중 적어도 하나는 제공되어야 타겟을 정의할 수 있습니다.

1. **-u URL, --url=URL**:
   
   **설명**: 타겟 URL을 지정합니다 (예: "http://www.site.com/vuln.php?id=1").
   {: .notice--danger}
   **사용법**: 특정 URL을 스캔할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com/vuln.php?id=1"`
   {: .notice--danger}

2. **-d DIRECT**:
   
   **설명**: 데이터베이스에 직접 연결하기 위한 연결 문자열을 지정합니다.
   {: .notice--danger}
   **사용법**: 웹 애플리케이션이 아닌 데이터베이스에 직접 연결하여 테스트할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -d "mysql://user:password@localhost/dbname"`
   {: .notice--danger}

3. **-l LOGFILE**:
   
   **설명**: Burp 또는 WebScarab 프록시 로그 파일에서 타겟을 파싱합니다.
   {: .notice--danger}
   **사용법**: 프록시 도구를 사용하여 캡처한 요청을 분석할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -l "burp_logfile.log"`
   {: .notice--danger}

4. **-m BULKFILE**:
   
   **설명**: 텍스트 파일에 지정된 여러 타겟을 스캔합니다.
   {: .notice--danger}
   **사용법**: 여러 타겟을 한 번에 스캔할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -m "targets.txt"`
   {: .notice--danger}

5. **-r REQUESTFILE**:
   
   **설명**: 파일에서 HTTP 요청을 로드합니다.
   {: .notice--danger}
   **사용법**: 미리 저장된 HTTP 요청 파일을 사용하여 스캔할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -r "request.txt"`
   {: .notice--danger}

6. **-g GOOGLEDORK**:
   
   **설명**: 구글 도크 결과를 타겟 URL로 처리합니다.
   {: .notice--danger}
   **사용법**: 구글 검색을 통해 발견된 취약점을 테스트할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -g "inurl:index.php?id="`
   {: .notice--danger}

7. **-c CONFIGFILE**:
   
   **설명**: 설정 INI 파일에서 옵션을 로드합니다.
   {: .notice--danger}
   **사용법**: 미리 정의된 설정 파일을 사용하여 여러 옵션을 한번에 설정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -c "config.ini"`
   {: .notice--danger}

### Request 옵션

1. **-A AGENT, --user-agent=AGENT**:
   
   **설명**: HTTP User-Agent 헤더 값을 설정합니다.
   {: .notice--danger}
   **사용법**: 특정 브라우저나 장치로부터 요청을 보낸 것처럼 위장할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -A "Mozilla/5.0"`
   {: .notice--danger}

2. **-H HEADER, --header=HEADER**:
   
   **설명**: 추가 HTTP 헤더를 설정합니다 (예: "X-Forwarded-For: 127.0.0.1").
   {: .notice--danger}
   **사용법**: 특정 헤더를 추가하여 요청을 커스터마이징할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -H "X-Forwarded-For: 127.0.0.1"`
   {: .notice--danger}

3. **--method=METHOD**:
   
   **설명**: 주어진 HTTP 메서드를 강제로 사용합니다 (예: PUT).
   {: .notice--danger}
   **사용법**: 기본 GET 또는 POST 메서드 대신 다른 HTTP 메서드를 사용하여 요청할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --method=PUT`
   {: .notice--danger}

4. **--data=DATA**:
   
   **설명**: POST 데이터를 문자열 형태로 전송합니다 (예: "id=1").
   {: .notice--danger}
   **사용법**: POST 요청을 통해 데이터를 전송할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --data="id=1"`
   {: .notice--danger}

5. **--param-del=PARAMDEL**:
   
   **설명**: 파라미터 값을 분할하는 데 사용되는 문자를 지정합니다 (예: &).
   {: .notice--danger}
   **사용법**: 특정 분할 문자를 사용하여 파라미터를 구분할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --param-del="&"`
   {: .notice--danger}

6. **--cookie=COOKIE**:
   
   **설명**: HTTP Cookie 헤더 값을 설정합니다 (예: "PHPSESSID=a8d127e...").
   {: .notice--danger}
   **사용법**: 특정 쿠키 값을 설정하여 요청할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --cookie="PHPSESSID=a8d127e..."`
   {: .notice--danger}

7. **--cookie-del=COOKIEDEL**:
   
   **설명**: 쿠키 값을 분할하는 데 사용되는 문자를 지정합니다 (예: ;).
   {: .notice--danger}
   **사용법**: 특정 분할 문자를 사용하여 쿠키 값을 구분할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --cookie-del=";"`
   {: .notice--danger}

8. **--live-cookies=LIVECOOKIES**:
   
   **설명**: 최신 값을 로드하기 위해 라이브 쿠키 파일을 사용합니다.
   {: .notice--danger}
   **사용법**: 계속 업데이트되는 쿠키 파일을 사용하여 요청할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --live-cookies="live_cookies.txt"`
   {: .notice--danger}

9. **--load-cookies=LOADCOOKIES**:
   
   **설명**: Netscape/wget 형식의 파일에서 쿠키를 로드합니다.
   {: .notice--danger}
   **사용법**: 특정 형식의 쿠키 파일을 사용하여 요청할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --load-cookies="cookies.txt"`
   {: .notice--danger}

10. **--drop-set-cookie**:
    
    **설명**: 응답에서 Set-Cookie 헤더를 무시합니다.
    {: .notice--danger}
    **사용법**: 응답에서 쿠키 설정을 무시하고 싶을 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --drop-set-cookie`
    {: .notice--danger}

11. **--mobile**:
    
    **설명**: HTTP User-Agent 헤더를 통해 스마트폰을 모방합니다.
    {: .notice--danger}
    **사용법**: 요청이 모바일 장치에서 온 것처럼 위장할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --mobile`
    {: .notice--danger}

12. **--random-agent**:
    
    **설명**: 랜덤으로 선택된 HTTP User-Agent 헤더 값을 사용합니다.
    {: .notice--danger}
    **사용법**: 요청마다 다른 User-Agent 값을 사용하여 위장할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --random-agent`
    {: .notice--danger}

13. **--host=HOST**:
    
    **설명**: HTTP Host 헤더 값을 설정합니다.
    {: .notice--danger}
    **사용법**: 특정 호스트 헤더 값을 설정하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --host="www.example.com"`
    {: .notice--danger}

14. **--referer=REFERER**:
    
    **설명**: HTTP Referer 헤더 값을 설정합니다.
    {: .notice--danger}
    **사용법**: 참조 페이지를 설정하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --referer="http://www.referrer.com"`
    {: .notice--danger}

15. **--headers=HEADERS**:
    
    **설명**: 추가 HTTP 헤더들을 설정합니다 (예: "Accept-Language: fr\nETag: 123").
    {: .notice--danger}
    **사용법**: 여러 개의 추가 헤더를 설정하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --headers="Accept-Language: fr\nETag: 123"`
    {: .notice--danger}

16. **--auth-type=AUTHTYPE**:
    
    **설명**: HTTP 인증 타입을 설정합니다 (Basic, Digest, NTLM 또는 PKI).
    {: .notice--danger}
    **사용법**: 특정 인증 방식을 사용하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --auth-type="Basic"`
    {: .notice--danger}

17. **--auth-cred=AUTHCRED**:
    
    **설명**: HTTP 인증 자격 증명을 설정합니다 (name).
    {: .notice--danger}
    **사용법**: 인증이 필요한 경우 자격 증명을 설정하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --auth-cred="username:password"`
    {: .notice--danger}

18. **--auth-file=AUTHFILE**:
    
    **설명**: HTTP 인증 PEM 인증서/개인 키 파일을 설정합니다.
    {: .notice--danger}
    **사용법**: 인증서 기반 인증을 사용하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --auth-file="auth.pem"`
    {: .notice--danger}

19. **--ignore-code=IGNORECODE**:
    
    **설명**: 무시할 (문제 발생) HTTP 오류 코드를 지정합니다 (예: 401).
    {: .notice--danger}
    **사용법**: 특정 HTTP 오류 코드를 무시하고 계속 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --ignore-code="401"`
    {: .notice--danger}

20. **--ignore-proxy**:
    
    **설명**: 시스템 기본 프록시 설정을 무시합니다.
    {: .notice--danger}
    **사용법**: 기본 프록시 설정을 무시하고 직접 연결할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --ignore-proxy`
    {: .notice--danger}

21. **--ignore-redirects**:
    
    **설명**: 리다이렉션 시도를 무시합니다.
    {: .notice--danger}
    **사용법**: 리다이렉션을 무시하고 원래 URL로만 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --ignore-redirects`
    {: .notice--danger}

22. **--ignore-timeouts**:
    
    **설명**: 연결 타임아웃을 무시합니다.
    {: .notice--danger}
    **사용법**: 타임아웃을 무시하고 계속 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --ignore-timeouts`
    {: .notice--danger}

23. **--proxy=PROXY**:
    
    **설명**: 타겟 URL에 연결하기 위해 프록시를 사용합니다.
    {: .notice--danger}
    **사용법**: 프록시 서버를 통해 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --proxy="http://127.0.0.1:8080"`
    {: .notice--danger}

24. **--proxy-cred=PROXYCRED**:
    
    **설명**: 프록시 인증 자격 증명을 설정합니다 (name).
    {: .notice--danger}
    **사용법**: 프록시 인증이 필요한 경우 자격 증명을 설정하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --proxy-cred="username:password"`
    {: .notice--danger}

25. **--proxy-file=PROXYFILE**:
    
    **설명**: 파일에서 프록시 목록을 로드합니다.
    {: .notice--danger}
    **사용법**: 여러 프록시를 사용하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --proxy-file="proxies.txt"`
    {: .notice--danger}

26. **--proxy-freq=PROXYFREQ**:
    
    **설명**: 주어진 목록에서 프록시를 변경하는 요청 간격을 설정합니다.
    {: .notice--danger}
    **사용법**: 일정 간격으로 프록시를 변경하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --proxy-freq=10`
    {: .notice--danger}

27. **--tor**:
    
    **설명**: Tor 익명 네트워크를 사용합니다.
    {: .notice--danger}
    **사용법**: Tor 네트워크를 통해 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --tor`
    {: .notice--danger}

28. **--tor-port=TORPORT**:
    
    **설명**: 기본값(9050) 외의 Tor 프록시 포트를 설정합니다.
    {: .notice--danger}
    **사용법**: Tor 프록시가 기본 포트가 아닌 다른 포트를 사용할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --tor-port=9150`
    {: .notice--danger}

29. **--tor-type=TORTYPE**:
    
    **설명**: Tor 프록시 유형을 설정합니다 (HTTP, SOCKS4 또는 SOCKS5(기본값)).
    {: .notice--danger}
    **사용법**: 사용할 Tor 프록시의 유형을 지정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --tor-type=SOCKS5`
    {: .notice--danger}

30. **--check-tor**:
    
    **설명**: Tor가 올바르게 사용되고 있는지 확인합니다.
    {: .notice--danger}
    **사용법**: Tor 설정이 제대로 되어 있는지 확인할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --check-tor`
    {: .notice--danger}

31. **--delay=DELAY**:
    
    **설명**: 각 HTTP 요청 사이의 지연 시간을 설정합니다 (초 단위).
    {: .notice--danger}
    **사용법**: 요청 간의 지연 시간을 추가하여 서버에 부담을 줄일 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --delay=2`
    {: .notice--danger}

32. **--timeout=TIMEOUT**:
    
    **설명**: 연결 타임아웃 시간을 설정합니다 (초 단위, 기본값 30).
    {: .notice--danger}
    **사용법**: 연결 타임아웃 시간을 조정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --timeout=60`
    {: .notice--danger}

33. **--retries=RETRIES**:
    
    **설명**: 연결 타임아웃 시 재시도 횟수를 설정합니다 (기본값 3).
    {: .notice--danger}
    **사용법**: 연결 실패 시 재시도 횟수를 조정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --retries=5`
    {: .notice--danger}

34. **--randomize=RPARAM**:
    
    **설명**: 주어진 파라미터 값에 대해 값을 무작위로 변경합니다.
    {: .notice--danger}
    **사용법**: 특정 파라미터의 값을 무작위로 변경하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --randomize="id"`
    {: .notice--danger}

35. **--safe-url=SAFEURL**:
    
    **설명**: 테스트 중 자주 방문할 안전한 URL 주소를 설정합니다.
    {: .notice--danger}
    **사용법**: 안전한 URL을 주기적으로 방문하여 세션을 유지하거나 다른 안전 조치를 취할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --safe-url="http://www.safe.com"`
    {: .notice--danger}

36. **--safe-post=SAFEPOST**:
    
    **설명**: 안전한 URL에 전송할 POST 데이터를 설정합니다.
    {: .notice--danger}
    **사용법**: 안전한 URL에 POST 데이터를 주기적으로 전송할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --safe-post="token=abc123"`
    {: .notice--danger}

37. **--safe-req=SAFEREQ**:
    
    **설명**: 파일에서 안전한 HTTP 요청을 로드합니다.
    {: .notice--danger}
    **사용법**: 파일에 저장된 안전한 HTTP 요청을 주기적으로 전송할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --safe-req="safe_request.txt"`
    {: .notice--danger}

38. **--safe-freq=SAFEFREQ**:
    
    **설명**: 안전한 URL을 방문할 정기적인 요청 간격을 설정합니다.
    {: .notice--danger}
    **사용법**: 일정 간격으로 안전한 URL을 방문하여 세션을 유지할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --safe-freq=10`
    {: .notice--danger}

39. **--skip-urlencode**:
    
    **설명**: 페이로드 데이터의 URL 인코딩을 건너뜁니다.
    {: .notice--danger}
    **사용법**: 페이로드 데이터를 인코딩하지 않고 전송할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --skip-urlencode`
    {: .notice--danger}

40. **--csrf-token=CSRFTOKEN**:
    
    **설명**: CSRF 토큰을 보유하는 파라미터를 지정합니다.
    {: .notice--danger}
    **사용법**: CSRF 토큰을 포함한 요청을 전송할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --csrf-token="csrf_token"`
    {: .notice--danger}

41. **--csrf-url=CSRFURL**:
    
    **설명**: CSRF 토큰을 추출하기 위해 방문할 URL 주소를 설정합니다.
    {: .notice--danger}
    **사용법**: CSRF 토큰을 얻기 위해 특정 URL을 방문할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --csrf-url="http://www.csrf.com"`
    {: .notice--danger}

42. **--csrf-method=CSRFMETHOD**:
    
    **설명**: CSRF 토큰 페이지 방문 시 사용할 HTTP 메서드를 설정합니다.
    {: .notice--danger}
    **사용법**: CSRF 토큰을 얻기 위해 특정 HTTP 메서드를 사용할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --csrf-method=POST`
    {: .notice--danger}

43. **--csrf-retries=CSRFRETRIES**:
    
    **설명**: CSRF 토큰을 얻기 위한 재시도 횟수를 설정합니다 (기본값 0).
    {: .notice--danger}
    **사용법**: CSRF 토큰을 얻기 위해 재시도 횟수를 조정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --csrf-retries=3`
    {: .notice--danger}

44. **--force-ssl**:
    
    **설명**: SSL/HTTPS 사용을 강제합니다.
    {: .notice--danger}
    **사용법**: SSL/HTTPS를 사용하여 요청을 전송할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --force-ssl`
    {: .notice--danger}

45. **--chunked**:
    
    **설명**: HTTP 청크 전송 인코딩을 사용합니다 (POST 요청).
    {: .notice--danger}
    **사용법**: 청크 전송 인코딩을 사용하여 데이터를 전송할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --chunked`
    {: .notice--danger}

46. **--hpp**:
    
    **설명**: HTTP 파라미터 오염(HPP) 방법을 사용합니다.
    {: .notice--danger}
    **사용법**: HTTP 파라미터 오염 기법을 사용하여 요청할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --hpp`
    {: .notice--danger}

47. **--eval=EVALCODE**:
    
    **설명**: 요청 전에 제공된 Python 코드를 평가합니다 (예: "import hashlib;id2=hashlib.md5(id).hexdigest()").
    {: .notice--danger}
    **사용법**: 요청 전에 특정 Python 코드를 실행하여 값을 조작할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --eval="import hashlib;id2=hashlib.md5(id).hexdigest()"`
    {: .notice--danger}

### Optimization 옵션

 sqlmap의 성능을 최적화하는 데 사용될 수 있습니다.

1. **-o**:
   
   **설명**: 모든 최적화 스위치를 켭니다.
   {: .notice--danger}
   **사용법**: 모든 최적화 기능을 활성화하여 스캔 성능을 최적화할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -o`
   {: .notice--danger}

2. **--predict-output**:
   
   **설명**: 일반적인 쿼리 결과를 예측합니다.
   {: .notice--danger}
   **사용법**: 일반적인 쿼리 결과를 예측하여 스캔을 최적화할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --predict-output`
   {: .notice--danger}

3. **--keep-alive**:
   
   **설명**: 지속적인 HTTP(s) 연결을 사용합니다.
   {: .notice--danger}
   **사용법**: 지속적인 연결을 유지하여 스캔 속도를 높이고 서버 부하를 줄일 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --keep-alive`
   {: .notice--danger}

4. **--null-connection**:
   
   **설명**: 실제 HTTP 응답 본문 없이 페이지 길이를 가져옵니다.
   {: .notice--danger}
   **사용법**: HTTP 응답을 받지 않고도 페이지 길이를 확인할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --null-connection`
   {: .notice--danger}

5. **--threads=THREADS**:
   
   **설명**: 최대 동시 HTTP(s) 요청 수를 설정합니다 (기본값 1).
   {: .notice--danger}
   **사용법**: 동시에 처리할 요청 수를 늘려 스캔 속도를 높일 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --threads=10`
   {: .notice--danger}

### Injection 옵션

어떤 파라미터를 테스트할지를 지정하고, 커스텀 인젝션 페이로드를 제공하며, 선택적으로 변조 스크립트를 제공하는 데 사용됩니다.

1. **-p TESTPARAMETER**:
   
   **설명**: 테스트할 파라미터(들)을 지정합니다.
   {: .notice--danger}
   **사용법**: SQL 인젝션을 테스트할 대상 파라미터를 명시적으로 지정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -p "id"`
   {: .notice--danger}

2. **--skip=SKIP**:
   
   **설명**: 지정된 파라미터(들)에 대한 테스트를 건너뜁니다.
   {: .notice--danger}
   **사용법**: 특정 파라미터에 대한 인젝션 테스트를 수행하지 않고 건너뛸 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --skip="id"`
   {: .notice--danger}

3. **--skip-static**:
   
   **설명**: 정적으로 보이는 파라미터의 테스트를 건너뜁니다.
   {: .notice--danger}
   **사용법**: 동적이지 않은 파라미터에 대한 인젝션 테스트를 건너뛸 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --skip-static`
   {: .notice--danger}

4. **--param-exclude=REGEXP**:
   
   **설명**: 정규 표현식을 사용하여 테스트에서 제외할 파라미터를 지정합니다.
   {: .notice--danger}
   **사용법**: 특정 정규 표현식과 일치하는 파라미터를 테스트에서 제외할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --param-exclude="ses"`
   {: .notice--danger}

5. **--param-filter=PLACE**:
   
   **설명**: 테스트할 파라미터를 위치(POST, GET 등)로 필터링합니다.
   {: .notice--danger}
   **사용법**: 특정 위치에서만 테스트할 파라미터를 지정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --param-filter="POST"`
   {: .notice--danger}

6. **--dbms=DBMS**:
   
   **설명**: 백엔드 DBMS를 지정된 값으로 강제 설정합니다.
   {: .notice--danger}
   **사용법**: 특정 DBMS를 강제로 지정하여 인젝션 테스트를 수행할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --dbms="MySQL"`
   {: .notice--danger}

7. **--dbms-cred=DBMSCRED**:
   
   **설명**: DBMS 인증 자격 증명을 설정합니다 (user).
   {: .notice--danger}
   **사용법**: DBMS 인증이 필요한 경우 사용자 이름과 비밀번호를 설정하여 인젝션 테스트를 수행할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --dbms-cred="username:password"`
   {: .notice--danger}

8. **--os=OS**:
   
   **설명**: 백엔드 DBMS 운영 체제를 지정된 값으로 강제 설정합니다.
   {: .notice--danger}
   **사용법**: 특정 운영 체제를 강제로 지정하여 인젝션 테스트를 수행할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --os="Windows"`
   {: .notice--danger}

9. **--invalid-bignum**, **--invalid-logical**, **--invalid-string**:
   
   **설명**: 값 무효화를 위해 큰 숫자, 논리 연산, 랜덤 문자열을 사용합니다.
   {: .notice--danger}
   **사용법**: 인젝션 페이로드의 유효성 검사를 위해 다양한 방법을 사용할 때 선택적으로 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --invalid-bignum`
   {: .notice--danger}

10. **--no-cast**:
    
    **설명**: 페이로드 캐스팅 메커니즘을 끕니다.
    {: .notice--danger}
    **사용법**: 페이로드에 대한 자동 캐스팅을 사용하지 않고 인젝션 테스트를 수행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --no-cast`
    {: .notice--danger}

11. **--no-escape**:
    
    **설명**: 문자열 이스케이프 메커니즘을 끕니다.
    {: .notice--danger}
    **사용법**: 문자열에 대한 자동 이스케이프를 사용하지 않고 인젝션 테스트를 수행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --no-escape`
    {: .notice--danger}

12. **--prefix=PREFIX**:
    
    **설명**: 인젝션 페이로드의 접두사 문자열을 설정합니다.
    {: .notice--danger}
    **사용법**: 페이로드의 시작 부분에 추가할 접두사를 설정하여 인젝션 테스트를 수행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --prefix="')`
    {: .notice--danger}

13. **--suffix=SUFFIX**:
    
    **설명**: 인젝션 페이로드의 접미사 문자열을 설정합니다.
    {: .notice--danger}
    **사용법**: 페이로드의 끝 부분에 추가할 접미사를 설정하여 인젝션 테스트를 수행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --suffix=")--"`
    {: .notice--danger}

14. **--tamper=TAMPER**:
    
    **설명**: 인젝션 데이터를 변조하기 위해 주어진 스크립트(들)를 사용합니다.
    {: .notice--danger}
    **사용법**: 특정 데이터를 변조하여 인젝션 테스트를 수행할 때 사용하는 사용자 정의 스크립트입니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --tamper="space2comment.py"`
    {: .notice--danger}

### Detection 옵션

웹 응용 프로그램에서 SQL 인젝션 취약점을 효과적으로 탐지하고 테스트할 수 있습니다.

1. **--level=LEVEL**:
   
   **설명**: 수행할 테스트의 레벨을 설정합니다 (1-5, 기본값 1).
   {: .notice--danger}
   **사용법**: 세부 테스트 수준을 설정하여 인젝션 탐지를 조정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --level=2`
   {: .notice--danger}

2. **--risk=RISK**:
   
   **설명**: 수행할 테스트의 위험 수준을 설정합니다 (1-3, 기본값 1).
   {: .notice--danger}
   **사용법**: 세부 테스트 위험 수준을 설정하여 인젝션 탐지를 조정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --risk=2`
   {: .notice--danger}

3. **--string=STRING**:
   
   **설명**: 쿼리가 참으로 평가될 때 일치해야 하는 문자열을 설정합니다.
   {: .notice--danger}
   **사용법**: 쿼리가 참으로 평가될 때 일치해야 하는 특정 문자열을 지정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --string="Welcome"`
   {: .notice--danger}

4. **--not-string=NOTSTRING**:
   
   **설명**: 쿼리가 거짓으로 평가될 때 일치해야 하는 문자열을 설정합니다.
   {: .notice--danger}
   **사용법**: 쿼리가 거짓으로 평가될 때 일치해야 하는 특정 문자열을 지정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --not-string="Access denied"`
   {: .notice--danger}

5. **--regexp=REGEXP**:
   
   **설명**: 쿼리가 참으로 평가될 때 일치해야 하는 정규 표현식을 설정합니다.
   {: .notice--danger}
   **사용법**: 쿼리가 참으로 평가될 때 일치해야 하는 특정 정규 표현식을 지정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --regexp="Welcome.*User"`
   {: .notice--danger}

6. **--code=CODE**:
   
   **설명**: 쿼리가 참으로 평가될 때 일치해야 하는 HTTP 상태 코드를 설정합니다.
   {: .notice--danger}
   **사용법**: 특정 HTTP 상태 코드와 일치해야 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --code=200`
   {: .notice--danger}

7. **--smart**:
   
   **설명**: 양성 휴리스틱이 있는 경우에만 철저한 테스트를 수행합니다.
   {: .notice--danger}
   **사용법**: 양성 휴리스틱이 존재할 때만 상세한 테스트를 수행할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --smart`
   {: .notice--danger}

8. **--text-only**:
   
   **설명**: 페이지를 텍스트 기반 내용만을 기준으로 비교합니다.
   {: .notice--danger}
   **사용법**: 페이지의 제목 등을 포함하지 않고 텍스트 기반 내용만으로 페이지를 비교할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --text-only`
   {: .notice--danger}

9. **--titles**:
   
   **설명**: 페이지의 제목을 기준으로 페이지를 비교합니다.
   {: .notice--danger}
   **사용법**: 페이지의 제목을 기준으로 페이지를 비교하여 인젝션 탐지를 수행할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --titles`
   {: .notice--danger}

### 📖Reference
[Usage · sqlmapproject/sqlmap Wiki · GitHub](https://github.com/sqlmapproject/sqlmap/wiki/Usage)
