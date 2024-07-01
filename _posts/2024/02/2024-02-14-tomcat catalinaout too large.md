---
layout: single
title: Tomcat Catalina.out 파일 용량 증가 문제 해결
categories: TroubleShooting
tags: [Linux, Tomcat, Catalina.out, Middle-ware]
toc: true
---

## 실행 명령
1. 로그 생성 위치 확인(catalina.out 있는 곳)

2. logrotate 폴더에 tomcat 파일 생성
```bash
# sudo vi /etc/logratate.d/tomcat
$TOMCAT_HOME/logs/catalina.out {
 copytruncate
 daily
 size 10M
 rotate 30
 compress
 missingok
 notifempty
 dateext
}
```
3. logrotate에서 tomcat 파일 생성 후 logrotate 데몬 실행
```bash
logrotate -f /etc/logrotate.d/tomcat
```
logrotate 실행 시 옵션<br/>
-d : debug<br/>
-v : verbose, 실행 과정 확인<br/>

### 설정 시 옵션
copytruncate -> logrotate의 디폴트값은 rename이다.<br/> 이에 따라 기존 파일의 이름만 바꾸게 되어 내용이 그대로라고 한다.

로테이트 후 이름만 바뀌어 로그 파일이 계속 쌓이게 됨<br/> => copytruncate를 사용하면 임시 파일 생성 후 룰에 따라 이름 변경, 기존 파일 내용 복사 후 비워줌

* 간단하면서 편리한 기능이지만 크기가 GB 단위처럼 클 경우 시스템 I/O 로드에 영향을 끼칠 수 있으니 주의
* 가장 이상적인 해결 방법인 signal을 사용하는게 좋다고 한다 [(참고 블로그)](https://brunch.co.kr/@alden/27)

 
로테이트 실행 주기 : yearly, monthly, weekly, daily

rotate [number] : 로그파일 개수 초과 시 가장 오래된 파일 삭제

create [권한] [유저] [그룹] : 로테이트 시 생성되는 로그파일 권한 및 소유자 지정

notifempty/ifempty : 로그 내용이 없으면 로테이트 실행 X/로그 내용이 없어도 로테이트 실행 O

compress/nocompress : 로테이트로 생성되는 로그파일 gzip으로 압축하여 생성/ 생성되는 로그파일 압축 X

missingok : 로그파일 발견하지 못해도 에러처리 X

dateext : 로테이트 파일 이름에 날짜가 들어가도록 생성

size [number K,M,G] : 로그 파일 크기가 설정보다 커지면 로테이트 실행

maxage [number] : 파일이 지정된 숫자(일) 지나면 삭제

postrotate/endscript : 실행 후 스크립트 파일 실행/postrotate(스크립트 실행 옵션) 이후 들어가는 옵션
