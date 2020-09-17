---
toc: true
title: "Django 서버에서 데이터베이스 Read replica 복제 지연 문제 대응"
date: 2020-09-17
categories: architecture,python
---

## 배경 지식

- 읽기전용 복제본(Read replica)이란?
  - 기본(Default) 데이터베이스의 내용을 복사한 내용을 가지고 있는 복제본 데이터 베이스 입니다.
  - 기본 데이터베이스의 변경사항이 생길 때마다 이를 비동기로 읽기전용 복제본에 반영합니다.
  - 읽기전용 복제본의 복제 지연 문제
    - 이 때 복제 지연(Replication lag) 문제가 발생합니다.
    - 트랜젝션을 사용하는 동작이 있을 때에도 서로 다른 데이터베이스에 접근할 경우 문제가 발생합니다.
- Django 의 데이터베이스 라우터
  - Django 에서는 [DBRouter](https://docs.djangoproject.com/en/3.1/topics/db/multi-db/) 를 통해 어떤 데이터베이스를 읽기(read) 혹은 쓰기(write)에 사용할지 선택하도록 할 수 있습니다. 아래는 읽기로는 읽기전용 복제본을 사용하고 쓰기로는 기본 데이터베이스를 사용하도록 하는 예제 입니다.

```python
class DBRouter:

    def db_for_read(self, model, **hints):
        return 'replica'

    def db_for_write(self, model, **hints):
        return 'default'
```

## 문제 분석

다음은 배너 객체를 저장하고 저장할 때 리턴하는 ID로 배너를 조회하는 아주 단순한 로직입니다.
그런데 ID로 배너를 조회하는 로직에서 배너를 못 찾는 이슈가 발견 되었습니다. 왜 그랬을까요?

```python
banner_id = self._use_case.insert_or_update_banner(banner.BannerInput(
    name=data["name"],
    # 추가 파라미터..
))

bann = self._use_case.get_banner(banner_id)
```

읽기전용 복제본을 사용하고 있었는데 위의 저장하는 코드에서는 기본(Default) 데이터베이스를 사용하고 있었고 읽어 올 때는 읽기전용 복제본에서 읽어 왔는데 **복제 지연 문제**로 인해 읽기전용 복제본에는 아직 해당 배너가 존재하지 않았기 때문이었습니다.

## 문제 해결

### 해결 방안 모색

팀에서 많은 해결 방법에 대해 논의 했고 결론은 **하나의 API 요청(컨텍스트) 안에서는 하나의 데이터베이스만 바라보도록 한다** 였습니다. 여러 HTTP 메소드 중에서 GET 이 가장 많이 호출되고 읽기전용 복제본 데이터베이스의 경우 데이터를 읽어서 리턴하는 GET 메소드에 가장 많이 활용되기 때문에 이러한 API 요청이 아닌 경우에 대해서는 기본 데이터베이스를 사용하도록 하는 것이 합리적이라고 생각합니다.

### 해결 방안 구현

이제 이러한 문제를 해결하기 위해 하나의 API 요청, 즉 하나의 컨텍스트 안에서 하나의 데이터베이스를 사용할 수 있도록 코드를 구성해야 합니다. 위에서 소개한 DB Router 에서 `db_for_read` 를 API 요청에 따라 선택할 수 있도록 구성해 보겠습니다.

#### 컨텍스트 관리자 구현

먼저 어떤 컨텍스트인지를 알 수 있도록 [contextmanager](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager) 를 활용해서 `use_replica` 라는 데코레이터를 선언했습니다. 이 데코레이터의 역할은 단순합니다. 데코레이터를 선언한 함수에 진입할 때 `context_holder` 에 `USE_REPLICA` 라는 어트리뷰트 값을 `True` 로 설정합니다. 그리고 함수에서 빠져나올 때 해당 어트리뷰트를 삭제합니다. 이렇게 해서 데코레이터를 선언한 함수 내의 컨텍스트에서만 `USE_REPLICA` 어트리뷰트의 값이 `True` 로 세팅되도록 한 것이죠.

```python
from contextlib import contextmanager
import threading

context_holder = threading.local()
KEY_USE_REPLICA = "USE_REPLICA"

@contextmanager
def use_replica():
    setattr(context_holder, KEY_USE_REPLICA, True)
    yield
    delattr(context_holder, KEY_USE_REPLICA)
```

특정 컨텍스트 하에서 해당 값을 읽기 위해서는 아래처럼 `context_holder` 에게 어트리뷰트 여부를 확인하고 값을 읽어올 수 있습니다.

```python
def get_context_config(key: str, default=None):
    val = getattr(context_holder, key, default)
    return val
```

#### 데이터베이스 라우터 구현

이제 위의 배경지식에서 공유한 Django 의 데이터베이스 라우터를 수정하겠습니다. 위에서 선언한 컨텍스트매니저를 통해 제공하는 `get_context_config` 함수를 통해 현재 컨택스트에서의 읽기복제본 사용여부에 대한 어트리뷰트 값을 읽어옵니다.

```python
class DBRouter:
    def db_for_read(self, model, **hints):
        if get_context_config(KEY_USE_REPLICA, False):
            return 'replica'
        else:
            return 'default'

    def db_for_write(self, model, **hints):
        return 'default'
```

#### 읽기복제본 데코레이터 사용

이제 특정 API 호출에 다른 읽기복제본 사용여부를 데코레이터를 통해 선언할 차례 입니다. 아래와 같이 `get` 에만 `@use_replica()` 를 추가해주면 해당 API의 로직이 수행될 때 읽기전용 복제본 데이터베이스를 사용하고 그 외의 경우에는 기본 데이터베이스를 사용하도록 설정할 수 있습니다.

```python
class MyBannerView(APIView):

    @use_replica()
    def get(self, request):
      # 읽기전용 복제본 데이터베이스를 사용

    def post(self, request):
      # 기본 데이터베이스를 사용
```
