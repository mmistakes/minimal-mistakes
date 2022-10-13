---
layout: single
title: "[Spring] TDD"
excerpt : "Spring에서의 TDD방식"
categories: spring
---

---
## 테스트 코드는 어떻게 짜야할까?

TDD에서는 실제 개발코드보다 테스트 코드를 먼저 작성한다. 

왜냐? 개발된 코드를 테스트하는 것이 훨씬 어렵기 때문이다. 

테스트 코드를 짤 때 우리가 의문이 드는 점이 아주 많다. ``어떤 코드에 대해서 테스트 코드를 짜야할까?``, ``DB연결은 어떻게 테스트하지`` 등 수많은 고려사항들을 마주칠 것이고 이로 인해 머리가 아프다. 

여기 글에서는 Spring에서 TDD방식을 사용할 때 어떤 것을 사용하면 좋을 지에 대해 설명하겠다. 

---
## Java 단위테스트 작성

### [필요한 라이브러리]
 - Junit5 : 자바 단위 테스트를 위한 테스팅 프레임워크
 - AssertJ : 자바 테스트를 돕기 위해 다양한 문법을 지원하는 라이브러리 

### [given-when-then패턴]
단위 테스트의 패턴 중 하나로 1개의 단위 테스트를 3가지 단계로 나누어 처리하는 패턴
- given(준비) : 어떠한 데이터가 준비되었을 때
- when(실행) : 어떠한 함수를 실행하면
- then(검증) : 어떠한 결과가 나와야 한다. 



---
## Mockito 소개 및 사용법 

### [Mockito란?]
이는 **<span style = "color:red">개발자가 동작을 직접 제어할 수 있는 가짜(Mock) 객체를 지원하는 테스트 프레임 워크</span>** 이다. Spring에서는 여러 객체들 간의 의존성이 생기는데 이러한 의존성은 단위 테스트 작성을 어렵게 만든다. 이를 위해 Mockito 라이브러리를 활용한다면 가짜 객체에 원하는 결과를 Stub하여 단위 테스트를 진행할 수 있다. 

### [Mockito 사용법] 



### 1. Mock 객체 의존성 주입
---
   - @Mock : Mock 객체를 만들어 반환해주는 어노테이션
   - @Spy : Stub하지 않은 메소드들은 원본 메소드 그대로 사용하는 어노테이션
   - @InjectMocks : @Mock 또는 @Spy로 생성된 가짜 객체를 자동으로 주입시켜주는 어노테이션 

### 2. Stub 결과 처리 
---
- doReturn() : Mock 객체가 특정한 값을 반환해야 하는 경우
- doNothing() : Mock 객체가 아무 것도 반환하지 않는 경우(void)
- doThrow() : Mock 객체가 예외를 발생시키는 경우 사용

### 3. Mockito와 Junit의 결합
---
Junit과 결합되기 위해서는 Junit4에서 Mockito를 활용하기 위해서는 클래스에 @RunWith를 붙여주어야 연동이 가능하고 SpringBoot 2.2.0부터 Junit5를 지원하기에 @ExtendWith를 사용해야 결합이 가능하다. 

### 4. 활용 
---
Mockito를 활용하여 Spring의 Controller, Service, Repository 계층에서 단위 테스트를 진행하면 된다. 

### [예시 Service 계층]

```java
@Service
public class HistoryService {

    @Autowired
    GetMatchIDBean GetMatchIDBean;

    public MatchID GetMatchIdByPuuid(String puuid){
        return GetMatchIDBean.exec(puuid);
    }
}
```

```java
@ExtendWith(MockitoExtension.class)
class HistoryServiceTest {

    @InjectMocks
    private HistoryService historyService;

    @Mock
    private MatchID matchID;

    @Spy
    private GetMatchIDBean getMatchIDBean;

}
```

위 Service 계층은 이렇게 나타낸 후에 단위별로 Test를 진행하면 된다.

@Spy 어노테이션은 Mock으로 지정 안 되어 있으니 원본 메소드를 실행한다.

자세한 예시와 설명은 이 블로그를 참조하면 된다. 

 <https://mangkyu.tistory.com/145?category=761302>

### BDD는 또 뭐야!!@>?

간단히 소개만 하고 다음에 작성하겠다. 

```java
@ExtendWith(MockitoExtension.class)
class HistoryServiceTest {

    @MockBean
    private HistoryService historyService;
    private final GetMatchIDBean getMatchIDBean = mock(GetMatchIDBean.class);
    private MatchID MatchID = new MatchID();

    @BeforeEach
    void stubbing(){
    
        given(getMatchIDBean.exec(any(String.class))).willReturn(MatchID);
    }
```

위의 예시를 BDD로 나타낸 모습인데 Mokito라이브러리를 쓴 것과 유사한 모습을 가진다. BDD는 사실 TDD에서 따온 Behavior Driven Development 약자로 유사한 의미를 가진다. 

BDD를 처음 생각한 사람은 

``
TDD하다가 해당 코드를 분석하기 위해서 많은 코드들을 분석해야하고 복잡성으로 인해 '누군가가 나에게 이 코드는 어떤식으로 짜여졌어!' 라고 말을 해줬으면 좋았을 텐데 라고 생각을 하다가 보니 행동 중심 개발을 하면 좋겠다고 생각했다.
``

한 마디로 표현하자면 BDD는 애플리케이션이 어떻게 행동해야 하는지에 대한 공통된 이해를 구성하는 방법이며 이에 대한 자세한 설명은 다음 글에 소개하도록 하겠습니다. 

