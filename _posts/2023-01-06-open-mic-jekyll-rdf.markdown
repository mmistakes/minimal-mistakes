---
title: "RDF support for Jekyll"
categories: [Open Mic Session, Open Mic]
excerpt: "Jekyll RDF is a plugin for Jekyll allowing rendering static web based on the RDF file. This Open mic introduces the basis of installation and usage of the Jekyll RDF plugin."
---

{% include figure image_path="assets/images/openmics/2023-01-06-rdf-jekyll.png" alt="Michal Med - RDF Support in Jekyll" %}{: .post-image }

On the 6th January, speaker [Michal Med](https://kbss.felk.cvut.cz/web/team#michal-med) introduced a talk about Jekyll RDF - a plugin for rendering RDF data into static pages. Record of the speech is available in this video.

{% include video id="ojWk6FeOrV0" provider="youtube" %}

Jekyll is a simple static site generator for personal, project, or organisation sites. We have used it in the past for the [KBSS web site](https://kbss.felk.cvut.cz/) or [termit documentation](https://kbss-cvut.github.io/termit-web/). This Ruby based site generator by Tom Peterson-Werner allows easy support for themes and plugins, especially using [Bundler](https://bundler.io) by simply adding them to the Gemfile and rebuilding bundle.

```gem "jekyll-rdf", "~> 3.2"```

```bundle update```

Jekyll RDF is a plugin for Jekyll to support rendering RDF data based on the given templates. Resource description Framework (RDF) is a standard model for data interchange, using graphs instead of tables. Rendering RDF data into the web pages is the basis of the semantic web approach as defined by Tim Berners-Lee.

Jekyll RDF allows users to render data with multiple layouts for different classes or instances or access data directly from the triple store using SPARQL endpoint.

Presentation contains installation and basic configuration of the plugin and live demo with minimal running example.

The text presentation is available [at this link](https://drive.google.com/file/d/1CcnLG9yGV9sLmtvEKK9XJ0OBlfKE7M2g/view?usp=sharing).

##### Further reading
* [Jekyll](https://jekyllrb.com/)
* [RDF Jekyll](https://github.com/AKSW/jekyll-rdf/tree/5a675591a7f08593f7ba1b1cdb0257d00b568d4d)
* [Resource Description Framework](https://www.w3.org/RDF/)
* [Semantic web](https://www.w3.org/standards/semanticweb/)
* Arndt, N., Zänker, S., Sejdiu, G., Tramp, S. (2019). Jekyll RDF: Template-Based Linked
Data Publication with Minimized Effort and Maximum Scalability. In: Bakaev, M.,
Frasincar, F., Ko, IY. (eds) Web Engineering. ICWE 2019. Lecture Notes in Computer
Science(), vol 11496. Springer, Cham. https://doi.org/10.1007/978-3-030-19274-
7_24
