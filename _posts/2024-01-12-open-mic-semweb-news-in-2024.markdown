---
title:  "Semantic Web - What Is Coming in 2024?"
categories: [Open Mic Session, Open Mic]
excerpt: "The presentation discussed news in Semantic Web-related standards likely to appear in 2024."
---

On Friday 12th January, [Martin Ledvinka](https://kbss.felk.cvut.cz/web/team#martin-ledvinka) held an Open Mic session with the topic \"Semantic Web - What Is Coming in 2024?\"

{% include video id="d1lfWU4b4es" provider="youtube" %}

##### The abstract

New versions of core Semantic Web standards (mainly RDF and SPARQL) are currently being prepared. These new versions do not represent
major changes. Instead, they mostly extend the standards with new features. Details can be found in the presentation, but the
most significant addition across the board is support for _quoted triples_ which is basically adapting outputs
of the [RDF-Star](https://w3c.github.io/rdf-star/cg-spec/editors_draft.html) working group to RDF, its serializations, and SPARQL.

The new feature extends RDF reification, which was somewhat cumbersome to use, with a new, succinct syntax, allowing one to
easily make _statements about statements_. To give a brief example, the following statement says that "according to Tom, the sky is blue".
However, note that the triple `:sky :has-color :blue` is actually not asserted in the dataset by this statement. If we wanted
to make such assertion, we would have to do it explicitly.

```ttl
<< :sky :has-color :blue >> :according-to :tom .
```

The presentation goes into the details of this (and other changes), as well as discussing the upcoming releases of [Apache Jena 5](https://jena.apache.org/)
and [Eclipse RDF4J 5](https://rdf4j.org/) - critical Java libraries for working with RDF data.

The presentation slides are available [at this link](https://docs.google.com/presentation/d/1Tl2ATkGPqKSaivzk3UXr0OAy3aCOrMUlrdmeZQxV76s/edit?usp=sharing).

Further reading:
- [RDF 1.2](https://www.w3.org/TR/rdf12-concepts) (working draft as of 2024-01-12)
- [SPARQL 1.2](https://www.w3.org/TR/sparql12-query/) (working draft as of 2024-01-12)
