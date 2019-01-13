---
title: ps_x_TemplateManifestGivenRequestUUID error
tags: [Connected Services Framework, Uncategorized]
---
<FONT face="Courier New">40004: OHSBE Error in: SbeMasterController.GetServiceUrisResponse(), Description: SbeMasterController.ProcessGetServiceUrisResponse(): Database error. Procedure: GetTemplateSessionManifest() Error was: Error in ps_x_TemplateManifestGivenRequestUUID - Unable to locate record for passed PK - - RequestUUID, CSFErrorCodes: 40004 </FONT>
<DIV>&nbsp;</DIV>
<DIV>You need to have proper records in the two tables in the SBE database. </DIV>
<DIV>The tables in consideration are:&nbsp;ProductActionTemplateManifest and&nbsp;TemplateManifest.</DIV>
<DIV>The Template Manifests are stored in the Template Manifest table. The TemplateManifestID is referenced in the ProductActionTemplateManifest table. </DIV>
<DIV>The ProductOfferID column in the ProductActionTemplateManifest contains the name of the product you are passing in the <PRODUCTOFFERINGID>in the Order Request. Once a request is received it is first searched in the ProductActionTemplateManifest table based in the Product Offering ID and the TemplateManifestID is read. Then from the TemplateManifest table the Template Manifest is read and returned. Check the records in the two tables and the values passed in the order request. </DIV>
<DIV>&nbsp;</DIV>
<DIV>(thanks to Kapil note!)</DIV>
