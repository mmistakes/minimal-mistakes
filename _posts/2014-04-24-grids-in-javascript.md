---
id: 19
title: Tiles in Javascript
date: 2014-04-24T19:54:07+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=19
permalink: /grids-in-javascript/
categories:
  - Uncategorized
tags:
  - CSS
  - HTML
  - Javascript
---
Tried using <a title="FreeWall" href="http://freewall.org" target="_blank">Freewall</a>, a small tiling library written in jquery. It looked nice in the demos and easy to incorporate but didn't like tiles composed dynamic ajax content. Even calling $(window).sendResize() after each block loaded and formatted, content would frequently overlap unless a height was specified in advance. Little documentation.
Before trying the very popular <a href="http://masonry.desandro.com/" target="_blank">Masonry </a>I thought I would try some <a href="http://css-tricks.com/all-about-floats/" target="_blank">basic CSS</a>, float-left, float-right on content and clear on a spacer div. Although layout is now hard-coded, it works and is easy for anyone to figure out. Simple CSS and layout is below.

The HTML:
[sourcecode language="html"]
<div id="freespace" class="cell left"></div>
<div id="lastcontact" class="cell right"></div>
<div class="spacer"></div>
<div id="dbstatus" class="cell left"></div>
<div id="services" class="cell right"></div>
[/sourcecode]

And the CSS:
[sourcecode language="css"]
.cell { width: 47%; padding: 10px; }
.left { float: left }
.right { float: right }
.spacer { height: 20px; clear: both }
[/sourcecode]
