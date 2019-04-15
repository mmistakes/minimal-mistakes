---
title: OOC - Interface
classes: wide
permalink: /ooc/interface
excerpt: "Instructions how to create an OOC Interface."
last_modified_at: 2019-04-15T01:46:10-05:00
toc: true
toc_icon: "cog"
categories:
    - OOC
tags:
    - c
    - OOC
    - Interface
---

Interface creation
===================

Sometimes we want something more general than a base class, we wan't to be able to specify that we want a specific behaviour, but without defining a base behaviour. Or maybe we wan't an specific behaviour, but not all the other things that comes with the super class, and we wan't to be able to combine these behaviours without creating super complex inheritance trees. For that we have interfaces.

Interfaces are nothing more than a blueprint the class must follow. To understand more about this, we will implement the Printable interface. It consists of two methods, the `Printable_printToFile` and the `Printable_print` (which prints to the stdout).

An interface is composed of two files, its public interface *(.h)* and the implementation *(.c)*.

Public interface
----------------
Let's begin with the one `Printable_printToFile` blueprint. To do that we must create the function descriptor for our desired signature.
```c
// Desired signature
int Printable_printToFile(void* _self, FILE* fp);
```

Our descriptor will be called `M_PRINTABLE_PRINT_TO_FILE`, and it will be:

```c
// Function descriptor for int Printable_printToFile(void* _self, FILE* fp);
#define M_PRINTABLE_PRINT_TO_FILE_DEF int, Printable_printToFile
#define M_PRINTABLE_PRINT_TO_FILE_ARG const void* _self, FILE* fp
#define M_PRINTABLE_PRINT_TO_FILE_PARAM           _self,       fp
```

To declare that our interface exists we just have to call the `INTERFACE_METHOD_DECLARATION(func_desc_)` macro. 

The `Printable_print` function can make use of the ``Printable_printToFile`, just passing the `stdout` as the output file.

```c
static inline int Printable_print(const void* _self){
    return Printable_printToFile(_self, stdout);
}
```

With that our interfaces public interface is complete
```c
// File: printable_interface.h
#ifndef PRINTABLE_INTERFACE_H__
#define PRINTABLE_INTERFACE_H__

#include <ooc.h>
#include <stdio.h>

/*------------------------------------------------*/
/*----- Interface methods declaration ------------*/
/*------------------------------------------------*/

// This method should print an object string representation
// into the file descriptor passed into it.
// It must return the number of bytes written if succesful, if an error
// occurs it should return a negative value
// Function descriptor for int Printable_printToFile(void* _self, FILE* fp);
#define M_PRINTABLE_PRINT_TO_FILE_DEF int, Printable_printToFile
#define M_PRINTABLE_PRINT_TO_FILE_ARG const void* _self, FILE* fp
#define M_PRINTABLE_PRINT_TO_FILE_PARAM           _self,       fp
INTERFACE_METHOD_DECLARATION(M_PRINTABLE_PRINT_TO_FILE);

//Shortcut for printing an object into the standart output.
static inline int Printable_print(const void* _self){
    return Printable_printToFile(_self, stdout);
}

#endif //PRINTABLE_INTERFACE_H__
```

Interface implementation
------------------------

To implement the interface you just have to use the `INTERFACE_METHOD_IMPLEMENTATION(error_return_value_, func_desc_)` macro. Its arguments are the value to return if the interface is called on something that doesn't accept it and the function descriptor for that interface.

The final interface implementation is as follows
```c
// File: printable_interface.c
#include <printable_interface.h>

/*------------------------------------------------*/
/*----- Interface methods implementation ---------*/
/*------------------------------------------------*/
INTERFACE_METHOD_IMPLEMENTATION(-1, M_PRINTABLE_PRINT_TO_FILE);
```

Now to test this interface we will add it into the Point class we created earlier.

Adding the printable interface to the Point class
-------------------------------------------------
In order for a class to be able to implement an interface, it must have a metaclass. The interface methods are also overwritable by the base class subclasses. 

To incorporate the interface into the class we will have to modify the tree files (public and reserved interfaces and the implementation).

Since Point already has the metaclass PointClass all we to do in the public interface is `#include` the printable interface and use the `INTERFACE_METHOD_HEADER(metaclass_, func_desc_)`macro. 

```c
INTERFACE_METHOD_HEADER(PointClass, M_PRINTABLE_PRINT_TO_FILE);
```

In the reserved interface we will have to add the interface to the metaclass representation and add the super method of the interface

```c
typedef struct PointClass_r{
    const Class_r _;
    CLASS_DYNAMIC_METHOD(M_POINT_DRAW);
    CLASS_INTERFACE_METHOD(PointClass, M_PRINTABLE_PRINT_TO_FILE);
}PointClass_r;

SUPER_DYNAMIC_METHOD(M_POINT_DRAW);
SUPER_INTERFACE_METHOD(PointClass, M_PRINTABLE_PRINT_TO_FILE);
```

We do that with the `CLASS_INTERFACE_METHOD` and the `SUPER_INTERFACE_METHOD` macros, they work exactly like their dynamic methods contraparts, but they also need the metaclass name as a parameter.

To finish thing up on the implementation file we will have to create the interface method itself, add the linkage into the metaclass constructor, overwrite the interface function and link the class to overwritten method.

```c
INTERFACE_METHOD(PointClass, -1,  M_PRINTABLE_PRINT_TO_FILE);

static OVERWRITE_METHOD(Point, M_PRINTABLE_PRINT_TO_FILE){
    CAST(self, Point);
    ASSERT(self, -1);
    return fprintf(fp, "(%d, %d)\n", self->x, self->y);
}

static OVERWRITE_METHOD(PointClass, M_CTOR){
    SUPER_CTOR(self, PointClass);
    SELECTOR_LOOP(
        FIRST_SELECTOR(M_POINT_DRAW)
        ADD_INTERFACE_SELECTOR(PointClass, M_PRINTABLE_PRINT_TO_FILE)
    )
}

const void* initPoint(){
    return ooc_new(	PointClassClass(),
            "Point",
            ObjectClass(),
            sizeof(Point_r),
            LINK_METHOD(Point, M_CTOR),
            LINK_METHOD(Point, M_POINT_DRAW),
            LINK_INTERFACE_METHOD(Point, PointClass, M_PRINTABLE_PRINT_TO_FILE),
            0);
}
```

All this steps are the same we did when creating a dynamically linked method, The only difference is that some of the interface macros require the metaclass as its parameter aswell.

The complete modified files are:

```c
// File: point.h
#ifndef POINT_H_
#define POINT_H_

#include <ooc.h>
#include <printable_interface.h>

/*------------------------------------------------*/
/*----------- ClassVar declaration ---------------*/
/*------------------------------------------------*/
CLASS_DECLARATION(Point);
CLASS_DECLARATION(PointClass);

static inline o_Point Point(int x, int y){
    return ooc_new(PointClass(), x, y);
}

void Point_move(o_Point _self, int delta_x, int delta_y); 

#define M_POINT_DRAW_DEF   void, Point_draw
#define M_POINT_DRAW_ARG   o_Point _self
#define M_POINT_DRAW_PARAM         _self
DYNAMIC_METHOD_HEADER(M_POINT_DRAW);

INTERFACE_METHOD_HEADER(PointClass, M_PRINTABLE_PRINT_TO_FILE);

#endif
```

```c
// File: point.r
#ifndef POINT_R_
#define POINT_R_

#include <point.h>
#include <ooc.r>

typedef struct Point_r{
    const Object_r _;
    int x;
    int y;
}Point_r;

typedef struct PointClass_r{
    const Class_r _;
    CLASS_DYNAMIC_METHOD(M_POINT_DRAW);
    CLASS_INTERFACE_METHOD(PointClass, M_PRINTABLE_PRINT_TO_FILE);
}PointClass_r;

SUPER_DYNAMIC_METHOD(M_POINT_DRAW);
SUPER_INTERFACE_METHOD(PointClass, M_PRINTABLE_PRINT_TO_FILE);

#endif
```

```c
// File: point.c
#include <point.h>
#include <point.r>
#include <lua_assert.h>

DYNAMIC_METHOD(PointClass, , M_POINT_DRAW);
INTERFACE_METHOD(PointClass, -1,  M_PRINTABLE_PRINT_TO_FILE);

void Point_move(o_Point _self, int delta_x, int delta_y){
    CAST(self, Point);
    ASSERT(self,);
    self->x += delta_x;
    self->y += delta_y;
}

static OVERWRITE_METHOD(Point, M_POINT_DRAW){
    CAST(self, Point);
    ASSERT(self, );
    printf("Point at %d, %d\n", self->x, self->y);
}

static OVERWRITE_METHOD(Point, M_PRINTABLE_PRINT_TO_FILE){
    CAST(self, Point);
    ASSERT(self, -1);
    return fprintf(fp, "(%d, %d)\n", self->x, self->y);
}

static OVERWRITE_METHOD(Point, M_CTOR){
    SUPER_CTOR(self, Point);
    ASSERT(self, NULL);
    self->x = CTOR_GET_PARAM(int);
    self->y = CTOR_GET_PARAM(int);
    return self;
}

static OVERWRITE_METHOD(PointClass, M_CTOR){
    SUPER_CTOR(self, PointClass);
    SELECTOR_LOOP(
        FIRST_SELECTOR(M_POINT_DRAW)
        ADD_INTERFACE_SELECTOR(PointClass, M_PRINTABLE_PRINT_TO_FILE)
    )
}



const void* Point_d;
const void* PointClass_d;
const void* initPoint(){
    return ooc_new(	PointClassClass(),
            "Point",
            ObjectClass(),
            sizeof(Point_r),
            LINK_METHOD(Point, M_CTOR),
            LINK_METHOD(Point, M_POINT_DRAW),
            LINK_INTERFACE_METHOD(Point, PointClass, M_PRINTABLE_PRINT_TO_FILE),
            0);
}
const void* initPointClass(){
    return ooc_new(	ClassClass(),
            "PointClass",
            ClassClass(),
            sizeof(PointClass_r),
            LINK_METHOD(PointClass, M_CTOR),
            0);
}
```

In short:

| Dynamic method | Interface |
| -------------- | --------- |
| DYNAMIC_METHOD_HEADER(func_desc_) | INTERFACE_METHOD_HEADER(metaclass_, func_desc_) |
| CLASS_DYNAMIC_METHOD(func_desc_) | CLASS_INTERFACE_METHOD(metaclass_, func_desc_) | 
| SUPER_DYNAMIC_METHOD(func_desc_) | SUPER_INTERFACE_METHOD(metaclass_, func_desc_) |
| DYNAMIC_METHOD(metaclass_, error_return_value_, func_desc_) | INTERFACE_METHOD(metaclass_, error_return_value_, func_desc_) |
| OVERWRITE_METHOD(class_, func_desc_) | OVERWRITE_METHOD(class_, func_desc_) |
| FIRST_SELECTOR(func_desc_) | FIRST_INTERFACE_SELECTOR(metaclass_, func_desc_) |
| ADD_SELECTOR(func_desc_) | ADD_INTERFACE_SELECTOR(metaclass_, func_desc_) |
| LINK_METHOD(class_, func_desc_) | LINK_INTERFACE_METHOD(class_, metaclass_, func_desc_) |

All done, we can now use the printable interface in Point objects and all its subclasses.

If we run:
```c
    o_Point o_point = Point(3,5);
    o_Circle o_circle = Circle(4,3, 10);
    Point_draw(o_point);
    Point_move(o_point, 10, 10);
    Point_draw(o_point);
    Point_move(o_point, -15, -20);
    Point_draw(o_point);
    Point_draw(o_circle);
    Point_move(o_circle, 7, 2);
    Point_draw(o_circle);
    Point_move(o_circle, -3, 30);
    Point_draw(o_circle);
    Printable_print(o_point);
    Printable_print(o_circle);
    OOC_DELETE(o_point);
    OOC_DELETE(o_circle);
```
The output will be
```
Point at 3, 5
Point at 13, 15
Point at -2, -5
Circle with radius 10 at 4, 3
Circle with radius 10 at 11, 5
Circle with radius 10 at 8, 35
(-2, -5)
(8, 35)
```

Overwriting the interface behaviour in Circle
---------------------------------------------

As we can see the circle and point calls to `Printable_print` returned the same thing. That's because when a subclass does not overwrite the base class method, it will default to the base class behaviour.

If we want to change that behaviour we just have to overwrite the behaviour in the circle implementation.

Just add

```c
static OVERWRITE_METHOD(Circle, M_PRINTABLE_PRINT_TO_FILE){
    CAST(self, Circle);
    ASSERT(self, -1);
    return fprintf(fp, "(%d, %d)r:%d\n", ((Point_r*)self)->x, ((Point_r*)self)->y, self->radius);
}
```

and link the new interface method

```c
const void* initCircle(){
    return ooc_new(	PointClassClass(),
            "Circle",
            PointClass(),
            sizeof(Circle_r),
            LINK_METHOD(Circle, M_CTOR),
            LINK_METHOD(Circle, M_POINT_DRAW),
            LINK_INTERFACE_METHOD(Circle, PointClass, M_PRINTABLE_PRINT_TO_FILE),
            0);
}
```

The complete file will look like this:
```c
// File: circle.c
#include "circle.h"
#include "circle.r"
#include "lua_assert.h"

static OVERWRITE_METHOD(Circle, M_POINT_DRAW){
    CAST(self, Circle);
    ASSERT(self, );
    printf("Circle with radius %d at %d, %d\n", self->radius, self->_.x, self->_.y);
}

static OVERWRITE_METHOD(Circle, M_PRINTABLE_PRINT_TO_FILE){
    CAST(self, Circle);
    ASSERT(self, -1);
    return fprintf(fp, "(%d, %d)r:%d\n", ((Point_r*)self)->x, ((Point_r*)self)->y, self->radius);
}

static OVERWRITE_METHOD(Circle, M_CTOR){
    SUPER_CTOR(self, Circle);
    ASSERT(self, NULL);
    self->radius = CTOR_GET_PARAM(int);
    return self;
}

const void* Circle_d;
const void* initCircle(){
    return ooc_new(	PointClassClass(),
            "Circle",
            PointClass(),
            sizeof(Circle_r),
            LINK_METHOD(Circle, M_CTOR),
            LINK_METHOD(Circle, M_POINT_DRAW),
            LINK_INTERFACE_METHOD(Circle, PointClass, M_PRINTABLE_PRINT_TO_FILE),
            0);
}
```

The output of that same program will now be 

```c
Point at 3, 5
Point at 13, 15
Point at -2, -5
Circle with radius 10 at 4, 3
Circle with radius 10 at 11, 5
Circle with radius 10 at 8, 35
(-2, -5)
(8, 35)r:10
```