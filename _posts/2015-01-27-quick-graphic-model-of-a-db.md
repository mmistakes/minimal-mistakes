---
id: 90
title: Quick graphic model of a DB
date: 2015-01-27T10:43:49+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=90
permalink: /quick-graphic-model-of-a-db/
categories:
  - Uncategorized
tags:
  - SQL
---
Found a quick way to generate a DB entity model diagram with Oracle's SQL Developer. <a title="Here" href="http://www.thatjeffsmith.com/archive/2011/11/how-to-generate-an-erd-for-selected-tables-in-sql-developer/" target="_blank">Here</a> is a description of how to do it, but in short:
<ul>
	<li>Open up the Data Model browser and create a "New Relational Model"</li>
	<li>Drag tables from the table list in the Connection list. Hold down &lt;ctrl&gt; to automatically bring in child tables</li>
</ul>
<!--more-->Movie showing creation of a diagram:

<a href="http://www.edgriebel.com/wp-content/uploads/2015/01/ctrl_drag_model.gif"><img class="aligncenter wp-image-92 size-full" src="http://www.edgriebel.com/wp-content/uploads/2015/01/ctrl_drag_model.gif" alt="Entity Diagram Movie" width="835" height="707" /></a>