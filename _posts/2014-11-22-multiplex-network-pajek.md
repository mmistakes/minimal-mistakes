---
layout: post
title: "Visualizing multiplex networks with Pajek"
excerpt: "A short tutorial post explaining how to visualize multiplex networks with Pajek"
tags: [tutorial, network, multiplex, pajek]
modified: 2014-11-22
comments: true
---

Social relations among people are usually complex, in that we are connected in multiple ways simultaneously. Sociologists tend to assume that our behaviour is shaped by the complex interaction of many simultaneous constraints and opportunities arising from how we are embedded in multiple kinds of relationships. Even though, there are analytical tools that try to (some extent) model the multiplexity of our social life (one can think of ERGMs or Siena models), when it comes to visualisation most of the tools deal with structures defined by patterns in a single kind of relationship (friendship, kinship, economic exchange, gossip, etc.) among people.
<br><br>
I have been struggling for a long time and for multiple occasions to find an appropriate software that enables me to visualise multiplex network data (that describes multiple relations among the same set of actors), allowing for multiple arcs between two vertices. I have experimented with a few software including [igrpah](http://igraph.org), [UCINET](https://sites.google.com/site/ucinetsoftware/home), [Pajek](http://pajek.imfm.si/doku.php?id=pajek), [Gephi](http://gephi.github.io), [graphviz](http://www.graphviz.org) and [visone](http://visone.info) with no satisfactory results which probably tells more about me than about the softwares. Eventually, I am not saying that none of these tools are appropriate to accomplish the task. All the more reason not because I have finally figured out that it is indeed possible in Pajek.
<br><br>
By hoping that it might be useful for other likeminded folks, I would like to give a short summary of the process. I am not going to fully explain every steps, assuming that the reader has some basic knowledge about networks, network visualisation and Pajek. The presented example is part of my and my colleague's research project and relies on the data collected by the [RECENS](http://recens.tk.mta.hu/en) group.

## How To

The key element of the process is the appropriate construction of the Pajek `.net` file. It always starts with the definition of the vertices. If you would like to have different vertice shapes, you can indicate the shape of each vertice in the third column after the vertex label. One can define multiple networks in the input file, separating them with the `*Arcs :1 ""` and `*Arcs :2 ""` lines, where `""` allows for labeling the network (which is missing in my case). When listing the arcs, the first two numbers in each row are always the vertices (listed in the first column of the `*Vertices` section) that define the arc, and the third number is always the number of the network (so it is always 1 for the first network, 2 for the second and so on).

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

When it comes to Pajek settings, make sure you have your arcs and/or edges (directed arcs) represented by relational number. In order to do so, you shall go `Options -> Colors -> Arcs -> “Relation number”`. Furthermore do not forget to assign different colour to the different networks. Oh, and one more *tricky* detail that gave me a hard time: the software itself cannot visually distinguish between the arcs belonging to different networks which means it does not draw multiple edges between two nodes even if they are there. As a result, the edges will stack on top of each other. But upon exporting the Pajek image to `.svg` or `.eps` format, they are drawn next to each other.

<i class="fa fa-info-circle"></i> Note that the sample .net contains only the first 10 lines of the original vertice and arc data, and such, does not allow for reconstructing the figures below .
{: .notice}

## About the Figures

Figure 1 and 2 both illustrates the logic of an ERG model, representing the negative and the perceived ethnicity networks in one class from our sample. On both figures, black arrows mean ethnic nominations and the gray ones stand for the negative relations. Self-declared Roma students are represented with squares and non-Roma students with circles. The colours of the nodes depend on the number of the incoming perceived ethnic nominations so the higher indegree the node has (the more student considers her/him Roma) the darker the color is. Finally, whereas on Figure 1 the bigger the node is the more incoming negative nominations that student has (the more student dislikes her/him), on Figure 2 the node size depends on the outgoing negative nominations.

<figure>
<img src="/images/multiplex1.svg">
<figcaption>Figure 1.</figcaption>
</figure>

<figure>
<img src="/images/multiplex2.svg">
<figcaption>Fugure 2.</figcaption>
</figure>

Hopefully more will come about the substantial project as well as about the visualisation. But in the meantime feel free to share your thoughts on multiplex network visualisation or on something else.
