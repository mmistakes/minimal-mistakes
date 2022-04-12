---
title:  "내 로컬에서 Django 환경세팅"
excerpt: "pipenv로 독립된 개발환경 만들기 "
categories:
- [Django]
tags:
- [django]
last_modified_at: 2022-04-12
---

<br>

## pipenv 설치

`pip`는 모든 걸 전역으로 설치하기 때문에 `pip install Django` 커맨드로 장고를 설치하는 걸 권장하지 않는다. 그래서 `pipenv`를 설치해서 django를 해당 프로젝트 환경에만 설치해보려고 한다. `pipenv`는 버블을 생성하는 것과 같고, 버블 안에 여러 패키지를 설치한다고 이해하면 될 것 같다. 

<br>

커맨드 창에서 `pip install --user pipenv` 를 입력한다.

콘솔에서 `pipenv` 입력 시 가이드라인이 나온다면 성공인데, 만약 나오지 않는다면 `pip list` 에서 `virtualenv` 이 설치되어있는지 확인하고 아래를 따라하자. 

`pip uninstall virtualenv`

`pip uninstall pipenv`

`pip install pipenv`

<br>

## 독립된 개발 환경 만들기
- 장고 버전 : `2.2.5`
- 파이썬 버전 (참고) : `3.9.10`
  
<br>

원하는 곳에 폴더를 생성하고, **그 폴더 안에서** `pipenv`를 써서 독립된 개발 환경(버블)을 만들 예정이다. 파이썬을 설치하기 위해 `pipenv`에게 3.9 버전을 기반으로 하는 환경을 만들어달라고 알려야 한다.

[pipenv 공식 페이지](https://pipenv.pypa.io/en/latest/)에서 지원하는 파이썬 버전을 확인하고, 장고는 `Python3` 에서 잘 동작하기 때문에 Python3을 기반으로 하는 환경을 만들어 달라고 요청한다. 

`pipenv --three`

폴더를 vscode에서 확인하기 위해 `code .`  

<br>

참고로 Pipfile은 package.json과 비슷한 것이다. 이제 터미널에서 생성한 가상환경의 내부로 들어가기 위해 **vscode 내 터미널에서** `pipenv shell` 을 입력한다. 이 커맨드로 버블 안에 들어왔고, 여기에 django를 설치한다. 최신 버전의 장고를 다운받고 싶다면 [장고의 설치 가이드](https://www.djangoproject.com/download/)를 참고하자.

pip 아님을 주의하면서 터미널에서 `pipenv install Django==2.2.5` 커맨드를 입력하고, `django-admin` 로 버블에 잘 설치된 건지 확인한다. 주의해야 할 점은 이 프로젝트에서 django로 뭔가를 하려면 어떤 콘솔을 쓰던 간에 `pipenv shell`을 먼저 실행해야 하고, `django-admin`으로 잘 작동하는 지 확인해야 한다.

<br>

## 깃허브 연동

주의할 점은 vscode 파일 내에서 아래의 코드를 따라쳐선 안된다.

`git init`

`git remote add origin [레파지토리 주소]`

`git add .`

`git commit -m "[커밋 메시지]"`

(여기서부터는 선택 사항)

`README.md` `.gitignore` 파일을 만들고, 구글에 `gitignore python` 을 검색하면 디폴트로 쓰이는 gitignore를 찾을 수 있다. 붙여넣기 한 뒤 커밋하면 된다.

<br>

## creat django project

(아래는 선택사항)

(버블) 폴더 안에서 `django-admin startproject config` 를 입력하면, config 폴더가 생성되는데 이 폴더의 이름을 `Aconfig`로 변경한다. 이는 안에 있는 config 폴더와 manage.py 파일을 밖으로 꺼내기 위함이고, 옮긴 뒤에 Aconfig 폴더는 삭제한다.

계속해서 주의할 점은 가상환경에 설정된 파이썬 버전으로 작업하기 위해 **python interpreter를 꼭 pipenv가 붙어있는 버전을 선택해야 한다.** 이는 vscode에서 `ctrl+shift+p` 단축키로 확인 가능하다.

<br>

## 참고 
- [노마드코더](https://nomadcoders.co/airbnb-clone)
