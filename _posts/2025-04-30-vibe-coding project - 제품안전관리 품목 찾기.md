---
title: "노코딩 프로젝트 리스트 - 제품안전관리 품목 찾기"
categories:
  - Non-coding
  - Vibe-coding
  - workflow Automation
tags:
  - AI
  - Gemini
  - Copliot
  - MVP
  - 바이브코딩
last_modified_at: 2024-04-30T13:00:00+13:30
---



### [개발완료] 제품안전관리 품목 찾기 web application
- [품목 찾기 웹사이트](https://product-items-viewer-app.web.app/)
- [품목 찾기 관리자 웹사이트](https://product-items-viewer-app.web.app/admin)
  - 관리자용 webpage로 품목 데이터 업로드



### 배경
- 제품안전관리법에 의해 규제받는 제품인지 아닌지 쉽게 찾아주는 web application
- firebase를 기초로, gemini 2.5 pro exp(https://aistudio.google.com)와 VScode copliot을 이용하여 만듬
  

  
### 구현 단계 요약:
0. (아주 초기단계) 간단한 web app. 우선 개발
   - `index.html` `style.css` `script.js` 를 같은 폴더에 넣고, index.html을 실행
   - data는 `index.html`로 올리도록 함
1.  (심화단계) **Firebase 프로젝트 생성:** Firebase 웹사이트에서 새 프로젝트를 만듭니다.
2.  **Firestore 설정:** 데이터베이스를 활성화합니다.
3.  **Cloud Functions 작성 (Node.js):**
    *   관리자용 함수: 비밀번호와 엑셀 파일을 받아 Firestore에 저장하는 함수 (보안 적용)
    *   사용자용 함수: Firestore에서 데이터를 조회하여 전달하는 함수 (공개)
4.  **기존 Frontend 수정:**
    *   **사용자 페이지 (`script.js`):** 로컬 파일 업로드 대신, 사용자용 Cloud Function을 호출하여 데이터를 받아오도록 수정합니다.
    *   **관리자 페이지 (`admin.html`, `admin.js` 새로 만들기):** 파일 업로드와 비밀번호 입력 필드를 만들고, 관리자용 Cloud Function으로 데이터를 전송하는 JavaScript 코드를 작성합니다.
5.  **Firebase Hosting 배포:** 사용자 페이지와 관리자 페이지 파일들을 Firebase Hosting에 배포합니다.



### 걸린 시간:
- 2일(대략 6시간 걸림)



### 시사점
- 어려운 용어들이 많아, firestore 등 백엔드 만들기가 쉽지 않았으나, 좋은 경험이 됨
- database 공부 많이 해야겠다는 생각이...


---

