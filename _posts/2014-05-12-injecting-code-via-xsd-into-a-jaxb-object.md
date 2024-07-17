---
id: 46
title: Injecting code via xsd into a jaxb object
date: 2014-05-12T14:18:33+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=46
permalink: /injecting-code-via-xsd-into-a-jaxb-object/
categories:
  - Uncategorized
tags:
  - jaxb
  - xsd
---
Found a cool feature of jaxb/xjc, -Xinject-code. With example xsd from prior post, look for 'ci'. The code should probably be wrapped in a CDATA element.

[sourcecode language="xsd"]
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" 
          xmlns:jaxb="http://java.sun.com/xml/ns/jaxb"
          jaxb:version="2.1"
          targetNamespace="http://www.edgriebel.com"
          xmlns="http://www.edgriebel.com"
          xmlns:inheritance="http://jaxb2-commons.dev.java.net/basic/inheritance"
          xmlns:annox="http://annox.dev.java.net"
          xmlns:jxba="http://annox.dev.java.net/javax.xml.bind.annotation"
          xmlns:ci="http://jaxb.dev.java.net/plugin/code-injector"
          jaxb:extensionBindingPrefixes="annox inheritance"
          elementFormDefault="qualified ci">
 
    <xs:complexType name="pairDO">
    <xs:annotation> 
        <xs:appinfo> 
            <inheritance:extends>com.edgriebel.util.Pair</inheritance:extends>
            <annox:annotate target="class"> 
              <jxba:XmlRootElement>
                <name>pairDO</name>
              </jxba:XmlRootElement>
            </annox:annotate>
            <ci:code>
              /* any test method here */
            </ci:code>
        </xs:appinfo>
    </xs:annotation>
    </xs:complexType>
</xs:schema>
[/sourcecode]<strong></strong>