---
title: 데이터사이언스 & 빅데이터 특수대학원 합격 tip 배포
layout: single
permalink: /특수대학원/
gallery_path: "assets/image"
sidebar:
    nav: "sidebar-category"
---

{% capture fig_img %}
![special_tip]({{ '/assets/images/data-scientist-diagram.png' | relative_url }})
{% endcapture %}

<figure style="width: 100%">
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.tibco.com/ko/reference-center/what-is-a-data-scientist</figcaption>
</figure>

본 카테고리에서는 <span style="color:#0174DF"><b>빅데이터 & 데이터사이언스 특수대학원</b></span>에 대해 소개하고, 현재 재학 중인 저의 경험과 저에게 많은 도움을 주신 타 대학 선배님들과 동기님들의 경험을 토대로 수집한 내용들을 정리 & 공유할 예정입니다.

**Notice:** 본 콘텐츠의 저작권은 네이버 카페 ‘대학원 입학을 준비하는 사람들의 모임’에서 활동하고 MapJun.com의 블로거 ‘맵준’에게 있고, 저작권자에게 직접 받지 않고 무단 도용, 복제, 배포 및 사용을 금하며 저작권자의 허락 없이 무단 사용 시 관계 법령에 따라 처벌받습니다. 2차 저작물로 재편집하는 경우, 5년 이하의 징역 또는 5천만 원 이하의 벌금과 민사상 손해배상을 청구합니다.
{: .notice}

>질문 있으시면, 언제든 편히 메일로 문의해 주세요!!😁

## 포스팅 항목

{% assign posts = site.categories.['특수대학원'] %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}