---
layout: single
title: "MacOS 재설치 - VSCode 환경설정 및 유용한 Extension"
categories: [macos]
tag: [mac, macos, m1, m2, m3, setup, 맥, 재설치, 초기화, vscode, extension]
order: 5
published: true
typora-root-url: ../
---

VSCode로 개발하는 분이 아니라면 별도 설정하지 않아도됩니다.

### 빠른 설정을 위해 JSON로 변경하기

![vscode-setting](/images/2024-01-03-macos-setup5/vscode-setting.png)

위의 아이콘을 클릭하면 JSON 모드로 변경됩니다.

```json
{
  "workbench.settings.editor": "json" // VSCODE의 설정을 JSON으로 엽니다.
}
```

이후 다음의 한줄을 추가해주면 다음부터는 바로 json 형태로 열립니다.

### 기본 Format 설정하기

```json
"editor.formatOnSave": true, // 저장시 자동 포맷 여부
"editor.defaultFormatter": "esbenp.prettier-vscode", // 기본 포맷으로 prttier를 사용합니다.
// jsx에서 tailwindcss의 className의 자동완성이 안될 때 적용하면 됩니다.
"files.associations": {
	"*html": "html",
	"*.css": "tailwindcss"
},
"editor.quickSuggestions": {
  "other": "on",
  "comments": "off",
  "strings": true
}
```

### 유용한 Extension 설치하기

#### ESLint

![ESLint](/images/2024-01-03-macos-setup5/ESLint.png)

- Javscript, Typescript를 설정에 따른 코드의 형태에 대해 경고 또는 오류를 발생 시켜줍니다.
- 저장 또는 설정에 의한 조건시 자동으로 코드를 수정해줍니다.

#### Prettier - Code formatter

![Prettier - Code formatter](/images/2024-01-03-macos-setup5/Prettier - Code formatter.png)

- 설정에 따른 코드의 스타일에 대해 경고 또는 오류를 발생 시켜줍니다.
- 저장 또는 설정에 의한 조건시 자동으로 코드를 수정해줍니다.

#### Batter Comments

![Better Comments](/images/2024-01-03-macos-setup5/Better Comments.png)

- Comment에 조건에 따라 색상을 다르게 보여줘, 다양한 Comment로 활용할 수 있게 합니다.
- `!, ?, *, TODO 등` 으로 표현합니다. ( ex // ! [내용] )

#### Auto Close Tag

![Auto Close Tag](/images/2024-01-03-macos-setup5/Auto Close Tag.png)

- HTML, XML 등에 Tag를 입력시 자동으로 닫는 Tag가 생성됩니다.

#### Auto Rename Tag

![Auto Rename Tag](/images/2024-01-03-macos-setup5/Auto Rename Tag.png)

- HTML, XML 등에 Tag를 수정하면 닫는 Tag의 이름도 수정됩니다.

#### Project Manager

![Project Manager](/images/2024-01-03-macos-setup5/Project Manager.png)

- 프로젝트들을 기록하여, 손쉽고 빠르게 프로젝트를 변경할 수 있습니다.

#### Figma for VS Code

![Figma for VS Code](/images/2024-01-03-macos-setup5/Figma for VS Code.png)

- 요즘 UI/UX 기획자가 Figma를 통하여 기획을 하는 경우가 있습니다. 이때 Figma에서 기획내용을 빠르고, 그리고 실시간으로 확인할 수 있게 하는 Extension 입니다.
