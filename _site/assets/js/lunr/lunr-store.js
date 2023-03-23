var store = [{
        "title": "hello",
        "excerpt":"hello world  ","categories": ["hello"],
        "tags": ["python","blog","jekyll"],
        "url": "/hello/first/",
        "teaser": null
      },{
        "title": "좋은 객체 지향 설계의 5가지 원칙",
        "excerpt":"SRP: 단일 책임 원칙(single responsibility principle) 한 클래스는 하나의 책임만 가져아 한다는 것이다. 중요한 기준은 변경이다. 변경이 있을 때 다른 곳에 파급되는 영향이 적다면 단일 책임 원칙을 잘 따라 설계한 것이다. 객체의 생성과 사용을 분리한다면 파급 효과가 적도록 설계할 수 있다. 추가로 스프링에서는 구현 객체를 생성해 객체를 생성하고 역활을 명시한...","categories": [],
        "tags": [],
        "url": "/SOLID/",
        "teaser": null
      },{
        "title": "[Spring]Lombok",
        "excerpt":"@Lombok이란? Lombok은 Java 라이브러리에서 getter, setter, toString 등의 메서드 작성 코드를 줄여주는 코드 다이어트 라이브러리임. getter, setter와 toString() 메서드를 만들 때 IDE로 한 번에 할 수 있긴 하지만 코드가 길어지고 복잡해진다. 하지만 Lombok을 사용한다면 이러한 단점들이 사라지고 단지 어노테이션 하나만 입력해주면 된다. 다양한 Lombok - 여기서는 Lombok과 종류에 대해서만 알아보고...","categories": ["spring"],
        "tags": [],
        "url": "/spring/Lombok/",
        "teaser": null
      },{
        "title": "JAVA Beans",
        "excerpt":"JSP 자바 빈즈 개요 오늘 JSP를 배우던 와중 beans란 단어가 나와서 한 번 포스팅을 써본데이~ 빈즈란? 프로그램에서 부품이라 생각하면 된다. 큰 프로그램에서 독립적으로 수행되는 하나의 작은 자바 컨포넌트이다. 비지니스 로직을 담고 있으며 자바빈즈 규약을 따르는 클래스이다. 특정 데이터를 관리하고 표현하기 위해 JSP에서 사용하는 특수한 클래스이다. jsp페이지에서 비지니스 로직을 제거하기 위한...","categories": ["test","blog"],
        "tags": [],
        "url": "/test/blog/beans/",
        "teaser": null
      },{
        "title": "Docker",
        "excerpt":"Docker란 무엇? 도커는 먼저 컨테이너 기반의 오픈 소스이다. 먼저 컨테이너란 개념에 대해서 알아야합니다. 대충 말하자면 하나의 시스템 위에서 둘 이상의 Software를 동시에 실행하려고 한다면 문제가 발생할 수 있습니다. 만약 두 software의 운영 체제가 다른 경우에 문제가 발생할 수 있습니다. 이때 해결법으로 두 Software에 대한 시스템을 각각 준비하는 방법이 있는데 시스템을...","categories": [],
        "tags": [],
        "url": "/Docker/",
        "teaser": null
      },{
        "title": "[Java]NullException",
        "excerpt":"[Java] NullPointException 원인/예방/해결 이번 프로젝트를 진행하던 도중 JSON파일 부분인지 API요청해서 DTO로 받는 부분인진 모르겠지만 가장 많이 일어났던 오류가 바로 이 NullPointException이였는데 이를 개선하기 위한 방법들을 알아보고 포스팅해 보았다. [NPE]의 예방 및 해결법 NullPointException 줄인 말이 NPE다 1. null Parmeter 넘기지 말 것 parameter를 넘기고 나서 뒤에 이를 처리하는 부분이 있다고...","categories": ["java"],
        "tags": [],
        "url": "/java/NPE/",
        "teaser": null
      },{
        "title": "[Spring] TDD",
        "excerpt":"테스트 코드는 어떻게 짜야할까? TDD에서는 실제 개발코드보다 테스트 코드를 먼저 작성한다. 왜냐? 개발된 코드를 테스트하는 것이 훨씬 어렵기 때문이다. 테스트 코드를 짤 때 우리가 의문이 드는 점이 아주 많다. 어떤 코드에 대해서 테스트 코드를 짜야할까?, DB연결은 어떻게 테스트하지 등 수많은 고려사항들을 마주칠 것이고 이로 인해 머리가 아프다. 여기 글에서는 Spring에서...","categories": ["spring"],
        "tags": [],
        "url": "/spring/SpringTDD/",
        "teaser": null
      },{
        "title": "[JPA]다대일[N:1] 연관관계 매핑",
        "excerpt":"다대일 단방향 연관관계 매핑하기 객체와 테이블의 연관관계는 조금 다르다. 테이블 외래 키 하나로 양쪽 조인이 가능하다. 사실 방향이라는 개념이 없다. DB에서는 외래키가 한 쪽에만 있다. 객체 참조용 필드가 있는 쪽으로만 참조 가능하다. 한쪽만 참조하면 단방향 양쪽이 서로 참조하면 양방향 연관관계의 주인 테이블은 외래 키 하나로 두 테이블이 연관관계를 맺는다. 객체...","categories": ["jpa"],
        "tags": [],
        "url": "/jpa/manytoone/",
        "teaser": null
      },{
        "title": "[JPA]영속성 컨텍스트",
        "excerpt":"영속성 컨텍스트란? JPA에서 가장 중요한 2가지 중 하나이다. ~~”엔티티를 영구 저장하는 환경”이라는 뜻이다. ~~ 영속성 컨텍스트는 논리적인 개념이다. 눈에 보이지 않는다. 엔티티 매니저를 통해서 영속성 컨텍스트에 접근한다. 엔티티의 생명주기 비영속(new/transient) 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태 영속(managed) 영속성 컨텍스트에 관리되는 상태 준영속(detached) 영속성 컨텍스트에 저장되었다가 분리된 상태 삭제(removed) 말...","categories": ["jpa"],
        "tags": [],
        "url": "/jpa/persist/",
        "teaser": null
      },{
        "title": "[JPA]Spring Data JPA",
        "excerpt":"Spring Data JPA란? JPA를 좀 더 편하게 사용할 수 있게 Repository interface를 제공한다. repository 개발 시 인터페이스만 작성하면 실행 시점에 spring data jpa가 구현 객체를 동적으로 생성해서 알아서 주입한다. 기존의 JPA는 EntityManager를 생성하여 그 안에서 CRUD의 로직을 처리하는 반면에 Spring Data JPA는 이미 EntityManager가 선언되어 있기 때문에 직접 작성할 필요가...","categories": ["jpa"],
        "tags": [],
        "url": "/jpa/SpringJPA/",
        "teaser": null
      },{
        "title": "[Java]StringTokenizer사용법?",
        "excerpt":"1. 라이브러리 import java.util.StringTokenizer; import를 해주셔야 사용이 가능합니다. 2. 생성 방법 1. StringTokenizer st = new StringTokenizer(문자열); 2. StringTokenizer st = new StringTokenizer(문자열, 구분자); 3. StringTokenizer st = new StringTokenizer(문자열, 구분자, true/false); StringTokenizer는 기본적으로 띄어쓰기를 기점으로 분리합니다. import java.util.*; public class Main { public static void main(String[] args) { String...","categories": ["java"],
        "tags": [],
        "url": "/java/StringTokenizer/",
        "teaser": null
      }]
