---
layout: single
title: "Arbeitsgemeinschaften"
permalink: /ags/
author_profile: false
excerpt: "Alles Wichtige über die Arbeitsgemeinschaften (AGs) an der Brandwerder."
modified: 2018-10-02T22:08:00+01:00
header:
  overlay_color: "#fff"
  overlay_image: /assets/images/feature-ags.jpg
sidebar:
  nav: 'ags'
---

{% include abkuerzungen.md %}

Arbeitsgemeinschaften (AGs) sind außerunterrichtliche Angebote auf freiwilliger
Basis. Eine regelmäßige Teilnahme ist Voraussetzung.

<!-- {% include outdated.md %} -->

**Achtung**: Bitte beachten Sie, dass alle hier genannten Daten abweichen
können. Vor allem die Kursgebühren können sich ändern.
{: .notice--warning}

# Kursangebote im Schuljahr 2018/19
{: #toc}

**Achtung**: AG Beginn ab 10.09.2018, Zirkus ab 05.10.2018.
{: .notice--warning}

{% assign monday = "" | split: "" %}
{% assign tueday = "" | split: "" %}
{% assign wedday = "" | split: "" %}
{% assign thuday = "" | split: "" %}
{% assign friday = "" | split: "" %}

{% for ag in site.ags %}
  {% for time in ag.times %}
    {% capture ag_row %}
<tr>
  <td>{{time.start | date: "%H:%M"}} - {{time.end | date: "%H:%M"}}</td>
  <td>
    {% capture title %}{% include icon_text icon=ag.icon text=ag.title %}{% endcapture %}
    {% if ag.hash %}
    <a href="{{ag.hash}}">{{title}}</a>
    {% else %}
    {{title}}
    {% endif %}
    <br>
    <i>{{ag.teacher}}</i>
  </td>
  <td>{{time.grade}}</td>
  <td>{{ag.place}}</td>
</tr>
    {% endcapture %}
    {% assign weekday = time.start | date: "%w" | to_integer %}
    {% case weekday %}
      {% when 1 %}
        {% assign monday = monday | push: ag_row %}
      {% when 2 %}
        {% assign tueday = tueday | push: ag_row %}
      {% when 3 %}
        {% assign wedday = wedday | push: ag_row %}
      {% when 4 %}
        {% assign thuday = thuday | push: ag_row %}
      {% when 5 %}
        {% assign friday = friday | push: ag_row %}
    {% endcase %}
  {% endfor %}
{% endfor %}

<table>
  <thead>
    <tr>
      <th>Wann</th>
      <th>Thema</th>
      <th>Kl.</th>
      <th>Ort</th>
    </tr>
  </thead>
  <tbody>
    {% if monday.size > 0 %}
      <tr>
        <td colspan="6">Montag</td>
      </tr>
      {{ monday }}
    {% endif %}
    {% if tueday.size > 0 %}
      <tr>
        <td colspan="6">Dienstag</td>
      </tr>
      {{ tueday }}
    {% endif %}
    {% if wedday.size > 0 %}
      <tr>
        <td colspan="6">Mittwoch</td>
      </tr>
      {{ wedday }}
    {% endif %}
    {% if thuday.size > 0 %}
      <tr>
        <td colspan="6">Donnerstag</td>
      </tr>
      {{ thuday }}
    {% endif %}
    {% if friday.size > 0 %}
      <tr>
        <td colspan="6">Freitag</td>
      </tr>
      {{ friday }}
    {% endif %}
  </tbody>
</table>

{% for ag in site.ags %}
{% if ag.hash %}
{% capture ag_title %}AG {{ag.title}}{% endcapture %}
## {% include icon_text icon=ag.icon text=ag_title %}
{: {{ag.hash}}}

{%- capture time_text -%}
{%- for time in ag.times -%}
  {%- if forloop.index > 1 -%}
    {{"; "}}
  {%- endif -%}
  {%- assign weekday = time.start | date: "%w" | to_integer -%}
    {{site.data.weekdays[weekday]}}, {{time.start | date: "%H:%M"}} - {{time.end | date: "%H:%M"}}{{time.extra}}
{%- endfor -%}
{%- endcapture -%}

{% if ag.teacher and site.data.authors[ag.teacher] %}
{% assign teacher = site.data.authors[ag.teacher] %}
{% else %}
{% assign teacher = null %}
{% endif %}

{%- capture teacher_text -%}
{%- if teacher and teacher.uri -%}
{%- include external_link url=teacher.uri text=ag.teacher -%}
{%- else -%}
{{ag.teacher}}
{%- endif -%}
{%- endcapture -%}

{% comment %}
{% include outdated.md %}
{% endcomment %}

{{ ag.content | markdownify }}

| Kursleiter*in | Wann? | Wo? | Für wen? |
|---|---|---|---|
| {{teacher_text}} | {{time_text}} | {{ag.place}} | {{ag.grade}} |

| Material | Kosten | Teilnehmerzahl |
|---|---|---|
| {{ag.material}} | {{ag.costs}} | {{ag.participants}} |

{% if ag.register %}
[Anmelden]({{ag.register}}){: .btn .btn--success}
{: .text-right}
{% endif %}

{% endif %}
{% endfor %}
