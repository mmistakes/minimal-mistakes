---
layout: single
title: 마크다운 파일 생성기
tags: think
---

## 1  
마크다운 글을 작성하면서 파일명, 제목, 태그 부분을 하나씩 작성하는게 번거롭고, 블로그에 올리는 글의 경우 날짜와 링크 이름까지 생각해서 수정해주어야 한다. 몇개 작성해봤지만 과정이 너무 번거롭다.

마크다운 파일 생성하는 코드를 파이썬으로 간단하게 만들어서 사용할수 있도록 했다. 다른 글 쓰는데는 크게 유용하지는 않은데, 코딩테스트 관련 글은 기본 템플릿을 정해두고 계속 복사하면서 쓰고 있던 참이라서 아주 유용하다. 조금 더 발전시키거나 다른 방식으로 만들면 더 쉽게 쓸 수 있을지도 모르겠다. 웹 안에서 파일을 만들어서 내보낸다던지...

만드는데 몇분 안걸렸고, 업로드하는 글과 같은 폴더에 넣고 엉성하게 쓰고 있다.

## 코드  
```python
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
    fhandle = open(fpath+fdate+'BOJ-'+fname+'.md',fmode,encoding="UTF-8")
    
    infile = '''---
layout: single
title: BOJ-'''+fname+'''
tags: BOJ
---

## 문제  
''' + fname + '''

## solution  
기본 템플릿

## CODE  


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
```
