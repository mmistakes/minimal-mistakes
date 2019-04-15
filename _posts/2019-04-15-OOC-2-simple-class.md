---
title: OOC - Simple Class
classes: wide
permalink: /ooc/simple-class
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

Creating a simple class
===============

Let's start by creating a simple class: the cat. A cat can be really simplified and be represented by a color, a weight, a length and a name. These will be our attributes.

A cat can "talk", jump and eat, amongst other things. These will be our methods, or interfaces. With than we can begin building our cat class.

In OOC a class is defined by three files,

* the public interface or .h file,
* the reserved interface or .r file and
* the implementation or .c file.

Public Interface
----------------
Let's begin with the public interface, first we must create the class itself, for that we use the `CLASS_DECLARATION` macro.

```c
// File: cat.h
#ifndef CAT_H_
#define CAT_H_
#include "ooc.h"

CLASS_DECLARATION(Cat);

#endif /* CAT_H_ */
```
This macro creates the type `o_Cat`, which we will use to refer to cat objects, the descriptor `Cat_d`, which is a pointer to an object that knows how to build cat objects. A forward declaration of the `void* initCat()`, a function that creates the `Cat_d` descriptor (This function must be implemented in the implementation file). And the implementation of the automatic initializer `inline const void* CatClass()`, which is what we will use to access the descriptor.

The next step is to create the constructors of your class, to do that we create inline functions that makes cals to the `ooc_new` function.
```c
...
// File: cat.h
// Empty constructor
static inline o_Cat Cat(){
    return ooc_new(CatClass(), 0, 0.0, 0.0, NULL);
}
// Complete constructor
static inline o_Cat CatSpecified(int color, double weight, double length, o_String o_name){
    return ooc_new(CatClass(), color, weight, length, o_name);
}
...
```
Now we must specify what our cat can do. We do it simply be creating functions that takes as the first parameter the class object. This is will be our methods:
```c
...
void Cat_jump(o_Cat self, double distance);
void Cat_eat(o_Cat self);
o_String Cat_talk(o_Cat self); 
...
```
With that our basic class public interface file is complete!
```c
#ifndef CAT_H_
#define CAT_H_
#include "ooc.h"
#include "o_string.h"
//---- Class declaration
CLASS_DECLARATION(Cat);
//----  Class constructor
// Empty constructor
static inline o_Cat Cat(){
    return ooc_new(CatClass(), 0, 0.0, 0.0, NULL);
}
// Complete constructor
static inline o_Cat CatSpecified(int color, double weight, double length, o_String o_name){
    return ooc_new(CatClass(), color, weight, length, o_name);
}
//---- Methods
// Static methods
void Cat_jump(o_Cat self, double distance);
void Cat_eat(o_Cat self);
o_String Cat_talk(o_Cat self);
#endif /* CAT_H_ */
```

Reserved Interface
--------------------
Now we will build the restricted interface for the cat class, this is pretty simple. All we have to do is create the `cat.r` file, include the `ooc.r` file and the public interface file and implement the struct that represents our data.

Since our cat is described by it's color, weight, length and name we create a struct `Cat_r` with this information.

```c
#ifndef CAT_R__
#define CAT_R__

#include "ooc.r"
#include "cat.h"

typedef struct Cat_r{
    const Object_r  _;
    int             color;
    double           weight;
    double           length;
    o_String        o_name;
}Cat_r;

#endif //CAT_R__
```

There are two very important things to notice in this struct.
* **The struct must be typedef'ed to create a new type**. This new type **must be** the class name followed by **_r**!
* **The first element of the struct must be the base class representation of this class and must be called *_***!

You must follow these rules or polimorphism and the macros won't work.

Now we can start with the implementation file

Implementation file
--------------------

We'll start implementing the static linked methods `Cat_jump`, `Cat_eat` and `Cat_talk`.

```c
#include "cat.h"
#include "cat.r"
#include "lua_assert.h"

void Cat_jump(o_Cat _self, double distance){
    CAST(self, Cat);
    ASSERT(self,);
    if( (4*self->length) < distance ){
        printf("Jumping %f meters\n", distance);
    }else{
        printf("Can't jump that far\n");
    }
}
void Cat_eat(o_Cat _self){
    CAST(self, Cat);
    ASSERT(self, );
    self->weight += 0.01;
}
o_String Cat_talk(o_Cat _self){
    CAST(self, Cat);
    ASSERT(self, NULL);
    o_String o_talk = OOC_CLONE(self->o_name);
    String_appendC(o_talk, " says meow!");
    return o_talk;
}
```

The class methods must always have the first argument called `_self` and it represents the object the method is applied to. To ensure that the class methods is being applied to the right object we should always use the `CAST(name_, class_)` macro. This macros verifies if a variable with name **"_var_name"** is a subclass of the `Class` specified and casts it into a pointer of `Class_r`. If the object is not a subclass the cast will return a pointer to `NULL`. That is why we use to `ASSERT(assertion_, return_value_)` macro to check if the pointer is valid and deal with the error appropriatly.

The base object has three overwritable functions the ooc_ctor (Constructor), the ooc_dtor(Destructor) and ooc_differ(Comparison).

The only one you must alway overwrite is the constructor. If the constructor allocates any memory, you must implement the destructor and if you wan't to change the default comparison, which compares pointers, you must overwrite the comparison.

To do that you must use the `OVERWRITE_METHOD(func_desc_)` macro which takes in a function descriptor (this will be explained later). The function descriptors for the constructor, destructor and difference methods are, respectively, `M_CTOR`, `M_DTOR` and `M_DIFFER`.

So to implement the Cat constructor 
```c
static OVERWRITE_METHOD(Cat, M_CTOR){
    SUPER_CTOR(self, Cat);
    ASSERT(self, NULL);
    self->color = CTOR_GET_PARAM(int);
    self->weight = CTOR_GET_PARAM(double);
    self->length = CTOR_GET_PARAM(double);
    self->o_name = CTOR_GET_PARAM(o_String);
    return self;
}
```
The `SUPER_CTOR(self, Cat);` will call the super class constructor. If something is wrong the variable self will be set to `NULL`. The macro `CTOR_GET_PARAM(type_)` will return the next available parameter with the type passed from the variable list. You must retrieve the parameters exactly in the order passed by the constructor.

Since `o_name` is an object, the cat object is now responsible for its lifespan, so we must implement the destructor to free the resource when this object is destroyed.

```c
static OVERWRITE_METHOD(Cat, M_DTOR){
    SUPER_DTOR(self, Cat);
    ASSERT(self, NULL);
    OOC_DELETE(self->o_name);
    return self;
}
```

The `SUPER_CTOR(self, Cat);` will call the super class constructor. If something is wrong the variable self will be set to `NULL`. 

Both the constructor and the destructor should alway return self, unless something wrong occurs, then it must return `NULL`.


To end the class implementation all we have to do is create the description class variable `Cat_d` and the class initializer `initCat()`.

```c
const void* Cat_d;
const void* initCat(){
    return ooc_new(	
            ClassClass(),               // MetaClass
            "Cat",                      // Class name
            ObjectClass(),              // Super class
            sizeof(Cat_r),              // Size of representation structure
            LINK_METHOD(Cat, M_CTOR),   // Linking the dynamic methods
            LINK_METHOD(Cat, M_DTOR),
            0); // Must alway ends with a zero
}
```

The `initCat()` method is called by the `CatClass()` automatic initializer, which will assign the object created inside `initCat` to the `Cat_d` descriptor object. This object contains the blueprint to build Cat objects.

The end implementation file should be something like this:
```c
#include "cat.h"
#include "cat.r"
#include "lua_assert.h"

// Static methods ------
void Cat_jump(o_Cat _self, double distance){
    CAST(self, Cat);
    ASSERT(self,);
    if( (4*self->length) < distance ){
        printf("Jumping %f meters\n", distance);
    }else{
        printf("Can't jump that far\n");
    }
}
void Cat_eat(o_Cat _self){
    CAST(self, Cat);
    ASSERT(self, );
    self->weight += 0.01;
}
o_String Cat_talk(o_Cat _self){
    CAST(self, Cat);
    ASSERT(self, NULL);
    o_String o_talk = OOC_CLONE(self->o_name);
    String_appendC(o_talk, " says meow!");
    return o_talk;
}

// Dynamic methods -----------
// Overwriting object -----------
static OVERWRITE_METHOD(Cat, M_CTOR){
    SUPER_CTOR(self, Cat);
    ASSERT(self, NULL);
    self->color = CTOR_GET_PARAM(int);
    self->weight = CTOR_GET_PARAM(double);
    self->length = CTOR_GET_PARAM(double);
    self->o_name = CTOR_GET_PARAM(o_String);
    return self;
}

static OVERWRITE_METHOD(Cat, M_DTOR){
    SUPER_DTOR(self, Cat);
    ASSERT(self, NULL);
    OOC_DELETE(self->o_name);
    return self;
}

// Descriptor and initializer
const void* Cat_d;
const void* initCat(){
    return ooc_new(	
            ClassClass(),               // MetaClass
            "Cat",                      // Class name
            ObjectClass(),              // Super class
            sizeof(Cat_r),              // Size of representation structure
            LINK_METHOD(Cat, M_CTOR),   // Linking the dynamic methods
            LINK_METHOD(Cat, M_DTOR),
            0); // Must alway ends with a zero
}

```