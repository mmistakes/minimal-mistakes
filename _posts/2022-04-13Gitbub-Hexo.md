---
title: "깃허브설치"
author: "kona"
date: '2022-03-17'
---

# 깃허브 만들기 개어렵네

# 1. node.js LTS로 받고

에드 어쩌고 눌러서 설치하고

깃배쉬로 node-v 해서 버전 나오나 확인

# 2. Git Bash here - 바탕화면에서

경로가 데스크탑으로 잡혀있는지 꼭 확인하고

# human@DESKTOP-A5A3NJ9 MINGW64 ~/Desktop
$ **npm install -g hexo-cli**

added 59 packages, and audited 60 packages in 5s

14 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
npm notice
npm notice New patch version of npm available! 8.5.0 -> 8.5.4
npm notice Changelog: [https://github.com/npm/cli/releases/tag/v8.5.4](https://github.com/npm/cli/releases/tag/v8.5.4)
npm notice Run `npm install -g npm@8.5.4` to update!
npm notice

human@DESKTOP-A5A3NJ9 MINGW64 ~/Desktop
$ **hexo init myblog**
INFO  Cloning hexo-starter [https://github.com/hexojs/hexo-starter.git](https://github.com/hexojs/hexo-starter.git)
INFO  Install dependencies
INFO  Start blogging with Hexo!

human@DESKTOP-A5A3NJ9 MINGW64 ~/Desktop
$

# 3. 바탕화면에서 myblog

git bash로 init myblog —> myblog 만든거임

우클릭 했을때 파이참으로 실행

**폴더 만들고 해도 가능, 깃허브에서 뉴리포어쩌구 할때 이름 맞추기 필수**

# 4. 터미널로 가서 로컬되면 O, 안되면 깃배쉬

hexo server 실행

# 5. 깃허브로 가서 게시물 작성 뉴 눌러

이름은 myblog로 맞추고

![Untitled](/images/notion1/Untitled.png)

 

위에 7줄 실행해야해

근데 이메일, 이름 관련 오류가 뜬다?

![Untitled](/images/notion1/Untitled%201.png)

이렇게 뜨면 이메일과 이름을 설정해줘야해

![Untitled](/images/notion1/Untitled%202.png)

바꿔버려

그다음 깃커밋 부터 다시 실행

깃허브로 가서 확인

![Untitled](/images/notion1/Untitled%203.png)

- **명령어 잠깐**

git add . —> 모든 파일 업로드

git commit —>”a” a 폴더(?)에 업로드

remote 연동하는 코드

git push 최종단계. 배포

add 하고 띄어야한다 꼭 띄고 .

# 6. 블로그를 만들어보자

mblog로 했을때로 가정한다

파이참에서 왼쪽 창에서 source - _pots 밑에 [hello-world.md](http://hello-world.md) 눌러보자

그다음 맨밑에가서 아무거나 쓰고  깃허브에 올라갓나 확인해보고

![Untitled](/images/notion1/Untitled%204.png)

위에 두줄은 필요없어 이미 경로에 와있기때문에

npm install

npm install hexo-server —save

npm install hexo-deployer-git —save

파이참에 입력

컨피그 파일로 가 이제 셋팅할거야

![Untitled](/images/notion1/Untitled%205.png)

타이틀 이름 바꿔 이렇게 예를들어서

![Untitled](/images/notion1/Untitled%206.png)

 자 이제 주소를 바꿀거야 블로그 참고했어

![Untitled](/images/notion1/Untitled%207.png)

`url: [https://rain0430.github.io](https://rain0430.github.io)`

여기서 이름을 바꿔줘 내 사용자이름과 같이 KONA1005로

![Untitled](/images/notion1/Untitled%208.png)

맨밑으로 가서 deployment로 가

```
deploy:
  type: git
  repo: https://github.com/rain0430/rain0430.github.io.git
  branch: main
```

![Untitled](/images/notion1/Untitled%209.png)

다 복사해서 이렇게 이름도 다시 바꿔주자

![Untitled](/images/notion1/Untitled%2010.png)

쟤 복사해서

![Untitled](/images/notion1/Untitled%2011.png)

자 이제 다시 파이참가서 hexo generate 써

css파일이 좍 뜨는지 확인

![Untitled](/images/notion1/Untitled%2012.png)

그다음 hexo deploy 쳐

![Untitled](/images/notion1/Untitled%2013.png)

잘 나오나 눌러서 확인해보고

![Untitled](/images/notion1/Untitled%2014.png)

그다음 저 [KONA1005.github.io](http://KONA1005.github.io) 복사해서 블로그 잘 나오나 봐봐

![Untitled](/images/notion1/Untitled%2015.png)

그리고 확인해야 할 것들

![Untitled](/images/notion1/Untitled%2016.png)

![Untitled](/images/notion1/Untitled%2017.png)

블로그로 가서

![Untitled](/images/notion1/Untitled%2018.png)

hexo new “My New Post” 복사해서 파이참으로

![Untitled](/images/notion1/Untitled%2019.png)

그다음 파일이 생기는지 확인

![Untitled](/images/notion1/Untitled%2020.png)

**아참 그리고 업데이트 할때마다 제너레이트 디플로이 해야해**

## 한번에 하기 hexo generate --deploy

그럼 다 올라갔나 확인.......

# 7. 테마 바꾸기(이카루스로)

이카루스 테마로 바꿔보겠어

[https://ppoffice.github.io/hexo-theme-icarus/uncategorized/getting-started-with-icarus/#install-npm](https://ppoffice.github.io/hexo-theme-icarus/uncategorized/getting-started-with-icarus/#install-npm)

파이참에

npm install -S hexo-theme-icarus

![Untitled](/images/notion1/Untitled%2021.png)

![Untitled](/images/notion1/Untitled%2022.png)

복사한거 쟤도 써 그다음에 

hexo server 실행해서 링크 눌러보면 에러남

![Untitled](/images/notion1/Untitled%2023.png)

![Untitled](/images/notion1/Untitled%2024.png)

`npm install --save bulma-stylus@0.8.0 hexo-renderer-inferno@^0.1.3` 복붙 파이참

그다음 다시 실행해보면 잘 뜬다

![Untitled](/images/notion1/Untitled%2025.png)

구글에 hexo theme 치면 테마 마니나오니까 확인해보고 쓰고싶음 써라

아맞다 이거도 확인

![Untitled](/images/notion1/Untitled%2026.png)

![Untitled](/images/notion1/Untitled%2027.png)

근데 이건 잘 모르겠다 기억 안나네 큰일났구만....

hexo clean 해주면 청소하는거 너무 마니 했을때 꼬일 수 있으니깐

후 어려웠다....다시 잘 할 수 있을가....

![Untitled](/images/notion1/Untitled%2028.png)

이건 다하고 걍 참고...이렇게 쓰고 깃제너 깃디플로이 하고 서버 확인 하면

![Untitled](/images/notion1/Untitled%2029.png)


/images/notion1
%E1%84%80%E1%85%B5%E1%86%BA%E1%84%92%E1%85%A5%E1%84%87%E1%85%B3%20%E1%84%86%E1%85%A1%2053df2
