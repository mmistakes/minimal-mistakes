---
layout: single
title: "JavaScript의 데이터 타입"
categories: javascript
tag: [javascript]
toc: true
toc_label: "포스트 목차"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---
JavaScript의 기본이라 할 수 있는  
변수 선언 <span>var, let, const</span>의 차이점과  
Datatype에 대하여 알아보도록 하겠다.  
<br>

# 변수 선언  
<br>

## var 선언  
<br>

```javascript
console.log(varHoisting);           // 오류가 발생하지 않음. 정의되지 않은 변수라고 출력된다. (var hoisting)
varHoisting = "varHoistingEx";      // 선언되지 않은 상태임에도, 값이 저장된다. 
console.log(varHoisting);           // 변수라고 선언되지 않았지만, 출력 가능하다.
var varHoisting;
```  
var 선언은 ES6 이전에 사용되던 변수 선언 방식이다.  
var의 개선안인 let이 등장한 이후로는  
사용될 필요가 없는 방식으로,  
기존의 변수 선언방식을 무시한다는 특징이 있다.  
무슨 말인가 하면,  
다른 모든 언어들에서는 변수를 선언할 때,  
선언 -> 값 하달 -> 출력의 방식을 따른다.  
위 방식을 무시하게 되면,  
프로그램이 실행되지 않고 오류가 발생한다.  
하지만 var선언에서는 위 순서를 무시하고  
순서를 뒤죽박죽으로 만들어도 오류가 발생하지 않는다.  
<small>*물론, 당연히 정상작동 하지는 않는다.*</small>  
위 에시와 같이, 문법적인 순서를 무시하고  
코드를 작성했음에도 나중에 선언된 변수를  
먼저 작성된 코드가 사용하는 것을  
<span>var hoisting</span> 이라고 한다.  
이러한 문법적인 오류를 가볍게 생각 할 수도 있지만,  
코드가 복잡해지고 사용하는 인원이 많아짐에 따라  
예상치 못한 시점에서 변수의 값이 변형되는 등  
어떠한 오류가 발생하게 될지 예측하기가 어렵다.  
또한, 단점을 고친 let이 존재하는데  
굳이 사용할 이유 또한 없다.  
<small>*var는 Block Scope또한 무시한다.*</small>  
<br>

## let 선언 (ES6 이후)  
<br>

```javascript
let varLet;
```  
위에서 설명한 대로, var의 개선된 방식으로  
대부분의 경우에 사용되는 방식이다.  
var 방식보다 논리적, 문법적으로 개선되었다.  
Block Scope에 영항을 받아  
구분지어 사용할 수 도 있다.  
<br>

## const 선언 (ES6 이후)  
<br>

```javascript
const varConst;
```  
const로 한번 선언된 변수는,  
그 값을 변경할 수 없다.    
만약 누군가 악의적으로 내가 짠  
프로그램을 망가뜨리려고 할 때,  
const로 선언된 변수들은 보호받을 것이다.
<br>

## Block Scope  
<br>

```javascript
let globalName = `globalName`;
{
  let justName = `justName`;
  console.log(justName);
  console.log(globalName);
}
console.log(justName);
console.log(globalName);
```  
변수를 선언할 때,  
{} 기호를 이용하여 Block Scope를  
이용할 수 도 있다.  
Block Scope 바깥에서 선언된 변수는  
글로벌 변수로써, 언제 어디서든 사용 가능하지만  
메모리를 항상 차지하고 있다는 단점이 있다.  
적절히 Bolck Scope를 사용해 줌으로써  
메모리를 절약할 수 있다.  
<br>
<hr>
<br>

# 변수 타입  
<br>

## primitive type
<br>

primitive 타입은 변수가  
정의되는 가장 기본 단위로써,  
number, string, boolean, null, undefined ... 등이 있다.  
변수의 가장 기본적인 정체성으로써,  
primitive 타입보다 더 세분화시켜 정의할 수는 없다.  
여기서 우리는 의문이 든다.  
위에서 설명했듯이, 자바스크립트에서는  
number, String, boolean등을  
따로 선언해주지 않고 <span>let</span>만으로  
모든 변수를 선언한다.  
이 것이 자바스크립트의 큰 특징으로,  
<span>
javaScript는 let으로 선언해 놓으면  
할당된 값에 따라 데이터 타입이 적용된다.  
</span>
위와 같은 특징 덕분에, 자바스크립트는  
flexible한(유연한) 언어라고 불린다.  
<br>

## object type  
<br>
object 타입은 primitive 타입처럼 기본 단위들을  
여러개 묶어놓은 데이터 타입이다.
javaScript 에서는 function 또한 
object 데이터 타입중 하나이다. 이를 이용하여  
function안에서 데이터를 수정, 추가하여  
return해주는 방식으로 사용 가능하다.  



