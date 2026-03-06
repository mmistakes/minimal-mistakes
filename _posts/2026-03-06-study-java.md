---
layout: post
title: "하루 학습: Java에서 예외 처리와 트랜잭션 경계를 실무형으로 설계하기"
date: 2026-03-06 09:40:00 +0900
categories: [java]
tags: [study, java, spring, backend, automation]
---

Java 백엔드에서 장애 대응 품질은 “예외를 어디서 어떻게 처리하느냐”로 크게 갈립니다.

오늘은 Spring 기준으로 예외 처리와 트랜잭션 경계를 실무적으로 정리합니다.

## 왜 중요한가

- **장애 전파 범위 제어**
  예외를 잘못 처리하면 단일 요청 실패가 데이터 불일치로 번질 수 있습니다.

- **운영 가시성 확보**
  에러 코드를 표준화하면 로그/모니터링/알림이 일관돼 원인 파악 시간이 줄어듭니다.

## 핵심 개념

- **Checked vs Unchecked 예외 전략**
  도메인 규칙 위반은 커스텀 RuntimeException으로 통일하면 서비스 계층 코드가 단순해집니다.

- **ControllerAdvice로 응답 표준화**
  예외별 HTTP 상태코드와 메시지 포맷을 중앙에서 통제해야 프론트/모바일 연동이 안정적입니다.

- **트랜잭션 경계는 서비스 계층에**
  `@Transactional`은 컨트롤러가 아니라 유즈케이스 단위 서비스 메서드에 두는 게 유지보수에 유리합니다.

- **롤백 정책 명시**
  기본 RuntimeException 롤백 규칙 외에 비즈니스 예외가 있으면 `rollbackFor`를 명확히 선언합니다.

## 미니 예제

```java
@Service
@RequiredArgsConstructor
public class EmployeeService {
  private final EmployeeRepository employeeRepository;

  @Transactional
  public Long createEmployee(CreateEmployeeCommand cmd) {
    if (employeeRepository.existsByEmail(cmd.email())) {
      throw new DomainException("EMPLOYEE_EMAIL_DUPLICATED");
    }

    Employee employee = Employee.create(cmd.name(), cmd.email());
    employeeRepository.save(employee);
    return employee.getId();
  }
}
```

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(DomainException.class)
  public ResponseEntity<ApiError> handleDomain(DomainException ex) {
    return ResponseEntity.badRequest()
        .body(new ApiError(ex.getCode(), "요청 값을 확인해 주세요."));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleUnknown(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiError("INTERNAL_ERROR", "일시적인 오류가 발생했습니다."));
  }
}
```

## 자주 하는 실수

- **컨트롤러에서 try-catch 남발**
  계층마다 예외를 중복 처리하면 응답 스펙이 깨지고 누락 케이스가 늘어납니다.

- **트랜잭션 내부에서 외부 API 호출**
  DB 락 유지 시간이 길어져 성능과 장애 전파 측면에서 모두 불리합니다.

- **에러 코드 미표준화**
  문자열 메시지로만 처리하면 프론트 분기, 통계, 알림 자동화가 어려워집니다.

## 오늘의 실습 체크리스트

- [ ] 도메인 예외 코드 목록 정리 (`*_NOT_FOUND`, `*_DUPLICATED` 등)
- [ ] `@RestControllerAdvice`로 공통 응답 포맷 통일
- [ ] 핵심 유즈케이스 1개에 `@Transactional` 경계 명확히 적용
- [ ] 운영 로그에 requestId/에러코드/핵심 파라미터 기록
