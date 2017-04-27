{% include base_path %}
{% include toc icon="gears" title="My Table of Contents" %}
---
title: Hello Jekyll
description: Showing what's possible with Jekyll
categories: blog
---

# H1 Header
## H2 Header
### H3
###### H6

**strong**

*em*

Inline attributes *red*{: style="color: red"}.

Left-align text
{: .text-left}

Mid-align text
{: .text-center}

Right-align text
{: .text-right}

> Blockquote
> > Nested blockquote
>

### Links
[Link Text](http://kramdown.gettalong.org "Kramdown")

### Horizontal Rule
This is a long paragraph that keeps going and going and going.
Use two backslashes \\
for hard line break
* * * 
Here's another paragraph

And a new paragraph

### Code snippet
~~~ ruby
def what?
    42
end
~~~

Use backticks for `inline code`.

### Comment
You can't see the text below because it's commented out.
{::comment}
This is a comment
{:/comment}

### Definition
term
: definition
: another definition

### Lists
1. Item 1
   * sub bullet 1
   * sub bullet 2
       1. a
       2. b
2. Item 2
3. Item 3



### Table
| Header 1 | Header 2 |
|:---------|---------:|
| cell 1   | cell 2   |
|====
| footer1  | footer 2 |
{: rules="groups"}

### Footnotes
I'm handsome[^1]

[^1]: Says me.

### Images
{% include figure image_path="/assets/unsplash-gallery-image-3.jpg" alt="Alt text" caption="Caption text" %}

![image-left](/assets/images/unsplash-gallery-image-1.jpg){: .align-left}
The rest of this paragraph is filler for the sake of seeing the text wrap 
around the 150×150 image, which is left aligned. There should be plenty of room 
above, below, and to the right of the image. 

![full](/assets/images/unsplash-gallery-image-1.jpg)
{: .full}

### Gallery
---
gallery2:
  - url: https://flic.kr/p/8a6Ven
    image_path: https://farm2.staticflickr.com/1272/4697500467_8294dac099_q.jpg
    alt: "Black and grays with a hint of green"
  - url: https://flic.kr/p/8a738X
    image_path: https://farm5.staticflickr.com/4029/4697523701_249e93ba23_q.jpg
    alt: "Made for open text placement"
  - url: https://flic.kr/p/8a6VXP
    image_path: https://farm5.staticflickr.com/4046/4697502929_72c612c636_q.jpg
    alt: "Fog in the trees"
---

{% include gallery id="gallery2" caption="This is a second gallery example with images hosted externally." %}

### Feature Row
---
feature_name:
  - url: https://flic.kr/p/8a6Ven
    image_path: https://farm2.staticflickr.com/1272/4697500467_8294dac099_q.jpg
    alt: "Black and grays with a hint of green"
  - url: https://flic.kr/p/8a738X
    image_path: https://farm5.staticflickr.com/4029/4697523701_249e93ba23_q.jpg
    alt: "Made for open text placement"
  - url: https://flic.kr/p/8a6VXP
    image_path: https://farm5.staticflickr.com/4046/4697502929_72c612c636_q.jpg
    alt: "Fog in the trees"
---

{% include feature_row id="feature_name" type="center" %}

### Video embed

{% include video id="XsxDH4HcOWA" provider="youtube" %}
{% include video id="97649261" provider="vimeo" %}

### Buttons
[Text](#link){: .btn .btn--success}