---
title: "git Branch 생성,삭제,이동, 병합,충돌해결"
escerpt: "Git Branch 생성, 삭제, 이동, 병합, 충돌해결"

categories:
  - Git
tags:
  - [Git, Blog, GitHub, Branch]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2022-06-26
last_modified_at: 2022-06-26

comments: true
---

# 개요

Branch는 프로젝트를 분리시켜주는 역할을 해준다.

# Branch 생성

## 1. Branch 생성

~~~
git branch 이름
~~~

master branch : 핵심브랜치, 실제 배포시 master branch를 이용한다.  
                보통은 다른 브랜치에서 생성 및 테스트 후 검증완료 후 master branch로 배포한다.
                

~~~
$ git branch  # 현재 branch list 보여준다.
$ git branch abc # abc라는 branch를 생성한다.
$ git checkout abc # abc라는 branch로 변경한다.
~~~

 
![image](https://user-images.githubusercontent.com/46878973/175803436-30e58e63-8205-4d6e-b100-d3bdd4389daa.png)

- master : index. html
  추가 branch(abc) : index.html , main.css
  abc branch상태에서 branch추가하면 main.css 있는상태의 branch 생성됨.
  master branch 상태에서 branch추가하면 index.html만 있는 상태의 branch 생성됨
  즉, branch 생성시 현재의 branch상태가 복제되어 만들어진다.

## 2. Branch 이동
~~~
git checkout 이름
~~~

## 3. Branch 삭제

~~~
$ git branch -d 이름
~~~

![image](https://user-images.githubusercontent.com/46878973/175804289-13e6d09b-2b1f-40c1-8049-6f905fbcfbc6.png)

- 현재 branch에서는 자신의 branch 삭제할수 없다.
- 다른 branch이동 후 삭제하고자 하는 branch 삭제 가능하다.

## 4. 생성하자마자 이동하고 싶을때

~~~
$ git checkout -b 이름 # 이름 branch 생성 후 바로 이동
~~~

![image](https://user-images.githubusercontent.com/46878973/175804347-f90537df-9538-4a0d-b364-df8b835dd9a0.png)


## 5. Branch 병합

~~~
$ git merge 이름
~~~

![image](https://user-images.githubusercontent.com/46878973/175804589-edbf8d92-5dd1-43c8-9348-e53be928b08e.png)

- a에다가 b를 병합하고 싶다면 a branch로 이동 후 git merge b 를 하면 a branch에 b가 병합된다. 
- 즉, 현재위치에서 남에꺼를 가져와서 자신한테 병합해버린다.

![image](https://user-images.githubusercontent.com/46878973/175805280-eb052c01-dbf1-4db3-9d77-9b6463ca10e2.png)

- 상충되는게 있다면 병합충돌발생한다.(conflict)
- 그럴땐 상황에 맞게 적절한걸 선택해주면 된다.


---

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}