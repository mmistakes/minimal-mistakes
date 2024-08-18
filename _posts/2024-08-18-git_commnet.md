---
title: "git 블로그 댓글 추가하기"
categories: git

tags: git comment

---



# 댓글 추가하기

보통 블로그에는 댓글 기능이 있지만 git블로그는 설정을 해야 댓글을 사용할 수 있다.


mmistakes 가이드 사이트를 보면 여러가지 종류의 댓글 기능이 내장되어 있고 이것들을 설정해서 사용 가능하다고 나온다.<br>

![image](https://github.com/user-attachments/assets/7adf836a-d906-4bb2-8ba0-87cc951ad4ff)


먼저 사이트에 나온대로 config의 defaults에 있는 comments 부분을 true로 바꿔줬다.



![image](https://github.com/user-attachments/assets/f5fb8155-a7f7-4667-bbdd-4092852ecff8)


먼저 디스쿠스는 댓글 기능을 활성화 하려면 계정을 만들어야 한다고 나온다. 

![image](https://github.com/user-attachments/assets/2c389cd3-2314-4738-9509-dd5259af200b)

https://help.disqus.com/en/articles/1717111-what-s-a-shortname 여기로 들어가서 디스쿠스 계정을 만들고 사이트를 등록해줬다.

![image](https://github.com/user-attachments/assets/e0b94d8f-6e24-4698-842e-73675c692e7b)


그리고 생성된 shortname을 config 파일에 지정해주고 comment를 disqus로 바꿔줬다.

![image](https://github.com/user-attachments/assets/ee2b6aa2-8001-4735-88ab-9e559f01fb30)

![image](https://github.com/user-attachments/assets/94d43166-ad68-4956-a73e-62d71a9babdf)


그렇게 했더니 댓글이 추가되었다.


![image](https://github.com/user-attachments/assets/e3cf922c-482c-4841-a0a5-5052c86a1cbb)