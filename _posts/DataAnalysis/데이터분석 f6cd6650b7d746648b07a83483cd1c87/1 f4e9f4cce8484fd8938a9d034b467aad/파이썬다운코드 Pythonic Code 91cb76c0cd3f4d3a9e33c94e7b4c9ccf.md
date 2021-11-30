# 파이썬다운코드 Pythonic Code

- 왜 파이썬인가?
    
    ```python
    !python -c 'import this'
    
    The Zen of Python, by Tim Peters
    
    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea. 
    Namespaces are one honking great idea -- let's do more of those!
    
    파이썬의 철학
    
    **명확한 코드는 암시적인 코드보다 낫다.**
    **단순한 코드가 복잡한 코드보다 낫다.**
    복잡한 코드가 난해한 코드보다 낫다.
    단조로운 코드가 복잡한 코드보다 낫다.
    읽기 쉬운 코드는 읽기 어려운 코드보다 낫다.
    **가독성은 중요하다.**
    규칙을 깰 정도로 특별한 경우란 없다.
    하지만 실용성은 이상을 능가한다.
    에러를 결코 조용히 넘어가지 않도록 한다.
    명시적으로 조용히 넘어가라고 하더라도 조용히 넘어가지 않는다.
    모호한 코드를 대면할 때마다 추측하고 싶은 유혹을 거절하라.
    문제를 해결할 단 하나의 명확하고 바람직한 방법이 있을 것이다.
    하지만 처음에 코딩을 할 때는 잘 모를 수 있기에 코드의 동작 방법을 정확히 알지 못할 수 있다.
    아무것도 안 하는 것보다 지금 하는 게 낫다.
    하지만 아무것도 하지 않는 것이 지금 당장 하는 것보다 나을 수도 있다.
    설명하기 어려운 구현이라면 좋은 아이디어는 아니다.
    쉽게 설명할 수 있는 구현이라면 좋은 아이디어일 것이다.
    네임스페이스는 매우 훌륭한 아이디어이다. 많이 사용하자
    ```
    
    - 문법이 간단
    - 교육용 언어로도 적합하고 실제 활용도 활발함
    - 다양한 분야에 접목 가능
    - 다양한 패키지가 제공됨 (블록 조립하듯 간단하게 코드를 작성할 수 있음)
    - 각 분야에 필요한 방대한 라이브러리를 보유
    - 데이터분석에 관련한 텐서플로우(TensorFlow), 파이토치(PyTorch), 체이너(Chainer), 아파치 MXNet(Apache MXNet), 테아노(Theano) 등 거의 모든 프로젝트에서 파이썬을 가장 우선시한다.
    - 최신의 알고리즘을 많은 연구자들이 Python으로 배포하고 있다

## 1. PEP8

파이썬에는 **pep8**이라는 코드 스타일 가이드가 있습니다. 대부분의 개발자가 이 코드 스타일을 따릅니다.

- [Pep Code Layout](https://pep8.org/#code-lay-out)
    - Whitespace
        
        가. 들여쓰기는 4칸이 기본 - 가독성은 중요하다
        
        나. Tab or Space
        
        - 스페이스를 사용하는 것이 권장됩니다. 하나의 프로젝트에 탭과 스페이스를 섞어서 쓰는 일은 피해야 합니다.
        
        ![Untitled](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8A%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%20Pythonic%20Code%2091cb76c0cd3f4d3a9e33c94e7b4c9ccf/Untitled.png)
        
        다. 한 줄의 코드 길이가 **79자 이하**여야 합니다.
        
        - 코드가 길어지는 경우 백슬러시(\)를 이용해서 줄바꿈을 하면 됩니다.
        
        ```
        with open('/path/to/some/file/you/want/to/read') as file_1, \
             open('/path/to/some/file/being/written', 'w') as file_2:
            file_2.write(file_1.read())
        ```
        
        - 특별히 연산자들로 인해 길게 늘어지는 경우, 연산자 이전에 줄바꿈하는 것이 좋습니다.
        
        ```python
        income = (gross_wages 
                  + taxable_interest
                  + (dividends - qualified_dividends)
                  - ira_deduction
                  - student_loan_interest)
        ```
        
        라. 함수와 클래스는 다른 코드와 **빈 줄 두개**로 구분합니다.
        
        ```
        class a():
            pass
        # 빈줄
        # 빈줄
        class b():
            pass
        # 빈줄
        # 빈줄
        def c():
            pass
        # 빈줄
        # 빈줄
        
        ```
        
        마. 클래스에서 함수는 빈 줄 하나로 구분합니다.
        
        ```
        class a():
        
            def b():
                pass
        
            def c():
                pass
        ```
        
    - 이름 규칙
        
        가. 변수명 앞에 **_(밑줄)**이 붙으면 함수 등의 내부에서만 사용되는 변수를 일컫습니다.
        
        ```python
        _my_list = []
        ```
        
        나. 변수명 뒤에 **_(밑줄)**이 붙으면 라이브러리 혹은 파이썬 기본 키워드와의 충돌을 피하고 싶을 때 사용합니다.
        
        ```python
        import_ = "not_import"
        ```
        
        다. 모듈(Module)명은 짧은 소문자로 구성되며, 필요하다면 밑줄로 나눕니다.
        
        ```
        my_module.py
        ```
        
        라. 클래스명은 **파스칼 케이스(Pascal Case) 컨벤션***으로 작성합니다.
        
        ```python
        class MyClass():
            pass
        ```
        
        마. 함수명은 소문자로 구성하되 필요하면 밑줄로 나눕니다.
        
        ```python
        def my_function():
            pass
        ```
        
        - 네이밍 컨벤션* (Naming Convention)
            
            통일성을 갖기 위해서는 사람들이 공유하는 코딩 스타일 가이드를 가지고 있는 것이 좋습니다.
            
            - **snake_case**
                - 모든 공백을 “_“로 바꾸고 모든 단어는 소문자입니다.
                - 파이썬에서는 함수, 변수 등을 명명할 때 사용합니다.
                - ex) this_is_snake_case
            - **PascalCase**
                - 모든 단어가 대문자로 시작합니다.
                - UpperCamelCase, CapWords라고도 불립니다.
                - 파이썬에서는 클래스를 명명할 때 사용합니다.
                - ex) ThisIsPascalCase
            - **camelCase**
                - 처음은 소문자로 시작하고 이후 모든 단어의 첫 글자는 대문자로 합니다.
                - 파이썬에서는 거의 사용하지 않습니다. (java 등에서 사용)
                - ex) thisCamelCase
- List Comprehension
    
    <aside>
    💡 리스트를 쉽게, 짧게 한 줄로 만들 수 있는 파이썬의 문법
    
    [ ( 변수를 활용한 값 ) for ( 사용할 변수 이름 ) in ( 순회할 수 있는 값 )]
    
    </aside>
    
    - 기존 List를 사용하여 간단히 다른 List를 만드는 기법
    - 포괄적인 List, 포함되는 리스트라는 의미로 사용됨
    - 파이썬에서 가장 많이 사용되는 기법 중 하나
    - 일반적으로 for + append 보다 속도가 빠름
- Enumerate & Zip
    - Enumerate
    - List의 element를 추출할 때 번호를 붙여서 추출
    - Zip
    - 두 개의 list의 값을 병렬적으로 추출함
- Lambda
    - 함수 이름 없이, 함수처럼 쓸 수 있는 익명함수
- Map
    - Sequence 자료형 각 element에 동일한 function을 적용함
    - 실행시점에 값을 생성하므로, 메모리 효율적
- Collection
    
    <aside>
    💡 TDM(Term Document Matrix)
    전처리된 데이터에서 각 문서와 단어 간의 사용 여부를 이용해 만든 매트릭스. 등장한 단어의 빈도수를 알 수 있다.
    
    </aside>
    
- [https://docs.google.com/spreadsheets/d/1VnXlGwC_2V1ayrFwr8IUwu54ovbciOsWPH20cjOqjVk/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1VnXlGwC_2V1ayrFwr8IUwu54ovbciOsWPH20cjOqjVk/edit?usp=sharing)