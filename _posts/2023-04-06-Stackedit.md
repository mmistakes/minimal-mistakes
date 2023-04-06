# Stackedit과 Github 연동 시 발생하는 에러 해결법

Github 페이지(블로그)를 만들고 나니 글 포스팅을 하려면 마크다운을 이용해서 해야한다는 것을 깨달았다. 마크다운 데이터로는 크게 Typora(타이포라)와 Stackedit(스택에디트) 두 개가 있는데, 타이포라는 유료인 점이 걸렸고, 스택에디트는 뭔가 LaTeX의 overleaf처럼 온라인으로 편집한다는 점이 마음에 들어 고르게 되었다.

StackEdit을 처음 열고 google계정으로 로그인을 하면, Main workspace가 구글로 되어있다. 나는 Github repository를 연동하고 바로바로 글을 써서 올리고 싶기 때문에 깃허브를 연동하기로 했는데, 연동을 시도하면 자꾸 밑의 이미지와 같은 창이 뜨면서 진행이 되지 않는다.

![에러가 뜨는 모습](https://raw.githubusercontent.com/arrow-economist/arrow-economist.github.io/master/_posts/stackedit1.png)

구글링을 한 결과 해결 방법을 찾아냈다. (~~사실 원인이 뭔지는 컴잘알이 아니라 모르겠다.~~)

우선 본인이 사용하는 브라우저의 Develop tool이 필요하다. 나는 이 계정을 사파리로 관리하고 있기 때문에 사파리를 기준으로 설명을 하겠다. (엣지 등의 크로미움 기반 브라우저는 딱히 다른 설정할 필요 없이 F12를 누르면 develop tool로 들어가지는 것으로 알고있다.)

참고: 내 맥미니는 미국에서 구매해서 언어 설정이 영어로 되어있어 한국어로 뭐라 되어있는지

메뉴바 왼쪽에서 **Safari**를 클릭 후 Settings를 누른다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI4ODY5ODc3MSwxNzMzMDcyMzMsMTUwOD
Y2ODM5MSwtMTY1NzQ4NjA0XX0=
-->