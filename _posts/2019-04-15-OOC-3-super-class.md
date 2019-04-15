---
title: OOC - Super Class
classes: wide
permalink: /ooc/super-class
excerpt: "How to create a simple class."
last_modified_at: 2019-04-15T01:30:10-05:00
toc: true
toc_icon: "cog"
categories:
    - OOC
tags:
    - c
    - OOC
    - Classe
---

Creating a super class
======================
For this example we will create two classes, the Point and the Circle.
The point has two atributtes, it's x and y coordinates. And two methods, the move and draw methods. 

To move the point we will only add the delta x, and delta y to the currents point position.
To draw it we will only print "Point at x, y"

The circle follows the same principle, but it also has a radius.
The move method does exactly the same, but the draw method must print "Circle with radius r at x,y" instead.

To do that we will implement the circle as a subclass of the point. Since the behaviour of the move method is exactly the same it will be a static method and since the draw method changes its behaviour it will have to be a dynamic method.

Point - Public Interface
------------------------
The structure for static part is exactly the same as the cat example:
```c
#ifndef POINT_H_
#define POINT_H_

#include <ooc.h>

/*------------------------------------------------*/
/*----------- ClassVar declaration ---------------*/
/*------------------------------------------------*/
CLASS_DECLARATION(Point);

static inline o_Point Point(int x, int y){
    return ooc_new(PointClass(), x, y);
}

void Point_move(o_Point _self, int delta_x, int delta_y); 

#endif
```

To be able to have dynamically linked methods we must have another type of object, the ***Metaclass***. The metaclass stores a reference to the methods a class can call.  The base metaclass is the class, and all metaclasses must subclass it.

To create a metaclass for the Point just create a class with the name PointClass
```c
CLASS_DECLARATION(PointClass);
```

**There should be no constructor for the metaclass!**

To declare a dynamic method you must create a function descriptor for that method.

### Function descriptors
Function descriptors are use to define a function in one single place,
and be able to reuse this declaration across the program.

The function descriptor is composed of 3 macros and must obey the following rules:
* The name must be all caps and start with `M_`
* The name must reflect the function the descriptor describes
* The three macros must start with the names of the descriptor

The three macros are the definition macro, the argument list macro and the parameter list macro

Ex: For a function descriptor called M_COMPARABLE_COMPARE_TO that describes the function: 
```c
int Comparable_compareTo(const void* _self, void* _destroyable_other)
```
1. We have the definition macro that has the return type of the function followed by the function name
    ```c
    #define M_COMPARABLE_COMPARE_TO_DEF int, Comparable_compareTo
    ```
2.  We have the argument list macro which describes the arguments the function takes
    ```c
    #define M_COMPARABLE_COMPARE_TO_ARG   const void* _self, void* _destroyable_other
    ```
3.  And the parameter list which is the `M_COMPARABLE_COMPARE_TO_ARG` without the types
    ```c
    #define M_COMPARABLE_COMPARE_TO_PARAM  _self, _destroyable_other
    ```

So if we want to represent the dynamically linked method 
```c
void Point_draw(o_Point _self);
```
we must create the `M_POINT_DRAW` descriptor
```c
#define M_POINT_DRAW_DEF   void, Point_draw
#define M_POINT_DRAW_ARG   o_Point _self
#define M_POINT_DRAW_PARAM         _self
DYNAMIC_METHOD_HEADER(M_POINT_DRAW);
```

With that the public interface is done 
```c
// File: point.h
#ifndef POINT_H_
#define POINT_H_

#include <ooc.h>

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

#endif
```

Point - Reserved Interface
--------------------------

The Point class representation follows exactly the same structure as the Cat class example.

```c
#include <point.h>
#include <ooc.r>

typedef struct Point_r{
    const Object_r _;
    int x;
    int y;
}Point_r;
```

But we must also implement the metaclass PointClass_r representation, it must be a subclass of Class and must have a pointer of the type of our dynamic function.

```c
typedef struct PointClass_r{
    const Class_r _; // The superclass is Class, because this is a metaclass
    CLASS_DYNAMIC_METHOD(M_POINT_DRAW);
}PointClass_r;

SUPER_DYNAMIC_METHOD(M_POINT_DRAW);
```

The `CLASS_DYNAMIC_METHOD(M_POINT_DRAW)` will create a pointer to a function of the type of function the function descriptor describes.

The `SUPER_DYNAMIC_METHOD(M_POINT_DRAW)` will create the super function that allows subclasses to call its superclass version of the function.

The finished restricted interface will look like this

```c
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
}PointClass_r;

SUPER_DYNAMIC_METHOD(M_POINT_DRAW);

#endif
```

Point - Implementation file
---------------------------

If our class had only the move method the implementation file would look like this

```c
#include <point.h>
#include <point.r>
#include <lua_assert.h>

void Point_move(o_Point _self, int delta_x, int delta_y){
    CAST(self, Point);
    ASSERT(self,);
    self->x += delta_x;
    self->y += delta_y;
}

static OVERWRITE_METHOD(Point, M_CTOR){
    SUPER_CTOR(self, Point);
    ASSERT(self, NULL);
    self->x = CTOR_GET_PARAM(int);
    self->y = CTOR_GET_PARAM(int);
    return self;
}

const void* Point_d;
const void* initPoint(){
    return ooc_new( ClassClass(), // Metaclass
            "Point",              //Name
            ObjectClass(),        // Superclass
            sizeof(Point_r),      // Size of description
            LINK_METHOD(Point, M_CTOR), // Linking the dynamic methods
            0);
}
```

But in order to add the dynamically linked method we have to do a couple of extra steps.

First we have to implement the dynamic linkage, to do that we use the `DYNAMIC_METHOD(metaclass__, error_return_, func_desc_)` macro. 

```c
DYNAMIC_METHOD(PointClass, , M_POINT_DRAW);
```

The middle parameter is what to return when there is a linkage error, since Point_draw doesn't return anything, we leave it empty.

Now that the dynamic linkage is up and running we have to create the constructor for our metaclass, this way we will be able to tell our class which function we should point to:

```c
static OVERWRITE_METHOD(PointClass, M_CTOR){
    SUPER_CTOR(self, PointClass);
    SELECTOR_LOOP(
        FIRST_SELECTOR(M_POINT_DRAW)
    )
}
```
The metaclass constructor will always look like this. If you have more than one dynamic linked method you also, for example a method described by, M_POINT_UNDRAW you would use the `ADD_SELECTOR(M_POINT_UNDRAW)` after that. e.g, 
```c
static OVERWRITE_METHOD(PointClass, M_CTOR){
    SUPER_CTOR(self, PointClass);
    SELECTOR_LOOP(
        FIRST_SELECTOR(M_POINT_DRAW)
        ADD_SELECTOR(M_POINT_UNDRAW)
    )
}
```

We must also create the metaclass descriptor and initializer
```c
const void* PointClass_d;
const void* initPointClass(){
    return ooc_new( ClassClass(),
            "PointClass",
            ClassClass(),
            sizeof(PointClass_r),
            LINK_METHOD(PointClass, M_CTOR),
            0);
}
```

Now the `M_POINT_DRAW` is dynamically linked just like `M_CTOR`, so we will have to overwrite it and link it in the `initPoint()` method, and also change the point metaclass to be PointClass

```c
static OVERWRITE_METHOD(Point, M_POINT_DRAW){
    CAST(self, Point);
    ASSERT(self, );
    printf("Point at %d, %d\n", self->x, self->y);
}

const void* initPoint(){
    return ooc_new( PointClassClass(), // New Metaclass
            "Point",            
            ObjectClass(),
            sizeof(Point_r),
            LINK_METHOD(Point, M_CTOR),
            LINK_METHOD(Point, M_POINT_DRAW), // Linking M_POINT_DRAW
            0);
}
```

Our complete implementation file should look similar to this:

```c
// File: point.c
#include <point.h>
#include <point.r>
#include <lua_assert.h>

DYNAMIC_METHOD(PointClass, , M_POINT_DRAW);

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
Quick test
----------
Now if you include the "point.h" public interface and run the following program
```c
    o_Point o_point = Point(3,5);
    Point_draw(o_point);
    Point_move(o_point, 10, 10);
    Point_draw(o_point);
    Point_move(o_point, -15, -20);
    Point_draw(o_point);
    OOC_DELETE(o_point);
```

you should see this as an output
```c
Point at 3, 5
Point at 13, 15
Point at -2, -5
```

Now we can proceed to the creation of the circle

Circle - Public Interface
-------------------------
The circle public interface is pretty simple, since it inherits all methods from point we don't have to declare any method. Only the class and its constructor.

```c
// File: circle.h
#ifndef CIRCLE_H__
#define CIRCLE_H__

#include "point.h"

CLASS_DECLARATION(Circle);

static inline o_Circle Circle(int x, int y, int radius){
    return ooc_new(CircleClass(), x, y, radius);
}

#endif //CIRCLE_H__
```
Circle - Reserved Interface
-------------------------

The reserved interface is also pretty straightforward. You have to set the point as the superclass and add the radius field.

```c
// File: circle.r
#ifndef CIRCLE_R__
#define CIRCLE_R__

#include "circle.h"
#include "point.r"

typedef struct Circle_r{
    const Point_r _; //Superclass is Point not Object
    int radius;
}Circle_r;

#endif //CIRCLE_R__
```

We don't have to declare the x and y variables because they already exist inside the Point_r struct.

Circle implementation
---------------------
The implementation is also simple we just overwrite the draw and constructor and initialize the descriptor

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

static OVERWRITE_METHOD(Circle, M_CTOR){
    SUPER_CTOR(self, Circle);
    ASSERT(self, NULL);
    self->radius = CTOR_GET_PARAM(int);
    return self;
}

const void* Circle_d;
const void* initCircle(){
    return ooc_new(PointClassClass(),
            "Circle",
            PointClass(),
            sizeof(Circle_r),
            LINK_METHOD(Circle, M_CTOR),
            LINK_METHOD(Circle, M_POINT_DRAW),
            0);
}
```
Analysing the parts we have some noteworthy sections:

In the draw overwriting we have this part:
```c
printf("Circle with radius %d at %d, %d\n", self->radius, self->_.x, self->_.y);
```
To access the  superclass attributes we have to access it through the superclass struct. Another way to do this is to cast the pointer and access it directly
```c
((Point_r*)self)->x
```

In the constructor we don't need to initialize the arguments of the Point_r struct because the `SUPER_CTOR(self, Circle);` will do that for us. So any calls to `CTOR_GET_PARAM` here will get the next parameters after the point parameters.

And that's it. Now we can run the following program, after including "circle.h":

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
    OOC_DELETE(o_point);
    OOC_DELETE(o_circle);
```

and the output will be
```
Point at 3, 5
Point at 13, 15
Point at -2, -5
Circle with radius 10 at 4, 3
Circle with radius 10 at 11, 5
Circle with radius 10 at 8, 35
```