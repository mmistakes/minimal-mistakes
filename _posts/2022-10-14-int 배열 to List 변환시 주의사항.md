---
layout: single
title: "원시타입 배열과 list의 변환시 주의사항"
categories: JAVA
author_profile: false
sidebar:
    nav: "docs"
---

## 원시타입 배열과 list의 변환시 주의사항

  - 배열 to list의 방법은
    1. Arrays.asList()
    2. new ArrayList<>(Arrays.asList())
    3. Collectors.toList()
  - 이렇게 3가지가 있었다.
  - 여기서 1번 Arrays.asList()는 String과 같은 클래스 타입은 가능하지만 원시타입의 배열에는 사용이 불가능하다.

  ```java
  public static void main(String[] args) {                
    // int 배열        
    int[] arr = { 1, 2, 3 };         
    // Arrays.asList()        
     List<int[]> intList = Arrays.asList(arr);         
     // 결과 출력        
     System.out.println(intList.size()); // 1        
     System.out.println(intList.get(0)); // I@71bb301        
     System.out.println(Arrays.toString(intList.get(0)));  // [1, 2, 3]     }
출처: https://hianna.tistory.com/552 [어제 오늘 내일:티스토리]

  ```
  - 배열을 list로 바꾼 후 요소를 출력하면 요소의 값이 아닌 요소를 담고 있는 배열타입의 리스트(List<int[]>) 타입의 값(I@71bb301)이 반환된다.
  - 이것은 Arrays.asList()내에 원시 타입을 랩퍼 클래스로(여기서는 int에서 Integer로) 형변환하는 기능이 없기 때문이다.

  ### 원시타입을 List로 만들기
  - 원시타입을 List로 변형하기 위해서는 2가지 방법이 있다.
    1. 반복문을 통해 직접 값을 하나씩 대입
    2. stream활용하기

### 반복문 사용
    ``` java
    public static void main(String[] args) {                
      // int 배열        
      int[] arr = { 1, 2, 3 };         
      // int -> List        
      List<Integer> intList = new ArrayList<>();        
      for (int element : arr) {            
        intList.add(element);        
      }                
      // List 출력        
      System.out.println(intList.size()); // 3        
      System.out.println(intList); // [1, 2, 3]     
    }

    ```
    - for문과 같은 반복문을 통해 일일이 하나씩 넣어준다.


### Stream 사용하기
    ```java
    public static void main(String[] args) {                
      // int 배열        
      int[] arr = { 1, 2, 3 };         
      // int -> List        
      List<Integer> intList = Arrays.stream(arr) ①                        
                                  .boxed() ②                       
                                  .collect(Collectors.toList()); ③              
      // List 출력        
      System.out.println(intList.size()); // 3        
      System.out.println(intList); // [1, 2, 3]     
    }

    ```
    - ① : stream을 통해 배열의 값들을 하나씩 순환 할 준비를 한다.
    - ② : 원시타입을 모두 래퍼클래스로 바꿔준다(boxed)
    - ③ : collect()를 통해 반환할 타입을 지정하고(Collectors.toList()) 해당 타입으로 요소들을 반환하다.
    - 반환된 요소들이 리스트에 Wrapper 클래스 타입으로 저장된다.
