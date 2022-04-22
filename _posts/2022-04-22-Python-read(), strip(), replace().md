---
layout: single
title:  "[파이썬(Python)] 문자열 함수: read(), strip(), replace()"
categories: Python
tag: [Python, 파이썬, read(), strip(), replace()]
toc: true
toc_sticky: true
toc_label: '페이지 주요 목자'
author_profile: false
sidebar:
    nav: "docs"
---


## 1) read() 함수

open() 함수를 사용해 데이터를 가져와서 내용을 확인해 보자. 실제 데이터의 내용이 아닌 파일에 대한 정보를 보여준다.


```python
f_input = 'C:\\Users\\junho\\Desktop\\chr21.hg19.axt'
fp = open(f_input)
print(fp)
```

    <_io.TextIOWrapper name='C:\\Users\\junho\\Desktop\\chr21.hg19.axt' mode='r' encoding='cp949'>
    

readlines() 함수를 사용하면, 이전에 배웠듯이 각 라인이 하나의 원소로 있는 리스트를 생성한다. read() 함수를 사용해서 라인을 구분하지 않고 내용을 한꺼번에 연결해서 표현한다.


```python
fp.read()
```




    '0 chr21 9411632 9413256 chr2 123816456 123817914 + 22905\ntctctgagctaccattttcttcttagctatctgctcagcaaatgtatccaaatgaaaggctgtggagaatgttgaaatcacttcaatgtgt\nttctcttctttctgggagcttacacactcaagttctggatgctttgattgctatcagaagcc-----gttaaatagctacttatttttaat\ntaattttacccagctttcataattgttcttgccaggtgggatggcctgatacaaattaacttgtcatagctagaattagaagAGGAAAACT\nTTAAATAGCATTGAGTTATCAGTACTTTCATGTCTTGATACATTTCTTCTTGAAAATGTTCATGCTTGCTGATTTGTCTGTTTGTTGAGAG\nGAGAATGTTCAGAATTTTATATC----TTCAACA-------TCTTTTTCTTCATTAATAAGATACTGAGATTTTATAACTCTTGTCATTTT\nGGTCACTTATATTTTCATATGGAAATATCGTATAATCCAGGGTTTCCAATATATTTGTGTAAAATTAAGAAAATTATCTTATCTAATAACT\nTGATCAATATCTGTGATTATAT------TTTCATTGCCTTCCAATTTTAATATTTGTTCTCTATTCCTTCTTAATCTGGATTGAAGTTCTG\nATTAATTATTTTAATGTTGCAA\n\n'



## 2) strip() 함수
만약 내가 필요한 데이터는 abcdefg로 이루어진 데이터라고 하자. 그러면 \n 즉 엔터에 해당되는 특수 기호를 삭제하고, 맨 앞에 header를 없애줘야 한다. 

여기서 strip() 함수를 적용해 보자.


```python
'\nabcdefg   '.strip()
```




    'abcdefg'



strip() 함수는 주어진 문자열에서 양쪽 끝에 있는 공백과 \n 기호를 삭제시켜 준다.

하지만, 여기서 주의할 점은 strip() 함수는 문자열의 양 끝에 존재하는 공백과 \n을 제거해 주는 것이지 중간에 존재하는 것은 제거해 주지 않는다.


```python
fp = open(f_input)
fp.read().strip()
```




    '0 chr21 9411632 9413256 chr2 123816456 123817914 + 22905\ntctctgagctaccattttcttcttagctatctgctcagcaaatgtatccaaatgaaaggctgtggagaatgttgaaatcacttcaatgtgt\nttctcttctttctgggagcttacacactcaagttctggatgctttgattgctatcagaagcc-----gttaaatagctacttatttttaat\ntaattttacccagctttcataattgttcttgccaggtgggatggcctgatacaaattaacttgtcatagctagaattagaagAGGAAAACT\nTTAAATAGCATTGAGTTATCAGTACTTTCATGTCTTGATACATTTCTTCTTGAAAATGTTCATGCTTGCTGATTTGTCTGTTTGTTGAGAG\nGAGAATGTTCAGAATTTTATATC----TTCAACA-------TCTTTTTCTTCATTAATAAGATACTGAGATTTTATAACTCTTGTCATTTT\nGGTCACTTATATTTTCATATGGAAATATCGTATAATCCAGGGTTTCCAATATATTTGTGTAAAATTAAGAAAATTATCTTATCTAATAACT\nTGATCAATATCTGTGATTATAT------TTTCATTGCCTTCCAATTTTAATATTTGTTCTCTATTCCTTCTTAATCTGGATTGAAGTTCTG\nATTAATTATTTTAATGTTGCAA'



## 3) replace() 함수

replace() 함수에 첫 번째 인자를 두 번째 인자로 대체해야 한다. 첫 번째를 header의 문자열을 그대로 입력하고 '' 두 번째로 입력해 없앤다. 똑같은 방법으로 \n을 제거한다.

주의할 점은 순서가 중요하다. 앞에 있는 함수를 먼저 사용하고 그 결과를 다음 함수에서 적용하여 사용한다.


```python
fp = open(f_input)
fp.read().replace('0 chr21 9411632 9413256 chr2 123816456 123817914 + 22905\n', '').replace('\n', '')
```




    'tctctgagctaccattttcttcttagctatctgctcagcaaatgtatccaaatgaaaggctgtggagaatgttgaaatcacttcaatgtgtttctcttctttctgggagcttacacactcaagttctggatgctttgattgctatcagaagcc-----gttaaatagctacttatttttaattaattttacccagctttcataattgttcttgccaggtgggatggcctgatacaaattaacttgtcatagctagaattagaagAGGAAAACTTTAAATAGCATTGAGTTATCAGTACTTTCATGTCTTGATACATTTCTTCTTGAAAATGTTCATGCTTGCTGATTTGTCTGTTTGTTGAGAGGAGAATGTTCAGAATTTTATATC----TTCAACA-------TCTTTTTCTTCATTAATAAGATACTGAGATTTTATAACTCTTGTCATTTTGGTCACTTATATTTTCATATGGAAATATCGTATAATCCAGGGTTTCCAATATATTTGTGTAAAATTAAGAAAATTATCTTATCTAATAACTTGATCAATATCTGTGATTATAT------TTTCATTGCCTTCCAATTTTAATATTTGTTCTCTATTCCTTCTTAATCTGGATTGAAGTTCTGATTAATTATTTTAATGTTGCAA'
