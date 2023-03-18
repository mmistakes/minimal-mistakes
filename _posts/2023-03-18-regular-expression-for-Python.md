---
layout: single
title: regular expression for Python
tags: numpy_pandas
---
    
## Python and regular expression
[Python 공식 문서 참고](https://docs.python.org/ko/3/howto/regex.html)
언어마다 사용법이 다르다고 한다.

## example code

```python
# regular expression test
import re # regular standard lib

def testRegexp():
    pattern = "c[a-d]v?x*" # = {ca,cb,cc,cd,cax,caxx}
    regex = re.compile(pattern)

    pattern2 = "c[a-d]v?x*cxcx*"
    regex2 = re.compile(pattern2)

    # search
    res = regex.search("cbvxxxxxxxxxxxxcxcxx")
    print(res)
    res2 = regex2.search("cbvxxxxxxxxxxxxcxcxx")
    print(res2)
    return None

def testSSID():
    pattern = "[0-9]{6}-[0-9]{7}"

    regex = re.compile(pattern)
    res = regex.search("999999-8888808")
    print(res)

    return None

def main():
    testRegexp()
    testSSID()
    return None

if __name__ == '__main__':
    main()
```

```
<re.Match object; span=(0, 15), match='cbvxxxxxxxxxxxx'>
<re.Match object; span=(0, 20), match='cbvxxxxxxxxxxxxcxcxx'>
<re.Match object; span=(0, 14), match='999999-8888808'>
```
