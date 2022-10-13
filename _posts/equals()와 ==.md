## equals() vs ==

equals와 ==는 서로 같은 기능을 하지만 주요한 차이가 있다.

1. equals는 메소드이지만 ==는 연산자이다.

2. 주소값 비교와 내용비교
  - equals는 비교하려는 대상 자체를 비교하지만
  - ==는 비교하려는 대상의 주소값을 비교한다.

```java

Queue<String> move = new LinkedList();
       String[] a = operation.split("");

       for (String s : a) {
           move.offer(s);
       }
       //move = [R, R, D, L, L, D]
       // 현재위치 변수 생성
       int row =0;
       int column =0;
       int output = 0;// 점수를 담을 변수 생성
       int k =0;
//        while(!move.isEmpty()){
       for(int i=0; i<a.length;i++){

           //이동명령(operation)을 하나씩 반환
           String moving = move.poll();

           //만약 R이면 현재위지에서 [][+1], 해당 위치의 값이 1이면 점수+1
           if(moving.equals("R")) {
               ++column;
           }           
```

### Call by Value and Call by Reference

#### Call by Value
  - 함수의 인자를 전달할 때 "값"을 전달하는 방식
  - 해당 인자의 값은 어느 곳을 가더라도 바뀌지 않는다.
  - 같은 변수명일지라도 해당 메서드, 클래스 내에서 새로 초기화한다면 초기화한 그 값으로 설정된다.
  - 즉 변수명을 복사하여 새로운 변수를 선언하는 것이다.
  - 단 초기화한 변수와 기존의 변수는 다른변수이기에 기존 변수의 값은 변하지 않는다.
#### Call by Reference
  - 함수의 인자를 전달할 때 "주소"를 전달하는 방식
  - 동일한 변수명을 가진다는 것은 Call by Value와 같지만 새로운 변수가 아닌 기존의 변수를 그대로 사용한다
  - 이때 해당 변수는 자료의 기본형이 아닌 참조형이다. 따라서 어떠한 객체의 참조값(주소)를 담게 된다.
  - 동일한 참조변수를 갖기에 서로 선언된 위치는 달라도 하나로 연결된 동일한 변수(참조변수)인 것이다.
