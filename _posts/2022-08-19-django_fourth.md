---
layout: single
title:  "[django] 장고 admin을 통한 데이터 관리(기초)"
categories: django
tag: [python, django, MySQL]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# django admin

- django.contrib.admin 앱을 통해 제공
    - 디폴트 경로 : /admin/ è 실제 서비스에서는 다른 주소로 변경 권장
    - 혹은 django-admin-honeypot 앱을 통해, 가짜 admin 페이지 노출
- 모델 클래스 등록을 통해, 조회/추가/수정/삭제 웹UI를 제공
    - 서비스 초기에, 관리도구로서 사용하기에 제격
    - 관리도구 만들 시간을 줄이고, End-User 서비스에 집중 !
- 내부적으로 Django Form을 적극적으로 사용

# 모델 클래스를 admin에 등록하기

앱/admin.py
```python
from django.contrib import admin
from .models import Item
```

## 등록법 #1

```python
admin.site.register(Item) # 기본 ModelAdmin으로 동작
```

## 등록법 #2

```python
class ItemAdmin(admin.ModelAdmin):
    pass

admin.site.register(Item, ItemAdmin) # 지정한 ModelAdmin으로 동작
``` 

## 등록법 #3

```python
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    pass
```

# 모델 클래스에 __str__구현

admin 모델 리스트에서 "모델명 object"를 원하는 대로 변경하기 위해

- 객체를 출력할 때, 객체.__str__()의 리턴값을 활용

```python
from django.db import models
class Item(models.Model):
    name = models.CharField(max_length=100)
    is_public = models.BooleanField(default=False, verbose_name='공개여부')
    desc = models.TextField(blank=True)
    price = models.PositiveIntegerField()
    is_publish = models.BooleanField(default=False)

    def __str__(self):
        return f'<{self.pk}> {self.name}
```

str(...)은 자바의 toString()과 유사
모델 리스트의 제목을 __str__의 리턴값으로 처리해줄 수 있다.

## list_display, list_display_links, search_fields, list_filter 속성 정의

모델 리스트에 출력할 컬럼 지정
admin.py에서 건든다.

```python
from django.contrib import admin
from .models import Item

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'is_public', 'desc', 'price', 'is_publish']
    list_display_links = ['name']
    search_fields = ['name']
    list_filter = ['is_public']
    def short_desc(self, item):
        return item.desc[:20]
```

- 특정 Item이라는 모델명을 가진 것의 모델 리스트를 column으로 나누어서 모델 리스트의 제목을 나타내준다.

- list_display_links에 name을 넣어주면 모델 리스트 제목의 name을 클릭하게 되면 링크에 접속하게 됨!

- python manage.py shell 로 쉘 접속
    - from 앱이름.models import 모델명
    - 모델명.objects.all()
        - 전체 포스팅을 데이터 베이스로부터 가져올 수 있다.
    - 모델명.objects.all().filter(message__icontains="보고 싶은 글자")
        - 보고 싶은 글자를 포함하고 있는 포스팅을 가져온다.
    - qs = 모델명.objects.all().filter(message__icontains="보고 싶은 글자")
    - print(qs.query)
        - db로 전달되는 쿼리를 확인할 수 있다.

- 위의 과정이 search_fields의 기능이다. 이걸 쓰게 되면 name에 관해 검색을 할 수 있는 ui가 생기게 된다.
- list_filter를 쓰면 is_public, 즉 공개 여부에 관한 포스팅들이 오른쪽에 차례 ui처럼 뜨게 된다.








