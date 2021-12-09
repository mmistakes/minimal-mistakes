---
published: true
layout: single
title: "[QT] QQuickPaintedItem 정리"
category: designpattern
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### QQuickPaintedItem Class
* * *
- 순수 virtual paint 구현 필요 (paint 내부에서 드로잉 동작)
- main.cpp에 qmlRegisterType 사용해서 등록 후, import해서 사용 가능
- [**Reference Page**](https://doc.qt.io/qt-5/qquickpainteditem.html)  

#### QQuickPaintedItem::setAntialiasing
* * *
- 안티앨리어싱 옵션

#### QQuickPaintedItem::setMipmap
* * *
- mipmap 옵션

#### QQuickPaintedItem::setOpaquePainting
* * *
- 투명 옵션 (true면 투명)

#### QQuickPaintedItem::update
* * *
- 다음 프레임이 렌더링 될 때, QML Scene Graph에 의해 처리되는 paint() 요청을 예약합니다.

#### QQuickPaintedItem::PerformanceHint
* * *
- 렌더링 성능 향상 기능을 활성화 시킬 수 있는 Flag 값
(QQuickPaintedItem::FastFBOResizing 옵션 활성화)
- 더 많은 메모리를 소모하는 대신 성능 향상

#### QQuickPaintedItem::RenderTarget
* * *
- 렌더링할 대상을 설명하는 enum
- QQuickPaintedItem::Image : Default 값, 고품질 렌더링 가능 
- QQuickPaintedItem::FramebufferObject : 빠르고 성능 떨어짐, 항목 크기가 자주 변경 되는 경우 고려 가능
- QQuickPaintedItem::InvertedYFramebufferObject : FramebufferObject 와 동일한데, X축을 기준으로 데칼코마니해서 성능 향상 시키는 것 같음(확실치 않음)

#### fillColor : QColor
* * *
- QQuickPaintedItem Property
- fillColor() / setFillColor(const QColor &)
- Notifier signal : fillColorChanged()
- Item 배경색을 칠함.

  ```
  void DrivedClass::paint(QPainter *painter)
  {
    setFillColor("black");
  }
  ```

#### renderTarget : RenderTarget
* * *
- QQuickPaintedItem Property
- renderTarget() / setRenderTarget(QQuickPaintedItem::RenderTarget target)
- Notifier signal : renderTargetChanged()

  ```
  void DrivedClass::paint(QPainter *painter)
  {
    setRenderTarget(RenderTarget::Image);
  }
  ```

#### textureSize : QSize
* * *
- QQuickPaintedItem Property
- textureSize() / setTextureSize(const QSize &size)
- Notifier signal : textureSizeChanged()
- 텍스처의 크기 지정, paint에 사용된 좌표계에 영향x

#### QQuickPaintedItem::releaseResources
* * *
- virtual protected
- QQuickItem::releaseResources()을 재정의 가능
- Item이, QQuickItem::updatePaintNode()로부터 반환되어 관리되고 있지 않은 그래픽 리소스들을 release할 때 호출
- 이 함수는 직접 호출되어서는 안되고 QQuickWindow::scheduleRenderJob()에 의해 관리되어야 함.

#### QQuickPaintedItem::itemChange
* * *
- virtual protected
- QQuickItem::itemChange을 재정의 가능
- parameter : (QQuickItem::ItemChange change, const QQuickItem::ItemChangeData &value)
- change는 아래의 enum 값, value는 아래 union?을 사용 가능한 것으로 보임
- [**Enum QQuickItem::ItemChange**](https://doc.qt.io/qt-5/qquickitem.html#ItemChange-enum)
- [**Union ItemChangeData**](https://doc.qt.io/qt-5/qquickitem-itemchangedata.html)
- 단, 오버라이딩 했을 때는 아래와 같이 호출 필수

  ```
  ...
  QQuickItem::itemChange(change, value);
  ...
  ```

* * *
#### QPainter Class
* * *
- [**Reference Page**](https://doc.qt.io/qt-5/qpainter.html#boundingRect)

#### QPainter::drawPie ([**Reference Page**](https://doc.qt.io/qt-5/qpainter.html#drawPie))
* * *
- 사각형 안에 pie를 그립니다.
- startAngle 및 spanAngle은 1/16도 단위로 지정해야 합니다. 즉, 전체 원은 5760(16 * 360)과 같습니다. 각도의 양수 값은 시계 반대 방향을 의미하고 음수 값은 시계 방향을 의미합니다. 0도는 3시 방향입니다.
- current brush 사용해서 색을 채웁니다.

  ```
  void DrivedClass::paint(QPainter *painter)
  {
      // https://doc.qt.io/qt-5/qtqml-tutorials-extending-qml-example.html
      QPen pen = painter->pen();
      painter->setPen(pen);
      painter->setRenderHints(QPainter::Antialiasing, true);
      painter->setBrush(Qt::SolidPattern);
      painter->drawPie(boundingRect().adjusted(1, 1, -1, -1), 90 * 16, 290 * 16);
  }
  ```

#### QPainter::drawEllipse ([**Reference Page**](https://doc.qt.io/qt-5/qpainter.html#drawEllipse))
* * *
- 사각형안에 타원을 그립니다.

  ```
  void DrivedClass::paint(QPainter *painter)
  {
      QRectF rectangle(10.0, 20.0, 80.0, 60.0);
      painter->drawEllipse(rectangle);
  }
  ```

#### Reference 
* * * 
- ***<https://doc.qt.io/qt-5/qquickpainteditem.html>***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body> 