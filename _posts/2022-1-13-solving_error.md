---
layout: single
title: "에러해결: Expected object of scalar type Float but got" scalar type Double for argument
categories: error
tag: deeplearning, error
typora-root-url: ../
---

딥러닝 모델에 사용하는 데이터, 혹은 사용후 데이터를 처리할 때 종종 보게되는 error이다. 앞전에 포스팅한 numpy -> tensor, tensor -> numpy와 같이 형변환을 수행하다보면 만나는 여럿 error중 하나이다. `RuntimeError: Expected object of scalar type Float but got scalar type Double for argument.. `



내용을 살펴보면 float type의 객체가 들어올 줄 알았는데 double type의 객체가 들어왔다는 error다.

필자의 경우 numpy 에서 tensor로 변경중에 발생했고.  이렇게 해결했다.

```python
#기존의 코드(error발생)
A_load_tensor = torch.from_numpy(A_numpy).to('cuda')
#cuda는 바로 gpu에 할당해주고 싶어서 붙였다.
#변형된 코드(error 해결)
A_load_tensor = torch.from_numpy(A_numpy).float().to('cuda')
```



추측컨데 .float()을 붙이지 않으니 자동으로 설정된 데이터 type이 서로 맞지 않았기 때문에 이런 문제가 발생했고 type을 지정하여 맞춰주니 해결되었다.