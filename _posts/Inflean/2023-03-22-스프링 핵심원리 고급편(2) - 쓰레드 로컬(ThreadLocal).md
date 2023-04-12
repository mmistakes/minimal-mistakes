---
categories: "learning"
tag: "inflearn"
toc: true
toc_sticky: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 0. 필드 동기화 - 개발

- 앞서 로그 추적기를 만들면서 다음 로그를 출력할 때 트랜잭션ID 와 level 을 동기화 하는 문제가 있었다. 이 문제를 해결하기 위해 TraceId 를 파라미터로 넘기도록 구현했다.
- 이렇게 해서 동기화는 성공했지만, 로그를 출력하는 모든 메서드에 TraceId 파라미터를 추가해야 하는 문제가 발생했다.
- TraceId 를 파라미터로 넘기지 않고 이 문제를 해결할 수 있도록 새로운 로그 추적기를 만들어본다.

## LogTrace 인터페이스

- LogTrace 인터페이스에는 로그 추적기를 위한 최소한의 기능인 begin() , end() , exception() 를 정의했다. 
- 이제 파라미터를 넘기지 않고 TraceId 를 동기화 할 수 있는 FieldLogTrace 구현체를 만들어보자.

- ```java
  package hello.advanced.trace.logtrace;
  
  import hello.advanced.trace.TraceStatus;
  
  public interface LogTrace {
  
      TraceStatus begin(String message);
  
      void end(TraceStatus status);
  
      void exception(TraceStatus status, Exception e);
  }
  
  ```

## FieldLogTrace

- FieldLogTrace 는 기존에 만들었던 HelloTraceV2 와 거의 같은 기능을 한다. TraceId 를 동기화 하는 부분만 파라미터를 사용하는 것에서 TraceId traceIdHolder 필드를 사용하도록 변경되었다.
- 이제 직전 로그의 TraceId 는 파라미터로 전달되는 것이 아니라 FieldLogTrace 의 필드인 traceIdHolder 에 저장된다

- ```java
  package hello.advanced.trace.logtrace;
  
  import hello.advanced.trace.TraceId;
  import hello.advanced.trace.TraceStatus;
  import lombok.extern.slf4j.Slf4j;
  
  @Slf4j
  public class FieldLogTrace implements LogTrace{
  
      private static final String START_PREFIX = "-->";
      private static final String COMPLETE_PREFIX = "<--";
      private static final String EX_PREFIX = "<X-";
  
      private TraceId traceIdHolder; //traceId 동기화, 동시성 이슈 발생
  
      @Override
      public TraceStatus begin(String message) {
          syncTraceId();
          TraceId traceId = traceIdHolder;
          Long startTimeMs = System.currentTimeMillis();
          log.info("[{}] {}{}", traceId.getId(), addSpace(START_PREFIX, traceId.getLevel()), message);
          return new TraceStatus(traceId, startTimeMs, message);
      }
  
      private void syncTraceId(){
          if (traceIdHolder == null) {
              traceIdHolder = new TraceId();
          } else {
              traceIdHolder = traceIdHolder.createNextId();
          }
      }
  
      @Override
      public void end(TraceStatus status) {
          complete(status, null);
      }
  
      @Override
      public void exception(TraceStatus status, Exception e) {
          complete(status, e);
      }
  
      private void complete(TraceStatus status, Exception e) {
          Long stopTimeMs = System.currentTimeMillis();
          long resultTimeMs = stopTimeMs - status.getStartTimeMs();
          TraceId traceId = status.getTraceId();
          if (e == null) {
              log.info("[{}] {}{} time={}ms", traceId.getId(),
                      addSpace(COMPLETE_PREFIX, traceId.getLevel()), status.getMessage(),
                      resultTimeMs);
          } else {
              log.info("[{}] {}{} time={}ms ex={}", traceId.getId(),
                      addSpace(EX_PREFIX, traceId.getLevel()), status.getMessage(), resultTimeMs,
                      e.toString());
          }
  
          releaseTraceId();
      }
  
      private void releaseTraceId() {
          if (traceIdHolder.isFirstLevel()) {
              traceIdHolder = null; //destroy
          }else{
              traceIdHolder = traceIdHolder.createPreviousId();
          }
      }
  
      private static String addSpace(String prefix, int level) {
          StringBuilder sb = new StringBuilder();
          for (int i = 0; i < level; i++) {
              sb.append( (i == level - 1) ? "|" + prefix : "| ");
          }
          return sb.toString();
      }
  }
  ```

### syncTraceId()

- ```java
  private void syncTraceId(){
      if (traceIdHolder == null) {
          traceIdHolder = new TraceId();
      } else {
          traceIdHolder = traceIdHolder.createNextId();
      }
  }
  ```

- **traceIdHolder 를 모든 컴포넌트가 같이 쓴다고 생각하면 된다.**

  - 하지만 동시성 이슈가 발생한다..

- TraceId 를 새로 만들거나 앞선 로그의 TraceId 를 참고해서 동기화하고, level 도 증가한다. 최초 호출이면 TraceId 를 새로 만든다. 

- 직전 로그가 있으면 해당 로그의 TraceId 를 참고해서 동기화하고, level 도 하나 증가한다. 

- 결과를 traceIdHolder 에 보관한다.

### releaseTraceId()

- ```java
  private void releaseTraceId() {
      if (traceIdHolder.isFirstLevel()) {
          traceIdHolder = null; //destroy
      }else{
          traceIdHolder = traceIdHolder.createPreviousId();
      }
  }
  ```

- 메서드를 추가로 호출할 때는 level 이 하나 증가해야 하지만, 메서드 호출이 끝나면 level 이 하나 감소해야 한다. 

- releaseTraceId() 는 level 을 하나 감소한다. 

- 만약 최초 호출( level==0 )이면 내부에서 관리하는 traceId 를 제거한다.

## FieldLogTraceTest

- ```java
  package hello.advanced.trace.hellotrace;
  
  import hello.advanced.trace.TraceStatus;
  import org.junit.jupiter.api.Test;
  
  public class HelloTraceV2Test {
  
      @Test
      void begin_end(){
          HelloTraceV2 trace = new HelloTraceV2();
          TraceStatus status1 = trace.begin("hello1");
          TraceStatus status2 = trace.beginSync(status1.getTraceId(), "hello2");
          trace.end(status2);
          trace.end(status1);
      }
  
      @Test
      void begin_exception(){
          HelloTraceV2 trace = new HelloTraceV2();
          TraceStatus status1 = trace.begin("hello1");
          TraceStatus status2 = trace.beginSync(status1.getTraceId(), "hello2");
  
          trace.exception(status2, new IllegalStateException());
          trace.exception(status1, new IllegalStateException());
      }
  }
  ```

### begin_end_level2() - 실행 결과

```
[ed72b67d] hello1
[ed72b67d] |-->hello2
[ed72b67d] |<--hello2 time=2ms
[ed72b67d] hello1 time=6ms
```

### begin_exception_level2() - 실행 결과

```
[59770788] hello
[59770788] |-->hello2
[59770788] |<X-hello2 time=3ms ex=java.lang.IllegalStateException
[59770788] hello time=8ms ex=java.lang.IllegalStateException
```

실행 결과를 보면 트랜잭션ID 도 동일하게 나오고, level 을 통한 깊이도 잘 표현된다. FieldLogTrace.traceIdHolder 필드를 사용해서 TraceId 가 잘 동기화 되는 것을 확인할 수 있다. 이제 불필요하게 TraceId 를 파라미터로 전달하지 않아도 되고, 애플리케이션의 메서드 파라미터도 변경하지 않아도 된다.

# 1. 필드 동기화 - 적용

## LogTraceConfig

- FieldLogTrace 를 수동으로 스프링 빈으로 등록하자. 수동으로 등록하면 향후 구현체를 편리하게 변경할 수 있다는 장점이 있다.

- ```java
  package hello.advanced;
  
  import ...;
  
  @Configuration
  public class LogTraceConfig {
  
      @Bean
      public LogTrace logTrace(){
          //싱글톤으로 등록된다.
          return new FieldLogTrace();
      }
  }
  
  ```

## v2 -> v3 복사

1. 코드 내부 의존관계를 클래스를 V3으로 변경
2. HelloTraceV2 -> LogTrace 인터페이스 사용 주의!
3. TraceId traceId 파라미터를 모두 제거
4. beginSync() begin 으로 사용하도록 변경

### OrderControllerV3 

```java
package hello.advanced.app.v3;

import hello.advanced.trace.TraceStatus;
import hello.advanced.trace.hellotrace.HelloTraceV2;
import hello.advanced.trace.logtrace.LogTrace;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderControllerV3 {

    private final OrderServiceV3 orderService;
    private final LogTrace trace;

    @GetMapping("/v3/request")
    public String request(String itemId) {

        TraceStatus status = null;

        try{
            status = trace.begin("OrderController.request()");
            orderService.orderItem(itemId);
            trace.end(status);
            return "ok";
        }catch (Exception e){
            trace.exception(status, e);
            throw e; //예외를 꼭 다시 던져줘야 한다.
        }
    }
}
```

- service, repository 도 똑같다.

## 실행

### 정상 실행 로그

- 정상 실행 : `http://localhost:8080/v3/request?itemId=hello`

- ```
  [f8477cfc] OrderController.request()
  [f8477cfc] |-->OrderService.orderItem()
  [f8477cfc] | |-->OrderRepository.save()
  [f8477cfc] | |<--OrderRepository.save() time=1004ms
  [f8477cfc] |<--OrderService.orderItem() time=1006ms
  [f8477cfc] OrderController.request() time=1007ms
  ```

### 예외 실행 로그

- 예외 실행 : `http://localhost:8080/v3/request?itemId=ex`

- ```
  [c426fcfc] OrderController.request()
  [c426fcfc] |-->OrderService.orderItem()
  [c426fcfc] | |-->OrderRepository.save()
  [c426fcfc] | |<X-OrderRepository.save() time=0ms ex=java.lang.IllegalStateException: 예외 발생!
  [c426fcfc] |<X-OrderService.orderItem() time=7ms ex=java.lang.IllegalStateException: 예외 발생!
  [c426fcfc] OrderController.request() time=7ms ex=java.lang.IllegalStateException: 예외 발생!
  ```

# 2. 필드 동기화 - 동시성 문제

- 잘 만든 로그 추적기를 실제 서비스에 배포했다 가정해보자. 테스트 할 때는 문제가 없는 것 처럼 보인다**. 사실 직전에 만든 FieldLogTrace 는 심각한 동시성 문제를 가지고 있다.**

## 동시성 문제 확인

- 다음 로직을 1초 안에 2번 실행해보자.
  - `http://localhost:8080/v3/request?itemId=hello`

### 기대하는 결과

- ```
  [nio-8080-exec-3] [52808e46] OrderController.request()
  [nio-8080-exec-3] [52808e46] |-->OrderService.orderItem()
  [nio-8080-exec-3] [52808e46] | |-->OrderRepository.save()
  [nio-8080-exec-4] [4568423c] OrderController.request()
  [nio-8080-exec-4] [4568423c] |-->OrderService.orderItem()
  [nio-8080-exec-4] [4568423c] | |-->OrderRepository.save()
  [nio-8080-exec-3] [52808e46] | |<--OrderRepository.save() time=1001ms
  [nio-8080-exec-3] [52808e46] |<--OrderService.orderItem() time=1001ms
  [nio-8080-exec-3] [52808e46] OrderController.request() time=1003ms
  [nio-8080-exec-4] [4568423c] | |<--OrderRepository.save() time=1000ms
  [nio-8080-exec-4] [4568423c] |<--OrderService.orderItem() time=1001ms
  [nio-8080-exec-4] [4568423c] OrderController.request() time=1001ms
  ```

- 동시에 여러 사용자가 요청하면 여러 쓰레드가 동시에 애플리케이션 로직을 호출하게 된다. 따라서 로그는 이렇게 섞여서 출력된다

### 실제 결과

- ```
  [nio-8080-exec-3] [aaaaaaaa] OrderController.request()
  [nio-8080-exec-3] [aaaaaaaa] |-->OrderService.orderItem()
  [nio-8080-exec-3] [aaaaaaaa] | |-->OrderRepository.save()
  [nio-8080-exec-4] [aaaaaaaa] | | |-->OrderController.request()
  [nio-8080-exec-4] [aaaaaaaa] | | | |-->OrderService.orderItem()
  [nio-8080-exec-4] [aaaaaaaa] | | | | |-->OrderRepository.save()
  [nio-8080-exec-3] [aaaaaaaa] | |<--OrderRepository.save() time=1005ms
  [nio-8080-exec-3] [aaaaaaaa] |<--OrderService.orderItem() time=1005ms
  [nio-8080-exec-3] [aaaaaaaa] OrderController.request() time=1005ms
  [nio-8080-exec-4] [aaaaaaaa] | | | | |<--OrderRepository.save() time=1005ms
  [nio-8080-exec-4] [aaaaaaaa] | | | |<--OrderService.orderItem() time=1005ms
  [nio-8080-exec-4] [aaaaaaaa] | | |<--OrderController.request() time=1005ms
  ```

  - 기대한 것과 전혀 다른 문제가 발생한다. 트랜잭션ID 도 동일하고, level 도 뭔가 많이 꼬인 것 같다

## 원인

사실 이 문제는 동시성 문제이다. F**ieldLogTrace 는 싱글톤으로 등록된 스프링 빈이다. 이 객체의 인스턴스가 애플리케이션에 딱 1 존재한다는 뜻이다.** 이렇게 하나만 있는 인스턴스의 FieldLogTrace.traceIdHolder 필드를 여러 쓰레드가 동시에 접근하기 때문에 문제가 발생한다. 실무에서 한번 나타나면 개발자를 가장 괴롭히는 문제도 바로 이러한 동시성 문제이다.

# 3. 동시성 문제 - 예제 코드

- 동시성 문제가 어떻게 발생하는지 단순화해서 알아보자.

## FieldService

- 테스트 코드(src/test)에 위치한다.

- ```java
  package hello.advanced.trace.threadlocal.code;
  
  import lombok.extern.slf4j.Slf4j;
  
  @Slf4j
  public class FieldService {
  
      private String nameStore;
  
      public String logic(String name){
          log.info("저장 name ={} --> nameStore={}", name, nameStore);
          nameStore = name;
          sleep(1000);
          log.info("조회 nameStore={}", nameStore);
          return nameStore;
      }
  
      private void sleep(int millis) {
          try {
              Thread.sleep(millis);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      }
  }
  ```

  - 매우 단순한 로직이다. 파라미터로 넘어온 name 을 필드인 nameStore 에 저장한다. 그리고 1초간 쉰 다음 필드에 저장된 nameStore 를 반환한다.

## FieldServiceTest

- ```java
  package hello.advanced.trace.threadlocal;
  
  import hello.advanced.trace.threadlocal.code.FieldService;
  import lombok.extern.slf4j.Slf4j;
  import org.junit.jupiter.api.Test;
  
  
  @Slf4j
  public class FieldServiceTest {
  
      private FieldService fieldService = new FieldService();
  
      @Test
      void field(){
          log.info("main start");
  
          Runnable userA = () ->{
              fieldService.logic("userA");
          };
          Runnable userB = () ->{
              fieldService.logic("userB");
          };
  
          Thread threadA = new Thread(userA);
          threadA.setName("thread-A");
          Thread threadB = new Thread(userB);
          threadB.setName("thread-A");
  
          //runnable 안의 로직 실행
          threadA.start();
          sleep(2000); //A 가 완전히 끝나고 B 가 실행하므로 동시성 이슈 x
          threadB.start();
          sleep(2000); // 로그 출력을 위해 메인 쓰레드 종료 대기
          log.info("main exit");
  
      }
  
      private void sleep(int millis) {
          try {
              Thread.sleep(millis);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      }
  }
  ```

### 실행 결과 (동시성 이슈 x)

- ```
  [Test worker] main start
  [Thread-A] 저장 name=userA -> nameStore=null
  [Thread-A] 조회 nameStore=userA
  [Thread-B] 저장 name=userB -> nameStore=userA
  [Thread-B] 조회 nameStore=userB
  [Test worker] main exit
  ```

## 동시성 문제 발생 코드

- 이번에는 FieldServiceTest ㅇ[ sleep(100) 을 설정해서 thread-A 의 작업이 끝나기 전에 thread-B 가 실행되도록 해보자.
- 참고로 FieldService.logic() 메서드는 내부에 sleep(1000) 으로 1초의 지연이 있다. 따라서 1초 이후에 호출하면 순서대로 실행할 수 있다. 다음에 설정할 100(ms)는 0.1초이기 때문에 thread-A 의 작업이 끝나기 전에 thread-B 가 실행된다.

### 실행 결과

- ```
  [Test worker] main start
  [Thread-A] 저장 name=userA -> nameStore=null
  [Thread-B] 저장 name=userB -> nameStore=userA
  [Thread-A] 조회 nameStore=userB
  [Thread-B] 조회 nameStore=userB
  [Test worker] main exit
  ```

  - 실행 결과를 보자. 저장하는 부분은 문제가 없다. 문제는 조회하는 부분에서 발생한다.

### 실행 순서

1. 먼저 thread-A 가 userA 값을 nameStore 에 보관한다.
2. 0.1초 이후에 thread-B 가 userB 의 값을 nameStore 에 보관한다. 기존에 nameStore 에 보관되어 있던 userA 값은 제거되고 userB 값이 저장된다.
3. thread-A 의 호출이 끝나면서 nameStore 의 결과를 반환받는데, 이때 nameStore 는 앞의 2번에서 userB 의 값으로 대체되었다. 따라서 기대했던 userA 의 값이 아니라 userB 의 값이 반환된다.
4. thread-B 의 호출이 끝나면서 nameStore 의 결과인 userB 를 반환받는다.

![image-20230322124451857](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322124451857.png)

### 동시성 문제

결과적으로 Thread-A 입장에서는 저장한 데이터와 조회한 데이터가 다른 문제가 발생한다. 이처럼 여러 쓰레드가 동시에 같은 인스턴스의 필드 값을 변경하면서 발생하는 문제를 동시성 문제라 한다. 이런 동시성 문제는 여러 쓰레드가 같은 인스턴스의 필드에 접근해야 하기 때문에 트래픽이 적은 상황에서는 확률상 잘 나타나지 않고, 트래픽이 점점 많아질 수 록 자주 발생한다. 특히 스프링 빈 처럼 싱글톤 객체의 필드를 변경하며 사용할 때 이러한 동시성 문제를 조심해야 한다.

### 참고

> 이런 동시성 문제는 지역 변수에서는 발생하지 않는다. 지역 변수는 쓰레드마다 각각 다른 메모리 영역이 할당된다. 동시성 문제가 발생하는 곳은 같은 인스턴스의 필드(주로 싱글톤에서 자주 발생), 또는 static 같은 공용 필드에 접근할 때 발생한다. 동시성 문제는 값을 읽기만 하면 발생하지 않는다. 어디선가 값을 변경하기 때문에 발생한다.

그렇다면 지금처럼 싱글톤 객체의 필드를 사용하면서 동시성 문제를 해결하려면 어떻게 해야할까? 다시 파라미터를 전달하는 방식으로 돌아가야 할까? 이럴 때 사용하는 것이 바로 쓰레드 로컬이다.

## 4. ThreadLocal - 소개

- 쓰레드 로컬은 해당 쓰레드만 접근할 수 있는 특별한 저장소를 말한다. 쉽게 이야기해서 물건 보관 창구를 떠올리면 된다. 여러 사람이 같은 물건 보관 창구를 사용하더라도 창구 직원은 사용자를 인식해서 사용자별로 확실하게 물건을 구분해준다.

### 쓰레드 로컬

- 쓰레드 로컬을 사용하면 각 쓰레드마다 별도의 내부 저장소를 제공한다. 따라서 같은 인스턴스의 쓰레드 로컬 필드에 접근해도 문제 없다.

1. thread-A 가 userA 라는 값을 저장하면 쓰레드 로컬은 thread-A 전용 보관소에 데이터를 안전하게 보관한다.
   - ![image-20230322133246298](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322133246298.png)
2. thread-B 가 userB 라는 값을 저장하면 쓰레드 로컬은 thread-B 전용 보관소에 데이터를 안전하게 보관한다.
   - ![image-20230322133258250](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322133258250.png)
3. 쓰레드 로컬을 통해서 데이터를 조회할 때도 thread-A 가 조회하면 쓰레드 로컬은 thread-A 전용 보관소에서 userA 데이터를 반환해준다. 물론 thread-B 가 조회하면 thread-B 전용 보관소에서 userB 데이터를 반환해준다.
   - ![image-20230322133309360](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322133309360.png)

*자바는 언어차원에서 쓰레드 로컬을 지원하기 위한 java.lang.ThreadLocal 클래스를 제공한다.*

# 5. ThreadLocal - 예제 코드

## ThreadLocalService (src/test)

- ```java
  package hello.advanced.trace.threadlocal.code;
  
  import lombok.extern.slf4j.Slf4j;
  
  @Slf4j
  public class ThreadLocalService {
  
      private ThreadLocal<String> nameStore = new ThreadLocal<>();
  
      public String logic(String name){
          log.info("저장 name ={} --> nameStore={}", name, nameStore.get());
          nameStore.set(name);
          sleep(1000);
          log.info("조회 nameStore={}", nameStore.get());
          return nameStore.get();
      }
  
      private void sleep(int millis) {
          try {
              Thread.sleep(millis);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      }
  }
  ```

  - 기존에 있던 FieldService 와 거의 같은 코드인데, nameStore 필드가 일반 String 타입에서 ThreadLocal 을 사용하도록 변경되었다.
  - **ThreadLocal 사용법**
    -  저장: ThreadLocal.set(xxx) 
    - 값 조회: ThreadLocal.get() 
    - 값 제거: ThreadLocal.remove()

*주의 : 해당 쓰레드가 쓰레드 로컬을 모두 사용하고 나면 ThreadLocal.remove() 를 호출해서 쓰레드 로컬에 저장된 값을 제거해주어야 한다.(나중에 적용)*

## ThreadLocalServiceTest

- service 에 ThreadLocalService 적

- ```java
  package hello.advanced.trace.threadlocal;
  
  import hello.advanced.trace.threadlocal.code.FieldService;
  import hello.advanced.trace.threadlocal.code.ThreadLocalService;
  import lombok.extern.slf4j.Slf4j;
  import org.junit.jupiter.api.Test;
  
  
  @Slf4j
  public class ThreadLocalServiceTest {
  
      private ThreadLocalService service = new ThreadLocalService();
  
      @Test
      void field(){
          log.info("main start");
  
          Runnable userA = () -> service.logic("userA");
          Runnable userB = () -> service.logic("userB");
  
          Thread threadA = new Thread(userA);
          threadA.setName("thread-A");
          Thread threadB = new Thread(userB);
          threadB.setName("thread-A");
  
          //runnable 안의 로직 실행
          threadA.start();
          sleep(100); // 동시성 이슈 발생 가능 지점
          threadB.start();
          sleep(2000); 
          log.info("main exit");
  
      }
  
      private void sleep(int millis) {
          try {
              Thread.sleep(millis);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      }
  }
  ```

### 실행 결과

- ```java
  [Test worker] main start
  [Thread-A] 저장 name=userA -> nameStore=null
  [Thread-B] 저장 name=userB -> nameStore=null
  [Thread-A] 조회 nameStore=userA
  [Thread-B] 조회 nameStore=userB
  [Test worker] main exit
  ```

# 6. 쓰레드 로컬 동기화 - 개발

- FieldLogTrace 에서 발생했던 동시성 문제를 ThreadLocal 로 해결해보자. TraceId traceIdHolder 필드를 쓰레드 로컬을 사용하도록 ThreadLocal traceIdHolder 로 변경하면 된다.

## ThreadLocalLogTrace

- 필드 대신에 쓰레드 로컬을 사용해서 데이터를 동기화하는 ThreadLocalLogTrace 를 새로 만들자.

- ```java
  package hello.advanced.trace.logtrace;
  
  import hello.advanced.trace.TraceId;
  import hello.advanced.trace.TraceStatus;
  import lombok.extern.slf4j.Slf4j;
  
  @Slf4j
  public class ThreadLocalLogTrace implements LogTrace{
  
      private static final String START_PREFIX = "-->";
      private static final String COMPLETE_PREFIX = "<--";
      private static final String EX_PREFIX = "<X-";
  
      private ThreadLocal<TraceId> traceIdHolder = new ThreadLocal<>();
  //    private TraceId traceIdHolder; //traceId 동기화, 동시성 이슈 발생
  
      @Override
      public TraceStatus begin(String message) {
          syncTraceId();
          TraceId traceId = traceIdHolder.get();
          Long startTimeMs = System.currentTimeMillis();
          log.info("[{}] {}{}", traceId.getId(), addSpace(START_PREFIX, traceId.getLevel()), message);
          return new TraceStatus(traceId, startTimeMs, message);
      }
  
      private void syncTraceId(){
          TraceId traceId = traceIdHolder.get();
          if (traceId == null) {
              traceIdHolder.set(new TraceId());
          } else {
              traceIdHolder.set(traceId.createNextId());
          }
      }
  
      @Override
      public void end(TraceStatus status) {
          complete(status, null);
      }
  
      @Override
      public void exception(TraceStatus status, Exception e) {
          complete(status, e);
      }
  
      private void complete(TraceStatus status, Exception e) {
          Long stopTimeMs = System.currentTimeMillis();
          long resultTimeMs = stopTimeMs - status.getStartTimeMs();
          TraceId traceId = status.getTraceId();
          if (e == null) {
              log.info("[{}] {}{} time={}ms", traceId.getId(),
                      addSpace(COMPLETE_PREFIX, traceId.getLevel()), status.getMessage(),
                      resultTimeMs);
          } else {
              log.info("[{}] {}{} time={}ms ex={}", traceId.getId(),
                      addSpace(EX_PREFIX, traceId.getLevel()), status.getMessage(), resultTimeMs,
                      e.toString());
          }
  
          releaseTraceId();
      }
  
      private void releaseTraceId() {
          TraceId traceId = traceIdHolder.get();
          if (traceId.isFirstLevel()) {
              traceIdHolder.remove(); //destroy
          }else{
              traceIdHolder.set(traceId.createPreviousId());
          }
      }
  
      private static String addSpace(String prefix, int level) {
          StringBuilder sb = new StringBuilder();
          for (int i = 0; i < level; i++) {
              sb.append( (i == level - 1) ? "|" + prefix : "| ");
          }
          return sb.toString();
      }
  }
  ```

- traceIdHolder 가 필드에서 ThreadLocal 로 변경되었다. 따라서 값을 저장할 때는 set(..) 을 사용하고, 값을 조회할 때는 get() 을 사용한다.

### ThreadLocal.remove() (releaseTraceId())

- 추가로 쓰레드 로컬을 모두 사용하고 나면 꼭 ThreadLocal.remove() 를 호출해서 쓰레드 로컬에 저장된 값을 제거해주어야 한다. 
- 그래서 traceId.isFirstLevel() ( level==0 )인 경우 ThreadLocal.remove() 를 호출해서 쓰레드 로컬에 저장된 값을 제거해준다.

### 오류 노트

- ```java
   private void syncTraceId(){
      TraceId traceId = traceIdHolder.get();
      if (traceIdHolder == null) {
          traceIdHolder.set(new TraceId());
      } else {
          traceIdHolder.set(traceId.createNextId());
      }
  }
  ```

  - 위 코드에서 틀린 점은 `traceIdHolder == null` 이 부분이다.
  - traceIdHolder 는 ThreadLocal 클래스이고, 이미 전역변수로 new ThreadLocal<>(); 로 생성되었다.
  - tradeId 보유 여부를 확인하는 것이므로 `traceId == null` 이나, `traceIdHolder.get() == null` 이 맞다.

# 7. 쓰레드 로컬 동기화 - 적용

## LogTraceConfig - 수정

- 동시성 문제가 있는 FieldLogTrace 대신에 문제를 해결한 ThreadLocalLogTrace 를 스프링 빈으로 등록하자.

- ```java
  package hello.advanced;
  
  import hello.advanced.trace.logtrace.FieldLogTrace;
  import hello.advanced.trace.logtrace.LogTrace;
  import hello.advanced.trace.logtrace.ThreadLocalLogTrace;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  
  @Configuration
  public class LogTraceConfig {
  
      @Bean
      public LogTrace logTrace(){
          return new ThreadLocalLogTrace();
      }
  }
  ```

## 실행

- `http://localhost:8080/v3/request?itemId=e`

- ```java
  [nio-8080-exec-3] [52808e46] OrderController.request()
  [nio-8080-exec-3] [52808e46] |-->OrderService.orderItem()
  [nio-8080-exec-3] [52808e46] | |-->OrderRepository.save()
  [nio-8080-exec-4] [4568423c] OrderController.request()
  [nio-8080-exec-4] [4568423c] |-->OrderService.orderItem()
  [nio-8080-exec-4] [4568423c] | |-->OrderRepository.save()
  [nio-8080-exec-3] [52808e46] | |<--OrderRepository.save() time=1001ms
  [nio-8080-exec-3] [52808e46] |<--OrderService.orderItem() time=1001ms
  [nio-8080-exec-3] [52808e46] OrderController.request() time=1003ms
  [nio-8080-exec-4] [4568423c] | |<--OrderRepository.save() time=1000ms
  [nio-8080-exec-4] [4568423c] |<--OrderService.orderItem() time=1001ms
  [nio-8080-exec-4] [4568423c] OrderController.request() time=1001ms
  ```

  - 로그를 직접 분리해서 확인해보면 각각의 쓰레드 nio-8080-exec-3 , nio-8080-exec-4 별로 로그가 정확하게 나누어 진 것을 확인할 수 있다.

# 8. 쓰레드 로컬 - 주의사항

- 쓰레드 로컬의 값을 사용 후 제거하지 않고 그냥 두면 WAS(톰캣)처럼 쓰레드 풀을 사용하는 경우에 심각한 문제가 발생할 수 있다. 다음 예시를 통해서 알아보자.

## 사용자A 저장 요청

![image-20230322141124721](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322141124721.png)

1. 사용자A가 저장 HTTP를 요청했다.
2. WAS는 쓰레드 풀에서 쓰레드를 하나 조회한다. 
3. 쓰레드 thread-A 가 할당되었다.
4. thread-A 는 사용자A 의 데이터를 쓰레드 로컬에 저장한다. 
5. 쓰레드 로컬의 thread-A 전용 보관소에 사용자A 데이터를 보관한다.

## 사용자A 저장 요청 종료

![image-20230322141151659](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322141151659.png)

1. 사용자A의 HTTP 응답이 끝난다. 

2. WAS는 사용이 끝난 thread-A 를 쓰레드 풀에 반환한다. 쓰레드를 생성하는 비용은 비싸기 때문에 쓰레드를 제거하지 않고, 보통 쓰레드 풀을 통해서 쓰레드를 재사용한다. 

3. thread-A 는 쓰레드풀에 아직 살아있다. 따라서 쓰레드 로컬의 thread-A 전용 보관소에 사용자A 데이터도 함께 살아있게 된다. 

   

## 사용자B 조회 요청

![image-20230322141230307](../images/2023-03-22-스프링 핵심원리 고급편(2) - 쓰레드 로컬(ThreadLocal)/image-20230322141230307.png)

1. 사용자B가 조회를 위한 새로운 HTTP 요청을 한다. 
2. WAS는 쓰레드 풀에서 쓰레드를 하나 조회한다.
3. 쓰레드 thread-A 가 할당되었다. (물론 다른 쓰레드가 할당될 수 도 있다.) 
4. 이번에는 조회하는 요청이다. thread-A 는 쓰레드 로컬에서 데이터를 조회한다. 
5. 쓰레드 로컬은 thread-A 전용 보관소에 있는 사용자A 값을 반환한다.
6. 결과적으로 사용자A 값이 반환된다. 
7. 사용자B는 사용자A의 정보를 조회하게 된다.

결과적으로 사용자B는 사용자A의 데이터를 확인하게 되는 심각한 문제가 발생하게 된다. **이런 문제를 예방하려면 사용자A의 요청이 끝날 때 쓰레드 로컬의 값을 ThreadLocal.remove() 를 통해서 꼭 제거해야 한다.**

