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
<img src="/images\ControlPanel\제어반 아키텍처.png" alt="제어반 아키텍처" style="zoom: 100%;" /><br><br>

<img src="/images\ControlPanel\image-20230702195415982.png" alt="제어반 예제" style="zoom: 60%;" />  	<img src="/images\ControlPanel\image-20230702195433734.png" alt="제어반 예제" style="zoom: 60%;" /> 	 <img src="/images\ControlPanel\image-20230702195517858.png" alt="제어반 예제" style="zoom: 70%;" />  	<img src="/images/ControlPanel/image-20230702195540328.png
" alt="제어반 예제" style="zoom: 50%;" /></p>

<div style="display: flex; width: 100%; border-radius: 3px; background: rgb(251, 236, 221); padding: 16px 16px 16px 12px;"><div><div class="notion-record-icon notranslate" style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px; border-radius: 0.25em; flex-shrink: 0;"><div style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px;"><div style="height: 16.8px; width: 16.8px; font-size: 16.8px; line-height: 1; margin-left: 0px; color: black;"><img class="notion-emoji" alt="🐷" aria-label="🐷" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" style="width: 100%; height: 100%; background: url(&quot;/images/emoji/twitter-emoji-spritesheet-64.d3a69865.png&quot;) 18.6441% 89.8305% / 6000% 6000%;"></div></div></div></div><div style="display: flex; flex-direction: column; min-width: 0px; margin-left: 8px; width: 100%;"><div spellcheck="true" placeholder="내용을 입력하세요" data-content-editable-leaf="true" contenteditable="false" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding-left: 2px; padding-right: 2px; font-size: 16px"><span style="font-weight:600" data-token-index="0" class="notion-enable-hover">기업 연계 프로젝트</span>로 진행된 프로젝트입니다.  지중화 제어반 관리 애플리케이션은 <span style="font-weight:600" data-token-index="2" class="notion-enable-hover">지중화 제어반의 위치와 상태를 확인할 수 있는 앱</span>입니다. 도심 속 진행되고 있는 지중화 사업에 맞춰서 개발된 사업으로 제어반의 상태와 위치를 서버로 부터 확인할 수 있습니다.직접 관리하기 위해 사용자가 제어반까지의 길을 찾을 수 있고 도심 속에서 GPS가 잘 안될 경우와 정확한 매립 위치 확인을 위해 ARCore와 주변 상황 인식 기술을 이용해 정확한 매립 위치를 AR 카메라를 통해서 사용자에게 제공해줍니다.</div></div></div>



### 🛠️ 사용 기술 및 라이브러리
<p style="font-size:16px;">
- Kotlin, Android<br>
- Google Maps, Google ARCore<br>
- Retrofit2, SlidingUpPanel, Room, javagl<br>
- Figma, Postman, GitHub<br>
- AWS<br>
- Node.js, Flask<br>
- Darkent & YOLOv4<br>
- MySQL<br>
</p>


### 📱 담당한 기능(Android)
<p style="font-size:16px;">
- Figma를 활용하여 앱 디자인<br>
- 전체 UI 구성<br>
- Room 라이브러리로 제어반 정보 내부 데이터베이스에 저장<br>
- Retrofit2를 활용하여 서버에서 제어반 정보에 대한 CRUD 기능<br>
- ARCore를 적용 매립 위치 보여주기 기능<br>
- MVVM 패턴 적용<br>
- 그 외 모든 안드로이드 앱 관련 제작<br>
</p>



### 💡 깨달은 점
<p style="font-size:14px;">
- 앱 지식이 없을 때 부터 맡은 첫 앱 프로젝트라서 지식이 쌓일 때 마다 수정하면서 실력이 성장하는 것을 느낄 수 있었음.<br>
- GitHub를 통해서 큰 수정 마다 새로운 버전으로 관리를 하면 편리함.<br>
- domain layer와 data layer를 잘 나누어 아키텍처를 설계하니 추후에 코드를 수정할 때 편리함.<br>
- 사용자의 위치 정보를 object 객체로 관리했는데 실무에서는 유저 정보 같은 경우 어떻게 관리하는지 공부해야할 것 같음.<br>
- 기업과 연계하여 2년 간의 오랜 기간동안 적정 목표를 달성하고 계속해서 회의 및 수정하는 과정에서 적극적인 소통과 명세서가 매우 중요함을 느낌.<br>
- Room의 경우 수정 시 version과 함께 migrate 과정이 필요함을 알게 되었고 그 과정을 공부할 수 있었음.<br>
- ARCore를 적용하면서 공식 문서나 해외 자료들을 찾는 습관을 갖추게 됨.<br>
</p>