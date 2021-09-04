---

layout: single
title: "Django(장고)기반 애플리케이션 AWS EC2로 배포하는 방법"

---



현재 회사에서 혼자 local로 작업하던 Django기반 서비스를 팀원과 같이 작업할 상황이 생겼다.

함께 업무를 진행하기 위해 협업을 위한 세팅을 하는 과정을 기록해 본다.

세팅 순서

1. 배포할 Django 프로젝트 준비
   1. 가상 환경 준비
   2. requirements.txt 만들기
2. AWS EC2 Server 
   1. Instance 생성하기
      1. Ubuntu Server 18.04 LTS
      2. key pair (.pem)
   2. Instance 접속하기
      1. ssh를 이용한 원격 접속
   3. AWS EC2 서버 세팅
3. Github 활용
   1. github repository에 Django 프로젝트 업로드
   2. AWS EC2 서버에 git 연동해서 Django 프로젝트 다운
4. uWSGI 연결 
   1. runserver 테스트
   2. uWSGI 서버 연결
5. nginx 연결
   1. nginx와 uwsgi 연결

