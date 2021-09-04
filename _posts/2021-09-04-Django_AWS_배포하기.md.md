---

layout: single
title: "Django(장고)기반 애플리케이션 AWS EC2로 배포하는 방법"

---



> Django 프로젝트를 팀원과 협업하기 편하게 github에 업로드 후 AWS로 배포하는 과정을 남겨 보았습니다.
>
> 개인 공부 후 남기는 내용이므로 오류가 있으면 지적 부탁드립니다. 
>
> 현재 Django 프로젝트는 Window 운영체제에서 운영 중이며 이를 AWS EC2 서버 (Ubuntu 18.04 LTS) 로 배포중 dependency문제가 생겨 이를 어떻게 해결했는지 설명 남겼습니다. (이부분은 생각보다 문제 있던 분들이 없었던 까닭인지 googling 을 많이 해서 발견했습니다 ㅠㅠ)
>
> 대부분 Django 프로젝트를 배포하는 내용을 담은 블로그 작성자 분들은 대부분 Unix계열 기반의 운영체제에서 배포를 하셔서 Window 운영체제에서 Django 프로젝트를 시작시 배포때 생기는 문제가 없으신거 같아 글을 남겨보려 합니다!
>
> **목표**: AWS EC2 서버에 Django 프로젝트를 실행 시키기



# 배포 준비 순서

1. **배포할 Django 프로젝트 준비**
   1. 가상 환경 준비
   2. requirements.txt 만들기
2. **AWS EC2 Server **
   1. Instance 생성하기
      1. Ubuntu Server 18.04 LTS
      2. key pair (.pem)
   2. Instance 접속하기
      1. ssh를 이용한 원격 접속
   3. AWS EC2 서버 세팅
3. **Github 활용**
   1. github repository에 Django 프로젝트 업로드
   2. AWS EC2 서버에 git 연동해서 Django 프로젝트 다운
4. **uWSGI 연결 **
   1. runserver 테스트
   2. uWSGI 서버 연결
5. **nginx 연결**
   1. nginx와 uwsgi 연결

---



# 1. 배포할 Django 프로젝트 준비

## 1. 가상 환경 준비



파이썬이 기본적으로 설치 되어있어야 하며

![image-20210904200424232](C:\Users\khsoo\AppData\Roaming\Typora\typora-user-images\image-20210904200424232.png)



가상환경을 만들어주는 **virutalenv** 패키지를 설치해 주어야 합니다.

```python
pip install virtualenv
```



가상환경을 만들어 주고 싶은 경로에 아래 명령어를 입력하면 됩니다.

```python
virtualenv env
```

env는 현재 만들 가상환경의 이름을 입력하면 됩니다.

> 제 경우에는 아래처럼 Desktop경로에 env라는 가상환경을 생성 하였습니다.

![image-20210904200051988](C:\Users\khsoo\AppData\Roaming\Typora\typora-user-images\image-20210904200051988.png)



가상환경을 활성화 한 후

```python
env\Scripts\activate
```

> 가상환경이 활성화 되면 (env) [현재 경로]$ 로서 나타나게 됩니다

![image-20210904200639960](C:\Users\khsoo\AppData\Roaming\Typora\typora-user-images\image-20210904200639960.png)



Django를 설치해 줍니다.

> 저의 경우 pip를 입력하면 python3.x 버전과 연결되어 있어서 python2.x버전을 사용하시는 분들이라면 pip3를 이용해 주세요!

```python
pip install django
```



Django 프로젝트를 만들어 줍니다.

```python
django-admin startproject testSite
```

![image-20210904201145422](C:\Users\khsoo\AppData\Roaming\Typora\typora-user-images\image-20210904201145422.png)

> 가상환경과 Django 프로젝트는 같은 Desktop경로에 저장되어 있는걸 확인 할 수 있습니다.

![스크린샷(4)_LI](C:\Users\khsoo\OneDrive\사진\Screenshots\스크린샷(4)_LI.jpg)



**testSite** 프로젝트에 testApp이라는 앱을 만들어 줍니다.

```python
cd testSite
python manage.py startapp testApp
```

