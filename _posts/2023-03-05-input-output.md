---
layout: single
title: "[입출력] BufferedReader vs Scanner"
categories: JAVA
tag: [JAVA, BufferedReader, Scanner, TIL]
toc: true
toc_sticky: true
toc_label: 🦗목차
---

## 🌼TIL 개요
BufferedReader와 Scanner는 Java에서 입력 스트림에서 데이터를 읽는 데 사용되는 두 가지 클래스입니다. 그러나 각각의 클래스는 사용 방법과 목적이 다릅니다.

## 🍏 BufferedReader
BufferedReader는 입력 스트림에서 문자열을 읽어들이는 데에 사용됩니다. 데이터를 한 번에 읽고 저장하며, 버퍼링이 되기 때문에 매우 빠른 속도로 데이터를 읽어올 수 있습니다. 이 클래스는 기본적으로 문자 입력 스트림을 처리하기 때문에, 문자열을 읽는 데에 효과적입니다.

아래는 BufferedReader로 입력 받는 간단한 코드 예시입니다.

~~~java
import java.io.*;

public class BufferedReaderExample {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String name = br.readLine();
        int age = Integer.parseInt(br.readLine());
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
~~~

위 예제에서는 BufferedReader를 사용하여 표준 입력에서 사용자 이름과 나이를 읽어들이고, 이를 출력합니다.


## 🍎 Scanner
Scanner는 BufferedReader와 마찬가지로 입력 스트림에서 데이터를 읽는 데 사용됩니다. 그러나 Scanner는 정규 표현식을 사용하여 토큰을 구분하기 때문에, 문자열, 숫자, 불리언 값 등 다양한 유형의 데이터를 처리할 수 있습니다.

아래는 Scanner를 사용하여 입력 받는 간단한 코드 예시입니다.

~~~java
import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
~~~



위 예제에서는 Scanner를 사용하여 표준 입력에서 사용자 이름과 나이를 읽어들이고, 이를 출력합니다.

## 🌼BufferedReader VS Scanner
BufferedReader와 Scanner는 각각의 장단점이 있습니다.


## 🍏BufferedReader의 장단점
- 문자열을 읽어들일 때 주로 사용(문자열만 처리하기 때문에, 불필요한 파싱 작업이 없음)
- 대용량 텍스트 파일을 읽을 때 매우 유용
- 문자열을 라인 단위로 읽어들이기 때문에 readLine() 메서드를 사용하여 한 줄씩 읽어옴


## 🍎Scanner의 장단점
- 기본 타입과 문자열을 함께 읽어들일 때 사용
- 데이터를 파싱하여 형변환을 자동으로 수행하므로 매우 편리
- Scanner는 정규 표현식을 사용하여 토큰을 분리할 수 있기 때문에, 다양한 유형의 데이터를 처리할 수 있음
- Scanner는 기본형 데이터 형식을 지원하기 때문에, parseInt()나 parseDouble() 등을 사용하여 타입 변환을 할 필요가 없음
- BufferedReader보다는 성능이 떨어지는 경향이 있음

<img src="C:\Git\programinglong.github.io\images\${filname}\지롱 김혜련.png" alt="지롱 김혜련" style="zoom:25%;" />



