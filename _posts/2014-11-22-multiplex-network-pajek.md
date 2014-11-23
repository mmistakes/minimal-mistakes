---
layout: post
title: "Visualizing multiplex networks with Pajek"
excerpt: "A short tutorial post explaining how to visualize multiplex networks with Pajek"
tags: [tutorial, network, multiplex, pajek]
modified: 2014-11-22
comments: true
---

Social relations among actors are usually complex, in that actors are connected in multiple ways simultaneously. Sociologists tend to assume that individual behaviour is shaped by the complex interaction of many simultaneous constraints and opportunities arising from how the individual is embedded in multiple kinds of relationships. Even though, there are analytical tools that try to (some extent) model the multiplexity of our social life (one can think of ERGM or Siena models), when it comes to visualisation most of the tools deal with structures defined by patterns in a single kind of relationship among actors: friendship, kinship, economic exchange, gossip, etc.

I have been struggling for a long time to find an appropriate software that enables me to visualise multiplex network data (that describe multiple relations among the same set of actors), allowing for multiple edges between two nodes. I experimented with many softwares including igrpah (R), UCINET, Pajek, Gephi, graphviz and visone with no satisfying results. And I am not saying that none of these tools is appropriate to accomplish the task. All the more reason not because I have finally figured out that one can modify the Pajek .net in order to represent and visualize multiplex networks.

By hoping that it might be useful information for likeminded folks, I'd like to give a short summary of the process.


## How To



## The Figures

Figure 1 and 2 both illustrates the logic of our models, representing the negative and the perceived ethnicity networks in one class from our sample. On both figures, black arrows mean ethnic nominations and the gray ones stand for the negative relations. Self-declared Roma students are represented with squares and non-Roma students with circles. The colors of the nodes depend on the number of the incoming perceived ethnic nominations so the higher indegree the node has the darker the color is. Finally, whereas on Figure 1 the bigger the node is the more incoming negative nominations that student has, on Figure 2 the node size depends on the outgoing negative nominations.

<figure>
<img src="/images/multiplex1.svg">
<figcaption>Figure 1.</figcaption>
</figure>

<figure>
<img src="/images/multiplex2.svg">
<figcaption>Fugure 2.</figcaption>
</figure>
