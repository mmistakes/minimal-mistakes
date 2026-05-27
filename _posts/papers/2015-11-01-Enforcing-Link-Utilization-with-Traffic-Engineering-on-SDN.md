---
title: "Enforcing Link Utilization with Traffic Engineering on SDN"
header:
  teaser: "/assets/images/sdn.png"
author_profile: false
comments: true
categories:
  - Papers
tags:
  - SDN
  - Load balancy
sidebar:
  - title: "Files"
    text: "[PDF](/assets/files/2015-11-01-Link-balancing.pdf){: .btn .btn--success}{: target=\"_blank\"}"
    image: /assets/images/sdn.png

---

One of the main problems with the increasing Internet traffic is low throughput caused by bottlenecks, creating critical periods of packet loss. A straightforward solution to this problem is increasing the link capacity, which leads to over provisioning. Unfortunately, it causes poor link utilization during ordinary usage. In some situations we can add more links, adding robustness by traffic balancing.
{: style="text-align: justify;"}

We propose a traffic engineering solution using Software De- fined Networks. Our goal is to enforce link utilization dividing the traffic over multiple links through a simple, easy to implement, low cost, efficient and scalable solution. The solution can be deployed on data centers or at the edge of an Autonomous System.
{: style="text-align: justify;"}

Single link bottleneck is a problem that can be solved with over provisioning but wasting resources. We propose an alternative solution and performed our experiments on a commercial OpenFlow Switch. The solution met our goal of enforcing link utilization through traffic division. Using three links, we achieved in the worst case 37% more throughput, in the best case almost 57% more compared with a single link.
{: style="text-align: justify;"}

Please cite:
```TeX
###### **Founding agency**: CNPq.
@article{eenforcing,
  title={Enforcing Link Utilization with Traffic Engineering on SDN},
  author={e Silva, Erik de Britto and Pantuza, Gustavo and Sampaio, Frederico and Santos, Bruno P and Vieira, Luiz FM and Vieira, Marcos AM and Macedo, Daniel}
}
```
> Erik de Britto e Silva, Gustavo Pantuza, Frederico Sampaio, Bruno P. Santos, Luiz F. M. Vieira, Marcos A. M. Vieira, Daniel Macedo
#### Contatcs: {erik, pantuza, fredmbs, bruno.ps, lfvieira, mmvieira, damacedo}@dcc.ufmg.br