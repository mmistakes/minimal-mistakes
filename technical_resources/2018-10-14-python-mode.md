---

id: 7
title: "Python面向对象"
date: 2018-10-14T23:17:07+00:00
author: Yan Xu
layout: single
permalink: /python-mode/
categories:
  - Python
---

#### (七). Python面向对象

Python从设计之初就已经是一门面向对象的语言，正因为如此，在Python中创建一个类和对象是很容易的。本章节我们将详细介绍Python的面向对象编程。

如果你以前没有接触过面向对象的编程语言，那你可能需要先了解一些面向对象语言的一些基本特征，在头脑里头形成一个基本的面向对象的概念，这样有助于你更容易的学习Python的面向对象编程。

接下来我们先来简单的了解下面向对象的一些基本特征。

##### 1. 简介

* 类(Class): 用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。

* 类变量：类变量在整个实例化的对象中是公用的。类变量定义在类中且在函数体之外。类变量通常不作为实例变量使用。

* 数据成员：类变量或者实例变量, 用于处理类及其实例对象的相关的数据。

* 方法重写：如果从父类继承的方法不能满足子类的需求，可以对其进行改写，这个过程叫方法的覆盖（override），也称为方法的重写。

* 实例变量：定义在方法中的变量，只作用于当前实例的类。

* 继承：即一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。例如，有这样一个设计：一个Dog类型的对象派生自Animal类，这是模拟"是一个（is-a）"关系（例图，Dog是一个Animal）。

* 实例化：创建一个类的实例，类的具体对象。

* 方法：类中定义的函数。

* 对象：通过类定义的数据结构实例。对象包括两个数据成员（类变量和实例变量）和方法。

##### 2. 创建类

使用 class 语句来创建一个新类，class 之后为类的名称并以冒号结尾:

```
class ClassName:
   '类的帮助信息'   #类文档字符串
   class_suite  #类体
```

实例：

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
class Employee:
   '所有员工的基类'
   empCount = 0

   def __init__(self, name, salary):
      self.name = name
      self.salary = salary
      Employee.empCount += 1

   def displayCount(self):
     print("Total Employee %d" % Employee.empCount)

   def displayEmployee(self):
      print ("Name : ", self.name,  ", Salary: ", self.salary)
```

* empCount 变量是一个类变量，它的值将在这个类的所有实例之间共享。你可以在内部类或外部类使用 Employee.empCount 访问。

* 第一种方法\__init__()方法是一种特殊的方法，被称为类的构造函数或初始化方法，当创建了这个类的实例时就会调用该方法

* self 代表类的实例，self 在定义类的方法时是必须有的，虽然在调用时不必传入相应的参数。

<em>类的方法与普通的函数只有一个特别的区别——它们必须有一个额外的第一个参数名称, 按照惯例它的名称是 self。</em>

##### 2.创建实例对象

实例化类其他编程语言中一般用关键字 new，但是在 Python 中并没有这个关键字，类的实例化类似函数调用方式。

以下使用类的名称 Employee 来实例化，并通过 \__init__ 方法接收参数。

```
"创建 Employee 类的第一个对象"
emp1 = Employee("Zara", 2000)
"创建 Employee 类的第二个对象"
emp2 = Employee("Manni", 5000)
```

##### 3. 访问属性

您可以使用点号 . 来访问对象的属性。使用如下类的名称访问类变量:

```
emp1.displayEmployee()
emp2.displayEmployee()
print "Total Employee %d" % Employee.empCount
```

完整实例：

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

class Employee:
   '所有员工的基类'
   empCount = 0

   def __init__(self, name, salary):
      self.name = name
      self.salary = salary
      Employee.empCount += 1

   def displayCount(self):
     print "Total Employee %d" % Employee.empCount

   def displayEmployee(self):
      print "Name : ", self.name,  ", Salary: ", self.salary

"创建 Employee 类的第一个对象"
emp1 = Employee("Zara", 2000)
"创建 Employee 类的第二个对象"
emp2 = Employee("Manni", 5000)
emp1.displayEmployee()
emp2.displayEmployee()
print "Total Employee %d" % Employee.empCount
```

##### 4. 类的继承

面向对象的编程带来的主要好处之一是代码的重用，实现这种重用的方法之一是通过继承机制。
通过继承创建的新类称为子类或派生类，被继承的类称为基类、父类或超类。

在python中继承中的一些特点：

1. 如果在子类中需要父类的构造方法就需要显示的调用父类的构造方法，或者不重写父类的构造方法。详细说明可查看：python 子类继承父类构造函数说明。

2. 在调用基类的方法时，需要加上基类的类名前缀，且需要带上 self 参数变量。区别在于类中调用普通函数时并不需要带上 self 参数

3. Python 总是首先查找对应类型的方法，如果它不能在派生类中找到对应的方法，它才开始到基类中逐个查找。（先在本类中查找调用的方法，找不到才去基类中找）。

实例：

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

class Parent:        # 定义父类
   parentAttr = 100
   def __init__(self):
      print "调用父类构造函数"

   def parentMethod(self):
      print '调用父类方法'

   def setAttr(self, attr):
      Parent.parentAttr = attr

   def getAttr(self):
      print "父类属性 :", Parent.parentAttr

class Child(Parent): # 定义子类
   def __init__(self):
      print "调用子类构造方法"

   def childMethod(self):
      print '调用子类方法'

c = Child()          # 实例化子类
c.childMethod()      # 调用子类的方法
c.parentMethod()     # 调用父类方法
c.setAttr(200)       # 再次调用父类的方法 - 设置属性值
c.getAttr()          # 再次调用父类的方法 - 获取属性值
```

结果如下:

```
调用子类构造方法
调用子类方法
调用父类方法
父类属性 : 200
```
