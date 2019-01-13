---
title: OHSBE ThrottleInterval must be > 0
tags: [Connected Services Framework]
---
In production environment never set ThrottleInterval=0 because may cause a condition called thread exhaustion.<BR><BR><BR>Follow a list of error you can encourr:<BR>
<P><FONT face="Courier New">Event Type: Error Event Source: SbeMasterController Description: Microsoft.EnterpriseInstrumentation.Schema.ErrorMessageEvent { String Message = "Microsoft.Csf.Sbe.OrderHandling.SbeMasterControllerException: SbeMasterController.ProcessCreateSessionResponse(): Database error. Procedure: GetQueryServiceForProductResponse() Error was: Error in ps_x_ProductServiceMappingDataGivenRequestUUID - Unable to find valid binary pointer - ProductServiceMappingData at Microsoft.Csf.Sbe.OrderHandling.MasterController.SbeMasterController.ProcessCreateSessionResponse(SoapEnvelopeHolder holder)" String ErrorCode = "40004" </FONT></P><FONT face="Courier New">
<HR>
Microsoft.EnterpriseInstrumentation.Schema.ErrorMessageEvent { String Message = "Microsoft.Csf.Sbe.OrderHandling.SbeMasterControllerException: SbeMasterController.ServiceLogicStatus(): Database error. Procedure: GetRequestUUIDGivenSessionID() Error was: Error in ps_s_GetRequestUUIDGivenSessionID - Lookup value not found. - SessionID at Microsoft.Csf.Sbe.OrderHandling.MasterController.SbeMasterController.ProcessServiceLogicStatus(ServiceLogicCompletionStatus status, SoapEnvelopeHolder holder)" String ErrorCode = "90000" 
<HR>
Microsoft.EnterpriseInstrumentation.Schema.ErrorMessageEvent { String Message = "ServiceLogicStateManager.ChangeStateToCompleted:: Database error in service logic. Procedure: dbo.ps_x_ChangeServiceLogicStateTo_Completed Error message: Timeout expired. The timeout period elapsed prior to completion of the operation or the server is not responding." String ErrorCode = "50009" 
<HR>
</FONT>
<P></P>
