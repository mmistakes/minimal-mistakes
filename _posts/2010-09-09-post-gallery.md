---
title: "Post: Gallery"
categories:
  - Post Formats
tags:
  - gallery
  - Post Formats
  - tiled
gallery:
  - large: unsplash-gallery-image-1.jpg
    thumb: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
  - large: unsplash-gallery-image-2.jpg
    thumb: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
  - large: unsplash-gallery-image-3.jpg
    thumb: unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
gallery2:
  - large: https://flic.kr/p/8a6Ven
    thumb: https://farm2.staticflickr.com/1272/4697500467_8294dac099_q.jpg
    alt: "Black and grays with a hint of green"
  - large: https://flic.kr/p/8a738X
    thumb: https://farm5.staticflickr.com/4029/4697523701_249e93ba23_q.jpg
    alt: "Made for open text placement"
  - large: https://flic.kr/p/8a6VXP
    thumb: https://farm5.staticflickr.com/4046/4697502929_72c612c636_q.jpg
    alt: "Fog in the trees"
gallery3:
  - thumb: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
  - thumb: unsplash-gallery-image-4-th.jpg
    alt: "placeholder image 4"
---
These are gallery tests for image wrapped in `<figure>` elements.

To place a gallery add the necessary YAML Front Matter:

```yaml
gallery:
  - large: unsplash-gallery-image-1.jpg
    thumb: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
  - large: unsplash-gallery-image-2.jpg
    thumb: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
  - large: unsplash-gallery-image-3.jpg
    thumb: unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
  - large: unsplash-gallery-image-4.jpg
    thumb: unsplash-gallery-image-4-th.jpg
    alt: "placeholder image 4"
```

And then drop-in the gallery include --- gallery `caption` is optional.

```liquid
{% raw %}{% include gallery caption="This is a sample gallery with **Markdown support**." %}{% endraw %}
```

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

This is some text after the gallery just to make sure that everything aligns properly.

Here comes another gallery, this time set the `id` to match 2nd gallery hash in YAML Front Matter.

```yaml
gallery2:
  - large: https://flic.kr/p/8a6Ven
    thumb: https://farm2.staticflickr.com/1272/4697500467_8294dac099_q.jpg
    alt: "Black and grays with a hint of green"
  - large: https://flic.kr/p/8a738X
    thumb: https://farm5.staticflickr.com/4029/4697523701_249e93ba23_q.jpg
    alt: "Made for open text placement"
  - large: https://flic.kr/p/8a6VXP
    thumb: https://farm5.staticflickr.com/4046/4697502929_72c612c636_q.jpg
    alt: "Fog in the trees"
```

And place it like so: 

```liquid
{% raw %}{% include gallery id="gallery2" caption="This is a second gallery example with images hosted externally." %}{% endraw %}
```

{% include gallery id="gallery2" caption="This is a second gallery example with images hosted externally." %}

And for giggles one more gallery just to make sure this works.

{% include gallery id="gallery3" caption="This is a third gallery example with two images." %}