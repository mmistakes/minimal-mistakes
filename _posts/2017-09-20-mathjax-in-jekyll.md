---
title: "MathJax in Jekyll"
modified:
categories: blog
excerpt: "How to get MathJax to render equations"
tags: [meta]
date: 2017-09-20
header:
---

It took me a bit to figure out how to get MathJax up and running to properly render equations in my posts.

First you need to run the MathJax script in a post.
You can do this by putting the appropriate header in a post's source file directly,
or you can enable MathJax for all posts by putting it in the `_include/head/custom.html` header file setup by Minimal Mistakes.

```html
  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      TeX: {equationNumbers: {autoNumber: "AMS"}},
    });
  </script>
  
  <script type="text/javascript" 
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML">
  </script>
```

The first block configures MathJax to use AMS equation numbering.

You could choose to use `$` for inline math (which is not the default behavior).
But this means you will have to trick MathJax into skipping any dollar-signs you want to render normally.
It looks like this works: `<span>$</span>`.
See the MathJax [docs](http://docs.mathjax.org/en/latest/tex.html#tex-support) for more info.
You would add the following to the `MathJax.Hub.Config` block, if you were so inclined.
```html
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
```

Without the single dollar signs we must use `\( \)` for inline math.
Sadly **all** special characters must be escaped with `\` for the html renderer to work right,
so this must be entered as `\\( \\)` in practice.
You'll also need to escape underscores `\_` and astrisks `\*` (and a few other things).

## example math code

Here is an example block to see some functionality:

```latex
The Newtonian gravitational potential is defined as

\begin{equation}
  \phi = - \frac{G M}{r} .
\end{equation}

We can find the gravitational field by taking the gradient of the potential

$$ \vec{g} = -\vec{\nabla}\phi $$.

The line element for Minkowski space is \\(\mathrm{d}s^2 = -dt^2 + dx^2 + dy^2 + dz^2\\)

Einstein's equations are

\\[ G\_{\mu\nu} = 8\pi\, T\_{\mu\nu} \\]

in geometric units where \\(G=c=1\\).

We can write Maxwell's equations in tensor form using the `align` environment
\begin{align\*}
  \mathrm{d}\mathcal{F} \&= 0 \\\\
  ^\*\mathrm{d} ^\*\mathcal{F} \&= \mathcal{J}
\end{align\*}
```

## renders as


The Newtonian gravitational potential is defined as

\begin{equation}
  \phi = - \frac{G M}{r} .
\end{equation}

We can find the gravitational field by taking the gradient of the potential

$$ \vec{g} = -\vec{\nabla}\phi $$.

The line element for Minkowski space is \\(\mathrm{d}s^2 = -dt^2 + dx^2 + dy^2 + dz^2\\)

Einstein's equations are

\\[ G\_{\mu\nu} = 8\pi\, T\_{\mu\nu} \\]

in geometric units where \\(G=c=1\\).

We can write Maxwell's equations in tensor form using the `align` environment

\begin{align\*}
  \mathrm{d}\mathcal{F} & = 0 \\\\
  ^\*\mathrm{d} ^\*\mathcal{F} & = \mathcal{J}
\end{align\*}



