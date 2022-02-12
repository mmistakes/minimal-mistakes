---
layout: single
title: wget,curl을 통해 다운로드
categories: 딥러닝
tag: 딥러닝환경설정
typora-root-url: ../
---

클라우드를 통해 gpu를 사용할 일이 생겼는데
그 곳에 데이터, 환경설정 등 여러일을 해줘야한다. 그 중에서 나의 데이터를 클라우드 컴퓨터 상에 전달을 해야하는데 이를 구글 드라이브를 통해 데이터를 옮기는것이 가장 보편적이기에 포스팅해본다. 

1. 먼저 구글드라이브에 업로드 후 데이터 링크를 공유한다. 
![post1](/images/2022-2-12-wgetandcurl.md/일번.PNG)
![post2](/images/2022-2-12-wgetandcurl.md/이번.PNG)

이렇게 공유가 허가된 드라이브 내의 파일을 다운받고싶은 환경에서 command를 통해 내려받아준다.링크에서 d/와 /view 사이에 있는 값이 파일 아이디(FILEID)입니다.

'''
wget --load-cookies ~/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies ~/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id={FILEID}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id={FILEID}" -O {FILENAME} && rm -rf ~/cookies.txt

'''
위 명령어의 {FILEID}에 상단에서 얻었던 실제 FILEID를 대치하고, {FILENAME}에는 원하는 파일 이름을 넣어주시면 됩니다.

'''
curl -Lb ~/cookie.txt "https://drive.google.com/uc?export=download&confirm=`awk '/_warning_/ {print $NF}' ~/cookie.txt`&id=${FILEID}" -o ${FILENAME}
'''