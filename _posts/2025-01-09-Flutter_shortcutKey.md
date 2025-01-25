---
layout: single
title: "[Flutter]알고 있으면 유용한 Android Studio 단축키"
categories: Flutter
tag: [Flutter, AndroidStudio]
date: 2025-01-09
published: true
toc: true # 목차 생성
author_profile: true # 사용자 프로필
search: true # false로 설정하면 검색시 내용이 뜨지 않는다.
---
업데이트: 2025년 1월 25일

안녕하세요. Satomi입니다. 오늘은 **Flutter 개발을 위해 Android Studio를 사용할 때, 알고 있으면 유용한 단축키**들을 기록하고자 합니다. 공부하면서 차근차근 업로드하려고 해서, 추후 계속 업데이트가 될 예정입니다 :)

# 코드 정렬
***
> Ctrl + Alt + l


# Widget 추가
***
> 추가하려는 widget에 커서를 올린 후 Alt + Enter

![add_widget](https://github.com/user-attachments/assets/bda1af05-d715-494f-a5df-d43363d0ff65)
위 예시처럼 Text를 다른 위젯으로 감싸고 싶을 때, **ALT + Enter** 단축키를 사용하여 widget으로 감싸고, 이후 본인이 원하는 위젯으로 이름을 변경해주면 쉽게 코딩을 할 수 있습니다.

응용으로, Widget 외에도 Center를 선택하면 가운데 정렬을 할 수 있고, **Remove this Widget**을 선택하면 위젯을 쉽게 제거할 수 있습니다!


# StatelessWidget 상속 클래스 작성시 단축키
***
> stless 입력하고 + Enter

![add_stless](https://github.com/user-attachments/assets/831373d7-ea2d-4831-8425-6fd61871de1a)
Android Studio에서 StatelessWidget을 상속하는 클래스를 생성하려고 할 때, **stless + Enter**를 하면 쉽게 코드를 추가할 수 있습니다. 이때 클래스 이름칸은 비어있는데, 원하는 이름으로 작성하면 됩니다. 


# 중복되는 코드 한번에 수정하기
***
> Ctrl + R

![Image](https://github.com/user-attachments/assets/efcb78de-7430-4426-9e2f-ba1432fa2fed)
위 예시는 Container의 margin 속성을 horizontal에서 vertical로 변경하는 것을 보여주고 있습니다. 이때 동일한 코드가 중복되는데, 일일이 변경하려면 번거롭겠지만 Android Studio에서는 **Ctrol + R** 단축키를 이용하면 쉽게 한번에 변경이 가능합니다. **Ctrl + R** 키를 입력하면 위에 입력칸이 생성되는데 이때 윗칸에는 변경 이전의 코드를, 아랫칸에는 변경 후의 코드를 입력하시고 **Replace All** 버튼을 클릭하시면 됩니다! 


# child 속성 한번에 맨 아래로 위치 변경하기
***
> child에 커서를 올린 후 Alt + Enter

![Image](https://github.com/user-attachments/assets/920ad43e-4823-45e1-b747-3c1b4a47ee48)
Flutter에서는 기본적으로 child를 맨 아래에 위치하는 것을 추천하고 있습니다. 위 예시에서는 Container의 다양한 속성 중 child가 맨 위에 위치해 있는데요, 이때 child에 커서를 올린 후 **Alt + Enter** 키를 입력하고, **Move child properties to ends of arguments everywhere in file**을 선택하시면, 모든 child 속성이 각 위젯에서 맨 아래에 위치하도록 수정되는 것을 확인할 수 있습니다.


*** 
오늘은 공부하면서 배웠던 Android Studio 단축키들을 기록해보는 시간을 가졌습니다! Flutter 개발 할 때 알고 있으면 유용한 기능들인데, 앞으로도 공부하면서 배운 유용한 단축키들을 업데이트하도록 하겠습니다~ :)
감사합니다.