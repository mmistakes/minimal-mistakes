---
layout: post
title:  "CKEditor 5 in Nuxt(Vue.js)"
subtitle: "Nuxt 에서 ckeditor 적용하기"
author: "코마"
date:   2019-02-25 01:00:00 +0900
categories: [ "vue", "ckeditor" ]
excerpt_separator: <!--more-->
---

안녕하세요 코마입니다. 오늘은 CKEditor 를 Vue.js 에 적용하도록 하겠습니다. CKEditor 는 널리 사용되는 에디터 중에 하나입니다. CKEditor 를 통해 사용자는 게시글을 쉽게 꾸밀 수 있습니다. 만약, 단순 textarea, Text Input 에 질리셨다면 이 에디터를 적용해 보길 권합니다.

<!--more-->

# 개요

CKEditor 는 Vue.js 를 위한 npm 을 지원하고 있습니다. 저는 Nuxt 를 이용해 개발을 하고 있으므로 Nuxt 에서 적용하는 방식을 소개해 드리도록 하겠습니다.

# 설치

Nuxt 어플리케이션이 이미 준비되어 있다면 여러분은 아래의 명령어를 통해서 vue 전용 ckeditor 를 설치할 수 있습니다.

```bash
npm install --save @ckeditor/ckeditor5-vue @ckeditor/ckeditor5-build-classic
```

## 플러그인 설정

Nuxt의 plugin 폴더에서 Vue.use 를 이용하면 Ckeditor 를 전역적으로 등록하고 사용할 수 있습니다. 저는 `/plugins/ckeditor-plugin.js` 경로를 만들어 아래의 코드를 적용하였습니다.

```js
import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );
```

# nuxt.config.js 설정

nuxt.config.js 는 nuxt 의 전체 설정을 담고있는 환경설정 파일입니다. 이 파일을 통해 작성한 플러그인을 등록하고 nuxt 명령을 재실행해줍니다.

```js
module.exports = {
  mode: 'spa',
  // 중략
  plugins: [
    { src: "~/plugins/ckeditor-plugin", ssr: false },
  ],
  // 중략
}
```

```bash
$ nuxt
```

## 주의할 점

nuxt 의 mode 설정은 기본적으로 `universal` 입니다. 즉, SSR (Server Side Rendering) 을 지원하게 됩니다. 즉, express 서버에서 SEO 등의 이유로 인해 미리 파일을 생성하여 검색엔진이 식별하기 좋도록 렌더링된 데이터를 내려주는 것입니다. 그러나 이는 **javascript 가 browser 에서만 동작할 것이라고 가정한 ckeditor 에게는 독이됩니다.** 따라서 ckeditor 를 제대로 적용하기 위해서는 SSR 을 off 해주거나 universal 모드로 포팅을 해야합니다. 

저의 경우 SEO 를 신경쓰지 않아도 되는 상황입니다. (내부 환경에서 사용하기 때문에 SPA 로도 충분합니다.) 따라서 `nuxt.config.js` 파일에 `mode: 'spa',` 를 설정하였습니다.

이 경우 `document is undefined` 라는 에러가 발생하지 않습니다.

## ckeditor 적용

이제 실제 코드상에서 ckeditor 를 적용해 보도록 하겠습니다. 물론 걱정마세요 순수 vue 를 위한 코드를 별도로 준비해 놓았습니다. 여러분은 안심하고 이를 복사해서 사용하면됩니다.

그러나 먼저 nuxt 에서 적용하는 방법을 간단히 소개해 보도록 하겠습니다. 아래의 컴포넌트를 만들어 주세요.

```html
<template>
  <div>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <div class="ck-content" v-html="getData"></div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    Toc,  
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
        // plugins: [ Paragraph, Bold, Italic ],
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
      }
    };
  },
  mounted() {
  },
  computed: {
    getData() {
      return this.editorData;
    }
  }
};
</script>
```

작성이 완료된 컴포넌트들을 바탕으로 구현을 하면 아래와 같은 형태가 나온다. 코드펜으로 구현 내용을 첨부하였다.