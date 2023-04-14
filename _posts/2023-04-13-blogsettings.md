---
layout: single
title: "Blog Settings "
categories: blogging
tag: [github,daily]
---


<h2> Blog Settings</h2>



<h3>Conversion</h3>



For Python: '''python  '''

```python	
import time

def countdown(time_sec):
    while time_sec:
        mins, secs = divmod(time_sec, 60)
        timeformat = '{:02d}:{:02d}'.format(mins, secs)
        print(timeformat, end='\r')
        time.sleep(1)
        time_sec -= 1

    print("stop")

countdown(5)
```



