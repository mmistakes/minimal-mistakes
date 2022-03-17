Code Kata Week2 Day3



## 문제

s는 여러 괄호들로 이루어진 String 인자입니다. s가 유효한 표현인지 아닌지 true/false로 반환해주세요.

종류는 '(', ')', '[', ']', '{', '}' 으로 총 6개 있습니다. 아래의 경우 유효합니다. 한 번 괄호를 시작했으면, 같은 괄호로 끝내야 한다. 괄호 순서가 맞아야 한다.

예를 들어 아래와 같습니다.

```js
s = "()"
return true

s = "()[]{}"
return true

s = "(]"
return false

s = "([)]"
return false

s = "{[]}"
return true
```





## 해결

```js
function isValid(s) {
  
  for(let i = 0; i < s.length; i++){
    if(s.includes("()") || 
       s.includes("{}") || 
       s.includes("[]"))  
    {
      s = s.replace("()", "");
      s = s.replace("[]", "");
      s = s.replace("{}", "");
    }
    if(s === ""){
      return true
    }
  } // for문 end
  return false  
}

let input = "[{}]"
console.log(isValid(input))

module.exports = { isValid };
```

1. 인풋으로 들어오는 문자열을 `for문`을 통해서 반복한다.
2. 반환 값이 `true` 가 나오려면 닫히는 자기의 짝이 있다.
3. 그래서 문자열에 닫히는 괄호가 있다면 제거를 해준다.
4. 제거를 해주면 두번째 반복문에서 `[{}]` 은 `[]` 로 바뀌게 되고 다음 반복문에서 `[]` 도 사라지게 된다. 결국 문자열이 `""` 면 `true`를 반환하고 반복문이 전부 끝날동안 `true` 값을 반환하지 못한다면 반복문이 끝난 후 `false` 를 반환한다.