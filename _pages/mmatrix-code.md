---
layout: single
title: "Mobile Matrix Code"
permalink: /mmatrix-code/
author_profile: false
sidebar:
  nav: "mmatrix-journal"

toc: true
toc_label: "Content"
toc_icon: "bars"
---

#### Mobile Matrix: Routing under Mobility in IoT, IoMT, and Social IoT 

[Github code](https://github.com/bps90/mobile-matrix){:target="_blank"}.
----------
We have designed, analyzed and evaluated the Mobile Matrix (μMatrix), a mobile routing protocol with a hierarchical addressing scheme for resource-constrained devices largely employed in IoT, IoMT, and Social IoT. In the new IoT context, the ''things'' are able to move and do social ties; thus μMatrix represents a step towards this new mobile cyber-physical environment by allowing the devices to move around while providing device mobility transparency to upper layers in the network stack. The protocol has low memory footprint, adjustable control message overhead, optimal routing path distortion, and provides any-to-any communication.
{: style="text-align: justify;"}

μMatrix ready to go
----------
We implement μMatrix as a prototol into the [ContikiOS'](http://www.contiki-os.org/) rime stack. We used some default rime's primitivies such as (multihop, unicast, and broadcast) as well as we do modification in the rime collection protocol. In order to use our μMatrix implementation you just need copy the files and then paste and replace them into the ContikiOS' rime folder.
{: style="text-align: justify;"}

We also provide a code exemplifying how to use μMatrix primitives (set root, send messages).  In order to use the example code, you just need to run the [Cooja simulator](https://github.com/contiki-os/contiki/wiki/An-Introduction-to-Cooja), then load the code in some cooja motes (note that to emulate motes you will need to clean μMatrix code by removing prints, reduce memory usage so on). Into de code you will can see how to set a border router.  Please, note that some μMatrix are in beta fase or were not already implemented. 
{: style="text-align: justify;"}

Dependencies
----------
- ContikiOS 3.0 or later

Running step-by-step
----------

Mobility Models
----------

Publications
----------

Citation information (Bibitex)
----------
