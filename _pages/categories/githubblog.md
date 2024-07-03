 ---
  title: "Blog"
  layout: archive
  permalink: categories/Blog
  author_profile: true
  sidebar_main: true
  ---
  
  { assign posts = site.categories.Blog }
  { for post in posts } { include archive-single.html type=page.entries_layout } { endfor }
