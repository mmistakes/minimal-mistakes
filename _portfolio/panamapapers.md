---
title: "Investigation: Bristol in the Panama Papers"
permalink: /portfolio/panamapapers/
excerpt: "Bristol addresses appeared in the Panama Papers. We took a closer look."
header: 
  image: bristol-panama.jpg
  teaser: panamapapers-gephi_teaser.png
  layout: portfolio-single
date: 2016-07-15 00:40:45
sidebar:
  - title: "Main Tools"
    text: "Tableau; import.io; OpenRefine; Gephi; Carto"
  - title: "Published"
    text: "Online; Issue 8 print edition"
  - title: "Publisher"
    text: The Bristol Cable
---

The ICIJ's Offshore Leaks Database shows <a href="https://offshoreleaks.icij.org/search?c=GBR&cat=3&d=&e=&j=&q=bristol&utf8=%E2%9C%93">a few dozen addresses with a Bristol postcode</a>. Together with Alec Saelens and Sid Ryan, we looked at what the connection was between Bristol and offshore finance.

We focused on 31 Arden Close because when we put its address into Companies House, we found <a href="https://beta.companieshouse.gov.uk/search?q=BS32+8AX">hundreds of companies</a>. We found this was the registered office for a local and family-run incorporation company: Ordered Management Ltd. However, this company was only in the ICIJ database because of one man: Frank LeMarec. It was this connection we looked to explore.

Frank Le Marec, it turned out, also registered companies for people, and was connected to websites offering companies in tax havens.

In order to track the connection between Le Marec and Ordered Management, we scraped Companies House, and additonally used Open Corporates' API.

We pulled that data into Tableau to identify which companies were associated, and built a small tool in Tableau to view company officer statuses in a timeline.

![Council House Resales Article]({{ site.url }}/images/pp_timeline.png)

A great deal of document searching was nonetheless needed, as we could not scrape company ownership data, though it was hidden in documents on Companies House. We followed papertrails and through Open Coporates and the Companies Houses of other countries.

I mapped the Arden Close companies' connections in Gephi, and while it made a nice graphic showing a company incorporation structure, it wasn't especially useful.

<a href="/images/panamapapers-gephi.png">![Panama Papers graph]({{ site.url }}/images/panamapapers-gephi.png)</a>

Through analysing the data and records we found Ordered Management, the management company at the Bristol address, not only assited in creating companies for Le Marec, but also held companies as a shareholder. We could not find evidence of this relationship happening between Ordered Management and other companies. However, frustratingly, through following the paths of shell companies and nominee directors, the trail inevitably ran into the brickwall of the Seyshell's opaque company registrar.

The research ultimately elucidated how a local address can end up in something such as the Panama Papers. In this case, it was through using a company registration office as a registered address. Through looking at this case we explored how and why certain company structures exist and why certain dealings are conducted. The frustration of not quite finding all the crucial details because of these structures demonstrates why these structures are used, and why they continue to be a problem for tax authorities.

<a href="/images/panama-papers-bristol.png">![Bristol Panama Papers Article]({{ site.url }}/images/panama-papers-bristol.png){:height="500px" width="460px"}</a>


<a href="https://thebristolcable.org/2016/07/bristol-in-the-panama-papers/">Read the article online</a>.