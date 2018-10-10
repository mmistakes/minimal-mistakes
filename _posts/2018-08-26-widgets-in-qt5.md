---
title: Qt5 Widget
key: 20180826
tags: qt c++ widget
---

Widget 을 생성하고 이를 MainWindow 와 연결한다 ....

<!--more-->

**참조 링크**
- [How to use QPushButton](https://wiki.qt.io/How_to_Use_QPushButton)
- [Creator Writing Program](http://doc.qt.io/qtcreator/creator-writing-program.html)

# Creating Widget Application

Creator Writing Program 를 참조하여 정리한다. Widget 기반의 어플리케이션을 만드는 것은 다음의 절차에 따라서 이루어진다.

1. 프로젝트 생성
2. 유저 인터페이스 디자인
3. slot 생성 및 구현



## Tip in Qt Creator

> Press Ctrl+A (or Cmd+A) to select the widgets and click Lay out Horizontally (or press Ctrl+H on Linux or Windows or Ctrl+Shift+H on macOS) to apply a horizontal layout (QHBoxLayout).
> > 위젯을 배열한 뒤에 레이아웃을 적용할 수 있다. Ctrl+A 단축키를 눌러서 모든 위젯을 선택하고 Lay out Horizontally 를 클릭하거나 Ctrl+H 단축키를 통해서 Horizontal layout 을 적용할 수 있다.


> To call a find function when users press the Find button, you use the Qt signals and slots mechanism. A signal is emitted when a particular event occurs and a slot is a function that is called in response to a particular signal. Qt widgets have predefined signals and slots that you can use directly from Qt Designer. To add a slot for the find function:
Right-click the Find button to open a context-menu.
Select Go to Slot > clicked(), and then select OK.
A private slot, on_findButton_clicked(), is added to the header file, textfinder.h and a private function, TextFinder::on_findButton_clicked(), is added to the source file, textfinder.cpp.
>> Qt Creator 상에서 슬롯(Slot)과 시그널(Signal)을 정의하려면 위의 글을 참조하라.


## Maybe .. Insights

Qt Creator 인터페이스를 통해서 clicked 슬롯(slot)을 생성하는 것은 단순히 헤더 파일에 on_WidgetName_ clicked() 를 하드코딩하는 것과 같은 것이라는 느낌이 든다.

## 리소스 참조하기

QFile 을 통해 리소스를 참조할 때가 있을 것이다. 이때, 아래와 같이 코딩한다.

```
QFile inputFile(":/input.txt");
```

Resource View: ![Alt][1]



[1]: ../_images/2018-08-26-widgets-in-qt5/qtcreator-add-resource.png "add resource"

---

If you like posts, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=kitian616&repo=jekyll-TeXt-theme&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
