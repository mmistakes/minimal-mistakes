---
title:  "DB migration"
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

## 1. DB migration
: 데이터베이스 마이그레이션 = 필드추가 된다는 의미이다.

- v1.0.16 참조

- 생성일자 컬럼 추가
- 데이터베이스 마이그레이션 및 업그레이드 처리
- 버전 파일 확인하기

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/8f2693c6-080e-4263-a7ec-46664b10e736)

  - user_id, user_name, password 3가지가 있고 고유키인 id가 있다. 여기에 create_at이라는 datatime을 신규추가해보는것.

### 1-1. DB migraion 연습

```
(models > user.py)
from sqlalchemy import func

## class는 이제 sql에서 table이 될것이다. 거기서 table명이 User이다.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20), unique=True, nullable=False)
    user_name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DataTime(), server_default=func.now())
```

```
$ flask db migrate -m 'added column to user model'  ## 이러면 version 파일이 하나 더 생성됨을 알수있다.
$ flask db upgrade                                  ## 이거 해야 반영이 된다.
$ flask db current                                  ## 우리의 head는 무엇이고, 해당 version의 생성된 파일이름과 동일하고 여기까지 우리의 데이터베이스가 디비전이 됬구나를 알수있다
$ flask db history                                  ## 히스토리 확인가능.
```
  - 이렇게만 하면 추가한 create_at이 신규노출이 안된다.

```
(apis > user.py)

user = ns.model('User', {
  ## 그리고 프론트엔드에 노출시키고 싶은 정의들을 적으면 된다.
  'id' : fields.Integer(required=True, description='유저고유번호'),
  'user_id' : fields.String(required=True, description='유저 아이디'),
  'user_name' : fields.String(required=True, description='유저 이름'),
  'created_at' : fields.DateTime(description='가입일자')                ## 이거 추가!!
})

```
  - 이떄  api 문서보면 생성일자가 모두 같이 나오는데 그 이유는 server_default=func.now() 했기 떄문이다.
  - server_default vs default
    1) server_default : 빈형태의 데이터들 있으면 하나하나 다 실행시켜준다, 즉 기존의 데이터들어간거 까지 업데이트
    2) default : migration한 이후 부터 들어간 데이터에 한해서만 func.now가 실행되서 생성일자가 들어가게 된다, 즉 migration 이후 업데이트
  
## 2. flask config 설정 분리 및 정리

- v1.0.17 참조

- 관리되지않는 config 파일 스테이지 별로 관리하기

- Flask 앱에 컨픽정의 예시
```
app.config.from_object(config)
```
[Configuration Handling](https://flask.palletsprojects.com/en/1.1.x/config/)

- configuration basics 형태로 or dvelopment/production 처럼 class 형태로 관리할 수 있다. 참고자료 : [Configuration Handling](https://flask.palletsprojects.com/en/1.1.x/config/)
  - 우리는 class 형태로 한번 변환해보자.
  - configs.py를 만들자.여기서 class로 정의해보자.

```
(googlekaap > __init_.py)
def create_app():
    print('run: create_app()')
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'secret'
    app.config['SESSION_COOKIE_NAME'] = 'googlekaap'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/googlekaap?charset=utf8' ## /googlekaap은 db명을 넣는것이다.
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SWAGGER_UI_DOC_EXPANSION'] = 'list' 

    if app.config['DEBUG'] == True: #true일때 (debug환경일때) 
        app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1 # 1s로 바꾸니 바로 갱신될것이다.
        app.config['TEMPLATES_AUTO_RELOAD'] = True
        app.config['WTF_CSRF_ENABLED'] = False  ## api test할때 CSRF token is mission error 발생하는데 post method 보낼때 CSRF token을 같이 실어서 보내준다. 지금 문서화에서는 해당작업을 안했기에 이런 에러가 뜬다.

##########################################
## 위에 경로있는걸 아래처럼 바꿔줘야 한다.
##########################################

(googlekaap > configs.py)
class Config:
    """ Flask Config """    
    SECRET_KEY = 'secret'
    SESSION_COOKIE_NAME = 'googlekaap'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost/googlekaap?charset=utf8' ## /googlekaap은 db명을 넣는것이다.
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SWAGGER_UI_DOC_EXPANSION = 'list' 

class DevelomentConfig(Config): ## 위에 만든 Config를 상속받는형태이기 떄문에(Config) 가 들어간다.
     
     """ Flask Config for dev """
     DEBUG = True #true일때 (debug환경일때) 
     SEND_LEMAX_AGE_DEFAULT = 1 # 1s로 바꾸니 바로 갱신될것이다.
     # TODO: Front호출시 처리
     WTF_CF_NABLED = False

class ProductionConfig(DevelomentConfig):
     pass

(googlekaap > __init__.py)
from .configs import DevelomentConfig, ProductionConfig

def create_app(config=None):  
    print('run: create_app()')
    app = Flask(__name__)

    """ Flask Configs """
    from .configs import DevelomentConfig, ProductionConfig
    ## init 되는 config가 없을때는 기본값설정해주기
    if not config:
        if app.config['DEBUG']:
            config = DevelomentConfig()
        else:
            config= ProductionConfig()
    print('run with :', config)
    app.config.from_object(config)
```
  - app = Flask(__name__) 이 호출이 될때 개발환경일떄는 none이 될꺼니깐 develomentConfig가 호출된다.

  ![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/dde04334-f7d6-4a8a-9572-a8963f2587d6)

```
$ set FLASK_ENV=production 
$ flask run
``` 
  - 이거로 하면 ProductionConfig가 사용됨을 알수있다.
  - 이렇게 환경을 분리해보았다. 이렇게 관리하면 flask app을 확장성있게 관리하는데 유용하다.


[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
 

