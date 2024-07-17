---
title: "Embedding Mermaid Diagrams in Jekyll without plugins!"
tags:
  - Jekyll
---
Embed a jekyll diagram by including a javascript file and putting diagram in a `<div>` object with class `mermaid`:

<script src="https://unpkg.com/mermaid@8.0.0/dist/mermaid.min.js"></script>

<div class="mermaid">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>

And the code:
~~~ html
<script src="https://unpkg.com/mermaid@8.0.0/dist/mermaid.min.js"></script>

<div class="mermaid">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
~~~

Adapted from <http://kkpattern.github.io/2015/05/15/Embed-Chart-in-Jekyll.html>
