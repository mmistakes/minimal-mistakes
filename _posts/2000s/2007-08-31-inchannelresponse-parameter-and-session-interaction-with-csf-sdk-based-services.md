---
title: InChannelResponse parameter and Session interaction with CSF SDK based services
tags: [Connected Services Framework]
---
When you define a CSF session, InChannelResponse partecipant's parameter allows to define how CSF session server communicate with the selected endpoint. In particular it allows to specify whether it should hold open the channel that the session server uses to communicate with the service when it routes a message, or whether it should close the channel. In the following example, CSF can recognize successfully the "OneWayFalseMethod" response only if the partecipant have InChannelResponse=true <PRE class=code>    public class GenericSoapService : SoapService
    {
        public GenericSoapService()
        {

        }

        [SoapMethod(ServiceActions.OneWayFalseMethodRequest, ResponseAction = ServiceActions.OneWayFalseMethodResponse)]
        public String OneWayFalseMethod()
        {
            return "GenericSoapService OneWayFalseMethodResponse: OK";
        }
    }
</PRE>
<P>If you use CsfService instead of SoapService to derive your service class, It have enough logic inside to undestand how CSF is calling him and decide how to deliver the answer in the correct way. </P>
<P>Infact the following example works with both InChannelResponse=true and InChannelResponse=false </P><PRE class=code>    [CsfService(Name = "TestCSFService", Namespace = "http://TestCSFService")]
    public class Service : CsfService
    {
        [Operation(Name = "OneWayFalseMethod",
                   Action = ServiceActions.OneWayFalseMethodRequest,
                  ResponseAction = ServiceActions.OneWayFalseMethodResponse,
                   Oneway = false)]
        public String OneWayFalseMethod(String OneWayFalseMethodRequest)
        {
            return "OneWayFalseMethodResponse: OK";
        } 
    }
</PRE>
<P>More information: </P>
<UL>
<LI><A class="" href="http://msdn2.microsoft.com/en-us/library/aa303067.aspx%20CSF%203%20SDK%20http://msdn2.microsoft.com/en-us/library/aa439674.aspx" target=_blank mce_href="http://msdn2.microsoft.com/en-us/library/aa303067.aspx CSF 3 SDK http://msdn2.microsoft.com/en-us/library/aa439674.aspx">How the InChannelResponse Property Affects Messaging</A>&nbsp;</LI>
<LI><A class="" href="http://www.microsoft.com/downloads/details.aspx?FamilyID=a72ac7cf-1e0e-4ea5-a248-bfc5106c1231&amp;DisplayLang=en" target=_blank mce_href="http://www.microsoft.com/downloads/details.aspx?FamilyID=a72ac7cf-1e0e-4ea5-a248-bfc5106c1231&amp;DisplayLang=en">Download Microsoft Connected Services Framework 3.0 Developer Lite Edition</A>, Microsoft.ConnectedServices.Sdk.* libraries included </LI></UL>
