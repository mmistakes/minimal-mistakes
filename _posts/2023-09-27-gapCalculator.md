---
layout: single
title: "GPA Calculator Project Process"
categories: project
tags: [python, tkinter]
author_profile: false
search: true
use_math: true
---

### Introduction

GPA stands for 'Grade Point Average', a number that indicates how high you scored in your courses on average.
For example, assume the highest grade is A+(4.33), and if you have taken 3 courses with A(4.0), B(3.0), A+(4.33), then your current GPA is
$\((4.0 + 3.0 + 4.33) / 3 = 3.76\)$

Python has a library called tkinter to construct basic graphical user interface (GUI) applications.
I will use this library and make GPA calculator.

### Code

#### import

```python
from tkinter import * # GUI
from tkinter import ttk # for combo box
from tkinter.messagebox import * # for message box
```

#### initialization

```python
class MyGUI:
    def __init__(self):
        self.mainWindow = Tk()
        self.windowWidth = 700
        self.windowHeight = 220 # variable to resize window height
        self.mainWindow.geometry(f"700x{self.windowHeight}+720+50")
        self.mainWindow.title("GPA Calculator")
        self.gradeValue = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"]
        self.frame1 = Frame(self.mainWindow, width=520, height=30, bg="#d2302c")
        self.frame1.place(x=20, y=30)
        self.frame2Height = 100 # variable to resize frame2 height
        self.frame2 = Frame(self.mainWindow, width=520, height=self.frame2Height, bg="#f4a896")
        self.frame2.place(x=20, y=60)
        self.frame3 = Frame(self.mainWindow, width=100, height=180)
        self.frame3.place(x=560, y=30)
```
