---
title: Master controller can not communicate with Service Catalog
tags: [Connected Services Framework, Uncategorized]
---
<DIV>Master controller can not communicate with Service Catalog (that is on the same machine) when it is balanced with external hardware.</DIV>
<DIV>This kind of error can happen in the scenario bellow&nbsp;</DIV>
<DIV>&nbsp;<IMG alt="Image hosted by TinyPic.com" src="http://tinypic.com/iw6kox.jpg"> </DIV>
<DIV>CLIENT: order requester </DIV>
<DIV>VCSF: load balancer hardware </DIV>
<DIV>CSF01: Master controller + service catalog </DIV>
<DIV>CSF02: Master controller + service catalog </DIV>
<DIV>PSM: product service mapping web service </DIV>
<DIV>&nbsp;</DIV>
<DIV>This is the sequence: </DIV>
<DIV>Client call master controller in order to send a order request: </DIV>
<DIV>&nbsp;&nbsp;&nbsp;TO: <A href="http://VCSF/MasterController/SbeMasterController.ashx">http://VCSF/MasterController/SbeMasterController.ashx</A> </DIV>
<DIV>&nbsp;&nbsp;&nbsp;REPLYTO: <A href="http://CLIENT/responsemanager.ashx">http://CLIENT/responsemanager.ashx</A> </DIV>
<DIV>&nbsp;</DIV>
<DIV>Master controller call product service mapping </DIV>
<DIV>&nbsp;&nbsp;&nbsp;TO: <A href="http://PSM/psm.ashx">http://PSM/psm.ashx</A> &nbsp;</DIV>
<DIV>&nbsp;&nbsp;&nbsp;REPLYTO: <A href="http://VCSF/MasterController/SbeMasterController.ashx">http://VCSF/MasterController/SbeMasterController.ashx</A> </DIV>
<DIV>&nbsp;</DIV>
<DIV>Master controller call service catalog </DIV>
<DIV>&nbsp;&nbsp;&nbsp;TO: <A href="http://VCSF/ServiceCatalog/ServiceCatalogConnector.ashx">http://VCSF/ServiceCatalog/ServiceCatalogConnector.ashx</A> &nbsp;</DIV>
<DIV>&nbsp;&nbsp;&nbsp;REPLYTO: <A href="http://VCSF/MasterController/SbeMasterController.ashx">http://VCSF/MasterController/SbeMasterController.ashx</A> &nbsp;(***)</DIV>
<DIV>(***) Here there is the error because it can happen that from a balanced node (CSF01)&nbsp;isn't reachable the virtual IP VCSF because hardware balancer limit. </DIV>
<DIV>&nbsp;</DIV>
<DIV>In order to fix this issue: Open /Microsoft CSF/configuration/SBE master controller.config and: </DIV>
<DIV>(1) Set MultipleOHSBEs=true </DIV>
<DIV>(2.1) on CSF01: Set ServiceCatalogResponseReplyTo=http://CSF01/MasterController/SbeMasterController.ashx&nbsp;&nbsp;</DIV>
<DIV>(2.2) on CSF02: Set ServiceCatalogResponseReplyTo=http://CSF02/MasterController/SbeMasterController.ashx </DIV>
<DIV>(3) iisreset </DIV>
<DIV>&nbsp;</DIV>
<DIV>&nbsp;</DIV>
