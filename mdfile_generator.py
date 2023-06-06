import time
fpath, fmode = 'C:/Users/noir1/Documents/git/noir1458.github.io/_posts/', 'w'
def other_type():
    tags = ['markdown','ENG','JPN','finance','physics','programmers','ComputerArchitecture','DataStructure','algorithm','OS','DB','network','python','numpy_pandas','Arduino','calculus','LinearAlgebra','AdvancedEngineeringMathematics','DifferentialEquation']
    for idx in range(len(tags)):
        print(idx,'-',tags[idx])
    idx_tags = int(input('태그 앞 번호를 입력하여 태그 설정 : '))
    set_tag = tags[idx_tags]

    fdate = time.strftime('%Y-%m-%d-')
    fhandle = open(fpath+fdate+set_tag+'.md',fmode)
    
    infile = '''---
layout: single
title: ''' + set_tag + '''
tags: ''' + set_tag + '''
---
    '''
    fhandle.write(infile)
    fhandle.close()
    return None

def boj_type():
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
    fdate = time.strftime('%Y-%m-%d-')
    fname = fdate.replace('-','') + '_'+ 'think'
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