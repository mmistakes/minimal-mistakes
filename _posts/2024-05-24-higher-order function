---
layout: single
title: "코드 생산성 2배 높이기: 고차 함수"
published: true
classes: wide
category: Higher-order function
---

프론트엔드 개발은 사용자 경험을 향상시키는 데 중요한 역할을 한다.

현대의 웹 애플리케이션은 복잡하고 다양한 입력 폼과 상호 작용을 포함하며, 이를 관리하고 검증하는 것은 매우 중요하다. 이에 따라 코드의 재사용성과 에러 관리는 더욱 중요해진다. 

이 글에서는 고차 함수를 이용하여 프론트엔드 개발에서 재사용성을 높이고, Input 상태를 효과적으로 다루는 방법에 대해 살펴보자.

### **고차 함수 사용하기 전 input 상태 관리**

고차 함수를 사용하지 않고, useState로 Input의 상태를 관리하면서 입력 받은 값을 검증하는 과정을 간단히 구현하면 아래와 같을 것이다. (예시. 파일 사이즈가 1MB 이상인지 확인)

```javascript
const App = () => {
    const [fileValue, setFileValue] = React.useState("");
    const [fileSizeError, setFileError] = React.useState("");

    // 파일 용량 검사
    const isFileSizeUnder1MB = _file => { 
        const maxSizeInBytes = 1024 * 1024;
    
        return _file?.size < maxSizeInBytes
    }

		// onChange 이벤트 핸들러
    const handleChangeFile = (event) => {
        const file = event?.target?.files[0];

        if(isFileSizeUnder1MB(file)) {
            setFileValue(file);
        } else {
            setFileError("파일 용량이 1MB가 넘습니다.");
        }
    }

    return (
        <div className="container">
            <input onChange={handleChangeFile} value={fileValue} />
            <p>{fileSizeError}</p>
        </div>
    );
}

export default App;
```


위 코드를 살펴볼 때 기능상으로는 문제가 없다. 그러나 위 코드는 검증해야 할 값이 1개일 때만을 고려한 코드다. 검증해야 할 값이 더 늘어나면 어떻게 될까?

예를 들어 프로필 관리 페이지에는 이름, 전화번호, 직업, 프로필 사진과 같은 여러 가지 입력 필드가 있을 수 있다. 위와 같은 방식으로 작업을 수행한다면 중복되는 코드 양이 크게 증가하게 된다.

하지만 함수형 프로그래밍의 고차 함수를 활용하면 이러한 문제를 간단하게 해결할 수 있다.

### **고차 함수를 사용한다면**

고차 함수는 함수를 인자로 받거나 반환해 함수의 재사용성을 높이고 로직을 추상화하여 코드 중복을 효과적으로 줄일 수 있다.

이를 통해 여러 가지 입력 필드와 검증 규칙이 존재하는 상황에서도, 함수를 한 번 작성함으로써 다양한 곳에서 재사용할 수 있다. 

또한 검증 로직이 한 곳에 집중되므로 코드의 작동 방식을 더 명확하게 이해할 수 있어 가독성과 유지 보수성이 향상된다.

작업을 시작하기 전 어떤 로직이 공통으로 사용되는지를 파악해야 한다. 아래는 중복되는 흐름을 정리한 것이다.

- 사용자가 입력 필드에 값을 입력
- 입력 받은 값을 검증 함수로 검증
- 검증 결과에 따라 에러 상태 관리

그러면 고차 함수의 특징 중 하나인 파라미터로 함수를 받을 수 있다는 특성을 활용하여 검증 함수를 파라미터로 받고, 그 결과를 반환하도록 해보자.

```javascript
const validate = (validators, errMsg) => (value) => {
    const isValid = validators.every(fn => Boolean(fn(value)));

    return { 
        succeed: isValid,
        error: isValid ? '' : errMsg
    }
}
```

위 코드에서 validators는 검증 함수들이 담긴 배열이며, errMsg는 입력 값에 에러가 발생했을 때 반환할 에러 메세지다. 그리고 커링 패턴을 활용하여 2개의 파라미터를 미리 고정하고 입력 값을 나중에 받아 여러 상황에서 재사용할 수 있도록 설계하였다.

입력한 값이 검증 함수들을 통과하며 에러가 있는지 확인하는 로직을 구현했으니, 상태 관리는 React의 커스텀 훅을 이용하여 다루어 보자.


💡 추가 설명
- 커링 패턴
    - 함수를 여러 개의 함수로 분해하여 여러 상황에서 필요한 인자만 적용해 재사용성을 높인다.
- .every()
    - 배열의 모든 요소가 주어진 조건을 만족하는지 검사



### 커스텀 훅을 이용한 상태 관리

커스텀 훅의 활용은 상태 관리 및 컴포넌트 로직 분리와 같은 다양한 작업을 효율적으로 수행할 수 있어, 코드의 일관성을 유지하며 코드 중복을 최소화하는 데 도움을 준다. 이를 통해 다양한 입력 필드의 검증 값과 에러 상태를 간결하게 처리할 수 있다.


작업을 시작하기 전, 중복되는 로직을 먼저 정리해보자.

- 입력 값의 상태 관리
- 입력 값을 검증하고, 그에 대한 성공 또는 에러 상태 관리

```javascript
const useInputValid = (initValue, validators, errMsg) => {
    const [value, setValue] = useState(initValue);
    const [result, setResult] = useState({});

    useEffect(() => {
        if (value) {
            const validationResult = validate(validators, errMsg)(value);
            setResult(validationResult);
        }
    }, [value]);

    return [value, setValue, result]
}
```



위 코드 흐름을 간단하게 요약하면 아래와 같다.

```javascript
상태 초기화 -> 받아온 검증 함수를 고차 함수로 전달하고 실행 -> 반환된 결과를 업데이트 -> 화면 노출
```

지금까지 개발한 훅, 고차 함수, 그리고 적용할 검증 함수를 모두 풀어내면 아래와 같다.

```javascript
// 검증 함수
const isFileSizeUnder1MB = event => { 
    const file = event?.target?.files[0];
    const maxSizeInBytes = 1024 * 1024; // 용량이 1MB보다 작은 파일만 허용

    return file?.size < maxSizeInBytes
}

export { isFileSizeUnder1MB };
```

```javascript
// 화면
const App = () => {
  const [imgFile, setImgFile, imgFileValidator] = useInputValid('', [isFileSizeUnder1MB], '용량이 1MB보다 작은 파일만 허용합니다.');

  return (
    <div className="container">
			...
      <input 
          type='file' 
          src={imgFile}
          onChange={setImgFile}
          />
      <p>{fileValidator?.error}</p>
			...
    </div>
  );
}
```

화면에서 커스텀 훅을 호출하였고, 검증 결과가 imgFileValidator 에 담겨 반환되어 진위 여부와 에러 메세지를 확인할 수 있다. 

또한 입력 값 상태 관리도 화면 파일에선 더 이상 관리해줄 필요가 없어 간결한 코드를 유지할 수 있다.

아래에서 코드 중복 최소화 전과 후를 비교해보면 고차 함수의 중요성을 더 이해하기 쉬울 것이다.

```javascript
// 변경 전
const [fileValue, setFileValue] = React.useState("");
const [fileSizeError, setFileError] = React.useState("");
const [oddValue, setOddValue] = React.useState(""); // 홀수 상태 관리
const [oddError, setOddError] = React.useState("");

const handleChangeFile = (file) => {
    if(isFileSize1MB(file)) {
        setFileValue(file);
    } else {
        setFileError("파일 용량이 1MB가 넘습니다.");
    }
}

const handleChangeOddValue = (value) => {
    if(isOdd(value)) {
        setOddValue(value);
    } else {
        setOddError("입력한 값이 홀수가 아닙니다.");
    }
}

// 변경 후
const [imgFile, setImgFile, imgFileValidator] = useInputValid('', [isFileSize1MB], '용량이 1MB보다 작은 파일만 허용합니다.');
const [oddValue, setOddValue, oddValidator] = useInputValid('', [isOdd], '입력한 값이 홀수가 아닙니다.');
```


### 작업 종료

이로써 코드 중복 최소화 작업은 끝이 났고, 정리를 해보자면 아래와 같다.

- 재사용성 높은 코드 개발을 위해 중복되는 로직 탐색
- 용도에 따라 고차 함수와 커스텀 훅으로 분리
- 개발 완료된 코드를 실제 화면에 적용

이렇게 프로그래밍의 기본 개념을 활용하여 개발 작업 시간을 줄이고 생산성을 효율적으로 높이는 방법을 살펴보았다.
프론트엔드 개발은 변화가 빠르고 트렌드를 따라가는 것이 중요하다. 그러나 새로운 기술을 완벽히 활용하기 위해서는 안정적인 기초가 필요하다.

이 글은 예전에 공부한 기본 개념을 다시 정리해 작성한 것이다.
