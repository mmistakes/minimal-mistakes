---
title: Avoid threads deadlock
tags: [c#, Deadlock, Threading]
---
<P>On this month's issue of MSDN Magazine, <A class="" href="http://blogs.msdn.com/toub/" target=_blank mce_href="http://blogs.msdn.com/toub/">Stephen Toub</A> describe the class&nbsp;DdMonitor. DdMonitor implements almost all interfaces exposed by .NET System.Threading.Monitor class but&nbsp;includes deadlock detection capabilities too. </P>
<P>With the objective to make available a&nbsp;lock(...) keyword replacement, a static DdMonitor.Lock(...) is implemented too.</P>
<P><A class="" href="http://msdn.microsoft.com/msdnmag/issues/07/10/netmatters/default.aspx" target=_blank mce_href="http://msdn.microsoft.com/msdnmag/issues/07/10/netmatters/default.aspx">A System.Threading.Monitor replacement to avoid threads deadlocks</A></P>
