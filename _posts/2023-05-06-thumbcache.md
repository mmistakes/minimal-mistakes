---
layout: single
title: 썸네일 캐시 삭제, 생성방지(thumbs.db, thumbcache_*.db)
tags: other
---
    
## 썸네일 포렌식 분석(Thumbnail Forensics)
윈도우는 자체적으로 파일의 썸네일을 생성하여 데이터베이스의 형식으로 저장한다. 미리보기를 한번이라도 했다면 썸네일이 데이터베이스에 저장되는데 원본 파일이 삭제되더라도 이것은 삭제되지 않는다. 사용자가 고의로 삭제하지 않는 이상 썸네일은 데이터베이스에 남아있다.

gpedit.msc  
로컬 컴퓨터 정책> 사용자구성 >관리템플릿> windows 구성요소 > 파일탐색기  
숨겨진 thunbs.db 파일에서 미리보기 캐싱 끄기  
옵션을 사용으로  

기존에 생성된 thumbs.db 파일은 삭제해줘야된다  
thumbnail database cleaner 프로그램이 있다.  
http://www.itsamples.com/thumbnail-database-cleaner.html

C:\Users\User\AppData\Local\Microsoft\Windows\Explorer  
폴더안의 thumbcache_*.db 삭제

thumbcache-viewer 프로그램으로 내용을 확인할수도 있다.  
http://www.itsamples.com/thumbnail-database-viewer.html

## 참고 
http://forensic-proof.com/archives/2092  
https://kali-km.tistory.com/entry/Icon-Forensic-ICON-%EB%B6%84%EC%84%9D?category=522239
