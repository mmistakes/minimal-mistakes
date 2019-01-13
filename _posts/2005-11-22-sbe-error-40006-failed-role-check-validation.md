---
title: SBE Error 40006 "failed role check validation"
tags: [Connected Services Framework, Uncategorized]
---
<P>The SBE checks that the user in the SumbitOrderRequest header belongs to the role defined in "SBEMasterController.config" file under "OHSBERole" config value.<BR>This means that usually user must be into YOURDOMAIN\Requestors@CSF_SBE group.<BR>One typical configuration mystake is to have in SBEMasterController.config file following content:</P>
<P>&lt;ConfigValue key="OHSBERole" value="<STRONG><FONT color=#ff0000>CSF</FONT></STRONG>\Requestors@CSF_SBE"/&gt;</P>
<P>Obviously change "CSF" with your domain name and try again :) <BR>N</P>
