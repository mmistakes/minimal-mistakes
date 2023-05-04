---
layout: single
title: OWL2Query
permalink: /software/owl2query
lang: en
lang-ref: owl2query
author_profile: true
classes: wide
---

OWL2Query is an expressive query and meta-query engine and visualization kit with the following features:

- OWL 2 support
- SPARQL-DL + negation as failure
- OWLAPI integration
- [Protégé plugin](http://protegewiki.stanford.edu/wiki/OWL2Query) (documentation - TODO)

The project is hosted at [GitHub](https://github.com/kbss-cvut/owl2query). OWL2Query artifacts can be downloaded from the Maven repository [https://kbss.felk.cvut.cz/m2repo](https://kbss.felk.cvut.cz/m2repo):

__Visualization library__

```xml
<dependency>
    <groupId>cz.cvut.kbss</groupId>
    <artifactId>owl2querygraph</artifactId>
</dependency>
```
__Reasoning library__
```xml
<dependency>
    <groupId>cz.cvut.kbss</groupId>
    <artifactId>owl2query</artifactId>
</dependency>
```

## Examples
Here are three query examples. In the screenshots we show the plug-in integrated in Protégé 4.1. The query is drawn in the graph area,
and it is executed with the pellet reason. The name of the file that is currently associated with the query is shown in the title at the top of the tab.
The toolbar under it contains tools as : demo query , new query , open query, save query, switch between graph and SPARQL view,
undo and redo graph changes. On the next line in the GUI we have a split view that contains on the left prefix editor and
on the right a tab view with var editor and layout editor. Under this view there is the graph area. On the right side of the graph
area we can see a node editor. Under the graph is a serialization of the query in SPARQL-DL syntax. Last row in the GUI is the
result area with a run button and a result table. On the right of the screenshots we can see other Protégé views.
They are present to show selection integration between the plug-in and other parts of Protégé.

### Example 1

The first query is used to find all the graduate students that are related to a course and find what kind of relationship.
It is a mixed ABox Rbox query. In SPARQL-DL this query is written in using two type atoms and a property value atom:

`Q(?z, ?y, ?x) :- PropertyValue(?y, ?x, ?z), Type(<Course>, ?z), Type(<GraduateStudent>, ?x).`

{% include figure image_path="/assets/images/owl2query/sparqlexample1.png" alt="OWL2Query query example 1" %}

In the graph in the ABox area we have the property value query atom. It is represented using two ABox nodes for the subject
and object of the property and an arrow that goes through the property node witch represents the property itself.
Arrows with "type" stereotype to a TBox nodes in the TBox area represent the type atoms in the query. The red color represents a variable.
The yellow color is used to represent constants. Selection GraduateStudent97 in the result table is update also in the Protégé.
On the right in the Protégé's Idividuals view we can see that individual GraduateStudent97 is also selected.

### Example 2

This query is used to find all the students who are also employees and find what kind of employee. This is a mixed ABox TBox query.
In SPARQL-DL the query is represented with two type atoms and one subclass of atom:

`Q(C, x) :- Type(?C, ?x) T(<Student>, ?x), SubClassOf(?C, <Employee>).`

{% include figure image_path="/assets/images/owl2query/sparqlexample2.png" alt="OWL2Query query example 2" %}

As in the first example the type atoms are represented as arrows from a ABox node to a TBox node with a "type" stereotype.
The Subclass atom is represented as an arrow from the variable TBox node to a constant TBox node with stereotype "SubClassOf".
Note column selection in the result table is the same as the selection in the graph and the variable editor.

### Example 3

This query is used to find all the members of Depatment0 and what kind of membership. This is a mixed ABox RBox query as the first example,
but this time we add constraints to the property node in the RBox area. In SPARQL-DL the query has one type atom, one property value atom
and one sub property atom:

`Q(y, x) :- SubPropertyOf(?y,<memberOf>), PropertyValue(?y,?x,<Department0>), Type(<Person>, ?x).`

{% include figure image_path="/assets/images/owl2query/sparqlexample3.png" alt="OWL2Query query example 3" %}

In the graph the sub property of atom is represented as an arrow between two Rbox nodes in the RBox area with a "SubPropertyOf" stereotype.
This graph has two nodes that contain the label representing the variable y. This means that the nodes reference the same term from different
parts of the query. This fact is represented in the graph interactively. When the user tries to interact with the node's borders
that reference the same term are emphasized. Also, a dashed line drawn to the other nodes using the same term.

## Publications

- Petr Křemen and Bogdan Kostov. [Expressive OWL queries: design, evaluation, visualization](https://dl.acm.org/citation.cfm?id=2607601). accepted to International Journal on Semantic Web and Information Systems. 2012.
- Petr Křemen and Zdeněk Kouba. [Conjunctive Query Optimization in OWL2-DL](http://www.springerlink.com/content/x571113660m36144). In: Database and Expert Systems Applications. 22nd International Conference on Database and Expert Systems Applications. Toulouse, 29.08.2011 - 02.09.2011. Berlin: Springer-Verlag. 2011, pp. 188-202. Lecture Notes in Computer Science. ISSN 0302-9743. ISBN 978-3-642-23090-5.
- Bogdan Kostov and Petr Křemen, "OWL2Query Protégé plugin: Graphical editor for SPARQL-DL queries", Conference Znalosti 2012
- Bogdan Kostov and Petr Křemen. [Count Aggregation in Semantic Queries](http://ceur-ws.org/Vol-1046/SSWS2013_paper1.pdf). In: Liebig, T. and Fokoue, A., eds. Proceedings of the 9th International Workshop on Scalable Semantic Web Knowledge Base Systems. 9th International Workshop on Scalable Semantic Web Knowledge Base Systems. Sydney, 21.10.2013 - 22.10.2013. Tilburg: CEUR Workshop Proceedings. 2013, pp. 1-16. ISSN 1613-0073.
