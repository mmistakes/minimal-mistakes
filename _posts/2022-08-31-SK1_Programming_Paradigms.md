---
layout: single  
title: "[따라하는 함수형 프로그래밍] 프로그래밍 패러다임"
author: ksron
toc: true
toc_sticky: true
---

## - 따라하는 함수형 프로그래밍-
{: .text-center}
<div align="center"><font size="5">프로그래밍 패러다임</font></div>

> [An Introduction to Programming Paradigms](https://digitalfellows.commons.gc.cuny.edu/2018/03/12/an-introduction-to-programming-paradigms/) 변역 및 참고하여 작성

## 들어가며

> **“I have only made this letter longer because I have not had the time to make it shorter.”**
>
> "내가 이런 긴 편지를 적은건, 더 짧게 할 시간이 없었기 때문이다."
>
> \- 블레즈 파스칼
{: .notice}

계산기의 발명자이자 수학자, 철학자,물리학자였던 파스칼은 복잡한 내용을 간결하고 잘 전달될 수 있도록 편지를 적는건 시간이 많이 드는 것이라고 말했다.

이를 코드 작성으로 빗대보면 어떨까.

개발자는 현실의 문제를 해결하기 위해 프로그램을 작성한다.
이 때 풀고자 하는 문제를 깊게 이해하고 있지 않으면 작성한 코드는 뒤죽박죽이 되어버리는 떡진 쫄면과 같이 되어버린다.
따라서 개발자는 시간과 노력을 투자해서 문제를 이해하고 어떠한 방식으로 접근해야 하는지 고민해야 코드를 간단하고 우아하게 작성할 수 있다.
따라서 파스칼의 말을 다음과 같이 적용할 수 있겠다.

> **"내가 긴 코드를 적은건, 더 짧게 시간이 없었기 때문이다"***
>
> \- 지나가던 전산학도
{: .notice}

보통 프로그램을 "건물"에 비유하기도 한다. 건물을 건설("빌드")하는 것 처럼, 개발자들은 프로그램을 "빌드"한다.
건물을 짓는 것과 프로그램을 작성하는 것은 차근차근 필요 요소를 구성하여 하나의 큰 결과물을 만든다는 부분에서는 비슷하지만,
현실의 물리적인 제약을 받는 건물과는 다르게 프로그램은 개발자의 머리 속에 있는 논리를 풀어내는 순수 추상물에 더 가깝다.
(개발 환경에 제한되기도 하지만...)
이러한 추상적인 결과물의 그 복잡한 논리를 풀기 위한 접근 방법이 바로 "**프로그래밍 패러다임**"이다.

## 프로그래밍 패러다임

**프로그래밍 패러다임**은 코드, 프로그램을 작성하는 **철학**이며 코드 **작성법**이자 코드를 구성하는 특정 방식을 의미한다.
대부분의 경우 사람들은 구체적으로 어떤 패러다임을 선택하여 사용한다기 보다는,
어떠한 코딩 언어에 내포되어 있는 패러다임의 철학을 통해 프로그램을 구현할 수 있도록 한다.

잘 와닿지 않는다면 주요 패러다임을 몇 개를 비교하면 조금 도움이 될 것이다.
이번 글에서는 3가지 주요 프로그래밍 패러다임에 대해 간단히 소개하고자 한다.

- 명령형(Imperative) 프로그래밍
- 함수형(Functional) 프로그래밍
- 객체지향(Object-Oriented) 프로그래밍

{% include figure image_path="/assets/images/functional_programming_1_paradigm_1.jpeg" caption="주요 프로그래밍 패러다임" %}

---

### 1. 명령형(Imperative) 프로그래밍

아마도 지금 이 글을 읽는 사람이라면 어느 정도 컴퓨터에 대한 지식이나 간단한 코딩 정도는 해본 사람일 것이다.
많은 경우 코딩의 첫 시작은 C나 파이썬으로 시작한다.
그렇다면 이미 '명령형 프로그래밍' 패러다임은 다뤄본 셈이다.

**명령형 프로그래밍**은 어떤 문제를 해결하기 순차적으로 프로그램 상태에 대한 조작 명령을 한다.
무슨 말인지 잘 모르겠다면, 요리 레시피를 생각해보면 된다.

'볶음밥' 만드는 법을 찾았다고 가정하자.
아마 아래와 같은 형태로 적혀있을 것이다. (맛은 보장 못한다)

```txt
1. 양파, 감자, 각종 야채를 잘게 썬다.
2. 팬에 기름을 두르고, 불을 켠다.
3. 열이 올랐을 때, 손질한 야채를 잘 안 익는 순으로 넣는다.
4. 소금, 후추를 넣고, 취향에 따라 굴소스를 넣는다.
5. 불을 약하게 줄이고 밥을 넣어 풀어준다.
6. 적당히 섞이면 센 불에 가볍게 볶아 마무리한다.
```
{: .notice--info}

이 요리법에서는 "볶음밥"이라는 결과물을 만들기 위해, 단계별로 수행해야 하는 '**명령**'을 나열하였다.
마찬가지로, 명령형 프로그래밍에서는 컴퓨터가 개발자가 원하는 결과물을 생성하기 위해 수행되어야 하는 '명령'을 나열한다.
그러한 명령은 대게 프로그램의 상태를 조작하는 것이다.
변수에 값을 저장하거나 교체하는 형태로 말이다.

명령형 프로그래밍은 아주 직관적인 방법으로 순차적으로 수행해야 되는 명령을 작성하여 작은 문제를 풀기 적합한 방식을 보여준다.
다만, 프로그램 사이즈가 커지면 커질수록 명령형 프로그래밍의 복잡성은 점차 커지고 다루기 힘들어진다.

#### 명령형 프로그래밍 장단점

- 장점: 효율적이며, 기계가 실제 작업을 수행하는 것과 유사하게 동작한다. 인기가 많다.
- 단점: side effect(부작용)[^side_effect]이 발생하여 디버깅이 힘들거나, 순차가 정확해야 하고, 추상화가 힘들다.

### 3. 함수형(Functional) 프로그래밍

함수형 프로그래밍은 앞서 설명한 '명령형 프로그래밍'의 반대부인 '선언형 프로그래밍'의 한 형태로, 프로그램 상태를 직접적으로 조작하는 것을 피한다.

그럼 프로그래밍을 어떻게 하는지 궁금할 것이다.

함수형 프로그래밍에서는 어떠한 값 조차 하나의 함수로 취급하여, 값을 여러 함수를 통해 변화시키면서 원하는 결과를 달성한다.
예를 들면, 리스트의 각 요소마다 특정 작업을 수행해야 할 때, 함수형 프로그래밍에서는 이를 두 개의 함수의 결합으로 작성할 수 있다.
리스트의 각 요소를 순차적으로 탐색하는 함수와 각 요소에 대해 반복적으로 작업을 수행하는 함수를 결합하면 각 요소에 대해 작업을 수행하는 하나의 함수처럼 된다.

이러한 프로그래밍 패러다임은 조금 더 수학적인 정의를 통해 동일한 입력에 동일한 결과를 출력하여
예상 가능하지 못한 결과를 최대한 없애고 함수에 대한 정의를 통해 모듈화를 달성하여 프로그램을 간결하게 작성할 수 있도록 한다.

#### 함수형 프로그래밍 장단점

- 장점: 높은 추상화를 통해 오류의 가능성을 줄여준다. 독립적인 모듈 구성. 병렬 실행 가능성. 수학적인 증명이 가능하여 동작의 엄밀성 제공
- 단점: 다소 비효율적, 절차적으로 수행해야 하는 부분은 명령형 또는 객체지향 프로그래밍보다 다루기 힘듦

### 2. 객체지향(Object-Oriented) 프로그래밍

아마 가장 인기 있는 프로그래밍 패러다임을 선택하라고 하면 '객체지향 프로그래밍'을 말할 것이다.
객체지향 프로그래밍은 현실 세계의 상태를 하나의 객체로 표현하고 그 객체의 동작(메소드)과 상태(속성)를 변화시켜가며 목적을 달성한다.
명령형 프로그래밍의 하나의 상태를 개별적으로 다뤘던 것에 비해, 객체지향 프로그래밍에서는 객체라는 묶음으로 프로그램 동작과 상태를 구별한다.

---

간단히 주요 세가지 프로그래밍 패러다임에 대해 살펴봤다.
하지만 여전히 "_아니, 그래서 패러다임이 대충은 뭔지 아는데 구체적으로 어떻게 다른건데? 실제 예제 좀 보면 안되나?_"
하는 생각이 들 수 있다.
그래서 다음 장에서는 간단한 프로그램을 통해 이 세 프로그램밍 패러다임의 차이점을 더 확인해보려고 한다.

## 예제 문제

약간의 몰입성을 위해 다음과 같이 상상해보자.
코딩에 대해 어느 정도 알았다고 자부하며 자신을 평가하기 위해 자신만만하게 코딩 테스트 시험장에 들어섰다.
그리고 다 준비가 되었을 무렵 시험 시작 타이머가 시작되고, 다음과 같은 문제가 등장했다.

> **문자열로 구성된 문단이 주어졌을 때, 다음과 같은 기본 분석을 하는 기능을 작성하시오.**
>
> 1. 문단 내의 단어 세기
> 2. 특정 단어의 반복 횟수 세기
> 3. 특정 문자로 시작하는 단어와 매치되는 단어의 수 세기
{: .notice--success}

### 명령형 프로그래밍의 답안

위 문제를 파이썬으로 구현해보자.
앞서 설명했듯이 명령형 프로그래밍은 어떠한 명령의 순차적인 수행으로 문제를 해결한다.
이번 문제에서는 어떠한 문자열로 구성된 문단에 대한 처리를 가장 먼저 할 수 있다.
일반적으로는 어떠한 파일이나 외부로부터 문자열을 받겠지만, 여기에서는 간단히 문자열을 정의하자.

```txt
original_text = “I have only made this letter longer, because I have not had the time to make it shorter.”
```

세 가지 기능을 구현하기 위해 우선 공통적인 작업을 처리한다.
불필요한 문자(',', '.')를 없애고 분석하기 편하게 전부 소문자로 바꾼 다음 단어마다 리스트에 저장한다.

```python
unwanted_characters = [',', '.']

for character in original_text:
    if character not in unwanted_characters:
        string_without_punctuation += character

string_lower_case = string_without_punctuation.lower()

word_list = string_lower_case.split()
```

이제 각 기능을 간단히 구현할 수 있다.

1. 문단 내의 단어 세기

```python
word_list_length = len(word_list)
print("Total words:", word_list_length)
```

2. 특정 단어의 반복 횟수 세기

"have" 단어 수를 출력한다.

```python
word_to_search = 'have'
word_match_counter = 0

for word in word_list:
    if word == word_to_search:
        word_match_counter += 1

print('Number of occurances of word match:', word_match_counter)
```

3. 특정 문자로 시작하는 단어와 매치되는 단어의 수 세기

't'로 시작하는 단어를 출력한다.

```python
match_character = 't'
words_beginning_with_character = []

for word in word_list:
    if word[0] == match_character:
        words_beginning_with_character.append(word)

print("Words beginning with character:", words_beginning_with_character)
print("Number of words beginning with character:",
      len(words_beginning_with_character))
```

#### 문제점

위와 같이 구현한 코드의 문제점을 살펴보자.
우선 코드가 깔끔하지는 않아 어떠한 기능이 어디 있는지 구분하기 쉽지 않다.
만약 4번째 분석 문항이 존재한다면 아마 어떤 코드를 다시 쓰는 과정에서 코드의 중복이 발생할 수도 있다.
그리고 만약 프로그램을 수정하고자 한다면 한 부분만 수정하는 것이 아니라 해당 줄, 변수가 의존하고 있는 다른 부분도 수정해야 할 가능성이 높다.

### 객체지향 프로그래밍

객체지향(Object-Oriented) 프로그래밍 패러다임은 동작과 상태를 객체라는 것으로 묶어 처리한다.
객체의 상태를 속성(attribute)이라고 하고, 객체 속성에 대한 동작을 메소드(method)라고 하고,한다.

아래의 코드는 위 문제에 대해 객체 지향 패러다임으로 접근한 것이다.
`TokenManipulator` 클래스(객체)를 정의한다.
`TokenManipulator`의 속성 값은 문자열이며, 메소드는 속성 값에 대한 작업이다.

```python
class StringProcessor(object):
    def __init__(self, string):
        """StringProcessor 객체를 생성한다. 처음 객체가 생성될 때 문자열을 받는다."""
        self.string = string

    def clean(self, string):
        out_string = ''
        unwanted_character_list = ['.', ',']

        for character in string:
            if character not in unwanted_character_list:
                out_string += character

        out_string = out_string.lower()

        return out_string

    def tokenize(self):
        """문자열을 토큰 리스트로 변환하여,
        TokenManipulator 객체를 return 한다."""

        cleaned_string = self.clean(self.string)
        tokens = cleaned_string.split()
        return TokenManipulator(tokens)


class TokenManipulator(object):
    def __init__(self, tokens):
        """TokenManipulator 객체를 생성한다.
        객체가 처음 생성될 때, 토큰의 리스트를 넘긴다."""

        self.tokens = tokens


    def length(self):
        """토큰 리스트에서 토큰의 수를 반환한다."""
        return len(self.tokens)

    def count_match(self, match_string):
        """match_string과 동일한 토큰의 수를 센다"""

        word_match_counter = 0

        for word in self.tokens:
            if word == match_string:
                word_match_counter += 1

        return word_match_counter

    def match_first_character(self, match_character):
        words_beginning_with_character = []

        for word in self.tokens:
            if word[0] == match_character:
                words_beginning_with_character.append(word)

        return words_beginning_with_character
```

그리고 `TokenManipulator`를 실제로 생성하여 구동하는 코드 또한 작성한다.

```python
if __name__ == '__main__':
    original_text = "I have only made this letter longer, because I have not had the time to make it shorter."

    processor = StringProcessor(original_text)

    tokens = processor.tokenize()

    print("Total words:",
          tokens.length())

    print('Number of occurances of word match:',
          tokens.count_match('have'))

    print("Words beginning with character:",
          tokens.match_first_character('t'))

    print("Number of words beginning with character:",
          len(tokens.match_first_character('t')))
```

### 함수형 프로그래밍

함수형 프로그래밍 패러다임은 명령형 프로그래밍처럼 변수나 데이터를 조작하여 문제를 해결하는 것이 아닌,
함수를 통해 값을 변형하며 원하는 목적을 달성한다.
즉, 명령형 프로그래밍에서 데이터는 변형 가능(mutable)하고,
변수에 값을 직접적으로 조작하기 때문에 그 프로그램을 개발하는 개발자와 프로그램에게 원치 않는 결과(side effect)가 나올 수 있다.
순수 함수형 프로그래밍(pure functional programming)에서는 데이터 조차 함수로 취급하여 다룬다.

위 문제를 순수 함수형 프로그래밍 언어인 [Haskell](https://www.haskell.org)을 통해 풀어보자

```haskell
main :: IO ()
main = do
    analysis1
    analysis2
    analysis3
    analysis4

text :: String
text = "I have only made this letter longer, because I have not had the time to make it shorter."

-- 문자열 입력받아 구두 문자(',', '.', '?') 처리하는 함수
removePunc :: String -> String
removePunc xs = [ x | x <- xs, not (x `elem` ",.?!-:;\"\'") ]

{-- Analysis 1: 단어 수 세기 --}
analysis1 = putStrLn . show . length . words . removePunc $ text

{-- Anaylsis 2: 특정 단어의 반복 횟수 세기 --}
analysis2 = putStrLn . show . length . filter (=="have") . words . removePunc $ text

{-- Analysis 3-4: 특정 문자로 시작하는 단어와 매치되는 단어 수 세기 --}
textStartsWith :: [String] 
textStartsWith = filter (\x -> head x == 't') . words . removePunc $ text
analysis3 = putStrLn . show $ textStartsWith
analysis4 = putStrLn . show . length $ textStartsWith
```

각 분석마다 몇 개의 함수를 조합하여 원래 입력 받는 문자열에 변형을 가해 답을 구한다.
위 코드에서 `analysis1`은 문자열에서 구두점을 없애는 함수를 적용하고 각 단어 별로 리스트화 하여 그 갯수를 구한다. 비슷하게 `analysis2`에서는 리스트화 한 문자열을 필터 함수를 통해 조건에 맞지 않은, 여기서는 "_have_"라는 단어가 아닌 리스트 멤버를 제거하고 최종 남은 멤버의 수를 보여준다.

> **출력값**
> 
> ```txt
> 18
> 2
> ["this","the","time","to"]
> 4
> ```
{: .notice--primary}

---

## 어떤 패러다임을 선택해야 되나?

어떠한 프로그래밍 패러다임을 포함한 언어를 사용할 것인지는 순수하게 개발자의 취향과 풀고자 하는 문제에 대한 성격에 달렸다.

예를 들어, GUI 구현하려 할 때 버튼이나 텍스트 레이블 등을 객체로 취급하는 객체지향 프로그래밍 방식이 더 편하고 적합할 수 있고,
시스템 간의 메시지 전달하는 구조의 프로그램이나 데이터에 대한 변형이 주로 사용된다면 읽기 쉬운 고급 언어인 함수형 프로그래밍으로 개발할 수 있다.
그리고 조금 더 동작 환경에 최적화된 프로그램을 위해 명령형 프로그래밍 또는 절차형 프로그래밍을 사용할 수 있을 것이다.

## 마치며

이번 글에서는 다음과 같이 **프로그래밍 패러다임**에 대해 알아보았다

- 프로그래밍 패러다임의 정의와 목적
- 주요 프로그래밍 패러다임과 각 패러다임의 특성
- 코드를 통한 프로그래밍 패러다임 실제 구성 및 접근 방식
- 프로그래밍 패러다임 선택에 고려할 요소

다음 글에서는 앞서 소개한 주요 프로그래밍 패러다임 중 다소 인기가 없는 **함수형 프로그래밍**에 대해 소개하도록 하겠다.

그럼 다음 글까지 안녕.

---

- 참고 자료
  - [GeeksforGeeks - Introduction of Programming Paradigms](https://www.geeksforgeeks.org/introduction-of-programming-paradigms/)
  - [Programming Paradigms – Paradigm Examples for Beginners](https://www.freecodecamp.org/news/an-introduction-to-programming-paradigms/#what-a-programming-paradigm-is-not)
  - [Wikepedia - Programming Paradigm](https://en.wikipedia.org/wiki/Programming_paradigm)
  - [Major Programming Paradigms](https://www.cs.ucf.edu/~leavens/ComS541Fall97/hw-pages/paradigms/major.html)
  - [Learn Computer Science - Programming Paradigm](https://www.learncomputerscienceonline.com/programming-paradigm/)
	
[^side_effect]: "부작용"이라는 뜻으로, 함수 외부에서 함수 내부 상태의 값을 변경하게 되어 원래 함수가 의도된대로 동작하지 않는 현상.
