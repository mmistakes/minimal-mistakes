---
layout: single
title:  "[django] 모델 만드는 법"
categories: django
tag: [python, django, MySQL]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 애플리케이션의 다양한 데이터 저장방법
  
- 데이터 베이스 : RDBMS, NoSQL 등
- 파일 : 로컬, 외부 정적 스토리지
- 캐시서버 : memcached, redis 등

# 데이터베이스와 SQL

## 데이터베이스의 종류

- RDBMS (관계형 데이터베이스 관리 시스템)
	- PostgresSQL, MySQL, SQLite, MS-SQL, Oracle 등
- NoSQL : MongoDB, Cassandra, CouchDB, Google BigTable 등

## 데이터베이스에 쿼리하기 위한 언어 -> SQL

- 같은 작업을 하더라도, 보다 적은 수의 SQL, 보다 높은 성능의 SQL
- 직접 SQL을 만들어내기도 하지만, ORM(Object-relational mapping)을 통해 SQL을 생성/실행하기도 한다.
	-  Not Magic
- **중요**) ORM을 쓰더라도, 내가 작정된 ORM코드를 통해 어떤 SQL이 실행되고 있는 지, 파악을 하고 이를 최적화할 수 있어야한다.                
    - django-debug-toolbar 적극 활용

## 장고 ORM인 모델은 RDB만을 지원

- Microsoft SQL Server는 django-pyodbc-azure 라이브러리가 필요

## 다양한 파이썬 ORM(awesome-python#orm)

- Relational Databases
    - Django Models, SQLAlchemy, Orator, Peewee, PonyORM 등
- NoSQL Databases
    - django-mongodb-engine, hot-redis, MongoEngine, PynamoDB 등

## 장고의 강점은 Model과 Form

물론, 장고에서도 다양한 ORM, 라이브러리 사용 가능.

강력한 Model/Form

물론, 적절하게 섞어쓸 수도 있다.

SQL을 직접 실행할 수도 있지만, 가능하면 ORM을 쓰자

    - 직접 SQL문자열을 조합하지 말고, 인자로 처리 -> SQL Injection 방지

```python
from django.db import connection, connections

with connection.cursor() as cursor:
    cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
    cursor.execute("SELECT foo FROM bar WHERE baz = %s", [self.baz])
    row = cursor.fetchone()
    print(row)
```

### 장고 shell 실행 방법

1. python manage.py shell
2. from django.db import connection, connections
3. cursor = connection.cursor()
4. cursor.close()
5. exit()

# Django Model

**장고 내장 ORM**

**<데이터베이스 테이블>과 <파이썬 클래스>를 1:1로 매핑**

- 모델 클래스명은 단수형으로 지정 - 예 : Posts (X), Post(O)
    - 클래스이기에 필히 "첫 글자가 대문자인 PascalCase 네이밍"
- 매핑되는 모델 클래스는 DB 테이블 필드 내역이 일치해야함
- 모델을 만들기 전에, 서비스에 맞게 데이터베이스 설계가 필수
- 이는 데이터베이스의 영역 -> 관계형 데이터베이스 학습도 필요

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

## 모델 활용 순서

- 장고 모델을 통해, 데이터베이스 형상을 관리할 경우

1. 모델 클래스 작성
2. 모델 클래스로부터 마이그레이션 파일 생성 -> makemigrations 명령
3. 마이그레이션 파일을 데이터베이스에 적용 -> migrate 명령
4. 모델 활용
- 장고 외부에서, 데이터베이스 형상을 관리할 경우
    - 데이터베이스로부터 모델 클래스 소스 생성 è inspectdb 명령
    - 모델 활용

## 모델명과 DB 테이블명

**DB 테이블명 : 디폴트 "앱이름_모델명"**

**예**

- blog앱
    - Post 모델 -> "blog_post"
    - Comment 모델 -> "blog_comment"
- shop 앱
    - Item 모델 à "shop_item"
    - Review 모델 à "shop_review"

**커스텀 지정**

모델 Meta 클래스의 db_table 속성

### 모델 만드는 법

새로운 앱이 없다면?

1. python manage.py startapp 앱이름
2. settings.py에 들어가 INSTALLED_APPS에 앱이름 추가
3. urls.py 파일 만들기
4. urls 파일에 urlpatterns = [] 써놓기
5. 전체 패키지앱의 urls.py에 가서 path('앱이름/', include('앱이름.urls')), 추가
6. shop/models.py


    ```python
    from django.db import models

    class Item(models.Model):
        name = models.CharField(max_length=100)
        desc = models.TextField(blank=True)
        price = models.PositiveIntegerField()
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
    ```

7. python manage.py makemigrations 앱이름
8. python manage.py migrate 앱이름
9. python manage.py sqlmigrate 앱이름 0001_initial 을 하게 되면 실제 데이터베이스에 들어가는 쿼리를 볼 수 있다.
10. python manage.py dbshell 을 치고 들어가면 sqlite 쉘로 들어가게 됨
11. .tables 를 하면 테이블 목록이 나옴
12. .schema 앱이름_모델명 을 치면 스키마도 볼 수 있다.
13. .quit으로 스키마를 나가게됨.