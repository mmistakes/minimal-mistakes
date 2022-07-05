<!--전체 글 수를 세기 위한 연산. sum 변수에 전체 글 수 저장-->

{% assign sum = site.posts | size %}

<nav class="nav__list">
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label }}</label>
  <ul class="nav__items" id="category_tag_menu">
      <!--전체 글 수-->
      <li>
            📂 <span style="font-family:'Cafe24Oneprettynight';">전체 글 수</style> <span style="font-family:'Coming Soon';">{{sum}}</style> <span style="font-family:'Cafe24Oneprettynight';">개</style> 
      </li>
      <li>
        <!--span 태그로 카테고리들을 크게 분류 ex) C/C++/C#-->
        <span class="nav__sub-title">C/C++/C#</span>
            <!--ul 태그로 같은 카테고리들 모아둔 페이지들 나열-->
            <ul>
                <!--Cpp 카테고리 글들을 모아둔 페이지인 /categories/cpp 주소의 글로 링크 연결-->
                <!--category[1].size 로 해당 카테고리를 가진 글의 개수 표시--> 
                {% for category in site.categories %}
                    {% if category[0] == "Cpp" %}
                        <li><a href="/categories/cpp" class="">C ++ ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
            <ul>
                {% for category in site.categories %}
                    {% if category[0] == "STL" %}
                        <li><a href="/categories/stl" class="">C++ STL & 표준 ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
        <span class="nav__sub-title">Coding Test</span>
            <ul>
                {% for category in site.categories %}
                    {% if category[0] == "Algorithm" %}
                        <li><a href="/categories/algorithm" class="">알고리즘 구현 (with C++) ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
            <ul>
                {% for category in site.categories %}
                    {% if category[0] == "Programmers" %}
                        <li><a href="/categories/programmers" class="">프로그래머스 ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
      </li>
  </ul>
</nav>
