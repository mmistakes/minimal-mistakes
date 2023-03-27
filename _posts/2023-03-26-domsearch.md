---
layout: single
title: "DOM으로 요소검색"
---

##### querySellectorAll(css)
css선택자에 해당하는 모든 요소들을 반환한다. 실무에서 querySellectorAll과 querySellector이 가장 많이 사용됨.

    <div id="elem">
      <div id="elem-content">Element</div>
    </div>
    
    <script>
      // 요소 얻기
      let elem = document.querySelector('div');
    
      // 배경색 변경하기
      elem.style.background = 'red';
    </script>
	

##### querySellector(css)
해당 css선택자를 찾아낼 시 검색을 멈추고 그 요소를 반환한다.

##### getElementById
해당 아이디를 가진 요소를 반환한다.

    <div id="elem">
      <div id="elem-content">Element</div>
    </div>
    
    <script>
      // 요소 얻기
      let elem = document.getElementById('elem');
    
      // 배경색 변경하기
      elem.style.background = 'red';
    </script>
	

##### getElementByName
getElementByTagName
getElementByClassName

각각 이름, 태그, class를 가진 요소를 반환한다.

##### matches(css)
요소가 css선택자와 일치할 시 true를 반환, 아닐 시 false를 반환한다.

    <a href="http://example.com/file.zip">...</a>
    <a href="http://ya.ru">...</a>
    
    <script>
      // document.body.children가 아니더라도 컬렉션이라면 이 메서드를 적용할 수 있습니다.
      for (let elem of document.body.children) {
        if (elem.matches('a[href$="zip"]')) {
          alert("주어진 CSS 선택자와 일치하는 요소: " + elem.href );
        }
      }
    </script>
	

##### closet(css)
css선택자를 포함하여 가장 가까운 조상요소를 찾음.

    <h1>목차</h1>
    
    <div class="contents">
      <ul class="book">
        <li class="chapter">1장</li>
        <li class="chapter">2장</li>
      </ul>
    </div>
    
    <script>
      let chapter = document.querySelector('.chapter'); // LI
    
      alert(chapter.closest('.book')); // UL
      alert(chapter.closest('.contents')); // DIV
    
      alert(chapter.closest('h1')); // null(h1은 li의 조상 요소가 아님)
    </script>
