---
layout: single
title:  " DAY-15. 자바 제네릭,IO스트림"
categories: JAVA-academy
tag: [JAVA, 제네릭, IO스트림]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-22

## 자바

<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


# 2022-03-22

## 1️⃣ 제네릭(Generic)

> ArrayList에 저장할 자료를 명시해주는 것
> 

```java
	ArrayList tempArr = new ArrayList<>();
	// 제네릭(Generic) -> ArrayList도 결국 배열 -> ArrayList에 저장할 자료를 명시해주는 것
	ArrayList<String> strList = new ArrayList<>(); // String만 가능
		
	tempArr.add("apple");
	tempArr.add(10);
	tempArr.add(true);
	
	// 제네릭을 사용하면 저장할 데이터의 타입을 걸러준다
	strList.add("apple");
	// strList.add(10);
	// strList.add(true);

	
	// apple 값에서 a 값만 뽑아내고 싶다.
	char a = ((String)tempArr.get(0)).charAt(0);
	
	// 제네릭을 사용하게 되면 강제 형변환이 필요가 없어진다.
	System.out.println(strList.get(0).charAt(0)); // a
```

- 제네릭 사용을 하면 String으로 명시를 미리 하기에 형변환없이 charAt 사용 가능

## 2️⃣ Wrapper Class

```java
	ArrayList<Integer> intList = new ArrayList<>();
	intList.add(10);
	intList.add(50);
```

- 기본 자료형들을 감싸고 있는 클래스 -> 기본 자료형을 마치 클래스처럼 사용하는게 가능하도록 해줌
- char와 int 는 Character와 Integer를 사용해야 한다

## 3️⃣ 예외 처리

```java
	try {
		menu = Integer.parseInt(sc.nextLine());
	}catch(Exception e) {
		System.out.println("숫자가 아닌 값을 입력할 수 없습니다.");
		e.printStackTrace();
		continue;
	}
```

- **e.printStackTrace() : 에러의 발생근원지를 찾아서 단계별로 에러를 출력**
- **e.getMessage() : 에러의 원인을 간단하게 출력**
- **e.toString() : 에러의 Exception 내용과 원인을 출력**

### e.printStackTrace()

![1.png](/assets/images/posts/2022-03-22/1.png)

## 4️⃣ 코드 리뷰

### Netflix 프로그램 DAO 코드 비교 해보기

### 1) 내 코드

```java
ArrayList<Membership> list = new ArrayList<>();
	
	// 값 추가 
	public void insert(Membership membership) {
		list.add(membership);
	}
	
	// 값 보여주기 
	public void show() {                 
		for(Object showMe : list) {
			System.out.println(showMe);
		}
		System.out.println("");
	}
	
	// 값 검색하기 
	public void search(String id) {
		for(int i = 0; i < list.size(); i++) {
			if(((Membership)list.get(i)).getId().equals(id)) {
				System.out.println(list.get(i));
			}
		}
		System.out.println();
	}
	
	// 값 수정하기 
	public void modify(String id, String nickname, int point) {
		System.out.println();
		for(int i = 0; i < list.size(); i++) {
			if(((Membership)list.get(i)).getId().equals(id)) {
				((Membership)list.get(i)).setNickname(nickname);
				((Membership)list.get(i)).setPoint(point);
			}
		}
	}
	
	// 값 삭제하기
	public void delete(String id) {
		for(int i = 0; i < list.size(); i++) {
			if(((Membership)list.get(i)).getId().equals(id)) {
				list.remove(i);
			}
		}
	}
```

- 제네릭을 사용해서 타입을 Membership으로 고정해서 ((Membership)list.get(i)).getId().equals(id)) 처럼 쓸필요가 없이 list.get(i)).getId().equals(id) 같이 표현
- 반환타입도 void가 아닌 Membership과 ArrayList<Membership> 등으로 사용
- 특히 값 보여주기 에서 void가 아닌 반환타입을 ArrayList<Membership> 하고 return 으로 list로 주는거에서 차이를 보임
- 강사님은 메서드를 void로 거의 두지 않음

## 5️⃣ IO 스트림

```java

	// 파일을 객체로(인스턴스화) 만들어 사용
	File file = new File("test.txt"); // 파일 생성자 인자값 : HDD 해당 파일의 경로 값 + 파일명 + 확장자
		
	System.out.println("이 파일이 실제로 존재하는가? " + file.exists()); // true or false 로 출력 
	System.out.println("파일인가? " + file.isFile()); // true or false 로 출력 
	System.out.println("폴더인가? " + file.isDirectory()); // true or false 로 출력 
	System.out.println("파일의 크기 : " + file.length()); // 데이터가 없으면 0 출력
	System.out.println("파일의 정대 경로 : " + file.getAbsolutePath()); // 파일 경로 찾기 
	System.out.println("파일의 이름 : " + file.getName()); // test.txt // 이름 얻기 
	
		
	// 실행 시키고 프로젝트를 refresh 하면 파일이 자동으로 생긴다
	// 파일 만들기 
	File newFile = new File("new.txt");
	if(!newFile.exists()) {
		try {
			newFile.createNewFile();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
		
	// 폴더 만들기 
	File newFolder = new File("newFolder");
	if(!newFolder.exists()) {
		// make directory의 약자 mkdir
		newFolder.mkdir();
	}
```

- Checked Exception : 코드가 실제 실행되기도 전에 에러가 발생할 수 있다고 보여지는 에러 -> try catch 필
