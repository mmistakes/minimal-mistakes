---
title:  "Unit test & TDD"
excerpt: " Restful api "

categories:
  - Python
tags:
  - [Python, flask]

toc: true
toc_sticky: true

breadcrumbs: true
 
date: 2023-09-24
last_modified_at: 2023-09-24
---

## 1. 유닛테스트 와 TDD

### 1-1. 유닛테스트
- IT업계에서는 단위 테스트라고 한다.
- 작성된 프로그램에서 소스 코드의 특정 모듈이 의도된 대로 정확히 작동하는지 검증하는 절차를 뜻한다.
- 프로그램을 구성요소마다 작은 단위로 세분화하여, 제대로 프로그램이 작동하는지 테스트한다.

### 1-2. TDD(Test-Driven Development, 테스트주도개발)
- 소프트웨어 개발 방법론 중의 하나이다.
- 테스트 주도개발(TDD, Test-Driven Development)
- 테스트 코드 작성이 주가 되는 개발방법

## 2. Unit Test vs TDD

### 2-1. 공통점
테스트 케이스 작성을 통해, 높은 퀄리티의 코드생산을 보장하고 테스트를 자동화함으로써 디버깅 시간을 단축하고 배포전에 버그를 예방한다는 점.

### 2-2. 차이점
테스트 단계가 개발 단계의 전 후, 어느쪽에 배치 되어있는지에 따라 나뉨.

- 유닛테스트

개발진행 후, 개발된 프로그램을 검증하기 위한 테스트 코드를 작성

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/7300371a-3247-48c7-90db-35aae1e4d1a5)

- TDD
장애(fail)가 나는 테스트코드를 작성하고 테스트 코드를 통과(pass)하는 코드를 개발

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/546d68bb-0ddd-403a-8171-7af32d581dbe)

  - TDD 기본사이클(1~6번 반복)
    1) 작성하고자 하는 코드의 목표를 생각
    2) 목표에 부합하는 테스트 코드를 작성
    3) 2에서 작성한 코드를 실행하고 실패 노출
    4) 테스트를 성공시키기 위한 코드를 작성
    5) 테스트 코드를 성공 도출
    6) 테스트 성공을 전제 조건으로 리팩토링


### 2-3. python 테스트 툴
- [unittest](https://docs.python.org/ko/3/library/unittest.html)
  - python package에 원래 포함되어있다.

- [pytest](https://docs.pytest.org/en/stable/)


## 3. pytest fixture를 통한 테스트 환경 구축

- v1.0.18 참조
- pytest, pytest-watch 설치
```
$ pip install pytest 
$ pytest-watch
```
  - requirements.txt 반영
```
pip freeze > requirements.txt
```

- 테스트 스테이지 config 작성
  - .gitignore에 *.db 추가된것 확인 (형상관리 하지 않음)
- 학습용 test_route.py 작성

- [플라스크 테스트 예시](https://flask.palletsprojects.com/en/1.1.x/testing)
  - @pytest.fixture로 고정해주면 client에서 return or yield 값을 받는 client를 여러가지 테스트 케이스의 함수인자(client)로 받아서 그대로 이용할 수 있다.


- 테스트 항목 선별기준
  - test_*.py
  - def test_*() ..etc...
    - 위 처럼 test가 붙은 모듈이나 python file, 함수들만 list up해서 pytest가 테스트케이스를 돌린다.

- 커맨드
```
$ pytest -sv
```
  - -sv : pytest의 상세한 옵션로그를 볼수있다.

- 이미 작성된 endpoint들에 대해서 unittest로 검증한번해보자.

```
(googlekaap > configs.py)

import os
BASE_PATH = os.path.dirname(os.path.abspath(__file__))   ##__file__의 절대경로의 디렉토리명을 확인해보자.


class TestingConfig(DevelomentConfig):
     __test__ = False   ## test로 시작하지만, testcase를 타지말라고 False로 둔다.
     TESTING = True
     SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(BASE_PATH, "sqlite_test.db")}' ## 동일경로에 sqlite_test.db가 생성된다.

```
  - tests라는 디렉토리 만든 후  test_route.py를 만든다.여기서 TestingConfig를 상속받으면서 test client를 만들어 줘야 한다.

```
(tests > test_route.py)

import sys
sys.path.append('.')        ## googlekaap에 있는거 가져올때는 이코드를 넣어줘야 좋다.

from googlekaap.configs import TestingConfig
from googlekaap import create_app
import pytest

@pytest.fixture
def client():
    app = create_app(TestingConfig())

    with app.test_client() as client:
        yield client
 
def test_auth(client):
    r= client.get(
        '/auth/register',
        follow_redirects=True   ## 페이지가 redirection 될때 그걸 따라가겠다. 그리고 따라간 page의 response 값을 가져오겠다는 의미. get에 대한 response는 302가 떨어지는 경우도 많다. 그래서 그걸 이용하지 말고 최종적으로 도달한 request의 return값을 이용하기 위해서이다.

    )
    ## 검증할때는 assert 라고 붙이면 좋다.
    assert r.status_code == 200

    r = client.get(
        '/auth/login',
        follow_redirects= True
    )
    assert r.status_code == 200

    r = client.get(
        '/auth/logout',
        follow_redirects= True
    )
    assert r.status_code == 200

    r = client.get(
        '/auth',
        follow_redirects= True
    )
    assert r.status_code == 200

## index page도 만들어보자.
def test_base(client):
    r = client.get(
        '/',
        follow_redirects=True
    )
    assert r.status_code == 200

$ pytest -sv
```
  - pytest -sv : pass 여부를 알려준다.
![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/0b353727-701a-496f-8aab-626d3a040e7b)

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/4c89fdc8-3904-4c0b-bc06-9340fb57d6d6)

  - 200을 return 받았는데 지금 너는 201을 assert하고 있어. 그러므로 이 testcase는 잘못됫음을 알려준다.
![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/8f7d7e19-e31f-4891-a506-2489a472ef21)
  - testcase가 2개이므로 2pass가 나온다.

- pytest-watch

```
$ ptw
```
  - ptw라고 치면 계속 커맨드 안쳐도 자동으로 테스트케이스 실시간으로 바뀌게 된다.


## 4. 유닛테스트와 TDD: pytest 테스트 파일 분리 관리

- v1.0.19 참조
- /api/users/* 엔드포인트 테스트 케이스 작성
  - 테스트 파일 추가생성 및 분리관리 필요
  - 테스트 디비 초기화
  - 더미 유저 데이터 작성
- fixture 공유를 위한 conftest.py 작성
  - 모듈(디렉토리)별로 관리하는것을 선호

### 4-1. fixture 공유를 위한 conftest.py 작성

```
(conftest.py)
import sys
sys.path.append('.')        ## googlekaap에 있는거 가져올때는 이코드를 넣어줘야 좋다.

from googlekaap.configs import TestingConfig
from googlekaap import create_app
import pytest

@pytest.fixture
def client():
    app = create_app(TestingConfig())

    with app.test_client() as client:
        yield client

$ pytest -sv
```
  - 이제 test디렉토리안에 파일이 2개됨. 별도관리필요.
  - @pytest.fixture가 test_route.py에 있고 test_api_user.py에는 없다. 이럴때는 공통적으로 어떻게 쓸까? 
  - tests 디렉토리안에 conftest.py를 만들어준다.
  - 여기다가 fixture를 옮겨논다.
  - 정상작동한다.

- 이제 conftest.py가 정상작동하니 test_api_user.py를 꾸며보자.
  - 유저생성 등 하는 dummy data가 필요.



- tests > configs.py에다가 dummy data를 sqlite_test.db에 넣어주면 될것이다.
- 클라이언트를 세분화하기 위해 def app()를 만들자.
- 즉, dummy data를 만들고 그걸 app이 받아서 client에 넣어줘서 fixture를 만든다.
- 이게 실행될때 with app.app_context(): 를 이용해서 db 데이터를 컨트롤해보자.

```
(tests > conftest.py)
import sys
sys.path.append('.')        ## googlekaap에 있는거 가져올때는 이코드를 넣어줘야 좋다.

from googlekaap.configs import TestingConfig
from googlekaap import create_app, db
import pytest
from googlekaap.models.user import User as UserModel



## dummy data 만들기
@pytest.fixture
def user_data():
    yield dict(
        user_id = 'tester',
        user_name = 'tester',
        password = 'tester'
    )

## 만든 dummy data를 sqlite에 넣어주자
@pytest.fixture
def app(user_data):
    app = create_app(TestingConfig())
    with app.app_context():
        db.drop_all()   ## db 초기화
        db.create_all() ## flask가 업데이트 된것처럼 db생성해준다.
        db.session.add(UserModel(**user_data))  ## model에 넣어준다.
        db.session.commit()
    yield app

@pytest.fixture
def client(app):
    with app.test_client() as client:
        yield client

$ pytest -sv
```
  - sqlite_Test.db가 생성이 되는걸 확인.
  - 이렇게 하면 이제 test_api_user.py를 만들수 있는 환경구축 완료

```
(tests > test_api_user.py)

def test_get_user(client):
    r = client.get(
        '/api/users',
        follow_redirects=True
    )
    assert r.status_code == 200
    assert len(r.json) == 1 ## response의 길이르 보자. conftest에서 userModel을 1개 넣었으므로 len은 1이 나올것이다.

def test_get_user(client,user_data):
    ## dummy data를 가져와서 넣은데이터와 일치하는지 확인
    r = client.get(
        '/api/users/1',
        follow_redirects=True
    )
    assert r.status_code == 200
    assert r.json.get('user_id') == user_data.get('user_id')
    assert r.json.get('user_name') == user_data.get('user_name')

## 생성하는것.
def test_post_user(client,user_data):
    r = client.post(
        '/api/users',
        data=user_data
    )
    assert r.status_code == 409 ## user_id는 unique해야하니깐 장애가 나야한다.
    new_user_data = user_data.copy()
    new_user_data['user_id'] = 'tester2'

    r=client.post(
        '/api/users',
        data=new_user_data
    )
    assert r.status_code ==201

$ pytest -sv
```


## 5. 개발환경 정리하기

- 로그인 페이지에서 일부로 비밀번호 틀리고, 에러 리스트 봐보기
- restx 네임스페이스에 프리픽스가 /api 붙는 부분 추가 설명
- api/docs에 model 확인
- 하기 버그수정

### 5-1. flask 기술 스택
flask 템플릿 엔진을 통한 로그인, 로그아웃, 회원가입 정적페이지 작성완료.(JINJA라는 template engine을 이용함)

- Flask
    - Application factories
      : create_app으로 함수 감싸서 return 해주는 것.
    - Application context
    - Authentication
    - Blueprint
      : URL들 분기해주는것.
    - Configs
      : Staging 별로 나눠줬음.
    - Debugging
    - Router
    - Request Hooking
      : before,after request하면서 db session관리 해봄.
    - Request context
      : session이나 request 를 통해서 HTTP자원에 접근하는 방법
    - Staging
    - Session
    - Serving static files
    - Template engine & rendering
      : JINJA
    - Test Client
- Flask-WTF
    - CSRF
- Flask-restx
    - RESTful API
- Flask-SQLAlchemy
    - ORM
- Flask-Migrate
    - Database Migration
- Flask unittest & TDD
    - pytest

### 5-2. 클론코딩떄 할것

- 기초에서 만든 기능을 토대로 Google Keep 클론코딩을 진행합니다.
    - 메모 추가, 수정, 삭제, 편집, 복구
    - 메모 이미지 삽입 기능
    - 메모 라벨링 기능
    - 메모 페이지네이션
    - 메모 검색
    - 각 기능 API 작성
    - API 문서 자동화
    - 데이터베이스 마이그레이션
- 기초와는 다르게 동적인 페이지를 작성합니다.

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
 

