---
layout: default
---
{% assign docs_by_category = site.documentation | group_by: "category" | reverse %}
<ul id="search-results">
    <h2 class="searching-text">Searching.....</h2>
</ul>
<script>
  window.store = {
    {% for category in docs_by_category %}
        {% for item in category.items %}
          "{{ item.url | slugify }}" :{
            "title": "{{ item.title | xml_escape }}",
            "content": {{ item.content | strip_html | strip_newlines | jsonify }},
            "url": "{{ item.url | xml_escape }}"
          }
          {% unless forloop.last %},{% endunless %}
        {% endfor %}
        ,
    {% endfor %}
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
<script src="{{ '/assets/js/jquery-3.2.1.min.js' | relative_url }}"></script>
<script src="{{ '/assets/js/lunr.min.js' | relative_url }}"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}" ></script>
{% include deeplink.html %}
