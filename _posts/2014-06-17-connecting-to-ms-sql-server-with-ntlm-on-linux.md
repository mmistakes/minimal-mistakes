---
id: 69
title: Connecting to MS SQL Server with NTLM on Linux
date: 2014-06-17T16:13:44+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=69
permalink: /connecting-to-ms-sql-server-with-ntlm-on-linux/
categories:
  - Uncategorized
---
A MS SQL Server instance can be configured to use NTLM authentication for connections so that it goes against Active Directory for authentication and authorization. There is a "Type 4" (pure Java) JDBC driver provided by Microsoft. When the server is configured for NTLM, however, there is a DLL that needs to be in the classpath (e.g. \windows\system32, which paradoxically holds 64-bit DLLs), <code>sqljdbc_auth.dll</code>. 

Including a DLL is problematic when running Java on a non-Windows host. There is an open source library that can access MS SQL Server, <a href="http://jtds.sourceforge.net/" title="jTDS" target="_blank">http://jtds.sourceforge.net/</a>. Getting the URL correct is tricky because of the parameters that need to be supplied. The URL I found that works is:
<code>jdbc:jtds:sqlserver://&lt;serverhost&gt;;useNTLMv2=true;user=&lt;userid&gt;;databaseName=&lt;definedDbName&gt;;domain=&lt;NTLM Domain&gt;;instance=&lt;"Other" database name&gt;</code>