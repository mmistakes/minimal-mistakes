---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
permalink: /categories/
toc: true
header:
  overlay_image: "/assets/images/categories/main-category-3.jpg"
---

{% comment %}
For categories, the top level category will have "primary" in its categories and
the name of the category in category.

Then each layer after that will have the actual name of the category in the
"category" field, and the category above it that it belongs to, in "categories"

Currently this can only be layered 5 layers

For Example:
---------------
- english
|- poetry
 |- metaphore
 |- simile

english =
category: "english"
categories: primary

poetry =
category: "poetry"
categories: "english"

metaphore =
category: "metaphore"
categories: "poetry"

simile =
category: "simile"
categories: "poetry"

{% endcomment %}

# Categories
Find a category that interests you.

  {% for primary_pages in site.pages %}
    {% if primary_pages.categories contains "primary" %}
      {% assign primary_category = primary_pages.category %}

  *   [{{primary_pages.excerpt}}]({{primary_pages.url | prepend:site.baseurl }})

    {% for secondary_pages in site.pages %}
      {% if secondary_pages.categories contains primary_category %}
        {% assign secondary_category = secondary_pages.category %}

      *  [{{secondary_pages.excerpt}}]({{secondary_pages.url | prepend:site.baseurl }})

      {% for third_pages in site.pages %}
        {% if third_pages.categories contains secondary_category %}
          {% assign third_category = third_pages.category %}

          *   [{{third_pages.excerpt}}]({{third_pages.url | prepend:site.baseurl }})

        {% for fourth_pages in site.pages %}
          {% if fourth_pages.categories contains third_category %}
            {% assign fourth_category = fourth_pages.category %}

              *   [{{fourth_pages.excerpt}}]({{fourth_pages.url | prepend:site.baseurl }})

          {% for fifth_pages in site.pages %}
            {% if fifth_pages.categories contains fourth_category %}
              {% assign fifth_category = fifth_pages.category %}

                  *   [{{fifth_pages.excerpt}}]({{fifth_pages.url | prepend:site.baseurl }})
            {% for sixth_pages in site.pages %}
              {% if sixth_pages.categories contains fifth_category %}
                {% assign sixth_category = sixth_pages.category %}

                      *   [{{sixth_pages.excerpt}}]({{sixth_pages.url | prepend:site.baseurl }})

              {% for seventh_pages in site.pages %}
                {% if seventh_pages.categories contains sixth_category %}
                  {% assign seventh_category = seventh_pages.category %}

                          *   [{{seventh_pages.excerpt}}]({{seventh_pages.url | prepend:site.baseurl }})

                  {% endif %}
                {% endfor %}
                {% endif %}
              {% endfor %}
              {% endif %}
            {% endfor %}
            {% endif %}
          {% endfor %}
          {% endif %}
        {% endfor %}
      {% endif %}
    {% endfor %}
    {% endif %}
  {% endfor %}

# All Content By Categories
Find a post that interests you.

{% for first_sub in site.pages %}
  {% if first_sub.categories contains "primary" %}
    {% assign first_sub_cat = first_sub.category %}
    {% assign first_posts = site.categories[first_sub_cat] %}

*  [{{first_sub.excerpt}}]({{first_sub.url | prepend:site.baseurl }})

    {% for post in first_posts reversed %}

    *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

    {% endfor %}


  {% for second_sub in site.pages %}
    {% if second_sub.categories contains first_sub_cat %}
      {% assign second_sub_cat = second_sub.category %}
      {% assign second_posts = site.categories[second_sub_cat] %}

    *  __[{{second_sub.excerpt}}]({{second_sub.url | prepend:site.baseurl }})__

      {% for post in second_posts reversed %}

        *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

      {% endfor %}


    {% for third_sub in site.pages %}
      {% if third_sub.categories contains second_sub_cat %}
        {% assign third_sub_cat = third_sub.category %}
        {% assign third_posts = site.categories[third_sub_cat] %}

        *  __[{{third_sub.excerpt}}]({{third_sub.url | prepend:site.baseurl }})__

        {% for post in third_posts reversed %}

            *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

        {% endfor %}


      {% for fourth_sub in site.pages %}
        {% if fourth_sub.categories contains third_sub_cat %}
          {% assign fourth_sub_cat = fourth_sub.category %}
          {% assign fourth_posts = site.categories[fourth_sub_cat] %}

           *  __[{{fourth_sub.excerpt}}]({{fourth_sub.url | prepend:site.baseurl }})__

          {% for post in fourth_posts reversed %}

               *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

          {% endfor %}

        {% for fifth_sub in site.pages %}
          {% if fifth_sub.categories contains fourth_sub_cat %}
            {% assign fifth_sub_cat = fifth_sub.category %}
            {% assign fifth_posts = site.categories[fifth_sub_cat] %}

               *  __[{{fifth_sub.excerpt}}]({{fifth_sub.url | prepend:site.baseurl }})__

            {% for post in fifth_posts reversed %}

                   *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

            {% endfor %}

          {% for sixth_sub in site.pages %}
            {% if sixth_sub.categories contains fifth_sub_cat %}
              {% assign sixth_sub_cat = sixth_sub.category %}
              {% assign sixth_posts = site.categories[sixth_sub_cat] %}

                   *  __[{{sixth_sub.excerpt}}]({{sixth_sub.url | prepend:site.baseurl }})__

              {% for post in sixth_posts reversed %}

                       *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

              {% endfor %}

            {% for seventh_sub in site.pages %}
              {% if seventh_sub.categories contains sixth_sub_cat %}
                {% assign seventh_sub_cat = seventh_sub.category %}
                {% assign seventh_posts = site.categories[seventh_sub_cat] %}

                        *  __[{{seventh_sub.excerpt}}]({{seventh_sub.url | prepend:site.baseurl }})__

                {% for post in seventh_posts reversed %}

                           *  [{{post.title}}]({{post.url | prepend:site.baseurl }})

                {% endfor %}

              {% endif %}
            {% endfor %}
            {% endif %}
          {% endfor %}
          {% endif %}
        {% endfor %}
        {% endif %}
      {% endfor %}
      {% endif %}
    {% endfor %}
    {% endif %}
  {% endfor %}
  {% endif %}
{% endfor %}
