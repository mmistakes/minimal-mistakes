---
title: "Upcoming Open Mic - SHACL-based Object-ontological Mapping"
categories: [Open Mic Announcement, Open Mic]
---

The Open mic session starts on Friday 12th May 2023 at 10:30 at [this link](https://meet.jit.si/open-mic-kbss). Speaker [Martin Ledvinka](https://kbss.felk.cvut.cz/web/team#martin-ledvinka) opens the topic of SHACL-based object-ontological mapping.


##### The abstract

The [Java OWL Persistence API (JOPA)](https://github.com/kbss-cvut/jopa) is by now a production-proven persistence library for Semantic Web-based information systems.
A logic-based formalism exists for its OWL (2)-based object-ontological mapping, which uses integrity constraints with closed-world semantics. However,
OWL integrity constraints never gained much traction in the industry, so most of the JOPA-based object models are written by hand and rely only on the runtime
validation provided by the library itself.

SHACL is a W3C standard for defining and validating integrity constraints on RDF graphs. Supporting SHACL-based object-ontological mapping would greatly
improve the capabilities of JOPA. This talk will discuss preliminary findings on how to define such a mapping in a formal way.

Further reading:
* Ledvinka, M., Křemen, P.: Formalizing Object-Ontological Mapping Using F-logic. In: Rules and Reasoning. RuleML+RR 2019. Springer, Cham. https://doi.org/10.1007/978-3-030-31095-0_7 (2019)
* Tao, J., Sirin, E., Bao, J., McGuinness, D.L.: Integrity constraints in OWL. In: Proceedings of the Twenty-Fourth AAAI Conference on Artificial Intelligence (AAAI-10). AAAI Press (2010)
* Knublauch H, Kontokostas, D.: Shapes Constraint Language (SHACL), W3C Recommendation, 2017
