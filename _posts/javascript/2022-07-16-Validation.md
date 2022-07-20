---

layout: single
title: "Validation Check"
categories: "Javascript"
tag: [validation]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
date: 2022-07-16
last_modified_at: 2022-07-16

---







실제 업무에서 Validation Check는 필수이다. 실제로 개발하면서 수없는 비지니스 로직이 따르는데, 거기엔 항상 ‘그’가 존재한다. 바로 ‘Validation’ 프론트 개발자라면 그냥 지나쳐선 절대로 안되는 필수로직이기 때문에 클린코드 부분에서 많은 생각을 할 수 밖에없다.

1. Validation 함수는 정말로 그 정의에 맞게 활용
2. return은 Data가 아니라 Boolean Type

위의 주제 3개가 오늘 작성할 주제들이다.



## Validation 함수는 정말로 그 정의에 맞게 활용 🙏

```jsx
 getInputValidation(e) {
      const { name, value, maxLength } = e.target
      if (name === 'price') {
        e.target.value = value
          .replace(/[^0-9]/g, '')
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.params.paneltyAmt = +e.target.value.replace(/[^0-9]/g, '')
      }
      if (name === 'memo') {
        this.textValue = value.length
      }
      if (value.length > maxLength) {
        return e.target.value.slice(0, maxLength)
      }
    },
```

대략적인 로직이 위와 같을때, getInputValidation 함수안에 Validation Check 로직이 3개나 있습니다. 3개밖에 없더라도 벌써부터 가독성이 떨어지고 각각의 로직이 다른사람이 봤을 때 어떤상황에서 사용되는 Validation인지 분석하기 힘들 수있습니다.

물론 위의 코드는 3개에서 그쳐서 금방 이해할 수 도 있겠지만 실제 10개이상만 되더라도 상당히 난해한 함수가 될 수 있습니다. ‘getInputValidation’라는 함수의 정의된 의미가 명확하지 않게 됩니다. 말 그대로 Input을 입력할때 Check하는 함수인데 안에는 가격, 메모, 문자길이제한 등등이 포함되있습나다. 그리고 이러한 로직은 많이 사용되므로 공통함수로 사용하는 것이 좋습니다.

```jsx
 getInputValidation(e) {
      const { name, value, maxLength } = e.target
      priceCheck(name)
      memoCheck(name)
      maxLengthCheck(maxLength)
 }
```

이렇게 각각 함수를 만들어서 사용한다면 보다 가독성이 좋고 함수를 여러번 재사용 할 수 있습니다. 그리고 `getInputValidation` 함수의 의미도 명확하게 보입니다. 사실 제일중요 한 부분은 Validation을 최종적으로 실행하는 함수는 각각의 함수들의 Validation Check만 해야합니다.

## return은 Data가 아니라 Boolean Type

위의 코드에서 하나 더 문제점이 있습니다. 바로 return 즉, 반환되는 값이 Boolean Type이 아니라는 점입니다. 이는 로직상의 복잡성을 높여 유지보수 측면에서 어려움을 겪을 수 있습니다. 물론 본인이 작성한 코드는 의미를 수월하게 파악할 수 있지만 다른사람이 코드를 본다면 return 값들을 하나씩 찾아봐야 하기때문입니다. 그게 또 수십개라면 문제는 커지겠죠

하지만 return이 단순히 Boolean Type으로 되어있다면 true / false로 만 비교하기때문에 보다 더 쉽게 로직파악을 할 수있습니다. 본래 Validation은 Check 할 때 맞다 / 아니다 의 의미만 파악하면 됩니다.

```jsx
const validation = () => {
  return false;
};
const postItem = () => {
  if (!validation()) return;
  console.log('hi');
};

postItem();
```

위의 코드는 어떤 아이템을 등록하기전에 Validation Check를 하는 로직입니다. validation의 반환이 false이므로 더이상 콘솔함수가 실행되지않습니다. 이런식으로 Boolean Type으로 작성하면 간단하게 로직구현이 가능합니다.

## 한 걸음 더 나아가기

```jsx
let a = '';
let b = 'c';
a || b;

// 결과 : c
```

본격적으로 코드를 설명하기전에 간단하게 알아가야하는 로직이 있습니다. 바로 OR입니다. OR는 a의 값이 false일때 b를 실행합니다. 이를 활용하여 효과적인 Validation을 작성 할 수 있습니다.

```jsx
const check1 = () => {
  console.log('check1')
   return true
}

const check2 = () => {
  console.log('check2')
   return true
}

const check3 = () => {
  console.log('check3')
  return false
}

const check4 = () => {
  console.log('check4')
   return true
}


const validation = () => {

  return !(!check1() || !check2() || !check3() || !check4())
}


const postItem = () => {
   if(!validation()) return
  console.log('hi')
}

postItem()

결과 )

'check1'

'check2'

'check3'
```

위의 코드를 보면 제가 위의 주제들을 모두 만족하는 코드임을 알 수 있습니다.

최종적으로 Validation을 Check하는 함수 validation은 함수의 validation만 체크하고 있으며, 각각의 check함수들은 return 값으로 Boolean Type을 주고있습니다. 그렇기 때문에 보다 더 가독성이 좋고 간결해짐을 알 수 있습니다.

check1의 return 값이 true이므로 false가되어 check2가 실행되고 그런방식으로 check3 함수까지 실행되다가 true가되어 더이상 check4는 실행되지않습니다.

즉 실질적으로 check하다가 오류가난 함수가 있으면 그 다음은 자동적으로 실행하지 않게 되는겁니다. 그리고 최종적으로 postItem에서 validation함수의 리턴값이 false이면 return이 되어 더이상 등록을 실행하지 않도록 막아주고 있습니다.

실제로 이러한 방식으로 현업에서 개발하여 도움이 많이되었습니다.