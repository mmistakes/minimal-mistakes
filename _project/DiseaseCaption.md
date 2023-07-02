---
title: "고추 질병해 진단 앱"
property: "연구 과제"
period: "2022/11/17 ~ 2023/04/15"
excerpt: "Android / Kotlin / Retrofit2 / Postman / GitHub"
header:
  image: /assets/images/plantdisease.png
  teaser: assets/images/plantdisease.png
---

### 🔗 Link

Source

Android : https://github.com/agfalcon/plum_1_PlantDiseaseApp (private)



### 📖 상세 내용

<p align="center">

<img src="\images\DiseaseCaption\EMB00004e648694.bmp" alt="앱 예제" style="zoom: 15%;" />  	<img src="\images\DiseaseCaption\EMB00004e648697.bmp" alt="앱 예제" style="zoom: 15%;" /> 	 <img src="\images\DiseaseCaption\EMB00004e64869a.bmp" alt="앱 예제" style="zoom: 15%;" />  	<img src="\images\DiseaseCaption\EMB00004e64869d.bmp
" alt="앱 예제" style="zoom: 15%;" /> <img src="\images\DiseaseCaption\EMB000016ac86fe.jpg
" alt="앱 예제" style="zoom: 15%;" />

 <img src="\images\DiseaseCaption\EMB000016ac8704.bmp
" alt="앱 예제" style="zoom: 15%;" /></p>

<div style="display: flex; width: 100%; border-radius: 3px; background: rgb(251, 236, 221); padding: 16px 16px 16px 12px;"><div><div class="notion-record-icon notranslate" style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px; border-radius: 0.25em; flex-shrink: 0;"><div style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px;"><div style="height: 16.8px; width: 16.8px; font-size: 16.8px; line-height: 1; margin-left: 0px; color: black;"><img class="notion-emoji" alt="🐷" aria-label="🐷" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" style="width: 100%; height: 100%; background: url(&quot;/images/emoji/twitter-emoji-spritesheet-64.d3a69865.png&quot;) 18.6441% 89.8305% / 6000% 6000%;"></div></div></div></div><div style="display: flex; flex-direction: column; min-width: 0px; margin-left: 8px; width: 100%;"><div spellcheck="true" placeholder="내용을 입력하세요" data-content-editable-leaf="true" contenteditable="false" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding-left: 2px; padding-right: 2px; font-size: 16px"><span style="font-weight:600" data-token-index="0" class="notion-enable-hover">연구 과제</span>로 진행된 프로젝트입니다. 고추 질병해 진단 앱은 <span style="font-weight:600" data-token-index="2" class="notion-enable-hover">사진 촬영, 동영상, 내부 저장소 이미지를 통해 서버에 있는 모델에 보내 질병해를 진단하고 그 결과를 다시 받아서 저장하는 앱</span>입니다.</div></div></div>



### 🛠️ 사용 기술 및 라이브러리
<p style="font-size:16px;">
- Kotlin, Android<br>
- Retrofit2, Volley, glide, camera2<br>
- Figma, Postman, GitHub<br>
</p>



### 📱 담당한 기능(Android)
<p style="font-size:16px;">
- Figma를 활용하여 앱 디자인<br>
- 전체 UI 구성<br>
- Recycler View를 통해 이미지 저장 폴더를 날짜 별로 제공<br>
- Retrofit2를 활용하여 서버에 이미지 전송 및 이미지 반환<br>
- Volley를 통해 서버와 간단한 통신<br>
- 사진 촬영 기능, 외부 사진 촬영 기능 불러오기<br>
- 저장 이미지 기능, 내부 이미지를 불러오기<br>
- 동영상 기능, camera 라이브러리를 이용해 3초마다 사진을 자동으로 촬영해 서버로 전송<br>
- 그 외 모든 안드로이드 앱 관련 제작<br>
</p>




### 💡 깨달은 점
<p style="font-size:14px;">
- 대부분의 카메라 기능에 대한 레퍼런스는 이미 deperacted 된 것으로 최신 기술을 찾기 위해 해외 사이트 및 공식 다큐먼트를 참조하면서 해결함.<br>
- aws에 있는 서버의 자원이 낮아 질병해 판단이 느려 서버에서 반환이 느려 retrofit2 통신 시 오류가 발생함. retrofit을 build 할 때 시간을 지정해 해결함.
- 기존에 이미지를 인코딩해서 보내봤지만 이미지 파일을 그대로 보내본 적이 없는데 이번 프로젝트에서 Multipart를 이용해 해결해봄.
- 리스트 형태의 리사이클러 뷰만 사용해보다가 이번에 이미지 폴더 구조를 나타내기 위해 grid 형태로 사용해봄.
</p>