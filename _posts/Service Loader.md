# 서비스 로더
- 특정 기능을 제공하는 인터페이스가 있고 이를 기반으로한 구체 서비스를 다양한 벤더회사에서 만든다.
- 사용자는 이 인터페이스만 쓰면 되고 어떻게 구현체가 만들어졌는지는 몰라도 된다.
- 이러한 인터페이스를 SPI라 부른다.(service provider interface)

## API vs SPI
  - API는 Application Programming Interface의 줄임말로 두개의 소프트웨어가 서로 통신할 수 있게 하는 메커니즘을 의미한다. 보통 애플리케이션 간에 통신을 위한 장치라고 볼 수 있다.
  - 즉 두 어플리케이션간의 통신이라는 목표를 달성하기 위해서 API를 호출하여 특정 기능을 이용할 수 있다.
  - SPI는 Service Provider Interface의 API의 역할을 좀 더 확장한 개념으로 제3자에 의해 어떠한 기능을 하는 구체적인 구현체(클래스라 이해하자)를 직접 구현하는데 가이드라인을 제시하는 인터페이스를 의미한다.
  - 쉽게 말해 SPInterface에는 a라는 기능을 위한 매서드가 선언(구현부만)되어 있고 제 3자는 이것을 실제로 컴파일러에서 돌아가도록 해당 인터페이스를 상속한 어떤 A 클래스를 만들 수 있는 것이다.


  - 비유적으로 표현하면 API는 이미 구현되어있는 기능(구현된 객체의 메서드)을 매서드 이름만 가져와 사용자가 이용하는 것(구체적으로 코드가 어떻게 구현되어있는지는 알 필요가 없다.)
  - SPI는 어떤 기능의 이름(인터페이스에서 선언부만 있는 메서드)만 가져와 직접 클래스를 만들고 가져온 이름과 동일한 메서드를 직접 사용자가 구현하는 것.(물론 구현에 필요한 기준에 맞추어 구현해야한다.)

  - 이렇게 SPI를 통해 여러명의 사용자가 자신만의 구현체를 만들어 놓으면(같은 기능을 하나 결과값이나 구동은 개인마다 다를 것이다.) 해당 사용자 혹은 같이 업무를 하는 사람 혹은 제3자가 SPI의 인터페이스 명으로 자신이 원하는 구현체(누가 만들어 놓은, 이미 만들어져 있는)를 골라 사용할 수 있게 된다.(다형성을 활용해서)

  ```java
  package com.SayHiInterface;

  public interface SayHiInterface {
      String Hi();
  }
  ```
  - SayHiInterface는 인사말을 건네는 기능을 위한 인터페이스로 Hi라는 메서드가 선언되어있다.
  - 이를 각 나라의 개발자가 각자의 언어로 인사를 전하는 메서드를 구현한다고 해보자
  ```java
  package com.myhi;

  import com.hiinterface.SayHiInterface;

  public class EngHi implements SayHiInterface {

      @Override
      public String Hi() {
          return "hi";
      }
  }   
  ```
  - 미국인 개발자 A가 자신의만의 Hi()를 구현하였다.
  - SayHiInterface 인터페이스를 상속받아 구현하였다.

  - 이때 다른 미국인 개발자 B가 A가 구현한 Hi()를 쓰고 싶다면 어떻게 할까?
  - A가 구현한 클래스를 가져와야한다.
    1. A가 구현한 클래스의 경로를 가져온다.
    2. B가 작성하고 있는 패키지에서 resouces.META_INF.services 디렉토리에 EngHi의 경로를 입력한다.
    3. 이를 통해 JAVA가 제공하는 ServiceLoader 클래스의 객체가 해당 디렉토리에 입력된 경로를 체크하고 경로를 따라 EngHi 클래스에 접근할 수 있게 된다.
  ```java
  import com.hiinterface.SayHiInterface;

  import java.util.ServiceLoader;

  public class HelloMain {
      public static void main(String[] args) {
          ServiceLoader<SayHiInterface> loader = ServiceLoader.load(SayHiInterface.class);

          for (SayHiInterface sayHiService : loader) {
              System.out.println(sayHiService.Hi());
          }
      }
  }
  ```
    4. ServiceLoader를 임포트하고 load()를 이용해 SayHiInterface 타입의 객체를 가져온다.
    5. iterator를 통해 Hi()를 호출한다.
  - 이렇게 개발자 B는 A가 구현한 Hi()호출해 영어로 인사를 건낼 수 있게 되었다.
  - B는 A가 어떻게 메서드를 구현했는지는 알 필요가 없다. 그저 A가 만든 클래스를 가져와서 원하는 기능을 하는 Hi()만 알고 호출하면 된다.
  - 만약 수많은 SayHiInterface를 구현한 클래스가 있다면(Ex. EngHi, KorHi, ChiHi, JapHi 등등) 매개변수를 통해 구별한다던지 와 같은 조건을 넣어 원하는 클래스만 골라 기능을 호출할 수도 있다.
    - 조건을 선별하는데 stream()을 이용하는 것도 가능할 것이다.
      - Ex. loader.stream().map(Service.Provider::get).findFirst();
