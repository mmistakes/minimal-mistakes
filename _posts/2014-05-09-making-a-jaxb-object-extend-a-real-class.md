---
id: 44
title: 'Making a JAXB object extend a &#8220;real&#8221; class'
date: 2014-05-09T17:14:38+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=44
permalink: /making-a-jaxb-object-extend-a-real-class/
categories:
  - Uncategorized
---
Finally got the magic incantations correct to have a generated jaxb extend an existing class.

<a href="http://confluence.highsource.org/display/J2B/Inheritance+plugin" target="_blank">http://confluence.highsource.org/display/J2B/Inheritance+plugin</a>

[sourcecode language="xml"]
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" 
           xmlns:jaxb="http://java.sun.com/xml/ns/jaxb"
           jaxb:version="2.1"
           targetNamespace="http://www.edgriebel.com"
           xmlns="http://www.edgriebel.com"
           xmlns:inheritance="http://jaxb2-commons.dev.java.net/basic/inheritance"
           xmlns:annox="http://annox.dev.java.net"
           xmlns:jxba="http://annox.dev.java.net/javax.xml.bind.annotation"
           jaxb:extensionBindingPrefixes="annox inheritance"
           elementFormDefault="qualified">

    <xs:complexType name="pairDO">
	<xs:annotation> 
	    <xs:appinfo> 
            <inheritance:extends>com.edgriebel.util.Pair</inheritance:extends>
			<annox:annotate target="class"> 
			  <jxba:XmlRootElement>
			    <name>pairDO</name>
			  </jxba:XmlRootElement>
			</annox:annotate>
		</xs:appinfo>
	</xs:annotation>
    </xs:complexType>
</xs:schema>
 
[/sourcecode]