---
layout: single
title:  "하이라이트 & URL로 이동"
categories: Tableau
tag: [Tableau]
toc: true
---

## 하이라이트 & URL로 이동

**하이라이트 액션**은 설정한 값은 색상을 지정하고, 다른 모든 값들은 흐릿하게 보여주는 기능이다. 그리고 **URL로 이동**은 대시보드 내의 값을 선택하면 웹 페이지로 아웃링크를 보내는 기능이다.

## 하이라이트

새로운 데이터 원본인 '플랫잇 소셜 미디어 채널_2019.xlsx'파일에서 '누적 고객 수'라는 시트를 캔버스에 올린다. 그다음 [네이버 블로그]필드를 선택하고 Shift를 누른 상태에서 끝에 있는 [유튜브]를 선택하면 [네이버 블로그],[페이스북],[인스타그램],[유튜브]필드 모두 영역으로 잡히게 된다. 그 상태에서 '피벗'을 선택해준다.

![image](https://user-images.githubusercontent.com/100071667/226947164-92100f5b-86b4-4d4d-9215-b7878796a38c.png)

피벗 필드 명을 [소셜미디어 채널]로, 피벗 필드 값을 [구독자수]로 변경해준다.

![image](https://user-images.githubusercontent.com/100071667/226948666-5c287c11-0217-4c68-a986-ef7d75ae75fe.png)

서로 겹치는 필드명이 없어서 조인에 에러가 나는데 수동으로 '누적 고객 수' 시트는 [소셜미디어 채널]을, '소셜 미디어 채널 URL'시트는 [소셜 미디어 채널]을 수동으로 필드를 연결해준다.

![image](https://user-images.githubusercontent.com/100071667/226949481-28eebfc5-1f01-44b4-80aa-c692b7d6114d.png)

마크를 '모양'마크로 변경하고 차원의 [소셜 미디어 채널]을 모양 마크에 올리고 [소셜 미디어 채널]을 열선반에 올려준다.

![image](https://user-images.githubusercontent.com/100071667/226950897-90f5628a-0346-485f-9651-7f5c4394a54f.png)

각각의 소셜 미디어 채널의 모양 아이콘을 삽입하려고 한다. 먼저 데이터 원본 폴더에 있는 '소셜 미디어 채널'이라는 이미지 폴더를 복사해서 아래와 같은 경로에 둔다.

![image](https://user-images.githubusercontent.com/100071667/226951563-7e68e294-8ccc-4154-95ef-5a6c9720dbe3.png)

그 후 모양 마크를 누르고 모양표 선택에서 소셜 미디어 채널을 선택해주고 확인을 눌러준다.

![image](https://user-images.githubusercontent.com/100071667/226952020-b00a01c2-fab0-436f-9a76-a1a28e967205.png)

![image](https://user-images.githubusercontent.com/100071667/226953410-615b9a73-f061-41b8-a781-a1a9c1c20aa1.png)

차원에 있는 [URL]필드를 '세부 정보'마크에 올리고 워크 시트의 이름을 '소셜 미디어 채널'로 입력해준다.

![image](https://user-images.githubusercontent.com/100071667/226954001-a373ca25-1bce-4b1b-a445-6631b1041281.png)

새로운 워크시트를 열어주고 [구독자 수]필드를 행선반에 [월간]필드를 마우스 왼,오를 다 누른 상태에서 열선반에 올리고 초록색 연속형 '월(월간)'을 선택해준다.
하단의 축을 우클릭하여 '축 편집'을 선택하고 제목을 '월'로 변경하고 시트의 이름 또한 '소셜 미디어 채널별 누적 구독자 수'로 변경해준다.

![image](https://user-images.githubusercontent.com/100071667/226955691-43178a7a-18ce-44b3-85ca-125deac04785.png)

새로운 대시보드를 연 다음 아래와 같이 드래그해서 위치시킨다.

![image](https://user-images.githubusercontent.com/100071667/226957338-677c9503-ace3-4339-bed6-e6b56da88c39.png)

두 개 시트 모두 시트 제목을 '제목 숨기기'를 선택하고 '대시보드'메뉴에서 '동작'을 클릭하여 '동작 추가'선택 후 '하이라이트'를 선택해준다. 그리고 다음과 같이 설정해준다. 상단 시트에 마우스 오버하면 하단 시트에 해당 소셜 미디어 채널명이 하이라이팅 된다는 설정이다.

![image](https://user-images.githubusercontent.com/100071667/226956921-988e5347-9b84-4225-98fc-ac687574af5e.png)

다시 한번 '동작 추가'버튼을 눌러 아래와 같이 작성해준다.

![image](https://user-images.githubusercontent.com/100071667/226959558-b3caaa01-c993-4aa3-b3c8-09b7034a3978.png)

대시보드의 제목을 아래와 같이 입력해준다.

![image](https://user-images.githubusercontent.com/100071667/226961582-bedd486d-2b1d-41bb-9029-ee9d262ff6de.png)
