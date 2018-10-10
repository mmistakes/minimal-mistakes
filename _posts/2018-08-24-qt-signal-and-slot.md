---
title: Qt signal & slot
key: 20180824
tags: qt c++ signal slot
---

Qt에서 시그널을 생성하고 이를 slot 과 연결하는 과정을 담음 ...

<!--more-->

**참조 링크**
- [The oberver patern](https://wiki.qt.io/Qt_for_Beginners#The_observer_pattern)

# 옵저버 패턴

모든 UI 툴킷은 사용자 행위를 감지하고 응답하는 메커니즘을 갖고있다. 툴킷들 중에 어느 것은
callback 을 사용하고 어느 것은 listener를 사용한다. 그러나 기본적으로 옵저버 패턴에서
파생되었다.

옵저버 패턴은 observable 객체가 observer 객체에게 상태 변화를 알릴 때 사용된다.
구체적인 사례는 아래와 같다.

- 사용자는 버튼을 클리갛고 메뉴가 표시되어야 한다.
- 웹 페이지는 로딩을 끝내고 프로세스는 로드된 페이지로부터 정보를 추출해야 한다.
- 사용자는 아이템의 목록을 스크롤하며 스크롤의 끝에 도달하였을 때 다른 항목들이 로드 되어야 한다.

옵서버 패턴은 GUI 어플리케이션의 어디에서나 사용된다. 그리고 boilerplate 코드가 필요하다.
Qt 는 이러한 boilerplate 코드를 제거하고 깔끔한 문법을 제공한다. signal/slot 메커니즘이 그 답이다.

# Signals and slots

- signal : a message that an object can send, most of the time to inform of a status change.
- slot : a function that is used to accept and respond to a signal.

QPushButton 클래스의 signal 예를 들어보자. 아래의 시그널들은 사용자 클릭에 의해서 발생된다.
- clicked
- pressed
- released

타 클래스의 slot 의 예가 있다.
- QApplication::quit
- QWidget::setEnabled
- QPushButton::setText

signal 에 응답하기 위해서 slot 은 반드시 signal 에 연결되어야 한다. Qt 는 QObject::connect 메서드를 제공한다. 이 메서드를 통해 연결한다. 그리도 동시에 SIGNAL, SLOT 매크로를 함께 사용한다.

```
FooObjectA *fooA = new FooObjectA();
FooObjectB *fooB = new FooObjectB();

QObject::connect(fooA, SIGNAL(bared()), fooB, SLOT(baz()));
```

위의 코드는 FooObjectA 가 bared 시그널(signal)을 정의하고 FooObjectB 가 baz 슬롯(slot)을 정의함을 가정한다.

**Remark** : 기본적으로 시그널(signal)과 슬롯(slot)은 메서드들이다. 이 메서드들은 인자를 가질 수도 그렇지 않을 수도 있다. 하지만 절대(never) 어떠한 것도 반환(return) 하지 않는다. 메서드로서 시그널(signal)의 개념은 일반적이지 않은 반면에, 슬롯(slot)은 실제 메서드이다. 그리고 다른 메서드들에서도 호출될 수 있다.

# 정보 전송

시그널(signal) 과 슬롯(slot)은 버튼 클릭에 응답하는데 유용하다. 그러나 훨씬 더 많은 것을 할 수 있다. 예를 들어, 정보를 교환하는데 사용될 수 있다. 노래를 재생하는 중에 progress bar는 노래 종료까지 얼마 만큼 시간이 남았는지 보여줄 필요가 있다. 미디어 플레이어는 미디어의 진행을 체크하기 위한 클래스가 있어야할지도 모른다. 이 클래스의 인스턴스는 주기적으로 tick 시그널(signal) 을 전송할 것이고 이때 progress value 를 함계 전달한다. 이 시그널은 QProgressBar 에 연결될 수 있으며 이는 진행상태를 보여주는데 사용할 수 있다.

아래는 가상의 클래스로 진행률을 체크하는데 사용되며 아래의 시그니처와 같은 signal(시그널)을 보유한다.

```
void MediaProgressManager::tick(int milliseconds);
```

그리고 문서에서 알 수 있듯이 QProgressBar 는 아래의 slot 을 가진다.

```
void QProgressBar::setValue(int value);
```

위의 가상 함수 및 실제 Widget 의 slot 에서 확인할 수 있듯이 동일한 종류의 파라미터를 가졍한다. 특히 타입이 중요하다. *만약 시그널(signal)을 슬롯(slot)과 연결하되 이들의 시그니처가 다르다면 런타임 동작 중에 연결이 완료되고 아래와 같은 경고를 보게 될 것이다.*

```
QObject::connect: Incompatible sender/receiver arguments
```

이는 시그널(signal)이 파라미터를 이용해 슬롯(slot)에 정보를 전달하기 때문이다. *시그널(signal)의 첫 번째 파라미터는 슬롯(slot)의 첫번째 파라미터에 전달되고 두 번째, 세 번째 등등도 각각 그러하다.*

시그널(signal) 과 슬롯(slot) 을 연결하는 코드는 아래와 같다.
```
MediaProgressManager *manager = new MediaProgressManager();
QProgressBar *progress = new QProgressBar(window);

QObject::connect(manager, SIGNAL(tick(int)), progress, SLOT(setValue(int)));
```

위 코드에서 *SIGNAL 과 SLOT 매크로에 시그니처(signature)를 반드시 제공* 해야하는 것을 확인할 수 있다. 물론 변수의 이름까지 제공해줄 수 있다.

# Features of signals and slots

- 단일 시그널(signal)은 여러 슬롯(slot)에 연결 될 수 있다.
- 역 또한 성립한다.
- 시그널(signal)은 또다른 시그널(signal)에 연결할 수 있다. 이를 시그널(signal) 릴레이(relaying)라고 한다. 첫 번째 시그널이 전송되고 곧이어 두번재 시그널이 연이어 전송되는 식이다.

# 예제(Example)

## 이벤트 응답
:: Responding to an event

버튼을 눌렀을 때 어플리케이션을 닫는 예제

QPushButton 과 QApplication 의 시그널(signal) 과 슬롯(slot) 을 연결하라

```
QPushButton's clicked signal ----> QApplication's quit slot
```

QApplication 에 접근하는 방법
QApplication 의 static function 에 접근한다. QApplication * QApplication::instance()
{:.info}

*window.cpp* 예제
```
#include "window.h"
#include <QApplication>
#include <QPushButton>

Window::Window(QWidget *parent) :
 QWidget(parent)
 {
  // Set size of the window
  setFixedSize(100, 50);

  // Create and position the button
  m_button = new QPushButton("Hello World", this);
  m_button->setGeometry(10, 10, 80, 30);

  // NEW : Do the connection
  connect(m_button, SIGNAL (clicked()), QApplication::instance(), SLOT (quit()));
 }
```

## 정보 전달 예제
:: Transmitting information with signals and slots

QSlider 와 QProgressBar 를 연결한다. 단, QSlider 의 변화에 따라 QProgressBar 를 동기하여 동시에 상태가 변하도록 한다.

```
void QSlider::valueChanged(int value);
void QProgressBar::setValue(int value);

QSlider's valueChanged signal ----> QProgressBar's setValue slot
```

*Sample* 예제
```
#include <QApplication>
#include <QProgressBar>
#include <QSlider>

int main(int argc, char **argv)
{
 QApplication app (argc, argv);

 // Create a container window
 QWidget window;
 window.setFixedSize(200, 80);

 // Create a progress bar
 // with the range between 0 and 100, and a starting value of 0
 QProgressBar *progressBar = new QProgressBar(&window);
 progressBar->setRange(0, 100);
 progressBar->setValue(0);
 progressBar->setGeometry(10, 10, 180, 30);

 // Create a horizontal slider
 // with the range between 0 and 100, and a starting value of 0
 QSlider *slider = new QSlider(&window);
 slider->setOrientation(Qt::Horizontal);
 slider->setRange(0, 100);
 slider->setValue(0);
 slider->setGeometry(10, 40, 180, 30);

 window.show();

 // Connection
 // This connection set the value of the progress bar
 // while the slider's value changes
 QObject::connect(slider, SIGNAL (valueChanged(int)), progressBar, SLOT (setValue(int)));

 return app.exec();
}
```

# The Meta object

Qt는 메타 오브젝트 시스템(*meta-object system*, 이하 메타오브젝트)을 제공하는데, 메타오브젝트()란 일반적으로 순수 C++에서는 불가능한 프로그래밍 패러다임을 달성하는 방법을 의미한다.

- **Introspection** : capability of examining a type at run-time.
- **Asynchronous function calls**

meta-object 능력을 사용하기 위해 QObject 를 서브클래싱해야 한다. meta-object compiler(moc)는 이를 해석하고 번역한다. moc에의해서 생성된 코드는 시그널(signal)와 슬롯(slot) 시그니처, 메서드 마크(QObject)를 서브클래싱한 클래스로부터 메타 정보(meta-information)을 추출하는데 사용된다. 이러한 모든 정보는 아래의 메서드를 사용해서 접근 가능하다.


```
const QMetaObject * QObject::metaObject () const
```

QMetaObject 클래스는 meta-object 를 처리하는 모든 메서드들을 포함한다.
{:.info}

## Important macros

가이드는 Q_OBJECT 가 가장 중요한 매크로라고 말한다. Signal-Slot 연결과 문법은 일반적인 C++ 컴파일러로 해석되지 않는다. moc 은 QT 문법을 정규 C++ 문법으로 번역한다. 이는 Q_OBJECT 매크로를 헤더에 지정함으로써 이러한 문법을 지원하게된다.

*mywidget.h*
```
class MyWidget : public QWidget
{
 Q_OBJECT
 public:
  MyWidget(QWidget *parent = 0);
}
```

marker macros for moc
- signals
- public/protected/private slots

mark the different methods that need to be extended.

SIGNAL and SLOT 는 두개의 가장 중요하고 유용한 매크로가 있다. 신호가 발현되었을 때, 메타오브젝트 시스템은 시그널(signal)의 시그니처를 비교하는데 사용된다. 연결을 체크하고 시그니처를 사용하는 슬랏(slot)을 찾는다. 이러한 메서드는 제공된 메서드 시그니처를 메타오브젝트에 저장된 것과 비교하는 문자열로 변환한다.

## 사용자 정의 시그널과 슬롯 생성

사용자 정의 시그널과 슬롯을 생성하는 것을 다룬다. 이는 단순하다. 슬롯은 일반 메서드와 같다. 그러나 사소한 데코레이션



---

If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
