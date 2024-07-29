---
title: "git 블로그 로컬에서 테스트하기"
categories: git

tags: git

---


# 로컬에서 테스트 

git 포스트를 한 개 올려봤는데 md파일을 저장하고 어떻게 변경되는지 확인을 하려면 git comiit, push 하고 좀 기다려야 실제 블로그에 변화가 있어서 너무 불편했다.

그래서 로컬에서 포스트를 생성하고 화면을 확인하는 방법을 찾으려고 한다.

검색을 해보니까 Github Docs에 관련 내용이 나왔다.


![Foo]({{ "images/capture/post2_1.png" | relative_url }})

Jekyll을 설치 하라는데 Jekyll을 설치하려면 루비를 설치하라고 나와서 우선 루비를 설치한다.

![Foo]({{ "images/capture/post2_2.png" | relative_url }})

Ruby 설치 사이트를 들어가니까 설치되어 있을 수 있으니까 cmd창에서 ruby -v를 입력하라고 한다.

Ruby를 써본 적이 없어서 있을리가 없지만 혹시 몰라서 cmd창에서 명령어를 입력했는데 역시나 없었다.

![Foo]({{ "images/capture/post2_3.png" | relative_url }})

ruby window 설치하는 곳 들어가니까 버전이 많이 나오는데 오른쪽에 

어떤 버전을 설치할지 모르겠고 ruby를 시작하는 경우 Ruby+Devkit 3.3..X(x64)를 설치하라고 나와서 

3.3.4-1(x64)를 선택했다.



설치가 완료되고 다시 cmd창에 들어가서 ruby -v를 입력해보았다

![Foo]({{ "images/capture/post2_4.png" | relative_url }})

루비 버전이 잘 나온다 

이제 Jekyll을 설치해보자 Jekyll은 Ruby 기반으로 만들어졌고 마크다운을 HTML로 변환하여 정적 사이트를 만들어준다고 한다(나무위키 피셜)

Jekyll은 Bundler를 사용하여 설치하는것이 좋다고 한다


![Foo]({{ "images/capture/post2_5.png" | relative_url }})

Bunlder링크를 클릭하니 설치 방법이 나오는 사이트로 이동된다.

Bundler는 Ruby 어플리케이션이 모든 시스템에서 동일한 코드를 실행하도록 도와준다고 한다.

설치를 위해서 gem install bundler를 하라고 한다 

Ruby를 설치했으니 cmd창에서 입력하면 될꺼같다

![Foo]({{ "images/capture/post2_6.png" | relative_url }})


cmd창에서 명령을 입력하니 설치가 완료됐다.

설치를 완료했으니 이제 로컬에서 블로그를 실행해보자 

![Foo]({{ "images/capture/post2_7.png" | relative_url }})

로컬로 실행하기 위해서 먼저 git bash를 열고 블로그 폴더 위치로 이동 후

bundle install -> bundle exec jekyll serve를 입력하면

localhost:4000으로 실행 할 수 있다고 한다.


![Foo]({{ "images/capture/post2_8.png" | relative_url }})


git bash를 키고 블로그 디렉토리로 이동 후 bundle install을 입력하니까 여러가지가 install됐다


![Foo]({{ "images/capture/post2_9.png" | relative_url }})


그리고 bundle exec jekyll serve를 입력하니까 

localhost 포트 4000번에 서버가 실행됐다고 나온다.

![Foo]({{ "images/capture/post2_10.png" | relative_url }})


이제 localhost:4000으로 들어가서 웹서버가 잘 실행되고 있는지 확인해보자.


![Foo]({{ "images/capture/post2_11.png" | relative_url }})



![Foo]({{ "images/good_pepe.png" | relative_url }})

local에서 블로그가 잘 실행된다 !!

이제 local에서 실행하는 가장 큰 이유인 수정 후 바로 적용되는지 확인을 해보자

테스트 해보기 위해 헤드와 푸터에 넣어논 글자를 없애봤다.


![Foo]({{ "images/capture/post2_12.png" | relative_url }})


저장하고 페이지에 재접속을 하니까 바로 사라지지는 않았지만 새로고침 2번 하니까 변경사항이 적용됐다

이제 포스트 작성 후 로컬에서 확인 -> git에 올리기로 포스트를 할 수 있게 됐다!