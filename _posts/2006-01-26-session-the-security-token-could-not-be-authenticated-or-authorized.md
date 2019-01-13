---
title: Session - The security token could not be authenticated or authorized
tags: [Connected Services Framework]
---
<DIV><FONT face="Courier New"><FONT face="Times New Roman">E</FONT>vent Type:&nbsp;Error<BR>Event Source:&nbsp;Microsoft WSE 2.0<BR>Event Category:&nbsp;None<BR>Event ID:&nbsp;0<BR>Date:&nbsp;&nbsp;26/01/2006<BR>Time:&nbsp;&nbsp;10.21.49<BR>User:&nbsp;&nbsp;N/A<BR>Computer:&nbsp;PSSCSM2<BR>Description:<BR>Message Dispatch Failure: &lt;?xml version="1.0" encoding="utf-8"?&gt;&lt;soap:Envelope xmlns:wsa="</FONT><FONT face="Courier New">http://schemas.xmlsoap.org/ws/2004/03/addressing</FONT><FONT face="Courier New">" xmlns:wsse="</FONT><FONT face="Courier New">http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd</FONT><FONT face="Courier New">" xmlns:wsu="</FONT><FONT face="Courier New">http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd</FONT><FONT face="Courier New">" xmlns:soap="</FONT><FONT face="Courier New">http://schemas.xmlsoap.org/soap/envelope/"&gt;</FONT></DIV>
<DIV><FONT face="Courier New">&lt;soap:Header&gt;&lt;wsa:Action&gt;http://schemas.xmlsoap.org/ws/2004/03/addressing/fault&lt;/wsa:Action&gt;</FONT></DIV>
<DIV><FONT face="Courier New">&lt;wsa:MessageID&gt;uuid:f72d4193-5884-42d3-92f6-3612b2494b0c&lt;/wsa:MessageID&gt;&lt;wsa:RelatesTo&gt;uuid:d60016fb-ca69-4b03-87bc-ffea68069b7b&lt;/wsa:RelatesTo&gt;&lt;wsa:To&gt;soap.tcp://client:9823/SessionSnapIn&lt;/wsa:To&gt;</FONT></DIV>
<DIV><FONT face="Courier New">&lt;wsse:Security&gt;&lt;wsu:Timestamp</FONT><FONT face="Courier New"> wsu:Id="Timestamp-6b703080-475e-435c-ad6a-f1faacb01acb"&gt;&lt;wsu:Created&gt;2006-01-26T09:21:49Z&lt;/wsu:Created&gt;&lt;wsu:Expires&gt;2006-01-26T09:26:49Z&lt;/wsu:Expires&gt;&lt;/wsu:Timestamp&gt;&lt;/wsse:Security&gt;&lt;/soap:Header&gt;&lt;soap:Body&gt;&lt;soap:Fault&gt;&lt;faultcode xmlns:code="</FONT><FONT face="Courier New">http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"&gt;code:FailedAuthentication&lt;/faultcode&gt;&lt;faultstring&gt;Microsoft.Web.Services2.Security.SecurityFault</FONT><FONT face="Courier New">: The security token could not be authenticated or authorized<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Tokens.UsernameTokenManager.OnLogonUserFailed(UsernameToken token)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Tokens.UsernameTokenManager.LogonUser(UsernameToken token)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Tokens.UsernameTokenManager.AuthenticateToken(UsernameToken token)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Tokens.UsernameTokenManager.VerifyToken(SecurityToken securityToken)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Tokens.SecurityTokenManager.LoadXmlSecurityToken(XmlElement element)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Tokens.SecurityTokenManager.GetTokenFromXml(XmlElement element)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Security.LoadToken(XmlElement element, SecurityConfiguration configuration, Int32&amp;amp; tokenCount)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.Security.LoadXml(XmlElement element)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Security.SecurityInputFilter.ProcessMessage(SoapEnvelope envelope)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Pipeline.ProcessInputMessage(SoapEnvelope envelope)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Messaging.SoapReceiver.FilterMessage(SoapEnvelope envelope)<BR>&nbsp;&nbsp; at Microsoft.Web.Services2.Messaging.SoapReceiver.ProcessMessage(SoapEnvelope message)&lt;/faultstring&gt;&lt;faultactor&gt;http://session.csf.local/Session/SessionManagerAdmin.ashx&lt;/faultactor&gt;</FONT></DIV>
<DIV><FONT face="Courier New">&lt;/soap:Fault&gt;&lt;/soap:Body&gt;&lt;/soap:Envelope&gt;</FONT></DIV>
<DIV><FONT face="Courier New"></FONT>&nbsp;</DIV>
<DIV><FONT face="Courier New">For more information, see Help and Support Center at </FONT><FONT face="Courier New">http://go.microsoft.com/fwlink/events.asp</FONT><FONT face="Courier New">.</FONT></DIV>
<DIV><FONT face="Courier New"></FONT>&nbsp;</DIV>
<DIV>
<HR>
</DIV>
<DIV><FONT face="Courier New"></FONT>&nbsp;</DIV>
<DIV><FONT face="Courier New">Event Type:&nbsp;Error<BR>Event Source:&nbsp;SessionManagement<BR>Event Category:&nbsp;None<BR>Event ID:&nbsp;0<BR>Date:&nbsp;&nbsp;26/01/2006<BR>Time:&nbsp;&nbsp;10.21.49<BR>User:&nbsp;&nbsp;N/A<BR>Computer:&nbsp;PSSCSM2<BR>Description:<BR>SessionManagement http transport adaptor<BR>"Session application recieved invalid soap envelope - The security token could not be authenticated or authorized"</FONT></DIV>
<DIV><FONT face="Courier New"></FONT>&nbsp;</DIV>
<DIV><FONT face="Courier New">For more information, see Help and Support Center at</FONT><FONT face="Courier New"><BR></FONT></DIV>
<DIV>
<HR>
</DIV>
<DIV>&nbsp;</DIV>
<DIV>These errors regards communication between Session component and session administrator snap-in. </DIV>
<DIV>Assuming that user present in soap header message exists, is active and authorized, one reason of this error can be that session answer came after that message or user token is expired. </DIV>
<DIV>Why?&nbsp; Server load, some kind of deadlock or contention on CSF session DB. </DIV>
<DIV>For this reason&nbsp;I kindly disregard it.<BR></DIV>
