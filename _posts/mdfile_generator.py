import time

def other_type():
    fpath, fmode = '', 'w'
    fdate = time.strftime('%Y-%m-%d-')
    fname = input('날짜 뒤의 파일명을 입력하세요 : ')
    fhandle = open(fpath+fdate+fname+'.md',fmode)
    
    infile = '''---
layout: single
title: ''' + fname + '''
tags: other
---
    '''
    fhandle.write(infile)
    fhandle.close()
    return None

def boj_type():
    fpath, fmode = '', 'w'
    fdate = time.strftime('%Y-%m-%d-')
    fname = input('문제번호를 입력하세요 : ')
    qname = input('문제이름을 입력하세요 : ')
    fhandle = open(fpath+fdate+'BOJ-'+fname+'.md',fmode,encoding="UTF-8")
    
    infile = '''---
layout: single
title: BOJ-'''+fname+'''-python ''' + qname +'''
tags: BOJ
---

## 문제  
''' + fname + '''

## solution  
기본 템플릿

## CODE  

```python

```
    '''
    fhandle.write(infile)
    fhandle.close()
    return None

def think_type():
    fpath, fmode = '', 'w'
    fdate = time.strftime('%Y-%m-%d-')
    fname = input('날짜 뒤의 파일명을 입력하세요 : ')
    fhandle = open(fpath+fdate+fname+'.md',fmode)
    
    infile = '''---
layout: single
title: ''' + fname + '''
tags: think
---

    '''
    fhandle.write(infile)
    fhandle.close()
    return None

def make_md():
    print('0:other 1:boj 2:think')
    type_input = int(input('post type? : '))
    if type_input == 1:
        boj_type()
    elif type_input == 2:
        think_type()
    else:
        other_type()

    return None

def main():
    make_md()
    return None

if __name__ == '__main__':
    main()