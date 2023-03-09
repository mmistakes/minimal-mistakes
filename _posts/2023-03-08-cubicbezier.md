### cubic-bezier란?

> 베지어 곡선은 부드러운 곡선을 모델링하기 위해 컴퓨터 그래픽에서 널리 사용된다. 커브가 컨트롤 포인트의 볼록한 선체에 완전히 포함되어 있기 때문에 점을 그래픽으로 표시하고 직관적으로 커브를 조작하는 데 사용할 수 있다. 변환 및 회전과 같은 어피니션 변환은 곡선의 제어점에 각각의 변환을 적용하여 곡선에 적용 할 수 있다.  							( 출처: 위키피디아 )

cubic-bezier는 애니메이션의 움직임을 곡선 그래프로 표현한것이다.
[![linear](https://github.com/sasimiseo/sasimiseo.github.io/blob/master/_posts/post_images/2023-03-09-linear.png?raw=true "linear")](http://https://github.com/sasimiseo/sasimiseo.github.io/blob/master/_posts/post_images/2023-03-09-linear.png "linear")
cubic-bezier(0.250, 0.250, 0.750, 0.750) 여기서 숫자들이 표현하는것은 점 x1, y1, x2, y2를 의미하는것이다. 위의 그래프가 일직선이므로 애니메이션은 일정한 속도로 작동한다.

[![linear](https://github.com/sasimiseo/sasimiseo.github.io/blob/master/_posts/post_images/2023-03-09-easeInOut.png?raw=true "easeInOut")](http://https://github.com/sasimiseo/sasimiseo.github.io/blob/master/_posts/post_images/2023-03-09-easeInOut.png "easeInOut")
이 그래프는 시작과 끝부분이 휘어있는것을 볼수있다.  결과는 처음은 느리게 움직이다가 빨라지며 다시 느리게 마무리된다. 밑의 코드의 linear은 첫번째 그래프 easeInOut은 두번째 그래프로 직접 확인해보자.
<iframe height="300" style="width: 100%;" scrolling="no" title="cubic-bezier" src="https://codepen.io/sasimi_seo/embed/KKxyzVY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sasimi_seo/pen/KKxyzVY">
  cubic-bezier</a> by Seo YooJoon (<a href="https://codepen.io/sasimi_seo">@sasimi_seo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 참고하기 좋은 사이트
https://matthewlein.com/tools/ceaser
곡선그래프를 마우스로 조정하여 쉽게 원하는 값을 찾아낼수있고 테스트 할 수 있다.

https://easings.co/
cubic-bezier를 사용한 예시들을 볼 수 있다.
