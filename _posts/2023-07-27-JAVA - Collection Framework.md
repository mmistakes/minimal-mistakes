---
layout: single
title:  "JAVA - Collection Framework"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆Collection Framework

**<인터페이스 종류 및 구현 클래스>**

| 인터페이스 | 종류                                           | 구현 클래스              |
| :--------: | ---------------------------------------------- | ------------------------ |
|    List    | 순서유지, 저장, 중복저장O                      | ArrayList, LinkedList 등 |
|    Set     | 순서유지, 저장, 중복저장X                      | HashSet, TreeSet 등      |
|    Map     | 키와 값을 쌍으로 저장, 순서유지X, 키 중복저장X | HashMap, TreeMap 등      |

<br>







# ◆List





## 1)ArrayList

**메서드**

![collection framwork - arraylist](C:\Users\hwang\pueser.github.io\images\2023-07-27-JAVA Colection Framework\collection framwork - arraylist.png)

```java
public class Generic {

	public static void main(String[] args) {
		List<String> arr = new ArrayList<>();
		
        // add
		arr.add("ab");
		arr.add("cd");
		arr.add("ef");
		
        // remove
		arr.remove(0);
		System.out.println(arr.get(0)); // cd
		
        // contanins
		System.out.println(arr.contains("ab")); // true
		
        // clear
		arr.clear();
		System.out.println(arr); //[]
		
        // get
		System.out.println(arr.get(0));

	}

}
```

<br>







# ◆Set

-Set컬렉션은 순서 자체가 없으므로 중복허용 안됨. 인덱스로 객체를 검색해서 가져오는 get(index) 메서드도 존재하지 않는다.<br> 대신 전체 객체를 대상으로 한 번씩 반복해서 가져오는 반복자(Iterator)를 제공한다. 

![collection framwork - set](C:\Users\hwang\pueser.github.io\images\2023-07-27-JAVA Colection Framework\collection framwork - set.png)

```java
public static void main(String[] args) {
		Set<String> set = new HashSet<>();
		
		set.add("ab");
		set.add("bc");
		set.add("de");
		
        // remove
        set.remove("ab");
		System.out.println(set); // [bc, de]
		
        // contanins
		System.out.println(set.contains("a")); // false
		
        // clear
		set.clear();
		System.out.println(set); // []
		
        //출력
        System.out.println(set); // [ab, cd, ef]
}
```

<br>





​		

# ◆Map

-key로 value를 얻어낸다.  따라서 Map 컬렉션은 키(key)로 데이터를 관리한다.

![collection framwork - map](C:\Users\hwang\pueser.github.io\images\2023-07-27-JAVA Colection Framework\collection framwork - map.png)

```java
public static void main(String[] args) {
		Map<String, String> map = new HashMap<>();
		
		map.put("1", "짱구");
		map.put("2", "훈이");
		map.put("3", "맹구");
		
		System.out.println(map.keySet()); //[1, 2, 3]
		System.out.println(map.get("1")); // 짱구
		System.out.println(map.entrySet()); // [1=짱구, 2=훈이, 3=맹구]
	}
```

<br>







# ◆length / length() / size() 기본 사용법

```java
 public static void main(String[] args){

        int[] lengthTest1 = new int[7];
        System.out.println( lengthTest1.length );  // 7
        
        String lengthTest2 = "lengthSizeTest";
        System.out.println( lengthTest2.length() );  // 14

        ArrayList<Object> sizeTest = new ArrayList<Object>();
        System.out.println( sizeTest .size() );  // 0
        
    }
```



### **1. length**

 \- **arrays(int[], double[], String[])**

 \- **length**는 **배열의 길이**를 알고자 할때 사용된다.

 

### **2. length()**

 \- **String related Object(String, StringBuilder etc)**

 \- **length()**는 **문자열의 길이**를 알고자 할때 사용된다.

 

### **3. size()**

 \- **Collection Object(ArrayList, Set etc)**

 \- **size()**는 **컬렉션프레임워크 타입의 길이**를 알고자 할때 사용된다.



