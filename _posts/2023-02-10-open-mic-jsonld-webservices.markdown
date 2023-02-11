---
title: "Giving Semantics to Web Services with JSON-LD"
categories: [Open Mic Session, Open Mic]
excerpt: "JSON-LD allows providing context with data published by REST services. This talk introduces JB4JSON-LD - a library for mapping Java objects to JSON-LD."
---

On the 10th February, speaker [Martin Ledvinka](https://kbss.felk.cvut.cz/web/team#martin-ledvinka) presented the topic of how to give semantics to Web Services using JSON-LD. The whole session was recorded.

{% include video id="bnEZepQYYG0" provider="youtube" %}

##### Abstract

REST is nowadays the most popular architecture for building Web services. However, data produced by REST Web services
assume their consumers have prior knowledge of their structure and meaning.

JSON-LD is a lightweight data format that can be used to provide easily accessible context in a backwards-compatible way.

This talk discussed the options of using JSON-LD to enhance REST Web service output with contextual information
without requiring significant development costs on either server and client side.

In a Java application, one can use JB4JSON-LD - a library allowing to easily serialize and deserialize POJOs to JSON-LD.

The presentation slides are available [at this link](https://drive.google.com/file/d/1dQiveXV0Q5dkkw9qncESBRe6xUjw2Irm/view?usp=share_link).

##### Further reading and links
- [JB4JSON-LD source code](https://github.com/kbss-cvut/jb4jsonld)
- [JB4JSON-LD Jackson integration](https://github.com/kbss-cvut/jb4jsonld-jackson)
- [Example application](https://github.com/kbss-cvut/jopa-examples/tree/master/jsonld)
