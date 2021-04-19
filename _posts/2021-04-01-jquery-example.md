---
title: "Jquery Selector"
date: 2021-04-19 12:00:00 +0900
categories: jquery
comments: true
---


[참조 : Jquery Api Documentation](https://api.jquery.com/)

## Selector
* element를 선택하는 인자

### # id
* id가 test인 element중 첫번째 element

```javascript
$('#test');
```

### . class
* class가 test인 모든 element

```javascript
$('.test');
```

### [] attribute
* attribute명이 name이고 attribute value가 test인 모든 element

```javascript
$('[name=test]');
```

### html tag
* html 태그가 input, tr인 모든 element

```javascript
$('input');
$('tr');
```
* input 태그중 type이 text인 모든 element

```javascript
$('input[type=text]');
```

### contains
* name에 test가 포함된 element
> 1-test-1, 2-test-2 ...

```javascript
$('[name*="test"]');
```

### startswith
* name이 test로 시작하는 element
> test-1, test-2 ...

```javascript
$('[name|="test"]');
```

### endswith
* name이 test로 끝나는 element
> 1-test, 2-test ...

```javascript
$('[name$="test"]');
```