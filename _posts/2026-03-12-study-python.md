---
layout: post
title: "Python 컨텍스트 매니저(Context Manager) 마스터하기"
date: 2026-03-12 09:59:31 +0900
categories: [python]
tags: [study, python, backend, automation]
---

## 실무에서 중요한 이유

파일, 데이터베이스 연결, 락(Lock) 같은 리소스를 안전하게 관리하는 것은 프로덕션 코드의 핵심입니다.

컨텍스트 매니저를 모르면 리소스 누수, 예외 발생 시 정리 실패 같은 버그가 발생합니다.

## 핵심 개념

- **with 문의 역할**
  자동으로 리소스를 획득하고 해제하는 구문입니다. try-finally를 깔끔하게 대체합니다.

- **__enter__와 __exit__ 메서드**
  with 블록 진입 시 __enter__가 실행되고, 블록 종료 시 __exit__가 항상 실행됩니다.

- **예외 처리 자동화**
  __exit__는 예외 발생 여부와 관계없이 실행되어 리소스 정리를 보장합니다.

- **contextlib 모듈**
  @contextmanager 데코레이터로 간단하게 컨텍스트 매니저를 만들 수 있습니다.

- **중첩 컨텍스트**
  여러 리소스를 동시에 관리할 때 with 문을 여러 개 사용할 수 있습니다.

## 실습 예제

### 기본 컨텍스트 매니저 클래스

```python
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None
    
    def __enter__(self):
        print(f"[연결] {self.db_name} 데이터베이스 연결 중...")
        self.connection = f"Connection to {self.db_name}"
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"[정리] {self.db_name} 연결 종료")
        self.connection = None
        return False
```

### 사용 예시

```python
with DatabaseConnection("myapp_db") as conn:
    print(f"쿼리 실행: {conn}")
    # 블록을 벗어나면 자동으로 __exit__ 호출
```

### contextlib를 사용한 간단한 방식

```python
from contextlib import contextmanager

@contextmanager
def file_handler(filename, mode):
    print(f"파일 열기: {filename}")
    f = open(filename, mode)
    try:
        yield f
    finally:
        print(f"파일 닫기: {filename}")
        f.close()
```

### 파일 처리 예제

```python
with file_handler("data.txt", "w") as f:
    f.write("Hello, World!")
# 블록 종료 후 자동으로 파일이 닫힙니다
```

### 예외 처리 예제

```python
class SafeResource:
    def __enter__(self):
        print("리소스 획득")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("리소스 정리")
        if exc_type is not None:
            print(f"예외 발생: {exc_type.__name__}")
        return False  # 예외를 전파합니다

with SafeResource():
    print("작업 수행")
    # raise ValueError("테스트 에러")  # 주석 해제하면 예외 발생
```

## 자주 하는 실수

- **__exit__에서 리소스 정리 누락**
  __exit__는 반드시 호출되므로 여기서 파일 닫기, 연결 해제 등을 해야 합니다.

- **예외를 무시하기**
  __exit__에서 True를 반환하면 예외가 억제됩니다. 의도하지 않은 동작을 피하려면 False를 반환하세요.

- **with 문 없이 직접 __enter__ 호출**
  __enter__만 호출하고 __exit__를 호출하지 않으면 리소스 누수가 발생합니다.

- **중첩 컨텍스트에서 순서 무시**
  여러 리소스를 사용할 때 획득 순서와 해제 순서를 고려해야 합니다.

- **contextlib.contextmanager에서 yield 후 정리 누락**
  yield 다음의 finally 블록에서 반드시 리소스를 정리하세요.

## 오늘의 실습 체크리스트

- [ ] __enter__와 __exit__ 메서드의 역할 이해하기
- [ ] 간단한 파일 처리 컨텍스트 매니저 직접 작성하기
- [ ] @contextmanager 데코레이터로 함수형 컨텍스트 매니저 만들기
- [ ] 예외 발생 시에도 리소스가 정리되는지 확인하기
- [ ] 중첩된 with 문으로 여러 리소스 관리해보기
- [ ] 기존 코드에서 try-finally를 with 문으로 리팩토링하기
