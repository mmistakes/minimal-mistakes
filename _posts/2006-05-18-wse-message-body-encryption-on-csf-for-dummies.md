---
title: WSE message body encryption on CSF for dummies:-)
tags: [Connected Services Framework]
---
<DIV>In this post I'm showing how to enable WSE policy and body message encryption for CSF using one of the standard CSF examples: the Counting Scenario.</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Prerequisites</STRONG></DIV>
<DIV>In order to be sure that CSF installation is correct, the counting scenario have to work fine before to do&nbsp;any of the following actions.</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Background</STRONG><BR>Counting scenario start through "CountingScenarioApp.exe" application. When you press "createSession" button follow messages will be routed:</DIV>
<DIV>&nbsp;</DIV>
<UL>
<LI>CountingApp --&gt; ServiceCatalog (<STRONG>ServiceCatalogGetUris</STRONG>)</LI>
<LI>ServiceCatalog --&gt;CountingApp (<STRONG>ServiceCatalogGetUrisResponse</STRONG>)</LI>
<LI>CountingApp --&gt; Session (<STRONG>CreateSession</STRONG>)</LI>
<LI>Session --&gt;CountingApp (<STRONG>CreateSessionResponse</STRONG>)</LI></UL>
<DIV>our objective is to have ServiceCatalogGetUris message encrypted.</DIV>
<DIV><BR><STRONG>Step1: enable policy config</STRONG></DIV>
<UL>
<LI>open c:\program files\microsoft csf\configuration\policycache.config</LI>
<LI>add as endpoint your CountingScenarioApp.exe application: you'll have to add something like:</LI></UL>
<DIV><FONT face="Courier New" size=2>&lt;endpoint uri="soap.tcp://localhost:9111/UiFormService"&gt;<BR>&lt;operation requestAction="</FONT><A href="http://schemas.microsoft.com/wse/2003/06/RequestDescription"><FONT face="Courier New" size=2>http://schemas.microsoft.com/wse/2003/06/RequestDescription</FONT></A><FONT face="Courier New" size=2>"&gt;<BR>&lt;request policy="" /&gt;<BR>&lt;/operation&gt;<BR>&lt;operation requestAction="Notify"&gt;<BR>&lt;request policy="" /&gt;<BR>&lt;/operation&gt;<BR>&lt;defaultOperation&gt;<BR>&lt;request policy="#DefaultSecurityPolicy" /&gt;<BR>&lt;/defaultOperation&gt;<BR>&lt;/endpoint&gt;</FONT></DIV>
<DIV>&nbsp;</DIV>
<DIV>Verify that enpoint of session and servicecatalog components have as URI the same name used by CountingScenarioApp.exe: usually in the file you find <A href="http://localhost/servicecatalog/">http://localhost/servicecatalog/</A>... while the application call <A href="http://mymachine/servicecatalog/">http://MYMACHINE/servicecatalog/</A>...</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Step2: configure applications<BR></STRONG>configure session web.config, servicecatalog web.config and countingscenarioapp.exe.config files to use the correct policycache.config file, adding following code under&nbsp;&nbsp; &lt;microsoft.web.services2&gt; node:</DIV>
<DIV>&nbsp;</DIV>
<DIV><FONT face="Courier New" size=2>&lt;policy&gt;<BR>&lt;cache name="C:\Program Files\Microsoft CSF\Configuration\PolicyCache.config" /&gt;<BR>&lt;/policy&gt;</FONT></DIV>
<DIV>&nbsp;</DIV>
<DIV>you can also add&nbsp; &lt;policyTrace&gt; to have policy logs</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Step3: iisreset</STRONG></DIV>
<DIV>Now CreateSession and TerminateSession form countingscenarioapp.exe should work fine. Please check also on event viewer to verify that no error appairs.</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Step4: load a certificate to encrypt the message body<BR></STRONG>Follow instruction you find in "C:\Program Files\Microsoft WSE\v2.0\Samples\Sample Test Certificates\read.htm" to install "Server Private.pfx" certificate. You can also generate a brend new certificate as well.</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Step5: configure servicecatalog to accept messages with encrypted body<BR></STRONG>Open policycache.config file and under &lt;policies&gt; ---&gt; &lt;Policy&gt; ---&gt; "EncryptMessage" set: &lt;wssp:SubjectName&gt;CN=WSE2QuickStartServer&lt;/wssp:SubjectName&gt;.</DIV>
<DIV>Please use subject name of your certificate here!</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Step6: modify servicecatalog endpoint as follows</STRONG></DIV>
<DIV>&nbsp;</DIV>
<DIV><FONT face="Courier New" size=2>&nbsp;&nbsp; &lt;endpoint uri="</FONT><A href="http://machinename/ServiceCatalog/ServiceCatalogConnector.ashx"><FONT face="Courier New" size=2>http://MACHINENAME/ServiceCatalog/ServiceCatalogConnector.ashx</FONT></A><FONT face="Courier New" size=2>"&gt;<BR>I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;operation requestAction="CSFSessionAckResponse"&gt;<BR>&nbsp;&lt;request policy="" /&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/operation&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;operation requestAction="CSFSessionNAckResponse"&gt;<BR>&nbsp;&lt;request policy="" /&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/operation&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;defaultOperation&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;request policy="<STRONG><FONT style="BACKGROUND-COLOR: #ff0000">#EncryptMessage</FONT></STRONG>" /&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/defaultOperation&gt;<BR>&nbsp;&nbsp;&nbsp; &lt;/endpoint&gt;</FONT></DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>Step 5: IISRESET</STRONG></DIV>
<DIV>&nbsp;</DIV>
<DIV>Now run CountingScenarioApp.exe and select CreateSession button. If everything still works, you'll obtain services URIs from the SC, with service catalog request "ServiceCatalogGetUris" body encrypted (look at WSE trace).</DIV>
<DIV>&nbsp;</DIV>
<DIV><STRONG>TIP</STRONG>: in case of error, check the event viewer. If you find as error "System.InvalidOperationException: Private Key is not available..." this suggests that the certificate was found but there was not enought permission given to access the private key file of the certificate. You can give these permission to any account using WSE certificate tool, clicking on the private key properties and then adding the selected user to the ACL's of the file. </DIV>
<DIV>&nbsp;</DIV>
<DIV>Good luck!</DIV>
