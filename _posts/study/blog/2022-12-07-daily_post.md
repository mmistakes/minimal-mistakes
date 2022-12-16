---
Layout: post
title: "2022-12-07 포스트 주소에 대해서"
excerpt: "깃허브(jekyll) 블로그의 포스트 주소는 어떻게 정해지는걸까? 포스트 주소의 형식에 대해서 몇 가지 시험해보았다."
categories: blog
date: 2022-12-07
---
<span style="font-size:12pt">
  
_posts/[category]/YYYY-MM-DD-[NAME].md 형식의 파일명에  
카테고리를 [category] 로 잡고 글을 쓰니까 
게시글 주소가 kim-menboong.github.io/category/name 으로 되었다.  
  
이를 바탕으로 게시글주소에 대해 몇 가지 테스트를 해 보았다.  

테스트 결과  
(1) 일단 이름이 겹치면 아예 포스트 리스트에서 나타나질 않나?  
  ??  
(2) 한글주소나 특수문자는 인식이 안되나?  
  파일명에 한글이나 언더바가 있어도 잘 인식이 된다.  
(3) 폴더명/카테고리명이 서로 다른 경우는?  
  카테고리명을 기준으로 주소가 할당되는것 같다.  
  _posts/[folder]/YYYY-MM-DD-[Title].md 파일을 만들어,  
  front matter의 카테고리를 [category] 라고 하면  
  [repository name].github.io/[category]/[name] 의 주소를 할당해 준다.

테스트 끝!
