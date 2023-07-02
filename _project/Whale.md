---
title: "장애인 맞춤형 취업 추천 앱"
property: "팀 프로젝트"
period: "2023/02/23 ~ 2023/06/09"
excerpt: "Android / Kotlin / Jetpack Compose / Multi module / Dagger Hilt / Retrofit2 / Postman / Notion / GitHub / Recommend System"
header:
  image: /assets/images/whale.png
  teaser: assets/images/whale.png
---
### 🔗 Link

Source

Android :  https://github.com/whale2023/job-recommendation-android<br>
Server :  https://github.com/whale2023/job-recommendation-backend



### 📖 상세 내용

<p align ="center">
<img src="\images\NewRun\EMB000023b46731.JPG" alt="앱 아키텍처" style="zoom: 100%;" />

<img src="\images\NewRun\EMB000023b4673c.jpg" alt="앱 예제" style="zoom: 10%;" />  	<img src="\images\NewRun\EMB000023b4673f.jpg" alt="앱 예제" style="zoom: 10%;" /> 	 <img src="\images\NewRun\EMB000023b46742.jpg" alt="앱 예제" style="zoom: 10%;" />  	<img src="\images\NewRun\EMB000023b46745.jpg" alt="앱 예제" style="zoom: 10%;" />   	<img src="\images\NewRun\EMB000023b46748.jpg" alt="앱 예제" style="zoom:10%;" />  	

</p>   

<div style="display: flex; width: 100%; border-radius: 3px; background: rgb(251, 236, 221); padding: 16px 16px 16px 12px;"><div><div class="notion-record-icon notranslate" style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px; border-radius: 0.25em; flex-shrink: 0;"><div style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px;"><div style="height: 16.8px; width: 16.8px; font-size: 16.8px; line-height: 1; margin-left: 0px; color: black;"><img class="notion-emoji" alt="🐷" aria-label="🐷" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" style="width: 100%; height: 100%; background: url(&quot;/images/emoji/twitter-emoji-spritesheet-64.d3a69865.png&quot;) 18.6441% 89.8305% / 6000% 6000%;"></div></div></div></div><div style="display: flex; flex-direction: column; min-width: 0px; margin-left: 8px; width: 100%;"><div spellcheck="true" placeholder="내용을 입력하세요" data-content-editable-leaf="true" contenteditable="false" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding-left: 2px; padding-right: 2px; font-size: 16px"><span style="font-weight:600" data-token-index="0" class="notion-enable-hover">팀 프로젝트</span>로 진행된 프로젝트입니다. 장애인 맞춤형 취업 추천 앱 Whale은 <span style="font-weight:600" data-token-index="2" class="notion-enable-hover">공공데이터를 활용하여 자체 알고리즘에 따라서 사용자의 스펙과 선호도에 따라 구인 중인 회사를 추천하는 앱</span>입니다. 사용자가 회원가입 시 장애 유형과 등급을 저장하고 이력서를 작성하면서 자격증, 학력과 같은 스펙과 연봉, 배리어프리 여부, 주변 건강센터 유무 등 선호하는 사항을 선택할 수 있습니다. 이에 따라 자체 알고리즘을 통해 점수를 매겨 사용자에게 추천해주고, 사용자는 이를 위시리스트에 추가하여 관리할 수 있습니다. 또한, 협업 필터링 방식을 이용하여 나와 유사한 사람의 선호하는 아이템도 같이 추천을 해줍니다.</div></div></div>



### 🛠️ 사용 기술 및 라이브러리
<p style="font-size:16px;">
- Kotlin, Android<br>
- Jetpack Compose<br>
- dagger hilt, Gson, Retrofit2<br>
- navigation, Icons, coil, pager, kalendar<br>
- Timber<br>
- Figma, Postman, GitHub<br>
</p>



### 📱 담당한 기능(Android)
<p style="font-size:16px;">
- Figma를 활용하여 앱 디자인<br>
- di, presentation, domain, data 멀티 모듈 설계<br>
- mvvm 구조에 맞게 전체 구조 설계<br>
- 일관된 디자인을 위해 MaterialTheme(color, typorgraphy, padding) 세팅<br>
- 의존성 주입을 위한 기초 세팅<br>
- 전체 navigation 흐름에 맞게 구축<br>
- Retrofit2 통신 구조 설계 및 세팅<br>
- 로그인 UI, 회원가입 UI, 홈 UI, 추천 UI, 위시 리스트 UI 구성<br>
- UserInfo 싱글톤 객체 생성 및 관리<br>
- 로그인 기능<br>
- 회원가입 기능, 다음 새주소 API를 웹뷰로 제공<br>
- pager로 주요 행사 홈에 띄우기<br>
- Custom Calendar 제작<br>
</p>




### 💡 깨달은 점
<p style="font-size:14px;">
- Jetpack Compose를 처음 공부하고 프로젝트를 하면서 전반적인 기초를 쌓음.<br>
- composable의 생명주기에 대해 이해할 수 있었고, 불필요한 recomposition을 최소화 하기 위해 노력함.<br>
- Flow의 사용법에 대해 이해하였고 통신 시 State 클래스 상태에 따라 화면에 출력을 해줄 수 있게 구축할 수 있었음.<br>
- multi module과 의존성 주입으로 클린 아키텍처를 설계하고 코드의 재사용성이나 유지 보수의 장점에 대해 이해함.<br>
- MaterialTheme을 사용해서 UI를 구성 시 일관된 디자인을 유지할 수 있었음.<br>
</p>