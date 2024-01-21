---
layout: null
---
[
    {% for post in site.posts %}
        {
        "title"    : "{{ post.title | escape }}",
        "category" : "{{ post.category }}",
        "tags"     : "{{ post.tags | join: ', ' }}",
        "url"      : "{{ site.baseurl }}{{ post.url }}",
        "date"     : "{{ post.date }}"
        } {% unless forloop.last %},{% endunless %}
    {% endfor %}
]