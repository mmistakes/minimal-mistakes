---
title:  "Debugging SPARQL queries through algebra"
categories: [Open Mic Session, Open Mic]
excerpt: "The talk will explore a few perplexing examples of SPARQL queries, illustrating how the translation can be used to understand/debug such queries."
---

On Friday 24th November speaker [Miroslav Blaško](https://kbss.felk.cvut.cz/web/team#miroslav-blaško) gave a speech about Debugging SPARQL Queries using algebra. Video and presentation included.

{% include video id="Bsp_N7xzrP0" provider="youtube" %}

emantics of SPARQL queries can be expressed by SPARQL Algebra. Tools like [SPARQL Validator](http://sparql.org/query-validator.html) provides [translation of SPARQL queries into its algebraic representation](https://www.w3.org/TR/2013/REC-sparql11-query-20130321/#sparqlQuery).
The talk will explore a few perplexing examples of SPARQL queries, illustrating how the translation can be used to understand/debug such queries.

Discussion about the evaluation of queries followed, but is not part of the record.  Within the discussion we found out that execution of the same query [1] results in two different results in Eclipse RDF4J and Ontotext GraphDB.  While Eclipse RDF4J returns one result as expected from the translation to algebra as defined in SPARQL 1.1 W3C Recommendation , Ontotext GraphDB returned two results which is on the other hand more intuitive.

Query [1]:

    SELECT ?person ?image
    WHERE {
        OPTIONAL { ?person :has-image ?image }   
        ?person a :Person .
    }


The presentation slides are available [at this link](https://drive.google.com/file/d/12X3Hg2CFn67ogZGKuyUgbkNXENPn_LS5/view?usp=drive_link).

Further reading:
* [SPARQL 1.1 Query Language / 18.5 SPARQL Algebra](https://www.w3.org/TR/sparql11-query/#sparqlAlgebra)
* "[Knowledge Graphs, Lecture 6: SPARQL Semantics](https://iccl.inf.tu-dresden.de/w/images/c/c9/KG2021-Lecture-06-overlay.pdf)", TU Dresden, Faculry of Computer Science, 2021.
