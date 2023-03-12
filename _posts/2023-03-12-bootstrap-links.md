---
layout: single
title: 부트스트랩 imports시 추가하는 코드의 의미
---

참고용 링크: [Bootstrap Documentation - Introduction](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

보던 강의에서 부트스트랩의 사용을 위해 다음과 같은 코드를 추가하라기에 각 코드가 어떤 역할을 하는 것인지 알고 싶어 약간 찾아보았다.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
```

1. 첫번째 줄의 경우 Bootstrap의 CSS를 동작시키기 위한 코드이다.
2. 두번째 줄은 Bootstrap과는 관계 없이 jQuery를 동작시키기 위해 넣어주는 코드로 보인다. 현재의 Bootstrap 5는 jQuery 없이도 사용할 수 있도록 설계되었다고 하고, Bootstrap과 jQuery를 함께 사용할 경우 충돌이 일어날 수도 있는 듯 보인다([Bootstrap documentation의 Javascript- '충돌 방지' 섹션에서 추론.](https://getbootstrap.kr/docs/5.0/getting-started/javascript/)) 어쩌면 강의에서 jQuery를 사용할 계획이어서 미리 넣어준 건지도..
3. 세번째 줄은 Bootstrap에서 이용하는 JS plugin들이 작동하기 위해 넣어주는 번들 코드이다. 해당 방식으로 넣지 않고 분리해서 넣을 수도 있는데, 이 경우 Bootstrap이 이용하는 JS plugin보다 Popper를 먼저 링크해주어야 한다고 함.
