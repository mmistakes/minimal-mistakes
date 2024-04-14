---
layout: single
title: "[자바스크립트_개념정리] 배열 메서드 filter, some, every, reduce"
typora-root-url: ../
---





> #### filter()



<span style="font-size:85%">콜백을 전달해서 이 콜백이 참인지 거짓을 반환하는 불리언 함수를 인수로 받아야 한다</span>

<span style="font-size:85%">콜백이 어떤 요소에 대해 참을 반환하면 그 요소는 필터링된 새 배열에 추가된다</span>

<span style="font-size:85%">이때 기존의 배열이 수정되는 것이 아니다</span>

<br>

**<span style="font-size:90%">[ filter()와 화살표 함수 활용 연습 ]</span>**

<span style="font-size:85%">배열의 각 요소를 함수로 전달해서 참이 반환되면 해당 요소는 필터링되어서 만들어진 새 배열에 추가됨</span>

<img src="/images/2024-04-07-method_array2/image-20240410111320395.png" alt="image-20240410111320395" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array2/image-20240410111333578.png" alt="image-20240410111333578" style="zoom:50%;" />

<span style="font-size:85%">=> numbers 배열에서 짝수만 추출한 새로운 배열이 만들어 짐</span>



<br>

<span style="font-size:85%">- 평점이 높은, 새로운, 오래된 요소 등 어떠한 특징을 필터링할 때 유용</span>



<span style="font-size:85%">[ 2020년 이후 개봉 영화 ]</span>

<img src="/images/2024-04-07-method_array2/image-20240410142221921.png" alt="image-20240410142221921" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array2/image-20240410142311333.png" alt="image-20240410142311333" style="zoom:50%;" />

<span style="font-size:85%">=> 개봉일이 2020년도 이후인 최신 영화를 필터링한 결과 2022년도에 개봉한 스파이더맨이 추출된 배열이 생김</span>

<bt>



<span style="font-size:85%">[ 평점이 높은 영화 제목 ]</span>

<img src="/images/2024-04-07-method_array2/image-20240415004828355.png" alt="image-20240415004828355" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array2/image-20240410143513407.png" alt="image-20240410143513407" style="zoom:50%;" />

<span style="font-size:85%">=> filter()를 사용해서 평점이 90점 이상인 영화를 변수 goodMovies에 저장한 후, </span>

<span style="font-size:85%"> map()을 사용해서 goodMovies의 영화 제목들로 이뤄진 배열을 추출한다.</span>

<span style="font-size:85%">필터한 결과를 변수에 저장하고, 매핑의 결과값도 변수에 저장하여 만드는 방법으로 과정이 복잡하다</span>

<br>

<img src="/images/2024-04-07-method_array2/image-20240410144417789.png" alt="image-20240410144417789" style="zoom:50%;" />

<span style="font-size:85%; color:orangered">=> 필터와 매핑의 결과를 각각 변수에 저장하지 않고 필터링한 값에 map메서드를 바로 사용하여 배열을 만든다</span>

<br>

<br>

<br>



> #### some(), every()



<span style="font-size:85%">불리언 메서드로 어떠한 특성을 테스트할 수 있는 방법</span>

<span style="font-size:85%">새 배열을 반환하는 map, filter 메서드와 달리 some, every는 항상 참이나 거짓을 반환</span>

<br>

<br>

#### every()



<span style="font-size:85%">배열 내의 모든 요소가 every() 메서드를 통해 테스트를 거쳐서 참, 거짓을 반환하는데</span>

<span style="font-size:85%; color:orangered">요소 중 하나라도 콜백에서 거짓을 반환하면 전체 every가 거짓이 됨</span>

<br>

**<span style="font-size:90%">[ every()와 화살표 함수 활용 연습]</span>**

<img src="/images/2024-04-07-method_array2/image-20240410153003393.png" alt="image-20240410153003393" style="zoom:50%;" />



<img src="/images/2024-04-07-method_array2/image-20240410153331211.png" alt="image-20240410153331211" style="zoom:50%;" />

<span style="font-size:85%">=> 평점이 90이 넘지 않는 영화가 하나 있기 때문에 false 값이 나오고, 80이상인지의 테스트에서는 true가 나옴</span>

<br>

<br>

#### some()



<span style="font-size:85%">배열 요소 중 하나 또는 일부가 테스트를 통과하는지의 여부를 판단</span>

<span style="font-size:85%; color:orangered">배열 중 참인 요소가 하나 이상이면 참을 반환</span>

<br>

**<span style="font-size:90%">[ some()와 화살표 함수 활용 연습]</span>**

<img src="/images/2024-04-07-method_array2/image-20240410153655805.png" alt="image-20240410153655805" style="zoom:50%;" />

<span style="font-size:85%">=> 개봉일이 2000년도 이전인 영화는 '노팅힐' 하나가 있기 때문에 true를 반환</span>

<br>

<img src="/images/2024-04-07-method_array2/image-20240410153919879.png" alt="image-20240410153919879" style="zoom:50%;" />

<span style="font-size:85%">=> 평점이 90점 이상인 영화가 세개이기 때문에 true</span>

<span style="font-size:85%">영화제목의 길이가 2글자 이하인 영화는 없기 때문에 false</span>



<br>

<br>

<br>

>  #### reduce()



<span style="font-size:85%">배열의 요소를 비교하거나 더하기 곱하기 등을 통해 점차 줄여나가다가 최종적으로 하나의 값만 남긴다.</span>

<span style="font-size:85%">두 개의 매개변수를 가지는데</span>

<span style="font-size:85%">**첫 번째 매개변수(accumulate)**는 총 합계를 나타내며 줄여나가야 하는 대상</span>

<span style="font-size:85%">**두 번째 매개변수(currentValue)**는 현재의 값으로 각각의 개별 요소를 나타냄</span>

<br>

**<span style="font-size:90%">[syntax]</span>**

```javascript
배열.reduce((accumulate, currentValue) => {
  return 두 매개변수를 활용한 실행문;
})
```

<br>

**<span style="font-size:90%">[ reduce() 구문 연습(암시적 반환) - 가격 합계 구하기 ]</span>**

<img src="/images/2024-04-07-method_array2/image-20240410174322307.png" alt="image-20240410174322307" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array2/image-20240410174335185.png" alt="image-20240410174335185" style="zoom:50%;" />

<span style="font-size:85%">=> 처음에는 500이 total에 인수로, 700이 price에 인수로 전달되어 둘을 합한다</span>

<span style="font-size:85%"> 두번째 순환에서 500과 700을 합한 1200이 total로, 450이 price가 되어 둘을 합하며</span>

<span style="font-size:85%"> 이러한 방식이 마지막 순환까지 반복된다</span>

<br>

**<span style="font-size:90%">[ reduce()로 배열 내에서 최댓값/최솟값 구하기 ]</span>**

<img src="/images/2024-04-07-method_array2/image-20240410180142742.png" alt="image-20240410180142742" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array2/image-20240410180217703.png" alt="image-20240410180217703" style="zoom:50%;" />

<span style="font-size:85%">=> 처음에 500이 min/max, 700이 price로서 둘을 비교하면</span>

<span style="font-size:85%"> min에서는 500이, max에서는 700이 남으며 이들은 두 번째 순환에서 다음 요소인 450과 비교한다</span>

<span style="font-size:85%"> 이러한 비교를 마지막 요소인 1200까지 반복하여 마지막 남은 하나의 요소만 반환한다</span>

<br>

<br>

<span style="font-size:90%; color:green">[ 첫 번째 매개변수(accumulate) 시작점 지정하는 방법 ]</span>

<span style="font-size:85%">두번째 인수를 추가한다</span>

<span style="font-size:85%">이때 이 인수는 reduce함수에 추가하는 매개변수가 아니며</span>

<span style="font-size:85%">이 두번째 인수가 reduce함수의 초기값이 된다</span>
<br>

<img src="/images/2024-04-07-method_array2/image-20240410183120019.png" alt="image-20240410183120019" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array2/image-20240410183245535.png" alt="image-20240410183245535" style="zoom:50%;" />

<span style="font-size:85%">=> 초기값을 지정하기 전에는 배열 요소의 합인 21이 반환되고, 초기값을 100으로 지정한 후 121이 반환됨</span>

