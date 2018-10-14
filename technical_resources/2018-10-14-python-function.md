---

id: 5
title: "Python函数"
date: 2018-10-14T23:17:07+00:00
author: Yan Xu
layout: single
permalink: /python-function/
categories:
  - Python
---

#### (五). 函数
函数是组织好的，可重复使用的，用来实现单一，或相关联功能的代码段。

函数能提高应用的模块性，和代码的重复利用率。你已经知道Python提供了许多内建函数，比如print()。但你也可以自己创建函数，这被叫做用户自定义函数。

##### 1. 定义函数
你可以定义一个由自己想要功能的函数，以下是简单的规则：
* 函数代码块以 def 关键词开头，后接函数标识符名称和圆括号()

* 任何传入参数和自变量必须放在圆括号中间。圆括号之间可以用于定义参数

* 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明

* 函数内容以冒号起始，并且缩进

* return [表达式] 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None

实例：

```
def functionname( parameters ):
  <code>"函数_文档字符串"
  function_suite<br>
  return [expression]
```

```
def printme( str ):
   "打印传入的字符串到标准显示设备上"
   print str
   return
```

##### 2. 函数调用
定义一个函数只给了函数一个名称，指定了函数里包含的参数，和代码块结构。
这个函数的基本结构完成以后，你可以通过另一个函数调用执行，也可以直接从Python提示符执行

如下实例调用了printme（）函数：

```
# 定义函数
def printme( str ):
   "打印任何传入的字符串"
   print str;
   return;
# 调用函数
printme("我要调用用户自定义函数!");
printme("再次调用同一函数")
```
