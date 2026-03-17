---
layout: post
title: "Spring @Autowired 완전 정복: 동작 원리, 우선순위 해석, 실무 패턴과 안티패턴"
date: 2026-03-18 00:45:00 +0900
categories: [java]
tags: [study, java, spring, spring-boot, autowired, dependency-injection, architecture, automation]
---

## 문제 정의

스프링을 어느 정도 사용한 개발자라도 `@Autowired` 관련 이슈를 만나면 생각보다 많은 시간을 소모한다.

대표적으로 아래와 같은 장애/혼란이 반복된다.

- "분명 Bean 등록했는데 왜 `NoSuchBeanDefinitionException`이 나지?"
- "같은 타입 Bean이 2개인데 어떤 게 주입되는 거지?"
- "테스트에서는 되는데 운영에서는 왜 깨지지?"
- "순환 참조(circular dependency)는 왜 갑자기 막혔지?"

이 글은 `@Autowired`를 "그냥 붙이면 되는 어노테이션"으로 보지 않고, **컨테이너 해석 규칙 + 우선순위 + 설계 관점**으로 깊게 정리한다.

---

## 1. @Autowired의 본질: "타입 기반 의존성 해석 요청"

`@Autowired`는 단순 주입 명령이 아니라,

> "스프링 컨테이너야, 이 주입 지점(injection point)에 맞는 Bean을 규칙에 따라 찾아 연결해줘"

라는 요청이다.

즉 핵심은 다음 3가지다.

1. **주입 지점의 타입/메타데이터** (필드/생성자 파라미터/세터 파라미터)
2. **컨테이너에 등록된 후보 Bean 집합**
3. **후보 선택 알고리즘(타입 → Qualifier → Primary → 이름 등)**

문제는 대부분 3번을 명확히 이해하지 못해서 생긴다.

---

## 2. 주입 방식 3종 비교: 생성자 vs 세터 vs 필드

### 2.1 생성자 주입 (권장)

```java
@Service
public class OrderService {

    private final PaymentGateway paymentGateway;
    private final OrderRepository orderRepository;

    public OrderService(PaymentGateway paymentGateway,
                        OrderRepository orderRepository) {
        this.paymentGateway = paymentGateway;
        this.orderRepository = orderRepository;
    }
}
```

장점:

- **불변성(immutable)** 보장 (`final` 가능)
- 의존성이 "필수"임을 타입 수준에서 표현
- 테스트 작성이 쉬움 (생성자로 명시 주입)
- 순환 참조 감지에 유리

스프링 4.3+부터 **생성자가 하나면 `@Autowired` 생략 가능**하다.

---

### 2.2 세터 주입 (선택 의존성/변경 가능 의존성에 한정)

```java
@Service
public class NotificationService {

    private MessageSender sender;

    @Autowired
    public void setSender(MessageSender sender) {
        this.sender = sender;
    }
}
```

장점:

- 선택적 의존성 처리에 유연

단점:

- 객체 생성 후 상태가 바뀔 수 있어 불변성이 깨짐
- 누락 시 런타임 이슈 가능

---

### 2.3 필드 주입 (지양)

```java
@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;
}
```

단점:

- 테스트에서 목 주입이 불편
- 의존성이 숨겨짐 (생성자 시그니처에 드러나지 않음)
- 리플렉션 기반 주입 의존

실무 기준으로는 **생성자 주입 기본 + 예외적으로 세터 주입**이 안전하다.

---

## 3. 후보 Bean 선택 알고리즘 (핵심)

아래 순서로 생각하면 대부분의 주입 이슈를 설명할 수 있다.

### 단계 1) 타입으로 1차 후보군 수집

예: `PaymentGateway` 타입 주입 지점이라면, 해당 타입(하위 타입 포함) Bean들을 모은다.

### 단계 2) `@Qualifier`로 후보군 필터링

```java
@Service
public class CheckoutService {

    private final PaymentGateway paymentGateway;

    public CheckoutService(@Qualifier("kakaoPayGateway") PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }
}
```

`@Qualifier`가 있으면 해당 식별자와 매칭되는 Bean만 남긴다.

### 단계 3) `@Primary` 우선

```java
@Component
@Primary
public class MainPaymentGateway implements PaymentGateway { }

@Component
public class BackupPaymentGateway implements PaymentGateway { }
```

동일 타입 후보가 여러 개일 때 `@Primary`가 기본 선택점이 된다.

### 단계 4) 이름 매칭(보조)

주입 지점 이름(파라미터명/필드명)과 Bean 이름이 일치하면 선택에 도움을 준다.

---

## 4. 다중 Bean 주입 전략: List/Map/ObjectProvider

### 4.1 `List<T>`로 전부 주입

```java
@Service
public class DiscountPolicyDispatcher {

    private final List<DiscountPolicy> policies;

    public DiscountPolicyDispatcher(List<DiscountPolicy> policies) {
        this.policies = policies;
    }
}
```

등록 순서가 필요하면 `@Order` 또는 `Ordered`를 사용한다.

```java
@Component
@Order(1)
class VipDiscountPolicy implements DiscountPolicy { }

@Component
@Order(2)
class SeasonalDiscountPolicy implements DiscountPolicy { }
```

---

### 4.2 `Map<String, T>`로 이름 기반 전략 선택

```java
@Service
public class PaymentRouter {

    private final Map<String, PaymentGateway> gateways;

    public PaymentRouter(Map<String, PaymentGateway> gateways) {
        this.gateways = gateways;
    }

    public PaymentGateway route(String key) {
        return Optional.ofNullable(gateways.get(key))
                .orElseThrow(() -> new IllegalArgumentException("Unknown gateway: " + key));
    }
}
```

이 패턴은 "if-else 지옥"을 줄이는 데 매우 유용하다.

---

### 4.3 `ObjectProvider<T>`로 지연 조회 / optional 조회

```java
@Service
public class ReportService {

    private final ObjectProvider<AuditLogger> auditLoggerProvider;

    public ReportService(ObjectProvider<AuditLogger> auditLoggerProvider) {
        this.auditLoggerProvider = auditLoggerProvider;
    }

    public void generate() {
        AuditLogger logger = auditLoggerProvider.getIfAvailable();
        if (logger != null) {
            logger.log("report generated");
        }
    }
}
```

특징:

- 실제 Bean 조회 시점을 늦출 수 있음
- 후보가 없어도 안전하게 처리 가능

---

## 5. Optional 의존성 처리 패턴

`required=false` 보다 아래 방법이 의도를 명확하게 표현한다.

### 5.1 `Optional<T>`

```java
@Service
public class SearchService {

    private final Optional<SearchMetricsCollector> metricsCollector;

    public SearchService(Optional<SearchMetricsCollector> metricsCollector) {
        this.metricsCollector = metricsCollector;
    }
}
```

### 5.2 `@Nullable`

```java
public SearchService(@Nullable SearchMetricsCollector metricsCollector) {
    this.metricsCollector = metricsCollector;
}
```

### 5.3 `ObjectProvider<T>`

가장 유연한 방식. 런타임 시점에 조회/반복/폴백이 가능.

---

## 6. @Qualifier 심화: 문자열 남용 대신 커스텀 Qualifier

문자열 오타로 인한 런타임 오류를 줄이려면 커스텀 Qualifier를 권장한다.

```java
@Target({ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface InternalApi {
}
```

```java
@Component
@InternalApi
public class InternalUserClient implements UserClient { }

@Component
public class ExternalUserClient implements UserClient { }
```

```java
@Service
public class UserSyncService {

    private final UserClient userClient;

    public UserSyncService(@InternalApi UserClient userClient) {
        this.userClient = userClient;
    }
}
```

장점:

- 의도가 어노테이션 자체로 드러남
- 문자열 오타 리스크 감소
- 리팩토링 안전성 증가

---

## 7. 순환 참조(Circular Dependency)와 @Autowired

### 7.1 전형적인 순환 구조

```java
@Service
public class AService {
    public AService(BService bService) { }
}

@Service
public class BService {
    public BService(AService aService) { }
}
```

생성자 주입에서는 즉시 순환이 드러나며 애플리케이션 시작 실패.

### 7.2 임시 우회책: `@Lazy`

```java
@Service
public class AService {
    public AService(@Lazy BService bService) { }
}
```

하지만 `@Lazy`는 근본 해결이 아니다. 실제 해결은 아래 중 하나다.

- 책임 분리(서비스 경계 재설계)
- 공통 로직을 제3 컴포넌트로 추출
- 이벤트 기반 상호작용으로 결합도 낮추기

---

## 8. @Autowired와 Bean 생명주기

주입이 끝나면 Bean 초기화 단계가 이어진다.

- 생성자 실행
- 의존성 주입
- `@PostConstruct` 실행

즉 `@PostConstruct` 시점에는 의존성이 이미 주입되어 있다.

```java
@Component
public class CacheWarmup {

    private final ProductRepository productRepository;

    public CacheWarmup(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void init() {
        // 의존성 사용 가능
        productRepository.findTop100ByOrderBySalesDesc();
    }
}
```

주의: 초기화 로직이 무거우면 기동 시간 증가 + 장애 위험이 커진다. 필요 시 비동기 워밍업이나 별도 배치로 분리하자.

---

## 9. 테스트 관점: @Autowired가 테스트를 망치는 순간

### 9.1 슬라이스 테스트에서 Bean 누락

`@WebMvcTest`는 웹 계층만 로드한다. 서비스/리포지토리 주입을 기대하면 깨진다.

```java
@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;
}
```

슬라이스 테스트에서는 필요한 의존성을 `@MockBean`으로 명시해야 한다.

### 9.2 통합 테스트에서 다중 Bean 충돌

프로파일/테스트 설정에 따라 같은 타입 Bean이 중복되면 `NoUniqueBeanDefinitionException`이 난다.

해결:

- 테스트 전용 `@Primary` Bean 제공
- `@Qualifier` 명시
- 불필요한 자동 설정 제외

---

## 10. 실무 안티패턴과 개선안

### 안티패턴 A: "일단 필드 주입"

- 증상: 테스트 어려움, 의존성 구조 불투명
- 개선: 생성자 주입으로 전환 + final 필드

### 안티패턴 B: Qualifier 문자열 하드코딩 남발

- 증상: 오타/리팩토링 취약
- 개선: 커스텀 Qualifier

### 안티패턴 C: 서비스가 너무 많은 Bean에 의존

- 증상: 생성자 파라미터 8~12개 이상
- 개선: 도메인 서비스 분리, orchestration 계층 도입

### 안티패턴 D: 순환 참조를 @Lazy로 덮기

- 증상: 구조적 결합도 유지, 장애 추적 어려움
- 개선: 책임 재분배 + 이벤트/포트-어댑터 재설계

---

## 11. 운영 이슈로 연결되는 포인트

`@Autowired`는 컴파일 타임보다 **기동 시점**에 실패가 드러나는 경우가 많다. 그래서 운영 안정성을 위해 아래를 습관화해야 한다.

1. CI에서 컨텍스트 로딩 테스트 포함
2. Bean 충돌 검출 테스트(특히 멀티 모듈)
3. 프로파일별(로컬/스테이징/운영) Bean 구성 차이 점검
4. 설정 기반 Bean(`@ConditionalOn...`) 활성 조건 문서화

---

## 12. 실전 예시: 결제 게이트웨이 멀티 구현

요구사항:

- 기본 결제: `MainPaymentGateway`
- 특정 테넌트는 `PartnerPaymentGateway`
- 장애 시 `FallbackPaymentGateway`

```java
public interface PaymentGateway {
    PaymentResult pay(PaymentCommand command);
}
```

```java
@Component("mainGateway")
@Primary
public class MainPaymentGateway implements PaymentGateway {
    @Override
    public PaymentResult pay(PaymentCommand command) {
        return PaymentResult.success("MAIN-OK");
    }
}

@Component("partnerGateway")
public class PartnerPaymentGateway implements PaymentGateway {
    @Override
    public PaymentResult pay(PaymentCommand command) {
        return PaymentResult.success("PARTNER-OK");
    }
}

@Component("fallbackGateway")
public class FallbackPaymentGateway implements PaymentGateway {
    @Override
    public PaymentResult pay(PaymentCommand command) {
        return PaymentResult.success("FALLBACK-OK");
    }
}
```

```java
@Service
public class TenantAwarePaymentService {

    private final Map<String, PaymentGateway> gatewayMap;

    public TenantAwarePaymentService(Map<String, PaymentGateway> gatewayMap) {
        this.gatewayMap = gatewayMap;
    }

    public PaymentResult pay(String tenantType, PaymentCommand command) {
        PaymentGateway gateway = switch (tenantType) {
            case "PARTNER" -> gatewayMap.get("partnerGateway");
            case "DEFAULT" -> gatewayMap.get("mainGateway");
            default -> gatewayMap.get("fallbackGateway");
        };

        if (gateway == null) {
            throw new IllegalStateException("No gateway found for tenantType=" + tenantType);
        }

        return gateway.pay(command);
    }
}
```

이 구조의 장점:

- 확장 시 구현체 추가가 쉬움
- 조건 분기가 Bean 이름/전략으로 명확화
- 기본값(`@Primary`)과 예외 케이스를 분리 가능

---

## 13. 아키텍처 관점 요약

`@Autowired`는 단순 편의 기능이 아니라 **DI 정책 엔진의 입구**다.

좋은 설계는 아래 특징을 가진다.

- 생성자 주입 기본
- 명시적 의존성(필요 최소)
- 다중 구현체는 Qualifier/전략 패턴으로 구조화
- 순환 참조는 구조를 바꿔 제거
- 테스트/운영 환경에서 Bean 구성 차이를 통제

반대로 주입 규칙을 모르고 개발하면,

- 런타임 주입 실패
- 예기치 않은 Bean 선택
- 테스트 취약성
- 운영 장애 대응 난이도 상승

으로 이어진다.

---

## 14. 오늘의 실무 체크리스트

- [ ] 서비스 계층 필드 주입을 생성자 주입으로 전환했는가?
- [ ] 다중 구현체 주입 지점에 `@Qualifier` 또는 명확한 선택 규칙이 있는가?
- [ ] `@Primary` 사용 이유가 문서화되어 있는가?
- [ ] 순환 참조를 `@Lazy`로 임시 봉합하고 있지 않은가?
- [ ] 슬라이스 테스트에서 필요한 Bean을 `@MockBean`으로 명시했는가?
- [ ] 프로파일별 Bean 등록 차이를 CI에서 검증하는가?

---

## 마무리

`@Autowired`를 깊게 이해하면 DI 오류를 줄이는 수준을 넘어, **서비스 경계/모듈 경계/테스트 가능성**까지 한 번에 개선할 수 있다.

즉, `@Autowired`는 문법이 아니라 설계다. 
오늘 코드베이스에서 "왜 이 Bean이 여기 주입되는지"를 설명할 수 없는 지점부터 정리해보자. 그 지점이 구조 개선의 시작점이다.
