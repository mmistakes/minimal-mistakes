---
layout: single
title:  "Fastapi에서 mongodb 사용하기"
---

FastAPI는 ASGI의 기반의 uvicorn을 이용하여 uvicorn에 기반한 비동기 처리로 API 요청과 응답을 비동기 처리할 수 있다. 하지만 Persistency Layer에서 이러한 요청을 처리할 때 non blocking을 지원해주지 않는다면 API 요청에서는 비동기 처리가 가능하여도 DB에 엑세스 하는 구간은 비동기 처리가 되지 않기 때문에 필연적으로 Blocking이 발생하고 다음 요청이 대기되는 문제를 가진다.

만약 데이터베이스로 MongoDB를 사용한다면 FastAPI의 API 요청을 비동기로 처리할 수 있는 [Motor]()를 사용할 수 있다. Motor는 
non blocking 접근을 지원하는 coroutine 기반의 API를 제공하는 Python Driver이다.


---

MongoDB는 `Bson` 포맷으로 데이터를 저장한다. BSON은 `ObjectId` 와 같이 JSON 형식과 호환되지 않는 독특한 타입을 가지기 때문에 이를   FastAPI가 변환할 수 있도록 해야한다.

```python
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema_(cls, field_schema):
        field_schema.update(type="string")

```

