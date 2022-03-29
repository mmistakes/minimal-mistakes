---
layout: single
title: "1-2 수업 첫날 포스팅."
categories: daily
tag: [diary, python]
toc: true
---

# 기본프레임 제작


```python
from tkinter import *

root = Tk()
root.mainloop()
```

![%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202022-03-22%20165416.png](attachment:%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202022-03-22%20165416.png)

## 창 설정하기(옵션)


```python
from tkinter import *

root = Tk()
root.title("Nado GUI") # 창 이름
root.geometry("640x480+600+300") # 크기 설정, x,y좌표

root.resizable(False, False) # x너비, y너비 값 변겅 불가

root.mainloop()
```

# 버튼제작하기


```python
from tkinter import *

root = Tk()
root.title("Nado GUI")
root.geometry("640x480+600+300")

####################################


btn1 = Button(root, text="버튼1") # 버튼(창이름, 속성)
btn1.pack() # 포함하기

btn2 = Button(root, padx=5, pady=10, text="버튼2")
btn2.pack()

btn3 = Button(root, padx=10, pady=5, text="버튼3")
btn3.pack()

btn4 = Button(root, width=10, height=3, text="버튼4")
btn4.pack()


####################################

root.mainloop()
```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```


```python

```
