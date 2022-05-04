---
layout: single
title: Dataset Dashboard
permalink: /software/dataset-dashboard
lang: en
lang-ref: dataset-dashboard
author_profile: true
classes: wide
---

The dataset dashboard is a tool for getting a quick overview over a SPARQL endpoint, or a graph inside a SPARQL endpoint.

Its current widgets include:

- summary descriptor
- basic class/property statistics
- spatial descriptor
- temporal descriptor

To use the application you can either:

- go to [http://onto.fel.cvut.cz/dataset-dashboard](http://onto.fel.cvut.cz/dataset-dashboard), in case you want to overview a predefined dataset
- make a request of the form `https://onto.fel.cvut.cz/dataset-dashboard/#/dashboard/online?endpointUrl=<ENDPOINT_URL>&graphIri=<GRAPH_IRI>`, where `<ENDPOINT_URL>`
 is the url-encoded URL of a SPARQL endpoint and `<GRAPH_IRI>` is an identifier of a graph inside the endpoint, for example [https://onto.fel.cvut.cz/dataset-dashboard/#/dashboard/online?endpointUrl=https://linked.opendata.cz/sparql&graphIri=http://data.czso.cz/resource/dataset/average-salaries](https://onto.fel.cvut.cz/dataset-dashboard/#/dashboard/online?endpointUrl=https://linked.opendata.cz/sparql&graphIri=http://data.czso.cz/resource/dataset/average-salaries)

The system is built on our stack:
- [JOPA](https://github.com/kbss-cvut/jopa)
- [SPipes](https://github.com/kbss-cvut/s-pipes)
- [Dataset Descriptor Ontology](/artifacts/#dataset-descriptor-ontology)

The source code is available on GitHub at [https://github.com/kbss-cvut/dataset-dashboard](https://github.com/kbss-cvut/dataset-dashboard).
