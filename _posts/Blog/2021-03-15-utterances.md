---
title:  "[Github 블로그] utterances 으로 댓글 기능 만들기 (+ disqus 비추후기)" 

categories:
  - Blog
tags:
  - [Blog, jekyll, Liquid, HTML, minimal-mistake]

toc: true
toc_sticky: true
 
date: 2021-03-15
last_modified_at: 2021-03-15
---

## 🚀 disqus 비추후기

- disqus 댓글 플랫폼을 비추하는 이유
  1. 광고 !!!!!! (아래 사진 속 광고는 모두 disqus 하나에 함께 딸려있는 광고다..)
  2. 무겁다.

![image](https://user-images.githubusercontent.com/42318591/111132481-c1ff1e00-85bc-11eb-887e-b2f476967827.png)


블로그를 거의 1년 가까이 해오는 동안 블로그의 댓글 플랫폼으로 `disqus` 을 사용해왔다. 그러나 언제부턴가 저런 극혐인ㅠㅠ.. 큰 격자형태의 광고가 댓글의 앞뒤로 붙는 것이였다. 모바일로 보면 더 가관이였다.. 해당 광고 소스를 찾지 못해서 한참을 헤매다가 이 광고는 `disqus` 자체 광고라는 것을 알게 되었다. `disqus`에 광고가 붙는다는 것을 전혀 몰랐었다. 처음엔 안 붙었는데 어느 순간부터 나도 모르는 사이에 광고가 붙기 시작했던거보면 어느 정도의 사용 시간이 지나고나면 광고가 붙게되는듯 하다. 이 광고를 없애려면 한달에 9달러씩을 지불해야 한다더라..😥 무거운데다 광고가 저렇게나 붙다니!!! `disqus`를 사용할 이유가 없었다. 그동안 `disqus`를 통해 달린 댓글들이 아깝고 아쉽지만 ㅠㅠ.. 더 이상 사용하지 않기로 결정하였다.

<br>

## 🚀 utterances 가 더 좋다고 생각하는 이유

![image](https://user-images.githubusercontent.com/42318591/111236737-e992cc80-8636-11eb-81ad-d293e4525889.png)

그래서 대체할만한 댓글 플랫폼을 사용하고자 찾아보다가 ***utterances*** 라는 댓글 플랫폼을 발견하였고 이걸로 갈아타기로 결정하였다. 

- 우선 <u>광고가 없고 가볍다고 하며</u> 
- Github 계정 로그인을 통해 댓글을 달고, 댓글이 달리면 알림이 Github Repository 의 Issue 로 올라오는 시스템이라고 한다. 
  - 내 블로그 방문자 분들은 대부분 개발자이시거나 개발 공부를 하시는 분들일거라고 생각한다. 그래서 대부분 Github 계정을 가지고 계실 것이라고 생각이 되서 문제 없을듯 하다.
  - Issue 에 올라오는 것이니 메일로 댓글 알림을 받을 수 있다
- 게다가 댓글에 마크다운을 사용할 수도 있다고 한다. 

<br>

## 🚀 블로그에 utterances 적용시키기

### 1. 댓글 Issue 가 올라올 저장소를 정하거나 혹은 생성한다.

- 그냥 깃허브 블로그 Repository 에 하면 될 것 같다.
- 나 같은 경우는 블로그 Repository 가 `private`라서 댓글 이슈가 올라올 전용 Repository 를 아예 새로 만들었다. <https://github.com/ansohxxn/comments>

<br>

### 2. utterance 를 Install 설치한다.

<https://github.com/apps/utterances> 이 링크를 통해 설치하면 된다. 설치를 할 때 달린 댓글이 모든 저장소의 Issue 들에 업로드가 되게 할지, 아니면 특정 한 저장소의 Issue 에만 업로드가 되게 할지 선택할 수 있다. 모든 저장소의 Issue 에 올리게 할 필요성은 못 느껴서 후자를 선택했다. **Only Select Repositories** 를 통해, 댓글 Issue 가 올라올 저장소로 위에서 선택한 그 Repository 를 선택한 후 Install 하면 된다.

<br>

### 3. Install 후 나오는 다음 페이지 작성

![image](https://user-images.githubusercontent.com/42318591/111189434-6c953200-85f9-11eb-82f8-010b41bbe6dd.png)

체크한 부분들을 입력해준다.

- repo
  - 위에서 댓글 Issue 가 올라올 곳으로 선택한 그 저장소의 permalink 를 써준다. (*github아이디/저장소이름*) 
    - ex) ansohxxn/comments
    - ex) ansohxxn/ansohxxn.github.io
- Blog Post - Issue Mapping
  - 댓글 이슈를 댓글 달린 블로그 페이지의 어떤 부분과 매핑을 시킬지 Key를 결정한다. 
  - 매핑시키는 것이니만큼 Key 가 달라지면 Value 는 사라질 것이다. 고유하고 수정을 제일 안할 것 같은 `pathname`을 선택하는 것이 좋을 것 같다.

<br>

### 3. 블로그 코드에 반영하기

![image](https://user-images.githubusercontent.com/42318591/111189479-761e9a00-85f9-11eb-9ebe-4e0add550f8c.png)

- Theme
  - *utterances* 의 테마를 정한다. 난 Photon Dark 테마를 선택했다.
- Enable utterances
  - minimal-mistakes 를 사용하는 분들이라면 이것을 복사할 필요는 없다. 👉 이 코드를 참고하여 📄_config.yml 에 입력을 하면 적용된다.
  - 다른 분들께서는 댓글 구현을 담당하는 `html` 파일에 이 코드를 그대로 복사하여 원하는 위치에 붙여넣어주면 될 것 같다.

![image](https://user-images.githubusercontent.com/42318591/111237460-7ee29080-8638-11eb-8659-9f96b121be33.png)

위 Enable utterances 의 코드를 참고하여 📄_config.yml 에서 값을 설정해주면 된다. 

- repository
  - 위에서 댓글 Issue 가 올라올 곳으로 선택한 그 저장소의 permalink
- comments - provider
  - *utterances* 를 앞으로 사용할 것이므로 *utterances* 를 입력
- utterances - Theme
  - 위에서 설정한 테마 
- utterances - issue_term
  - 위에서 설정한 맵핑 키 (pathname)

여기까지 하고 커밋 및 푸시 하여 서버에 반영하면 성공!

![image](https://user-images.githubusercontent.com/42318591/111237786-1e078800-8639-11eb-8f7d-c9acc21e809f.png)

예쁘고 깔끔하다 💛 

![image](https://user-images.githubusercontent.com/42318591/111236148-8ce2e200-8635-11eb-896d-8f855844e2b4.png)

댓글이 달리면 이렇게 Issue 에 올라오고 메일로도 알림을 받을 수 있다. 

<br>

### 4. Github 메일 알림 설정하기 (메일로 댓글 알림 받기)

![image](https://user-images.githubusercontent.com/42318591/111238388-58bdf000-863a-11eb-9141-1f05dfa5d138.png)

참고로 Github 메일 알림은 Github Repository 의 Settings 의 Notifications 에 이메일을 등록하면 받을 수 있다.

<br>

### 번외) utterances 크기 조절

![image](https://user-images.githubusercontent.com/42318591/111238657-d681fb80-863a-11eb-883f-8197f7b38e84.png)

<https://baek.dev/post/4/> 이 블로그의 baekdev 님의 댓글 조언을 참고하여 적용하였다. utterances 의 너비를 더 넓혔다!

```scss
.utterances {
  max-width: 100% !important;
}
```

`css` 파일에서 위 코드만 추가해주면 된다. 나는 📜_page.scss 에 적용하였다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}