---
title:  "[Github 블로그] Minimal-Mistakes 테마의 디렉터리 구조"
excerpt: "블로그 커스터마이징을 하기 위해 미리 알아야 할 jekyll를 기본으로 한 minimal-mistakes 테마의 뼈대"

categories:
  - Blog
tags:
  - [Blog, jekyll, minimal-mistake]

toc: true
toc_sticky: true

breadcrumbs: true
 
date: 2020-05-26
last_modified_at: 2020-05-30
---
    🌕 계속 수정해나갈 문서입니다.

[Jekyll 한글 문서](https://jekyllrb-ko.github.io/)와 [Minimal Mistakes 공식 문서](https://mmistakes.github.io/minimal-mistakes/)를 참고하였다.
HTML, SCSS, Liquid. 어려운 언어는 아니지만 문법을 몰라서 공부해가며 파악하고 정리했는데 나름 재밌었다 😎 각각의 역할을 파악하는데에 <u>💛Chrome 개발자 도구💛</u>도 도움이 많이 되었다. 정확한 문법은 잘 몰라도 구글링과 함께 대략적으로 유추하면서 구조와 각각의 역할을 파악하였다. 블로그 커스타미이징시 개발자 도구를 적극 이용하자! 


## minimal-mistakes 구조 한 눈에 보기
기본적으로 Jekyll 디렉터리 구조를 뼈대로 하고 있지만 테마들마다 디렉터리 구조가 조금씩 다른 것 같다. 내가 쓰고 있는 테마 minimal-mistakes의 디렉터리 구조를 살펴보고자 한다.

```
minimal-mistakes
├── 📁_data                      # data files for customizing the theme
├── 📁_includes
├── 📁_layouts
├── 📁_sass                      # SCSS partials
├── 📁assets
├── 📝_config.yml                # site configuration
├── 📝Gemfile                    # gem file dependencies
├── 📝index.html                 # paginated home page showing recent posts
└── 📝package.json               # NPM build scripts
```

<br>

## 📁_data 폴더 

테마를 커스터마이징하기 위한 데이터 파일들이 모여있는 폴더. 사이트에 사용할 데이터를 적절한 포맷으로 정리하여 보관하는 디렉터리다. 이 디렉터리에 `.yml` `.yaml`, `json`, `csv`, `tsv` 같은 파일들을 둔다면 이 파일들을 자동으로 읽어들여 `site.data`로 사용할 수 있다. 예를 들어 _data 디렉터리에 `members.yml`라는 파일이 있다면 `site.data.members`로 입력하여 그 파일을 사용할 수 있다.

### 구조
```
├── 📁_data                      # data files for customizing the theme
|  ├── 📘navigation.yml          # main navigation links
|  └── 📘ui-text.yml             # text used throughout the theme's UI
```
#### 📘navigation.yml
```
# main links
main:
  - title: "Quick-Start Guide"
    url: https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/
  - title: "About"
    url: https://mmistakes.github.io/minimal-mistakes/about/
  - title: "Sample Posts"
    url: /year-archive/
  - title: "Sample Collections"
    url: /collection-archive/
  - title: "Sitemap"
    url: /sitemap/
```
**상단 메뉴바** 인 것 같다. 메뉴바를 커스터마이징할 때 이 문서를 건드리면 될 것 같다. url이 현재 저렇게 되있기 때문에 Quick-Start Guide와 About을 누르면 Minimal Mistakes 문서 페이지로 이동한다.서브 url이  year-archive, collection-archive로 등록된 문서가 현재 디렉터리에 없기 때문에 Sample Posts를 누르면 404 에러 페이지가 뜨고 있다. 얼른 메뉴바를 손봐야겠다. 🙄

#### 📘ui-text.yml

각국 언어별로 <u>어떤 텍스트로 표시되는지</u>를 나열한 문서이다. Minimal Mistakes의 TOC 라벨은 기본적으로 "On this page"로 나타나는데 뭔가 마음에 들지 않아 "Index"로 바꿔 보았다. 
`toc_label                  : "Index"`

<br>

## 📁_includes 폴더 

많이 `재사용` 되는 html 파일들을 모아 둔 폴더이다. 때문에 댓글, 카테고리, 태그, 비디오, head, footer, toc 등등 블로그에서 자주 쓰이거나 항상 보이는 **공통된 컴포넌트**들을 담은 코드들만 모아둔 폴더인것 같다.  
필요에 따라 `Liquid` 언어의 태그로 포스트나 레이아웃에 _includes 폴더 내의 코드를 쉽게 삽입하여 재사용할 수 있다. 예를들어 { % include file.ext % } 를 쓰면 이 부분에 _includes 폴더에 있는 file.ext 파일의 코드가 삽입되는 식이다. 

### 구조
```
├── 📁_includes
|  ├── 📁analytics-providers     # snippets for analytics (Google and custom)
|  ├── 📁comments-providers      # snippets for comments
|  ├── 📁footer                  # custom snippets to add to site footer
|  ├── 📁head                    # custom snippets to add to site head
|  ├── 📘feature_row             # feature row helper
|  ├── 📘gallery                 # image gallery helper
|  ├── 📘group-by-array          # group by array helper for archives
|  ├── 📘nav_list                # navigation list helper
|  ├── 📘toc                     # table of contents helper
|  ├── 📘video                   # embeding vedeo like youtube helper      
|  ├── 📘figure                  #      
|  ├── 📝analytics.html          #  
|  ├── 📝archive-single.html     #  
|  ├── 📝author-profile-custom-links.html #  
|  ├── 📝author-profiles.html    #  
|  ├── 📝breadcrumbs.html        #  
|  ├── 📝browser-upgrade.html    #  
|  ├── 📝category-list.html      #  
|  ├── 📝commtent.html           #  
|  ├── 📝commtents.html           #  
|  ├── 📝documents-collection.html #  
|  ├── 📝footer.html             #  
|  ├── 📝head.html               #  
|  ├── 📝masthead.html           #  
|  ├── 📝page__hero_video.html   #  
|  ├── 📝page__hero.html         #  
|  ├── 📝page__taxonomy.html     #  
|  ├── 📝paginator.html          #  
|  ├── 📝post_pagination.html    #  
|  ├── 📝posts-category.html     #  
|  ├── 📝posts-tag.html           #  
|  ├── 📝read-time.html          #  
|  ├── 📝scripts.html            #  
|  ├── 📝seo.html                #  
|  ├── 📝sidebar.html            #  
|  ├── 📝skip-links.html         #  
|  ├── 📝social-share.html       #  
|  ├── 📝tag-list.html           #  
|  └── 📝toc.html                #  
```

#### 📁analytics-providers
어떤 <u>analytics 플랫폼</u>을 사용할 것인지.
```
├── 📁analytics-providers                    
|  ├── 📝google.html          # Google Standard Analytics를 사용할 때
|  ├── 📝google-gtag.html     # Google Analytics Global Site Tag를 사용할 때
|  ├── 📝google-universal.html # Google Universal Analytics를 사용할 때
|  └── 📝custom.html           # 그 밖에 다른 analytics를 사용할 때
```
**💛사용 방법💛**
```
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "UA-1234567-8"
    anonymize_ip: false # default
```
provider에 사용할 analytics에 맞는 html 파일 이름을 문자열로 적어준다. 구글 analytics 말고 다른 analytics를 사용하려면 `provider: custom`을 한 후 custom.html에 그 analytics의 embed code를 추가해 준다. 

#### 📁comments-providers
어떤 <u>댓글 플랫폼</u>을 사용할 것인지. ex) disqus, facebook, ...  
마찬가지로 custom.html은 `_includes/comments-providers`에 없는 댓글 플랫폼을 사용하려 할 때 여기에 embeded code를 추가해주자.
[플랫폼별로 사용법](https://mmistakes.github.io/minimal-mistakes/docs/configuration/#comments)

#### 📁footer, head

폴더에 들어있는 `cumtom.html`에 footer와 head의 커스터마이징 내용을 적어주면 될 것 같다. favicon 파비콘 삽입 태그를 이 `_includes/head/custom.html` 에 삽입해주었다.

#### 📁search

어떤 <u>검색 엔진</u>을 사용할 것인지. 우선 블로그 내 검색 기능을 사용하려면 `_config.yml`에 `search: true`값으로 변경해주어야 한다. [검색 엔진 별 자세한 설명](https://mmistakes.github.io/minimal-mistakes/docs/configuration/#site-search)  

```
├── 📁analytics-providers                    
|  ├── 📝algolia-search-scripts.html    # algoria 검색 엔진
|  ├── 📝google-search-scripts.html     # Google 검색 엔진 
|  ├── 📝lunar-search-scripts.html      # Lunar 검색 엔진 
|  └── 📝search_form.html               # 
```
디폴트 검색 엔진은 `Lunar` 이며 [Google Custom Search Engine](https://cse.google.com/cse/all)에서 내 입맛대로 검색 엔진을 만들 수 있다. 검색 기능을 사용하려면 `_config.yml`에 `search_provider`값을 추가하면 된다. 

#### 📝Helpers
[자세한 설명 보러가기](https://mmistakes.github.io/minimal-mistakes/docs/helpers/)

##### 📝feature_row
마치 갤러리처럼 여러개의 사진들을 한 줄로 나열된 형태. Gallery와의 차이점이 있다면 사진마다 제목과 설명 텍스트가 달려 있음.
머릿말에 아래와 같은 정보가 담긴 `feature_row` 변수를 추가하고 포스트 본문에서 Liquid 태그를 `{ { % include feature_row % } }` 이렇게 적어주면 그 자리에 feature_row가 출력될 것이다.
```
feature_row:  # 3개의 이미지와 각가의 텍스트가 담긴 feature_row 
  - image_path: /assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Placeholder 1"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder 2"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
```
##### 📝gallery
feature_row와 다르게 텍스트 없이 한 줄에 사진 여러개만 있다. feature_row와 똑같은 방법으로 쓰면 된다. 머릿말에 각 이미지들의 url, path, alt, title 정보가 담긴 `gallery` 변수 지정해주고 본문에서 Liquid 태그로 출력.

##### 📝group-by-array
포스트 페이지 링크들이 모아져있는 `archive`같은 페이지에 쓰이는 것 같긴 한데 정확히 어디에 쓰이는건지 잘 모르겠다... 
[사용방법](https://github.com/mushishi78/jekyll-group-by-array)

##### 📝nav_list
메뉴 상단바 리스트. 아래와 같이 `_data` 폴더에 있는 `navigation.yml` 에 예를 들어 foo라는 이름의 네비게이션을 작성한다고 가정하자. Parent Link 1, 2라는 이름의 페이지가 상단 메뉴바에 생길 것이고 각각의 자식 페이지는 child-1,2-page, child-1,2,3-page가 될 것이다. 이러고 포스트 머리말에 `side bar : nav : "foo"` 혹은 포스트 본문에 `{ % include nav_list nav="foo" % }`을 써주면 foo라는 이름으로 지정한 네비게이션이 삽입될 것이다. 
```
# _data/navigation.yml
foo:
  - title: "Parent Link 1"
    url: /parent-1-page-url/
    children:
      - title: "Child Link 1"
        url: /child-1-page-url/
      - title: "Child Link 2"
        url: /child-2-page-url/

  - title: "Parent Link 2"
    url: /parent-2-page-url/
    children:
      - title: "Child Link 1"
        url: /child-1-page-url/
      - title: "Child Link 2"
        url: /child-2-page-url/
      - title: "Child Link 3"
        url: /child-3-page-url/
```
##### 📝toc
다음 업그레이드 때 이 `toc` helper 문서는 삭제될 예정이라고 한다. toc 목차를 사용하고 싶다면 머릿말에 `toc: true`를 써주자.

##### 📝video
Youtube, Vimeo 같은 비디오를 embeding 하는 helper. 유튜브의 경우 영상의 긴 url 말고 `짧은 url`을 따서 url의 뒷부분을 id로 넣어준다. 예를 들어 https://youtu.be/XsxDH4HcOWA url을 가진 유튜브 영상이라면 
```liquid
{% raw %}
{% include video id="XsxDH4HcOWA" provider="youtube" %}
{% endraw %} 
```
이렇게 유튜브 영상을 삽입할 수 있다. _include 파일에 있는 video helper 코드를 재사용하여 삽입! helper내의 id, provider 값은 각각 짧은 url과 youtube로 설정해준다. 💥`?start=110`을 붙여주면 유튜브 영상이 110초부터 재생되게끔 할 수 있다. Vimeo와 Google Drive에 있는 영상도 비슷한 방법으로 embeding 하면 된다!

##### 📝figure
한 개의 이미지 요소를 생성한다. 
```liquid
{% raw %}
{% include figure image_path="/assets/images/unsplash-image-10.jpg" alt="this is a placeholder image" caption="This is a figure caption." %}
{% endraw %}
```
이렇게 사용한다. image_path는 필수이며 alt와 caption은 옵션.
Liquid 태그로 include figure 이미지를 불러오는 역할을 하는 HTML 코드가 담겨있는 📝`figure`가 불러와진다. 

#### 📝html

##### 📝analytics.html
```
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "UA-1234567-8"
    anonymize_ip: false # default
```
이렇게 yml 형식으로 써서 `analytics.html`에 애널리틱스의 provider 정보와 tracking_id, anonymize_ip 정보를 넘겨준다.

##### 📝archive-single.html

```liquid
{% raw %}
{% include archive-single.html %} 
{% endraw %}
```
포스트 페이지들 링크 모아둔 `아카이브 페이지`에서 각 포스트(싱글페이지) 링크가 어떻게 보여질지에 대한 문서. 이 블로그의 홈에서 Recent Pages가 나오는데 이런게 바로 아카이브 페이지! 

##### 📝author-profile-custom-links.html
```html
<!--예시-->
  <li>
    <a href="http://link-to-whatever-social-network.com/user/" itemprop="sameAs" rel="nofollow noopener noreferrer">
      <i class="fas fa-fw" aria-hidden="true"></i> Custom Social Profile Link
    </a>
  </li>
```
minimal mistakes 에서 제공하는 author profile link는 Github, 메일, Facebook 등이 있다. 이 밖에도 Kakao같은 `📝author-profiles.html` 에서 제공되지 않는 link를 사용하려면 API를 참고하여 이곳에 위 코드 블럭처럼 코드를 이 파일에 넣어주면 될 것 같다. 

##### 📝author-profiles.html

author profile의 link로 프로필에 삽입할 수 있도록 Github, mail, facebook, steam, youtube 등등 다양한 링크의 HTML 코드를 제공한다.

##### 📝breadcrumbs.html

![image](https://user-images.githubusercontent.com/42318591/83213140-5d451500-a19c-11ea-983e-9baaf97fbb0a.png)

프로필 위에 있는 이런게 바로 breadcrumbs. `최상위문서/상위문서/해당포스트` 이런식의 계층 구조로 해당 페이지의 상대적 위치를 보여준다. 이렇게 breadcrumbs 를 구현할 수 있는 html 문서가 있으니 `_config.yml`혹은 각 포스트 md 파일 머릿말에 `breadcrumb: true` 해주면 나타난다.

##### 📝browser-upgrade.html

IE9 브라우저로 접속할 경우 브라우저를 업그레이드 하라는 블록이 나타나도록 해주는 html 문서

##### single-page > 📝page__taxonomy.html

minimal-mistakes 문서와 프로젝트 코드들을 살펴보니 
- `(single)  page`는 포스트 하나를 열었을 때 보이는 본문을 의미하는 것 같고 
- `post`는 포스트들을 모아둔 `archive page`내에서 보여지는 <u>각각의 포스트</u>를 의미하는 것 같다
- `posts`는 포스트들의 포스트 같은 느낌..? `archive page`들을 모아둔 더 상위에 있는 `archive page`내에서 <u>각각의 archive page</u> 인 것 같다.  
이렇게 개념을 잡고 블로그 커스터마이징을 하는 중인데 아직 모호해서 좀 더 구체적으로 공부를 해봐야겠다. 

`taxonomy`의 사전적 정의는 분류 체계. `(single) page` 내에서 `태그`와 `카테고리`를 나타내는 부분이다. `📁_layouts/single.html`에서 어떻게 보여질지 조작할 수 있다.
![image](https://user-images.githubusercontent.com/42318591/83218656-5244b180-a1a9-11ea-8f5f-db23551e1bbd.png)

```liquid
{% raw %}
{% if site.tag_archive.type and page.tags[0] %}
  {% include tag-list.html %}
{% endif %}

{% if site.category_archive.type and page.categories[0] %}
  {% include category-list.html %}
{% endif %}
{% endraw %}
``` 
`liquid` 언어로 `📝tag-list.html`코드를 소환하는 부분과 `📝category-list.html` 코드를 소환하는 부분이 함께 있다. 

`📁_layouts/single.html`에서 어떻게 보여질지 조작할 수 있다. 나는 태그가 없다면 카테고리만 나타나게끔, 카테고리가 없다면 태그만 나타나게끔 하고 싶었기 때문에 `page__taxonomy`를 `{ % include % }` 하지 않고 if-elsif 문을 두어서 `tag-list`, `category-list` 따로 따로 include 해주었다. 자세한 사항은 추후 포스팅. 

##### single-page > 📝tag-list.html

`(single) page` 내에서 태그 리스트를 만들고 어떻게 보여질지를 나타냄. `📁_layouts/single.html`에서 어떻게 보여질지 조작할 수 있다.

##### single-page > 📝category-list.html

`(single) page` 내에서 카테고리 리스트를 만들고 어떻게 보여질지를 나타냄. `📁_layouts/single.html`에서 어떻게 보여질지 조작할 수 있다.

##### single-page > 📝page__hero.html, 📝page__hero_video.html

`page__hero`가 뭔지 정확히는 잘 모르겠지만 [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/) 문서 페이지에 가면 헤더에서 볼 수 있는 블로그 제목이 달려있는 큰 사진 같은 것을 hero라고 칭하는 것 같다. 

##### post > 📝post__taxonomy.html ⭐

![image](https://user-images.githubusercontent.com/42318591/83220899-30e6c400-a1af-11ea-9694-65f060c3698b.png)

원래 minimal-mistakes 프로젝트에 없는 파일인데 내가 만들어 추가한 html 파일이다. 내 블로그의 홈은 최근에 등록 된 포스트들만 모아진 archive page인데 위 빨간 박스 부분들을 page가 아닌 `post`로 칭하는 것 같다.  
📝post__taxonomy.html 을 따로 만든 이유
1. 이 archive page의 각 포스트 링크에 태그와 카테고리를 보이게 하기 위하여. 
    - 원래는 excerpt 발췌글과 날짜만 보였다. 위 사진은 커스터마이징한 결과!
    - 📝category-list.html 코드들을 복사해 와 `page.categories` 이런 것들을 다 `post.categories` 로 바꿔주었다. tag도 마찬가지. 
![image](https://user-images.githubusercontent.com/42318591/83222003-4d383000-a1b2-11ea-826a-1bade2624804.png)  
2. 태그 리스트를 카테고리 옆에 붙이고 싶었는데 페이지 본문에 있는 모양처럼 태그가 자꾸 카테고리 리스트에서 줄바꿈 된 채로 통째로 다니는게 맘에 들지 않았다. 
    - 그래서 줄바꿈 되지 않도록 post__tag-list, post__category-list 이렇게 따로 두지 않고 이 📝post__taxonomy.html 에서 이 둘을 같은 HTML 태그 안에 넣었다. 
    - 카테고리와 태그의 디자인을 서로 다르게 하기 위하여 scss 와 연결될 클래스도 다르게 설정해주었다. 

위에서 설명한 `📝archive-single.html`에서 어떻게 보여질지 조작할 수 있다.
자세한 내용은 추후 포스팅

##### post > 📝post_pagination.html

싱글 페이지 (포스트 md파일) 아래에 `previous`, `next` 이전글 다음글 볼 수 있는 버튼이 있는데 바로 그것.

##### posts > 📝posts-category.html

`카테고리 archive`들을 모아둔 `archive page`. 포스트들이 담긴 하나 하나의 카테고리들이 모인 전체 카테고리 페이지라고 보면 될 것 같다.

##### posts > 📝posts-tag.html

`태그 archive`들을 모아둔 `archive page`. 포스트들이 담긴 하나 하나의 태그페이지들이 모인 전체 태그 페이지라고 보면 될 것 같다.

##### 📝commtent.html

댓글 코멘트 한 개의 위치와 모양을 관장하는 html

##### 📝commtents.html

코멘트 여러개가 모인 블록을 관장하는 html.
댓글 플랫폼(disqus, facebook)에 따라 모양이 다르게끔 되어있다.

##### 📝document-collection.html

`collection`은 서로 관련있는 포스트나 아카이브 페이지들을 그룹화하여 모아둔 페이지라는 점에서 `archive page`와 비슷하다. 둘다 비슷하긴 한데 `archive page`는 태그나 카테고리 혹은 연도같은 포스트의 데이터에 의하여 포스트들이 자동 분류되고 `collection`은 관련있는 포스트들을 사용자 정의로 그룹화하여 모아둔 페이지를 뜻한다.  
ex) 팀 멤버들  목록, 포트폴리오, 레시피

`📝archive-single.html`를 for문 돌려서 여러개 출력하고 `📁_layouts/collection.html`에서 나타난다.

- [collection 사용방법](https://mmistakes.github.io/minimal-mistakes/docs/collections/)
    1. `__config.yml`에 collections 값을 추가한다.
        ex.  collection: portfolio
    2. `📁__pages` 폴더에 (없으면 직접 만들기) portfolio 폴더 추가해서 거기에 포스트 파일(md) 올리기
    3. 포스트 머릿말엔 `collection: portfolio`, `permalink: /portfolio/`. `layout: collection` 추가 해주기

##### 📝footer.html

RSS 아이콘 있는 아랫 부분... 

##### 📝head.html

직접적으로 보여지는건 없고 SCSS 정보 같은 것만 담겨있는 듯하다(?). head 태그에 대한 HTML코드를 담고 있는데 이는 `📁_layouts/default.html` 레이아웃에 head로 include된다.

##### 📝masthead.html

블로그 제목있고 메뉴바 있는 상단 부분

##### 📝paginator.html

포스트들이 모여진 `archive page`에서 페이지 번호 ! 곧 구현할 것이다. 추후 포스팅

##### 📝read-time.html 

포스트를 읽으면 타이틀 밑에 뜨는 최근에 읽은 시간. 1 min read 이런식으로 떴었는데 필요한 정보는 아닌 것 같아 삭제했다. 삭제한 방법 추후 

##### 📝scripts.html

자바 스크립트, 검색 엔진, 애널리틱스 등등의 소스를 불러오는 곳

##### 📝seo0.html

검색 엔진 최적화

##### 📝sidebar.html

author profile 같은 사이드 바

##### 📝skip-links.html

컨텐츠로 바로가기, 맨 위 아래로 바로가기 같은 스킵 기능 (a 링크 태그만 있음)

##### 📝social-share.html

공유 링크. 트위터, 링크드인, 페이스북 3개만 디폴트로 있음.

##### 📝toc.html

toc 구현 코드 

<br>

## 📁_layouts

페이지마다 디자인과 직접적으로 연결된 전체적인 레이아웃. 템플릿을 위한 코드를 한 곳에 보관할 수 있게 해주기 때문에 모든 페이지에 footer나 navigation 같은 것을 반복적으로 입력할 필요가 없다. 📁_include 폴더 안에 부분적인 html 들이 존재해 이를 불러오는 부분이 많다. 레이아웃을 선택하는 기준은 머리말이며 `{% raw %}{{ content }}{% endraw %}` 와 같이 liquid 태그를 사용하면 페이지에 컨텐츠가 주입된다.
각 포스트에서 머릿말 YAML헤더에 `layout: 값`으로 레이아웃을 선택할 수 있다. 기본 레이아웃은 `default.html`

```
├── 📁_layouts             
|  ├── 📝archive-taxonomy.html            
|  ├── 📝archive.html      
|  ├── 📝categories.html  
|  ├── 📝category.html     
|  ├── 📝collection.html       
|  ├── 📝compress.html    
|  ├── 📝default.html   
|  ├── 📝home.html   
|  ├── 📝posts.html   
|  ├── 📝search.html   
|  ├── 📝single.html    
|  ├── 📝splash.html   
|  ├── 📝tag.html   
|  └── 📝tags.html                
```
- `📝default.html `는 html, head, body를 갖추고 있는 최상위 레이아웃이다. (head 태그는 `📁_include/head.html`에서 include함) 
- `layout: archive`로 YMAL 머릿말 값을 지정한 md 포스트들은 `📝archive.html `의 `{% raw %}{{ content }}{% endraw %}`부분에 삽입되어 렌더링 된다. 다른 레이아웃 html들도 마찬가지!
- 📁_layouts 의 대부분 레이아웃 html 들이 YAML 머릿말에 `layout: default` 값을 담고 있다. 즉 상속 구조이기 때문에 포스트에 layout: archive만 해주어도 archive 레이아웃에 또 layout: default가 있기 때문에 불러와서 입히고 또 불러와서 입히고 이런식으로 렌더링 됨!
`{% raw %}{{ page.xxx }}{% endraw %}` 부분은 이 파일을 레이아웃으로 사용할 파일의 YAML 머릿말에서 정의한 변수이다. 
  - title, date, tags, last-modified-at 같은 것들. 레이아웃 html 파일들 내에서 page.title 이런식으로 쓸 수 있음
- layout 값에 해당하는 레이아웃 thml파일들 내에서 `{% raw %}{{ content }}{% endraw %}`

<br>

## 📁_sass

`minimal-mistakes.scss`에 import 할 수 있는 scss 파일들을 모아 둔 폴더. `minimal-mistakes.scss`는 최종적으로 `📁_assets/css/main.scss`에 import 된다. 블로그와 컴포넌트들을 시각적으로 디자인하는 스타일시트 파일들이다. `scss`는 csss와 비슷한데 좀 더 좋은건가 보다. sassy css라나 뭐라나..😚 문법도 css와는 조금 다르다고 한다! html문서들에서 설정한 id나 class 속성에 따라 스타일이 지정된다.  

```
├── 📁_sass             
|  ├── 📁_skin           
|  ├────├── 📕_dark.scss     # 내가 쓰고 있는 스킨이다. 색을 몇 개 바꾸긴 했지만..! 
|  ├── 📁_vendor 
|  ├────├── 📕_animation.scss   
|  ├────├── 📕_archive.scss         
|  ├────├── 📕_base.scss      
|  ├────├── 📕_button.scss  
|  ├────├── 📕_footer.scss  
|  ├────├── 📕_forms.scss    
|  ├────├── 📕_masthead.scss   
|  ├────├── 📕_mixins.scss     
|  ├────├── 📕_navigation.scss  
|  ├────├── 📕_notices.scss  
|  ├────├── 📕_page.scss 
|  ├────├── 📕_print.scss 
|  ├────├── 📕_reset.scss 
|  ├────├── 📕_search.scss 
|  ├────├── 📕_sidebar.scss 
|  ├────├── 📕_syntax.scss 
|  ├────├── 📕_tables.scss 
|  ├────├── 📕_utilities.scss 
|  └────└── 📕_variables.scss 
└──── 📕_minimal-mistakes.scss
```
<br>

## 📁_assets
```
├── 📁_css              # main.scss             
├── 📁_images           # 이미지 파일 여기에 두기   
├── 📁_js               # java script 
```

## 📘_config.yml

블로그를 구성하기 위한 기본적인 설정값들. 📘_config.yml 에 있는 설정값들은 `{% raw %}{{ site.xxx }}{% endraw %}` 이렇게 site.xxx 으로 접근할 수 있다. 
  - YMAL 헤더 머릿말에서 설정한 변수들은 `page.xxx`
  - 📘_config.yml 에서 설정한 변수들은 `site.xxx`
    - 📘_config.yml 에 설정되지 않은 변수인데 site.pages 로 쓰이는 변수들은 Jekyll가 자동으로 생성한 변수라고 생각하면 된다.
    - site.pages: _posts 폴더에 있는 페이지 이외의 모든 페이지
    - site.posts: _posts 폴더 에 있는 모든 페이지
config.yml 에서 `post`나 `page`의 default 설정값을 지정해 놓을 수 있다. 
  - post : 날짜, 카테고리, 태그에 따라 분류되는 글. 우리가 포스팅하는 그 글.
  - page : 날짜, 카테고리, 태그같은 것들과 상관 없이 어떤 목적으로 만든 페이지

## 📓 Gemfile

사용할 gem 플러그인 목록
`gem install`로 사용할 플러그인을 설치한다.

## 📝index.hmtl

블로그 처음 홈 페이지 !

***
**참고**  
[이수환님 블로그](https://suhwan.dev/2017/06/23/jekyll-project-structure/)  
[jekyll 문서](https://jekyllrb-ko.github.io/)  
[minimal-mistakes 문서](https://mmistakes.github.io/minimal-mistakes/)    

***
    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}