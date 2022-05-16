---
layout: single
title:  Python pyautogui 이미지로 마우스 이동 (여러 모니터에서 사용) / ImageGrab / partial
categories: 02_python
tag: [python, pyautogui, macro]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

 <br>
 여러 모니터에서 작업하는 경우가 많은데 pyautogui에서 main monitor가 아니면 인식을 못하는 경우가 있다. 개짜증이다 증말. <br>
  opencv를 사용하여 인식할 수도 있지만 PIL(module: ImageGrab)과 Functools(module: Partial) library를 이용해 훨씬 짧고 간결한 code로 인식이 가능하다. <br>
 PIL은 python imaging library로 Fredrik 어쩌고가 만들었는데 자세히 알 필요는 역시 없겠다. <br>
 Functools는 고차 함수로 작업하기 쉽게하는 유용한 기능을 제공한다. 이 역시 누가 만들었는진 알 필요 없겠다. 바쁘기 때문이다.<br>
 사용하기 전에 만들어줘서 감사합니다. 한 번 외치고 해본다. <br>
 이번에 사용할 module들은 ### ImageGrab/Partial ### 이라는 module이다.
<br>
1. ImageGrab.grab으로 all_screens=True로 모든 screen을 이미지로 저장한다. <br>
2. functools.partial 는 하나 이상의 인수가 이미 채워진 함수의 새 버전을 만들 때 사용한다. 죄송하다. 더 자세히 사용을 안해봤다. 더 깊은 설명은 할 수가 없다. 
 <br>


```python
import pyautogui as pg
from PIL import ImageGrab
from functools import partial

ImageGrab.grab = partial(ImageGrab.grab, all_screen = True)

file = "your directory"
i = pg.locateOnScreen(file)
pg.moveTo(i)
```