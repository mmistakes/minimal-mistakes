---
layout: post
title: "Python 컨텍스트 매니저(Context Manager) 마스터하기"
date: 2026-03-03 10:07:40 +0900
categories: [python]
tags: [study, python, backend, automation]
---

## 실무에서 왜 중요한가?

파일 처리, 데이터베이스 연결, 락(Lock) 관리 등에서 리소스를 안전하게 획득하고 해제해야 합니다.

컨텍스트 매니저를 모르면 리소스 누수, 예외 발생 시 정리 실패 등의 버그가 발생합니다. 실무 코드에서 필수적인 패턴입니다.

## 핵심 개념

- **with 문의 동작 원리**
  with 문은 `__enter__()` 메서드로 리소스를 획득하고, `__exit__()` 메서드로 정리합니다. 예외 발생 여부와 관계없이 항상 정리 코드가 실행됩니다.

- **__enter__와 __exit__ 메서드**
  `__enter__()`는 with 블록 진입 시 호출되며 값을 반환합니다. `__exit__()`는 블록 종료 시 항상 호출되어 리소스를 정리합니다.

- **contextlib 모듈 활용**
  `@contextmanager` 데코레이터를 사용하면 제너레이터로 간단히 컨텍스트 매니저를 만들 수 있습니다.

- **예외 처리와의 관계**
  `__exit__()` 메서드가 True를 반환하면 예외를 억제할 수 있습니다. False를 반환하면 예외가 전파됩니다.

- **중첩된 컨텍스트 매니저**
  여러 리소스를 동시에 관리할 때 with 문을 중첩하거나 쉼표로 연결할 수 있습니다.

## 실습 예제

### 기본 컨텍스트 매니저 구현

```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        print(f"파일 열기: {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"파일 닫기: {self.filename}")
        if self.file:
            self.file.close()
        return False
```

위 클래스를 사용하는 방법입니다.

```python
with FileManager('test.txt', 'w') as f:
    f.write('Hello, World!')
    print("파일에 쓰는 중...")
```

### contextlib를 사용한 간단한 구현

```python
from contextlib import contextmanager

@contextmanager
def database_connection(db_name):
    print(f"DB 연결: {db_name}")
    connection = f"Connection to {db_name}"
    try:
        yield connection
    finally:
        print(f"DB 종료: {db_name}")
```

사용 예시입니다.

```python
with database_connection('mydb') as conn:
    print(f"쿼리 실행: {conn}")
```

### 여러 리소스 동시 관리

```python
with open('input.txt', 'r') as infile, open('output.txt', 'w') as outfile:
    for line in infile:
        outfile.write(line.upper())
```

## 자주 하는 실수

- **__exit__ 메서드 구현 누락**
  `__enter__`만 구현하고 `__exit__`를 빼먹으면 리소스가 정리되지 않습니다. 항상 쌍으로 구현해야 합니다.

- **예외 발생 시 정리 코드 미실행**
  try-finally 없이 일반 함수로 작성하면 예외 발생 시 정리 코드가 실행되지 않습니다. 컨텍스트 매니저를 사용하면 이 문제를 자동으로 해결합니다.

- **__exit__의 반환값 오해**
  `__exit__`가 True를 반환하면 예외가 억제됩니다. 의도하지 않은 예외 억제로 버그를 숨길 수 있으니 주의하세요.

- **yield 후 예외 처리 누락**
  `@contextmanager` 사용 시 yield 후 finally 블록 없이 정리 코드를 작성하면 예외 발생 시 실행되지 않을 수 있습니다.

## 오늘의 실습 체크리스트

- [ ] 클래스 기반 컨텍스트 매니저 3개 직접 작성하기
- [ ] @contextmanager 데코레이터로 간단한 매니저 만들기
- [ ] 파일 처리 코드에서 with 문 사용하기
- [ ] 여러 리소스를 with 문으로 동시 관리하기
- [ ] 의도적으로 예외를 발생시켜 __exit__이 호출되는지 확인하기
- [ ] 기존 프로젝트에서 try-finally 패턴을 찾아 컨텍스트 매니저로 리팩토링하기
