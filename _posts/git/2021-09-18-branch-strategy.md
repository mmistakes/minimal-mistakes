---
title: "[Git] Branch Strategy" 

categories:
  - git
tags:
  - [git,branch]

toc: true
toc_sticky: true


---


이 포스트는 [깃 브랜치 전략](https://hyeon9mak.github.io/git-branch-strategy/) 및 [Git 브랜치의 종류](https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html) 포스트를 참고하였습니다.
<br>
학기가 시작하여 팀원들과 협업할 기회가 생겼고, Git을 이용한 협업이 이루어질것이므로 자주 통용되는 git 브랜치 전략에 대해 공부해보는 시간을 가졌다. 또한 다양한 SW 회사에서 어떠한 방법으로 깃을 사용하고 있는지에 대해서도 알아 보려고 한다.

***

브랜치란 독립적으로 어떤 작업을 진행하기 위한 개념입니다. 필요에 의해 만들어지는 각각의 브랜치는 다른 브랜치의 영향을 받지 않기 때문에, 여러 작업을 동시에 진행할 수 있습니다.
이 말을 쉽게 해석하면 팀원들은 각각 자신이 만든 기능에 따라 브랜치를 생성하고 그 브랜치는 그 기능만 담당할뿐, master(main) 브랜치에는 merge 전까지는 영향을 전혀 주지 않기때문에
그 기능 자체에만 독립적으로 집중할 수 있는 것이다. 그러므로 브랜치는 협업에서 필수적이고 혼자 개발을 한다 할지라도 여러 기능별 독립적으로 개발하고 싶을때 사용하면 좋다.

***

브랜치 전략이란?

여러 개발자가 하나의 저장소를 사용하는 환경에서 저장소를 효과적으로 활용하기 위한 work-flow다.
즉 협업을 하는상황에서 저장소는 하나이고 그것을 기준으로 여러 개발자가 작업을 진행할때 사용하는것이다.
브랜치의 생성, 삭제, 병합 등 git의 유연한 구조를 활용해서 각 개발자들의 혼란을 최대한 줄이며 다양한 방식으로 소스를 관리하는 역할을 한다.
체계적인 규칙이 없다면, 개인별 원하는 git 사용법을 사용하여 프로젝트가 엉망이 될것이다.
즉 프로젝트 시작전에 브랜치 전략을 프로젝트에 알맞게 구축하여 프로젝트를 진행하는 동안 원활한 협업이 진행되도록 한다.
몇가지 자주쓰이는 브랜치 전략이 있다. 그에 따라서 포스트를 작성해 나가도록 할것이다.


# Feature Branch Workflow
- 마스터브랜치(master,main) 줄기를 따라서 가지를 뻗어나가도록 하여 안전하게 새로운 기능을 개발하는데 초점이 맞춰져 있다.
- 구축하려는 서비스의 각 **기능별** 브랜치를 만들어서 협업하는 방식이다.
- 비교적 작은 규모의 프로젝트에서 사용한다
- 1개의 master(main) 브랜치와 Pull Request 를 이용한 민첩한 브랜치 전략

### 저장소
* 중앙 원격(remote) 저장소  
  * 여러 명이 하나의 저장소를 사용할때 그 저장소를 뜻한다, 예를들어 organization 의 저장소를 뜻한다.
* 로컬(local) 저장소
  * *local repository* 라고 불린다. 자신의 컴퓨터 내부에 폴더로 존재하는 저장소이다. (당연히 오프라인에서 접근이 가능하다)

### Clone
<br>
프로젝트를 참여하는 개발자는 git clone 명령어를 사용하여서 remote 저장소에서 내용을 clone 하여 자신의 컴퓨터에 로컬 저장소를 만들어준다
git clone 명령어를 사용하면 된다

```bash
$ git clone [중앙 remote repository URL]

// 위 한줄의 코드는 아래 세줄의 코드로 나눌 수 있다.

//현재 위치한 디렉토리를 git의 저장소로 만들겠다(로컬 저장소)
$ git init
// 현재 작업 중인 Git 저장소에 중앙 원격 저장소를 복사한다. 이름을 origin으로 짓는다.
$ git remote add origin [클론할 URL 주소]
// 중앙 원격 저장소(origin)의 master 브랜치 데이터를 로컬에 가져오기만 하는 작업
$ git fetch origin master

```

### 브랜치 생성
새로운 기능 개발을 위해서 기능에 알맞는 브랜치를 생성한다.

![image](https://user-images.githubusercontent.com/69495129/133831452-af0dc84d-e583-4070-b386-5beecc49f4c4.png)
<br>
**Feature Branch Workflow** 방법은 어떠한 목적에 따라서 브랜치를 생성하면서 시작된다. 예를들어 footer 기능을 개발한다면 feature/footer , 버그를 고치는 브랜치라면
bugFix 등 브랜치의 이름을 통해서 기능의 의도를 명확하게 보여주는 것이 매우 중요하다.

만약에 footer 기능을 개발한다면 다음과 같은 명령어를 사용한다.

```bash
$ git checkout -b feature/footer

# 위의 명령어는 아래의 두 명령어를 합한 것이다.
# 일반적으로 처음에 브랜치를 생성할때는 위의 한줄을 사용한다.
# 브랜치가 이미 생성되어있는것을 안다면 checkout만 해주면된다.
$ git branch feature/footer
$ git checkout feature/footer

```



### 브랜치에서의 커밋후 PUSH
<br>
브랜치에 알맞은 기능을 개발한 후 커밋을하고, 자신의 브랜치에 push를 해준다
만약에 footer 기능을 개발한후 push를 하려면 다음과 같이 한다.

```bash
# 현재 디렉토리부터 재귀적으로 아래 포함된 모든 폴더의 
# 수정된 부분을 Staged 상태로 올린다.
$ git add .
$ git commit -m "footer 만들었어요."
$ git push origin feature/footer

```

위에서 Staged 상태란?

#### Git에서의 세 가지 상태
Git 은 파일을 Committed,Modified,Staged 이렇게 세 가지 상태로 관리한다.

| State     | mean                                                         |
| --------- | ------------------------------------------------------------ |
| Committed | 데이터가 로컬 데이터베이스에 안전하게 저장되었다는것을 의미한다. |
| Modified  | 수정한 파일을 아직 로컬 데이터베이스에 커밋하지 않은 것을 말한다. |
| Staged    | 현재 수정한 파일을 곧 커밋할 것이라고 표시한 상태를 말한다.  |


### Pull Request 생성
전에 push 한것은 내가 구현한 기능 브랜치에 push한것이므로 아직 긴 줄기인 (master/main) 브랜치에는 영향을 전혀끼치지 않는다.
그렇다면 내가 구현한 footer 가 제대로 작동하고, 이를 진짜 branch(master/main) 에 반영하고 싶으면 내 맘대로 merge 하는것이아니라.
pull request(합쳐주세요) 라는 요청을한후 구성원의 동의가 있다면 그때 merge를 하는것이다.
즉 기능 개발을 끝내고 바로 master 에 merge하는것이 아닌. 브랜치를 중앙 원격 저장소에 push 를 일단 한 후 merge를 부탁하는것이다.

* GUI 도구를 이용한 풀 리퀘스트
1. GitHub 페이지에서 "Pull requests" 버튼을 이용하면, 어떤 branch를 제출할지 정할 수 있다.
2. 기능을 구현한 branch(여기서는 feature/footer)를 프로젝트 중앙 원격 저장소의 master branch에 병합해 달라고 요청한다.

![image](https://user-images.githubusercontent.com/69495129/133833113-5c7c93e5-b7dc-4cfb-b401-3cfe76b76b86.png)

위와같이 바로 반영되서 pull request를 만들것인지 나온다.

![image](https://user-images.githubusercontent.com/69495129/133833729-34d3c3de-6508-4084-a692-cb8fb9abbff8.png)

### 여러가지 토론을 한다(협업)
Pull request를 허가한뒤 merge를 하면 실제 서버에 반영이 되므로 팀원들간 충분한 코드리뷰와 토론을 진행한 뒤, 문제가 없는 코드라면 merge를 시킨다.

![image](https://user-images.githubusercontent.com/69495129/133834076-05937458-9fb6-401c-8827-550d0787b1bd.png)

* GUI 도구를 이용한 병합
1. GitHub 페이지에서 "Pull requests" 버튼을 누른 후, File changed 탭에서 변경 내용을 확인한다.
2. 초록색 버튼인 merge pull requests 를 누르면, confirm merge 버튼이 생긴다
3. Conversation 탭으로 이동하여 "Confirm merge"를 하면 중앙 원격 코드 베이스에 merge 된다.(충분히 고민한 후 버튼을 클릭한다.)
4. 충돌이 일어난 경우는 팀원들고 합의 하에 충돌 내용을 수정한 후 병합을 진행한다. (충돌이 일어났다고 당황하지 않고, 로그를 보며 천천히 해결한다)
<br>

![image](https://user-images.githubusercontent.com/69495129/133833957-fc56730f-d7a2-428b-a69f-26a54eb0ffa9.png)
<br>
다른 개발자들은 
master 브랜치로 이동하여 , pull 을 하므로써 중앙 원격 저장소(여기서는 팀 레포지터리) 가 변경되었으므로, 자신의 로컬 저장소를 동기화해서 최신 상태로 업데이트 해준다.




 🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

  





