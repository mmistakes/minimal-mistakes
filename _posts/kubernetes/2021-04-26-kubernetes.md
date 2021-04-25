---
title: domain 관련 용어 및 흐름 정리
excerpt: domain의 뜻과 관련된 용어 정리, 어떤 흐름으로 도메인이 이용되는지를 정리해본다.

categories: 
   - domain

tags:
   - IaC
   - Infrastructure as Code
   - k8s
   - kubernetes
   - ingress
   - sub domain
   - domain
   - end point

author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true #Table Of Contents 목차 보여줌2
toc_label: "My Table of Contents" # toc 이름 정의
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2021-04-12T17:02:00 # 마지막 변경일

---


# 도메인 용어 정리

![도메인 정리](https://i.ibb.co/TcDDVRm/Untitled.png)

url으로 들어오면 domain으로 어디로 라우팅 될지 정해지고, 도착한 도메인에서 ingress에서 sub domain으로 라우팅되고(IaC로 설정), 해당 sub domain에서 어떤 서비스로 갈 지는 각 서비스 repo에서 k8s 설정에서 수정 가능하다.

---
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ1ODY3NDUxN119
-->