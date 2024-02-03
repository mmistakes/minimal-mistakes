



# #Github, #Markdown

Github 페이지(깃허브 블로그)를 만들고 나니 글 포스팅을 하려면 마크다운을 이용해서 해야한다는 것을 깨달았다. 마크다운 데이터로는 크게 Typora(타이포라)와 Stackedit(스택에디트) 두 개가 있는데, 타이포라는 유료인 점이 걸렸고, 스택에디트는 뭔가 LaTeX의 overleaf처럼 온라인으로 편집한다는 점이 마음에 들어 고르게 되었다.

StackEdit을 처음 열고 google계정으로 로그인을 하면, Main workspace가 구글로 되어있다. 나는 Github repository를 연동하고 바로바로 글을 써서 올리고 싶기 때문에 깃허브를 연동하기로 했는데, 연동을 시도하면 자꾸 밑의 이미지와 같은 창이 뜨면서 진행이 되지 않는다.

![에러가 뜨는 모습](https://raw.githubusercontent.com/arrow-economist/arrow-economist.github.io/master/images/stackedit1.png)

구글링을 한 결과 해결 방법을 찾아냈다. (~~사실 원인이 뭔지는 컴잘알이 아니라 모르겠다.~~)

우선 본인이 사용하는 브라우저의 Develop tool이 필요하다. 나는 이 계정을 사파리로 관리하고 있기 때문에 사파리를 기준으로 설명을 하겠다. (엣지 등의 크로미움 기반 브라우저는 딱히 다른 설정할 필요 없이 F12를 누르면 develop tool로 들어가지는 것으로 알고있다.)

*참고: 내 맥미니는 미국에서 구매해서 언어 설정이 영어로 되어있어 한국어로 뭐라 되어있는지 잘 모른다. 그래서 단축키도 함께 남기도록 하겠다.*

1. 메뉴바 왼쪽에서 **Safari**를 클릭 후 Settings를 누른다. (단축키: "**cmd + ,**")
2. **Advanced**(맨 오른쪽의 톱니바퀴 두 개)를 누른 후 맨 밑에 **Show Develop menu in menu bar**가 체크 해제되어있는 경우 체크를 한다.

![enter image description here](https://raw.githubusercontent.com/arrow-economist/arrow-economist.github.io/master/images/stackedit2.png)

3. 그러면 이제 메뉴 바에서 Develop 탭이 있는 것을 확인할 수 있는데, 이제 다시 StackEdit을 키고 Workspaces를 눌러서 Github 연동을 눌러보자. 그러면 밑의 이미지와 같은 화면이 뜬다.

![enter image description here](https://raw.githubusercontent.com/arrow-economist/arrow-economist.github.io/master/images/stackedit4.png)

4. 내 깃허브 블로그 주소는 username.github.io이기 때문에 Repository URL에는 https://github.com/username/username.github.io 까지 입력을 해준다. 나는 _posts 폴더에 포스트를 해서 블로그에 업로드를 하므로 Folder path에는 _posts를 적어준다. 그리고 OK를 누르면 private까지 허용할 거냐는 체크박스가 하나 뜬다.

 5. 이 때 확인버튼을 누르지 말고, 각자의 브라우저에서 Develop tool을 열어야 한다. 사파리는 다음과 같다. 왼쪽 메뉴 바의 Develop을 누르고,  **Show JavaScript Console**(단축키: "**ctrl + cmd + c**")를 누르면 자바스크립트를 입력할 수 있는 콘솔창이 열린다. 콘솔 창에 밑의 코드를 입력한다.

```
window.XMLHttpRequest =  class MyXMLHttpRequest extends window.XMLHttpRequest {
  open(...args){
    if(args[1].startsWith("https://api.github.com/user?access_token=")) {
      // apply fix as described by github
      // https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param/#changes-to-make
  
      const segments = args[1].split("?");
      args[1] = segments[0]; // remove query params from url
      const token = segments[1].split("=")[1]; // save the token
      
      const ret = super.open(...args);
      
      this.setRequestHeader("Authorization", `token ${token}`); // set required header
      
      return ret;
    }
    else {
      return super.open(...args);
    }
  }
}
```

입력하고 엔터를 누른 후, OK버튼을 누르도록 하자. 그러면 완료!

![enter image description here](https://raw.githubusercontent.com/arrow-economist/arrow-economist.github.io/master/images/stackedit5.png)

보면 오른쪽 Workspaces에 current로 _pages가 등록되어있는 것을 확인할 수 있다!

이렇게까지 하면 이제 깃허브 블로그에 글을 쓸 준비가 완료되었다는 뜻이다. 다른 컴퓨터로도 들어가보니 동기화도 빠르게 잘 되는 것 같다.


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkwMjA2NDE4OCw0OTQ2MTcxNywxNjkzMz
c3NTExLC0xNzkxMTk5ODksLTMwMTc4MjU1XX0=
-->