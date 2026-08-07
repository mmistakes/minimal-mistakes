---
title: "AI Feed"
layout: single
author_profile: true
permalink: /ai-feed/
---

Rassegna automatica da Hugging Face, arXiv, OpenAI, Anthropic, Google DeepMind e The Batch. Aggiornata ogni giorno, ogni titolo rimanda alla fonte originale.

{% assign items = site.data.ai_feed %}
{% if items and items.size > 0 %}
<ul class="ai-feed-list">
{% for item in items %}
  <li class="ai-feed-item">
    <span class="ai-feed-source">{{ item.source }}</span>
    {% if item.date and item.date != "" %}<span class="ai-feed-date">{{ item.date }}</span>{% endif %}
    <a href="{{ item.link }}" target="_blank" rel="noopener">{{ item.title }}</a>
  </li>
{% endfor %}
</ul>
{% else %}
Feed non ancora generato: il primo aggiornamento arriva al prossimo run schedulato dell'Action (o si può lanciare a mano da GitHub Actions, workflow "Update AI Feed").
{% endif %}
