---
title:  "RESTFul API"
excerpt: " Restful api "

categories:
  - Python
tags:
  - [Python, flask]

toc: true
toc_sticky: true

breadcrumbs: true
 
date: 2023-09-23
last_modified_at: 2023-09-23
---


## 1. API(Application Programming Interface)
응용프로그램에서 사용할 수 있도록, 운영체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스

## 2. REST(Representational State Transfer)
- 규칙이라기보다는 가이드이다.
- RESTful하게 API를 설계할지 말지는 개발자의 선택.

### 2-1 . REST의 구성요소
URL을 통해 *자원*을 *표현*하고 접근 자원에 대한 *행위*를 METHOD로 구분한다는것!

- 자원
- 행위
- 표현

### 2-2. METHOD별 역할

- [HTTP METHODS](https://restfulapi.net/http-methods/)

|METHOD|Role|CRUD|
|---|---|---|
|POST|리소스 생성|C|
|GET|리소스 조회|R|
|PUT|리소스 교체(없을 경우 생성)|U|
|PATCH|리소스 부분 교체|U|
|DELETE|리소스 삭제|D|

- [PATH 사용하지 말아야 할 예](https://williamdurand.fr/2014/02/14/please-dont-patch-like-that/)

- PUT vs PATCH

```
GET /api/users/1
{
  "id" : 1,
  "user_id : "admin",
  "user_name": "관리자"
}
```
  - user_id 값만 변경하고 싶을때 *PUT* method를 통해 호출하면 된다.

```
PUT /api/users/1
{
  "user_id": "test"
}

(결과)-->

{
  "id" : 1,
  "user_id" : "test",
  "user_name" : null
}
```
  - user_id 이외의 값, 여기선 user_name이 초기화 된다.

  - PATCH method 사용시 user_id만 변경가능하다.

```
PATCH /api/users/1
[
  {"op" : "replace", "path": "/user_name", "value": "test" }
]
```
  - 다만 PATCH method는 사용방법이 위처럼 불편하다.

### 2-3. RESTful의 특징으로 계층관계 표현 가능.

```
http://test.com/api/backends/languages/pythons/{version}
```
  - URL을 통해서 계층을 표현할 수 있다.
  - backends라는 데이터 컬렉션 안에 languages라는 컬렉션이 있고 그안에는 pythons이라는 컬렉션이 있고 그안에 여러 version이 있는 계층구조를 URL로 설명할 수 있다.

### 2-4. RESTful의 특징으로 URL 설계 포인트

- 대문자와 밑줄(_)은 사용하지 않는다.
- 가독성을 위해 써야한다면, 하이픈(-)을 사용한다.
- 확장자는 URL에서 제거한다.

```
http://test.com/API/Backends/Languages (x)  대문자 사용
http://test.com/api/backend_developers/1 (x)  밑줄사용
http://test.com/api/backend-developers/1 (0)  하이픈 사용가능
http://test.com/api/backenddevelopers/1 (0) 
```

### 2-5. [HTTP 상태코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

### 2-6. 추가공부영상참조
[네이버 D2: 그런 REST API로 괜찮은가](https://www.youtube.com/watch?v=RP_f5dMoHFc)


## 3. API문서자동화 : Flask RESTX

- v1.0.13 참조

- Flask resetx설치 및 정의
- 네임스페이스 처리 및 블루프린트 등록
- requirements.txt 반영

[flask-restx](https://flask-restx.readthedocs.io/en/latest/quickstart.html)


### 3-1. 재사용 가능한 네임스페이스형 API정의

- v1.0.13 참조

- [flask-restx namespaces](https://flask-restx.readthedocs.io/en/latest/scaling.html#multiple-apis-with-reusable-namespaces)

- flask-restx 설치

```
$ pip install flask-restx
$ pip freeze > requirements.txt
$ conda list > package.txt
```


- 재사용 가능한 네임스페이스형 API정의를 참조해서 api version, namespace 에 따라 관리를 해야한다. 
- flask blueprint처럼 손쉽게 initialize할수 있다. 
- apis라는 디렉토리 만든 후 __init__.py를 만들어 준다.그래서 apis가 하나의 모듈로서 동작하게 만든다.
- __init__.py를 만든후 api연결해준후 flask app에 연결해준다. 즉, googlekaap > __init__.py에 적어주면된다. 

```
(apis > __init__.py)
from flask_restx import Api
from flask import Blueprint

## 1. bp = Blueprint(NAME, __name__, url_prefix='/auth') # blueprint아래에 작성되는 라우터는 모두 prefix를 auth를 갖게된다.공통관리가능. 
## 1-1. blueprint initialize한거와 동일한 구조이다.(1번참조)
blueprint = Blueprint (
    'api',
    __name__,
    url_prefix='/api'
)

## 2. Api를 initialize해주자
## 2-1. API를 자동으로 만들어주는데 문서의 버전,경로등을 지정  
api = Api(
    blueprint,
    title='Google Kaap API',
    version='1.0',
    doc='/docs',
    description='Welcome my api docs'
)

# TODO: add namespace to Blueprint 



(googlekaap > __init__.py)
''' Restx INIT '''
## apis에 있는 blueprint를 가져오겠다는 의미. blueprint는 restx의 api가 initialize 된 녀석이다.    

from googlekaap.apis import blueprint as api
app.register_blueprint(api)

```
- 즉 blueprint가 api에 연결되어있고, api는 __init__.py에서 import 해준것이다.

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/653b627e-ac91-46f1-b582-0d5fa9b2c6d2)

### 3-2. 연습)유저 단 복수 조회 API 작성 및 리스폰스 맵핑

- v1.0.14 참조

- 유저 API 네임스페이스 정의
- 유저 네임스페이스 정의
- 단/복수 API 작성
- SWAGGER_UI_DOC_EXPANSION
- marshal_with, skip_none
- 호출테스트

[](https://flask-restx.readthedocs.io/en/latest/configuration.html)

[](https://flask-restx.readthedocs.io/en/latest/marshalling.html#skip-fields-which-value-is-none)



- USER model api를 만들자.
  - apis>user.py를 만들자.
  - 그리고 model에 접근하는 api를 만들자.
  - 그 후 apis > __init__.py 에 initialize 해줘야 한다.
  - 그리고 데이터를 조회 후 return 해줄 때 [response mapping: marshalling](https://flask-restx.readthedocs.io/en/latest/marshalling.html)이란걸 해줘야 한다.
  - Basic Usage를 보녀 model을 설계해주고, @api.marshall_with의 값을 model에 넣어주고 db_get_todo() 데이터를 return 해주면 우리가 설계한 model이란 값에 맞는 필드들만 해당되는 데이터들이 알아서 매핑이 되서 프론트에 노출이 된다. 

  - 데이터베이스 설계와 동일하게 apis > user.py에 만들면 된다.
```
user = ns.model('User', {
  ## 그리고 프론트엔드에 노출시키고 싶은 정의들을 적으면 된다.
  'id' : fields.Integer(required=True, description='유저고유번호'),
  'user_id' : fields.String(required=True, description='유저 아이디'),
  'user_name' : fields.String(required=True, description='유저 이름'),
})

## 각 클래스에 
@ns.marshal_with(user, skip_none=True) ## 복수일때는  marshal_list_with, 단수일때는 marshal_with해주면 된다.그리고 여기에 우리가 만든 user를 넣어주고, skip_none=True를 넣어준다. skip_none은 특정 필드가 null이거나 데이터가 없을 경우 아예 key값을 안만들어 준다.  
```

  - 그리고 api/docs를 보면 한번에 펼쳐서 보고싶다면?
    - googlekaap > __init_.py 에다가 아래처럼 정의해주면 한번에 펼쳐져서 나온다.

```
(googlekaap > __init__.py)
app.config['SWAGGER_UI_DOC_EXPANSION'] = 'list' 
```


```
(최종 결과)
(apis > user.py)
from flask_restx import Namespace,Resource, fields
from googlekaap.models.user import User as UserModel  ## 아래 /api 들은 모두 model에 대한 정보를 가져와야 하기에 이렇게 import 해주자.


ns = Namespace(
  'users',  ## users는 URL에 들어가게 된다.
  description='유저 관련 api'
)

user = ns.model('User', {
  ## 그리고 프론트엔드에 노출시키고 싶은 정의들을 적으면 된다.
  'id' : fields.Integer(required=True, description='유저고유번호'),
  'user_id' : fields.String(required=True, description='유저 아이디'),
  'user_name' : fields.String(required=True, description='유저 이름'),
  
})

# /api/users  ## (복수표현해주기) 이 URL은 모든 users 정보를 가져오는걸 목적으로 한다.
@ns.route('')
class UserList(Resource):
  @ns.marshal_with(user, skip_none=True) ## 복수일때는  marshal_list_with, 단수일때는 marshal_with해주면 된다.그리고 여기에 우리가 만든 user를 넣어주고, skip_none=True를 넣어준다. skip_none은 특정 필드가 null이거나 데이터가 없을 경우 아예 key값을 안만들어 준다.  
  ## 우리가 배웠던 method를 함수로 정의해주면 된다.
  def get(self):
    ## 비지니스 로직을 만들어보자.
    """유저 복수 조회"""
    data = UserModel.query.all()
    return data
    

# /api/users/1  ## (단수표현해주기) 모든 users중에 아이디값이 1을 갖는 고유한 user의 정보만 가져와서 보여준다. 
@ns.route('/<int:id>')
@ns.param('id', '유저 고유 번호') ## id는 유저고유번호를 의미함을 나타낸다.
class User(Resource):
  @ns.marshal_with(user, skip_none=True)
  def get(self, id):
    """ 유저 단수 조회"""
    data = UserModel.query.get_or_404(id)   ## get_or_404 : id에 해당하는애가 없으면 404를 띄워준다. 
    return data

(apis > __init__.py)
from .user import ns as UserNamespace   ## user.py에 있는 ns가 import 된다.

api.add_namespace(UserNamespace)

```
  - [flask-restx: namespze 지정하기](https://flask-restx.readthedocs.io/en/latest/api.html) 참조하여 만들기

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/42b49d47-e332-4560-bbe7-7af57634135c)

  - frontend에서 이문서만 봐도 어떤 api인지 확인가능 하게 해주기 위해 관련된 description을 많이 달아줘야 한다.

### 3-3. POST(유저추가) METHOD API작성과 리퀘스트 파서

- v1.0.15 참조

- 추가시, WTF 장애
  - 개발환경에서 WTF_CSRF_ENABLED 설정
    - TODO: 프로젝트 강의에서 같이 해결
- 유저 생성 API 작성
- 로그인 해보기



### 3-3-1. 연습) reqparse

- apis > user.py에서 post method를 추가해주면 된다.
- 우리는 지금 g context에다가 database section을 넣어놓았다. 이를 이용하자.(from flask import g) 
- 그리고 추가적으로 reqparse를 이용하자. (from flask_restx import reqparse). 
- 또한 암호화할때 werkzeug도 해서(from werkzeug import security) password 암호화할때 사용하자.

- api호출할때도 특정값을 넣어서 frontend에 값을 전달한후에 db에 넣어주는 일련의 작업을 진행한다. 그때 [reqparse](https://flask-restx.readthedocs.io/en/latest/parsing.html)를 이용한다.
- 이놈을 이용해서 넘어온 데이터들을 조회할수 있다.
- 마치 flask wtf에서 홈정보를 조회하듯이!

  - 1) 먼저 넘어온 정보들을 조회해주자.
  - 2) 이제 post_parser를  post method에서 이용할수 있도록 정의를 줘야한다.
    - @ns.expect(post_parser)
    - @ns.marshal_list_with(user,skip_none=True)
    - 이렇게 하면 우리가 정의한대로 api/docs에서 문서화되서 나오게 된다.

  - 3) 추가적으로 @ns.expect(post_parser) 여기의 post_parser를 받아서 def post(self) 를 완성해주면 된다.
    - args = post_parser.parse_args() 하면 여기에 차근차근 데이터가 담기게 된다.
  - 4) g context에 있는 db section을 이용해서 user 넣어주고 commit해준다.

```
(apis > user.py)
from flask import g
from werkzeug import security
from flask_restx import Namespace,Resource, fields, reqparse

## 1) 정보조회하기 위해서!!
post_parser = reqparse.RequestParser()  #initialize해주자
post_parser.add_argument('user_id',required=True, help='유저고유아이디')  # 우리가 받아올 정보들을 여기다 넣어주자.
post_parser.add_argument('user_name',required=True, help='유저 이름')
post_parser.add_argument('password',required=True, help='유저 패스워드')

@ns.route('')
@ns.response(409, 'User Id is already exists')  ## 이렇게 문서화해줄수 있다.
class UserList(Resource):
  @ns.marshal_with(user, skip_none=True) ## 복수일때는  marshal_list_with, 단수일때는 marshal_with해주면 된다.그리고 여기에 우리가 만든 user를 넣어주고, skip_none=True를 넣어준다. skip_none은 특정 필드가 null이거나 데이터가 없을 경우 아예 key값을 안만들어 준다.  
  ## 우리가 배웠던 method를 함수로 정의해주면 된다.
  def get(self):
    ## 비지니스 로직을 만들어보자.
    """유저 복수 조회"""
    data = UserModel.query.all()
    return data
  
  ## 2) post_parser를  post method에서 이용할수 있도록 정의를 줘야한다.
  @ns.expect(post_parser)
  @ns.marshal_list_with(user,skip_none=True)  
  def post(self):
    """ 유저 생성"""
    ## 3) 추가적으로 @ns.expect(post_parser) 여기의 post_parser를 받아서 def post(self) 를 완성해주면 된다.
    args = post_parser.parse_args()
    user_id = args['user_id']
    user = UserModel.find_one_by_user_id(user_id)
    if user:
      ns.abort(409) ## 유저아이디가 있는경우기 떄문에 장애가 나와야한다. abort 해주면 409 response가 가게 된다. 409 method로 이미 존재하기에 conflict된다고 표현해준다.
    user = UserModel(
      user_id = user_id,
      user_name = args['user_name'],
      password=security.generate_password_hash(args['password'])  ## 암호화해주기
       
    )
    ## 4) g context에 있는 db section을 이용해서 user 넣어주고 commit해준다.
    ## 그리고 여기서 만든걸 return 해줄때 user를 return해주고 정상적으로 생성되면 response가 201 날려주면서 생성되었다고 전달해주자.
    g.db.add(user)
    g.db.commit()
    return user,201
```

  - CSRF token is missing error
    - app.config['WTF_CSRF_ENABLED'] = False  
      - api test할때 CSRF token is missing error 발생하는데 post method 보낼때 CSRF token을 같이 실어서 보내준다. 지금 문서화에서는 해당작업을 안했기에 이런 에러가 뜬다. 그렇기에 googlekaap > __init_.py에 위 코드르 추가하면 에러가 일단 안뜨게 된다.

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/a8bc1feb-193d-4a7a-acb8-e78dad58e319)



[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
 

