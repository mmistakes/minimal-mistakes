---
layout: single
title: "Python tkinter"
categories: note
tags: [python, tkinter]
author_profile: false
search: true
---

### Introduction

tkinter is a Python library that can be used to construct basic graphical user interface (GUI) applications.

### Code

#### import

```python
from tkinter import *
```

#### initialization

e.g.

```python
class MyGUI:
def __init__(self): # constructor(self = this)
self.myWindow = Tk()
self.myWindow.geometry("300x300+100+100") # width x height + left + top

        self.myWindow.title("title") # title

        self.frame1 = Frame(self.myWindow, width = 280, height = 140, bg="yellow")
        self.frame1.place(x=10, y=10)

        self.frame2 = Frame(self.myWindow, width = 280, height = 140, bg="green")
        self.frame2.place(x=10, y=150)

        # positioned based on frame2 / fg = fontColor / bg = backgroundColor
        self.label = Label(self.frame2, text="Hello World", fg="yellow", bg="green")
        self.label.place(x=10, y=10)

        mainloop()

myGui = MyGUI() # calling constructor(default)
```

[more info](https://docs.python.org/3/library/tkinter.html)
