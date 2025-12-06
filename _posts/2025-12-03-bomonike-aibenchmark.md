---
title: "Maths components"
categories:
  - know-how
tags:
  - link
  - Post Formats
mathjax: true
---
** Steps to use mathjax** in jekyll
---
1. Add `mathjax: true` to the page (local to the page) or  _config.yml file (if you want globally) of the minimal mistakes theme.
2. Add the content to the markdown file
3. Create a file at _includes/head/custom.html with following content
>
{% if page.mathjax or site.mathjax %}
<script>
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
      fontCache: 'global'
    }
  };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% endif %}

Here is the **formula** rendered 
\$$\frac{4}{9} \left( 17 - 8\cos(2\sqrt{3}) \right)$$
for using mathjax in place of 

<pre>\frac{4}{9} \left( 17 - 8\cos(2\sqrt{3}) \right)</pre>

\\(e^{i\pi}\\) is an irrarational number




