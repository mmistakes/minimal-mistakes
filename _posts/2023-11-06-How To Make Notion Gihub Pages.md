---
layout: single
title: "해당 블로그의 목적"
---
# 해당 블로그의 목적

## 1. 목적
소프트웨어 
- 플랫폼 선정 : 깃허브 pages(이유 : 개발자가 아니면 불가능하므로 개발자라는 티를 낼 수 있음)

GitHub Pages

장점 : 커스텀 자유도 높다 & hosting 비용이 없다 & Jupiter Notebook도 손쉽게 업로드 가능하다 & AdSense도 붙여서 돈벌이로도 활용가능하다

## 2. Manual

[Youtube 강의 link](https://www.youtube.com/watch?v=ACzFIAOsfpM)

[https://www.youtube.com/watch?v=--MMmHbSH9k&list=PLIMb_GuNnFwfQBZQwD-vCZENL5YLDZekr](https://www.youtube.com/watch?v=--MMmHbSH9k&list=PLIMb_GuNnFwfQBZQwD-vCZENL5YLDZekr)

글 작성은 Notion으로 하고, Markdown export 후에 약간의 수정을 한 후 블로그 업로드

### **Markdown 내용 Github io로 옮기기**

---

Export한 Markdown 파일을 바로 Github io에 넣는다고 적용이 되지 않습니다.

- **Markdown 상단 설정 값 수정하기**
    
    Github io에서 블로그 글을 업로드 할 때 Markdown 안에 필수로 작성 해주어야 하는 설정 값들이 있습니다. 맨 위에 **—** 사이에 설정값을 입력하면 됩니다.
    
    이 부분은 Notion에서 Export시에 같이 나오지 않기 때문에 따로 작성 해주셔야 합니다.
    
    ![Untitled](../images/2023-11-06-test/Untitled.png)
    
- **이미지 경로 수정하기**
    
    노션에서 Markdown을 export하면 글 안에 포함 된 이미지의 경로는 노션에서 생성된 경로로 만들어지게 되서 Github io에서 이미지 경로를 찾지 못 합니다. 그래서 자신의 Github io 이미지 경로로 수정해주어야 합니다.
    
    ```python
    <!-- 수정 전 -->
    ![Tips%20Notion%20Github%20io/NotionToGithubioPorting1.png](Tips%20Notion%20Github%20io/NotionToGithubioPorting1.png)
    
    <!-- 수정 후 -->
    ![NotionToGithubioPorting1.png](/assets/images/posts/2020-03-02/NotionToGithubioPorting1.png)
    ```
    
    > 저는 assets/images/posts/포스팅 날짜/이미지 형식으로 경로를 설정해서 사용하고 있는데요. 만약 경로가 다른 식으로 설정 되어 있다면 경로에 맞게 입력 해주시면 됩니다.
    > 
- **소스코드 형식 설정하기**
    
    노션의 코드 블럭을 추가해서 작성한 후 md 파일을 만들면 md 파일에서는 코드 블럭이 설정되지 않은 상태로 Export가 됩니다.
    
    ![Untitled](../images/2023-11-06-test/Untitled%201.png)
    
    이런 형식으로 나온 코드를 아래와 같이 코드 블럭으로 감싸주는 작업을 해주어야 합니다.
    
    ![Untitled](../images/2023-11-06-test/Untitled%202.png)
    
- **링크 Create Bookmark 체크하기**

노션에서는 링크를 Create Bookmark하면 블록 형태로 링크에 대한 Bookmark가 생성됩니다. 하지만 md 파일에서는 Bookmark 표현이 안 되므로 링크에 대한 내용 확인 후 수정을 해야 됩니다.

![사진](https://swieeft.github.io/assets/images/posts/2020-03-02/NotionToGithubioPorting5.png)

이런 형태로 되어 있는 Bookmark를 Export 하면

  `[Notion - The all-in-one workspace for your notes, tasks, wikis, and databases.](https://www.notion.so/)`

이런 형태로 표현이 됩니다. 대괄호”[]” 안에 있는 텍스트가 표시 될 URL의 정보이고, 소괄호”()” 안에 있는 URL이 링크 될 페이지 주소입니다.

