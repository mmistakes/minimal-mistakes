{% include base_path %}
---
title: Hello Jekyll
description: Showing what's possible with Jekyll
categories: blog
---

# H1 Header
## H2 Header
### H3
###### H6

*em*

**strong**

Inline attributes *red*{: style="color: red"}.

> Blockquote
> > Nested blockquote
>

### Links
[link](http://kramdown.gettalong.org "Kramdown")

### Horizontal Rule
This is a long paragraph that keeps going and going and going.
Here's a hard line break.
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
You can see the text below because it's commented out.
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
{% include figure image_path="/assets/unsplash-gallery-image-3" alt="Alt text" caption="Caption text" %}

