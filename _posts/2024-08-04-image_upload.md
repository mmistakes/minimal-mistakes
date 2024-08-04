---
title: "git 블로그 이미지 업로드하기"
categories: git

tags: image

---



# 이미지 업로드

이미지를 업로드 할 때 화면을 캡쳐 후 이미지 폴더에 캡쳐한 이미지 파일을 넣고<br>
업로드를 했었는데 이렇게 하니까 미리보기 화면에서 이미지가 나오지 않고 아래 이미지와 같이 출력하기 위해 작성한 명령어만 나오게 된다.


![Foo]({{ "images/capture/post4_1.png" | relative_url }})


미리보기 화면에서도 이미지가 나오게 하는 방법을 찾아보려고 구글에 git blog image attach라고 검색을 하였더니 다음과 같은 페이지가 나왔다. <br>

![Foo]({{ "images/capture/post4_2.png" | relative_url }})


github issue 또는 Comment에 파일을 끌어다 놓으면 Github서버에 업로드 되고 익명화된 URL이 표시된다고 한다.<br>
그래서 pull request쪽에 있는 Add a Comment 부분에 이미지를 넣어봤다.


그랬더니 다음과 같이 Uploading image가 뜨더니 1초쯤 뒤에 URL이 생성됐다.

URL 생성중<br>
![Foo]({{ "images/capture/post4_3.png" | relative_url }})

URL 생성 완료 <br>
![Foo]({{ "images/capture/post4_4.png" | relative_url }})

그리고 이렇게 생성된 URL을 추가했더니 


이렇게 미리보기 화면에서도 이미지가 출력이 되었다<br>
![image](https://github.com/user-attachments/assets/694a1101-dc65-47db-8264-c6803f18c939)


Pull Request Comment 이외에도 git에서 issue같이 파일을 끌어 당길 수 있는곳이면 모두 가능한 것 같다.



issue에서 이미지 추가 <br>

![image](https://github.com/user-attachments/assets/08f8459c-5aef-4858-96e0-a784247f267e)


다른 repository에서 추가한 파일 <br>

![image](https://github.com/user-attachments/assets/d454e335-c7bd-4608-ad03-b81d7273729c)



Gif 파일도 동일하게 끌어당기면 URL이 생성된다 <br>
![Honeycam 2024-08-04 20-30-40](https://github.com/user-attachments/assets/63802357-3f35-4e22-9d2b-380d4786c802)


이러한 방식으로 추가할 수 있는 파일과 크기는 다음과 같다고 한다.


최대 파일 크기는 다음과 같습니다.

이미지 및 gif의 경우 10MB
동영상용 100MB
다른 모든 파일의 경우 25MB
메모: 유료 GitHub 플랜에서 사용자 또는 조직이 소유한 리포지토리에 10MB보다 큰 비디오를 업로드하려면 조직 구성원 또는 외부 협력자이거나 유료 플랜을 사용 중이어야 합니다.

지원되는 파일은 다음과 같습니다.

PNG(.png)

GIF(.gif)

JPEG(, .jpg.jpeg)

로그 파일(.log)

마크다운 파일(.md)

Microsoft Word(), PowerPoint() 및 Excel() 문서.docx.pptx.xlsx

텍스트 파일(.txt)

패치 파일(.patch)

메모: Linux를 사용하여 파일을 업로드하려고 하면 오류 메시지가 표시됩니다. 이는 알려진 문제입니다..patch

PDF(.pdf)

우편번호(, , .zip.gz.tgz)

동영상 (, , .mp4.mov.webm)

메모: 비디오 코덱 호환성은 브라우저에 따라 다르며 한 브라우저에 업로드한 비디오가 다른 브라우저에서 표시되지 않을 수 있습니다. 현재로서는 최고의 호환성을 위해 H.264를 사용하는 것이 좋습니다.

Local에 이미지를 저장해서 로컬에서 이미지를 불러오는것도 가능은 하지만 로컬에 저장하는것보다 이 방식을 사용하는 것이 
파일 관리도 쉽고 이용하기도 쉬운것 같다.