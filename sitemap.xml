---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for page in site.pages %}
    {% if page.sitemap != null and page.sitemap != empty %}
      <url>
        <loc>{{ site.url }}{{ page.url }}</loc>
        {% if page.sitemap %}
          {% if page.sitemap.lastmod %}
          <lastmod>{{ page.sitemap.lastmod | date_to_xmlschema }}</lastmod>
          {% endif %}
          {% if page.sitemap.changefreq %}
          <changefreq>{{ page.sitemap.changefreq }}</changefreq>
          {% endif %}
          {% if page.sitemap.priority %}
          <priority>{{ page.sitemap.priority }}</priority>
          {% endif %}
        {% endif %}
       </url>
    {% endif %}
  {% endfor %}
  {% for post in site.posts %}
    <url>
      <loc>{{ site.url }}{{ site.baseurl }}{{ post.url }}</loc>
      {% if post.lastmod == null %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
      {% endif %}
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  {% endfor %}
</urlset>
