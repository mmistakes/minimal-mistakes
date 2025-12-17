---
title: "Topic - Some topic on mathematics/science/general"
categories:
  - Template
tags:
  - maths
  - formula
  - diagram
  - images
  - videos
  - links
mathjax: true
---
# Main heading - Parabola

**Introduction** about the topic and link to images if needed ![parabola](https://res.cloudinary.com/dafulvowb/image/upload/v1765331742/math_parabola_500x500_wyfqk6.png)
#### Sub-heading with a quote
>"I heave the basketball; I know it sails in a parabola, exhibiting perfect symmetry, which is interrupted by the basket. It's funny, but it is always interrupted by the basket." ~ Michael Jordan

** Steps to use mathjax** in jekyll
---
1. Add `mathjax: true` to the page (local to the page) or  _config.yml file (if you want globally) of the minimal mistakes theme.
2. Add the content to the markdown file
3. Create a file to the root _includes/head/custom.html with following content



This is how the **formula** is rendered 
\$$\frac{4}{9} \left( 17 - 8\cos(2\sqrt{3}) \right)$$
by using mathjax-minimal-mistakes theme as opposed to below format

<pre>\frac{4}{9} \left( 17 - 8\cos(2\sqrt{3}) \right)</pre>

## Some sample visual aids needed to represent the working mechanism/proof for the topic

Here is a simple **flowchart**:

```mermaid
graph TD;
    A[Start] --> B(Process Input);
    B --> C{Check Status?};
    C -- Yes --> D[Finish];
    C -- No --> B;
```
_follow this_ [link!](https://vijayakumarcnp.github.io/know-how/bomonike-aibenchmark/) if you want maths formulas to be displayed in your content
```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```
#### Sometime you may want to use bar graphs...
```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

```
#### Sometime you may want to place youtube video/video to your content

{% include video id="wg-Cn5A8QKs" provider="youtube" %}

Enter the link name which you want to [Reference] in the template and mention its path in in the below name .If you have questions, you can email @ vijayakumar_cnp@yahoo.co.in.

[Reference]: https://vijayakumarcnp.github.io/