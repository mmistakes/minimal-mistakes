---
layout: home
excerpt: Sociogenome.com
tags: [sociogenome, theme, responsive, blog, template]
image:
  feature: genomeOX_text.jpg
  credit: 
  creditlink: 
---

## About the project

Sociogenome is a comprehensive study of the role of genes and gene-environment (GxE) interaction on reproductive behaviour. Until now, social science research has focussed on socio-environmental explanations, largely neglecting the role of genes. Drawing from recent unprecedented advances in molecular genetics we examine whether there is a genetic component to reproductive outcomes, including age at first birth, number of children and infertility and their interaction with the social environment.

## Details

The project will be the first to engage in a comprehensive study of the role of genes and gene‐environment (GxE) interaction on reproductive behaviour. Until now, social science research has primarily focussed on sociological and social science explanations to understand fertility outcomes, largely ignoring the role of biology and genetics. Due to unprecedented advances in molecular genetics over the last decades, we are able for the first time to examine whether there is a genetic component to reproductive outcomes such as age at births, number of children and infertility. The project will focus on examining fertility outcomes in relation to classic social science determinants, but also genetic and lifestyle factors (e.g., smoking, stress, BMI). This transdisciplinary project draws upon research within sociology, demography, molecular genetics and medical research to examine gene and environment interaction, new types of causality and aims to produce fundamentally new results.


[ERC](http://erc.europa.eu/unravelling-genetic-influences-reproductive-behaviour-and-gene-environment-interaction)

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>


<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-84929784-1', 'auto');
  ga('send', 'pageview');

</script>