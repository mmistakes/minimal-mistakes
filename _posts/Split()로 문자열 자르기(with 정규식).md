# String[] split(String regex)
	- split()는 정규표현식 혹은 특정 문자를 기준으로 문자열을 나누는 기능과 나눈 문자열을 배열로 반환하는 기능을 하는 메서드.


## 예시를 통한 split()의 이해 
```java
String str = "가,나,다,라,마,바,사"
String[] korAlph = str.split(",");//"가","나","다","라","마","바","사",

String str2 = "010-1234-5678";
String[] mobNum = str.split("-");
String ret1 = mobNum[0];//"010"
String ret2 = mobNum[1];//"1234"
String ret3 = mobNum[2];//"5678"

```


# String[] split(String regex, int limit)
- 두번째 인자로 받은 int limit은 반환하는 배열의 크기를 의미합니다. 
```java
String str = "12-34-56789-0"
String[] arr =  str.split("-", 2);
arr[0];//"12"
arr[1];//"34-56789-0"

```
- 반환되는 배열의 크기를 2로 정했으니 앞에 들어간 값을 제외한 나머지가 마지막 배열의 값이 된다.
