---
layout: single
title:  "컬렉션 프레임워크(Collection Framework) 1편"
categories: JAVA 
tag: [JAVA, 컬렉션프레임워크, ArrayList, LinkedList, 자바의 정석]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 2022-02-02

## ✍ 컬렉션 프레임웍(Collections framework) 1편 

<!--Quote-->
> *본 내용은 자바의 정석을 바탕으로 작성*  

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


### 컬렉션 프레임웍의 핵심 인터페이스

1. List : 순서가 있는 데이터 집합, 데이터의 중복 허용 
   ex) 대기자 명단, 보통 ArrayList와 LinkedList를 사용
2. Set : 순서가 없는 데이터 집합, 데이터의 중복 허용 금지 
   ex) 양의 정수집합
3. Map : 키와 값의 쌍으로 이루어진 데이터의 집합, 순서 유지(X), 키 → 중복 허용 금지, 값 → 중복 허용  
   ex) 우편번호, 지역번호 , 키 → ID , 값 → 비밀번호라 생각 

## ArrayList

- 데이터의 저장공간으로 배열을 사용
    
    ```java
    class Example {
    	public static void main(String[] args) {
    		ArrayList list1 = new ArrayList(10);
    		list1.add(new Integer(5)); // lis1.add(5) 랑 같다 // autoboxing에 의해 기본형이 참조형으로 자동 변환
    		list1.add(new Integer(2));
    		list1.add(new Integer(4));
    		list1.add(new Integer(0));
    		Collections.sort(list1);   // list1을 정렬한다. 기본은 오름차순으로 [0,2,4,5]출력
    
    		ArrayList list2 = new ArrayList(list1.subList(1,3)); //  [2,4]출력 
    		list1.containsAll(list2) // list1안에 list2를 포함하고있냐? boolean 값으로 나옴
    		list2.add("b")  // [2,4,b] 출력
    		list2.add(1,"A") // 1번 인덱스에 A삽입 // [2,A,4,b] 출력 
    		list2.remove(2) // 2번 인덱스를 삭제해라 
    		list2.remove(new Integer(2)) // 정수 2를 삭제해라 
    	}
    }
    ```
    

![arrayList.png](/assets/images/posts/2022-02-02/arrayList.png)

- 1번식으로 하면 성능이 안좋아서 2번식으로 하는게 좋다

## 배열

- 배열은 구조가 간단하고 데이터를 읽는 데 걸리는 시간이 짧다
- 크기를 변경할 수 없다
- 비순차적인 데이터의 추가, 삭제에 시간이 많이 걸린다

## LinkedList

1)장점 

- 배열의 단점을 보완 → 배열과 달리 불연속적으로 데이터를 연결
- 데이터의 삭제 : 단 한 번의 참조변경만으로 가능
- 데이터의 추가 : 한번의 Node 객체 생성과 두 번의 참조변경만으로 가능

2)단점

- 데이터 접근성이 나쁨 →  0x200 에서 0x400으로 한번에 못가고 한칸씩 옮겨서 가야한다
    
    ![linkedlist.png](/assets/images/posts/2022-02-02/linkedlist.png)
    

 

### 더블링크드리스트 (Doubly LinkedList)

- 위의 단방향성의 단점을 개선하고자 나옴
- 접근성이 향상되었지만, 앞 뒤로의 이동만 좋아짐

![double.png](/assets/images/posts/2022-02-02/double.png)

   

### 더블써큘려링크드리스트

- 더블링크드리스트 (Doubly LinkedList) 보다 접근성을 더 향상시킴
- 더블 링크드리스트의 첫 번째 요소와 마지막 요소를 서로 연결  시킴 → 예를 들면 채널 1에서 아래로 채널을 내리면 99번을 가는 것과 같은 원리

![circular.png](/assets/images/posts/2022-02-02/circular.png)

## ArrayList vs LinkedList

1. 순차적으로 데이터를 추가/삭제  ArrayList가 더 빠름
2. 비순차적으로 데이터를 추가/삭제 LinkedList가 더 빠름 
3. 접근시간(access time)은 ArrayList가 더 빠름 

## Iterator

```java
import java.util.*;

class Example {
	public static void main(String[] args) {
		Collection c = new TreeSet();  // set과 list는 Collection의 자손 
		Collection c2 = new ArrayList();  //

		ArrayList list = new ArrayList();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");

		// 만약 위의 ArrayList가 아닌 HashSet이 이여도 오류가 안난다 
		Iterator it = list.iterator();

		while(it.hasNext()) { //hasNext() 읽어올 요소가 있는지 확인
			Object obj = it.next();  // next() 요소를 읽어오기 
			System.out.println(obj); 
		}
		// 위와 같은 표현 // 만약 위의 ArrayList가 아닌 HashSet이면 오류가 난다 
		for(int i=0; i<list.size(); i++) {
			Object obj = list.get(i);
			System.out.println(obj);
		}
	} // main
}
```

<details>
<summary>👈Tip</summary>
<div markdown="1">       
list와 set은 collection이 자손이다 → 다형성 활용 가능
</div>
</details> 


## 📑 출처 

 - [자바의 정석 카페](https://cafe.naver.com/javachobostudy) 
 - [자바의 정석 유튜브](https://www.youtube.com/user/MasterNKS)