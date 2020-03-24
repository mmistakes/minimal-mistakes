---
title: Maven 빌드 시 Build Fail 오류 해결 방법
categories:  
- java 
- maven
- error

tags:
   - maven
   - pom.xml
   - manifest

author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true #Table Of Contents 목차 보여줌2
toc_label: "My Table of Contents" # toc 이름 정의
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-03-23T16:15:00 # 마지막 변경일

---

====================== Error Message ======================

[INFO] ------------------------------------------------------------------------

[INFO] BUILD FAILURE

[INFO] ------------------------------------------------------------------------

[INFO] Total time: 1.320 s

[INFO] Finished at: 2016-09-15T23:01:07+09:00

[INFO] Final Memory: 8M/153M

[INFO] ------------------------------------------------------------------------

**[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:2.5.1:compile (default-compile) on project set: Fatal error compiling: tools.jar** **not found: C:\Program Files\Java\jre1.8.0_102\..\lib\tools.jar**  -> [Help 1]

[ERROR]

[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.

[ERROR] Re-run Maven using the -X switch to enable full debug logging.

[ERROR]

[ERROR] For more information about the errors and possible solutions, please read the following articles:

[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException

======================================================

위와 같은 


# Reference
*  [프로그래밍 노트](https://pnot.tistory.com/6) 
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTMwMzE1MTk1XX0=
-->