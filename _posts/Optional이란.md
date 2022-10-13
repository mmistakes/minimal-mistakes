# Optional<T>
```java
public final class Optional<T>{
    private final T value;// T타입의 참조변수
  }
```
  - 자바 8 버전에서 추가된 기능
  - Optional<T>는 T타입 객체의 래퍼 클래스이다.
  - 여기서 T는 모든 종류의 객체를 의미하여 어떤 타입이던 내부 멤버로 Optional 객체가 멤버로 가질 수 있음을 뜻한다.(Null도 가질 수 있다.)
    - Null을 직접 다루는 것은 NullpointException의 위험을 내포하기에 이를 회피할 수 있다.
    - 이 점을 활용 해 null을 체크하는데 사용하는 경우가 많다.
```java
  Obejct result = 어떤_메서드();
  result.toString();
```
  - 어떤_메서드를 실행하였을 때 반환값인 result가 null인지 확인하면 toString()은 예외가 발생할 것이다.(NullpointException의)
  - Optional이 없을 때는 if(result==null)처럼 if문을 써야했고 코드가 불필요하게 길어졌다.
  ```java
  Optional<T> result = 어떤_메서드();
  ```
  - Optional이 도입되고서부터는 다음과 같은 코드가 가능해졌다.
  - result는 더이상 null값 그자체를 담은 객체가 아니다.
  - Null을 담고 있는 Optional 객체의 참조값을 가지게 된다.

## Optional<T> 객체 생성
  - Optional<T> 객체는 기본적으로 of()를 통해 생성한다. 매개변수가 Null인지 아닌지에 따라 다음의 2가지로 방법이 나뉜다.
  ```java
  String str ="abc   "
  Optional<String> optVal = Optional.of(str);
  Optional<String> optVal = Optional.of("abc");
  Optional<String> optVal = Optional.of(null);//NullpointException 발생
  Optional<String> optVal = Optional.ofNullable(null);// Ok
  ```
  - null값을 다룰 때는 ofNullable()를 사용해야 한다.

  ```java
  Optional<String> optVal = null;// null로 초기화하는 방법으로 바람직하지 않다.(X)
  Optional<String> optVal = Optional.<String>empty();// 빈 Optional 객체로 초기화하는 방법으로 null으로 초기화할 때 권장되는 방법이다.(O)
  ```
  - <String>은 생략 가능하다.
  - 한번 더 빈 객체를 거쳐서 참조하도록 하는 것은 모두 NullpointException을 피하기 위해서이다.

  ※ 배열을 null로 초기화할 때도 마찬가지이다.
  - int[] arr = null;(X)
  - int[] arr = new int[0];(O)

## Optional<T> 객체의 값 가져오기
    - Optional 객체의 값을 가져오는 방법은 여러가지가 있다.
      - get()
      - orElse()
      - orElseGet()
      - orElseThrow()
  ```java
  Optional<String> opVal = Optional.of("abc");
  String str1 = optVal.get();//optVal에 저장된 값(value)을 반환. value가 null이면 예외 발생
  String str2 = optVal.orElse("");//optVal에 저장된 값이 null일 때는 ""를 반환하여 ()안의 값으로 반환 값을 대체하는 기능을 한다.
  String str3 = optVal.orElseGet(String::new);//람다식을 사용가능하다 () -> new String()
  //          == optVal.orElseGet( () -> new String());
  String str4 = optVal.orElseThrow("NullpointException"::new);// 값이 존재하면 반환, null이면 해당 예외 발생시킴
  //          == optVal.orElseThrow( () -> new NullpointException())
  ```
    - get()의 경우 만약 null이면 예외가 발생하기 때문에 이를 대비하기 위해서는 try-catch문을 추가로 작성해야한다.(비효율적)

### isPresent, ifPresent, ifPresentOrElse
    - Optional 객체의 값이 null이면 false, 아니면 true를 반환한다.
  ```java
  if(Optional.ofNullable(str).isPresent()){//if(str!=null)과 동일한 문장
    System.out.println(str)
  }
  ```
  ```java
  Optional.ofNullable(str).ifPresent(System.out::println);
  ```  
    - 위아래 문장을 서로 동일한 결과를 반환한다.
    - ifPresent(Consumer): null이 아닐 때만 아래 작업을 수행하고 null이면 그냥 넘어간다.
    - ifPresent와 비슷하게 ifPresentOrElse()라는 메서드도 존재한다.
      - 글자 그대로 값이 존재하지 않는 경우도 고려하여 코드를 실행하는 기능을 위해 사용한다.
  ```java
  Optional<String> opt = getValue();
  opt.ifPresentOrElse(
    value -> doSome(value);// 값이 있을 때 실행하는 코드
    () -> doOther();// 값이 없을 때 실행하는 코드
  )
  ```

## map()를 활용한 반환값 이용
    - map()를 이용하면 전달 받은 함수를 실행시켜 값을 변환한 Optional 객체를 리턴할 수 있다.
    - map() 활용시 null값이면 빈 Optional을 리턴한다.
  ```java
  Member m =...;
  LocalDate birth = m.getBirthday();
  int passedDays = cal(birth);
  ```   
  - 위 코드는 딱 봐도 생일부터 살아온 날을 계산하는 코드이다.
  - 해당 코드를 이번에는 Member 타입인 Optional 객체로 받아서 실행해보자

  ```java
  Optional<Member> memOpt =...; // 형태만 보면 무슨 컬렉션에 제네릭 붙은 것 같지만 어떤 타입이건 받는 Optional 객체인데 Member 타입의 멤버 번수를 딱 하나 가지는, 사실상 Member 객체인 셈이다.
  Optional<LocalDate> birthOpt  = memOpt.map(mem -> mem.getBirthday());
  // 여기서 mem은 memOpt가 갖고 있는 멤버 변수의 이름으로 mem이라고 이름을 붙여줌과 동시에 람다식을 통해 해당 값을 활용하고 있는 것이다. mem이든 asd이든 원하는대로 이름을 지어 입력하면 알아서 인식된다.(Optional은 멤버변수가 단 하나이기 때문에 가능한 것)
  Optional<Integer> pdOpt = birthOpt.map(birth -> cal(birth));
  --------------------||--------------------// 위아래 코드는 동일하다.
  Optional<Member> memOpt =...;
  Optional<Integer> pdOpt2 =
      memOpt.map(mem -> mem.getBirthday())
            .map(birth -> cal(birth));
  ```
    - 이때 만약 처음부터 null값이 온다면(즉 빈 Optional 객체라면?)
  ```java
  Optional<String> empty = Optional.empty();
  Optional<String> empty2 = empty.map(str -> str.toUpperCase());
  empty2.isEmpty() -> true
  ```
  - 빈 Optional empty 객체는 값이 없기에 map()은 수행할 값이 없기에 아무 작업도 하지 않는다.
  - 따라서 후에 isEmpty()를 해도 그냥 true가 자연스럽게 나오게 된다.


## OptionalInt, OptionalLong, OptionalDouble
  - 위 3가지 래퍼 클래스는 기본형 값을 감싸기 위해 사용하는 래퍼 클래스이다.
  - Optional<T>을 사용하면 모든 타입을 다 받을 수 있는데 굳이 이것들을 사용하는 이유는 성능향상 때문이다.
  - Optional<T>를 쓰면 Stream과 람다식이 사용되어 성능저하가 발생하는데 이를 방지해주는 것
  ```java
  public final class OptionalInt{
    ...
    private final boolean isPresent;// 값이 존재하는지 확인하는 메서드
    private final int value;}// 기본형 int 값을 받는 변수
------------------------------------------------------------------
    public final class Optional<T>{
    private final T value;}// T타입의 참조변수
  ```
  - 위 아래의 가장 큰 차이는 value의 타입일 것이다.
  - T는 기본적으로 **참조형**을 의미한다. 하지만 OptionalInt는 기본형 int만 올 수 있다.

### value 호출 방법
  -  OptionalInt, OptionalLong, OptionalDouble은 각각 getAsInt(), getAsLong(), getAsDouble()의 메서드를 통해 값을 호출할 수 있다.

### 빈 Optional 객체와 비교
  - OptionalInt.of(0)
  - OptionalInt.empty();
  - 두 매서드 모두 OptionalInt 타입 객체를 반환하고 0을 값으로 저장한다.
  - 하지만 두개는 엄연히 다르다.
  - 만약 각각의 반환 객체에 isPresent()를 호출한다면 of객체는 true를 empty객체는 false를 반환한다.
  - empty객체는 개념적으로 값이 없기 때문이다.(empty)


## flatMap()의 의미와 활용
  - flatMap메서드는 해당 메서드로 전달받은 함수 이용값을 변한한 Optional 타입 객체를 리턴한다.
  - 쉽게 말해 Optional 타입의 객체를 받아서 어떤 기능을 수행하고난 반환 값이 타입이 또 Optional이고 이를 다시 새로운 Optional객체에 멤버 번수로 넣어야 할 때 사용한다.
  - 즉 Optional 객체의 멤버 변수로 또 다시 Optional객체를 만들 때 flatMap()를 사용한다.(Optional<Optional<T>> opt)
  - flatMap()은 Optional<Optional<T>>같은 이상한 타입을 <Optional<T>로 바꿔주는 것이다.
  ```java
// Optional<U> flatMap(Function<? super T, ? extends Optional<? extends U>> mapper)

  Optional<Member> memOpt = ...;
  Optional<LocalDate> bitrhOpt = memOpt.flatMap(mem -> Optional.ofNullable(mem.getBirthday()));
  Optional<Integer> pdOpt = birthOpt.flatMap(birth -> calOptinal(birth));
  ```

## filter
  - 조건을 충족하면 값 그대로를 리턴하고 충족하지 못 하면 빈 Optional을 리턴한다.
  ```java
  String str = ...;
  if(str!=null && str.length()>3){
    System.out.println(str);
  }
  ```
  - 다음의 코드를 Optional을 활용해 작성할 수 있다.
  ```java
  Optional<String> strOpt = ...;
  Optional<String> filtered =  
      strOpt.filter(str -> str.length()>3);// strOpt의 멤버변수 길이가 3보다 크냐?
  filtered.ifPresent(str -> System.out.println(str))// 값이 있다면 다음 메서드를 실행한다.
  ------------------------------------------
  Optional<String> strOpt = ...;
  Optional<String> filtered =  
      strOpt.filter(str -> str.length()>3);
            .ifPresent(str -> System.out.println(str))
  ```


## 두개 Optional을 조합해 활용하는 방법
```java
  Member m =...;
  if(m == null) return null;
  Company c = getCompany(m);
  if(c == null) return null;
  Card card = createCard(m, c);
  return card;
```
- 다음의 코드를 Optional로 만들어보자
```java
  Optional<Member> memOPt = ...;
  Optional<Company> comOpt =
      memOpt.map(mem -> getCompany(mem));

  Optional<Card> card = memOpt.flatMap(
    mem -> compOpt.map(
          comp -> createCard(mem, comp)// 해당 코드의 결과값이 Optional이기에 flatMap사용   
          )                                    
  );
  -----------------||----------------------
  Optional<Member> memOpt = ...;
  Optional<Card> cardOpt = memOpt.flatMap(mem -> {// memOpt의 멤버변수 mem을 가져다가 다음 코드를 실행한다
    Optional<Company> comOpt = getCompanyOptional(mem)// mem을 가져다가 getCompanyOptional의 매개변수로 사용하고 그 반환값을 Optional<Company>타입의 comOpt 객체로 반환한다.
    return compOpt.map(comp -> createCard(mem.comp));
  })
```


```java
Member m1 = ...;
Member m2 = ...;

if(m1 == null && m2 == null)
  return null;
if(m1 == null) return m2;
if(m2 == null) return m1;

return m1.year>m2.year ? m1 : m2  
```
```java
Optional<Member> mem10pt = ...;
Optional<Member> mem20pt = ...;

Optional<Member> result =
  mem10pt.flatMap(m1 -> ...;)//m1이 있으면 현재 코드 실행, 없으면 다음으로 그냥 넘어감
         .or(() -> mem20pt);//map 결과가 없으면 m2 사용, 둘다 없다면 result 는 빈 객체가 된다.
-----------||------------------------------
Optional<Member> result =
  mem10pt.flatMap(m1 -> {
        return mem20pt.map(m2 -> {
          return m1.year > m2.year ? m1 : m2
        }).orElse(m1); //m2가 없으면 m1
  })
  .or(() -> m2); //flatMap결과가 없으면 m2 사용

return result.orElse(null);  // 둘다 값이 없다면 그냥 null 반환하게 만들어 놓은 코드
```
