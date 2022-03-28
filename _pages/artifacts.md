---
layout: single
title: Artifacts
permalink: /artifacts
lang: en
lang-ref: artifacts
toc: true
toc_sticky: true
author_profile: true
---

This page contains some of the research artifacts produced by the group.

## Ontologies

Ontology design is one of our primary research topics. We have built several ontologies as part of our research projects. Here are some of them.

### Aviation Safety Ontology

Modular ontology for safety reporting in high-risk industries, mainly for aviation.

#### Links

- [Docs and serialization](https://www.inbas.cz/aviation-safety-ontology)


### Urban Ontology

The Urban ontology unifies terminology in the urban planning domain, developed in cooperation with the [Prague Institute of Planning and Development](https://iprpraha.cz/en/).

#### Links

- [OWLGred visualization](http://owlgred.lumii.lv/online_visualization/l4wh)
- [OWL serialization](http://kbss.felk.cvut.cz/ontologies/town-plan/ontology.owl)


### Dataset Descriptor Ontology

It is an ontology for describing dataset exploration scenario. The ontology design is based on UFO and is done with respect to OntoUML methodology. 

The ontology is actively used in the [Dataset dashboard](http://onto.fel.cvut.cz/dataset-dashboard) system for exploring linked datasets.

#### Links

- [OWL serialization](http://onto.fel.cvut.cz/ontologies/ddo)
- [Dataset dashboard](http://onto.fel.cvut.cz/dataset-dashboard)


### [Operation Unified Foundational Ontology (UFO)](http://onto.fel.cvut.cz/ontologies/ufo)

Operational version of the UFO Ontology describes basic notions of UFO in terms of the Web Ontology Language, possibly extended with SWRL rules.
The main goals of the ontology are 

1. to provide easy way to link UFO-related terms to applications, resources, as well as multimedia, 
2. to provide a computable artifact for basic reasoning and UFO-compliant data integration.

#### Links

- [OWL serialization](http://onto.fel.cvut.cz/ontologies/ufo)


## Software

We develop end user systems and tools as well software libraries used by other systems.

### End User Tools and Systems

#### Dataset Dashboard

The dataset dashboard is a tool for getting a quick overview over a SPARQL endpoint, or a graph inside a SPARQL endpoint.

##### Links

- [Detailed description](/artifacts/sw/dataset-dashboard)
- [Source code](https://github.com/kbss-cvut/dataset-dashboard)

#### TermIt

TermIt is a SKOS-compatible terminology manager and editor.

##### Links

- [TermIt Website](https://kbss-cvut.github.io/termit-web/)
- Source code ([backend](https://github.com/kbss-cvut/termit) and [frontend](https://github.com/kbss-cvut/termit-ui))

#### OntoMind

OntoMind is a tool for semantic mind mapping. We used it in the [MONDIS project](https://mondis.cz) for monument damage example management.

##### Links

- [Detailed description](/artifacts/sw/ontomind)
- TODO Source code?

#### OWLDiff

OWLDiff is a project aiming at providing diff/merge functionality for OWL ontologies.

##### Links

- [Detailed description](/artifacts/sw/owldiff)
- [Source code](https://github.com/kbss-cvut/owldiff)


### Libraries

#### Java OWL Persistence API (JOPA)

JOPA is a persistence API and implementation for accessing semantic data.

##### Links

- [Detailed description and documentation](https://github.com/kbss-cvut/jopa/wiki)
- [Source code](https://github.com/kbss-cvut/jopa)

#### Java Binding for JSON-LD (JB4JSON-LD)

JB4JSON-LD is a library for convenient serialization and deserialization of POJOs into/from JSON-LD. 
Its main goal is to simplify publishing semantic content through REST services.

- [Detailed description and documentation](https://github.com/kbss-cvut/jb4jsonld/wiki)
- [Source code](https://github.com/kbss-cvut/jb4jsonld)

#### SPipes

SPipes is tool for managing semantic pipelines defined in RDF inspired by the [SPARQLMotion](https://sparqlmotion.org/) language. 
Each node in a pipeline represents some stateless transformation of data.

##### Links

- [Source code](https://github.com/kbss-cvut/s-pipes)

#### SForms

Semantic form generator and processor for ontology-based smart forms.

##### Links

- [Source code](https://github.com/kbss-cvut/s-forms)

#### OWL2Query

OWL2Query is an expressive query and meta-query engine and visualization kit supporting OWL 2 DL and SPARQL-DL with negation as failure.

##### Links

- [Detailed description](/artifacts/sw/owl2query)
- [Source code](https://github.com/kbss-cvut/owl2query)
