---
layout: post
title: "Visualizing multiplex networks with Pajek"
excerpt: "A short tutorial post explaining how to visualize multiplex networks with Pajek"
tags: [tutorial, network, multiplex, pajek]
modified: 2014-11-22
comments: true
---

Social relations among people are usually complex, in that we are connected in multiple ways simultaneously. Sociologists tend to assume that our behaviour is shaped by the complex interaction of many simultaneous constraints and opportunities arising from how we are embedded in multiple kinds of relationships. Even though, there are analytical tools that try to (some extent) model the multiplexity of our social life (one can think of ERGM or Siena models), when it comes to visualisation most of the tools deal with structures defined by patterns in a single kind of relationship (friendship, kinship, economic exchange, gossip, etc.) among people.

I have been struggling for a long time and many times to find an appropriate software that enables me to visualise multiplex network data (that describes multiple relations among the same set of actors), allowing for multiple edges between two nodes. I have experimented with a few software including igrpah (R), UCINET, Pajek, Gephi, graphviz and visone with no satisfactory results. And I am not saying that none of these tools is appropriate to accomplish the task. All the more reason not because I have finally figured out that one can modify the Pajek .net file in order to represent and visualize multiplex networks.

By hoping that it might be useful information for likeminded folks, I'd like to give a short summary of the process. I am not going to fully explain every steps, assuming that the reader has some basic knowledge about networks, network visualisation and Pajek. The presented example is part of my and my colleague's research project and relies on the data collected by the [RECENS](http://recens.tk.mta.hu/en) group.



## How To

#### .net file

The key element of the process is the appropriate construction of the Pajek .net file.


~~~ css
*Vertices 18
1 "1" box
2 "2" ellipse
3 "3" box
4 "4" box
5 "5" ellipse
6 "6" ellipse
7 "7" box
8 "8" ellipse
9 "9" ellipse
10 "10" box
*Arcs :1 ""
3	1	1
6	9	1
8	14	1
9	17	1
9	18	1
10	9	1
10	11	1
12	17	1
12	18	1
14	1	1
*Arcs :2 ""
4	1	2
4	2	2
4	3	2
4	10	2
4	12	2
4	13	2
4	14	2
4	15	2
4	16	2
5	1	2
~~~

<i class="fa fa-info-circle"></i> Note that the sample .net contains only the first 10 lines of the original vertice and arc data and such, does not allow for reconstructing the figures below .
{: .notice}





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
