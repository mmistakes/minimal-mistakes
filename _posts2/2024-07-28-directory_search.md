---
title: "폴더 살펴보기"
categories:

tags:

---



# 시작

블로그를 한번 해보기 위해 minimal-mistake라는 테마를 fork했다.


![Foo]({{ "/images/capture/post1_1" | relative_url }})
이런 파일들이 생성됐다

먼저 README파일을 확인해보자

![Foo]({{ "/images/capture/post1_2" | relative_url }})

...................

갑자기 읽기가 싫어졌지만 나에겐 파파고가 있어서 파파고에 돌려봤다.

대충 이건 블로그에 좋다 이게 있어야 한다 깃허브 페이지와 호환된다 이런 스킨이 있다 
루비라는 언어를 써본적은 없어서 잘은 모르겠는데 대충 루비를 쓰고 gem이라는 패키지를 호출해서 사용한다 
풀 하는 방법과 개발은 어떻게 하면 된다 누가 만들었다 뭘 썼다 
그리고 라이센스가 있는데 라이센스는 이걸 다른사람이 마음대로 쓰면 된다만 고지하면 마음대로 쓸 수 있다고 한다.



이번엔 package.json을 확인해보자

![Foo]({{ "/images/capture/post1_3" | relative_url }})

방금 땡겨서 그런지 minial_mistake만 있다.


그리고 설정 파일인 config.yml파일을 확인해보자 

![Foo]({{ "/images/capture/post1_4" | relative_url }})


설정 파일은 사이트 값에 영향을 미치는 것이고 바꾸면 서버를 다시 실행하라고 나온다 
그리고 여기서 스킨, 페이지 제목, 설명, 이름, url, logo, repository, 댓글 및 어떤 파일을 페이지에서 사용할지 등을 설정할 수 있는거 같다.



그다음에 layout 폴더로 들어와서 default.html을 확인해보자.


![Foo]({{ "/images/capture/post1_5" | relative_url }})

여기에 {  } 안에 include + 경로 이렇게 되어있는것들은 include폴더의 경로 파일이 여기에 들어가는거 같다.
head - head + head/custom 
footer - footer + footer/custom
이런식으로 들어가고 수정하고 싶으면 그 부분을 수정하는거 같다.



그리고 home.html 파일을 확인해보자

![Foo]({{ "/images/capture/post1_6" | relative_url }})

먼저 default에는 없던 layout이 생겼다 


![Foo]({{ "/images/capture/post1_7" | relative_url }})

그래서 다른 파일도 확인해봤더니 여기는 또 home이랑은 다르다 이 부분은 해당 페이지에서 어떤 레이아웃을 사용하는지 설정하는 부분인것 같다.
기본으로 설정된 home페이지의 내용은 최근 포스트와 포스트 + 페이지로 구성되는것 같다.

이것들을 수정하면 어떻게 되는지 간단한 text를 추가해봤다.

![Foo]({{ "/images/capture/post1_8" | relative_url }})

생각했던 대로 내용이 바뀌였다
페이지를 꾸미는 것은 include + layout 폴더에 추가하면 되는거같다.

그런데 블로그에 제일 중요한건 글을 쓰는건데 글을 어떻게 써야하는지는 아직 알 수 없어서 폴더를 여러가지 뒤져보다가
posts 폴더를 발견해서 파일을 열어봤는데 


![Foo]({{ "/images/capture/post1_9" | relative_url }})

누가봐도 블로그 포스트 이렇게 하면 된다 예제 파일이다 ㅋㅋ
그런데 이 파일들이 있으면 포스트가 보인다는건 알겠는데 이 파일을 어디다가 둬야하는지는 알 수 없어서 이것저것 해보다가
_posts폴더를 상위 폴더에 넣어봤더니 


![Foo]({{ "/images/capture/post1_10" | relative_url }})

이렇게 약 70개의 글을 가진 블로그가 됐다!
그리고 글들을 보면 영상 목차 그림 등등이 들어 있어서 이것들을 참고해서 글을 쓰면 될꺼같다


이것들 이외에도 이것저것 확인을 해봤는데 불편한 점이 여러가지 있었다.

1. 수정을 한 후에 페이지에 적용을 시키려면 git commit + push를 해야 적용이 된다.
2. 포스트를 쓸때 vs로 하니까 좀 불편했다.

1번은 루비를 설치해서 로컬로 웹서버를 열어서 수정 후 로컬로 확인을 하는 방식으로 해결을 하면 될꺼같고
2번은 포스트 파일의 확장자가 md파일인데 md파일을 쉽게 수정하는 프로그램이 있을거 같아서 이걸 찾아보면 될꺼같다.
+ 사용하기 불편함을 느끼지 않을 정도의 ruby와 markdown 공부도 필요할꺼 같다.