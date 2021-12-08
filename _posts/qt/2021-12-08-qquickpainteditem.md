---
published: true
layout: single
title: "[QT] QQuickPaintedItem 정리 (진행중)"
category: designpattern
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### QQuickPaintedItem Class
- 순수 virtual paint 구현 필요 (paint 내부에서 드로잉 동작)
- [Reference Page](https://doc.qt.io/qt-5/qquickpainteditem.html)  

#### QQuickPaintedItem::setAntialiasing
- 안티앨리어싱 옵션

#### QQuickPaintedItem::setAntialiasing
- mipmap 옵션

#### QQuickPaintedItem:: setOpaquePainting
- 투명 옵션 (true면 투명)

#### QQuickPaintedItem::update
- 다음 프레임이 렌더링 될 때, QML Scene Graph에 의해 처리되는 paint() 요청을 예약합니다.

#### QQuickItem::releaseResources
- virtual protected
- 이 함수는 호출됩니다. Item이 graphics resources를 release 해야만 하는 상황

* * *
#### QPainter Class
- [Reference Page](https://doc.qt.io/qt-5/qpainter.html#boundingRect)

#### QPainter::drawPie ([Reference Page](https://doc.qt.io/qt-5/qpainter.html#drawPie))
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

#### QPainter::drawEllipse ([Reference Page](https://doc.qt.io/qt-5/qpainter.html#drawEllipse))
- 사각형안에 타원을 그립니다.

```
void DrivedClass::paint(QPainter *painter)
{
    QRectF rectangle(10.0, 20.0, 80.0, 60.0);
    painter->drawEllipse(rectangle);
}
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body> 