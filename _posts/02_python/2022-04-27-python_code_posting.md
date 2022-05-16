---
layout: single
title: code posting, python code를 붙여 넣자 (github blog / markdown)
categories: 02_python
tag: [python, blog, jekyll]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

## python code를 사이에 넣고 싶은데 어떻게 해야 할까? <br>
markdown으로 posting을 하는 경우 혹은 stackoverflow 같은 community에 내 code에 대한 질문을 하고 싶어서 code를 붙여 넣고 싶은데 이게 안되서 시간을 많이 보내는 경우가 있다. 본인이 그랬다. 초보자라면 헷갈리는 경우가 있다. 너무 간단하니 알아두자<br>
### 1> 그냥 붙여넣기: 3 backslash + code + 3backslash <br>
<img src = "/assets/img/bongs/20220505/01.png"><br>
이렇게 하면 code를 넣을 수 있다. 하지만 어떤 language인지는 모른다. 그래서 code의 모든 글자가 색깔이 없다. <br>

```
# Python program to check if year is a leap year or not

year = 2000

# To get year (integer input) from the user
# year = int(input("Enter a year: "))

# divided by 100 means century year (ending with 00)
# century year divided by 400 is leap year
if (year % 400 == 0) and (year % 100 == 0):
    print("{0} is a leap year".format(year))

# not divided by 100 means not a century year
# year divided by 4 is a leap year
elif (year % 4 ==0) and (year % 100 != 0):
    print("{0} is a leap year".format(year))

# if not divided by both 400 (century year) and 4 (not century year)
# year is not leap year
else:
    print("{0} is not a leap year".format(year))
```

### 2> 이쁘게 붙여넣기: 3 backslash + python + **code** + 3 backslash <br>
<img src = "/assets/img/bongs/20220505/02.png"><br>
이렇게 하면 붙여넣은 code가 python인지 인식한다. 그래서 code를 IDE(개발환경, vs code or pycharm)에서처럼 훨씬 보기 쉬운 형태로 posting이 가능하다. <br>
```python
# Python program to check if year is a leap year or not

year = 2000

# To get year (integer input) from the user
# year = int(input("Enter a year: "))

# divided by 100 means century year (ending with 00)
# century year divided by 400 is leap year
if (year % 400 == 0) and (year % 100 == 0):
    print("{0} is a leap year".format(year))

# not divided by 100 means not a century year
# year divided by 4 is a leap year
elif (year % 4 ==0) and (year % 100 != 0):
    print("{0} is a leap year".format(year))

# if not divided by both 400 (century year) and 4 (not century year)
# year is not leap year
else:
    print("{0} is not a leap year".format(year))
```