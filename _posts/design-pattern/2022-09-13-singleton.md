---
layout: single

title: "1.1.1) 싱글톤" 

categories: 
    - Design pattern

tags: [singleton]

toc: true

---

<br />

<br />

# 🐣 서론

---

디자인 패턴이란 프로그램을 설계할 때 발생했던 문제점들을 객체 간의 상호 관계 등을 이용하여 해결할 수 있도록 **하나의 '규약'** 형태로 만들어 놓은 것을 의미한다. 

# 💁🏻 싱글톤 패턴

---

싱글톤 패턴은 하나의 클래스에 오직 하나의 인스턴스만 가지는 패턴이다. 보통 데이터베이스 연결 모듈에 많이 사용한다. 

인스턴스 :  클래스에 소속된 개별적 개체 ex) User 클래스의 홍길동 객체

하나의 인스턴스를 만들어 놓고 해당 인스턴스를 다른 모듈들이 공유하며 사용하기 때문에 **인스턴스를 생성할 때 드는 비용이 줄어드는 장점**이 있다. 하지만 **의존성이 높아진다**는 단점이 있다. 

---

# 🔭 자바스크립트의 싱글톤 패턴

```javascript
const obj = {
    a:27
}
const obj2 = {
    a:27
}
console.log(obj === obj2)
//false
```

const는 변수값 변경이 불가능한 자료형을 선언한 것이다

console.log로 진위여부를 판단한다. 변수가 같은지 비교하기 위해 ===를 썼다.

자바스크립트에서는 ==보다 ===를 쓰기를 권장한다. (엄격히 비교)

(가능한 ==를 사용하지 않고 자료형을 직접 변환(캐스팅)하여 코드 가독성을 높이자)

자바스크립트에서는 리터럴{} 또는 new Object로 객체를 생성하면 다른 어떤 객체와도 같지 않다. 

따라서 엄격히 비교시같지 않으므로 따라서 결과는 false  

```javascript
class Singleton {
    constructor() {
 //약속된 이름으로 바꾸면 안됨
        if(!Singleton.instance) {
            Singleton.instance = this
        }
        return Singleton.instance
    }
    getInstance(){
        return this.instance
        }
}

const a = new Singleton()
const b = new Singleton()
console.log(a===b) // true 
```

constructor()  -> 이 함수로 객체의 초기값을 설정할 수 있음  약속된 이름으로 바꾸면 안된다 

싱글톤 패턴에서는 이미 객체가 생성되었는지 판단하는 instance와 같은 내부 변수가 필요

!Singleton.instance - > 인스턴스가 없으면 새로 지정 

인스턴스가 있으면 인스턴스를 리턴해준다.

이를 통해 a와 b는 하나의 인스턴스를 가지는 Singleton을 가진다 

a에 새로운 싱글톤을 생성해주면 Singleton.instance는 인스턴스가 있으므로 그냥 바로 return this.instance를 해준다  

---

# 💛 데이터베이스 연결 모듈

 싱글톤 패턴은 데이터베이스 연결 모듈에 많이 쓰인다 

```javascript
const URL = 'mongodb://localhost:27017/kundolapp'
const createConnection = url => ({"url" : url})
class DB {
  constructor(url) {
    if (!DB.instance) {
      DB.instance = createConnection(url)
    }
    return DB.instance
  }
  connect() {
    return this.instance
  }
}
const a = new DB(URL)
const b = new DB(URL)
console.log(a===b) 
```

위에 설명과 같이 a의 경우 DB.instance가 없으므로 생성해주고, 이를 return

있을경우엔 바로 connect() 메서드로 go , return this.instance를 해준다

이를 통해 하나의 인스턴스를 기반으로 a,b를 생성했다. 귀찮게 여러번 DB 객체를 생성 안해주어도 된다는 장점 ! 

--- 

# <br>

<br>

# 😜 자바에서의 싱글톤 패턴

```java
public class Main {

    public static void main(String[] args) {
        mySingleton inst1 = mySingleton.getInstance();
        mySingleton inst2 = mySingleton.getInstance();
        System.out.println("인스턴스가 같은지 비교");
        System.out.println(inst1==inst2);

        System.out.println(inst1.getId());
        System.out.println(inst1.getName());

        inst1.setId(2005);
        inst1.setName("The new Manager");


        System.out.println(inst2.getId());
        System.out.println(inst2.getName());    

    }

}

class mySingleton {
    private int id;
    private String name;



     
    private static mySingleton instance = new mySingleton();
    private mySingleton() {
        this.id = 1001;
        this.name = "The Instance Manager";
    }
    public static mySingleton getInstance() {
        if(instance == null) {
            instance = new mySingleton();
        }
        return instance;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) { 
        this.name = name;
    }
}
```

<br>

<br>

추가적으로 인스턴스를 생성하려는 시도는 if 조건문으로 필터링 된다.

싱글톤의 특징은 런타임 동안 단 한개의 인스턴스만 허용된다. 

우리가 인스턴스를 생성할 때 new 클래스명() 이렇게 생성하는데, 어떻게 보면 이것도 new 라는 키워드를 사용하여 마음대로 메모리를 사용할 수 있게 허용된 것이다.

싱글톤은 new 라는 키워드를 사용할 원천 자체를 차단해버리므로, 클래스의 사용자는 훨씬 편하게 사용가능하다. 

new는 원래 C언어의 malloc( Memory Allocation ) 메모리 할당 함수에다가 객체 관리 기능을 추가해서 나온 키워드이다.

자바의 new 역시 메모리 할당이기 때문에 싱글톤을 사용하여 원천에 막아 놓는것

<br>

<br>

# 자바 코드 해석

<br>

<br>

**1단계 : 생성자를 private으로 만들기**

<br>

<br>

```java
class mySingleton {
    private int id;
    private String name;
```

<br>

<br>

생성자가 하나도 없는 클래스는 컴파일러가 자동으로 디폴트 생성자 코드를 넣어주는데, 컴파일러가 만들어 주는 디폴트 생성자는 public이다. 생성자가 public 이면 외부 클래스에서 인스턴스를 여러 개 생성 가능하다. 따라서,접근 제어자를 private으로 지정해준다. 그러면 생성자가 있기에 컴파일러가 디폴트 생성자를 만들지 않고, 접근 제어자가 private이므로 외부 클래스에서 마음대로 인스턴스를 사용 할 수 없게 된다. 

<br>

<b> 2단계 : 클래스 내부에 static으로 유일한 인스턴스 생성하기 </b>

<br>

<br>

```java
    private static mySingleton instance = new mySingleton();
    private mySingleton() {
        this.id = 1001;
        this.name = "The Instance Manager";
    }
```

<br>

<br>

1단계에서 외부 인스턴스를 생성할 수 없게 하였다. 하지만 우리의 프로그램에서는 인스턴스가 하나만 필요하므로 mySingleton 클래스 내부에서 하나의 인스턴스를 생성하도록 한다. 이 인스턴스가 프로그램 전체에서 사용할 유일한 인스턴스가 된다. private으로 선언하여 외부에서 이 인스턴스를 접근하지 못하게 하여 이 인스턴스에 접근하지 못하도록 제한하여야 인스턴스 오류가 없다.

<br>

**3단계 : 외부에서 참조할 수 있는 public 만들기**

<br>

<br>

```java
public static mySingleton getInstance() {
        if(instance == null) {
            instance = new mySingleton();
        }
        return instance;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) { 
        this.name = name;
    }
```

<br>

<br>

이제 private로 선언한 유일한 인스턴스를 외부에서 사용가능하도록 해야한다. 이를 위해 public 메서드를 만들고 유일하게 생성한 인스턴스를 반환한다.  이 때 인스턴스를 반환하는 메서드는 반드시 static으로 선언해주어야한다. getInstance()에서는 인스턴스 생성과 관계없이 호출 가능해야하기 때문이다. 

<br>

<br>

---

# 🦋 mySQL의 singleton

<br>

<br>

자바와의 연결이다.

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


/**
 * DB Connection 하는 Singleton class.
 *
 * @author Administrator
 *
 */
public class DBUtils {

    private static final String DBCP_POOLING_DRIVER = "org.apache.commons.dbcp.PoolingDriver";
    private static final String MYSQL_JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String JDBC_URI = "jdbc:apache:commons:dbcp:/boardpool";

    // 자기 스스로에 대한 인스턴스 생성. (생성자가 private이기 때문.)
    private static volatile DBUtils instance = null;

    private DBUtils() throws Exception {
        try {
            Class.forName(MYSQL_JDBC_DRIVER);
            Class.forName(DBCP_POOLING_DRIVER);
        } catch (Exception e) {
            throw new Exception("Failed to create JDBC drivers.", e);
        }
    }

    public static DBUtils getInstance() throws Exception {
        if (instance == null) {
            // 클래스를 생성하려면 클래스 자체에 대해 접근해야하므로 동기화를 걸어줌.
            synchronized (DBUtils.class) {
                if (instance == null) {
                    instance = new DBUtils();
                }
            }
        }
        return instance;
    }

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URI);
    }

}
```

<br>

<br>

# 🔭 싱글톤 패턴의 단점

<br>

싱글톤 패턴은 TDD(Test Driven Development)를 할 때 걸림돌이 된다. TDD를 할 때 단위 테스트를 주로 하는데, 단위 테스트는 서로 독립적이어야 하며 테스트를 어떤 순서로든 실행할 수 있어야한다.

하지만 싱글톤 패턴은 미리 생성된 하나의 인스턴스를 기반으로 구현하는 패턴으로 각 테스트마다 독립적인 인스턴스를 만들기 어렵다.

<br>

<br>

---

# 🍒 의존성 주입

<br>

<br>

싱글톤 패턴은 사용하기가 쉽고 실용적이지만, 모듈 간의 결합을 강하게 만들 수 있다. 이 때 의존성 주입(DI,Dependecy Injection)을 통해 모듈 간의 결합을 조금 더 느슨하게 만들어 해결할 수 있다.

참고로, 의존성이란 종속성이라고도 하며 A가 B에 의존성이 있다는 것은 B의 변경 사항에 대해 A 또한 변해야 한다는 것을 의미한다.

<br>

<br>

## before

```java
public class Main {

  public static void main(String[] args) {
    Controller controller = new Controller();
    controller.print();
  }
}

class Controller {

  private Service service;

  public Controller() {
    this.service = new Service();
  }

  public void print() {
    System.out.println(service.message());
  }
}

class Service {

  public String message() {
    return "Hello World!";
  }
}
// 출처: https://7942yongdae.tistory.com/177 [프로그래머 YD:티스토리]
```

코드로 본다면 객체는 내가 만들게, 넌 사용만 해 라는 느낌이다. 위에 코드는 Controller 객체가 Service 객체를 거쳐서 Hello world를 출력하는 코드이다. 두 객체에는 직접적 연관이 있다. 만약 Service 값이 바뀐다면 출력되는 코드도 달라지기 때문이다. **Controller 객체는 Service 객체를 알고 직접 만들어서 메시지를 사용한다.**

<br>

<br>

## after

<br>

<br>

```java
public class Main {

  public static void main(String[] args) {
    Controller controller = new Controller(new MessageService());
    controller.print();
  }
}

interface IService {

  String message();
}

class Controller {

  private IService service;

  public Controller(IService service) {
    this.service = service;
  }

  public void print() {
    System.out.println(service.message());
  }
}

class MessageService implements IService {

  public String message() {
    return "Hello World!";
  }
}
// 출처: https://7942yongdae.tistory.com/177 [프로그래머 YD:티스토리]
```

<br>

<br>

인터페이스로 추상화를 주입 시켰다. 이제는 Controller가 MessageService를 거치지 않고 인터페이스인 IService를 이용하여 메시지를 출력한다. 

이전 코드와 달리 Controller 가 MessageService가 무엇인지 몰라도 IService를 이용하여 객체를 출력할 수 있다. 정말 " **객체(MessageService) 는 내가(Main) 만들게 넌 사용(IService) 해"** 라는 상황이 되었다. 

<br><br>



# ⛳️ 의존성 주입의 단점

모듈들이 더욱 분리 되므로 클래스 수가 늘어나, 복잡성이 증가할 수 있으며 약간의 런타임 페널티가 생기기도 한다.

# 😁 의존성 주입 원칙



상위 모듈은 하위 모듈에서 어떠한 것도 가져오지 말아야한다. 또한, 둘다 추상화에 의존해야 하며, 이 때 추상화는 세부 사항에 의존하지 말아야한다. 

<sup>출처 : 면접을 위한 CS 전공지식 노트</sup>
