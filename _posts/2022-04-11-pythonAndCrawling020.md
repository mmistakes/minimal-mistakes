---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 020"
categories: python
tag: [python, 파이썬, crawling, 크롤링]
toc: true
author_profile: false
toc: false
sidebar:
nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}


<h2>[파이썬(python) & 크롤링(crawling) - 020]</h2>


<h3> 크롤링(Crawling) 기본 - 20</h3>

<h3>정규표현식</h3>
<h5>정규표현식(regular expression) 간단히 regexp 또는 regex, rational expression) 또는  정규식(正規式)은 <br>
    특정한 규칙을 가진 문자열의 집합을 표현하는 데 사용하는 형식 언어이다. <bR>정규 표현식은 많은 텍스트 편집기와 프로그래밍 언어에서 문자열의 검색과 치환을 위해 지원하고 있다</h5>
<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1gCY2UXIkyfFvPDlTnZAE4o55pVhG3EoC" width="700"><br>
</div>
<br><br>

```python
                # 1. 문자, 숫자가 아닌 데이터를 삭제
                
                import re  # 정규표현식 라이브러리 import
                string = "(Gibson)"
                re.sub('[^A-Za-z0-9]', '', string)      #sub 함수가 정규표현식의 문자열 치환 함수        
                # 출력값 : 'Gibson'
```
<br>
<h5>필요한 패턴을 만들어 직접 적용해보기</h5>

```python

                # Dot. : .이 하나인경우는 줄바꿈 문자인 \n을 제외한 어떠한 문자든 하나를 의미함. .의 갯수와 문자의 갯수는 비례함
                # Ex) D.A => D + 어떠한 문자든 한 개 + A라는 뜻
                # Ex) D..A => D + 어떠한 문자든 두 개 + A라는 뜻      

                import re 
                
                # 정규 표현식 패턴 만들기(대문자와 대문자 사이에 하나의 문자가 들어가는 패턴임, 대소문자에 주의)
                pattern = re.compile('D.A')

                # search라는 함수를 이용해서 위의 pattern에 매칭되는지 확인, 패턴이 맞으면 출력값과 같이 출력되며, 패턴이 다르면 무반응
                # 패턴이 맞는 경우(가운데에 하나의 문자가 들어가 있는 경우
                pattern.search("DAA")
                #출력값 : <re.Match object; span=(0, 3), match='DAA'>

                pattern.search("D1A")
                #출력값 : <re.Match object; span=(0, 3), match='D1A'>
                # span=(0,3)의 의미는 패턴이 일치하는 시작 index가 0이고 숫자 3의 바로 직전인 2까지가 해당된다는 의미임
                  

                # 패턴이 안맞는 경우
                pattern.search("D00A") # 길이 안맞음
                pattern.search("DA")   # 길이 안맞음 
                pattern.search("d0A")  # 앞글자가 소문자임 

                # 정말 Dot.이 들어간 패턴을 찾을때는 \. 으로 표시하거나, [.] 으로 패턴을 만들어주면 됨.
                pattern = re.compile('D\.A') 또는 pattern = re.compile('D[.]A')로 표기
                # 그리고 아래와 같이 search를 해보면
                pattern.search("D.A")
                출력값 : <re.Match object; span=(0, 3), match='D.A'>

                
                # 정의한 패턴이 있는지를 찾아보고 있다면 정의한 문자열로 바꿔라(sub 함수 이용)
                string = "DDA D1A DDA DA" 
                # D.A라는 패턴을 찾고 그런 패턴이 있으면 Dave로 바꿔라.(패턴, 바꿔줄 데이터, 원본데이터) 
                re.sub('D.A', 'Dave', string)
                # 출력값 : 'Dave Dave Dave DA'



                # 반복관련 정규식 ? , * , +
                # ? 는 앞 문자가 없거나 또는 한번 표시되는 패턴 (없어도 되고, 한번 있어도 되는 패턴)
                # * 는 앞 문자가 없거나 한번 또는  그 이상 반복되는 패턴
                # + 는 앞 문자가 1번 또는 그 이상 반복되는 패턴

                pattern = re.compile('D?A') # ?이기에 앞에 문자 D가 없거나, 있고 마지막이 A 인 문자열을 찾는다는 뜻

                pattern.search("A") # A는 앞에 D문자가 없고 마지막이 A이기에 위의 패턴에 부합한다.
                #출력값 : <re.Match object; span=(0, 1), match='A'>

                pattern.search("DA") # DA는 앞에 D문자가 있고 마지막이 A이기에 위의 패턴에 부합한다.
                #출력값 : <re.Match object; span=(0, 2), match='DA'>

                pattern.search("DDA") # DDA는 앞에 D문자가 있고 마지막이 A이기에 위의 패턴에 부합, 뒤의 DA가 부합
                #출력값 : <re.Match object; span=(1, 3), match='DA'> #부합되는 위치를 span 값이 표시해준다.


                pattern = re.compile('D*A')  # 문자 D가 없든 있든 , 여러번 반복되든 마지막이 A 인 문자열

                pattern.search("A")     # A의 앞에 문자가 없고 A로 끝났기에 매칭
                #출력값 : <re.Match object; span=(0, 1), match='A'>

                pattern.search("DA")    # 문자 D가 있고 마지막이 A로 끝났기에 매칭      
                #출력값 : <re.Match object; span=(0, 2), match='DA'>

                pattern.search("DDDDDDDDDDDDDDDDDDDDDDDDDDDDA")   # 문자 D가 여러번 반복되고 마지막이 A로 끝났기에 매칭
                #출력값 : <re.Match object; span=(0, 29), match='DDDDDDDDDDDDDDDDDDDDDDDDDDDDA'>

                # ?과 *는 결과값이 유사하게 나오나 span을 보면 인지하는 index 번호가 다름. 



                pattern = re.compile('D+A')   # A로 끝나야하며 앞에 D가 최소 하나 이상 있어야 함.

                pattern.search("DA")
                #출력값 : <re.Match object; span=(0, 2), match='DA'>
                
                pattern.search("DDDDDDDDDDDDDDDDDDDDDDDDDDDDA")
                #출력값 : <re.Match object; span=(0, 29), match='DDDDDDDDDDDDDDDDDDDDDDDDDDDDA'>



                # {n} : 앞 문자가 n 번 반복

                pattern.search("ADDA")
                #출력값 : <re.Match object; span=(0, 4), match='ADDA'> D가 두번 반복되어 매칭


                # {m,n} : 앞 문자가 m 번 반복되는 패턴부터 n 번 반복되는 패턴까지 중요한 점은 {m,n}의 m,n사이에 space 없어야 함.
                pattern = re.compile('AD{2,6}A')    # D라는 문자가 2번부터 6번 반복되면 매칭

                pattern.search("ADDA")      # D라는 문자가 두번 출력
                #출력값 : <re.Match object; span=(0, 4), match='ADDA'>
                
                pattern.search("ADDDA")     # D라는 문자가 세번 출력
                #출력값 : <re.Match object; span=(0, 5), match='ADDDA'>
                
                pattern.search("ADDDDDDA")  # D라는 문자가 6번 출력    
                #출력값 : <re.Match object; span=(0, 8), match='ADDDDDDA'>


                # [ ] 괄호 : 괄호 안에 들어가는 문자가 들어 있는 패턴
                pattern = re.compile('[abcdefgABCDEFG]')

                pattern.search("a1234")    # a가 들어가있음
                #출력값 : <re.Match object; span=(0, 1), match='a'>
                
                pattern.search("z1234")    # z는 위의 괄호안에 들어가 있는 문자에 포함되지 않음 그래서 매칭 안됨.



                # - : 알파벳 범위를 나타내는 패턴
                pattern = re.compile('[a-z]')     # 알파벳 소문자 a부터 z까지를 나타냄

                pattern.search("a1234")    # a가 들어가있음
                #출력값 : <re.Match object; span=(0, 1), match='a'>
                
                pattern.search("A1234")    # A는 대문자이기에 매칭 안됨.  

                # 대소문자를 모두 포함해서 알파벳 전체와 함께 숫자 전체를 대상으로 할 때
                pattern = re.compile('[a-zA-Z0-9] ')    


                # 대상의 반대조건을 지정하고자 할 때는 [ 바로 뒤에 ^를 써서 표현
                # 문자는 알파벳, 숫자, 특수문자, whitespace(스페이스, 탭, 엔터등) 로 구성되어 있는데 
                # 여기서 whitespace를 제외한 문자들(알파벳, 숫자, 특수문자)을 대상으로 할 때는 
                pattern = re.compile[^ \t\n\r\f\v]


                # 한글만 대상으로 하고자 할 때
                pattern = re.compile('[가-힣]')

```
<br>
<h5>match 와 search 함수</h5>

  - match : 문자열 처음부터 정규식과 매칭되는 패턴을 찾아서 리턴
  - search : 문자열 전체를 검색해서 정규식과 매칭되는 패턴을 찾아서 리턴

```python
                import re
                pattern = re.compile('[a-z]+')
                
                matched = pattern.match('Dave')
                searched = pattern.search("Dave")
                
                print (matched)  # 출력값 : None  => 첫글자부터 소문자이어야 하나 대문자라 매칭되지 않음
                
                print (searched)    # 출력값 : <re.Match object; span=(1, 4), match='ave'> ==>  두번째 글자부터 소문자라 매칭

```
<br>
<h5>findall 함수<br></h5>

  - 정규표현식과 매칭되는 모든 문자열을 list 객체로 리턴함

```python
                import re
                pattern = re.compile('[a-z]+')
                findalled = pattern.findall('Game of Life in Python')
                print (findalled)
                #출력값 : ['ame', 'of', 'ife', 'in', 'ython']  ==> 대문자는 모두 제외
                
                
                pattern2 = re.compile('[A-Za-z]+')
                findalled2 = pattern2.findall('Game of Life in Python')
                print (findalled2)
                ['Game', 'of', 'Life', 'in', 'Python']  => 대소문자 모두 대상
                
                
                # findall 함수를 사용해서 정규표현식에 해당되는 문자열이 있는지 없는지 확인하기
                import re
                pattern = re.compile('[a-z]+')    ==> 소문자만 대상
                findalled = pattern.findall('GAME')  ==> 대상이 없어 -1 반환
                if len(findalled) > 0:
                    print ("정규표현식에 맞는 문자열이 존재함")
                else:
                    print ("정규표현식에 맞는 문자열이 존재하지 않음")
                    
                #출력값 : 정규표현식에 맞는 문자열이 존재하지 않음 => GAME이 모두 대문자

```
<br>
<h5>split 함수<br></h5>

  - 찾은 정규표현식 패턴 문자열을 기준으로 문자열을 분리

```python
                import re
                pattern2 = re.compile(':')
                splited = pattern2.split('python:java')
                print (splited)
                #출력값 : ['python', 'java']  ==> :를 기준으로 분리              
                
                pattern3 = re.compile(' [A-Z]{2} ') ==> 연속된 두개의 대문자가 대상
                splited = pattern3.split('python VS java') ==> 연속된 두개의 대문자를 기준으로 자르기
                print (splited)
                #출력값 : ['python', 'java'] 
                
```
<br>
<h5>sub 함수<br></h5>

  - 정규표현식 패턴 문자열을 다른 문자열로 변경

```python
                import re
                pattern2 = re.compile('-')
                subed = pattern2.sub('*', '111111-2222222')  # sub(바꿀문자열, 본래문자열)
                print (subed)
                #출력값 : 111111*222222  ==> -를 *로 변경              
                                
                subed = re.sub('-', '*', '111111-2222222')  # sub(정규표현식, 바꿀문자열, 본래문자열)
                print (subed)
                #출력값 : 111111*2222222
                
```

<br>

```python
                # 주민번호 뒷자리를 *로 바꾸기
                import re                               
                subed = re.sub('-[0-9]{7}', '-*******', '111111-2222222')
                # 하이픈(-)으로 시작하고 숫자 7개가 연속인 패턴을 대상으로 -*******으로 바꾼다.
                print (subed)
                #출력값 : 111111-*******
                
```