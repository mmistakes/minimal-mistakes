---
layout: single
title: "Python Practice (1)"
categories: Python
tag: Python
author_profile: false
sidebar:
    nav: "docs"
---

## Python practice problem (1)

Today, I tried to solve one practice problem for Python to review Python.

### Question of the day

```python
# wordOvlp(w1, w2) takes two strings, w1 and w2, and
# returns the percentage of letters appearing
# in both w1 and w2 with respect to the longer of w1 and w2.
# Duplicate characters that appear in both words count only
# once.
#
# Example:
#   >>> wordOvlp('computer', 'science')
#   25
#   >>> wordOvlp('raise','mouth')
#   0
#   >>> wordOvlp('gamma', 'lambda')
#   33
#
# Note: solutions that use iteration (e.g., for, while or similar)
# will not earn any credit.
#
def wordOvlp(w1, w2):
    pass
```

When I saw this problem for the first time today, the only solution I could approach was using iteration. 
And if I were to solve the problem using iteration, the code would get too long for this kind of problem, 
and it would not earn any credits. So I searched in the Internet on how to find overlapping elements from two strings, 
and I remembered that getting the intersection of the set of the two strings would satisfy all the condition.

Solution:
```python
def wordOvlp(w1, w2):
    ovlp = len(set(w1) & set(w2))
    if len(w1) > len(w2):
        return round(ovlp / len(w1) * 100)
    else:
        return round(ovlp / len(w2) * 100)
```
I made the variable ovlp as ```len(set(w1) & set(w2))``` to find out the number of overlaps between two strings. 
Then I did the math to find out the percentage. 

I learned that not practicing would make me lose the skill, and that I need to keep on doing some practices like this 
to maintain my knowledge and skill.