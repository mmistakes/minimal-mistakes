---
title: "Planet Love Lamp"
property: "기업 외주"
period: "2022/12/7 ~ 2023/03/07"
excerpt: "Android / Kotlin / Bluetooth / GitHub"
header:
  image: /assets/images/PlanetLove.png
  teaser: assets/images/PlanetLove.png

---
### 🔗 Link

Source

Android :  https://github.com/agfalcon/planetLoveLamp (private)



### 📖 상세 내용

<p align ="center">

<img src="\images\SmartLamp\image-20230703005612151.png" alt="앱 예제" style="zoom: 40%;" />  	<img src="\images\SmartLamp\image-20230703005702557.png" alt="앱 예제" style="zoom: 40%;" /> 	
</p>
<div style="display: flex; width: 100%; border-radius: 3px; background: rgb(251, 236, 221); padding: 16px 16px 16px 12px;"><div><div class="notion-record-icon notranslate" style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px; border-radius: 0.25em; flex-shrink: 0;"><div style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px;"><div style="height: 16.8px; width: 16.8px; font-size: 16.8px; line-height: 1; margin-left: 0px; color: black;"><img class="notion-emoji" alt="🐷" aria-label="🐷" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" style="width: 100%; height: 100%; background: url(&quot;/images/emoji/twitter-emoji-spritesheet-64.d3a69865.png&quot;) 18.6441% 89.8305% / 6000% 6000%;"></div></div></div></div><div style="display: flex; flex-direction: column; min-width: 0px; margin-left: 8px; width: 100%;"><div spellcheck="true" placeholder="내용을 입력하세요" data-content-editable-leaf="true" contenteditable="false" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding-left: 2px; padding-right: 2px; font-size: 16px"><span style="font-weight:600" data-token-index="0" class="notion-enable-hover">기업 외주</span>로 진행된 프로젝트입니다. 가로등 관리 앱은 <span style="font-weight:600" data-token-index="2" class="notion-enable-hover">블루투스를 통해 가로등의 정보를 확인하고 휴대폰을 통해서 가로등의 설정을 변경할 수 있는 앱</span>입니다. 가로등에 사용하는 블루투스 모델 HC-06과 블루투스 연결을 하고 시리얼 통신을 진행합니다. 가로등의 배터리 잔량과 dimming time, 밝기 등 정보를 확인하고 이를 휴대폰을 통해서 변경할 수 있습니다.</div></div></div>



### 🛠️ 사용 기술 및 라이브러리

<p style="font-size:16px;">
- Kotlin, Android<br>
- Android Bluetooth API<br>
- Figma, GitHub<br>
</p>




### 📱 담당한 기능(Android)
<p style="font-size:16px;">
- Figma를 활용하여 앱 디자인<br>
- 전체 UI 구성<br>
- 블루투스 연결 기능<br>
- 블루투스 socket 연결 <br>
- command 별 블루투스 통신(read, write) 기능 <br>
- 그 외 모든 안드로이드 기능<br>
</p>





### 💡 깨달은 점
<p style="font-size:14px;">
- 블루투스 연결 기능에는 일반 블루투스 연결과 저전력 블루투스가 있음.<br>
- 안드로이드에서 제공하는 기능이라도 하드웨어의 성격에 맞게 기능을 잘 고르고 설계를 해야함.<br>
    &emsp;- 기업에서 저전력 블루투스 기능을 원함 -> 저전력 블루투스 통신이 안되어 HC-06 다큐먼트를 찾아보니 저전력 블루투스 지원이 안됨.<br>
    &emsp;- HC-06과 통신을 할 때 보낸 값과 일치하지 않은 결과가 나옴 -> HC-06은 한 번에 최대 8바이트 통신만 됨.<br>
    &emsp;- 하드웨어의 성격을 고려하지 못하고 코딩을 하니 시간 낭비가 많이 되었음. 앞으로 하드웨어가 포함된 프로젝트라면 하드웨어의 성격을 먼저 파악하고 설계 필요.<br>
- 백그라운드에서 UI를 수정할 떄 setValue를 하면 오류 -> postValue를 사용해야함.<br>
- 경험해보지 못한 다양한 성격의 안드로이드 앱 제작이 시야를 넒혀주는 것 같아 앞으로도 다양한 시도를 많이 해보고 싶음.<br>
</p>