## 스트림 만들기 

### 객체 배열로부터 스트림을 만드는 방법

1. of() 사용하기
```java
		- Stream<T> Stream.of(T...values)// 가변인자
			- Stream<String> strStream = Stream.of("a","b","c"); //가변인자
		- Stream<T> Stream.of(T[])
			- Stream<String> strStream = Stream.of(new String[]{"a","b","c"}); 
			
	2. Arrays.stream(T[]) 사용하기
		- Stream<T> Arrays.stream(T[]) 
			- Stream<String> strStream = Arrays.stream(new String[]{"a","b","c"}); 
		- Stream<T> Arrays.stream(T[] array, int startInclusive, int endInclusive)// 배열 일부만 스트림으로
			- Stream<String> strStream = Arrays.stream(new String[]{"a","b","c", 0 ,   3); //0~2인덱스

- Stream 타입이 아닌 IntStream처럼 기본형 타입의 스트림으로 타입을 설정할 수도 있다. 
```

```java
스트림 객체 생성 예시
List<Integer> list = Arrays.asList(1,2,3,4,5);
Stream<Integer> intStream = list.strem();// list를 stream으로
intStream.forEach(System.out::print);

//stream은 1회용. stream에 대해 최종연산을 수행하면 해당 stream은 닫힌다.(재사용 불가)
intStream= list.stream();
intStream.forEach(System.out::print);

String[] strArr = {"a","b","c"};
Stream<String> strStream = Stream.of(strArr);
Stream<String> strStream = Arrays.stream(strArr);
strStream.forEach(System.out::print);

int[] intArr = {1,2,3,4};
IntStream intStream = Arrays.stream(intArr);
IntStream.forEach(System.out::print);

Integer[] intArr = {1,2,3,4};// 기본형 1234이지만 알아서 오토박싱되어 Integer타입으로 변환된다. 
Stream<Integer> intStream = Arrays.stream(intArr);
IntStream.forEach(System.out::print);

```

### 스트림으로 임의의 난수 만들기
```java
IntStreamintStream = new Random().ints();// 무한 스트림
intStream.limit(5).forEach(System.out::println);//5개의 요소만 출력한다. 
IntSteram intStream = new Random().ints(5)//크기가 5인 난수 스트림을 반환

Integer.MIN_VALUE <= ints() <= Integer.MAX_VALUE
Long.MIN_VALUE <= longs() <= Long .MAX_VALUE
0.0 <= doubles() < 1.0
```
* 난수를 요소로 갖는 스트림 생성 (ints()등) * 지정한 범위의 난수를 요소로 갖는 스트림을 생성하는 메서드(Random클래스)

### 스트림으로 특정 범위의 정수 만들기
```java
IntStream intStream.range(int begin, int end)
IntStream IntSteram.rangeClosed(int begin, int end) 
-------------------------------------------------
IntStream intStream = IntStream.range(1,5);//1,2,3,4
IntStream intStream = IntStream.rangeClosed(1,5);//1,2,3,4,5

```

### 람다식을 통한 스트림 생성(iterate(), generate())
```java
static <T> Stream<T> iterate(T seed, UnaryOperator<T> f)// 이전 요소에 독립적
static <T> Stream<T> generate(Supplier<T> s)// 이전 요소에 독립적
```

- T seed는 초기값을 의미한다. 
- 예로 Stream.iterate(0, n->n+2)일 경우, iteratre()는 0,2,4,6,8,....의 2씩 증가하는 값을 무한히 내보내게 된다. 
- iterate()는 주어진 seed 값을 기반으로 람다식을 호출하고 람다식의 리턴값이 다시 seed로 초기화되어 계속 이어지는 무한 스트림을 생성하는 메서드인 것이다. 
- gnerate() 또한 무한 스트림을 만드는 메서드이다. iterate()와의 차이점은 처음에 주어지는 seed 값이 없다는 점. 따라서 매개변수로 오는 람다식은 seed 값이 필요없는 Supplier 타입의 함수 인터페이스 형식이어야 한다.
```java
Stream<Double> randomStream = Stream.generate(Math:: random)
Stream<Integer> oneStream =Stream.generate(() -> 1 );
```

- 예제를 보고 이해도를 높여보자
	``` java
	 Stream<Integer> intStream =Stream.iterate(0, n->n+2);
	 intStream.limit(10).forEach(System.out::println);//limit()을 통해 무한 스트림의 결과값의 개수를 제한한다.
	  Stream<Integer> oneStream =Stream.generate(() -> 1 );
	  oneStream.limit(10).forEach(System.out::println);
	``` 

### 파일과 빈을 스트림으로 만들기

#### 파일을 source로 한 스트림 생성
```java
Stream<Path> Files.list(Path.dir)// path는 파일 혹은 디렉토리를 의미

Stream<String> Files.lines(path path); // lines()파일의 내용을 라인별로 스트림하는 메서드이다. 
Stream<String> Files.lines(path path, Charset cs);
Stream<String> lines() //BufferedReader 클래스의 메서드
```

#### 빈(empty) 스트림 생성
Stream emptyStream = Stream.empty();// 빈 스트림을 생성해 반환한다.
long count =emptyStream.count();// count()의 반환값은 0이다.


## 스트림의 연산

### 중간연산과 최종연산
- 중간 연산 : 연산결과가 **스트림**인 연산, 반복적으로 적용 가능하다.  
- 최종연산 :  연산결과가 스트림이 아닌 연산. 단 한번만 적용가능(스트림의 요소를 소모)

```java
stream.distinct().limit(5).sorted().forEach.System.out::println)
```

#### 중간 연산의 종류
| 중간 연산 | 설명 |
|--------|--------|
| distinct() | 중복 제거 |
| Stream<T> filter(Predicate<T> predicate) | 조건에 안 맞는 요소 제외 |
| Stream<T> limit(long maxSize) | 스트림의 일부를 잘라낸다. |
| Stream<T> skip(long n) | 스트림이 일부를 건너뛴다. |
| Stream<T> peek(Consumer<T> action) | 스트림의 요소에 작업을 수행 |
| Stream<T> sorted() / sorted(Comparator<T> comparator) | 스트림의 요소를 정렬한다. |
| Stream<R> map(Fuction<T,R> mapper) | 스트림의 요소를 변환한다. |
| DoubleStream mapToDouble(ToDoubleFunction<T> mapper) | `` |
| IntStream mapToInt(ToIntFunction<T> mapper)  | `` |
| LongStream mapToLong(TolongFunction<T> mapper) | `` |
| Steam<R> flatMap(Function <T, Stream <R> > mapper ) | `` |
| flatMapToDouble(Function <T, DoubleStream> m ) | `` |
| flatMapToInt(Function <T, IntStream> m ) | `` |
| flatMapToLong(Function <T, LongStream> m ) | `` |


#### 최종 연산의 종류
| 최종연산 | 설명 |
|---|---|
| void forEach(Consumer<'?' super T > action) | 각 요소에 지정된 작업 수행 |
| void forEachOrdered(Consumer<'?' super T > action) | `` |
| long count() | 스트림의 요소의 개수를 반환 |
| Optional<T> max(Comparator< '?' super T> comparator) | 스트림의 최대값 반환 |
| Optional<T> max(Comparator< '?' super T> comparator) | 스트림의 최소값 반환 |
| Optional<T> findAny() // 아무거나 하나 | 스트림 요소 하나를 반환 |
| boolean allMatch(Predicate<T> p) //모두 만족하는지 | 주어진 조건을 모든 요소가 만지, 만족시키지 않는지 확인 |
| boolean anyMatch(Predicate<T> p) //하나라도 만족하는지 | `` |
| boolean noneMatch(Predicate<T> p) //만족한는 값이 없는지 체크 | "" |
| Object[] toArray() | 스트림의 모든 요소를 배열로 반환 |
| A[] toArray(IntFunction<A[]> generator)//특정 타입의 배열로 반환 | `` |
| Optional<T> reduce(binaryOperator<T> accumulator) | 스트림의 요소를 하나씩 줄여가면서(리듀싱) 계산한다.|
| T reduce(T identit, BinaryOperator<T> accumulator) | `` |
| U reduce(U identity, BiFunction<U,T,U> accumulator, BinaryOperator<U> combiner) | `` |
| R collect(Collector<T,A,R> collector) | 스트림의 요소를 수집한다. 주로 요소를 그룹화하거나 결과를 컬렉션에 담아 반환하는데 사용된다.  |
| R collect(Supplier<R> supplier, BicConsumer<R,T> accumulator, BiConsumer<R,R> combiner) | `` |


#### 중간연산 살펴보기

1. skip(), limit()
	- Stream<T> skip(long n): 앞에서부터 n개 요소 건너뛰기(삭제하는 것이 아님. 건너뛰기)
	- Stream<T> limit(long maxSize): maxSize 이후의 요소는 잘라냄.
		``` java
		IntStream inStream = IntSteam.rangeClosed(1, 10); //12345678910
		intStream.skip(3).limit(5).forEacj(system.out::print); //45678
		```

2. filter(), distinct()
	-  Stream<T> filter(Predicate<T> prediacate : 조건에 맞지 않는 요소 제거
	-  Stream<T> distinct() : 중복제거
		``` java
		IntStream inStream = IntSteam.of(1,2,2,3,3,3,4,5,5,5)
		intStream.dstinct().forEach(System.out::print);//1,2,3,4,5
		
		
		IntStream inStream = IntSteam.rangeClosed(1, 10); //12345678910
		intStream.filter(i-> i%2==0).forEach(System.out::print);//2,4,6,8,10
		
		intStream.filter(i->i%2!==0 && i%3!=0).forEach(System.out::print);//두 조건식을 &&을 사용할 수도 있고 filter()를 연속으로 사용할 수도 있다.
		intStream.filter(i->i%2!==0).filter(i-> i%3!=0).forEach(System.out::print);
		```

3. sorted()
	- Stream<T> sorted() : 스트림의 요소를 기본정렬(Comparable)로 정렬
	- Stream<T> sorted(Comparator<T> comparator): 지정된 Comparator로 정렬
		```java
			 //CCaaabccdd 기본적으로 대문자가 먼저오고 소문자가 온다. 
			 strStream.sorted();
			 strStream.sorted(Comparator.naturalOrder());
			 strStream.sorted((s1,s2) -> s1.compareTo(s2));
			 strStream.sorted(String:compareTo);
			 
			 //ddccbaaaCC 위의 순서를 거꾸로 하여 소문자(내림차순)- 대문자(내림차순)
			 strStream.sorted(Comparator.reverseOrder());
			 strStream.sorted(Comparator.<Sting>naturalOrder().reversed())
			 
			 //aaabCCccdd String 클래스에 static으로 선언되어 있는 Enum을 선택하여 편하게 정렬할 수 있다. 
			 strStream.sorted(String.CASE_INSENSITIVE_ORDER.reversed())
			 
			 //ddCCccbaaa
			 strStream.sorted(String.CASE_INSENSITIVE_ORDER.reversed())
			 
			 //bddCCccaaa// 알파벳 순서 상관없이 연속한 글자의 개수대로 나온다. 
			 strStream.sorted(Comparator.comparing(String::length))
			 strStream.sorted(Comparator.comparingInt(String::length))
			 
			 //aaaddCCccb
			 strStream.sorted(Comparator.comparing(String::length).reversed())
		```

	3-1. Comparator의 comparing()으로 정렬 기준을 제공
			- comparing(Function<T, U> keyExtractor)
			- comparing(Function<T, U> keyExtractor, Comparator<U> keyComparator)
			- comparing은 Comparator 타입으로 반환한다.
			```java
				studentStream.sorted(Comparator.comparing(Student::getBan)) //반별로 정렬
				.forEach(System.out::println);
			```
			- 정렬 기준이 여러개일 경우, thenComparing()을 사용한다.(연속 사용가능)
			-  thenComparing(Comparator<T> other)
				thenComparing(Function<T, U> keyExtractor)
				thenComparing(Function<T, U> keyExtractor, Comparator<U> keyComp)
			```java
				studentStream.sorted(Comparator.comparing(Student::getBan) //반별로 정리
										.thenComparing(Student::getTotalScore) // 총점별로 정렬
										.thenComparing(Student::getName)) // 이름별로 정렬
										.forEach(System.out::println);
			```

4. map()
	- 스트림의 요소를 변화시켜 다른 타입 혹은 다른 값의 스트림으로 반환한다. 
	- Stream<R> map(Function<T, R> mapper) //Stream<T> -> Stream<R>
	```java
		Stream<File> fileStream = Stream.of(new File("Ex1.java"), new File("Ex1"), new File("Ex1.bak"), new File("Ex2.java"), new File("Ex1.txt"));
		Stream<String> filenameStream = fileStream.map(File::getName); // (File객체 f ) -> f.getName()
		filenameStream.forEach(System.out::println); // 스트림의 모든 파일의 이름을 출력

		fileStream.map(File::getName)// 파일 자체가 담긴 스트림을 파일이름(String)의 스트림으로 바꾸고
		.filter(s->s.indexOf('.') != -1)//확장자가 없는 파일명은 제외하고
		.map(s->s.substring(s.indexOf('.')+1))//. 뒤에 확장자 이름만 추출하고
		,map(String::toUpperCase)//이를 대문자로 변환
		.distinct()// 중복값 제거
		.forEach(System.out::print); //JAVABAKTXT
	```	

5. peek()
	- 스트림의 요소를 소비하지 않고 엿보기
	- 주로 스트림 작업이 잘 이루어 지는지를 확인하는 용도로 쓰인다. 
	- Stream<T> peek(Consumer<T> action // 중간연산(스트림의 요소 소비 X)
	- void forEach(Consumer<T> action) // 최종 연산(스트림의 요소 소비 O)
	```java
		fileStream.map(File::getName)
						.filter(s -> s.indexOf('.')!--1)
						.peek(s-> System.out.printf("filename=%s%n", s)) // 파일명 출력
						.map(s -> s.substring(s.indexOf('.')+1)) //확장자만 추출
						.peek(s -> System.out.printf("extension=%s%n", s)) // 확장자를 출력한다.
						.forEach(System.out.println); // 최종연산 스트림을 준비 
	```

6.flatMap()
	- 스트림의 스트림을 스트림으로 변환하는데 사용한다. 
	- Stream<String[]> strArrStrm = Stream.of(new String[]{"abc", "def", "ghi"}, new String("ABC", "GHI", "JKLMN"))
	
	- Stream<Stream<String>> strStrStrm = strArrStrn.map(Arrays::stream);//(arr)->Arrays.stream(arr)
	- map은 요소 전달받은 값 자체를 스트림으로 만들어준다. 때문에 배열 arr을 하나의 Stream으로 만들고 이를 감싸는 스트림의 요소로 넣는다.
	![[Pasted image 20220814163130.png]]
	
	-Stream<String> strStrStrm = strArrStrm.flatMap(Arrays::stream); 
	- map과 달리 flatMap은 주어지는 배열 arr자체가 아니라 arr의 요소들을 모아 하나의 스트림으로 담아주는 기능을 한다. 
	![[Pasted image 20220814163153.png]]

- 예시로 살펴보기 
	```java
	Stream<String[]> strArrStrm = Stream.of(new String[]{"abc", "def", "jkl"}, new String[]{"ABC", DEF", "JKL"} );
	
	Stream<Stream<String>> strStrmstrm = strArrStrm.map(Arrays::stream);
	Stream<String> strStrm = strArrStrm.flatMapp(Arrays::stream);
	
			strStrm.map(String::toLowerCase)
			.distinct()
			.sort()
			.forEach(System.out::println);
	
			String lineArr{
				"Believe or not It is true",
				"Do or do not There is no try", 
			};
		
			Stream<String> lineStream = Arrays.steram(lineArr);
			lineStream.flatMap(lin -. Stream.of(line.split(" +")))
							 .map(Strig::toLowerCase)
							 .distinct()
							 .sorted()
							 .forEach(System.out::println);
			}
	```


#### 최종연산 살펴보기
	- 최종 연산은 스트림의 요소를 소모하여 최종 결과값을 반환하는 스트림  메서드를 의미한다.
1. forEach(), forEachOrdered()
```java
void forEach(Consumer<T> action) //  병렬 스트림인 경우 순서가 보장되지 않음
void forEachOrdered(Consumer<T> action) // 병렬스트림인 경우에도 순서 보장됨
```
```java
IntStream.range(1,10).sequential().forEach(System.out::print);//12345
IntStream.range(1,10).sequential().forEachOrdered(System.out::print);//12345

IntStream.range(1,10).parallel().forEach(System.out::print);//41325
IntStream.range(1,10).parallel().forEachOrdered(System.out::print);//12345
```

2. allMatch(), anyMatch(), noneMatch()
```java
boolean allMatch(Predicate<T> predicate)
boolean anyMatch(Predicate<T> predicate)
boolean noneMatch(Predicate<T> predicate)
```
- 각각 모든 요소 만족 / 한 요소라도 만족하면 / 모든 요소가 만족하지 않으면 의 조건을 확인한다.
```java
boolean hasFailedStu = stuStream.anyMatch(s->s.getTotalScore()*<=100);
```

3. findFirst), findAny()
```java
Optional<T> findFirst() //첫번째 요소를 반환, 순차 스트림에 사용
Optional<T> findAny() // 아무거나 하나를 반환. 병렬 스트림에 사용
```
```java
Optional<Student>result = stuStream.filter(s -> s.getTotalScore()<100).   findFirst(); //filter의 조건을 만족하는 첫 요소를 반환
Optionall<Student>result = parallelStream.filter(s -> s.getTotalScore()<100).findAny() //filter의 조건을 만족하는 요소들 중 랜덤으로 한개 반환
```

4. reduce()
	- 스트림의 요소를 하나씩 줄여가며 누적연산 수행
```java
	Optional<T> reduce(BinaryOperator<T> accumulator)
	T                    reduce(T identity,  BinaryOperator<T> accumulator)
	U                    reduce (U identity, BiFunction<U,T,U> accumulator, BinaryOperator<U> combiner)  

	identity : 초기값
	accumulator : 이전 연산결과와 스트림의 요소에 수행할 연산, 즉 어떤 작업을 한 건지
	combiner : 병렬처리된 결과를 합치는데 사용할 연산(병렬 스트림)
```
```java
	int count = intStream.reduce(0, (a,b) -> a+1);
	int sum = intStream.reduce(0, (a,b) -> a+b);
	int max = intStream.reduce(Integer.MIN_VALUE, (a,b) -> a>b ? a : b);//max()
	int min = intStream.reduce(Integer.MAX_VALUE, (a,b) -> a<b ? a : b);//min()
```
##### 예시로 이해하기
															   

``` java
String[] strArr = {"Inheritance", "Java", "Lamda", "stream", "OptionalDouble", "IntStream", "count", "sum"};
	 Stream.of(strArr)
		 .parallel()
		 .forEachOrdered(System.out::println);// 병렬 쓰레드로 처리하더라도 순서는 유지

	boolean noEmptyStr = Stream.of(strArr).nonMatch(s -> s.lenth()==0);
	Optional<String> sWrod = Stream.of(strArr).parallel()//병렬 쓰레드로 작업처리(순서x)
															.filter(s -> s.charAt(0)=='s').findAny();//s로 시작하는 값중 아무거나 1개 반환
	//Stream<String>을 Stream<Integer>로 변환. (s) -> s.length()
	Stream<Integer> intStream1 = Stream.of(strArr).map(String:length);
	//배열의 요소를 map()을 활용해 각 요소의 문자열 길이를 스트림으로 반환(Array -> Stream<Integer>)

	IntStream intStream1 = Stream.of(strArr).mapToInt(String::length);
	IntStream intStream2 = Stream.of(strArr).mapToInt(String::length);
	IntStream intStream3 = Stream.of(strArr).mapToInt(String::length);
	IntStream intStream4 = Stream.of(strArr).mapToInt(String::length);
	
	int count = intStream1.reduce(0, (a,b) -> a+1)
	//초기값(identity) 0에서 시작해 스트림요소(b)가 나올 때 마다 +1 누적실행

	int sum = intStream1.reduce(0, (a,b) -> a+b)
	//초기값(identity) 0에서 시작해 스트림요소(b)가 나올 때 마다 +b 누적실행
	
	OptionalInt max = intStream3.reduce(Integer::max);//각 요소를 돌아가며 max값을 찾아 반환
	OptionalInt min =  intStream4.reduce(Integer::min);//각 요소를 돌아가며 min값을 찾아 반환
		
```

#### collector()와 Collectors
	- collect()는 Collector를 매개변수로 하는 스트림의 최종연산이다.
```java
Obejct collect(Collector collector) // Collector를 구현한 클래스의 객체를 매개변수로 갖는다.
Object collect(Supplier supplier, Biconsumer accumulator, Biconsumer combiner)//잘안쓰임
```
※ reduce()와 collector()차이
- 전자는 주어지는 스트림의 요소 전체를 소모하여 최종 결과를 반환한다.
- 후자는 주어지는 스트림의 요소를 나누고 그룹핑하여 최종결과를 그룹별로 각각 반환한다.

- Collector는 수집(collect)에 필요한 메서드를 정의해 놓은 인터페이스이다. 
```java
public interface Collector<T, A, R>{ T(요소)를 A에 누적한 다음, 결과를 R로 변환하여 반환
		Supplier<A> supplier();  // StringBuilder::new    누적할 곳(★)
		BiConsumer<A, T> accumulator();  //  (sb, s) -> sb.append(s)       누적방법(★)
		BinaryOperator<A> combiner(); // (sb1, sb2) -> sb1.append(sb2)    결합방법(병렬)
		Function<A, R> finisher(); // sb -> sb.toString()                                최종변환
		Set<Characteristics> characteristics(); // 컬렉터의 특성이 담긴 Set을 반환  // 컬렉터의 특성이 담긴 Set을 반환
	}
```
	- 위 예시처럼 collector인터페이스를 직접 구현하기 보다는 Collectors라는 구현 클래스를 활용하는 것이 일밙거이다. 다양한 기능의 컬렉터를 제공한다. 
		- 변환 : mapping(), toList(), toSet(), toMap(), Tocollecttion(),...
		- 통계 : counting(), summingInt(), averagingInt(), maxBy(), minBy(), summarizingInt(),....
		- 문자열 결합 : joining()
		- 리듀싱 - reducing()
		- 그룹화와 분할 - groupingBy(), partitioningBy(), collectingAndThen()
	
	※ collect() :최종연산 / Collector : 인터페이스 / Collectors : 클래스(구현체)

##### 스트림을 컬렉션, 배열로 변환
	- toList(), : 스트림을 List로
	- toSet(), : 스트림을 Set으로
	- toMap(), : 스트림을 Map으로
	- toCollection(): 스트림을 컬렉션으로(특정 컬렉션 클래스타입으로 만들 때 사용)
	
```java
List<String> names = stuStream.map(Strudent::getName) //Stream<Student> -> Stream<String>
ArrayList<String> list = names.stream().collect(Collectors.toCollection(ArrayList::new));
//Stream<String> -> ArrayList<String>
Map<String, Person> map = personStream.collect(Collectors.toMap(p -> p.getRegId(), p->p))// Stream<person> -> Map<String, Person>, Map은 키과 값을 따로 지정해 주어야 한다.   
```
	- 스트림을 배열로 변환할 경우 toArray() 메서드를 사용하는데 주의를 기울이자
	- toArray()의 반환 타입은 Object이다. 원한다면 특정 타입으로 형변환을 직접 해줘야 한다.
		- Student[] stuNames = studentStream.toArray(Student[]::new);(O)
		- Student[] stuNames = studentStream.toArray(); //에러 발생
		- Obejct[] stuNames = studentStream.toArray();
		- Student[] stuNames = (Studnet[])studentStream.toArray();//(X)

##### 스트림의 통계
	- counting()
	- summingInt
	- maxBy()
	- minBy()
```java
long count = stuStream.count();
//스트림의 모든 요소 count
long count = stuStream.collect(counting());//import static java.util.stream.Collectors.*;
//스트림의 모든 요소를 count하여 위 코드와 같으나 코드를 추가하여 부분 count도 가능하다.
```
```java
long totalScore = stuStream.mapToInt(Student::getTotalScore).sum(); //IntStream의 sum()
long totalScore = stuStream.collect(summingInt(Student::getTotalScore));
```
```java
OptionalInt topScore = studentStream.mapToInt(Student::getTotalScore).max();
Optional<Student> topStudent = stuStream.max(Comparator.comparingInt(Student::getTotalScore));
Optional<Student> topStudent = stuStream.collect(maxBy(Comparator.comparingInt(Student::getTotalScore)));
```

##### 스트림을 리듀싱
- reducing(): collectors를 통해 reduce() 대신 그룹별로 reducing이 가능해진다.
```java
Collector reducint(binaryOperator<T> op)
Collector reducing(T identity, BinaryOperator<T> op)//BinaryOperator는 reducing으로 수행할 누적 작업을 의미한다.
Collector reducing(U identity, Function<T,U> mapper, BinaryOperator<U> op)//map+reduce
//Function은 reducing에 필요한 데이터로 스트림 요소를 변환하는 작업을 의미한다.
```
```java
IntStream intStream = new Random().ints(1,46).distinct().limit(6);

OptionalInt max = intStream.reduce(Integer::max);//전체에 대한 리듀싱
Optional<Integer> max = intStream.boxed().collect(reducing(Integer::max));//그룹별 리듀싱 가능
```
```java
long sum = intStream.reduce(0,(a,b) - > a+b);
long sum = intStream.collect(reducing(0, (a,b)->a+b));
```
```java
int grandTotal = stuStream.map(Student::getTotalScore).reduce(0, INteger::sum);
int grandTotal = stuStream.collect(reducing(0, Student::getTotalScore, Integer::sum));
```
```java
String studentNames = stuStream.map(Student::getName).collect(joining());
String studentNames = stuStream.map(Student::getName).collect(joining(   ","  ));
String studentNames = stuStream.map(Student::getName).collect(joining( ","  ,  "["  ,  "]"  ));
String studentNames = stuStream.collect(joing(","));//Student의 ㅅoStirng으로 결합
```

##### 스트림의 그룹화와 분할

###### partitioningBy()
-partitioningBy() : 스트림의 요소를 2분할
```java
Collector partitioningBy(Predicate predicate)]
Collector partitioningBy(Predicate predicate, Collector downstream)
```
```java
Map<Boolean, List<Student>> stuBySex = stuStream
											.collect(partitioningBy(Student::isMale));
List<Student> maleStudent = stuBySex.get(true);//Map에서 남학생 목록을 얻는다.
List<Student> femaleStudent = stuBySex.get(false)//Map에서 여학생 목록을 얻는다. 
```
```java
Map<Boolean, Long> stuNumBySex = stuStream.collect(partitioningBy(Student::isMale, counting()));
System.out.println("남학생 수 :"+ stuNumBySex.get(true));//남학생 수 : 8
System.out.println("여학생 수 :"+ stuNumBySex.get(false));//여학생 수 : 10
```
```java
Map<Boolean, Optional<Student>> topScoreBySex = stuStream.collect(partitioningBy(Student::isMale, maxBy(comparingInt(Student::getScore))));
System.out.println("남학생 1등 : "+ topScoreBySex.get(true));//남학생 1등 : Optional[나자바, 남, 1,1,300]]
System.out.println("여학생 1등 : "+ topScoreBySex.get(false));//여학생 1등 : Optional[김지미, 여, 1,1,350]]
```
```java
Map<Boolean, Map<Boolean, List<Student>>> failedStuBySex = stuStream.collect(partitioningBy(Student::isMale, partitioningBy(s -> s.getScore()<150)));
//1. 성별로 분할 2. 성적으로 분할(150)
List<Student> failedMaleStu = failedStuBySex.get(true).get(true);
List<Student> failedFemaleSt = failedStuBySex.get(false).get(true);  
```

###### groupingBy()
- groupingBy() : 스트림의 요소를 N 분할 가능
```java
Collector groupingBy(Function classifier)
Collector groupingBy(Function classifier, Collector downstream)
Collector groupingBy(Function classifier, Supplier mapFactory, Collector dowstream)
```
```java
Map<Integer, List<Student>> stuByBan = stuStream.collect(groupingBy(Student::getBan, toList()));//학생을 반별로 그룹화 가능
```
```java
Map<Integer, Map<Integer, List<student>>> stuByHakAndBan =  // 다중 그룹화 stuStream.collect(groupingBy(Student::getHak,   // 1. 학년별 그룹(Key)
							groupingBy(Student::getBan)   // 2. 반별 그룹화(Value)
							));
```
```java
Map<Integer, Map<Integer, Set<Student.Level>>> stuByHakAndBan = stuStream.collect( 
			groupingBy(Student::getHak, // 1. 학년별 그룹(Key)
			groupingBy(Student::getBan, // 2. 반별 그룹화(Value이자 Key)
			mapping(s -> {
								if(s.getScore()>=200) return Student.Level.HIGH;
								else if(s.getScore() >=100) return Student.Level.MID;
								else return Student.Levle.LOW;
							},// 3.학년별 등급(Value)
							 toSet()) //maping  enum Level{HIGH, MID, LOW} // 3-1.학년별 등급을 Set으로 타입을 설정함
				))// groupingBy()
		);  // collect()
```
