---
title: yabai+skhd 튜토리얼(2024)
date: 2024-07-20
categories: productivity
---

## yabai+skhd 소개

Mac에는 다양한 window management tool이 있다. rectangle, magnet, 그리고 최근 macos에는 이러한 기능이 내장되어서 보다 편리하게 창을 관리할 수 있게 되었다. 하지만 컴퓨터를 오래 만지다 보니 키보드와 마우스를 왔다갔다하는 것 조차 귀찮아서, 키보드로만 창을 관리할 수 있는게 없나 찾아보다가 yabai와 skhd라는 툴을 발견하게 되어 잘 사용하고 있다. 하지만 한국에서는 yabai와 skhd와 관련된 문서가 존재하지 않아, 이를 입문하는 사람들에게 도움이 되고자 포스트를 작성한다.

Yabai는 macOS에서 사용할 수 있는 타일링 윈도우 매니저로, i3와 같은 타일링 윈도우 매니저에서 영감을 받아 개발되었다. Yabai를 사용하면 창을 자동으로 타일 형식으로 배치할 수 있으며, 키보드 단축키와 마우스 제스처를 통해 창을 자유롭게 이동하고 크기를 조정할 수 있다. 이를 통해 화면 공간을 효율적으로 활용할 수 있다.

Skhd는 macOS에서 사용할 수 있는 강력한 단축키 데몬으로, Yabai와 함께 사용하면 더욱 강력한 창 관리 환경을 구축할 수 있다. Skhd는 사용자가 정의한 단축키를 통해 Yabai의 기능을 손쉽게 사용할 수 있도록 해준준. 이를 통해 창 관리뿐만 아니라 다양한 작업을 빠르게 수행할 수 있다.

### yabai 설치

```bash
brew install koekeishiya/formulae/yabai
```

### yabai 시작 커맨드

```zsh
yabai --start-service
```

### yabai stop 커맨드

```zsh
yabai --stop-service
```

### yabai 설정 파일 만들기(yabairc)

```zsh
cd $HOME/.config/ && mkdir -p yabai && touch yabai/yabairc
```

- yabai 폴더 열기

```zsh
open ~/.config/yabai
```

### yabai 설정

- 아래의 파일이 뜨면 코드 편집기(터미널에서는 nano, vim, IDE는 vscode 같은 거)로 수정을 한다
  ![Image](https://i.imgur.com/lX4RFCS.png)

#### Yabai 명령어 구조와 키워드

```zsh
yabai -m <command> [options] [arguments]
```

1. yabai: Yabai 프로그램을 실행하는 기본 명령어입니다.
2. -m: Yabai로 명령을 보내기 위한 플래그입니다.
3. <command>: 수행할 명령을 지정합니다. 주요 명령에는 config, query, signal, rule 등이 있습니다.

- config: Yabai의 설정을 변경합니다.
- query: 현재 상태나 정보를 조회합니다.
- signal: 특정 이벤트에 반응하는 동작을 정의합니다.
- rule: 창의 동작 규칙을 정의합니다.

4. [options]: 명령의 동작을 세부적으로 조정하는 옵션입니다.

- --space <space_id>: 특정 공간(Workspace)에 대한 설정을 지정합니다.
- --window <window_id>: 특정 창에 대한 설정을 지정합니다.

5. [arguments]: 명령에 필요한 추가 정보나 값을 지정합니다.

- 아래는 yabai 설정할 수 있는 것들

```
#!/usr/bin/env sh

# yabai 설정 파일

# 디버그 출력 활성화
yabai -m config debug_output on

# 창 배치 레이아웃을 타일형(bsp)으로 설정 (기본값: float)
yabai -m config layout bsp
```

- bsp는 아래의 화면과 같이 항상 화면의 모든 부분을 사용하는 레이아웃이다
  ![Image](https://i.imgur.com/fulAbEb.png)

```
# 공간 2번의 레이아웃을 float로 설정
abai -m config --space 2 layout float
```

- float은 우리가 일반적으로 사용하는 레이아웃

```
# 새 창이 수직 분할 시 왼쪽, 수평 분할 시 위쪽에 생성되도록 설정
yabai -m config window_placement first_child
```

- first_child로 했을 때는 하나의 창이 떠있고 새로운 창을 띄웠을 때 왼쪽 위에 뜨게 된다
- second_child는 오른쪽 아래에 뜨게 된다

```
# 자동 균형 맞춤 기능 비활성화 (기본값: off)
# 이 설정은 새 창이 생성되거나 창이 제거될 때 창들이 동일한 공간을 차지하도록 자동으로 비율을 조정하는 기능을 비활성화합니다.
yabai -m config auto_balance off

# 창 분할 비율을 0.5로 설정 (기본값: 0.5)
# 이 설정은 새 창이 생성될 때 기존 창과 새로운 창이 동일한 공간을 차지하도록 설정합니다. 0.5는 두 창이 각각 전체 공간의 50%를 차지함을 의미합니다.
yabai -m config split_ratio 0.5

# 마우스 인터랙션 수정 키를 fn으로 설정 (기본값: fn)
# 이 설정은 마우스를 사용하여 창을 이동하거나 크기를 조정할 때 사용할 수정 키를 fn 키로 설정합니다.
yabai -m config mouse_modifier fn

# 수정 키 + 좌클릭 드래그로 창 이동 설정 (기본값: move)
# 이 설정은 fn 키를 누른 상태에서 좌클릭하여 창을 드래그하면 창이 이동되도록 합니다.
yabai -m config mouse_action1 move

# 수정 키 + 우클릭 드래그로 창 크기 조정 설정 (기본값: resize)
# 이 설정은 fn 키를 누른 상태에서 우클릭하여 창을 드래그하면 창의 크기가 조정되도록 합니다.
yabai -m config mouse_action2 resize

# 마우스 포커스 자동 전환 모드를 autoraise로 설정 (기본값: off)
# 이 설정은 마우스 커서가 창 위로 이동할 때 해당 창을 자동으로 포커스하고 최상위로 올립니다.
yabai -m config focus_follows_mouse autoraise

# 포커스된 창으로 마우스 커서 이동 설정 (기본값: off)
# 이 설정은 yabai가 다른 창을 포커스할 때 마우스 커서가 자동으로 해당 창의 중앙으로 이동하도록 합니다.
yabai -m config mouse_follows_focus on

# 창 그림자 설정 (기본값: on)
# 예: 떠 있는 창에만 그림자 표시
# 이 설정은 창 그림자를 설정합니다. 예를 들어, float로 설정하면 떠 있는 창에만 그림자가 표시됩니다.
yabai -m config window_shadow float

# 창 불투명도 설정 (기본값: off)
# 예: 포커스되지 않은 창을 90% 불투명도로 설정
# 이 설정은 창의 불투명도를 설정합니다. 예를 들어, 포커스되지 않은 창을 90% 불투명도로 설정합니다.
yabai -m config window_opacity on
yabai -m config active_window_opacity 1.0
yabai -m config normal_window_opacity 0.9

# 외부 상태 바 패딩 설정
# 주 디스플레이의 모든 공간에 상단 패딩 20 추가, 하단 패딩 없음
# 이 설정은 주 디스플레이의 모든 공간에 상단 패딩을 20pt 추가하고, 하단에는 패딩을 추가하지 않습니다.
yabai -m config external_bar main:20:0

# 모든 디스플레이의 모든 공간에 상단과 하단 패딩 20 추가
# 이 설정은 모든 디스플레이의 모든 공간에 상단과 하단 패딩을 각각 20pt 추가합니다.
yabai -m config external_bar all:20:20

# macOS 메뉴 바 자동 숨기기 설정
# macOS Big Sur:
# 시스템 환경설정 -> 일반 -> 메뉴 바 자동으로 숨기고 보이기
# macOS Monterey:
# 시스템 환경설정 → Dock 및 메뉴 바 → 왼쪽 사이드바에서 Dock 및 메뉴 바 선택
# macOS Ventura:
# 시스템 설정 → 데스크탑 및 Dock → 메뉴 바 항목까지 스크롤
# macOS Sonoma:
# 시스템 설정 → 제어 센터 → "메뉴 바 자동으로 숨기고 보이기"까지 스크롤

# menubar_opacity 설정으로 메뉴 바 완전히 비활성화 (yabai v6.0.12+)
# 이 설정은 yabai를 통해 macOS 메뉴 바를 완전히 비활성화합니다.
yabai -m config menubar_opacity 0.0
```

- 이건 내 설정

```
#!/usr/bin/env sh

# the scripting-addition must be loaded manually if
# you are running yabai on macOS Big Sur. Uncomment
# the following line to have the injection performed
# when the config is executed during startup.
#
# for this to work you must configure sudo such that
# it will be able to run the command without password
#
# see this wiki page for information:
#  - https://github.com/koekeishiya/yabai/wiki/Installing-yabai-(latest-release)
sudo yabai --load-sa
yabai -m signal --add event=dock_did_restart action="sudo yabai --load-sa"
# move window and focus desktop

# global settings
yabai -m config mouse_follows_focus          on
yabai -m config focus_follows_mouse          off
yabai -m config window_placement             second_child

yabai -m config window_topmost               off
yabai -m config window_shadow                on
yabai -m config window_opacity               off
yabai -m config window_opacity_duration      0.0
yabai -m config active_window_opacity        1.0
yabai -m config normal_window_opacity        0.90
yabai -m config window_border                off
yabai -m config window_border_width          6
# yabai -m config active_window_border_color   0xff775759
# yabai -m config normal_window_border_color   0xff555555
yabai -m config insert_feedback_color        0xffd75f5f
yabai -m config split_ratio                  0.50
yabai -m config auto_balance                 off
yabai -m config mouse_modifier               fn
yabai -m config mouse_action1                move
yabai -m config mouse_action2                resize
yabai -m config mouse_drop_action            swap

# general space settings
yabai -m config layout                       bsp
# yabai -m config top_padding                  20
# yabai -m config bottom_padding               20
# yabai -m config left_padding                 20
# yabai -m config right_padding                20
# yabai -m config window_gap                   20
yabai -m rule --add app="^Calculator$" manage=off
yabai -m rule --add app="^Karabiner-Elements$" manage=off
yabai -m rule --add app="시스템 설정" manage=off
yabai -m rule --add app="카카오톡" manage=off
yabai -m rule --add app="Finder" manage=off
yabai -m rule --add app="Raycast" manage=off
yabai -m rule --add app="미리 알림" manage=off
echo "yabai configuration loaded.."
```

- 시스템 언어가 한국어로 설정되어있으면 앱의 이름을 예를 들어 "System settings"라고 했을 때 적용되지 않는다.
- 이를 위해 앱의 한글 이름을 알기 위해서 아래의 터미널 커맨드를 사용하면 된다.
- 그러면 현재 띄워져 있는 앱의 이름을 알 수 있다.

```
yabai -m query --windows --space | grep "title\|app"

# 출력 결과
	"app":"Warp",
	"title":"yabai",
	"app":"Arc",
	"title":"Yabai Configuration Guide",
	"app":"Code",
	"title":"yabai-tutorial.md — markdownFolder",
	"app":"Finder",
	"title":"yabai",
	"app":"텍스트 편집기",
	"title":"skhdrc",
	"app":"ChatGPT",
	"title":"ChatGPT",
	"app":"MenubarX",
	"title":"",
```

## 이제 skhd

### skhd 설치

```zsh
brew install koekeishiya/formulae/skhd
skhd --start-service
```

### skhd 시작 커맨드

```zsh
skhd --start-service
```

### skhd 중지 커맨드

```zsh
skhd --stop-service
```

### skhd 설정 파일 만들기(skhdrc)

```zsh
cd $HOME/.config/ && mkdir -p skhd && touch skhd/skhdrc
```

### skhd 폴더 열기

```
open ~/.config/skhd
```

- skhdrc를 코드 편집기(터미널에서는 nano, vim, IDE는 vscode 같은 거)로 수정을 합니다.

#### skdha 명령어 구조

- modifier key 간에는 +로 연결
- 뒤에 이어지는 key는 -로 연결
- 그 다음 : 으로 구분해주고
- 내가 원하는 yabai 설정을 이어서 작성한다

```zsh
[modifier1] + [modifier2] - [key]: yabai -m <command> [options] [arguments]
```

- 아래는 나의 skdh 설정

```
# 윈도우 포커스를 왼쪽으로 이동
cmd + ctrl + alt + shift - a: yabai -m window --focus west

# 윈도우 포커스를 오른쪽으로 이동
cmd + ctrl + alt + shift - d: yabai -m window --focus east

# 윈도우 포커스를 위로 이동
cmd + ctrl + alt + shift - w: yabai -m window --focus north

# 윈도우 포커스를 아래로 이동
cmd + ctrl + alt + shift - s: yabai -m window --focus south

ctrl + alt - f: yabai -m window --toggle zoom-fullscreen
ctrl + alt - b: yabai -m space --balance

cmd + ctrl + alt + shift - r: yabai -m space --rotate 270
cmd + ctrl + alt + shift - left: yabai -m window --swap west
cmd + ctrl + alt + shift - right: yabai -m window --swap east
cmd + ctrl + alt + shift - up: yabai -m window∂ --swap north
cmd + ctrl + alt + shift - down: yabai -m window --swap south
cmd + ctrl + alt + shift - t: yabai -m window --toggle float --grid 4:4:1:1:2:2
cmd + ctrl + alt + shift - y: yabai -m space --mirror y-axis
cmd + ctrl + alt + shif만 - x: yabai -m space --mirror x-axis

ctrl + alt - s: yabai -m window --resize bottom:0:40
ctrl + alt - a: yabai -m window --resize right:-40:0
ctrl + alt - w: yabai -m window --resize top:0:-40
ctrl + alt - d: yabai -m window --resize right:40:0

ctrl + alt - down: yabai -m window --warp south
ctrl + alt - up: yabai -m window --warp north
ctrl + alt - left: yabai -m window --warp west
ctrl + alt - right: yabai -m window --warp east
```

- 보면 알겠지만 "cmd + ctrl + alt + shift"는 [hypekey](https://hyperkey.app/)와 같이 사용할 수 있다.

<span style="color:lightblue; font-size:20px">참고: 도움되는 Extension</span>

1. raycast store
   ![Image](https://i.imgur.com/RctWnZ8.png)
1. yabai 설치
   ![Image](https://i.imgur.com/2DLpQq9.png)
1. yabai 관련된 기능을 사용할 수 있다
   ![Image](https://i.imgur.com/vS2pPU5.png)
