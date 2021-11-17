
# Layouts

Cuando se crea un archivo **markdown** para confeccionar un documento dentro de los directorios:

* `_pages`
* `_portfolio`
* `_post`
* `_about`

Se le asigna de cabecera una plantilla mediante el tag → `layout` ; como por ejemplo:

 `layout: single`

El cual definirá el estilo de la página que estemos creando que en este caso se llama:

`archivo:ejemplo.md`

Dentro del archivo añadimos la cabecera con el siguiente código:

```markdown
---
layout: single
title: "Page Not Found"
excerpt: "Page not found. Your pixels are in another canvas."
sitemap: false
permalink: /404.html
---
```

La plantilla `layout: single` esta en el directorio `_layout` el cual se utiliza para crear los diseños y las estructuras básicas de ambito genérico para el sitio web.

Contenido del archivo:

`layout: single`

```ruby
---
layout: default
---

    {% if page.header.overlay_color or page.header.overlay_image or page.header.image %}
      {% include page__hero.html %}
    {% elsif page.header.video.id and page.header.video.provider %}
      {% include page__hero_video.html %}
    {% endif %}

    {% if page.url != "/" and site.breadcrumbs %}
      {% unless paginator %}
        {% include breadcrumbs.html %}
        {% endunless %}
    {% endif %}
```

Cada archivo dentro del directorio `_layout` tienen una o más estructuras básicas en codigo `HTML` y `Ruby` que se añaden a las paginas que se van creando mediante el tag `layout`

Los archivos del directorio `_layout` tiene **snippet** de código **Ruby** del directorio `_include` que se insertan automáticamente cuando se invocan.

Ejemplo de Código

```ruby
    {% if page.header.overlay_color or page.header.overlay_image or page.header.image %}
      {% include page__hero.html %}
    {% elsif page.header.video.id and page.header.video.provider %}
      {% include page__hero_video.html %}
    {% endif %}

    {% if page.url != "/" and site.breadcrumbs %}
      {% unless paginator %}
        {% include breadcrumbs.html %}
      {% endunless %}
    {% endif %}
```

El fragmento de código `page__hero`

```ruby
{% capture overlay_img_path %}{{ page.header.overlay_image | relative_url }}{% endcapture %}

{% if page.header.overlay_filter contains "gradient" %}
  {% capture overlay_filter %}{{ page.header.overlay_filter }}{% endcapture %}
{% elsif page.header.overlay_filter contains "rgba" %}
  {% capture overlay_filter %}{{ page.header.overlay_filter }}{% endcapture %}
  {% capture overlay_filter %}linear-gradient({{ overlay_filter }}, {{ overlay_filter }}){% endcapture %}
{% elsif page.header.overlay_filter %}
  {% capture overlay_filter %}rgba(0, 0, 0, {{ page.header.overlay_filter }}){% endcapture %}
  {% capture overlay_filter %}linear-gradient({{ overlay_filter }}, {{ overlay_filter }}){% endcapture %}
{% endif %}

{% if page.header.image_description %}
  {% assign image_description = page.header.image_description %}
{% else %}
  {% assign image_description = page.title %}
{% endif %}

{% assign image_description = image_description | markdownify | strip_html | strip_newlines | escape_once %}
```
