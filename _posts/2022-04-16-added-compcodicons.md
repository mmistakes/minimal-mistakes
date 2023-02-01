---
title: "New icon set for competitive coding"
toc: false
#tags:
  #- gif
date: April 15, 2022
#header:
  #teaser: /assets/images/thumbnails/joel-filipe-thumb-400.jpg
excerpt: "Created a new icon set for competitive coding / programming you can add to your website."
---

I have created an icon font set for competitive coding / programming (similar to Academicons).

If you want the icons seen on the left, feel free to take a look at it [here](https://github.com/cschindlbeck/compcodicons). Contributions are always welcome.

## Short instructions for Jekyll:

1. Clone compcodicons

    ```sh
    git clone https://github.com/cschindlbeck/compcodicons
    ```

2. Copy font files (compcodicons.woff,compcodicons.tff) to assets/fonts 

3. Copy compcodicons.css file to assets/css

4. Include css file in \_includes/head.html:

    ```sh
      <link rel="stylesheet" href="/assets/css/compcodicons.css">
    ```
5. Add to \_config.yaml:

    ```yaml
    author:
      links:
        - label: "Hackerrank"
          icon: "cci cci-hackerrank"
          url: "https://www.hackerrank.com/schindlbeck"
    ```



