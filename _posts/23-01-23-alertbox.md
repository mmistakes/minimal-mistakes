---
layout: single
title: "alert-box "
categories: concept
  tag: [condingApple]
---

```js
<body>
    <div class='alert-box' id='alert'>
        알림창임
        <button class="cancel" onclick="openAlert('none');"> X </button>
    </div>
    <button onclick="openAlert('block');">열기</button>
    <script>
        function openAlert(구멍) {
            document.getElementById('alert').style.display = 구멍;
        }
    </script>
</body>


// 이와 같이 동일한 형태의 함수라면 구멍에 가변되는 값을 넣어 한 함수로 두가지 기능 가능


```

```js
  // 함수 파라미터 활용  === 밑과 위 같은 것
    function plus(){
        2 + 1
    }

    function plus2(){
        2+2 
    }
    function plus2(){
        2 + 3 
    }

    ==================

    function plus(add){
        2 + add
    }
    plus(1);
    plus(2);
    plus(3);
```

