---
title: "Break it to get it: class and instance attributes in Python"
#tags:
#  - python
#  - oop
excerpt: Exploring the difference between class and instance attributes in Python
---

Let us investigate the relation between class and instance attributes in Python. It can be rather confusing, I believe.

This post will be about trying things out in order to break them and better understand what they do and it is somehow inspired by this source here, which is the most comprehensive I've found about this topic, describing and explaining in detail how things work.

Suppose I have a class describing a cake. I want to identify the cake by its type, which will be a string, and I want to give it a diameter attribute, which is set to 20 (cm) as default, as it seems reasonable for a typical cake. So I'll write

```py
class Cake(object):

    def __init__(self, cake_type, diameter=20):
        self.cake_type = cake_type
        self.diameter = diameter
```

Nothing special here. Now, suppose I write this instead

```py
class Cake(object):

    # A class attribute
    garnishes = []

    def __init__(self, cake_type, diameter=20):

        # Instance attributes
        self.cake_type = cake_type
        self.diameter = diameter
```

This version has an attribute of the class, `garnishes`, which is a list supposed to contain all the garnishes I decide to add to my cake. If I instanciate the class, I can access this attribute both from the class itself and from the instance:

```py
c = Cake('carrot')
c.garnishes
# []
Cake.garnishes
# []
```

This leads to the funny behaviour described in the docs as a piece of warning. In fact, if I insert a method in the class to add a garnish and I create two instances of the class, then I use the method to add a garnish to one of the instances, I will end up with the same garnish being added to the other instance as well:

```py
class Cake(object):

    # A class attribute
    garnishes = []

    def __init__(self, cake_type, diameter=20):

        # Instance attributes
        self.cake_type = cake_type
        self.diameter = diameter

    def add_garnish(self, garnish):
        self.garnishes.append(garnish)
```

```py
c1 = Cake('carrot')
c2 = Cake('brownie')

c1.add_garnish('cream')
print c1.garnishes
#['cream']
print c2.garnishes
#['cream']
```

I typically don't like cream on my brownie, so this is clearly a problem. The code design is not good for the job.

What is happening here is that all the instances of the class are making use of the same list.  In order to make each cake instance have their own set of garnishes, I'd have to redefine their garnishes lists separately from the instances and only then I could happily append to them:

```py
c1 = Cake('carrot')
c2 = Cake('brownie')

c1.garnishes = ['cream']
c2.garnishes = ['chocolate_chips']

c1.garnishes.append(['jam'])
c2.garnishes.append(['cherry'])

print c1.garnishes, c2.garnishes
# ['cream', ['jam']] ['chocolate_chips', ['cherry']]
```

I got stupidly confused on this matter when I was playing around with another example. Instead of having a list of garnishes, let's design the class to have an integer attribute counting the garnishes and let's create a method meant to increment the counter:

```py
class Cake(object):

    # A class attribute
    garnishes = 0

    def __init__(self, cake_type, diameter=20):

        # Instance attributes
        self.cake_type = cake_type
        self.diameter = diameter

    def add_garnish(self):
        self.garnishes += 1

c1 = Cake('carrot')
c2 = Cake('brownie')

c1.add_garnish()

print c1.garnishes, c2.garnishes
# 1 0
```

The second instance does not get its garnishes count incremented! We broke it. Let's try to understand.

A fact: an instance attribute has priority over the class attribute when access is performed from the instance.

The "difference" in the behaviour in the two cases is in the list being a mutable type while the int being an immutable type.
While in the list case we are appending to the list, which is shared by all instances of the Cake class, in the second case what we're actually doing when we call the method is `self.garnishes = self.garnishes + 1`.

That is, because of the immutability of the type, an instance attribute is created for instance c1 and it is incremented. The second instance does not see this attribute at all because it belongs to the first instance and the class attribute is not changed. The type is immutable so I cannot mutate a 0 into a 1, that is why.

To make it even clearer to myself, I did this:

```py
class Cake(object):

    # A class attribute
    garnishes = 0

    def __init__(self, cake_type, diameter=20):

        # Instance attributes
        self.cake_type = cake_type
        self.diameter = diameter
```

```py
c1 = Cake('carrot')
c2 = Cake('brownie')

# Changing the class attribute from the class
Cake.garnishes = 2
print c1.garnishes, c2.garnishes
# 2, 2
```

Makes sense, obviously: we are changing the class attribute so all the instances will see it changed. If I now change the attribute from one of the instances instead:

```py
class Cake(object):

    # A class attribute
    garnishes = 0

    def __init__(self, cake_type, diameter=20):

        # Instance attributes
        self.cake_type = cake_type
        self.diameter = diameter
```

```py
c1 = Cake('carrot')
c2 = Cake('brownie')

# Changing the class attribute from the first instance
c1.garnishes = 2
print c1.garnishes, c2.garnishes
# 2, 0
```

I get the expected: only the first instance sees it modified. And in fact the class attribute is not changed:

```py
print Cake.garnishes
# 0
```

In the case of a mutable type, the type can by definition be mutated, so when I try to append something to the list from the first instance what happens is the class attribute gets modified.
