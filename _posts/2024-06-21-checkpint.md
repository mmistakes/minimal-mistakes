---
layout: single
title: 체크포인트
categories: StickyNote 
tag: [StickyNote]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
search: true
sidebar:
    nav: "counts"
---





## StickyNote

+ [ ] [메타 스페이스 학습](https://jaemunbro.medium.com/java-metaspace%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-ac363816d35e)

​	메타 스페이스는 자바 8 버전에 PermGen을 대체한 메모리 영역입니다.
​	`Class`정보와 `Method metadata`, `constant pool`등이 저장되는 공간입니다.
​	변경된 이유는 `PermGen`은 고정된 메모리 영역이기 때문에 문자열 풀이 많아진다면 `OOM`메모리 부족으로 JVM이 멈추는 현상을 줄여줍니다.

+  [PermGen](https://www.baeldung.com/java-permgen-metaspace)