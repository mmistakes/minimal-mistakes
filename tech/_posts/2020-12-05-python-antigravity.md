---
title: Python & Antigravity
tags:
  - python
  - easter egg
categories: tech
excerpt: Python's antigravity package explored
---

Python's got a neat list of easter eggs, of which `antigravity` is one. What it does when you call it as

```py
import antigravity
```

is simply opening up this XKCD comic [page](https://xkcd.com/353/){:target="_blank"} which is about Python.

Now, the module was created in [2008](http://python-history.blogspot.com/2010/06/import-antigravity.html){:target="_blank"} with just that purpose, and soon afterwards an egg inside the egg was added, looking at the [commit history](https://github.com/python/cpython/commits/master/Lib/antigravity.py){:target="_blank"}. The second egg implements XKCD's geohashing algorithm, explained in [this comic](https://xkcd.com/426/){:target="_blank"}, which is also used for a [game](https://geohashing.site/geohashing/Main_Page){:target="_blank"}.

You can call it as, say,

```py
antigravity.geohash(100,120,b'2020-12-06 30218.26')
```

Give it a try!

# Some references
* [7 easter eggs in Python](https://towardsdatascience.com/7-easter-eggs-in-python-7765dc15a203)
* [The top 5 ester eggs in Python](https://www.alanzucconi.com/2015/10/29/the-top-5-easter-eggs-in-python/)
