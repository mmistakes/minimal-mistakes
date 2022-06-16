---
layout: single
title: Ontologies and Software
permalink: /software
lang: en
lang-ref: software
toc: true
toc_sticky: true
author_profile: true

header:
  image: /assets/images/software/software.jpg
  caption: "Photo credit: [**Markus Spiske**](https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"
---

The KBSS team produces mainly two types of artefacts -- ontologies and software. We develop ontology-based domain-specific information systems as well as tools to maintain ontologies.

## Ontologies

Ontology design is one of our primary research topics. We have built several ontologies as part of our research projects. The most iportant ontologies are here.

### TermIt Ontology

Ontology to describe resources as they are used in [TermIt](#termit) software. It reuses [Dataset description ontology](#dataset-description-ontology).


[GitHub repository with Turtle serialization](https://github.com/kbss-cvut/termit/tree/master/ontology){: .btn .btn--info}


### Aviation Safety Ontology

Modular ontology for safety reporting in high-risk industries, mainly for aviation.

[Docs and serialization](https://www.inbas.cz/aviation-safety-ontology){: .btn .btn--info}


### Urban Ontology

The Urban ontology unifies terminology in the urban planning domain, developed in cooperation with the [Prague Institute of Planning and Development](https://iprpraha.cz/en/).

[OWLGred visualization](http://owlgred.lumii.lv/online_visualization/l4wh){: .btn .btn--info}
[OWL serialization](http://kbss.felk.cvut.cz/ontologies/town-plan/ontology.owl){: .btn .btn--info}


### Dataset Description Ontology

It is an ontology for describing dataset exploration scenario. The ontology design is based on UFO and is done with respect to OntoUML methodology.

The ontology is actively used in the [Dataset dashboard](http://onto.fel.cvut.cz/dataset-dashboard) system for exploring linked datasets.

[OWL serialization](http://onto.fel.cvut.cz/ontologies/ddo){: .btn .btn--info}
[Dataset dashboard](http://onto.fel.cvut.cz/dataset-dashboard){: .btn .btn--info}


### [Operation Unified Foundational Ontology (UFO)](http://onto.fel.cvut.cz/ontologies/ufo)

Operational version of the UFO Ontology describes basic notions of UFO in terms of the Web Ontology Language, possibly extended with SWRL rules.
The main goals of the ontology are

1. to provide easy way to link UFO-related terms to applications, resources, as well as multimedia,
2. to provide a computable artifact for basic reasoning and UFO-compliant data integration.

[OWL serialization](http://onto.fel.cvut.cz/ontologies/ufo){: .btn .btn--info}


## Software

We develop end user systems and tools as well software libraries used by other systems.

### End User Tools and Systems

#### TermIt

TermIt is a SKOS-compatible terminology manager and editor.

[TermIt Website](https://kbss-cvut.github.io/termit-web/){: .btn .btn--info}
[Source code - backend](https://github.com/kbss-cvut/termit){: .btn .btn--info}
[Source code - frontend](https://github.com/kbss-cvut/termit-ui){: .btn .btn--info}


#### Dataset Dashboard

The dataset dashboard is a tool for getting a quick overview over a SPARQL endpoint, or a graph inside a SPARQL endpoint.

[Detailed description]({{"/software/dataset-dashboard" | relative_url}}){: .btn .btn--info}
[Source code](https://github.com/kbss-cvut/dataset-dashboard){: .btn .btn--info}

#### OntoMind

OntoMind is a tool for semantic mind mapping. We used it in the [MONDIS project](https://mondis.cz) for monument damage example management.

[Detailed description]({{"/software/ontomind" | relative_url}}){: .btn .btn--info}


#### OWLDiff

OWLDiff is a project aiming at providing diff/merge functionality for OWL ontologies.

[Detailed description]({{"/software/owldiff" | relative_url}}){: .btn .btn--info}
[Source code](https://github.com/kbss-cvut/owldiff){: .btn .btn--info}


### Libraries

#### Java OWL Persistence API (JOPA)

JOPA is a persistence API and implementation for accessing semantic data.

[Detailed description and documentation](https://github.com/kbss-cvut/jopa/wiki){: .btn .btn--info}
[Source code](https://github.com/kbss-cvut/jopa){: .btn .btn--info}

#### Java Binding for JSON-LD (JB4JSON-LD)

JB4JSON-LD is a library for convenient serialization and deserialization of POJOs into/from JSON-LD.
Its main goal is to simplify publishing semantic content through REST services.

[Detailed description and documentation](https://github.com/kbss-cvut/jb4jsonld/wiki){: .btn .btn--info}
[Source code](https://github.com/kbss-cvut/jb4jsonld){: .btn .btn--info}

#### SPipes

SPipes is tool for managing semantic pipelines defined in RDF inspired by the [SPARQLMotion](https://sparqlmotion.org/) language.
Each node in a pipeline represents some stateless transformation of data.

[Source code](https://github.com/kbss-cvut/s-pipes){: .btn .btn--info}

#### SForms

Semantic form generator and processor for ontology-based smart forms.

[Source code](https://github.com/kbss-cvut/s-forms){: .btn .btn--info}

#### OWL2Query

OWL2Query is an expressive query and meta-query engine and visualization kit supporting OWL 2 DL and SPARQL-DL with negation as failure.

[Detailed description]({{"/software/owl2query" | relative_url}}){: .btn .btn--info}
[Source code](https://github.com/kbss-cvut/owl2query){: .btn .btn--info}
